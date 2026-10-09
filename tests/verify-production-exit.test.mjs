import test from 'node:test';
import assert from 'node:assert/strict';
import {HOME_URL,exitLayout,exitStaticColliders,isOriginalDoorCollider,createExitController,doorColliders,doorCanPass} from '../lab-space/assets/production-exit.mjs';
import {colliders} from '../lab-space/assets/claude11/colliders.mjs';

function traveller(options={}){
  const controller=createExitController(),signals={preload:[],navigate:[]};let p={x:0,z:7.3},last;
  function sample(point=p,dt=.05,extra={}){
    p={...point};last=controller.update(p,{dt,...options,...extra});
    for(const event of ['preload','navigate'])if(last[event])signals[event].push(last[event]);
    return last;
  }
  function wait(seconds=1,extra={}){for(let i=0;i<Math.ceil(seconds/.05);i++)sample(p,.05,extra);return last;}
  function walk(z,step=.1,extra={}){
    const direction=Math.sign(z-p.z);
    while(direction*(z-p.z)>1e-10)sample({x:p.x,z:p.z+direction*Math.min(step,Math.abs(z-p.z))},.05,extra);
    return last;
  }
  return {controller,signals,sample,wait,walk,get position(){return {...p};},get state(){return last;}};
}
function approach(t){t.sample();t.walk(7.8);t.wait();}
function successfulTrip(t){approach(t);t.walk(10);t.wait();t.walk(11.93);}

test('fresh spawn stays shut and quiet, and teleporting into the vestibule cannot preload',()=>{
  const t=traveller();t.sample();t.wait(3);
  assert.deepEqual(t.state.doors,{inner:0,outer:0});assert.equal(t.state.needsAnimation,false);
  assert.deepEqual(t.signals.preload,[]);assert.deepEqual(t.signals.navigate,[]);
  t.sample({x:0,z:10});t.wait(2);assert.deepEqual(t.signals.preload,[]);
});

test('only the second-door approach signals one bounded homepage preload',()=>{
  const t=traveller();approach(t);assert.deepEqual(t.signals.preload,[]);
  t.walk(9.7);assert.deepEqual(t.signals.preload,[]);
  t.walk(9.8);assert.deepEqual(t.signals.preload,[HOME_URL]);
  t.walk(9);t.walk(10);t.wait();assert.deepEqual(t.signals.preload,[HOME_URL]);
  assert.equal(new URL(HOME_URL).origin,'https://pazneria.github.io');assert.equal(new URL(HOME_URL).pathname,'/');
});

test('a continuous trip crosses two open physical gaps and the small outer threshold once',()=>{
  const t=traveller();successfulTrip(t);
  assert.deepEqual(t.signals.navigate,[HOME_URL]);assert.equal(t.state.phase,'complete');assert.equal(t.state.needsAnimation,false);
  t.wait();t.walk(11);t.walk(12);assert.deepEqual(t.signals.navigate,[HOME_URL]);
});

test('the first doorway alone and merely standing in the vestibule never navigate',()=>{
  const t=traveller();approach(t);t.walk(10);t.wait(5);
  assert.equal(t.state.phase,'vestibule');assert.deepEqual(t.signals.navigate,[]);
  t.walk(11.7);t.wait(5);assert.equal(t.state.phase,'landing');assert.deepEqual(t.signals.navigate,[]);
});

test('backtracking through the inner door cancels the trip and returning through the outer resets that crossing',()=>{
  const t=traveller();approach(t);t.walk(10);t.wait();t.walk(11.7);
  assert.equal(t.state.phase,'landing');t.walk(11.4);assert.equal(t.state.phase,'vestibule');
  t.walk(8.3);assert.equal(t.state.phase,'lab');assert.deepEqual(t.signals.navigate,[]);
  t.walk(10);t.wait();t.walk(11.93);assert.deepEqual(t.signals.navigate,[HOME_URL]);
});

test('focus, modal and inactive changes freeze panels and require a fresh outer crossing',()=>{
  for(const disabled of [{focused:false},{modal:true},{active:false}]){
    const t=traveller();approach(t);t.walk(10);t.wait();t.walk(11.7);
    const doors=t.state.doors;t.sample(t.position,.05,disabled);
    assert.deepEqual(t.state.doors,doors);assert.equal(t.state.phase,'vestibule');assert.equal(t.state.needsAnimation,false);
    t.walk(11.93);assert.deepEqual(t.signals.navigate,[]);
    // Resumption at the threshold cannot reuse a crossing made while paused.
    t.walk(11.4);t.walk(11.93);assert.deepEqual(t.signals.navigate,[HOME_URL]);
  }
});

test('resuming inside the vestibule can walk out without going back to the first door',()=>{
  const t=traveller();approach(t);t.walk(10);t.wait();t.sample(t.position,.05,{focused:false});
  t.sample(t.position,0);assert.deepEqual(t.signals.navigate,[]);
  t.walk(11.93);assert.deepEqual(t.signals.navigate,[HOME_URL]);
});

test('explicit trip cancellation clears both planes while retaining one-shot preload deduplication',()=>{
  const t=traveller();approach(t);t.walk(10);t.wait();t.controller.cancel();
  t.walk(11.93);assert.deepEqual(t.signals.navigate,[]);
  t.walk(8.3);t.walk(10);t.wait();t.walk(11.93);
  assert.deepEqual(t.signals.navigate,[HOME_URL]);assert.deepEqual(t.signals.preload,[HOME_URL]);
});

