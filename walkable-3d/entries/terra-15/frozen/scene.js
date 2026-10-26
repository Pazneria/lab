import * as THREE from 'three';

// Mera's rooms: a small, self-contained study in the life of a coastal route-maker.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9bafa7);
const camera = new THREE.PerspectiveCamera(65, innerWidth/innerHeight, .06, 65);
const renderer = new THREE.WebGLRenderer({antialias:true, powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.18;
document.querySelector('#view').appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xc9d9d0,0x65513a,2.0));
const sun = new THREE.DirectionalLight(0xffdb9d,2.5);
sun.position.set(-6,9,-5); sun.target.position.set(1,0,4); scene.add(sun, sun.target);
sun.castShadow = true; Object.assign(sun.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:.5,far:30});
sun.shadow.mapSize.set(1024,1024); sun.shadow.bias = -.00035; sun.shadow.normalBias=.02;
const warm = (x,y,z,p=16) => {const l=new THREE.PointLight(0xffbd6d,p,7,2);l.position.set(x,y,z);scene.add(l)};
warm(-3.7,1.3,4.9,12); warm(7.2,2.6,-2.7,14); warm(8.5,2.7,3.1,8);
const rand = (()=>{let s=738291;return ()=>((s=(s*1664525+1013904223)>>>0)/4294967296)})();
function texture(kind){
 const c=document.createElement('canvas');c.width=c.height=512;const g=c.getContext('2d');
 if(kind==='wood') {g.fillStyle='#8a633e';g.fillRect(0,0,512,512);for(let y=0;y<512;y+=64){g.fillStyle=y%128?'#805936':'#99704a';g.fillRect(0,y,512,63);g.fillStyle='#4e3625';g.fillRect(0,y,512,2);for(let i=0;i<35;i++){g.strokeStyle=`rgba(52,31,17,${.04+rand()*.14})`;g.lineWidth=rand()*2+0.4;let yy=y+rand()*63;g.beginPath();g.moveTo(0,yy);g.bezierCurveTo(120,yy+rand()*7,340,yy-rand()*7,512,yy+rand()*3);g.stroke()}}}
 if(kind==='plaster'){g.fillStyle='#c3b59a';g.fillRect(0,0,512,512);for(let i=0;i<5000;i++){let v=rand()>.5?255:50;g.fillStyle=`rgba(${v},${v},${v},${rand()*.035})`;g.fillRect(rand()*512,rand()*512,2+rand()*6,2+rand()*6)}}
 if(kind==='cloth'){g.fillStyle='#d3c5aa';g.fillRect(0,0,512,512);for(let i=0;i<512;i+=3){g.strokeStyle='rgba(65,54,39,.09)';g.beginPath();g.moveTo(i,0);g.lineTo(i,512);g.stroke();g.strokeStyle='rgba(255,255,255,.09)';g.beginPath();g.moveTo(0,i);g.lineTo(512,i);g.stroke()}}
 if(kind==='rug'){g.fillStyle='#526d69';g.fillRect(0,0,512,512);g.strokeStyle='#c7ad7b';g.lineWidth=9;g.strokeRect(20,20,472,472);g.lineWidth=3;g.strokeRect(37,37,438,438);g.strokeStyle='#a5b4a0';for(let x=50;x<470;x+=42){g.beginPath();g.moveTo(x,50);g.lineTo(x+20,70);g.lineTo(x,90);g.lineTo(x-20,70);g.closePath();g.stroke();g.beginPath();g.moveTo(x,422);g.lineTo(x+20,442);g.lineTo(x,462);g.lineTo(x-20,442);g.closePath();g.stroke()}g.strokeStyle='rgba(234,218,180,.15)';for(let i=0;i<512;i+=4){g.beginPath();g.moveTo(i,0);g.lineTo(i,512);g.stroke()}}
 if(kind==='map'){g.fillStyle='#e3d0a4';g.fillRect(0,0,512,512);for(let i=0;i<1800;i++){g.fillStyle=`rgba(94,69,42,${rand()*.08})`;g.fillRect(rand()*512,rand()*512,rand()*4+1,rand()*4+1)}g.strokeStyle='#71918b';g.lineWidth=3;for(let j=0;j<5;j++){g.beginPath();for(let x=0;x<=512;x+=8){let y=105+j*75+20*Math.sin(x*.012+j)+15*Math.sin(x*.034+j);if(x===0)g.moveTo(x,y);else g.lineTo(x,y)}g.stroke()}g.strokeStyle='#856d4e';g.lineWidth=2;for(let j=0;j<5;j++){let x=75+j*85,y=80+rand()*310;g.beginPath();g.moveTo(x,y);g.bezierCurveTo(x-48,y+35,x+48,y+72,x+10,y+95);g.stroke()}g.strokeStyle='#ae6652';g.setLineDash([8,8]);g.lineWidth=3;g.beginPath();g.moveTo(45,404);g.bezierCurveTo(140,330,170,365,250,240);g.bezierCurveTo(320,170,390,220,457,80);g.stroke();g.setLineDash([]);for(let i=0;i<9;i++){let x=40+rand()*430,y=50+rand()*410;g.fillStyle='#7c6044';g.beginPath();g.arc(x,y,3,0,7);g.fill()}g.strokeStyle='#695842';g.lineWidth=2;g.beginPath();g.arc(410,405,28,0,7);g.moveTo(410,365);g.lineTo(410,445);g.moveTo(370,405);g.lineTo(450,405);g.stroke()}
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;
}
const tex={wood:texture('wood'),wall:texture('plaster'),cloth:texture('cloth'),rug:texture('rug'),map:texture('map')};
const mat=(color, extra={})=>new THREE.MeshStandardMaterial({color,roughness:.88,...extra});
const M={wall:mat(0xffffff,{map:tex.wall}),wood:mat(0xffffff,{map:tex.wood}),dark:mat(0x523724),edge:mat(0x6c4a30), pale:mat(0xc5a679), cream:mat(0xffffff,{map:tex.cloth}),sheet:mat(0xe9e0cb,{map:tex.cloth}),blue:mat(0x4f7370,{map:tex.cloth}),blueDark:mat(0x344e50,{map:tex.cloth}),rust:mat(0x9b654f,{map:tex.cloth}),gold:mat(0xc49654,{metalness:.65,roughness:.34}),iron:mat(0x454b48,{metalness:.65,roughness:.45}),paper:mat(0xe3d2ad),map:mat(0xffffff,{map:tex.map}),rug:mat(0xffffff,{map:tex.rug}),glass:mat(0xa6c4bc,{transparent:true,opacity:.58,roughness:.2}),leaf:mat(0x6f8161),black:mat(0x302e29),white:mat(0xf4e3c2)};
const boxGeo=new THREE.BoxGeometry(1,1,1), sphereGeo=new THREE.SphereGeometry(1,16,10), cylGeo=new THREE.CylinderGeometry(1,1,1,12);
function add(mesh,shadow=false){mesh.castShadow=shadow;mesh.receiveShadow=true;scene.add(mesh);return mesh}
function box(x,y,z,w,h,d,m,shadow=false){const o=new THREE.Mesh(boxGeo,m);o.position.set(x,y,z);o.scale.set(w,h,d);return add(o,shadow)}
function ball(x,y,z,w,h,d,m,shadow=false){const o=new THREE.Mesh(sphereGeo,m);o.position.set(x,y,z);o.scale.set(w,h,d);return add(o,shadow)}
function cyl(x,y,z,r,h,m,shadow=false){const o=new THREE.Mesh(cylGeo,m);o.position.set(x,y,z);o.scale.set(r,h,r);return add(o,shadow)}
function rod(a,b,r,m){const v=new THREE.Vector3(...a),q=new THREE.Vector3(...b);const d=q.clone().sub(v),o=new THREE.Mesh(cylGeo,m);o.position.copy(v.add(q).multiplyScalar(.5));o.scale.set(r,d.length(),r);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return add(o)}
function plane(x,y,z,w,h,m,rx=0,ry=0){let o=new THREE.Mesh(new THREE.PlaneGeometry(w,h),m);o.position.set(x,y,z);o.rotation.set(rx,ry,0);return add(o)}
const solids=[];function solid(x,z,w,d){solids.push({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2})}
function wall(x,z,w,d,h=3.3){box(x,h/2,z,w,h,d,M.wall,true);solid(x,z,w,d)}
function trim(x,y,z,w,h,d,m=M.edge){return box(x,y,z,w,h,d,m)}
function framed(x,y,z,w,h,front='z',content=M.map){ // framed picture on a wall
 const depth=.07;if(front==='z'){box(x,y,z,w,h,depth,M.dark);box(x,y,z+.042,w-.13,h-.13,.02,content);for(let xx of [-1,1])box(x+xx*(w/2-.04),y,z+.06,.07,h,.05,M.pale);for(let yy of [-1,1])box(x,y+yy*(h/2-.04),z+.06,w,.07,.05,M.pale)}
}
// Floors: individually bordered rooms, with long planks and small joints.
function floor(cx,cz,w,d){box(cx,-.1,cz,w,.2,d,M.wood);const count=Math.ceil(d/.48);for(let i=0;i<=count;i++){let z=cz-d/2+i*d/count;box(cx,.006,z,w,.008,.012,M.dark)}for(let i=0;i<count;i++){let z=cz-d/2+(i+.5)*d/count;for(let x=cx-w/2+1.4+(i%2)*1.8;x<cx+w/2;x+=3.3)box(x,.008,z,.012,.009,d/count-.02,M.dark)}}
floor(0,4,10,8);floor(7.5,2.5,5,5);floor(7.5,-2.5,5,5);
// Boundary walls and generously sized connecting openings.
wall(-5,4,.18,8);wall(0,8,10,.18);wall(5,6.55,.18,2.9);wall(5,.55,.18,1.1); // wardrobe door at x=5, z=1.1..5.1
wall(10,2.5,.18,5);wall(7.5,5,5,.18);wall(10,-2.5,.18,5);wall(5,-2.5,.18,5);wall(7.5,-5,5,.18);
wall(5.62,0,1.24,.18);wall(9.4,0,1.2,.18); // study door x 6.24..8.8
// bedroom north wall with window opening
wall(-4.12,0,1.76,.18);wall(1.4,0,7.2,.18);box(-2.75,.43,0,1.0,.86,.18,M.wall);box(-2.75,2.98,0,1, .64,.18,M.wall);
// ceiling is high enough to keep the rooms intimate
box(0,3.36,4,10,.12,8,M.wall);box(7.5,3.36,2.5,5,.12,5,M.wall);box(7.5,3.36,-2.5,5,.12,5,M.wall);
// Baseboards and ceiling beams, door surrounds
for(const [x,z,w,d] of [[-4.88,4,.08,8],[0,7.88,10,.08],[4.88,6.55,.08,2.8],[9.88,2.5,.08,5],[7.5,4.88,5,.08],[9.88,-2.5,.08,5],[5.12,-2.5,.08,5],[7.5,-4.88,5,.08]]){box(x,.12,z,w,.24,d,M.edge);box(x,3.18,z,w,.12,d,M.edge)}
for(const z of [1.12,5.0])box(4.92,1.58,z,.16,3.05,.15,M.dark);box(4.92,3.08,3.06,.16,.16,4.05,M.dark);
for(const x of [6.25,8.78])box(x,1.58,-.03,.16,3.05,.16,M.dark);box(7.515,3.08,-.03,2.68,.16,.16,M.dark);
// morning window; sky beyond, simple muntins and curtain folds
box(-2.75,1.85,-.1,1,2.0,.07,mat(0xa8c9c4,{emissive:0x5b8381,emissiveIntensity:.3}));
for(const x of [-3.3,-2.75,-2.2])box(x,1.85,.04,.065,2.12,.09,M.cream);for(const y of [.8,1.85,2.9])box(-2.75,y,.04,1.16,.065,.09,M.cream);
box(-2.75,.77,.12,1.32,.09,.27,M.pale);rod([-3.55,3.02,.16],[-1.95,3.02,.16],.025,M.gold);
for(let i=0;i<6;i++){let x=-3.5+i*.09;box(x,2.35,.16,.1,1.2,.08,M.cream);x=-2.0-i*.09;box(x,2.35,.16,.1,1.2,.08,M.cream)}
// rugs
box(-1.5,.025,4.3,4.4,.035,3.7,M.rug);box(7.15,.026,2.8,2.9,.035,3.3,M.rug);box(7.35,.026,-2.0,2.8,.035,2.1,M.rug);
// Bed: joinery, mattress, rumpled cover, and a mended patch.
const bx=-2.05,bz=3.55;
box(bx,.35,bz,2.35,.22,3.45,M.dark,true);box(bx,.54,bz,2.18,.3,3.22,M.cream,true);
for(let x of [bx-1.12,bx+1.12])for(let z of [bz-1.62,bz+1.62]){box(x,.40,z,.16,.8,.16,M.edge,true);ball(x,.83,z,.095,.095,.095,M.pale)}
box(bx,1.00,bz-1.69,2.38,1.25,.15,M.edge,true);for(let x of [bx-.85,bx-.43,bx,bx+.43,bx+.85])box(x,1.02,bz-1.59,.25,.82,.06,M.wood);
box(bx,.68,bz+1.67,2.38,.46,.14,M.edge,true);
for(let x of [bx-.49,bx+.49]){let p=ball(x,.77,bz-1.12,.48,.16,.35,M.sheet,true);p.rotation.y=(x<bx?-.08:.08)}
// A subdivided, gently displaced cloth surface catches light differently from wood.
function blanket(x,z,w,d,y){const nx=30,nz=35,vertices=[],indices=[];for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){const u=i/nx,v=j/nz;let xx=x+(u-.5)*w,zz=z+(v-.5)*d;let edge=Math.max(0,(Math.abs(u-.5)-.43)/.07);let yy=y+.035*Math.sin(v*22+u*4)+.018*Math.sin(u*30+v*11)-edge*.15;vertices.push(xx,yy,zz)}for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){let k=j*(nx+1)+i;indices.push(k,k+nx+1,k+1,k+1,k+nx+1,k+nx+2)}let g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.setIndex(indices);g.computeVertexNormals();let o=new THREE.Mesh(g,M.blue);o.material.side=THREE.DoubleSide;add(o,true)}
blanket(bx,bz+.48,2.27,2.3,.79);box(bx,.81,bz-.62,2.22,.04,.25,M.sheet);box(bx+.63,.83,bz+.9,.23,.018,.22,M.rust);for(let i=0;i<5;i++)box(bx+.63,.845,bz+.82+i*.04,.22,.008,.008,M.cream);
solid(bx,bz,2.35,3.45);
// Bedside table with open shelf, drawer, turned legs and lantern.
function table(x,z,w,d,h){box(x,h,z,w,.11,d,M.wood,true);for(let xx of [-1,1])for(let zz of [-1,1])box(x+xx*(w/2-.08),h/2,z+zz*(d/2-.08),.1,h,.1,M.edge,true)}
table(-4.02,4.43,.95,.8,.72);box(-4.02,.54,4.43,.84,.25,.68,M.edge);box(-4.02,.55,4.84,.72,.18,.04,M.wood);ball(-4.02,.55,4.88,.035,.035,.035,M.gold);box(-4.02,.19,4.43,.78,.05,.66,M.wood);solid(-4.02,4.43,.95,.8);
// Lantern: warm glowing glass, metal corners and loop.
cyl(-4.10,.79,4.43,.16,.05,M.iron);cyl(-4.10,1.03,4.43,.125,.43,mat(0xf8d18a,{emissive:0xffa734,emissiveIntensity:.9,transparent:true,opacity:.82}));cyl(-4.10,1.26,4.43,.16,.06,M.iron);for(let x of [-.10,.10])for(let z of [-.10,.10])rod([-4.1+x,.81,4.43+z],[-4.1+x,1.24,4.43+z],.012,M.iron);rod([-4.19,1.29,4.43],[-4.10,1.39,4.43],.013,M.iron);rod([-4.10,1.39,4.43],[-4.01,1.29,4.43],.013,M.iron);
box(-3.78,.79,4.46,.24,.08,.31,M.rust);box(-3.78,.84,4.46,.22,.02,.29,M.paper);ball(-3.76,.86,4.43,.06,.025,.04,M.pale);
// Wall gallery: a route, a small portrait token, and an old pennant.
framed(-.65,2.0,.14,1.1,.76,'z',M.map);framed(-4.05,1.82,.14,.63,.68,'z',M.rust);
box(-.9,2.85,.17,1.25,.08,.08,M.dark);for(let i=0;i<6;i++){let x=-1.4+i*.2;box(x,2.62,.15,.16,.37,.035,i%2?M.blue:M.rust)}
// A small chest at the bed foot, with iron bands and a folded shawl.
box(-3.8,.34,6.0,1.38,.62,.72,M.edge,true);box(-3.8,.67,6.0,1.42,.08,.76,M.wood,true);for(let x of [-4.29,-3.31])box(x,.36,6.38,.065,.56,.025,M.iron);box(-3.8,.48,6.39,.12,.13,.035,M.gold);box(-3.8,.73,6.0,1.0,.10,.48,M.rust);box(-3.85,.79,6.0,.8,.045,.4,M.cream);solid(-3.8,6,1.38,.72);
// Worn slippers and a basket with a half-mended scarf.
for(let x of [-.72,-.40]){let s=ball(x,.095,5.6,.13,.09,.25,M.dark);s.rotation.y=-.18;box(x,.15,5.53,.16,.07,.13,M.rust)}
cyl(-4.22,.3,2.45,.31,.55,M.pale,true);cyl(-4.22,.59,2.45,.32,.04,M.dark);for(let i=0;i<12;i++){let a=i*Math.PI/6;rod([-4.22+Math.cos(a)*.30,.08,2.45+Math.sin(a)*.30],[-4.22+Math.cos(a)*.30,.58,2.45+Math.sin(a)*.30],.012,M.dark)}box(-4.22,.61,2.45,.44,.12,.35,M.blue);box(-4.02,.52,2.45,.18,.37,.15,M.blue);solid(-4.22,2.45,.58,.58);
// A low dressing bench makes the wardrobe a room to use, not a closet facade.
table(6.12,3.65,1.05,.58,.47);box(6.12,.51,3.65,1.0,.12,.56,M.rust);solid(6.12,3.65,1.05,.58);
// Wardrobe structure, along the east wall: shelves, rail, garments, hat boxes.
for(let z of [.45,4.5])box(9.35,1.55,z,1.12,3.0,.09,M.edge,true);
box(9.35,2.73,2.48,1.1,.1,4.12,M.wood,true);box(9.35,.24,2.48,1.1,.1,4.12,M.wood,true);
rod([9.25,2.3,.56],[9.25,2.3,4.40],.035,M.gold);
// Jacket-shaped hanging garments are extruded, with seams and contrasting hems.
function coat(z,color,length,variant){
 const shape=new THREE.Shape();shape.moveTo(-.28,0);shape.lineTo(-.46,-.23);shape.lineTo(-.39,-.53);shape.lineTo(-.27,-.46);shape.lineTo(-.30,-length);shape.lineTo(.30,-length);shape.lineTo(.27,-.46);shape.lineTo(.39,-.53);shape.lineTo(.46,-.23);shape.lineTo(.28,0);shape.lineTo(.15,.04);shape.lineTo(-.15,.04);shape.closePath();
 const g=new THREE.ExtrudeGeometry(shape,{depth:.07,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:1,curveSegments:2});const o=new THREE.Mesh(g,color);o.position.set(9.14,2.05,z);o.rotation.y=-Math.PI/2;add(o,true);
 // hanger and a vertical seam visible from the aisle
 rod([9.25,2.28,z],[9.25,2.14,z],.012,M.gold);rod([9.25,2.14,z],[9.25,2.06,z-.25],.012,M.edge);rod([9.25,2.14,z],[9.25,2.06,z+.25],.012,M.edge);
 box(9.045,2.05-length*.52,z,.018,length*.78,.016,variant?M.pale:M.blueDark);
 for(let i=0;i<3;i++)ball(9.03,1.87-i*.16,z,.022,.022,.022,M.gold);
}
const colors=[M.blueDark,M.rust,M.cream,M.blue,M.pale,M.rust,M.blueDark];for(let i=0;i<7;i++)coat(.82+i*.5,colors[i],.95+(i%3)*.13,i%2);
// Folded linens on top and bottom shelving, boxes and shoes.
for(let i=0;i<4;i++){box(9.3,2.82+i*.10,1.15,.68,.09,.52,[M.blue,M.cream,M.rust,M.sheet][i]);box(9.3,2.82+i*.1,1.44,.68,.012,.015,M.pale)}
for(let z of [2.35,3.25,4.05]){box(9.35,2.98,z,.65,.46,.64,M.pale,true);box(9.35,3.23,z,.70,.06,.68,M.edge);box(8.99,3.0,z,.02,.09,.18,M.paper)}
for(let z of [.92,1.45,2.0,2.6,3.2,3.8]){let boot=ball(9.25,.38,z,.27,.13,.13,M.dark);boot.rotation.y=.18;box(9.42,.47,z,.18,.24,.19,M.edge)}
// A narrow wall mirror and hooks with a satchel and scarf.
box(7.25,1.85,4.88,1.0,1.45,.09,M.dark);box(7.25,1.85,4.82,.88,1.31,.025,mat(0x819d9a,{metalness:.45,roughness:.25}));
for(let x of [6.0,6.35,6.7]){ball(x,2.1,4.82,.06,.06,.06,M.gold);rod([x,2.1,4.82],[x,1.98,4.71],.025,M.gold)}
box(6.35,1.6,4.7,.42,.48,.14,M.rust);rod([6.16,1.83,4.68],[6.35,2.06,4.7],.025,M.dark);rod([6.35,2.06,4.7],[6.54,1.83,4.68],.025,M.dark);box(6.35,1.59,4.61,.12,.1,.04,M.gold);
box(6.72,1.73,4.70,.18,.57,.08,M.blue);box(6.82,1.52,4.68,.13,.35,.08,M.blue);
solid(9.35,2.48,1.2,4.12);
// Study desk: mortised legs, drawers, working chart and tools.
table(7.65,-4.18,3.3,1.18,.80);box(7.65,.65,-3.57,3.1,.25,.10,M.edge);for(let x of [6.65,7.65,8.65]){box(x,.66,-3.50,.85,.18,.04,M.wood);ball(x,.66,-3.46,.035,.035,.035,M.gold)}solid(7.65,-4.18,3.3,1.18);
// Map oriented on the tabletop; a second folded chart and weighted corners.
plane(7.35,.866,-4.12,1.42,.84,M.map,-Math.PI/2);for(let x of [6.7,8.0])for(let z of [-4.5,-3.75])ball(x,.88,z,.035,.035,.035,M.gold);
box(8.45,.87,-4.12,.48,.025,.63,M.paper);box(8.45,.886,-4.12,.015,.006,.60,M.edge);box(8.45,.892,-4.12,.45,.006,.012,M.edge);
// Compass, ruler, pencil and spools, all posed as if the day's work has paused.
cyl(6.47,.89,-3.87,.12,.035,M.gold);cyl(6.47,.914,-3.87,.095,.014,M.paper);rod([6.41,.925,-3.92],[6.54,.925,-3.82],.009,M.rust);
let ruler=box(7.65,.895,-3.72,.75,.025,.045,M.pale);ruler.rotation.y=.12;for(let i=0;i<8;i++)box(7.35+i*.08,.91,-3.72,.008,.005,.03,M.dark);
rod([8.12,.89,-3.83],[8.54,.89,-3.67],.013,M.dark);cyl(8.73,.93,-4.48,.075,.14,M.blueDark);for(let i=0;i<3;i++)rod([8.73,.98,-4.48],[8.67+i*.06,1.19,-4.49],.012,M.pale);
// rolled chart and a low stack of well-used notebooks
cyl(6.48,.91,-4.56,.09,.65,M.paper).rotation.z=Math.PI/2;for(let i=0;i<3;i++){let b=box(8.7,.87+i*.07,-3.79,.5,.065,.34,[M.blueDark,M.rust,M.edge][i]);b.rotation.y=(i-1)*.06;box(8.7,.9+i*.07,-3.78,.47,.02,.31,M.paper)}
// Stool tucked to one side of the desk.
cyl(6.05,.48,-2.9,.34,.11,M.wood,true);for(let a=0;a<4;a++){let x=6.05+Math.cos(a*Math.PI/2)*.21,z=-2.9+Math.sin(a*Math.PI/2)*.21;rod([x,.05,z],[x,.44,z],.04,M.edge)}solid(6.05,-2.9,.65,.65);
// Shelf, books, containers and pin board behind the desk.
box(7.6,2.42,-4.84,3.45,.1,.34,M.edge,true);for(let x of [6.2,8.9])box(x,2.28,-4.87,.10,.3,.26,M.dark);
for(let i=0;i<9;i++){let x=6.27+i*.14;box(x,2.68,-4.82,.12,.42+rand()*.15,.22,[M.blueDark,M.rust,M.pale,M.edge][i%4]);box(x,2.7,-4.69,.075,.015,.01,M.gold)}
for(let i=0;i<3;i++){cyl(8.12+i*.28,2.58,-4.78,.105,.25,M.pale);cyl(8.12+i*.28,2.72,-4.78,.11,.025,M.dark)}
framed(7.4,1.77,-4.88,2.12,.99,'z',M.map);box(7.15,1.93,-4.81,.31,.22,.02,M.paper);box(7.98,1.63,-4.81,.24,.27,.02,M.paper);for(let x of [7.15,7.98])ball(x,2.04-(x>7.5?.28:0),-4.78,.025,.025,.025,M.rust);
// Wall lamp with shade and bright core.
rod([9.3,2.2,-4.82],[9.3,2.2,-4.56],.025,M.iron);cyl(9.3,2.11,-4.52,.19,.25,M.gold);ball(9.3,2.02,-4.52,.10,.09,.10,mat(0xffd493,{emissive:0xffa849,emissiveIntensity:1.1}));
// Study side bookcase: open front faces the desk aisle.
box(9.65,1.25,-2.2,.55,2.45,2.25,M.edge,true);for(let y of [.35,.95,1.55,2.15])box(9.33,y,-2.2,.62,.08,2.15,M.wood);for(let y of [.43,1.03,1.63])for(let i=0;i<9;i++){let z=-3.13+i*.22;box(9.18,y+.22,z,.27,.4+rand()*.08,.17,[M.blueDark,M.rust,M.pale,M.edge][i%4]);box(9.025,y+.22,z,.012,.25,.09,M.paper)}solid(9.55,-2.2,.75,2.25);
// Plants, keepsakes, and a tiny model boat: the same shore is present in each room.
function potPlant(x,z,scale=1){cyl(x,.25*scale,z,.20*scale,.45*scale,M.rust,true);cyl(x,.48*scale,z,.22*scale,.04*scale,M.pale);for(let i=0;i<7;i++){let a=i*2.4;let h=.5+rand()*.35;rod([x,.45*scale,z],[x+Math.cos(a)*.18*scale,(.5+h)*scale,z+Math.sin(a)*.18*scale],.012*scale,M.edge);let leaf=ball(x+Math.cos(a)*.18*scale,(.5+h)*scale,z+Math.sin(a)*.18*scale,.09*scale,.22*scale,.04*scale,M.leaf);leaf.rotation.z=Math.cos(a)*.55;leaf.rotation.x=Math.sin(a)*.55}}
potPlant(4.25,.65,1);potPlant(5.55,-4.43,.72);
// Shell bowl and pebble collection beside the bed.
cyl(-3.95,.24,4.45,.21,.06,M.pale);for(let i=0;i<5;i++){let a=i*1.7;ball(-3.95+Math.cos(a)*.1,.29,4.45+Math.sin(a)*.1,.06,.035,.045,i%2?M.cream:M.rust)}
// A little boat on wardrobe top, made from timber and cloth.
box(8.1,2.83,4.62,.72,.12,.20,M.dark);rod([8.1,2.85,4.62],[8.1,3.17,4.62],.018,M.edge);const sail=new THREE.Shape();sail.moveTo(0,0);sail.lineTo(.27,0);sail.lineTo(0,.3);sail.closePath();let sm=new THREE.Mesh(new THREE.ShapeGeometry(sail),M.cream);sm.position.set(8.11,2.88,4.64);add(sm);
// A few joists and pegs give the rooms a hand-built construction.
for(let z of [1.0,3.5,6.0])box(0,3.23,z,9.9,.15,.16,M.edge);for(let z of [1.1,3.4])box(7.5,3.23,z,4.9,.15,.16,M.edge);for(let z of [-1.2,-3.7])box(7.5,3.23,z,4.9,.15,.16,M.edge);
// Hand-stitched quilt lines follow the surface's gentle ripples; the off-color
// patch was repaired with contrasting thread.
for(let row=0;row<4;row++)for(let i=0;i<20;i++){
  let x=bx-.95+i*.1,z=bz-.22+row*.52;
  let u=(x-bx)/2.27+.5,v=(z-(bz+.48))/2.3+.5;
  let y=.81+.035*Math.sin(v*22+u*4)+.018*Math.sin(u*30+v*11);
  box(x,y,z,.048,.008,.009,M.pale);
}
// A small brass compass rose in the headboard is echoed by the desk compass.
cyl(bx,1.15,bz-1.49,.13,.022,M.gold).rotation.x=Math.PI/2;
for(let i=0;i<4;i++){let a=i*Math.PI/2;rod([bx+Math.cos(a)*.05,1.15+Math.sin(a)*.05,bz-1.46],[bx+Math.cos(a)*.21,1.15+Math.sin(a)*.21,bz-1.46],.012,M.gold)}
// The closed entrance is the place Mera comes home to. Its inset panels,
// latch, and worn threshold also make the return view distinct.
box(.25,1.25,7.87,1.55,2.5,.10,M.edge,true);
for(let x of [-.55,1.05])box(x,1.32,7.79,.12,2.65,.16,M.dark);
box(.25,2.61,7.79,1.72,.14,.16,M.dark);
for(let y of [.68,1.74]){box(.25,y,7.78,1.26,.82,.06,M.wood);box(.25,y,7.74,1.05,.61,.025,M.edge)}
ball(.77,1.19,7.68,.055,.055,.055,M.gold);box(.25,.035,7.66,1.65,.06,.38,M.pale);
// Right-hand chest of drawers, with a water jug and field notes set down on arrival.
box(4.43,.61,6.4,.85,1.15,1.65,M.edge,true);box(4.43,1.21,6.4,.92,.10,1.72,M.wood,true);
for(let y of [.35,.68,1.0]){box(3.99,y,6.4,.04,.25,1.47,M.wood);for(let z of [6.02,6.78])ball(3.95,y,z,.035,.035,.035,M.gold)}
solid(4.43,6.4,.85,1.65);
cyl(4.4,1.35,5.95,.13,.24,M.blueDark);cyl(4.4,1.49,5.95,.10,.04,M.pale);
for(let i=0;i<3;i++)box(4.43,1.29+i*.06,6.65,.54,.055,.38,[M.rust,M.blueDark,M.pale][i]);
// A notice ribbon over the dresser carries paper scraps and specimens.
rod([4.88,2.35,5.55],[4.88,2.35,7.25],.018,M.gold);
for(let i=0;i<5;i++){let z=5.75+i*.31;box(4.83,2.19,z,.025,.30,.23,i%2?M.paper:M.cream);ball(4.8,2.32,z,.025,.025,.025,M.rust)}
// Personal objects: a pressed sprig, a favorite cup and a shell found on a trip.
rod([-4.33,1.65,.25],[-4.05,2.05,.25],.012,M.leaf);
for(let i=0;i<4;i++){let x=-4.29+i*.065,y=1.71+i*.08;let l=ball(x,y,.26,.09,.035,.014,M.leaf);l.rotation.z=i%2?.5:-.5}
cyl(8.9,.91,-4.25,.105,.15,M.cream);cyl(8.9,1.0,-4.25,.07,.01,M.dark);rod([8.99,.94,-4.25],[9.04,.94,-4.25],.018,M.cream);
ball(-3.68,.87,4.34,.08,.045,.06,M.sheet);

