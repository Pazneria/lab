import test from 'node:test';
import assert from 'node:assert/strict';
import {bootInspection} from '../assets/inspect.mjs';
import {publicReceipt} from '../assets/results.mjs';
test('rendered receipts omit local paths without changing stored records',()=>{
 const original='Checks in C:\\Users\\jmore\\run\\check.json and C:/Users/jmore/asset.glb passed.';
 assert.equal(publicReceipt(original),'Checks in [local path omitted] and [local path omitted] passed.');assert.match(original,/jmore/);
});
class Element{
 constructor(){this.events={};this.attrs={};this.disabled=false;this.hidden=false;this.value='';this.dataset={};}
 addEventListener(type,fn){(this.events[type]??=[]).push(fn);}
 async emit(type,extra={}){for(const fn of this.events[type]||[])await fn({target:this,preventDefault(){},...extra});}
 setAttribute(k,v){this.attrs[k]=v;}getAttribute(k){return this.attrs[k];}focus(){}setPointerCapture(){}
}
async function fixture({id='frozen',defer=false}={}){
 const ids=Object.fromEntries(['surface','stages','status','load','mode','light','grid','reset','title','model','disclosure','record','download'].map(id=>[id,new Element()]));
 ids.mode.value='pbr';ids.light.value='35';ids.grid.setAttribute('aria-pressed','true');
 const views=['front','side','back','top','face'].map(view=>Object.assign(new Element(),{dataset:{view}}));
 const document=Object.assign(new Element(),{hidden:false,getElementById:id=>ids[id],querySelectorAll:()=>views}),window=new Element(),calls=[],engines=[];
 const prompt={id:'01',sha256:'a'.repeat(64),title:'A character',text:'Exact brief'};
 const entry={id:'frozen',promptId:'01',promptSha256:prompt.sha256,votingAvailable:false,comparisonEligible:false,admission:{status:'pending',frozen:true,selfContained:true},asset:{path:'./entries/frozen.glb',sha256:'b'.repeat(64),byteLength:100},provenance:{modelLabel:'Requested model',limitations:['Known orientation defect']}};
 let release;const pending=new Promise(resolve=>release=resolve);
 const viewer={createViewer(options){const e={options,disposed:0,modes:[],lights:[],grids:[],async loadPair(pair,token){calls.push({pair,token});options.onStatus(0,'ready','Ready to inspect');return [true];},dispose(){this.disposed++;},invalidate(){},setMode(v){this.modes.push(v);},setLight(v){this.lights.push(v);},setGrid(v){this.grids.push(v);}};engines.push(e);return e;}};
 let imports=0,fetches=0;
 const app=await bootInspection({document,window,location:{href:'https://example.com/inspect.html?attempt='+id},fetch:async()=>{fetches++;return {ok:true,json:async()=>({version:1,prompts:[prompt],entries:[entry]})};},loadViewer:async()=>{imports++;return defer?pending:viewer;}});
 return {ids,document,window,views,app,calls,engines,release:()=>release(viewer),get imports(){return imports;},get fetches(){return fetches;}};
}
test('archive inspection is on demand, accepts frozen pending mappings, and has no vote state',async()=>{
 const f=await fixture();assert.equal(f.imports,0);assert.equal(f.fetches,1);assert.equal(f.ids.download.href,'./entries/frozen.glb');assert.match(f.ids.disclosure.textContent,/voting is unavailable/);
 await f.ids.load.emit('click');assert.equal(f.calls.length,1);assert.equal(f.calls[0].pair.length,1);assert.equal(f.engines[0].options.surfaces.length,1);assert.equal(f.app.state.snapshot.canVote,false);assert.equal(f.ids.mode.disabled,false);
 await f.views[2].emit('click');assert.equal(f.app.state.snapshot.cameras[0].yaw,Math.PI);
});
test('hidden and departing inspections dispose, retain matching controls on reload, and reject stale imports',async()=>{
 const f=await fixture();await f.app.load();f.ids.mode.value='clay';f.ids.light.value='-42';await f.ids.grid.emit('click');
 f.document.hidden=true;await f.document.emit('visibilitychange');assert.equal(f.engines[0].disposed,1);assert.equal(f.ids.mode.disabled,true);
 f.document.hidden=false;await f.app.load();assert.deepEqual(f.engines[1].modes,['clay']);assert.deepEqual(f.engines[1].lights,['-42']);assert.deepEqual(f.engines[1].grids,[false]);
 await f.window.emit('pagehide');assert.equal(f.engines[1].disposed,1);
 const g=await fixture({defer:true});const loading=g.app.load();g.document.hidden=true;await g.document.emit('visibilitychange');g.release();await loading;assert.equal(g.engines.length,0);
});
test('unknown attempt IDs show a fallback and never create a renderer',async()=>{
 const f=await fixture({id:'unknown'});await f.app.load();assert.equal(f.imports,0);assert.match(f.ids.status.textContent,/no available frozen GLB/);
});
