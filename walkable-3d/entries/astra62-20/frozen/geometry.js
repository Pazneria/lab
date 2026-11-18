import * as T from './package/build/three.module.min.js';
import {materials,cards,rand} from './materials.js';
const buckets=new Map(), colourCache=new Map();
const ident=new T.Matrix4(), pos=new T.Vector3(), norm=new T.Vector3();
let matrix=ident, normalM=new T.Matrix3().getNormalMatrix(ident), region='body';
export const pi=Math.PI, tau=pi*2;
export function zone(s){region=s}
function transform(m,fn){const a=matrix,n=normalM;matrix=new T.Matrix4().multiplyMatrices(a,m);normalM=new T.Matrix3().getNormalMatrix(matrix);try{fn()}finally{matrix=a;normalM=n}}
export function place(x,y,z,fn,rx=0,ry=0,rz=0,sx=1,sy=1,sz=1){
  const q=new T.Quaternion().setFromEuler(new T.Euler(rx,ry,rz,'YXZ'));
  transform(new T.Matrix4().compose(new T.Vector3(x,y,z),q,new T.Vector3(sx,sy,sz)),fn);
}
function bucket(k){let id=region+'_'+k,b=buckets.get(id);if(!b){if(!materials[k])throw new Error('Unknown material '+k);b={pos:[],nor:[],uv:[],col:[],idx:[],k,id};buckets.set(id,b)}return b}
function colour(x){if(!colourCache.has(x))colourCache.set(x,new T.Color(x));return colourCache.get(x)}
function cross(a,b,c){const x=b[0]-a[0],y=b[1]-a[1],z=b[2]-a[2],u=c[0]-a[0],v=c[1]-a[1],w=c[2]-a[2];return [y*w-z*v,z*u-x*w,x*v-y*u]}
export function face(v,col,mat='matte',uv=null,ns=null,shade=1){
  if(v.length<3)return;
  const b=bucket(mat),start=b.pos.length/3,c=colour(col),n=ns?null:cross(v[0],v[1],v[2]);
  for(let i=0;i<v.length;i++){
    pos.fromArray(v[i]).applyMatrix4(matrix);b.pos.push(pos.x,pos.y,pos.z);
    norm.fromArray(ns?ns[i]:n).applyMatrix3(normalM).normalize();b.nor.push(norm.x,norm.y,norm.z);
    b.uv.push(...(uv?.[i]||[v[i][0],v[i][1]]));b.col.push(c.r*shade,c.g*shade,c.b*shade);
  }
  for(let i=1;i<v.length-1;i++)b.idx.push(start,start+i,start+i+1);
}
export function box(x,y,z,dx,dy,dz,col,mat='wood',bevel=null){
  const h=[dx/2,dy/2,dz/2],cn=[x,y,z],r=Math.max(0,Math.min(bevel??.009,...h.map(v=>v*.27))),u=rand()*3.6,v=rand()*2.9;
  const longest=[0,1,2].sort((a,b)=>h[b]-h[a]);
  const scale=mat==='cloth'?4:mat==='leather'?2.8:mat==='wood'||mat==='paint'?1.05:1.5;
  function side(p,n,shade=1){
    const nn=cross(p[0],p[1],p[2]);if(nn[0]*n[0]+nn[1]*n[1]+nn[2]*n[2]<0)p.reverse();
    const ax=[0,1,2].sort((a,b)=>Math.abs(n[b])-Math.abs(n[a]))[0],uvax=longest.filter(i=>i!==ax);
    const uv=p.map(q=>[u+q[uvax[0]]*scale,v+q[uvax[1]]*scale*(mat==='wood'||mat==='paint'?2:1)]);
    face(p.map(q=>q.map((val,i)=>val+cn[i])),col,mat,uv,null,shade);
  }
  for(let a=0;a<3;a++){
    const b=(a+1)%3,c=(a+2)%3;
    for(const s of [-1,1]){
      const n=[0,0,0];n[a]=s;
      const p=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([j,k])=>{const q=[0,0,0];q[a]=s*h[a];q[b]=j*(h[b]-r);q[c]=k*(h[c]-r);return q});
      side(p,n);
    }
    if(!r)continue;
    for(const j of [-1,1])for(const k of [-1,1]){
      const n=[0,0,0];n[b]=j;n[c]=k;
      const p=[[-1,0],[1,0],[1,1],[-1,1]].map(([s,t])=>{const q=[0,0,0];q[a]=s*(h[a]-r);q[b]=j*(h[b]-(t?r:0));q[c]=k*(h[c]-(t?0:r));return q});
      side(p,n,1.014);
    }
  }
  if(r)for(const i of [-1,1])for(const j of [-1,1])for(const k of [-1,1]){
    const n=[i,j,k],p=[0,1,2].map(a=>n.map((s,b)=>s*(h[b]-(a===b?0:r))));side(p,n);
  }
}
export function lathe(x,y,z,profile,col,mat='wood',segs=20,cap=true){
  for(let k=0;k<profile.length-1;k++){
    const [r0,h0]=profile[k],[r1,h1]=profile[k+1],dr=r1-r0,dh=h1-h0;
    for(let i=0;i<segs;i++){
      const a=i*tau/segs,b=(i+1)*tau/segs,cs=Math.cos(a),sn=Math.sin(a),ct=Math.cos(b),st=Math.sin(b);
      const na=[dh*cs,-dr,dh*sn],nb=[dh*ct,-dr,dh*st];
      face([[x+r0*cs,y+h0,z+r0*sn],[x+r1*cs,y+h1,z+r1*sn],[x+r1*ct,y+h1,z+r1*st],[x+r0*ct,y+h0,z+r0*st]],col,mat,[[a*r0*3,h0*3],[a*r1*3,h1*3],[b*r1*3,h1*3],[b*r0*3,h0*3]],[na,na,nb,nb]);
    }
  }
  if(cap)for(const k of [0,profile.length-1]){
    const [r,h]=profile[k];if(r<=0)continue;const p=Array.from({length:segs},(_,i)=>{const a=(k?-1:1)*i*tau/segs;return [x+r*Math.cos(a),y+h,z+r*Math.sin(a)]});face(p,col,mat,p.map(q=>[q[0]*3,q[2]*3]));
  }
}
export function cylinder(x,y,z,r,h,col,mat='wood',segs=18,r2=r){lathe(x,y-h/2,z,[[r,0],[r2,h]],col,mat,segs)}
export function ellipsoid(x,y,z,rx,ry,rz,col,mat='matte',seg=18,bands=10){
  const P=(a,b)=>[x+rx*Math.cos(b)*Math.cos(a),y+ry*Math.sin(b),z+rz*Math.cos(b)*Math.sin(a)];
  const N=(a,b)=>[Math.cos(b)*Math.cos(a)/rx,Math.sin(b)/ry,Math.cos(b)*Math.sin(a)/rz];
  for(let j=0;j<bands;j++)for(let i=0;i<seg;i++){
    const a=i*tau/seg,b=(i+1)*tau/seg,l=j*pi/bands-pi/2,m=(j+1)*pi/bands-pi/2,par=[[a,l],[a,m],[b,m],[b,l]];
    face(par.map(q=>P(...q)),col,mat,par.map(([u,v])=>[u*rx*3,v*ry*3]),par.map(q=>N(...q)));
  }
}
const up=new T.Vector3(0,1,0);
function between(a,b,fn){const q=new T.Vector3(...a),v=new T.Vector3(...b).sub(q),d=v.length();if(d<.00001)return;
  transform(new T.Matrix4().compose(q,new T.Quaternion().setFromUnitVectors(up,v.normalize()),new T.Vector3(1,1,1)),()=>fn(d))}
