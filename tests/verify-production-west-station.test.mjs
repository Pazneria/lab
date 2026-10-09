// Authored host geometry, actual pinned Three.js transforms/rays and continuous
// navigation. CPU only: no textures/canvas, renderer, browser, server or entrant.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
import {exhibits} from '../lab-space/assets/claude11/layout.mjs';
import {colliders} from '../lab-space/assets/claude11/colliders.mjs';
import {createLabCamera,poseLabCamera} from '../lab-space/assets/claude11/camera.mjs';
import {spawn,approaches,walkable,segmentFree,planRoute,followRoute,setExitDoors} from '../lab-space/assets/production-navigation.mjs';

const dependencies=process.env.LAB_PRODUCTION_DEPENDENCIES;
if(!dependencies)throw new Error('Set LAB_PRODUCTION_DEPENDENCIES to the documented pinned developer node_modules directory');
const modules=resolve(dependencies),threeRoot=join(modules,'three');
assert.equal(JSON.parse(readFileSync(join(threeRoot,'package.json'),'utf8')).version,'0.186.1');
assert.equal(JSON.parse(readFileSync(join(modules,'esbuild','package.json'),'utf8')).version,'0.28.2');
const T=await import(pathToFileURL(join(threeRoot,'build','three.module.js')).href);assert.equal(T.REVISION,'186');
const esbuild=createRequire(import.meta.url)(join(modules,'esbuild'));
// Resolve the authored JS modules in memory, with the same real pinned Three
// instance as the test. This performs no build/output mutation in the checkout.
const bundled=await esbuild.build({
  stdin:{contents:"export {Builder} from './builder.js';export {buildHall} from './hall.js';export {buildInstrument} from './instrument.js';export {buildPerception} from './perception.js';export {buildMotion} from './motion.js';",resolveDir:fileURLToPath(new URL('../lab-space/assets/claude11/',import.meta.url)),sourcefile:'west-station-cpu.mjs'},
  bundle:true,format:'esm',platform:'node',write:false,logLevel:'silent',nodePaths:[modules],
  plugins:[{name:'pinned-three-cpu',setup(build){build.onResolve({filter:/^three(?:\/|$)/},args=>({path:pathToFileURL(args.path==='three'?join(threeRoot,'build','three.module.js'):join(threeRoot,args.path.slice(6))).href,external:true}));}}],
});
const {Builder,buildHall,buildInstrument,buildPerception,buildMotion}=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text).toString('base64'));

const close=(actual,expected,message='coordinate')=>assert.ok(Math.abs(actual-expected)<1e-6,`${message}: ${actual} versus ${expected}`);
function authoredRoom(){
  const builder=new Builder(),scene=new T.Scene(),records=[],screens=[];
  const materials=new Proxy({}, {get(store,key){return store[key]??=Object.assign(new T.MeshStandardMaterial(),{name:String(key)});}});
  // The real Atlas uses these exact plane/cylinder dimensions before mapping
  // their UVs. Skip rasterization only, preserving physical labels and surfaces.
  const atlas={
    sign(width,height,spec){const geometry=new T.PlaneGeometry(width,height);geometry.userData.label=spec.lines?.map(line=>line.t).join(' ');return geometry;},
    plane:(width,height)=>new T.PlaneGeometry(width,height),
    cylBand:(radius,height,start,length,_pixels,_draw,segments=32)=>new T.CylinderGeometry(radius,radius,height,segments,1,true,start,length),
  };
  const add=builder.add.bind(builder);
  builder.add=(geometry,material,position,rotation,options)=>{
    const transformed=add(geometry,material,position,rotation,options);transformed.computeBoundingBox();
    records.push({region:builder.region,bounds:transformed.boundingBox.clone(),material:material.name,label:geometry.userData.label,geometry:transformed});
    geometry.dispose();return transformed;
  };
  const context={b:builder,M:materials,A:atlas,screen(id,width,height,pw,ph,position,rotation){
    const mesh=new T.Mesh(new T.PlaneGeometry(width,height),new T.MeshBasicMaterial());mesh.name=id;
    const local=new T.Matrix4().compose(new T.Vector3(...position),new T.Quaternion().setFromEuler(new T.Euler(...rotation)),new T.Vector3(1,1,1));
    mesh.matrixAutoUpdate=false;mesh.matrix.copy(builder.top).multiply(local);mesh.matrixWorldNeedsUpdate=true;scene.add(mesh);
    screens.push({id,width,height,pw,ph,mesh});
  }};
  for(const [region,build] of [['hall',buildHall],['core',buildInstrument],['west',buildPerception],['east',buildMotion]]){builder.region=region;build(context);}
  const generatedColliders=structuredClone(builder.colliders),station=records.filter(record=>record.region==='west'&&record.bounds.min.z>2.89);
  builder.build(scene);scene.updateMatrixWorld(true);scene.matrixWorldAutoUpdate=false;
  return {scene,records,screens,station,generatedColliders};
}
const room=authoredRoom(),board=room.screens.find(screen=>screen.id==='datawall').mesh;
test.after(()=>{
  const geometries=new Set(),materials=new Set();
  room.scene.traverse(object=>{if(object.geometry)geometries.add(object.geometry);if(object.material)for(const material of Array.isArray(object.material)?object.material:[object.material])materials.add(material);});
  for(const geometry of geometries)geometry.dispose();for(const material of materials)material.dispose();
  room.scene.clear();esbuild.stop();
});
test.beforeEach(()=>setExitDoors({inner:0,outer:0}));

