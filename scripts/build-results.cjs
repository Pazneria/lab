const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const normalizeDisplayText = require("./normalize-display-text.cjs");
const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(path.join(root, "data/results.original.json"));
const input = JSON.parse(raw);
assert.equal(
  fs.readFileSync(path.join(root, "data/results-researcher-readme.md"), "utf8"),
  input.readme,
);
const readmePath = path.join(root, "data/results-researcher-readme.txt");
if (process.argv.includes("--check"))
  assert.equal(fs.readFileSync(readmePath, "utf8"), input.readme);
else fs.writeFileSync(readmePath, input.readme);
const evidence = JSON.parse(
  fs.readFileSync(path.join(root, "data/results-rune-evidence.json")),
);
const { results, graph_views } = input;
assert.equal(
  results.protocols[0].score_formula,
  "round_half_up(max((raw_XP_i - raw_XP_k) / (elapsed_ms_i - elapsed_ms_k) * 60000 / 200)); nearest earlier sample &gt;=12000 ms back",
);
assert.equal(
  results.protocols[0].missing[1],
  "Exact Codex CLI version (author states &gt;=0.159 needed)",
);
assert.equal(results.sources[7].id, "r-pricing");
assert.equal(
  results.sources[7].excerpt,
  "Long-context (&gt;272K) 2x/1.5x not modelled.",
);
const records = new Map(results.records.map((r) => [r.result_id, r]));
const protocols = new Map(results.protocols.map((p) => [p.id, p]));
const sources = new Map(results.sources.map((s) => [s.id, s]));
const near = (a, b, tolerance = 1e-9) =>
  assert.ok(Math.abs(a - b) <= tolerance, `${a} != ${b}`);
const safe = (url) => {
  const u = new URL(url);
  assert.equal(u.protocol, "https:");
  assert.ok(!u.username && !u.password);
};
assert.equal(results.records.length, 18);
assert.equal(records.size, 18);
assert.equal(protocols.size, 3);
assert.equal(sources.size, 27);
assert.equal(results.aggregation.enabled, false);
assert.equal(results.provenance.independently_executed_evaluations, false);
assert.equal(graph_views.charts.length, 7);
assert.equal(new Set(graph_views.charts.map((c) => c.id)).size, 7);
for (const id of ["runebench", "bullshitbench-v2", "medagentbench"])
  assert.equal(results.records.filter((r) => r.benchmark_id === id).length, 6);
const discovery = JSON.parse(
  fs.readFileSync(path.join(root, "data/catalog.original.json")),
);
assert.equal(discovery.entries.length, 20);
for (const r of records.values()) {
  assert.ok(discovery.entries.some((e) => e.id === r.benchmark_id));
  assert.ok(protocols.has(r.protocol_id));
  assert.ok(Number.isFinite(r.value));
  assert.equal(r.model_snapshot_id, null);
  assert.equal(r.independently_rerun, false);
  safe(r.source_url);
  for (const id of r.source_ids) assert.ok(sources.has(id), id);
  if (r.benchmark_id === "bullshitbench-v2") {
    near(r.value, (100 * r.numerator) / r.denominator);
    assert.equal(r.denominator, 100);
    near(
      r.secondary_outcomes[0].value,
      (100 * r.numerator) / (100 - r.refusal_count),
    );
    near(
      r.cost.value / r.cost.covered_response_count,
      r.cost.mean_per_covered_response_usd,
    );
    near(r.time.sum_request_seconds / 100, r.time.mean_request_seconds);
    near(
      (Date.parse(r.evaluation_end) - Date.parse(r.evaluation_start)) / 1000,
      r.time.collection_span_seconds,
      0.0011,
    );
    assert.equal(
      Object.values(r.judge_coverage_counts).reduce((a, b) => a + b, 0),
      100,
    );
    assert.equal(r.graph_eligibility.score_cost, r.cost.complete);
    assert.equal(r.cost.whole_evaluation_total_usd, null);
  }
  if (r.benchmark_id === "medagentbench") {
    assert.equal(r.evaluation_date, null);
    assert.equal(r.cost.value, null);
    assert.equal(r.time.mean_request_seconds, null);
    assert.equal(r.time.wall_clock_seconds, null);
    assert.equal(r.graph_eligibility.score_cost, false);
    assert.equal(r.graph_eligibility.score_latency, false);
    near(
      (r.secondary_outcomes[0].value + r.secondary_outcomes[1].value) / 2,
      r.value,
      0.0051,
    );
  }
}
for (const p of protocols.values())
  for (const id of p.source_ids) assert.ok(sources.has(id), id);
