const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(__dirname, ".."),
  out = path.join(root, "evidence");
const report = {
  checkedAt: new Date().toISOString(),
  checks: [],
  axe: [],
  viewports: [],
  errors: [],
  externalRequests: [],
  passed: false,
};
const server = http.createServer((req, res) => {
  try {
    const rel =
      decodeURIComponent(new URL(req.url, "http://localhost").pathname).replace(
        /^\/lab\//,
        "",
      ) || "index.html";
    const file = path.resolve(root, rel);
    if (
      !/^(?:index\.html|benchmarks\.html|results\.html|(?:assets|data)\/[^.][^\\]*)$/.test(
        rel,
      ) ||
      !file.startsWith(root + path.sep) ||
      !fs.statSync(file).isFile()
    )
      throw Error();
    res.setHeader(
      "Content-Type",
      {
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".json": "application/json",
      }[path.extname(file)] || "text/plain",
    );
    res.end(fs.readFileSync(file));
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
const pass = (value) => {
  report.checks.push(value);
  console.log("PASS " + value);
};
async function main() {
  fs.mkdirSync(out, { recursive: true });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = "http://127.0.0.1:" + server.address().port + "/lab/";
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.LAB_BROWSER_CHANNEL || undefined,
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: "reduce",
    });
    page.on("pageerror", (err) => report.errors.push(err.message));
    page.on("request", (req) => {
      if (new URL(req.url()).origin !== new URL(base).origin)
        report.externalRequests.push(req.url());
    });
    const go = async (q) => {
      await page.goto(base + q);
      await page
        .locator(
          q.startsWith("results") ? "#benchmark-detail" : ".benchmark-card",
        )
        .first()
        .waitFor();
    };
    const audit = async (label) => {
      await page.addScriptTag({
        path:
          process.env.LAB_AXE_SCRIPT || require.resolve("axe-core/axe.min.js"),
      });
      const a = await page.evaluate(() =>
        axe.run(document, {
          runOnly: {
            type: "tag",
            values: [
              "wcag2a",
              "wcag2aa",
              "wcag21aa",
              "wcag22aa",
              "best-practice",
            ],
          },
        }),
      );
      report.axe.push({
        label,
        violations: a.violations.map((v) => ({
          id: v.id,
          targets: v.nodes.map((n) => n.target),
        })),
        incomplete: a.incomplete.map((v) => v.id),
      });
      assert.equal(a.violations.length, 0, JSON.stringify(report.axe.at(-1)));
    };
    const historic = [
      "factorio-learning-environment",
      "astra-nethack-ascension",
      "masai-trial",
      "kenya-ai-consult-trial",
      "stationerybench",
      "barn-challenge-2026-finals",
      "medagentbench-v2-revised-original-tasks",
      "medagentbench-v2-memory-heldout",
      "medagentbench-v2-new-tasks",
    ];
    await go("benchmarks.html?history=historical");
    assert.equal(await page.locator(".benchmark-card").count(), 19);
    for (const id of historic)
      assert.equal(
        await page.locator(`[data-benchmark-id="${id}"]`).count(),
        1,
        id + " missing from historical evidence",
      );
    await page.reload();
    assert.equal(
      await page.getByLabel("Results history").inputValue(),
      "historical",
    );
    await page.getByLabel("Results history").selectOption("current");
    assert.equal(await page.locator(".benchmark-card").count(), 14);
    for (const id of historic)
      assert.equal(
        await page.locator(`[data-benchmark-id="${id}"]`).count(),
        0,
        id + " wrongly shown as current",
      );
    assert.ok(
      await page
        .locator(".benchmark-card")
        .evaluateAll((ns) =>
          ns.every(
            (n) =>
              n.dataset.evidenceStatus === "plotted" &&
              n.dataset.cohortPeriod === "latest_collected",
          ),
        ),
    );
    pass(
      "Six inherited historical discovery entries and three fixed PSB paper cohorts are historical; latest collected contains 14 plotted cohorts and no guides or unresolved results",
    );
    await page.getByLabel("Results history").selectOption("source-only");
    assert.equal(await page.locator(".benchmark-card").count(), 17);
    assert.equal(await page.locator(".mini-graph svg").count(), 0);
    assert.equal(
      await page.locator('[data-benchmark-id="masai-trial"]').count(),
      1,
    );
    await page.getByLabel("Results history").selectOption("unavailable");
    assert.deepEqual(
      await page
        .locator(".benchmark-card")
        .evaluateAll((ns) => ns.map((n) => n.dataset.benchmarkId).sort()),
      ["robochallenge-table30", "voxelbench"],
    );
    assert.equal(await page.locator(".mini-graph svg").count(), 0);
    await page.reload();
    assert.equal(
      await page.getByLabel("Results history").inputValue(),
      "unavailable",
    );
    await page.getByLabel("Results history").selectOption("all");
    assert.equal(await page.locator(".benchmark-card").count(), 46);
    assert.equal(
      await page
        .locator(".card-status")
        .filter({ hasText: "Source checked · Oct 2026" })
        .count(),
      0,
    );
    pass(
      "All 46 cards remain accessible; 17 source guides and two unresolved-result guides show no fake graphs; filters survive reload",
    );
    await audit("All evidence statuses desktop");
    await page.screenshot({
      path: path.join(out, "gallery-audit-desktop.png"),
      fullPage: true,
    });
    for (const id of [
      "factorio-learning-environment",
      "masai-trial",
      "stationerybench",
      "medagentbench-v2-memory-heldout",
    ]) {
      await go("results.html?benchmark=" + id);
      assert.equal(await page.locator(".historical-notice").count(), 1);
      assert.match(
        await page.locator(".historical-notice").textContent(),
        /historical.*not current standings/,
      );
      await page.locator("#benchmark-dates>summary").click();
      assert.match(
        await page.locator("#benchmark-dates").textContent(),
        /maintained benchmark can contain older experiments/,
      );
    }
    await go("results.html?benchmark=voxelbench");
    await page.locator("#benchmark-dates>summary").click();
    assert.match(
      await page.locator("#benchmark-dates").textContent(),
      /does not establish that the project is inactive/,
    );
    await go("results.html?benchmark=webdev-arena-frontend&comparison=methods");
    assert.match(
      await page.locator(".detail-dates").textContent(),
      /October 1|Oct 1/,
    );
    assert.match(
      await page.locator(".detail-source-review").textContent(),
      /Run dates not reported.*Oct 5, 2026/,
    );
    await page.locator("#benchmark-dates>summary").click();
    assert.match(
      await page.locator("#benchmark-dates").textContent(),
      /not an evaluation date/,
    );
    await audit("Separate source and run dates desktop");
    await go("results.html?benchmark=gpqa-diamond");
    await page.locator("#benchmark-dates>summary").click();
    assert.match(
      await page.locator("#benchmark-dates").textContent(),
      /model release is not evaluation time or benchmark age/,
    );
    await go("results.html?benchmark=bullshitbench-v2&view=time");
    assert.match(
      await page.locator(".detail-source-review").textContent(),
      /Latest dated run: Sep 29, 2026/,
    );
    await page.locator("input[name=view][value=all]").check();
    assert.match(
      await page.locator(".detail-source-review").textContent(),
      /Run dates not reported/,
    );
    pass(
      "Source check, snapshot, paper, evaluation and model-release dates retain separate meanings; an unresolved source does not become an inactive benchmark",
    );
    for (const width of [1440, 1024, 768, 640, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      for (const q of [
        "benchmarks.html?history=historical",
        "benchmarks.html?history=source-only",
        "results.html?benchmark=medagentbench-v2-memory-heldout",
        "results.html?benchmark=gpqa-diamond",
      ]) {
        await go(q);
        if (q.startsWith("results"))
          await page.locator("#benchmark-dates>summary").click();
        const d = await page.evaluate(() => ({
          width: innerWidth,
          scroll: document.documentElement.scrollWidth,
        }));
        report.viewports.push({ q, ...d });
        assert.ok(d.scroll <= width + 1, JSON.stringify(d));
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await go("benchmarks.html?history=historical");
    await audit("Historical guides mobile");
    await page.screenshot({
      path: path.join(out, "gallery-audit-mobile.png"),
      fullPage: true,
    });
    await go("results.html?benchmark=masai-trial");
    await page.locator("#benchmark-dates>summary").focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator("#benchmark-dates").getAttribute("open"),
      "",
    );
    await audit("Date disclosures mobile keyboard");
    pass(
      "New status/date controls and open disclosures reflow at six widths down to 320px; four axe audits and keyboard activation pass",
    );
    const data = fs.readFileSync(
      path.join(root, "assets/gallery-data.js"),
      "utf8",
    );
    const attack = '<img src=x onerror="window.__dateInjection=1">';
    await page.route("**/assets/gallery-data.js", (route) =>
      route.fulfill({
        contentType: "text/javascript",
        body:
          data +
          "\nwindow.LAB_GALLERY.cardMetadata.cards['voxelbench'].source_review.scope=" +
          JSON.stringify(attack) +
          ";",
      }),
    );
    await go("results.html?benchmark=voxelbench#benchmark-dates");
    assert.ok(
      (await page.locator("#benchmark-dates").textContent()).includes(attack),
    );
    assert.equal(await page.locator("img[onerror]").count(), 0);
    assert.equal(await page.evaluate(() => window.__dateInjection), undefined);
    await page.unroute("**/assets/gallery-data.js");
    await page.route("**/assets/gallery-data.js", (route) =>
      route.fulfill({
        contentType: "text/javascript",
        body:
          data +
          "\nwindow.LAB_GALLERY.cardMetadata.cards['voxelbench'].source_review.date='2026-02-31';",
      }),
    );
    await page.goto(base + "benchmarks.html");
    assert.equal(await page.locator(".benchmark-card").count(), 0);
    await page.unroute("**/assets/gallery-data.js");
    await go("benchmarks.html?history=%3Cscript%3E");
    assert.equal(await page.getByLabel("Results history").inputValue(), "all");
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.externalRequests, []);
    pass(
      "New evidence prose is escaped, impossible dates fail closed, unknown filter state is bounded, and no external runtime resources are requested",
    );
    report.passed = true;
  } finally {
    await browser.close();
  }
}
main()
  .catch((e) => {
    report.failure = e.stack;
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => {
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(
      path.join(out, "gallery-audit-validation.json"),
      JSON.stringify(report, null, 2) + "\n",
    );
    server.close();
  });
