// CPU-only: input math, synthetic ray geometry, and a mocked canvas/DOM.
// Does not construct WebGLRenderer, launch a browser, or execute an entrant.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import * as T from '../lab-space/assets/vendor/three.module.min.js';
import * as input from '../lab-space/assets/interaction.mjs';
const {comparisonLayout,comparisonTargetAt,fitPreview,canvasPointer,firstVisibleHit,clickSlop,movedBeyondClick,intentionalClick}=input;

test('only the drawn preview or button bounds are interactive',()=>{
  const previews=comparisonLayout.previews.map(rect=>fitPreview(rect,960,600));
  for(const [x,y] of [[20,200],[40,200],[614,200],[640,200],[666,200],[1241,200],[200,104],[200,427],[200,461],[900,491],[145,545],[420,545],[640,545],[910,545],[1120,545],[200,580],[200,82]])
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

async function screenFixture({placeholder=false,failedImage=false}={}){
  const elements=new Map(),opened=[],images=[],storage=new Map();let viewerOptions;
  const drawing=new Proxy({},{get:()=>()=>{}});
  function element(){return {dataset:{},children:[],listeners:{},hidden:false,disabled:false,checked:true,
    getContext:()=>drawing,append(...children){this.children.push(...children);},replaceChildren(...children){this.children=children;},
    setAttribute(){},addEventListener(type,fn){this.listeners[type]=fn;},close(){},showModal(){this.shown=true;},focus(){}};}
  const byId=id=>{if(!elements.has(id))elements.set(id,element());return elements.get(id);};
  const entries=['a','b'].map((id,i)=>({id,promptId:'01',title:'Scene '+id,htmlSha256:'a'.repeat(64),comparisonModel:'model'+i,requestedConfiguration:'model'+i,...placeholder?{previewAvailable:false}:{}}));
  const context=vm.createContext({URL,URLSearchParams,console,
    document:{getElementById:byId,createElement:element,querySelectorAll:()=>[]},
    localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)},
    history:{state:{},replaceState(state){this.state=state;}},location:{href:'https://example.test/lab-space/',search:''},addEventListener(){},
    Image:class {constructor(){images.push(this);}set src(value){this.url=value;this.complete=!failedImage;this.naturalWidth=failedImage?0:960;this.naturalHeight=failedImage?0:600;}},
    fetch:async()=>({ok:true,json:async()=>({entries,prompts:[{id:'01',title:'Test prompt'}]})})
  });
  const synthetic=values=>new vm.SyntheticModule(Object.keys(values),function(){for(const [key,value]of Object.entries(values))this.setExport(key,value);},{context});
  const comparisons=new vm.SourceTextModule(readFileSync(new URL('../walkable-3d/assets/comparisons.js',import.meta.url),'utf8'),{context});
  const module=new vm.SourceTextModule(readFileSync(new URL('../lab-space/assets/walkable-screen.js',import.meta.url),'utf8'),{context,initializeImportMeta(meta){meta.url='https://example.test/lab-space/assets/walkable-screen.js';}});
  await module.link(path=>path.endsWith('interaction.mjs')?synthetic(input):path.endsWith('viewer.js')?synthetic({createViewer(options){viewerOptions=options;return {isOpen:false,open(entry){opened.push(entry.id);},close(){}};}}):path.endsWith('public-judgments.js')?synthetic({publicVotingEnabled:false,submitPublicVote(){throw Error('Unexpected public write');},hasPublicVote:()=>false,loadPublicLeaderboard(){},renderPublicLeaderboard(){},subscribePublicJudgments(){}}):path.endsWith('comparisons.js')?comparisons:synthetic({createGradeForm(){},renderLeaderboard(){}}));
  await module.evaluate();
  const api=module.namespace.createWalkableScreen({changed(){},suspend(){},resume(){},approach(){}});
  await new Promise(resolve=>setImmediate(resolve));
  return {api,byId,opened,entries,images,storage,ready:entry=>viewerOptions.onReady(entry)};
}

test('screen integration rejects captions, gaps, failed images and gated votes; explicit buttons still work',async()=>{
  const f=await screenFixture();assert.ok(f.api.ready);
  for(const point of [{x:640,y:200},{x:100,y:461},{x:40,y:200},{x:420,y:540},{x:200,y:540}]){assert.equal(f.api.hitTest(point),null);f.api.activate(point);}
  assert.equal(f.opened.length,0);
  f.api.activate({x:100,y:200});assert.deepEqual(f.opened,['a']);
  f.ready(f.entries[0]);assert.equal(f.api.hitTest({x:200,y:540}),null);
  f.ready(f.entries[1]);assert.equal(f.api.hitTest({x:200,y:540}).kind,'vote');
  f.api.activate({x:200,y:540});assert.equal(JSON.parse(f.storage.get('lab.walkable3d.judgments.v1')).preferences['a::b'].choice,'a');
  assert.equal(f.byId('screen-reveal').hidden,false);
  f.byId('screen-cards').children[1].children[0].listeners.click();assert.deepEqual(f.opened,['a','b']);
  f.byId('screen-controls').listeners.click();assert.equal(f.byId('comparison-dialog').shown,true);
  const failed=await screenFixture({failedImage:true});assert.equal(failed.api.hitTest({x:100,y:200}),null);
  failed.byId('screen-cards').children[0].children[0].listeners.click();assert.deepEqual(failed.opened,['a']);
});

test('both explicit missing-preview placeholders remain clickable without broad fallback',async()=>{
  const f=await screenFixture({placeholder:true});
  f.api.activate({x:100,y:200});f.api.activate({x:800,y:200});assert.deepEqual(f.opened,['a','b']);
  assert.equal(f.api.hitTest({x:640,y:200}),null);assert.equal(f.api.hitTest({x:100,y:490}),null);
});
