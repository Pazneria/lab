// CPU-only. Run: node --test character-bench/tests/contracts.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {LIMITS,safeAssetPath,validateManifest,eligiblePairs,choosePair,chooseComparison,createComparisonState,validateGLB,createLoadSlot} from '../assets/contracts.mjs';
import {disposeObject} from '../assets/resources.mjs';
const hash='a'.repeat(64),otherHash='b'.repeat(64);
const prompt={id:'test-character',title:'Test character',text:'Exact fixture prompt',sha256:hash};
function entry(id,overrides={}){return {id,promptId:prompt.id,promptSha256:hash,admission:{status:'verified',frozen:true,selfContained:true},
  asset:{path:'./entries/'+id+'.glb',sha256:hash,byteLength:100},provenance:{modelLabel:'Model '+id},...overrides};}
const a=entry('one'),b=entry('two');
function manifest(entries=[a,b]){return validateManifest({version:1,prompts:[prompt],entries});}
function minimalJSON(){return {asset:{version:'2.0'},scene:0,scenes:[{nodes:[0]}],nodes:[{mesh:0}],
  meshes:[{primitives:[{attributes:{POSITION:0}}]}],buffers:[{byteLength:36}],bufferViews:[{buffer:0,byteLength:36}],accessors:[{bufferView:0,componentType:5126,type:'VEC3',count:3}]};}
function glb(json=minimalJSON(),{binary=36,trailing=0}={}){
  const encoded=new TextEncoder().encode(JSON.stringify(json)),length=Math.ceil(encoded.byteLength/4)*4;
  const bytes=new Uint8Array(20+length+(binary?8+binary:0)+trailing),view=new DataView(bytes.buffer);
  view.setUint32(0,0x46546c67,true);view.setUint32(4,2,true);view.setUint32(8,bytes.byteLength-trailing,true);
  view.setUint32(12,length,true);view.setUint32(16,0x4e4f534a,true);bytes.fill(32,20,20+length);bytes.set(encoded,20);
  if(binary){view.setUint32(20+length,binary,true);view.setUint32(24+length,0x004e4942,true);}
  return bytes.buffer;
}
test('admission requires exact prompt/hash, unique attempts, frozen local assets',()=>{
  assert.equal(eligiblePairs(manifest(),prompt.id).length,1);
  assert.equal(eligiblePairs(manifest([a]),prompt.id).length,0);
  const pending=entry('pending',{admission:{status:'pending'}});
  assert.equal(eligiblePairs(manifest([a,pending]),prompt.id).length,0);
  assert.throws(()=>manifest([a,entry('other',{promptSha256:otherHash})]),/canonical prompt/);
  assert.throws(()=>manifest([a,a]),/canonical prompt/);
  assert.throws(()=>manifest([entry('other',{asset:{path:'https://example.com/one.glb',sha256:hash,byteLength:100}})]),/verified entry/);
  assert.throws(()=>manifest([entry('other',{admission:{status:'verified',selfContained:true,frozen:false}})]),/verified entry/);
  for(const path of ['../one.glb','./entries/../one.glb','./entries/a.glb?model=1','./entries/A.glb','javascript:alert(1)'])assert.equal(safeAssetPath(path),false);
});
test('pair selection stays inside one prompt and avoids the previous pair when possible',()=>{
  const otherPrompt={...prompt,id:'different-character',sha256:otherHash};
  const m=validateManifest({version:1,prompts:[prompt,otherPrompt],entries:[a,b,entry('three'),entry('different',{promptId:otherPrompt.id,promptSha256:otherHash})]});
  assert.equal(choosePair(m,otherPrompt.id),null);
  const pair=choosePair(m,prompt.id,'one|two',()=>0);
  assert.notEqual(pair.map(e=>e.id).sort().join('|'),'one|two');
  assert.ok(pair.every(e=>e.promptId===prompt.id));assert.notEqual(pair[0].id,pair[1].id);
});

test('random comparisons choose prompts equally despite unequal pair counts, then pair and A/B independently',()=>{
  const second={...prompt,id:'second',sha256:otherHash},third={...prompt,id:'unpaired'};
  const more=['s1','s2','s3','s4'].map(id=>entry(id,{promptId:second.id,promptSha256:otherHash}));
  const m=validateManifest({version:1,prompts:[prompt,second,third],entries:[a,b,...more,entry('lonely',{promptId:third.id}),entry('pending',{promptId:third.id,admission:{status:'pending'}})]});
  const counts=new Map();
  for(let bin=0;bin<100;bin++){
    const values=[(bin+.5)/100,.25,.1],next=chooseComparison(m,null,()=>values.shift());
    counts.set(next.promptId,(counts.get(next.promptId)||0)+1);assert(next.pair.every(e=>e.promptId===next.promptId));
  }
  assert.deepEqual([...counts],[[prompt.id,50],[second.id,50]]);
  const possible=eligiblePairs(m,second.id);
  for(let pairIndex=0;pairIndex<possible.length;pairIndex++)for(const side of [.1,.9]){
    const values=[.75,(pairIndex+.5)/possible.length,side],next=chooseComparison(m,null,()=>values.shift());
    assert.deepEqual(next.pair.map(e=>e.id),side<.5?possible[pairIndex].map(e=>e.id):possible[pairIndex].map(e=>e.id).reverse());
  }
});