// Combine repeated primitive furniture parts into GPU instances. The room is static,
// so the shadow map also only needs to be drawn once.
scene.updateMatrixWorld(true);
const batches = new Map();
for (const obj of [...scene.children]) {
  if (!obj.isMesh || ![boxGeo,sphereGeo,cylGeo].includes(obj.geometry)) continue;
  const key = `${obj.geometry.uuid}/${obj.material.uuid}/${obj.castShadow}`;
  if (!batches.has(key)) batches.set(key, []);
  batches.get(key).push(obj);
}
for (const objects of batches.values()) {
  if (objects.length < 2) continue;
  const first=objects[0], batch=new THREE.InstancedMesh(first.geometry,first.material,objects.length);
  batch.castShadow=first.castShadow; batch.receiveShadow=true;
  objects.forEach((obj,i)=>{batch.setMatrixAt(i,obj.matrix);scene.remove(obj)});
  batch.instanceMatrix.needsUpdate=true;scene.add(batch);
}
renderer.shadowMap.autoUpdate=false;
renderer.shadowMap.needsUpdate=true;

// Collision is a small human-radius circle tested separately along each axis.
solid(-2.75,0,1.1,.2);solid(4.25,.65,.45,.45);solid(5.55,-4.43,.35,.35);
const player={x:.3,z:7.1,yaw:0,pitch:0};const start={...player};const keys=new Set();const radius=.22;
function blocked(x,z){return solids.some(b=>{const nx=Math.max(b.minX,Math.min(x,b.maxX)),nz=Math.max(b.minZ,Math.min(z,b.maxZ));return (x-nx)**2+(z-nz)**2<radius**2})}
function reset(){Object.assign(player,start);keys.clear()}
document.querySelector('#reset').addEventListener('click',e=>{e.stopPropagation();reset()});
const intro=document.querySelector('#intro');const startButton=document.querySelector('#start');
function capture(){renderer.domElement.requestPointerLock()}
startButton.addEventListener('click',capture);renderer.domElement.addEventListener('click',capture);
document.addEventListener('pointerlockchange',()=>{intro.style.display=document.pointerLockElement===renderer.domElement?'none':'flex'});
document.addEventListener('mousemove',e=>{if(document.pointerLockElement!==renderer.domElement)return;player.yaw-=e.movementX*.0022;player.pitch=Math.max(-1.45,Math.min(1.45,player.pitch-e.movementY*.0022))});
document.addEventListener('keydown',e=>{keys.add(e.code);if(e.code==='KeyR')reset();if(['KeyW','KeyA','KeyS','KeyD','Space'].includes(e.code))e.preventDefault()});
document.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>keys.clear());
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
let last=performance.now();function frame(now){let dt=Math.min((now-last)/1000,.05);last=now;let f=(keys.has('KeyW')?1:0)-(keys.has('KeyS')?1:0),s=(keys.has('KeyD')?1:0)-(keys.has('KeyA')?1:0);let len=Math.hypot(f,s);if(len){f/=len;s/=len;let speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?4.0:2.5)*dt;let dx=(-Math.sin(player.yaw)*f+Math.cos(player.yaw)*s)*speed,dz=(-Math.cos(player.yaw)*f-Math.sin(player.yaw)*s)*speed;if(!blocked(player.x+dx,player.z))player.x+=dx;if(!blocked(player.x,player.z+dz))player.z+=dz}camera.position.set(player.x,1.66,player.z);camera.rotation.order='YXZ';camera.rotation.set(player.pitch,player.yaw,0);renderer.render(scene,camera);requestAnimationFrame(frame)}requestAnimationFrame(frame);




