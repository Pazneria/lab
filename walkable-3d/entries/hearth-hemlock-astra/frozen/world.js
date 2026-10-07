import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { makeMaterials, textMaterial, randomGenerator, makeEnvironment, botanicalMaterial } from './materials.js';

export function createWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#98aaa8');
  scene.fog = new THREE.Fog('#a4b0a9', 22, 50);
  scene.environment=makeEnvironment();scene.environmentIntensity=.38;
  const root = new THREE.Group(); scene.add(root);
  const m=makeMaterials(), rng=randomGenerator(5163), colliders=[];
  const geoCache=new Map();
  const geometry=(key,make)=>{if(!geoCache.has(key))geoCache.set(key,make());return geoCache.get(key)};
  const mesh=(geo,mat,x=0,y=0,z=0,parent=root)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=!mat.transparent;o.receiveShadow=true;parent.add(o);return o;};
  const box=(x,y,z,w,h,d,mat=m.wood,p=root)=>mesh(geometry(`b${w},${h},${d}`,()=>new THREE.BoxGeometry(w,h,d)),mat,x,y,z,p);
  const softBox=(x,y,z,w,h,d,mat=m.wood,p=root,r=.012)=>mesh(geometry(`r${w},${h},${d},${r}`,()=>new RoundedBoxGeometry(w,h,d,1,r)),mat,x,y,z,p);
  const cyl=(x,y,z,rt,rb,h,mat=m.wood,p=root,segments=20)=>mesh(geometry(`c${rt},${rb},${h},${segments}`,()=>new THREE.CylinderGeometry(rt,rb,h,segments)),mat,x,y,z,p);
  const ball=(x,y,z,r,mat,p=root,sx=1,sy=1,sz=1)=>{const o=mesh(geometry('sphere',()=>new THREE.SphereGeometry(1,16,10)),mat,x,y,z,p);o.scale.set(r*sx,r*sy,r*sz);return o;};
  const torus=(x,y,z,r,t,mat,p=root,rx=Math.PI/2)=>{const o=mesh(geometry(`t${r},${t}`,()=>new THREE.TorusGeometry(r,t,6,28)),mat,x,y,z,p);o.rotation.x=rx;return o;};
  const group=(x,y,z,ry=0,p=root)=>{const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry;p.add(g);return g;};
  const beam=(a,b,r,mat=m.darkWood,p=root,square=false)=>{
    const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),delta=end.clone().sub(start);
    const o=square?box(0,0,0,r,delta.length(),r,mat,p):cyl(0,0,0,r,r,delta.length(),mat,p,10);
    o.position.copy(start.add(end).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return o;
  };
  const lathe=(profile,mat,x,y,z,p=root)=>mesh(new THREE.LatheGeometry(profile.map(v=>new THREE.Vector2(...v)),24),mat,x,y,z,p);
  const solid=(x,z,w,d,label)=>colliders.push({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2,label});
  const wall=(x,z,w,d,mat=m.plaster,h=3)=>{box(x,h/2,z,w,h,d,mat);solid(x,z,w,d,'wall');};
  const ao=(x,y,z,w,d,p=root)=>{const a=mesh(geometry('ao',()=>new THREE.PlaneGeometry(1,1)),m.ao,x,y,z,p);a.rotation.x=-Math.PI/2;a.scale.set(w,d,1);a.castShadow=false;return a;};
  const plaque=(x,y,z,w,h,lines,opts={},p=root,ry=0)=>{const o=mesh(new THREE.PlaneGeometry(w,h),textMaterial(lines,opts),x,y,z,p);o.rotation.y=ry;o.castShadow=false;return o;};
  const nail=(x,y,z,p=root)=>ball(x,y,z,.014,m.iron,p,1,1,.4);
  function mug(x,y,z,mat=m.cream,p=root,angle=0) {
    const g=group(x,y,z,angle,p);
    lathe([[0,0],[.072,0],[.083,.02],[.092,.16],[.086,.177],[.075,.173],[.071,.035],[0,.031]],mat,0,0,0,g);
    const h=torus(.112,.093,0,.052,.015,mat,g,0);h.rotation.y=Math.PI/2;
    cyl(0,.135,0,.074,.074,.005,m.tea,g);ao(0,.003,0,.26,.26,g);return g;
  }
  function bowl(x,y,z,r,mat=m.cream,p=root) {
    const g=group(x,y,z,0,p);
    lathe([[0,0],[r*.46,0],[r*.55,r*.12],[r*.85,r*.35],[r,r*.63],[r*.98,r*.69],[r*.89,r*.64],[r*.73,r*.31],[r*.4,r*.1],[0,r*.1]],mat,0,0,0,g);
    return g;
  }
  function pot(x,y,z,r=.18,h=.28,mat=m.terra,p=root) {
    const g=group(x,y,z,0,p);
    lathe([[0,0],[r*.7,0],[r*.76,.025],[r*.97,h*.84],[r*1.06,h*.88],[r*1.06,h],[r*.9,h],[r*.86,h*.88],[r*.8,h*.19],[0,h*.15]],mat,0,0,0,g);
    cyl(0,h*.87,0,r*.87,r*.85,.025,m.soil,g);ao(0,.003,0,r*2.6,r*2.6,g);return g;
  }
  function jar(x,y,z,r=.10,h=.27,mat=m.celadon,p=root,label=null) {
    const g=group(x,y,z,0,p);
    lathe([[0,0],[r*.8,0],[r,.03],[r,h*.75],[r*.77,h*.85],[r*.76,h],[r*.61,h],[r*.60,h*.85],[0,h*.80]],mat,0,0,0,g);
    cyl(0,h+.014,0,r*.86,r*.86,.035,m.darkWood,g);torus(0,h+.029,0,r*.75,.01,m.brass,g);
    if(label)plaque(0,h*.46,r+.003,r*1.5,h*.32,[label],{width:256,height:96,border:false},g);
    return g;
  }
  function bottle(x,y,z,r=.08,h=.30,mat=m.amberGlass,p=root,label=null) {
    const g=group(x,y,z,0,p);
    lathe([[0,0],[r*.76,0],[r,.025],[r,h*.58],[r*.86,h*.69],[r*.35,h*.79],[r*.34,h*.96],[r*.42,h*.97],[r*.42,h],[r*.22,h],[r*.21,h*.80],[0,h*.73]],mat,0,0,0,g);
    cyl(0,h+.013,0,r*.31,r*.29,.052,m.paleWood,g,12);
    if(mat===m.bottleGlass)cyl(0,h*.24,0,r*.88,r*.88,h*.40,m.water,g,16);
    if(label)plaque(0,h*.38,r+.003,r*1.62,h*.25,[label],{width:256,height:96,border:false},g);
    return g;
  }
  function book(x,y,z,w=.15,h=.34,d=.22,mat=m.bookRed,p=root,flat=false) {
    const g=group(x,y,z,0,p);if(flat)g.rotation.z=Math.PI/2;
    box(0,h/2,0,w*.83,h*.91,d*.91,m.paper,g);
    box(-w/2,h/2,0,.012,h,d,mat,g);box(w/2,h/2,0,.012,h,d,mat,g);box(0,h/2,d/2,w,h,.02,mat,g);
    for(const v of [.13,.19,.78,.84])box(0,h*v,d/2+.012,w*.89,.009,.004,m.brass,g);
    box(0,h*.49,d/2+.013,w*.57,h*.20,.004,m.darkWood,g);
    return g;
  }
  const leafShape=new THREE.Shape();leafShape.moveTo(0,0);leafShape.bezierCurveTo(-.47,.24,-.36,.7,0,1);leafShape.bezierCurveTo(.36,.7,.47,.24,0,0);
  const leafGeo=new THREE.ShapeGeometry(leafShape,5);
  // Curl the blade into a shallow, light-catching ridge. All foliage is opaque geometry.
  const lp=leafGeo.attributes.position;for(let i=0;i<lp.count;i++){const x=lp.getX(i),y=lp.getY(i);lp.setZ(i,Math.sin(y*Math.PI)*.11-Math.abs(x)*.26);}leafGeo.computeVertexNormals();
  function leaf(x,y,z,length,width,rx,ry,rz,mat=m.leaf,p=root) {
    const l=mesh(leafGeo,mat,x,y,z,p);l.scale.set(width,length,length);l.rotation.set(rx,ry,rz);return l;
  }
  function plant(x,y,z,r=.17,h=.29,type='herb',p=root) {
    const g=pot(x,y,z,r,h,type==='moon'?m.plum:m.terra,p),base=h*.88;
    if(type==='fern') {
      for(let k=0;k<8;k++){const a=k*Math.PI/4+.2,stemH=.30+rng()*.25;const tip=[Math.sin(a)*.34,base+stemH,Math.cos(a)*.34];beam([0,base,0],tip,.008,m.stem,g);
        for(let j=1;j<7;j++){const t=j/7;const bx=tip[0]*t,by=base+stemH*t,bz=tip[2]*t;for(let side of [-1,1])leaf(bx,by,bz,(1-t*.5)*.20,.32,Math.PI/2-.4,a+side*.75,-side*.2,m.leafDark,g);}
      }
    } else if(type==='succulent') {
      for(let k=0;k<14;k++){let a=k*2.4;const l=leaf(0,base,0,.22+rng()*.12,.7,1.05,a,0,m.leafSilver,g);}
    } else if(type==='tall') {
      for(let k=0;k<5;k++){const a=k*2.4,height=.65+rng()*.48,tx=Math.sin(a)*.16,tz=Math.cos(a)*.16;beam([0,base,0],[tx,base+height,tz],.012,m.stem,g);
        for(let j=1;j<5;j++)leaf(tx*j/5,base+height*j/5,tz*j/5,.30,.67,.85,a+j*2.2,.1,m.leaf,g);
        leaf(tx,base+height-.08,tz,.23,.66,.4,a,0,m.leaf,g);
      }
    } else if(type==='moon') {
      for(let k=0;k<7;k++){let a=k*2.4;leaf(0,base,0,.33+rng()*.20,.68,.65+rng()*.65,a,0,m.leafPurple,g);}
      for(let k=0;k<3;k++){const a=k*2.3,tx=Math.sin(a)*.11,tz=Math.cos(a)*.11,height=.47+k*.08;beam([0,base,0],[tx,base+height,tz],.007,m.stem,g);ball(tx,base+height,tz,.041,m.glow,g,.8,1.35,.8);}
    } else if(type==='flower') {
      for(let k=0;k<7;k++){let a=k*2.4,tx=Math.sin(a)*.12,tz=Math.cos(a)*.12,height=.30+rng()*.30;beam([0,base,0],[tx,base+height,tz],.006,m.stem,g);leaf(tx*.6,base+height*.5,tz*.6,.15,.7,.8,a,0,m.leafSilver,g);for(let j=0;j<5;j++)ball(tx+Math.sin(j*1.256)*.03,base+height,tz+Math.cos(j*1.256)*.03,.028,m.plum,g,1,.55,1);ball(tx,base+height+.011,tz,.017,m.yellow,g);}
    } else {
      for(let k=0;k<9;k++){let a=k*2.4,tx=Math.sin(a)*.13,tz=Math.cos(a)*.13,height=.22+rng()*.32;beam([0,base,0],[tx,base+height,tz],.005,m.stem,g);for(let j=1;j<4;j++){leaf(tx*j/4,base+height*j/4,tz*j/4,.14,.62,.9,a+j*1.9,0,k%3?m.leaf:m.leafSilver,g);}leaf(tx,base+height-.05,tz,.13,.65,.5,a,0,m.leaf,g);}
    }
    return g;
  }
  function table(x,z,w,d,h=.8,mat=m.wood,p=root) {
    const g=group(x,0,z,0,p);
    const n=Math.ceil(w/.25);for(let i=0;i<n;i++)softBox(-w/2+(i+.5)*w/n,h,0,w/n-.01,.065,d,mat,g,.009);
    for(const a of [-1,1])for(const b of [-1,1]){box(a*(w/2-.10),h/2,b*(d/2-.1),.105,h,.105,m.darkWood,g);box(a*(w/2-.1),.18,b*(d/2-.1),.13,.08,.13,m.wood,g);}
    box(0,h-.14,-d/2+.08,w-.1,.16,.055,m.wood,g);box(0,h-.14,d/2-.08,w-.1,.16,.055,m.wood,g);
    for(const a of [-1,1])box(a*(w/2-.1),h-.14,0,.055,.16,d-.1,m.wood,g);
    ao(0,.075,0,w*1.18,d*1.3,g);return g;
  }
  function candle(x,y,z,h=.19,p=root) {
    cyl(x,y+.018,z,.074,.09,.035,m.brass,p);cyl(x,y+h/2+.04,z,.034,.037,h,m.cream,p,16);
    ball(x,y+h+.064,z,.027,m.ember,p,.55,1.7,.55);
  }
  function basket(x,y,z,r=.22,h=.24,p=root) {
    const g=group(x,y,z,0,p);cyl(0,h/2,0,r,r*.8,h,m.paleWood,g,20);
    for(let j=0;j<7;j++)torus(0,.02+j*h/7,0,r*(.82+.18*j/7),.01,m.wood,g);
    for(let j=0;j<18;j++){const a=j*Math.PI/9;beam([Math.cos(a)*r*.8,0,Math.sin(a)*r*.8],[Math.cos(a)*r,h,Math.sin(a)*r],.008,m.darkWood,g);}
    torus(0,h,0,r,.018,m.paleWood,g);return g;
  }

  // A fully bounded cottage; the floor meets all thresholds at one level.
  box(0,-.14,2.9,10.6,.26,6.3,m.mortar);
  box(2.4,-.14,-2.12,5.6,.26,4.25,m.mortar);
  for(let ix=0;ix<8;ix++)for(let iz=0;iz<10;iz++) {
    const x=-4.91+ix*.66,z=.29+iz*.58;
    const o=softBox(x,.006+rng()*.006,z,.643,.072,.563,ix%3===0?m.darkStone:m.stone,root,.014);o.rotation.y=(rng()-.5)*.008;
  }
  for(let iz=0;iz<19;iz++)for(let ix=0;ix<3;ix++){
    const x=.34+(ix+.5)*1.60,z=.16+iz*.313;
    box(x,.03,z,1.582,.065,.301,(iz+ix)%4?m.floorWood:m.floorDark);
    for(const dx of [-.74,.74]){const n=cyl(x+dx,.065,z,.008,.008,.002,m.iron,root,6);}
  }
  box(.19,.025,3,.33,.068,6,m.darkWood);
  for(let ix=0;ix<8;ix++)for(let iz=0;iz<6;iz++)box(-.04+ix*.67,.028,-.35-iz*.63,.647,.074,.607,(ix+iz)%3?m.brick:m.stone);
  // Kitchen exterior and front entrance, with a closed oak door.
  wall(-5.26,3,.20,6.2);wall(-2.42,6.06,5.9,.20);
  wall(2.95,6.06,4.9,.20,m.bluePlaster);wall(5.30,3,.20,6.2,m.bluePlaster);
  // North wall window opening.
  wall(-4.63,-.06,1.06,.20);wall(-.64,-.06,1.28,.20);
  box(-2.7,.53,-.06,2.86,1.06,.20,m.plaster);box(-2.7,2.73,-.06,2.86,.54,.20,m.plaster);solid(-2.7,-.06,2.86,.2,'window wall');
  // Greenhouse connection has two glazed sections and a generous 1.75 m door opening.
  wall(.70,-.06,.72,.16,m.bluePlaster);wall(4.28,-.06,2.04,.16,m.bluePlaster,.80);
  box(2.19,2.87,-.06,2.24,.27,.20,m.darkWood);
  box(1.10,1.44,-.06,.14,2.88,.22,m.darkWood);box(3.22,1.44,-.06,.14,2.88,.22,m.darkWood);
  solid(4.28,-.06,2.04,.16,'greenhouse window sill');
  box(4.25,1.82,-.06,1.94,1.88,.035,m.glass);
  for(const x of [3.30,4.25,5.20])box(x,1.85,-.04,.065,1.99,.08,m.paintedWood);
  box(4.25,1.85,-.04,2.0,.055,.08,m.paintedWood);box(4.25,2.80,-.04,2.0,.07,.09,m.paintedWood);
  // Broad arch between the kitchen and workroom.
  wall(.28,.51,.17,1.12,m.plaster);wall(.28,4.85,.17,2.42,m.plaster);
  box(.28,2.87,2.30,.24,.29,2.48,m.darkWood);
  for(const z of [1.12,3.51]){box(.28,1.40,z,.23,2.80,.19,m.darkWood);beam([.28,2.32,z],[.28,2.73,z+(z<2?.36:-.36)],.16,m.darkWood,root,true);}
  // Wall skirting, beadboard and exposed structural oak.
  for(let z=.10;z<6;z+=.23){box(-5.135,.39,z,.034,.75,.211,m.paintedWood);box(5.18,.39,z,.04,.75,.211,m.blueWood);}
  box(-5.10,.81,3,.085,.075,5.96,m.paintedWood);box(5.12,.81,3,.10,.075,5.96,m.blueWood);
  for(const x of [-5.12,.28,5.15])for(const z of [.10,5.92])box(x,1.52,z,.18,3.04,.19,m.darkWood);
  for(const x of [-5.12,5.15])box(x,.10,3,.11,.16,5.95,m.darkWood);
  for(const z of [.04,5.94])box(0,2.96,z,10.4,.20,.23,m.darkWood);
  // Vaulted, timber-lined roof. Roof boards span across both rooms.
  const slope=Math.atan2(1.18,5.30),roofLength=Math.hypot(5.30,1.18);
  for(const side of [-1,1])for(let j=0;j<21;j++){const roof=box(side*2.64,3.59,-.12+(j+.5)*6.24/21,roofLength,.14,6.24/21-.007,m.floorDark);roof.rotation.z=-side*slope;}
  box(0,4.18,3,.24,.26,6.18,m.darkWood);
  for(const z of [.15,2.18,4.2,5.86]){
    beam([-5.12,3.02,z],[0,4.19,z],.16,m.wood,root,true);beam([0,4.19,z],[5.16,3.02,z],.16,m.wood,root,true);
    box(0,2.99,z,10.28,.14,.17,m.darkWood);
    for(const side of [-1,1])beam([side*4.70,3.02,z],[side*3.73,3.36,z],.10,m.wood,root,true);
  }
  // Solid triangles close the gable ends.
  const triangle=new THREE.Shape();triangle.moveTo(-5.3,0);triangle.lineTo(5.3,0);triangle.lineTo(0,1.2);triangle.closePath();
  for(const z of [-.12,6.12]){const g=mesh(new THREE.ShapeGeometry(triangle),m.plaster,0,3,z);g.material=m.plaster;g.material.side=THREE.DoubleSide;}
  // Entrance: iron strap hinges, round window, boots and a patient broom.
  box(-1.35,1.20,5.93,1.20,2.39,.10,m.darkWood);
  for(let i=0;i<6;i++)box(-1.86+i*.204,1.17,5.861,.191,2.27,.035,m.wood);
  for(const x of [-2.0,-.7])box(x,1.24,5.82,.11,2.51,.17,m.darkWood);
  box(-1.35,2.48,5.82,1.42,.12,.17,m.darkWood);
  for(const y of [.42,1.95]){box(-1.71,y,5.818,.43,.055,.025,m.iron);nail(-1.86,y,5.80);nail(-1.56,y,5.80);}
  torus(-.94,1.13,5.783,.068,.013,m.brass,root,0);ball(-.94,1.20,5.80,.04,m.brass);
  const doorWindow=cyl(-1.34,1.9,5.82,.18,.18,.025,m.glass);doorWindow.rotation.x=Math.PI/2;torus(-1.34,1.9,5.79,.19,.027,m.darkWood,root,0);
  plaque(-1.35,2.78,5.78,.84,.15,['MIND THE THYME'],{width:512,height:90,background:'#6b705b',ink:'#eadcba',border:false},root,Math.PI);
  const mat=box(-1.35,.075,5.33,1.22,.025,.60,m.linen);
  for(let i=0;i<8;i++)box(-1.92+i*.16,.091,5.34,.012,.004,.52,m.darkWood);
  for(const x of [-2.44,-2.15]){ball(x,.12,5.54,.13,m.darkWood,root,.75,.67,1.5);cyl(x,.28,5.61,.077,.09,.33,m.darkWood);}
  beam([-3.88,.10,5.72],[-3.60,1.88,5.80],.025,m.wood);
  for(let i=0;i<23;i++)beam([-3.88,.45,5.72],[-3.88+(rng()-.5)*.28,.06,5.72+(rng()-.5)*.18],.008,m.paleWood);
  // The kitchen casement and a pair of small linen curtains.
  box(-2.7,1.80,-.035,2.86,1.43,.025,m.glass);
  for(const x of [-4.13,-2.70,-1.27])box(x,1.81,.04,.085,1.57,.16,m.paintedWood);
  for(const y of [1.08,1.82,2.53])box(-2.70,y,.04,2.98,.065,.16,m.paintedWood);
  box(-2.70,1.055,.14,3.18,.13,.43,m.paleWood);beam([-4.30,2.65,.20],[-1.10,2.65,.20],.025,m.iron);
  for(const side of [-1,1])for(let j=0;j<6;j++){const x=-2.7+side*(1.10+j*.049);const c=box(x,1.97,.20+Math.sin(j*2)*.033,.063,1.31,.023,m.curtain);c.rotation.z=side*.035;}
  plant(-3.77,1.13,.13,.115,.16,'herb');bottle(-1.52,1.13,.1,.067,.21,m.bottleGlass);

  // Kitchen counters: stout painted cabinets with framed doors and worn oak edges.
  const counter=group(-4.60,0,1.92);
  box(0,.45,0,1.03,.86,2.60,m.paintedWood,counter);
  for(let k=0;k<3;k++){
    const z=-.84+k*.85;box(.531,.43,z,.032,.68,.77,m.darkWood,counter);box(.55,.43,z,.034,.58,.66,m.paintedWood,counter);
    box(.573,.48,z+.21,.065,.08,.035,m.brass,counter);
  }
  for(let k=0;k<4;k++)softBox(-.405+k*.274,.925,0,.264,.095,2.82,m.paleWood,counter);
  box(.57,.90,0,.085,.15,2.84,m.wood,counter);box(-.49,1.05,0,.045,.23,2.82,m.wood,counter);
  solid(-4.60,1.92,1.10,2.82,'kitchen counter');ao(-4.55,.067,1.90,1.5,3.3);
  // A deep farmhouse sink at the far end of the counter.
  box(-4.55,.97,1.04,.77,.05,.68,m.cream);box(-4.55,1.015,1.04,.59,.035,.48,m.darkStone);
  for(const x of [-4.92,-4.18])box(x,1.045,1.04,.065,.14,.74,m.cream);
  for(const z of [.69,1.39])box(-4.55,1.045,z,.76,.14,.065,m.cream);
  box(-4.55,1.028,1.04,.54,.006,.42,m.water);
  beam([-4.97,1.02,1.06],[-4.97,1.40,1.06],.018,m.brass);beam([-4.97,1.40,1.06],[-4.66,1.40,1.06],.018,m.brass);beam([-4.66,1.40,1.06],[-4.66,1.33,1.06],.018,m.brass);
  cyl(-4.96,1.15,.85,.03,.04,.045,m.brass);box(-4.96,1.18,.85,.12,.015,.02,m.brass);
  // Flour, a scored loaf, a knife and the cup left on a folded towel.
  const board=softBox(-4.47,1.001,2.39,.72,.042,.68,m.wood);board.rotation.y=-.10;
  ball(-4.50,1.10,2.46,.21,m.crust,root,1.10,.53,.73);
  for(let j=0;j<4;j++){const cut=box(-4.65+j*.09,1.20,2.46,.012,.006,.19,m.cutBread);cut.rotation.z=.14;}
  for(let j=0;j<2;j++){const b=ball(-4.24+j*.07,1.06,2.68,.10,m.crust,root,.36,1,.83);b.rotation.x=.25;ball(-4.217+j*.07,1.065,2.68,.090,m.cutBread,root,.12,.86,.8);}
  box(-4.48,1.032,2.06,.34,.012,.035,m.iron);box(-4.23,1.032,2.06,.19,.027,.047,m.darkWood);
  const towel=box(-4.48,.994,3.05,.66,.015,.43,m.linen);box(-4.07,.76,3.05,.025,.45,.43,m.linen);
  mug(-4.42,1.011,3.05,m.celadon,root,Math.PI*.2);
  jar(-4.90,.987,1.76,.13,.27,m.cream,root,'FLOUR').rotation.y=Math.PI/2;jar(-4.87,.987,2.22,.089,.21,m.celadon,root,'SALT').rotation.y=Math.PI/2;
  bowl(-4.73,.983,2.97,.17,m.ochre);for(let i=0;i<4;i++)ball(-4.73+(rng()-.5)*.17,1.10,2.97+(rng()-.5)*.15,.058,m.red);
  // West wall shelf, crockery and suspended kitchen implements.
  for(const y of [1.77,2.38]){box(-4.93,y,2.01,.38,.065,2.94,m.wood);for(const z of [.68,3.30])beam([-5.12,y-.31,z],[-4.78,y-.035,z],.045,m.iron,root,true);}
  for(let j=0;j<7;j++)jar(-4.93,1.81,.82+j*.37,.076+.016*(j%2),.19+(j%3)*.06,[m.cream,m.celadon,m.ochre][j%3],root,['TEA','SAGE','OATS','HONEY','PEPPER','RICE','ANISE'][j]).rotation.y=Math.PI/2;
  for(let j=0;j<6;j++){const p=bowl(-4.92,2.42,.95+j*.35,.12,j%2?m.cream:m.celadon);if(j<2)bowl(-4.92,2.47,.95+j*.35,.12,m.cream);}
  beam([-4.97,1.57,1.4],[-4.97,1.57,2.80],.018,m.iron);
  for(let j=0;j<4;j++){const z=1.48+j*.34;torus(-4.95,1.52,z,.035,.009,m.iron,root,0);beam([-4.91,1.50,z],[-4.87,1.25,z],.012,m.wood);ball(-4.87,1.20,z,.05,j%2?m.copper:m.wood,root,.35,1,1);}
  // Cast-iron range set into a brick hearth.
  box(-.90,.095,1.01,1.65,.13,1.53,m.darkStone);solid(-.90,.87,1.52,1.35,'range');
  box(-.91,.50,.86,1.27,.80,1.12,m.iron);box(-.91,.94,.86,1.40,.09,1.19,m.darkStone);
  for(const x of [-1.27,-.57]){cyl(x,.994,.78,.237,.237,.015,m.iron);torus(x,1.008,.78,.16,.010,m.darkStone);}
  box(-.91,.54,1.43,1.05,.53,.054,m.darkStone);box(-1.13,.54,1.468,.45,.40,.025,m.iron);box(-.62,.54,1.468,.38,.40,.025,m.iron);
  box(-1.13,.48,1.486,.31,.15,.014,m.black);for(let j=0;j<5;j++)box(-1.255+j*.062,.48,1.498,.016,.145,.01,m.ember);
  for(const x of [-1.14,-.62]){beam([x-.10,.70,1.50],[x+.10,.70,1.50],.016,m.brass);}
  cyl(-.87,2.50,.39,.092,.092,3.03,m.iron);torus(-.87,1.30,.39,.095,.016,m.iron);torus(-.87,2.65,.39,.095,.016,m.iron);torus(-.87,3.90,.39,.105,.020,m.iron);
  for(let iz=0;iz<8;iz++)for(let ix=0;ix<4;ix++)box(-1.51+ix*.37+(iz%2)*.07,.15+iz*.26,.074,.351,.238,.09,m.brick);
  const kettle=group(-1.25,1.01,.79);ball(0,.14,0,.20,m.copper,kettle,1,.83,1);cyl(0,.285,0,.116,.133,.035,m.copper,kettle);ball(0,.326,0,.035,m.darkWood,kettle);beam([.12,.13,0],[.31,.28,0],.040,m.copper,kettle);const kh=torus(0,.26,0,.18,.02,m.iron,kettle,0);kh.scale.y=1.2;
  const pan=cyl(-.55,1.04,.84,.21,.18,.065,m.iron);beam([-.35,1.06,.84],[-.03,1.07,.91],.022,m.darkWood);
  basket(-1.88,.08,.59,.20,.29);for(let j=0;j<7;j++)beam([-2.00+rng()*.2,.13,.54],[-1.98+rng()*.18,.42,.60],.044,m.darkWood);
  // Breakfast nook: small table, two spindle chairs, botanical print and abandoned knitting.
  const dinner=table(-3.82,4.60,1.65,1.03,.77,m.paleWood);solid(-3.82,4.60,1.68,1.05,'breakfast table');
  box(-3.68,.816,4.60,.50,.010,1.06,m.linen);
  for(let j=0;j<2;j++){cyl(-3.98+j*.70,.821,4.53,.21,.20,.016,m.cream);torus(-3.98+j*.70,.833,4.53,.18,.009,m.celadon);}
  mug(-3.57,.812,4.85,m.ochre,root,-.8);jar(-4.30,.812,4.79,.068,.12,m.amberGlass,root,'JAM');bottle(-4.31,.812,4.38,.075,.27,m.celadon);leaf(-4.31,1.09,4.38,.20,.7,.1,0,-.5,m.leaf);
  function chair(x,z,ry=0){const g=group(x,0,z,ry);for(let i=0;i<4;i++)box(-.17+i*.114,.44,0,.102,.05,.46,m.wood,g);for(const a of [-1,1])for(const b of [-1,1])beam([a*.18,.03,b*.18],[a*.16,.43,b*.16],.033,m.darkWood,g);for(const a of [-1,1])beam([a*.18,.44,.17],[a*.20,1.04,.21],.029,m.wood,g);for(let j=0;j<4;j++)beam([-.15+j*.10,.47,.19],[-.15+j*.10,.97,.21],.016,m.wood,g);box(0,1.01,.21,.46,.095,.06,m.wood,g);ao(0,.068,0,.64,.64,g);solid(x,z,.52,.54,'chair');return g;}
  chair(-3.77,5.49);chair(-2.68,4.56,Math.PI/2);
  const knit=basket(-4.80,.065,5.55,.20,.24);for(let j=0;j<3;j++)ball(-.10+j*.09,.26,.01,.08,j%2?m.plum:m.cream,knit);beam([-.12,.29,0],[.20,.57,.05],.006,m.paleWood,knit);beam([.10,.28,0],[-.17,.58,.05],.006,m.paleWood,knit);
  box(-5.10,1.82,4.75,.06,.88,.63,m.darkWood);const art=plaque(-5.059,1.82,4.75,.52,.73,['SALVIA','✦','A good herb','for a bad day'],{background:'#ded5b2',ink:'#405d46',height:384,width:256},root,Math.PI/2);
  art.material.dispose();art.material=botanicalMaterial();
  // Handmade botanical sketches on the kitchen-side partition.
  plaque(.165,1.66,4.62,.70,.90,['A FIELD GUIDE','to useful weeds','✧','Borrowed from','the garden'],{height:384,width:256,background:'#ded0ac',ink:'#51604b'},root,-Math.PI/2);

  // The workroom bench runs along the east wall, leaving a wide central aisle.
  const work=table(4.64,2.37,1.02,3.63,.91,m.darkWood);solid(4.64,2.37,1.09,3.66,'magical workbench');
  for(let j=0;j<3;j++)box(4.68,.60,1.18+j*1.12,.94,.11,.98,m.wood);
  for(let j=0;j<4;j++){box(4.10,.73,.94+j*.78,.055,.20,.66,m.wood);const handle=torus(4.059,.73,.94+j*.78,.037,.009,m.brass,root,0);handle.rotation.y=Math.PI/2;}
  for(let j=0;j<3;j++){basket(4.57,.15,1.09+j*1.22,.23,.26);jar(4.85,.155,1.38+j*1.05,.14,.34,m.terra);}
  // A botanical folio, clearly visible from the aisle.
  const folio=group(4.46,.966,2.71,-Math.PI/2);
  box(0,.015,0,.65,.033,.47,m.bookGreen,folio);
  for(const side of [-1,1]){const pg=box(side*.155,.044,0,.30,.022,.44,m.paper,folio);pg.rotation.z=side*.08;}
  for(let j=0;j<7;j++)box(-.155,.063,-.155+j*.043,.21,.002,.005,m.darkWood,folio);
  beam([.10,.063,-.14],[.16,.064,.13],.004,m.stem,folio);
  for(let j=0;j<5;j++){const l=leaf(.12,.066,-.11+j*.045,.075,.55,-Math.PI/2,j%2?-.8:.8,0,m.leafDark,folio);}
  box(.07,.048,.28,.018,.003,.17,m.red,folio);
  const quill=group(4.73,.96,3.28);bottle(0,0,0,.055,.10,m.purpleGlass,quill);beam([0,.09,0],[.10,.43,.04],.004,m.cream,quill);leaf(.032,.20,.012,.26,.28,0,0,-.29,m.cream,quill);
  bowl(4.38,.95,1.51,.16,m.darkStone);beam([4.30,1.01,1.50],[4.41,1.22,1.48],.035,m.darkStone);
  jar(4.85,.95,1.22,.10,.25,m.celadon,root,'NETTLE');jar(4.80,.95,1.64,.09,.21,m.ochre,root,'ROOT');
  for(let j=0;j<5;j++)bottle(4.72+(j%2)*.20,.95,1.88+Math.floor(j/2)*.22,.046,.16+(j%3)*.03,[m.bottleGlass,m.purpleGlass,m.amberGlass][j%3]);
  // A small balance, a bronze armillary and a quietly impossible stone stack.
  const scale=group(4.70,.96,.82);cyl(0,.027,0,.15,.18,.055,m.brass,scale);beam([0,.05,0],[0,.49,0],.018,m.brass,scale);beam([-.24,.43,0],[.24,.45,0],.012,m.brass,scale);
  for(const side of [-1,1]){for(const dz of [-.07,.07])beam([side*.22,.44,0],[side*.22,.22,dz],.0035,m.brass,scale);bowl(side*.22,.18,0,.10,m.brass,scale);}
  const arm=group(4.57,.96,3.79);cyl(0,.02,0,.19,.22,.04,m.darkWood,arm);cyl(0,.12,0,.026,.065,.20,m.brass,arm);const ag=group(0,.40,0,0,arm);ag.rotation.z=.34;
  torus(0,0,0,.25,.011,m.brass,ag,0);torus(0,0,0,.20,.010,m.brass,ag,Math.PI/2);const ring=torus(0,0,0,.22,.008,m.brass,ag,Math.PI/2);ring.rotation.y=.7;ball(0,0,0,.076,m.glow,ag);
  for(let j=0;j<3;j++){const rock=ball(4.21,1.04+j*.135,2.09,.065,m.darkStone,root,1,.55,.80);rock.rotation.y=j*1.7;}
  candle(4.26,.95,3.43,.18);mug(4.27,.95,2.40,m.plum,root,1.2);
  // A low three-legged stool is pushed to the end of the bench.
  cyl(3.86,.49,3.88,.245,.23,.063,m.wood);
  for(let j=0;j<3;j++){const a=j*2.094;beam([3.86+Math.sin(a)*.23,.065,3.88+Math.cos(a)*.23],[3.86+Math.sin(a)*.14,.46,3.88+Math.cos(a)*.14],.031,m.darkWood);}
  torus(3.86,.23,3.88,.185,.014,m.wood);ao(3.86,.075,3.88,.72,.72);solid(3.86,3.88,.53,.53,'workroom stool');
  // Shelves on the east wall. Jars face the aisle, and lower labels can be inspected.
  const shelfY=[1.61,2.11,2.56];
  for(let level=0;level<3;level++){
    const y=shelfY[level];box(5.02,y,2.41,.39,.068,4.70,m.wood);
    for(const z of [.20,2.39,4.58])beam([5.20,y-.24,z],[4.85,y-.03,z],.040,m.darkWood,root,true);
    for(let j=0;j<13;j++){
      const z=.26+j*.355;const g=group(5.01,y+.039,z,-Math.PI/2);
      if((j+level)%5===0){for(let k=0;k<3;k++)book(-.095+k*.077,0,0,.070,.25+(k%2)*.035,.17,[m.bookRed,m.bookGold,m.bookGreen][k],g);}
      else if((j+level)%4===0)bottle(0,0,0,.061,.31,m.purpleGlass,g);
      else if((j+level)%3===0)bottle(0,0,0,.072,.27,m.amberGlass,g,level===0?['DUSK','RAIN','THYME'][j%3]:null);
      else jar(0,0,0,.085,.22+(j%3)*.04,[m.celadon,m.cream,m.terra,m.ochre][(j+level)%4],g,level===0?['ASH','SEEDS','MOSS','TEA'][j%4]:null);
    }
  }
  // Apothecary hutch against the south wall: crowded, but entirely out of the path.
  box(2.91,1.30,5.66,3.46,2.54,.56,m.darkWood);solid(2.91,5.61,3.52,.69,'apothecary hutch');
  ao(2.91,.075,5.45,3.9,1.20);
  box(2.91,1.32,5.359,3.20,2.34,.034,m.blueWood);
  for(const x of [1.20,2.34,3.48,4.62])box(x,1.35,5.32,.085,2.56,.65,m.wood);
  for(const y of [.14,.83,1.40,1.98,2.59])box(2.91,y,5.32,3.49,.075,.69,m.wood);
  box(2.91,2.65,5.30,3.70,.12,.77,m.darkWood);
  for(let i=0;i<9;i++){box(1.43+i*.365,.47,5.015,.324,.53,.055,m.wood);box(1.43+i*.365,.52,4.98,.105,.051,.02,m.brass);nail(1.43+i*.365,.39,4.975);}
  for(let level=0;level<3;level++)for(let j=0;j<12;j++){
    const x=1.38+j*.26,y=.88+level*.575;
    const g=group(x,y,5.24,Math.PI);
    if(j%4===0){for(let k=0;k<3;k++)book(-.07+k*.068,0,0,.060,.29+(k%2)*.09,.21,[m.bookBlue,m.bookGreen,m.bookRed][k],g);}
    else if(j%5===0)bowl(0,0,0,.12,m.ochre,g);
    else if(j%3===0)bottle(0,0,0,.068,.32,m.bottleGlass,g,level===1?'DEW':null);
    else jar(0,0,0,.087,.25+(j%2)*.07,[m.cream,m.celadon,m.plum][(j+level)%3],g,level===1?['PETALS','SLEEP','SALT','WISHES'][j%4]:null);
  }
  plaque(2.91,2.70,4.89,1.16,.12,['A PLACE FOR EVERYTHING, ALMOST'],{width:768,height:80,background:'#6a583d',ink:'#e7d1a4',border:false},root,Math.PI);
  // Noticeboard on the partition: lists, pressed sprigs and a key on a nail.
  box(.405,1.70,4.65,.08,1.04,.79,m.darkWood);
  plaque(.451,1.80,4.68,.61,.73,['THURSDAY','Bread. Repot rue.','Return the moon.','Feed the starter.'],{width:384,height:512,background:'#dbcba6',ink:'#514a35',border:false},root,Math.PI/2);
  // A rolled rug grounds the aisle without changing collision or floor height.
  box(2.19,.080,3.12,1.29,.013,2.31,m.linen);
  for(const x of [1.61,2.77])box(x,.088,3.12,.027,.002,2.22,m.red);
  for(const z of [1.99,4.24])for(let j=0;j<20;j++)box(1.59+j*.063,.082,z,.011,.004,.13,m.paper);

  // Greenhouse: brick base, slender aged timber framing and individually fitted glazing.
  for(const x of [-.37,5.30]){box(x,.25,-2.16,.18,.50,4.32,m.brick);solid(x,-2.12,.20,4.35,'greenhouse side');}
  box(2.47,.25,-4.27,5.84,.50,.18,m.brick);solid(2.47,-4.27,5.86,.20,'greenhouse back');
  const bayZ=[-.08,-1.13,-2.18,-3.23,-4.27];
  for(const x of [-.36,5.29]){
    for(const z of bayZ){box(x,1.56,z,.10,2.21,.10,m.paintedWood);box(x,2.64,z,.15,.12,.14,m.paintedWood);}
    for(const y of [.53,1.52,2.66])box(x,y,-2.15,.085,.08,4.35,m.paintedWood);
    for(let j=0;j<4;j++)for(let k=0;k<2;k++)box(x,1.02+k*1.08,-.605-j*1.047,.021,.96,.95,m.glass);
  }
  for(let j=0;j<6;j++){const x=-.36+j*1.13;box(x,1.57,-4.27,.09,2.18,.10,m.paintedWood);}
  for(const y of [.53,1.52,2.66])box(2.47,y,-4.27,5.75,.08,.08,m.paintedWood);
  for(let j=0;j<5;j++)for(let k=0;k<2;k++)box(.205+j*1.13,1.02+k*1.08,-4.27,1.035,.96,.02,m.glass);
  const ghSlope=Math.atan2(.94,2.82),ghLen=Math.hypot(.94,2.82);
  box(2.47,3.62,-2.15,.11,.14,4.38,m.paintedWood);
  for(const z of bayZ){beam([-.38,2.68,z],[2.47,3.63,z],.080,m.paintedWood,root,true);beam([2.47,3.63,z],[5.31,2.68,z],.08,m.paintedWood,root,true);}
  for(const side of [-1,1])for(let j=0;j<4;j++){
    const glass=box(2.47+side*1.42,3.15,-.605-j*1.047,ghLen-.07,.017,.96,m.glass);glass.rotation.z=-side*ghSlope;
    const rail=box(2.47+side*1.42,3.15,-2.16,.055,.07,4.32,m.paintedWood);rail.rotation.z=-side*ghSlope;
  }
  // Rear triangular lights below the glazed pitched roof.
  const gt=new THREE.Shape();gt.moveTo(-2.80,0);gt.lineTo(2.80,0);gt.lineTo(0,.91);gt.closePath();mesh(new THREE.ShapeGeometry(gt),m.glass,2.47,2.70,-4.27);
  beam([2.47,2.65,-4.27],[2.47,3.59,-4.27],.050,m.paintedWood,root,true);
  // Unobtrusive garden beyond the glazing: ground, close boundary wall and soft foliage.
  box(0,-.24,0,29,.12,24,m.outside);
  for(let j=0;j<28;j++){const x=-6.6+j*.48;box(x,.49,-5.58,.45,.97,.29,j%3?m.darkStone:m.stone);box(x,.995,-5.58,.48,.10,.36,m.darkStone);}
  for(let j=0;j<16;j++){const x=-5+j*.73;ball(x,1.21,-6.20,.62,m.leafDark,root,1,.75,.70);ball(x+.2,1.48,-6.41,.50,m.leaf,root,1,.74,.65);}
  // Planting benches, open-slatted lower shelves and trays.
  function plantingBench(x,z,w,d){const g=table(x,z,w,d,.80,m.paleWood);for(let k=0;k<Math.floor(w/.18);k++)box(-w/2+.10+k*.18,.29,0,.13,.035,d-.08,m.wood,g);solid(x,z,w,d,'planting bench');return g;}
  plantingBench(.08,-2.31,.65,3.27);plantingBench(4.76,-2.26,.71,3.38);plantingBench(2.43,-3.82,3.96,.65);
  for(let j=0;j<5;j++)plant(.09,.84,-.96-j*.61,.15+.01*(j%2),.24,j%2?'fern':'herb');
  for(let j=0;j<5;j++)plant(4.75,.84,-.99-j*.59,.17,.28,['tall','flower','fern','tall','succulent'][j]);
  for(let j=0;j<6;j++)plant(.87+j*.60,.84,-3.82,.17,.27,['succulent','flower','herb','moon','fern','tall'][j]);
  // A climbing bean is trained along the back glazing, so leaves read in silhouette.
  const vine=[[3.87,1.09,-3.83],[3.78,1.49,-4.11],[3.96,1.88,-4.13],[3.82,2.23,-4.13],[4.09,2.52,-4.13],[3.84,2.64,-4.13]];
  for(let j=0;j<vine.length-1;j++)beam(vine[j],vine[j+1],.009,m.stem);
  for(let j=1;j<vine.length;j++){
    const [x,y,z]=vine[j],side=j%2?1:-1;beam([x,y,z],[x+side*.18,y+.04,z+.03],.005,m.stem);
    leaf(x+side*.18,y+.04,z+.03,.28,.86,.08,0,-side*.53,m.leafDark);
    leaf(x,y-.02,z+.04,.19,.75,.22,0,side*.83,m.leaf);
  }
  for(let j=0;j<3;j++){const pod=ball(3.72+j*.047,2.19-j*.035,-4.06,.042,m.leafSilver,root,.45,2.7,.42);pod.rotation.z=.1+j*.1;}
  // Pots waiting for spring, a bag of compost, a coil of twine and a watering can.
  for(let j=0;j<7;j++){pot(.09,.33,-1.0-j*.39,.115,.16);if(j%2===0)pot(.09,.42,-1.0-j*.39,.12,.16);}
  for(let j=0;j<4;j++)pot(4.73,.33,-1.25-j*.58,.15,.24);
  const sack=ball(4.70,.44,-3.57,.21,m.linen,root,1,1.35,.85);torus(4.70,.66,-3.57,.091,.027,m.paleWood);
  const can=group(3.86,.07,-3.21,.27);cyl(0,.20,0,.19,.21,.37,m.blueWood,can);torus(0,.39,0,.19,.018,m.iron,can);cyl(0,.386,0,.12,.13,.010,m.black,can);beam([.13,.12,0],[.49,.47,0],.035,m.blueWood,can);const rose=cyl(.50,.48,0,.061,.038,.068,m.iron,can);rose.rotation.z=-.67;torus(-.18,.25,0,.18,.018,m.iron,can,0);
  solid(3.91,-3.26,.60,.50,'watering can');
  // The resident's improbable specimen: an illuminated moonwort under a simple wire support.
  const moonStand=table(3.59,-1.39,.65,.65,.51,m.darkWood);solid(3.59,-1.39,.72,.72,'specimen stand');plant(3.59,.56,-1.39,.23,.32,'moon');
  for(let j=0;j<3;j++){const a=j*2.094;beam([3.59+Math.sin(a)*.24,.81,-1.39+Math.cos(a)*.24],[3.59+Math.sin(a)*.14,1.48,-1.39+Math.cos(a)*.14],.006,m.brass);}
  torus(3.59,1.42,-1.39,.17,.008,m.brass);
  plaque(3.59,.54,-1.014,.37,.13,['MOONWORT','Prefers a little doubt'],{width:384,height:128,border:false});
  // Greenhouse labels on tilted wood stakes.
  for(const [x,z,title] of [[.09,-1.57,'LEMON THYME'],[4.74,-1.58,'MIDNIGHT VIOLA'],[1.47,-3.81,'BEE BALM']]){
    beam([x,.88,z+.16],[x,1.17,z+.19],.009,m.paleWood);plaque(x,1.18,z+.194,.20,.07,[title],{width:384,height:96,border:false});
  }
  // Potting tray and small tools, placed beside the entry where they remain approachable.
  box(.12,.86,-.39,.62,.055,.38,m.darkWood);box(.12,.888,-.39,.53,.015,.28,m.soil);
  for(let i=0;i<3;i++){pot(-.06+i*.16,.90,-.42,.055,.067);leaf(-.06+i*.16,.96,-.42,.084,.7,.7,i*2,0,m.leafSilver);}
  beam([.11,.89,-.16],[.35,.89,-.09],.015,m.wood);ball(.40,.895,-.08,.05,m.iron,root,1.4,.17,.7);
  // Hanging plants use opaque curved blades, with no alpha-card overdraw.
  for(const [x,z] of [[.10,-2.52],[4.73,-2.79]]){
    const y=2.16;pot(x,y,z,.17,.20,m.terra);
    for(let k=0;k<3;k++){const a=k*2.094;beam([x+Math.sin(a)*.16,y+.18,z+Math.cos(a)*.16],[x,2.85,z],.004,m.paleWood);}
    for(let k=0;k<6;k++){const a=k*2.4,dx=Math.sin(a)*.2,dz=Math.cos(a)*.2;beam([x,y+.2,z],[x+dx,y-.37,z+dz],.005,m.stem);for(let j=0;j<5;j++)leaf(x+dx*j/5,y+.14-j*.1,z+dz*j/5,.13,.6,1.4,a+j,1.7,m.leafDark);}
  }
  // A few paper moths hover perfectly still near the warm lantern.
  for(let k=0;k<3;k++){const x=-2.28+k*.13,y=2.33+k*.14,z=2.74;leaf(x,y,z,.042,.95,1.5,k*.5,.7,m.paper);leaf(x,y,z,.042,.95,1.5,k*.5,-.7,m.paper);}
  // Drying herbs hang above the working zone, clear of heads and the main aisle.
  for(let k=0;k<3;k++){
    const x=-3.70+k*.50,z=.20;
    beam([x,2.98,z],[x,2.54,z],.006,m.paleWood);torus(x,2.53,z,.036,.010,m.paleWood);
    for(let j=0;j<7;j++){
      const tx=x+(rng()-.5)*.18,tz=z+(rng()-.5)*.12,end=2.17+rng()*.11;
      beam([x,2.55,z],[tx,end,tz],.005,m.stem);
      for(let v=0;v<3;v++)leaf(tx,2.23+v*.07,tz,.12,.39,.5,j*2.4,Math.PI,k%2?m.leafSilver:m.leafDark);
    }
  }
  // A tied garlic string beside the range, and a clay rest for a wooden spoon.
  beam([-1.76,2.63,.16],[-1.76,1.82,.16],.006,m.paleWood);
  for(let k=0;k<6;k++){const x=-1.76+(k%2?.04:-.04),y=2.32-k*.088;for(let j=0;j<5;j++)ball(x+Math.sin(j*1.26)*.028,y,.19+Math.cos(j*1.26)*.028,.029,m.cream,root,.85,1.2,.85);beam([x,y+.025,.18],[x+.012,y+.10,.18],.006,m.paleWood);}
  bowl(-4.70,.982,1.49,.092,m.celadon);beam([-4.68,1.012,1.46],[-4.33,1.025,1.59],.011,m.wood);ball(-4.74,1.014,1.438,.043,m.wood,root,1.3,.19,.68);

  // Lighting: cool overcast skylight, a warm shaded kitchen lamp, and two small accents.
  const hemi=new THREE.HemisphereLight('#d9edf0','#76614a',1.7);scene.add(hemi);
  const sky=new THREE.DirectionalLight('#d4e9ef',2.25);sky.position.set(-2.2,8,-5.5);sky.target.position.set(1,0,1);sky.castShadow=true;
  sky.shadow.mapSize.set(2048,2048);Object.assign(sky.shadow.camera,{left:-10,right:10,top:10,bottom:-10,near:1,far:24});sky.shadow.bias=-.00025;sky.shadow.normalBias=.035;sky.shadow.radius=2;scene.add(sky,sky.target);
  const warm=new THREE.PointLight('#ffca83',34,9,2);warm.position.set(-2.63,2.33,2.90);scene.add(warm);
  const kitchenFill=new THREE.PointLight('#ffdca5',10,6,2);kitchenFill.position.set(-3.7,1.9,4.8);scene.add(kitchenFill);
  const studyFill=new THREE.PointLight('#e2d8b5',17,7,2);studyFill.position.set(2.8,2.4,2.8);scene.add(studyFill);
  const magic=new THREE.PointLight('#91e8c9',1.5,1.9,2);magic.position.set(4.55,1.40,3.79);scene.add(magic);
  const ghMagic=new THREE.PointLight('#b4d9dc',1.5,2,2);ghMagic.position.set(3.59,1.2,-1.39);scene.add(ghMagic);
  const fire=new THREE.PointLight('#ff9c4b',3,2,2);fire.position.set(-1.1,.47,1.65);scene.add(fire);
  beam([-2.63,3.51,2.90],[-2.63,2.42,2.90],.014,m.iron);
  lathe([[.035,0],[.27,-.19],[.30,-.20],[.305,-.16],[.056,.04]],m.celadon,-2.63,2.57,2.90);ball(-2.63,2.38,2.90,.065,m.ember);torus(-2.63,2.375,2.90,.30,.014,m.brass);
  beam([2.85,3.43,3.3],[2.85,2.40,3.3],.012,m.iron);cyl(2.85,2.29,3.3,.15,.20,.24,m.ochre);ball(2.85,2.17,3.3,.055,m.ember);
  // Visual markers are real painted plaques, not floating interface labels.
  plaque(2.17,2.65,.072,.76,.15,['THE GLASSHOUSE'],{width:512,height:96,background:'#536f61',ink:'#eadcbd',border:false});

  // Bake all transforms and merge static meshes per material. Shared materials keep
  // hundreds of hand-placed props to a small set of draw submissions.
  root.updateMatrixWorld(true);
  const buckets=new Map();let sourceMeshes=0,triangles=0;
  root.traverse(o=>{
    if(!o.isMesh)return;sourceMeshes++;
    const key=o.material.uuid+':'+o.castShadow;
    if(!buckets.has(key))buckets.set(key,{material:o.material,cast:o.castShadow,geometries:[]});
    let g=o.geometry.clone().applyMatrix4(o.matrixWorld);
    if(g.index)g=g.toNonIndexed();
    if(!g.attributes.normal)g.computeVertexNormals();
    if(!g.attributes.uv)g.setAttribute('uv',new THREE.BufferAttribute(new Float32Array(g.attributes.position.count*2),2));
    // Standardize attributes so Shape, Lathe, Sphere and Box geometries batch together.
    for(const name of Object.keys(g.attributes))if(!['position','normal','uv'].includes(name))g.deleteAttribute(name);
    triangles+=g.attributes.position.count/3;buckets.get(key).geometries.push(g);
  });
  const batched=new THREE.Group();batched.name='Static cottage';
  for(const bucket of buckets.values()){
    const geom=mergeGeometries(bucket.geometries,false);
    if(!geom)throw new Error('Static material batching failed');
    geom.computeBoundingSphere();const o=new THREE.Mesh(geom,bucket.material);o.castShadow=bucket.cast;o.receiveShadow=true;batched.add(o);
    for(const g of bucket.geometries)g.dispose();
  }
  scene.remove(root);scene.add(batched);
  const disposed=new Set();root.traverse(o=>{if(o.isMesh&&!disposed.has(o.geometry)){disposed.add(o.geometry);o.geometry.dispose();}});
  return {scene,colliders,stats:{sourceMeshes,batches:buckets.size,triangles},lights:{sky},spawn:{x:-1.35,z:5.10,yaw:.45,pitch:-.07}};
}
