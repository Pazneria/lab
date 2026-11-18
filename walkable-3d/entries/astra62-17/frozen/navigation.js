(function(R){
'use strict';
const F=R.floorPlan,radius=.202,spawn={x:1.34,z:2.91,yaw:.635,pitch:-.118},solids=R.solids;
for(const o of solids){o.cs=Math.cos(o.yaw);o.sn=Math.sin(o.yaw)}
const clamp=(n,a,b)=>Math.min(Math.max(a,n),b);
function floor(x,z){return (x>=F.left&&x<=F.right&&z>=F.back&&z<=F.front)||(x>=F.studyLeft&&x<=F.right&&z>=F.studyBack&&z<=F.back)||(x>=F.right&&x<=F.rail&&z>=F.studyBack&&z<=F.balconyEnd)}
function onFloor(x,z){return floor(x,z)&&floor(x-radius,z)&&floor(x+radius,z)&&floor(x,z-radius)&&floor(x,z+radius)}
function localPos(o,x,z){const dx=x-o.x,dz=z-o.z;return[o.cs*dx-o.sn*dz,o.sn*dx+o.cs*dz]}
function clear(x,z,pad=radius){if(!onFloor(x,z))return false;for(const o of solids){const [a,b]=localPos(o,x,z),dx=Math.max(Math.abs(a)-o.w,0),dz=Math.max(Math.abs(b)-o.d,0);if(dx*dx+dz*dz<pad*pad)return false}return true}
function resolve(x,z){
 for(let pass=0;pass<3;pass++){let hit=false;
 for(const o of solids){
 const dx=x-o.x,dz=z-o.z,a=o.cs*dx-o.sn*dz,b=o.sn*dx+o.cs*dz;
 if(Math.abs(a)>o.w+radius||Math.abs(b)>o.d+radius)continue;
 let px=a-clamp(a,-o.w,o.w),pz=b-clamp(b,-o.d,o.d),dist=Math.hypot(px,pz);
 if(dist>=radius)continue;
 if(dist>.00001){const q=(radius-dist+.00012)/dist;px*=q;pz*=q}
 else if(o.w-Math.abs(a)<o.d-Math.abs(b)){px=(a>=0?1:-1)*(o.w-Math.abs(a)+radius+.00012);pz=0}
 else{pz=(b>=0?1:-1)*(o.d-Math.abs(b)+radius+.00012);px=0}
 x+=o.cs*px+o.sn*pz;z+=-o.sn*px+o.cs*pz;hit=true
 }
 if(!hit)break
 }return{x,z}
}
function move(p,dx,dz){
 const n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.089));for(let i=0;i<n;i++){
 let next=resolve(p.x+dx/n,p.z+dz/n);if(onFloor(next.x,next.z)){p.x=next.x;p.z=next.z;continue}
 next=resolve(p.x+dx/n,p.z);if(onFloor(next.x,next.z)){p.x=next.x;p.z=next.z}
 next=resolve(p.x,p.z+dz/n);if(onFloor(next.x,next.z)){p.x=next.x;p.z=next.z}
 }}
R.navigation={spawn,radius,floor,clear,resolve,move};
})(Room);
