import * as THREE from '../node_modules/three/build/three.module.js';
import {blocked,movement} from './collision.js';

// A compact, self-contained workshop. All textures and objects are made locally.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb3c8c4);
scene.fog = new THREE.Fog(0xb3c8c4, 28, 58);
const camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, .05, 90);
const renderer = new THREE.WebGLRenderer({antialias:true, powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.querySelector('#scene').appendChild(renderer.domElement);

let seed = 91273;
function rand(){ seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
function range(a,b){ return a + (b-a)*rand(); }
function texture(kind, repeatX=1, repeatY=1){
  const c=document.createElement('canvas'); c.width=512; c.height=512; const x=c.getContext('2d');
  if(kind==='wood'){
    x.fillStyle='#9a7350'; x.fillRect(0,0,512,512);
    for(let i=0;i<460;i++){const y=rand()*512; x.strokeStyle=`rgba(${rand()>.5?'58,35,22':'225,186,129'},${range(.025,.12)})`; x.lineWidth=range(.4,3); x.beginPath(); x.moveTo(0,y); for(let p=0;p<=512;p+=32)x.lineTo(p,y+Math.sin(p/55+i)*range(1,4)); x.stroke();}
    for(let i=0;i<20;i++){x.fillStyle='rgba(66,43,28,.16)';x.beginPath();x.ellipse(rand()*512,rand()*512,range(4,15),range(1,3),0,0,7);x.fill();}
  } else if(kind==='plaster'){
    x.fillStyle='#c4c2ae'; x.fillRect(0,0,512,512);
    for(let i=0;i<9000;i++){let v=Math.floor(range(110,230));x.fillStyle=`rgba(${v},${v},${v-10},${range(.015,.07)})`;let s=range(1,7);x.fillRect(rand()*512,rand()*512,s,s);}
  } else if(kind==='brick'){
    x.fillStyle='#a89a87'; x.fillRect(0,0,512,512);
    const h=64,w=128;
    for(let row=0;row<8;row++) for(let col=-1;col<5;col++){
      const px=col*w+(row%2)*w/2, py=row*h; const v=range(-13,13);
      x.fillStyle=`rgb(${Math.round(145+v)},${Math.round(87+v*.75)},${Math.round(65+v*.6)})`;x.fillRect(px+3,py+3,w-6,h-6);
      for(let j=0;j<55;j++){x.fillStyle=`rgba(${rand()>.5?'245,192,139':'58,35,26'},${range(.025,.13)})`;x.fillRect(px+rand()*w,py+rand()*h,range(1,12),range(1,3));}
    }
  } else if(kind==='floor'){
    x.fillStyle='#aaa99a';x.fillRect(0,0,512,512);
    for(let i=0;i<12000;i++){let n=Math.floor(range(85,180));x.fillStyle=`rgba(${n},${n},${n-8},${range(.025,.13)})`;let s=range(1,4);x.fillRect(rand()*512,rand()*512,s,s);}
    x.strokeStyle='rgba(75,76,68,.18)';x.lineWidth=3;for(let i=0;i<=512;i+=128){x.beginPath();x.moveTo(i,0);x.lineTo(i,512);x.stroke();x.beginPath();x.moveTo(0,i);x.lineTo(512,i);x.stroke();}
  } else if(kind==='ceramic'){
    x.fillStyle='#f2f0e9';x.fillRect(0,0,512,512);
    for(let i=0;i<10000;i++){let n=Math.floor(range(105,240));x.fillStyle=`rgba(${n},${n-5},${n-12},${range(.015,.11)})`;let s=range(.5,2.5);x.fillRect(rand()*512,rand()*512,s,s);}
    for(let i=0;i<40;i++){let y=rand()*512;x.strokeStyle=`rgba(130,115,99,${range(.015,.045)})`;x.lineWidth=range(.4,1.5);x.beginPath();x.moveTo(0,y);x.bezierCurveTo(170,y+range(-3,3),340,y+range(-3,3),512,y);x.stroke();}
  } else if(kind==='stone'){
    x.fillStyle='#bcb29b';x.fillRect(0,0,512,512);
    for(let i=0;i<8000;i++){let n=Math.floor(range(100,220));x.fillStyle=`rgba(${n},${n-5},${n-15},${range(.025,.13)})`;let s=range(1,5);x.fillRect(rand()*512,rand()*512,s,s);}
    x.strokeStyle='rgba(84,75,61,.23)';x.lineWidth=4;for(let i=0;i<=512;i+=128){x.beginPath();x.moveTo(0,i);x.lineTo(512,i);x.stroke();}for(let row=0;row<4;row++){for(let j=-1;j<5;j++){x.beginPath();x.moveTo(j*128+(row%2)*64,row*128);x.lineTo(j*128+(row%2)*64,(row+1)*128);x.stroke();}}
  }
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeatX,repeatY);t.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());return t;
}
const woodTex=texture('wood',1,1), plasterTex=texture('plaster',2,1), brickTex=texture('brick',1,1), floorTex=texture('floor',3,3), stoneTex=texture('stone',3,3), ceramicTex=texture('ceramic',1,1);
brickTex.repeat.set(2,2);
const wallBrickTex=brickTex.clone();wallBrickTex.repeat.set(7,2);wallBrickTex.needsUpdate=true;
const mat=(color,roughness=1,extra={})=>new THREE.MeshStandardMaterial({color,roughness,...extra});
const M={
  plaster:mat(0xe2dfcf,1,{map:plasterTex}), wood:mat(0xc59a70,.9,{map:woodTex}), darkwood:mat(0x62432d,.95,{map:woodTex}),
  floor:mat(0xd4d0c1,1,{map:floorTex}), stone:mat(0xe5d6ba,1,{map:stoneTex}), brick:mat(0xd3b09b,1,{map:brickTex}), wallBrick:mat(0xd3b09b,1,{map:wallBrickTex}),
  metal:mat(0x444a46,.7,{metalness:.35}), black:mat(0x292f2d,.8,{metalness:.25}), iron:mat(0x3e3b35,.8,{metalness:.25}),
  cream:mat(0xd0c0a2,.95), clay:mat(0xb57556,.96,{map:ceramicTex}), clayLight:mat(0xd0a283,.96,{map:ceramicTex}), clayDark:mat(0x945d49,.98,{map:ceramicTex}),
  dust:mat(0xc7b49b,1), white:mat(0xebe7d5,.7), glazeBlue:mat(0x6e8a89,.24,{map:ceramicTex}), glazeGreen:mat(0x829584,.28,{map:ceramicTex}), glazeCream:mat(0xd7cbb5,.3,{map:ceramicTex}), glazeBrown:mat(0x76574b,.28,{map:ceramicTex}), glazeOchre:mat(0xb49565,.32,{map:ceramicTex}),
  leaf:mat(0x71856c,1), darkLeaf:mat(0x526c59,1), glass:mat(0x99b5af,.25,{transparent:true,opacity:.32,side:THREE.DoubleSide,depthWrite:false})
};
function mesh(geometry, material, x=0,y=0,z=0, shadow=false){const o=new THREE.Mesh(geometry,material);o.position.set(x,y,z);o.castShadow=shadow;o.receiveShadow=true;scene.add(o);return o;}
function box(x,y,z,w,h,d,m,shadow=false){return mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z,shadow);}
function cylinder(x,y,z,r1,r2,h,m,shadow=false,segments=16){return mesh(new THREE.CylinderGeometry(r1,r2,h,segments),m,x,y,z,shadow);}
function beamBetween(a,b,thick,m){const mid=new THREE.Vector3().addVectors(a,b).multiplyScalar(.5);const d=new THREE.Vector3().subVectors(b,a);const o=box(mid.x,mid.y,mid.z,thick,d.length(),thick,m);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;}
function label(text,w=256,h=96,fg='#554b3c',bg='#e8ddc5'){
 const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,w,h);g.strokeStyle='#aa9879';g.lineWidth=3;g.strokeRect(4,4,w-8,h-8);g.fillStyle=fg;g.textAlign='center';g.textBaseline='middle';g.font=`${Math.floor(h*.30)}px Georgia`;g.fillText(text,w/2,h/2);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshBasicMaterial({map:t});
}
function sign(text,x,y,z,w,h,rotY=0){const s=mesh(new THREE.PlaneGeometry(w,h),label(text),x,y,z);s.rotation.y=rotY;return s;}

