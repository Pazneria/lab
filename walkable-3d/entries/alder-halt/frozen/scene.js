import * as THREE from './vendor/three/three.module.js';
import { mergeGeometries } from './vendor/three/BufferGeometryUtils.js';

// Alder Halt. All geometry, signs and material maps are made here at load time.
const $ = s=>document.querySelector(s);
const random = (()=>{let seed=1471968;return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};})();
const rand=(a,b)=>a+(b-a)*random();
const pick=a=>a[Math.floor(random()*a.length)];
const scene = new THREE.Scene();
scene.background=new THREE.Color('#c6c9b8');
scene.fog=new THREE.FogExp2('#c1c3b0',.012);
const camera=new THREE.PerspectiveCamera(68,innerWidth/innerHeight,.07,150);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio,1.25));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
document.body.prepend(renderer.domElement);
scene.add(new THREE.HemisphereLight('#dce7ec','#64634e',1.65));
const sun=new THREE.DirectionalLight('#ffdda5',3.15);
sun.position.set(-32,14,18);sun.target.position.set(0,0,-2);
sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
Object.assign(sun.shadow.camera,{left:-44,right:44,top:39,bottom:-39,near:1,far:110});
sun.shadow.bias=-.00025;sun.shadow.normalBias=.025;
scene.add(sun,sun.target);
const fill=new THREE.DirectionalLight('#9fb9c5',.28);fill.position.set(18,14,-22);scene.add(fill);
const roomBounce=new THREE.PointLight('#adc4d0',4.6,7,2);roomBounce.position.set(-1,2.8,2.6);scene.add(roomBounce);
// A quiet sky gradient and a broad warm sun, independent of external assets.
const skyMaterial=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{top:{value:new THREE.Color('#718c9d')},horizon:{value:new THREE.Color('#dfd5b4')},sunDir:{value:sun.position.clone().normalize()}},vertexShader:'varying vec3 vDir; void main(){vDir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec3 vDir;uniform vec3 top;uniform vec3 horizon;uniform vec3 sunDir;void main(){vec3 d=normalize(vDir);float t=pow(max(d.y,0.0),.52);vec3 c=mix(horizon,top,t);float glow=pow(max(dot(d,sunDir),0.0),32.0);c+=vec3(.17,.105,.025)*glow;float disc=smoothstep(.99965,.99985,dot(d,sunDir));c=mix(c,vec3(1.0,.85,.5),disc*.75);gl_FragColor=vec4(c,1.0);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}',fog:false});
const sky=new THREE.Mesh(new THREE.SphereGeometry(110,32,20),skyMaterial);sky.frustumCulled=false;scene.add(sky);

const aniso=Math.min(8,renderer.capabilities.getMaxAnisotropy());
function canvas(w=512,h=w){const c=document.createElement('canvas');c.width=w;c.height=h;return [c,c.getContext('2d')];}
function texture(c,srgb=true){const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=aniso;if(srgb)t.colorSpace=THREE.SRGBColorSpace;return t;}
function noise(ctx,w,h,amount=24){const id=ctx.getImageData(0,0,w,h);for(let i=0;i<id.data.length;i+=4){const n=(random()-.5)*amount;id.data[i]+=n;id.data[i+1]+=n;id.data[i+2]+=n;}ctx.putImageData(id,0,0);}
function mat(color,props={}){return new THREE.MeshStandardMaterial({color,roughness:.88,...props});}
function brickTexture(){const [c,g]=canvas(1024);g.fillStyle='#85796a';g.fillRect(0,0,1024,1024);const rows=28,cols=11,bh=1024/rows,bw=1024/cols;
 for(let r=0;r<rows;r++)for(let q=-1;q<=cols;q++){const x=q*bw+(r%2)*bw/2,y=r*bh;const hue=rand(14,25),l=rand(25,39);g.fillStyle=`hsl(${hue} 35% ${l}%)`;g.fillRect(x+3,y+3,bw-6,bh-6);g.fillStyle='#c9a48535';g.fillRect(x+4,y+4,bw-8,2);g.fillStyle='#261d1655';g.fillRect(x+4,y+bh-6,bw-7,3);
  for(let k=0;k<13;k++){g.fillStyle=random()<.5?'#e8b7a00b':'#21191720';g.fillRect(x+rand(5,bw-8),y+rand(5,bh-6),rand(2,16),rand(1,4));}
  if(random()<.13){g.strokeStyle='#241e1855';g.lineWidth=1.2;g.beginPath();g.moveTo(x+bw*.45,y+4);g.lineTo(x+bw*.39,y+bh*.4);g.lineTo(x+bw*.49,y+bh-4);g.stroke();}
 }
 for(let i=0;i<170;i++){const x=rand(0,1024),y=rand(0,1024),r=rand(4,54);const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'#222c201a');gr.addColorStop(1,'#222c2000');g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2);}
 noise(g,1024,1024,20);return texture(c);}
function woodTexture(painted=false){const [c,g]=canvas(1024,512);g.fillStyle=painted?'#718078':'#756047';g.fillRect(0,0,1024,512);
 for(let i=0;i<550;i++){const y=rand(0,512);g.strokeStyle=pick(['#1c271c25','#d5c8a01a','#32261f45','#e3d6b027']);g.lineWidth=rand(.5,2.3);g.beginPath();g.moveTo(0,y);for(let x=0;x<=1024;x+=32)g.lineTo(x,y+Math.sin(x/140+i)*rand(1,6));g.stroke();}
 for(let i=0;i<11;i++){const x=rand(0,1024),y=rand(0,512);g.strokeStyle='#241d1955';g.lineWidth=2;for(let k=0;k<5;k++){g.beginPath();g.ellipse(x,y,12+k*10,3+k*3,0,0,Math.PI*2);g.stroke();}}
 if(painted)for(let i=0;i<330;i++){const x=rand(0,1024),y=rand(0,512);g.fillStyle=pick(['#aca489','#7e7055','#c4baa1','#45483d']);g.beginPath();g.ellipse(x,y,rand(2,17),rand(.4,1.9),rand(-.1,.1),0,Math.PI*2);g.fill();}
 noise(g,1024,512,13);return texture(c);}
