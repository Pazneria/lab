"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const files = [
  "gallery-data-validation.json",
  "benchmark-refresh-validation.json",
  "coverage-ui-validation.json",
  "ranking-validation.json",
  "gallery-navigation-validation.json",
  "gallery-return-validation.json",
  "gallery-selection-validation.json",
  "real-catalog-validation.json",
  "validation.json",
  "results-ui-validation.json",
  "static-links.json",
];
const summary = [];
for (const file of files) {
  const target = path.join(__dirname, "..", "evidence", file);
  if (!fs.existsSync(target)) continue;
  const bytes = fs.readFileSync(target);
  try {
    const data = JSON.parse(bytes.toString("utf8"));
    summary.push({
      file,
      passed: data.passed === true ? true : null,
      checks: Array.isArray(data.checks) ? data.checks.length : null,
      errors: Array.isArray(data.errors) ? data.errors.length : null,
      sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
    });
  } catch {
    summary.push({ file, invalidJSON: true });
  }
}
const report = {
  revision: process.env.GITHUB_SHA || null,
  runner: "standard GitHub-hosted Ubuntu; public repository",
  reports: summary,
  limits: "No artifacts or caches are uploaded. Screenshots remain ephemeral. Passing checks are not a security certification.",
};
console.log(JSON.stringify(report, null, 2));
if (process.env.GITHUB_STEP_SUMMARY)
  fs.appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    "\n```json\n" + JSON.stringify(report, null, 2) + "\n```\n",
  );
