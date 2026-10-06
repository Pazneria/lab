import * as THREE from 'three';
import * as T from './textures.js';
import {Builder,broadLeaf,pinnate,monsteraLeaf,fanLeaf} from './geometry.js';

const canvas=document.querySelector('#world');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();T.sky.mapping=THREE.EquirectangularReflectionMapping;scene.background=T.sky;scene.fog=new THREE.FogExp2('#b7c7bb',.013);
const camera=new THREE.PerspectiveCamera(68,innerWidth/innerHeight,.07,90);camera.rotation.order='YXZ';
const pmrem=new THREE.PMREMGenerator(renderer);scene.environment=pmrem.fromEquirectangular(T.sky).texture;pmrem.dispose();scene.environmentIntensity=.65;
scene.add(new THREE.HemisphereLight('#d9ece0','#47452c',1.35));
const sun=new THREE.DirectionalLight('#ffedc5',3.25);sun.position.set(-6,13,2);sun.target.position.set(1,0,-1);scene.add(sun,sun.target);sun.castShadow=true;sun.shadow.mapSize.set(4096,4096);Object.assign(sun.shadow.camera,{left:-14,right:14,top:15,bottom:-15,near:1,far:35});sun.shadow.bias=-.00025;sun.shadow.normalBias=.018;sun.shadow.radius=2;
const fill=new THREE.DirectionalLight('#bfd8de',.4);fill.position.set(5,5,-10);scene.add(fill);
const b=new Builder(scene);let seed=1708;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};const rr=(a,b)=>a+(b-a)*rand();const pick=a=>a[Math.floor(rand()*a.length)];
const mat=(color,map,roughness=.85,extra={})=>new THREE.MeshStandardMaterial({color,map,roughness,...extra});
T.soil.repeat.set(3,12);T.bark.repeat.set(2,4);T.wood.center.set(.5,.5);T.wood.rotation=Math.PI/2;
const M={
 stone:mat('#b4b7a1',T.stone,.95,{bumpMap:T.stone,bumpScale:.035}),brick:mat('#d7c5a8',T.brick,.91,{bumpMap:T.brick,bumpScale:.024}),
 mortar:mat('#707766',T.stone),soil:mat('#a99477',T.soil,1,{bumpMap:T.soil,bumpScale:.019}),moss:mat('#9caa76',T.mossEdge,1,{alphaTest:.015,transparent:true,opacity:.72,depthWrite:false,side:THREE.DoubleSide}),
 iron:mat('#c9d4be',T.paint,.7,{metalness:.32}),rust:mat('#84634b',T.paint,.9,{metalness:.23}),dark:mat('#526e5c',T.paint,.7,{metalness:.35}),
 wood:mat('#b4a07e',T.wood,.92,{bumpMap:T.wood,bumpScale:.009}),bark:mat('#a29576',T.bark,.97,{bumpMap:T.bark,bumpScale:.027}),clay:mat('#d2bba7',T.terracotta,.88,{bumpMap:T.terracotta,bumpScale:.009}),
 glaze:mat('#396b60',T.terracotta,.27,{metalness:.08}),hose:mat('#354e34',null,.72),brass:mat('#9b844b',null,.4,{metalness:.7}),
 leaf:mat('#c6d4a9',T.leaf,.43,{side:THREE.DoubleSide,metalness:0}),monstera:mat('#b7cbaa',T.heartLeaf,.37,{side:THREE.DoubleSide}),fern:mat('#9ab785',T.leaf,.69,{side:THREE.DoubleSide}),palm:mat('#c0cfa9',T.leaf,.51,{side:THREE.DoubleSide}),dead:mat('#b28c45',T.leaf,.91,{side:THREE.DoubleSide}),
 glass:new THREE.MeshStandardMaterial({color:'#b6d2c7',roughness:.32,metalness:.14,transparent:true,opacity:.42,alphaMap:T.glassDirt,side:THREE.DoubleSide,depthWrite:false,envMapIntensity:.8}),
 glassCloud:new THREE.MeshStandardMaterial({color:'#9bab89',roughness:.58,metalness:.1,transparent:true,opacity:.58,alphaMap:T.glassDirt,side:THREE.DoubleSide,depthWrite:false}),
 shadow:new THREE.MeshBasicMaterial({map:T.shadowTex,transparent:true,depthWrite:false,color:'#253321',polygonOffset:true,polygonOffsetFactor:-1}),
 label:mat('#ddd9b7',null,.9),water:mat('#273f32',null,.19,{metalness:.4})
};M.glass.forceSinglePass=M.glassCloud.forceSinglePass=true;
const uprightTexture=T.wood.clone();uprightTexture.rotation=0;uprightTexture.needsUpdate=true;M.uprightWood=mat('#b4b29c',uprightTexture,.94,{bumpMap:uprightTexture,bumpScale:.007});
for(const material of [M.leaf,M.monstera,M.fern,M.palm]){material.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <lights_fragment_end>','#include <lights_fragment_end>\nreflectedLight.indirectDiffuse += diffuseColor.rgb * (gl_FrontFacing ? 0.025 : 0.16);');};material.customProgramCacheKey=()=> 'thin-foliage-light-v1';}
// World-scale paint chips keep thin posts and long purlins equally detailed.
for(const material of [M.iron,M.dark,M.rust]){
 material.onBeforeCompile=shader=>{
  shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vSurfaceWorld;');
  shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>\nvec4 surfaceWorld = vec4(transformed, 1.0);\n#ifdef USE_INSTANCING\nsurfaceWorld = instanceMatrix * surfaceWorld;\n#endif\nvSurfaceWorld = (modelMatrix * surfaceWorld).xyz;`);
  shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vSurfaceWorld;');
  shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#ifdef USE_MAP\nvec3 surfaceWeights=abs(normalize(cross(dFdx(vSurfaceWorld),dFdy(vSurfaceWorld))));surfaceWeights/=max(dot(surfaceWeights,vec3(1.0)),0.001);\nvec4 sampledDiffuseColor = texture2D(map,vSurfaceWorld.yz*1.6)*surfaceWeights.x + texture2D(map,vSurfaceWorld.xz*1.6)*surfaceWeights.y + texture2D(map,vSurfaceWorld.xy*1.6)*surfaceWeights.z;diffuseColor *= sampledDiffuseColor;\n#endif`);
 };material.customProgramCacheKey=()=> 'weathered-world-paint-v1';
}
const boxG=new THREE.BoxGeometry(1,1,1),cylG=new THREE.CylinderGeometry(1,1,1,12),sphereG=new THREE.SphereGeometry(1,10,7),planeG=new THREE.PlaneGeometry(1,1),ringG=new THREE.TorusGeometry(1,.045,6,32);
M.moss.forceSinglePass=true;
const pavers=Array.from({length:5},()=>{let c=rr(.016,.07),s=new THREE.Shape();s.moveTo(-.5+c,-.5);s.lineTo(.5-c,-.5);s.lineTo(.5,-.5+c);s.lineTo(.5,.5-c*.8);s.lineTo(.5-c*.8,.5);s.lineTo(-.5+c*.6,.5);s.lineTo(-.5,.5-c*.6);s.lineTo(-.5,-.5+c);s.closePath();let g=new THREE.ExtrudeGeometry(s,{depth:.042,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.006,bevelThickness:.006});g.rotateX(-Math.PI/2);g.translate(0,-.018,0);return g;});
const leaves=[broadLeaf(0,0),broadLeaf(0,1),monsteraLeaf(0),monsteraLeaf(1)],smallLeaf=broadLeaf(0,0,0),fernG=pinnate(),palmG=pinnate(true),fanG=fanLeaf();
function box(x,y,z,w,h,d,m=M.iron,rot=0,color=null){b.mesh(boxG,m,[x,y,z],[0,rot,0],[w,h,d],color);}
function sphere(x,y,z,sx,sy,sz,m){b.mesh(sphereG,m,[x,y,z],[0,rr(0,6.28),0],[sx,sy,sz]);}
function beam(a,c,r,m=M.iron){const av=new THREE.Vector3(...a),cv=new THREE.Vector3(...c),mid=av.clone().add(cv).multiplyScalar(.5),dir=cv.clone().sub(av);let q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),dir.clone().normalize());let g=new THREE.CylinderGeometry(r,r,dir.length(),8);g.applyQuaternion(q);g.translate(mid.x,mid.y,mid.z);b.unique(g,m);}
function contact(x,z,sx,sz,y=.017){b.mesh(planeG,M.shadow,[x,y,z],[-Math.PI/2,0,0],[sx,sz,1]);}
function leafAt(g,m,x,y,z,length,width,angle,pitch,color){b.mesh(g,m,[x,y,z],[pitch,angle,0],[width,length,length],color,'YXZ');}
function mossPatch(x,y,z,sx,sz){b.mesh(planeG,M.moss,[x,y+.004,z],[-Math.PI/2,0,rr(0,6.28)],[sx*2,sz*2,1],pick(['#d2d9a6','#b8c185','#aabd80']));}

