import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// ICEFIELD / Station 07. Every texture and object in this scene is generated here.
const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,.85));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.03;
renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();
scene.background=new THREE.Color('#718fae');
scene.fog=new THREE.FogExp2('#819db6',.0065);
const camera=new THREE.PerspectiveCamera(65,innerWidth/innerHeight,.065,260);
camera.rotation.order='YXZ';
const clock=new THREE.Clock();
let seed=724901;
const rnd=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
const range=(a,b)=>a+(b-a)*rnd();
const clamp=THREE.MathUtils.clamp;
const smooth=(a,b,x)=>THREE.MathUtils.smoothstep(x,a,b);
const color=c=>new THREE.Color(c);
const batches=new Map();
const colliders=[];
const v3=new THREE.Vector3();
const dummy=new THREE.Object3D();
let objectCount=0;
function add(g,m,x=0,y=0,z=0,rx=0,ry=0,rz=0,cast=true){
  dummy.position.set(x,y,z);dummy.rotation.set(rx,ry,rz);dummy.scale.set(1,1,1);dummy.updateMatrix();
  const geom=g.clone();geom.applyMatrix4(dummy.matrix);
  const key=m.uuid+(cast?'s':'n');
  if(!batches.has(key))batches.set(key,{m,cast,gs:[]});
  batches.get(key).gs.push(geom);objectCount++;return geom;
}
function box(x,y,z,w,h,d,m,rx=0,ry=0,rz=0,cast=true){return add(new THREE.BoxGeometry(w,h,d),m,x,y,z,rx,ry,rz,cast);}
function roundBox(x,y,z,w,h,d,m,r=.04,rx=0,ry=0,rz=0){return add(new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/3,h/3,d/3)),m,x,y,z,rx,ry,rz);}
function cyl(x,y,z,rt,rb,h,m,rx=0,ry=0,rz=0,n=12){return add(new THREE.CylinderGeometry(rt,rb,h,n),m,x,y,z,rx,ry,rz);}
function sphere(x,y,z,r,m,sx=1,sy=1,sz=1){const g=new THREE.SphereGeometry(r,12,8);g.scale(sx,sy,sz);return add(g,m,x,y,z);}
function tube(points,r,m,n=6){const p=points.map(p=>new THREE.Vector3(...p));return add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(p),Math.max(12,p.length*6),r,n,false),m);}
function torus(x,y,z,r,t,m,rx=0,ry=0,rz=0){return add(new THREE.TorusGeometry(r,t,6,24),m,x,y,z,rx,ry,rz);}
function beam(a,b,r,m){const dir=new THREE.Vector3(...b).sub(new THREE.Vector3(...a));const g=new THREE.CylinderGeometry(r,r,dir.length(),8);g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),dir.clone().normalize()));g.translate((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2);return add(g,m);}
function solid(x,z,w,d){colliders.push({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2});}
function material(c,roughness=.7,metalness=0,extra={}){
 // Matte surfaces do not need the per-pixel microfacet/environment work used by metal and glass.
 if(roughness>=.8&&metalness<=.1)return new THREE.MeshPhongMaterial({color:c,shininess:4,specular:'#080808',...extra});
 return new THREE.MeshStandardMaterial({color:c,roughness,metalness,...extra});
}
function texCanvas(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;}
function grainTexture(base,type='paint'){
  const t=texCanvas(512,512,(ctx,w,h)=>{
    ctx.fillStyle=base;ctx.fillRect(0,0,w,h);
    for(let i=0;i<22000;i++){const a=rnd()*.075;ctx.fillStyle=rnd()>.5?`rgba(255,255,255,${a})`:`rgba(0,0,0,${a})`;const x=rnd()*w,y=rnd()*h;ctx.fillRect(x,y,type==='wood'?range(15,110):range(.5,2.5),type==='wood'?.5:range(.5,2));}
    if(type==='wood'){for(let i=0;i<150;i++){ctx.strokeStyle=`rgba(64,37,13,${range(.03,.13)})`;ctx.lineWidth=range(.2,1.4);const y=rnd()*h;ctx.beginPath();ctx.moveTo(0,y);ctx.bezierCurveTo(160,y+range(-8,8),320,y+range(-9,9),512,y+range(-5,5));ctx.stroke();}}
    if(type==='rubber'){for(let y=0;y<512;y+=24)for(let x=0;x<512;x+=24){ctx.fillStyle='#ffffff10';ctx.beginPath();ctx.arc(x+8,y+8,5,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#00000030';ctx.stroke();}}
    if(type==='fabric'){for(let i=0;i<512;i+=3){ctx.strokeStyle='#ffffff0b';ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,512);ctx.stroke();ctx.strokeStyle='#0000000c';ctx.beginPath();ctx.moveTo(0,i);ctx.lineTo(512,i);ctx.stroke();}}
  });t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;
}
const paint=grainTexture('#ffffff'),woodTex=grainTexture('#af8652','wood'),rubberTex=grainTexture('#ffffff','rubber'),fabricTex=grainTexture('#ffffff','fabric');
rubberTex.repeat.set(8,8);
const M={
 orange:material('#b6512e',.68,.32,{map:paint,bumpMap:paint,bumpScale:.011}),
 orangeLight:material('#d76a35',.63,.25,{map:paint}),
 trim:material('#bec4be',.49,.48,{map:paint}),
 steel:material('#727e83',.34,.82),darkSteel:material('#29373d',.49,.68),
 dark:material('#14272e',.8,.2),rubber:material('#30393a',.98,0,{map:rubberTex,bumpMap:rubberTex,bumpScale:.014}),
 cream:material('#d4c8a5',.9,0,{map:fabricTex,bumpMap:fabricTex,bumpScale:.008}),
 seam:material('#686a59',.9),wood:material('#e3c395',.67,0,{map:woodTex,bumpMap:woodTex,bumpScale:.008}),
 white:material('#e2e5da',.48,.22),black:material('#101c20',.65,.2),
 teal:material('#547775',.85,0,{map:fabricTex}),tealDark:material('#294d50',.88,0,{map:fabricTex}),
 linen:material('#cbb798',.92,0,{map:fabricTex,bumpMap:fabricTex,bumpScale:.01}),
 red:material('#a83c2c',.62,.18),yellow:material('#e2aa4c',.85,.1,{map:fabricTex}),
 snow:material('#dce8ed',.94),frost:material('#d2e3e9',.85,.05),
 ice:material('#80afc6',.19,.23),rock:material('#657b8b',1),
 light:material('#ffe5ad',.3,0,{emissive:'#ffca76',emissiveIntensity:3.2}),
 orangeGlow:material('#fd9d35',.3,0,{emissive:'#ed721e',emissiveIntensity:1.6}),
 greenGlow:material('#9de1ab',.4,0,{emissive:'#9de1ab',emissiveIntensity:.65}),
 coffee:material('#251712',.22),paper:material('#e2d9b7',.95),blue:material('#366477',.7,.1),
};

// A blue-hour sky with a pale, clear horizon; there is no weather animation or exposure jump.
const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{},vertexShader:`varying vec3 vPos;void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec3 vPos;void main(){float h=normalize(vPos).y;vec3 horizon=vec3(.49,.64,.78);vec3 zenith=vec3(.075,.18,.33);vec3 c=mix(horizon,zenith,pow(max(h,0.),.46));float west=pow(max(0.,normalize(vPos).x*.7+normalize(vPos).z*.7),6.);c+=vec3(.055,.015,-.008)*west*exp(-h*h*38.);gl_FragColor=vec4(c,1.);}`});
scene.add(new THREE.Mesh(new THREE.SphereGeometry(220,40,24),skyMat));
const envScene=new THREE.Scene();
envScene.add(new THREE.Mesh(new THREE.SphereGeometry(30,24,16),skyMat.clone()));
const pmrem=new THREE.PMREMGenerator(renderer);
scene.environment=pmrem.fromScene(envScene,.04,.1,70).texture;
scene.environmentIntensity=.42;
pmrem.dispose();
const starsGeo=new THREE.BufferGeometry(),stars=[];
for(let i=0;i<110;i++){const a=rnd()*Math.PI*2,h=range(.35,1),r=Math.sqrt(1-h*h);stars.push(Math.cos(a)*r*180,h*180,Math.sin(a)*r*180);}
starsGeo.setAttribute('position',new THREE.Float32BufferAttribute(stars,3));scene.add(new THREE.Points(starsGeo,new THREE.PointsMaterial({color:'#cddcf2',size:.14,sizeAttenuation:true,transparent:true,opacity:.38,depthWrite:false,fog:false})));
const moon=new THREE.Mesh(new THREE.SphereGeometry(1.0,20,12),new THREE.MeshBasicMaterial({color:'#dfebec',fog:false}));moon.position.set(85,90,-135);scene.add(moon);

