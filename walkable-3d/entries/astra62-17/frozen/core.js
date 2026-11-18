/* Static geometry builder. Furniture and architecture share material batches. */
(function(){
'use strict';
const T=THREE, PI=Math.PI, TAU=2*PI, V=(a)=>new T.Vector3(...a);
const scene=new T.Scene(), manager=new T.LoadingManager(), loader=new T.TextureLoader(manager);
const mats={}, textures={}, bins=new Map(), solids=[], stories=[], animations=[];
let seed=17041961, space='main', current=new T.Matrix4();
const rnd=(a=0,b=1)=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return a+(b-a)*(seed/4294967296)};
const pick=a=>a[Math.floor(rnd(0,a.length))];
const mix=(a,b,t)=>new T.Color(a).lerp(new T.Color(b),t);
const tint=(a,amount=.08)=>new T.Color(a).multiplyScalar(rnd(1-amount,1+amount));
const standard=(name,props={})=>mats[name]=new T.MeshStandardMaterial({name,vertexColors:true,roughness:.85,envMapIntensity:.35,...props});
function textureSetup(t,color=true,repeat=true){t.colorSpace=color?T.SRGBColorSpace:T.NoColorSpace;t.wrapS=t.wrapT=repeat?T.RepeatWrapping:T.ClampToEdgeWrapping;t.anisotropy=4;return t}
for(const [k,src] of Object.entries(window.ROOM_SURFACES)){
 const map=textureSetup(loader.load('data:image/png;base64,'+src[0])), normalMap=textureSetup(loader.load('data:image/png;base64,'+src[1]),false);
 textures[k]=map;
 standard(k,{map,normalMap,normalScale:new T.Vector2(.59,.59),roughness:({timber:.73,leather:.60,metal:.51,wool:.99})[k]||.91,metalness:k==='metal'?.50:0,side:T.DoubleSide});
}
standard('plain',{side:T.DoubleSide});standard('glaze',{roughness:.28,metalness:.05,envMapIntensity:.85,side:T.DoubleSide});
standard('paper',{roughness:.96,side:T.DoubleSide});standard('iron',{roughness:.67,metalness:.36});
standard('leaf',{roughness:.84,side:T.DoubleSide});standard('thread',{roughness:1,side:T.DoubleSide});
standard('warm',{color:0xffcf8b,emissive:0xffa13a,emissiveIntensity:1.45,roughness:.4});
standard('coal',{color:0xff7b26,emissive:0xee4010,emissiveIntensity:.92});
const repeats={timber:[1.34,.53],wool:[.43,.43],leather:[.39,.39],plaster:[1.47,1.47],stone:[.67,.58],metal:[.39,.38]};
function canvasMat(name,w,h,draw,props={}){
 const el=document.createElement('canvas');el.width=w;el.height=h;draw(el.getContext('2d'),w,h);
 const tex=textureSetup(new T.CanvasTexture(el),true,false);textures[name]=tex;
 return standard(name,{map:tex,side:T.DoubleSide,roughness:.93,...props})
}
function region(s,fn){const prev=space;space=s;try{fn()}finally{space=prev}}
function matrix(x=0,y=0,z=0,rx=0,ry=0,rz=0,sx=1,sy=1,sz=1){
 return new T.Matrix4().compose(new T.Vector3(x,y,z),new T.Quaternion().setFromEuler(new T.Euler(rx,ry,rz,'YXZ')),new T.Vector3(sx,sy,sz))
}
function local(m,fn){const old=current;current=old.clone().multiply(m);try{fn()}finally{current=old}}
function at(x,y,z,yaw,fn,pitch=0,roll=0){local(matrix(x,y,z,pitch,yaw,roll),fn)}
const pos=new T.Vector3(),norm=new T.Vector3();
function emit(geometry,material,color='#ffffff',m,uvf,shade){
 const mat=typeof material==='string'?mats[material]:material;if(!mat)throw Error('Unknown material '+material);
 const key=space+'|'+mat.uuid;
 if(!bins.has(key))bins.set(key,{mat,space,p:[],n:[],u:[],c:[],i:[]});const bin=bins.get(key);
 const tr=m?current.clone().multiply(m):current, nm=new T.Matrix3().getNormalMatrix(tr),col=new T.Color(color);
 const {position:a,normal:n,uv:u}=geometry.attributes,base=bin.p.length/3;
 if(!n)throw Error('Missing normals: '+material);
 for(let i=0;i<a.count;i++){
  const x=a.getX(i),y=a.getY(i),z=a.getZ(i),nx=n.getX(i),ny=n.getY(i),nz=n.getZ(i);
  pos.set(x,y,z).applyMatrix4(tr);norm.set(nx,ny,nz).applyMatrix3(nm).normalize();bin.p.push(pos.x,pos.y,pos.z);bin.n.push(norm.x,norm.y,norm.z);
  const uv=uvf?uvf(x,y,z,nx,ny,nz,i):u?[u.getX(i),u.getY(i)]:[0,0];bin.u.push(uv[0],uv[1]);
  let ao=shade?shade(x,y,z,nx,ny,nz,i):1;
  if(space!=='vista'&&mat.userData.unshaded!==true){ao*=.9+.1*Math.min(1,Math.max(0,pos.y)/.75);if(norm.y<-.5)ao*=.90}
  bin.c.push(col.r*ao,col.g*ao,col.b*ao);
 }
 const ix=geometry.index;if(ix)for(let i=0;i<ix.count;i++)bin.i.push(base+ix.getX(i));else for(let i=0;i<a.count;i++)bin.i.push(base+i);
}
function finish(){
 let triangles=0,vertices=0;const counts={};
 for(const b of bins.values()){
  const baked=window.ROOM_SHADE?.[b.space+' / '+b.mat.name];if(baked){const values=atob(baked);if(values.length===b.c.length/3){for(let j=0;j<values.length;j++){const q=values.charCodeAt(j)/255;b.c[j*3]*=q;b.c[j*3+1]*=q;b.c[j*3+2]*=q}}} const geom=new T.BufferGeometry();geom.setAttribute('position',new T.Float32BufferAttribute(b.p,3));geom.setAttribute('normal',new T.BufferAttribute(Int16Array.from(b.n,v=>Math.round(Math.max(-1,Math.min(1,v))*32767)),3,true));geom.setAttribute('uv',new T.Float32BufferAttribute(b.u,2));geom.setAttribute('color',new T.BufferAttribute(Uint16Array.from(b.c,v=>Math.round(Math.max(0,Math.min(1,v))*65535)),3,true));geom.setIndex(b.i);geom.computeBoundingSphere();
  const mesh=new T.Mesh(geom,b.mat);mesh.name=b.space+' / '+b.mat.name;mesh.castShadow=b.space!=='vista'&&!b.mat.userData.noCast;mesh.receiveShadow=b.space!=='vista';scene.add(mesh);
  triangles+=b.i.length/3;vertices+=b.p.length/3;counts[b.space]=(counts[b.space]||0)+1
 }
 const stats={staticBatches:bins.size,triangles,vertices,regions:counts};bins.clear();return stats
}
const cube=new T.BoxGeometry(1,1,1),uvcache=new Map();
function box(x,y,z,w,h,d,mat,col,rx=0,ry=0,rz=0,opt={}){
 const tex=repeats[mat],off=tex?rnd():0,ofv=tex?rnd():0;const dims=[w,h,d];
 function uv(a,b,c,nx,ny,nz){const axis=Math.abs(nx)>.9?0:Math.abs(ny)>.9?1:2,axes=axis===0?[2,1]:axis===1?[0,2]:[0,1];if(mat==='timber'&&dims[axes[0]]<dims[axes[1]])axes.reverse();
 const p=[a*w,b*h,c*d];return[p[axes[0]]/tex[0]+off,p[axes[1]]/tex[1]+ofv]}
 let shape=cube;const floorBoard=mat==='timber'&&Math.abs(y+.026)<.001&&h<.054;const largePanel=mat==='plaster'||(mat==='timber'&&Math.max(w,h,d)>.89&&Math.min(w,h,d)>.06);if(floorBoard||largePanel){const size=floorBoard?.155:mat==='plaster'?.206:.32,div=[w,h,d].map(v=>Math.max(1,Math.ceil(v/size))),key=div.join(',');shape=uvcache.get(key);if(!shape){shape=new T.BoxGeometry(1,1,1,...div);uvcache.set(key,shape)}} emit(shape,mat,col,matrix(x,y,z,rx,ry,rz,w,h,d),tex?uv:null,opt.shade)
}
function geometry(p,idx,uv,n){const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setIndex(idx);if(uv)g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));if(n)g.setAttribute('normal',new T.Float32BufferAttribute(n,3));else g.computeVertexNormals();return g}
function grid(nu,nv,fn,mat,col,shade){let p=[],u=[],ix=[];for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){const a=i/nu,b=j/nv,v=fn(a,b);p.push(v[0],v[1],v[2]);u.push(v[3]??a,v[4]??b);if(i<nu&&j<nv){const n=j*(nu+1)+i;ix.push(n,n+1,n+nu+1,n+1,n+nu+2,n+nu+1)}}emit(geometry(p,ix,u),mat,col,null,null,shade)}
/* Rounded solid with flat faces, bevel bands and independently scaled grain. */
function rounded(x,y,z,w,h,d,r,mat,col,rx=0,ry=0,rz=0,s=2){
 if(s===2&&r<.016)s=1;const dims=[w,h,d],half=dims.map(v=>v/2),rad=Math.min(r,...half.map(v=>v*.98)),p=[],n=[],u=[],idx=[],tex=repeats[mat]||[1,1],off=rnd();
 const axisCoords=l=>{const a=[];for(let j=0;j<=s;j++)a.push(-l/2+rad*j/s);for(let j=0;j<=s;j++)a.push(l/2-rad+rad*j/s);return a};
 for(let face=0;face<6;face++){const k=face>>1,sign=face%2?1:-1,a=(k+1)%3,b=(k+2)%3,A=axisCoords(dims[a]),B=axisCoords(dims[b]),start=p.length/3;
 for(let j=0;j<B.length;j++)for(let i=0;i<A.length;i++){let v=[0,0,0];v[k]=half[k]*sign;v[a]=A[i];v[b]=B[j];const inner=v.map((t,g)=>Math.max(-half[g]+rad,Math.min(half[g]-rad,t))),dv=v.map((t,g)=>t-inner[g]),len=Math.hypot(...dv)||1;for(let o=0;o<3;o++){p.push(inner[o]+rad*dv[o]/len);n.push(dv[o]/len)}const flip=mat==='timber'&&dims[a]<dims[b];u.push(v[flip?b:a]/tex[0]+off,v[flip?a:b]/tex[1]);if(i<A.length-1&&j<B.length-1){const id=start+j*A.length+i;const q=[id,id+1,id+A.length,id+1,id+A.length+1,id+A.length];idx.push(...(sign===1?q:q.reverse()))}}
 }emit(geometry(p,idx,u,n),mat,col,matrix(x,y,z,rx,ry,rz),null,mat==='timber'?(x,y,z,nx,ny,nz)=>1+.215*(1-Math.max(Math.abs(nx),Math.abs(ny),Math.abs(nz))):null)
}
const cylinderCache=new Map(),sphereCache=new Map();
function cyl(x,y,z,rt,rb,h,mat,col,segments=16,rx=0,ry=0,rz=0){
 const key=[rt,rb,h,segments].join('|');let g=cylinderCache.get(key);if(!g){g=new T.CylinderGeometry(rt,rb,h,segments);cylinderCache.set(key,g)}
 const tx=repeats[mat],off=tx?rnd():0;emit(g,mat,col,matrix(x,y,z,rx,ry,rz),tx?(a,b,c,nx,ny,nz,i)=>Math.abs(ny)>.97?[a/tx[0]+off,c/tx[1]]:mat==='timber'?[b/tx[0]+off,g.attributes.uv.getX(i)*TAU*Math.max(rt,rb)/tx[1]]:[g.attributes.uv.getX(i)*TAU*Math.max(rt,rb)/tx[0]+off,b/tx[1]]:null)
}
function ball(x,y,z,rx,ry,rz,mat,col,segments=16,rings=10,yaw=0,pitch=0,roll=0){
 const k=segments+','+rings;let g=sphereCache.get(k);if(!g){g=new T.SphereGeometry(1,segments,rings);sphereCache.set(k,g)}const tx=repeats[mat];emit(g,mat,col,matrix(x,y,z,pitch,yaw,roll,rx,ry,rz),tx?(a,b,c,nx,ny,nz,i)=>[g.attributes.uv.getX(i)*TAU*(rx+rz)*.5/tx[0],g.attributes.uv.getY(i)*PI*ry/tx[1]]:null)
}
function rod(a,b,ra,rb,mat,col,s=10){const v=V(a),t=V(b),dir=t.clone().sub(v),len=dir.length();if(len<.00001)return;const m=new T.Matrix4().compose(v.lerp(t,.5),new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),dir.normalize()),new T.Vector3(1,1,1));local(m,()=>cyl(0,0,0,rb,ra,len,mat,col,s))}
function beam(a,b,w,d,mat,col){const v=V(a),t=V(b),dir=t.clone().sub(v),len=dir.length();if(!len)return;const m=new T.Matrix4().compose(v.lerp(t,.5),new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),dir.normalize()),new T.Vector3(1,1,1));local(m,()=>box(0,0,0,w,len,d,mat,col))}
function tube(points,r,mat,col,sides=7,steps=null,closed=false){if(points.length<2)return;const curve=new T.CatmullRomCurve3(points.map(V),closed,'centripetal');const g=new T.TubeGeometry(curve,steps||Math.max(10,points.length*3),r,sides,closed);emit(g,mat,col)}
function torus(x,y,z,r,t,mat,col,rx=0,ry=0,rz=0,segs=28){emit(new T.TorusGeometry(r,t,t<.006?4:t<.013?5:7,segs),mat,col,matrix(x,y,z,rx,ry,rz))}
function lathe(x,y,z,profile,mat,col,n=24){const g=new T.LatheGeometry(profile.map(([r,y])=>new T.Vector2(r,y)),n);const tx=repeats[mat];emit(g,mat,col,matrix(x,y,z),tx?(a,b,c,nx,ny,nz,i)=>[g.attributes.uv.getX(i)*.75/tx[0],b/tx[1]]:null)}
const panelGeom=new T.PlaneGeometry(1,1);
function panel(x,y,z,w,h,mat,col='#ffffff',rx=0,ry=0,rz=0){const surface=mat==='rug'?new T.PlaneGeometry(1,1,Math.ceil(w/.13),Math.ceil(h/.13)):panelGeom;emit(surface,mat,col,matrix(x,y,z,rx,ry,rz,w,h,1))}
function poly(points,mat,col,uv){const p=points.flat(),ix=[];for(let i=1;i<points.length-1;i++)ix.push(0,i,i+1);emit(geometry(p,ix,uv||points.flatMap(a=>[a[0]+a[2],a[1]])),mat,col)}
function solid(x,z,w,d,theta=0,tag='furniture'){const pt=new T.Vector3(x,0,z).applyMatrix4(current),dvec=new T.Vector3(0,0,1).transformDirection(current);solids.push({x:pt.x,z:pt.z,w:w/2,d:d/2,yaw:Math.atan2(dvec.x,dvec.z)+theta,tag})}
function story(x,y,z,label,title,body,range=2.1){stories.push({p:new T.Vector3(x,y,z).applyMatrix4(current),label,title,body,range})}
canvasMat('contact',128,128,(c,w,h)=>{const g=c.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);g.addColorStop(0,'rgba(40,24,12,.51)');g.addColorStop(.55,'rgba(48,29,15,.31)');g.addColorStop(1,'rgba(53,35,18,0)');c.fillStyle=g;c.fillRect(0,0,w,h)},{transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});mats.contact.userData.noCast=true;
function shadow(x,y,z,w,d,rot=0){at(x,y+.002,z,rot,()=>panel(0,0,0,w,d,'contact','#ffffff',-PI/2))}
const C={oak:'#91653d',oakLight:'#a97c50',wood:'#604331',beam:'#4e382c',edge:'#735339',iron:'#494540',brass:'#ab8a4d',verdigris:'#697c67',plaster:'#ded2af',linen:'#d9cbaa',moss:'#717653',rust:'#9d523c',hide:'#8a5135',ink:'#393c34'};
window.Room={T,PI,TAU,C,scene,manager,mats,textures,solids,stories,animations,rnd,pick,mix,tint,standard,canvasMat,textureSetup,region,at,local,matrix,emit,finish,box,rounded,cyl,ball,rod,beam,tube,torus,lathe,panel,poly,grid,geometry,solid,story,shadow};
})();