test('a paused tab, non-finite sample or teleport cannot jump past the exit',()=>{
  for(const invalid of [
    t=>t.sample({x:0,z:11.93},.05),
    t=>t.sample({x:0,z:11.93},20),
    t=>t.sample({x:NaN,z:11.7},.05),
    t=>t.sample({x:0,z:Infinity},.05),
  ]){
    const t=traveller();approach(t);t.walk(10);t.wait();invalid(t);
    assert.equal(t.state.navigate,null);assert.equal(t.state.phase,'lab');
    assert.deepEqual(t.signals.navigate,[]);
  }
});

test('starting outside the second door cannot invent a first crossing',()=>{
  const t=traveller();t.sample({x:0,z:11.6});t.wait();t.walk(11.93);
  assert.deepEqual(t.signals.navigate,[]);assert.equal(t.state.phase,'lab');
});

test('a closed or insufficiently open panel blocks exit evidence at its true opening',()=>{
  const t=traveller();t.sample({x:0,z:8.45},0);t.sample({x:0,z:8.55},0);
  assert.equal(t.state.phase,'lab');assert.deepEqual(t.state.doors,{inner:0,outer:0});
  const passage=createExitController();passage.update({x:0,z:8.4},{dt:0});
  for(let i=0;i<3;i++)passage.update({x:0,z:8.4},{dt:.05});
  const state=passage.update({x:0,z:8.6},{dt:0});assert.equal(state.phase,'lab');assert.equal(doorCanPass('inner',0,state.doors.inner),false);
  assert.equal(doorCanPass('inner',0,0),false);assert.equal(doorCanPass('inner',0,1),true);
  assert.equal(doorCanPass('outer',1,1),false);assert.equal(doorCanPass('outer',.75,1),true);
});

test('an off-centre crossing through a pane cannot arm the exit',()=>{
  const t=traveller();approach(t);t.sample({x:1.1,z:8.4});t.wait();t.sample({x:1.1,z:8.6});
  assert.equal(t.state.phase,'lab');assert.deepEqual(t.signals.navigate,[]);
});

test('slow movement and slow door animation work by elapsed time rather than frame count',()=>{
  const normal=traveller(),slow=traveller({slowMotion:true});normal.sample({x:0,z:7.8});slow.sample({x:0,z:7.8});normal.wait(.4);slow.wait(.4);
  assert.ok(slow.state.doors.inner<normal.state.doors.inner);slow.wait(2);
  slow.walk(10,.025);slow.wait(2);slow.walk(11.93,.025);
  assert.deepEqual(slow.signals.navigate,[HOME_URL]);assert.deepEqual(slow.signals.preload,[HOME_URL]);
  const a=createExitController(),b=createExitController(),p={x:0,z:7.8};
  for(let i=0;i<8;i++)a.update(p,{dt:.05});for(let i=0;i<40;i++)b.update(p,{dt:.01});
  assert.ok(Math.abs(a.snapshot().doors.inner-b.snapshot().doors.inner)<1e-12);
});

test('door occupancy holds it open, departure closes it smoothly without a perpetual full-open render request',()=>{
  const t=traveller();approach(t);assert.equal(t.state.doors.inner,1);assert.equal(t.state.needsAnimation,false);
  t.walk(8.45);t.wait(5);assert.equal(t.state.doors.inner,1);
  t.walk(7.5);t.wait(.3);assert.equal(t.state.doors.inner,1);assert.equal(t.state.needsAnimation,true);
  t.walk(6.5);t.wait(2);assert.equal(t.state.doors.inner,0);assert.equal(t.state.needsAnimation,false);
});

test('dt=0 post-movement sampling detects crossings without double advancing the door',()=>{
  const c=createExitController();let p={x:0,z:7.8};
  for(let i=0;i<20;i++){c.update(p,{dt:.05});const before=c.snapshot().doors;c.update(p,{dt:0});assert.deepEqual(c.snapshot().doors,before);}
  while(p.z<8.6){const pre=c.update(p,{dt:.05});p={x:0,z:p.z+.1};const post=c.update(p,{dt:0});assert.deepEqual(pre.doors,post.doors);}
  assert.equal(c.snapshot().phase,'vestibule');
});

test('only the exact old blocker is replaced; fixed pockets cover every moving leaf sweep',()=>{
  assert.equal(colliders.filter(isOriginalDoorCollider).length,1);
  assert.equal(isOriginalDoorCollider({type:'box',minX:-1.35,maxX:1.35,minZ:8.45,maxZ:8.61}),false);
  for(const id of ['inner','outer'])for(const progress of [0,.1,.5,1])for(const leaf of doorColliders(id,progress)){
    // Everything outside the clear opening is a fixed inaccessible pocket.
    const farEdge=leaf.leaf<0?-leaf.minX:leaf.maxX;
    if(farEdge<=1.27)continue;
    const minX=leaf.leaf<0?-farEdge:1.27,maxX=leaf.leaf<0?-1.27:farEdge;
    assert.ok(exitStaticColliders.some(c=>minX>=c.minX-1e-9&&maxX<=c.maxX+1e-9&&leaf.minZ>=c.minZ-1e-9&&leaf.maxZ<=c.maxZ+1e-9));
  }
  assert.ok(exitLayout.threshold.z>exitLayout.doors.outer.z);
  assert.ok(exitLayout.floors.some(f=>f.minZ<=exitLayout.threshold.z&&f.maxZ>=exitLayout.threshold.maxZ));
});

test('disposing prevents door changes, preloads and navigation',()=>{
  const t=traveller();t.sample({x:0,z:7.8});t.wait(.2);const doors=t.state.doors;t.controller.dispose();
  const state=t.sample({x:0,z:10});assert.equal(state.phase,'disposed');assert.deepEqual(state.doors,doors);
  assert.equal(state.preload,null);assert.equal(state.navigate,null);assert.equal(state.needsAnimation,false);
});
