// Horizontal capsule collision against architectural and furniture footprints.
// The cottage has one continuous floor: no gravity or jump is needed.
export const PLAYER_RADIUS = .22;
export const EYE_HEIGHT = 1.63;
export const bounds = { minX:-5.12,maxX:5.16,minZ:-4.16,maxZ:5.94 };

export function canStand(x,z,colliders,radius=PLAYER_RADIUS) {
  if(!Number.isFinite(x)||!Number.isFinite(z))return false;
  if(x-radius<bounds.minX||x+radius>bounds.maxX||z-radius<bounds.minZ||z+radius>bounds.maxZ)return false;
  // The northwest part of the footprint is outdoors, beyond the kitchen wall.
  if(z-radius<.04 && x-radius<-.26)return false;
  for(const b of colliders){
    const nx=Math.max(b.minX,Math.min(x,b.maxX));
    const nz=Math.max(b.minZ,Math.min(z,b.maxZ));
    if((x-nx)**2+(z-nz)**2<radius**2)return false;
  }
  return true;
}

export function movePlayer(position,dx,dz,colliders) {
  const count=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.075));
  const sx=dx/count,sz=dz/count;
  for(let i=0;i<count;i++){
    if(canStand(position.x+sx,position.z,colliders))position.x+=sx;
    if(canStand(position.x,position.z+sz,colliders))position.z+=sz;
  }
  return position;
}

export function roomAt(x,z) {
  if(z<-.24)return {name:'The glasshouse',description:'Cool light · patient things',number:'03'};
  if(x>.45)return {name:'The workroom',description:'Useful things · unlikely things',number:'02'};
  return {name:'The kitchen',description:'The kettle was just on',number:'01'};
}
