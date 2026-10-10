// CPU-only production modules with host DOM/history/storage fixtures. No entrant executes.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {screenFixture,memoryStorage,moduleIn} from './verify-walkable-lab-fixture.mjs';
const entry=(id,promptId,model,availability='ready')=>({id,promptId,comparisonModel:model,requestedConfiguration:model,title:'Scene '+id,htmlSha256:'a'.repeat(64),availability});
const catalog={prompts:[{id:'01',title:'First'},{id:'02',title:'One model'},{id:'03',title:'Third'}],entries:[entry('a','01','m0'),entry('b','01','m1'),entry('c','01','m2'),entry('bad','01','m3','failed'),entry('d','02','m0'),entry('e','02','m0'),entry('f','03','m0'),entry('g','03','m1','unverified')]};
const copied=value=>JSON.parse(JSON.stringify(value));
const pair=f=>copied(f.history.state.labPairOrder);

test('fresh initial selection uses the Next picker immediately, eligible prompts/models and randomized sides',async()=>{
  const draws=[.99,0,0,.99,0,0,0,0],f=await screenFixture({catalog,random:()=>draws.shift()});
  assert.equal(f.history.state.labPrompt,'03');assert.deepEqual(pair(f),['g','f']);assert.equal(f.byId('screen-prompt').value,'03');
  assert.deepEqual(f.images.map(image=>new URL(image.url).pathname.split('/').at(-2)),['g','f']);assert.deepEqual(f.assigned,[]);
  const oldId=f.history.state.labComparison.comparisonId;f.byId('screen-next').listeners.click();
  assert.equal(f.history.state.labPrompt,'01');assert.deepEqual(pair(f),['a','b']);assert.notEqual(f.history.state.labComparison.comparisonId,oldId);
  assert.equal(draws.length,0);assert.deepEqual(JSON.parse(f.storage.get('lab.walkable3d.judgments.v1')).preferences,{});
  for(const value of [0,.3,.7,.999]){
    const sample=await screenFixture({catalog,random:()=>value}),ids=pair(sample),entries=ids.map(id=>catalog.entries.find(e=>e.id===id));
    assert.notEqual(sample.history.state.labPrompt,'02');assert.equal(entries.length,2);assert.ok(entries.every(e=>e.availability!=='failed'));
    assert.notEqual(entries[0].comparisonModel,entries[1].comparisonModel);assert.equal(entries[0].promptId,entries[1].promptId);
  }
});

test('explicit prompt/entry links and restored comparisons are deterministic and launch no scene',async()=>{
  const noRandom=()=>{throw Error('Deep links must not shuffle');};
  for(const [query,prompt,ids] of [['?prompt=01','01',['a','b']],['?entry=c','01',['a','c']],['?entry=g&prompt=01','03',['f','g']]]){
    const f=await screenFixture({catalog,href:'https://example.test/lab/lab-space/'+query,random:noRandom});
    assert.equal(f.history.state.labPrompt,prompt);assert.deepEqual(pair(f),ids);assert.deepEqual(f.opened,[]);
  }
  const initial=await screenFixture({catalog,random:()=>.99});
  const restored=await screenFixture({catalog,state:copied(initial.history.state),href:initial.location.href,random:noRandom});
  assert.deepEqual(pair(restored),pair(initial));assert.equal(restored.history.state.labComparison.comparisonId,initial.history.state.labComparison.comparisonId);
  const standalone=readFileSync(new URL('../walkable-3d/assets/benchmark.js',import.meta.url),'utf8');
  assert.match(standalone,/!params.has\('entry'\)&&!params.has\('prompt'\)\?initialComparison/);
  assert.match(standalone,/selectPrompt\(initial\?\.promptId\|\|requestedEntry\?\.promptId\|\|params.get\('prompt'\)\|\|'01',requestedEntry\?\.id,initial\?\.entries\)/);
});

