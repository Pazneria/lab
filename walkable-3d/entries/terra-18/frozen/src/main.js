import * as THREE from '../vendor/three.module.js';

// The Meridian: an original, self-contained room. Measurements are in metres.
const root = document.querySelector('#scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x080e15);
const camera = new THREE.PerspectiveCamera(68, innerWidth / innerHeight, .045, 80);
camera.rotation.order = 'YXZ';
const renderer = new THREE.WebGLRenderer({antialias:true, powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.13;
root.appendChild(renderer.domElement);

const mat = (color, roughness=.8, metalness=0, extra={}) => new THREE.MeshStandardMaterial({color, roughness, metalness, ...extra});
const M = {
 shell:mat(0xa5b2b0,.87), shellLight:mat(0xc0c8c2,.8), shellDark:mat(0x657779,.83), inset:mat(0x394d50,.83),
 trim:mat(0x5c7073,.45,.65), darkMetal:mat(0x24373c,.48,.65), alloy:mat(0x89999a,.38,.72),
 floor:mat(0x687677,.85), floorDark:mat(0x34494c,.86), wood:mat(0x82674d,.77), woodLight:mat(0xa18767,.78),
 ink:mat(0x192d35,.84), teal:mat(0x315c5c,.92), cloth:mat(0xc3b7a0,1), linen:mat(0xe0d6bf,1),
 ochre:mat(0xbc8958,1), rust:mat(0x925b48,1), paper:mat(0xd5c8aa,1), green:mat(0x4f7259,1),
 lamp: new THREE.MeshBasicMaterial({color:0xffdfb0}), coolLamp:new THREE.MeshBasicMaterial({color:0xb9ebf2}),
 black:mat(0x101c20,.55), screen:mat(0x16363d,.35,.35,{emissive:0x102b2f,emissiveIntensity:.45}),
 glass:new THREE.MeshPhysicalMaterial({color:0x9cc9d2,roughness:.12,metalness:.08,transparent:true,opacity:.16,depthWrite:false,side:THREE.DoubleSide})
};
// Subtle woven and brushed material response without large image assets.
function noiseTexture(kind){
 const c=document.createElement('canvas'); c.width=c.height=128; const ctx=c.getContext('2d');
 let s=13579; const rnd=()=>{s=(s*16807)%2147483647;return s/2147483647};
 ctx.fillStyle=kind==='fabric'?'#e1ded6':'#c2c7c5';ctx.fillRect(0,0,128,128);
 for(let i=0;i<(kind==='fabric'?1700:450);i++){
  const v=Math.floor(160+rnd()*70);ctx.strokeStyle=`rgba(${v},${v},${v},${kind==='fabric'?.12:.09})`;
  ctx.beginPath();let x=rnd()*128,y=rnd()*128;ctx.moveTo(x,y);ctx.lineTo(x+(kind==='fabric'?rnd()*8:50+rnd()*78),y+(kind==='fabric'?0:0.3));ctx.stroke();
 }
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(kind==='fabric'?3:2,kind==='fabric'?3:2);t.colorSpace=THREE.SRGBColorSpace;return t;
}
const weave=noiseTexture('fabric'), brushed=noiseTexture('metal');
for(const m of [M.cloth,M.linen,M.teal,M.ochre,M.rust]) {m.map=weave; m.needsUpdate=true;}
M.alloy.map=brushed; M.alloy.needsUpdate=true;

const cube=new THREE.BoxGeometry(1,1,1), sphere=new THREE.SphereGeometry(1,20,12), cyl=new THREE.CylinderGeometry(1,1,1,20);
function box(x,y,z,w,h,d,m,parent=scene){const o=new THREE.Mesh(cube,m);o.position.set(x,y,z);o.scale.set(w,h,d);parent.add(o);return o;}
function ball(x,y,z,r,m,parent=scene){const o=new THREE.Mesh(sphere,m);o.position.set(x,y,z);o.scale.setScalar(r);parent.add(o);return o;}
function cylinder(x,y,z,r,h,m,parent=scene){const o=new THREE.Mesh(cyl,m);o.position.set(x,y,z);o.scale.set(r,h,r);parent.add(o);return o;}
function tubeBetween(a,b,r,m){let mid=new THREE.Vector3().addVectors(a,b).multiplyScalar(.5),dir=new THREE.Vector3().subVectors(b,a);let o=cylinder(mid.x,mid.y,mid.z,r,dir.length(),m);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());return o;}
function bevelBox(x,y,z,w,h,d,m){ // a softly edged silhouette assembled from inset faces and narrow edge strips
 box(x,y,z,w,h,d,m); return {x,y,z};
}
function line(x,y,z,w,h,d,m=M.trim){return box(x,y,z,w,h,d,m)}
function labelTexture(title,sub){const c=document.createElement('canvas');c.width=512;c.height=256;const g=c.getContext('2d');g.fillStyle='#1c3337';g.fillRect(0,0,512,256);g.strokeStyle='#9ab5ad';g.lineWidth=3;g.strokeRect(12,12,488,232);g.fillStyle='#c8d9cc';g.font='bold 34px sans-serif';g.fillText(title,38,91);g.font='18px sans-serif';g.fillStyle='#9fb8af';g.fillText(sub,40,131);g.fillRect(40,159,260,3);g.fillStyle='#d2b181';g.fillRect(40,180,65,4);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}

// Lighting is intentionally broad; practical fixtures supply the visual cues.
scene.add(new THREE.HemisphereLight(0xc4d9da,0x384039,2.0));
const sun=new THREE.DirectionalLight(0xe8dfc8,1.0);sun.position.set(-4,7,3);scene.add(sun);
function point(x,y,z,color,intensity,dist){const l=new THREE.PointLight(color,intensity,dist,2);l.position.set(x,y,z);scene.add(l);}
point(-5.3,2.65,-1.5,0xffbf80,13,8);point(.3,2.6,-1.6,0xffd6a7,11,8);point(7,2.3,0,0x85d9ef,15,8);

// Floor and ceiling: seams, maintenance panels, perimeter rails.
box(0,-.12,0,18,.24,7.2,M.floorDark);box(0,.005,0,17.8,.025,7.02,M.floor);
for(let x=-8.7;x<9;x+=1.15) line(x,.023,0,.015,.008,7,M.floorDark);
for(let z=-3.48;z<=3.48;z+=1.16) line(0,.024,z,17.8,.008,.012,M.floorDark);
box(0,3.18,0,18,.24,7.2,M.shellDark);box(0,3.035,0,17.8,.035,6.95,M.shellLight);
for(let x=-8.6;x<9;x+=1.25) line(x,3.006,0,.024,.035,6.95,M.trim);
for(let z of [-3.43,3.43]) {box(0,.13,z,18,.23,.18,M.darkMetal);box(0,2.94,z,18,.18,.18,M.darkMetal);}
for(let x of [-7.0,-3.2,1.0,4.65,7.55]) {
 box(x,3.0,0,1.9,.04,.34,M.inset);box(x,2.974,0,1.64,.018,.13,x>4?M.coolLamp:M.lamp);
}
// Long side walls: layered composite cassettes, recessed joints and fasteners.
for(const side of [-1,1]){
 const z=side*3.62;
 box(0,1.53,z,18,3.06,.24,M.shell);
 box(0,.42,z-side*.14,17.8,.58,.07,M.shellDark);
 box(0,2.62,z-side*.14,17.8,.65,.07,M.shellLight);
 for(let x=-8.9;x<9;x+=1.2){
  line(x,1.6,z-side*.15,.025,2.4,.045,M.inset);
  line(x+.6,2.64,z-side*.185,.94,.018,.025,M.trim);
  for(let y of [.72,2.29]) ball(x+.05,y,z-side*.19,.025,M.alloy);
 }
 line(0,.75,z-side*.19,17.8,.025,.035,M.trim);line(0,2.3,z-side*.19,17.8,.026,.035,M.trim);
}
// Entrance bulkhead and sealed door.
box(-9,1.55,0,.25,3.1,7.2,M.shellDark);
box(-8.84,1.45,0,.12,2.85,2.28,M.darkMetal);box(-8.76,1.45,0,.09,2.68,1.94,M.shellLight);
box(-8.70,1.45,0,.025,2.54,.018,M.trim);box(-8.67,1.5,.75,.035,.46,.11,M.inset);box(-8.64,1.5,.75,.02,.3,.035,M.coolLamp);
for(let z of [-1.17,1.17]) box(-8.67,1.45,z,.12,2.94,.09,M.alloy);
box(-8.66,2.95,0,.1,.11,2.4,M.alloy);
// Framed window and layered exterior at the far end.
for(const z of [-3.1,3.1]) box(8.94,1.55,z,.24,3.1,1.0,M.shellDark);
box(8.94,.30,0,.24,.60,5.3,M.shellDark);box(8.94,2.82,0,.24,.56,5.3,M.shellDark);
for(const z of [-2.66,2.66]) {box(8.79,1.55,z,.32,2.55,.15,M.alloy);box(8.62,1.55,z,.12,2.55,.035,M.inset);}
for(const y of [.57,2.56]) {box(8.79,y,0,.32,.14,5.42,M.alloy);box(8.60,y,0,.08,.035,5.2,M.darkMetal);}
box(8.72,1.57,0,.025,1.92,5.13,M.glass);
box(8.52,.72,0,.72,.12,5.24,M.alloy);box(8.35,.80,0,.35,.04,5.18,M.shellLight);
line(8.54,2.49,0,.07,.025,4.9,M.coolLamp);
// Exterior backdrop and a stylized planet, deliberately static.
const spaceMat=new THREE.MeshBasicMaterial({color:0x07121f});box(18,1.5,0,.1,30,38,spaceMat);
const planetMat=new THREE.MeshStandardMaterial({color:0x447b88,roughness:1,emissive:0x123848,emissiveIntensity:.3});
const planet=ball(13.7,.3,-1.6,2.55,planetMat);
// Thin offset arcs on the planetary disc suggest a clouded atmosphere.
const cloudMat=mat(0x9dbcb9,.95,0,{transparent:true,opacity:.42});
for(let i=0;i<7;i++){let y=-1.0+i*.55;let rr=Math.sqrt(Math.max(0,2.45**2-y*y));let strip=box(11.14,.3+y,-1.6, .025,.06+(.03*(i%2)),rr*1.65,cloudMat);strip.rotation.x=.14;}
let seed=174;const rand=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
const starGeo=new THREE.BufferGeometry(), positions=[];for(let i=0;i<260;i++){positions.push(16,rand()*20-8,rand()*30-15)}starGeo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));const stars=new THREE.Points(starGeo,new THREE.PointsMaterial({color:0xd4edfa,size:.045,sizeAttenuation:true}));scene.add(stars);