function rustTexture(){const [c,g]=canvas();g.fillStyle='#666b63';g.fillRect(0,0,512,512);for(let i=0;i<6500;i++){g.fillStyle=pick(['#84523266','#aa6c3766','#3c382e77','#bc8b4166','#ceab6866']);g.beginPath();g.ellipse(rand(0,512),rand(0,512),rand(1,21),rand(1,17),rand(0,6),0,6.29);g.fill();}noise(g,512,512,27);return texture(c);}
function stoneTexture(){const [c,g]=canvas();g.fillStyle='#a09c87';g.fillRect(0,0,512,512);for(let i=0;i<2400;i++){g.fillStyle=pick(['#655e4930','#ded7be40','#494e4330']);g.fillRect(rand(0,512),rand(0,512),rand(1,9),rand(1,4));}noise(g,512,512,25);return texture(c);}
function groundTexture(){const [c,g]=canvas(1024);g.fillStyle='#625840';g.fillRect(0,0,1024,1024);for(let i=0;i<16000;i++){g.fillStyle=pick(['#8d795b66','#282e1c66','#4b4e2966','#b28a4b66','#393a2777']);g.beginPath();g.ellipse(rand(0,1024),rand(0,1024),rand(1,13),rand(1,5),rand(0,6),0,6.3);g.fill();}noise(g,1024,1024,22);return texture(c);}
function barkTexture(){const [c,g]=canvas(512,1024);g.fillStyle='#534d40';g.fillRect(0,0,512,1024);for(let i=0;i<1200;i++){const x=rand(0,512),y=rand(0,1024);g.fillStyle=pick(['#262b2270','#a79b7850','#7a705355','#3c3b2d99']);g.fillRect(x,y,rand(1,7),rand(12,230));}noise(g,512,1024,24);return texture(c);}
const brickMap=brickTexture(),woodMap=woodTexture(),paintMap=woodTexture(true),rustMap=rustTexture(),stoneMap=stoneTexture(),soilMap=groundTexture(),barkMap=barkTexture();
const M={brick:mat('#d3b5a0',{map:brickMap,bumpMap:brickMap,bumpScale:.023}),stone:mat('#c2c0aa',{map:stoneMap,bumpMap:stoneMap,bumpScale:.015}),wood:mat('#b9ab91',{map:woodMap,bumpMap:woodMap,bumpScale:.016}),paint:mat('#d0d3c0',{map:paintMap,bumpMap:paintMap,bumpScale:.012}),rust:mat('#a29b83',{map:rustMap,bumpMap:rustMap,bumpScale:.014,metalness:.42}),darkMetal:mat('#343e38',{metalness:.5,roughness:.67}),rail:mat('#816448',{map:rustMap,metalness:.6,roughness:.7}),roof:mat('#545957',{map:stoneMap,bumpMap:stoneMap,bumpScale:.01}),plaster:mat('#c3c3af',{map:stoneMap,bumpMap:stoneMap,bumpScale:.008}),moss:mat('#536347'),soil:mat('#b6a480',{map:soilMap,bumpMap:soilMap,bumpScale:.032}),path:mat('#bfb291',{map:soilMap,bumpMap:soilMap,bumpScale:.013}),ballast:mat('#848579',{map:stoneMap,bumpMap:stoneMap,bumpScale:.023}),bark:mat('#9c8e73',{map:barkMap,bumpMap:barkMap,bumpScale:.033}),black:mat('#252b27'),cream:mat('#d6cab0'),glass:mat('#91a9a3',{transparent:true,opacity:.18,roughness:.21,metalness:.05,side:THREE.DoubleSide,depthWrite:false})};
const batches=new Map(),colliders=[],temp=new THREE.Object3D();
M.roofLight=mat('#6a716a',{map:stoneMap,bumpMap:stoneMap,bumpScale:.01});M.roofDark=mat('#414947',{map:stoneMap,bumpMap:stoneMap,bumpScale:.01});
M.cream.map=stoneMap;M.cream.bumpMap=stoneMap;M.cream.bumpScale=.007;
// Broad, slightly uneven paving joints survive beneath the leaf drifts.
const [pavingC,pavingG]=canvas(1024);pavingG.fillStyle='#555a4c';pavingG.fillRect(0,0,1024,1024);
for(let r=0;r<7;r++)for(let q=0;q<7;q++){const x=q*1024/7,y=r*1024/7,s=1024/7;pavingG.fillStyle=`hsl(${rand(44,60)} 8% ${rand(47,57)}%)`;pavingG.fillRect(x+1.7,y+1.7,s-3.4,s-3.4);pavingG.fillStyle='#d1cfb926';pavingG.fillRect(x+3,y+3,s-7,1.6);if(random()<.17){pavingG.strokeStyle='#3b443950';pavingG.lineWidth=1.5;pavingG.beginPath();pavingG.moveTo(x,y+rand(20,s-20));pavingG.lineTo(x+s*.3,y+s*.5);pavingG.lineTo(x+s*.52,y+s*.77);pavingG.lineTo(x+s*.8,y+s);pavingG.stroke();}}
for(let i=0;i<9000;i++){pavingG.fillStyle=pick(['#ddddcc14','#252f2623','#a3a39426']);pavingG.fillRect(rand(0,1024),rand(0,1024),rand(1,6),rand(1,4));}noise(pavingG,1024,1024,18);const pavingMap=texture(pavingC);M.paving=mat('#b5b9a7',{map:pavingMap,bumpMap:pavingMap,bumpScale:.013});M.paving.userData.uvScale=4;
// Plaster flakes have ragged edges and reveal the original brick beneath.
const [plasterC,plasterG]=canvas(512);plasterG.beginPath();plasterG.moveTo(30,20);for(let x=30;x<490;x+=20)plasterG.lineTo(x,rand(8,30));for(let y=30;y<490;y+=20)plasterG.lineTo(rand(475,505),y);for(let x=480;x>15;x-=20)plasterG.lineTo(x,rand(475,505));for(let y=480;y>20;y-=20)plasterG.lineTo(rand(6,31),y);plasterG.closePath();plasterG.fillStyle='#b7b7a2';plasterG.fill();
plasterG.globalCompositeOperation='source-atop';for(let i=0;i<950;i++){plasterG.fillStyle=pick(['#5a665319','#d3d0b125','#7073621a']);plasterG.fillRect(rand(20,490),rand(20,490),rand(1,14),rand(1,4));}for(let i=0;i<85;i++){const x=rand(0,512),y=rand(0,512),r=rand(15,65),gr=plasterG.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'#47544328');gr.addColorStop(1,'#47544300');plasterG.fillStyle=gr;plasterG.fillRect(x-r,y-r,r*2,r*2);}for(let i=0;i<8;i++){const x=rand(40,460),y=rand(30,390);plasterG.strokeStyle='#646b5840';plasterG.lineWidth=.9;plasterG.beginPath();plasterG.moveTo(x,y);plasterG.lineTo(x+rand(-12,12),y+rand(15,35));plasterG.lineTo(x+rand(-16,16),y+rand(40,75));plasterG.stroke();}plasterG.globalCompositeOperation='source-over';for(let i=0;i<24;i++){const x=rand(0,512),y=pick([rand(0,50),rand(455,512)]);plasterG.clearRect(x,y,rand(3,28),rand(3,15));}noise(plasterG,512,512,17);const plasterMap=texture(plasterC);const flakingPlaster=mat('#c2c6b6',{map:plasterMap,bumpMap:stoneMap,bumpScale:.006,alphaTest:.5,side:THREE.DoubleSide});
M.bark.userData.spatial=true;
function mesh(geo,m,pos=[0,0,0],rot=[0,0,0],cast=true,receive=true){const ob=new THREE.Mesh(geo,m);ob.position.set(...pos);ob.rotation.set(...rot);ob.updateMatrix();geo.applyMatrix4(ob.matrix);let sector='';if(m.userData.spatial){geo.computeBoundingBox();const b=geo.boundingBox;sector=`${Math.floor((b.min.x+b.max.x)/64)},${Math.floor((b.min.z+b.max.z)/64)}`;}const key=m.uuid+cast+receive+sector;if(!batches.has(key))batches.set(key,{m,cast,receive,g:[]});batches.get(key).g.push(geo);return ob;}
function box(x,y,z,w,h,d,m,rot=[0,0,0],cast=true){const g=new THREE.BoxGeometry(w,h,d);const uv=g.attributes.uv;const scales=[[d,h],[d,h],[w,d],[w,d],[w,h],[w,h]],repeat=m===M.brick?2.8:(m.userData.uvScale||2);for(let f=0;f<6;f++)for(let v=0;v<4;v++){const i=f*4+v;uv.setXY(i,uv.getX(i)*scales[f][0]/repeat,uv.getY(i)*scales[f][1]/repeat);}return mesh(g,m,[x,y,z],rot,cast);}
function cylinder(x,y,z,rt,rb,h,m,segments=8,rot=[0,0,0]){return mesh(new THREE.CylinderGeometry(rt,rb,h,segments),m,[x,y,z],rot);}
function beam(a,b,r,m,r2=r,segments=7){const aa=new THREE.Vector3(...a),bb=new THREE.Vector3(...b),v=bb.clone().sub(aa);const g=new THREE.CylinderGeometry(r2,r,v.length(),segments);const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());g.applyQuaternion(q);return mesh(g,m,aa.add(bb).multiplyScalar(.5).toArray());}
function solid(x,z,w,d,ymax=4,ymin=-1){colliders.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2,ymin,ymax});}
function rock(x,z,size=.3,y=0){const g=new THREE.IcosahedronGeometry(1,0);g.scale(size,rand(.35,.7)*size,rand(.7,1.3)*size);return mesh(g,M.stone,[x,y+size*.18,z],[rand(0,.5),rand(0,6),rand(0,.5)]);}
function sign(text,x,y,z,w,h,opts={}){const [c,g]=canvas(1024,Math.round(1024*h/w));g.fillStyle=opts.bg||'#d0c5a1';g.fillRect(0,0,c.width,c.height);g.strokeStyle=opts.border||'#4d6255';g.lineWidth=12;g.strokeRect(16,16,c.width-32,c.height-32);g.fillStyle=opts.ink||'#263c34';g.textAlign='center';g.textBaseline='middle';g.font=`${opts.weight||'bold'} ${opts.fontSize||Math.round(c.height*.49)}px ${opts.font||'Georgia'}`;g.fillText(text,c.width/2,c.height/2,c.width*.9);for(let i=0;i<600;i++){g.fillStyle=random()<.5?'#2b271715':'#f1e6c221';g.fillRect(rand(0,c.width),rand(0,c.height),rand(1,25),rand(1,3));}const m=mat('#ffffff',{map:texture(c),roughness:.86});const g3=new THREE.PlaneGeometry(w,h);return mesh(g3,m,[x,y,z],[0,opts.rotation||0,0],false);}
function flush(){for(const b of batches.values()){const inputs=b.g.map(g=>g.index?g.toNonIndexed():g);const g=mergeGeometries(inputs,false);if(!g)throw new Error('Static geometry batch could not be assembled');const o=new THREE.Mesh(g,b.m);o.castShadow=b.cast;o.receiveShadow=b.receive;scene.add(o);for(const old of new Set([...b.g,...inputs]))old.dispose();}batches.clear();}

