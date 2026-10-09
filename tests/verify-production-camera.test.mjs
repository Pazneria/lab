// Actual Three.js transforms and ray intersections, CPU only. No renderer/DOM.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createLabCamera,poseLabCamera} from '../lab-space/assets/claude11/camera.mjs';

const dependencyRoot=process.env.LAB_PRODUCTION_DEPENDENCIES;
if(!dependencyRoot)throw new Error('Set LAB_PRODUCTION_DEPENDENCIES to the documented pinned developer node_modules directory');
const threeRoot=join(resolve(dependencyRoot),'three');
assert.equal(JSON.parse(readFileSync(join(threeRoot,'package.json'),'utf8')).version,'0.186.1');
const T=await import(pathToFileURL(join(threeRoot,'build','three.module.js')).href);
assert.equal(T.REVISION,'186');
const close=(actual,expected,label)=>assert.ok(actual.distanceTo(expected)<1e-10,`${label}: ${actual.toArray()} versus ${expected.toArray()}`);

test('production camera moves its world matrix and inverse to the entrance pose',()=>{
  const camera=createLabCamera(T.PerspectiveCamera);
  assert.equal(camera.fov,70);assert.equal(camera.near,.04);assert.equal(camera.far,80);assert.equal(camera.rotation.order,'YXZ');
  poseLabCamera(camera,{x:0,z:7.3,yaw:0,pitch:-.04});
  const eye=new T.Vector3(0,1.62,7.3);
  close(new T.Vector3().setFromMatrixPosition(camera.matrixWorld),eye,'world eye');
  close(eye.clone().applyMatrix4(camera.matrixWorldInverse),new T.Vector3(),'inverse eye');
  const ray=new T.Raycaster();ray.setFromCamera(new T.Vector2(0,0),camera);
  close(ray.ray.origin,eye,'center ray origin');
  close(ray.ray.direction,new T.Vector3(0,Math.sin(-.04),-Math.cos(-.04)),'center ray direction');
});

test('repeated movement, yaw, pitch and crouch update the same real camera',()=>{
  const camera=createLabCamera(T.PerspectiveCamera),ray=new T.Raycaster();
  for(const pose of [
    {x:2.3,z:3.05,yaw:0,pitch:-.57},
    {x:-9.4,z:.9,yaw:1.45,pitch:-.2,crouch:true},
    {x:8,z:-.9,yaw:-1.25,pitch:.15,eye:1.4},
    {x:0,z:7.3,yaw:Math.PI,pitch:0},
  ]){
    poseLabCamera(camera,pose);
    const eye=new T.Vector3(pose.x,pose.eye??(pose.crouch?1:1.62),pose.z);
    const direction=new T.Vector3(0,0,-1).applyEuler(new T.Euler(pose.pitch,pose.yaw,0,'YXZ'));
    close(new T.Vector3().setFromMatrixPosition(camera.matrixWorld),eye,'moving world eye');
    close(eye.clone().applyMatrix4(camera.matrixWorldInverse),new T.Vector3(),'moving inverse eye');
    ray.setFromCamera(new T.Vector2(0,0),camera);close(ray.ray.origin,eye,'moving ray origin');close(ray.ray.direction,direction,'moving ray direction');
  }
});

test('freezing the static room does not freeze the detached camera or board picking',()=>{
  const scene=new T.Scene(),board=new T.Mesh(new T.PlaneGeometry(3.36,1.89),new T.MeshBasicMaterial());
  board.position.set(0,2.45,-6.915);scene.add(board);scene.updateMatrixWorld(true);scene.matrixWorldAutoUpdate=false;
  const originalBoardMatrix=board.matrixWorld.clone(),camera=createLabCamera(T.PerspectiveCamera),ray=new T.Raycaster();
  poseLabCamera(camera,{x:0,z:-4.6,yaw:0,pitch:Math.atan2(2.45-1.62,2.315)});
  for(const aspect of [16/9,9/16]){
    camera.aspect=aspect;camera.updateProjectionMatrix();ray.setFromCamera(new T.Vector2(0,0),camera);
    const hit=ray.intersectObject(board)[0];assert.ok(hit,'center ray intersects the actual board');
    close(hit.point,new T.Vector3(0,2.45,-6.915),'board center');
    assert.ok(Math.abs(hit.uv.x-.5)<1e-10&&Math.abs(hit.uv.y-.5)<1e-10);
  }
  assert.deepEqual(board.matrixWorld.elements,originalBoardMatrix.elements);
  board.geometry.dispose();board.material.dispose();
});
