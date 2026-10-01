// A local Pages-shaped server checks the retained interfaces and rejects
// accidentally pointing either legacy validator at the new gallery/detail UI.
const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http");
const { execFile, execFileSync } = require("node:child_process"),
  { promisify } = require("node:util");
const run = promisify(execFile),
  root = path.resolve(__dirname, ".."),
  out = path.join(root, "evidence");
const git = (...args) =>
  execFileSync(
    "git",
    ["-c", "safe.directory=" + root.replace(/\\/g, "/"), ...args],
    { cwd: root, maxBuffer: 4 * 1024 * 1024 },
  );
const report = {
  checkedAt: new Date().toISOString(),
  commit: git("rev-parse", "HEAD").toString().trim(),
  cases: [],
  passed: false,
};
const cache = new Map();
const server = http.createServer((req, res) => {
  try {
    const rel =
      decodeURIComponent(new URL(req.url, "http://localhost").pathname).replace(
        /^\/lab\//,
        "",
      ) || "index.html";
    if (
      !/^(?:index\.html|benchmarks\.html|catalog\.html|results\.html|results-technical\.html|(?:assets|data)\/[^.][^\\]*)$/.test(
        rel,
      ) ||
      rel.split("/").includes("..")
    )
      throw Error();
    if (!cache.has(rel)) cache.set(rel, git("show", "HEAD:" + rel));
    res.setHeader(
      "Content-Type",
      {
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".svg": "image/svg+xml",
      }[path.extname(rel)] || "text/plain",
    );
    res.end(cache.get(rel));
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
async function main() {
  fs.mkdirSync(out, { recursive: true });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = "http://127.0.0.1:" + server.address().port + "/lab/";
  try {
    for (const c of [
      {
        script: "verify-deployment.cjs",
        page: "index.html",
        expected: false,
        marker: "Expected legacy catalog interface",
        pageKey: "LAB_CATALOG_DEPLOYMENT_PAGE",
      },
      {
        script: "verify-results-deployment.cjs",
        page: "results.html",
        expected: false,
        marker: "Expected legacy results explorer interface",
        pageKey: "LAB_RESULTS_DEPLOYMENT_PAGE",
      },
      {
        script: "verify-deployment.cjs",
        page: "catalog.html",
        expected: true,
        pageKey: "LAB_CATALOG_DEPLOYMENT_PAGE",
      },
      {
        script: "verify-results-deployment.cjs",
        page: "results-technical.html",
        expected: true,
        pageKey: "LAB_RESULTS_DEPLOYMENT_PAGE",
      },
    ]) {
      let code = 0,
        stdout = "",
        stderr = "";
      try {
        ({ stdout, stderr } = await run(
          process.execPath,
          [path.join(__dirname, c.script)],
          {
            cwd: root,
            env: {
              ...process.env,
              LAB_CATALOG_LIVE_BASE: base,
              LAB_RESULTS_LIVE_BASE: base,
              [c.pageKey]: c.page,
            },
            timeout: 120000,
            maxBuffer: 1024 * 1024,
          },
        ));
      } catch (error) {
        code = error.code;
        stdout = error.stdout || "";
        stderr = error.stderr || "";
      }
      if (c.expected)
        assert.equal(code, 0, c.script + " valid interface failed: " + stderr);
      else {
        assert.equal(code, 1, c.script + " must reject the wrong interface");
        assert.ok(
          stderr.includes(c.marker),
          "Wrong-interface failure must be explicit and immediate",
        );
      }
      report.cases.push({
        script: c.script,
        page: c.page,
        expectedToPass: c.expected,
        exitCode: code,
        explicitInterfaceRejection: !c.expected && stderr.includes(c.marker),
        checks: stdout.split(/\r?\n/).filter((s) => s.startsWith("PASS ")),
      });
      console.log(
        "PASS " +
          c.script +
          " " +
          (c.expected ? "validates " : "rejects ") +
          c.page,
      );
    }
    report.passed = true;
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.writeFileSync(
      path.join(out, "deployment-routing-validation.json"),
      JSON.stringify(report, null, 2),
    );
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