for (const s of sources.values()) {
  safe(s.url);
  if (s.alternate_url) safe(s.alternate_url);
}
let sampleCount = 0;
const clocks = [];
for (const e of evidence.records) {
  const r = records.get(e.result_id);
  assert.ok(r);
  assert.equal(e.source_url, r.source_url);
  assert.equal(e.samples.length, 120);
  assert.equal(e.peakXpRate, r.value);
  assert.deepEqual(e.tokenUsage, r.cost.token_usage);
  near(
    (Date.parse(e.containerFinishedAt) - Date.parse(e.containerStartedAt)) /
      1000,
    r.time.container_elapsed_seconds,
  );
  assert.equal(e.agentStartedAt, r.evaluation_start);
  assert.equal(e.containerFinishedAt, r.evaluation_end);
  clocks.push({
    result_id: r.result_id,
    container_start: e.containerStartedAt,
    agent_start: e.agentStartedAt,
    container_finish: e.containerFinishedAt,
    source_url: e.source_url,
  });
  const usage = r.cost.token_usage,
    rates = r.cost.rate_card_usd_per_million;
  const estimate =
    ((usage.inputTokens - usage.cacheTokens) * rates.input +
      usage.cacheTokens * rates.cached_input +
      usage.outputTokens * rates.output) /
    1e6;
  near(Math.round(estimate * 1e6) / 1e6, r.cost.value);
  near(
    ((r.peak_window.rawDeltaXp / r.peak_window.deltaMs) * 60000) / 200,
    r.peak_window.rawRate,
  );
  assert.equal(Math.round(r.peak_window.rawRate), r.value);
  const chart = graph_views.charts.find(
    (c) => c.id === `runebench-${r.skill}-score-time`,
  );
  const series = chart.series.find((s) => s.result_id === r.result_id);
  assert.equal(series.points.length, 120);
  let best = 0;
  for (let i = 0; i < e.samples.length; i++) {
    const current = e.samples[i];
    assert.ok(current.elapsedMs < 1800000);
    if (i) assert.ok(current.elapsedMs > e.samples[i - 1].elapsedMs);
    for (let k = i - 1; k >= 0; k--)
      if (current.elapsedMs - e.samples[k].elapsedMs >= 12000) {
        best = Math.max(
          best,
          (((current.xp - e.samples[k].xp) /
            (current.elapsedMs - e.samples[k].elapsedMs)) *
            60000) /
            200,
        );
        break;
      }
    assert.equal(series.points[i].elapsed_minutes, current.elapsedMs / 60000);
    assert.equal(series.points[i].peak_normalized_xp_per_min, Math.round(best));
    sampleCount++;
  }
  assert.equal(series.points.at(-1).peak_normalized_xp_per_min, r.value);
  near(
    series.points.at(-1).elapsed_minutes * 60,
    r.time.last_in_window_sample_seconds,
  );
}
assert.equal(sampleCount, 720);
const memberships = {};
for (const c of graph_views.charts) {
  const ids = [];
  if (c.type === "line") {
    assert.deepEqual(c.x.domain, [0, 30]);
    const groups = new Set(
      c.series.map((s) => records.get(s.result_id).comparability_group),
    );
    assert.equal(groups.size, 1);
    for (const s of c.series) ids.push(s.result_id);
  } else
    for (const point of c.points) {
      const r = records.get(point.result_id);
      assert.ok(r);
      assert.equal(point.source_url, r.source_url);
      assert.equal(point.label, r.display_label);
      if (c.type === "bar") {
        assert.equal(point.x, r.value);
        assert.deepEqual(c.x.domain, [0, 100]);
      } else {
        assert.equal(point.y, r.value);
        const cost = c.id.endsWith("-cost");
        assert.equal(
          point.x,
          cost ? r.cost.value : r.time.mean_request_seconds,
        );
        if (r.benchmark_id === "bullshitbench-v2")
          assert.ok(
            cost
              ? r.graph_eligibility.score_cost
              : r.graph_eligibility.score_latency,
          );
        if (r.skill) assert.ok(c.id.includes(r.skill));
      }
      ids.push(point.result_id);
    }
  for (const exclusion of c.excluded || []) {
    assert.ok(records.has(exclusion.result_id));
    assert.ok(!ids.includes(exclusion.result_id));
  }
  memberships[c.id] = ids;
}
assert.equal(memberships["bullshitbench-score-cost"].length, 4);
assert.equal(memberships["bullshitbench-score-time"].length, 6);
assert.equal(graph_views.charts[0].excluded.length, 2);
const projection = normalizeDisplayText({
  ...results,
  graph_views,
  clock_basis: clocks,
  input_provenance:
    "Original researcher JSON and README supplied directly by the parent; supplemental check of the same pinned RuneBench samples. No Library materialization or evaluation runs.",
});
const output =
  "// Generated by scripts/build-results.cjs. Original numeric values remain unchanged.\nwindow.LAB_RESULTS = " +
  JSON.stringify(projection, null, 2) +
  ";\n";
const destination = path.join(root, "assets/results-data.js");
if (process.argv.includes("--check"))
  assert.equal(
    fs.readFileSync(destination, "utf8"),
    output,
    "Stale results projection",
  );
else fs.writeFileSync(destination, output);
fs.mkdirSync(path.join(root, "evidence"), { recursive: true });
const report = {
  checkedAt: new Date().toISOString(),
  inputSHA256: crypto.createHash("sha256").update(raw).digest("hex"),
  records: 18,
  protocols: 3,
  sources: 27,
  charts: 7,
  trackerSamples: sampleCount,
  checks: [
    "All IDs, protocols and exact source references",
    "Six per benchmark, no aggregate or immutable snapshot inference",
    "BullshitBench full/refusal-excluded denominators kept separate; latency and covered-cost arithmetic",
    "Six MedAgentBench missing-cost/time rows stay null; historical evaluation date unknown",
    "RuneBench token-cost, peak formula and all 720 curve points recomputed from the same pinned samples",
    "Container clock proven from containerStartedAt; evaluation_start is agentStartedAt",
    "Exact plot membership, skills, units, domains and Opus exclusions",
  ],
  memberships,
  claimsNotEstablished: [
    "No independent model reruns",
    "No statistical significance or causal effort claims",
    "No pure inference times",
    "No full benchmark invoice",
    "No clinical safety claim",
  ],
};
fs.writeFileSync(
  path.join(root, "evidence/results-data-validation.json"),
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    {
      records: 18,
      sources: 27,
      charts: 7,
      trackerSamples: sampleCount,
      inputSHA256: report.inputSHA256,
      checks: "passed",
    },
    null,
    2,
  ),
);
