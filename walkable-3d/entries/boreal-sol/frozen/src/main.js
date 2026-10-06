import * as THREE from '../vendor/three.module.js';
import { RoundedBoxGeometry } from '../vendor/RoundedBoxGeometry.js';
import { mergeGeometries } from '../vendor/BufferGeometryUtils.js';

// All imagery, materials and geometry in this scene are generated locally.
const $ = s => document.querySelector(s);
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x809cba, 0.0075);
const camera = new THREE.PerspectiveCamera(68, innerWidth / innerHeight, .055, 160);
camera.rotation.order = 'YXZ';
const renderer = new THREE.WebGLRenderer({antialias:true, powerPreference:'high-performance'});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.02;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
$('#scene').appendChild(renderer.domElement);
let seed = 7281;
const random = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; };
const range = (a,b) => a + random() * (b-a);
const colliders = [], bolts = [], allLights = [];
const snowDrifts=[];
const boxGeo = new THREE.BoxGeometry(1,1,1);
const cylinderGeo = new THREE.CylinderGeometry(1,1,1,16);
const sphereGeo = new THREE.SphereGeometry(1,16,10);
function material(color, roughness=.75, metalness=0, options={}) { return new THREE.MeshStandardMaterial({color,roughness,metalness,...options}); }
function mesh(geo,mat,x=0,y=0,z=0){ const m = new THREE.Mesh(geo,mat); m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;scene.add(m);return m; }
function box(x,y,z,w,h,d,mat,solid=false){const bevel=Math.min(.014,Math.min(w,h,d)*.18);const rounded=Math.min(w,h,d)>.028&&Math.max(w,h,d)<5.6;let m=mesh(rounded?new RoundedBoxGeometry(w,h,d,1,bevel):boxGeo,mat,x,y,z);if(!rounded)m.scale.set(w,h,d);if(solid) collide(x,z,w,d);return m;}
function cyl(x,y,z,r,h,mat,rot=null){let m=mesh(cylinderGeo,mat,x,y,z);m.scale.set(r,h,r);if(rot)m.rotation.set(...rot);return m;}
function ball(x,y,z,rx,ry,rz,mat){const m=mesh(sphereGeo,mat,x,y,z);m.scale.set(rx,ry,rz);return m;}
function collide(x,z,w,d){colliders.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2});}
function bar(a,b,r,mat){const d=new THREE.Vector3(...b).sub(new THREE.Vector3(...a));const m=cyl((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,r,d.length(),mat);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return m;}
function curve(points,r,mat){return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),points.length*5,r,6,false),mat);}
function canvasTexture(w,h,paint){const c=document.createElement('canvas');c.width=w;c.height=h;paint(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return t;}
function noiseTexture(base,type='paint') {return canvasTexture(512,512,(ctx,w,h)=>{ctx.fillStyle=base;ctx.fillRect(0,0,w,h);for(let i=0;i<20000;i++){const k=random()>.5?255:0;ctx.fillStyle=`rgba(${k},${k},${k},${type==='fabric'?.12:.05})`;ctx.fillRect(random()*w,random()*h,range(.5,2),range(.5,2));}if(type==='wood'){for(let i=0;i<180;i++){ctx.strokeStyle=`rgba(65,36,14,${range(.03,.14)})`;ctx.lineWidth=range(.5,2);ctx.beginPath();const y=range(0,h);ctx.moveTo(0,y);for(let x=0;x<=w;x+=16)ctx.lineTo(x,y+Math.sin(x*.018+i)*range(1,6));ctx.stroke();}}if(type==='fabric'){ctx.fillStyle='#ffffff14';for(let x=0;x<w;x+=4)ctx.fillRect(x,0,1,h);for(let y=0;y<h;y+=4)ctx.fillRect(0,y,w,1);}if(type==='paint'){for(let i=0;i<100;i++){ctx.strokeStyle='#ffffff09';ctx.beginPath();const x=range(0,w),y=range(0,h);ctx.moveTo(x,y);ctx.lineTo(x+range(3,35),y+range(-1,1));ctx.stroke();}}});}
function repeat(t,x,y=x){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(x,y);return t;}
const snowTex = canvasTexture(512,512,(c,w,h)=>{c.fillStyle='#dce8f2';c.fillRect(0,0,w,h);for(let i=0;i<44000;i++){c.fillStyle=random()>.52?'#ffffff20':'#334f7310';c.fillRect(random()*w,random()*h,range(.4,1.8),range(.4,1.8));}for(let i=0;i<100;i++){c.strokeStyle='#8ea9c51a';c.lineWidth=range(.5,2);c.beginPath();for(let x=0;x<=w;x+=8){const y=i*7+Math.sin(x*.045+i)*3;x?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}});
const snowBump = snowTex.clone();repeat(snowTex,22);repeat(snowBump,22);
const snow = material(0xd6e5f1,.87,0,{map:snowTex,bumpMap:snowBump,bumpScale:.045});
const roofSnow = material(0xdbe9f3,.86,0,{map:repeat(snowTex.clone(),4),bumpMap:repeat(snowBump.clone(),4),bumpScale:.025});
const steel = material(0x8da0a8,.43,.8);
const dark = material(0x243841,.62,.6);
const rubber = material(0x18282e,.93);
const orange = material(0xffffff,.77,.12,{map:repeat(noiseTexture('#b97852'),2,2),bumpMap:repeat(noiseTexture('#aaaaaa'),2),bumpScale:.007});
const exterior = material(0x83989e,.8,.2,{map:repeat(noiseTexture('#bdcbd0'),2)});
const interior = material(0xd5ccb0,.87,0,{map:repeat(noiseTexture('#e2ddc9'),2,2),bumpMap:noiseTexture('#bcbcb4'),bumpScale:.013});
const seamMat = material(0x817f71,.86);
const trim = material(0x8b8a78,.65,.4);
const wood = material(0xb8a174,.65,0,{map:repeat(noiseTexture('#b8a075','wood'),2,1),bumpMap:repeat(noiseTexture('#baa77f','wood'),2,1),bumpScale:.008});
const cabinet = material(0x3e6467,.72,.25,{map:noiseTexture('#8ba0a0')});
const fabric = material(0x8b7661,.95,0,{map:repeat(noiseTexture('#a69478','fabric'),3)});
const blueFabric = material(0x34555e,.98,0,{map:repeat(noiseTexture('#83979d','fabric'),3)});
const floorTex=canvasTexture(256,256,(c,w,h)=>{c.fillStyle='#777b70';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=16)for(let x=0;x<w;x+=16){c.strokeStyle='#c1c3ac';c.lineWidth=1;c.beginPath();c.moveTo(x,y+4);c.lineTo(x+7,y+10);c.stroke();c.strokeStyle='#3a443f';c.beginPath();c.moveTo(x+8,y+5);c.lineTo(x+14,y+11);c.stroke();}for(let i=0;i<2000;i++){c.fillStyle='#cbd1b51d';c.fillRect(random()*w,random()*h,1,1);}});
const floorMat=material(0x7e8275,.8,.35,{map:repeat(floorTex,5,6),bumpMap:repeat(floorTex.clone(),5,6),bumpScale:.008});
const glow = material(0xffdc98,.35,0,{emissive:0xffc97a,emissiveIntensity:2.3});
const red = material(0xb6462e,.7,.15), yellow=material(0xd2ad55,.65,.25);
const glass = new THREE.MeshPhysicalMaterial({color:0x91bdd0,metalness:.12,roughness:.16,transparent:true,opacity:.17,side:THREE.DoubleSide,depthWrite:false});

// Twilight: blue zenith, pale luminous horizon, no screen-space day/night switch.
const skyGeo=new THREE.SphereGeometry(100,32,18);
const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{top:{value:new THREE.Color('#102c61')},bottom:{value:new THREE.Color('#739bc1')}},vertexShader:'varying vec3 vWorld;void main(){vWorld=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 vWorld;uniform vec3 top;uniform vec3 bottom;void main(){float h=normalize(vWorld).y;vec3 col=mix(bottom,top,pow(max(h,0.),.42));gl_FragColor=vec4(col,1.);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}'});
const sky=mesh(skyGeo,skyMat,0,0,0);sky.castShadow=sky.receiveShadow=false;sky.renderOrder=-10;
const environmentTex=canvasTexture(512,256,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#243e5e');g.addColorStop(.5,'#b8d1e1');g.addColorStop(.51,'#b5c9d8');g.addColorStop(1,'#52677b');c.fillStyle=g;c.fillRect(0,0,w,h);});environmentTex.mapping=THREE.EquirectangularReflectionMapping;const pmrem=new THREE.PMREMGenerator(renderer);scene.environment=pmrem.fromEquirectangular(environmentTex).texture;scene.environmentIntensity=.45;pmrem.dispose();environmentTex.dispose();
const hemi=new THREE.HemisphereLight(0xa8c9f0,0x3b4a5b,.9);scene.add(hemi);
const moonlight=new THREE.DirectionalLight(0xb1ceff,1.2);moonlight.position.set(-11,17,9);moonlight.castShadow=true;moonlight.shadow.mapSize.set(2048,2048);moonlight.shadow.camera.left=-15;moonlight.shadow.camera.right=15;moonlight.shadow.camera.top=15;moonlight.shadow.camera.bottom=-15;moonlight.shadow.camera.near=.1;moonlight.shadow.camera.far=55;moonlight.shadow.normalBias=.025;moonlight.shadow.bias=-.00012;scene.add(moonlight);
const moon=mesh(new THREE.SphereGeometry(.7,20,16),new THREE.MeshBasicMaterial({color:0xc9dceb}),-35,32,-55);moon.castShadow=false;
function point(x,y,z,color,power,distance){const l=new THREE.PointLight(color,power,distance,2);l.position.set(x,y,z);scene.add(l);allLights.push(l);return l;}
function spot(x,y,z,tx,ty,tz,power,angle=.9){const l=new THREE.SpotLight(0xffca83,power,12,angle,.6,1.5);l.position.set(x,y,z);l.target.position.set(tx,ty,tz);scene.add(l,l.target);l.castShadow=true;l.shadow.mapSize.set(1024,1024);l.shadow.bias=-.00015;l.shadow.normalBias=.016;allLights.push(l);return l;}

// Snow surface remains navigable; larger drifts curve around the usable patch.
function snowHeight(x,z){return .018+.018*Math.sin(x*.7+z*.35)+.013*Math.sin(z*1.4-x*.5)+.022*Math.sin(x*.21-z*.4);}
const terrain=new THREE.PlaneGeometry(80,80,130,130);terrain.rotateX(-Math.PI/2);
const pos=terrain.attributes.position,col=[];
for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i);let h=snowHeight(x,z);const away=Math.min(1,Math.max(0,(Math.hypot(x,z)-11)/10));h+=away*(.25+.18*Math.sin(x*.33)+.2*Math.cos(z*.22));pos.setY(i,h);const k=.89+random()*.1;col.push(k*.96,k,k);}terrain.setAttribute('color',new THREE.Float32BufferAttribute(col,3));terrain.computeVertexNormals();const groundMat=snow.clone();groundMat.vertexColors=true;const ground=mesh(terrain,groundMat);ground.castShadow=false;
function snowClearance(x,z){const main=Math.max(Math.abs(x)-3.48,-4.02-z,z-3.7);const entry=Math.max(Math.abs(x)-1.4,3.5-z,z-6.18);return THREE.MathUtils.smoothstep(Math.min(main,entry),0,.42);}
function drift(x,z,length,width,height,rotation=0,mat=snow){snowDrifts.push({x,z,length,width,height,rotation});const nx=26,nz=10,p=[],uv=[],idx=[];for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){const u=i/nx,v=j/nz,xx=(u-.5)*length,zz=(v-.5)*width;const crest=Math.sin(u*Math.PI)**.7;const cross=Math.pow(Math.sin(v*Math.PI),v<.47?1.3:3);const wiggle=Math.sin(u*9)*.1;let a=xx*Math.cos(rotation)-(zz+wiggle)*Math.sin(rotation),b=xx*Math.sin(rotation)+(zz+wiggle)*Math.cos(rotation);p.push(x+a,snowHeight(x+a,z+b)+height*crest*cross*snowClearance(x+a,z+b),z+b);uv.push(u*length/2,v*width/2);}for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){let a=j*(nx+1)+i,b=a+nx+1;idx.push(a,b,a+1,b,b+1,a+1);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return mesh(g,mat);}
function walkSnow(x,z){let h=snowHeight(x,z),extra=0;for(const d of snowDrifts){const c=Math.cos(d.rotation),s=Math.sin(d.rotation),dx=x-d.x,dz=z-d.z,u=(dx*c+dz*s)/d.length+.5;if(u<0||u>1)continue;const v=(-dx*s+dz*c-Math.sin(u*9)*.1)/d.width+.5;if(v<0||v>1)continue;extra=Math.max(extra,d.height*Math.sin(u*Math.PI)**.7*Math.pow(Math.sin(v*Math.PI),v<.47?1.3:3));}return h+extra*snowClearance(x,z);}
for(let i=0;i<105;i++){let x=range(-23,23),z=range(-18,22);if(Math.abs(x)<4.1&&z>-4.6&&z<8.2)continue;let near=Math.hypot(x,z)<13;drift(x,z,range(2.1,6.2),range(.22,.7),near?range(.07,.2):range(.13,.35),range(-.25,.05));}
drift(-4.4,1,9,1.8,.64,Math.PI/2-.07);drift(4.1,-1.8,8,1.7,.55,Math.PI/2-.12);drift(0,-4.6,8.5,1.3,.5,.02);drift(-3,7.5,6,1.1,.31,-.12);
// Distant mountains are a silhouette, not a second exploration zone.
const ridgeVertices=[],ridgeColors=[],ridgeIndices=[],ridgeSegments=180;
for(let row=0;row<5;row++)for(let i=0;i<=ridgeSegments;i++){const a=i/ridgeSegments*Math.PI*2,peak=3.7+2.7*Math.sin(a*3+.8)+1.8*Math.sin(a*9)+.9*Math.sin(a*23+2)+.5*Math.sin(a*47);const radius=[43,50,57,64,75][row]+Math.sin(a*11)*1.8;const h=[-.4,.3,.98,.36,-.6][row]*Math.max(1.3,peak);ridgeVertices.push(Math.sin(a)*radius,h,Math.cos(a)*radius);const k=.71+random()*.2;ridgeColors.push(k*.72,k*.85,k);}
for(let r=0;r<4;r++)for(let i=0;i<ridgeSegments;i++){const a=r*(ridgeSegments+1)+i,b=a+ridgeSegments+1;ridgeIndices.push(a,b,a+1,b,b+1,a+1);}
const ridgeGeo=new THREE.BufferGeometry();ridgeGeo.setAttribute('position',new THREE.Float32BufferAttribute(ridgeVertices,3));ridgeGeo.setAttribute('color',new THREE.Float32BufferAttribute(ridgeColors,3));ridgeGeo.setIndex(ridgeIndices);ridgeGeo.computeVertexNormals();const ridge=mesh(ridgeGeo,material(0xa2b9cf,1,0,{vertexColors:true}));ridge.castShadow=false;

