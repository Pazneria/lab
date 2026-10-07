import * as THREE from 'three';

// Emberward is deliberately one small, hand-composed walkable building. Repeated
// masonry and fittings are instanced so the dressing stays light on draw calls.
const host = document.querySelector('#view');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1c1714);
scene.fog = new THREE.FogExp2(0x1c1714, 0.0125);
const camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.06, 90);
camera.rotation.order = 'YXZ';
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.65));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
host.appendChild(renderer.domElement);

function tex(kind, seed) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d'); let s = seed >>> 0;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const bases = {stone:'#817568',wood:'#73563a',darkwood:'#3f3027',plaster:'#b9a987',iron:'#49423a',cloth:'#8a6547',straw:'#bd9b5e',char:'#34302d',floor:'#65513b',glow:'#dd7b32'};
  g.fillStyle = bases[kind] || '#776b5b'; g.fillRect(0,0,256,256);
  if (kind === 'wood' || kind === 'darkwood' || kind === 'floor') {
    for(let i=0;i<95;i++){const y=rnd()*256;g.strokeStyle=`rgba(${rnd()>.5?'220,174,111':'24,17,12'},${.025+rnd()*.09})`;g.lineWidth=.4+rnd()*2;g.beginPath();g.moveTo(0,y);g.bezierCurveTo(70,y-8,170,y+9,256,y-4);g.stroke();}
    for(let i=0;i<9;i++){let x=rnd()*256,y=rnd()*256;g.strokeStyle='rgba(29,19,11,.23)';g.lineWidth=1;g.beginPath();g.ellipse(x,y,3+rnd()*11,1+rnd()*3,0,0,Math.PI*2);g.stroke();}
  } else {
    for(let i=0;i<4500;i++){let x=rnd()*256,y=rnd()*256,v=rnd();g.fillStyle=v>.5?`rgba(238,217,181,${rnd()*.13})`:`rgba(20,14,10,${rnd()*.16})`;g.fillRect(x,y,1+rnd()*2,1+rnd()*2);}
    if(kind==='stone'||kind==='char') for(let i=0;i<80;i++){g.fillStyle=`rgba(24,19,16,${.06+rnd()*.12})`;g.beginPath();g.ellipse(rnd()*256,rnd()*256,2+rnd()*12,1+rnd()*5,rnd(),0,Math.PI*2);g.fill();}
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace; t.wrapS=t.wrapT=THREE.RepeatWrapping; t.anisotropy=4; return t;
}
const mats = {
  stone:new THREE.MeshStandardMaterial({map:tex('stone',4),roughness:.96}),
  wood:new THREE.MeshStandardMaterial({map:tex('wood',8),roughness:.86}),
  darkwood:new THREE.MeshStandardMaterial({map:tex('darkwood',16),roughness:.88}),
  plaster:new THREE.MeshStandardMaterial({map:tex('plaster',26),roughness:.99}),
  iron:new THREE.MeshStandardMaterial({map:tex('iron',39),roughness:.48,metalness:.68}),
  cloth:new THREE.MeshStandardMaterial({map:tex('cloth',52),roughness:1}),
  straw:new THREE.MeshStandardMaterial({map:tex('straw',61),roughness:1}),
  char:new THREE.MeshStandardMaterial({map:tex('char',72),roughness:.95}),
  floor:new THREE.MeshStandardMaterial({map:tex('floor',80),roughness:.94}),
  ember:new THREE.MeshStandardMaterial({color:0xff9a45,emissive:0xd84b13,emissiveIntensity:2.5,roughness:.6}),
  water:new THREE.MeshStandardMaterial({color:0x485b59,roughness:.22,metalness:.12}),
  paper:new THREE.MeshStandardMaterial({color:0xd0bd92,roughness:.9}),
  leather:new THREE.MeshStandardMaterial({color:0x563b2b,roughness:.87}),
  brass:new THREE.MeshStandardMaterial({color:0xa7793f,metalness:.68,roughness:.36}),
};
const batches = new Map();
for(const k of ['stone','wood','darkwood','plaster','iron','cloth','straw','char','floor','brass','ember','water','leather']) batches.set(k,[]);
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
function block(kind,pos,size,rot=[0,0,0],color=null){
  const a=batches.get(kind); if(!a) return directBox(kind,pos,size,rot,color);
  a.push({pos,size,rot,color});
}
function directBox(kind,pos,size,rot=[0,0,0],color=null){
  const m=new THREE.Mesh(new THREE.BoxGeometry(...size),mats[kind]);m.position.set(...pos);m.rotation.set(...rot);if(color)m.material=mats[kind];m.castShadow=false;m.receiveShadow=true;scene.add(m);return m;
}
function buildBatches(){
  const unit=new THREE.BoxGeometry(1,1,1);
  for(const [kind,arr] of batches){ if(!arr.length)continue; const mesh=new THREE.InstancedMesh(unit,mats[kind],arr.length);mesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);const q=new THREE.Quaternion(),p=new THREE.Vector3(),sc=new THREE.Vector3(),e=new THREE.Euler();
    arr.forEach((a,i)=>{p.set(...a.pos);sc.set(...a.size);if(a.quaternion)q.copy(a.quaternion);else{e.set(...a.rot);q.setFromEuler(e);}mesh.setMatrixAt(i,new THREE.Matrix4().compose(p,q,sc));if(a.color)mesh.setColorAt(i,new THREE.Color(a.color));});mesh.castShadow=kind==='stone'||kind==='wood'||kind==='darkwood';mesh.receiveShadow=true;scene.add(mesh);
  }
}
function addMesh(geo,mat,pos,scale=[1,1,1],rot=[0,0,0],shadow=false){const m=new THREE.Mesh(geo,mat);m.position.set(...pos);m.scale.set(...scale);m.rotation.set(...rot);m.castShadow=shadow;m.receiveShadow=true;scene.add(m);return m;}
const unitSphere=new THREE.SphereGeometry(1,16,10), unitCyl=new THREE.CylinderGeometry(.5,.5,1,12), torus=(r,t)=>new THREE.TorusGeometry(r,t,8,28);
function beam(a,b,w,h,kind='wood',color){const va=V(...a),vb=V(...b),d=vb.clone().sub(va),mid=va.clone().add(vb).multiplyScalar(.5),q=new THREE.Quaternion().setFromUnitVectors(V(0,1,0),d.clone().normalize());if(batches.has(kind)){batches.get(kind).push({pos:mid.toArray(),size:[w,d.length(),h],quaternion:q,color});return null;}const mesh=addMesh(new THREE.BoxGeometry(w,d.length(),h),mats[kind],mid.toArray(),[1,1,1],[0,0,0],true);mesh.quaternion.copy(q);return mesh;}
function cylinderBetween(a,b,r,mat){const va=V(...a),vb=V(...b),d=vb.clone().sub(va),m=addMesh(unitCyl,mat,va.clone().add(vb).multiplyScalar(.5).toArray(),[r*2,d.length(),r*2]);m.quaternion.setFromUnitVectors(V(0,1,0),d.normalize());return m;}
function pointLight(col,intensity,dist,pos){const l=new THREE.PointLight(col,intensity,dist,2);l.position.set(...pos);scene.add(l);return l;}
function floorSlab(x,z,w,d,kind,topY=.0){block(kind,[x,topY-.12,z],[w,.24,d]);}

