'use strict';
const Walk={
 spawn:{x:.60,z:4.83,yaw:-.558,pitch:-.092,eye:1.585},
 radius:.179,standing:1.585,low:1.073,
 canStand(x,z,blocks,r=.179){
  if(x< -3.66+r||x>6.19-r||z< -4.70+r||z>5.54-r)return false;
  if(x>3.41-r&&z>3.00-r)return false;
  for(const b of blocks){
   if(x<=b[0]-r||x>=b[2]+r||z<=b[1]-r||z>=b[3]+r)continue;
   const dx=x-Math.max(b[0],Math.min(x,b[2])),dz=z-Math.max(b[1],Math.min(z,b[3]));
   if(dx*dx+dz*dz<r*r)return false
  }
  return true
 },
 move(p,dx,dz,blocks){
  const n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.052));
  for(let i=0;i<n;i++){
   const x=p.x+dx/n,z=p.z+dz/n;
   if(this.canStand(x,p.z,blocks))p.x=x;
   if(this.canStand(p.x,z,blocks))p.z=z
  }
 },
 room(p){return p.x>3.47?'Glasshouse':p.z<-.06?'Stillroom':'Kitchen'}
};