// Human scale: 8.8 m wide, 18.2 m long, 3.35 m eaves, 5.1 m ridge.
box(0,-.15,1.1,11,.30,23,M.mortar);box(0,-.02,0,8.7,.06,18.5,M.mortar);
// Hand-set stone aisles, with moss in damp joints.
for(let row=0;row<27;row++)for(let col=0;col<12;col++){let x=-4.1+col*.746,z=-9.15+row*.72;if(Math.abs(x)<1.6&&z>-6.65&&z<6.1)continue;b.mesh(pavers[(row+col)%5],M.stone,[x,rr(-.003,.003),z],[0,rr(-.007,.007),0],[.707,1,.684],new THREE.Color().setHSL(.16,rr(.04,.12),rr(.66,.89)));if(rand()<.35)mossPatch(x+rr(-.3,.3),.031,z+.35,rr(.07,.24),rr(.011,.033));}
// Outside threshold remains deliberately small and enclosed by low curbs.
for(let row=0;row<4;row++)for(let col=0;col<6;col++)box(-2.0+col*.8,-.01,9.9+row*.72,.77,.08,.68,M.stone,0,'#b5bba6');
for(let s of [-1,1]){box(s*2.55,.13,10.7,.2,.28,3.5,M.brick);box(s*3.6,.01,10.6,1.7,.08,3.6,M.soil);for(let i=0;i<20;i++)mossPatch(s*rr(2.75,4.35),.045,rr(9.2,12),rr(.12,.4),rr(.15,.4));}
box(0,.11,12.51,5.25,.24,.2,M.brick);box(0,.075,12.75,5.15,.15,.48,M.soil);
// The tiny enclosed forecourt gives the threshold a finished back and a clear boundary.
for(let s of [-1,1]){
 box(s*3.2,1.19,12.84,4.05,2.38,.29,M.mortar);
 for(let row=0;row<16;row++)for(let col=0;col<9;col++){let x=s*(1.43+col*.435);box(x,.075+row*.145,12.66,.424,.135,.14,M.brick,0,pick(['#b4ac96','#a59f88','#c0b296','#aaa28f']));}
 box(s*3.2,2.41,12.79,4.12,.11,.39,M.stone);box(s*1.2,1.23,12.64,.16,2.46,.18,M.dark);
}
for(let i=0;i<11;i++)box(-1.06+i*.212,1.1,12.72,.204,2.2,.065,M.uprightWood,0,pick(['#9b9f86','#a0a58d','#b3b39a']));
for(let y of [.30,1.83])box(0,y,12.668,2.28,.14,.065,M.dark);beam([-1.05,.37,12.62],[1.05,1.76,12.62],.035,M.dark);b.mesh(ringG,M.rust,[.65,1.16,12.59],[0,0,0],[.11,.11,.11]);
// Central raised bed, exposed earthy surface and individual old bricks.
box(0,.13,-.3,3.25,.27,13.1,M.mortar);box(0,.28,-.3,3.04,.08,12.9,M.soil);
for(let s of [-1,1])for(let layer=0;layer<3;layer++)for(let i=0;i<31;i++){let z=-6.65+i*.424+(layer%2)*.20;if(z>6.12)continue;box(s*1.65,.07+layer*.11,z,.22,.102,.40,M.brick,rr(-.012,.012),pick(['#ad967c','#d6bea6','#b7a28b','#c8b699']));}
for(let s of [-1,1])for(let layer=0;layer<3;layer++)for(let j=0;j<8;j++){if(s===1&&layer===2&&j===7)continue;box(-1.48+j*.425,.07+layer*.11,s===1?6.23:-6.85,.403,.104,.22,M.brick,0,pick(['#b69a7d','#ccbaa1','#a68d73']));}
box(1.49,.255,6.22,.22,.068,.18,M.brick,.18);box(1.93,.07,6.49,.13,.07,.10,M.brick,.44);
for(let i=0;i<135;i++){let x=rr(-1.48,1.48),z=rr(-6.7,6.05);mossPatch(x,.337,z,rr(.06,.3),rr(.06,.38));if(i%2===0)sphere(x,.35,z,rr(.018,.06),rr(.01,.04),rr(.02,.07),M.stone);}
// Foundation brick walls, interrupted only by the entrance.
for(let side of [-1,1]){box(side*4.4,.29,-.2,.22,.6,18.4,M.mortar);for(let layer=0;layer<5;layer++)for(let j=0;j<43;j++)box(side*4.4,.066+layer*.112,-9.13+j*.427+(layer%2)*.20,.245,.103,.412,M.brick,0,pick(['#b8aa8b','#c5b18e','#9e9a7b']));}
for(let end of [-9.4,9.0])for(let layer=0;layer<5;layer++)for(let j=0;j<21;j++){let x=-4.3+j*.425+(layer%2)*.21;if(end>0&&Math.abs(x)<1.12)continue;box(x,.066+layer*.112,end,.409,.103,.25,M.brick,0,'#b3ad91');}
// Riveted roof ribs, slender glazing bars, collars and diagonal bracing.
const bays=[];for(let z=-9.35;z<=9.1;z+=2.3)bays.push(z);
for(let z of bays){for(let s of [-1,1]){
 box(s*4.36,1.96,z,.09,2.87,.09);box(s*4.36,.67,z,.19,.12,.18,M.dark);box(s*4.36,3.29,z,.24,.12,.16,M.dark);
 beam([s*4.36,3.35,z],[0,5.1,z],.052);beam([s*4.33,2.83,z],[s*3.78,3.57,z],.026);beam([s*4.36,3.36,z],[0,3.36,z],.019);
 beam([s*2.6,3.36,z],[s*1.65,4.44,z],.017,M.dark);
 for(let y of [.68,1.98,3.25])sphere(s*4.30,y,z+.05,.025,.025,.019,M.rust);
 }beam([0,3.36,z],[0,5.1,z],.021);sphere(0,3.36,z,.07,.07,.06,M.dark);}
