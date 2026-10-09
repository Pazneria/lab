// CPU-only lifecycle tests for the host controller. No WebGL, browser, server,
// entrant code, or private data runs here; rendering and navigation are inert.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import * as interaction from '../lab-space/assets/interaction.mjs';
import * as exit from '../lab-space/assets/production-exit.mjs';
import * as realNavigation from '../lab-space/assets/production-navigation.mjs';

const source=readFileSync(new URL('../lab-space/assets/production-space.js',import.meta.url),'utf8');
const copy=value=>JSON.parse(JSON.stringify(value));
const settle=()=>new Promise(resolve=>setImmediate(resolve));
function until(f,predicate,max=500){for(let i=0;i<max&&!predicate();i++)f.flush(f.clock+50);assert.ok(predicate(),'Expected bounded controller progress');}

async function controllerFixture({reducedMotion=false,animate=false,deferImport=false,state={},characterHref='../character-bench/?prompt=02',session=new Map(),referrer='',settleEye=false,requestLock,characterState='ready',drawError=false,renderable=true,actualNavigation=false,fetchResponse}={}) {
  const elements=new Map(),renderers=[],frames=new Map(),cancelled=[],log=[],advances=[],routes=[],media=[],observers=[],captureRequests=[],timers=new Map(),fetches=[];
  let timerId=0;
  let nextFrame=0,maxFrames=0,clock=100,focused=true,picked={point:{x:3,z:3}},screenCallbacks,importRelease;
  const importGate=deferImport?new Promise(resolve=>{importRelease=resolve;}):null;
  function target(properties={}) {
    const listeners=new Map();
    return Object.assign({
      listeners,
      addEventListener(type,listener){if(!listeners.has(type))listeners.set(type,[]);listeners.get(type).push(listener);},
      async emit(type,event={}){
        event={type,target:this,currentTarget:this,preventDefault(){this.defaultPrevented=true;},...event};
        for(const listener of listeners.get(type)||[])await listener(event);
        return event;
      },
    },properties);
  }
  let document;
  function element(id='') {
    const capture=new Set(),attrs=new Map(),classes=new Set();
    return target({id,dataset:{},hidden:false,disabled:false,checked:false,open:false,value:'',isConnected:true,
      parentElement:{classList:{toggle(){}}},classList:{toggle(){},add:value=>classes.add(value),remove:value=>classes.delete(value),contains:value=>classes.has(value)},
      getAttribute:name=>attrs.get(name)??null,setAttribute(name,value){attrs.set(name,String(value));},removeAttribute:name=>attrs.delete(name),
      focus(){document.activeElement=this;},blur(){if(document.activeElement===this)document.activeElement=null;this.emit('blur');},
      showModal(){this.open=true;},close(){if(this.open){this.open=false;this.emit('close');}},
      contains(other){return this===other;},
      getBoundingClientRect:()=>({left:0,top:0,width:1000,height:600}),
      setPointerCapture:id=>capture.add(id),hasPointerCapture:id=>capture.has(id),releasePointerCapture:id=>capture.delete(id),
    });
  }
  const byId=id=>{if(!elements.has(id))elements.set(id,element(id));return elements.get(id);};
  const pad=['forward','backward','left','right','turnLeft','turnRight'].map(action=>{const button=element('pad-'+action);button.dataset.move=action;return button;});
  document=target({hidden:false,pointerLockElement:null,activeElement:null,referrer,hasFocus:()=>focused,
    getElementById:byId,querySelectorAll:selector=>selector==='[data-move]'?pad:selector==='a[href*="character-bench/"]'?[byId('character-link'),byId('access-character')]:[],
    exitPointerLock(){this.pointerLockElement=null;},
  });
  const canvas=byId('room');
  canvas.requestPointerLock=requestLock===null?undefined:options=>{captureRequests.push(options);if(requestLock)return requestLock(options,captureRequests.length);document.pointerLockElement=canvas;return document.emit('pointerlockchange');};
  byId('character-link').setAttribute('href',characterHref);
  byId('sensitivity').value='100';
  const location={href:'https://example.test/lab/lab-space/?labqa',search:'?labqa',origin:'https://example.test',
    assign(url){log.push({event:'assign',url});},
  };
  const history={state:copy(state),replaceState(value){this.state=copy(value);}};
  const window=target({visualViewport:target()});
  const context=vm.createContext({URL,URLSearchParams,console,document,window,history,location,
    AbortController,
    setTimeout(callback,delay){const id=++timerId;timers.set(id,{callback,delay});return id;},clearTimeout(id){timers.delete(id);},
    fetch(url,options){fetches.push({url,options});return fetchResponse?fetchResponse(url,options):Promise.resolve({ok:true,headers:{get:()=>null},body:{getReader:()=>({read:async()=>({done:true})})}});},
    sessionStorage:{getItem:key=>session.get(key)??null,setItem:(key,value)=>session.set(key,value),removeItem:key=>session.delete(key)},
    innerWidth:1000,devicePixelRatio:2,performance:{now:()=>clock},
    requestAnimationFrame(callback){const id=++nextFrame;frames.set(id,callback);maxFrames=Math.max(maxFrames,frames.size);return id;},
    cancelAnimationFrame(id){cancelled.push(id);frames.delete(id);},
    matchMedia(query){const value=target({media:query,matches:query.includes('reduced-motion')&&reducedMotion});media.push(value);return value;},
    ResizeObserver:class {constructor(callback){this.callback=callback;observers.push(this);}observe(){}},
  });
  const synthetic=values=>new vm.SyntheticModule(Object.keys(values),function(){for(const [key,value]of Object.entries(values))this.setExport(key,value);},{context});
  if(actualNavigation)realNavigation.setExitDoors({inner:0,outer:0});
  const navigation=synthetic(actualNavigation?realNavigation:{
    spawn:()=>({x:0,z:7.3,yaw:0,pitch:-.04,eye:1.62}),roomLayoutVersion:'fixture-layout',
    walkable:p=>Number.isFinite(p?.x)&&Number.isFinite(p?.z),
    nearby:()=>null,safeDestination:kind=>kind==='home'?'https://example.test/':'https://example.test/lab/',
    setExitDoors(){},
    exhibits:{worlds:{approach:{x:0,z:-4.6,yaw:0,pitch:.12}}},
    approaches:{character:{x:2.3,z:3.05,yaw:.4,pitch:-.42},catalog:{x:-3,z:-5.8,yaw:0,pitch:.08},home:{x:0,z:7.3,yaw:Math.PI,pitch:0}},
    advance(position,actions,dt){advances.push({actions:[...actions].sort(),dt});if(actions.has('forward'))position.z-=dt;
      if(settleEye){const desired=position.crouch?1:1.62;position.eye+=(desired-position.eye)*(1-Math.exp(-10*dt));}},
    planRoute:(position,point)=>[{x:point.x,z:point.z}],
    followRoute(position,points,dt){routes.push({points:copy(points),dt});if(dt>0)position.z-=dt;return 'walking';},
  });
  const screens=synthetic({createWalkableScreen(callbacks){
    screenCallbacks=callbacks;
    const inspect=()=>{byId('comparison-dialog').showModal();callbacks.suspend();};
    byId('screen-controls').addEventListener('click',inspect);
    byId('visit-screen').addEventListener('click',()=>callbacks.approach());
    byId('comparison-dialog').addEventListener('close',()=>callbacks.resume());
    return {source:{},inspect,hitTest:point=>point?.key?{key:point.key}:{key:'preview-a'},
      activate(){callbacks.depart();location.assign('https://example.test/lab/walkable-3d/scene.html?entry=a');},
    };
  }});
  const room=synthetic({createRoom(canvas,onLost,options){
    const renderer={id:renderers.length+1,needsAnimation:animate,draws:[],targets:[],poses:[],disposed:false,diagnostics:{characterState},
      draw(position,options){assert.equal(this.disposed,false,'Disposed renderer must never draw');if(drawError)throw Error('fixture draw error');this.draws.push({position:copy(position),...options});return renderable;},pose(position){this.poses.push(copy(position));},
      exit(doors){this.doors=copy(doors);return false;},
      comparison(){},target(value){this.targets.push(copy(value));},pick:()=>picked,
      dispose(){this.disposed=true;log.push({event:'dispose',id:this.id});},onLost,changed:options.changed,
    };
    renderers.push(renderer);log.push({event:'create',id:renderer.id});return renderer;
  }});
  await room.link(()=>{});await room.evaluate();
  const module=new vm.SourceTextModule(source,{context,
    initializeImportMeta(meta){meta.url='https://example.test/lab/lab-space/assets/production-space.js';},
    async importModuleDynamically(){if(importGate)await importGate;return room;},
  });
  await module.link(path=>path.endsWith('walkable-screen.js')?screens:path.endsWith('scene-navigation.js')?synthetic({createSceneNavigation:()=>({restore(){}})}):path.endsWith('interaction.mjs')?synthetic(interaction):path.endsWith('production-exit.mjs')?synthetic(exit):navigation);
  await module.evaluate();if(!deferImport){await settle();const pending=[...frames];frames.clear();for(const [,callback]of pending)callback(clock);}
  return {canvas,document,window,byId,pad,history,location,renderers,log,advances,routes,frames,cancelled,media,observers,screenCallbacks,session,captureRequests,timers,fetches,
    get qa(){return window.__productionLab;},get maxFrames(){return maxFrames;},
    get engine(){return renderers.at(-1);},get clock(){return clock;},set clock(value){clock=value;},
    set focused(value){focused=value;},set picked(value){picked=value;},
    async importReady(){importRelease?.();await settle();},
    async acquireLock(){document.pointerLockElement=canvas;await document.emit('pointerlockchange');},
    flush(time=clock+16){clock=time;const pending=[...frames];frames.clear();for(const [id,callback]of pending)callback(time);return pending.length;},
    fireTimer(delay){for(const [id,timer]of timers)if(timer.delay===delay){timers.delete(id);timer.callback();return true;}return false;},
    async startRoute(){await byId('help').emit('click');await byId('visit-character').emit('click');await settle();},
    async heldInput(){await canvas.emit('keydown',{code:'KeyW'});await pad[0].emit('pointerdown',{button:0,pointerId:42});},
  };
}

