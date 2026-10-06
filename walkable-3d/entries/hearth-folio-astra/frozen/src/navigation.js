// All measurements are metres. The support model uses a smooth ramp over the visible treads.
export const EYE_HEIGHT=1.67;
export const BODY_RADIUS=0.23;
export const GALLERY_HEIGHT=3.4;
export const STAIR={minX:-7.45,maxX:-4.9,minZ:0.4,maxZ:6.7,height:3.4};
export const START={x:0.7,y:0,z:7.5,yaw:0.08,pitch:0.015};
export const obstacles=[];
export function obstacle(x,z,w,d,minY=0,maxY=2){obstacles.push({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2,minY,maxY});}
const inside=(x,z,a,b,c,d,pad=0)=>x>=a+pad&&x<=b-pad&&z>=c+pad&&z<=d-pad;
export function inGroundPlan(x,z,r=BODY_RADIUS){
  // Sample the body's perimeter against the union to leave the alcove opening seamless.
  for(let i=0;i<12;i++){
    const a=i*Math.PI/6,px=x+Math.cos(a)*r,pz=z+Math.sin(a)*r;
    if(!inside(px,pz,-8,8,-9,9)&&!inside(px,pz,7.7,11.6,1,7))return false;
  }
  return true;
}
export function supportHeight(x,z,currentY){
  if(inside(x,z,STAIR.minX,STAIR.maxX,STAIR.minZ,STAIR.maxZ))return (STAIR.maxZ-z)/(STAIR.maxZ-STAIR.minZ)*STAIR.height;
  if(currentY>3.08){
    if(inside(x,z,-8,8,-9,-5.15,BODY_RADIUS)||inside(x,z,-8,-4.6,-8.7,0.4,0))return GALLERY_HEIGHT;
    // Treat the exact landing seam as contiguous with the ramp.
    if(inside(x,z,STAIR.minX,STAIR.maxX,0.39,0.65))return Math.min(3.4,(6.7-z)/6.3*3.4);
    return null;
  }
  return 0;
}
export function canOccupy(x,z,y){
  if(!inGroundPlan(x,z))return false;
  for(const b of obstacles){
    if(y+1.58<=b.minY||y+0.12>=b.maxY)continue;
    const px=Math.max(b.minX,Math.min(x,b.maxX)),pz=Math.max(b.minZ,Math.min(z,b.maxZ));
    if((x-px)**2+(z-pz)**2<BODY_RADIUS**2)return false;
  }
  return true;
}
export function move(position,dx,dz){
  const parts=Math.max(1,Math.ceil(Math.hypot(dx,dz)/0.075));
  for(let n=0;n<parts;n++){
    for(const [ax,az] of [[dx/parts,0],[0,dz/parts]]){
      const x=position.x+ax,z=position.z+az,y=supportHeight(x,z,position.y);
      if(y!==null&&Math.abs(y-position.y)<0.22&&canOccupy(x,z,y)){position.x=x;position.z=z;position.y=y;}
    }
  }
  return position;
}
