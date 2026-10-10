import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {validateManifest,eligiblePairs} from '../assets/contracts.mjs';
const raw=JSON.parse(readFileSync(new URL('../data/admission.json',import.meta.url)));
const evidence=JSON.parse(readFileSync(new URL('../data/farid-source-evidence.json',import.meta.url)));
const manifest=validateManifest(raw);
test('Farid v2 preserves exact rubric/common hash and three distinct completed attempts',()=>{
 const p=manifest.prompts.find(p=>p.id==='03');assert.equal(p.sha256,'e6c8206eda3e42ba7e2c68c5e37cfb26b5e95e0d83ac2ef7cd4b3896507c2767');
 assert.equal(createHash('sha256').update(p.text).digest('hex'),p.sha256);assert.match(p.text,/DRAFT V2/);assert.match(p.text,/Visual execution.*45 points/);assert(!p.text.endsWith('\n'));
 const entries=manifest.entries.filter(e=>e.promptId==='03');assert.equal(entries.length,3);assert.equal(eligiblePairs(manifest,'03').length,3);
 for(const e of entries){assert.equal(e.provenance.verifiedModel,null);assert.equal(e.provenance.verifiedReasoning,null);assert.equal(e.promptSha256,p.sha256);assert.equal(Date.parse(e.provenance.timing.deadline)-Date.parse(e.provenance.timing.implementationStart),3600000);assert(Date.parse(e.provenance.timing.actualStop)<=Date.parse(e.provenance.timing.deadline));}
 const replacements=entries.filter(e=>e.provenance.attemptKind==='fresh replacement');assert.equal(replacements.length,2);
 for(const e of replacements){assert.equal(e.provenance.promptMapping.submittedLaunchSha256,'fdc1d6b720765ee56d29ffa8887252c7bf19cb34e0d65543dd40e56be591a037');assert.equal(e.provenance.promptMapping.byteIdenticalOriginalLaunch,false);assert.match(e.provenance.promptMapping.rationale,/four U\+2014/);assert.match(e.provenance.limitations.join(' '),/not the failed original/);}
 const claude=entries.find(e=>e.id==='entry-03-04');assert.equal(claude.provenance.attemptKind,'frozen original');assert.equal(claude.provenance.requestedReasoning,null);assert.equal(claude.provenance.promptMapping.submittedLaunchSha256,null);assert.equal(claude.provenance.promptMapping.byteIdenticalOriginalLaunch,null);
 assert(evidence.excludedOriginals.every(e=>!e.eligible));assert.match(evidence.excludedOriginals.find(e=>e.model==='Luna requested').status,/unresolved/);
});
