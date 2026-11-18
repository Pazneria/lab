// Original geometry for Soundings. Units are metres. +Y is up.
export const add=(a,b)=>a.map((x,i)=>x+b[i]);
export const sub=(a,b)=>a.map((x,i)=>x-b[i]);
export const mul=(a,k)=>a.map(x=>x*k);
export const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
export const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export const unit=a=>mul(a,1/(Math.hypot(...a)||1));
export const mix=(a,b,t)=>a.map((x,i)=>x+(b[i]-x)*t);
export const clamp=(x,a,b)=>Math.min(Math.max(a,x),b);
export const corners=(a,b,c,d,s,t)=>mix(mix(a,b,s),mix(d,c,s),t);
export const vertex=[],index=[],glassIndex=[],occluders=[],lights=[],collisions=[];
let noCull=false;
export function twoSided(fn){const prev=noCull;noCull=true;try{fn();}finally{noCull=prev;}}
let frame=[[0,0,0],[1,0,0],[0,1,0],[0,0,1]];
function transform(p,w){return [0,1,2].map(k=>frame[0][k]*w+frame[1][k]*p[0]+frame[2][k]*p[1]+frame[3][k]*p[2]);}
export const world=p=>transform(p,1);
export function basis(p,u,v,w,f){const old=frame;frame=[world(p),transform(u,0),transform(v,0),transform(w,0)];try{f();}finally{frame=old;}}
export function at(x,y,z,yaw,f){const c=Math.cos(yaw),s=Math.sin(yaw);basis([x,y,z],[c,0,-s],[0,1,0],[s,0,c],f);}
export function roll(x,y,z,r,f){const c=Math.cos(r),s=Math.sin(r);basis([x,y,z],[c,s,0],[-s,c,0],[0,0,1],f);}
export function tilt(x,y,z,r,f){const c=Math.cos(r),s=Math.sin(r);basis([x,y,z],[1,0,0],[0,c,s],[0,-s,c],f);}
export function material(hex,kind=0){const n=parseInt(hex.replace('#',''),16);return {c:[n>>16,(n>>8)&255,n&255],kind};}
function put(p,n,uv,m){const i=vertex.length;vertex.push({p:world(p),n:unit(transform(n,0)),uv,m,two:noCull});return i;}
function emit(a,b,c,m){(m.kind===15?glassIndex:index).push(a,b,c);}
function block(a,b,c){occluders.push([world(a),world(b),world(c)]);}
function quadBlock(a,b,c,d){block(a,b,c);block(a,c,d);}
export function surface(nu,nv,fun,normal,mat,uvf,cast=false){
 const base=vertex.length;
 for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){
  const s=i/nu,t=j/nv,p=fun(s,t);
  const n=typeof normal==='function'?normal(s,t,p):normal;
  const m=typeof mat==='function'?mat(s,t,p):mat;
  put(p,n,uvf?uvf(s,t,p):[s,t],m);
 }
 const m=typeof mat==='function'?mat(.5,.5,[0,0,0]):mat;
 for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){
  const a=base+j*(nu+1)+i,b=a+1,d=a+nu+1,c=d+1;emit(a,b,c,m);emit(a,c,d,m);
 }
 if(cast){const x=Math.min(8,nu),y=Math.min(8,nv);for(let j=0;j<y;j++)for(let i=0;i<x;i++)
 quadBlock(fun(i/x,j/y),fun((i+1)/x,j/y),fun((i+1)/x,(j+1)/y),fun(i/x,(j+1)/y));}
}
export function quad(a,b,c,d,m,step=.34,cast=true,uvf){
 const w=Math.max(Math.hypot(...sub(b,a)),Math.hypot(...sub(c,d))),h=Math.max(Math.hypot(...sub(d,a)),Math.hypot(...sub(c,b)));
 const n=unit(cross(sub(b,a),sub(d,a)));
 surface(Math.max(1,Math.ceil(w/step)),Math.max(1,Math.ceil(h/step)),(s,t)=>corners(a,b,c,d,s,t),n,m,uvf||((s,t)=>m.kind===2&&h>w?[t*h,s*w]:[s*w,t*h]));
 if(cast)quadBlock(a,b,c,d);
}
export function triangle(a,b,c,m,cast=false){const n=unit(cross(sub(b,a),sub(c,a)));emit(put(a,n,[0,0],m),put(b,n,[1,0],m),put(c,n,[0,1],m),m);if(cast)block(a,b,c);}
const faces=[[[0,0,1],[1,0,1],[1,1,1],[0,1,1]],[[1,0,0],[0,0,0],[0,1,0],[1,1,0]],[[1,0,1],[1,0,0],[1,1,0],[1,1,1]],[[0,0,0],[0,0,1],[0,1,1],[0,1,0]],[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],[[0,0,0],[1,0,0],[1,0,1],[0,0,1]]];
export function box(x,y,z,w,h,d,m,r=0,step=.30,cast=true){
 const cen=[x,y,z],half=[w/2,h/2,d/2];r=Math.min(r,Math.min(...half)*.96);
 const scale=p=>p.map((v,i)=>cen[i]+(v*2-1)*half[i]);
 for(const face of faces){const [a,b,c,e]=face.map(scale);
  if(r<.0002){quad(a,b,c,e,m,step,cast);continue;}
  const A=sub(b,a),B=sub(e,a),U=Math.hypot(...A),V=Math.hypot(...B);
  const axis=size=>{const count=Math.max(1,Math.ceil((size-2*r)/step)),t=r/size,arr=r>.013?[0,t*.52,t]:[0,t];for(let k=1;k<=count;k++)arr.push(t+(1-2*t)*k/count);if(r>.013)arr.push(1-.52*t);arr.push(1);return arr;};
  const us=axis(U),vs=axis(V),base=vertex.length;
  for(const tv of vs)for(const su of us){const p=add(a,add(mul(A,su),mul(B,tv))),q=p.map((v,i)=>clamp(v,cen[i]-half[i]+r,cen[i]+half[i]-r)),n=unit(sub(p,q));const woodUV=m.kind===2?(V>U?[V*tv+y*.23,U*su+x*.31+z*.11]:[U*su+x*.23,V*tv+z*.18+y*.14]):[U*su,V*tv];put(add(q,mul(n,r)),n,woodUV,m);}
  for(let j=0;j<vs.length-1;j++)for(let i=0;i<us.length-1;i++){const l=base+j*us.length+i,t=l+us.length;emit(l,l+1,t+1,m);emit(l,t+1,t,m);}
  if(cast){const inner=p=>p.map((v,i)=>cen[i]+(v-cen[i])*(1-Math.min(.14,r*.17/half[i])));quadBlock(inner(a),inner(b),inner(c),inner(e));}
 }
}
export function rod(a,b,r,m,sides=12,r2=r,cast=false){
 const delta=sub(b,a),axis=unit(delta),len=Math.hypot(...delta);if(len<1e-7)return;
 const u=unit(cross(Math.abs(axis[1])>.9?[1,0,0]:[0,1,0],axis)),v=cross(axis,u);
 const point=(t,h)=>{const angle=t*Math.PI*2,n=add(mul(u,Math.cos(angle)),mul(v,Math.sin(angle)));return add(mix(a,b,h),mul(n,r+(r2-r)*h));};
 const normal=(t)=>unit(add(add(mul(u,Math.cos(t*2*Math.PI)),mul(v,Math.sin(t*2*Math.PI))),mul(axis,(r-r2)/len)));
 surface(sides,Math.max(1,Math.ceil(len/.45)),point,normal,m,(t,h)=>[t*2*Math.PI*r,h*len],cast);
 for(let i=0;i<sides;i++){triangle(a,point((i+1)/sides,0),point(i/sides,0),m);triangle(b,point(i/sides,1),point((i+1)/sides,1),m);}
}
export function path(points,r,m,sides=8){for(let i=1;i<points.length;i++)rod(points[i-1],points[i],r,m,sides);}
export function lathe(x,y,z,profile,m,segments=32){
 for(let k=1;k<profile.length;k++){const [ra,ya]=profile[k-1],[rb,yb]=profile[k];
  const mat=Array.isArray(m)?m[Math.min(k-1,m.length-1)]:m;
  if(Math.max(ra,rb)>.027){const sample=(i,r,h)=>[x+Math.cos(i*Math.PI/4)*r*.96,y+h,z+Math.sin(i*Math.PI/4)*r*.96];for(let i=0;i<8;i++)quadBlock(sample(i,ra,ya),sample(i+1,ra,ya),sample(i+1,rb,yb),sample(i,rb,yb));}
  surface(segments,Math.max(1,Math.ceil(Math.abs(yb-ya)/.23)),(s,t)=>{const a=s*2*Math.PI,r=ra+(rb-ra)*t;return [x+Math.cos(a)*r,y+ya+(yb-ya)*t,z+Math.sin(a)*r];},
   (s)=>unit([Math.cos(s*2*Math.PI)*(yb-ya),ra-rb,Math.sin(s*2*Math.PI)*(yb-ya)]),mat,(s,t)=>[s*2*Math.PI*(ra+rb)/2,ya+(yb-ya)*t]);
 }
}
export function ellipsoid(x,y,z,rx,ry,rz,m,nu=20,nv=12){
 const norm=(s,t)=>{let a=s*2*Math.PI,b=(t-.5)*Math.PI;return [Math.cos(a)*Math.cos(b),Math.sin(b),Math.sin(a)*Math.cos(b)];};
 surface(nu,nv,(s,t)=>{const n=norm(s,t);return [x+rx*n[0],y+ry*n[1],z+rz*n[2]];},(s,t)=>{const n=norm(s,t);return unit([n[0]/rx,n[1]/ry,n[2]/rz]);},m,(s,t)=>[s*rx*Math.PI*2,t*ry*Math.PI]);
}
export const artMat=material('ffffff',12);
export function art(tile,c,u,v,step=.2){
 // u is right and v is up, both at the full printed size.
 const p=(s,t)=>add(c,add(mul(u,s-.5),mul(v,t-.5)));
 const col=tile%4,row=Math.floor(tile/4);
 quad(p(0,0),p(1,0),p(1,1),p(0,1),artMat,step,false,(s,t)=>[(col+.006+s*.988)/4,(row+.006+(1-t)*.988)/4]);
}
export function rectCollision(x,z,w,d,yaw=0){const p=world([x,0,z]),dx=transform([Math.cos(yaw),0,-Math.sin(yaw)],0);collisions.push({x:p[0],z:p[2],w,d,a:Math.atan2(-dx[2],dx[0])});}
export function lamp(p,color,power,range,normal=null,size=.15){lights.push({p:world(p),color,power,range,normal:normal?unit(transform(normal,0)):null,size});}
export function curved(nu,nv,fun,m,uvf,cast=false,flip=false){
 const derivative=(s,t)=>{const ds=sub(fun(Math.min(1,s+.001),t),fun(Math.max(0,s-.001),t)),dt=sub(fun(s,Math.min(1,t+.001)),fun(s,Math.max(0,t-.001)));return cross(ds,dt);};
 const no=(s,t)=>{let n=derivative(s,t);if(dot(n,n)<1e-25)n=derivative(clamp(s,.004,.996),clamp(t,.004,.996));return mul(unit(n),flip?-1:1);};
 surface(nu,nv,fun,no,m,uvf,cast);
}
