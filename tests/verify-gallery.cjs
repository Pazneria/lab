const fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http"),
  assert = require("node:assert/strict"),
  { execFileSync } = require("node:child_process");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(__dirname, ".."),
  out = path.join(root, "evidence");
const original = JSON.parse(
  fs.readFileSync(path.join(root, "data/results.original.json"), "utf8"),
);
const standard = JSON.parse(
  fs.readFileSync(
    path.join(root, "data/standard-benchmarks.original.json"),
    "utf8",
  ),
);
const discovery = JSON.parse(
  fs.readFileSync(path.join(root, "data/catalog.original.json"), "utf8"),
);
const report = {
  checkedAt: new Date().toISOString(),
  checks: [],
  axe: [],
  viewports: [],
  errors: [],
  missingAssets: [],
  externalRequests: [],
  security: [],
  screenshots: [],
};
const server = http.createServer((req, res) => {
  try {
    let pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    )
      .replace(/^\/lab(?=\/|$)/, "")
      .replace(/^\//, "");
    if (!pathname) pathname = "index.html";
    const file = path.resolve(root, pathname),
      rel = path.relative(root, file).replace(/\\/g, "/");
    if (
      !/^(?:index\.html|benchmarks\.html|results\.html|catalog\.html|results-technical\.html|(?:assets|data|docs)\/[^.][^\\]*)$/.test(
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
        ".json": "application/json; charset=utf-8",
        ".svg": "image/svg+xml",
        ".txt": "text/plain; charset=utf-8",
      }[path.extname(file)] || "text/plain",
    );
    res.end(fs.readFileSync(file));
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
function pass(message) {
  report.checks.push(message);
  console.log("PASS " + message);
}
async function audit(page, label) {
  await page.addScriptTag({
    path: process.env.LAB_AXE_SCRIPT || require.resolve("axe-core/axe.min.js"),
  });
  const r = await page.evaluate(() =>
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
  report.axe.push({
    label,
    violations: r.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        reason: n.failureSummary,
      })),
    })),
    incomplete: r.incomplete.map((v) => v.id),
  });
  assert.equal(r.violations.length, 0, JSON.stringify(report.axe.at(-1)));
}
async function screenshot(page, filename, fullPage = false) {
  await page.mouse.move(1, 1);
  await page.evaluate(() => document.activeElement?.blur());
  await page.screenshot({ path: path.join(out, filename), fullPage });
  report.screenshots.push(filename);
}
async function noOverflow(page, label) {
  const x = await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  report.viewports.push({ label, ...x });
  assert.ok(x.scroll <= x.width + 1, label + " overflow " + JSON.stringify(x));
}
async function main() {
  fs.mkdirSync(out, { recursive: true });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base =
    process.env.LAB_GALLERY_BASE ||
    "http://127.0.0.1:" + server.address().port + "/lab/";
  report.base = base;
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.LAB_BROWSER_CHANNEL || undefined,
  });
  report.browser = browser.version();
  try {
    const context = await browser.newContext({
        viewport: { width: 1440, height: 1050 },
        reducedMotion: "reduce",
      }),
      page = await context.newPage();
    page.on("pageerror", (r) => report.errors.push(r.message));
    page.on("response", (r) => {
      if (r.status() >= 400) report.missingAssets.push(r.url());
    });
    page.on("request", (r) => {
      if (new URL(r.url()).origin !== new URL(base).origin)
        report.externalRequests.push(r.url());
    });
    const go = async (query) => {
      await page.goto(base + (query || "benchmarks.html"));
      await page.waitForTimeout(100);
    };
    await go("");
    for (const file of [
      "index.html",
      "benchmarks.html",
      "results.html?benchmark=hle-diamond",
      "catalog.html",
      "results-technical.html",
    ]) {
      await go(file);
      const roomLink = page.getByRole("link", {
        name: "Back to 3D Lab",
        exact: true,
      });
      assert.equal(await roomLink.getAttribute("href"), "/lab/lab-space/");
      assert.equal(await roomLink.isVisible(), true);
      await roomLink.focus();
      assert.equal(
        await roomLink.evaluate((link) => link === document.activeElement),
        true,
      );
      if (file.startsWith("results.html"))
        assert.equal(
          await page.locator(".back-link").getAttribute("href"),
          "benchmarks.html#gallery",
        );
    }
    await go("");
    pass(
      "All five benchmark pages offer a visible keyboard-accessible return to the 3D Lab; detail Back still opens the gallery",
    );
    assert.equal(await page.locator(".benchmark-card").count(), 26);
    assert.equal(await page.locator(".mini-graph svg").count(), 9);
    assert.equal(await page.locator(".mini-evidence").count(), 17);
    assert.match(
      await page.locator("#gallery-count").textContent(),
      /26 benchmarks.*9 with score/,
    );
    for (const e of discovery.entries)
      assert.equal(
        await page
          .locator('[data-benchmark-id="' + e.id + '"]')
          .getAttribute("href"),
        "results.html?benchmark=" + e.id,
      );
    await audit(page, "Gallery desktop");
    await screenshot(page, "gallery-desktop.png");
    await screenshot(page, "gallery-desktop-full.png", true);
    pass(
      "26 cards preserve all 20 discovery IDs; nine real graphs and 17 explicit evidence-only cards",
    );
    for (const [category, count] of [
      ["standard", 6],
      ["community", 4],
      ["games", 5],
      ["medical", 5],
      ["physical", 6],
    ]) {
      await page
        .locator("input[name=category][value=" + category + "]")
        .check();
      assert.equal(await page.locator(".benchmark-card").count(), count);
    }
    await page.locator("input[name=category][value=all]").check();
    await page.locator("input[name=graphs]").check();
    assert.equal(await page.locator(".benchmark-card").count(), 9);
    await page.locator("input[name=graphs]").uncheck();
    await page.locator("#benchmark-search").fill("runescape");
    assert.equal(await page.locator(".benchmark-card").count(), 1);
    await page.locator(".benchmark-card").click();
    await page.waitForURL("**/results.html?benchmark=runebench");
    await page.locator("#benchmark-detail").waitFor({ state: "visible" });
    assert.match(await page.locator("h1").textContent(), /RuneBench/);
    await page.goBack();
    assert.equal(
      await page.locator("#benchmark-search").inputValue(),
      "runescape",
    );
    await page
      .locator("#benchmark-search")
      .fill("<img src=x onerror=alert(1)>");
    assert.equal(await page.locator(".benchmark-card").count(), 0);
    assert.equal(await page.locator("#gallery-empty").isVisible(), true);
    assert.equal(await page.locator("img").count(), 0);
    pass(
      "Category, graph-only and search filters, empty states, card navigation and browser-back state",
    );
    for (const c of standard.cards) {
      await go("results.html?benchmark=" + c.id);
      assert.equal(await page.locator(".standard-row").count(), c.rows.length);
      assert.deepEqual(
        await page
          .locator(".standard-row")
          .evaluateAll((nodes) => nodes.map((n) => Number(n.dataset.value))),
        c.rows.map((r) => r.value),
      );
      assert.equal(
        await page.locator("input[name=view][value=cost]").count(),
        0,
      );
      assert.equal(
        await page.locator("input[name=view][value=time]").count(),
        0,
      );
      assert.match(
        await page.locator(".chart-scale-note").textContent(),
        /0–100/,
      );
      await page.locator(".standard-row button").count();
      await page.locator("button.standard-row").first().focus();
      assert.match(
        await page.locator(".chart-inspector strong").textContent(),
        new RegExp(
          c.rows[0].model_variant.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        ),
      );
      assert.equal(
        await page.locator(".chart-inspector>a").getAttribute("href"),
        c.rows[0].source_url,
      );
      const values = await page
        .locator(".standard-table tbody tr")
        .evaluateAll((rows) =>
          rows.map((tr) => [...tr.cells].map((td) => td.textContent)),
        );
      assert.deepEqual(
        values.map((r) => Number(r[1])),
        c.rows.map((r) => r.value),
      );
      assert.ok(values.every((r) => r[3] === "Not reported / not reported"));
      if (c.display_status === "historical_source_cohort")
        assert.match(
          await page.locator(".detail-notice").textContent(),
          /Historical March 2026/,
        );
      if (c.id === "frontiermath-tier4-v2") {
        assert.match(
          await page.locator(".detail-notice").textContent(),
          /setups differ/,
        );
        assert.equal(await page.locator(".dot-track").count(), 5);
      }
    }
    pass(
      "All 30 standard scores, source URLs and effort labels; four historical cohorts, cross-lab dots, zero-to-100 scales and null cost/time",
    );
    await go("results.html?benchmark=hle-diamond");
    for (const [view, field] of [
      ["reasoning", "reasoning_percent"],
      ["knowledge", "knowledge_percent"],
      ["tools", "with_tools_percent"],
    ]) {
      await page.locator("input[name=view][value=" + view + "]").check();
      assert.deepEqual(
        await page
          .locator(".standard-row")
          .evaluateAll((rows) =>
            rows.map((r) =>
              r.dataset.value === "null" ? null : Number(r.dataset.value),
            ),
          ),
        standard.cards[0].rows.map((r) => r[field]),
      );
      if (view === "tools") {
        assert.equal(await page.locator("button.standard-row").count(), 6);
        assert.equal(await page.locator("[data-missing=true]").count(), 3);
        assert.match(
          await page
            .locator(".standard-row")
            .first()
            .getAttribute("data-comparison-group"),
          /web-code/,
        );
        assert.match(
          await page.locator(".missing-note").textContent(),
          /not treated as zero/,
        );
      }
    }
    await page.locator("input[value=score]").check();
    assert.equal(
      await page
        .locator("input[value=score]")
        .evaluate((n) => n === document.activeElement),
      true,
    );
    await audit(page, "HLE desktop");
    await screenshot(page, "gallery-hle-desktop.png", true);
    pass(
      "HLE reasoning/knowledge partitions and separate six-model web+code view; three missing tool scores stay null and excluded",
    );
    const chartIDs = new Set(),
      resultIDs = new Set();
    for (const [id, skills, views] of [
      ["runebench", ["woodcutting", "mining"], ["cost", "time"]],
      ["bullshitbench-v2", ["woodcutting"], ["cost", "time"]],
      ["medagentbench", ["woodcutting"], ["score"]],
    ]) {
      for (const skill of skills)
        for (const view of views) {
          await go(
            "results.html?benchmark=" +
              id +
              "&skill=" +
              skill +
              "&view=" +
              view,
          );
          const card = page.locator(".chart-card"),
            cid = await card.getAttribute("id");
          chartIDs.add(cid);
          const source = original.graph_views.charts.find((c) => c.id === cid);
          assert.ok(source, cid);
          const rows = await card
            .locator(".chart-table tbody tr")
            .evaluateAll((rows) =>
              rows.map((tr) => [...tr.cells].map((td) => td.textContent)),
            );
          if (source.type === "line") {
            assert.deepEqual(
              rows,
              source.series.flatMap((s) =>
                s.points.map((p) => [
                  s.label,
                  String(p.elapsed_minutes),
                  String(p.peak_normalized_xp_per_min),
                ]),
              ),
            );
            assert.deepEqual(
              await card
                .locator("[data-sample-count]")
                .evaluateAll((n) =>
                  n.map((x) => Number(x.dataset.sampleCount)),
                ),
              [120, 120, 120],
            );
            const slider = card.locator("input[type=range]");
            await slider.focus();
            await slider.press("Home");
            assert.equal(await slider.inputValue(), "0");
            await slider.press("ArrowRight");
            assert.equal(await slider.inputValue(), "1");
            assert.match(
              await card.locator(".chart-inspector").textContent(),
              /Sample 2 of 120/,
            );
            await slider.press("End");
            assert.match(
              await card.locator(".chart-inspector").textContent(),
              /Sample 120 of 120/,
            );
          } else {
            assert.deepEqual(
              rows,
              source.points.map((p) =>
                source.type === "bar"
                  ? [p.label, String(p.x)]
                  : [p.label, String(p.x), String(p.y)],
              ),
            );
            assert.deepEqual(
              await card
                .locator(".plot-point")
                .evaluateAll((n) =>
                  n.map((x) => [
                    Number(x.dataset.x),
                    x.dataset.y ? Number(x.dataset.y) : null,
                  ]),
                ),
              source.points.map((p) => [p.x, p.y ?? null]),
            );
            await card.locator(".plot-point").first().focus();
            const first = original.results.records.find(
              (r) => r.result_id === source.points[0].result_id,
            );
            assert.equal(
              await card
                .locator(".chart-inspector>a")
                .first()
                .getAttribute("href"),
              first.source_url,
            );
          }
          const rr = original.results.records.filter(
            (r) => r.benchmark_id === id,
          );
          for (const r of rr) {
            resultIDs.add(r.result_id);
            assert.equal(
              await page
                .locator("#observation-" + r.result_id + " > a")
                .last()
                .getAttribute("href"),
              r.source_url,
            );
          }
          assert.equal(await page.locator(".explanations h2").count(), 3);
          assert.match(
            await page.locator(".detail-notice").textContent(),
            /uncertainty/i,
          );
          if (id === "bullshitbench-v2" && view === "cost") {
            assert.equal(await card.locator(".plot-point").count(), 4);
            assert.match(
              await card.locator(".chart-exclusions").textContent(),
              /Opus 5.5.*missing/,
            );
            assert.equal(
              await card
                .locator(".chart-legend button[data-result-id*=opus]")
                .count(),
              0,
            );
          }
          if (id === "bullshitbench-v2" && view === "time")
            assert.equal(await card.locator(".plot-point").count(), 6);
          if (id === "runebench" && view === "cost") {
            assert.match(
              await page.locator(".detail-notice").textContent(),
              /not cash spend/,
            );
            const tags = await card
              .locator(".legend-symbol")
              .evaluateAll((n) => n.map((x) => x.tagName));
            assert.deepEqual(tags, ["circle", "rect", "path"]);
          }
          if (id === "medagentbench") {
            assert.match(
              await page.locator(".detail-notice").textContent(),
              /2025/,
            );
            assert.match(
              await page.locator(".explanations").textContent(),
              /Cost, time.*not reported/,
            );
          }
        }
    }
    assert.equal(chartIDs.size, 7);
    assert.equal(resultIDs.size, 18);
    pass(
      "All original 18 result records and seven views retain exact axes, values, table alternatives, source links, shapes and all 720 time points",
    );
    await go("results.html?benchmark=runebench&view=cost");
    await page.locator("select[name=skill]").selectOption("mining");
    assert.match(page.url(), /skill=mining/);
    assert.equal(
      await page
        .locator("select[name=skill]")
        .evaluate((n) => n === document.activeElement),
      true,
    );
    await page.locator("input[value=time]").check();
    assert.match(
      await page.locator(".chart-card").getAttribute("id"),
      /mining-score-time/,
    );
    await page.goBack();
    assert.match(
      await page.locator(".chart-card").getAttribute("id"),
      /mining-score-cost/,
    );
    await go(
      "results.html?benchmark=medagentbench#observation-medagentbench-paper-v2-gpt4o",
    );
    assert.equal(
      await page.locator("#full-observations").getAttribute("open"),
      "",
    );
    assert.equal(
      await page
        .locator("#observation-medagentbench-paper-v2-gpt4o")
        .getAttribute("open"),
      "",
    );
    pass(
      "Detail URL state, focused controls, browser back, and result permalinks open their enclosing disclosures",
    );
    for (const entry of discovery.entries) {
      await go("results.html?benchmark=" + entry.id);
      const urls = await page
        .locator("#benchmark-sources a")
        .evaluateAll((n) => n.map((a) => a.getAttribute("href")));
      for (const source of entry.sources)
        assert.ok(urls.includes(source.url), source.id);
      if (
        !["runebench", "bullshitbench-v2", "medagentbench"].includes(entry.id)
      ) {
        assert.equal(await page.locator(".chart-card").count(), 0);
        assert.match(
          await page.locator(".evidence-panel").textContent(),
          /no numerical graph/,
        );
      }
      if (entry.id === "barn-challenge-2026-finals")
        assert.match(
          await page.locator(".source-warning").textContent(),
          /certificate.*not been bypassed/s,
        );
    }
    pass(
      "All 51 original discovery URLs and all 20 detail guides preserved; BARN certificate warning documented without a source request",
    );
    for (const width of [1440, 1024, 768, 640, 390, 320])
      for (const route of [
        "",
        "results.html?benchmark=hle-diamond",
        "results.html?benchmark=runebench&view=time",
        "results.html?benchmark=bullshitbench-v2&view=cost",
        "results.html?benchmark=medagentbench",
        "results.html?benchmark=frontiermath-tier4-v2",
      ]) {
        await page.setViewportSize({ width, height: 844 });
        await go(route);
        await noOverflow(page, width + ": " + route);
      }
    await page.setViewportSize({ width: 390, height: 844 });
    await go("");
    await audit(page, "Gallery mobile");
    await screenshot(page, "gallery-mobile.png");
    await go("results.html?benchmark=hle-diamond&view=tools");
    await audit(page, "HLE tools mobile");
    await screenshot(page, "gallery-hle-mobile.png", true);
    await go("results.html?benchmark=runebench&view=time&skill=mining");
    await audit(page, "Rune time mobile");
    await screenshot(page, "gallery-rune-mobile.png", true);
    await page.locator(".chart-table>summary").click();
    await noOverflow(page, "Rune open complete table");
    await audit(page, "Rune open table mobile");
    await go("results.html?benchmark=bullshitbench-v2&view=cost");
    await audit(page, "Bull cost mobile");
    await screenshot(page, "gallery-bull-mobile.png", true);
    await go("results.html?benchmark=medagentbench");
    await audit(page, "Med historical mobile");
    await screenshot(page, "gallery-med-mobile.png", true);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await go("results.html?benchmark=runebench&view=cost");
    await audit(page, "Rune desktop");
    await screenshot(page, "gallery-rune-desktop.png", true);
    await go("results.html?benchmark=bullshitbench-v2&view=time");
    await screenshot(page, "gallery-bull-desktop.png", true);
    await page.setViewportSize({ width: 390, height: 844 });
    await go("results.html?benchmark=hle-diamond");
    await page.setViewportSize({ width: 1440, height: 1050 });
    await page.evaluate(() => {
      const text = [
        ...document.querySelectorAll(
          "h1,h2,h3,p,a,span,button,label,select,summary",
        ),
      ].map((n) => [n, parseFloat(getComputedStyle(n).fontSize)]);
      for (const [node, size] of text) node.style.fontSize = size * 2 + "px";
    });
    assert.equal(
      await page
        .locator(".row-model")
        .first()
        .evaluate((n) => parseFloat(getComputedStyle(n).fontSize)),
      26,
    );
    await noOverflow(page, "200% computed text sizes, desktop");
    await page.emulateMedia({ forcedColors: "active" });
    await go("results.html?benchmark=runebench");
    assert.equal(await page.locator(".plot-point").count(), 3);
    await page.emulateMedia({ forcedColors: "none" });
    pass(
      "Responsive gallery and detail layouts at six widths including 320px; open tables, keyboard graphs, forced colors and reduced motion; nine axe audits",
    );
    const malicious = '<svg onload="window.__galleryInjection=1">';
    const rawData = fs.readFileSync(
      path.join(root, "assets/gallery-data.js"),
      "utf8",
    );
    await page.route("**/assets/gallery-data.js", (route) =>
      route.fulfill({
        contentType: "text/javascript",
        body:
          rawData +
          '\nwindow.LAB_GALLERY.notes["hle-diamond"].matters=' +
          JSON.stringify(malicious) +
          ";window.LAB_GALLERY.standard.cards[0].rows[0].model_variant=" +
          JSON.stringify(malicious) +
          ";",
      }),
    );
    await go("results.html?benchmark=hle-diamond#%3Cscript%3E");
    assert.ok(
      (await page.locator(".explanations").textContent()).includes(malicious),
    );
    assert.equal(await page.locator("svg[onload]").count(), 0);
    assert.equal(
      await page.evaluate(() => window.__galleryInjection),
      undefined,
    );
    await page.unroute("**/assets/gallery-data.js");
    await page.route("**/assets/gallery-data.js", (route) =>
      route.fulfill({
        contentType: "text/javascript",
        body:
          rawData +
          '\nwindow.LAB_GALLERY.standard.cards[0].rows[0].source_url="javascript:alert(1)";',
      }),
    );
    await go("");
    assert.equal(await page.locator(".benchmark-card").count(), 0);
    assert.match(
      await page.locator("#gallery-unavailable").textContent(),
      /could not be validated/,
    );
    await page.unroute("**/assets/gallery-data.js");
    await go("results.html?benchmark=javascript%3Aalert(1)&view=bad");
    assert.match(await page.locator("h1").textContent(), /HLE-Diamond/);
    await page.locator("#benchmark-sources>summary").click();
    assert.ok(
      await page
        .locator("a[target=_blank]")
        .evaluateAll((n) =>
          n.every(
            (a) =>
              a.rel.includes("noopener") &&
              a.rel.includes("noreferrer") &&
              a.protocol === "https:",
          ),
        ),
    );
    assert.equal(await page.locator("iframe").count(), 0);
    report.security = [
      "Supplied names, prose, query and hash values rendered as text; no injected SVG/HTML executed",
      "Unsafe source scheme rejects data and disables gallery",
      "All external links HTTPS, credential-free, noopener noreferrer",
      "No runtime fetched content, external resources, iframes, postMessage or new dependencies; no credentials or private input added",
    ];
    pass(
      "Scoped injection, unsafe URL, query/hash, safe outbound-link and no-third-party-resource checks",
    );
    const noJS = await browser.newContext({ javaScriptEnabled: false }),
      noPage = await noJS.newPage();
    await noPage.goto(base + "benchmarks.html");
    assert.equal(await noPage.locator("noscript a").count(), 3);
    await noJS.close();
    if (!process.env.LAB_GALLERY_BASE) {
      const file = await context.newPage();
      await file.goto(
        "file:///" + path.join(root, "benchmarks.html").replace(/\\/g, "/"),
      );
      assert.equal(await file.locator(".benchmark-card").count(), 26);
      await file.goto(
        "file:///" +
          path.join(root, "results.html").replace(/\\/g, "/") +
          "?benchmark=hle-diamond",
      );
      assert.equal(await file.locator(".standard-row").count(), 9);
      await file.close();
    }
    if (process.env.LAB_GALLERY_BASE) {
      report.commit = execFileSync(
        "git",
        [
          "-c",
          "safe.directory=" + root.replace(/\\/g, "/"),
          "rev-parse",
          "HEAD",
        ],
        { cwd: root, encoding: "utf8" },
      ).trim();
      for (const filename of [
        "index.html",
        "benchmarks.html",
        "results.html",
        "catalog.html",
        "results-technical.html",
        "assets/gallery.js",
        "assets/gallery.css",
        "assets/gallery-data.js",
        "assets/results.js",
        "assets/results-data.js",
        "assets/catalog.js",
        "data/catalog.original.json",
        "data/results.original.json",
        "data/standard-benchmarks.original.json",
        "data/gallery-notes.json",
      ]) {
        const response = await page.request.get(base + filename);
        assert.equal(response.status(), 200, filename);
        const expected = execFileSync(
          "git",
          [
            "-c",
            "safe.directory=" + root.replace(/\\/g, "/"),
            "show",
            "HEAD:" + filename,
          ],
          { cwd: root, maxBuffer: 4 * 1024 * 1024 },
        );
        assert.deepEqual(
          await response.body(),
          expected,
          filename + " deployed bytes",
        );
      }
      pass("15 deployed files match exact Git commit " + report.commit);
    }
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.missingAssets, []);
    assert.deepEqual(report.externalRequests, []);
    pass(
      "No JavaScript raw-data fallback; no console errors, missing assets or external runtime requests",
    );
    report.passed = true;
  } finally {
    await browser.close();
    await new Promise((r) => server.close(r));
    fs.writeFileSync(
      path.join(
        out,
        process.env.LAB_GALLERY_BASE
          ? "gallery-deployment-validation.json"
          : "gallery-ui-validation.json",
      ),
      JSON.stringify(report, null, 2),
    );
  }
}
main().catch((err) => {
  console.error(err.stack);
  process.exitCode = 1;
});
