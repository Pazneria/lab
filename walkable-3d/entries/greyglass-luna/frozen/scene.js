import * as THREE from 'three';

// Greyglass is deliberately built from low-cost primitives: no shadow maps,
// particle rain, post-processing, or real-time reflections.
const canvas = document.querySelector('#view');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9daeb3);
scene.fog = new THREE.FogExp2(0x9baeb3, 0.0078);
const camera = new THREE.PerspectiveCamera(74, innerWidth / innerHeight, 0.08, 180);
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.45));
renderer.setSize(innerWidth, innerHeight, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.16;

const mat = (color, roughness=.7, metalness=0, extra={}) => new THREE.MeshStandardMaterial({color,roughness,metalness,...extra});
const M = {
  concrete:mat(0x707b7c,.88,.08), concreteLight:mat(0x899292,.82,.05), darkConcrete:mat(0x424d50,.93,.12),
  steel:mat(0x39464b,.42,.76), steel2:mat(0x657276,.34,.78), worn:mat(0x8b9692,.38,.72), black:mat(0x20292c,.52,.55),
  timber:mat(0x695b49,.84,.04), timber2:mat(0x89735a,.82,.03), timberDark:mat(0x403d35,.9),
  cladding:mat(0x536166,.66,.36), cladding2:mat(0x687477,.62,.34), roof:mat(0x313b40,.48,.65),
  rubber:mat(0x171e20,.92,.08), brass:mat(0xa8824f,.36,.62), rope:mat(0x252c2d,.32,.82),
  glass:new THREE.MeshPhysicalMaterial({color:0xa7c9ce,roughness:.21,metalness:.18,transparent:true,opacity:.26,side:THREE.DoubleSide,depthWrite:false}),
  glassBlue:new THREE.MeshPhysicalMaterial({color:0x92b5bb,roughness:.24,metalness:.2,transparent:true,opacity:.34,side:THREE.DoubleSide,depthWrite:false}),
  warm:mat(0xffd18a,.4,.05,{emissive:0x6c3511,emissiveIntensity:.55}),
  lamp:mat(0xffdda1,.35,.04,{emissive:0xffb854,emissiveIntensity:2.4}),
  safety:mat(0xc17b39,.48,.24), snow:mat(0xd8e3e1,.9), mountain1:mat(0x617a83,.94), mountain2:mat(0x718890,.94), mountain3:mat(0x80959a,.94),
};
const boxGeo = new THREE.BoxGeometry(1,1,1);
const cylGeo = new THREE.CylinderGeometry(.5,.5,1,12);
const sphereGeo = new THREE.SphereGeometry(.5,10,8);
const add = (geo, material, x=0,y=0,z=0, sx=1,sy=1,sz=1, parent=scene) => {
  const o = new THREE.Mesh(geo,material); o.position.set(x,y,z); o.scale.set(sx,sy,sz); parent.add(o); return o;
};
const box = (x,y,z,sx,sy,sz,material,parent=scene) => add(boxGeo,material,x,y,z,sx,sy,sz,parent);
const scratch = new THREE.Object3D();
function batchBoxes(items, material){
  if(!items.length)return null;
  const mesh=new THREE.InstancedMesh(boxGeo,material,items.length);
  items.forEach((v,i)=>{scratch.position.set(v[0],v[1],v[2]);scratch.rotation.set(v[6]||0,v[7]||0,v[8]||0);scratch.scale.set(v[3],v[4],v[5]);scratch.updateMatrix();mesh.setMatrixAt(i,scratch.matrix);});
  mesh.instanceMatrix.needsUpdate=true;
  scene.add(mesh);return mesh;
}
const line = (a,b,r,material,parent=scene,radial=8) => {
  const A=new THREE.Vector3(...a), B=new THREE.Vector3(...b), d=new THREE.Vector3().subVectors(B,A);
  const o=new THREE.Mesh(cylGeo,material);
  o.position.copy(A).add(B).multiplyScalar(.5); o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());o.scale.set(r*2,d.length(),r*2); parent.add(o); return o;
};
function batchLines(items,material){
  if(!items.length)return null;
  const mesh=new THREE.InstancedMesh(cylGeo,material,items.length), yAxis=new THREE.Vector3(0,1,0);
  items.forEach((v,i)=>{const a=new THREE.Vector3(v[0],v[1],v[2]),b=new THREE.Vector3(v[3],v[4],v[5]),d=b.clone().sub(a);scratch.position.copy(a).add(b).multiplyScalar(.5);scratch.quaternion.setFromUnitVectors(yAxis,d.clone().normalize());scratch.scale.set(v[6]*2,d.length(),v[6]*2);scratch.updateMatrix();mesh.setMatrixAt(i,scratch.matrix);});
  mesh.instanceMatrix.needsUpdate=true;
  scene.add(mesh);return mesh;
}
const tube = (points,r,material,segments=32) => {
  const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));
  return add(new THREE.TubeGeometry(curve,segments,r,6,false),material);
};
function torus(x,y,z,major,tubeR,material,segments=64){const o=add(new THREE.TorusGeometry(major,tubeR,12,segments),material,x,y,z);return o;}
function cylinderBetween(a,b,r,material,parent=scene){return line(a,b,r,material,parent,10);}

