// Static, low-frequency lighting volume for the bay. All coordinates are in metres.
// Thin occluders are sampled in three orthographic directions on a separate finer grid.
const origin=[-8.84,-.45,-7.65],dim=[128,41,91],spacing=.17;
export function bakeIrradiance(batches){
  const [nx,ny,nz]=dim.map(v=>v*2),slice=nx*ny,unit=spacing/2,occ=new Uint8Array(slice*nz);
  const strides=[1,nx,slice],limits=[nx,ny,nz],q0=[0,0,0],q1=[0,0,0],q2=[0,0,0];
  const triNormal=[0,0,0];
  for(const batch of batches.values()){
    if(['glass','signal','mark','outside','lit'].includes(batch.m))continue;
    const pts=batch.p,indices=batch.i;
    for(let t=0;t<indices.length;t+=3){
      for(let a=0;a<3;a++){
        q0[a]=(pts[3*indices[t]+a]-origin[a])/unit;
        q1[a]=(pts[3*indices[t+1]+a]-origin[a])/unit;
        q2[a]=(pts[3*indices[t+2]+a]-origin[a])/unit;
      }
      for(let a=0;a<3;a++){const u=(a+1)%3,v=(a+2)%3;triNormal[a]=(q1[u]-q0[u])*(q2[v]-q0[v])-(q1[v]-q0[v])*(q2[u]-q0[u]);}
      let a=0;if(Math.abs(triNormal[1])>Math.abs(triNormal[a]))a=1;if(Math.abs(triNormal[2])>Math.abs(triNormal[a]))a=2;
      const u=(a+1)%3,v=(a+2)%3,det=triNormal[a];
      if(Math.abs(det)<.10)continue;
      const loU=Math.max(0,Math.floor(Math.min(q0[u],q1[u],q2[u]))),hiU=Math.min(limits[u]-1,Math.floor(Math.max(q0[u],q1[u],q2[u])));
      const loV=Math.max(0,Math.floor(Math.min(q0[v],q1[v],q2[v]))),hiV=Math.min(limits[v]-1,Math.floor(Math.max(q0[v],q1[v],q2[v])));
      const du1=q1[u]-q0[u],dv1=q1[v]-q0[v],du2=q2[u]-q0[u],dv2=q2[v]-q0[v];
      for(let iv=loV;iv<=hiV;iv++)for(let iu=loU;iu<=hiU;iu++){
        const du=iu+.5-q0[u],dv=iv+.5-q0[v],s=(du*dv2-dv*du2)/det,r=(du1*dv-dv1*du)/det;
        if(s<-.009||r<-.009||s+r>1.009)continue;
        const ia=Math.floor(q0[a]+s*(q1[a]-q0[a])+r*(q2[a]-q0[a]));
        if(ia>=0&&ia<limits[a])occ[iu*strides[u]+iv*strides[v]+ia*strides[a]]=1;
      }
    }
  }
  function ray(x,y,z,dx,dy,dz){
    const steps=Math.max(1,Math.ceil(Math.max(Math.abs(dx),Math.abs(dy),Math.abs(dz))*.82));
    dx/=steps;dy/=steps;dz/=steps;
    for(let i=2;i<steps;i++){
      const xx=x+dx*i,yy=y+dy*i,zz=z+dz*i;
      if(xx<0||xx>=nx||yy<0||yy>=ny||zz<0||zz>=nz)return 1;
      if(occ[(xx|0)+(yy|0)*nx+(zz|0)*slice])return i/steps;
    }
    return 1;
  }
  const dirs=[];
  for(let i=0;i<16;i++){
    const yy=1-2*(i+.5)/16,a=i*2.39996323,r=Math.sqrt(1-yy*yy),len=(i%3===0?2.25:1.25)/unit;
    dirs.push([Math.cos(a)*r*len,yy*len,Math.sin(a)*r*len]);
  }
  const lamp=(x,y,z)=>[(x-origin[0])/unit,(y-origin[1])/unit,(z-origin[2])/unit];
  const roof=[];
  for(const x of [-4.22,4.22])for(const z of [-5.26,-1.77,1.70,5.22])roof.push(lamp(x,5.59,z));
  const window=[-3.10,-.42,2.28].map(x=>lamp(x,4.22,-6.82));
  const warm=[-1.02,.72,2.48].map(z=>lamp(11.56,2.62,z));
  function light(x,y,z,lamps,kind){
    let energy=0,total=0;
    for(let i=0;i<lamps.length;i++){
      const p=lamps[i],dx=p[0]-x,dy=p[1]-y,dz=p[2]-z,ds=(dx*dx+dy*dy+dz*dz)*unit*unit;
      const w=1/(ds+(kind===2?.45:2.4));total+=w;
      if(ray(x,y,z,dx,dy,dz)>.999)energy+=w;
    }
    if(kind===0)return energy/Math.max(total,.000001);
    return Math.min(1,energy*(kind===1?5.7:1.36));
  }
  const out=new Uint8Array(dim[0]*dim[1]*dim[2]*4);
  for(let iz=0;iz<dim[2];iz++)for(let iy=0;iy<dim[1];iy++)for(let ix=0;ix<dim[0];ix++){
    const x=ix*2+1,y=iy*2+1,z=iz*2+1,idx=4*(ix+dim[0]*(iy+dim[1]*iz));let ao=0;
    for(const d of dirs){const f=ray(x,y,z,...d);ao+=Math.min(1,f*1.26)}
    out[idx]=Math.round(255*ao/dirs.length);
    out[idx+1]=Math.round(255*light(x,y,z,roof,0));
    out[idx+2]=Math.round(255*light(x,y,z,window,1));
    out[idx+3]=Math.round(255*light(x,y,z,warm,2));
  }
  return {bytes:out,origin,dim,spacing};
}