// Floor plan: 6m bedroom, 5m service passage, and a 10x14m roost.
floorSlab(-5,0,6.2,6.2,'floor',0);
floorSlab(-8.18,0,.9,2.05,'stone',0);
floorSlab(.5,0,5.4,2.9,'stone',0);
floorSlab(8,0,10.2,14.2,'char',0);
// Bedroom planks laid across the room; nail heads, seams, and a worn woven runner.
for(let i=0;i<21;i++){const z=-2.85+i*.285;block('wood',[-5,.025,z],[5.9,.08,.265],[0,0,0],i%4===0?0x765638:null);for(const x of [-7.55,-2.45])block('iron',[x,.07,z],[.05,.018,.026]);}
for(let x=-7.6;x<-2.3;x+=.35)block('cloth',[x,.071,-.25],[.33,.035,1.05],[0,0,0],(Math.floor(x*10)%2)?0x674631:0x826344);
// Roost flagstones, subtle stagger rather than a heavy mesh floor.
for(let ix=0;ix<17;ix++)for(let iz=0;iz<23;iz++){const x=3.25+ix*.59,z=-6.55+iz*.59;block('stone',[x,.018,z],[.57,.07,.56],[0,0,0],((ix+iz)%5===0)?0x605b55:null);}

// Masonry strips are placed as individual courses to keep doors genuinely open.
function wallX(x,z0,z1,top,opening=null,kind='stone',rowH=.48,depth=.42){
  let row=0;for(let y=rowH/2;y<top;y+=rowH,row++){const hh=Math.min(rowH,top-(y-rowH/2));const bw=.82,off=row%2?-.39:0;
    for(let z=z0+bw/2+off;z<z1;z+=bw){if(opening&&Math.abs(z-opening.z)<opening.w/2+bw/2&&(y-hh/2)<opening.h)continue;block(kind,[x,y,z],[depth,hh,bw*.97],[0,0,0],(row+Math.floor(z*3))%7===0?0x948575:null);}
  }
  if(opening)archX(x,opening.z,opening.w/2,opening.h,depth);
}
function wallZ(z,x0,x1,top,kind='stone',rowH=.48,depth=.42){let row=0;for(let y=rowH/2;y<top;y+=rowH,row++){const hh=Math.min(rowH,top-(y-rowH/2)),bw=.88,off=row%2?-.42:0;for(let x=x0+bw/2+off;x<x1;x+=bw)block(kind,[x,y,z],[bw*.97,hh,depth],[0,0,0],(row+Math.floor(x*3))%8===0?0x948575:null);}}
function archX(x,z0,r,doorY,depth){const n=Math.ceil(Math.PI*r/.42);for(let i=0;i<n;i++){const t=(i+.5)*Math.PI/n,z=z0+r*Math.cos(t),y=doorY+r*Math.sin(t);block('stone',[x,y,z],[depth,.44,r*Math.PI/n*1.05],[t+Math.PI/2,0,0],i%3===0?0x9d8a73:0x887765);}}