// Daylight and a few stable, low-cost warm practicals.
scene.add(new THREE.HemisphereLight(0xd4e4e6,0x343b3a,1.18));
const key=new THREE.DirectionalLight(0xe5f0ed,1.12); key.position.set(-12,19,12); scene.add(key);
const fill=new THREE.DirectionalLight(0x99b8c5,.48); fill.position.set(18,11,-10); scene.add(fill);
function practical(x,y,z,range=9){
  if(practical.count<5){const p=new THREE.PointLight(0xffbd76,.65,range,2);p.position.set(x,y,z);scene.add(p);practical.count++;}
  const bulb=add(sphereGeo,M.lamp,x,y,z,.12,.09,.12);return bulb;
}
practical.count=0;

// Human-scale concrete slab and wet, softly reflective puddle marks.
box(-1, -.2, 0, 12.4,.4,14.2,M.concrete); // terminal x -7..5, z -7.1..7.1
box(11.5,-.2,0,13.4,.4,14.2,M.concrete); // loading apron
box(21.4,-.2,.1,7.8,.4,12.0,M.concreteLight); // lookout deck
// Pale concrete wear strips and expansion joints.
const floorJoints=[];
for(let x=-6.2;x<24;x+=2.8){
  const end=x<4.8?6.3:(x<18?6.2:5.45);
  floorJoints.push([x,.009,0,.025,.012,end*2]);
}
batchBoxes(floorJoints,M.darkConcrete);
// Irregular shallow rain puddles, nearly coplanar to avoid flicker.
let seed=73; const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
// Small local canvas textures add close-range grain without image downloads.
let grainSeed=901;const grainRand=()=>{grainSeed=(grainSeed*1664525+1013904223)>>>0;return grainSeed/4294967296;};
function grainMap(kind){
  const c=document.createElement('canvas');c.width=128;c.height=128;const ctx=c.getContext('2d');
  const image=ctx.createImageData(128,128);
  for(let y=0;y<128;y++)for(let x=0;x<128;x++){
    let n=(grainRand()-.5)*20;
    if(kind==='wood')n+=Math.sin(y*.53+Math.sin(x*.08)*1.4)*10;
    if(kind==='metal')n+=Math.sin(y*.38+x*.035)*5;
    const i=(y*128+x)*4,base=kind==='wood'?222:(kind==='metal'?224:226);
    image.data[i]=base+n;image.data[i+1]=base+n;image.data[i+2]=base+n;image.data[i+3]=255;
  }
  ctx.putImageData(image,0,0);
  if(kind!=='concrete'){
    ctx.globalAlpha=.13;ctx.fillStyle=kind==='wood'?'#2a2a28':'#e9edeb';
    for(let i=0;i<30;i++){
      const x=grainRand()*128,y=grainRand()*128;
      ctx.fillRect(x,y,kind==='wood'?1+grainRand()*2:10+grainRand()*38,kind==='wood'?12+grainRand()*54:1);
    }
    ctx.globalAlpha=1;
  }
  const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(2.4,2.0);tex.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());return tex;
}
const concreteGrain=grainMap('concrete'),metalGrain=grainMap('metal'),woodGrain=grainMap('wood');
for(const m of [M.concrete,M.concreteLight,M.darkConcrete])m.map=concreteGrain;
for(const m of [M.steel,M.steel2,M.worn,M.cladding,M.cladding2,M.roof,M.brass,M.safety])m.map=metalGrain;
for(const m of [M.timber,M.timber2,M.timberDark])m.map=woodGrain;
for(const m of Object.values(M))if(m.isMeshStandardMaterial)m.needsUpdate=true;
function wayfindingMap(){
  const c=document.createElement('canvas');c.width=512;c.height=512;const ctx=c.getContext('2d');
  ctx.fillStyle='#243638';ctx.fillRect(0,0,512,512);ctx.strokeStyle='#b7cfc2';ctx.lineWidth=9;ctx.strokeRect(15,15,482,482);
  ctx.fillStyle='#b7cfc2';ctx.font='500 28px monospace';ctx.letterSpacing='3px';ctx.fillText('GREYGLASS  /  02',42,82);
  ctx.fillRect(42,111,428,3);ctx.fillStyle='#edf1e9';ctx.font='600 66px sans-serif';ctx.fillText('RIDGE',42,225);ctx.fillText('LOOKOUT',42,309);
  ctx.fillStyle='#d8b074';ctx.font='600 45px monospace';ctx.fillText('→  CONTINUE',42,410);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}
