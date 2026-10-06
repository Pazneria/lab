import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { rand, between, signTexture } from './materials.js';

const PI=Math.PI;
export function buildWorld(scene,m){
 const colliders=[],zones=[],steamSources=[],lamps=[],lanternCenters=[];
 const boxGeo=new THREE.BoxGeometry(1,1,1),sphereGeo=new THREE.SphereGeometry(1,14,10),leafGeo=new THREE.SphereGeometry(1,8,5),cylGeo=new THREE.CylinderGeometry(1,1,1,18),coneGeo=new THREE.CylinderGeometry(.7,1,1,18);
 function zone(name,x=0,z=0,angle=0){const g=new THREE.Group();g.name=name;g.position.set(x,0,z);g.rotation.y=angle;scene.add(g);zones.push(g);return g;}
 function mesh(g,geo,mat,x=0,y=0,z=0,sx=1,sy=1,sz=1,rx=0,ry=0,rz=0){const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.rotation.set(rx,ry,rz);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
 const box=(g,mat,x,y,z,w,h,d,ry=0)=>mesh(g,boxGeo,mat,x,y,z,w,h,d,0,ry);
 const rounded=(g,mat,x,y,z,w,h,d,r=.015)=>mesh(g,new RoundedBoxGeometry(w,h,d,2,r),mat,x,y,z);
 const sphere=(g,mat,x,y,z,rx,ry=rx,rz=rx)=>mesh(g,(mat===m.leaf||mat===m.leafLight||mat===m.moss||mat.userData.petal)?leafGeo:sphereGeo,mat,x,y,z,rx,ry,rz);
 const cylinder=(g,mat,x,y,z,r,h,r2=r,rot=0)=>mesh(g,r===r2?cylGeo:new THREE.CylinderGeometry(r2/r,1,1,18),mat,x,y,z,r,h,r,rot);
 function rod(g,mat,a,b,r=.025){const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),mid=av.clone().add(bv).multiplyScalar(.5);const ob=mesh(g,cylGeo,mat,mid.x,mid.y,mid.z,r,av.distanceTo(bv),r);ob.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),bv.sub(av).normalize());return ob;}
 function curve(g,mat,pts,r=.015){const c=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p)));return mesh(g,new THREE.TubeGeometry(c,Math.max(8,pts.length*5),r,5,false),mat);}
 function torus(g,mat,x,y,z,r,t=.012,rx=PI/2){return mesh(g,new THREE.TorusGeometry(r,t,t<.01?3:5,t<.01?18:28),mat,x,y,z,1,1,1,rx);}
 function collider(g,x,z,w,d){g.updateMatrixWorld(true);const pos=new THREE.Vector3(x,0,z).applyMatrix4(g.matrixWorld);colliders.push({x:pos.x,z:pos.z,hx:w/2,hz:d/2,angle:g.rotation.y,name:g.name});}
 function solid(g,mat,x,y,z,w,h,d){const o=box(g,mat,x,y,z,w,h,d);collider(g,x,z,w,d);return o;}
 function sign(g,opts,x,y,z,w=2.6,h=.75,angle=0){const t=signTexture(opts),material=new THREE.MeshStandardMaterial({map:t,roughness:.82,color:'#fff8e9'});const board=new THREE.Group();board.position.set(x,y,z);board.rotation.y=angle;g.add(board);box(board,m.darkWood,0,0,0,w+.09,h+.09,.09);mesh(board,new THREE.PlaneGeometry(w,h),material,0,0,.051);for(let dx of[-w/2+.055,w/2-.055])for(let dy of[-h/2+.05,h/2-.05])sphere(board,m.bronze,dx,dy,.059,.011,.011,.006);return board;}
 function light(g,x,y,z,color,power=22,range=7){const l=new THREE.PointLight(color,power,range,1.7);l.position.set(x,y,z);g.add(l);lamps.push(l);return l;}
 function lantern(g,x,y,z,r=.22,red=false,lit=false){
  const profile=[];for(let i=0;i<=18;i++){const a=i/18*PI;profile.push(new THREE.Vector2(r*(.38+.62*Math.sin(a)),(i/18-.5)*r*2.25));}const a=new THREE.Group();a.position.set(x,y,z);g.add(a);mesh(a,new THREE.LatheGeometry(profile,24),red?m.lanternRed:m.lantern);
  for(let i=1;i<12;i++){const t=i/12,rr=r*(.38+.62*Math.sin(t*PI));torus(a,m.bronze,0,(t-.5)*r*2.25,0,rr,.0025);}
  cylinder(a,m.iron,0,r*1.15,0,r*.4,.05);cylinder(a,m.iron,0,-r*1.15,0,r*.4,.055);rod(a,m.iron,[0,r*1.15,0],[0,r*1.8,0],.011);lanternCenters.push({object:a,radius:r,red});if(lit)light(g,x,y-.1,z,'#ffc17a',18,6);
 }
 const shadowCanvas=document.createElement('canvas');shadowCanvas.width=shadowCanvas.height=128;const sh=shadowCanvas.getContext('2d'),gr=sh.createRadialGradient(64,64,5,64,64,64);gr.addColorStop(0,'rgba(0,0,0,.66)');gr.addColorStop(.65,'rgba(0,0,0,.3)');gr.addColorStop(1,'rgba(0,0,0,0)');sh.fillStyle=gr;sh.fillRect(0,0,128,128);const shadowMat=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
 function contact(g,x,z,w,d){const o=mesh(g,new THREE.PlaneGeometry(w,d),shadowMat,x,.022,z,1,1,1,-PI/2);o.castShadow=false;}
 function crate(g,x,y,z,w=.72,d=.55,h=.43,fill=null){
  box(g,m.darkWood,x,y+.028,z,w,.055,d);for(let side of[-1,1]){for(let row=0;row<3;row++){box(g,m.crate,x,y+.10+row*.125,z+side*d/2,w,.095,.035);box(g,m.crate,x+side*w/2,y+.10+row*.125,z,.035,.095,d);}for(let xx of[-1,1])box(g,m.crate,x+xx*(w/2-.04),y+h/2,z+side*(d/2-.035),.045,h,.045);}
  if(fill==='oranges'||fill==='apples')for(let j=0;j<3;j++)for(let i=0;i<4;i++){const px=x+(i-1.5)*w*.2+between(-.02,.02),pz=z+(j-1)*d*.25+between(-.02,.02),py=y+.29+rand()*.045;const r=.081+rand()*.014;sphere(g,fill==='oranges'?m.orange:m.apple,px,py,pz,r,r*.92,r);rod(g,m.darkWood,[px,py+r*.9,pz],[px+.007,py+r+ .025,pz],.004);if(i%3===0)sphere(g,m.leaf,px+.025,py+r,pz,.035,.008,.016);}
  if(fill==='aubergines')for(let i=0;i<6;i++){const px=x+(i%3-1)*.19,pz=z+(Math.floor(i/3)-.5)*.24;sphere(g,m.aubergine,px,y+.32,pz,.066,.075,.16);sphere(g,m.leaf,px,y+.35,pz-.13,.056,.04,.044);}
  if(fill==='greens')for(let i=0;i<6;i++){let px=x+(i%3-1)*.20,pz=z+(Math.floor(i/3)-.5)*.25;sphere(g,m.ivory,px,y+.18,pz,.045,.08,.08);for(let a=0;a<6;a++){const angle=a*PI/3;const leaf=sphere(g,a%2?m.leaf:m.leafLight,px+Math.sin(angle)*.055,y+.26,pz+Math.cos(angle)*.05,.07,.11,.034);leaf.rotation.y=angle;}}
 }
 function pot(g,x,y,z,r=.2,h=.3,mat=m.terracotta){cylinder(g,mat,x,y+h/2,z,r*.76,h,r);torus(g,mat,x,y+h,z,r,.02);cylinder(g,m.darkWood,x,y+h-.025,z,r*.88,.015);}
 function plant(g,x,y,z,r=.19,h=.4){pot(g,x,y,z,r,h*.55);for(let i=0;i<7;i++){const a=i*2.4,hh=h*between(.8,1.8);rod(g,m.leaf,[x,y+h*.4,z],[x+Math.cos(a)*r,y+hh,z+Math.sin(a)*r],.008);for(let j=0;j<3;j++){const lf=sphere(g,i%2?m.leaf:m.leafLight,x+Math.cos(a)*r*(j/3),y+h*.45+j*hh*.22,z+Math.sin(a)*r*(j/3),r*.45,.015,r*.20);lf.rotation.set(.3,a,.3);}}}
 function bamboo(g,x,y,z,r=.3,h=.2,lid=false){cylinder(g,m.crate,x,y+h/2,z,r,h);for(let yy of [.018,h-.024])torus(g,m.darkWood,x,y+yy,z,r,.009);cylinder(g,m.darkWood,x,y+h+.002,z,r*.89,.006);for(let i=0;i<24;i++){const a=i/24*PI*2;rod(g,m.wood,[x+Math.sin(a)*r,y+.01,z+Math.cos(a)*r],[x+Math.sin(a)*r,y+h,z+Math.cos(a)*r],.008);}if(lid){cylinder(g,m.crate,x,y+h+.012,z,r*.96,.02);for(let i=-4;i<=4;i++){const zz=i*r*.17,ww=Math.sqrt(r*r*.85-zz*zz);box(g,m.wood,x,y+h+.025,z+zz,ww*2,.007,.008);}torus(g,m.darkWood,x,y+h+.04,z,.06,.012,0);}else{for(let i=0;i<6;i++){const a=i/6*PI*2;const bx=x+Math.sin(a)*r*.55,bz=z+Math.cos(a)*r*.55;sphere(g,m.bun,bx,y+h+.045,bz,.075,.062,.069);for(let j=0;j<5;j++){const aa=j/5*PI*2;curve(g,m.ivory,[[bx+Math.sin(aa)*.058,y+h+.055,bz+Math.cos(aa)*.055],[bx+Math.sin(aa)*.035,y+h+.097,bz+Math.cos(aa)*.03],[bx,y+h+.108,bz]],.003);}}}
 }
 function bottle(g,x,y,z,color=m.greenPaint,s=.11){cylinder(g,color,x,y+s*1.15,z,s*.45,s*2.3);cylinder(g,color,x,y+s*2.7,z,s*.21,s*.8);cylinder(g,m.iron,x,y+s*3.15,z,s*.24,s*.16);box(g,m.paper,x,y+s*1.2,z+s*.45,s*.63,s*.85,.004);}
 function canopy(g,type,mat,w=3.55,d=3.2){
  const nx=28,nz=20,verts=[],uvs=[],indices=[];
  function height(x,z){const ridge=type==='arch'?.44*Math.cos(x/w*PI):type==='peak'?.62*(1-Math.abs(x)/(w/2)):type==='lean'?.38*(.5-z/d):.12*(1-Math.abs(x)/(w/2));return 2.68+ridge+.005*Math.cos(x*21)+.008*Math.sin(z*13+x*7)-.06*Math.sin((z/d+.5)*PI);}
  for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){const x=(i/nx-.5)*w,z=(j/nz-.5)*d;verts.push(x,height(x,z),z);uvs.push(i/nx,j/nz);}for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i;indices.push(a,a+nx+1,a+1,a+1,a+nx+1,a+nx+2);}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geo.setIndex(indices);geo.computeVertexNormals();mesh(g,geo,mat);
  for(let side of[-1,1]){const pts=[],vp=[],vu=[],vi=[],hem=[],n=144;for(let i=0;i<=n;i++){const u=i/n,x=(u-.5)*w,y=height(x,side*d/2),drop=type==='lean'?.17:.20+.053*Math.sin((u*12%1)*PI);vp.push(x,y,side*d/2,x,y-drop,side*d/2);vu.push(u,0,u,.10);if(i<n){const a=i*2;vi.push(a,a+1,a+2,a+2,a+1,a+3);}if(i%4===0)pts.push([x,y+.003,side*d/2]);if(i%2===0)hem.push([x,y-drop,side*d/2]);}const vg=new THREE.BufferGeometry();vg.setAttribute('position',new THREE.Float32BufferAttribute(vp,3));vg.setAttribute('uv',new THREE.Float32BufferAttribute(vu,2));vg.setIndex(vi);vg.computeVertexNormals();mesh(g,vg,mat);curve(g,m.ivory,pts,.004);curve(g,m.ivory,hem,.0025);}
  for(let x of[-w/2+.08,w/2-.08])for(let z of[-d/2+.10,d/2-.10]){solid(g,m.iron,x,1.35,z,.052,2.7,.052);cylinder(g,m.iron,x,.08,z,.075,.12);}
  rod(g,m.iron,[-w/2,2.64,-d/2],[w/2,2.64,-d/2],.035);rod(g,m.iron,[-w/2,2.64,d/2],[w/2,2.64,d/2],.028);for(let x of[-w/2+.08,w/2-.08])rod(g,m.iron,[x,2.7,-d/2],[x,2.7,d/2],.025);
  if(type==='peak'||type==='arch')rod(g,m.iron,[0,3.1,-d/2],[0,3.1,d/2],.025);
 }
 function baseStall(name,x,z,angle,kind,cloth){const g=zone(name,x,z,angle);canopy(g,kind,cloth);contact(g,0,.05,4.8,4.4);solid(g,m.darkWood,0,.49,-.12,2.98,.95,1.02);rounded(g,m.wood,0,.97,-.08,3.12,.09,1.16,.018);for(let xx of[-1.36,1.36])box(g,m.iron,xx,.95,-.08,.06,.13,1.22);return g;}
 // The courtyard's floor is continuous, including the covered passage and tea room.
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(26,42),m.paving);ground.rotation.x=-PI/2;ground.position.set(0,0,-6);ground.receiveShadow=true;scene.add(ground);
 const architecture=zone('courtyard walls');
 solid(architecture,m.plaster,-11.2,4.4,0,.6,8.8,26);solid(architecture,m.plasterWarm,11.2,4.8,0,.6,9.6,26);
 solid(architecture,m.plaster,-6.65,4.8,-12.9,9.1,9.6,.6);solid(architecture,m.plasterWarm,6.65,4.8,-12.9,9.1,9.6,.6);box(architecture,m.plasterWarm,0,6.4,-12.9,4.3,6.4,.6);
 for(let x of[-7.1,7.1])solid(architecture,m.plasterWarm,x,3.6,13.1,8.3,7.2,.6);
 colliders.push({x:0,z:13.5,hx:11.5,hz:.2,angle:0,name:'entrance boundary'});
 for(let x of[-10.85,10.85]){box(architecture,m.brick,x,.62,0,.09,1.24,25.8);box(architecture,m.iron,x,1.26,0,.12,.055,25.8);box(architecture,m.darkWood,x,3.5,0,.18,.16,25.8);box(architecture,m.iron,x,6.55,0,.21,.11,25.8);}
 for(let x of[-6.65,6.65]){box(architecture,m.brick,x,.62,-12.55,9.1,1.24,.10);box(architecture,m.iron,x,3.5,-12.48,9.1,.16,.19);box(architecture,m.darkWood,x,6.55,-12.48,9.1,.14,.22);}
 function window(g,x,y,z,w,h,angle=0,lit=false){const a=new THREE.Group();a.position.set(x,y,z);a.rotation.y=angle;g.add(a);box(a,m.darkWood,0,0,0,w+.16,h+.15,.10);box(a,lit?m.litWindow:m.window,0,0,.056,w,h,.025);for(let xx of[-w/2,0,w/2])box(a,m.iron,xx,0,.09,.045,h+.08,.04);for(let yy of[-h/2,h/2,.12])box(a,m.iron,0,yy,.09,w+.08,.04,.04);box(a,m.plaster,0,-h/2-.10,.15,w+.3,.14,.34);if(lit)for(let i=0;i<8;i++)box(a,m.darkWood,(i/7-.5)*w,0,.08,.014,h,.025);}
 for(let z=-10;z<12;z+=3.5)for(let y of[4.8,7.75]){window(architecture,-10.82,y,z,1.2,1.7,PI/2,rand()>.77);window(architecture,10.82,y,z,1.35,1.75,-PI/2,rand()>.75);}
 for(let x=-9;x<=9;x+=3.0)for(let y of[4.85,7.85])window(architecture,x,y,-12.51,1.2,1.75,0,rand()>.76);
 // Closed shop fronts, old drainpipes, balcony rails and ventilation boxes.
 for(let side of[-1,1])for(let z of[-9,-1,7]){
  const a=new THREE.Group();a.position.set(side*10.78,0,z);a.rotation.y=side<0?PI/2:-PI/2;architecture.add(a);box(a,m.darkWood,0,1.6,0,2.7,3.2,.13);box(a,m.greenPaint,0,1.57,.09,2.45,2.94,.05);for(let i=0;i<26;i++)box(a,m.iron,0,.18+i*.107,.132,2.45,.014,.024);box(a,m.iron,0,.13,.13,2.6,.14,.15);
  box(a,m.plaster,0,3.13,.28,2.9,.17,.68);rod(a,m.iron,[-1.32,3.15,.51],[1.32,3.15,.51],.025);
  if(z===-1){box(a,m.ivory,0,5.9,.28,1.05,.62,.52);for(let i=0;i<9;i++)box(a,m.iron,-.26,5.68+i*.047,.55,.48,.013,.014);torus(a,m.iron,.29,5.9,.55,.22,.025,0);for(let j=0;j<8;j++){const angle=j*PI/4;rod(a,m.iron,[.29,5.9,.56],[.29+Math.cos(angle)*.2,5.9+Math.sin(angle)*.2,.56],.008);}}
 }
 for(let side of[-1,1])for(let z of[-11,3,11]){rod(architecture,m.iron,[side*10.65,.1,z],[side*10.65,8.8,z],.07);for(let y of[.5,2.8,5.9])torus(architecture,m.bronze,side*10.65,y,z,.082,.011);}
 // Utility cables are visible from the return route and against the sky.
 for(let zz of[-9,5]){curve(architecture,m.black,[[-10.9,6.4,zz],[-5,5.1,zz+.3],[1,4.9,zz+.4],[7,5.4,zz+.2],[10.9,6.8,zz]],.013);}
 for(let x of[-8,8]){box(architecture,m.iron,x,4.05,-12.0,2.7,.12,.9);rod(architecture,m.iron,[x-1.3,4.1,-11.55],[x-1.3,4.8,-11.55],.025);rod(architecture,m.iron,[x+1.3,4.1,-11.55],[x+1.3,4.8,-11.55],.025);rod(architecture,m.iron,[x-1.3,4.8,-11.55],[x+1.3,4.8,-11.55],.025);for(let j=0;j<11;j++)rod(architecture,m.iron,[x-1.25+j*.25,4.1,-11.55],[x-1.25+j*.25,4.8,-11.55],.01);plant(architecture,x+.7,4.13,-11.85,.18,.7);}
 // Drainage channels and grates give the walking surface real, human-scale detail.
 const details=zone('courtyard details');
 for(let x of[-9.9,9.9]){box(details,m.black,x,.008,0,.18,.018,24.6);for(let z=-12;z<12;z+=.18)box(details,m.steel,x,.018,z,.18,.019,.026);}
 box(details,m.black,0,.009,-11.6,4.1,.019,.25);for(let x=-2;x<=2;x+=.10)box(details,m.steel,x,.021,-11.6,.026,.022,.25);
 for(let z of[7.7,-7.7]){box(details,m.iron,1.45,.018,z,.74,.025,.6);for(let i=0;i<13;i++)box(details,m.black,1.15+i*.049,.033,z,.017,.01,.48);}
 for(let side of[-1,1])for(let z of[-11.7,10.8]){pot(details,side*9.2,0,z,.38,.62);plant(details,side*9.2,0,z,.38,1.3);collider(details,side*9.2,z,.7,.7);contact(details,side*9.2,z,1.6,1.6);}
 for(let i=0;i<30;i++){const x=(rand()>.5?1:-1)*between(9.7,10.6),z=between(-12,12);sphere(details,m.moss,x,.015,z,between(.04,.15),.011,between(.04,.20));}
 // Stall 01: produce under a softly striped, peaked green canvas.
 const produce=baseStall('01 · Willow produce',-5.55,4.5,.33,'peak',m.striped);
 sign(produce,{title:'青果',subtitle:'WILLOW  /  FRUIT & GREENS',small:'SEASONAL • GROWN NEARBY',bg:'#344b3e'},0,2.34,1.53,2.45,.54);
 for(let x of[-1.35,1.35])lantern(produce,x,2.25,.95,.16,false);light(produce,0,2.25,.72,'#ffd092',26,7);
 crate(produce,-.89,1.015,.07,.75,.61,.4,'oranges');crate(produce,.02,1.015,-.02,.78,.57,.4,'greens');crate(produce,.89,1.015,.02,.67,.60,.4,'aubergines');
 crate(produce,-1.25,0,1.04,.57,.50,.38,'apples');collider(produce,-1.25,1.04,.6,.5);crate(produce,1.05,0,-1.16,.77,.55);crate(produce,1.05,.44,-1.16,.77,.55,.43,'oranges');collider(produce,1.05,-1.16,.8,.6);crate(produce,-1.1,0,-1.19,.74,.51);
 for(let x of[-1,0,1]){sign(produce,{title:x===-1?'旬':x===0?'葉':'茄',subtitle:x===-1?'CITRUS  3.50':x===0?'GREENS  2.00':'AUBERGINE  2.80',width:384,height:320,bg:'#bdad7f',ink:'#233b34',accent:'#827346'},x,1.19,.61,.23,.19,-.03);}
 box(produce,m.olive,0,.65,.45,2.65,.51,.023);sign(produce,{title:'FRESH DAILY',subtitle:'FROM THE MORNING HARVEST',height:256,bg:'#344b3e'},0,.62,.473,1.04,.28);rod(produce,m.bronze,[-1.58,2.57,-1.05],[1.58,2.57,-1.05],.012);
 // Stall 02: red lean-to, a stainless grill, little bottles and a blackened flue.
 const grill=baseStall('02 · Ember skewers',5.5,4.1,-.38,'lean',m.rust);
 box(grill,m.redPaint,0,.5,.444,2.9,.85,.022);box(grill,m.steel,0,1.029,-.08,3.17,.028,1.17);box(grill,m.steel,-.43,1.10,-.06,1.38,.14,.75);box(grill,m.black,-.43,1.18,-.06,1.23,.025,.62);
 for(let i=0;i<17;i++)rod(grill,m.iron,[-1.0+i*.068,1.21,-.34],[-1.0+i*.068,1.21,.25],.011);
 const coal=new THREE.MeshStandardMaterial({color:'#763120',emissive:'#e34811',emissiveIntensity:1.1,roughness:1});for(let i=0;i<18;i++)sphere(grill,coal,between(-.94,.06),1.19,between(-.31,.2),.035,.025,.036);
 for(let i=0;i<6;i++){const x=-.89+i*.16;rod(grill,m.crate,[x,1.239,-.30],[x,1.239,.45],.010);for(let j=0;j<4;j++){const meat=rounded(grill,m.meat,x,1.27,-.22+j*.12,.10,.068,.09,.017);meat.rotation.y=between(-.15,.15);for(let k=0;k<2;k++)box(grill,m.black,x-.018+k*.04,1.305,-.22+j*.12,.004,.001,.055,.1);}}
 cylinder(grill,m.steel,.72,1.18,-.20,.27,.27);torus(grill,m.iron,.72,1.325,-.20,.26,.017);cylinder(grill,m.darkWood,.72,1.32,-.20,.239,.012);for(let xx of[.38,1.03])torus(grill,m.iron,xx,1.20,-.20,.07,.015,0);rod(grill,m.wood,[.82,1.28,-.22],[.94,1.72,-.30],.015);
 for(let i=0;i<3;i++)bottle(grill,.56+i*.23,1.05,.33,i===1?m.redPaint:m.greenPaint,.1);
 box(grill,m.steel,-.67,2.21,-.66,1.65,.16,.88);box(grill,m.steel,-.67,2.39,-.88,1.10,.31,.51);cylinder(grill,m.iron,-.67,3.03,-.88,.19,1.08);cylinder(grill,m.iron,-.67,3.62,-.88,.27,.09);
 sign(grill,{title:'炭火',subtitle:'EMBER  /  CHARCOAL SKEWERS',small:'SLOW FIRE • HOT OFF THE GRILL',bg:'#6b352c'},0,2.32,1.51,2.39,.53);
 lantern(grill,-1.36,2.12,1.05,.21,true);lantern(grill,1.36,2.16,1.05,.18,true);light(grill,0,2.25,.80,'#ffa565',30,7);
 steamSources.push({g:grill,x:-.5,y:1.28,z:-.05,spread:.45,height:1.4});
 crate(grill,1.18,0,-1.14,.67,.59);collider(grill,1.18,-1.14,.7,.6);for(let i=0;i<5;i++)rod(grill,m.wood,[-1.1+i*.07,.15,-1.05],[-.80+i*.09,.42,-1.1],.045);box(grill,m.steel,-1.7,.54,-.25,.08,.6,.4);collider(grill,-1.7,-.25,.13,.5);
 // Stall 03: a deep blue rounded canopy, bamboo steamers and a short hanging curtain.
 const buns=baseStall('03 · Moon dumplings',-5.9,-4.4,.52,'arch',m.blue);
 box(buns,m.greenPaint,0,.50,.447,2.9,.83,.028);sign(buns,{title:'月餃子',subtitle:'MOON  /  DUMPLING HOUSE',small:'FOLDED BY HAND • SERVED IN BAMBOO',bg:'#284955'},0,2.43,1.50,2.46,.55);
 for(let i=0;i<5;i++){box(buns,m.blue,(i-2)*.49,2.05,-1.32,.46,.82,.012);const textMat=new THREE.MeshStandardMaterial({map:signTexture({title:['月','の','餃','子','屋'][i],bg:'#315564',ink:'#d5d8bf',width:256,height:384,vertical:true,border:false}),roughness:1});mesh(buns,new THREE.PlaneGeometry(.43,.67),textMat,(i-2)*.49,2.05,-1.307);}
 bamboo(buns,-.85,1.02,.06,.34,.20);bamboo(buns,-.12,1.02,-.13,.31,.20);bamboo(buns,-.12,1.23,-.13,.31,.20);bamboo(buns,.62,1.02,.10,.30,.19,true);bamboo(buns,1.12,1.02,-.42,.21,.17,true);
 for(let x of[-1.37,1.37])lantern(buns,x,2.20,.94,.20);light(buns,0,2.22,.60,'#ffd7a2',26,7);steamSources.push({g:buns,x:-.8,y:1.27,z:.1,spread:.28,height:1.2});
 cylinder(buns,m.ceramic,-1.20,1.13,-.45,.1,.21);for(let i=0;i<8;i++)rod(buns,m.crate,[-1.21+rand()*.07,1.17,-.45+rand()*.06],[-1.24+rand()*.09,1.55,-.46+rand()*.06],.005);
 sign(buns,{title:'蒸し',subtitle:'SIX PIECES  /  8',small:'GINGER • SPRING ONION',bg:'#c2b891',ink:'#243e42',width:512,height:512},1.16,1.30,.43,.43,.48,-.13);crate(buns,.8,0,-1.18,.77,.51);collider(buns,.8,-1.18,.8,.54);
 // Stall 04: flowers and stems beneath a pale scalloped canopy, a handcart on iron wheels.
 const flowers=baseStall('04 · Little stem',5.8,-4.7,-.55,'soft',m.cream);
 box(flowers,m.greenPaint,0,.50,.448,2.9,.83,.026);sign(flowers,{title:'花と枝',subtitle:'LITTLE STEM  /  FLOWERS',small:'A FEW GOOD THINGS TO TAKE HOME',bg:'#4a5746'},0,2.35,1.52,2.38,.50);
 for(let x of[-1.13,1.13]){torus(flowers,m.iron,x,.32,.46,.27,.045,0);for(let i=0;i<8;i++){const a=i*PI/4;rod(flowers,m.iron,[x,.32,.46],[x+Math.sin(a)*.25,.32+Math.cos(a)*.25,.46],.012);}cylinder(flowers,m.bronze,x,.32,.46,.06,.05,.06,PI/2);}
 const petalMats=[new THREE.MeshStandardMaterial({color:'#dca49a',roughness:.86}),new THREE.MeshStandardMaterial({color:'#e4c76f',roughness:.86}),new THREE.MeshStandardMaterial({color:'#d5d8b7',roughness:.86})];
 petalMats.forEach(mat=>mat.userData.petal=true);
 function bouquet(x,z,y,r,h,idx,count=6){pot(flowers,x,y,z,r,h*.43,m.steel);for(let i=0;i<count;i++){const a=i*2.4,rr=between(.03,r*.9),fx=x+Math.cos(a)*rr,fz=z+Math.sin(a)*rr,fy=y+h*between(.76,1.2);curve(flowers,m.leaf,[[x,y+.1,z],[x+Math.cos(a)*r*.3,y+h*.6,z+Math.sin(a)*r*.3],[fx,fy,fz]],.007);for(let j=0;j<2;j++){const lf=sphere(flowers,m.leaf,fx+(j?-.045:.04),fy-.17-j*.10,fz,.065,.012,.025);lf.rotation.z=j?-.4:.4;}for(let j=0;j<7;j++){const aa=j*PI*2/7;const pe=sphere(flowers,petalMats[idx],fx+Math.cos(aa)*.040,fy,fz+Math.sin(aa)*.040,.044,.023,.040);pe.rotation.set(.3,aa,.25);}sphere(flowers,m.yellow,fx,fy+.015,fz,.025,.018,.025);}}
 bouquet(-.91,-.08,1.015,.17,.80,0,7);bouquet(-.20,-.14,1.015,.18,.64,2,6);bouquet(.50,-.15,1.015,.16,.85,1,5);pot(flowers,1.13,1.015,.22,.16,.23,m.ceramic);plant(flowers,1.13,1.015,.22,.16,.36);bouquet(-1.3,1.05,0,.24,.92,2,8);collider(flowers,-1.3,1.05,.48,.48);plant(flowers,1.12,0,-1.13,.25,.82);collider(flowers,1.12,-1.13,.55,.55);
 for(let i=0;i<3;i++){const wrap=mesh(flowers,new THREE.ConeGeometry(.1,.39,8,1,true),m.paper,.75+i*.12,1.08,.47,1,1,1,PI/2,.13);rod(flowers,m.leaf,[.75+i*.12,1.09,.66],[.75+i*.12,1.09,.24],.01);}
 lantern(flowers,-1.35,2.16,.9,.18);lantern(flowers,1.34,2.16,.9,.18);light(flowers,0,2.32,.60,'#ffdbab',24,7);
 // A-frame chalk menus sit outside the primary path, with real thickness and hinges.
 function menu(g,x,z,heading,lines){const a=new THREE.Group();a.position.set(x,0,z);g.add(a);box(a,m.wood,0,.69,0,.64,1.28,.07);const canvas=document.createElement('canvas');canvas.width=384;canvas.height=640;const cx=canvas.getContext('2d');cx.fillStyle='#263936';cx.fillRect(0,0,384,640);cx.textAlign='center';cx.fillStyle='#d3c9a8';cx.font='27px Georgia';cx.fillText(heading,192,75);cx.fillStyle='#ae9070';cx.fillRect(50,110,284,2);cx.font='19px Arial';lines.forEach((l,i)=>cx.fillText(l,192,175+i*73));cx.font='14px Arial';cx.fillStyle='#a5b09b';cx.fillText('TAKE YOUR TIME',192,560);const tx=new THREE.CanvasTexture(canvas);tx.colorSpace=THREE.SRGBColorSpace;mesh(a,new THREE.PlaneGeometry(.54,1.12),new THREE.MeshStandardMaterial({map:tx,roughness:1}),0,.70,.041);for(let xx of[-.28,.28]){rod(a,m.darkWood,[xx,.06,-.35],[xx,1.30,0],.025);rod(a,m.bronze,[xx,.45,-.22],[xx,.45,.02],.008);}collider(g,x,z,.68,.5);contact(g,x,z,1.1,.9);}
 menu(produce,2.03,.73,'THE HARVEST',['Citrus   3.50','Leaf greens   2','Apples   3','Eggplant   2.80']);menu(grill,-2.03,.65,'FROM THE FIRE',['Miso chicken   4','Shiitake   3','Spring onion   3','Three sticks   10']);menu(buns,2.02,.67,'WARM & FOLDED',['Pork + ginger','Mushroom','Six pieces   8','Chili oil   +1']);menu(flowers,-2.02,.52,'FOR THE TABLE',['One stem   3','A small bunch   9','Seasonal greens','Wrapped with care']);
 // Passage: lower, more intimate light and a framed view back into the courtyard.
 const passage=zone('covered passage');
 solid(passage,m.plasterWarm,-2.24,1.85,-16.10,.36,3.7,6.9);solid(passage,m.plaster,2.24,1.85,-16.10,.36,3.7,6.9);box(passage,m.darkWood,0,3.59,-16.2,4.9,.22,7.4);
 for(let z=-12.6;z>=-19.6;z-=1.42){box(passage,m.darkWood,0,3.32,z,4.56,.22,.19);for(let x of[-2.025,2.025])box(passage,m.darkWood,x,1.65,z,.13,3.3,.15);}
 for(let x of[-2.035,2.035])box(passage,m.brick,x,.48,-16.3,.06,.96,7.3);
 sign(passage,{title:'お茶',subtitle:'TEA THROUGH THE PASSAGE',bg:'#294945'},0,3.02,-12.51,2.06,.47);
 sign(passage,{title:'茶',width:256,height:640,vertical:true,bg:'#a37c47',ink:'#202f28',accent:'#504734'},2.6,2.1,-12.47,.47,1.18);
 for(let z of[-13.5,-17.3]){lantern(passage,0,2.94,z,.19);rod(passage,m.iron,[0,3.4,z],[0,3.12,z],.009);}light(passage,0,2.7,-15.1,'#ffba76',18,7);
 // Passage details: rain-dark skirting, conduit, notice board and worn thresholds.
 box(passage,m.iron,-1.99,2.78,-16.25,.035,.04,6.6);for(let z of[-12.75,-19.55])box(passage,m.plasterWarm,0,.017,z,4.1,.034,.20);
 sign(passage,{title:'静かな夜',subtitle:'QUIET HOURS  /  RESPECT OUR NEIGHBOURS',small:'THANK YOU FOR VISITING RAINCOURT',bg:'#93896d',ink:'#273b35'},-2.018,1.65,-15.6,1.20,.56,PI/2);
 box(passage,m.greenPaint,1.997,1.13,-17.5,.06,1.94,1.15);rod(passage,m.bronze,[1.945,.95,-17.82],[1.945,1.25,-17.82],.014);
 // The tiny tea room finishes the axis; the bench offers another courtyard-facing view.
 const tea=zone('tiny tea counter');
 solid(tea,m.plasterWarm,-3.44,1.85,-21.7,.32,3.7,4.55);solid(tea,m.plaster,3.44,1.85,-21.7,.32,3.7,4.55);solid(tea,m.plasterWarm,0,1.85,-24,7.2,3.7,.32);box(tea,m.darkWood,0,3.64,-21.75,7.15,.18,4.9);
 for(let x of[-2.8,2.8])solid(tea,m.plasterWarm,x,1.85,-19.52,1.05,3.7,.20);
 for(let z of[-20.1,-22,-23.8])box(tea,m.darkWood,0,3.39,z,6.6,.20,.16);
 solid(tea,m.darkWood,0,.52,-22.57,4.85,1.04,.77);rounded(tea,m.wood,0,1.075,-22.55,5.02,.10,.91,.021);box(tea,m.greenPaint,0,.64,-22.158,4.63,.59,.02);for(let x=-2.15;x<2.2;x+=.14)box(tea,m.wood,x,.62,-22.14,.033,.58,.026);
 sign(tea,{title:'一服',subtitle:'ONE LAST CUP',small:'HOUJICHA  /  JASMINE  /  SENCHA',bg:'#32453c'},0,2.50,-23.78,2.33,.81);
 for(let x of[-2.49,2.49]){box(tea,m.darkWood,x,1.8,-23.61,1.02,.085,.5);box(tea,m.darkWood,x,2.4,-23.61,1.02,.085,.5);for(let i=0;i<3;i++){const xx=x+(i-1)*.28;cylinder(tea,i===1?m.greenPaint:m.terracotta,xx,1.98,-23.60,.095,.28);cylinder(tea,m.bronze,xx,2.13,-23.60,.102,.034);cylinder(tea,i===1?m.redPaint:m.greenPaint,xx,2.56,-23.62,.09,.24);cylinder(tea,m.bronze,xx,2.69,-23.62,.095,.028);}}
 const kettleMat=new THREE.MeshStandardMaterial({color:'#26312c',metalness:.65,roughness:.7,bumpMap:m.ceramic.bumpMap,bumpScale:.006});sphere(tea,kettleMat,-.65,1.32,-22.48,.23,.20,.23);cylinder(tea,kettleMat,-.65,1.50,-22.48,.13,.035);sphere(tea,m.darkWood,-.65,1.545,-22.48,.045,.035,.045);curve(tea,kettleMat,[[-.86,1.35,-22.49],[-.92,1.71,-22.48],[-.62,1.79,-22.48],[-.40,1.68,-22.48],[-.44,1.35,-22.49]],.025);rod(tea,kettleMat,[-.44,1.30,-22.45],[-.27,1.44,-22.45],.055);cylinder(tea,m.iron,-.65,1.16,-22.48,.25,.07);
 for(let i=0;i<3;i++){const x=.15+i*.31;cylinder(tea,m.wood,x,1.143,-22.35,.14,.015);cylinder(tea,m.ceramic,x,1.214,-22.35,.085,.13,.1);cylinder(tea,m.darkWood,x,1.283,-22.35,.084,.002);torus(tea,m.ceramic,x,1.284,-22.35,.089,.008);}
 box(tea,m.darkWood,.47,1.132,-22.33,1.1,.028,.43);sign(tea,{title:'茶',subtitle:'A POT  /  5',bg:'#c7b990',ink:'#263a30',width:384,height:512},1.65,1.35,-22.29,.29,.40,-.14);bamboo(tea,-1.65,1.13,-22.56,.22,.12,true);steamSources.push({g:tea,x:-.55,y:1.5,z:-22.48,spread:.1,height:.65});
 lantern(tea,-1.85,2.7,-22,.20);lantern(tea,1.85,2.7,-22,.20);light(tea,0,2.6,-21.6,'#ffca87',33,7);
 solid(tea,m.darkWood,-2.92,.32,-20.98,.47,.64,1.80);box(tea,m.wood,-2.92,.68,-20.98,.56,.08,1.86);plant(tea,2.90,0,-23.2,.26,.95);collider(tea,2.90,-23.2,.6,.6);contact(tea,0,-22.3,5.8,2);
 // Labels, a folded linen cloth and a little tea scoop invite a closer look.
 for(let x of[-2.49,2.49])for(let y of[1.98,2.56])for(let i=0;i<3;i++){const xx=x+(i-1)*.28;box(tea,m.paper,xx,y,-23.50,.096,.13,.004);for(let j=0;j<3;j++)box(tea,m.greenPaint,xx,y+.028-j*.026,-23.496,.055-j*.009,.004,.002);}
 rounded(tea,m.cream,1.05,1.15,-22.70,.42,.024,.25,.008);rod(tea,m.crate,[1.20,1.175,-22.65],[1.47,1.175,-22.65],.012);sphere(tea,m.crate,1.51,1.179,-22.65,.062,.014,.027);
 // A sheltered gate closes the return composition and makes the entrance boundary visible.
 const entry=zone('entrance gate');box(entry,m.darkWood,0,3.55,12.65,6.1,.22,1.7);solid(entry,m.darkWood,-2.78,1.75,13.0,.23,3.5,.23);solid(entry,m.darkWood,2.78,1.75,13.0,.23,3.5,.23);solid(entry,m.greenPaint,0,1.51,13.43,5.45,3.02,.10);
 for(let x=-2.60;x<=2.60;x+=.145){box(entry,m.darkWood,x,1.51,13.355,.039,2.98,.037);}for(let y of[.10,1.1,2.05,2.96])box(entry,m.darkWood,0,y,13.335,5.45,.072,.065);box(entry,m.darkWood,0,1.51,13.30,.09,3.02,.07);
 for(let x of[-.19,.19])torus(entry,m.bronze,x,1.45,13.25,.075,.014,0);
 sign(entry,{title:'雨の庭',subtitle:'RAINCOURT  /  NIGHT MARKET',small:'GOOD FOOD • GOOD COMPANY • SLOW EVENINGS',bg:'#32463f'},0,3.11,12.70,2.9,.55,PI);
 for(let x of[-2.41,2.41])lantern(entry,x,2.57,12.5,.19,true);light(entry,0,2.55,12.45,'#e9bd82',15,5);
 box(entry,m.iron,-3.34,1.72,12.71,.32,.55,.11);sign(entry,{title:'12',subtitle:'RAINCOURT',width:256,height:384,bg:'#173c38'},-3.34,1.72,12.635,.25,.43,PI);
 // Useful small hardware along the enclosure, away from the walking loop.
 for(let side of[-1,1]){const a=new THREE.Group();a.position.set(side*10.72,0,4.7);a.rotation.y=side<0?PI/2:-PI/2;details.add(a);rounded(a,m.iron,0,1.28,0,.41,.58,.19,.018);box(a,m.black,0,1.38,.106,.23,.16,.012);for(let x of[-.11,.11])sphere(a,m.bronze,x,1.09,.11,.011);rod(a,m.iron,[0,1.59,0],[0,2.42,0],.016);curve(a,m.iron,[[0,2.42,0],[0,2.52,0],[.25,2.54,0],[.55,2.54,0]],.016);}
 // A delivery bicycle rests against the wall; its footprint never cuts the central route.
 const bike=new THREE.Group();bike.position.set(10.25,0,9.2);bike.rotation.y=PI/2-.10;details.add(bike);
 for(let x of[-.54,.54]){torus(bike,m.black,x,.34,0,.32,.032,0);torus(bike,m.steel,x,.34,0,.28,.011,0);for(let i=0;i<12;i++){const a=i*PI/6;rod(bike,m.steel,[x,.34,0],[x+Math.sin(a)*.28,.34+Math.cos(a)*.28,0],.003);}sphere(bike,m.steel,x,.34,0,.04);}
 for(const [a,b]of[[[-.54,.34,0],[-.16,.81,0]],[[-.16,.81,0],[.40,.80,0]],[[.40,.80,0],[.04,.32,0]],[[.04,.32,0],[-.54,.34,0]],[[-.16,.81,0],[.04,.32,0]],[[.40,.80,0],[.54,.34,0]]])rod(bike,m.redPaint,a,b,.024);
 rod(bike,m.steel,[-.16,.78,0],[-.18,.96,0],.018);rounded(bike,m.darkWood,-.18,.98,0,.24,.05,.14,.02);rod(bike,m.steel,[.4,.79,0],[.38,1.01,0],.018);rod(bike,m.steel,[.38,1.01,-.19],[.38,1.01,.19],.014);torus(bike,m.iron,.04,.32,0,.095,.012,0);box(bike,m.darkWood,.08,.24,.10,.16,.025,.06);box(bike,m.iron,-.46,.72,0,.5,.035,.22);collider(details,10.23,9.2,.60,1.9);contact(details,10.23,9.2,1.2,2.5);
 // Low shelves and folded cloth on the rear of the stalls make their reverse sides complete.
 for(const g of[produce,grill,buns,flowers]){for(let x of[-1.0,0,1.0]){rounded(g,m.wood,x,.51,-.65,.88,.57,.06,.01);rod(g,m.bronze,[x-.10,.66,-.70],[x+.10,.66,-.70],.010);}box(g,m.iron,0,.88,-.69,2.91,.026,.032);}
 rounded(grill,m.cream,1.14,1.063,-.13,.24,.02,.27,.008);rounded(buns,m.cream,.89,1.027,-.52,.30,.023,.19,.006);
 // A modest teal sign provides a cool accent, kept away from the warm food lights.
 const neonMat=new THREE.MeshStandardMaterial({color:'#83c1b4',emissive:'#4fbaab',emissiveIntensity:1.6,roughness:.45});box(architecture,m.iron,8.67,3.25,-12.48,1.11,1.76,.20);const neon=sign(architecture,{title:'夜市',vertical:true,width:256,height:640,bg:'#132f31',ink:'#9bd9be',accent:'#41685f'},8.67,3.25,-12.35,.94,1.57);for(let x of[8.22,9.12])box(architecture,neonMat,x,3.25,-12.28,.018,1.52,.02);light(architecture,8.5,3.3,-11.8,'#6abca9',10,5);
 // String lights cross at different heights instead of a regular ceiling grid.
 const strings=zone('lantern strings');
 const cablePts=[[-10.8,5.55,1],[-6,4.8,-.6],[0,4.30,-1.6],[6,4.8,-2.8],[10.8,5.5,-4]];curve(strings,m.black,cablePts,.016);for(let i=0;i<9;i++){const t=(i+1)/10;const curvePath=new THREE.CatmullRomCurve3(cablePts.map(v=>new THREE.Vector3(...v)));const p=curvePath.getPoint(t);rod(strings,m.iron,[p.x,p.y,p.z],[p.x,p.y-.16,p.z],.008);lantern(strings,p.x,p.y-.33,p.z,.14,i%3===0);}
 curve(strings,m.black,[[-10.6,5.1,-9.1],[-5,4.4,-8.7],[0,4.1,-8.4],[5,4.6,-8.7],[10.6,5.4,-9]],.013);for(let x of[-6,-3,0,3,6])lantern(strings,x,4.01+Math.abs(x)*.04,-8.5,.13,false);
 // Crated supplies, folded tarps and a few damp leaves reward side and rear inspection.
 for(const [g,x]of[[produce,-1],[grill,1],[buns,-1],[flowers,1]]){crate(g,x*.9,0,-1.95,.75,.57);collider(g,x*.9,-1.95,.8,.62);box(g,m.blue,-x*.83,.16,-1.93,.9,.22,.61);collider(g,-x*.83,-1.93,.95,.64);contact(g,0,-1.8,3.8,1.8);}
 for(let i=0;i<32;i++){const x=between(-10.3,10.3),z=between(-11.7,12);if(Math.abs(x)<2&&rand()>.2)continue;const leaf=sphere(details,rand()>.5?m.terracotta:m.leaf,x,.025,z,.045,.006,.08);leaf.rotation.y=rand()*PI;}
 // Static material batches preserve detail while reducing submission cost.
 scene.updateMatrixWorld(true);
 function optimize(g){const buckets=new Map();g.traverse(o=>{if(o.isMesh&&o.geometry&&o.material&&!o.material.transparent){const key=o.material.uuid;if(!buckets.has(key))buckets.set(key,{material:o.material,geos:[],objects:[]});const geo=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();geo.applyMatrix4(o.matrixWorld);if(!geo.attributes.uv){const uv=new Float32Array(geo.attributes.position.count*2);geo.setAttribute('uv',new THREE.BufferAttribute(uv,2));}const data=buckets.get(key);data.geos.push(geo);data.objects.push(o);}});for(const{material,geos,objects}of buckets.values()){const geo=mergeGeometries(geos,false);if(!geo)continue;geo.computeBoundingSphere();const o=new THREE.Mesh(geo,material);o.name=g.name+' / batch';o.castShadow=true;o.receiveShadow=true;scene.add(o);for(const child of objects)child.removeFromParent();for(const geo of geos)geo.dispose();}}
 for(const g of zones)optimize(g);
 const steamWorld=steamSources.map(s=>{const p=new THREE.Vector3(s.x,s.y,s.z).applyMatrix4(s.g.matrixWorld);return{position:p,spread:s.spread,height:s.height};});
 return {colliders,steamSources:steamWorld,lamps,lanterns:lanternCenters.map(l=>({position:l.object.getWorldPosition(new THREE.Vector3()),radius:l.radius,red:l.red})),stats:{zones:zones.length,colliders:colliders.length}};
}
