const fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http"),
  assert = require("node:assert/strict");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(__dirname, ".."),
  out = path.join(root, "evidence"),
  data = JSON.parse(
    fs.readFileSync(
      path.join(root, "data/gallery-current-2026-10-01.json"),
      "utf8",
    ),
  ),
  expanded = JSON.parse(
    fs.readFileSync(
      path.join(root, "data/community-expanded-2026-10-01.json"),
      "utf8",
    ),
  );
const report = {
  checkedAt: new Date().toISOString(),
  checks: [],
  axe: [],
  errors: [],
  externalRequests: [],
  screenshots: [],
  passed: false,
};
const server = http.createServer((req, res) => {
  try {
    const rel =
        decodeURIComponent(
          new URL(req.url, "http://localhost").pathname,
        ).replace(/^\/lab\//, "") || "index.html",
      file = path.resolve(root, rel);
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
        ".json": "application/json; charset=utf-8",
        ".svg": "image/svg+xml",
      }[path.extname(file)] || "text/plain",
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
        viewport: { width: 1280, height: 900 },
        reducedMotion: "reduce",
      }),
      page = await context.newPage();
    page.on("pageerror", (e) => report.errors.push(e.message));
    page.on("request", (r) => {
      if (new URL(r.url()).origin !== new URL(base).origin)
        report.externalRequests.push(r.url());
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
              "wcag21a",
              "wcag21aa",
              "best-practice",
            ],
          },
        }),
      );
      report.axe.push({
        label,
        violations: a.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        incomplete: a.incomplete.map((v) => v.id),
      });
      assert.equal(a.violations.length, 0, JSON.stringify(report.axe.at(-1)));
    };
    await go("benchmarks.html");
    assert.equal(await page.locator(".benchmark-card").count(), 46);
    await page.getByLabel("Results history").selectOption("historical");
    assert.equal(await page.locator(".benchmark-card").count(), 10);
    await page.reload();
    assert.equal(
      await page.getByLabel("Results history").inputValue(),
      "historical",
    );
    await page.getByLabel("Results history").selectOption("current");
    assert.equal(await page.locator(".benchmark-card").count(), 36);
    assert.equal(
      await page
        .locator('[data-benchmark-id="gpqa-diamond-march-reported"]')
        .count(),
      0,
    );
    assert.equal(
      await page.locator('[data-benchmark-id="gpqa-diamond"]').count(),
      1,
    );
    pass(
      "46 cards and explicit current/history choices preserve 36 current/guides and ten historical cards without mixing versions",
    );
    await go("results.html?benchmark=gpqa-diamond");
    assert.equal(await page.locator(".standard-row").count(), 12);
    assert.equal(
      Number(
        await page.locator(".standard-row").first().getAttribute("data-value"),
      ),
      95.39141414141415,
    );
    await page
      .getByLabel("Find an exact configuration")
      .fill("gpt-6.1-sol_max");
    const matches = await page.locator(".standard-row").count();
    assert.ok(matches > 0 && matches < 12);
    await page.reload();
    assert.equal(
      await page.getByLabel("Find an exact configuration").inputValue(),
      "gpt-6.1-sol_max",
    );
    await page.getByLabel("Find an exact configuration").fill("");
    await page
      .getByRole("checkbox", { name: "Show all matching configurations" })
      .check();
    assert.equal(await page.locator(".standard-row").count(), 157);
    await page.locator(".standard-row").first().focus();
    assert.match(
      await page.locator(".chart-inspector").textContent(),
      /2026-09-29/,
    );
    assert.match(
      await page.locator(".chart-inspector").textContent(),
      /Standard error.*not a confidence interval/,
    );
    await page.locator(".chart-table>summary").click();
    assert.equal(await page.locator(".standard-table tbody tr").count(), 157);
    pass(
      "GPQA latest-12 default, exact-configuration search, show-all, 157-row exact table, evaluation dates and standard-error meaning work through reload",
    );
    await go("results.html?benchmark=frontiermath-tier4-v2");
    assert.deepEqual(
      await page
        .locator(".standard-row")
        .evaluateAll((n) => n.map((r) => Number(r.dataset.value))),
      [100, 80.48780487804879],
    );
    await page.locator(".standard-row").nth(1).focus();
    assert.match(
      await page.locator(".chart-inspector").textContent(),
      /6.265967.*not a confidence interval/,
    );
    assert.match(await page.locator(".detail-dates").textContent(), /2.1.0/);
    await go("results.html?benchmark=frontiermath-tier4-v2-task-2-0-0");
    assert.equal(await page.locator(".standard-row").count(), 12);
    assert.match(
      await page.locator(".historical-notice").textContent(),
      /2.0.0.*not current standings/,
    );
    assert.equal(await page.locator(".standard-table tbody tr").count(), 67);
    pass(
      "FrontierMath task 2.1.0 values and reported standard error remain separate from all 67 historical task 2.0.0 observations",
    );
    for (const id of [
      "swe-bench-pro-public-v2",
      "swe-bench-pro-public-v2-hard",
      "terminal-bench-4",
      "terminal-bench-4-native-agents",
      "terminal-bench-science",
      "terminal-bench-science-native-agents",
      "healthbench-professional",
      "medagentbench-v2-revised-original-tasks",
      "medagentbench-v2-memory-heldout",
      "medagentbench-v2-new-tasks",
    ]) {
      const c = data.cards.find((c) => c.id === id);
      await go("results.html?benchmark=" + id);
      assert.deepEqual(
        await page
          .locator(".standard-row")
          .evaluateAll((n) => n.map((r) => Number(r.dataset.value))),
        c.rows.map((r) => r.value),
      );
      assert.ok(
        (
          await page
            .locator(".standard-row")
            .evaluateAll((n) => n.map((r) => r.dataset.comparisonGroup))
        ).every((g) => g === c.comparison_group),
      );
      await page.locator(".standard-row").first().focus();
      assert.equal(
        await page.locator(".chart-inspector>a").getAttribute("href"),
        c.rows[0].source_url,
      );
      if (id === "terminal-bench-science") {
        assert.match(
          await page.locator(".chart-inspector").textContent(),
          /17.48 USD.*average cost per task/,
        );
        assert.match(
          await page.locator(".chart-inspector").textContent(),
          /52 minutes.*weighted average decode time/,
        );
      }
      if (id === "healthbench-professional") {
        assert.match(
          await page.locator(".standard-axis").textContent(),
          /rubric/i,
        );
        assert.equal(
          c.rows.find((r) => r.model_variant === "GPT-6 Astra").value,
          64.7,
        );
      }
    }
    pass(
      "Full/HARD coding cohorts, common/native agent systems, corrected HealthBench and three medical conditions have separate groups with source/basis disclosures",
    );
    await go("results.html?benchmark=bullshitbench-v2&view=all");
    assert.equal(await page.locator(".standard-row").count(), 12);
    await page
      .getByRole("checkbox", { name: "Show all matching configurations" })
      .check();
    assert.equal(await page.locator(".standard-row").count(), 228);
    assert.deepEqual(
      await page
        .locator(".standard-row")
        .evaluateAll((n) => n.map((r) => Number(r.dataset.value))),
      expanded.bullshitbench.records.map((r) => r.value),
    );
    assert.match(
      await page.locator(".standard-axis").textContent(),
      /all 100 attempts/,
    );
    assert.equal(await page.locator(".standard-table tbody tr").count(), 228);
    await page
      .getByLabel("Find an exact configuration")
      .fill("claude-opus-5.5@reasoning=low");
    await page.locator(".standard-row").first().focus();
    assert.match(
      await page.locator(".chart-inspector").textContent(),
      /partial coverage 91\/100/,
    );
    assert.match(
      await page.locator(".chart-inspector").textContent(),
      /Evaluation date: unknown/,
    );
    pass(
      "All 228 BullshitBench scores retain all-attempt denominators; partial candidate-cost coverage and unknown evaluation dates remain explicit",
    );
    for (const skill of expanded.runebench.display_defaults.skills_available) {
      await go("results.html?benchmark=runebench&view=score&skill=" + skill);
      assert.equal(
        await page.locator('select[name="skill"] option').count(),
        16,
      );
      const rows = expanded.runebench.records.filter((r) => r.skill === skill);
      assert.deepEqual(
        await page
          .locator(".standard-row")
          .evaluateAll((n) => n.map((r) => Number(r.dataset.value))),
        rows.map((r) => r.value),
      );
      assert.match(
        await page.locator(".standard-axis").textContent(),
        /normalized XP\/min/,
      );
    }
    await go("results.html?benchmark=runebench&view=cost&skill=cooking");
    await page.locator(".expanded-scatter g").first().focus();
    assert.match(
      await page.locator(".chart-inspector").textContent(),
      /3675 normalized XP\/min.*1.17438/,
    );
    assert.equal(await page.locator('input[value="time"]').count(), 0);
    assert.equal(await page.locator(".chart-table tbody tr").count(), 3);
    await audit("Expanded Rune cost desktop");
    await page.setViewportSize({ width: 320, height: 844 });
    await page.waitForFunction(
      () =>
        document.querySelector(".expanded-scatter")?.viewBox.baseVal.width <
        350,
    );
    assert.equal(await page.locator(".expanded-legend button").count(), 3);
    assert.ok(
      (
        await page
          .locator(".expanded-legend svg")
          .evaluateAll((nodes) => nodes.map((n) => n.firstElementChild.tagName))
      )
        .join(",")
        .includes("rect"),
    );
    await page.setViewportSize({ width: 1280, height: 900 });
    pass(
      "All 48 Rune rows are accessible through 16 separate skills; cooking cost/peak values, exact tables and one-trial semantics are preserved; missing curves are not invented",
    );
    await go("results.html?benchmark=medagentbench&view=all");
    assert.equal(await page.locator(".standard-row").count(), 12);
    assert.equal(
      Number(
        await page.locator(".standard-row").last().getAttribute("data-value"),
      ),
      4,
    );
    assert.match(
      await page.locator(".historical-notice").textContent(),
      /historical/,
    );
    assert.match(
      await page.locator(".explanations").textContent(),
      /simulated|Simulated/,
    );
    pass(
      "All 12 historical author-homepage medical rows remain distinct from the original six paper observations and V2 conditions",
    );
    await page.setViewportSize({ width: 320, height: 844 });
    for (const q of [
      "benchmarks.html",
      "results.html?benchmark=gpqa-diamond",
      "results.html?benchmark=bullshitbench-v2&view=all",
      "results.html?benchmark=runebench&view=cost&skill=cooking",
      "results.html?benchmark=healthbench-professional",
    ]) {
      await go(q);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        true,
        q,
      );
      await audit("320px " + q);
      if (q.includes("cooking")) {
        const name = "current-rune-cooking-mobile.png";
        await page.screenshot({ path: path.join(out, name), fullPage: true });
        report.screenshots.push(name);
      }
    }
    pass(
      "New history/configuration controls, expanded graphs and medical rubric labels reflow at 320px with six zero-violation axe audits",
    );
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.externalRequests, []);
    report.passed = true;
  } finally {
    await browser.close();
    await new Promise((r) => server.close(r));
    fs.writeFileSync(
      path.join(
        out,
        process.env.LAB_GALLERY_BASE
          ? "current-gallery-live-validation.json"
          : "current-gallery-validation.json",
      ),
      JSON.stringify(report, null, 2),
    );
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
