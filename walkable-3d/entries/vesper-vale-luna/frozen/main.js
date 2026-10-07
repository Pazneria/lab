import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

// Vesper & Vale: a generated, walkable first-person atelier. No external models.
const canvas = document.querySelector('#view');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false; // The entire atelier is static; render its shadow map once.
renderer.shadowMap.needsUpdate = true;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.18;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#9eabb2');
scene.fog = new THREE.Fog('#aab5b9', 25, 55);
const camera = new THREE.PerspectiveCamera(73, window.innerWidth / window.innerHeight, .08, 90);
camera.rotation.order = 'YXZ';
const root = new THREE.Group(); scene.add(root);
const clock = new THREE.Clock();
const colliders = [];
const tempV = new THREE.Vector3();

function mat(color, roughness=.65, metalness=0, extra={}) { return new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra }); }
function canvasTex(draw, repeatX=1, repeatY=1) {
  const c=document.createElement('canvas'); c.width=256; c.height=256; const g=c.getContext('2d');
  draw(g,c); const t=new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace; t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(repeatX,repeatY); t.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy()); return t;
}
const woodTex=canvasTex((g,c)=>{g.fillStyle='#79563d';g.fillRect(0,0,256,256);for(let y=0;y<256;y+=32){g.fillStyle=['#8b6648','#704d38','#906c4d','#79563d'][Math.floor(y/32)%4];g.fillRect(0,y,256,30);g.strokeStyle='#4e392c55';g.lineWidth=2;g.beginPath();g.moveTo(0,y+29);g.lineTo(256,y+29);g.stroke();for(let x=12;x<256;x+=58){g.fillStyle='#4e392c44';g.beginPath();g.ellipse(x+Math.random()*15,y+14,18,3,0,0,Math.PI*2);g.fill();}}},2,2);
const floorTex=canvasTex((g)=>{g.fillStyle='#624a38';g.fillRect(0,0,256,256);for(let y=0;y<256;y+=32){let shift=(y/32%2)*32;for(let x=-32;x<288;x+=64){g.fillStyle=['#765941','#836449','#6b503a','#8a6a4e'][((x+y)/32|0)%4];g.fillRect(x+shift,y,62,30);g.strokeStyle='#3a2d25';g.lineWidth=2;g.strokeRect(x+shift,y,62,30);}}},5,4);
const wood= new THREE.MeshStandardMaterial({map:woodTex,roughness:.52});
const floorMat=new THREE.MeshStandardMaterial({map:floorTex,roughness:.77});
const plaster=mat('#c5c1b3',.9), plasterShade=mat('#777f7e',.9), darkWood=mat('#3b2b27',.5), walnut=mat('#593d30',.42), gold=mat('#c6a25f',.32,.78), goldSoft=mat('#a98243',.48,.55), iron=mat('#30373a',.34,.78), brass=mat('#9f7840',.27,.82), ivory=mat('#e4d8bd',.8), chalk=mat('#e0d7bc',.83), velvetDark=mat('#141b25',.95), glass=new THREE.MeshStandardMaterial({color:'#b9d6dc',roughness:.12,metalness:.12,transparent:true,opacity:.22,side:THREE.DoubleSide,depthWrite:false});
const fabricDefs=[
  {name:'midnight brocade',base:'#172b39',accent:'#d2ad63',type:'damask',rough:.86},
  {name:'royal teal velvet',base:'#17645e',accent:'#7bb4a0',type:'velvet',rough:.96},
  {name:'ember silk',base:'#8e3441',accent:'#df9b67',type:'stripe',rough:.38},
  {name:'moon ivory',base:'#d9cfb5',accent:'#98744c',type:'woven',rough:.73},
  {name:'storm tartan',base:'#3e5264',accent:'#c7a166',type:'tartan',rough:.78},
  {name:'plum satin',base:'#55374c',accent:'#d5ad72',type:'floral',rough:.34},
  {name:'sage linen',base:'#839184',accent:'#d3c6a1',type:'woven',rough:.92},
  {name:'copper gauze',base:'#a45e42',accent:'#f0c783',type:'stripe',rough:.55},
];
function fabricTexture(d) {return canvasTex((g)=>{g.fillStyle=d.base;g.fillRect(0,0,256,256);g.globalAlpha=.33;for(let i=0;i<34;i++){g.strokeStyle=i%2?'#ffffff':'#07131c';g.lineWidth=i%5===0?2:1;g.beginPath();g.moveTo(i*8,0);g.lineTo(i*8,256);g.stroke();g.beginPath();g.moveTo(0,i*8);g.lineTo(256,i*8);g.stroke();}g.globalAlpha=1;g.strokeStyle=d.accent;g.fillStyle=d.accent;
  if(d.type==='tartan'){g.globalAlpha=.72;for(let i=0;i<256;i+=42){g.fillRect(i,0,8,256);g.fillRect(0,i,256,8)}g.globalAlpha=1;}
  else if(d.type==='stripe'){for(let i=-256;i<512;i+=40){g.lineWidth=11;g.globalAlpha=.58;g.beginPath();g.moveTo(i,0);g.lineTo(i+256,256);g.stroke()}g.globalAlpha=1;}
  else if(d.type==='damask'||d.type==='floral'){for(let y=18;y<270;y+=58)for(let x=18;x<270;x+=58){g.globalAlpha=.75;g.beginPath();g.ellipse(x,y,9,19,0,0,Math.PI*2);g.ellipse(x,y,18,6,0,0,Math.PI*2);g.fill();g.globalAlpha=1;g.beginPath();g.arc(x,y,3,0,Math.PI*2);g.fill();}}
  else if(d.type==='woven'){g.globalAlpha=.5;g.lineWidth=2;for(let i=0;i<256;i+=13){g.beginPath();g.moveTo(i,0);g.lineTo(i,256);g.stroke();g.beginPath();g.moveTo(0,i);g.lineTo(256,i);g.stroke()}g.globalAlpha=1;}
  if(d.type==='velvet'){g.globalAlpha=.16;for(let i=0;i<256;i+=4){g.strokeStyle=i%8?'#d2ead1':'#031e1a';g.beginPath();g.moveTo(i,0);g.lineTo(i,256);g.stroke()}g.globalAlpha=1;}
},2,2)}
const fabrics=fabricDefs.map(d=>new THREE.MeshStandardMaterial({map:fabricTexture(d),roughness:d.rough,side:THREE.DoubleSide}));
const lining= new THREE.MeshStandardMaterial({map:fabrics[2].map,roughness:.37,side:THREE.DoubleSide});
const carpetTex=canvasTex(g=>{g.fillStyle='#51404c';g.fillRect(0,0,256,256);g.strokeStyle='#bb9b67';g.lineWidth=3;for(let r=15;r<140;r+=25){g.beginPath();g.arc(128,128,r,0,Math.PI*2);g.stroke()}g.fillStyle='#aa8753';for(let i=0;i<12;i++){let a=i*Math.PI/6,x=128+Math.cos(a)*86,y=128+Math.sin(a)*86;g.beginPath();g.moveTo(x,y-10);g.lineTo(x+5,y);g.lineTo(x,y+10);g.lineTo(x-5,y);g.fill()}},1,1);