// The ground and the branching footpath.
function terrainHeight(x,z){const r=Math.hypot(x*.93,z);const edge=THREE.MathUtils.smoothstep(r,26,49);return edge*(2.3+Math.sin(x*.14+z*.07)*1.2+Math.cos(z*.18-x*.09)*.7);}
const terrain=new THREE.PlaneGeometry(110,110,55,55);terrain.rotateX(-Math.PI/2);const terrainP=terrain.attributes.position,terrainUV=terrain.attributes.uv;for(let i=0;i<terrainP.count;i++){const x=terrainP.getX(i),z=terrainP.getZ(i);terrainP.setY(i,terrainHeight(x,z)-.017);terrainUV.setXY(i,x/7,z/7);}terrain.computeVertexNormals();mesh(terrain,M.soil,[0,0,0],[0,0,0],false);
const approachPoints=[[-1,16],[-1,5]];
const pathPoints=[[-1,11],[6,11],[13,10],[20,8],[24,3],[24,-4],[21,-11],[16,-14],[10,-10],[10,-7]];
function pathRibbon(points,width){const verts=[],uvs=[],indices=[];let distance=0;for(let i=0;i<points.length;i++){const [x,z]=points[i];const p=points[Math.max(0,i-1)],n=points[Math.min(points.length-1,i+1)];let dx=n[0]-p[0],dz=n[1]-p[1];const len=Math.hypot(dx,dz);dx/=len;dz/=len;if(i)distance+=Math.hypot(x-p[0],z-p[1]);verts.push(x-dz*width/2,.007,z+dx*width/2,x+dz*width/2,.007,z-dx*width/2);uvs.push(0,distance/3,1,distance/3);if(i){const k=i*2;indices.push(k-2,k-1,k,k,k-1,k+1);}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();mesh(g,M.path,[0,0,0],[0,0,0],false);}
pathRibbon(pathPoints,2.1);
pathRibbon(approachPoints,2.1);
// Small platform, pale coping stones, buckled edge and two gentle access ramps.
box(0,.22,-1.75,30,.44,3.5,M.brick);box(0,.465,-1.7,29.9,.07,3.35,M.paving);
solid(0,-1.75,30,3.5,.42,-1);
for(let x=-14.7;x<15;x+=.65){box(x,.51,-3.42,.61,.15,.4,M.stone,[rand(-.012,.012),rand(-.007,.007),rand(-.008,.008)]);box(x,.504,-.07,.61,.11,.35,M.stone);}
// Horizontal strip is a physical walkable ramp (the same slope is used by movement).
function ramp(x,z0,z1,width,h0,h1){const p=[x-width/2,h0,z0,x+width/2,h0,z0,x-width/2,h1,z1,x+width/2,h1,z1];const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,1,0,0,1,1,1],2));g.setIndex([0,2,1,1,2,3]);g.computeVertexNormals();mesh(g,M.stone,[0,0,0],[0,0,0],false);}
ramp(-1,5,7.4,1.7,.54,0);ramp(10,-3.5,-4.7,2.1,.54,.39);

// Waiting room: real door openings on the approach and platform, plus deeply inset windows.
box(-1,.43,2.55,10,.16,5.1,M.stone);
const wallH=3.25,wallY=.5+wallH/2;
// Side walls have a window opening at z 2.6.
for(const x of [-6,4]){box(x,wallY,.6,.34,wallH,1.2,M.brick);solid(x,.6,.34,1.2);box(x,wallY,4.5,.34,wallH,1.2,M.brick);solid(x,4.5,.34,1.2);box(x,1.02,2.55,.34,1.04,2.7,M.brick);solid(x,2.55,.34,2.7,1.54);box(x,3.25,2.55,.34,1,2.7,M.brick);solid(x,2.55,.34,2.7,4,2.75);}
// Front and rear walls, door centered at x=-1 and paired windows.
for(const z of [0,5.1]){
 const sections=[[-5.4125,1.175],[-2.5375,1.475],[.5375,1.475],[3.4125,1.175]];
 for(const [x,w] of sections){box(x,wallY,z,w,wallH,.34,M.brick);solid(x,z,w,.34);}
 // Window widths 1.55 at -4.05 and 2.05. Door gap -1.8..-.2.
 for(const x of [-4.05,2.05]){box(x,1.03,z,1.55,1.06,.34,M.brick);solid(x,z,1.55,.34,1.56);box(x,3.27,z,1.55,.96,.34,M.brick);solid(x,z,1.55,.34,4,2.79);}
 box(-1,3.33,z,1.7,.84,.34,M.brick);solid(-1,z,1.7,.34,4,2.91);
 // Weathered stone lintels and doorway cheeks.
 box(-1,2.94,z,2.05,.18,.43,M.stone);for(const x of [-1.86,-.14])box(x,1.7,z,.16,2.4,.43,M.stone);
 for(const x of [-4.05,2.05]){box(x,1.53,z,1.85,.13,.58,M.stone);box(x,2.79,z,1.84,.17,.46,M.stone);for(const xx of [x-.77,x+.77])box(xx,2.17,z,.085,1.2,.39,M.paint);box(x,2.17,z,.055,1.17,.37,M.paint);box(x,2.16,z,1.53,.065,.36,M.paint);box(x,2.75,z,1.55,.06,.37,M.paint);box(x,1.6,z,1.55,.06,.37,M.paint);
  // Some panes missing; dusty glazing remains in others.
  box(x-.39,2.44,z,.68,.48,.012,M.glass,[0,0,0],false);box(x+.4,1.88,z,.67,.47,.012,M.glass,[0,0,0],false);
 }
}
// Side window frames, inward-facing.
for(const x of [-6,4]){box(x,1.52,2.55,.57,.14,2.85,M.stone);box(x,2.78,2.55,.47,.16,2.83,M.stone);for(const z of [1.22,2.55,3.88])box(x,2.16,z,.38,1.19,.09,M.paint);box(x,2.16,2.55,.36,.07,2.7,M.paint);box(x,2.72,2.55,.36,.08,2.7,M.paint);box(x,1.61,2.55,.36,.08,2.7,M.paint);box(x,2.43,1.85,.01,.47,1.2,M.glass,[0,0,0],false);}
// Low interior painted dado and uneven floorboards.
for(let x=-5.8;x<3.9;x+=.24)box(x,.527,2.55,.225,.025,4.75,M.wood,[0,0,0],false);
for(const z of [.2,4.9]){for(const [x,w] of [[-3.92,3.95],[1.89,3.9]]){box(x,.94,z,w,.84,.027,M.paint);box(x,1.38,z,w,.065,.06,M.wood);}}
for(const x of [-5.81,3.81]){box(x,.92,2.55,.027,.81,4.7,M.paint);box(x,1.38,2.55,.06,.065,4.7,M.wood);}
// Patchy plaster on the waiting room walls, exposed brick at torn edges.
for(const z of [.18,4.92])for(const [x,w] of [[-5.43,1.1],[-2.54,1.32],[.54,1.3],[3.43,1.1]]){mesh(new THREE.PlaneGeometry(w,1.36),flakingPlaster,[x,2.1,z],[0,z>2?Math.PI:0,0],false);}
// Pitched slate roof; individual alternating strips make a weathered, legible roof.
const roofAngle=Math.atan2(1.8,2.85), roofLen=Math.hypot(1.8,2.85);
for(const side of [-1,1]){box(-1,4.66,2.55+side*1.425,10.7,.12,roofLen,M.roof,[side*roofAngle,0,0]);for(let row=0;row<11;row++){const t=(row+.5)/11,z=2.55+side*t*2.85,y=5.56-t*1.8;for(let col=0;col<23;col++){const x=-6.2+(col+.5)*.46+(row%2)*.19;box(x,y+.075,z,.44,.035,roofLen/11+.06,pick([M.roof,M.roofLight,M.roofDark]),[side*roofAngle,0,0]);}}}
for(const x of [-6.08,4.08]){const verts=[0,0,-2.58,0,0,2.58,0,1.65,0];const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,1,0,.5,1],2));g.setIndex(x<0?[0,2,1]:[0,1,2]);g.computeVertexNormals();mesh(g,M.paint,[x,3.77,2.55]);for(let z=.05;z<5.1;z+=.15){const h=1.65*(1-Math.abs(z-2.55)/2.55);if(h>0)box(x,3.77+h/2,z,.05,h,.135,M.paint);}}
for(const z of [-.2,5.3])box(-1,3.78,z,10.7,.19,.15,M.paint);
box(-1,5.56,2.55,10.8,.16,.18,M.rust);
// Rafters and cross ties visible from inside.
for(let x=-5.6;x<=3.8;x+=1.16){box(x,3.68,2.55,.11,.15,5.1,M.wood);beam([x,3.74,.03],[x,5.45,2.55],.06,M.wood);beam([x,5.45,2.55],[x,3.74,5.07],.06,M.wood);}
// Brick chimney, flashing and soot.
box(1.6,5.55,3.25,.73,2.1,.77,M.brick);box(1.6,6.55,3.25,.85,.14,.89,M.stone);box(1.6,6.66,3.25,.48,.16,.52,M.black);solid(1.6,3.25,.75,.77,6,3.7);
// Open front door. Peeling slats and iron latch.
box(-1.89,1.68,5.7,.07,2.33,1.42,M.paint,[0,-.15,0]);solid(-1.89,5.7,.30,1.45);for(const y of [.7,1.5,2.66])box(-1.85,y,5.7,.09,.11,1.32,M.wood,[0,-.15,0]);cylinder(-1.82,1.63,6.22,.036,.036,.17,M.rust,8,[Math.PI/2,0,0]);
sign('ALDER HALT',-1,3.28,5.29,2.6,.43);sign('WAITING ROOM',-1,2.68,5.31,1.38,.23,{font:'Arial',fontSize:95});
sign('ALDER HALT',-1,3.29,-.2,2.6,.43,{rotation:Math.PI});