// Modest human bedroom: thick stone footings, limewashed panels, close rafters.
wallZ(3.05,-8,-2,3.25,'stone',.46,.4);wallZ(-3.05,-8,-2,3.25,'stone',.46,.4);
wallX(-8,-3.05,3.05,3.25,{z:0,w:1.75,h:2.22},'stone',.46,.42);
wallX(-2,-3.05,3.05,3.25,{z:0,w:2.25,h:2.24},'stone',.46,.46);
// Timber interior wall skin and panel divisions; stone remains visible at eye and floor level.
for(const z of [-2.82,2.82]){
  block('plaster',[-5,2.05,z],[5.75,2.05,.08],[0,0,0],0xc3b89a);
  for(let x=-7.8;x<=-2.2;x+=1.15)block('darkwood',[x,2.03,z*1.004],[.14,2.1,.17]);
  block('wood',[-5,3.08,z*1.005],[5.9,.2,.18]);
  block('wood',[-5,1.06,z*1.005],[5.9,.16,.18]);
}
for(const x of [-7.8,-2.2]){block('darkwood',[x,2.05,0],[.16,2.1,5.55]);}
// Low ceiling joists make the human room feel deliberately snug.
for(let x=-7.55;x<-2.2;x+=1.55)beam([x,3.06,-2.86],[x,3.06,2.86],.19,.22,'darkwood');
block('plaster',[-5,3.17,0],[5.8,.12,5.75]);
// Passage walls and broad arched threshold into the roost.
wallZ(-1.46,-2,3.2,3.65,'stone',.48,.35);wallZ(1.46,-2,3.2,3.65,'stone',.48,.35);
wallX(3.0,-1.46,1.46,7.8,{z:0,w:4.25,h:5.15},'stone',.55,.78);
archX(3.0,0,2.125,5.15,.9);
// Corridor roof is low and timbered; guide rails and iron straps.
for(let x=-1.7;x<2.9;x+=1.1){beam([x,3.45,-1.34],[x,3.45,1.34],.16,.17,'darkwood');}
for(const z of [-1.36,1.36]){block('wood',[.5,3.5,z],[5.0,.2,.2]);for(let x=-1.7;x<3;x+=1.7)block('iron',[x,3.36,z],[.12,.04,.28]);}

