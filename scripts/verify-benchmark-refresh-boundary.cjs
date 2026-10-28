"use strict";
const { execFileSync } = require("node:child_process");
const assert = require("node:assert/strict");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const baseline = "b1923705d49f9f9718a1ffb93e6cdc7bcf7a80fd";
const allowed = new Set([
  ".gitattributes",
  "README.md", "index.html", "benchmarks.html",
  ".github/workflows/benchmark-refresh-2026-10-12.yml",
  "assets/gallery.js",
  "assets/coverage-graphs.js",
  "assets/gallery-data.js",
  "data/gemini-4-carbon-2026-10-28/source-packet.json",
  "data/gemini-4-carbon-2026-10-28/evidence-manifest.json",
  "data/gallery-gemini-carbon-projection-2026-10-28.json",
  "data/gallery-metadata-2026-10-28.json",
  "docs/GEMINI-CARBON-AA-V5-2026-10-28.md",
  "evidence/gallery-data-validation.json",
  "scripts/build-gallery-gemini-carbon-2026-10-28.cjs",
  "scripts/build-gallery.cjs",
  "scripts/verify-benchmark-refresh-boundary.cjs",
  "tests/verify-benchmark-2026-10-19.cjs",
  "tests/verify-benchmark-2026-10-26.cjs",
  "tests/verify-gemini-argon.cjs",
  "tests/verify-gemini-carbon.cjs",
  "tests/verify-coverage.cjs",
  "tests/verify-gallery-navigation.cjs",
  "tests/verify-gallery-return.cjs"
]);
const changed = execFileSync("git", ["-c", "safe.directory=" + root, "diff", "--name-only", baseline, "HEAD"], { cwd: root, encoding: "utf8" }).trim().split("\n").filter(Boolean);
for (const file of changed) assert.ok(allowed.has(file), "Outside Carbon/AA v5 benchmark refresh: " + file);
assert.ok(changed.includes("data/gemini-4-carbon-2026-10-28/source-packet.json"));
assert.ok(changed.includes("assets/gallery-data.js"));
console.log(JSON.stringify({ passed: true, baseline, changed, protectedRootsUnchanged: true }));
