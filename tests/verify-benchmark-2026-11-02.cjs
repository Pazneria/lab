"use strict";
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const prior=require('../scripts/build-gallery-gemini-carbon-2026-10-28.cjs')(),next=require('../scripts/build-gallery-refresh-2026-11-02.cjs')();
assert.deepEqual(next.coverage.cards.slice(0,64),prior.coverage.cards);
assert.equal(next.coverage.cards.length,66);assert.equal(next.metadata.counts.all,100);assert.equal(next.metadata.counts.default_families,67);
const [design,vals]=next.projection.cards;assert.equal(design.variants[0].rows.length,15);assert.equal(vals.variants[0].rows.length,32);
assert.deepEqual(design.variants[0].rows.slice(0,4).map(r=>[r.label,r.value,r.battles]),[['Muse Wonder (max)',1370,5668],['Muse Spark 1.3 (xhigh)',1355,30088],['Muse Spark 1.3 Max',1345,26801],['GPT-6 Astra (max)',1337,2773]]);
assert.deepEqual(vals.variants[0].rows.slice(0,3).map(r=>[r.label,r.value]),[['Claude Sonnet 5.5',70.85],['Gemini 4 Carbon',70.45],['Claude Opus 5.5',70.18]]);
assert.equal(vals.variants[0].settings.version_release_date,'2026-10-19');assert.equal(vals.variants[0].snapshot_at,'2026-10-30');assert.equal(design.variants[0].settings.source_snapshot_timestamp,'2026-11-02T14:07:00Z');
for(const c of [design,vals])for(const r of c.variants[0].rows){assert.equal(r.evaluation_date,null);assert.equal(r.latency_seconds,null);assert.equal(r.cost_usd_per_task,null);}
assert.ok(!design.variants[0].metrics[0].interval_field);assert.ok(!design.variants[0].metrics[0].stderr_field);assert.match(design.variants[0].settings.uncertainty,/Wilson/);assert.equal(vals.variants[0].rows.find(r=>r.label==='Beam 1.0').reported_cost_usd_per_test,null);
const s={window:{},URL};vm.runInNewContext(fs.readFileSync('assets/coverage-graphs.js','utf8'),s);assert.equal(s.window.LAB_COVERAGE.valid(next.coverage),true);const bad=structuredClone(next.coverage);bad.november_refresh.card_ids.pop();assert.equal(s.window.LAB_COVERAGE.valid(bad),false);
const a={window:{}};vm.runInNewContext(fs.readFileSync('assets/gallery-data.js','utf8'),a);assert.deepEqual(JSON.parse(JSON.stringify(a.window.LAB_GALLERY.coverage)),next.coverage);
console.log(JSON.stringify({passed:true,designRows:15,valsRows:32,priorCardsPreserved:64}));