test('the authored room emits exactly one low west datawall with shared physical dimensions and north-facing orientation',()=>{
  assert.equal(room.screens.filter(screen=>screen.id==='datawall').length,1);
  const screen=room.screens.find(screen=>screen.id==='datawall'),W=exhibits.worlds,bounds=new T.Box3().setFromObject(board);
  close(screen.width,W.width);close(screen.height,W.height);assert.equal(screen.pw/screen.ph,16/9);close(W.width/W.height,16/9);
  close(new T.Vector3().setFromMatrixPosition(board.matrixWorld).x,W.x);close(new T.Vector3().setFromMatrixPosition(board.matrixWorld).y,W.y);close(new T.Vector3().setFromMatrixPosition(board.matrixWorld).z,W.z);
  assert.ok(W.x<-7&&W.z>0,'west alcove south wall');assert.equal(W.y,1.6);assert.ok(W.y<2.45-.8);
  close(bounds.min.y,.7);close(bounds.max.y,2.5);assert.ok(bounds.max.y<3.395-.8);
  const normal=new T.Vector3(0,0,1).transformDirection(board.matrixWorld);close(normal.x,0);close(normal.y,0);close(normal.z,-1);assert.equal(W.yaw,Math.PI);
});

test('fitted equipment housing and pale service cabinet stay within the existing station footprint',()=>{
  assert.ok(room.station.some(record=>record.material==='worktop'));assert.ok(room.station.some(record=>record.material==='paintWhite'));assert.ok(room.station.some(record=>record.material==='anodBlack'));assert.ok(room.station.some(record=>record.material==='ledCyan'));
  const bounds=new T.Box3();for(const record of room.station)bounds.union(record.bounds);
  close(bounds.min.x,-11.05);close(bounds.max.x,-7.55);close(bounds.min.z,2.9);close(bounds.max.z,3.3925);close(bounds.min.y,0);
  assert.ok(bounds.max.y<3.3);assert.ok(bounds.max.x<-7.25,'clear of the alcove portal pilaster');
  const sign=room.station.filter(record=>record.label==='SCENEBENCH');assert.equal(sign.length,1);assert.equal(room.station.some(record=>record.label==='Compare Worlds'),false);
  close(sign[0].bounds.getCenter(new T.Vector3()).x,exhibits.worlds.x+1.03);close(sign[0].bounds.getCenter(new T.Vector3()).y,2.565);
  close(sign[0].bounds.getCenter(new T.Vector3()).z,exhibits.worlds.z-.001);
  assert.ok(sign[0].bounds.min.y>exhibits.worlds.y+exhibits.worlds.height/2);
});

test('full procedural collision records match both generated artifacts; only the cart is replaced by one wall-aligned console',()=>{
  assert.deepEqual(room.generatedColliders,colliders);
  assert.deepEqual(colliders,JSON.parse(readFileSync(new URL('../lab-space/assets/claude11/colliders.json',import.meta.url),'utf8')));
  assert.equal(colliders.length,34);
  const station=colliders.filter(c=>c.type==='box'&&Math.abs(c.minX+11.05)<1e-9&&Math.abs(c.maxX+7.55)<1e-9&&Math.abs(c.minZ-2.9)<1e-9&&c.maxZ===3.4);assert.equal(station.length,1);
  assert.equal(colliders.some(c=>c.type==='box'&&c.minX===-8.55&&c.maxX===-7.85&&c.minZ===2.6),false);
  assert.ok(colliders.some(c=>c.type==='box'&&Math.abs(c.minX+12.03)<1e-9&&Math.abs(c.maxX+11.11)<1e-9&&c.minZ===-2.52&&c.maxZ===2.52),'preserved west workbench');
  assert.ok(colliders.some(c=>c.type==='circle'&&c.x===-10.75&&c.z===-1.55&&c.r===.28),'preserved stool');
  assert.ok(colliders.some(c=>c.type==='circle'&&c.x===0&&c.z===-.6&&c.r===1.5),'preserved central instrument');
  assert.equal(walkable({x:exhibits.worlds.x,z:3.1}),false,'cabinet blocks its real footprint');
});

