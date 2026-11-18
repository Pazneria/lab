export const M = Object.freeze({PAINT:0, METAL:1, RUBBER:2, LINEN:3, WOOD:4, DECK:5, CERAMIC:6, PAPER:7, LAMP:8, STONE:9, LIFE:10, GLASS:11, PRINT:12, WATER:13, FISH:14, CARPET:15, BRASS:16, JAR:17, DARKGLASS:18, QUILT:19});
export const groups = new Map();
export const occluders = [], collisions = [], lights = [];
export let region = 'living';
export function zone(name) { region=name; }
const PI = Math.PI;
export const add=(a,b)=>a.map((v,i)=>v+b[i]), sub=(a,b)=>a.map((v,i)=>v-b[i]), mul=(a,s)=>a.map(v=>v*s);
export const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
export const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export const unit=a=>mul(a,1/(Math.hypot(...a)||1));
export const mix=(a,b,t)=>a+(b-a)*t;
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const TAU=PI*2;
let randomSeed=7102026;
export function rand(){randomSeed=(Math.imul(randomSeed,1664525)+1013904223)>>>0;return randomSeed/4294967296;}
export const range=(a,b)=>mix(a,b,rand());
export function rgb(c){if(Array.isArray(c))return c;let n=parseInt(c.replace('#',''),16);return [n>>16,(n>>8)&255,n&255];}
export function tint(c,s){return rgb(c).map(n=>Math.round(clamp(n*s,0,255)));}
const identity={o:[0,0,0],a:[1,0,0],b:[0,1,0],c:[0,0,1]};
let tr=identity;
function vector(t,p){return [0,1,2].map(i=>t.a[i]*p[0]+t.b[i]*p[1]+t.c[i]*p[2]);}
export const world=p=>add(tr.o,vector(tr,p));
export const direction=n=>unit(vector(tr,n));
function inBasis(p,a,b,c,fn){
  let prior=tr;tr={o:world(p),a:vector(tr,a),b:vector(tr,b),c:vector(tr,c)};
  try{fn();}finally{tr=prior;}
}
export function place(p,angles,fn){
  let [x,y,z]=typeof angles==='number'?[0,angles,0]:angles;
  const rotate=([i,j,k])=>{
    const a=i*Math.cos(z)-j*Math.sin(z),b=i*Math.sin(z)+j*Math.cos(z);
    const d=b*Math.cos(x)-k*Math.sin(x),e=b*Math.sin(x)+k*Math.cos(x);
    return [a*Math.cos(y)+e*Math.sin(y),d,-a*Math.sin(y)+e*Math.cos(y)];
  };
  inBasis(p,rotate([1,0,0]),rotate([0,1,0]),rotate([0,0,1]),fn);
}
function group(mat) {
  const key=region+(mat===M.GLASS||mat===M.JAR?'_glass':'');
  if(!groups.has(key))groups.set(key,{key,vertices:[],indices:[]});
  return groups.get(key);
}
function vertex(g,p,n,uv,c,m,detail){
  let i=g.vertices.length;
  g.vertices.push({p:world(p),n:direction(n),uv,c,m,d:detail});
  return i;
}
function tri(g,a,b,c){
 const v=g.vertices;let ab=sub(v[b].p,v[a].p),ac=sub(v[c].p,v[a].p);
 const fn=cross(ab,ac);if(dot(fn,fn)<1e-18)return;
 if(dot(fn,add(add(v[a].n,v[b].n),v[c].n))<0)g.indices.push(a,c,b);
 else g.indices.push(a,b,c);
}
// Each grid owns its seams, so the angle, UVs and painted edges can differ by face.
export function surface(nu,nv,evaluate,col,mat,detail=0) {
  nu=Math.max(1,Math.ceil(nu));nv=Math.max(1,Math.ceil(nv));
  const g=group(mat),base=g.vertices.length,c=rgb(col);
  for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){
    const [p,n,uv,shade,d]=evaluate(i/nu,j/nv);
    vertex(g,p,n,uv||[i/nu,j/nv],shade?rgb(shade):c,mat,d??detail);
  }
  for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){
    let a=base+j*(nu+1)+i,b=a+1,c=a+nu+1,d=c+1;tri(g,a,b,d);tri(g,a,d,c);
  }
}
export function patch(nu,nv,fn,col,mat,uvFn,reverse=false){
 const de=.00025;
 surface(nu,nv,(u,v)=>{
  const p=fn(u,v),du=sub(fn(clamp(u+de),v),fn(clamp(u-de),v)),dv=sub(fn(u,clamp(v+de)),fn(u,clamp(v-de)));
  let n=unit(cross(du,dv));if(reverse)n=mul(n,-1);
  return [p,n,uvFn?uvFn(u,v):[u,v]];
 },col,mat);
}
export function face(points,col,mat,n=unit(cross(sub(points[1],points[0]),sub(points[2],points[0])))){
 const g=group(mat),first=g.vertices.length,c=rgb(col);
 points.forEach(p=>vertex(g,p,n,Math.abs(n[1])>.6?[p[0],p[2]]:Math.abs(n[0])>.6?[p[2],p[1]]:[p[0],p[1]],c,mat,0));
 for(let i=1;i+1<points.length;i++)tri(g,first,first+i,first+i+1);
}
export function plane(p,u,v,col,mat,step=.30,detail=0,normal=null){
 let n=normal||unit(cross(u,v)),w=Math.hypot(...u),h=Math.hypot(...v);
 surface(w/step,h/step,(s,t)=>[add(p,add(mul(u,s-.5),mul(v,t-.5))),n,mat===M.PRINT?[s,1-t]:[s*w,t*h]],col,mat,detail);
}
export function art(id,p,u,v,level=255){
 plane(p,u,v,[level,level,level],M.PRINT,.26,id);
}
function splitAxis(s,r,step){
 let a=[-s/2];if(r>0)a.push(-s/2+r);
 const span=s-2*r, n=Math.max(1,Math.ceil(span/step));
 for(let i=1;i<=n;i++)a.push(-s/2+r+span*i/n);
 if(r>0)a.push(s/2);return a;
}
export function box(p,sz,col,mat=M.PAINT,r=0,step=.31){
 r=Math.min(r,...sz.map(v=>v*.46));
 const axes=sz.map(s=>splitAxis(s,r,step));
 for(let axis=0;axis<3;axis++)for(let side of [-1,1]){
  let s=(axis+1)%3,t=(axis+2)%3,us=axes[s],vs=axes[t],half=sz.map(v=>v/2);
  surface(us.length-1,vs.length-1,(u,v)=>{
   let q=[0,0,0];q[axis]=side*half[axis];q[s]=us[Math.round(u*(us.length-1))];q[t]=vs[Math.round(v*(vs.length-1))];
   let n=[0,0,0];n[axis]=side;
   let wear=0;
   if(r>0){let inner=q.map((x,i)=>clamp(x,-half[i]+r,half[i]-r));n=unit(sub(q,inner));q=add(inner,mul(n,r));wear=Math.round(230*clamp((1-Math.abs(n[axis]))*3.0));}
   // Grain runs along the longest direction of the face.
   let uv=sz[s]>=sz[t]?[q[s],q[t]]:[q[t],q[s]];
   return [add(p,q),n,uv,null,wear];
  },col,mat);
 }
}
export function ellipsoid(p,s,col,mat=M.CERAMIC,nu=22,nv=12){
 surface(nu,nv,(u,v)=>{
  let a=u*TAU,b=(v-.5)*PI,rad=[Math.cos(a)*Math.cos(b),Math.sin(b),Math.sin(a)*Math.cos(b)];
  return [p.map((x,i)=>x+s[i]*rad[i]),unit(rad.map((x,i)=>x/s[i])),[u*TAU*(s[0]+s[2])*.5,v*PI*s[1]]];
 },col,mat);
}
export function rod(a,b,r,col,mat=M.METAL,sides=12,r2=r,cap=true){
 const d=sub(b,a),len=Math.hypot(...d);if(len<.00001)return;
 const up=mul(d,1/len),ax=unit(cross(Math.abs(up[1])>.88?[0,0,1]:[0,1,0],up)),az=unit(cross(ax,up));
 const loop=(angle)=>add(mul(ax,Math.cos(angle)),mul(az,Math.sin(angle)));
 surface(sides,Math.max(1,Math.ceil(len/.42)),(u,v)=>{
  const rv=loop(u*TAU);
  return [add(add(a,mul(d,v)),mul(rv,mix(r,r2,v))),unit(add(rv,mul(up,(r-r2)/len))),[u*TAU*r,v*len]];
 },col,mat);
 if(cap){
  for(let top of [false,true]){
   let points=[];for(let i=0;i<sides;i++)points.push(add(top?b:a,mul(loop(i/sides*TAU),top?r2:r)));
   if((top?r2:r)>.0001)face(points,col,mat,mul(up,top?1:-1));
  }
 }
}
export function tube(points,r,col,mat=M.METAL,sides=10,radii=null){
 const tangents=points.map((p,i)=>unit(sub(points[Math.min(points.length-1,i+1)],points[Math.max(0,i-1)])));
 const ax=[],az=[];let previous=unit(cross(Math.abs(tangents[0][1])>.85?[0,0,1]:[0,1,0],tangents[0]));
 for(let t of tangents){previous=unit(sub(previous,mul(t,dot(t,previous))));ax.push(previous);az.push(unit(cross(previous,t)));}
 surface(sides,points.length-1,(u,v)=>{
  const j=Math.round(v*(points.length-1)),rad=add(mul(ax[j],Math.cos(u*TAU)),mul(az[j],Math.sin(u*TAU)));
  return [add(points[j],mul(rad,radii?radii[j]:r)),rad,[u*TAU*r,v]];
 },col,mat);
}
export function lathe(p,profile,col,mat,n=28){
 for(let j=0;j<profile.length-1;j++){
  const [r,y]=profile[j],[r2,y2]=profile[j+1];
  if(Math.abs(y-y2)>.00001)rod(add(p,[0,y,0]),add(p,[0,y2,0]),r,col,mat,n,r2,false);
  else{
   const sign=r2<r?1:-1;
   surface(n,1,(u,v)=>{let a=u*TAU,rr=mix(r,r2,v);return [add(p,[rr*Math.cos(a),y,rr*Math.sin(a)]),[0,sign,0],[u*TAU*r,rr]];},col,mat);
  }
 }
}
export function torus(p,axis,R,r,col,mat=M.RUBBER,n=32,k=8){
 let a=unit(axis),x=unit(cross(Math.abs(a[1])>.88?[0,0,1]:[0,1,0],a)),z=cross(x,a);
 surface(n,k,(u,v)=>{
  const radial=add(mul(x,Math.cos(TAU*u)),mul(z,Math.sin(TAU*u))),normal=add(mul(radial,Math.cos(TAU*v)),mul(a,Math.sin(TAU*v)));
  return [add(p,add(mul(radial,R),mul(normal,r))),normal,[u*TAU*R,v*TAU*r]];
 },col,mat);
}
export function beam(a,b,width,depth,col,mat=M.PAINT,bevel=.004){
 const delta=sub(b,a),y=unit(delta),x=unit(cross(Math.abs(y[1])>.9?[0,0,1]:[0,1,0],y));
 inBasis(mul(add(a,b),.5),x,y,cross(x,y),()=>box([0,0,0],[width,Math.hypot(...delta),depth],col,mat,bevel));
}
export function occlude(p,s){
 const corners=[];for(let i of [-1,1])for(let j of [-1,1])for(let k of [-1,1])corners.push(world(add(p,[i*s[0]/2,j*s[1]/2,k*s[2]/2])));
 const lo=[0,1,2].map(i=>Math.min(...corners.map(v=>v[i]))),hi=[0,1,2].map(i=>Math.max(...corners.map(v=>v[i])));
 occluders.push([...lo,...hi]);
}
export function obstacle(p,s,kind='box'){
 const c=world(p),axis=direction([1,0,0]),yaw=Math.atan2(-axis[2],axis[0]);collisions.push({kind,x:c[0],z:c[2],w:s[0],d:s[2],yaw});
}
export function solid(p,s,c,m=M.PAINT,r=0,walk=true,step=.31){
 box(p,s,c,m,r,step);occlude(p,s.map(x=>Math.max(.01,x-r*.65)));if(walk)obstacle(p,s);
}
export function light(p,color,power,reach,soft=.15,axis=null){
 lights.push({p:world(p),color,power,reach,soft,axis:axis?direction(axis):null});
}
export function oct(w,h,chx,chy=chx){
 return [[-w/2+chx,-h/2],[w/2-chx,-h/2],[w/2,-h/2+chy],[w/2,h/2-chy],[w/2-chx,h/2],[-w/2+chx,h/2],[-w/2,h/2-chy],[-w/2,-h/2+chy]];
}
// Ring lofts are watertight even when the clear opening and anchor flange have different depths.
export function band(cx,cy,outer,zOuter,inner,zInner,col,mat=M.PAINT,step=.26){
 for(let i=0;i<8;i++){
  const j=(i+1)%8,oa=[cx+outer[i][0],cy+outer[i][1],zOuter],ob=[cx+outer[j][0],cy+outer[j][1],zOuter],ia=[cx+inner[i][0],cy+inner[i][1],zInner],ib=[cx+inner[j][0],cy+inner[j][1],zInner];
  const along=sub(ob,oa),across=sub(ia,oa),normal=unit(cross(along,across));
  surface(Math.max(Math.hypot(...along),Math.hypot(...sub(ib,ia)))/step,Math.hypot(...across)/step,(u,v)=>{
   return [add(add(oa,mul(along,u)),mul(sub(add(ia,mul(sub(ib,ia),u)),add(oa,mul(along,u))),v)),normal,[u*Math.hypot(...along),v*Math.hypot(...across)]];
  },col,mat);
 }
}
export function screw(p,axis,r=.018,head='8b9186'){
 const ax=unit(axis);
 rod(p,add(p,mul(ax,.003)),r*1.35,'33403d',M.RUBBER,10);
 rod(add(p,mul(ax,.002)),add(p,mul(ax,.010)),r,head,M.METAL,6);
}

