// CPU-only tests of the actual classic inline destination bootstrap. No browser,
// renderer, server, entrant, image decode, or network request is executed.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

const html=readFileSync(new URL('../lab-space/index.html',import.meta.url),'utf8');
const scripts=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
const bootstrap=scripts.filter(match=>/\bid="room-handoff-bootstrap"/.test(match[1]));
assert.equal(bootstrap.length,1,'Exactly one canonical bootstrap must execute.');
const inline=bootstrap[0][2];
// Windows checkout line endings and the closing tag's indentation are HTML
// wrapper formatting; every canonical source byte remains pinned below.
const canonical=inline.replaceAll('\r\n','\n').replace(/^\n/,'').replace(/\n[ \t]*$/,'\n');
const KEY='pazneria.room-handoff.v1',NOW=1000000;
const HREF='https://pazneria.github.io/lab/lab-space/?labqa=1#entry';
const token=(overrides={})=>({version:1,room:'lab',path:'/lab/lab-space/',image:'/assets/images/rooms/lab-entry.jpg',camera:'default-entry-v2',createdAt:NOW,...overrides});

class Events {
  constructor(){this.listeners=new Map();}
  addEventListener(type,callback,options={}){
    const capture=options===true||!!options.capture;
    const entries=this.listeners.get(type)||[];
    if(!entries.some(item=>item.callback===callback&&item.capture===capture))entries.push({callback,capture,once:!!options.once});
    this.listeners.set(type,entries);
  }
  removeEventListener(type,callback,options={}){
    const capture=options===true||!!options.capture;
    this.listeners.set(type,(this.listeners.get(type)||[]).filter(item=>item.callback!==callback||item.capture!==capture));
  }
  emit(type,input={}){
    const event={type,target:this,defaultPrevented:false,propagationStopped:false,
      preventDefault(){this.defaultPrevented=true;},stopPropagation(){this.propagationStopped=true;},...input};
    for(const item of [...this.listeners.get(type)||[]]){
      if(!(this.listeners.get(type)||[]).includes(item))continue;
      if(item.once)this.removeEventListener(type,item.callback,{capture:item.capture});
      item.callback.call(this,event);
    }
    return event;
  }
  count(type){return (this.listeners.get(type)||[]).length;}
}

