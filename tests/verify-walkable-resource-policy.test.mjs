// CPU-only policy construction and frozen-resource integrity. Never executes scenes.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const {scenePolicy,resourceSources,approvedResources}=await import('data:text/javascript;base64,'+readFileSync(new URL('walkable-3d/assets/resource-policy.js',root)).toString('base64'));
const catalog=JSON.parse(readFileSync(new URL('walkable-3d/entries.json',root)));
const baseline=JSON.parse(execFileSync('git',['show','dea1b212144cd109621366b8f7eaef0f6db50dcf:walkable-3d/entries.json'],{cwd:root}));
const folder=id=>`https://pazneria.github.io/lab/walkable-3d/entries/${id}/frozen/`;
const old=(e,f)=>`default-src 'none'; script-src 'unsafe-inline' ${f}; style-src 'unsafe-inline' ${e.allowDataStyles===true?'data: ':''}${f}; img-src data: blob: ${f}; font-src 'none'; connect-src 'none'; media-src 'none'; worker-src 'none'; frame-src 'none'; object-src 'none'; form-action 'none'; base-uri ${f}`;
test('all 111 prior records and default policies remain byte-equivalent',()=>{
 assert.deepEqual(catalog.entries.slice(0,111),baseline.entries);
 for(const e of catalog.entries.filter(e=>!approvedResources[e.id]))assert.equal(scenePolicy(e,folder(e.id)),old(e,folder(e.id)));
});
test('only the approved 30 asset and five font URLs are admitted; every file matches publication manifest and bytes',()=>{
 let fetches=0,fonts=0;
 for(const [id,fields] of Object.entries(approvedResources)){
  const entry=catalog.entries.find(e=>e.id===id),f=folder(id),policy=scenePolicy(entry,f);
  const provenance=JSON.parse(readFileSync(new URL(`walkable-3d/entries/${id}/provenance.json`,root)));
  for(const [field,assets] of Object.entries(fields)){
   assert.equal(resourceSources(entry,field,f),assets.length?assets.map(a=>f+a.relativePath).join(' '):"'none'");
   for(const asset of assets){
    assert.deepEqual(provenance.files['frozen/'+asset.relativePath],{sha256:asset.sha256,bytes:asset.bytes});
    const bytes=readFileSync(new URL(`walkable-3d/entries/${id}/frozen/${asset.relativePath}`,root));
    assert.equal(bytes.length,asset.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);
    assert.ok(policy.includes(f+asset.relativePath));field==='hostFetchAssets'?fetches++:fonts++;
   }
  }
  const neutral={...entry};delete neutral.hostFetchAssets;delete neutral.hostFontAssets;
  assert.equal(policy.replace(/font-src [^;]+/,'font-src NONE').replace(/connect-src [^;]+/,'connect-src NONE'),old(neutral,f).replace(/font-src [^;]+/,'font-src NONE').replace(/connect-src [^;]+/,'connect-src NONE'));
 }
 assert.equal(fetches,30);assert.equal(fonts,5);
});
test('malformed, expanded, sibling-entry, API and external metadata fail closed',()=>{
 const e=catalog.entries.find(e=>e.id==='astra62-01'),f=folder(e.id);
 for(const path of ['../world.json','/world.json','https://evil.example/a','//evil.example/a','world.json?x=1','world.json#x','world%2ejson','world.json; connect-src *','world\\json','*','data:a','blob:a','./world.json','assets/../../world.json','https://walkable-worlds-voting.pazneria.chatgpt.site/api/v1/vote','../astra62-02/frozen/courtyard.mesh']){
  assert.throws(()=>scenePolicy({...e,hostFetchAssets:[path,'world.bin.gz']},f));
 }
 for(const value of [null,[],{},'world.json',['world.json'],['world.json','world.bin.gz','extra.bin']])assert.throws(()=>scenePolicy({...e,hostFetchAssets:value},f));
 assert.throws(()=>scenePolicy({...e,id:'sol62-01'},folder('sol62-01')));
 assert.throws(()=>scenePolicy(e,'https://pazneria.github.io/lab/walkable-3d/entries/sol62-01/frozen/'));
 assert.throws(()=>scenePolicy(e,'https://evil.example/api/'));
});
test('viewer retains sandbox, error-unload and authenticated bridge',()=>{
 const source=readFileSync(new URL('walkable-3d/assets/viewer.js',root),'utf8');
 assert.match(source,/sandbox', 'allow-scripts allow-pointer-lock'/);
 assert.match(source,/securitypolicyviolation.*send\('failed'\)/);
 assert.match(source,/event\.origin !== 'null'/);assert.match(source,/event\.data\.token !== active\.token/);
 assert.match(source,/const csp = scenePolicy\(entry, folder\)/);
});
