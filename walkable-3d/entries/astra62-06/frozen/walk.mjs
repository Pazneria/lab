import {clamp,spawn,floorY} from './landform.mjs';
export function createWalker(nav,bytes) {
  if(bytes.length!==nav.w*nav.h)throw Error('The walking clearance map is incomplete.');
  const state={x:spawn.x,z:spawn.z,y:0,yaw:spawn.yaw,pitch:spawn.pitch,vx:0,vz:0};
  function clearance(x,z){
    const fx=(x-nav.x0)/nav.cell,fz=(z-nav.z0)/nav.cell,i=Math.floor(fx),j=Math.floor(fz);
    if(i<0||j<0||i+1>=nav.w||j+1>=nav.h)return 0;
    const a=fx-i,b=fz-j,k=j*nav.w+i;
    return ((bytes[k]*(1-a)+bytes[k+1]*a)*(1-b)+(bytes[k+nav.w]*(1-a)+bytes[k+nav.w+1]*a)*b)*nav.scale;
  }
  function step(dx,dz){
    const x=state.x,z=state.z,r=nav.radius;
    if(clearance(x+dx,z+dz)>=r){state.x=x+dx;state.z=z+dz;return;}
    const eps=.066,cx=x+dx,cz=z+dz;
    let gx=clearance(cx+eps,cz)-clearance(cx-eps,cz),gz=clearance(cx,cz+eps)-clearance(cx,cz-eps);
    const len=Math.hypot(gx,gz);
    if(len>.0001){
      gx/=len;gz/=len;
      const into=Math.min(0,dx*gx+dz*gz);
      const sx=x+dx-into*gx,sz=z+dz-into*gz;
      if(clearance(sx,sz)>=r){state.x=sx;state.z=sz;return;}
    }
    if(clearance(x+dx,z)>=r)state.x=x+dx;
    else if(clearance(x,z+dz)>=r)state.z=z+dz;
  }
  function reset(){
    state.x=spawn.x;state.z=spawn.z;state.y=floorY(spawn.x,spawn.z)+1.62;
    state.yaw=spawn.yaw;state.pitch=spawn.pitch;state.vx=0;state.vz=0;
  }
  function move(forward,side,brisk,dt){
    const norm=Math.max(1,Math.hypot(forward,side)),speed=(brisk?3.1:2.02)/norm;
    const sy=Math.sin(state.yaw),cy=Math.cos(state.yaw);
    const ease=1-Math.exp(-dt*(forward||side?15:21));
    state.vx+=((forward*sy+side*cy)*speed-state.vx)*ease;
    state.vz+=((-forward*cy+side*sy)*speed-state.vz)*ease;
    const dx=state.vx*dt,dz=state.vz*dt,steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.052));
    for(let i=0;i<steps;i++)step(dx/steps,dz/steps);
    const eye=floorY(state.x,state.z)+1.62;
    state.y+=(eye-state.y)*(1-Math.exp(-dt*19));
  }
  function look(dx,dy){state.yaw+=dx;state.pitch=clamp(state.pitch+dy,-1.45,1.45);}
  reset();
  return {state,clearance,move,look,reset};
}

