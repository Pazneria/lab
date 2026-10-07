import * as THREE from 'three';

const loading = document.querySelector('#loading');
const enter = document.querySelector('#enter');
const toast = document.querySelector('#toast');
const locationLabel = document.querySelector('#location');
const caption = document.querySelector('#caption');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x091018);
scene.fog = new THREE.Fog(0x111b20, 22, 43);

const camera = new THREE.PerspectiveCamera(76, innerWidth / innerHeight, 0.08, 120);
camera.rotation.order = 'YXZ';
camera.position.set(2.4, 1.66, 7.35);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.65));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.tabIndex = 0;
renderer.domElement.setAttribute('aria-label', '3D quarters. Click enter, then use WASD and mouse to explore.');
document.querySelector('#scene').prepend(renderer.domElement);

const mat = (color, roughness = .72, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
const M = {
  wall: mat(0x536369, .79), wallLight: mat(0x7a8580, .7), wallDark: mat(0x344349, .76), floor: mat(0x404b4b, .86),
  floorInset: mat(0x68706b, .82), metal: mat(0x8d9a98, .3, .72), darkMetal: mat(0x202a2d, .38, .68), bronze: mat(0xb28b61, .42, .62),
  wood: mat(0x5b4940, .54, .16), woodLight: mat(0x786255, .62, .08), black: mat(0x172023, .4, .5),
  bedBase: mat(0x3b4548, .76, .12), mattress: mat(0xbbb4a7, .94), linen: mat(0xd3c9b6, .98),
  blanket: mat(0x647b7a, .97), blanketDark: mat(0x374d52, .98), goldFabric: mat(0xc59a70, .96),
  leather: mat(0x534640, .81), cream: mat(0xe2dac9, .88), ceramic: mat(0xbbb5a5, .33),
  glass: new THREE.MeshPhysicalMaterial({ color: 0x98d6e3, roughness: .12, metalness: .22, transparent: true, opacity: .13, side: THREE.DoubleSide }),
  darkGlass: mat(0x1c3541, .18, .48), warmGlow: new THREE.MeshBasicMaterial({ color: 0xf5be78 }),
  coolGlow: new THREE.MeshBasicMaterial({ color: 0x8ccee0 }),
  softGlow: new THREE.MeshBasicMaterial({ color: 0xe3bb87 }),
  screen: mat(0x172f37, .26, .15),
};

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const temp = new THREE.Object3D();
const shadowCasters = [];
function box(x, y, z, sx, sy, sz, material, opts = {}) {
  const mesh = new THREE.Mesh(boxGeo, material);
  mesh.position.set(x, y, z); mesh.scale.set(sx, sy, sz);
  mesh.castShadow = opts.cast ?? true; mesh.receiveShadow = opts.receive ?? true;
  scene.add(mesh); if (mesh.castShadow) shadowCasters.push(mesh);
  return mesh;
}
function cylinder(x, y, z, radiusTop, radiusBottom, height, material, seg = 16, rotation = [0, 0, 0]) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, seg), material);
  mesh.position.set(x, y, z); mesh.rotation.set(...rotation); mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh); shadowCasters.push(mesh); return mesh;
}
function sphere(x, y, z, sx, sy, sz, material, detail = 1) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, detail * 12, detail * 8), material);
  mesh.position.set(x, y, z); mesh.scale.set(sx, sy, sz); mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh); shadowCasters.push(mesh); return mesh;
}
function lineBox(x1, y1, z1, x2, y2, z2, width, material) {
  const a = new THREE.Vector3(x1, y1, z1), b = new THREE.Vector3(x2, y2, z2);
  const delta = b.clone().sub(a); const mesh = box((x1+x2)/2, (y1+y2)/2, (z1+z2)/2, width, delta.length(), width, material, { cast: false });
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize()); return mesh;
}
function point(x, y, z, color, intensity, distance, decay = 2) {
  const light = new THREE.PointLight(color, intensity, distance, decay); light.position.set(x, y, z); scene.add(light); return light;
}
function canvasTexture(draw, width = 512, height = 384) {
  const c = document.createElement('canvas'); c.width = width; c.height = height;
  const ctx = c.getContext('2d'); draw(ctx, width, height);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = renderer.capabilities.getMaxAnisotropy(); return tex;
}
function framedPicture(x, y, z, width, height, texture, rotationY = 0) {
  const group = new THREE.Group(); group.position.set(x,y,z); group.rotation.y = rotationY; scene.add(group);
  const add = (px,py,pz,sx,sy,sz,m) => { const o = new THREE.Mesh(boxGeo,m); o.position.set(px,py,pz);o.scale.set(sx,sy,sz);o.castShadow=true;o.receiveShadow=true;group.add(o);return o; };
  add(0,0,0,width+.16,height+.16,.11,M.darkMetal);
  add(0,0,.065,width+.07,height+.07,.028,M.bronze);
  const art = new THREE.Mesh(boxGeo, new THREE.MeshBasicMaterial({ map:texture })); art.position.z=.083; art.scale.set(width,height,.012); group.add(art);
  return group;
}
function labelTexture(title, subtitle) {
  return canvasTexture((c,w,h)=>{
    c.fillStyle='#202c2e'; c.fillRect(0,0,w,h); c.strokeStyle='#b6956f'; c.lineWidth=5; c.strokeRect(13,13,w-26,h-26);
    c.fillStyle='#d3b289'; c.font='500 21px sans-serif'; c.letterSpacing='3px'; c.fillText(title.toUpperCase(),32,68);
    c.fillStyle='#a9b2ab'; c.font='16px sans-serif'; c.fillText(subtitle,32,103);
    c.beginPath(); c.arc(w-64,h/2,27,0,Math.PI*2); c.strokeStyle='#c2a17d'; c.lineWidth=2; c.stroke();
    c.beginPath(); c.moveTo(w-64,h/2-22);c.lineTo(w-64,h/2+22);c.moveTo(w-86,h/2);c.lineTo(w-42,h/2);c.stroke();
  },512,144);
}
const routeTexture = canvasTexture((c,w,h)=>{
  c.fillStyle='#16252a';c.fillRect(0,0,w,h);
  for(let y=26;y<h;y+=35){c.strokeStyle='rgba(155,180,174,.14)';c.lineWidth=1;c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}
  for(let x=32;x<w;x+=35){c.strokeStyle='rgba(155,180,174,.13)';c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}
  c.strokeStyle='#dfb47c';c.lineWidth=3;c.beginPath();c.moveTo(68,246);c.bezierCurveTo(168,220,136,112,244,137);c.bezierCurveTo(314,154,315,67,433,79);c.stroke();
  const pts=[[68,246],[244,137],[433,79],[322,288],[119,78]];
  pts.forEach((p,i)=>{c.beginPath();c.fillStyle=i===1?'#c7e0dd':'#dcad74';c.arc(p[0],p[1],i===1?7:4,0,Math.PI*2);c.fill();});
  c.beginPath();c.strokeStyle='rgba(169,203,199,.47)';c.lineWidth=1.3;c.arc(244,137,42,0,Math.PI*2);c.stroke();
  c.fillStyle='#d7c2a0';c.font='12px monospace';c.fillText('S/09   VEGA TRANSIT',28,34);c.fillText('ORISON · 04.18',30,h-22);
},512,336);
const cabinArt = canvasTexture((c,w,h)=>{
  c.fillStyle='#293839';c.fillRect(0,0,w,h);
  const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#475c59');g.addColorStop(.63,'#8b7761');g.addColorStop(1,'#b28661');c.fillStyle=g;c.fillRect(0,0,w,h);
  c.fillStyle='rgba(230,192,140,.75)';c.beginPath();c.arc(367,112,38,0,Math.PI*2);c.fill();
  c.fillStyle='#344344';c.beginPath();c.moveTo(0,242);c.lineTo(115,122);c.lineTo(223,240);c.lineTo(308,156);c.lineTo(512,260);c.lineTo(512,384);c.lineTo(0,384);c.fill();
  c.fillStyle='#293638';c.beginPath();c.moveTo(0,302);c.lineTo(144,208);c.lineTo(278,305);c.lineTo(389,218);c.lineTo(512,285);c.lineTo(512,384);c.lineTo(0,384);c.fill();
  c.fillStyle='rgba(215,197,161,.5)';c.fillRect(36,321,124,2);
},512,384);
const quiltTexture = canvasTexture((c,w,h)=>{
  c.fillStyle='#59716f';c.fillRect(0,0,w,h);
  c.strokeStyle='rgba(222,207,181,.18)';c.lineWidth=2;
  for(let y=18;y<h;y+=44){c.beginPath();c.moveTo(0,y);c.bezierCurveTo(w*.25,y-14,w*.68,y+14,w,y);c.stroke();}
  for(let x=24;x<w;x+=64){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}
  c.strokeStyle='rgba(210,166,120,.58)';c.lineWidth=5;c.strokeRect(9,9,w-18,h-18);
},512,512);
const rugTexture = canvasTexture((c,w,h)=>{
  c.fillStyle='#74614f';c.fillRect(0,0,w,h);c.strokeStyle='rgba(225,204,169,.45)';c.lineWidth=4;c.strokeRect(13,13,w-26,h-26);
  c.strokeStyle='rgba(47,61,60,.44)';c.lineWidth=2;for(let i=38;i<w;i+=28){c.beginPath();c.moveTo(i,24);c.lineTo(i,h-24);c.stroke();}
  c.beginPath();c.strokeStyle='rgba(220,193,148,.54)';c.lineWidth=3;c.arc(w/2,h/2,62,0,Math.PI*2);c.stroke();
},512,512);