for(let s of [-1,1]){
 for(let y of [.62,1.94,3.35])box(s*4.36,y,-.15,.065,.065,18.5);
 for(let x of [1.1,2.2,3.3])box(s*x,5.1-x/4.36*1.75,-.15,.048,.048,18.5);
 box(s*4.46,3.32,-.15,.19,.16,18.7,M.dark);
 beam([s*4.48,3.35,8.7],[s*4.48,.2,8.7],.063,M.dark);
 for(let j=0;j<bays.length-1;j++){
  let z=(bays[j]+bays[j+1])/2;box(s*4.36,1.98,z,.046,2.72,.048);
  for(let yy of [1.28,2.64])for(let zz of [z-.57,z+.57]){
   if((j===2&&s===-1&&yy>2)||(j===5&&s===1&&yy>2))continue;
   b.mesh(planeG,(j+(s+1))%5===0?M.glassCloud:M.glass,[s*4.355,yy,zz],[0,Math.PI/2,0],[1.105,1.275,1]);
  }
 }
 beam([s*4.31,.68,-9.3],[s*4.31,3.25,-7.1],.019,M.dark);beam([s*4.31,3.25,6.8],[s*4.31,.68,8.9],.019,M.dark);
}
box(0,5.1,-.15,.11,.1,18.8,M.dark);
// Roof panels use a thin, non-refractive weathered surface to keep multiple-pane views cheap.
const slope=Math.atan2(1.75,4.36);
for(let s of [-1,1])for(let j=0;j<8;j++)for(let k=0;k<4;k++){
 const x=s*(k+.5)*1.09,y=5.1-Math.abs(x)/4.36*1.75,z=-8.2+j*2.3;
 if((j===3&&k===2&&s===-1)||(j===5&&k===1&&s===1)||(j===1&&k===1&&s===-1))continue;
 b.mesh(planeG,(j+k)%6===0?M.glassCloud:M.glass,[x,y+.012,z],[-Math.PI/2,s*slope,0],[1.15,2.23,1]);
}
// Glazed end walls and open entry, an enamel house number under the gable.
for(let z of [-9.38,9.02]){
 for(let x=-4.36;x<=4.4;x+=1.09){if(z>0&&Math.abs(x)<.2)continue;box(x,1.99,z,.066,2.77,.075);let top=5.1-Math.abs(x)/4.36*1.75;box(x,(3.35+top)/2,z,.044,top-3.35,.048);}
 for(let y of [.62,1.96,3.35]){if(z<0)box(0,y,z,8.75,.065,.065);else{box(-2.75,y,z,3.25,.065,.065);box(2.75,y,z,3.25,.065,.065);}}
 for(let j=0;j<8;j++){let x=-3.815+j*1.09;if(z>0&&Math.abs(x)<1.1)continue;for(let y of [1.29,2.65])b.mesh(planeG,M.glass,[x,y,z],[0,0,0],[1.025,1.27,1]);let top=5.1-Math.abs(x)/4.36*1.75;if(top>3.7)b.mesh(planeG,M.glass,[x,(top+3.4)/2,z],[0,0,0],[1.02,top-3.46,1]);}
}
for(let x of [-1.13,1.13])box(x,1.65,9.04,.11,3.3,.11,M.dark);box(0,3.32,9.04,2.36,.12,.12,M.dark);
// Door is fixed open against the outer wall, complete with glazing and handle.
for(let x of [1.19,3.21])box(x,1.55,9.3,.075,3.04,.08,M.dark);for(let y of [.06,3.05])box(2.2,y,9.3,2.03,.085,.08,M.dark);b.mesh(planeG,M.glass,[2.2,1.55,9.34],[0,0,0],[1.94,2.93,1]);box(2.2,1.55,9.35,.04,2.9,.04);box(2.2,1.3,9.35,1.98,.045,.04);box(2.2,2.45,9.35,1.98,.045,.04);beam([1.45,1.1,9.4],[1.45,1.3,9.4],.027,M.brass);
// Fine cracks on a few surviving panes.
for(let spec of [[-4.32,2.9,-2.1],[4.32,1.65,3.3],[-4.32,1.8,6.4]]){
 let [x,y,z]=spec;const pts=[];for(let branch=0;branch<4;branch++){let yy=y,zz=z;for(let n=0;n<4;n++){let ny=yy+rr(-.13,.1)+(branch%2?.07:-.07),nz=zz+(branch<2?1:-1)*rr(.06,.15);pts.push(x,yy,zz,x,ny,nz);yy=ny;zz=nz;}}let g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));scene.add(new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:'#e1e8d6',transparent:true,opacity:.5})));}

