// CPU-only worker, allocation and hierarchy regressions. No browser or renderer.
import test from 'node:test';
import assert from 'node:assert/strict';
import {preflight} from '../assets/preflight.mjs';
import {collectResources,disposeResources} from '../assets/resources.mjs';
import {validateGLB} from '../assets/contracts.mjs';
class MockWorker {
  static instances=[];
  constructor(){MockWorker.instances.push(this);this.terminated=false;}
  postMessage(value,transfer){this.value=value;this.transfer=transfer;}
  terminate(){this.terminated=true;}
}
test('worker preflight transfers original bytes and terminates after success',async()=>{
  const controller=new AbortController(),buffer=new ArrayBuffer(100);
  const pending=preflight(buffer,controller.signal,{WorkerClass:MockWorker});
  const worker=MockWorker.instances.at(-1);assert.equal(worker.transfer[0],buffer);
  worker.onmessage({data:{buffer,summary:{vertices:3,meshes:1}}});
  const value=await pending;assert.equal(value.buffer,buffer);assert.equal(worker.terminated,true);
});
test('worker preflight abort terminates immediately and rejects',async()=>{
  const controller=new AbortController(),pending=preflight(new ArrayBuffer(100),controller.signal,{WorkerClass:MockWorker});
  controller.abort();await assert.rejects(pending,{name:'AbortError'});assert.equal(MockWorker.instances.at(-1).terminated,true);
});
test('worker error and timeout are meaningful and release worker',async()=>{
  const pending=preflight(new ArrayBuffer(100),new AbortController().signal,{WorkerClass:MockWorker});
  MockWorker.instances.at(-1).onmessage({data:{error:'Invalid frozen file'}});await assert.rejects(pending,/Invalid frozen file/);
  const timed=preflight(new ArrayBuffer(100),new AbortController().signal,{WorkerClass:MockWorker,timeoutMs:1});
  await assert.rejects(timed,/30-second limit/);assert.equal(MockWorker.instances.at(-1).terminated,true);
});
test('partial parser resource tracking disposes original material maps and bone texture once',()=>{
  const counts={};const increment=name=>counts[name]=(counts[name]||0)+1;
  const bitmap={close(){increment('bitmap');}},texture={isTexture:true,source:{data:bitmap},dispose(){increment('texture');}};
  const bone={isTexture:true,dispose(){increment('bone');}},material={isMaterial:true,map:texture,dispose(){increment('material');}};
  const geometry={isBufferGeometry:true,dispose(){increment('geometry');}},skeleton={isSkeleton:true,boneTexture:bone,dispose(){this.boneTexture?.dispose();}};
  const resources=new Set();collectResources(material,resources);collectResources(geometry,resources);collectResources(skeleton,resources);collectResources(texture,resources);
  disposeResources(resources);assert.deepEqual(counts,{material:1,texture:1,geometry:1,bone:1,bitmap:1});assert.equal(resources.size,0);disposeResources(resources);assert.equal(counts.bone,1);
});
function glb(json){const raw=Buffer.from(JSON.stringify(json)),length=Math.ceil(raw.length/4)*4,bytes=Buffer.alloc(20+length,32);bytes.writeUInt32LE(0x46546c67,0);bytes.writeUInt32LE(2,4);bytes.writeUInt32LE(bytes.length,8);bytes.writeUInt32LE(length,12);bytes.writeUInt32LE(0x4e4f534a,16);raw.copy(bytes,20);return bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.length);}
function json(){return {asset:{version:'2.0'},scenes:[{nodes:[0]}],nodes:[{mesh:0}],meshes:[{primitives:[{attributes:{POSITION:0}}]}],buffers:[{byteLength:36,uri:'data:application/octet-stream;base64,'+'A'.repeat(48)}],bufferViews:[{buffer:0,byteLength:36}],accessors:[{componentType:5126,count:3,type:'VEC3',bufferView:0}]};}
test('preflight rejects cyclic node graphs and oversized unrelated allocations',()=>{
  const cycle=json();cycle.nodes[0].children=[0];assert.throws(()=>validateGLB(glb(cycle)),/hierarchy/);
  const allocation=json();allocation.accessors.push({componentType:5126,count:100000000,type:'MAT4'});assert.throws(()=>validateGLB(glb(allocation)),/allocation/);
});
test('embedded PNG dimension budgets are checked before any image decoder',()=>{
  const png=Buffer.alloc(33);png.writeUInt32BE(0x89504e47,0);png.writeUInt32BE(0x0d0a1a0a,4);png.writeUInt32BE(13,8);png.writeUInt32BE(0x49484452,12);png.writeUInt32BE(5000,16);png.writeUInt32BE(2,20);
  const asset=json();asset.images=[{uri:'data:image/png;base64,'+png.toString('base64')}];assert.throws(()=>validateGLB(glb(asset)),/decode budget/);
});
