import {H} from './architecture.js';

export const RADIUS=.215;
export const SPAWN=Object.freeze({x:-.32,y:0,z:7.13,yaw:.076,pitch:.066});
const stepLimit=.215;
export function surface(x,z,previous){
  if(x<H.alcoveWest+RADIUS || x>H.east-RADIUS || z<H.north+RADIUS || z>H.south-RADIUS)return null;
  if(x<H.west+RADIUS && (z<H.alcoveNorth+RADIUS || z>H.alcoveSouth-RADIUS))return null;
  const ramp=x>=H.stairLeft&&x<=H.edge&&z<=H.stairBottom&&z>=H.stairTop;
  const inDeck=(x>=H.edge&&z<=H.deckEnd)||(x>=H.stairLeft&&x<=H.edge&&z>=H.landingEnd&&z<=H.stairTop);
  let y=0;
  if(ramp)y=H.gallery*(H.stairBottom-z)/(H.stairBottom-H.stairTop);
  else if(inDeck && previous>H.gallery-stepLimit)y=H.gallery;
  if(Math.abs(y-previous)>stepLimit)return null;
  return y;
}
export function intersects(x,z,foot,obstacle){
  if(obstacle.hi<foot+.065 || obstacle.lo>foot+1.73)return false;
  const dx=x-obstacle.x,dz=z-obstacle.z;
  const lx=dx*obstacle.c-dz*obstacle.s,lz=dx*obstacle.s+dz*obstacle.c;
  const ex=Math.max(0,Math.abs(lx)-obstacle.hw),ez=Math.max(0,Math.abs(lz)-obstacle.hd);
  return ex*ex+ez*ez<RADIUS*RADIUS;
}
export function navigationSolids(sceneSolids){
  const solids=sceneSolids.slice(),n=21,step=(H.stairBottom-H.stairTop)/n;
  for(let i=0;i<n;i++)for(const x of [H.stairLeft,H.edge])solids.push({x,z:H.stairBottom-(i+.5)*step,hw:.066,hd:step/2+.012,
    c:1,s:0,lo:0,hi:(i+1)*H.gallery/n+1.04,tag:'stair stringer and handrail'});
  // Grid references the same static solids and limits the work done for each walking step.
  const cell=2,cells=new Map();
  const key=(x,z)=>Math.floor(x/cell)+','+Math.floor(z/cell);
  for(const o of solids){
    const ex=Math.abs(o.c)*o.hw+Math.abs(o.s)*o.hd+RADIUS,ez=Math.abs(o.s)*o.hw+Math.abs(o.c)*o.hd+RADIUS;
    for(let i=Math.floor((o.x-ex)/cell);i<=Math.floor((o.x+ex)/cell);i++)for(let j=Math.floor((o.z-ez)/cell);j<=Math.floor((o.z+ez)/cell);j++){
      const k=i+','+j;if(!cells.has(k))cells.set(k,[]);cells.get(k).push(o);
    }
  }
  return {solids,near:(x,z)=>cells.get(key(x,z))||[]};
}
export function footing(x,z,previous,world){
  const y=surface(x,z,previous);if(y===null)return null;
  for(const o of world.near(x,z))if(intersects(x,z,y,o))return null;
  return y;
}
export function walk(p,dx,dz,world){
  const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.070));dx/=steps;dz/=steps;
  for(let i=0;i<steps;i++){
    const yy=footing(p.x+dx,p.z+dz,p.y,world);
    if(yy!==null){p.x+=dx;p.z+=dz;p.y=yy;continue;}
    const yx=footing(p.x+dx,p.z,p.y,world);
    if(yx!==null){p.x+=dx;p.y=yx;}
    const yz=footing(p.x,p.z+dz,p.y,world);
    if(yz!==null){p.z+=dz;p.y=yz;}
  }
}
export function locationName(p){
  if(p.y>H.gallery-.07)return 'Map gallery';
  if(p.y>.14)return 'Gallery staircase';
  if(p.x<H.west+.14)return 'Window alcove';
  if(p.x>H.edge+.13 && p.z<H.deckEnd)return 'East stacks';
  if(p.x<-4.0 && p.z>1.11)return 'West stacks';
  return 'Reading room';
}