test('movement hotkeys are scoped to the focused Lab canvas and shared actions release independently',async()=>{
  const f=await controllerFixture();f.flush();
  await f.document.emit('keydown',{code:'KeyW'});await f.window.emit('keydown',{code:'KeyW'});
  assert.equal(f.frames.size,0);assert.equal(f.advances.at(-1).actions.length,0);
  const input=await f.canvas.emit('keydown',{code:'KeyW'});assert.equal(input.defaultPrevented,true);
  await f.canvas.emit('keydown',{code:'ArrowUp'});f.flush();assert.deepEqual(f.advances.at(-1).actions,['forward']);
  await f.window.emit('keyup',{code:'KeyW'});f.flush();assert.deepEqual(f.advances.at(-1).actions,['forward']);
  await f.window.emit('keyup',{code:'ArrowUp'});f.flush();assert.deepEqual(f.advances.at(-1).actions,[]);assert.equal(f.frames.size,0);
});

test('mouse capture uses Library percentage sensitivity and pitch clamp; uncaptured motion cannot look',async()=>{
  const f=await controllerFixture();const initial=f.qa.position;
  await f.document.emit('mousemove',{movementX:100,movementY:100});assert.deepEqual(f.qa.position,initial);
  await f.byId('explore').emit('click');f.byId('sensitivity').value='200';await f.byId('sensitivity').emit('input');
  await f.document.emit('mousemove',{movementX:50,movementY:2000});
  assert.ok(Math.abs(f.qa.position.yaw-(initial.yaw-.26))<1e-12);assert.equal(f.qa.position.pitch,-Math.PI/2+.02);assert.equal(f.byId('sensitivity-value').textContent,'200%');
  f.document.pointerLockElement=null;await f.document.emit('pointerlockchange');f.flush();assert.equal(f.frames.size,0);
});