// Great roost enclosure. Low heavy walls, gable vault, paired timber bents.
wallZ(-6.95,3,13.1,7.0,'stone',.56,.72);wallZ(6.95,3,13.1,7.0,'stone',.56,.72);
wallX(13.0,-6.95,6.95,8.6,null,'stone',.58,.8);
wallX(3.0,-6.95,-2.17,8.0,null,'stone',.58,.8);
wallX(3.0,2.17,6.95,8.0,null,'stone',.58,.8);
// Gable infill over the enormous entrance, in rising courses above the arch.
for(let y=5.6;y<8.0;y+=.48){const reach=Math.max(2.25,6.8-(y-5.6)*1.95);for(let z=-reach;z<=reach;z+=.82){const archTop=5.15+Math.sqrt(Math.max(0,2.125*2.125-z*z));if(y>.0+archTop+.24)block('stone',[3.0,y,z],[.8,.46,.78],[0,0,0],0x71675d);}}
// Stone footing piers and colossal charred-timber columns.
for(const x of [4.55,8.05,11.55])for(const z of [-5.55,5.55]){
  block('stone',[x,.62,z],[1.45,1.24,1.45],[0,0,0],0x766a5f);
  block('darkwood',[x,4.35,z],[.64,6.6,.64],[0,0,0],0x453328);
  for(const y of [1.35,6.8]){block('iron',[x,y,z],[.78,.15,.78]);}
}
// Trusses and longitudinal purlins beneath a steep, closed gable roof.
for(const x of [3.8,7.2,10.6,12.55]){
  beam([x,7.3,-6.2],[x,10.35,0],.43,.48,'darkwood');
  beam([x,10.35,0],[x,7.3,6.2],.43,.48,'darkwood');
  beam([x,7.25,-6.1],[x,7.25,6.1],.31,.35,'darkwood');
  beam([x,8.75,-3.1],[x,8.75,3.1],.28,.32,'wood');
  beam([x,8.15,-4.8],[x,8.15,4.8],.24,.28,'wood');
}
for(const z of [-6.2,-4.8,-3.1,0,3.1,4.8,6.2])beam([3.7,z===0?10.3:8.1,z],[12.6,z===0?10.3:8.1,z],.20,.24,z===0?'darkwood':'wood');
// Roof underboards are tiled in broad charcoal courses; an open ridge keeps it light.
for(let x=4;x<12.8;x+=.72)for(let side of [-1,1])for(let j=0;j<8;j++){
  const z=side*(.45+j*.82),y=10.18-j*.43;block(j<2?'char':'darkwood',[x,y,z],[.66,.13,.78],[side*.48,0,0],j%4===0?0x51443b:null);
}
// Heavy resting shelf, with masonry piers, worn boards and a broad gentle access ramp.
for(const z of [-1.65,1.65])for(const x of [8.0,10.8])block('stone',[x,1.22,z],[.86,2.44,.92],[0,0,0],0x766a5f);
block('char',[9.42,2.55,0],[3.65,.52,4.2],[0,0,0],0x34302b);
for(let z=-1.8;z<=1.8;z+=.48){block('darkwood',[9.42,2.86,z],[3.48,.16,.43],[0,0,0],0x48352a);block('iron',[9.42,2.97,z],[3.45,.035,.04]);}
for(const z of [-1.9,1.9]){beam([7.65,1.42,z],[9.8,2.52,z],.18,.2,'darkwood');block('iron',[8.75,1.98,z],[.2,.12,.26],[0,0,-.46]);}
// Low broad sloping ramp: a separate route up to inspect the perch construction.
const rampGeo=new THREE.BoxGeometry(4.25,.24,1.75);const ramp=addMesh(rampGeo,mats.darkwood,[7.62,1.38,3.8],[1,1,1],[0,0,-.574],true);
for(const z of [2.98,4.62]){
  beam([5.48,1.02,z],[9.75,3.77,z],.09,.09,'iron');
  for(let i=0;i<6;i++){const x=5.55+i*.82,y=.05+i*.53;beam([x,y,z],[x,y+.92,z],.065,.065,'iron');}
}
for(let i=0;i<17;i++){const x=5.6+i*.25,y=.25+i*.16;block('wood',[x,y,3.8],[.23,.06,1.65],[0,0,-.574],i%3?0x594331:0x75563a);}
block('wood',[10.75,2.68,3.45],[2.15,.2,2.2]);
// Thick rope lashings at post joints.
for(const x of [4.55,8.05,11.55])for(const z of [-5.55,5.55])for(const y of [1.48,6.7]){const m=addMesh(torus(.34,.045),mats.leather,[x,y,z]);m.rotation.x=Math.PI/2;}

