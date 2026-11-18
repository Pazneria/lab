'use strict';
(() => {
 const canvas=document.getElementById('view'),go=document.getElementById('engage'),panel=document.getElementById('guide'),error=document.getElementById('error');
 const q=id=>document.getElementById(id),held=new Set(),cam={x:0,y:0,z:0,yaw:0,pitch:0};
 const spawn=[5.26,9.86],eyeHeight=1.64,radius=.227;
 let vx=0,vz=0,ground=0,active=false,drag=null,dirty=true,ready=false,draw=null,frameId=0,last=0,lastBearing=-1,zone='',lost=false;
 function floorAt(x,z){
   if(Math.abs(x)<=4.59&&z>=-4.14&&z<=1.76)return .762;
   if(Math.abs(x+.79)<=1.31&&z>=1.68&&z<=3.973)return .773;
   if(Math.abs(x+.79)<=1.18&&z>=3.91&&z<=5.265)return .752;
   if(Math.abs(x+.79)<=.877&&z>=5.24&&z<=6.211)return z<5.562?.590:z<5.882?.430:.270;
   return S.height(x,z);
 }
 function site(){
   if(Math.abs(cam.x)<4.58&&cam.z>-4.14&&cam.z<1.69)return 'Main laboratory';
   if(Math.abs(cam.x+.79)<1.31&&cam.z>=1.69&&cam.z<3.95)return 'Entry vestibule';
   if(Math.abs(cam.x+.79)<1.14&&cam.z>=3.95&&cam.z<6.19)return 'Landing';
   return 'Snow apron';
 }
 function reset(){
   cam.x=spawn[0];cam.z=spawn[1];ground=floorAt(cam.x,cam.z);cam.y=ground+eyeHeight;
   cam.yaw=Math.atan2(-.40-cam.x,cam.z-.49);cam.pitch=.027;vx=vz=0;held.clear();dirty=true;
 }
 function clearMove(){held.clear();vx=vz=0}
 function unlocked(){
   const locked=document.pointerLockElement===canvas;document.body.classList.toggle('locked',locked);
   active=locked;document.body.classList.toggle('exploring',active);clearMove();drag=null;
   if(locked){panel.hidden=true;canvas.focus({preventScroll:true})}
 }
 function explore(){
   if(!ready)return;
   panel.hidden=true;canvas.focus({preventScroll:true});
   if(document.pointerLockElement===canvas)return;
   function fallback(){active=true;document.body.classList.add('exploring','dragmode');q('engage').title='Click for mouse-look, or drag the scene to look around';}
   if(!canvas.requestPointerLock){fallback();return}
   try{const promise=canvas.requestPointerLock();if(promise&&promise.catch)promise.catch(fallback)}catch(_){fallback()}
 }
 function guide(){
   panel.hidden=!panel.hidden;
   if(!panel.hidden){clearMove();if(document.pointerLockElement===canvas)document.exitPointerLock()}
   else canvas.focus({preventScroll:true});
 }
 function look(dx,dy){cam.yaw+=dx*.00212;cam.pitch=Math.max(-1.43,Math.min(1.43,cam.pitch-dy*.00212));dirty=true}
 document.addEventListener('pointerlockchange',()=>{document.body.classList.remove('dragmode');unlocked()});
 document.addEventListener('pointerlockerror',()=>{document.body.classList.add('dragmode')});
 document.addEventListener('mousemove',e=>{if(document.pointerLockElement===canvas&&panel.hidden)look(e.movementX||0,e.movementY||0)});
 canvas.addEventListener('pointerdown',e=>{
   if(!ready||e.button!==0||document.pointerLockElement===canvas)return;
   panel.hidden=true;drag={id:e.pointerId,x:e.clientX,y:e.clientY,total:0};canvas.setPointerCapture(e.pointerId);canvas.focus({preventScroll:true});
 });
 canvas.addEventListener('pointermove',e=>{
   if(!drag||e.pointerId!==drag.id||document.pointerLockElement===canvas)return;
   let dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.x=e.clientX;drag.y=e.clientY;drag.total+=Math.abs(dx)+Math.abs(dy);look(dx,dy);
   if(drag.total>3){active=true;document.body.classList.add('exploring','dragmode')}
 });
 canvas.addEventListener('pointerup',e=>{if(!drag)return;let click=drag.total<4;drag=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);if(click)explore()});
 canvas.addEventListener('pointercancel',()=>{drag=null});
 go.addEventListener('click',explore);q('reset').addEventListener('click',()=>{reset();canvas.focus({preventScroll:true})});q('help').addEventListener('click',guide);q('dismiss').addEventListener('click',guide);
 document.addEventListener('keydown',e=>{
   if(!ready||e.metaKey||e.ctrlKey||e.altKey)return;
   if(e.code==='KeyR'&&!e.repeat){reset();return}if(e.code==='KeyH'&&!e.repeat){guide();return}
   if(e.code==='Escape'){panel.hidden=true;active=false;document.body.classList.remove('exploring','dragmode');clearMove();return}
   if(!panel.hidden)return;
   if(['KeyW','KeyS','KeyA','KeyD','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','ShiftLeft','ShiftRight'].includes(e.code)){held.add(e.code);e.preventDefault()}
 });
 document.addEventListener('keyup',e=>held.delete(e.code));window.addEventListener('blur',clearMove);
 function obstructed(x,z){
   if((x/13.38)**2+((z-.41)/13.26)**2>1)return true;
   for(let b of S.obstacles){
     let dx=Math.abs(x-b.x),dz=Math.abs(z-b.z);if(dx>b.w+radius||dz>b.d+radius)continue;
     if(b.round){if((dx/(b.w+radius))**2+(dz/(b.d+radius))**2<1)return true}
     else {let ex=Math.max(0,dx-b.w),ez=Math.max(0,dz-b.d);if(ex*ex+ez*ez<radius*radius)return true}
   }return false;
 }
 function step(dx,dz){
   const n=Math.max(1,Math.ceil(Math.max(Math.abs(dx),Math.abs(dz))/.045));
   for(let i=0;i<n;i++){
     const x=cam.x+dx/n;if(!obstructed(x,cam.z)){let newH=floorAt(x,cam.z);if(newH-ground<.223){cam.x=x;ground=newH}}
     const z=cam.z+dz/n;if(!obstructed(cam.x,z)){let newH=floorAt(cam.x,z);if(newH-ground<.223){cam.z=z;ground=newH}}
   }
 }
 function tick(t){
   if(lost||document.hidden){frameId=0;return}
   let dt=last?Math.min(.05,Math.max(0,(t-last)/1000)):0;last=t;
   let turn=Number(held.has('ArrowRight'))-Number(held.has('ArrowLeft')),tilt=Number(held.has('ArrowUp'))-Number(held.has('ArrowDown'));
   if(turn||tilt){cam.yaw+=turn*dt*1.46;cam.pitch=Math.min(1.43,Math.max(-1.43,cam.pitch+tilt*dt*1.03));dirty=true}
   let f=Number(held.has('KeyW'))-Number(held.has('KeyS')),s=Number(held.has('KeyD'))-Number(held.has('KeyA')),scale=((held.has('ShiftLeft')||held.has('ShiftRight')) ? .82 : 1.97)/Math.max(1,Math.hypot(f,s));
   const sy=Math.sin(cam.yaw),cy=Math.cos(cam.yaw),lerp=1-Math.exp(-dt*(f||s?15:24));
   vx+=((f*sy+s*cy)*scale-vx)*lerp;vz+=((-f*cy+s*sy)*scale-vz)*lerp;
   if(Math.abs(vx)+Math.abs(vz)>.002){step(vx*dt,vz*dt);dirty=true}else{vx=vz=0}
   const delta=ground+eyeHeight-cam.y;if(Math.abs(delta)>.00015){cam.y+=delta*(1-Math.exp(-dt*16));dirty=true}
   if(dirty){
     draw(cam);dirty=false;
     let deg=((Math.round(cam.yaw*180/Math.PI)%360)+360)%360;
     if(deg!==lastBearing){q('degrees').textContent=String(deg).padStart(3,'0')+'°';q('direction').textContent=['N','NE','E','SE','S','SW','W','NW'][Math.round(deg/45)%8];lastBearing=deg}
     const name=site();if(name!==zone){zone=name;q('zone').textContent=name;document.body.dataset.place=name}
   }
   frameId=requestAnimationFrame(tick);
 }
 window.addEventListener('resize',()=>{dirty=true});
 document.addEventListener('visibilitychange',()=>{clearMove();last=0;dirty=true;if(document.hidden){cancelAnimationFrame(frameId);frameId=0}else if(ready&&!frameId&&!lost)frameId=requestAnimationFrame(tick)});
 function fail(message){error.hidden=false;error.textContent=message;document.body.classList.add('failed');go.disabled=true}
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;cancelAnimationFrame(frameId);clearMove();fail('Graphics context interrupted. Reload this page to reopen the station.')});
 function boot(){
   try{draw=S.renderer(canvas);ready=true;go.disabled=false;reset();frameId=requestAnimationFrame(tick)}catch(e){console.error(e);fail('Unable to open the station. '+e.message)}
 }
 go.disabled=true;requestAnimationFrame(boot);
})();