const routeSignMaterial=new THREE.MeshStandardMaterial({map:wayfindingMap(),color:0xffffff,roughness:.52,metalness:.18,side:THREE.DoubleSide,emissive:0x172222,emissiveIntensity:.16});
const puddleMat=new THREE.MeshStandardMaterial({color:0x384a50,roughness:.16,metalness:.42,transparent:true,opacity:.56,side:THREE.DoubleSide,depthWrite:false});
const puddleTransforms=[];
for(let i=0;i<54;i++){
  const x=-6+rand()*29, z=-6+rand()*11.7;
  if(x>4.8&&x<18&&z<1.2&&z>-1.8)continue;
  puddleTransforms.push([x,.014+rand()*.002,z,.18+rand()*.64,1,.12+rand()*.28,-Math.PI/2,0,rand()*Math.PI]);
}
const puddles=new THREE.InstancedMesh(new THREE.CircleGeometry(.5,12),puddleMat,puddleTransforms.length);
puddleTransforms.forEach((v,i)=>{scratch.position.set(v[0],v[1],v[2]);scratch.rotation.set(v[6],v[7],v[8]);scratch.scale.set(v[3],v[4],v[5]);scratch.updateMatrix();puddles.setMatrixAt(i,scratch.matrix);});puddles.instanceMatrix.needsUpdate=true;scene.add(puddles);

// Terminal shell: corrugated metal, rain-marked high glazing, timber gable and roof.
const wallY=3.2, wallH=6.4;
// The long side walls leave a continuous clerestory band open for real glazing.
for(const side of [-1,1]){
  box(-1,1.76,side*7,12,3.52,.34,M.cladding);
  box(-1,5.83,side*7,12,1.14,.34,M.cladding);
}
// Concrete kick plates, internal timber lining and long upper window bands.
const rainLines=[], claddingSeams=[];
for(const side of [-1,1]){
  box(-1,.48,side*6.79,12,.96,.14,M.darkConcrete);
  box(-1,2.0,side*6.79,12,2.08,.08,M.timberDark);
  for(let x=-6.25;x<4.5;x+=2.1){
    box(x,4.45,side*6.78,1.72,1.66,.045,M.glassBlue);
    box(x-.88,4.45,side*6.75,.08,1.82,.13,M.steel2);
    box(x+.88,4.45,side*6.75,.08,1.82,.13,M.steel2);
    // Subtle runoff streaks on the side glazing.
    for(let k=0;k<5;k++){
      const zz=side*6.72, xx=x-.65+k*.29, top=5.1-rand()*.55, len=.28+rand()*.55;
      rainLines.push([xx,top,zz,xx+.02,top-len,zz,.008]);
    }
  }
  // Vertical cladding seams and exposed column shoes.
  for(let x=-6.85;x<=4.85;x+=.58)claddingSeams.push([x,3.25,side*6.79,.022,4.6,.04]);
  for(let x=-6;x<=4.4;x+=2.8){box(x,.24,side*6.5,.38,.48,.45,M.steel);}
}
batchBoxes(claddingSeams,M.cladding2);
// Entry and departure end walls, with generous doors on the route side.
// Entry door is centered on the wheel face / initial inspection line (z about zero).
for(const [x,door] of [[-7,[-1.75,1.75]],[5,[-.7,4.9]]]){
  const left=-7.1,right=7.1;
  const segs= x<0 ? [[-7.1,-1.75],[1.75,7.1]] : [[-7.1,-.7],[4.9,7.1]];
  for(const [a,b] of segs){const width=b-a;box(x,3.05,(a+b)/2,.34,6.1,width,M.cladding);box(x, .48,(a+b)/2,.42,.96,width,M.darkConcrete);}
  // heavy portal jambs and lintel frame
  for(const z of door){box(x+.02,3.08,z,.24,6.18,.22,M.steel2);box(x+.16,.17,z,.45,.34,.34,M.brass);}
  box(x+.02,6.16,(door[0]+door[1])/2,.25,.28,door[1]-door[0]+.22,M.steel2);
}
// Fixed glass side lights beside the entry and an open sliding door leaf parked aside.
for(const z of [-4.5,4.4]){
  const pane=add(boxGeo,M.glass,-6.81,2.8,z,.035,4.9,2.4); pane.renderOrder=2;
  for(let y=0.5;y<5.3;y+=.47)rainLines.push([-6.78,y,z-1.12,-6.78,y+.04,z+1.1,.009]);
}
// Gable wall triangles and sloped, ribbed metal roof panels.
function trianglePanel(vertices, material){
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices.flat(),3));g.setIndex([0,1,2,0,2,3]);g.computeVertexNormals();
  const m=new THREE.Mesh(g,material);scene.add(m);return m;
}
// Gable-end infill at each end (paired faces).
for(const x of [-6.82,4.82]){
  trianglePanel([[x,6.35,-6.9],[x,7.55,0],[x,6.35,6.9],[x,6.35,-6.9]],M.cladding);
}
// Roof planes pitched away from the ridge; underside timber is visible from the hall.
const roofRibs=[];
for(const side of [-1,1]){
  const panel=box(-1,6.88,side*3.45,13.2,.26,7.15,M.roof); panel.rotation.x=side*.15;
  const under=box(-1,6.71,side*3.42,12.9,.10,6.75,M.timber);under.rotation.x=side*.15;
  for(let z=side*.35;Math.abs(z)<6.8;z+=side*.48)roofRibs.push([-1,7.04,z,13.25,.035,.055,side*.15]);
}
batchBoxes(roofRibs,M.steel2);
box(-1,7.53,0,13.5,.2,.24,M.worn);
// Ceiling trusses provide station scale and visible timber structure.
for(let x=-6.3;x<=4.8;x+=2.35){
  line([x,6.15,-6.4],[x,7.35,0],.10,M.timber2);
  line([x,7.35,0],[x,6.15,6.4],.10,M.timber2);
  line([x,6.15,-6.4],[x,6.15,6.4],.075,M.steel);
}