// Platform canopy: corrugated sheet with rust seams, iron columns and diagonal braces.
for(let x=-8.3;x<=8.8;x+=.23){box(x,3.32,-1.82,.24,.043,3.94,M.rust,[-.065,0,0]);cylinder(x,3.33,-1.82,.017,.017,3.95,M.rust,5,[Math.PI/2-.065,0,0]);}
for(const z of [-3.79,.12]){box(.2,3.3,z,17.5,.13,.09,M.darkMetal);box(.2,3.18,z,17.5,.22,.025,M.paint);}
for(const x of [-8,-3,2,7]){cylinder(x,1.8,-3.15,.055,.072,2.63,M.darkMetal,10);cylinder(x,.64,-3.15,.13,.16,.25,M.rust,8);solid(x,-3.15,.22,.22,3.5);box(x,3.12,-1.62,.11,.18,3.6,M.darkMetal,[-.065,0,0]);beam([x,2.55,-3.15],[x,3.16,-2.33],.035,M.rust);beam([x,2.63,-3.15],[x+.6,3.17,-3.15],.028,M.rust);beam([x,2.63,-3.15],[x-.6,3.17,-3.15],.028,M.rust);}
// Gutter and drainpipe, with a broken lower section.
cylinder(.3,3.34,-3.88,.055,.055,17.6,M.rust,8,[0,0,Math.PI/2]);cylinder(-8.35,2.07,-3.8,.043,.043,2.46,M.rust,8);beam([-8.35,.84,-3.8],[-8.55,.65,-3.85],.045,M.rust);
// Old gas-style lamps under the canopy; inactive, no extra shadow lights.
for(const x of [-5.5,4.5]){cylinder(x,2.88,-1.75,.02,.02,.55,M.darkMetal);box(x,2.53,-1.75,.29,.37,.29,M.glass);box(x,2.72,-1.75,.35,.055,.35,M.darkMetal);box(x,2.32,-1.75,.32,.055,.32,M.darkMetal);for(const dx of [-.14,.14])for(const dz of [-.14,.14])box(x+dx,2.52,-1.75+dz,.02,.36,.02,M.darkMetal);}

// Benches with individual boards, iron feet, nail heads and one missing back slat.
function bench(x,z,rotation=0,broken=false,interior=false){const y=interior?.54:.54;const coords=(xx,yy,zz)=>[x+xx*Math.cos(rotation)+zz*Math.sin(rotation),yy,z-xx*Math.sin(rotation)+zz*Math.cos(rotation)];function b(xx,yy,zz,w,h,d,m){const p=coords(xx,yy,zz);box(...p,w,h,d,m,[0,rotation,0]);}
 for(let i=0;i<4;i++)b(0,y+.43,-.24+i*.15,2.5,.065,.125,M.wood);
 for(let i=0;i<3;i++)if(!(broken&&i===1))b(broken&&i===2?.17:0,y+.79+i*.15,.29,broken&&i===2?2.15:2.5,.125,.05,M.paint);
 for(const xx of [-.98,.98]){b(xx,y+.24,0,.07,.45,.51,M.darkMetal);b(xx,y+.69,.29,.055,.94,.075,M.rust);b(xx,y+.42,0,.09,.065,.57,M.rust);b(xx,y+.04,0,.33,.065,.62,M.darkMetal);for(const zz of [-.21,.21]){const p=coords(xx,y+.48,zz);cylinder(...p,.018,.018,.012,M.rust,6);}}
 solid(x,z,Math.abs(Math.cos(rotation))*2.6+Math.abs(Math.sin(rotation))*.78,Math.abs(Math.sin(rotation))*2.6+Math.abs(Math.cos(rotation))*.78,1.6);}
bench(-4,-1.08,0,true);bench(5.4,-1.04,0,false);bench(-4.9,2.95,Math.PI/2,false,true);
// The stove and stovepipe in the cool room.
cylinder(2.97,.94,3.99,.3,.35,.73,M.darkMetal,12);for(const x of [2.76,3.18])box(x,.61,3.99,.06,.23,.06,M.rust);box(2.97,.96,3.65,.39,.35,.04,M.black);box(2.97,.96,3.62,.29,.25,.045,M.rust);cylinder(2.96,2.23,3.99,.08,.08,1.98,M.rust,10);solid(2.97,3.99,.73,.74,3);
// Ticket hatch in the interior and a torn old route map.
box(.55,1.95,4.865,1.13,.82,.07,M.wood);box(.55,1.99,4.815,.91,.59,.03,M.black);for(let x=.16;x<.95;x+=.16)box(x,1.99,4.79,.029,.59,.034,M.rust);box(.55,1.61,4.69,1.26,.12,.35,M.wood);sign('TICKETS',.55,2.51,4.775,1.09,.2,{rotation:Math.PI,font:'Arial',fontSize:110,bg:'#aab5a0'});
function poster(x,y,z,w,h,rotation=0){const [c,g]=canvas(512,640);g.fillStyle='#b4b09a';g.fillRect(0,0,512,640);g.fillStyle='#31473d';g.font='bold 32px Georgia';g.fillText('WOODLAND BRANCH',35,62);g.font='16px Arial';g.fillText('Passenger services · Summer 1968',35,92);g.strokeStyle='#76654b';g.lineWidth=7;g.beginPath();g.moveTo(92,510);g.bezierCurveTo(400,480,130,300,366,170);g.stroke();for(let i=0;i<5;i++){const xx=120+i*52,yy=470-i*70;g.fillStyle='#31473d';g.beginPath();g.arc(xx,yy,8,0,7);g.fill();g.font='18px Georgia';g.fillText(['Alder Halt','Briar Wood','Wychmere','Fern Junction','Highfield'][i],xx+16,yy+6);}g.fillStyle='#655e49';g.font='18px Georgia';g.fillText('A quieter way to the country.',40,580);for(let i=0;i<1100;i++){g.fillStyle='#3c32181a';g.fillRect(rand(0,512),rand(0,640),rand(1,20),rand(1,4));}g.clearRect(420,450,92,190);g.clearRect(0,0,36,115);mesh(new THREE.PlaneGeometry(w,h),mat('#ffffff',{map:texture(c),transparent:true,alphaTest:.3}),[x,y,z],[0,rotation,0],false);}
poster(-2.97,2.08,.205,.82,1.07,0);
// Broken timetable case: inset printed rows, cracked glass remnants and an empty hinge.
box(-2.55,2.09,-.265,1.25,1.42,.17,M.paint);box(-2.55,2.09,-.36,1.04,1.17,.026,M.black);
const [tc,tg]=canvas(640,720);tg.fillStyle='#bdb8a0';tg.fillRect(0,0,640,720);tg.fillStyle='#2b453a';tg.font='bold 47px Georgia';tg.fillText('DEPARTURES',57,82);tg.font='23px Georgia';tg.fillText('ALDER HALT · 1968',100,127);tg.font='23px monospace';for(let i=0;i<9;i++){tg.fillText(`${['06.42','08.16','09.53','11.25','13.04','14.38','16.12','17.46','19.08'][i]}   ${i%2?'HIGHFIELD':'WYCHMERE'}`,38,200+i*43);tg.strokeStyle='#44412e50';tg.beginPath();tg.moveTo(35,213+i*43);tg.lineTo(603,213+i*43);tg.stroke();}tg.fillStyle='#764633';tg.font='bold 26px Georgia';tg.fillText('SERVICE WITHDRAWN',70,649);tg.font='19px Georgia';tg.fillText('30 September 1968',140,685);noise(tg,640,720,14);mesh(new THREE.PlaneGeometry(1,1.12),mat('#fff',{map:texture(tc)}),[-2.55,2.09,-.378],[0,Math.PI,0],false);
// Broken triangular shards are reflective only where glass survives.
for(const data of [[-.64,.53,-.2,.53,-.64,-.25],[.66,-.56,.66,.25,.3,-.56]]){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([data[0]*.77,data[1],0,data[2]*.77,data[3],0,data[4]*.77,data[5],0],3));g.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,1,0,0,1],2));g.computeVertexNormals();mesh(g,M.glass,[-2.55,2.09,-.395],[0,Math.PI,0],false);}
for(const y of [1.56,2.62])box(-1.935,y,-.39,.055,.14,.04,M.rust);
// Old wall clock with stopped hands.
cylinder(-2.96,2.94,4.88,.22,.22,.05,M.darkMetal,32,[Math.PI/2,0,0]);const [cc,cg]=canvas(256);cg.fillStyle='#c6bea0';cg.beginPath();cg.arc(128,128,124,0,7);cg.fill();cg.fillStyle='#394138';cg.font='25px Georgia';cg.textAlign='center';cg.textBaseline='middle';for(let i=1;i<=12;i++)cg.fillText(i,128+Math.sin(i*Math.PI/6)*96,128-Math.cos(i*Math.PI/6)*96);cg.strokeStyle='#333a30';cg.lineWidth=8;cg.beginPath();cg.moveTo(128,128);cg.lineTo(159,77);cg.moveTo(128,128);cg.lineTo(81,169);cg.stroke();mesh(new THREE.CircleGeometry(.205,32),mat('#fff',{map:texture(cc)}),[-2.96,2.94,4.845],[0,Math.PI,0],false);

