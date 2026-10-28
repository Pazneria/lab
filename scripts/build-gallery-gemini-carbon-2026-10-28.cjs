"use strict";
// Offline, versioned delta. Never rewrite earlier reporting cohorts.
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict'), crypto = require('node:crypto');
const root = path.resolve(__dirname, '..'), dir = 'data/gemini-4-carbon-2026-10-28/';
const sourceInput = dir + 'source-packet.json', manifestInput = dir + 'evidence-manifest.json';
const read = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const clone = x => JSON.parse(JSON.stringify(x));
function build() {
  const packet = read(sourceInput), manifest = read(manifestInput), bytes = fs.readFileSync(path.join(root, sourceInput));
  assert.equal(bytes.length, manifest.files[0].bytes);
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), manifest.files[0].sha256);
  assert.equal(packet.checked_at, '2026-10-28');
  assert.equal(packet.aa_index.version, '5.0');
  assert.equal(packet.aa_index.rows.length, 29);
  assert.ok(Math.abs(Object.values(packet.aa_index.weights).reduce((a,b) => a+b,0)-1) < 1e-10);
  const prior = require('./build-gallery-refresh-2026-10-26.cjs')();
  const coverage = clone(prior.coverage), metadata = clone(prior.metadata), notes = {}, additions = [];
  function variant(o, provider) {
    const id = 'gemini-4-carbon-' + provider + '-' + o.id;
    const row = { ...clone(o), label: 'Gemini 4 Carbon (' + (provider === 'google' ? 'highest thinking; source exceptions' : 'High') + ')',
      result_id: id, model_release_date: packet.model.announcement_date, model_id: null,
      effort: packet[provider].effort, raw: clone(o) };
    const metric = { id: 'score', label: o.benchmark, field: 'value', unit: o.unit, domain: clone(o.domain), direction: o.direction };
    if (o.stderr_pp != null) metric.stderr_field = 'stderr_pp';
    return { id, label: 'Carbon / ' + provider.toUpperCase() + ' / ' + o.benchmark, rows: [row], metrics: [metric],
      source_url: o.source_url, source_locator: provider === 'google' ? 'October 2026 evaluation PDF, results page 5 and methods pages 2–4' : 'Named primary model/benchmark table; see raw source record',
      source_input: sourceInput, checked_at: packet.checked_at, evaluation_date: null, snapshot_at: null,
      publication_at: packet[provider].publication_date, complete: false,
      settings: { effort: packet[provider].effort, model_source_key: packet.model.source_key, public_api_id: null, exact_model_snapshot: null,
        availability: packet.model.availability, methodology: o.methodology, sample_size: o.sample_size,
        evidence_role: o.evidence_role || 'independent_evaluator',
        ...(provider === 'aa' ? { methodology_url: packet.aa_index.methodology_url, cost_basis: packet.aa.cost_basis } : {}) },
      limitations: [...packet.limitations, ...(provider === 'vals' ? ['Whiskers show one standard error in percentage points, not a 95% confidence interval.'] : [])],
      coverage: 'One selected Carbon observation from this evaluator and benchmark; not a complete model leaderboard.' };
  }
  const cards = [];
  const descriptions = {
    google: ['Google reported benchmarks', 'What does Google report for Carbon?', 'Select a benchmark from Google’s evaluation PDF. Some results are self-computed and others reproduce external boards.',
      'Each choice is a different task or protocol. External results are attributed to Google’s reproduction. OSWorld uses the maximum of three runs; Agents’ Last Exam excludes the October 26 task update. The ExploitGym table does not identify which reported timeout produced its score.'],
    aa: ['Artificial Analysis benchmarks', 'What has Artificial Analysis measured for Carbon?', 'Select a current AA benchmark or the separate launch coding-agent report. The Intelligence Index has its own comparison card.',
      'AA’s current benchmark payload and its launch coding-agent report use different setups. The launch report uses Antigravity CLI and FrontierCode v1.1; Intelligence Index v5 uses FrontierCode 2.0. Costs and decode-time estimates in raw details have their own definitions and are not generic measured task costs or durations.'],
    vals: ['Vals benchmarks', 'How does Carbon perform in Vals evaluations?', 'Select a Vals benchmark. Percentage scores and one standard error are preserved separately for each evaluation.',
      'The functional VibeCode test measures whether web apps satisfy browser tests. It answers a different question from Arena preference and Design2Code screenshot fidelity. Vals uses benchmark-specific agents; Terminal-Bench uses Mini-SWE-agent and VibeCode uses OpenHands. Only explicitly paired source costs and durations are retained.']
  };
  for (const provider of ['google','aa','vals']) {
    const [name, question, tests, readText] = descriptions[provider];
    cards.push({ id: 'gemini-4-carbon-' + provider + '-report', name: 'Gemini 4 Carbon / ' + name, category: 'standard', question, tests,
      matters: 'Inspect the new model with the evaluator, benchmark and settings attached to each result.',
      read: readText + ' Carbon is in a restricted rollout. Exact evaluation dates and model snapshots remain unavailable. Source review on October 28 is not an evaluation date. No Carbon medical, robotics or driving score was verified in the reviewed sources; unavailable is not zero.',
      historical: false, source_input: sourceInput, source_inputs: [sourceInput], source_packet_checked_at: packet.checked_at,
      variants: packet[provider].observations.map(o => variant(o, provider)) });
    for (const o of packet[provider].observations.filter(o => o.target_card_id)) {
      const target = coverage.cards.find(c => c.id === o.target_card_id);
      assert.ok(target, o.target_card_id);
      const v = variant(o,provider); target.variants.push(v);
      target.source_inputs = [...new Set([...(target.source_inputs || [target.source_input]),sourceInput].filter(Boolean))];
      additions.push({card_id:target.id, variant:clone(v)});
    }
  }
  const arena = clone(prior.projection.cards[0]), a = packet.arena_frontend;
  arena.id = 'webdev-arena-frontend-2026-10-27'; arena.name = 'WebDev Arena / Frontend / October 27';
  arena.question = 'Which generated websites did people prefer in the October 27 Frontend table?';
  arena.tests = 'First 20 of 153 configurations from the Frontend preference table, which reports 829,216 votes.';
  arena.read = 'Carbon’s 1,793 rating is preliminary. This source table is dated October 27, while Carbon was announced October 28; neither date establishes when its evaluation ran. Published bounds have unspecified confidence coverage. Overall and HTML boards are different cohorts. Token prices are not task costs. Earlier dated Frontend tables remain in history.';
  arena.source_input = sourceInput; arena.source_inputs = [sourceInput]; arena.source_packet_checked_at = packet.checked_at;
  const av = arena.variants[0]; av.id = arena.id; av.label = 'October 27 / first 20 of 153 configurations';
  av.rows = a.rows.map(raw => ({...clone(raw), label:raw.model_variant, result_id:raw.source_row_key, source_url:a.source_url, raw:clone(raw)}));
  av.source_input = sourceInput; av.snapshot_at = a.snapshot_at; av.checked_at = packet.checked_at;
  av.source_locator = 'Code / WebDev / Frontend table dated October 27, ranks 1–20';
  av.settings = {...av.settings, displayed_models:a.displayed_models, displayed_total_votes:a.displayed_total_votes,selection:a.selection};
  av.limitations = [arena.read]; av.coverage = a.selection; cards.push(arena);
  coverage.familyGroups['webdev-arena-frontend'].unshift(arena.id);
  metadata.cards['webdev-arena-frontend-2026-10-22'].cohort = 'historical';
  metadata.cards['webdev-arena-frontend-2026-10-22'].cohort_basis = 'Earlier dated preference table retained; no before/after capability claim.';
  const vibe = clone(cards[2]); vibe.id = 'vibe-code-v1-1-carbon'; vibe.name = 'VibeCode v1.1 / Carbon functional web apps'; vibe.category = 'frontend';
  vibe.question = 'Does Carbon build web apps that pass functional browser tests?';
  vibe.tests = 'Vals VibeCode v1.1 with modified OpenHands: browser tests check app requirements, with a five-hour and 1,000-turn budget.';
  vibe.read = descriptions.vals[3] + ' The exact task count, harness commit and evaluation dates were not verified. Rank denominators count models, not test tasks. Bars show one standard error.';
  vibe.variants = [variant(packet.vals.observations.find(o => o.id === 'vibe-code-v1-1'),'vals')]; cards.push(vibe);
  const indexId = 'aa-intelligence-index', indexMetric = {id:'index',label:'AA Intelligence Index v5.0',field:'value',unit:'index points',domain:[0,100],direction:'higher_is_better'};
  const indexRows = packet.aa_index.rows.map(r => ({...clone(r),label:r.model_variant,result_id:'aa-v5-'+r.source_row_key,raw:clone(r)}));
  const v5 = {id:'aa-index-v5-selected',label:'v5.0 / all 29 collected configurations',rows:indexRows,metrics:[indexMetric],source_url:packet.aa_index.source_url,
    source_locator:'Public comparison payload (28 defaults) plus Argon announcement; not all 77 evaluated configurations',source_input:sourceInput,checked_at:packet.checked_at,
    publication_at:null,snapshot_at:null,evaluation_date:null,complete:false,coverage:packet.aa_index.selection,
    settings:{version:'5.0',announcement_date:packet.aa_index.announcement_date,weights:clone(packet.aa_index.weights),protocols:clone(packet.aa_index.protocols),methodology_url:packet.aa_index.methodology_url,changes:packet.aa_index.changes,normalization:packet.aa_index.normalization},
    limitations:[...packet.limitations,'Older index versions cannot be compared numerically with v5; a lower number does not establish a capability regression.','Default shows 12 highest scores among the 29 collected configurations; select the full collected view for all 29. Uncollected or unreported configurations are unavailable, not zero.']};
  const top = clone(v5); top.id = 'aa-index-v5-top12'; top.label = 'v5.0 / top 12 of 29 collected configurations'; top.rows = top.rows.slice(0,12);
  const historical = clone(prior.coverage.cards.find(c => c.id === 'gemini-4-argon-aa-report').variants.find(v => v.id.endsWith('intelligence-index-v4-3-2')));
  historical.label = 'Historical v4.3.2 / Argon only / incomparable with v5';
  cards.push({id:indexId,name:'Artificial Analysis Intelligence Index / v5',category:'standard',question:'How do exact model configurations compare on AA Intelligence Index v5?',
    tests:'Nine evaluations across knowledge work, coding, science and general intelligence. Each capability group contributes 25%. The default shows 12 of 29 collected configurations; all 29 remain selectable.',
    matters:'The current index combines harder tasks and a changed scoring mix. Version labels make the comparison meaningful.',
    read:'v5 was announced October 27. It adds FrontierCode 2.0 and Terminal-Bench-Science, and changes the knowledge and reasoning datasets. Exact effort and fallback labels remain attached to each model. Earlier index scores use different datasets and scoring: a numerical decline is not evidence of a capability regression. The archived v4.3.2 Argon result is a separate history choice. Missing v5 scores are unavailable, not zero. No cross-version trend is calculated.',
    historical:false,source_input:sourceInput,source_inputs:[sourceInput,historical.source_input],source_packet_checked_at:packet.checked_at,variants:[top,v5,historical]});
  coverage.cards.push(...cards);
  for (const c of cards) {
    notes[c.id] = {question:c.question,tests:c.tests,matters:c.matters,read:c.read,date:c.id === arena.id ? 'Source table dated October 27; reviewed October 28, 2026; run dates unavailable' : 'Primary sources reviewed October 28, 2026; run dates unavailable'};
    metadata.cards[c.id] = {evidence:'plotted',cohort:'latest_collected',cohort_basis:'Separate dated source observations; no independently executed evaluation and no cross-version ranking.',discovery_lifecycle:null,
      source_review:{date:packet.checked_at,mode:'primary_source_review',scope:'Named primary source tables, evaluation PDF and AA v5 methodology inspected.'},result_packet_checked_at:packet.checked_at,
      snapshot_at:c.id === arena.id ? a.snapshot_at : null,publication_at:null,publication_label:null,
      evaluations:c.variants.map(v => ({slice:v.label,earliest:null,latest:null,known:0,unknown:v.rows.length})),
      model_releases:{earliest:null,latest:null,known:0,unknown:c.variants.reduce((n,v)=>n+v.rows.length,0)}};
  }
  for (const c of cards) {
    const rows = c.variants.flatMap(v => v.rows), dates = rows.map(r => r.model_release_date).filter(Boolean).sort();
    metadata.cards[c.id].model_releases = {earliest:dates[0] || null,latest:dates.at(-1) || null,known:dates.length,unknown:rows.length-dates.length};
  }
  for (const id of new Set(additions.map(x => x.card_id))) {
    const m = metadata.cards[id]; m.source_review = {date:packet.checked_at,mode:'primary_source_review',scope:'Earlier observations preserved; selected Carbon variant added separately by evaluator and harness.'};
    m.result_packet_checked_at = packet.checked_at; m.publication_at = null; m.snapshot_at = null; m.publication_label = 'Multiple source reports; see separate evaluator cohorts.';
    const rows = coverage.cards.find(c => c.id === id).variants.flatMap(v => v.rows), dates = rows.map(r => r.model_release_date).filter(Boolean).sort();
    m.model_releases = {earliest:dates[0] || null,latest:dates.at(-1) || null,known:dates.length,unknown:rows.length-dates.length};
    for (const x of additions.filter(x => x.card_id === id)) m.evaluations.push({slice:x.variant.label,earliest:null,latest:null,known:0,unknown:1});
  }
  coverage.carbon_updates = {schema_version:1,checked_at:packet.checked_at,model_id:packet.model.source_key,index_version:'5.0',card_ids:cards.map(c=>c.id),augmented_card_ids:[...new Set(additions.map(x=>x.card_id))]};
  metadata.prepared_at = packet.checked_at; metadata.basis = 'Earlier evidence retained; restricted-rollout Carbon observations and a separately versioned AA v5 comparison added.';
  const values = Object.values(metadata.cards);
  metadata.counts = {all:values.length,plotted:values.filter(m=>m.evidence==='plotted').length,current:values.filter(m=>m.evidence==='plotted'&&m.cohort==='latest_collected').length,historical:values.filter(m=>m.cohort==='historical').length,source_only:values.filter(m=>m.evidence==='source_only').length,unavailable:values.filter(m=>m.evidence==='unresolved').length};
  const families = new Map(Object.entries(coverage.familyGroups).flatMap(([k,ids])=>ids.map(id=>[id,k])));
  metadata.counts.default_families = new Set(Object.entries(metadata.cards).filter(([,m])=>m.evidence==='plotted').map(([id])=>families.get(id)||id)).size;
  assert.equal(metadata.counts.all,98); assert.equal(metadata.counts.plotted,89); assert.equal(metadata.counts.default_families,65); assert.equal(coverage.cards.length,64);
  return {coverage,metadata,notes,projection:{schema_version:1,checked_at:packet.checked_at,model:packet.model,cards,cohort_additions:additions,notes,source_files:[sourceInput,manifestInput],source_integrities:manifest.files}};
}
module.exports = build;
if (require.main === module) {
  const out = build();
  for (const [file,value] of [['data/gallery-gemini-carbon-projection-2026-10-28.json',out.projection],['data/gallery-metadata-2026-10-28.json',out.metadata]]) {
    if (process.argv.includes('--check')) assert.deepEqual(read(file),value,file); else fs.writeFileSync(path.join(root,file),JSON.stringify(value,null,2)+'\n');
  }
  console.log(JSON.stringify({cards:out.projection.cards.length,counts:out.metadata.counts}));
}