test('capture loss cancels held controls before the next frame',async()=>{
  const f=await controllerFixture();await f.byId('explore').emit('click');await f.heldInput();f.flush();
  f.document.pointerLockElement=null;await f.document.emit('pointerlockchange');f.flush();
  assert.deepEqual(f.advances.at(-1).actions,[]);assert.equal(f.frames.size,0);
});

test('window blur cancels keys, touch holds, route and RAF; regaining focus starts with no held input',async()=>{
  const f=await controllerFixture({animate:true});await f.heldInput();f.flush();
  f.focused=false;await f.window.emit('blur');assert.equal(f.frames.size,0);assert.equal(f.qa.running,false);
  const draws=f.engine.draws.length;f.engine.changed();f.flush();assert.equal(f.engine.draws.length,draws);
  f.focused=true;await f.window.emit('focus');f.flush();assert.deepEqual(f.advances.at(-1).actions,[]);
  await f.startRoute();f.flush();const walked=f.routes.length;
  f.focused=false;await f.window.emit('blur');assert.equal(f.engine.targets.at(-1),null);assert.equal(f.frames.size,0);
  f.focused=true;await f.window.emit('focus');f.flush();assert.equal(f.routes.length,walked);
});

test('moving focus out of the canvas during a drag cancels look and movement',async()=>{
  const f=await controllerFixture();await f.canvas.emit('keydown',{code:'KeyW'});
  await f.canvas.emit('pointerdown',{button:0,pointerId:7,clientX:500,clientY:300,isPrimary:true,pointerType:'touch'});
  await f.canvas.emit('blur');const pose=f.qa.position;
  await f.canvas.emit('pointermove',{pointerId:7,clientX:540,clientY:300});
  assert.equal(f.qa.position.yaw,pose.yaw,'A captured drag must end when canvas focus leaves');
  f.flush();assert.deepEqual(f.advances.at(-1).actions,[]);assert.equal(f.frames.size,0);
});

test('hidden documents stop rendering and cancel held actions/routes, including renderer invalidations',async()=>{
  const f=await controllerFixture({animate:true});await f.heldInput();f.flush();
  f.document.hidden=true;await f.document.emit('visibilitychange');assert.equal(f.frames.size,0);
  const draws=f.engine.draws.length;f.engine.changed();await f.window.emit('resize');f.flush();assert.equal(f.engine.draws.length,draws);
  f.document.hidden=false;await f.document.emit('visibilitychange');f.flush();assert.deepEqual(f.advances.at(-1).actions,[]);
  await f.startRoute();f.flush();const walked=f.routes.length;
  f.document.hidden=true;await f.document.emit('visibilitychange');assert.equal(f.engine.targets.at(-1),null);
  f.document.hidden=false;await f.document.emit('visibilitychange');f.flush();assert.equal(f.routes.length,walked);
});

