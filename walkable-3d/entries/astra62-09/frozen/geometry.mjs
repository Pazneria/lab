import * as T from './vendor/three.module.min.js';

export { T };
export const PI = Math.PI, TAU = PI * 2;
export const C = {
  hull:0xa8afab, light:0xc4c8bc, ivory:0xd5d5c5, panel:0x899594,
  grey:0x626e70, steel:0x879497, silver:0xc8d1cf, dark:0x394449,
  iron:0x283337, seam:0x192327, hose:0x252a2c, gold:0xc2994e,
  yellow:0xdfa043, ochre:0xbb8139, rust:0x8b5f40, copper:0xac7858,
  mint:0x8fdfd3, teal:0x567c7e, white:0xf5efda, red:0xa7533c
};
const V = a => new T.Vector3(...a);
const colorCache = new Map(), shapes = new Map();
const rgb = c => {if(!colorCache.has(c))colorCache.set(c,new T.Color(c));return colorCache.get(c)};
const cached = (k,fn) => {if(!shapes.has(k))shapes.set(k,fn());return shapes.get(k)};
const id = new T.Matrix4(), pos = new T.Vector3(), norm = new T.Vector3(), normalMatrix = new T.Matrix3();
const makeMatrix = (p,r=[0,0,0]) => new T.Matrix4().compose(V(p),new T.Quaternion().setFromEuler(new T.Euler(...r)),new T.Vector3(1,1,1));

