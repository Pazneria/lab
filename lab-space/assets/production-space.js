import {createWalkableScreen} from './walkable-screen.js';
import {createSceneNavigation} from '../../walkable-3d/assets/scene-navigation.js';
import {clickSlop,movedBeyondClick,intentionalClick} from './interaction.mjs';
import {advance,spawn,nearby,safeDestination,planRoute,followRoute,approaches,walkable,exhibits,roomLayoutVersion} from './production-navigation.mjs';

const $=id=>document.getElementById(id);
const canvas=$('room'),enterButton=$('enter-room'),gentle=$('gentle'),help=$('help-dialog'),station=$('station-dialog'),menu=$('room-menu');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
gentle.checked=reduced.matches;
createSceneNavigation(new URL('../../walkable-3d/',import.meta.url)).restore();
let position=spawn(),engine=null,active=false,loading=false,failed=false,suspended=false,request=0;
let frame=0,lastTime=0,idleTime=0,dirty=true,drag=null,route=null,pendingTarget=null,restoreFocus=null;
const actions=new Set(),keys=new Set(),held=new Map();
const keyMap={KeyW:'forward',KeyS:'backward',KeyA:'left',KeyD:'right',ArrowUp:'forward',ArrowDown:'backward',ArrowLeft:'turnLeft',ArrowRight:'turnRight',ShiftLeft:'sprint',ShiftRight:'sprint'};
const saved=history.state;
if(saved?.labLayoutVersion===roomLayoutVersion&&saved.labPosition&&walkable(saved.labPosition)&&['yaw','pitch'].every(k=>Number.isFinite(saved.labPosition[k])))position={...spawn(),...saved.labPosition};
else try{const back=JSON.parse(sessionStorage.getItem('lab.production.character-return.v1'));sessionStorage.removeItem('lab.production.character-return.v1');const from=new URL(document.referrer||location.href);if(from.origin===location.origin&&from.pathname.endsWith('/character-bench/')&&back?.layout===roomLayoutVersion&&walkable(back.position)&&['yaw','pitch'].every(k=>Number.isFinite(back.position[k])))position={...spawn(),...back.position};}catch{}

function preserve(){const {x,z,yaw,pitch,crouch=false}=position;history.replaceState({...history.state,labPosition:{x,z,yaw,pitch,crouch},labLayoutVersion:roomLayoutVersion},'');}
function message(text='',walking=false){$('walk-status').hidden=!text;$('walk-message').textContent=text;$('cancel-walk').hidden=!walking;}
function cancelRoute(){route=null;engine?.target(null);message();}
function clearInput(){actions.clear();keys.clear();held.clear();drag=null;position.vx=0;position.vz=0;}
function stop(){clearInput();cancelRoute();if(frame)cancelAnimationFrame(frame);frame=0;lastTime=0;idleTime=0;}
function releaseLook(){if(document.pointerLockElement===canvas)document.exitPointerLock?.();clearInput();}
function available(){return !!engine&&active&&!suspended&&!document.hidden&&document.hasFocus()&&!help.open&&!station.open&&!$('comparison-dialog').open&&!menu.open;}
function invalidate(){dirty=true;schedule();}
function schedule(){if(available()&&!frame)frame=requestAnimationFrame(tick);}
function targetKey(target){if(target?.comparison)return screen.hitTest(target.comparison)?.key||'worlds';if(target?.destination)return 'station:'+target.destination;return target?.point?'walk':null;}
function status(){const kind=nearby(position);$('nearby').hidden=!kind||!!route||document.pointerLockElement===canvas;$('nearby').textContent=kind==='character'?'CharacterBench':kind==='worlds'?'Compare scenes':kind==='home'?'Exit to home':'Open catalog';}
function draw(dt=0,time=performance.now()/1000,interactive=false){if(!available())return;try{engine.draw(position,{dt,time,interactive});status();}catch{fallback('The 3D Lab stopped. Its destinations remain available below.');}}
function tick(time){
  frame=0;if(!available()){lastTime=0;return;}
  const dt=lastTime?Math.min(Math.max((time-lastTime)/1000,0),.05):0;lastTime=time;idleTime+=dt;
  const moving=actions.size>0||!!route||Math.abs(position.vx||0)+Math.abs(position.vz||0)>.001||Math.abs((position.eye??1.62)-(position.crouch?1.12:1.62))>.002;
  if(route){
    const result=followRoute(position,route.points,dt,gentle.checked);
    if(result!=='walking'){const target=route.target;cancelRoute();if(result==='arrived'){const view=target.destination?approaches[target.destination]:target.screen?exhibits.worlds.approach:null;if(view){position.yaw=view.yaw;position.pitch=view.pitch??0;}if(target.screen)message('Select a preview to enter a scene.');if(target.destination)openStation(target.destination);}}
  }else advance(position,actions,dt,gentle.checked);
  const interactive=moving||!!drag||document.pointerLockElement===canvas;
  if(dirty||interactive||idleTime>=.05){draw(idleTime,time/1000,interactive);dirty=false;idleTime=0;}
  if(available()&&(moving||drag||engine?.needsAnimation||document.pointerLockElement===canvas))schedule();else lastTime=0;
}
const screen=createWalkableScreen({
  changed(source){engine?.comparison(source);invalidate();},
  suspend(){suspended=true;releaseLook();stop();preserve();},
  resume(){suspended=false;stop();invalidate();},
  depart(){suspended=true;releaseLook();stop();preserve();request++;engine?.dispose();engine=null;},
  approach(){if(active&&innerWidth>=700)walk({point:exhibits.worlds.approach,screen:true});else screen.inspect();}
});