// Lighting: warm sunlight reaches the courtyard; overhead fill keeps the pottery readable.
scene.add(new THREE.HemisphereLight(0xdbe6e0,0x746959,2.0));
const sun=new THREE.DirectionalLight(0xffe2b1,3.0);sun.position.set(-7,13,10);sun.target.position.set(0,0,5);scene.add(sun,sun.target);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:1,far:35});sun.shadow.bias=-.00035;sun.shadow.normalBias=.02;
const inside=new THREE.PointLight(0xd9e6df,35,13,2);inside.position.set(0,3.15,-1);scene.add(inside);
const glazingLight=new THREE.PointLight(0xe8e6d0,20,9,2);glazingLight.position.set(0,3,5.5);scene.add(glazingLight);

// Floors and shell. The studio opens into a shallower roofed glazing bay.
box(0,-.12,-1.5,10,.24,9,M.floor);box(0,-.12,5.5,10,.24,5,M.floor);box(0,-.12,11.5,10,.24,7,M.stone);
box(-5,1.85,-1.5,.22,3.7,9,M.plaster);
// Right-hand wall is built around two actual window openings.
for(const [za,zb] of [[-6,-5],[-3,-.6],[1.4,3]])box(5,1.85,(za+zb)/2,.22,3.7,zb-za,M.plaster);
for(const z of [-4,.4]){box(5,.74,z,.22,1.48,2,M.plaster);box(5,3.26,z,.22,.88,2,M.plaster);}
box(-3.45,1.85,-6,3.1,3.7,.22,M.plaster);box(3.45,1.85,-6,3.1,3.7,.22,M.plaster);box(0,3.25,-6,3.8,.9,.22,M.plaster);
box(0,3.72,-1.5,10.25,.18,9.2,M.darkwood);
// Open framed threshold at the rear of the main studio.
box(-3.7,1.8,3,2.6,3.6,.22,M.plaster);box(3.7,1.8,3,2.6,3.6,.22,M.plaster);box(0,3.32,3,4.8,.56,.22,M.plaster);
for(const x of [-2.45,2.45])box(x,1.65,3,.16,3.3,.24,M.darkwood);
box(0,3.05,3,5,.18,.28,M.darkwood);
// Roofed glazing area with an open passage to the yard.
box(-5,1.65,5.5,.22,3.3,5,M.plaster);box(5,1.65,5.5,.22,3.3,5,M.plaster);
box(0,3.37,5.5,10.25,.18,5.2,M.darkwood);
box(-3.8,1.6,8,2.4,3.2,.2,M.plaster);box(3.8,1.6,8,2.4,3.2,.2,M.plaster);box(0,3.05,8,5.2,.3,.2,M.darkwood);
for(const x of [-2.55,2.55])box(x,1.6,8,.16,3.2,.25,M.darkwood);
// Courtyard boundary, lower so the sky remains visible.
box(-5,1.0,11.5,.23,2,7,M.wallBrick);box(5,1.0,11.5,.23,2,7,M.wallBrick);box(0,1.0,15,10,2,.23,M.wallBrick);
box(-5,2.03,11.5,.36,.1,7.1,M.cream);box(5,2.03,11.5,.36,.1,7.1,M.cream);box(0,2.03,15,10.1,.1,.36,M.cream);
for(const z of [-5.8,-2.8,.3,3,5.5,8]){for(const x of [-4.86,4.86])box(x,1.85,z,.19,3.7,.19,M.darkwood);}
for(const z of [-5.6,-3,-.4,2.4,4,6.3,7.8])box(0,3.57,z,9.9,.17,.18,M.wood);
// High windows are framed as bright, translucent openings against the walls.
for(const z of [-4.0,.4]){
  box(4.865,2.15,z,.06,1.35,1.95,M.glass);for(const yy of [1.48,2.82])box(4.82,yy,z,.13,.1,2.05,M.darkwood);
  for(const zz of [z-1,z,z+1])box(4.82,2.15,zz,.13,1.4,.09,M.darkwood);
}
// Timber skirting and lintels give the spaces thickness.
for(const x of [-4.85,4.85]){box(x,.13,-1.5,.12,.26,8.8,M.darkwood);box(x,.13,5.5,.12,.26,4.8,M.darkwood);}
box(0,3.08,-5.88,3.85,.18,.25,M.darkwood);

