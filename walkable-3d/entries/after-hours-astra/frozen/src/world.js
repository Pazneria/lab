import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import * as A from './art.js';

export const room={minX:-3.8,maxX:3.8,minZ:-5.4,maxZ:5.4,alcoveMaxX:5.8,alcoveMinZ:1.3,alcoveMaxZ:4.4};
export const cabinetSpecs=[
 {name:'TIDAL CIRCUIT',tagline:'Follow the current',bank:'tide',type:'tide',accent:'#75d9cd',dark:'#163c46',x:-3.08,z:.18,rot:Math.PI/2,w:.98},
 {name:'DEEP SIGNAL',tagline:'A signal in the silence',bank:'tide',type:'signal',accent:'#95dcb7',dark:'#153747',x:-3.08,z:-1.43,rot:Math.PI/2,w:.98},
 {name:'SWITCHYARD',tagline:'The midnight connection',bank:'city',type:'rail',accent:'#ee9770',dark:'#4a2941',x:3.08,z:-1.4,rot:-Math.PI/2,w:1.06},
 {name:'SUNSET RUNNER',tagline:'Take the long way home',bank:'city',type:'road',accent:'#efa26d',dark:'#49364d',x:3.08,z:.20,rot:-Math.PI/2,w:1.06},
 {name:'MOONWAKE',tagline:'Night courier',bank:'feature',type:'moon',accent:'#e5b875',dark:'#16263a',x:0,z:-3.35,rot:0,w:1.62}
];