// Structural ribs mark transitions without blocking the continuous walking route.
for(let x of [-2.55,4.35]){
 for(let s of [-1,1]){box(x,1.56,s*3.38,.18,3.1,.33,M.darkMetal);box(x,1.6,s*3.17,.09,2.72,.07,M.alloy);}
 box(x,2.96,0,.22,.18,6.8,M.darkMetal);box(x,2.84,0,.08,.025,6.55,M.alloy);
}

// Bedroom: built-in berth, fitted drawers, layered linen, reading light, and storage.
box(-5.5,.30,-2.17,3.8,.58,2.32,M.wood);box(-5.5,.12,-2.17,3.9,.18,2.42,M.darkMetal);
for(let x of [-6.55,-5.5,-4.45]){box(x,.35,-.985,.93,.30,.035,M.woodLight);line(x,.36,-.955,.28,.018,.025,M.darkMetal);}
box(-5.5,.67,-2.17,3.62,.22,2.19,M.linen);
box(-5.0,.81,-2.17,2.48,.13,2.22,M.teal);box(-4.12,.89,-2.17,.72,.08,2.24,M.cloth);
for(let z of [-2.75,-1.65]){box(-6.8,.84,z,.70,.20,.93,M.linen);box(-6.76,.94,z,.56,.035,.78,M.cloth);}
box(-7.52,1.15,-2.17,.16,1.37,2.45,M.woodLight);for(let z of [-2.9,-2.2,-1.5])box(-7.41,1.38,z,.05,.62,.6,M.teal);
// Tall lockers and open niche at the foot of the berth.
box(-3.2,1.45,-3.02,.8,2.8,1.05,M.shellLight);box(-3.2,1.45,-2.47,.69,2.63,.04,M.shellDark);
for(let y of [.52,1.35,2.2]){line(-3.2,y,-2.43,.58,.02,.02,M.trim);line(-2.99,y+.2,-2.40,.025,.23,.035,M.alloy);}
box(-6.1,2.32,-3.36,2.9,.13,.46,M.woodLight);box(-6.1,2.67,-3.47,2.9,.52,.21,M.shellDark);
for(let x of [-7.1,-6.6,-6.1,-5.6,-5.1]) box(x,2.67,-3.34,.025,.47,.03,M.trim);
// Pillow-side reading lamp with a directed stem and warm shade.
cylinder(-7.15,1.14,-.8,.16,.08,M.darkMetal);tubeBetween(new THREE.Vector3(-7.15,1.2,-.8),new THREE.Vector3(-7.15,1.65,-.8),.025,M.alloy);cylinder(-7.15,1.67,-.8,.13,.12,M.lamp);
box(-6.9,.62,-.72,.9,1.20,.62,M.woodLight);box(-6.9,1.25,-.72,1,.08,.72,M.wood);line(-6.9,.82,-.39,.3,.025,.02,M.darkMetal);
// A rug visually softens the passage beside the berth.
box(-5.4,.043,.46,4.5,.016,1.55,M.rust);box(-5.4,.054,.46,4.25,.008,1.32,M.cloth);
for(let x=-7.4;x<-3.3;x+=.32) line(x,.061,.46,.025,.005,1.25,M.rust);

