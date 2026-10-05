"use strict";
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const root = path.resolve(__dirname, "../..");
const commit = process.env.LAB_ATLAS_COMMIT;
assert(
  /^[a-f0-9]{40}$/.test(commit || ""),
  "Set LAB_ATLAS_COMMIT to the verified Pages build commit",
);
const base = process.env.LAB_ATLAS_SITE || "https://pazneria.github.io/lab/";
assert.equal(new URL(base).protocol, "https:");
const files = [
  "infrastructure/index.html",
  "infrastructure/sources.html",
  "infrastructure/assets/atlas.css",
  "infrastructure/assets/atlas.js",
  "infrastructure/assets/atlas-data.js",
  "infrastructure/assets/world.svg",
  "infrastructure/data/atlas.json",
  "lab-space/index.html",
  "index.html",
  "benchmarks.html",
];
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const report = {
  checkedAt: new Date().toISOString(),
  commit,
  base,
  files: [],
  routes: [],
  status: "running",
};
(async () => {
  for (const file of files) {
    const url = new URL(file, base);
    url.searchParams.set("atlas-release", commit);
    const response = await fetch(url, {
      signal: AbortSignal.timeout(20000),
      headers: { "Cache-Control": "no-cache" },
    });
    assert.equal(response.status, 200, file);
    const served = Buffer.from(await response.arrayBuffer());
    const expected = execFileSync("git", ["show", `${commit}:${file}`], {
      cwd: root,
      maxBuffer: 8 * 1024 * 1024,
    });
    assert.equal(
      hash(served),
      hash(expected),
      `${file} differs from ${commit}`,
    );
    report.files.push({
      file,
      status: response.status,
      bytes: served.length,
      sha256: hash(served),
    });
    if (file === "infrastructure/data/atlas.json") {
      const data = JSON.parse(served.toString("utf8"));
      assert.equal(data.sites.length, 25);
      assert.equal(data.products.length, 14);
      assert.equal(data.relationships.length, 28);
      assert.equal(
        data.sources.find((s) => s.id === "intel-fab52").url,
        "https://www.intel.com/content/www/us/en/newsroom/press-hub/press-kit/client-computing/press-kit-intel-technology-tour-2025.html",
      );
      assert(!served.toString("utf8").includes("&amp;"));
      report.datasetCounts = data.metadata.counts;
    }
    if (file === "lab-space/index.html")
      assert(
        served
          .toString("utf8")
          .includes('id="infrastructure-link" href="/lab/infrastructure/"'),
      );
  }
  for (const route of [
    "infrastructure/",
    "lab-space/",
    "",
    "benchmarks.html",
  ]) {
    const response = await fetch(new URL(route, base), {
      signal: AbortSignal.timeout(20000),
    });
    assert.equal(response.status, 200, route);
    report.routes.push({
      route,
      status: response.status,
      finalUrl: response.url,
    });
  }
  report.status = "passed";
  console.log(JSON.stringify(report, null, 2));
})()
  .catch((error) => {
    report.status = "failed";
    report.error = error.message;
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    const out = path.join(root, "evidence/infrastructure");
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(
      path.join(out, "live-publication.json"),
      JSON.stringify(report, null, 2) + "\n",
    );
  });
