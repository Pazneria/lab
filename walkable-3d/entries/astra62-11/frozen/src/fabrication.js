import * as T from '../vendor/three.module.min.js';

export { T };
export const PI = Math.PI, TAU = 2 * PI;
export const scene = new T.Scene();
export const model = new T.Group();
const geometryCache = new Map();
const surfaces = new Map();
const collision = [];
export { collision };
export const P = {
  ivory: '#e5e4d8', white: '#f1f0e5', ceramic: '#c8cbbd', fog: '#b6c2bc',
  mint: '#91aaa2', sage: '#6d8780', deep: '#284446', ink: '#253235',
  black: '#151d20', rubber: '#242a2b', steel: '#afb8b8', alu: '#cdd2cf',
  alloy: '#78888a', gun: '#566368', copper: '#bd7952', orange: '#e46536',
  red: '#b4482f', gold: '#f2ad53', cyan: '#5faeae', led: '#a5e2be'
};
export function seed(n) {
  return () => { n = (Math.imul(1664525, n) + 1013904223) >>> 0; return n / 4294967296; };
}
const rng = seed(4719);
function finish(name, roughness, metalness, options={}) {
  const mat = new T.MeshStandardMaterial({ vertexColors:true, roughness, metalness, ...options });
  surfaces.set(name, mat);
  return mat;
}
function raster(n, paint, color=true) {
  const c = document.createElement('canvas'); c.width=n; c.height=n;
  const ctx=c.getContext('2d'); paint(ctx,n);
  const t = new T.CanvasTexture(c); t.colorSpace=color?T.SRGBColorSpace:T.NoColorSpace;
  t.wrapS=t.wrapT=T.RepeatWrapping; t.anisotropy=4;
  return t;
}
function grain(kind) {
  return raster(256,(ctx,n)=>{
    const im=ctx.createImageData(n,n);
    for(let y=0;y<n;y++) {
      const stripe = kind==='metal' ? rng()*10 : 0;
      for(let x=0;x<n;x++){
        const j=4*(y*n+x);
        const f = kind==='floor' ? 226+rng()*23 : (kind==='metal'?234+stripe+rng()*10:244+rng()*10);
        im.data[j]=f; im.data[j+1]=f; im.data[j+2]=f; im.data[j+3]=255;
      }
    }
    ctx.putImageData(im,0,0);
    if(kind==='floor') {
      for(let i=0;i<2700;i++){
        const a=rng()*.26; ctx.fillStyle=rng()<.45?'rgba(255,255,255,'+a+')':'rgba(34,43,41,'+a+')';
        const x=rng()*n, y=rng()*n, r=.15+rng()*1.0;
        ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+r*1.5,y+r*.25);ctx.lineTo(x+r*.88,y+r*1.3);ctx.lineTo(x-r*.35,y+r*.85);ctx.fill();
      }
    }
    if(kind==='metal'){
      ctx.lineWidth=.35;
      for(let i=0;i<160;i++){
        const x=rng()*n,y=rng()*n;ctx.strokeStyle='rgba(81,86,88,'+(rng()*.13)+')';
        ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+5+rng()*50,y+rng()*.7);ctx.stroke();
      }
    }
  });
}
const powder=grain('powder'), brushed=grain('metal'), aggregate=grain('floor');
finish('paint',.54,.19,{map:powder});
finish('matte',.81,.055,{map:powder});
const toolFinish=raster(256,(ctx,n)=>{
  const im=ctx.createImageData(n,n);
  for(let y=0;y<n;y++){
    const line=142+rng()*66+14*Math.sin(y*.19);
    for(let x=0;x<n;x++){
      const k=4*(y*n+x),v=line+rng()*18;im.data[k]=v;im.data[k+1]=v;im.data[k+2]=v;im.data[k+3]=255;
    }
  }
  ctx.putImageData(im,0,0);ctx.lineWidth=.8;
  for(let i=0;i<52;i++){const x=rng()*n,y=rng()*n;ctx.strokeStyle='rgba(245,245,245,.34)';ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+5+rng()*51,y+rng()*2);ctx.stroke();}
},false);
const laminate=raster(256,(ctx,n)=>{
  ctx.drawImage(powder.image,0,0);ctx.lineWidth=.55;
  for(let i=0;i<230;i++){
    const x=rng()*n,y=rng()*n,len=rng()*9+1,a=rng()*TAU;
    ctx.strokeStyle=i%5?'rgba(78,88,78,.11)':'rgba(255,255,250,.25)';
    ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+len*Math.cos(a),y+len*Math.sin(a));ctx.stroke();
  }
});
finish('metal',.46,.82,{map:brushed,roughnessMap:toolFinish});
finish('chrome',.245,.93,{map:brushed,roughnessMap:toolFinish});
finish('laminate',.57,.045,{map:laminate});
finish('rubber',.86,.025);
finish('floor',.74,.08,{map:aggregate});
finish('optic',.115,.66,{envMapIntensity:1.55});
finish('light',.36,.1,{emissive:0xfff4dd,emissiveIntensity:1.85});
finish('signal',.28,.14,{emissive:0x70bd95,emissiveIntensity:.65});
finish('glass',.15,.19,{transparent:true,opacity:.27,depthWrite:false,side:T.DoubleSide,envMapIntensity:1.4});
const occlusion = raster(128,(ctx,n)=>{
  const g=ctx.createRadialGradient(n/2,n/2,2,n/2,n/2,n*.5);
  g.addColorStop(0,'rgba(31,35,32,.48)');g.addColorStop(.42,'rgba(35,42,40,.37)');g.addColorStop(.74,'rgba(45,47,38,.16)');g.addColorStop(1,'rgba(50,50,42,0)');
  ctx.fillStyle=g;ctx.fillRect(0,0,n,n);
});
surfaces.set('contact',new T.MeshBasicMaterial({map:occlusion,vertexColors:true,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,toneMapped:false}));
export function defineGraphic(key,tex,emissive=false) {
  const mat=emissive?new T.MeshBasicMaterial({vertexColors:true,map:tex,toneMapped:false,alphaTest:.12}):
    new T.MeshStandardMaterial({vertexColors:true,map:tex,roughness:.78,metalness:.03,alphaTest:.24});
  surfaces.set(key,mat);
}
export function group(parent=model,x=0,y=0,z=0,ry=0) {
  const g=new T.Group();g.position.set(x,y,z);g.rotation.y=ry;parent.add(g);return g;
}
function cached(k,f){if(!geometryCache.has(k))geometryCache.set(k,f());return geometryCache.get(k);}
export function part(g,geom,x,y,z,col=P.ivory,s='paint') {
  const o=new T.Mesh(geom,surfaces.get(s));o.position.set(x,y,z);g.add(o);o.userData={col,s};return o;
}
export function box(g,x,y,z,w,h,d,col=P.ivory,s='paint'){
  const o=part(g,cached('cube',()=>new T.BoxGeometry(1,1,1)),x,y,z,col,s);o.scale.set(w,h,d);return o;
}
function chamferGeometry(w,h,d,r){
  const H=[w/2,h/2,d/2];r=Math.min(r,...H.map(x=>x*.8));
  const pos=[],norm=[],uv=[],idx=[];
  function face(a) {
    let p=a.map(v=>new T.Vector3(...v));
    let n=p[1].clone().sub(p[0]).cross(p[2].clone().sub(p[0])).normalize();
    if(n.dot(p[0])<0){p.reverse();n.negate();}
    const offset=pos.length/3;
    for(const v of p){pos.push(v.x,v.y,v.z);norm.push(n.x,n.y,n.z);uv.push(v.x,v.y);}
    for(let i=1;i<p.length-1;i++)idx.push(offset,offset+i,offset+i+1);
  }
  function vertex(sign,axis){return H.map((h,i)=>sign[i]*(h-(i===axis?0:r)));}
  for(let a=0;a<3;a++){
    const b=(a+1)%3,c=(a+2)%3;
    for(const s of [-1,1]){
      const vv=[];
      for(const [i,j] of [[-1,-1],[1,-1],[1,1],[-1,1]]){const t=[];t[a]=s;t[b]=i;t[c]=j;vv.push(vertex(t,a));}
      face(vv);
    }
    for(const i of [-1,1])for(const j of [-1,1]){
      const t=[0,0,0];t[a]=-1;t[b]=i;t[c]=j;const v1=vertex(t,b),v2=vertex(t,c);t[a]=1;face([v1,v2,vertex(t,c),vertex(t,b)]);
    }
  }
  for(const x of [-1,1])for(const y of [-1,1])for(const z of [-1,1]){const t=[x,y,z];face([vertex(t,0),vertex(t,1),vertex(t,2)]);}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setAttribute('normal',new T.Float32BufferAttribute(norm,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(idx);return geo;
}
export function bevel(g,x,y,z,w,h,d,r=.025,col=P.ivory,s='paint'){
  return part(g,cached(['ch',w,h,d,r].join('/'),()=>chamferGeometry(w,h,d,r)),x,y,z,col,s);
}
export function cyl(g,x,y,z,r,h,col=P.steel,s='metal',n=32,top=r) {
  return part(g,cached(['c',r,h,n,top].join('/'),()=>new T.CylinderGeometry(top,r,h,n)),x,y,z,col,s);
}
const up=new T.Vector3(0,1,0);
export function rod(g,a,b,r,col=P.steel,s='metal',n=12,top=r){
  const av=new T.Vector3(...a),bv=new T.Vector3(...b),dir=bv.clone().sub(av),p=av.add(bv).multiplyScalar(.5);
  const o=cyl(g,p.x,p.y,p.z,r,dir.length(),col,s,n,top);o.quaternion.setFromUnitVectors(up,dir.normalize());return o;
}
export function beam(g,a,b,w,d,col=P.ivory,s='paint',r=.008) {
  const av=new T.Vector3(...a),bv=new T.Vector3(...b),dir=bv.clone().sub(av),p=av.add(bv).multiplyScalar(.5);
  const o=bevel(g,p.x,p.y,p.z,w,dir.length(),d,r,col,s);o.quaternion.setFromUnitVectors(up,dir.normalize());return o;
}
export function ball(g,x,y,z,r,col,s='paint',n=24){
  const o=part(g,cached('sph'+n,()=>new T.SphereGeometry(1,n,Math.ceil(n*.62))),x,y,z,col,s);o.scale.setScalar(r);return o;
}
export function tube(g,points,r,col=P.rubber,s='rubber',segments=24,sides=7) {
  const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)),false,'centripetal');
  return part(g,new T.TubeGeometry(curve,segments,r,sides,false),0,0,0,col,s);
}
export function plate(g,xy,depth,col=P.ivory,s='paint',bevelSize=.012) {
  const shape=new T.Shape(xy.map(q=>new T.Vector2(...q)));
  const geom=new T.ExtrudeGeometry(shape,{depth,bevelEnabled:!!bevelSize,bevelSize,bevelThickness:bevelSize,bevelSegments:1,curveSegments:4});
  geom.translate(0,0,-depth/2);return part(g,geom,0,0,0,col,s);
}
// Annular sections use a shared set of smooth outer and inner normals and flat machined end faces.
export function annulus(g,x,y,z,ri,ro,depth,col=P.steel,s='metal',from=0,to=TAU,n=80) {
  const k=['ring',ri,ro,depth,from,to,n].join('/');
  const geo=cached(k,()=>{
    const v=[],nm=[],uv=[],ix=[];
    function patch(a,b,c,d,na,nb=na,nc=na,nd=na){
      const k=v.length/3;v.push(...a,...b,...c,...d);nm.push(...na,...nb,...nc,...nd);uv.push(0,0,1,0,1,1,0,1);ix.push(k,k+1,k+2,k,k+2,k+3);
    }
    const h=depth/2;
    for(let i=0;i<n;i++){
      const a=from+(to-from)*i/n,b=from+(to-from)*(i+1)/n;
      const ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);
      const p=(r,t,z)=>[r*(t?cb:ca),r*(t?sb:sa),z],A=[ca,sa,0],B=[cb,sb,0],ai=[-ca,-sa,0],bi=[-cb,-sb,0];
      patch(p(ri,0,h),p(ro,0,h),p(ro,1,h),p(ri,1,h),[0,0,1]);
      patch(p(ri,0,-h),p(ri,1,-h),p(ro,1,-h),p(ro,0,-h),[0,0,-1]);
      patch(p(ro,0,-h),p(ro,1,-h),p(ro,1,h),p(ro,0,h),A,B,B,A);
      patch(p(ri,0,-h),p(ri,0,h),p(ri,1,h),p(ri,1,-h),ai,ai,bi,bi);
      if(to-from<TAU-.00001){
        if(i===0)patch(p(ri,0,-h),p(ro,0,-h),p(ro,0,h),p(ri,0,h),[sa,-ca,0]);
        if(i===n-1)patch(p(ri,1,-h),p(ri,1,h),p(ro,1,h),p(ro,1,-h),[-sb,cb,0]);
      }
    }
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(v,3));geo.setAttribute('normal',new T.Float32BufferAttribute(nm,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(ix);return geo;
  });
  return part(g,geo,x,y,z,col,s);
}
export function bolt(g,x,y,z,r=.025,axis='z',col=P.steel){
  const o=cyl(g,x,y,z,r,r*.46,col,'metal',6);
  const q=cyl(g,x,y,z,r*.39,r*.06,P.black,'matte',6);
  const sign=axis.startsWith('-')?-1:1,a=axis.replace('-','');
  if(a==='z'){o.rotation.x=q.rotation.x=PI/2;q.position.z+=sign*r*.237;}
  else if(a==='x'){o.rotation.z=q.rotation.z=PI/2;q.position.x+=sign*r*.237;}
  else q.position.y+=sign*r*.237;
}
export function contact(g,x,z,w,d,y=.004) {
  const o=part(g,cached('plane',()=>new T.PlaneGeometry(1,1)),x,y,z,'#ffffff','contact');o.rotation.x=-PI/2;o.scale.set(w,d,1);return o;
}
export function obstacle(x,z,hx,hz){collision.push({x,z,hx,hz});}
export function localObstacle(g,x,z,w,d) {
  g.updateWorldMatrix(true,false);const b=new T.Box3();
  for(const sx of [-1,1])for(const sz of [-1,1])b.expandByPoint(g.localToWorld(new T.Vector3(x+sx*w/2,0,z+sz*d/2)));
  obstacle((b.min.x+b.max.x)/2,(b.min.z+b.max.z)/2,(b.max.x-b.min.x)/2,(b.max.z-b.min.z)/2);
}
export function unshadow(o){o.userData.noCast=true;return o;}
export function bake(){
  model.updateMatrixWorld(true);
  const buckets=new Map(), colors=new Map(),v=new T.Vector3(),n=new T.Vector3(),normalMatrix=new T.Matrix3();
  let triangles=0;
  model.traverse(o=>{
    if(!o.isMesh)return;
    const {s,col}=o.userData,m=o.material;
    let parent=o,cast=!['light','glass','contact','signal'].includes(s)&&!s.startsWith('graphic');
    while(parent){if(parent.userData.noCast){cast=false;break;}parent=parent.parent;}
    const key=s+'-'+cast;
    if(!buckets.has(key))buckets.set(key,{pos:[],norm:[],color:[],uv:[],ind:[],m,cast,s});
    const a=buckets.get(key),geo=o.geometry,p=geo.attributes.position,q=geo.attributes.normal,u=geo.attributes.uv;
    if(!colors.has(col))colors.set(col,new T.Color(col));const c=colors.get(col);
    const offset=a.pos.length/3;normalMatrix.getNormalMatrix(o.matrixWorld);
    const worldUV=['floor','paint','metal','chrome','matte','laminate'].includes(s);
    const scale=s==='floor'?1.8:s==='metal'||s==='chrome'?2.8:1.15;
    for(let i=0;i<p.count;i++){
      v.fromBufferAttribute(p,i).applyMatrix4(o.matrixWorld);n.fromBufferAttribute(q,i).applyNormalMatrix(normalMatrix);
      a.pos.push(v.x,v.y,v.z);a.norm.push(n.x,n.y,n.z);a.color.push(c.r,c.g,c.b);
      if(worldUV){
        const nx=Math.abs(n.x),ny=Math.abs(n.y),nz=Math.abs(n.z);
        if(ny>nx&&ny>nz)a.uv.push(v.x*scale,v.z*scale);
        else a.uv.push((nx>nz?v.z:v.x)*scale,v.y*scale);
      }else a.uv.push(u?u.getX(i):0,u?u.getY(i):0);
    }
    const ind=geo.index;
    if(ind)for(let i=0;i<ind.count;i++)a.ind.push(offset+ind.getX(i));
    else for(let i=0;i<p.count;i++)a.ind.push(offset+i);
  });
  for(const a of buckets.values()){
    const g=new T.BufferGeometry();
    for(const [name,data,size] of [['position',a.pos,3],['normal',a.norm,3],['color',a.color,3],['uv',a.uv,2]])g.setAttribute(name,new T.Float32BufferAttribute(data,size));
    g.setIndex(a.ind);g.computeBoundingSphere();
    const mesh=new T.Mesh(g,a.m);mesh.name=a.s;mesh.castShadow=a.cast;mesh.receiveShadow=a.s!=='contact'&&a.s!=='glass';
    if(a.s==='contact')mesh.renderOrder=1;if(a.s==='glass')mesh.renderOrder=2;
    scene.add(mesh);triangles+=a.ind.length/3;
  }
  const seen=new Set();model.traverse(o=>{if(o.geometry&&!seen.has(o.geometry)){seen.add(o.geometry);o.geometry.dispose();}});model.clear();geometryCache.clear();
  return {batches:buckets.size,triangles};
}
