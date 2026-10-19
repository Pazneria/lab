"use strict";
// A dated source projection. This builder does no network access or evaluation work.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");

const root = path.resolve(__dirname, "..");
const sourceInput = "data/benchmark-refresh-2026-10-19/source-packet.json";
const manifestInput = "data/benchmark-refresh-2026-10-19/evidence-manifest.json";
const read = (name) => JSON.parse(fs.readFileSync(path.join(root, name), "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));

function build() {
  const manifest = read(manifestInput);
  assert.deepEqual(manifest.files.map((f) => f.path), ["source-packet.json"]);
  const inputBytes = fs.readFileSync(path.join(root, sourceInput));
  assert.equal(inputBytes.length, manifest.files[0].bytes);
  assert.equal(crypto.createHash("sha256").update(inputBytes).digest("hex"), manifest.files[0].sha256);
  const packet = read(sourceInput);
  assert.equal(packet.checked_at, "2026-10-19");
  assert.equal(packet.arena_frontend.snapshot_at, "2026-10-18");
  assert.equal(packet.arena_frontend.displayed_models, 147);
  assert.equal(packet.arena_frontend.rows.length, 20);
  assert.deepEqual(packet.arena_frontend.rows.map((r) => r.rank), Array.from({ length: 20 }, (_, i) => i + 1));

  const prior = require("./build-gallery-gemini-argon-2026-10-15.cjs")();
  const coverage = clone(prior.coverage);
  const metadata = clone(prior.metadata);
  const id = "webdev-arena-frontend-2026-10-18";
  const rows = packet.arena_frontend.rows.map((raw) => ({
    ...clone(raw),
    label: raw.model_variant,
    result_id: raw.source_row_key,
    source_url: packet.arena_frontend.source_url,
    raw: clone(raw),
  }));
  const variant = {
    id,
    label: "October 18 · first 20 of 147 displayed models",
    rows,
    metrics: [{
      id: "score", label: "Arena Frontend preference rating · axis 1000–1900",
      field: "value", unit: "Arena rating points", domain: [1000, 1900],
      direction: "higher_is_better", interval_field: "published_range",
      interval_kind: "published_interval",
    }],
    source_url: packet.arena_frontend.source_url,
    source_locator: "October 18, 2026, Code Arena / WebDev / Frontend, ranks 1–20",
    settings: {
      category: packet.arena_frontend.category,
      displayed_total_votes: packet.arena_frontend.displayed_total_votes,
      displayed_models: packet.arena_frontend.displayed_models,
      selection: packet.arena_frontend.selection,
      workflow: packet.arena_frontend.workflow,
      row_harness_and_tools: null,
      row_tool_budget: null,
      task_cost_usd: null,
      task_time_seconds: null,
      interval_kind: packet.arena_frontend.interval_kind,
      vote_count_basis: packet.arena_frontend.vote_count_basis,
    },
    source_input: sourceInput,
    snapshot_at: packet.arena_frontend.snapshot_at,
    publication_at: packet.arena_frontend.publication_at,
    evaluation_date: null,
    checked_at: packet.checked_at,
    complete: false,
    coverage: packet.arena_frontend.selection,
    limitations: [
      "This is a dated selection from a live preference table, not the complete 147-model table.",
      "The table does not establish row evaluation dates, exact harness versions, tool budgets, task cost, task time, or interval confidence coverage.",
      "Preference ratings are not screenshot reproduction scores or functional browser task pass rates.",
    ],
  };
  const card = {
    id,
    name: "WebDev Arena · Frontend · October 18",
    category: "frontend",
    question: "Which generated websites did people prefer in the October 18 Frontend view?",
    tests: "Code Arena voters compare HTML or React website work in the WebDev Frontend category. This dated view selects the first 20 rows from a 147-model table with 790,403 page-wide votes.",
    matters: "Preference reveals appeal and perceived usefulness, while screenshot fidelity and functional browser checks answer different questions.",
    read: "These are 20 selected preference ratings, with each model row's own vote count and the source's published score range. The interval confidence level is not specified. Preserve effort suffixes and harness labels; exact per-row tools, cost, time and run dates are unavailable. The October 8 complete 142-row table remains a separate older cohort.",
    historical: false,
    source_input: sourceInput,
    source_inputs: [sourceInput],
    source_packet_checked_at: packet.checked_at,
    variants: [variant],
  };
  assert.ok(!coverage.cards.some((c) => c.id === id));
  coverage.cards.push(card);
  const family = coverage.familyGroups["webdev-arena-frontend"];
  assert.deepEqual(family, ["webdev-arena-frontend-2026-10-08", "webdev-arena-frontend"]);
  family.unshift(id);
  coverage.benchmark_updates = {
    schema_version: 1,
    checked_at: packet.checked_at,
    source_snapshot_at: packet.arena_frontend.snapshot_at,
    card_ids: [id],
    source_input: sourceInput,
    reviewed_existing_ids: ["design-arena-frontend", "design2code-v3-484", "bench2drive", "behavior-challenge-2026", "healthbench-professional", "mentalhealthbench"],
  };

  const old = metadata.cards["webdev-arena-frontend-2026-10-08"];
  assert.equal(old.cohort, "latest_collected");
  old.cohort = "historical";
  old.cohort_basis = "Complete October 8 table retained as the earlier Frontend snapshot; October 18 selected rows form a separate card.";
  metadata.cards[id] = {
    evidence: "plotted", cohort: "latest_collected",
    cohort_basis: "Dated October 18 Frontend preference snapshot, first 20 of 147 displayed model rows; not a complete board.",
    discovery_lifecycle: null,
    source_review: { date: packet.checked_at, mode: "primary_source_review", scope: "Direct Arena Frontend table transcription; independent evaluation not run." },
    result_packet_checked_at: packet.checked_at, snapshot_at: packet.arena_frontend.snapshot_at,
    publication_at: null, publication_label: null,
    evaluations: [{ slice: variant.label, earliest: null, latest: null, known: 0, unknown: rows.length }],
    model_releases: { earliest: null, latest: null, known: 0, unknown: rows.length },
  };
  for (const review of packet.source_reviews) {
    for (const reviewedId of review.ids) {
      const target = metadata.cards[reviewedId];
      if (!target) continue;
      target.source_review = {
        date: packet.checked_at,
        mode: "primary_source_recheck",
        scope: review.finding,
        audit_status: review.decision,
      };
      target.review_source_input = sourceInput;
    }
  }
  metadata.prepared_at = packet.checked_at;
  metadata.basis = "Earlier archived results retained; October 18 WebDev Frontend preference selection added with a separate date and six existing source areas rechecked October 19.";
  const values = Object.values(metadata.cards);
  metadata.counts = {
    all: values.length,
    plotted: values.filter((m) => m.evidence === "plotted").length,
    current: values.filter((m) => m.evidence === "plotted" && m.cohort === "latest_collected").length,
    historical: values.filter((m) => m.cohort === "historical").length,
    source_only: values.filter((m) => m.evidence === "source_only").length,
    unavailable: values.filter((m) => m.evidence === "unresolved").length,
  };
  const families = new Map(Object.entries(coverage.familyGroups).flatMap(([key, ids]) => ids.map((item) => [item, key])));
  metadata.counts.default_families = new Set(Object.entries(metadata.cards).filter(([, m]) => m.evidence === "plotted").map(([key]) => families.get(key) || key)).size;
  assert.deepEqual(metadata.counts, { all: 89, plotted: 80, current: 54, historical: 28, source_only: 7, unavailable: 2, default_families: 60 });

  const notes = {
    [id]: { question: card.question, tests: card.tests, matters: card.matters, read: card.read, date: "Arena Frontend table dated October 18, 2026; reviewed October 19" },
    "design-arena-frontend": { read: "Anonymous four-model tournaments produce five pairwise preference votes and Bradley-Terry ratings. Overall Frontend, Website, Web Apps, Fullstack and Image to HTML are separate categories. October 19 model-page values moved during review, and all-category tournament totals do not supply category sample sizes; no synchronized score is plotted." },
    "design2code-v3-484": { read: "The historical 484 C4 screenshot cases and separate HARD 80 cases measure visual reconstruction, with element, text, position, color and CLIP dimensions kept separate. Direct and prompted method variants stay distinct. No current frontier screenshot result is verified here; this does not test interactive feature completion." },
    "behavior-challenge-2026": { read: "The 2026 challenge covers 100 tasks and seven scenes. Submissions closed October 16; the winners announcement is scheduled for November 4. Baseline evaluation instructions require BEHAVIOR-1K v3.9.3. Self-reported, verified and archived results stay separate; no winner score is inferred." },
    "bench2drive": { tests: "Complete sensor-and-control systems drive through the separate 220-route v0.0.4 validation benchmark in CARLA. The August 6 release also supplied 1,100 uniform training routes, which are not evaluation routes.", read: "The existing v0.0.4 comparison already includes LEAD and Simlingo. Driving Score and route success are separate simulator outcomes; system evaluation dates and on-road safety are not established." },
    "healthbench-professional": { read: "HealthBench Professional evaluates care consult, documentation and medical research conversations with physician-authored rubrics. Base-model scores and the ChatGPT for Clinicians tool system are different setups. Existing corrected length-adjusted source cohorts remain; no October 19 score is inferred." },
    "mentalhealthbench": { read: "The synthetic conversation benchmark uses expert-consensus rubrics and GPT-5.6 Sol automated grading. The source's newest-provider comparison is dated September 23. Maximum-effort system-card and default-effort paper results remain separate; score error bars have their source-specific definitions. No clinical efficacy conclusion follows." },
  };
  const projection = {
    schema_version: 1,
    checked_at: packet.checked_at,
    source_snapshot_at: packet.arena_frontend.snapshot_at,
    card,
    family_id: "webdev-arena-frontend",
    source_reviews: packet.source_reviews,
    source_files: [sourceInput, manifestInput],
    source_integrities: manifest.files,
  };
  return { projection, coverage, metadata, notes };
}

module.exports = build;
if (require.main === module) {
  const output = build();
  for (const [file, value] of [
    ["data/gallery-refresh-projection-2026-10-19.json", output.projection],
    ["data/gallery-metadata-2026-10-19.json", output.metadata],
  ]) {
    if (process.argv.includes("--check")) assert.deepEqual(read(file), value, file);
    else fs.writeFileSync(path.join(root, file), JSON.stringify(value, null, 2) + "\n");
  }
  console.log(JSON.stringify({ selectedRows: output.projection.card.variants[0].rows.length, counts: output.metadata.counts }));
}