// Bullwheel assembly: full-size grooved sheave, hub, spoke web and bearing stands.
// Its face is oriented toward the entry (positive z) for a strong first read.
const wc={x:.7,y:3.15,z:-1.05}, R=2.12;
// Heavy support frame, feet and cross braces.
for(const side of [-1,1]){
  box(wc.x+side*2.47,.18,wc.z,.75,.36,2.35,M.steel);
  cylinderBetween([wc.x+side*2.6,.38,wc.z],[wc.x+side*1.9,4.65,wc.z],.16,M.steel);
  cylinderBetween([wc.x+side*2.55,.4,wc.z+side*.3],[wc.x+side*1.9,4.5,wc.z+side*.3],.07,M.steel2);
  cylinderBetween([wc.x+side*2.6,.82,wc.z-.62],[wc.x+side*2.0,3.0,wc.z-.62],.075,M.steel2);
  box(wc.x+side*2.2,4.67,wc.z,.76,.35,.86,M.black);
  box(wc.x+side*2.2,4.88,wc.z,.34,.16,.42,M.worn);
}
// Wheel ring and multiple concentric wear bands.
torus(wc.x,wc.y,wc.z,R,.17,M.rubber,72);
torus(wc.x,wc.y,wc.z,R-.23,.075,M.worn,72);
torus(wc.x,wc.y,wc.z,R-.53,.06,M.steel2,72);
torus(wc.x,wc.y,wc.z,.72,.19,M.steel,48);
torus(wc.x,wc.y,wc.z,.42,.13,M.worn,40);
// Ten radial steel spokes, laid flat in the wheel face plane.
for(let i=0;i<10;i++){
  const a=2*Math.PI*i/10;
  const p1=[wc.x+Math.cos(a)*.62,wc.y+Math.sin(a)*.62,wc.z+.01];
  const p2=[wc.x+Math.cos(a+Math.PI/10)*(R-.28),wc.y+Math.sin(a+Math.PI/10)*(R-.28),wc.z+.01];
  cylinderBetween(p1,p2,.095,M.steel2);
  const lug=add(sphereGeo,M.brass,(p2[0]+wc.x)/2,(p2[1]+wc.y)/2,wc.z+.14,.09,.09,.07);
}
// Hub shaft and retaining plates project toward the visitor.
const hub=add(new THREE.CylinderGeometry(.38,.38,.52,32),M.steel,wc.x,wc.y,wc.z+.23);hub.rotation.x=Math.PI/2;
const cap=add(new THREE.CylinderGeometry(.22,.22,.58,24),M.brass,wc.x,wc.y,wc.z+.5);cap.rotation.x=Math.PI/2;
for(let i=0;i<12;i++){const a=2*Math.PI*i/12;add(sphereGeo,M.worn,wc.x+Math.cos(a)*.3,wc.y+Math.sin(a)*.3,wc.z+.54,.045,.045,.035);}
// Cable runs and guide rollers, plus a secondary return sheave visible deeper inside.
for(const z of [-.94,-1.16]){
  line([-7,5.3,z],[24,5.3,z],.045,M.rope);
  // Slightly lower return / haul line with a clean, parallel run.
  line([-7,5.32,z+.12],[24,5.32,z+.12],.024,M.steel2);
}
for(const x of [-4.8,-2.8,3.8,6.2,14.8,17.4]){
  const frameZ=-1.05;
  line([x,4.75,frameZ],[x,5.35,frameZ],.055,M.steel);
  const roller=add(new THREE.CylinderGeometry(.16,.16,.48,12),M.rubber,x,5.34,frameZ);roller.rotation.x=Math.PI/2;
  add(sphereGeo,M.brass,x,5.35,frameZ,.075,.075,.11);
}
// Guard barrier with toe plate. Visitors can stand in the safe inspection bay in front.
for(let x=-1.4;x<=3.2;x+=1.15){
  box(x,.68,1.78,.11,1.36,.12,M.steel2);box(x,.25,1.78,.28,.14,.36,M.safety);
  box(x,1.25,1.78,.16,.12,.16,M.brass);
}
for(const y of [.45,.9,1.28])box(.9,y,1.78,4.65,.06,.09,y===.45?M.safety:M.steel2);
// Yellow-striped maintenance boundary on the concrete.
for(let x=-1.5;x<3.5;x+=.52){const o=box(x,.018,2.18,.28,.018,.12,M.safety);o.rotation.y=.45;}
// Drive cabinet, hydraulic pipes, cooling fins and an instrument panel.
box(-1.65,1.3,-1.25,1.65,2.6,1.28,M.steel);
box(-1.65,2.68,-.55,1.48,.18,.12,M.worn);
box(-1.65,1.95,-.55,1.2,.82,.08,M.black);
box(-1.65,1.96,-.49,.8,.33,.04,M.cladding2);
for(let i=0;i<8;i++)box(-2.22+i*.16,1.95,-.44,.035,.35,.04,M.worn);
for(let y=.5;y<2.35;y+=.28){box(-2.52,y,-.58,.07,.11,.06,M.brass);}
for(let i=0;i<6;i++)box(-2.45+i*.28,.52,-2.0,.09,.83,.12,M.steel2);
for(const x of [-2.25,-1.05]){
  line([x,.55,-.6],[x,2.9,-1.1],.06,M.safety);
  line([x,2.9,-1.1],[x,3.35,-1.1],.055,M.steel2);
}
// Access ladder and machine-side handrail.
for(const x of [-2.95,-2.15])line([x,.25,-.15],[x,3.05,-.15],.045,M.steel2);
for(let y=.4;y<3;y+=.32)line([-2.95,y,-.15],[-2.15,y,-.15],.035,M.worn);
// Work-light strips and two warm pools of light.
practical(-2.9,5.6,3.5,9);practical(3.9,5.55,3.5,9);practical(-5.1,3.5,-6.1,7);
for(const x of [-4.4,3.4]){
  box(x,5.7,4.7,.75,.11,.18,M.black);box(x,5.62,4.7,.6,.07,.09,M.lamp);
}