function box(x,y,z,sx,sy,sz,material,opts={}) {const m=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),material);m.position.set(x,y,z);if(opts.rx)m.rotation.x=opts.rx;if(opts.ry)m.rotation.y=opts.ry;if(opts.rz)m.rotation.z=opts.rz;m.castShadow=opts.cast??true;m.receiveShadow=opts.receive??true;root.add(m);return m;}
function cylinder(x,y,z,rTop,rBottom,h,material,segments=16,rotationZ=0) {const m=new THREE.Mesh(new THREE.CylinderGeometry(rTop,rBottom,h,segments),material);m.position.set(x,y,z);m.rotation.z=rotationZ;m.castShadow=true;m.receiveShadow=true;root.add(m);return m;}
function sphere(x,y,z,sx,sy,sz,material,seg=18) {const m=new THREE.Mesh(new THREE.SphereGeometry(1,seg,Math.max(8,seg/2)),material);m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;m.receiveShadow=true;root.add(m);return m;}
function tube(points,radius,material,segments=32) {const c=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));const m=new THREE.Mesh(new THREE.TubeGeometry(c,segments,radius,6,false),material);m.castShadow=true;m.receiveShadow=true;root.add(m);return m;}
function flatShape(points,y,material) {const s=new THREE.Shape();s.moveTo(points[0][0],points[0][1]);for(let i=1;i<points.length;i++)s.lineTo(points[i][0],points[i][1]);s.closePath();const m=new THREE.Mesh(new THREE.ShapeGeometry(s,2),material);m.rotation.x=-Math.PI/2;m.position.y=y;m.receiveShadow=true;root.add(m);return m;}
function textMat(text,sub='') {const tex=canvasTex((g,c)=>{g.fillStyle='#50382d';g.fillRect(0,0,256,128);g.strokeStyle='#c7a563';g.lineWidth=4;g.strokeRect(7,7,242,114);g.fillStyle='#e4d6b7';g.textAlign='center';g.font='bold 25px Georgia';g.fillText(text,128,57);g.font='12px monospace';g.fillStyle='#c9ad72';g.fillText(sub,128,83);},1,1);return new THREE.MeshStandardMaterial({map:tex,roughness:.72});}
function addCollider(x,z,w,d,inflate=.3){colliders.push({minX:x-w/2-inflate,maxX:x+w/2+inflate,minZ:z-d/2-inflate,maxZ:z+d/2+inflate});}
function blocked(x,z){
  if(x < -13.45 || x > 13.45 || z < -9.45 || z > 9.48)return true;
  for(const c of colliders)if(x>=c.minX&&x<=c.maxX&&z>=c.minZ&&z<=c.maxZ)return true;
  // The two thick cross-walls have a single broad, human-scale archway each.
  for(const wallX of [-3,5])if(Math.abs(x-wallX)<.43&&(z < -2.24 || z > 2.24))return true;
  return false;
}

// One warm timber floor serves all three connected rooms; the doorways remain full-width.
const floor=new THREE.Mesh(new THREE.PlaneGeometry(28,20),floorMat);floor.rotation.x=-Math.PI/2;floor.position.set(0,-.055,0);floor.receiveShadow=true;root.add(floor);
box(13.8,2.7,0,.4,5.4,20,plaster);box(13.58,.18,0,.12,.36,19.7,walnut,{cast:false});
// West wall windows are genuine openings: lower and upper masonry, plus restrained panes and mullions.
for(const zc of [-5.8,5.8]){
  // The three solid stretches between bays keep a continuous wall while preserving the apertures.
  box(-14, .65, zc, .42,1.3,2.55,plaster);box(-14,4.92,zc,.42,1.0,2.55,plaster);
  box(-14,2.95,zc,.08,3.3,2.48,glass,{cast:false,receive:false});
  for(const z of [zc-1.31,zc+1.31])box(-13.74,2.95,z,.18,3.45,.13,walnut);
  for(const y of [1.22,4.68])box(-13.74,y,zc,.18,.14,2.72,walnut);
  box(-13.68,2.95,zc,.1,3.3,.075,goldSoft);box(-13.66,1.4,zc,.25,.14,2.76,walnut);
}
for(const [zc,len] of [[-8.55,2.9],[0,9.1],[8.55,2.9]])box(-14,2.7,zc,.42,5.4,len,plaster);
// North and south walls; entrance is cut into the south wall near the fitting room.
for(const [xc,w] of [[-12.1,3.8],[-4.4,6],[4.15,5.5],[11.85,4.3]])box(xc,2.7,-10,w,5.4,.42,plaster);
for(const x of [-8.8,0,8.3]){box(x,.65,-10,2.8,1.3,.42,plaster);box(x,4.98,-10,2.8,1.04,.42,plaster);}
// North window bays (panels are recessed under simple timber lintels).
for(const x of [-8.8,0,8.3]){box(x,2.9,-9.77,2.8,3.1,.12,glass,{cast:false,receive:false});for(const dx of [-1.45,0,1.45])box(x+dx,2.9,-9.62,.11,3.35,.17,walnut);for(const y of [1.28,4.53])box(x,y,-9.62,2.95,.13,.17,walnut);box(x,2.9,-9.6,.07,3.1,.19,goldSoft);}
// South wall segments leave a welcoming door at x≈-9.6.
box(-12.325,2.7,10,3.35,5.4,.42,plaster);box(2.775,2.7,10,22.45,5.4,.42,plaster);
box(-9.55,5.02,10,2.1,.75,.48,plaster); // high lintel above the open entry
for(const x of [-10.65,-8.45]){box(x,2.65,9.72,.18,5.3,.24,walnut);box(x,5.32,9.72,.38,.16,.4,goldSoft);}
box(-9.55,.03,10,.95,.06,1.3,ivory,{cast:false});

