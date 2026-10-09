import {createWalkableScreen} from './walkable-screen.js';
import {createSceneNavigation} from '../../walkable-3d/assets/scene-navigation.js';
import {clickSlop,movedBeyondClick,intentionalClick} from './interaction.mjs';
import {advance,spawn,nearby,safeDestination,walkable,exhibits,roomLayoutVersion,setExitDoors} from './production-navigation.mjs';
import {createExitController,HOME_URL} from './production-exit.mjs';

const $=id=>document.getElementById(id);
const canvas=$('room'),enterButton=$('enter-room'),gentle=$('gentle'),help=$('help-dialog'),station=$('station-dialog'),menu=$('room-menu');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
gentle.checked=reduced.matches;
createSceneNavigation(new URL('../../walkable-3d/',import.meta.url)).restore();
let position=spawn(),engine=null,active=false,loading=false,failed=false,suspended=false,request=0;
let frame=0,lastTime=0,idleTime=0,dirty=true,drag=null,restoreFocus=null;
let roomReady=false,captureId=0,captureWanted=false,capturePending=false,captureLegacy=false,locked=false,dragFallback=false;
const pitchLimit=Math.PI/2-.02;
let exitController=createExitController(),exitState=exitController.snapshot(),exitNavigating=false,exitTimer=0,preloadController=null,preloadStatus='idle',preloadEpoch=0;
const actions=new Set(),keys=new Set();
const keyMap={KeyW:'forward',KeyS:'backward',KeyA:'left',KeyD:'right',ArrowUp:'forward',ArrowDown:'backward',ArrowLeft:'left',ArrowRight:'right',ShiftLeft:'sprint',ShiftRight:'sprint'};
const saved=history.state;
if(saved?.labLayoutVersion===roomLayoutVersion&&saved.labPosition&&walkable(saved.labPosition)&&['yaw','pitch'].every(k=>Number.isFinite(saved.labPosition[k])))position={...spawn(),...saved.labPosition};
else try{const back=JSON.parse(sessionStorage.getItem('lab.production.character-return.v1'));sessionStorage.removeItem('lab.production.character-return.v1');const from=new URL(document.referrer||location.href);if(from.origin===location.origin&&from.pathname.endsWith('/character-bench/')&&back?.layout===roomLayoutVersion&&walkable(back.position)&&['yaw','pitch'].every(k=>Number.isFinite(back.position[k])))position={...spawn(),...back.position};}catch{}

