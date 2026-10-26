import * as THREE from './vendor/three.module.js';

// Rainline Station: all geometry and surface maps are authored in this file.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa9bdbe);
scene.fog = new THREE.FogExp2(0x9aafb0, 0.013);
const camera = new THREE.PerspectiveCamera(68, innerWidth / innerHeight, 0.08, 180);
const renderer = new THREE.WebGLRenderer({antialias:true, powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
document.querySelector('#scene').appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xd9e9e8, 0x4f5c59, 2.0));
const sun = new THREE.DirectionalLight(0xc8dbdf, 1.25); sun.position.set(-8,15,8); scene.add(sun);

let seed = 4812; const rand=()=>{seed=(seed*1664525+1013904223)>>>0; return seed/4294967296;};
function texture(kind){
 const c=document.createElement('canvas'); c.width=c.height=512; const g=c.getContext('2d');
 if(kind==='concrete'){
  g.fillStyle='#828985';g.fillRect(0,0,512,512);
  for(let i=0;i<14000;i++){let v=Math.floor(rand()*55);g.fillStyle=`rgba(${v},${v+7},${v+5},${rand()*.12})`;let x=rand()*512,y=rand()*512;g.fillRect(x,y,rand()*3+0.3,rand()*3+0.3)}
  for(let i=0;i<48;i++){g.strokeStyle=`rgba(35,48,46,${rand()*.12})`;g.lineWidth=rand()*2;let x=rand()*512,y=rand()*512;g.beginPath();g.moveTo(x,y);g.lineTo(x+rand()*42-21,y+rand()*28);g.stroke()}
 }else if(kind==='wood'){
  g.fillStyle='#725b48';g.fillRect(0,0,512,512);
  for(let i=0;i<1300;i++){let x=rand()*512;g.strokeStyle=rand()>.5?'rgba(31,24,20,.12)':'rgba(219,188,142,.09)';g.lineWidth=rand()*2+.3;g.beginPath();g.moveTo(x,0);g.bezierCurveTo(x+rand()*8-4,170,x+rand()*12-6,330,x+rand()*7-3,512);g.stroke()}
  for(let y=0;y<512;y+=128){g.fillStyle='rgba(31,29,25,.18)';g.fillRect(0,y,512,2)}
 }else if(kind==='metal'){
  g.fillStyle='#4c605f';g.fillRect(0,0,512,512);
  for(let i=0;i<9000;i++){const v=rand()*120|0;g.fillStyle=`rgba(${v},${v+12},${v+10},${rand()*.09})`;g.fillRect(rand()*512,rand()*512,rand()*2+1,rand()*6+1)}
  for(let i=0;i<70;i++){g.strokeStyle=`rgba(218,231,224,${rand()*.12})`;g.lineWidth=rand()*1.5;let x=rand()*512,y=rand()*512;g.beginPath();g.moveTo(x,y);g.lineTo(x,y+rand()*65);g.stroke()}
 }else if(kind==='glass'){
  g.clearRect(0,0,512,512);
  for(let i=0;i<190;i++){let x=rand()*512,y=rand()*512,h=10+rand()*160;g.strokeStyle=`rgba(229,243,238,${.08+rand()*.25})`;g.lineWidth=.4+rand()*1.5;g.beginPath();g.moveTo(x,y);g.bezierCurveTo(x+3,y+h*.3,x-3,y+h*.7,x+rand()*3,y+h);g.stroke();if(rand()>.65){g.fillStyle='rgba(235,246,240,.35)';g.beginPath();g.arc(x,y,rand()*2+.5,0,7);g.fill()}}
 }
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;return t;
}
const concreteTex=texture('concrete'), woodTex=texture('wood'), metalTex=texture('metal'), rainTex=texture('glass');
const mat={concrete:new THREE.MeshStandardMaterial({map:concreteTex,color:0xc0c9c3,roughness:.88}),
 darkConcrete:new THREE.MeshStandardMaterial({map:concreteTex,color:0x788582,roughness:.92}),
 wood:new THREE.MeshStandardMaterial({map:woodTex,color:0xe4c8a5,roughness:.86}),
 steel:new THREE.MeshStandardMaterial({map:metalTex,color:0xa5b4ae,metalness:.68,roughness:.38}),
 dark:new THREE.MeshStandardMaterial({color:0x253b3d,metalness:.7,roughness:.48}),
 black:new THREE.MeshStandardMaterial({color:0x1c2b2d,metalness:.5,roughness:.45}),
 silver:new THREE.MeshStandardMaterial({color:0x9aa9a3,metalness:.8,roughness:.28}),
 cream:new THREE.MeshStandardMaterial({color:0xd2d4c5,roughness:.75}),
 red:new THREE.MeshStandardMaterial({color:0x9e513d,metalness:.5,roughness:.4}),
 yellow:new THREE.MeshStandardMaterial({color:0xd3a45e,roughness:.65}),
 glass:new THREE.MeshStandardMaterial({color:0xb0d4d1,metalness:.2,roughness:.2,transparent:true,opacity:.32,depthWrite:false,side:THREE.DoubleSide}),
 rain:new THREE.MeshBasicMaterial({map:rainTex,transparent:true,opacity:.65,depthWrite:false,side:THREE.DoubleSide}),
 light:new THREE.MeshBasicMaterial({color:0xffd994}),
 roof:new THREE.MeshStandardMaterial({color:0x3c4b48,metalness:.55,roughness:.63})};
