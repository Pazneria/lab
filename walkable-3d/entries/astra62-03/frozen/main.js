import {createView} from './view.js';
import {initialBody,moveBody,floorHeight,placeName} from './walk.js';

const $=id=>document.getElementById(id);
const canvas=$('view'),panel=$('explorePanel'),controls=$('controls'),status=$('status');
const keys=new Set(),body=initialBody();
let view,ready=false,mode='idle',dirty=true,previous=0,lastHeading='',lastArea='',noticeTimer=0;
let drag=null,stick=null,stickX=0,stickY=0,capturePending=false;
const walkingKeys=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight']);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function tell(text){
  $('notice').textContent=text;clearTimeout(noticeTimer);
  if(text)noticeTimer=setTimeout(()=>{$('notice').textContent=''},1800);
}
function progress(n,text){
  $('progressFill').style.width=Math.round(n*100)+'%';$('statusText').textContent=text;
}
function clearStick(){
  stick=null;stickX=stickY=0;$('touchPad').firstElementChild.style.transform='';
}
function setMode(next){
  mode=next;panel.hidden=!ready||next!=='idle';$('walkHint').hidden=!ready||next==='idle'||next==='touch';
  document.body.classList.toggle('touching',next==='touch');
  if(next==='idle'){drag=null;keys.clear();clearStick();document.body.classList.remove('hud-off')}
  if(next==='drag')$('walkHint').innerHTML='<span>W A S D</span> &nbsp;move <i>·</i> drag &nbsp;look <i>·</i> esc &nbsp;pause';
  else $('walkHint').innerHTML='<span>W A S D</span> &nbsp;move <i>·</i> mouse &nbsp;look <i>·</i> esc &nbsp;release';
  dirty=true;
}
function openHelp(show){
  $('keys').hidden=!show;$('help').setAttribute('aria-expanded',String(show));
}
function activate(touch=false){
  if(!ready)return;
  canvas.focus({preventScroll:true});openHelp(false);
  if(touch){setMode('touch');tell('Left pad to walk · drag to look');return}
  if(document.pointerLockElement===canvas||capturePending)return;
  setMode('drag');
  if(!canvas.requestPointerLock)return;
  capturePending=true;
  try{
    const pending=canvas.requestPointerLock();
    if(pending && typeof pending.catch==='function')pending.catch(()=>{capturePending=false;if(document.pointerLockElement!==canvas){setMode('drag');tell('Drag to look around')}});
  }catch{capturePending=false;setMode('drag')}
}
function look(dx,dy,scale=.00205){
  body.yaw-=dx*scale;body.pitch=clamp(body.pitch-dy*scale,-1.46,1.52);
  // Keep very long inspection sessions numerically well conditioned.
  if(Math.abs(body.yaw)>Math.PI*8)body.yaw%=Math.PI*2;
  dirty=true;
}
function updateCamera(){
  const cam=view.camera;
  cam.position.set(body.x,body.eye,body.z);cam.rotation.set(body.pitch,body.yaw,0,'YXZ');
  const deg=((Math.round(-body.yaw*180/Math.PI)%360)+360)%360;
  const hd=String(deg).padStart(3,'0')+'° '+['N','NE','E','SE','S','SW','W','NW'][Math.round(deg/45)%8];
  if(hd!==lastHeading){$('heading').textContent=hd;$('needle').style.transform='rotate('+(-deg)+'deg)';lastHeading=hd}
  const area=placeName(body.x,body.z);if(lastArea!==area){$('area').textContent=area;lastArea=area}
}
function reset(){
  Object.assign(body,initialBody());keys.clear();clearStick();dirty=true;updateCamera();tell('Returned to south passage');
}
function frame(time){
  if(!ready)return;
  const dt=previous?Math.min((time-previous)/1000,.05):0;previous=time;
  if(document.hidden)return;
  if(mode!=='idle'){
    const turn=Number(keys.has('ArrowLeft'))-Number(keys.has('ArrowRight'));
    const pitch=Number(keys.has('ArrowUp'))-Number(keys.has('ArrowDown'));
    if(turn||pitch){
      body.yaw+=turn*dt*1.52;body.pitch=clamp(body.pitch+pitch*dt*1.12,-1.46,1.52);
    }
    let forward=Number(keys.has('KeyW'))-Number(keys.has('KeyS'))-stickY;
    let side=Number(keys.has('KeyD'))-Number(keys.has('KeyA'))+stickX;
    const magnitude=Math.hypot(forward,side),speed=(keys.has('ShiftLeft')||keys.has('ShiftRight'))?3.62:2.24;
    if(magnitude>.001){
      const step=speed*dt/Math.max(1,magnitude);forward*=step;side*=step;
      const sin=Math.sin(body.yaw),cos=Math.cos(body.yaw);
      moveBody(body,-sin*forward+cos*side,-cos*forward-sin*side);
    }
    const target=floorHeight(body.x,body.z)+1.63;
    body.eye+=(target-body.eye)*(1-Math.exp(-dt*15));
  }
  if(dirty||mode!=='idle'){updateCamera();view.draw();dirty=false}
}
$('enter').addEventListener('click',()=>activate(matchMedia('(pointer:coarse)').matches));
$('reset').addEventListener('click',()=>{if(ready)reset()});
$('help').addEventListener('click',()=>openHelp($('keys').hidden));
document.addEventListener('pointerlockchange',()=>{
  capturePending=false;
  if(document.pointerLockElement===canvas){drag=null;setMode('locked')}
  else if(mode==='locked'){setMode('idle');$('enterLabel').textContent='Resume exploration'}
});
document.addEventListener('pointerlockerror',()=>{capturePending=false;if(ready && document.pointerLockElement!==canvas)setMode('drag')});
document.addEventListener('mousemove',e=>{if(mode==='locked')look(e.movementX,e.movementY)});
canvas.addEventListener('pointerdown',e=>{
  if(!ready || (e.button!==0 && e.pointerType==='mouse'))return;
  if(e.pointerType==='touch'){
    if(mode!=='touch')activate(true);
    if(drag===null){drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId)}
    return;
  }
  if(mode==='idle')activate(false);
  if(mode==='drag' && document.pointerLockElement!==canvas){drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId)}
});
canvas.addEventListener('pointermove',e=>{
  if(!drag||drag.id!==e.pointerId||mode==='locked')return;
  look(e.clientX-drag.x,e.clientY-drag.y,e.pointerType==='touch'?.0036:.0031);
  drag.x=e.clientX;drag.y=e.clientY;
});
function releaseDrag(e){if(drag && drag.id===e.pointerId)drag=null}
for(const evt of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(evt,releaseDrag);
const pad=$('touchPad');
function updateStick(e){
  const bounds=pad.getBoundingClientRect(),dx=(e.clientX-bounds.left-bounds.width/2)/34,dy=(e.clientY-bounds.top-bounds.height/2)/34;
  const mag=Math.max(1,Math.hypot(dx,dy));stickX=dx/mag;stickY=dy/mag;
  pad.firstElementChild.style.transform='translate('+(stickX*28)+'px,'+(stickY*28)+'px)';
}
pad.addEventListener('pointerdown',e=>{if(stick!==null)return;e.preventDefault();stick=e.pointerId;pad.setPointerCapture(stick);updateStick(e)});
pad.addEventListener('pointermove',e=>{if(stick===e.pointerId)updateStick(e)});
for(const evt of ['pointerup','pointercancel','lostpointercapture'])pad.addEventListener(evt,e=>{if(stick===e.pointerId)clearStick()});
document.addEventListener('keydown',e=>{
  if(!ready||e.ctrlKey||e.altKey||e.metaKey)return;
  if(walkingKeys.has(e.code)){
    e.preventDefault();if(mode==='idle' && !e.code.startsWith('Shift')){setMode('drag');canvas.focus({preventScroll:true})}
    keys.add(e.code);return;
  }
  if(e.repeat)return;
  if(e.code==='KeyR'){e.preventDefault();reset()}
  else if(e.code==='KeyH')document.body.classList.toggle('hud-off');
  else if(e.key==='?'||e.code==='F1'){e.preventDefault();document.body.classList.remove('hud-off');openHelp($('keys').hidden)}
  else if(e.code==='Escape' && mode!=='locked'){setMode('idle');openHelp(false)}
  else if(e.code==='KeyE' && mode!=='locked')activate(false);
});
document.addEventListener('keyup',e=>keys.delete(e.code));
function unfocus(){
  keys.clear();drag=null;clearStick();previous=0;
  if(mode==='locked'&&document.pointerLockElement===canvas)document.exitPointerLock();
  if(ready)setMode('idle');
}
window.addEventListener('blur',unfocus);
document.addEventListener('visibilitychange',()=>{if(document.hidden)unfocus();else{previous=0;dirty=true}});
window.addEventListener('resize',()=>{if(view){view.resize();dirty=true}});
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;setMode('idle');controls.hidden=true;status.hidden=false;progress(.18,'Restoring the graphics context…')});
canvas.addEventListener('webglcontextrestored',()=>{if(view){view.invalidateShadow();ready=true;setMode('idle');status.hidden=true;controls.hidden=false;previous=0}});
window.addEventListener('pagehide',()=>{clearTimeout(noticeTimer);if(view)view.renderer.setAnimationLoop(null)});
window.addEventListener('pageshow',e=>{if(e.persisted && view){previous=0;dirty=true;view.renderer.setAnimationLoop(frame)}});
async function start(){
  try{
    view=await createView(canvas,progress,body);ready=true;status.hidden=true;controls.hidden=false;
    $('inputHint').textContent=matchMedia('(pointer:coarse)').matches?'Left pad to walk · drag to look':'W A S D to walk · mouse to look';
    setMode('idle');updateCamera();view.renderer.setAnimationLoop(frame);
  }catch(error){
    console.error(error);status.hidden=false;panel.hidden=true;controls.hidden=true;$('progressFill').style.width='0';
    const text=/WebGL/i.test(error.message)?'WebGL 2 is required. Enable hardware acceleration and reload.':error.message;
    $('statusText').textContent='Could not open the observatory. '+text;
  }
}
start();
