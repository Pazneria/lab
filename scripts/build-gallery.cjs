const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const normalizeDisplayText = require('./normalize-display-text.cjs');
const root = path.resolve(__dirname, '..');
const read = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
const sha = name => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, name))).digest('hex');
const standard = read('data/gallery-current-2026-10-01.json');
const notes = read('data/gallery-notes.json');
const catalog = read('data/catalog.original.json');
const originalResults = read('data/results.original.json');
const community = read('data/community-expanded-2026-10-01.json');
const medical = read('data/current-medical.original.json');
const preservedHashes = {
  'data/catalog.original.json': '261e704c6076c5c85b698fefd9a4135d61049e56377d01d42c14aae28800ce85',
  'data/results.original.json': 'dd9164301b95d503eda9f467fa6411e375b25e5ba0c9a3d9ec475e58ba3c68d3',
  'data/standard-benchmarks.original.json': 'f60fae368dee3dbcf408473e68abcc207850b7b7ce33f75c9a222eda7a24627d',
};
for (const [name, hash] of Object.entries(preservedHashes)) assert.equal(sha(name), hash, `${name} original bytes changed`);
function safeURL(url) {
  const u = new URL(url);
  assert.equal(u.protocol, 'https:');
  assert.equal(u.username, '');
  assert.equal(u.password, '');
}
const expectedCounts = {
  'hle-diamond': 9, 'gpqa-diamond': 157, 'mmmu-pro': 20,
  'swe-bench-pro-public-v1': 4, 'terminal-bench-2': 4, 'frontiermath-tier4-v2': 2,
  'gpqa-diamond-march-reported': 4, 'mmmu-pro-march-reported': 4,
  'frontiermath-tier4-v2-september-reported': 5, 'frontiermath-tier4-v2-task-2-0-0': 67,
  'healthbench-professional': 7, 'medagentbench-v2-revised-original-tasks': 1,
  'medagentbench-v2-memory-heldout': 1, 'medagentbench-v2-new-tasks': 1,
  'swe-bench-pro-public-v2': 10, 'swe-bench-pro-public-v2-hard': 11,
  'terminal-bench-4': 6, 'terminal-bench-science': 7,
  'terminal-bench-4-native-agents': 7, 'terminal-bench-science-native-agents': 5,
  'swe-bench-verified-bash-history': 5, 'terminal-bench-2-1-history': 3,
};
assert.equal(standard.schema_version, 1);
assert.equal(standard.researched_at, '2026-10-01');
assert.equal(standard.cards.length, 22);
assert.equal(standard.cards.reduce((n, c) => n + c.rows.length, 0), 340);
assert.deepEqual(standard.cards.map(c => c.id), Object.keys(expectedCounts));
for (const source of Object.values(standard.sources)) safeURL(source.url);
for (const c of standard.cards) {
  assert.ok(['standard', 'medical'].includes(c.category));
  assert.equal(c.unit, 'percent');
  assert.equal(c.direction, 'higher_is_better');
  assert.deepEqual(c.scale, [0, 100]);
  assert.ok(standard.sources[c.source_id]);
  if (c.definition_source_id) assert.ok(standard.sources[c.definition_source_id]);
  assert.equal(c.rows.length, expectedCounts[c.id]);
  assert.equal(new Set(c.rows.map(r => r.model_variant)).size, c.rows.length);
  assert.equal(c.history, c.display_status === 'historical_source_cohort');
  if (c.display_defaults) {
    assert.equal(c.display_defaults.row_limit, 12);
    assert.equal(c.display_defaults.show_all_available, true);
    assert.equal(c.display_defaults.search_configurations, true);
  }
  for (const r of c.rows) {
    assert.ok(typeof r.model_variant === 'string' && r.model_variant);
    assert.ok(Number.isFinite(r.value) && r.value >= 0 && r.value <= 100);
    // Incompatible cost/time bases are kept in details, outside generic plots.
    assert.equal(r.cost_usd, null);
    assert.equal(r.latency_seconds, null);
    safeURL(r.source_url);
    assert.equal(r.source_url, standard.sources[c.source_id].url);
    if (r.source_input) {
      assert.ok(/^data\/[a-z0-9.-]+\.json$/.test(r.source_input));
      assert.ok(fs.existsSync(path.join(root, r.source_input)));
    }
    if (r.raw_record) assert.equal(r.value, r.raw_record.score_percent);
    if (r.reported_cost?.value != null) assert.ok(r.reported_cost.basis);
    if (r.reported_time?.value != null) assert.ok(r.reported_time.basis);
    if (c.id === 'hle-diamond') {
      assert.equal(r.effort, 'high');
      assert.ok(Math.abs((r.reasoning_percent + r.knowledge_percent) / 2 - r.value) < 1e-10);
    }
    if (c.id === 'mmmu-pro') {
      assert.equal(r.evaluation_date, null);
      assert.ok(Math.abs(r.raw_score * 100 - r.value) < 1e-10);
    }
    if (c.source_id === 'epoch_current') {
      assert.equal(r.cohort_id, c.comparison_group);
      assert.ok(r.result_id && r.model_identifier && r.exact_source_model_variant);
      if (r.stderr_percentage_points != null) assert.ok(r.stderr_percentage_points >= 0);
    }
  }
}
const old = read('data/standard-benchmarks.original.json');
for (const id of ['hle-diamond', 'swe-bench-pro-public-v1', 'terminal-bench-2'])
  assert.deepEqual(standard.cards.find(c => c.id === id).rows, old.cards.find(c => c.id === id).rows);