export function rod(a,b,r,col,mat='metal',r2=r,segs=10){between(a,b,d=>lathe(0,0,0,[[r,0],[r2,d]],col,mat,segs))}
export function beam(a,b,w,d,col,mat='wood',bev=.006){between(a,b,l=>box(0,l/2,0,w,l,d,col,mat,bev))}
export function torus(x,y,z,r,t,col,mat='metal',seg=32,tubes=7,from=0,to=tau){
  for(let i=0;i<seg;i++)for(let j=0;j<tubes;j++){
    const a=from+(to-from)*i/seg,b=from+(to-from)*(i+1)/seg,s=tau*j/tubes,v=tau*(j+1)/tubes;
    const prm=[[a,s],[b,s],[b,v],[a,v]];
    face(prm.map(([k,p])=>[x+(r+t*Math.cos(p))*Math.cos(k),y+(r+t*Math.cos(p))*Math.sin(k),z+t*Math.sin(p)]),col,mat,prm.map(([k,p])=>[k*r,p*t]),prm.map(([k,p])=>[Math.cos(p)*Math.cos(k),Math.cos(p)*Math.sin(k),Math.sin(p)]));
  }
}
export function path(points,r,col,mat='metal',res=14,sides=6){
  const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),g=new T.TubeGeometry(curve,res,r,sides,false);
  const b=bucket(mat),c=colour(col),start=b.pos.length/3,p=g.attributes.position,n=g.attributes.normal,uv=g.attributes.uv;
  for(let i=0;i<p.count;i++){pos.fromBufferAttribute(p,i).applyMatrix4(matrix);norm.fromBufferAttribute(n,i).applyMatrix3(normalM).normalize();b.pos.push(pos.x,pos.y,pos.z);b.nor.push(norm.x,norm.y,norm.z);b.col.push(c.r,c.g,c.b);b.uv.push(uv.getX(i)*2,uv.getY(i))}
  for(const i of g.index.array)b.idx.push(start+i);g.dispose();
}
export function grid(nx,ny,point,color,mat='cloth',texScale=[1,1],flip=false){
  for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){
    const s=i/nx,t=j/ny,u=(i+1)/nx,v=(j+1)/ny;const uv=[[s,t],[u,t],[u,v],[s,v]];if(flip)uv.reverse();
    face(uv.map(([a,b])=>point(a,b)),typeof color==='function'?color(i,j):color,mat,uv.map(([a,b])=>[a*texScale[0],b*texScale[1]]));
  }
}
export function print(key,x,y,z,w,h,ry=0,rx=0,rz=0,col='#ffffff'){
  const c=cards[key];if(!c)throw Error('Missing art '+key);
  place(x,y,z,()=>face([[-w/2,-h/2,0],[w/2,-h/2,0],[w/2,h/2,0],[-w/2,h/2,0]],col,c.mat,[[c.u0,c.v0],[c.u1,c.v0],[c.u1,c.v1],[c.u0,c.v1]]),rx,ry,rz);
}
export function finish(scene){
  let triangles=0,vertices=0;
  for(const b of buckets.values()){
    const g=new T.BufferGeometry();
    for(const [key,data,size] of [['position',b.pos,3],['normal',b.nor,3],['color',b.col,3],['uv',b.uv,2]])g.setAttribute(key,new T.Float32BufferAttribute(data,size));
    g.setIndex(b.idx);g.computeBoundingSphere();g.computeBoundingBox();
    if(!Number.isFinite(g.boundingSphere.radius))throw Error('Invalid geometry '+b.id);
    const m=new T.Mesh(g,materials[b.k]);m.name=b.id;
    m.castShadow=!['glass','lamp'].includes(b.k)&&!b.k.startsWith('art')&&!b.id.startsWith('terrain_');
    m.receiveShadow=b.k!=='glass';m.matrixAutoUpdate=false;scene.add(m);
    triangles+=b.idx.length/3;vertices+=b.pos.length/3;
  }
  const batches=buckets.size;buckets.clear();return {batches,triangles,vertices};
}