// Layered botany: long banana blades, perforated philodendron, palms and fern crowns.
function banana(x,z,h=2.7,scale=1){
 contact(x,z,2.3,2.3,.348);const cy=.34;beam([x,cy,z],[x+.09,h*.72,z-.07],.085*scale,M.bark);
 for(let j=0;j<9;j++){
  const a=j*2.4+rr(-.35,.35),height=h*(.62+(j/9)*.38),reach=rr(.35,.6)*scale;
  const tip=[x+Math.sin(a)*reach,height,z+Math.cos(a)*reach];b.tube([[x,.4,z],[x+Math.sin(a)*.13,height*.64,z+Math.cos(a)*.13],tip],.022*scale,M.palm,14,5);
  leafAt(leaves[j%2],j===0?M.dead:M.leaf,...tip,rr(1.15,1.65)*scale,rr(.62,.85)*scale,a,rr(-.12,.38),pick(['#82a460','#a2b77a','#608747','#7b9b55']));
 }
 for(let j=0;j<3;j++)b.tube([[x,.4,z],[x+.12,.65,z+.09],[x+rr(-.4,.4),.35,z+rr(-.5,.5)]],.035,M.bark,9,5);
}
function monstera(x,z,h=1.1,scale=1){
 contact(x,z,1.7*scale,1.7*scale,.35);
 for(let i=0;i<7;i++){let a=i*2.4+rr(-.2,.2),e=rr(.15,.4)*scale;let tip=[x+Math.sin(a)*e,.35+h*rr(.62,1.2),z+Math.cos(a)*e];b.tube([[x,.34,z],[x+Math.sin(a)*e*.3,tip[1]*.73,z+Math.cos(a)*e*.3],tip],.013*scale,M.palm,9,5);leafAt(leaves[2+i%2],M.monstera,...tip,rr(.61,1)*scale,rr(.65,1)*scale,a,rr(.02,.47),pick(['#6a934c','#578447','#739a51','#8ba86a']));}
}
function fern(x,z,scale=1,cy=.34){
 for(let i=0;i<9;i++){const a=i*2.4;leafAt(fernG,M.fern,x,cy+rr(.035,.1),z,scale*rr(.66,1),scale,a,rr(-.52,-.1),pick(['#a6bc64','#759a44','#90b264']));}
 sphere(x,cy+.07,z,.055,.095,.055,M.bark);
}
function palm(x,z,h=3.6){
 const spinePoints=[[x,.32,z],[x-.12,h*.36,z],[x+.13,h*.78,z+.06],[x+.24,h,z+.06]],spine=new THREE.CatmullRomCurve3(spinePoints.map(p=>new THREE.Vector3(...p)));
 contact(x,z,2.3,2.3,.35);b.tube(spinePoints,.11,M.bark,26,10);
 for(let j=0;j<28;j++){const t=(j+.7)/29,p=spine.getPoint(t),direction=spine.getTangent(t);const ring=new THREE.TorusGeometry(.109,.010,4,12);ring.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),direction));ring.translate(p.x,p.y,p.z);b.unique(ring,M.bark);}
 for(let i=0;i<12;i++){leafAt(palmG,M.palm,x+.24,h,z+.06,rr(.93,1.32),rr(.85,1.12),i*2.4,rr(-.4,.25),pick(['#80a053','#a0b86c','#769447']));}
}
banana(-.55,4.45,2.75,.93);banana(.67,.95,3.35,1.03);banana(-.45,-4.85,2.65,.83);
palm(-.35,-2.6,3.7);palm(.75,-5.8,3.6);
for(let a of [[.8,5.25,1,.77],[-.9,2.45,1.2,.93],[1.0,2.9,.85,.75],[-.9,-.3,1.0,.82],[.8,-1.8,1.3,.8],[-.8,-3.6,.9,.75],[.6,-4.1,.7,.75]])monstera(...a);
for(let i=0;i<31;i++){let x=(i%2?-1:1)*rr(.85,1.43),z=-6.35+i*.40;fern(x,z,rr(.45,.73));}
for(let i=0;i<5;i++)fern(-3.80+rr(-.05,.15),-5.6+i*.40,rr(.3,.48),.04);
for(let s of [-1,1])for(let j=0;j<6;j++)fern(s*rr(3.1,3.9),9.7+j*.42,rr(.38,.62),.075);
for(let j=0;j<9;j++)fern(-2.1+j*.52,12.77,rr(.35,.52),.17);
for(let s of [-1,1]){for(let j=0;j<3;j++){let x=s*(1.6+j*.8);b.tube([[x,.1,12.58],[x-.10,.8,12.55],[x+.12,1.5,12.55],[x,2.4,12.55]],.013,M.bark,28,5);for(let k=0;k<15;k++)leafAt(smallLeaf,M.monstera,x,.25+k*.15,12.53,rr(.19,.32),rr(.15,.22),s*(1.4+k*2.4),rr(-.9,.5),'#96af70');}}
for(let i=0;i<9;i++){let x=(i%2?-1:1)*1.37,z=-5.8+i*1.25,points=[[x,.34,z],[x+.01,.5,z],[x,.68,z]];for(let j=0;j<16;j++){let t=j/15,a=t*Math.PI*2,r=.065*(1-t*.6);points.push([x+Math.sin(a)*r,.68+Math.cos(a)*r,z]);}b.tube(points,.008,M.palm,27,5);}
// Low rosettes with lance shaped leaves and occasional red bromeliad bracts.
for(let i=0;i<24;i++){
 let x=rr(-1.25,1.25),z=rr(-6.45,5.9);for(let j=0;j<8;j++)leafAt(smallLeaf,i%4===0?M.dead:M.leaf,x,.35,z,rr(.28,.58),rr(.10,.20),j*2.4,rr(-.8,-.2),i%4===0?'#be8e51':pick(['#799d59','#a3b174','#5c7846']));
}
// Fallen leaves, woody litter and roots remain visible beneath the canopy.
for(let i=0;i<72;i++){let x=rr(-1.4,1.4),z=rr(-6.55,6);leafAt(smallLeaf,M.dead,x,.356,z,rr(.12,.38),rr(.09,.2),rr(0,6.3),.03,pick(['#907446','#a18451','#6d6536']));}
for(let i=0;i<22;i++){let x=rr(-1.3,1.3),z=rr(-6.6,5.8);b.tube([[x,.36,z],[x+.2,.39,z+.19],[x+rr(.25,.5),.35,z+.4]],rr(.015,.025),M.bark,8,5);}