// High, open trusses evoke a skylit tailoring hall without sealing away the cool daylight.
for(const x of [-13.4,-3,5,13.4])box(x,5.28,0,.25,.32,19.3,walnut);
for(let z=-9;z<=9;z+=3){box(0,5.23,z,27,.19,.16,walnut);for(const x of [-12,-4,4,12])cylinder(x,5.04,z,.055,.055,.38,goldSoft,8);}
// Partition walls and oak-framed portals between fitting, archive, and workshop.
for(const x of [-3,5]){
  box(x,2.6,-6.22,.36,5.2,7.55,plasterShade);box(x,2.6,6.22,.36,5.2,7.55,plasterShade);
  box(x,5.0,0,.4,.38,4.85,plasterShade);
  box(x+(x<0?.22:-.22),.24,-6.2,.13,.48,7.4,walnut);box(x+(x<0?.22:-.22),.24,6.2,.13,.48,7.4,walnut);
  const fx=x+(x<0?.22:-.22);
  for(const z of [-2.2,2.2]){box(fx,2.05,z,.27,4.1,.3,darkWood);box(fx,4.16,z,.38,.14,.4,goldSoft);}
  const arch=[];for(let i=0;i<=18;i++){let a=Math.PI*i/18;arch.push([fx,3.72+1.35*Math.sin(a),-2.18+4.36*i/18]);}
  tube(arch,.105,walnut,40);tube(arch.map(p=>[p[0]+(x<0?-.08:.08),p[1],p[2]]),.026,gold,40);
  box(fx,4.98,0,.5,.2,4.9,goldSoft);
}
// Wall pilasters, framed panels and picture rails add scale and finish.
for(const x of [-13.2,-3.45,4.55,13.15]){for(const z of [-9.35,9.35]){box(x,2.5,z,.17,5,.22,walnut);box(x,4.95,z,.28,.17,.32,goldSoft);}}
for(const z of [-9.56,9.55]){box(0,4.95,z,27,.15,.19,goldSoft);box(0,.28,z,27,.35,.14,walnut);}

// Architectural labels and seasonal house emblems.
function plaque(x,y,z,label,sub,ry=0){const p=box(x,y,z,1.8,.72,.1,wood,{ry});const sign=new THREE.Mesh(new THREE.PlaneGeometry(1.72,.63),textMat(label,sub));sign.position.set(x,y,z+.056);sign.rotation.y=ry;root.add(sign);return p;}
plaque(-8.7,4.5,-9.38,'FITTING','HOUSE OF VESPER & VALE');plaque(0,4.5,-9.38,'THE ARCHIVE','SILKS · WOOLS · LINENS');plaque(9,4.5,-9.38,'THE WORKROOM','THE COMET MANTLE');
// Room lettering on upper portal beams, seen naturally along the route.

// Glowing cool daylight enters from the tall western and north windows.
scene.add(new THREE.HemisphereLight('#c6d6e4','#574537',1.8));
const daylight=new THREE.DirectionalLight('#d6e5f0',2.15);daylight.position.set(-10,12,5);daylight.target.position.set(0,0,0);daylight.castShadow=true;daylight.shadow.mapSize.set(1536,1536);daylight.shadow.camera.left=-17;daylight.shadow.camera.right=17;daylight.shadow.camera.top=14;daylight.shadow.camera.bottom=-14;daylight.shadow.camera.near=.5;daylight.shadow.camera.far=40;daylight.shadow.bias=-.0004;daylight.shadow.normalBias=.025;scene.add(daylight,daylight.target);
function pointLight(color,intensity,distance,x,y,z){const l=new THREE.PointLight(color,intensity,distance,2);l.position.set(x,y,z);scene.add(l);return l;}
pointLight('#f3bd69',105,10,9.2,4.0,1.5);pointLight('#f5c87c',52,7,9.4,3.2,-6.4);pointLight('#e8bb78',25,5,-8.8,3.8,-1.0);

// Timber pedestals and gallery furniture helpers.
function labelPlaque(x,y,z,w,text,sub=''){box(x,y,z,w,.52,.11,walnut);const m=new THREE.Mesh(new THREE.PlaneGeometry(w-.12,.42),textMat(text,sub));m.position.set(x,y,z+.061);root.add(m);}
function rug(x,z,rx,rz,y=.015){const m=new THREE.Mesh(new THREE.CircleGeometry(1,64),new THREE.MeshStandardMaterial({map:carpetTex,roughness:1}));m.rotation.x=-Math.PI/2;m.position.set(x,y,z);m.scale.set(rx,rz,1);m.receiveShadow=true;root.add(m);for(const r of [.91,.95]){const pts=[];for(let i=0;i<=64;i++){let a=i*Math.PI*2/64;pts.push([x+rx*r*Math.cos(a),y+.015,z+rz*r*Math.sin(a)])}tube(pts,.012,goldSoft,64);}}
function table(x,z,w,d,h=0.82,collide=true){box(x,h-.09,z,w,.18,d,wood);box(x,h-.19,z,w+.08,.08,d+.08,goldSoft,{cast:false});for(const dx of [-w/2+.13,w/2-.13])for(const dz of [-d/2+.13,d/2-.13]){box(x+dx,h/2-.05,z+dz,.13,h-.18,.13,walnut);box(x+dx,.1,z+dz,.24,.12,.24,darkWood)}if(collide)addCollider(x,z,w,d,.15);return h;}
function stool(x,z){cylinder(x,.57,z,.45,.45,.15,velvetDark);for(const dx of [-.27,.27])for(const dz of [-.27,.27]){box(x+dx,.28,z+dz,.1,.48,.1,walnut,{rz:dx*.06});cylinder(x+dx,.04,z+dz,.065,.065,.08,goldSoft,8);}cylinder(x,.48,z,.48,.08,.08,goldSoft,24);addCollider(x,z,.95,.9,.1);}
function screenPanel(x,z,angle=0){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=angle;root.add(g);const add=(geo,ma,px,py,pz)=>{const m=new THREE.Mesh(geo,ma);m.position.set(px,py,pz);m.castShadow=m.receiveShadow=true;g.add(m);return m};add(new THREE.BoxGeometry(1.18,2.45,.09),darkWood,0,1.25,0);add(new THREE.BoxGeometry(1.04,2.23,.055),fabrics[4],0,1.25,.065);for(const z0 of [-.09,.09]){add(new THREE.BoxGeometry(.09,2.55,.13),walnut,-.55,1.25,z0);add(new THREE.BoxGeometry(.09,2.55,.13),walnut,.55,1.25,z0)}for(const x0 of [-.58,.58])add(new THREE.BoxGeometry(.28,.12,.32),goldSoft,x0,.13,0);addCollider(x,z,1.42,.38,.05);}

