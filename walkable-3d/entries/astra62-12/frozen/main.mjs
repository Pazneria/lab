import * as THREE from "./vendor/three.module.min.js";
import {spawn,advance} from "./layout.mjs";
import {vertexSource,fragmentSource,storefrontGlass,lampHalos} from "./render.mjs";

const $=id=>document.getElementById(id);
const canvas=$("view"),enter=$("enter"),help=$("help"),helpButton=$("help-button"),notice=$("notice");
const camera=new THREE.PerspectiveCamera(64,1,.045,32);
camera.rotation.order="YXZ";
const scene=new THREE.Scene();scene.background=new THREE.Color(0x253339);
const keys=new Set(),movement=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight","PageUp","PageDown"]);
let renderer,ready=false,active=false,visited=false,dirty=true,dragPointer=null,lastX=0,lastY=0;
let x=spawn.x,z=spawn.z,yaw=spawn.yaw,pitch=spawn.pitch,velocityX=0,velocityZ=0,previous=0,timer=0;
const captured=()=>document.pointerLockElement===canvas;
function showNotice(s,ms=2300){
  clearTimeout(timer);notice.textContent=s;notice.classList.add("visible");timer=setTimeout(()=>notice.classList.remove("visible"),ms);
}
function setHelp(on){help.hidden=!on;helpButton.setAttribute("aria-expanded",String(on))}
function updateCamera(){
  camera.position.set(x,spawn.eye,z);camera.rotation.set(pitch,yaw,0,"YXZ");dirty=true;
}
function reset(){
  x=spawn.x;z=spawn.z;yaw=spawn.yaw;pitch=spawn.pitch;velocityX=velocityZ=0;keys.clear();updateCamera();
  if(ready)showNotice("Back at the entrance");
}
function pause(){
  active=false;dragPointer=null;velocityX=velocityZ=0;keys.clear();
  document.body.classList.remove("exploring","captured");enter.textContent="Resume exploring";dirty=true;
}
function activate(){
  if(!ready)return false;active=true;visited=true;setHelp(false);document.body.classList.add("exploring");
  canvas.focus({preventScroll:true});return true;
}
function begin(){
  if(!activate()||captured())return;
  if(!canvas.requestPointerLock){showNotice("Drag to look around · WASD to walk",3200);return}
  try{const req=canvas.requestPointerLock();if(req&&req.catch)req.catch(()=>{if(active&&!captured())showNotice("Drag to look around · WASD to walk",3200)})}
  catch{showNotice("Drag to look around · WASD to walk",3200)}
}
function turn(dx,dy){
  yaw-=dx*.00205;pitch=Math.max(-1.36,Math.min(1.36,pitch-dy*.00205));
  if(Math.abs(yaw)>Math.PI*4)yaw%=Math.PI*2;
  updateCamera();
}
enter.addEventListener("click",begin);$("reset-button").addEventListener("click",reset);
helpButton.addEventListener("click",()=>setHelp(help.hidden));$("close-help").addEventListener("click",()=>setHelp(false));
document.addEventListener("pointerlockchange",()=>{
  const on=captured();document.body.classList.toggle("captured",on);
  if(on){activate();dragPointer=null}else if(visited)pause();
});
document.addEventListener("pointerlockerror",()=>{if(active)showNotice("Drag to look around · WASD to walk",3200)});
canvas.addEventListener("pointerdown",e=>{
  if(!ready||e.button!==0)return;
  if(!active){if(e.pointerType==="mouse")begin();else activate()}
  else if(!captured())canvas.focus({preventScroll:true});
  if(!captured()){dragPointer=e.pointerId;lastX=e.clientX;lastY=e.clientY;try{canvas.setPointerCapture(e.pointerId)}catch{}}
});
document.addEventListener("mousemove",e=>{if(active&&captured())turn(e.movementX||0,e.movementY||0)});
canvas.addEventListener("pointermove",e=>{
  if(!active||captured()||e.pointerId!==dragPointer)return;
  turn(e.clientX-lastX,e.clientY-lastY);lastX=e.clientX;lastY=e.clientY;
});
function stopDrag(e){if(e.pointerId===dragPointer)dragPointer=null}
canvas.addEventListener("pointerup",stopDrag);canvas.addEventListener("pointercancel",stopDrag);canvas.addEventListener("lostpointercapture",stopDrag);
window.addEventListener("keydown",e=>{
  if(e.ctrlKey||e.altKey||e.metaKey||!ready)return;
  if(e.code==="KeyR"){e.preventDefault();if(!e.repeat)reset();return}
  if(e.code==="KeyH"){e.preventDefault();if(!e.repeat)setHelp(help.hidden);return}
  if(e.code==="Escape"){if(!captured()){setHelp(false);if(active)pause()}return}
  if(movement.has(e.code)){
    e.preventDefault();
    if(!active&&!e.code.startsWith("Shift"))activate();
    if(active)keys.add(e.code);
  }
});
window.addEventListener("keyup",e=>keys.delete(e.code));
function loseFocus(){keys.clear();velocityX=velocityZ=0;dragPointer=null;previous=0}
window.addEventListener("blur",loseFocus);document.addEventListener("visibilitychange",loseFocus);

