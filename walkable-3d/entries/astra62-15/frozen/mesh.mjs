export const T={plain:0,wood:1,plaster:2,linen:3,wool:4,metal:5,paper:6,leather:7,paint:8,stone:9,china:10,rug:11,quilt:12,map:13,moths:14,portrait:15,glass:16,stripe:17,logbook:18,letter:19,flag:20,runner:21,station:22,chart:23,selvedge:24,glow:25,clock:26,boxlabel:27,frieze:28}
export const pos=[],norm=[],uv=[],rgb=[],mat=[],indices=[],shadow=[],colliders=[],lights=[]
export const PI=Math.PI,TAU=PI*2,add=(a,b)=>a.map((v,i)=>v+b[i]),sub=(a,b)=>a.map((v,i)=>v-b[i]),mul=(a,k)=>a.map(v=>v*k)
export const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],unit=a=>mul(a,1/(Math.hypot(...a)||1))
let seed=178451
export function rnd(a=0,b=1){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return a+(b-a)*seed/4294967296}
export function color(c){if(Array.isArray(c))return c;let n=parseInt(c.replace('#',''),16);return [n>>16,(n>>8)&255,n&255]}
export const tint=(c,k)=>color(c).map(x=>Math.max(0,Math.min(255,x*k)))
let M=[1,0,0,0,1,0,0,0,1,0,0,0],casts=true
const dir=p=>[M[0]*p[0]+M[3]*p[1]+M[6]*p[2],M[1]*p[0]+M[4]*p[1]+M[7]*p[2],M[2]*p[0]+M[5]*p[1]+M[8]*p[2]],world=p=>add(dir(p),M.slice(9))
export function group(at,rot,fn){const [x,y,z]=rot,cx=Math.cos(x),sx=Math.sin(x),cy=Math.cos(y),sy=Math.sin(y),cz=Math.cos(z),sz=Math.sin(z)
 const prev=M;M=[...dir([cy*cz+sy*sx*sz,cx*sz,-sy*cz+cy*sx*sz]),...dir([-cy*sz+sy*sx*cz,cx*cz,sy*sz+cy*sx*cz]),...dir([sy*cx,-sx,cy*cx]),...world(at)];fn();M=prev}
