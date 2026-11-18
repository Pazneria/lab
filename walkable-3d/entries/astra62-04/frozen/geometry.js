"use strict";
globalThis.PH = (() => {
  const TAU = 2*Math.PI;
  let seed = 0x6946c39a;
  function rand(a=0,b=1) {
    seed = (Math.imul(1664525,seed)+1013904223)>>>0;
    return a+(b-a)*(seed/4294967296);
  }
  const pick = a => a[Math.floor(rand(0,a.length))];
  const clamp = (x,a=0,b=1) => Math.max(a,Math.min(b,x));
  const mix = (a,b,t) => a+(b-a)*t;
  const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
  const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
  const mul=(a,s)=>[a[0]*s,a[1]*s,a[2]*s];
  const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
  const len=a=>Math.hypot(...a);
  const norm=a=>mul(a,1/(len(a)||1));
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const lerp3=(a,b,t)=>[mix(a[0],b[0],t),mix(a[1],b[1],t),mix(a[2],b[2],t)];
  const shift=(a,x,y,z)=>[a[0]+x,a[1]+y,a[2]+z];
  const rgb=h=>[parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255];
  const tint=(h,k=1)=>mul(typeof h==="string"?rgb(h):h,k);
  const mat={paint:0,brick:1,paver:2,soil:3,bark:4,wood:5,clay:6,stone:7,moss:8,brass:9,rubber:10,zinc:11,banana:12,monstera:13,fern:14,jewel:15,strap:16,litter:17,label:18,glass:19,fiber:20,grit:21,heart:22};
  class Mesh{
    constructor(capacity=8192){
      this.v=new Float32Array(capacity*12);
      this.i=new Uint32Array(capacity*4);
      this.n=0;this.count=0;
    }
    vertex(p,n,uv,c,m){
      let j=this.n*12;
      if(j+12>this.v.length){const a=new Float32Array(this.v.length*2);a.set(this.v);this.v=a;}
      this.v[j]=p[0];this.v[j+1]=p[1];this.v[j+2]=p[2];
      this.v[j+3]=n[0];this.v[j+4]=n[1];this.v[j+5]=n[2];
      this.v[j+6]=uv[0];this.v[j+7]=uv[1];
      this.v[j+8]=c[0];this.v[j+9]=c[1];this.v[j+10]=c[2];this.v[j+11]=m;
      return this.n++;
    }
    tri(a,b,c){
      if(this.count+3>this.i.length){const ix=new Uint32Array(this.i.length*2);ix.set(this.i);this.i=ix;}
      this.i[this.count++]=a;this.i[this.count++]=b;this.i[this.count++]=c;
    }
    quad(a,b,c,d){this.tri(a,b,c);this.tri(a,c,d);}
  }
  const solid=new Mesh(65536), glass=new Mesh(2048);
  const obstacles=[], casts=[], labels=[], glassGroups=[];
  function face(p,c,m=0,uv=null,mesh=solid,normal=null){
    const n=normal||norm(cross(sub(p[1],p[0]),sub(p[2],p[0])));
    let uvs=uv;
    if(!uvs){
      const u=norm(sub(p[1],p[0])),v=cross(n,u);
      uvs=p.map(q=>[dot(sub(q,p[0]),u),dot(sub(q,p[0]),v)]);
    }
    const base=mesh.n;
    for(let i=0;i<p.length;i++)mesh.vertex(p[i],n,uvs[i],c,m);
    for(let i=1;i<p.length-1;i++)mesh.tri(base,base+i,base+i+1);
  }
  function oriented(c,x,y,z,col,material=0){
    const p=(i,j,k)=>[c[0]+x[0]*i+y[0]*j+z[0]*k,c[1]+x[1]*i+y[1]*j+z[1]*k,c[2]+x[2]*i+y[2]*j+z[2]*k];
    const a=p(-1,-1,-1),b=p(1,-1,-1),d=p(-1,1,-1),e=p(-1,-1,1),g=p(1,1,1),f=p(1,-1,1),h=p(-1,1,1),o=p(1,1,-1);
    face([a,d,o,b],col,material);face([e,f,g,h],col,material);face([a,e,h,d],col,material);
    face([b,o,g,f],col,material);face([d,h,g,o],col,material);face([a,b,f,e],col,material);
  }
  function box(x,y,z,w,h,d,c,m=0,angle=0){
    const ca=Math.cos(angle),sa=Math.sin(angle);
    oriented([x,y,z],[ca*w/2,0,-sa*w/2],[0,h/2,0],[sa*d/2,0,ca*d/2],c,m);
  }
  function beam(a,b,w,d,c,m=0){
    const y=sub(b,a),t=norm(y);
    const x=norm(Math.abs(t[1])>.995?[1,0,0]:cross([0,1,0],t));
    const z=norm(cross(x,t));
    oriented(lerp3(a,b,.5),mul(x,w*.5),mul(y,.5),mul(z,d*.5),c,m);
  }
  function tube(path,radii,c,m=0,sides=7,closedCaps=false) {
    let last=null,arc=0;
    const base=solid.n;
    for(let i=0;i<path.length;i++){
      const axis=norm(sub(path[Math.min(i+1,path.length-1)],path[Math.max(0,i-1)]));
      const ref=last|| (Math.abs(axis[1])>.85?[1,0,0]:[0,1,0]);
      const x=norm(sub(ref,mul(axis,dot(axis,ref)))),z=norm(cross(axis,x));
      const r=typeof radii==="number"?radii:radii[i];
      last=x;
      if(i)arc+=len(sub(path[i],path[i-1]));
      for(let j=0;j<=sides;j++){
        const ang=TAU*j/sides, n=add(mul(x,Math.cos(ang)),mul(z,Math.sin(ang)));
        solid.vertex(add(path[i],mul(n,r)),n,[j/sides*Math.max(.35,r*TAU),arc],typeof c==="function"?c(i,j):c,m);
        if(i&&j){const v=base+i*(sides+1)+j;solid.quad(v-sides-2,v-sides-1,v,v-1);}
      }
    }
    if(closedCaps){
      for(const i of [0,path.length-1]){
        const offset=base+i*(sides+1), axis=norm(sub(path[i],path[i===0?1:i-1]));
        const center=solid.vertex(path[i],axis,[.5,.5],typeof c==="function"?c(i,0):c,m);
        for(let j=0;j<sides;j++)solid.tri(center,offset+j,offset+j+1);
      }
    }
  }
  function lathe(x,z,profile,c,m=0,steps=24){
    const base=solid.n;
    let arc=0;
    for(let k=0;k<profile.length;k++){
      const [r,y]=profile[k], a=profile[Math.max(0,k-1)],b=profile[Math.min(k+1,profile.length-1)];
      const nr=b[1]-a[1], ny=a[0]-b[0];
      if(k)arc+=Math.hypot(r-profile[k-1][0],y-profile[k-1][1]);
      for(let j=0;j<=steps;j++){
        const t=TAU*j/steps,co=Math.cos(t),si=Math.sin(t);
        solid.vertex([x+r*co,y,z+r*si],norm([co*nr,ny,si*nr]),[j/steps*TAU*Math.max(r,.02),arc],typeof c==="function"?c(k,j):c,m);
        if(j&&k){const v=base+k*(steps+1)+j;solid.quad(v-steps-2,v-1,v,v-steps-1);}
      }
    }
  }
  function blob(x,y,z,rx,ry,rz,c,m=7,rings=4,sides=8,irregular=0){
    const base=solid.n,offset=rand(0,TAU),factors=Array.from({length:sides},()=>rand(1-irregular,1+irregular));
    for(let i=0;i<=rings;i++)for(let j=0;j<=sides;j++){
      const lat=Math.PI*i/rings-Math.PI/2,a=j*TAU/sides+offset,q=Math.cos(lat),s=factors[j%sides],nx=q*Math.cos(a),ny=Math.sin(lat),nz=q*Math.sin(a);
      solid.vertex([x+rx*nx*s,y+ry*ny,z+rz*nz*s],norm([nx/rx,ny/ry,nz/rz]),[j/sides*TAU*rx,i/rings*Math.PI*ry],c,m);
      if(i&&j){const v=base+i*(sides+1)+j;solid.quad(v-sides-2,v-1,v,v-sides-1);}
    }
  }
  function grid(cols,rows,point,col,m){
    const p=[],base=solid.n;
    for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++)p.push(point(i/cols,j/rows));
    for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){
      const k=j*(cols+1)+i,dx=sub(p[k+(i<cols?1:0)],p[k-(i>0?1:0)]),dy=sub(p[k+(j<rows?cols+1:0)],p[k-(j>0?cols+1:0)]);
      solid.vertex(p[k],norm(cross(dx,dy)),[i/cols,j/rows],typeof col==="function"?col(i/cols,j/rows):col,m);
      if(i&&j){const v=base+k;solid.quad(v-cols-2,v-cols-1,v,v-1);}
    }
  }
  function obstacle(x0,z0,x1,z1){obstacles.push([Math.min(x0,x1),Math.min(z0,z1),Math.max(x0,x1),Math.max(z0,z1)]);}
  function ao(x,z,rx,rz,amount=.5){casts.push([x,z,rx,rz,amount]);}
  function plaque(center,right,up,w,h,id,col=rgb('ffffff')){
    const x=mul(norm(right),w/2),y=mul(norm(up),h/2);
    const points=[sub(sub(center,x),y),add(sub(center,y),x),add(add(center,x),y),add(sub(center,x),y)];
    const ci=id%4,ri=Math.floor(id/4),sx=.001,sy=.001;
    face(points,col,mat.label,[[ci/4+sx,(ri+1)/4-sy],[(ci+1)/4-sx,(ri+1)/4-sy],[(ci+1)/4-sx,ri/4+sy],[ci/4+sx,ri/4+sy]]);
  }
  return {TAU,rand,pick,clamp,mix,add,sub,mul,dot,len,norm,cross,lerp3,shift,rgb,tint,mat,Mesh,solid,glass,glassGroups,obstacles,casts,labels,face,oriented,box,beam,tube,lathe,blob,grid,obstacle,ao,plaque};
})();