// Private study: work surface, task lamp, paper, chart, shelves and a chair.
box(.55,.71,-2.64,4.5,.16,1.65,M.woodLight);box(.55,.60,-2.64,4.54,.09,1.7,M.darkMetal);
box(-1.15,.36,-2.67,.65,.68,1.52,M.shellDark);box(2.25,.36,-2.67,.65,.68,1.52,M.shellDark);
for(let x of [-1.15,2.25]) for(let y of [.18,.40,.61]){box(x,y,-1.887,.57,.18,.025,M.shellLight);line(x,y,-1.866,.22,.016,.015,M.trim);}
// Desk equipment: display, stacked physical charts, writing tools.
box(-.45,.85,-2.97,1.35,.06,.66,M.darkMetal);box(-.45,1.27,-3.17,1.38,.77,.10,M.darkMetal);box(-.45,1.27,-3.105,1.22,.61,.015,M.screen);
for(let y of [1.13,1.25,1.37]) line(-.5,y,-3.092,.84,.012,.008,M.alloy);
box(1.0,.82,-2.37,.85,.035,.62,M.paper);box(1.07,.86,-2.39,.82,.035,.62,M.linen);line(1.07,.885,-2.39,.65,.006,.008,M.shellDark);
cylinder(1.8,.84,-2.36,.12,.19,M.ochre);cylinder(1.8,.945,-2.36,.09,.015,M.black);
box(.85,.85,-2.15,.32,.025,.025,M.darkMetal);
cylinder(-1.15,.84,-2.35,.18,.06,M.darkMetal);tubeBetween(new THREE.Vector3(-1.15,.86,-2.35),new THREE.Vector3(-1.15,1.4,-2.55),.025,M.alloy);box(-1.15,1.42,-2.55,.45,.07,.25,M.darkMetal);box(-1.15,1.375,-2.55,.36,.018,.18,M.lamp);
// Back wall shelves with books and command keepsakes.
for(let y of [1.72,2.33]){box(.55,y,-3.34,4.35,.075,.48,M.wood);box(.55,y-.09,-3.51,4.35,.12,.09,M.darkMetal);}
const bookColors=[M.ink,M.rust,M.cloth,M.teal,M.ochre,M.shellDark];
for(let i=0;i<15;i++){const x=-1.42+i*.17;let h=.29+(i%4)*.055;box(x,1.78+h/2,-3.27,.13,h,.26,bookColors[i%bookColors.length]);line(x,1.83,-3.125,.09,.012,.01,M.alloy);}
box(1.82,1.93,-3.26,.46,.35,.11,M.darkMetal);box(1.82,1.93,-3.19,.37,.26,.01,M.ochre);
// The captain's navigation chart is decorative and does not depend on readable text.
function chartCanvas(){let c=document.createElement('canvas');c.width=512;c.height=320;let g=c.getContext('2d');g.fillStyle='#263f43';g.fillRect(0,0,512,320);g.strokeStyle='#678681';g.lineWidth=1;for(let x=0;x<512;x+=32){g.beginPath();g.moveTo(x,0);g.lineTo(x,320);g.stroke()}for(let y=0;y<320;y+=32){g.beginPath();g.moveTo(0,y);g.lineTo(512,y);g.stroke()}g.strokeStyle='#d7b37a';g.lineWidth=3;g.beginPath();g.moveTo(38,250);g.bezierCurveTo(120,72,245,270,445,70);g.stroke();for(let i=0;i<35;i++){g.fillStyle=i%5?'#c8d5c4':'#e2bb80';g.fillRect((i*127)%480+15,(i*83)%290+15,3,3)}return c;}
let chartTex=new THREE.CanvasTexture(chartCanvas());chartTex.colorSpace=THREE.SRGBColorSpace;let chartMat=new THREE.MeshBasicMaterial({map:chartTex});
box(2.2,2.62,-3.35,1.6,.72,.09,M.darkMetal);box(2.2,2.62,-3.29,1.45,.60,.02,chartMat);
// Chair, with a readable cantilever base and padded back.
box(.35,.53,-1.27,.92,.15,.82,M.teal);box(.35,1.04,-.91,.92,.92,.13,M.teal);box(.35,.98,-.83,.75,.66,.05,M.cloth);
for(let x of [-.02,.72]) {tubeBetween(new THREE.Vector3(x,.47,-1.58),new THREE.Vector3(x,.08,-1.58),.035,M.alloy);tubeBetween(new THREE.Vector3(x,.47,-.98),new THREE.Vector3(x,.08,-.98),.035,M.alloy);tubeBetween(new THREE.Vector3(x,.08,-1.58),new THREE.Vector3(x,.08,-.98),.035,M.alloy);}