// Work furniture, built from boards and joinery rather than solid blocks.
function table(x,z,w,d,h=0.83){
  box(x,h,z,w,.12,d,M.wood,true);
  for(const dx of [-w/2+.12,w/2-.12])for(const dz of [-d/2+.12,d/2-.12])box(x+dx,h/2,z+dz,.13,h,.13,M.darkwood,true);
  for(const dz of [-d/2+.12,d/2-.12])box(x,.33,z+dz,w-.2,.1,.1,M.darkwood);
  for(const dx of [-w/2+.12,w/2-.12])box(x+dx,.33,z,.1,.1,d-.2,M.darkwood);
  for(let i=1;i<3;i++)box(x,h+.061,z-d/2+d*i/3,w-.04,.002,.008,M.darkwood);
  return h+.06;
}
function shelf(x,z,w,d,levels=4){
 for(const dx of [-w/2+.06,w/2-.06])for(const dz of [-d/2+.06,d/2-.06])box(x+dx,1.2,z+dz,.1,2.4,.1,M.darkwood,true);
 for(let i=0;i<levels;i++)box(x,.18+i*.63,z,w,.09,d,M.wood,true);
}
table(0,-1.05,2.45,1.65,.85);
// The workbench lower shelf and a pale removable work board.
box(0,.31,-1.05,2.2,.08,1.35,M.wood);box(-.18,.93,-.98,1.35,.025,1.1,M.dust);
shelf(-4.46,-.15,.85,3.9,4);
shelf(4.45,-1.4,.85,3.3,4);
// Low storage against the front wall.
table(-3.45,-5.25,2.35,.8,.75);box(-3.45,.36,-5.25,2.2,.08,.7,M.wood);
// Glaze preparation bench is against the left wall, keeping the central passage open.
table(-3.75,5.48,2.0,1.15,.86);box(-3.75,.35,5.48,1.8,.08,1,M.wood);
shelf(4.43,5.46,.82,3.55,4);
// A clay wedging stool and a pedal wheel sit just off the route.
cylinder(3.05,.52,1.35,.42,.42,.11,M.wood,true,24);for(let a=0;a<3;a++){const q=a*Math.PI*2/3;beamBetween(new THREE.Vector3(3.05+Math.cos(q)*.25,.5,1.35+Math.sin(q)*.25),new THREE.Vector3(3.05+Math.cos(q)*.38,.05,1.35+Math.sin(q)*.38),.07,M.darkwood);}
cylinder(3.55,.72,-4.05,.56,.56,.13,M.cream,true,32);cylinder(3.55,.83,-4.05,.39,.39,.06,M.metal,true,32);cylinder(3.55,.87,-4.05,.25,.25,.035,M.dust,false,32);
for(let a=0;a<3;a++){const q=a*Math.PI*2/3;beamBetween(new THREE.Vector3(3.55+Math.cos(q)*.3,.68,-4.05+Math.sin(q)*.3),new THREE.Vector3(3.55+Math.cos(q)*.43,.04,-4.05+Math.sin(q)*.43),.07,M.metal);}