const snowRidges=[];
snowRidges.push({x:-3.7,z:9.7,len:4.8,width:.73,h:.30},{x:-4.6,z:11.8,len:5.2,width:1.15,h:.24},{x:4.8,z:10.9,len:5.5,width:.93,h:.29},{x:3.8,z:12.6,len:3.5,width:.70,h:.20},{x:-6,z:3.1,len:3.5,width:.64,h:.27});
for(let i=0;i<180;i++){
 const x=range(-31,31),z=range(-27,31);if(Math.abs(x)<4.6&&z>-5.5&&z<8.7)continue;
 snowRidges.push({x,z,len:range(1.8,6.5),width:range(.34,1.15),h:range(.055,.23)});
}
function snowHeight(x,z){
 if(Math.abs(x)<3.58&&z>-3.9&&z<3.9)return -.08;
 if(Math.abs(x)<1.22&&z>=3.8&&z<6.4)return -.04;
 const wave=.037*Math.sin(x*.92+z*.41)+.025*Math.cos(z*1.17-x*.31)+.013*Math.sin(x*3.1+z*1.6);
 const drift=1.0*Math.exp(-((x+5.3)**2/5+(z+.9)**2/39))+.8*Math.exp(-((x-1)**2/30+(z+6.7)**2/4.8))+.48*Math.exp(-((x-7.5)**2/10+(z-3)**2/28));
 const far=smooth(15,40,Math.hypot(x,z))*(.8+.65*Math.sin(x*.12+z*.065)*Math.cos(z*.14));
 const route=1-.75*Math.exp(-(x*x/4+(z-8)**2/9));
 let relief=0;
 for(const r of snowRidges){const dx=(x-r.x)/r.len;if(Math.abs(dx)>.55)continue;const bend=Math.sin(dx*4)*.20;const dz=(z-r.z-bend)/r.width;if(Math.abs(dz)>1)continue;const envelope=Math.pow(Math.max(0,1-(dx*2)**2),2);const profile=Math.pow(Math.max(0,1-Math.abs(dz)),dz<0?1.1:3.8);relief+=r.h*envelope*profile;}
 return -.035+wave*route+drift+far+relief;
}
const snowTex=texCanvas(512,512,(ctx,w,h)=>{ctx.fillStyle='#e2e8ec';ctx.fillRect(0,0,w,h);for(let i=0;i<50000;i++){const v=rnd()>.45?255:125;ctx.fillStyle=`rgba(${v},${v},${v},${range(.025,.15)})`;ctx.fillRect(rnd()*w,rnd()*h,range(.4,1.5),range(.4,1.5));}for(let y=0;y<512;y+=11){ctx.strokeStyle='#688aaa0a';ctx.beginPath();for(let x=0;x<=512;x+=4){const yy=y+Math.sin(x*.035+y)*3;x?ctx.lineTo(x,yy):ctx.moveTo(x,yy);}ctx.stroke();}});
snowTex.wrapS=snowTex.wrapT=THREE.RepeatWrapping;snowTex.repeat.set(65,65);
const snowMat=material('#e0e8ee',.94,0,{map:snowTex,bumpMap:snowTex,bumpScale:.026,vertexColors:true});
const terrain=new THREE.PlaneGeometry(150,150,280,280);terrain.rotateX(-Math.PI/2);
const pos=terrain.attributes.position,cols=[];
for(let i=0;i<pos.count;i++){const u=pos.getX(i)/75,v=pos.getZ(i)/75,x=22*u+53*u**5,z=22*v+53*v**5;pos.setX(i,x);pos.setZ(i,z);pos.setY(i,snowHeight(x,z));terrain.attributes.uv.setXY(i,(x+75)/150,(z+75)/150);let n=.92+.025*Math.sin(x*.37+z*.23)+.014*Math.sin(x*2+z*3);cols.push(n,n+.008,Math.min(1,n+.018));}
terrain.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));terrain.computeVertexNormals();
const terrainMesh=new THREE.Mesh(terrain,snowMat);terrainMesh.receiveShadow=true;scene.add(terrainMesh);

// Ice showing through on the scoured lee side, with branching fractures and snowy rims.
for(let i=0;i<7;i++){
 const x=range(4.6,7),z=range(-2,5),r=range(.27,.74),g=new THREE.CircleGeometry(r,19);g.rotateX(-Math.PI/2);g.scale(1,1,.53);
 const p=g.attributes.position;for(let j=0;j<p.count;j++){const px=p.getX(j),pz=p.getZ(j);p.setY(j,snowHeight(x+px,z+pz)+.014);}g.computeVertexNormals();add(g,M.ice,x,0,z,0,0,0,false);
 for(let j=0;j<3;j++){const a=range(-1,1),xx=x+a*r*.7,zz=z+range(-.2,.2)*r;const ps=[];for(let k=0;k<4;k++){const px=xx+(k-1.5)*r*.11,pz=zz+(k-1.5)*r*.15;ps.push([px,snowHeight(px,pz)+.018,pz]);}tube(ps,.0025,M.frost,4);}
}
for(const [x,z,r] of [[5.65,1.5,.47],[5.98,1.29,.26],[6.1,1.65,.20]]){const g=new THREE.IcosahedronGeometry(r,1);g.scale(1,.37,.72);g.rotateY(.31);g.computeVertexNormals();add(g,M.ice,x,snowHeight(x,z)+.04,z);sphere(x-.05,snowHeight(x,z)+r*.24,z-.075,r*.78,M.snow,1,.14,.6);solid(x,z,r*1.6,r*1.1);}
// Two mountain ranges and glacial ridges close the horizon without enlarging the playable site.
for(let layer=0;layer<2;layer++){
 const g=new THREE.PlaneGeometry(240,48,96,12);g.rotateX(-Math.PI/2);const p=g.attributes.position;
 for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i);const ridge=Math.max(0,1-Math.abs(z)/24);const peaks=5+9*Math.pow(Math.abs(Math.sin(x*.055+layer*2)),4)+5*Math.pow(Math.abs(Math.cos(x*.091-1)),8);p.setY(i,Math.pow(ridge,1.6)*peaks*(.82+.18*Math.sin(x*.8+z*.45)));p.setZ(i,z-87-layer*33);}
 g.computeVertexNormals();add(g,material(layer?'#9aaec4':'#718fa7',1),0,layer?0:-1,0,0,0,0,false);
}
for(let i=0;i<14;i++){let x=range(-43,43),z=range(-38,-17);const r=range(1,3);const g=new THREE.IcosahedronGeometry(r,0);g.scale(1,.25,.65);add(g,M.frost,x,snowHeight(x,z)+r*.1,z,0,rnd()*6,0,false);}

const hemi=new THREE.HemisphereLight('#adc8f5','#69737e',1.18);scene.add(hemi);
const sun=new THREE.DirectionalLight('#bfd6ff',1.55);sun.position.set(-18,12,14);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-18;sun.shadow.camera.right=18;sun.shadow.camera.top=18;sun.shadow.camera.bottom=-18;sun.shadow.camera.near=1;sun.shadow.camera.far=65;sun.shadow.normalBias=.027;sun.shadow.bias=-.00015;scene.add(sun);sun.target.position.set(0,0,1);scene.add(sun.target);
function point(x,y,z,c,intensity,dist,shadow=false){const l=new THREE.PointLight(c,intensity,dist,2);l.position.set(x,y,z);if(shadow){l.castShadow=true;l.shadow.mapSize.set(1024,1024);l.shadow.bias=-.0003;l.shadow.normalBias=.018;l.shadow.camera.near=.08;}scene.add(l);return l;}
point(-1.75,3.10,-1.7,'#ffcc8c',19,7,true);
point(1.7,3.11,1.1,'#ffd29a',17,6.5,false);
point(0,2.43,5.0,'#ffc175',6,3.6,false);
const porch=new THREE.SpotLight('#ffc181',16,6.5,.68,.85,2);porch.position.set(0,2.59,6.51);porch.target.position.set(0,0,7.58);scene.add(porch,porch.target);

// Foundation, frame, insulated envelope. Floor elevation is 0.30 m.
box(0,.13,0,7.12,.26,7.7,M.darkSteel);box(0,.27,0,6.9,.06,7.52,M.rubber);
box(0,.1,4.95,2.34,.2,2.52,M.darkSteel);box(0,.27,4.95,2.18,.06,2.5,M.rubber);
for(const x of [-3.0,3.0])for(const z of [-3.2,2.9]){box(x,-.01,z,.5,.4,.55,M.darkSteel);box(x,.07,z,.78,.05,.75,M.steel);}
for(let x=-3.12;x<3.3;x+=.65)box(x,.307,0,.017,.009,7.28,M.darkSteel,0,0,0,false);
for(let z=-3.4;z<3.5;z+=.65)box(0,.308,z,6.5,.009,.014,M.darkSteel,0,0,0,false);
// Side and rear panels with close-range stitching, metal channels, and socket fasteners.
for(const side of [-1,1]){
 box(side*3.47,1.8,0,.17,3,7.7,M.orange);solid(side*3.47,0,.2,7.7);
 for(let j=0;j<7;j++){
  const z=-3.2+j*1.06;
  roundBox(side*3.345,1.72,z,.1,2.78,1.035,M.cream,.038);
  box(side*3.575,1.8,z,.055,3.0,.045,M.trim);
  for(const y of [.52,2.86])for(const dz of [-.42,.42])cyl(side*3.41,y,z+dz,.012,.012,.016,M.steel,0,0,Math.PI/2,6);
  for(let k=0;k<6;k++)box(side*3.571,1.79,z-.43+k*.17,.026,2.75,.025,M.orangeLight);
 }
 box(side*3.31,.44,0,.06,.2,7.5,M.darkSteel);box(side*3.46,3.24,0,.29,.15,7.95,M.trim);
 box(side*3.48,.42,0,.3,.14,7.92,M.trim);
}
box(0,1.8,-3.78,6.95,3,.17,M.orange);solid(0,-3.78,7,.22);
for(let j=0;j<7;j++){const x=-2.94+j*.98;roundBox(x,1.72,-3.655,.95,2.78,.10,M.cream,.035);box(x,1.8,-3.884,.034,2.9,.025,M.trim);for(const y of [.5,2.85])for(const dx of [-.38,.38])cyl(x+dx,y,-3.59,.011,.011,.016,M.steel,Math.PI/2,0,0,6);}
box(0,.44,-3.57,6.73,.2,.06,M.darkSteel);
// Front facade, two true glazed openings, and a wide entry.
for(const side of [-1,1]){
 const cx=side*2.27;
 box(cx,.95,3.78,2.38,1.3,.19,M.orange);box(cx,2.96,3.78,2.38,.68,.19,M.orange);
 box(side*3.32,2.03,3.78,.36,.87,.19,M.orange);box(side*1.22,2.03,3.78,.31,.87,.19,M.orange);
 solid(cx,3.78,2.42,.21);
 roundBox(cx,.91,3.647,2.3,1.18,.1,M.cream);roundBox(cx,2.94,3.647,2.3,.52,.1,M.cream);
 box(side*3.29,2.01,3.64,.37,1.03,.1,M.cream);box(side*1.26,2.01,3.64,.31,1.03,.1,M.cream);
}
box(0,2.94,3.78,2.2,.68,.19,M.orange);roundBox(0,2.96,3.64,2.14,.57,.09,M.cream);
// Roof: exposed ribs outside, insulated sloping panels inside.
const pitch=.18,roofHalf=3.72,roofLen=Math.sqrt(roofHalf*roofHalf+.67*.67);
for(const side of [-1,1]){
 box(side*1.84,3.58,0,roofLen,.18,8.08,M.darkSteel,0,0,-side*pitch);
 for(let j=0;j<8;j++)box(side*1.7,3.43,-3.46+j*.99,3.52,.11,.965,M.cream,0,0,-side*pitch);
 for(let j=0;j<9;j++)box(side*1.84,3.72,-3.92+j*.98,roofLen,.075,.06,M.trim,0,0,-side*pitch);
 // Snow has a wind-scoured edge on the south roof.
 box(side*1.89,3.747,-.12,roofLen-.12,.055,7.86,M.snow,0,0,-side*pitch,false);
 for(let j=0;j<7;j++){const z=-3.6+j*1.05;box(side*1.87,3.79,z,roofLen-.18,.029,.027,M.frost,0,0,-side*pitch,false);}
}
// Gable closures, filling the shallow triangular roof end.
function gable(z){const shape=new THREE.Shape();shape.moveTo(-3.48,3.25);shape.lineTo(0,3.92);shape.lineTo(3.48,3.25);shape.closePath();const g=new THREE.ExtrudeGeometry(shape,{depth:.16,bevelEnabled:false});add(g,M.orange,0,0,z);}
gable(3.75);gable(-3.9);box(0,3.96,0,.16,.12,8.12,M.trim);box(0,4.028,0,.21,.025,8.0,M.frost,0,0,0,false);
for(const z of [-3.65,3.63]){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([-3.35,3.17,z,3.35,3.17,z,0,3.84,z],3));g.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,1,0,.5,1],2));g.computeVertexNormals();const m=M.cream.clone();m.side=THREE.DoubleSide;add(g,m);box(0,3.20,z,6.75,.065,.035,M.trim);}
// Front trim and gable bar.
for(const x of [-3.5,-1.1,1.1,3.5])box(x,1.76,3.92,.12,2.99,.07,M.trim);
box(0,3.26,3.93,7.13,.12,.09,M.trim);
for(const side of [-1,1])box(side*1.76,3.64,3.95,3.62,.11,.1,M.trim,0,0,-side*pitch);