// Building shell and full-height collision surfaces. Floor 0.28m above snow.
const floorY=.28,wallTop=2.98;
box(0,.13,-.2,6.65,.3,7.6,dark);
box(0,.26,-.2,6.4,.06,7.2,floorMat);
box(0,.13,4.68,2.2,.3,2.7,dark);box(0,.26,4.68,2.08,.06,2.7,floorMat);
function wallBox(x,y,z,w,h,d,outerMat=exterior){box(x,y,z,w,h,d,outerMat,y-h/2<2.0);}
wallBox(0,1.62,-3.86,6.65,2.73,.2);
wallBox(-3.22,1.62,-.22,.2,2.73,7.48,orange);
// Right wall has two genuinely open window apertures.
wallBox(3.22,.8,-.22,.2,1.03,7.48,orange);wallBox(3.22,2.74,-.22,.2,.5,7.48,orange);
for(const [z,d] of [[-3.44,.64],[-.79,.58],[2.32,2.45]])wallBox(3.22,1.94,z,.2,1.31,d,orange);
// Main room / vestibule opening is 1.62m wide.
wallBox(-2.06,1.62,3.48,2.34,2.73,.2);wallBox(2.06,1.62,3.48,2.34,2.73,.2);wallBox(0,2.81,3.48,1.82,.34,.2);
wallBox(-1.11,1.62,4.7,.18,2.73,2.55,orange);wallBox(1.11,1.62,4.7,.18,2.73,2.55,orange);
wallBox(-.985,1.62,5.97,.25,2.73,.2);wallBox(.985,1.62,5.97,.25,2.73,.2);wallBox(0,2.83,5.97,1.85,.3,.2);
// Inner panels: shallow relief, visible gasket channels and riveted trims.
function panel(x,y,z,w,h,rot=0){const m=box(x,y,z,w-.023,h-.018,.028,interior);m.rotation.y=rot;}
const panelRows=[[.75,.72],[1.47,.72],[2.19,.72],[2.77,.44]];
for(const [y,h]of panelRows){for(let x=-2.62;x<3;x+=1.05)panel(x,y,-3.738,1.05,h);for(let z=-3.18;z<3.3;z+=.96)panel(-3.106,y,z,.96,h,Math.PI/2);}
for(const [x,w] of [[-2.12,2.12],[2.12,2.12]]){for(const [y,h]of panelRows)for(let k=-.5;k<=.5;k++)panel(x+k*w/2,y,3.364,w/2,h);}
for(let z=-3.21;z<3.25;z+=.9){panel(3.105,.8,z,.9,1.01,-Math.PI/2);panel(3.105,2.75,z,.9,.42,-Math.PI/2);}
for(const [z,d]of [[-3.44,.64],[-.79,.58],[2.32,2.45]]){const pieces=Math.ceil(d/.85);for(let i=0;i<pieces;i++)panel(3.105,1.94,z-d/2+d/pieces*(i+.5),d/pieces,1.30,-Math.PI/2);}
for(let z=3.85;z<5.95;z+=.65)for(const [y,h]of panelRows){panel(-1.008,y,z,.65,h,Math.PI/2);panel(1.008,y,z,.65,h,-Math.PI/2);}
// Ceiling and outside standing-seam roof.
box(0,2.98,-.15,6.42,.13,7.35,interior);box(0,3.095,-.15,6.98,.12,7.98,dark);
box(0,2.97,4.64,2.28,.12,2.75,interior);box(0,3.08,4.65,2.6,.1,3.05,dark);
for(let x=-3.25;x<=3.3;x+=.52){box(x,3.177,-.15,.025,.055,7.94,steel);box(x,2.906,-.15,.035,.035,7.2,trim);}
for(let z=-3.72;z<=3.4;z+=1.42)box(0,2.9,z,6.2,.05,.065,trim);
for(let z=-3.7;z<=3.4;z+=.95){box(-3.338,1.63,z,.035,2.8,.05,dark);box(3.338,1.63,z,.035,2.8,.05,dark);for(let y=.46;y<3;y+=.62){bolts.push([-3.36,y,z,0,0,Math.PI/2],[3.36,y,z,0,0,Math.PI/2]);}}
for(let x=-3.05;x<3.2;x+=.5){box(x,1.66,-3.975,.04,2.72,.02,trim);bolts.push([x,.45,-3.991,Math.PI/2,0,0],[x,2.8,-3.991,Math.PI/2,0,0]);}
for(let x=-3.24;x<=3.25;x+=.54)for(const z of [3.62,-3.98])bolts.push([x,3.10,z,0,0,0]);
// Roof snow cap has a sculpted uneven edge and a wind-stripped centre.
function roofDrift(cx,cz,w,d,base){const g=new THREE.PlaneGeometry(w,d,44,36);g.rotateX(-Math.PI/2);const a=g.attributes.position;for(let i=0;i<a.count;i++){const x=a.getX(i),z=a.getZ(i);const edge=Math.sin((x/w+.5)*Math.PI)*Math.sin((z/d+.5)*Math.PI);a.setY(i,.035+edge*(.12+.045*Math.sin(x*2-z))+.012*Math.sin(z*3+x*2));}g.computeVertexNormals();const m=mesh(g,roofSnow,cx,base,cz);m.castShadow=true;}
roofDrift(0,-.15,6.96,7.94,3.17);roofDrift(0,4.65,2.56,3,3.14);
for(let i=0;i<12;i++){let x=-3.4+i*.59;ball(x,3.207+Math.sin(i*.7)*.012,3.8,.39,.036,.068,roofSnow);}
// Restrained icicles at the shaded roof corner, varied sizes.
const iceMat=new THREE.MeshPhysicalMaterial({color:0xb6d6e9,roughness:.12,metalness:.06,transparent:true,opacity:.63});
for(let i=0;i<11;i++){const h=range(.065,.23);const m=mesh(new THREE.ConeGeometry(.012,h,5),iceMat,-3.35+i*.095,3.15-h/2,3.82);m.rotation.z=Math.PI;}
// Base skids, exposed fixings, external power and ventilation.
for(const x of [-2.4,2.4]){box(x,-.005,-.2,.18,.2,8.1,steel);for(const z of [-3,2.8])box(x,.08,z,.46,.12,.42,dark);}
box(-3.4,.69,-2.8,.28,.45,.8,dark);cyl(-3.52,.75,-2.8,.12,.25,steel,[0,0,Math.PI/2]);
curve([[-3.36,.9,-2.8],[-3.55,.94,-2.4],[-3.5,.6,-.7],[-3.42,.5,2.8]],.023,rubber);
box(-3.38,2.35,.75,.17,.48,.64,steel);for(let y=2.18;y<2.57;y+=.065)box(-3.482,y,.75,.022,.022,.56,dark);
bar([-3.48,.16,-3.35],[-3.48,3.96,-3.35],.025,steel);bar([-3.8,3.72,-3.35],[-3.18,3.72,-3.35],.013,steel);bar([-3.78,3.89,-3.35],[-3.18,3.89,-3.35],.013,steel);
// Snow-bank fencing defines the sheltered patch without sealing the walking route.
for(let i=0;i<8;i++){let x=-8.4+i*.68;bar([x,0,7.6],[x,.9,7.6],.045,wood);box(x,.42,7.6,.52,.55,.055,wood);}bar([-8.8,.77,7.57],[-3.3,.77,7.57],.025,steel);
bar([-8.7,.15,7.6],[-9.4,.5,6.8],.025,steel);

