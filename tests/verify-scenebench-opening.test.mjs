// CPU-only actual standalone module wiring. No browser, scene, graphics or real network.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {webcrypto} from 'node:crypto';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const copy=value=>JSON.parse(JSON.stringify(value));
const entry=(id,promptId,model,extra={})=>({id,promptId,comparisonModel:model,requestedConfiguration:model,title:id,availability:'ready',htmlSha256:'a'.repeat(64),limitations:[],documents:[],...extra});
const catalog={prompts:[{id:'01',title:'First',brief:'First brief'},{id:'02',title:'Unpaired',brief:'Unpaired brief'},{id:'03',title:'Third',brief:'Third brief'}],promptVersions:[{id:'v03',promptId:'03',label:'Version three'}],entries:[entry('a','01','m0'),entry('b','01','m1'),entry('bad','01','m2',{availability:'failed'}),entry('solo','02','m0'),entry('solo-two','02','m0'),entry('s1','03','m0'),entry('s2','03','m0'),entry('s3','03','m0'),entry('t','03','m1'),entry('u','03','m2',{availability:'unverified'})]};
const privateKey='lab.walkable3d.judgments.v1',publicKey='lab.walkable3d.public.v1';
class Node{
 constructor(tag='div'){this.tag=tag;this.children=[];this.dataset={};this.attrs={};this.listeners={};this.value='';this.checked=false;this.hidden=false;this.disabled=false;this.open=false;this._text='';this.classList={add:x=>this.className=((this.className||'')+' '+x).trim()};}
 set textContent(value){this._text=String(value);this.children=[];}get textContent(){return this._text+this.children.map(node=>node.textContent).join('');}
 append(...nodes){this.children.push(...nodes);}prepend(...nodes){this.children.unshift(...nodes);}replaceChildren(...nodes){this._text='';this.children=[...nodes];}
 setAttribute(k,v){this.attrs[k]=String(v);}addEventListener(type,fn){(this.listeners[type]??=[]).push(fn);}async emit(type){for(const fn of this.listeners[type]||[])await fn({target:this,preventDefault(){}});}
 descendants(){return this.children.flatMap(node=>[node,...node.descendants()]);}
 querySelectorAll(selector){return this.descendants().filter(node=>selector==='dd'?node.tag==='dd':selector==='details'?node.tag==='details':false);}
 querySelector(selector){if(selector==='.entry-meta span')return this.descendants().find(node=>node.className==='entry-meta')?.children.find(node=>node.tag==='span');return this.querySelectorAll(selector)[0]||null;}
 get options(){return this.children;}focus(){}scrollIntoView(){}
}
async function fixture({query='',draws=[.99,0,0,.99],random=null,pending=[],privateRecord={version:1,grades:{a:{total:80,notes:'Keep private'}},preferences:{'a::b':{entries:['a','b'],choice:'a'}},opened:{a:'old'}}}={}){
 const ids=new Map(),choices=['a','tie','b','skip'].map(choice=>Object.assign(new Node('button'),{dataset:{choice}})),calls=[],opened=[],storage=new Map([[privateKey,JSON.stringify(privateRecord)]]);
 const bodies=Object.fromEntries(pending.map(body=>[[...body.entries].sort().join('::'),copy(body)]));
 const publicRecord={token:'a'.repeat(64),expiresAt:Date.now()+86400000,receipts:{},pending:bodies,sequence:{}};storage.set(publicKey,JSON.stringify(publicRecord));
 const byId=id=>{if(!ids.has(id))ids.set(id,new Node());return ids.get(id);};
 const document={createElement:tag=>new Node(tag),querySelectorAll:selector=>selector==='[data-choice]'?choices:[],querySelector(selector){if(selector.startsWith('#'))return byId(selector.slice(1));if(selector==='[data-choice="skip"]')return choices.at(-1);const id=selector.match(/^\[data-entry="([^"]+)"\]$/)?.[1];return id?[...byId('entries').children,...byId('failed-entries').children].find(node=>node.dataset.entry===id)||null:null;}};
 const location={href:'https://fixture.invalid/lab/walkable-3d/'+query,search:new URL('https://fixture.invalid/'+query).search,hash:new URL('https://fixture.invalid/'+query).hash};
 let randomCalls=0,viewerOptions;const events={};
 const context=vm.createContext({document,location,URL,URLSearchParams,AbortController,setTimeout,clearTimeout,crypto:webcrypto,navigator:{},Blob,history:{state:null,replaceState(_s,_t,url){if(url){location.href=String(url);location.search=new URL(url).search;}}},addEventListener(type,fn){events[type]=fn;},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)},fetch:async(url,options={})=>{
  const path=String(url),body=options.body?JSON.parse(options.body):null;calls.push({path,body,method:options.method||'GET'});
  if(path==='entries.json')return Response.json(catalog);
  assert.equal(new URL(path).origin,'https://voting.fixture.invalid');
  if(path.endsWith('/leaderboard'))return Response.json({rows:[],counts:{votes:0},rubric:{rows:[]}});
  assert.ok(path.endsWith('/vote'),'Unexpected request; opening must not mint an identity');
  return Response.json({status:body.choice==='withdraw'?'withdrawn':'saved',requestId:body.requestId,intent:body.intent,choice:body.choice});
 }});
 context.draw=()=>{randomCalls++;if(random)return random();assert.ok(draws.length,'Unexpected random draw');return draws.shift();};vm.runInContext('Math.random=draw',context);
 const synthetic=values=>new vm.SyntheticModule(Object.keys(values),function(){for(const [key,value]of Object.entries(values))this.setExport(key,value);},{context});
 const comparisons=new vm.SourceTextModule(read('walkable-3d/assets/comparisons.js'),{context});await comparisons.link(()=>{});await comparisons.evaluate();
 const publicModule=new vm.SourceTextModule(read('walkable-3d/assets/public-judgments.js'),{context});await publicModule.link(()=>synthetic({PUBLIC_VOTING_ORIGIN:'https://voting.fixture.invalid'}));await publicModule.evaluate();
 const viewer=synthetic({createViewer(options){viewerOptions=options;return {isOpen:false,open(e){opened.push(e.id);},close(){}};}}),judgments=synthetic({createGradeForm:()=>new Node('form'),renderLeaderboard(){}});
 const module=new vm.SourceTextModule(read('walkable-3d/assets/benchmark.js'),{context});await module.link(path=>path.endsWith('comparisons.js')?comparisons:path.endsWith('public-judgments.js')?publicModule:path.endsWith('viewer.js')?viewer:judgments);await module.evaluate();
 for(let n=0;n<40;n++){if(byId('entry-count').textContent)break;await new Promise(resolve=>setTimeout(resolve,2));}
 assert.ok(byId('entry-count').textContent,'Standalone startup failed');await new Promise(resolve=>setTimeout(resolve,0));
 return {byId,choices,calls,opened,storage,publicRecord,privateRecord,location,publicApi:publicModule.namespace,get randomCalls(){return randomCalls;},pair:()=>byId('entries').children.filter(node=>node.dataset.entry).map(node=>node.dataset.entry),readyBoth(){for(const id of this.pair())viewerOptions.onReady(catalog.entries.find(entry=>entry.id===id));}};
}

