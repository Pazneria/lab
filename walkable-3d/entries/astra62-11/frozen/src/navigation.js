export const start = Object.freeze({ x:1.07, z:6.38, eye:1.62, yaw:.157, pitch:.007 });
export const bodyRadius=.215;
export const layout={halfWidth:5.9,north:-6.85,south:7.65,bayNorth:-3.48,baySouth:3.02,outer:9.5};

export function roomWalls() {
  const {halfWidth:w,north:n,south:s,bayNorth:b0,baySouth:b1,outer:o}=layout,blocks=[];
  const block=(x,z,hx,hz)=>blocks.push({x,z,hx,hz});
  block(0,n-.13,w+.2,.13);block(0,s+.13,w+.2,.13);
  for(const side of [-1,1]){
    block(side*(w+.13),(n+b0)/2,.13,(b0-n)/2);
    block(side*(w+.13),(s+b1)/2,.13,(s-b1)/2);
    block(side*(o+.13),(b0+b1)/2,.13,(b1-b0)/2+.15);
    block(side*(w+o)/2,b0-.13,(o-w)/2+.13,.13);
    block(side*(w+o)/2,b1+.13,(o-w)/2+.13,.13);
    for(const z of [b0+.046,b1-.046])block(side*5.86,z,.185,.06);
  }
  return blocks;
}
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
export function collides(x,z,obstacles,r=bodyRadius) {
  for(const b of obstacles){
    const dx=Math.max(Math.abs(x-b.x)-b.hx,0),dz=Math.max(Math.abs(z-b.z)-b.hz,0);
    if(dx*dx+dz*dz<r*r)return true;
  }
  return false;
}
export function inRoom(x,z) {
  const p=layout;
  return (Math.abs(x)<=p.halfWidth&&z>=p.north&&z<=p.south)||(Math.abs(x)<=p.outer&&z>=p.bayNorth&&z<=p.baySouth);
}
export function move(x,z,dx,dz,obs){
  // Short planar steps preserve sliding along the furniture and door jambs.
  const count=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.095));
  for(let i=0;i<count;i++){
    const nx=x+dx/count,nz=z+dz/count;
    if(inRoom(nx,z)&&!collides(nx,z,obs))x=nx;
    if(inRoom(x,nz)&&!collides(x,nz,obs))z=nz;
  }
  return [x,z];
}
export function sector(x,z){
  if(x< -5.6&&z>-3.52&&z<3.06)return ['02','Perception bench'];
  if(x> 5.6&&z>-3.52&&z<3.06)return ['03','Motion test rig'];
  return ['01','Instrument hall'];
}