// Handmade vessels: unique lathed profiles with a small asymmetric deformation.
const contactShadows=[];
function pot(x,y,z,scale=1,type='jar',finish=M.clay,variant=0){
 let p;
 if(type==='bowl') p=[[.08,0],[.21,.025],[.33,.11],[.42,.22],[.45,.30],[.43,.31],[.40,.29],[.37,.23],[.29,.14],[.19,.075],[.07,.06],[0,.06]];
 else if(type==='cup') p=[[.12,0],[.20,.02],[.22,.12],[.23,.28],[.21,.34],[.18,.34],[.185,.30],[.18,.13],[.15,.06],[.07,.05],[0,.05]];
 else if(type==='vase') p=[[.12,0],[.22,.025],[.31,.12],[.34,.28],[.29,.43],[.20,.53],[.16,.66],[.19,.7],[.18,.73],[.14,.72],[.13,.67],[.16,.54],[.24,.42],[.27,.28],[.24,.14],[.16,.07],[0,.06]];
 else if(type==='plate') p=[[.06,0],[.24,.015],[.39,.035],[.49,.10],[.48,.12],[.44,.11],[.35,.08],[.19,.06],[0,.06]];
 else p=[[.12,0],[.25,.025],[.34,.12],[.36,.28],[.32,.41],[.24,.47],[.23,.53],[.27,.55],[.26,.58],[.21,.57],[.19,.52],[.20,.46],[.26,.39],[.29,.27],[.27,.14],[.18,.07],[0,.06]];
 const broad=range(.86,1.13), tall=range(.85,1.18);const points=p.map(([r,h])=>new THREE.Vector2(r*scale*broad,h*scale*tall));
 const geo=new THREE.LatheGeometry(points,20);const pos=geo.attributes.position;
 const phase=range(0,6.28);for(let i=0;i<pos.count;i++){const vx=pos.getX(i),vz=pos.getZ(i),vy=pos.getY(i),ang=Math.atan2(vz,vx);const wobble=1+.018*Math.sin(3*ang+phase)+.012*Math.sin(5*ang+vy*7+phase);pos.setXYZ(i,vx*wobble,vy+(vy>scale*.13?.004*scale*Math.sin(3*ang+phase):0),vz*wobble);}
 geo.computeVertexNormals();const o=mesh(geo,finish,x,y,z,true);o.rotation.y=range(0,6.28);
 contactShadows.push({x,y:y+.004,z,r:scale*(type==='plate'?.48:type==='bowl'?.38:.3)*broad});
 // A few pulled handles make the cups and storage jars distinct from the open forms.
 if(type==='cup' || (type==='jar' && variant%4===0)){
   const r=scale*(type==='cup'?.105:.13),tube=scale*.024;
   const handle=mesh(new THREE.TorusGeometry(r,tube,7,18),finish,x+scale*(type==='cup'?.21:.32)*broad,y+scale*(type==='cup'?.20:.30)*tall,z,true);
   handle.scale.set(1,type==='cup'?1.2:1.4,1);
 }
 return o;
}
const raw=[M.clay,M.clayLight,M.clayDark];const glazed=[M.glazeBlue,M.glazeGreen,M.glazeCream,M.glazeBrown,M.glazeOchre];
pot(-.77,.96,-1.22,.75,'jar',M.clay,0);pot(-.15,.96,-.86,.63,'bowl',M.clayLight,1);pot(.54,.96,-1.2,.78,'vase',M.clay,2);pot(.85,.96,-.6,.55,'cup',M.clayDark,3);
// Rows on the studio shelving alternate forms and finishes.
for(let level=0;level<4;level++)for(let j=0;j<5;j++){
 const z=-1.65+j*.75, type=['jar','bowl','vase','cup','plate'][(j+level*2)%5], material=level<2?raw[(j+level)%3]:glazed[(j*2+level)%5];
 pot(-4.45,.235+level*.63,z,range(.48,.68),type,material,j+level);
}
for(let level=0;level<4;level++)for(let j=0;j<4;j++){
 const z=-2.58+j*.78,type=['vase','jar','cup','bowl'][(j+level)%4];pot(4.44,.235+level*.63,z,range(.43,.62),type,level===0?raw[j%3]:glazed[(j+level)%5],j);
}
for(let j=0;j<3;j++)pot(-4.08+j*.64,.82,-5.25,.57,['bowl','jar','cup'][j],raw[j],j);
// Glazing shelf: sample pieces, jars and stacked bowls.
for(let level=0;level<4;level++)for(let j=0;j<4;j++)pot(4.43,.235+level*.63,4.25+j*.8,range(.4,.58),['cup','bowl','jar','vase'][(j+level)%4],glazed[(j+level*2)%5],j);

