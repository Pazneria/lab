"use strict";
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const root = path.resolve(__dirname, "..");
const read = (name) => JSON.parse(fs.readFileSync(path.join(root, name), "utf8"));
const source = "data/benchmark-refresh-2026-10-19/source-packet.json";
const packet = read(source);
const manifest = read("data/benchmark-refresh-2026-10-19/evidence-manifest.json");
const bytes = fs.readFileSync(path.join(root, source));
assert.equal(bytes.length, manifest.files[0].bytes);
assert.equal(crypto.createHash("sha256").update(bytes).digest("hex"), manifest.files[0].sha256);
assert.equal(packet.arena_frontend.snapshot_at, "2026-10-18");
assert.equal(packet.arena_frontend.displayed_total_votes, 790403);
assert.equal(packet.arena_frontend.displayed_models, 147);
assert.equal(packet.arena_frontend.rows.length, 20);
assert.deepEqual(packet.arena_frontend.rows.slice(0, 5).map((r) => [r.model_variant, r.value, r.published_plus_minus, r.votes]), [
  ["Claude Opus 5.5 (Max)", 1848, 17, 2114],
  ["Claude Sonnet 5.5 (xHigh)", 1808, 15, 2619],
  ["GPT-6 Astra (Max)", 1797, 11, 4941],
  ["Claude Fable 5.1 (Max)", 1776, 10, 6086],
  ["GPT-6.1 Sol (Max)", 1768, 15, 2443],
]);
assert.deepEqual(packet.arena_frontend.rows.map((r) => r.rank), Array.from({ length: 20 }, (_, i) => i + 1));
for (const row of packet.arena_frontend.rows) {
  assert.deepEqual(row.published_range, [row.value - row.published_plus_minus, row.value + row.published_plus_minus]);
  assert.equal(row.cost_usd_per_task, null);
  assert.equal(row.latency_seconds, null);
  assert.equal(row.evaluation_date, null);
  assert.equal(row.model_release_date, null);
  assert.equal(row.harness_version, null);
  assert.equal(row.tool_budget, null);
}
const prior = require("../scripts/build-gallery-gemini-argon-2026-10-15.cjs")();
const next = require("../scripts/build-gallery-refresh-2026-10-19.cjs")();
assert.deepEqual(read("data/gallery-refresh-projection-2026-10-19.json"), next.projection);
assert.deepEqual(read("data/gallery-metadata-2026-10-19.json"), next.metadata);
assert.equal(next.coverage.cards.length, prior.coverage.cards.length + 1);
assert.deepEqual(next.coverage.cards.slice(0, -1), prior.coverage.cards);
assert.deepEqual(next.coverage.model_updates, prior.coverage.model_updates);
assert.deepEqual(next.coverage.refresh, prior.coverage.refresh);
assert.deepEqual(next.coverage.familyGroups["webdev-arena-frontend"], [
  "webdev-arena-frontend-2026-10-18", "webdev-arena-frontend-2026-10-08", "webdev-arena-frontend",
]);
const newCard = next.coverage.cards.at(-1);
assert.equal(newCard.id, "webdev-arena-frontend-2026-10-18");
assert.equal(newCard.variants[0].rows.length, 20);
assert.equal(newCard.variants[0].metrics[0].interval_kind, "published_interval");
assert.equal(newCard.variants[0].settings.task_cost_usd, null);
assert.equal(newCard.variants[0].settings.task_time_seconds, null);
assert.equal(newCard.variants[0].complete, false);
assert.equal(newCard.variants[0].rows[0].value, 1848);
assert.equal(newCard.variants[0].rows[7].model_variant, "Gemini 4 Argon (High)");
assert.equal(newCard.variants[0].rows[7].preliminary, true);
assert.equal(newCard.variants[0].rows[13].model_variant, "DeepSeek-V4.1-Flash-20261017 (Max)");
assert.equal(next.coverage.cards.find((c) => c.id === "webdev-arena-frontend-2026-10-08").variants[0].rows[0].value, 1857);
assert.equal(next.metadata.cards["webdev-arena-frontend-2026-10-08"].cohort, "historical");
assert.equal(next.metadata.cards[newCard.id].snapshot_at, "2026-10-18");
assert.equal(next.metadata.cards[newCard.id].evaluations[0].unknown, 20);
assert.deepEqual(next.metadata.counts, { all: 89, plotted: 80, current: 54, historical: 28, source_only: 7, unavailable: 2, default_families: 60 });
assert.equal(next.metadata.cards["design-arena-frontend"].evidence, "source_only");
assert.equal(next.metadata.cards["behavior-challenge-2026"].evidence, "source_only");
assert.equal(next.metadata.cards["bench2drive"].source_review.date, "2026-10-19");
assert.match(next.notes["design-arena-frontend"].read, /separate categories/);
assert.match(next.notes["design2code-v3-484"].read, /screenshot cases/);
assert.match(next.notes["behavior-challenge-2026"].read, /November 4/);
const driving = next.coverage.cards.find((c) => c.id === "bench2drive").variants[0].rows;
assert.deepEqual(driving.filter((r) => ["LEAD", "Simlingo"].includes(r.label)).map((r) => [r.label, r.driving_score, r.success_rate_percent]).sort(), [
  ["LEAD", 95.59, 87.28], ["Simlingo", 86.55, 70.45],
]);

const sandbox = { window: {}, URL };
vm.runInNewContext(fs.readFileSync(path.join(root, "assets/coverage-graphs.js"), "utf8"), sandbox);
assert.equal(sandbox.window.LAB_COVERAGE.valid(next.coverage), true);
const served = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "assets/gallery-data.js"), "utf8"), served);
assert.equal(served.window.LAB_GALLERY.coverage.cards.length, 55);
assert.equal(served.window.LAB_GALLERY.cardMetadata.counts.all, 89);
assert.equal(served.window.LAB_GALLERY.coverage.cards.at(-1).variants[0].rows[0].value, 1848);
assert.equal(served.window.LAB_GALLERY.provenance.presentationMetadata, "data/gallery-metadata-2026-10-19.json");
console.log(JSON.stringify({ passed: true, sourceSHA256: manifest.files[0].sha256, selectedRows: 20, directCards: 89, families: 60, oldSourcePreserved: true }));
