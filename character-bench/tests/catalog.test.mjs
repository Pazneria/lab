// CPU-only verification of actual frozen files and the source admission catalog.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {validateManifest,validateGLB,eligiblePairs,createComparisonState} from '../assets/contracts.mjs';
const raw=JSON.parse(readFileSync(new URL('../data/admission.json',import.meta.url)));
const catalog=validateManifest(raw);
const sourceRecords=JSON.parse(readFileSync(new URL('../data/prompt-sources.json',import.meta.url))).records;
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
test('actual canonical prompt text matches exact hashes and keeps Mara and Ivo separate',()=>{
  assert.deepEqual(catalog.prompts.map(p=>p.id),['01','02','03']);
  for(const p of catalog.prompts)assert.equal(hash(p.text),p.sha256);
  assert.notEqual(catalog.prompts[0].sha256,catalog.prompts[1].sha256);
  for(const e of catalog.entries)assert.equal(e.promptSha256,catalog.prompts.find(p=>p.id===e.promptId).sha256);
});
test('supported original launch-message evidence matches substantive text and requested-model-only constraints',()=>{
  assert.equal(sourceRecords.length,2);
  for(const original of sourceRecords){
    const prompt=catalog.prompts.find(p=>p.id===original.promptId);
    assert.equal(original.text.split(/\n+INITIAL EXECUTION CONSTRAINTS\n/)[0],prompt.text);
    assert.equal(original.sourceDraftBytesVerified,false);assert.ok(original.threadId&&original.messageId);
    const astra=catalog.entries.find(e=>e.promptId===original.promptId&&e.provenance.requestedModel==='gpt-6-astra');
    const reconstructed=prompt.text+'\n\n\nINITIAL EXECUTION CONSTRAINTS\n'+astra.provenance.executionConstraints;
    assert.equal(original.text.replace('Requested model gpt-6.1-sol,','Requested model gpt-6-astra,'),reconstructed);
  }
});
test('actual catalog offers three same-prompt CPU-compatible pairs per character with guarded blind preferences',()=>{
  assert.equal(catalog.entries.filter(e=>e.admission.status==='verified').length,9);
  for(const prompt of catalog.prompts){
    const pairs=eligiblePairs(catalog,prompt.id);assert.equal(pairs.length,3);
    for(const pair of pairs){assert.equal(new Set(pair.map(e=>e.promptId)).size,1);assert.equal(new Set(pair.map(e=>e.provenance.requestedModel)).size,2);
      const state=createComparisonState(pair);assert.equal(state.label(0),'Attempt A');assert.equal(state.vote('a'),false);
      state.setReady(0,true);state.setReady(1,true);assert.equal(state.vote('tie'),true);assert.equal(state.label(0),pair[0].provenance.modelLabel);
    }
  }
});
test('nine copied completed GLBs retain source hashes and pass the current compatibility profile',()=>{
  const assets=catalog.entries.filter(e=>e.asset.path);assert.equal(assets.length,9);
  for(const e of assets){
    const bytes=readFileSync(new URL('../'+e.asset.path,import.meta.url));assert.equal(bytes.length,e.asset.byteLength);assert.equal(hash(bytes),e.asset.sha256);
    const profile=validateGLB(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));
    assert.equal(profile.json.images?.length||0,0);
    assert.ok(profile.vertices>0);
  }
});
test('malformed Luna records cannot be loaded, paired or used to unlock voting',()=>{
  const excluded=catalog.entries.filter(e=>e.admission.status==='invalid');assert.equal(excluded.length,2);
  for(const e of excluded){assert.equal(e.asset.path,undefined);assert.match(e.admission.reason,/No .*repair/i);
    const peer=catalog.entries.find(x=>x.promptId===e.promptId&&x.id!==e.id),state=createComparisonState([peer,e]);
    state.setReady(0,true);state.setReady(1,true);assert.equal(state.vote('a'),false);
  }
  for(const p of catalog.prompts)for(const pair of eligiblePairs(catalog,p.id))assert.ok(pair.every(e=>e.admission.status==='verified'));
});
test('source timings, interruptions, backend uncertainty and check boundaries survive preparation',()=>{
  for(const e of catalog.entries.filter(e=>e.promptId!=='03')){const p=e.provenance;
    assert.equal(p.verifiedModel,null);assert.equal(p.verifiedReasoning,null);assert.equal(p.requestedReasoning,e.id.endsWith('-04')?null:'XHIGH');assert.equal(p.timing.timezone,'UTC');assert.equal(p.timing.clockPaused,false);
    assert.equal(Date.parse(p.timing.deadline)-Date.parse(p.timing.implementationStart),3600000);
    assert.ok(Date.parse(p.timing.actualStop)<=Date.parse(p.timing.deadline));assert.ok(p.sourceHandoff&&p.sourceTiming&&p.sourceFiles.length);
    assert.ok(p.producerChecks&&p.hostChecks);
  }
  const mara=catalog.entries.find(e=>e.id==='entry-01-02'),ivo=catalog.entries.find(e=>e.id==='entry-02-02');
  assert.match(mara.provenance.sourceHandoff,/1,923\.1 seconds/);assert.match(mara.provenance.limitations.join(' '),/compact recovery/);
  assert.match(ivo.provenance.sourceTiming,/202\.5s/);assert.match(ivo.provenance.limitations.join(' '),/28 confirmed bounded writes/);
});
test('dense Claude assets stay unchanged within allocation bounds without a triangle-cap failure or runtime claim',()=>{
  const dense=catalog.entries.filter(e=>e.id.endsWith('-04')&&e.promptId!=='03');assert.equal(dense.length,2);
  for(const entry of dense){const bytes=readFileSync(new URL('../'+entry.asset.path,import.meta.url)),profile=validateGLB(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));
    const triangles=profile.json.meshes.flatMap(mesh=>mesh.primitives).reduce((sum,primitive)=>sum+profile.json.accessors[primitive.indices].count/3,0);
    assert.equal(triangles,entry.asset.triangleCount);assert.ok(triangles>1000000);assert.equal(profile.vertices,entry.asset.vertexCount);
    assert.equal(entry.provenance.sessionReportedModel,'claude-opus-5-5');assert.equal(entry.provenance.requestedReasoning,null);
    assert.match(entry.provenance.runtimeReview,/Pending/);assert.equal(entry.provenance.promptSourceRecord.sourceLaunchTextVerified,false);
  }
  for(const entry of catalog.entries.filter(e=>e.admission.status==='verified')){assert.equal(entry.admission.basis,'CPU static compatibility only');assert.equal(entry.admission.runtimeReview.status,'pending');assert.equal(entry.admission.runtimeReview.gpuPerformance,false);}
  const mara=dense.find(e=>e.promptId==='01'),ivo=dense.find(e=>e.promptId==='02');
  assert.equal(mara.provenance.sourceTimingEvidence.actual_asset_file_last_write_utc,'2026-10-08T21:42:03.9243217Z');assert.match(mara.provenance.limitations.join(' '),/~21:45:30 UTC differs/);
  assert.equal(ivo.provenance.sourceTimingEvidence.asset_editing_stop_utc_claim,'2026-10-08T21:45:34Z');assert.match(ivo.provenance.limitations.join(' '),/ten minutes/);
});
