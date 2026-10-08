// CPU-only verification of actual frozen files and the source admission catalog.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {validateManifest,validateGLB,eligiblePairs,createComparisonState} from '../assets/contracts.mjs';
const raw=JSON.parse(readFileSync(new URL('../data/admission.json',import.meta.url)));
const catalog=validateManifest(raw);
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
test('actual canonical prompt text matches exact hashes and keeps Mara and Ivo separate',()=>{
  assert.deepEqual(catalog.prompts.map(p=>p.id),['01','02']);
  for(const p of catalog.prompts)assert.equal(hash(p.text),p.sha256);
  assert.notEqual(catalog.prompts[0].sha256,catalog.prompts[1].sha256);
  for(const e of catalog.entries)assert.equal(e.promptSha256,catalog.prompts.find(p=>p.id===e.promptId).sha256);
});
test('four copied completed GLBs retain source hashes and pass the current compatibility profile',()=>{
  const assets=catalog.entries.filter(e=>e.asset.path);assert.equal(assets.length,4);
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
  for(const e of catalog.entries){const p=e.provenance;
    assert.equal(p.verifiedModel,null);assert.equal(p.verifiedReasoning,null);assert.equal(p.requestedReasoning,'XHIGH');assert.equal(p.timing.timezone,'UTC');assert.equal(p.timing.clockPaused,false);
    assert.equal(Date.parse(p.timing.deadline)-Date.parse(p.timing.implementationStart),3600000);
    assert.ok(Date.parse(p.timing.actualStop)<=Date.parse(p.timing.deadline));assert.ok(p.sourceHandoff&&p.sourceTiming&&p.sourceFiles.length);
    assert.ok(p.producerChecks&&p.hostChecks);
  }
  const mara=catalog.entries.find(e=>e.id==='entry-01-02'),ivo=catalog.entries.find(e=>e.id==='entry-02-02');
  assert.match(mara.provenance.sourceHandoff,/1,923\.1 seconds/);assert.match(mara.provenance.limitations.join(' '),/compact recovery/);
  assert.match(ivo.provenance.sourceTiming,/202\.5s/);assert.match(ivo.provenance.limitations.join(' '),/28 confirmed bounded writes/);
});
