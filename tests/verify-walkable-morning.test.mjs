// CPU-only aggregate checks. No scene evaluation, browser, listener or public vote.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
const root=new URL('../',import.meta.url),base='8cf432acad7ed30074928e49654043c64bd2a673';
const catalog=JSON.parse(readFileSync(new URL('walkable-3d/entries.json',root)));
const baseline=JSON.parse(execFileSync('git',['show',`${base}:walkable-3d/entries.json`],{cwd:root}));
const ids=new Set(baseline.entries.map(e=>e.id)),fresh=catalog.entries.filter(e=>!ids.has(e.id)&&e.comparisonModel!=='opus');
const hash=b=>createHash('sha256').update(b).digest('hex');
const launchHashes=['8925bbac5f3e307d6b095ae2b3ce9bda3cd1e83589ed958f0fae60ebdc94e0f2','854b3c28df8c603311ba98b91a7ab735ed6365e610d3365ade63fbb223b5498d','ee887c0d6964f22151bffe3ffbc0589c2766a5c806d93d60ef70614815de9776','c20ca8642b697df1454bc0be8056e6b4eab818f3771b97ec2f1f2538b0d721df','7284d29c88d7f299ff9ec9a24afad0de2bc05fc18f6ba488a963998decad2ccf','06d2d0940bd33a345dbddf7a0407f190704b3cbbe9e7db6aa899c517b3cd072a','04fc5d0b347a300be291332e03671d77a11874e598bff99a965707fc3564dd0c','afce81e406f667458145431a43542d55bae551c6b60282d6fc986c617e09da02'];

test('PR50 records, failures, authentic previews and old prompt versions remain unchanged',()=>{
 assert.equal(baseline.entries.length,57);
 assert.deepEqual(catalog.entries.filter(e=>ids.has(e.id)),baseline.entries);
 assert.deepEqual(catalog.prompts.slice(0,baseline.prompts.length),baseline.prompts);
 assert.deepEqual(catalog.promptVersions.slice(0,baseline.promptVersions.length),baseline.promptVersions);
 assert.deepEqual(catalog.entries.filter(e=>ids.has(e.id)&&e.availability==='failed').map(e=>e.id),baseline.entries.filter(e=>e.availability==='failed').map(e=>e.id));
 assert.equal(baseline.entries.filter(e=>existsSync(new URL(`walkable-3d/entries/${e.id}/preview.jpg`,root))).length,53);
 assert.equal(catalog.entries.filter(e=>existsSync(new URL(`walkable-3d/entries/${e.id}/preview.jpg`,root))).length,81);
 const changes=execFileSync('git',['diff',base,'--name-only','--','walkable-3d/entries/'],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);
 assert.ok(changes.every(p=>!ids.has(p.split('/')[2])),'Existing frozen tree changed');
});

