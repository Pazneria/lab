'use strict';
(async function startInlet(){
 const el=id=>document.getElementById(id),canvas=el('scene'),guide=el('guide'),enter=el('enter'),more=el('more'),help=el('helpButton'),reset=el('resetButton'),enterText=el('enterText'),notice=el('notice');
 const touch=window.matchMedia('(pointer:coarse)').matches,keys=new Set();
 let p=playerStart(),active=false,ready=false,everWalked=false,expanded=false,drag=null,stickPointer=null,inputX=0,inputZ=0;
 let lockWanted=false,noticeTimer=0,raf=0,last=0,clock=0,lastArea='',lastIdleFrame=-1,velX=0,velZ=0;
 const clearInput=()=>{keys.clear();velX=0;velZ=0;inputX=0;inputZ=0;stickPointer=null;drag=null;el('stick').style.transform=''};
 function say(msg){notice.textContent=msg;notice.classList.add('show');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>notice.classList.remove('show'),2200)}
 function ui(){
  guide.hidden=active;el('place').hidden=!active;el('crosshair').hidden=!active||touch;el('joystick').hidden=!active||!touch;
  more.hidden=!expanded||touch;el('basicControls').hidden=expanded||touch;el('touchHelp').hidden=!touch;
  help.setAttribute('aria-expanded',String(!active&&expanded));enterText.textContent=everWalked?'Resume walk':'Enter the inlet';
 }
 function pause(details=false){active=false;lockWanted=false;expanded=details;clearInput();if(document.pointerLockElement===canvas)document.exitPointerLock();ui()}
 function begin(lock){
  if(!ready)return;active=true;everWalked=true;expanded=false;ui();canvas.focus({preventScroll:true});
  if(lock&&!touch&&!document.pointerLockElement&&canvas.requestPointerLock){
   lockWanted=true;
   try{const promise=canvas.requestPointerLock();if(promise&&promise.catch)promise.catch(()=>{if(active&&lockWanted)say('Drag to look · WASD to walk');lockWanted=false})}
   catch(_){lockWanted=false;say('Drag to look · WASD to walk')}
  }
 }
 function resetWalk(){p=playerStart();clearInput();if(ready)say('Returned to the shore')}
 function look(dx,dy){p.yaw+=(dx*.00215);p.pitch=clamp(p.pitch-dy*.0021,-1.45,1.43)}
 enter.addEventListener('click',()=>begin(true));
 help.addEventListener('click',()=>{if(active)pause(true);else{expanded=!expanded;ui()}});
 reset.addEventListener('click',()=>{resetWalk();if(active)canvas.focus()});
 let hadLock=false;
 document.addEventListener('pointerlockchange',()=>{
  const locked=document.pointerLockElement===canvas;
  if(locked){active=true;everWalked=true;hadLock=true;lockWanted=false;expanded=false;ui()}
  else if(hadLock){hadLock=false;if(active)pause(false)}
 });
 document.addEventListener('pointerlockerror',()=>{if(active&&lockWanted){say('Drag to look · WASD to walk');lockWanted=false}});
 document.addEventListener('mousemove',e=>{if(active&&document.pointerLockElement===canvas)look(e.movementX,e.movementY)});
 canvas.addEventListener('pointerdown',e=>{
  if(!ready||e.button>0)return;
  if(!active)begin(e.pointerType==='mouse');
  if(!document.pointerLockElement){drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId)}
 });
 canvas.addEventListener('pointermove',e=>{
  if(!active||document.pointerLockElement||!drag||e.pointerId!==drag.id)return;
  look(e.clientX-drag.x,e.clientY-drag.y);drag.x=e.clientX;drag.y=e.clientY
 });
 function endDrag(e){if(drag&&e.pointerId===drag.id)drag=null}
 canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);
 const stickPad=el('joystick');
 function stickMove(e){
  const b=stickPad.getBoundingClientRect(),dx=(e.clientX-b.left-b.width/2)/35,dy=(e.clientY-b.top-b.height/2)/35,mag=Math.max(1,Math.hypot(dx,dy));
  inputX=dx/mag;inputZ=-dy/mag;el('stick').style.transform='translate('+inputX*29+'px,'+(-inputZ*29)+'px)'
 }
 stickPad.addEventListener('pointerdown',e=>{if(stickPointer!==null)return;stickPointer=e.pointerId;stickPad.setPointerCapture(e.pointerId);stickMove(e)});
 stickPad.addEventListener('pointermove',e=>{if(e.pointerId===stickPointer)stickMove(e)});
 function unstick(e){if(stickPointer===e.pointerId){stickPointer=null;inputX=inputZ=0;el('stick').style.transform=''}}
 stickPad.addEventListener('pointerup',unstick);stickPad.addEventListener('pointercancel',unstick);
 const motion=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight']);
 window.addEventListener('keydown',e=>{
  if(!ready||e.altKey||e.ctrlKey||e.metaKey)return;
  if(e.code==='KeyR'&&!e.repeat){e.preventDefault();resetWalk();return}
  if(e.code==='KeyH'&&!e.repeat){e.preventDefault();if(active)pause(true);else{expanded=!expanded;ui()}return}
  if(e.code==='Escape'){if(active)pause(false);else if(expanded){expanded=false;ui()}return}
  if(motion.has(e.code)){
   e.preventDefault();if(!active&&!e.code.startsWith('Shift'))begin(false);keys.add(e.code)
  }
 });
 window.addEventListener('keyup',e=>keys.delete(e.code));
 window.addEventListener('blur',()=>{clearInput();if(active)pause(false)});
 canvas.addEventListener('contextmenu',e=>e.preventDefault());
 function fail(msg){
  ready=false;active=false;clearInput();if(raf)cancelAnimationFrame(raf);raf=0;
  if(document.pointerLockElement===canvas)document.exitPointerLock();
  guide.hidden=false;el('place').hidden=true;el('crosshair').hidden=true;el('joystick').hidden=true;
  enter.disabled=true;enter.hidden=true;help.disabled=reset.disabled=true;el('basicControls').hidden=true;
  const error=el('error');error.hidden=false;error.textContent=msg;
 }
 try{
  const gl=canvas.getContext('webgl2',{alpha:false,depth:true,antialias:true,stencil:false,preserveDrawingBuffer:false,powerPreference:'high-performance'});
  if(!gl)throw Error('Enable WebGL 2 in your browser to enter the inlet.');
  if(typeof DecompressionStream==='undefined')throw Error('Open this build in a current browser with DecompressionStream support.');
  const [world,materials]=await Promise.all([inflateLocal(WORLD_DATA),inflateLocal(MATERIAL_DATA)]);
  const renderer=makeRenderer(gl,world,materials);
  for(const o of WORLD_META.blockers){if(o.yaw!==undefined){o.c=Math.cos(o.yaw);o.s=Math.sin(o.yaw)}blockers.push(o)}
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();fail('The graphics context was interrupted. Reload this page to reopen the inlet.')});
  function frame(now){
   raf=0;if(!ready||document.hidden)return;
   const dt=last?Math.min(.045,Math.max(0,(now-last)/1000)):.016;last=now;clock+=dt;
   if(active){
    const pressed=k=>keys.has(k)?1:0;
    p.yaw+=(pressed('ArrowRight')-pressed('ArrowLeft'))*1.45*dt;
    const sx=pressed('KeyD')-pressed('KeyA')+inputX,fw=Math.max(pressed('KeyW'),pressed('ArrowUp'))-Math.max(pressed('KeyS'),pressed('ArrowDown'))+inputZ;
    const mag=Math.max(1,Math.hypot(sx,fw)),cs=Math.cos(p.yaw),sn=Math.sin(p.yaw),speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?3.05:1.87;
    const response=1-Math.exp(-dt*(sx||fw?18:24));
    velX=mix(velX,(cs*sx+sn*fw)*speed/mag,response);velZ=mix(velZ,(sn*sx-cs*fw)*speed/mag,response);
    if(Math.abs(velX)+Math.abs(velZ)>.001)movePlayer(p,velX*dt,velZ*dt);
    const targetY=p.feet+EYE_H;p.eye=Math.abs(targetY-p.eye)<.0001?targetY:mix(p.eye,targetY,1-Math.exp(-dt*18));
    const loc=locationName(p);if(lastArea!==loc){el('area').textContent=loc;lastArea=loc}
   }
   if(active||now-lastIdleFrame>32){renderer.draw(p,clock);lastIdleFrame=now}
   raf=requestAnimationFrame(frame)
  }
  ready=true;enter.disabled=help.disabled=reset.disabled=false;ui();renderer.draw(p,0);raf=requestAnimationFrame(frame);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInput();if(raf)cancelAnimationFrame(raf);raf=0;last=0}else if(ready&&!raf)raf=requestAnimationFrame(frame)});
 }catch(error){console.error(error);fail(error.message||'The local scene could not be opened.')}
})();
