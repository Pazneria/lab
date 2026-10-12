"use strict";
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const expected = require("../tests/benchmark-ci-toolchain-2026-10-12.json");
assert.ok(process.env.LAB_TOOLS_ROOT, "The cloud-only tooling root is required");
const lock = JSON.parse(
  fs.readFileSync(path.join(process.env.LAB_TOOLS_ROOT, "package-lock.json"), "utf8"),
);
for (const entry of expected.packages) {
  const installed = lock.packages["node_modules/" + entry.name];
  assert.ok(installed, entry.name + " package is missing");
  assert.equal(installed.version, entry.version, entry.name + " exact version");
  assert.equal(installed.integrity, entry.integrity, entry.name + " package integrity");
  const url = new URL(installed.resolved);
  assert.equal(url.origin, expected.registry);
  assert.equal(url.username, "");
  assert.equal(url.password, "");
}
console.log(JSON.stringify({ pinnedTestPackages: expected.packages.length, passed: true }));