// Tools and works in progress, placed within reach of the workbench.
function rod(x,y,z,length,r,material,rotZ=0,rotX=0){const o=cylinder(x,y,z,r,r,length,material,false,10);o.rotation.z=rotZ;o.rotation.x=rotX;return o;}
// Rolling pin, small ribs, wire cutter and loop tools.
rod(-.2,.985,-1.6,.65,.035,M.darkwood,Math.PI/2);
box(.15,.982,-1.52,.27,.018,.12,M.cream).rotation.y=.35;
rod(.52,.98,-.54,.45,.018,M.darkwood,Math.PI/2+.45);
const loop=mesh(new THREE.TorusGeometry(.065,.008,6,20,Math.PI*1.8),M.metal,.75,1,-.43);loop.rotation.x=Math.PI/2;loop.rotation.z=.45;
rod(-.78,.985,-.5,.32,.015,M.wood,Math.PI/2-.6);
const sponge=box(-.6,.98,-1.67,.21,.045,.13,M.glazeOchre);sponge.rotation.y=-.2;
// A ruled note, a folded cloth, and a loose row of turning tools.
box(.73,.956,-1.62,.31,.008,.21,M.white).rotation.y=.12;
for(let j=0;j<3;j++)box(.73,.962,-1.68+j*.045,.22,.002,.004,M.darkwood).rotation.y=.12;
box(-1.0,.95,-.51,.30,.026,.22,mat(0xb5b6a5,1)).rotation.y=-.25;
// Clay offcuts and a few softly shaped lumps.
for(let i=0;i<7;i++){let o=mesh(new THREE.SphereGeometry(range(.045,.09),10,7),raw[i%3],range(-.6,.3),.98,range(-1.35,-.65),true);o.scale.set(range(1,1.5),.4,range(.7,1.2));}
for(let j=0;j<3;j++)box(-.7+j*.55,.39,-1.05,.42,.13,.38,M.clayDark,true);
// Brush jar, wooden brushes and a small enamel bowl at the glazing bench.
pot(-4.15,.94,5.22,.63,'cup',M.glazeCream,1);
for(let i=0;i<7;i++){const b=rod(-4.25+i*.035,1.22,5.2+range(-.06,.06),range(.37,.55),.012,M.darkwood,range(-.18,.18),range(-.2,.2));}
pot(-3.55,.94,5.52,.8,'bowl',M.glazeBlue,1);pot(-3.3,.94,5.13,.5,'cup',M.glazeBrown,2);
for(let i=0;i<4;i++){
 const x=-4.35+i*.39;cylinder(x,1.0,5.89,.14,.14,.14,[M.glazeCream,M.glazeBlue,M.glazeGreen,M.glazeOchre][i],true,20);
 cylinder(x,1.08,5.89,.145,.145,.025,M.cream,false,20);
}
// Labeled slips on the sample board suggest a working glaze library.
for(let i=0;i<6;i++)box(-4.76,1.51,4.45+i*.39,.012,.06,.22,M.cream);
// Sample tiles on the wall above the glazing bench.
box(-4.85,1.92,5.5,.08,.86,2.65,M.darkwood);
for(let i=0;i<6;i++)for(let j=0;j<2;j++){box(-4.795,1.7+j*.34,4.45+i*.39,.04,.25,.27,glazed[(i+j)%5]);}
sign('GLAZE TESTS',-4.75,2.48,5.5,1.05,.22,Math.PI/2);
// Bags, buckets and useful storage under the bench.
for(let i=0;i<3;i++){let b=box(-4.28+i*.48,.23,5.5,.38,.42,.43,M.cream,true);b.rotation.z=range(-.07,.07);}
cylinder(-2.95,.21,6.2,.25,.22,.42,M.metal,true,20);cylinder(-2.95,.43,6.2,.26,.26,.035,M.cream,false,20);
// Paper notes and a wall-mounted tool rack.
box(-4.84,2.25,-4,.05,.85,1.25,M.darkwood);
for(let j=0;j<5;j++){const zz=-4.48+j*.22;rod(-4.77,2.13,zz,.48,.012,M.cream,0,range(-.16,.16));}
sign('CLAY / TOOLS',-4.77,2.71,-4,1.0,.2,Math.PI/2);
// Pegs with aprons, a little domestic evidence of use.
box(4.83,2.35,2,.08,.1,1.25,M.darkwood);
for(const z of [1.6,2,2.4]){const p=cylinder(4.73,2.31,z,.035,.035,.2,M.wood);p.rotation.z=Math.PI/2;}
const apron=box(4.70,1.65,1.95,.025,.93,.62,mat(0x879089,1));apron.rotation.x=.03;
// Glazing area details: a sink with faucet and drip board.
box(3.4,.82,7.05,1.9,.12,.85,M.wood,true);box(3.4,.91,7.05,1.08,.12,.58,M.metal);
box(3.4,.98,7.05,.84,.045,.4,M.black);box(3.4,.995,7.05,.72,.025,.3,M.glazeBlue);
rod(3.82,1.16,7.35,.42,.025,M.metal);rod(3.7,1.37,7.35,.25,.025,M.metal,Math.PI/2);
for(const x of [2.62,4.18])for(const z of [6.75,7.35])box(x,.4,z,.1,.8,.1,M.darkwood);