test('help, comparison dialog and navigation menu stop RAF and resume without held inputs',async()=>{
  const f=await controllerFixture({animate:true});await f.heldInput();f.flush();
  for(const kind of ['help','comparison','menu']){
    if(kind==='help')await f.byId('help').emit('click');
    if(kind==='comparison')await f.byId('screen-controls').emit('click');
    if(kind==='menu'){f.byId('room-menu').open=true;await f.byId('room-menu').emit('toggle');}
    assert.equal(f.frames.size,0,kind+' must stop scheduled work');const draws=f.engine.draws.length;
    f.engine.changed();await f.window.emit('resize');f.flush();assert.equal(f.engine.draws.length,draws,kind+' must not draw');
    if(kind==='help'){f.byId('help-dialog').close();await settle();}
    if(kind==='comparison'){f.byId('comparison-dialog').close();await settle();}
    if(kind==='menu'){f.byId('room-menu').open=false;await f.byId('room-menu').emit('toggle');}
    f.flush();assert.deepEqual(f.advances.at(-1).actions,[]);assert.equal(f.frames.size,1);
  }
});

test('resize, viewport, observer and content invalidations coalesce to one RAF/draw',async()=>{
  const f=await controllerFixture({animate:true});f.flush();const draws=f.engine.draws.length;
  for(let i=0;i<15;i++){await f.window.emit('resize');await f.window.visualViewport.emit('resize');f.observers[0].callback();f.engine.changed();}
  assert.equal(f.frames.size,1);assert.equal(f.maxFrames,1);f.flush();assert.equal(f.engine.draws.length,draws+1);assert.equal(f.frames.size,1);
  f.focused=false;await f.window.emit('blur');assert.ok(f.cancelled.length);assert.equal(f.frames.size,0);
});

test('idle drawing receives elapsed time across throttled frames instead of slowing animation',async()=>{
  const f=await controllerFixture({animate:true});const before=f.engine.draws.length;
  for(const time of [116,132,148])f.flush(time);assert.equal(f.engine.draws.length,before);
  f.flush(164);assert.equal(f.engine.draws.length,before+1);assert.ok(Math.abs(f.engine.draws.at(-1).dt-.064)<1e-12);
  assert.equal(f.engine.draws.at(-1).interactive,false);assert.equal(f.maxFrames,1);
});

test('crouch and standing continue drawing until the camera eye settles even with no decorative animation',async()=>{
  const f=await controllerFixture({settleEye:true});f.flush();assert.equal(f.frames.size,0);
  for(const target of [1,1.62]){
    const before=f.engine.draws.length;await f.canvas.emit('keydown',{code:'KeyC',repeat:false});
    for(let i=0;i<120&&f.frames.size;i++)f.flush();
    assert.ok(f.engine.draws.length>before+1,'Eye transition should finish over several frames');
    assert.ok(Math.abs(f.qa.position.eye-target)<.002);assert.equal(f.frames.size,0);
  }
});

test('physical character selection disposes the renderer before same-tab dedicated comparison navigation',async()=>{
  const f=await controllerFixture({animate:true});f.flush();f.picked={destination:'character'};
  await f.byId('explore').emit('click');
  await f.canvas.emit('pointerdown',{button:0,pointerId:1,clientX:500,clientY:300,isPrimary:true});
  await f.canvas.emit('pointerup',{button:0,pointerId:1,clientX:500,clientY:300,isPrimary:true});
  assert.deepEqual(f.log.slice(-2),[{event:'dispose',id:1},{event:'assign',url:'https://example.test/lab/character-bench/?prompt=02'}]);
  assert.equal(f.qa.engine,null);assert.equal(f.frames.size,0);assert.equal(f.qa.suspended,true);
  assert.equal(f.history.state.labLayoutVersion,'fixture-layout');assert.equal(f.history.state.labPosition.z,7.3);
});

test('scene departure disposes before same-tab navigation and stale invalidations cannot render',async()=>{
  const f=await controllerFixture({animate:true});f.flush();const engine=f.engine,draws=engine.draws.length;
  f.screenCallbacks.depart();f.location.assign('https://example.test/lab/walkable-3d/scene.html?entry=a');
  assert.deepEqual(f.log.slice(-2).map(x=>x.event),['dispose','assign']);assert.equal(f.frames.size,0);assert.equal(f.qa.engine,null);
  engine.changed();await f.window.emit('resize');f.flush();assert.equal(engine.draws.length,draws);
});

test('bfcache return recreates a disposed renderer and restores the preserved controller position',async()=>{
  const f=await controllerFixture({animate:true});await f.canvas.emit('keydown',{code:'KeyW'});f.flush();f.flush();
  const position=f.qa.position,first=f.engine;await f.window.emit('pagehide',{persisted:true});
  assert.equal(first.disposed,true);assert.equal(f.frames.size,0);assert.equal(f.qa.engine,null);
  assert.deepEqual(f.history.state.labPosition,{x:position.x,z:position.z,yaw:position.yaw,pitch:position.pitch,crouch:false});
  await f.window.emit('pageshow',{persisted:true});await settle();assert.equal(f.renderers.length,2);assert.equal(f.qa.engine,f.engine);assert.equal(f.engine.disposed,false);
  f.flush();assert.deepEqual(f.advances.at(-1).actions,[]);assert.equal(f.qa.position.z,position.z);assert.equal(first.draws.length,3);
});