// Window assemblies with a clear central view and patterned frost confined to the perimeter.
const frostMap=texCanvas(512,256,(ctx,w,h)=>{
 ctx.clearRect(0,0,w,h);
 for(let i=0;i<6300;i++){let x=rnd()*w,y=rnd()*h;const edge=Math.min(x,w-x,y*1.4,(h-y)*1.4);if(rnd()<Math.exp(-edge/17)*.83){ctx.fillStyle=`rgba(213,233,239,${range(.15,.6)})`;ctx.fillRect(x,y,range(.4,3),range(.5,3));}}
 for(let i=0;i<85;i++){const x=rnd()*w,y=rnd()>.5?range(0,15):range(h-18,h);ctx.strokeStyle='#e2f1f466';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+range(-15,15),y+(y<h/2?1:-1)*range(8,35));ctx.stroke();}
});
const glassMat=new THREE.MeshPhysicalMaterial({color:'#b5d5df',roughness:.17,metalness:.13,transparent:true,opacity:.16,side:THREE.DoubleSide,depthWrite:false});
function planeTex(t,x,y,z,w,h,ry=0,rx=0,emissive=false,opacity=1){const mat=emissive?new THREE.MeshBasicMaterial({map:t,transparent:opacity<1,opacity,side:THREE.DoubleSide,toneMapped:false}):new THREE.MeshStandardMaterial({map:t,roughness:.87,transparent:true,side:THREE.DoubleSide,depthWrite:opacity===1,opacity,polygonOffset:true,polygonOffsetFactor:-1});const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat);mesh.position.set(x,y,z);mesh.rotation.set(rx,ry,0);scene.add(mesh);return mesh;}
for(const side of [-1,1]){
 const x=side*2.27;
 box(x,2.04,3.79,1.78,1.12,.22,M.darkSteel);
 // Replace the apparent dark backing by a border-only construction.
 batches.get(M.darkSteel.uuid+'s').gs.pop();
 for(const dx of [-.85,.85])box(x+dx,2.04,3.78,.1,1.14,.32,M.trim);
 for(const y of [1.51,2.57])box(x,y,3.78,1.8,.1,.32,M.trim);
 for(const dx of [-.77,.77])box(x+dx,2.04,3.787,.035,.95,.15,M.rubber);
 for(const y of [1.58,2.5])box(x,y,3.787,1.55,.034,.15,M.rubber);
 const gl=new THREE.Mesh(new THREE.PlaneGeometry(1.51,.90),glassMat);gl.position.set(x,2.04,3.79);scene.add(gl);
 planeTex(frostMap,x,2.04,3.805,1.51,.90,0,0,false,.88);
 box(x,1.49,3.96,1.83,.045,.26,M.frost,0,0,0,false);
 box(x,1.51,3.48,1.81,.065,.39,M.wood);
 for(const dx of [-.85,.85])for(const y of [1.55,2.52])cyl(x+dx,y,3.956,.012,.012,.014,M.steel,Math.PI/2,0,0,6);
}

// Vestibule. Both doors are physically latched open along the side, clear of the route.
for(const side of [-1,1]){
 box(side*1.12,1.48,5.0,.15,2.38,2.48,M.orange);solid(side*1.12,5,.17,2.48);
 for(let j=0;j<3;j++)roundBox(side*1.019,1.48,4.15+j*.82,.08,2.23,.79,M.cream,.03);
 for(const z of [3.82,5.0,6.23])box(side*1.21,1.49,z,.10,2.5,.08,M.trim);
 box(side*1.12,.37,5,.23,.16,2.5,M.trim);
}
box(0,2.72,4.99,2.63,.16,2.82,M.darkSteel);box(0,2.817,4.99,2.63,.048,2.82,M.snow);box(0,2.63,4.99,2.2,.065,2.45,M.cream);
box(0,2.72,6.4,2.63,.14,.13,M.trim);
for(const side of [-1,1]){box(side*.91,1.47,6.24,.2,2.39,.22,M.darkSteel);box(side*.96,1.47,6.375,.11,2.44,.065,M.trim);solid(side*1.0,6.23,.31,.25);}
box(0,2.57,6.26,1.97,.2,.25,M.darkSteel);box(0,2.69,6.4,2.17,.075,.08,M.frost);
box(0,.326,6.22,1.85,.065,.27,M.steel);box(0,.325,3.81,2.03,.05,.22,M.steel);
for(const z of [3.8,6.24])for(const x of [-.99,.99])box(x,1.45,z,.055,2.27,.055,M.rubber);
// Outer door swings outward and rests against the exterior right wall.
box(1.38,1.48,7.0,.15,2.3,1.66,M.orangeLight,0,-.12,0);solid(1.38,7.0,.34,1.66);
box(1.285,1.48,7.0,.04,2.14,1.50,M.cream,0,-.12,0);
for(const y of [.7,2.3])cyl(1.21,y,6.22,.045,.045,.18,M.steel);
beam([1.22,1.29,7.6],[1.22,1.54,7.6],.025,M.darkSteel);box(1.24,1.42,7.6,.075,.3,.075,M.steel);
// Interior door visible on vestibule wall.
box(-.928,1.45,4.79,.13,2.19,1.96,M.trim);box(-.85,1.46,4.79,.04,2.04,1.82,M.cream);solid(-.94,4.79,.14,1.96);
beam([-.805,1.25,5.49],[-.805,1.5,5.49],.021,M.steel);

// Sloped, open steel grating makes the 30 cm floor transition continuous.
const rampZ=7.16,rampLength=1.65,rampAngle=Math.atan(.3/rampLength);
for(const x of [-.91,.91])box(x,.15,rampZ,.08,.12,rampLength+.15,M.darkSteel,rampAngle,0,0);
for(let j=0;j<23;j++){const z=6.36+j*.071;const y=.306*(1-(z-6.34)/1.7);box(0,y,z,1.82,.035,.032,M.steel);}
for(const x of [-.75,-.5,-.25,0,.25,.5,.75])box(x,.15,rampZ,.017,.038,rampLength,M.steel,rampAngle,0,0);
for(const side of [-1,1]){beam([side*.96,.18,7.7],[side*.96,.91,7.7],.029,M.trim);beam([side*.96,.32,6.48],[side*.96,1.18,6.48],.029,M.trim);beam([side*.96,.94,7.82],[side*.96,1.21,6.33],.036,M.yellow);solid(side*.96,7.15,.075,1.48);}
// A rubber boot tray, wet marks, hooks, and a hung parka occupy the vestibule edge.
box(.66,.333,4.64,.58,.06,.85,M.black);box(.66,.369,4.64,.49,.014,.76,M.darkSteel);
function boot(x,z){roundBox(x,.45,z,.19,.18,.36,M.dark,.055);roundBox(x,.61,z-.08,.16,.28,.17,M.dark,.04);box(x,.355,z,.2,.037,.37,M.rubber);torus(x,.755,z-.08,.065,.018,M.rubber,Math.PI/2);}
boot(.53,4.62);boot(.77,4.59);
box(.952,1.94,4.74,.09,.1,1.13,M.wood);
for(const z of [4.3,4.72,5.13])tube([[.9,1.95,z],[.81,1.88,z],[.77,1.97,z]],.016,M.steel);
roundBox(.80,1.36,4.34,.26,.71,.47,M.yellow,.08);sphere(.8,1.81,4.34,.19,M.yellow,.8,.85,1);box(.655,1.37,4.34,.02,.55,.025,M.dark);roundBox(.80,1.31,4.02,.20,.6,.16,M.yellow,.05,0,0,-.09);roundBox(.80,1.31,4.66,.20,.6,.16,M.yellow,.05,0,0,.09);
// Dark hood opening, stitching, zipped pockets, reflective strips, and knitted cuffs.
cyl(.653,1.82,4.34,.108,.108,.014,M.dark,0,0,Math.PI/2,20);
torus(.641,1.82,4.34,.114,.019,M.linen,0,Math.PI/2);
for(const z of [4.19,4.49]){roundBox(.655,1.19,z,.029,.16,.14,M.yellow,.012);box(.633,1.25,z,.015,.009,.11,M.black);tube([[.64,1.76,z],[.624,1.6,z+.018]],.005,M.linen);}
for(const z of [4.02,4.66]){box(.773,1.085,z,.17,.043,.15,M.linen);box(.773,1.015,z,.155,.058,.13,M.dark);}
box(.651,1.47,4.34,.013,.026,.41,M.linen);