// Caretaker's bed, mended quilt, blanket roll, lamp, trunk, and well-used desk.
block('darkwood',[-5.15,.34,1.72],[2.65,.48,1.35],[0,0,0],0x48352b);
for(const x of [-6.25,-4.05])for(const z of [1.2,2.25])block('wood',[x,.27,z],[.16,.54,.16]);
block('cloth',[-5.15,.68,1.72],[2.38,.3,1.17],[0,0,0],0x997952);
block('cloth',[-5.1,.88,1.72],[2.36,.15,1.16],[0,0,0],0x7d5543);
// Patchwork stitched squares on quilt.
for(let x=-6.05;x<-4.1;x+=.43)for(let z=1.25;z<2.24;z+=.34)block('cloth',[x,.968,z],[.4,.025,.30],[0,0,0],((Math.round(x*10)+Math.round(z*10))%3===0)?0xb08b60:0x805c47);
block('cloth',[-6.05,.99,1.65],[.64,.13,.74],[0,0,0],0xd2c3a4);
block('cloth',[-5.25,.99,1.65],[.64,.13,.74],[0,0,0],0xd2c3a4);
block('darkwood',[-5.1,1.04,2.45],[2.65,.1,.13]);
block('wood',[-3.2,.52,2.05],[.9,.82,.75]);block('wood',[-3.2,.98,2.05],[.98,.1,.82]);
block('paper',[-3.17,1.045,2.03],[.45,.025,.32],[0,0,0],0xd2bd94);
// Bedside lamp and a chest with iron corners.
block('wood',[-6.85,.45,-1.95],[.75,.85,.75]);block('wood',[-6.85,.91,-1.95],[.82,.1,.82]);
for(const x of [-7.19,-6.51])for(const z of [-2.28,-1.62])block('iron',[x,.73,z],[.08,.38,.08]);
block('brass',[-6.85,1.2,-1.95],[.12,.48,.12]);
const lampShade=addMesh(new THREE.CylinderGeometry(.18,.29,.34,12),mats.paper,[-6.85,1.48,-1.95]);
pointLight(0xffd69a,48,7,[-6.85,1.55,-1.95]);
block('darkwood',[-3.4,.28,-1.05],[1.4,.55,.8]);block('iron',[-3.4,.56,-1.05],[1.45,.08,.83]);
for(const x of [-4.05,-2.75])for(const z of [-1.42,-.68])block('iron',[x,.38,z],[.1,.4,.1]);
// Small caring details: folded apron, brush cup, keepsake sketch and written care slate.
block('cloth',[-4.18,1.14,2.88],[.55,.07,.34],[0,0,.04],0x775a42);
for(let i=0;i<5;i++)block('iron',[-4.36+i*.085,1.2,2.89],[.018,.12,.025]);
const brush=addMesh(unitCyl,mats.wood,[-4.0,1.13,2.8],[.09,.34,.1],[0,0,.7]);
function signTexture(title,lines){const c=document.createElement('canvas');c.width=512;c.height=256;const g=c.getContext('2d');g.fillStyle='#433c32';g.fillRect(0,0,512,256);for(let i=0;i<800;i++){g.fillStyle=`rgba(220,204,169,${Math.random()*.08})`;g.fillRect(Math.random()*512,Math.random()*256,1,1);}g.strokeStyle='#a88a5c';g.lineWidth=9;g.strokeRect(13,13,486,230);g.fillStyle='#e1c99f';g.textAlign='center';g.font='bold 30px Georgia';g.fillText(title,256,71);g.font='22px Georgia';lines.forEach((t,i)=>g.fillText(t,256,122+i*38));const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshStandardMaterial({map:t,roughness:.95});}
const careSign=signTexture('KEEPER’S NOTES',['Water before first bell','Brush the wing joints','Warm stones after dusk']);
const sketchMat=signTexture('A SMALL PORTRAIT',['“My dear old Ember”','Drawn on a quiet morning','— M.']);
// Canvas-backed wall notes, framed in simple worn timber.
addMesh(new THREE.PlaneGeometry(1.45,.72),careSign,[.65,2.55,-1.265],[1,1,1],[0,0,0]);
for(const y of [2.13,2.97])block('wood',[.65,y,-1.31],[1.58,.08,.09]);
for(const x of [-.14,1.44])block('wood',[x,2.55,-1.31],[.08,.84,.09]);
addMesh(new THREE.PlaneGeometry(.8,.58),sketchMat,[-7.15,2.15,2.80],[1,1,1],[0,Math.PI,0]);
for(const y of [1.79,2.51])block('wood',[-7.15,y,2.86],[.92,.07,.09]);
for(const x of [-7.61,-6.69])block('wood',[x,2.15,2.86],[.07,.72,.09]);

