// Released-route integration only. No browser, WebGL, servers, generators or
// original entrant workspaces execute; the app's renderer is an inert fixture.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync,existsSync} from 'node:fs';
import {createHash,webcrypto} from 'node:crypto';
import * as contracts from '../character-bench/assets/contracts.mjs';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const raw=JSON.parse(read('character-bench/data/admission.json'));
const catalog=contracts.validateManifest(raw);
const labHtml=read('lab-space/index.html'),benchHtml=read('character-bench/index.html'),app=read('character-bench/assets/app.mjs');
const labUrl=new URL('https://pazneria.github.io/lab/lab-space/');
const target=new URL(labHtml.match(/<a id="character-link" href="([^"]+)"/)[1],labUrl);
const promptId=target.searchParams.get('prompt');
const publicRoot=new URL('../',labUrl);

test('the released lobby links to an existing dedicated route and an admitted same-prompt pair',()=>{
  assert.equal(target.origin,labUrl.origin);assert.equal(target.pathname,'/lab/character-bench/');
  assert.ok(existsSync(new URL('../character-bench/index.html',import.meta.url)));
  assert.ok(catalog.prompts.some(prompt=>prompt.id===promptId));assert.ok(contracts.eligiblePairs(catalog,promptId).length>0);
  for(const pair of contracts.eligiblePairs(catalog,promptId)){
    assert.equal(new Set(pair.map(entry=>entry.promptId)).size,1);assert.equal(pair[0].promptId,promptId);
    for(const entry of pair){const asset=new URL(entry.asset.path,target);assert.equal(asset.origin,labUrl.origin);assert.ok(asset.pathname.startsWith('/lab/character-bench/entries/'));
      assert.ok(existsSync(new URL('../character-bench/'+entry.asset.path,import.meta.url)));}
  }
});

test('both dedicated-room return links lead to the production Lab without another Lab canvas/module',()=>{
  const returns=[...benchHtml.matchAll(/<a [^>]*href="\.\.\/lab-space\/"[^>]*>/g)];assert.equal(returns.length,2);
  for(const match of returns){const href=match[0].match(/href="([^"]+)"/)[1];assert.equal(new URL(href,target).href,labUrl.href);}
  assert.doesNotMatch(benchHtml,/<canvas|production-space\.js|production-room\.mjs/);
  assert.match(benchHtml,/assets\/app\.mjs/);assert.match(app,/window\.addEventListener\('pagehide',depart\)/);
});

test('the single lobby character is an unchanged owned published attempt, with truthful exhibit attribution',()=>{
  const provenance=JSON.parse(read('lab-space/characters/ivo-renn-sol.provenance.json'));
  const bytes=readFileSync(new URL('../lab-space/characters/'+provenance.asset,import.meta.url));
  assert.equal(bytes.length,provenance.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),provenance.sha256);
  const published=catalog.entries.find(entry=>entry.asset?.sha256===provenance.sha256);
  assert.ok(published,'The displayed GLB should match the released owned comparison attempt');assert.equal(published.promptId,promptId);
  assert.equal(provenance.originalUnchanged,true);assert.equal(provenance.servingConfigurationIndependentlyVerified,false);
  assert.match(provenance.ownership,/Jordan's own/);assert.match(provenance.purpose,/no benchmark result or winner/i);
});

test('actual UTF-8 host UI bytes contain no nonprinting or replacement glyphs',()=>{
  for(const path of ['lab-space/index.html','character-bench/index.html','character-bench/assets/app.mjs']){
    const bytes=readFileSync(new URL('../'+path,import.meta.url));
    const text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
    assert.doesNotMatch(text,/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffd]/,path);
  }
});

