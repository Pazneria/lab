import {INNER,OUTER,F,terrace,forecourt,HALL_WIDTH,PORCH_END,desk,stool,START,scopeBaseRadius} from './layout.js';
import {SOUTH_STEP,NORTH_STEP,TREAD_S,TREAD_N} from './approaches.js';
const RADIUS=.235;
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
function inside(poly,x,z,wall=.22){
  // The first polygon edge joins the building and carries no parapet.
  let sign=0;
  for(let i=0;i<poly.length;i++){
    const a=poly[i],b=poly[(i+1)%poly.length],dx=b[0]-a[0],dz=b[1]-a[1];
    const d=dx*(z-a[1])-dz*(x-a[0]);
    const next=poly[(i+2)%poly.length];
    if(!sign)sign=Math.sign(dx*(next[1]-a[1])-dz*(next[0]-a[0]));
    if(sign*d<(i?wall:0)*Math.hypot(dx,dz)-1e-7)return false;
  }
  return true;
}
const sq=(x,z,r)=>x*x+z*z<r*r;
function local(x,z,a){return [x*Math.cos(a)-z*Math.sin(a),x*Math.sin(a)+z*Math.cos(a)]}
const sx=Math.sin(stool.a)*stool.r,sz=Math.cos(stool.a)*stool.r;
function occupied(x,z){
  if(sq(x,z,scopeBaseRadius-RADIUS) || sq(x-sx,z-sz,.28) || sq(x-3.28,z+12.66,.525) || sq(x-1.32,z-10.83,.244))return true;
  const [wheelX,wheelZ]=local(x,z,-2.62);
  if(Math.abs(wheelX)<.245 && wheelZ>4.69 && wheelZ<INNER)return true;
  const [u,v]=local(x,z,desk.a);
  if(Math.abs(u)<desk.w/2+.012 && Math.abs(v-desk.r)<desk.d/2+.018)return true;
  if(Math.abs(x+4.4)<.275 && Math.abs(z+10.71)<.96)return true;
  return false;
}
function belongs(x,z){
  if(occupied(x,z))return false;
  if(z>5.075 && z<PORCH_END && Math.abs(x)>HALL_WIDTH-.072 && Math.abs(x)<HALL_WIDTH+.55)return false;
  const rr=x*x+z*z;
  if(rr<(INNER-.074)**2)return true;
  // Splayed chamfers on the two door reveals widen toward the exterior.
  const r=Math.sqrt(rr),door=z>0?1.64:1.71;
  if(r<=OUTER+.105 && Math.abs(x)<r*door/INNER-.014 && Math.abs(z)>4.68)return true;
  if(z>5.04 && z<=PORCH_END+.03 && Math.abs(x)<HALL_WIDTH-.072)return true;
  if(z>=11.82 && inside(forecourt,x,z,.208))return true;
  if(z<-5.02 && z>=-NORTH_STEP-.002 && Math.abs(x)<1.957)return true;
  if(!inside(terrace,x,z))return false;
  if(r<OUTER+.10)return false;
  // Portal projections, stair cheeks and radial buttress feet.
  if(z>=-6.70 && z<-5.49 && Math.abs(x)>1.955 && Math.abs(x)<2.604)return false;
  if(z>=-NORTH_STEP-3*TREAD_N-.015 && z<=-5.97 && Math.abs(x)>2.064 && Math.abs(x)<2.408)return false;
  if(r<OUTER+1.06){
    for(const a of [2.62,-2.63]){
      const [u,v]=local(x,z,a);
      if(Math.abs(u)<.48 && v>OUTER-.17 && v<OUTER+.80)return false;
    }
  }
  return true;
}
const footprint=Array.from({length:16},(_,i)=>[RADIUS*Math.cos(i*Math.PI/8),RADIUS*Math.sin(i*Math.PI/8)]);
export function canStand(x,z){
  if(!belongs(x,z))return false;
  for(const [u,v] of footprint)if(!belongs(x+u,z+v))return false;
  return true;
}
export function floorHeight(x,z){
  if(z>=SOUTH_STEP)return 0;
  if(z>5.04 && Math.abs(x)<HALL_WIDTH+.03)return clamp(Math.ceil((SOUTH_STEP-z)/TREAD_S-1e-8),0,4)*.15;
  if(z<-5.0 && Math.abs(x)<2.071)return F-clamp(Math.ceil((-z-NORTH_STEP)/TREAD_N-1e-8),0,4)*.15;
  if(Math.hypot(x,z)<OUTER+.11)return F;
  return 0;
}
export function moveBody(state,dx,dz){
  const pieces=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.085)),u=dx/pieces,v=dz/pieces;
  for(let i=0;i<pieces;i++){
    if(canStand(state.x+u,state.z+v)){state.x+=u;state.z+=v;continue}
    // Try the largest tangential component first when brushing a corner.
    if(Math.abs(u)>Math.abs(v)){
      if(canStand(state.x+u,state.z))state.x+=u;
      if(canStand(state.x,state.z+v))state.z+=v;
    }else{
      if(canStand(state.x,state.z+v))state.z+=v;
      if(canStand(state.x+u,state.z))state.x+=u;
    }
  }
}
export function placeName(x,z){
  if(z>PORCH_END-.03)return 'South forecourt';
  if(z>SOUTH_STEP-3.0)return 'South passage';
  if(z<-NORTH_STEP+.55 || (z<-4.85 && Math.hypot(x,z)>OUTER+.11))return 'Viewing terrace';
  return 'Instrument chamber';
}
export function initialBody(){return {...START,eye:floorHeight(START.x,START.z)+1.63}}
