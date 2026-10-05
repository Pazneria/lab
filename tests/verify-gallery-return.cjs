const fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http"),
  assert = require("node:assert/strict");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(__dirname, ".."),
  out = path.join(root, "evidence"),
  prefix = process.env.LAB_RETURN_PREFIX || "gallery-return";
const report = {
  checkedAt: new Date().toISOString(),
  checks: [],
  errors: [],
  externalRequests: [],
  cachedReturns: 0,
  screenshots: [],
  security: {
    scope: "Gallery dependency recovery and document return lifecycle only.",
    findings: [
      "Recovery loads one fixed same-origin script URL; query, hash and source data cannot supply its destination.",
      "Failure copy uses text nodes and preserves existing fallback links. No HTML evaluation, dependency installation, private data or account/settings changes were introduced.",
      "All successful test flows made no runtime request to an external origin. Existing source-link and return-destination validation remains in place.",
    ],
    limits:
      "A narrow review and browser regression test, not a security certification, broad scan or audit of other Lab projects.",
  },
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
        ).replace(/^\/lab\//, "") || "index.html",
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
        ".json": "application/json; charset=utf-8",
        ".svg": "image/svg+xml",
      }[path.extname(file)] || "text/plain",
    );
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.end(fs.readFileSync(file));
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
async function main() {
  fs.mkdirSync(out, { recursive: true });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base =
    process.env.LAB_RETURN_BASE ||
    "http://127.0.0.1:" + server.address().port + "/lab/";
  report.base = base;
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.LAB_BROWSER_CHANNEL || undefined,
    // Playwright normally disables this lifecycle. Test real cached returns.
    ignoreDefaultArgs: ["--disable-back-forward-cache"],
  });
  report.browser = browser.version();
  const watch = (page) => {
    page.on("pageerror", (e) => report.errors.push(e.message));
    page.on("request", (r) => {
      if (new URL(r.url()).origin !== new URL(base).origin)
        report.externalRequests.push(r.url());
    });
  };
  const cardsReady = (p) => p.locator(".benchmark-card").first().waitFor();
  const capture = async (p, name) => {
    const file = prefix + "-" + name + ".png";
    await p.screenshot({ path: path.join(out, file), fullPage: true });
    report.screenshots.push(file);
  };
  try {
    for (const mobile of [false, true]) {
      const context = await browser.newContext({
        viewport: mobile
          ? { width: 390, height: 844 }
          : { width: 1280, height: 800 },
        hasTouch: mobile,
        isMobile: mobile,
      });
      await context.addInitScript(() => {
        window.returnLifecycle = [];
        addEventListener("pageshow", (e) =>
          window.returnLifecycle.push({ persisted: e.persisted }),
        );
      });
      const page = await context.newPage();
      watch(page);
      for (const route of [
        "",
        "index.html",
        "benchmarks.html",
        "benchmarks.html?category=standard&graphs=1&q=can",
        "benchmarks.html?category=games&graphs=1&q=rune",
      ]) {
        for (const method of ["browser", "backlink", "navigation"]) {
          await page.goto(base + route);
          await cardsReady(page);
          const expected = await page.locator(".benchmark-card").count();
          for (let cycle = 0; cycle < 2; cycle++) {
            const card = page.locator(".benchmark-card").first(),
              id = await card.getAttribute("data-benchmark-id");
            await card.scrollIntoViewIfNeeded();
            const position = await page.evaluate(() => ({
              url: location.href,
              y: scrollY,
              q: document.getElementById("benchmark-search").value,
            }));
            if (mobile) await card.tap();
            else await card.click();
            await page
              .locator("#benchmark-detail")
              .waitFor({ state: "visible" });
            if (method === "browser")
              await page.goBack({ waitUntil: "commit" });
            else if (method === "backlink")
              await page.locator(".back-link").click();
            else
              await page
                .locator("header nav a")
                .filter({ hasText: "Benchmarks" })
                .click();
            await cardsReady(page);
            const navigation = method === "navigation";
            assert.equal(
              page.url(),
              navigation ? base + "benchmarks.html" : position.url,
            );
            assert.equal(
              await page.locator(".benchmark-card").count(),
              navigation ? 51 : expected,
            );
            assert.equal(
              await page.locator("#gallery-empty").isVisible(),
              false,
            );
            assert.equal(
              await page.locator("#gallery-unavailable").isVisible(),
              false,
            );
            assert.equal(
              await page.locator("#benchmark-search").inputValue(),
              navigation ? "" : position.q,
            );
            if (!navigation) {
              await page.waitForFunction(
                ({ id, y }) =>
                  document.activeElement?.id === "benchmark-" + id &&
                  Math.abs(scrollY - y) < 2,
                { id, y: position.y },
              );
              report.cachedReturns += await page.evaluate(() =>
                window.returnLifecycle.filter((e) => e.persisted).length > 0
                  ? 1
                  : 0,
              );
            }
            assert.equal(
              await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth + 1,
              ),
              true,
            );
          }
          pass(
            (mobile ? "Touch" : "Desktop") +
              " " +
              method +
              " repeated returns preserve visible cards: /lab/" +
              route,
          );
        }
      }
      // Exercise actual filter input events and same-document history as well.
      await page.goto(base + "benchmarks.html");
      await cardsReady(page);
      await page.locator("input[name=category][value=games]").check();
      await page.locator("#benchmark-search").fill("rune");
      assert.equal(await page.locator(".benchmark-card").count(), 1);
      const filteredURL = page.url();
      await page.locator(".benchmark-card").click();
      await page.locator("#benchmark-detail").waitFor({ state: "visible" });
      await page.goBack({ waitUntil: "commit" });
      await cardsReady(page);
      assert.equal(page.url(), filteredURL);
      assert.equal(
        await page.locator("#benchmark-search").inputValue(),
        "rune",
      );
      assert.equal(await page.locator(".benchmark-card").count(), 1);
      await page.locator("#benchmark-search").fill("");
      await page.goBack({ waitUntil: "commit" });
      await page.waitForFunction(
        () => document.querySelectorAll(".benchmark-card").length === 51,
      );
      await page.reload();
      await cardsReady(page);
      assert.equal(await page.locator(".benchmark-card").count(), 51);
      const direct = await context.newPage();
      watch(direct);
      await direct.goto(
        base + "results.html?benchmark=hle-diamond&view=knowledge",
      );
      await direct.locator("#benchmark-detail").waitFor({ state: "visible" });
      assert.equal(
        await direct.locator(".back-link").getAttribute("href"),
        "benchmarks.html#gallery",
      );
      await direct.locator(".back-link").click();
      await cardsReady(direct);
      assert.equal(await direct.locator(".benchmark-card").count(), 51);
      await direct.close();
      await capture(page, mobile ? "mobile" : "desktop");
      pass(
        (mobile ? "Touch" : "Desktop") +
          " filter/search changes, history restoration, reload and direct-detail fallback keep the gallery visible",
      );
      await context.close();
    }
    assert.ok(
      report.cachedReturns > 0,
      "Real back-forward cache restoration must be exercised",
    );
    // The previous document at bfe30c2 differs from current HTML only by the
    // absence of this script tag (verified against both exact git versions).
    // Serve that cached shape with current assets on the return destination.
    for (const failHelper of [false, true]) {
      const context = await browser.newContext(),
        page = await context.newPage();
      watch(page);
      const priorHTML = fs
        .readFileSync(path.join(root, "benchmarks.html"), "utf8")
        .replace(
          /^\s*<script src="assets\/metric-order\.js" defer><\/script>\r?\n/m,
          "",
        );
      assert.ok(!priorHTML.includes('src="assets/metric-order.js"'));
      await page.route(base + "benchmarks.html", (r) =>
        r.fulfill({ body: priorHTML, contentType: "text/html; charset=utf-8" }),
      );
      if (failHelper)
        await page.route("**/metric-order.js?*", (r) => r.abort("failed"));
      await page.goto(base);
      await cardsReady(page);
      await page.locator(".benchmark-card").first().click();
      await page.locator("#benchmark-detail").waitFor({ state: "visible" });
      await page
        .locator("header nav a")
        .filter({ hasText: "Benchmarks" })
        .click();
      if (failHelper) {
        await page
          .getByText("The benchmark gallery could not finish loading.")
          .waitFor();
        assert.equal(
          await page.locator("#gallery-unavailable").isVisible(),
          true,
        );
        assert.ok((await page.locator("#gallery-unavailable a").count()) >= 2);
        pass(
          "Unavailable recovery script shows an actionable fallback instead of a silent empty gallery",
        );
      } else {
        await cardsReady(page);
        assert.equal(await page.locator(".benchmark-card").count(), 51);
        assert.equal(
          await page.locator("#gallery-unavailable").isVisible(),
          false,
        );
        assert.equal(
          await page.evaluate(() => typeof window.LAB_METRIC_ORDER.order),
          "function",
        );
        assert.equal(
          await page
            .locator('script[src$="metric-order.js?v=5fcbd08"]')
            .count(),
          1,
        );
        await capture(page, "cached-document-recovered");
        pass(
          "Actual pre-ordering document shape plus current assets recovers all 51 cards after detail-to-gallery navigation",
        );
      }
      await context.close();
    }
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.externalRequests, []);
    report.passed = true;
  } finally {
    await browser.close();
    await new Promise((r) => server.close(r));
    fs.writeFileSync(
      path.join(out, prefix + "-validation.json"),
      JSON.stringify(report, null, 2),
    );
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
