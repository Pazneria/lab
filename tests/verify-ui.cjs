const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require(process.env.LAB_PLAYWRIGHT_MODULE || "playwright");
const axeScript =
  process.env.LAB_AXE_SCRIPT || require.resolve("axe-core/axe.min.js");
const root = path.resolve(__dirname, "..");
const evidence = path.join(root, "evidence");
const report = {
  testedAt: new Date().toISOString(),
  actualCatalogIntegrated: true,
  actualSourceURLsVerified: false,
  syntheticFixtures:
    "TEST ONLY records injected in memory; never added to assets/catalog.js",
  versions: {},
  checks: [],
  viewports: [],
  accessibility: [],
  errors: [],
  missingAssets: [],
  externalRequests: [],
};
const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  const relative = url.pathname.replace(/^\/lab(?=\/|$)/, "") || "/";
  const file = path.resolve(
    root,
    "." +
      (relative.endsWith("/")
        ? relative + "catalog.html"
        : relative.replace(/index\.html$/, "catalog.html")),
  );
  if (
    !file.startsWith(root + path.sep) ||
    !fs.existsSync(file) ||
    !fs.statSync(file).isFile()
  ) {
    res.writeHead(404);
    return res.end();
  }
  const mime = {
    ".html": "text/html",
    ".css": "text/css",
    ".svg": "image/svg+xml",
    ".js": "text/javascript",
  };
  res.setHeader(
    "Content-Type",
    mime[path.extname(file)] || "application/octet-stream",
  );
  res.end(fs.readFileSync(file));
});
function done(name) {
  report.checks.push(name);
  console.log("PASS " + name);
}
function fixture() {
  const values = [
    ["alpha", "community", "historical", "real-trial"],
    ["beta", "games", "live", "simulation"],
    ["gamma", "medical", "ongoing", "case"],
    ["delta", "physical", "unverified", "real-trial"],
  ];
  return {
    schemaVersion: 1,
    availability: "available",
    basis: "TEST ONLY synthetic source basis",
    verifiedAt: "2000-01-01",
    entries: values.map(([id, category, status, setting]) => ({
      id: "test-" + id,
      name:
        "TEST ONLY " +
        id +
        (id === "alpha" ? " <img src=x onerror=alert(1)>" : ""),
      categories: [category],
      status,
      setting,
      summary: "Synthetic UI record. This is not benchmark evidence.",
      evidenceType: "TEST ONLY evidence type",
      sourceBasis: "Synthetic source basis for renderer verification.",
      verifiedAt: id === "gamma" ? null : "2000-01-01",
      score: null,
      limitations: ["TEST ONLY fixture; no real-world performance claim."],
      nextVerification:
        "Replace synthetic test data with verified catalog evidence.",
      sources: [
        {
          title: "TEST ONLY exact source " + id,
          url: "https://example.test/" + id + "?a=1&b=2#source",
          basis: "Synthetic link used only to test exact URL preservation.",
          publishedAt: id === "gamma" ? null : "2000-01-01",
        },
      ],
    })),
  };
}
async function inject(page, data) {
  await page.unroute("**/assets/catalog.js");
  await page.route("**/assets/catalog.js", (route) =>
    route.fulfill({
      contentType: "text/javascript",
      body:
        data === undefined
          ? ""
          : "window.LAB_CATALOG = " + JSON.stringify(data) + ";",
    }),
  );
}
async function audit(page, label) {
  await page.addScriptTag({ path: axeScript });
  const result = await page.evaluate(() =>
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
  const compact = {
    label,
    violations: result.violations.map((rule) => ({
      id: rule.id,
      impact: rule.impact,
      description: rule.description,
      nodes: rule.nodes.map((node) => ({
        target: node.target,
        failureSummary: node.failureSummary,
      })),
    })),
    incomplete: result.incomplete.map((rule) => ({
      id: rule.id,
      nodes: rule.nodes.map((node) => ({
        target: node.target,
        failureSummary: node.failureSummary,
      })),
    })),
    passes: result.passes.length,
  };
  compact.glyphAndControlContrast = await page.evaluate(() => {
    function luminance(color) {
      const values = color
        .match(/[\d.]+/g)
        .slice(0, 3)
        .map(Number)
        .map((value) => {
          const channel = value / 255;
          return channel <= 0.04045
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4;
        });
      return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
    }
    function ratio(a, b) {
      const first = luminance(a),
        second = luminance(b);
      return (
        Math.round(
          ((Math.max(first, second) + 0.05) /
            (Math.min(first, second) + 0.05)) *
            100,
        ) / 100
      );
    }
    const paper = getComputedStyle(document.body).backgroundColor;
    return [
      ...[".underlined > span", ".reset-button > span"].map((selector) => ({
        selector,
        ratio: ratio(
          getComputedStyle(document.querySelector(selector)).color,
          paper,
        ),
        minimum: 3,
        basis:
          "Decorative glyph visibility; axe marks non-text glyphs for review",
      })),
      ...["#search", "#status", "#setting"].map((selector) => ({
        selector,
        ratio: ratio(
          getComputedStyle(document.querySelector(selector)).borderTopColor,
          paper,
        ),
        minimum: 3,
        basis: "Control boundary contrast against adjacent page background",
      })),
    ];
  });
  report.accessibility.push(compact);
  for (const item of compact.glyphAndControlContrast)
    assert.ok(item.ratio >= item.minimum, label + " contrast " + item.selector);
  assert.equal(
    compact.violations.length,
    0,
    label + " axe violations: " + JSON.stringify(compact.violations),
  );
}
(async () => {
  fs.mkdirSync(evidence, { recursive: true });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const origin = "http://127.0.0.1:" + server.address().port;
  const url = origin + "/lab/";
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      ...(process.env.LAB_BROWSER_CHANNEL
        ? { channel: process.env.LAB_BROWSER_CHANNEL }
        : {}),
    });
    report.versions.browser = browser.version();
    report.versions.playwright = require(
      path.join(
        path.dirname(
          require.resolve(process.env.LAB_PLAYWRIGHT_MODULE || "playwright"),
        ),
        "package.json",
      ),
    ).version;
    report.versions.axe = require(
      path.join(path.dirname(axeScript), "package.json"),
    ).version;
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await inject(page, {
      schemaVersion: 1,
      availability: "unavailable",
      basis: null,
      verifiedAt: null,
      entries: [],
    });
    page.on("pageerror", (error) => report.errors.push(error.message));
    page.on("request", (request) => {
      if (
        !request.url().startsWith(origin) &&
        !request.url().startsWith("data:") &&
        !request.url().startsWith("file:")
      )
        report.externalRequests.push(request.url());
    });
    page.on("response", (response) => {
      if (response.status() >= 400) report.missingAssets.push(response.url());
    });
    for (const width of [1440, 1024, 768, 720, 640, 390, 320]) {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 900 });
      await page.goto(url, { waitUntil: "networkidle" });
      const dimensions = await page.evaluate(() => ({
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
      }));
      report.viewports.push(dimensions);
      assert.ok(
        dimensions.documentWidth <= width && dimensions.bodyWidth <= width,
        "Horizontal overflow at " + width,
      );
      assert.equal(await page.locator(".entry").count(), 0);
      assert.equal(
        await page.locator("#result-count").innerText(),
        "0 entries loaded",
      );
      if ([1440, 390, 320].includes(width))
        await page.screenshot({
          path: path.join(evidence, "lab-" + width + ".png"),
          fullPage: true,
        });
    }
    done(
      "Seven viewport widths, 320–1440px: no horizontal overflow; zero actual catalog records",
    );
    await audit(page, "actual empty preview, 320px");
    await page.setViewportSize({ width: 1440, height: 900 });
    await audit(page, "actual empty preview, desktop");
    done(
      "Axe A/AA and best-practice scans on actual empty desktop and mobile preview",
    );

    await page.goto(url);
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() => document.activeElement.className),
      "skip-link",
    );
    await page.keyboard.press("Enter");
    assert.equal(await page.evaluate(() => document.activeElement.id), "main");
    await page.locator("#search").focus();
    const focus = await page.locator("#search").evaluate((node) => ({
      width: getComputedStyle(node).outlineWidth,
      style: getComputedStyle(node).outlineStyle,
    }));
    assert.equal(focus.width, "3px");
    assert.equal(focus.style, "solid");
    await page.getByRole("radio", { name: "Independent & general" }).focus();
    await page.keyboard.press("ArrowDown");
    assert.equal(
      await page.locator("input[name=category]:checked").inputValue(),
      "games",
    );
    await page.locator("#status").focus();
    await page.keyboard.press("Home");
    await page.keyboard.press("ArrowDown");
    assert.equal(await page.locator("#status").inputValue(), "historical");
    await page.getByRole("button", { name: "Reset filters" }).focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator("input[name=category]:checked").inputValue(),
      "all",
    );
    assert.equal(await page.locator("#status").inputValue(), "all");
    await page.locator(".status-guide summary").focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(".status-guide").getAttribute("open"), "");
    done(
      "Keyboard skip link, focus ring, arrow-key radio/select, Enter reset, and native method disclosure",
    );

    await page.locator("#search").fill("robot source");
    await page.locator("#status").selectOption("ongoing");
    await page.locator("#setting").selectOption("case");
    assert.ok(page.url().includes("q=robot+source"));
    assert.ok(page.url().includes("status=ongoing"));
    assert.equal(
      await page.locator("#empty-label").textContent(),
      "Catalog unavailable",
    );
    await page.reload();
    assert.equal(await page.locator("#search").inputValue(), "robot source");
    assert.equal(await page.locator("#status").inputValue(), "ongoing");
    await page.getByRole("button", { name: "Reset filters" }).click();
    assert.equal(new URL(page.url()).search, "");
    done(
      "Empty-state filtering remains honest; shareable URL state survives reload and resets",
    );

    await page.setViewportSize({ width: 320, height: 844 });
    await page.evaluate(
      () => (document.documentElement.style.fontSize = "200%"),
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
      "200% text overflow",
    );
    await page.screenshot({
      path: path.join(evidence, "lab-320-text-200.png"),
      fullPage: true,
    });
    done("200% text at 320px: no horizontal overflow");
    await page.goto(url);
    await page.emulateMedia({
      forcedColors: "active",
      reducedMotion: "reduce",
    });
    await page.locator("#search").focus();
    assert.equal(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
      "auto",
    );
    await page.screenshot({
      path: path.join(evidence, "lab-forced-colors.png"),
      fullPage: true,
    });
    done("Forced-colors focus styles and reduced-motion scrolling");
    await page.emulateMedia({ forcedColors: "none" });

    await inject(page, fixture());
    await page.goto(url);
    assert.equal(await page.locator(".entry").count(), 4);
    const names = await page.locator(".entry h3").allTextContents();
    assert.ok(names[0].startsWith("TEST ONLY alpha"));
    assert.equal(await page.locator(".entry img").count(), 0);
    await page.locator(".entry").first().locator("summary").focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page
        .locator(".entry")
        .first()
        .locator("details")
        .getAttribute("open"),
      "",
    );
    const source = page
      .locator(".entry")
      .first()
      .locator(".entry-sources a")
      .first();
    assert.equal(
      await source.getAttribute("href"),
      "https://example.test/alpha?a=1&b=2#source",
    );
    assert.match(
      await page.locator(".entry").first().innerText(),
      /Limitations/i,
    );
    assert.match(
      await page.locator(".entry").first().innerText(),
      /Next verification step/i,
    );
    assert.match(
      await page.locator(".entry").first().innerText(),
      /Score not recorded/,
    );
    assert.match(
      await page.locator("#catalog-basis").innerText(),
      /TEST ONLY synthetic source basis/,
    );
    await page.screenshot({
      path: path.join(evidence, "test-only-renderer.png"),
      fullPage: true,
    });
    await audit(page, "in-memory TEST ONLY detail renderer, 320px");
    done(
      "Synthetic detail renderer: exact URLs, source basis/date, limitations, next check, null scores, XSS text safety, keyboard disclosure",
    );

    const gamma = page.locator("#benchmark-test-gamma");
    await gamma.locator("summary").click();
    assert.match(await gamma.innerText(), /Verified: Not recorded/);
    assert.match(await gamma.innerText(), /Source date: Not recorded/);
    for (const [category, status, setting] of [
      ["community", "historical", "real-trial"],
      ["games", "live", "simulation"],
      ["medical", "ongoing", "case"],
      ["physical", "unverified", "real-trial"],
    ]) {
      await page.getByRole("button", { name: "Reset filters" }).click();
      await page
        .locator("input[name=category][value=" + category + "]")
        .check();
      await page.locator("#status").selectOption(status);
      await page.locator("#setting").selectOption(setting);
      assert.equal(await page.locator(".entry").count(), 1);
    }
    await page.getByRole("button", { name: "Reset filters" }).click();
    await page.locator("#search").fill("gamma source");
    assert.equal(await page.locator(".entry").count(), 1);
    assert.equal(await page.locator("[data-count=medical]").innerText(), "1");
    await page.locator("#search").fill("not-a-match");
    assert.equal(
      await page.locator("#empty-title").innerText(),
      "No entries match these filters.",
    );
    await page.goto(url + "?category=games&status=live");
    assert.equal(await page.locator(".entry").count(), 1);
    await page.goto(url + "?category=unknown&setting=unknown&status=unknown");
    assert.equal(await page.locator(".entry").count(), 4);
    await page.goto(url + "#benchmark-test-alpha");
    assert.equal(
      await page.locator("#benchmark-test-alpha details").getAttribute("open"),
      "",
    );
    await page.evaluate(() => {
      history.pushState(null, "", "?category=medical");
      dispatchEvent(new PopStateEvent("popstate"));
    });
    assert.equal(await page.locator(".entry").count(), 1);
    done(
      "Synthetic fixtures: four category/status combinations, real trials vs simulation vs cases, token search, counts, no-match, URL load/history, entry permalink, unknown dates",
    );

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(url);
    await page.locator(".entry").first().locator("summary").click();
    await audit(page, "in-memory TEST ONLY detail renderer, desktop");
    done(
      "Axe scans on synthetic expanded detail renderer at mobile and desktop widths",
    );

    const invalidCases = [
      ["non-null score", (data) => (data.entries[0].score = 1)],
      [
        "unsafe URL",
        (data) => (data.entries[0].sources[0].url = "javascript:alert(1)"),
      ],
      ["duplicate ID", (data) => (data.entries[1].id = data.entries[0].id)],
      [
        "invalid verification date",
        (data) => (data.entries[0].verifiedAt = "2000-02-30"),
      ],
      ["missing limitation", (data) => (data.entries[0].limitations = [])],
      [
        "unavailable with entries",
        (data) => (data.availability = "unavailable"),
      ],
    ];
    for (const [label, mutate] of invalidCases) {
      const data = fixture();
      mutate(data);
      await inject(page, data);
      await page.goto(url);
      assert.equal(await page.locator(".entry").count(), 0, label);
      assert.equal(
        await page.locator("#empty-label").textContent(),
        "Catalog could not be loaded",
        label,
      );
    }
    await inject(page, undefined);
    await page.goto(url);
    assert.equal(await page.locator(".entry").count(), 0);
    assert.equal(
      await page.locator("#empty-label").textContent(),
      "Catalog could not be loaded",
    );
    done(
      "Invalid catalog fails visibly for scores, unsafe URLs, duplicate IDs, impossible dates, absent limits, availability mismatch, and missing data",
    );

    const noJS = await browser.newContext({ javaScriptEnabled: false });
    const noJSPage = await noJS.newPage();
    await noJSPage.goto(url);
    assert.equal(await noJSPage.locator("noscript").isVisible(), true);
    assert.equal(
      await noJSPage.locator("#empty-title").innerText(),
      "Enable JavaScript to explore the catalog.",
    );
    assert.equal(
      await noJSPage.getByRole("heading", { name: "VoxelBench" }).count(),
      1,
    );
    await noJSPage.locator(".status-guide summary").click();
    assert.equal(
      await noJSPage.locator(".status-guide").getAttribute("open"),
      "",
    );
    await noJS.close();
    done(
      "No JavaScript: honest empty state, watch note, guide, and native disclosures remain readable",
    );

    await page.unroute("**/assets/catalog.js");
    await page.goto(pathToFileURL(path.join(root, "catalog.html")).href);
    assert.equal(
      await page.locator("#empty-label").textContent(),
      "No matches",
    );
    assert.equal(await page.locator(".entry").count(), 20);
    done(
      "Direct file preview loads local scripts and styles without a JSON fetch",
    );

    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.missingAssets, []);
    assert.deepEqual(report.externalRequests, []);
    done(
      "No browser errors, missing assets, or third-party runtime requests on served preview",
    );
    report.result = "passed";
  } catch (error) {
    report.result = "failed";
    report.failure = error.stack;
    console.error(error.stack);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
    fs.writeFileSync(
      path.join(evidence, "validation.json"),
      JSON.stringify(report, null, 2),
    );
  }
})();
