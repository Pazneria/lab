export const START=Object.freeze({x:.15,z:15.66,yaw:-.027,pitch:-.035});
export const RADIUS=.255, EYE=1.63;
const clamp=(x,lo,hi)=>Math.max(lo,Math.min(hi,x));
export const ground=z=>clamp((3.8-z)/9.4,0,1)*.84;
export function collisionMap(list){
  return list.map(b=>({...b,c:Math.cos(b.yaw),s:Math.sin(b.yaw)}));
}
export function reset(w){
  Object.assign(w,START,{vx:0,vz:0});return w;
}
export function turn(w,dx,dy){
  w.yaw=(w.yaw+dx)%(Math.PI*2);
  w.pitch=clamp(w.pitch+dy,-1.515,1.515);
}
export function move(w,dx,dz,map){
  // Short sphere sweeps against oriented footprints retain a wall-parallel
  // component at oblique impacts. Vertical position follows the actual slab.
  const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.095));
  for(let k=0;k<steps;k++){
    w.x+=dx/steps;w.z+=dz/steps;
    for(let pass=0;pass<3;pass++){
      let changed=false;
      for(const b of map){
        const X=w.x-b.x,Z=w.z-b.z;
        const lx=X*b.c-Z*b.s,lz=X*b.s+Z*b.c;
        if(Math.abs(lx)>=b.hx+RADIUS || Math.abs(lz)>=b.hz+RADIUS)continue;
        const px=lx-clamp(lx,-b.hx,b.hx),pz=lz-clamp(lz,-b.hz,b.hz);
        const ds=px*px+pz*pz;
        if(ds>=RADIUS*RADIUS)continue;
        let cx,cz;
        if(ds>1e-13){
          const length=Math.sqrt(ds),s=(RADIUS-length+.000012)/length;
          cx=px*s;cz=pz*s;
        }else if(b.hx-Math.abs(lx)<b.hz-Math.abs(lz)){
          cx=(lx<0?-1:1)*(b.hx-Math.abs(lx)+RADIUS+.000012);cz=0;
        }else{
          cz=(lz<0?-1:1)*(b.hz-Math.abs(lz)+RADIUS+.000012);cx=0;
        }
        w.x+=b.c*cx+b.s*cz;w.z+=-b.s*cx+b.c*cz;changed=true;
      }
      if(!changed)break;
    }
  }
}
export function advance(w,input,dt,map){
  dt=clamp(dt,0,.055);
  turn(w,input.turn*dt*1.52,input.tilt*dt*1.1);
  const d=Math.hypot(input.side,input.forward)||1;
  const side=input.side/d,forward=input.forward/d,speed=input.fast?3.84:2.43;
  const s=Math.sin(w.yaw),c=Math.cos(w.yaw);
  const tx=(side*c+forward*s)*speed,tz=(side*s-forward*c)*speed;
  const blend=1-Math.exp(-dt*(input.forward||input.side?19:26));
  w.vx+=(tx-w.vx)*blend;w.vz+=(tz-w.vz)*blend;
  if(Math.abs(w.vx)<.002)w.vx=0;if(Math.abs(w.vz)<.002)w.vz=0;
  if(w.vx||w.vz)move(w,w.vx*dt,w.vz*dt,map);
}
export function basis(w){
  const s=Math.sin(w.yaw),c=Math.cos(w.yaw),a=Math.sin(w.pitch),b=Math.cos(w.pitch);
  return {eye:[w.x,ground(w.z)+EYE,w.z],forward:[s*b,a,-c*b],right:[c,0,s],up:[-s*a,b,c*a]};
}