// Fasteners and cold edges are economical merged geometry, not individual draw calls.
for(const side of [-1,1])for(let z=-3.7;z<=3.8;z+=.53){for(const y of [.43,3.23])cyl(side*3.62,y,z,.025,.025,.027,M.steel,0,0,Math.PI/2,6);}
for(let x=-3.45;x<=3.5;x+=.5)for(const y of [.43,3.26])cyl(x,y,3.997,.022,.022,.017,M.steel,Math.PI/2,0,0,6);
// Fine rime accretion over exposed roof lips, not a uniformly frosted building.
for(let i=0;i<75;i++){const z=range(-3.95,3.96),x=rnd()>.5?3.69:-3.69;const length=range(.035,.18);cyl(x,3.35-length*.5,z,.024,.003,length,M.frost,0,0,0,5);}
for(let i=0;i<15;i++){const x=range(-1.28,1.28),h=range(.035,.12);cyl(x,2.71-h/2,6.42,.019,.002,h,M.frost,0,0,0,5);}

function labelTexture(text,sub='',fg='#dfe5d9',bg='#263b40',w=512,h=256){return texCanvas(w,h,(ctx)=>{ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);ctx.strokeStyle=fg+'55';ctx.lineWidth=3;ctx.strokeRect(15,15,w-30,h-30);ctx.fillStyle=fg;ctx.textAlign='center';ctx.font=`bold ${h*.28}px Arial`;ctx.fillText(text,w/2,h*.51);ctx.font=`${h*.105}px Arial`;ctx.fillText(sub,w/2,h*.75);});}
planeTex(labelTexture('07','ICEFIELD RESEARCH','#e6e7d4','#203039'),2.30,.93,3.894,1.30,.59);
planeTex(labelTexture('FIELD STATION','78° 14′ N   /   EST. 1986','#dee5df','#8c3e2b',1024,256),0,3.51,3.928,2.60,.48);
planeTex(labelTexture('MIND THE STEP','KEEP THE THRESHOLD CLEAR','#293739','#d9b963',512,192),0,2.59,6.402,1.34,.20);
planeTex(labelTexture('AIRLOCK','BRUSH OFF SNOW','#d9ded3','#465856'),0,2.90,3.625,.94,.26,Math.PI);

