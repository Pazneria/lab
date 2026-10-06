import * as THREE from 'three';
import {Batcher,localPoint} from './batch.js';
import {makeMaterials,rand} from './materials.js';
import {createBookTools} from './books.js';
import {createObjectTools} from './objects.js';
import {obstacle,registerStructure,STAIR} from './layout.js';

export function buildScene(scene){
  const m=makeMaterials();const batch=new Batcher(scene);const books=createBookTools(batch,m);const props=createObjectTools(batch,m,books,scene);registerStructure();
  // Floor maps are scaled to a comfortable 28 cm board width.
  m.floor.map.repeat.set(3,8);const galleryFloor=m.floor.clone();galleryFloor.map=m.floor.map.clone();galleryFloor.map.repeat.set(1,3);galleryFloor.bumpMap=galleryFloor.map;
  batch.box([14,.22,18],[0,-.11,0],m.floor);batch.box([3.6,.22,7.1],[8.75,-.11,1.95],galleryFloor);
  batch.box([.26,8.6,18.4],[-7.08,4.3,0],m.plaster);batch.box([14.4,8.6,.26],[0,4.3,9.08],m.plaster);
  // North wall: three clear, tall openings with proper depth, rather than image windows.
  const northWindows=[{x:-.2,w:2.2},{x:2.9,w:2.2},{x:5.55,w:1.75}];
  batch.box([14.4,.95,.28],[0,.475,-9.07],m.sage);batch.box([14.4,.86,.28],[0,8.17,-9.07],m.plaster);
  let edge=-7.2;for(const win of northWindows){const left=win.x-win.w/2;if(left>edge)batch.box([left-edge,6.79,.28],[(left+edge)/2,4.345,-9.07],m.plaster);edge=win.x+win.w/2;}batch.box([7.2-edge,6.79,.28],[(7.2+edge)/2,4.345,-9.07],m.plaster);
  // East wall and its tall window; a broad opening ties in the lower alcove.
  batch.box([.28,8.6,1.4],[7.07,4.3,-8.3],m.plaster);batch.box([.28,8.6,3.2],[7.07,4.3,-3.2],m.plaster);
  batch.box([.28,.95,2.8],[7.07,.475,-6.2],m.sage);batch.box([.28,1.0,2.8],[7.07,8.1,-6.2],m.plaster);
  batch.box([.28,8.6,3.5],[7.07,4.3,7.25],m.plaster);batch.box([.28,4.3,7.1],[7.07,6.45,1.95],m.plaster);
  batch.box([3.75,4.6,.25],[8.8,2.3,-1.67],m.sage);batch.box([3.75,4.6,.25],[8.8,2.3,5.57],m.sage);
  const alcoveWins=[{z:.10,w:2.5},{z:3.5,w:2.5}];
  batch.box([.25,.68,7.4],[10.57,.34,1.95],m.sage);batch.box([.25,.57,7.4],[10.57,4.315,1.95],m.plaster);
  let ze=-1.75;for(const win of alcoveWins){const left=win.z-win.w/2;if(left>ze)batch.box([.25,3.35,left-ze],[10.57,2.355,(left+ze)/2],m.sage);ze=win.z+win.w/2;}batch.box([.25,3.35,5.65-ze],[10.57,2.355,(5.65+ze)/2],m.sage);
  batch.box([3.8,.17,7.4],[8.85,4.66,1.95],m.plaster);
  for(const z of[-1.42,1.9,5.32])batch.box([3.65,.14,.16],[8.8,4.48,z],m.oak);

  function window(origin,width,bottom,top,angle=0,rows=5){
    const pt=(x,y,z)=>localPoint(x,y,z,origin,angle);const box=(s,p,mat)=>batch.box(s,pt(...p),mat,[0,angle,0]);
    const h=top-bottom;
    for(const x of[-width/2,width/2]){box([.14,h+.18,.24],[x,(top+bottom)/2,0],m.oak);box([.032,h+.1,.27],[x+(x>0?-.09:.09),(top+bottom)/2,.04],m.walnut);}
    for(const y of[bottom,top])box([width+.26,.14,.24],[0,y,0],m.oak);
    box([width+.37,.10,.44],[0,bottom-.03,.08],m.stone);box([.055,h,.075],[0,(top+bottom)/2,.035],m.walnut);
    for(let r=1;r<rows;r++)box([width,.045,.075],[0,bottom+h*r/rows,.04],m.walnut);
    // Slightly blue panes preserve a clear exterior; the frame supplies the shadows.
    const glass=new THREE.Mesh(new THREE.PlaneGeometry(width-.11,h-.12),m.glass);glass.position.fromArray(pt(0,(bottom+top)/2,-.02));glass.rotation.y=angle;scene.add(glass);
    for(const x of[-.10,.10]){box([.025,.16,.025],[x,bottom+.9,.09],m.iron);box([.075,.024,.024],[x,bottom+.86,.115],m.brass);}
    for(const x of[-width/2+.07,width/2-.07])for(const y of[bottom+.22,top-.22])box([.03,.09,.013],[x,y,.128],m.iron);
  }
  for(const win of northWindows)window([win.x,0,-8.99],win.w,.96,7.72,0,6);
  window([7.0,0,-6.2],2.8,.96,7.62,-Math.PI/2,6);
  for(const win of alcoveWins)window([10.49,0,win.z],win.w,.69,4.03,-Math.PI/2,3);
  // Gathered, pleated linen gives the alcove windows a softer human scale.
  batch.rod([10.22,4.16,-1.37],[10.22,4.16,5.04],.017,m.iron,10);
  for(const z of[-1.12,4.83]){
    batch.add(curtainGeometry(.48,3.24),m.curtain,[10.18,.74,z],[0,-Math.PI/2,0],[1,1,1],true);
    for(let i=-2;i<=2;i++)batch.add(new THREE.TorusGeometry(.023,.004,5,10),m.brass,[10.22,4.14,z+i*.072]);
    batch.rod([10.11,2.10,z-.09],[10.11,2.10,z+.09],.006,m.pageGold,6);
  }

  // Warm painted panelling, skirting, and timber pilasters frame every approach.
  batch.box([.07,1.15,18],[-6.9,.575,0],m.sage);batch.box([.12,.16,18],[-6.84,.09,0],m.walnut);batch.box([.10,.065,18],[-6.86,1.18,0],m.oak);
  for(let z=-8.7;z<9;z+=1.2){batch.box([.035,.86,.05],[-6.845,.68,z],m.oak);}
  for(const x of[-6,-4.5,-3,3,4.5,6]){batch.box([1.3,1.15,.055],[x,.575,8.91],m.sage);batch.box([.05,.86,.04],[x-.61,.68,8.87],m.oak);batch.box([.05,.86,.04],[x+.61,.68,8.87],m.oak);}
  batch.box([14,.16,.12],[0,.09,8.84],m.walnut);batch.box([14,.065,.085],[0,1.18,8.87],m.oak);
  for(const x of[-6.85,6.85])for(const z of[-8.75,-3.1,3.1,8.75]){
    if(x>0&&z===3.1)continue;
    batch.box([.22,8.6,.23],[x,4.3,z],m.oakVertical);batch.box([.32,.12,.34],[x,.09,z],m.walnut);batch.box([.30,.12,.30],[x,7.65,z],m.walnut);
    for(const y of[1.4,7.6])batch.box([.242,.14,.247],[x,y,z],m.iron);
  }
  batch.box([.23,.28,7.25],[6.85,4.2,1.95],m.oak);for(const z of[-1.47,5.37]){batch.box([.25,4.25,.24],[6.88,2.13,z],m.oak);obstacle(6.7,7.05,z-.12,z+.12,0,4.3,'alcove portal post');}
  // Pitched ceiling, paired trusses, iron straps and visible mortise joints.
  const slope=Math.atan2(1.5,7),rafterLength=Math.hypot(7,1.5);
  for(const side of[-1,1])batch.box([rafterLength+.08,.2,18.4],[side*3.5,9.35,0],m.plaster,[0,0,-side*slope]);
  batch.box([.28,.27,18.25],[0,10.04,0],m.walnut);
  for(const z of[-8.65,-3.05,3.05,8.65]){
    batch.box([13.85,.22,.24],[0,7.63,z],m.oak);
    for(const side of[-1,1]){
      batch.box([rafterLength,.23,.23],[side*3.5,9.35,z],m.oak,[0,0,-side*slope]);
      batch.rod([side*6.5,7.72,z],[side*3.3,9.32,z],.065,m.walnut);
      batch.box([.13,1.62,.13],[side*3.3,8.56,z],m.walnutVertical);
      batch.box([.36,.08,.32],[side*3.3,7.77,z],m.walnut);
      batch.box([.055,.4,.3],[side*3.3,8.1,z],m.iron);
      for(const y of[7.94,8.21])batch.sphere(.022,[side*3.33,y,z+.165],m.iron,[1,1,.4],8);
    }
    batch.rod([-6.4,7.4,z],[6.4,7.4,z],.013,m.iron);batch.rod([0,7.4,z],[0,9.88,z],.013,m.iron);
  }
  for(const side of[-1,1])for(const x of[1.7,5.2])batch.box([.105,.12,18],[side*x,10.1-x/7*1.5,0],m.walnut);

  // Partial L gallery: deep fascia and open structure below.
  batch.box([3.7,.20,6.2],[-5.15,3.4,-5.9],galleryFloor);batch.box([4.6,.20,2.4],[-1,3.4,-7.8],galleryFloor);
  batch.box([.15,.33,6.28],[-3.3,3.32,-5.9],m.walnut);batch.box([4.7,.33,.15],[-.95,3.32,-6.6],m.walnut);batch.box([.14,.33,2.48],[1.3,3.32,-7.8],m.walnut);
  batch.box([3.7,.33,.15],[-5.15,3.32,-2.8],m.walnut);
  for(const z of[-8.7,-7.2,-5.7,-4.2,-2.9])batch.box([3.65,.20,.15],[-5.17,3.23,z],m.oak);
  for(const x of[-2.8,-1.4,0,1.15])batch.box([.15,.20,2.35],[x,3.23,-7.85],m.oak);
  for(const[x,z]of[[-3.37,-6.66],[-3.37,-2.88],[1.23,-6.75]]){
    batch.box([.18,3.25,.18],[x,1.625,z],m.oakVertical);batch.box([.26,.13,.26],[x,.09,z],m.walnut);batch.box([.25,.14,.25],[x,3.10,z],m.walnut);batch.box([.195,.13,.195],[x,.31,z],m.iron);obstacle(x-.12,x+.12,z-.12,z+.12,0,3.28,'gallery support');
  }
  function rail(a,b,base=3.5){
    const len=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.ceil(len/.18);
    batch.rod([a[0],base+1.05,a[1]],[b[0],base+1.05,b[1]],.037,m.oak,10);batch.rod([a[0],base+.14,a[1]],[b[0],base+.14,b[1]],.017,m.iron);
    for(let i=0;i<=n;i++){const t=i/n,x=a[0]+(b[0]-a[0])*t,z=a[1]+(b[1]-a[1])*t;batch.box([.016,.86,.016],[x,base+.58,z],m.iron);if(i%7===0||i===n){batch.box([.06,1.10,.06],[x,base+.55,z],m.iron);batch.sphere(.042,[x,base+1.105,z],m.brass,[1,.8,1],8);}}
  }
  rail([-3.3,-2.8],[-3.3,-6.6]);rail([-3.3,-6.6],[1.3,-6.6]);rail([1.3,-6.6],[1.3,-8.85]);rail([-6.9,-2.8],[-6.5,-2.8]);rail([-3.5,-2.8],[-3.3,-2.8]);
  // Broad timber stair, 20 treads, detailed risers, stringers and continuous handrails.
  const run=STAIR.bottomZ-STAIR.topZ,stepDepth=run/STAIR.steps,stepHeight=STAIR.rise/STAIR.steps;
  for(let i=0;i<STAIR.steps;i++){
    const y=(i+1)*stepHeight,z=STAIR.bottomZ-(i+.5)*stepDepth;
    batch.box([3,.045,stepDepth+.025],[-5,y-.0225,z],m.oak);batch.box([2.94,stepHeight-.03,.03],[-5,y-stepHeight/2-.015,z+stepDepth/2-.025],m.walnut);
    batch.box([3.02,.025,.045],[-5,y-.008,z+stepDepth/2+.01],m.oak);
    // Two dark anti-slip iron strips are inset into the nosing on heavily used steps.
    for(const x of[-6.0,-4.0])batch.box([.40,.003,.012],[x,y+.002,z+stepDepth/2-.045],m.iron,[0,0,0],false);
  }
  for(const x of[-6.57,-3.43]){
    batch.box([.15,.28,Math.hypot(run,STAIR.rise)],[x,1.58,0],m.walnut,[Math.atan2(STAIR.rise,run),0,0]);batch.rod([x,1.03,2.80],[x,4.53,-2.80],.037,m.oak,12);
    for(let i=0;i<=STAIR.steps;i++){
      const z=STAIR.bottomZ-i*stepDepth,y=i*stepHeight;batch.box([.018,.93,.018],[x,y+.53,z],m.iron);
      if(i%5===0){batch.box([.065,1.09,.065],[x,y+.545,z],m.iron);batch.sphere(.045,[x,y+1.10,z],m.brass,[1,.85,1],8);}
    }
  }
  // Book collections: separate epochs of joinery and varied density, with real page blocks.
  books.shelf([-6.63,0,6.2],4.25,2.40,Math.PI/2,5,1);
  books.shelf([-6.63,0,-5.83],5.65,2.55,Math.PI/2,5,2);
  books.shelf([-4.62,0,-8.64],3.60,2.65,0,4,3);
  books.shelf([-4.2,0,8.64],3.35,2.38,Math.PI,5,4);
  books.shelf([4.25,0,8.64],3.65,2.38,Math.PI,5,6);
  books.shelf([-.85,0,2.65],2.6,1.43,0,3,7);
  books.shelf([-.85,0,2.22],2.6,1.43,Math.PI,3,8);
  books.shelf([-.95,0,-.68],2.25,2.02,Math.PI/2,4,9);
  books.shelf([-6.61,3.5,-5.80],5.55,2.2,Math.PI/2,5,10);
  books.shelf([-4.8,3.5,-8.66],3.3,2.22,0,4,11);
  // Low drawers and brass pulls make island shelving useful from above as well.
  for(const x of[-1.75,-.87,.02]){batch.box([.78,.15,.02],[x,.1,2.877],m.oak);batch.box([.09,.018,.022],[x,.105,2.9],m.brass);}
  props.plant([-1.70,1.5,2.42],.8);books.stack([-.62,1.49,2.50],.16,4);props.bookPress([-.08,1.49,2.43],-.07);

  // Main shared reading table, chairs and an old rug; its contents remain visible from the gallery.
  batch.box([4.7,.015,3.3],[2.8,.012,-3.55],m.rug,[0,.015,0],false);
  props.table([2.75,0,-3.55],3.2,1.28);
  for(const x of[1.72,3.78]){props.chair([x,0,-4.54],0);props.chair([x,0,-2.56],Math.PI);}
  props.openBook([2.07,.82,-3.18],-.07);props.smallObjects([3.16,.82,-3.70]);props.lamp([3.86,.82,-3.67]);books.stack([1.44,.82,-3.78],.05,4,.9);
  // Window bench: moulded seat, loose cushions, and a small stack of folios.
  batch.box([3.9,.44,.65],[4.10,.22,-8.50],m.walnut);batch.box([4,.08,.72],[4.10,.48,-8.50],m.oak);
  for(const x of[2.55,4.0,5.25]){batch.add(new THREE.SphereGeometry(.29,12,6),m.linen,[x,.54,-8.44],[0,0,0],[1.8,.18,.92]);}
  obstacle(2.1,6.15,-8.85,-8.1,0,.6,'window bench');books.stack([3.26,.54,-8.4],.17,3);
  // Lower quiet corner underneath the gallery.
  props.armchair([-4.85,0,-5.45],Math.PI/2);props.table([-3.97,0,-7.4],.78,.66,0);props.lamp([-4.15,.82,-7.45]);props.openBook([-3.82,.82,-7.31],.1);
  props.framedArt([-6.87,2.98,6.2],1.08,.83,Math.PI/2,'landscape');props.framedArt([-6.87,2.82,-5.5],.75,.85,Math.PI/2,'botanical');
  // The connected alcove is a lower, softer room with its own distinct furniture group.
  batch.box([2.85,.016,4.7],[8.77,.016,1.85],m.rugAlcove,[0,Math.PI/2,0],false);
  props.armchair([8.61,0,.12],-.45);props.armchair([8.55,0,2.57],Math.PI+.25,true);
  props.table([9.0,0,1.30],.78,.74,0);props.openBook([8.96,.82,1.29],.18);props.cup([9.2,.82,1.48]);
  props.couch([8.72,0,4.84],Math.PI);props.lamp([9.97,0,4.78],'floor');props.plant([9.95,0,-1.03],1.5);
  props.framedArt([8.71,2.24,-1.52],1.4,1.6,0,'map');props.framedArt([8.73,2.42,5.42],1.5,1.1,Math.PI,'landscape');
  // Gallery reading perch and desk: clear walking space between the collections and rails.
  props.armchair([-5.06,3.5,-4.31],Math.PI/2,true);props.lamp([-6.12,3.5,-3.35],'floor');
  props.table([-4.85,3.5,-7.73],1.42,.68,0);props.chair([-4.84,3.5,-7.0],Math.PI);props.lamp([-5.28,4.32,-7.82]);props.openBook([-4.84,4.32,-7.55],.03);props.globe([-4.29,4.32,-7.82]);
  props.plant([.69,3.5,-8.45],1.15);props.framedArt([-6.86,6.38,-5.9],1.24,.94,Math.PI/2,'landscape');
  // A separate, well-used chair beside the southern collection rewards turning around.
  batch.box([2.9,.014,2.8],[4.3,.012,6.1],m.rug,[0,.1,0],false);
  props.armchair([4.75,0,6.25],Math.PI+.45);props.footstool([4.24,0,5.17],.45);
  props.table([3.45,0,6.62],.67,.63,0);props.lamp([3.52,.82,6.69]);props.cup([3.24,.82,6.48]);books.stack([3.43,.82,6.51],.10,2,.75);

  // Entry cupboard, a panelled door, a wall clock, and small collected objects.
  batch.box([1.8,2.57,.07],[0,1.285,8.89],m.walnut);for(const x of[-.46,.46])for(const y of[.68,1.82]){batch.box([.73,1.02,.024],[x,y,8.84],m.sage);batch.box([.65,.94,.01],[x,y,8.82],m.walnut);}
  for(const x of[-.16,.16]){batch.box([.035,.20,.03],[x,1.04,8.785],m.brass);}
  for(const x of[-.99,.99])batch.box([.13,2.72,.13],[x,1.36,8.81],m.oak);batch.box([2.12,.15,.15],[0,2.69,8.81],m.oak);
  const signCanvas=document.createElement('canvas');signCanvas.width=512;signCanvas.height=128;const sc=signCanvas.getContext('2d');sc.fillStyle='#365046';sc.fillRect(0,0,512,128);sc.fillStyle='#dcc99b';sc.textAlign='center';sc.font='26px Georgia';sc.fillText('ASTER READING HOUSE',256,64);sc.font='12px Georgia';sc.fillText('EST. 1848  ·  THE HILLSIDE COLLECTION',256,94);const signTex=new THREE.CanvasTexture(signCanvas);signTex.colorSpace=THREE.SRGBColorSpace;
  batch.box([2.06,.53,.07],[0,3.18,8.85],m.oak);batch.add(new THREE.PlaneGeometry(1.97,.46),new THREE.MeshStandardMaterial({map:signTex,roughness:.8}),[0,3.18,8.80],[0,Math.PI,0],[1,1,1],false);
  props.framedArt([4.95,3.43,8.84],1.0,1.3,Math.PI,'botanical');props.framedArt([3.40,3.16,8.84],.7,.85,Math.PI,'landscape');
  props.plant([5.27,2.47,8.48],.8);books.stack([3.07,2.47,8.44],.10,4);props.globe([-3.29,2.48,8.45]);
  clock([-4.59,3.33,-8.83]);
  function clock(origin){const[x,y,z]=origin;batch.cylinder(.32,.32,.06,[x,y,z],m.walnut,[Math.PI/2,0,0],32);batch.cylinder(.284,.284,.008,[x,y,z+.034],m.linen,[Math.PI/2,0,0],32);for(let i=0;i<12;i++){const a=i/12*Math.PI*2;batch.box([.011,.035,.006],[x+Math.sin(a)*.246,y+Math.cos(a)*.246,z+.041],m.walnut,[0,0,-a]);}batch.rod([x,y,z+.05],[x-.115,y+.096,z+.05],.008,m.walnut);batch.rod([x,y,z+.05],[x+.16,y+.10,z+.05],.006,m.walnut);batch.sphere(.017,[x,y,z+.061],m.brass,[1,1,.3],8);}
  // A suspended iron fixture gives scale without obscuring the tall room.
  const chandelierY=5.87;batch.rod([0,7.40,0],[0,chandelierY+.16,0],.016,m.iron);batch.add(new THREE.TorusGeometry(.63,.018,8,40),m.iron,[0,chandelierY,0],[Math.PI/2,0,0]);for(let i=0;i<6;i++){const a=i/6*Math.PI*2,x=Math.cos(a)*.63,z=Math.sin(a)*.63;batch.rod([0,chandelierY+.50,0],[x,chandelierY,z],.01,m.iron);batch.cylinder(.035,.035,.14,[x,chandelierY+.07,z],m.linen,[0,0,0],10,false);batch.sphere(.014,[x,chandelierY+.167,z],m.glow,[.65,1.8,.65],8);batch.cylinder(.07,.07,.03,[x,chandelierY-.02,z],m.brass);}
  const fill=new THREE.PointLight('#ffe0ad',12,11,2);fill.position.set(0,5.8,0);scene.add(fill);

  const counts=batch.finish();
  createBackdrop(scene,m);
  addLighting(scene);
  addLightShafts(scene);
  return{materials:m,books:books.count,staticPieces:counts.pieces,staticVertices:counts.vertices};
}

