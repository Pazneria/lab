// Horizontal swept movement of the player's 0.22 m radius. All deck surfaces
// share one structural datum. Furniture footprints are oriented with the meshes.
export const radius=.22;
export function prepareColliders(def){
 return def.collisions.map(o=>({...o,cs:Math.cos(o.a),sn:Math.sin(o.a),hw:o.w/2,hd:o.d/2}));
}
export function pushOut(state,obstacles,bounds){
 const [left,right,back,front]=bounds;
 for(let pass=0;pass<4;pass++){
  state.x=Math.max(left+radius,Math.min(right-radius,state.x));
  state.z=Math.max(back+radius,Math.min(front-radius,state.z));
  let corrected=false;
  for(const o of obstacles){
   const dx=state.x-o.x,dz=state.z-o.z;
   const x=o.cs*dx-o.sn*dz,z=o.sn*dx+o.cs*dz;
   if(Math.abs(x)>=o.hw+radius||Math.abs(z)>=o.hd+radius)continue;
   const closestX=Math.max(-o.hw,Math.min(o.hw,x)),closestZ=Math.max(-o.hd,Math.min(o.hd,z));
   const sx=x-closestX,sz=z-closestZ,ds=sx*sx+sz*sz;if(ds>=radius*radius)continue;
   let px=0,pz=0;
   if(ds>.00000001){const f=(radius+.00002)/Math.sqrt(ds)-1;px=sx*f;pz=sz*f;}
   else if(o.hw-Math.abs(x)<o.hd-Math.abs(z)){px=(x<0?-1:1)*(o.hw+radius+.00002-Math.abs(x));}
   else{pz=(z<0?-1:1)*(o.hd+radius+.00002-Math.abs(z));}
   state.x+=o.cs*px+o.sn*pz;state.z+=-o.sn*px+o.cs*pz;corrected=true;
  }
  if(!corrected)break;
 }
}
export function walk(state,dx,dz,obstacles,bounds){
 const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.065));
 for(let i=0;i<steps;i++){state.x+=dx/steps;state.z+=dz/steps;pushOut(state,obstacles,bounds);}
}
export function zone(z){return z>.83?'Sleeping quarters':z> -3.65?'Private study':'Observation nook';}
export function cameraFrame(x,y,z,yaw,pitch,aspect){
 const sy=Math.sin(yaw),cy=Math.cos(yaw),sp=Math.sin(pitch),cp=Math.cos(pitch);
 const f=[sy*cp,sp,-cy*cp],r=[cy,0,sy],u=[-sy*sp,cp,cy*sp],e=[x,y,z];
 const tan=Math.tan((65*Math.PI/180)/2),sx=1/(tan*aspect),syf=1/tan;
 const near=.039,far=24,A=(far+near)/(far-near),B=-2*far*near/(far-near);
 const eyeDot=v=>-(x*v[0]+y*v[1]+z*v[2]);
 const vp=new Float32Array([sx*r[0],syf*u[0],A*f[0],f[0],sx*r[1],syf*u[1],A*f[1],f[1],sx*r[2],syf*u[2],A*f[2],f[2],sx*eyeDot(r),syf*eyeDot(u),A*eyeDot(f)+B,eyeDot(f)]);
 return {vp,f,r,u,e,lens:[tan*aspect,tan]};
}
export function frustumPlanes(m){
 const out=[];
 for(let axis=0;axis<3;axis++)for(const sign of [-1,1]){
  out.push([m[3]+sign*m[axis],m[7]+sign*m[4+axis],m[11]+sign*m[8+axis],m[15]+sign*m[12+axis]]);
 }
 return out;
}
export function inFrustum(group,planes){
 const a=group.lo,b=group.hi;
 for(const p of planes){if(p[0]*(p[0]<0?a[0]:b[0])+p[1]*(p[1]<0?a[1]:b[1])+p[2]*(p[2]<0?a[2]:b[2])+p[3]<0)return false;}return true;
}
