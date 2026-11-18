'use strict';
const BODY_R=.205,EYE_H=1.61,START={x:8.45,z:9.31,yaw:-.79,pitch:.074};
function rect(x,z,x0,x1,z0,z1){return x>=x0&&x<=x1&&z>=z0&&z<=z1}
function deckSurface(x,z){
 return rect(x,z,WX0-.019,WX1+.019,WZ0-.04,WZ1+.011)||
 rect(x,z,-7.30,3.177,.07,2.731)||rect(x,z,.94,3.177,-3.20,.085)||
 rect(x,z,PX0-.032,PX1+.032,PZ0-.012,PZ1+.015)
}
function shoreSurface(x,z){
 if(x< -17.2||x>19.9||z< -3.5||z>17.4)return null;
 const y=landY(x,z);
 if(y<.045)return null;
 if(rect(x,z,-7.33,3.18,-6.31,2.72))return null;
 if(rect(x,z,PX0-.062,PX1+.062,PZ0,PZ1+.08)&&DECK-.39-y<1.85)return null;
 if(rect(x,z,RAMP0,RAMP1,RZ0-.06,RZ1+.06)&&rampY(x)-.25-y<1.85&&x<RAMP1-.08)return null;
 return y
}
function surfaceAt(x,z,previous){
 if(deckSurface(x,z)&&Math.abs(DECK-previous)<.245)return DECK;
 if(rect(x,z,RAMP0-.025,RAMP1+.03,RZ0,RZ1)){
  const h=rampY(x);if(Math.abs(h-previous)<.245)return h
 }
 const y=shoreSurface(x,z);
 return y!==null&&Math.abs(y-previous)<.234?y:null
}
function addBarriers(){
 const r=.048;
 function segment(x0,z0,x1,z1,lo,hi){obb((x0+x1)*.5,(z0+z1)*.5,Math.hypot(x1-x0,z1-z0),r*2,Math.atan2(z1-z0,x1-x0),lo,hi)}
 for(const [x0,x1] of [[-7.13,PX0-.07],[PX1+.08,3.05]])segment(x0,2.62,x1,2.62,DECK-.1,DECK+.85);
 segment(-7.14,.26,-7.14,2.63,DECK-.1,DECK+.85);
 segment(3.06,-3.09,3.06,RZ0-.04,DECK-.1,DECK+.85);segment(1.03,-3.08,3.08,-3.08,DECK-.1,DECK+.85);
 for(const z of [RZ0+.08,RZ1-.08])segment(RAMP0-.02,z,RAMP1-.04,z,.40,DECK+.91);
 for(const x of [PX0+.074,PX1-.074])segment(x,PZ0+.22,x,PZ1-.20,DECK-.15,DECK+.81);
 segment(PX0+.04,12.82,PX1-.04,12.82,DECK-.1,DECK+.85);
}
function meetsObject(x,z,feet){
 for(const o of blockers){
  if(feet+.045>=o.hi||feet+1.76<=o.lo)continue;
  let dx,dz;
  if(o.x0!==undefined){
   dx=Math.max(o.x0-x,0,x-o.x1);dz=Math.max(o.z0-z,0,z-o.z1)
  }else{
   const vx=x-o.x,vz=z-o.z,c=o.c??Math.cos(o.yaw),s=o.s??Math.sin(o.yaw);
   dx=Math.max(Math.abs(vx*c+vz*s)-o.sx*.5,0);dz=Math.max(Math.abs(-vx*s+vz*c)-o.sz*.5,0)
  }
  if(dx*dx+dz*dz<BODY_R*BODY_R)return true
 }
 const bx=x-BOAT_X,bz=z-BOAT_Z,u=bx*boatX[0]+bz*boatX[2],v=bx*boatZ[0]+bz*boatZ[2];
 if(u>loft[0][0]-BODY_R-.05&&u<loft.at(-1)[0]+BODY_R+.05&&Math.abs(v)<loftData(u)[0]+BODY_R+.042)return true;
 return false
}
const footProbes=Array.from({length:8},(_,i)=>[Math.cos(i*TAU/8)*BODY_R,Math.sin(i*TAU/8)*BODY_R]);
function canStand(x,z,last){
 const y=surfaceAt(x,z,last);if(y===null||meetsObject(x,z,y))return null;
 for(const [a,b] of footProbes)if(surfaceAt(x+a,z+b,y)===null)return null;
 return y
}
function playerStart(){return {...START,feet:landY(START.x,START.z),eye:landY(START.x,START.z)+EYE_H,walking:0}}
function movePlayer(p,dx,dz){
 const distance=Math.hypot(dx,dz),steps=Math.max(1,Math.ceil(distance/.065));dx/=steps;dz/=steps;
 for(let s=0;s<steps;s++){
  const y=canStand(p.x+dx,p.z+dz,p.feet);
  if(y!==null){p.x+=dx;p.z+=dz;p.feet=y;continue}
  // Resolve the long axis first to give a steady slide along walls and rails.
  const order=Math.abs(dx)>=Math.abs(dz)?[[dx,0],[0,dz]]:[[0,dz],[dx,0]];
  for(const [a,b] of order){const yy=canStand(p.x+a,p.z+b,p.feet);if(yy!==null){p.x+=a;p.z+=b;p.feet=yy}}
 }
}
function locationName(p){
 if(p.feet<DECK-.07 && !rect(p.x,p.z,RAMP0,RAMP1,RZ0,RZ1))return 'Exposed shore';
 if(rect(p.x,p.z,RAMP0,RAMP1,RZ0,RZ1))return 'Shore gangway';
 if(rect(p.x,p.z,WX0,WX1,WZ0,WZ1))return 'Timber workshop';
 if(p.z>PZ0&&p.x>=PX0-.05&&p.x<=PX1+.05)return 'Mooring pier';
 return 'Loading apron'
}
