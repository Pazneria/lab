// CPU-only navigation against the exact production scene collision records.
// No canvas, renderer, browser, server, entrant or public submission is created.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {colliders} from '../lab-space/assets/claude11/colliders.mjs';
import {exhibits as layout} from '../lab-space/assets/claude11/layout.mjs';
import {limits,clearance,obstacles,collisionObstacles,navigationFloors,setExitDoors,exhibits,approaches,spawn,walkable,blocked,segmentFree,advance,planRoute,followRoute,nearby,safeDestination} from '../lab-space/assets/production-navigation.mjs';
import {createExitController,doorColliders,exitLayout,HOME_URL} from '../lab-space/assets/production-exit.mjs';

const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
let referenceDoors={inner:0,outer:0};
function doors(value){referenceDoors=value;setExitDoors(value);}
test.beforeEach(()=>doors({inner:0,outer:0}));
function referenceWalkable(p){
  if(!Number.isFinite(p?.x)||!Number.isFinite(p?.z))return false;
  if(!navigationFloors.some(f=>p.x>=f.minX&&p.x<=f.maxX&&p.z>=f.minZ&&p.z<=f.maxZ))return false;
  const geometry=[...collisionObstacles,...doorColliders('inner',referenceDoors.inner),...doorColliders('outer',referenceDoors.outer)];
  return !geometry.some(c=>{
    if(c.type==='circle')return Math.hypot(p.x-c.x,p.z-c.z)<=c.r+clearance;
    return Math.hypot(p.x-clamp(p.x,c.minX,c.maxX),p.z-clamp(p.z,c.minZ,c.maxZ))<=clearance;
  });
}
function sampleSegment(a,b,step=.015){
  const count=Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/step);
  for(let i=0;i<=count;i++){const t=count?i/count:0;assert.equal(referenceWalkable({x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t}),true,`blocked segment at ${t}`);}
}
function verifyRoute(start,target,options){
  const points=planRoute(start,target,options);assert.ok(points?.length,'Expected a reachable route');
  let from=start;
  for(const next of points){assert.equal(segmentFree(from,next),true);sampleSegment(from,next);from=next;}
  const p={...start},remaining=points.map(p=>({...p}));let state='walking',frames=0;
  while(state==='walking'&&frames++<4000){const before={...p};state=followRoute(p,remaining,1/60);assert.equal(walkable(p),true);sampleSegment(before,p,.01);}
  assert.equal(state,'arrived');assert.equal(remaining.length,0);assert.ok(frames<4000);
  assert.ok(Math.hypot(p.x-from.x,p.z-from.z)<1e-7);
  return {points,p};
}
function random(seed=123456){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;};}

test('navigation uses exact frozen scene colliders and shared station placements',()=>{
  assert.equal(obstacles,colliders);assert.equal(exhibits,layout);
  assert.deepEqual(colliders,JSON.parse(readFileSync(new URL('../lab-space/assets/claude11/colliders.json',import.meta.url))));
  assert.equal(colliders.length,34);
  assert.ok(Object.isFrozen(colliders)&&colliders.every(Object.isFrozen));
  assert.ok(colliders.some(c=>c.type==='circle'&&c.x===0&&c.z===-.6&&c.r===1.5));
  assert.deepEqual(spawn(),{x:0,z:7.3,yaw:0,pitch:-.04,eye:1.62});
  assert.equal(limits.radius,.3);
  for(const [id,approach] of Object.entries(approaches)){assert.equal(walkable(approach),true,`${id} approach blocked`);assert.equal(nearby(approach),id);}
});

test('spatial collision queries match independent full-array circle/box checks across the whole floor',()=>{
  for(let z=-7.5;z<=12.6;z+=.17)for(let x=-12.5;x<=12.5;x+=.19){const p={x,z};assert.equal(walkable(p),referenceWalkable(p),JSON.stringify(p));}
  for(const p of [{x:0,z:-.6},{x:2.3,z:2.1},{x:10,z:0},{x:-11.6,z:0},{x:7,z:4},{x:12.1,z:0},{x:0,z:8.5},{x:0,z:11.5},{x:NaN,z:0},{x:0,z:Infinity}])assert.equal(walkable(p),false);
  assert.equal(blocked(0,-.6),true);assert.equal(blocked(0,7.3),false);
});

