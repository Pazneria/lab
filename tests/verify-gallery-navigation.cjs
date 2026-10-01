const fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http"),
  assert = require("node:assert/strict");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(__dirname, ".."),
  out = path.join(root, "evidence");
const report = {
  checkedAt: new Date().toISOString(),
  checks: [],
  errors: [],
  externalRequests: [],
  screenshots: [],
};
const server = http.createServer((req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    ).replace(/^\/lab\//, "");
    const rel = pathname || "index.html",
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
    res.end(fs.readFileSync(file));
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
function pass(s) {
  report.checks.push(s);
  console.log("PASS " + s);
}
async function main() {
  fs.mkdirSync(out, { recursive: true });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base =
    process.env.LAB_GALLERY_BASE ||
    "http://127.0.0.1:" + server.address().port + "/lab/";
  report.base = base;
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.LAB_BROWSER_CHANNEL || undefined,
  });
  report.browser = browser.version();
  const watch = (page) => {
    page.on("pageerror", (e) => report.errors.push(e.message));
    page.on("request", (r) => {
      if (new URL(r.url()).origin !== new URL(base).origin)
        report.externalRequests.push(r.url());
    });
  };
  const ready = (page) =>
    page.locator("#benchmark-detail").waitFor({ state: "visible" });
  const returned = async (page, expected, y, category, count) => {
    await page.waitForURL(expected);
    await page.locator(".benchmark-card").first().waitFor();
    assert.equal(
      await page.locator("input[name=category]:checked").getAttribute("value"),
      category,
    );
    assert.equal(await page.locator(".benchmark-card").count(), count);
    await page.waitForFunction(
      (expectedY) => Math.abs(scrollY - expectedY) < 2,
      y,
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      true,
    );
  };
  const capture = async (page, name) => {
    await page.mouse.move(1, 1);
    await page.screenshot({ path: path.join(out, name), fullPage: true });
    report.screenshots.push(name);
  };
  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    watch(page);
    const galleryURL =
      base + "benchmarks.html?category=standard&graphs=1&q=can";
    await page.goto(galleryURL);
    await page.locator(".benchmark-card").first().waitFor();
    const standardCount = await page.locator(".benchmark-card").count();
    assert.ok(standardCount > 6);
    await page.evaluate(() => scrollTo({ top: 600, behavior: "instant" }));
    const card = page.locator('[data-benchmark-id="hle-diamond"]');
    await card.focus();
    const before = await page.evaluate(() => ({
      length: history.length,
      y: scrollY,
    }));
    await card.press("Enter");
    await page.waitForURL("**/results.html?benchmark=hle-diamond");
    await ready(page);
    const detailLength = await page.evaluate(() => history.length);
    assert.equal(detailLength, before.length + 1);
    assert.equal(
      await page.locator(".back-link").getAttribute("href"),
      galleryURL,
    );
    assert.deepEqual(
      await page.evaluate(() => history.state.labGalleryReturn),
      { url: galleryURL, scrollY: before.y, focusId: "hle-diamond" },
    );
    for (const view of ["reasoning", "knowledge", "tools", "score", "tools"]) {
      await page.locator('input[name=view][value="' + view + '"]').check();
      assert.equal(new URL(page.url()).searchParams.get("view"), view);
      assert.equal(await page.evaluate(() => history.length), detailLength);
    }
    await page.reload();
    await ready(page);
    assert.equal(await page.locator("input[value=tools]").isChecked(), true);
    await page.goBack();
    await returned(page, galleryURL, before.y, "standard", standardCount);
    assert.equal(await page.locator("#benchmark-search").inputValue(), "can");
    assert.equal(await page.locator("input[name=graphs]").isChecked(), true);
    assert.equal(
      await card.evaluate((n) => n === document.activeElement),
      true,
    );
    await page.goForward();
    await ready(page);
    assert.equal(await page.locator("input[value=tools]").isChecked(), true);
    assert.equal(await page.locator("button.standard-row").count(), 6);
    await page.locator("input[value=reasoning]").focus();
    await page.locator("input[value=reasoning]").press("Space");
    assert.equal(await page.evaluate(() => history.length), detailLength);
    await page.locator(".back-link").focus();
    await page.locator(".back-link").press("Enter");
    await returned(page, galleryURL, before.y, "standard", standardCount);
    await card.click();
    await ready(page);
    assert.equal(await page.locator("input[value=score]").isChecked(), true);
    await page.locator("input[value=knowledge]").check();
    await page.locator(".back-link").click();
    await returned(page, galleryURL, before.y, "standard", standardCount);
    await page.reload();
    await returned(page, galleryURL, before.y, "standard", standardCount);
    await capture(page, "gallery-history-return-desktop.png");
    pass(
      "Keyboard entry and repeated HLE switches add exactly one detail entry; browser Back, Forward, in-page Back, reopen and reload preserve gallery filters, scroll and focus",
    );

    for (const id of [
      "gpqa-diamond-march-reported",
      "mmmu-pro-march-reported",
      "swe-bench-pro-public-v1",
      "terminal-bench-2",
    ]) {
      await page.goto(base + "results.html?benchmark=" + id);
      await ready(page);
      assert.match(
        await page.locator(".historical-status").textContent(),
        /Historical.*2026-03-17/,
      );
      assert.match(
        await page.locator(".historical-notice").textContent(),
        /March 17, 2026.*not current standings/,
      );
      assert.ok(
        await page
          .locator(".historical-notice")
          .evaluate(
            (n) =>
              n.compareDocumentPosition(
                document.querySelector(".standard-chart"),
              ) & Node.DOCUMENT_POSITION_FOLLOWING,
          ),
      );
    }
    await capture(page, "gallery-historical-detail.png");
    pass(
      "All four March cohorts have a conspicuous historical date and a notice before the graph; no data or dates changed",
    );
    await context.close();

    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
      reducedMotion: "reduce",
    });
    const touch = await mobile.newPage();
    watch(touch);
    const mobileGallery =
      base + "benchmarks.html?category=games&graphs=1&q=rune";
    await touch.goto(mobileGallery);
    await touch.locator(".benchmark-card").waitFor();
    await touch.locator(".benchmark-card").scrollIntoViewIfNeeded();
    const mobileY = await touch.evaluate(() => scrollY);
    await touch.locator(".benchmark-card").tap();
    await ready(touch);
    const mobileLength = await touch.evaluate(() => history.length);
    for (const [view, skill] of [
      ["time", "mining"],
      ["cost", "woodcutting"],
      ["time", "woodcutting"],
      ["cost", "mining"],
      ["time", "mining"],
    ]) {
      await touch.locator('label:has(input[value="' + view + '"])').tap();
      await touch.locator("select[name=skill]").selectOption(skill);
      assert.equal(await touch.evaluate(() => history.length), mobileLength);
    }
    await touch.reload();
    await ready(touch);
    assert.match(
      await touch.locator(".chart-card").getAttribute("id"),
      /mining-score-time/,
    );
    await touch.goBack();
    await returned(touch, mobileGallery, mobileY, "games", 1);
    await touch.goForward();
    await ready(touch);
    assert.match(
      await touch.locator(".chart-card").getAttribute("id"),
      /mining-score-time/,
    );
    await capture(touch, "gallery-history-detail-mobile.png");
    await touch.locator(".back-link").tap();
    await returned(touch, mobileGallery, mobileY, "games", 1);
    assert.equal(await touch.locator("#benchmark-search").inputValue(), "rune");
    pass(
      "Touch view/skill changes replace one detail state; reload, Forward and both Back controls preserve mobile gallery position and filters",
    );
    await mobile.close();

    const direct = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const deep = await direct.newPage();
    watch(deep);
    await deep.goto(base + "catalog.html");
    await deep.goto(
      base + "results.html?benchmark=runebench&view=time&skill=mining",
    );
    await ready(deep);
    const directLength = await deep.evaluate(() => history.length);
    assert.equal(
      await deep.locator(".back-link").getAttribute("href"),
      "benchmarks.html#gallery",
    );
    await deep.locator("input[value=cost]").check();
    await deep.locator("select[name=skill]").selectOption("woodcutting");
    await deep.reload();
    await ready(deep);
    assert.match(
      await deep.locator(".chart-card").getAttribute("id"),
      /woodcutting-score-cost/,
    );
    assert.equal(await deep.evaluate(() => history.length), directLength);
    await deep.goBack();
    await deep.waitForURL("**/catalog.html");
    await deep.goForward();
    await ready(deep);
    await deep.locator(".back-link").click();
    await deep.waitForURL("**/benchmarks.html#gallery");
    assert.equal(await deep.locator(".benchmark-card").count(), 42);
    await deep.goto(base + "results.html?benchmark=hle-diamond");
    await ready(deep);
    for (const url of [
      "https://example.invalid/benchmarks.html",
      "javascript:alert(1)",
      base + "lab-space/",
    ]) {
      await deep.evaluate(
        (url) =>
          history.replaceState(
            { labGalleryReturn: { url, scrollY: 600, focusId: "hle-diamond" } },
            "",
          ),
        url,
      );
      await deep.reload();
      await ready(deep);
      assert.equal(
        await deep.locator(".back-link").getAttribute("href"),
        "benchmarks.html#gallery",
      );
    }
    pass(
      "Direct links retain the selected graph through reload and native Back/Forward; in-page fallback opens the gallery, and unsafe or unrelated return destinations are rejected",
    );
    await direct.close();
    const blocked = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      reducedMotion: "reduce",
    });
    await blocked.addInitScript(() => {
      for (const name of ["getItem", "setItem", "removeItem"])
        Storage.prototype[name] = () => {
          throw new DOMException("Storage disabled", "SecurityError");
        };
    });
    const noStorage = await blocked.newPage();
    watch(noStorage);
    await noStorage.goto(galleryURL);
    await noStorage.locator(".benchmark-card").first().waitFor();
    await noStorage.evaluate(() => scrollTo({ top: 600, behavior: "instant" }));
    const blockedY = await noStorage.evaluate(() => scrollY);
    await noStorage.locator('[data-benchmark-id="hle-diamond"]').click();
    await ready(noStorage);
    await noStorage.locator("input[value=tools]").check();
    await noStorage.locator(".back-link").click();
    await returned(noStorage, galleryURL, blockedY, "standard", standardCount);
    await blocked.close();
    pass(
      "When session storage is disabled, validated same-window referrer and native history still return to the gallery with filters and scroll intact",
    );
    const anchors = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      reducedMotion: "reduce",
    });
    const anchored = await anchors.newPage();
    watch(anchored);
    const sourceGallery = base + "benchmarks.html?category=games&q=balrog";
    for (const method of ["in-page", "browser"]) {
      await anchored.goto(sourceGallery);
      await anchored.locator(".benchmark-card").waitFor();
      await anchored.locator(".benchmark-card").scrollIntoViewIfNeeded();
      const y = await anchored.evaluate(() => scrollY);
      await anchored.locator(".benchmark-card").click();
      await ready(anchored);
      const length = await anchored.evaluate(() => history.length);
      await anchored
        .getByRole("link", { name: "Read the original sources", exact: true })
        .click();
      assert.equal(new URL(anchored.url()).hash, "#benchmark-sources");
      assert.equal(
        await anchored.locator("#benchmark-sources").getAttribute("open"),
        "",
      );
      assert.equal(
        await anchored.evaluate(() => history.length),
        length,
        "Section anchors must replace, not add detail entries",
      );
      if (method === "in-page") await anchored.locator(".back-link").click();
      else await anchored.goBack();
      await returned(anchored, sourceGallery, y, "games", 1);
      await anchored.goForward();
      await ready(anchored);
      assert.equal(new URL(anchored.url()).hash, "#benchmark-sources");
      assert.equal(
        await anchored.locator("#benchmark-sources").getAttribute("open"),
        "",
      );
      await anchored.reload();
      await ready(anchored);
      await anchored.locator(".back-link").click();
      await returned(anchored, sourceGallery, y, "games", 1);
    }
    await anchored.goto(
      base + "results.html?benchmark=balrog#benchmark-sources",
    );
    await ready(anchored);
    assert.equal(
      await anchored.locator("#benchmark-sources").getAttribute("open"),
      "",
    );
    assert.equal(
      await anchored.locator(".back-link").getAttribute("href"),
      "benchmarks.html#gallery",
    );
    await anchors.close();
    pass(
      "Source-anchor jumps add no history entries; both Back controls, Forward and reload preserve the source section and originating filtered gallery; direct source hashes still open",
    );
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.externalRequests, []);
    report.passed = true;
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
    fs.writeFileSync(
      path.join(
        out,
        process.env.LAB_GALLERY_BASE
          ? "gallery-navigation-live-validation.json"
          : "gallery-navigation-validation.json",
      ),
      JSON.stringify(report, null, 2),
    );
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