// Field workbench across the rear wall. A central 1.6 m aisle remains open.
box(-.73,.92,-2.93,4.62,.12,1.05,M.wood);box(-.73,.849,-2.93,4.5,.08,.92,M.darkSteel);
for(const x of [-2.78,1.27])for(const z of [-3.30,-2.55])box(x,.59,z,.055,.53,.055,M.steel);
solid(-.75,-2.97,4.66,1.06);
for(const x of [-2.13,.69]){
 roundBox(x,.59,-2.96,1.08,.56,.85,M.tealDark,.025);
 for(let j=0;j<3;j++){box(x,.415+j*.18,-2.511,1.01,.161,.03,M.teal);box(x,.455+j*.18,-2.47,.24,.025,.038,M.steel);}
}
// Wall storage and shelf brackets.
box(-.9,2.10,-3.23,4.82,.055,.62,M.wood);box(-.9,2.08,-2.92,4.84,.04,.035,M.steel);
for(const x of [-2.85,-.7,1.2]){box(x,1.91,-3.52,.055,.39,.055,M.steel);beam([x,1.77,-3.48],[x,2.08,-2.99],.021,M.steel);}
for(let j=0;j<8;j++){
 const x=-2.83+j*.43;
 roundBox(x,2.29,-3.25,.35,.32,.4,j%3?M.white:M.teal,.018);box(x,2.465,-3.25,.36,.025,.41,M.trim);
 planeTex(labelTexture('S'+String(41+j),'CORE / 06.10','#304148','#dadac6',256,128),x,2.28,-3.035,.23,.115);
}
// Sample rack with sealed vials and pale ice cores.
box(.93,1.026,-3.03,.64,.075,.37,M.steel);
for(let x=0;x<5;x++)for(let z=0;z<2;z++){const xx=.68+x*.115,zz=-3.12+z*.19;cyl(xx,1.16,zz,.039,.039,.25,M.frost,0,0,0,12);cyl(xx,1.296,zz,.044,.044,.03,M.orangeLight);cyl(xx,1.06,zz,.046,.046,.03,M.steel);}
// A rugged instrument console with a real chart texture.
roundBox(-1.45,1.28,-3.17,1.13,.55,.4,M.darkSteel,.06);
const screenTex=texCanvas(768,384,(ctx,w,h)=>{ctx.fillStyle='#142c30';ctx.fillRect(0,0,w,h);ctx.fillStyle='#7fc5b8';ctx.font='22px monospace';ctx.fillText('ICEFIELD / METEOROLOGY',32,44);ctx.fillStyle='#bcdfcd';ctx.font='bold 54px monospace';ctx.fillText('−24.6°',32,124);ctx.font='20px monospace';ctx.fillStyle='#659b98';ctx.fillText('EXT. TEMP     WIND  04.2 m/s',32,166);ctx.strokeStyle='#47746d66';ctx.lineWidth=1;for(let y=210;y<360;y+=30){ctx.beginPath();ctx.moveTo(30,y);ctx.lineTo(730,y);ctx.stroke();}for(let x=30;x<750;x+=70){ctx.beginPath();ctx.moveTo(x,205);ctx.lineTo(x,358);ctx.stroke();}ctx.strokeStyle='#a0d5b3';ctx.lineWidth=3;ctx.beginPath();for(let x=30;x<730;x++){const y=275+Math.sin(x*.025)*21+Math.sin(x*.085)*6; x===30?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();ctx.fillStyle='#dcc993';ctx.font='16px monospace';ctx.fillText('06 OCT   18:42 UTC         RECORDING ●',30,370);});
planeTex(screenTex,-1.53,1.31,-2.958,.84,.395,0,0,true);
for(const x of [-.956,-.883])cyl(x,1.18,-2.945,.032,.032,.037,M.black,Math.PI/2);sphere(-.91,1.44,-2.947,.013,M.greenGlow);
box(-1.51,1.005,-2.73,.93,.035,.29,M.black);
for(let i=0;i<11;i++)for(let j=0;j<3;j++)box(-1.9+i*.074,1.029,-2.82+j*.078,.059,.01,.049,M.darkSteel);
tube([[-1.5,1.0,-3.36],[-1.4,.88,-3.45],[-.3,.78,-3.48],[-.2,.36,-3.52]],.013,M.black);
// Microscope with a heavy base, optical tube, adjustment knobs and sample stage.
roundBox(-2.53,1.025,-2.91,.37,.07,.42,M.white,.025);beam([-2.65,1.06,-3.01],[-2.64,1.42,-3.04],.045,M.white);beam([-2.64,1.42,-3.04],[-2.48,1.57,-2.92],.043,M.white);cyl(-2.45,1.51,-2.84,.047,.063,.22,M.black,0,0,-.38);box(-2.49,1.24,-2.85,.28,.027,.24,M.darkSteel);cyl(-2.5,1.16,-2.86,.055,.055,.022,M.steel);cyl(-2.69,1.34,-2.98,.051,.051,.033,M.black,0,0,Math.PI/2);box(-2.49,1.26,-2.83,.16,.006,.06,M.ice);
// Field notebook, loose survey sheet, pencils and a well-used enamel cup.
const paperMap=texCanvas(512,512,(ctx,w,h)=>{ctx.fillStyle='#ded6ba';ctx.fillRect(0,0,w,h);ctx.fillStyle='#344958';ctx.font='bold 26px monospace';ctx.fillText('TRANSECT 07 / FIELD NOTES',35,52);ctx.font='16px monospace';ctx.fillText('06 OCT   CORE S-44   18:10',35,82);ctx.strokeStyle='#85949688';for(let y=120;y<475;y+=30){ctx.beginPath();ctx.moveTo(30,y);ctx.lineTo(480,y);ctx.stroke();}ctx.strokeStyle='#37515a';ctx.lineWidth=2;for(let j=0;j<7;j++){ctx.beginPath();for(let i=0;i<15;i++){const x=35+i*range(12,24),y=119+j*30+range(-4,5);i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}ctx.strokeRect(260,330,185,120);ctx.beginPath();ctx.moveTo(275,420);ctx.lineTo(305,365);ctx.lineTo(325,405);ctx.lineTo(355,359);ctx.lineTo(420,414);ctx.stroke();});
box(-.19,1.005,-2.79,.47,.025,.54,M.dark);planeTex(paperMap,-.19,1.021,-2.79,.44,.51,0,-Math.PI/2);cyl(.12,1.027,-2.77,.012,.012,.3,M.yellow,Math.PI/2,0,.18,8);
function mug(x,y,z){cyl(x,y+.065,z,.069,.064,.13,M.white);cyl(x,y+.134,z,.058,.058,.004,M.coffee);torus(x,y+.14,z,.066,.007,M.darkSteel,Math.PI/2);torus(x+.086,y+.072,z,.042,.013,M.white,0,Math.PI/2);}
mug(.34,.984,-2.69);

// Articulated warm work light on the bench.
cyl(-2.99,1.004,-2.94,.13,.15,.045,M.darkSteel);beam([-2.99,1.02,-2.94],[-2.97,1.51,-3.15],.023,M.darkSteel);beam([-2.97,1.51,-3.15],[-2.62,1.79,-3.12],.021,M.darkSteel);sphere(-2.97,1.51,-3.15,.05,M.steel);cyl(-2.57,1.74,-3.09,.055,.17,.16,M.tealDark,0,0,-.45);cyl(-2.54,1.668,-3.09,.143,.143,.006,M.light,0,0,-.45);
// Stool tucked under the bench; its body participates in collision.
cyl(-.69,.75,-1.95,.24,.25,.09,M.wood);cyl(-.69,.5,-1.95,.034,.042,.44,M.steel);for(let a=0;a<4;a++){const t=a*Math.PI/2;beam([-.69,.43,-1.95],[-.69+Math.cos(t)*.29,.34,-1.95+Math.sin(t)*.29],.025,M.steel);}solid(-.69,-1.95,.44,.44);

// Left side: expedition shelving and a compact cooking/heating station.
box(-2.94,1.4,-.45,.66,2.14,1.64,M.darkSteel);solid(-2.95,-.43,.72,1.69);
// Open shelving, remove its solid volume geometry and retain just uprights + boards.
batches.get(M.darkSteel.uuid+'s').gs.pop();
for(const z of [-1.22,.32])for(const x of [-3.23,-2.65])box(x,1.39,z,.045,2.16,.045,M.steel);
for(const y of [.43,1.05,1.72,2.44])box(-2.96,y,-.45,.69,.055,1.68,M.wood);
for(let i=0;i<3;i++){const z=-1+i*.53;roundBox(-2.97,.72,z,.5,.51,.43,i===1?M.orangeLight:M.teal,.035);box(-2.7,.75,z,.026,.05,.16,M.steel);box(-2.97,.98,z,.52,.035,.45,M.darkSteel);}
for(let j=0;j<4;j++){const z=-1.08+j*.36;cyl(-2.96,1.98,z,.115,.115,.43,j%2?M.white:M.steel);cyl(-2.96,2.2,z,.12,.12,.023,M.darkSteel);box(-2.827,2.0,z,.012,.12,.17,M.paper);}
for(let i=0;i<5;i++){const z=-1.05+i*.26;box(-2.97,1.38,z,.47,.54,.19,[M.yellow,M.teal,M.linen,M.red,M.cream][i]);box(-2.714,1.42,z,.013,.15,.14,M.paper);}
roundBox(-2.75,.84,1.88,1.04,1.06,1.4,M.white,.045);solid(-2.75,1.9,1.06,1.44);box(-2.75,1.40,1.88,1.12,.075,1.47,M.darkSteel);
box(-2.175,.82,1.88,.022,.83,1.21,M.cream);box(-2.145,.99,1.68,.03,.027,.32,M.steel);
// Single burner and kettle.
cyl(-2.74,1.459,1.55,.25,.25,.036,M.black);torus(-2.74,1.483,1.55,.17,.014,M.steel,Math.PI/2);sphere(-2.74,1.63,1.55,.205,M.steel,1,.83,1);cyl(-2.74,1.765,1.55,.102,.13,.035,M.darkSteel);sphere(-2.74,1.80,1.55,.034,M.black);torus(-2.74,1.74,1.55,.205,.021,M.black,0,0,Math.PI/2);beam([-2.59,1.6,1.55],[-2.44,1.73,1.55],.042,M.steel);
// Basin, spigot and water jerrycan.
box(-2.75,1.447,2.27,.59,.023,.49,M.steel);box(-2.75,1.461,2.27,.45,.012,.35,M.dark);tube([[-3.05,1.47,2.28],[-3.05,1.77,2.28],[-2.91,1.82,2.28],[-2.84,1.72,2.28]],.017,M.steel);
roundBox(-2.92,1.74,2.98,.47,.63,.31,M.blue,.05);torus(-2.92,2.10,2.98,.10,.021,M.darkSteel);cyl(-2.78,2.072,2.98,.04,.05,.04,M.darkSteel);
// Heater with visible fins and protected hot core.
roundBox(-2.6,.59,3.0,.77,.47,.45,M.darkSteel,.03);solid(-2.6,3,.83,.52);box(-2.18,.60,3,.015,.26,.29,M.orangeGlow);for(let z=2.82;z<3.2;z+=.06)box(-2.16,.6,z,.025,.33,.021,M.black);
tube([[-3.04,1.8,2.55],[-3.12,2.05,2.55],[-3.12,2.72,2.55],[-3.33,2.8,2.55]],.065,M.steel);

// Right side: a sleeping berth, folded wool blankets, duffel, and lockers.
box(2.57,.61,.65,1.24,.14,2.55,M.darkSteel);solid(2.56,.65,1.31,2.63);
for(const x of [2.05,3.08])for(const z of [-.42,1.69])box(x,.45,z,.065,.3,.065,M.steel);
roundBox(2.57,.76,.65,1.19,.23,2.48,M.linen,.10);
roundBox(2.57,.925,-.16,1.0,.17,.59,M.cream,.07);
// The quilt is a curved cloth surface with sewn seams following the draped geometry.
function quiltY(x,z){return .936+.012*Math.cos(x*3.5)+.006*Math.sin(z*21+x*4)-.23*smooth(.50,.67,Math.abs(x))-.20*smooth(.69,.87,z);}
const quilt=new THREE.PlaneGeometry(1.34,1.74,32,36);quilt.rotateX(-Math.PI/2);const qp=quilt.attributes.position;
for(let i=0;i<qp.count;i++){const x=qp.getX(i),z=qp.getZ(i);qp.setY(i,quiltY(x,z));}quilt.computeVertexNormals();add(quilt,M.teal,2.57,0,1.02);
for(let j=0;j<10;j++){const z=-.65+j*.153,ps=[];for(let k=0;k<=16;k++){const x=-.66+k*.0825;ps.push([2.57+x,quiltY(x,z)+.002,1.02+z]);}tube(ps,.0016,M.tealDark,4);}
roundBox(2.55,1.015,1.54,1.0,.14,.37,M.linen,.035);
for(let i=0;i<4;i++)box(2.55,1.089,1.42+i*.073,.94,.006,.008,M.cream,0,0,0,false);
// Wall shelf above berth, reading lamp, photograph and small book.
box(2.98,1.83,-.16,.62,.047,1.6,M.wood);
box(3.20,1.71,-.71,.09,.23,.035,M.steel);box(3.20,1.71,.45,.09,.23,.035,M.steel);
roundBox(2.96,1.87,.29,.33,.047,.5,M.red,.01);roundBox(2.96,1.912,.27,.31,.04,.47,M.paper,.01);
roundBox(2.98,1.965,-.12,.33,.22,.20,M.darkSteel,.018);for(let j=0;j<8;j++)box(2.8,1.969,-.19+j*.023,.012,.16,.008,M.black);sphere(2.791,1.99,-.05,.017,M.greenGlow);
// Footlocker and soft duffel under sleeping platform.
roundBox(2.54,.45,1.34,.94,.25,.62,M.orange,.04);box(2.03,.45,1.34,.021,.06,.21,M.steel);
roundBox(2.54,.45,.26,.77,.24,.58,M.tealDark,.1);tube([[2.31,.54,.25],[2.4,.66,.25],[2.57,.66,.25],[2.66,.54,.25]],.025,M.black);
// Two research supply lockers, with stamped vents and latches.
for(let j=0;j<2;j++){const x=2.15+j*.76;roundBox(x,1.33,-2.98,.72,2.03,.82,M.tealDark,.033);box(x,1.34,-2.549,.65,1.94,.032,M.teal);solid(x,-2.98,.75,.86);box(x+.22,1.29,-2.518,.035,.19,.026,M.steel);for(let i=0;i<5;i++)box(x,2.02+i*.047,-2.524,.32,.013,.018,M.darkSteel);planeTex(labelTexture(j?'PERSONAL':'EQUIPMENT',j?'BERTH 02':'FIELD / DRY','#344746','#d4d2b8',512,180),x,1.70,-2.524,.42,.15);}
// Front-right compact folding table under window and a chair.
box(2.24,1.04,2.92,1.27,.065,.61,M.wood);solid(2.24,2.95,1.32,.65);for(const x of [1.76,2.73])beam([x,.35,3.07],[x,1.0,2.76],.029,M.steel);
mug(2.57,1.075,2.88);box(2.05,1.10,2.91,.45,.025,.32,M.tealDark);box(2.05,1.119,2.91,.41,.012,.3,M.paper);
box(1.83,.77,2.02,.49,.07,.48,M.wood);box(1.83,1.04,1.82,.49,.50,.055,M.wood,0,0,-.015);for(const x of [1.63,2.03])for(const z of [1.82,2.22])beam([x,.34,z],[x,.75,z],.021,M.steel);solid(1.83,2.02,.48,.5);

// Practical fixtures, surface wiring, wall notes and a pinned survey map.
function fixture(x,y,z){box(x,y,z,1.35,.105,.19,M.darkSteel,0,0,0,false);box(x,y-.06,z,1.2,.035,.14,M.light,0,0,0,false);for(const dx of [-.61,.61])box(x+dx,y-.07,z,.026,.065,.21,M.steel,0,0,0,false);}
fixture(-1.75,3.25,-1.7);fixture(1.7,3.26,1.1);box(0,2.53,5,.63,.07,.17,M.darkSteel);box(0,2.485,5,.53,.025,.125,M.light);
box(0,2.68,6.48,.37,.15,.2,M.darkSteel);box(0,2.614,6.49,.29,.03,.14,M.light);
for(const x of [-1.75,1.7]){tube([[x,3.20,-3.54],[x,3.20,-1.7],[x,3.2,1.1],[x,3.13,3.55]],.018,M.darkSteel);for(let z=-3.3;z<3.5;z+=.8)box(x,3.23,z,.075,.04,.05,M.steel);}
box(1.13,1.55,3.60,.16,.23,.05,M.darkSteel);box(1.13,1.57,3.563,.07,.105,.027,M.white);
const mapTex=texCanvas(768,600,(ctx,w,h)=>{
 ctx.fillStyle='#c8c8ad';ctx.fillRect(0,0,w,h);ctx.fillStyle='#36535a';ctx.font='bold 24px monospace';ctx.fillText('ICEFIELD / TRANSECT SURVEY',36,45);ctx.font='14px monospace';ctx.fillText('SECTOR 07     1:25 000     78°14′ N',36,74);
 for(let i=0;i<30;i++){ctx.strokeStyle=i%5?'#61777988':'#476773';ctx.lineWidth=i%5?1.3:2;ctx.beginPath();for(let x=0;x<w;x+=4){const y=120+i*15+Math.sin(x*.014+i*.08)*35+Math.cos(x*.033-i*.14)*13;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}
 ctx.strokeStyle='#78909955';ctx.lineWidth=1;for(let x=30;x<w;x+=70){ctx.beginPath();ctx.moveTo(x,95);ctx.lineTo(x,h);ctx.stroke();}for(let y=100;y<h;y+=70){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
 ctx.strokeStyle='#a55137';ctx.lineWidth=4;ctx.setLineDash([12,8]);ctx.beginPath();ctx.moveTo(100,480);ctx.lineTo(230,370);ctx.lineTo(340,390);ctx.lineTo(500,250);ctx.lineTo(640,160);ctx.stroke();ctx.setLineDash([]);
 for(const [x,y,n] of [[100,480,'STATION 07'],[340,390,'S-44'],[640,160,'NORTH RIDGE']]){ctx.fillStyle='#a14d33';ctx.beginPath();ctx.arc(x,y,7,0,6.29);ctx.fill();ctx.font='bold 17px monospace';ctx.fillText(n,x+14,y+5);}ctx.fillStyle='#35505a';ctx.font='bold 30px monospace';ctx.fillText('N ↑',650,540);
});
box(-3.29,2.15,1.65,.065,1.12,1.48,M.wood);planeTex(mapTex,-3.246,2.15,1.65,1.36,1.02,Math.PI/2);
for(const y of [1.68,2.62])for(const z of [1.04,2.26])sphere(-3.225,y,z,.018,M.red);
const notesTex=texCanvas(512,512,(ctx,w,h)=>{ctx.fillStyle='#917659';ctx.fillRect(0,0,w,h);for(let i=0;i<5;i++){const x=30+(i%2)*237,y=25+Math.floor(i/2)*161;ctx.fillStyle=i===4?'#d7c795':'#e1dcc4';ctx.fillRect(x,y,209,145);ctx.fillStyle='#9d4936';ctx.beginPath();ctx.arc(x+105,y+8,5,0,6.3);ctx.fill();ctx.fillStyle='#4a5855';ctx.font='bold 13px monospace';ctx.fillText(['SHIFT / 07','SUPPLIES','RADIO LOG','CORE S-44','KEEP WARM'][i],x+14,y+30);ctx.font='10px monospace';for(let j=0;j<5;j++)ctx.fillText(['18:00  sample return','18:30  check inlet','19:00  evening report','wind NE / visibility good','next resupply: 12 OCT'][j],x+12,y+51+j*15);}});
box(.20,1.56,-3.568,1.11,.91,.045,M.wood);planeTex(notesTex,.20,1.56,-3.54,1.04,.84);
// Station clock and first-aid case visible when looking back toward the snow.
cyl(2.23,2.98,3.56,.185,.185,.055,M.darkSteel,Math.PI/2,0,0,32);
const clockTex=texCanvas(256,256,(ctx,w,h)=>{ctx.fillStyle='#d9d6bf';ctx.beginPath();ctx.arc(128,128,118,0,6.3);ctx.fill();ctx.strokeStyle='#374847';ctx.lineWidth=4;for(let i=0;i<12;i++){const a=i*Math.PI/6;ctx.beginPath();ctx.moveTo(128+Math.sin(a)*95,128-Math.cos(a)*95);ctx.lineTo(128+Math.sin(a)*108,128-Math.cos(a)*108);ctx.stroke();}ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(128,128);ctx.lineTo(80,151);ctx.moveTo(128,128);ctx.lineTo(49,97);ctx.stroke();ctx.fillStyle='#a7583b';ctx.beginPath();ctx.arc(128,128,7,0,6.3);ctx.fill();});
planeTex(clockTex,2.23,2.98,3.525,.337,.337,Math.PI);
roundBox(3.14,1.65,2.55,.24,.49,.48,M.white,.035);box(2.998,1.65,2.55,.02,.27,.09,M.red);box(2.985,1.65,2.55,.022,.09,.27,M.red);

// Exterior field kit and services, inspected on the return walk.
roundBox(-2.38,.42,5.16,1.12,.73,.72,M.orange,.055);solid(-2.38,5.16,1.16,.76);box(-2.38,.814,5.16,1.18,.08,.78,M.darkSteel);
for(const x of [-2.76,-2.0]){box(x,.46,5.54,.095,.16,.038,M.steel);box(x,.48,4.77,.095,.16,.038,M.steel);}box(-2.38,.46,5.563,.30,.075,.04,M.darkSteel);box(-2.38,.864,5.16,1.16,.022,.76,M.snow);
planeTex(labelTexture('FIELD KIT','ROPES / FLAGS / REPAIR','#d9d8bd','#32454b'),-2.38,.51,5.545,.66,.28);
// A scuffed aluminium snow shovel rests beside the vestibule, blade settled into the snow.
const shovelBlade=new THREE.PlaneGeometry(.39,.40,8,8);const sh=shovelBlade.attributes.position;
for(let i=0;i<sh.count;i++){const x=sh.getX(i),y=sh.getY(i);sh.setZ(i,.046*Math.pow(x/.195,2)+.035*Math.pow((y+.2)/.4,2));}shovelBlade.computeVertexNormals();
const shovelMat=M.steel.clone();shovelMat.side=THREE.DoubleSide;add(shovelBlade,shovelMat,-1.63,.20,5.58,-.13,.09,0);solid(-1.63,5.55,.4,.18);
beam([-1.63,.24,5.57],[-1.62,1.46,5.37],.021,M.wood);cyl(-1.63,.39,5.546,.030,.030,.29,M.steel,.16,0,0);
tube([[-1.62,1.46,5.37],[-1.72,1.51,5.36],[-1.72,1.68,5.33],[-1.51,1.68,5.33],[-1.51,1.51,5.36],[-1.62,1.46,5.37]],.019,M.orangeLight);
beam([-1.81,.008,5.59],[-1.44,.008,5.59],.012,M.darkSteel);
for(const x of [-1.74,-1.53])cyl(x,.17,5.637,.009,.009,.01,M.darkSteel,Math.PI/2,0,0,6);
// Fuel drums held on timber skids, kept away from the walkway.
for(const z of [-.7,.30]){cyl(4.42,.54,z,.34,.34,1.02,M.orange);solid(4.42,z,.72,.75);for(const y of [.12,.4,.75,1.035])torus(4.42,y,z,.34,.019,M.darkSteel,Math.PI/2);cyl(4.42,1.057,z,.32,.32,.016,M.snow);cyl(4.61,1.07,z,.045,.045,.026,M.steel);}
for(const x of [4.12,4.7])box(x,.06,-.2,.12,.12,2.0,M.wood);
// Service box and armored cable on the east wall.
roundBox(3.79,1.57,-1.56,.37,.78,.79,M.darkSteel,.03);solid(3.78,-1.57,.45,.85);box(3.99,1.57,-1.56,.025,.66,.66,M.teal);for(let i=0;i<7;i++)box(4.007,1.37+i*.055,-1.56,.025,.012,.43,M.black);tube([[3.84,1.13,-1.55],[3.84,.47,-1.55],[3.6,.28,-1.7],[3.6,.28,-3.1]],.025,M.black);
// Guyed instrument mast and anemometer, a strong silhouette in twilight.
const mastX=-5.55,mastZ=-1.8;
cyl(mastX,2.5,mastZ,.042,.06,5.3,M.trim);solid(mastX,mastZ,.3,.3);
for(const [dx,dz] of [[-1.4,1.3],[1.4,1.0],[0,-1.7]]){beam([mastX,3.8,mastZ],[mastX+dx,.13,mastZ+dz],.006,M.darkSteel);box(mastX+dx,.13,mastZ+dz,.10,.2,.10,M.steel);}
beam([mastX,4.5,mastZ],[mastX+1.0,4.5,mastZ],.025,M.steel);cyl(mastX+.93,4.7,mastZ,.015,.015,.4,M.steel);
for(let i=0;i<3;i++){const a=i*2.094;beam([mastX+.93,4.86,mastZ],[mastX+.93+Math.cos(a)*.25,4.86,mastZ+Math.sin(a)*.25],.014,M.darkSteel);sphere(mastX+.93+Math.cos(a)*.26,4.86,mastZ+Math.sin(a)*.26,.06,M.darkSteel,1,.6,1);}
for(let y=2.7;y<3.2;y+=.067)cyl(mastX, y,mastZ,.13,.16,.028,M.white);
// Roof vent, communications antenna, and a short ladder at the rear.
cyl(2.2,3.86,-2.6,.12,.12,.64,M.steel);cyl(2.2,4.23,-2.6,.22,.17,.10,M.darkSteel);cyl(2.2,4.29,-2.6,.23,.23,.02,M.frost);
cyl(-2.1,4.51,-2.4,.02,.029,1.35,M.darkSteel);for(const y of [4.42,4.73,5.01])beam([-2.62,y,-2.4],[-1.58,y,-2.4],.013,M.steel);
for(const x of [1.3,1.87])box(x,1.97,-4.04,.052,3.6,.062,M.steel);for(let y=.35;y<3.7;y+=.31)beam([1.3,y,-4.04],[1.87,y,-4.04],.022,M.steel);
// Low snow fence gives the entrance a sheltered patch without boxing it in.
for(let i=0;i<9;i++){const x=-8.2+i*.08,z=4.2+i*.7;box(x,.62,z,.085,1.2,.075,M.wood,0,0,-.08);}
for(const y of [.42,.86])beam([-8.2,y,4.2],[-7.54,y,9.8],.025,M.wood);
for(let i=0;i<38;i++){const z=4.2+i*.15;box(-8.2+(z-4.2)*.117,.63,z,.035,.8,.075,M.wood,0,0,-.1);solid(-8.2+(z-4.2)*.117,z,.14,.17);}
// Boot impressions have a sole profile and broken treads; wind has softened their edges.
const printTex=texCanvas(128,256,(ctx,w,h)=>{
 ctx.clearRect(0,0,w,h);ctx.fillStyle='rgba(85,119,146,.3)';ctx.shadowBlur=7;ctx.shadowColor='rgba(73,111,143,.5)';ctx.beginPath();ctx.moveTo(37,222);ctx.bezierCurveTo(30,208,29,169,36,138);ctx.bezierCurveTo(19,104,20,34,45,22);ctx.bezierCurveTo(73,9,100,29,102,59);ctx.bezierCurveTo(109,98,86,121,88,153);ctx.lineTo(91,216);ctx.quadraticCurveTo(70,238,37,222);ctx.fill();ctx.shadowBlur=0;
 ctx.strokeStyle='rgba(217,231,236,.66)';ctx.lineWidth=5;for(let y=37;y<123;y+=15){ctx.beginPath();ctx.moveTo(31,y);ctx.lineTo(63,y+7);ctx.lineTo(100,y-1);ctx.stroke();}for(let y=160;y<215;y+=15){ctx.beginPath();ctx.moveTo(36,y);ctx.lineTo(86,y);ctx.stroke();}ctx.strokeStyle='rgba(86,116,136,.24)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(63,26);ctx.lineTo(66,230);ctx.stroke();
});
const printMat=new THREE.MeshStandardMaterial({map:printTex,roughness:1,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2});
for(let i=0;i<21;i++){const z=8.1+i*.37,x=(i%2?.16:-.16)+Math.sin(i*.2)*.16+(z-8)*.20;const g=new THREE.PlaneGeometry(.27,.4,2,4);g.rotateX(-Math.PI/2);g.rotateY(i%2?.13:-.12);const p=g.attributes.position;for(let j=0;j<p.count;j++)p.setY(j,snowHeight(x+p.getX(j),z+p.getZ(j))+.006);g.computeVertexNormals();add(g,printMat,x,0,z,0,0,0,false);}
// Route marker poles beyond the station, reinforcing human scale.
for(const [x,z] of [[-4,11],[6,10],[9,-5],[-8,-9]]){cyl(x,snowHeight(x,z)+.58,z,.018,.018,1.18,M.orangeLight);cyl(x,snowHeight(x,z)+1.05,z,.021,.021,.12,M.white);}

// Human traces: a repaired worktop, drink rings, annotated tags, and a postcard at the berth.
const benchWear=texCanvas(1024,512,(ctx,w,h)=>{
 ctx.clearRect(0,0,w,h);
 for(let i=0;i<140;i++){ctx.strokeStyle=`rgba(58,38,20,${range(.03,.13)})`;ctx.lineWidth=range(.3,1);const x=range(20,1000),y=range(10,500);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+range(3,38),y+range(-3,3));ctx.stroke();}
 ctx.strokeStyle='#72543533';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(712,165,24,49,.08,.2,6.1);ctx.stroke();ctx.strokeStyle='#9e794831';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(717,163,24,49,.08,1.4,6.0);ctx.stroke();
});
planeTex(benchWear,-.73,.983,-2.93,4.59,1.02,0,-Math.PI/2);
for(let i=0;i<18;i++){const x=range(-2.92,1.49);box(x,.929,-2.398,range(.01,.045),.007,.0015,M.linen,0,0,range(-.18,.18),false);}
const photoTex=texCanvas(384,430,(ctx,w,h)=>{
 ctx.fillStyle='#ded7be';ctx.fillRect(0,0,w,h);const g=ctx.createLinearGradient(0,20,0,315);g.addColorStop(0,'#415e78');g.addColorStop(1,'#c2c6ba');ctx.fillStyle=g;ctx.fillRect(22,22,340,310);
 ctx.fillStyle='#8197a0';ctx.beginPath();ctx.moveTo(22,230);ctx.lineTo(84,102);ctx.lineTo(158,203);ctx.lineTo(214,144);ctx.lineTo(362,263);ctx.lineTo(362,332);ctx.lineTo(22,332);ctx.fill();ctx.fillStyle='#e1e3d8';ctx.beginPath();ctx.moveTo(58,157);ctx.lineTo(84,102);ctx.lineTo(132,169);ctx.lineTo(89,143);ctx.fill();ctx.fillStyle='#d3d7cd';ctx.fillRect(22,281,340,51);ctx.fillStyle='#a6533b';ctx.fillRect(175,254,71,42);ctx.fillStyle='#344851';ctx.beginPath();ctx.moveTo(165,255);ctx.lineTo(210,229);ctx.lineTo(258,255);ctx.fill();ctx.fillStyle='#dfc78a';ctx.fillRect(187,265,17,15);ctx.fillStyle='#454f50';ctx.font='italic 19px Georgia';ctx.fillText('Summer crew, 1986.',34,374);ctx.font='13px monospace';ctx.fillText('A GOOD PLACE TO COME BACK TO',34,406);
});
box(3.284,2.37,.31,.025,.64,.58,M.wood);planeTex(photoTex,3.264,2.37,.31,.53,.59,-Math.PI/2);
// A shielded reading light casts a small warm pool over the sleeping berth.
box(3.27,1.64,-.69,.08,.18,.13,M.darkSteel);beam([3.22,1.68,-.69],[2.96,1.76,-.69],.022,M.darkSteel);cyl(2.92,1.716,-.69,.057,.105,.13,M.tealDark,0,0,.3);cyl(2.94,1.654,-.69,.091,.091,.012,M.light,0,0,.3);
tube([[3.28,1.64,-.69],[3.29,1.08,-.69],[3.29,.47,-.69],[3.28,.45,-1.5]],.009,M.black);
// A towel hanging from the galley handle, with a narrow woven border.
roundBox(-2.118,.94,2.24,.035,.48,.24,M.linen,.012);box(-2.094,.735,2.24,.005,.034,.24,M.tealDark);for(let i=0;i<7;i++)box(-2.10,.682,2.14+i*.032,.01,.052,.009,M.linen,0,0,range(-.1,.1));
// Ice-core cartons, tagged with handwritten run numbers.
for(let i=0;i<5;i++){const x=.68+i*.115;box(x,1.145,-2.819,.058,.075,.004,M.paper);box(x,1.156,-2.815,.045,.004,.002,M.darkSteel);box(x,1.136,-2.815,.031,.003,.002,M.darkSteel);}
// A wall thermometer and a low-profile emergency light sit beside the entrance.
roundBox(-1.37,1.92,3.57,.12,.39,.032,M.white,.012);box(-1.37,1.92,3.548,.017,.28,.006,M.darkSteel);box(-1.37,1.852,3.541,.009,.137,.005,M.red);sphere(-1.37,1.778,3.537,.016,M.red);for(let i=0;i<8;i++)box(-1.405,1.79+i*.031,3.546,.028,.004,.005,M.darkSteel);
roundBox(-2.27,2.91,3.563,.51,.16,.09,M.darkSteel,.025);roundBox(-2.27,2.91,3.5,.41,.10,.028,M.light,.023);planeTex(labelTexture('EXIT','SNOW / RETURN','#acbdac','#2e443e',256,96),-2.27,2.74,3.625,.40,.15,Math.PI);
// Scuffed paint and frost are limited to handles, panel seams, and windward trim.
const edgeWear=texCanvas(128,512,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);for(let i=0;i<1700;i++){const x=Math.pow(rnd(),3)*w,y=rnd()*h;ctx.fillStyle=`rgba(206,224,231,${range(.1,.55)})`;ctx.fillRect(x,y,range(.5,3.5),range(.5,5));}for(let i=0;i<22;i++){ctx.strokeStyle='#708d9d55';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(range(0,40),rnd()*h);ctx.lineTo(range(0,25),rnd()*h);ctx.stroke();}});
const edgeMat=new THREE.MeshStandardMaterial({map:edgeWear,roughness:.95,transparent:true,opacity:.64,depthWrite:false,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2});
for(const x of [-3.44,-1.15,1.16])add(new THREE.PlaneGeometry(.115,2.75),edgeMat,x,1.78,3.974,0,0,0,false);
add(new THREE.PlaneGeometry(.12,2.27),edgeMat,-1.20,1.49,6.292,0,0,0,false);
// A bundled climbing line on the exterior kit box and a small service stencil.
for(let i=0;i<5;i++)torus(-2.38,.888+i*.019,5.16,.20,.013,M.yellow,Math.PI/2,0,i*.1);
planeTex(labelTexture('07 / E','230 V · SERVICE','#cbc8b2','#293b41',256,128),4.011,1.68,-1.56,.40,.20,Math.PI/2);
// Warm practical glow uses four small, depth-tested sprites rather than a full-screen bloom pass.
const glowMap=texCanvas(128,128,(ctx,w,h)=>{const g=ctx.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,212,153,.38)');g.addColorStop(.25,'rgba(255,177,85,.15)');g.addColorStop(1,'rgba(255,177,85,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);});
for(const [x,y,z,s] of [[0,2.56,6.52,.43],[-2.54,1.665,-3.07,.22],[2.94,1.65,-.69,.18]]){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:glowMap,color:'#ffd2a0',transparent:true,opacity:.5,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false}));sp.position.set(x,y,z);sp.scale.set(s,s,1);scene.add(sp);}
// The two small task lamps use fixed wall bounce rather than adding lighting work to every pixel.
for(const [x,y,z,w,h,ry] of [[3.283,1.47,-.69,.79,.83,-Math.PI/2],[-2.58,1.44,-3.588,1.17,.88,0]]){const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:glowMap,transparent:true,opacity:.48,depthWrite:false,blending:THREE.AdditiveBlending}));mesh.position.set(x,y,z);mesh.rotation.y=ry;scene.add(mesh);}

