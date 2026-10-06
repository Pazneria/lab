import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {seeded,labelMaterial} from './materials.js';
import {FLOOR,WATER,RAMP,PIER,DECK,WORKSHOP,BOAT,terrainHeight,FIXED_OBSTACLES,nearInspectionRoute} from './layout.js';

const UP=new THREE.Vector3(0,1,0),v3=(x,y,z)=>new THREE.Vector3(x,y,z);
export function buildWorld(scene,M){
 const rng=seeded(7331),batches=new Map(),colliders=FIXED_OBSTACLES.map(o=>({...o})),details={boards:0,stones:0};
 const transform=new THREE.Matrix4(),q=new THREE.Quaternion(),e=new THREE.Euler();
 function add(geo,mat,pos=[0,0,0],rot=[0,0,0],scale=[1,1,1],shadow=true){
  geo=geo.index?geo.toNonIndexed():geo;geo.deleteAttribute('color');geo.deleteAttribute('tangent');
  if(!geo.getAttribute('uv'))geo.setAttribute('uv',new THREE.BufferAttribute(new Float32Array(geo.getAttribute('position').count*2),2));
  e.set(...rot);q.setFromEuler(e);transform.compose(v3(...pos),q,v3(...scale));geo.applyMatrix4(transform);
  const key=mat.uuid+(shadow?'s':'n');if(!batches.has(key))batches.set(key,{mat,shadow,list:[]});batches.get(key).list.push(geo);
 }
 function boardGeometry(w,h,d){
  const g=new THREE.BoxGeometry(w,h,d),uv=g.attributes.uv,p=g.attributes.position,n=g.attributes.normal;
  for(let i=0;i<p.count;i++){
   const axes=[Math.abs(n.getX(i)),Math.abs(n.getY(i)),Math.abs(n.getZ(i))];const norm=axes.indexOf(Math.max(...axes));
   let a,b;if(norm===0){a=2;b=1;}else if(norm===1){a=0;b=2;}else{a=0;b=1;}
   const dims=[w,h,d];if(dims[a]<dims[b]) [a,b]=[b,a];const coords=[p.getX(i),p.getY(i),p.getZ(i)];
   uv.setXY(i,coords[a]/2.0+.5,coords[b]/.52+.5);
  }
  return g;
 }
 function box(x,y,z,w,h,d,mat=M.wood,rot=[0,0,0],shadow=true){add(boardGeometry(w,h,d),mat,[x,y,z],rot,[1,1,1],shadow);}
 function cyl(x,y,z,r1,r2,h,mat=M.wood,segments=10,rot=[0,0,0],shadow=true){const g=new THREE.CylinderGeometry(r1,r2,h,segments);if([M.wood,M.warmWood,M.darkWood,M.wetWood,M.teal,M.cream].includes(mat)){const uv=g.attributes.uv;for(let i=0;i<uv.count;i++){const u=uv.getX(i),v=uv.getY(i);uv.setXY(i,v*h/2,u*Math.PI*(r1+r2)/.52);}}add(g,mat,[x,y,z],rot,[1,1,1],shadow);}
 function sphere(x,y,z,r,mat,scale=[1,1,1],detail=1,shadow=true){add(new THREE.IcosahedronGeometry(r,detail),mat,[x,y,z],[0,rng()*6,0],scale,shadow);}
 function beam(a,b,width,depth,mat=M.wood){const va=v3(...a),vb=v3(...b),dir=vb.clone().sub(va);const g=boardGeometry(width,dir.length(),depth);g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(UP,dir.normalize()));add(g,mat,va.add(vb).multiplyScalar(.5).toArray());}
 function pole(a,b,r,mat=M.iron,seg=8){const va=v3(...a),vb=v3(...b),dir=vb.clone().sub(va);const g=new THREE.CylinderGeometry(r,r,dir.length(),seg);g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(UP,dir.normalize()));add(g,mat,va.add(vb).multiplyScalar(.5).toArray());}
 function tube(points,r,mat=M.rope,steps=64,radial=6,closed=false){const path=new THREE.CatmullRomCurve3(points.map(p=>v3(...p)),closed,'centripetal');const geo=new THREE.TubeGeometry(path,steps,r,radial,closed);if(mat===M.rope){const uv=geo.attributes.uv,repeat=path.getLength()*1.8;for(let i=0;i<uv.count;i++)uv.setX(i,uv.getX(i)*repeat);}add(geo,mat);}
 function torus(x,y,z,r,t,mat=M.iron,rot=[Math.PI/2,0,0],arc=Math.PI*2){add(new THREE.TorusGeometry(r,t,6,24,arc),mat,[x,y,z],rot);}
 function plank(x,y,z,w,h,d,mat,rot=[0,0,0]){box(x,y,z,w,h,d,mat||M.woods[Math.floor(rng()*M.woods.length)],rot);details.boards++;}
 function obstacle(x,z,w,d,angle=0){colliders.push({x,z,hx:w/2,hz:d/2,angle});}
 function plaque(text,x,y,z,w,h,rot=[0,0,0],options={}){const mat=labelMaterial(text,options);add(new THREE.PlaneGeometry(w,h),mat,[x,y,z],rot,[1,1,1],false);}
 function bolt(x,y,z,axis='y',size=.010){cyl(x,y,z,size,size,.008,M.iron,6,axis==='z'?[Math.PI/2,0,0]:axis==='x'?[0,0,Math.PI/2]:[0,0,0]);}
 function cleat(x,y,z,angle=0){box(x,y+.025,z,.15,.035,.09,M.iron,[0,angle,0]);cyl(x,y+.07,z,.025,.033,.085,M.iron,8);box(x,y+.115,z,.30,.043,.055,M.iron,[0,angle,0]);bolt(x-.05,y+.047,z);bolt(x+.05,y+.047,z);}
 function coil(x,y,z,r=.25,turns=5){const pts=[];for(let i=0;i<=turns*32;i++){let a=i/32*Math.PI*2,rr=r*(.45+.55*i/(turns*32));pts.push([x+Math.cos(a)*rr,y+.023+Math.sin(a*2)*.008,z+Math.sin(a)*rr*.84]);}tube(pts,.017,M.rope,turns*32,5);tube([[x+r,y+.02,z],[x+r+.18,y+.022,z+.18],[x+r+.32,y+.021,z+.12]],.017,M.rope,12,5);}
 function contact(x,z,w,d,y=null){const g=new THREE.PlaneGeometry(w,d,4,8);g.rotateX(-Math.PI/2);const p=g.attributes.position;for(let i=0;i<p.count;i++){const px=p.getX(i)+x,pz=p.getZ(i)+z;p.setXYZ(i,px,(y===null?terrainHeight(px,pz):y)+.008,pz);}g.computeVertexNormals();add(g,M.contact,[0,0,0],[0,0,0],[1,1,1],false);}

 // The visible intertidal ground is one continuous mesh; no disconnected floors.
 const ground=new THREE.PlaneGeometry(110,100,110,100);ground.rotateX(-Math.PI/2);ground.translate(0,0,-25);
 const gp=ground.attributes.position,guv=ground.attributes.uv,colors=[];
 for(let i=0;i<gp.count;i++){
  const x=gp.getX(i),z=gp.getZ(i),h=terrainHeight(x,z);gp.setY(i,h);guv.setXY(i,x/5,z/5);
  const wet=THREE.MathUtils.smoothstep(z,5,11),grass=1-THREE.MathUtils.smoothstep(z,-9,-2);
  const color=new THREE.Color(0xc7bea0).lerp(new THREE.Color(0x657a6d),wet*.8).lerp(new THREE.Color(0x657452),grass*.55);
  color.multiplyScalar(.94+rng()*.12);colors.push(color.r,color.g,color.b);
 }
 ground.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));ground.computeVertexNormals();
 const terrainMat=M.sand.clone();terrainMat.vertexColors=true;
 terrainMat.onBeforeCompile=shader=>{
  shader.vertexShader='varying float vShoreWet;\n'+shader.vertexShader;
  shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvShoreWet = smoothstep(5.0, 11.0, position.z);');
  shader.fragmentShader='varying float vShoreWet;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor = mix(0.96, 0.40, vShoreWet);');
 };
 terrainMat.customProgramCacheKey=()=> 'stillwater-damp-shore-v1';
 const terrain=new THREE.Mesh(ground,terrainMat);terrain.receiveShadow=true;terrain.name='Continuous exposed shoreline';scene.add(terrain);

 // Stone foundation and retaining apron. Dark courses mark the historic tide.
 for(let x=-3.55;x<3.6;x+=.59)for(let row=0;row<2;row++){
  const xx=x+(row%2)*.22;box(xx,.49+row*.28,-6.02,.56,.25,.43,M.stones[Math.floor(rng()*5)]);
 }
 for(const x of [-3.6,3.6])for(let z=-5.8;z<1.15;z+=.65){box(x,.65,z,.46,.58,.61,M.stones[Math.floor(rng()*5)]);}
 for(let x=-3.3;x<3.6;x+=.62){box(x,.65,1.16,.59,.58,.45,M.stones[Math.floor(rng()*5)]);box(x,.39,1.20,.61,.13,.48,M.wetStone);}

 // Workshop floor: separate long planks, eased gaps and worn edge strips.
 for(let x=-3.48;x<3.6;x+=.29){
  for(let n=0;n<3;n++){const z=-4.78+n*2.42;plank(x,1.16,z,.274,.18,2.394);for(const end of [-1.1,1.1]){bolt(x-.087,FLOOR+.003,z+end);bolt(x+.087,FLOOR+.003,z+end);}}
 }
 box(0,1.10,-2.35,7.35,.14,7.45,M.darkWood);
 // Front and rear frames.
 const eave=4.12,ridge=5.63;
 const posts=[[-3.62,-6.02],[-3.62,-2.4],[-3.62,1.20],[3.62,-6.02],[3.62,-2.4],[3.62,1.20],[-1.22,1.20],[1.22,1.20]];
 for(const [x,z]of posts){plank(x,2.69,z,.19,2.96,.19,M.darkWood);box(x,1.46,z,.205,.24,.205,M.wetWood);for(let h of [1.63,3.9])bolt(x, h,z+.104,'z',.025);}
 for(const x of [-3.61,3.61])plank(x,4.06,-2.4,.21,.23,7.45,M.darkWood);
 for(const z of [-6.02,1.20])plank(0,4.06,z,7.42,.23,.21,M.darkWood);
 plank(0,1.45,-6.02,7.40,.25,.18,M.darkWood);
 for(const x of [-2.44,2.44])plank(x,1.45,1.20,2.42,.25,.18,M.darkWood);
 plank(0,1.244,1.20,2.35,.012,.20,M.warmWood);
 // Vertical salt-grey siding with real window openings.
 for(const x of [-3.63,3.63])for(let z=-5.84;z<1.2;z+=.235){
  const window=(z>-4.75&&z<-2.55)||(z>-.95&&z<.42);
  if(window){plank(x,1.73,z,.12,.95,.221);plank(x,3.88,z,.12,.33,.221);}
  else plank(x,2.66,z,.12,2.68,.221);
  plank(x+(x<0?-.064:.064),1.56,z,.013,.38,.221,M.wetWood);
  for(const y of [1.83,3.91]){bolt(x+(x<0?-.068:.068),y,z,'x',.009);}
 }
 for(let x=-3.45;x<3.6;x+=.235){
  const backWindow=x>-1.3&&x<1.3;
  if(backWindow){plank(x,1.83,-6.06,.222,1.12,.12);plank(x,3.84,-6.06,.222,.39,.12);}
  else plank(x,2.65,-6.06,.222,2.71,.12);
  if(Math.abs(x)>1.28){const win=Math.abs(x)>1.67&&Math.abs(x)<3.1;if(win){plank(x,1.80,1.22,.222,1.06,.12);plank(x,3.89,1.22,.222,.29,.12);}else plank(x,2.65,1.22,.222,2.70,.12);}
 }
 // Side window assemblies. Thin glass avoids heavy transparency overdraw.
 function sideWindow(x,z,w){
  box(x,2.28,z,.21,.105,w+.24,M.cream);box(x,3.63,z,.17,.10,w+.22,M.cream);
  for(const zz of [z-w/2,z+w/2])box(x,2.95,zz,.16,1.42,.08,M.cream);
  box(x,2.97,z,.12,1.30,.055,M.cream);box(x,2.96,z,.12,.05,w,M.cream);
  add(new THREE.PlaneGeometry(w-.04,1.24),M.glass,[x,2.96,z],[0,Math.PI/2,0],[1,1,1],false);
 }
 for(const x of [-3.68,3.68]){sideWindow(x,-3.64,2.1);sideWindow(x,-.27,1.37);}
 function frontWindow(x,z,w){
  box(x,2.36,z,w+.2,.12,.23,M.cream);box(x,3.70,z,w+.17,.09,.16,M.cream);
  for(const xx of [x-w/2,x+w/2])box(xx,3.02,z,.085,1.39,.16,M.cream);
  box(x,3.02,z,.055,1.32,.12,M.cream);box(x,3.03,z,w,.05,.12,M.cream);
  add(new THREE.PlaneGeometry(w-.05,1.25),M.glass,[x,3.02,z],[0,0,0],[1,1,1],false);
 }
 for(const x of [-2.37,2.37])frontWindow(x,1.28,1.43);frontWindow(0,-6.10,2.63);
 // Triangular gable boarding follows the roof pitch.
 for(const z of [-6.03,1.22])for(let x=-3.5;x<3.6;x+=.235){const height=1.56*(1-Math.abs(x)/3.94);if(height>.02)plank(x,4.10+height/2,z,.222,height,.14);}
 for(const z of [-6.12,1.33]){beam([-3.88,4.05,z],[0,5.66,z],.19,.18,M.cream);beam([0,5.66,z],[3.88,4.05,z],.19,.18,M.cream);}
 // Rafters and roof underside stay visible from inside.
 for(let z=-6.0;z<1.3;z+=1.18){beam([-3.78,4.08,z],[0,5.56,z],.12,.17,M.warmWood);beam([0,5.56,z],[3.78,4.08,z],.12,.17,M.warmWood);}
 for(const z of [-4.8,-1.2]){plank(0,3.95,z,7.2,.16,.14,M.darkWood);beam([-3.43,3.1,z],[-2.6,3.93,z],.13,.14,M.darkWood);beam([3.43,3.1,z],[2.6,3.93,z],.13,.14,M.darkWood);}
 // Individual standing-seam weathered metal roof sheets, closed at the ridge.
 const roofAngle=Math.atan2(1.55,3.94),roofLength=Math.hypot(3.94,1.55);
 for(const side of [-1,1]){
  for(let z=-6.2;z<1.63;z+=.63){box(side*1.97,4.91,z,roofLength,.085,.615,M.roofs[Math.floor(rng()*M.roofs.length)],[0,0,-side*roofAngle]);beam([side*.015,5.72,z-.302],[side*3.97,4.16,z-.302],.028,.035,M.roofEdge);}
  box(side*3.96,4.095,-2.36,.12,.17,8.24,M.roofEdge);
  tube([[side*3.9,4.08,-6.4],[side*3.9,4.04,-2.4],[side*3.9,4.02,1.55]],.055,M.roofEdge,20,8);
 }
 cyl(0,5.69,-2.35,.10,.10,8.23,M.roofEdge,10,[Math.PI/2,0,0]);
 tube([[3.94,4.02,-5.5],[4.07,3.82,-5.5],[4.07,1.23,-5.5],[4.3,.99,-5.5]],.045,M.roofEdge,16,7);
 // Door leaves folded open against the front wall; doorway remains clear.
 for(const side of [-1,1]){
  const center=side*1.82;
  for(let i=0;i<6;i++)plank(center+(i-2.5)*.18,2.35,1.43,.17,2.12,.105,M.teal);
  for(const y of [1.61,3.08])box(center,y,1.51,1.12,.13,.065,M.darkWood);
  beam([center-.48,1.7,1.51],[center+.48,3.04,1.51],.09,.08,M.darkWood);
  for(const y of [1.78,2.96]){box(side*1.24,y,1.57,.40,.045,.028,M.iron);bolt(side*1.28,y,1.588,'z');}
  torus(center+side*.32,2.31,1.515,.053,.009,M.iron,[0,0,0]);
 }
 box(0,3.69,1.30,2.5,.19,.24,M.darkWood);plaque('STILLWATER',0,4.36,1.321,2.78,.43,[0,0,0],{font:'60px Georgia',sub:'BOAT REPAIR  /  EST. 1938',height:220});

 // The working bench, drawers, vise and an intentionally arranged tool rack.
 box(2.72,2.09,-3.52,1.17,.15,3.42,M.warmWood);box(2.72,1.92,-3.52,1.05,.22,3.27,M.darkWood);
 for(const x of [2.27,3.15])for(const z of [-4.92,-2.10])plank(x,1.65,z,.11,.76,.12,M.darkWood);
 plank(2.71,1.48,-3.5,.94,.07,2.93,M.wood);
 for(let z=-4.6;z<-2.1;z+=.79){box(2.153,1.92,z,.02,.18,.72,M.warmWood);box(2.126,1.92,z,.035,.025,.19,M.iron);}
 // Tool board on east wall.
 box(3.535,3.14,-3.60,.055,.93,2.05,M.darkWood);
 for(let i=0;i<7;i++){
  const z=-4.41+i*.255;bolt(3.49,3.40,z,'x');
  if(i%3===0){cyl(3.43,3.08,z,.026,.034,.52,M.warmWood,8);box(3.43,3.30,z,.08,.065,.22,M.steel);}
  else if(i%3===1){box(3.43,3.15,z,.05,.46,.045,M.steel);cyl(3.43,2.90,z,.031,.038,.16,M.red,8);}
  else{torus(3.43,3.3,z,.054,.011,M.iron,[0,Math.PI/2,0]);box(3.43,3.11,z,.035,.29,.04,M.iron);}
 }
 // Bench plane, shavings, square, handsaw, paint pot and mug.
 box(2.55,2.22,-3.05,.23,.11,.47,M.darkWood);box(2.55,2.29,-3.03,.10,.095,.24,M.iron);torus(2.55,2.32,-2.98,.073,.018,M.warmWood,[0,Math.PI/2,0]);
 for(let i=0;i<15;i++){const x=2.26+rng()*.6,z=-2.66+rng()*.45;torus(x,2.175+rng()*.016,z,.019+rng()*.035,.005,M.warmWood,[Math.PI/2,(rng()-.5),rng()*3],Math.PI*1.6);}
 box(2.54,2.18,-3.64,.45,.012,.04,M.steel,[0,.13,0]);box(2.73,2.185,-3.48,.04,.018,.35,M.darkWood,[0,.13,0]);
 const sawShape=new THREE.Shape();sawShape.moveTo(0,0);sawShape.lineTo(.54,.036);sawShape.lineTo(.54,.13);
 for(let i=18;i>=0;i--){sawShape.lineTo(i*.029,.14+(i%2)*.018+(18-i)*.0018);}sawShape.lineTo(0,0);
 add(new THREE.ExtrudeGeometry(sawShape,{depth:.004,bevelEnabled:false,steps:1}),M.steel,[2.44,2.19,-4.23],[-Math.PI/2,0,0]);torus(2.36,2.196,-4.34,.085,.023,M.warmWood,[Math.PI/2,0,.1]);box(2.424,2.196,-4.32,.045,.019,.16,M.warmWood);
 function paintPot(x,y,z,mat=M.teal){cyl(x,y+.13,z,.105,.094,.25,M.steel,16);cyl(x,y+.258,z,.097,.097,.007,mat,16);box(x,y+.135,z+.102,.12,.12,.006,M.paper);torus(x,y+.14,z,.105,.008,M.iron,[0,0,0],Math.PI);}
 paintPot(2.76,2.17,-2.25);cyl(3.07,2.25,-4.77,.066,.053,.16,M.cream,14);cyl(3.07,2.333,-4.77,.051,.051,.005,M.darkWood,14);torus(3.14,2.26,-4.77,.038,.01,M.cream,[0,0,0]);
 // Bench vise at the clear front end.
 box(2.13,2.19,-2.17,.30,.12,.25,M.iron);box(2.02,2.28,-2.17,.16,.15,.28,M.teal);box(2.18,2.28,-2.17,.08,.15,.28,M.iron);cyl(1.98,2.16,-2.17,.018,.018,.30,M.steel,8,[0,0,Math.PI/2]);pole([1.80,2.01,-2.17],[1.80,2.31,-2.17],.012,M.steel);
 // Shelves, small paint tins and stacked strips of timber.
 for(let y of [2.18,2.84,3.50]){
  plank(-2.88,y,-4.31,1.10,.065,2.54,M.darkWood);
  for(const z of [-5.33,-3.31])beam([-3.48,y-.36,z],[-2.58,y-.03,z],.045,.045,M.iron);
 }
 for(let i=0;i<6;i++){paintPot(-2.75,2.875,-5.15+i*.35,[M.teal,M.cream,M.red][i%3]);}
 for(let i=0;i<4;i++)for(let j=0;j<3;j++)plank(-2.79+j*.23,2.27+i*.05,-4.25,.19,.045,2.24,M.warmWood);
 for(const z of [-4.98,-3.9]){box(-2.93,3.71,z,.53,.38,.63,M.sack);box(-2.93,3.68,z+.32,.40,.07,.012,M.cream);}
 contact(2.72,-3.52,1.55,3.65,FLOOR);contact(-2.98,-4.32,1.33,2.72,FLOOR);
 // Charts pinned to a board, readable at close range.
 box(-1.60,3.0,-5.935,1.10,.79,.045,M.darkWood);
 plaque('TIDE NOTES',-1.60,3.0,-5.905,.93,.63,[0,0,0],{width:640,height:420,bg:'#c7bd94',fg:'#405551',font:'40px Georgia',sub:'LOW 06:42   •   HIGH 12:58',weather:false});
 for(const x of [-2.03,-1.17])for(const y of [2.73,3.28])bolt(x,y,-5.89,'z',.016);
 // Hanging lantern and cable along the beam.
 tube([[-3.42,3.93,-1.2],[-1.8,3.91,-1.2],[0,3.92,-1.2],[0,3.57,-1.2]],.011,M.black,20,5);
 cyl(0,3.43,-1.2,.19,.09,.14,M.iron,16);cyl(0,3.27,-1.2,.087,.087,.19,M.lamp,12);cyl(0,3.16,-1.2,.13,.11,.045,M.iron,12);for(let a=0;a<6;a++){const an=a*Math.PI/3;pole([Math.cos(an)*.10,3.15,-1.2+Math.sin(an)*.10],[Math.cos(an)*.10,3.42,-1.2+Math.sin(an)*.10],.007,M.iron);}
 const lampLight=new THREE.PointLight(0xffd499,5,7,2);lampLight.position.set(0,3.1,-1.2);scene.add(lampLight);

 // Repair net on wooden pegs, with small cork floats along the head rope.
 for(let i=0;i<=10;i++){
  const z=-2.40+i*.17,y=3.44-Math.sin(i/10*Math.PI)*.12;
  tube([[-3.40,y,z],[-3.33,y-.45,z+.11],[-3.27,y-.96,z+.03]],.006,M.rope,14,4);
  if(i%2===0){cyl(-3.40,y,z,.032,.032,.095,M.warmWood,8,[Math.PI/2,0,0]);}
 }
 for(let row=0;row<8;row++){
  const pts=[];for(let i=0;i<=10;i++)pts.push([-3.40+row*.016,3.44-row*.13-Math.sin(i/10*Math.PI)*.12,-2.40+i*.17+(row%2)*.04]);tube(pts,.006,M.rope,25,4);
 }
 for(const z of [-2.42,-.66]){box(-3.43,3.49,z,.22,.04,.04,M.warmWood);}
 // Oar and boathook on the inner west wall, within easy reach of the door.
 pole([-3.24,1.32,.31],[-3.15,3.69,.16],.025,M.warmWood);box(-3.22,1.57,.295,.11,.55,.037,M.cream,[0,0,-.035]);
 pole([-3.1,1.3,.62],[-2.92,3.67,.43],.021,M.warmWood);tube([[-2.92,3.63,.43],[-2.91,3.8,.42],[-2.79,3.84,.42],[-2.75,3.75,.42]],.014,M.iron,16,5);
 // A folded sailcloth rests over one crate instead of blocking the floor.
 const cloth=new THREE.PlaneGeometry(.69,.94,10,12);cloth.rotateX(-Math.PI/2);const cv=cloth.attributes.position;
 for(let i=0;i<cv.count;i++){const x=cv.getX(i),z=cv.getZ(i);cv.setY(i,1.94+Math.sin(x*32+z*9)*.012-Math.max(0,z-.16)*1.15);cv.setX(i,x-2.80);cv.setZ(i,z-.79);}cloth.computeVertexNormals();add(cloth,M.tarp);
 // A squat stool beside the bench, tucked far enough under its front corner.
 cyl(2.78,1.75,-1.20,.27,.27,.065,M.warmWood,16);
 for(let a=0;a<3;a++){const an=a*Math.PI*2/3;beam([2.78+Math.cos(an)*.18,1.72,-1.20+Math.sin(an)*.18],[2.78+Math.cos(an)*.24,1.28,-1.20+Math.sin(an)*.24],.055,.055,M.darkWood);}
 obstacle(2.78,-1.2,.55,.55);

 // Apron, pier and ramp are visibly constructed, not single floating slabs.
 for(let iz=0;iz<12;iz++){const z=1.27+(iz+.5)*(2.33/12);for(let k=0;k<4;k++){const x=-3.10+k*2.74;plank(x,1.16,z,2.728,.18,2.33/12-.012);for(const ex of [-1.18,1.18])bolt(x+ex,1.254,z);}}
 for(const z of [1.17,3.50])box(.96,.97,z,11.08,.23,.20,M.darkWood);
 for(const x of [-4.40,-1.30,1.30,4.65,6.33]){
  for(const z of [1.24,3.48]){cyl(x,.67,z,.115,.14,1.3,M.darkWood,9);cyl(x,.26,z,.128,.15,.43,M.wetWood,9);}
 }
 for(let z=3.71;z<18;z+=.205){plank(0,1.16,z,2.64,.18,.188);for(const x of [-1.04,1.04])bolt(x,1.254,z);}
 for(const x of [-1.08,1.08])plank(x,.91,10.75,.19,.30,14.75,M.darkWood);
 // Weathered pilings, braces, polished handrail and low toe board.
 for(let z=3.7;z<=18;z+=2.35){
  for(const side of [-1,1]){
   const x=side*1.29;cyl(x,1.04,z,.11,.16,2.48,M.darkWood,10);cyl(x,.12,z,.151,.165,.52,M.wetWood,10);
   cyl(x,2.30,z,.128,.124,.065,M.warmWood,10);box(x,1.42,z,.25,.075,.255,M.iron);bolt(x-side*.128,1.44,z,'x',.026);
   if(z<17){beam([x,.44,z],[x,.96,z+2.14],.115,.12,M.darkWood);}
   cyl(x,.71,z,.126,.137,.10,M.wetWood,10);
   if(z>8)for(let j=0;j<10;j++){const an=rng()*6.28;sphere(x+Math.sin(an)*.15,.12+rng()*.49,z+Math.cos(an)*.15,.019+rng()*.022,M.barnacle,[1,.6,1],0);}
  }
 }
 for(const side of [-1,1]){plank(side*1.29,2.20,10.80,.115,.115,14.57,M.warmWood);plank(side*1.29,1.36,10.80,.105,.15,14.59,M.darkWood);tube([[side*1.28,1.77,3.7],[side*1.28,1.69,6.05],[side*1.28,1.77,8.4],[side*1.28,1.69,10.75],[side*1.28,1.77,13.1],[side*1.28,1.69,15.45],[side*1.28,1.77,17.8]],.026,M.rope,88,5);}
 plank(0,2.2,17.98,2.70,.115,.115,M.warmWood);plank(0,1.36,17.98,2.69,.15,.10,M.darkWood);tube([[-1.28,1.76,17.97],[0,1.67,17.97],[1.28,1.76,17.97]],.026,M.rope,24,5);
 // A sit-down bench at the pier end, with clear standing room beyond it.
 for(const x of [-.92,-.74])plank(x,1.71,15.80,.16,.065,1.45,M.warmWood);for(const z of [15.24,16.35]){box(-.84,1.48,z,.12,.48,.12,M.darkWood);beam([-1.17,1.67,z],[-1.17,2.12,z],.07,.07,M.darkWood);}plank(-1.17,2.03,15.79,.07,.19,1.5,M.warmWood);
 cleat(.86,1.25,17.15,0);coil(.61,1.25,16.80,.27,5);cleat(-.82,1.25,6.2,.10);coil(-.58,1.25,5.84,.24,5);
 // Apron handrails leave the pier and shore ramp clearly open.
 for(const [a,b]of [[-4.45,-1.37],[1.38,4.59]]){
  for(const x of [a,b]){box(x,1.79,3.54,.13,1.12,.13,M.darkWood);box(x,2.33,3.54,.17,.06,.17,M.warmWood);}
  plank((a+b)/2,2.22,3.54,b-a,.11,.12,M.warmWood);plank((a+b)/2,1.36,3.54,b-a,.14,.10,M.darkWood);tube([[a,1.79,3.54],[(a+b)/2,1.68,3.54],[b,1.79,3.54]],.025,M.rope,32,5);
 }
 for(const x of [-4.44,6.38]){box(x,1.79,1.2,.13,1.1,.13,M.darkWood);plank(x,2.22,2.37,.11,.11,2.39,M.warmWood);}
 // A 1:5 ramp with handrails and an even, flush landing.
 const slope=(RAMP.bottom-RAMP.top)/(RAMP.z1-RAMP.z0),ra=-Math.atan(slope);
 for(let z=3.7;z<8.6;z+=.19){const y=RAMP.top+(z-RAMP.z0)*slope;plank(5.55,y-.072,z,1.8,.14,.178,M.wood,[ra,0,0]);if(Math.floor((z-3.7)/.19)%3===0)plank(5.55,y+.012,z,1.62,.023,.048,M.warmWood,[ra,0,0]);}
 for(const x of [4.68,6.42]){
  beam([x,1.06,3.58],[x,.03,8.65],.13,.19,M.darkWood);beam([x,2.22,3.58],[x,1.19,8.65],.10,.11,M.warmWood);beam([x,1.76,3.58],[x,.73,8.65],.045,.07,M.darkWood);
  for(const z of [3.62,5.24,6.88,8.53]){const y=RAMP.top+(z-RAMP.z0)*slope;plank(x,y+.43,z,.11,1.04,.11,M.darkWood);box(x,y-.17,z,.21,.20,.22,M.stone);}
 }
 plaque('SHORE ACCESS  →',3.05,2.13,3.466,1.38,.24,[0,Math.PI,0],{font:'55px Arial',height:140,sub:'',bg:'#334c43',fg:'#e2d6b2'});
 // Boat repair apron objects all sit out of the through route.
 function crate(x,y,z,w=.70,h=.56,d=.6,angle=0){
  const local=(xx,yy,zz)=>[x+xx*Math.cos(angle)+zz*Math.sin(angle),y+yy,z-xx*Math.sin(angle)+zz*Math.cos(angle)];
  const pb=(xx,yy,zz,ww,hh,dd,mat=M.wood)=>{const p=local(xx,yy,zz);box(...p,ww,hh,dd,mat,[0,angle,0]);};
  for(let i=0;i<4;i++){for(const zz of [-d/2,d/2])pb(0,(i+.5)*h/4,zz,w,h/4-.023,.045);for(const xx of [-w/2,w/2])pb(xx,(i+.5)*h/4,0,.045,h/4-.023,d);}
  for(const xx of [-w/2+.045,w/2-.045])for(const zz of [-d/2-.019,d/2+.019])pb(xx,h/2,zz,.067,h,.045,M.darkWood);
  for(let i=0;i<5;i++)pb((i-2)*w/5,.025,0,w/5-.012,.045,d);
  if(rng()>.35)for(let i=0;i<5;i++)pb((i-2)*w/5,h,0,w/5-.012,.04,d);
  obstacle(x,z,w+.08,d+.08,angle);
  contact(x,z,w*1.35,d*1.35,y);
 }
 crate(-3.78,1.25,2.33,.72,.55,.73,.08);crate(-3.74,1.82,2.34,.64,.47,.66,-.06);crate(-2.85,1.25,2.53,.68,.48,.60,-.12);
 plaque('S / W',-3.78,1.54,2.719,.38,.17,[0,0,0],{width:320,height:160,bg:'#8a7e61',fg:'#263e37',font:'bold 65px Arial'});
 crate(-2.65,1.25,-1.71,.68,.54,.62,.03);crate(-2.78,1.25,-.86,.76,.64,.72,-.10);
 coil(-2.20,1.25,2.60,.37,7);cleat(-2.15,1.25,3.31,0);
 tube([[-2.0,1.32,3.26],[-2.18,1.30,3.30],[-2.25,1.32,3.23],[-2.10,1.39,3.30]],.02,M.rope,24,5);
 // Coiled hose on the exterior and pegs with a hanging yellow oilskin.
 for(let i=0;i<4;i++)torus(3.739,2.42,-1.45,.31+i*.018,.014,M.black,[0,Math.PI/2,0]);box(3.74,2.78,-1.45,.16,.08,.15,M.iron);
 // Hand truck for carrying crates, leaning on the workshop's left return.
 for(const z of [-.8,-.30])pole([-3.87,1.22,z],[-4.18,2.50,z],.022,M.iron);
 box(-3.97,1.28,-.55,.37,.045,.65,M.iron);for(const z of [-.87,-.23])cyl(-3.98,1.37,z,.135,.135,.055,M.black,16,[Math.PI/2,0,0]);pole([-4.18,2.48,-.8],[-4.18,2.48,-.3],.025,M.warmWood);

 // The clinker-built tender. Both sides, inner ribs, thwarts and bilge are modeled.
 const B=BOAT;const bp=(x,y,z)=>[B.x+x*Math.cos(B.angle)+z*Math.sin(B.angle),y,B.z-x*Math.sin(B.angle)+z*Math.cos(B.angle)];
 contact(B.x,B.z,2.8,5.25);
 const bBox=(x,y,z,w,h,d,mat,rot=[0,0,0])=>box(...bp(x,y,z),w,h,d,mat,[rot[0],B.angle+rot[1],rot[2]]);
 const bTube=(pts,r,mat,steps=70)=>tube(pts.map(p=>bp(...p)),r,mat,steps,6);
 const bPole=(a,b,r,mat)=>pole(bp(...a),bp(...b),r,mat,10);
 const length=4.85,half=length/2,baseY=.51;
 const hullWidth=t=>Math.pow(Math.max(0,Math.sin(Math.PI*t)),.60)*.98*(.90+.10*t);
 const keelY=t=>baseY+.12*Math.pow(Math.abs(t-.5)*2,3);
 const topY=t=>baseY+.90+.15*Math.pow(Math.abs(t-.5)*2,2);
 function hullPoint(t,v,side,inner=false){const z=(t-.5)*length,ww=hullWidth(t),flare=.18+.82*Math.pow(v,.64);return bp(side*Math.max(0,ww*flare-(inner?.045:0)),keelY(t)+(topY(t)-keelY(t))*v,z);}
 function hullStrip(v0,v1,side,mat,inner=false){
  const pos=[],uv=[],indices=[],N=44;
  for(let i=0;i<=N;i++){const t=.006+.988*i/N;for(const v of [v0,v1]){pos.push(...hullPoint(t,v,side,inner));uv.push(t*2.5,v*2.3);}}
  for(let i=0;i<N;i++){const a=i*2;if((side>0)!==inner)indices.push(a,a+1,a+2,a+2,a+1,a+3);else indices.push(a,a+2,a+1,a+2,a+3,a+1);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();add(g,mat);
 }
 for(const side of [-1,1]){
  for(let band=0;band<7;band++){
   const v0=band/7,v1=(band+1)/7;hullStrip(v0,v1,side,band<2?M.darkWood:band===6?M.cream:M.teal);
   hullStrip(v0,v1,side,M.warmWood,true);
   const pts=[];for(let i=0;i<=38;i++){const p=hullPoint(.009+.982*i/38,v1,side);p[0]+=.013*side;pts.push(p);}tube(pts,.013,band<2?M.wetWood:band===6?M.cream:M.darkWood,76,5);
  }
  const gunwale=[],insideRail=[];
  for(let i=0;i<=44;i++){let t=.008+.984*i/44;gunwale.push(hullPoint(t,1,side));insideRail.push(hullPoint(t,.98,side,true));}
  tube(gunwale,.046,M.warmWood,88,7);tube(insideRail,.022,M.cream,88,5);
  for(let i=3;i<42;i+=3){const t=i/44;for(let band=2;band<7;band++){const p=hullPoint(t,(band+.86)/7,side);sphere(...p,.012,M.copper,[1,1,1],0);}}
 }
 // Close the keel seam beneath the removable sole boards.
 const bilgePos=[],bilgeUv=[],bilgeIndex=[];
 for(let i=0;i<=40;i++){const t=.006+.988*i/40;bilgePos.push(...hullPoint(t,0,-1),...hullPoint(t,0,1));bilgeUv.push(t*2.5,0,t*2.5,1);if(i<40){let a=i*2;bilgeIndex.push(a,a+1,a+2,a+1,a+3,a+2);}}
 const bilge=new THREE.BufferGeometry();bilge.setAttribute('position',new THREE.Float32BufferAttribute(bilgePos,3));bilge.setAttribute('uv',new THREE.Float32BufferAttribute(bilgeUv,2));bilge.setIndex(bilgeIndex);bilge.computeVertexNormals();add(bilge,M.darkWood);
 // Solid transoms/stems and longitudinal keel.
 bPole([0,baseY-.03,-half+.015],[0,topY(0)+.03,-half+.015],.067,M.darkWood);bPole([0,baseY-.03,half-.015],[0,topY(1)+.04,half-.015],.058,M.cream);
 bTube([[0,baseY+.12,-half],[0,baseY-.005,-1.3],[0,baseY-.025,0],[0,baseY,1.3],[0,baseY+.14,half]],.065,M.darkWood);
 // Nine curved oak ribs make the interior reward a close view.
 for(let i=1;i<10;i++){
  const t=i/10,pts=[];for(let j=0;j<=8;j++){const v=1-j/8;const p=hullPoint(t,v,-1,true);p[1]+=.018;pts.push(p);}for(let j=1;j<=8;j++){const p=hullPoint(t,j/8,1,true);p[1]+=.018;pts.push(p);}tube(pts,.034,M.warmWood,36,6);
 }
 for(let x=-.42;x<=.43;x+=.14)bBox(x,.695,0,.125,.045,3.13,M.wood);
 for(const z of [-1.20,.10,1.23]){const t=z/length+.5;bBox(0,1.16,z,hullWidth(t)*1.85,.065,.30,M.wood);bBox(0,1.12,z,hullWidth(t)*1.84,.028,.06,M.darkWood);}
 // Small bailer and a painter's loose coil visible in the bilge.
 bBox(.21,.752,.65,.21,.095,.32,M.cream);bBox(.21,.805,.66,.15,.017,.23,M.darkWood);bPole([.21,.81,.53],[.21,.81,.34],.018,M.warmWood);
 const coilCenter=bp(-.08,.733,-.70);coil(...coilCenter,.18,4);
 // Oarlocks and a matched pair of oars laid inside the tender.
 for(const side of [-1,1]){const t=.53,p=hullPoint(t,1,side);cyl(p[0],p[1]+.065,p[2],.016,.02,.17,M.brass,8);torus(p[0],p[1]+.12,p[2],.045,.011,M.brass,[0,B.angle,0]);}
 for(const x of [-.32,.24]){bPole([x,1.21,-1.73],[x+.18,1.22,1.60],.027,M.warmWood);bBox(x-.035,1.218,-1.49,.17,.038,.64,M.cream,[0,.05,0]);bBox(x+.178,1.223,1.52,.038,.04,.26,M.darkWood);}
 // Painted identification on starboard side, and rope tied to the bow.
 const namePos=bp(.914,1.17,.15);plaque('SW  17',...namePos,.67,.18,[0,Math.PI/2+B.angle,0],{width:600,height:170,bg:'#3c6866',fg:'#dfd7b7',font:'bold 83px Georgia'});
 const bow=bp(0,1.49,half-.08);tube([bow,[bow[0]-.2,.90,bow[2]+.22],[7.9,.25,9.05],[7.43,.27,9.31]],.019,M.rope,36,6);coil(7.4,terrainHeight(7.4,9.25)+.01,9.25,.22,4);
 // Supports put the hull's weight on chocks, above the damp sand.
 for(const z of [-1.27,1.30]){
  bBox(0,.34,z,1.42,.19,.25,M.darkWood);bBox(-.36,.45,z,.22,.26,.25,M.wetWood,[0,0,-.35]);bBox(.36,.45,z,.22,.26,.25,M.wetWood,[0,0,.35]);
 }
 // Practical boatyard odds and ends, all alongside the hull.
 const groundAt=(x,z)=>terrainHeight(x,z);
 crate(10.5,groundAt(10.5,5.0),5.0,.70,.53,.62,-.08);paintPot(10.48,groundAt(10.5,5.0)+.57,5.02,M.cream);
 plank(10.42,groundAt(10.42,6.5)+.08,6.5,.49,.12,1.75,M.wood,[0,.18,0]);
 bBox(1.72,.54,-.3,.15,.05,.76,M.warmWood,[0,.4,0]);

 // A small water butt and tidy working yard behind the workshop.
 const barrelY=terrainHeight(4.45,-5.45);cyl(4.45,barrelY+.47,-5.45,.39,.33,.94,M.darkWood,16);
 contact(4.45,-5.45,1.12,1.12);
 for(const y of [.14,.70,.91])cyl(4.45,barrelY+y,-5.45,.402,.402,.044,M.iron,16);
 cyl(4.45,barrelY+.949,-5.45,.357,.357,.01,M.wetWood,16);
 // Stock timber on dry bearers behind the workshop.
 for(const x of [-1.8,1.8])box(x,1.25,-7.6,.25,.25,1.1,M.darkWood);
 for(let y=0;y<4;y++)for(let z=0;z<4;z++)plank(0,1.42+y*.092,-7.98+z*.23,4.7,.083,.207,y%2?M.wood:M.warmWood);

 // Shore stones vary by wetness; small shells and wrack cluster at tide lines.
 for(let i=0;i<245;i++){
  const x=-19+rng()*38,z=-7+rng()*20;if(Math.abs(x)<4.5&&z<4.0)continue;if(x>4.35&&x<6.8&&z>1&&z<9)continue;if(Math.abs(x)<1.85&&z>3.5)continue;if(x>6.8&&x<10.2&&z>3&&z<8.7)continue;
  const y=groundAt(x,z),size=.065+Math.pow(rng(),3)*.40;if(y<WATER-.06||nearInspectionRoute(x,z,.65+size))continue;
  sphere(x,y+size*.20,z,size,z>8?M.wetStone:M.stones[Math.floor(rng()*5)],[1+rng()*.7,.4+rng()*.3,.8+rng()*.5],1);details.stones++;
  if(size>.32)obstacle(x,z,size*1.45,size*1.45);
 }
 // Larger stone groups on either side frame the accessible beach.
 for(const [cx,cz]of [[-8,9.0],[12.8,10.4],[-11,2.3],[13.8,1.2]])for(let i=0;i<9;i++){
  const x=cx+(rng()-.5)*2.1,z=cz+(rng()-.5)*1.8,s=.34+rng()*.50,y=groundAt(x,z);if(nearInspectionRoute(x,z,.65+s))continue;sphere(x,y+s*.23,z,s,z>8?M.wetStone:M.stone,[1.4,.65,1.03],1);obstacle(x,z,s*1.6,s*1.4);
 }
 for(let i=0;i<145;i++){
  const x=-16+rng()*33,z=8.4+rng()*3.15,y=groundAt(x,z);if(y<WATER+.002||Math.abs(x)<1.6||(x>4.4&&x<6.8&&z<8.9))continue;
  if(i%3===0){const pts=[];for(let j=0;j<5;j++)pts.push([x+j*.055,y+.013+Math.sin(j)*.008,z+Math.sin(j*1.5)*.04]);tube(pts,.012,M.weed,10,4);}
  else {sphere(x,y+.013,z,.022+rng()*.014,M.shell,[1,.3,.75],1,false);}
 }
 // Reed clumps and long grass stay outside the worn route.
 const grassGeo=[],grassDryGeo=[];
 function grassBlade(x,y,z,height,width,angle,lean){
  const dx=Math.cos(angle)*width,dz=Math.sin(angle)*width,tipx=x+lean*Math.cos(angle+.8),tipz=z+lean*Math.sin(angle+.8);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([x-dx,y,z-dz,x+dx,y,z+dz,tipx,y+height,tipz],3));g.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,1,0,.5,1],2));g.computeVertexNormals();return g;
 }
 for(let i=0;i<580;i++){
  const x=(rng()-.5)*46,z=-17+rng()*23;
  if(Math.abs(x)<5.5&&z>-9)continue;if(x>3.5&&x<12.0&&z>-7)continue;if(Math.abs(x)<3.6&&z<-7)continue;
  const y=groundAt(x,z);for(let j=0;j<4;j++){const h=.16+rng()*.42;add(grassBlade(x+(rng()-.5)*.25,y-.02,z+(rng()-.5)*.25,h,.018+rng()*.02,rng()*6,.08+rng()*.16),j%3?M.grass:M.grassDry,[0,0,0],[0,0,0],[1,1,1],false);}
 }
 // Low post-and-rail yard fence, with an open track to the landward door area.
 for(const side of [-1,1]){
  const x=side*15;for(let z=-13;z<3;z+=2.8){const y=groundAt(x,z);plank(x,y+.55,z,.14,1.1,.15,M.darkWood);if(z<.8)for(const h of [.38,.83])beam([x,y+h,z],[x,groundAt(x,z+2.8)+h,z+2.8],.075,.065,M.wood);}
 }
 for(const x of [-12,-9,-6,6,9,12]){const y=groundAt(x,-13);plank(x,y+.55,-13,.14,1.1,.15,M.darkWood);for(const h of [.38,.83])plank(x+1.5,y+h,-13,3.1,.075,.065,M.wood);}
 // Driftwood at the wrack line.
 for(let i=0;i<9;i++){const x=-13+rng()*6,z=8+rng()*3,y=groundAt(x,z);plank(x,y+.055,z,.10,.09,.7+rng()*.8,M.wetWood,[0,rng()*3,0]);}

 // Coastal scrub and wind-shaped trees frame the building when seen from shore.
 const foliage=new THREE.MeshStandardMaterial({color:0x546e5b,roughness:1});
 const foliageLight=new THREE.MeshStandardMaterial({color:0x72836a,roughness:1});
 for(const [x,z,h]of [[-9,-14,4.0],[-12,-19,5.2],[9,-18,4.8],[13,-15,3.8],[-17,-10,3.1],[17,-5,3.3],[-5,-24,4.8],[4,-27,5.7]]){
  const y=groundAt(x,z),lean=.34;beam([x,y,z],[x+lean,y+h*.8,z+.13],.18,.16,M.darkWood);
  for(let j=0;j<5;j++){const an=j*2.40,yy=y+h*(.54+j*.075),rr=.65+(j%3)*.23;const bx=x+lean+Math.cos(an)*rr,bz=z+Math.sin(an)*rr;beam([x+lean*.8,yy-.38,z],[bx,yy,bz],.068,.063,M.darkWood);sphere(bx,yy+.22,bz,.85,j%2?foliage:foliageLight,[1.25,.65,1],1,false);}
 }
 for(let i=0;i<42;i++){
  const x=(rng()-.5)*65,z=-13-rng()*26;if(Math.abs(x)<5&&z>-18)continue;const y=groundAt(x,z);sphere(x,y+.24,z,.65+rng()*.6,i%3?foliage:foliageLight,[1.4,.6,1.15],1,false);
 }

 // Distant headlands: simple low geometry, softened by atmospheric fog.
 const farMat=new THREE.MeshStandardMaterial({color:0x809991,roughness:1});
 for(const [x,z,sx,sy,sz]of [[-82,100,64,11,25],[77,114,67,16,34],[-8,152,70,13,31],[-118,44,48,15,47],[127,58,44,12,52]])sphere(x,-2,z,1,farMat,[sx,sy,sz],2,false);
 // One restrained navigation marker gives the inlet a sense of depth.
 cyl(-13,.38,28,.16,.30,.65,M.red,12,[0,0,.08],false);cyl(-13,.93,28,.018,.024,.65,M.iron,8,[0,0,.08],false);sphere(-13,1.27,28,.07,M.red,[1,1,1],1,false);

 // Consolidation reduces hundreds of detailed objects to material batches.
 let vertices=0;
 for(const batch of batches.values()){
  const merged=mergeGeometries(batch.list,false);if(!merged)throw new Error('Static geometry merge failed');
  merged.computeBoundingSphere();const mesh=new THREE.Mesh(merged,batch.mat);mesh.castShadow=batch.shadow;mesh.receiveShadow=true;mesh.name=`Static ${batch.mat.name||batch.mat.uuid.slice(0,6)}`;scene.add(mesh);vertices+=merged.attributes.position.count;
  for(const g of batch.list)g.dispose();
 }
 return {colliders,details:{...details,batches:batches.size,vertices}};
}
