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
  replaceChildren(...nodes){this._text='';this.children=[...nodes];}append(...nodes){this.children.push(...nodes);}focus(){this.focusCount=(this.focusCount||0)+1;}setPointerCapture(){}
}
const waitFor=async condition=>{for(let count=0;count<40;count++){if(condition())return;await new Promise(resolve=>setTimeout(resolve,5));}throw Error('CPU fixture did not settle.');};
async function fixture({empty=false,requested='02',oneEntry=false,voteFailure=false,deferVote=false,deferRestore=false}={}) {
  const elements=[],ids=new Map(),documentEvents={},windowEvents={},loads=[];
  for(const match of html.matchAll(/<([a-z][\w-]*)([^>]*)>/g)){
    const el=new Element(match[1]),attrs=match[2];
    for(const attr of attrs.matchAll(/([\w-]+)="([^"]*)"/g)){el.attrs[attr[1]]=attr[2];if(attr[1]==='id')ids.set(attr[2],el);if(attr[1].startsWith('data-'))el.dataset[attr[1].slice(5)]=attr[2];}
    el.disabled=/\sdisabled(?:\s|$)/.test(attrs);el.hidden=/\shidden(?:\s|$)/.test(attrs);elements.push(el);
  }
  ids.get('surface-mode').value='pbr';ids.get('light-angle').value='35';
  const document={hidden:false,getElementById:id=>ids.get(id),createElement:tag=>new Element(tag),addEventListener:(type,fn)=>(documentEvents[type]??=[]).push(fn),
    querySelectorAll(selector){return elements.filter(el=>selector.split(',').some(part=>{part=part.trim();if(part==='[data-vote]')return el.dataset.vote!==undefined;if(part==='[data-view]')return el.dataset.view!==undefined;return part.startsWith('.')&&(el.attrs.class||'').split(' ').includes(part.slice(1));}));}};
  const location={href:'https://fixture.example/lab/character-bench/?prompt='+requested,origin:'https://fixture.example'};
  const prompt={id:'02',title:'Same fixture character',text:'Exact same fixture brief',sha256:createHash('sha256').update('Exact same fixture brief').digest('hex'),comparisonDisclosure:'Run conditions differ. Receipts follow your choice.'};
  const entries=['one','two','three'].map(id=>({id,promptId:'02',promptSha256:prompt.sha256,admission:{status:'verified',frozen:true,selfContained:true},asset:{path:'./entries/'+id+'.glb',sha256:'a'.repeat(64),byteLength:100},provenance:{modelLabel:'Secret '+id,sourceHandoff:'Original receipt for Secret '+id,sourceTiming:'Original timer for Secret '+id,requestedReasoning:'XHIGH',producerChecks:'Source-run check',hostChecks:'CPU check only'}}));
  let params,clears=0,disposed=0,creates=0;
  const engine={loadPair(pair,token){return new Promise(resolve=>loads.push({pair,token,resolve}));},clear(){clears++;},dispose(){disposed++;},invalidate(){},setMode(){},setLight(){},setGrid(){}};
  const context=vm.createContext({document,location,URL,AbortController,TextEncoder,crypto:webcrypto,history:{state:null,replaceState(_state,_title,url){if(url)location.href=String(url);}},
    window:{addEventListener:(type,fn)=>(windowEvents[type]??=[]).push(fn)},fetch:async()=>Response.json({version:1,prompts:empty?[]:[prompt],entries:empty?[]:oneEntry?entries.slice(0,1):entries})});
  const make=(values)=>new vm.SyntheticModule(Object.keys(values),function(){for(const [name,value]of Object.entries(values))this.setExport(name,value);},{context});
  let pendingVote=null,sentVotes=0,voteResolve,restoreResolve,currentRequests=0;
  const voting={pending:()=>pendingVote,remember(){},remembered:()=>null,current:async()=>{currentRequests++;if(deferRestore&&currentRequests===1)return new Promise(resolve=>{restoreResolve=resolve;});return {status:'empty',intent:0};},leaderboard:async()=>({rows:[],counts:{votes:0}}),
    async submit(pair,choice,_hash,{retryOnly}={}){sentVotes++;if(!retryOnly)pendingVote={choice};if(voteFailure&&sentVotes===1)throw Error('Offline');if(deferVote)await new Promise(resolve=>{voteResolve=resolve;});const receipt={status:'saved',choice:pendingVote.choice};pendingVote=null;return receipt;}};
  const votes=make({createVotingClient:()=>voting,renderLeaderboard(){}}),core=make(contracts),viewer=make({createViewer(value){params=value;creates++;return {...engine};}});await core.link(()=>{});await core.evaluate();await votes.link(()=>{});await votes.evaluate();await viewer.link(()=>{});await viewer.evaluate();
  const module=new vm.SourceTextModule(source,{context,identifier:'https://fixture.example/lab/character-bench/assets/app.mjs',initializeImportMeta(meta){meta.url=module.identifier;},importModuleDynamically:async()=>viewer});
  await module.link(specifier=>specifier==='./voting.mjs'?votes:core);await module.evaluate();await waitFor(()=>empty?ids.get('inspection-status').textContent.includes('Awaiting'):ids.get('prompt-title').textContent===(requested==='02'?prompt.title:'No admitted prompt at this link'));await new Promise(resolve=>setTimeout(resolve,0));
  return {ids,loads,elements,document,documentEvents,windowEvents,get params(){return params;},get creates(){return creates;},get clears(){return clears;},get disposed(){return disposed;},
    async start(){const count=loads.length,pending=ids.get('load-pair').emit('click');await waitFor(()=>loads.length>count);return {pending,load:loads.at(-1)};},
    ready(side,token){params.onStatus(side,'ready','Ready',token);},status(side,kind,text,token){params.onStatus(side,kind,text,token);},vote(choice){return elements.find(el=>el.dataset.vote===choice).emit('click');},
    button(choice){return elements.find(el=>el.dataset.vote===choice);},get sentVotes(){return sentVotes;},confirmVote(){voteResolve();},finishOldRestore(){restoreResolve({status:'empty',intent:0});}};
}

