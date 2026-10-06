import * as THREE from 'three';
import {buildScene} from './scene.js';
import {START,ALCOVE,STAIR,GALLERY,inside,groundHeight,canOccupy} from './layout.js';

const $=id=>document.getElementById(id);
const canvas=$('scene');const scene=new THREE.Scene();
let renderer;
try{
  renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance',alpha:false});
}catch(error){
  $('loading').hidden=true;$('error').hidden=false;$('error').textContent='This scene needs WebGL 2. Enable browser hardware acceleration and reload. '+error.message;throw error;
}
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
const camera=new THREE.PerspectiveCamera(66,window.innerWidth/window.innerHeight,.055,180);camera.rotation.order='YXZ';
const keys=new Set();const player={x:START.x,z:START.z,footY:0,eyeY:1.66,yaw:START.yaw,pitch:START.pitch,vx:0,vz:0};
let active=false,started=false,dragging=false,lastPointer=null,quality='balanced',buildInfo;
const samples=[];let lastFrame=performance.now(),lastStats=0,location='';

function resize(){
  const ratio=Math.min(window.devicePixelRatio||1,quality==='high'?1.75:quality==='low'?1:1.4);
  renderer.setPixelRatio(ratio);renderer.setSize(window.innerWidth,window.innerHeight,false);camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();
}
resize();window.addEventListener('resize',resize);
function reset(){Object.assign(player,{x:START.x,z:START.z,footY:0,eyeY:1.66,yaw:START.yaw,pitch:START.pitch,vx:0,vz:0});keys.clear();syncCamera();}
function syncCamera(){camera.position.set(player.x,player.eyeY,player.z);camera.rotation.set(player.pitch,player.yaw,0);}
reset();

