// Actual host comparison/navigation modules with inert DOM/storage/scene receipts.
// No public write, browser, renderer, server or benchmark entrant executes.
import test from 'node:test';
import assert from 'node:assert/strict';
import {screenFixture} from './verify-walkable-lab-fixture.mjs';
import {exhibits,roomLayoutVersion,walkable} from '../lab-space/assets/production-navigation.mjs';

const copy=value=>JSON.parse(JSON.stringify(value));
const pose={...exhibits.worlds.approach,crouch:false};
const pair=f=>copy(f.history.state.labPairOrder);
const votes=f=>JSON.parse(f.storage.get('lab.walkable3d.judgments.v1'));

for(const path of ['/lab/lab-space/','/lab/lab-space/index.html'])test(`physical A/return/B/vote/Next stays at the west station for ${path}`,async()=>{
  const original={version:1,grades:{a:{notes:'Keep this answer'}},preferences:{'unrelated::pair':{choice:'tie'}},opened:{}};
  const storage=new Map([['lab.walkable3d.judgments.v1',JSON.stringify(original)]]);
  const f=await screenFixture({href:'https://example.test'+path+'?prompt=01',storage,state:{labLayoutVersion:roomLayoutVersion},departurePose:pose,physicalReturn:true});
  assert.ok(walkable(pose));assert.deepEqual(pair(f),['a','b']);assert.ok(f.choices.every(button=>button.disabled));
  const id=f.history.state.labComparison.comparisonId;
  assert.equal(f.byId('screen-reveal').hidden,true);assert.deepEqual(votes(f),original);
  f.api.activate({x:100,y:200});
  const first=await f.sceneVisit({ready:true});
  assert.deepEqual(copy(first.visit.labState.labPosition),pose);assert.equal(first.visit.labState.labLayoutVersion,roomLayoutVersion);
  assert.equal(first.visit.returnToControls,false);assert.equal(first.visit.modelLabel,'Model hidden until reveal');
  await f.returnVisit({ready:true});
  assert.equal(f.returns,1);assert.equal(f.byId('room').focused,true);assert.equal(f.byId('comparison-dialog').open,false);
  assert.equal(f.byId('screen-controls').focused,false);assert.deepEqual(pair(f),['a','b']);assert.equal(f.history.state.labComparison.comparisonId,id);
  assert.deepEqual(copy(f.history.state.labComparison.opened),['a']);assert.ok(f.choices.every(button=>button.disabled));
  f.api.activate({x:200,y:540});assert.equal(votes(f).preferences['a::b'],undefined);
  f.api.activate({x:800,y:200});const second=await f.sceneVisit({ready:true});
  const restored=await screenFixture({href:second.nav.returnUrl(second.visit),storage,session:f.session,departurePose:pose,physicalReturn:true});
  assert.equal(restored.returns,1);assert.equal(restored.byId('room').focused,true);assert.equal(restored.byId('comparison-dialog').open,false);
  assert.equal(new URL(restored.location.href).pathname,path);assert.equal(new URL(restored.location.href).searchParams.has('return'),false);
  assert.deepEqual(copy(restored.history.state.labPosition),pose);assert.deepEqual(pair(restored),['a','b']);assert.equal(restored.history.state.labComparison.comparisonId,id);
  assert.deepEqual(copy(restored.history.state.labComparison.opened),['a','b']);assert.ok(restored.choices.every(button=>!button.disabled));
  restored.api.activate({x:200,y:540});
  assert.equal(restored.departures,0);assert.deepEqual(restored.assigned,[]);assert.equal(restored.byId('comparison-dialog').open,false);
  assert.equal(votes(restored).preferences['a::b'].choice,'a');assert.deepEqual(votes(restored).grades,original.grades);assert.deepEqual(votes(restored).preferences['unrelated::pair'],{choice:'tie'});
  assert.equal(restored.byId('screen-reveal').hidden,false);assert.equal(restored.byId('screen-reveal').children[1].textContent,'A \u2014 model0');assert.equal(restored.byId('screen-reveal').children[2].textContent,'B \u2014 model1');
  restored.api.activate({x:1200,y:540});
  assert.notEqual(restored.history.state.labComparison.comparisonId,id);assert.ok(restored.choices.every(button=>button.disabled));assert.equal(restored.byId('screen-reveal').hidden,true);
  assert.equal(restored.departures,0);assert.deepEqual(restored.assigned,[]);assert.deepEqual(copy(restored.history.state.labPosition),pose);assert.equal(votes(restored).preferences['a::b'].choice,'a');
});

test('explicit keyboard controls retain their dialog return without invoking physical-return focus',async()=>{
  const f=await screenFixture({departurePose:pose,physicalReturn:true});
  f.byId('screen-controls').listeners.click();f.byId('screen-cards').children[0].children[0].listeners.click();
  await f.returnVisit({ready:true});assert.equal(f.returns,0);assert.equal(f.byId('comparison-dialog').open,true);assert.deepEqual(copy(f.history.state.labPosition),pose);
});
