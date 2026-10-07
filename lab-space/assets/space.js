import {createWalkableScreen} from './walkable-screen.js';
import {clickSlop,movedBeyondClick,intentionalClick} from './interaction.mjs';
import {advance,spawn,nearby,safeDestination,planRoute,followRoute,approaches,walkable,exhibits,roomLayoutVersion} from './navigation.mjs';
const byId=id=>document.getElementById(id);
const canvas=byId('room'),enterButton=byId('enter-room'),gentle=byId('gentle'),dialog=byId('station-dialog'),helpDialog=byId('help-dialog');
const roomMenu=byId('room-menu');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');gentle.checked=reduced.matches;
let position=spawn(),engine=null,active=false,failed=false,loading=false,roomRequest=0,frame=0,lastTime=0,drag=null,route=null,restoreFocus=null,pendingTarget=null;
const restored=history.state?.labPosition;
if(history.state?.labLayoutVersion===roomLayoutVersion&&restored&&walkable(restored)&&Number.isFinite(restored.yaw)&&Number.isFinite(restored.pitch))position={...restored};
function preservePosition(){history.replaceState({...history.state,labPosition:{...position},labLayoutVersion:roomLayoutVersion},'');}
let suspended=false;
const screen=createWalkableScreen({changed(source){engine?.comparison(source);draw();},suspend(){suspended=true;stop();preservePosition();},resume(){suspended=false;stop();draw();},approach(){if(active&&innerWidth>=700)requestWalk({point:exhibits.worlds.approach,screen:true});else screen.inspect();}});
byId('visit-screen').hidden=false;byId('screen-controls').hidden=false;
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
  const where=nearby(position)==='home'?'Home exit':nearby(position)==='worlds'?'Worlds exhibit':nearby(position)==='catalog'?'Catalog exhibit':position.z>4.4?'Entrance':position.x<-3.6?'Apparatus bay':position.x>3.6&&position.z<-.7?'Study alcove':position.x>3.6?'Window gallery':'Benchmark hall';
  byId('position').textContent=where+' · facing '+facing;
  byId('map-player').setAttribute('transform','translate('+(50+position.x*4.75)+' '+(48+position.z*4.85)+') rotate('+(-degrees)+')');
  const station=nearby(position);byId('nearby').hidden=!station||!active||!!route;
  byId('nearby').textContent=station==='home'?'Exit to home':station==='worlds'?'Compare worlds':'Open catalog exhibit';
}
function draw(){if(!active||suspended||document.hidden)return;try{engine.draw(position);status();}catch{fallback('The 3D room stopped. You can still open the exhibits directly below.');}}
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
        if(arrived.target.screen){position.yaw=exhibits.worlds.approach.yaw;position.pitch=exhibits.worlds.approach.pitch;message('Click a still to enter. Open both worlds to vote; Next skips to a random pair.');}
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
  message(target.destination==='catalog'?'Walking to the catalog exhibit.':target.destination==='home'?'Walking to the home exit.':'Walking to the selected point.',true);
  canvas.focus({preventScroll:true});status();schedule();
}
function showRoom(room){
  stop();active=room;canvas.hidden=!room;byId('room-access').hidden=room;byId('orientation').hidden=!room;
  canvas.parentElement.classList.toggle('is-access',!room);
  controls();status();if(room)draw();
}
function fallback(text){
  const lostFocus=document.activeElement===canvas||document.activeElement===enterButton;
  failed=true;roomRequest++;showRoom(false);enterButton.hidden=true;byId('access-message').textContent=text;engine?.dispose();engine=null;
  if(lostFocus)byId('access-worlds').focus({preventScroll:true});
}
async function enter(){
  if(failed||loading)return;if(engine){showRoom(true);return;}
  loading=true;const request=++roomRequest;enterButton.disabled=true;byId('access-message').textContent='Opening the 3D Lab. Exhibit links remain available below.';
  try{const {createRoom}=await import('./room.mjs');if(request!==roomRequest||failed)return;engine=createRoom(canvas,()=>fallback('WebGL was interrupted. You can still open the exhibits directly below.'));engine.comparison(screen.source);showRoom(true);}
  catch{fallback('3D is unavailable in this browser. Use the exhibit links below; world previews and your notebook remain available.');}
  finally{loading=false;enterButton.disabled=false;}
}
function openStation(kind){
  if(kind==='worlds'){stop();screen.inspect();return;}
  if(!kind)return;const isHome=kind==='home',destination=safeDestination(kind);stop();
  restoreFocus=document.activeElement;
  byId('dialog-number').textContent=isHome?'Exit / Home':'02 / Catalog & evidence';
  byId('dialog-title').textContent=isHome?'Return to home':'Catalog & evidence';
  byId('dialog-copy').textContent=isHome?'Leave the research room and return to Jordan\'s public home page.':'Open the working public catalog, with search, evidence, and detailed tools in a readable 2D page.';
  byId('dialog-link').href=destination;byId('dialog-link').textContent=isHome?'Exit to home ↗':'Open the catalog ↗';dialog.showModal();
}
dialog.addEventListener('close',()=>{if(restoreFocus?.isConnected&&!restoreFocus.hidden)restoreFocus.focus({preventScroll:true});else byId('catalog-link').focus({preventScroll:true});});
enterButton.addEventListener('click',()=>{gentle.checked=true;enter();});
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
function targetKey(target){
  if(target?.comparison)return screen.hitTest(target.comparison)?.key||null;
  if(target?.destination)return 'station:'+target.destination;
  if(target?.screen)return 'approach:worlds';
  return target?.point?'walk':null;
}
canvas.addEventListener('pointerdown',event=>{
  if(event.button!==0||!active||suspended||!event.isPrimary)return;
  if(roomMenu.open){roomMenu.open=false;return;}
  canvas.focus({preventScroll:true});canvas.setPointerCapture(event.pointerId);
  cancelRoute();
  drag={id:event.pointerId,x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,moved:false,
    slop:clickSlop(event.pointerType),targetKey:targetKey(engine.pick(event.clientX,event.clientY)),view:{...position}};
});
canvas.addEventListener('pointermove',event=>{
  if(suspended||!drag||drag.id!==event.pointerId)return;
  if(!drag.moved){
    if(!movedBeyondClick(drag,event))return;
    const saved=drag;stop();drag=saved;drag.moved=true;
  }
  const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
  position.yaw-=dx*(gentle.checked?.002:.004);position.pitch=Math.max(-.4,Math.min(.3,position.pitch-dy*(gentle.checked?.001:.002)));
  drag.x=event.clientX;drag.y=event.clientY;draw();
});
canvas.addEventListener('pointerup',event=>{
  if(suspended||!drag||drag.id!==event.pointerId)return;
  const target=engine.pick(event.clientX,event.clientY),click=intentionalClick(drag,event,targetKey(target),position);
  drag=null;if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);
  if(click){if(target?.comparison){stop();if(Math.hypot(position.x-exhibits.worlds.approach.x,position.z-exhibits.worlds.approach.z)>1.1)requestWalk({point:exhibits.worlds.approach,screen:true});else screen.activate(target.comparison);}else requestWalk(target);}
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
function resizeRoom(){stop();draw();}
window.addEventListener('resize',resizeRoom);
window.visualViewport?.addEventListener('resize',resizeRoom);
new ResizeObserver(resizeRoom).observe(canvas);
function watchResolution(){matchMedia(`(resolution: ${devicePixelRatio}dppx)`).addEventListener('change',()=>{resizeRoom();watchResolution();},{once:true});}
watchResolution();
roomMenu.addEventListener('toggle',()=>{if(roomMenu.open)stop();});
roomMenu.addEventListener('keydown',event=>{if(event.key==='Escape'&&roomMenu.open){event.preventDefault();roomMenu.open=false;byId('navigation-toggle').focus();}});
document.addEventListener('pointerdown',event=>{if(roomMenu.open&&!roomMenu.contains(event.target))roomMenu.open=false;});
reduced.addEventListener('change',event=>{gentle.checked=event.matches;if(event.matches){roomRequest++;showRoom(false);engine?.dispose();engine=null;byId('access-message').textContent='Reduced motion is on. Open an exhibit directly, or enter the room with gentle movement.';enterButton.hidden=failed;}});
gentle.addEventListener('change',()=>{stop();draw();});
showRoom(false);
if(reduced.matches){byId('access-message').textContent='Reduced motion is on. Open an exhibit directly, or enter the room with gentle movement.';enterButton.hidden=false;}
else enter();