function box(x,y,z,w,h,d,m, parent=scene){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);parent.add(o);return o}
function cyl(x,y,z,r1,r2,h,m,rx=0,rz=0,parent=scene,segments=16){const o=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,segments),m);o.position.set(x,y,z);o.rotation.set(rx,0,rz);parent.add(o);return o}
function beam(a,b,r,m,parent=scene){const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),d=new THREE.Vector3().subVectors(bv,av);const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d.length(),10),m);o.position.copy(av).add(bv).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());parent.add(o);return o}
function pane(x,y,z,w,h,axis='z'){
 const geo=new THREE.PlaneGeometry(w,h);const p=new THREE.Mesh(geo,mat.glass);p.position.set(x,y,z);if(axis==='x')p.rotation.y=Math.PI/2;scene.add(p);
 const streak=new THREE.Mesh(geo,mat.rain);streak.position.copy(p.position);if(axis==='x'){streak.rotation.y=Math.PI/2;streak.position.x+=.006}else streak.position.z+=.006;scene.add(streak);
}
function label(text, sub, w=512,h=160){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.fillStyle='#273e3e';g.fillRect(0,0,w,h);g.strokeStyle='#c4d2c5';g.lineWidth=3;g.strokeRect(6,6,w-12,h-12);g.fillStyle='#ecede0';g.font='bold 45px Arial';g.letterSpacing='4px';g.fillText(text,25,67);g.fillStyle='#d3ad77';g.font='20px Arial';g.fillText(sub,26,113);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide});}
function sign(x,y,z,w,h,text,sub,axis='z'){const p=new THREE.Mesh(new THREE.PlaneGeometry(w,h),label(text,sub));p.position.set(x,y,z);if(axis==='x')p.rotation.y=Math.PI/2;scene.add(p)}
function rail(x1,z1,x2,z2, opts={}) {const dx=x2-x1,dz=z2-z1,L=Math.hypot(dx,dz),n=Math.max(1,Math.round(L/1.15));for(let i=0;i<=n;i++){let t=i/n,x=x1+dx*t,z=z1+dz*t;beam([x,.08,z],[x,1.08,z],.034,mat.dark);cyl(x,.06,z,.09,.09,.05,mat.silver)}for(const y of [.2,.58,1.07])beam([x1,y,z1],[x2,y,z2],y===1.07?.045:.024,mat.dark)}