export function seeded(seed=1234) {
  return () => {seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
}
function chamferBox(w,h,d,b) {
  if(!b) return new T.BoxGeometry(w,h,d);
  const half=[w/2,h/2,d/2], k=Math.min(b,Math.min(...half)*0.7), inner=half.map(n=>n-k);
  const p=[], n=[], e=[], idx=[];
  function face(verts,normal,edge){
    const a=V(verts[1]).sub(V(verts[0])),cross=a.cross(V(verts[2]).sub(V(verts[0])));
    if(cross.dot(V(normal))<0)verts.reverse();
    const j=p.length/3, nn=V(normal).normalize();
    for(const v of verts){p.push(...v);n.push(nn.x,nn.y,nn.z);e.push(edge)}
    for(let i=1;i<verts.length-1;i++)idx.push(j,j+i,j+i+1);
  }
  for(let axis=0;axis<3;axis++){
    const u=(axis+1)%3,v=(axis+2)%3;
    for(const s of [-1,1]){
      const normal=[0,0,0];normal[axis]=s;
      const pts=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([a,b])=>{
        const q=[0,0,0];q[axis]=half[axis]*s;q[u]=inner[u]*a;q[v]=inner[v]*b;return q});
      face(pts,normal,0);
    }
    for(const su of [-1,1])for(const sv of [-1,1]){
      const normal=[0,0,0];normal[u]=su;normal[v]=sv;
      const pts=[[-1,0],[1,0],[1,1],[-1,1]].map(([t,j])=>{
        const q=[0,0,0];q[axis]=inner[axis]*t;q[u]=(j?inner:half)[u]*su;q[v]=(j?half:inner)[v]*sv;return q});
      face(pts,normal,1);
    }
  }
  for(const x of [-1,1])for(const y of [-1,1])for(const z of [-1,1]){
    const s=[x,y,z];face([0,1,2].map(i=>s.map((v,j)=>v*(i===j?half[j]:inner[j]))),s,1);
  }
  const g=new T.BufferGeometry();
  g.setAttribute('position',new T.Float32BufferAttribute(p,3));
  g.setAttribute('normal',new T.Float32BufferAttribute(n,3));
  g.setAttribute('abrasion',new T.Float32BufferAttribute(e,1));g.setIndex(idx);return g;
}
const axisRotation = axis => axis==='x'?[0,0,-PI/2]:axis==='z'?[PI/2,0,0]:[0,0,0];
export class Kit {
  constructor(){this.batches=new Map();this.labels=[];this.solids=[];this.contacts=[];this.group='shell';this.matrix=id}
  frame(p,rot,fn){
    const old=this.matrix;this.matrix=old.clone().multiply(makeMatrix(p,rot));
    try{fn()}finally{this.matrix=old}
  }
  section(key,fn){const old=this.group;this.group=key;try{fn()}finally{this.group=old}}
  add(g,m,c,matrix=id) {
    const key=this.group+'/'+m;
    if(!this.batches.has(key))this.batches.set(key,{p:[],n:[],c:[],e:[],i:[],m,group:this.group});
    const b=this.batches.get(key), offset=b.p.length/3, tr=this.matrix.clone().multiply(matrix);
    normalMatrix.getNormalMatrix(tr);
    const P=g.attributes.position,N=g.attributes.normal,E=g.attributes.abrasion,index=g.index,col=rgb(c);
    for(let j=0;j<P.count;j++){
      pos.fromBufferAttribute(P,j).applyMatrix4(tr);norm.fromBufferAttribute(N,j).applyNormalMatrix(normalMatrix);
      b.p.push(pos.x,pos.y,pos.z);b.n.push(norm.x,norm.y,norm.z);b.c.push(col.r,col.g,col.b);b.e.push(E?E.getX(j):0);
    }
    if(index)for(let j=0;j<index.count;j++)b.i.push(index.getX(j)+offset);
    else for(let j=0;j<P.count;j++)b.i.push(j+offset);
  }
  box(p,s,m,c,b=0,r=[0,0,0]){
    const g=cached('b/'+s.join('/')+'/'+b,()=>chamferBox(...s,b));this.add(g,m,c,makeMatrix(p,r));
  }
  cyl(p,rt,rb,h,m,c,axis='y',steps=24) {
    const g=cached(['c',rt,rb,h,steps].join('/'),()=>new T.CylinderGeometry(rt,rb,h,steps));
    this.add(g,m,c,makeMatrix(p,axisRotation(axis)));
  }
  rod(a,b,r,m,c,steps=12,r2=r){
    const start=V(a),end=V(b),v=end.clone().sub(start),len=v.length();
    if(len<0.00001)return;
    const g=cached(['r',r,r2,steps].join('/'),()=>new T.CylinderGeometry(r2,r,1,steps));
    const mat=new T.Matrix4().compose(start.lerp(end,0.5),new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),v.normalize()),new T.Vector3(1,len,1));
    this.add(g,m,c,mat);
  }
  bar(a,b,width,depth,m,c){
    const start=V(a),end=V(b),v=end.clone().sub(start);
    const mat=new T.Matrix4().compose(start.lerp(end,0.5),new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),v.clone().normalize()),new T.Vector3(width,v.length(),depth));
    this.add(cached('unit',()=>new T.BoxGeometry(1,1,1)),m,c,mat);
  }
  ring(p,R,r,m,c,axis='x',segs=48){
    const g=cached(['tor',R,r,segs].join('/'),()=>new T.TorusGeometry(R,r,8,segs));
    const rot=axis==='x'?[0,PI/2,0]:axis==='y'?[PI/2,0,0]:[0,0,0];this.add(g,m,c,makeMatrix(p,rot));
  }
  turn(p,profile,m,c,axis='x',steps=64) {
    const g=new T.LatheGeometry(profile.map(([length,r])=>new T.Vector2(r,length)),steps);
    this.add(g,m,c,makeMatrix(p,axisRotation(axis)));g.dispose();
  }
  tube(points,r,m,c,steps=36,sides=10){
    const curve=new T.CatmullRomCurve3(points.map(V),false,'centripetal');
    const g=new T.TubeGeometry(curve,steps,r,sides,false);this.add(g,m,c);g.dispose();
  }
  shape(p,outline,depth,m,c,r=[0,0,0],bevel=0){
    const s=new T.Shape();outline.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();
    const g=new T.ExtrudeGeometry(s,{depth,bevelEnabled:bevel>0,bevelSegments:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:4});
    this.add(g,m,c,makeMatrix(p,r));g.dispose();
  }
  label(p,normal,up,w,h,lines,options={}){
    const z=V(normal).normalize(), y=V(up).normalize(), x=y.clone().cross(z).normalize();
    const mat=new T.Matrix4().makeBasis(x,z.clone().cross(x).normalize(),z).setPosition(V(p));
    this.labels.push({matrix:this.matrix.clone().multiply(mat),group:this.group,w,h,lines:Array.isArray(lines)?lines:[lines],options});
  }
  contact(x,z,w,d,alpha=0.5,y=0.025){this.contacts.push({x,z,w,d,alpha,y})}
  solid(x1,z1,x2,z2,y1=0,y2=8){this.solids.push({x1,z1,x2,z2,y1,y2})}
  finish(materials) {
    const groups={},counts={vertices:0,triangles:0,batches:this.batches.size};
    for(const b of this.batches.values()){
      const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(b.p,3));g.setAttribute('normal',new T.Float32BufferAttribute(b.n,3));
      g.setAttribute('color',new T.Float32BufferAttribute(b.c,3));g.setAttribute('abrasion',new T.Float32BufferAttribute(b.e,1));g.setIndex(b.i);
      g.computeBoundingSphere();g.computeBoundingBox();
      const obj=new T.Mesh(g,materials[b.m]);obj.name=b.group+'/'+b.m;obj.receiveShadow=true;
      obj.castShadow=!['glass','lit','signal','black','mark'].includes(b.m);
      if(b.m==='glass')obj.renderOrder=3;
      (groups[b.group]??=new T.Group()).add(obj);counts.vertices+=b.p.length/3;counts.triangles+=b.i.length/3;
    }
    this.batches.clear();shapes.clear();return {groups,counts};
  }
}
export function bolt(k,p,axis='y',r=.042,c=C.silver) {
  k.cyl(p,r*1.42,r*1.42,.012,'metal',C.dark,axis,12);
  const q=[...p];q[axis==='x'?0:axis==='z'?2:1]+=.014;
  k.cyl(q,r,r,.025,'metal',c,axis,6);
}
export function pipeJoint(k,p,axis,r,c=C.steel){
  k.cyl(p,r*1.42,r*1.42,.095,'metal',c,axis,16);
  k.ring(p,r*1.39,.012,'rubber',C.iron,axis,20);
}
export function handle(k,p,width,height,axis='z',color=C.silver){
  k.frame(p,axis==='x'?[0,PI/2,0]:[0,0,0],()=>{
    const a=width/2;for(const x of [-a,a]){k.cyl([x,0,.015],.053,.053,.036,'metal',C.dark,'z',12);k.rod([x,0,.02],[x,0,height],.025,'metal',color)}
    k.rod([-a,0,height],[a,0,height],.029,'metal',color);
  })
}