// Structure: one continuous floor and envelope, with two wide open portals linking three zones.
box(0,-.16,0,13,.32,16.1,M.floor);
box(0,3.31,0,13,.20,16.1,M.wallDark);
// Slightly inset floor fields give each room its own domestic identity.
box(-2.3,.009,4.7,7.3,.025,6.15,M.wallDark,{cast:false});
box(3.65,.011,-1.25,5.45,.03,5.25,M.wallLight,{cast:false});
box(-.1,.012,-6.1,12.55,.025,3.65,M.wallDark,{cast:false});
// Perimeter walls: starboard/port, rear window surround and entry bulkhead.
box(-6.43,1.64,0,.24,3.28,16.05,M.wall); box(6.43,1.64,0,.24,3.28,16.05,M.wall);
box(-5.13,1.64,-7.92,2.74,3.28,.24,M.wall);
box(5.13,1.64,-7.92,2.74,3.28,.24,M.wall);
box(0,.325,-7.92,7.52,.65,.24,M.wallDark);
box(0,3.025,-7.92,7.52,.55,.24,M.wall);
// Entry aperture sits at the right, with a substantial cased airlock frame.
box(-2.7,1.64,7.92,7.6,3.28,.24,M.wall);
box(5.1,1.64,7.92,2.8,3.28,.24,M.wall);
box(2.35,2.97,7.92,2.7,.62,.24,M.wall);
// Bedroom / study divider with broad opening.
box(-3.05,1.61,1.38,6.9,3.22,.24,M.wallDark);
box(5.91,1.61,1.38,1.18,3.22,.24,M.wallDark);
box(2.56,3.02,1.38,5.52,.40,.24,M.wallDark);
// Study / observation divider: wide central-right portal on the route to the glass.
box(-2.23,1.61,-4.05,8.54,3.22,.22,M.wallDark);
box(5.86,1.61,-4.05,1.28,3.22,.22,M.wallDark);
box(3.63,3.02,-4.05,3.18,.40,.22,M.wallDark);