// Passage: clear 2.1m walking lane; gear hangs proud along both walls.
// Rack and scaled dragon tack on the north wall.
block('darkwood',[.1,2.5,-1.22],[3.5,.18,.17]);
for(const x of [-1.25,-.25,.75,1.75,2.55]){block('iron',[x,2.28,-1.29],[.08,.42,.08]);block('brass',[x,2.08,-1.33],[.25,.07,.19]);}
// Large saddle/harness: padded belly band, articulated straps, iron rings and keeper's tag.
block('leather',[.38,1.75,-1.20],[1.55,.95,.24],[0,0,-.12]);block('cloth',[.38,1.76,-1.345],[1.16,.55,.05],[0,0,-.12],0x8c674a);
for(const x of [-.27,1.03]){beam([x,2.2,-1.24],[x-.14,1.18,-1.24],.12,.13,'leather');beam([x,2.1,-1.24],[x+.25,1.25,-1.24],.09,.12,'leather');const ring=addMesh(torus(.16,.035),mats.iron,[x,1.57,-1.37]);}
block('brass',[.42,1.47,-1.40],[.22,.15,.045]);
// Tool board and dragon-sized grooming paddles on the opposite wall.
block('darkwood',[.3,2.05,1.22],[3.7,.95,.14]);
for(let i=0;i<3;i++){const x=-.8+i*.68;block('wood',[x,1.38,1.13],[.13,1.48,.12],[0,0,(i-1)*.11]);block('wood',[x,2.02,1.13],[.43,.46,.23],[0,0,(i-1)*.11],0x96754b);for(let n=0;n<7;n++)block('straw',[x-.16+n*.052,1.79,1.25],[.018,.22,.018],[0,0,(i-1)*.08]);}
// Coils of rope, a clean linen bundle, feed sacks, bucket and hook lantern.
const ropeMat=mats.leather;for(let r=0;r<3;r++){const coil=addMesh(torus(.25+r*.025,.035),ropeMat,[-1.45,1.98+r*.09,-1.18]);coil.rotation.x=Math.PI/2;}
addMesh(unitSphere,mats.cloth,[-1.45,.52,1.02],[.45,.56,.38],[0,0,.05]);
for(const [x,z] of [[2.35,-.97],[2.55,-.82]]){addMesh(unitSphere,mats.straw,[x,.43,z],[.37,.53,.32],[0,0,.08]);block('cloth',[x,.91,z],[.52,.05,.42],[0,0,.08],0x957348);}
block('wood',[2.15,.28,1.03],[.55,.56,.5]);
const pail=addMesh(new THREE.CylinderGeometry(.22,.16,.48,12),mats.iron,[2.15,.57,-.98]);
const hook=addMesh(torus(.12,.025),mats.iron,[-1.6,2.45,1.33]);hook.rotation.x=Math.PI/2;
const gearSign=signTexture('CARE KIT',['Brush • hoof stone','Tack • clean linen','Feed stays dry']);
addMesh(new THREE.PlaneGeometry(1.2,.6),gearSign,[-1.1,2.86,1.23],[1,1,1],[0,Math.PI,0]);
// Corridor lamps: steady warm pools with iron cages.
for(const x of [-1.2,2.15]){block('iron',[x,3.03,0],[.22,.08,.22]);pointLight(0xffbf72,18,4,[x,2.93,0]);}

// Oversized, practical roost fittings and evidence of regular, affectionate use.
// Heat-darkened rear wall around an ember vent.
block('char',[12.55,3.65,0],[.13,4.5,3.8],[0,0,0],0x272522);
for(const z of [-1.15,-.78,-.4,0,.4,.78,1.15])block('ember',[12.44,2.52,z],[.08,.12,.19]);
for(const y of [1.95,3.25])block('iron',[12.36,y,0],[.18,.12,2.95]);
pointLight(0xff873a,185,12,[10.2,3.7,0]);pointLight(0xffb75c,68,9,[7.1,4.2,-3.6]);
// Large ring for tether / harness, forged hinge pins, and a stone water trough.
const tether=addMesh(torus(.65,.075),mats.iron,[12.45,1.48,-3.0]);tether.rotation.y=Math.PI/2;
for(const z of [-3.5,-2.5])block('iron',[12.48,1.48,z],[.13,.16,.14]);
// Trough rim with still dark water, overscale against a human.
block('stone',[10.9,.45,-4.25],[2.3,.72,1.22],[0,0,0],0x807366);
block('water',[10.9,.82,-4.25],[1.92,.055,.84]);
for(const x of [9.8,12.0])block('iron',[x,.86,-4.25],[.09,.1,.94]);
// Massive platform edge fitting and iron straps.
for(const x of [7.65,11.22])for(const z of [-1.86,1.86])block('iron',[x,2.47,z],[.14,.24,.14]);
// Old claw scoring along the rear and side stones (three parallel, deep grooves).
for(let i=0;i<3;i++){const z=-2.25+i*.76;beam([12.42,2.85,z],[12.42,5.25,z+.53],.075,.085,'char');beam([12.40,2.78,z+.09],[12.40,5.17,z+.6],.025,.035,'iron');}
for(let i=0;i<4;i++){const y=3.1+i*.55;beam([8.1,y,-6.57],[9.65,y+.58,-6.57],.07,.07,'char');}
// Bedding mound: one broad base with sparse visible straw stalks to avoid a hay maze.
addMesh(unitSphere,mats.straw,[8.95,.42,-.15],[2.5,.47,1.65]);
const strawGeo=new THREE.CylinderGeometry(.012,.018,.55,5),strawMat=new THREE.InstancedMesh(strawGeo,mats.straw,42),strawM=new THREE.Matrix4(),strawP=new THREE.Vector3(),strawQ=new THREE.Quaternion(),strawS=new THREE.Vector3(1,1,1);
for(let i=0;i<42;i++){const x=7.1+Math.random()*3.5,z=-1.6+Math.random()*2.7,y=.25+Math.random()*.55;strawP.set(x,y,z);strawQ.setFromEuler(new THREE.Euler(Math.random()*.55,Math.random()*Math.PI,Math.random()*.45));strawMat.setMatrixAt(i,strawM.compose(strawP,strawQ,strawS));}scene.add(strawMat);
// Giant claw impressions / gouges in timber posts at eye level.
for(const z of [-5.55,5.55])for(let i=0;i<3;i++)block('char',[4.89,3.1+i*.34,z],[.024,.13,.1],[0,0,-.42],0x2b2621);
// Slatted grain bin and tidy scrub station make the large room cared for, not abandoned.
block('wood',[5.55,.7,-4.25],[1.25,1.3,1.2]);for(let y=.18;y<1.35;y+=.24)block('darkwood',[5.55,y,-3.63],[1.25,.06,.05]);
for(let x=5.05;x<6.1;x+=.25)block('iron',[x,.78,-3.57],[.025,1.1,.03]);
block('paper',[5.55,1.44,-4.26],[.5,.3,.04]);
// Worn stair-step landing stones by the ramp, all below a human-safe rise.
for(let i=0;i<4;i++){const x=5.35+i*.45;block('stone',[x,.12+i*.1,2.05],[.5,.24+i*.2,.72],[0,0,0],0x797067);}

