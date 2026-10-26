"use strict";
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const p=read('data/benchmark-refresh-2026-10-26/source-packet.json');
const prior=require('../scripts/build-gallery-refresh-2026-10-19.cjs')();
const next=require('../scripts/build-gallery-refresh-2026-10-26.cjs')();
assert.deepEqual(next.coverage.cards.slice(0,prior.coverage.cards.length),prior.coverage.cards);
assert.deepEqual(next.coverage.rune,prior.coverage.rune);
assert.deepEqual(next.coverage.benchmark_updates,prior.coverage.benchmark_updates);
assert.deepEqual(next.coverage.model_updates,prior.coverage.model_updates);
assert.deepEqual(next.coverage.refresh,prior.coverage.refresh);
assert.deepEqual(read('data/gallery-refresh-projection-2026-10-26.json'),next.projection);
assert.deepEqual(read('data/gallery-metadata-2026-10-26.json'),next.metadata);
assert.equal(next.coverage.cards.length,58);
assert.equal(next.metadata.counts.all,92);
assert.equal(next.metadata.counts.default_families,60);
const added=next.projection.cards;
assert.deepEqual(added.map(c=>c.id),['webdev-arena-frontend-2026-10-22','healthbench-professional-october-deployment','mentalhealthbench-october-deployment']);
assert.deepEqual(added.map(c=>c.variants[0].rows.length),[20,5,6]);
assert.deepEqual(p.arena_frontend.rows.map(r=>r.rank),Array.from({length:20},(_,i)=>i+1));
assert.deepEqual(p.arena_frontend.rows.slice(0,5).map(r=>[r.model_variant,r.value,r.published_plus_minus,r.votes]),[
 ['Claude Opus 5.5 (Max)',1849,16,2307],['Claude Sonnet 5.5 (xHigh)',1808,14,2969],['GPT-6 Astra (Max)',1795,11,5195],['Claude Fable 5.1 (Max)',1776,10,6364],['GPT-6.1 Sol (Max)',1767,14,2778]]);
for(const r of p.arena_frontend.rows){
 assert.deepEqual(r.published_range,[r.value-r.published_plus_minus,r.value+r.published_plus_minus]);
 assert.equal(r.evaluation_date,null);assert.equal(r.harness_version,null);assert.equal(r.cost_usd_per_task,null);assert.equal(r.latency_seconds,null);
}
assert.equal(p.arena_frontend.displayed_models,151);assert.equal(p.arena_frontend.displayed_total_votes,807096);
assert.equal(added[0].variants[0].complete,false);
const health=added[1].variants[0],mental=added[2].variants[0];
assert.deepEqual(health.rows.map(r=>[r.value,r.unadjusted_value,r.mean_response_length_characters]),[[38.4,40.7,2775],[54,56.6,2894],[44.1,46.8,2920],[55.2,62.2,4360],[48.2,57.8,5289]]);
assert.deepEqual(health.metrics.map(m=>m.field),['value','unadjusted_value']);
assert.equal(health.settings.reasoning_effort,null);
assert.deepEqual(mental.rows.map(r=>[r.value,r.stderr_pp]),[[49.38,.93],[53.93,.93],[47.53,.97],[45.11,.95],[48.81,.97],[51.73,.96]]);
assert.equal(mental.settings.tasks,1215);assert.equal(mental.settings.samples_per_task,4);
assert.equal(mental.metrics[0].stderr_field,'stderr_pp');assert.match(mental.settings.reasoning_effort,/lowest reasoning/);
for(const c of added)for(const v of c.variants)for(const r of v.rows){assert.equal(r.evaluation_date,null);assert.equal(r.model_release_date,null);}
for(const id of ['webdev-arena-frontend-2026-10-18','healthbench-professional-openai-20260929','mentalhealthbench'])assert.equal(next.metadata.cards[id].cohort,'historical');
assert.equal(next.coverage.familyGroups['webdev-arena-frontend'][0],added[0].id);
assert.equal(next.coverage.familyGroups['healthbench-professional'][0],added[1].id);
assert.deepEqual(next.coverage.familyGroups.mentalhealthbench,[added[2].id,'mentalhealthbench']);
const sha=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'data/benchmark-refresh-2026-10-26/source-packet.json'))).digest('hex');
const sandbox={window:{},URL};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/coverage-graphs.js'),'utf8'),sandbox);
assert.equal(sandbox.window.LAB_COVERAGE.valid(next.coverage),true);
for(const mutate of [x=>x.weekly_refresh.card_ids.pop(),x=>x.weekly_refresh.checked_at='2026-10-19',x=>x.cards.at(-1).variants[0].rows[0].stderr_pp=-1]){
 const bad=structuredClone(next.coverage);mutate(bad);assert.equal(sandbox.window.LAB_COVERAGE.valid(bad),false);
}
const asset={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'assets/gallery-data.js'),'utf8'),asset);
assert.deepEqual(JSON.parse(JSON.stringify(asset.window.LAB_GALLERY.coverage)),next.coverage);
assert.equal(asset.window.LAB_GALLERY.provenance.presentationMetadata,'data/gallery-metadata-2026-10-26.json');
console.log(JSON.stringify({passed:true,sourceSHA256:sha,addedRows:31,priorCoverageCardsUnchanged:55,directCards:92,families:60,rendererIntegrated:true,benchmarkExecuted:false}));
