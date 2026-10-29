import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {validateManifest,validateGLB,eligiblePairs,createComparisonState} from '../assets/contracts.mjs';
import {shortBrief} from '../assets/briefs.mjs';
import {inspectableEntry} from '../assets/inspect.mjs';
const raw=JSON.parse(readFileSync(new URL('../data/admission.json',import.meta.url)));
const catalog=validateManifest(raw),batch=catalog.entries.filter(e=>e.id.startsWith('entry-20261029-'));
const hash=x=>createHash('sha256').update(x).digest('hex');
test('all 63 original exports and 15 new prompt texts remain exact and CPU-compatible',()=>{
 assert.equal(catalog.entries.length,75);assert.equal(catalog.prompts.length,18);assert.equal(batch.length,63);
 const expected=JSON.parse(readFileSync(new URL('../data/historical-records-sha256.json',import.meta.url)));
 for(const kind of ['prompts','entries'])for(const [id,sha]of Object.entries(expected[kind]))assert.equal(hash(JSON.stringify(raw[kind].find(e=>e.id===id))),sha,id+' historical record changed');
 for(const p of catalog.prompts){assert.equal(hash(p.text),p.sha256);assert(shortBrief(p).length<1600);}
 let images=0;
 for(const e of batch){const bytes=readFileSync(new URL('../'+e.asset.path,import.meta.url));assert.equal(hash(bytes),e.asset.sha256);assert.equal(bytes.length,e.asset.byteLength);
  const profile=validateGLB(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));images+=profile.json.images?.length||0;
  assert.equal(inspectableEntry(catalog,e.id)?.id,e.id);assert.equal(e.provenance.hostEvidence.result.parser,true);assert.equal(e.provenance.hostEvidence.result.sourceHashUnchanged,true);
  assert.equal(e.provenance.verifiedModel,null);assert.equal(e.provenance.verifiedServiceTier,null);
 }
 assert.equal(images,54);assert.equal(inspectableEntry(catalog,'https://example.com/asset.glb'),null);
});
test('all new attempts are viewable but cannot vote against the unchanged published service',()=>{
 for(const e of batch){assert.equal(e.votingAvailable,false);assert.match(e.votingUnavailableReason,/service/);}
 const active=catalog.prompts.flatMap(p=>eligiblePairs(catalog,p.id));assert.equal(active.length,12);
 assert(active.flat().every(e=>!e.id.startsWith('entry-20261029-')));
 const e=batch[0],peer=catalog.entries.find(p=>p.promptId===e.promptId&&p.provenance.requestedModel!==e.provenance.requestedModel&&p.admission.status==='verified');
 const state=createComparisonState([e,peer]);state.setReady(0,true);state.setReady(1,true);assert.equal(state.vote('a'),false);
 // Simulate a future service admission without changing the public manifest.
 const future=validateManifest({...raw,entries:raw.entries.map(e=>({...e,votingAvailable:true}))});
 for(const p of future.prompts)for(const pair of eligiblePairs(future,p.id))assert.notEqual(pair[0].provenance.requestedModel,pair[1].provenance.requestedModel);
 const variant=batch.find(e=>e.provenance.batchAttemptId==='05-v1-astra');assert.equal(variant.comparisonEligible,false);assert.equal(variant.admission.status,'pending');
 assert(!future.prompts.flatMap(p=>eligiblePairs(future,p.id)).flat().some(e=>e.id===variant.id));
});
test('new disclosures retain real model defects, receipt corrections and unverified visuals',()=>{
 const entry=id=>batch.find(e=>e.provenance.batchAttemptId===id);
 assert.match(JSON.stringify(entry('12-v1-luna')),/Z-up/);
 assert.match(JSON.stringify(entry('11-v1-luna')),/661\.9489/);
 assert.match(JSON.stringify(entry('12-v1-terra')),/no matching render files/i);
 assert.match(JSON.stringify(entry('15-v1-astra')),/predate|pre-date|older|stale/i);
 for(const e of batch){assert.equal(e.admission.runtimeReview.visualAdmission,false);assert.match(e.provenance.hostChecks,/No renderer/);assert(!/[A-Z]:[\\/](Users|Temp)|\/Users\/|\/home\//.test(JSON.stringify(e)));}
});
