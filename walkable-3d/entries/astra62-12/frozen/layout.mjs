// Coordinates in metres. The front of each machine is its local +Z face.
export const room = {left:-3.55, right:3.55, back:-5.05, front:4.95, ceiling:3.08, annexRight:6.18, annexBack:1.47, annexFront:4.69};
export const machines = [
  {id:"ember", bank:"timber", x:-2.80,z:0.92, yaw:1.165, w:.88, d:.91, h:1.74},
  {id:"relay", bank:"timber", x:-2.35,z:-.13, yaw:1.165, w:.88,d:.91,h:1.74},
  {id:"lunar", bank:"blue", x:2.78,z:.37,yaw:-1.165,w:.93,d:1.00,h:1.83},
  {id:"kite", bank:"blue", x:2.32,z:-.70,yaw:-1.165,w:.93,d:1.00,h:1.83},
  {id:"bell", bank:"feature",x:0,z:-2.55,yaw:0,w:1.49,d:1.34,h:2.39}
];
export const counter = {x:5.08,z:2.94,yaw:-Math.PI/2,w:2.18,d:.78};
export const spawn = {x:-.04,z:3.89,eye:1.57,yaw:0,pitch:-.065};
export const walls = [
  [[room.left,room.back],[room.right,room.back]],
  [[room.left,room.front],[room.left,room.back]],
  [[room.right,room.front],[room.left,room.front]],
  [[room.right,room.back],[room.right,room.annexBack]],
  [[room.right,room.annexBack],[room.annexRight,room.annexBack]],
  [[room.annexRight,room.annexBack],[room.annexRight,room.annexFront]],
  [[room.annexRight,room.annexFront],[room.right,room.annexFront]],
  [[room.right,room.annexFront],[room.right,room.front]]
];
export const blocks = [...machines, counter,
  {x:3.04,z:-3.62,w:.54,d:1.26,yaw:0}, // return-view bench
  {x:5.758,z:2.623,w:.36,d:.36,yaw:0},
  {x:6.023,z:3.220,w:.31,d:1.31,yaw:0} // head-height prize shelves
];
export function localAt(o,x,z) {
  const dx=x-o.x,dz=z-o.z,c=Math.cos(o.yaw),s=Math.sin(o.yaw);
  return [dx*c-dz*s,dx*s+dz*c];
}
export function worldAt(o,x,y,z) {
  const c=Math.cos(o.yaw),s=Math.sin(o.yaw);
  return [o.x+c*x+s*z,y,o.z-s*x+c*z];
}
export const playerRadius=.205;
function fits(x,z) {
  const insideMain=x>=room.left&&x<=room.right&&z>=room.back&&z<=room.front;
  const insideAlcove=x>=room.right&&x<=room.annexRight&&z>=room.annexBack&&z<=room.annexFront;
  if(!insideMain&&!insideAlcove)return false;
  const limit=(playerRadius-1e-6)**2;
  for(const [[ax,az],[bx,bz]] of walls){
    const u=bx-ax,v=bz-az,t=Math.max(0,Math.min(1,((x-ax)*u+(z-az)*v)/(u*u+v*v)));
    if((x-ax-t*u)**2+(z-az-t*v)**2<limit)return false;
  }
  for(const o of blocks){const [u,v]=localAt(o,x,z);
    if(Math.max(0,Math.abs(u)-o.w/2)**2+Math.max(0,Math.abs(v)-o.d/2)**2<limit)return false;
  }
  return true;
}
export function advance(x,z,dx,dz) {
  const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.085)), r=playerRadius;
  for(let n=0;n<steps;n++) {
    const lastX=x,lastZ=z;let pushed=false;
    x+=dx/steps; z+=dz/steps;
    for(let pass=0;pass<2;pass++) {
      for(const [[ax,az],[bx,bz]] of walls) {
        const ex=bx-ax,ez=bz-az,t=Math.max(0,Math.min(1,((x-ax)*ex+(z-az)*ez)/(ex*ex+ez*ez)));
        const vx=x-ax-t*ex,vz=z-az-t*ez,dist=Math.hypot(vx,vz);
        if(dist<r && dist>1e-8) {pushed=true;x+=vx*(r/dist-1);z+=vz*(r/dist-1);}
      }
      for(const o of blocks) {
        const [u,v]=localAt(o,x,z), hx=o.w/2,hz=o.d/2;
        const ux=u-Math.max(-hx,Math.min(hx,u)),vz=v-Math.max(-hz,Math.min(hz,v)),d=Math.hypot(ux,vz);
        if(d>=r)continue;
        pushed=true;
        let du=0,dv=0;
        if(d>1e-8) {du=ux*(r/d-1);dv=vz*(r/d-1);}
        else if(hx-Math.abs(u)<hz-Math.abs(v))du=(Math.sign(u)||1)*(hx+r)-u;
        else dv=(Math.sign(v)||1)*(hz+r)-v;
        const c=Math.cos(o.yaw),s=Math.sin(o.yaw);x+=c*du+s*dv;z+=-s*du+c*dv;
      }
    }
    // Reject a step when adjacent solids leave less space than the player's diameter.
    if(pushed&&!fits(x,z)){x=lastX;z=lastZ;}
  }
  return [x,z];
}