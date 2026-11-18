"use strict";
globalThis.HouseWalk=(()=>{
  const radius=.20,initial=Object.freeze({x:-.39,z:9.49,y:1.61,yaw:.035,pitch:.030});
  const walls=[
    [-4.29,-9.34,-4.025,9.33],[4.025,-9.34,4.29,9.33],[-4.28,-9.32,4.28,-9.065],
    [-4.28,9.085,-1.155,9.32],[1.155,9.085,4.28,9.32]
  ];
  function clear(x,z,shapes){
    if(Math.abs(x)>4.15-radius||z< -9.20+radius||z>12.02-radius)return false;
    if(z>9.25&&Math.abs(x)>2.39-radius)return false;
    for(const a of shapes){
      const dx=x-Math.max(a[0],Math.min(x,a[2])),dz=z-Math.max(a[1],Math.min(z,a[3]));
      if(dx*dx+dz*dz<radius*radius)return false;
    }
    return true;
  }
  function create(obstacles){
    const state={...initial},shapes=obstacles.concat(walls);
    function translate(dx,dz){
      const parts=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.075));dx/=parts;dz/=parts;
      for(let i=0;i<parts;i++){
        if(clear(state.x+dx,state.z+dz,shapes)){state.x+=dx;state.z+=dz;continue;}
        if(clear(state.x+dx,state.z,shapes))state.x+=dx;
        if(clear(state.x,state.z+dz,shapes))state.z+=dz;
      }
    }
    function step(keys,dt){
      dt=Math.min(.055,Math.max(0,dt));if(!dt)return false;
      const x=state.x,z=state.z,y=state.y,pitch=state.pitch,yaw=state.yaw;
      let lateral=Number(keys.has('KeyD'))-Number(keys.has('KeyA')),along=Number(keys.has('KeyW'))-Number(keys.has('KeyS'));
      const low=keys.has('KeyC'),fast=keys.has('ShiftLeft')||keys.has('ShiftRight');
      if(lateral||along){
        const scale=(low?1.11:fast?3.14:1.95)*dt/Math.hypot(lateral,along),s=Math.sin(state.yaw),c=Math.cos(state.yaw);
        lateral*=scale;along*=scale;translate(c*lateral+s*along,s*lateral-c*along);
      }
      const target=low?.83:initial.y;
      state.y+=(target-state.y)*(1-Math.exp(-dt*13));if(Math.abs(target-state.y)<.0004)state.y=target;
      const turn=Number(keys.has('ArrowRight'))-Number(keys.has('ArrowLeft')),tilt=Number(keys.has('ArrowUp'))-Number(keys.has('ArrowDown'));
      if(turn||tilt)rotate(turn*dt*1.52,tilt*dt*1.14);
      return x!==state.x||y!==state.y||z!==state.z||pitch!==state.pitch||yaw!==state.yaw;
    }
    function rotate(yaw,pitch){state.yaw=(state.yaw+yaw)%(2*Math.PI);state.pitch=Math.max(-1.46,Math.min(1.46,state.pitch+pitch));}
    function location(){
      if(state.z>8.65)return 'Threshold';
      if(state.z< -6.78)return 'Potting bay';
      if(state.z>6.55)return 'Entrance';
      return state.x<0?'West aisle':'East aisle';
    }
    return {state,step,rotate,reset:()=>Object.assign(state,initial),location,clear:(x,z)=>clear(x,z,shapes)};
  }
  return {initial,radius,walls,clear,create};
})();