// Loading platform edge rails and striped kickboards; platform remains wide and legible.
for(const side of [-1,1]){
  const z=side*6.56;
  box(11.5,.3,z,13.2,.6,.18,M.darkConcrete);
  for(let x=5.4;x<18.2;x+=1.7){
    box(x,.9,z,.105,1.35,.16,M.steel2);
    box(x,1.56,z,.17,.10,.22,M.brass);
  }
  for(const y of [.44,.88,1.33])box(11.7,y,z,12.6,.065,.11,M.steel2);
}
// Cabin boarding platform strip and tactile edge markers.
box(11.2,.11,2.02,12.0,.22,.24,M.worn);
for(let x=5.6;x<17.5;x+=.42)box(x,.235,2.0,.22,.045,.17,(Math.round(x*10)%2)?M.safety:M.black);

// Fixed cabin suspension cable, trolley bogie and one detailed stopped gondola.
// Upper suspension line is kept above the wheel guards and aligned with the cabin hanger.
line([-7,5.82,-.55],[25,5.82,-.55],.063,M.rope);
line([-7,5.97,-.55],[25,5.97,-.55],.022,M.steel2);
const cabX=10.6,cabZ=-.15;
// Two-groove trolley bogie and clamps on the stationary haul rope.
box(cabX,5.64,cabZ,.8,.26,.65,M.black);
for(let x of [cabX-.27,cabX+.27]){
  const wheel=add(new THREE.CylinderGeometry(.17,.17,.19,16),M.rubber,x,5.76,cabZ);wheel.rotation.x=Math.PI/2;
  add(sphereGeo,M.brass,x,5.78,cabZ,.08,.08,.12);
  line([x,5.58,cabZ],[x,5.28,cabZ],.065,M.steel2);
}
// Tapered hanger arms and crosshead.
line([cabX-.28,5.55,cabZ],[cabX-.56,4.17,cabZ],.105,M.steel2);
line([cabX+.28,5.55,cabZ],[cabX+.56,4.17,cabZ],.105,M.steel2);
line([cabX-.56,4.17,cabZ],[cabX+.56,4.17,cabZ],.11,M.steel);
line([cabX,4.2,cabZ],[cabX,3.88,cabZ],.09,M.steel2);
// Cabin lower chassis, footwell, corner uprights, roof band.
box(cabX,1.03,cabZ,3.45,.24,2.82,M.black);
box(cabX,1.19,cabZ,3.32,.12,2.65,M.steel2);
box(cabX,3.47,cabZ,3.58,.28,2.95,M.black);
box(cabX,3.32,cabZ,3.38,.10,2.78,M.worn);
box(cabX,3.67,cabZ,3.72,.14,3.08,M.steel2);
// Corner frames and long belt-line rails.
for(const x of [cabX-1.62,cabX+1.62])for(const z of [cabZ-1.31,cabZ+1.31]){
  box(x,2.33,z,.13,2.18,.13,M.steel2);
  box(x,1.46,z,.23,.09,.21,M.brass);
}
for(const z of [cabZ-1.34,cabZ+1.34]){
  box(cabX,1.48,z,3.28,.12,.12,M.steel2);
  box(cabX,3.26,z,3.23,.11,.12,M.steel2);
}
// Side glazing split into rain-streaked bays. Door is a distinct framed section at the east end.
for(const side of [-1,1]){
  const z=cabZ+side*1.27;
  for(const x of [cabX-1.10,cabX-.36,cabX+.38]){
    const pane=box(x,2.36,z,.66,1.62,.028,M.glassBlue);pane.renderOrder=3;
    box(x,1.53,z,.67,.055,.08,M.black);box(x,3.18,z,.67,.055,.08,M.black);
    for(let k=0;k<4;k++)rainLines.push([x-.25+k*.16,3.06,z+side*.025,x-.23+k*.16,2.05-rand()*.35,z+side*.025,.009]);
  }
  // Door glass and an outlined rubber perimeter.
  const dx=cabX+1.19;
  box(dx,2.36,z,.88,1.62,.032,M.glass);
  box(dx-.46,2.36,z,.075,1.78,.1,M.steel2);box(dx+.46,2.36,z,.075,1.78,.1,M.steel2);
  box(dx,3.2,z,.96,.1,.11,M.steel2);box(dx,1.53,z,.96,.10,.11,M.steel2);
  box(dx+.28,2.3,z+side*.07,.045,.27,.08,M.brass);
}
batchLines(rainLines,M.worn);
// End windows, internal bench seats, handrails, floor and two hanging straps.
for(const side of [-1,1]){
  const x=cabX+side*1.7;
  box(x,2.35,cabZ,.03,1.62,2.33,M.glassBlue);
  box(x+side*.035,2.35,cabZ,.06,1.75,.09,M.steel2);
  for(const z of [cabZ-.9,cabZ+.9])box(x+side*.04,2.35,z,.07,1.74,.07,M.steel2);
}
for(const side of [-1,1]){
  box(cabX-.1,1.74,cabZ+side*.78,2.15,.17,.4,M.timber2);
  box(cabX-.1,1.91,cabZ+side*.78,2.15,.24,.11,M.timber);
  for(let x=cabX-1.0;x<=cabX+.9;x+=.95)line([x,1.12,cabZ+side*.7],[x,1.68,cabZ+side*.7],.035,M.steel2);
}
for(const x of [cabX-.42,cabX+.42])line([x,3.9,cabZ],[x,3.18,cabZ],.025,M.safety);
// Roof handles, vents, amber destination panel.
box(cabX,3.82,cabZ,1.05,.08,.45,M.black);
box(cabX+1.15,3.52,cabZ+1.51,.62,.21,.05,M.warm);
box(cabX+1.15,3.52,cabZ+1.55,.5,.035,.018,M.brass);
for(let i=0;i<6;i++)box(cabX-1.12+i*.45,3.81,cabZ-1.05,.23,.045,.16,M.worn);
// Platform-mounted boarding gate with a clear gap aligned to the cabin door.
for(const x of [8.0,13.25]){
  box(x,.86,2.55,.13,1.72,.13,M.safety);box(x,1.72,2.55,.19,.12,.2,M.brass);
  box(x,.35,2.55,.38,.42,.43,M.steel);
}
for(const x of [8.3,8.8,12.55,13.05])box(x,.54,2.55,.54,.07,.06,M.steel2);
// Service cabinet and low wheeled maintenance cart, clear of the route.
box(6.4,.74,-4.85,1.1,1.48,.84,M.cladding);
box(6.4,1.18,-4.4,.78,.65,.06,M.black);
for(let i=0;i<4;i++)box(6.12+i*.18,1.18,-4.36,.045,.4,.025,M.worn);
for(const x of [5.95,6.85])for(const z of [-5.1,-4.6])add(new THREE.CylinderGeometry(.12,.12,.07,12),M.black,x,.13,z).rotation.x=Math.PI/2;
box(15.6,.49,-4.95,1.4,.82,.76,M.timber);
for(const x of [15.15,16.05])for(const z of [-5.18,-4.72]){const w=add(new THREE.CylinderGeometry(.14,.14,.07,12),M.rubber,x,.15,z);w.rotation.x=Math.PI/2;}

