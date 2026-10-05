const fs = require("node:fs"),
  path = require("node:path"),
  vm = require("node:vm"),
  http = require("node:http"),
  assert = require("node:assert/strict");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(__dirname, "..");
const report = {
  checkedAt: new Date().toISOString(),
  checks: [],
  errors: [],
  externalRequests: [],
  screenshots: [],
  axe: [],
  security: {
    scope:
      "Benchmark ordering helper and renderer integration only; public research labels, numbers, source URLs and URL-selected views are the handled inputs.",
    findings: [
      "The helper accepts finite numeric measurements and returns row copies; it does not evaluate strings, create HTML or fetch content.",
      "Existing textContent rendering, HTTPS/credential URL checks and noopener/noreferrer outbound links remain in place.",
      "No new dependency, external resource, secret/private input, iframe or postMessage integration was added.",
      "Existing coverage and original-results checks exercised malicious labels, queries and unsafe source URLs; source URLs and raw research values remain unchanged.",
    ],
    limits:
      "Not a security certification or a whole-repository, infrastructure, dependency or credential audit. Automated accessibility contrast remains incomplete; no evaluation runs or paid APIs were used.",
  },
  passed: false,
};
const pass = (text) => {
  report.checks.push(text);
  console.log("PASS " + text);
};
const sandbox = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(root, "assets/metric-order.js"), "utf8"),
  sandbox,
);
const order = sandbox.window.LAB_METRIC_ORDER.order;
const sample = [
  { id: "a", n: -2 },
  { id: "missing", n: null },
  { id: "b", n: 4 },
  { id: "tie", n: 4 },
  { id: "c", n: 0 },
  { id: "undefined" },
  { id: "nan", n: NaN },
  { id: "infinite", n: Infinity },
];
const original = sample.slice(),
  ids = (rows) => Array.from(rows, (r) => r.id);
assert.deepEqual(ids(order(sample, (r) => r.n, "higher_is_better")), [
  "b",
  "tie",
  "c",
  "a",
  "missing",
  "undefined",
  "nan",
  "infinite",
]);
assert.deepEqual(ids(order(sample, (r) => r.n, "lower_is_better")), [
  "a",
  "c",
  "b",
  "tie",
  "missing",
  "undefined",
  "nan",
  "infinite",
]);
assert.deepEqual(ids(order(sample, (r) => r.n, undefined)), ids(sample));
assert.deepEqual(sample, original);
for (const field of ["cost", "seconds"])
  assert.deepEqual(
    ids(
      order(
        [
          { id: "slow", [field]: 10 },
          { id: "null", [field]: null },
          { id: "fast", [field]: 0.25 },
        ],
        (r) => r[field],
        "lower_is_better",
      ),
    ),
    ["fast", "slow", "null"],
  );