test('global Next excludes the previous unordered pair, permits later revisits, and handles exhausted catalogs',()=>{
  const second={...prompt,id:'second',sha256:otherHash};
  const m=validateManifest({version:1,prompts:[prompt,second],entries:[a,b,entry('three'),entry('s1',{promptId:second.id,promptSha256:otherHash}),entry('s2',{promptId:second.id,promptSha256:otherHash})]});
  for(const value of [0,.2,.5,.99]){const next=chooseComparison(m,'one|two',()=>value);assert.notEqual(next.pair.map(e=>e.id).sort().join('|'),'one|two');}
  assert.deepEqual(chooseComparison(m,'s1|s2',()=>0).pair.map(e=>e.id),['one','two']);
  assert.equal(chooseComparison(manifest([a])),null);
  assert.deepEqual(chooseComparison(manifest(),'one|two',()=>0).pair.map(e=>e.id),['one','two']);
});
test('linked cameras are default; unlock keeps independent states and relink adopts active view',()=>{
  const state=createComparisonState([a,b]);assert.equal(state.snapshot.linked,true);
  state.setCamera(0,{yaw:1,distance:2});assert.deepEqual(state.snapshot.cameras[0],state.snapshot.cameras[1]);
  state.setLinked(false);state.setCamera(1,{yaw:-1,distance:5});assert.notDeepEqual(state.snapshot.cameras[0],state.snapshot.cameras[1]);
  state.setLinked(true);assert.equal(state.snapshot.cameras[0].yaw,-1);assert.equal(state.snapshot.cameras[0].distance,5);
  state.setCamera(1,{pitch:Infinity,distance:-3});assert.ok(state.snapshot.cameras[0].distance>0);assert.ok(Number.isFinite(state.snapshot.cameras[0].pitch));
});
test('vote needs both current imports; reveals only after one explicit valid preference',()=>{
  const state=createComparisonState([a,b]);assert.equal(state.label(0),'Attempt A');assert.equal(state.vote('a'),false);
  state.setReady(0,true);assert.equal(state.vote('a'),false);state.setReady(1,true);assert.equal(state.vote('skip'),false);
  assert.equal(state.vote('a'),true);assert.equal(state.snapshot.revealed,true);assert.equal(state.label(0),'Model one');
  assert.equal(state.vote('b'),false);
  const old=state.snapshot.generation;state.setPair([b,a]);state.setReady(0,true,old);state.setReady(1,true,old);
  assert.equal(state.snapshot.revealed,false);assert.equal(state.snapshot.canVote,false);assert.equal(state.label(0),'Attempt A');
  state.setReady(0,true);state.setReady(1,true);assert.equal(state.vote('tie'),true);
});
test('direct state input cannot unlock mismatched, duplicated, or unadmitted pairs',()=>{
  for(const pair of [[a,a],[a,entry('bad',{promptId:'different'})],[a,entry('bad',{promptSha256:otherHash})],[a,entry('bad',{admission:{status:'pending'}})]]) {
    const state=createComparisonState(pair);state.setReady(0,true);state.setReady(1,true);assert.equal(state.vote('a'),false);
  }
});
test('GLB guards header, exact bytes, dependencies, texture format and buffer ranges',()=>{
  assert.equal(validateGLB(glb()).vertices,3);
  assert.throws(()=>validateGLB(glb(undefined,{trailing:1})),/complete glTF/);
  const bad=glb();new DataView(bad).setUint32(0,0,true);assert.throws(()=>validateGLB(bad),/complete glTF/);
  const external=minimalJSON();external.buffers[0].uri='https://example.com/mesh.bin';assert.throws(()=>validateGLB(glb(external)),/embedded base64/);
  const range=minimalJSON();range.bufferViews[0].byteLength=40;assert.throws(()=>validateGLB(glb(range)),/buffer range/);
  const missing=minimalJSON();delete missing.bufferViews[0].buffer;assert.throws(()=>validateGLB(glb(missing)),/buffer range/);
  const image=minimalJSON();image.images=[{uri:'https://example.com/texture.png'}];assert.throws(()=>validateGLB(glb(image)),/embedded base64/);
  const compressed=minimalJSON();compressed.extensionsUsed=['KHR_draco_mesh_compression'];assert.throws(()=>validateGLB(glb(compressed)),/decoder/);
  const unsupported=minimalJSON();unsupported.extensionsRequired=['CUSTOM_extension'];assert.throws(()=>validateGLB(glb(unsupported)),/required glTF/);
  const budget=minimalJSON();budget.accessors[0].count=LIMITS.vertices+1;delete budget.accessors[0].bufferView;assert.throws(()=>validateGLB(glb(budget)),/vertex budget/);
});
test('multiple embedded data-URI buffers are accepted unchanged, including hundreds of buffers',()=>{
  for(const count of [177,770]) {
    const json=minimalJSON();json.buffers=Array.from({length:count},()=>({byteLength:36,uri:'data:application/octet-stream;base64,'+'A'.repeat(48)}));
    json.bufferViews[0].buffer=count-1;
    const frozen=glb(json,{binary:0}),before=new Uint8Array(frozen).slice();assert.equal(validateGLB(frozen).vertices,3);assert.deepEqual(new Uint8Array(frozen),before);
    json.buffers[count-1].byteLength=35;assert.throws(()=>validateGLB(glb(json,{binary:0})),/declared length/);
  }
});
test('cancelled parse is disposed when it resolves; only the newest import attaches',async()=>{
  const pending=[],attached=[],disposed=[],signals=[];
  const slot=createLoadSlot({load:(entry,signal)=>new Promise(resolve=>{pending.push({id:entry.id,resolve});signals.push(signal);}),attach:value=>attached.push(value.id),dispose:value=>disposed.push(value.id)});
  const first=slot.open(a),second=slot.open(b);assert.equal(signals[0].aborted,true);
  pending[1].resolve({id:b.id});assert.equal(await second,true);pending[0].resolve({id:a.id});assert.equal(await first,false);
  assert.deepEqual(attached,[b.id]);assert.deepEqual(disposed,[a.id]);slot.clear();assert.deepEqual(disposed,[a.id,b.id]);
  const third=slot.open(a);slot.close();assert.equal(signals[2].aborted,true);pending[2].resolve({id:'late'});assert.equal(await third,false);assert.deepEqual(disposed,[a.id,b.id,'late']);
  assert.equal(await slot.open(a),false);
});
test('an attach failure disposes the result and current load errors propagate',async()=>{
  const disposed=[];
  const slot=createLoadSlot({load:async()=>({id:'bad'}),attach:()=>{throw Error('attach failed');},dispose:value=>disposed.push(value.id)});
  await assert.rejects(slot.open(a),/attach failed/);assert.deepEqual(disposed,['bad']);slot.close();assert.deepEqual(disposed,['bad']);
  const failed=createLoadSlot({load:async()=>{throw Error('invalid GLB');},attach:()=>{},dispose:()=>{}});
  await assert.rejects(failed.open(a),/invalid GLB/);failed.close();
});

