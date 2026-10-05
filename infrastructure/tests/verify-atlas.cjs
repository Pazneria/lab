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
(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base =
    process.env.LAB_ATLAS_BASE ||
    `http://127.0.0.1:${server.address().port}/lab/infrastructure/`;
  report.base = base;
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.LAB_BROWSER_CHANNEL || "msedge",
  });
  report.browser = browser.version();
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1050 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("pageerror", (e) => report.pageErrors.push(e.message));
    page.on("request", (r) => {
      if (new URL(r.url()).origin !== new URL(base).origin)
        report.externalRequests.push(r.url());
    });
    await page.goto(new URL("../lab-space/", base).href);
    assert.equal(
      await page.locator("#infrastructure-link").getAttribute("href"),
      "/lab/infrastructure/",
    );
    assert.equal(
      await page.locator("#catalog-link").getAttribute("href"),
      "https://pazneria.github.io/lab/",
    );
    await page.locator("#infrastructure-link").focus();
    await page.keyboard.press("Enter");
    await page.waitForURL(base);
    await page.locator("#atlas:not([hidden])").waitFor();
    assert.equal(await page.locator(".site-button").count(), 25);
    assert.equal(
      await page.locator("#chain-stages [data-profile]").count(),
      22,
    );
    assert.equal(await page.locator(".change").count(), 7);
    await overflow(page, "desktop");
    await audit(page, "desktop");
    await shot(page, "desktop.png");
    pass(
      "All 25 sites, featured supply-chain profiles and seven source-timeline entries load with no runtime service dependency.",
    );
    pass(
      "The shared Lab navigation opens the atlas by keyboard and preserves the benchmark destination.",
    );
    await page.locator("#filters [name=status]").selectOption("announced");
    assert.equal(await page.locator(".site-button").count(), 2);
    assert.match(
      await page.locator("#site-detail").innerText(),
      /planned|Announced/,
    );
    await page.locator("#filters [name=type]").selectOption("fab");
    assert.equal(await page.locator(".site-button").count(), 0);
    assert.match(
      await page.locator("#site-detail").innerText(),
      /No matching site/,
    );
    assert.equal(await page.locator("#map-points button").count(), 0);
    await page.locator("#filters button[type=reset]").click();
    assert.equal(await page.locator(".site-button").count(), 25);
    await page.locator("#filters [name=q]").fill("wafer-nonexistent");
    assert.equal(await page.locator(".site-button").count(), 0);
    await page.locator("#filters button[type=reset]").click();
    await page.locator("#filters [name=q]").fill("4NP");
    assert.equal(await page.locator(".site-button").count(), 1);
    assert.match(await page.locator("#site-title").innerText(), /Arizona/);
    await page.locator("#filters button[type=reset]").click();
    await page.locator(".more-filters summary").click();
    await page.locator("[name=country]").selectOption("Singapore");
    assert.equal(await page.locator(".site-button").count(), 2);
    await page.locator("[name=type]").selectOption("packaging");
    assert.equal(await page.locator(".site-button").count(), 1);
    assert.match(
      await page.locator("#site-title").innerText(),
      /HBM packaging/,
    );
    await page.locator("#filters button[type=reset]").click();
    await page.locator("#filters [name=player]").selectOption("openai");
    assert.equal(await page.locator(".site-button").count(), 2);
    await page.locator("[name=role]").selectOption("customer");
    assert.equal(await page.locator(".site-button").count(), 1);
    assert.match(await page.locator("#site-title").innerText(), /Abilene/);
    await page.locator("#filters button[type=reset]").click();
    pass(
      "Status, type, search, country and explicit company-role filters combine, clear hidden selections, reset and show meaningful empty states.",
    );
    await page.locator("[data-region=asia]").click();
    await page.locator("[name=country]").selectOption("Singapore");
    const cluster = page.locator(".cluster-point");
    assert.equal(await cluster.count(), 1);
    assert.equal(await cluster.textContent(), "2");
    await cluster.focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator("#map-cluster button").count(), 3);
    await page
      .locator("#map-cluster button")
      .filter({ hasText: "HBM packaging" })
      .click();
    assert.match(
      await page.locator("#site-title").innerText(),
      /HBM packaging/,
    );
    await page.locator("#filters button[type=reset]").click();
    pass(
      "Coincident Singapore projects share one cluster; keyboard activation opens independently selectable sites.",
    );
    await page.locator("[name=player]").selectOption("micron");
    await page.locator(".site-button").filter({ hasText: "Sanand" }).focus();
    await page.keyboard.press("Enter");
    assert.match(
      await page.locator("#site-detail").innerText(),
      /not front-end wafer fabrication/,
    );
    const selectedUrl = page.url();
    await page.reload();
    assert.equal(page.url(), selectedUrl);
    assert.match(await page.locator("#site-title").innerText(), /Sanand/);
    assert.equal(await page.locator("[name=player]").inputValue(), "micron");
    await page.locator("#filters button[type=reset]").click();
    pass(
      "Keyboard site selection and URL reload retain the selected site and filters.",
    );
    await page.locator("[name=profile]").selectOption("nvidia");
    await page.locator("[name=product]").selectOption("gb200");
    assert.equal(await page.locator(".relation").count(), 2);
    assert.match(
      await page.locator(".relations").innerText(),
      /originating fab lots unknown|does not identify originating fab lots/,
    );
    await page.locator("[name=evidence]").selectOption("site_product");
    assert.equal(await page.locator(".relation").count(), 0);
    assert.match(
      await page.locator(".relations").innerText(),
      /No relationship matches/,
    );
    await page.locator("[name=product]").selectOption("all");
    await page.locator("[name=evidence]").selectOption("all");
    await page.locator(".entity-link[data-entity=tsmc]").first().click();
    assert.equal(await page.locator("[name=profile]").inputValue(), "tsmc");
    await page
      .locator(".entity-link[data-entity=tsmc-arizona]")
      .first()
      .click();
    assert.match(await page.locator("#site-title").innerText(), /Arizona/);
    await page.locator("[name=profile]").selectOption("amd");
    assert.match(
      await page.locator(".relations").innerText(),
      /exact fab unknown/,
    );
    await page.locator("[name=profile]").selectOption("dell");
    assert.match(
      await page.locator(".relations").innerText(),
      /planned compute standard/,
    );
    await page.locator("[name=profile]").selectOption("amazon");
    await page
      .locator("#player-detail summary")
      .filter({ hasText: "program scope" })
      .click();
    assert.match(
      await page.locator("#player-detail").innerText(),
      /Nearly 500,000 Trainium2 chips/,
    );
    assert.match(
      await page.locator("#player-detail").innerText(),
      /not allocated to one site/,
    );
    await page.locator(".profile-map").click();
    assert.equal(
      await page.locator("#filters [name=player]").inputValue(),
      "amazon",
    );
    await page.locator(".site-button").filter({ hasText: "Rainier" }).click();
    assert.doesNotMatch(
      await page.locator("#site-detail").innerText(),
      /500,000/,
    );
    await page.locator("#filters button[type=reset]").click();
    pass(
      "Evidence/product filters, all partner profiles, product/fab separation and multisite program boundaries are retained.",
    );
    for (const site of raw.sites) {
      await page.goto(base + "?site=" + site.id);
      assert.equal(
        await page.locator("#site-title").textContent(),
        site.name.replaceAll("&amp;", "&"),
      );
      assert.match(
        await page.locator("#site-detail").innerText(),
        /Status as of/,
      );
    }
    await page.goto(base + "?site=calvert-cliffs");
    assert.match(await page.locator("#site-detail").innerText(), /1,790 MW/);
    assert.match(await page.locator("#site-detail").innerText(), /690 MW/);
    assert.match(
      await page.locator("#site-detail").innerText(),
      /included within 690 MW/,
    );
    await shot(page, "power-detail.png", true);
    await page.goto(base + "?site=tsmc-ap6");
    assert.match(
      await page.locator("#site-detail").innerText(),
      /300 mm wafer-equivalents/,
    );
    assert.match(
      await page.locator("#site-detail").innerText(),
      /not front-end wafer starts/,
    );
    await page.goto(base + "?site=sk-m15x");
    assert.match(
      await page.locator("#site-detail").innerText(),
      /Status not established/,
    );
    await page.goto(base + "?site=crane");
    assert.match(
      await page.locator("#site-detail").innerText(),
      /Restart in progress/,
    );
    pass(
      "Every site deep link resolves; distinct generation, contract, planned uprate, packaging capacity and unknown/restart states are visible.",
    );
    const unsafe = await page
      .locator('a[href^="https:"]')
      .evaluateAll((links) =>
        links
          .filter(
            (a) =>
              a.target !== "_blank" ||
              !a.rel.includes("noopener") ||
              !a.rel.includes("noreferrer"),
          )
          .map((a) => a.href),
      );
    assert.deepEqual(unsafe, []);
    const hostile = "<img src=x onerror=alert(1)>";
    await page.goto(base + "?q=" + encodeURIComponent(hostile));
    assert.equal(await page.locator("#filters [name=q]").inputValue(), hostile);
    assert.equal(await page.locator('img[src="x"]').count(), 0);
    pass(
      "External links use HTTPS plus noopener/noreferrer; search text is rendered as text.",
    );
    await page.goto(base + "?site=stargate-abilene");
    await page
      .locator("#supply-chain")
      .evaluate((el) => el.scrollIntoView({ block: "start" }));
    await shot(page, "supply-chain.png");
    await audit(page, "supply-chain");
    for (const width of [390, 320, 768]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(new URL("../lab-space/", base).href);
      await overflow(page, `${width}px shared navigation`);
      const links = await page
        .locator("#tools a")
        .evaluateAll((links) =>
          links.map((a) => ({
            left: a.getBoundingClientRect().left,
            right: a.getBoundingClientRect().right,
            top: a.getBoundingClientRect().top,
            bottom: a.getBoundingClientRect().bottom,
          })),
        );
      for (let i = 0; i < links.length; i++)
        for (let j = i + 1; j < links.length; j++)
          assert(
            links[i].right <= links[j].left ||
              links[j].right <= links[i].left ||
              links[i].bottom <= links[j].top ||
              links[j].bottom <= links[i].top,
            "Shared navigation links overlap",
          );
      if (width === 390) await shot(page, "lab-navigation-mobile.png");
      await page.locator("#infrastructure-link").click();
      await page.waitForURL(base);
      await page.goto(base);
      await overflow(page, `${width}px`);
      if (width === 390) {
        await audit(page, "mobile");
        await shot(page, "mobile.png", true);
        await page.locator("#filters [name=status]").selectOption("unknown");
        assert.equal(await page.locator(".site-button").count(), 1);
        await page.locator(".site-button").click();
        assert.match(await page.locator("#site-title").textContent(), /M15X/);
        await shot(page, "mobile-detail.png");
      }
    }
    pass(
      "390px, 320px and 768px layouts have no horizontal overflow; mobile filter and detail selection pass.",
    );
    const fallback = await context.newPage();
    await fallback.route("**/assets/world.svg", (r) => r.abort());
    await fallback.goto(base);
    await fallback.locator("#map-fallback:not([hidden])").waitFor();
    assert.equal(await fallback.locator(".site-button").count(), 25);
    await fallback.locator(".site-button").nth(2).click();
    assert.match(
      await fallback.locator("#site-title").innerText(),
      /Kaohsiung/,
    );
    await fallback.close();
    const noData = await context.newPage();
    await noData.route("**/assets/atlas-data.js", (r) => r.abort());
    await noData.goto(base);
    assert.equal(await noData.locator("#load-error").isVisible(), true);
    assert.equal(await noData.locator("#atlas").isVisible(), false);
    assert.equal(
      await noData.locator("#load-error a").getAttribute("href"),
      "sources.html",
    );
    await noData.close();
    const disabled = await browser.newContext({ javaScriptEnabled: false });
    const nojs = await disabled.newPage();
    await nojs.goto(new URL("../lab-space/", base).href);
    assert.equal(
      await nojs.locator("#infrastructure-link").getAttribute("href"),
      "/lab/infrastructure/",
    );
    await nojs.locator("#infrastructure-link").click();
    await nojs.waitForURL(base);
    assert(await nojs.locator("noscript").isVisible());
    await nojs.goto(base + "sources.html");
    assert.equal(
      await nojs.locator(".static-record").count(),
      25 + 25 + 14 + 28 + 7,
    );
    assert.match(
      await nojs.locator("body").innerText(),
      /Null means not established/,
    );
    await disabled.close();
    pass(
      "Failed basemap leaves the directory usable; missing data and JavaScript-disabled mode offer the complete readable source index.",
    );
    await page.setViewportSize({ width: 1440, height: 1050 });
    await page.goto(
      pathToFileURL(path.join(root, "infrastructure/index.html")).href,
    );
    assert.equal(await page.locator(".site-button").count(), 25);
    pass("Direct file preview works without fetch or a local web server.");
    // Test hostile fixture in memory only; it is never written to publishable data.
    const safe = await context.newPage();
    await safe.route("**/assets/atlas-data.js", async (r) => {
      const text = fs.readFileSync(
        path.join(root, "infrastructure/assets/atlas-data.js"),
        "utf8",
      );
      await r.fulfill({
        contentType: "text/javascript",
        body:
          text +
          '\nwindow.INFRASTRUCTURE_ATLAS.sources[0].url="javascript:alert(1)";window.INFRASTRUCTURE_ATLAS.sites[0].name="<img src=x onerror=alert(1)>";',
      });
    });
    await safe.goto(base);
    assert.equal(await safe.locator('img[src="x"]').count(), 0);
    assert.equal(await safe.locator('a[href^="javascript:"]').count(), 0);
    await safe.close();
    pass("Data rendering rejects non-HTTPS source URLs and HTML payloads.");
    // file: requests above are local by design.
    report.externalRequests = report.externalRequests.filter(
      (url) => !url.startsWith("file:"),
    );
    assert.deepEqual(report.externalRequests, []);
    assert.deepEqual(report.pageErrors, []);
    await context.close();
  } finally {
    await browser.close();
    server.close();
    fs.writeFileSync(
      path.join(out, "verification.json"),
      JSON.stringify(report, null, 2) + "\n",
    );
  }
})().catch((error) => {
  console.error(error);
  server.close();
  process.exitCode = 1;
});
