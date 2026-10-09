// CPU-only: input math, synthetic ray geometry, and a mocked canvas/DOM.
// Does not construct WebGLRenderer, launch a browser, or execute an entrant.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import * as T from '../lab-space/assets/vendor/three.module.min.js';
import * as input from '../lab-space/assets/interaction.mjs';
const {comparisonLayout,comparisonTargetAt,fitPreview,canvasPointer,firstVisibleHit,clickSlop,movedBeyondClick,intentionalClick}=input;

test('only the drawn scene cards or physical action buttons are interactive',()=>{
  const previews=comparisonLayout.cards;
  for(const [x,y] of [[20,200],[615,200],[640,200],[1241,200],[200,104],[200,505],[145,545],[420,545],[640,545],[910,545],[1120,545],[200,580],[200,82],[1100,75],[1000,545]])
    assert.equal(comparisonTargetAt({x,y},previews),null,`${x},${y}`);
  assert.deepEqual(comparisonTargetAt({x:100,y:200},previews),{kind:'entry',slot:0});
  assert.deepEqual(comparisonTargetAt({x:800,y:200},previews),{kind:'entry',slot:1});
  for(const rect of comparisonLayout.buttons){
    assert.equal(comparisonTargetAt({x:rect.x,y:rect.y},previews),rect);
    assert.equal(comparisonTargetAt({x:rect.x+rect.width,y:rect.y+rect.height},previews),null);
  }
  assert.equal(fitPreview(comparisonLayout.previews[0],0,600),null);
  assert.equal(fitPreview(comparisonLayout.previews[0],Infinity,600),null);
});

test('ray coordinates use CSS bounds, including offset/scaled canvas and outside rejection',()=>{
  const rect={left:180,top:75,width:640,height:300};
  assert.deepEqual(canvasPointer(500,225,rect),{x:0,y:0});
  assert.deepEqual(canvasPointer(180,75,rect),{x:-1,y:1});
  assert.deepEqual(canvasPointer(660,150,rect),{x:.5,y:.5});
  for(const [x,y] of [[179,150],[820,150],[500,74],[500,375],[NaN,200]])assert.equal(canvasPointer(x,y,rect),null);
  for(const bad of [null,{...rect,width:0},{...rect,height:-1},{...rect,left:NaN},{...rect,width:Infinity}])assert.equal(canvasPointer(500,200,bad),null);
});

test('press/release must share target, pointer, stable view and click intent',()=>{
  const view={x:0,z:4,yaw:0,pitch:-.06},event={pointerId:7,button:0,isPrimary:true,clientX:103,clientY:101};
  const gesture={id:7,startX:100,startY:100,slop:clickSlop('mouse'),moved:false,targetKey:'entry:a',view:{...view}};
  assert.ok(intentionalClick(gesture,event,'entry:a',view));
  for(const target of ['entry:b','inspect',null])assert.equal(intentionalClick(gesture,event,target,view),false);
  for(const patch of [{pointerId:8},{button:2},{isPrimary:false},{clientX:106}])assert.equal(intentionalClick(gesture,{...event,...patch},'entry:a',view),false);
  assert.equal(intentionalClick({...gesture,targetKey:null},event,null,view),false);
  assert.equal(intentionalClick(gesture,event,'entry:a',{...view,yaw:.001}),false);
  assert.equal(intentionalClick(gesture,event,'entry:a',{...view,z:4.001}),false);
  // A drag that returns to its start stays a drag.
  assert.ok(movedBeyondClick(gesture,{clientX:120,clientY:100}));
  assert.equal(intentionalClick({...gesture,moved:true},{...event,clientX:100,clientY:100},'entry:a',view),false);
  assert.equal(clickSlop('touch'),8);assert.equal(clickSlop('pen'),5);
});