test('continuous segments cannot cut through central instrument, furniture, walls or alcove corners',()=>{
  assert.equal(segmentFree({x:-2.1,z:-.6},{x:2.1,z:-.6}),false);
  assert.equal(segmentFree({x:2.3,z:1.3},{x:2.3,z:3.05}),false);
  assert.equal(segmentFree({x:6,z:4},{x:8,z:2}),false);
  assert.equal(segmentFree({x:-6,z:-4},{x:-8,z:-2}),false);
  assert.equal(segmentFree({x:8.7,z:0},{x:10.2,z:2.8}),false);
  assert.equal(segmentFree({x:5.5,z:0},{x:8.5,z:0}),true);
  assert.equal(segmentFree({x:-5.5,z:0},{x:-9.4,z:0}),true);
  const rand=random();let checked=0;
  for(let i=0;i<1500;i++){
    const a={x:rand()*24-12,z:rand()*15.5-7},b={x:rand()*24-12,z:rand()*15.5-7};
    if(segmentFree(a,b)){sampleSegment(a,b);checked++;}
  }
  assert.ok(checked>50);
});

test('routes go around center and furniture, through both actual alcove openings, and reach every station',()=>{
  const start=spawn();
  for(const approach of Object.values(approaches))verifyRoute(start,approach);
  for(const [from,to] of [
    [start,{x:-9.4,z:.9}],
    [start,{x:8,z:-.9}],
    [{x:-9.4,z:.9},{x:8,z:-.9}],
    [{x:-4,z:5.5},{x:4,z:-5.5}],
    [{x:0,z:-4.6},{x:0,z:4.6}],
  ])verifyRoute(from,to);
  const detour=planRoute({x:0,z:4.6},{x:0,z:-4.6});assert.ok(detour.length>1);assert.ok(detour.some(p=>Math.abs(p.x)>1.8));
});

test('furniture clicks approach free floor while floor clicks and exterior targets are rejected honestly',()=>{
  const start=spawn();
  assert.equal(planRoute(start,{x:0,z:-.6}),null);
  assert.equal(planRoute(start,{x:10.5,z:0}),null);
  assert.equal(planRoute(start,{x:8,z:5},{approach:true}),null);
  assert.equal(planRoute(start,{x:0,z:9},{approach:true}),null);
  assert.equal(planRoute(start,{x:NaN,z:0}),null);
  assert.equal(planRoute({x:0,z:-.6},start),null);
  const {p}=verifyRoute(start,{x:0,z:-.6},{approach:true});assert.ok(Math.hypot(p.x,p.z+.6)>1.815);
  verifyRoute(start,{x:8.35,z:2.75},{approach:true});
  verifyRoute(start,{x:-11.4,z:0},{approach:true});
});

test('manual movement is normalized, responsive, sprint/crouch aware, bounded and never penetrates',()=>{
  const start=spawn(),straight={...start},diagonal={...start};
  advance(straight,new Set(['forward']),.05);advance(diagonal,new Set(['forward','right']),.05);
  const moved=p=>Math.hypot(p.x-start.x,p.z-start.z);
  assert.ok(Math.abs(moved(straight)-2.5*.05*(1-Math.exp(-.6)))<1e-8);assert.ok(Math.abs(moved(straight)-moved(diagonal))<1e-8);
  const fast={...start},crouch={...start},gentle={...start};
  advance(fast,new Set(['forward','sprint']),.05);advance(crouch,new Set(['forward','crouch']),.05);advance(gentle,new Set(['forward']),.05,true);
  assert.ok(moved(fast)>moved(straight));assert.ok(moved(crouch)<moved(straight));assert.ok(moved(gentle)<moved(straight));assert.ok(crouch.eye>1&&crouch.eye<1.62);
  const oldVelocity=Math.hypot(straight.vx,straight.vz);advance(straight,new Set(),.05);assert.ok(Math.hypot(straight.vx,straight.vz)<oldVelocity);
  const rand=random(52),p=spawn();
  for(let i=0;i<8000;i++){
    p.yaw=(rand()-.5)*Math.PI*2;
    const actions=new Set([rand()<.5?'forward':'backward',rand()<.5?'right':'left','sprint']),before={...p};
    advance(p,actions,i%20?1/60:10);assert.equal(referenceWalkable(p),true);sampleSegment(before,p,.004);
  }
  const central={x:0,z:2.0,yaw:0,pitch:0};
  for(let i=0;i<240;i++)advance(central,new Set(['forward','sprint']),1/60);
  assert.ok(central.z>.6);assert.equal(walkable(central),true);
});

