import * as THREE from 'three';
import {buildMarket} from './scene.js';

const canvas=document.querySelector('#world');
const loadStart=performance.now();let startupMs=null;
const startupStages={};
window.addEventListener('error',e=>{const error=document.querySelector('#error');error.hidden=false;error.textContent='The 3D view could not start. Enable hardware acceleration and WebGL 2 in your browser. '+e.message;document.querySelector('#loading')?.remove();});
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
function renderRatio(){return Math.min(devicePixelRatio,1.25,Math.sqrt(1800000/(innerWidth*innerHeight)));}
renderer.setPixelRatio(renderRatio());
renderer.setSize(innerWidth,innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.15;
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const camera=new THREE.PerspectiveCamera(67,innerWidth/innerHeight,.06,90);
camera.rotation.order='YXZ';
const sceneStart=performance.now();const {scene,collision,steams,lights,environmentGenerator}=buildMarket(renderer);startupStages.sceneBuildMs=+(performance.now()-sceneStart).toFixed(1);
const start={x:.1,z:10.2,yaw:0,pitch:-.025};
let yaw=start.yaw,pitch=start.pitch;
camera.position.set(start.x,1.68,start.z);
const keys=new Set();const velocity=new THREE.Vector2();
const welcome=document.querySelector('#welcome');
let entered=false,dragging=false,locked=false,showPerf=false,dragDistance=0;
let last=performance.now(),lastMetrics=last,lastInfo=last;
let frames=[],allSamples=[],distanceWalked=0,elapsed=0,ready=false;
const perfEl=document.querySelector('#performance');
const metricEl=document.querySelector('#metrics');
const radius=.23;

function insideFloor(x,z){return (x>-9.65&&x<9.65&&z>-12.8&&z<12.38)||(x>-1.87&&x<1.87&&z>12.1&&z<15.95)||(x>-1.52&&x<1.52&&z>=-20.2&&z< -12.4)||(x>-3.12&&x<3.12&&z>-25.55&&z<=-19.75);}
function collides(x,z){if(!insideFloor(x,z))return true;for(const b of collision){const cx=Math.max(b.minX,Math.min(x,b.maxX)),cz=Math.max(b.minZ,Math.min(z,b.maxZ));if((x-cx)**2+(z-cz)**2<radius*radius)return true;}return false;}
function move(dx,dz){const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.08));for(let i=0;i<steps;i++){const x=camera.position.x,z=camera.position.z;if(!collides(x+dx/steps,z))camera.position.x+=dx/steps;if(!collides(camera.position.x,z+dz/steps))camera.position.z+=dz/steps;}}
function reset(){camera.position.set(start.x,1.68,start.z);yaw=start.yaw;pitch=start.pitch;velocity.set(0,0);keys.clear();}
function look(dx,dy){yaw-=dx*.0021;pitch=THREE.MathUtils.clamp(pitch-dy*.0021,-1.22,1.22);}
async function enter(){entered=true;welcome.style.display='none';canvas.focus();try{await canvas.requestPointerLock({unadjustedMovement:true});}catch{try{await canvas.requestPointerLock();}catch{document.querySelector('#hint').textContent='WASD walk · Drag to look · R reset';}}}
document.querySelector('#enter').addEventListener('click',enter);
document.querySelector('#reset').addEventListener('click',reset);
document.querySelector('#help').addEventListener('click',()=>{if(locked)document.exitPointerLock();welcome.style.display=welcome.style.display==='none'?'block':'none';});
document.querySelector('#perf-toggle').addEventListener('click',togglePerf);
function togglePerf(){showPerf=!showPerf;perfEl.hidden=!showPerf;}
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===canvas;document.querySelector('#crosshair').style.display=locked?'block':'none';document.querySelector('#hint').textContent=locked?'WASD walk · Shift faster · Esc release · R reset':'WASD walk · Click to capture mouse / drag to look · R reset';});
document.addEventListener('mousemove',e=>{if(locked)look(e.movementX,e.movementY);else if(dragging){dragDistance+=Math.hypot(e.movementX,e.movementY);look(e.movementX,e.movementY);}});
canvas.addEventListener('mousedown',e=>{if(e.button===0&&entered&&!locked){dragging=true;dragDistance=0;canvas.focus();}});
document.addEventListener('mouseup',e=>{if(dragging&&dragDistance<3&&e.target===canvas)enter();dragging=false;});
canvas.addEventListener('dblclick',()=>{if(entered&&!locked)enter();});
canvas.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('keydown',e=>{if(['KeyW','KeyA','KeyS','KeyD','ShiftLeft','ShiftRight','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.code)){keys.add(e.code);e.preventDefault();}if(e.code==='KeyR')reset();if(e.code==='KeyP'&&!e.repeat)togglePerf();});
document.addEventListener('keyup',e=>keys.delete(e.code));
window.addEventListener('blur',()=>{keys.clear();velocity.set(0,0);dragging=false;});
document.addEventListener('visibilitychange',()=>{keys.clear();last=performance.now();});
window.addEventListener('resize',()=>{renderer.setPixelRatio(renderRatio());renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();});

function summary(samples=frames.map(v=>v.ms)){if(!samples.length)return {};const a=[...samples].sort((x,y)=>x-y),avg=samples.reduce((s,v)=>s+v,0)/samples.length;return {samples:samples.length,meanMs:+avg.toFixed(2),medianMs:+a[Math.floor(a.length*.5)].toFixed(2),p95Ms:+a[Math.floor(a.length*.95)].toFixed(2),p99Ms:+a[Math.floor(a.length*.99)].toFixed(2),over33ms:samples.filter(v=>v>33.4).length,over50ms:samples.filter(v=>v>50).length};}
function exportSamples(){const content={name:'After Rain — Lantern Court',timestamp:new Date().toISOString(),viewport:[innerWidth,innerHeight],pixelRatio:renderer.getPixelRatio(),hardware:{renderer:renderer.getContext().getParameter(renderer.getContext().RENDERER)},drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,rolling:summary(),session:summary(allSamples.map(v=>v.ms)),frames:allSamples};const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(content,null,2)],{type:'application/json'}));a.download='lantern-court-frame-times.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
document.querySelector('#export').addEventListener('click',exportSamples);
// Read-only measurements and deterministic collision queries for local verification.
window.market={get position(){return {x:camera.position.x,y:camera.position.y,z:camera.position.z,yaw,pitch};},get measurements(){return {rolling:summary(),session:summary(allSamples.map(v=>v.ms)),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,pixelRatio:renderer.getPixelRatio(),viewport:[innerWidth,innerHeight],distanceWalked:+distanceWalked.toFixed(2),startupMs,startupStages};},get ready(){return ready;},collides,reset,collision,scene,renderer,camera,lights};
if(new URLSearchParams(location.search).has('test'))window.market.testing={setPose(x,z,y=0,p=0){camera.position.set(x,1.68,z);yaw=y;pitch=p;velocity.set(0,0);keys.clear();},move,clearSamples(){frames=[];allSamples=[];},get samples(){return allSamples;}};
function tick(now){const raw=now-last;last=now;const dt=Math.min(raw/1000,.04);elapsed+=dt;
  if(entered&&welcome.style.display==='none'){
    yaw+=(Number(keys.has('ArrowLeft'))-Number(keys.has('ArrowRight')))*dt*1.25;
    pitch=THREE.MathUtils.clamp(pitch+(Number(keys.has('ArrowUp'))-Number(keys.has('ArrowDown')))*dt*.8,-1.22,1.22);
    const axisX=Number(keys.has('KeyD'))-Number(keys.has('KeyA')),axisZ=Number(keys.has('KeyS'))-Number(keys.has('KeyW'));
    const len=Math.hypot(axisX,axisZ)||1,speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?3.3:2.15;
    const goalX=(Math.cos(yaw)*axisX+Math.sin(yaw)*axisZ)/len*speed,goalZ=(-Math.sin(yaw)*axisX+Math.cos(yaw)*axisZ)/len*speed;
    const lerp=1-Math.exp(-15*dt);velocity.x=THREE.MathUtils.lerp(velocity.x,goalX,lerp);velocity.y=THREE.MathUtils.lerp(velocity.y,goalZ,lerp);
    const oldX=camera.position.x,oldZ=camera.position.z;move(velocity.x*dt,velocity.y*dt);distanceWalked+=Math.hypot(camera.position.x-oldX,camera.position.z-oldZ);
  }else velocity.set(0,0);
  camera.rotation.y=yaw;camera.rotation.x=pitch;
  for(const s of steams){const t=(elapsed*.22+s.phase)%1;s.sprite.position.copy(s.origin);s.sprite.position.y+=t*.63;s.sprite.position.x+=Math.sin(t*5+s.phase*3)*.06;s.sprite.scale.setScalar(.12+t*.29);s.sprite.material.opacity=Math.sin(t*Math.PI)*.11;}
  renderer.render(scene,camera);
  if(ready&&raw<500&&raw>0){const f={ms:+raw.toFixed(3),time:+(now/1000).toFixed(2),x:+camera.position.x.toFixed(2),z:+camera.position.z.toFixed(2)};frames.push(f);allSamples.push(f);if(allSamples.length>36000)allSamples.shift();while(frames.length&&frames[0].time<now/1000-10)frames.shift();}
  if(now-lastMetrics>600){lastMetrics=now;if(showPerf){const m=summary();metricEl.innerHTML=`Mean ${m.meanMs??'—'} ms · Median ${m.medianMs??'—'} ms<br>P95 ${m.p95Ms??'—'} ms · P99 ${m.p99Ms??'—'} ms<br>Frames > 33 ms: ${m.over33ms??0} / ${m.samples??0}<br>${renderer.info.render.calls} draws · ${Math.round(renderer.info.render.triangles/1000)}k triangles<br>Render ${canvas.width} × ${canvas.height}`;}}
  if(now-lastInfo>500){lastInfo=now;const zone=camera.position.z< -20?'THE LATE CUP':camera.position.z< -12.4?'COVERED PASSAGE':'COURTYARD';document.querySelector('#location').innerHTML=`${zone}<span>23:18 / AFTER THE RAIN</span>`;}
  requestAnimationFrame(tick);
}
async function startScene(){const compileStart=performance.now();await renderer.compileAsync(scene,camera);startupStages.shaderCompileMs=+(performance.now()-compileStart).toFixed(1);const firstFrameStart=performance.now();renderer.render(scene,camera);renderer.shadowMap.autoUpdate=false;startupStages.firstRenderMs=+(performance.now()-firstFrameStart).toFixed(1);
  const reflectStart=performance.now();const reflectionTarget=new THREE.WebGLCubeRenderTarget(256,{type:THREE.HalfFloatType});const probe=new THREE.CubeCamera(.1,70,reflectionTarget);probe.position.set(0,1.9,-1);
  // Capture geometric surroundings with simple diffuse proxies. This avoids compiling
  // the full physical-lighting shader family a second time for the cube render target.
  const restore=[],proxies=new Map();scene.traverse(o=>{if(!o.isMesh)return;const m=o.material;if(m.isShaderMaterial||m.isMeshBasicMaterial)return;if(m.transparent){restore.push({o,visible:o.visible});o.visible=false;return;}let proxy=proxies.get(m.uuid);if(!proxy){const color=m.color.clone().multiplyScalar(.7);if(m.emissive)color.add(m.emissive.clone().multiplyScalar(m.emissiveIntensity||0));proxy=new THREE.MeshBasicMaterial({color,map:m.map,side:m.side});proxies.set(m.uuid,proxy);}restore.push({o,material:m});o.material=proxy;});
  probe.update(renderer,scene);for(const r of restore){if(r.material)r.o.material=r.material;else r.o.visible=r.visible;}for(const m of proxies.values())m.dispose();
  const reflection=environmentGenerator.fromCubemap(reflectionTarget.texture);scene.environment.dispose();scene.environment=reflection.texture;scene.environmentIntensity=.48;reflectionTarget.dispose();environmentGenerator.dispose();renderer.render(scene,camera);startupStages.reflectionCaptureMs=+(performance.now()-reflectStart).toFixed(1);
  startupMs=+(performance.now()-loadStart).toFixed(1);ready=true;last=performance.now();document.querySelector('#loading').style.opacity=0;setTimeout(()=>document.querySelector('#loading').remove(),650);requestAnimationFrame(tick);}
startScene().catch(e=>{console.error(e);const error=document.querySelector('#error');error.hidden=false;error.textContent='The market could not start. This scene needs a browser with WebGL 2 enabled. '+e.message;document.querySelector('#loading').remove();});