async function capture(){
  started=true;active=true;$('welcome').hidden=true;$('pause').hidden=true;document.body.classList.add('exploring');
  try{await canvas.requestPointerLock();}catch{
    // Ordinary drag look remains available in browsers that refuse pointer lock.
    active=true;$('pause').hidden=true;
  }
}
$('enter').addEventListener('click',capture);$('resume').addEventListener('click',capture);
canvas.addEventListener('click',()=>{if(!dragging)capture();});
document.addEventListener('pointerlockchange',()=>{
  const locked=document.pointerLockElement===canvas;
  if(locked){active=true;$('pause').hidden=true;document.body.classList.add('exploring');}
  else if(started){active=false;keys.clear();player.vx=player.vz=0;$('pause').hidden=false;document.body.classList.remove('exploring');}
});
canvas.addEventListener('pointerdown',event=>{if(event.button===0&&document.pointerLockElement!==canvas){dragging=true;lastPointer=[event.clientX,event.clientY];canvas.setPointerCapture(event.pointerId);if(started){active=true;$('pause').hidden=true;}}});
canvas.addEventListener('pointerup',()=>{dragging=false;lastPointer=null;});
document.addEventListener('mousemove',event=>{
  let dx=0,dy=0;if(document.pointerLockElement===canvas){dx=event.movementX;dy=event.movementY;}else if(dragging&&lastPointer){dx=event.clientX-lastPointer[0];dy=event.clientY-lastPointer[1];lastPointer=[event.clientX,event.clientY];}else return;
  player.yaw-=dx*.0019;player.pitch=Math.max(-1.46,Math.min(1.46,player.pitch-dy*.0019));
});
document.addEventListener('keydown',event=>{
  if(event.target instanceof HTMLSelectElement)return;
  if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','Space'].includes(event.code))event.preventDefault();
  if(event.repeat){keys.add(event.code);return;}keys.add(event.code);
  if(event.code==='KeyR')reset();
  if(event.code==='KeyH')$('help-panel').hidden=!$('help-panel').hidden;
  if(event.code==='KeyF')$('stats').hidden=!$('stats').hidden;
  if(event.code==='Escape'&&document.pointerLockElement!==canvas&&started){active=false;keys.clear();$('pause').hidden=false;document.body.classList.remove('exploring');}
});
document.addEventListener('keyup',event=>keys.delete(event.code));
window.addEventListener('blur',()=>{keys.clear();player.vx=player.vz=0;});
document.addEventListener('visibilitychange',()=>{keys.clear();lastFrame=performance.now();});
$('reset').addEventListener('click',reset);$('help').addEventListener('click',()=>{$('help-panel').hidden=!$('help-panel').hidden;});
$('stats-toggle').addEventListener('click',()=>{$('stats').hidden=!$('stats').hidden;});
$('quality').addEventListener('change',()=>{
  quality=$('quality').value;const sun=scene.userData.sun;const size=quality==='high'?4096:quality==='low'?1024:2048;
  sun.shadow.mapSize.set(size,size);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null;}
  renderer.shadowMap.enabled=quality!=='low';sun.shadow.needsUpdate=true;renderer.shadowMap.needsUpdate=true;resize();samples.length=0;
});
function stepMovement(dt){
  let forward=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0);
  let strafe=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);
  const length=Math.hypot(forward,strafe);if(length){forward/=length;strafe/=length;}
  const speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?3.1:1.85;
  const wantedX=(-Math.sin(player.yaw)*forward+Math.cos(player.yaw)*strafe)*speed;
  const wantedZ=(-Math.cos(player.yaw)*forward-Math.sin(player.yaw)*strafe)*speed;
  const smoothing=1-Math.exp(-dt*15);player.vx+=(wantedX-player.vx)*smoothing;player.vz+=(wantedZ-player.vz)*smoothing;
  // Short movement subdivisions prevent tunnelling through thin posts and stair rails.
  const subdivisions=Math.max(1,Math.ceil(Math.hypot(player.vx,player.vz)*dt/.07));
  for(let i=0;i<subdivisions;i++){
    const dx=player.vx*dt/subdivisions,dz=player.vz*dt/subdivisions;
    let x=player.x+dx,y=groundHeight(x,player.z,player.footY);
    if(canOccupy(x,player.z,y)&&Math.abs(y-player.footY)<.28){player.x=x;player.footY=y;}else player.vx=0;
    let z=player.z+dz;y=groundHeight(player.x,z,player.footY);
    if(canOccupy(player.x,z,y)&&Math.abs(y-player.footY)<.28){player.z=z;player.footY=y;}else player.vz=0;
  }
  // The collision surface is a continuous stair ramp; the visible construction has real risers.
  const eye=player.footY+1.66;player.eyeY+=(eye-player.eyeY)*(1-Math.exp(-dt*20));
}
function updateLocation(){
  let next='Lower reading room';
  if(player.footY>3.3)next=player.x>-3.4?'Gallery overlook':'Upper gallery';
  else if(player.footY>.03)next='Broad staircase';
  else if(inside(player.x,player.z,ALCOVE,-.1))next='Window reading alcove';
  else if(player.x<-3.8&&player.z>3)next='Lower collections';
  else if(player.x<-3.6&&player.z<-3)next='Quiet reading corner';
  if(next!==location){location=next;$('location').textContent=location;}
}
function updateStats(now){
  if($('stats').hidden||now-lastStats<350)return;lastStats=now;
  const values=samples.map(x=>x.dt).sort((a,b)=>a-b),mean=values.reduce((a,b)=>a+b,0)/Math.max(values.length,1);
  const p50=values[Math.floor(values.length*.5)]||0,p95=values[Math.min(values.length-1,Math.floor(values.length*.95))]||0;
  $('stats-readout').innerHTML=`Mean ${mean.toFixed(1)} ms · ${(1000/mean).toFixed(0)} fps<br>Median ${p50.toFixed(1)} ms · p95 ${p95.toFixed(1)} ms<br>${renderer.info.render.calls} draws · ${Math.round(renderer.info.render.triangles/1000)}k triangles`;
  const ctx=$('frame-chart').getContext('2d');ctx.clearRect(0,0,230,62);ctx.fillStyle='#16231d';ctx.fillRect(0,0,230,62);
  for(const ms of[16.7,33.3]){const y=62-ms/50*62;ctx.strokeStyle='#b9c19b25';ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(230,y);ctx.stroke();}
  ctx.strokeStyle='#d6bd7e';ctx.lineWidth=1;ctx.beginPath();samples.forEach((sample,i)=>{const x=i/Math.max(samples.length-1,1)*230,y=62-Math.min(sample.dt,50)/50*62;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();
}
function animate(now){
  requestAnimationFrame(animate);const elapsed=now-lastFrame;lastFrame=now;
  if(elapsed>0&&elapsed<500&&document.visibilityState==='visible'){samples.push({t:now,dt:elapsed});while(samples.length&&now-samples[0].t>5000)samples.shift();}
  const dt=Math.min(.04,Math.max(0,elapsed/1000));if(active)stepMovement(dt);
  syncCamera();updateLocation();renderer.render(scene,camera);updateStats(now);
}

// Yield once so the loading indicator paints before deterministic procedural asset construction.
requestAnimationFrame(()=>{
  try{
    buildInfo=buildScene(scene);scene.userData.buildInfo=buildInfo;reset();$('loading').hidden=true;lastFrame=performance.now();requestAnimationFrame(animate);
  }catch(error){$('loading').hidden=true;$('error').hidden=false;$('error').textContent='The reading house could not finish loading. '+error.message;console.error(error);}
});
canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();active=false;$('error').hidden=false;$('error').textContent='The graphics context was interrupted. Reload this page to return to the library.';});
