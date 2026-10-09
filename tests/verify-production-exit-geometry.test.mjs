// Actual pinned Three.js meshes, transforms, ray intersections and disposal;
// CPU only. This file never creates a renderer, canvas, server or browser.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createExitDoors} from '../lab-space/assets/claude11/exit-doors.mjs';
import {exitLayout,doorColliders,doorCanPass} from '../lab-space/assets/production-exit.mjs';
const dependencyRoot=process.env.LAB_PRODUCTION_DEPENDENCIES;
if(!dependencyRoot)throw new Error('Set LAB_PRODUCTION_DEPENDENCIES to the documented pinned developer node_modules directory');
const threeRoot=join(resolve(dependencyRoot),'three');
assert.equal(JSON.parse(readFileSync(join(threeRoot,'package.json'),'utf8')).version,'0.186.1');
const T=await import(pathToFileURL(join(threeRoot,'build','three.module.js')).href);assert.equal(T.REVISION,'186');
function room(){
  const materials=Object.fromEntries(['alu','wall','wallAccent','floor','glass','steel'].map(name=>[name,new T.MeshStandardMaterial({color:0xffffff})]));
  materials.glass.transparent=true;materials.glass.opacity=.16;materials.glass.side=T.DoubleSide;materials.glass.userData.cast=false;materials.glass.userData.receive=false;
  const doors=createExitDoors(T,materials),scene=new T.Scene();scene.add(doors.group);scene.updateMatrixWorld(true);scene.matrixWorldAutoUpdate=false;
  const glass=doors.group.children.find(mesh=>mesh.material===materials.glass);
  return {materials,doors,scene,glass,dispose(){doors.dispose();for(const m of Object.values(materials))m.dispose();}};
}
const close=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-6,`${actual} versus ${expected}`);

test('all four real glass leaves follow the same centres, widths and depths used by collision',()=>{
  const r=room(),matrix=new T.Matrix4();
  for(const progress of [0,.25,.6,1]){
    r.doors.setProgress({inner:progress,outer:1-progress});
    for(const [index,[id,value,side]] of [['inner',progress,0],['inner',progress,1],['outer',1-progress,0],['outer',1-progress,1]].entries()){
      r.glass.getMatrixAt(index,matrix);const bounds=r.glass.geometry.boundingBox.clone().applyMatrix4(matrix),collider=doorColliders(id,value)[side];
      close(bounds.min.x,collider.minX);close(bounds.max.x,collider.maxX);
      assert.ok(bounds.min.z>=collider.minZ-1e-6&&bounds.max.z<=collider.maxZ+1e-6);
      close(bounds.min.y,.02);close(bounds.max.y,2.42);
    }
  }
  r.dispose();
});

test('real mesh rays are blocked by closed panes and clear after both sliders open, even with frozen scene matrices',()=>{
  const r=room(),ray=new T.Raycaster();
  for(const id of ['inner','outer']){
    ray.set(new T.Vector3(.2,1.62,exitLayout.doors[id].z-1),new T.Vector3(0,0,1));ray.far=2;
    assert.ok(ray.intersectObject(r.doors.group,true).length,'closed pane blocks the physical ray');
  }
  r.doors.setProgress({inner:1,outer:1});
  for(const id of ['inner','outer'])for(const x of [0,.2,.75]){
    ray.set(new T.Vector3(x,1.62,exitLayout.doors[id].z-1),new T.Vector3(0,0,1));ray.far=2;
    assert.equal(ray.intersectObject(r.doors.group,true).length,0,'open gap is physically empty');assert.equal(doorCanPass(id,x,1),true);
  }
  r.dispose();
});

test('moving instanced bounds refresh for picking and culling and unchanged samples avoid uploads',()=>{
  const r=room(),initial=r.glass.boundingBox.clone(),version=r.glass.instanceMatrix.version;
  assert.equal(r.doors.setProgress({inner:0,outer:0}),false);assert.equal(r.glass.instanceMatrix.version,version);
  assert.equal(r.doors.setProgress({inner:1,outer:1}),true);
  assert.ok(r.glass.boundingBox.max.x>initial.max.x);assert.ok(r.glass.boundingBox.min.x<initial.min.x);
  const updatedVersion=r.glass.instanceMatrix.version;assert.equal(r.doors.setProgress({inner:1,outer:1}),false);assert.equal(r.glass.instanceMatrix.version,updatedVersion);
  // Shared batches: four moving draw calls and four static material batches.
  assert.equal(r.doors.group.children.filter(mesh=>mesh.name==='Exit sliding panels').length,4);
  assert.equal(r.doors.group.children.filter(mesh=>mesh.name==='Exit vestibule frame').length,4);
  r.dispose();
});

test('landing and replacement wall geometry has a real opening and a floor below the exit threshold',()=>{
  const r=room(),ray=new T.Raycaster();r.doors.setProgress({inner:1,outer:1});
  ray.set(new T.Vector3(0,1.62,10.5),new T.Vector3(0,0,1));ray.far=1.1;
  assert.equal(ray.intersectObject(r.doors.group,true).length,0,'second doorway does not retain a solid rear wall');
  ray.set(new T.Vector3(0,1.62,exitLayout.threshold.z),new T.Vector3(0,-1,0));ray.far=2;
  const floorHit=ray.intersectObject(r.doors.group,true)[0];assert.ok(floorHit);close(floorHit.point.y,0);
  r.dispose();
});

test('door cleanup frees only its owned geometry and instances once, while retaining shared room materials',()=>{
  const r=room(),geometries=new Set(r.doors.group.children.map(mesh=>mesh.geometry));let geometryDisposals=0,instanceDisposals=0,materialDisposals=0;
  for(const geometry of geometries)geometry.addEventListener('dispose',()=>geometryDisposals++);
  for(const mesh of r.doors.group.children)mesh.addEventListener('dispose',()=>instanceDisposals++);
  for(const material of Object.values(r.materials))material.addEventListener('dispose',()=>materialDisposals++);
  const count=r.doors.group.children.length;r.doors.dispose();r.doors.dispose();
  assert.equal(geometryDisposals,2);assert.equal(instanceDisposals,count);assert.equal(materialDisposals,0);assert.equal(r.scene.children.length,0);
  assert.equal(r.doors.setProgress({inner:1,outer:1}),false);
  for(const material of Object.values(r.materials))material.dispose();
});