assert.deepEqual(
  ids(
    order(
      [
        { id: "A-low", g: "A", n: 1 },
        { id: "B-high", g: "B", n: 100 },
        { id: "A-high", g: "A", n: 2 },
        { id: "B-low", g: "B", n: 90 },
      ],
      (r) => r.n,
      "higher_is_better",
      { group: (r) => r.g },
    ),
  ),
  ["A-high", "A-low", "B-high", "B-low"],
);
pass(
  "Stable signed numeric order, ties, null/undefined/non-finite values, lower-is-better costs/time, unknown-direction native order, immutability and within-group ordering",
);
const server = http.createServer((req, res) => {
  try {
    const rel =
        decodeURIComponent(
          new URL(req.url, "http://localhost").pathname,
        ).replace(/^\/lab\//, "") || "index.html",
      file = path.resolve(root, rel);
    if (
      !/^(?:index\.html|benchmarks\.html|results\.html|results-technical\.html|(?:assets|data)\/[^.][^\\]*)$/.test(
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
      }[path.extname(file)] || "text/plain; charset=utf-8",
    );
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.end(fs.readFileSync(file));
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
async function main() {
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base =
    process.env.LAB_RANKING_BASE ||
    "http://127.0.0.1:" + server.address().port + "/lab/";
  report.base = base;
  const prefix = process.env.LAB_RANKING_PREFIX || "ranking";
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.LAB_BROWSER_CHANNEL || undefined,
  });
  report.browser = browser.version();
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: "reduce",
    });
    page.on("pageerror", (e) => report.errors.push(e.message));
    page.on("request", (r) => {
      if (new URL(r.url()).origin !== new URL(base).origin)
        report.externalRequests.push(r.url());
    });
    const go = async (q) => {
      await page.goto(base + "results.html?" + q);
      await page.locator("#benchmark-detail").waitFor();
    };
    await go("benchmark=hle-diamond");
    // Reference ordering is independently defined from renderer code and includes
    // the original source index as the stable tie-breaker.
    await page.evaluate(() => {
      window.referenceOrder = (
        rows,
        get,
        direction,
        group,
        eligible = () => true,
      ) => {
        if (!["higher_is_better", "lower_is_better"].includes(direction))
          return rows.slice();
        const keys = group ? [...new Set(rows.map(group))] : [null];
        return keys.flatMap((key) =>
          rows
            .map((row, index) => ({ row, index }))
            .filter((x) => !group || group(x.row) === key)
            .sort((a, b) => {
              const av = get(a.row),
                bv = get(b.row),
                am =
                  typeof av === "number" &&
                  Number.isFinite(av) &&
                  eligible(a.row),
                bm =
                  typeof bv === "number" &&
                  Number.isFinite(bv) &&
                  eligible(b.row);
              if (am !== bm) return am ? -1 : 1;
              if (!am || av === bv) return a.index - b.index;
              return direction === "lower_is_better" ? av - bv : bv - av;
            })
            .map((x) => x.row),
        );
      };
      window.checkSame = (a, b, label) => {
        if (JSON.stringify(a) !== JSON.stringify(b))
          throw Error(
            label + ": " + JSON.stringify(a) + " != " + JSON.stringify(b),
          );
      };
    });
    const coverage = await page.evaluate(() => {
      const data = window.LAB_GALLERY.coverage,
        before = JSON.stringify(data),
        results = [];
      const fixture = document.createElement("div");
      document.querySelector("main").append(fixture);
      const get = (r, field) => field.split(".").reduce((x, k) => x?.[k], r);
      for (const c of data.cards)
        for (const v of c.variants)
          for (const m of v.metrics) {
            const complete = (r) =>
              typeof get(r, m.field) === "number" &&
              (!m.x_field || typeof get(r, m.x_field) === "number");
            const expected = referenceOrder(
              v.rows,
              (r) => get(r, m.field),
              m.direction,
              v.rank_group ? (r) => r[v.rank_group] : undefined,
              complete,
            );
            const node = window.LAB_COVERAGE.chart(c, {
              cohort: v.id,
              view: m.id,
              all: true,
            });
            fixture.replaceChildren(node);
            const marks = [...node.querySelectorAll(".coverage-mark")];
            const plotted = (m.x_field ? v.rows : expected).filter(complete);
            checkSame(
              marks.map((n) => Number(n.dataset.value)),
              plotted.map((r) => get(r, m.field)),
              c.id + "/" + v.id + "/" + m.id + " marks",
            );
            checkSame(
              [...node.querySelectorAll("tbody tr")].map(
                (tr) => tr.cells[0].textContent,
              ),
              expected.map((r) => r.label),
              c.id + "/" + v.id + "/" + m.id + " table",
            );
            checkSame(
              [...node.querySelectorAll("tbody tr")].map(
                (tr) => tr.cells[tr.cells.length - 1].querySelector("a").href,
              ),
              expected.map((r) => r.source_url),
              c.id + " source associations",
            );
            if (
              v.rank_group &&
              !node.textContent.includes("different tasks are not pooled")
            )
              throw Error("Missing grouping explanation");
            results.push({
              id: c.id,
              cohort: v.id,
              metric: m.id,
              direction: m.direction,
              scatter: !!m.x_field,
              rows: expected.length,
              group: v.rank_group || null,
            });
          }
      for (const c of data.cards) {
        const v = c.variants[0],
          m = v.metrics[0],
          node = LAB_COVERAGE.miniature(c);
        const expected = referenceOrder(
          v.rows,
          (r) => get(r, m.field),
          m.direction,
          v.rank_group ? (r) => r[v.rank_group] : undefined,
        )
          .filter((r) => typeof get(r, m.field) === "number")
          .slice(0, 6);
        checkSame(
          [...node.querySelectorAll("rect[data-value]")].map((n) =>
            Number(n.dataset.value),
          ),
          expected.map((r) => get(r, m.field)),
          c.id + " miniature",
        );
      }
      const unknown = structuredClone(data.cards[0]);
      delete unknown.variants[0].metrics[0].direction;
      unknown.variants[0].rows[0][unknown.variants[0].metrics[0].field] = null;
      const fallback = LAB_COVERAGE.chart(unknown, { all: true });
      fixture.replaceChildren(fallback);
      checkSame(
        [...fallback.querySelectorAll("tbody tr")].map(
          (tr) => tr.cells[0].textContent,
        ),
        unknown.variants[0].rows.map((r) => r.label),
        "Unknown native ordering",
      );
      if (
        !fallback.textContent.includes(
          "preferred direction is not established",
        ) ||
        !fallback.textContent.includes("Not reported")
      )
        throw Error("Missing unknown direction/null disclosure");
      checkSame(JSON.stringify(data), before, "Source arrays not mutated");
      fixture.remove();
      return results;
    });
    report.coverageViews = coverage;
    pass(
      "All " +
        coverage.length +
        " coverage metric/cohort views and 39 miniatures: direction, stable membership, exact source associations, missing-axis tails; scatter native geometry and within-task ordering preserved",
    );
    const frontend = await page.evaluate(() => {
      const cards = LAB_GALLERY.frontend.cards,
        before = JSON.stringify(cards),
        fixture = document.createElement("div");
      document.querySelector("main").append(fixture);
      let count = 0;
      for (const c of cards.filter((c) =>
        ["webdev-arena-frontend", "design2code-v3-484"].includes(c.id),
      )) {
        const arena = c.id === "webdev-arena-frontend";
        for (const comparison of arena ? ["direct"] : ["direct", "methods"])
          for (const metric of arena
            ? ["rating"]
            : Object.keys(LAB_FRONTEND.metrics)) {
            const source = arena
              ? c.rows
              : c.rows.filter((r) =>
                  comparison === "methods"
                    ? r.model_variant === "GPT-4o"
                    : r.prompt_method === "direct",
                );
            const get = (r) => (arena ? r.value : r.metrics[metric]),
              expected = referenceOrder(source, get, "higher_is_better");
            const node = LAB_FRONTEND.chart(c, { comparison, view: metric });
            fixture.replaceChildren(node);
            checkSame(
              [...node.querySelectorAll(".frontend-row")].map((n) =>
                Number(n.dataset.value),
              ),
              expected.map(get),
              c.id + "/" + comparison + "/" + metric + " bars",
            );
            checkSame(
              [...node.querySelectorAll("tbody tr")].map((tr) =>
                Number(tr.cells[1].textContent.replaceAll(",", "")),
              ),
              expected.map(get),
              c.id + "/" + comparison + "/" + metric + " table",
            );
            count++;
          }
      }
      checkSame(JSON.stringify(cards), before, "Frontend source immutable");
      fixture.remove();
      return count;
    });
    pass(
      "All " +
        frontend +
        " frontend views sorted per preference/similarity metric; Direct models and same-model prompting methods remain separate",
    );
    const standards = await page.evaluate(() =>
      LAB_GALLERY.standard.cards
        .filter((c) => !LAB_GALLERY.coverage.cards.some((x) => x.id === c.id))
        .map((c) => c.id),
    );
    let standardCount = 0;
    for (const id of standards.concat([
      "bullshitbench-v2",
      "medagentbench",
      "runebench",
    ])) {
      const views =
        id === "hle-diamond"
          ? ["score", "reasoning", "knowledge", "tools"]
          : ["bullshitbench-v2", "medagentbench"].includes(id)
            ? ["all"]
            : ["score"];
      for (const view of views) {
        await go(
          "benchmark=" +
            id +
            "&view=" +
            view +
            "&all=1" +
            (id === "runebench" ? "&skill=mining" : ""),
        );
        const observed = await page.evaluate(() => {
          const rows = [...document.querySelectorAll(".standard-row")];
          if (!rows.length)
            throw Error("Missing standard rows " + location.search);
          const vals = rows.map((n) =>
            n.dataset.value === "null" ? null : Number(n.dataset.value),
          );
          let last = Infinity,
            missing = false;
          for (const n of vals) {
            if (n === null) {
              missing = true;
              continue;
            }
            if (missing || n > last)
              throw Error("Wrong high-first order " + location.search);
            last = n;
          }
          const table = [
            ...document.querySelectorAll(".chart-table tbody tr"),
          ].map((tr) =>
            tr.cells[1].textContent === "Not reported"
              ? null
              : Number(tr.cells[1].textContent),
          );
          if (JSON.stringify(vals) !== JSON.stringify(table))
            throw Error("Chart/table order differs " + location.search);
          const card = LAB_GALLERY.standard.cards.find(
            (c) => c.id === new URL(location).searchParams.get("benchmark"),
          );
          if (card) {
            const v = new URL(location).searchParams.get("view");
            const get = (r) =>
              v === "tools"
                ? r.with_tools_percent
                : v === "reasoning"
                  ? r.reasoning_percent
                  : v === "knowledge"
                    ? r.knowledge_percent
                    : r.value;
            const expected = card.rows
              .map((r, i) => ({ r, i }))
              .sort((a, b) => {
                const x = get(a.r),
                  y = get(b.r),
                  xm = typeof x === "number",
                  ym = typeof y === "number";
                return xm !== ym
                  ? xm
                    ? -1
                    : 1
                  : !xm
                    ? a.i - b.i
                    : y - x || a.i - b.i;
              })
              .map((x) => x.r);
            if (
              JSON.stringify(rows.map((r) => r.dataset.model)) !==
              JSON.stringify(expected.map((r) => r.model_variant))
            )
              throw Error(
                "Unstable labels/missing selector " + location.search,
              );
          }
          return {
            query: location.search,
            rows: vals.length,
            first: rows[0].dataset.model,
            missing: vals.filter((n) => n === null).length,
          };
        });
        report.standardViews ||= [];
        report.standardViews.push(observed);
        standardCount++;
      }
    }
    pass(
      standardCount +
        " standard/expanded views retain every row, source-stable ties, score-ordered tables and HLE selector-specific ordering with three missing tools rows last",
    );
    await page.goto(base + "results-technical.html");
    await page.locator(".chart-card").first().waitFor();
    const originalViews = await page.evaluate(() => {
      const data = LAB_RESULTS.graph_views.charts;
      let lines = 0,
        scatters = 0,
        bars = 0;
      const fixture = document.createElement("div");
      document.querySelector("main").append(fixture);
      for (const c of data) {
        const node = LAB_CHARTS.chartCard(c);
        fixture.replaceChildren(node);
        const rows = [...node.querySelectorAll(".chart-table tbody tr")];
        if (c.type === "line") {
          const expected = c.series.flatMap((s) =>
            s.points.map((p) => [
              s.label,
              String(p.elapsed_minutes),
              String(p.peak_normalized_xp_per_min),
            ]),
          );
          if (
            JSON.stringify(
              rows.map((tr) => [...tr.cells].map((td) => td.textContent)),
            ) !== JSON.stringify(expected)
          )
            throw Error("Time chronology changed");
          lines++;
        } else {
          const scoreColumn = c.type === "bar" ? 1 : 2,
            values = rows.map((tr) =>
              Number(tr.cells[scoreColumn].textContent),
            );
          if (values.some((n, i) => i > 0 && n > values[i - 1]))
            throw Error("Original chart table unsorted " + c.id);
          if (c.type === "scatter") {
            const marks = [...node.querySelectorAll(".plot-point")];
            if (marks.length !== c.points.length)
              throw Error("Missing original scatter points");
            if (
              JSON.stringify(
                marks.map((n) => [Number(n.dataset.x), Number(n.dataset.y)]),
              ) !== JSON.stringify(c.points.map((p) => [p.x, p.y]))
            )
              throw Error("Scatter XY changed");
            scatters++;
          } else bars++;
        }
      }
      fixture.remove();
      return { lines, scatters, bars };
    });
    report.originalViews = originalViews;
    pass(
      "Original seven chart tables ordered by outcome; scatter coordinates and two complete 360-sample time tables preserve supplied chronology",
    );
    for (const id of ["runebench", "bullshitbench-v2", "medagentbench"]) {
      await page.locator('input[value="' + id + '"]').check();
      const vals = await page
        .locator("#observation-table tbody tr")
        .evaluateAll((rows) =>
          rows.map((tr) => Number(tr.cells[1].textContent.match(/[\d.]+/)[0])),
        );
      assert.ok(
        vals.every((n, i) => !i || n <= vals[i - 1]),
        id + " original observations",
      );
    }
    pass(
      "Retained 18-row observation tables follow each compatible selected skill/benchmark score",
    );
    const capture = async (query, width, name) => {
      await page.setViewportSize({ width, height: 900 });
      await go(query);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      assert.equal(overflow, false, name + " mobile overflow");
      await page
        .locator(".chart-card")
        .first()
        .screenshot({
          path: path.join(root, "evidence", prefix + "-" + name + ".png"),
        });
      report.screenshots.push(prefix + "-" + name + ".png");
      if (process.env.LAB_AXE_SCRIPT) {
        await page.addScriptTag({ path: process.env.LAB_AXE_SCRIPT });
        const a = await page.evaluate(async () => {
          const r = await axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
          });
          return {
            violations: r.violations.map((v) => v.id),
            incomplete: r.incomplete.map((v) => v.id),
          };
        });
        report.axe.push({ name, ...a });
        assert.deepEqual(a.violations, []);
      }
    };
    await capture("benchmark=aa-wer-v2", 1440, "word-error-desktop");
    await capture(
      "benchmark=hle-diamond&view=knowledge",
      390,
      "knowledge-mobile",
    );
    await capture(
      "benchmark=stationerybench&view=completion",
      390,
      "task-completion-mobile",
    );
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.externalRequests, []);
    pass(
      "Desktop/mobile interaction surfaces have no page overflow, script errors, external runtime requests or detected axe violations; contrast/manual limits recorded",
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
    fs.writeFileSync(
      path.join(
        root,
        "evidence",
        (process.env.LAB_RANKING_PREFIX || "ranking") + "-validation.json",
      ),
      JSON.stringify(report, null, 2) + "\n",
    );
    server.close();
  });
