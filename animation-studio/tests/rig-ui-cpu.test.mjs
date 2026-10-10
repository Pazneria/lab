// Real app/evaluator and frozen GLBs; DOM/RAF and renderer are CPU fixtures.
// This is control-flow evidence, never graphics or visual acceptance.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {webcrypto} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../rig-review/source/',import.meta.url)),template=fs.readFileSync(path.join(root,'index.template.html'),'utf8'),html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const bundle=html.match(/<script id="bundle-data" type="application\/json">([\s\S]*?)<\/script>/)[1];
class Element{
 constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.style={};this.dataset={};this.attrs={};this.listeners=new Map();this.value='';this.checked=false;this.disabled=false;this.hidden=false;this.textContent='';this.clientWidth=820;this.clientHeight=520;this.width=820;this.height=520;}
 append(...nodes){for(const node of nodes){node.parentElement=this;this.children.push(node);}}
 replaceChildren(...nodes){this.children=[];this.append(...nodes);}
 get options(){return this.children.flatMap(c=>c.tagName==='OPTGROUP'?c.children:[c]);}
 remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(c=>c!==this);}
 setAttribute(k,v){this.attrs[k]=String(v);}getAttribute(k){return this.attrs[k];}
 addEventListener(type,fn){if(!this.listeners.has(type))this.listeners.set(type,[]);this.listeners.get(type).push(fn);}
 emit(type,event={}){return Promise.all((this.listeners.get(type)||[]).map(f=>f(event)));}
 setPointerCapture(){}getBoundingClientRect(){return {left:0,top:0,width:820,height:520};}click(){this.onclick?.();}
}
async function fixture(){
 const elements=new Map();for(const m of template.matchAll(/<([a-z0-9]+)\b([^>]*\bid="([^"]+)"[^>]*)>/gi)){const e=new Element(m[1]);e.id=m[3];e.checked=/\bchecked\b/.test(m[2]);e.hidden=/\bhidden\b/.test(m[2]);e.value=m[2].match(/\bvalue="([^"]*)"/)?.[1]||'';elements.set(e.id,e);}
 elements.get('bundle-data').textContent=bundle;elements.get('compare').value='off';elements.get('speed').value='1';elements.get('notes').value='';
 let focused=true,next=1,time=0;const frames=new Map(),renderers=[],document=new Element(),window=new Element();document.hidden=false;document.activeElement=null;document.hasFocus=()=>focused;document.getElementById=id=>{assert.ok(elements.has(id),'Missing UI '+id);return elements.get(id);};document.createElement=tag=>new Element(tag);
 const cameras=['front','side','rear','three'].map(camera=>{const e=new Element('button');e.dataset.camera=camera;return e;});
 document.querySelectorAll=selector=>selector==='[data-camera]'?cameras:selector==='.editgrid input'?['posX','posY','posZ','rotX','rotY','rotZ','scaleX','scaleY','scaleZ'].map(id=>elements.get(id)):[];
 class Renderer{constructor(canvas){this.canvas=canvas;this.frames=0;this.destroyed=false;this.gl={getError:()=>0};renderers.push(this);}draw(value){assert.equal(this.destroyed,false);this.value=value;this.frames++;return 0;}destroy(){this.destroyed=true;}}
 const context=vm.createContext({document,window,crypto:webcrypto,console,TextDecoder,TextEncoder,Blob,URL,structuredClone,atob:s=>Buffer.from(s,'base64').toString('binary'),performance:{now:()=>time},requestAnimationFrame:fn=>{const id=next++;frames.set(id,fn);return id;},cancelAnimationFrame:id=>frames.delete(id),ResizeObserver:class{observe(){}},setTimeout,clearTimeout});
 const modules=new Map();async function module(name){if(modules.has(name))return modules.get(name);if(name==='renderer.mjs'){const m=new vm.SyntheticModule(['StudioRenderer'],function(){this.setExport('StudioRenderer',Renderer);},{context,identifier:name});modules.set(name,m);return m;}const m=new vm.SourceTextModule(fs.readFileSync(path.join(root,name),'utf8'),{context,identifier:name});modules.set(name,m);await m.link(spec=>module(path.basename(spec)));return m;}
 const m=await module('app.mjs');await m.evaluate();await window.rigInspectorReady;assert.ok(window.rigInspectorDiagnostics,elements.get('error').textContent);const api=window.rigStudioControl;
 const flush=(limit=10)=>{let count=0;while(frames.size&&count++<limit){time+=34;const pending=[...frames.values()];frames.clear();for(const f of pending)f(time);}};flush();
 return {window,document,api,el:id=>elements.get(id),get state(){return window.rigInspectorDiagnostics.state;},get last(){return renderers.at(-1);},renderers,frames,flush,setFocus:value=>focused=value};
}
test('real app initializes original Human01 paused with actual tree and delivered clips',async()=>{
 const f=await fixture();assert.equal(f.state.asset,'human01');assert.equal(f.state.nodeCount,28);assert.deepEqual(Array.from(f.state.paletteCounts),[20]);assert.equal(f.state.playing,false);assert.equal(f.frames.size,0);assert.equal(f.el('tree').children.length,28);assert.ok(f.state.clips.some(c=>c.name==='walk_original'&&c.classification==='prior-original'));assert.equal(f.el('selectedName').textContent,'pelvis');
});
test('all 25 eligible ordinary selections load atomically with opt-in, keep statuses and bound the prepared cache',async()=>{
 const f=await fixture(),data=JSON.parse(bundle);f.el('reviewOptIn').checked=true;f.el('reviewOptIn').onchange();for(const r of data.records.filter(r=>r.activeBindingAllowed!==false||r.requiresReviewOptIn)){await f.api.selectAsset(r.id);f.flush();assert.equal(f.state.hash,r.sha256);assert.equal(f.state.asset,r.id);assert.ok(f.state.cachedModels<=6);assert.ok(f.last.value.views[0].geometry.length);assert.equal(f.state.playing,false);}assert.equal(f.el('error').textContent,'');
});
test('selected real joint weights and independent socket/mesh overlays share the same evaluated pose',async()=>{
 const f=await fixture(),baseColors=Array.from(f.last.value.views[0].geometry[0].colors);f.el('tree').children.find(e=>e.textContent.startsWith('10 ')).click();f.el('weights').checked=true;f.el('weights').onchange();f.flush();assert.equal(f.state.selectedNode,10);assert.ok(f.el('nodeInfo').textContent.includes('thigh_right'));const weighted=Array.from(f.last.value.views[0].geometry[0].colors);assert.ok(weighted.some((v,i)=>v!==baseColors[i]));assert.ok(weighted.every(Number.isFinite));assert.ok(new Set(weighted.map(v=>v.toFixed(3))).size>5,'selected skin weights have a range of colors');
 f.el('mesh').checked=false;f.el('mesh').onchange();f.flush();assert.equal(f.last.value.views[0].geometry.length,0);assert.ok(f.last.value.views[0].overlay.dots.joint.length);f.el('skeleton').checked=false;f.el('skeleton').onchange();f.flush();assert.equal(f.last.value.views[0].overlay.dots.joint.length,0);assert.ok(f.last.value.views[0].overlay.dots.socket.length);
});
test('mapped giant contacts use actual posed points while human reference controls stay disabled',async()=>{
 const f=await fixture();f.el('reviewOptIn').checked=true;f.el('reviewOptIn').onchange();await f.api.selectAsset('hill_giant_heath_01');assert.equal(f.state.family,'biped_hill_giant');assert.equal(f.state.modelGroup,'Proposed - awaiting acceptance');assert.equal(f.el('travelProof').disabled,true);assert.equal(f.el('loadMotion').disabled,true);f.el('familyContacts').checked=true;f.el('familyContacts').onchange();f.flush();const c=f.last.value.views[0].familyContacts;assert.equal(c.length,2);assert.equal(c[0].points.length,12);assert.equal(c[1].points.length,12);assert.equal(c[0].supportSchedule,null);assert.equal(f.el('familyContacts').disabled,false);
});
test('rest-only and delivered diagnostic selection pause/scrub/step without inventing locomotion',async()=>{
 const f=await fixture();await f.api.selectAsset('skeleton');assert.ok(f.state.clips.every(c=>c.classification==='existing-diagnostic'));assert.equal(f.el('play').disabled,true);const c=f.state.clips[0];f.api.selectClip(c.id);f.api.seek(c.duration*.4);f.flush();assert.equal(f.state.clip,c.name);assert.equal(f.state.playing,false);assert.equal(f.el('play').disabled,false);const before=f.state.time;f.el('stepForward').click();assert.ok(Math.abs(f.state.time-before-1/30)<1e-8);f.el('play').click();f.flush(3);assert.equal(f.state.playing,true);f.el('rest').click();f.flush();assert.equal(f.state.clip,null);assert.equal(f.state.playing,false);assert.equal(f.el('play').disabled,true);
});
test('private notes survive model switches and failed source selection retains the previous ready model',async()=>{
 const f=await fixture();f.el('notes').value='Human thigh note';await f.api.selectAsset('skeleton');f.el('notes').value='Skull note';await f.api.selectAsset('human01');assert.equal(f.el('notes').value,'Human thigh note');await f.api.selectAsset('skeleton');assert.equal(f.el('notes').value,'Skull note');const before=f.state.hash;await f.api.selectAsset('not-a-source');assert.equal(f.state.hash,before);assert.ok(f.el('error').textContent.includes('previous asset retained'));
});
test('mode suspension frees the renderer and restores the same current model/pose without autoplay',async()=>{
 const f=await fixture(),clip=f.state.clips.find(c=>c.name==='walk_original');f.api.selectClip(clip.id);f.api.seek(.3);f.flush();const before=f.state;f.api.setActive(false);assert.equal(f.last.destroyed,true);assert.equal(f.state.rendererAlive,false);assert.equal(f.frames.size,0);f.api.setActive(true);f.flush();assert.equal(f.state.rendererAlive,true);assert.equal(f.state.asset,before.asset);assert.equal(f.state.time,.3);assert.equal(f.state.playing,false);assert.equal(f.frames.size,0);
});
test('blur/pagehide stop clocks; bfcache restores actual data and keeps playback paused',async()=>{
 const f=await fixture(),clip=f.state.clips.find(c=>c.name==='walk_original');f.api.selectClip(clip.id);f.el('play').click();f.flush(2);f.setFocus(false);await f.window.emit('blur');assert.equal(f.state.playing,false);assert.equal(f.frames.size,0);f.setFocus(true);await f.window.emit('focus');f.flush();const before=f.state.time;await f.window.emit('pagehide');assert.equal(f.state.rendererAlive,false);assert.equal(f.frames.size,0);await f.window.emit('pageshow',{persisted:true});f.flush();assert.equal(f.state.rendererAlive,true);assert.equal(f.state.time,before);assert.equal(f.state.playing,false);assert.equal(f.frames.size,0);
});
test('human candidate comparison remains explicit and paired to the same pinned original motion',async()=>{
 const f=await fixture(),c=f.state.clips.find(c=>c.name==='walk_original');f.el('reviewOptIn').checked=true;f.el('reviewOptIn').onchange();f.api.selectClip(c.id);f.api.seek(.9612);f.el('compare').value='candidate';f.el('compare').onchange();f.flush();assert.equal(f.state.asset,'human01');assert.equal(f.last.value.views.length,2);assert.ok(f.last.value.views[0].caption.startsWith('Frozen original'));assert.ok(f.last.value.views[1].caption.startsWith('PROPOSED skin candidate'));assert.equal(f.state.classification,'prior-original');
});


test('malformed and oversized private imports retain the ready model and notes',async()=>{const f=await fixture();f.el('notes').value='preserved';const before=f.state.hash;for(const file of [{name:'broken.glb',size:4,arrayBuffer:async()=>new Uint8Array([1,2,3,4]).buffer},{name:'oversized.glb',size:65*1024*1024,arrayBuffer:async()=>{throw Error('oversized file must not be read');}}]){f.el('assetFile').files=[file];await f.el('assetFile').onchange();assert.equal(f.state.hash,before);assert.equal(f.el('notes').value,'preserved');assert.equal(f.el('assetFile').value,'');assert.ok(f.el('error').textContent.includes('previous asset retained'));}});
test('unknown clip selection cannot discard a ready sampled pose',async()=>{const f=await fixture(),c=f.state.clips.find(c=>c.name==='walk_original');f.api.selectClip(c.id);f.api.seek(.3);const before=f.state;f.api.selectClip('not-delivered');assert.equal(f.state.clip,before.clip);assert.equal(f.state.time,before.time);assert.ok(f.el('error').textContent.includes('previous pose retained'));});


test('held originals reject before loading even with candidate opt-in',async()=>{const f=await fixture();for(const enabled of [false,true]){f.el('reviewOptIn').checked=enabled;f.el('reviewOptIn').onchange();for(const id of ['ashgrove_wolf_01','bear_woodland_01']){const before=f.state;await f.api.selectAsset(id);assert.equal(f.state.hash,before.hash);assert.equal(f.state.cachedModels,before.cachedModels);assert.ok(f.el('error').textContent.includes('Source is on hold'));assert.equal(f.el('asset').options.find(o=>o.value===id).disabled,true);}}});
test('proposed selection and comparison require opt-in, and revoking it restores original Human',async()=>{const f=await fixture();assert.equal(f.state.candidateReviewOptIn,false);assert.equal(f.el('candidateOption').disabled,true);await f.api.selectAsset('dog_bracken_town_01');assert.equal(f.state.asset,'human01');assert.ok(f.el('error').textContent.includes('opt-in'));f.el('reviewOptIn').checked=true;f.el('reviewOptIn').onchange();await f.api.selectAsset('human01_skin_candidate_v1');assert.equal(f.state.asset,'human01_skin_candidate_v1');f.el('reviewOptIn').checked=false;f.el('reviewOptIn').onchange();f.flush();assert.equal(f.state.asset,'human01');assert.equal(f.state.comparison,'off');assert.equal(f.state.playing,false);assert.equal(f.el('candidateOption').disabled,true);});
test('delivered scorpion static diagnostics are available with no invented clip playback',async()=>{const f=await fixture();f.el('reviewOptIn').checked=true;f.el('reviewOptIn').onchange();await f.api.selectAsset('scorpion_scree_01');assert.equal(f.state.clips.length,0);assert.ok(f.el('clip').options.some(o=>o.value==='static:tail_lateral'));f.api.selectClip('static:tail_lateral');f.flush();assert.equal(f.state.clip,null);assert.equal(f.state.time,0);assert.equal(f.el('play').disabled,true);assert.ok(f.el('clipInfo').textContent.includes('Static diagnostic'));assert.ok(f.last.value.views[0].pose.nodes.some(n=>Math.abs(n.rotation[1])>.01));});