// Doorway assembly, warm visible vestibule and continuous shallow access ramp.
function doorway(z,width,height=2.42){const mat=steel;box(-width/2-.05,1.48,z,.10,height,.22,mat);box(width/2+.05,1.48,z,.10,height,.22,mat);box(0,height+.28,z,width+.2,.10,.22,mat);for(const x of [-width/2-.022,width/2+.022])box(x,1.48,z+.12,.018,height,.018,rubber);for(const x of [-width/2-.047,width/2+.047])for(let y=.38;y<2.9;y+=.37)bolts.push([x,y,z+.121,Math.PI/2,0,0]);}
doorway(6.02,1.7);doorway(3.48,1.72);
box(0,.294,5.98,1.74,.03,.28,steel);box(0,.294,3.48,1.74,.03,.20,steel);
// Door is held fully open on the left; its collision matches its parked leaf.
box(-1.02,1.46,6.79,.12,2.32,1.5,orange,true);box(-.942,1.46,6.79,.04,2.12,1.30,interior);box(-.917,1.45,7.22,.04,.22,.08,rubber);bar([-.9,1.36,7.18],[-.9,1.58,7.18],.021,steel);
for(let y of [.65,2.26])cyl(-1.01,y,6.02,.06,.16,steel);
box(-.9,.35,6.04,.11,.08,.27,rubber);
// Ramp top rises to floor level over 1.65m, with a grippy perforated surface.
const ramp=box(0,.14,6.84,1.78,.06,1.68,floorMat);ramp.rotation.x=.153;
for(const x of [-.94,.94]){bar([x,.025,7.7],[x,.285,5.96],.027,steel);}
for(let z=6.15;z<7.55;z+=.15){const y=.28-(z-6.0)*.156;box(0,y+.03,z,1.75,.015,.017,steel);}
box(.84,.79,4.71,.30,.07,1.02,wood,true);bar([.85,.3,4.3],[.85,.76,4.3],.022,dark);bar([.85,.3,5.1],[.85,.76,5.1],.022,dark);
box(-.95,1.98,4.46,.06,.17,1.02,wood);for(let z=4.1;z<4.9;z+=.27){bar([-.91,2.0,z],[-.82,1.96,z],.02,steel);ball(-.815,1.96,z,.026,.026,.026,steel);}
// A quilted expedition parka on the vestibule peg.
const parka=material(0xbf7e35,.98,0,{map:repeat(noiseTexture('#c4975b','fabric'),2)});
ball(-.78,1.55,4.19,.14,.39,.24,parka);ball(-.79,1.93,4.19,.16,.17,.19,parka);ball(-.625,1.95,4.19,.012,.107,.12,rubber);bar([-.81,1.78,4.0],[-.83,1.32,3.91],.075,parka);bar([-.81,1.78,4.4],[-.83,1.32,4.49],.075,parka);const parkaThread=material(0x956d3f,.98);for(let y=1.29;y<1.84;y+=.095)box(-.64,y,4.19,.004,.004,.33,parkaThread);bar([-.636,1.22,4.19],[-.636,1.83,4.19],.006,rubber);for(const z of [3.91,4.49])cyl(-.83,1.315,z,.071,.04,rubber);
box(.77,.36,4.78,.30,.1,.6,rubber);for(const z of [4.58,4.86]){ball(.77,.4,z,.11,.08,.16,rubber);cyl(.77,.55,z-.035,.085,.26,blueFabric);}
box(0,.311,4.75,1.05,.02,1.24,material(0x554d3c,.99,0));