// Massing: a sheltered concrete terminal, then a slim loading platform.
box(0,-.2,4,10,.4,12,mat.concrete); box(0,-.2,-8.5,10,.4,13,mat.darkConcrete); box(0,-.2,-17.5,10,.4,5,mat.wood);
box(0,-.42,-5,10.4,.22,30,mat.dark); // structural foundation visible at the edge
for(let z=-14;z<=9;z+=2){box(0,.006,z,9.8,.012,.018,mat.darkConcrete)}
// scattered dark water patches: simple translucent surfaces avoid expensive reflections
const puddleMat=new THREE.MeshBasicMaterial({color:0x445d5d,transparent:true,opacity:.18,depthWrite:false});
for(let i=0;i<34;i++){const p=new THREE.Mesh(new THREE.CircleGeometry(.18+rand()*.55,20),puddleMat);p.rotation.x=-Math.PI/2;p.position.set(-4.4+rand()*8.8,.015,8-rand()*22);p.scale.set(1, .4+rand()*.5,1);scene.add(p)}
// side walls: concrete plinth, glazed bays and cladding above.
for(const x of [-4.95,4.95]){
 box(x,.65,4, .18,1.3,12,mat.concrete);box(x,5.45,4,.18,1.1,12,mat.wood);
 for(let z=-1;z<=9;z+=2){box(x,3.2,z,.2,4.0,.13,mat.dark);if(z<9){pane(x+(x<0?.02:-.02),3.25,z+1,1.86,3.5,'x');box(x,1.47,z+1,.21,.1,1.95,mat.dark);box(x,4.98,z+1,.21,.1,1.95,mat.dark)}}
}
// Entrance facade, broad glazed door opening.
for(const x of [-3.45,3.45]){box(x,.7,9.95,3.05,1.4,.2,mat.concrete);box(x,4.75,9.95,3.05,.4,.2,mat.wood);pane(x,3.05,9.95,2.6,3.1);for(const xx of [x-1.4,x+1.4])box(xx,3.1,9.95,.12,3.6,.25,mat.dark)}
box(0,5.45,9.95,10,1.1,.2,mat.wood);box(0,4.9,9.8,3.5,.16,.2,mat.dark);
for(const x of [-1.65,1.65])box(x,2.45,9.85,.14,4.9,.25,mat.dark);
sign(0,5.45,9.80,3.2,.6,'RAINLINE','MOUNTAIN STATION');
// Rear wall has an open working portal, with lintel and narrow side walls.
for(const x of [-4.65,4.65])box(x,2.8,-1.95,.7,5.6,.22,mat.concrete);
box(0,5.45,-1.95,10,1.1,.22,mat.wood);box(0,4.9,-1.84,9.5,.18,.2,mat.dark);
// high roof and heavy exposed rafters
box(0,6.15,4,10.5,.22,12.5,mat.roof);
for(let z=-1.7;z<10;z+=2.4){box(0,5.95,z,10,.22,.22,mat.wood);for(const x of [-4.65,4.65]){box(x,3.1,z,.2,5.9,.2,mat.wood);beam([x,5.65,z],[x+(x<0?1:-1),5.95,z],.065,mat.wood)}}
// platform canopy: exposed timber and repeated seams
box(0,5.65,-8.4,10.4,.20,13,mat.roof);
for(let x=-4.8;x<=4.8;x+=.8)box(x,5.77,-8.4,.035,.025,12.8,mat.silver);
for(let z=-3;z>=-14;z-=2.5){box(0,5.43,z,10,.2,.23,mat.wood);for(const x of [-4.7,4.7]){box(x,2.65,z,.2,5.3,.2,mat.wood);beam([x,4.8,z],[x+(x<0?.9:-.9),5.42,z],.065,mat.wood)}}
// warm fixtures: emissive lenses and low-cost point lights
for(const z of [7,2,-4,-10,-14]){box(2.6,5.7,z,1.0,.07,.25,mat.black);box(2.6,5.65,z,.8,.035,.15,mat.light);const l=new THREE.PointLight(0xffc77d,14,7,2);l.position.set(2.6,5.35,z);scene.add(l)}
// Drive machinery: a horizontal bullwheel, shaft, spokes and upper cable tracks.
const wx=-2.35,wz=-.15,wy=4.38,wr=1.62;
for(const y of [wy-.13,wy+.13]){const rim=new THREE.Mesh(new THREE.TorusGeometry(wr,.11,12,64),mat.dark);rim.rotation.x=Math.PI/2;rim.position.set(wx,y,wz);scene.add(rim)}
const groove=new THREE.Mesh(new THREE.TorusGeometry(wr,.055,8,64),mat.silver);groove.rotation.x=Math.PI/2;groove.position.set(wx,wy,wz);scene.add(groove);
cyl(wx,wy,wz,.43,.43,.5,mat.dark);cyl(wx,wy+.28,wz,.23,.23,.12,mat.silver);
for(let i=0;i<10;i++){const a=i*Math.PI*2/10;beam([wx+Math.cos(a)*.3,wy,wz+Math.sin(a)*.3],[wx+Math.cos(a)*1.53,wy,wz+Math.sin(a)*1.53],.065,mat.steel);cyl(wx+Math.cos(a)*1.3,wy+.16,wz+Math.sin(a)*1.3,.045,.045,.035,mat.silver)}
// Concrete foot, steel trestle and drive casing beneath the wheel.
box(wx,.28,wz,2.5,.55,2.2,mat.darkConcrete);box(wx,1.02,wz,2.05,1.1,1.65,mat.steel);box(wx,1.03,wz+.84,1.7,.7,.05,mat.dark);box(wx,1.03,wz+.88,1.45,.48,.04,mat.steel);
for(const x of [wx-.75,wx+.75]){for(const z of [wz-.65,wz+.65]){box(x,2.25,z,.18,2.25,.18,mat.dark);beam([x,1.15,z],[wx,3.85,wz],.07,mat.steel)}}
cyl(wx,3.12,wz,.18,.18,2.4,mat.silver);cyl(wx,3.92,wz,.35,.35,.25,mat.black);
for(let i=0;i<5;i++)box(wx-.5+i*.25,1.04,wz+.91,.08,.32,.035,mat.dark);
sign(wx,1.6,wz+.84,1.05,.31,'DRIVE 01','MAIN SHEAVE / 8.2 m');
// Cable runs leave the sheave at its tangent and pass through guide rollers.
for(const x of [wx-wr,wx+wr]){
 beam([x,wy,-.2],[x,wy,-20.8],.045,mat.black);beam([x,wy,.0],[x,wy,8.5],.038,mat.black);
 for(const z of [-3.0,-12.7]){cyl(x,wy-.12,z,.25,.25,.16,mat.dark,Math.PI/2);cyl(x,wy-.12,z,.11,.11,.18,mat.silver,Math.PI/2);box(x,wy-.45,z,.12,.5,.14,mat.steel)}
}
// Fence encloses drive, leaving the visitor path clear on its right.
rail(-.20,2.7,-.20,-1.3);rail(-4.55,2.7,-.20,2.7);
for(let i=0;i<8;i++){box(.05,.028,2.9-i*.31,.12,.025,.16,i%2?mat.dark:mat.yellow)}
// Auxiliary cabinet, conduit and wall details.
box(-4.45,1.4,6.25,.65,2.35,1.25,mat.steel);box(-4.105,1.55,6.25,.04,1.75,1.08,mat.dark);box(-4.08,1.9,6.25,.03,.55,.72,mat.steel);
for(let i=0;i<4;i++)cyl(-4.04,1.28+i*.13,6.48,.035,.035,.03,i===0?mat.red:mat.yellow,0,Math.PI/2);
beam([-4.46,2.6,6.25],[-4.46,5.5,6.25],.035,mat.black);beam([-4.46,5.5,6.25],[-3.8,5.5,6.25],.035,mat.black);
sign(4.82,2.5,5.9,1.5,.55,'PLATFORM','FOLLOW THE YELLOW LINE','x');
// Platform markings and fittings.
box(.27,.023,-8.3,.13,.025,12.1,mat.yellow);
for(let z=-3.0;z>-14.5;z-=.36)box(.46,.027,z,.09,.03,.18,mat.cream);
rail(4.67,-2.1,4.67,-14.95);rail(-4.67,-2.1,-4.67,-14.95);
for(const z of [-3.2,-11.7]){box(4.34,.45,z,.52,.9,.45,mat.dark);box(4.34,.94,z,.54,.08,.48,mat.yellow)}
// Stationary gondola; frame and glazing are separate from the shell so it reads at close range.
const cx=-2.35,cz=-8.25,cw=3.1,cd=3.5;
box(cx,.54,cz,cw,.32,cd,mat.dark);box(cx,.76,cz,cw+.08,.18,cd+.08,mat.red);
box(cx,3.52,cz,cw+.18,.24,cd+.18,mat.dark);box(cx,3.68,cz,cw-.15,.12,cd-.15,mat.silver);
// Opaque lower body, glazed upper body and vertical corner frames.
for(const x of [cx-cw/2,cx+cw/2]){box(x,1.13,cz,.12,.75,cd,mat.red);box(x,3.25,cz,.12,.35,cd,mat.red);for(const z of [cz-cd/2,cz,cz+cd/2])box(x,2.24,z,.12,2.9,.12,mat.dark)}
for(const z of [cz-cd/2,cz+cd/2]){box(cx,1.13,z,cw,.75,.12,mat.red);box(cx,3.25,z,cw,.35,.12,mat.red);for(const x of [cx-cw/2,cx,cx+cw/2])box(x,2.24,z,.12,2.9,.12,mat.dark);for(const x of [cx-.76,cx+.76])pane(x,2.18,z+(z>cz?.065:-.065),1.37,1.72)}
for(const x of [cx-cw/2,cx+cw/2])for(const z of [cz-.88,cz+.88])pane(x+(x>cx?.07:-.07),2.18,z,1.61,1.72,'x');
// Door on platform-facing side: paired frames, handles, threshold and rubber seals.
const doorx=cx+cw/2+.09;
for(const z of [cz-1.55,cz,cz+1.55])box(doorx,2.12,z,.07,2.65,.075,mat.silver);
box(doorx,2.96,cz,.07,.08,3.2,mat.silver);box(doorx,.86,cz,.07,.08,3.2,mat.silver);
for(const z of [cz-.18,cz+.18])box(doorx+.045,1.65,z,.06,.35,.045,mat.silver);
box(doorx+.08,.52,cz,.32,.06,3.2,mat.silver);
// Interior bench and hand rail are visible through the glazing.
box(cx-.72,1.05,cz,.45,.15,2.65,mat.wood);box(cx-.93,1.40,cz,.12,.8,2.65,mat.wood);
beam([cx-.95,2.95,cz-1.35],[cx-.95,2.95,cz+1.35],.035,mat.silver);
sign(cx,1.19,cz+cd/2+.08,1.6,.38,'RAINLINE','CABIN 01 / 8 PERSONS');
// Roof cradle and hanger reach the running cable.
for(const z of [cz-.85,cz+.85]){box(cx,3.81,z,2.25,.16,.14,mat.steel);beam([cx,3.84,z],[cx+.8,4.26,z],.08,mat.dark)}
box(cx+.82,4.16,cz,.15,.28,2.1,mat.steel);beam([cx+.82,4.28,cz],[wx+wr,4.38,cz],.10,mat.dark);cyl(wx+wr,4.38,cz,.17,.17,.5,mat.silver,Math.PI/2);
// End stop and small bollards make the static loading position legible.
for(const z of [-5.8,-10.7]){box(.8,.15,z,.15,.3,.15,mat.dark);box(.8,.32,z,.2,.05,.2,mat.yellow)}

