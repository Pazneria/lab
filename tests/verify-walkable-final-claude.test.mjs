// CPU-only preservation checks; never loads an entrant, listener or GPU renderer.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),base='24b56265fd66152db98480cd81412677ca164514';
const catalog=JSON.parse(readFileSync(new URL('walkable-3d/entries.json',root)));
const baseline=JSON.parse(execFileSync('git',['show',`${base}:walkable-3d/entries.json`],{cwd:root}));
const cases=[[19,'underwater-apartment-opus'],[21,'dragon-caretaker-opus'],[22,'royal-tailor-opus']];
const hash=b=>createHash('sha256').update(b).digest('hex');

test('all 86 prior records, frozen trees, prompts, host code and auth configuration are preserved',()=>{
 assert.deepEqual(catalog.entries.slice(0,baseline.entries.length),baseline.entries);
 assert.deepEqual(catalog.prompts,baseline.prompts);
 assert.deepEqual(catalog.promptVersions.slice(0,baseline.promptVersions.length),baseline.promptVersions);
 const priorIds=new Set(baseline.entries.map(e=>e.id));
 const changes=execFileSync('git',['diff',base,'--name-only','--','walkable-3d/entries/'],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);
 assert.ok(changes.every(p=>!priorIds.has(p.split('/')[2])));
 for(const name of ['walkable-3d/assets/viewer.js','walkable-3d/assets/judgments.js','walkable-3d/assets/public-judgments.js','walkable-3d/assets/public-config.js','_config.yml']){
  assert.equal(readFileSync(new URL(name,root),'utf8').replaceAll('\r\n','\n'),execFileSync('git',['show',`${base}:${name}`],{cwd:root,encoding:'utf8'}));
 }
});

test('the three completed sources preserve canonical launches, actual default-view captures and remaining QA limits',()=>{
 assert.equal(catalog.entries.length,89);
 assert.equal(catalog.entries.filter(e=>e.availability==='failed').length,8);
 for(const [scene,id] of cases){
  const e=catalog.entries.find(e=>e.id===id),dir=new URL(`walkable-3d/entries/${id}/`,root);
  assert.equal(e.promptId,String(scene));assert.equal(e.comparisonModel,'opus');assert.equal(e.completionStatus,'completed');
  assert.equal(e.availability,'ready');assert.equal(e.previewAvailable,true);assert.equal(existsSync(new URL('preview.jpg',dir)),true);
  const version=catalog.promptVersions.find(v=>v.id===e.promptVersion),canonical=catalog.promptVersions.find(v=>v.id===`${scene}-openai`);
  assert.equal(version.sha256,canonical.sha256);
  assert.equal(hash(readFileSync(new URL(version.path,new URL('walkable-3d/',root)))),canonical.sha256);
  assert.equal(hash(readFileSync(new URL('launch-prompt.txt',dir))),canonical.sha256);
  assert.equal(hash(readFileSync(new URL('frozen/index.html.txt',dir))),e.htmlSha256);
  const run=JSON.parse(readFileSync(new URL('run-record.json',dir)));
  assert.equal(run.verifiedBackendModel,null);assert.equal(run.effectiveEffort,null);assert.equal(run.independentlyVerifiedTiming,false);
  for(const key of ['firstImplementationUtc','deadlineUtc','stopUtc'])assert.equal(run[key],null);
  for(const key of ['interactive','performance'])assert.equal(run.qa[key],'NOT RUN');
  assert.equal(run.qa.preview,'CAPTURED');
  const before=JSON.parse(readFileSync(new URL('pre-capture-host-run-record.json',dir)));
  for(const key of ['visual','interactive','gpu','performance'])assert.equal(before.qa[key],'NOT RUN');
  assert.equal(before.qa.preview,'UNCAPTURED');
  const capture=JSON.parse(readFileSync(new URL('preview-capture.json',dir)));
  assert.equal(capture.capture.status,'captured');assert.equal(capture.capture.url,`http://127.0.0.1:5197/lab/walkable-3d/?prompt=${scene}&entry=${id}`);
  assert.equal(capture.foregroundInputUsed,false);assert.equal(capture.performanceBenchmark,false);assert.equal(capture.interactiveRouteQa,false);
  assert.equal(capture.output.sha256,hash(readFileSync(new URL('preview.jpg',dir))));
  assert.equal(capture.sourceUnchanged,true);assert.equal(capture.capture.contextClosed,true);assert.equal(capture.capture.viewerUnloaded,true);
 }
 assert.equal(new Set(catalog.entries.filter(e=>e.availability!=='failed').map(e=>`${e.promptId}/${e.comparisonModel}`)).size,81);
});