// Climbing vines wind around the outer posts; the aisle itself stays clear.
for(let side of [-1,1])for(let z0 of [-7.05,-2.45,4.45]){
 const x=side*4.20;let pts=[];for(let i=0;i<18;i++)pts.push([x+Math.sin(i*.9)*.12,.5+i*.195,z0+Math.cos(i*.9)*.11]);b.tube(pts,.014,M.bark,42,5);const vine=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p)));
 for(let i=0;i<23;i++){let t=(.05+i*.13)/(17*.195),a=i*2.4,anchor=vine.getPoint(t),tip=anchor.clone().add(new THREE.Vector3(Math.sin(a)*.065,.01,Math.cos(a)*.065));beam(anchor.toArray(),tip.toArray(),.004,M.palm);leafAt(smallLeaf,M.monstera,tip.x,tip.y,tip.z,rr(.21,.4),rr(.2,.31),a,rr(-.6,.7),pick(['#84a65a','#658941','#9cad6a']));}
 for(let i=0;i<8;i++)mossPatch(x+rr(-.09,.09),.6,z0+rr(-.2,.2),rr(.05,.12),rr(.05,.14));
}
for(let side of [-1,1]){let z=side===1?3.55:-3.7,pts=[[side*1.2,.38,z],[side*1.7,.34,z+.15],[side*1.91,.055,z+.22],[side*2.22,.05,z+.62]];b.tube(pts,.013,M.bark,22,5);for(let j=0;j<8;j++){let t=j/7,p=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p))).getPoint(t);leafAt(smallLeaf,M.monstera,p.x,p.y+.015,p.z,.22,.17,j*2.4,-.1,'#90a866');}}
// Growth now threads the collar ties, with stray aerial roots above head height.
for(let spec of [[-4.15,-4.8,3.2],[-4.1,2.2,3.25],[4.1,-.3,3.25]]){
 let [x,z,y]=spec;let pts=[];for(let j=0;j<21;j++){let t=j/20;pts.push([x*(1-t*.5),y+.16*Math.sin(t*8),z+.20*Math.sin(t*13)]);}b.tube(pts,.019,M.bark,40,5);
 for(let j=0;j<22;j++){let t=j/22;leafAt(smallLeaf,M.monstera,x*(1-t*.5),y+.16*Math.sin(t*8),z+.2*Math.sin(t*13),rr(.24,.46),rr(.18,.31),j*2.4,rr(-.3,.8),pick(['#a0b97b','#779956','#9ab16b']));}
 for(let j=0;j<4;j++){let t=.2+j*.16,xx=x*(1-t*.5);b.tube([[xx,y,z],[xx+.04,y-.3,z+.02],[xx+.03,y-.55,z+.07]],.004,M.bark,10,4);}
}
// A pair of hanging baskets, high enough to walk beneath.
function basket(x,z,y){pot(x,z,.25,y-.2,M.dark);for(let a of [0,2.094,4.188])beam([x+Math.sin(a)*.24,y,z+Math.cos(a)*.24],[x,y+.85,z],.009,M.rust);beam([x,y+.85,z],[x,4.55,z],.014,M.rust);fern(x,z,.54,y);for(let k=0;k<4;k++){let a=k*1.8;let xx=x+Math.sin(a)*.2,zz=z+Math.cos(a)*.2;b.tube([[xx,y,zz],[xx+.1,y-.35,zz+.1],[xx+.08,y-.65,zz+.15]],.009,M.palm,12,4);for(let j=0;j<5;j++)leafAt(smallLeaf,M.fern,xx+.08,y-j*.12,zz+.1,.2,.13,a+j*2,.35,'#a1b96c');}}