test('vote failure reveals no identity, retry preserves choice, and duplicate clicks wait for confirmation',async()=>{
  const failed=await fixture({voteFailure:true}),load=await failed.start();failed.ready(0);failed.ready(1);load.load.resolve([true,true]);await load.pending;
  await failed.vote('b');assert.equal(failed.ids.get('reveal').hidden,true);assert.equal(failed.ids.get('provenance').textContent,'');assert.equal(failed.ids.get('retry-vote').hidden,false);assert.equal(failed.button('a').disabled,true);
  await failed.ids.get('retry-vote').emit('click');assert.equal(failed.ids.get('reveal').hidden,false);assert.equal(failed.params.state.snapshot.choice,'b');assert.equal(failed.sentVotes,2);
  const deferred=await fixture({deferVote:true}),second=await deferred.start();deferred.ready(0);deferred.ready(1);second.load.resolve([true,true]);await second.pending;
  const submission=deferred.vote('a');await waitFor(()=>deferred.sentVotes===1);await deferred.vote('b');assert.equal(deferred.sentVotes,1);assert.equal(deferred.ids.get('reveal').hidden,true);assert.equal(deferred.ids.get('swap-pair').disabled,true);
  deferred.confirmVote();await submission;assert.equal(deferred.ids.get('reveal').hidden,false);assert.equal(deferred.params.state.snapshot.choice,'a');
});

test('pending vote restoration cannot lock controls after cached-page departure and return',async()=>{
  const f=await fixture({deferRestore:true}),first=await f.start();f.ready(0);f.ready(1);first.load.resolve([true,true]);await first.pending;assert.equal(f.button('a').disabled,true);
  for(const fn of f.windowEvents.pagehide)fn();for(const fn of f.windowEvents.pageshow)fn({persisted:true});await new Promise(resolve=>setTimeout(resolve,0));
  f.finishOldRestore();const second=await f.start();f.ready(0);f.ready(1);second.load.resolve([true,true]);await second.pending;
  assert.equal(f.button('a').disabled,false);assert.doesNotMatch(f.ids.get('vote-status').textContent,/Checking/);
});
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