for (const [id, suffix] of [['gpqa-diamond', '-march-reported'], ['mmmu-pro', '-march-reported'], ['frontiermath-tier4-v2', '-september-reported']])
  assert.deepEqual(standard.cards.find(c => c.id === id + suffix).rows, old.cards.find(c => c.id === id).rows);
const latestMath = standard.cards.find(c => c.id === 'frontiermath-tier4-v2');
assert.deepEqual(new Set(latestMath.rows.map(r => r.model_identifier)), new Set(['claude-sonnet-5-5_max', 'gpt-6.1-sol_max']));
assert.ok(latestMath.rows.every(r => r.task_version === '2.1.0'));
assert.ok(standard.cards.find(c => c.id === 'frontiermath-tier4-v2-task-2-0-0').rows.every(r => r.task_version === '2.0.0'));
const ids = [...catalog.entries.map(e => e.id), ...standard.cards.map(c => c.id)];
assert.equal(new Set(ids).size, 42);
assert.deepEqual(new Set(Object.keys(notes)), new Set(ids));
for (const id of ids) { assert.ok(notes[id].matters); assert.ok(notes[id].read); }
assert.equal(originalResults.results.records.length, 18);
assert.equal(originalResults.graph_views.charts.length, 7);
assert.equal(community.bullshitbench.records.length, 228);
assert.equal(community.runebench.records.length, 48);
assert.equal(community.runebench.display_defaults.skills_available.length, 16);
assert.ok(community.bullshitbench.records.every(r => r.evaluation_date === null));
assert.equal(medical.medagentbench_original.rows.length, 12);
const output = {
  standard, notes, expanded: normalizeDisplayText({...community, medical}),
  provenance: {
    input: 'Public source snapshots and complete parent-relayed research packets. Library materialization failed on Windows os.setxattr; no successful transfer claimed.',
    verification: 'Epoch CSV and pinned community CSV/JSON independently parsed. MMMU and coding research relayed by parent. Medical author tables and corrected HealthBench report reopened. Offline checks validate cohort membership, units, missing data and preserved originals.',
    independentlyExecuted: false,
    sourceFiles: ['data/current-reasoning-epoch.json', 'data/current-mmmu-pro.original.json', 'data/current-coding.original.json', 'data/current-medical.original.json', 'data/community-expanded-2026-10-01.json', 'data/refresh-packets/manifest.json'],
    rendererContract: 'data/gallery-renderer-contract-2026-10-01.json',
  },
};
const js = '/* Generated by scripts/build-gallery.cjs; preserve original source data. */\nwindow.LAB_GALLERY = ' + JSON.stringify(output, null, 2).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029') + ';\n';
const sandbox = {window: {}};
vm.runInNewContext(js, sandbox);
assert.deepEqual(JSON.parse(JSON.stringify(sandbox.window.LAB_GALLERY)), output);
if (process.argv.includes('--check')) assert.equal(fs.readFileSync(path.join(root, 'assets/gallery-data.js'), 'utf8'), js, 'Generated asset differs');
else fs.writeFileSync(path.join(root, 'assets/gallery-data.js'), js);
const evidence = {cards: 42, sourceCohorts: 22, standardRows: 340, expandedBullshitBenchRows: 228, expandedRuneBenchRows: 48, runeSkills: 16, historicalMedAgentRows: 12, existingResultRows: 18, existingCharts: 7, scoreChartCostTime: 'All 340 generic plot values null; known coding measurements retained with units and bases in details', unchangedOriginalHashes: true, inputSHA256: {'data/gallery-current-2026-10-01.json': sha('data/gallery-current-2026-10-01.json'), 'data/community-expanded-2026-10-01.json': sha('data/community-expanded-2026-10-01.json')}, passed: true};
fs.mkdirSync(path.join(root, 'evidence'), {recursive: true});
if (!process.argv.includes('--check')) fs.writeFileSync(path.join(root, 'evidence/gallery-data-validation.json'), JSON.stringify(evidence, null, 2) + '\n');
console.log(JSON.stringify(evidence));