// ── FITTING ROOM: a raised measuring dais, velvet carpet, screen, settee, stool and mirror.
box(-8.7,.012,0,5.1,.04,4.8,darkWood);box(-8.7,.039,0,4.92,.018,4.62,goldSoft,{cast:false});rug(-8.7,.0,2.35,2.2,.055);
const dais=new THREE.Mesh(new THREE.CylinderGeometry(2.05,2.13,.26,12),walnut);dais.position.set(-8.8,.2,.1);dais.castShadow=dais.receiveShadow=true;root.add(dais);const daisTop=new THREE.Mesh(new THREE.CylinderGeometry(1.99,1.99,.09,12),new THREE.MeshStandardMaterial({map:carpetTex,roughness:.92}));daisTop.position.set(-8.8,.37,.1);daisTop.receiveShadow=true;root.add(daisTop);cylinder(-8.8,.39,.1,1.45,1.45,.02,goldSoft,48);cylinder(-8.8,.405,.1,.075,.075,.035,gold,20);addCollider(-8.8,.1,3.9,3.9,.15);
// Low two-step access ramp leaves the platform comfortable to approach.
box(-8.8,.06,2.15,1.4,.12,.8,walnut);box(-8.8,.13,1.85,1.15,.14,.46,goldSoft);box(-8.8,.22,1.58,.9,.12,.3,walnut);
// Tall gilt dressing glass, intentionally static with a cool silver face.
box(-12.1,1.68,-1.0,.24,3.3,.22,walnut);box(-12.1,1.68,-1.0,.1,3.04,.13,goldSoft);box(-12.02,1.68,-.98,.07,2.82,.04,new THREE.MeshStandardMaterial({color:'#74858a',metalness:.72,roughness:.18,emissive:'#26333a',emissiveIntensity:.24}));
for(let i=0;i<7;i++){let a=i*Math.PI/3; sphere(-12.0+.12*Math.sin(a),3.37,-1+.48*Math.cos(a),.045,.045,.045,gold,10)}
screenPanel(-11.9,-5.75,.2);screenPanel(-10.6,-5.95,-.25);screenPanel(-9.32,-5.68,.18);
// Settee against the quiet wall: stitched cushions, curved arms and turned feet.
box(-6.2,.67,-6.8,3.25,.23,.95,walnut);box(-6.2,.92,-6.8,2.62,.34,.76,fabrics[5]);box(-6.2,1.37,-7.22,2.92,.95,.22,walnut);box(-6.2,1.43,-7.08,2.58,.65,.08,fabrics[4]);
for(const x of [-7.75,-4.65]){box(x,.92,-6.8,.23,.75,.95,walnut);box(x,.38,-6.8,.13,.72,.13,walnut,{rz:.06});box(x,.13,-6.8,.24,.08,.28,goldSoft);}
for(const x of [-7.03,-5.4]){box(x,1.1,-6.76,.035,.28,.79,goldSoft,{cast:false});}addCollider(-6.2,-6.8,3.4,1.2,.25);
stool(-5.5,-4.5);
const fittingH=table(-5.5,-2.6,1.55,.9,.88); // measuring table sits beyond dais route
// Measuring tape draped across it; paper swatches and a pin dish.
tube([[-6.1,.91,-2.85],[-5.85,.93,-2.65],[-5.5,.92,-2.45],[-5.15,.91,-2.56],[-4.95,.9,-2.75]],.018,ivory,24);
box(-5.25,.92,-2.46,.3,.035,.23,fabrics[6],{ry:.18});cylinder(-5.95,.91,-2.38,.1,.1,.02,brass,24);
// A tiny freestanding dress form and tailoring card on the fitting dais.
cylinder(-8.8,.65,.1,.13,.13,.5,iron);const bust=new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(.16,0),new THREE.Vector2(.24,.18),new THREE.Vector2(.18,.45),new THREE.Vector2(.27,.68),new THREE.Vector2(.31,.79),new THREE.Vector2(.1,.91)],16),velvetDark);bust.position.set(-8.8,.72,.1);bust.castShadow=true;root.add(bust);
labelPlaque(-11.3,4.1,-9.55,1.65,'MEASURE TWICE','FITTING ROOM');