// Courtyard kiln: brick body, plinth, arched iron firing door, bands and chimney.
box(1.9,.12,12.35,2.9,.24,2.9,M.brick,true);
box(1.9,1.18,12.35,2.55,2.0,2.45,M.brick,true);
box(1.9,2.23,12.35,2.72,.17,2.6,M.brick,true);
box(2.53,2.88,12.92,.8,1.25,.78,M.brick,true);box(2.53,3.52,12.92,.94,.14,.91,M.brick,true);
box(2.53,3.61,12.92,.74,.06,.72,M.black);
// An arch silhouette on the front face has a visible firebox depth.
function archShape(width,height){const s=new THREE.Shape();s.moveTo(-width/2,0);s.lineTo(width/2,0);s.lineTo(width/2,height-width/2);s.absarc(0,height-width/2,width/2,0,Math.PI,false);s.closePath();return s;}
const arch=mesh(new THREE.ExtrudeGeometry(archShape(1.17,1.49),{depth:.035,bevelEnabled:false,curveSegments:16}),M.black,1.9,.38,11.092,true);
const door=mesh(new THREE.ExtrudeGeometry(archShape(.94,1.29),{depth:.035,bevelEnabled:false,curveSegments:16}),M.iron,1.9,.46,11.043,true);
// Face trim and horizontal bands suggest a heavy, serviceable construction.
for(const x of [1.13,2.67])box(x,1.15,11.08,.13,1.62,.08,M.brick);
box(1.9,.36,11.04,1.48,.12,.18,M.brick);box(1.9,2.08,11.03,1.8,.15,.15,M.brick);
for(const y of [.72,1.12]){box(1.9,y,11.0,.9,.07,.06,M.black);for(const x of [1.53,2.27]){const bolt=cylinder(x,y,10.96,.035,.035,.025,M.cream,false,10);bolt.rotation.x=Math.PI/2;}}
for(const y of [.67,1.26]){box(1.39,y,10.98,.2,.1,.11,M.black);cylinder(1.31,y,10.96,.06,.06,.1,M.black);}
box(2.23,1.0,10.96,.28,.08,.07,M.black);cylinder(2.38,1.0,10.93,.07,.07,.04,M.metal).rotation.x=Math.PI/2;
// Spy hole, temperature gauge, and a narrow air control below the door.
cylinder(1.72,1.58,10.98,.07,.07,.055,M.black,false,16).rotation.x=Math.PI/2;
cylinder(2.72,1.67,11.07,.15,.15,.045,M.metal,false,24).rotation.x=Math.PI/2;
cylinder(2.72,1.67,11.035,.115,.115,.015,M.cream,false,24).rotation.x=Math.PI/2;
box(2.72,1.69,11.02,.012,.12,.012,M.black).rotation.z=-.55;
box(1.9,.26,10.94,.58,.08,.1,M.black);box(1.98,.26,10.87,.23,.035,.04,M.metal);
sign('KILN',1.9,2.39,11.07,.64,.21,Math.PI);
// A firing shelf and split firewood at the edge of the courtyard.
table(-3.58,12.3,1.6,.8,.68);for(let i=0;i<4;i++)pot(-4.12+i*.37,.75,12.3,.46,['bowl','cup','jar','bowl'][i],raw[i%3],i);
for(let i=0;i<6;i++){let log=cylinder(-3.95+(i%3)*.31,.14+Math.floor(i/3)*.22,13.35,.12,.12,.9,M.darkwood,true,8);log.rotation.x=Math.PI/2;}
box(-4.46,.3,13.35,.08,.6,1.15,M.darkwood);box(-3.2,.3,13.35,.08,.6,1.15,M.darkwood);
// Firing tools lean beside the kiln; a drain breaks up the courtyard paving.
for(let i=0;i<3;i++)rod(3.78+i*.13,.85,12.05,1.55,.025,M.metal,.12,range(-.08,.08));
box(3.78,.08,12.05,.2,.15,.12,M.black);
box(-.4,.008,13.75,.78,.016,.23,M.metal);
for(let i=0;i<7;i++)box(-.69+i*.095,.019,13.75,.03,.006,.19,M.black);
// A planted courtyard corner and a few individually shaped leaves.
cylinder(-4.28,.26,9.1,.27,.21,.52,M.clayDark,true,16);cylinder(-4.28,.53,9.1,.28,.28,.05,M.clayLight,false,16);
for(let i=0;i<14;i++){const a=i*2.4, len=range(.25,.5), leaf=mesh(new THREE.SphereGeometry(.1,8,6),i%2?M.leaf:M.darkLeaf,-4.28+Math.cos(a)*.17,.72+range(-.08,.22),9.1+Math.sin(a)*.17);leaf.scale.set(.55,len/.1,.35);leaf.rotation.z=Math.cos(a)*.8;leaf.rotation.x=Math.sin(a)*.8;}
// Small standing labels and workshop details, readable from nearby.
sign('WORKSHOP',0,2.86,-5.85,1.2,.22,0);
sign('GLAZING',-1.8,2.82,3.14,.85,.2,Math.PI);