function addLighting(scene){
  const hemisphere=new THREE.HemisphereLight('#dde9e1','#766447',1.55);scene.add(hemisphere);
  const sun=new THREE.DirectionalLight('#ffe0a2',3.1);sun.position.set(18,16,-24);sun.target.position.set(-3,0,3);sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-16;sun.shadow.camera.right=16;sun.shadow.camera.top=16;sun.shadow.camera.bottom=-16;sun.shadow.camera.near=1;sun.shadow.camera.far=70;sun.shadow.bias=-.0003;sun.shadow.normalBias=.025;sun.shadow.autoUpdate=false;sun.shadow.needsUpdate=true;
  scene.add(sun,sun.target);scene.userData.sun=sun;
  // Gentle sky spill below the gallery keeps bindings legible without making a second shadow pass.
  const bounce=new THREE.PointLight('#e1e7d8',24,16,2);bounce.position.set(4,4,-6);scene.add(bounce);
  const galleryFill=new THREE.PointLight('#e8ddbb',15,12,2);galleryFill.position.set(-4.4,7,-5.4);scene.add(galleryFill);
}

function createBackdrop(scene,m){
  const terrainMaterial=new THREE.MeshStandardMaterial({vertexColors:true,roughness:1});
  const terrain=new THREE.PlaneGeometry(220,220,72,72);terrain.rotateX(-Math.PI/2);const p=terrain.attributes.position,colors=new Float32Array(p.count*3);const green=new THREE.Color('#838e60'),gold=new THREE.Color('#b2a276'),dark=new THREE.Color('#69794f');
  for(let i=0;i<p.count;i++){
    const x=p.getX(i),z=p.getZ(i);let height=-2+Math.sin(x*.025+.5)*Math.cos(z*.035)*5+Math.sin(z*.07+x*.018)*2.0;
    if(Math.abs(x)<15&&Math.abs(z)<15)height=-1.05; // The building sits on a dry stone terrace.
    p.setY(i,height);const c=green.clone().lerp(gold,(Math.sin(x*.032+z*.068)+1)*.35).lerp(dark,(Math.cos(x*.16-z*.08)+1)*.1);colors.set([c.r,c.g,c.b],i*3);
  }
  terrain.setAttribute('color',new THREE.BufferAttribute(colors,3));terrain.computeVertexNormals();const mesh=new THREE.Mesh(terrain,terrainMaterial);mesh.receiveShadow=false;scene.add(mesh);
  const outside=new Batcher(scene);outside.box([22,1.0,24],[1,-.73,0],m.stone,[0,0,0],false);
  for(let i=0;i<27;i++){const z=-10.4-i*.33,x=9+Math.sin(i*.17)*2;outside.box([1.35,.025,.35],[x,-.17-i*.035,z],m.stone,[0,Math.sin(i*.13)*.12,0],false);}
  // Distant trees are clustered silhouettes with broad foliage, seen through clear panes.
  const trunk=new THREE.MeshStandardMaterial({color:'#5d5940',roughness:1}),leaf=new THREE.MeshStandardMaterial({color:'#657650',roughness:1});
  for(let i=0;i<43;i++){
    const x=-70+rand()*140,z=-20-rand()*77,height=2.8+rand()*5;
    let ground=-2+Math.sin(x*.025+.5)*Math.cos(z*.035)*5+Math.sin(z*.07+x*.018)*2;
    outside.cylinder(.16,.26,height*.5,[x,ground+height*.25,z],trunk,[0,0,0],6,false);
    for(let j=0;j<3;j++)outside.add(new THREE.IcosahedronGeometry(height*.3,1),leaf,[x+(rand()-.5)*height*.25,ground+height*(.6+j*.14),z+(rand()-.5)*height*.3],[rand(),rand(),rand()],[1,.8,1],false);
  }
  for(let i=0;i<9;i++){const x=-80+i*19,z=-93;outside.add(new THREE.SphereGeometry(18,16,8),new THREE.MeshStandardMaterial({color:i%2?'#879886':'#929f86',roughness:1}),[x,-5,z],[0,0,0],[1.2,.45,1],false);}
  outside.finish();
  // Soft paper-blue sky with a very distant warm haze.
  scene.background=new THREE.Color('#c0cdbd');scene.fog=new THREE.Fog('#c1cbb9',45,160);
}

