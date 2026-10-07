import * as THREE from '../vendor/three.module.js';

// Blue Hour — a compact, hand-built polar field station.
const root = new THREE.Scene();
root.background = new THREE.Color(0x182b4a);
root.fog = new THREE.Fog(0x7189a9, 27, 76);
const camera = new THREE.PerspectiveCamera(73, innerWidth / innerHeight, 0.08, 115);
camera.rotation.order = 'YXZ';
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.65));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.22;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.setAttribute('aria-label', 'First-person polar shelter environment');
document.querySelector('#scene').appendChild(renderer.domElement);

const mat = (color, roughness = .8, metalness = 0, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
const M = {
  snow: mat(0xe3edf3, .98), packed: mat(0xb6c8d8, .91), ice: mat(0xa9d3e5, .2, .22), iceDark: mat(0x6394ad, .32, .12),
  shell: mat(0xc3d0d4, .63, .12), panelA: mat(0xd5dddc, .68, .06), panelB: mat(0xaebfc5, .7, .08),
  trim: mat(0x526776, .46, .48), metal: mat(0x647986, .36, .7), dark: mat(0x263a47, .76, .18), rubber: mat(0x25313a, .98),
  interior: mat(0xc7c4b6, .92), interior2: mat(0xb1b5ae, .87), floor: mat(0x687270, .82), flooring: mat(0x485755, .91),
  wood: mat(0x715e4b, .81), woodLight: mat(0x9b8368, .76), orange: mat(0xe49d5f, .63, .1), red: mat(0x9d5148, .65, .08),
  blue: mat(0x527b91, .59, .1), teal: mat(0x49837f, .54, .14), glass: mat(0x85c9d8, .15, .36, { transparent: true, opacity: .55 }),
  emissiveWarm: new THREE.MeshStandardMaterial({ color: 0xffcf91, emissive: 0xff9d4b, emissiveIntensity: 2.3, roughness: .35 }),
  screen: new THREE.MeshStandardMaterial({ color: 0x82dfd4, emissive: 0x29b6aa, emissiveIntensity: 1.8, roughness: .35 }),
  screenBlue: new THREE.MeshStandardMaterial({ color: 0x86bce0, emissive: 0x377cac, emissiveIntensity: 1.4, roughness: .3 }),
};
function surfaceGrain(base,seed,kind='paint'){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const c=canvas.getContext('2d');c.fillStyle=base;c.fillRect(0,0,256,256);let s=seed;
  const rand=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296};
  for(let i=0;i<520;i++){
    const x=rand()*256,y=rand()*256,a=.018+rand()*.055;
    c.fillStyle=`rgba(${rand()>.5?'255,255,255':'22,35,39'},${a})`;
    if(kind==='wood'){c.fillRect(x,y,.4+rand()*1.2,12+rand()*56)}else c.fillRect(x,y,.7+rand()*1.8,.7+rand()*2.2);
  }
  for(let i=0;i<24;i++){
    const x=rand()*256,y=rand()*256,len=8+rand()*72;
    c.strokeStyle=`rgba(31,47,52,${.025+rand()*.025})`;c.lineWidth=.45+rand()*.7;c.beginPath();
    if(kind==='wood'){c.moveTo(x,y);c.lineTo(x,y+len)}else{c.moveTo(x,y);c.lineTo(x+len*.7,y+len*.3)}c.stroke();
  }
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return t;
}
M.panelA.map=surfaceGrain('#f5f5f1',807,'paint');M.panelB.map=surfaceGrain('#f1f5f5',1207,'paint');
M.interior.map=surfaceGrain('#f5f1e8',3701,'paint');M.wood.map=surfaceGrain('#f2eee6',913,'wood');M.woodLight.map=surfaceGrain('#f4efe6',1619,'wood');
const add = (g, material, x, y, z, parent = root, shadows = true) => {
  if(!g.boundingBox)g.computeBoundingBox();const size=new THREE.Vector3();g.boundingBox.getSize(size);
  const o = new THREE.Mesh(g, material); o.position.set(x, y, z); o.castShadow = shadows && Math.max(size.x,size.y,size.z)>1.35; o.receiveShadow = true; parent.add(o); return o;
};
const box = (x, y, z, sx, sy, sz, material, parent = root, shadows = true) => add(new THREE.BoxGeometry(sx, sy, sz), material, x, y, z, parent, shadows);
const sphere = (x, y, z, r, material, parent = root, seg = 12) => add(new THREE.SphereGeometry(r, seg, Math.max(8, Math.floor(seg * .7))), material, x, y, z, parent);
const cyl = (x, y, z, rt, rb, h, material, parent = root, segments = 14) => add(new THREE.CylinderGeometry(rt, rb, h, segments), material, x, y, z, parent);
const group = (x = 0, y = 0, z = 0, parent = root) => { const g = new THREE.Group(); g.position.set(x,y,z); parent.add(g); return g; };
function between(a, b, radius, material, parent = root, radial = 8) {
  const d = new THREE.Vector3().subVectors(b, a), mesh = add(new THREE.CylinderGeometry(radius, radius, d.length(), radial), material, (a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2,parent,false);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), d.normalize()); return mesh;
}
function decal(parent, text, width, height, x, y, z, options = {}) {
  const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 256;
  const c = canvas.getContext('2d'); c.fillStyle = options.bg || '#182b38'; c.fillRect(0,0,512,256);
  c.strokeStyle = options.line || '#d79b63'; c.lineWidth = 5; c.strokeRect(12,12,488,232);
  c.fillStyle = options.color || '#e4e4d6'; c.font = '500 38px monospace'; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(text.toUpperCase(),256,116,460); c.fillStyle = options.line || '#d79b63'; c.font='20px monospace'; c.fillText(options.sub || 'FIELD STATION 07',256,192);
  const tx = new THREE.CanvasTexture(canvas); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 4;
  const mesh = add(new THREE.PlaneGeometry(width,height), new THREE.MeshBasicMaterial({map:tx}), x,y,z,parent,false);
  if (options.rotY) mesh.rotation.y = options.rotY; return mesh;
}
function screen(parent, x, y, z, width, height, color = '#163640') {
  const cv = document.createElement('canvas'); cv.width=512; cv.height=320; const c=cv.getContext('2d');
  c.fillStyle=color;c.fillRect(0,0,512,320); c.fillStyle='#84d1c5';c.font='bold 24px monospace';c.fillText('STATION / 07',24,38);
  c.fillStyle='#517a78';c.fillRect(24,58,464,1); c.strokeStyle='#68bfb1';c.lineWidth=2;c.beginPath();
  for(let i=0;i<50;i++){const px=24+i*9.2,py=213-Math.sin(i*.27)*30-Math.sin(i*.071)*48;c.lineTo(px,py)}c.stroke();
  c.fillStyle='#bde2c8';c.font='20px monospace';c.fillText('CORE TEMP   −17.8 C',24,100);c.fillText('WIND        06.2 m/s',24,132);c.fillText('ICE / RADAR   NOMINAL',24,278);
  c.fillStyle='#d89a64';c.fillRect(338,88,150,10);c.fillStyle='#64b7ac';c.fillRect(338,88,117,10);
  const tx=new THREE.CanvasTexture(cv);tx.colorSpace=THREE.SRGBColorSpace;
  const o=add(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map:tx}),x,y,z,parent,false);return o;
}
const boltRequests=[];
function bolt(x,y,z,parent=root,axis='z',face=1) { boltRequests.push({x,y,z,parent,axis,face}); }
function flushBolts(){
  const batches=new Map();for(const b of boltRequests){if(!batches.has(b.parent))batches.set(b.parent,[]);batches.get(b.parent).push(b)}
  for(const [parent,items] of batches){
    const bodies=new THREE.InstancedMesh(new THREE.SphereGeometry(.032,8,6),M.metal,items.length);
    const slots=new THREE.InstancedMesh(new THREE.BoxGeometry(.025,.005,.004),M.dark,items.length);
    bodies.castShadow=false;bodies.receiveShadow=false;slots.castShadow=false;slots.receiveShadow=false;
    const p=new THREE.Vector3(),q=new THREE.Quaternion(),s=new THREE.Vector3(1,1,1),m=new THREE.Matrix4();
    for(let i=0;i<items.length;i++){
      const b=items[i];p.set(b.x,b.y,b.z);q.identity();m.compose(p,q,s);bodies.setMatrixAt(i,m);
      p.set(b.x+(b.axis==='x'?.029*b.face:0),b.y,b.z+(b.axis==='z'?.029:0));q.setFromEuler(new THREE.Euler(0,b.axis==='x'?b.face*Math.PI/2:0,0));m.compose(p,q,s);slots.setMatrixAt(i,m);
    }
    bodies.instanceMatrix.needsUpdate=true;slots.instanceMatrix.needsUpdate=true;parent.add(bodies,slots);
  }
}
function lamp(x,y,z,parent=root,scale=1) {
  cyl(x,y,z,.09*scale,.14*scale,.08*scale,M.trim,parent); sphere(x,y-.095*scale,z,.105*scale,M.emissiveWarm,parent,12);
  const cage=group(x,y-.1*scale,z,parent);
  for(let i=0;i<4;i++){const a=i*Math.PI/2;between(new THREE.Vector3(Math.cos(a)*.1*scale,-.11*scale,Math.sin(a)*.1*scale),new THREE.Vector3(Math.cos(a)*.1*scale,.11*scale,Math.sin(a)*.1*scale),.008*scale,M.metal,cage,6)}
  const light=new THREE.PointLight(0xffbd7a,12*scale,6.2*scale,1.7);light.position.set(x,y-.2*scale,z);root.add(light); return light;
}
const rng = (()=>{let s=749301;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}})();