// Covered exterior lookout, timber canopy, drainage, benches and safe balustrades.
for(const x of [18.25,24.4])for(const z of [1.1,5.5]){
  box(x,2.85,z,.2,5.7,.2,M.timber2);
  box(x,.28,z,.42,.56,.42,M.steel);
}
// Roof canopy above the overlook, sloping gently toward the exposed edge.
// It shelters the visitor lane at z≈3.2 while leaving the haul rope clear.
const canopy=box(21.3,5.9,3.35,7.3,.24,4.9,M.roof);canopy.rotation.z=-.035;
box(21.3,5.72,3.35,7.1,.08,4.7,M.timber);
for(let z=1.1;z<=5.6;z+=.48){const r=box(21.3,6.04,z,7.25,.04,.06,M.steel2);r.rotation.z=-.035;}
for(const z of [-4.8,5.5]){
  for(let x=18.6;x<24.3;x+=1.25){box(x,.92,z,.11,1.2,.12,M.steel2);box(x,1.52,z,.15,.09,.16,M.brass);}
  for(const y of [.42,.86,1.3])box(21.4,y,z,5.9,.07,.11,M.steel2);
  box(21.4,.28,z,6.0,.55,.18,M.timberDark);
}
for(let x=18.6;x<24.1;x+=1.1)line([x,6.0,1.25],[x,5.72,5.35],.08,M.timber2);
// Bench, rain gauge, drainage chain and a small wayfinding plaque.
box(22.4,.74,4.78,2.05,.22,.48,M.timber2);box(22.4,1.12,5.0,2.05,.57,.12,M.timber);
for(const x of [21.65,23.15])line([x,.25,4.78],[x,.67,4.78],.055,M.steel2);
box(19.05,1.65,5.18,.64,.84,.09,M.black);
const routeSign=add(new THREE.PlaneGeometry(.49,.48),routeSignMaterial,19.05,1.72,5.124);routeSign.rotation.y=Math.PI;routeSign.renderOrder=3;
line([24.35,5.7,5.15],[24.35,2.5,5.15],.045,M.steel2);
line([24.35,2.5,5.15],[24.35,.3,5.15],.035,M.steel2);
for(let y=2.3;y>.35;y-=.31)add(sphereGeo,M.worn,24.35,y,5.15,.045,.045,.045);
// Far-end guardrail closes the exposed deck while keeping a broad view through.
for(let z=-4.5;z<=5.1;z+=1.8)box(24.4,.87,z,.1,1.18,.1,M.steel2);
for(const y of [.4,.82,1.25])box(24.4,y,.3,.075,.07,9.8,M.steel2);
practical(19.0,5.3,4.8,8);practical(23.6,5.25,1.7,8);