test('bare standalone opening chooses a random eligible prompt and randomized sides without scene or vote writes',async()=>{
 const f=await fixture();assert.equal(f.byId('prompt-select').value,'03');assert.deepEqual(f.pair(),['t','s1']);assert.equal(f.randomCalls,4);assert.deepEqual(f.opened,[]);
 assert.ok(f.choices.slice(0,3).every(button=>button.disabled));assert.equal(f.byId('vote-reveal').hidden,true);
 assert.ok(f.calls.every(call=>call.method==='GET'));assert.deepEqual(JSON.parse(f.storage.get(privateKey)),f.privateRecord);assert.deepEqual(JSON.parse(f.storage.get(publicKey)),f.publicRecord);
});

test('prompt, entry and prompt-version links keep their original deterministic selection',async()=>{
 for(const [query,prompt,pair]of [['?prompt=01','01',['a','b']],['?entry=u&prompt=01','03',['s1','u']],['?prompt=03&version=v03','03',['s1','s2']],['?entry=missing','01',['a','b']]]){
  const f=await fixture({query,random:()=>{throw Error('Explicit link shuffled');}});assert.equal(f.byId('prompt-select').value,prompt);assert.deepEqual(f.pair(),pair);assert.equal(f.randomCalls,0);assert.deepEqual(f.opened,[]);
  if(query.includes('version'))assert.equal(f.byId('prompt-version').value,'v03');
 }
});

