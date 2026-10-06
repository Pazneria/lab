import * as THREE from 'three';
import {mergeGeometries,mergeVertices} from 'three/addons/utils/BufferGeometryUtils.js';
export function broadLeaf(kind=0,variant=0,resolution=1){
 const p=[],uv=[],ix=[];const rows=resolution===0?12:kind===1?48:32,cols=resolution===0?6:kind===1?24:12;
 for(let j=0;j<=rows;j++){let t=j/rows;let w=Math.pow(Math.sin(Math.PI*t),kind===1?.57:.76)*.5;
  for(let i=0;i<=cols;i++){let q=i/cols*2-1;let damage=1;
   if(kind===0&&resolution!==0&&j>8&&j<36&&((j+variant*3)%9===0))damage=1-Math.pow(Math.abs(q),5)*.28;
   p.push(q*w*damage,.10*Math.sin(t*Math.PI)-.12*t*t + .045*q*q*Math.sin(t*Math.PI)+.003*Math.sin(t*57+q*3)*Math.abs(q),t);
   uv.push(q*.5+.5,t);
  }
 }
 for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){
  let q=(i+.5)/cols*2-1,t=(j+.5)/rows;
  if(kind===1){let hole=false;for(let k=0;k<3;k++){const tc=.27+k*.185;for(let sign of [-1,1])if(((q-sign*.32)/.12)**2+((t-tc)/.038)**2<1)hole=true;}for(let k=0;k<4;k++){const split=.25+k*.155+.055*(Math.abs(q)-.45)+(q<0?.02:0);if(Math.abs(q)>.48&&Math.abs(t-split)<.009+.013*Math.abs(q))hole=true;}if(hole)continue;}
  const a=j*(cols+1)+i,b=a+1,c=a+cols+1,d=c+1;ix.push(a,c,b,b,c,d);
 }
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();return g;
}
export function pinnate(palm=false){
 const p=[],uv=[],ix=[];const length=palm?1.7:1;const count=palm?26:16;
 function point(x,y,z,u,v){let n=p.length/3;p.push(x,y,z);uv.push(u,v);return n;}
 function blade(base,tip,w,curve){let a=[];for(let j=0;j<=6;j++){let t=j/6;let ww=Math.sin(t*Math.PI)*w;const d=new THREE.Vector3().subVectors(tip,base).normalize();let side=new THREE.Vector3(d.z,0,-d.x);const center=new THREE.Vector3().lerpVectors(base,tip,t);center.y+=Math.sin(t*Math.PI)*curve;for(let s of [-1,1])a.push(point(center.x+side.x*ww*s,center.y+ww*.14,center.z+side.z*ww*s,(s+1)/2,t));}for(let j=0;j<6;j++){let n=j*2;ix.push(a[n],a[n+2],a[n+1],a[n+1],a[n+2],a[n+3]);}}
 for(let i=0;i<count;i++){let t=.04+i/count*.92;let z=t*length,y=Math.sin(t*Math.PI)*.24-t*t*.13;for(let s of [-1,1]){let spread=(palm?.54:.34)*Math.pow(Math.sin(t*Math.PI),.6);let b=new THREE.Vector3(0,y,z),end=new THREE.Vector3(s*spread,y-(palm?.11:.02),z+(palm?.25:.12));blade(b,end,palm?.026:.035,palm?.06:.045);}}
 blade(new THREE.Vector3(0,0,0),new THREE.Vector3(0,-.13,length),.011,.30);
 let g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();return g;
}
export function monsteraLeaf(variant=0){
 const edge=new THREE.Shape();edge.moveTo(0,.055);edge.bezierCurveTo(.14,-.09,.40,-.04,.46,.14);edge.quadraticCurveTo(.49,.22,.45,.29);edge.quadraticCurveTo(.29,.28,.15,.31);edge.quadraticCurveTo(.32,.31,.44,.35);edge.quadraticCurveTo(.48,.42,.42,.50);edge.quadraticCurveTo(.26,.44,.12,.47);edge.quadraticCurveTo(.29,.50,.37,.55);edge.quadraticCurveTo(.40,.62,.33,.67);edge.quadraticCurveTo(.22,.60,.09,.62);edge.quadraticCurveTo(.24,.68,.28,.73);edge.quadraticCurveTo(.29,.80,.19,.84);edge.quadraticCurveTo(.12,.75,.06,.78);edge.quadraticCurveTo(.16,.87,.13,.90);edge.quadraticCurveTo(.07,.96,0,1.03);
 const points=edge.getPoints(7);const outline=[...points,...points.slice(1,-1).reverse().map(p=>new THREE.Vector2(-p.x,p.y+.012*Math.sin(p.y*8)))];const shape=new THREE.Shape(outline);
 for(let s of [-1,1])for(let k=0;k<3;k++){const hole=new THREE.Path();hole.absellipse(s*(.13-k*.027),.16+k*.175,.030-k*.004,.053-k*.010,0,Math.PI*2,true,s*.22);shape.holes.push(hole);}
 const raw=new THREE.ShapeGeometry(shape,12).toNonIndexed();const src=raw.attributes.position.array;const p=[],uv=[];
 function emit(a,b,c){for(const v of [a,c,b]){let x=v[0],t=v[1];p.push(x,.09*Math.sin(t*Math.PI)-.14*t*t+.19*x*x+.009*Math.sin(x*12+t*7+variant),t-.055);uv.push(x+.5,t/1.05);}}
 for(let i=0;i<src.length;i+=9){const a=[src[i],src[i+1]],b=[src[i+3],src[i+4]],c=[src[i+6],src[i+7]],ab=[(a[0]+b[0])/2,(a[1]+b[1])/2],bc=[(b[0]+c[0])/2,(b[1]+c[1])/2],ca=[(c[0]+a[0])/2,(c[1]+a[1])/2];emit(a,ab,ca);emit(ab,b,bc);emit(ca,bc,c);emit(ab,bc,ca);}
 raw.dispose();let g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g=mergeVertices(g);g.computeVertexNormals();return g;
}
export function fanLeaf(){const p=[],uv=[],ix=[];const spokes=18;for(let i=0;i<=spokes*2;i++){let a=-1.16+i/(spokes*2)*2.32;for(let j=0;j<=5;j++){let r=j/5*(i%2?.88:1);p.push(Math.sin(a)*r,.07*Math.sin(r*Math.PI)+(i%2?.012:-.012)*r,Math.cos(a)*r);uv.push(i/(spokes*2),r);}}for(let i=0;i<spokes*2;i++)for(let j=0;j<5;j++){let a=i*6+j,b=a+6;ix.push(a,b,a+1,a+1,b,b+1);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();return g;}
export class Builder{
 constructor(scene){this.scene=scene;this.batches=new Map();this.instances=new Map();this.dummy=new THREE.Object3D();}
 mesh(g,m,pos=[0,0,0],rot=[0,0,0],scale=[1,1,1],color=null,order='XYZ'){let key=g.uuid+'|'+m.uuid;let a=this.instances.get(key);if(!a){a={g,m,items:[]};this.instances.set(key,a);}this.dummy.position.set(...pos);this.dummy.rotation.set(rot[0],rot[1],rot[2],order);this.dummy.scale.set(...scale);this.dummy.updateMatrix();a.items.push({matrix:this.dummy.matrix.clone(),color:color?new THREE.Color(color):new THREE.Color(1,1,1)});}
 unique(g,m){let a=this.batches.get(m.uuid);if(!a){a={m,geo:[]};this.batches.set(m.uuid,a);}a.geo.push(g);}
 tube(points,r,m,segments=24,sides=6){let g=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),segments,r,sides,false);this.unique(g,m);}
 finish(){for(let {g,m,items} of this.instances.values()){let mesh=new THREE.InstancedMesh(g,m,items.length);items.forEach((v,i)=>{mesh.setMatrixAt(i,v.matrix);mesh.setColorAt(i,v.color);});mesh.castShadow=!m.transparent;mesh.receiveShadow=true;mesh.computeBoundingSphere();this.scene.add(mesh);}for(let {m,geo} of this.batches.values()){let merged=mergeGeometries(geo,false);if(merged){let mesh=new THREE.Mesh(merged,m);mesh.castShadow=!m.transparent;mesh.receiveShadow=true;this.scene.add(mesh);}geo.forEach(g=>g.dispose());}}
}
