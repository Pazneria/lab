import * as THREE from '../vendor/three.module.min.js';

// The entire landscape is generated once at startup. The only animated surface is
// a single water mesh; lighting and rock geometry are static.
const root = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({antialias: true, powerPreference: 'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
root.appendChild(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x17211f);
scene.fog = new THREE.FogExp2(0x26332f, 0.022);
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.06, 90);
camera.rotation.order = 'YXZ';

let seed = 121990;
function rand(){ seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
function hash(x,z){const s=Math.sin(x*127.1+z*311.7)*43758.5453123;return s-Math.floor(s)}
function noise(x,z){const a=Math.floor(x),b=Math.floor(z),u=x-a,v=z-b; const s=u*u*(3-2*u),t=v*v*(3-2*v);return THREE.MathUtils.lerp(THREE.MathUtils.lerp(hash(a,b),hash(a+1,b),s),THREE.MathUtils.lerp(hash(a,b+1),hash(a+1,b+1),s),t)}
function fbm(x,z){return (noise(x,z)-.5)*.57+(noise(x*2.1+5,z*2.1-8)-.5)*.28+(noise(x*4.3-4,z*4.3+2)-.5)*.15}
function smooth(a,b,x){let t=THREE.MathUtils.clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)}
function ellipse(x,z){return Math.sqrt(((x+1.45)/4.05)**2+((z+.05)/3.2)**2)}
function ground(x,z){
  const e=ellipse(x,z);
  const basin = (1-smooth(.78,1.15,e))*-.67;
  const landing = smooth(5.0,9.8,-z)*1.08;
  const ripples = fbm(x*.7,z*.7)*.105 + Math.sin(x*1.6+z*.7)*.025;
  return basin + landing + ripples;
}
function stoneTexture(){
  const c=document.createElement('canvas');c.width=512;c.height=512;const q=c.getContext('2d');
  const img=q.createImageData(512,512);
  for(let y=0;y<512;y++)for(let x=0;x<512;x++){
    const n=fbm(x/43,y/43)*33 + (hash(x,y)-.5)*17 + Math.sin(y*.24+noise(x/45,y/27)*4)*4;
    const i=(y*512+x)*4;img.data[i]=177+n;img.data[i+1]=169+n;img.data[i+2]=150+n;img.data[i+3]=255;
  }q.putImageData(img,0,0);
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(4,2);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());return t;
}
const tex=stoneTexture();
const rock = new THREE.MeshStandardMaterial({map:tex,vertexColors:true,roughness:1,side:THREE.DoubleSide});
const roughRock = new THREE.MeshStandardMaterial({map:tex,roughness:1,color:0xb5aa91});
const darkRock = new THREE.MeshStandardMaterial({map:tex,roughness:.83,color:0x6d7168});
const dampRock = new THREE.MeshStandardMaterial({map:tex,roughness:.72,color:0x716f5f});
const floorMat = new THREE.MeshStandardMaterial({map:tex,vertexColors:true,roughness:1,side:THREE.DoubleSide});
scene.add(new THREE.HemisphereLight(0xb9d1c8,0x574a38,1.45));
const daylight=new THREE.DirectionalLight(0xffe7bd,2.25);daylight.position.set(-4,11,3);scene.add(daylight);
const fill=new THREE.PointLight(0x96c0b2,65,22,2);fill.position.set(-2,5,0);scene.add(fill);
const warm=new THREE.PointLight(0xffcf91,25,15,2);warm.position.set(3,4,-8);scene.add(warm);

// One broad tessellated bed: depressed beneath water, rising gradually to landing.
const floorGeo=new THREE.PlaneGeometry(21,26,130,160);floorGeo.rotateX(-Math.PI/2);
const fp=floorGeo.attributes.position, fc=[];
for(let i=0;i<fp.count;i++){
 const x=fp.getX(i),z=fp.getZ(i),y=ground(x,z);fp.setY(i,y);
 const e=ellipse(x,z), damp=1-smooth(.85,1.35,e); const n=fbm(x*.42,z*.42);
 const color=new THREE.Color().setRGB(.69+n*.12-damp*.23,.66+n*.1-damp*.19,.57+n*.08-damp*.14);fc.push(color.r,color.g,color.b);
}
floorGeo.setAttribute('color',new THREE.Float32BufferAttribute(fc,3));floorGeo.computeVertexNormals();
const floor=new THREE.Mesh(floorGeo,floorMat);scene.add(floor);

