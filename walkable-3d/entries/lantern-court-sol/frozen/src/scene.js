import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {rand,between,plaster,brick,wood,cloth,paving,painted,metal,fruit,glaze,signTexture,environment} from './materials.js';

export function buildMarket(renderer){
  const scene=new THREE.Scene();
  scene.background=new THREE.Color('#152437');
  scene.fog=new THREE.FogExp2('#182934',.022);
  const environmentGenerator=new THREE.PMREMGenerator(renderer);scene.environment=environment(renderer,environmentGenerator);
  scene.environmentIntensity=.55;
  const world=new THREE.Group();scene.add(world);
  const collision=[];const dynamic=[];const lights=[];const haloSources=[];
  const mat={
    cream:plaster('#747368'),bluewall:plaster('#374d55'),warmwall:plaster('#635650'),brick:brick(),
    wood:wood(),darkwood:wood('#2a312b'),bamboo:wood('#a07d46'),red:painted('#8c3d37'),green:painted('#325f52'),
    navy:painted('#2b4350'),ochre:painted('#aa8654'),iron:new THREE.MeshStandardMaterial({color:'#27373b',metalness:.75,roughness:.49}),
    steel:metal(),black:new THREE.MeshStandardMaterial({color:'#152021',roughness:.9}),concrete:plaster('#4a5251'),
    stone:plaster('#69736d'),rope:new THREE.MeshStandardMaterial({color:'#b5a783',roughness:1}),
    terra:new THREE.MeshStandardMaterial({color:'#b2714a',roughness:.82}),sage:glaze('#84998a',.37),
    ivory:glaze('#e5d2ac',.42),celadon:glaze('#628879',.29),
    orange:fruit('#df8c24',.65),apple:fruit('#bd4534',.44),
    lime:fruit('#99a951',.61),leaf:new THREE.MeshStandardMaterial({color:'#44694b',roughness:.85,side:THREE.DoubleSide}),
    purple:new THREE.MeshStandardMaterial({color:'#63465c',roughness:.44}),yellow:new THREE.MeshStandardMaterial({color:'#ceb150',roughness:.68}),
    dough:new THREE.MeshStandardMaterial({color:'#e1c994',roughness:.83}),food:new THREE.MeshStandardMaterial({color:'#934f2b',roughness:.57}),
    water:new THREE.MeshPhysicalMaterial({color:'#263b43',roughness:.15,metalness:.22,clearcoat:1,clearcoatRoughness:.12,transparent:true,opacity:.45}),
    glass:new THREE.MeshStandardMaterial({color:'#527078',metalness:.3,roughness:.21}),
    light:new THREE.MeshBasicMaterial({color:'#ffcf84'}),redlight:new THREE.MeshBasicMaterial({color:'#ea916d'}),tealglow:new THREE.MeshBasicMaterial({color:'#81c7b9'}),
    lantern:new THREE.MeshStandardMaterial({color:'#f0bd75',emissive:'#ffab41',emissiveIntensity:1.15,roughness:.72}),
    redlantern:new THREE.MeshStandardMaterial({color:'#cb6c43',emissive:'#ff9147',emissiveIntensity:.75,roughness:.8}),
  };
  const leafPos=[],leafUV=[],leafIndex=[];for(let j=0;j<=6;j++)for(let i=0;i<3;i++){const v=j/6,u=i-1;leafPos.push(u*Math.sin(v*Math.PI)*(1+.07*Math.sin(v*24)),v*2-1,(1-u*u)*.16+v*v*.2);leafUV.push(i/2,v);}for(let j=0;j<6;j++)for(let i=0;i<2;i++){const a=j*3+i;leafIndex.push(a,a+3,a+1,a+1,a+3,a+4);}const leafGeo=new THREE.BufferGeometry();leafGeo.setAttribute('position',new THREE.Float32BufferAttribute(leafPos,3));leafGeo.setAttribute('uv',new THREE.Float32BufferAttribute(leafUV,2));leafGeo.setIndex(leafIndex);leafGeo.computeVertexNormals();
  const geos={box:new THREE.BoxGeometry(1,1,1),sphere:new THREE.SphereGeometry(1,16,10),fruit:new THREE.SphereGeometry(1,12,8),leaf:leafGeo,cylinder:new THREE.CylinderGeometry(1,1,1,16),cone:new THREE.CylinderGeometry(.72,1,1,16)};
  const contactCanvas=document.createElement('canvas');contactCanvas.width=contactCanvas.height=64;const contactCtx=contactCanvas.getContext('2d');const contactGrad=contactCtx.createRadialGradient(32,32,4,32,32,31);contactGrad.addColorStop(0,'rgba(0,0,0,.62)');contactGrad.addColorStop(.45,'rgba(0,0,0,.38)');contactGrad.addColorStop(1,'rgba(0,0,0,0)');contactCtx.fillStyle=contactGrad;contactCtx.fillRect(0,0,64,64);mat.contact=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(contactCanvas),transparent:true,opacity:.52,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
  function mesh(g,m,x=0,y=0,z=0,parent=world){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
  function box(w,h,d,x,y,z,m=mat.wood,parent=world){let geometry=geos.box;if(m===mat.brick){geometry=geos.box.clone();const uv=geometry.attributes.uv,n=geometry.attributes.normal;for(let i=0;i<uv.count;i++){const nx=Math.abs(n.getX(i)),ny=Math.abs(n.getY(i));const uSize=nx>.5?d:w,vSize=ny>.5?d:h;uv.setXY(i,uv.getX(i)*uSize/2,uv.getY(i)*vSize/1.8);}}const o=mesh(geometry,m,x,y,z,parent);o.scale.set(w,h,d);return o;}
  function ball(rx,ry,rz,x,y,z,m,parent=world){const geo=m===mat.leaf?geos.leaf:[mat.orange,mat.apple,mat.lime,mat.purple].includes(m)?geos.fruit:geos.sphere;const o=mesh(geo,m,x,y,z,parent);o.scale.set(rx,ry,rz);return o;}
  function cyl(r,h,x,y,z,m=mat.iron,parent=world,r2=r){const o=mesh(r2===r?geos.cylinder:new THREE.CylinderGeometry(r2/r,1,1,20),m,x,y,z,parent);o.scale.set(r,h,r);return o;}
  function torus(r,t,x,y,z,m=mat.iron,parent=world){return mesh(new THREE.TorusGeometry(r,t,6,24),m,x,y,z,parent);}
  function pole(a,b,r,m=mat.iron,parent=world){const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),v=end.clone().sub(start);const o=cyl(r,v.length(),...start.clone().add(end).multiplyScalar(.5).toArray(),m,parent);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());return o;}
  function contact(x,y,z,w,d,parent=world){const o=mesh(new THREE.PlaneGeometry(w,d),mat.contact,x,y+.004,z,parent);o.rotation.x=-Math.PI/2;o.castShadow=false;return o;}
  function curve(points,r=.013,m=mat.iron,parent=world){const path=new THREE.CatmullRomCurve3(points.map(v=>new THREE.Vector3(...v)));return mesh(new THREE.TubeGeometry(path,24,r,5,false),m,0,0,0,parent);}
  function solid(o,label='object'){o.updateWorldMatrix(true,false);const bounds=new THREE.Box3().setFromObject(o);collision.push({minX:bounds.min.x,maxX:bounds.max.x,minZ:bounds.min.z,maxZ:bounds.max.z,label});return o;}
  const signMaterials=new Map();
  function sign(title,sub,w,h,x,y,z,color,fg,parent=world,glow=0){const margin=Math.min(.065,h*.1),thick=Math.min(.085,h*.16);const board=box(w+margin,h+margin,thick,x,y,z,mat.darkwood,parent);const key=[title,sub,color,fg,glow].join('|');let m=signMaterials.get(key);if(!m){m=new THREE.MeshStandardMaterial({map:signTexture(title,sub,color,fg),roughness:.76,emissive:glow?fg:'#000',emissiveIntensity:glow});signMaterials.set(key,m);}mesh(new THREE.PlaneGeometry(w,h),m,x,y,z+thick/2+.004,parent);const r=Math.min(.012,w*.018,h*.028);for(const sx of [-1,1])ball(r,r,r*.55,x+sx*(w/2-r*3),y+h/2-r*3,z+thick/2+.008,mat.steel,parent);return board;}
  function light(x,y,z,color,intensity=10,distance=7,parent=world){const l=new THREE.PointLight(color,intensity,distance,2);l.position.set(x,y,z);parent.add(l);lights.push(l);return l;}
  function lantern(x,y,z,r=.19,red=false,parent=world,lit=false){
    const body=ball(r,r*1.35,r,x,y,z,red?mat.redlantern:mat.lantern,parent);body.castShadow=false;
    haloSources.push({x,y,z,parent,radius:r*3.4});
    for(let i=-2;i<=2;i++){const rr=r*Math.sqrt(1-(i/3)**2);const ring=torus(rr,.008,x,y+i*r*.38,z,mat.bamboo,parent);ring.rotation.x=Math.PI/2;ring.castShadow=false;}
    cyl(r*.53,.045,x,y+r*1.28,z,mat.darkwood,parent);cyl(r*.53,.04,x,y-r*1.28,z,mat.darkwood,parent);
    pole([x,y+r*1.3,z],[x,y+r*1.3+.18,z],.011,mat.iron,parent);
    pole([x,y-r*1.3,z],[x,y-r*1.3-.15,z],.015,mat.red,parent);
    if(lit)light(x,y-.12,z,'#ffb865',10,6,parent);
  }
  function crate(x,y,z,w=.65,d=.5,parent=world,filled=false){const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);const h=.4;
    contact(0,0,0,w*1.25,d*1.3,g);
    box(w,.04,d,0,.02,0,mat.wood,g);
    for(const sx of [-1,1])for(const sz of [-1,1])box(.045,h,.045,sx*(w/2-.025),h/2,sz*(d/2-.025),mat.bamboo,g);
    for(let j=0;j<3;j++){for(const sz of [-1,1])box(w,.082,.028,0,.095+j*.12,sz*d/2,mat.bamboo,g);for(const sx of [-1,1])box(.028,.082,d,sx*w/2,.095+j*.12,0,mat.bamboo,g);}
    for(const sx of [-1,1])for(const sz of [-1,1])for(let i=0;i<2;i++)ball(.009,.009,.006,sx*(w/2-.03),.13+i*.16,sz*(d/2+.017),mat.iron,g);
    if(filled)for(let i=0;i<15;i++){const xx=between(-w*.36,w*.36),zz=between(-d*.32,d*.32);ball(.07,.063,.065,xx,.33+rand()*.06,zz,mat.orange,g);}
    return g;
  }
  function bowl(x,y,z,r,m,parent=world){contact(x,y,z,r*2.2,r*2.2,parent);const profile=[new THREE.Vector2(.01,0),new THREE.Vector2(r*.45,.015),new THREE.Vector2(r*.65,.04),new THREE.Vector2(r*.94,r*.62),new THREE.Vector2(r,r*.76),new THREE.Vector2(r-.022,r*.78),new THREE.Vector2(r*.87,r*.61),new THREE.Vector2(r*.5,.05),new THREE.Vector2(.01,.035)];const o=mesh(new THREE.LatheGeometry(profile,24),m,x,y,z,parent);const lip=torus(r-.01,.011,x,y+r*.75,z,m,parent);lip.rotation.x=Math.PI/2;return o;}
  function cup(x,y,z,m=mat.ivory,parent=world,r=.058){contact(x,y,z,r*2.6,r*2.6,parent);cyl(r,.12,x,y+.06,z,m,parent,r*.88);cyl(r*.85,.004,x,y+.121,z,mat.darkwood,parent);const lip=torus(r*.92,.007,x,y+.12,z,m,parent);lip.rotation.x=Math.PI/2;}
  function teapot(x,y,z,m=mat.celadon,parent=world){contact(x,y,z,.36,.34,parent);ball(.13,.1,.13,x,y+.1,z,m,parent);cyl(.07,.025,x,y+.21,z,m,parent);ball(.023,.025,.023,x,y+.24,z,mat.darkwood,parent);pole([x+.09,y+.1,z],[x+.22,y+.2,z],.037,m,parent);const mouth=cyl(.027,.004,x+.222,y+.202,z,mat.darkwood,parent);mouth.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(.13,.1,0).normalize());const h=torus(.075,.017,x-.14,y+.11,z,m,parent);h.rotation.y=Math.PI/2;}
  function potPlant(x,y,z,r=.25,parent=world){contact(x,y,z,r*3,r*3,parent);solid(cyl(r,r*1.8,x,y+r*.9,z,mat.terra,parent,r*1.16),'plant pot');cyl(r*.97,.01,x,y+r*1.8,z,mat.darkwood,parent);for(let i=0;i<18;i++){const a=rand()*Math.PI*2,rr=between(.03,r*1.5),h=between(.2,.65);pole([x,y+r*1.6,z],[x+Math.cos(a)*rr,y+r*1.8+h,z+Math.sin(a)*rr],.008,mat.leaf,parent);const o=ball(.08,.2,.025,x+Math.cos(a)*rr,y+r*1.8+h,z+Math.sin(a)*rr,mat.leaf,parent);o.rotation.set(between(-.8,.8),a,between(-1,1));}}
  function puddle(x,z,rx,rz){const pts=[];for(let i=0;i<24;i++){const a=i/24*Math.PI*2,rr=.9+rand()*.14;pts.push(new THREE.Vector2(Math.cos(a)*rx*rr,Math.sin(a)*rz*rr));}const o=mesh(new THREE.ShapeGeometry(new THREE.Shape(pts)),mat.water,x,.009,z);o.rotation.x=-Math.PI/2;o.castShadow=false;}
  // A continuous textured floor, with a separate narrow passage and a tea alcove.
  const ground=mesh(new THREE.PlaneGeometry(20,26),paving(),0,-.013,0);ground.rotation.x=-Math.PI/2;ground.castShadow=false;
  const passageFloor=mesh(new THREE.PlaneGeometry(3.4,8),paving(),0,-.011,-17);passageFloor.rotation.x=-Math.PI/2;passageFloor.material.map.repeat.set(1,2);passageFloor.material.roughnessMap.repeat.set(1,2);passageFloor.castShadow=false;
  const teaFloor=mesh(new THREE.PlaneGeometry(6.6,6),paving(),0,-.009,-23);teaFloor.rotation.x=-Math.PI/2;teaFloor.material.map.repeat.set(2,1.5);teaFloor.material.roughnessMap.repeat.set(2,1.5);teaFloor.castShadow=false;
  [[-1,6,1.7,.7],[2,2,1.3,.44],[-2,-2,.7,1.5],[1,-6,1.8,.55],[-7,8,.65,1.2],[7,-9,1.1,.48],[.1,-11,.8,.45],[.45,-17,.4,.7]].forEach(p=>puddle(...p));
  for(const sx of [-1,1]){
    solid(box(.48,8,25,sx*10,4,0,sx<0?mat.brick:mat.bluewall),'courtyard wall');
    box(.18,.68,25,sx*9.74,.34,0,mat.concrete);
    box(.26,.12,25,sx*9.65,.76,0,mat.stone);
    box(.6,.21,25,sx*9.95,8,0,mat.stone);
    for(let z=-11;z<12;z+=4.1){box(.17,.18,3.7,sx*9.7,4.2,z,mat.stone);const g=new THREE.Group();g.position.set(sx*9.68,5.8,z);g.rotation.y=sx<0?Math.PI/2:-Math.PI/2;world.add(g);box(1.55,1.9,.16,0,0,0,mat.black,g);box(1.7,.08,.35,0,-1,0,mat.stone,g);for(const wx of [-.71,0,.71])box(.045,1.83,.09,wx,0,.12,mat.darkwood,g);for(const wy of [-.86,.04,.87])box(1.45,.045,.1,0,wy,.12,mat.darkwood,g);const wm=new THREE.MeshStandardMaterial({color:z<0?'#718275':'#314f59',emissive:z<0?'#bd9d63':'#192c3a',emissiveIntensity:z<0?.33:.1,roughness:.37,metalness:.25});box(1.4,1.75,.02,0,0,.05,wm,g);if(z<0){for(let i=-3;i<=3;i++)box(.012,1.75,.03,i*.19,0,.145,mat.iron,g);}else{box(.64,1.82,.08,-.4,0,.2,mat.navy,g);box(.64,1.82,.08,.4,0,.2,mat.navy,g);for(let yy=-.75;yy<.8;yy+=.13)box(1.25,.055,.07,0,yy,.26,mat.iron,g);}}
    // Service doors, conduits, and damp wall streaks.
    for(const z of [-8.4,7.6]){const g=new THREE.Group();g.position.set(sx*9.68,1.3,z);g.rotation.y=sx<0?Math.PI/2:-Math.PI/2;world.add(g);box(1.15,2.5,.09,0,0,0,mat.darkwood,g);for(let j=0;j<15;j++)box(1.08,.11,.04,0,-1.12+j*.16,.07,mat.navy,g);box(.03,.18,.04,.4,-.1,.13,mat.steel,g);sign('SERVICE','KEEP CLEAR',.62,.23,0,.55,.13,'#2b3939','#bec6b4',g);}
    for(const z of [-11,1,10]){pole([sx*9.55,.1,z],[sx*9.55,8,z],.058,mat.iron);for(const yy of [.7,2.5,4.6,6.8]){const ring=torus(.068,.009,sx*9.55,yy,z,mat.steel);ring.rotation.x=Math.PI/2;}box(.2,1.6,.012,sx*9.63,.8,z,mat.black);}
    for(const z of [-6,5]){box(.52,.6,.95,sx*9.4,4,z,mat.stone);box(.02,.42,.78,sx*9.11,4,z,mat.iron);for(let i=0;i<7;i++)box(.04,.025,.75,sx*9.08,3.84+i*.052,z,mat.steel);pole([sx*9.28,3.7,z],[sx*9.28,2.1,z],.012,mat.iron);}
  }
  // The rear facade frames a real opening. The passage is not a painted door.
  for(const sx of [-1,1]){solid(box(8.3,9,.6,sx*5.85,4.5,-13,mat.cream),'rear facade');box(8.3,.8,.09,sx*5.85,.4,-12.66,mat.stone);box(8.3,.16,.3,sx*5.85,3.8,-12.55,mat.stone);}
  box(3.4,5.65,.6,0,6.18,-13,mat.cream);box(3.85,.25,.65,0,3.35,-12.9,mat.stone);
  for(const x of [-7.8,-4.8,4.8,7.8]){box(1.6,1.85,.1,x,5.4,-12.64,mat.black);box(1.72,.12,.3,x,4.41,-12.5,mat.stone);box(1.38,1.64,.03,x,5.4,-12.55,mat.glass);for(const dx of [-.72,0,.72])box(.04,1.8,.04,x+dx,5.4,-12.5,mat.darkwood);for(const dy of [-.87,0,.87])box(1.5,.04,.04,x,5.4+dy,-12.49,mat.darkwood);}
  sign('THE LATE CUP','TEA THROUGH THE PASSAGE',2.8,.56,0,2.95,-12.54,'#244643','#e6d6af',world,.2);
  for(const sx of [-1,1]){solid(box(.24,3.45,7,sx*1.78,1.725,-16.75,mat.warmwall),'passage wall');box(.1,.62,7,sx*1.61,.31,-16.75,mat.concrete);}
  box(3.8,.22,7.8,0,3.45,-16.8,mat.darkwood);
  for(let z=-13.4;z>-20;z-=1.18){box(3.52,.18,.13,0,3.22,z,mat.wood);}
  for(const sx of [-1,1]){lantern(sx*1.25,2.52,-14.3,.15,false,world,sx<0);lantern(sx*1.25,2.52,-18,.15,false,world,sx>0);}
  pole([-1.63,1.1,-13.5],[-1.63,1.1,-19.5],.027,mat.bamboo);for(let z=-14;z>-20;z-=1.5){box(.06,.07,.035,-1.65,1.07,z,mat.iron);}
  const passagePlaque=new THREE.Group();passagePlaque.position.set(1.62,1.8,-16.8);passagePlaque.rotation.y=-Math.PI/2;world.add(passagePlaque);sign('TEA','ONE LAST CUP',.6,.65,0,0,0,'#38423a','#d1bb8e',passagePlaque);
  // Open-front tea room, backed by a small, warm service counter.
  for(const sx of [-1,1]){solid(box(.28,3.65,6,sx*3.4,1.825,-23,mat.cream),'tea room wall');box(.16,1.15,5.8,sx*3.21,.575,-23,mat.darkwood);}
  solid(box(6.8,3.65,.35,0,1.825,-26,mat.warmwall),'tea back wall');box(6.8,.16,6,0,3.7,-23,mat.darkwood);
  for(const sx of [-1,1])solid(box(1.8,3.5,.3,sx*2.6,1.75,-20,mat.warmwall),'tea doorway wall');
  const tea=new THREE.Group();tea.position.set(0,0,-24.65);world.add(tea);
  solid(box(3.85,.97,.78,0,.485,0,mat.darkwood,tea),'tea counter');box(4.02,.11,1.02,0,1.025,0,mat.wood,tea);for(let xx=-1.7;xx<1.8;xx+=.17)box(.085,.88,.035,xx,.49,.41,mat.bamboo,tea);
  box(3.95,.045,.02,0,.88,.46,mat.ochre,tea);box(3.95,.045,.02,0,.12,.46,mat.ochre,tea);
  teapot(-.5,1.09,.14,mat.celadon,tea);teapot(-.07,1.09,.13,mat.terra,tea);box(.95,.025,.44,.64,1.09,.15,mat.darkwood,tea);for(const x of [.36,.6,.84])cup(x,1.11,.2,mat.ivory,tea);
  cyl(.16,.28,-1.34,1.23,-.1,mat.steel,tea);torus(.12,.015,-1.34,1.37,-.1,mat.darkwood,tea).rotation.x=Math.PI/2;
  for(let i=0;i<3;i++){box(3.7,.075,.31,0,1.6+i*.45,-.95,mat.wood,tea);const positions=i===0?[-1.48,-1.08,-.68,.25,.65]:i===1?[-1.38,-.92,.9,1.33]:[-.6,-.13,.34];for(let j=0;j<positions.length;j++){const x=positions[j];cyl(.1,.23,x,1.76+i*.45,-.92,j%2?mat.ivory:mat.terra,tea);cyl(.107,.035,x,1.89+i*.45,-.92,mat.darkwood,tea);sign(j%2?'JASMINE':'OOLONG','',.14,.085,x,1.77+i*.45,-.814,'#c0a575','#433b29',tea);}if(i===0){for(let j=0;j<3;j++)box(.24,.026,.19,1.28,1.66+j*.03,-.91,mat.rope,tea);}if(i===1){teapot(.02,2.09,-.9,mat.celadon,tea);cup(.42,2.09,-.88,mat.ivory,tea);}if(i===2){bowl(1.12,2.54,-.91,.16,mat.ivory,tea);bowl(1.12,2.59,-.91,.145,mat.ivory,tea);}}
  sign('THE LATE CUP','JASMINE · OOLONG · GENMAICHA',2.45,.5,0,3.01,-25.77,'#283e35','#e8cb92',world,.08);
  for(const x of [-1.42,1.42])lantern(x,2.83,-23.8,.21,false,world,false);
  light(0,2.1,-24,'#ffc285',14,6);
  for(const sx of [-1,1]){solid(box(.5,.14,1.8,sx*2.56,.48,-22.2,mat.wood),'tea bench');for(const z of [-22.9,-21.5])box(.34,.47,.14,sx*2.56,.235,z,mat.darkwood);potPlant(sx*2.55,0,-25.15,.28);}
  for(const x of [-.8,.8]){solid(cyl(.19,.52,x,.26,-23.3,mat.darkwood),'tea stool');cyl(.24,.065,x,.55,-23.3,mat.wood);}
  // Entrance gate and quiet enclosing facade.
  for(const sx of [-1,1]){solid(box(7.8,5,.45,sx*6.2,2.5,12.65,mat.warmwall),'entrance facade');solid(box(.38,3.4,.5,sx*2.1,1.7,12.65,mat.darkwood),'entrance post');}
  box(4.6,.45,.75,0,3.56,12.65,mat.darkwood);const entrySign=new THREE.Group();entrySign.position.set(0,3.49,12.19);entrySign.rotation.y=Math.PI;world.add(entrySign);sign('LANTERN COURT','NIGHT MARKET · EST. 1986',3.75,.66,0,0,0,'#553832','#ecd7b4',entrySign);
  for(const x of [-1.82,1.82])lantern(x,2.8,11.65,.22,true,world,false);
  // The entry has real depth on the return view, ending at an old courtyard gate.
  const entryFloor=mesh(new THREE.PlaneGeometry(4.5,3.4),paving(),0,-.007,14.5);entryFloor.rotation.x=-Math.PI/2;entryFloor.castShadow=false;entryFloor.material.map.repeat.set(1.3,1);entryFloor.material.roughnessMap.repeat.set(1.3,1);
  for(const sx of [-1,1])solid(box(.25,3.6,3.7,sx*2.25,1.8,14.5,mat.brick),'entry passage wall');
  box(4.6,.2,3.8,0,3.64,14.5,mat.darkwood);solid(box(4.5,3.6,.3,0,1.8,16.35,mat.darkwood),'entry gate');
  const gate=new THREE.Group();gate.position.set(0,1.55,16.16);gate.rotation.y=Math.PI;world.add(gate);box(3.9,2.8,.08,0,0,0,mat.navy,gate);for(let i=-9;i<=9;i++)box(.035,2.7,.035,i*.19,0,.06,mat.iron,gate);for(const y of [-1.1,0,1.1])box(3.75,.045,.035,0,y,.08,mat.iron,gate);sign('17','LANTERN LANE',.72,.5,0,.18,.12,'#293735','#c6ba97',gate);for(const x of [-.13,.13])torus(.061,.012,x,-.53,.14,mat.steel,gate);
  // Countertop props, cart frames and four distinct handmade canopies.
  const stallCenters=[[-5.6,4,Math.PI/2],[-5.6,-5.1,Math.PI/2],[5.6,3.3,-Math.PI/2],[5.6,-5.5,-Math.PI/2]];
  function canopy(g,w,d,m,type='gable'){
    const nx=30,nz=20,pos=[],uv=[],idx=[];
    function roofY(x,z){const u=x/w+.5,v=z/d+.5;let y=2.72;if(type==='gable')y+=.46*(1-Math.abs(x)/(w/2))-.075*Math.sin(v*Math.PI);if(type==='slope')y+=.24-.35*v-.075*Math.sin(u*Math.PI);if(type==='arched')y+=.38*Math.cos(x/w*Math.PI)-.05*Math.sin(v*Math.PI);return y+.023*Math.sin(u*8*Math.PI)*Math.sin(v*Math.PI);}
    for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){const x=(i/nx-.5)*w,z=(j/nz-.5)*d;pos.push(x,roofY(x,z),z+.4);uv.push(i/nx,j/nz);}
    for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i;idx.push(a,a+nx+1,a+1,a+1,a+nx+1,a+nx+2);}
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(idx);geo.computeVertexNormals();mesh(geo,m,0,0,0,g);
    // Front valance, visibly scalloped and stitched, with a real fabric thickness impression.
    const vp=[],vu=[],vi=[];for(let i=0;i<=96;i++){const u=i/96,x=(u-.5)*w,y=roofY(x,d/2);vp.push(x,y,d/2+.4,x,y-.17-.065*Math.sin(u*16*Math.PI)**2,d/2+.405);vu.push(u,0,u,1);if(i<96){const a=i*2;vi.push(a,a+1,a+2,a+2,a+1,a+3);}}const vg=new THREE.BufferGeometry();vg.setAttribute('position',new THREE.Float32BufferAttribute(vp,3));vg.setAttribute('uv',new THREE.Float32BufferAttribute(vu,2));vg.setIndex(vi);vg.computeVertexNormals();mesh(vg,m,0,0,0,g);
    for(const x of [-w/2+.04,w/2-.04]){const yf=roofY(x,d/2),yb=roofY(x,-d/2);pole([x,yb,-d/2+.4],[x,yf,d/2+.4],.024,mat.iron,g);solid(pole([x,0,d/2+.34],[x,yf+.015,d/2+.34],.033,mat.iron,g),'awning post');pole([x,0,-d/2+.44],[x,yb+.01,-d/2+.44],.038,mat.iron,g);pole([x,2.2,d/2+.34],[x,roofY(x,d/2-.5),d/2-.1],.016,mat.iron,g);}
    for(let i=-2;i<=2;i++){const x=i*w/5;curve([[x,roofY(x,-d/2)+.006,-d/2+.4],[x,roofY(x,0)+.006,.4],[x,roofY(x,d/2)+.006,d/2+.4]],.003,mat.rope,g);}
  }
  function cart(g,w=3.25,d=1.04,m=mat.red){contact(0,0,-.1,w*1.2,d*1.7,g);solid(box(w,.90,d,0,.50,-.1,m,g),'stall counter');box(w+.11,.095,d+.13,0,.98,-.1,mat.wood,g);for(const x of [-w/2+.12,w/2-.12])for(const z of [-.48,.28])box(.07,.9,.07,x,.48,z,mat.darkwood,g);for(let x=-w/2+.08;x<w/2;x+=.17)box(.075,.71,.025,x,.49,.432,mat.darkwood,g);box(w,.048,.04,0,.84,.46,mat.bamboo,g);box(w,.048,.04,0,.17,.46,mat.bamboo,g);for(const x of [-w/2+.25,w/2-.25]){const wheel=cyl(.2,.09,x,.23,-.68,mat.black,g);wheel.rotation.z=Math.PI/2;cyl(.06,.1,x,.23,-.68,mat.steel,g).rotation.z=Math.PI/2;} }
  function tray(x,y,z,w,d,m=mat.steel,g){box(w,.025,d,x,y,z,m,g);for(const sx of [-1,1])box(.014,.045,d,sx*w/2+x,y+.015,z,m,g);for(const sz of [-1,1])box(w,.045,.014,x,y+.015,sz*d/2+z,m,g);}
  function dumpling(x,y,z,g){const o=ball(.076,.046,.055,x,y,z,mat.dough,g);o.rotation.y=rand()*2;for(let i=-2;i<=2;i++)pole([x+i*.021,y+.01,z+.034],[x+i*.017,y+.045,z-.015],.003,mat.ivory,g);}
  // 01. Red ridge-roof kitchen: bamboo steamers, seared buns, iron cooker.
  {
    const [x,z,a]=stallCenters[0],g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=a;world.add(g);
    canopy(g,3.9,3.15,cloth('#773d37','#9c594b'),'gable');cart(g,3.3,1.12,mat.red);
    box(3.38,.055,1.15,0,1.03,-.13,mat.steel,g);sign('MOON DUMPLINGS','HAND FOLDED · BAMBOO STEAMED',2.82,.51,0,2.32,.61,'#713a34','#f0d9a5',g);
    for(const xx of [-1.42,1.42])lantern(xx,2.35,1.5,.17,true,g,xx<0);
    for(const [xx,zz] of [[-.85,-.16],[-.26,-.18]]){cyl(.24,.115,xx,1.12,zz,mat.bamboo,g);for(let i=0;i<3;i++){const t=torus(.235,.008,xx,1.075+i*.045,zz,mat.darkwood,g);t.rotation.x=Math.PI/2;}cyl(.21,.005,xx,1.184,zz,mat.wood,g);for(let i=0;i<6;i++){const a=i/6*6.28;dumpling(xx+Math.cos(a)*.135,1.21,zz+Math.sin(a)*.135,g);}dumpling(xx,1.21,zz,g);}
    cyl(.235,.09,-.78,1.23,-.45,mat.bamboo,g);cyl(.225,.026,-.78,1.29,-.45,mat.bamboo,g);ball(.033,.02,.033,-.78,1.315,-.45,mat.darkwood,g);
    box(.68,.15,.57,.76,1.12,-.2,mat.iron,g);for(let i=0;i<12;i++)box(.035,.019,.47,.48+i*.048,1.205,-.2,mat.steel,g);for(let i=0;i<7;i++){const xx=.53+(i%3)*.16,zz=-.33+Math.floor(i/3)*.13;ball(.075,.043,.069,xx,1.25,zz,mat.food,g);}for(const xx of [.58,.77,.96]){cyl(.034,.035,xx,1.09,.1,mat.black,g).rotation.x=Math.PI/2;}
    tray(.05,1.06,.28,.42,.22,mat.steel,g);pole([.87,1.26,-.1],[1.24,1.35,.29],.012,mat.darkwood,g);box(.095,.025,.12,1.27,1.36,.31,mat.steel,g);
    sign('6 / 12','DUMPLINGS',.4,.3,-1.38,1.28,.22,'#233330','#e6d4af',g);cup(.25,1.08,-.34,mat.ivory,g);
    solid(crate(-1.65,0,-.82,.5,.7,g),'kitchen crate');cyl(.19,.45,1.64,.24,-.67,mat.steel,g);potPlant(-1.72,0,-1.45,.2,g);
    // Small menu hung from the right post.
    sign('STEAMED','GINGER / CHIVE',.52,.69,1.6,1.68,1.16,'#253c35','#e0c898',g);
    // A folded umbrella and a couple of tied takeaway boxes suggest the recent rain.
    const umbrella=new THREE.Group();umbrella.position.set(-1.7,.04,-.84);umbrella.rotation.z=-.16;g.add(umbrella);cyl(.012,1.34,0,.68,0,mat.iron,umbrella);mesh(new THREE.CylinderGeometry(.035,.105,.78,8),mat.navy,0,.59,0,umbrella);const handle=torus(.055,.012,0,1.34,0,mat.darkwood,umbrella);box(.075,.025,.09,0,.87,.09,mat.iron,umbrella);
    for(let i=0;i<2;i++){box(.23,.12,.2,-1.33,1.12+i*.13,-.37,mat.rope,g);box(.235,.013,.205,-1.33,1.185+i*.13,-.37,mat.ivory,g);pole([-1.45,1.195+i*.13,-.37],[-1.21,1.195+i*.13,-.37],.004,mat.bamboo,g);}
    for(let i=0;i<7;i++){const xx=.53+(i%3)*.16,zz=-.33+Math.floor(i/3)*.13;for(let j=-1;j<=1;j++)pole([xx-.04,1.285,zz+j*.022-.015],[xx+.04,1.285,zz+j*.022+.015],.002,mat.darkwood,g);}
    contact(-.55,1.063,-.14,1.3,.65,g);
    dynamic.push({type:'steam',position:new THREE.Vector3(-.65,1.34,-.15).applyMatrix4(g.matrixWorld),group:g,local:[-.65,1.3,-.15]});
  }
  // 02. Fresh provisions: striped low canvas and deliberate produce piles.
  {
    const[x,z,a]=stallCenters[1],g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=a;world.add(g);
    canopy(g,4.1,3.1,cloth('#335a4e','#b4ad87'),'slope');cart(g,3.4,1.15,mat.green);
    sign('GREEN BASKET','SEASONAL FRUIT & GARDEN GREENS',2.84,.48,0,2.23,.58,'#264d40','#e4d59e',g);
    lantern(-1.59,2.32,1.56,.18,false,g,true);lantern(1.6,2.32,1.56,.16,false,g);
    const crates=[[-1.06,.45,mat.orange],[-.21,.37,mat.apple],[.65,.42,mat.lime]];
    for(const[xx,dd,m]of crates){crate(xx,1.01,-.12,.72,dd,g);for(let j=0;j<24;j++){const lx=xx+between(-.28,.28),lz=between(-dd*.32,dd*.32)-.12;const yy=1.38+between(-.03,.045);ball(.061,.057,.062,lx,yy,lz,m,g);pole([lx,yy+.047,lz],[lx+.008,yy+.072,lz],.006,mat.darkwood,g);}}
    crate(1.35,1.01,-.17,.5,.6,g);for(let i=0;i<9;i++){const xx=1.35+between(-.17,.17),zz=-.17+between(-.18,.18);ball(.041,.04,.135,xx,1.37,zz,mat.purple,g);for(let j=0;j<3;j++){const leaf=ball(.025,.009,.047,xx,1.415,zz-.1,mat.leaf,g);leaf.rotation.y=j*2;}}
    for(const xx of [-.95,.1,.99])sign(xx<0?'CITRUS':xx<.5?'APPLES':'GREENS','LOCAL',.28,.2,xx,1.08,.5,'#c2af83','#383e31',g);
    solid(crate(-1.2,0,-1.12,.72,.6,g,true),'produce crate');solid(crate(-1.2,.43,-1.12,.72,.6,g),'produce crate');solid(crate(.1,0,-1.02,.66,.6,g,true),'produce crate');
    const bag=ball(.18,.23,.17,1.85,.22,-.6,mat.rope,g);bag.rotation.z=.18;
    for(let i=0;i<6;i++){pole([.62+i*.012,1.15,.43],[.64+i*.012,1.4,.4],.008,mat.bamboo,g);}
    potPlant(-1.85,0,-1.4,.21,g);sign('TODAY','PEARS / CITRUS',.61,.77,-1.72,1.65,-.44,'#243c36','#c9bd96',g);
    // A tied bundle of garden leaves and two sacks leave open counter space.
    for(let i=0;i<7;i++){pole([1.54,1.1,.33],[1.6+between(-.12,.12),1.29,.32+between(-.1,.1)],.007,mat.bamboo,g);const leaf=ball(.052,.13,.018,1.6+between(-.08,.08),1.32,.32+between(-.1,.1),mat.leaf,g);leaf.rotation.set(-.6,between(-1,1),between(-.8,.8));}torus(.047,.006,1.55,1.17,.33,mat.rope,g).rotation.x=Math.PI/2;
    ball(.16,.24,.17,.96,.22,-1.02,mat.rope,g);ball(.13,.21,.15,1.29,.19,-1.05,mat.rope,g);pole([-.1,2.55,-1.16],[1.5,2.55,-1.16],.02,mat.bamboo,g);for(let i=0;i<5;i++)pole([.2+i*.05,2.55,-1.16],[.2+i*.05,2.32,-1.16],.012,mat.rope,g);
  }
  // 03. Blue noodle cart: curved roof, stainless cooker, hanging utensils.
  {
    const[x,z,a]=stallCenters[2],g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=a;world.add(g);
    canopy(g,3.75,3.28,cloth('#344c63'),'arched');cart(g,3.2,1.04,mat.navy);
    sign('BLUE HOUR NOODLES','HOT BROTH · CHILI OIL',2.85,.5,0,2.25,.61,'#243c4d','#c9ddd1',g,.1);
    lantern(1.46,2.26,1.66,.19,false,g,true);
    box(1.35,.1,1.02,-.65,1.04,-.1,mat.steel,g);cyl(.25,.32,-.8,1.26,-.17,mat.steel,g);cyl(.248,.015,-.8,1.425,-.17,mat.darkwood,g);torus(.242,.018,-.8,1.438,-.17,mat.steel,g).rotation.x=Math.PI/2;
    for(const sx of [-1,1]){const t=torus(.065,.011,-.8+sx*.26,1.34,-.17,mat.steel,g);t.rotation.y=Math.PI/2;}
    bowl(.46,1.015,.13,.17,mat.ivory,g);bowl(.9,1.015,.14,.17,mat.celadon,g);cyl(.13,.006,.46,1.11,.13,mat.food,g);cyl(.13,.006,.9,1.11,.14,mat.food,g);
    for(const xx of [.46,.9]){for(let j=0;j<5;j++){const o=torus(.025+j*.008,.004,xx,1.117+j*.001,.13,mat.dough,g);o.rotation.x=Math.PI/2;}for(let j=0;j<3;j++){const leaf=ball(.025,.006,.016,xx+between(-.07,.07),1.127,.13+between(-.07,.07),mat.leaf,g);leaf.rotation.y=rand()*6;}}
    pole([.26,1.15,.06],[.66,1.18,.2],.006,mat.bamboo,g);pole([.3,1.15,.06],[.7,1.18,.2],.006,mat.bamboo,g);
    for(let i=0;i<3;i++){cyl(.069,.16,1.32,1.11,-.27+i*.17,i===0?mat.red:mat.ivory,g);cyl(.074,.027,1.32,1.2,-.27+i*.17,mat.darkwood,g);}
    pole([-1.3,1.95,-.65],[1.1,1.95,-.65],.023,mat.iron,g);for(let i=0;i<5;i++){const xx=-.95+i*.32;pole([xx,1.96,-.65],[xx,1.57,-.65],.01,mat.steel,g);if(i%2===0){const ladle=ball(.06,.025,.058,xx,1.54,-.61,mat.steel,g);ladle.rotation.x=.5;}else box(.045,.15,.014,xx,1.52,-.65,mat.steel,g);}
    solid(crate(1.55,0,-1,.48,.68,g),'noodle crate');box(.3,.16,.3,-1.3,1.08,.21,mat.ivory,g);sign('BROTH','SLOW COOKED',.47,.63,-1.55,1.65,1.05,'#213c44','#d6dbc7',g);
    dynamic.push({type:'steam',group:g,local:[-.8,1.44,-.17]});
    // Rear flue, propane hose, and condiments distinguish the kitchen from the other carts.
    const flue=mesh(new THREE.CylinderGeometry(.1,.1,2.35,12),mat.steel,-1.48,2.13,-.87,g);box(.37,.08,.32,-1.48,3.34,-.87,mat.iron,g);box(.06,.15,.06,-1.48,3.22,-.87,mat.iron,g);
    solid(cyl(.16,.42,-1.67,.26,-1.11,mat.navy,g),'fuel canister');ball(.16,.07,.16,-1.67,.49,-1.11,mat.navy,g);cyl(.034,.08,-1.67,.56,-1.11,mat.steel,g);curve([[-1.67,.59,-1.11],[-1.45,.72,-.93],[-1,.81,-.76],[-.8,1.11,-.6]],.015,mat.black,g);
    for(let i=0;i<2;i++){const xx=.28+i*.2;cyl(.043,.17,xx,1.1,-.38,mat.darkwood,g);cyl(.018,.072,xx,1.22,-.38,mat.red,g);sign(i?'CHILI':'SOY','',.066,.065,xx,1.11,-.332,'#c7ad7d','#342c20',g);}box(.2,.11,.22,1.21,1.08,.26,mat.ivory,g);for(let i=0;i<5;i++)pole([1.16+i*.02,1.1,.2],[1.16+i*.02,1.42,.21],.004,mat.bamboo,g);
  }
  // 04. Small ceramic shop: asymmetric ochre canopy, raised shelving, sparse work.
  {
    const[x,z,a]=stallCenters[3],g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=a;world.add(g);
    canopy(g,4.05,3.1,cloth('#a07b49','#b28f59'),'slope');cart(g,3.4,1.1,mat.ochre);
    sign('EARTH & FIRE','SMALL BATCH CERAMICS',2.74,.48,0,2.25,.6,'#5d4935','#e9d7ac',g);
    lantern(-1.67,2.32,1.57,.18,false,g,true);lantern(1.6,2.32,1.55,.16,false,g);
    box(.98,.04,.66,-.92,1.02,-.07,mat.rope,g);teapot(-.92,1.05,-.16,mat.terra,g);cup(-1.18,1.05,.19,mat.ivory,g);cup(-.79,1.05,.24,mat.ivory,g);
    bowl(.1,1.03,.14,.23,mat.celadon,g);bowl(.1,1.09,.14,.215,mat.celadon,g);bowl(.1,1.15,.14,.2,mat.celadon,g);
    for(const xx of [.7,1.08,1.4]){cyl(.1,.28,xx,1.18,-.2,xx<1?mat.sage:mat.ivory,g,.08);torus(.081,.008,xx,1.327,-.2,mat.terra,g).rotation.x=Math.PI/2;}
    // A stepped rear shelf gives this stall a visibly taller silhouette.
    box(2.9,.045,.28,0,1.53,-.54,mat.wood,g);box(2.9,.045,.28,0,1.91,-.69,mat.wood,g);for(const xx of [-1.45,1.45])box(.055,1.02,.075,xx,1.45,-.72,mat.darkwood,g);
    for(let i=0;i<6;i++){const xx=-1.16+i*.45;cup(xx,1.56,-.54,i%2?mat.ivory:mat.sage,g);if(i%2===0)bowl(xx,1.94,-.7,.145,mat.terra,g);else{ball(.11,.15,.11,xx,2.05,-.7,mat.celadon,g);cyl(.049,.06,xx,2.2,-.7,mat.celadon,g);}}
    sign('HAND THROWN','TAKE SOMETHING HOME',.57,.42,-1.4,1.17,.35,'#d3c59d','#504537',g);solid(crate(1.62,0,-1.12,.62,.72,g),'pottery crate');solid(crate(-1.68,0,-.91,.58,.62,g),'pottery crate');potPlant(1.7,0,-1.61,.2,g);
    // Folded linen and wrapping paper.
    for(let i=0;i<3;i++)box(.3,.025,.23,.7,1.04+i*.025,.27,mat.rope,g);pole([.79,1.13,.38],[1.24,1.13,.38],.039,mat.ivory,g);
    for(const xx of [.7,1.08,1.4]){cyl(.068,.005,xx,1.332,-.2,mat.darkwood,g);}box(.27,.15,.22,-1.32,1.08,-.44,mat.rope,g);pole([-1.46,1.16,-.44],[-1.18,1.16,-.44],.004,mat.bamboo,g);pole([-1.32,1.16,-.55],[-1.32,1.16,-.33],.004,mat.bamboo,g);
    // A small maker's stamp and the tools used to wrap purchases.
    cyl(.034,.045,.92,1.12,.28,mat.darkwood,g);torus(.036,.006,.92,1.145,.28,mat.ochre,g).rotation.x=Math.PI/2;pole([1.17,1.12,.31],[1.4,1.12,.17],.006,mat.steel,g);
  }
  // Strings of lights visually connect the stalls and leave the central path open.
  for(const z of [-7,2.2]){
    const pts=[[-9.65,4.7,z],[-5,4.05,z+.12],[0,3.7,z+.28],[5,4.05,z+.12],[9.65,4.7,z]];curve(pts,.012,mat.black);
    for(let i=0;i<13;i++){const x=-8.8+i*1.47,y=3.7+.92*(x/9.65)**2;pole([x,y,z+.2],[x,y-.13,z+.2],.009,mat.black);ball(.035,.055,.035,x,y-.17,z+.2,mat.light);}
    for(const x of [-3.1,3.1])lantern(x,3.53,z+.24,.17,false,world,false);
  }
  // Curated edge detail: drainage, old notices, conduits, fire escape and greenery.
  for(const sx of [-1,1]){box(.28,.025,24,sx*9.2,.012,0,mat.iron);for(let z=-11.7;z<12;z+=.24)box(.24,.012,.018,sx*9.2,.029,z,mat.steel);}
  for(const z of [-9,8]){box(.9,.024,.47,0,.008,z,mat.iron);for(let i=0;i<12;i++)box(.035,.015,.41,-.41+i*.074,.025,z,mat.steel);box(.99,.012,.56,0,.001,z,mat.black);}
  for(const [x,z]of [[-8.7,-11.1],[8.6,10.6],[8.9,-1.1],[-8.7,.1]]){potPlant(x,0,z,.31);}
  const notice=new THREE.Group();notice.position.set(-9.69,1.9,1.7);notice.rotation.y=Math.PI/2;world.add(notice);
  sign('COURT NOTES','RAIN OR SHINE · EVERY EVENING',1.45,.87,0,0,0,'#504b3c','#d0c4a0',notice);
  sign('NO. 17','LANTERN LANE',.56,.4,8.42,2.3,-12.64,'#344448','#bac8c7');
  // Stacked empties and utility fittings reward the path behind the rear stalls.
  for(let i=0;i<3;i++)solid(crate(-8.5,i*.43,-10.9,.75,.62,world),'stacked courtyard crate');
  const utility=new THREE.Group();utility.position.set(9.62,1.86,-.9);utility.rotation.y=-Math.PI/2;world.add(utility);box(.55,.68,.18,0,0,0,mat.navy,utility);box(.48,.58,.02,0,0,.11,mat.iron,utility);sign('240 V','',.2,.14,0,.11,.14,'#b1a279','#35372d',utility);curve([[.2,-.3,.05],[.26,-.7,.03],[.3,-1.3,.03]],.026,mat.black,utility);
  for(const sx of [-1,1]){box(.05,.045,24,sx*9.67,3.5,0,mat.iron);for(let z=-11;z<12;z+=1.4)box(.09,.13,.08,sx*9.65,3.5,z,mat.steel);}
  // Slight changes in roofline and corner trim keep the enclosure from reading as a single box.
  for(const sx of [-1,1]){box(.65,.9,7.1,sx*9.93,8.53,-7,mat.bluewall);box(.7,.13,7.3,sx*9.93,9.02,-7,mat.stone);for(const z of [-12.2,11.9])for(let y=.8;y<7.8;y+=.42)box(.37,.24,.55,sx*9.66,y,z,mat.stone);}
  // Restrained jade sign on the rear right facade.
  const litSign=new THREE.Group();litSign.position.set(6.25,3,-12.6);world.add(litSign);sign('夜 市','N I G H T   M A R K E T',1.12,1.5,0,0,0,'#173732','#8bbfab',litSign,.55);light(6.25,2.8,-11.9,'#75b29f',8,6);
  for(let x=-8.5;x<9;x+=3.4)box(2.8,.2,1.2,x,7.6,-12.36,mat.darkwood);
  curve([[-9.55,5.5,-9],[-4,5,-12.35],[3,5.6,-12.35],[9.55,5,-7]],.02,mat.black);
  // Side fire escape is above walking height and adds depth on reverse views.
  box(1.35,.09,3,-9,4.16,-3,mat.iron);for(let z=-4.4;z<-1.5;z+=.25)box(1.25,.028,.018,-9,4.21,z,mat.steel);for(const z of [-4.4,-1.6])pole([-8.35,4.16,z],[-8.35,5.15,z],.023,mat.iron);pole([-8.35,5.15,-4.4],[-8.35,5.15,-1.6],.025,mat.iron);for(let z=-4.2;z<-1.6;z+=.25)pole([-8.35,4.16,z],[-8.35,5.15,z],.011,mat.iron);for(let y=4.3;y<7.4;y+=.26){box(.65,.025,.07,-9.2,y,-1.68,mat.iron);}pole([-9.55,4.1,-1.68],[-9.55,7.65,-1.68],.023,mat.iron);pole([-8.85,4.1,-1.68],[-8.85,7.65,-1.68],.023,mat.iron);
  // Wall sconces cast pools of warm illumination on plaster and wet paving.
  for(const [x,z,a]of [[-9.4,7,Math.PI/2],[9.4,-8,-Math.PI/2]]){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=a;world.add(g);box(.3,.38,.2,0,2.6,0,mat.iron,g);box(.22,.26,.04,0,2.6,.11,mat.light,g);light(0,2.4,.35,'#ffbb79',8,5,g);}
  scene.add(new THREE.HemisphereLight('#8eabc5','#595344',1.0));
  const moon=new THREE.DirectionalLight('#9cbed2',1.15);moon.position.set(-8,14,7);scene.add(moon);
  const spot=new THREE.SpotLight('#ffc184',70,21,1.13,.65,1.6);spot.position.set(-3.4,7,1.3);spot.target.position.set(0,0,-1);spot.castShadow=true;spot.shadow.mapSize.set(1024,1024);spot.shadow.bias=-.00035;spot.shadow.normalBias=.045;scene.add(spot,spot.target);
  const teaSpot=new THREE.SpotLight('#ffd19e',23,8,.9,.55,1.4);teaSpot.position.set(0,3.3,-22.5);teaSpot.target.position.set(0,0,-24);teaSpot.castShadow=true;teaSpot.shadow.mapSize.set(512,512);teaSpot.shadow.normalBias=.035;scene.add(teaSpot,teaSpot.target);
  // Keep point-light count low: only nearest lanterns light the scene; all lanterns remain visible.
  while(lights.length>12){const l=lights.splice(3,1)[0];l.removeFromParent();}
  // Merge static pieces by material. Thousands of prop parts become a few dozen GPU draws.
  world.updateMatrixWorld(true);
  const buckets=new Map();const remove=[];
  world.traverse(o=>{if(!o.isMesh||(o.material.transparent&&o.material!==mat.contact))return;const key=o.material.uuid+':'+o.castShadow;let b=buckets.get(key);if(!b){b={material:o.material,shadow:o.castShadow,geometries:[]};buckets.set(key,b);}const geom=o.geometry.clone();geom.applyMatrix4(o.matrixWorld);b.geometries.push(geom);remove.push(o);});
  for(const o of remove)o.removeFromParent();
  for(const b of buckets.values()){const geometry=mergeGeometries(b.geometries,false);for(const g of b.geometries)g.dispose();if(geometry){const o=new THREE.Mesh(geometry,b.material);o.castShadow=b.shadow;o.receiveShadow=true;scene.add(o);}}
  // A single instanced draw supplies faint optical bloom around the lanterns.
  const haloGeometry=new THREE.InstancedBufferGeometry();haloGeometry.index=new THREE.PlaneGeometry(1,1).index;const quad=new THREE.PlaneGeometry(1,1);haloGeometry.setAttribute('position',quad.attributes.position);haloGeometry.setAttribute('uv',quad.attributes.uv);const centers=[],sizes=[];for(const s of haloSources){s.parent.updateWorldMatrix(true,false);const p=new THREE.Vector3(s.x,s.y,s.z).applyMatrix4(s.parent.matrixWorld);centers.push(...p.toArray());sizes.push(s.radius);}haloGeometry.setAttribute('center',new THREE.InstancedBufferAttribute(new Float32Array(centers),3));haloGeometry.setAttribute('size',new THREE.InstancedBufferAttribute(new Float32Array(sizes),1));haloGeometry.instanceCount=haloSources.length;
  const haloMaterial=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,vertexShader:'attribute vec3 center; attribute float size; varying vec2 vUv; void main(){vUv=uv;vec4 p=modelViewMatrix*vec4(center,1.0);p.xy+=position.xy*size;gl_Position=projectionMatrix*p;}',fragmentShader:'varying vec2 vUv; void main(){float r=length(vUv-0.5)*2.0;float a=pow(max(0.0,1.0-r),2.0)*0.10;gl_FragColor=vec4(1.0,0.54,0.21,a);}'});const halos=new THREE.Mesh(haloGeometry,haloMaterial);halos.frustumCulled=false;scene.add(halos);
  // Steam is sparse and local. No dense particles or full-screen effects.
  const steamCanvas=document.createElement('canvas');steamCanvas.width=steamCanvas.height=64;const sx=steamCanvas.getContext('2d');const sg=sx.createRadialGradient(32,32,0,32,32,30);sg.addColorStop(0,'rgba(214,227,219,.5)');sg.addColorStop(.3,'rgba(214,227,219,.18)');sg.addColorStop(1,'rgba(214,227,219,0)');sx.fillStyle=sg;sx.fillRect(0,0,64,64);const steamTex=new THREE.CanvasTexture(steamCanvas);
  const steams=[];for(const item of dynamic){item.group.updateWorldMatrix(true,false);const origin=new THREE.Vector3(...item.local).applyMatrix4(item.group.matrixWorld);for(let i=0;i<4;i++){const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:steamTex,transparent:true,opacity:.15,depthWrite:false,color:'#c7d6d1'}));sprite.position.copy(origin);scene.add(sprite);steams.push({sprite,origin,phase:i/4});}}
  return {scene,collision,steams,lights,stalls:stallCenters,environmentGenerator};
}
