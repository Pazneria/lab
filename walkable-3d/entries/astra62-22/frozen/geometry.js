import * as T from './vendor/three.module.min.js';

export const PI = Math.PI, TAU = PI * 2;
export const V = a => new T.Vector3(...a);
export const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
export const mix = (a,b,t) => a+(b-a)*t;
export function randomSeed(seed) {
  return () => {seed = (Math.imul(seed,1664525)+1013904223) >>> 0; return seed/4294967296;};
}
const identity = new T.Matrix4(), unit = [1,1,1], zero = [0,0,0];
const cache = new Map();
function cached(key,make) {
  if (!cache.has(key)) cache.set(key,make());
  return cache.get(key);
}
function transform(p,rot,scale) {
  const q = rot.isQuaternion ? rot : new T.Quaternion().setFromEuler(new T.Euler(...rot));
  return new T.Matrix4().compose(V(p),q,V(scale));
}
function boxGeometry(w,h,d) {
  return cached('b'+[w,h,d],()=>{
    const g=new T.BoxGeometry(w,h,d), pos=g.attributes.position, norm=g.attributes.normal, uv=g.attributes.uv;
    for(let i=0;i<pos.count;i++){
      const n=[norm.getX(i),norm.getY(i),norm.getZ(i)], pt=[pos.getX(i),pos.getY(i),pos.getZ(i)];
      const axes=[0,1,2].filter(j=>Math.abs(n[j])<.5).sort((a,b)=>[w,h,d][b]-[w,h,d][a]);
      uv.setXY(i,pt[axes[0]],pt[axes[1]]);
    }
    return g;
  });
}
export class Builder {
  constructor(materials) {
    this.m=materials; this.matrix=identity; this.zone='fitting'; this.batches=new Map(); this.blocks=[];
  }
  local(p,rot,fn,scale=unit) {
    const before=this.matrix;
    this.matrix=before.clone().multiply(transform(p,rot,scale));
    try {fn();} finally {this.matrix=before;}
  }
  put(g,mat,col='#ffffff',p=zero,rot=zero,scale=unit,cast=true) {
    if(!this.m[mat]) throw Error('Unknown material '+mat);
    const key=this.zone+'|'+mat+'|'+(cast?1:0);
    if(!this.batches.has(key))this.batches.set(key,{zone:this.zone,mat,cast,items:[]});
    this.batches.get(key).items.push({g,m:this.matrix.clone().multiply(transform(p,rot,scale)),c:new T.Color(col)});
  }
  box(p,size,mat,col,rot=zero,cast=true) {this.put(boxGeometry(...size),mat,col,p,rot,unit,cast);}
  cyl(p,top,bottom,h,mat,col,n=20,rot=zero,cast=true) {
    const g=cached('c'+[top,bottom,h,n],()=>new T.CylinderGeometry(top,bottom,h,n));
    this.put(g,mat,col,p,rot,unit,cast);
  }
  oval(p,size,mat,col,n=20,rot=zero) {
    this.put(cached('s'+n,()=>new T.SphereGeometry(1,n,Math.max(6,Math.floor(n/2)))),mat,col,p,rot,size);
  }
  torus(p,major,minor,mat,col,rot=zero,n=40) {
    this.put(cached('t'+[major,minor,n],()=>new T.TorusGeometry(major,minor,6,n)),mat,col,p,rot);
  }
  lathe(p,profile,mat,col,n=28,rot=zero) {
    this.put(new T.LatheGeometry(profile.map(([r,y])=>new T.Vector2(r,y)),n),mat,col,p,rot);
  }
  rod(a,b,r,mat,col,n=8,r2=r) {
    const av=V(a), bv=V(b), delta=bv.clone().sub(av),len=delta.length();
    if(len<.00001)return;
    const q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());
    this.cyl(av.lerp(bv,.5).toArray(),r2,r,len,mat,col,n,q);
  }
  curve(points,r,mat,col,segments=0,sides=6,closed=false) {
    const path=new T.CatmullRomCurve3(points.map(V),closed,'centripetal');
    this.put(new T.TubeGeometry(path,segments||Math.max(points.length*3,10),r,sides,closed),mat,col);
  }
  surface(nu,nv,fn,mat,col,cast=true) {
    const p=[],uv=[],indices=[];
    for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){
      const u=i/nu,v=j/nv, point=fn(u,v);
      p.push(point[0],point[1],point[2]);uv.push(point[3]??u,point[4]??v);
    }
    for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){
      const a=j*(nu+1)+i,b=a+1,d=a+nu+1,c=d+1;indices.push(a,b,d,b,c,d);
    }
    const g=new T.BufferGeometry();
    g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();
    this.put(g,mat,col,zero,zero,unit,cast);
  }
  tile(p,w,h,mat,rect,rot=zero,col='#ffffff') {
    const g=new T.PlaneGeometry(w,h),uv=g.attributes.uv;
    for(let i=0;i<uv.count;i++)uv.setXY(i,mix(rect[0],rect[2],uv.getX(i)),mix(rect[1],rect[3],uv.getY(i)));
    this.put(g,mat,col,p,rot,unit,false);
  }
  block(x,z,w,d) {this.blocks.push({x,z,w,d});}
  finish(scene) {
    const pos=new T.Vector3(), nor=new T.Vector3(), normalMatrix=new T.Matrix3();
    for(const batch of this.batches.values()){
      let nv=0,ni=0;
      for(const {g} of batch.items){nv+=g.attributes.position.count;ni+=g.index?.count??g.attributes.position.count;}
      const coords=new Float32Array(nv*3), normals=new Float32Array(nv*3), colors=new Float32Array(nv*3), tex=new Float32Array(nv*2);
      const idx=nv>65535?new Uint32Array(ni):new Uint16Array(ni);
      let offset=0,k=0;
      for(const {g,m,c} of batch.items){
        const a=g.attributes; normalMatrix.getNormalMatrix(m);
        for(let i=0;i<a.position.count;i++){
          const j=offset+i;
          pos.fromBufferAttribute(a.position,i).applyMatrix4(m).toArray(coords,j*3);
          nor.fromBufferAttribute(a.normal,i).applyNormalMatrix(normalMatrix).toArray(normals,j*3);
          let occlusion=1;
          if(batch.zone==='Archive cases'){
            const depth=clamp((-3.78-pos.x)/.80,0,1);
            occlusion-=depth*.24+Math.max(0,-nor.y)*depth*.10;
          }
          if(batch.zone==='The sounding mantle'&&pos.y<1.70){
            const radius=Math.hypot(pos.x+.67,pos.z+11.42);
            occlusion-=.13*clamp((.76-radius)/.53,0,1)*clamp((1.70-pos.y)/.48,0,1);
          }
          colors[j*3]=c.r*occlusion;colors[j*3+1]=c.g*occlusion;colors[j*3+2]=c.b*occlusion;
          tex[j*2]=a.uv?.getX(i)??0;tex[j*2+1]=a.uv?.getY(i)??0;
        }
        const nn=g.index?.count??a.position.count;
        for(let i=0;i<nn;i++)idx[k++]=offset+(g.index?g.index.array[i]:i);
        offset+=a.position.count;
      }
      const g=new T.BufferGeometry();
      g.setAttribute('position',new T.BufferAttribute(coords,3));g.setAttribute('normal',new T.BufferAttribute(normals,3));
      g.setAttribute('color',new T.BufferAttribute(colors,3));g.setAttribute('uv',new T.BufferAttribute(tex,2));g.setIndex(new T.BufferAttribute(idx,1));g.computeBoundingSphere();
      const mesh=new T.Mesh(g,this.m[batch.mat]);mesh.name=batch.zone+' / '+batch.mat;mesh.castShadow=batch.cast;mesh.receiveShadow=true;
      mesh.matrixAutoUpdate=false; scene.add(mesh);
    }
    this.batches.clear();cache.clear();
  }
}