test('reduced motion drops directly into gentle movement without an entry gate, including bfcache return',async()=>{
  const f=await controllerFixture({reducedMotion:true});assert.equal(f.renderers.length,1);assert.equal(f.byId('gentle').checked,true);
  await f.window.emit('pagehide',{persisted:true});await f.window.emit('pageshow',{persisted:true});await settle();
  assert.equal(f.renderers.length,2,'Return must recreate its renderer with reduced motion still enabled');
  assert.doesNotThrow(()=>f.flush());assert.equal(f.byId('room').hidden,false);assert.equal(f.byId('room-access').hidden,true);
});

test('enabling reduced motion releases capture and movement while retaining the loaded room',async()=>{
  const f=await controllerFixture({animate:true});await f.byId('explore').emit('click');await f.heldInput();f.flush();
  const first=f.engine,preference=f.media.find(value=>value.media.includes('reduced-motion'));
  preference.matches=true;await preference.emit('change',{matches:true});
  assert.equal(first.disposed,false);assert.equal(f.document.pointerLockElement,null);f.flush();
  assert.equal(f.byId('gentle').checked,true);assert.equal(f.byId('room').hidden,false);assert.equal(f.byId('room-access').hidden,true);
  assert.equal(f.renderers.length,1);assert.deepEqual(f.advances.at(-1).actions,[]);
});

test('renderer interruption falls back to usable direct access with no subsequent draws',async()=>{
  const f=await controllerFixture({animate:true});f.flush();const first=f.engine,draws=first.draws.length;
  first.onLost();assert.equal(first.disposed,true);assert.equal(f.qa.engine,null);assert.equal(f.frames.size,0);
  assert.equal(f.byId('room').hidden,true);assert.equal(f.byId('room-access').hidden,false);assert.equal(f.byId('enter-room').hidden,false);
  first.changed();await f.window.emit('resize');f.flush();assert.equal(first.draws.length,draws);
  await f.byId('enter-room').emit('click');await settle();assert.equal(f.renderers.length,2);
});

test('a late initialization result cannot allocate or draw after pagehide',async()=>{
  const f=await controllerFixture({deferImport:true});await f.window.emit('pagehide',{persisted:true});await f.importReady();
  assert.equal(f.renderers.length,0);assert.equal(f.frames.size,0);assert.equal(f.qa.engine,null);
  await f.window.emit('pageshow',{persisted:true});await settle();assert.equal(f.renderers.length,1);f.flush();assert.equal(f.engine.draws.length,1);
});

test('returning from bfcache while the original lazy import is pending still opens the room',async()=>{
  const f=await controllerFixture({deferImport:true});
  await f.window.emit('pagehide',{persisted:true});await f.window.emit('pageshow',{persisted:true});await f.importReady();
  assert.equal(f.renderers.length,1,'Return must schedule fresh initialization instead of losing the pending import');
  assert.equal(f.byId('room').hidden,false);f.flush();assert.equal(f.engine.draws.length,1);
});

test('character target rejects external/noncomparison URLs without navigating away',async()=>{
  for(const characterHref of ['https://evil.test/character-bench/','../walkable-3d/','#']){
    const f=await controllerFixture({characterHref});f.picked={destination:'character'};
    await f.canvas.emit('keydown',{code:'KeyE',repeat:false});
    assert.equal(f.log.some(x=>x.event==='assign'),false);assert.equal(f.byId('station-dialog').open,true);assert.equal(f.frames.size,0);
  }
});

test('restored pose requires the current layout and valid finite angles',async()=>{
  const pose={x:1,z:2,yaw:.3,pitch:.1};
  const good=await controllerFixture({state:{labLayoutVersion:'fixture-layout',labPosition:pose}});assert.equal(good.qa.position.x,1);
  for(const state of [{labLayoutVersion:'old-layout',labPosition:pose},{labLayoutVersion:'fixture-layout',labPosition:{...pose,yaw:null}}]){
    const f=await controllerFixture({state});assert.equal(f.qa.position.x,0);assert.equal(f.qa.position.z,7.3);
  }
});

test('character return restores one scoped pose only from the same-origin comparison route',async()=>{
  const key='lab.production.character-return.v1',pose={x:1,z:2,yaw:.3,pitch:.1,crouch:true};
  const session=new Map([[key,JSON.stringify({layout:'fixture-layout',position:pose})]]);
  const good=await controllerFixture({session,referrer:'https://example.test/lab/character-bench/?prompt=02'});
  assert.equal(good.qa.position.x,1);assert.equal(good.qa.position.crouch,true);assert.equal(session.has(key),false);
  for(const referrer of ['https://evil.test/character-bench/','https://example.test/lab/walkable-3d/']){
    const badSession=new Map([[key,JSON.stringify({layout:'fixture-layout',position:pose})]]);
    const bad=await controllerFixture({session:badSession,referrer});assert.equal(bad.qa.position.x,0);assert.equal(badSession.has(key),false);
  }
  for(const id of ['character-link','access-character']){
    const f=await controllerFixture();await f.byId(id).emit('click');const back=JSON.parse(f.session.get(key));
    assert.equal(back.layout,'fixture-layout');assert.equal(back.position.z,f.qa.position.z);
  }
});