test('homepage initial prompt bypasses remembered comparison for this visit without changing saved judgments or Next randomization',async()=>{
  const record={version:1,grades:{g:{notes:'Keep private'}},preferences:{'f::g':{choice:'g'}},opened:{f:'earlier'}};
  const storage=new Map([['lab.walkable3d.judgments.v1',JSON.stringify(record)]]);
  const remembered=await screenFixture({catalog,random:()=>.99});
  let randomCalls=0;const f=await screenFixture({catalog,initialPrompt:'01',state:copied(remembered.history.state),href:'https://example.test/lab/lab-space/?prompt=03',storage,random:()=>{randomCalls++;return .99;}});
  assert.equal(f.history.state.labPrompt,'01');assert.deepEqual(pair(f),['a','b']);assert.equal(f.api.ready,true);assert.equal(randomCalls,0);
  assert.ok(f.choices.every(button=>button.disabled));assert.deepEqual(JSON.parse(storage.get('lab.walkable3d.judgments.v1')),record);assert.deepEqual(f.assigned,[]);
  f.byId('screen-next').listeners.click();assert.ok(randomCalls>0);assert.equal(f.history.state.labPrompt,'03');assert.ok(f.choices.every(button=>button.disabled));
  assert.deepEqual(JSON.parse(storage.get('lab.walkable3d.judgments.v1')),record);
});

test('homepage board readiness waits for both initial preview requests to settle; direct entry and declared placeholders stay usable',async()=>{
  const f=await screenFixture({initialPrompt:'01',pendingImage:true});assert.equal(f.api.ready,false);assert.equal(f.images.length,2);
  f.images[0].complete=true;f.images[0].onload();assert.equal(f.api.ready,false);
  f.images[1].complete=true;f.images[1].naturalWidth=0;f.images[1].onerror();assert.equal(f.api.ready,true);
  const direct=await screenFixture({pendingImage:true});assert.equal(direct.api.ready,true);
  const placeholder=await screenFixture({initialPrompt:'01',placeholder:true});assert.equal(placeholder.api.ready,true);assert.equal(placeholder.images.length,0);
});

test('board and native scene clicks leave in the same tab once and preserve comparison/position',async()=>{
  const f=await screenFixture({catalog});f.byId('screen-controls').listeners.click();
  f.api.activate({x:100,y:200});f.byId('screen-cards').children[1].children[0].listeners.click();f.api.activate({x:800,y:200});f.byId('screen-next').listeners.click();
  assert.equal(f.assigned.length,1);assert.equal(f.departures,1);assert.equal(f.resumes,0);assert.deepEqual(pair(f),['a','b']);
  assert.equal(new URL(f.assigned[0]).pathname,'/lab/walkable-3d/scene.html');assert.equal(new URL(f.assigned[0]).searchParams.get('entry'),'a');
  await f.returnVisit();assert.ok(f.byId('comparison-dialog').open);assert.ok(f.choices.every(b=>b.disabled));
  f.byId('screen-cards').children[1].children[0].listeners.click();assert.equal(f.assigned.length,2);
  const {visit}=await f.sceneVisit({ready:true});assert.deepEqual(copied(visit.labState.labPosition),{x:1,z:2,yaw:.3,pitch:.1});assert.equal(visit.modelLabel,'Model hidden until reveal');
});

