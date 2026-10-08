// CPU-only application wiring with native controls mocked. No browser, canvas, renderer or server.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createHash,webcrypto} from 'node:crypto';
import * as contracts from '../assets/contracts.mjs';
const source=readFileSync(new URL('../assets/app.mjs',import.meta.url),'utf8');
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
class Element {
  constructor(tag='div'){this.tagName=tag;this.dataset={};this.attrs={};this.children=[];this.events={};this.disabled=false;this.hidden=false;this._text='';this.value='';const classes=new Set();this.classList={add:x=>classes.add(x),remove:x=>classes.delete(x),toggle(x,on){if(on??!classes.has(x))classes.add(x);else classes.delete(x);},contains:x=>classes.has(x)};}
  set textContent(text){this._text=String(text);this.children=[];}get textContent(){return this._text+this.children.map(c=>c.textContent).join('');}
  setAttribute(k,v){this.attrs[k]=String(v);}getAttribute(k){return this.attrs[k]??null;}
  addEventListener(k,fn){(this.events[k]??=[]).push(fn);}async emit(k,extra={}){for(const fn of this.events[k]||[])await fn({target:this,preventDefault(){},...extra});}
  replaceChildren(...nodes){this._text='';this.children=[...nodes];}append(...nodes){this.children.push(...nodes);}focus(){}setPointerCapture(){}
}
const waitFor=async condition=>{for(let count=0;count<40;count++){if(condition())return;await new Promise(resolve=>setTimeout(resolve,5));}throw Error('CPU fixture did not settle.');};
async function fixture({empty=false}={}) {
  const elements=[],ids=new Map(),documentEvents={},windowEvents={},loads=[];
  for(const match of html.matchAll(/<([a-z][\w-]*)([^>]*)>/g)){
    const el=new Element(match[1]),attrs=match[2];
    for(const attr of attrs.matchAll(/([\w-]+)="([^"]*)"/g)){el.attrs[attr[1]]=attr[2];if(attr[1]==='id')ids.set(attr[2],el);if(attr[1].startsWith('data-'))el.dataset[attr[1].slice(5)]=attr[2];}
    el.disabled=/\sdisabled(?:\s|$)/.test(attrs);el.hidden=/\shidden(?:\s|$)/.test(attrs);elements.push(el);
  }
  ids.get('surface-mode').value='pbr';ids.get('light-angle').value='35';
  const document={hidden:false,getElementById:id=>ids.get(id),createElement:tag=>new Element(tag),addEventListener:(type,fn)=>(documentEvents[type]??=[]).push(fn),
    querySelectorAll(selector){return elements.filter(el=>selector.split(',').some(part=>{part=part.trim();if(part==='[data-vote]')return el.dataset.vote!==undefined;if(part==='[data-view]')return el.dataset.view!==undefined;return part.startsWith('.')&&(el.attrs.class||'').split(' ').includes(part.slice(1));}));}};
  const location={href:'https://fixture.example/lab/character-bench/?prompt=02',origin:'https://fixture.example'};
  const prompt={id:'02',title:'Same fixture character',text:'Exact same fixture brief',sha256:createHash('sha256').update('Exact same fixture brief').digest('hex'),comparisonDisclosure:'Run conditions differ. Receipts follow your choice.'};
  const entries=['one','two','three'].map(id=>({id,promptId:'02',promptSha256:prompt.sha256,admission:{status:'verified',frozen:true,selfContained:true},asset:{path:'./entries/'+id+'.glb',sha256:'a'.repeat(64),byteLength:100},provenance:{modelLabel:'Secret '+id,sourceHandoff:'Original receipt for Secret '+id,sourceTiming:'Original timer for Secret '+id,requestedReasoning:'XHIGH',producerChecks:'Source-run check',hostChecks:'CPU check only'}}));
  let params,clears=0,disposed=0,creates=0;
  const engine={loadPair(pair,token){return new Promise(resolve=>loads.push({pair,token,resolve}));},clear(){clears++;},dispose(){disposed++;},invalidate(){},setMode(){},setLight(){},setGrid(){}};
  const context=vm.createContext({document,location,URL,AbortController,TextEncoder,crypto:webcrypto,history:{state:null,replaceState(_state,_title,url){if(url)location.href=String(url);}},
    window:{addEventListener:(type,fn)=>(windowEvents[type]??=[]).push(fn)},fetch:async()=>Response.json({version:1,prompts:empty?[]:[prompt],entries:empty?[]:entries})});
  const make=(values)=>new vm.SyntheticModule(Object.keys(values),function(){for(const [name,value]of Object.entries(values))this.setExport(name,value);},{context});
  const core=make(contracts),viewer=make({createViewer(value){params=value;creates++;return engine;}});await core.link(()=>{});await core.evaluate();await viewer.link(()=>{});await viewer.evaluate();
  const module=new vm.SourceTextModule(source,{context,identifier:'https://fixture.example/lab/character-bench/assets/app.mjs',initializeImportMeta(meta){meta.url=module.identifier;},importModuleDynamically:async()=>viewer});
  await module.link(()=>core);await module.evaluate();await waitFor(()=>empty?ids.get('inspection-status').textContent.includes('Awaiting'):ids.get('prompt-title').textContent===prompt.title);
  return {ids,loads,document,documentEvents,windowEvents,get params(){return params;},get creates(){return creates;},get clears(){return clears;},get disposed(){return disposed;},
    async start(){const pending=ids.get('load-pair').emit('click');await waitFor(()=>loads.length>0);return {pending};},
    ready(side){params.onStatus(side,'ready','Ready');},vote(choice){return elements.find(el=>el.dataset.vote===choice).emit('click');},
    button(choice){return elements.find(el=>el.dataset.vote===choice);}};
}
test('empty admission starts no viewer and exposes an honest usable fallback',async()=>{
  const f=await fixture({empty:true});assert.equal(f.creates,0);assert.equal(f.ids.get('load-pair').disabled,true);assert.equal(f.button('a').disabled,true);assert.equal(f.ids.get('reveal').hidden,true);
});
test('actual controls keep identity blind until both current imports are ready and a vote occurs',async()=>{
  const f=await fixture(),{pending}=await f.start();assert.equal(f.creates,1);assert.equal(f.params.state.snapshot.linked,true);assert.equal(f.ids.get('label-a').textContent,'Attempt A');
  assert.equal(f.ids.get('run-note').hidden,false);assert.equal(f.ids.get('provenance').textContent,'');
  f.ready(0);await f.vote('a');assert.equal(f.ids.get('reveal').hidden,true);f.ready(1);f.loads[0].resolve([true,true]);await pending;
  assert.equal(f.button('a').disabled,false);await f.vote('a');assert.equal(f.ids.get('reveal').hidden,false);assert.match(f.ids.get('label-a').textContent,/Secret /);assert.match(f.ids.get('provenance').textContent,/Not independently exposed/);
  assert.match(f.ids.get('provenance').textContent,/Original receipt/);assert.match(f.ids.get('provenance').textContent,/Original timer/);assert.match(f.ids.get('provenance').textContent,/Source-run check/);assert.match(f.ids.get('provenance').textContent,/CPU check only/);
  assert.equal(f.button('b').disabled,true);
});
test('linked/unlinked UI, next-pair reset and departure connect to lifecycle guards',async()=>{
  const f=await fixture(),{pending}=await f.start();f.ready(0);f.ready(1);f.loads[0].resolve([true,true]);await pending;
  await f.ids.get('link-cameras').emit('click');assert.equal(f.params.state.snapshot.linked,false);assert.equal(f.ids.get('link-cameras').getAttribute('aria-pressed'),'false');
  await f.vote('tie');await f.ids.get('next-pair').emit('click');assert.equal(f.clears,1);assert.equal(f.ids.get('reveal').hidden,true);assert.equal(f.ids.get('label-a').textContent,'Attempt A');assert.equal(f.button('a').disabled,true);
  for(const fn of f.windowEvents.pagehide)fn();assert.equal(f.disposed,1);assert.equal(f.params.state.snapshot.choice,null);
});