test('valid pending opening resumes exact ordered pair and retries the original request identity without ledger migration',async()=>{
 const pending={entries:['t','s2'],choice:'tie',reportedBlind:true,requestId:'original-request-id',intent:9};
 const f=await fixture({pending:[pending],random:()=>{throw Error('Pending comparison shuffled');}});assert.deepEqual(f.pair(),pending.entries);assert.equal(f.randomCalls,0);
 assert.deepEqual(JSON.parse(f.storage.get(publicKey)),f.publicRecord);assert.ok(f.calls.every(call=>call.method==='GET'));f.readyBoth();await f.choices[1].emit('click');
 const writes=f.calls.filter(call=>call.method==='POST');assert.equal(writes.length,1);assert.deepEqual(writes[0].body,pending);assert.equal(JSON.parse(f.storage.get(publicKey)).pending['s2::t'],undefined);
});

test('explicit links remain scoped even when another pair has a pending submission',async()=>{
 const pending={entries:['t','s2'],choice:'tie',requestId:'retained-request',intent:4};
 const f=await fixture({query:'?prompt=01',pending:[pending],random:()=>{throw Error('Scoped link shuffled');}});assert.deepEqual(f.pair(),['a','b']);assert.deepEqual(JSON.parse(f.storage.get(publicKey)),f.publicRecord);
 assert.ok(f.calls.every(call=>call.method==='GET'));
});

test('unavailable, mismatched and same-model pending pairs stay recorded while opening falls back to eligible random selection',async()=>{
 const pending=[{entries:['bad','a'],choice:'tie'},{entries:['a','t'],choice:'tie'},{entries:['s1','s2'],choice:'tie'},{entries:['missing','t'],choice:'tie'}];
 const f=await fixture({pending});assert.deepEqual(f.pair(),['t','s1']);assert.deepEqual(JSON.parse(f.storage.get(publicKey)),f.publicRecord);assert.ok(f.calls.every(call=>call.method==='GET'));
});

test('opening and Next share prompt-first model-first weighting and immediate unordered repeat avoidance',async()=>{
 const totals=new Map();
 for(let bin=0;bin<20;bin++){const draws=[(bin+.5)/20,.1,.1,.1],f=await fixture({draws});const p=f.byId('prompt-select').value;totals.set(p,(totals.get(p)||0)+1);const entries=f.pair().map(id=>catalog.entries.find(entry=>entry.id===id));assert.notEqual(entries[0].comparisonModel,entries[1].comparisonModel);assert.ok(entries.every(entry=>entry.promptId===p&&entry.availability!=='failed'));}
 assert.deepEqual([...totals],[['01',10],['03',10]]);
 const f=await fixture({draws:[.99,0,0,.99,.99,0,0,.1]}),before=[...f.pair()].sort().join('::');await f.byId('next-pair').emit('click');assert.notEqual([...f.pair()].sort().join('::'),before);assert.deepEqual(f.opened,[]);
});

test('opening independently chooses model groups, their entries and left/right despite unequal entry counts',async()=>{
 const expected=[[['s1','t'],['s2','t'],['s3','t']],[['s1','u'],['s2','u'],['s3','u']],[['t','u']]];
 for(let group=0;group<expected.length;group++)for(let item=0;item<expected[group].length;item++)for(const side of [.1,.9]){
  const f=await fixture({draws:[.9,(group+.5)/3,(item+.5)/expected[group].length,side]});
  assert.deepEqual(f.pair(),side<.5?expected[group][item]:[...expected[group][item]].reverse());
 }
});

test('every eligible production prompt is reachable on opening with unchanged eligibility and no scene execution',async()=>{
 const data=JSON.parse(read('walkable-3d/entries.json')),context=vm.createContext({});let rolls=[];
 context.draw=()=>rolls.shift();vm.runInContext('Math.random=draw',context);
 const module=new vm.SourceTextModule(read('walkable-3d/assets/comparisons.js'),{context});await module.link(()=>{});await module.evaluate();
 const api=module.namespace,eligible=data.prompts.filter(prompt=>new Set(data.entries.filter(e=>e.promptId===prompt.id&&e.comparisonModel&&api.isOpenable(e)).map(e=>e.comparisonModel)).size>=2);
 for(let index=0;index<eligible.length;index++)for(const side of [.1,.9]){
  rolls=[(index+.5)/eligible.length,.5,.5,side];const selected=api.initialComparison(data.prompts,data.entries);assert.equal(selected.promptId,eligible[index].id);
  assert.equal(selected.entries.length,2);assert.notEqual(selected.entries[0].comparisonModel,selected.entries[1].comparisonModel);
  assert.ok(selected.entries.every(e=>api.isOpenable(e)&&e.promptId===selected.promptId));assert.equal(rolls.length,0);
 }
});