test('return receipts unlock voting only after both current entries are ready; Next resets it',async()=>{
  const storage=new Map([['lab.walkable3d.judgments.v1',JSON.stringify({version:1,grades:{a:{notes:'Keep private'}},preferences:{'c::f':{choice:'tie'}},opened:{a:'old',b:'old'}})]]);
  const f=await screenFixture({catalog,storage});assert.ok(f.choices.every(b=>b.disabled));
  await f.choices[0].listeners.click();assert.equal(JSON.parse(storage.get('lab.walkable3d.judgments.v1')).preferences['a::b'],undefined);
  f.api.activate({x:100,y:200});await f.ready();assert.ok(f.choices.every(b=>b.disabled));
  f.byId('comparison-dialog').close();f.api.activate({x:800,y:200});
  await f.sceneVisit({ready:true});
  let randomCalls=0;
  const restored=await screenFixture({catalog,state:copied(f.history.state),href:f.location.href,session:f.session,storage,random:()=>{randomCalls++;return 0;}});
  assert.deepEqual(pair(restored),['a','b']);assert.ok(restored.choices.every(b=>!b.disabled));
  await restored.choices[1].listeners.click();assert.equal(restored.byId('screen-reveal').hidden,false);assert.deepEqual(pair(restored),['a','b']);
  restored.byId('screen-cards').children[0].children[0].listeners.click();await restored.ready();assert.equal(restored.byId('screen-reveal').hidden,false);
  assert.equal(randomCalls,0);restored.byId('screen-next').listeners.click();assert.ok(randomCalls>0);assert.ok(restored.choices.every(b=>b.disabled));assert.equal(restored.byId('screen-reveal').hidden,true);
  const record=JSON.parse(storage.get('lab.walkable3d.judgments.v1'));assert.equal(record.preferences['a::b'].choice,'b');assert.deepEqual(record.preferences['c::f'],{choice:'tie'});assert.deepEqual(record.grades,{a:{notes:'Keep private'}});
});

test('fallback return restores exact sides and comparison, failed/old receipts cannot unlock another pair',async()=>{
  const f=await screenFixture({catalog});f.api.activate({x:100,y:200});const {nav,visit}=await f.sceneVisit({ready:true});
  const fallback=await screenFixture({catalog,session:f.session,storage:f.storage,href:nav.returnUrl(visit)});
  assert.deepEqual(pair(fallback),['a','b']);assert.deepEqual(copied(fallback.history.state.labPosition),{x:1,z:2,yaw:.3,pitch:.1});assert.ok(fallback.choices.every(b=>b.disabled));
  assert.deepEqual(copied(fallback.history.state.labComparison.opened),['a']);assert.equal(new URL(fallback.location.href).searchParams.has('return'),false);
  const fresh=await screenFixture({catalog});fresh.api.activate({x:100,y:200});await fresh.sceneVisit({ready:true});
  const differentState=copied(fresh.history.state);differentState.labComparison.comparisonId='new-comparison';differentState.labComparison.opened=[];
  const other=await screenFixture({catalog,state:differentState,session:fresh.session,storage:fresh.storage,href:fresh.location.href});
  assert.deepEqual(copied(other.history.state.labComparison.opened),[]);assert.ok(other.choices.every(b=>b.disabled));
  const failed=await screenFixture({catalog});failed.api.activate({x:100,y:200});await failed.returnVisit({ready:false});assert.deepEqual(copied(failed.history.state.labComparison.opened),[]);
});

test('storage-disabled navigation remains usable and leaves voting locked',async()=>{
  const f=await screenFixture({catalog,storageDisabled:true});f.api.activate({x:100,y:200});assert.equal(f.assigned.length,1);
  await f.returnVisit();assert.deepEqual(pair(f),['a','b']);assert.ok(f.choices.every(b=>b.disabled));
});

async function sceneFixture({href,session=new Map(),state={},length=2,data=catalog,referrer=''}={}) {
  const elements=new Map(),opened=[],assigned=[];let options,back=0;
  const byId=id=>{if(!elements.has(id))elements.set(id,{listeners:{},disabled:true,addEventListener(type,fn){this.listeners[type]=fn;}});return elements.get(id);};
  const context=vm.createContext({URL,URLSearchParams,sessionStorage:memoryStorage(session),localStorage:memoryStorage(new Map()),
    location:{href,search:new URL(href).search,assign:url=>assigned.push(url)},history:{state,length,back(){back++;}},document:{getElementById:byId,referrer},
    fetch:async()=>({ok:true,json:async()=>data})});
  const synthetic=values=>new vm.SyntheticModule(Object.keys(values),function(){for(const [key,value]of Object.entries(values))this.setExport(key,value);},{context});
  const nav=await moduleIn(context,'walkable-3d/assets/scene-navigation.js'),comparisons=await moduleIn(context,'walkable-3d/assets/comparisons.js'),module=await moduleIn(context,'walkable-3d/assets/scene.js');
  await module.link(path=>path.endsWith('scene-navigation.js')?nav:path.endsWith('comparisons.js')?comparisons:path.endsWith('viewer.js')?synthetic({createViewer(config){options=config;return {isOpen:false,open:entry=>opened.push(entry.id),destroy(){}};}}):synthetic({createGradeForm(){}}));
  await module.evaluate();await new Promise(resolve=>setImmediate(resolve));
  return {byId,opened,assigned,options,get back(){return back;}};
}