test('actual CPU raycast keeps visible occluders and ignores hidden geometry',()=>{
  const root=new T.Group(),target=new T.Mesh(new T.PlaneGeometry(2,2),new T.MeshBasicMaterial());
  target.userData.destination='catalog';root.add(target);
  const occluder=new T.Mesh(new T.PlaneGeometry(.5,.5),new T.MeshBasicMaterial());occluder.position.z=1;root.add(occluder);
  const marker=new T.Mesh(new T.PlaneGeometry(2,2),new T.MeshBasicMaterial());marker.position.z=2;root.add(marker);
  const camera=new T.PerspectiveCamera(60,2,0.1,20);camera.position.z=4;camera.updateMatrixWorld();root.updateMatrixWorld(true);
  const ray=new T.Raycaster();ray.setFromCamera(new T.Vector2(0,0),camera);
  const hits=()=>ray.intersectObjects(root.children,true);
  assert.equal(firstVisibleHit(hits(),marker).object,occluder);
  assert.equal(firstVisibleHit(hits(),marker).object.userData.destination,undefined);
  occluder.material.visible=false;assert.equal(firstVisibleHit(hits(),marker).object,target);
  occluder.material.visible=true;occluder.visible=false;assert.equal(firstVisibleHit(hits(),marker).object,target);
  occluder.visible=true;const hidden=new T.Group();hidden.visible=false;root.add(hidden);hidden.add(occluder);root.updateMatrixWorld(true);
  assert.equal(firstVisibleHit(hits(),marker).object,target);
  ray.setFromCamera(new T.Vector2(.95,.95),camera);assert.equal(firstVisibleHit(hits(),marker),null);
  for(const mesh of [target,occluder,marker]){mesh.geometry.dispose();mesh.material.dispose();}
});

import {screenFixture} from './verify-walkable-lab-fixture.mjs';

test('physical whitespace never opens a panel while whole scene cards and gated votes act directly',async()=>{
  const f=await screenFixture();assert.ok(f.api.ready);
  for(const point of [{x:640,y:200},{x:420,y:540},{x:1100,y:75},{x:1000,y:545}]){assert.equal(f.api.hitTest(point),null);f.api.activate(point);}
  assert.equal(f.byId('comparison-dialog').open,false);assert.equal(f.byId('comparison-dialog').shown,undefined);
  for(const point of [{x:100,y:461},{x:40,y:200},{x:610,y:200}])assert.equal(f.api.hitTest(point).kind,'entry');
  for(const point of [{x:-1,y:200},{x:1280,y:200},{x:200,y:600},{x:200,y:-1},{x:NaN,y:200}])assert.equal(f.api.hitTest(point),null);
  assert.equal(f.api.hitTest({x:200,y:540}),null);
  assert.equal(f.opened.length,0);
  f.api.activate({x:100,y:200});assert.deepEqual(f.opened,['a']);
  await f.ready();assert.equal(f.api.hitTest({x:200,y:540}),null);
  f.api.activate({x:800,y:200});await f.ready();assert.equal(f.api.hitTest({x:200,y:540}).kind,'vote');
  f.api.activate({x:200,y:540});assert.equal(JSON.parse(f.storage.get('lab.walkable3d.judgments.v1')).preferences['a::b'].choice,'a');
  assert.equal(f.byId('screen-reveal').hidden,false);
  f.byId('screen-cards').children[1].children[0].listeners.click();assert.deepEqual(f.opened,['a','b','b']);await f.ready();
  f.byId('screen-controls').listeners.click();assert.equal(f.byId('comparison-dialog').shown,true);
  for(const options of [{failedImage:true},{pendingImage:true}]){const failed=await screenFixture(options);assert.equal(failed.api.hitTest({x:100,y:200}).kind,'entry');failed.api.activate({x:100,y:200});assert.deepEqual(failed.opened,['a']);assert.equal(failed.byId('comparison-dialog').open,false);}
});

