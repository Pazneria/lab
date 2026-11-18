import * as THREE from "./vendor/three.module.min.js";
import {blocks,machines,worldAt} from "./layout.mjs";

const finishes={
  paint:[.38,.12,0,0], matte:[.09,0,0,0], wood:[.38,.06,0,0], lacquer:[.68,.16,0,0],
  rubber:[.12,.01,0,0], cloth:[.045,0,0,0], chrome:[.86,.86,0,0], brass:[.73,.71,0,0],
  steel:[.48,.63,0,0], plastic:[.72,.14,0,0], glass:[.86,.26,.91,1], print:[.22,.025,0,0],
  light:[.38,.08,1.08,0], litPrint:[.48,.12,.88,.13], mirror:[.84,.44,.66,.70]
};
const finishPrint={paint:"enamel",lacquer:"enamel",chrome:"brushed",brass:"brushed",steel:"brushed",plastic:"molded",rubber:"molded",cloth:"felt"};
export function M(color="#ffffff",finish="paint",texture=null,extra={}){
  return {color,finish,texture:texture||finishPrint[finish]||"white",...extra};
}
const colorCache=new Map();
function rgb(c){
  if(!colorCache.has(c)){let hex=c.slice(1);if(hex.length===3)hex=hex.split("").map(s=>s+s).join("");const n=parseInt(hex,16);colorCache.set(c,[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255])}
  return colorCache.get(c);
}