// Disused track: wood sleepers, plates, spikes and rails with full rail sections.
box(0,.035,-6,65,.085,3.35,M.ballast,[0,0,0],false);
for(let x=-31.6;x<32;x+=.68){box(x,.102,-6,.22,.135,2.62,M.wood,[0,rand(-.013,.013),0]);for(const z of [-5.28,-6.72]){box(x,.195,z,.34,.035,.25,M.rust);for(const dz of [-.09,.09])cylinder(x,.227,z+dz,.022,.022,.05,M.rust,5);}}
for(const z of [-5.28,-6.72]){box(0,.205,z,65,.055,.15,M.rail);box(0,.28,z,65,.13,.037,M.rail);box(0,.355,z,65,.042,.069,M.rail);}
// Timber crossing is continuous and slightly above rails. No jumping is needed.
for(let z=-7.54;z<=-4.72;z+=.19)box(10,.365,z,2.1,.05,.174,M.wood);
ramp(10,-7.63,-8.6,2.1,.39,0);
for(const x of [8.6,11.4]){cylinder(x,.76,-8.38,.075,.09,1.51,M.wood);box(x,1.41,-8.38,.21,.24,.2,M.cream);}
box(11.4,1.31,-8.38,1.67,.29,.09,M.paint);sign('WOODLAND WALK  →',11.4,1.31,-8.329,1.65,.27,{font:'Arial',fontSize:88,bg:'#9baa8a'});sign('←  WOODLAND WALK',11.4,1.31,-8.431,1.65,.27,{rotation:Math.PI,font:'Arial',fontSize:88,bg:'#9baa8a'});
// A short forgotten buffer at the end of the line.
for(const z of [-5.28,-6.72]){beam([-26,.28,z],[-26.8,1.2,z],.075,M.rust);beam([-26.8,1.2,z],[-27.5,.25,z],.075,M.rust);}box(-26.84,1.23,-6,.29,.27,2.65,M.wood);solid(-26.8,-6,.75,2.9,1.5);

// Station entrance fencing and a reluctant gate.
function fence(x0,x1,z){for(let x=x0;x<x1;x+=1.8){box(x,.69,z,.12,1.38,.12,M.paint);const w=Math.min(1.8,x1-x);for(const y of [.57,1.07])box(x+w/2,y,z,w,.095,.065,M.paint);}for(let x=x0+.18;x<x1;x+=.22)box(x,.72,z,.07,1.2,.044,M.paint);solid((x0+x1)/2,z,x1-x0,.12,1.42);}
fence(-13,-2,8.9);fence(.15,8,8.9);
for(const x of [-2.1,.15]){box(x,.9,8.9,.25,1.8,.25,M.wood);box(x,1.8,8.9,.34,.07,.34,M.cream);solid(x,8.9,.28,.28,1.9);}
box(.47,.75,9.65,.075,1.4,1.75,M.paint,[0,-.28,0]);for(const y of [.24,1.28])box(.47,y,9.65,.1,.11,1.74,M.wood,[0,-.28,0]);solid(.47,9.65,.57,1.72,1.5);
sign('ALDER HALT',-3.32,1.23,9.02,1.83,.38,{fontSize:175});
// The old platform nameboard survived longer than the passenger service.
for(const x of [-12.7,-10.25]){cylinder(x,1.5,-.62,.047,.062,1.94,M.darkMetal,10);cylinder(x,2.49,-.62,.075,.075,.11,M.rust,8);solid(x,-.62,.13,.13,2.6);}
box(-11.48,2.08,-.62,3,.67,.065,M.paint);sign('ALDER HALT',-11.48,2.08,-.66,2.87,.55,{rotation:Math.PI,fontSize:138,bg:'#bdc3aa'});
solid(-11.48,-.62,3,.09,2.42,1.74);
box(-11.63,.565,-1.72,1.12,.055,.145,M.paint,[0,.27,.02]);
// A luggage trolley, its last crate split open.
box(-7.85,.7,-.82,1.3,.11,.64,M.wood);for(const x of [-8.3,-7.4])for(const z of [-1.08,-.58])cylinder(x,.65,z,.14,.14,.04,M.darkMetal,14,[Math.PI/2,0,0]);beam([-8.5,.7,-.8],[-8.8,1.15,-.8],.024,M.rust);box(-7.76,.98,-.82,.72,.49,.57,M.wood);for(const y of [.82,1.07])box(-7.76,y,-1.12,.78,.047,.021,M.rust);sign('A H',-7.76,.98,-1.125,.28,.14,{rotation:Math.PI,bg:'#998266',font:'Arial'});solid(-7.8,-.82,1.4,.85,1.3);
// Moss at footing, rain streaks, fallen roof pieces and a shallow puddle beneath the drain.
const [mc,mg]=canvas(256);for(let i=0;i<480;i++){mg.fillStyle=pick(['#536343aa','#65714cb0','#3d513966']);mg.beginPath();const a=rand(0,6.28),r=rand(0,103);mg.arc(128+Math.cos(a)*r,128+Math.sin(a)*r,rand(1,11),0,6.3);mg.fill();}const mossDecal=mat('#adb18b',{map:texture(mc),transparent:true,alphaTest:.25,depthWrite:false,side:THREE.DoubleSide});
for(let i=0;i<48;i++){const x=rand(-5.9,3.9),z=pick([-.211,5.311]);if(Math.abs(x+1)<1)continue;mesh(new THREE.PlaneGeometry(rand(.2,.7),rand(.12,.45)),mossDecal,[x,rand(.57,.7),z],[0,z<0?Math.PI:0,0],false);}
const puddle=mat('#7f9c96',{roughness:.17,metalness:.3,transparent:true,opacity:.68,depthWrite:false});mesh(new THREE.CircleGeometry(.54,30),puddle,[-8.45,.521,-3.04],[-Math.PI/2,0,0],false);for(let i=0;i<13;i++)box(rand(-6.8,-6.2),.07,rand(.3,4.7),rand(.2,.42),.04,rand(.18,.3),M.roof,[0,rand(0,6),rand(-.1,.1)]);
// Roots lifted the platform's western end.
for(let i=0;i<5;i++){const z=-3.3+i*.24;beam([-13.9,.04,z-.8],[-13.5,.24,z],.10-i*.011,M.bark);beam([-13.5,.24,z],[-12.8,.48,z+.36],.074-i*.01,M.bark);beam([-12.8,.48,z+.36],[-12.32,.52,z+.54],.025,M.bark);}box(-13.1,.56,-3.43,.62,.13,.42,M.stone,[.1,.04,-.09]);