// Merge static objects by material: detail remains inexpensive when inside and outside overlap.
for(const {m,cast,gs} of batches.values()){
 if(!gs.length)continue;
 const normalized=gs.map(g=>g.index?g.toNonIndexed():g);
 const geo=mergeGeometries(normalized,false);
 const mesh=new THREE.Mesh(geo,m);mesh.castShadow=cast;mesh.receiveShadow=true;scene.add(mesh);
 for(const g of gs)g.dispose();for(const g of normalized)g.dispose();
}
batches.clear();

// Exploration: frame-rate independent, subdivided collision and a single continuous floor function.
const state={started:false,locked:false,drag:false,yaw:.54,pitch:-.045,keys:new Set(),speed:new THREE.Vector2(),quality:'Balanced',elapsed:0,frames:[],frameHistory:[],maxFrame:0};
const startPos=new THREE.Vector3(-8.8,snowHeight(-8.8,13.6)+1.65,13.6);
function setView(x,y,z,yaw,pitch=0){camera.position.set(x,y,z);state.yaw=yaw;state.pitch=pitch;camera.rotation.set(pitch,yaw,0);}
function reset(){setView(startPos.x,startPos.y,startPos.z,-.51,.025);state.speed.set(0,0);state.keys.clear();}
reset();
function floorAt(x,z){
 if(Math.abs(x)<3.48&&z>-3.83&&z<3.82)return .315;
 if(Math.abs(x)<1.13&&z>=3.8&&z<=6.36)return .315;
 if(Math.abs(x)<.96&&z>6.36&&z<8.06)return .315*(1-(z-6.36)/1.7);
 return snowHeight(x,z);
}
const radius=.23;
function blocked(x,z){
 if(Math.abs(x)>20||z< -16||z>24)return true;
 for(const b of colliders){const xx=clamp(x,b.minX,b.maxX),zz=clamp(z,b.minZ,b.maxZ);if((x-xx)**2+(z-zz)**2<radius*radius)return true;}return false;
}
function move(dx,dz){const steps=Math.ceil(Math.hypot(dx,dz)/.065)||1;for(let i=0;i<steps;i++){const x=camera.position.x+dx/steps,z=camera.position.z+dz/steps;if(!blocked(x,camera.position.z))camera.position.x=x;if(!blocked(camera.position.x,z))camera.position.z=z;}camera.position.y=floorAt(camera.position.x,camera.position.z)+1.65;}
const $=s=>document.querySelector(s);
function enter(){state.started=true;$('#welcome').classList.add('fade-out');$('#resume').classList.add('hidden');$('#crosshair').classList.remove('hidden');canvas.requestPointerLock?.();}
$('#enter').addEventListener('click',enter);$('#resume-button').addEventListener('click',enter);
canvas.addEventListener('click',()=>{if(state.started&&!state.locked)enter();});
document.addEventListener('pointerlockchange',()=>{state.locked=document.pointerLockElement===canvas;$('#resume').classList.toggle('hidden',state.locked||!state.started);$('#crosshair').classList.toggle('hidden',!state.locked);if(!state.locked)state.keys.clear();});
document.addEventListener('pointerlockerror',()=>{$('#resume').classList.add('hidden');canvas.classList.add('drag');});
canvas.addEventListener('mousedown',e=>{if(state.started&&!state.locked){state.drag=true;state.lastX=e.clientX;state.lastY=e.clientY;$('#resume').classList.add('hidden');}});
window.addEventListener('mouseup',()=>state.drag=false);
document.addEventListener('mousemove',e=>{if(state.locked||state.drag){const dx=state.locked?e.movementX:e.clientX-state.lastX,dy=state.locked?e.movementY:e.clientY-state.lastY;state.yaw-=dx*.002;state.pitch=clamp(state.pitch-dy*.002,-1.46,1.46);state.lastX=e.clientX;state.lastY=e.clientY;}});
window.addEventListener('keydown',e=>{
 if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight','Space'].includes(e.code)){state.keys.add(e.code);e.preventDefault();}
 if(e.repeat)return;if(e.code==='Escape'&&document.pointerLockElement)document.exitPointerLock();if(e.code==='KeyR')reset();if(e.code==='KeyF')$('#perf').classList.toggle('hidden');if(e.code==='KeyH')document.body.classList.toggle('clean');
});
window.addEventListener('keyup',e=>state.keys.delete(e.code));window.addEventListener('blur',()=>{state.keys.clear();state.drag=false;});
$('#reset').addEventListener('click',reset);$('#help').addEventListener('click',()=>$('#help-panel').classList.toggle('hidden'));
$('#quality').addEventListener('click',()=>{state.quality=state.quality==='High'?'Balanced':'High';renderer.setPixelRatio(Math.min(devicePixelRatio,state.quality==='High'?1.65:.85));$('#quality').textContent='Quality: '+state.quality;});
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
let lastUI=0,warmup=0;
function animate(){
 requestAnimationFrame(animate);const raw=clock.getDelta(),dt=Math.min(raw,.05);state.elapsed+=raw;
 if(state.started){const k=state.keys;let f=(k.has('KeyW')||k.has('ArrowUp')?1:0)-(k.has('KeyS')||k.has('ArrowDown')?1:0),s=(k.has('KeyD')?1:0)-(k.has('KeyA')?1:0);if(k.has('ArrowLeft'))state.yaw+=dt*1.3;if(k.has('ArrowRight'))state.yaw-=dt*1.3;
 const norm=Math.hypot(f,s)||1;const speed=(k.has('ShiftLeft')||k.has('ShiftRight'))?3.0:1.85;const tx=(s*Math.cos(state.yaw)-f*Math.sin(state.yaw))/norm*speed,tz=(-f*Math.cos(state.yaw)-s*Math.sin(state.yaw))/norm*speed;state.speed.x=THREE.MathUtils.damp(state.speed.x,tx,18,dt);state.speed.y=THREE.MathUtils.damp(state.speed.y,tz,18,dt);move(state.speed.x*dt,state.speed.y*dt);
 }
 camera.rotation.set(state.pitch,state.yaw,0);renderer.render(scene,camera);
 if(++warmup===3){renderer.shadowMap.autoUpdate=false;$('#loading').classList.add('hidden');}
 if(warmup>15&&raw<1){state.frames.push(raw*1000);state.frameHistory.push(raw*1000);if(state.frames.length>240)state.frames.shift();if(state.frameHistory.length>36000)state.frameHistory.shift();state.maxFrame=Math.max(state.maxFrame,raw*1000);}
 if(state.elapsed-lastUI>.5){lastUI=state.elapsed;const inside=Math.abs(camera.position.x)<3.4&&camera.position.z<3.8&&camera.position.z> -3.8;const vest=Math.abs(camera.position.x)<1.15&&camera.position.z>=3.8&&camera.position.z<6.4;$('#location').textContent=inside?'RESEARCH & LIVING QUARTERS':vest?'ENTRY VESTIBULE':'LEE OF THE STATION';$('#temperature').textContent=inside?'+18°C INSIDE':vest?'BRUSH OFF THE SNOW':'−24°C OUTSIDE';const sorted=[...state.frames].sort((a,b)=>a-b),avg=state.frames.reduce((a,b)=>a+b,0)/(state.frames.length||1);$('#perf').textContent=`FRAME TIME  /  ${state.quality.toUpperCase()}\nMean  ${avg.toFixed(1)} ms  (${(1000/avg).toFixed(0)} fps)\np95   ${(sorted[Math.floor(sorted.length*.95)]||0).toFixed(1)} ms\nDraws ${renderer.info.render.calls}  /  ${(renderer.info.render.triangles/1000).toFixed(0)}k tris\n${renderer.domElement.width} × ${renderer.domElement.height}`;}
}
// Read-only diagnostics and deterministic route helpers for repeatable local validation.
window.ICEFIELD={camera,scene,renderer,state,colliders,blocked,floorAt,move,setView,reset,getStats(){const a=[...state.frameHistory].sort((a,b)=>a-b);return {samples:a.length,meanMs:a.reduce((p,c)=>p+c,0)/(a.length||1),p50Ms:a[Math.floor(a.length*.5)],p95Ms:a[Math.floor(a.length*.95)],p99Ms:a[Math.floor(a.length*.99)],maxMs:a[a.length-1],drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,staticObjects:objectCount,position:camera.position.toArray(),quality:state.quality};},clearStats(){state.frameHistory.length=0;state.maxFrame=0;},start:enter};
await renderer.compileAsync(scene,camera);
animate();