test('host markup exposes named exhibit links, help, motion choices, and no nonprinting glyphs',()=>{
  const html=readFileSync(new URL('../lab-space/index.html',import.meta.url),'utf8');
  assert.match(html,/<html lang="en">/);assert.match(html,/href="\.\.\/character-bench\/\?prompt=02"/);
  assert.match(html,/aria-label="Direct exhibit access"/);assert.match(html,/id="room"[^>]*tabindex="0"[^>]*aria-describedby="navigation-help"/);
  assert.match(html,/id="help-dialog" aria-labelledby="help-title"/);assert.match(html,/id="gentle"/);assert.match(html,/id="sensitivity"[^>]*type="range"/);
  assert.doesNotMatch(html,/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/,'Host controls must not use nonprinting C0 characters as arrow glyphs');
});

test('loading waits for a successful ready draw and then focuses the room without an intro or capture',async()=>{
  const f=await controllerFixture({deferImport:true,characterState:'loading'});
  assert.equal(f.byId('loading-stage').textContent,'Loading Lab');assert.equal(f.captureRequests.length,0);
  await f.canvas.emit('keydown',{code:'KeyW'});await f.byId('explore').emit('click');assert.equal(f.captureRequests.length,0);
  await f.importReady();assert.equal(f.byId('loading-stage').textContent,'Preparing room');
  assert.equal(f.byId('lab-loading').classList.contains('is-ready'),false);
  f.flush();assert.equal(f.byId('loading-stage').textContent,'Placing character');
  await f.canvas.emit('keydown',{code:'KeyW'});f.flush();assert.deepEqual(f.advances.at(-1).actions,[]);
  f.engine.diagnostics.characterState='ready';f.engine.changed();f.flush();
  assert.equal(f.byId('lab-loading').classList.contains('is-ready'),true);assert.equal(f.document.activeElement,f.canvas);
  assert.equal(f.captureRequests.length,0);assert.equal(f.byId('help-dialog').open,false);assert.equal(f.byId('enter-room').hidden,true);
  await f.canvas.emit('keydown',{code:'KeyW'});f.flush();assert.deepEqual(f.advances.at(-1).actions,['forward']);
  const html=readFileSync(new URL('../lab-space/index.html',import.meta.url),'utf8');
  assert.match(html,/id="lab-loading" role="status"/);assert.doesNotMatch(html,/Click to enter|Enter 3D|Welcome to|Opening the Lab/);
});

test('character import failure exposes error/retry and stale readiness cannot dismiss a new loading screen',async()=>{
  const f=await controllerFixture({characterState:'failed'}),old=f.engine;
  assert.equal(f.byId('lab-loading').hidden,true);assert.equal(f.byId('room-access').hidden,false);assert.equal(f.byId('enter-room').hidden,false);
  await f.byId('enter-room').emit('click');await settle();assert.equal(f.renderers.length,2);
  f.engine.diagnostics.characterState='loading';f.flush();
  old.diagnostics.characterState='ready';old.changed();f.flush();assert.equal(f.byId('lab-loading').classList.contains('is-ready'),false);
  f.engine.diagnostics.characterState='ready';f.engine.changed();f.flush();assert.equal(f.byId('lab-loading').classList.contains('is-ready'),true);
});

test('first mouse gesture over an exhibit or floor captures without activating; lock gain preserves walking',async()=>{
  for(const target of [{destination:'character'},{comparison:{key:'preview-a'}},{point:{x:3,z:3}}]){
    const f=await controllerFixture();f.picked=target;await f.canvas.emit('keydown',{code:'KeyW'});
    await f.canvas.emit('pointerdown',{button:0,pointerId:1,clientX:500,clientY:300,pointerType:'mouse'});
    await f.canvas.emit('pointerup',{button:0,pointerId:1,clientX:500,clientY:300,pointerType:'mouse'});
    assert.equal(f.captureRequests.length,1);assert.equal(f.captureRequests[0].unadjustedMovement,true);
    assert.equal(f.log.some(r=>r.event==='assign'),false);assert.equal(f.routes.length,0);f.flush();
    assert.deepEqual(f.advances.at(-1).actions,['forward']);
    if(target.destination){await f.canvas.emit('pointerdown',{button:0,pointerId:2,clientX:500,clientY:300,pointerType:'mouse'});assert.equal(f.log.at(-1).event,'assign');}
  }
});

test('raw look retries plain capture only for NotSupportedError; denied/missing APIs retain client-coordinate drag',async()=>{
  const unsupported=await controllerFixture({requestLock:(options,n)=>n===1?Promise.reject(Object.assign(new Error(),{name:'NotSupportedError'})):Promise.resolve()});
  await unsupported.byId('explore').emit('click');assert.equal(unsupported.captureRequests.length,2);assert.equal(unsupported.captureRequests[1],undefined);
  await unsupported.acquireLock();await unsupported.document.emit('mousemove',{movementX:100,movementY:50});assert.ok(Math.abs(unsupported.qa.position.yaw+.26)<1e-12);
  for(const requestLock of [null,()=>Promise.reject(Object.assign(new Error(),{name:'NotAllowedError'}))]){
    const f=await controllerFixture({requestLock});await f.byId('explore').emit('click');assert.ok(f.captureRequests.length<=1);
    await f.canvas.emit('pointerdown',{button:0,pointerId:1,clientX:500,clientY:300,pointerType:'mouse'});
    await f.canvas.emit('pointermove',{pointerId:1,clientX:510,clientY:305,pointerType:'mouse',buttons:1});
    assert.ok(Math.abs(f.qa.position.yaw+.026)<1e-12);assert.ok(Math.abs(f.qa.position.pitch-(-.04-.013))<1e-12);
    const pose=f.qa.position;await f.canvas.emit('pointermove',{pointerId:1,clientX:900,clientY:500,pointerType:'mouse',buttons:0});assert.deepEqual(f.qa.position,pose);
  }
});

