import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const $=s=>document.querySelector(s), TAU=Math.PI*2;
let seed=72891;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
const scene=new THREE.Scene();
scene.background=new THREE.Color('#c6c9bb');
scene.fog=new THREE.FogExp2('#c6bd9e',.0053);
const renderer=new THREE.WebGLRenderer({canvas:$('#scene'),antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));renderer.setSize(innerWidth,innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.16;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const camera=new THREE.PerspectiveCamera(68,innerWidth/innerHeight,.065,600);camera.rotation.order='YXZ';
const batches=new Map(),colliders=[];
const textureStats={};
function texture(kind,colors,size=512){
  const c=document.createElement('canvas');c.width=c.height=size;const ctx=c.getContext('2d');
  const img=ctx.createImageData(size,size),base=new THREE.Color(colors[0]);
  // Color values are composed in display space on purpose: these become sRGB textures.
  const rgb=[parseInt(colors[0].slice(1,3),16),parseInt(colors[0].slice(3,5),16),parseInt(colors[0].slice(5,7),16)];
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const n=(rand()-.5),cloud=Math.sin(x*.033+Math.sin(y*.02)*2)*Math.sin(y*.028)+Math.sin(x*.095+y*.076)*.2;
    let shade=n*(kind==='bronze'?16:14)+cloud*(kind==='bronze'?12:4);
    if(rand()<.008)shade-=25;const i=(y*size+x)*4;
    img.data[i]=rgb[0]+shade;img.data[i+1]=rgb[1]+shade;img.data[i+2]=rgb[2]+shade;img.data[i+3]=255;
  }ctx.putImageData(img,0,0);
  for(let i=0;i<(kind==='bronze'?360:170);i++){
    const x=rand()*size,y=rand()*size,r=rand()*(kind==='bronze'?27:9)+1;
    ctx.fillStyle=colors[1]+(kind==='bronze'?'2b':'16');ctx.beginPath();ctx.ellipse(x,y,r,r*(.25+rand()),rand()*TAU,0,TAU);ctx.fill();
  }
  if(kind==='stone'||kind==='plaster')for(let i=0;i<20;i++){
    let x=rand()*size,y=rand()*size;ctx.beginPath();ctx.moveTo(x,y);for(let j=0;j<4;j++){x+=(rand()-.4)*23;y+=rand()*16;ctx.lineTo(x,y);}ctx.strokeStyle='#4e3c2716';ctx.lineWidth=.6;ctx.stroke();
  }
  if(kind==='bronze')for(let i=0;i<360;i++){ctx.fillStyle='#edd5a520';ctx.fillRect(rand()*size,rand()*size,rand()*25+2,.6);}
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());textureStats[kind]=size;return t;
}
const plasterTex=texture('plaster',['#d6ccba','#f1e9d6']),stoneTex=texture('stone',['#b7a48a','#756b58']);
const bronzeTex=texture('bronze',['#7b6441','#397b70']),sandTex=texture('sand',['#c6a375','#edc28a']);
const patinaTex=texture('bronze',['#577a6b','#b89554']);
// Precomputed normals retain fine relief with one texture fetch, avoiding
// repeated height samples on the large plaster and paving surfaces.
function normalFrom(t,strength=3){
  const src=t.image,c=document.createElement('canvas');c.width=src.width;c.height=src.height;const cx=c.getContext('2d'),data=src.getContext('2d').getImageData(0,0,c.width,c.height).data,out=cx.createImageData(c.width,c.height);
  const h=(x,y)=>data[(((y+c.height)%c.height)*c.width+(x+c.width)%c.width)*4]/255;
  for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){let dx=(h(x-1,y)-h(x+1,y))*strength,dy=(h(x,y-1)-h(x,y+1))*strength,l=Math.hypot(dx,dy,1),i=(y*c.width+x)*4;out.data[i]=(dx/l*.5+.5)*255;out.data[i+1]=(dy/l*.5+.5)*255;out.data[i+2]=(1/l*.5+.5)*255;out.data[i+3]=255;}
  cx.putImageData(out,0,0);const n=new THREE.CanvasTexture(c);n.wrapS=n.wrapT=THREE.RepeatWrapping;n.anisotropy=t.anisotropy;return n;
}
const plasterNormal=normalFrom(plasterTex,2),stoneNormal=normalFrom(stoneTex,2.5),sandNormal=normalFrom(sandTex,1.8);
const mats={
 plaster:new THREE.MeshStandardMaterial({color:'#fff5dc',map:plasterTex,bumpMap:plasterTex,bumpScale:.021,roughness:.93}),
 shadePlaster:new THREE.MeshStandardMaterial({color:'#c6c5b0',map:plasterTex,bumpMap:plasterTex,bumpScale:.025,roughness:.95}),
 stone:new THREE.MeshStandardMaterial({color:'#ecdfc8',map:stoneTex,bumpMap:stoneTex,bumpScale:.018,roughness:.88}),
 stoneLight:new THREE.MeshStandardMaterial({color:'#f4e8d4',map:stoneTex,bumpMap:stoneTex,bumpScale:.021,roughness:.9}),
 stoneDark:new THREE.MeshStandardMaterial({color:'#9a876c',map:stoneTex,bumpMap:stoneTex,bumpScale:.05,roughness:1}),
 bronze:new THREE.MeshStandardMaterial({map:bronzeTex,color:'#d6bd8b',metalness:.77,roughness:.51,bumpMap:bronzeTex,bumpScale:.005}),
 edge:new THREE.MeshStandardMaterial({color:'#bc9a58',metalness:.78,roughness:.33}),
 patina:new THREE.MeshStandardMaterial({color:'#c6d8c8',map:patinaTex,metalness:.58,roughness:.59,bumpMap:patinaTex,bumpScale:.004}),
 iron:new THREE.MeshStandardMaterial({color:'#393d37',metalness:.72,roughness:.51}),
 dark:new THREE.MeshStandardMaterial({color:'#202a29',roughness:.83}),
 glass:new THREE.MeshStandardMaterial({color:'#244755',metalness:.65,roughness:.12}),
 tile:new THREE.MeshStandardMaterial({color:'#247e87',roughness:.23,metalness:.1,bumpMap:plasterTex,bumpScale:.012}),
 tileDark:new THREE.MeshStandardMaterial({color:'#234c66',roughness:.26,metalness:.1}),
 sand:new THREE.MeshStandardMaterial({map:sandTex,color:'#efd1a1',bumpMap:sandTex,bumpScale:.02,roughness:1}),
 mortar:new THREE.MeshStandardMaterial({color:'#8f816a',roughness:1}),
 wood:new THREE.MeshStandardMaterial({color:'#6c5740',map:stoneTex,roughness:.82}),
 paper:new THREE.MeshStandardMaterial({color:'#d5bd87',roughness:.98}),
 rust:new THREE.MeshStandardMaterial({color:'#64583f',roughness:.8,metalness:.3})
};
mats.clay=new THREE.MeshStandardMaterial({color:'#a37858',map:plasterTex,roughness:.9,bumpMap:plasterTex,bumpScale:.016});
mats.drift=new THREE.MeshStandardMaterial({color:'#ede2cb',map:sandTex,bumpMap:sandTex,bumpScale:.012,roughness:1});
for(const m of [mats.plaster,mats.shadePlaster,mats.stone,mats.stoneLight,mats.stoneDark,mats.clay,mats.tile,mats.sand,mats.drift]){
  m.normalMap=m.map===stoneTex?stoneNormal:m.map===sandTex?sandNormal:plasterNormal;m.normalScale=new THREE.Vector2(.6,.6);m.bumpMap=null;
}
function mesh(geo,mat,x=0,y=0,z=0,rot=null,scale=null,uv=true,shadow=true){
  const tmp=new THREE.Mesh(geo,mat);tmp.position.set(x,y,z);if(rot)tmp.rotation.set(...rot);if(scale)tmp.scale.set(...scale);tmp.updateMatrix();
  let g=geo.index?geo.toNonIndexed():geo.clone();g.applyMatrix4(tmp.matrix);
  if(uv && mat.map){const p=g.attributes.position,n=g.attributes.normal,u=g.attributes.uv;for(let i=0;i<p.count;i++){const ax=Math.abs(n.getX(i)),ay=Math.abs(n.getY(i)),az=Math.abs(n.getZ(i));if(ay>ax&&ay>az)u.setXY(i,p.getX(i)/2,p.getZ(i)/2);else if(ax>az)u.setXY(i,p.getZ(i)/2,p.getY(i)/2);else u.setXY(i,p.getX(i)/2,p.getY(i)/2);}}
  const key=mat.uuid+(shadow?'s':'n');if(!batches.has(key))batches.set(key,{mat,shadow,geos:[]});batches.get(key).geos.push(g);return tmp;
}
const slabCache=new Map();
function box(w,h,d,m,x,y,z,rot=null){
  let g;
  if((m===mats.stone||m===mats.stoneLight)&&h<.25&&w>.3&&d>.3){
    const key=[w,h,d].join(',');g=slabCache.get(key);
    if(!g){const s=new THREE.Shape(),bevel=Math.min(.014,h*.16),a=w/2-bevel,b=d/2-bevel;s.moveTo(-a,-b);s.lineTo(a,-b);s.lineTo(a,b);s.lineTo(-a,b);s.closePath();g=new THREE.ExtrudeGeometry(s,{depth:h-2*bevel,bevelEnabled:true,bevelSegments:1,bevelSize:bevel,bevelThickness:bevel,steps:1});g.rotateX(-Math.PI/2);g.translate(0,-h/2+bevel,0);slabCache.set(key,g);}
  }else g=new THREE.BoxGeometry(w,h,d,1,(m===mats.plaster&&d>3)?6:1,(m===mats.plaster&&d>3)?16:1);
  return mesh(g,m,x,y,z,rot);
}
const cyl=(rt,rb,h,m,x,y,z,segments=48,rot=null)=>{const g=new THREE.CylinderGeometry(rt,rb,h,segments),u=g.attributes.uv,n=g.attributes.normal;for(let i=0;i<u.count;i++)if(Math.abs(n.getY(i))<.9)u.setXY(i,u.getX(i)*Math.PI*(rt+rb)/2,u.getY(i)*h/2);return mesh(g,m,x,y,z,rot,null,false);};
const sphere=(r,m,x,y,z,scale=null)=>mesh(new THREE.SphereGeometry(r,r<.04?10:20,r<.04?6:12),m,x,y,z,null,scale);
function rod(a,b,r,m,r2=r,segments=16){const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),d=bv.clone().sub(av);const g=new THREE.CylinderGeometry(r2,r,d.length(),segments);g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize()));mesh(g,m,...av.add(bv).multiplyScalar(.5).toArray(),null,null,false);}
function torus(r,t,m,x,y,z,rot=null,arc=TAU){return mesh(new THREE.TorusGeometry(r,t,8,96,arc),m,x,y,z,rot);}
function collider(x,z,w,d){colliders.push({x,z,w,d});}
function arcBlock(ri,ro,lo,hi,a0,a1,m,steps=8){
  const verts=[],uvs=[];const pt=(r,y,a)=>[Math.sin(a)*r,y,Math.cos(a)*r];
  const quad=(a,b,c,d)=>{verts.push(...a,...d,...b,...b,...d,...c);uvs.push(0,0,0,1,1,0,1,0,0,1,1,1);};
  for(let i=0;i<steps;i++){let a=a0+(a1-a0)*i/steps,b=a0+(a1-a0)*(i+1)/steps;
    quad(pt(ro,lo,a),pt(ro,hi,a),pt(ro,hi,b),pt(ro,lo,b));quad(pt(ri,lo,b),pt(ri,hi,b),pt(ri,hi,a),pt(ri,lo,a));
    quad(pt(ri,hi,a),pt(ri,hi,b),pt(ro,hi,b),pt(ro,hi,a));quad(pt(ri,lo,b),pt(ri,lo,a),pt(ro,lo,a),pt(ro,lo,b));}
  quad(pt(ri,lo,a0),pt(ri,hi,a0),pt(ro,hi,a0),pt(ro,lo,a0));quad(pt(ro,lo,a1),pt(ro,hi,a1),pt(ri,hi,a1),pt(ri,lo,a1));
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.computeVertexNormals();mesh(g,m);
}
function arch(z,width,spring,depth,base=.65,material=mats.stoneLight){
  const r=width/2,outer=r+.38;
  const backing=new THREE.Shape();backing.moveTo(r+.006,0);backing.lineTo(outer-.006,0);backing.absarc(0,0,outer-.006,0,Math.PI,false);backing.lineTo(-r-.006,0);backing.absarc(0,0,r+.006,Math.PI,0,true);mesh(new THREE.ExtrudeGeometry(backing,{depth:depth-.035,bevelEnabled:false,curveSegments:32}),mats.mortar,0,spring,z-depth/2+.0175);
  for(const side of [-1,1]){
    box(.36,spring-base,depth-.04,mats.mortar,side*(r+.19),(spring+base)/2,z);
    for(let i=0;i<4;i++)box(.38,(spring-base)/4-.009,depth,material,side*(r+.19),base+(i+.5)*(spring-base)/4,z);
    box(.56,.15,depth+.14,material,side*(r+.19),spring-.05,z);
  }
  for(let j=0;j<15;j++){
    const a=j*Math.PI/15+.007,b=(j+1)*Math.PI/15-.007;const s=new THREE.Shape();s.moveTo(Math.cos(a)*r,Math.sin(a)*r);s.lineTo(Math.cos(a)*outer,Math.sin(a)*outer);s.absarc(0,0,outer,a,b,false);s.lineTo(Math.cos(b)*r,Math.sin(b)*r);s.absarc(0,0,r,b,a,true);const g=new THREE.ExtrudeGeometry(s,{depth,bevelEnabled:false,curveSegments:3});mesh(g,material,0,spring,z-depth/2);
  }
}
function textPlane(text,w,h,x,y,z,rot=[0,0,0],color='#d5bf8d',bg=null){
  const c=document.createElement('canvas');c.width=1024;c.height=Math.round(1024*h/w);const cx=c.getContext('2d');if(bg){cx.fillStyle=bg;cx.fillRect(0,0,c.width,c.height);}cx.fillStyle=color;cx.textAlign='center';cx.textBaseline='middle';cx.font=`${Math.round(c.height*.37)}px Georgia`;cx.fillText(text,c.width/2,c.height/2);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const m=new THREE.MeshStandardMaterial({map:t,transparent:true,roughness:.6,metalness:bg?.5:0,depthWrite:!!bg});mesh(new THREE.PlaneGeometry(w,h),m,x,y,z,rot,null,false,false);
}