position.eye=position.crouch?1:1.62;
function preserve(){const {x,z,yaw,pitch,crouch=false}=position;history.replaceState({...history.state,labPosition:{x,z,yaw,pitch,crouch},labLayoutVersion:roomLayoutVersion},'');}
function message(text=''){$('walk-status').hidden=!text;$('walk-message').textContent=text;}
function clearInput(){actions.clear();keys.clear();drag=null;position.vx=0;position.vz=0;}
function stop(){clearInput();message();if(frame)cancelAnimationFrame(frame);frame=0;lastTime=0;idleTime=0;}
function pauseExit(){exitState=exitController.update(position,{dt:0,active:false});abortPreload();}
function releaseLook(){captureId++;captureWanted=capturePending=captureLegacy=locked=false;if(document.pointerLockElement===canvas)document.exitPointerLock?.();clearInput();pauseExit();}
function available(){return !!engine&&active&&!suspended&&!document.hidden&&document.hasFocus()&&!help.open&&!station.open&&!$('comparison-dialog').open&&!menu.open;}
function inputReady(){return roomReady&&available();}
function loadingStage(text,destination='Lab'){$('loading-name').textContent=destination;$('loading-stage').textContent=text;$('lab-loading').classList.remove('is-ready');$('lab-loading').hidden=false;$('lab-loading').removeAttribute('aria-hidden');}
function finishLoading(){if(roomReady)return;roomReady=true;$('lab-loading').classList.add('is-ready');$('lab-loading').setAttribute('aria-hidden','true');if(!document.activeElement||document.activeElement===document.body||document.activeElement===canvas)canvas.focus({preventScroll:true});}
function invalidate(){dirty=true;schedule();}
function schedule(){if(available()&&!frame)frame=requestAnimationFrame(tick);}
function targetKey(target){if(target?.comparison)return screen.hitTest(target.comparison)?.key||'worlds';if(target?.destination)return 'station:'+target.destination;return null;}
function status(){const kind=nearby(position);$('nearby').hidden=!kind||document.pointerLockElement===canvas;$('nearby').textContent=kind==='character'?'CharacterBench':kind==='worlds'?'Compare scenes':kind==='home'?'Exit to home':'Open catalog';}
function draw(dt=0,time=performance.now()/1000,interactive=false){if(!available())return;try{const rendered=engine.draw(position,{dt,time,interactive});if(rendered===false)return;status();if(!roomReady){const state=engine.diagnostics?.characterState;if(state==='failed')fallback('The character could not load. Try again or open a destination below.');else if(!state||state==='ready')finishLoading();else loadingStage('Placing character');}}catch{fallback('The 3D Lab stopped. Try again or open a destination below.');}}
function tick(time){
  frame=0;if(!available()){lastTime=0;return;}
  const dt=lastTime?Math.min(Math.max((time-lastTime)/1000,0),.05):0;lastTime=time;idleTime+=dt;
  updateExit(dt);if(exitNavigating)return;
  const moving=actions.size>0||Math.abs(position.vx||0)+Math.abs(position.vz||0)>.001||Math.abs((position.eye??1.62)-(position.crouch?1:1.62))>.002;
  advance(position,actions,dt,gentle.checked);
  updateExit(0);if(exitNavigating)return;
  const interactive=moving||!!drag||document.pointerLockElement===canvas;
  if(dirty||interactive||idleTime>=.05){draw(idleTime,time/1000,interactive);dirty=false;idleTime=0;}
  if(available()&&(moving||drag||engine?.needsAnimation||exitState.needsAnimation||document.pointerLockElement===canvas))schedule();else lastTime=0;
}
function abortPreload(){preloadEpoch++;preloadController?.abort();preloadController=null;if(preloadStatus==='loading')preloadStatus='unavailable';}
async function preloadHome(){
  if(preloadStatus!=='idle')return;preloadStatus='loading';
  const id=++preloadEpoch,controller=new AbortController();preloadController=controller;const timer=setTimeout(()=>controller.abort(),6000);
  try{
    // Cache only a bounded public HTML response. No hidden page or WebGL scene.
    const response=await fetch(HOME_URL,{mode:'same-origin',credentials:'omit',redirect:'error',cache:'force-cache',referrerPolicy:'no-referrer',signal:controller.signal});
    if(!response.ok||Number(response.headers.get('content-length')||0)>262144)throw new Error('Preload unavailable');
    const reader=response.body?.getReader();let bytes=0;
    if(reader)for(;;){const chunk=await reader.read();if(chunk.done)break;bytes+=chunk.value.byteLength;if(bytes>262144){await reader.cancel();throw new Error('Preload budget exceeded');}}
    if(controller.signal.aborted)throw new Error('Preload cancelled');if(id===preloadEpoch)preloadStatus='ready';
  }catch{if(id===preloadEpoch)preloadStatus='unavailable';}
  finally{clearTimeout(timer);if(preloadController===controller)preloadController=null;}
}
function leaveHome(){
  if(exitNavigating)return;exitNavigating=true;suspended=true;releaseLook();stop();request++;abortPreload();
  // Back returns to the Lab entrance, outside the automatic departure plane.
  const origin=spawn();history.replaceState({...history.state,labPosition:origin,labLayoutVersion:roomLayoutVersion},'');
  loadingStage('Opening home','Home');
  exitTimer=setTimeout(()=>{exitTimer=0;engine?.dispose();engine=null;exitController.dispose();location.assign(HOME_URL);},reduced.matches?0:180);
}
function updateExit(dt){
  const before=exitState.phase;
  exitState=exitController.update(position,{dt,active:inputReady(),focused:document.hasFocus(),slowMotion:gentle.checked});
  setExitDoors(exitState.doors);if(engine?.exit?.(exitState.doors))dirty=true;
  if(exitState.preload===HOME_URL)preloadHome();
  if(before!=='lab'&&exitState.phase==='lab')abortPreload();
  if(exitState.navigate===HOME_URL)leaveHome();
}
const screen=createWalkableScreen({
  changed(source){engine?.comparison(source);invalidate();},
  suspend(){suspended=true;releaseLook();stop();preserve();},
  resume(){suspended=false;stop();invalidate();},
  depart(){suspended=true;releaseLook();stop();preserve();request++;engine?.dispose();engine=null;},
  approach(){screen.inspect();}
});

