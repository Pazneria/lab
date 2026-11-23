"use strict";
const { execFileSync } = require("node:child_process");
const assert = require("node:assert/strict");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const baseline = "c6fb8bf3f4a0c78864f35dbb47f62564a4e6b3f7";
const allowed = new Set([
  ".github/workflows/benchmark-refresh-2026-10-12.yml",
  ".gitattributes",
  "assets/coverage-graphs.js",
  "assets/gallery.js",
  "assets/gallery-data.js",
  "data/benchmark-refresh-2026-11-16/source-packet.json",
  "data/benchmark-refresh-2026-11-16/evidence-manifest.json",
  "data/gallery-refresh-projection-2026-11-16.json",
  "data/gallery-metadata-2026-11-16.json",
  "data/benchmark-refresh-2026-11-23/source-packet.json",
  "data/benchmark-refresh-2026-11-23/evidence-manifest.json",
  "data/gallery-refresh-projection-2026-11-23.json",
  "data/gallery-metadata-2026-11-23.json",
  "docs/benchmark-refresh-2026-11-23.md",
  "docs/benchmark-refresh-2026-11-16.md",
  "evidence/gallery-data-validation.json",
  "scripts/build-gallery.cjs",
  "scripts/build-gallery-refresh-2026-11-16.cjs",
  "scripts/build-gallery-refresh-2026-11-23.cjs",
  "scripts/verify-benchmark-refresh-boundary.cjs",
  "tests/verify-coverage.cjs",
  "tests/verify-gemini-argon.cjs",
  "tests/verify-followup-2026-11-02.cjs",
  "tests/verify-benchmark-2026-10-26.cjs",
  "tests/verify-gallery-navigation.cjs",
  "tests/verify-gallery-return.cjs",
  "tests/verify-benchmark-2026-11-16.cjs",
  "tests/verify-benchmark-2026-11-23.cjs"
]);
const changed = execFileSync("git", ["-c", "safe.directory=" + root, "diff", "--name-only", baseline, "HEAD"], { cwd: root, encoding: "utf8" }).trim().split("\n").filter(Boolean);
for (const file of changed) assert.ok(allowed.has(file), "Outside benchmark refresh scope: " + file);
assert.ok(changed.includes("tests/verify-coverage.cjs"));
assert.ok(changed.includes("assets/gallery.js"));
assert.ok(changed.includes("data/benchmark-refresh-2026-11-23/source-packet.json"));
console.log(JSON.stringify({ passed: true, baseline, changed, protectedRootsUnchanged: true }));
