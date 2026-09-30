// Verify the published Pages interface against the exact local Git commit.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(__dirname, "..");
const out = path.join(root, "evidence");
const base = "https://pazneria.github.io/lab/";
const sha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root })
  .toString()
  .trim();
const original = JSON.parse(
  fs.readFileSync(path.join(root, "data/catalog.original.json"), "utf8"),
);
const report = {
  checkedAt: new Date().toISOString(),
  url: base,
  expectedCommit: sha,
  assets: [],
  checks: [],
  viewports: [],
  axe: [],
  errors: [],
  missingAssets: [],
  externalRequests: [],
  sourceReachability:
    "Earlier one-pass check: 50 HTTP 200; BARN certificate verification failed. No certificate bypass or BARN retry.",
};
fs.mkdirSync(out, { recursive: true });
function passed(message) {
  report.checks.push(message);
  console.log("PASS " + message);
}
async function audit(page, label) {
  await page.addScriptTag({
    path: process.env.LAB_AXE_SCRIPT || require.resolve("axe-core/axe.min.js"),
  });
  const result = await page.evaluate(() =>
    axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"],
      },
    }),
  );
  report.axe.push({
    label,
    violations: result.violations.map((v) => ({ id: v.id, impact: v.impact })),
    incomplete: result.incomplete.map((v) => v.id),
  });
  assert.equal(result.violations.length, 0, label + " axe violations");
}
async function main() {
  for (const file of [
    "index.html",
    "assets/lab.css",
    "assets/lab.js",
    "assets/catalog.js",
    "assets/mark.svg",
    "data/catalog.original.json",
  ]) {
    const response = await fetch(base + file + "?commit=" + sha, {
      signal: AbortSignal.timeout(20000),
    });
    assert.equal(response.status, 200, file + " HTTP status");
    const bytes = Buffer.from(await response.arrayBuffer());
    const expected = execFileSync("git", ["show", "HEAD:" + file], {
      cwd: root,
      maxBuffer: 2 * 1024 * 1024,
    });
    assert.deepEqual(bytes, expected, file + " differs from local commit");
    report.assets.push({
      path: file,
      status: response.status,
      bytes: bytes.length,
      sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
    });
    if (file.endsWith(".json")) assert.deepEqual(JSON.parse(bytes), original);
  }
  passed(
    "Six live files exactly match the local Git commit, including original catalog JSON",
  );
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.LAB_BROWSER_CHANNEL || undefined,
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => report.errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400)
        report.missingAssets.push({
          url: response.url(),
          status: response.status(),
        });
    });
    page.on("requestfailed", (request) =>
      report.missingAssets.push({
        url: request.url(),
        error: request.failure()?.errorText,
      }),
    );
    page.on("request", (request) => {
      if (new URL(request.url()).origin !== new URL(base).origin)
        report.externalRequests.push(request.url());
    });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.locator("#benchmark-runebench").waitFor();
    assert.equal(await page.locator("#results .entry").count(), 19);
    assert.equal(await page.locator("#watch-results .entry").count(), 1);
    assert.match(
      await page.locator("#catalog-basis").textContent(),
      /Research snapshot: 2026-09-30/,
    );
    assert.match(
      await page.locator(".evidence-notice").textContent(),
      /No scores or rankings/,
    );
    assert.equal(await page.locator(".metric-definition").count(), 30);
    for (const entry of original.entries) {
      const article = page.locator("#benchmark-" + entry.id);
      assert.equal(await article.count(), 1);
      assert.equal(await article.locator("h3").textContent(), entry.name);
      assert.deepEqual(
        await article
          .locator(".entry-sources a")
          .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href"))),
        entry.sources.map((source) => source.url),
      );
    }
    assert.equal(await page.locator(".entry-sources a").count(), 51);
    assert.ok(
      await page.evaluate(() =>
        window.LAB_CATALOG.entries.every(
          (entry) =>
            entry.score === null &&
            (entry.metrics || []).every((metric) => metric.value === null),
        ),
      ),
    );
    passed(
      "Live catalog contains all 20 records, separate VoxelBench watch, 51 exact source links and 30 unpopulated metrics",
    );
    const summary = page.locator("#benchmark-runebench summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator("#benchmark-runebench details").getAttribute("open"),
      "",
    );
    assert.ok(
      (
        await page.locator("#benchmark-runebench details").textContent()
      ).includes(original.entries[0].next_check),
    );
    await page.keyboard.press("Enter");
    passed(
      "Keyboard opening of evidence details exposes the original next verification step",
    );
    await page.evaluate(() => {
      document.activeElement?.blur();
      window.scrollTo(0, 0);
    });
    await page.screenshot({ path: path.join(out, "lab-live-desktop.png") });
    await audit(page, "live catalog desktop");
    await page.locator("#search").fill("voxelbench");
    assert.equal(await page.locator("#results .entry").count(), 0);
    assert.equal(await page.locator("#watch-results .entry").count(), 1);
    await page.reload();
    assert.equal(await page.locator("#search").inputValue(), "voxelbench");
    await page.getByRole("button", { name: "Reset filters" }).click();
    assert.equal(await page.locator(".entry").count(), 20);
    await page.goto(base + "?category=medical&setting=real-trial", {
      waitUntil: "networkidle",
    });
    assert.equal(await page.locator(".entry").count(), 2);
    for (const id of ["masai-trial", "kenya-ai-consult-trial"])
      assert.equal(await page.locator("#benchmark-" + id).count(), 1);
    passed(
      "Live search, URL reload/reset and prospective-medical evidence filtering work",
    );
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(base + "?category=medical#benchmark-masai-trial", {
        waitUntil: "networkidle",
      });
      assert.equal(
        await page
          .locator("#benchmark-masai-trial details")
          .getAttribute("open"),
        "",
      );
      const dimensions = await page.evaluate(() => ({
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
      }));
      report.viewports.push(dimensions);
      assert.ok(
        dimensions.documentWidth <= width && dimensions.bodyWidth <= width,
        "mobile overflow " + width,
      );
      assert.match(
        await page.locator("#benchmark-masai-trial").textContent(),
        /noninferiority, not statistically established superiority/,
      );
    }
    await audit(page, "live medical detail 320px");
    await page
      .locator("#benchmark-masai-trial")
      .screenshot({
        path: path.join(out, "lab-live-medical-detail-mobile.png"),
      });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(out, "lab-live-mobile.png") });
    passed(
      "Live mobile layout at 390px and 320px reflows with expanded clinical evidence and source links",
    );
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.missingAssets, []);
    assert.deepEqual(report.externalRequests, []);
    passed(
      "No live browser errors, missing assets or third-party runtime requests; two axe scans have zero violations",
    );
    await context.close();
  } finally {
    await browser.close();
  }
}
main()
  .catch((error) => {
    report.failure = error.stack;
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    fs.writeFileSync(
      path.join(out, "deployment-validation.json"),
      JSON.stringify(report, null, 2),
    );
  });
