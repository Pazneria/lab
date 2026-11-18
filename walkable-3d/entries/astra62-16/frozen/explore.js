'use strict';
(() => {
 const $=id=>document.getElementById(id),canvas=$('world'),enter=$('enter'),help=$('help'),pad=$('touchPad');
 const camera={...Walk.spawn},keys=new Set();
 const state={ready:false,active:false,wasLocked:false,drag:null,joystick:null,joyX:0,joyY:0,low:false,vx:0,vz:0,dirty:true,frame:0,last:0,touch:false};
 let renderer=null,noticeTimer=0;
 const clamp=(n,lo,hi)=>Math.min(hi,Math.max(lo,n));
 function notice(message){$('notice').textContent=message;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>{$('notice').textContent=''},2300)}
 function queue(){if(!state.frame&&state.ready&&!document.hidden)state.frame=requestAnimationFrame(tick)}
 function dirty(){state.dirty=true;queue()}
 function helpOpen(value){help.hidden=!value;$('helpButton').setAttribute('aria-expanded',String(value))}
 function clearMotion(){keys.clear();state.vx=0;state.vz=0;state.drag=null;state.joystick=null;state.joyX=state.joyY=0;pad.firstElementChild.style.transform=''}
 function active(value){
  state.active=value;document.body.classList.toggle('walking',value);pad.hidden=!(value&&state.touch);
  if(value){helpOpen(false);canvas.focus({preventScroll:true})}else{clearMotion();$('enterLabel').textContent='Resume exploring'}
  state.last=0;dirty()
 }
 function pause(){if(document.pointerLockElement===canvas)document.exitPointerLock();active(false)}
 function reset(){Object.assign(camera,Walk.spawn);state.low=false;clearMotion();dirty();notice('Back at the entrance')}
 function fallback(){if(state.active&&!document.pointerLockElement&&!state.touch)notice('Drag to look around · Esc to pause')}
 function begin(touch=false,requestLock=true){
  if(!state.ready)return;
  state.touch=touch;active(true);
  if(touch){notice('Move with the pad · Swipe to look');return}
  if(requestLock&&document.pointerLockElement!==canvas){
   try{if(canvas.requestPointerLock){const p=canvas.requestPointerLock();if(p&&p.catch)p.catch(fallback)}else fallback()}catch{fallback()}
  }
 }
 function look(dx,dy,sens=.00205){
  camera.yaw+=dx*sens;camera.pitch=clamp(camera.pitch-dy*sens,-1.43,1.43);dirty()
 }
 enter.addEventListener('click',e=>begin(e.pointerType==='touch'||matchMedia('(pointer: coarse)').matches));
 $('helpButton').addEventListener('click',()=>{const open=help.hidden;if(open&&state.active)pause();helpOpen(open)});
 $('closeHelp').addEventListener('click',()=>helpOpen(false));$('resetButton').addEventListener('click',reset);
 document.addEventListener('pointerlockchange',()=>{
  const locked=document.pointerLockElement===canvas;
  if(locked){state.wasLocked=true;state.drag=null;if(!state.active)active(true)}
  else if(state.wasLocked){state.wasLocked=false;active(false)}
 });
 document.addEventListener('pointerlockerror',fallback);
 document.addEventListener('mousemove',e=>{if(document.pointerLockElement===canvas&&state.active)look(e.movementX,e.movementY)});
 canvas.addEventListener('pointerdown',e=>{
  if(!state.ready||e.button!==0)return;
  if(!state.active)begin(e.pointerType==='touch',e.pointerType!=='touch');
  if(document.pointerLockElement===canvas)return;
  state.drag={id:e.pointerId,x:e.clientX,y:e.clientY};
  try{canvas.setPointerCapture(e.pointerId)}catch{}
 });
 canvas.addEventListener('pointermove',e=>{
  const p=state.drag;if(!state.active||!p||e.pointerId!==p.id||document.pointerLockElement===canvas)return;
  look(e.clientX-p.x,e.clientY-p.y,e.pointerType==='touch'?.0042:.0035);p.x=e.clientX;p.y=e.clientY
 });
 function endDrag(e){if(state.drag&&e.pointerId===state.drag.id)state.drag=null}
 canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);
 function joy(e){
  const b=pad.getBoundingClientRect();let x=(e.clientX-b.left-b.width/2)/35,y=(e.clientY-b.top-b.height/2)/35;
  const len=Math.max(1,Math.hypot(x,y));x/=len;y/=len;state.joyX=x;state.joyY=-y;pad.firstElementChild.style.transform='translate('+x*29+'px,'+y*29+'px)';queue()
 }
 pad.addEventListener('pointerdown',e=>{state.joystick=e.pointerId;pad.setPointerCapture(e.pointerId);joy(e);e.preventDefault()});
 pad.addEventListener('pointermove',e=>{if(e.pointerId===state.joystick)joy(e)});
 function stopJoy(e){if(e.pointerId===state.joystick){state.joystick=null;state.joyX=state.joyY=0;pad.firstElementChild.style.transform=''}}
 pad.addEventListener('pointerup',stopJoy);pad.addEventListener('pointercancel',stopJoy);
 const motionKeys=new Set(['KeyW','KeyS','KeyA','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyI','KeyK','ShiftLeft','ShiftRight']);
 window.addEventListener('keydown',e=>{
  if(!state.ready||e.altKey||e.ctrlKey||e.metaKey)return;
  if(e.code==='KeyR'&&!e.repeat){e.preventDefault();reset();return}
  if((e.code==='KeyH'||e.key==='?')&&!e.repeat){e.preventDefault();const open=help.hidden;if(open&&state.active)pause();helpOpen(open);return}
  if(e.code==='Escape'){if(state.active)pause();else helpOpen(false);return}
  if(e.code==='KeyC'&&!e.repeat){state.low=!state.low;dirty();return}
  if(!motionKeys.has(e.code))return;e.preventDefault();if(!state.active)begin(false,false);keys.add(e.code);queue()
 });
 window.addEventListener('keyup',e=>keys.delete(e.code));
 window.addEventListener('blur',()=>{clearMotion();if(state.active)pause()});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){clearMotion();if(state.active)pause();if(state.frame)cancelAnimationFrame(state.frame);state.frame=0}else{state.last=0;dirty()}});
 window.addEventListener('resize',()=>{if(state.ready){renderer.resize();dirty()}});
 function tick(stamp){
  state.frame=0;if(!state.ready||document.hidden)return;
  const raw=state.last?(stamp-state.last)/1000:1/60,dt=clamp(raw,.0001,.046);state.last=stamp;
  const old=[camera.x,camera.z,camera.yaw,camera.pitch,camera.eye];
  const held=code=>keys.has(code)?1:0;
  if(state.active){
   const forward=held('KeyW')+held('ArrowUp')-held('KeyS')-held('ArrowDown')+state.joyY,side=held('KeyD')-held('KeyA')+state.joyX;
   const len=Math.max(1,Math.hypot(forward,side)),speed=state.low?1.05:keys.has('ShiftLeft')||keys.has('ShiftRight')?2.67:1.69;
   camera.yaw+=(held('ArrowRight')-held('ArrowLeft'))*dt*1.36;
   camera.pitch=clamp(camera.pitch+(held('KeyI')-held('KeyK'))*dt*1.15,-1.43,1.43);
   const tx=(Math.sin(camera.yaw)*forward+Math.cos(camera.yaw)*side)*speed/len,tz=(-Math.cos(camera.yaw)*forward+Math.sin(camera.yaw)*side)*speed/len;
   const damp=1-Math.exp(-dt*18);state.vx+=(tx-state.vx)*damp;state.vz+=(tz-state.vz)*damp;
   if(!forward&&!side&&Math.hypot(state.vx,state.vz)<.01)state.vx=state.vz=0;
   Walk.move(camera,state.vx*dt,state.vz*dt,renderer.meta.blocks)
  }
  const target=state.low?Walk.low:Walk.standing;camera.eye+=(target-camera.eye)*(1-Math.exp(-dt*14));if(Math.abs(target-camera.eye)<.0006)camera.eye=target;
  const changed=camera.x!==old[0]||camera.z!==old[1]||camera.yaw!==old[2]||camera.pitch!==old[3]||camera.eye!==old[4];
  if(state.dirty||changed){
   if(state.active&&raw<.15)renderer.adapt(raw);renderer.draw(camera);state.dirty=false;
   const room=Walk.room(camera);if($('room').textContent!==room)$('room').textContent=room
  }
  if(state.active||camera.eye!==target)queue()
 }
 function fail(reason){state.ready=false;if(state.frame)cancelAnimationFrame(state.frame);state.frame=0;clearMotion();$('arrival').hidden=true;$('error').hidden=false;$('reason').textContent=reason}
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();fail('The graphics context was interrupted. The scene will reopen when the device is ready.')});
 canvas.addEventListener('webglcontextrestored',()=>location.reload());
 (async()=>{
  try{
   if(location.protocol==='file:')throw Error('Start the local static server described in README.md and open its localhost address.');
   renderer=new CottageRenderer(canvas);await renderer.init(message=>{$('enterLabel').textContent=message});
   state.ready=true;enter.disabled=false;$('enterLabel').textContent='Step inside';
   if(matchMedia('(pointer: coarse)').matches)$('hint').textContent='Move with the pad · Swipe to look';
   dirty()
  }catch(e){fail(e.message||String(e))}
 })()
})();