function showRoom(value){active=value;canvas.hidden=!value;$('room-access').hidden=value;canvas.parentElement.classList.toggle('is-access',!value);$('explore').hidden=!value;for(const id of ['visit-bench','visit-home','visit-character','reset'])$(id).disabled=!value;if(value)invalidate();}
function fallback(text){failed=true;loading=false;roomReady=false;request++;releaseLook();stop();showRoom(false);engine?.dispose();engine=null;$('lab-loading').hidden=true;enterButton.hidden=false;enterButton.disabled=false;$('access-message').textContent=text;}
async function enter(){
  if(loading)return;if(engine){showRoom(true);return;}
  failed=false;roomReady=false;dragFallback=false;loading=true;const generation=++request;enterButton.disabled=true;$('room-access').hidden=true;loadingStage('Loading Lab');
  try{const {createRoom}=await import('./production-room.mjs');if(generation!==request||failed)return;loadingStage('Preparing room');engine=createRoom(canvas,()=>fallback('WebGL was interrupted. Try again or open a destination below.'),{changed:invalidate});engine.comparison(screen.source);showRoom(true);}
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
function activate(target){if(target?.comparison){const close=Math.hypot(position.x-exhibits.worlds.approach.x,position.z-exhibits.worlds.approach.z)<=1.25;if(close){releaseLook();stop();screen.activate(target.comparison);}else openStation('worlds');}else if(['character','catalog','home','worlds'].includes(target?.destination))openStation(target.destination);}

$('visit-screen').hidden=false;$('screen-controls').hidden=false;$('help').hidden=false;
enterButton.addEventListener('click',enter);
function openHelp(){if(!inputReady())return;releaseLook();stop();help.showModal();$('resume-look').focus({preventScroll:true});}
$('help').addEventListener('click',openHelp);
help.addEventListener('close',()=>{canvas.focus({preventScroll:true});invalidate();});
help.addEventListener('cancel',event=>{event.preventDefault();help.close();});
$('resume-look').addEventListener('click',()=>{help.close();requestLook();});
station.addEventListener('close',()=>{if(restoreFocus?.isConnected&&!restoreFocus.hidden)restoreFocus.focus({preventScroll:true});else canvas.focus({preventScroll:true});invalidate();});
for(const [id,kind] of [['visit-bench','catalog'],['visit-home','home'],['visit-character','character']])$(id).addEventListener('click',()=>{help.close();openStation(kind);});
$('reset').addEventListener('click',()=>{help.close();releaseLook();stop();exitController.cancel();position=spawn();invalidate();});
$('nearby').addEventListener('click',()=>openStation(nearby(position)));
for(const link of document.querySelectorAll('a[href*="character-bench/"]'))link.addEventListener('click',preserveCharacterReturn);
gentle.addEventListener('change',()=>{stop();invalidate();});
function captureFallback(){capturePending=captureWanted=captureLegacy=false;if(inputReady()){dragFallback=true;message('Hold the left mouse button to look. Escape opens controls.');}}
async function requestLook(){
  if(!inputReady()||locked||capturePending)return;
  message();canvas.focus({preventScroll:true});
  if(!canvas.requestPointerLock){captureFallback();return;}
  const id=++captureId;capturePending=captureWanted=true;captureLegacy=false;
  try{
    const result=canvas.requestPointerLock({unadjustedMovement:true});
    if(!result||typeof result.then!=='function'){captureLegacy=true;return;}
    try{await result;}catch(error){if(error.name!=='NotSupportedError'||id!==captureId||!inputReady())throw error;await canvas.requestPointerLock();}
  }catch{if(id===captureId&&inputReady())captureFallback();}
  finally{if(id===captureId&&!captureLegacy)capturePending=false;}
  invalidate();
}
$('explore').addEventListener('click',requestLook);
canvas.addEventListener('keydown',event=>{
  if(!inputReady())return;
  if(keyMap[event.code]){event.preventDefault();message();keys.add(event.code);actions.add(keyMap[event.code]);schedule();}
  else if(event.code==='Enter'&&!locked){event.preventDefault();if(!event.repeat)requestLook();}
  else if(event.code==='KeyE'||event.code==='Enter'){event.preventDefault();if(!event.repeat){const rect=canvas.getBoundingClientRect(),target=engine.pick(rect.left+rect.width/2,rect.top+rect.height/2);if(target?.comparison||target?.destination)activate(target);else openStation(nearby(position));}}
  else if(event.code==='KeyC'&&!event.repeat){event.preventDefault();position.crouch=!position.crouch;invalidate();}
  else if(event.code==='KeyR'&&!event.repeat){event.preventDefault();stop();position=spawn();invalidate();}
  else if(event.code==='Escape'&&!event.repeat){event.preventDefault();openHelp();}
});
window.addEventListener('keyup',event=>{keys.delete(event.code);const action=keyMap[event.code];if(action&&!Object.keys(keyMap).some(k=>keys.has(k)&&keyMap[k]===action))actions.delete(action);});
canvas.addEventListener('blur',()=>{releaseLook();stop();invalidate();});
function sensitivityPercent(){return Math.max(40,Math.min(220,Number($('sensitivity').value)||100));}
function look(dx,dy){if(!Number.isFinite(dx)||!Number.isFinite(dy))return;const sensitivity=.0026*sensitivityPercent()/100;position.yaw-=dx*sensitivity;position.pitch=Math.max(-pitchLimit,Math.min(pitchLimit,position.pitch-dy*sensitivity));engine?.pose?.(position);invalidate();}
$('sensitivity').addEventListener('input',()=>{$('sensitivity-value').textContent=sensitivityPercent()+'%';});
document.addEventListener('pointerlockchange',()=>{const wasLocked=locked;locked=document.pointerLockElement===canvas;capturePending=captureLegacy=false;if(locked&&(!captureWanted||!inputReady())){document.exitPointerLock?.();locked=false;}if(locked){drag=null;dragFallback=false;canvas.focus({preventScroll:true});}else {captureWanted=false;if(wasLocked){clearInput();message();pauseExit();}}$('explore').hidden=!active||locked;invalidate();});
document.addEventListener('pointerlockerror',()=>{if(captureLegacy&&capturePending)captureFallback();});
document.addEventListener('mousemove',event=>{if(locked&&document.pointerLockElement===canvas&&inputReady())look(event.movementX,event.movementY);});
canvas.addEventListener('pointerdown',event=>{
  if(event.button!==0||!inputReady()||event.isPrimary===false)return;
  canvas.focus({preventScroll:true});message();
  if(locked){const rect=canvas.getBoundingClientRect();activate(engine.pick(rect.left+rect.width/2,rect.top+rect.height/2));return;}
  const capture=(!event.pointerType||event.pointerType==='mouse')&&!dragFallback;
  canvas.setPointerCapture(event.pointerId);drag={id:event.pointerId,x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,moved:false,capture,slop:clickSlop(event.pointerType),targetKey:targetKey(engine.pick(event.clientX,event.clientY)),view:{...position}};
  if(capture)requestLook();
});
canvas.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId||!inputReady())return;if(event.pointerType==='mouse'&&event.buttons!==undefined&&!(event.buttons&1)){drag=null;return;}if(!drag.moved&&!movedBeyondClick(drag,event))return;drag.moved=true;look(event.clientX-drag.x,event.clientY-drag.y);drag.x=event.clientX;drag.y=event.clientY;});
canvas.addEventListener('pointerup',event=>{if(!drag||drag.id!==event.pointerId)return;const target=drag.moved||drag.capture?null:engine.pick(event.clientX,event.clientY),click=!drag.capture&&intentionalClick(drag,event,targetKey(target),position);drag=null;if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);if(click)activate(target);invalidate();});
canvas.addEventListener('pointercancel',()=>{releaseLook();stop();invalidate();});canvas.addEventListener('lostpointercapture',()=>{drag=null;});
function suspend(){releaseLook();stop();if(!exitNavigating)preserve();}
window.addEventListener('blur',suspend);window.addEventListener('focus',invalidate);
document.addEventListener('visibilitychange',()=>{suspend();if(!document.hidden)invalidate();});
window.addEventListener('pagehide',()=>{suspended=true;suspend();if(exitTimer){clearTimeout(exitTimer);exitTimer=0;}request++;loading=false;roomReady=false;engine?.dispose();engine=null;});
window.addEventListener('pageshow',event=>{if(event.persisted){if(exitNavigating){exitNavigating=false;position=spawn();exitController=createExitController();exitState=exitController.snapshot();preloadStatus='idle';setExitDoors(exitState.doors);}suspended=false;failed=false;stop();if(!engine)enter();else invalidate();}});
function resize(){clearInput();invalidate();}
window.addEventListener('resize',resize);window.visualViewport?.addEventListener('resize',resize);new ResizeObserver(resize).observe(canvas);
function watchResolution(){matchMedia(`(resolution: ${devicePixelRatio}dppx)`).addEventListener('change',()=>{resize();watchResolution();},{once:true});}watchResolution();
menu.addEventListener('toggle',()=>{if(menu.open){releaseLook();stop();}else invalidate();});
menu.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.open){event.preventDefault();menu.open=false;$('navigation-toggle').focus();}});
document.addEventListener('pointerdown',event=>{if(menu.open&&!menu.contains(event.target))menu.open=false;});
reduced.addEventListener('change',event=>{gentle.checked=event.matches;suspend();invalidate();});
if(new URLSearchParams(location.search).has('labqa'))window.__productionLab={get engine(){return engine;},get position(){return {...position};},get exit(){return {phase:exitState.phase,doors:{...exitState.doors},preload:preloadStatus,navigating:exitNavigating};},teleport(value){if(walkable(value)){stop();exitController.cancel();position={...spawn(),...value};invalidate();}},get running(){return !!frame;},get suspended(){return suspended;}};
showRoom(false);enterButton.hidden=true;enter();