// ── FABRIC ARCHIVE: full-width oak shelves, ordered bolts, folded goods and loose samples.
const shelfX=.8, shelfZ=-8.52, shelfW=7.1, shelfD=1.38;
for(const y of [.47,1.47,2.49,3.51,4.47]){
  box(shelfX,y,shelfZ,shelfW,.13,shelfD,wood);
  box(shelfX,y+.11,shelfZ+.62,shelfW,.08,.08,walnut,{cast:false});
}
for(const x of [-2.65,-.55,1.45,3.45,4.35]){
  box(x,2.47,shelfZ,.14,4.1,1.32,walnut);box(x,.37,shelfZ,.26,.17,1.46,goldSoft);box(x,4.55,shelfZ,.24,.16,1.45,goldSoft);
  for(const y of [1.0,2.0,3.02,4.02])box(x,y,shelfZ,.26,.07,1.32,goldSoft,{cast:false});
}
// Roll forms are instanced by weave, so a packed archive stays inexpensive to draw.
const rollRecords=fabricDefs.map(()=>[]);
const rollRows=[.47,1.47,2.49,3.51];
for(let row=0;row<rollRows.length;row++)for(let col=0;col<4;col++)for(let layer=0;layer<2;layer++){
  const di=(row*3+col*2+layer)%fabricDefs.length;
  const x=-2.02+col*1.83+(layer?.35:-.22), z=-8.94+layer*.76, r=.205+((row+col+layer)%3)*.035, len=1.22+((row*2+col)%3)*.12;
  rollRecords[di].push({x,y:rollRows[row]+r+.10,z,r,len,phase:(row+col)*.4});
}
const boltGeo=new THREE.CylinderGeometry(1,1,1,20,1,false);const boltQuat=new THREE.Quaternion().setFromEuler(new THREE.Euler(0,0,Math.PI/2));const boltDummy=new THREE.Object3D();
rollRecords.forEach((items,di)=>{const mesh=new THREE.InstancedMesh(boltGeo,fabrics[di],items.length);mesh.castShadow=true;mesh.receiveShadow=true;items.forEach((b,i)=>{boltDummy.position.set(b.x,b.y,b.z);boltDummy.quaternion.copy(boltQuat);boltDummy.scale.set(b.r,b.len,b.r);boltDummy.updateMatrix();mesh.setMatrixAt(i,boltDummy.matrix)});mesh.instanceMatrix.needsUpdate=true;root.add(mesh);});
// Small cream selvedge labels hang from selected bolt ends.
for(let i=0;i<16;i++){const row=i>>2,col=i%4,x=-2.02+col*1.83,z=-7.78,y=rollRows[row]+.43;box(x,y,z,.30,.13,.025,ivory,{rz:(col%2?.12:-.1)});box(x,y+.005,z+.017,.08,.025,.01,goldSoft,{cast:false});}
// Folded bolts: finite, repeated stacks in intentionally varied weights and colors.
for(let group=0;group<10;group++){
  const x=-2.25+(group%5)*1.55,z=-8.32+(group%2)*.42,y=group%3===0?1.55:3.58,di=(group*3+1)%fabrics.length;
  for(let layer=0;layer<3;layer++){
    const width=.52+(group%3)*.08;
    box(x+(layer%2)*.04,y+layer*.09,z,width,.085,.42,fabrics[(di+layer)%fabrics.length],{ry:(group%2)*.08,rz:layer*.012});
    box(x+(layer%2)*.04,y+layer*.09+.044,z+.21,width-.04,.012,.012,goldSoft,{cast:false});
  }
}
// A short hanging sample rail makes the different drapes and selvedges inspectable.
box(4.18,3.75,-7.1,.09,.12,1.2,goldSoft);for(const z of [-7.54,-7.29,-7.04,-6.79,-6.54]){cylinder(4.18,3.61,z,.035,.035,.22,brass,8);}
function fabricSheet(x,z,top,w,h,di,phase=0){
  const rows=22,cols=9,positions=[],uv=[],indices=[];
  for(let j=0;j<=rows;j++){const t=j/rows;for(let i=0;i<=cols;i++){const u=i/cols;const wave=Math.sin(u*8*Math.PI+phase)*(.018+t*.045)+Math.sin(u*16*Math.PI+phase*.7)*.009;positions.push(x+(u-.5)*w,top-t*h+Math.sin(u*5*Math.PI+phase)*.025*t,z+wave+.03*Math.sin(t*5+phase));uv.push(u,t);if(j<rows&&i<cols){const a=j*(cols+1)+i,b=a+cols+1;indices.push(a,b,a+1,b,b+1,a+1)}}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();const m=new THREE.Mesh(g,fabrics[di]);m.castShadow=true;m.receiveShadow=true;root.add(m);
  tube([[x-w/2,top,z],[x-w*.25,top-.012,z],[x+w*.25,top-.012,z],[x+w/2,top,z]],.018,goldSoft,16);
  // A few loose fringe strands underline the distinct finish without simulated cloth.
  for(let k=0;k<5;k++){const sx=x-w*.42+k*w*.21;const sy=top-h+.015+(k%2)*.025;tube([[sx,sy,z],[sx+.025,sy-.09-(k%3)*.035,z+.025],[sx+.01,sy-.18-(k%2)*.04,z]],.006,goldSoft,8);}
}
for(let i=0;i<5;i++)fabricSheet(4.18,-7.54+i*.25,3.9,.4+i%2*.1,1.35+(i%3)*.15,(i+1)%fabrics.length,i*.9);
addCollider(shelfX,shelfZ,shelfW+0.3,shelfD+0.3,.05);
// Sample island: clipped swatches, chalk marks and an open paper pattern envelope.
table(1.05,-5.15,4.9,1.18,.9);
for(let i=0;i<8;i++){
  const x=-1.05+i*.6,z=-5.17+(i%2)*.13,di=i%fabrics.length;
  const patch=new THREE.Mesh(new THREE.BoxGeometry(.48,.07,.48),fabrics[di]);patch.position.set(x,.96,z);patch.rotation.y=(i%3-1)*.08;patch.castShadow=true;root.add(patch);
  box(x,.999,z+.22,.44,.018,.022,goldSoft,{cast:false});
  if(i%2===0){box(x+.14,1.02,z-.15,.2,.015,.15,ivory,{rz:.04,cast:false});}
}
// Slim swatch drawers are labelled by material family.
for(let i=0;i<4;i++){box(-1.04+i*.68,.5,-5.15,.58,.16,walnut);cylinder(-1.04+i*.68,.5,-5.08,.032,.032,.06,brass,8);}
labelPlaque(1.05,1.55,-5.62,3.6,'THE SWATCH TABLE','VELVET - SILK - TARTAN - LINEN');for(const x of [-.42,2.52])cylinder(x,1.2,-5.62,.035,.035,.55,brass,10);
// Wall-mounted note cards and a little color fan at the archive entrance.
for(let i=0;i<5;i++){const m=box(-2.7+i*.38,3.25,-9.64,.31,.45,.035,fabrics[(i+2)%fabrics.length],{rz:(i-2)*.035});}
for(let i=0;i<4;i++){tube([[-2.2+i*.34,.78,-7.12],[-2.2+i*.34,.75,-6.85],[-2.2+i*.34,.78,-6.6]],.009,goldSoft,8);}

// WORKSHOP: a solid oak bench, cut patterns, shears, thread and task lighting.
const benchX=9.55, benchZ=-7.28, benchW=6.65, benchD=1.55;
box(benchX,.83,benchZ,benchW,1.12,benchD,walnut);box(benchX,1.42,benchZ,benchW+.12,.19,benchD+.16,wood);box(benchX,1.525,benchZ,benchW+.14,.035,benchD+.18,goldSoft,{cast:false});
for(let i=0;i<4;i++){
  const x=benchX-2.5+i*1.67;box(x,.99,-6.48,1.35,.39,.08,darkWood);box(x,.99,-6.425,1.25,.29,.035,wood);
  box(x,.99,-6.39,.22,.045,.045,goldSoft,{cast:false});cylinder(x,.99,-6.35,.035,.035,.06,brass,10);
  for(const xx of [x-.51,x+.51]){box(xx,.19,benchZ+.53,.15,.38,.15,walnut);box(xx,.09,benchZ+.53,.23,.08,.22,darkWood);}
}
const padTex=canvasTex(g=>{g.fillStyle='#344d49';g.fillRect(0,0,256,256);g.strokeStyle='#81978955';g.lineWidth=1;for(let i=16;i<256;i+=16){g.beginPath();g.moveTo(i,0);g.lineTo(i,256);g.stroke();g.beginPath();g.moveTo(0,i);g.lineTo(256,i);g.stroke()}g.strokeStyle='#c6ab6c88';g.lineWidth=2;g.strokeRect(15,15,225,225)},1,1);
const padMat=new THREE.MeshStandardMaterial({map:padTex,roughness:.9});box(8.42,1.535,-7.23,2.35,.035,1.24,padMat,{cast:false});
function paperShape(x,z,pts,rotation=0){const shape=new THREE.Shape();shape.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)shape.lineTo(pts[i][0],pts[i][1]);shape.closePath();const m=new THREE.Mesh(new THREE.ShapeGeometry(shape),new THREE.MeshStandardMaterial({color:'#e4d8bd',roughness:.96,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.rotation.z=rotation;m.position.set(x,1.56,z);m.castShadow=true;root.add(m);for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];tube([[x+a[0],1.565,z-a[1]],[x+b[0],1.565,z-b[1]]],.006,goldSoft,6);}return m;}
paperShape(10.7,-7.06,[[-.55,-.35],[-.4,.4],[-.05,.53],[.45,.25],[.3,-.4]],-.12);
paperShape(11.25,-7.52,[[-.34,-.43],[-.28,.34],[.18,.52],[.36,-.25]],.1);
// Pinking shears with sculpted ring handles and dark steel blades.
for(const x of [7.48,7.83]){const ring=new THREE.Mesh(new THREE.TorusGeometry(.13,.025,8,20),iron);ring.position.set(x,1.59,-7.0);ring.castShadow=true;root.add(ring);}
box(7.68,1.575,-7.31,.07,.035,.72,iron,{ry:-.15});box(7.75,1.575,-7.31,.055,.035,.72,brass,{ry:.15});
box(7.68,1.584,-7.65,.14,.02,.05,iron,{rz:.3});box(7.75,1.584,-7.65,.12,.02,.05,iron,{rz:.32});sphere(7.71,1.61,-7.05,.055,.035,.055,gold,10);
function spool(x,z,colorMat){cylinder(x,1.75,z,.13,.13,.32,colorMat,18);cylinder(x,1.58,z,.17,.17,.045,ivory,18);cylinder(x,1.92,z,.17,.17,.045,ivory,18);for(let i=0;i<5;i++)tube([[x-.12,1.63+i*.045,z],[x+.12,1.63+i*.045,z]],.006,ivory,5);}
spool(12.25,-7.55,fabrics[2]);spool(12.68,-7.55,fabrics[0]);spool(13.05,-7.55,fabrics[5]);
box(12.65,1.64,-6.85,.48,.22,.38,fabrics[3]);for(let i=0;i<8;i++){let a=i*Math.PI/4;sphere(12.48+.15*Math.cos(a),1.78,-6.85+.12*Math.sin(a),.024,.045,.024,gold,8);}
const chalkPiece=new THREE.Mesh(new THREE.CylinderGeometry(.05,.08,.10,7),chalk);chalkPiece.position.set(9.05,1.61,-6.78);chalkPiece.rotation.set(.2,.1,.34);root.add(chalkPiece);
tube([[9.05,1.57,-7.5],[9.3,1.58,-7.6],[9.58,1.57,-7.49],[9.55,1.57,-7.27],[9.28,1.57,-7.24],[9.05,1.57,-7.5]],.018,fabrics[6],42);
tube([[9.55,1.57,-7.27],[9.82,1.58,-7.1],[10.05,1.57,-7.25],[9.9,1.57,-7.47],[9.6,1.57,-7.5]],.018,fabrics[6],36);
for(let i=0;i<12;i++)box(9.17+i*.064,1.59,-7.59,.012,.008,.026,ivory,{cast:false});
// A brass task lamp and swiveling magnifier give the table a warm work pool.
cylinder(13.2,1.6,-7.02,.26,.26,.09,brass,20);cylinder(13.2,2.35,-7.02,.045,.045,1.4,iron,12);tube([[13.2,2.9,-7.02],[12.92,3.08,-7.02],[12.65,3.04,-7.02]],.035,brass,16);
const shade=new THREE.Mesh(new THREE.CylinderGeometry(.38,.17,.34,24,1,true),new THREE.MeshStandardMaterial({color:'#d4ad63',roughness:.35,metalness:.32,side:THREE.DoubleSide,emissive:'#80501d',emissiveIntensity:.28}));shade.position.set(12.63,2.9,-7.02);shade.rotation.z=Math.PI;root.add(shade);pointLight('#ffd18a',36,5,12.63,2.67,-7.02);
box(8.3,1.57,-6.67,.72,.05,.3,iron);for(let i=0;i<5;i++)cylinder(8.05+i*.12,1.62,-6.67,.012,.012,.1,brass,6,.35);
box(11.85,1.57,-6.72,.58,.05,.28,walnut);for(let i=0;i<3;i++)box(11.65+i*.17,1.61,-6.72,.12,.015,.2,ivory,{rz:.08});
addCollider(benchX,benchZ,benchW,benchD,.28);
labelPlaque(9.55,4.35,-9.56,3.8,'CUT - BASTE - FIT','A SINGLE COMMISSION');

// THE COMMISSION: a headless tailor's form wearing a deliberately unfinished comet gown.
const gownX=9.48, gownZ=.05;
cylinder(gownX,.12,gownZ,.9,.9,.2,walnut,12);cylinder(gownX,.25,gownZ,.79,.79,.12,goldSoft,12);cylinder(gownX,.4,gownZ,.12,.12,.28,iron,16);
for(let i=0;i<3;i++){const a=i*Math.PI*2/3;box(gownX+.55*Math.cos(a),.17,gownZ+.55*Math.sin(a),.67,.09,.12,walnut,{ry:-a});sphere(gownX+.85*Math.cos(a),.16,gownZ+.85*Math.sin(a),.09,.07,.09,goldSoft,10);}
cylinder(gownX,.58,gownZ,.07,.07,.34,iron,12);
const torsoProfile=[new THREE.Vector2(.16,.88),new THREE.Vector2(.24,1.04),new THREE.Vector2(.22,1.25),new THREE.Vector2(.3,1.43),new THREE.Vector2(.34,1.55),new THREE.Vector2(.43,1.67),new THREE.Vector2(.15,1.73),new THREE.Vector2(.12,1.85)];
const torso=new THREE.Mesh(new THREE.LatheGeometry(torsoProfile,32),velvetDark);torso.position.set(gownX,0,gownZ);torso.castShadow=true;torso.receiveShadow=true;root.add(torso);
function bodyRadius(y){const a=[[1.08,.235],[1.25,.22],[1.42,.29],[1.55,.35],[1.66,.43],[1.74,.18]];for(let i=0;i<a.length-1;i++)if(y>=a[i][0]&&y<=a[i+1][0]){const t=(y-a[i][0])/(a[i+1][0]-a[i][0]);return a[i][1]*(1-t)+a[i+1][1]*t}return .23;}
function gridMesh(rows,cols,fn,material){const p=[],uv=[],ind=[];for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){const u=i/cols,v=j/rows,q=fn(u,v);p.push(q[0],q[1],q[2]);uv.push(u,v);if(j<rows&&i<cols){const a=j*(cols+1)+i,b=a+cols+1;ind.push(a,b,a+1,b,b+1,a+1)}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ind);g.computeVertexNormals();const m=new THREE.Mesh(g,material);m.castShadow=true;m.receiveShadow=true;root.add(m);return m;}
function around(theta,r,y,off=0){return [gownX+(r+off)*Math.sin(theta),y,gownZ+(r+off)*Math.cos(theta)];}
// Eight shaped bodice panels make the boning and pieced construction legible.
for(let k=0;k<8;k++){
  const center=k*Math.PI/4,span=Math.PI/4-.035,di=[0,1,0,5,1,0,2,5][k];
  gridMesh(18,7,(u,v)=>{const th=center+(u-.5)*span,y=1.1+v*.61;return around(th,bodyRadius(y),y,.036)},fabrics[di]);
  if(k%2===0){for(const side of [-.5,.5]){const pts=[];for(let j=0;j<=18;j++){const v=j/18,y=1.1+v*.61;pts.push(around(center+side*span,bodyRadius(y),y,.045));}tube(pts,.009,goldSoft,22);}}
}
// Wrapped waistband and the exposed ember-silk underskirt.
const waist=new THREE.Mesh(new THREE.CylinderGeometry(.31,.27,.12,48,1,true),fabrics[5]);waist.position.set(gownX,1.25,gownZ);waist.castShadow=true;root.add(waist);cylinder(gownX,1.25,gownZ,.325,.325,.045,goldSoft,48);
gridMesh(30,84,(u,v)=>{const th=u*Math.PI*2,r=.24+.88*v+.035*Math.sin(th*7+v*3),y=1.22-1.15*v;return around(th,r,y,.01)},fabrics[2]);
// Seven distinct brocade and velvet gores, individually edged and scalloped.
for(let k=0;k<7;k++){
  const center=k*Math.PI*2/7, span=(Math.PI*2/7)-.05, material=fabrics[[0,1,0,5,1,0,4][k]];
  gridMesh(28,12,(u,v)=>{const th=center+(u-.5)*span,hem=.075*Math.sin(th*6+.4)+.025*Math.sin(th*13),t=v,r=.29+.84*t+.018+.018*Math.sin(th*11),y=1.23-(1.16+hem)*t;return around(th,r,y,0)},material);
  for(const side of [-.5,.5]){const pts=[];for(let j=0;j<=24;j++){const v=j/24,th=center+side*span,hem=.075*Math.sin(th*6+.4)+.025*Math.sin(th*13),r=.29+.84*v+.031,y=1.23-(1.16+hem)*v;pts.push(around(th,r,y,0));}tube(pts,.009,goldSoft,30);}
  const hemPts=[];for(let j=0;j<=20;j++){const u=j/20,th=center+(u-.5)*span,hem=.075*Math.sin(th*6+.4)+.025*Math.sin(th*13),r=.29+.84+.03,y=1.23-(1.16+hem);hemPts.push(around(th,r,y,0));}tube(hemPts,.014,goldSoft,24);
}
// Long comet train: midnight brocade outside, ember silk lining on the reverse.
function capeSurface(offset,material){return gridMesh(36,28,(u,v)=>{const t=v,width=.34+2.42*(t*t*(3-2*t)),x=gownX+(u-.5)*width+.20*t*t,y=Math.max(.055,1.72-2*t)+.045*Math.sin(u*7*Math.PI)*t,z=gownZ-.18-2.16*t+.1*Math.sin(u*Math.PI*2)*t+offset;return [x,y,z]},material);}
capeSurface(-.025,fabrics[0]);capeSurface(.035,lining);
for(const side of [0,1]){const pts=[];for(let j=0;j<=30;j++){const t=j/30,width=.34+2.42*(t*t*(3-2*t)),x=gownX+(side?1:-1)*width/2+.20*t*t,y=Math.max(.055,1.72-2*t),z=gownZ-.18-2.16*t+.035;pts.push([x,y,z]);}tube(pts,.018,gold,36);}
for(let i=0;i<19;i++){const u=.05+i*.05,x=gownX+(u-.5)*2.76+.20,z=gownZ-2.32+.1*Math.sin(u*Math.PI*2);sphere(x,.075,z,.027,.025,.027,goldSoft,8);}
// An open collar and unfinished sleeve ports expose the inner seams.
gridMesh(16,64,(u,v)=>{const th=u*Math.PI*2,t=v,r=.16+.34*t,y=1.63+.48*t+.055*Math.sin(th*8)*t;return around(th,r,y,0)},new THREE.MeshStandardMaterial({map:fabrics[3].map,roughness:.72,side:THREE.DoubleSide}));
const collarTop=[];for(let i=0;i<=48;i++){const th=i*Math.PI*2/48,r=.5,y=2.11+.055*Math.sin(th*8);collarTop.push(around(th,r,y,0));}tube(collarTop,.016,gold,52);
for(const s of [-1,1]){
  sphere(gownX+s*.39,1.63,gownZ-.01,.32,.21,.31,fabrics[s<0?5:1],20);
  const port=new THREE.Mesh(new THREE.TorusGeometry(.24,.035,9,24),goldSoft);port.position.set(gownX+s*.45,1.48,gownZ+.02);port.rotation.y=Math.PI/2;port.scale.set(1,1.06,.78);root.add(port);
  for(let j=0;j<4;j++)tube([[gownX+s*.44,1.49-j*.055,gownZ+.2],[gownX+s*.53,1.44-j*.055,gownZ+.25],[gownX+s*.60,1.39-j*.055,gownZ+.3]],.008,ivory,8);
  tube([[gownX+s*.43,1.58,gownZ-.13],[gownX+s*.52,1.45,gownZ-.18],[gownX+s*.47,1.31,gownZ-.16]],.012,goldSoft,14);
}
// Eight gold buttons, a compass-star commission badge and fine chalked stitch marks.
for(let i=0;i<8;i++){const y=1.23+i*.055;const r=bodyRadius(y)+.064;sphere(gownX,y,gownZ+r,.035,.038,.022,gold,12);}
const medallion=new THREE.Mesh(new THREE.CircleGeometry(.19,32),brass);medallion.position.set(gownX,1.47,gownZ+.407);medallion.castShadow=true;root.add(medallion);
function starMesh(x,y,z,r,inner,points,material){const sh=new THREE.Shape();for(let i=0;i<points*2;i++){const a=Math.PI*i/points-Math.PI/2,rr=i%2?r:inner,px=Math.cos(a)*rr,py=Math.sin(a)*rr;if(i===0)sh.moveTo(px,py);else sh.lineTo(px,py)}sh.closePath();const m=new THREE.Mesh(new THREE.ShapeGeometry(sh),material);m.position.set(x,y,z);root.add(m);return m;}
starMesh(gownX,1.47,gownZ+.414,.145,.067,8,ivory);sphere(gownX,1.47,gownZ+.426,.035,.035,.025,gold,12);
for(let i=0;i<10;i++){const a=i*Math.PI*2/10,x=gownX+.38*Math.sin(a),y=1.49+.18*Math.cos(a),z=gownZ+.28*Math.cos(a);sphere(x,y,z,.022,.022,.018,goldSoft,8);}
// Hand stitches, a partly basted left panel and loose thread tails at the raw hem.
for(let j=0;j<9;j++){const y=1.28+j*.042,r=bodyRadius(y)+.052;box(gownX-.025,y,gownZ+r,.018,.011,.013,ivory,{cast:false});}
for(let i=0;i<8;i++){const a=-.8+i*.22,topY=.23+Math.random()*.08,rr=1.15;const x=gownX+rr*Math.sin(a),z=gownZ+rr*Math.cos(a);tube([[x,topY,z],[x+.045,topY-.12,z+.045],[x+.015,topY-.24,z+.07]],.006,ivory,10);}
// Scattered gold thread on the train follows a small constellation path.
const stars=[];for(let i=0;i<6;i++){const t=.2+i*.13,u=.26+(i%3)*.24,width=.34+2.42*(t*t*(3-2*t));stars.push([gownX+(u-.5)*width+.20*t*t,Math.max(.08,1.72-2*t)+.045,gownZ-.18-2.16*t+.035]);}
tube(stars,.008,goldSoft,28);for(const [x,y,z] of stars)sphere(x,y,z,.04,.04,.025,gold,8);
// Name plaque and generous inspection clearance all around the stand.
box(gownX,.48,2.02,1.46,.56,.1,walnut);const commission=new THREE.Mesh(new THREE.PlaneGeometry(1.34,.48),textMat('COMET MANTLE','ASTRAL REGENT - IN PROGRESS'));commission.position.set(gownX,.48,2.078);root.add(commission);
addCollider(gownX,gownZ,2.2,2.4,.12);

