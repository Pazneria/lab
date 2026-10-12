import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {webcrypto,createHash} from 'node:crypto';
import {Viewer} from '../minimal/viewer.mjs';
import {GraphicsBridge} from '../minimal/graphics-bridge.mjs';
const root=new URL('../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root)),catalog=JSON.parse(read('minimal/catalog.json')),sha=b=>createHash('sha256').update(b).digest('hex');
test('frozen legacy, all 34 inventory entries, asset bytes and policy remain preserved',()=>{
 const legacy=read('index.html');assert.equal(sha(legacy),catalog.legacySha256);assert.equal(sha(legacy),'ce8b83d64a1eb2fe6227f6cbc62bd38e0b55027291193afea1a98fc2504c759c');
 const b=JSON.parse(legacy.toString().match(/<script id="bundle-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);const inventory=JSON.parse(read('minimal/pinned-inventory.json'));assert.equal(inventory.length,34);assert.equal(catalog.records.length,33);
 for(const r of catalog.records){const original=b.records.find(i=>i.id===r.id),bytes=read('minimal/'+r.file);assert.equal(sha(bytes),original.sha256);assert.equal(bytes.length,r.bytes);assert.equal(r.activeBindingAllowed,original.activeBindingAllowed);assert.equal(r.requiresReviewOptIn,original.requiresReviewOptIn);assert.deepEqual(r.rigReview,original.rigReview);}
 for(const r of inventory)assert.equal([...b.records,b.candidate].find(i=>i.id===r.id)?.sha256,r.sha256);
 assert.equal(catalog.records.filter(r=>r.activeBindingAllowed&&!r.requiresReviewOptIn).length,26);
 assert.equal(sha(read('index.html')),catalog.legacySha256);assert.ok(read('rebuild.html').length<6000);assert.doesNotMatch(read('rebuild.html').toString(),/bundle-data|motion-editor-data|<iframe/);
});
async function workerFixture(id){const messages=[],context=vm.createContext({console,URL,TextDecoder,Uint8Array,Uint32Array,Float32Array,Float64Array,ArrayBuffer,DataView,Map,Set,Math,Number,JSON,performance,crypto:webcrypto,postMessage:m=>messages.push(structuredClone(m)),fetch:async url=>{const bytes=fs.readFileSync(url);return {ok:true,headers:{get:()=>String(bytes.length)},arrayBuffer:async()=>bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength)};}});context.self={};const modules=new Map();async function load(url){if(modules.has(url.href))return modules.get(url.href);const m=new vm.SourceTextModule(fs.readFileSync(url,'utf8'),{context,identifier:url.href,initializeImportMeta:meta=>meta.url=url.href});modules.set(url.href,m);await m.link(spec=>load(new URL(spec,url)));return m;}const m=await load(new URL('minimal/model-worker.mjs',root));await m.evaluate();const send=async data=>{await context.self.onmessage({data});return messages.at(-1);};const record=catalog.records.find(r=>r.id===id);return {send,messages,record};}
for(const id of ['human01','skeleton','chicken'])test(id+': real worker rest, repeated deformation and diagnostic sampling stay finite',async()=>{const f=await workerFixture(id),ready=await f.send({type:'load',record:f.record});assert.equal(ready.type,'ready');assert.ok(ready.meta.joints.length);const original=ready.frame.geometry[0].positions;
 const selected=ready.meta.selected,rotation=[Math.sin(.2),0,0,Math.cos(.2)];let posed=await f.send({type:'pose',selected,clip:'rest',time:0,edits:{[selected]:{rotation}},request:1,revision:1});assert.equal(posed.type,'pose');assert.ok(posed.frame.geometry.every(g=>g.positions.every(Number.isFinite)));assert.ok(posed.frame.angles.every(Number.isFinite));
 const rest=await f.send({type:'pose',selected,clip:'rest',time:0,request:2,revision:2});assert.deepEqual(rest.frame.geometry[0].positions,original);
 for(const clip of ready.meta.clips.slice(0,3)){const p=await f.send({type:'pose',selected,clip:clip.id,time:clip.duration/2,request:3,revision:3});assert.equal(p.type,'pose');assert.ok(p.frame.geometry.every(g=>g.positions.every(Number.isFinite)));}
 const unknown=await f.send({type:'pose',clip:'invented',request:4,revision:4});assert.equal(unknown.type,'error');assert.match(unknown.message,/Unknown diagnostic/);
});
test('worker refuses opt-in proposals and tampered hashes',async()=>{const f=await workerFixture('human01');assert.match((await f.send({type:'load',record:{...f.record,requiresReviewOptIn:true}})).message,/separate review/);assert.match((await f.send({type:'load',record:{...f.record,sha256:'0'.repeat(64)}})).message,/integrity/);});
test('viewer reuses context and releases every model buffer and program',()=>{const calls=[],gl=new Proxy({getProgramParameter:()=>true,getExtension:()=>null,getAttribLocation:()=>0,createShader:()=>({}),createProgram:()=>({}),createBuffer:()=>({}),getError:()=>{throw Error('Forbidden GPU readback');}},{get(t,k){if(k in t)return t[k];if(/^[A-Z_]+$/.test(k))return k;return(...a)=>calls.push([k,...a]);}});globalThis.devicePixelRatio=1;const canvas={getContext:()=>gl,clientWidth:700,clientHeight:400},v=new Viewer(canvas);const frame={geometry:[{positions:new Float32Array(9),normals:new Float32Array(9),colors:new Float32Array(9),indices:new Uint32Array([0,1,2])}],lines:new Float32Array(),points:new Float32Array(),highlight:new Float32Array()};
 for(let i=0;i<12;i++){v.setModel(frame);v.update(frame);v.draw({yaw:0,pitch:0,span:2,center:[0,0,0]},frame);assert.equal(v.createdBuffers-v.deletedBuffers,5);}v.releaseModel();assert.equal(v.createdBuffers-v.deletedBuffers,1);v.destroy();assert.equal(v.createdBuffers,v.deletedBuffers);assert.equal(calls.filter(c=>c[0]==='deleteProgram').length,1);
});
test('graphics bridge never creates document WebGL, coalesces draws and rejects obsolete presentation',()=>{
 const messages=[],presented=[],closed=[],contexts=[];let instance;
 globalThis.OffscreenCanvas=class{};
 globalThis.Worker=class{constructor(){instance=this;}postMessage(data){messages.push(data);}terminate(){this.terminated=true;}};
 const canvas={clientWidth:700,clientHeight:400,getContext(type){contexts.push(type);assert.notEqual(type,'webgl');return {transferFromImageBitmap:bitmap=>presented.push(bitmap)};}};
 const b=new GraphicsBridge(canvas);instance.onmessage({data:{type:'health',health:{state:'ready',liveBuffers:1}}});
 const frame={geometry:[],lines:new Float32Array(),points:new Float32Array(),highlight:new Float32Array()},camera={yaw:0,pitch:0,span:2,center:[0,0,0]};
 b.setModel(frame,'first');b.draw(camera,frame,true);const first=messages.at(-1);b.draw({...camera,yaw:1},frame,true);b.draw({...camera,yaw:2},frame,true);assert.equal(messages.filter(m=>m.type==='render').length,1);
 b.releaseModel();b.setModel(frame,'second');b.draw(camera,frame,true);const bitmap={width:100,height:100,close:()=>closed.push(true)};
 instance.onmessage({data:{type:'present',bitmap,generation:first.generation,modelId:'first',health:{state:'ready',liveBuffers:5}}});assert.equal(presented.length,0);assert.equal(messages.at(-1).modelId,'second');const next=messages.at(-1);
 instance.onmessage({data:{type:'present',bitmap,generation:next.generation,modelId:'second',health:{state:'ready',liveBuffers:5}}});assert.equal(presented.length,1);assert.equal(b.presentedModel,'second');assert.equal(b.frames,1);assert.equal(b.pending,false);assert.equal(contexts.length,1);b.destroy();assert.equal(instance.terminated,true);assert.equal(b.createdBuffers,0);assert.equal(closed.length,2);
});
test('fatal graphics failure recreates worker, retains full latest pose and ignores old replies',()=>{
 const instances=[];globalThis.OffscreenCanvas=class{};globalThis.Worker=class{constructor(){instances.push(this);this.sent=[];}postMessage(data){this.sent.push(data);}terminate(){this.terminated=true;}};
 const canvas={clientWidth:700,clientHeight:400,getContext:()=>({transferFromImageBitmap(){}})};
 const b=new GraphicsBridge(canvas);try{
  const first=instances[0],oldReply=first.onmessage;first.onmessage({data:{type:'health',health:{state:'ready',liveBuffers:1}}});
  const model={geometry:[{positions:new Float32Array([0,0,0]),normals:new Float32Array([0,1,0]),colors:new Float32Array([1,1,1]),indices:new Uint32Array([0])}],lines:new Float32Array(),points:new Float32Array(),highlight:new Float32Array()};
  const posed={...model,geometry:[{positions:new Float32Array([1,2,3]),normals:new Float32Array([0,1,0])}]};b.setModel(model,'human01');b.draw({yaw:1,pitch:0,span:2,center:[0,0,0]},posed,true);
  first.onerror({message:'controlled fatal',preventDefault(){}});assert.equal(first.terminated,true);assert.equal(b.health.state,'unavailable');assert.equal(b.pending,false);assert.equal(b.worker,null);
  b.retry();const second=instances[1];assert.notEqual(first,second);second.onmessage({data:{type:'health',health:{state:'ready',liveBuffers:1}}});const replay=second.sent.at(-1);assert.equal(replay.modelId,'human01');assert.deepEqual(replay.model.geometry[0].positions,new Float32Array([1,2,3]));assert.ok(replay.model.geometry[0].colors.length);assert.ok(replay.model.geometry[0].indices.length);assert.equal(replay.camera.yaw,1);
  let closed=false;oldReply({data:{type:'present',bitmap:{close(){closed=true;}},generation:b.generation,modelId:'human01'}});assert.equal(closed,true);assert.equal(b.frames,0);assert.equal(b.workersCreated,2);assert.equal(b.workersTerminated,1);
 }finally{b.destroy();}
});
test('graphics startup and draw watchdogs terminate nonresponding workers',async()=>{
 const instances=[];globalThis.OffscreenCanvas=class{};globalThis.Worker=class{constructor(){instances.push(this);}postMessage(){}terminate(){this.terminated=true;}};
 const canvas={clientWidth:700,clientHeight:400,getContext:()=>({transferFromImageBitmap(){}})},b=new GraphicsBridge(canvas,null,{startupMs:15,drawMs:15});
 try{await new Promise(r=>setTimeout(r,30));assert.match(b.health.reason,/initialization timed out/);assert.equal(instances[0].terminated,true);assert.equal(b.worker,null);b.retry();instances[1].onmessage({data:{type:'health',health:{state:'ready',liveBuffers:1}}});b.draw({yaw:0,pitch:0,span:2,center:[0,0,0]},null,true);await new Promise(r=>setTimeout(r,30));assert.match(b.health.reason,/draw timed out/);assert.equal(b.pending,false);assert.equal(instances[1].terminated,true);}finally{b.destroy();}
});
for(const kind of ['missing','throw'])test('bitmap '+kind+' presentation closes bitmap and enters recoverable unavailable state',()=>{
 let worker;globalThis.OffscreenCanvas=class{};globalThis.Worker=class{constructor(){worker=this;}postMessage(){}terminate(){this.terminated=true;}};
 const canvas={clientWidth:700,clientHeight:400,getContext:()=>kind==='missing'?null:{transferFromImageBitmap(){throw Error('controlled presentation failure');}}},b=new GraphicsBridge(canvas);let closed=0;
 try{worker.onmessage({data:{type:'health',health:{state:'ready',liveBuffers:1}}});b.draw({yaw:0,pitch:0,span:2,center:[0,0,0]},null,true);worker.onmessage({data:{type:'present',generation:b.generation,modelId:null,bitmap:{width:1,height:1,close(){closed++;}},health:{state:'ready',liveBuffers:1}}});assert.equal(closed,1);assert.equal(b.health.state,'unavailable');assert.match(b.health.reason,/presentation failed/);assert.equal(b.pending,false);assert.equal(b.worker,null);}finally{b.destroy();}
});
test('idle context loss followed by silent recovery is bounded and repeated health cannot extend it',async()=>{
 let worker;globalThis.OffscreenCanvas=class{};globalThis.Worker=class{constructor(){worker=this;}postMessage(){}terminate(){this.terminated=true;}};
 const b=new GraphicsBridge({clientWidth:700,clientHeight:400,getContext:()=>({transferFromImageBitmap(){}})},null,{startupMs:20,drawMs:100});
 try{
  worker.onmessage({data:{type:'health',health:{state:'ready',liveBuffers:1}}});b.draw({yaw:0,pitch:0,span:2,center:[0,0,0]},null,true);
  worker.onmessage({data:{type:'present',generation:b.generation,modelId:null,bitmap:{width:1,height:1,close(){}},health:{state:'ready',liveBuffers:1}}});assert.equal(b.timer,0);assert.equal(b.pending,false);
  worker.onmessage({data:{type:'health',health:{state:'recovering',liveBuffers:0}}});const deadline=b.timer;assert.ok(deadline);worker.onmessage({data:{type:'health',health:{state:'recovering',liveBuffers:0}}});assert.equal(b.timer,deadline);
  worker.onmessage({data:{type:'health',health:{state:'ready',liveBuffers:1}}});assert.equal(b.timer,deadline,'Readiness without presentation must retain recovery deadline');assert.equal(b.pending,true);
  await new Promise(r=>setTimeout(r,35));assert.equal(worker.terminated,true);assert.equal(b.worker,null);assert.match(b.health.reason,/recovery timed out/);
 }finally{b.destroy();}
});
test('context recovery notifications do not extend an active draw deadline',()=>{
 let worker;globalThis.OffscreenCanvas=class{};globalThis.Worker=class{constructor(){worker=this;}postMessage(){}terminate(){}};
 const b=new GraphicsBridge({clientWidth:700,clientHeight:400,getContext:()=>({transferFromImageBitmap(){}})});
 try{worker.onmessage({data:{type:'health',health:{state:'ready',liveBuffers:1}}});b.draw({yaw:0,pitch:0,span:2,center:[0,0,0]},null,true);const deadline=b.timer;worker.onmessage({data:{type:'health',health:{state:'recovering',liveBuffers:0}}});assert.equal(b.timer,deadline);assert.equal(b.pending,true);}finally{b.destroy();}
});
