import {makeRenderer} from './render.mjs';
import {createWalker} from './walk.mjs';
import {clamp,station} from './landform.mjs';
const byId=id=>document.getElementById(id);
const canvas=byId('cave'),help=byId('guide'),status=byId('load-status'),resetButton=byId('reset'),enter=byId('enter');
const coarse=matchMedia('(pointer: coarse)').matches;
const pressed=new Set();
let render,walker,started=false,dragOnly=false,locked=false,drag=null,padId=null;
let padX=0,padY=0,previous=0,elapsed=0,messageTimer=0,lastPlace='',frameRequest=0,contextLost=false;
const keyCodes=new Set(['KeyW','KeyS','KeyA','KeyD','ShiftLeft','ShiftRight','ArrowLeft','ArrowRight','ArrowUp','ArrowDown']);
function message(text){
 const box=byId('notice');box.textContent=text;box.classList.add('show');
 clearTimeout(messageTimer);messageTimer=setTimeout(()=>box.classList.remove('show'),1900);
}
function setActive(active){
 document.body.classList.toggle('exploring',active);
 if(started)byId('enter-label').textContent='Resume exploring';
}
function releaseInputs(){
 pressed.clear();padX=0;padY=0;padId=null;drag=null;
 byId('thumb').style.transform='';
 if(walker){walker.state.vx=0;walker.state.vz=0;}
}
function fallback(){
 dragOnly=true;started=true;setActive(true);
 message(coarse?'Drag to look · Use the pad to walk':'Drag to look · WASD to walk');
}
function enterScene(){
 if(!walker||help.open)return;
 started=true;canvas.focus({preventScroll:true});
 if(coarse||dragOnly||typeof canvas.requestPointerLock!=='function'){fallback();return;}
 try{const result=canvas.requestPointerLock();if(result?.catch)result.catch(fallback);}
 catch{fallback();}
}
function resetScene(){
 if(!walker)return;
 releaseInputs();walker.reset();message('Returned to the entrance');canvas.focus({preventScroll:true});
}
function openGuide(){
 releaseInputs();if(document.pointerLockElement===canvas)document.exitPointerLock();
 if(!help.open)help.showModal();
}
byId('help').addEventListener('click',openGuide);
byId('close-help').addEventListener('click',()=>help.close());
help.addEventListener('click',e=>{if(e.target!==help)return;const r=help.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)help.close();});
help.addEventListener('close',()=>canvas.focus({preventScroll:true}));
enter.addEventListener('click',enterScene);resetButton.addEventListener('click',resetScene);
document.addEventListener('pointerlockchange',()=>{
 locked=document.pointerLockElement===canvas;
 document.body.classList.toggle('locked',locked);
 releaseInputs();
 if(locked){started=true;dragOnly=false;setActive(true);message('Esc to release mouse');}
 else{setActive(false);}
});
document.addEventListener('pointerlockerror',fallback);
document.addEventListener('mousemove',e=>{if(locked&&walker&&!help.open)walker.look(e.movementX*.00204,-e.movementY*.00204);});
canvas.addEventListener('contextmenu',e=>e.preventDefault());
canvas.addEventListener('pointerdown',e=>{
 if(!walker||locked||help.open||drag||e.button!==0)return;
 canvas.focus({preventScroll:true});
 drag={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false};
 canvas.setPointerCapture(e.pointerId);
 if(e.pointerType==='touch'){started=true;setActive(true);}
});
canvas.addEventListener('pointermove',e=>{
 if(!drag||drag.id!==e.pointerId||locked||!walker)return;
 const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
 drag.x=e.clientX;drag.y=e.clientY;
 if(Math.abs(dx)+Math.abs(dy)>.5){
   drag.moved=true;started=true;setActive(true);
   walker.look(dx*(coarse?.0046:.003),-dy*(coarse?.0046:.003));
 }
});
canvas.addEventListener('pointerup',e=>{
 if(drag?.id!==e.pointerId)return;
 const click=!drag.moved;drag=null;
 if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);
 if(click&&e.pointerType!=='touch')enterScene();
});
canvas.addEventListener('pointercancel',e=>{if(drag?.id===e.pointerId)drag=null;});
const pad=byId('touch-pad');
function updatePad(e){
 const r=pad.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/33,y=(e.clientY-r.top-r.height/2)/33,n=Math.max(1,Math.hypot(x,y));
 padX=x/n;padY=-y/n;byId('thumb').style.transform='translate('+Math.round(padX*31)+'px,'+Math.round(-padY*31)+'px)';
}
pad.addEventListener('pointerdown',e=>{if(padId!==null)return;padId=e.pointerId;pad.setPointerCapture(e.pointerId);updatePad(e);});
pad.addEventListener('pointermove',e=>{if(padId===e.pointerId)updatePad(e);});
function endPad(e){if(padId===e.pointerId){padId=null;padX=0;padY=0;byId('thumb').style.transform='';}}
pad.addEventListener('pointerup',endPad);pad.addEventListener('pointercancel',endPad);
document.addEventListener('keydown',e=>{
 if(e.ctrlKey||e.metaKey||e.altKey||help.open||!walker)return;
 if(e.code==='KeyR'){if(!e.repeat)resetScene();e.preventDefault();return;}
 if(e.code==='KeyH'){openGuide();e.preventDefault();return;}
 if(e.code==='Escape'&&!locked){releaseInputs();setActive(false);return;}
 if(!keyCodes.has(e.code))return;
 e.preventDefault();pressed.add(e.code);started=true;setActive(true);
});
document.addEventListener('keyup',e=>pressed.delete(e.code));
window.addEventListener('blur',releaseInputs);
document.addEventListener('visibilitychange',()=>{
 releaseInputs();previous=0;
 if(document.hidden){cancelAnimationFrame(frameRequest);frameRequest=0;}
 else if(render&&!contextLost&&!frameRequest){frameRequest=requestAnimationFrame(tick);}
});
canvas.addEventListener('webglcontextlost',e=>{
 e.preventDefault();contextLost=true;cancelAnimationFrame(frameRequest);frameRequest=0;releaseInputs();
 if(document.pointerLockElement===canvas)document.exitPointerLock();
 setActive(false);enter.hidden=true;byId('entry-help').hidden=true;resetButton.disabled=true;
 status.hidden=false;status.textContent='Graphics context interrupted. Waiting for it to return…';
});
canvas.addEventListener('webglcontextrestored',()=>location.reload());
function tick(now){
 frameRequest=0;if(document.hidden||contextLost)return;
 const dt=previous?clamp((now-previous)*.001,0,.050):0;previous=now;elapsed+=dt;
 if(!help.open){
   const forward=Number(pressed.has('KeyW'))-Number(pressed.has('KeyS'))+padY;
   const side=Number(pressed.has('KeyD'))-Number(pressed.has('KeyA'))+padX;
   const turn=Number(pressed.has('ArrowRight'))-Number(pressed.has('ArrowLeft'));
   const tilt=Number(pressed.has('ArrowUp'))-Number(pressed.has('ArrowDown'));
   walker.look(turn*dt*1.63,tilt*dt*1.24);
   walker.move(forward,side,pressed.has('ShiftLeft')||pressed.has('ShiftRight'),dt);
 }
 const s=walker.state,place=station(s.x,s.z);
 if(place!==lastPlace){byId('station').textContent=place;lastPlace=place;}
 render.draw([s.x,s.y,s.z],s.yaw,s.pitch,elapsed);
 frameRequest=requestAnimationFrame(tick);
}
try{
 render=await makeRenderer(canvas,t=>{status.textContent=t;});
 walker=createWalker(render.field.nav,render.clearance);
 status.hidden=true;enter.hidden=false;byId('entry-help').hidden=false;resetButton.disabled=false;
 if(coarse)byId('entry-copy').textContent='Drag to look · Pad to walk';
 if(!document.hidden)frameRequest=requestAnimationFrame(tick);
}catch(error){
 status.textContent=error instanceof Error?error.message:String(error);status.hidden=false;console.error(error);
}