test('the safe approach and every existing station remain reachable through an open west walkway',()=>{
  assert.equal(approaches.worlds,exhibits.worlds.approach);assert.equal(approaches.worlds.yaw,Math.PI);assert.ok(approaches.worlds.pitch<0);
  for(const approach of Object.values(approaches)){
    assert.equal(walkable(approach),true);const path=planRoute(spawn(),approach);assert.ok(path?.length,'station has a route');
    let from=spawn();for(const point of path){assert.equal(segmentFree(from,point),true);from=point;}
  }
  for(const z of [-2.2,0,2.3])assert.equal(segmentFree({x:-6,z},{x:-9.3,z}),true,'open west portal');
  assert.equal(segmentFree({x:-10.05,z:-2.2},{x:-10.05,z:2.2}),true,'workbench aisle remains open');
  const position=spawn(),remaining=planRoute(position,approaches.worlds);let state='walking',frames=0;
  while(state==='walking'&&frames++<1500){const previous={...position};state=followRoute(position,remaining,1/60);assert.equal(walkable(position),true);assert.equal(segmentFree(previous,position),true);}
  assert.equal(state,'arrived');close(position.x,approaches.worlds.x);close(position.z,approaches.worlds.z);
});

test('the shared return pose points at the actual west screen center with correct UVs',()=>{
  const camera=createLabCamera(T.PerspectiveCamera);poseLabCamera(camera,{...exhibits.worlds.approach,eye:1.62});
  camera.aspect=16/9;camera.updateProjectionMatrix();const ray=new T.Raycaster();ray.setFromCamera(new T.Vector2(),camera);
  const hit=ray.intersectObjects(room.scene.children,true)[0];assert.ok(hit);assert.equal(hit.object,board);
  close(hit.point.x,exhibits.worlds.x);close(hit.point.y,exhibits.worlds.y);close(hit.point.z,exhibits.worlds.z);close(hit.uv.x,.5);close(hit.uv.y,.5);
});

test('standing and crouched visitors have unobstructed physical sightlines across the whole display',()=>{
  const W=exhibits.worlds,ray=new T.Raycaster();
  for(const eye of [1,1.62])for(const u of [.02,.5,.98])for(const v of [.02,.5,.98]){
    const point=new T.Vector3((u-.5)*W.width,(v-.5)*W.height,0).applyMatrix4(board.matrixWorld),origin=new T.Vector3(W.approach.x,eye,W.approach.z);
    ray.set(origin,point.clone().sub(origin).normalize());const hit=ray.intersectObjects(room.scene.children,true)[0];
    assert.ok(hit,`eye ${eye},uv ${u},${v}`);assert.equal(hit.object,board,`occluded eye ${eye},uv ${u},${v}`);close(hit.uv.x,u);close(hit.uv.y,v);
  }
});

test('the full west display fits the standing landscape view without a frame blocking its physical surface',()=>{
  const W=exhibits.worlds,camera=createLabCamera(T.PerspectiveCamera);camera.aspect=16/9;camera.updateProjectionMatrix();poseLabCamera(camera,{...W.approach,eye:1.62});
  for(const x of [-W.width/2,W.width/2])for(const y of [-W.height/2,W.height/2]){
    const projected=new T.Vector3(x,y,0).applyMatrix4(board.matrixWorld).project(camera);assert.ok(Math.abs(projected.x)<1&&Math.abs(projected.y)<1,'screen corner fits viewport');
  }
  // The former north location contains no retained board/frame in this height
  // range; a physical ray from its old viewing pose reaches the actual wall.
  const ray=new T.Raycaster(new T.Vector3(0,2.45,-4.6),new T.Vector3(0,0,-1));
  const hit=ray.intersectObjects(room.scene.children,true)[0];assert.ok(hit);assert.notEqual(hit.object,board);close(hit.point.z,-7);
});