test('hide/show and same-pair asset reload preserve a completed preference, revealed identities and provenance',async()=>{
  for(const choice of ['a','b','tie']){
    const f=await fixture(),first=await f.start();f.ready(0);f.ready(1);first.load.resolve([true,true]);await first.pending;await f.vote(choice);
    const before=f.params.state.snapshot,labels=['a','b'].map(side=>f.ids.get('label-'+side).textContent),provenance=f.ids.get('provenance').textContent;
    f.document.hidden=true;for(const fn of f.documentEvents.visibilitychange)fn();
    assert.deepEqual(f.params.state.snapshot.ready,[false,false]);assert.equal(f.params.state.snapshot.canVote,false);
    assert.equal(f.params.state.snapshot.choice,choice);assert.equal(f.ids.get('reveal').hidden,false);assert.equal(f.ids.get('provenance').textContent,provenance);
    f.document.hidden=false;for(const fn of f.documentEvents.visibilitychange)fn();
    const retry=await f.start();assert.equal(retry.load.token,before.generation);assert.deepEqual(retry.load.pair,before.pair);
    f.ready(0);assert.equal(f.button('a').disabled,true);f.ready(1);retry.load.resolve([true,true]);await retry.pending;
    assert.equal(f.params.state.snapshot.choice,choice);assert.equal(f.params.state.snapshot.canVote,false);
    assert.deepEqual(['a','b'].map(side=>f.ids.get('label-'+side).textContent),labels);assert.equal(f.ids.get('provenance').textContent,provenance);
    assert.equal(f.ids.get('reveal').hidden,false);assert.equal(f.button(choice).classList.contains('selected'),true);
    await f.vote(choice==='a'?'b':'a');assert.equal(f.params.state.snapshot.choice,choice,'Reimporting assets cannot submit a second preference');
    assert.equal(f.creates,1);assert.equal(f.disposed,0);
  }
});

test('hiding an unvoted inspection locks readiness until both retry imports complete',async()=>{
  const f=await fixture(),first=await f.start();f.ready(0);f.ready(1);first.load.resolve([true,true]);await first.pending;
  f.document.hidden=true;for(const fn of f.documentEvents.visibilitychange)fn();
  assert.equal(f.button('a').disabled,true);assert.equal(f.ids.get('reveal').hidden,true);assert.equal(f.ids.get('label-a').textContent,'Attempt A');
  f.document.hidden=false;for(const fn of f.documentEvents.visibilitychange)fn();assert.equal(f.button('a').disabled,true);
  const retry=await f.start();f.ready(0);await f.vote('a');assert.equal(f.ids.get('reveal').hidden,true);
  f.ready(1);retry.load.resolve([true,true]);await retry.pending;
  assert.equal(f.button('a').disabled,false);assert.equal(f.ids.get('provenance').textContent,'');assert.equal(f.ids.get('reveal').hidden,true);
});

test('departure and a full document reload clear the voted session and require a new blind inspection',async()=>{
  const f=await fixture(),first=await f.start();f.ready(0);f.ready(1);first.load.resolve([true,true]);await first.pending;await f.vote('tie');
  for(const fn of f.windowEvents.pagehide)fn();
  assert.equal(f.params.state.snapshot.choice,null);assert.equal(f.ids.get('reveal').hidden,true);
  assert.equal(f.ids.get('label-a').textContent,'Attempt A');assert.equal(f.ids.get('provenance').textContent,'');assert.equal(f.disposed,1);
  const fresh=await fixture(),next=await fresh.start();assert.equal(fresh.params.state.snapshot.choice,null);
  assert.equal(fresh.ids.get('reveal').hidden,true);assert.equal(fresh.ids.get('label-a').textContent,'Attempt A');assert.equal(fresh.ids.get('provenance').textContent,'');
  assert.equal(fresh.button('a').disabled,true);fresh.ready(0);assert.equal(fresh.button('a').disabled,true);
  fresh.ready(1);next.load.resolve([true,true]);await next.pending;assert.equal(fresh.button('a').disabled,false);
});

