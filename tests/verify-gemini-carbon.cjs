"use strict";
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const packet=read('data/gemini-4-carbon-2026-10-28/source-packet.json');
const prior=require('../scripts/build-gallery-refresh-2026-10-26.cjs')();
const next=require('../scripts/build-gallery-gemini-carbon-2026-10-28.cjs')();
assert.deepEqual(read('data/gallery-gemini-carbon-projection-2026-10-28.json'),next.projection);
assert.deepEqual(read('data/gallery-metadata-2026-10-28.json'),next.metadata);
for(const old of prior.coverage.cards){
 const current=next.coverage.cards.find(c=>c.id===old.id);
 assert.deepEqual(current.variants.slice(0,old.variants.length),old.variants,'Preserve historical source rows, metric definitions and protocols');
 const augmented=next.projection.cohort_additions.some(x=>x.card_id===old.id);
 if(!augmented)assert.deepEqual(current,old,'Unrelated card unchanged');
}
for(const k of ['rune','refresh','model_updates','benchmark_updates','weekly_refresh'])assert.deepEqual(next.coverage[k],prior.coverage[k]);
assert.equal(next.coverage.cards.length,64);assert.equal(next.metadata.counts.all,98);assert.equal(next.metadata.counts.default_families,65);
assert.equal(packet.model.public_api_id,null);assert.equal(packet.model.broad_availability_date,null);
assert.equal(packet.model.announcement_date,'2026-10-28');assert.match(packet.model.availability,/Restricted/);
const card=id=>next.coverage.cards.find(c=>c.id===id);
const index=card('aa-intelligence-index');
assert.deepEqual(index.variants.map(v=>v.rows.length),[12,29,1]);
assert.equal(index.variants[0].settings.version,'5.0');
assert.match(index.variants[2].label,/v4.3.2.*incomparable/);
assert.equal(index.variants[2].rows[0].measurements.index,53);
assert.equal(index.variants[1].rows.find(r=>r.model_variant==='Gemini 4 Argon (High)').value,50);
assert.equal(index.variants[1].rows.find(r=>r.model_variant==='Gemini 4 Carbon (High)').value,59.43);
assert.equal(index.variants[1].rows.find(r=>r.model_variant==='GPT-6.1 Terra (Max)').value,50.98);
assert.ok(index.variants[1].rows.some(r=>r.model_variant==='Claude Sonnet 5.5 (Max, Default Fallback)'));
assert.equal(index.variants[1].rows.find(r=>r.model_variant==='Kimi K3.1 Pro').effort,null);
for(const row of index.variants[1].rows){
 assert.equal(row.evaluation_date,null);assert.equal(row.cost_usd_per_task,null);assert.equal(row.latency_seconds,null);
 assert.ok(Math.abs(row.value-row.raw_value)<=.00500001,'Only declared two-decimal display rounding');
}
const google=packet.google.observations,vals=packet.vals.observations;
assert.equal(google.length,17);assert.equal(vals.length,10);
assert.equal(google.find(o=>o.id==='sec-bench-pro').sample_size,183);
assert.match(google.find(o=>o.id==='osworld-2-1-offline').methodology,/maximum of three/);
assert.match(google.find(o=>o.id==='agents-last-exam-1-1').methodology,/excludes Oct26/);
assert.match(google.find(o=>o.id==='exploitgym').methodology,/attribution remains unresolved/);
assert.equal(google.find(o=>o.id==='vending-bench-2').cost_usd_per_task,null);
assert.equal(vals.find(o=>o.id==='vibe-code-v1-1').latency_seconds,36*60+12);
assert.equal(vals.find(o=>o.id==='terminal-bench-4').latency_seconds,45*60+7);
assert.equal(vals.find(o=>o.id==='vibe-code-v1-1').stderr_pp,2.29);
assert.equal(vals.find(o=>o.id==='terminal-bench-4').stderr_pp,2.20);
assert.equal(vals.find(o=>o.id==='vibe-code-v1-1').sample_size,null,'Model rank denominator is not task count');
const tb=card('terminal-bench-4').variants.filter(v=>v.id.startsWith('gemini-4-carbon'));
assert.deepEqual(tb.map(v=>v.rows[0].value),[65.2,63.13],'Evaluator cohorts must stay separate');
const arena=card('webdev-arena-frontend-2026-10-27').variants[0];
assert.equal(arena.rows.length,20);assert.equal(arena.snapshot_at,'2026-10-27');
assert.deepEqual(arena.rows[2].published_range,[1776,1810]);assert.equal(arena.rows[2].value,1793);assert.equal(arena.rows[2].votes,1861);assert.equal(arena.rows[2].preliminary,true);
assert.equal(arena.settings.displayed_total_votes,829216);assert.equal(arena.settings.displayed_models,153);
assert.equal(next.coverage.familyGroups['webdev-arena-frontend'][0],'webdev-arena-frontend-2026-10-27');
assert.equal(next.metadata.cards['webdev-arena-frontend-2026-10-22'].cohort,'historical');
assert.equal(card('vibe-code-v1-1-carbon').category,'frontend');
for(const o of [...google,...packet.aa.observations,...vals])assert.equal(o.evaluation_date,null);
assert.ok(packet.unavailable_carbon.every(o=>o.value===null));
const sandbox={window:{},URL};vm.runInNewContext(fs.readFileSync(path.join(root,'assets/coverage-graphs.js'),'utf8'),sandbox);
assert.equal(sandbox.window.LAB_COVERAGE.valid(next.coverage),true);
for(const mutate of [x=>x.carbon_updates.index_version='4.3.2',x=>x.carbon_updates.card_ids.pop(),x=>x.carbon_updates.augmented_card_ids.push('fake'),x=>x.cards.find(c=>c.id==='vibe-code-v1-1-carbon').variants[0].rows[0].stderr_pp=-1]){
 const bad=structuredClone(next.coverage);mutate(bad);assert.equal(sandbox.window.LAB_COVERAGE.valid(bad),false);
}
const served={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'assets/gallery-data.js'),'utf8'),served);
assert.deepEqual(JSON.parse(JSON.stringify(served.window.LAB_GALLERY.coverage)),next.coverage);
console.log(JSON.stringify({passed:true,v5Configurations:29,sourceObservations:37,arenaRows:20,newCards:6,preservedCoverageCards:58,benchmarkExecuted:false}));
