// Authored host geometry, actual pinned Three.js transforms/rays and continuous
// navigation. CPU only: no textures/canvas, renderer, browser, server or entrant.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
import {createWorkbenchFigurine,workbenchLayout,FIGURINE_SOURCE} from '../lab-space/assets/claude11/workbench.mjs';
import {createHash} from 'node:crypto';
import {exhibits} from '../lab-space/assets/claude11/layout.mjs';
import {colliders} from '../lab-space/assets/claude11/colliders.mjs';
import {createLabCamera,poseLabCamera} from '../lab-space/assets/claude11/camera.mjs';
import {spawn,approaches,walkable,nearby,segmentFree,planRoute,followRoute,setExitDoors} from '../lab-space/assets/production-navigation.mjs';

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

const {GLTFLoader}=await import(pathToFileURL(join(threeRoot,'examples/jsm/loaders/GLTFLoader.js')).href);
const raw=readFileSync(new URL('../lab-space/figurines/crypt-warden/skeleton.glb',import.meta.url));
const manifest=JSON.parse(readFileSync(new URL('../lab-space/figurines/crypt-warden/source.manifest.json',import.meta.url),'utf8'));
const hash=data=>createHash('sha256').update(data).digest('hex');
const gltf=await new GLTFLoader().parseAsync(raw.buffer.slice(raw.byteOffset,raw.byteOffset+raw.byteLength),'');
function geometryHashes(root){const result=[];root.traverse(o=>{if(o.isMesh){for(const [key,a] of Object.entries(o.geometry.attributes))result.push([key,hash(Buffer.from(a.array.buffer,a.array.byteOffset,a.array.byteLength))]);if(o.geometry.index){const a=o.geometry.index.array;result.push(['index',hash(Buffer.from(a.buffer,a.byteOffset,a.byteLength))]);}if(o.skeleton)result.push(['inverseBind',hash(Buffer.from(new Float64Array(o.skeleton.boneInverses.flatMap(m=>m.elements)).buffer))]);}});return result;}
const originalBuffers=geometryHashes(gltf.scene),room=authoredRoom(),figure=createWorkbenchFigurine(T,gltf.scene);room.scene.add(figure.root);room.scene.updateMatrixWorld(true);
test.after(()=>{const g=new Set(),m=new Set(),textures=new Set();room.scene.traverse(o=>{if(o.geometry)g.add(o.geometry);for(const material of [].concat(o.material||[])){m.add(material);if(material.map)textures.add(material.map);}});for(const v of g)v.dispose();for(const v of m)v.dispose();for(const v of textures)v.dispose();room.scene.clear();esbuild.stop();});

test('accepted GLB hash, manifest and complete source buffers remain exact after instance scaling',()=>{
 assert.equal(hash(raw),FIGURINE_SOURCE.sha256);assert.equal(raw.length,FIGURINE_SOURCE.bytes);assert.equal(manifest.sha256,FIGURINE_SOURCE.sha256);assert.equal(gltf.animations.length,6);
 assert.deepEqual(geometryHashes(gltf.scene),originalBuffers);assert.deepEqual(figure.actor.scale.toArray(),[.19,.19,.19]);assert.deepEqual(gltf.scene.scale.toArray(),[1,1,1]);assert.equal(figure.root.userData.sourceTriangles,4202);
 const bounds=new T.Box3().setFromObject(figure.actor);close(bounds.min.y,.904);close(bounds.max.y-bounds.min.y,.3382);assert.equal(figure.actor.children[0],gltf.scene);
});
test('small base fits the existing cart counter, clears its tools and retains all furniture/screens/colliders',()=>{
 assert.deepEqual(room.generatedColliders,colliders);assert.equal(exhibits.animation,workbenchLayout);assert.equal(room.screens.filter(s=>s.id==='joints').length,1);assert.equal(room.screens.filter(s=>s.id==='trace').length,1);
 const {cart,local,baseRadius}=workbenchLayout;assert.ok(Math.abs(local.x)+baseRadius<cart.width/2);assert.ok(Math.abs(local.z)+baseRadius<cart.depth/2);assert.ok(local.z+baseRadius<-.01,'clear yellow tool box');assert.ok(local.x+baseRadius<.04,'clear blue tool handle');
 assert.ok(figure.height<.35);assert.ok(figure.root.getObjectByName('figurine-selectable-bounds').layers.test(new T.Layers())===false);assert.ok(!figure.root.getObjectByName('figurine-soft-key').castShadow);
 assert.equal(figure.root.getObjectByName('animation-studio-entry'),undefined);assert.equal(figure.root.getObjectByName('figurine-base').userData.destination,'animation');
});
test('counter approach remains collision-free and reachable from Lab spawn',()=>{
 assert.equal(walkable(workbenchLayout.approach),true);assert.equal(nearby(workbenchLayout.approach),'animation');const path=planRoute(spawn(),workbenchLayout.approach);assert.ok(path?.length);let from=spawn();for(const point of path){assert.equal(segmentFree(from,point),true);from=point;}
});
test('real standing/crouched rays select the tiny figure through rib gaps before room occluders',()=>{
 const ray=new T.Raycaster();ray.layers.enable(1);for(const eye of [1,1.62])for(const fraction of [.12,.35,.55,.85]){
  const point=new T.Vector3(0,workbenchLayout.baseHeight+figure.height*fraction,0).applyMatrix4(figure.root.matrixWorld),origin=new T.Vector3(workbenchLayout.approach.x,eye,workbenchLayout.approach.z);
  ray.set(origin,point.clone().sub(origin).normalize());const hit=ray.intersectObjects(room.scene.children,true)[0];assert.ok(hit);assert.equal(hit.object.userData.destination,'animation',`occluded eye ${eye},height ${fraction}`);
 }
});
test('shared approach aims the actual FPS camera at the figurine, with no oversized interaction plane',()=>{
 const camera=createLabCamera(T.PerspectiveCamera);camera.aspect=16/9;camera.updateProjectionMatrix();poseLabCamera(camera,{...workbenchLayout.approach,eye:1.62});const ray=new T.Raycaster();ray.layers.enable(1);ray.setFromCamera(new T.Vector2(),camera);
 const hit=ray.intersectObjects(room.scene.children,true)[0];assert.ok(hit);assert.equal(hit.object.userData.destination,'animation');assert.ok(hit.distance<2);
});
test('subtle hover changes only cue intensity, with no animated loop or geometry mutation',()=>{
 const before=geometryHashes(gltf.scene);assert.equal(figure.setHovered(true),true);assert.equal(figure.setHovered(true),false);assert.equal(figure.hovered,true);assert.equal(figure.setHovered(false),true);assert.equal(figure.setHovered(false),false);assert.deepEqual(geometryHashes(gltf.scene),before);
});
