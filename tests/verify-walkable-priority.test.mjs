// Real service-derived counts in production; all counts and writes here are isolated fixtures.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {screenFixture} from './verify-walkable-lab-fixture.mjs';
const source=readFileSync(new URL('../walkable-3d/assets/comparisons.js',import.meta.url));
const {randomComparison,comparisonKey,sortEntriesByVotes,comparisonPairs}=await import('data:text/javascript;base64,'+source.toString('base64'));
const entry=(id,promptId,comparisonModel)=>({id,promptId,comparisonModel,title:id,htmlSha256:'a'.repeat(64),requestedConfiguration:comparisonModel});
const entries=[entry('a','01','x'),entry('b','01','y'),entry('c','02','x'),entry('d','02','y')],prompts=[{id:'01',title:'First'},{id:'02',title:'Second'}],catalog={entries,prompts};
const counts=values=>new Map(Object.entries(values));
function pick(values,previous,random=.1,scope=prompts,subset=entries){const old=Math.random;Math.random=()=>random;try{return randomComparison(scope,subset,previous,values);}finally{Math.random=old;}}
test('unrated scenes outrank well-covered pairs even when the unrated scene only has a highly rated partner',()=>{
 const votes=counts({a:0,b:100,c:1,d:1});for(const n of [.01,.4,.9])assert.equal(pick(votes,null,n).promptId,'01');
 assert.equal(pick(counts({a:2,b:4,c:1,d:9})).promptId,'02');
});
test('equal-priority ties shuffle fairly and avoid the previous pair; strict priority beats repeat avoidance',()=>{
 const zero=counts({a:0,b:0,c:0,d:0});assert.equal(pick(zero,null,.1).promptId,'01');assert.equal(pick(zero,null,.9).promptId,'02');
 assert.equal(pick(zero,'a::b').promptId,'02');assert.equal(pick(counts({a:0,b:0,c:2,d:2}),'a::b').promptId,'01');
});
test('filters, failed results, model separation and stable listing ties remain intact',()=>{
 const votes=counts({a:0,b:0,c:2,d:2});assert.equal(pick(votes,null,.1,[prompts[1]]).promptId,'02');
 const failed={...entries[0],availability:'failed'};assert.equal(pick(votes,null,.1,prompts,[failed,...entries.slice(1)]).promptId,'02');
 assert.deepEqual(sortEntriesByVotes([entries[3],entries[1],entries[0],entries[2]],votes).map(e=>e.id),['b','a','d','c']);
 assert.equal(comparisonPairs([entries[0],{...entries[1],comparisonModel:'x'}],votes).length,0);
});
test('unavailable counts retain the existing eligible randomized fallback rather than making unknown scenes zero',()=>{
 assert.equal(pick(null,null,.9).promptId,'02');assert.equal(pick(counts({a:0}),null,.9).promptId,'02');
 assert.deepEqual(sortEntriesByVotes(entries,null),entries);
});
test('fresh Lab rating queue and post-vote Next use service counts; current sides and old records survive',async()=>{
 const f=await screenFixture({catalog,publicCounts:{a:0,b:0,c:1,d:1},publicCountsAfterVote:{a:2,b:2,c:1,d:1}});
 assert.equal(f.history.state.labPrompt,'01');const original=f.history.state.labPairOrder.slice();
 f.api.activate({x:100,y:200});await f.returnVisit({ready:true});f.api.activate({x:800,y:200});await f.returnVisit({ready:true});
 await f.choices[0].listeners.click();assert.deepEqual(f.history.state.labPairOrder,original);assert.equal(f.publicWrites.length,1);
 await f.byId('screen-next').listeners.click();assert.equal(f.history.state.labPrompt,'02');assert.ok(f.serviceReads>=3);
 const record=JSON.parse(f.storage.get('lab.walkable3d.judgments.v1'));assert.ok(record.preferences[comparisonKey(entries.slice(0,2))]);assert.ok(f.choices.every(choice=>choice.disabled));
});
test('explicit prompt scope is respected and service errors are disclosed without blocking eligible comparisons',async()=>{
 const filtered=await screenFixture({catalog,href:'https://example.test/lab/lab-space/?prompt=02',publicCounts:{a:0,b:0,c:3,d:3}});assert.equal(filtered.history.state.labPrompt,'02');
 const fallback=await screenFixture({catalog,publicCounts:{a:0,b:0,c:3,d:3},publicReadFails:true,random:()=>.9});assert.equal(fallback.history.state.labPrompt,'02');assert.match(fallback.byId('screen-boundary').textContent,/counts are unavailable/);assert.equal(fallback.publicWrites.length,0);
});
