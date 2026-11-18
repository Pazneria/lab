"use strict";
const groupsByName=new Map();
let part="quarters",tr={x:0,y:0,z:0,c:1,s:0};
function group(name){part=name;}
function frame(x,y,z,yaw,fn){
 const before=tr,c=Math.cos(yaw),s=Math.sin(yaw);
 tr={x:before.x+before.c*x+before.s*z,y:before.y+y,z:before.z-before.s*x+before.c*z,c:before.c*c-before.s*s,s:before.s*c+before.c*s};
 try{fn();}finally{tr=before;}
}
function point(a){return [tr.x+tr.c*a[0]+tr.s*a[2],tr.y+a[1],tr.z-tr.s*a[0]+tr.c*a[2]];}
function direction(a){return [tr.c*a[0]+tr.s*a[2],a[1],-tr.s*a[0]+tr.c*a[2]];}
function mat(id,tint=WHITE,ao=1,emit=0,alpha=1){return {id,tint:typeof tint==="number"?hexColor(tint):tint,ao,emit,alpha};}
function shade(m,k,ao=1){return {...m,tint:V.mul(m.tint,k),ao:m.ao*ao};}
function getBatch(m){
 const alpha=m.alpha<1,key=part+(alpha?"-translucent":"");
 let g=groupsByName.get(key);
 if(!g){g={name:key,v:[],i:[],bounds:[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity],alpha};groupsByName.set(key,g);}
 return g;
}
function face(pts,m,texcoords,normals){
 const g=getBatch(m),i0=g.v.length/15;
 const groundNormal=V.unit(V.cross(V.sub(pts[1],pts[0]),V.sub(pts[2],pts[0])));
 const flat=direction(groundNormal);
 for(let i=0;i<pts.length;i++){
   const p=point(pts[i]),n=normals?direction(normals[i]):flat;
   const uv=texcoords?texcoords[i]:[(Math.abs(groundNormal[0])>.72?pts[i][2]:pts[i][0])*.9,(Math.abs(groundNormal[1])>.72?pts[i][2]:pts[i][1])*.9];
   g.v.push(...p,...n,...uv,...m.tint,m.id,m.ao,m.emit,m.alpha);
   for(let j=0;j<3;j++){g.bounds[j]=Math.min(g.bounds[j],p[j]);g.bounds[j+3]=Math.max(g.bounds[j+3],p[j]);}
 }
 for(let i=1;i<pts.length-1;i++)g.i.push(i0,i0+i,i0+i+1);
}
const AX=[[1,0,0],[0,1,0],[0,0,1]];
const scaleTile=[1.05,.96,1.38,1.1,.72,.71,.58,.5,.74,.86,1.23,.65,.57,.5,1.65,1.37];
function block(center,axes,size,m,bevel=0){
 const half=size.map(q=>q*.5),be=Math.min(bevel,...half.map(q=>q*.72));
 const major=size.indexOf(Math.max(...size));
 const ox=center[0]*.338+center[1]*.27,oy=center[2]*.249+center[1]*.33;
 const convert=p=>[center[0]+axes[0][0]*p[0]+axes[1][0]*p[1]+axes[2][0]*p[2],center[1]+axes[0][1]*p[0]+axes[1][1]*p[1]+axes[2][1]*p[2],center[2]+axes[0][2]*p[0]+axes[1][2]*p[1]+axes[2][2]*p[2]];
 function plane(verts,n){
  if(V.dot(V.cross(V.sub(verts[1],verts[0]),V.sub(verts[2],verts[0])),n)<0)verts.reverse();
  const a=n.map(Math.abs),axis=a.indexOf(Math.max(...a)),u=(axis+1)%3,v=(axis+2)%3;
  const mm=Array.isArray(m)?m[axis]:m,grain=(mm.id===2||mm.id===3),end=grain&&axis===major&&size[major]>Math.min(...size)*1.8;
  const mm2=end?{...mm,id:4}:mm,sz=scaleTile[mm2.id]||1;
  const flip=grain?size[v]>size[u]:u===1;
  face(verts.map(convert),mm2,verts.map(p=>[p[flip?v:u]/sz+ox,p[flip?u:v]/sz+oy]));
 }
 for(let i=0;i<3;i++)for(const sign of [-1,1]){
  const a=(i+1)%3,b=(i+2)%3,n=[0,0,0];n[i]=sign;
  plane([[-1,-1],[1,-1],[1,1],[-1,1]].map(([s,t])=>{const p=[0,0,0];p[i]=sign*half[i];p[a]=s*(half[a]-be);p[b]=t*(half[b]-be);return p;}),n);
 }
 if(be<=0)return;
 for(let i=0;i<3;i++){
  const a=(i+1)%3,b=(i+2)%3;
  for(const s of [-1,1])for(const t of [-1,1]){
   const n=[0,0,0];n[a]=s;n[b]=t;
   plane([[-1,0],[1,0],[1,1],[-1,1]].map(([end,side])=>{const p=[0,0,0];p[i]=end*(half[i]-be);p[a]=s*(half[a]-side*be);p[b]=t*(half[b]-(1-side)*be);return p;}),n);
  }
 }
 for(const sx of [-1,1])for(const sy of [-1,1])for(const sz of [-1,1]){
   const sig=[sx,sy,sz];plane([0,1,2].map(i=>sig.map((s,j)=>s*(half[j]-(j===i?0:be)))),sig);
 }
}
function box(x,y,z,w,h,d,m,bevel=0,yaw=0){
 const c=Math.cos(yaw),s=Math.sin(yaw);
 block([x,y,z],[[c,0,-s],UP,[s,0,c]],[w,h,d],m,bevel);
}
function beam(a,b,w,d,m,bevel=.012,twist=0){
 const axis=V.unit(V.sub(b,a)),ref=Math.abs(axis[1])>.97?[0,0,1]:UP;
 let u=V.unit(V.cross(axis,ref)),v=V.unit(V.cross(u,axis));
 if(twist){const p=u;u=V.add(V.mul(u,Math.cos(twist)),V.mul(v,Math.sin(twist)));v=V.cross(u,axis);}
 block(V.mix(a,b,.5),[u,axis,v],[w,V.len(V.sub(b,a)),d],m,bevel);
}
function lathe(x,y,z,profile,m,segments=16){
 for(let j=0;j<profile.length-1;j++){
  const [r0,y0]=profile[j],[r1,y1]=profile[j+1],mm=Array.isArray(m)?m[j%m.length]:m;
  const sl=y1-y0,sr=r0-r1,bias=(scaleTile[mm.id]||1);
  for(let i=0;i<segments;i++){
   const a=i*TAU/segments,b=(i+1)*TAU/segments,ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);
   const v0=[x+r0*ca,y+y0,z+r0*sa],v1=[x+r1*ca,y+y1,z+r1*sa],v2=[x+r1*cb,y+y1,z+r1*sb],v3=[x+r0*cb,y+y0,z+r0*sb];
   const na=V.unit([sl*ca,sr,sl*sa]),nb=V.unit([sl*cb,sr,sl*sb]);
   const u0=i/segments*Math.max(.5,Math.max(r0,r1)*TAU)/bias,u1=(i+1)/segments*Math.max(.5,Math.max(r0,r1)*TAU)/bias;
   if(r0===0)face([v0,v1,v2],mm,[[u0,y0/bias],[u0,y1/bias],[u1,y1/bias]],[na,na,nb]);
   else if(r1===0)face([v0,v2,v3],mm,[[u0,y0/bias],[u1,y1/bias],[u1,y0/bias]],[na,nb,nb]);
   else face([v0,v1,v2,v3],mm,[[u0,y0/bias],[u0,y1/bias],[u1,y1/bias],[u1,y0/bias]],[na,na,nb,nb]);
  }
 }
}
function cylinder(a,b,r0,r1,m,n=12,cap=true){
 const axis=V.unit(V.sub(b,a)),u=V.unit(V.cross(Math.abs(axis[1])>.94?[0,0,1]:UP,axis)),v=V.cross(axis,u);
 const A=[],B=[],N=[],len=V.len(V.sub(b,a)),slope=(r0-r1)/Math.max(.001,len),sz=scaleTile[m.id]||1;
 for(let i=0;i<n;i++){const t=TAU*i/n,nm=V.add(V.mul(u,Math.cos(t)),V.mul(v,Math.sin(t)));A.push(V.add(a,V.mul(nm,r0)));B.push(V.add(b,V.mul(nm,r1)));N.push(V.unit(V.add(nm,V.mul(axis,slope))));}
 for(let i=0;i<n;i++){const k=(i+1)%n,h=Math.max(r0,r1)*TAU/n/sz;
  face([A[i],A[k],B[k],B[i]],m,[[0,i*h],[0,(i+1)*h],[len/sz,(i+1)*h],[len/sz,i*h]],[N[i],N[k],N[k],N[i]]);
 }
 if(cap){
   face([...A].reverse(),m);face(B,m);
 }
}
function ellipsoid(x,y,z,rx,ry,rz,m,n=16,rings=8,yaw=0){
 const c=Math.cos(yaw),s=Math.sin(yaw);
 const pt=(i,j)=>{const a=TAU*i/n,b=Math.PI*(j/rings-.5),cb=Math.cos(b),px=Math.cos(a)*cb,py=Math.sin(b),pz=Math.sin(a)*cb;
  const nx=px/rx,ny=py/ry,nz=pz/rz;
  return [[x+c*rx*px+s*rz*pz,y+ry*py,z-s*rx*px+c*rz*pz],V.unit([c*nx+s*nz,ny,-s*nx+c*nz]),[i/n*rx*5,j/rings*rz*2.6]];};
 for(let j=0;j<rings;j++)for(let i=0;i<n;i++){
  const q=[pt(i,j),pt(i,j+1),pt(i+1,j+1),pt(i+1,j)];
  if(j===0)q.pop();if(j===rings-1)q.splice(2,1);
  face(q.map(t=>t[0]),m,q.map(t=>t[2]),q.map(t=>t[1]));
 }
}
function pipe(pts,r,m,n=7,closed=false){
 if(pts.length<2)return;
 const loops=[],norm=[];let previous=null;
 for(let i=0;i<pts.length;i++){
  const before=pts[i===0?(closed?pts.length-1:0):i-1],after=pts[i===pts.length-1?(closed?0:i):i+1];
  const t=V.unit(V.sub(after,before));
  let u=previous?V.sub(previous,V.mul(t,V.dot(previous,t))):V.cross(Math.abs(t[1])>.90?[0,0,1]:UP,t);
  u=V.unit(u);const v=V.cross(t,u);previous=u;
  const ring=[],ns=[];
  for(let j=0;j<n;j++){const k=TAU*j/n,nm=V.add(V.mul(u,Math.cos(k)),V.mul(v,Math.sin(k)));ring.push(V.add(pts[i],V.mul(nm,r)));ns.push(nm);}
  loops.push(ring);norm.push(ns);
 }
 let length=0;
 for(let i=0;i<pts.length-(closed?0:1);i++){
  const k=(i+1)%pts.length,nl=length+V.len(V.sub(pts[k],pts[i]));
  for(let j=0;j<n;j++){const h=(j+1)%n;face([loops[i][j],loops[i][h],loops[k][h],loops[k][j]],m,[[length,j/n],[length,(j+1)/n],[nl,(j+1)/n],[nl,j/n]],[norm[i][j],norm[i][h],norm[k][h],norm[k][j]]);}
  length=nl;
 }
}
function hoop(c,u,v,r,m,n=24,sides=7){
 const p=[];for(let i=0;i<n;i++){const a=i*TAU/n;p.push(V.add(c,V.add(V.mul(u,Math.cos(a)),V.mul(v,Math.sin(a)))));}
 pipe(p,r,m,sides,true);
}
function chain(a,b,link,wire,m){
 const d=V.sub(b,a),dist=V.len(d),axis=V.unit(d);
 const across=V.unit(V.cross(Math.abs(axis[1])>.92?[0,0,1]:UP,axis));const perp=V.cross(axis,across);
 const n=Math.max(1,Math.round(dist/(1.51*link)));
 for(let i=0;i<n;i++){const w=i%2?V.add(V.mul(across,.26),V.mul(perp,.966)):across;
   hoop(V.mix(a,b,(i+.5)/n),V.mul(w,.60*link),V.mul(axis,link),wire,m,12,5);}
}
function panel(c,right,up,w,h,m){
 const u=V.mul(right,w/2),v=V.mul(up,h/2);
 face([V.sub(V.sub(c,u),v),V.sub(V.add(c,u),v),V.add(V.add(c,u),v),V.add(V.sub(c,u),v)],m,[[0,1],[1,1],[1,0],[0,0]]);
}
function shadow(x,z,w,d,opacity=.32,y=.017){
 face([[x-w/2,y,z+d/2],[x+w/2,y,z+d/2],[x+w/2,y,z-d/2],[x-w/2,y,z-d/2]],mat(50,WHITE,1,0,opacity),[[0,0],[1,0],[1,1],[0,1]]);
}
// Convex prism between matching polygonal ends. Input face order is arbitrary.
function prism(front,back,m){
 const center=V.mul([...front,...back].reduce((a,p)=>V.add(a,p),[0,0,0]),1/(front.length*2));
 function side(p){if(V.dot(V.cross(V.sub(p[1],p[0]),V.sub(p[2],p[0])),V.sub(p[0],center))<0)p.reverse();face(p,m);}
 side([...front]);side([...back]);for(let i=0;i<front.length;i++){const j=(i+1)%front.length;side([front[i],front[j],back[j],back[i]]);}
}
const obstacles=[];
function obstacle(x,z,w,d,yaw=0){
 const p=point([x,0,z]),angle=Math.atan2(tr.s,tr.c)+yaw;
 obstacles.push({x:p[0],z:p[2],hx:w*.5,hz:d*.5,c:Math.cos(angle),s:Math.sin(angle)});
}

