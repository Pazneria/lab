import {TAU,clamp,mix,noise,rand32} from './landform.mjs';
export const add=(a,b)=>a.map((x,i)=>x+b[i]);
export const sub=(a,b)=>a.map((x,i)=>x-b[i]);
export const mul=(a,s)=>a.map(x=>x*s);
export const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
export const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export const unit=a=>{const l=Math.hypot(...a)||1;return mul(a,1/l);};
export const lerp3=(a,b,t)=>a.map((x,i)=>mix(x,b[i],t));
export const color=(s,v=1)=>[0,2,4].map(i=>clamp(parseInt(s.slice(i,i+2),16)*v,0,255));
export const tint=(rgb,v)=>rgb.map(x=>clamp(x*v,0,255));
export const geom={p:[],n:[],rgb:[],mat:[],ix:[],groups:{},colliders:[],lodRanges:[]};
export function vert(p,mat,rgb) {
  const i=geom.mat.length;
  geom.p.push(...p); geom.n.push(0,0,0);geom.rgb.push(...rgb);geom.mat.push(mat);
  return i;
}
export function grid(nu,nv,fn,{wrapU=false,wrapV=false,flip=false,lodU=1,lodV=1,lodAt=0}={}) {
  const first=geom.ix.length;
  const w=nu+(wrapU?0:1),h=nv+(wrapV?0:1),base=geom.mat.length;
  for(let j=0;j<h;j++) for(let i=0;i<w;i++) {
    const [p,mat,rgb]=fn(i/nu,j/nv,i,j);
    vert(p,mat,rgb);
  }
  for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){
    const a=base+j*w+i,b=base+j*w+(i+1)%w,c=base+(j+1)%h*w+i,d=base+(j+1)%h*w+(i+1)%w;
    if((i+j)&1) {
      if(flip)geom.ix.push(a,c,d,a,d,b);else geom.ix.push(a,d,c,a,b,d);
    } else if(flip)geom.ix.push(a,c,b,b,c,d);else geom.ix.push(a,b,c,b,d,c);
  }
  if(lodAt>0){
    const coarse=[],lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];
    for(let j=0;j<nv;j+=lodV)for(let i=0;i<nu;i+=lodU){
      const nextU=Math.min(nu,i+lodU)%w,nextV=Math.min(nv,j+lodV)%h;
      const a=base+j*w+i,b=base+j*w+nextU,c=base+nextV*w+i,d=base+nextV*w+nextU;
      if(flip)coarse.push(a,c,b,b,c,d);else coarse.push(a,b,c,b,d,c);
    }
    for(let i=base;i<base+w*h;i++)for(let k=0;k<3;k++){const x=geom.p[i*3+k];lo[k]=Math.min(lo[k],x);hi[k]=Math.max(hi[k],x);}
    geom.lodRanges.push({first,count:geom.ix.length-first,coarse,lo,hi,at:lodAt});
  }
}
export function finishNormals() {
  const {p,n,ix}=geom;
  for(let j=0;j<ix.length;j+=3){
    const a=3*ix[j],b=3*ix[j+1],c=3*ix[j+2];
    const ux=p[b]-p[a],uy=p[b+1]-p[a+1],uz=p[b+2]-p[a+2],
          vx=p[c]-p[a],vy=p[c+1]-p[a+1],vz=p[c+2]-p[a+2],
          nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;
    for(const k of [a,b,c]){n[k]+=nx;n[k+1]+=ny;n[k+2]+=nz;}
  }
  for(let a=0;a<n.length;a+=3){
    const l=Math.hypot(n[a],n[a+1],n[a+2]);
    if(l<1e-11){n[a+1]=1;continue;}n[a]/=l;n[a+1]/=l;n[a+2]/=l;
  }
}
export function tube(points,radii,sides,mat,rgb,cap=true,roll=0) {
  // Parallel transport keeps the fiber or pole from twisting at a bend.
  let prev=null;
  const frames=points.map((p,i)=>{
    const axis=unit(sub(points[Math.min(points.length-1,i+1)],points[Math.max(i-1,0)]));
    const ref=prev || (Math.abs(axis[1])<.86?[0,1,0]:[0,0,1]);
    const n1=unit(sub(ref,mul(axis,dot(ref,axis)))),n2=unit(cross(axis,n1));
    prev=n1;return [n1,n2];
  });
  const base=geom.mat.length;
  grid(sides,points.length-1,(u,v,i,j)=>{
    const a=TAU*u+roll,r=typeof radii==='number'?radii:radii[j];
    const [n1,n2]=frames[j];
    const p=add(points[j],add(mul(n1,r*Math.cos(a)),mul(n2,r*Math.sin(a))));
    return [p,mat,typeof rgb==='function'?rgb(i,j):rgb];
  },{wrapU:true});
  if(cap) for(const j of [0,points.length-1]){
    const ring=[];
    for(let k=0;k<sides;k++){
      const idx=base+j*sides+k;
      ring.push(vert(geom.p.slice(idx*3,idx*3+3),mat,typeof rgb==='function'?rgb(k,j):rgb));
    }
    const center=vert(points[j],mat,typeof rgb==='function'?rgb(0,j):rgb);
    for(let k=0;k<sides;k++){
      const a=ring[k],b=ring[(k+1)%sides];
      if(j===0)geom.ix.push(center,b,a);else geom.ix.push(center,a,b);
    }
  }
}
export const cylinder=(a,b,r,sides,mat,rgb)=>tube([a,b],r,sides,mat,rgb);
export function ellipseCollider(x,z,rx,rz,angle,y0,y1){
  geom.colliders.push({x,z,rx,rz,angle,y0,y1});
}
export function boulder(x,y,z,rx,ry,rz,seed,opts={}) {
  const rnd=rand32(seed), count=opts.sides||Math.round(8+rnd()*5),rot=rnd()*TAU;
  const skewX=(rnd()-.5)*rx*.36,skewZ=(rnd()-.5)*rz*.25;
  const dirs=[],rad=[];
  for(let i=0;i<count;i++){dirs.push(TAU*(i+(rnd()-.5)*.31)/count);rad.push(.86+.24*rnd());}
  const colors=opts.color||color('b2ac99',.93+rnd()*.15);
  const levels=opts.smooth?[-.88,-.59,-.04,.49,.82,.98]:[-.80,-.43,.39,.71,.91];
  const scales=opts.smooth?[.38,.82,1,.88,.55,.12]:[.54,.96,1,.85,.47];
  const kind=opts.mat||0, grade=(rnd()-.5)*.3;
  const seedOffset=rnd()*80;
  const at=(i,j)=>{
    const a=dirs[i],h=levels[j],r=rad[i]*(scales[j]+(rnd()-.5)*.05),localX=Math.cos(a)*rx*r,localZ=Math.sin(a)*rz*r;
    const px=x+localX*Math.cos(rot)-localZ*Math.sin(rot)+h*skewX,pz=z+localX*Math.sin(rot)+localZ*Math.cos(rot)+h*skewZ;
    return [[px,y+ry*(h+.14*(noise(px*2.3,seedOffset,pz*2.3)-.5)+grade*Math.cos(a)*r),pz],kind,tint(colors,.96+.07*noise(px,seedOffset,pz))];
  };
  const start=geom.mat.length;
  grid(count,levels.length-1,(u,v,i,j)=>at(i,j),{wrapU:true,flip:true,lodV:2,lodAt:Math.max(rx,rz)<.31?11:0});
  const top=vert([x+skewX,y+ry*1.03,z+skewZ],kind,colors);
  const topStart=start+(levels.length-1)*count;
  for(let i=0;i<count;i++)geom.ix.push(top,topStart+(i+1)%count,topStart+i);
  if(opts.block)ellipseCollider(x,z,rx*1.0,rz,rot,y-ry,y+1.04*ry);
}