export function createWorld(scene){
 scene.environment=A.environmentMap();scene.environmentIntensity=.32;
 const root=new THREE.Group();scene.add(root);const colliders=[];const screens=[];const materials=new Map();
 const mats={
  wall:std('#476165',.91,0,A.surfaceMap('plaster')),lower:std('#20363d',.82),ceiling:std('#202c35',1),wood:std('#cbb495',.63,0,A.surfaceMap('wood')),
  darkWood:std('#80715c',.72,0,A.surfaceMap('wood')),black:std('#10161b',.65),rubber:std('#090e14',.94),steel:std('#8a979c',.38,.75),brass:std('#ba9159',.35,.65),darkMetal:std('#35414b',.38,.7),
  cream:std('#d7cbb0',.48),paper:std('#dfd0aa',.92),red:std('#b9594c',.4),navy:std('#1c3049',.45),plastic:std('#263e49',.3),ceramic:std('#c8c0ad',.25),floor:std('#d6caba',1,0,A.carpetMap())
 };
 for(const [m,scale]of [[mats.floor,.005],[mats.wall,.005],[mats.wood,.002],[mats.darkWood,.002]]){m.bumpMap=m.map;m.bumpScale=scale;}
 function std(color,roughness=.6,metalness=0,map=null){const key=[color,roughness,metalness,map?.uuid].join('|');if(materials.has(key))return materials.get(key);const m=new THREE.MeshStandardMaterial({color,roughness,metalness,map});materials.set(key,m);return m;}
 function basic(map,color=0xffffff,bright=1){return new THREE.MeshBasicMaterial({map,color:new THREE.Color(color).multiplyScalar(bright),toneMapped:false});}
 function mesh(g,m,p=[0,0,0],r=[0,0,0],parent=root){const o=new THREE.Mesh(g,m);o.position.set(...p);o.rotation.set(...r);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 function box(s,p,m,r=[0,0,0],parent=root){return mesh(new THREE.BoxGeometry(...s),m,p,r,parent);}
 function plane(s,p,m,r=[0,0,0],parent=root){const o=mesh(new THREE.PlaneGeometry(...s),m,p,r,parent);o.castShadow=false;return o;}
 function cyl(radius,h,p,m,r=[0,0,0],parent=root,segments=16){return mesh(new THREE.CylinderGeometry(radius,radius,h,segments),m,p,r,parent);}
 function sphere(radius,p,m,parent=root){return mesh(new THREE.SphereGeometry(radius,16,12),m,p,[0,0,0],parent);}
 function tube(points,r,m,parent=root){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));return mesh(new THREE.TubeGeometry(curve,Math.max(10,points.length*5),r,6,false),m,[0,0,0],[0,0,0],parent);}
 function sign(lines,s,p,r=[0,0,0],options={},parent=root){const map=A.label(lines,options);return plane(s,p,new THREE.MeshStandardMaterial({map,roughness:.76}),r,parent);}
 function screw(x,y,z,parent=root,rot=[Math.PI/2,0,0]){cyl(.011,.006,[x,y,z],mats.steel,rot,parent,8);box([.010,.0015,.002],[x,y,z+.004],mats.black,[0,0,.35],parent);}
 function addCollider(x,z,hx,hz,name){colliders.push({minX:x-hx,maxX:x+hx,minZ:z-hz,maxZ:z+hz,name});}
 const shadowMaterial=new THREE.MeshBasicMaterial({map:A.contactShadow(),transparent:true,opacity:.73,depthWrite:false,toneMapped:false});
 function shadow(x,z,w,d,parent=root){plane([w,d],[x,.008,z],shadowMaterial,[-Math.PI/2,0,0],parent);}
 const glowTexture=A.texture(A.canvas(128,128,(c)=>{const g=c.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'#ffffff68');g.addColorStop(.35,'#ffffff28');g.addColorStop(1,'#ffffff00');c.fillStyle=g;c.fillRect(0,0,128,128);}));
 function pool(x,z,w,d,color,opacity=.18){plane([w,d],[x,.012,z],new THREE.MeshBasicMaterial({map:glowTexture,color,transparent:true,opacity,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false}),[-Math.PI/2,0,0]);}
 function point(color,intensity,p,range=6){const l=new THREE.PointLight(color,intensity,range,2);l.position.set(...p);scene.add(l);return l;}
 function emissive(color,power=1){return new THREE.MeshBasicMaterial({color:new THREE.Color(color).multiplyScalar(power),toneMapped:false});}
 const warmLight=emissive('#f1c58d',1.15),coolLight=emissive('#91d7cc',.9);

 // The room footprint: a single hall and one open side alcove.
 box([7.6,.16,10.8],[0,-.085,0],mats.black);
 box([2,.16,3.1],[4.8,-.085,2.85],mats.black);
 for(const [w,d,x,z]of [[7.6,10.8,0,0],[2,3.1,4.8,2.85]]){
  const geo=new THREE.PlaneGeometry(w,d);geo.rotateX(-Math.PI/2);geo.translate(x,0,z);
  const uv=geo.attributes.uv,p=geo.attributes.position;
  for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+3.8)/7.6,(5.4-p.getZ(i))/10.8);
  mesh(geo,mats.floor);
 }
 box([.18,3.32,10.98],[-3.89,1.58,0],mats.wall);
 box([7.8,3.32,.18],[0,1.58,-5.49],mats.wall);
 box([.18,3.32,6.7],[3.89,1.58,-2.05],mats.wall);
 box([.18,3.32,1],[3.89,1.58,4.9],mats.wall);
 box([2,3.32,.18],[4.8,1.58,1.21],mats.wall);
 box([2,3.32,.18],[4.8,1.58,4.49],mats.wall);
 box([.18,3.32,3.46],[5.89,1.58,2.85],mats.wall);
 box([7.8,.14,11],[0,3.29,0],mats.ceiling);
 box([2,.14,3.28],[4.8,3.29,2.85],mats.ceiling);
 // Walnut wainscot, cap rails, and skirting make the room feel furnished.
 for(const [length,p,rot]of [[10.8,[-3.785,.53,0],Math.PI/2],[7.6,[0,.53,-5.385],0],[6.7,[3.785,.53,-2.05],Math.PI/2],[1,[3.785,.53,4.9],Math.PI/2],[3.1,[5.785,.53,2.85],Math.PI/2],[2,[4.8,.53,1.315],0],[2,[4.8,.53,4.385],0]]){
  box([length,1.05,.034],p,mats.lower,[0,rot,0]);box([length,.07,.075],[p[0],1.055,p[2]],mats.darkWood,[0,rot,0]);box([length,.11,.045],[p[0],.055,p[2]],mats.black,[0,rot,0]);
  const n=Math.floor(length/.43);for(let i=1;i<n;i++){const offset=-length/2+i*length/n;box([.019,.88,.047],[p[0]+Math.cos(rot)*offset,.52,p[2]-Math.sin(rot)*offset],mats.darkWood,[0,rot,0]);}
 }
 // Ceiling beams and inset acoustic tiles.
 for(let z=-4.8;z<5;z+=1.6){box([7.58,.12,.075],[0,3.17,z],mats.darkMetal);for(let x=-3.12;x<3.5;x+=1.56)box([1.45,.035,1.48],[x,3.198,z+.8],std('#28343c',1));}
 for(const x of [-2.6,2.6])box([.07,.1,10.7],[x,3.14,0],mats.darkMetal);
 for(const z of [-3.45,.0,3.35]){
  box([1.02,.085,.23],[0,3.035,z],mats.black);box([.90,.014,.14],[0,2.984,z],warmLight);
  if(z>-3)point('#ffd6a0',24,[0,2.85,z],7.5);pool(0,z,4.8,4.8,'#e4b175',.11);
  for(const x of [-.43,.43])cyl(.014,.16,[x,3.15,z],mats.steel);
 }
 box([1.0,.015,.07],[4.9,3.06,2.85],warmLight,[0,0,0]);point('#ffce94',20,[4.75,2.73,2.85],5.2);
 // HVAC register, speaker boxes, and conduit are tucked above eye level.
 box([.72,.035,.57],[-2.15,3.14,2.9],mats.darkMetal);for(let i=0;i<10;i++)box([.62,.018,.018],[-2.15,3.108,2.66+i*.052],mats.black);
 for(const x of [-3.35,3.35]){box([.30,.38,.28],[x,2.77,-4.97],mats.black,[.14,x<0?.25:-.25,0]);cyl(.103,.014,[x,2.77,-4.812],mats.darkMetal,[Math.PI/2,0,0]);cyl(.058,.018,[x,2.77,-4.800],mats.black,[Math.PI/2,0,0]);}
 tube([[-3.75,2.65,5.1],[-3.75,2.65,-5.1],[3.74,2.65,-5.1],[3.74,2.65,.6]],.013,mats.darkMetal);

 // Storefront. The night street is a painted procedural view beyond closed glass.
 box([7.8,.58,.18],[0,2.95,5.49],mats.wall);box([7.8,.38,.18],[0,.18,5.49],mats.lower);
 const street=basic(A.windowArt(),0xffffff,.65);
 for(const x of [-2.48,2.48]){
  box([2.3,2.34,.06],[x,1.54,5.445],mats.black);plane([2.18,2.19],[x,1.54,5.401],street,[0,Math.PI,0]);
  for(const X of [x-1.15,x+1.15])box([.065,2.4,.14],[X,1.56,5.37],mats.darkMetal);
  box([2.37,.065,.15],[x,2.74,5.37],mats.darkMetal);box([2.37,.08,.22],[x,.38,5.33],mats.darkWood);box([2.3,.028,.05],[x,1.98,5.33],mats.brass);
  // Fine horizontal blinds gathered at the tops of the two windows.
  for(let i=0;i<7;i++)box([2.24,.027,.07],[x,2.7-i*.035,5.28],mats.darkWood,[.3,0,0]);
 }
 box([1.54,2.7,.12],[0,1.35,5.43],mats.darkMetal);plane([1.38,2.47],[0,1.39,5.358],street,[0,Math.PI,0]);
 for(const x of [-.77,0,.77])box([.055,2.7,.13],[x,1.35,5.31],mats.brass);
 box([1.58,.07,.13],[0,2.7,5.31],mats.brass);box([1.48,.09,.03],[0,.12,5.26],mats.steel);
 for(const x of [-.13,.13])tube([[x,.96,5.24],[x,.98,5.14],[x,1.32,5.14],[x,1.34,5.24]],.018,mats.brass);
 sign(['AFTER HOURS','NEIGHBORHOOD ARCADE'],[2.55,.39],[0,2.96,5.382],[0,Math.PI,0],{bg:'#263e44',fg:'#e5c794',accent:'#aeb8a4',height:160});
 sign(['OPEN LATE','COME AS YOU ARE'],[.61,.32],[.42,1.85,5.265],[0,Math.PI,0],{bg:'#193d40',fg:'#b9e5c9',accent:'#adc8b6'});
 sign(['THANKS FOR','STOPPING BY'],[.44,.29],[-.4,1.62,5.26],[0,Math.PI,0],{bg:'#d7c390',fg:'#283d3f',accent:'#425b5d'});
 sign(['PUSH'],[.13,.10],[.19,1.10,5.10],[0,Math.PI,0],{bg:'#a4977d',fg:'#162832',width:256,height:128});
 box([1.88,.014,1.08],[0,.013,4.73],std('#303637',1));plane([1.65,.83],[0,.023,4.73],new THREE.MeshStandardMaterial({map:A.label(['AFTER HOURS','MAKE YOURSELF AT HOME'],{bg:'#323c3d',fg:'#a89673',accent:'#716e5b'}),roughness:1}),[-Math.PI/2,0,0]);
 pool(0,4.2,5,3,'#718db0',.13);

 // Wall posters and a little bench near the entrance.
 function poster(kind,p,rot){const g=new THREE.Group();g.position.set(...p);g.rotation.y=rot;root.add(g);box([.76,1.04,.035],[0,0,0],mats.darkWood,[0,0,0],g);plane([.695,.967],[0,0,.023],new THREE.MeshStandardMaterial({map:A.posterArt(kind),roughness:.86}),[0,0,0],g);for(const x of [-.335,.335])for(const y of [-.465,.465])screw(x,y,.029,g);}
 poster(0,[-3.735,1.97,3.56],Math.PI/2);poster(1,[3.735,1.96,4.88],-Math.PI/2);
 box([.61,.14,1.68],[-3.27,.46,2.45],mats.darkWood);box([.51,.08,1.58],[-3.25,.57,2.45],std('#935a3e',.84));
 for(const z of [1.79,3.11])for(const x of [-3.47,-3.05])box([.055,.4,.055],[x,.23,z],mats.darkMetal);
 box([.12,.61,1.7],[-3.56,.81,2.45],mats.darkWood,[0,0,-.09]);addCollider(-3.29,2.45,.40,.9,'bench');shadow(-3.25,2.45,1.3,2.15);
 sign(['HOUSE RULES','BE KIND. TAKE TURNS.','NO DRINKS ON THE GAMES.'],[.65,.44],[-3.729,1.63,1.55],[0,Math.PI/2,0],{bg:'#253b40',fg:'#e8d6b0',accent:'#aaad91'});
 // Rear identity plaque and thin picture rail.
 sign(['AFTER HOURS','A NEIGHBORHOOD ORIGINAL'],[2.58,.46],[0,2.79,-5.375],[0,0,0],{bg:'#253b43',fg:'#dfbe84',accent:'#a3ac9f',width:1024,height:200});
 box([7.55,.038,.027],[0,2.46,-5.367],mats.brass);
 for(const x of [-2.53,2.53]){box([.12,.32,.08],[x,1.98,-5.29],mats.brass);box([.25,.08,.14],[x,2.11,-5.24],mats.black);box([.16,.2,.04],[x,1.97,-5.231],warmLight);}

 function sideShell(points,width,m,parent,x=0){const s=new THREE.Shape();points.forEach((p,i)=>i?s.lineTo(...p):s.moveTo(...p));s.closePath();const geo=new THREE.ExtrudeGeometry(s,{depth:width,bevelEnabled:false,steps:1});geo.rotateY(-Math.PI/2);geo.translate(x+width/2,0,0);return mesh(geo,m,[0,0,0],[0,0,0],parent);}
 function shapedSideArt(points,x,m,parent){
  const s=new THREE.Shape();const lo=Math.min(...points.map(p=>p[0])),hi=Math.max(...points.map(p=>p[0]));const bottom=Math.min(...points.map(p=>p[1])),top=Math.max(...points.map(p=>p[1]));
  points.forEach((p,i)=>{const z=(p[0]-(lo+hi)/2)*.96+(lo+hi)/2,y=(p[1]-(bottom+top)/2)*.955+(bottom+top)/2;i?s.lineTo(z,y):s.moveTo(z,y);});s.closePath();
  const geo=new THREE.ShapeGeometry(s);const uv=geo.attributes.uv,p=geo.attributes.position;
  for(let i=0;i<p.count;i++){const u=(p.getX(i)-lo)/(hi-lo);uv.setXY(i,x<0?u:1-u,(p.getY(i)-bottom)/(top-bottom));}
  geo.rotateY(-Math.PI/2);geo.translate(x,0,0);const material=m.clone();material.side=THREE.DoubleSide;mesh(geo,material,[0,0,0],[0,0,0],parent);
 }
 function sideTrim(points,x,m,parent,r=.012){for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];tube([[x,a[1],a[0]],[x,b[1],b[0]]],r,m,parent);}}
 function button(x,y,z,color,parent,r=.036){cyl(r*1.23,.019,[x,y,z],mats.black,[0,0,0],parent);const profile=[[0,0],[r*.9,0],[r,.005],[r,.019],[r*.87,.028],[0,.029]].map(p=>new THREE.Vector2(...p));mesh(new THREE.LatheGeometry(profile,20),std(color,.23),[x,y+.005,z],[0,0,0],parent);}
 function joystick(x,y,z,color,parent){cyl(.067,.008,[x,y,z],mats.rubber,[0,0,0],parent);cyl(.034,.025,[x,y+.015,z],mats.black,[0,0,0],parent);cyl(.012,.13,[x,y+.074,z],mats.steel,[.09,0,.1],parent,12);sphere(.046,[x-.007,y+.15,z+.007],std(color,.22),parent);}
 function coinDoor(w,parent,feature=false){
  const z=feature?.66:.477,y=.53;box([w*.54,.43,.038],[0,y,z],mats.black,[0,0,0],parent);box([w*.48,.365,.018],[0,y,z+.024],mats.darkMetal,[0,0,0],parent);
  for(const x of [-w*.118,w*.118]){box([.105,.156,.022],[x,y+.064,z+.041],mats.steel,[0,0,0],parent);box([.067,.025,.029],[x,y+.096,z+.06],mats.black,[0,0,0],parent);box([.052,.031,.028],[x,y+.032,z+.061],warmLight,[0,0,0],parent);box([.105,.08,.025],[x,y-.103,z+.046],mats.black,[0,0,0],parent);box([.09,.012,.032],[x,y-.136,z+.06],mats.steel,[0,0,0],parent);}
  cyl(.018,.012,[w*.202,y-.025,z+.042],mats.brass,[Math.PI/2,0,0],parent,12);
  for(const x of [-w*.224,w*.224])for(const Y of [y-.16,y+.16])screw(x,Y,z+.038,parent);
  sign(['25¢ • ONE TOKEN'],[w*.37,.058],[0,y+.247,z+.028],[0,0,0],{bg:'#c5b99c',fg:'#172129',width:512,height:80},parent);
 }
 function backDetails(spec,g,backZ){
  box([spec.w*.67,1.43,.022],[0,.89,backZ-.014],mats.black,[0,0,0],g);
  for(let i=0;i<12;i++)box([spec.w*.54,.014,.015],[0,.48+i*.027,backZ-.031],mats.darkMetal,[0,0,0],g);
  sign(['AFTER HOURS / SERVICE','SERIAL: AH-'+(spec.type==='moon'?'087-01':'086-'+spec.name.length),'AC 120V • KEEP VENTS CLEAR'],[spec.w*.46,.19],[0,1.22,backZ-.03],[0,Math.PI,0],{bg:'#b3ab95',fg:'#25313a',accent:'#485552',width:512,height:192},g);
  for(const x of [-spec.w*.29,spec.w*.29])for(const y of [.2,1.56])screw(x,y,backZ-.032,g);
  tube([[.21,.2,backZ-.07],[.23,.06,backZ-.14],[.40,.04,backZ-.23],[.43,.035,backZ-.41]],.012,mats.rubber,g);
 }

 for(const spec of cabinetSpecs){
  const g=new THREE.Group();g.position.set(spec.x,0,spec.z);g.rotation.y=spec.rot;root.add(g);const feature=spec.type==='moon';const w=spec.w;
  const painted=std(spec.dark,.46,0,A.surfaceMap('paint'));const edge=std(spec.accent,.4,.08);const sideMaterial=new THREE.MeshStandardMaterial({map:A.sideArt(spec),roughness:.5});
  painted.bumpMap=painted.map;painted.bumpScale=.0007;
  if(feature){
   // A wide, stepped observatory silhouette with crown and illuminated orbital ring.
   const points=[[-.71,.10],[.58,.10],[.67,.75],[.85,.98],[.84,1.15],[.59,1.26],[.24,1.88],[.48,2.18],[.35,2.46],[-.65,2.46],[-.71,2.18]];
   sideShell([[-.71,.10],[.58,.10],[.67,.75],[.85,.98],[.84,1.15],[.10,1.26],[0,2.18],[.30,2.46],[-.65,2.46],[-.71,2.18]],w-.06,painted,g);
   for(const x of [-w/2,w/2]){sideShell(points,.072,mats.cream,g,x);sideTrim(points,x+(x<0?-.044:.044),mats.brass,g,.019);shapedSideArt(points,x+(x<0?-.039:.039),sideMaterial,g);}
   box([w-.14,.14,1.30],[0,.11,-.03],mats.black,[0,0,0],g);box([w-.1,.08,.085],[0,.16,.661],mats.brass,[0,0,0],g);
   box([w-.13,.61,.20],[0,.55,.53],painted,[0,0,0],g);coinDoor(w,g,true);
   box([w+.12,.105,.64],[0,1.08,.53],mats.darkMetal,[.12,0,0],g);plane([w+.09,.62],[0,1.137,.53],new THREE.MeshStandardMaterial({map:A.controlArt(spec),roughness:.42}),[-Math.PI/2+.12,0,0],g);
   box([w+.16,.055,.045],[0,1.031,.852],mats.brass,[0,0,0],g);
   // Large screen is recessed within its stepped architectural surround.
   box([1.52,.99,.19],[0,1.78,.236],mats.brass,[-.13,0,0],g);box([1.46,.94,.205],[0,1.78,.250],mats.black,[-.13,0,0],g);
   screen(spec,[1.28,.78],[0,1.78,.362],-.13,g);
   for(const x of [-.705,.705]){box([.045,.92,.045],[x,1.77,.384],mats.cream,[-.13,0,0],g);for(let i=0;i<5;i++)box([.019,.065,.015],[x,1.52+i*.105,.414],edge,[0,0,0],g);}
   box([1.76,.35,.33],[0,2.39,.22],painted,[0,0,0],g);plane([1.65,.32],[0,2.39,.392],basic(A.marquee(spec)),[0,0,0],g);
   for(const y of [2.205,2.575])box([1.8,.025,.055],[0,y,.394],mats.brass,[0,0,0],g);
   const arch=new THREE.Shape();arch.moveTo(-.71,0);arch.lineTo(-.71,.13);arch.quadraticCurveTo(0,.62,.71,.13);arch.lineTo(.71,0);arch.closePath();const archGeo=new THREE.ExtrudeGeometry(arch,{depth:.14,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.015,bevelThickness:.012});mesh(archGeo,painted,[0,2.58,.07],[0,0,0],g);
   tube([[-.70,2.71,.237],[-.37,2.90,.237],[0,2.967,.237],[.37,2.90,.237],[.70,2.71,.237]],.014,mats.brass,g);
   mesh(new THREE.TorusGeometry(.125,.011,8,40),mats.brass,[0,2.765,.249],[0,0,0],g);cyl(.071,.012,[0,2.765,.254],warmLight,[Math.PI/2,0,0],g,32);
   for(const x of [-.91,.91]){box([.09,.86,.19],[x,1.92,.1],painted,[0,0,x<0?-.13:.13],g);box([.018,.67,.012],[x,1.97,.201],warmLight,[0,0,x<0?-.13:.13],g);}
   joystick(-.38,1.145,.53,'#dcc49b',g);button(.28,1.137,.59,'#e5a866',g,.047);button(.43,1.15,.49,'#72b7b8',g,.047);button(.58,1.13,.61,'#b97660',g,.047);
   cyl(.078,.033,[-.67,1.17,.40],mats.brass,[0,0,0],g,32);cyl(.063,.036,[-.67,1.188,.4],mats.black,[0,0,0],g,24);for(let i=0;i<10;i++){const a=i*Math.PI/5;box([.009,.02,.015],[-.67+Math.cos(a)*.064,1.20,.4+Math.sin(a)*.064],mats.brass,[0,-a,0],g);}
   backDetails(spec,g,-.715);addCollider(spec.x,spec.z,1.035,.86,'MOONWAKE');shadow(spec.x,spec.z,2.85,2.65);pool(spec.x,spec.z+1,3.8,3.2,spec.accent,.20);point('#e8b878',6,[0,1.82,-2.38],3.4);
  }else{
   const tide=spec.bank==='tide';const points=tide?[[-.49,.10],[.45,.10],[.48,.77],[.66,.96],[.63,1.11],[.26,1.18],[.10,1.72],[.31,1.83],[.30,2.16],[-.49,2.20]]:[[-.51,.09],[.46,.09],[.47,.80],[.68,.97],[.65,1.13],[.31,1.23],[.14,1.74],[.40,1.85],[.34,2.22],[-.48,2.22]];
   sideShell([[-.5,.10],[.45,.10],[.48,.77],[.64,1.00],[.55,1.10],[.015,1.19],[-.08,1.72],[.19,1.87],[.25,2.16],[-.49,2.20]],w-.06,painted,g);for(const x of [-w/2,w/2]){sideShell(points,.048,tide?painted:mats.cream,g,x);sideTrim(points,x+(x<0?-.028:.028),tide?edge:mats.red,g,.013);shapedSideArt(points,x+(x<0?-.026:.026),sideMaterial,g);}
   box([w-.12,.13,.96],[0,.115,-.005],mats.black,[0,0,0],g);box([w-.05,.07,.035],[0,.18,.497],mats.steel,[0,0,0],g);box([w-.08,.61,.06],[0,.57,.435],painted,[0,0,0],g);coinDoor(w,g);
   box([w+.07,.09,.48],[0,1.053,.439],mats.black,[.16,0,0],g);plane([w+.045,.46],[0,1.100,.447],new THREE.MeshStandardMaterial({map:A.controlArt(spec),roughness:.48}),[-Math.PI/2+.16,0,0],g);
   box([w+.09,.055,.028],[0,1.001,.689],tide?edge:mats.red,[0,0,0],g);
   box([w-.05,.70,.14],[0,1.528,.14],mats.black,[-.18,0,0],g);screen(spec,[w-.20,.56],[0,1.529,.222],-.18,g);
   // A small printed bezel carries the cabinet identity even up close.
   sign([spec.bank==='tide'?'DEEPWATER LABORATORIES':'CITYLINE ELECTRONICS'],[w-.21,.047],[0,1.186,.286],[0,0,0],{bg:spec.dark,fg:spec.accent,width:768,height:70},g);
   const hoodW=tide?w-.03:w+.14;
   box([hoodW,.30,.34],[0,2.010,.17],tide?painted:mats.red,[0,0,0],g);plane([hoodW-.05,.234],[0,2.023,.349],basic(A.marquee(spec),0xffffff,.92),[0,0,0],g);
   box([hoodW+.04,.027,.05],[0,2.165,.356],mats.darkMetal,[0,0,0],g);box([hoodW+.04,.030,.05],[0,1.871,.356],mats.darkMetal,[0,0,0],g);
   if(!tide)for(const x of [-w*.52,w*.52]){box([.065,.55,.16],[x,1.565,.22],mats.cream,[-.18,0,x<0?-.06:.06],g);box([.034,.47,.025],[x,1.56,.314],mats.red,[-.18,0,x<0?-.06:.06],g);}
   for(let i=0;i<12;i++)box([.019,.067,.022],[-w*.28+i*w*.051,1.815,.313],mats.black,[0,0,0],g);
   if(tide){joystick(-w*.23,1.107,.435,spec.accent,g);button(w*.16,1.103,.44,'#d6cbb0',g);button(w*.32,1.09,.53,spec.accent,g);}
   else{joystick(-w*.25,1.11,.436,'#d46658',g);for(let row=0;row<2;row++)for(let i=0;i<3;i++)button(w*.08+i*.122,1.105-row*.018,.42+row*.13,['#eaa673','#c26769','#d8c4a6'][i],g,.029);}
   button(-.07,1.131,.28,'#e4d9b6',g,.019);button(.015,1.131,.28,'#e4d9b6',g,.019);
   for(const x of [-w*.45,w*.45])for(const z of [.265,.61]){cyl(.01,.009,[x,1.105-(z-.44)*.16,z],mats.steel,[0,0,0],g,8);}
   // Fine, deliberate scuffs on the steel toe strip and deck edge.
   for(let i=0;i<7;i++)box([.018+i*.005,.002,.002],[-.27+i*.08,.199+(i%2)*.009,.517],mats.darkMetal,[0,0,.2],g);
   backDetails(spec,g,-.5);addCollider(spec.x,spec.z,.72,w/2+(tide?.035:.10),spec.name);shadow(spec.x,spec.z,2,1.6);
   const frontX=spec.x+Math.sin(spec.rot)*.85;pool(frontX,spec.z,2.3,2.3,spec.accent,.12);
  }
  // Feet lift every cabinet just off the carpet.
  for(const x of [-w*.39,w*.39])for(const z of [-.38,.37])cyl(.045,.095,[x,.054,z],mats.rubber,[0,0,0],g);
 }
 function screen(spec,size,p,tilt,parent){
  // Slight convexity gives the phosphor face and its protective glass a real
  // profile at oblique viewpoints, without another render pass or reflection.
  const curved=()=>{const geo=new THREE.PlaneGeometry(size[0],size[1],24,20),v=geo.attributes.position;for(let i=0;i<v.count;i++){const u=v.getX(i)/(size[0]/2),t=v.getY(i)/(size[1]/2);v.setZ(i,.021*(1-u*u)*(1-t*t));}geo.computeVertexNormals();return geo;};
  const m=basic(A.screenArt(spec),0xffffff,.92);const panel=mesh(curved(),m,p,[tilt,0,0],parent);panel.castShadow=false;screens.push(panel);
  // Subtle glass reflections, baked as a separate transparent texture.
  const glass=A.texture(A.canvas(256,256,c=>{c.clearRect(0,0,256,256);const g=c.createLinearGradient(0,0,210,256);g.addColorStop(0,'#b5d7e520');g.addColorStop(.25,'#b5d7e506');g.addColorStop(.6,'#b5d7e500');g.addColorStop(1,'#b5d7e50a');c.fillStyle=g;c.fillRect(0,0,256,256);c.fillStyle='#c9e5ed09';c.beginPath();c.moveTo(14,0);c.lineTo(33,0);c.lineTo(151,256);c.lineTo(132,256);c.fill();}));
  const cover=mesh(curved(),new THREE.MeshBasicMaterial({map:glass,transparent:true,depthWrite:false,toneMapped:false}),[p[0],p[1]+.001,p[2]+.003],[tilt,0,0],parent);cover.castShadow=false;
 }
 point('#78c6c8',5,[-2.20,1.75,-.7],4.2);point('#eb906f',5,[2.20,1.77,-.6],4.2);
 // Above-bank strips tint the walls without hiding their surface or trim.
 box([.038,.026,3.13],[-3.727,2.43,-.66],coolLight);box([.038,.026,3.13],[3.727,2.46,-.65],emissive('#e3a37c',.9));
 for(const x of [-3.73,3.73]){box([.026,.10,.08],[x,.30,.97],mats.cream);tube([[x,.28,.97],[x-.08*Math.sign(x),.04,.9],[x-.2*Math.sign(x),.035,.78]],.01,mats.rubber);}

 // Counter alcove: laminated oak, a token tray, an everyday stool, and small prizes.
 const counterX=5.08,counterZ=2.92;
 box([.91,.96,2.03],[counterX,.51,counterZ],mats.darkWood);box([1.02,.08,2.17],[counterX,1.025,counterZ],mats.cream);box([1.045,.025,2.19],[counterX,1.076,counterZ],mats.wood);
 box([.025,.047,2.22],[counterX-.532,1.061,counterZ],mats.brass);box([.90,.12,2.02],[counterX,.09,counterZ],mats.black);
 for(let z=2.02;z<3.91;z+=.14)box([.018,.78,.037],[counterX-.462,.54,z],mats.darkWood);
 sign(['TOKENS','4 FOR $1'],[.66,.31],[counterX-.486,.71,counterZ],[0,-Math.PI/2,0],{bg:'#23383d',fg:'#e6c995',accent:'#b5a985'});
 addCollider(counterX,counterZ,.69,1.12,'counter');shadow(counterX,counterZ,1.7,2.8);
 // Foot rail on the visitor side, set close to the counter.
 tube([[4.52,.18,2.04],[4.45,.18,2.11],[4.45,.18,3.72],[4.52,.18,3.81]],.025,mats.brass);
 // Register, LCD, buttons, drawer, cable.
 box([.32,.15,.36],[5.12,1.18,3.51],mats.darkMetal);box([.30,.21,.12],[5.17,1.34,3.57],mats.plastic,[0,0,-.27]);
 sign(['4.00'],[.20,.075],[5.007,1.37,3.57],[0,-Math.PI/2,0],{bg:'#14292b',fg:'#b8cc91',width:256,height:80});
 for(let i=0;i<4;i++)for(let j=0;j<3;j++)box([.032,.012,.038],[4.99+i*.047,1.263,3.38+j*.05],j===2?mats.cream:mats.black);
 box([.012,.065,.29],[4.946,1.171,3.51],mats.steel);tube([[5.25,1.12,3.56],[5.42,1.095,3.68],[5.59,1.08,3.87],[5.66,.60,3.90]],.007,mats.rubber);
 // Token tray with distinct ridges and scattered brass coins.
 box([.34,.032,.44],[4.89,1.103,2.70],mats.darkMetal);for(const x of [4.72,5.06])box([.018,.045,.46],[x,1.125,2.70],mats.brass);for(const z of [2.48,2.92])box([.35,.045,.018],[4.89,1.125,z],mats.brass);
 const rng=A.random(64);for(let i=0;i<19;i++){const x=4.77+rng()*.22,z=2.53+rng()*.31,y=1.128+(i%4)*.005;cyl(.025,.007,[x,y,z],mats.brass,[0,0,0],root,20);cyl(.018,.001,[x,y+.004,z],mats.darkWood,[0,0,0],root,16);}
 sign(['PLEASE TAKE A TOKEN','AND A LITTLE TIME.'],[.31,.23],[5.02,1.099,2.15],[-Math.PI/2,0,Math.PI/2],{bg:'#d9c89d',fg:'#28424a',accent:'#6b7a71'});
 // Mug with lip, tea, and a handle; pencil cup sits behind it.
 cyl(.071,.15,[5.32,1.17,2.22],mats.ceramic,[0,0,0],root,24);cyl(.061,.003,[5.32,1.247,2.22],std('#654333',.2),[0,0,0],root,24);mesh(new THREE.TorusGeometry(.065,.009,8,24),mats.ceramic,[5.32,1.248,2.22],[Math.PI/2,0,0]);mesh(new THREE.TorusGeometry(.043,.012,8,20),mats.ceramic,[5.397,1.18,2.22],[0,0,0]);
 cyl(.04,.125,[5.42,1.156,3.07],mats.plastic);for(let i=0;i<4;i++)cyl(.004,.22,[5.40+i*.012,1.24,3.075],i%2?mats.brass:mats.red,[.06*i,0,.07*i]);
 // Stool outside the passage, tucked into the alcove's back corner.
 const sx=5.22,sz=1.65;cyl(.235,.095,[sx,.65,sz],std('#936651',.66),[0,0,0],root,32);cyl(.244,.027,[sx,.59,sz],mats.steel,[0,0,0],root,32);
 for(let i=0;i<4;i++){const a=i*Math.PI/2+.785;const x=Math.cos(a),z=Math.sin(a);tube([[sx+x*.145,.59,sz+z*.145],[sx+x*.20,.06,sz+z*.20]],.016,mats.steel);cyl(.025,.035,[sx+x*.2,.035,sz+z*.2],mats.rubber);}
 mesh(new THREE.TorusGeometry(.178,.012,6,32),mats.steel,[sx,.24,sz],[Math.PI/2,0,0]);addCollider(sx,sz,.27,.27,'stool');shadow(sx,sz,.9,.9);
 // Open-backed prize shelves facing the room.
 for(const y of [1.62,2.18]){box([.31,.055,1.78],[5.62,y,2.98],mats.wood);for(const z of [2.27,3.67])box([.10,.28,.036],[5.72,y-.14,z],mats.darkMetal);}
 for(let i=0;i<5;i++){
  const z=2.27+i*.345;const color=['#dcb872','#7bb7b0','#c57c72','#bfc29b','#9d9bb6'][i];const mat=std(color,.48);box([.18,.25,.24],[5.62,1.775,z],mat);sign(['AH','PRIZE'],[.19,.15],[5.525,1.79,z],[0,-Math.PI/2,0],{bg:color,fg:'#28383e',accent:'#344247',width:128,height:128});
 }
 for(let i=0;i<4;i++){const z=2.40+i*.40,m=std(['#dab57f','#9ab4ab','#bb7770','#819daf'][i],.6);sphere(.078,[5.63,2.40,z],m);sphere(.054,[5.63,2.51,z],m);sphere(.025,[5.62,2.56,z-.04],m);sphere(.025,[5.62,2.56,z+.04],m);for(const a of [-1,1])sphere(.007,[5.58,2.52,z+a*.023],mats.black);box([.1,.04,.17],[5.63,2.28,z],mats.cream);}
 sign(['THE TOKEN COUNTER','A LITTLE CHANGE GOES A LONG WAY'],[1.65,.38],[5.762,2.77,2.92],[0,-Math.PI/2,0],{bg:'#253d42',fg:'#ead0a0',accent:'#9aada4',width:1024,height:240});
 sign(['BACK IN A MOMENT','MAKE YOURSELF AT HOME'],[.54,.25],[4.10,1.77,1.322],[0,0,0],{bg:'#d9c89b',fg:'#283b42',accent:'#697365'});
 // Alcove edge detail reads as a real opening without a doorway to collide with.
 for(const z of [1.31,4.39])box([.075,3.14,.075],[3.82,1.57,z],mats.darkWood);box([.075,.12,3.12],[3.82,3.08,2.85],mats.darkWood);

 // Lighting uses no full-screen effects and just one compact shadow map.
 scene.add(new THREE.HemisphereLight('#a7c2da','#69503b',.76));scene.add(new THREE.AmbientLight('#ddd2bd',.18));
 const key=new THREE.SpotLight('#f4d7ad',42,10,1.06,.75,2);key.position.set(0,3.10,-1.2);key.target.position.set(0,.8,-3.5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.bias=-.0005;key.shadow.normalBias=.025;key.shadow.camera.near=.4;key.shadow.camera.far=9;scene.add(key,key.target);
 // Merge rigid geometry by material once. Detail does not imply one draw call per screw.
 const batching=mergeStatic(root);
 return {colliders,screens,key,root,stats:{...batching,cabinets:cabinetSpecs.length,lights:scene.children.filter(c=>c.isLight).length}};
}

