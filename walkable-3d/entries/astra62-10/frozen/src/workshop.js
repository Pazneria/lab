import * as T from '../vendor/three.module.min.js';

export const TAU = 2 * Math.PI;
export function rng(seed) {
  let s=seed>>>0;
  return () => { s=(Math.imul(s,1664525)+1013904223)>>>0; return s/4294967296; };
}
export const pick=(a,r)=>a[Math.floor(r()*a.length)];
export const mix=(a,b,t)=>a+(b-a)*t;
const v=(x,y,z)=>new T.Vector3(x,y,z);
const identity=new T.Matrix4();
const boxFaces=[[4,5,7,6],[5,1,3,7],[1,0,2,3],[0,4,6,2],[6,7,3,2],[0,1,5,4]];
const basicUV=[[0,0],[1,0],[1,1],[0,1]];
export class Workshop {
  constructor(materials) {
    this.materials=materials;this.batches=new Map();this.colors=new Map();
    this.matrix=identity.clone();this.normal=new T.Matrix3();this.solids=[];this.serial=0;
    this.zone='hall';this.cast=true;this.receive=true;
  }
  scoped(matrix,fn) {
    const prev=this.matrix,norm=this.normal;
    this.matrix=prev.clone().multiply(matrix);this.normal=new T.Matrix3().getNormalMatrix(this.matrix);
    try {fn();} finally {this.matrix=prev;this.normal=norm;}
  }
  at(x,y,z,ry,fn) {this.pose(x,y,z,0,ry,0,fn);}
  pose(x,y,z,rx,ry,rz,fn) {
    this.scoped(new T.Matrix4().compose(v(x,y,z),new T.Quaternion().setFromEuler(new T.Euler(rx,ry,rz,'YXZ')),v(1,1,1)),fn);
  }
  batch(mat) {
    const key=[this.zone,mat,this.cast?1:0,this.receive?1:0].join('.');
    let b=this.batches.get(key);
    if(!b){b={mat,p:[],n:[],u:[],c:[],i:[],cast:this.cast,receive:this.receive};this.batches.set(key,b);}
    return b;
  }
  color(c) {
    if(c?.isColor) return c;
    if(!this.colors.has(c))this.colors.set(c,new T.Color(c));
    return this.colors.get(c);
  }
  vertex(b,p,n,uv,c) {
    const m=this.matrix.elements,k=this.normal.elements,x=p[0],y=p[1],z=p[2];
    b.p.push(m[0]*x+m[4]*y+m[8]*z+m[12],m[1]*x+m[5]*y+m[9]*z+m[13],m[2]*x+m[6]*y+m[10]*z+m[14]);
    const [a,d,e]=n;b.n.push(k[0]*a+k[3]*d+k[6]*e,k[1]*a+k[4]*d+k[7]*e,k[2]*a+k[5]*d+k[8]*e);
    b.u.push(uv[0],uv[1]);b.c.push(c.r,c.g,c.b);
  }
  face(mat,points,col='#ffffff',uv=basicUV,normals=null,cols=null) {
    const b=this.batch(mat),base=b.p.length/3,c=this.color(col);
    let n;
    if(!normals){
      const [a,b,c]=points; const ax=b[0]-a[0],ay=b[1]-a[1],az=b[2]-a[2],bx=c[0]-a[0],by=c[1]-a[1],bz=c[2]-a[2];
      const x=ay*bz-az*by,y=az*bx-ax*bz,z=ax*by-ay*bx,l=Math.hypot(x,y,z)||1;
      n=[x/l,y/l,z/l];
    }
    for(let i=0;i<points.length;i++)this.vertex(b,points[i],normals?normals[i]:n,uv[i],cols?this.color(cols[i]):c);
    for(let i=2;i<points.length;i++)b.i.push(base,base+i-1,base+i);
  }
  box(mat,x,y,z,w,h,d,col='#ffffff',options={}) {
    const pts=[];
    for(let i=0;i<8;i++)pts.push([x+((i&1)?w:-w)/2,y+((i&2)?h:-h)/2,z+((i&4)?d:-d)/2]);
    const dims=[[w,h],[d,h],[w,h],[d,h],[w,d],[w,d]];
    const serial=++this.serial,u0=(serial*.271827)%1,v0=(serial*.618034)%1;
    for(let i=0;i<6;i++) {
      if(options.skip?.includes(i))continue;
      const [a,b]=dims[i];let uv=basicUV;
      if(mat==='wood'||mat==='paint') {
        const alongA=options.grain==='vertical'?(i>=4):a>=b;
        uv=basicUV.map(([s,t])=>alongA?[u0+s*a/3.25,v0+t*b/.81]:[u0+t*b/3.25,v0+s*a/.81]);
      } else if(['stone','plaster','hide','ground','pages'].includes(mat)) {
        const scale=mat==='pages'?.34:mat==='hide'?.62:mat==='ground'?4.5:2.45;
        uv=basicUV.map(([s,t])=>[u0+s*a/scale,v0+t*b/scale]);
      }
      this.face(mat,boxFaces[i].map(j=>pts[j]),col,uv);
    }
  }
  panel(mat,x,y,z,w,h,col='#ffffff',uv=basicUV) {
    this.face(mat,[[x-w/2,y-h/2,z],[x+w/2,y-h/2,z],[x+w/2,y+h/2,z],[x-w/2,y+h/2,z]],col,uv);
  }
  beam(mat,a,b,w,d,col) {
    const A=v(...a),B=v(...b),D=B.clone().sub(A),L=D.length();if(L<.00001)return;
    const q=new T.Quaternion().setFromUnitVectors(v(0,1,0),D.normalize());
    this.scoped(new T.Matrix4().compose(A.addScaledVector(D,L/2),q,v(1,1,1)),()=>this.box(mat,0,0,0,w,L,d,col));
  }
  rod(mat,a,b,r0,r1,col,segments=10) {
    const D=v(...b).sub(v(...a)),len=D.length();if(len<.00001)return;D.normalize();
    const A=v(...a),B=v(...b);
    const s=v(0,1,0);if(Math.abs(D.y)>.92)s.set(0,0,1);
    const X=s.cross(D).normalize(),Z=D.clone().cross(X).normalize();
    const points=[],normals=[],top=[];
    for(let i=0;i<segments;i++){
      const t=TAU*i/segments,N=X.clone().multiplyScalar(Math.cos(t)).addScaledVector(Z,Math.sin(t));
      points.push(A.clone().addScaledVector(N,r0).toArray());top.push(B.clone().addScaledVector(N,r1).toArray());
      normals.push(N.addScaledVector(D,(r0-r1)/len).normalize().toArray());
    }
    for(let i=0;i<segments;i++){
      const j=(i+1)%segments;
      this.face(mat,[points[i],points[j],top[j],top[i]],col,[[i/segments,0],[(i+1)/segments,0],[(i+1)/segments,len], [i/segments,len]],[normals[i],normals[j],normals[j],normals[i]]);
    }
    for(let i=1;i<segments-1;i++){
      this.face(mat,[points[0],points[i+1],points[i]],col);this.face(mat,[top[0],top[i],top[i+1]],col);
    }
  }
  turn(mat,x,y,z,profile,col,n=14) {
    for(let i=1;i<profile.length;i++)this.rod(mat,[x,y+profile[i-1][0],z],[x,y+profile[i][0],z],profile[i-1][1],profile[i][1],col,n);
  }
  soft(mat,x,y,z,w,h,d,e,col,segments=20,rows=12,wear=0) {
    const sp=(a,b)=>Math.sign(a)*Math.abs(a)**b;
    const base=this.color(col),faded=base.clone().lerp(new T.Color('#ebc29c'),wear);
    const at=(i,j)=>{
      const phi=-Math.PI/2+Math.PI*j/rows,theta=TAU*i/segments;
      const a=Math.cos(phi),b=Math.sin(phi),c=Math.cos(theta),s=Math.sin(theta);
      const u=sp(a,e)*sp(c,e),vv=sp(b,e),zz=sp(a,e)*sp(s,e);
      const n=v(sp(a,2-e)*sp(c,2-e)/w,sp(b,2-e)/h,sp(a,2-e)*sp(s,2-e)/d).normalize();
      const burnish=(Math.max(0,vv)*.35+Math.abs(u*zz)*.65)*(0.85+.15*Math.sin(11*theta));
      return {p:[x+u*w/2,y+vv*h/2,z+zz*d/2],n:n.toArray(),uv:[i/segments*(w+d)*2,j/rows*(h+d)],c:base.clone().lerp(faded,burnish)};
    };
    for(let j=0;j<rows;j++)for(let i=0;i<segments;i++){
      const p=[at(i,j),at(i,j+1),at(i+1,j+1),at(i+1,j)];
      this.face(mat,p.map(k=>k.p),col,p.map(k=>k.uv),p.map(k=>k.n),p.map(k=>k.c));
    }
  }
  solid(x,z,w,d,y0,y1,tag='furniture') {
    const p=v(x,y0,z).applyMatrix4(this.matrix),m=this.matrix.elements;
    this.solids.push({x:p.x,z:p.z,hw:w/2,hd:d/2,c:m[0],s:m[8],lo:p.y,hi:p.y+y1-y0,tag});
  }
  finish(scene) {
    const stats={batches:0,triangles:0,vertices:0};
    for(const [key,b] of this.batches){
      const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(b.p,3));
      g.setAttribute('normal',new T.Float32BufferAttribute(b.n,3));g.setAttribute('uv',new T.Float32BufferAttribute(b.u,2));
      g.setAttribute('color',new T.Float32BufferAttribute(b.c,3));g.setIndex(b.i);g.computeBoundingSphere();
      const mat=this.materials[b.mat];if(!mat)throw new Error('Missing material '+b.mat);
      const mesh=new T.Mesh(g,mat);mesh.name=key;mesh.castShadow=b.cast;mesh.receiveShadow=b.receive;
      scene.add(mesh);stats.batches++;stats.triangles+=b.i.length/3;stats.vertices+=b.p.length/3;
    }
    this.batches.clear();return stats;
  }
}