// Covered lookout: timber ceiling and decking with a view beyond the guard rail.
box(0,4.4,-17.5,10.4,.22,5.3,mat.roof);
for(let z=-15;z>=-20;z-=1.25){box(0,4.23,z,10,.18,.2,mat.wood);for(const x of [-4.7,4.7]){box(x,2.1,z,.22,4.2,.22,mat.wood);beam([x,3.65,z],[x+(x<0?.7:-.7),4.2,z],.06,mat.wood)}}
for(let x=-4.5;x<=4.5;x+=.5)box(x,4.29,-17.5,.06,.06,5,mat.wood);
for(let x=-4.8;x<4.8;x+=.34)box(x,.018,-17.5,.018,.015,4.9,mat.dark);
rail(-4.67,-15,-4.67,-19.85);rail(4.67,-15,4.67,-19.85);rail(-4.67,-19.85,4.67,-19.85);
box(3.2,.46,-18.8,2.3,.15,.5,mat.wood);for(const x of [2.3,4.1])box(x,.25,-18.8,.12,.45,.35,mat.dark);
sign(-4.53,2.0,-17.7,1.5,.6,'THE RIDGELINE','LOOKOUT / 1,842 m','x');
box(0,4.12,-14.88,2.65,.42,.12,mat.dark);sign(0,4.12,-14.80,2.45,.35,'LOOKOUT','RIDGE VIEW  /  20 m');
// A series of low-poly ridges fading into mist, deliberately beyond the walkable space.
function ridge(z, points, color){const shape=new THREE.Shape();shape.moveTo(points[0][0],-14);for(const [x,y] of points)shape.lineTo(x,y);shape.lineTo(points[points.length-1][0],-14);shape.closePath();const mesh=new THREE.Mesh(new THREE.ShapeGeometry(shape),new THREE.MeshStandardMaterial({color,roughness:1,side:THREE.DoubleSide}));mesh.position.z=z;scene.add(mesh)}
ridge(-79,[[-100,3],[-78,13],[-63,8],[-48,23],[-35,11],[-18,27],[-4,11],[13,21],[30,8],[47,25],[65,10],[80,19],[100,4]],0x9aaeb0);
ridge(-59,[[-90,-1],[-73,9],[-61,3],[-46,17],[-34,5],[-22,20],[-8,3],[7,15],[18,5],[32,18],[48,4],[64,13],[90,0]],0x7e9697);
ridge(-42,[[-85,-3],[-70,5],[-59,1],[-48,11],[-39,3],[-28,13],[-18,2],[-5,9],[9,0],[22,12],[34,1],[50,8],[68,-1],[85,0]],0x668382);
ridge(-29,[[-70,-5],[-56,0],[-44,-2],[-34,4],[-24,-1],[-12,5],[0,-1],[14,5],[28,-2],[41,3],[56,-3],[70,-4]],0x506f6c);
// Broken snow gullies on the distant peaks.
function snowTri(points,z,color){let g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(points.flatMap(p=>[p[0],p[1],z]),3));g.computeVertexNormals();scene.add(new THREE.Mesh(g,new THREE.MeshBasicMaterial({color,side:THREE.DoubleSide})));}
snowTri([[-48,23],[-53,17],[-49,18],[-45,15],[-43,17]],-78.9,0xc0cccc);
snowTri([[-18,27],[-23,20],[-19,22],[-16,19],[-13,21]],-78.9,0xbecbcb);
snowTri([[47,25],[41,18],[46,20],[49,18],[52,20]],-78.9,0xc0cccc);
// A few firs below the lookout provide scale without creating an expensive forest.
function fir(x,z,s){cyl(x,-1.5,z,.10*s,.13*s,4*s,mat.wood);for(let k=0;k<3;k++){const m=new THREE.MeshStandardMaterial({color:[0x405e59,0x496963,0x526e68][k],roughness:1});cyl(x,(-.2+k*.83)*s,z,0,1.15*s-k*.17*s,2.3*s,m,0,0,scene,7)}}
for(let i=0;i<30;i++){let x=(rand()-.5)*50,z=-24-rand()*18;if(Math.abs(x)<5&&z>-27)continue;fir(x,z,.65+rand()*.95)}
// Hazy shoulders seen through the side glazing and across the open platform.
function sideRidge(x,color,points){const sh=new THREE.Shape();sh.moveTo(points[0][0],-14);for(const p of points)sh.lineTo(p[0],p[1]);sh.lineTo(points[points.length-1][0],-14);sh.closePath();const mesh=new THREE.Mesh(new THREE.ShapeGeometry(sh),new THREE.MeshStandardMaterial({color,roughness:1,side:THREE.DoubleSide}));mesh.rotation.y=Math.PI/2;mesh.position.x=x;scene.add(mesh)}
sideRidge(34,0x829b9b,[[-60,0],[-43,10],[-30,2],[-17,17],[-5,4],[8,13],[22,2],[38,12],[55,0]]);
sideRidge(22,0x678481,[[-60,-4],[-44,4],[-32,-1],[-18,9],[-5,0],[11,7],[26,-1],[40,5],[55,-4]]);
// Drain grates, worn caution labels, structural fasteners and utility details.
for(const z of [7.4,3.0,-5,-12]){box(4.0,.02,z,.45,.025,1.0,mat.black);for(let i=0;i<8;i++)box(4,.04,z-.42+i*.12,.38,.02,.035,mat.silver)}
for(const z of [-3,-5.5,-8,-10.5,-13])for(const x of [-4.7,4.7])for(const y of [.3,4.9])cyl(x+(x<0?.12:-.12),y,z,.04,.04,.025,mat.silver,0,Math.PI/2);
// Small instrument box on the near side of the machine fence.
box(.12,1.12,2.3,.30,.32,.42,mat.steel);box(.29,1.14,2.3,.04,.22,.28,mat.dark);cyl(.32,1.17,2.3,.065,.065,.04,mat.red,0,Math.PI/2);