function addLightShafts(scene){
  // Restrained transparent wedges connect the tall windows to the late-day pools of light.
  const material=new THREE.MeshBasicMaterial({color:'#ffe1a1',transparent:true,opacity:.022,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending});
  for(const x of[-.2,2.9,5.55]){
    const g=new THREE.BufferGeometry();const y=2.85,z=-8.86,drop=y-.04,dx=-21/16*drop,dz=27/16*drop;g.setAttribute('position',new THREE.Float32BufferAttribute([x-1,y,z,x+1,y,z,x-1+dx,.04,z+dz,x+1,y,z,x+1+dx,.04,z+dz,x-1+dx,.04,z+dz],3));g.computeVertexNormals();const shaft=new THREE.Mesh(g,material);shaft.renderOrder=2;scene.add(shaft);
  }
}

function curtainGeometry(width,height){
  const columns=32,rows=14,positions=[],uvs=[],indices=[];
  for(let row=0;row<=rows;row++)for(let col=0;col<=columns;col++){
    const u=col/columns,v=row/rows,gather=.55+.45*Math.min(1,Math.pow(Math.abs(v-.43)*2.1,.6));
    const x=(u-.5)*width*gather,z=Math.cos(u*Math.PI*16)*(.03+.018*Math.abs(v-.43));
    positions.push(x,v*height+.015*Math.cos(u*Math.PI*16)*(1-v),z);uvs.push(u*2,v*13);
    if(row<rows&&col<columns){const a=row*(columns+1)+col,b=a+1,c=a+columns+1,d=c+1;indices.push(a,b,c,b,d,c);}
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();return g;
}
