"use strict";
const { execFileSync } = require("node:child_process");
const assert = require("node:assert/strict");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const baseline = "05d46cdd257dd4c0ee0dfa64aa7fa40bab26b7ef";
const allowed = new Set([
  ".github/workflows/benchmark-refresh-2026-10-12.yml",
  "assets/gallery.js",
  "scripts/verify-benchmark-refresh-boundary.cjs",
  "tests/verify-coverage.cjs"
]);
const changed = execFileSync("git", ["-c", "safe.directory=" + root, "diff", "--name-only", baseline, "HEAD"], { cwd: root, encoding: "utf8" }).trim().split("\n").filter(Boolean);
for (const file of changed) assert.ok(allowed.has(file), "Outside family representative fix: " + file);
assert.ok(changed.includes("tests/verify-coverage.cjs"));
assert.ok(changed.includes("assets/gallery.js"));
console.log(JSON.stringify({ passed: true, baseline, changed, protectedRootsUnchanged: true }));
