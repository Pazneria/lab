'use strict';
/* Small static mesh builder. World units are metres. Y is up. */
const M={plain:0,wood:1,stone:2,lime:3,metal:4,pot:5,leaf:6,linen:7,light:8,glass:9,ink:10,soil:11,paper:12,water:13};
const TAU=Math.PI*2, PI=Math.PI;
const V={
 add:(a,b)=>a.map((x,i)=>x+b[i]), sub:(a,b)=>a.map((x,i)=>x-b[i]),
 mul:(a,s)=>a.map(x=>x*s), dot:(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),
 cross:(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],
 unit:a=>{const l=Math.hypot(...a)||1;return a.map(x=>x/l)}, mix:(a,b,t)=>a.map((x,i)=>x+(b[i]-x)*t)
};
let seed=516090;
function rand(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}
const between=(a,b)=>a+(b-a)*rand(), pick=a=>a[Math.floor(rand()*a.length)];
const rgb=c=>[(c>>16&255)/255,(c>>8&255)/255,(c&255)/255];
function tint(c,f){const a=rgb(c).map(v=>Math.min(255,Math.max(0,Math.round(v*f*255))));return a[0]*65536+a[1]*256+a[2]}
const identity=[[1,0,0],[0,1,0],[0,0,1],[0,0,0]];
let frame=identity;
function direction(f,a){return [0,1,2].map(i=>f[0][i]*a[0]+f[1][i]*a[1]+f[2][i]*a[2])}
function point(f,a){return V.add(direction(f,a),f[3])}
function inFrame(f,fn){const old=frame;frame=[direction(old,f[0]),direction(old,f[1]),direction(old,f[2]),point(old,f[3])];try{fn()}finally{frame=old}}
function group(x,y,z,yaw,fn,pitch=0,roll=0){
 const cy=Math.cos(yaw),sy=Math.sin(yaw),cx=Math.cos(pitch),sx=Math.sin(pitch),cz=Math.cos(roll),sz=Math.sin(roll);
 inFrame([[cy*cz+sy*sx*sz,cx*sz,-sy*cz+cy*sx*sz],[-cy*sz+sy*sx*cz,cx*cz,sy*sz+cy*sx*cz],[sy*cx,-sx,cy*cx],[x,y,z]],fn)
}
const meshBins=new Map(),blocks=[],occluders=[];
let modelVerts=0,uvShift=[0,0];
function meshBin(material,p){
 const mode=material===M.glass||material===M.water?1:0;
 const outer=p[0]<-4.1||p[0]>6.55||p[2]<-5.05||p[2]>5.95,span=outer?11:3;
 const key=mode+':'+span+':'+Math.floor(p[0]/span)+':'+Math.floor(p[2]/span);
 if(!meshBins.has(key))meshBins.set(key,{v:[],mode,min:[1e5,1e5,1e5],max:[-1e5,-1e5,-1e5]});
 return meshBins.get(key)
}
function poly(pts,col,mat,normals=null,uvs=null){
 const p=pts.map(v=>point(frame,v)),bin=meshBin(mat,p[0]);
 const faceNormal=V.unit(V.cross(V.sub(p[1],p[0]),V.sub(p[2],p[0])));
 const ns=normals&&normals.map(n=>V.unit(direction(frame,n)));
 const cc=Array.isArray(col)?col.map(rgb):rgb(col);
 const off=mat===M.ink?[0,0]:uvShift;
 const uv=uvs||pts.map(a=>[a[0]+a[2]*.31,a[1]+a[2]*.89]);
 function vertex(i){
  const a=p[i],n=ns?ns[i]:faceNormal,c=Array.isArray(col)?cc[i]:cc;
  bin.v.push(a[0],a[1],a[2],n[0],n[1],n[2],uv[i][0]+off[0],uv[i][1]+off[1],...c,mat);
  for(let k=0;k<3;k++){if(a[k]<bin.min[k])bin.min[k]=a[k];if(a[k]>bin.max[k])bin.max[k]=a[k]}
 }
 for(let j=1;j+1<pts.length;j++){vertex(0);vertex(j);vertex(j+1);modelVerts+=3}
}
function newUV(){uvShift=[between(0,10),between(0,10)]}
function box(x,y,z,w,h,d,col,mat=M.wood,bevel=.008){
 const e=[w/2,h/2,d/2],o=[x,y,z],b=Math.min(bevel,...e.map(a=>a*.40));
 newUV();
 function face(q,n,ax,ay){
  if(V.dot(V.cross(V.sub(q[1],q[0]),V.sub(q[2],q[0])),n)<0)q.reverse();
  poly(q.map(a=>V.add(o,a)),col,mat,null,q.map(a=>[a[ax],a[ay]]))
 }
 for(let axis=0;axis<3;axis++){
  let u=(axis+1)%3,v=(axis+2)%3;
  if(e[u]<e[v])[u,v]=[v,u];
  for(const s of [-1,1]){
   const q=[[-1,-1],[1,-1],[1,1],[-1,1]].map(pair=>{let a=[0,0,0];a[axis]=s*e[axis];a[u]=pair[0]*(e[u]-b);a[v]=pair[1]*(e[v]-b);return a});
   const n=[0,0,0];n[axis]=s;face(q,n,u,v)
  }
 }
 if(b<=0)return;
 for(let a=0;a<3;a++){
  const u=(a+1)%3,v=(a+2)%3;
  for(const su of [-1,1])for(const sv of [-1,1]){
   const q=[[-1,0],[1,0],[1,1],[-1,1]].map(([side,t])=>{const p=[0,0,0];p[a]=side*(e[a]-b);p[u]=su*(e[u]-b*t);p[v]=sv*(e[v]-b*(1-t));return p});
   const n=[0,0,0];n[u]=su;n[v]=sv;face(q,n,a,v)
  }
 }
 for(const i of [-1,1])for(const j of [-1,1])for(const k of [-1,1]){
  const s=[i,j,k],q=[0,1,2].map(a=>s.map((v,l)=>v*(e[l]-(a===l?0:b))));face(q,s,0,2)
 }
}
function profile(x,y,z,rings,col,mat=M.pot,sides=24,opt={}){
 newUV();const turn=opt.turn||0;
 const pts=rings.map(([r,h])=>Array.from({length:sides},(_,i)=>[x+r*Math.cos(turn+TAU*i/sides),y+h,z+r*Math.sin(turn+TAU*i/sides)]));
 const normal=(j,i,delta)=>{const k=Math.max(0,Math.min(rings.length-2,j+delta));const dh=rings[k+1][1]-rings[k][1],dr=rings[k+1][0]-rings[k][0];return V.unit([dh*Math.cos(turn+TAU*i/sides),-dr,dh*Math.sin(turn+TAU*i/sides)])};
 for(let j=0;j<rings.length-1;j++){
  const colJ=opt.colors?opt.colors[j]??col:col;
  for(let i=0;i<sides;i++){
   const k=(i+1)%sides;
   const n=normal(j,i,0),nk=normal(j,k,0);
   const coord=l=>TAU*(rings[j][0]+rings[j+1][0])*.5*l/sides;
   poly([pts[j][i],pts[j+1][i],pts[j+1][k],pts[j][k]],colJ,mat,opt.flat?null:[n,n,nk,nk],[[coord(i),rings[j][1]],[coord(i),rings[j+1][1]],[coord(i+1),rings[j+1][1]],[coord(i+1),rings[j][1]]])
  }
 }
 if(opt.cap!==false)for(const j of [0,rings.length-1]){
  if(rings[j][0]<.0002)continue;const p=j===0?pts[j]:pts[j].slice().reverse();
  poly(p,col,mat,null,p.map(a=>[a[0]-x,a[2]-z]))
 }
}
function rod(a,b,ra,rb,col,mat=M.wood,sides=10){
 const delta=V.sub(b,a),len=Math.hypot(...delta);if(len<.0001)return;
 const up=V.mul(delta,1/len),xx=V.unit(V.cross(up,Math.abs(up[2])<.9?[0,0,1]:[1,0,0]));
 inFrame([xx,up,V.cross(xx,up),a],()=>profile(0,0,0,[[ra,0],[rb,len]],col,mat,sides,{cap:true}))
}
function beam(a,b,w,d,col,mat=M.wood,bevel=.012){
 const delta=V.sub(b,a),len=Math.hypot(...delta),up=V.unit(delta),xx=V.unit(V.cross(up,Math.abs(up[2])<.9?[0,0,1]:[1,0,0]));
 inFrame([xx,up,V.cross(xx,up),V.mix(a,b,.5)],()=>box(0,0,0,w,len,d,col,mat,bevel))
}
function ball(x,y,z,rx,ry,rz,col,mat=M.pot,lon=16,lat=10){
 const p=(i,j)=>{const u=TAU*i/lon,v=PI*(j/lat-.5);return [Math.cos(v)*Math.cos(u),Math.sin(v),Math.cos(v)*Math.sin(u)]};
 newUV();
 for(let j=0;j<lat;j++)for(let i=0;i<lon;i++){
  const ns=[p(i,j),p(i,j+1),p(i+1,j+1),p(i+1,j)];
  const a=ns.map(n=>[x+rx*n[0],y+ry*n[1],z+rz*n[2]]),n=ns.map(a=>V.unit([a[0]/rx,a[1]/ry,a[2]/rz]));
  let ix=j===0?[0,1,2]:j===lat-1?[0,1,3]:[0,1,2,3];
  poly(ix.map(k=>a[k]),col,mat,ix.map(k=>n[k]),ix.map(k=>[(i+(k>=2?1:0))*TAU*rx/lon,(j+(k===1||k===2?1:0))*PI*ry/lat]))
 }
}
function pathTube(points,r,col,mat=M.metal,sides=8,closed=false){
 if(points.length<2)return;
 const rings=points.map((p,i)=>{
  const prev=points[i-1]||(closed?points.at(-1):points[0]),next=points[i+1]||(closed?points[0]:points.at(-1));
  const t=V.unit(V.sub(next,prev));let ref=Math.abs(t[2])<.94?[0,0,1]:[0,1,0];
  const n=V.unit(V.cross(t,ref)),b=V.cross(t,n);
  return Array.from({length:sides},(_,j)=>{const v=V.add(V.mul(n,Math.cos(TAU*j/sides)),V.mul(b,Math.sin(TAU*j/sides)));return [V.add(p,V.mul(v,r)),v]})
 });
 for(let i=0;i<points.length-(closed?0:1);i++)for(let j=0;j<sides;j++){
  const a=rings[i],b=rings[(i+1)%rings.length],k=(j+1)%sides,seq=[a[j],a[k],b[k],b[j]];
  poly(seq.map(e=>e[0]),col,mat,seq.map(e=>e[1]))
 }
}
function hoop(x,y,z,r,t,col,mat=M.metal,sides=30){pathTube(Array.from({length:sides},(_,i)=>[x+r*Math.cos(TAU*i/sides),y,z+r*Math.sin(TAU*i/sides)]),t,col,mat,6,true)}
function footprint(x,z,w,d){const p=[[x-w/2,0,z-d/2],[x+w/2,0,z-d/2],[x+w/2,0,z+d/2],[x-w/2,0,z+d/2]].map(v=>point(frame,v));return [Math.min(...p.map(a=>a[0])),Math.min(...p.map(a=>a[2])),Math.max(...p.map(a=>a[0])),Math.max(...p.map(a=>a[2]))]}
function solid(x,z,w,d){blocks.push(footprint(x,z,w,d))}
function ao(x,y,z,w,h,d,strength=.56){const b=footprint(x,z,w,d),p=point(frame,[x,y,z]);occluders.push([b[0],p[1]-h/2,b[1],b[2],p[1]+h/2,b[3],strength])}
function baseMass(x,y,z,w,h,d,strength=.56){solid(x,z,w,d);ao(x,y,z,w,h,d,strength)}
function panel(x,y,z,w,h,cell){const c=cell%4,r=Math.floor(cell/4),l=(c+.008)/4,t=1-(r+.008)/8,s=(c+.992)/4,b=1-(r+.992)/8;
 poly([[x-w/2,y-h/2,z],[x+w/2,y-h/2,z],[x+w/2,y+h/2,z],[x-w/2,y+h/2,z]],0xffffff,M.ink,null,[[l,b],[s,b],[s,t],[l,t]])}
