import * as T from '../vendor/three.module.min.js';
import {createRenderer,illuminate,loadScene,fitViewport} from './rendering.js';
import {move,sector,start} from './navigation.js';

const el=id=>document.getElementById(id),canvas=el('viewport'),ui=el('interface'),guide=el('controls'),pad=el('touch-walk');
const cam=new T.PerspectiveCamera(58,1,.046,48);cam.rotation.order='YXZ';
const scene=new T.Scene(),keys=new Set();let renderer,obstacles=[],ready=false,locked=false,dragOnly=false,drag=null,touchDrag=null,stick=null;
let x=start.x,z=start.z,yaw=start.yaw,pitch=start.pitch,vx=0,vz=0,joyX=0,joyY=0,oldTime=0,place='',noticeTimer,quietTimer;
const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
function notify(str){
  el('notice').textContent=str;el('notice').classList.add('show');clearTimeout(noticeTimer);
  noticeTimer=setTimeout(()=>el('notice').classList.remove('show'),1800);
}
function setPosition(){
  cam.position.set(x,start.eye,z);cam.rotation.set(pitch,yaw,0,'YXZ');
  const [n,name]=sector(x,z);if(n!==place){el('sector-number').textContent=n;el('sector-name').textContent=name;place=n;}
}
function clearInput(){keys.clear();vx=vz=joyX=joyY=0;stick=null;touchDrag=null;drag=null;pad.firstElementChild.style.transform='';}
function reset(){
  clearInput();x=start.x;z=start.z;yaw=start.yaw;pitch=start.pitch;setPosition();notify('Back at the entrance');
}
function showHelp(open){
  guide.hidden=!open;el('guide').setAttribute('aria-expanded',String(open));
  if(open){
    ui.classList.remove('hidden-hud');if(locked)document.exitPointerLock();clearInput();el('close').focus({preventScroll:true});
  }else canvas.focus({preventScroll:true});
}
function turn(dx,dy,sensitivity=.00205){
  yaw-=dx*sensitivity;pitch=clamp(pitch-dy*sensitivity,-1.43,1.43);
  if(Math.abs(yaw)>1000)yaw%=Math.PI*2;
}
function updateHUD(){
  el('entry-prompt').hidden=locked||!pad.hidden;
  el('walk-hint').hidden=!locked;el('walk-hint').classList.remove('quiet');clearTimeout(quietTimer);
  if(locked)quietTimer=setTimeout(()=>el('walk-hint').classList.add('quiet'),4200);
  el('look-hint').textContent=dragOnly?'Drag to look':'Mouse look';
  el('enter-text').textContent=dragOnly?'Explore hall':'Enter hall';
  canvas.style.cursor=locked?'none':dragOnly?'grab':'crosshair';
}
function fallback(){
  dragOnly=true;locked=false;updateHUD();notify('Drag to look · WASD to walk');
}
function capture(){
  if(!ready||!guide.hidden)return;canvas.focus({preventScroll:true});
  if(dragOnly||!canvas.requestPointerLock){fallback();return;}
  try{
    const p=canvas.requestPointerLock();
    if(p&&typeof p.catch==='function')p.catch(()=>{if(document.pointerLockElement!==canvas)fallback();});
  }catch{fallback();}
}
document.addEventListener('pointerlockchange',()=>{
  locked=document.pointerLockElement===canvas;drag=null;clearInput();updateHUD();
  if(locked)canvas.focus({preventScroll:true});
});
document.addEventListener('pointerlockerror',fallback);
el('enter').addEventListener('click',capture);
el('guide').addEventListener('click',()=>showHelp(guide.hidden));
el('close').addEventListener('click',()=>showHelp(false));
el('reset').addEventListener('click',()=>{if(!ready)return;showHelp(false);reset();});
canvas.addEventListener('contextmenu',e=>e.preventDefault());
canvas.addEventListener('pointerdown',e=>{
  if(!ready)return;e.preventDefault();
  if(!guide.hidden){showHelp(false);return;}
  canvas.focus({preventScroll:true});
  if(e.pointerType==='touch'){
    pad.hidden=false;updateHUD();if(touchDrag!==null)return;
    touchDrag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);return;
  }
  if(locked)return;
  drag={id:e.pointerId,x:e.clientX,y:e.clientY};
  if(e.button===0&&!dragOnly)capture();
  else{canvas.setPointerCapture(e.pointerId);canvas.style.cursor='grabbing';}
});
canvas.addEventListener('pointermove',e=>{
  const active=e.pointerType==='touch'?touchDrag:drag;
  if(!active||e.pointerId!==active.id||locked||!guide.hidden)return;
  turn(e.clientX-active.x,e.clientY-active.y,e.pointerType==='touch'?.0043:.0031);active.x=e.clientX;active.y=e.clientY;
});
function endDrag(e){
  if(touchDrag?.id===e.pointerId)touchDrag=null;
  if(drag?.id===e.pointerId){drag=null;canvas.style.cursor=dragOnly?'grab':'crosshair';}
}
document.addEventListener('pointerup',endDrag);document.addEventListener('pointercancel',endDrag);
document.addEventListener('mousemove',e=>{if(locked&&ready&&guide.hidden)turn(e.movementX||0,e.movementY||0);});
function moveStick(e){
  const r=pad.getBoundingClientRect(),xx=e.clientX-r.x-r.width/2,yy=e.clientY-r.y-r.height/2,scale=Math.min(1,32/Math.max(.01,Math.hypot(xx,yy)));
  joyX=xx*scale/32;joyY=yy*scale/32;pad.firstElementChild.style.transform='translate('+joyX*24+'px,'+joyY*24+'px)';
}
pad.addEventListener('pointerdown',e=>{
  if(stick!==null||!guide.hidden)return;e.preventDefault();stick=e.pointerId;pad.setPointerCapture(stick);moveStick(e);
});
pad.addEventListener('pointermove',e=>{if(e.pointerId===stick)moveStick(e);});
function endStick(e){if(e.pointerId===stick){stick=null;joyX=joyY=0;pad.firstElementChild.style.transform='';}}
pad.addEventListener('pointerup',endStick);pad.addEventListener('pointercancel',endStick);
const navigation=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','PageUp','PageDown','ShiftLeft','ShiftRight']);
document.addEventListener('keydown',e=>{
  if(!ready||e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.key==='?'||(e.code==='F1')){e.preventDefault();if(!e.repeat)showHelp(guide.hidden);return;}
  if(e.code==='Escape'&&!guide.hidden){e.preventDefault();showHelp(false);return;}
  if(!guide.hidden)return;
  if(e.code==='KeyR'&&!e.repeat){e.preventDefault();reset();return;}
  if(e.code==='KeyH'&&!e.repeat){e.preventDefault();ui.classList.toggle('hidden-hud');return;}
  if(navigation.has(e.code)){e.preventDefault();keys.add(e.code);}
});
document.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',clearInput);
document.addEventListener('visibilitychange',()=>{clearInput();oldTime=0;});
function tick(now){
  requestAnimationFrame(tick);if(document.hidden||!ready)return;
  const dt=oldTime?Math.min(.05,Math.max(0,(now-oldTime)/1000)):0;oldTime=now;
  if(guide.hidden){
    yaw+=((+keys.has('ArrowLeft'))-(+keys.has('ArrowRight')))*1.49*dt;
    pitch=clamp(pitch+((+keys.has('PageUp'))-(+keys.has('PageDown')))*1.04*dt,-1.43,1.43);
    let side=(+keys.has('KeyD'))-(+keys.has('KeyA'))+joyX;
    let ahead=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'))-joyY;
    const norm=Math.max(1,Math.hypot(side,ahead));side/=norm;ahead/=norm;
    const speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?3.21:1.89;
    const tx=(side*Math.cos(yaw)-ahead*Math.sin(yaw))*speed,tz=(-side*Math.sin(yaw)-ahead*Math.cos(yaw))*speed;
    const k=1-Math.exp(-(side||ahead?18:25)*dt);vx+=(tx-vx)*k;vz+=(tz-vz)*k;
    if(Math.abs(vx)+Math.abs(vz)>.0007)[x,z]=move(x,z,vx*dt,vz*dt,obstacles);
  }
  setPosition();renderer.render(scene,cam);
}
function failed(message){
  const layer=el('loading');layer.hidden=false;layer.classList.add('failure');layer.classList.remove('ready');
  layer.querySelector('.loading-mark').hidden=true;el('load-message').textContent=message;
}
async function init(){
  try{
    renderer=createRenderer(canvas);fitViewport(renderer,cam);setPosition();
    illuminate(scene,renderer);obstacles=await loadScene(scene,renderer);
    window.addEventListener('resize',()=>fitViewport(renderer,cam),{passive:true});
    await renderer.compileAsync(scene,cam);
    renderer.render(scene,cam);ready=true;el('enter').disabled=false;updateHUD();
    if(matchMedia('(pointer: coarse)').matches){pad.hidden=false;updateHUD();}
    const layer=el('loading');layer.classList.add('ready');setTimeout(()=>{if(ready)layer.hidden=true;},320);
    requestAnimationFrame(tick);
  }catch(err){console.error(err);failed('The hall could not open. Use the localhost launch command in README.md with a current WebGL 2 browser.');}
}
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;clearInput();failed('Graphics context interrupted. Restoring the hall…');});
canvas.addEventListener('webglcontextrestored',()=>location.reload());
init();
