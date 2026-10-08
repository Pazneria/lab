// CPU-only admission/preservation checks; no scene evaluation, listener or public vote.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),base='beb653a64706feb4edb105c4b1f5c05f1406e6db';
const catalog=JSON.parse(readFileSync(new URL('walkable-3d/entries.json',root))),baseline=JSON.parse(execFileSync('git',['show',`${base}:walkable-3d/entries.json`],{cwd:root}));
const ids=['pathwarden-rooms-opus','witch-cottage-opus','gilded-tankard-loft-opus'];
const hash=b=>createHash('sha256').update(b).digest('hex');
test('all 81 prior records, frozen trees, prompt definitions and original versions remain unchanged',()=>{
 const priorIds=new Set(baseline.entries.map(e=>e.id));
 assert.deepEqual(catalog.entries.filter(e=>priorIds.has(e.id)),baseline.entries);
 assert.deepEqual(catalog.prompts,baseline.prompts);
 assert.deepEqual(catalog.promptVersions.slice(0,baseline.promptVersions.length),baseline.promptVersions);
 const paths=execFileSync('git',['diff',base,'--name-only','--','walkable-3d/entries/'],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);
 assert.ok(paths.every(p=>!priorIds.has(p.split('/')[2])));
 for(const p of ['walkable-3d/assets/viewer.js','walkable-3d/assets/judgments.js','walkable-3d/assets/public-judgments.js','walkable-3d/assets/public-config.js']){
  assert.equal(readFileSync(new URL(p,root),'utf8').replaceAll('\r\n','\n'),execFileSync('git',['show',`${base}:${p}`],{cwd:root,encoding:'utf8'}));
 }
});
test('three owner-cleared entries preserve canonical launches, genuine captures and unknown backend/effort/timing',()=>{
 assert.equal(catalog.entries.length,89);assert.equal(catalog.entries.filter(e=>e.availability!=='failed').length,81);
 for(const [i,id] of ids.entries()){
  const e=catalog.entries.find(e=>e.id===id),dir=new URL(`walkable-3d/entries/${id}/`,root);
  assert.equal(e.promptId,String(i+15));assert.equal(e.comparisonModel,'opus');assert.equal(e.availability,'ready');assert.equal(e.completionStatus,'completed');
  const v=catalog.promptVersions.find(v=>v.id===e.promptVersion),old=catalog.promptVersions.find(v=>v.id===`${i+15}-openai`);
  assert.equal(v.sha256,old.sha256);assert.equal(hash(readFileSync(new URL(v.path,new URL('walkable-3d/',root)))),old.sha256);
  assert.equal(hash(readFileSync(new URL('launch-prompt.txt',dir))),old.sha256);
  const run=JSON.parse(readFileSync(new URL('run-record.json',dir)));assert.equal(run.verifiedBackendModel,null);assert.equal(run.effectiveEffort,null);assert.equal(run.independentlyVerifiedTiming,false);
  for(const key of ['firstImplementationUtc','deadlineUtc','stopUtc'])assert.equal(run[key],null);
  assert.equal(run.qa.performance,'NOT RUN');assert.equal(run.qa.interactive,'NOT RUN');
  const capture=JSON.parse(readFileSync(new URL('preview-capture.json',dir)));assert.equal(capture.capture.status,'captured');assert.equal(capture.capture.url,`http://127.0.0.1:5197/lab/walkable-3d/?prompt=${i+15}&entry=${id}`);
  assert.equal(capture.foregroundInputUsed,false);assert.equal(capture.performanceBenchmark,false);assert.equal(capture.interactiveRouteQa,false);assert.equal(capture.output.sha256,hash(readFileSync(new URL('preview.jpg',dir))));
 }
});