test('missing-preview placeholders open scenes and board whitespace stays in the room',async()=>{
  const f=await screenFixture({placeholder:true});
  f.api.activate({x:100,y:200});await f.returnVisit();f.api.activate({x:800,y:200});await f.returnVisit();assert.deepEqual(f.opened,['a','b']);
  assert.equal(f.api.hitTest({x:640,y:200}),null);assert.equal(f.api.hitTest({x:100,y:490}).kind,'entry');assert.equal(f.byId('comparison-dialog').open,false);
});

import {createWorldsBoard} from '../lab-space/assets/worlds-board.mjs';
import {exhibits} from '../lab-space/assets/navigation.mjs';
test('actual board geometry: all face quadrants, exact UVs, frame, outside gaps and furniture occlusion',()=>{
 const world=exhibits.worlds,{face,frame}=createWorldsBoard(T,world,null),scene=new T.Scene();scene.add(frame,face);scene.updateMatrixWorld(true);
 const camera=new T.PerspectiveCamera(65,1.7,.08,70);camera.position.set(0,1.68,5.4);camera.lookAt(0,world.y,world.z);camera.updateMatrixWorld(true);
 const ray=new T.Raycaster();
 const hitAt=(x,y)=>{const pixel=new T.Vector3(x,y,world.z).project(camera);ray.setFromCamera(new T.Vector2(pixel.x,pixel.y),camera);return firstVisibleHit(ray.intersectObjects(scene.children,false));};
 for(const u of [.001,.25,.5,.75,.999])for(const v of [.001,.25,.5,.75,.999]){
  const hit=hitAt(world.x+(u-.5)*world.width,world.y+(v-.5)*world.height);assert.equal(hit.object,face);assert(Math.abs(hit.uv.x-u)<1e-7);assert(Math.abs(hit.uv.y-v)<1e-7);
 }
 assert.equal(hitAt(world.width/2+.04,world.y).object,frame);
 for(const [x,y] of [[world.width/2+.2,world.y],[0,world.y+world.height/2+.2],[-world.width/2-.2,world.y]])assert.equal(hitAt(x,y),null);
 const furniture=new T.Mesh(new T.BoxGeometry(.5,.5,.3),new T.MeshBasicMaterial());furniture.position.set(0,world.y,world.z+.6);scene.add(furniture);scene.updateMatrixWorld(true);
 assert.equal(hitAt(0,world.y).object,furniture);assert.equal(furniture.userData.worlds,undefined);assert.equal(furniture.userData.comparison,undefined);
 for(const mesh of [face,frame,furniture]){mesh.geometry.dispose();mesh.material.dispose();}
});
test('leaderboard is an explicit accessible fallback and physical screen clicks cannot open its panel',async()=>{
 const f=await screenFixture();f.api.activate({x:1100,y:75});assert.equal(f.byId('comparison-dialog').open,false);assert.equal(f.byId('screen-leaderboard').focused,undefined);
 f.byId('screen-leaderboard-button').listeners.click();assert.equal(f.byId('comparison-dialog').shown,true);assert.equal(f.byId('screen-leaderboard').focused,true);assert.equal(f.byId('screen-leaderboard').scrolled,true);assert.deepEqual(f.opened,[]);assert.deepEqual(JSON.parse(f.storage.get('lab.walkable3d.judgments.v1')).preferences,{});
});
test('model reveal labels contain model names only; requested configuration is retained',async()=>{
 const f=await screenFixture();f.entries[0].requestedConfiguration='Model Zero / XHIGH (backend unknown)';f.api.activate({x:100,y:200});await f.ready();f.api.activate({x:800,y:200});await f.ready();f.api.activate({x:200,y:540});
 assert.equal(f.byId('screen-reveal').children[1].textContent,'A — Model Zero');assert.equal(f.byId('screen-reveal').children[2].textContent,'B — model1');assert.equal(f.entries[0].requestedConfiguration,'Model Zero / XHIGH (backend unknown)');
});