test('scene handoff starts once, ready credits the visit, exit goes Back; reload/Forward/deep links stay static',async()=>{
  const lab=await screenFixture({catalog});lab.api.activate({x:100,y:200});
  const f=await sceneFixture({href:lab.assigned[0],session:lab.session});assert.deepEqual(f.opened,['a']);assert.match(f.options.gradeLabelFor(catalog.entries[0]),/A.*Model hidden/);
  f.options.onReady(catalog.entries[0]);f.options.onExit();assert.equal(f.back,1);assert.deepEqual(f.assigned,[]);
  const reloaded=await sceneFixture({href:lab.assigned[0],session:lab.session});assert.deepEqual(reloaded.opened,[]);reloaded.byId('open-scene').listeners.click();assert.deepEqual(reloaded.opened,['a']);
  await lab.returnVisit();
  const forward=await sceneFixture({href:lab.assigned[0],session:lab.session});assert.deepEqual(forward.opened,[]);
  const direct=await sceneFixture({href:'https://example.test/lab/walkable-3d/scene.html?entry=g'});assert.deepEqual(direct.opened,[]);direct.byId('open-scene').listeners.click();assert.deepEqual(direct.opened,['g']);
  direct.options.onExit();assert.deepEqual(direct.assigned,['https://example.test/lab/lab-space/']);
  const blockedStorage=await sceneFixture({href:lab.assigned[0],referrer:lab.location.href});assert.deepEqual(blockedStorage.opened,[]);blockedStorage.options.onExit();assert.equal(blockedStorage.back,1);
  for(const id of ['bad','../evil','unknown']){const unavailable=await sceneFixture({href:'https://example.test/lab/walkable-3d/scene.html?entry='+encodeURIComponent(id)});assert.ok(unavailable.byId('open-scene').disabled);assert.deepEqual(unavailable.opened,[]);}
});

test('untrusted visit tokens and external return destinations cannot autostart or navigate away',async()=>{
  const lab=await screenFixture({catalog});lab.api.activate({x:100,y:200});
  const key='lab.walkable3d.scene-visit.v1',record=JSON.parse(lab.session.get(key));record.returnUrl='https://evil.test/';lab.session.set(key,JSON.stringify(record));
  const f=await sceneFixture({href:lab.assigned[0],session:lab.session});assert.deepEqual(f.opened,[]);f.options.onExit();assert.deepEqual(f.assigned,['https://example.test/lab/lab-space/']);
  const wrong=await sceneFixture({href:lab.assigned[0].replace('entry=a','entry=b'),session:lab.session});assert.deepEqual(wrong.opened,[]);
});

test('shared viewer invokes navigation only for explicit exit, preserving legacy close behavior',async()=>{
  const nodes=new Map(),events=new Map();let exits=0,back=0;
  const node=selector=>{if(selector==='#scene-mount iframe')return null;if(!nodes.has(selector))nodes.set(selector,{open:false,disabled:false,listeners:{},close(){this.open=false;},replaceChildren(){},addEventListener(type,fn){this.listeners[type]=fn;}});return nodes.get(selector);};
  const context=vm.createContext({URL,clearTimeout,document:{querySelector:node,createElement(){},addEventListener(type,fn){events.set(type,fn);}},history:{state:{walkableScene:'a'},back(){back++;}},addEventListener(type,fn){events.set(type,fn);},location:{hash:''}});
  const module=await moduleIn(context,'walkable-3d/assets/viewer.js');await module.link(()=>{});await module.evaluate();
  const viewer=module.namespace.createViewer({onExit(){exits++;}});viewer.close(false);assert.equal(exits,0);viewer.close();assert.equal(exits,1);assert.equal(back,0);
  events.get('pagehide')();assert.equal(exits,1);
  const legacy=module.namespace.createViewer();legacy.close();assert.equal(back,1);
});

