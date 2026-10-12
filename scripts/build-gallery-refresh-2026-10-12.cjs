"use strict";
// Run generation/checks only in the authorized cloud executor or hosted CI.
const fs = require("node:fs"), path = require("node:path"),
  assert = require("node:assert/strict"), crypto = require("node:crypto");
const root = path.resolve(__dirname, ".."), dir = "data/benchmark-refresh-2026-10-12/";
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const clone = (v) => JSON.parse(JSON.stringify(v));
const digest = (p) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, p))).digest("hex");
const percent = (id, label, field = "value", extra = {}) => ({
  id, label, field, unit: "percent", domain: [0, 100], direction: "higher_is_better", ...extra,
});
const scatter = (id, label, field, x, xLabel, unit, basis) => ({
  ...percent(id, label, field), kind: "scatter", y_label: label,
  x_field: x, x_label: xLabel, x_unit: unit, x_basis: basis,
});
function verifyArchive() {
  const manifest = read(dir + "evidence-manifest.json");
  const expected = ["frontend.json", "lab-community.json", "medical-robotics.json", "robochallenge-table30-v2-primary-rendered-2026-10-12.txt"];
  assert.deepEqual(manifest.files.map((f) => f.path), expected);
  for (const f of manifest.files) {
    assert.equal(fs.statSync(path.join(root, dir, f.path)).size, f.bytes, f.path + " exact byte count");
    assert.equal(digest(dir + f.path), f.sha256, f.path + " exact public archive");
  }
  return manifest;
}
function build() {
  const manifest = verifyArchive(), front = read(dir + "frontend.json"),
    lab = read(dir + "lab-community.json"), physical = read(dir + "medical-robotics.json"),
    baseline = read("data/coverage-projection-2026-10-05.json"),
    oldMetadata = read("data/gallery-metadata-2026-10-05.json"),
    standard = read("data/gallery-current-2026-10-01.json");
  for (const packet of [front, lab, physical]) assert.equal(packet.checked_at, "2026-10-12");
  const labBy = new Map(lab.cohorts.map((c) => [c.id, c])), medicalBy = new Map(physical.cohorts.map((c) => [c.id, c]));
  const sourceOf = (c) => c.source_url || lab.sources[c.source_id].url;
  function rows(c, label = (r) => r.model_variant, supplied = c.rows) {
    return supplied.map((r, i) => ({
      ...clone(r), label: label(r, i), result_id: r.source_row_key || c.id + "-row-" + i,
      source_url: r.source_url || sourceOf(c), evaluation_date: r.evaluation_date ?? c.evaluation_date ?? null,
      raw: clone(r),
    }));
  }
  function variant(c, label, metrics, suppliedRows = rows(c), extra = {}) {
    return {
      id: c.id, label, rows: suppliedRows, metrics, source_url: sourceOf(c),
      settings: clone(c.settings || c.config || {}), limitations: clone(c.caveats || c.limitations || c.notes || []),
      source_locator: c.source_locator || null, evaluation_date: c.evaluation_date ?? null,
      publication_at: c.source_publication_date || c.publication_date || lab.sources[c.source_id]?.publication_date || null,
      data_end_date: c.data_end_date || null,
      snapshot_at: c.snapshot_date || null, checked_at: "2026-10-12", ...extra,
    };
  }
  const cards = [];
  function card(id, name, category, question, tests, matters, interpretation, variants, historical = false) {
    const source_input = dir + (category === "frontend" ? "frontend.json" :
      variants.every((v) => labBy.has(v.id)) ? "lab-community.json" : "medical-robotics.json");
    cards.push({ id, name, category, question, tests, matters, read: interpretation,
      source_input, source_inputs: [source_input],
      variants, historical, source_packet_checked_at: "2026-10-12" });
  }
  const arena = { ...front.cohorts["webdev-arena-frontend-2026-10-08"], id: "webdev-arena-frontend-2026-10-08" };
  assert.equal(arena.rows.length, 142);
  assert.equal(new Set(arena.rows.map((r) => r.source_row_key)).size, 142);
  const repeated = new Set(arena.rows.filter((r, i, rs) => rs.some((q, j) => j !== i && q.model_variant === r.model_variant)).map((r) => r.model_variant));
  const arenaRows = rows(arena, (r) => r.model_variant + (repeated.has(r.model_variant) ? " · source row " + r.rank : ""));
  for (const r of arenaRows) r.published_range = [r.confidence_interval.lower, r.confidence_interval.upper];
  card(arena.id, "Arena Frontend · October 8", "frontend", "Which generated websites do people prefer?",
    "People compare generated HTML or React websites. This snapshot preserves all 142 displayed Frontend rows, their votes, harness labels and published score ranges.",
    "Preference can reveal whether a website feels useful and appealing, while a separate functional test is needed to establish that its controls work.",
    "Ratings belong to this Frontend comparison pool. The axis spans 1000–1900 rating points, and the published intervals have no supplied confidence level. Two identically named Codex rows remain distinct source rows; 142 rows do not establish 142 unique models. API token prices are not task costs, and changes in votes or ratings do not prove model improvement.",
    [variant(arena, "October 8 · complete displayed Frontend table", [{ id: "score", label: "Arena preference rating · axis 1000–1900", field: "value", unit: "Arena rating points", domain: [1000, 1900], direction: "higher_is_better", interval_field: "published_range", interval_kind: "published_interval" }], arenaRows, { complete: true, coverage: "All 142 displayed source rows; duplicate model labels retained.", snapshot_at: "2026-10-08" })]);
  const web = { ...front.cohorts["webrise-v1-text"], id: "webrise-v1-text" };
  assert.equal(web.rows.length, 14);
  card(web.id, "WebRISE · Text", "frontend", "Does a generated website behave as requested?",
    "Models turn text requirements into executable websites. A browser agent checks required transitions and requirement coverage across 442 tasks; a separate judge assesses visual quality.",
    "A convincing screenshot can hide a broken interaction. The two functional measurements show different parts of the required behavior.",
    "Use Text results here: transition validity and requirement coverage are task-level macro averages, not complete-app success. Visual quality is a separate auxiliary score. The June paper does not supply exact generation snapshots, effort, cost or time, and its Video results belong to another modality.",
    [variant(web, "June 2 paper · all 14 Text rows", [percent("transitions", "Required transitions passed", "transition_validity_percent"), percent("requirements", "Requirement coverage", "requirement_coverage_percent"), { ...percent("visual", "Auxiliary visual quality", "visual_quality_0_100"), unit: "visual points (0–100)" }], rows(web), { complete: true })], true);
  const hleNo = labBy.get("anthropic-haiku55-hle-no-tools"), hleTools = labBy.get("anthropic-haiku55-hle-tools");
  card("hle-original-haiku55-october", "HLE · Haiku 5.5 lab report", "standard", "Can Haiku answer difficult expert questions?",
    "The developer evaluates Haiku on the original 2,500-question multimodal Humanity’s Last Exam with five trials at maximum effort. Tools and no-tools runs are separate setups.",
    "Difficult questions probe expert knowledge and reasoning, while the tool-assisted setup also depends on search and code execution.",
    "These two selected Haiku observations are original HLE, not HLE-Diamond or the independent text-only cohort. The report supplies no evaluation date or paired costs. Its tool run excludes known HLE discussion sources and rescored confirmed cheating as incorrect.",
    [variant(hleNo, "Original HLE · no tools · max effort", [percent("score", "Original HLE accuracy")], rows(hleNo), { complete: false, coverage: "One selected developer-reported model." }), variant(hleTools, "Original HLE · web and code tools · max effort", [percent("score", "Original HLE accuracy")], rows(hleTools), { complete: false, coverage: "One selected developer-reported model; separate tools setting." })]);
  const terminal = labBy.get("anthropic-haiku55-terminalbench4"), science = labBy.get("anthropic-haiku55-terminalbench-science01");
  for (const [c, id, name, taskText] of [[terminal, "terminal-bench-4-haiku55-lab", "Terminal-Bench 4 · Haiku lab setup", "66 terminal tasks"], [science, "terminal-bench-science-haiku55-lab", "Terminal-Bench Science · Haiku lab setup", "70 scientific-computing tasks"]]) {
    card(id, name, "standard", "Can Haiku complete demanding terminal work?",
      "The October 7 developer report uses Claude Code --bare at maximum effort, with ten trials per task on " + taskText + ". Network access and fallback models are disabled.",
      "Terminal work requires inspecting files, using software and checking an outcome over many steps. The harness and task environment are part of the measured system.",
      "This is one selected model under a specified lab setup, separate from public CLI and other evaluator cohorts. Safeguard-interrupted trials count as failures. The reported plus/minus value is a standard error, not a 95% confidence interval; run dates, cost and duration are not supplied.",
      [variant(c, "October 7 report · Claude Code --bare · max", [percent("score", "Task success, pass@1", "value", { stderr_field: "uncertainty_plus_minus" })], rows(c), { complete: false, coverage: "One selected lab-reported model and the exact task/trial recipe." })]);
  }
  const os = labBy.get("anthropic-osworld21-offline-october");
  assert.equal(os.rows.length, 5);
  card("osworld-v2-1-offline-october", "OSWorld 2.1 · offline October setup", "agents", "Can an agent finish computer tasks offline?",
    "Five systems operate a computer on OSWorld 2.1’s official 82-task offline subset, with five trials per task, 1080p resolution and up to 500 action steps.",
    "Computer work requires completing connected actions. Partial checkpoint credit can be useful even when the entire task is not finished.",
    "Strict success requires every checkpoint to pass; partial credit is a different measurement. Keep this 82-task subset separate from the September full 108-task cohort and the retained OSWorld 2.0 developer-report card. The version selector links those cards without combining their rows or protocols. The source chart identifies 95% intervals but supplies no transcribed numeric bounds here, so no interval is invented. Anthropic ran the OpenAI models through their API.",
    [variant(os, "October report · official 82-task offline subset", [percent("strict", "All checkpoints passed, pass@1", "strict_pass"), percent("partial", "Mean partial checkpoint credit", "partial_credit")], rows(os), { complete: false, coverage: "All five selected chart-labeled systems; a bounded offline subset." })]);
  const extension = medicalBy.get("healthbench-professional-openai-20260929-extension");
  const predecessor = standard.cards.find((c) => c.id === "healthbench-professional");
  assert.equal(predecessor.rows.length, 7);
  const healthRows = rows(extension, (r) => r.model_variant, [...predecessor.rows, ...extension.rows]);
  assert.equal(healthRows.length, 8);
  assert.equal(healthRows.find((r) => r.model_variant === "GPT-6 Astra").value, 64.7);
  card("healthbench-professional-openai-20260929", "HealthBench Professional · OpenAI table", "medical", "How well does an AI answer professional medical questions?",
    "An OpenAI report grades medical conversations against detailed rubrics and adjusts for response length. The September 29 table adds GPT-6.1 Sol to the seven preserved predecessor values.",
    "Medical responses must meet several requirements at once. A length adjustment helps distinguish rubric performance from simply writing a longer answer.",
    "Sol’s adjusted 64.2 and raw 67.2 are different scores. Astra’s corrected 64.7 was already present and remains unchanged. These rows use the OpenAI reporting series, with no paired cost/time or exact table-level effort supplied; they cannot be combined with Anthropic-grader scores or treated as patient outcomes.",
    [variant(extension, "September 29 table · seven unchanged predecessors plus Sol", [percent("adjusted", "Length-adjusted rubric score"), percent("raw", "Unadjusted rubric score", "unadjusted_value")], healthRows, { complete: true })], true);
  // The refreshed OpenAI card extends, rather than rewrites, the earlier cohort.
  const healthCard = cards.at(-1);
  healthCard.source_inputs.push("data/gallery-current-2026-10-01.json", "data/current-medical.original.json");
  healthCard.preserved_source_cohorts = [{ source_input: "data/gallery-current-2026-10-01.json", id: predecessor.id, row_count: predecessor.rows.length }];
  const haikuHealth = labBy.get("anthropic-healthbench-professional-haiku55-effort");
  card("healthbench-professional-haiku55-effort", "HealthBench Professional · Haiku effort runs", "medical", "How does Haiku perform under the developer’s medical grading setup?",
    "The Haiku system card reports length-adjusted HealthBench Professional scores under an Opus 4.8 grader, with safety classifiers enabled and separately labeled effort runs.",
    "Different reasoning settings can change a measured response, but the grading setup and collection dates also affect what a comparison means.",
    "Five-effort launch observations and the 13-trial same-day max recheck remain separately labeled. The original max runs occurred earlier than low through xhigh, so this is not a causal effort experiment. Keep these scores separate from the OpenAI grader. Approximate response times and an aggregate low-effort range do not provide exact paired task times.",
    [variant(haikuHealth, "October 7 card · effort and collection dates retained", [percent("score", "Length-adjusted score, Anthropic grader")], rows(haikuHealth, (r) => r.model_variant + " · " + r.effort + (r.role === "same_day_recheck" ? " · October 4 recheck (13 trials)" : r.evaluation_date ? " · " + r.evaluation_date : " · October 1–2")), { complete: true })]);
  const healthAgent = medicalBy.get("healthagentbench-original-paper"), additions = medicalBy.get("healthagentbench-20260727-additions");
  card("healthagentbench", "HealthAgentBench", "medical", "Can a clinical-workflow agent produce the required artifact?",
    "Agents use their native coding harnesses to complete 54 clinical-artifact tasks. The original paper reports three attempts per task for each of ten systems, with no web browsing and xhigh effort.",
    "Clinical workflow work extends beyond answering a question to producing a usable result. The model and its harness are both part of the measured system.",
    "The original ten-agent cohort pairs published rounded success rates with USD and wall-clock minutes per task attempt. These are not full-suite totals or patient outcomes. The two July additions keep their own board cost/task label, unknown effort and missing time rather than inheriting the paper setup. Numeric Wilson interval bounds were not transcribed.",
    [variant(healthAgent, "Original ten-agent paper cohort", [percent("score", "Pooled task success"), scatter("cost", "Pooled task success", "value", "cost_usd_per_attempt", "Mean reported cost per task attempt", "USD/attempt", "Original paper cohort only: candidate system cost per task attempt, not full-suite spend. Published values are rounded."), scatter("time", "Pooled task success", "value", "wallclock_minutes_per_attempt", "Mean wall-clock duration per task attempt", "minutes/attempt", "Original paper cohort only: wall-clock minutes per task attempt; not model-only inference time or whole-suite duration.")], rows(healthAgent, (r) => r.model_variant + " + " + r.harness), { complete: true }), variant(additions, "July 27 additions · board setup partly unspecified", [percent("score", "Pooled task success")], rows(additions, (r) => r.model_variant + " + " + r.harness), { complete: false, coverage: "Two dated additions; board cost/task is retained in details, not pooled with paper cost/attempt." })], true);
  const mentalMax = medicalBy.get("mentalhealthbench-openai-max-20260929"), mentalDefault = medicalBy.get("mentalhealthbench-paper-default");
  card("mentalhealthbench", "MentalHealthBench", "medical", "Does a response meet a mental-health conversation rubric?",
    "Models respond to 1,215 synthetic conversations spanning non-acute, high-acuity and emergent scenarios. Four samples per task are assessed against a detailed response rubric.",
    "Different conversation situations require different responses. A rubric can reveal shortcomings within this synthetic evaluation, while treatment efficacy needs separate clinical evidence.",
    "Maximum-effort system-card results and default-effort paper results are separate cohorts. The maximum-effort table reports one standard error across task means, not confidence intervals. Cost and time are unavailable, and these scores do not establish therapy efficacy or clinical safety.",
    [variant(mentalMax, "September 29 system card · maximum effort", [percent("score", "Task-clipped rubric score", "value", { stderr_field: "stderr_pp" })], rows(mentalMax), { complete: true }), variant(mentalDefault, "Author paper · default effort", [percent("score", "Task-clipped rubric score")], rows(mentalDefault), { complete: true })], true);
  const robot = medicalBy.get("robochallenge-table30-v2-current");
  assert.equal(robot.rows.length, 54);
  assert.equal(robot.numeric_import, "verified_full_primary_rendered_table");
  assert.equal(robot.single_task_evidence.ready_for_import, false);
  card("robochallenge-table30-v2", "RoboChallenge · Table30 V2", "physical", "Can a generalist robot complete physical manipulation tasks?",
    "The Table30 V2 track tests multi-task robot systems across 30 tasks and four robot types. This view preserves all 54 aggregate rows from the official board rendered on October 12.",
    "Physical tasks require sensing and acting through a real embodiment. Completing a task differs from making partial progress toward it.",
    "Success rate and the board’s partial-progress Score remain separate views. LoopWAM leads this retrieved success table; KDDI’s October 5 first-place announcement describes an earlier state. Evaluation dates, rollout denominators and complete task coverage are unknown, so low or zero rows are not assumed to be fully evaluated runs. The unrendered single-task observation stays excluded.",
    [variant(robot, "October 12 retrieved aggregate board · 54 rows", [percent("success", "Task success rate", "success_rate_percent"), { ...percent("progress", "Partial-progress Score", "score"), unit: "Score points (0–100)" }], rows(robot), { complete: true, snapshot_at: "2026-10-12", coverage: "Complete displayed aggregate table; per-submission task/rollout coverage is unavailable." })]);
  const driving = medicalBy.get("drivingbench-v1-fixed-pilot");
  const attempts = driving.rows.flatMap((r, system) => r.attempt_progress_percent.map((progress, i) => ({
    model_variant: r.model_variant, harness: r.harness, attempt: i + 1,
    value: progress, duration_seconds: r.attempt_duration_seconds[i], cost_usd: r.attempt_cost_usd[i],
    result_id: "driving-pilot-system-" + system + "-attempt-" + i,
    source_url: driving.source_url, evaluation_date: null,
  })));
  assert.equal(attempts.length, 11);
  const attemptRows = rows(driving, (r) => r.model_variant + " · same-chat attempt " + r.attempt, attempts);
  for (const r of attemptRows) r.result_id = r.raw.result_id;
  card("drivingbench-fixed-pilot", "DrivingBench · fixed physical pilot", "physical", "Can an agent guide a vehicle around a small closed course?",
    "Four model-and-harness systems control a speed-capped vehicle on a 127-metre course with a human safety operator. Each system has one independent chat and up to three dependent attempts.",
    "The pilot exposes the interaction between observation, decisions and vehicle control. It is a small physical experiment rather than a population estimate of driving ability.",
    "Best progress, whole-chat reported spend and per-attempt duration describe different parts of this fixed pilot. All 11 attempts retain their original costs and durations, including failed attempts; they are not independent samples. Grok’s published total differs from the rounded attempt sum and is left unchanged. These results do not establish public-road safety.",
    [variant(driving, "Four system summaries · one chat per system", [percent("score", "Best centerline progress", "best_progress_percent"), scatter("cost", "Best centerline progress", "best_progress_percent", "reported_total_cost_usd", "Reported total cost of the fixed system chat", "USD/chat", "Whole fixed pilot chat, not cost of a successful attempt or a mean task cost. Grok’s reported total is preserved despite rounding disagreement.")], rows(driving, (r) => r.model_variant + " + " + r.harness), { complete: true }), variant({ ...driving, id: "drivingbench-fixed-pilot-attempts" }, "All 11 dependent same-chat attempts", [percent("score", "Attempt centerline progress"), scatter("cost", "Attempt centerline progress", "value", "cost_usd", "Reported cost of this attempt, including reflection", "USD/attempt", "Individual attempts share chat state. The recorded costs include reflection and must not be treated as independent replications."), scatter("time", "Attempt centerline progress", "value", "duration_seconds", "Recorded attempt duration", "seconds", "Each recorded attempt duration, including failures; not inference-only time. Astra’s 322 seconds ends at the last engagement, distinct from arrival at the finish zone.")], attemptRows, { complete: true })], true);
  const fleet = medicalBy.get("waymo-safety-impact-202606-corrected20261002");
  const fleetVariants = fleet.rows.map((r, i) => variant({ ...fleet, id: fleet.id + "-outcome-" + i }, r.outcome, [{ id: "rate", label: "Crashed vehicles per million miles", field: "value", unit: "crashed vehicles/million miles", domain: [0, i === 0 ? 0.25 : 4], direction: "lower_is_better" }], [
    { ...clone(r), label: "Waymo Driver · operating-area fleet", value: r.waymo_ipmm_rounded, result_id: fleet.id + "-waymo-" + i, source_url: fleet.source_url, raw: clone(r), evaluation_date: null },
    { ...clone(r), label: "Geographically adjusted human benchmark", value: r.human_benchmark_ipmm_rounded, result_id: fleet.id + "-human-" + i, source_url: fleet.source_url, raw: clone(r), evaluation_date: null },
  ], { complete: true, snapshot_at: null, data_end_date: fleet.data_end_date }));
  card("waymo-corrected-fleet-outcomes", "Waymo · corrected fleet outcomes", "physical", "What crash outcomes were observed in the studied operating areas?",
    "Waymo reports rider-only fleet crash involvement per mile against a geographically adjusted human comparator. The data end in June 2026, and October 2 release notes identify corrections to dynamic benchmark downloads.",
    "Exposure-adjusted observations can inform the studied operating areas, but they describe the complete vehicle and operations system rather than a foundation model in isolation.",
    "Each outcome has its own comparison and lower rates are better. Published rounded rates and separately reported percentage differences are preserved without recalculating one from the other. This operator-reported observational study does not establish safety everywhere; a pending serious-injury classification is described in the source notes. Cost, latency and immutable fleet versions are unavailable.", fleetVariants);
  const coverage = clone(baseline);
  assert.ok(cards.every((c) => !coverage.cards.some((b) => b.id === c.id)));
  coverage.cards.push(...cards);
  const group = (base, member, first = false) => {
    assert.ok(oldMetadata.cards[base], base + " must be a retained card, not an invented family member");
    assert.ok(cards.some((c) => c.id === member), member + " must be an admitted refresh card");
    const key = Object.keys(coverage.familyGroups).find((k) => coverage.familyGroups[k].includes(base)) || base;
    const members = coverage.familyGroups[key] || [base];
    coverage.familyGroups[key] = first ? [member, ...members] : [...members, member];
  };
  group("webdev-arena-frontend", arena.id, true);
  group("terminal-bench-4", "terminal-bench-4-haiku55-lab");
  group("terminal-bench-science", "terminal-bench-science-haiku55-lab");
  group("osworld-v2-offline", "osworld-v2-1-offline-october");
  group("healthbench-professional", "healthbench-professional-openai-20260929", true);
  group("healthbench-professional", "healthbench-professional-haiku55-effort");
  group("waymo-onroad-safety", "waymo-corrected-fleet-outcomes", true);
  const usedLab = new Set([hleNo.id, hleTools.id, terminal.id, science.id, os.id, haikuHealth.id]);
  const usedMedical = new Set([extension.id, healthAgent.id, additions.id, mentalMax.id, mentalDefault.id, robot.id, driving.id, fleet.id]);
  const directory = [
    ...lab.cohorts.filter((c) => !usedLab.has(c.id)).map((c) => ({ name: c.id, url: sourceOf(c), status: c.id.includes("swe-families") ? "Numeric import held: SWE-Bench Pro version unspecified" : c.id.includes("programbench") ? "Verified modified evaluation; kept separate from upstream" : "Additional source cohort retained outside default graphs" })),
    ...physical.cohorts.filter((c) => !usedMedical.has(c.id)).map((c) => ({ name: c.id, url: c.source_url, status: "Historical or metadata-only candidate; source notes retained" })),
    { name: "Design Arena Overall Frontend", url: front.cohorts["design-arena-partial-primary-model-observations"].source_url, status: "Unresolved overall board; unsynchronized track observations are not a replacement" },
    ...front.source_only_candidates.map((c) => ({ name: c.name, url: c.url, status: c.status })),
  ];
  coverage.refresh = { schema_version: 1, checked_at: "2026-10-12", card_ids: cards.map((c) => c.id), directory };
  const metadata = clone(oldMetadata);
  function dates(rows, field) {
    const known = rows.map((r) => r[field]).filter((d) => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();
    return { earliest: known[0] || null, latest: known.at(-1) || null, known: known.length, unknown: rows.length - known.length };
  }
  for (const c of cards) metadata.cards[c.id] = {
    evidence: "plotted", cohort: c.historical ? "historical" : "latest_collected",
    cohort_basis: c.historical ? "Fixed source cohort newly covered here; an October source review does not make these experiments new." : "Latest collected cohort for this named source and protocol; completeness and run-date limits remain explicit.",
    discovery_lifecycle: null,
    source_review: { date: "2026-10-12", mode: "parent_primary_research", scope: "Parent-supplied primary-source packet, exact source-only GitHub archive verified; no independent evaluation run." },
    result_packet_checked_at: "2026-10-12", snapshot_at: c.variants[0].snapshot_at || null,
    observation_period_end: c.variants[0].data_end_date || null,
    publication_at: c.variants[0].publication_at || null, publication_label: null,
    evaluations: c.variants.map((v) => ({ slice: v.label, ...dates(v.rows, "evaluation_date") })),
    model_releases: dates(c.variants.flatMap((v) => v.rows), "model_release_date"),
  };
  const values = Object.values(metadata.cards);
  metadata.prepared_at = "2026-10-12";
  metadata.basis = "Earlier source metadata retained; October 12 additions derived from the exact parent source archive, not new evaluations.";
  metadata.counts = {
    all: values.length, plotted: values.filter((c) => c.evidence === "plotted").length,
    current: values.filter((c) => c.evidence === "plotted" && c.cohort === "latest_collected").length,
    historical: values.filter((c) => c.cohort === "historical").length,
    source_only: values.filter((c) => c.evidence === "source_only").length,
    unavailable: values.filter((c) => c.evidence === "unresolved").length,
  };
  const family = new Map(Object.entries(coverage.familyGroups).flatMap(([k, members]) => members.map((id) => [id, k])));
  metadata.counts.default_families = new Set(Object.entries(metadata.cards).filter(([, m]) => m.evidence === "plotted").map(([id]) => family.get(id) || id)).size;
  const notes = Object.fromEntries(cards.map((c) => [c.id, { question: c.question, tests: c.tests, matters: c.matters, read: c.read, date: c.variants[0].data_end_date ? "Observation period ends " + c.variants[0].data_end_date + "; source reviewed October 12" : c.variants[0].snapshot_at ? "Source snapshot " + c.variants[0].snapshot_at + "; reviewed October 12" : c.variants[0].publication_at ? "Source published " + c.variants[0].publication_at + "; reviewed October 12" : "Source reviewed October 12; run dates remain separately labeled" }]));
  return { schema_version: 1, checked_at: "2026-10-12", cards, coverage, metadata, notes,
    source_files: [dir + "frontend.json", dir + "lab-community.json", dir + "medical-robotics.json", dir + "evidence-manifest.json"],
    source_integrities: manifest.files, source_transfer: "Exact parent-supplied public research archived through source-only GitHub commit ba9b01a; Library materialization failed and was not bypassed.",
  };
}
module.exports = build;
if (require.main === module) {
  const output = build();
  for (const [file, data] of [["data/gallery-refresh-projection-2026-10-12.json", output], ["data/gallery-metadata-2026-10-12.json", output.metadata]]) {
    if (process.argv.includes("--check")) assert.deepEqual(read(file), data, file + " committed projection");
    else fs.writeFileSync(path.join(root, file), JSON.stringify(data, null, 2) + "\n");
  }
  console.log(JSON.stringify({ newCards: output.cards.length, sourceArchiveVerified: true, counts: output.metadata.counts }));
}