function portalFrame(x1,x2,z,color=M.metal) {
  const width=.10;
  for(const x of [x1,x2]){
    box(x,1.38,z,width,2.76,.32,color);
    box(x,1.38,z+Math.sign(z)*.17,.18,2.82,.045,M.darkMetal);
    for(const y of [.48,2.34]) cylinder(x,y,z+.18,.027,.027,.018,M.bronze,8,[Math.PI/2,0,0]);
  }
  box((x1+x2)/2,2.79,z,x2-x1+.12,.11,.32,color);
  box((x1+x2)/2,2.91,z,x2-x1+.06,.035,.34,M.bronze);
}
portalFrame(1.0,5.32,1.38,M.metal); portalFrame(1.80,5.20,-4.05,M.metal);
portalFrame(1.0,3.7,7.92,M.metal);
// Continuous built-in wall caps, inset reveals, skirting and ceiling rails.
for(const side of [-1,1]){
  const x=side*6.25;
  box(x,.18,0,.10,.24,15.65,M.darkMetal);
  box(x,3.08,0,.12,.10,15.7,M.metal);
  for(let z=-7;z<=7;z+=1.25){
    box(side*6.295,1.68,z,.025,2.78,.025,M.wallLight,{cast:false});
    box(side*6.22,1.72,z,.06,2.82,.10,M.wallDark);
    if(z>-3.5&&z<4){box(side*6.16,.67,z,.10,.025,.10,M.bronze);box(side*6.16,2.72,z,.10,.025,.10,M.bronze);}
  }
}
// Overhead panel seams, recessed cove rails, and utility lighting apertures.
for(let z=-7.15;z<=7.2;z+=1.78){box(0,3.195,z,12.35,.035,.035,M.metal,{cast:false});}
for(let x=-5.8;x<=5.81;x+=1.9){box(x,3.19,0,.035,.04,15.2,M.wallLight,{cast:false});}
box(-.3,3.155,3.1,2.2,.035,.42,M.softGlow,{cast:false});
box(4.05,3.155,-1.2,2.7,.035,.32,M.warmGlow,{cast:false});
box(-.4,3.155,-6.25,3.1,.035,.34,M.coolGlow,{cast:false});
box(5.4,3.155,-5.8,.45,.035,3.2,M.coolGlow,{cast:false});

// The observation viewport is a layered four-sided frame around clear glazing.
for(const x of [-3.60,3.60])box(x,1.70,-7.765,.30,2.12,.19,M.darkMetal);
box(0,2.70,-7.765,7.48,.20,.19,M.darkMetal);box(0,.70,-7.765,7.48,.12,.19,M.darkMetal);
for(const x of [-3.41,3.41])box(x,1.70,-7.715,.09,1.66,.12,M.metal);
box(0,2.49,-7.715,6.82,.09,.12,M.metal);box(0,.91,-7.715,6.82,.09,.12,M.metal);
const glazing=new THREE.Mesh(new THREE.PlaneGeometry(6.72,1.49),M.glass);
glazing.position.set(0,1.70,-7.875);scene.add(glazing);
// Fine pressure bars and captive fasteners on the room side of the glass.
box(0,1.70,-7.735,.035,1.48,.035,M.bronze);
for(const x of [-3.30,3.30])for(const y of [1.00,2.40])cylinder(x,y,-7.73,.035,.035,.025,M.bronze,10,[Math.PI/2,0,0]);