// Forest creation follows below. The walking routes remain free of trunks.
function distanceToPath(x,z){let dist=Infinity;for(const points of [pathPoints,approachPoints])for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],dx=b[0]-a[0],dz=b[1]-a[1],t=THREE.MathUtils.clamp(((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz),0,1);dist=Math.min(dist,Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz));}return dist;}
function floorHeight(x,z){
 if(x>-6&&x<4&&z>=0&&z<=5.2)return .54;
 if(x>-15&&x<15&&z>=-3.5&&z<=0)return .54;
 if(Math.abs(x+1)<.86&&z>5.2&&z<7.4)return .54*(7.4-z)/2.4;
 if(Math.abs(x-10)<1.06){if(z>=-4.7&&z< -3.5)return .39+.15*(z+4.7)/1.2;if(z>=-7.63&&z< -4.7)return .4;if(z>=-8.6&&z< -7.63)return .4*(z+8.6)/.97;}
 if(z>-7.65&&z<-4.35)return .14;
 return terrainHeight(x,z);
}
function drawLeaf(g,x,y,size,rotation,color){g.save();g.translate(x,y);g.rotate(rotation);g.fillStyle=color;g.beginPath();g.moveTo(0,-size);g.lineTo(size*.25,-size*.55);g.lineTo(size*.54,-size*.6);g.lineTo(size*.43,-size*.27);g.lineTo(size*.66,-size*.11);g.lineTo(size*.33,size*.1);g.lineTo(size*.29,size*.41);g.lineTo(0,size*.63);g.lineTo(-size*.27,size*.4);g.lineTo(-size*.34,size*.08);g.lineTo(-size*.64,-size*.08);g.lineTo(-size*.43,-size*.29);g.lineTo(-size*.52,-size*.59);g.lineTo(-size*.22,-size*.55);g.closePath();g.fill();g.strokeStyle='#46371d66';g.lineWidth=Math.max(.7,size*.045);g.beginPath();g.moveTo(0,size*.79);g.lineTo(0,-size*.78);g.moveTo(0,-size*.24);g.lineTo(size*.37,-size*.48);g.moveTo(0,0);g.lineTo(-size*.4,-size*.19);g.moveTo(0,size*.22);g.lineTo(size*.27,size*.06);g.stroke();g.restore();}
const leafColors=[['#caae46','#9c963e','#d8b650','#8b7c35'],['#b85d28','#cb792e','#a14924','#d78f33'],['#996134','#b78c41','#896236','#c59b46'],['#8c9144','#b1a547','#6f783b','#c4b34c'],['#cc953f','#daae53','#b77d30','#e0be60']];
const crownMaterials=leafColors.map(colors=>{const [c,g]=canvas(512);for(let i=0;i<115;i++)drawLeaf(g,rand(38,474),rand(38,474),rand(22,44),rand(0,6.28),pick(colors));return new THREE.MeshLambertMaterial({color:'#fff',map:texture(c),alphaTest:.42,side:THREE.DoubleSide,alphaToCoverage:true});});
const leafTransforms=leafColors.map(()=>[]),treePositions=[];
function addLeafCard(x,y,z,s,palette){temp.position.set(x,y,z);temp.rotation.set(rand(-Math.PI,Math.PI),rand(0,Math.PI),rand(0,Math.PI));temp.scale.set(s,rand(.85,1.2)*s,1);temp.updateMatrix();leafTransforms[palette].push(temp.matrix.clone());}
function tree(x,z,h,palette=0){const radius=rand(.17,.34),lean=rand(-.65,.65),leanZ=rand(-.65,.65),angle=rand(0,6.28),gy=terrainHeight(x,z),distant=Math.hypot(x,z)>27;treePositions.push({x,z,r:radius});solid(x,z,radius*2+.08,radius*2+.08,gy+3);
 const trunk=[];for(let k=0;k<=4;k++){const t=k/4;trunk.push([x+lean*t+Math.sin(t*3)*.12,gy+h*.9*t,z+leanZ*t]);if(k)beam(trunk[k-1],trunk[k],radius*(1-(k-1)*.19),M.bark,radius*(1-k*.19),distant?6:9);}
 for(let j=0;j<(distant?3:5);j++){const a=angle+j*1.25;const rr=rand(.6,1.5);beam([x,gy+.14,z],[x+Math.cos(a)*rr,terrainHeight(x+Math.cos(a)*rr,z+Math.sin(a)*rr)+.015,z+Math.sin(a)*rr],radius*.38,M.bark,.014,distant?4:7);}
 for(let level=0;level<3;level++)for(let arm=0;arm<3;arm++){
  const a=angle+arm*2.1+level*.8+rand(-.6,.6),by=gy+h*(.43+level*.16+rand(-.04,.04)),spread=rand(2.4,4.1)*(1-level*.18),cx=x+Math.cos(a)*spread,cz=z+Math.sin(a)*spread,cy=by+rand(.75,2.1);
  const mid=[x+Math.cos(a)*spread*.52,by+rand(.3,.8),z+Math.sin(a)*spread*.48];beam([x+lean*.5,by,z+leanZ*.5],mid,radius*(.48-level*.09),M.bark,.065,distant?4:7);beam(mid,[cx,cy,cz],.065,M.bark,.018,distant?3:6);
  for(let branch=0;branch<(distant?2:3);branch++){const a2=a+rand(-1,1),rr=rand(.6,1.25),ex=cx+Math.cos(a2)*rr,ez=cz+Math.sin(a2)*rr,ey=cy+rand(.25,1.1);beam([cx,cy,cz],[ex,ey,ez],.035,M.bark,.008,distant?3:5);
   for(let k=0;k<(distant?4:5);k++)addLeafCard(ex+rand(-1,.95),ey+rand(-.68,.9),ez+rand(-1,1),distant?rand(1.7,2.5):rand(1.35,2.05),palette);
  }
 }
 for(let k=0;k<(distant?16:25);k++)addLeafCard(x+lean+rand(-1.3,1.3),gy+h+rand(-1.1,.9),z+leanZ+rand(-1.3,1.3),distant?rand(1.7,2.5):rand(1.4,2.05),palette);
}
// Carefully placed foreground trees frame different views; rings behind provide depth.
function inSunLane(x,z){const dx=x+1,dz=z-2,t=dx*(-.848)+dz*.53;return t>4&&t<42&&Math.abs(dx*.53+dz*.848)<5.8;}
for(const [x,z,h,c] of [[-12,1,12,1],[-14,20,14,0],[-10,-11,13,4],[-17,-9,14,1],[7,14,12,4],[12,16,14,1],[17,3,12,0],[17,-4,13,1],[14,-18,13,4],[-21,2,15,0],[-11,23,12,3],[27,7,14,1],[4,-13,12,0],[-2,-16,14,1],[22,15,14,4]])tree(x,z,h,c);
let planted=0,tries=0;while(planted<110&&tries++<2000){const x=rand(-40,40),z=rand(-37,37);
 if(x>-10&&x<14&&z>-10&&z<13)continue;if(Math.abs(z+6)<3.1&&Math.abs(x)<32)continue;
 if(distanceToPath(x,z)<2.2||inSunLane(x,z)||treePositions.some(t=>Math.hypot(x-t.x,z-t.z)<3.25))continue;
 tree(x,z,rand(8.5,15.5),Math.floor(rand(0,5)));planted++;
}
// Hazel and young maples beneath the tall canopy, kept back from the walk.
for(let i=0;i<62;i++){let x=rand(-33,33),z=rand(-28,28);if((x>-10&&x<14&&z>-9&&z<10)||distanceToPath(x,z)<2||Math.abs(z+6)<2.5)continue;const h=rand(1.8,4),gy=terrainHeight(x,z),pal=Math.floor(rand(0,5));for(let j=0;j<3;j++){const ex=x+rand(-.65,.65),ez=z+rand(-.65,.65);beam([x,gy,z],[ex,gy+h,ez],.035,M.bark,.006,5);for(let k=0;k<15;k++)addLeafCard(ex+rand(-.55,.55),gy+h+rand(-.6,.5),ez+rand(-.55,.55),rand(.65,1.05),pal);}}
leafTransforms.forEach((list,i)=>{const ob=new THREE.InstancedMesh(new THREE.PlaneGeometry(1,1),crownMaterials[i],list.length);list.forEach((m,j)=>ob.setMatrixAt(j,m));ob.castShadow=true;ob.receiveShadow=true;ob.computeBoundingSphere();scene.add(ob);});
// Ferns: upright fronds with paired tapering leaflets, rather than opaque bushes.
const fernM=new THREE.MeshLambertMaterial({color:'#76733d',side:THREE.DoubleSide}),fernBrown=new THREE.MeshLambertMaterial({color:'#8b673c',side:THREE.DoubleSide});
fernM.userData.spatial=fernBrown.userData.spatial=true;
function fern(x,z,scale=.7){const y=floorHeight(x,z)+.015;const verts=[];
 for(let frond=0;frond<6;frond++){const a=frond*Math.PI/3+rand(-.2,.2);for(let k=1;k<9;k++){const t=k/9,r=t*scale,yy=y+Math.sin(t*Math.PI*.8)*scale*.62;const cx=x+Math.cos(a)*r,cz=z+Math.sin(a)*r;const wid=(1-t)*scale*.19;for(const s of [-1,1]){verts.push(cx,yy,cz,cx+Math.cos(a+.9*s)*wid,yy-.02,cz+Math.sin(a+.9*s)*wid,cx+Math.cos(a)*scale*.13,yy+.025,cz+Math.sin(a)*scale*.13);}}}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(new Array(verts.length/3*2).fill(0),2));g.computeVertexNormals();mesh(g,random()<.65?fernM:fernBrown,[0,0,0],[0,0,0],false);}
