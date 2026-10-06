import {createWalkableScreen} from './walkable-screen.js';
import {advance,spawn,nearby,safeDestination,planRoute,followRoute,approaches,walkable} from './navigation.mjs';
const byId=id=>document.getElementById(id);
const canvas=byId('room'),mode=byId('mode'),gentle=byId('gentle'),dialog=byId('station-dialog'),helpDialog=byId('help-dialog');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');gentle.checked=reduced.matches;
let position=spawn(),engine=null,active=false,failed=false,loading=false,frame=0,lastTime=0,drag=null,route=null,restoreFocus=null,pendingTarget=null;
const restored=history.state?.labPosition;
if(restored&&walkable(restored)&&Number.isFinite(restored.yaw)&&Number.isFinite(restored.pitch))position={...restored};
function preservePosition(){history.replaceState({...history.state,labPosition:{...position}},'');}
let suspended=false;
const screen=createWalkableScreen({changed(source){engine?.comparison(source);draw();},suspend(){suspended=true;stop();preservePosition();},resume(){suspended=false;stop();draw();},approach(){if(active&&innerWidth>=700)requestWalk({point:{x:0,z:-4.6},screen:true});else screen.inspect();}});
const actions=new Set(),keys=new Set(),heldPointers=new Map();
const keyMap={KeyW:'forward',KeyS:'backward',KeyA:'left',KeyD:'right',ArrowUp:'forward',ArrowDown:'backward',ArrowLeft:'turnLeft',ArrowRight:'turnRight'};
function message(text='',walking=false){
  byId('walk-status').hidden=!text;byId('walk-message').textContent=text;byId('cancel-walk').hidden=!walking;
}
function cancelRoute(announce=false){
  const walking=!!route;route=null;engine?.target(null);message(announce&&walking?'Walking stopped.':'');
}
function stop(announce=false){
  actions.clear();keys.clear();heldPointers.clear();drag=null;cancelRoute(announce);
  if(frame)cancelAnimationFrame(frame);frame=0;lastTime=0;
}
function controls(){
  byId('movement').hidden=!active||!byId('show-pad').checked;
  canvas.parentElement.classList.toggle('has-pad',active&&byId('show-pad').checked);
  for(const id of ['visit-bench','visit-home','reset'])byId(id).disabled=!active;
}
function status(){
  const degrees=((position.yaw*180/Math.PI)%360+360)%360;
  const facing=['north','west','south','east'][Math.round(degrees/90)%4];
  const where=nearby(position)==='home'?'Home exit':position.z>4.4?'Entrance':position.x<-3.6?'Apparatus bay':position.x>3.6&&position.z<-.7?'Study alcove':nearby(position)==='catalog'?'Benchmark bench':position.x>3.6?'Window gallery':'Benchmark hall';
  byId('position').textContent=where+' · facing '+facing;
  byId('map-player').setAttribute('transform','translate('+(50+position.x*4.75)+' '+(48+position.z*4.85)+') rotate('+(-degrees)+')');
  const station=nearby(position);byId('nearby').hidden=!station||!active||!!route;
  byId('nearby').textContent=station==='home'?'Exit to home':'Open benchmark bench';
}
function draw(){if(!active||suspended||document.hidden)return;try{engine.draw(position);status();}catch{fallback('The 3D view stopped. Use the flat plan and catalog or home links.');}}
function tick(time){
  frame=0;if(!active||suspended||document.hidden)return;
  const dt=lastTime?Math.min((time-lastTime)/1000,.05):1/60;lastTime=time;
  if(route){
    const result=followRoute(position,route.points,dt,gentle.checked);
    if(result!=='walking'){
      const arrived=route;route=null;engine.target(null);
      if(result==='blocked')message('That route is blocked. Select another point.');
      else{
        if(arrived.target.destination)position.yaw=approaches[arrived.target.destination].yaw;
        else if(arrived.target.approach)position.yaw=Math.atan2(position.x-arrived.target.point.x,position.z-arrived.target.point.z);
        if(arrived.target.destination||arrived.target.approach)position.pitch=-.06;
        message('');
        if(arrived.target.screen){position.yaw=0;position.pitch=.10;message('Click either still to enter. Screen arrows change the pair.');}
        if(arrived.target.destination)openStation(arrived.target.destination);
      }
    }
  }else advance(position,actions,dt,gentle.checked);
  draw();if(actions.size||route)frame=requestAnimationFrame(tick);else lastTime=0;
}
function schedule(){if(active&&!suspended&&!frame&&!document.hidden)frame=requestAnimationFrame(tick);}
function requestWalk(target){
  if(!active||suspended)return;stop();
  const point=target?.destination?approaches[target.destination]:target?.point;
  const points=point&&planRoute(position,point,{approach:!!target.approach});
  if(!points){message('That point is not reachable. Select open floor or a station.');draw();return;}
  route={points,target};engine.target(points[points.length-1]);
  message(target.destination==='catalog'?'Walking to the benchmark bench.':target.destination==='home'?'Walking to the home exit.':'Walking to the selected point.',true);
  canvas.focus({preventScroll:true});status();schedule();
}
function setMode(room){
  stop();active=room;canvas.hidden=!room;byId('flat-view').hidden=room;byId('orientation').hidden=!room;
  mode.textContent=room?'Flat view':'Enter 3D room';controls();status();if(room)draw();
}
function fallback(text){
  const lostFocus=document.activeElement===canvas||document.activeElement===mode;
  failed=true;setMode(false);mode.hidden=true;byId('flat-message').textContent=text;engine?.dispose();engine=null;
  if(lostFocus)byId('catalog-link').focus({preventScroll:true});
}
async function enter(){
  if(failed||loading)return;if(engine){setMode(true);return;}
  loading=true;mode.disabled=true;mode.textContent='Opening room…';
  try{const {createRoom}=await import('./room.mjs');engine=createRoom(canvas,()=>fallback('WebGL was interrupted. Use the flat plan and catalog or home links.'));engine.comparison(screen.source);setMode(true);}
  catch{fallback('3D is unavailable in this browser. Use the flat plan and catalog or home links.');}
  finally{loading=false;mode.disabled=false;}
}
function openStation(kind){
  if(!kind)return;const isHome=kind==='home',destination=safeDestination(kind);stop();
  restoreFocus=document.activeElement;
  byId('dialog-number').textContent=isHome?'Exit / Home':'01 / Benchmark bench';
  byId('dialog-title').textContent=isHome?'Return to home':'Benchmark discovery';
  byId('dialog-copy').textContent=isHome?'Leave the research room and return to Jordan\'s public home page.':'Open the working public catalog, with search, evidence, and detailed tools in a readable 2D page.';
  byId('dialog-link').href=destination;byId('dialog-link').textContent=isHome?'Exit to home ↗':'Open the catalog ↗';dialog.showModal();
}
dialog.addEventListener('close',()=>{if(restoreFocus?.isConnected&&!restoreFocus.hidden)restoreFocus.focus({preventScroll:true});else byId('catalog-link').focus({preventScroll:true});});
mode.hidden=false;mode.addEventListener('click',()=>active?setMode(false):enter());
byId('help').hidden=false;
byId('help').addEventListener('click',()=>{stop();draw();helpDialog.showModal();});
helpDialog.addEventListener('close',()=>{if(pendingTarget){const target=pendingTarget;pendingTarget=null;requestWalk(target);}else byId('help').focus({preventScroll:true});});
for(const [id,target] of [['visit-bench',{destination:'catalog'}],['visit-home',{destination:'home'}],['reset',{point:spawn()}]]){
  byId(id).addEventListener('click',()=>{pendingTarget=target;helpDialog.close();});
}
byId('show-pad').addEventListener('change',()=>{stop();controls();draw();});
byId('nearby').addEventListener('click',()=>openStation(nearby(position)));
byId('cancel-walk').addEventListener('click',()=>{stop(true);draw();canvas.focus({preventScroll:true});});
canvas.addEventListener('keydown',event=>{
  if(suspended)return;
  if(keyMap[event.code]){event.preventDefault();cancelRoute();keys.add(event.code);actions.add(keyMap[event.code]);schedule();}
  else if(event.code==='Enter'||event.code==='KeyE'){event.preventDefault();if(!event.repeat)openStation(nearby(position));}
  else if(event.code==='Escape'){event.preventDefault();stop(true);draw();canvas.blur();byId('help').focus({preventScroll:true});}
});
window.addEventListener('keyup',event=>{keys.delete(event.code);const action=keyMap[event.code];if(action&&!Object.keys(keyMap).some(k=>keys.has(k)&&keyMap[k]===action)&&![...heldPointers.values()].some(v=>v.action===action))actions.delete(action);});
canvas.addEventListener('blur',()=>{if(!drag){stop();draw();}});
canvas.addEventListener('pointerdown',event=>{
  if(event.button!==0||!active||suspended||!event.isPrimary)return;
  canvas.focus({preventScroll:true});canvas.setPointerCapture(event.pointerId);
  drag={id:event.pointerId,x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,moved:false};
});
canvas.addEventListener('pointermove',event=>{
  if(suspended||!drag||drag.id!==event.pointerId)return;
  if(!drag.moved){
    if(Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)<=8)return;
    const saved=drag;stop();drag=saved;drag.moved=true;
  }
  const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
  position.yaw-=dx*(gentle.checked?.002:.004);position.pitch=Math.max(-.4,Math.min(.3,position.pitch-dy*(gentle.checked?.001:.002)));
  drag.x=event.clientX;drag.y=event.clientY;draw();
});
canvas.addEventListener('pointerup',event=>{
  if(suspended||!drag||drag.id!==event.pointerId)return;const click=!drag.moved&&Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)<=8;
  drag=null;if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);
  if(click){const target=engine.pick(event.clientX,event.clientY);if(target?.comparison){stop();if(position.z>-4.5||Math.abs(position.x)>2.1)requestWalk({point:{x:0,z:-4.6},screen:true});else screen.activate(target.comparison);}else requestWalk(target);}
});
canvas.addEventListener('pointercancel',()=>{stop(true);draw();});
canvas.addEventListener('lostpointercapture',()=>{drag=null;});
for(const button of document.querySelectorAll('[data-move]')){
  const action=button.dataset.move;
  button.addEventListener('pointerdown',event=>{
    if(event.button!==0||!active||suspended)return;event.preventDefault();cancelRoute();button.setPointerCapture(event.pointerId);
    heldPointers.set(event.pointerId,{action,start:performance.now()});actions.add(action);schedule();
  });
  const release=event=>{
    const held=heldPointers.get(event.pointerId);if(!held)return;heldPointers.delete(event.pointerId);
    if(![...heldPointers.values()].some(v=>v.action===action)&&!Object.keys(keyMap).some(k=>keys.has(k)&&keyMap[k]===action))actions.delete(action);
    if(event.type==='pointerup'&&performance.now()-held.start<160){advance(position,new Set([action]),.05,gentle.checked);draw();}
    if(button.hasPointerCapture(event.pointerId))button.releasePointerCapture(event.pointerId);
  };
  button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
  button.addEventListener('click',event=>{if(event.detail===0&&active&&!suspended){cancelRoute();advance(position,new Set([action]),.05,gentle.checked);draw();}});
}
window.addEventListener('blur',()=>stop());
window.addEventListener('pagehide',()=>{preservePosition();suspended=true;stop();});
window.addEventListener('pageshow',event=>{if(event.persisted){suspended=false;draw();}});
document.addEventListener('visibilitychange',()=>{stop();if(!document.hidden)draw();});
window.addEventListener('resize',()=>{stop();draw();});
reduced.addEventListener('change',event=>{gentle.checked=event.matches;if(event.matches)setMode(false);});
gentle.addEventListener('change',()=>{stop();draw();});
setMode(false);
if(reduced.matches)byId('flat-message').textContent='Reduced motion is on. Use the flat plan, or choose Enter 3D room for gentle walking.';
else enter();
