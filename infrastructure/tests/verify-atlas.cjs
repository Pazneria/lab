"use strict";
const fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http"),
  assert = require("node:assert/strict"),
  { pathToFileURL } = require("node:url");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(__dirname, "../.."),
  out = path.join(root, "evidence/infrastructure");
fs.mkdirSync(out, { recursive: true });
const raw = JSON.parse(
  fs.readFileSync(path.join(root, "infrastructure/data/atlas.json"), "utf8"),
);
const report = {
  checkedAt: new Date().toISOString(),
  checks: [],
  screenshots: [],
  viewports: [],
  accessibility: [],
  externalRequests: [],
  pageErrors: [],
};
const server = http.createServer((req, res) => {
  try {
    let url = new URL(req.url, "http://localhost").pathname.replace(
      /^\/lab\//,
      "/",
    );
    if (url.endsWith("/")) url += "index.html";
    const file = path.resolve(root, "." + decodeURIComponent(url));
    assert(file.startsWith(root + path.sep));
    assert(fs.statSync(file).isFile());
    res.setHeader(
      "Content-Type",
      {
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".mjs": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".svg": "image/svg+xml",
        ".json": "application/json; charset=utf-8",
      }[path.extname(file)] || "application/octet-stream",
    );
    res.end(fs.readFileSync(file));
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
const pass = (s) => {
  report.checks.push(s);
  console.log("PASS " + s);
};
const relationshipSection = fs
  .readFileSync(path.join(root, "infrastructure/sources.html"), "utf8")
  .match(
    /<h2 id="relationships">(\d+) evidence-scoped relationships<\/h2>([\s\S]*?)<h2 id="timeline">/,
  );
assert(relationshipSection, "Source index relationship section is missing");
assert.equal(
  Number(relationshipSection[1]),
  raw.relationships.length,
  "Source index relationship heading must match the dataset",
);
assert.equal(
  (relationshipSection[2].match(/<article class="static-record"/g) || [])
    .length,
  raw.relationships.length,
  "Source index must render every relationship exactly once",
);
pass(
  "Source index relationship heading and rendered records match the dataset.",
);
async function audit(page, label) {
  const script = process.env.LAB_AXE_SCRIPT;
  assert(
    script,
    "Set LAB_AXE_SCRIPT to axe.min.js for accessibility verification",
  );
  await page.addScriptTag({ path: script });
  const a = await page.evaluate(() =>
    axe.run(document, {
      runOnly: {
        type: "tag",
        values: [
          "wcag2a",
          "wcag2aa",
          "wcag21a",
          "wcag21aa",
          "wcag22aa",
          "best-practice",
        ],
      },
    }),
  );
  report.accessibility.push({
    label,
    violations: a.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        reason: n.failureSummary,
      })),
    })),
    incomplete: a.incomplete.map((x) => x.id),
  });
  assert.equal(
    a.violations.length,
    0,
    JSON.stringify(report.accessibility.at(-1)),
  );
}
async function shot(page, file, fullPage = false) {
  await page.screenshot({ path: path.join(out, file), fullPage });
  report.screenshots.push(file);
}
async function overflow(page, label) {
  const dimensions = await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  report.viewports.push({ label, ...dimensions });
  if (dimensions.scroll > dimensions.width + 1) {
    console.log(
      await page.locator("body *").evaluateAll((es) =>
        es
          .map((e) => ({
            tag: e.tagName,
            cls: e.className,
            right: e.getBoundingClientRect().right,
            width: e.getBoundingClientRect().width,
          }))
          .filter((e) => e.right > innerWidth + 1),
      ),
    );
    await page.screenshot({
      path: path.join(out, "overflow.png"),
      fullPage: true,
    });
  }
  assert(
    dimensions.scroll <= dimensions.width + 1,
    `${label} horizontal overflow`,
  );
}
// Entity routes and source links are native HTML, including when scripts fail.
const entityRows = [
  ...raw.players.map((e) => ({ ...e, folder: "companies", kind: "company" })),
  ...raw.sites.map((e) => ({ ...e, folder: "facilities", kind: "facility" })),
  ...raw.products.map((e) => ({ ...e, folder: "products", kind: "product" })),
];
for (const e of entityRows) {
  const file = path.join(root, `infrastructure/${e.folder}/${e.id}/index.html`);
  const html = fs.readFileSync(file, "utf8");
  assert.equal((html.match(/<h1>/g) || []).length, 1, e.id);
  assert(html.includes(`data-entity-kind="${e.kind}"`), e.id);
  assert(html.includes('aria-label="Breadcrumb"'), e.id);
  assert(!/[\uFFFD\u001A]/.test(html), `Broken encoding ${e.id}`);
  assert(!html.includes("evidence pending"), e.id);
  for (const match of html.matchAll(/<a\b([^>]+)href="([^"]+)"([^>]*)>/g)) {
    const attrs = match[1] + match[3],
      href = match[2].replaceAll("&amp;", "&");
    const u = new URL(
      href,
      "https://local.test/infrastructure/" + e.folder + "/" + e.id + "/",
    );
    if (u.origin !== "https://local.test") {
      assert.equal(u.protocol, "https:");
      assert(
        attrs.includes('rel="noopener noreferrer"'),
        `${e.id}: unsafe link ${href}`,
      );
    } else {
      const target = path.join(root, decodeURIComponent(u.pathname));
      assert(fs.existsSync(target), `${e.id}: missing link ${href}`);
    }
  }
}
pass(
  `${entityRows.length} entity pages have native headings, breadcrumbs, existing internal routes and safe external links.`,
);
assert.equal(
  raw.sites.filter((s) => Number.isFinite(s.location.latitude)).length,
  25,
);
assert.equal(
  raw.sites.filter((s) => s.location.precision.startsWith("approximate_"))
    .length,
  3,
);
assert.equal(raw.sites.filter((s) => s.capacity_estimate).length, 75);
assert(!raw.sites.some((s) => s.id === "epoch-microsoft-narvik-norway"));
assert(raw.sites.every((s) => s.location.footprint === null));
for (const p of raw.lab_profiles) {
  assert.equal(p.operating_power.lab_wide_power_w, null);
  assert.equal(p.operating_power.aggregation_allowed, false);
}
for (const c of raw.sites.map((s) => s.capacity_estimate).filter(Boolean)) {
  assert.equal(c.allocated_to_model_lab_capacity_w, null);
  for (const o of c.observations)
    assert.equal(o.state === "future_scenario", o.date > raw.metadata.as_of);
}
pass(
  "Seven unknown lab totals, 75 scoped estimates, future cutoff, 25 reviewed coordinates, three approximate areas and single Narvik identity are preserved.",
);
(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}/lab/infrastructure/`;
  report.base = base;
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.LAB_BROWSER_CHANNEL || "msedge",
  });
  report.browser = browser.version();
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1100 },
      reducedMotion: "reduce",
    });
    let tileAttempts = 0;
    // Test tile behavior with a local response. Never fetch or crawl the public tile service.
    await context.route("https://tile.openstreetmap.org/**", (route) => {
      tileAttempts++;
      return route.fulfill({
        status: 503,
        body: "test: street tiles unavailable",
      });
    });
    const page = await context.newPage();
    page.on("pageerror", (e) => report.pageErrors.push(e.message));
    page.on("request", (r) => {
      if (
        /^https?:/.test(r.url()) &&
        new URL(r.url()).origin !== new URL(base).origin &&
        !r.url().startsWith("https://tile.openstreetmap.org/")
      )
        report.externalRequests.push(r.url());
    });
    await page.goto(base);
    await page.locator("#atlas:not([hidden])").waitFor();
    assert.equal(await page.locator("#site-list .entity-card").count(), 12);
    assert.match(
      await page.locator("#site-count").innerText(),
      /94 facilities.*25 with reviewed/,
    );
    assert.equal(tileAttempts, 0);
    await audit(page, "desktop atlas");
    await overflow(page, "desktop atlas");
    await shot(page, "v2-home.png");
    await page.locator(".show-facilities").focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator("#site-list .entity-card").count(), 94);
    assert.equal(await page.locator("#site-list .map-locate").count(), 25);
    pass(
      "Atlas shows 94 facilities with a compact initial list, 25 map actions, and no external requests by default.",
    );
    await page.locator("[name=status]").selectOption("announced");
    await page.locator("[name=type]").selectOption("fab");
    assert.equal(await page.locator("#site-list .entity-card").count(), 0);
    assert.equal(await page.locator(".atlas-map-marker").count(), 0);
    assert.match(
      await page.locator("#site-detail").innerText(),
      /No matching facility/,
    );
    await page.locator("#filters [type=reset]").click();
    await page.locator("#filters [name=q]").fill("nothing-will-match-xyz");
    assert.match(
      await page.locator("#site-list").innerText(),
      /No facilities match/,
    );
    await page.locator("#filters [type=reset]").click();
    await page.locator(".more-filters summary").click();
    await page.locator("[name=player]").selectOption("anthropic");
    await page.locator("[name=role]").selectOption("estimatedUser");
    assert((await page.locator("#site-list .entity-card").count()) > 0);
    await page.reload();
    assert.equal(
      await page.locator("[name=role]").inputValue(),
      "estimatedUser",
    );
    assert.equal(await page.locator("[name=player]").inputValue(), "anthropic");
    await page.locator("#filters [type=reset]").click();
    await page.locator(".more-filters summary").click();
    await page.locator("[name=country]").selectOption("Singapore");
    await page.locator("[data-map-action=fit]").click();
    assert.equal(await page.locator("#site-list .entity-card").count(), 2);
    assert.equal(await page.locator(".cluster-point").count(), 1);
    await page.locator(".atlas-map-marker").focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(".cluster-facility-link").count(), 2);
    await page.locator(".leaflet-popup-close-button").click();
    await page.locator(".atlas-map-marker").focus();
    await page.keyboard.press("Space");
    assert.equal(await page.locator(".cluster-facility-link").count(), 2);
    await page.locator(".leaflet-popup-close-button").click();
    await page.locator("#site-list .map-locate").first().click();
    assert(
      Number(await page.locator("#geographic-map").getAttribute("data-zoom")) >=
        13,
    );
    const before = await page
      .locator("#geographic-map")
      .getAttribute("data-center");
    await page.locator("#geographic-map").focus();
    await page.keyboard.press("ArrowRight");
    await page.waitForFunction(
      (before) =>
        document.querySelector("#geographic-map").dataset.center !== before,
      before,
    );
    const zoom = Number(
      await page.locator("#geographic-map").getAttribute("data-zoom"),
    );
    await page.locator("[data-map-action=zoom-in]").focus();
    await page.keyboard.press("Enter");
    assert.equal(
      Number(await page.locator("#geographic-map").getAttribute("data-zoom")),
      zoom + 1,
    );
    pass(
      "Combined filters, URL persistence, no-results/reset, same-point clustering and keyboard pan/zoom work.",
    );
    await page.locator("[data-street-layer]").check();
    await page.waitForFunction(() =>
      document
        .querySelector("[data-map-note]")
        .textContent.includes("unavailable"),
    );
    assert(tileAttempts > 0);
    await page.locator("[data-street-layer]").uncheck();
    report.interceptedStreetTileRequests = tileAttempts;
    pass(
      "Street detail is opt-in; simulated tile failure preserves the local map. All tile requests were intercepted.",
    );
    await page.goto(new URL("directory/?q=Abilene&type=facility", base).href);
    assert((await page.locator(".entity-card:visible").count()) >= 1);
    await page
      .locator('.entity-card:visible a[href="../facilities/stargate-abilene/"]')
      .focus();
    await page.keyboard.press("Enter");
    await page.waitForURL("**/facilities/stargate-abilene/");
    assert.match(await page.locator("h1").innerText(), /Abilene/);
    assert.match(
      await page.locator("#capacity").innerText(),
      /Independent capacity estimate.*Epoch AI/s,
    );
    assert.match(await page.locator("#capacity").innerText(), /~420 MW/);
    assert.match(await page.locator("#capacity").innerText(), /~590 MW/);
    assert.match(
      await page.locator("#capacity").innerText(),
      /not metered consumption/,
    );
    await page
      .locator("#capacity")
      .evaluate((el) => el.scrollIntoView({ block: "start" }));
    await shot(page, "v2-facility-capacity.png");
    await audit(page, "facility estimates");
    await page
      .locator("#location")
      .evaluate((el) => el.scrollIntoView({ block: "start" }));
    await shot(page, "v2-facility-map.png");
    await page.goto(
      new URL("facilities/epoch-coreweave-denton-tx/", base).href,
    );
    assert.equal(await page.locator("[data-facility-map]").count(), 0);
    assert.match(
      await page.locator("#location").innerText(),
      /coordinates have not been verified/i,
    );
    await page.goto(new URL("facilities/stargate-norway/", base).href);
    assert.match(
      await page.locator("#history").innerText(),
      /Historical proposal/,
    );
    assert.match(
      await page.locator("#capacity").innerText(),
      /Zero means no operating capacity/,
    );
    assert.match(
      await page.locator(".entity-lede").innerText(),
      /current OpenAI allocation remains unverified/,
    );
    pass(
      "Directory search opens native facility URLs; estimated IT/facility power, address-only records and Norway history retain their meaning.",
    );
    await page.goto(new URL("companies/openai/", base).href);
    assert.match(
      await page.locator("#power").innerText(),
      /Lab-wide operating power: not established/,
    );
    assert.match(
      await page.locator("#power").innerText(),
      /Historical company report/,
    );
    assert.match(
      await page.locator('[data-model="GPT-6 Astra"]').innerText(),
      /10\^27 FLOP/,
    );
    await page
      .locator('[data-model="GPT-6 Astra"] .evidence-detail summary')
      .click();
    assert.match(
      await page.locator('[data-model="GPT-6 Astra"]').innerText(),
      /Do not multiply by 72/,
    );
    await page
      .locator("#models")
      .evaluate((el) => el.scrollIntoView({ block: "start" }));
    await shot(page, "v2-model-evidence.png");
    await audit(page, "OpenAI profile");
    await page.goto(new URL("companies/microsoft/", base).href);
    const mai = page.locator('[data-model="MAI-Thinking-1"]');
    await mai.locator(".evidence-detail summary").click();
    assert.match(
      await mai.innerText(),
      /Total training compute\s+Not publicly established/i,
    );
    assert.match(await mai.innerText(), /pre- and mid-training only/);
    await page.goto(new URL("companies/anthropic/", base).href);
    await shot(page, "v2-company.png");
    await page
      .locator("#power")
      .evaluate((el) => el.scrollIntoView({ block: "start" }));
    await shot(page, "v2-company-power.png");
    await page
      .locator("#models")
      .evaluate((el) => el.scrollIntoView({ block: "start" }));
    await shot(page, "v2-company-models.png");
    await page.goto(new URL("companies/meta/", base).href);
    await page.locator(".historical-models > summary").click();
    assert.match(
      await page.locator(".historical-models").innerText(),
      /Historical paper-reported value \(via Epoch\)/,
    );
    assert(
      !(await page
        .locator(".historical-models")
        .innerText()
        .then((text) => text.includes("Historical Epoch estimate"))),
    );
    await page.goto(new URL("companies/anthropic/", base).href);
    assert.equal(
      await page
        .locator('#models a[href="https://epoch.ai/models/claude-opus-5-5"]')
        .count(),
      1,
    );
    await page.goto(new URL("companies/microsoft/", base).href);
    assert.equal(
      await page
        .locator(
          '#models a[href="https://microsoft.ai/news/introducing-mai-thinking-1/"]',
        )
        .count(),
      1,
    );
    pass(
      "Historical paper-reported training is labeled separately; Opus ECI and MAI preview clauses link to their verified sources.",
    );
    await page.goto(new URL("products/gb200/", base).href);
    assert.match(await page.locator("h1").innerText(), /GB200/);
    assert((await page.locator("#relationships a[data-entity]").count()) > 0);
    await shot(page, "v2-product.png");
    await audit(page, "product profile");
    pass(
      "Model identity, access, total-versus-partial training FLOPs, historical reports and product/company/facility links render separately.",
    );
    for (const width of [768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of [
        "",
        "companies/anthropic/",
        "companies/microsoft/",
        "facilities/stargate-abilene/",
        "facilities/epoch-coreweave-denton-tx/",
        "directory/",
        "products/gb200/",
      ]) {
        await page.goto(new URL(route, base).href);
        await overflow(page, `${width}: ${route || "atlas"}`);
        if (!route)
          assert.match(
            await page.locator("[data-map-count]").innerText(),
            /25 mapped locations.*25 in view/,
          );
      }
      if (width === 390) {
        await page.goto(new URL("companies/anthropic/", base).href);
        await shot(page, "v2-mobile-company.png");
        await page
          .locator("#models")
          .evaluate((el) => el.scrollIntoView({ block: "start" }));
        await shot(page, "v2-mobile-models.png");
        await audit(page, "mobile company");
        await page.goto(base);
        await page
          .locator("#geographic-map")
          .evaluate((el) => el.scrollIntoView({ block: "start" }));
        await shot(page, "v2-mobile-map.png");
        await audit(page, "mobile atlas");
      }
    }
    pass(
      "Atlas, directory, company, product, mapped and unmapped facility pages fit 768, 390 and 320 pixel widths.",
    );
    const fallback = await context.newPage();
    await fallback.route("**/assets/geography.js", (route) => route.abort());
    await fallback.goto(base);
    assert.match(
      await fallback.locator("#geographic-map").innerText(),
      /could not load/,
    );
    assert.equal(await fallback.locator("#site-list .entity-card").count(), 12);
    await fallback.close();
    const nodata = await context.newPage();
    await nodata.route("**/assets/atlas-data.js", (route) => route.abort());
    await nodata.goto(base);
    assert(await nodata.locator("#load-error").isVisible());
    assert.equal(
      await nodata.locator("#load-error a").getAttribute("href"),
      "sources.html",
    );
    await nodata.close();
    const hostile = await context.newPage();
    const box = { window: {} };
    require("node:vm").runInNewContext(
      fs.readFileSync(
        path.join(root, "infrastructure/assets/atlas-data.js"),
        "utf8",
      ),
      box,
    );
    const injected = box.window.INFRASTRUCTURE_ATLAS;
    injected.sites[0].name = '<img src=x onerror="window.unsafeExecuted=true">';
    injected.sources.find(
      (s) => s.id === injected.changes[0].sourceIds[0],
    ).url = "javascript:window.unsafeExecuted=true";
    await hostile.route("**/assets/atlas-data.js", (route) =>
      route.fulfill({
        contentType: "text/javascript",
        body: "window.INFRASTRUCTURE_ATLAS=" + JSON.stringify(injected) + ";",
      }),
    );
    await hostile.goto(base);
    assert.match(
      await hostile.locator("#site-title").innerText(),
      /<img src=x/,
    );
    assert.equal(
      await hostile
        .locator('#site-detail img, #site-list img, a[href^="javascript:"]')
        .count(),
      0,
    );
    assert.equal(
      await hostile.evaluate(() => window.unsafeExecuted),
      undefined,
    );
    await hostile.close();
    pass(
      "Adversarial data stays text; unsafe source URLs are not rendered as active links.",
    );
    const nojs = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 900 },
    });
    const staticPage = await nojs.newPage();
    await staticPage.goto(new URL("companies/anthropic/", base).href);
    assert.match(
      await staticPage.locator("#models").innerText(),
      /Claude Opus 5.5/,
    );
    await staticPage.goto(new URL("directory/", base).href);
    assert.equal(await staticPage.locator(".entity-card").count(), 140);
    await staticPage.goto(new URL("sources.html", base).href);
    assert.match(
      await staticPage.locator("#sources").innerText(),
      /126 public sources/,
    );
    await nojs.close();
    await page.goto(
      pathToFileURL(
        path.join(root, "infrastructure/companies/openai/index.html"),
      ).href,
    );
    assert.match(await page.locator("h1").innerText(), /OpenAI/);
    await page.goto(
      pathToFileURL(path.join(root, "infrastructure/index.html")).href,
    );
    assert.equal(await page.locator("#site-list .entity-card").count(), 12);
    assert(await page.locator("[data-street-layer]").isDisabled());
    pass(
      "Blocked map/data, JavaScript-disabled entity pages/directory and local-file preview retain useful content and fallback links.",
    );
    assert.deepEqual(report.pageErrors, []);
    assert.deepEqual(report.externalRequests, []);
    pass(
      "No page errors or unapproved external runtime requests in the tested revision.",
    );
    report.status = "passed";
  } catch (error) {
    report.status = "failed";
    report.error = error.stack;
    throw error;
  } finally {
    await browser.close();
    server.close();
    fs.writeFileSync(
      path.join(out, "v2-browser-report.json"),
      JSON.stringify(report, null, 2) + "\n",
    );
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
