// CPU-only network/storage contract checks. No DOM, browser, renderer or scene.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {webcrypto} from 'node:crypto';
const source=readFileSync(new URL('../walkable-3d/assets/public-judgments.js',import.meta.url),'utf8');
const pair=[{id:'alder-halt'},{id:'bracken-hollow'}];
async function fixture({failFirst=false,supersedeFirst=false}={}){
  const privateKey='lab.walkable3d.judgments.v1';
  const legacy=JSON.stringify({version:1,preferences:{old:{choice:'private-choice'}},grades:{old:{visuals:42,notes:'PRIVATE NOTE'}},opened:{old:'private-time'}});
  const storage=new Map([[privateKey,legacy]]),reads=[],calls=[],writes=[];let failed=false,superseded=false;
  const context=vm.createContext({URL,AbortController,setTimeout,clearTimeout,crypto:webcrypto,navigator:{},localStorage:{getItem(k){reads.push(k);return storage.get(k)||null;},setItem(k,v){storage.set(k,v);}},fetch:async(url,options)=>{
    const path=new URL(url).pathname,body=options.body?JSON.parse(options.body):null;calls.push({path,body,credentials:options.credentials});
    if(path.endsWith('/session'))return Response.json({token:'a'.repeat(64),expiresAt:Date.now()+86400000});
    if(path.endsWith('/leaderboard'))return Response.json({rows:[],counts:{votes:0},rubric:{rows:[]}});
    writes.push(body);
    if(failFirst&&!failed){failed=true;throw new Error('Simulated response lost after acceptance');}
    if(supersedeFirst&&!superseded){superseded=true;return Response.json({status:'superseded',currentIntent:8});}
    return Response.json({status:body.choice==='withdraw'?'withdrawn':'saved',requestId:body.requestId,intent:body.intent,choice:body.choice});
  }});
  const module=new vm.SourceTextModule(source,{context});
  await module.link(()=>new vm.SyntheticModule(['PUBLIC_VOTING_ORIGIN'],function(){this.setExport('PUBLIC_VOTING_ORIGIN','https://voting.example');},{context}));
  await module.evaluate();
  return {api:module.namespace,storage,reads,calls,writes,legacy,privateKey};
}
test('initial leaderboard read never accesses or uploads private legacy records',async()=>{
  const f=await fixture();await f.api.loadPublicLeaderboard();
  assert.equal(f.calls.length,1);assert.ok(f.calls[0].path.endsWith('/leaderboard'));assert.equal(f.calls[0].credentials,'omit');assert.ok(!f.reads.includes(f.privateKey));
  await f.api.submitPublicVote(pair,pair[0].id,true);
  assert.equal(f.storage.get(f.privateKey),f.legacy);assert.ok(!JSON.stringify(f.calls).includes('PRIVATE NOTE'));assert.ok(!JSON.stringify(f.calls).includes('private-time'));
  assert.equal(f.api.publicRubricUrl(pair[0]),'https://voting.example/rubric/alder-halt');
});
test('lost response retries the same intent; subsequent choice and withdrawal advance it',async()=>{
  const f=await fixture({failFirst:true});
  await assert.rejects(f.api.submitPublicVote(pair,'tie',true));
  await f.api.submitPublicVote(pair,'tie',false);
  assert.equal(f.writes[0].requestId,f.writes[1].requestId);assert.equal(f.writes[1].intent,1);assert.equal(f.writes[1].reportedBlind,true);
  await f.api.submitPublicVote(pair,pair[0].id,false);await f.api.submitPublicVote(pair,'withdraw',false);
  assert.equal(f.writes[2].intent,2);assert.equal(f.writes[3].intent,3);assert.equal(f.api.hasPublicVote(pair),false);
});
test('superseded submission permits a new explicit choice above the server sequence',async()=>{
  const f=await fixture({supersedeFirst:true});await assert.rejects(f.api.submitPublicVote(pair,'tie',true));
  await f.api.submitPublicVote(pair,'tie',false);assert.equal(f.writes[1].intent,9);assert.notEqual(f.writes[0].requestId,f.writes[1].requestId);
});

test('pending opening snapshot is ordered and read-only, and caller mutation cannot change retry identity',async()=>{
  const f=await fixture({failFirst:true});await assert.rejects(f.api.submitPublicVote(pair,'tie',true));
  const key='lab.walkable3d.public.v1',before=f.storage.get(key),calls=f.calls.length;
  const pending=f.api.pendingPublicComparisons();assert.deepEqual(JSON.parse(JSON.stringify(pending)),[pair.map(e=>e.id)]);
  pending[0].reverse();pending.push(['other','pair']);assert.equal(f.storage.get(key),before);assert.equal(f.calls.length,calls);
  await f.api.submitPublicVote(pair,'tie',false);assert.deepEqual(f.writes[1],f.writes[0]);assert.equal(f.storage.get(f.privateKey),f.legacy);
});
