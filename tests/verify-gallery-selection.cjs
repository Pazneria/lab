const fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http"),
  assert = require("node:assert/strict");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(__dirname, ".."),
  out = path.join(root, "evidence"),
  report = {
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
      !/^(?:results\.html|benchmarks\.html|(?:assets|data)\/[^.][^\\]*)$/.test(
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
    const watch = (p) => {
      p.on("pageerror", (e) => report.errors.push(e.message));
      p.on("request", (r) => {
        if (new URL(r.url()).origin !== new URL(base).origin)
          report.externalRequests.push(r.url());
      });
    };
    watch(page);
    const go = async (q) => {
      await page.goto(base + "results.html?" + q);
      await page.locator("#benchmark-detail").waitFor({ state: "visible" });
      await page.mouse.move(1, 1);
    };
    const clear = async (p) => {
      assert.equal(
        await p.locator(".chart-inspector strong").textContent(),
        "Explore a result",
      );
      assert.equal(await p.locator(".chart-inspector a").count(), 0);
      assert.equal(
        await p.locator('.standard-row[aria-pressed="true"]').count(),
        0,
      );
    };
    const selected = async (p) => {
      const r = p.locator('.standard-row[aria-pressed="true"]');
      assert.equal(await r.count(), 1);
      assert.equal(
        await p.locator(".chart-inspector strong").textContent(),
        await r.getAttribute("data-model"),
      );
      assert.equal(
        await p.locator(".chart-inspector>a").getAttribute("href"),
        await r.getAttribute("data-source-url"),
      );
      return await r.getAttribute("data-model");
    };
    const audit = async (p, label) => {
      await p.addScriptTag({
        path:
          process.env.LAB_AXE_SCRIPT || require.resolve("axe-core/axe.min.js"),
      });
      const a = await p.evaluate(() =>
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
    const capture = async (p, name) => {
      await p.screenshot({ path: path.join(out, name), fullPage: true });
      report.screenshots.push(name);
    };
    await go("benchmark=gpqa-diamond");
    await page.locator(".standard-row").first().click();
    const first = await selected(page);
    await page.mouse.move(1, 1);
    await page.getByLabel("Find an exact configuration").fill(first);
    assert.equal(await selected(page), first);
    await page
      .getByLabel("Find an exact configuration")
      .fill("no-matching-configuration-expected");
    assert.equal(await page.locator(".standard-row").count(), 0);
    await clear(page);
    assert.match(
      await page
        .locator('[role="status"]')
        .allTextContents()
        .then((a) => a.join(" ")),
      /Selection cleared/,
    );
    await page.getByLabel("Find an exact configuration").fill("");
    await clear(page);
    pass(
      "Configuration search retains a visible selected record and its pressed state; removing it or showing no matches clears score/source details and announces the cleared selection",
    );
    await page
      .getByRole("checkbox", { name: "Show all matching configurations" })
      .check();
    await page.locator(".standard-row").nth(20).click();
    const outside = await selected(page);
    await page.mouse.move(1, 1);
    await page
      .getByRole("checkbox", { name: "Show all matching configurations" })
      .uncheck();
    assert.equal(await page.locator(".standard-row").count(), 12);
    assert.equal(
      await page
        .locator(".standard-row")
        .evaluateAll(
          (rows, m) => rows.some((r) => r.dataset.model === m),
          outside,
        ),
      false,
    );
    await clear(page);
    await capture(page, "gallery-selection-cleared-desktop.png");
    await page
      .getByRole("checkbox", { name: "Show all matching configurations" })
      .check();
    await clear(page);
    await page.locator(".standard-row").first().focus();
    const visible = await selected(page);
    await page.mouse.move(1, 1);
    await page
      .getByRole("checkbox", { name: "Show all matching configurations" })
      .uncheck();
    assert.equal(await selected(page), visible);
    pass(
      "Show all clears a selection outside the restored first 12, does not resurrect it when expanded, and preserves a selection that remains visible",
    );
    await page
      .getByLabel("Find an exact configuration")
      .fill("no-matching-configuration-expected");
    await clear(page);
    await page.reload();
    await clear(page);
    assert.equal(await page.locator(".standard-row").count(), 0);
    await audit(page, "Cleared desktop selection");
    await go("benchmark=mmmu-pro");
    await clear(page);
    pass(
      "Reload and cohort navigation start with a prompt rather than carrying an earlier model score or source",
    );
    await go("benchmark=hle-diamond");
    await page.locator(".standard-row").first().focus();
    assert.equal(
      await page
        .locator('.standard-row[aria-pressed="true"]')
        .getAttribute("data-value"),
      "59.9",
    );
    await page.locator('input[value="tools"]').check();
    await page.mouse.move(1, 1);
    await clear(page);
    await page.locator("button.standard-row").first().focus();
    assert.equal(
      await page
        .locator('.standard-row[aria-pressed="true"]')
        .getAttribute("data-value"),
      "82.9",
    );
    assert.match(
      await page.locator(".chart-inspector").textContent(),
      /82.9 percent/,
    );
    pass(
      "HLE no-tools/tools transitions reset selection, then display the new setting's score and source when selected",
    );
    await go("benchmark=bullshitbench-v2&view=all");
    await page
      .getByRole("checkbox", { name: "Show all matching configurations" })
      .check();
    await page.locator(".standard-row").last().focus();
    const bb = await selected(page);
    await page
      .getByLabel("Find an exact configuration")
      .fill("no-matching-configuration-expected");
    await clear(page);
    await page.locator('input[value="time"]').check();
    assert.equal(await page.locator(".standard-row").count(), 0);
    assert.ok(
      !(await page.locator(".chart-inspector").textContent()).includes(bb),
    );
    await page.locator('input[value="all"]').check();
    await page.mouse.move(1, 1);
    await clear(page);
    pass(
      "Expanded BullshitBench filtering and switches to verified time plots do not retain hidden or prior-cohort details",
    );
    const mobile = await browser.newContext({
        viewport: { width: 320, height: 844 },
        isMobile: true,
        hasTouch: true,
        reducedMotion: "reduce",
      }),
      touch = await mobile.newPage();
    watch(touch);
    await touch.goto(base + "results.html?benchmark=gpqa-diamond");
    await touch.locator(".standard-row").first().tap();
    await selected(touch);
    await touch.getByLabel("Find an exact configuration").tap();
    await touch
      .getByLabel("Find an exact configuration")
      .fill("no-matching-configuration-expected");
    await clear(touch);
    assert.equal(
      await touch.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      true,
    );
    await audit(touch, "Cleared touch selection at 320px");
    await capture(touch, "gallery-selection-cleared-mobile.png");
    await mobile.close();
    pass(
      "Touch selection followed by mobile search clears stale details at 320px; two scoped axe audits have zero violations",
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
          ? "gallery-selection-live-validation.json"
          : "gallery-selection-validation.json",
      ),
      JSON.stringify(report, null, 2),
    );
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