test('route following rejects stale or invalid paths without moving through blocked geometry',()=>{
  const p=spawn(),before={...p},bad=[{x:0,z:-4.6}];
  // Small steps approach the obstruction but never enter it; the unplanned
  // straight line is eventually rejected and discarded.
  let result='walking';for(let i=0;i<300&&result==='walking';i++)result=followRoute(p,bad,.05);
  assert.equal(result,'blocked');assert.equal(bad.length,0);assert.equal(walkable(p),true);
  const invalid=[{x:NaN,z:0}];assert.equal(followRoute(before,invalid,.05),'blocked');assert.equal(invalid.length,0);
  const frozen={...before},points=[{x:1,z:7.3}];followRoute(before,points,NaN);assert.deepEqual(before,frozen);
});

test('destination allowlist retains exact public URLs and rejects arbitrary and private targets',()=>{
  assert.equal(safeDestination('home'),'https://pazneria.github.io/');assert.equal(safeDestination('catalog'),'https://pazneria.github.io/lab/');
  for(const value of ['character','worlds','constructor','__proto__','https://evil.example/','https://jordan-character-studio-review.pazneria.chatgpt.site',null,{},undefined])assert.throws(()=>safeDestination(value),TypeError);
});

test('dynamic door gates match panel geometry and invalidate vestibule routes as clearance changes',()=>{
  const a={x:0,z:7.6},b={x:0,z:9.2};
  assert.equal(segmentFree(a,b),false);assert.equal(planRoute(a,b),null);
  for(const inner of [0,.15,.3,.5,.75,1]){
    doors({inner,outer:0});
    for(let z=8.05;z<8.95;z+=.07)for(let x=-2.1;x<2.1;x+=.09)assert.equal(walkable({x,z}),referenceWalkable({x,z}));
  }
  assert.equal(segmentFree(a,b),true);verifyRoute(b,spawn());
  doors({inner:0,outer:0});assert.equal(planRoute(a,b),null);
  doors({inner:1,outer:1});assert.equal(segmentFree({x:0,z:10.8},{x:0,z:11.95}),true);
  assert.equal(walkable({x:0,z:12.1}),false,'Landing end wall bounds the player disk');
});

test('manual walk, sprint and gentle motion traverse both doors with continuous collision clearance and one exit signal',()=>{
  for(const [actions,gentle]of [[new Set(['forward']),false],[new Set(['forward','sprint']),false],[new Set(['forward']),true]]){
    doors({inner:0,outer:0});const machine=createExitController(),p={...spawn(),yaw:Math.PI};let navigation=0,preloads=0,frames=0;
    for(;frames<1600&&!navigation;frames++){
      const before={...p},pre=machine.update(p,{dt:1/60,slowMotion:gentle});doors(pre.doors);
      advance(p,actions,1/60,gentle);sampleSegment(before,p,.003);
      const post=machine.update(p,{dt:0,slowMotion:gentle});doors(post.doors);
      for(const value of [pre,post]){if(value.preload===HOME_URL)preloads++;if(value.navigate===HOME_URL)navigation++;}
      assert.equal(referenceWalkable(p),true);
    }
    assert.equal(navigation,1);assert.equal(preloads,1);assert.ok(frames<1600);assert.ok(p.z>=11.88&&p.z<=exitLayout.threshold.maxZ);
    assert.equal(machine.update(p,{dt:1/60}).navigate,null);
  }
});

test('50ms straight and diagonal sprint steps depart using the swept threshold crossing despite landing collision',()=>{
  for(const diagonal of [false,true]){
  const machine=createExitController(),x=diagonal?.93:0;
  // Establish both traversals with real panel clearance, then use the same
  // collision step that formerly stranded the camera against the landing wall.
  for(const z of [7.9,8.3,8.6,9,9.4,9.8,10.2,10.6,11,11.3,11.6,11.86]){
    for(let i=0;i<20;i++)doors(machine.update({x:0,z},{dt:.05}).doors);
  }
  if(diagonal)for(const x of [.31,.62,.93])doors(machine.update({x,z:11.86},{dt:.05}).doors);
  assert.equal(machine.snapshot().phase,'landing');
  const p={x,z:11.86,yaw:Math.PI,vx:diagonal?4.6/Math.SQRT2:0,vz:diagonal?4.6/Math.SQRT2:4.6};
  advance(p,new Set(diagonal?['forward','left','sprint']:['forward','sprint']),.05);
  assert.ok(referenceWalkable(p));assert.ok(diagonal?p.x>.95:p.z>12.03);
  assert.equal(machine.update(p,{dt:0}).navigate,HOME_URL);
  }
});