// Opposite the desk: a recessed credenza, captain's botanical specimen and personal objects.
box(.7,.60,3.01,4.45,1.15,1.04,M.shellDark);box(.7,1.2,2.99,4.55,.1,1.1,M.woodLight);
for(let x of [-.65,.25,1.15,2.05]){box(x,.61,2.46,.83,.95,.035,M.shellLight);line(x,.8,2.43,.22,.025,.018,M.alloy);}
// Small potted plant, branching rather than a billboard.
cylinder(-.75,1.32,2.89,.18,.22,M.rust);
for(let i=0;i<7;i++){let a=i*Math.PI*2/7, tip=new THREE.Vector3(-.75+Math.cos(a)*.25,1.75+(i%3)*.08,2.89+Math.sin(a)*.23);tubeBetween(new THREE.Vector3(-.75,1.42,2.89),tip,.015,M.green);let leaf=ball(tip.x,tip.y,tip.z,.13,M.green);leaf.scale.set(.09,.20,.075);leaf.rotation.z=Math.cos(a)*.7;}
for(let i=0;i<4;i++)box(.15+i*.13,1.28+i*.055,2.96,.55,.045,.4,bookColors[i]);
cylinder(1.64,1.26,2.92,.16,.08,M.darkMetal);ball(1.64,1.43,2.92,.15,M.alloy);
// A framed memento and subtle cabin identifier on the wall.
box(.7,2.05,3.40,1.45,.78,.08,M.wood);box(.7,2.05,3.34,1.30,.63,.02,M.inset);
for(let i=0;i<8;i++){let x=.15+i*.15;box(x,1.95+Math.sin(i)*.05,3.32,.10,.018,.008,M.ochre);}
const signMat=new THREE.MeshBasicMaterial({map:labelTexture('A. VALE','CAPTAIN  /  MERIDIAN')});box(-7.98,1.83,3.43,1.25,.62,.04,M.darkMetal);box(-7.98,1.83,3.39,1.16,.53,.015,signMat);

