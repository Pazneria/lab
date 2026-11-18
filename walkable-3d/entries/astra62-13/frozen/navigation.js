'use strict';
// Plan of the contiguous walkable deck. A circle keeps the camera off rails, walls and the apron.
const Navigation=(()=>{
 const perimeter=[[-6.155,13.47],[5.49,13.47],[5.49,-17.13],[.575,-17.13],[.575,-11.46],[.228,-11.46],[.228,.47],[-6.155,.47]];
 const radius=.226,spawn=Object.freeze({x:3.65,z:12.04,yaw:-.515,pitch:.047});
 function segmentDistance2(x,z,a,b){const dx=b[0]-a[0],dz=b[1]-a[1];const t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz)));return (x-a[0]-t*dx)**2+(z-a[1]-t*dz)**2}
 function clear(x,z){
 let inside=false;for(let i=0,j=perimeter.length-1;i<perimeter.length;j=i++){
 const a=perimeter[i],b=perimeter[j];if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside;
 if(segmentDistance2(x,z,a,b)<radius*radius)return false}
 if(!inside)return false;
 for(const [x1,z1,x2,z2] of G.colliders){const dx=x-Math.max(x1,Math.min(x2,x)),dz=z-Math.max(z1,Math.min(z2,z));if(dx*dx+dz*dz<radius*radius)return false}
 return true}
 function move(player,dx,dz){const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.063));for(let j=0;j<steps;j++){
 const sx=dx/steps,sz=dz/steps;if(clear(player.x+sx,player.z+sz)){player.x+=sx;player.z+=sz}else{if(clear(player.x+sx,player.z))player.x+=sx;if(clear(player.x,player.z+sz))player.z+=sz}}
 }
 return {spawn,perimeter,clear,move};
})();
