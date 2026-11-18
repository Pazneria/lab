import {createRenderer} from './render.mjs';
import {collisionMap,reset,turn,advance,basis} from './movement.mjs';
const $=s=>document.querySelector(s),canvas=$('#view'),enter=$('#enter'),resetButton=$('#reset');
const status=$('#status'),roomName=$('#room-name'),roomNum=$('#room-num'),dragHint=$('#drag-hint');
const walker=reset({}),keys=new Set();
let renderer,map,walking=false,hadLock=false,drag=null,dirty=true,last=0,scheduled=false,lastZone='';
const codes=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','PageUp','PageDown','ShiftLeft','ShiftRight']);
function key(...ids){return ids.some(id=>keys.has(id))?1:0;}
function setRoom(){
  const zone=walker.z>3.8?'Entrance gallery':walker.z< -5.6?'Sculpture hall':'Connecting ramp';
  if(zone!==lastZone){roomName.textContent=zone;roomNum.textContent=zone==='Entrance gallery'?'01':zone==='Sculpture hall'?'02':'↗';lastZone=zone;}
}
function queue(){if(!scheduled && renderer && !document.hidden){scheduled=true;requestAnimationFrame(tick);}}
function invalidate(){dirty=true;queue();}
function tick(t){
  scheduled=false;
  if(document.hidden || !renderer)return;
  const dt=last?Math.min(.055,(t-last)/1000):1/60;last=t;
  if(walking){
    const x=walker.x,z=walker.z,yaw=walker.yaw,pitch=walker.pitch;
    advance(walker,{side:key('KeyD')-key('KeyA'),forward:key('KeyW','ArrowUp')-key('KeyS','ArrowDown'),
      turn:key('ArrowRight')-key('ArrowLeft'),tilt:key('PageUp')-key('PageDown'),fast:key('ShiftLeft','ShiftRight')},dt,map);
    dirty ||= x!==walker.x || z!==walker.z || yaw!==walker.yaw || pitch!==walker.pitch;
    setRoom();
  }
  if(dirty){renderer.draw(basis(walker));dirty=false;}
  if(walking)queue();
}
function pause(){
  if(!walking)return;
  walking=false;drag=null;keys.clear();walker.vx=0;walker.vz=0;last=0;
  if(document.pointerLockElement===canvas)document.exitPointerLock();
  document.body.dataset.state='paused';enter.innerHTML='Resume walk <span aria-hidden="true">↗</span>';
  status.textContent='';invalidate();
}
function begin(lock){
  if(!renderer)return;
  walking=true;last=0;document.body.dataset.state='walking';$('#more').open=false;
  canvas.focus({preventScroll:true});dragHint.hidden=document.pointerLockElement===canvas;
  if(lock && canvas.requestPointerLock && document.pointerLockElement!==canvas){
    try{
      const capture=canvas.requestPointerLock();
      if(capture?.catch)capture.catch(()=>{dragHint.hidden=false;});
    }catch{dragHint.hidden=false;}
  }
  invalidate();
}
function resetView(){
  reset(walker);keys.clear();setRoom();invalidate();
  if(!walking && renderer)status.textContent='At the entrance.';
}
function look(dx,dy){
  if(!walking||!Number.isFinite(dx)||!Number.isFinite(dy))return;
  turn(walker,dx*.00205,-dy*.00205);invalidate();
}
enter.addEventListener('click',()=>begin(true));
resetButton.addEventListener('click',resetView);
document.addEventListener('pointerlockchange',()=>{
  const lock=document.pointerLockElement===canvas;
  if(hadLock&&!lock)pause();
  hadLock=lock;drag=null;dragHint.hidden=lock;
});
document.addEventListener('pointerlockerror',()=>{dragHint.hidden=false;});
document.addEventListener('mousemove',e=>{if(document.pointerLockElement===canvas)look(e.movementX,e.movementY);});
canvas.addEventListener('pointerdown',e=>{
  if(e.button!==0||!renderer)return;
  if(!walking)begin(e.pointerType==='mouse');
  if(document.pointerLockElement!==canvas){
    drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);
  }
});
canvas.addEventListener('pointermove',e=>{
  if(!drag||drag.id!==e.pointerId||document.pointerLockElement===canvas)return;
  look(e.clientX-drag.x,e.clientY-drag.y);drag.x=e.clientX;drag.y=e.clientY;
});
for(const name of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(name,()=>{drag=null;});
window.addEventListener('keydown',e=>{
  if(!renderer||e.ctrlKey||e.altKey||e.metaKey)return;
  if(e.code==='Escape'){pause();return;}
  if(e.code==='KeyR'){e.preventDefault();if(!e.repeat)resetView();return;}
  if(e.code==='KeyH'){if(walking&&!e.repeat)document.body.dataset.hideHud=document.body.dataset.hideHud==='true'?'false':'true';return;}
  if(!codes.has(e.code))return;
  e.preventDefault();
  if(!walking && !e.code.startsWith('Shift'))begin(false);
  keys.add(e.code);queue();
});
window.addEventListener('keyup',e=>keys.delete(e.code));
window.addEventListener('blur',pause);
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();else invalidate();});
function resize(){if(renderer?.resize())invalidate();}
window.addEventListener('resize',resize);
if(globalThis.ResizeObserver)new ResizeObserver(resize).observe(canvas);
canvas.addEventListener('webglcontextlost',e=>{
  e.preventDefault();pause();renderer=null;enter.disabled=resetButton.disabled=true;
  document.body.dataset.state='paused';status.textContent='Graphics context interrupted. Waiting for the browser to restore it…';
});
canvas.addEventListener('webglcontextrestored',()=>location.reload());
try{
  renderer=await createRenderer(canvas);map=collisionMap(renderer.meta.obstacles);
  document.body.dataset.state='ready';status.textContent='';enter.disabled=resetButton.disabled=false;
  setRoom();invalidate();
}catch(e){
  document.body.dataset.state='error';
  status.textContent=location.protocol==='file:'?'Launch the included local server, then open its localhost address.':('Could not open the gallery. '+e.message);
  console.error(e);
}