// Small finishing details: a brass garment rail, pattern tube and wall-mounted order card.
for(const x of [6.35,7.55]){cylinder(x,1.2,5.65,.045,.045,2.3,brass,10);sphere(x,2.38,5.65,.09,.09,.09,gold,10);}
box(6.95,2.35,5.65,1.3,.07,.08,brass);for(let i=0;i<3;i++){const x=6.58+i*.36; tube([[x,2.3,5.65],[x+.06,2.18,5.65],[x+.12,2.3,5.65]],.012,iron,8);}
for(let i=0;i<3;i++)fabricSheet(6.75+i*.17,5.66,2.25,.28,1.28, i===0?0:i+1,.4*i);
box(13.17,1.25,3.9,.4,2.5,.46,darkWood);box(13.17,2.6,3.9,.75,.2,.64,goldSoft);box(13.17,.15,3.9,.8,.12,.7,walnut);addCollider(13.17,3.9,.75,.65,.18);
// Inlaid needlework star at the workshop return view.
const floorStar=[];for(let i=0;i<=10;i++){const a=Math.PI*i/5-Math.PI/2,r=i%2?.42:.82;floorStar.push([12.55+Math.cos(a)*r,.012,6.35+Math.sin(a)*r]);}tube(floorStar,.018,goldSoft,32);

