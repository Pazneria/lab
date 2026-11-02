"use strict";
const { execFileSync } = require("node:child_process");
const assert = require("node:assert/strict");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const baseline = "64c60235b7c9c4f6d3d9d7308be42600623e5c10";
const allowed = new Set([
  ".gitattributes",
  ".github/workflows/benchmark-refresh-2026-10-12.yml",
  "README.md",
  "assets/coverage-graphs.js",
  "assets/gallery-data.js",
  "assets/gallery.js",
  "index.html",
  "benchmarks.html",
  "data/benchmark-refresh-2026-11-02/source-packet.json",
  "data/benchmark-refresh-2026-11-02/evidence-manifest.json",
  "data/gallery-refresh-projection-2026-11-02.json",
  "data/gallery-metadata-2026-11-02.json",
  "docs/BENCHMARK-REFRESH-2026-11-02.md",
  "evidence/gallery-data-validation.json",
  "scripts/build-gallery-refresh-2026-11-02.cjs",
  "scripts/build-gallery.cjs",
  "scripts/verify-benchmark-refresh-boundary.cjs",
  "tests/verify-benchmark-2026-11-02.cjs",
  "tests/verify-benchmark-2026-10-26.cjs",
  "tests/verify-gemini-carbon.cjs",
  "tests/verify-gemini-argon.cjs",
  "tests/verify-coverage.cjs",
  "tests/verify-gallery-navigation.cjs",
  "tests/verify-gallery-return.cjs"
]);
const changed = execFileSync("git", ["-c", "safe.directory=" + root, "diff", "--name-only", baseline, "HEAD"], { cwd: root, encoding: "utf8" }).trim().split("\n").filter(Boolean);
for (const file of changed) assert.ok(allowed.has(file), "Outside Carbon/AA v5 benchmark refresh: " + file);
assert.ok(changed.includes("data/benchmark-refresh-2026-11-02/source-packet.json"));
assert.ok(changed.includes("assets/gallery-data.js"));
console.log(JSON.stringify({ passed: true, baseline, changed, protectedRootsUnchanged: true }));