function walk(target){
  if(!active||suspended)return;releaseLook();stop();
  const point=target?.destination?approaches[target.destination]:target?.point;
  const points=point&&planRoute(position,point,{approach:!!target.approach});
  if(!points){message('Select reachable floor or use the Lab menu.');invalidate();return;}
  route={points,target};engine.target(points.at(-1));message('Walking to '+(target.destination==='character'?'CharacterBench':target.destination==='worlds'||target.screen?'SceneBench':target.destination==='catalog'?'the catalog':target.destination==='home'?'the exit':'the selected point')+'.',true);
  canvas.focus({preventScroll:true});invalidate();
}
function showRoom(value){active=value;canvas.hidden=!value;$('room-access').hidden=value;canvas.parentElement.classList.toggle('is-access',!value);$('explore').hidden=!value;$('movement').hidden=!value||!$('show-pad').checked;for(const id of ['visit-bench','visit-home','visit-character','reset'])$(id).disabled=!value;if(value)invalidate();}
function fallback(text){failed=true;loading=false;request++;releaseLook();stop();showRoom(false);engine?.dispose();engine=null;enterButton.hidden=true;$('access-message').textContent=text;}
async function enter(){
  if(failed||loading)return;if(engine){showRoom(true);return;}
  loading=true;const generation=++request;enterButton.disabled=true;$('access-message').textContent='Opening the Lab…';
  try{const {createRoom}=await import('./production-room.mjs');if(generation!==request||failed)return;engine=createRoom(canvas,()=>fallback('WebGL was interrupted. Open a destination directly below.'),{changed:invalidate});engine.comparison(screen.source);showRoom(true);}
  catch(error){if(generation===request){console.error('Lab initialization failed',error);fallback('3D is unavailable in this browser. Open a destination directly below.');}}
  finally{if(generation===request){loading=false;enterButton.disabled=false;}}
}
function characterDestination(){
  // The dedicated comparison is owned separately from the private inspection Studio.
  const href=$('character-link').getAttribute('href');
  if(!href||href==='#')return null;
  const url=new URL(href,location.href);
  if(url.origin!==location.origin||!url.pathname.endsWith('/character-bench/'))return null;
  return url.href;
}
function preserveCharacterReturn(){preserve();try{const {x,z,yaw,pitch,crouch=false}=position;sessionStorage.setItem('lab.production.character-return.v1',JSON.stringify({layout:roomLayoutVersion,position:{x,z,yaw,pitch,crouch}}));}catch{}}
function openStation(kind){
  if(!kind)return;releaseLook();stop();preserve();
  if(kind==='worlds'){screen.inspect();return;}
  if(kind==='character'){
    const destination=characterDestination();
    if(destination){preserveCharacterReturn();suspended=true;request++;engine?.dispose();engine=null;location.assign(destination);return;}
    restoreFocus=document.activeElement;$('dialog-number').textContent='CharacterBench';$('dialog-title').textContent='Character comparisons';$('dialog-copy').textContent='The dedicated comparison room is being prepared. It will compare two attempts of the same character prompt side by side.';$('dialog-link').hidden=true;station.showModal();return;
  }
  restoreFocus=document.activeElement;const home=kind==='home';$('dialog-number').textContent=home?'Exit':'Catalog';$('dialog-title').textContent=home?'Return home':'Catalog & evidence';$('dialog-copy').textContent=home?"Return to Jordan’s home page.":'Browse the public benchmark catalog, sources, and graphs.';$('dialog-link').href=safeDestination(kind);$('dialog-link').textContent=home?'Exit to home':'Open catalog';$('dialog-link').hidden=false;station.showModal();
}
function activate(target){if(target?.comparison){const close=Math.hypot(position.x-exhibits.worlds.approach.x,position.z-exhibits.worlds.approach.z)<=1.25;if(close){releaseLook();stop();screen.activate(target.comparison);}else walk({point:exhibits.worlds.approach,screen:true});}else if(target?.destination==='character')openStation('character');else if(target?.destination||target?.point)walk(target);}