// Observation nook: upholstered bench, bolsters, low table, frame and handrail.
box(6.65,.32,2.66,3.5,.56,1.54,M.shellDark);box(6.65,.64,2.66,3.42,.16,1.43,M.ochre);box(6.65,1.03,3.30,3.42,.75,.18,M.teal);
for(let x of [5.6,7.7]){box(x,.79,2.75,.66,.23,.64,M.cloth);box(x,.88,3.12,.72,.54,.20,M.cloth);}
for(let x of [5.45,6.4,7.35]){box(x,.32,1.87,.84,.25,.025,M.shellLight);line(x,.33,1.85,.23,.02,.02,M.alloy);}
box(6.35,.08,-.15,2.65,.025,2.30,M.teal);box(6.35,.095,-.15,2.42,.009,2.08,M.cloth);
cylinder(6.9,.16,.86,.38,.12,M.darkMetal);cylinder(6.9,.43,.86,.065,.5,M.alloy);cylinder(6.9,.70,.86,.46,.08,M.woodLight);
cylinder(6.9,.78,.86,.11,.11,M.paper);cylinder(6.9,.84,.86,.085,.014,M.black);
// Hand rail spans the sill but leaves the view and walking approach clear.
tubeBetween(new THREE.Vector3(8.31,.96,-2.35),new THREE.Vector3(8.31,.96,2.35),.035,M.alloy);
for(let z of [-2.25,2.25])tubeBetween(new THREE.Vector3(8.31,.80,z),new THREE.Vector3(8.31,.96,z),.025,M.alloy);
// A few inset floor lights and wall vents provide purposeful construction detail.
for(let x of [-7,-3,1,5,8]) for(let z of [-3.25,3.25]) box(x,.05,z,.36,.012,.025,x>4?M.coolLamp:M.lamp);
for(let x of [-8.1,3.4,7.9]) for(let i=0;i<5;i++) box(x,1.0+i*.07,3.455,.42,.018,.012,M.inset);