// High desert sky and a static image-based reflection environment.
const envCanvas=document.createElement('canvas');envCanvas.width=1024;envCanvas.height=512;const ec=envCanvas.getContext('2d');
const grad=ec.createLinearGradient(0,0,0,512);grad.addColorStop(0,'#6c97aa');grad.addColorStop(.48,'#d3ceb3');grad.addColorStop(.58,'#cfb992');grad.addColorStop(1,'#745941');ec.fillStyle=grad;ec.fillRect(0,0,1024,512);ec.fillStyle='#fff0c9';ec.beginPath();ec.ellipse(190,185,28,24,0,0,TAU);ec.fill();
const et=new THREE.CanvasTexture(envCanvas);et.mapping=THREE.EquirectangularReflectionMapping;et.colorSpace=THREE.SRGBColorSpace;const pmrem=new THREE.PMREMGenerator(renderer);scene.environment=pmrem.fromEquirectangular(et).texture;scene.environmentIntensity=.42;pmrem.dispose();et.dispose();
const sky=new THREE.Mesh(new THREE.SphereGeometry(450,32,20),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{top:{value:new THREE.Color('#699caf')},horizon:{value:new THREE.Color('#e2c8a0')}},vertexShader:'varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'uniform vec3 top;uniform vec3 horizon;varying vec3 vP;void main(){float h=normalize(vP).y;gl_FragColor=vec4(mix(horizon,top,pow(max(h,0.),.55)),1.);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}'}));scene.add(sky);
scene.add(new THREE.HemisphereLight('#c9e0f3','#80654f',.95));
const sun=new THREE.DirectionalLight('#ffe9c7',3.2);sun.position.set(-25,20,-32);sun.target.position.set(0,0,0);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-20,right:20,top:22,bottom:-22,near:1,far:90});sun.shadow.normalBias=.025;sun.shadow.bias=-.00008;sun.shadow.radius=1.1;scene.add(sun,sun.target);
const warmBounce=new THREE.PointLight('#edd0a1',4,12,2);warmBounce.position.set(0,3,1);scene.add(warmBounce);

