const fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http"),
  assert = require("node:assert/strict"),
  vm = require("node:vm");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(__dirname, ".."),
  read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const coverage = read("data/coverage-projection-2026-10-05.json");
const report = {
  checkedAt: new Date().toISOString(),
  checks: [],
  axe: [],
  screenshots: [],
  errors: [],
  externalRequests: [],
  passed: false,
};
const pass = (s) => {
  report.checks.push(s);
  console.log("PASS " + s);
};
const server = http.createServer((req, res) => {
  try {
    const rel =
        decodeURIComponent(
          new URL(req.url, "http://localhost").pathname,
        ).replace(/^\/lab\//, "") || "benchmarks.html",
      file = path.resolve(root, rel);
    if (
      !/^(?:index\.html|benchmarks\.html|results\.html|catalog\.html|results-technical\.html|(?:assets|data)\/[^.][^\\]*)$/.test(
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
        ".svg": "image/svg+xml",
        ".json": "application/json; charset=utf-8",
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
  const sandbox = { window: {}, URL };
  vm.runInNewContext(
    fs.readFileSync(path.join(root, "assets/coverage-graphs.js"), "utf8"),
    sandbox,
  );
  assert.equal(sandbox.window.LAB_COVERAGE.valid(coverage), true);
  const malicious = structuredClone(coverage);
  malicious.cards[0].variants[0].rows[0].source_url = "javascript:alert(1)";
  assert.equal(sandbox.window.LAB_COVERAGE.valid(malicious), false);
  const additions = read(
    "data/coverage-research-2026-10-05/primary-source-additions.json",
  );
  assert.equal(
    Object.values(additions.cohorts).reduce((n, c) => n + c.rows.length, 0),
    319,
  );
  assert.equal(
    coverage.cards
      .slice(0, 27)
      .reduce((n, c) => n + c.variants[0].rows.length, 0),
    81,
  );
  assert.equal(
    Object.values(coverage.rune.summaries).reduce(
      (n, c) => n + Object.keys(c).length,
      0,
    ),
    1392,
  );
  for (const card of coverage.cards) {
    for (const v of card.variants)
      for (const r of v.rows) {
        if (r.raw)
          for (const [k, x] of Object.entries(r.raw))
            assert.deepEqual(r[k], x, card.id + " preserves raw " + k);
      }
  }
  const tb = coverage.cards.find((c) => c.id === "terminal-bench-4");
  assert.equal(tb.variants[0].rows.length, 43);
  assert.equal(tb.variants[1].rows.length, 6);
  for (const r of tb.variants[0].rows) {
    const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(
      r.reported_duration,
    );
    assert.equal(
      r.reported_duration_seconds,
      Number(match[1] || 0) * 3600 +
        Number(match[2] || 0) * 60 +
        Number(match[3] || 0),
    );
  }
  assert.equal(
    coverage.cards.find((c) => c.id === "eq-bench-creative-writing-v3")
      .variants[0].rows.length,
    140,
  );
  assert.deepEqual(
    coverage.cards.find((c) => c.id === "webcraftbench-v3").variants[0]
      .metrics[0].domain,
    [-3, 3],
  );
  pass(
    "319 additions, 81 first-wave observations and 1,392 Rune summaries retain exact raw values; duration arithmetic and signed domains validated; unsafe source URL fails validation",
  );
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = "http://127.0.0.1:" + server.address().port + "/lab/";
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
    const go = async (p) => {
      await page.goto(base + p);
      await page
        .locator(
          p.startsWith("results") ? "#benchmark-detail" : ".benchmark-card",
        )
        .first()
        .waitFor({ state: "visible", timeout: 10000 });
    };
    const capture = async (name) => {
      await page.screenshot({ path: path.join(root, "evidence", name) });
      report.screenshots.push(name);
    };
    const axe = async (label) => {
      if (!process.env.LAB_AXE_SCRIPT) return;
      await page.addScriptTag({ path: process.env.LAB_AXE_SCRIPT });
      const a = await page.evaluate(async () => {
        const r = await axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        });
        return {
          violations: r.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
          incomplete: r.incomplete.map((v) => v.id),
        };
      });
      report.axe.push({ label, ...a });
      assert.deepEqual(a.violations, [], label);
    };
    await go("benchmarks.html");
    const expected = await page.evaluate(() => {
      const families = new Map(
        Object.entries(LAB_GALLERY.coverage.familyGroups).flatMap(([k, v]) =>
          v.map((id) => [id, k]),
        ),
      );
      return new Set(
        Object.entries(LAB_GALLERY.cardMetadata.cards)
          .filter(([, v]) => v.evidence === "plotted")
          .map(([id]) => families.get(id) || id),
      ).size;
    });
    assert.equal(await page.locator(".benchmark-card").count(), expected);
    assert.equal(await page.locator(".mini-evidence").count(), 0);
    await capture("coverage-gallery-desktop.png");
    await axe("default result gallery");
    await page.getByLabel("Results history").selectOption("all");
    assert.equal(await page.locator(".benchmark-card").count(), 73);
    assert.equal(await page.locator(".mini-graph svg").count(), 64);
    pass(
      "Default gallery groups result families without empty cards; all 73 direct cards remain accessible, including all 20 discovery IDs",
    );
    for (const card of coverage.cards) {
      await go("results.html?benchmark=" + card.id);
      assert.equal(await page.locator(".coverage-chart").count(), 1);
      assert.equal(await page.locator(".explanations h2").count(), 3);
      await page.locator(".coverage-mark").first().focus();
      assert.equal(await page.locator(".point-inspector h3").count(), 1);
      await page.locator(".coverage-mark").first().press("ArrowDown");
      await page.locator(".chart-table summary").click();
      assert.equal(
        await page.locator(".chart-table tbody tr").count(),
        card.variants[0].rows.length,
      );
      for (const a of await page
        .locator("#benchmark-detail a[target=_blank]")
        .evaluateAll((nodes) =>
          nodes.map((n) => ({ href: n.href, rel: n.rel })),
        )) {
        assert.match(a.href, /^https:\/\//);
        assert.match(a.rel, /noopener/);
        assert.match(a.rel, /noreferrer/);
      }
    }
    pass(
      "All 39 added or refreshed charts open, explain the test, support keyboard selection, expose exact tables and preserve safe HTTPS source links",
    );
    await go("results.html?benchmark=balrog");
    await page.locator("select[name=cohort]").selectOption("VLM");
    assert.equal(await page.locator(".chart-table tbody tr").count(), 10);
    assert.equal(
      await page.locator("select[name=view] option[value=textworld]").count(),
      0,
    );
    await page.reload();
    assert.equal(await page.locator("select[name=cohort]").inputValue(), "VLM");
    await go("results.html?benchmark=eq-bench-creative-writing-v3");
    await page.locator("input[name=config]").fill("gpt");
    assert.ok((await page.locator(".coverage-mark").count()) > 0);
    await page.locator("input[name=config]").fill("");
    await page.locator("input[name=all]").check();
    assert.equal(await page.locator(".coverage-mark").count(), 140);
    await page.locator("select[name=view]").selectOption("rubric");
    assert.match(
      await page.locator(".coverage-chart").textContent(),
      /rubric points/,
    );
    await go("results.html?benchmark=terminal-bench-4");
    await page.locator("select[name=view]").selectOption("cost");
    assert.match(
      await page.locator(".axis-description").textContent(),
      /per task.*USD/,
    );
    await page.locator("select[name=view]").selectOption("time");
    assert.match(
      await page.locator(".axis-description").textContent(),
      /seconds/,
    );
    await page.locator("select[name=cohort]").selectOption("detailed");
    assert.equal(await page.locator(".coverage-mark").count(), 6);
    assert.match(
      await page.locator("#benchmark-detail").textContent(),
      /30\/66/,
    );
    await go("results.html?benchmark=voicecodebench&view=cost");
    assert.equal(await page.locator(".coverage-mark").count(), 2);
    assert.match(
      await page.locator(".coverage-chart").textContent(),
      /missing.*not zero/,
    );
    await go("results.html?benchmark=bullshitbench-v2");
    assert.match(
      await page.locator("input[name=view]:checked").inputValue(),
      /all/,
    );
    await page.locator("input[name=view][value=cost]").check();
    assert.equal(await page.locator(".plot-point").count(), 4);
    await go("results.html?benchmark=runebench");
    assert.equal(
      await page.locator("select[name=configuration] option").count(),
      87,
    );
    await page
      .locator("select[name=configuration]")
      .selectOption("opus55-xhigh");
    await page.locator("select[name=skill]").selectOption("mining");
    const expectedPeak =
      coverage.rune.summaries["opus55-xhigh"].mining.peakXpRate;
    await page.locator(".coverage-mark").first().focus();
    assert.match(
      await page.locator(".point-inspector").textContent(),
      new RegExp(String(expectedPeak)),
    );
    await page.locator("select[name=configuration]").selectOption("kimi3-low");
    assert.match(
      await page.locator("#benchmark-detail").textContent(),
      /not.*pinned|unresolved|absent|unknown/i,
    );
    await page.locator("input[name=view][value=time]").check();
    assert.equal(await page.locator('[data-sample-count="120"]').count(), 3);
    pass(
      "BALROG modalities, 140 EQ rows, TB4 cost/time and original six, VoiceCode missing-cost exclusion, BB all-228 default and four-point cost slice, and Rune 87-configuration explorer preserve compatible slices and units",
    );
    await go("results.html?benchmark=gpqa-diamond");
    await page
      .locator("select[name=family]")
      .selectOption("gpqa-diamond-march-reported");
    assert.match(page.url(), /gpqa-diamond-march/);
    assert.equal(await page.locator(".standard-row").count(), 4);
    await page.reload();
    assert.equal(
      await page.locator("select[name=family]").inputValue(),
      "gpqa-diamond-march-reported",
    );
    pass(
      "Family selector opens a dated historical cohort without merging it with current results; selection survives reload",
    );
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: width > 600 ? 1000 : 844 });
      for (const route of [
        "benchmarks.html",
        "results.html?benchmark=webcraftbench-v3",
        "results.html?benchmark=terminal-bench-4&view=cost",
        "results.html?benchmark=masai-trial",
        "results.html?benchmark=voicecodebench&view=cost",
        "results.html?benchmark=balrog&cohort=VLM",
        "results.html?benchmark=runebench",
      ]) {
        await go(route);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          true,
          width + " " + route,
        );
        if (width === 390) await axe(width + " " + route);
      }
      if (width === 390) {
        await go("benchmarks.html");
        await page.locator("#gallery").scrollIntoViewIfNeeded();
        await capture("coverage-gallery-mobile.png");
        await go("results.html?benchmark=webcraftbench-v3");
        await page.locator(".coverage-chart").scrollIntoViewIfNeeded();
        await capture("coverage-webcraft-mobile.png");
      }
      if (width === 1440) {
        await go("results.html?benchmark=terminal-bench-4&view=cost");
        await page.locator(".coverage-chart").scrollIntoViewIfNeeded();
        await capture("coverage-cost-desktop.png");
      }
    }
    pass(
      "Gallery and signed-score, cost, clinical, modality and Rune charts fit 320/390/768/1440px; automated accessibility audits reported no violations",
    );
    await go("results.html?benchmark=aa-briefcase-v1-1");
    await page.evaluate(() => {
      const c = structuredClone(LAB_GALLERY.coverage.cards[0]);
      c.variants[0].rows[0].label = "<img src=x onerror=alert(1)>";
      document
        .querySelector(".coverage-chart")
        .replaceWith(LAB_COVERAGE.chart(c, {}));
    });
    assert.equal(await page.locator("img[onerror]").count(), 0);
    assert.match(
      await page.locator(".coverage-chart").textContent(),
      /<img src=x/,
    );
    await page.goto(
      base +
        "results.html?benchmark=%3Cscript%3E&config=%3Csvg%20onload=alert(1)%3E",
    );
    assert.equal(await page.locator("svg[onload]").count(), 0);
    assert.equal(await page.locator("iframe").count(), 0);
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.externalRequests, []);
    pass(
      "Untrusted names and query text render as text; no injected elements, external runtime requests, iframes or browser errors were observed",
    );
    report.passed = true;
  } finally {
    await browser.close();
    await new Promise((r) => server.close(r));
    fs.writeFileSync(
      path.join(root, "evidence/coverage-ui-validation.json"),
      JSON.stringify(report, null, 2) + "\n",
    );
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
  server.close();
});