// Hollow terracotta pots have lips, inner walls and visible soil.
const potGeometries=new Map(),potColliders=[];function pot(x,z,r=.3,y=0,material=M.clay){
 if(!potGeometries.has('pot')){const pts=[[.58,0],[.61,.08],[.91,1.11],[1.03,1.12],[1.03,1.26],[.83,1.26],[.81,1.1],[.55,.14],[.52,.11]].map(a=>new THREE.Vector2(...a));potGeometries.set('pot',new THREE.LatheGeometry(pts,24));}
 b.mesh(potGeometries.get('pot'),material,[x,y,z],[0,rr(0,6.3),0],[r,r,r]);b.mesh(cylG,M.soil,[x,y+r*(r<.23?.16:.99),z],[0,0,0],[r*(r<.23?.51:.82),.02,r*(r<.23?.51:.82)]);if(y<.02){contact(x,z,r*2.8,r*2.8,y+.005);potColliders.push({x,z,r:r*.9});}return y+r*1.26;
}
basket(-2.95,-4.65,2.72);basket(3.08,2.75,2.82);
// Pots along the margins offer a different collection on each side.
for(let [x,z,r] of [[-3.83,6.5,.42],[-3.85,2.6,.34],[-3.82,-1.1,.28],[3.84,5.25,.33],[3.81,-.25,.42],[3.83,-5.8,.37]]){
 let y=pot(x,z,r);fern(x,z,r*1.8,y-.02);if(r>.4){for(let j=0;j<5;j++)leafAt(leaves[0],M.leaf,x,y+.2,z,.75,.22,j*2.4,-.75,'#7a965b');}
}
// Potting alcove across the back: weathered timber bench and lower shelf.
for(let x of [-1.0,2.1])for(let z of [-8.96,-8.21])box(x,.48,z,.085,.96,.09,M.wood);
for(let i=0;i<5;i++){box(.55,1.0,-8.99+i*.2,3.45,.095,.18,M.wood,0,pick(['#c1ae89','#b29d79','#a9997c']));box(.55,.28,-8.99+i*.2,3.27,.064,.18,M.wood);}
for(let z of [-9.04,-8.11])box(.55,.89,z,3.48,.18,.07,M.wood);box(.55,.30,-8.96,3.48,.12,.06,M.wood);
for(let x of [-1.04,2.11])for(let z of [-8.91,-8.31])b.mesh(cylG,M.rust,[x,1.055,z],[0,0,0],[.013,.004,.013]);
box(-2.74,.43,-8.5,.94,.86,.75,M.wood);for(let y of [.08,.34,.62,.82])box(-2.74,y,-8.09,1.0,.15,.025,M.wood);for(let x of [-3.15,-2.33])box(x,.46,-8.05,.08,.85,.06,M.dark);
for(let a of [[-.66,-8.62,.21,1.055],[.1,-8.75,.15,1.055],[1.42,-8.6,.26,1.055],[1.93,-8.87,.13,1.055],[-.65,-8.52,.22,.33],[.26,-8.59,.17,.33],[1.1,-8.55,.21,.33],[2.62,-8.6,.33,0],[-2.75,-8.5,.24,.88]])pot(...a);
fern(1.42,-8.6,.48,1.37);fern(-2.75,-8.5,.51,1.18);
// A young fan palm occupies the shaded corner of the potting alcove.
pot(3.58,-8.72,.38);for(let j=0;j<7;j++){let a=j*2.4,h=rr(.9,1.65),tip=[3.58+Math.sin(a)*.23,h,-8.72+Math.cos(a)*.23];b.tube([[3.58,.43,-8.72],[3.58,h*.65,-8.72],tip],.015,M.palm,12,5);leafAt(fanG,M.palm,...tip,rr(.5,.72),rr(.45,.65),a,rr(-.65,-.12),pick(['#8ca96a','#aab77d','#719455']));}
// Seed trays, loose compost, labels, a hand fork and trowel.
box(.49,1.08,-8.4,.56,.06,.42,M.dark);box(.49,1.115,-8.4,.48,.023,.34,M.soil);
for(let i=0;i<5;i++)for(let j=0;j<3;j++){let x=.29+i*.10,z=-8.54+j*.1;leafAt(smallLeaf,M.fern,x,1.14,z,.09,.055,i*2.2,-.8,'#b5c774');}
for(let i=0;i<26;i++)sphere(rr(.78,1.1),1.06,rr(-8.85,-8.4),rr(.01,.025),rr(.005,.012),rr(.01,.025),M.soil);
beam([-.20,1.09,-8.3],[-.47,1.09,-8.40],.025,M.wood);beam([-.19,1.09,-8.3],[-.02,1.09,-8.24],.012,M.dark);b.mesh(sphereG,M.dark,[.04,1.08,-8.20],[0,.6,0],[.11,.016,.055]);
beam([1.70,1.09,-8.36],[1.95,1.09,-8.27],.025,M.wood);for(let j=0;j<3;j++)beam([1.70,1.08,-8.36+j*.026],[1.56,1.08,-8.40+j*.026],.009,M.dark);
// Watering can: spout, rolled lip, open handle and sprinkler rose.
let canY=.38; b.mesh(cylG,M.glaze,[-1.65,canY,-8.55],[0,0,0],[.28,.58,.24]);b.mesh(ringG,M.dark,[-1.65,.68,-8.55],[Math.PI/2,0,0],[.24,.24,.24]);beam([-1.48,.33,-8.5],[-.96,.74,-8.42],.044,M.glaze);sphere(-.95,.76,-8.42,.11,.055,.1,M.dark);b.tube([[-1.85,.6,-8.55],[-2.10,.64,-8.55],[-2.11,.27,-8.55],[-1.85,.19,-8.55]],.026,M.dark,22,7);
// An old hose follows the wall and coils beside a brass tap.
const hosePts=[];for(let i=0;i<110;i++){const t=i/109,a=t*Math.PI*6,r=.57-t*.17;hosePts.push([3.48+Math.cos(a)*r,.046+t*.011,-7.9+Math.sin(a)*r]);}b.tube(hosePts,.029,M.hose,150,7);b.tube([[4.19,.83,-6.75],[4.14,.22,-6.75],[3.97,.05,-7.0],[3.81,.048,-7.5]],.029,M.hose,30,7);beam([4.37,.86,-6.75],[4.12,.86,-6.75],.031,M.brass);beam([4.20,.85,-6.75],[4.20,.98,-6.75],.025,M.brass);beam([4.11,1,-6.75],[4.29,1,-6.75],.018,M.brass);
// Stencilled botanical labels and the house plaque.
function sign(title,sub,num,x,y,z,ry=0,scale=.31){const tex=T.labelTexture(title,sub,num);let mm=mat('#ffffff',tex,.88);b.mesh(planeG,mm,[x,y,z],[-.25,ry,0],[scale,scale*.74,1]);box(x,y-.20,z,.014,.4,.018,M.dark,ry);}
sign('Musa|acuminata','BANANA  ·  S.E. ASIA','COLLECTION  /  014',-1.52,.80,4.95,-Math.PI/2,.37);
sign('Monstera|deliciosa','TROPICAL AMERICAS','COLLECTION  /  027',1.55,.76,2.8,Math.PI/2,.37);
sign('Nephrolepis','SWORD FERN','COLLECTION  /  032',1.56,.62,-4.9,Math.PI/2,.35);
sign('Chamaedorea','UNDERSTOREY PALM','COLLECTION  /  009',-1.55,.70,-2.8,-Math.PI/2,.36);
const plaque=mat('#ffffff',T.labelTexture('THE FERN|HOUSE','TROPICAL COLLECTION','EST. 1908'),.8);b.mesh(planeG,plaque,[0,3.78,9.08],[0,0,0],[1.10,.70,1]);box(0,3.78,9.055,1.14,.74,.032,M.dark);
const rear=mat('#ffffff',T.labelTexture('Propagation','KEEP SHADED & MOIST','LAST TENDED  /  1986'),.9);b.mesh(planeG,rear,[-2.78,2.03,-9.24],[0,0,0],[.7,.59,1]);
// Drain grates, fallen shards at the edges, mineral stains and damp patches.
for(let z of [-5,1.5,6.8])for(let x of [-2.9,2.9]){box(x,.036,z,.38,.008,.54,M.dark);for(let i=0;i<7;i++)box(x-.155+i*.052,.043,z,.018,.013,.48,M.iron);}
for(let i=0;i<90;i++){let x=(i%2?-1:1)*rr(3.95,4.23),z=rr(-9,8.8);mossPatch(x,.043,z,rr(.05,.19),rr(.09,.35));}
for(let i=0;i<16;i++){let x=rr(-4.23,-3.9),z=rr(-3.1,-1.9);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([x,.049,z,x+rr(.06,.15),.05,z+.03,x+.04,.05,z+rr(.04,.18)],3));g.computeVertexNormals();g.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,1,0,0,1],2));b.unique(g,M.glassCloud);}
// Small damp areas reflect softly rather than looking like polished stone.
for(let p of [[-3.55,5.5,.43,.65],[3.2,-7.1,.55,.29],[-2.7,-6.9,.30,.21]]){let [x,z,sx,sz]=p;b.mesh(sphereG,M.water,[x,.031,z],[0,.4,0],[sx,.009,sz]);}
// Moss creeps over the lip, through mortar, and beneath the rain gutters.
for(let i=0;i<160;i++){let s=i%2?-1:1,z=rr(-6.7,6.1);if(i%3===0)mossPatch(s*1.65,.342,z,rr(.035,.11),rr(.06,.24));else b.mesh(planeG,M.moss,[s*1.768,rr(.06,.27),z],[0,Math.PI/2,rr(-.2,.2)],[rr(.12,.36),rr(.07,.21),1],'#b6bf82');}
for(let s of [-1,1])for(let i=0;i<50;i++){let z=rr(-9,8.7);b.mesh(planeG,M.moss,[s*4.263,rr(.16,.48),z],[0,Math.PI/2,0],[rr(.25,.8),rr(.12,.28),1],'#98af73');}
// A glazed ventilator remains propped open above the palm canopy.
const hatch=[[-1.10,4.68,-7.0],[-2.19,4.96,-7.0],[-2.19,4.96,-4.8],[-1.10,4.68,-4.8]];for(let i=0;i<4;i++)beam(hatch[i],hatch[(i+1)%4],.031);beam([-2.19,4.24,-5.0],[-2.19,4.96,-5.0],.012,M.rust);b.mesh(planeG,M.glass,[-1.645,4.82,-5.9],[-Math.PI/2,.25,0],[1.12,2.17,1]);
b.finish();

