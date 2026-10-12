"use strict";
// Run only in cloud/hosted CI. Independent archive, membership and unit checks.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict"), vm = require("node:vm"), crypto = require("node:crypto");
const root = path.resolve(__dirname, ".."), dir = "data/benchmark-refresh-2026-10-12/";
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const refresh = read("data/gallery-refresh-projection-2026-10-12.json");
const front = read(dir + "frontend.json"), lab = read(dir + "lab-community.json"), medical = read(dir + "medical-robotics.json");
const baseline = read("data/coverage-projection-2026-10-05.json");
const card = (id) => { const c = refresh.cards.find((c) => c.id === id); assert.ok(c, id); return c; };
const source = (id) => { const c = [...lab.cohorts, ...medical.cohorts].find((c) => c.id === id); assert.ok(c, id); return c; };
const sameRows = (rows, originals) => {
  assert.equal(rows.length, originals.length);
  rows.forEach((r, i) => assert.deepEqual(r.raw, originals[i]));
};
const expectedIds = ["webdev-arena-frontend-2026-10-08", "webrise-v1-text", "hle-original-haiku55-october", "terminal-bench-4-haiku55-lab", "terminal-bench-science-haiku55-lab", "osworld-v2-1-offline-october", "healthbench-professional-openai-20260929", "healthbench-professional-haiku55-effort", "healthagentbench", "mentalhealthbench", "robochallenge-table30-v2", "drivingbench-fixed-pilot", "waymo-corrected-fleet-outcomes"];
assert.deepEqual(refresh.cards.map((c) => c.id), expectedIds);
const packetFor = (id) => dir + (expectedIds.slice(0, 2).includes(id) ? "frontend.json" :
  ["hle-original-haiku55-october", "terminal-bench-4-haiku55-lab", "terminal-bench-science-haiku55-lab", "osworld-v2-1-offline-october", "healthbench-professional-haiku55-effort"].includes(id) ? "lab-community.json" : "medical-robotics.json");
