const assert = require("node:assert/strict");
const fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const axeScript =
  process.env.LAB_AXE_SCRIPT || require.resolve("axe-core/axe.min.js");
const root = path.resolve(__dirname, ".."),
  out = path.join(root, "evidence");
const original = JSON.parse(
  fs.readFileSync(path.join(root, "data/catalog.original.json"), "utf8"),
);
const report = {
  testedAt: new Date().toISOString(),
  provenance:
    "Parent-supplied original catalog; Library materialization did not succeed",
  records: 20,
  sourceURLs: 51,
  checks: [],
  viewports: [],
  axe: [],
  errors: [],
  missingAssets: [],
  externalRequests: [],
};
const server = http.createServer((req, res) => {
  const u = new URL(req.url, "http://127.0.0.1"),
    rel = u.pathname.replace(/^\/lab(?=\/|$)/, "") || "/";
  const file = path.resolve(
    root,
    "." +
      (rel.endsWith("/")
        ? rel + "catalog.html"
        : rel.replace(/index\.html$/, "catalog.html")),
  );
  if (
    !file.startsWith(root + path.sep) ||
    !fs.existsSync(file) ||
    !fs.statSync(file).isFile()
  ) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.setHeader(
    "Content-Type",
    {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
      ".json": "application/json",
      ".svg": "image/svg+xml",
    }[path.extname(file)] || "application/octet-stream",
  );
  res.end(fs.readFileSync(file));
});
function passed(s) {
  report.checks.push(s);
  console.log("PASS " + s);
}
async function audit(page, label) {
  await page.addScriptTag({ path: axeScript });
  const result = await page.evaluate(() =>
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
  const data = {
    label,
    violations: result.violations.map((r) => ({
      id: r.id,
      nodes: r.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
    incomplete: result.incomplete.map((r) => ({
      id: r.id,
      targets: r.nodes.map((n) => n.target),
    })),
    passes: result.passes.length,
  };
  report.axe.push(data);
  assert.equal(data.violations.length, 0, JSON.stringify(data.violations));
}
(async () => {
  fs.mkdirSync(out, { recursive: true });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const origin = "http://127.0.0.1:" + server.address().port,
    url = origin + "/lab/";
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      ...(process.env.LAB_BROWSER_CHANNEL
        ? { channel: process.env.LAB_BROWSER_CHANNEL }
        : {}),
    });
    report.browser = browser.version();
    const context = await browser.newContext({ reducedMotion: "reduce" }),
      page = await context.newPage();
    page.on("pageerror", (e) => report.errors.push(e.message));
    page.on("response", (r) => {
      if (r.status() >= 400) report.missingAssets.push(r.url());
    });
    page.on("request", (r) => {
      if (!r.url().startsWith(origin) && !r.url().startsWith("data:"))
        report.externalRequests.push(r.url());
    });
    await page.goto(url, { waitUntil: "networkidle" });
    assert.equal(await page.locator("#results .entry").count(), 19);
    assert.equal(await page.locator("#watch-results .entry").count(), 1);
    assert.equal(
      await page
        .locator("#benchmark-voxelbench")
        .getAttribute("data-entry-type"),
      "watch",
    );
    assert.equal(await page.locator(".entry-sources a").count(), 51);
    assert.match(
      await page.locator("#catalog-basis").textContent(),
      /Original research catalog/,
    );
    assert.match(
      await page.locator("#catalog-basis").textContent(),
      /Research snapshot: 2026-09-30/,
    );
    assert.equal(
      (await page.locator("#coverage-note").textContent()).trim(),
      original.coverage_note,
    );
    assert.equal(
      (await page.locator("#aggregation-note").textContent()).trim(),
      original.aggregation.reason,
    );
    for (const e of original.entries) {
      const article = page.locator("#benchmark-" + e.id);
      assert.equal(await article.count(), 1);
      await article.locator("details").evaluate((n) => (n.open = true));
      const text = await article.textContent();
      for (const s of [
        e.name,
        e.summary,
        e.scope,
        e.lifecycle.basis,
        e.verification.note,
        e.result_note,
        e.next_check,
        ...e.inference.may_infer,
        ...e.inference.may_not_infer,
      ])
        assert.ok(text.includes(s), e.id + " missing " + s);
      assert.deepEqual(
        await article
          .locator(".entry-sources a")
          .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href"))),
        e.sources.map((s) => s.url),
      );
      assert.equal(
        await article.locator(".metric-definition").count(),
        (e.metrics || []).length,
      );
      for (const m of e.metrics || []) assert.ok(text.includes(m.protocol));
      await article.locator("details").evaluate((n) => (n.open = false));
    }
    assert.equal(await page.locator(".metric-definition").count(), 30);
    assert.equal(
      await page
        .locator("#benchmark-astra-nethack-ascension")
        .getAttribute("data-entry-type"),
      "showcase",
    );
    passed(
      "All 20 original records, 51 exact URLs, 30 null-valued metric definitions, complete scope/basis/inference/limits/next checks; watch and showcase remain distinct",
    );
    for (const width of [1440, 1024, 768, 720, 640, 390, 320]) {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      await page.goto(url);
      const d = await page.evaluate(() => ({
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
      }));
      report.viewports.push(d);
      assert.ok(
        d.documentWidth <= width && d.bodyWidth <= width,
        "overflow " + width,
      );
    }
    passed(
      "Real-data layout at seven widths, 320–1440px, without horizontal overflow",
    );
    await audit(page, "real catalog, 320px");
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(url);
    await page.screenshot({ path: path.join(out, "lab-catalog-desktop.png") });
    await audit(page, "real catalog, desktop");
    for (const [category, count] of [
      ["community", 4],
      ["games", 5],
      ["medical", 5],
      ["physical", 6],
    ]) {
      await page.getByRole("button", { name: "Reset filters" }).click();
      await page
        .locator("input[name=category][value=" + category + "]")
        .check();
      assert.equal(await page.locator(".entry").count(), count);
      assert.equal(
        await page.locator("[data-count=" + category + "]").textContent(),
        String(count),
      );
    }
    for (const [setting, count] of [
      ["real-trial", 5],
      ["observation", 1],
      ["simulation", 3],
      ["case", 1],
      ["game", 4],
      ["dataset", 4],
      ["sandbox", 1],
      ["mixed", 1],
    ]) {
      await page.getByRole("button", { name: "Reset filters" }).click();
      await page.locator("#setting").selectOption(setting);
      assert.equal(await page.locator(".entry").count(), count, setting);
    }
    for (const [status, count] of [
      ["live", 11],
      ["historical", 6],
      ["ongoing", 2],
      ["unverified", 1],
    ]) {
      await page.getByRole("button", { name: "Reset filters" }).click();
      await page.locator("#status").selectOption(status);
      assert.equal(await page.locator(".entry").count(), count, status);
    }
    await page.getByRole("button", { name: "Reset filters" }).click();
    await page.locator("#search").fill("voxelbench");
    assert.equal(await page.locator("#results .entry").count(), 0);
    assert.equal(await page.locator("#watch-results .entry").count(), 1);
    assert.match(
      await page.locator("#benchmark-voxelbench").textContent(),
      /Prior retrieval failed/,
    );
    await page.reload();
    assert.equal(await page.locator("#search").inputValue(), "voxelbench");
    assert.equal(await page.locator(".entry").count(), 1);
    await page.getByRole("button", { name: "Reset filters" }).click();
    assert.equal(new URL(page.url()).search, "");
    passed(
      "Four category counts, four snapshot statuses, eight evidence settings, searchable separate VoxelBench watch, URL reload and reset",
    );
    await page.goto(url + "?category=medical&setting=real-trial");
    assert.equal(await page.locator(".entry").count(), 2);
    assert.equal(await page.locator("#benchmark-masai-trial").count(), 1);
    assert.equal(
      await page.locator("#benchmark-kenya-ai-consult-trial").count(),
      1,
    );
    await page.goto(url + "?category=medical#benchmark-masai-trial");
    assert.equal(
      await page.locator("#benchmark-masai-trial details").getAttribute("open"),
      "",
    );
    assert.match(
      await page.locator("#benchmark-masai-trial").textContent(),
      /noninferiority, not statistically established superiority/,
    );
    assert.match(
      await page.locator("#benchmark-kenya-ai-consult-trial").textContent(),
      /not statistically significant/,
    );
    await audit(page, "real medical trial detail, desktop");
    await page.evaluate(() => {
      document.activeElement?.blur();
      window.scrollTo(0, 0);
    });
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    await page.mouse.move(0, 0);
    await page.screenshot({
      path: path.join(out, "lab-medical-detail-desktop.png"),
      fullPage: true,
    });
    passed(
      "Prospective medical trials separated from retrospective/simulated tasks; original outcome limitations remain attached; evidence permalink opens",
    );
    assert.match(
      await page.locator("#benchmark-masai-trial").textContent(),
      /propositions that the evidence does not establish/,
    );
    await page
      .locator("#benchmark-masai-trial")
      .screenshot({ path: path.join(out, "lab-medical-evidence-desktop.png") });
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto(url + "?category=medical#benchmark-masai-trial");
    await audit(page, "real medical trial detail, 320px");
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    await page.evaluate(
      () => (document.documentElement.style.fontSize = "200%"),
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "expanded real detail 200% text overflow",
    );
    await page.screenshot({
      path: path.join(out, "lab-real-320-text-200.png"),
      fullPage: true,
    });
    passed("Expanded real-source URLs/details and 200% text reflow at 320px");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url + "?category=medical");
    await page.locator("#catalog").scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(out, "lab-catalog-mobile.png") });
    await page.goto(url + "?category=medical#benchmark-masai-trial");
    await page
      .locator("#benchmark-masai-trial")
      .screenshot({ path: path.join(out, "lab-medical-detail-mobile.png") });
    await page.goto(url);
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() => document.activeElement.className),
      "skip-link",
    );
    await page.keyboard.press("Enter");
    assert.equal(await page.evaluate(() => document.activeElement.id), "main");
    await page.locator("input[name=category][value=medical]").focus();
    await page.keyboard.press("ArrowDown");
    assert.equal(
      await page.locator("input[name=category]:checked").inputValue(),
      "physical",
    );
    await page.getByRole("button", { name: "Reset filters" }).focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(".entry").count(), 20);
    await page.locator("#benchmark-astra-nethack-ascension summary").focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page
        .locator("#benchmark-astra-nethack-ascension details")
        .getAttribute("open"),
      "",
    );
    await page.emulateMedia({
      forcedColors: "active",
      reducedMotion: "reduce",
    });
    await page.locator("#search").focus();
    assert.equal(
      await page
        .locator("#search")
        .evaluate((n) => getComputedStyle(n).outlineStyle),
      "solid",
    );
    assert.equal(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
      "auto",
    );
    await page.screenshot({
      path: path.join(out, "lab-real-forced-colors.png"),
    });
    passed(
      "Real-data keyboard skip/radio/reset/native detail behavior, forced colors, reduced motion",
    );
    const noJS = await browser.newContext({ javaScriptEnabled: false });
    const fallback = await noJS.newPage();
    await fallback.goto(url);
    assert.equal(
      await fallback.locator('a[href="data/catalog.original.json"]').count(),
      1,
    );
    await fallback.locator(".status-guide summary").click();
    assert.equal(
      await fallback.locator(".status-guide").getAttribute("open"),
      "",
    );
    await noJS.close();
    passed(
      "No-JavaScript route to complete original JSON and readable native evidence guide",
    );
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.missingAssets, []);
    assert.deepEqual(report.externalRequests, []);
    passed(
      "Zero browser errors, missing assets, or third-party runtime requests",
    );
    report.result = "passed";
  } catch (e) {
    report.result = "failed";
    report.failure = e.stack;
    console.error(e.stack);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    await new Promise((r) => server.close(r));
    fs.writeFileSync(
      path.join(out, "real-catalog-validation.json"),
      JSON.stringify(report, null, 2),
    );
  }
})();