test('morning entries preserve frozen files and requested/runtime distinctions with truthful capture outcomes',()=>{
 assert.equal(fresh.length,24);assert.equal(catalog.entries.length,89);assert.equal(catalog.prompts.length,22);
 for(let scene=15;scene<=22;scene++)assert.deepEqual(fresh.filter(e=>e.promptId===String(scene)).map(e=>e.comparisonModel).sort(),['astra','luna','sol']);
 assert.equal(new Set(catalog.entries.map(e=>e.id)).size,catalog.entries.length);
 const eligible=catalog.entries.filter(e=>e.availability!=='failed');assert.equal(eligible.length,81);
 assert.equal(new Set(eligible.map(e=>`${e.promptId}/${e.comparisonModel}`)).size,eligible.length);
 for(const e of fresh){
  assert.ok(Number(e.promptId)>=15&&Number(e.promptId)<=22);
  assert.ok(['luna','sol','astra'].includes(e.comparisonModel));
  const unavailable=['orison-luna','emberward-luna','reedway-rooms-luna','miras-wayfarer-luna'].includes(e.id);
  assert.equal(e.availability,unavailable?'failed':'ready');assert.equal(e.completionStatus,'completed');
  assert.equal(e.previewAvailable,!unavailable);
  if(unavailable)assert.equal(e.preview,undefined);else assert.equal(e.previewCapture,'preview-capture.json');
  const dir=new URL(`walkable-3d/entries/${e.id}/`,root);
  assert.equal(existsSync(new URL('preview.jpg',dir)),!unavailable);
  assert.equal(existsSync(new URL('frozen/cleanup-results.json',dir)),false);
  assert.equal(existsSync(new URL('frozen/static-check-results.json',dir)),false);
  const p=JSON.parse(readFileSync(new URL('provenance.json',dir)));
  if(unavailable)assert.equal(p.previewCapture.status,'uncaptured');else assert.equal(p.previewCapture,'preview-capture.json');
  for(const [name,record] of Object.entries(p.files)){
   const bytes=readFileSync(new URL(name,dir));assert.equal(hash(bytes),record.sha256,`${e.id}/${name}`);assert.equal(bytes.length,record.bytes);
  }
  assert.equal(hash(readFileSync(new URL('frozen/index.html.txt',dir))),e.htmlSha256);
  assert.equal(hash(readFileSync(new URL('launch-prompt.txt',dir))),launchHashes[Number(e.promptId)-15]);
  const run=JSON.parse(readFileSync(new URL('run-record.json',dir)));
  assert.equal(run.completionClearedByParent,true);assert.equal(run.requestedEffort,'xhigh');assert.equal(run.requestedService,'standard');
  assert.match(e.modelDisclosure,/not independently verified|unverified/i);
  assert.equal(Date.parse(run.deadlineUtc)-Date.parse(run.firstImplementationUtc),3600000);
  assert.ok(Date.parse(run.stopUtc)<=Date.parse(run.deadlineUtc),e.id);
  assert.equal(run.qa.performance,'NOT RUN');
  const before=JSON.parse(readFileSync(new URL('pre-capture-host-run-record.json',dir)));
  for(const key of ['visual','interactive','gpu','performance'])assert.equal(before.qa[key],'NOT RUN');
  assert.equal(before.qa.preview,'UNCAPTURED');
  assert.equal(run.qa.preview,unavailable?'UNCAPTURED':'CAPTURED');
 }
});

test('new prompt comparisons and public model names retain the existing host contract',async()=>{
 const context=vm.createContext({}),module=new vm.SourceTextModule(readFileSync(new URL('walkable-3d/assets/comparisons.js',root),'utf8'),{context});
 await module.link(()=>{});await module.evaluate();
 for(const e of fresh){
  assert.equal(module.namespace.isOpenable(e),e.availability!=='failed');
  assert.equal(module.namespace.modelName(e),e.requestedConfiguration.split('/')[0].trim());
  assert.ok(!/XHIGH|standard/.test(module.namespace.modelName(e)));
 }
 for(const e of catalog.entries.filter(e=>e.comparisonModel==='opus'))assert.equal(module.namespace.modelName(e),'Claude Opus 5.5');
 for(let scene=15;scene<=22;scene++){
  const entries=fresh.filter(e=>e.promptId===String(scene)&&e.availability!=='failed');
  assert.equal(module.namespace.hasRandomComparison(catalog.prompts.filter(p=>p.id===String(scene)),entries),new Set(entries.map(e=>e.comparisonModel)).size>=2);
 }
 const withheld=fresh.filter(e=>e.admissionWithheld);
 assert.deepEqual(withheld.map(e=>e.id).sort(),['emberward-luna','orison-luna']);
 assert.equal(module.namespace.unavailableLabel(withheld.find(e=>e.id==='orison-luna')),'Static dependency incomplete');
 assert.equal(module.namespace.unavailableLabel(withheld.find(e=>e.id==='emberward-luna')),'Withheld: host policy compatibility');
 assert.equal(module.namespace.unavailableSummary(withheld),'2 withheld after static review');
 assert.equal(module.namespace.unavailableLabel(baseline.entries.find(e=>e.availability==='failed')),'Startup failed');
});