// Lanterns, minor hardware, and warm, indirect fill. No animated or flickering light.
for(const x of [5.2,10.8])for(const z of [-5.85,5.85]){
  block('iron',[x,5.7,z],[.15,.52,.15]);const glow=addMesh(new THREE.SphereGeometry(.12,10,8),mats.ember,[x,5.4,z],[1,1,1]);pointLight(0xffa34b,30,6,[x,5.35,z]);
}
// Low roof rib silhouette and masonry ledges are visible even from the floor route.
for(const z of [-6.35,6.35])block('char',[8,7.05,z],[10,.34,.48]);

// Small props are connected to surfaces but remain out of the central lane.
// A folded note on the trough edge and brass pins catch the bedroom-to-roost light.
block('paper',[11.9,.88,-4.25],[.36,.035,.24],[0,0,.02]);
for(let i=0;i<5;i++)block('brass',[11.78+i*.055,.91,-4.25],[.025,.015,.025]);
// Broad wall braces, iron saddles, and bolted plates make the scale legible.
for(const x of [4.55,8.05,11.55])for(const z of [-5.55,5.55])for(const side of [-1,1]){
  const zz=z+side*.08;beam([x,1.3,zz],[x+1.45,4.25,zz],.16,.18,'darkwood');block('iron',[x,1.4,zz],[.22,.18,.13]);
}

// Geometry batches are finalized after all world dressing has been placed.
buildBatches();

// Lighting: a quiet domestic lamp and steady amber roost glow against cool stone fill.
scene.add(new THREE.HemisphereLight(0xe7d7bb,0x30251c,1.25));
const key=new THREE.DirectionalLight(0xffe1b5,2.25);key.position.set(-4,9,6);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-17;key.shadow.camera.right=17;key.shadow.camera.top=15;key.shadow.camera.bottom=-15;key.shadow.bias=-.00015;key.shadow.radius=3;scene.add(key);
// Gentle cool bounce in roost rear prevents the large frame from disappearing into black.
const bounce=new THREE.DirectionalLight(0x8d9aa1,.42);bounce.position.set(12,7,-5);scene.add(bounce);
// A lantern over the bed is warm but notably quieter than the roost ember.
pointLight(0xffd49a,30,6,[-5.1,2.55,2.3]);

