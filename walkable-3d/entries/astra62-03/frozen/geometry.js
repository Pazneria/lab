import * as THREE from './vendor/three.module.min.js';

export const TAU = Math.PI * 2, PI = Math.PI;
export const add=(a,b)=>a.map((v,i)=>v+b[i]);
export const sub=(a,b)=>a.map((v,i)=>v-b[i]);
export const mul=(a,k)=>a.map(v=>v*k);
export const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
export const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export const unit=a=>{const l=Math.hypot(...a)||1;return mul(a,1/l)};
export const mix=(a,b,t)=>a+(b-a)*t;
export const rad=(a,r,y)=>[r*Math.sin(a),y,r*Math.cos(a)];
export const radial=(a,s=1)=>[Math.sin(a)*s,0,Math.cos(a)*s];
export const tangent=(a,s=1)=>[Math.cos(a)*s,0,-Math.sin(a)*s];
export const UP=[0,1,0],DOWN=[0,-1,0];
export function randomSource(seed){
  return ()=>{seed|=0;seed=seed+0x6d2b79f5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};
}
const vec=a=>new THREE.Vector3(...a);
const transform=(a,m)=>[
  m[0]*a[0]+m[4]*a[1]+m[8]*a[2]+m[12],
  m[1]*a[0]+m[5]*a[1]+m[9]*a[2]+m[13],
  m[2]*a[0]+m[6]*a[1]+m[10]*a[2]+m[14]
];
const direction=(a,m)=>unit([m[0]*a[0]+m[4]*a[1]+m[8]*a[2],m[1]*a[0]+m[5]*a[1]+m[9]*a[2],m[2]*a[0]+m[6]*a[1]+m[10]*a[2]]);
const project=(p,n)=>Math.abs(n[1])>.67?[p[0],-p[2]]:Math.abs(n[0])>Math.abs(n[2])?[p[2],p[1]]:[p[0],p[1]];