test('disposal releases shared geometry, materials, textures, bitmaps and bone textures once',()=>{
  const calls=[];
  const image={close(){calls.push('bitmap');}},texture={isTexture:true,source:{data:image},dispose(){calls.push('texture');}};
  const bone={isTexture:true,dispose(){calls.push('bone');}};
  const material={map:texture,normalMap:texture,dispose(){calls.push('material');}};
  const geometry={dispose(){calls.push('geometry');}};
  const nodes=[{geometry,material:[material,material],skeleton:{boneTexture:bone}},{geometry,material}];
  disposeObject({traverse(fn){nodes.forEach(fn);}});
  assert.deepEqual(calls,['texture','bone','bitmap','geometry','material']);
});

test('new pairs always restore linked defaults and reject old readiness tokens',()=>{
  const state=createComparisonState([a,b]);state.setLinked(false);state.setCamera(1,{yaw:2,distance:7});
  const old=state.snapshot.generation;state.setPair([b,a]);state.setReady(0,true,old);state.setReady(1,true,old);
  assert.equal(state.snapshot.linked,true);assert.equal(state.snapshot.active,0);assert.deepEqual(state.snapshot.cameras[0],state.snapshot.cameras[1]);assert.equal(state.snapshot.canVote,false);
});
test('swap starts a new blind inspection of the same prompt without mutating the frozen pair',()=>{
  const original=[a,b],state=createComparisonState(original);const old=state.snapshot.generation;
  state.setReady(0,true);state.setReady(1,true);assert.equal(state.swap(),true);
  assert.deepEqual(original,[a,b]);assert.deepEqual(state.snapshot.pair,[b,a]);assert.equal(state.snapshot.generation,old+1);
  assert.deepEqual(state.snapshot.ready,[false,false]);assert.equal(state.snapshot.choice,null);assert.equal(state.label(0),'Attempt A');
  state.setReady(0,true);state.setReady(1,true);state.vote('tie');assert.equal(state.swap(),false);
});
test('an invalid pair cannot be swapped into an eligible comparison',()=>{
  for(const pair of [null,[a],[a,a],[a,entry('bad',{promptId:'other'})]]){
    const state=createComparisonState(pair);const old=state.snapshot.generation;assert.equal(state.swap(),false);assert.equal(state.snapshot.generation,old);
  }
});