function fixture({record=token(),raw,body=true,reduced=false,forced=false,storageDenied,href=HREF}={}){
  const storage=new Map(),storageLog=[],timers=new Map(),observers=[],assignments=[];
  let now=NOW,timerId=0,document;
  if(raw!==undefined)storage.set(KEY,raw);
  else if(record!==null)storage.set(KEY,JSON.stringify(record));
  class Element extends Events {
    constructor(tag){super();this.tagName=tag.toUpperCase();this.children=[];this.parentElement=null;this.dataset={};this.attributes=new Map();this.className='';this.id='';this.textContent='';this.focusOptions=null;}
    appendChild(child){child.remove();this.children.push(child);child.parentElement=this;return child;}
    append(...children){children.forEach(child=>this.appendChild(child));}
    remove(){if(!this.parentElement)return;const parent=this.parentElement;parent.children=parent.children.filter(child=>child!==this);this.parentElement=null;
      if(this===document.activeElement||this.contains(document.activeElement))document.activeElement=document.body;}
    contains(element){return this===element||this.children.some(child=>child.contains(element));}
    setAttribute(name,value){this.attributes.set(name,String(value));}
    getAttribute(name){return this.attributes.get(name)??null;}
    focus(options){document.activeElement=this;this.focusOptions=options;}
    querySelectorAll(selector){const found=[];for(const child of this.children){if(selector==='a'&&child.tagName==='A')found.push(child);found.push(...child.querySelectorAll(selector));}return found;}
  }
  document=new Events();document.documentElement=new Element('html');document.head=new Element('head');document.body=body?new Element('body'):null;
  document.documentElement.appendChild(document.head);if(document.body)document.documentElement.appendChild(document.body);
  document.activeElement=document.body;document.createElement=tag=>new Element(tag);
  const window=new Events(),media=new Map();
  const location=new URL(href);location.assign=url=>assignments.push(url);window.location=location;
  const session={
    getItem(key){storageLog.push(['get',key]);if(storageDenied==='get')throw Error('Storage denied');return storage.get(key)??null;},
    removeItem(key){storageLog.push(['remove',key]);if(storageDenied==='remove')throw Error('Storage denied');storage.delete(key);},
  };
  Object.defineProperty(window,'sessionStorage',{get(){if(storageDenied==='property')throw Error('Storage denied');return session;}});
  window.matchMedia=query=>{if(!media.has(query))media.set(query,Object.assign(new Events(),{matches:query.includes('forced-colors')?forced:reduced}));return media.get(query);};
  window.setTimeout=(callback,delay)=>{const id=++timerId;timers.set(id,{callback,at:now+delay,delay});return id;};
  window.clearTimeout=id=>timers.delete(id);
  const context=vm.createContext({window,document,URL,Date:{now:()=>now},MutationObserver:class {
    constructor(callback){this.callback=callback;this.connected=false;observers.push(this);}
    observe(target,options){this.connected=true;this.target=target;this.options=options;}
    disconnect(){this.connected=false;}
  }});
  const run=()=>vm.runInContext(inline,context,{filename:'actual-inline-room-handoff-bootstrap.js'});
  run();
  const advance=milliseconds=>{const end=now+milliseconds;for(;;){const due=[...timers].filter(([,value])=>value.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!due)break;now=due[1].at;timers.delete(due[0]);due[1].callback();}now=end;};
  const arriveBody=({mutation=true,domContentLoaded=false}={})=>{
    if(!document.body){document.body=new Element('body');document.documentElement.appendChild(document.body);document.activeElement=document.body;}
    if(mutation)observers.filter(observer=>observer.connected).forEach(observer=>observer.callback([]));
    if(domContentLoaded)document.emit('DOMContentLoaded');
    return document.body;
  };
  return {window,document,storage,storageLog,timers,observers,assignments,run,advance,arriveBody,
    get bridge(){return window.pazneriaRoomHandoff;},get cover(){return document.documentElement.dataset.roomHandoff;},
    get styles(){return document.head.children.filter(child=>child.tagName==='STYLE');},
    get controls(){return document.body?.children.find(child=>child.className==='pazneria-handoff-controls')??null;},
    media(query,value){const result=window.matchMedia(query);result.matches=value;result.emit('change',{matches:value});return result;},
  };
}
const reducedQuery='(prefers-reduced-motion: reduce)',forcedQuery='(forced-colors: active)';
function assertInactive(f){assert.equal(f.bridge,undefined);assert.equal(f.cover,undefined);assert.equal(f.styles.length,0);assert.equal(f.controls,null);assert.equal(f.timers.size,0);assert.equal(f.document.count('keydown'),0);}
function assertClean(f){
  assert.equal(f.bridge.active,false);assert.equal(f.cover,undefined);assert.equal(f.styles.length,0);assert.equal(f.controls,null);assert.equal(f.timers.size,0);
  assert.equal(f.document.count('keydown'),0);assert.equal(f.document.count('DOMContentLoaded'),0);
  assert.equal(f.window.matchMedia(reducedQuery).count('change'),0);assert.equal(f.window.matchMedia(forcedQuery).count('change'),0);
  assert.ok(f.observers.every(observer=>!observer.connected));
}

test('exact prepared canonical source and early classic-script order are pinned to the coordinated homepage blob',()=>{
  const bytes=Buffer.from(canonical);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),'711b2e813bbf790c53bed4b66aaa163380b2a9f7c59ebc2caf806723d381f4b6');
  assert.equal(createHash('sha1').update(Buffer.from('blob '+bytes.length+'\0')).update(bytes).digest('hex'),'3a5aff4177e65fc68ddf74be4d0d09c71778f68a');
  assert.match(html,/Pazneria\/pazneria\.github\.io baseline @ 30eb1ebc5d42a47759c20ca1fec4ce7b56aa07de plus coordinated Lab default-entry-v2 patch; Git blob 3a5aff4177e65fc68ddf74be4d0d09c71778f68a/);
  assert.equal(scripts[0],bootstrap[0]);assert.match(bootstrap[0][1],/^\s+id="room-handoff-bootstrap"\s*$/);
  assert.ok(bootstrap[0].index>html.indexOf('<head>')&&bootstrap[0].index<html.indexOf('</head>'));
  assert.ok(bootstrap[0].index<html.indexOf('<link rel="stylesheet"'));
  assert.ok(bootstrap[0].index<html.indexOf('<script type="module" src="assets/production-space.js"'));
});