test('fresh next pair restores linked cameras, active side and shared presentation defaults',async()=>{
  const f=await fixture(),first=await f.start();f.ready(0);f.ready(1);first.load.resolve([true,true]);await first.pending;
  await f.ids.get('link-cameras').emit('click');f.params.state.setCamera(1,{yaw:2,distance:6});
  f.ids.get('surface-mode').value='wire';f.ids.get('light-angle').value='-90';f.ids.get('grid-toggle').setAttribute('aria-pressed','false');
  await f.ids.get('next-pair').emit('click');
  const s=f.params.state.snapshot;assert.equal(s.linked,true);assert.equal(s.active,0);assert.deepEqual(s.cameras,[contracts.DEFAULT_CAMERA,contracts.DEFAULT_CAMERA]);
  assert.equal(f.ids.get('surface-mode').value,'pbr');assert.equal(f.ids.get('light-angle').value,'35');assert.equal(f.ids.get('grid-toggle').getAttribute('aria-pressed'),'true');
  assert.equal(f.ids.get('load-pair').focusCount,1);assert.equal(f.ids.get('reveal').hidden,true);
});
test('swap retains exact entries, reverses sides and locks choices until both new imports; reveal blocks swap',async()=>{
  const f=await fixture(),first=await f.start();assert.equal(f.ids.get('swap-pair').disabled,true);
  f.ready(0);f.ready(1);first.load.resolve([true,true]);await first.pending;
  const before=f.params.state.snapshot;await f.ids.get('swap-pair').emit('click');const after=f.params.state.snapshot;
  assert.deepEqual(after.pair.map(e=>e.id),before.pair.map(e=>e.id).reverse());assert.equal(after.generation,before.generation+1);
  assert.equal(after.canVote,false);assert.equal(after.linked,true);assert.equal(f.ids.get('label-a').textContent,'Attempt A');assert.equal(f.ids.get('provenance').textContent,'');
  f.ready(0,before.generation);f.ready(1,before.generation);assert.equal(f.button('a').disabled,true);
  const second=await f.start();f.ready(0,after.generation);assert.equal(f.button('a').disabled,true);f.ready(1,after.generation);second.load.resolve([true,true]);await second.pending;
  await f.vote('b');assert.equal(f.ids.get('swap-pair').disabled,true);const voted=f.params.state.snapshot;
  await f.ids.get('swap-pair').emit('click');assert.equal(f.params.state.snapshot.generation,voted.generation);assert.equal(f.params.state.snapshot.choice,'b');
  assert.equal(f.button('b').getAttribute('aria-pressed'),'true');assert.equal(f.ids.get('choice-status').focusCount,1);
});
test('unknown prompt and a single admitted attempt cannot create a substituted pair',async()=>{
  for(const options of [{requested:'03'},{oneEntry:true}]){
    const f=await fixture(options);assert.equal(f.creates,0);assert.equal(f.ids.get('load-pair').disabled,true);assert.equal(f.ids.get('swap-pair').disabled,true);assert.equal(f.button('a').disabled,true);
  }
});
test('failed import reports neutral accessible status without leaking a submitted identity',async()=>{
  const f=await fixture(),first=await f.start();assert.equal(f.ids.get('surface-a').getAttribute('aria-busy'),'true');
  f.ready(0);f.status(1,'error','Secret two mesh in ./entries/two.glb failed');first.load.resolve([true,false]);await first.pending;
  assert.equal(f.button('a').disabled,true);assert.equal(f.ids.get('surface-b').getAttribute('aria-busy'),'false');
  assert.doesNotMatch(f.ids.get('message-b').textContent,/Secret|two\.glb/);assert.equal(f.ids.get('reveal').hidden,true);
  const retry=await f.start();f.ready(0);f.ready(1);retry.load.resolve([true,true]);await retry.pending;assert.equal(f.button('a').disabled,false);
});
test('callbacks from a disposed viewer cannot unlock or fail its replacement',async()=>{
  const f=await fixture(),first=await f.start(),old=f.params;
  old.onFailure('Context lost');first.load.resolve([false,false]);await first.pending;
  const next=await f.start();old.onStatus(0,'ready','old ready');old.onStatus(1,'ready','old ready');old.onFailure('old failure');
  assert.equal(f.button('a').disabled,true);assert.equal(f.creates,2);
  f.ready(0);f.ready(1);next.load.resolve([true,true]);await next.pending;assert.equal(f.button('a').disabled,false);
});
test('side and above presets remain linked, and Escape restores both panes without changing the pair',async()=>{
  const f=await fixture(),first=await f.start();f.ready(0);f.ready(1);first.load.resolve([true,true]);await first.pending;
  const before=f.params.state.snapshot.generation;
  await f.elements.find(el=>el.dataset.side==='0'&&el.dataset.view==='side').emit('click');assert.equal(f.params.state.snapshot.cameras[0].yaw,Math.PI/2);assert.deepEqual(f.params.state.snapshot.cameras[0],f.params.state.snapshot.cameras[1]);
  await f.elements.find(el=>el.dataset.side==='1'&&el.dataset.view==='top').emit('click');assert.equal(f.params.state.snapshot.cameras[0].pitch,1.35);
  await f.elements.find(el=>(el.attrs.class||'')==='focus-pane'&&el.dataset.side==='0').emit('click');
  assert.equal(f.ids.get('stages').classList.contains('is-expanded'),true);await f.ids.get('surface-a').emit('keydown',{key:'Escape'});
  assert.equal(f.ids.get('stages').classList.contains('is-expanded'),false);assert.ok(f.elements.filter(el=>(el.attrs.class||'')==='pane').every(el=>!el.hidden));
  assert.equal(f.params.state.snapshot.generation,before);assert.equal(f.params.state.snapshot.canVote,true);
});