// Ground-bound capsule movement with sliding collision against major objects.
const colliders=[{minX:-1.80,maxX:1.80,minZ:-6.98,maxZ:6.38},{minX:-1.26,maxX:2.34,minZ:-9.19,maxZ:-7.96},{minX:-3.32,maxX:-2.15,minZ:-9.02,maxZ:-7.93},{minX:2.17,maxX:3.08,minZ:-9.05,maxZ:-8.2}];
const radius=.23;const keys=new Set();let yaw=0,pitch=-.015,velocity=new THREE.Vector3(),walkingTime=0,eye=1.66,drag=false,started=false,lastTime=performance.now(),statsOn=false;
const position=new THREE.Vector3(0,1.66,11.15);
function valid(x,z){
 if(z>12.18||z<-9.08)return false;
 if(z>9.12){if(Math.abs(x)>2.25)return false;}else if(Math.abs(x)>4.05)return false;
 if(z>8.71&&z<9.38&&Math.abs(x)> .86)return false;
 for(const c of colliders)if(x>c.minX-radius&&x<c.maxX+radius&&z>c.minZ-radius&&z<c.maxZ+radius)return false;
 for(const c of potColliders)if(Math.hypot(x-c.x,z-c.z)<c.r+radius)return false;
 return true;
}
function move(dx,dz){let n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.07));for(let i=0;i<n;i++){if(valid(position.x+dx/n,position.z))position.x+=dx/n;if(valid(position.x,position.z+dz/n))position.z+=dz/n;}}
function reset(){position.set(0,1.66,11.15);yaw=0;pitch=-.015;velocity.set(0,0,0);keys.clear();eye=1.66;}
function look(dx,dy){yaw-=dx*.0021;pitch=THREE.MathUtils.clamp(pitch-dy*.0021,-1.45,1.45);}
async function capture(){started=true;document.querySelector('#welcome').hidden=true;try{await canvas.requestPointerLock();}catch{document.querySelector('#helpPanel').hidden=false;}}
document.querySelector('#enter').onclick=capture;canvas.addEventListener('click',()=>{if(!drag&&document.pointerLockElement!==canvas)capture();});
document.addEventListener('pointerlockchange',()=>{let locked=document.pointerLockElement===canvas;document.body.classList.toggle('exploring',locked);document.querySelector('#crosshair').hidden=!locked;keys.clear();});
document.addEventListener('mousemove',e=>{if(document.pointerLockElement===canvas||drag)look(e.movementX,e.movementY);});
canvas.addEventListener('mousedown',e=>{if(e.button===0&&document.pointerLockElement!==canvas)drag=true;});document.addEventListener('mouseup',()=>{drag=false;});
document.addEventListener('keydown',e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();keys.add(e.code);if(e.code==='KeyR')reset();if(e.code==='KeyF'&&!e.repeat)toggleStats();if(e.code==='Escape'){keys.clear();if(document.pointerLockElement)document.exitPointerLock();}});document.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>{keys.clear();velocity.set(0,0,0);});document.addEventListener('visibilitychange',()=>{keys.clear();lastTime=performance.now();});
document.querySelector('#reset').onclick=reset;document.querySelector('#help').onclick=()=>document.querySelector('#helpPanel').hidden=!document.querySelector('#helpPanel').hidden;
let quality=1;const qualityNames=['Balanced','High','Ultra'];function setQuality(q){quality=q;renderer.setPixelRatio(Math.min(devicePixelRatio,[1,1.5,2][q]));sun.shadow.mapSize.set(q===0?2048:4096,q===0?2048:4096);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null;}renderer.shadowMap.needsUpdate=true;document.querySelector('#quality').textContent='Quality: '+qualityNames[q];}
document.querySelector('#quality').onclick=()=>setQuality((quality+1)%3);
function toggleStats(){statsOn=!statsOn;document.querySelector('#stats').hidden=!statsOn;}document.querySelector('#statsToggle').onclick=toggleStats;
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
const frames=[];let lastStats=0;let totalFrames=0;
function animate(now){requestAnimationFrame(animate);const elapsed=now-lastTime;lastTime=now;const dt=Math.min(elapsed/1000,.05);if(elapsed>0&&!document.hidden){frames.push(elapsed);if(frames.length>900)frames.shift();}
 const forward=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0),strafe=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);
 const crouched=keys.has('KeyC'),speed=crouched?1.15:keys.has('ShiftLeft')||keys.has('ShiftRight')?3.3:2.05;
 const dir=new THREE.Vector3(strafe,0,-forward);if(dir.lengthSq()>0)dir.normalize().applyAxisAngle(new THREE.Vector3(0,1,0),yaw).multiplyScalar(speed);
 velocity.lerp(dir,1-Math.exp(-dt*13));move(velocity.x*dt,velocity.z*dt);eye=THREE.MathUtils.lerp(eye,crouched?1.05:1.66,1-Math.exp(-dt*10));walkingTime+=dt*velocity.length();
 camera.position.set(position.x,eye+Math.sin(walkingTime*8)*.009*Math.min(velocity.length(),1),position.z);camera.rotation.set(pitch,yaw,0);
 renderer.render(scene,camera);if(totalFrames++===1){renderer.shadowMap.autoUpdate=false;document.querySelector('#loading').hidden=true;document.querySelector('#welcome').hidden=false;}
 if(now-lastStats>400){lastStats=now;document.querySelector('#location').textContent=position.z>8?'01  THE THRESHOLD':position.z<-7?'03  POTTING ALCOVE':position.x<0?'02  THE FERN AISLE':'04  THE PALM AISLE';if(statsOn){let a=frames.slice(-300).sort((a,b)=>a-b),mean=a.reduce((a,b)=>a+b,0)/a.length;document.querySelector('#stats').textContent=`LIVE RENDER TIMING\n${(1000/mean).toFixed(1)} fps · mean ${mean.toFixed(1)} ms\nP95 ${a[Math.floor(a.length*.95)]?.toFixed(1)} ms · ${a.length} frames\nMax ${a.at(-1)?.toFixed(1)} ms · ${a.filter(v=>v>50).length} frames over 50 ms\n${renderer.info.render.calls} draw calls · ${(renderer.info.render.triangles/1000).toFixed(0)}k triangles\n${renderer.domElement.width} × ${renderer.domElement.height}\n${qualityNames[quality]} · cached static shadows\nPosition ${position.x.toFixed(2)}, ${position.z.toFixed(2)}`;}}
}
// Read-only telemetry plus deterministic movement hooks for repeatable local checks.
window.greenhouse={ready:true,getState:()=>({position:{x:position.x,y:eye,z:position.z},yaw,pitch,valid:valid(position.x,position.z),frames:frames.slice(),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,quality:qualityNames[quality],objects:scene.children.length}),reset,valid,clearFrames:()=>{frames.length=0;},setPose:(x,z,yawValue=0,pitchValue=0)=>{if(!valid(x,z))throw new Error('Pose intersects a wall or planting bed');position.x=x;position.z=z;yaw=yawValue;pitch=pitchValue;velocity.set(0,0,0);},step:move,setQuality};
reset();requestAnimationFrame(animate);