test('pending capture deduplicates gestures and every pause invalidates late capture or unsupported retries',async()=>{
  for(const pause of ['escape','help','menu','blur','hidden','pagehide','reduced']){
    let resolve,reject;const f=await controllerFixture({requestLock:()=>new Promise((yes,no)=>{resolve=yes;reject=no;})});
    const gesture={button:0,pointerId:1,clientX:500,clientY:300,pointerType:'mouse'};
    await f.canvas.emit('pointerdown',gesture);await f.canvas.emit('pointerup',gesture);await f.canvas.emit('pointerdown',{...gesture,pointerId:2});assert.equal(f.captureRequests.length,1);
    if(pause==='escape')await f.canvas.emit('keydown',{code:'Escape'});
    if(pause==='help')await f.byId('help').emit('click');
    if(pause==='menu'){f.byId('room-menu').open=true;await f.byId('room-menu').emit('toggle');}
    if(pause==='blur'){f.focused=false;await f.window.emit('blur');}
    if(pause==='hidden'){f.document.hidden=true;await f.document.emit('visibilitychange');}
    if(pause==='pagehide')await f.window.emit('pagehide',{persisted:true});
    if(pause==='reduced')await f.media.find(r=>r.media.includes('reduced-motion')).emit('change',{matches:true});
    reject(Object.assign(new Error(),{name:'NotSupportedError'}));await settle();await f.acquireLock();
    assert.equal(f.document.pointerLockElement,null,pause+' must release late capture');assert.equal(f.captureRequests.length,1,pause+' must prevent a stale ordinary retry');
    assert.equal(f.log.some(r=>r.event==='assign'),false);assert.equal(f.routes.length,0);
  }
});

test('Escape controls pause; native cancel focuses without capture; explicit resume and unlocked Enter capture freshly',async()=>{
  const f=await controllerFixture({animate:true});await f.byId('explore').emit('click');await f.heldInput();
  await f.canvas.emit('keydown',{code:'Escape'});assert.equal(f.byId('help-dialog').open,true);assert.equal(f.frames.size,0);assert.equal(f.document.activeElement,f.byId('resume-look'));
  const count=f.captureRequests.length;await f.byId('sensitivity').emit('input');assert.equal(f.captureRequests.length,count);
  await f.byId('help-dialog').emit('cancel');await settle();assert.equal(f.document.activeElement,f.canvas);assert.equal(f.captureRequests.length,count);
  await f.canvas.emit('keydown',{code:'Enter'});assert.equal(f.captureRequests.length,count+1);assert.equal(f.log.some(r=>r.event==='assign'),false);
  await f.canvas.emit('keydown',{code:'Escape'});await f.byId('resume-look').emit('click');assert.equal(f.byId('help-dialog').open,false);assert.equal(f.captureRequests.length,count+2);
});

test('look uses identical mouse counts across RAF cadence, ignores invalid deltas and immediately updates picking pose',async()=>{
  const results=[];
  for(const cadence of [1,4]){
    const f=await controllerFixture();await f.byId('explore').emit('click');
    for(let i=0;i<40;i++){await f.document.emit('mousemove',{movementX:1,movementY:.2});if(i%cadence===0)f.flush();}
    const before=f.qa.position;await f.document.emit('mousemove',{movementX:NaN,movementY:0});assert.deepEqual(f.qa.position,before);
    assert.deepEqual(f.engine.poses.at(-1),copy(f.qa.position));results.push([f.qa.position.yaw,f.qa.position.pitch]);
  }
  assert.deepEqual(results[0],results[1]);
});

test('legacy event-only pointer capture falls back on error and touch selection remains a physical target action',async()=>{
  const legacy=await controllerFixture({requestLock:()=>undefined});await legacy.byId('explore').emit('click');await legacy.document.emit('pointerlockerror');
  assert.match(legacy.byId('walk-message').textContent,/Hold the left mouse/);
  const touch=await controllerFixture();touch.picked={destination:'character'};
  const gesture={button:0,pointerId:9,clientX:500,clientY:300,pointerType:'touch'};
  await touch.canvas.emit('pointerdown',gesture);await touch.canvas.emit('pointerup',gesture);
  assert.equal(touch.captureRequests.length,0);assert.equal(touch.log.at(-1).event,'assign');
});