// The mesa is layered, fractured rock, tapering into a spare desert basin.
mesh(new THREE.PlaneGeometry(1000,1000),mats.sand,0,-7.7,0,[-Math.PI/2,0,0]);
function plateauLayer(radius,y,height,phase,color){
  const N=60,verts=[],uvs=[];const radii=Array.from({length:N},(_,i)=>radius*(.89+.11*Math.cos(i*TAU/N))*(1+Math.sin(i*1.7+phase)*.045+rand()*.035));
  for(let i=0;i<N;i++){let j=(i+1)%N,a=i/N*TAU,b=j/N*TAU;const q=[Math.sin(a)*radii[i],y,Math.cos(a)*radii[i]],r=[Math.sin(b)*radii[j],y,Math.cos(b)*radii[j]],s=[r[0]*1.09,y-height,r[2]*1.09],t=[q[0]*1.09,y-height,q[2]*1.09];verts.push(...q,...t,...r,...r,...t,...s,0,y,0,...q,...r);for(let k=0;k<9;k++)uvs.push(k%3,k/3);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.computeVertexNormals();mesh(g,color);
}
plateauLayer(23,-.34,1.35,0,mats.stone);plateauLayer(24,-1.6,1.9,1,mats.stoneDark);plateauLayer(26,-3.4,2.5,3,mats.stone);plateauLayer(28,-5.7,2.1,2,mats.stoneDark);
// Thin horizontal strata read clearly from the terrace without dense scenery.
for(let i=0;i<65;i++){
  const a=rand()*TAU,r=19+rand()*9,x=Math.sin(a)*r,z=Math.cos(a)*r;
  const edge=.89+.11*Math.cos(a),ground=r<23*edge?-.34:r<24*edge*1.06?-1.7:r<26*edge*1.05?-3.7:r<28*edge*1.06?-6.2:-8.6;
  const g=new THREE.DodecahedronGeometry(1,0);mesh(g,i%3?mats.stone:mats.stoneDark,x,ground-.1,z,[rand()*.3,rand()*TAU,rand()*.2],[.7+rand()*2,.3+rand()*.7,.8+rand()*1.7]);
}
const mesaMats=['#ad9d89','#ac9380','#a69181','#a6a08c'].map(color=>new THREE.MeshStandardMaterial({color,roughness:1,flatShading:true}));
for(let i=0;i<24;i++){
  const a=i/24*TAU,r=135+rand()*140,w=13+rand()*25,h=7+rand()*17,N=19,verts=[],uvs=[];
  const rr=Array.from({length:N},()=>.87+rand()*.19),hh=Array.from({length:N},()=>.92+rand()*.1);
  for(let j=0;j<N;j++){
    const k=(j+1)%N,a0=j*TAU/N,a1=k*TAU/N;
    const point=(idx,ang,layer)=>[Math.sin(ang)*w*rr[idx]*[1.4,.94,.84,.65][layer],[-7.6,-7+h*.4,-7+h*.86,-7+h*hh[idx]][layer],Math.cos(ang)*w*rr[idx]*[1.4,.94,.84,.65][layer]*.68];
    for(let layer=0;layer<3;layer++){let p=point(j,a0,layer),q=point(k,a1,layer),s=point(k,a1,layer+1),t=point(j,a0,layer+1);verts.push(...p,...q,...t,...q,...s,...t);uvs.push(0,0,1,0,0,1,1,0,1,1,0,1);}
    verts.push(0,-7+h*.94,0,...point(j,a0,3),...point(k,a1,3));uvs.push(0,0,0,1,1,1);
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.computeVertexNormals();mesh(g,mesaMats[i%4],Math.sin(a)*r,0,Math.cos(a)*r,[0,rand()*TAU,0],null,true,false);
}
// Broad low dunes break the basin into overlapping pale ridgelines.
const duneGeo=new THREE.PlaneGeometry(620,620,100,100);duneGeo.rotateX(-Math.PI/2);const dp=duneGeo.attributes.position;
for(let i=0;i<dp.count;i++){const x=dp.getX(i),z=dp.getZ(i);dp.setY(i,-7.2+1.8*Math.sin(x*.035+z*.015)+1.3*Math.sin(z*.045-x*.02));}duneGeo.computeVertexNormals();mesh(duneGeo,mats.sand,0,0,0,null,null,true,false);
// Foundation, chamber paving, and connected terrace.
cyl(5.92,6.05,.6,mats.stoneDark,0,.15,0,96);cyl(5.84,5.94,.2,mats.stoneLight,0,.52,0,96);
cyl(5.48,5.48,.12,mats.mortar,0,.59,0,96);
for(let x=-5.2;x<=5.2;x+=.8)for(let z=-5.2;z<=5.2;z+=.8){if(Math.hypot(x,z)<5.05)box(.782,.11,.782,rand()>.4?mats.stoneLight:mats.stone,x,.645,z);}
// A circular dressed-stone rim closes the grid where it meets the thick wall.
for(let i=0;i<80;i++)arcBlock(4.7,5.44,.64,.73,i*TAU/80+.004,(i+1)*TAU/80-.004,mats.stoneLight,1);
for(let i=0;i<104;i++){
  const a=i*TAU/104;box(.155,.016,.155,i%4?mats.tile:mats.tileDark,Math.sin(a)*4.57,.717,Math.cos(a)*4.57,[0,a,0]);
}
// Central compass rose, engraved into pale stone, with a bronze meridian.
cyl(1.65,1.65,.04,mats.stoneLight,0,.718,0,96);torus(1.6,.012,mats.edge,0,.742,0,[Math.PI/2,0,0]);torus(1.35,.008,mats.bronze,0,.745,0,[Math.PI/2,0,0]);
for(let i=0;i<32;i++){const a=i*TAU/32;rod([Math.sin(a)*(i%4?1.48:1.36),.752,Math.cos(a)*(i%4?1.48:1.36)],[Math.sin(a)*1.58,.752,Math.cos(a)*1.58],i%4?.007:.012,mats.bronze,undefined,6);}
box(.025,.007,9.2,mats.bronze,0,.712,0);
for(let x=-6.4;x<6.5;x+=.8)for(let z=-6;z>=-15.1;z-=.9)box(.78,.13,.88,rand()>.6?mats.stone:mats.stoneLight,x,.49,z);
box(13.65,.65,10.2,mats.stoneDark,0,.09,-10.5);box(13.8,.16,10.3,mats.stone,0,.39,-10.5);
// Three shallow stone treads between chamber and terrace.
for(let i=0;i<3;i++)box(3.25,.13,.43,mats.stoneLight,0,.635-i*.065,-5.32-i*.4);
// South passage floor and approach steps.
box(4.3,.7,7.7,mats.stoneDark,0,.23,9);
for(let x=-1.6;x<1.7;x+=.8)for(let z=5.4;z<12.1;z+=.8)box(.78,.13,.78,mats.stoneLight,x,.635,z);
box(4.3,.13,.36,mats.stoneLight,0,.635,12.37);
for(let i=0;i<4;i++)box(4.35+i*.2,.18,.52,mats.stoneLight,0,.53-i*.18,12.8+i*.5);

// Round 68 cm walls, interrupted only by the two deeply recessed doors.
const RIN=4.95,ROUT=5.63,WALLTOP=5.1;
for(let i=0;i<96;i++){
  const a0=i*TAU/96,a1=(i+1)*TAU/96,a=(a0+a1)/2;
  const doorway=Math.abs(Math.sin(a))<.31;
  const vent=[17,31,65,79].some(idx=>i===idx);
  if(vent){arcBlock(RIN,ROUT,.72,3.31,a0,a1,mats.plaster,1);arcBlock(RIN,ROUT,4.11,WALLTOP,a0,a1,mats.plaster,1);arcBlock(4.84,5.73,3.23,3.33,a0-.018,a1+.018,mats.stoneLight,1);}
  else arcBlock(RIN,ROUT,doorway?4.25:.72,WALLTOP,a0,a1,mats.plaster,1);
  if(!doorway){arcBlock(4.91,5.68,.72,1.1,a0,a1,mats.stone,1);arcBlock(4.905,4.965,1.11,1.2,a0+.003,a1-.003,i%4?mats.tile:mats.tileDark,1);}
}
arcBlock(4.88,5.79,4.97,5.17,0,TAU,mats.stoneLight,96);
arcBlock(5.48,5.83,5.18,5.35,0,TAU,mats.plaster,96);
arcBlock(4.91,5.78,5.35,5.48,0,TAU,mats.bronze,96);
arch(5.15,3.02,2.68,1.04);arch(-5.15,3.02,2.68,1.04);
// Squared spandrels above both arches, closing the opening to the drum.
function spandrel(z){const r=1.89,spring=2.68,s=new THREE.Shape();s.moveTo(-r,spring);s.absarc(0,spring,r,Math.PI,0,true);s.lineTo(r,5.12);s.lineTo(-r,5.12);s.closePath();mesh(new THREE.ExtrudeGeometry(s,{depth:.74,bevelEnabled:false,curveSegments:32}),mats.plaster,0,0,z-.37);}
spandrel(5.18);spandrel(-5.18);
// External buttresses carry the dome load down to the foundation.
for(const a of [.78,1.57,2.36,3.92,4.71,5.5]){
  const x=Math.sin(a)*5.61,z=Math.cos(a)*5.61;
  box(.72,3.7,1.03,mats.plaster,x,2.57,z,[0,a,0]);box(.88,.22,1.15,mats.stoneLight,x,.91,z,[0,a,0]);box(.84,.2,1.08,mats.stoneLight,x,4.45,z,[0,a,0]);
}
// Shaded entrance with repeated true arches and timber-supported stone vault.
for(const side of [-1,1]){
  if(side===1)box(.69,3.22,6.76,mats.plaster,side*1.98,2.26,9.08);
  else{
    box(.69,3.22,1.78,mats.plaster,-1.98,2.26,6.59);box(.69,3.22,3.84,mats.plaster,-1.98,2.26,10.54);
    box(.69,1.0,1.14,mats.plaster,-1.98,1.15,8.05);box(.69,1.1,1.14,mats.plaster,-1.98,3.32,8.05);
    box(.13,1.12,1.14,mats.shadePlaster,-2.26,2.21,8.05);
    box(.83,.13,1.37,mats.stoneLight,-1.99,1.65,8.05);box(.76,.18,1.41,mats.stoneLight,-1.98,2.83,8.05);
    for(let zz=7.57;zz<8.55;zz+=.16)box(.025,.1,.145,mats.tile,-1.574,1.65,zz);
  }
  collider(side*1.98,9.08,.69,6.76);
  box(.76,.5,6.85,mats.stone,side*1.98,.98,9.08);
  for(let zz=5.68;zz<12.5;zz+=.23)box(.73,.085,.215,mats.tile,side*1.98,1.26,zz);
}
for(const z of [6.35,9.1,11.95])arch(z,3.26,2.69,.5);
// Barrel-vault skin built with arch sectors running the passage length.
for(let j=0;j<24;j++){
  const a=j*Math.PI/24,b=(j+1)*Math.PI/24,r=1.66,ro=1.96,s=new THREE.Shape();s.moveTo(Math.cos(a)*r,Math.sin(a)*r);s.lineTo(Math.cos(a)*ro,Math.sin(a)*ro);s.absarc(0,0,ro,a,b);s.lineTo(Math.cos(b)*r,Math.sin(b)*r);s.absarc(0,0,r,b,a,true);mesh(new THREE.ExtrudeGeometry(s,{depth:6.95,bevelEnabled:false,curveSegments:2}),mats.plaster,0,2.69,5.65);
}
box(4.75,.18,.56,mats.stoneLight,0,4.7,12.14);
textPlane('S A F F R O N',2.5,.33,0,4.34,12.621,[0,0,0],'#6c6551');
textPlane('OBSERVATORY  ·  XXVII',1.9,.2,0,4.06,12.622,[0,0,0],'#6c6551');
// The drinking jar sits well inside the deep, shaded passage niche.
const jarProfile=[[.07,0],[.13,.02],[.18,.12],[.185,.28],[.14,.41],[.075,.46],[.073,.53],[.088,.55],[.065,.56],[.06,.49]].map(([x,y])=>new THREE.Vector2(x,y));
mesh(new THREE.LatheGeometry(jarProfile,36),mats.clay,-1.95,1.721,8.03);torus(.077,.012,mats.clay,-1.95,2.273,8.03,[Math.PI/2,0,0]);
torus(.11,.026,mats.clay,-1.95,2.032,8.19,[0,Math.PI/2,0],Math.PI*1.6);
cyl(.085,.06,.055,mats.bronze,-1.98,1.759,7.68,32);

// A cut-away masonry dome. The 100-degree northern opening reaches the zenith.
const domeR=5.35,domeH=3.35,domeY=5.49,start=230*Math.PI/180,end=490*Math.PI/180;
function domePanel(a0,a1,material=mats.plaster,offset=0){
  const verts=[],uvs=[];const at=(a,t,inner)=>{const r=domeR+offset-(inner?(offset?.055:.22):0),h=domeH+offset-(inner?(offset?.045:.18):0);return [Math.sin(a)*r*Math.sin(t),domeY+h*Math.cos(t),Math.cos(a)*r*Math.sin(t)];};
  const quad=(a,b,c,d)=>{verts.push(...a,...b,...d,...b,...c,...d);uvs.push(0,0,1,0,0,1,1,0,1,1,0,1);};
  for(let j=0;j<18;j++){const t0=.11+(Math.PI/2-.11)*j/18,t1=.11+(Math.PI/2-.11)*(j+1)/18;
    quad(at(a0,t0,false),at(a0,t1,false),at(a1,t1,false),at(a1,t0,false));quad(at(a1,t0,true),at(a1,t1,true),at(a0,t1,true),at(a0,t0,true));
    for(const a of [a0,a1])quad(at(a,t0,false),at(a,t0,true),at(a,t1,true),at(a,t1,false));
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.computeVertexNormals();mesh(g,material);
}
for(let i=0;i<52;i++)domePanel(start+(end-start)*i/52,start+(end-start)*(i+1)/52);
// Narrow overlapping shutter leaves are parked beside the open observation slit.
for(let j=0;j<4;j++){domePanel(start+j*.043,start+(j+1)*.043,mats.patina,.11);domePanel(end-(j+1)*.043,end-j*.043,mats.patina,.11);}
for(let i=0;i<=13;i++){
  const a=start+(end-start)*i/13;const pts=[];for(let j=0;j<=40;j++){let t=.11+(Math.PI/2-.11)*j/40;pts.push(new THREE.Vector3(Math.sin(a)*5.38*Math.sin(t),domeY+3.38*Math.cos(t),Math.cos(a)*5.38*Math.sin(t)));}
  mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),40,i===0||i===13?.075:.025,6,false),i===0||i===13?mats.bronze:mats.stoneDark);
  if(i===0||i===13){const pts2=pts.map(p=>new THREE.Vector3(p.x*.958,p.y-.12,p.z*.958));mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts2),40,.045,6,false),mats.edge);}
  else if(i%2===1){const rib=pts.map(p=>new THREE.Vector3(p.x*.952,domeY+(p.y-domeY)*.939,p.z*.952));mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rib),40,.045,6,false),mats.shadePlaster);}
}
arcBlock(.57,.82,8.78,8.88,start,end,mats.bronze,52);
// Exposed dome rail, rollers, and radial ties along the open arc.
for(let i=0;i<48;i++){let a=i*TAU/48;box(.085,.11,.2,mats.edge,Math.sin(a)*5.53,5.45,Math.cos(a)*5.53,[0,a,0]);}
for(const a of [2.35,2.73,3.14,3.55,3.94]){cyl(.09,.09,.18,mats.iron,Math.sin(a)*5.22,5.61,Math.cos(a)*5.22,16,[Math.PI/2,0,a]);}
// A mechanical shaft and handwheel connect the dome rail to the chamber wall.
const driveA=2.16,driveX=Math.sin(driveA)*4.77,driveZ=Math.cos(driveA)*4.77;
rod([driveX,2.15,driveZ],[driveX,5.44,driveZ],.035,mats.iron);
for(const y of [2.35,3.6,4.8]){box(.13,.14,.19,mats.bronze,driveX,y,driveZ,[0,driveA,0]);}
torus(.205,.024,mats.bronze,driveX,2.25,driveZ,[0,driveA,0]);
for(let i=0;i<5;i++){const a=i*TAU/5;rod([driveX,2.25,driveZ],[driveX+Math.cos(driveA)*Math.cos(a)*.185,2.25+Math.sin(a)*.185,driveZ-Math.sin(driveA)*Math.cos(a)*.185],.016,mats.bronze);}

