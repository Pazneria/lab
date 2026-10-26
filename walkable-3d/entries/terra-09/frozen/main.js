import * as THREE from './node_modules/three/build/three.module.js';
import { mergeGeometries } from './node_modules/three/examples/jsm/utils/BufferGeometryUtils.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x10191d);
scene.fog = new THREE.Fog(0x182225, 22, 48);
const camera = new THREE.PerspectiveCamera(68, innerWidth / innerHeight, .05, 90);
const renderer = new THREE.WebGLRenderer({antialias:true, powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.18;
document.body.appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xc4d9d6,0x414745,2.0));
const sun = new THREE.DirectionalLight(0xfff5e7,2.2); sun.position.set(3,10,5); scene.add(sun);
const fill = new THREE.DirectionalLight(0x8da8a9,.8); fill.position.set(-8,4,-6); scene.add(fill);

function canvasTex(draw, w=256,h=256) {const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
let seed=73245; function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
const paintTex=canvasTex((c,w,h)=>{c.fillStyle='#c1c5bc';c.fillRect(0,0,w,h);for(let i=0;i<1200;i++){let a=rand()*.09;c.fillStyle=`rgba(42,52,49,${a})`;c.fillRect(rand()*w,rand()*h,rand()*3+1,rand()*2+1)}for(let i=0;i<38;i++){c.strokeStyle=`rgba(64,72,67,${rand()*.17})`;c.lineWidth=rand()*1.5;c.beginPath();let x=rand()*w,y=rand()*h;c.moveTo(x,y);c.lineTo(x+rand()*20+3,y+rand()*2);c.stroke()}});
const floorTex=canvasTex((c,w,h)=>{c.fillStyle='#707e79';c.fillRect(0,0,w,h);for(let i=0;i<2600;i++){c.fillStyle=`rgba(${rand()>.5?30:210},${rand()>.5?40:210},${rand()>.5?38:200},${rand()*.08})`;c.fillRect(rand()*w,rand()*h,rand()*3+1,rand()*3+1)}c.strokeStyle='#4f5c59';c.lineWidth=3;c.strokeRect(1,1,w-2,h-2);c.strokeStyle='rgba(210,221,211,.14)';c.strokeRect(5,5,w-10,h-10);for(const x of [12,w-12])for(const y of [12,h-12]){c.fillStyle='#46514e';c.beginPath();c.arc(x,y,3,0,7);c.fill();c.fillStyle='#9ba9a1';c.fillRect(x-1,y-1,2,2)}}); floorTex.wrapS=floorTex.wrapT=THREE.RepeatWrapping; floorTex.repeat.set(10,8);
const grateTex=canvasTex((c,w,h)=>{c.fillStyle='#323d3b';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=16){for(let x=(y/16%2)*8;x<w;x+=16){c.fillStyle='#141e1c';c.fillRect(x+2,y+3,10,7);c.fillStyle='#61706a';c.fillRect(x+2,y+11,10,2)}}});grateTex.wrapS=grateTex.wrapT=THREE.RepeatWrapping;grateTex.repeat.set(6,2);
const M={
 wall:new THREE.MeshStandardMaterial({color:0xa9b4ad,map:paintTex,roughness:.88}),
 pale:new THREE.MeshStandardMaterial({color:0xcbd2c6,map:paintTex,roughness:.8}),
 dark:new THREE.MeshStandardMaterial({color:0x313f3e,roughness:.8}),
 mid:new THREE.MeshStandardMaterial({color:0x677875,map:paintTex,roughness:.84}),
 floor:new THREE.MeshStandardMaterial({color:0xb9c3b8,map:floorTex,roughness:.92}),
 grate:new THREE.MeshStandardMaterial({color:0x8f9d91,map:grateTex,roughness:.9,metalness:.22}),
 metal:new THREE.MeshStandardMaterial({color:0x929d98,metalness:.8,roughness:.35}),
 metalDark:new THREE.MeshStandardMaterial({color:0x4b5c59,metalness:.7,roughness:.46}),
 black:new THREE.MeshStandardMaterial({color:0x202a29,roughness:.94}),
 rubber:new THREE.MeshStandardMaterial({color:0x171f1e,roughness:1}),
 orange:new THREE.MeshStandardMaterial({color:0xd58a3b,roughness:.7}),
 cream:new THREE.MeshStandardMaterial({color:0xe0d8b9,roughness:.72}),
 teal:new THREE.MeshStandardMaterial({color:0x547f79,metalness:.25,roughness:.75}),
 whiteLight:new THREE.MeshStandardMaterial({color:0xf5eee0,emissive:0xf6ecda,emissiveIntensity:1.4,roughness:.35}),
 cyanLight:new THREE.MeshStandardMaterial({color:0x92e4d5,emissive:0x3dcdb5,emissiveIntensity:1.6}),
 amberLight:new THREE.MeshStandardMaterial({color:0xffc176,emissive:0xff8b2f,emissiveIntensity:1.6}),
 red:new THREE.MeshStandardMaterial({color:0x9e4c3c,roughness:.75}),
 glass:new THREE.MeshPhysicalMaterial({color:0x9bc5c1,transparent:true,opacity:.16,metalness:.15,roughness:.15,depthWrite:false,side:THREE.DoubleSide})
};
const batches=new Map();
function batch(geo,mat,pos=[0,0,0],rot=[0,0,0]){geo.rotateX(rot[0]);geo.rotateY(rot[1]);geo.rotateZ(rot[2]);geo.translate(...pos);if(!batches.has(mat))batches.set(mat,[]);batches.get(mat).push(geo)}
function box(x,y,z,w,h,d,m,rot=[0,0,0]){batch(new THREE.BoxGeometry(w,h,d),m,[x,y,z],rot)}
function cyl(x,y,z,r1,r2,h,m,rot=[0,0,0],segments=20){batch(new THREE.CylinderGeometry(r1,r2,h,segments),m,[x,y,z],rot)}
function ring(x,y,z,outer,inner,h,m){batch(new THREE.CylinderGeometry(outer,outer,h,32,1,false),m,[x,y,z]);}
function pipe(points,r,mat){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));batch(new THREE.TubeGeometry(curve,Math.max(12,points.length*6),r,8,false),mat)}
function beamBetween(a,b,width,depth,mat){let A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),mid=A.clone().add(B).multiplyScalar(.5);let g=new THREE.BoxGeometry(width,A.distanceTo(B),depth);g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),B.clone().sub(A).normalize()));g.translate(mid.x,mid.y,mid.z);if(!batches.has(mat))batches.set(mat,[]);batches.get(mat).push(g)}
function label(text,x,y,z,w,h,rot=0,opts={}){const t=canvasTex((c,W,H)=>{c.fillStyle=opts.bg||'#293937';c.fillRect(0,0,W,H);if(opts.border!==false){c.strokeStyle=opts.line||'#b8c9bd';c.lineWidth=3;c.strokeRect(3,3,W-6,H-6)}c.fillStyle=opts.color||'#d4dfd5';c.font=`bold ${opts.size||45}px Arial`;c.textAlign='center';c.textBaseline='middle';c.fillText(text,W/2,H/2)},512,128);let mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,transparent:false,side:THREE.DoubleSide}));mesh.position.set(x,y,z);mesh.rotation.y=rot;scene.add(mesh)}
function bolts(x,y,z,axis='z',count=4,step=.25){for(let i=0;i<count;i++){let dx=axis==='x'?0:(i-(count-1)/2)*step,dz=axis==='x'?(i-(count-1)/2)*step:0;cyl(x+dx,y,z+dz,.025,.025,.018,M.metal,axis==='x'?[0,0,Math.PI/2]:[Math.PI/2,0,0],8)}}
// Continuous lower floor and tiled, raised inspection floor.
box(0,-.15,0,20,.3,16,M.floor);box(-11.5,-.15,0,3,.3,5.6,M.floor);
for(let x=-9;x<=9;x+=2){box(x,.012,0,.022,.025,16,M.dark)}
for(let z=-7;z<=7;z+=2){box(0,.013,z,20,.025,.022,M.dark)}
// Side and end walls, the west wall has an open service alcove.
box(0,3.5,-8.1,20,7,.25,M.wall);box(0,3.5,8.1,20,7,.25,M.wall);
box(10.1,3.5,0,.25,7,16,M.wall);box(-10.1,3.5,-5.45,.25,7,5.3,M.wall);box(-10.1,3.5,5.45,.25,7,5.3,M.wall);box(-10.1,5,0,.25,4,5.6,M.wall);
box(-13.1,3.5,0,.25,7,5.6,M.mid);box(-11.55,3.5,-2.85,3.1,7,.2,M.wall);box(-11.55,3.5,2.85,3.1,7,.2,M.wall);
// Panel seams, lower kick plates, and regularly spaced structural ribs.
for(let x=-9;x<=9;x+=2){for(const z of [-7.94,7.94]){box(x,3.6,z,.035,6.4,.035,M.dark);box(x,6.65,z,.14,.5,.18,M.metalDark);box(x,1.0,z,.07,.09,.08,M.metalDark)}}
for(let z=-7;z<=7;z+=2){box(9.94,3.6,z,.035,6.4,.035,M.dark);if(Math.abs(z)>3)box(-9.94,3.6,z,.035,6.4,.035,M.dark)}
for(let z=-7.4;z<=7.4;z+=3.7){box(9.77,3.6,z,.45,7,.24,M.dark);box(9.65,3.7,z,.15,6.1,.31,M.mid);if(Math.abs(z)>3){box(-9.77,3.6,z,.45,7,.24,M.dark);box(-9.65,3.7,z,.15,6.1,.31,M.mid)}}
for(let x=-9;x<=9;x+=3.6){box(x,3.55,-7.76,.25,7,.45,M.dark);box(x,3.55,7.76,.25,7,.45,M.dark);box(x,6.86,0,.25,.3,15.5,M.dark)}
box(0,7.12,0,20,.25,16,M.dark);
for(let x=-8;x<=8;x+=4)for(let z=-5.8;z<=5.8;z+=5.8){box(x,6.94,z,2.7,.12,.38,M.dark);box(x,6.86,z,2.35,.06,.24,M.whiteLight)}
// Perimeter raceways, cable runs, fastening plates.
for(let y of [1.0,5.85]){box(0,y,-7.72,19,.12,.16,M.metalDark);box(0,y,7.72,19,.12,.16,M.metalDark);box(9.72,y,0,.16,.12,15,M.metalDark)}
for(let x=-8.8;x<9;x+=2.2){box(x,1,-7.6,.13,.27,.08,M.metal);box(x,5.85,-7.6,.13,.27,.08,M.metal)}
// Upper walkway; the stair opening is at its east end.
box(.1,3.05,-6.12,17.9,.3,2.55,M.dark);box(.1,3.215,-6.12,17.7,.05,2.36,M.grate);
for(let x=-8;x<=8;x+=2){box(x,2.85,-6.1,.16,.25,2.55,M.metalDark);box(x,1.5,-7.55,.16,3,.16,M.metalDark)}
box(-.4,3.23,-4.83,16.7,.12,.12,M.orange);box(-.4,3.22,-7.4,16.7,.12,.12,M.metal);
// Guard rails, posts and intermediate rail. Front rail stops before stairs.
for(let x=-8.4;x<=6.6;x+=1.5){box(x,3.78,-4.84,.075,1.15,.075,M.metal);box(x,3.8,-7.36,.075,1.15,.075,M.metal)}
for(const z of [-4.84,-7.36]){box(-.9,4.32,z,15.1,.08,.08,M.cream);box(-.9,3.8,z,15.1,.05,.05,M.metal)}
box(-8.4,3.78,-6.1,.08,1.15,2.55,M.metal);box(-8.4,4.32,-6.1,.08,.08,2.55,M.cream);
// Sixteen ordinary treads, with stringers and sloped handrails.
const stairX=8.05, stairStart=3.2, stepDepth=.5, stepRise=.2, steps=16;
for(let i=0;i<steps;i++){let z=stairStart-(i+.5)*stepDepth,y=(i+1)*stepRise;box(stairX,y-.06,z,1.72,.12,.49,M.metalDark);box(stairX,y+.006,z,1.65,.025,.43,M.grate);box(stairX,y+.025,z+.205,1.65,.035,.035,M.orange);}
for(const x of [7.12,8.98]){beamBetween([x,.1,3.25],[x,3.1,-4.8],.16,.16,M.dark);beamBetween([x,1.05,3.25],[x,4.25,-4.8],.09,.09,M.cream);beamBetween([x,.6,3.25],[x,3.8,-4.8],.055,.055,M.metal);for(let i=0;i<=8;i++){let z=3.2-i, y=i*.4;box(x,y+.56,z,.075,1.1,.075,M.metal)}}
// Central thermal circulation machine: foundation, core, collars, and radial modules.
const cx=0,cz=-.15;
cyl(cx,.12,cz,2.05,2.05,.24,M.dark);cyl(cx,.27,cz,1.84,1.84,.16,M.orange);cyl(cx,.39,cz,1.73,1.73,.12,M.metalDark);
cyl(cx,1.64,cz,1.12,1.2,2.45,M.metalDark);cyl(cx,1.63,cz,.94,.99,2.36,M.metal);
cyl(cx,.67,cz,1.36,1.36,.22,M.pale);cyl(cx,2.63,cz,1.38,1.38,.24,M.pale);cyl(cx,2.85,cz,1.22,1.22,.16,M.dark);cyl(cx,3.00,cz,1.04,1.04,.18,M.metal);cyl(cx,3.15,cz,.7,.7,.16,M.orange);cyl(cx,3.24,cz,.52,.52,.12,M.metalDark);
for(let a=0;a<Math.PI*2;a+=Math.PI/6){let s=Math.sin(a),c=Math.cos(a);box(s*1.1,1.65,cz+c*1.1,.14,1.72,.14,M.dark,[0,a,0]);cyl(s*1.53,.49,cz+c*1.53,.055,.055,.12,M.metal);cyl(s*1.23,2.82,cz+c*1.23,.055,.055,.12,M.metal);}
for(let a=0;a<Math.PI*2;a+=Math.PI/2){let s=Math.sin(a),c=Math.cos(a);let x=s*1.42,z=cz+c*1.42;box(x,1.6,z,.72,1.72,.48,M.pale,[0,a,0]);box(s*1.68,1.62,cz+c*1.68,.56,1.25,.08,M.teal,[0,a,0]);box(s*1.73,2.05,cz+c*1.73,.38,.07,.035,M.orange,[0,a,0]);for(let k=0;k<4;k++)box(s*1.73,1.15+k*.12,cz+c*1.73,.38,.032,.035,M.dark,[0,a,0]);}
// Fine cooling fins and a crown of fasteners.
for(let y=.85;y<2.55;y+=.16)cyl(cx,y,cz,1.03,1.03,.035,M.metalDark);
for(let i=0;i<12;i++){let a=i*Math.PI/6;cyl(Math.sin(a)*.83,3.1,cz+Math.cos(a)*.83,.05,.05,.08,M.metal, [0,0,0],8)}
// Bundled hoses exit to a floor service trench at rear left.
for(let i=0;i<4;i++){let x=-.65+i*.28;pipe([[x,.35,-1.4],[x,.25,-2],[x-.5,.17,-2.6],[-2.6+i*.17,.16,-3.1],[-4.8,.16,-3.1]],.065,i===1?M.orange:M.rubber);}
box(-4.9,.1,-3.1,.3,.18,1.1,M.dark);for(let i=0;i<4;i++)cyl(-4.8,.2,-3.4+i*.2,.11,.11,.12,M.metal);
// Machine-side service stanchions, segmented caution markings.
for(let a=0;a<Math.PI*2;a+=Math.PI/8){let s=Math.sin(a),c=Math.cos(a);box(s*2.25,.027,cz+c*2.25,.52,.04,.07,M.orange,[0,a,0])}
label('THERMAL  /  CIRCULATION',0,1.63,1.735,1.02,.22,0,{size:35});
// Framed viewport: a sealed, layered window with a star field beyond the glass.
const stars=canvasTex((c,w,h)=>{const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#07121a');g.addColorStop(.55,'#142931');g.addColorStop(1,'#060d17');c.fillStyle=g;c.fillRect(0,0,w,h);for(let i=0;i<230;i++){const v=130+rand()*125;c.fillStyle=`rgba(${v},${v+10},255,${.25+rand()*.65})`;let x=rand()*w,y=rand()*h,r=rand()>.97?2:0.8;c.beginPath();c.arc(x,y,r,0,7);c.fill()}c.fillStyle='rgba(75,133,152,.16)';c.beginPath();c.ellipse(w*.77,h*1.28,w*.6,h*.58,-.1,0,7);c.fill();c.strokeStyle='rgba(145,204,212,.48)';c.lineWidth=3;c.stroke()},1024,512);
const starMesh=new THREE.Mesh(new THREE.PlaneGeometry(5.1,2.4),new THREE.MeshBasicMaterial({map:stars}));starMesh.position.set(-2,4.05,7.68);starMesh.rotation.y=Math.PI;scene.add(starMesh);
box(-2,4.05,7.64,5.5,2.8,.13,M.dark); // backplate; star plane is closer to the room
starMesh.position.z=7.55;
for(let x of [-4.7,.7])box(x,4.05,7.47,.17,2.9,.2,M.metal);for(let y of [2.65,5.45])box(-2,y,7.47,5.5,.17,.2,M.metal);
box(-2,4.05,7.42,.12,2.8,.13,M.metalDark);box(-2,4.05,7.37,5.15,2.5,.025,M.glass);
label('OBSERVATION  /  VACUUM SIDE',-2,2.52,7.33,2.2,.18,Math.PI,{size:30});
// Alcove threshold and wall work surfaces.
box(-9.93,3.1,0,.18,.35,5.7,M.dark);for(const z of [-2.75,2.75]){box(-9.92,1.6,z,.2,3.2,.2,M.orange);box(-10.05,3.1,z,.3,.35,.35,M.metal)}
box(-12.28,.91,0,1.35,.16,4.9,M.metalDark);box(-12.28,1.01,0,1.35,.08,4.9,M.pale);
box(-12.55,.48,-1.45,.85,.9,1.7,M.dark);box(-12.55,.48,1.2,.85,.9,1.8,M.dark);
for(let z of [-1.9,-1.35,-.8,.65,1.2,1.75]){box(-12.08,.5,z,.04,.75,.46,M.mid);box(-12.04,.7,z,.04,.035,.19,M.metal)}
box(-12.91,2.25,0,.1,1.75,4.65,M.dark);box(-12.82,2.24,0,.08,1.56,4.45,M.teal);
// Pegboard holes and hand tools, placed next to the workbench.
for(let z=-2;z<=2;z+=.25)for(let y=1.55;y<=2.9;y+=.25)cyl(-12.76,y,z,.018,.018,.025,M.black,[0,0,Math.PI/2],6);
for(let i=0;i<5;i++){let z=-1.8+i*.32;box(-12.71,2.32,z,.035,.55,.045,M.metal);cyl(-12.68,2.05,z,.09,.09,.035,M.metal,[0,0,Math.PI/2],8);box(-12.67,2.04,z,.03,.1,.06,M.dark)}
box(-12.7,2.28,.6,.04,.65,.06,M.orange);box(-12.68,2.58,.6,.045,.15,.16,M.metalDark);box(-12.7,2.22,1.0,.04,.55,.045,M.metal);cyl(-12.66,2.46,1.0,.105,.105,.04,M.metal,[0,0,Math.PI/2]);
// Bench: vise, parts tray, loose tools, and small instrument box.
box(-12.0,1.09,-1.4,.55,.1,.48,M.dark);box(-12.0,1.22,-1.4,.25,.22,.32,M.metalDark);box(-12.0,1.35,-1.4,.32,.08,.33,M.metal);beamBetween([-11.9,1.22,-1.65],[-11.9,1.22,-1.95],.04,.04,M.metal);
box(-12.1,1.09,.1,.85,.12,.6,M.dark);box(-12.1,1.16,.1,.75,.03,.5,M.metalDark);for(let i=0;i<5;i++)cyl(-12.35+i*.12,1.2,.1,.065,.065,.05,M.metal);
for(let i=0;i<3;i++){box(-11.85,1.075,1.0+i*.18,.65,.035,.045,i===0?M.orange:M.metal,[0,.2,0]);}
box(-12.2,1.24,1.7,.65,.43,.5,M.pale);box(-11.84,1.28,1.7,.04,.25,.35,M.dark);for(let i=0;i<3;i++)cyl(-11.8,1.3,1.58+i*.11,.028,.028,.04,i===0?M.cyanLight:M.orange,[0,0,Math.PI/2],8);
label('SERVICE  /  04',-12.72,3.25,0,2.1,.3,Math.PI/2,{size:43});
// Over-bench neutral and cyan task lights.
box(-12.2,3.65,0,.65,.12,4.0,M.dark);box(-12.1,3.56,0,.4,.07,3.55,M.whiteLight);
box(-10.6,3.25,-2.35,.65,.18,.2,M.dark);box(-10.6,3.14,-2.35,.5,.07,.13,M.cyanLight);
const taskLight=new THREE.PointLight(0x68d7c4,18,6,2);taskLight.position.set(-10.7,3.05,-1.9);scene.add(taskLight);
// Opposite side equipment cabinets with hinges, access panels, and status lamps.
for(let x of [4.0,6.5,8.8]){box(x,1.75,7.48,2.1,3.25,.8,M.dark);box(x,1.75,7.02,1.95,3.0,.18,M.pale);box(x,2.0,6.91,1.7,1.9,.04,M.mid);box(x,2.55,6.88,1.25,.28,.04,M.dark);for(let k=0;k<4;k++)box(x,1.35+k*.13,6.86,1.3,.035,.04,M.dark);for(let k=0;k<3;k++)cyl(x-.4+k*.15,2.54,6.84,.035,.035,.04,k===0?M.cyanLight:M.amberLight,[Math.PI/2,0,0],8);}
label('ELECTRICAL',4,2.95,6.86,1.0,.16,Math.PI,{size:35});
// Ancillary wall-mounted piping, junction boxes, and conduit collars.
for(let i=0;i<3;i++){let x=-6.6+i*.3;pipe([[x,.3,-7.55],[x,2,-7.55],[x,4.8,-7.55],[x+1,5.45,-7.55],[x+3.2,5.45,-7.55]],.075,i===1?M.orange:M.metalDark);}
for(let x=-6.6;x<-5.8;x+=.3)for(let y=1;y<5;y+=1.3)box(x,y,-7.42,.18,.12,.07,M.metal);
box(-5.3,1.5,-7.52,1.2,1.4,.22,M.dark);box(-5.3,1.5,-7.38,1.03,1.23,.08,M.pale);box(-5.3,1.68,-7.31,.7,.28,.04,M.dark);for(let i=0;i<3;i++)cyl(-5.5+i*.2,1.67,-7.27,.04,.04,.04,i?M.orange:M.cyanLight,[Math.PI/2,0,0],8);
label('PUMP CONTROL',-5.3,1.18,-7.26,.75,.12,0,{size:30});
// Portable inspection pedestal and work light near machine.
box(4.0,.12,1.4,1.0,.24,.8,M.dark);box(4, .85,1.4,.14,1.5,.14,M.metalDark);box(4,1.65,1.4,1.1,.12,.75,M.dark,[.28,0,0]);box(4,1.72,1.37,.95,.04,.62,M.pale,[.28,0,0]);box(3.8,1.77,1.4,.4,.025,.32,M.teal,[.28,0,0]);
box(3.25,.09,-2.5,.65,.18,.65,M.dark);cyl(3.25,1.25,-2.5,.045,.045,2.35,M.metal);box(3.25,2.47,-2.5,.6,.2,.38,M.dark);box(3.25,2.38,-2.5,.48,.04,.3,M.amberLight);const warm=new THREE.PointLight(0xffa34d,12,5,2);warm.position.set(3.25,2.25,-2.5);scene.add(warm);
// Floor markings and legible wayfinding.
for(let z=-6;z<=6;z+=.7){box(-8.9,.03,z,.08,.035,.4,M.cream);box(6.15,.03,z,.08,.035,.4,M.cream)}
label('BAY 04',-8.6,4.85,-7.48,1.7,.48,0,{bg:'#475d58',size:60});label('INSPECTION DECK  ↑',6.1,3.8,7.46,2.1,.27,Math.PI,{size:34});
label('SERVICE',-9.79,3.4,0,1.6,.27,Math.PI/2,{size:40});
// Overhead lifting rail and parked hoist, used when the circulation core is opened.
box(0,6.47,-.15,8.8,.33,.38,M.orange);box(0,6.27,-.15,8.8,.09,.65,M.dark);
for(let x of [-4.2,4.2]){box(x,6.55,-.15,.3,.8,1.1,M.dark);box(x,6.13,-.15,.35,.09,.85,M.metal)}
box(.25,6.1,-.15,1.0,.3,.8,M.dark);for(let x of [-.1,.6])for(let z of [-.55,.25])cyl(x,6.18,z,.12,.12,.12,M.metal,[Math.PI/2,0,0]);
box(.25,5.83,-.15,.45,.35,.42,M.orange);cyl(.25,5.3,-.15,.035,.035,.8,M.rubber);cyl(.25,4.88,-.15,.1,.1,.1,M.metalDark);
batch(new THREE.TorusGeometry(.18,.045,8,18,Math.PI*1.45),M.metal,[.25,4.68,-.15],[0,0,-.4]);
// Small capped pressure lines and identification tags across the machine crown.
for(let i=0;i<4;i++){let a=i*Math.PI/2,s=Math.sin(a),co=Math.cos(a);pipe([[s*.5,3.32,cz+co*.5],[s*.73,3.39,cz+co*.73],[s*.98,3.24,cz+co*.98]],.055,M.metal);cyl(s*.65,3.37,cz+co*.65,.09,.09,.05,M.orange)}
box(2.55,.04,-.15,.5,.045,1.05,M.dark);for(let i=0;i<4;i++)box(2.55,.068,-.52+i*.24,.38,.02,.08,M.orange,[0,.35,0]);
// Rear corner railing and translucent splash shield beside the inspection deck.
for(let x of [7.5,8.7])box(x,3.78,-7.36,.075,1.15,.075,M.metal);
box(7.65,4.32,-7.36,2.2,.08,.08,M.cream);box(7.65,3.8,-7.36,2.2,.05,.05,M.metal);
box(-5.7,3.78,-4.82,3.8,.91,.035,M.glass);
for(let x of [-7.6,-5.7,-3.8])box(x,3.78,-4.79,.04,1.0,.05,M.metal);
// Merge static parts by material to limit draw calls while retaining close-up geometry.
for(const [mat,geometries] of batches){const g=mergeGeometries(geometries,false);if(!g)throw new Error('Could not merge scene geometry');const mesh=new THREE.Mesh(g,mat);scene.add(mesh);for(const part of geometries)part.dispose()}

const overlay=document.querySelector('#overlay'),loading=document.querySelector('#loading');loading.style.display='none';
const keys=new Set();let yaw=0,pitch=0;const pos=new THREE.Vector3(0,0,6.25);let zone='floor';
const spawn=()=>{pos.set(0,0,6.25);yaw=0;pitch=0;zone='floor';keys.clear()};
document.querySelector('#enter').addEventListener('click',()=>renderer.domElement.requestPointerLock());
renderer.domElement.addEventListener('click',()=>{if(document.pointerLockElement!==renderer.domElement)renderer.domElement.requestPointerLock()});
document.addEventListener('pointerlockchange',()=>{overlay.style.display=document.pointerLockElement===renderer.domElement?'none':'flex';});
document.addEventListener('mousemove',e=>{if(document.pointerLockElement!==renderer.domElement)return;yaw-=e.movementX*.0022;pitch=Math.max(-1.42,Math.min(1.42,pitch-e.movementY*.0022))});
document.addEventListener('keydown',e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code)){keys.add(e.code);e.preventDefault()}if(e.code==='KeyR')spawn()});
document.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>keys.clear());
function validFloor(x,z){const r=.29;const main=x>=-10+r&&x<=10-r&&z>=-8+r&&z<=8-r;const alcove=x>=-13+r&&x<=-10+r&&z>=-2.8+r&&z<=2.8-r;if(!main&&!alcove)return false;if(Math.hypot(x-cx,z-cz)<2.1+r)return false;if(x < -11.35 && Math.abs(z)<2.5)return false; // workbench
// Keep people out of equipment and off the sides of the stairs.

if(x>7.0&&x<9.25&&z<2.75&&z>-4.75)return false;
if(x>3.25&&x<4.75&&z>.85&&z<1.95)return false;
if(x>2.65&&z>6.5)return false;
return true}
function moveAxis(dx,dz){let x=pos.x+dx,z=pos.z+dz;if(zone==='floor'){
 if(x>=7.32&&x<=8.72&&z<=3.15&&z>=2.65){zone='stairs';pos.x=x;pos.z=z;return}
 if(validFloor(x,z)){pos.x=x;pos.z=z}
 }else if(zone==='stairs'){
 if(x<7.35||x>8.75)return;
 if(z>=3.2){zone='floor';pos.x=x;pos.z=z;pos.y=0;return}
 if(z<=-4.98){zone='deck';pos.x=x;pos.z=Math.max(z,-7.05);pos.y=3.2;return}
 pos.x=x;pos.z=z;pos.y=Math.max(0,Math.min(3.2,(3.2-z)*.4));
 }else{
 if(x< -8.1||x>8.75||z< -7.05)return;
 if(z> -4.98){if(x>=7.35&&x<=8.75){zone='stairs';pos.x=x;pos.z=z;pos.y=Math.min(3.2,(3.2-z)*.4)}return}
 pos.x=x;pos.z=z;pos.y=3.2;
 }}
let last=performance.now();function frame(now){requestAnimationFrame(frame);const dt=Math.min((now-last)/1000,.05);last=now;if(document.pointerLockElement===renderer.domElement){let f=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0),s=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);let l=Math.hypot(f,s);if(l){f/=l;s/=l;let speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?4.5:2.8)*dt;let dx=(-Math.sin(yaw)*f+Math.cos(yaw)*s)*speed,dz=(-Math.cos(yaw)*f-Math.sin(yaw)*s)*speed;moveAxis(dx,0);moveAxis(0,dz)}}camera.position.set(pos.x,pos.y+1.65,pos.z);camera.rotation.order='YXZ';camera.rotation.y=yaw;camera.rotation.x=pitch;renderer.render(scene,camera)}requestAnimationFrame(frame);
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});




