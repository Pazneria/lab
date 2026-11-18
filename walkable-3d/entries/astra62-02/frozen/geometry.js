"use strict";
const S={lights:[],glows:[],colliders:[],shades:[],contacts:[],reflect:true,reflectMask:1};
const VSTR=13;
let verts=new Float32Array(65536*VSTR),inds=new Uint32Array(131072),refInds=new Uint32Array(32768),nv=0,ni=0,nr=0;
function rgb(hex){if(Array.isArray(hex))return hex;const n=parseInt(hex.replace("#",""),16);return [(n>>16&255)/255,(n>>8&255)/255,(n&255)/255];}
function mat(hex,tex="plain",kind=0,scale=1){return {c:rgb(hex),t:T[tex],k:kind,s:scale};}
function shade(m,f){return {...m,c:m.c.map(v=>v*f)};}
const identity=()=>[1,0,0,0,1,0,0,0,1,0,0,0];
let M=identity();
function wp(x,y,z){return [M[0]*x+M[3]*y+M[6]*z+M[9],M[1]*x+M[4]*y+M[7]*z+M[10],M[2]*x+M[5]*y+M[8]*z+M[11]];}
function wn(x,y,z){return [M[0]*x+M[3]*y+M[6]*z,M[1]*x+M[4]*y+M[7]*z,M[2]*x+M[5]*y+M[8]*z];}
function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
function sub(a,b){return [a[0]-b[0],a[1]-b[1],a[2]-b[2]];}
function unit(a){const n=Math.hypot(...a)||1;return [a[0]/n,a[1]/n,a[2]/n];}
function frame(x,y,z,yaw,pitch,roll,fn){
  const old=M, p=wp(x,y,z),cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch),cr=Math.cos(roll),sr=Math.sin(roll);
  const ex=wn(cy*cr+sy*sp*sr,cp*sr,-sy*cr+cy*sp*sr);
  const ey=wn(-cy*sr+sy*sp*cr,cp*cr,sy*sr+cy*sp*cr);
  const ez=wn(sy*cp,-sp,cy*cp);M=[...ex,...ey,...ez,...p];
  try{fn();}finally{M=old;}
}
function place(x,y,z,yaw,fn){frame(x,y,z,yaw,0,0,fn);}
function reflected(yes,fn){const old=S.reflect;S.reflect=yes;try{fn();}finally{S.reflect=old;}}
function grow(a){const b=new a.constructor(a.length*2);b.set(a);return b;}
function vertex(p,n,u,v,m){
  if(nv*VSTR===verts.length)verts=grow(verts);
  const i=nv*VSTR,a=wp(...p),b=wn(...n);
  verts[i]=a[0];verts[i+1]=a[1];verts[i+2]=a[2];verts[i+3]=b[0];verts[i+4]=b[1];verts[i+5]=b[2];
  verts[i+6]=u;verts[i+7]=v;verts[i+8]=m.c[0];verts[i+9]=m.c[1];verts[i+10]=m.c[2];verts[i+11]=m.t;verts[i+12]=m.k;
  return nv++;
}
function tri(a,b,c){
  if(ni+3>inds.length)inds=grow(inds);inds[ni++]=a;inds[ni++]=b;inds[ni++]=c;
  if(S.reflect){if(nr+3>refInds.length)refInds=grow(refInds);refInds[nr++]=a;refInds[nr++]=b;refInds[nr++]=c;}
}
function quad(a,b,c,d,m,uv=null,normal=null){
  const n=normal||unit(cross(sub(b,a),sub(d,a)));
  const st=uv||[[0,Math.hypot(...sub(d,a))*m.s],[Math.hypot(...sub(b,a))*m.s,Math.hypot(...sub(d,a))*m.s],[Math.hypot(...sub(b,a))*m.s,0],[0,0]];
  const v=vertex(a,n,...st[0],m);vertex(b,n,...st[1],m);vertex(c,n,...st[2],m);vertex(d,n,...st[3],m);
  tri(v,v+1,v+2);tri(v,v+2,v+3);
}
const fullUV=[[0,1],[1,1],[1,0],[0,0]];
function box(x,y,z,w,h,d,m){
  const X=x+w/2,L=x-w/2,Y=y+h/2,B=y-h/2,Z=z+d/2,K=z-d/2;
  quad([L,B,Z],[X,B,Z],[X,Y,Z],[L,Y,Z],m);
  quad([X,B,K],[L,B,K],[L,Y,K],[X,Y,K],m);
  quad([X,B,Z],[X,B,K],[X,Y,K],[X,Y,Z],m);
  quad([L,B,K],[L,B,Z],[L,Y,Z],[L,Y,K],m);
  quad([L,Y,Z],[X,Y,Z],[X,Y,K],[L,Y,K],m);
  quad([L,B,K],[X,B,K],[X,B,Z],[L,B,Z],m);
}
function front(x,y,z,w,h,m){
  if(w>.7||h>.72){surface(Math.ceil(w/.38),Math.ceil(h/.32),(u,v)=>[x+(u-.5)*w,y+(v-.5)*h,z],m);return;}
  quad([x-w/2,y-h/2,z],[x+w/2,y-h/2,z],[x+w/2,y+h/2,z],[x-w/2,y+h/2,z],m,fullUV);
}
function flatTriangle(a,b,c,m){
  const n=unit(cross(sub(b,a),sub(c,a))),i=vertex(a,n,0,1,m);vertex(b,n,1,1,m);vertex(c,n,.5,0,m);tri(i,i+1,i+2);
}
function surface(cols,rows,sample,m,uvFn=(u,v)=>[u,1-v],flip=false) {
  const base=nv;
  for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){
    const u=i/cols,v=j/rows,p=sample(u,v);
    const du=sub(sample(Math.min(1,u+.002),v),sample(Math.max(0,u-.002),v));
    const dv=sub(sample(u,Math.min(1,v+.002)),sample(u,Math.max(0,v-.002)));
    const n=unit(flip?cross(dv,du):cross(du,dv));vertex(p,n,...uvFn(u,v),m);
  }
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){
    const a=base+j*(cols+1)+i,b=a+1,c=b+cols+1,d=a+cols+1;
    if(flip){tri(a,c,b);tri(a,d,c);}else{tri(a,b,c);tri(a,c,d);}
  }
}
function lathe(x,y,z,profile,m,sides=24,segmentMaterial=null){
  for(let j=0;j<profile.length-1;j++){
    const [r0,h0]=profile[j],[r1,h1]=profile[j+1],dR=r1-r0,dH=h1-h0,mag=Math.hypot(dR,dH)||1,mj=segmentMaterial?segmentMaterial(j):m;
    const first=nv;
    for(let i=0;i<=sides;i++){
      const t=i/sides*TAU,c=Math.cos(t),s=Math.sin(t),n=[c*dH/mag,-dR/mag,s*dH/mag];
      vertex([x+c*r0,y+h0,z+s*r0],n,i/sides,1-h0*mj.s,mj);
      vertex([x+c*r1,y+h1,z+s*r1],n,i/sides,1-h1*mj.s,mj);
    }
    for(let i=0;i<sides;i++){const a=first+i*2;tri(a,a+1,a+3);tri(a,a+3,a+2);}
  }
}
function ell(x,y,z,rx,ry,rz,m,sides=12,bands=7){
  const first=nv;
  for(let j=0;j<=bands;j++){
    const phi=j/bands*Math.PI-Math.PI/2,cp=Math.cos(phi),sp=Math.sin(phi);
    for(let i=0;i<=sides;i++){
      const t=i/sides*TAU,c=Math.cos(t),s=Math.sin(t);vertex([x+rx*c*cp,y+ry*sp,z+rz*s*cp],unit([c*cp/rx,sp/ry,s*cp/rz]),i/sides,1-j/bands,m);
    }
  }
  for(let j=0;j<bands;j++)for(let i=0;i<sides;i++){const a=first+j*(sides+1)+i,b=a+sides+1;tri(a,b,b+1);tri(a,b+1,a+1);}
}
function rod(a,b,r,m,sides=10,rEnd=r,cap=true){
  const dir=unit(sub(b,a)),l=Math.hypot(...sub(b,a));
  if(l<.0001)return;
  const u=unit(cross(dir,Math.abs(dir[1])>.8?[1,0,0]:[0,1,0])),v=cross(dir,u),base=nv;
  for(let i=0;i<=sides;i++){
    const t=i/sides*TAU,c=Math.cos(t),s=Math.sin(t),n=[u[0]*c+v[0]*s,u[1]*c+v[1]*s,u[2]*c+v[2]*s];
    vertex(a.map((q,k)=>q+r*n[k]),n,i/sides,l*m.s,m);vertex(b.map((q,k)=>q+rEnd*n[k]),n,i/sides,0,m);
  }
  for(let i=0;i<sides;i++){const k=base+2*i;tri(k,k+2,k+3);tri(k,k+3,k+1);}
  if(cap){
    for(const end of [0,1]){
      const p=end?b:a,rad=end?rEnd:r,n=dir.map(q=>end?q:-q),center=vertex(p,n,.5,.5,m);
      for(let i=0;i<=sides;i++){const t=i/sides*TAU,c=Math.cos(t),s=Math.sin(t);
        vertex(p.map((q,k)=>q+rad*(u[k]*c+v[k]*s)),n,.5+.5*c,.5+.5*s,m);
        if(i){const j=nv-1;end?tri(center,j-1,j):tri(center,j,j-1);}
      }
    }
  }
}
function rope(a,b,sag,r,m,steps=12){
  const q=t=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t-sag*4*t*(1-t),a[2]+(b[2]-a[2])*t];
  for(let i=0;i<steps;i++)rod(q(i/steps),q((i+1)/steps),r,m,6,r,false);
  return q;
}
function ring(x,y,z,radius,minor,m,n=22){
  for(let i=0;i<n;i++){const a=i/n*TAU,b=(i+1)/n*TAU;rod([x+Math.cos(a)*radius,y,z+Math.sin(a)*radius],[x+Math.cos(b)*radius,y,z+Math.sin(b)*radius],minor,m,5,minor,false);}
}
function boxBeam(a,b,w,d,m){
  const diff=sub(b,a),len=Math.hypot(...diff);if(!len)return;
  const ey=unit(diff),ex=unit(cross(ey,Math.abs(ey[2])>.85?[1,0,0]:[0,0,1])),ez=cross(ex,ey);
  const p=wp(...a),axes=[wn(...ex),wn(...ey),wn(...ez)],old=M;M=[...axes.flat(),...p];
  try{box(0,len/2,0,w,len,d,m);}finally{M=old;}
}
function orientedRect(x,z,w,d){
  const p=wp(x,0,z),ax=M[0],az=M[2],len=Math.hypot(ax,az)||1;
  return {x:p[0],z:p[2],ax:ax/len,az:az/len,hx:w/2,hz:d/2};
}
function barrier(x,z,w,d,base=0,top=2,shadows=true){
  const b={...orientedRect(x,z,w,d),base:base+M[10],top:top+M[10]};S.colliders.push(b);if(shadows)S.shades.push(b);return b;
}
function shadeBlock(x,z,w,d,base,top){S.shades.push({...orientedRect(x,z,w,d),base:base+M[10],top:top+M[10]});}
function contact(x,z,w,d,strength=.65,reach=.6,cover=0){S.contacts.push({...orientedRect(x,z,w,d),strength,reach,cover});}
function light(x,y,z,color,power,reach,halo=0,shiny=true){
  const p=wp(x,y,z),c=rgb(color);S.lights.push({p,c,power,reach,r2:reach*reach,shiny});
  if(halo)S.glows.push({p,c,size:halo});
}
function glow(x,y,z,color,size){S.glows.push({p:wp(x,y,z),c:rgb(color),size});}
function gridFront(x,y,z,w,h,m,step=1.25){
  surface(Math.ceil(w/step),Math.ceil(h/step),(u,v)=>[x+(u-.5)*w,y+(v-.5)*h,z],m,(u,v)=>[u*w*m.s,(1-v)*h*m.s]);
}
function wallBlock(x,y,z,w,h,d,m){
  place(x,y,z,0,()=>{
    gridFront(0,0,d/2,w,h,m);
    place(0,0,-d/2,Math.PI,()=>gridFront(0,0,0,w,h,m));
    place(w/2,0,0,Math.PI/2,()=>gridFront(0,0,0,d,h,m));
    place(-w/2,0,0,-Math.PI/2,()=>gridFront(0,0,0,d,h,m));
    quad([-w/2,h/2,d/2],[w/2,h/2,d/2],[w/2,h/2,-d/2],[-w/2,h/2,-d/2],m);
  });
}
function plaque(x,y,z,w,h,art,back,thickness=.045,bright=false){
  box(x,y,z-thickness*.5,w+.045,h+.045,thickness,back);
  front(x,y,z+.002,w,h,mat("#ffffff",art,bright?4:0));
}
function obsdist(b,x,z){
  const dx=x-b.x,dz=z-b.z,lx=dx*b.ax+dz*b.az,lz=-dx*b.az+dz*b.ax;
  return Math.hypot(Math.max(0,Math.abs(lx)-b.hx),Math.max(0,Math.abs(lz)-b.hz));
}
function hitsBlock(b,x,y,z,dx,dy,dz){
  if((y>b.top&&y+dy>b.top)||(y<b.base&&y+dy<b.base))return false;
  const rx=x-b.x,rz=z-b.z,ox=rx*b.ax+rz*b.az,oz=-rx*b.az+rz*b.ax;
  const vx=dx*b.ax+dz*b.az,vz=-dx*b.az+dz*b.ax;
  let lo=.018,hi=.977;
  if(Math.abs(vx)<.0001){if(Math.abs(ox)>b.hx)return false;}else{
    const a=(-b.hx-ox)/vx,c=(b.hx-ox)/vx;lo=Math.max(lo,Math.min(a,c));hi=Math.min(hi,Math.max(a,c));if(lo>=hi)return false;
  }
  if(Math.abs(vz)<.0001){if(Math.abs(oz)>b.hz)return false;}else{
    const a=(-b.hz-oz)/vz,c=(b.hz-oz)/vz;lo=Math.max(lo,Math.min(a,c));hi=Math.min(hi,Math.max(a,c));if(lo>=hi)return false;
  }
  if(Math.abs(dy)<.0001)return y>=b.base&&y<=b.top;
  const a=(b.base-y)/dy,c=(b.top-y)/dy;
  return Math.max(lo,Math.min(a,c))<Math.min(hi,Math.max(a,c));
}
function bakeLights(){
  // Bound each emitter's short shadow-caster list once. The walk costs no ray queries.
  for(const L of S.lights)L.blockers=S.shades.filter(b=>obsdist(b,L.p[0],L.p[2])<L.reach&&b.base<L.p[1]+L.reach);
  for(let i=0;i<nv;i++){
    const k=i*VSTR,kind=verts[k+12];if(kind===4)continue;
    const x=verts[k],y=verts[k+1],z=verts[k+2],nx=verts[k+3],ny=verts[k+4],nz=verts[k+5];
    const passage=clamp((-z-8.0)/1.45,0,1),up=ny*.5+.5;
    const sky=(.32+.23*up+.12*Math.max(0,-.39*nx+.69*ny+.61*nz))*(1-passage*.40);
    let rr=sky*.79,gg=sky*.90,bb=sky*1.08;
    for(const L of S.lights){
      const dx=L.p[0]-x,dy=L.p[1]-y,dz=L.p[2]-z,ds=dx*dx+dy*dy+dz*dz;
      if(ds>=L.r2)continue;
      const d=Math.sqrt(ds)+.0001,dp=(dx*nx+dy*ny+dz*nz)/d;
      const cut=1-ds/L.r2,atten=L.power*cut*cut/(1+ds*.69);
      const direct=Math.max(0,dp)*.84+.16;
      let vis=1;
      if(atten>.045&&dp>-.4){
        for(const b of L.blockers){if(hitsBlock(b,x+nx*.026,y+ny*.026,z+nz*.026,dx,dy,dz)){vis=.19;break;}}
      }
      const amount=atten*direct*vis;
      rr+=L.c[0]*amount;gg+=L.c[1]*amount;bb+=L.c[2]*amount;
    }
    const toe=.88+.12*clamp(y/.43,0,1),shadeDown=ny<-.65?.83:1;
    verts[k+8]*=Math.min(rr*toe*shadeDown,1.8);verts[k+9]*=Math.min(gg*toe*shadeDown,1.7);verts[k+10]*=Math.min(bb*toe*shadeDown,1.6);
  }
}