// Irregular cave envelope: long, layered bands, with a low recessed entrance and a narrower back.
const outline=[[-3.4,11.4],[3.3,11.4],[5,9.6],[7,7.3],[8,4],[8.2,.2],[7.8,-4],[6.7,-7],[6,-10],[4.8,-12],[-1.4,-12],[-3.5,-9.5],[-6.1,-7],[-8,-4.3],[-8.7,-.4],[-8,4.1],[-6.3,7.6],[-4.5,9.5]];
function inside(x,z){let c=false;for(let i=0,j=outline.length-1;i<outline.length;j=i++) {const [xi,zi]=outline[i],[xj,zj]=outline[j];if(((zi>z)!=(zj>z))&&(x<(xj-xi)*(z-zi)/(zj-zi)+xi))c=!c;}return c}
function wallSegment(a,b,index){
 const len=Math.hypot(b[0]-a[0],b[1]-a[1]), steps=Math.max(4,Math.ceil(len/.48)), rows=22;
 const dx=(b[0]-a[0])/len,dz=(b[1]-a[1])/len, nx=-dz,nz=dx;
 const pos=[],uv=[],col=[],ind=[];
 for(let j=0;j<=rows;j++)for(let i=0;i<=steps;i++){
  const t=i/steps,v=j/rows, x=THREE.MathUtils.lerp(a[0],b[0],t),z=THREE.MathUtils.lerp(a[1],b[1],t);
  const height=7.7+fbm(x*.23,z*.23)*1.8;const y=ground(x,z)-.35+v*height;
  const band=Math.sin(y*2.5+fbm(x*.25,z*.25)*2)*.14+Math.sin(y*5.3+x*.7)*.055;
  const bulge=fbm(x*.63+y*.16,z*.63-y*.11)*.7+band + Math.sin(v*Math.PI)*.22;
  pos.push(x+nx*bulge,y,z+nz*bulge);uv.push(t*len/3,v*2.5);
  const shade=.75+fbm(x*.37+y*.22,z*.37)*.18 + Math.sin(y*2.5)*.045 - (v<.16?.09:0);
  col.push(shade,shade*.97,shade*.9);
  if(i<steps&&j<rows){const k=j*(steps+1)+i;ind.push(k,k+steps+1,k+1,k+1,k+steps+1,k+steps+2)}
 }
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.setIndex(ind);g.computeVertexNormals();scene.add(new THREE.Mesh(g,rock));
}
for(let i=0;i<outline.length;i++)wallSegment(outline[i],outline[(i+1)%outline.length],i);

// Ceiling is mostly closed; a small opening over the pool carries the daylight.
const ceilGeo=new THREE.PlaneGeometry(20,25,85,100);ceilGeo.rotateX(Math.PI/2);
const cp=ceilGeo.attributes.position, ci=[], cc=[];
for(let i=0;i<cp.count;i++){
 const x=cp.getX(i),z=cp.getZ(i), y=7.2+fbm(x*.37,z*.37)*1.4+Math.cos(x*.37)*.65;
 cp.setY(i,y);const s=.63+fbm(x*.6,z*.6)*.15;cc.push(s,s*.98,s*.93);
}
const original=ceilGeo.index.array;for(let i=0;i<original.length;i+=3){const a=original[i],b=original[i+1],c=original[i+2];const x=(cp.getX(a)+cp.getX(b)+cp.getX(c))/3,z=(cp.getZ(a)+cp.getZ(b)+cp.getZ(c))/3;if(((x+2.6)/1.35)**2+((z-0.4)/.8)**2>1)ci.push(a,b,c)}
ceilGeo.setIndex(ci);ceilGeo.setAttribute('color',new THREE.Float32BufferAttribute(cc,3));ceilGeo.computeVertexNormals();scene.add(new THREE.Mesh(ceilGeo,rock));

