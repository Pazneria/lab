// CPU-only tests of the actual status/lifecycle functions; no Three.js, renderer or asset import.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../assets/viewer.mjs',import.meta.url),'utf8');
function fixture(){
  const callbacks=[],pending=[],state={snapshot:{generation:1}};
  const slots=[0,1].map(side=>({open(){return new Promise((resolve,reject)=>pending.push({side,resolve,reject}));},clear(){}}));
  const start=source.indexOf('  async function loadPair(pair,token)'),end=source.indexOf('  function dispose()',start);
  assert.ok(start>=0&&end>start);
  const api=Function('slots','state','onStatus','invalidate','let loadRequest=0,closed=false;'+source.slice(start,end)+'return {loadPair,clear};')(slots,state,(...args)=>callbacks.push(args),()=>{});
  return {api,callbacks,pending,state,pair:[{id:'one'},{id:'two'}]};
}
test('a new same-pair load suppresses success and errors from the prior request',async()=>{
  const f=fixture(),first=f.api.loadPair(f.pair,1),second=f.api.loadPair(f.pair,1);
  f.pending[0].resolve(true);f.pending[1].reject(Error('old failure'));assert.deepEqual(await first,[false,false]);
  assert.equal(f.callbacks.filter(c=>c[1]==='ready'||c[1]==='error').length,0);
  f.pending[2].resolve(true);f.pending[3].resolve(true);assert.deepEqual(await second,[true,true]);
  assert.equal(f.callbacks.filter(c=>c[1]==='ready').length,2);assert.ok(f.callbacks.every(c=>c[3]===1));
});
test('clear invalidates same-generation callbacks, even when the mock importer resolves late',async()=>{
  const f=fixture(),pending=f.api.loadPair(f.pair,1);f.api.clear();
  f.pending.forEach(p=>p.resolve(true));assert.deepEqual(await pending,[false,false]);assert.equal(f.callbacks.filter(c=>c[1]==='ready').length,0);
});
test('a changed pair generation suppresses old import failures',async()=>{
  const f=fixture(),pending=f.api.loadPair(f.pair,1);f.state.snapshot.generation=2;
  f.pending.forEach(p=>p.reject(Error('old parse failure')));assert.deepEqual(await pending,[false,false]);assert.equal(f.callbacks.filter(c=>c[1]==='error').length,0);
});
test('only current errors are reported and a failed side cannot appear ready',async()=>{
  const f=fixture(),pending=f.api.loadPair(f.pair,1);f.pending[0].resolve(true);f.pending[1].reject(Error('current failure'));
  assert.deepEqual(await pending,[true,false]);assert.equal(f.callbacks.filter(c=>c[1]==='ready').length,1);assert.equal(f.callbacks.filter(c=>c[1]==='error').length,1);
});
