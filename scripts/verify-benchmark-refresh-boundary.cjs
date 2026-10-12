"use strict";
// Cloud-only comparison to the frozen source revision; no generated writes.
const { execFileSync } = require("node:child_process"), assert = require("node:assert/strict"), path = require("node:path");
const root = path.resolve(__dirname, ".."), baseline = "ba9b01a8c521b261e4ff0c8b8189c24c1f45737f";
const allowed = new Set([
  ".gitattributes", ".github/workflows/benchmark-refresh-2026-10-12.yml",
  "README.md", "docs/BENCHMARK-REFRESH-2026-10-12.md", "index.html", "benchmarks.html", "assets/gallery.js", "assets/coverage-graphs.js",
  "scripts/build-gallery.cjs", "scripts/build-gallery-refresh-2026-10-12.cjs", "scripts/summarize-benchmark-ci.cjs", "scripts/verify-benchmark-ci-toolchain.cjs", "scripts/verify-benchmark-refresh-boundary.cjs",
  "tests/benchmark-ci-toolchain-2026-10-12.json", "tests/verify-benchmark-refresh.cjs", "tests/verify-benchmark-refresh-ui.cjs", "tests/verify-coverage.cjs", "tests/verify-gallery-navigation.cjs", "tests/verify-gallery-return.cjs",
  "assets/gallery-data.js", "data/gallery-refresh-projection-2026-10-12.json", "data/gallery-metadata-2026-10-12.json", "evidence/gallery-data-validation.json",
]);
const changed = execFileSync("git", ["diff", "--name-only", baseline, "HEAD"], { cwd: root, encoding: "utf8" }).trim().split("\n").filter(Boolean);
for (const file of changed) assert.ok(allowed.has(file), "Outside bounded benchmark refresh: " + file);
console.log(JSON.stringify({ passed: true, baseline, changed, sourceAndProtectedRootsUnchanged: true }));