// The arch is a thick, irregular limestone wall with a genuinely open passage.
const shape=new THREE.Shape();
shape.moveTo(-7.9,-.5);shape.lineTo(.05,-.5);shape.lineTo(.05,2.5);
for(let i=0;i<=24;i++){const a=Math.PI-i*Math.PI/24;shape.lineTo(2.4+2.35*Math.cos(a),2.5+2.05*Math.sin(a)+.07*Math.sin(i*2.1));}
shape.lineTo(4.75,-.5);shape.lineTo(7.8,-.5);shape.lineTo(7.8,8.2);shape.lineTo(-7.9,8.2);shape.closePath();
const archGeo=new THREE.ExtrudeGeometry(shape,{depth:1.65,bevelEnabled:true,bevelThickness:.18,bevelSize:.16,bevelSegments:2,curveSegments:24});
const ap=archGeo.attributes.position;const archColors=[];
for(let i=0;i<ap.count;i++){let x=ap.getX(i),y=ap.getY(i),z=ap.getZ(i);const n=fbm(x*.8+y*.14,z*.9+y*.3);ap.setXYZ(i,x+n*.13,y+n*.12,z+n*.13);const s=.72+n*.13+Math.sin(y*2.7)*.035;archColors.push(s,s*.97,s*.91)}
archGeo.setAttribute('color',new THREE.Float32BufferAttribute(archColors,3));archGeo.computeVertexNormals();const arch=new THREE.Mesh(archGeo,rock);arch.position.z=-7.25;scene.add(arch);

// Rounded limestone blocks and shelves intersect the envelope, making broad erosion forms.
const blobGeo=new THREE.IcosahedronGeometry(1,3);const bp=blobGeo.attributes.position;
for(let i=0;i<bp.count;i++){const x=bp.getX(i),y=bp.getY(i),z=bp.getZ(i);const f=1+fbm(x*2+4,y*2+z*2)*.22;bp.setXYZ(i,x*f,y*f,z*f)}blobGeo.computeVertexNormals();
function blob(x,y,z,sx,sy,sz,mat=roughRock,rot=0){const m=new THREE.Mesh(blobGeo,mat);m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.rotation.y=rot;scene.add(m);return m}
for(let i=0;i<outline.length;i++){
 const a=outline[i],b=outline[(i+1)%outline.length],len=Math.hypot(b[0]-a[0],b[1]-a[1]);
 const count=Math.max(1,Math.floor(len/2));for(let j=0;j<count;j++){
  const t=(j+.3+rand()*.4)/count,x=THREE.MathUtils.lerp(a[0],b[0],t),z=THREE.MathUtils.lerp(a[1],b[1],t);
  for(let k=0;k<2;k++){const y=(k?4.2:1.2)+rand()*.8;blob(x,y,z,1.3+rand()*.9,.3+rand()*.45,.65+rand()*.45,k?roughRock:darkRock,rand()*3)}
 }
}
// A few large flowstone fins, with vertical ridges instead of random pebbles.
function formation(x,z,height,radius,fromCeiling=false){
 const radial=18,levels=14,pos=[],uv=[],idx=[],colors=[];
 for(let j=0;j<=levels;j++){const t=j/levels;for(let i=0;i<=radial;i++){
  const a=i/radial*Math.PI*2, taper=Math.pow(1-t,.65)*(.85+.13*Math.sin(t*10))+0.035;
  const r=radius*taper*(1+.15*Math.sin(a*5+x)+.06*Math.sin(a*9+z));
  const xx=x+Math.cos(a)*r,zz=z+Math.sin(a)*r;const yy=fromCeiling?7.5-t*height:ground(x,z)+t*height;
  pos.push(xx,yy,zz);uv.push(i/radial*2,t*2);const s=.76+.07*Math.sin(a*5+x)+.05*Math.sin(t*8);colors.push(s,s*.95,s*.86);
  if(j<levels&&i<radial){let k=j*(radial+1)+i;idx.push(k,k+1,k+radial+1,k+1,k+radial+2,k+radial+1)}
 }}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.setIndex(idx);g.computeVertexNormals();scene.add(new THREE.Mesh(g,rock));
}
formation(-6.5,2.5,3.5,1.25);formation(-6.9,-1.7,2.2,.85);formation(6.9,4.8,2.8,1.0);formation(-4.8,-4.8,2.5,1.2);formation(-5.9,1.8,2.4,.6,true);formation(5.7,-2.9,1.8,.45,true);formation(-1.5,-4.9,1.5,.4,true);