function createLights(){
  const lights=[];
  const add=(p,col,power,radius,target=null)=>{
    const axis=target?new THREE.Vector3(target[0]-p[0],target[1]-p[1],target[2]-p[2]).normalize():null;
    lights.push({p,c:rgb(col),power,radius,axis});
  };
  // Opal pendants, brass gallery lamps, counter fittings and bounced sign light.
  add([-.15,2.68,2.52],"#ffd5a0",.63,4.85);
  add([-1.40,2.73,-1.62],"#ffcd93",.55,4.0);
  add([1.50,2.73,-2.58],"#f6bd83",.52,3.95);
  add([-2.0,2.65,-4.64],"#ffc393",.48,3.1);
  add([1.93,2.64,-4.66],"#f8be85",.50,3.0);
  add([-.13,1.95,4.62],"#99d3df",.28,3.2);
  add([-2.53,2.17,3.81],"#c69c7a",.33,2.9);
  add([4.99,2.70,3.64],"#ffd5aa",.72,3.6);
  add([.31,2.78,-.58],"#ffe0b3",1.40,4.65,[0,1.36,-2.55]);
  add([3.44,2.47,1.62],"#e69e74",.38,2.7);
  add([-3.36,2.12,-2.60],"#ffbd8a",.43,2.8);
  add([3.35,2.12,-2.70],"#ffc493",.43,2.85);
  for(const m of machines){
    add(worldAt(m,0,1.28,m.d*.58),m.id==="bell"?"#72dbcd":m.bank==="blue"?"#85b7ed":"#ebb579",m.id==="bell"?.45:.28,m.id==="bell"?2.05:1.52);
    add(worldAt(m,0,1.83,.29),m.bank==="blue"?"#b1bde6":"#eec48b",.18,1.25);
  }
  return lights;
}
const footprints=blocks.map(o=>({...o,c:Math.cos(o.yaw),s:Math.sin(o.yaw),hx:o.w/2,hz:o.d/2}));
function getLighting(p,n,receive){
  const x=p.x,y=p.y,z=p.z,ny=n.y;
  const amb=.595+.082*ny+.042*Math.max(0,n.z*.75-n.x*.38+ny*.45);
  let r=amb*1.012,g=amb*.987,b=amb*1.008;
  for(const l of lightList){
    const dx=l.p[0]-x,dy=l.p[1]-y,dz=l.p[2]-z,d2=dx*dx+dy*dy+dz*dz;if(d2>l.radius*l.radius)continue;
    const d=Math.sqrt(d2),fall=1-d/l.radius,lambert=Math.max(0,(dx*n.x+dy*n.y+dz*n.z)/(d+.001));
    const cone=l.axis?Math.max(0,Math.min(1,(-((dx*l.axis.x+dy*l.axis.y+dz*l.axis.z)/(d+.001))-.68)/.24)):1;
    const a=l.power*fall*fall*(.22+lambert*.78)*cone*cone*(3-2*cone);r+=a*l.c[0];g+=a*l.c[1];b+=a*l.c[2];
  }
  if(receive && y<1.15){
    let occ=1;
    for(const o of footprints){
      const dx=x-o.x,dz=z-o.z;if(dx*dx+dz*dz>3.8)continue;
      const lx=dx*o.c-dz*o.s,lz=dx*o.s+dz*o.c;
      const d=Math.hypot(Math.max(0,Math.abs(lx)-o.hx+.046),Math.max(0,Math.abs(lz)-o.hz+.046));
      const af=Math.max(0,1-d/.44)*Math.max(0,1-y/1.15);
      occ=Math.min(occ,1-.49*af*af);
    }
    r*=occ;g*=occ;b*=occ;
  }
  return [r,g,b];
}
const lightList=createLights();
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
const v1=V(0,0,0),v2=V(0,0,0);
const baseBox=new THREE.BoxGeometry(1,1,1);
const sphere=new THREE.SphereGeometry(1,20,12);
const cache=new Map();
function cached(key,build){if(!cache.has(key))cache.set(key,build());return cache.get(key)}
function asStyle(s){return typeof s==="string"?M(s):s}
export class Model{
  constructor(atlas){
    this.atlas=atlas;this.transform=new THREE.Matrix4();this.norm=new THREE.Matrix3();this.batches=new Map();this.triangles=0;this.zone='architecture';
  }
  pushMatrix(m,fn){
    const before=this.transform,bn=this.norm;
    this.transform=new THREE.Matrix4().multiplyMatrices(before,m);
    this.norm=new THREE.Matrix3().getNormalMatrix(this.transform);
    try{fn()}finally{this.transform=before;this.norm=bn}
  }
  at(x,y,z,ry,fn,rx=0,rz=0){
    const q=new THREE.Quaternion().setFromEuler(new THREE.Euler(rx,ry,rz,"YXZ"));
    this.pushMatrix(new THREE.Matrix4().compose(V(x,y,z),q,V(1,1,1)),fn);
  }
  part(points,normals,uvs,indices,style){
    const s=asStyle(style),reg=this.atlas.regions[s.texture||"white"];
    if(!reg)throw Error("Missing artwork: "+s.texture);
    const key=this.zone+'/'+reg.page;let batch=this.batches.get(key);
    if(!batch){batch={page:reg.page,zone:this.zone,p:[],n:[],uv:[],rect:[],ink:[],light:[],surf:[],index:[]};this.batches.set(key,batch)}
    const start=batch.p.length/3,surf=finishes[s.finish||"paint"],ink=rgb(s.color||"#ffffff"),repeat=s.repeat||[1,1],ofs=s.offset||[0,0],shade=s.shade??1;
    if(!surf)throw Error("Unknown finish "+s.finish);
    for(let j=0;j<points.length;j+=3){
      v1.set(points[j],points[j+1],points[j+2]).applyMatrix4(this.transform);
      v2.set(normals[j],normals[j+1],normals[j+2]).applyMatrix3(this.norm).normalize();
      batch.p.push(v1.x,v1.y,v1.z);batch.n.push(v2.x,v2.y,v2.z);
      const i=j/3*2;batch.uv.push(uvs[i]*repeat[0]+ofs[0],uvs[i+1]*repeat[1]+ofs[1]);batch.rect.push(...reg.rect);batch.ink.push(...ink);
      const il=getLighting(v1,v2,s.receive);batch.light.push(il[0]*shade,il[1]*shade,il[2]*shade);batch.surf.push(...surf);
    }
    for(const i of indices)batch.index.push(start+i);this.triangles+=indices.length/3;
  }
  primitive(geo,x,y,z,sx,sy,sz,style,q=new THREE.Quaternion()){
    this.pushMatrix(new THREE.Matrix4().compose(V(x,y,z),q,V(sx,sy,sz)),()=>{this.part(geo.attributes.position.array,geo.attributes.normal.array,geo.attributes.uv.array,geo.index.array,style)});
  }
  box(x,y,z,w,h,d,s){this.primitive(baseBox,x,y,z,w,h,d,s)}
  ball(x,y,z,rx,ry,rz,s){this.primitive(sphere,x,y,z,rx,ry,rz,s)}
  tube(a,b,r1,r2,s,segs=16){
    const d=V(b[0]-a[0],b[1]-a[1],b[2]-a[2]),len=d.length();if(len<.00001)return;
    const ratio=r2/r1,geo=cached("c"+ratio.toFixed(5)+"/"+segs,()=>new THREE.CylinderGeometry(ratio,1,1,segs));
    const q=new THREE.Quaternion().setFromUnitVectors(V(0,1,0),d.multiplyScalar(1/len));
    this.primitive(geo,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,r1,len,r1,s,q);
  }
  path(pts,r,s,segs=8){for(let i=1;i<pts.length;i++)this.tube(pts[i-1],pts[i],r,r,s,segs)}
  torus(x,y,z,r,thick,s,segs=48,rx=0,ry=0){
    const ratio=thick/r,geo=cached("t"+ratio.toFixed(5)+"/"+segs,()=>new THREE.TorusGeometry(1,ratio,8,segs));
    this.primitive(geo,x,y,z,r,r,r,s,new THREE.Quaternion().setFromEuler(new THREE.Euler(rx,ry,0,"YXZ")));
  }
  face(a,b,c,d,s,nu=1,nv=1){
    const pp=[],nn=[],uv=[],ii=[],ab=V(b[0]-a[0],b[1]-a[1],b[2]-a[2]),ad=V(d[0]-a[0],d[1]-a[1],d[2]-a[2]),n=ab.cross(ad).normalize();
    for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){
      const u=i/nu,v=j/nv;for(let k=0;k<3;k++)pp.push((1-v)*(a[k]*(1-u)+b[k]*u)+v*(d[k]*(1-u)+c[k]*u));
      nn.push(n.x,n.y,n.z);uv.push(u,v);
    }
    for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){const p=j*(nu+1)+i;ii.push(p,p+1,p+nu+2,p,p+nu+2,p+nu+1)}
    this.part(pp,nn,uv,ii,s);
  }
  panel(x,y,z,w,h,s,rx=0,ry=0,rz=0,nu=1,nv=1){
    this.at(x,y,z,ry,()=>this.face([-w/2,-h/2,0],[w/2,-h/2,0],[w/2,h/2,0],[-w/2,h/2,0],s,nu,nv),rx,rz);
  }
  poly(points,normal,uv,s){
    const flat=points.map(p=>Math.abs(normal[0])>.5?new THREE.Vector2(p[2],p[1]):Math.abs(normal[1])>.5?new THREE.Vector2(p[0],p[2]):new THREE.Vector2(p[0],p[1]));
    const tris=THREE.ShapeUtils.triangulateShape(flat,[]);
    const ii=[];for(let [a,b,c] of tris){
      const u=V(...points[b]).sub(V(...points[a])),v=V(...points[c]).sub(V(...points[a]));
      if(u.cross(v).dot(V(...normal))<0)[b,c]=[c,b];ii.push(a,b,c)
    }
    this.part(points.flat(),points.flatMap(()=>normal),uv.flat(),ii,s);
  }
  // Profile in [depth, height] order, counter-clockwise from the lower rear corner.
  profile(p,w,side,edge,center=0){
    const zs=p.map(a=>a[0]),ys=p.map(a=>a[1]);const z0=Math.min(...zs),dz=Math.max(...zs)-z0,y0=Math.min(...ys),dy=Math.max(...ys)-y0;
    for(const sign of [-1,1]){const x=center+sign*w/2;
      this.poly(p.map(([z,y])=>[x,y,z]),[sign,0,0],p.map(([z,y])=>[sign>0?1-(z-z0)/dz:(z-z0)/dz,(y-y0)/dy]),side);
    }
    for(let i=0;i<p.length;i++){const [z,y]=p[i],[z2,y2]=p[(i+1)%p.length];this.face([center-w/2,y,z],[center+w/2,y,z],[center+w/2,y2,z2],[center-w/2,y2,z2],Array.isArray(edge)?edge[i]:edge)}
  }
  // A sign or carved panel extruded along Z. Outline points run CCW viewed from the front.
  outline(p,z,d,front,edge,back=edge){
    const xs=p.map(a=>a[0]),ys=p.map(a=>a[1]);const x0=Math.min(...xs),y0=Math.min(...ys),w=Math.max(...xs)-x0,h=Math.max(...ys)-y0;
    for(const sign of [-1,1])this.poly(p.map(([x,y])=>[x,y,z+sign*d/2]),[0,0,sign],p.map(([x,y])=>[(sign>0?(x-x0)/w:1-(x-x0)/w),(y-y0)/h]),sign>0?front:back);
    for(let i=0;i<p.length;i++){const [x,y]=p[i],[xx,yy]=p[(i+1)%p.length];this.face([x,y,z-d/2],[xx,yy,z-d/2],[xx,yy,z+d/2],[x,y,z+d/2],edge)}
  }
  disc(x,y,z,r,s,segs=36,rx=0,ry=0){
    this.at(x,y,z,ry,()=>{const p=[0,0,0],n=[0,0,1],uv=[.5,.5],ii=[];for(let i=0;i<=segs;i++){const q=i*Math.PI*2/segs,xx=Math.cos(q),yy=Math.sin(q);p.push(r*xx,r*yy,0);n.push(0,0,1);uv.push(.5+xx*.5,.5+yy*.5);if(i)ii.push(0,i,i+1)}this.part(p,n,uv,ii,s)},rx);
  }
  // The curved glass rises into the fascia at the corners, with smoothly varying normals.
  crt(x,y,z,w,h,curve,s,rx=0,round=.08){
    this.at(x,y,z,0,()=>{
      const p=[],n=[],uv=[],ii=[],nu=22,nv=16;
      for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){
        const u=i/nu,v=j/nv,a=2*u-1,b=2*v-1;
        const xx=a*w*.5*(1-round*Math.pow(Math.abs(b),5)),yy=b*h*.5*(1-round*Math.pow(Math.abs(a),5));
        const zz=curve*(1-.54*a*a-.46*b*b);
        p.push(xx,yy,zz);const norm=V(curve*2.16*a/w,curve*1.84*b/h,1).normalize();n.push(norm.x,norm.y,norm.z);uv.push(u,v);
      }
      for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){const p0=j*(nu+1)+i;ii.push(p0,p0+1,p0+nu+2,p0,p0+nu+2,p0+nu+1)}
      this.part(p,n,uv,ii,s);
    },rx);
  }
}