// Exterior stars: a single point cloud and one distant ice giant beyond the framed glazing.
let seed=190721; const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
const stars=[];
for(let i=0;i<250;i++){const x=-12+rand()*24;const y=-3+rand()*12;const z=-17-rand()*20;stars.push(x,y,z);}
const starGeo=new THREE.BufferGeometry();starGeo.setAttribute('position',new THREE.Float32BufferAttribute(stars,3));
const starMat=new THREE.PointsMaterial({color:0xc6d8da,size:.065,sizeAttenuation:true,transparent:true,opacity:.88});
scene.add(new THREE.Points(starGeo,starMat));
const planetMat=mat(0x49798a,.94);planetMat.emissive.set(0x0d2b34);planetMat.emissiveIntensity=.22;
const planet=sphere(1.65,1.45,-18.1,1.55,1.55,1.55,planetMat,4);
planet.receiveShadow=false;
const planetBand=mat(0x6e9dad,.98);planetBand.emissive.set(0x153742);planetBand.emissiveIntensity=.24;
const band=sphere(1.54,1.94,-18.0,1.50,.42,1.50,planetBand,3);band.receiveShadow=false;
const planetLight=new THREE.DirectionalLight(0xd9d4bc,1.5);planetLight.position.set(5,6,-9);scene.add(planetLight);
// A modest stylized moon and distant atmospheric line.
const moon=sphere(-2.35,2.58,-19.8,.31,.31,.31,mat(0xa9b9b8,.88),2);