test('loading cannot finish on a frame with no renderable area',async()=>{
  const f=await controllerFixture({renderable:false});
  assert.equal(f.byId('lab-loading').classList.contains('is-ready'),false);
  await f.canvas.emit('keydown',{code:'KeyW'});f.flush();
  assert.equal(f.advances.at(-1).actions.length,0);assert.equal(f.captureRequests.length,0);
});

test('walking through both physical door sets preloads bounded public HTML then disposes before one Home departure',async()=>{
  const f=await controllerFixture({actualNavigation:true});
  f.qa.teleport({...realNavigation.spawn(),yaw:Math.PI});f.flush();
  assert.deepEqual(f.engine.doors,{inner:0,outer:0});assert.equal(f.fetches.length,0);
  await f.canvas.emit('keydown',{code:'KeyW'});
  until(f,()=>f.qa.exit.phase==='vestibule');assert.equal(f.log.some(e=>e.event==='assign'),false);
  until(f,()=>f.fetches.length===1);await settle();
  assert.equal(f.fetches[0].url,exit.HOME_URL);assert.equal(f.fetches[0].options.credentials,'omit');
  assert.equal(f.fetches[0].options.mode,'same-origin');assert.equal(f.fetches[0].options.redirect,'error');
  assert.equal(f.fetches[0].options.referrerPolicy,'no-referrer');assert.equal(f.qa.exit.preload,'ready');
  until(f,()=>f.qa.exit.navigating);
  assert.ok(f.qa.position.z>=11.88&&f.qa.position.z<=12.03);assert.equal(f.byId('loading-name').textContent,'Home');
  assert.equal(f.frames.size,0);assert.equal(f.log.some(e=>e.event==='assign'),false);
  assert.equal(f.history.state.labPosition.z,7.3);assert.equal(f.fireTimer(180),true);
  assert.deepEqual(f.log.slice(-2),[{event:'dispose',id:1},{event:'assign',url:exit.HOME_URL}]);
  f.flush();assert.equal(f.fireTimer(180),false);assert.equal(f.fetches.length,1);
  await f.window.emit('pagehide',{persisted:true});assert.equal(f.history.state.labPosition.z,7.3);
  await f.window.emit('pageshow',{persisted:true});await settle();f.flush();
  assert.equal(f.qa.position.z,7.3);assert.equal(f.qa.exit.navigating,false);assert.equal(f.qa.exit.phase,'lab');
  assert.equal(f.captureRequests.length,0);assert.equal(f.log.filter(e=>e.event==='assign').length,1);
});

test('focus pause aborts an in-flight Home preload and clears velocity while a verified vestibule trip can resume',async()=>{
  const f=await controllerFixture({actualNavigation:true,fetchResponse:(url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(Error('aborted'))))});
  f.qa.teleport({...realNavigation.spawn(),yaw:Math.PI});f.flush();await f.canvas.emit('keydown',{code:'KeyW'});
  until(f,()=>f.fetches.length===1);const before=f.qa.position;
  await f.window.emit('blur');await settle();
  assert.equal(f.fetches[0].options.signal.aborted,true);assert.equal(f.qa.exit.preload,'unavailable');
  assert.equal(f.qa.position.vz,0);assert.equal(f.frames.size,0);assert.equal(f.timers.size,0);
  await f.window.emit('focus');f.flush();assert.equal(f.qa.position.z,before.z);
  await f.canvas.emit('keydown',{code:'KeyW'});until(f,()=>f.qa.exit.navigating);f.fireTimer(180);
  assert.equal(f.fetches.length,1);assert.equal(f.log.at(-1).url,exit.HOME_URL);
});

test('Home preload rejects oversized bodies without blocking walking and pagehide cancels departure fade',async()=>{
  let reads=0,cancels=0;
  const f=await controllerFixture({actualNavigation:true,fetchResponse:()=>Promise.resolve({ok:true,headers:{get:()=>null},body:{getReader:()=>({read:async()=>{reads++;return {done:false,value:new Uint8Array(262145)};},cancel:async()=>{cancels++;}})}})});
  f.qa.teleport({...realNavigation.spawn(),yaw:Math.PI});f.flush();await f.canvas.emit('keydown',{code:'KeyW'});
  until(f,()=>f.fetches.length===1);await settle();assert.equal(reads,1);assert.equal(cancels,1);assert.equal(f.qa.exit.preload,'unavailable');
  until(f,()=>f.qa.exit.navigating);await f.window.emit('pagehide',{persisted:true});
  assert.equal(f.fireTimer(180),false);assert.equal(f.log.some(e=>e.event==='assign'),false);assert.equal(f.engine.disposed,true);
});

test('reduced-motion walking exit uses a zero-delay departure and never acquires mouse capture',async()=>{
  const f=await controllerFixture({actualNavigation:true,reducedMotion:true});
  f.qa.teleport({...realNavigation.spawn(),yaw:Math.PI});f.flush();await f.canvas.emit('keydown',{code:'KeyW'});
  until(f,()=>f.qa.exit.navigating,900);assert.equal(f.fireTimer(0),true);
  assert.equal(f.log.at(-1).url,exit.HOME_URL);assert.equal(f.captureRequests.length,0);
});