test('scene document contains no Lab canvas/module; Lab departure disposes its renderer',()=>{
  const html=readFileSync(new URL('../walkable-3d/scene.html',import.meta.url),'utf8'),lab=readFileSync(new URL('../lab-space/index.html',import.meta.url),'utf8'),space=readFileSync(new URL('../lab-space/assets/space.js',import.meta.url),'utf8');
  assert.doesNotMatch(html,/space\.js|room\.mjs|<canvas/);assert.match(html,/assets\/scene.js/);assert.match(html,/assets\/judgments.css/);assert.doesNotMatch(lab,/<dialog id="viewer"/);
  assert.match(space,/depart\(\)\{[^}]*preservePosition\(\);roomRequest\+\+;engine\?\.dispose\(\);engine=null/);
});

test('missing scene storage uses Back only for exact same-origin canonical or index Lab referrers, including queries',async()=>{
  const href='https://example.test/lab/walkable-3d/scene.html?entry=a&visit=missing';
  const refs=[
    'https://example.test/lab/lab-space/',
    'https://example.test/lab/lab-space/?prompt=01&labqa=1',
    'https://example.test/lab/lab-space/?prompt=01#comparison',
    'https://example.test/lab/lab-space/index.html',
    'https://example.test/lab/lab-space/index.html?prompt=03&entry=g',
    'https://example.test/lab/lab-space/index.html?prompt=03#comparison',
  ];
  for(const referrer of refs){
    for(const exit of ['viewer','return-link']){
      const f=await sceneFixture({href,referrer,session:new Map(),length:2});
      assert.deepEqual(f.opened,[],'A referrer does not replace the missing one-shot autostart token.');
      assert.equal(f.byId('return-comparison').href,'https://example.test/lab/lab-space/');
      f.options.onReady(catalog.entries[0]);
      if(exit==='viewer')f.options.onExit();
      else {let prevented=false;f.byId('return-comparison').listeners.click({preventDefault(){prevented=true;}});assert.equal(prevented,true);}
      assert.equal(f.back,1,referrer+' should return to its existing Lab history entry.');assert.deepEqual(f.assigned,[]);
    }
  }
});

test('same-origin Lab referrers without a preceding history entry use the canonical safe return instead of Back',async()=>{
  for(const referrer of ['https://example.test/lab/lab-space/?prompt=03','https://example.test/lab/lab-space/index.html?prompt=01']){
    const f=await sceneFixture({href:'https://example.test/lab/walkable-3d/scene.html?entry=a',referrer,length:1});
    assert.deepEqual(f.opened,[]);f.options.onExit();assert.equal(f.back,0);assert.deepEqual(f.assigned,['https://example.test/lab/lab-space/']);
    assert.equal(new URL(f.assigned[0]).search,'','Missing storage cannot invent a comparison receipt.');
  }
});