async function checkedResponse(url){const res=await fetch(url);if(!res.ok)throw Error("Could not load "+url+" ("+res.status+")");return res}
async function readMesh(url){
  const response=await checkedResponse(url),bytes=await response.arrayBuffer(),header=new Uint8Array(bytes,0,2);
  if(header[0]!==31||header[1]!==139)return bytes;
  if(!globalThis.DecompressionStream)throw Error("This scene needs a browser with gzip stream support.");
  const decoded=new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
  return new Response(decoded).arrayBuffer();
}
const attrs={
  position:[Float32Array,3,false],normal:[Int8Array,3,true],uv:[Float32Array,2,false],region:[Uint16Array,4,true],
  ink:[Uint8Array,3,true],illumination:[Uint8Array,3,true],surface:[Uint8Array,4,true]
};
async function loadScene(){
  const meta=await (await checkedResponse("./assets/scene.json")).json();
  const loader=new THREE.TextureLoader(),aniso=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  const [buf,textures]=await Promise.all([
    readMesh("./assets/"+meta.geometry),
    Promise.all(meta.textures.map(async file=>{
      const t=await loader.loadAsync("./assets/"+file);t.colorSpace=THREE.NoColorSpace;t.anisotropy=aniso;t.generateMipmaps=true;return t;
    }))
  ]);
  if(buf.byteLength!==meta.byteLength)throw Error("The scene geometry is incomplete.");
  const materials=textures.map(t=>new THREE.ShaderMaterial({
    uniforms:{atlas:{value:t},haze:{value:.010}},vertexShader:vertexSource,fragmentShader:fragmentSource,side:THREE.DoubleSide
  }));
  for(const item of meta.meshes){
    const geo=new THREE.BufferGeometry();
    for(const [name,[type,n,normalized]] of Object.entries(attrs)){
      const [offset,length]=item.attributes[name];geo.setAttribute(name,new THREE.BufferAttribute(new type(buf,offset,length),n,normalized));
    }
    const indexType=item.wide?Uint32Array:Uint16Array;geo.setIndex(new THREE.BufferAttribute(new indexType(buf,...item.index),1));
    geo.boundingBox=new THREE.Box3(new THREE.Vector3(...item.bounds.slice(0,3)),new THREE.Vector3(...item.bounds.slice(3))).expandByScalar(.001);
    geo.boundingSphere=geo.boundingBox.getBoundingSphere(new THREE.Sphere());
    const mesh=new THREE.Mesh(geo,materials[item.page]);mesh.name=item.name;scene.add(mesh);
  }
  storefrontGlass(scene);lampHalos(scene);
  for(const texture of textures)renderer.initTexture(texture);
}
function resize(){
  if(!renderer)return;
  const w=Math.max(1,canvas.clientWidth),h=Math.max(1,canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5,Math.sqrt(2304000/(w*h))));
  renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();dirty=true;
}
function move(dt){
  const key=k=>keys.has(k)?1:0;
  const turnBy=key("ArrowLeft")-key("ArrowRight"),tilt=key("PageUp")-key("PageDown");
  if(turnBy||tilt){yaw+=turnBy*1.58*dt;pitch=Math.max(-1.36,Math.min(1.36,pitch+tilt*dt));dirty=true}
  let forward=Math.min(1,key("KeyW")+key("ArrowUp"))-Math.min(1,key("KeyS")+key("ArrowDown"));
  let right=key("KeyD")-key("KeyA");const mag=Math.max(1,Math.hypot(forward,right));forward/=mag;right/=mag;
  const speed=key("ShiftLeft")||key("ShiftRight")?2.65:1.68,c=Math.cos(yaw),s=Math.sin(yaw);
  const goalX=(right*c-forward*s)*speed,goalZ=(-right*s-forward*c)*speed,blend=1-Math.exp(-dt*23);
  velocityX+=(goalX-velocityX)*blend;velocityZ+=(goalZ-velocityZ)*blend;
  if(Math.abs(velocityX)+Math.abs(velocityZ)>.0008){
    [x,z]=advance(x,z,velocityX*dt,velocityZ*dt);dirty=true;
  }
  if(dirty)updateCamera();
}
function frame(t){
  const dt=previous?Math.min(.050,(t-previous)/1000):0;previous=t;
  if(active)move(dt);
  if((active||dirty)&&!document.hidden){renderer.render(scene,camera);dirty=false}
}
async function init(){
  try{
    renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:"high-performance",stencil:false});
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    updateCamera();resize();window.addEventListener("resize",resize);
    await loadScene();await renderer.compileAsync(scene,camera);renderer.render(scene,camera);
    enter.disabled=false;enter.textContent="Enter arcade";ready=true;renderer.setAnimationLoop(frame);
  }catch(e){
    $("intro").textContent=e.message||"Use a desktop WebGL 2 browser and serve this folder on localhost.";
    enter.textContent="Scene unavailable";console.error(e);
  }
}
canvas.addEventListener("webglcontextlost",()=>{loseFocus();showNotice("Restoring graphics…",8000)});
canvas.addEventListener("webglcontextrestored",()=>{dirty=true;showNotice("Graphics restored")});
init();