export function noShadow(fn){const prev=casts;casts=false;fn();casts=prev}
function vertex(p,n,st,c,t){const i=mat.length;pos.push(...world(p));norm.push(...unit(dir(n)));uv.push(...st);rgb.push(...color(c));mat.push(t);return i}
function tri(a,b,c){indices.push(a,b,c);if(casts)shadow.push(a,b,c)}
export function grid(nu,nv,fn,c,t=T.plain,opts={}){
 const start=mat.length,ps=[],cs=[],us=[]
 for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){const u=i/nu,v=j/nv,q=fn(u,v);ps.push(q.p||q);cs.push(q.c||c);us.push(q.uv||(opts.uv?opts.uv(u,v):[u,v]))}
 for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){const k=j*(nu+1)+i,du=sub(ps[k+(i<nu?1:0)],ps[k-(i>0?1:0)]),dv=sub(ps[k+(j<nv?nu+1:0)],ps[k-(j>0?nu+1:0)]);vertex(ps[k],mul(cross(du,dv),opts.flip?-1:1),us[k],cs[k],t)}
 for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){const a=start+j*(nu+1)+i,b=a+1,d=a+nu+1,e=d+1;if(opts.flip){tri(a,d,e);tri(a,e,b)}else{tri(a,b,e);tri(a,e,d)}}
}
export function box(x,y,z,w,h,d,c,t=T.wood,b=.01,detail=0){
 const center=[x,y,z],half=[w/2,h/2,d/2],bevel=Math.min(b,w*.23,h*.23,d*.23),off=rnd(0,3),off2=rnd(0,3)
 for(const [ax,ua,va,sgn] of [[0,1,2,1],[0,2,1,-1],[1,2,0,1],[1,0,2,-1],[2,0,1,1],[2,1,0,-1]]){
  function cuts(a){const hh=half[a],r=[-hh];if(bevel)r.push(-hh+bevel);if(detail){const n=Math.ceil(2*hh/detail);for(let i=1;i<n;i++)r.push(-hh+2*hh*i/n)}if(bevel)r.push(hh-bevel);r.push(hh);return r.sort((a,b)=>a-b)}
  const U=cuts(ua),V=cuts(va),base=mat.length
  for(const v of V)for(const u of U){const p=[0,0,0];p[ax]=sgn*half[ax];p[ua]=u;p[va]=v
   const ins=p.map((a,i)=>Math.max(-half[i]+bevel,Math.min(half[i]-bevel,a))),n=[0,0,0];n[ax]=sgn
   const N=bevel?unit(sub(p,ins)):n,P=bevel?add(ins,mul(N,bevel)):p
   let s=half[ua]>half[va]?u:v,tt=half[ua]>half[va]?v:u
   const sc=t===T.wood||t===T.paint?[.85,2.6]:t===T.plaster?[.74,.74]:[2,2]
   vertex(add(P,center),N,[s*sc[0]+off,tt*sc[1]+off2],c,t)}
  for(let j=0;j<V.length-1;j++)for(let i=0;i<U.length-1;i++){const a=base+j*U.length+i;tri(a,a+1,a+1+U.length);tri(a,a+1+U.length,a+U.length)}
 }
}
export function ell(x,y,z,rx,ry,rz,c,t=T.plain,segs=20,rings=12){
 const base=mat.length;for(let j=0;j<=rings;j++)for(let i=0;i<=segs;i++){const ph=PI*j/rings,th=TAU*i/segs,a=Math.sin(ph)*Math.cos(th),b=Math.cos(ph),d=Math.sin(ph)*Math.sin(th);vertex([x+rx*a,y+ry*b,z+rz*d],[a/rx,b/ry,d/rz],[2*i/segs,j/rings],c,t)}
 for(let j=0;j<rings;j++)for(let i=0;i<segs;i++){const a=base+j*(segs+1)+i,e=a+segs+1;if(j<rings-1)tri(a,e+1,e);if(j>0)tri(a,a+1,e+1)}
}
export function lathe(x,y,z,profile,c,t=T.plain,segs=24){
 let prev=null;for(let j=0;j<profile.length;j++){const [r,yy]=profile[j],p0=profile[Math.max(0,j-1)],p1=profile[Math.min(profile.length-1,j+1)],row=[]
  for(let i=0;i<=segs;i++){const a=TAU*i/segs,co=Math.cos(a),si=Math.sin(a);row.push(vertex([x+r*co,y+yy,z+r*si],[(p1[1]-p0[1])*co,p0[0]-p1[0],(p1[1]-p0[1])*si],[i/segs,yy*3],profile[j][2]||c,t))}
  if(prev)for(let i=0;i<segs;i++){tri(prev[i],row[i],row[i+1]);tri(prev[i],row[i+1],prev[i+1])}prev=row}
}
export function pipe(points,r,c,t=T.plain,n=8,closed=false){const P=closed?[...points,points[0]]:points,base=mat.length;let last=null,dist=0
 for(let j=0;j<P.length;j++){if(j)dist+=Math.hypot(...sub(P[j],P[j-1]));const tan=unit(sub(P[Math.min(j+1,P.length-1)],P[Math.max(0,j-1)]))
  let ax=last?unit(sub(last,mul(tan,dot(last,tan)))):unit(cross(tan,Math.abs(tan[1])<.8?[0,1,0]:[1,0,0]));if(Math.hypot(...ax)<.01)ax=unit(cross(tan,[0,0,1]));last=ax
  const ay=cross(tan,ax),rr=Array.isArray(r)?r[j%r.length]:r;for(let i=0;i<=n;i++){const a=TAU*i/n,N=add(mul(ax,Math.cos(a)),mul(ay,Math.sin(a)));vertex(add(P[j],mul(N,rr)),N,[dist*2,i/n],c,t)}}
 for(let j=0;j<P.length-1;j++)for(let i=0;i<n;i++){const a=base+j*(n+1)+i,e=a+n+1;tri(a,a+1,e+1);tri(a,e+1,e)}
}
export const rod=(a,b,r,c,t=T.metal,n=10)=>pipe([a,b],r,c,t,n)
export function loop(x,y,z,rx,ry,rz,r,c,plane='xy',t=T.metal,n=28){const pts=[];for(let i=0;i<n;i++){const a=TAU*i/n;pts.push(plane==='xy'?[x+rx*Math.cos(a),y+ry*Math.sin(a),z]:plane==='yz'?[x,y+ry*Math.sin(a),z+rz*Math.cos(a)]:[x+rx*Math.cos(a),y,z+rz*Math.sin(a)])}pipe(pts,r,c,t,7,true)}
export function decal(x,y,z,w,h,t,c='#ffffff',nx=1,ny=1){noShadow(()=>grid(nx,ny,(u,v)=>[x+(u-.5)*w,y+(.5-v)*h,z],c,t,{flip:true}))}
export function onTop(x,y,z,w,d,t,c='#ffffff',rot=0){group([x,y,z],[-PI/2,rot,0],()=>decal(0,0,0,w,d,t,c))}
export function collide(x,z,w,d){const pts=[];for(const a of [-1,1])for(const b of [-1,1])pts.push(world([x+a*w/2,0,z+b*d/2]));colliders.push([Math.min(...pts.map(p=>p[0])),Math.min(...pts.map(p=>p[2])),Math.max(...pts.map(p=>p[0])),Math.max(...pts.map(p=>p[2]))].map(v=>+v.toFixed(4)))}
export function lampLight(p,c,power){lights.push({p:world(p),c:color(c).map(v=>v/255),power})}
export function plank(a,b,width,depth,c,t=T.wood){const diff=sub(b,a),len=Math.hypot(...diff),mid=mul(add(a,b),.5);group(mid,[Math.acos(diff[1]/len),Math.atan2(diff[0],diff[2]),0],()=>box(0,0,0,width,len,depth,c,t,.006))}
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v))
