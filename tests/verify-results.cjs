const assert = require("node:assert/strict");
const fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const normalizeDisplayText = require("../scripts/normalize-display-text.cjs");
const root = path.resolve(__dirname, ".."),
  out = path.join(root, "evidence");
const original = JSON.parse(
  fs.readFileSync(path.join(root, "data/results.original.json"), "utf8"),
);
const report = {
  checkedAt: new Date().toISOString(),
  checks: [],
  viewports: [],
  axe: [],
  errors: [],
  missingAssets: [],
  externalRequests: [],
  securityChecks: [],
};
fs.mkdirSync(out, { recursive: true });
const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname.replace(
    /^\/lab(?=\/|$)/,
    "",
  );
  const file = path.resolve(
    root,
    "." +
      (pathname.endsWith("/")
        ? pathname + "catalog.html"
        : pathname
            .replace(/index\.html$/, "catalog.html")
            .replace(/results\.html$/, "results-technical.html")),
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
      ".md": "text/plain",
      ".txt": "text/plain",
    }[path.extname(file)] || "application/octet-stream",
  );
  res.end(fs.readFileSync(file));
});
function passed(message, security = false) {
  report.checks.push(message);
  if (security) report.securityChecks.push(message);
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
    violations: result.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.failureSummary),
    })),
    incomplete: result.incomplete.map((v) => v.id),
  });
  assert.equal(result.violations.length, 0, label + " accessibility");
}
async function settleScreenshot(page) {
  await page.evaluate(() => {
    document.activeElement?.blur();
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.mouse.move(0, 0);
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
}
async function captureCard(page, selector, filename) {
  const viewport = page.viewportSize();
  const card = page.locator(selector);
  const height = Math.ceil((await card.boundingBox()).height) + 48;
  // Tall clips in headless Edge can capture offscreen fixed elements. Give the
  // whole card a real viewport; keep the site's width and styles unchanged.
  await page.setViewportSize({
    ...viewport,
    height: Math.max(viewport.height, height),
  });
  await settleScreenshot(page);
  await card.screenshot({ path: path.join(out, filename) });
  await page.setViewportSize(viewport);
}
async function main() {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}/lab/`,
    url = base + "results.html";
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.LAB_BROWSER_CHANNEL || undefined,
  });
  try {
    const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
      }),
      page = await context.newPage();
    page.on("pageerror", (e) => report.errors.push(e.message));
    page.on("response", (r) => {
      if (r.status() >= 400) report.missingAssets.push(r.url());
    });
    page.on("request", (r) => {
      if (!r.url().startsWith(base.replace("/lab/", "/")))
        report.externalRequests.push(r.url());
    });
    await page.goto(url);
    await page.locator("#results-content:not([hidden])").waitFor();
    assert.deepEqual(
      await page.evaluate(() => ({
        records: window.LAB_RESULTS.records,
        protocols: window.LAB_RESULTS.protocols,
        sources: window.LAB_RESULTS.sources,
        aggregation: window.LAB_RESULTS.aggregation,
        graph_views: window.LAB_RESULTS.graph_views,
      })),
      {
        records: original.results.records,
        // Display text is decoded; raw inputs and numeric comparisons stay exact.
        protocols: normalizeDisplayText(original.results.protocols),
        sources: normalizeDisplayText(original.results.sources),
        aggregation: original.results.aggregation,
        graph_views: original.graph_views,
      },
    );
    assert.equal(await page.locator(".observation-detail").count(), 3);
    assert.match(
      await page.locator("#slice-notice").textContent(),
      /not actual cash spend/,
    );
    for (const [benchmark, skill] of [
      ["runebench", "woodcutting"],
      ["runebench", "mining"],
      ["bullshitbench-v2", null],
      ["medagentbench", null],
    ]) {
      await page.goto(
        url + "?benchmark=" + benchmark + (skill ? "&skill=" + skill : ""),
      );
      await page.waitForFunction(() => {
        const plot = document.querySelector(".chart-plot");
        return (
          plot &&
          Math.abs(
            Number(
              plot.querySelector("svg")?.getAttribute("viewBox")?.split(" ")[2],
            ) - plot.clientWidth,
          ) < 2
        );
      });
      const charts = original.graph_views.charts.filter((c) =>
        benchmark === "runebench"
          ? c.id.startsWith("runebench-" + skill)
          : benchmark === "bullshitbench-v2"
            ? c.id.startsWith("bullshitbench")
            : c.type === "bar",
      );
      for (const c of charts) {
        const card = page.locator("#" + c.id);
        assert.equal(await card.count(), 1);
        assert.match(
          await card.locator(".chart-meta").textContent(),
          /Source access: 2026-09-30/,
        );
        assert.ok(
          (await card.textContent()).includes(
            "No reported uncertainty intervals",
          ),
        );
        await card.locator(".chart-table summary").click();
        const tableRows = await card
          .locator(".chart-table tbody tr")
          .evaluateAll((rows) =>
            rows.map((row) =>
              [...row.children].map((cell) => cell.textContent),
            ),
          );
        const expected =
          c.type === "line"
            ? c.series.flatMap((s) =>
                s.points.map((p) => [
                  s.label,
                  String(p.elapsed_minutes),
                  String(p.peak_normalized_xp_per_min),
                ]),
              )
            : [...c.points]
                .sort(
                  (a, b) =>
                    (c.type === "bar" ? b.x - a.x : b.y - a.y) ||
                    c.points.indexOf(a) - c.points.indexOf(b),
                )
                .map((p) =>
                  c.type === "bar"
                    ? [p.label, String(p.x)]
                    : [p.label, String(p.x), String(p.y)],
                );
        assert.deepEqual(tableRows, expected, c.id + " exact table values");
        await card.locator(".chart-table summary").click();
        if (c.type === "line") {
          assert.equal(await card.locator(".plot-series").count(), 3);
          const paths = await card
            .locator(".plot-series")
            .evaluateAll((nodes) =>
              nodes.map((n) => ({
                id: n.dataset.resultId,
                samples: n.dataset.sampleCount,
                commands: n.getAttribute("d").match(/[ML]/g).length,
              })),
            );
          assert.deepEqual(
            paths.map((p) => [p.id, p.samples, p.commands]),
            c.series.map((s) => [s.result_id, "120", 120]),
          );
          for (const [i, s] of c.series.entries()) {
            await card.locator(".chart-legend button").nth(i).focus();
            await card.locator("input[type=range]").focus();
            const points = await card.locator("input[type=range]").evaluate(
              (slider, series) =>
                series.points.map((p, i) => {
                  slider.value = String(i);
                  slider.dispatchEvent(new Event("input", { bubbles: true }));
                  return {
                    index: slider.value,
                    text: slider.getAttribute("aria-valuetext"),
                  };
                }),
              s,
            );
            assert.equal(points.length, 120);
            assert.match(points[0].text, /Sample 1 of 120/);
            assert.match(points.at(-1).text, /Sample 120 of 120/);
            await card.locator("input[type=range]").press("Home");
            assert.equal(
              await card.locator("input[type=range]").inputValue(),
              "0",
            );
            await card.locator("input[type=range]").press("ArrowRight");
            assert.equal(
              await card.locator("input[type=range]").inputValue(),
              "1",
            );
          }
          await card.locator("svg").click({ position: { x: 150, y: 160 } });
          assert.match(
            await card.locator(".chart-inspector").textContent(),
            /Sample \d+ of 120/,
          );
        } else {
          if (c.type === "scatter") {
            const symbols = await card.evaluate((node) =>
              [...node.querySelectorAll(".chart-legend button")].map(
                (button) => {
                  const legend = button.querySelector(".legend-symbol");
                  const point = node.querySelector(
                    `.plot-point[data-result-id="${button.dataset.resultId}"] .plot-symbol`,
                  );
                  return {
                    id: button.dataset.resultId,
                    shape: legend.tagName,
                    pointShape: point.tagName,
                    sameColor:
                      legend.getAttribute("fill") ===
                      point.getAttribute("fill"),
                  };
                },
              ),
            );
            assert.deepEqual(
              symbols,
              c.points.map((p) => {
                const shape =
                  p.reasoning_effort === "medium"
                    ? "rect"
                    : ["max", "high"].includes(p.reasoning_effort)
                      ? "path"
                      : "circle";
                return {
                  id: p.result_id,
                  shape,
                  pointShape: shape,
                  sameColor: true,
                };
              }),
              c.id + " matching legend shapes and colors",
            );
          }
          assert.deepEqual(
            await card.locator(".plot-point").evaluateAll((nodes) =>
              nodes.map((n) => ({
                id: n.dataset.resultId,
                x: n.dataset.x,
                y: n.dataset.y,
              })),
            ),
            c.points.map((p) => ({
              id: p.result_id,
              x: String(p.x),
              y: p.y === undefined ? "" : String(p.y),
            })),
          );
          const point = card.locator(".plot-point").first();
          await point.focus();
          await page.keyboard.press("Enter");
          assert.ok(
            (await card.locator(".chart-inspector").textContent()).includes(
              c.points[0].label,
            ),
          );
          assert.equal(
            await card
              .locator(".chart-inspector a")
              .first()
              .getAttribute("href"),
            c.points[0].source_url,
          );
        }
      }
    }
    passed(
      "All 18 original records, three protocols, 27 source metadata items and seven chart configurations preserved; exact table alternatives and all 720 rendered curve samples",
    );
    await page.goto(url + "?benchmark=bullshitbench-v2");
    assert.equal(
      await page.locator("#bullshitbench-score-cost .plot-point").count(),
      4,
    );
    assert.equal(
      await page.locator("#bullshitbench-score-time .plot-point").count(),
      6,
    );
    assert.match(
      await page.locator(".chart-exclusions").textContent(),
      /Opus 5.5 · low.*missing.*Opus 5.5 · max/s,
    );
    assert.equal(await page.locator(".observation-detail").count(), 6);
    await page.locator("#bullshitbench-score-cost .zoom-button").click();
    assert.match(
      await page
        .locator("#bullshitbench-score-cost .chart-scale-note")
        .textContent(),
      /50–75%.*Zoomed/,
    );
    await page.locator("#bullshitbench-score-cost .zoom-button").click();
    assert.match(
      await page
        .locator("#bullshitbench-score-cost .chart-scale-note")
        .textContent(),
      /0–100%/,
    );
    await audit(page, "BullshitBench full-scale desktop");
    await settleScreenshot(page);
    await page.evaluate(() => {
      document.activeElement?.blur();
      window.scrollTo(0, 0);
    });
    await page.screenshot({
      path: path.join(out, "results-bullshitbench-desktop.png"),
      fullPage: true,
    });
    passed(
      "All-attempt score domain 0–100%, explicit optional 50–75% zoom; two partial Opus costs excluded while six time points and partial table costs stay visible",
    );
    await page.goto(url + "?benchmark=medagentbench");
    assert.equal(await page.locator(".chart-card").count(), 1);
    assert.match(
      await page.locator("#slice-dates").textContent(),
      /2025-02-12.*Evaluation date unknown/,
    );
    assert.match(
      await page.locator("#slice-notice").textContent(),
      /POST actions are simulated/,
    );
    assert.match(
      await page.locator("#observation-table").textContent(),
      /Not reported; remains null/,
    );
    await audit(page, "MedAgentBench historical desktop");
    await settleScreenshot(page);
    await page.screenshot({
      path: path.join(out, "results-medical-desktop.png"),
      fullPage: true,
    });
    passed(
      "Historical paper version distinct from evaluation date; six score bars, query/action table values, no invented medical cost/time points or clinical-safety claim",
    );
    await page.goto(url);
    await page.locator('input[value="bullshitbench-v2"]').check();
    await page.reload();
    assert.equal(
      await page.locator('input[value="bullshitbench-v2"]').isChecked(),
      true,
    );
    await page.locator('input[value="medagentbench"]').check();
    await page.goBack();
    assert.equal(
      await page.locator('input[value="bullshitbench-v2"]').isChecked(),
      true,
    );
    await page.goto(
      url + "?benchmark=medagentbench#observation-medagentbench-paper-v2-gpt4o",
    );
    assert.equal(
      await page
        .locator("#observation-medagentbench-paper-v2-gpt4o")
        .getAttribute("open"),
      "",
    );
    await page.goto(base + "index.html?q=runebench");
    assert.equal(
      await page
        .locator("#benchmark-runebench .discovery-result-link")
        .getAttribute("href"),
      "results.html?benchmark=runebench",
    );
    await page.locator("#benchmark-runebench .discovery-result-link").click();
    assert.match(await page.locator("#slice-title").textContent(), /RuneBench/);
    passed(
      "URL benchmark/skill state, reload/back navigation, source-row permalink and preserved discovery-to-results route",
    );
    for (const width of [1440, 1024, 768, 640, 390, 320]) {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      for (const benchmark of [
        "runebench",
        "bullshitbench-v2",
        "medagentbench",
      ]) {
        await page.goto(url + "?benchmark=" + benchmark);
        await page.waitForTimeout(80);
        const d = await page.evaluate(() => ({
          width: innerWidth,
          documentWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
        }));
        report.viewports.push({ benchmark, ...d });
        assert.ok(
          d.documentWidth <= width && d.bodyWidth <= width,
          benchmark + " overflow " + width,
        );
        if (width === 320) {
          await page.locator(".chart-table summary").first().click();
          const w = await page.evaluate(
            () => document.documentElement.scrollWidth,
          );
          assert.ok(w <= 320, benchmark + " table overflow");
          await page.locator(".chart-table summary").first().click();
        }
      }
    }
    passed(
      "All benchmark views at six widths, 320–1440px; exact plotted-value tables reflow at 320px without horizontal scrolling",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url);
    await page.locator(".chart-legend button").first().focus();
    await audit(page, "RuneBench mobile focused chart");
    await settleScreenshot(page);
    await captureCard(
      page,
      "#runebench-woodcutting-score-cost",
      "results-rune-cost-mobile.png",
    );
    await captureCard(
      page,
      "#runebench-woodcutting-score-time",
      "results-rune-time-mobile.png",
    );
    await page.goto(url + "?benchmark=bullshitbench-v2");
    await audit(page, "BullshitBench mobile");
    await settleScreenshot(page);
    await captureCard(
      page,
      "#bullshitbench-score-time",
      "results-bull-time-mobile.png",
    );
    await page.goto(url + "?benchmark=medagentbench");
    await audit(page, "Historical medical mobile");
    await settleScreenshot(page);
    await captureCard(
      page,
      "#medagentbench-historical-score",
      "results-medical-mobile.png",
    );
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(url);
    await audit(page, "RuneBench desktop");
    await settleScreenshot(page);
    await captureCard(page, "#charts", "results-rune-desktop.png");
    await page.keyboard.press("Tab");
    await page.locator(".skip-link").focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.evaluate(() => document.activeElement.id), "main");
    await page.locator(".chart-legend button").first().focus();
    await page.keyboard.press("Escape");
    assert.match(
      await page.locator(".chart-inspector").first().textContent(),
      /Explore a point/,
    );
    await page.emulateMedia({
      forcedColors: "active",
      reducedMotion: "reduce",
    });
    assert.equal(
      await page.evaluate(() => matchMedia("(forced-colors: active)").matches),
      true,
    );
    await page.screenshot({
      path: path.join(out, "results-forced-colors.png"),
    });
    await page.emulateMedia({
      forcedColors: "none",
      reducedMotion: "no-preference",
    });
    await page.setViewportSize({ width: 320, height: 844 });
    await page.addStyleTag({ content: "html { font-size:200%; }" });
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    passed(
      "Keyboard point/legend/sample controls, Escape dismissal, skip link, forced colors, reduced motion, 200% text and six zero-violation axe scans",
    );
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.missingAssets, []);
    assert.deepEqual(report.externalRequests, []);
    const noJS = await browser.newContext({ javaScriptEnabled: false });
    const noPage = await noJS.newPage();
    await noPage.goto(url);
    assert.equal(
      await noPage.locator("#results-unavailable").isVisible(),
      true,
    );
    assert.equal(
      await noPage
        .getByRole("link", { name: "original results and graph data" })
        .getAttribute("href"),
      "data/results.original.json",
    );
    const readme = await noPage.request.get(
      base + "data/results-researcher-readme.txt",
    );
    assert.equal(readme.status(), 200);
    assert.equal(await readme.text(), original.readme);
    await noJS.close();
    const local = await context.newPage();
    await local.goto(
      "file:///" +
        path.join(root, "results-technical.html").replace(/\\/g, "/"),
    );
    assert.equal(await local.locator(".chart-card").count(), 2);
    await local.locator('input[value="medagentbench"]').check();
    assert.equal(await local.locator(".chart-card").count(), 1);
    assert.equal(await local.locator(".observation-detail").count(), 6);
    await local.close();
    passed(
      "No-JavaScript raw data/interpretation route, direct file preview; no missing assets, browser errors or third-party runtime requests",
    );
    const projection = await page.evaluate(() => window.LAB_RESULTS);
    async function mutated(change, expectValid, label) {
      const ctx = await browser.newContext({
          viewport: { width: 390, height: 844 },
        }),
        p = await ctx.newPage();
      const fixture = structuredClone(projection);
      change(fixture);
      await p.route("**/assets/results-data.js", (route) =>
        route.fulfill({
          contentType: "text/javascript",
          body: "window.LAB_RESULTS = " + JSON.stringify(fixture) + ";",
        }),
      );
      await p.goto(url);
      assert.equal(
        await p.locator("#results-content").isVisible(),
        expectValid,
        label,
      );
      if (expectValid) {
        assert.equal(await p.locator("img").count(), 0);
        assert.equal(await p.evaluate(() => window.RESULTS_XSS), undefined);
        assert.ok((await p.locator("body").textContent()).includes("<img"));
      } else
        assert.match(
          await p.locator("#results-unavailable").textContent(),
          /could not be validated/,
        );
      await ctx.close();
    }
    await mutated(
      (d) => {
        const r = d.records[0];
        r.display_label = "<img src=x onerror=window.RESULTS_XSS=1>";
        for (const c of d.graph_views.charts) {
          for (const p of c.points || [])
            if (p.result_id === r.result_id) p.label = r.display_label;
          for (const s of c.series || [])
            if (s.result_id === r.result_id) s.label = r.display_label;
        }
      },
      true,
      "Untrusted labels render as text",
    );
    await mutated(
      (d) => (d.records[0].source_url = "javascript:alert(1)"),
      false,
      "Unsafe source URL",
    );
    await mutated(
      (d) => (d.sources[0].url = "https://user:password@example.com"),
      false,
      "Credential-bearing source URL",
    );
    await mutated(
      (d) => (d.graph_views.charts[0].points[0].x = null),
      false,
      "Missing plotted cost",
    );
    await mutated(
      (d) =>
        d.graph_views.charts[0].points.push({
          ...d.graph_views.charts[1].points[0],
          x: d.records[6].cost.value,
        }),
      false,
      "Partial Opus cost illegally plotted",
    );
    await mutated(
      (d) => (d.records[12].cost.value = 0),
      false,
      "Medical unknown converted to zero",
    );
    await mutated(
      (d) => (d.records[1].result_id = d.records[0].result_id),
      false,
      "Duplicate record ID",
    );
    await page.goto(
      url +
        "?benchmark=" +
        encodeURIComponent("<svg onload=alert(1)>") +
        "#%E0%A4%A",
    );
    assert.match(await page.locator("#slice-title").textContent(), /RuneBench/);
    assert.equal(await page.locator("iframe").count(), 0);
    passed(
      "Narrow security checks: text-only malicious labels, rejected unsafe/credential URLs, null plotted coordinates, illegal partial-cost membership, missing-to-zero data, duplicate IDs and malformed query/hash; no iframe or new runtime dependency",
      true,
    );
    await context.close();
  } finally {
    await browser.close();
    server.close();
  }
}
main()
  .catch((e) => {
    report.failure = e.stack;
    console.error(e);
    process.exitCode = 1;
    server.close();
  })
  .finally(() =>
    fs.writeFileSync(
      path.join(out, "results-ui-validation.json"),
      JSON.stringify(report, null, 2) + "\n",
    ),
  );