// Safe viewing terrace. Thick stone parapets frame rather than obscure the horizon.
for(const side of [-1,1]){
  box(.55,1.05,9.75,mats.plaster,side*6.69,1.01,-10.5);box(.7,.15,9.9,mats.stoneLight,side*6.69,1.57,-10.5);collider(side*6.69,-10.5,.62,10.1);
  box(.035,.13,9.7,mats.tile,side*6.403,1.3,-10.5);
  for(let z=-6.4;z>-15.3;z-=2.1){box(.78,1.19,.76,mats.stone,side*6.69,1.04,z);box(.89,.14,.88,mats.stoneLight,side*6.69,1.69,z);}
}
box(13.65,1.05,.55,mats.plaster,0,1.01,-15.48);box(13.85,.16,.76,mats.stoneLight,0,1.57,-15.48);collider(0,-15.48,13.8,.64);
box(12.8,.12,.03,mats.tile,0,1.31,-15.19);
// End corners and low entry cheeks conceal the raised platform edge.
for(const side of [-1,1]){box(1.75,1.05,.55,mats.plaster,side*5.99,1.01,-5.82);box(1.95,.15,.72,mats.stoneLight,side*5.99,1.57,-5.82);collider(side*5.99,-5.82,1.9,.62);}

// A carefully assembled refracting telescope: stone pier, azimuth bearing,
// fork, trunnions, graduated wheel, counterweight, optical tube and finder.
cyl(.95,1.08,.22,mats.stone,0,.85,0,12);cyl(.79,.88,.2,mats.stoneLight,0,1.05,0,12);
cyl(.53,.65,.8,mats.stoneLight,0,1.53,0,12);cyl(.68,.57,.12,mats.stone,0,1.98,0,24);
cyl(.57,.57,.1,mats.bronze,0,2.07,0);cyl(.47,.5,.13,mats.edge,0,2.17,0);
cyl(.39,.43,.3,mats.patina,0,2.36,0);cyl(.47,.47,.07,mats.edge,0,2.53,0);
for(let i=0;i<64;i++){let a=i*TAU/64;box(.018,.035,i%8===0?.12:.065,mats.dark,Math.sin(a)*.5,2.126,Math.cos(a)*.5,[0,a,0]);}
for(const side of [-1,1]){
  box(.14,.74,.22,mats.bronze,side*.54,2.81,0);box(.18,.09,.28,mats.edge,side*.54,2.47,0);
  cyl(.22,.22,.18,mats.edge,side*.54,3.17,0,48,[0,0,Math.PI/2]);
  cyl(.105,.105,.25,mats.iron,side*.58,3.17,0,32,[0,0,Math.PI/2]);
  cyl(.065,.065,.035,mats.bronze,side*.72,3.17,0,6,[0,0,Math.PI/2]);
}
// Side graduation wheel is truly three dimensional, with spokes and teeth.
torus(.53,.035,mats.bronze,-.7,3.17,0,[0,Math.PI/2,0]);torus(.47,.018,mats.edge,-.722,3.17,0,[0,Math.PI/2,0]);
for(let i=0;i<72;i++){const a=i*TAU/72;box(.05,.024,i%6===0?.095:.045,mats.edge,-.722,3.17+Math.sin(a)*.505,Math.cos(a)*.505,[-a,0,0]);}
for(let i=0;i<6;i++){const a=i*TAU/6;rod([-.71,3.17,0],[-.71,3.17+Math.sin(a)*.47,Math.cos(a)*.47],.026,mats.bronze);}
mesh(new THREE.RingGeometry(.438,.517,96),mats.bronze,-.724,3.17,0,[0,-Math.PI/2,0]);
const scaleCanvas=document.createElement('canvas');scaleCanvas.width=1536;scaleCanvas.height=96;const scaleCtx=scaleCanvas.getContext('2d');scaleCtx.fillStyle='#dfc895';scaleCtx.textAlign='center';scaleCtx.textBaseline='middle';scaleCtx.font='44px Georgia';
for(let i=0;i<12;i++)scaleCtx.fillText(String(i*30),i*128+64,48);
const scaleTexture=new THREE.CanvasTexture(scaleCanvas);scaleTexture.colorSpace=THREE.SRGBColorSpace;const scaleMaterial=new THREE.MeshStandardMaterial({map:scaleTexture,transparent:true,depthWrite:false,roughness:.62});
for(let i=0;i<12;i++){const a=i*TAU/12,g=new THREE.PlaneGeometry(.105,.061),u=g.attributes.uv;for(let j=0;j<u.count;j++)u.setX(j,(u.getX(j)+i)/12);mesh(g,scaleMaterial,-.749,3.17+Math.sin(a)*.478,Math.cos(a)*.478,[0,-Math.PI/2,0],null,false,false);}
const pivot=new THREE.Vector3(0,3.17,0),axis=new THREE.Vector3(.12,.54,-.833).normalize();
function along(t){return pivot.clone().addScaledVector(axis,t);}
function tube(t,len,r1,r2,material){const a=along(t-len/2),b=along(t+len/2);rod(a.toArray(),b.toArray(),r1,material,r2,64);}
tube(.18,2.66,.27,.34,mats.patina);
for(const t of [-1.17,-.8,-.21,.54,1.33,1.53])tube(t,.075,t>1?.366:.3,t>1?.366:.3,mats.bronze);
tube(1.43,.37,.365,.397,mats.bronze);tube(1.624,.02,.351,.351,mats.dark);tube(1.64,.012,.312,.312,mats.glass);
// Thick objective lip and nested optical reflections.
const lensQ=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),axis);
const lensGeometry=new THREE.SphereGeometry(.311,40,14);lensGeometry.scale(1,1,.082);lensGeometry.applyQuaternion(lensQ);mesh(lensGeometry,mats.glass,...along(1.662).toArray(),null,null,false);
for(const [t,r,th,m] of [[1.66,.371,.022,mats.edge],[1.65,.318,.01,mats.edge],[-1.2,.272,.023,mats.edge]]){const g=new THREE.TorusGeometry(r,th,8,64);g.applyQuaternion(lensQ);mesh(g,m,...along(t).toArray());}
tube(-1.39,.35,.14,.17,mats.bronze);tube(-1.63,.18,.07,.10,mats.iron);tube(-1.74,.09,.065,.075,mats.bronze);tube(-1.79,.008,.048,.048,mats.glass);
// Fasteners sit on the tube rings and fork feet.
const sideV=new THREE.Vector3(1,0,0).cross(axis).normalize(),upV=new THREE.Vector3().crossVectors(axis,sideV).normalize();
for(const t of [-.8,.54,1.33])for(let i=0;i<8;i++){let a=i*TAU/8;const p=along(t).addScaledVector(sideV,Math.sin(a)*.325).addScaledVector(upV,Math.cos(a)*.325);sphere(.022,mats.edge,...p.toArray());}
const finderOffset=new THREE.Vector3(.04,.34,.21);for(const t of [-.38,.38]){const p=along(t);rod(p.toArray(),p.clone().add(finderOffset).toArray(),.038,mats.bronze);}
rod(along(-.69).add(finderOffset).toArray(),along(.68).add(finderOffset).toArray(),.062,mats.bronze,.082,32);
rod(along(.682).add(finderOffset).toArray(),along(.695).add(finderOffset).toArray(),.069,mats.dark,.069,32);
rod(along(.696).add(finderOffset).toArray(),along(.7).add(finderOffset).toArray(),.058,mats.glass,.058,32);
rod([.45,2.67,.07],[1.03,2.2,.4],.045,mats.iron);rod([.91,2.3,.33],[1.18,2.07,.49],.17,mats.bronze,.17,32);
// Focus wheel and slow-motion drive.
rod([.25,2.6,.94],[.53,2.6,.94],.035,mats.iron);torus(.145,.022,mats.edge,.55,2.6,.94,[0,Math.PI/2,0]);
for(let i=0;i<5;i++){const a=i*TAU/5;rod([.55,2.6,.94],[.55,2.6+Math.sin(a)*.13,.94+Math.cos(a)*.13],.012,mats.bronze);}
rod([-.67,2.72,.28],[-.93,2.72,.57],.026,mats.edge);sphere(.055,mats.wood,-.96,2.72,.6);
for(let i=0;i<6;i++){const a=i*TAU/6;cyl(.035,.035,.05,mats.bronze,Math.sin(a)*.49,2.155,Math.cos(a)*.49,6);}
box(.63,.18,.035,mats.bronze,0,1.61,.617);textPlane('MERIDIAN  /  No. 07',.59,.14,0,1.61,.637,[0,0,0],'#e0c698');
for(const x of [-.279,.279])sphere(.016,mats.edge,x,1.61,.641);
for(const [letter,a] of [['N',Math.PI],['S',0],['E',Math.PI/2],['W',-Math.PI/2]])textPlane(letter,.17,.18,Math.sin(a)*1.47,.757,Math.cos(a)*1.47,[-Math.PI/2,0,Math.PI-a],'#64563b');