// Window frames, gaskets and frost accumulate at their cold edges.
const frostTexture=canvasTexture(256,256,(c,w,h)=>{c.clearRect(0,0,w,h);for(let i=0;i<8000;i++){let x=random()*w,y=random()*h;let edge=Math.min(x,y,w-x,h-y);if(random()<Math.exp(-edge/10)){c.fillStyle=`rgba(224,242,251,${range(.14,.5)})`;c.fillRect(x,y,range(.7,3),range(.5,2));}}for(let i=0;i<80;i++){let x=random()*w,y=random()>.5?range(0,12):range(h-12,h);c.strokeStyle='#e5f5ff60';c.beginPath();c.moveTo(x,y);c.lineTo(x+range(-5,5),y+range(-6,6));c.stroke();}});
const frostMat=new THREE.MeshBasicMaterial({map:frostTexture,transparent:true,opacity:.75,depthWrite:false,side:THREE.DoubleSide});
function windowRight(z,w){const y=1.93,h=1.17;for(const xx of [3.08,3.35]){for(const zz of [z-w/2,z+w/2])box(xx,y,zz,.14,h+.17,.075,steel);for(const yy of [y-h/2,y+h/2])box(xx,yy,z,.14,.075,w+.09,steel);}
box(3.2,y,z,.028,h,w,rubber).visible=false;let pane=mesh(new THREE.PlaneGeometry(w,h),glass,3.24,y,z);pane.rotation.y=Math.PI/2;let f=mesh(new THREE.PlaneGeometry(w,h),frostMat,3.26,y,z);f.rotation.y=Math.PI/2;pane.castShadow=f.castShadow=false;box(3.055,y-h/2-.045,z,.25,.08,w+.22,wood);}
windowRight(-2.08,1.96);windowRight(.26,1.66);
// Actual wall collision spans the glass too.
collide(3.22,-.2,.22,7.6);

function label(text,w,h,x,y,z,rotation=0,bg='#d6d4bf',fg='#2e4144',font='bold'){const tex=canvasTexture(512,Math.max(64,512*h/w),(c,cw,ch)=>{c.fillStyle=bg;c.fillRect(0,0,cw,ch);c.strokeStyle=fg+'66';c.lineWidth=2;c.strokeRect(10,10,cw-20,ch-20);c.fillStyle=fg;c.textAlign='center';c.textBaseline='middle';c.font=`${font} ${Math.min(ch*.45,cw/text.length*1.5)}px Arial`;c.fillText(text,cw/2,ch/2);});const m=mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:tex,roughness:.8}),x,y,z);m.rotation.y=rotation;m.castShadow=false;return m;}
label('BOREAL  /  07',1.26,.25,0,2.76,6.145,0,'#283d47','#ede8d2');
label('FIELD RESEARCH SHELTER',1.75,.18,2.02,2.45,3.599,0,'#bcc9ca','#344951');
label('AUTHORIZED FIELD TEAM',1.47,.14,2.04,2.21,3.599,0,'#bac6c7','#344951');
label('REMOVE SNOW FROM BOOTS',.82,.15,-.977,2.38,4.73,Math.PI/2,'#d5cbac','#474b44');
label('07',.32,.33,-.94,2.13,6.86,Math.PI/2,'#b3653a','#f4ddb3');

// Warm practical ceiling fixtures with metal cages and fluorescent diffusers.
function ceilingLamp(x,z,width){box(x,2.843,z,width,.095,.20,dark);box(x,2.783,z,width-.09,.038,.135,glow);for(const dx of [-width/2,width/2])box(x+dx,2.775,z,.025,.07,.22,steel);for(let dx=-width/2+.1;dx<width/2;dx+=.28)box(x+dx,2.755,z,.009,.025,.18,steel);}
ceilingLamp(0,-.65,1.46);ceilingLamp(0,4.75,.6);
spot(0,2.72,-.8,0,.3,-.9,32,1.18);point(0,2.35,-.3,0xffcf91,15,6.5);point(0,2.38,4.63,0xffbf71,11,4.6);
box(.75,2.51,6.1,.28,.12,.13,dark);box(.75,2.455,6.14,.21,.045,.16,glow);spot(.75,2.43,6.17,0,.1,7.5,8,.86);
// Wiring is surface-mounted, with bends and clips.
curve([[0,2.9,-.65],[0,2.9,-3.57],[-2.78,2.9,-3.57],[-2.78,2.4,-3.57]],.018,trim);
curve([[0,2.9,4.75],[0,2.9,3.35],[1.55,2.87,3.35],[1.55,2.1,3.35]],.012,trim);
for(let z=-3.5;z<0;z+=.5)box(0,2.87,z,.055,.015,.06,steel);
box(1.55,2.1,3.337,.16,.19,.04,dark);label('POWER',.11,.032,1.55,2.12,3.309,Math.PI,'#33454b','#dfd7b6');

