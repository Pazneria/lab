import * as THREE from 'three';
import { createWorld } from './world.js';
import { movePlayer, roomAt, EYE_HEIGHT } from './navigation.js';

const $=id=>document.getElementById(id);
const canvas=$('scene');
let renderer,world,camera,active=false,entered=false,drag=false,lowQuality=false,needsRender=true;
let yaw=0,pitch=0,lastTime=0,messageTimer,roomName='';
const keys=new Set(),velocity=new THREE.Vector2(),position={x:0,z:0};
const fpsSamples=[];

function message(text,duration=3500){$('message').textContent=text;$('message').classList.add('visible');clearTimeout(messageTimer);messageTimer=setTimeout(()=>$('message').classList.remove('visible'),duration);}
function syncCamera(){camera.position.set(position.x,EYE_HEIGHT,position.z);camera.rotation.set(pitch,yaw,0,'YXZ');}
function reset(){Object.assign(position,{x:world.spawn.x,z:world.spawn.z});yaw=world.spawn.yaw;pitch=world.spawn.pitch;velocity.set(0,0);keys.clear();syncCamera();needsRender=true;if(entered)message('Back at the entrance.');}
function resize(){renderer.setPixelRatio(Math.min(devicePixelRatio,lowQuality?1:1.5));renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();needsRender=true;}
function quality(){lowQuality=!lowQuality;$('quality').textContent=`Quality: ${lowQuality?'Light':'High'}`;world.lights.sky.shadow.mapSize.set(lowQuality?1024:2048,lowQuality?1024:2048);if(world.lights.sky.shadow.map){world.lights.sky.shadow.map.dispose();world.lights.sky.shadow.map=null;}renderer.shadowMap.needsUpdate=true;resize();message(lowQuality?'Light quality: lower resolution and shadow size.':'High quality: sharper resolution and shadows.');}
function setHelp(visible){$('help-panel').hidden=!visible;keys.clear();velocity.set(0,0);if(visible){document.exitPointerLock?.();active=false;document.body.classList.remove('exploring');}}
function capture(){
  entered=true;active=true;document.body.classList.add('entered','exploring');$('welcome').hidden=true;$('help-panel').hidden=true;
  try{const request=canvas.requestPointerLock?.();request?.catch(()=>message('Hold the left mouse button to look. WASD moves.'));}catch{message('Hold the left mouse button to look. WASD moves.');}
  canvas.focus();
}
function look(dx,dy){yaw-=dx*.0019;pitch=THREE.MathUtils.clamp(pitch-dy*.0019,-1.42,1.42);}

async function init(){
  try{
    renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance',alpha:false});
    renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.10;
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
    camera=new THREE.PerspectiveCamera(68,innerWidth/innerHeight,.055,60);canvas.tabIndex=0;
    world=createWorld();reset();resize();
    $('enter').disabled=false;$('enter').textContent='Step inside';
    // Diagnostics are opt-in read-only data, not a performance claim.
    window.cottage={version:'1.0.0',geometry:world.stats,get position(){return {...position,y:EYE_HEIGHT}},get frameTimes(){return [...fpsSamples]},get drawCalls(){return renderer.info.render.calls},reset};
    requestAnimationFrame(frame);
  }catch(error){$('welcome').hidden=true;$('error').hidden=false;$('error-text').textContent=error.message;console.error(error);}
}

function frame(time){
  requestAnimationFrame(frame);
  const rawFrameMs=time-lastTime;const dt=Math.min(rawFrameMs/1000||.016,.045);lastTime=time;
  if(document.hidden)return;
  if(active&&$('help-panel').hidden){
    let side=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);
    let forward=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0);
    const length=Math.hypot(side,forward);if(length){side/=length;forward/=length;}
    const speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?2.4:1.55;
    const targetX=(Math.cos(yaw)*side-Math.sin(yaw)*forward)*speed;
    const targetZ=(-Math.sin(yaw)*side-Math.cos(yaw)*forward)*speed;
    const blend=1-Math.exp(-dt*16);velocity.x+=(targetX-velocity.x)*blend;velocity.y+=(targetZ-velocity.y)*blend;
    movePlayer(position,velocity.x*dt,velocity.y*dt,world.colliders);
  }else velocity.set(0,0);
  syncCamera();
  const room=roomAt(position.x,position.z);if(room.name!==roomName){roomName=room.name;$('room-name').textContent=room.name;$('room-description').textContent=room.description;$('room-number').textContent=room.number;}
  if(active||needsRender){renderer.render(world.scene,camera);needsRender=false;}
  // Only record timing if the inspector explicitly asks for it using ?timing=1.
  if(location.search.includes('timing=1')&&active){fpsSamples.push(rawFrameMs);if(fpsSamples.length>600)fpsSamples.shift();}
}

$('enter').addEventListener('click',capture);$('resume').addEventListener('click',capture);
$('reset').addEventListener('click',()=>reset());$('quality').addEventListener('click',quality);$('help').addEventListener('click',()=>setHelp($('help-panel').hidden));
canvas.addEventListener('click',()=>{if(entered&&$('help-panel').hidden&&!document.pointerLockElement)capture();});
canvas.addEventListener('mousedown',e=>{if(entered&&e.button===0){drag=true;active=true;}});
window.addEventListener('mouseup',()=>{drag=false;});
window.addEventListener('mousemove',e=>{if(active&&(document.pointerLockElement===canvas||drag))look(e.movementX,e.movementY);});
document.addEventListener('pointerlockchange',()=>{
  keys.clear();velocity.set(0,0);
  if(document.pointerLockElement===canvas){active=true;document.body.classList.add('exploring');}
  else{active=false;drag=false;document.body.classList.remove('exploring');if(entered&&$('help-panel').hidden)message('Mouse released. Click the scene to continue.');}
});
document.addEventListener('pointerlockerror',()=>{active=true;message('Hold the left mouse button to look. WASD moves.');});
window.addEventListener('keydown',e=>{
  if(!world||e.ctrlKey||e.metaKey||e.altKey)return;
  if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();
  if(e.repeat)return;
  if(e.code==='KeyR'){reset();return;}if(e.code==='KeyH'&&entered){setHelp($('help-panel').hidden);return;}if(e.code==='KeyQ'){quality();return;}
  if(e.code==='Escape'){keys.clear();drag=false;active=false;document.body.classList.remove('exploring');return;}
  keys.add(e.code);
});
window.addEventListener('keyup',e=>keys.delete(e.code));
window.addEventListener('blur',()=>{keys.clear();velocity.set(0,0);drag=false;active=false;});
document.addEventListener('visibilitychange',()=>{keys.clear();velocity.set(0,0);lastTime=performance.now();});
window.addEventListener('resize',()=>{if(renderer)resize();});
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();active=false;$('error').hidden=false;$('error-text').textContent='The graphics context was lost. Reload this page to restore the cottage.';});
init();
