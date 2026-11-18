import * as T from './vendor/three.module.min.js';
import {zoneAt} from './rooms.js';

// Keep the complete shell in view. The only sightlines between furnishing groups pass through
// these openings, so an off-screen opening can safely exclude the room behind it.
export function furnishingVisibility(scene){
  const groups=[[],[],[]];
  for(const mesh of scene.children){
    const zone=mesh.name.split(' / ')[0];
    if(zone==='Fitting room furnishings')groups[0].push(mesh);
    if(zone==='Archive cases'||zone==='Sample library')groups[1].push(mesh);
    if(['The sounding mantle','Cutting bench','Workshop fittings'].includes(zone))groups[2].push(mesh);
  }
  const doors=[1.1,-6.6].map(z=>new T.Box3(new T.Vector3(-2.22,-.05,z-.31),new T.Vector3(2.22,4.15,z+.31)));
  const frustum=new T.Frustum(),clip=new T.Matrix4();
  let last=-1;
  return camera=>{
    camera.updateMatrixWorld();
    frustum.setFromProjectionMatrix(clip.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
    const a=Math.abs(camera.position.z-1.1)<.62||frustum.intersectsBox(doors[0]);
    const b=Math.abs(camera.position.z+6.6)<.62||frustum.intersectsBox(doors[1]);
    const here=zoneAt(camera.position.z);
    const mask=here===0 ? 1+(a?2:0)+(a&&b?4:0)
      :here===1 ? 2+(a?1:0)+(b?4:0)
      :4+(b?2:0)+(a&&b?1:0);
    if(mask!==last){
      for(let i=0;i<3;i++)for(const mesh of groups[i])mesh.visible=Boolean(mask&(1<<i));
      last=mask;
    }
    return mask;
  };
}