for(let i=0;i<260;i++){const x=rand(-32,32),z=rand(-28,28);if((x>-9&&x<15&&z>-8&&z<7)||distanceToPath(x,z)<1.3||Math.abs(z+6)<2)continue;fern(x,z,rand(.35,.9));}
for(const [x,z] of [[-7.1,5.4],[-6.8,3.3],[4.8,4.6],[7.3,7.5],[9.2,-9.1],[11.8,-9.5],[-11.8,-2.6]])fern(x,z,.75);
// Fine dry grasses grow through the ballast, at path margins and against masonry.
const grassM=new THREE.MeshLambertMaterial({color:'#b4a16a',side:THREE.DoubleSide}),grassGreen=new THREE.MeshLambertMaterial({color:'#6d7447',side:THREE.DoubleSide});
grassM.userData.spatial=grassGreen.userData.spatial=true;
function grass(x,z,s){const y=floorHeight(x,z);const v=[],uv=[];for(let i=0;i<7;i++){const a=rand(0,6.28),dx=Math.cos(a)*.014,dz=Math.sin(a)*.014,h=rand(.18,.44)*s,bx=rand(-.09,.09)*s,bz=rand(-.09,.09)*s;v.push(x-dx,y,z-dz,x+dx,y,z+dz,x+bx,y+h,z+bz);uv.push(0,0,1,0,.5,1);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.computeVertexNormals();mesh(g,random()<.65?grassM:grassGreen,[0,0,0],[0,0,0],false);}
for(let i=0;i<800;i++){const x=rand(-30,30),z=rand(-25,25);if(x>-6&&x<4&&z>0&&z<5.2)continue;if(x>-15&&x<15&&z>-3.4&&z<-.15)continue;if(distanceToPath(x,z)<1.05)continue;grass(x,z,rand(.65,1.4));}
for(let i=0;i<115;i++){const x=rand(-25,26),z=rand(-7.4,-4.5);if(Math.abs(x-10)<1.4)continue;grass(x,z,rand(.5,1));}
// Fallen leaves gather at walls, around roots and along the sheltered platform.
const litterM=leafColors.slice(0,3).map(colors=>{const [c,g]=canvas(128);drawLeaf(g,64,64,57,0,pick(colors));return new THREE.MeshLambertMaterial({color:'#fff',map:texture(c),alphaTest:.4,side:THREE.DoubleSide,alphaToCoverage:true});});
const litterLists=[[],[],[]];
function litter(x,z,s=rand(.07,.17),y=floorHeight(x,z)){temp.position.set(x,y+.014+rand(0,.008),z);temp.rotation.set(-Math.PI/2+rand(-.09,.09),0,rand(0,6.28));temp.scale.set(s,s*rand(.8,1.3),1);temp.updateMatrix();litterLists[Math.floor(rand(0,3))].push(temp.matrix.clone());}
for(let i=0;i<7000;i++){const x=rand(-35,35),z=rand(-30,30);if(x>-6&&x<4&&z>0&&z<5.1)continue;if(distanceToPath(x,z)<.8&&random()<.8)continue;if(Math.abs(x-10)<1.1&&z>-8&&z<-3.5&&random()<.8)continue;litter(x,z);}
for(let i=0;i<1700;i++){const x=rand(-14.7,14.7),z=pick([rand(-.32,-.08),rand(-3.35,-3.06),rand(-2,-.2)]);litter(x,z,rand(.08,.17),.54);}
for(let i=0;i<440;i++){const x=rand(-5.75,3.75),z=random()<.6?pick([rand(.23,.6),rand(4.55,4.85)]):rand(.3,4.8);if(random()<.6&&Math.abs(x+1)>.9&&z>1&&z<4)continue;litter(x,z,rand(.06,.14),.55);}
for(let i=0;i<370;i++){const x=rand(-5.15,-2.85),z=rand(-1.4,-.64);litter(x,z,rand(.08,.17),.55+.04*Math.sin((x+5.15)/2.3*Math.PI)*random());}
for(const t of treePositions.slice(0,35))for(let i=0;i<25;i++){const a=rand(0,6.28),r=rand(.4,1.3);litter(t.x+Math.cos(a)*r,t.z+Math.sin(a)*r,rand(.08,.17));}
litterLists.forEach((list,i)=>{const o=new THREE.InstancedMesh(new THREE.PlaneGeometry(1,1),litterM[i],list.length);list.forEach((m,j)=>o.setMatrixAt(j,m));o.receiveShadow=true;o.computeBoundingSphere();scene.add(o);});
// A rotting fallen tree, fungi and a stone milepost reward the woodland view.
beam([17.3,.36,-8.2],[20.1,.48,-6.4],.32,M.bark,.22,12);cylinder(17.31,.36,-8.2,.27,.27,.014,M.wood,16,[Math.PI/2,0,-.94]);for(let i=0;i<5;i++)beam([18+i*.35,.45,-7.8+i*.21],[18.3+i*.35,.78,-7.65+i*.21],.065,M.bark,.008);
const fungiM=mat('#b7a581');for(let i=0;i<9;i++){const x=17.8+i*.21,z=-7.7+i*.12;cylinder(x,.28,z,.018,.025,.21,M.cream,6);mesh(new THREE.SphereGeometry(.08,8,5,0,Math.PI*2,0,Math.PI/2),fungiM,[x,.39,z],[0,0,0],false);}
solid(18.8,-7.3,2.6,1,1);
box(19.3,.54,-13.5,.29,1.08,.24,M.stone,[0,.25,-.04]);sign('14',19.28,.82,-13.35,.22,.22,{fontSize:175,bg:'#aaa890',rotation:.25});
for(let i=0;i<90;i++){const x=rand(-35,35),z=rand(-28,28);if((x>-9&&x<16&&z>-8&&z<8)||distanceToPath(x,z)<1.25)continue;rock(x,z,rand(.08,.5));}
// Angular, mixed ballast is visible between sleepers, rather than a flat strip alone.
const ballastGeo=new THREE.IcosahedronGeometry(1,0),ballastM=mat('#8b8b7c'),ballastInstances=new THREE.InstancedMesh(ballastGeo,ballastM,1600);const stoneColor=new THREE.Color();
for(let i=0;i<1600;i++){let x=rand(-31.5,31.5),z=rand(-7.6,-4.4);if(Math.abs(x-10)<1.13){x+=2.5;}temp.position.set(x,.13,z);temp.rotation.set(rand(0,3),rand(0,6.28),rand(0,3));const s=rand(.035,.085);temp.scale.set(s,s*rand(.45,.9),s*rand(.7,1.5));temp.updateMatrix();ballastInstances.setMatrixAt(i,temp.matrix);stoneColor.setHSL(rand(.08,.16),rand(.02,.12),rand(.22,.44));ballastInstances.setColorAt(i,stoneColor);}ballastInstances.receiveShadow=true;ballastInstances.computeBoundingSphere();scene.add(ballastInstances);
// Telegraph poles, loose insulators, and a sagging wire fading into trees.
const poleXs=[-22,-8,8,23];for(const x of poleXs){cylinder(x,3.05,-10.35,.1,.15,6.1,M.wood,8);box(x,5.56,-10.35,1.1,.11,.11,M.wood);for(const dx of [-.43,.43]){cylinder(x+dx,5.68,-10.35,.045,.055,.15,M.cream,8);cylinder(x+dx,5.77,-10.35,.065,.065,.06,M.cream,8);}solid(x,-10.35,.26,.26,6);}
for(let i=1;i<poleXs.length;i++){const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(poleXs[i-1]-.43,5.83,-10.35),new THREE.Vector3((poleXs[i-1]+poleXs[i])/2,4.9,-10.35),new THREE.Vector3(poleXs[i]-.43,5.83,-10.35)]);mesh(new THREE.TubeGeometry(curve,20,.009,4,false),M.darkMetal);}
// An ivy remnant on the western brickwork: curled stems and small green leaf clusters.
const ivyM=mat('#59694b',{side:THREE.DoubleSide});for(let i=0;i<8;i++){const z=rand(.4,4.6);beam([-6.2,.1,z],[-6.21,rand(1,3.1),z+.22],.012,M.bark,.004,4);for(let j=0;j<9;j++){const g=new THREE.CircleGeometry(rand(.04,.09),5);mesh(g,ivyM,[-6.23,.25+j*.22,z+rand(-.13,.23)],[0,-Math.PI/2,rand(0,6)],false);}}
// Rain has left soft streaks below the eaves and sills, with lichen on sheltered brick.
const [wc,wg]=canvas(256,512);for(let i=0;i<160;i++){const x=rand(0,256),y=rand(0,512),r=rand(6,45);const grad=wg.createRadialGradient(x,y,0,x,y,r);grad.addColorStop(0,'#1b30221b');grad.addColorStop(1,'#1b302200');wg.fillStyle=grad;wg.fillRect(x-r,y-r,r*2,r*2);}for(let i=0;i<26;i++){const x=rand(0,256),y=rand(0,190);const grad=wg.createLinearGradient(0,y,0,y+rand(100,300));grad.addColorStop(0,'#20292320');grad.addColorStop(1,'#20292300');wg.fillStyle=grad;wg.fillRect(x,y,rand(1,9),rand(80,310));}const weatherM=mat('#fff',{map:texture(wc),transparent:true,depthWrite:false,side:THREE.DoubleSide,roughness:1});
for(const z of [-.174,5.274])for(const [x,w] of [[-5.45,.9],[-2.5,1.18],[.57,1.1],[3.46,.91]])mesh(new THREE.PlaneGeometry(w,2.9),weatherM,[x,2,z],[0,z<0?Math.PI:0,0],false);
for(const x of [-6.175,4.175])for(const z of [.57,4.52])mesh(new THREE.PlaneGeometry(.92,2.9),weatherM,[x,2,z],[0,x<0?-Math.PI/2:Math.PI/2,0],false);
// A tin bucket, a broom, coat hooks and abandoned paper add small-scale room detail.
cylinder(2.34,.72,4.49,.13,.095,.34,M.rust,14);cylinder(2.34,.895,4.49,.136,.136,.025,M.darkMetal,14);cylinder(2.34,.912,4.49,.114,.114,.008,M.black,14);
beam([3.47,.6,4.65],[3.58,1.99,4.79],.019,M.wood,.018,7);for(let i=0;i<11;i++)beam([3.47,.72,4.65],[3.31+i*.031,.54,4.59+rand(-.07,.07)],.013,M.wood,.009,4);
box(-5.72,2.46,4.09,.085,.13,.7,M.wood);for(const z of [3.84,4.09,4.34]){beam([-5.67,2.45,z],[-5.48,2.4,z],.016,M.rust);beam([-5.48,2.4,z],[-5.46,2.45,z],.016,M.rust);}
const [pc,pg]=canvas(512,384);pg.fillStyle='#b8ae90';pg.fillRect(0,0,512,384);pg.fillStyle='#484c3a';pg.font='bold 43px Georgia';pg.fillText('THE ALDER GAZETTE',18,58);pg.font='17px Georgia';pg.fillText('Monday · 30 September 1968',19,84);for(let i=0;i<23;i++){pg.fillStyle='#4b48364c';pg.fillRect(20,104+i*10,rand(180,230),2);pg.fillRect(278,104+i*10,rand(120,215),2);}pg.fillStyle='#66624c';pg.fillRect(23,125,180,100);pg.fillStyle='#b8ae90';pg.fillRect(23,125,180,37);const paperM=mat('#fff',{map:texture(pc),side:THREE.DoubleSide});mesh(new THREE.PlaneGeometry(.39,.28),paperM,[-4.2,1.012,-1.01],[-Math.PI/2,0,.22],false);mesh(new THREE.PlaneGeometry(.19,.28),paperM,[-4.43,1.037,-1.065],[-Math.PI/2-.23,0,.22],false);
for(let i=0;i<7;i++){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,rand(.04,.11),0,0,rand(.01,.06),0,rand(.04,.1)],3));g.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,1,0,.5,1],2));g.computeVertexNormals();mesh(g,M.glass,[rand(-3.1,-2),.561,rand(-.65,-.28)],[0,rand(0,6.28),0],false);}
flush();