function mergeStatic(root){
 root.updateMatrixWorld(true);const byMaterial=new Map();let before=0;
 root.traverse(o=>{if(!o.isMesh)return;before++;if(o.material.transparent)return;const key=o.material.uuid;if(!byMaterial.has(key))byMaterial.set(key,{material:o.material,geometries:[],objects:[]});const entry=byMaterial.get(key);let geometry=o.geometry.clone();geometry.applyMatrix4(o.matrixWorld);if(geometry.index)geometry=geometry.toNonIndexed();if(!geometry.attributes.uv)geometry.setAttribute('uv',new THREE.Float32BufferAttribute(new Float32Array(geometry.attributes.position.count*2),2));geometry.deleteAttribute('uv1');geometry.deleteAttribute('tangent');entry.geometries.push(geometry);entry.objects.push(o);});
 let count=0,triangles=0;
 for(const entry of byMaterial.values()){const geometry=mergeGeometries(entry.geometries,false);if(!geometry)throw new Error('Static geometry merge failed.');geometry.computeBoundingSphere();const object=new THREE.Mesh(geometry,entry.material);object.castShadow=true;object.receiveShadow=true;root.add(object);for(const old of entry.objects){old.removeFromParent();old.geometry.dispose();}entry.geometries.forEach(g=>g.dispose());triangles+=geometry.attributes.position.count/3;count++;}
 let transparent=0;root.traverse(o=>{if(o.isMesh&&o.material.transparent)transparent++;});return {meshesBeforeBatching:before,opaqueBatches:count,transparentMeshes:transparent,staticTriangles:triangles};
}