const state={x:1.55,z:8.2,yaw:0,pitch:0};const keys=new Set();let locked=false;
function reset(){state.x=1.55;state.z=8.2;state.yaw=0;state.pitch=0;camera.position.set(state.x,1.68,state.z);camera.rotation.set(0,0,0)}reset();
const intro=document.querySelector('#intro');
document.querySelector('#start').addEventListener('click',()=>{intro.style.display='none';renderer.domElement.requestPointerLock()});
renderer.domElement.addEventListener('click',()=>{if(!locked)renderer.domElement.requestPointerLock()});
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===renderer.domElement;document.querySelector('#hint').style.opacity=locked?'.65':'1'});
document.addEventListener('mousemove',e=>{if(!locked)return;state.yaw-=e.movementX*.0022;state.pitch=Math.max(-1.3,Math.min(1.3,state.pitch-e.movementY*.0022))});
document.addEventListener('keydown',e=>{keys.add(e.code);if(e.code==='KeyR')reset();if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault()});
document.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>keys.clear());
// Capsule-like circle against axis-aligned equipment and cabin footprints.
const blocks=[[-4.58,-.15,-1.55,2.78],[-3.98,-.64,-10.08,-6.42],[-4.9,-4.0,5.55,7.0],[1.9,4.45,-19.25,-18.35]];
const radius=.23;
function clear(x,z){if(x < -4.4 || x>4.4 || z < -19.52 || z>9.45)return false;for(const [x1,x2,z1,z2] of blocks){let nx=Math.max(x1,Math.min(x,x2)),nz=Math.max(z1,Math.min(z,z2));if((x-nx)**2+(z-nz)**2<radius**2)return false}return true}
let last=performance.now();function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-last)/1000,.05);last=now;let f=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0);let s=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);const norm=Math.hypot(f,s)||1;f/=norm;s/=norm;const speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?4.8:2.75)*dt;const dx=(-Math.sin(state.yaw)*f+Math.cos(state.yaw)*s)*speed,dz=(-Math.cos(state.yaw)*f-Math.sin(state.yaw)*s)*speed;if(clear(state.x+dx,state.z))state.x+=dx;if(clear(state.x,state.z+dz))state.z+=dz;camera.position.set(state.x,1.68,state.z);camera.rotation.order='YXZ';camera.rotation.y=state.yaw;camera.rotation.x=state.pitch;renderer.render(scene,camera)}requestAnimationFrame(animate);
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight)});