// First-person controls, gentle collision, and a looped return route.
const start={x:-9.55,y:1.65,z:8.55,yaw:0,pitch:0};
camera.position.set(start.x,start.y,start.z);let yaw=start.yaw,pitch=start.pitch;
const held=new Set();let started=false,lastLook=performance.now();
const welcome=document.querySelector('#welcome'),loading=document.querySelector('#loading'),enterButton=document.querySelector('#enter'),resumeButton=document.querySelector('#resume'),roomTag=document.querySelector('#room-tag'),errorBox=document.querySelector('#error');
function showPause(){welcome.querySelector('h1').textContent='The rooms are yours';welcome.querySelector('.lede').textContent='Walk the sample aisle, circle the commission, then follow the light back to the fitting room.';enterButton.innerHTML='Resume exploring <span>↗</span>';welcome.classList.remove('hidden');document.body.classList.add('paused');}
function hidePause(){welcome.classList.add('hidden');document.body.classList.remove('paused');}
function requestLock(){if(!canvas.requestPointerLock)return;try{const result=canvas.requestPointerLock();if(result&&typeof result.catch==='function')result.catch(()=>{});}catch{}}
function begin(){started=true;hidePause();document.body.classList.add('playing');requestLock();canvas.focus();}
enterButton.addEventListener('click',begin);resumeButton.addEventListener('click',()=>{requestLock();hidePause();});
canvas.addEventListener('click',()=>{if(started&&!document.pointerLockElement){hidePause();requestLock();}});
document.addEventListener('pointerlockchange',()=>{if(document.pointerLockElement===canvas){started=true;hidePause();document.body.classList.add('playing');}else if(started)showPause();});
document.addEventListener('pointerlockerror',()=>{errorBox.textContent='Mouse capture is unavailable. Click and drag to look; WASD still moves.';errorBox.style.display='block';});
function applyLook(dx,dy){yaw-=dx*.0022;pitch=Math.max(-1.42,Math.min(1.42,pitch-dy*.0018));camera.rotation.set(pitch,yaw,0,'YXZ');}
document.addEventListener('mousemove',e=>{if(document.pointerLockElement===canvas)applyLook(e.movementX,e.movementY);else if(started&&e.buttons===1)applyLook(e.movementX,e.movementY);});
window.addEventListener('keydown',e=>{
  if(e.code==='KeyR'){camera.position.set(start.x,start.y,start.z);yaw=start.yaw;pitch=start.pitch;camera.rotation.set(pitch,yaw,0,'YXZ');held.clear();return;}
  if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code)){held.add(e.code);if(started)e.preventDefault();}
});
window.addEventListener('keyup',e=>held.delete(e.code));window.addEventListener('blur',()=>held.clear());
function movementAxis(positive,negative){return (held.has(positive)||held.has(positive.replace('Key','Arrow'))?1:0)-(held.has(negative)||held.has(negative.replace('Key','Arrow'))?1:0);}
function stepPlayer(dt){if(!started)return;let forward=movementAxis('KeyW','KeyS');if(held.has('ArrowUp'))forward=1;if(held.has('ArrowDown'))forward=-1;let side=movementAxis('KeyD','KeyA');if(held.has('ArrowRight'))side=1;if(held.has('ArrowLeft'))side=-1;if(!forward&&!side)return;
  const length=Math.hypot(forward,side);forward/=length;side/=length;const speed=(held.has('ShiftLeft')||held.has('ShiftRight'))?4.35:2.75;
  const fx=-Math.sin(yaw),fz=-Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw);const dx=(fx*forward+rx*side)*speed*dt,dz=(fz*forward+rz*side)*speed*dt;
  const px=camera.position.x,pz=camera.position.z;if(!blocked(px+dx,pz))camera.position.x=px+dx;if(!blocked(camera.position.x,pz+dz))camera.position.z=pz+dz;
}
function updateRoom(){const x=camera.position.x;roomTag.textContent=x<-3?'FITTING ROOM':x<5?'FABRIC ARCHIVE':'WORKSHOP';}
function resize(){renderer.setSize(window.innerWidth,window.innerHeight,false);camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();}
window.addEventListener('resize',resize);
function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);stepPlayer(dt);updateRoom();renderer.render(scene,camera);}
loading.classList.add('hidden');animate();