// Under-cabinet shadows preserve contact in the softly lit interior.
const shadowMaterial=new THREE.MeshBasicMaterial({color:0x514438,transparent:true,opacity:.18,depthWrite:false,side:THREE.DoubleSide});
const contactMesh=new THREE.InstancedMesh(new THREE.CircleGeometry(1,20),shadowMaterial,contactShadows.length);
const transform=new THREE.Object3D();
contactShadows.forEach((s,i)=>{transform.position.set(s.x,s.y,s.z);transform.rotation.set(-Math.PI/2,0,0);transform.scale.set(s.r,s.r,1);transform.updateMatrix();contactMesh.setMatrixAt(i,transform.matrix);});
contactMesh.instanceMatrix.needsUpdate=true;scene.add(contactMesh);

// Pendant shades, worn storage and an intentionally modest scattering of clay dust.
function pendant(x,z){
 rod(x,3.17,z,.7,.012,M.black);
 const profile=[[.06,0],[.14,.02],[.27,.17],[.29,.21],[.28,.23],[.25,.21],[.12,.08],[.06,.07]].map(p=>new THREE.Vector2(...p));
 const shade=mesh(new THREE.LatheGeometry(profile,20),M.metal,x,2.69,z);shade.rotation.x=Math.PI;
 const bulb=mesh(new THREE.SphereGeometry(.08,12,8),new THREE.MeshBasicMaterial({color:0xffe8bb}),x,2.64,z);
}
pendant(-1.15,-1.3);pendant(1.5,-1.3);pendant(0,5.35);
for(let i=0;i<5;i++){
 const xx=-.92+i*.36,zz=-1.48+range(-.04,.04);
 const dust=mesh(new THREE.CircleGeometry(range(.035,.08),10),M.dust,xx,.946,zz);dust.rotation.x=-Math.PI/2;dust.scale.y=range(.35,.8);
}
// Joinery and braces on the courtyard walls make the enclosure legible from the return view.
for(const zz of [9.1,11.9,14.65]){box(-4.89,1.15,zz,.14,2.3,.25,M.brick);box(4.89,1.15,zz,.14,2.3,.25,M.brick);}
for(const xx of [-3.8,-1.1,1.6,4.1])box(xx,1.15,14.89,.24,2.3,.14,M.brick);