// Human-scale collision follows the connected floor footprint. The ramp adds a
// second, gradual approach to the perch; the route through the center stays flat.
const start={x:-7.18,z:0,yaw:-Math.PI/2,pitch:0};let player={x:start.x,z:start.z,yaw:start.yaw,pitch:start.pitch};
const keys=new Set();let locked=false;
function insideRoom(x,z){
  const bedroom=x>-7.6&&x<-1.82&&Math.abs(z)<2.5;
  const passage=x>-2.18&&x<3.18&&Math.abs(z)<.96;
  const roost=x>2.82&&x<12.25&&Math.abs(z)<6.25;
  const porch=x>-8.25&&x<-7.35&&Math.abs(z)<.55;
  const inDoorway=(x>-8.25&&x<-7.55)||(x>-2.25&&x<-1.75)||(x>2.6&&x<3.4);
  const doorwayClearance = x < -7.55 ? 0.55 : x < 0 ? 0.8 : 1.8;
  if(inDoorway&&Math.abs(z)>doorwayClearance)return false;
  return bedroom||passage||roost||porch;
}
function onRamp(x,z){return x>5.48&&x<9.72&&Math.abs(z-3.8)<.78;}
function onPerch(x,z){return x>=9.55&&x<11.85&&z>1.9&&z<4.55;}
function floorAt(x,z){if(onRamp(x,z))return THREE.MathUtils.clamp((x-5.48)/4.24,0,1)*2.75;if(onPerch(x,z))return 2.75;return 0;}
const obstacles=[[-6.65,-3.65,1.02,2.55],[-3.85,-2.75,1.62,2.45],[-4.1,-2.7,-1.48,-.62],[9.72,12.1,-4.95,-3.55],[4.88,6.23,-4.9,-3.63]];
const supportBases=[];
for(const x of [4.55,8.05,11.55])for(const z of [-5.55,5.55])supportBases.push([x,z,.72]);
for(const x of [8.0,10.8])for(const z of [-1.65,1.65])supportBases.push([x,z,.55]);
function collides(x,z){for(const b of obstacles){const cx=THREE.MathUtils.clamp(x,b[0],b[1]),cz=THREE.MathUtils.clamp(z,b[2],b[3]);if((x-cx)**2+(z-cz)**2<.32**2)return true;}
  for(const [px,pz,r] of supportBases)if(floorAt(x,z)<2.3&&Math.hypot(x-px,z-pz)<r)return true;
  // Keep the level route out from under the low resting shelf, while allowing
  // the ramp and the adjoining elevated deck to carry the player onto it.
  if(x>7.48&&x<11.32&&Math.abs(z)<2.15&&floorAt(x,z)<2)return true;return false;}
function reset(){player={...start};camera.position.set(player.x,1.62,player.z);camera.rotation.set(0,0,0);if(document.pointerLockElement===renderer.domElement)document.exitPointerLock();showNotice('Returned to the entrance.');}
function showNotice(text){const n=document.querySelector('#notice');n.textContent=text;n.style.opacity='1';clearTimeout(showNotice.t);showNotice.t=setTimeout(()=>n.style.opacity='.4',4200);}
document.querySelector('#reset').addEventListener('click',reset);
renderer.domElement.addEventListener('click',()=>{if(document.pointerLockElement!==renderer.domElement)renderer.domElement.requestPointerLock?.();});
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===renderer.domElement;showNotice(locked?'Look with the mouse · Esc releases the view':'Click the scene to look around.');});
document.addEventListener('mousemove',e=>{if(!locked)return;player.yaw-=e.movementX*.00215;player.pitch=THREE.MathUtils.clamp(player.pitch-e.movementY*.0018,-1.27,1.27);});
document.addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys.add(k);if([' ','arrowup','arrowdown','arrowleft','arrowright'].includes(k))e.preventDefault();if(k==='r')reset();});
document.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
let prev=performance.now();
function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-prev)/1000,.045);prev=now;
  let f=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0);
  let side=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0);
  const len=Math.hypot(f,side)||1;f/=len;side/=len;const speed=(keys.has('shift')?3.5:2.35)*dt;
  const dx=(-Math.sin(player.yaw)*f+Math.cos(player.yaw)*side)*speed;
  const dz=(-Math.cos(player.yaw)*f-Math.sin(player.yaw)*side)*speed;
  let nx=player.x+dx,nz=player.z+dz;
  if(insideRoom(nx,player.z)&&!collides(nx,player.z))player.x=nx;
  if(insideRoom(player.x,nz)&&!collides(player.x,nz))player.z=nz;
  camera.position.set(player.x,1.62+floorAt(player.x,player.z),player.z);
  camera.rotation.set(player.pitch,player.yaw,0,'YXZ');
  renderer.render(scene,camera);
}
camera.position.set(player.x,1.62,player.z);
requestAnimationFrame(animate);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));renderer.setSize(innerWidth,innerHeight);});
showNotice('Click the scene · WASD to walk · R returns to the entrance');