// Wet rock rim and submerged slabs make the depth legible through the simple water.
for(let i=0;i<48;i++){
 const a=i/48*Math.PI*2, x=-1.45+4.08*Math.cos(a),z=-.05+3.23*Math.sin(a);
 blob(x,ground(x,z)+.01,z,.32+rand()*.36,.1+rand()*.13,.26+rand()*.25,dampRock,a);
}
for(let i=0;i<18;i++){
 const a=rand()*Math.PI*2,r=Math.sqrt(rand())*.8,x=-1.45+Math.cos(a)*r*4,z=-.05+Math.sin(a)*r*3.1;
 blob(x,ground(x,z)+.08,z,.25+rand()*.4,.08+rand()*.11,.2+rand()*.4,darkRock,rand()*3);
}
const waterGeo=new THREE.CircleGeometry(1,96);waterGeo.rotateX(-Math.PI/2);waterGeo.scale(4.03,1,3.18);
const waterMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{time:{value:0}},vertexShader:`varying vec3 p; void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform float time; varying vec3 p; void main(){float w=sin(p.x*5.0+p.z*3.0+time*.5)*sin(p.z*6.0-p.x*2.0-time*.3); float bands=pow(max(0.0,sin(p.x*6.0+p.z*4.0+w*.4+time*.25)),12.0); vec3 col=mix(vec3(.12,.27,.25),vec3(.40,.57,.51),.25+.12*w+bands*.17); gl_FragColor=vec4(col,.60);}`});
const water=new THREE.Mesh(waterGeo,waterMat);water.position.set(-1.45,-.23,-.05);water.renderOrder=2;scene.add(water);

// A slit of sky and a gentle, non-shadow-casting shaft of light.
const sky=new THREE.Mesh(new THREE.CircleGeometry(1,32),new THREE.MeshBasicMaterial({color:0xb7d5cf,side:THREE.DoubleSide}));sky.rotation.x=Math.PI/2;sky.scale.set(1.35,.8,1);sky.position.set(-2.6,8.25,.4);scene.add(sky);
const shaftGeo=new THREE.CylinderGeometry(.8,2.3,7,24,1,true);const shaftMat=new THREE.MeshBasicMaterial({color:0xdbe7c9,transparent:true,opacity:.045,depthWrite:false,side:THREE.DoubleSide});const shaft=new THREE.Mesh(shaftGeo,shaftMat);shaft.position.set(-2.6,3.9,.4);scene.add(shaft);

// Scale cues: iron posts and sagging rope on the safe side of the pool.
const metal=new THREE.MeshStandardMaterial({color:0x514d40,roughness:.85,metalness:.35});const ropeMat=new THREE.MeshStandardMaterial({color:0x9b8764,roughness:1});
function cylinderBetween(a,b,r,mat,segments=7){const d=new THREE.Vector3().subVectors(b,a),m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d.length(),segments),mat);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());scene.add(m);return m}
const posts=[];for(const z of [3.2,1.4,-.4,-2.2,-4.0]){const x=3.3+Math.max(0,Math.abs(z)-2)*.28,y=ground(x,z);cylinderBetween(new THREE.Vector3(x,y,z),new THREE.Vector3(x,y+.93,z),.035,metal);blob(x,y+.04,z,.15,.09,.15,darkRock);posts.push(new THREE.Vector3(x,y+.82,z))}
for(let i=0;i<posts.length-1;i++){const a=posts[i],b=posts[i+1],points=[];for(let j=0;j<=12;j++){const t=j/12;points.push(new THREE.Vector3().lerpVectors(a,b,t).add(new THREE.Vector3(0,-.15*Math.sin(Math.PI*t),0)))}const g=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),24,.025,6,false);scene.add(new THREE.Mesh(g,ropeMat))}
// Survey marker, placed beside the landing instead of on the walking line.
const px=4.8,pz=-10.3,py=ground(px,pz);cylinderBetween(new THREE.Vector3(px,py,pz),new THREE.Vector3(px,py+1.25,pz),.035,metal);
const board=new THREE.Mesh(new THREE.BoxGeometry(.44,.32,.035),new THREE.MeshStandardMaterial({color:0xceb98a,roughness:1}));board.position.set(px,py+1.06,pz+.02);scene.add(board);
const stripe=new THREE.Mesh(new THREE.BoxGeometry(.34,.045,.04),new THREE.MeshStandardMaterial({color:0x8a5544,roughness:1}));stripe.position.set(px,py+1.06,pz+.045);scene.add(stripe);

