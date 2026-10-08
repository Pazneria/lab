// CPU-only preservation checks; never loads an entrant, listener or GPU renderer.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),base='8e2c3b015fd17d853f289db9920d7ddbadf9dd4e';
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

test('the three completed sources have exact canonical launches and honest pending verification',()=>{
 assert.equal(catalog.entries.length,89);
 assert.equal(catalog.entries.filter(e=>e.availability==='failed').length,8);
 for(const [scene,id] of cases){
  const e=catalog.entries.find(e=>e.id===id),dir=new URL(`walkable-3d/entries/${id}/`,root);
  assert.equal(e.promptId,String(scene));assert.equal(e.comparisonModel,'opus');assert.equal(e.completionStatus,'completed');
  assert.equal(e.availability,'unverified');assert.equal(e.previewAvailable,false);assert.equal(existsSync(new URL('preview.jpg',dir)),false);
  const version=catalog.promptVersions.find(v=>v.id===e.promptVersion),canonical=catalog.promptVersions.find(v=>v.id===`${scene}-openai`);
  assert.equal(version.sha256,canonical.sha256);
  assert.equal(hash(readFileSync(new URL(version.path,new URL('walkable-3d/',root)))),canonical.sha256);
  assert.equal(hash(readFileSync(new URL('launch-prompt.txt',dir))),canonical.sha256);
  assert.equal(hash(readFileSync(new URL('frozen/index.html.txt',dir))),e.htmlSha256);
  const run=JSON.parse(readFileSync(new URL('run-record.json',dir)));
  assert.equal(run.verifiedBackendModel,null);assert.equal(run.effectiveEffort,null);assert.equal(run.independentlyVerifiedTiming,false);
  for(const key of ['firstImplementationUtc','deadlineUtc','stopUtc'])assert.equal(run[key],null);
  for(const key of ['visual','interactive','gpu','performance'])assert.equal(run.qa[key],'NOT RUN');
  assert.equal(run.qa.preview,'UNCAPTURED');
 }
 assert.equal(new Set(catalog.entries.filter(e=>e.availability!=='failed').map(e=>`${e.promptId}/${e.comparisonModel}`)).size,81);
});