// Geometry is accumulated in world coordinates. A material in a region
// takes a single draw call, including all screws or masonry joints in it.
export class Workshop{
  constructor(materials){
    this.materials=materials;this.groups=new Map();this.matrix=new THREE.Matrix4();
    this.region='house';this.cast=true;this.receive=true;
  }
  section(region,cast,fn,receive=true){
    const old=[this.region,this.cast,this.receive];
    this.region=region;this.cast=cast;this.receive=receive;
    try{fn()}finally{[this.region,this.cast,this.receive]=old}
  }
  withMatrix(matrix,fn){
    const old=this.matrix;this.matrix=old.clone().multiply(matrix);
    try{fn()}finally{this.matrix=old}
  }
  at(x,y,z,yaw,fn){
    const mat=new THREE.Matrix4().makeRotationY(yaw);mat.setPosition(x,y,z);this.withMatrix(mat,fn);
  }
  basis(origin,x,y,z,fn){
    const mat=new THREE.Matrix4().makeBasis(vec(x),vec(y),vec(z));mat.setPosition(...origin);this.withMatrix(mat,fn);
  }
  axis(origin,axis,fn){
    const y=unit(axis),z=unit(cross(Math.abs(y[1])>.95?[1,0,0]:UP,y)),x=unit(cross(y,z));
    this.basis(origin,x,y,z,fn);
  }
  batch(mat){
    const key=this.region+'|'+Number(this.cast)+Number(this.receive)+'|'+mat;
    let b=this.groups.get(key);
    if(!b){b={mat,region:this.region,cast:this.cast,receive:this.receive,p:[],n:[],u:[],c:[],idx:[]};this.groups.set(key,b)}
    return b;
  }
  face(mat,points,facing,opts={}){
    const b=this.batch(mat),m=this.matrix.elements,start=b.p.length/3;
    let n=unit(cross(sub(points[1],points[0]),sub(points[2],points[0])));
    const flip=facing && dot(n,facing)<0;
    if(flip)n=mul(n,-1);
    for(let i=0;i<points.length;i++){
      const p=points[i],normal=opts.ns?opts.ns[i]:n,coord=opts.uv?opts.uv[i]:project(p,n);
      const loc=transform(p,m),dir=direction(normal,m);
      const tone=opts.tones?opts.tones[i]:(opts.tone??1);
      const tint=opts.tint||[1,1,1];
      b.p.push(...loc);b.n.push(...dir);b.u.push(...coord);b.c.push(tone*tint[0],tone*tint[1],tone*tint[2]);
    }
    for(let i=1;i<points.length-1;i++)b.idx.push(start,start+(flip?i+1:i),start+(flip?i:i+1));
  }
  box(mat,x,y,z,w,h,d,opts={}){
    const l=x-w/2,r=x+w/2,b=y-h/2,t=y+h/2,f=z+d/2,k=z-d/2;
    this.face(mat,[[l,b,f],[r,b,f],[r,t,f],[l,t,f]],[0,0,1],opts);
    this.face(mat,[[r,b,k],[l,b,k],[l,t,k],[r,t,k]],[0,0,-1],opts);
    this.face(mat,[[r,b,f],[r,b,k],[r,t,k],[r,t,f]],[1,0,0],opts);
    this.face(mat,[[l,b,k],[l,b,f],[l,t,f],[l,t,k]],[-1,0,0],opts);
    this.face(mat,[[l,t,f],[r,t,f],[r,t,k],[l,t,k]],UP,opts);
    this.face(mat,[[l,b,k],[r,b,k],[r,b,f],[l,b,f]],DOWN,opts);
  }
  // A narrow cut on the edges gives exposed stone and cast metal a real
  // highlight. The broad faces retain their planar tool-finished surface.
  hewn(mat,x,y,z,w,h,d,bevel=.018,opts={}){
    const cut=Math.min(bevel,w*.18,h*.23,d*.18),b=y-h/2,t=y+h/2;
    const rim=(inset,level)=>{
      const W=w/2-inset,D=d/2-inset,k=Math.min(cut*.84,W*.28,D*.28);
      return [[-W+k,D],[W-k,D],[W,D-k],[W,-D+k],[W-k,-D],[-W+k,-D],[-W,-D+k],[-W,D-k]].map(([u,v])=>[x+u,level,z+v]);
    };
    const rings=[rim(cut*.56,b),rim(0,b+cut*.64),rim(0,t-cut),rim(cut,t)];
    for(let j=0;j<3;j++)for(let i=0;i<8;i++){
      const k=(i+1)%8,A=rings[j][i],B=rings[j][k],C=rings[j+1][k],D=rings[j+1][i];
      this.face(mat,[A,B,C,D],[(A[0]+B[0])/2-x,0,(A[2]+B[2])/2-z],opts);
    }
    this.face(mat,rings[0],DOWN,opts);this.face(mat,rings[3],UP,opts);
  }
  prism(mat,xz,b,t,opts={}){
    const center=xz.reduce((s,p)=>[s[0]+p[0]/xz.length,s[1]+p[1]/xz.length],[0,0]);
    this.face(mat,xz.map(([x,z])=>[x,t,z]),UP,opts);
    this.face(mat,xz.map(([x,z])=>[x,b,z]),DOWN,opts);
    xz.forEach(([x,z],i)=>{
      const [u,v]=xz[(i+1)%xz.length];
      this.face(mat,[[x,b,z],[u,b,v],[u,t,v],[x,t,z]],[(x+u)/2-center[0],0,(z+v)/2-center[1]],opts);
    });
  }
  beam(mat,a,b,w,d=w,opts={}){
    const h=Math.hypot(...sub(b,a));this.axis(a,sub(b,a),()=>this.box(mat,0,h/2,0,w,h,d,opts));
  }
  cylinder(mat,a,b,ra,rb=ra,steps=20,opts={}){
    const v=sub(b,a),h=Math.hypot(...v);
    this.axis(a,v,()=>this.revolve(mat,[[ra,0],[rb,h]],steps,opts,true));
  }
  revolve(mat,profile,steps=32,opts={},caps=false){
    for(let j=0;j<profile.length-1;j++){
      const [r0,y0]=profile[j],[r1,y1]=profile[j+1];
      const slope=r0-r1,rise=y1-y0;
      for(let i=0;i<steps;i++){
        const a=i*TAU/steps,b=(i+1)*TAU/steps,mid=(a+b)/2;
        const normal=t=>unit([Math.sin(t)*rise,slope,Math.cos(t)*rise]);
        const countOpts={...opts,uv:[[a*r0,y0],[b*r0,y0],[b*r1,y1],[a*r1,y1]]};
        if(!opts.faceted)countOpts.ns=[normal(a),normal(b),normal(b),normal(a)];
        this.face(mat,[rad(a,r0,y0),rad(b,r0,y0),rad(b,r1,y1),rad(a,r1,y1)],normal(mid),countOpts);
      }
    }
    if(caps){
      for(const [r,y,n] of [[...profile[0],DOWN],[...profile.at(-1),UP]]){
        this.face(mat,Array.from({length:steps},(_,i)=>rad(i*TAU/steps,r,y)),n,opts);
      }
    }
  }
  sector(mat,ri,ro,a,b,y0,y1,steps=1,opts={}){
    const p=(t,r,y)=>rad(t,r,y);
    for(let i=0;i<steps;i++){
      const l=mix(a,b,i/steps),r=mix(a,b,(i+1)/steps),t=(l+r)/2;
      const wrap=(R,sgn)=>({...opts,ns:[radial(l,sgn),radial(r,sgn),radial(r,sgn),radial(l,sgn)],uv:[[R*l,y0],[R*r,y0],[R*r,y1],[R*l,y1]]});
      this.face(mat,[p(l,ro,y0),p(r,ro,y0),p(r,ro,y1),p(l,ro,y1)],radial(t),wrap(ro,1));
      if(ri>0)this.face(mat,[p(l,ri,y0),p(r,ri,y0),p(r,ri,y1),p(l,ri,y1)],radial(t,-1),wrap(ri,-1));
      const top=[p(l,ri,y1),p(l,ro,y1),p(r,ro,y1),p(r,ri,y1)];
      if(ri===0)top.pop();
      this.face(mat,top,UP,opts);this.face(mat,top.map(v=>[v[0],y0,v[2]]),DOWN,opts);
    }
    if(Math.abs(b-a)<TAU-.00001){
      for(const [t,s] of [[a,-1],[b,1]])this.face(mat,[p(t,ri,y0),p(t,ro,y0),p(t,ro,y1),p(t,ri,y1)],tangent(t,s),opts);
    }
  }
  torus(mat,R,r,n=64,k=8,opts={}){
    const p=(a,b)=>rad(a,R+r*Math.cos(b),r*Math.sin(b));
    const normal=(a,b)=>rad(a,Math.cos(b),Math.sin(b));
    for(let i=0;i<n;i++)for(let j=0;j<k;j++){
      const a=i*TAU/n,c=(i+1)*TAU/n,b=j*TAU/k,d=(j+1)*TAU/k;
      const angles=[[a,b],[c,b],[c,d],[a,d]];
      this.face(mat,angles.map(v=>p(...v)),normal((a+c)/2,(b+d)/2),{...opts,ns:angles.map(v=>normal(...v)),uv:angles.map(([s,t])=>[s*R,t*r])});
    }
  }
  decal(mat,x,y,z,w,h,opts={}){
    this.face(mat,[[x-w/2,y-h/2,z],[x+w/2,y-h/2,z],[x+w/2,y+h/2,z],[x-w/2,y+h/2,z]],[0,0,1],{...opts,uv:[[0,0],[1,0],[1,1],[0,1]]});
  }
  finish(scene){
    let triangles=0,vertices=0;
    for(const [key,g] of this.groups){
      if(!this.materials[g.mat])throw Error('Unknown surface '+g.mat);
      const geom=new THREE.BufferGeometry();
      geom.setAttribute('position',new THREE.Float32BufferAttribute(g.p,3));
      geom.setAttribute('normal',new THREE.Float32BufferAttribute(g.n,3));
      geom.setAttribute('uv',new THREE.Float32BufferAttribute(g.u,2));
      geom.setAttribute('color',new THREE.Float32BufferAttribute(g.c,3));
      geom.setIndex(g.idx);geom.computeBoundingSphere();
      const mesh=new THREE.Mesh(geom,this.materials[g.mat]);mesh.name=key;mesh.castShadow=g.cast;mesh.receiveShadow=g.receive;scene.add(mesh);
      triangles+=g.idx.length/3;vertices+=g.p.length/3;
    }
    const batches=this.groups.size;this.groups.clear();return {triangles,vertices,batches};
  }
}