const keys=new Set();const start={x:0,z:9.6,yaw:0,pitch:-.08};let player={...start};let locked=false;
function reset(){player={...start};updateCamera();showNotice('Returned to the entrance')}
function updateCamera(){camera.position.set(player.x,ground(player.x,player.z)+1.65,player.z);camera.rotation.set(player.pitch,player.yaw,0)}
function canWalk(x,z){
 if(!inside(x,z))return false;
 // Keep a little distance from the polygon wall for shoulder clearance.
 for(let i=0;i<outline.length;i++){const a=outline[i],b=outline[(i+1)%outline.length],dx=b[0]-a[0],dz=b[1]-a[1],t=THREE.MathUtils.clamp(((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz),0,1);if(Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz)<.42)return false}
 if(ellipse(x,z)<1.06)return false;
 // Substantial flowstone formations are solid as well as the enclosure.
 for(const [cx,cz,r] of [[-6.5,2.5,1.05],[-6.9,-1.7,.72],[6.9,4.8,.9],[-4.8,-4.8,1.0]]) if(Math.hypot(x-cx,z-cz)<r+.28)return false;
 // Width of the natural arch opening, including its thick reveals.
 if(z < -5.35 && z > -7.75 && (x<.48 || x>4.32)) return false;
 return true;
}
function move(dx,dz){const nx=player.x+dx,nz=player.z+dz;if(canWalk(nx,nz)){player.x=nx;player.z=nz}else{if(canWalk(nx,player.z))player.x=nx;if(canWalk(player.x,nz))player.z=nz}}
let noticeTimer;function showNotice(s){const n=document.querySelector('#notice');n.textContent=s;n.style.opacity=1;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>n.style.opacity=0,1800)}
const hint=document.querySelector('#hint');hint.addEventListener('click',()=>renderer.domElement.requestPointerLock());renderer.domElement.addEventListener('click',()=>renderer.domElement.requestPointerLock());
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===renderer.domElement;hint.classList.toggle('hidden',locked);document.querySelector('.title').style.opacity=locked?'.55':'1'});
document.addEventListener('mousemove',e=>{if(!locked)return;player.yaw-=e.movementX*.002;player.pitch=THREE.MathUtils.clamp(player.pitch-e.movementY*.002,-1.38,1.38)});
document.addEventListener('keydown',e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();keys.add(e.code);if(e.code==='KeyR'&&!e.repeat)reset()});document.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>keys.clear());
document.querySelector('#reset').addEventListener('click',reset);document.querySelector('#help').addEventListener('click',()=>{if(locked)document.exitPointerLock();else hint.classList.remove('hidden')});
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5))});
updateCamera();let last=performance.now();function frame(now){requestAnimationFrame(frame);const dt=Math.min((now-last)/1000,.05);last=now;let f=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0),s=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);if(f||s){const len=Math.hypot(f,s);f/=len;s/=len;const speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?4.4:2.7)*dt;move((-Math.sin(player.yaw)*f+Math.cos(player.yaw)*s)*speed,(-Math.cos(player.yaw)*f-Math.sin(player.yaw)*s)*speed)}updateCamera();waterMat.uniforms.time.value=now*.001;renderer.render(scene,camera)}requestAnimationFrame(frame);