// Shared warm and cool ambient layers, with restrained local pools and very soft cast shadows.
scene.add(new THREE.HemisphereLight(0xc4d3d2,0x2d3433,1.05));
scene.add(new THREE.AmbientLight(0x8f9d9e,.18));
const key=new THREE.DirectionalLight(0xe7d4b5,1.42);key.position.set(-3.8,7.2,5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-8;key.shadow.camera.right=8;key.shadow.camera.top=9;key.shadow.camera.bottom=-9;key.shadow.bias=-.0005;key.shadow.normalBias=.025;scene.add(key);
point(-1.2,2.7,4.5,0xe7b987,5.3,7.0);point(4.5,2.45,-.9,0xdfb27c,4.6,7.1);point(.3,2.2,-6.55,0x79bcd0,5.2,7.0);
point(-.1,1.95,6.4,0xe7b783,1.4,3.0);point(5.95,1.1,-5.8,0x80bed0,1.2,3.5);

// Sleeping cabin: a low upholstered berth, stitched linen, drawers, wardrobe and small personal things.
box(-2.48,.21,4.9,4.32,.40,5.10,M.bedBase);
box(-2.48,.435,4.9,4.02,.10,4.75,M.darkMetal);
box(-2.48,.64,4.84,3.82,.39,4.40,M.mattress);
const quiltMat=new THREE.MeshStandardMaterial({map:quiltTexture,color:0xffffff,roughness:.99});
box(-2.48,.88,4.15,3.77,.15,2.77,quiltMat);
box(-2.48,.90,2.77,3.76,.12,.31,M.blanketDark);
// Folded throw across the lower corner; simple layered weave and tassel edge.
box(-3.92,.994,3.55,.74,.055,1.06,M.goldFabric);
for(let z=3.10;z<=4.0;z+=.16)box(-4.31,.984,z,.18,.028,.018,M.cream,{cast:false});
for(const x of [-3.65,-1.30]){
  box(x,.93,6.42,1.12,.22,.74,M.linen);
  box(x,.823,6.42,1.15,.035,.78,M.blanketDark);
  box(x,.96,6.02,1.12,.025,.035,M.bronze,{cast:false});
}
// Quietly sculpted bolster rolls.
for(const x of [-3.95,-1.0]){cylinder(x,1.01,5.85,.12,.12,1.08,M.cream,20,[0,0,Math.PI/2]);}
// Leather headboard with fluted padded inset, edge rails and twin warm reading sconces.
box(-2.48,1.03,7.35,4.68,1.24,.23,M.wood);
box(-2.48,1.09,7.205,4.27,.72,.08,M.leather);
for(let i=0;i<10;i++)box(-4.42+i*.43,1.1,7.15,.025,.57,.028,M.woodLight,{cast:false});
box(-2.48,1.67,7.2,4.68,.08,.27,M.bronze);
for(const x of [-4.38,-.58]){
  cylinder(x,2.14,7.34,.10,.10,.16,M.bronze,14);
  box(x,2.34,7.30,.36,.10,.18,M.warmGlow,{cast:false});
  point(x,2.25,6.82,0xeab87d,1.45,2.6);
}
// Bedside cabinet: rounded-feel stepped case, four inset drawer fronts, engraved pulls.
box(.36,.48,6.47,.92,.94,.91,M.wood);
box(.36,.98,6.47,1.00,.10,.98,M.woodLight);
for(let i=0;i<3;i++){
  const y=.37+i*.27;box(.36,y,5.997,.73,.20,.035,M.woodLight);
  box(.36,y,5.972,.08,.025,.028,M.bronze,{cast:false});
  for(const dx of [-.3,.3])cylinder(.36+dx,y,5.968,.018,.018,.018,M.bronze,8,[Math.PI/2,0,0]);
}
// Tabletop book, tea cup and folded letter to give Mara's cabin a personal pulse.
box(.35,1.07,6.45,.42,.055,.56,M.blanketDark);box(.35,1.11,6.44,.39,.035,.52,M.cream);
for(let i=0;i<5;i++)box(-.2+i*.045,1.16,6.43,.013,.011,.44,M.bronze,{cast:false});
cylinder(.55,1.18,6.44,.105,.085,.20,M.ceramic,20);cylinder(.55,1.292,6.44,.087,.087,.014,M.darkMetal,20);
cylinder(.71,1.19,6.44,.065,.048,.12,M.ceramic,16); // cup handle suggested by a bronze arc
const handle=cylinder(.775,1.20,6.44,.044,.044,.048,M.ceramic,14,[Math.PI/2,0,0]);
// Built-in wardrobe and captain's coat alcove on port wall.
for(let i=0;i<3;i++){
  const z=2.05+i*1.76;
  box(-6.03,1.52,z,.70,2.78,1.55,M.wallDark);
  box(-5.655,1.52,z,.045,2.55,1.34,M.wallLight);
  box(-5.623,1.55,z,.035,2.42,1.20,M.wall);
  box(-5.59,1.55,z+.31,.025,2.2,.012,M.darkMetal);
  box(-5.56,1.52,z+.45,.035,.24,.07,M.bronze);
  for(const y of [.4,2.67])box(-5.58,y,z,.06,.035,1.25,M.metal);
  for(const zz of [-.48,.48])for(const yy of [.37,2.69])cylinder(-5.54,yy,z+zz,.026,.026,.035,M.bronze,8,[0,0,Math.PI/2]);
}
// Small built-in writing niche and keepsake portrait above the berth.
box(-2.4,2.63,7.48,2.2,.38,.12,M.wallDark);box(-2.4,2.43,7.37,2.06,.035,.28,M.bronze);
framedPicture(-2.4,2.74,7.31,1.04,.60,cabinArt,Math.PI);
box(-3.0,2.70,7.18,.17,.12,.04,M.bronze);box(-1.82,2.70,7.18,.17,.12,.04,M.bronze);
// Bedside wool rug with double binding and a woven medallion.
const rugMat=new THREE.MeshStandardMaterial({map:rugTexture,color:0xffffff,roughness:1});
box(-2.45,.04,2.06,4.82,.035,1.60,rugMat,{cast:false});
// Captain's slippers aligned at the berth edge.
for(const x of [-3.45,-2.98]){
  const slipper=box(x,.115,2.00,.33,.14,.66,M.leather);slipper.rotation.y=.06;
  box(x,.19,2.13,.28,.026,.34,M.woodLight,{cast:false});
}

// Study zone: long metal-edged desk, pedestal, open knee bay and a chair pulled back into the route.
box(5.35,.79,-1.58,1.50,.14,3.62,M.woodLight);
box(5.35,.875,-1.58,1.54,.035,3.66,M.bronze);
box(5.35,.91,-1.58,1.45,.035,3.54,M.woodLight);
for(const z of [-3.20,-.02]){
  box(5.93,.39,z,.34,.70,.36,M.darkMetal);box(5.91,.45,z,.22,.19,.06,M.metal);
  box(5.91,.69,z,.22,.19,.06,M.wood);
  box(4.78,.37,z,.09,.68,.10,M.wood);
}
// Desk modesty rail and an inset brass service runner.
box(5.35,.49,-1.58,.08,.48,2.86,M.wood);
box(4.75,.815,-1.58,.045,.018,2.62,M.bronze,{cast:false});
// Chair: curved-backed silhouette, padded seat and four low-profile legs.
const chairX=3.90;
box(chairX,.62,-1.54,.87,.16,.88,M.leather);
box(chairX,1.06,-1.93,.88,.78,.17,M.leather).rotation.y=-.1;
box(chairX,1.08,-1.82,.65,.48,.035,M.woodLight);
for(const dx of [-.31,.31])for(const dz of [-.31,.31])cylinder(chairX+dx,.29,-1.54+dz,.042,.055,.56,M.darkMetal,12);
// A small articulated desk lamp with shaded cap and real warm pool.
cylinder(4.73,.98,-.14,.20,.20,.06,M.bronze,20);
cylinder(4.73,1.23,-.14,.045,.06,.50,M.darkMetal,14,[0,0,.18]);
lineBox(4.78,1.43,-.14,4.48,1.64,-.28,.035,M.bronze);
cylinder(4.42,1.69,-.32,.22,.14,.17,M.bronze,20,[0,0,.7]);
box(4.42,1.63,-.32,.23,.018,.23,M.warmGlow,{cast:false});
point(4.40,1.58,-.34,0xffca86,1.35,2.7);
// Tactile captain's work material: paper folio, route sheets, physical star-board and stylus.
const paper=mat(0xd8ccb3,.99),paperWhite=mat(0xe8deca,.98),ink=mat(0x74847f,.95);
box(5.03,.956,-1.00,.76,.035,1.08,paper);
box(5.00,.982,-1.02,.68,.012,.95,paperWhite);
for(let i=0;i<6;i++)box(5.0,.991,-1.36+i*.13,.55,.004,.008,ink,{cast:false});
box(5.55,.956,-2.12,.66,.045,.86,M.blanketDark);
box(5.55,.984,-2.12,.62,.018,.82,paper);
for(let i=0;i<4;i++)box(5.55,.997,-2.37+i*.15,.46,.004,.008,ink,{cast:false});
cylinder(4.69,1.025,-2.74,.026,.026,.72,M.bronze,10,[Math.PI/2,0,0]);
box(5.91,1.04,-.44,.38,.18,.42,M.darkMetal);
box(5.91,1.14,-.44,.34,.012,.36,M.screen);
// desk screen: a subdued static vector plotting surface, no buttons or emissive glow
const screenTexture=canvasTexture((c,w,h)=>{
  c.fillStyle='#1c3338';c.fillRect(0,0,w,h);c.strokeStyle='rgba(165,196,186,.22)';c.lineWidth=1;
  for(let x=0;x<w;x+=32){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}for(let y=0;y<h;y+=24){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}
  c.strokeStyle='#d5ad7b';c.lineWidth=2;c.beginPath();c.moveTo(18,64);c.bezierCurveTo(72,61,56,21,109,27);c.stroke();c.fillStyle='#e1c293';c.beginPath();c.arc(109,27,4,0,Math.PI*2);c.fill();
},256,160);
const screenMap=new THREE.Mesh(boxGeo,new THREE.MeshBasicMaterial({map:screenTexture}));screenMap.position.set(5.91,1.149,-.44);screenMap.scale.set(.30,.13,.006);screenMap.rotation.x=-Math.PI/2;scene.add(screenMap);
// Wall route folio in a solid anodized casing, framed as a static chart.
box(5.94,2.06,-1.52,.14,1.31,2.36,M.darkMetal);
box(5.84,2.06,-1.52,.055,1.14,2.18,M.bronze);
const chart = new THREE.Mesh(boxGeo,new THREE.MeshBasicMaterial({map:routeTexture}));chart.position.set(5.805,2.06,-1.52);chart.scale.set(2.08,1.05,.035);chart.rotation.y=-Math.PI/2;scene.add(chart);
// Side-access drawer bank and a set of bound logs on the study shelf.
box(-1.72,.55,-2.68,1.76,1.08,.76,M.wallDark);box(-1.72,1.11,-2.68,1.92,.12,.88,M.woodLight);
for(let i=0;i<3;i++){box(-1.72,.28+i*.27,-2.285,1.42,.20,.04,M.wallLight);box(-1.72,.28+i*.27,-2.255,.09,.025,.03,M.bronze,{cast:false});}
box(-2.48,2.42,-2.62,.26,.09,2.24,M.woodLight);
for(let i=0;i<7;i++){
  const colors=[0x917d67,0x536b6a,0x706056,0x8d795e,0x485f62,0x9a886f,0x5c5650];
  box(-2.48,2.59,-3.46+i*.28,.23,.29,.22,mat(colors[i],.84));
  box(-2.48,2.59,-3.46+i*.28,.235,.035,.228,M.bronze,{cast:false});
}
// Archive folio pinned on the port-side bulkhead, chart face toward the room.
framedPicture(-5.98,2.14,-1.18,.66,1.15,routeTexture,Math.PI/2);
// Soft wall upholstery panel below the route chart.
box(-6.14,1.06,-1.25,.12,.78,1.89,M.leather);
for(let z=-2.03;z<=-.46;z+=.16)box(-6.063,1.06,z,.035,.64,.018,M.woodLight,{cast:false});

// Observation nook: warm wool window seat, quilted pad, cushion, ledge shelf, fold-down cup ring.
box(-5.24,.47,-6.13,1.55,.77,2.45,M.wood);
box(-5.14,.91,-6.12,1.64,.20,2.57,M.leather);
box(-5.14,1.04,-6.12,1.43,.12,2.39,M.blanket);
for(const z of [-7.28,-4.98])box(-5.14,.61,z,1.82,.12,.10,M.bronze);
box(-5.14,1.27,-6.25,.90,.23,.69,M.goldFabric).rotation.y=.1;
box(-5.14,1.23,-6.25,.94,.045,.73,M.cream).rotation.y=.1;
// Book and wall sconce at the inside end of the upholstered ledge.
box(-4.98,1.15,-5.03,.47,.05,.60,M.blanketDark);box(-4.98,1.18,-5.03,.43,.018,.56,M.cream);
for(let i=0;i<5;i++)box(-4.98,1.195,-5.25+i*.1,.35,.004,.008,ink,{cast:false});
box(-5.93,2.08,-6.15,.12,.42,.42,M.darkMetal);box(-5.84,2.1,-6.15,.07,.27,.27,M.softGlow,{cast:false});
point(-5.30,2.1,-6.15,0xe8b67c,1.15,2.6);
// Narrow sill shelf, pressure latch, and a resting cup turned toward the window.
box(0,2.76,-7.62,6.76,.09,.34,M.woodLight);
for(const x of [-2.7,2.7])box(x,2.70,-7.66,.12,.16,.19,M.bronze);
box(5.02,.99,-7.42,1.02,.08,.42,M.woodLight);
cylinder(5.04,1.14,-7.41,.09,.078,.20,M.ceramic,20);cylinder(5.04,1.25,-7.41,.074,.074,.012,M.darkMetal,20);
// Small companion's brass star charm, hung at the seat's end.
lineBox(-4.88,1.72,-5.10,-4.88,1.39,-5.10,.018,M.bronze);
const charm=new THREE.Mesh(new THREE.OctahedronGeometry(.11,0),M.bronze);charm.position.set(-4.88,1.34,-5.10);scene.add(charm);
// Glazing-side practicals: matte strip housings and low-output cool diffuser.
box(-3.58,1.73,-7.98,.12,2.12,.24,M.darkMetal);box(3.58,1.73,-7.98,.12,2.12,.24,M.darkMetal);
box(-3.58,1.75,-7.84,.045,1.36,.06,M.coolGlow,{cast:false});box(3.58,1.75,-7.84,.045,1.36,.06,M.coolGlow,{cast:false});

// Captain's understated insignia: a compass-point emblem and one service ribbon panel.
const insignia=new THREE.Group();insignia.position.set(-6.2,2.16,4.2);insignia.rotation.y=Math.PI/2;scene.add(insignia);
const emblemOuter=new THREE.Mesh(new THREE.CircleGeometry(.30,8),M.bronze);emblemOuter.position.z=.01;insignia.add(emblemOuter);
const emblemInner=new THREE.Mesh(new THREE.CircleGeometry(.23,8),M.wallDark);emblemInner.position.z=.025;insignia.add(emblemInner);
const emblemStar=new THREE.Mesh(new THREE.OctahedronGeometry(.14,0),M.goldFabric);emblemStar.position.z=.075;insignia.add(emblemStar);
for(let i=0;i<3;i++)box(-6.09,1.61,4.61+i*.17,.035,.08,.12,[M.bronze,M.coolGlow,M.goldFabric][i],{cast:false});

// Convert the authored blockout to a compact, human-scale suite (about 6.5 × 8 m).
// Keep the camera at world scale so the perspective projection stays undistorted.
const quarters = new THREE.Group();
for(const child of [...scene.children])quarters.add(child);
quarters.scale.set(.5,.82,.5);
scene.add(quarters);
planet.scale.y*=.5/.82;band.scale.y*=.5/.82;moon.scale.y*=.5/.82;

// High-frequency seams, fittings and trim are all matte/recessed so the practicals stay calm.
function hatch(x,y,z,vertical='z'){
  if(vertical==='z'){
    box(x,y,z,.83,1.08,.055,M.darkMetal);box(x,y,z-.036,.68,.91,.018,M.wallLight);
    box(x,y,z-.052,.54,.74,.02,M.wall);box(x+.23,y,z-.072,.035,.34,.028,M.bronze);
    for(const yy of [y-.45,y+.45])cylinder(x-.24,yy,z-.06,.022,.022,.025,M.bronze,8,[Math.PI/2,0,0]);
  }else{
    box(x,y,z,.055,1.08,.83,M.darkMetal);box(x-.036,y,z,.018,.91,.68,M.wallLight);
    box(x-.052,y,z,.02,.74,.54,M.wall);box(x-.072,y,z+.23,.028,.34,.035,M.bronze);
    for(const yy of [y-.45,y+.45])cylinder(x-.06,yy,z-.24,.022,.022,.025,M.bronze,8,[0,0,Math.PI/2]);
  }
}
hatch(-6.18,1.82,-3.86,'x');hatch(-6.18,1.82,.18,'x');hatch(6.17,1.92,3.48,'x');
// Service access door on the study's starboard wall, separate from the main walkthrough.
hatch(6.18,1.80,-3.13,'x');
// An understated captain's call plate by the entry, tactile brass inset, no active controls.
box(4.15,1.42,7.70,.42,.55,.10,M.darkMetal);box(4.15,1.42,7.635,.30,.40,.028,M.wallLight);
box(4.15,1.46,7.615,.18,.21,.016,M.wood);box(4.15,1.47,7.60,.11,.13,.01,M.softGlow,{cast:false});
for(const x of [4.05,4.25])cylinder(x,1.24,7.59,.018,.018,.02,M.bronze,8,[Math.PI/2,0,0]);

// Make most furniture cast soft directional shadows; excluded hardware remains light for rendering.
// Low-cost static shadow map uses only the principal cabin key light.
shadowCasters.forEach(o=>{o.castShadow=true;o.receiveShadow=true;});

// Mouse-look, responsive planar WASD movement, axis-separated obstacle contact and reset.
const player={x:2.55,z:7.35,yaw:0,pitch:0};
const START={x:2.55,z:7.35,yaw:0,pitch:0};
const blocked=[
  [-6.50,.40,1.23,1.53],        // bedroom/study bulkhead, port side of portal
  [5.32,6.50,1.23,1.53],        // bedroom/study bulkhead, starboard side
  [-6.50,2.04,-4.17,-3.93],    // study/nook pressure wall, port side of portal
  [5.22,6.50,-4.17,-3.93],      // study/nook pressure wall, starboard side
  [-4.75,-.17,2.12,7.58],       // berth and padded frame
  [-.18,.84,5.88,7.04],         // bedside chest
  [-6.40,-5.12,1.0,7.70],       // port built-ins
  [4.39,6.28,-3.52,.15],        // desk and fixed pedestals
  [3.36,4.46,-2.10,-.98],       // desk chair at comfortable pullback
  [-6.25,-4.12,-7.36,-4.86],    // upholstered observation ledge
  [4.42,5.62,-7.98,-7.41],     // end table beside the window
];
const radius=.38;
const keys=new Set();
function reset(){player.x=START.x;player.z=START.z;player.yaw=START.yaw;player.pitch=START.pitch;camera.position.set(player.x*.5,1.66,player.z*.5);camera.rotation.set(0,player.yaw,0,'YXZ');toastMsg('BACK AT THE ENTRY');}
function toastMsg(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastMsg.timer);toastMsg.timer=setTimeout(()=>toast.classList.remove('show'),1700);}
function collides(x,z){
  const minX=-6.18,maxX=6.18,minZ=-7.50,maxZ=7.70;
  if(x<minX||x>maxX||z<minZ||z>maxZ)return true;
  for(const [x1,x2,z1,z2] of blocked){const cx=THREE.MathUtils.clamp(x,x1,x2),cz=THREE.MathUtils.clamp(z,z1,z2);if((x-cx)**2+(z-cz)**2<radius*radius)return true;}
  return false;
}
function setPosition(x,z){if(!collides(x,player.z))player.x=x;if(!collides(player.x,z))player.z=z;}
let locked=false;
function lockPointer(){renderer.domElement.requestPointerLock?.();}
enter.addEventListener('click',lockPointer);renderer.domElement.addEventListener('click',()=>{if(!locked)lockPointer();});
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===renderer.domElement;document.body.classList.toggle('locked',locked);if(locked){document.querySelector('#welcome').setAttribute('aria-hidden','true');}});
document.addEventListener('mousemove',e=>{if(!locked)return;player.yaw-=e.movementX*.00225;player.pitch=THREE.MathUtils.clamp(player.pitch-e.movementY*.00205,-1.12,1.12);});
window.addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowleft','arrowdown','arrowright','shift',' '].includes(k))e.preventDefault();keys.add(k);if(k==='r')reset();});
window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));window.addEventListener('blur',()=>keys.clear());
let last=performance.now();
function roomName(){
  if(player.z>1.58){locationLabel.textContent='SLEEPING CABIN';caption.textContent='A place kept in order, with a few things out of place.';}
  else if(player.z>-4.18){locationLabel.textContent='PRIVATE STUDY';caption.textContent='Route folios. Dispatch notes. The work waiting until morning.';}
  else{locationLabel.textContent='OBSERVATION NOOK';caption.textContent='No one has called the lights in this quadrant for days.';}
}
function animate(now){
  const dt=Math.min(.05,(now-last)/1000);last=now;
  const forward=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0);
  const strafe=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0);
  if(forward||strafe){const len=Math.hypot(forward,strafe);const speed=(keys.has('shift')?4.55:3.15)*dt;const f=forward/len*speed,r=strafe/len*speed;
    const sin=Math.sin(player.yaw),cos=Math.cos(player.yaw);setPosition(player.x+sin*f+cos*r,player.z-cos*f+sin*r);
  }
  camera.position.set(player.x*.5,1.66,player.z*.5);camera.rotation.set(player.pitch,player.yaw,0,'YXZ');roomName();
  renderer.render(scene,camera);requestAnimationFrame(animate);
}
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.65));renderer.setSize(innerWidth,innerHeight);});
loading.style.opacity='0';setTimeout(()=>loading.remove(),380);
requestAnimationFrame(animate);
