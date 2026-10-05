const fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http"),
  assert = require("node:assert/strict"),
  vm = require("node:vm");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(__dirname, ".."),
  out = path.join(root, "evidence");
const report = {
  checkedAt: new Date().toISOString(),
  checks: [],
  axe: [],
  errors: [],
  externalRequests: [],
  viewports: [],
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
  const sandbox = { window: {} };
  vm.runInNewContext(
    fs.readFileSync(path.join(root, "assets/gallery-data.js"), "utf8"),
    sandbox,
  );
  const frontend = sandbox.window.LAB_GALLERY.frontend,
    arena = frontend.cards.find((c) => c.id === "webdev-arena-frontend"),
    design = frontend.cards.find((c) => c.id === "design2code-v3-484");
  assert.deepEqual(
    Array.from(arena.rows, (r) => r.value),
    [1858, 1822, 1807, 1782, 1774, 1744, 1717, 1698, 1691, 1680, 1680, 1678],
  );
  assert.deepEqual(
    Array.from(arena.rows, (r) => r.votes),
    [1565, 1245, 5196, 5110, 1343, 2089, 13257, 2844, 1929, 7694, 17378, 2935],
  );
  for (const r of arena.rows) {
    assert.equal(
      r.confidence_interval.lower,
      r.value - r.confidence_interval.minus,
    );
    assert.equal(
      r.confidence_interval.upper,
      r.value + r.confidence_interval.plus,
    );
    assert.equal(r.confidence_interval.level, null);
    assert.equal(r.cost_usd, null);
    assert.equal(r.latency_seconds, null);
    assert.equal(r.evaluation_date, null);
  }
  assert.ok(
    arena.rows
      .filter((r) => r.model_variant.startsWith("qwen"))
      .every((r) => r.effort === null),
  );
  const sourceMetrics = [
    [93, 98.2, 85.5, 84.1, 90.4],
    [92.4, 98.6, 84.5, 83.1, 89.9],
    [92.7, 98.6, 84.9, 83.3, 90.1],
    [85.8, 97.4, 80.5, 73.3, 86.9],
    [90.2, 97.5, 77.9, 71.4, 87],
    [80.2, 94.6, 72.3, 66.2, 84.4],
  ];
  assert.deepEqual(
    Array.from(design.rows, (r) =>
      Array.from(design.metric_order, (m) => r.metrics[m]),
    ),
    sourceMetrics,
  );
  assert.ok(
    design.rows.every(
      (r) =>
        r.uncertainty === null &&
        r.cost_usd === null &&
        r.latency_seconds === null,
    ),
  );
  pass(
    "18 frontend observations retain all exact ratings, intervals, votes, 30 fidelity values and null cost/time/uncertainty; Qwen name is not inferred effort",
  );
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
        .waitFor({ state: "visible" });
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
          nodes: v.nodes.map((n) => ({
            target: n.target,
            reason: n.failureSummary,
          })),
        })),
        incomplete: a.incomplete.map((v) => v.id),
      });
      assert.equal(a.violations.length, 0, JSON.stringify(report.axe.at(-1)));
    };
    const shot = async (filename) => {
      await page.mouse.move(1, 1);
      await page.evaluate(async () => {
        document.activeElement?.blur();
        await new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        );
        document.activeElement?.blur();
        window.scrollTo(0, 0);
      });
      await page.screenshot({ path: path.join(out, filename), fullPage: true });
      report.screenshots.push(filename);
    };
    await go("benchmarks.html?category=frontend");
    assert.equal(await page.locator(".benchmark-card").count(), 4);
    assert.equal(await page.locator(".mini-graph svg").count(), 2);
    assert.equal(await page.locator(".mini-evidence").count(), 2);
    await audit("Frontend gallery desktop");
    await shot("frontend-gallery-desktop.png");
    await page.locator("[data-benchmark-id=webdev-arena-frontend]").click();
    await page.locator(".frontend-row").first().waitFor();
    assert.equal(await page.locator(".frontend-row").count(), 12);
    assert.deepEqual(
      await page
        .locator(".frontend-row")
        .evaluateAll((ns) => ns.map((n) => Number(n.dataset.value))),
      Array.from(arena.rows, (r) => r.value),
    );
    assert.match(
      await page.locator(".chart-scale-note").first().textContent(),
      /1600–1900.*cropped/,
    );
    assert.equal(await page.locator(".frontend-interval").count(), 12);
    for (let i = 0; i < arena.rows.length; i++) {
      const r = arena.rows[i],
        row = page.locator(".frontend-row").nth(i);
      await row.focus();
      assert.equal(
        await row.getAttribute("data-interval-lower"),
        String(r.confidence_interval.lower),
      );
      assert.equal(
        await row.getAttribute("data-interval-upper"),
        String(r.confidence_interval.upper),
      );
      assert.ok(
        (await page.locator(".chart-inspector").textContent()).includes(
          String(r.confidence_interval.lower) +
            "–" +
            String(r.confidence_interval.upper),
        ),
      );
      assert.equal(
        await page.locator(".chart-inspector>a").getAttribute("href"),
        arena.source_url,
      );
    }
    assert.deepEqual(
      await page
        .locator(".frontend-table tbody tr")
        .evaluateAll((ns) => ns.map((n) => Number(n.cells[1].textContent))),
      Array.from(arena.rows, (r) => r.value),
    );
    assert.equal(
      await page
        .locator("input[name=view][value=cost],input[name=view][value=time]")
        .count(),
      0,
    );
    await audit("Arena ratings and intervals desktop");
    await shot("frontend-arena-desktop.png");
    await page.goBack();
    assert.equal(
      await page.locator("input[name=category][value=frontend]").isChecked(),
      true,
    );
    pass(
      "Frontend filter and browser-back preserve four cards; all 12 Arena ratings, exact interval bounds, source links and table values match",
    );
    await go("results.html?benchmark=design2code-v3-484");
    assert.equal(
      await page.locator("input[name=view][value=clip]").isChecked(),
      true,
    );
    assert.equal(
      await page.locator("select[name=comparison]").inputValue(),
      "direct",
    );
    for (const comparison of ["direct", "methods"]) {
      await page.locator("select[name=comparison]").selectOption(comparison);
      const rows = Array.from(design.rows).filter((r) =>
        comparison === "direct"
          ? r.prompt_method === "direct"
          : r.model_variant === "GPT-4o",
      );
      for (const metric of Array.from(design.metric_order)) {
        await page.locator("input[name=view][value=" + metric + "]").check();
        assert.equal(await page.locator(".frontend-row").count(), rows.length);
        assert.deepEqual(
          await page
            .locator(".frontend-row")
            .evaluateAll((ns) => ns.map((n) => Number(n.dataset.value))),
          rows.map((r) => r.metrics[metric]),
        );
        assert.deepEqual(
          await page
            .locator(".frontend-table tbody tr")
            .evaluateAll((ns) => ns.map((n) => Number(n.cells[1].textContent))),
          rows.map((r) => r.metrics[metric]),
        );
        const first = page.locator(".frontend-row").first();
        await first.focus();
        assert.ok(
          (await page.locator(".chart-inspector").textContent()).includes(
            rows[0].model_snapshot,
          ),
        );
        await page.reload();
        assert.equal(
          await page.locator("select[name=comparison]").inputValue(),
          comparison,
        );
        assert.equal(
          await page
            .locator("input[name=view][value=" + metric + "]")
            .isChecked(),
          true,
        );
      }
    }
    await go("results.html?benchmark=design2code-v3-484");
    await audit("Design2Code Direct desktop");
    await shot("frontend-design2code-desktop.png");
    await page.locator("select[name=comparison]").selectOption("methods");
    await audit("Design2Code methods desktop");
    pass(
      "All five fidelity metrics match the four-Direct and three-GPT-4o-method slices independently; table, snapshots and reload state verified without aggregation",
    );
    for (const id of ["design-arena-frontend", "webcraftbench-v3"]) {
      await go("results.html?benchmark=" + id);
      assert.equal(await page.locator(".chart-card").count(), 0);
      assert.equal(await page.locator(".evidence-panel").count(), 1);
      await page.locator("#benchmark-sources>summary").click();
      assert.ok(
        await page
          .locator("a[target=_blank]")
          .evaluateAll((ns) =>
            ns.every(
              (n) =>
                n.protocol === "https:" &&
                !n.username &&
                !n.password &&
                n.rel.includes("noopener") &&
                n.rel.includes("noreferrer"),
            ),
          ),
      );
      await audit(id + " source guide");
    }
    for (const id of [
      "behavior-challenge-2026",
      "waymo-onroad-safety",
      "stationerybench",
      "robochallenge-table30",
    ]) {
      await go("results.html?benchmark=" + id);
      const d = page.getByText("October 5 source check and qualifications", {
        exact: true,
      });
      await d.click();
      assert.match(await d.locator("..").textContent(), /October 5/);
      assert.equal(await page.locator(".chart-card").count(), 0);
    }
    pass(
      "Design Arena and WebCraftBench stay source-only; supplemental BEHAVIOR, Waymo, StationeryBench and RoboChallenge qualifications add no incompatible graphs",
    );
    for (const width of [1440, 1024, 768, 640, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      for (const q of [
        "benchmarks.html?category=frontend",
        "results.html?benchmark=webdev-arena-frontend",
        "results.html?benchmark=design2code-v3-484&view=text&comparison=methods",
      ]) {
        await go(q);
        if (q.startsWith("results"))
          await page.locator(".table-alternative>summary").click();
        const dimensions = await page.evaluate(() => ({
          width: innerWidth,
          scroll: document.documentElement.scrollWidth,
        }));
        report.viewports.push({ q, ...dimensions });
        assert.ok(dimensions.scroll <= width + 1, JSON.stringify(dimensions));
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await go("benchmarks.html?category=frontend");
    await audit("Frontend gallery mobile");
    await shot("frontend-gallery-mobile.png");
    await go("results.html?benchmark=webdev-arena-frontend");
    await page.locator(".frontend-row").nth(9).click();
    assert.match(
      await page.locator(".chart-inspector").textContent(),
      /not established from the model name/,
    );
    await audit("Arena mobile");
    await shot("frontend-arena-mobile.png");
    await go("results.html?benchmark=design2code-v3-484");
    await page.locator(".frontend-row").first().click();
    await audit("Design2Code mobile");
    await shot("frontend-design2code-mobile.png");
    await page.emulateMedia({ forcedColors: "active" });
    assert.equal(await page.locator(".frontend-row").count(), 4);
    await page.emulateMedia({ forcedColors: "none" });
    pass(
      "Six viewport widths down to 320px with open tables; keyboard/tap inspectors, nine axe audits and forced-colors chart presence",
    );
    const data = fs.readFileSync(
        path.join(root, "assets/gallery-data.js"),
        "utf8",
      ),
      attack = '<img src=x onerror="window.__frontendInjection=1">';
    await page.route("**/assets/gallery-data.js", (route) =>
      route.fulfill({
        contentType: "text/javascript",
        body:
          data +
          "\nwindow.LAB_GALLERY.frontend.cards[0].rows[0].model_variant=" +
          JSON.stringify(attack) +
          ";",
      }),
    );
    await go("results.html?benchmark=webdev-arena-frontend#%3Cscript%3E");
    await page.locator(".frontend-row").first().focus();
    assert.ok(
      (await page.locator(".chart-inspector strong").textContent()).includes(
        attack,
      ),
    );
    assert.equal(await page.locator("img[onerror]").count(), 0);
    assert.equal(
      await page.evaluate(() => window.__frontendInjection),
      undefined,
    );
    await page.unroute("**/assets/gallery-data.js");
    for (const url of [
      "javascript:alert(1)",
      "https://user:secret@example.com",
    ]) {
      await page.route("**/assets/gallery-data.js", (route) =>
        route.fulfill({
          contentType: "text/javascript",
          body:
            data +
            "\nwindow.LAB_GALLERY.frontend.cards[0].source_url=" +
            JSON.stringify(url) +
            ";",
        }),
      );
      await page.goto(base + "benchmarks.html");
      assert.equal(await page.locator(".benchmark-card").count(), 0);
      await page.unroute("**/assets/gallery-data.js");
    }
    await go(
      "results.html?benchmark=design2code-v3-484&view=%3Csvg%3E&comparison=bad",
    );
    assert.equal(
      await page.locator("input[name=view][value=clip]").isChecked(),
      true,
    );
    assert.equal(
      await page.locator("select[name=comparison]").inputValue(),
      "direct",
    );
    assert.equal(await page.locator("iframe").count(), 0);
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.externalRequests, []);
    pass(
      "Untrusted model names render as text; unsafe/credential-bearing URLs reject projection; query/hash bounded; no external runtime resources or new dependencies",
    );
    report.passed = true;
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
  .finally(() => {
    fs.writeFileSync(
      path.join(out, "frontend-gallery-validation.json"),
      JSON.stringify(report, null, 2) + "\n",
    );
    server.close();
  });
