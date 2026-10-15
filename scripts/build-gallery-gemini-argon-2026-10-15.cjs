"use strict";
// Generation and checks run only in cloud/hosted CI.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict"), crypto = require("node:crypto");
const root = path.resolve(__dirname, ".."), dir = "data/gemini-4-argon-2026-10-15/";
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const clone = (x) => JSON.parse(JSON.stringify(x));
function build() {
  const manifest = read(dir + "evidence-manifest.json"), source_input = dir + "source-packet.json";
  assert.equal(manifest.files.length, 1);
  assert.equal(manifest.files[0].path, "source-packet.json");
  const bytes = fs.readFileSync(path.join(root, source_input));
  assert.equal(bytes.length, manifest.files[0].bytes);
  assert.equal(crypto.createHash("sha256").update(bytes).digest("hex"), manifest.files[0].sha256);
  const packet = read(source_input), baseline = read("data/gallery-refresh-projection-2026-10-12.json");
  assert.equal(packet.checked_at, "2026-10-15");
  assert.equal(packet.model.api_id, "gemini-4-argon");
  assert.equal(packet.google.observations.reduce((n, o) => n + o.metrics.length, 0), 19);
  assert.equal(packet.aa.observations.reduce((n, o) => n + o.metrics.length, 0), 10);
  const coverage = clone(baseline.coverage), metadata = clone(baseline.metadata), notes = {};
  function variant(o, provider) {
    const publication = packet[provider].publication_date;
    const row = { ...clone(o), label: o.model_variant,
      result_id: "gemini-4-argon-" + provider + "-" + o.id,
      effort: provider === "aa" ? "high; Long Decode Continuation" : "highest thinking; see benchmark-specific exceptions",
      model_release_date: packet.model.announcement_date,
      broad_availability_date: packet.model.broad_availability_date,
      measurements: Object.fromEntries(o.metrics.map((m) => [m.id, m.value])), raw: clone(o) };
    return { id: row.result_id, label: "Gemini 4 Argon / " + (provider === "google" ? "Google model card" : "independent AA") + " / " + o.benchmark,
      rows: [row], metrics: o.metrics.map((m) => ({ id: m.id, label: m.label, field: "measurements." + m.id, unit: m.unit, domain: clone(m.domain), direction: m.direction })),
      source_url: o.source_url, source_locator: provider === "google" ? "October model-card results table; " + o.benchmark : "September 30 AA article; " + o.benchmark,
      settings: { model_id: packet.model.api_id, effort: packet[provider].effort, methodology: o.methodology, methodology_url: o.methodology_url || null,
        evidence_role: o.evidence_role, long_decode_continuation: provider === "aa" ? true : null,
        ...(provider === "aa" && o.id === "intelligence-index-v4-3-2" ? { introductory_cost_usd_per_intelligence_index_task: packet.aa.introductory_cost_usd_per_intelligence_index_task,
          approximate_average_output_tokens_per_index_task: packet.aa.approximate_average_output_tokens_per_index_task,
          throughput_tokens_per_second: null, cost_basis: "September 30 reported introductory and cache pricing; not a generic task cost or current-price guarantee" } : {}) },
      limitations: [...packet.limitations, ...(provider === "aa" ? [packet.aa.stale_availability_statement] : [])],
      source_input, evaluation_date: null, publication_at: publication, snapshot_at: null,
      checked_at: packet.checked_at, complete: false, coverage: "One selected Argon observation; not a complete updated model leaderboard. Every setting belongs to this reporting source." };
  }
  const cards = [], cohort_additions = [];
  for (const provider of ["google", "aa"]) {
    const observations = packet[provider].observations;
    const card = { id: "gemini-4-argon-" + provider + "-report", name: "Gemini 4 Argon / " + (provider === "google" ? "Google reported benchmarks" : "independent AA benchmarks"), category: "standard",
      question: provider === "google" ? "What does Google's model card report for Gemini 4 Argon?" : "What did Artificial Analysis measure for Gemini 4 Argon?",
      tests: provider === "google" ? "Select one benchmark from the October model card. Its 19 measurements span separate tasks, metrics and protocols; Google self-computes some and reproduces external boards for others." : "Select an AA benchmark for the high-reasoning Argon configuration evaluated with Long Decode Continuation. The article reports 10 distinct measurements, with index points, Elo and percentages kept separate.",
      matters: "The new model can be inspected without treating results from different evaluators, tasks or harnesses as one ranking.",
      read: "These are selected Argon observations, not a complete refreshed leaderboard. Each selector changes the benchmark or measurement; rows are never pooled across benchmarks. Exact run dates, generic cost/time and numerical uncertainty are unknown. Announcement on September 30, broad availability on October 13 and source review on October 15 are different dates. " + (provider === "google" ? "External results reproduced by Google are explicitly attributed, not claimed independently checked against those boards." : "AA's AutomationBench-AA 78% differs from Google's private-set 51.3%; AA's rounded Terminal result 57% differs from Google's 57.4%. The 53-point Intelligence Index result is directly reported; the $1.99 introductory index-task cost is kept only in that setup's details."),
      source_input, source_inputs: [source_input], source_packet_checked_at: packet.checked_at, historical: false,
      variants: observations.map((o) => variant(o, provider)) };
    cards.push(card);
    for (const o of observations.filter((o) => o.target_card_id)) {
      const target = coverage.cards.find((c) => c.id === o.target_card_id);
      assert.ok(target, "Existing benchmark card " + o.target_card_id);
      const v = variant(o, provider);
      assert.ok(!target.variants.some((old) => old.id === v.id));
      target.variants.push(v);
      target.source_inputs = [...new Set([...(target.source_inputs || [target.source_input]), source_input].filter(Boolean))];
      cohort_additions.push({ card_id: target.id, variant: clone(v) });
    }
  }
  coverage.cards.push(...cards);
  const augmented = [...new Set(cohort_additions.map((a) => a.card_id))];
  assert.equal(augmented.length, 7);
  assert.equal(cohort_additions.length, 8);
  for (const c of cards) {
    notes[c.id] = { question: c.question, tests: c.tests, matters: c.matters, read: c.read, date: "Source checked October 15, 2026; run dates not reported" };
    metadata.cards[c.id] = { evidence: "plotted", cohort: "latest_collected", cohort_basis: "Selected Argon observations from this named source, kept separate by benchmark and protocol; not new independently executed evaluations.", discovery_lifecycle: null,
      source_review: { date: packet.checked_at, mode: "parent_primary_research", scope: "Selected Argon results checked against primary-source model/API documentation, evaluation methodology and independent AA reporting." },
      result_packet_checked_at: packet.checked_at, snapshot_at: null, publication_at: c.variants[0].publication_at, publication_label: null,
      evaluations: c.variants.map((v) => ({ slice: v.label, earliest: null, latest: null, known: 0, unknown: 1 })),
      model_releases: { earliest: packet.model.announcement_date, latest: packet.model.announcement_date, known: c.variants.length, unknown: 0 } };
  }
  for (const id of augmented) {
    const m = metadata.cards[id];
    m.source_review = { date: packet.checked_at, mode: "parent_primary_research", scope: "Earlier source cohorts preserved; separate selected Argon reporting cohorts added with their own methods and publication dates." };
    m.result_packet_checked_at = packet.checked_at;
    m.snapshot_at = null;
    m.publication_at = null;
    m.publication_label = "Multiple dated source reports; see the separate cohorts.";
    const allRows = coverage.cards.find((c) => c.id === id).variants.flatMap((v) => v.rows);
    const releases = allRows.map((r) => r.model_release_date).filter((d) => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();
    m.model_releases = { earliest: releases[0] || null, latest: releases.at(-1) || null, known: releases.length, unknown: allRows.length - releases.length };
    for (const a of cohort_additions.filter((a) => a.card_id === id)) m.evaluations.push({ slice: a.variant.label, earliest: null, latest: null, known: 0, unknown: 1 });
  }
  coverage.model_updates = { schema_version: 1, checked_at: packet.checked_at, model_id: packet.model.api_id, card_ids: cards.map((c) => c.id), augmented_card_ids: augmented };
  const values = Object.values(metadata.cards);
  metadata.prepared_at = packet.checked_at;
  metadata.basis = "Earlier archived metadata retained; selected Gemini 4 Argon source observations added with separate evaluator and run-date semantics.";
  metadata.counts = { all: values.length, plotted: values.filter((c) => c.evidence === "plotted").length,
    current: values.filter((c) => c.evidence === "plotted" && c.cohort === "latest_collected").length,
    historical: values.filter((c) => c.cohort === "historical").length, source_only: values.filter((c) => c.evidence === "source_only").length,
    unavailable: values.filter((c) => c.evidence === "unresolved").length };
  const families = new Map(Object.entries(coverage.familyGroups).flatMap(([k, ids]) => ids.map((id) => [id, k])));
  metadata.counts.default_families = new Set(Object.entries(metadata.cards).filter(([, m]) => m.evidence === "plotted").map(([id]) => families.get(id) || id)).size;
  assert.equal(metadata.counts.all, 88);
  assert.equal(metadata.counts.default_families, 60);
  const projection = { schema_version: 1, checked_at: packet.checked_at, model: packet.model, cards, cohort_additions, notes,
    source_files: [source_input, dir + "evidence-manifest.json"], source_integrities: manifest.files };
  return { projection, coverage, metadata, notes };
}
module.exports = build;
if (require.main === module) {
  const output = build();
  for (const [file, value] of [["data/gallery-gemini-argon-projection-2026-10-15.json", output.projection], ["data/gallery-metadata-2026-10-15.json", output.metadata]]) {
    if (process.argv.includes("--check")) assert.deepEqual(read(file), value, file + " committed projection");
    else fs.writeFileSync(path.join(root, file), JSON.stringify(value, null, 2) + "\n");
  }
  console.log(JSON.stringify({ addedCards: output.projection.cards.length, augmentedCards: 7, measurements: 29, counts: output.metadata.counts }));
}
