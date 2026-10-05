"use strict";
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const root = path.resolve(__dirname, "../..");
const commit = process.env.LAB_ATLAS_COMMIT;
assert(
  /^[a-f0-9]{40}$/.test(commit || ""),
  "Set LAB_ATLAS_COMMIT to the verified Pages build commit",
);
const base = process.env.LAB_ATLAS_SITE || "https://pazneria.github.io/lab/";
assert.equal(new URL(base).protocol, "https:");
const git = (args) =>
  execFileSync("git", args, { cwd: root, maxBuffer: 32 * 1024 * 1024 });
const tracked = git(["ls-tree", "-r", "--name-only", commit, "infrastructure"])
  .toString("utf8")
  .trim()
  .split("\n");
const files = [
  ...new Set([
    ...tracked.filter(
      (file) =>
        file.endsWith(".html") || file.startsWith("infrastructure/assets/"),
    ),
    "infrastructure/data/atlas.json",
    "infrastructure/data/profiles/review-corrections.json",
    "lab-space/index.html",
    "index.html",
    "benchmarks.html",
    "assets/gallery-data.js",
    "assets/gallery.js",
    "assets/coverage-graphs.js",
  ]),
];
const entityFiles = files.filter((file) =>
  /^infrastructure\/(companies|facilities|products)\/[^/]+\/index\.html$/.test(
    file,
  ),
);
assert.equal(entityFiles.length, 140);
const expectedData = JSON.parse(
  git(["show", `${commit}:infrastructure/data/atlas.json`]).toString("utf8"),
);
assert.equal(
  expectedData.metadata.publication_state,
  "reviewed_for_publication",
);
assert.equal(expectedData.sources.length, 126);
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const report = {
  checkedAt: new Date().toISOString(),
  commit,
  base,
  status: "running",
  files: [],
  routes: [],
  browser: {},
  limitations: [
    "Headless Edge only; no physical-device or screen-reader testing",
    "OSM tiles blocked; service availability not tested",
  ],
};
async function checkFile(file) {
  const url = new URL(file, base);
  url.searchParams.set("atlas-release", commit);
  const response = await fetch(url, {
    signal: AbortSignal.timeout(30000),
    headers: { "Cache-Control": "no-cache" },
  });
  assert.equal(response.status, 200, file);
  const served = Buffer.from(await response.arrayBuffer());
  const expected = git(["show", `${commit}:${file}`]);
  assert.equal(hash(served), hash(expected), `${file} differs from ${commit}`);
  report.files.push({
    file,
    status: response.status,
    bytes: served.length,
    sha256: hash(served),
  });
  if (file === "infrastructure/data/atlas.json")
    report.datasetCounts = JSON.parse(served.toString("utf8")).metadata.counts;
  if (file === "lab-space/index.html")
    assert(
      served
        .toString("utf8")
        .includes('id="infrastructure-link" href="/lab/infrastructure/"'),
    );
  if (file === "infrastructure/companies/meta/index.html") {
    assert(
      served
        .toString("utf8")
        .includes("Historical paper-reported value (via Epoch)"),
    );
    assert(!served.toString("utf8").includes("Historical Epoch estimate"));
  }
  if (file === "infrastructure/companies/anthropic/index.html")
    assert(
      served
        .toString("utf8")
        .includes('href="https://epoch.ai/models/claude-opus-5-5"'),
    );
  if (file === "infrastructure/companies/microsoft/index.html")
    assert(
      served
        .toString("utf8")
        .includes(
          'href="https://microsoft.ai/news/introducing-mai-thinking-1/"',
        ),
    );
}
async function liveBrowser() {
  const { chromium } = require(
    process.env.LAB_PLAYWRIGHT_MODULE || "playwright",
  );
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.LAB_BROWSER_CHANNEL || "msedge",
  });
  report.browser = {
    version: browser.version(),
    checks: [],
    errors: [],
    unexpectedExternalRequests: [],
    screenshots: [],
    interceptedTileRequests: 0,
  };
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1100 },
      reducedMotion: "reduce",
    });
    await context.route("https://tile.openstreetmap.org/**", (route) => {
      report.browser.interceptedTileRequests++;
      return route.abort();
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => report.browser.errors.push(error.message));
    page.on("request", (request) => {
      const url = new URL(request.url());
      if (
        url.origin !== new URL(base).origin &&
        url.hostname !== "tile.openstreetmap.org"
      )
        report.browser.unexpectedExternalRequests.push(request.url());
    });
    const atlas = new URL("infrastructure/", base).href;
    await page.goto(atlas);
    await page.locator("#atlas:not([hidden])").waitFor();
    assert.match(
      await page.locator("#site-count").innerText(),
      /94 facilities.*25 with reviewed/,
    );
    assert.match(
      await page.locator("[data-map-count]").innerText(),
      /25 mapped locations.*25 in view/,
    );
    assert.equal(report.browser.interceptedTileRequests, 0);
    const zoom = Number(
      await page.locator("#geographic-map").getAttribute("data-zoom"),
    );
    await page.locator('[data-map-action="zoom-in"]').focus();
    await page.keyboard.press("Enter");
    assert.equal(
      Number(await page.locator("#geographic-map").getAttribute("data-zoom")),
      zoom + 1,
    );
    await page.locator(".more-filters summary").click();
    await page.locator('[name="country"]').selectOption("Singapore");
    await page.locator('[data-map-action="fit"]').click();
    await page.locator(".atlas-map-marker").focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(".cluster-facility-link").count(), 2);
    report.browser.checks.push(
      "Live bundled map, 94-facility directory, keyboard zoom and shared-point cluster links pass without tile requests.",
    );
    await page.goto(atlas);
    await page.screenshot({ path: path.join(out, "live-v2-map.png") });
    report.browser.screenshots.push("live-v2-map.png");
    for (const profile of expectedData.lab_profiles) {
      const response = await page.goto(
        new URL(`companies/${profile.player_id}/`, atlas).href,
      );
      assert.equal(response.status(), 200);
      assert.match(
        await page.locator("#power").innerText(),
        /Lab-wide operating power: not established/,
      );
      assert.match(
        await page.locator("#models").innerText(),
        /Training-compute evidence/,
      );
      report.routes.push({
        route: `infrastructure/companies/${profile.player_id}/`,
        status: response.status(),
        finalUrl: response.url(),
      });
    }
    await page.goto(new URL("companies/meta/", atlas).href);
    await page.locator(".historical-models > summary").click();
    assert.match(
      await page.locator(".historical-models").innerText(),
      /Historical paper-reported value \(via Epoch\)/,
    );
    await page.goto(new URL("companies/anthropic/", atlas).href);
    assert.equal(
      await page
        .locator('#models a[href="https://epoch.ai/models/claude-opus-5-5"]')
        .count(),
      1,
    );
    await page.screenshot({ path: path.join(out, "live-v2-anthropic.png") });
    report.browser.screenshots.push("live-v2-anthropic.png");
    await page.goto(new URL("companies/microsoft/", atlas).href);
    assert.equal(
      await page
        .locator(
          '#models a[href="https://microsoft.ai/news/introducing-mai-thinking-1/"]',
        )
        .count(),
      1,
    );
    report.browser.checks.push(
      "All seven live lab profiles render; the paper-reported badge and both clause-specific citations are correct.",
    );
    await page.goto(new URL("directory/?q=Abilene&type=facility", atlas).href);
    await page.locator('a[href="../facilities/stargate-abilene/"]').focus();
    await page.keyboard.press("Enter");
    await page.waitForURL("**/facilities/stargate-abilene/");
    assert.match(await page.locator("#capacity").innerText(), /~420 MW/);
    assert.match(await page.locator("#capacity").innerText(), /~590 MW/);
    assert.match(
      await page.locator("#capacity").innerText(),
      /not metered consumption/,
    );
    await page.goto(
      new URL("facilities/epoch-coreweave-denton-tx/", atlas).href,
    );
    assert.equal(await page.locator("[data-facility-map]").count(), 0);
    await page.goto(new URL("products/gb200/", atlas).href);
    assert.match(await page.locator("h1").innerText(), /GB200/);
    report.browser.checks.push(
      "Live directory navigation, mapped/unmapped facilities, scoped capacity cards and product route pass.",
    );
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(atlas);
    const dimensions = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    assert(dimensions.scroll <= dimensions.width + 1);
    assert.match(
      await page.locator("[data-map-count]").innerText(),
      /25 mapped locations.*25 in view/,
    );
    await page
      .locator(".geographic-frame")
      .evaluate((el) => el.scrollIntoView({ block: "start" }));
    await page.screenshot({ path: path.join(out, "live-v2-mobile-map.png") });
    report.browser.screenshots.push("live-v2-mobile-map.png");
    report.browser.mobileDimensions = dimensions;
    report.browser.checks.push(
      "390px live map fits the viewport and all 25 reviewed locations.",
    );
    assert.deepEqual(report.browser.errors, []);
    assert.deepEqual(report.browser.unexpectedExternalRequests, []);
    assert.equal(report.browser.interceptedTileRequests, 0);
  } finally {
    await browser.close();
  }
}
const out = path.join(root, "evidence/infrastructure");
fs.mkdirSync(out, { recursive: true });
(async () => {
  if (process.argv.includes("--plan")) {
    console.log(
      JSON.stringify({
        commit,
        files: files.length,
        entityPages: entityFiles.length,
        dataset: expectedData.metadata.counts,
      }),
    );
    return;
  }
  let next = 0;
  const results = await Promise.allSettled(
    Array.from({ length: 4 }, async () => {
      while (next < files.length) await checkFile(files[next++]);
    }),
  );
  for (const result of results)
    if (result.status === "rejected") throw result.reason;
  report.files.sort((a, b) => a.file.localeCompare(b.file));
  report.exactEntityPages = entityFiles.length;
  for (const route of [
    "infrastructure/",
    "infrastructure/directory/",
    "lab-space/",
    "",
    "benchmarks.html",
  ]) {
    const response = await fetch(new URL(route, base), {
      signal: AbortSignal.timeout(30000),
    });
    assert.equal(response.status, 200, route);
    report.routes.push({
      route,
      status: response.status,
      finalUrl: response.url,
    });
  }
  await liveBrowser();
  report.status = "passed";
  console.log(
    JSON.stringify(
      {
        commit,
        status: report.status,
        exactFiles: report.files.length,
        exactEntityPages: report.exactEntityPages,
        datasetCounts: report.datasetCounts,
        browser: report.browser,
      },
      null,
      2,
    ),
  );
})()
  .catch((error) => {
    report.status = "failed";
    report.error = error.stack;
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    if (!process.argv.includes("--plan"))
      fs.writeFileSync(
        path.join(out, "live-publication.json"),
        JSON.stringify(report, null, 2) + "\n",
      );
  });