// Fine domestic fittings and small signs of the captain's routines.
// Pillow piping and a folded blanket edge give the berth a softer silhouette.
for (const z of [-2.75,-1.65]) {
 for (const dz of [-.40,.40]) box(-6.8,.945,z+dz,.56,.012,.012,M.ochre);
 for (const dx of [-.28,.28]) box(-6.8+dx,.945,z,.012,.012,.8,M.ochre);
}
for (const x of [-5.9,-5.3,-4.7,-4.3]) box(x,.886,-2.17,.014,.008,2.04,M.shellDark);
box(-4.08,.932,-2.17,.06,.012,2.12,M.ochre);
// A flight jacket hangs in an inset beside the berth, kept close to the wall.
box(-5.55,1.81,3.43,1.28,1.65,.08,M.inset);
box(-5.55,1.88,3.34,.72,1.12,.10,M.ink);
let sleeve1=box(-6.02,1.83,3.34,.27,.88,.10,M.ink);sleeve1.rotation.z=-.28;
let sleeve2=box(-5.08,1.83,3.34,.27,.88,.10,M.ink);sleeve2.rotation.z=.28;
box(-5.55,2.44,3.27,.38,.09,.035,M.cloth);box(-5.55,1.87,3.275,.016,1.02,.02,M.alloy);
for(let y of [2.03,1.97,1.91])box(-5.86,y,3.27,.12,.018,.015,M.ochre);
box(-5.55,2.62,3.33,.33,.04,.10,M.woodLight);
// Small navigation instrument and a bound log on the desk.
cylinder(2.04,.84,-2.90,.18,.045,M.alloy);cylinder(2.04,.87,-2.90,.145,.018,M.inset);
line(2.04,.883,-2.9,.19,.008,.012,M.ochre);line(2.04,.885,-2.9,.012,.008,.19,M.ochre);
box(.25,.83,-2.22,.45,.055,.31,M.ink);box(.25,.865,-2.22,.41,.014,.27,M.paper);box(.25,.876,-2.22,.42,.012,.28,M.ink);
// Framed abstract coastal print, a reminder of home, above the credenza.
box(2.95,2.07,3.42,1.05,.72,.07,M.wood);box(2.95,2.07,3.37,.91,.58,.02,M.cloth);
box(2.95,1.94,3.35,.87,.20,.012,M.teal);box(2.95,2.12,3.35,.87,.15,.012,M.shellLight);
ball(3.15,2.22,3.335,.075,M.ochre);
// Recessed service plates and their tiny mechanical fasteners.
for (const x of [-7.9,-4.1,-.8,3.35,6.0]) {
 box(x,.43,-3.455,.66,.32,.025,M.shellDark);
 for(const dx of [-.26,.26]) for(const dy of [-.1,.1]) ball(x+dx,.43+dy,-3.432,.016,M.alloy);
}
// Contact shadows are static, inexpensive and keep the furniture grounded.
const contactGeo=new THREE.CircleGeometry(1,32);
const contactMat=new THREE.MeshBasicMaterial({color:0x142124,transparent:true,opacity:.18,depthWrite:false});
function contact(x,z,rx,rz){const m=new THREE.Mesh(contactGeo,contactMat);m.rotation.x=-Math.PI/2;m.position.set(x,.029,z);m.scale.set(rx,rz,1);scene.add(m);}
contact(-5.5,-2.15,2.08,1.31);contact(.55,-2.63,2.45,1.0);contact(.35,-1.25,.68,.62);contact(.7,3.0,2.4,.66);contact(6.65,2.7,1.95,.98);contact(6.9,.86,.55,.55);