test('external, malformed and near-alias Lab referrers cannot redirect history Back',async()=>{
  for(const referrer of [
    '', 'not a URL',
    'https://evil.test/lab/lab-space/','https://evil.test/lab/lab-space/index.html?prompt=01',
    'http://example.test/lab/lab-space/','https://example.test:444/lab/lab-space/',
    'https://example.test.evil.test/lab/lab-space/',
    'https://example.test/lab/lab-space','https://example.test/lab/lab-space-old/',
    'https://example.test/lab/lab-space//','https://example.test/lab/lab-space/index.htm',
    'https://example.test/lab/lab-space/index.html/','https://example.test/lab/lab-space/%69ndex.html',
    'https://example.test/lab/Lab-space/','https://example.test/lab/walkable-3d/',
    'https://example.test/elsewhere/?return=https://example.test/lab/lab-space/',
  ]){
    const f=await sceneFixture({href:'https://example.test/lab/walkable-3d/scene.html?entry=a&visit=missing',referrer,length:20});
    assert.deepEqual(f.opened,[]);f.options.onExit();assert.equal(f.back,0,referrer+' must not authorize history traversal.');
    assert.deepEqual(f.assigned,['https://example.test/lab/lab-space/']);
  }
});

test('missing-storage Back preserves exact comparison history and cannot credit a viewed scene or unlock its gate',async()=>{
  const record={version:1,grades:{g:{notes:'Preserved fixture note'}},preferences:{'f::g':{choice:'tie'}},opened:{a:'old'}};
  for(const href of ['https://example.test/lab/lab-space/?prompt=01','https://example.test/lab/lab-space/index.html?prompt=01']){
    const storage=new Map([['lab.walkable3d.judgments.v1',JSON.stringify(record)]]),lab=await screenFixture({catalog,href,storage});
    const initial=copied(lab.history.state),expectedPair=pair(lab);lab.api.activate({x:100,y:200});
    const preserved=copied(lab.history.state);lab.session.clear();
    const scene=await sceneFixture({href:lab.assigned[0],session:lab.session,referrer:href,state:{},length:2});
    assert.deepEqual(scene.opened,[]);scene.options.onReady(catalog.entries[0]);scene.options.onExit();assert.equal(scene.back,1);assert.deepEqual(scene.assigned,[]);
    await lab.returnVisit({ready:true});
    assert.deepEqual(pair(lab),expectedPair);assert.equal(lab.history.state.labComparison.comparisonId,initial.labComparison.comparisonId);
    assert.deepEqual(copied(lab.history.state.labComparison.opened),[]);assert.ok(lab.choices.every(button=>button.disabled));
    assert.deepEqual(copied(lab.history.state.labPosition),preserved.labPosition);assert.equal(lab.byId('screen-reveal').hidden,true);
    assert.deepEqual(JSON.parse(storage.get('lab.walkable3d.judgments.v1')),record,'Missing receipt must preserve judgments and cannot invent readiness credit.');
  }
});

test('canonical and index query launches return through actual ready receipts with exact sides and both-viewed gates',async()=>{
  for(const href of ['https://example.test/lab/lab-space/?prompt=03','https://example.test/lab/lab-space/index.html?prompt=03']){
    const lab=await screenFixture({catalog,href,random:()=>{throw Error('Explicit prompt and Back must not choose a new pair.');}});
    const initial=copied(lab.history.state),ids=pair(lab);assert.deepEqual(ids,['f','g']);
    for(let slot=0;slot<2;slot++){
      lab.api.activate({x:slot?800:100,y:200});
      const scene=await sceneFixture({href:lab.assigned.at(-1),session:lab.session,referrer:href});
      assert.deepEqual(scene.opened,[ids[slot]]);scene.options.onReady(catalog.entries.find(entry=>entry.id===ids[slot]));scene.options.onExit();
      assert.equal(scene.back,1);assert.deepEqual(scene.assigned,[]);await lab.returnVisit();
      assert.deepEqual(pair(lab),ids);assert.equal(lab.history.state.labComparison.comparisonId,initial.labComparison.comparisonId);
      assert.deepEqual(copied(lab.history.state.labComparison.opened),ids.slice(0,slot+1));
      assert.ok(lab.choices.every(button=>button.disabled===(slot===0)));assert.equal(lab.byId('screen-reveal').hidden,true);
    }
    assert.deepEqual(JSON.parse(lab.storage.get('lab.walkable3d.judgments.v1')).preferences,{},'These route tests never submit a preference.');
  }
});
