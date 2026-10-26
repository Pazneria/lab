// CPU-only preservation, provenance and eligibility checks. Never runs an entrant.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),base='8a6575a2f532d0f96bad590cf87a6659c9b9ea0e';
const read=p=>readFileSync(new URL(p,root));
const catalog=JSON.parse(read('walkable-3d/entries.json'));
const baseline=JSON.parse(execFileSync('git',['show',base+':walkable-3d/entries.json'],{cwd:root}));
const fresh=catalog.entries.filter(e=>e.comparisonModel==='terra');
const hash=b=>createHash('sha256').update(b).digest('hex');
test('all prior records, launch versions, frozen bytes and host voting code remain unchanged',()=>{
 assert.equal(baseline.entries.length,89);assert.equal(catalog.entries.length,111);
 assert.deepEqual(catalog.entries.slice(0,89),baseline.entries);assert.deepEqual(catalog.prompts,baseline.prompts);
 assert.deepEqual(catalog.promptVersions.slice(0,baseline.promptVersions.length),baseline.promptVersions);
 const ids=new Set(baseline.entries.map(e=>e.id));
 const changed=execFileSync('git',['diff',base,'--name-only','--','walkable-3d/entries/'],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);
 assert.ok(changed.every(p=>!ids.has(p.split('/')[2])));
 for(const p of ['walkable-3d/assets/viewer.js','walkable-3d/assets/judgments.js','walkable-3d/assets/public-judgments.js','walkable-3d/assets/public-config.js','walkable-3d/assets/comparisons.js','_config.yml'])assert.equal(read(p).toString().replaceAll('\r\n','\n'),execFileSync('git',['show',base+':'+p],{cwd:root,encoding:'utf8'}));
});
test('exactly one completed requested Terra submission per prompt with unknown effective backend and effort',()=>{
 assert.equal(fresh.length,22);assert.equal(new Set(fresh.map(e=>e.promptId)).size,22);
 for(const e of fresh){
  assert.ok(catalog.prompts.some(p=>p.id===e.promptId));assert.equal(e.completionStatus,'completed');
  const run=JSON.parse(read(`walkable-3d/entries/${e.id}/run-record.json`));
  assert.equal(run.requestedModel,'gpt-6.1-terra');assert.equal(run.requestedEffort,'xhigh');assert.equal(run.requestedService,'standard');
  assert.equal(run.verifiedBackendModel,null);assert.equal(run.effectiveEffort,null);assert.equal(run.independentlyVerifiedTiming,false);
  assert.equal(run.qa.interactive,'NOT RUN');assert.equal(run.qa.performance,'NOT RUN');assert.match(e.modelDisclosure,/not independently verified/);
 }
 for(const id of ['terra-02','terra-16'])assert.match(catalog.entries.find(e=>e.id===id).modelDisclosure,/global Codex config/);
 const eligible=catalog.entries.filter(e=>e.availability!=='failed');assert.equal(eligible.length,103);assert.equal(new Set(eligible.map(e=>e.promptId+'/'+e.comparisonModel)).size,103);
});
test('all published frozen files preserve the mapped original bytes and launch hashes',()=>{
 for(const e of fresh){
  const dir=`walkable-3d/entries/${e.id}/`,p=JSON.parse(read(dir+'provenance.json'));
  assert.equal(hash(read(dir+'frozen/index.html.txt')),e.htmlSha256);
  const version=catalog.promptVersions.find(v=>v.id===e.promptVersion);assert.equal(version.sha256,p.launch.sha256);
  assert.equal(hash(read('walkable-3d/'+version.path)),p.launch.sha256);assert.equal(hash(read(dir+'launch-prompt.txt')),p.launch.sha256);
  for(const [hosted,original] of Object.entries(p.source.runtimeMapping))assert.equal(hash(read(dir+hosted)),p.source.perFileSourceHashes[original].sha256,e.id+'/'+hosted);
  for(const [name,r] of Object.entries(p.files)){assert.equal(hash(read(dir+name)),r.sha256);assert.equal(read(dir+name).length,r.bytes);}
 }
});
test('22 genuine default-view captures retain earlier attempt evidence retain cleanup and QA limits',()=>{
 assert.equal(fresh.filter(e=>e.previewAvailable).length,22);
 const pending=fresh.filter(e=>!e.previewAvailable);assert.deepEqual(pending.map(e=>e.id),[]);
 for(const e of fresh){
  const dir=`walkable-3d/entries/${e.id}/`;
  if(!e.previewAvailable){assert.equal(e.availability,'unverified');assert.equal(existsSync(new URL(dir+'preview.jpg',root)),false);assert.ok(JSON.parse(read(dir+'preview-attempt.json')).interpretation);continue;}
  const c=JSON.parse(read(dir+'preview-capture.json'));assert.equal(c.output.sha256,hash(read(dir+'preview.jpg')));
  assert.equal(c.sourceUnchanged,true);assert.equal(c.hostReadinessObserved,true);assert.equal(c.viewerUnloadedAfterCapture,true);assert.equal(c.captureContextClosed,true);
  assert.equal(c.foregroundInputUsed,false);assert.equal(c.performanceBenchmark,false);assert.equal(c.interactiveRouteQa,false);assert.deepEqual(c.capture.pageErrors,[]);assert.deepEqual(c.capture.consoleErrors,[]);
 }
});
test('raw module hosting aliases close Scene09 dependency paths without altering JavaScript',()=>{
 const e=catalog.entries.find(e=>e.id==='terra-09'),dir=`walkable-3d/entries/${e.id}/`;
 let html=read(dir+'frozen/index.html.txt').toString();for(const [from,to] of e.hostPathReplacements)html=html.split(from).join(to);
 const map=JSON.parse(html.match(/<script type="importmap">(.*?)<\/script>/s)[1]).imports;
 assert.equal(map['three'],'./vendor/three/three.module.js');
 assert.equal(map['./node_modules/three/build/'],'./vendor/three/');
 assert.equal(map['./node_modules/three/examples/jsm/utils/BufferGeometryUtils.js'],'./vendor/three/BufferGeometryUtils.js');
 for(const name of ['three.module.js','three.core.js','BufferGeometryUtils.js'])assert.ok(existsSync(new URL(dir+'frozen/vendor/three/'+name,root)));
});