test('the dedicated public room has no private Studio connection or persistent/public preference endpoint',()=>{
  const viewer=read('character-bench/assets/viewer.mjs');
  for(const source of [app,viewer,benchHtml])assert.doesNotMatch(source,/jordan-character-studio-review|jippity-project-room|submitPublicVote|public-judgments|localStorage|indexedDB|postMessage\(/);
  assert.match(app,/fetch\(new URL\('\.\.\/data\/admission\.json'/);assert.match(viewer,/url\.origin!==location\.origin/);
  assert.match(benchHtml,/session-only preferences/);assert.match(benchHtml,/no public CharacterBench tally/);
  assert.equal(new URL('character-bench/data/admission.json',publicRoot).origin,labUrl.origin);
});

class Element {
  constructor(tag){this.tagName=tag;this.attrs={};this.dataset={};this.events=new Map();this.children=[];this.hidden=false;this.disabled=false;this.value='';this._text='';const classes=new Set();
    this.classList={add:value=>classes.add(value),remove:value=>classes.delete(value),toggle(value,on){if(on??!classes.has(value))classes.add(value);else classes.delete(value);}};}
  get textContent(){return this._text+this.children.map(child=>child.textContent).join('');}set textContent(value){this._text=String(value);this.children=[];}
  setAttribute(name,value){this.attrs[name]=String(value);}getAttribute(name){return this.attrs[name]??null;}
  append(...children){this.children.push(...children);}replaceChildren(...children){this._text='';this.children=children;}
  addEventListener(type,callback){if(!this.events.has(type))this.events.set(type,[]);this.events.get(type).push(callback);}
  async emit(type,extra={}){for(const callback of this.events.get(type)||[])await callback({target:this,preventDefault(){},...extra});}
  focus(){}setPointerCapture(){}
}
const settleUntil=async condition=>{for(let attempt=0;attempt<60;attempt++){if(condition())return;await new Promise(resolve=>setTimeout(resolve,2));}throw Error('Released app fixture did not settle');};
async function releasedApp(){
  const elements=[],ids=new Map(),events=new Map(),engines=[],loads=[],fetches=[];
  for(const match of benchHtml.matchAll(/<([a-z][\w-]*)([^>]*)>/g)){
    const element=new Element(match[1]);for(const attr of match[2].matchAll(/([\w-]+)="([^"]*)"/g)){element.attrs[attr[1]]=attr[2];if(attr[1]==='id')ids.set(attr[2],element);if(attr[1].startsWith('data-'))element.dataset[attr[1].slice(5)]=attr[2];}
    element.disabled=/\sdisabled(?:\s|$)/.test(match[2]);element.hidden=/\shidden(?:\s|$)/.test(match[2]);elements.push(element);
  }
  ids.get('surface-mode').value='pbr';ids.get('light-angle').value='35';
  const document={hidden:false,getElementById:id=>ids.get(id),createElement:tag=>new Element(tag),
    addEventListener(type,callback){if(!events.has(type))events.set(type,[]);events.get(type).push(callback);},
    querySelectorAll(selector){return elements.filter(element=>selector.split(',').some(part=>{part=part.trim();if(part==='[data-vote]')return element.dataset.vote!==undefined;if(part==='[data-view]')return element.dataset.view!==undefined;return part.startsWith('.')&&(element.attrs.class||'').split(' ').includes(part.slice(1));}));},
  };
  const location={href:target.href,origin:target.origin};
  const context=vm.createContext({URL,document,location,AbortController,TextEncoder,crypto:webcrypto,
    history:{state:null,replaceState(state,title,url){if(url)location.href=String(url);}},
    window:{addEventListener(type,callback){if(!events.has(type))events.set(type,[]);events.get(type).push(callback);}},
    fetch:async url=>{fetches.push(String(url));return Response.json(raw);},
  });
  const synthetic=values=>new vm.SyntheticModule(Object.keys(values),function(){for(const [name,value]of Object.entries(values))this.setExport(name,value);},{context});
  const core=synthetic(contracts),viewer=synthetic({createViewer(options){
    const engine={options,disposed:false,clear(){},invalidate(){},setMode(){},setLight(){},setGrid(){},dispose(){this.disposed=true;},
      loadPair(pair,generation){return new Promise(resolve=>loads.push({engine:this,pair,generation,resolve}));}};engines.push(engine);return engine;
  }});
  await core.link(()=>{});await core.evaluate();await viewer.link(()=>{});await viewer.evaluate();
  const module=new vm.SourceTextModule(app,{context,initializeImportMeta(meta){meta.url=new URL('assets/app.mjs',target).href;},importModuleDynamically:async()=>viewer});
  await module.link(()=>core);await module.evaluate();await settleUntil(()=>!ids.get('prompt-select').disabled);
  return {ids,engines,loads,fetches,events,document,get state(){return engines.at(-1).options.state;},
    button:choice=>elements.find(element=>element.dataset.vote===choice),
    async start(){const count=loads.length,pending=ids.get('load-pair').emit('click');await settleUntil(()=>loads.length>count);return {pending,load:loads.at(-1)};},
    ready(side){engines.at(-1).options.onStatus(side,'ready','Ready');},
    async emit(type){for(const callback of events.get(type)||[])await callback({persisted:true});},
  };
}

test('the actual lobby deep link boots a blind same-prompt comparison and reveals only after both current imports',async()=>{
  const f=await releasedApp();assert.deepEqual(f.fetches,[new URL('data/admission.json',target).href]);assert.equal(f.engines.length,0);
  assert.equal(f.ids.get('prompt-select').value,promptId);const {pending,load}=await f.start();
  assert.ok(load.pair.every(entry=>entry.promptId===promptId));assert.equal(f.state.snapshot.linked,true);
  assert.equal(f.ids.get('label-a').textContent,'Attempt A');assert.equal(f.ids.get('provenance').textContent,'');
  f.ready(0);await f.button('a').emit('click');assert.equal(f.ids.get('reveal').hidden,true);
  f.ready(1);load.resolve([true,true]);await pending;await f.button('tie').emit('click');
  assert.equal(f.ids.get('reveal').hidden,false);assert.equal(f.ids.get('label-a').textContent,load.pair[0].provenance.modelLabel);
  assert.match(f.ids.get('provenance').textContent,/Runtime QA/);assert.match(f.ids.get('provenance').textContent,/Pending/);assert.equal(f.button('a').disabled,true);
});

test('departure clears the actual session choice and cached-page retry creates a fresh independent viewer',async()=>{
  const f=await releasedApp(),first=await f.start();f.ready(0);f.ready(1);first.load.resolve([true,true]);await first.pending;
  await f.button('a').emit('click');assert.equal(f.state.snapshot.choice,'a');const engine=f.engines[0];
  await f.emit('pagehide');assert.equal(engine.disposed,true);assert.equal(f.state.snapshot.choice,null);assert.equal(f.ids.get('reveal').hidden,true);
  assert.equal(f.ids.get('label-a').textContent,'Attempt A');assert.equal(f.ids.get('provenance').textContent,'');assert.equal(f.button('a').disabled,true);
  await f.emit('pageshow');assert.equal(f.engines.length,1,'Return must require explicit reloading rather than silently importing');
  const second=await f.start();assert.equal(f.engines.length,2);assert.equal(f.state.snapshot.choice,null);assert.ok(second.load.pair.every(entry=>entry.promptId===promptId));
  f.ready(0);f.ready(1);second.load.resolve([true,true]);await second.pending;assert.equal(f.button('a').disabled,false);
});