// Layered ridge silhouettes: simple low-poly backdrop through the lookout opening.
function ridge(zCenter,width,height,material,baseX,offset=0){
  const shape=new THREE.Shape();shape.moveTo(-width/2,0);shape.lineTo(-width*.34,height*.38);shape.lineTo(-width*.14,height*.28);shape.lineTo(width*.04,height);shape.lineTo(width*.20,height*.49);shape.lineTo(width*.34,height*.62);shape.lineTo(width/2,0);shape.closePath();
  const g=new THREE.ShapeGeometry(shape,1);const m=new THREE.Mesh(g,material);m.rotation.y=Math.PI/2;m.position.set(baseX,offset,zCenter);scene.add(m);return m;
}
// Shape plane faces back toward the station; y is preserved by the quarter turn.
ridge(-2,17,11,M.mountain1,34,-.3);ridge(7,15,8.5,M.mountain2,31,-.2);ridge(-12,13,7,M.mountain3,29,-.1);
// Snow caps as pale small ridge triangles at high points (same low-poly technique).
function snowPeak(z,h,w,x){const shape=new THREE.Shape();shape.moveTo(-w/2,0);shape.lineTo(0,h);shape.lineTo(w/2,0);shape.closePath();const g=new THREE.ShapeGeometry(shape);const m=new THREE.Mesh(g,M.snow);m.rotation.y=Math.PI/2;m.position.set(x,h*.66,z);scene.add(m);}
snowPeak(-2,2.1,4.4,33);snowPeak(7,1.8,3.8,30);snowPeak(-12,1.45,3.5,28.5);
// Mist banks as broad translucent distant planes, static and inexpensive.
const mistMat=new THREE.MeshBasicMaterial({color:0xd5e0df,transparent:true,opacity:.095,depthWrite:false,side:THREE.DoubleSide});
for(const [x,y,z,sx,sz] of [[27,2,-1,18,8],[29,3,8,15,7],[26,1,-12,14,6]]){
  const p=add(new THREE.PlaneGeometry(sx,sz),mistMat,x,y,z);p.rotation.y=Math.PI/2;p.renderOrder=1;
}

// Warm practicals reveal wet metal inside; cool daylight remains dominant.
practical(-4.7,5.2,2.4,10);practical(3.9,5.1,2.6,10);practical(7.1,5.0,4.6,8);practical(15.8,5.2,4.7,8);
// Wall-mounted station clock, analog dial, and route marker.
const clockGroup=new THREE.Group();scene.add(clockGroup);clockGroup.position.set(4.55,4.55,5.92);
const face=add(new THREE.CircleGeometry(.42,32),M.concreteLight,0,0,0,1,1,1,clockGroup);face.material=mat(0xd7dfd9,.65,.08);
torus(0,0,.025,.43,.035,M.steel2,32).position.set(4.55,4.55,5.92);
line([4.55,4.55,6.0],[4.55,4.85,6.0],.018,M.black);line([4.55,4.55,6.0],[4.77,4.55,6.0],.014,M.black);
box(4.5,3.72,5.95,.9,.32,.08,M.black);box(4.5,3.73,6.01,.68,.08,.02,M.warm);
// Bolt heads across important machine feet, rails and cabin frame, grouped through instancing.
const boltGeo=new THREE.SphereGeometry(.045,8,6), boltMat=M.brass;
const boltPositions=[];
for(let x=-2.7;x<3.0;x+=.38)for(const z of [1.79,-2.28])boltPositions.push([x,.25,z]);
for(const x of [cabX-1.45,cabX+1.45])for(const z of [cabZ-1.2,cabZ+1.2])for(let y=1.55;y<3.2;y+=.42)boltPositions.push([x,y,z]);
const bolts=new THREE.InstancedMesh(boltGeo,boltMat,boltPositions.length), dummy=new THREE.Object3D();
boltPositions.forEach((p,i)=>{dummy.position.set(...p);dummy.updateMatrix();bolts.setMatrixAt(i,dummy.matrix);});scene.add(bolts);
bolts.instanceMatrix.needsUpdate=true;

