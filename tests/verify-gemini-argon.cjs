"use strict";
// Narrow independent contracts for cloud/hosted CI; no evaluations or network.
const fs = require("node:fs"), path = require("node:path"), vm = require("node:vm"), assert = require("node:assert/strict"), crypto = require("node:crypto");
const root = path.resolve(__dirname, ".."), dir = "data/gemini-4-argon-2026-10-15/";
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const source = read(dir + "source-packet.json"), manifest = read(dir + "evidence-manifest.json");
for (const f of manifest.files) {
  const bytes = fs.readFileSync(path.join(root, dir, f.path));
  assert.equal(bytes.length, f.bytes);
  assert.equal(crypto.createHash("sha256").update(bytes).digest("hex"), f.sha256);
}
assert.equal(source.model.api_id, "gemini-4-argon");
assert.equal(source.model.announcement_date, "2026-09-30");
assert.equal(source.model.broad_availability_date, "2026-10-13");
assert.deepEqual(source.model.thinking_levels, ["low", "medium", "high"]);
const expectedGoogle = [68.9, 51.3, 65.4, 19.6, 77.9, 55, 91.9, 57.4, 45.3, 57.6, 88.8, 76, 99.7, 84.2, 39.5, 69.2, 71.6, 91.7, 68];
const expectedAA = [53, 78, 57, 1494, 65, 1576, 1308, 15, 50, 42];
assert.deepEqual(source.google.observations.flatMap((o) => o.metrics.map((m) => m.value)), expectedGoogle);
assert.deepEqual(source.aa.observations.flatMap((o) => o.metrics.map((m) => m.value)), expectedAA);
assert.equal(source.aa.introductory_cost_usd_per_intelligence_index_task, 1.99);
assert.equal(source.aa.approximate_average_output_tokens_per_index_task, 62000);
assert.equal(source.aa.throughput_tokens_per_second, null);
assert.equal(source.aa.long_decode_continuation, true);
const baseline = read("data/gallery-refresh-projection-2026-10-12.json"), built = require("../scripts/build-gallery-gemini-argon-2026-10-15.cjs")();
const projection = read("data/gallery-gemini-argon-projection-2026-10-15.json");
assert.deepEqual(projection, built.projection);
assert.deepEqual(read("data/gallery-metadata-2026-10-15.json"), built.metadata);
assert.deepEqual(projection.cards.map((c) => c.id), ["gemini-4-argon-google-report", "gemini-4-argon-aa-report"]);
assert.equal(built.coverage.cards.length, 54);
assert.equal(built.metadata.counts.all, 88);
assert.equal(built.metadata.counts.default_families, 60);
const targets = ["frontierswe-v2", "terminal-bench-4", "terminal-bench-science-native-agents", "osworld-v2-offline", "automationbench-aa", "aa-briefcase-v1-1", "aa-omniscience"];
assert.deepEqual(built.coverage.model_updates.augmented_card_ids, targets);
assert.equal(projection.cohort_additions.length, 8);
for (const previous of baseline.coverage.cards) {
  const current = built.coverage.cards.find((c) => c.id === previous.id);
  assert.deepEqual(current.variants.slice(0, previous.variants.length), previous.variants, previous.id + " earlier cohorts unchanged");
  if (!targets.includes(previous.id)) assert.deepEqual(current, previous);
  else {
    const originalFields = { ...current, variants: previous.variants };
    if (Object.hasOwn(previous, "source_inputs")) originalFields.source_inputs = previous.source_inputs;
    else delete originalFields.source_inputs;
    assert.deepEqual(originalFields, previous, previous.id + " original card fields preserved");
  }
}
for (const [id, m] of Object.entries(baseline.metadata.cards)) if (!targets.includes(id)) assert.deepEqual(built.metadata.cards[id], m);
for (const key of Object.keys(baseline.coverage).filter((k) => k !== "cards")) assert.deepEqual(built.coverage[key], baseline.coverage[key]);
for (const [provider, expected] of [["google", expectedGoogle], ["aa", expectedAA]]) {
  const card = projection.cards.find((c) => c.id === "gemini-4-argon-" + provider + "-report");
  assert.equal(card.source_input, dir + "source-packet.json");
  assert.deepEqual(card.variants.flatMap((v) => v.metrics.map((m) => v.rows[0].measurements[m.id])), expected);
  card.variants.forEach((v, index) => {
    const r = v.rows[0], original = source[provider].observations[index];
    assert.deepEqual(r.raw, original);
    for (const [key, value] of Object.entries(original)) assert.deepEqual(r[key], value, key + " exact raw field");
    assert.equal(v.source_url, provider === "google" ? source.sources.google_model_card : source.sources.aa_article);
    assert.equal(r.evaluation_date, null);
    assert.equal(v.snapshot_at, null);
    assert.equal(r.model_release_date, "2026-09-30");
    assert.equal(r.broad_availability_date, "2026-10-13");
    assert.equal(r.cost_usd, null);
    assert.equal(r.latency_seconds, null);
    v.metrics.forEach((m) => {
      assert.equal(m.ci_field, undefined);
      assert.equal(m.stderr_field, undefined);
      assert.equal(m.interval_field, undefined);
      assert.equal(m.x_field, undefined, "Introductory cost is not a generic cost scatter axis");
    });
  });
}
const google = projection.cards[0], aa = projection.cards[1];
const value = (card, id) => card.variants.find((v) => v.id.endsWith("-" + id)).rows[0].measurements.score;
assert.equal(value(google, "automationbench-private"), 51.3);
assert.equal(value(aa, "automationbench-aa"), 78);
assert.equal(value(google, "terminal-bench-4"), 57.4);
assert.equal(value(aa, "terminal-bench-4"), 57);
assert.equal(aa.variants[0].rows[0].measurements.index, 53);
const omni = aa.variants.find((v) => v.id.endsWith("-aa-omniscience"));
assert.equal(omni.metrics.find((m) => m.id === "hallucination").direction, "lower_is_better");
assert.equal(omni.metrics.find((m) => m.id === "accuracy").direction, "higher_is_better");
assert.match(google.variants.find((v) => v.id.endsWith("-terminal-bench-science-0-1")).settings.methodology, /six times/);
assert.match(google.variants.find((v) => v.id.endsWith("-osworld-2-offline")).settings.methodology, /maximum of three/);
assert.ok(google.variants.some((v) => v.settings.evidence_role === "vendor_reproduced_external_leaderboard"));
assert.ok(aa.variants.every((v) => v.settings.evidence_role === "independent_evaluator"));
const sandbox = { window: {}, URL };
vm.runInNewContext(fs.readFileSync(path.join(root, "assets/coverage-graphs.js"), "utf8"), sandbox);
assert.equal(sandbox.window.LAB_COVERAGE.valid(baseline.coverage), true);
assert.equal(sandbox.window.LAB_COVERAGE.valid(built.coverage), true);
const bad = structuredClone(built.coverage);
bad.model_updates.card_ids.pop();
assert.equal(sandbox.window.LAB_COVERAGE.valid(bad), false);
const asset = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "assets/gallery-data.js"), "utf8"), asset);
assert.deepEqual(JSON.parse(JSON.stringify(asset.window.LAB_GALLERY.coverage)), require("../scripts/build-gallery-refresh-2026-10-26.cjs")().coverage);
const report = { passed: true, checked_at: source.checked_at, googleMeasurements: 19, aaMeasurements: 10, addedCards: 2, augmentedCards: 7,
  checks: ["Exact source hashes, selected model ID and typed release dates", "Google and AA values/protocols remain separate", "Introductory task cost, missing throughput and missing uncertainty", "All prior cards/cohorts, metadata and original source data preserved", "Current renderer and generated asset agree"] };
fs.mkdirSync(path.join(root, "evidence"), { recursive: true });
fs.writeFileSync(path.join(root, "evidence/gemini-argon-validation.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report));
