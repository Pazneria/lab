// Read-only checks of the published results against this exact Git commit.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const normalizeDisplayText = require("../scripts/normalize-display-text.cjs");
const root = path.resolve(__dirname, "..");
const out = path.join(root, "evidence");
const git = (...args) =>
  execFileSync(
    "git",
    ["-c", "safe.directory=" + root.replace(/\\/g, "/"), ...args],
    { cwd: root, maxBuffer: 4 * 1024 * 1024 },
  );
const sha = git("rev-parse", "HEAD").toString().trim();
const base =
  process.env.LAB_RESULTS_LIVE_BASE || "https://pazneria.github.io/lab/";
const resultsPage =
  process.env.LAB_RESULTS_DEPLOYMENT_PAGE || "results-technical.html";
assert.ok(["results-technical.html", "results.html"].includes(resultsPage));
const input = JSON.parse(
  fs.readFileSync(path.join(root, "data/results.original.json")),
);
const original = input.results;
const report = {
  checkedAt: new Date().toISOString(),
  url: base + resultsPage,
  expectedInterface: "legacy_results_explorer",
  expectedCommit: sha,
  assets: [],
  checks: [],
  charts: [],
  records: [],
  viewports: [],
  axe: [],
  errors: [],
  missingAssets: [],
  externalRequests: [],
  sourceChecks:
    "Exact href preservation; prior read-only result-source reachability checks retained. BARN not retried or bypassed.",
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
async function screenshotCard(page, selector, filename) {
  const viewport = page.viewportSize();
  const card = page.locator(selector);
  const height = Math.ceil((await card.boundingBox()).height) + 48;
  await page.setViewportSize({
    ...viewport,
    height: Math.max(viewport.height, height),
  });
  await page.evaluate(() => {
    document.activeElement?.blur();
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await card.screenshot({ path: path.join(out, filename) });
  await page.setViewportSize(viewport);
}
async function main() {
  for (const file of [
    "catalog.html",
    "assets/lab.css",
    "assets/lab.js",
    "assets/catalog.js",
    "data/catalog.original.json",
    resultsPage,
    "assets/results.css",
    "assets/results.js",
    "assets/results-data.js",
    "data/results.original.json",
    "data/results-rune-evidence.json",
    "data/results-researcher-readme.txt",
  ]) {
    const response = await fetch(base + file + "?commit=" + sha, {
      signal: AbortSignal.timeout(20000),
    });
    assert.equal(response.status, 200, file + " HTTP status");
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.ok(
      bytes.equals(git("show", "HEAD:" + file)),
      file + " differs from deployed commit",
    );
    report.assets.push({
      path: file,
      status: response.status,
      bytes: bytes.length,
      sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
    });
  }
  passed(
    "Twelve live files exactly match the Git commit, including preserved catalog and original result JSON",
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
    page.on("pageerror", (e) => report.errors.push(e.message));
    page.on("response", (r) => {
      if (r.status() >= 400)
        report.missingAssets.push({ url: r.url(), status: r.status() });
    });
    page.on("requestfailed", (r) =>
      report.missingAssets.push({
        url: r.url(),
        error: r.failure()?.errorText,
      }),
    );
    page.on("request", (r) => {
      if (new URL(r.url()).origin !== new URL(base).origin)
        report.externalRequests.push(r.url());
    });
    const chartIDs = new Set(),
      recordIDs = new Set();
    for (const [benchmark, skill] of [
      ["runebench", "woodcutting"],
      ["runebench", "mining"],
      ["bullshitbench-v2", ""],
      ["medagentbench", ""],
    ]) {
      const url = new URL(resultsPage, base);
      url.searchParams.set("benchmark", benchmark);
      if (skill) url.searchParams.set("skill", skill);
      await page.goto(url.href, { waitUntil: "networkidle" });
      assert.equal(
        await page.locator("#result-controls").count(),
        1,
        "Expected legacy results explorer interface at " + resultsPage,
      );
      assert.equal(
        await page.locator("#charts").count(),
        1,
        "Expected legacy all-chart container at " + resultsPage,
      );
      await page.locator(".chart-card").first().waitFor();
      assert.deepEqual(
        await page.evaluate(() => ({
          records: window.LAB_RESULTS.records,
          protocols: window.LAB_RESULTS.protocols,
          sources: window.LAB_RESULTS.sources,
          graph_views: window.LAB_RESULTS.graph_views,
        })),
        {
          records: original.records,
          // Display text is decoded; raw-file provenance checks above stay exact.
          protocols: normalizeDisplayText(original.protocols),
          sources: normalizeDisplayText(original.sources),
          graph_views: input.graph_views,
        },
      );
      const selected = original.records.filter(
        (r) => r.benchmark_id === benchmark && (!skill || r.skill === skill),
      );
      assert.equal(
        await page.locator(".observation-detail").count(),
        selected.length,
      );
      for (const r of selected) {
        recordIDs.add(r.result_id);
        const detail = page.locator("#observation-" + r.result_id);
        assert.equal(
          await detail.locator("a").first().getAttribute("href"),
          r.source_url,
        );
      }
      const first = page.locator("#observation-" + selected[0].result_id);
      await first.locator("summary").first().click();
      assert.ok(await first.locator("a").first().isVisible());
      await first.locator("summary").first().click();
      const charts = input.graph_views.charts.filter((c) =>
        benchmark === "runebench"
          ? c.id.startsWith("runebench-" + skill)
          : benchmark === "bullshitbench-v2"
            ? c.id.startsWith("bullshitbench")
            : c.type === "bar",
      );
      for (const c of charts) {
        chartIDs.add(c.id);
        const card = page.locator("#" + c.id);
        assert.equal(await card.count(), 1);
        assert.ok(
          (await card.locator(".x-label").textContent()).includes(c.x.label),
        );
        assert.ok((await card.textContent()).includes(c.y.label));
        assert.match(
          await card.textContent(),
          /No reported uncertainty intervals/,
        );
        await card.locator(".chart-table summary").click();
        const expected =
          c.type === "line"
            ? c.series.flatMap((s) =>
                s.points.map((p) => [
                  s.label,
                  String(p.elapsed_minutes),
                  String(p.peak_normalized_xp_per_min),
                ]),
              )
            : c.points.map((p) =>
                c.type === "bar"
                  ? [p.label, String(p.x)]
                  : [p.label, String(p.x), String(p.y)],
              );
        const rows = await card
          .locator(".chart-table tbody tr")
          .evaluateAll((nodes) =>
            nodes.map((n) => [...n.children].map((cell) => cell.textContent)),
          );
        assert.deepEqual(rows, expected, c.id + " exact table values");
        await card.locator(".chart-table summary").click();
        await card.locator(".chart-legend button").first().focus();
        const id = (c.series || c.points)[0].result_id;
        assert.equal(
          await card.locator(".chart-inspector a").first().getAttribute("href"),
          original.records.find((r) => r.result_id === id).source_url,
        );
        if (c.type === "scatter") {
          for (const p of c.points) {
            const point = card.locator(
              `.plot-point[data-result-id="${p.result_id}"] .plot-symbol`,
            );
            const marker = card.locator(
              `.chart-legend button[data-result-id="${p.result_id}"] .legend-symbol`,
            );
            assert.equal(
              await marker.evaluate((n) => n.tagName),
              await point.evaluate((n) => n.tagName),
            );
            assert.equal(
              await marker.getAttribute("fill"),
              await point.getAttribute("fill"),
            );
          }
        }
      }
      if (benchmark === "bullshitbench-v2") {
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
          /Opus.*partial/s,
        );
        assert.match(
          await page
            .locator("#bullshitbench-score-cost .chart-scale-note")
            .textContent(),
          /0[–-]100%/,
        );
        await page.locator("#bullshitbench-score-cost .zoom-button").click();
        assert.match(
          await page
            .locator("#bullshitbench-score-cost .chart-scale-note")
            .textContent(),
          /50[–-]75%.*Zoomed/,
        );
        await page.locator("#bullshitbench-score-cost .zoom-button").click();
      }
      if (benchmark === "medagentbench") {
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
      }
      if (!skill || skill === "woodcutting")
        await audit(page, benchmark + " desktop");
      await screenshotCard(
        page,
        "#charts",
        "results-live-" +
          benchmark +
          (skill ? "-" + skill : "") +
          "-desktop.png",
      );
      for (const width of [390, 320]) {
        await page.setViewportSize({ width, height: 844 });
        const dimensions = await page.evaluate(() => ({
          width: innerWidth,
          documentWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
        }));
        report.viewports.push({ benchmark, skill, ...dimensions });
        assert.ok(
          dimensions.documentWidth <= width && dimensions.bodyWidth <= width,
          benchmark + " mobile overflow",
        );
        await page.locator(".chart-table summary").first().click();
        assert.ok(
          (await page.locator(".chart-table table").first().boundingBox())
            .width <= width,
        );
        await page.locator(".chart-table summary").first().click();
      }
      if (!skill || skill === "woodcutting")
        await audit(page, benchmark + " mobile 320px");
      await page.setViewportSize({ width: 390, height: 844 });
      await screenshotCard(
        page,
        benchmark === "runebench"
          ? "#runebench-" + skill + "-score-cost"
          : benchmark === "bullshitbench-v2"
            ? "#bullshitbench-score-time"
            : "#medagentbench-historical-score",
        "results-live-" +
          benchmark +
          (skill ? "-" + skill : "") +
          "-mobile.png",
      );
      await page.setViewportSize({ width: 1440, height: 1000 });
    }
    assert.deepEqual(
      [...chartIDs].sort(),
      input.graph_views.charts.map((c) => c.id).sort(),
    );
    assert.deepEqual(
      [...recordIDs].sort(),
      original.records.map((r) => r.result_id).sort(),
    );
    report.charts = [...chartIDs];
    report.records = [...recordIDs];
    passed(
      "All 18 live observations and seven chart views preserve axes, protocol/date labels, source links, exact tables, shapes, exclusions and missing values",
    );
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.missingAssets, []);
    assert.deepEqual(report.externalRequests, []);
    passed(
      "Mobile layouts and tables reflow at 320px/390px; six axe scans have zero violations; no browser errors, missing assets or external runtime requests",
    );
    await context.close();
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
  .finally(() =>
    fs.writeFileSync(
      path.join(out, "results-deployment-validation.json"),
      JSON.stringify(report, null, 2) + "\n",
    ),
  );