// Simple axis-aligned collision with major objects; all room navigation stays at human eye height.
const obstacles=[
 {x1:-7.5,x2:-3.56,z1:-3.45,z2:-.97}, // bed
 {x1:-7.48,x2:-6.35,z1:-1.12,z2:-.35}, // bedside cabinet
 {x1:-3.63,x2:-2.75,z1:-3.55,z2:-2.4},
 {x1:-1.8,x2:2.85,z1:-3.55,z2:-1.78}, // desk
 {x1:-.22,x2:.92,z1:-1.7,z2:-.75}, // chair
 {x1:-1.65,x2:3.05,z1:2.39,z2:3.55}, // credenza
 {x1:4.88,x2:8.43,z1:1.78,z2:3.55}, // nook bench
 {x1:6.4,x2:7.4,z1:.36,z2:1.36} // table
];
const radius=.22, eye=1.65, start={x:-8.1,z:1.12,yaw:-Math.PI/2,pitch:0};
let pos=new THREE.Vector3(start.x,eye,start.z), yaw=start.yaw, pitch=0;
function syncCamera(){camera.position.copy(pos);camera.rotation.set(pitch,yaw,0);}
function reset(){pos.set(start.x,eye,start.z);yaw=start.yaw;pitch=0;syncCamera();}
function blocked(x,z){if(x<-8.67||x>8.36||z<-3.30||z>3.30)return true;return obstacles.some(o=>x>o.x1-radius&&x<o.x2+radius&&z>o.z1-radius&&z<o.z2+radius);}
const keys=new Set(); let locked=false;
const hud=document.querySelector('#hud'), hint=document.querySelector('#hint'),reticle=document.querySelector('#reticle');
document.querySelector('#enter').addEventListener('click',()=>renderer.domElement.requestPointerLock());
renderer.domElement.addEventListener('click',()=>{if(!locked)renderer.domElement.requestPointerLock()});
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===renderer.domElement;hud.style.display=locked?'none':'block';hint.style.display=locked?'block':'none';reticle.style.display=locked?'block':'none';if(!locked)keys.clear();});
document.addEventListener('mousemove',e=>{if(!locked)return;yaw-=e.movementX*.0021;pitch=Math.max(-1.45,Math.min(1.45,pitch-e.movementY*.0021));});
document.addEventListener('keydown',e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();keys.add(e.code);if(e.code==='KeyR')reset();});
document.addEventListener('keyup',e=>keys.delete(e.code));
window.addEventListener('blur',()=>keys.clear());
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
let last=performance.now();
function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-last)/1000,.05);last=now;
 if(locked){let f=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0),s=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);let len=Math.hypot(f,s)||1;let speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?3.7:2.45)*dt/len;let dx=(-Math.sin(yaw)*f+Math.cos(yaw)*s)*speed,dz=(-Math.cos(yaw)*f-Math.sin(yaw)*s)*speed;if(!blocked(pos.x+dx,pos.z))pos.x+=dx;if(!blocked(pos.x,pos.z+dz))pos.z+=dz;}
 syncCamera();renderer.render(scene,camera);
}
reset();requestAnimationFrame(animate);