// First-person controls with simple horizontal collision and a continuous floor.
const start={x:0,z:-4.85,yaw:0,pitch:0};let x=start.x,z=start.z,yaw=start.yaw,pitch=start.pitch;
function reset(){x=start.x;z=start.z;yaw=start.yaw;pitch=start.pitch;}
const keys=new Set();
document.addEventListener('keydown',e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','ShiftLeft','ShiftRight','KeyR'].includes(e.code))e.preventDefault();keys.add(e.code);if(e.code==='KeyR')reset();});
document.addEventListener('keyup',e=>keys.delete(e.code));
window.addEventListener('blur',()=>keys.clear());
const intro=document.querySelector('#intro'),hud=document.querySelector('#hud'),reticle=document.querySelector('#reticle');
document.querySelector('#enter').addEventListener('click',()=>renderer.domElement.requestPointerLock());
document.addEventListener('pointerlockchange',()=>{const locked=document.pointerLockElement===renderer.domElement;intro.style.display=locked?'none':'block';hud.style.display=locked?'flex':'none';reticle.style.display=locked?'block':'none';if(!locked)keys.clear();});
document.addEventListener('mousemove',e=>{if(document.pointerLockElement!==renderer.domElement)return;yaw-=e.movementX*.0022;pitch=Math.max(-1.42,Math.min(1.42,pitch-e.movementY*.0022));});
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
let last=performance.now();
function frame(now){
 const dt=Math.min((now-last)/1000,.05);last=now;
 if(document.pointerLockElement===renderer.domElement){
  let forward=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0);
  let side=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);
  const len=Math.hypot(forward,side)||1;forward/=len;side/=len;const speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?3.3:2.15)*dt;
  const delta=movement(yaw,forward,side),dx=delta.dx*speed,dz=delta.dz*speed;
  if(!blocked(x+dx,z))x+=dx;if(!blocked(x,z+dz))z+=dz;
 }
 camera.position.set(x,1.62,z);camera.rotation.order='YXZ';camera.rotation.set(pitch,Math.PI+yaw,0);
 renderer.render(scene,camera);requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