// Clear twilight dome, a low alpine horizon, and a wind-combed snowfield.
const sky = new THREE.Mesh(new THREE.SphereGeometry(95,32,20), new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,vertexShader:`varying float h;void main(){vec3 p=normalize(position);h=p.y;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,fragmentShader:`varying float h;void main(){float t=smoothstep(-.27,.68,h);vec3 horizon=vec3(.40,.55,.70);vec3 zenith=vec3(.045,.086,.18);vec3 c=mix(horizon,zenith,t);float band=exp(-pow((h-.02)*12.0,2.0));c+=vec3(.10,.065,.025)*band;gl_FragColor=vec4(c,1.0);}`})); root.add(sky);
const groundGeo = new THREE.PlaneGeometry(48,48,144,144); groundGeo.rotateX(-Math.PI/2);
const pos=groundGeo.attributes.position, colors=[];
function terrainHeight(x,z){
  const near=Math.exp(-Math.max(0,Math.abs(x)-4.3)*.75)*Math.exp(-Math.max(0,Math.abs(z)-7.0)*.36);
  const drift=.22*Math.sin(x*.43+z*.18)*Math.cos(z*.37-x*.12)+.11*Math.sin(x*.91-z*.22)+.055*Math.sin(z*1.7+x*.77);
  const berm=.52*Math.exp(-Math.pow((Math.abs(x)-5.0)/1.5,2))*Math.exp(-Math.pow((z-.8)/7.5,2))+.24*Math.exp(-Math.pow((Math.abs(x)-8.1)/1.2,2))*Math.exp(-Math.pow((z+2.2)/4.5,2));
  const entryCut=.24*Math.exp(-Math.pow(x/.9,2)-Math.pow((z-7.5)/2,2));
  return Math.max(-.11,.06+drift*(.6+.4*(1-near))+berm-entryCut);
}
for(let i=0;i<pos.count;i++){
  const x=pos.getX(i), z=pos.getZ(i)-.3, y=terrainHeight(x,z); pos.setY(i,y);pos.setZ(i,z);
  const noise=rng()*.09, v=THREE.MathUtils.clamp(.82+y*.13+noise,.68,1.08);
  colors.push(.72*v,.83*v,.91*v);
}
groundGeo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));groundGeo.computeVertexNormals();
add(groundGeo,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.98}),0,0,0,root,false);
const hemi=new THREE.HemisphereLight(0xc4d9f2,0x34445a,1.14);root.add(hemi);
const moon=new THREE.DirectionalLight(0xb8d8ff,2.25);moon.position.set(-10,18,-7);moon.castShadow=true;moon.shadow.mapSize.set(1536,1536);moon.shadow.camera.left=-20;moon.shadow.camera.right=20;moon.shadow.camera.top=22;moon.shadow.camera.bottom=-17;moon.shadow.bias=-.00016;moon.shadow.normalBias=.025;root.add(moon);
// A restrained line of ice ridges keeps the site isolated without opening a large landscape.
function ridge(points, z, material){
  const verts=[],inds=[];for(const [x,y] of points)verts.push(x,-.5,z,x,y,z);
  for(let i=0;i<points.length-1;i++){const a=i*2;inds.push(a,a+2,a+1,a+2,a+3,a+1)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setIndex(inds);g.computeVertexNormals();return add(g,material,0,0,0,root,false);
}
const ridgeMat=mat(0x516a88,.98), ridgeLight=mat(0x8fa8c2,.94);
ridge([[-38,3],[-31,6],[-23,4],[-16,8],[-8,4],[2,7],[12,3],[21,8],[30,4],[38,6]],-34,ridgeMat);
ridge([[-37,2],[-29,5],[-21,3],[-13,6],[-3,2],[7,5],[17,2],[26,6],[37,3]],-32,ridgeLight);
// Wind-polished humps and fractured pale-blue ice around the sheltered apron.
for(let i=0;i<13;i++){
  const x=(rng()-.5)*11,z=(rng()-.5)*13,r=.32+rng()*.75;
  const g=new THREE.IcosahedronGeometry(r,1);const shard=add(g,i%3===0?M.iceDark:M.ice,x,terrainHeight(x,z)+.035,z,root,false);shard.scale.set(1.35,.12,.72);shard.rotation.y=rng()*Math.PI;shard.rotation.z=(rng()-.5)*.08;
}
// Boot prints lead naturally toward the airlock and turn back along the sheltered side.
for(let i=0;i<17;i++){
  const t=i/16, x=.4*Math.sin(t*Math.PI*1.5), z=12-t*5.6, side=(i%2?1:-1)*.12;
  const p=box(x+side,terrainHeight(x,z)+.015,z,.12,.025,.25,M.packed,root,false);p.rotation.y=.18*Math.sin(t*7);
}

// Main insulated module. Exterior shell and inner liner leave the entry axis open.
const W=7.5,D=7.6,H=2.9, front=D/2, back=-D/2, wall=.28;
box(0,-.13,0,W,.26,D,M.floor);
box(0,H/2,back,W,H,wall,M.shell);
const leftWallX=-W/2+wall/2,portY=1.39,portZ=.57,portHalf=.42;
box(leftWallX,.485,0,wall,.97,D,M.shell);
box(leftWallX,(portY+portHalf+H)/2,0,wall,H-portY-portHalf,D,M.shell);
box(leftWallX,portY,(-D/2+portZ-portHalf)/2,wall,portHalf*2,portZ-portHalf+D/2,M.shell);
box(leftWallX,portY,(portZ+portHalf+D/2)/2,wall,portHalf*2,D/2-portZ-portHalf,M.shell);
box(W/2-wall/2,H/2,0,wall,H,D,M.shell);
box((-W/2-1.05)/2,H/2,front,W/2-1.05,H,wall,M.shell);box((W/2+1.05)/2,H/2,front,W/2-1.05,H,wall,M.shell);
box(0,(H+2.18)/2,front,W,H-2.18,wall,M.shell);
box(0,H+.04,0,W+.36,.24,D+.36,M.trim);
box(0,H+.18,0,W+.12,.13,D+.12,M.panelB);
// Interior facing surfaces and service ceiling.
box(0,2.88,0,W-.32,.035,D-.32,M.interior2,root,false);
box(0,1.48,-3.59,W-.44,2.82,.035,M.interior,root,false);
box(-3.4475,.52,0,.035,.9,D-.42,M.interior,root,false);
box(-3.4475,2.35,0,.035,1.08,D-.42,M.interior,root,false);
box(-3.4475,portY,(-D/2+portZ-portHalf)/2,.035,portHalf*2,portZ-portHalf+D/2,M.interior,root,false);
box(-3.4475,portY,(portZ+portHalf+D/2)/2,.035,portHalf*2,D/2-portZ-portHalf,M.interior,root,false);
box(3.4475,1.48,0,.035,2.82,D-.42,M.interior,root,false);
box(-2.38,1.48,3.59,2.4,2.82,.035,M.interior,root,false);box(2.38,1.48,3.59,2.4,2.82,.035,M.interior,root,false);
box(0,2.55,3.59,2.05,.67,.035,M.interior,root,false);
// Exterior modular plates, recessed seams, corner rails, and visible fasteners.
const panelWidth=1.16;
for(let ix=0;ix<6;ix++){
  const x=-3.0+ix*1.2;
  for(let iy=0;iy<3;iy++){
    const y=.48+iy*.91, h=.86;
    if(Math.abs(x)<1.12&&y<2.12)continue;
    box(x,y,3.965,panelWidth-.035,h,.052,ix%2?M.panelA:M.panelB);
    for(const bx of [-.46,.46])for(const by of [-.34,.34])bolt(x+bx,y+by,4.0);
  }
}
for(const side of [-1,1]){
  for(let iz=0;iz<6;iz++)for(let iy=0;iy<3;iy++){
    const z=-3+iz*1.19,y=.48+iy*.91;
    if(side===-1&&iz===3&&iy===1){
      const plate=new THREE.Shape();plate.moveTo(-.57,-.43);plate.lineTo(.57,-.43);plate.lineTo(.57,.43);plate.lineTo(-.57,.43);plate.closePath();
      const opening=new THREE.Path();opening.absarc(0,0,.395,0,Math.PI*2,true);plate.holes.push(opening);
      const face=new THREE.ShapeGeometry(plate,40);face.rotateY(-Math.PI/2);add(face,M.panelB,side*3.79,y,z,root,false);
    }else box(side*3.79,y,z,.052,.86,1.14,(iz+iy)%2?M.panelA:M.panelB);
    for(const bz of [-.44,.44])for(const by of [-.34,.34])bolt(side*3.83,y+by,z+bz,root,'x',side);
  }
  box(side*3.82,1.5,0,.12,3.0,.12,M.trim);
}
for(let i=0;i<7;i++){
  const x=-3+i*1; box(x,2.95,4.01,.025,2.7,.035,M.trim,root,false);
}
// Sloped snow cap: a gently wind-loaded panel over a low-profile insulated roof.
const capGeo=new THREE.PlaneGeometry(7.9,8,24,24);capGeo.rotateX(-Math.PI/2);const cp=capGeo.attributes.position;
for(let i=0;i<cp.count;i++){const x=cp.getX(i),z=cp.getZ(i);cp.setY(i,.08+.11*Math.sin(x*.65+z*.2)+.07*Math.sin(z*.92-x*.27));}capGeo.computeVertexNormals();
add(capGeo,mat(0xd9e5e8,.94),0,3.19,0,root,false);
for(const side of [-1,1]){
  box(side*3.78,3.08,0,.1,.1,7.85,M.iceDark,root,false);
  for(let i=0;i<8;i++){const z=-3.5+i*.98,h=.2+rng()*.27;const ic=cyl(side*3.72,2.95-h/2,z,.025,.08,h,M.ice,root,7);ic.rotation.z=side*.08;}
}
// Airlock vestibule: level floor, clear 1.8 m opening, insulated sidewalls and cap.
const vestibule=group();
box(0,-.115,5.17,2.82,.23,3.05,M.floor,vestibule);
box(-1.38,1.28,5.17,.18,2.56,3.08,M.shell,vestibule);box(1.38,1.28,5.17,.18,2.56,3.08,M.shell,vestibule);
box(-1.285,1.28,5.17,.024,2.45,2.82,M.interior,vestibule,false);box(1.285,1.28,5.17,.024,2.45,2.82,M.interior,vestibule,false);
box(-1.24,1.5,6.66,.28,3.0,.18,M.shell,vestibule);box(1.24,1.5,6.66,.28,3.0,.18,M.shell,vestibule);
box(0,2.44,6.66,2.2,.76,.18,M.shell,vestibule);
box(0,2.67,5.17,3.05,.22,3.26,M.trim,vestibule);box(0,2.79,5.17,2.9,.1,3.1,M.panelA,vestibule);
// Exterior vestibule face plate surrounds its open doorway.
for(const sx of [-1,1]){
  box(sx*1.16,1.15,6.78,.36,2.25,.05,M.panelB,vestibule);
  for(let k=0;k<2;k++)for(const yy of [.42,1.85])bolt(sx*1.16+(k-.5)*.2,yy,6.82,vestibule);
}
box(0,2.48,6.78,1.85,.38,.06,M.panelA,vestibule);
box(-.93,1.14,5.18,.045,2.3,2.8,M.orange,vestibule,false);box(.93,1.14,5.18,.045,2.3,2.8,M.orange,vestibule,false);
// Open pressure doors rest along the jambs; both thresholds stay fully clear.
const door=group(.99,1.08,6.25,vestibule);box(0,0,.44,.085,2.16,.88,M.panelA,door);box(.049,0,.44,.018,2.0,.68,M.interior2,door,false);
for(const y of [-.82,.82]){box(-.05,y,.14,.11,.12,.09,M.metal,door);box(.09,y,.11,.035,.16,.15,M.orange,door)}
for(const y of [-.72,0,.72])cyl(-.08,y,.05,.045,.045,.055,M.metal,door);
const innerDoor=group(.99,1.05,3.52);box(0,0,-.42,.08,2.1,.84,M.panelB,innerDoor);box(.047,0,-.42,.015,1.94,.64,M.interior2,innerDoor,false);
for(const y of [-.78,.78])box(.09,y,-.42,.035,.16,.15,M.orange,innerDoor);
// Entry mat, boot scraper, suit hooks and a warm vestibule fixture.
box(0,.012,5.36,1.55,.025,1.25,M.rubber);for(let i=0;i<8;i++)box(-.67+i*.19,.03,5.34,.035,.015,1.12,M.trim,root,false);
box(1.11,.38,4.8,.06,.7,.72,M.trim);box(1.07,.81,4.8,.07,.1,.77,M.wood);
for(let i=0;i<4;i++){const x=.84+i*.17;cyl(x,.75,4.78,.025,.025,.13,M.metal);between(new THREE.Vector3(x,.82,4.78),new THREE.Vector3(x,.83,4.93),.018,M.metal);}
box(-.93,1.27,5.25,.035,.77,.68,M.orange);box(-.9,1.27,5.25,.045,.56,.48,M.dark);sphere(-.87,1.58,5.25,.2,M.orange);
decal(vestibule,'AIRLOCK',.72,.26,0,2.47,6.825,{sub:'CLOSE BOTH SEALS'});
lamp(0,2.37,5.38,root,.67);
box(-1.16,2.04,6.85,.31,.22,.1,M.trim);box(-1.16,2.04,6.91,.22,.11,.035,M.emissiveWarm,root,false);
const porchLight=new THREE.PointLight(0xffad68,6.2,7.2,1.65);porchLight.position.set(-.92,1.98,6.98);root.add(porchLight);

// Frosted round port on the left flank, with layered seal and interior rim.
const porthole=group(-3.84,portY,portZ);porthole.rotation.y=-Math.PI/2;
const ring=add(new THREE.TorusGeometry(.34,.045,10,40),M.trim,0,0,0,porthole);
add(new THREE.CircleGeometry(.30,40),M.glass,0,0,-.075,porthole,false);
const innerPort=group(-3.42,portY,portZ);innerPort.rotation.y=Math.PI/2;
add(new THREE.TorusGeometry(.34,.045,10,40),M.trim,0,0,0,innerPort);
add(new THREE.CircleGeometry(.30,40),M.glass,0,0,.02,innerPort,false);
const glazing=cyl(-3.61,portY,portZ,.30,.30,.28,M.glass,root,40);glazing.rotation.z=Math.PI/2;
for(let i=0;i<8;i++){const a=i*Math.PI/4;bolt(-3.84,portY+Math.sin(a)*.40,portZ+Math.cos(a)*.40,root,'x',-1)}
// Roof vent, exhaust, weather mast, and field antenna.
box(-2.65,3.39,-2.7,.76,.2,.64,M.trim);box(-2.65,3.51,-2.7,.58,.07,.48,M.panelB);
for(let i=0;i<5;i++)box(-2.65,3.4+i*.035,-2.7,.48,.018,.12,M.metal,root,false);
cyl(2.58,3.54,-2.7,.18,.2,.52,M.metal);cyl(2.58,3.82,-2.7,.1,.14,.07,M.orange);
const mast=group(3.0,3.25,2.55);cyl(0,.55,0,.035,.045,1.1,M.metal,mast);between(new THREE.Vector3(-.36,.24,0),new THREE.Vector3(.36,.88,0),.018,M.metal,mast);between(new THREE.Vector3(.36,.24,0),new THREE.Vector3(-.36,.88,0),.018,M.metal,mast);
for(let i=0;i<3;i++){const a=i*2.094;box(Math.cos(a)*.15,.92,Math.sin(a)*.15,.45,.055,.12,M.panelA,mast).rotation.y=a;}
decal(root,'STATION 07',.96,.34,0,2.47,4.014,{sub:'ICE / CLIMATE ARRAY'});

// Interior liner ribs, cable trunking, warm lamps, and useful wall controls.
for(let i=0;i<8;i++){
  const x=-3.25+i*.93;box(x,1.47,-3.54,.055,2.64,.045,M.panelB,root,false);box(x,1.47,3.53,.055,2.64,.04,M.panelB,root,false);
}
box(-3.39,2.53,0,.07,.12,6.9,M.orange,root,false);box(3.39,2.53,0,.07,.12,6.9,M.orange,root,false);
for(let i=0;i<3;i++){box(-3.38,.58+i*.78,-1.6,.07,.025,3.7,M.metal,root,false);}
lamp(-2.15,2.62,.7);lamp(0,2.62,.7);lamp(2.15,2.62,.7);lamp(0,2.57,-2.55,.92);
// Back-wall research console and tool bench.
box(0,.81,-2.88,3.45,.16,.86,M.woodLight);box(0,.72,-2.88,3.6,.07,.94,M.trim);
for(const x of [-1.5,1.5]){
  box(x,.4,-2.91,.12,.67,.68,M.metal);box(x,.15,-2.91,.46,.08,.7,M.trim);
}
for(let i=0;i<6;i++){
  const x=-1.25+i*.5;box(x,.43,-2.43,.44,.25,.04,i%2?M.panelB:M.trim);
  box(x,.45,-2.405,.28,.018,.015,M.orange,root,false);box(x,.33,-2.4,.04,.035,.02,M.metal,root,false);
}
box(0,.91,-3.4,3.65,.09,.1,M.metal);
for(const x of [-.86,.15,1.16]){
  box(x,1.77,-3.43,.89,.69,.11,M.trim);box(x,1.77,-3.36,.76,.53,.035,M.dark,root,false);
  screen(root,x,1.77,-3.335,.7,.46,x<0?'#132c39':x>.8?'#1a2a3d':'#18343b');
  for(let i=0;i<3;i++)sphere(x-.28+i*.13,1.32,-3.35,.022,i===0?M.orange:M.screen,root,8);
}
// Upper shelf and labeled binders, sample trays, and an analog barometer.
box(0,2.28,-3.3,3.2,.09,.45,M.wood);box(0,2.34,-3.51,3.25,.035,.04,M.trim);
for(let i=0;i<7;i++){
  const x=-1.32+i*.43;box(x,2.58,-3.35,.34,.48,.28,i%3===0?M.orange:i%2?M.blue:M.woodLight);
  box(x,2.58,-3.197,.22,.27,.012,M.panelA,root,false);
}
for(const x of [-1.65,1.65]){box(x,2.04,-3.35,.07,.48,.4,M.trim);}
// Microscope, reagent jars, a mug and a map roll on the bench.
box(-1.2,.91,-2.8,.54,.025,.48,M.dark,root,false);
box(-1.21,1.08,-2.79,.17,.32,.16,M.metal);between(new THREE.Vector3(-1.2,1.17,-2.77),new THREE.Vector3(-.99,1.38,-2.77),.045,M.trim);cyl(-.97,1.39,-2.77,.09,.12,.11,M.dark);
for(let i=0;i<5;i++){const x=.32+i*.18;const jar=cyl(x,1.06,-2.74,.065,.075,.28,i%2?M.glass:M.glass);cyl(x,1.22,-2.74,.073,.073,.035,M.orange);}
cyl(1.62,1.04,-2.78,.12,.14,.25,M.orange);cyl(1.62,1.17,-2.78,.115,.12,.04,M.trim);
box(.62,.92,-3.02,.46,.03,.35,M.red);box(.62,.945,-3.02,.43,.012,.32,M.woodLight,root,false);
// Rotating task chair and footrest in front of the workbench.
const chair=group(.45,0,-1.72);cyl(0,.62,0,.28,.3,.12,M.dark,chair);cyl(0,.83,-.2,.28,.32,.1,M.blue,chair);box(0,1.13,-.43,.62,.62,.13,M.blue,chair);box(-.32,.81,-.2,.07,.18,.42,M.trim,chair);box(.32,.81,-.2,.07,.18,.42,M.trim,chair);cyl(0,.43,0,.065,.08,.28,M.metal,chair);for(let i=0;i<5;i++){const a=i*2*Math.PI/5;between(new THREE.Vector3(0,.3,0),new THREE.Vector3(Math.cos(a)*.34,.07,Math.sin(a)*.34),.035,M.metal,chair);sphere(Math.cos(a)*.34,.07,Math.sin(a)*.34,.075,M.dark,chair,8)}
// Left-side bunk: quilt, pillow, storage drawers, blanket stitching, and reading light.
box(-2.72,.43,.25,1.2,.67,2.55,M.trim);box(-2.72,.79,.25,1.26,.15,2.6,M.panelA);box(-2.72,.91,.31,1.18,.18,2.35,M.blue);
box(-2.72,1.05,1.17,.8,.16,.42,M.interior);box(-2.72,.99,-.35,.98,.035,.03,M.orange);
for(let i=0;i<8;i++)box(-3.05+i*.1,1.008,.32,.012,.012,1.75,M.panelB,root,false);
box(-2.72,.36,.25,1.04,.24,2.2,M.panelB);for(let i=0;i<3;i++){box(-2.72,.33,-.54+i*.72,.82,.045,.05,M.trim);box(-2.72,.33,-.5+i*.72,.035,.08,.035,M.metal)}
box(-2.86,2.05,.35,.56,.35,.45,M.trim);box(-2.86,2.05,.28,.44,.25,.025,M.emissiveWarm,root,false);const reading=new THREE.PointLight(0xffc27c,2.4,2.5,2);reading.position.set(-2.55,2,.55);root.add(reading);
// Built-in storage: frost-jacketed lockers, latches, labels, and a cold box.
for(const i of [0,1,2]){
  const z=-.8+i*.92;box(3.08,1.24,z,.78,2.35,.83,i===2?M.blue:M.panelB);box(2.67,1.24,z,.035,2.16,.06,M.trim,root,false);
  box(2.65,1.27,z,.035,1.96,.72,i===1?M.interior2:M.panelA,root,false);box(2.61,1.25,z+.24,.04,.33,.025,M.metal,root,false);
  for(const y of [.34,2.16])bolt(2.62,y,z+.3,root,'x',-1);
}
decal(root,'COLD STORE',.54,.25,2.59,2.48,1.12,{rotY:-Math.PI/2,sub:'−20 C'});
flushBolts();
// Small galley, water canister, kettle, insulated cups and ration tins.
box(2.65,.7,2.25,1.3,.18,1.25,M.wood);box(2.65,.36,2.25,1.26,.54,1.2,M.panelB);box(2.65,.81,2.25,1.36,.06,1.32,M.dark);
box(2.65,1.23,2.25,.55,.79,.52,M.trim);box(2.65,1.25,2.0,.44,.49,.03,M.panelA,root,false);
cyl(2.4,1.0,2.45,.14,.17,.24,M.metal);cyl(2.4,1.14,2.45,.12,.14,.055,M.orange);between(new THREE.Vector3(2.53,1.02,2.45),new THREE.Vector3(2.62,1.1,2.45),.025,M.metal);
cyl(2.94,1.02,2.38,.1,.12,.19,M.red);cyl(2.94,1.13,2.38,.1,.11,.03,M.metal);
// Wall-mounted first-aid cabinet, med kit, extinguisher and calibrated instruments.
box(-3.34,1.4,-1.05,.38,.58,.25,M.red);box(-3.13,1.4,-1.05,.025,.43,.2,M.panelA,root,false);box(-3.1,1.4,-1.05,.024,.26,.07,M.red,root,false);
box(-3.36,1.97,-1.2,.32,.32,.23,M.orange);box(-3.18,1.97,-1.2,.02,.23,.19,M.panelA,root,false);
for(let i=0;i<3;i++){const z=.8+i*.44;cyl(-3.35,1.66,z,.09,.1,.47,i===1?M.red:M.orange);cyl(-3.35,1.92,z,.09,.1,.07,M.metal);}
for(const z of [-.1,.2]){const g=group(3.4,1.72,z);g.rotation.y=-Math.PI/2;const r=add(new THREE.TorusGeometry(.18,.017,8,28),M.metal,0,0,0,g);add(new THREE.CircleGeometry(.16,28),M.interior2,0,0,-.01,g,false);between(new THREE.Vector3(-.1,0,.01),new THREE.Vector3(.1,0,.01),.009,M.red,g);}
decal(root,'MED / O2',.55,.28,-3.40,2.52,-1.08,{rotY:Math.PI/2,sub:'EMERGENCY'});
// Suit rack and research pack beside the airlock; never narrows the entry passage.
box(-3.13,1.64,2.55,.48,.82,.35,M.orange);box(-3.13,1.23,2.55,.57,.07,.46,M.trim);sphere(-3.13,2.14,2.55,.25,M.orange);box(-3.13,1.66,2.33,.06,.4,.04,M.dark);
for(let i=0;i<3;i++){box(-2.89,1.95,1.68+i*.29,.48,.12,.08,M.trim);sphere(-2.64,1.88,1.68+i*.29,.06,M.orange);}
// Ductwork and insulated service pipes around the perimeter.
for(const z of [-2.2,.5,2.65]){
  cyl(3.38,2.68,z,.08,.08,.66,M.metal).rotation.z=Math.PI/2;
  between(new THREE.Vector3(3.42,2.68,z-.33),new THREE.Vector3(3.42,2.68,z+.33),.05,M.orange);
}
for(let i=0;i<5;i++)box(-1.1+i*.52,2.87,.35,.3,.02,.02,M.trim,root,false);
// Warm door spill: fixed practical lights make the interior and vestibule read continuously.
const spill=new THREE.PointLight(0xffb670,7.5,9,1.65);spill.position.set(0,2.2,4.3);root.add(spill);
const roomFill=new THREE.PointLight(0xffcc8c,7,8,1.8);roomFill.position.set(0,2.27,-.5);root.add(roomFill);

// Collision walls are the real room footprint and the two open portals.
const colliders=[];
function addWallSegment(x1,z1,x2,z2,t=.24){colliders.push({x1,z1,x2,z2,t});}
// Main room perimeter; front entry has a 1.9 m opening.
addWallSegment(-3.75,-3.8,3.75,-3.8,.32);addWallSegment(-3.75,-3.8,-3.75,3.8,.32);addWallSegment(3.75,-3.8,3.75,3.8,.32);
addWallSegment(-3.75,3.8,-.96,3.8,.32);addWallSegment(.96,3.8,3.75,3.8,.32);
// Vestibule sidewalls and face opening, linked to room opening.
addWallSegment(-1.43,3.8,-1.43,6.72,.24);addWallSegment(1.43,3.8,1.43,6.72,.24);addWallSegment(-1.43,6.72,-.98,6.72,.24);addWallSegment(.98,6.72,1.43,6.72,.24);
// Door leaves are parked against the right jamb; their actual thickness is collidable.
addWallSegment(.99,2.68,.99,3.52,.11);addWallSegment(.99,6.25,.99,7.13,.11);
// Furniture collisions in the space people can reach; no collision on low details.
colliders.push({rect:[-1.75,-3.39,1.75,-2.38]},{rect:[-3.36,-1.35,-2.13,1.65]},{rect:[2.53,-1.35,3.48,1.82]},{rect:[2.0,1.48,3.32,3.02]},{rect:[-3.49,2.28,-2.8,2.85]},{rect:[.08,-2.13,.82,-1.25]});
const player={x:0,z:12.4,yaw:0,pitch:0,eye:1.64,vy:0,grounded:true};
function floorAt(x,z){
  if(z>=-3.8&&z<=3.8&&Math.abs(x)<3.75)return 0;
  if(z>=3.62&&z<=6.72&&Math.abs(x)<1.43)return 0;
  return terrainHeight(x,z);
}
camera.position.set(player.x,floorAt(player.x,player.z)+player.eye,player.z);camera.rotation.set(0,0,0);
const radius=.27, keys=new Set();let locked=false,started=false,paused=false,toastTimer=0;
const welcome=document.querySelector('#welcome'),pauseEl=document.querySelector('#pause'),zoneLabel=document.querySelector('#zone'),toast=document.querySelector('#toast');
function notify(s){toast.textContent=s;toast.style.opacity='1';clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.style.opacity='0',2100)}
function reset(){player.x=0;player.z=12.4;player.yaw=0;player.pitch=0;player.vy=0;camera.position.set(0,floorAt(0,12.4)+player.eye,12.4);camera.rotation.set(0,0,0);notify('BACK ON THE SHELTERED APRON')}
function requestLock(){renderer.domElement.requestPointerLock?.()}
document.querySelector('#enter').addEventListener('click',()=>{started=true;welcome.classList.add('hidden');requestLock()});
document.querySelector('#resume').addEventListener('click',()=>requestLock());
document.querySelector('#reset').addEventListener('click',()=>{reset();if(!started){started=true;welcome.classList.add('hidden')}requestLock()});
document.querySelector('#reset-pause').addEventListener('click',()=>{reset();paused=false;pauseEl.classList.add('hidden');requestLock()});
renderer.domElement.addEventListener('click',()=>{if(started&&!locked)requestLock()});
document.addEventListener('pointerlockchange',()=>{
  locked=document.pointerLockElement===renderer.domElement;
  if(locked){paused=false;pauseEl.classList.add('hidden');}
  else if(started){paused=true;pauseEl.classList.remove('hidden');}
});
document.addEventListener('mousemove',e=>{if(!locked)return;player.yaw-=e.movementX*.00215;player.pitch-=e.movementY*.0019;player.pitch=THREE.MathUtils.clamp(player.pitch,-1.38,1.38);camera.rotation.set(player.pitch,player.yaw,0,'YXZ')});
document.addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys.add(k);if(['w','a','s','d',' ','arrowup','arrowdown','arrowleft','arrowright'].includes(k))e.preventDefault();if(k==='r'){reset()} });
document.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
document.addEventListener('pointerdown',e=>{if(e.button===0&&started&&!locked&&!paused)requestLock()});
document.querySelector('#reset').addEventListener('pointerdown',e=>e.stopPropagation());
function pointSegDist(px,pz,c){const vx=c.x2-c.x1,vz=c.z2-c.z1,l=vx*vx+vz*vz;const t=THREE.MathUtils.clamp(((px-c.x1)*vx+(pz-c.z1)*vz)/l,0,1);return Math.hypot(px-c.x1-t*vx,pz-c.z1-t*vz)}
function blocked(x,z){
  if(x < -14.1||x > 14.1||z < -16.2||z > 16.2)return true;
  for(const c of colliders){if(c.rect){const [x1,z1,x2,z2]=c.rect;if(x>x1-radius&&x<x2+radius&&z>z1-radius&&z<z2+radius)return true;}else if(pointSegDist(x,z,c)<radius+c.t/2)return true;}
  return false;
}
let lastZone='';let previous=performance.now();
function tick(now){
  requestAnimationFrame(tick);const dt=Math.min((now-previous)/1000,.045);previous=now;
  let walking=false;
  if(locked&&!paused&&dt>0){
    const f=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0),side=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0);
    const mag=Math.hypot(f,side);if(mag){walking=true;const speed=keys.has('shift')?1.75:3.15,inv=1/mag;const dx=(-Math.sin(player.yaw)*f+Math.cos(player.yaw)*side)*speed*dt*inv,dz=(-Math.cos(player.yaw)*f-Math.sin(player.yaw)*side)*speed*dt*inv;
      if(!blocked(player.x+dx,player.z))player.x+=dx;if(!blocked(player.x,player.z+dz))player.z+=dz;
    }
  }
  const indoor=player.z<3.28&&Math.abs(player.x)<3.35;const inVest=player.z>=3.28&&player.z<6.7&&Math.abs(player.x)<1.35;
  const zone=indoor?'WORKSPACE / WARM':inVest?'VESTIBULE / AIRLOCK':'OUTSIDE · BLUE HOUR';if(zone!==lastZone){zoneLabel.textContent=zone;lastZone=zone}
  camera.position.set(player.x,floorAt(player.x,player.z)+player.eye+(walking?Math.sin(now*.011)*.014:0),player.z);
  renderer.render(root,camera);
}
requestAnimationFrame(tick);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.65))});