// First-person walking, with a small-radius capsule projected against static walls.
const keys=new Set();let yaw=0,pitch=0,locked=false,paused=true;
const player={x:-1,z:12.7,y:1.68};let velocityX=0,velocityZ=0;
const qualityLevels=[{name:'Balanced',ratio:1.25},{name:'High',ratio:1.75},{name:'Performance',ratio:.85}];let qualityIndex=0;
function quality(index){qualityIndex=index%qualityLevels.length;renderer.setPixelRatio(Math.min(devicePixelRatio,qualityLevels[qualityIndex].ratio));renderer.setSize(innerWidth,innerHeight);$('#quality').value=qualityIndex;}
$('#quality').addEventListener('change',e=>quality(Number(e.target.value)));
$('#resetButton').addEventListener('click',reset);
const EYE=1.68,RADIUS=.24;
function reset(){player.x=-1;player.z=12.7;player.y=EYE;yaw=0;pitch=0;velocityX=velocityZ=0;keys.clear();updateCamera();}
function blocked(x,z,foot){if(Math.abs(x)>38||Math.abs(z)>33)return true;for(const c of colliders){if(foot+.06>=c.ymax||foot+1.6<=c.ymin)continue;const nearX=THREE.MathUtils.clamp(x,c.x0,c.x1),nearZ=THREE.MathUtils.clamp(z,c.z0,c.z1);if((x-nearX)**2+(z-nearZ)**2<RADIUS*RADIUS)return true;}return false;}
function move(dx,dz){const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.08));for(let i=0;i<steps;i++){const xx=player.x+dx/steps,zz=player.z+dz/steps;if(!blocked(xx,player.z,floorHeight(xx,player.z)))player.x=xx;if(!blocked(player.x,zz,floorHeight(player.x,zz)))player.z=zz;}}
function updateCamera(){camera.position.set(player.x,player.y,player.z);camera.rotation.order='YXZ';camera.rotation.set(pitch,yaw,0);}
reset();
$('#enter').addEventListener('click',()=>{paused=false;$('#veil').classList.add('hidden');renderer.domElement.requestPointerLock();});
renderer.domElement.addEventListener('click',()=>{if(!locked){paused=false;$('#veil').classList.add('hidden');renderer.domElement.requestPointerLock();}});
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===renderer.domElement;paused=!locked;$('#veil').classList.toggle('hidden',locked);keys.clear();velocityX=velocityZ=0;$('#enter').textContent='CONTINUE EXPLORING';});
document.addEventListener('mousemove',e=>{if(locked){yaw-=e.movementX*.00185;pitch=THREE.MathUtils.clamp(pitch-e.movementY*.00185,-1.46,1.46);}});
document.addEventListener('keydown',e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space'].includes(e.code))e.preventDefault();keys.add(e.code);if(e.code==='Escape'){document.exitPointerLock();paused=true;keys.clear();$('#veil').classList.remove('hidden');}if(e.code==='KeyR')reset();if(e.code==='KeyQ'&&!e.repeat)quality(qualityIndex+1);if(e.code==='KeyP'){$('#perf').style.display=$('#perf').style.display==='block'?'none':'block';}});
document.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>{keys.clear();velocityX=velocityZ=0;});
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
let last=performance.now(),frameHistory=[],reportHistory=[],lastReport=0,routeVisited=new Set(['approach']),rendered=0;
document.addEventListener('visibilitychange',()=>{last=performance.now();keys.clear();velocityX=velocityZ=0;});
const locations=[{key:'room',name:'The waiting room',test:(x,z)=>x>-6&&x<4&&z>0&&z<5.2},{key:'platform',name:'Beneath the canopy',test:(x,z)=>x>-9&&x<9&&z>-3.5&&z<0},{key:'crossing',name:'The timber crossing',test:(x,z)=>Math.abs(x-10)<1.5&&z>-8.6&&z<-3.4},{key:'woods',name:'The woodland loop',test:(x,z)=>x>14||z<-9},{key:'approach',name:'The approach',test:()=>true}];
function stats(){const a=frameHistory.slice().sort((a,b)=>a-b);const sum=a.reduce((a,b)=>a+b,0);return {frames:a.length,meanMs:a.length?sum/a.length:0,p50Ms:a[Math.floor(a.length*.5)]||0,p95Ms:a[Math.floor(a.length*.95)]||0,p99Ms:a[Math.floor(a.length*.99)]||0,maxMs:a[a.length-1]||0,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,trees:treePositions.length,foliageCards:leafTransforms.reduce((a,b)=>a+b.length,0)};}
function animate(now){requestAnimationFrame(animate);const elapsed=now-last;last=now;const dt=Math.min(elapsed/1000,.045);
 if(rendered>10&&elapsed>0&&!document.hidden){frameHistory.push(elapsed);if(frameHistory.length>1800)frameHistory.shift();}
 if(!paused){let f=(keys.has('KeyW')?1:0)-(keys.has('KeyS')?1:0),s=(keys.has('KeyD')?1:0)-(keys.has('KeyA')?1:0);const len=Math.hypot(f,s);if(len>1){f/=len;s/=len;}const speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?3.6:2.15;const targetX=(s*Math.cos(yaw)-f*Math.sin(yaw))*speed,targetZ=(-f*Math.cos(yaw)-s*Math.sin(yaw))*speed;
  const blend=1-Math.exp(-dt*13);velocityX+=(targetX-velocityX)*blend;velocityZ+=(targetZ-velocityZ)*blend;move(velocityX*dt,velocityZ*dt);
  const turning=1.3*dt;if(keys.has('ArrowLeft'))yaw+=turning;if(keys.has('ArrowRight'))yaw-=turning;if(keys.has('ArrowUp'))pitch=THREE.MathUtils.clamp(pitch+turning,-1.46,1.46);if(keys.has('ArrowDown'))pitch=THREE.MathUtils.clamp(pitch-turning,-1.46,1.46);
 }
 const h=floorHeight(player.x,player.z)+EYE;player.y+=(h-player.y)*(1-Math.exp(-dt*16));updateCamera();
 const loc=locations.find(l=>l.test(player.x,player.z));routeVisited.add(loc.key);$('#location').innerHTML=`${loc.name}<span>WOODLAND BRANCH · MILE 14</span>`;
 renderer.render(scene,camera);rendered++;
 if(rendered===2){renderer.shadowMap.autoUpdate=false;$('#loading').style.display='none';$('#enter').disabled=false;$('#enter').textContent='ENTER THE STATION';}
 if(now-lastReport>600){lastReport=now;const st=stats();$('#perf').textContent=`FRAME TIMING · rolling ${st.frames} frames\nmean ${st.meanMs.toFixed(1)} ms  ·  p95 ${st.p95Ms.toFixed(1)} ms\np99  ${st.p99Ms.toFixed(1)} ms  ·  max ${st.maxMs.toFixed(1)} ms\n${st.drawCalls} draws  ·  ${(st.triangles/1000).toFixed(0)}k triangles\n${qualityLevels[qualityIndex].name} · ${renderer.getPixelRatio().toFixed(2)} pixel ratio\nQ changes quality · P hides this panel`;}
}
// Read-only scene evidence plus deterministic test hooks for local browser verification.
window.alder={getStats:stats,getInput:()=>({paused,locked,keys:[...keys],focused:document.hasFocus()}),getPlayer:()=>({...player,yaw,pitch,footHeight:floorHeight(player.x,player.z),blocked:blocked(player.x,player.z,floorHeight(player.x,player.z)),visited:[...routeVisited]}),testMove:(dx,dz)=>{move(dx,dz);player.y=floorHeight(player.x,player.z)+EYE;updateCamera();return window.alder.getPlayer();},testPose:(x,z,a=0,p=0)=>{player.x=x;player.z=z;player.y=floorHeight(x,z)+EYE;yaw=a;pitch=p;updateCamera();return window.alder.getPlayer();},reset,clearTiming:()=>{frameHistory=[];},renderer:()=>({width:renderer.domElement.width,height:renderer.domElement.height,webgl:renderer.capabilities.isWebGL2})};
window.addEventListener('error',e=>{$('#error').style.display='block';$('#error').textContent=`The scene could not start: ${e.message}. Launch with node server.cjs and open the localhost address.`;});
requestAnimationFrame(animate);