$('visit-screen').hidden=false;$('screen-controls').hidden=false;$('help').hidden=false;
enterButton.addEventListener('click',enter);
$('help').addEventListener('click',()=>{releaseLook();stop();help.showModal();});
help.addEventListener('close',()=>{if(pendingTarget){const target=pendingTarget;pendingTarget=null;walk(target);}else {$('help').focus({preventScroll:true});invalidate();}});
station.addEventListener('close',()=>{if(restoreFocus?.isConnected&&!restoreFocus.hidden)restoreFocus.focus({preventScroll:true});else canvas.focus({preventScroll:true});invalidate();});
for(const [id,target] of [['visit-bench',{destination:'catalog'}],['visit-home',{destination:'home'}],['visit-character',{destination:'character'}],['reset',{point:spawn()}]])$(id).addEventListener('click',()=>{pendingTarget=target;help.close();});
$('nearby').addEventListener('click',()=>openStation(nearby(position)));
for(const link of document.querySelectorAll('a[href*="character-bench/"]'))link.addEventListener('click',preserveCharacterReturn);
$('cancel-walk').addEventListener('click',()=>{stop();canvas.focus({preventScroll:true});invalidate();});
$('show-pad').addEventListener('change',()=>{stop();$('movement').hidden=!active||!$('show-pad').checked;invalidate();});
gentle.addEventListener('change',()=>{stop();invalidate();});
$('explore').addEventListener('click',async()=>{if(!active||suspended)return;stop();canvas.focus({preventScroll:true});try{await canvas.requestPointerLock?.();}catch{message('Mouse capture is unavailable. Drag the view to look around.');}invalidate();});
canvas.addEventListener('keydown',event=>{
  if(!available())return;
  if(keyMap[event.code]){event.preventDefault();cancelRoute();keys.add(event.code);actions.add(keyMap[event.code]);schedule();}
  else if(event.code==='KeyE'||event.code==='Enter'){event.preventDefault();if(!event.repeat){const rect=canvas.getBoundingClientRect(),target=engine.pick(rect.left+rect.width/2,rect.top+rect.height/2);if(target?.comparison||target?.destination)activate(target);else openStation(nearby(position));}}
  else if(event.code==='KeyC'&&!event.repeat){event.preventDefault();position.crouch=!position.crouch;invalidate();}
  else if(event.code==='KeyR'&&!event.repeat){event.preventDefault();stop();position=spawn();invalidate();}
  else if(event.code==='Escape'){event.preventDefault();releaseLook();stop();canvas.blur();$('help').focus({preventScroll:true});invalidate();}
});
window.addEventListener('keyup',event=>{keys.delete(event.code);const action=keyMap[event.code];if(action&&!Object.keys(keyMap).some(k=>keys.has(k)&&keyMap[k]===action)&&![...held.values()].some(v=>v.action===action))actions.delete(action);});
canvas.addEventListener('blur',()=>{stop();invalidate();});
function look(dx,dy){const sensitivity=Number($('sensitivity').value)||.0018;position.yaw-=dx*sensitivity;position.pitch=Math.max(-1.35,Math.min(1.35,position.pitch-dy*sensitivity));invalidate();}
document.addEventListener('pointerlockchange',()=>{clearInput();cancelRoute();$('explore').hidden=!active||document.pointerLockElement===canvas;invalidate();});
document.addEventListener('mousemove',event=>{if(document.pointerLockElement===canvas&&available())look(event.movementX,event.movementY);});
canvas.addEventListener('pointerdown',event=>{
  if(event.button!==0||!available()||event.isPrimary===false)return;
  canvas.focus({preventScroll:true});cancelRoute();
  if(document.pointerLockElement===canvas){const rect=canvas.getBoundingClientRect();activate(engine.pick(rect.left+rect.width/2,rect.top+rect.height/2));return;}
  canvas.setPointerCapture(event.pointerId);drag={id:event.pointerId,x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,moved:false,slop:clickSlop(event.pointerType),targetKey:targetKey(engine.pick(event.clientX,event.clientY)),view:{...position}};
});
canvas.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId||!available())return;if(!drag.moved&&!movedBeyondClick(drag,event))return;drag.moved=true;look(event.clientX-drag.x,event.clientY-drag.y);drag.x=event.clientX;drag.y=event.clientY;});
canvas.addEventListener('pointerup',event=>{if(!drag||drag.id!==event.pointerId)return;const target=drag.moved?null:engine.pick(event.clientX,event.clientY),click=intentionalClick(drag,event,targetKey(target),position);drag=null;if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);if(click)activate(target);invalidate();});
canvas.addEventListener('pointercancel',()=>{stop();invalidate();});canvas.addEventListener('lostpointercapture',()=>{drag=null;});
for(const button of document.querySelectorAll('[data-move]')){
  const action=button.dataset.move;
  button.addEventListener('pointerdown',event=>{if(event.button!==0||!available())return;event.preventDefault();cancelRoute();button.setPointerCapture(event.pointerId);held.set(event.pointerId,{action,start:performance.now()});actions.add(action);schedule();});
  const release=event=>{const value=held.get(event.pointerId);if(!value)return;held.delete(event.pointerId);if(![...held.values()].some(v=>v.action===action)&&!Object.keys(keyMap).some(k=>keys.has(k)&&keyMap[k]===action))actions.delete(action);if(event.type==='pointerup'&&performance.now()-value.start<160){advance(position,new Set([action]),.05,gentle.checked);invalidate();}if(button.hasPointerCapture(event.pointerId))button.releasePointerCapture(event.pointerId);};
  for(const type of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(type,release);
  button.addEventListener('click',event=>{if(event.detail===0&&available()){cancelRoute();advance(position,new Set([action]),.05,gentle.checked);invalidate();}});
}
function suspend(){releaseLook();stop();preserve();}
window.addEventListener('blur',suspend);window.addEventListener('focus',invalidate);
document.addEventListener('visibilitychange',()=>{suspend();if(!document.hidden)invalidate();});
window.addEventListener('pagehide',()=>{suspended=true;suspend();request++;loading=false;engine?.dispose();engine=null;});
window.addEventListener('pageshow',event=>{if(event.persisted){suspended=false;failed=false;stop();if(!engine&&(active||!reduced.matches))enter();else invalidate();}});
function resize(){clearInput();invalidate();}
window.addEventListener('resize',resize);window.visualViewport?.addEventListener('resize',resize);new ResizeObserver(resize).observe(canvas);
function watchResolution(){matchMedia(`(resolution: ${devicePixelRatio}dppx)`).addEventListener('change',()=>{resize();watchResolution();},{once:true});}watchResolution();
menu.addEventListener('toggle',()=>{if(menu.open){releaseLook();stop();}else invalidate();});
menu.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.open){event.preventDefault();menu.open=false;$('navigation-toggle').focus();}});
document.addEventListener('pointerdown',event=>{if(menu.open&&!menu.contains(event.target))menu.open=false;});
reduced.addEventListener('change',event=>{gentle.checked=event.matches;if(event.matches){suspend();request++;loading=false;showRoom(false);engine?.dispose();engine=null;$('access-message').textContent='Reduced motion is on. Open a destination directly, or enter the Lab with gentle movement.';enterButton.hidden=failed;}});
if(new URLSearchParams(location.search).has('labqa'))window.__productionLab={get engine(){return engine;},get position(){return {...position};},teleport(value){if(walkable(value)){stop();position={...spawn(),...value};invalidate();}},get running(){return !!frame;},get suspended(){return suspended;}};
showRoom(false);enterButton.hidden=false;if(reduced.matches)$('access-message').textContent='Reduced motion is on. Open a destination directly, or enter the Lab with gentle movement.';else enter();
