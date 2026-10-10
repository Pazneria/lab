import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {createHash} from 'node:crypto';
import {prepareAsset,evaluateInspection} from '../animation-studio/rig-review/source/inspection.mjs';
import {deform} from '../animation-studio/rig-review/source/core.mjs';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),html=read('../animation-studio/index.html'),sha=b=>createHash('sha256').update(b).digest('hex');
const block=(s,id)=>JSON.parse(s.match(new RegExp('<script id="'+id+'" type="application/json">([\\s\\S]*?)</script>'))[1]);
const bundle=block(html,'bundle-data'),child=block(html,'motion-editor-data'),human=block(child.html,'bundle-data');
for(const record of [...bundle.records,bundle.candidate])test(record.id+': public GLB hash, hierarchy and finite bind/deformation preserved',()=>{
 const bytes=Buffer.from(record.data,'base64');assert.equal(sha(bytes),record.sha256);assert.equal(bytes.length,record.bytes);assert.equal(bytes.toString('ascii',0,4),'glTF');
 const asset=prepareAsset(bytes,record,bundle.motion.document,bundle.motion);
 assert.equal(asset.rows.length,asset.model.nodes.length);assert.ok(asset.bindGeometry.length);for(const g of asset.bindGeometry)assert.ok(Array.from(g.positions).every(Number.isFinite));
 if(asset.clips.length){const result=deform(asset.model,evaluateInspection(asset.model,asset.clips[0],asset.clips[0].duration*.5));assert.ok(result.length);for(const g of result)assert.ok(Array.from(g.positions).every(Number.isFinite));}
});
test('public studio is interactive, offline and free of machine/Library metadata',()=>{
 assert.match(html,/<title>Lab Animation Studio<\/title>/);assert.match(html,/Lab \/ Animation studio/);assert.doesNotMatch(html,/<img\b/i);assert.match(html,/connect-src 'none'/);assert.doesNotMatch(html,/[A-Z]:\\\\Users\\\\|libfile_[a-z0-9]+/i);assert.equal(bundle.studioIntake,undefined);assert.equal(bundle.ownerReceipt,undefined);
 for(const code of [html,child.html].map(s=>s.match(/<script type="module">([\s\S]*?)<\/script>/)[1]))new vm.SourceTextModule(code);
});
test('delivered original/proposed/held gates and original timing remain unchanged',()=>{
 const all=[...bundle.records,bundle.candidate];assert.equal(all.length,28);assert.equal(all.filter(r=>r.activeBindingAllowed===false&&!r.requiresReviewOptIn).length,2);assert.equal(all.filter(r=>r.requiresReviewOptIn).length,6);assert.equal(all.filter(r=>r.activeBindingAllowed!==false&&!r.requiresReviewOptIn).length,20);
 assert.equal(sha(Buffer.from(bundle.motion.data,'base64')),'bfac4a0a9f04ee74a19b0e7e0314ca2ae6342667c487542cf9abb01db5a38088');assert.doesNotMatch(html.match(/<input id="reviewOptIn"[^>]*>/)[0],/checked/);assert.match(html,/Proposals require explicit opt-in and stay unaccepted/);
});
test('Human authoring payloads and original-versus-refined source retain exact hashes',()=>{
 for(const [key,p] of Object.entries(human.provenance)){if(key==='motion'){assert.equal(p.sha256,bundle.motion.sha256);assert.deepEqual(human.motion,bundle.motion.document);}else if(human.assets[key])assert.equal(sha(Buffer.from(human.assets[key],'base64')),p.sha256);}
 assert.match(child.html,/setHumanStudyActive/);assert.match(child.html,/humanStudyRequested/);assert.match(html,/Models &amp; rigs/);assert.match(html,/Human01 study/);
});
test('public route includes visible counter entry and same-origin Back to Lab',()=>{
 const lab=read('../lab-space/index.html'),control=read('../lab-space/assets/production-space.js');assert.match(lab,/id="access-animation"/);assert.match(lab,/small skeleton/);assert.match(html,/id="backToLab"/);assert.match(control,/workbenchDestination/);assert.match(control,/takeWorkbenchReturn/);assert.match(control,/saveWorkbenchReturn/);
 const manifest=JSON.parse(read('../lab-space/figurines/crypt-warden/source.manifest.json'));assert.equal(manifest.sha256,'e0b87964820e62eb6b7106bd13818e63ac0f7b20d688b8392473080077f53457');assert.equal(manifest.private,undefined);
});
