"use strict";
const { execFileSync } = require("node:child_process");
const assert = require("node:assert/strict");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const baseline = "818a45b6116246117baa189ab31641b3af70a273";
const allowed = new Set([
  ".gitattributes",
  ".github/workflows/benchmark-refresh-2026-10-12.yml",
  "README.md", "index.html", "benchmarks.html",
  "assets/gallery.js", "assets/coverage-graphs.js", "assets/gallery-data.js",
  "data/benchmark-refresh-2026-10-19/source-packet.json",
  "data/benchmark-refresh-2026-10-19/evidence-manifest.json",
  "data/gallery-refresh-projection-2026-10-19.json",
  "data/gallery-metadata-2026-10-19.json",
  "docs/BENCHMARK-REFRESH-2026-10-19.md",
  "evidence/gallery-data-validation.json",
  "scripts/build-gallery-refresh-2026-10-19.cjs",
  "scripts/build-gallery.cjs",
  "scripts/verify-benchmark-refresh-boundary.cjs",
  "tests/verify-benchmark-2026-10-19.cjs",
  "tests/verify-gemini-argon.cjs",
  "tests/verify-coverage.cjs",
  "tests/verify-gallery-navigation.cjs",
  "tests/verify-gallery-return.cjs",
]);
const changed = execFileSync("git", ["diff", "--name-only", baseline, "HEAD"], { cwd: root, encoding: "utf8" }).trim().split("\n").filter(Boolean);
for (const file of changed) assert.ok(allowed.has(file), "Outside October 19 benchmark refresh: " + file);
assert.ok(changed.includes("data/benchmark-refresh-2026-10-19/source-packet.json"));
assert.ok(changed.includes("assets/gallery-data.js"));
console.log(JSON.stringify({ passed: true, baseline, changed, protectedRootsUnchanged: true }));