for (const c of refresh.cards) {
  assert.equal(c.source_input, packetFor(c.id), c.id + " archived packet link");
  assert.ok(c.source_inputs.includes(c.source_input));
  for (const file of c.source_inputs) assert.ok(fs.existsSync(path.join(root, file)), file + " source file exists");
}
assert.deepEqual(card("healthbench-professional-openai-20260929").source_inputs, [dir + "medical-robotics.json", "data/gallery-current-2026-10-01.json", "data/current-medical.original.json"]);
assert.deepEqual(card("healthbench-professional-openai-20260929").preserved_source_cohorts, [{ source_input: "data/gallery-current-2026-10-01.json", id: "healthbench-professional", row_count: 7 }]);
assert.deepEqual(refresh.coverage.refresh.card_ids, expectedIds);
for (const f of read(dir + "evidence-manifest.json").files) {
  const bytes = fs.readFileSync(path.join(root, dir, f.path));
  assert.equal(bytes.length, f.bytes);
  assert.equal(crypto.createHash("sha256").update(bytes).digest("hex"), f.sha256);
}
assert.deepEqual(refresh.coverage.cards.slice(0, 39), baseline.cards);
for (const key of Object.keys(baseline).filter((k) => k !== "cards" && k !== "familyGroups")) assert.deepEqual(refresh.coverage[key], baseline[key]);
const oldMetadata = read("data/gallery-metadata-2026-10-05.json");
for (const [id, m] of Object.entries(oldMetadata.cards)) assert.deepEqual(refresh.metadata.cards[id], m, id + " original metadata");
assert.equal(refresh.metadata.counts.all, 86);
assert.equal(refresh.metadata.counts.default_families, 58);
// Six additions join already plotted families. Waymo's older guide was source-only,
// so it and six wholly new graph families account for the seven-family increase.
assert.deepEqual(refresh.coverage.familyGroups["osworld-v2-offline"], ["osworld-v2-offline", "osworld-v2-1-offline-october"]);
assert.deepEqual(refresh.coverage.familyGroups["waymo-onroad-safety"], ["waymo-corrected-fleet-outcomes", "waymo-onroad-safety"]);
assert.equal(oldMetadata.cards["osworld-v2-offline"].evidence, "plotted");
assert.equal(oldMetadata.cards["waymo-onroad-safety"].evidence, "source_only");
assert.equal(card("osworld-v2-1-offline-october").category, "agents");
for (const ids of Object.values(refresh.coverage.familyGroups)) for (const id of ids) assert.ok(refresh.metadata.cards[id], id + " family member must exist");
for (const [key, ids] of Object.entries(baseline.familyGroups)) assert.deepEqual(refresh.coverage.familyGroups[key].filter((id) => ids.includes(id)), ids);
const plottedFamilies = (metadata, groups) => {
  const mapping = new Map(Object.entries(groups).flatMap(([k, ids]) => ids.map((id) => [id, k])));
  return new Set(Object.entries(metadata.cards).filter(([, m]) => m.evidence === "plotted").map(([id]) => mapping.get(id) || id));
};
const oldPlotted = plottedFamilies(oldMetadata, refresh.coverage.familyGroups);
assert.equal(oldPlotted.size, 51);
const currentPlotted = plottedFamilies(refresh.metadata, refresh.coverage.familyGroups);
assert.equal(currentPlotted.size, 58);
assert.deepEqual([...currentPlotted].filter((id) => !oldPlotted.has(id)).sort(), ["webrise-v1-text", "hle-original-haiku55-october", "healthagentbench", "mentalhealthbench", "robochallenge-table30-v2", "drivingbench-fixed-pilot", "waymo-onroad-safety"].sort());
const arena = card(expectedIds[0]).variants[0];
sameRows(arena.rows, front.cohorts[expectedIds[0]].rows);
assert.equal(arena.rows.length, 142);
assert.equal(new Set(arena.rows.map((r) => r.result_id)).size, 142);
const duplicate = arena.rows.filter((r) => r.model_variant === "gpt-5.3-codex (codex-harness)");
assert.deepEqual(duplicate.map((r) => [r.rank, r.value]), [[86, 1408], [102, 1370]]);
assert.equal(new Set(duplicate.map((r) => r.label)).size, 2);
assert.deepEqual(arena.metrics[0].domain, [1000, 1900]);
assert.equal(arena.metrics[0].interval_kind, "published_interval");
assert.equal(arena.metrics[0].ci_level, undefined);
const web = card("webrise-v1-text").variants[0];
sameRows(web.rows, front.cohorts["webrise-v1-text"].rows);
assert.equal(web.rows.length, 14);
assert.deepEqual(web.metrics.map((m) => m.field), ["transition_validity_percent", "requirement_coverage_percent", "visual_quality_0_100"]);
const pairs = [["hle-original-haiku55-october", ["anthropic-haiku55-hle-no-tools", "anthropic-haiku55-hle-tools"]], ["terminal-bench-4-haiku55-lab", ["anthropic-haiku55-terminalbench4"]], ["terminal-bench-science-haiku55-lab", ["anthropic-haiku55-terminalbench-science01"]], ["osworld-v2-1-offline-october", ["anthropic-osworld21-offline-october"]], ["healthbench-professional-haiku55-effort", ["anthropic-healthbench-professional-haiku55-effort"]], ["healthagentbench", ["healthagentbench-original-paper", "healthagentbench-20260727-additions"]], ["mentalhealthbench", ["mentalhealthbench-openai-max-20260929", "mentalhealthbench-paper-default"]], ["robochallenge-table30-v2", ["robochallenge-table30-v2-current"]]];
for (const [id, ids] of pairs) card(id).variants.forEach((v, i) => { sameRows(v.rows, source(ids[i]).rows); assert.deepEqual(v.settings, source(ids[i]).settings || source(ids[i]).config || {}); });
assert.equal(card("osworld-v2-1-offline-october").variants[0].rows.length, 5);
assert.equal(card("osworld-v2-1-offline-october").variants[0].settings.tasks, 82);
assert.equal(card("osworld-v2-1-offline-october").variants[0].settings.full_benchmark_tasks, 108);
assert.match(card("osworld-v2-1-offline-october").read, /retained OSWorld 2.0/);
const health = card("healthbench-professional-openai-20260929").variants[0].rows;
const oldHealth = read("data/gallery-current-2026-10-01.json").cards.find((c) => c.id === "healthbench-professional");
assert.equal(health.length, 8);
sameRows(health.slice(0, 7), oldHealth.rows);
assert.equal(health.find((r) => r.model_variant === "GPT-6 Astra").value, 64.7);
assert.deepEqual([health[7].value, health[7].unadjusted_value], [64.2, 67.2]);
const agent = card("healthagentbench");
assert.equal(agent.variants[0].rows.length, 10);
assert.deepEqual(agent.variants[0].metrics.slice(1).map((m) => [m.x_field, m.x_unit]), [["cost_usd_per_attempt", "USD/attempt"], ["wallclock_minutes_per_attempt", "minutes/attempt"]]);
assert.equal(agent.variants[1].rows.length, 2);
assert.equal(agent.variants[1].metrics.length, 1);
const robot = card("robochallenge-table30-v2").variants[0];
assert.equal(robot.rows.length, 54);
assert.equal(source("robochallenge-table30-v2-current").single_task_evidence.ready_for_import, false);
assert.deepEqual(robot.metrics.map((m) => m.field), ["success_rate_percent", "score"]);
const driving = card("drivingbench-fixed-pilot"), originalDriving = source("drivingbench-v1-fixed-pilot");
sameRows(driving.variants[0].rows, originalDriving.rows);
assert.equal(driving.variants[0].rows.length, 4);
const attempts = driving.variants[1].rows;
assert.equal(attempts.length, 11);
assert.equal(driving.variants[1].settings.independent_chats_per_system, 1);
let index = 0;
for (const r of originalDriving.rows) for (let i = 0; i < r.attempt_progress_percent.length; i++) {
  const a = attempts[index++];
  assert.deepEqual([a.model_variant, a.value, a.duration_seconds, a.cost_usd], [r.model_variant, r.attempt_progress_percent[i], r.attempt_duration_seconds[i], r.attempt_cost_usd[i]]);
}
assert.match(driving.read, /round/);
const fleet = card("waymo-corrected-fleet-outcomes");
assert.equal(fleet.variants.length, 3);
assert.equal(refresh.metadata.cards[fleet.id].snapshot_at, null);
assert.equal(refresh.metadata.cards[fleet.id].observation_period_end, "2026-06-30");
assert.equal(refresh.metadata.cards[fleet.id].publication_at, "2026-09-24");
assert.match(refresh.notes[fleet.id].date, /Observation period ends 2026-06-30/);
fleet.variants.forEach((v, i) => {
  assert.equal(v.snapshot_at, null);
  assert.equal(v.data_end_date, source("waymo-safety-impact-202606-corrected20261002").data_end_date);
  const raw = source("waymo-safety-impact-202606-corrected20261002").rows[i];
  assert.equal(v.metrics[0].direction, "lower_is_better");
  assert.equal(v.metrics[0].unit, "crashed vehicles/million miles");
  assert.deepEqual(v.rows.map((r) => r.value), [raw.waymo_ipmm_rounded, raw.human_benchmark_ipmm_rounded]);
  v.rows.forEach((r) => assert.deepEqual(r.raw, raw));
});
const audit = refresh.coverage.refresh.directory;
assert.ok(audit.some((c) => /SWE-Bench Pro version unspecified/.test(c.status)));
assert.ok(audit.some((c) => /modified evaluation/.test(c.status)));
assert.ok(!refresh.cards.some((c) => /swe-families|programbench/.test(c.id)));
const sandbox = { window: {}, URL };
vm.runInNewContext(fs.readFileSync(path.join(root, "assets/coverage-graphs.js"), "utf8"), sandbox);
const renderer = sandbox.window.LAB_COVERAGE;
assert.equal(renderer.valid(baseline), true);
assert.equal(renderer.valid(refresh.coverage), true);
const unknown = renderer.uncertainty(arena.rows[0], arena.metrics[0]);
assert.equal(unknown.kind, "published_interval");
assert.equal(unknown.level, undefined);
for (const id of ["terminal-bench-4-haiku55-lab", "terminal-bench-science-haiku55-lab", "mentalhealthbench"]) {
  const v = card(id).variants[0], u = renderer.uncertainty(v.rows[0], v.metrics[0]);
  assert.equal(u.kind, "standard_error");
  assert.equal(u.level, undefined);
}
const invalid = structuredClone(refresh.coverage);
invalid.refresh.card_ids.pop();
assert.equal(renderer.valid(invalid), false);
const report = { passed: true, cards: 13, totalCards: 86, families: 58, checks: ["Exact source hashes and archived projection/metadata preserved", "All admitted raw rows, duplicate Arena keys and named cohort settings", "Separate typed uncertainty, grader/effort groups and missing costs", "Paired cost/time units, 11 dependent attempts and three adverse outcomes", "Held numeric and modified cohorts excluded; baseline and current renderer guards"] };
fs.mkdirSync(path.join(root, "evidence"), { recursive: true });
fs.writeFileSync(path.join(root, "evidence/benchmark-refresh-validation.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report));