test('valid one-shot Lab token installs an opaque image cover before body or destination modules',()=>{
  const f=fixture({body:false});assert.equal(f.storage.has(KEY),false);assert.deepEqual(f.storageLog,[['get',KEY],['remove',KEY]]);
  assert.equal(f.cover,'loading');assert.equal(f.bridge.active,true);assert.equal(f.bridge.room,'lab');assert.equal(f.bridge.camera,'default-entry-v2');assert.ok(Object.isFrozen(f.bridge));
  assert.equal(f.styles.length,1);assert.match(f.styles[0].textContent,/position:fixed;inset:0;z-index:2147480000;background:#101916 url\("https:\/\/pazneria\.github\.io\/assets\/images\/rooms\/lab-entry\.jpg"\) center\/cover no-repeat;opacity:1/);
  assert.equal(f.controls,null);assert.equal(f.observers.length,1);assert.equal(f.observers[0].connected,true);
  assert.deepEqual({...f.observers[0].options},{childList:true});assert.equal([...f.timers.values()][0].delay,8000);
  const bridge=f.bridge;f.run();assert.equal(f.bridge,bridge);assert.equal(f.styles.length,1);assert.equal(f.timers.size,1);
  bridge.fail();f.run();assertClean(f);assert.equal(f.bridge,bridge,'A consumed token cannot create another cover.');
});

test('missing, malformed, and denied storage leave ordinary direct entry untouched',()=>{
  for(const options of [{record:null},{raw:'{'},{raw:'null'},{raw:'false'},{storageDenied:'property'},{storageDenied:'get'},{storageDenied:'remove'}])assertInactive(fixture(options));
  const missing=fixture({record:null});assert.deepEqual(missing.storageLog,[['get',KEY],['remove',KEY]]);
  // Canonical parsing happens before removal; malformed JSON cannot install a
  // handoff, but its storage value is retained rather than claimed consumed.
  const malformed=fixture({raw:'{'});assert.equal(malformed.storage.get(KEY),'{');assert.deepEqual(malformed.storageLog,[['get',KEY]]);
});

test('wrong token version, camera, room, path, and timestamps are rejected and consumed',()=>{
  for(const overrides of [
    {version:2},{version:'1'},{camera:'default-entry-v1'},{camera:'other'},{room:'unknown'},{room:'__proto__'},
    {path:'/lab/'},{path:'/library/'},{room:'library',path:'/library/'},{createdAt:NOW-15001},
    {createdAt:NOW+1},{createdAt:null},{createdAt:'1000000'},{createdAt:Infinity},
  ]){const f=fixture({record:token(overrides)});assertInactive(f);assert.equal(f.storage.has(KEY),false);}
  assertInactive(fixture({href:'https://pazneria.github.io/lab/'}));
  for(const createdAt of [NOW,NOW-15000]){const f=fixture({record:token({createdAt})});assert.equal(f.bridge.active,true);f.bridge.fail();assertClean(f);}
});

test('only the room-specific same-origin image without credentials, query, or fragment is accepted',()=>{
  for(const image of [
    'https://evil.example/assets/images/rooms/lab-entry.jpg','//evil.example/assets/images/rooms/lab-entry.jpg',
    'https://person@pazneria.github.io/assets/images/rooms/lab-entry.jpg','https://person:secret@pazneria.github.io/assets/images/rooms/lab-entry.jpg',
    '/assets/images/rooms/library-entry.jpg','/assets/images/rooms/lab-entry.jpg?token=secret','/assets/images/rooms/lab-entry.jpg#preview',
    'data:image/png;base64,AAAA','javascript:alert(1)','https://[invalid',undefined,
  ]){const f=fixture({record:token({image})});assertInactive(f);assert.equal(f.storage.has(KEY),false);}
  const absolute=fixture({record:token({image:'https://pazneria.github.io/assets/images/rooms/lab-entry.jpg'})});assert.equal(absolute.cover,'loading');absolute.bridge.fail();assertClean(absolute);
});

test('body mutation installs recovery controls before DOMContentLoaded and never duplicates them',()=>{
  const f=fixture({body:false});f.arriveBody();const controls=f.controls;
  assert.equal(controls.getAttribute('role'),'dialog');assert.equal(controls.getAttribute('aria-modal'),'true');
  assert.equal(controls.getAttribute('aria-labelledby'),'pazneria-handoff-status');assert.equal(controls.children[0].textContent,'Opening lab.');
  assert.equal(controls.children[0].getAttribute('role'),'status');assert.equal(controls.children[0].getAttribute('aria-live'),'polite');
  assert.equal(controls.children[1].href,'/');assert.equal(controls.children[1].textContent,'Home / Cancel');assert.equal(f.document.activeElement,controls.children[1]);
  assert.equal(controls.children[1].focusOptions.preventScroll,true);assert.equal(f.observers[0].connected,false);
  f.document.emit('DOMContentLoaded');assert.equal(f.controls,controls);assert.equal(f.document.body.children.filter(child=>child===controls).length,1);
  f.bridge.fail();assertClean(f);
});

test('DOMContentLoaded remains a working installation fallback if mutation delivery is delayed',()=>{
  const f=fixture({body:false});f.arriveBody({mutation:false,domContentLoaded:true});assert.ok(f.controls);assert.equal(f.observers[0].connected,false);f.bridge.fail();assertClean(f);
});

test('Home / Cancel and Escape provide recovery without invoking destination code',()=>{
  const f=fixture(),home=f.controls.querySelectorAll('a')[0];assert.equal(home.href,'/');
  const tab=f.document.emit('keydown',{key:'Tab'});assert.equal(tab.defaultPrevented,true);assert.equal(f.document.activeElement,home);
  const other=f.document.emit('keydown',{key:'e'});assert.equal(other.defaultPrevented,false);assert.deepEqual(f.assignments,[]);
  const escape=f.document.emit('keydown',{key:'Escape'});assert.equal(escape.defaultPrevented,true);assert.equal(escape.propagationStopped,true);assert.deepEqual(f.assignments,['/']);
  f.window.emit('pagehide');assertClean(f);f.document.emit('keydown',{key:'Escape'});assert.deepEqual(f.assignments,['/']);
});

test('the eight-second recovery deadline exposes Retry and traps forward/backward Tab inside its links',()=>{
  const f=fixture(),initial=f.controls;f.advance(7999);assert.equal(f.controls,initial);assert.equal(f.controls.querySelectorAll('a').length,1);
  f.advance(1);assert.notEqual(f.controls,initial);assert.equal(initial.parentElement,null);assert.equal(f.cover,'loading');assert.equal(f.bridge.active,true);
  assert.equal(f.controls.children[0].textContent,'The room is still opening. You can retry or go home.');assert.equal(f.controls.children[0].className,'');
  const [home,retry]=f.controls.querySelectorAll('a');assert.equal(home.href,'/');assert.equal(retry.href,HREF);assert.equal(retry.textContent,'Retry');
  f.document.activeElement=f.document.body;f.document.emit('keydown',{key:'Tab'});assert.equal(f.document.activeElement,home);
  f.document.emit('keydown',{key:'Tab'});assert.equal(f.document.activeElement,retry);f.document.emit('keydown',{key:'Tab'});assert.equal(f.document.activeElement,home);
  f.document.emit('keydown',{key:'Tab',shiftKey:true});assert.equal(f.document.activeElement,retry);f.bridge.fail();assertClean(f);
});

test('recovery clock begins in head even if body and module execution take longer than eight seconds',()=>{
  const f=fixture({body:false});f.advance(9000);assert.equal(f.controls,null);assert.equal(f.cover,'loading');
  f.arriveBody();assert.equal(f.controls.children[0].textContent,'The room is still opening. You can retry or go home.');assert.equal(f.controls.querySelectorAll('a').length,2);
  f.bridge.fail();assertClean(f);
});

test('ready removes controls and timeout immediately, then releases the cover after exactly 160ms',()=>{
  const f=fixture(),controls=f.controls;f.bridge.ready();assert.equal(f.cover,'ready');assert.equal(f.controls,null);assert.equal(controls.parentElement,null);
  assert.equal(f.bridge.active,true);assert.equal(f.timers.size,1);assert.equal([...f.timers.values()][0].delay,160);
  f.advance(159);assert.equal(f.styles.length,1);assert.equal(f.cover,'ready');f.advance(1);assertClean(f);
  f.bridge.ready();f.bridge.fail();f.advance(10000);assertClean(f);
});

test('ready before body cannot later install recovery controls or postpone release',()=>{
  const f=fixture({body:false});f.bridge.ready();f.arriveBody({domContentLoaded:true});assert.equal(f.controls,null);assert.equal(f.cover,'ready');f.advance(160);assertClean(f);
  f.observers[0].callback([]);assert.equal(f.controls,null);
});

test('reduced-motion ready releases immediately and a live preference change releases a pending fade',()=>{
  const reduced=fixture({reduced:true});reduced.bridge.ready();assertClean(reduced);
  const loading=fixture();loading.media(reducedQuery,true);assert.equal(loading.cover,'loading');assert.equal(loading.bridge.active,true);loading.bridge.ready();assertClean(loading);
  const fading=fixture();fading.bridge.ready();fading.advance(80);fading.media(reducedQuery,true);assertClean(fading);fading.advance(100);assertClean(fading);
});

test('fail exposes existing destination fallback without removing unrelated DOM or styles',()=>{
  const f=fixture();const fallback=f.document.createElement('section'),style=f.document.createElement('style');fallback.textContent='Existing Lab error and direct links';
  f.document.body.appendChild(fallback);f.document.head.appendChild(style);f.bridge.fail();
  assert.equal(f.cover,undefined);assert.equal(f.bridge.active,false);assert.equal(f.controls,null);assert.deepEqual(f.document.body.children,[fallback]);assert.deepEqual(f.document.head.children,[style]);
  assert.equal(f.timers.size,0);assert.equal(f.document.count('keydown'),0);assert.equal(f.document.count('DOMContentLoaded'),0);
  f.bridge.fail();assert.deepEqual(f.document.body.children,[fallback]);assert.deepEqual(f.document.head.children,[style]);
});

test('pagehide cancels loading/fade work, and Back never revives a consumed handoff',()=>{
  for(const stage of ['head','controls','retry','fade']){
    const f=fixture({body:stage!=='head'});if(stage==='retry')f.advance(8000);if(stage==='fade')f.bridge.ready();
    f.window.emit('pagehide');assertClean(f);assert.equal(f.window.count('pagehide'),0,'The departure hook is one-shot.');
    f.window.emit('pageshow',{persisted:true});f.arriveBody({domContentLoaded:true});f.advance(10000);assertClean(f);
    f.run();assertClean(f);assert.equal(f.storage.has(KEY),false);
  }
});

test('persisted pageshow alone clears a stale cover while ordinary pageshow preserves an opening handoff',()=>{
  const f=fixture({body:false});f.window.emit('pageshow',{persisted:false});assert.equal(f.cover,'loading');assert.equal(f.bridge.active,true);
  f.window.emit('pageshow',{persisted:true});assertClean(f);f.arriveBody({domContentLoaded:true});assertClean(f);
});

test('forced colors skip initial cover and remove an active loading or fading handoff immediately',()=>{
  const initial=fixture({forced:true});assertInactive(initial);assert.equal(initial.storage.has(KEY),false);
  for(const ready of [false,true]){const f=fixture({body:ready});if(ready)f.bridge.ready();f.media(forcedQuery,true);assertClean(f);f.advance(10000);assertClean(f);}
});