// Research workbench, drawers and working equipment.
box(-.05,1.1,-3.03,5.43,.095,1.14,wood,true);box(-.05,1.02,-2.48,5.48,.09,.05,steel);
for(const x of [-2.51,2.41]){box(x,.68,-3.04,.065,.79,1,dark);box(x,.31,-3.04,.18,.06,1.12,rubber);}
box(1.73,.66,-3.09,1.22,.72,.94,cabinet);for(let y of [.43,.67,.9]){box(1.73,y,-2.595,1.15,.19,.035,cabinet);bar([1.56,y+.02,-2.564],[1.9,y+.02,-2.564],.016,steel);for(let x of [1.2,2.26])bolts.push([x,y,-2.56,Math.PI/2,0,0]);}
box(-1.88,.54,-3.06,1.08,.35,.95,dark);label('CORE SAMPLES · A',.64,.095,-1.88,.57,-2.566,0,'#c6c2a8','#304346');
for(let x=-2.9;x<2.9;x+=.56)box(x,1.125,-3.575,.015,.018,.024,dark);
// Contact-darkening is inexpensive baked geometry under grounded objects.
const aoTex=canvasTexture(128,128,(c,w,h)=>{const gr=c.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);gr.addColorStop(0,'rgba(13,18,16,.46)');gr.addColorStop(.6,'rgba(13,18,16,.25)');gr.addColorStop(1,'rgba(13,18,16,0)');c.fillStyle=gr;c.fillRect(0,0,w,h);});const aoMat=new THREE.MeshBasicMaterial({map:aoTex,transparent:true,depthWrite:false});
function ao(x,y,z,w,d){const m=mesh(new THREE.PlaneGeometry(w,d),aoMat,x,y,z);m.rotation.x=-Math.PI/2;m.castShadow=m.receiveShadow=false;}
ao(-.05,.3,-3.02,5.8,1.6);
// Rugged data terminal. Display is an original raster, not a remote interface.
const terminalTex=canvasTexture(512,320,(c,w,h)=>{c.fillStyle='#152e2e';c.fillRect(0,0,w,h);c.fillStyle='#89c6b5';c.font='18px monospace';c.fillText('BOREAL / CORE LOGGER',25,34);c.fillStyle='#507f72';c.fillRect(25,49,462,2);c.font='12px monospace';c.fillStyle='#bed7be';c.fillText('SITE 07   /   RECORD 0184',25,78);c.fillText('ICE TEMP   -18.42 C',25,110);c.fillText('DEPTH      042.60 M',25,136);c.fillText('STATUS     STORED',25,162);c.strokeStyle='#77b296';c.lineWidth=2;c.beginPath();for(let x=25;x<490;x+=3){let y=235+Math.sin(x*.045)*12+Math.sin(x*.14)*5;x===25?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();c.strokeStyle='#58918044';for(let x=25;x<480;x+=30){c.beginPath();c.moveTo(x,194);c.lineTo(x,282);c.stroke();}c.font='10px monospace';c.fillStyle='#5b897e';c.fillText('LAST SYNC  17:42 UTC       BAT 96%',25,307);});
box(-1.93,1.43,-3.23,1.03,.62,.20,dark);box(-1.93,1.37,-3.11,.83,.42,.028,rubber);const screen=mesh(new THREE.PlaneGeometry(.79,.42),new THREE.MeshBasicMaterial({map:terminalTex}),-1.93,1.43,-3.108);screen.castShadow=false;box(-1.93,1.166,-3.14,.95,.027,.57,dark);for(let r=0;r<4;r++)for(let c=0;c<13;c++)box(-2.33+c*.064,1.189,-2.98+r*.067,.052,.011,.047,trim);box(-1.93,1.189,-2.70,.29,.01,.07,trim);label('B-07',.13,.04,-1.51,1.18,-2.697,0,'#354c50','#d8d4b8');
box(-2.57,1.38,-3.35,.21,.44,.28,cabinet);for(let y=1.23;y<1.58;y+=.07)box(-2.573,y,-3.201,.13,.024,.008,rubber);
// Microscope / optical measurement stand.
box(-.55,1.185,-3.08,.46,.08,.5,exterior);bar([-.68,1.23,-3.25],[-.68,1.74,-3.25],.045,steel);bar([-.68,1.69,-3.25],[-.47,1.83,-3.18],.055,dark);bar([-.47,1.83,-3.18],[-.42,1.78,-3.03],.064,exterior);bar([-.42,1.78,-3.03],[-.42,1.54,-3.03],.035,dark);cyl(-.42,1.51,-3.03,.038,.055,steel);box(-.49,1.39,-3.09,.3,.024,.26,dark);cyl(-.58,1.39,-3.09,.073,.023,steel);cyl(-.745,1.5,-3.23,.05,.056,rubber,[0,0,Math.PI/2]);
// Ice-core tray with translucent sections and etched bands.
box(.25,1.177,-2.89,.59,.06,.68,steel);for(let i=0;i<4;i++){let x=.045+i*.14;const core=cyl(x,1.25,-2.89,.045,.5,iceMat,[Math.PI/2,0,0]);for(let z=-3.09;z<-2.65;z+=.13)cyl(x,1.25,z,.046,.009,material(0xd4e3e8,.74),[Math.PI/2,0,0]);}
label('ICE CORE  /  42.6 m',.43,.055,.26,1.215,-2.542,0,'#d8d3b7','#3d504e');
// Test-tube rack and utility canisters.
box(.9,1.19,-3.23,.49,.07,.27,wood);for(let x=.73;x<1.1;x+=.12){cyl(x,1.33,-3.23,.026,.23,glass);cyl(x,1.453,-3.23,.03,.034,yellow);}
for(const [x,z] of [[2.21,-3.43],[2.0,-3.40]]){cyl(x,1.32,z,.08,.31,exterior);cyl(x,1.48,z,.08,.035,rubber);label('SAMPLE',.1,.05,x,1.32,z+.083,0,'#ddd6be','#415752');}
// Paper topography and field notebook on the front edge.
const mapTex=canvasTexture(512,384,(c,w,h)=>{c.fillStyle='#d0c9ad';c.fillRect(0,0,w,h);c.strokeStyle='#837f60';for(let k=0;k<26;k++){c.beginPath();for(let i=0;i<=100;i++){let a=i/100*Math.PI*2,r=30+k*6+Math.sin(a*3+k*.15)*12;let x=285+Math.cos(a)*r*1.2,y=180+Math.sin(a)*r*.65;i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}c.strokeStyle='#748f97';c.lineWidth=3;c.beginPath();c.moveTo(0,130);c.bezierCurveTo(260,10,170,290,510,355);c.stroke();c.strokeStyle='#465b52';c.lineWidth=1;for(let x=0;x<w;x+=64){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}for(let y=0;y<h;y+=64){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}c.fillStyle='#3c514d';c.font='bold 19px monospace';c.fillText('RIDGE TRANSECT / 07',16,29);c.font='12px monospace';c.fillText('1:25 000    FIELD COPY',16,h-18);c.fillStyle='#b45232';c.beginPath();c.arc(289,194,5,0,Math.PI*2);c.fill();});
const mapMat=material(0xffffff,.98,0,{map:mapTex});const tableMap=box(1.0,1.157,-2.76,.74,.004,.55,mapMat);tableMap.rotation.y=.15;
const noteTex=canvasTexture(256,256,(c,w,h)=>{c.fillStyle='#e8dec1';c.fillRect(0,0,w,h);c.strokeStyle='#96a3a180';for(let y=30;y<h;y+=17){c.beginPath();c.moveTo(15,y);c.lineTo(w-12,y);c.stroke();}c.fillStyle='#465a59';c.font='italic 13px Georgia';c.fillText('06 OCT / Field notes',21,28);for(let y=47;y<220;y+=17){c.beginPath();c.moveTo(25,y);for(let x=25;x<range(130,218);x+=4)c.lineTo(x,y+range(-2,2));c.stroke();}});const notebook=box(-.6,1.162,-2.62,.49,.018,.31,material(0xffffff,1,0,{map:noteTex}));notebook.rotation.y=-.15;bar([-.36,1.18,-2.5],[-.12,1.18,-2.58],.007,yellow);
// Enamel mug with dark drink and a real handle.
const mugMat=material(0xdad5bb,.25,.18);cyl(-1.20,1.247,-2.68,.071,.18,mugMat);cyl(-1.20,1.34,-2.68,.059,.002,material(0x332820,.21));const handle=mesh(new THREE.TorusGeometry(.053,.012,8,16),mugMat,-1.1,1.25,-2.68);handle.rotation.y=Math.PI/2;

// Wall shelf, maps and clipped notices, labelled sample storage.
box(-.06,2.32,-3.50,5.46,.052,.42,wood);for(const x of [-2.43,-.42,2.32]){bar([x,2.03,-3.65],[x,2.31,-3.29],.023,steel);}
for(let i=0;i<7;i++){const x=-2.22+i*.49;box(x,2.50,-3.5,.39,.31,.30,i%3?cabinet:exterior);label(['PIPETTES','FILTERS','FIELD KIT','GLOVES','SAMPLES','TOOLS','LOGS'][i],.31,.06,x,2.51,-3.345,0,'#d5d1ba','#394d4d');box(x,2.675,-3.5,.41,.032,.32,trim);}
const wallMap=mesh(new THREE.PlaneGeometry(1.04,.78),mapMat,.88,1.76,-3.716);wallMap.castShadow=false;for(let x of [.38,1.38])box(x,2.155,-3.69,.033,.033,.013,steel);
label('06 OCT  /  TRANSECT 04',.92,.10,.87,1.315,-3.703,0,'#d8d1b9','#41514a');
label('SHIFT LOG\n',.57,.13,-1.13,1.89,-3.714,0,'#dfd7bd','#43524a');
// Articulated task light: clamps, pivots and a softly illuminated metal shade.
box(1.69,1.20,-3.52,.17,.12,.12,dark);cyl(1.69,1.30,-3.52,.055,.025,steel);
bar([1.69,1.31,-3.52],[1.60,1.81,-3.43],.018,steel);bar([1.75,1.31,-3.52],[1.66,1.81,-3.43],.015,steel);
bar([1.63,1.81,-3.43],[1.34,1.90,-3.12],.018,steel);bar([1.65,1.76,-3.43],[1.35,1.85,-3.12],.015,steel);
for(const [x,y,z]of [[1.70,1.31,-3.52],[1.63,1.80,-3.43],[1.34,1.89,-3.12]])cyl(x,y,z,.035,.063,dark,[0,0,Math.PI/2]);
const taskShade=mesh(new THREE.ConeGeometry(.14,.19,20,1,true),cabinet,1.32,1.80,-3.08);taskShade.rotation.z=.21;cyl(1.3,1.716,-3.08,.11,.012,glow);point(1.3,1.66,-3.08,0xffc780,2.7,1.7);
// Left: a compact berth, stitched quilt, pillow and reading light.
box(-2.25,.56,-.2,1.38,.20,2.25,dark,true);for(const z of [-1.20,.80])for(const x of [-2.85,-1.68])box(x,.4,z,.055,.23,.055,steel);
box(-2.25,.715,-.2,1.31,.15,2.18,fabric);
const quiltTex=canvasTexture(512,512,(c,w,h)=>{c.fillStyle='#49646b';c.fillRect(0,0,w,h);for(let i=0;i<24000;i++){c.fillStyle=random()>.5?'#ffffff13':'#00182320';c.fillRect(random()*w,random()*h,1,2);}for(let k=0;k<=w;k+=64){c.strokeStyle='#9cabaa66';c.setLineDash([3,3]);c.lineWidth=1;c.beginPath();c.moveTo(k,0);c.lineTo(k,h);c.stroke();c.beginPath();c.moveTo(0,k);c.lineTo(w,k);c.stroke();}});
const quiltMat=material(0xffffff,.96,0,{map:quiltTex,bumpMap:quiltTex,bumpScale:.004});
const quiltGeo=new THREE.PlaneGeometry(1.35,1.72,24,28);quiltGeo.rotateX(-Math.PI/2);const qp=quiltGeo.attributes.position;for(let i=0;i<qp.count;i++){const x=qp.getX(i),z=qp.getZ(i);const drape=.068*THREE.MathUtils.smoothstep(Math.abs(x),.55,.675)+.045*THREE.MathUtils.smoothstep(z,.69,.86);qp.setY(i,.010*Math.sin(x*23+z*5)+.006*Math.cos(z*29)-drape);}quiltGeo.computeVertexNormals();mesh(quiltGeo,quiltMat,-2.25,.858,.05);ball(-2.25,.86,-1.02,.48,.12,.27,interior);
cyl(-2.25,.95,.66,.096,1.17,fabric,[0,0,Math.PI/2]);for(const x of [-2.835,-1.665]){const roll=mesh(new THREE.TorusGeometry(.063,.011,8,24),blueFabric,x,.95,.66);roll.rotation.y=Math.PI/2;}for(const x of [-2.58,-1.92]){const strap=mesh(new THREE.TorusGeometry(.098,.008,6,24),blueFabric,x,.95,.66);strap.rotation.y=Math.PI/2;}
box(-3.025,1.19,-1.03,.12,.13,.17,dark);bar([-3.02,1.24,-1.03],[-2.85,1.39,-1.03],.018,steel);const readShade=mesh(new THREE.ConeGeometry(.09,.13,16,1,true),dark,-2.82,1.40,-1.03);readShade.rotation.z=-.5;point(-2.76,1.32,-1.0,0xffbe72,2.5,1.4);
box(-2.32,.58,1.57,1.23,.57,.61,cabinet,true);box(-2.32,.90,1.57,1.3,.08,.66,wood);for(let x of [-2.76,-1.86]){box(x,.6,1.891,.028,.17,.03,steel);}label('PERSONAL / 02',.51,.08,-2.32,.7,1.894,0,'#d4ccb4','#46544c');
// Radio on the bedside cabinet, stacked books and insulated flask.
box(-2.51,1.07,1.55,.49,.25,.29,dark);for(let x=-2.68;x<-2.42;x+=.04)box(x,1.07,1.70,.017,.16,.012,trim);cyl(-2.36,1.06,1.71,.027,.024,steel,[Math.PI/2,0,0]);label('142.7',.19,.07,-2.41,1.13,1.705,0,'#152c2d','#93b9a3');bar([-2.69,1.19,1.56],[-2.63,1.68,1.53],.006,steel);
for(let i=0;i<3;i++)box(-1.99,.97+i*.035,1.59,.33,.033,.37,i%2?red:wood);cyl(-2.93,1.11,1.62,.075,.35,steel);cyl(-2.93,1.30,1.62,.077,.05,rubber);
// Right: food storage, a purposeful compact galley and stove.
box(2.57,.78,2.3,.93,.96,1.64,cabinet,true);box(2.57,1.3,2.3,1.00,.065,1.70,steel);for(let z of [1.9,2.65]){box(2.064,.77,z,.032,.85,.71,cabinet);bar([2.035,.78,z-.17],[2.035,.78,z+.17],.017,steel);}
box(2.50,1.36,2.71,.70,.06,.60,dark);for(const z of [2.53,2.91]){cyl(2.47,1.394,z,.14,.018,rubber);cyl(2.47,1.408,z,.11,.009,steel);}
const kettle=cyl(2.47,1.57,2.53,.135,.28,steel);ball(2.47,1.71,2.53,.13,.045,.13,steel);cyl(2.47,1.76,2.53,.025,.05,rubber);curve([[2.35,1.60,2.53],[2.32,1.86,2.53],[2.60,1.86,2.53],[2.59,1.60,2.53]],.018,rubber);bar([2.56,1.54,2.53],[2.72,1.67,2.53],.025,steel);
box(2.6,1.346,1.81,.44,.016,.46,wood);cyl(2.66,1.46,1.64,.08,.23,mugMat);box(3.048,1.85,2.25,.12,.81,1.68,cabinet);for(let z of [1.87,2.63])bar([2.97,1.83,z-.13],[2.97,1.83,z+.13],.016,steel);
label('DRY RATIONS',.60,.075,2.974,2.13,2.3,-Math.PI/2,'#ded4b9','#3b4d47');box(2.981,1.83,2.25,.014,.72,.012,dark);box(2.995,1.427,2.25,.035,.018,1.42,glow);point(2.88,1.42,2.25,0xffc57f,2.3,1.35);
const galleyHandle=mesh(new THREE.TorusGeometry(.057,.012,8,16),mugMat,2.75,1.46,1.64);galleyHandle.rotation.y=Math.PI/2;
// Heater: flue, glowing inspection glass, valves and wire guard.
box(2.56,.70,.82,.78,.79,.59,dark,true);box(2.148,.73,.82,.027,.43,.36,steel);box(2.128,.73,.82,.018,.32,.23,material(0x5e3018,.3,.3,{emissive:0xe46520,emissiveIntensity:.6}));for(let z=.72;z<.96;z+=.055)bar([2.109,.57,z],[2.109,.90,z],.008,dark);cyl(2.67,1.95,.82,.058,1.98,steel);cyl(2.67,2.88,.82,.11,.08,dark);point(2.13,.73,.83,0xff8c3b,1.8,1.8);cyl(2.133,.44,.99,.035,.036,steel,[0,0,Math.PI/2]);box(2.56,.315,.82,.90,.032,.79,steel);
cyl(2.67,3.43,.82,.08,.65,steel);cyl(2.67,3.79,.82,.16,.04,dark);for(const x of [2.57,2.77])bar([x,3.62,.82],[x,3.80,.82],.012,steel);cyl(2.67,3.14,.82,.17,.04,steel);
// Narrow sample cabinet beneath the back window.
box(2.63,.65,-1.03,.78,.68,.97,cabinet,true);box(2.63,1.02,-1.03,.84,.05,1.02,wood);label('COLD STORAGE',.57,.08,2.218,.67,-1.02,-Math.PI/2,'#d8d1b8','#3b514c');bar([2.199,.67,-1.22],[2.199,.67,-.85],.018,steel);
// Instrument cases by the door leave the middle circulation route wide open.
box(-2.62,.55,2.83,.87,.44,.75,orange,true);box(-2.62,.80,2.83,.93,.05,.8,dark);for(const x of [-2.88,-2.35])box(x,.63,3.22,.06,.12,.03,steel);bar([-2.79,.59,3.24],[-2.44,.59,3.24],.02,rubber);label('EXPEDITION / 07',.62,.075,-2.62,.42,3.221,0,'#d6c59e','#3e4e49');
// Extinguisher, first aid, coat hooks and small safety notices.
cyl(1.16,.86,3.27,.085,.46,red);ball(1.16,1.10,3.27,.08,.045,.08,red);box(1.16,1.17,3.27,.14,.04,.06,dark);curve([[1.21,1.16,3.27],[1.30,1.05,3.26],[1.29,.79,3.28]],.012,rubber);label('FIRE',.09,.06,1.16,.9,3.175,Math.PI,'#d5cbb1','#b24936');
box(-1.17,1.82,3.29,.39,.42,.17,exterior);label('+',.24,.26,-1.17,1.83,3.19,Math.PI,'#d6d7c5','#ab4a3c');
label('EXIT',.42,.15,0,2.72,3.36,Math.PI,'#314846','#d1d9bb');
label('WEATHER / 18:00 UTC',.74,.13,-1.96,2.2,3.357,Math.PI,'#dad0b6','#46534e');

// Stool: tucks under the bench without blocking the main inspection route.
cyl(.2,.82,-1.99,.28,.07,wood);for(let i=0;i<4;i++){let a=i*Math.PI/2+Math.PI/4;bar([.2+Math.cos(a)*.19,.80,-1.99+Math.sin(a)*.19],[.2+Math.cos(a)*.27,.31,-1.99+Math.sin(a)*.27],.022,steel);}const stoolRing=mesh(new THREE.TorusGeometry(.22,.013,6,24),steel,.2,.52,-1.99);stoolRing.rotation.x=Math.PI/2;collide(.2,-1.99,.46,.46);ao(.2,.302,-1.99,.8,.8);
// Bench and galley contact shadows, panel-base trims and floor seams.
ao(-2.25,.3,-.2,1.75,2.6);ao(2.57,.3,2.3,1.3,1.95);ao(2.56,.3,.82,1.2,1.1);
for(const x of [-3.08,3.08])box(x,.37,-.18,.052,.14,7.03,trim);box(0,.37,-3.70,6.20,.14,.047,trim);
for(let x=-2.4;x<=2.6;x+=1.3)box(x,.294,-.2,.008,.006,7.13,dark);for(let z=-2.4;z<=3.2;z+=1.4)box(0,.294,z,6.28,.006,.009,dark);
// Instanced exposed fasteners avoid hundreds of independent draw calls.
for(let z=-3.37;z<3.3;z+=.96)for(let y of [.4,1.1,1.82,2.54]){bolts.push([-3.082,y,z,0,0,Math.PI/2]);}
for(let x=-2.8;x<3;x+=1.05)for(let y of [.39,1.10,1.82,2.54])bolts.push([x,y,-3.711,Math.PI/2,0,0]);
// Boot marks in the sheltered entrance snow, subtle and partial.
const footprintTex=canvasTexture(64,128,(c,w,h)=>{c.clearRect(0,0,w,h);c.fillStyle='#42618035';c.beginPath();c.roundRect(10,7,44,112,18);c.fill();c.fillStyle='#edf5f950';for(let y=15;y<110;y+=11)c.fillRect(15,y,34,3);});const footprintMat=new THREE.MeshBasicMaterial({map:footprintTex,transparent:true,depthWrite:false,opacity:.58});
for(let i=0;i<14;i++){const z=7.85+i*.38,x=(i%2?.18:-.18)+Math.sin(i*.4)*.17;const m=mesh(new THREE.PlaneGeometry(.15,.30),footprintMat,x,snowHeight(x,z)+.006,z);m.rotation.x=-Math.PI/2;m.rotation.z=i%2?.12:-.12;m.castShadow=false;}
// Wind-polished glaze beside the tread path: faint scratches and a cool sheen.
const glazeTex=canvasTexture(256,256,(c,w,h)=>{c.fillStyle='#bed0dc';c.fillRect(0,0,w,h);for(let i=0;i<2400;i++){c.fillStyle=random()>.5?'#f1f8fb25':'#496b8912';c.fillRect(random()*w,random()*h,range(1,4),1);}c.strokeStyle='#e6f4f77a';c.lineWidth=1;for(let i=0;i<18;i++){let x=range(0,w),y=range(0,h);c.beginPath();c.moveTo(x,y);c.lineTo(x+range(10,40),y+range(-6,6));c.stroke();}});
const glazeMat=new THREE.MeshPhysicalMaterial({color:0xb9cedc,map:glazeTex,roughness:.23,metalness:.14,clearcoat:.82,clearcoatRoughness:.12,bumpMap:glazeTex,bumpScale:.003});
function icePatch(x,z,rx,rz){const verts=[x,walkSnow(x,z)+.008,z],uv=[.5,.5],indices=[];for(let i=0;i<=44;i++){const a=i/44*Math.PI*2,k=1+.065*Math.sin(a*5)+.035*Math.cos(a*11),xx=x+Math.cos(a)*rx*k,zz=z+Math.sin(a)*rz*k;verts.push(xx,walkSnow(xx,zz)+.007,zz);uv.push(.5+Math.cos(a)*.5,.5+Math.sin(a)*.5);if(i<44)indices.push(0,i+2,i+1);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();const m=mesh(g,glazeMat);m.castShadow=false;}
icePatch(2.12,7.75,.95,.34);icePatch(-1.78,6.77,.48,.29);
drift(7.6,8.8,5.8,.7,.22,-.15);drift(-6.7,9.1,4.4,.72,.29,-.11);

// Frost and weathering sit where cold air and panel seams meet.
const weatherTex=canvasTexture(512,512,(c,w,h)=>{c.clearRect(0,0,w,h);for(let i=0;i<130;i++){let x=range(0,w),y=range(h*.70,h);let g=c.createLinearGradient(0,y,0,h);g.addColorStop(0,'#edf6fa00');g.addColorStop(1,'#d7e9ed88');c.fillStyle=g;c.fillRect(x,y,range(1,11),h-y);}for(let i=0;i<11000;i++){let x=random()*w,y=random()*h;const edge=Math.min(x,w-x,y,h-y);if(random()<Math.exp(-edge/17)){c.fillStyle=random()>.25?'#e0eef242':'#5d402620';c.fillRect(x,y,range(.5,3),range(1,7));}}});
const weatherMat=new THREE.MeshStandardMaterial({map:weatherTex,transparent:true,depthWrite:false,roughness:.97,opacity:.65});
for(const x of [-3.328,3.328]){const p=mesh(new THREE.PlaneGeometry(7.46,2.65),weatherMat,x,1.63,-.2);p.rotation.y=x>0?Math.PI/2:-Math.PI/2;p.castShadow=false;}
// Exterior panel seam screws and a shallow protective corner trim.
for(const x of [-1.216,1.216]){for(let z=3.57;z<5.98;z+=.58){box(x,1.62,z,.021,2.55,.024,dark);for(let y of [.4,.99,1.7,2.4,2.81])bolts.push([x,y,z,0,0,Math.PI/2]);}}
for(const x of [-3.338,3.338])for(const z of [-3.78,3.4])box(x,1.64,z,.055,2.74,.10,steel);
for(const y of [.42,2.54])for(const z of [6.17,7.38])bolts.push([-.915,y,z,0,0,Math.PI/2]);
for(const z of [6.145,7.42])box(-.918,1.48,z,.012,2.20,.017,rubber);
// A low blue ice lip under the far bank and a pair of anchored cargo drums.
const iceOpaque=material(0x93b8cb,.28,.1,{bumpMap:repeat(snowBump.clone(),2),bumpScale:.02});
for(let i=0;i<8;i++){const m=mesh(new THREE.IcosahedronGeometry(1,1),iceOpaque,-7.8+i*.49,.08,2.7+Math.sin(i)*.22);m.scale.set(.51,.23,.39);m.rotation.set(0,random()*3,.15);}
for(const [x,z]of [[-4.2,3.1],[-4.7,2.8]]){cyl(x,.46,z,.26,.86,exterior);for(const y of [.12,.35,.70,.86])cyl(x,y,z,.267,.025,steel);cyl(x,.90,z,.252,.035,dark);collide(x,z,.54,.54);label('FUEL',.24,.10,x,.54,z+.266,0,'#c7ccbd','#465d61');}

// Merge immutable opaque geometry by material to keep close inspection responsive.
const boltGeo=new THREE.CylinderGeometry(.012,.012,.007,6);const boltBatch=new THREE.InstancedMesh(boltGeo,steel,bolts.length);const dummy=new THREE.Object3D();bolts.forEach((b,i)=>{dummy.position.set(b[0],b[1],b[2]);dummy.rotation.set(b[3],b[4],b[5]);dummy.updateMatrix();boltBatch.setMatrixAt(i,dummy.matrix);});boltBatch.castShadow=true;boltBatch.receiveShadow=true;scene.add(boltBatch);
// Transparent panes remain individual so their back-to-front order is correct.
const batches=new Map();
for(const m of [...scene.children]){if(!m.isMesh||m.isInstancedMesh||!m.visible||Array.isArray(m.material)||m.material.transparent||m.material.isShaderMaterial)continue;const key=m.material.uuid+'|'+m.castShadow+'|'+m.receiveShadow;let b=batches.get(key);if(!b){b={material:m.material,cast:m.castShadow,receive:m.receiveShadow,meshes:[]};batches.set(key,b);}b.meshes.push(m);}
for(const b of batches.values()){if(b.meshes.length<2)continue;const geometries=b.meshes.map(m=>{m.updateMatrix();let g=m.geometry.clone();if(g.index)g=g.toNonIndexed();g.applyMatrix4(m.matrix);return g;});const g=mergeGeometries(geometries,false);if(g){g.computeBoundingSphere();const m=new THREE.Mesh(g,b.material);m.castShadow=b.cast;m.receiveShadow=b.receive;scene.add(m);b.meshes.forEach(m=>scene.remove(m));}geometries.forEach(g=>g.dispose());}

// Controls and kinematic circle collision. Substeps prevent tunnelling at low fps.
const player={x:5.2,z:10.4,y:1.67,yaw:.55,pitch:-.035};
const initial={...player};let velocityX=0,velocityZ=0,started=false,locked=false,drag=false,lastX=0,lastY=0;
const keys=new Set();
function floorAt(x,z){if(Math.abs(x)<3.15&&z>=-3.76&&z<=3.58)return .295;if(Math.abs(x)<1.01&&z>=3.42&&z<=6.10)return .295;if(Math.abs(x)<.90&&z>6.1&&z<7.7)return Math.max(walkSnow(x,z),.295-(z-6.04)*.156);return walkSnow(x,z);}
function blocked(x,z){const r=.20;for(const b of colliders){const px=Math.max(b.x0,Math.min(x,b.x1)),pz=Math.max(b.z0,Math.min(z,b.z1));if((x-px)**2+(z-pz)**2<r*r)return true;}return Math.hypot(x,z)>23;}
function reset(){Object.assign(player,initial);player.y=floorAt(player.x,player.z)+1.64;velocityX=velocityZ=0;keys.clear();camera.position.set(player.x,player.y,player.z);camera.rotation.set(player.pitch,player.yaw,0);}
function fallbackLook(){const n=$('#notice');n.textContent='Cursor capture unavailable — drag to look, and use W A S D to walk.';n.hidden=false;setTimeout(()=>n.hidden=true,5000);}
function begin(){started=true;document.body.classList.add('exploring');$('#controls').hidden=true;$('#welcome').hidden=true;try{if(!renderer.domElement.requestPointerLock){fallbackLook();return;}const capture=renderer.domElement.requestPointerLock();capture?.catch(fallbackLook);}catch{fallbackLook();}}
$('#enter').onclick=begin;$('#resume').onclick=begin;$('#reset').onclick=reset;
$('#help').onclick=()=>{document.exitPointerLock?.();$('#controls').hidden=!$('#controls').hidden;};
const showMetrics=()=>$('#metrics').hidden=!$('#metrics').hidden;$('#metricsToggle').onclick=showMetrics;
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===renderer.domElement;keys.clear();if(started&&!locked){$('#controls').hidden=false;}else if(locked){$('#controls').hidden=true;}});
document.addEventListener('pointerlockerror',fallbackLook);
renderer.domElement.addEventListener('pointerdown',e=>{if(!started)return;drag=true;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId);});
renderer.domElement.addEventListener('pointerup',()=>drag=false);
document.addEventListener('mousemove',e=>{if(!started||$('#controls').hidden===false)return;if(locked){player.yaw-=e.movementX*.0018;player.pitch-=e.movementY*.0018;}else if(drag){player.yaw-=(e.clientX-lastX)*.004;player.pitch-=(e.clientY-lastY)*.004;lastX=e.clientX;lastY=e.clientY;}player.pitch=THREE.MathUtils.clamp(player.pitch,-1.35,1.35);});
document.addEventListener('keydown',e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code)){keys.add(e.code);e.preventDefault();}if(e.code==='KeyR')reset();if(e.code==='KeyP')showMetrics();if(e.code==='Escape'&&started){keys.clear();document.exitPointerLock?.();$('#controls').hidden=false;}});
document.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>{keys.clear();velocityX=velocityZ=0;});
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));});
reset();
let last=performance.now(),uiTime=0,elapsed=0,frames=[],fullSamples=[],frameCount=0;
const spark=$('#sparkline'),ctx=spark.getContext('2d');
function percentile(a,p){if(!a.length)return 0;const sorted=[...a].sort((a,b)=>a-b);return sorted[Math.min(sorted.length-1,Math.floor(sorted.length*p))];}
function metrics(){const s=frames.map(f=>f.dt);const avg=s.reduce((a,b)=>a+b,0)/(s.length||1);$('#fps').textContent=`${(1000/avg).toFixed(0)} fps`;$('#timing').innerHTML=`Median ${percentile(s,.5).toFixed(1)} ms &nbsp; · &nbsp; p95 ${percentile(s,.95).toFixed(1)} ms<br>${renderer.info.render.calls} draw calls &nbsp; · &nbsp; ${(renderer.info.render.triangles/1000).toFixed(0)}k triangles`;ctx.clearRect(0,0,240,48);ctx.strokeStyle='#9fbcd522';ctx.beginPath();ctx.moveTo(0,24);ctx.lineTo(240,24);ctx.stroke();ctx.strokeStyle='#e5bd7d';ctx.lineWidth=1;ctx.beginPath();let data=s.slice(-240);data.forEach((n,i)=>{let y=48-Math.min(48,n*.72);i?ctx.lineTo(i,y):ctx.moveTo(i,y)});ctx.stroke();}
function move(dt){if(!started||!$('#controls').hidden)return;let f=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0);let side=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);const len=Math.hypot(f,side)||1;f/=len;side/=len;const speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?2.65:1.75;const tx=(-Math.sin(player.yaw)*f+Math.cos(player.yaw)*side)*speed,tz=(-Math.cos(player.yaw)*f-Math.sin(player.yaw)*side)*speed;const ease=1-Math.exp(-dt*15);velocityX+=(tx-velocityX)*ease;velocityZ+=(tz-velocityZ)*ease;const steps=Math.max(1,Math.ceil(Math.hypot(velocityX,velocityZ)*dt/.065));for(let i=0;i<steps;i++){let nx=player.x+velocityX*dt/steps,nz=player.z+velocityZ*dt/steps;if(!blocked(nx,player.z))player.x=nx;else velocityX=0;if(!blocked(player.x,nz))player.z=nz;else velocityZ=0;}const targetY=floorAt(player.x,player.z)+1.64;player.y+=(targetY-player.y)*(1-Math.exp(-dt*22));camera.position.set(player.x,player.y,player.z);camera.rotation.set(player.pitch,player.yaw,0);}
function animate(now){requestAnimationFrame(animate);const ms=now-last;last=now;const dt=Math.min(ms/1000,.055);elapsed+=dt;move(dt);renderer.render(scene,camera);frameCount++;if(frameCount===3){renderer.shadowMap.autoUpdate=false;$('#loading').hidden=true;}if(frameCount>3&&ms>0){frames.push({t:now,dt:ms});while(frames.length&&now-frames[0].t>10000)frames.shift();if(fullSamples.length<60000)fullSamples.push(ms);}uiTime+=dt;if(uiTime>.5){uiTime=0;metrics();const place=player.z<3.5&&Math.abs(player.x)<3.2?'RESEARCH WORKSPACE':player.z<6.1&&player.z>3.4&&Math.abs(player.x)<1.15?'ENTRY VESTIBULE':'SHELTERED SNOW';$('#place').textContent=place;}}
$('#loading p').textContent='Warming the materials…';
const preparedTextures=new Set();scene.traverse(m=>{if(!m.material)return;for(const mat of Array.isArray(m.material)?m.material:[m.material])for(const key of ['map','bumpMap','roughnessMap','normalMap'])if(mat[key]&&!preparedTextures.has(mat[key])){renderer.initTexture(mat[key]);preparedTextures.add(mat[key]);}});
renderer.compileAsync(scene,camera).then(()=>{last=performance.now();requestAnimationFrame(animate);}).catch(e=>{$('#loading p').textContent='Unable to initialize WebGL. Please enable browser graphics acceleration.';console.error(e);});
// Public, read-only scene diagnostics plus explicit test setters for local QA.
window.boreal={version:'1.0',ready:()=>frameCount>3,getState:()=>({...player,started,locked,location:$('#place').textContent,colliders:colliders.length}),getMetrics:()=>{const s=frames.map(f=>f.dt);return {samples:s.length,medianMs:percentile(s,.5),p95Ms:percentile(s,.95),p99Ms:percentile(s,.99),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,allSamples:fullSamples.length,renderer:renderer.getContext().getParameter(renderer.getContext().RENDERER)};},floorAt,blocked,reset,setPose:(x,z,yaw,pitch=0)=>{player.x=x;player.z=z;player.y=floorAt(x,z)+1.64;player.yaw=yaw;player.pitch=pitch;camera.position.set(player.x,player.y,player.z);camera.rotation.set(pitch,yaw,0);},exportTiming:()=>({samples:fullSamples,metrics:window.boreal.getMetrics()})};
$('#exportTiming').onclick=()=>{const data={recordedAt:new Date().toISOString(),viewport:{width:innerWidth,height:innerHeight,pixelRatio:renderer.getPixelRatio()},units:'milliseconds between requestAnimationFrame callbacks; all intervals after ready, including long intervals; first 60000 samples',...window.boreal.exportTiming()};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='boreal-frame-times.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