// A recessed study corner, low shelves and purposeful astronomical tools.
box(1.02,.83,.55,mats.wood,-3.67,1.135,-1.85,[0,1.1,0]);
box(1.23,.12,.75,mats.stoneLight,-3.67,1.60,-1.85,[0,1.1,0]);collider(-3.67,-1.85,1.15,1.4);
box(.75,.015,.45,mats.paper,-3.7,1.675,-1.86,[0,1.1,0]);
const deskAngle=1.1;function deskPoint(x,y,z){return[-3.67+Math.cos(deskAngle)*x+Math.sin(deskAngle)*z,y,-1.85-Math.sin(deskAngle)*x+Math.cos(deskAngle)*z];}
for(const y of [1.36,.98]){
  box(.88,.31,.035,mats.wood,...deskPoint(0,y,.294),[0,deskAngle,0]);
  for(const x of [-.34,.34])box(.018,.27,.018,mats.bronze,...deskPoint(x,y,.32),[0,deskAngle,0]);
  sphere(.035,mats.bronze,...deskPoint(0,y,.347));
  for(const sign of [-1,1])box(.86,.018,.018,mats.bronze,...deskPoint(0,y+sign*.135,.32),[0,deskAngle,0]);
}
rod(deskPoint(-.31,1.714,-.245),deskPoint(.30,1.714,-.245),.054,mats.paper,.054,24);
rod(deskPoint(-.315,1.714,-.245),deskPoint(-.32,1.714,-.245),.038,mats.wood,.038,24);
// Inked charts, drawn in canvas, stay sharp under close inspection.
const chart=document.createElement('canvas');chart.width=chart.height=512;const cc=chart.getContext('2d');cc.fillStyle='#d1ba84';cc.fillRect(0,0,512,512);cc.strokeStyle='#655e42';cc.lineWidth=1.4;
for(let i=1;i<5;i++){cc.beginPath();cc.arc(256,256,i*47,0,TAU);cc.stroke();}for(let i=0;i<24;i++){let a=i/24*TAU;cc.beginPath();cc.moveTo(256,256);cc.lineTo(256+Math.cos(a)*195,256+Math.sin(a)*195);cc.stroke();}
for(let i=0;i<42;i++){let x=75+rand()*360,y=75+rand()*360;cc.fillStyle='#3d5b5a';cc.beginPath();cc.arc(x,y,1.3+rand()*2,0,TAU);cc.fill();}cc.font='16px Georgia';cc.fillText('TABULA  COELI',176,34);
const chartT=new THREE.CanvasTexture(chart);chartT.colorSpace=THREE.SRGBColorSpace;mesh(new THREE.PlaneGeometry(.61,.43),new THREE.MeshStandardMaterial({map:chartT,roughness:1}),-3.67,1.686,-1.85,[-Math.PI/2,0,1.1],null,false);
cyl(.085,.11,.2,mats.bronze,-3.34,1.76,-1.8,24);sphere(.075,mats.iron,-3.34,1.88,-1.8);
rod([-4,1.69,-1.82],[-3.73,1.70,-1.58],.011,mats.edge);rod([-4,1.69,-1.82],[-3.77,1.70,-2],.011,mats.edge);
// A small wall-mounted armillary adds a second readable piece of metalwork.
box(.32,.36,.11,mats.wood,4.48,2.68,.5,[0,Math.PI/2,0]);rod([4.41,2.73,.5],[3.99,2.73,.5],.055,mats.bronze);
torus(.36,.018,mats.bronze,3.98,2.85,.5,[0,Math.PI/2,0]);torus(.36,.02,mats.edge,3.98,2.85,.5,[Math.PI/2,0,.5]);torus(.36,.017,mats.bronze,3.98,2.85,.5,[.7,0,0]);sphere(.052,mats.bronze,3.98,2.85,.5);
// Interior built-in seats follow the cylinder, avoiding the walking route.
for(const a0 of [.65,3.8]){arcBlock(4.27,4.93,.72,1.08,a0,a0+.87,mats.plaster,16);arcBlock(4.18,4.96,1.08,1.2,a0-.015,a0+.885,mats.stoneLight,16);}
// Terrace bench and a sundial, both outside the main path.
for(const x of [-4.7,-3.4])box(.3,.35,.65,mats.stone,x,.735,-12.55);
box(2.25,.17,.77,mats.stoneLight,-4.05,.995,-12.55);collider(-4.05,-12.55,2.3,.8);
cyl(.52,.64,.17,mats.stone,4.25,.65,-12.2,8);cyl(.22,.38,.78,mats.stoneLight,4.25,1.1,-12.2,8);cyl(.58,.45,.12,mats.stoneLight,4.25,1.54,-12.2,48);cyl(.47,.47,.027,mats.bronze,4.25,1.62,-12.2,64);collider(4.25,-12.2,1.15,1.15);
for(let i=0;i<24;i++){const a=i*TAU/24;rod([4.25+Math.sin(a)*.35,1.641,-12.2+Math.cos(a)*.35],[4.25+Math.sin(a)*.44,1.641,-12.2+Math.cos(a)*.44],.006,mats.edge,undefined,6);}
const gn=new THREE.BufferGeometry();gn.setAttribute('position',new THREE.Float32BufferAttribute([4.25,1.65,-11.92,4.25,2,-12.36,4.25,1.65,-12.42],3));gn.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,1,1,1,0],2));gn.computeVertexNormals();const gnmat=mats.bronze.clone();gnmat.side=THREE.DoubleSide;mesh(gn,gnmat);
textPlane('N',.19,.17,4.25,1.644,-12.48,[-Math.PI/2,0,0],'#e7c98b');

