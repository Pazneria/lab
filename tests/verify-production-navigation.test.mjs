// CPU-only navigation against the exact production scene collision records.
// No canvas, renderer, browser, server, entrant or public submission is created.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {colliders} from '../lab-space/assets/claude11/colliders.mjs';
import {exhibits as layout} from '../lab-space/assets/claude11/layout.mjs';
import {limits,clearance,obstacles,exhibits,approaches,spawn,walkable,blocked,segmentFree,advance,planRoute,followRoute,nearby,safeDestination} from '../lab-space/assets/production-navigation.mjs';

const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
function referenceWalkable(p){
  if(!Number.isFinite(p?.x)||!Number.isFinite(p?.z))return false;
  if(!(Math.abs(p.x)<=7&&p.z>=-7&&p.z<=8.5||Math.abs(p.x)<=12&&Math.abs(p.z)<=3.4))return false;
  return !colliders.some(c=>{
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
  for(let z=-7.5;z<=9;z+=.17)for(let x=-12.5;x<=12.5;x+=.19){const p={x,z};assert.equal(walkable(p),referenceWalkable(p),JSON.stringify(p));}
  for(const p of [{x:0,z:-.6},{x:2.3,z:2.1},{x:10,z:0},{x:-11.6,z:0},{x:7,z:4},{x:12.1,z:0},{x:0,z:8.7},{x:NaN,z:0},{x:0,z:Infinity}])assert.equal(walkable(p),false);
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
  assert.ok(Math.abs(moved(straight)-.13)<1e-8);assert.ok(Math.abs(moved(straight)-moved(diagonal))<1e-8);
  const fast={...start},crouch={...start},gentle={...start};
  advance(fast,new Set(['forward','sprint']),.05);advance(crouch,new Set(['forward','crouch']),.05);advance(gentle,new Set(['forward']),.05,true);
  assert.ok(moved(fast)>moved(straight));assert.ok(moved(crouch)<moved(straight));assert.ok(moved(gentle)<moved(straight));assert.equal(crouch.eye,1.12);
  const stopped={...straight};advance(straight,new Set(),.05);assert.deepEqual(straight,stopped);
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
