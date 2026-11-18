'use strict';
const TAU = Math.PI * 2, PI = Math.PI;
const vadd=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const vsub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const vmul=(a,k)=>[a[0]*k,a[1]*k,a[2]*k];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const norm=a=>vmul(a,1/(Math.hypot(...a)||1));
const mix=(a,b,t)=>a+(b-a)*t, lerp3=(a,b,t)=>a.map((v,i)=>mix(v,b[i],t));
const sat=x=>Math.max(0,Math.min(1,x)), clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const sm=(a,b,x)=>{const t=sat((x-a)/(b-a));return t*t*(3-2*t)};
let rngState=438721;
function rand(){rngState=(Math.imul(rngState,1664525)+1013904223)>>>0;return rngState/4294967296}
const range=(a,b)=>mix(a,b,rand()), pick=a=>a[Math.floor(rand()*a.length)];
let colorCache={};
function rgb(h){if(Array.isArray(h))return h;if(!colorCache[h])colorCache[h]=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);return colorCache[h]}
const tint=(c,k)=>rgb(c).map(x=>x*k), blend=(a,b,t)=>lerp3(rgb(a),rgb(b),t);
const X=[1,0,0],Y=[0,1,0],Z=[0,0,1];
const WOOD=0, PAINT=1, END=2, STONE=3, EARTH=4, GRIT=5, IRON=6, ROPE=7, ROOF=8, CLOTH=9, GRASS=10, BRASS=11, PAPER=12, PLAIN=13, SEAWEED=14, GLASS=15;
class Batch{
 constructor(){this.v=[];this.i=[]}
 vertex(p,n,uv,c,m,ao=1){this.v.push(...p,...n,...uv,...rgb(c),m,ao);return this.v.length/13-1}
 quad(p,n,uv,c,m,ao=1){const i=this.v.length/13;for(let k=0;k<4;k++)this.vertex(p[k],n[0] instanceof Array?n[k]:n,uv[k],Array.isArray(c[0])?c[k]:c,m,Array.isArray(ao)?ao[k]:ao);this.i.push(i,i+1,i+2,i,i+2,i+3)}
}
const nearMesh=new Batch(),farMesh=new Batch(),groundMesh=new Batch();
let mesh=nearMesh;
const texRect=(w,h,u=0,v=0)=>[[u,v],[u+w,v],[u+w,v+h],[u,v+h]];
function quad(a,b,c,d,color,mat=PLAIN,uv=null,normal=null,ao=1){
 const n=normal||norm(cross(vsub(b,a),vsub(d,a)));
 mesh.quad([a,b,c,d],n,uv||texRect(Math.hypot(...vsub(a,b)),Math.hypot(...vsub(a,d))),rgb(color),mat,ao)
}
function triangle(a,b,c,color,mat=PLAIN,normal=null,ao=1){
 const n=normal||norm(cross(vsub(b,a),vsub(c,a))),i=mesh.v.length/13;
 for(const [j,p] of [a,b,c].entries())mesh.vertex(p,n,[j===1?1:0,j===2?1:0],color,mat,ao);mesh.i.push(i,i+1,i+2)
}
function frameAlong(a,b,preferred=Y,roll=0){
 const ex=norm(vsub(b,a));
 if(Math.abs(dot(ex,preferred))>.997)preferred=Z;
 let ez=norm(cross(ex,preferred)),ey=norm(cross(ez,ex));
 if(roll){const y0=ey,z0=ez;ey=vadd(vmul(y0,Math.cos(roll)),vmul(z0,Math.sin(roll)));ez=vadd(vmul(z0,Math.cos(roll)),vmul(y0,-Math.sin(roll)))}
 return [ex,ey,ez]
}
function basisPoint(p,axes,x,y,z){return [p[0]+axes[0][0]*x+axes[1][0]*y+axes[2][0]*z,p[1]+axes[0][1]*x+axes[1][1]*y+axes[2][1]*z,p[2]+axes[0][2]*x+axes[1][2]*y+axes[2][2]*z]}
function cuboid(c,d,axes,color,mat,bevel=0){
 const [l,h,w]=d.map(v=>v*.5),q=Math.min(bevel,h*.38,w*.38);
 const profile=q>0?[[-h,-w+q],[-h+q,-w],[h-q,-w],[h,-w+q],[h,w-q],[h-q,w],[-h+q,w],[-h,w-q]]:[[-h,-w],[h,-w],[h,w],[-h,w]];
 // The cross section advances around the long axis with outward face normals.
 const ends=[-l,l].map(x=>profile.map(([y,z])=>basisPoint(c,axes,x,y,z)));
 let v=range(0,8),u=range(0,16);
 for(let k=0;k<profile.length;k++){
  const j=(k+1)%profile.length,a=ends[0][k],b=ends[1][k],e=ends[0][j],f=ends[1][j];
  const dv=Math.hypot(profile[k][0]-profile[j][0],profile[k][1]-profile[j][1]);
  quad(a,e,f,b,color,mat,[[u,v],[u,v+dv],[u+2*l,v+dv],[u+2*l,v]]);
  v+=dv
 }
 for(let i=0;i<2;i++){
  const normal=vmul(axes[0],i===0?-1:1),id=mesh.v.length/13,em=(mat===WOOD||mat===PAINT)?END:mat;
  for(let j=0;j<profile.length;j++)mesh.vertex(ends[i][j],normal,[profile[j][0]+.03,profile[j][1]+.02],color,em);
  for(let j=1;j<profile.length-1;j++)i?mesh.i.push(id,id+j,id+j+1):mesh.i.push(id,id+j+1,id+j)
 }
}
function box(c,d,color,mat=PLAIN,yaw=0,bevel=0){
 const cs=Math.cos(yaw),sn=Math.sin(yaw);cuboid(c,d,[[cs,0,sn],Y,[-sn,0,cs]],color,mat,bevel)
}
function beam(a,b,width,height,color,mat=WOOD,bevel=.006,roll=0,preferred=Y){
 cuboid(lerp3(a,b,.5),[Math.hypot(...vsub(b,a)),height,width],frameAlong(a,b,preferred,roll),color,mat,bevel)
}
function tube(points,radius,color,mat=IRON,sides=10,options={}){
 if(points.length<2)return;
 const first=mesh.v.length/13, radii=Array.isArray(radius)?radius:points.map(()=>radius);
 let old=null,travel=options.u||0,last=points[0],lastside=null;
 for(let i=0;i<points.length;i++){
  const tangent=norm(vsub(points[Math.min(i+1,points.length-1)],points[Math.max(i-1,0)]));
  let side=old?norm(vsub(old,vmul(tangent,dot(old,tangent)))):norm(cross(tangent,Math.abs(tangent[1])>.9?Z:Y));
  if(dot(side,side)<.8)side=norm(cross(tangent,Math.abs(tangent[1])>.9?Z:Y));
  const up=norm(cross(tangent,side));
  travel+=Math.hypot(...vsub(points[i],last));last=points[i];old=side;
  for(let j=0;j<=sides;j++){
   const angle=TAU*j/sides,n=vadd(vmul(side,Math.cos(angle)),vmul(up,Math.sin(angle)));
   const rr=radii[i],p=vadd(points[i],vmul(n,rr));
   mesh.vertex(p,n,[travel,TAU*j/sides*rr],color,mat);
   if(i&&j){const k=first+i*(sides+1)+j;mesh.i.push(k-sides-2,k-sides-1,k,k-sides-2,k,k-1)}
  }
  if(i===0||i===points.length-1){lastside=up}
 }
 // Caps use independent normals so pylons and bolts keep a crisp end.
 if(options.cap!==false)for(const end of [0,points.length-1]){
  const n=norm(vsub(points[end],points[end===0?1:end-1])),id=mesh.v.length/13;
  const ci=mesh.vertex(points[end],n,[0,0],color,mat===WOOD?END:mat);
  for(let j=0;j<=sides;j++){
   const v=(first+end*(sides+1)+j)*13,pp=mesh.v.slice(v,v+3),a=j/sides*TAU;
   mesh.vertex(pp,n,[radii[end]*Math.cos(a),radii[end]*Math.sin(a)],color,mat===WOOD?END:mat);
   if(j)end===0?mesh.i.push(ci,id+j+1,id+j):mesh.i.push(ci,id+j,id+j+1)
  }
 }
}
function cyl(a,b,r,color,mat=IRON,s=10,r2=r){tube([a,b],[r,r2],color,mat,s)}
function ellipse(c,r,color,mat=STONE,steps=10,bands=5,yaw=0,rough=0){
 const id=mesh.v.length/13,cs=Math.cos(yaw),sn=Math.sin(yaw),seed=range(0,TAU);
 for(let i=0;i<=bands;i++)for(let j=0;j<=steps;j++){
  const a=j/steps*TAU,b=i/bands*PI,co=Math.cos(a),si=Math.sin(a);
  const u=co*Math.sin(b),v=Math.cos(b),w=si*Math.sin(b),f=1+rough*(Math.sin(3*a+seed)*Math.sin(2*b+seed)+.5*Math.cos(5*a-b))*Math.sin(b);
  const xx=u*r[0]*f,zz=w*r[2]*f,n0=norm([u/r[0],v/r[1],w/r[2]]),n=[cs*n0[0]-sn*n0[2],n0[1],sn*n0[0]+cs*n0[2]];
  mesh.vertex([c[0]+cs*xx-sn*zz,c[1]+v*r[1]*f,c[2]+sn*xx+cs*zz],n,[a*Math.max(r[0],r[2]),b*r[1]],color,mat,.83+.17*sat(v+.4));
  if(i&&j){const k=id+i*(steps+1)+j;mesh.i.push(k-steps-2,k-steps-1,k,k-steps-2,k,k-1)}
 }
}
function cord(a,b,sag,r,color='#ab9061',s=8){
 const p=[];for(let i=0;i<=12;i++){const t=i/12,q=lerp3(a,b,t);q[1]-=sag*4*t*(1-t);p.push(q)}tube(p,r,color,ROPE,s)
}
function coil(x,y,z,rx,rz,loops=4,color='#ae9160',axis=0){
 const pts=[],r=.019;
 for(let i=0;i<=loops*34;i++){
  const t=i/34,theta=t*TAU,spread=.4+.60*t/loops;
  const u=rx*spread*Math.cos(theta),v=rz*spread*Math.sin(theta);
  pts.push([x+u*Math.cos(axis)-v*Math.sin(axis),y+r+.008*Math.sin(theta*2+t),z+u*Math.sin(axis)+v*Math.cos(axis)])
 }
 const last=pts.at(-1);pts.push(vadd(last,[.10,.002,.06]),vadd(last,[.16,-.001,.20]),vadd(last,[.31,-.003,.31]));
 tube(pts,r,color,ROPE,8)
}
const signs=[];
function sign(text,center,axis,up,w,h,style={}){signs.push({text,center,axis:norm(axis),up:norm(up),w,h,style})}
function lookAt(eye,target,up=Y){
 const z=norm(vsub(eye,target)),x=norm(cross(up,z)),y=cross(z,x);
 return [x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1]
}
function multiply(a,b){const c=new Float32Array(16);for(let col=0;col<4;col++)for(let row=0;row<4;row++)for(let k=0;k<4;k++)c[col*4+row]+=a[k*4+row]*b[col*4+k];return c}
function perspective(fov,aspect,near,far){const f=1/Math.tan(fov/2);return [f/aspect,0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,2*far*near/(near-far),0]}
function ortho(l,r,b,t,n,f){return [2/(r-l),0,0,0,0,2/(t-b),0,0,0,0,-2/(f-n),0,-(r+l)/(r-l),-(t+b)/(t-b),-(f+n)/(f-n),1]}
