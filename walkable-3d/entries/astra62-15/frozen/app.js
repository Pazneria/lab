import {createRenderer} from './render.mjs'
import {entrance,eyeHeight,slide} from './movement.mjs'
const root=document.querySelector('#rooms'),canvas=document.querySelector('#view'),enter=document.querySelector('#enter'),reset=document.querySelector('#reset'),hint=document.querySelector('#hint'),err=document.querySelector('#error'),stick=document.querySelector('#stick')
const state={...entrance},keys=new Set()
let engine,active=false,locked=false,drag=null,touchId=null,joyX=0,joyY=0,vx=0,vz=0,last=0,anim=0,hintTimer=0,lost=false
const coarse=matchMedia('(pointer: coarse)').matches
if(coarse){root.classList.add('touch');document.querySelector('.legend').textContent='Left pad to walk  ·  Drag the room to look  ·  ↺ to return'}
function clearInput(){keys.clear();vx=vz=joyX=joyY=0;drag=null;touchId=null;stick.firstElementChild.style.transform=''}
function tell(message,ms=4600){hint.textContent=message;root.classList.add('hints');clearTimeout(hintTimer);hintTimer=setTimeout(()=>root.classList.remove('hints'),ms)}
function setActive(on){active=on;root.classList.toggle('active',on);enter.tabIndex=reset.tabIndex=on?-1:0
 if(on){canvas.focus({preventScroll:true});tell(coarse?'Left pad to walk  ·  Drag to look  ·  ↺ to return':locked?'WASD to walk  ·  Mouse to look  ·  R to return  ·  Esc to release':'WASD to walk  ·  Drag or use arrow keys to look  ·  R to return  ·  Esc to pause')}
 else{clearInput();root.classList.remove('hints')}}
function engage(){if(!engine||lost)return;setActive(true);if(!coarse&&!locked&&canvas.requestPointerLock){try{const p=canvas.requestPointerLock();p?.catch(()=>tell('Drag to look  ·  WASD to walk  ·  Arrow keys also look  ·  Esc to pause'))}catch{tell('Drag to look  ·  WASD to walk  ·  Esc to pause')}}}
function resetView(){Object.assign(state,entrance);clearInput();if(active)tell('Back at the entrance',1700)}
enter.addEventListener('click',engage);reset.addEventListener('click',resetView);document.querySelector('#touchReset').addEventListener('click',resetView)
document.addEventListener('pointerlockchange',()=>{const prev=locked;locked=document.pointerLockElement===canvas;if(locked)setActive(true);else if(prev)setActive(false)})
function look(dx,dy,sens=.00205){state.yaw=(state.yaw+dx*sens)%(Math.PI*2);state.pitch=Math.max(-1.43,Math.min(1.43,state.pitch-dy*sens))}
document.addEventListener('mousemove',e=>{if(locked&&active)look(e.movementX,e.movementY)})
canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;if(!active)engage();if(active&&!locked){drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId)}})
canvas.addEventListener('pointermove',e=>{if(active&&!locked&&drag?.id===e.pointerId){look(e.clientX-drag.x,e.clientY-drag.y,coarse?.004:.0031);drag.x=e.clientX;drag.y=e.clientY}})
for(const e of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(e,()=>{drag=null})
function stickAt(e){const b=stick.getBoundingClientRect();let x=(e.clientX-b.left-b.width/2)/(b.width*.37),y=(e.clientY-b.top-b.height/2)/(b.height*.37),l=Math.max(1,Math.hypot(x,y));joyX=x/l;joyY=y/l;stick.firstElementChild.style.transform='translate('+joyX*23+'px,'+joyY*23+'px)'}
stick.addEventListener('pointerdown',e=>{if(touchId!==null)return;touchId=e.pointerId;stick.setPointerCapture(touchId);stickAt(e)})
stick.addEventListener('pointermove',e=>{if(touchId===e.pointerId)stickAt(e)})
for(const ev of ['pointerup','pointercancel','lostpointercapture'])stick.addEventListener(ev,e=>{if(e.pointerId===touchId){touchId=null;joyX=joyY=0;stick.firstElementChild.style.transform=''}})
const movement=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','ShiftLeft','ShiftRight'])
window.addEventListener('keydown',e=>{if(!engine||lost||e.altKey||e.ctrlKey||e.metaKey)return
 if(e.code==='KeyR'){resetView();e.preventDefault();return}
 if(e.code==='Escape'){if(locked)document.exitPointerLock();setActive(false);return}
 if(movement.has(e.code)){e.preventDefault();if(!active)setActive(true);keys.add(e.code)}})
window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',clearInput)
function tick(t){anim=0;if(document.hidden||lost)return;const dt=last?Math.min(.055,(t-last)/1000):0;last=t
 if(active){const axis=(p,n)=>Number(keys.has(p))-Number(keys.has(n))
  state.yaw+=axis('ArrowRight','ArrowLeft')*dt*1.51;state.pitch=Math.max(-1.43,Math.min(1.43,state.pitch+axis('ArrowUp','ArrowDown')*dt*1.17))
  const f=axis('KeyW','KeyS')-joyY,r=axis('KeyD','KeyA')+joyX,scale=(keys.has('ShiftLeft')||keys.has('ShiftRight')?2.55:1.66)/Math.max(1,Math.hypot(f,r)),sn=Math.sin(state.yaw),cs=Math.cos(state.yaw),a=1-Math.exp(-dt*18)
  vx+=((sn*f+cs*r)*scale-vx)*a;vz+=((-cs*f+sn*r)*scale-vz)*a
  if(Math.abs(vx)+Math.abs(vz)>.0001)[state.x,state.z]=slide(state.x,state.z,vx*dt,vz*dt,engine.meta.colliders)
 }
 engine.draw([state.x,eyeHeight,state.z],state.yaw,state.pitch,t*.001);anim=requestAnimationFrame(tick)
}
document.addEventListener('visibilitychange',()=>{clearInput();if(document.hidden){cancelAnimationFrame(anim);anim=0;last=0}else if(engine&&!lost&&!anim)anim=requestAnimationFrame(tick)})
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;cancelAnimationFrame(anim);if(locked)document.exitPointerLock();setActive(false);err.hidden=false;err.textContent='The graphics context was interrupted. Reload the page to return to the entrance.'})
try{engine=await createRenderer(canvas,s=>{enter.textContent=s});enter.textContent=coarse?'Step inside':'Enter rooms';enter.disabled=false;anim=requestAnimationFrame(tick)}
catch(e){enter.textContent='Rooms unavailable';err.textContent=e.message||String(e);err.hidden=false;console.error(e)}