// Entry vestibule glazing is inset so the open threshold remains walkable.
// Simple collision volumes preserve walls, equipment, cabin and the guarded edges.
const player={x:-5.65,z:.1,yaw:-1.47,pitch:0,eye:1.68,r:.28};
const keys=new Set();let locked=false;let lastZone='';let toastTimer=0;
const clamps={terminal:{x0:-6.65,x1:24.12,z0:-6.58,z1:6.58},platform:{x0:-6.65,x1:24.12,z0:-6.18,z1:6.18},lookout:{x0:-6.65,x1:24.12,z0:-4.42,z1:5.12}};
function zoneAt(x){return x<4.98?'terminal':x<18.25?'platform':'lookout';}
function updateCamera(){camera.position.set(player.x,player.y,player.z);camera.rotation.order='YXZ';camera.rotation.y=player.yaw;camera.rotation.x=player.pitch;}
player.y=player.eye;updateCamera();
function clampToZone(x,z){
  const zone=zoneAt(x),b=clamps[zone];
  // The hall-to-platform portal is a continuous threshold through the end wall.
  // Restrict its opening to the broad visitor passage while crossing that plane.
  let nextX=THREE.MathUtils.clamp(x,b.x0,b.x1);
  let nextZ=THREE.MathUtils.clamp(z,b.z0,b.z1);
  if(nextX>4.78&&nextX<5.22)nextZ=THREE.MathUtils.clamp(nextZ,-.55,4.72);
  return {x:nextX,z:nextZ};
}
function blocked(x,z){
  // A visitor barrier keeps the sheave and drive cabinet behind the safety line.
  if(x>-.95&&x<3.15&&z>1.48&&z<2.08)return true;
  // Wheel and gearbox footprint, with a small extra clearance for shoulders.
  if(x>-2.9&&x<3.6&&z>-1.58&&z<-.54)return true;
  if(x>-2.75&&x<-.55&&z>-2.2&&z<-.7)return true;
  // Cabin body and trolley are solid while the boarding walkway remains open.
  if(x>8.58&&x<12.62&&z>-1.98&&z<1.68)return true;
  // Cabin stanchions on its platform side.
  if(x>7.85&&x<13.35&&z>2.32&&z<2.74)return true;
  return false;
}
function tryMove(dx,dz){
  let p=clampToZone(player.x+dx,player.z);if(!blocked(p.x,player.z))player.x=p.x;
  p=clampToZone(player.x,player.z+dz);if(!blocked(player.x,p.z))player.z=p.z;
  updateCamera();
}
function setZoneLabel(){
  const z=player.x<4.9?'ARRIVAL HALL':player.x<18.25?'LOADING PLATFORM':'RIDGE LOOKOUT';
  if(z!==lastZone){document.querySelector('#zone').textContent=z;lastZone=z;}
}
function reset(){player.x=-5.65;player.z=.1;player.yaw=-1.47;player.pitch=0;updateCamera();}
function showToast(){const t=document.querySelector('#toast');t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1900);}
document.querySelector('#enter').addEventListener('click',()=>canvas.requestPointerLock());
canvas.addEventListener('click',()=>{if(!locked)canvas.requestPointerLock();});
document.addEventListener('pointerlockchange',()=>{
  locked=document.pointerLockElement===canvas;
  document.querySelector('#help').classList.toggle('hidden',locked);
  if(!locked){showToast();keys.clear();}
});
document.addEventListener('mousemove',e=>{if(!locked)return;player.yaw-=e.movementX*.00215;player.pitch=THREE.MathUtils.clamp(player.pitch-e.movementY*.00185,-1.32,1.32);updateCamera();});
document.addEventListener('keydown',e=>{keys.add(e.code);if(e.code==='KeyR')reset();if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();});
document.addEventListener('keyup',e=>keys.delete(e.code));
document.addEventListener('visibilitychange',()=>{if(document.hidden)keys.clear();});
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight,false);renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.45));});

const clockDelta=new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);
  const dt=Math.min(clockDelta.getDelta(),.045);
  if(locked){
    const forward=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0);
    const strafe=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);
    if(forward||strafe){const speed=(keys.has('ShiftLeft')||keys.has('ShiftRight'))?5.1:3.35;const l=Math.hypot(forward,strafe)||1;
      const fx=-Math.sin(player.yaw),fz=-Math.cos(player.yaw),rx=Math.cos(player.yaw),rz=-Math.sin(player.yaw);
      tryMove((fx*forward+rx*strafe)/l*speed*dt,(fz*forward+rz*strafe)/l*speed*dt);
    }
  }
  setZoneLabel();renderer.render(scene,camera);
}
animate();