// Sheltered sand accumulates as shallow irregular wedges at walls and corners.
function sandPatch(x,z,rx,rz,angle=0,y=.727){
  const vertices=[0,.075,0],uvs=[.5,.5],indices=[],N=32,radii=Array.from({length:N},(_,i)=>.96+.04*Math.sin(i*2.7)+rand()*.025);
  for(let ring=1;ring<=4;ring++)for(let i=0;i<N;i++){const a=i*TAU/N,t=ring/4,r=radii[i]*t;vertices.push(Math.cos(a)*rx*r,.075*Math.pow(1-t,1.4),Math.sin(a)*rz*r);uvs.push(.5+Math.cos(a)*r/2,.5+Math.sin(a)*r/2);}
  for(let i=0;i<N;i++){const j=(i+1)%N;indices.push(0,1+j,1+i);for(let ring=0;ring<3;ring++){const a=1+ring*N+i,b=1+ring*N+j,c=a+N,d=b+N;indices.push(a,b,c,b,d,c);}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();mesh(g,mats.drift,x,y,z,[0,angle,0]);
}
for(let i=0;i<26;i++){const a=rand()*TAU;if(Math.abs(Math.sin(a))>.38)sandPatch(Math.sin(a)*4.75,Math.cos(a)*4.75,.13+rand()*.22,.35+rand()*.5,-a,.736);}
for(let i=0;i<18;i++){sandPatch((i%2?1:-1)*(1.45+rand()*.13),6+rand()*6,.2,.3+rand()*.6,0,.71);}
for(let i=0;i<24;i++){const side=i%2?1:-1;sandPatch(side*(6.19+rand()*.11),-6.2-rand()*8.5,.2+rand()*.2,.6+rand()*.7,0,.561);}
for(let i=0;i<9;i++)sandPatch(-5.7+i*1.3,-14.99,.8,.28+rand()*.18,0,.561);
// Plaster loss and mineral staining appear only near exposed bases, not uniformly.
const wearMat=new THREE.MeshStandardMaterial({color:'#ad9e84',roughness:1,polygonOffset:true,polygonOffsetFactor:-1,side:THREE.DoubleSide});
for(let i=0;i<78;i++){
  const a=rand()*TAU;if(Math.abs(Math.sin(a))<.36)continue;const rr=i%2?4.946:5.638,y=.9+rand()*1.05;
  mesh(new THREE.CircleGeometry(.012+rand()*.066,7),wearMat,Math.sin(a)*rr,y,Math.cos(a)*rr,[0,a+(i%2?Math.PI:0),rand()*.5],[1,.4+rand(),1],false,false);
}
// Translucent mineral streaks are sparse and tied to roof runoff and wall bases.
const stainC=document.createElement('canvas');stainC.width=256;stainC.height=512;const sc=stainC.getContext('2d');
for(let i=0;i<130;i++){const x=rand()*256,w=2+rand()*12,h=60+rand()*400;const gradient=sc.createLinearGradient(0,0,0,h);gradient.addColorStop(0,'rgba(98,78,52,.07)');gradient.addColorStop(.4,'rgba(112,91,62,.025)');gradient.addColorStop(1,'rgba(112,91,62,0)');sc.fillStyle=gradient;sc.fillRect(x,0,w,h);}
for(let i=0;i<110;i++){const x=rand()*256,y=330+rand()*182,r=3+rand()*18;const g=sc.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(117,96,65,.065)');g.addColorStop(1,'rgba(117,96,65,0)');sc.fillStyle=g;sc.fillRect(x-r,y-r,r*2,r*2);}
const stainT=new THREE.CanvasTexture(stainC);stainT.colorSpace=THREE.SRGBColorSpace;const stainM=new THREE.MeshStandardMaterial({map:stainT,transparent:true,opacity:.28,depthWrite:false,roughness:1,polygonOffset:true,polygonOffsetFactor:-2});
for(const a of [.45,.95,1.8,2.4,3.6,4.4,5.3,5.8])mesh(new THREE.PlaneGeometry(.86,4.0),stainM,Math.sin(a)*5.642,2.95,Math.cos(a)*5.642,[0,a,0],null,false,false);
for(const side of [-1,1])for(const z of [7.1,9.65,11.7])mesh(new THREE.PlaneGeometry(.85,2.5),stainM,side*1.63,2.2,z,[0,-side*Math.PI/2,0],null,false,false);
// A few wind-rounded stones and dry plants are held outside the architecture.
for(let i=0;i<115;i++){
  const a=rand()*TAU,r=7+rand()*12,x=Math.sin(a)*r,z=Math.cos(a)*r;if(r>22*(.89+.11*Math.cos(a))||(Math.abs(x)<7.3&&z<-4&&z>-16.5)||(Math.abs(x)<2.7&&z>4&&z<15))continue;
  mesh(new THREE.DodecahedronGeometry(.09+rand()*.23,0),i%2?mats.stoneDark:mats.stone,x,-.22,z,[rand(),rand(),rand()],[1.7,.7,1]);
  if(i%5===0)for(let j=0;j<6;j++){const aa=rand()*TAU;rod([x,-.25,z],[x+Math.sin(aa)*.22,.05+rand()*.25,z+Math.cos(aa)*.22],.008,mats.wood, .003,5);}
}
// Shadowed joints at the wall/floor seam supply stable contact depth.
const aoMat=new THREE.MeshBasicMaterial({color:'#3e3829',transparent:true,opacity:.12,depthWrite:false,side:THREE.DoubleSide});
arcBlock(4.83,4.94,.742,.744,.34,Math.PI-.34,aoMat,50);arcBlock(4.83,4.94,.742,.744,Math.PI+.34,TAU-.34,aoMat,50);

// Static material batches keep the whole detailed scene to a small draw count.
for(const b of batches.values()){
  const g=mergeGeometries(b.geos,false);g.computeBoundingSphere();
  if([mats.plaster,mats.shadePlaster,mats.stone,mats.stoneLight,mats.tile,mats.stoneDark].includes(b.mat)){
    const p=g.attributes.position,c=new Float32Array(p.count*3);for(let i=0;i<p.count;i++){
      const x=p.getX(i),y=p.getY(i),z=p.getZ(i),r=Math.hypot(x,z);let ao=1;
      if(z>5.5&&z<12.55&&Math.abs(x)<1.77&&y<4.7){ao*=.72+.25*Math.min(1,Math.abs(z-9.05)/3.5);if(y<1.3&&Math.abs(x)>1.1)ao*=.86;}
      if(r>4.15&&r<5.02&&y<1.5&&y>.68)ao*=.83+.17*Math.min(1,(y-.68)/.82);
      c[i*3]=ao;c[i*3+1]=ao;c[i*3+2]=Math.min(1,ao*1.016);
    }g.setAttribute('color',new THREE.BufferAttribute(c,3));b.mat.vertexColors=true;
  }
  const m=new THREE.Mesh(g,b.mat);m.castShadow=b.shadow;m.receiveShadow=true;scene.add(m);for(const old of b.geos)old.dispose();
}
batches.clear();

// Collision uses a circular camera footprint and exact architectural boundaries.
const player={x:0,z:11.1,y:2.36,yaw:0,pitch:0,vx:0,vz:0};
const keys=new Set();let active=false,drag=false,lastX=0,lastY=0,started=false;
function isWalkable(x,z){
  const r=Math.hypot(x,z),radius=.25;
  let allowed=r<4.95-radius || (Math.abs(x)<1.51-radius&&z>-6.4&&z<6.4) || (Math.abs(x)<1.635-radius&&z>=5.4&&z<12.8) || (Math.abs(x)<2.05-radius&&z>=12.5&&z<14.5) || (Math.abs(x)<6.4-radius&&z<=-5.6&&z>-15.2+radius);
  if(!allowed)return false;
  if(r<1.68)return false;
  // The two built-in curved benches project into the inner wall line.
  let a=Math.atan2(x,z);if(a<0)a+=TAU;if(r>3.92&&((a>.60&&a<1.57)||(a>3.75&&a<4.72)))return false;
  for(const c of colliders){const dx=Math.max(Math.abs(x-c.x)-c.w/2,0),dz=Math.max(Math.abs(z-c.z)-c.d/2,0);if(dx*dx+dz*dz<radius*radius)return false;}
  return true;
}
function floorHeight(x,z){if(z<-5.15)return z<-6.1?.56:THREE.MathUtils.lerp(.71,.56,(-z-5.15)/.95);if(z>12.54)return Math.max(.08,.62-Math.floor((z-12.54)/.5)*.18);return .71;}
function reset(){player.x=0;player.z=11.1;player.y=2.36;player.yaw=0;player.pitch=-.015;player.vx=player.vz=0;keys.clear();syncCamera();}
function syncCamera(){camera.position.set(player.x,player.y,player.z);camera.rotation.set(player.pitch,player.yaw,0);}
function setLooking(state){active=state;document.body.classList.toggle('playing',state);$('#crosshair').hidden=!state;$('#resume').hidden=state||!started;}
async function lock(){started=true;$('#welcome').hidden=true;$('#resume').hidden=true;try{await renderer.domElement.requestPointerLock();}catch{setLooking(false);}}
$('#enter').onclick=lock;$('#resumeButton').onclick=lock;$('#resetButton').onclick=reset;
$('#helpButton').onclick=()=>{$('#help').hidden=!$('#help').hidden;};
const togglePerf=()=>{$('#performance').hidden=!$('#performance').hidden;};$('#perfButton').onclick=togglePerf;
document.addEventListener('pointerlockchange',()=>{keys.clear();setLooking(document.pointerLockElement===renderer.domElement);});
document.addEventListener('keydown',e=>{if(e.target.tagName==='SELECT')return;if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code)){keys.add(e.code);e.preventDefault();}if(e.code==='KeyR')reset();if(e.code==='KeyP')togglePerf();if(e.code==='Escape'){document.exitPointerLock();keys.clear();}});
document.addEventListener('keyup',e=>keys.delete(e.code));
window.addEventListener('blur',()=>{keys.clear();player.vx=player.vz=0;});document.addEventListener('visibilitychange',()=>{keys.clear();});
renderer.domElement.addEventListener('mousedown',e=>{if(!active&&started){drag=true;lastX=e.clientX;lastY=e.clientY;$('#resume').hidden=true;}});
window.addEventListener('mouseup',()=>{drag=false;if(started&&!active)$('#resume').hidden=false;});
renderer.domElement.addEventListener('dblclick',()=>{if(started&&!active)lock();});
document.addEventListener('mousemove',e=>{if(active||drag){const dx=active?e.movementX:e.clientX-lastX,dy=active?e.movementY:e.clientY-lastY;player.yaw-=dx*.002;player.pitch=THREE.MathUtils.clamp(player.pitch-dy*.002,-1.48,1.48);lastX=e.clientX;lastY=e.clientY;}});
function move(dt){
  if(!started)return;const f=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0),s=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0),len=Math.hypot(f,s)||1;
  const speed=(keys.has('ShiftLeft')||keys.has('ShiftRight'))?3.5:2.2;
  const tx=(-Math.sin(player.yaw)*f+Math.cos(player.yaw)*s)/len*speed,tz=(-Math.cos(player.yaw)*f-Math.sin(player.yaw)*s)/len*speed;
  const smooth=1-Math.exp(-14*dt);player.vx+=(tx-player.vx)*smooth;player.vz+=(tz-player.vz)*smooth;
  const count=Math.max(1,Math.ceil(Math.hypot(player.vx,player.vz)*dt/.08));for(let i=0;i<count;i++){let nx=player.x+player.vx*dt/count,nz=player.z+player.vz*dt/count;if(isWalkable(nx,player.z))player.x=nx;else player.vx=0;if(isWalkable(player.x,nz))player.z=nz;else player.vz=0;}
  player.y+=(floorHeight(player.x,player.z)+1.65-player.y)*(1-Math.exp(-18*dt));syncCamera();
}
// Passive measurements can be exported for a real exploration session.
const measurements=[],rolling=[];let prev=performance.now(),lastUI=0,frame=0;
function summary(values){const v=values.slice().sort((a,b)=>a-b);const avg=v.reduce((a,b)=>a+b,0)/(v.length||1);return{samples:v.length,average_ms:+avg.toFixed(2),p50_ms:+(v[Math.floor(v.length*.5)]||0).toFixed(2),p95_ms:+(v[Math.floor(v.length*.95)]||0).toFixed(2),p99_ms:+(v[Math.floor(v.length*.99)]||0).toFixed(2),max_ms:+(v.at(-1)||0).toFixed(2)};}
const graphCtx=$('#graph').getContext('2d');
function updateUI(now){
  $('#zone').textContent=player.z>5.2?'South passage':player.z<-5.9?'Viewing terrace':'Instrument chamber';
  if(!$('#performance').hidden){const s=summary(rolling.map(x=>x.ms));$('#metrics').textContent=`${(1000/(s.average_ms||1)).toFixed(0)} FPS · avg ${s.average_ms} ms\np50 ${s.p50_ms} · p95 ${s.p95_ms} ms\np99 ${s.p99_ms} · ${renderer.info.render.calls} draw calls`;$('#metrics').style.whiteSpace='pre-line';graphCtx.clearRect(0,0,240,52);graphCtx.fillStyle='#ffffff13';graphCtx.fillRect(0,35,240,1);graphCtx.strokeStyle='#c7cea6';graphCtx.lineWidth=1;graphCtx.beginPath();rolling.slice(-240).forEach((v,i)=>{const y=52-Math.min(v.ms/50,1)*52;i?graphCtx.lineTo(i,y):graphCtx.moveTo(i,y);});graphCtx.stroke();}
}
$('#quality').onchange=e=>{const q=e.target.value;renderer.setPixelRatio(q==='high'?Math.min(devicePixelRatio,1.65):q==='balanced'?Math.min(devicePixelRatio,1.15):.85);renderer.setSize(innerWidth,innerHeight);$('#qualityText').textContent=q.toUpperCase();};
$('#downloadMetrics').onclick=()=>{const data={title:'Saffron Observatory',captured_at:new Date().toISOString(),quality:$('#quality').value,resolution:[renderer.domElement.width,renderer.domElement.height],summary:summary(measurements.map(x=>x.ms)),frames:measurements};const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.download='observatory-frame-times.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
reset();
// A small public read-only diagnostics surface plus explicit route-test hooks.
window.observatory={get position(){return{x:player.x,y:player.y,z:player.z,yaw:player.yaw,pitch:player.pitch};},get stats(){return{...summary(rolling.map(x=>x.ms)),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures};},isWalkable,floorHeight,reset,begin:()=>{started=true;$('#welcome').hidden=true;$('#resume').hidden=true;},look:(yaw,pitch=0)=>{player.yaw=yaw;player.pitch=pitch;},setView:(x,z,yaw=0,pitch=0)=>{if(!isWalkable(x,z))throw Error('View position is not walkable');player.x=x;player.z=z;player.y=floorHeight(x,z)+1.65;player.yaw=yaw;player.pitch=pitch;player.vx=player.vz=0;syncCamera();},get samples(){return measurements.slice();}};
renderer.compile(scene,camera);renderer.render(scene,camera);renderer.shadowMap.autoUpdate=false;$('#loading').hidden=true;
document.addEventListener('visibilitychange',()=>{prev=performance.now();});
function animate(now){const raw=now-prev;prev=now;const dt=Math.min(raw/1000,.05);move(dt);renderer.render(scene,camera);if(frame++>20&&!document.hidden){rolling.push({t:now,ms:raw});while(rolling.length&&rolling[0].t<now-10000)rolling.shift();if(started&&measurements.length<216000)measurements.push({t:+(now/1000).toFixed(3),ms:+raw.toFixed(3),x:+player.x.toFixed(2),z:+player.z.toFixed(2)});}if(now-lastUI>300){updateUI(now);lastUI=now;}requestAnimationFrame(animate);}requestAnimationFrame(animate);
