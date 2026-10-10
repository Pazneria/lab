import {validateManifest,eligiblePairs,choosePair,chooseComparison,createComparisonState,DEFAULT_CAMERA} from './contracts.mjs';
import {createVotingClient,renderLeaderboard} from './voting.mjs';
import {shortBrief} from './briefs.mjs';
const $=id=>document.getElementById(id);
const state=createComparisonState(),stages=$('stages'),surfaces=[$('surface-a'),$('surface-b')];
const sides=['a','b'];let manifest=null,promptId=null,engine=null,loading=false,bootRequest=0,expanded=null,loadAbort=null;
const statuses=['empty','empty'],pointerClearers=[];
const voting=createVotingClient();let catalogSha256=null,voteBusy=false,restoreBusy=false,restored=null,revising=false,voteError='',restorationError='';
async function refreshLeaderboard(){
  $('refresh-leaderboard').disabled=true;$('leaderboard-status').textContent='Loading public judgments…';
  try{renderLeaderboard($('leaderboard-data'),await voting.leaderboard());$('leaderboard-status').textContent='Confirmed shared server snapshot.';}
  catch{$('leaderboard-status').textContent='Public leaderboard unavailable. Try Refresh. Any displayed table is the last confirmed snapshot.';}
  finally{$('refresh-leaderboard').disabled=false;}
}
function choiceFor(receipt){return receipt.choice==='tie'?'tie':receipt.choice===state.snapshot.pair?.[0].id?'a':'b';}
async function restoreVote(){
  const pair=state.snapshot.pair,generation=state.snapshot.generation;restored=null;restorationError='';revising=false;voteError='';
  if(!pair){restoreBusy=false;renderControls();return;}
  voting.remember(pair);restoreBusy=true;renderControls();
  try{const receipt=await voting.current(pair);if(generation!==state.snapshot.generation)return;restored=receipt;}
  catch{if(generation!==state.snapshot.generation)return;restorationError='Could not check the saved preference. Retry before submitting.';}
  finally{if(generation===state.snapshot.generation){restoreBusy=false;renderControls();}}
}
function resetPresentation(){
  $('surface-mode').value='pbr';$('light-angle').value='35';$('light-value').textContent='35°';$('grid-toggle').setAttribute('aria-pressed','true');
  engine?.setMode('pbr');engine?.setLight(35);engine?.setGrid(true);
}
function textNode(tag,text,className){const node=document.createElement(tag);node.textContent=text;if(className)node.className=className;return node;}
function pairSignature(pair){return pair?.map(e=>e.id).sort().join('|')||null;}
function message(side,kind,text){
  // Parser errors can contain submitted mesh names or asset URLs. Keep pre-choice status neutral.
  if(kind==='error'&&!state.snapshot.revealed)text='Could not load this model. Retry or choose Next.';
  surfaces[side].setAttribute('aria-busy',String(kind==='loading'));
  statuses[side]=kind;state.setReady(side,kind==='ready');
  const box=$('message-'+sides[side]);box.replaceChildren();box.hidden=kind==='ready';box.classList.toggle('is-loading',kind==='loading');
  const mark=textNode('span',kind==='loading'?'…':sides[side].toUpperCase(),'empty-mark');mark.setAttribute('aria-hidden','true');
  box.append(mark,textNode('strong',kind==='loading'?'Loading model':kind==='error'?'Could not load':kind==='paused'?'Paused':'Awaiting a pair'),textNode('p',text));
  $('status-'+sides[side]).textContent=kind==='ready'?'Frozen GLB verified · ready':kind==='loading'?'Verifying source…':kind==='error'?'Import failed':kind==='paused'?'Unloaded while hidden':'No asset loaded';
  surfaces[side].classList.toggle('is-ready',kind==='ready');renderControls();
}
function renderControls(){
  if(restored?.status==='saved'&&state.snapshot.canVote){state.vote(choiceFor(restored));renderProvenance();}
  else if(restored?.status==='saved'&&state.snapshot.revealed&&state.snapshot.ready.every(Boolean)&&state.snapshot.choice!==choiceFor(restored)){state.revise(choiceFor(restored));renderProvenance();}
  const s=state.snapshot,hasPair=!!s.pair,inspect=!!engine&&s.ready.some(Boolean);
  const pending=hasPair&&voting.pending(s.pair),blocked=voteBusy||!!pending,voteBlocked=blocked||restoreBusy;
  $('load-pair').disabled=!hasPair||loading;
  $('load-pair').hidden=!hasPair||loading||s.ready.every(Boolean);$('load-pair').textContent='Retry';
  $('link-cameras').disabled=!inspect;$('link-cameras').setAttribute('aria-pressed',String(s.linked));$('link-cameras').textContent=s.linked?'↔ Cameras linked':'⇄ Cameras independent';
  $('camera-note').textContent='Drag to rotate. Scroll or pinch to zoom.';
  for(const id of ['surface-mode','reset-camera','grid-toggle','light-angle'])$(id).disabled=!inspect;
  for(const button of document.querySelectorAll('[data-view],.focus-pane'))button.disabled=!inspect;
  document.querySelectorAll('[data-vote]').forEach(button=>{button.disabled=voteBlocked||!!restorationError||!(s.canVote||revising&&s.revealed&&s.ready.every(Boolean));button.classList.toggle('selected',button.dataset.vote===s.choice);button.setAttribute('aria-pressed',String(button.dataset.vote===s.choice));});
  const comparisonCount=manifest?.prompts.reduce((count,prompt)=>count+eligiblePairs(manifest,prompt.id).length,0)||0;
  $('next-pair').disabled=comparisonCount<2||blocked;
  $('prompt-select').disabled=!manifest?.prompts.length||blocked;
  $('swap-pair').disabled=!hasPair||loading||s.revealed||blocked;
  $('retry-vote').hidden=!pending&&!restorationError;$('retry-vote').disabled=voteBusy||restoreBusy;
  $('change-vote').hidden=!s.revealed;$('change-vote').disabled=voteBlocked||!s.ready.every(Boolean);
  $('withdraw-vote').hidden=!s.revealed||restored?.status==='withdrawn';$('withdraw-vote').disabled=voteBlocked;
  $('vote-status').textContent=voteBusy?'Saving preference. Waiting for server confirmation…':restoreBusy?'Checking this browser’s saved preference…':pending?'Preference not confirmed. Retry the pending request; it will not add a second match.':restored?.status==='withdrawn'?'Preference withdrawn from public ratings.':s.revealed?'Preference confirmed in shared storage. Reloading preserves this browser’s judgment.':'';
  if(voteError||restorationError)$('vote-status').textContent=voteError||restorationError;
  sides.forEach((letter,index)=>{$('label-'+letter).textContent=state.label(index);});
  $('reveal').hidden=!s.revealed;
  $('vote-instruction').textContent=revising?'Choose a replacement preference.':s.revealed?'Preference saved.':s.canVote?'Choose to reveal model labels.':'Choose after both models load.';
}
function renderProvenance(){
  const s=state.snapshot;if(!s.revealed)return;
  $('choice-status').textContent=s.choice==='tie'?'You chose no preference.':'You preferred attempt '+s.choice.toUpperCase()+'.';
  $('provenance').replaceChildren(...s.pair.map((entry,index)=>{
    const section=document.createElement('section');section.append(textNode('h3',sides[index].toUpperCase()+' / '+entry.provenance.modelLabel));
    const p=entry.provenance,dl=document.createElement('dl');
    const facts=[['Requested model',p.requestedModel||'Not recorded'],['Requested reasoning',p.requestedReasoning||'Not recorded'],['Verified model',p.verifiedModel||'Not independently exposed'],['Verified reasoning',p.verifiedReasoning||'Not independently exposed'],['Prompt source',p.sourcePromptEvidence||'Not recorded'],['Source timing',p.timingDisclosure||'Not recorded'],['Run conditions',p.runConditions||'Not recorded'],['Limitations',Array.isArray(p.limitations)?p.limitations.join(' · '):p.limitations||'No disclosure supplied'],['Producer checks',p.producerChecks||'Not recorded'],['Host checks',p.hostChecks||'Not recorded'],['Runtime QA',p.runtimeReview||(entry.admission.runtimeReview?.status==='pending'?'Pending browser/mobile/GPU QA':'Not recorded')],['Frozen SHA-256',entry.asset.sha256]];
    if(p.sessionReportedModel)facts.splice(2,0,['Session identifier',p.sessionReportedModel],['Identifier evidence',p.modelEvidence||'Receipt reported; not independent backend evidence'],['Request evidence',p.requestedModelEvidence||'Not recorded']);
    for(const [label,value] of facts) {
      dl.append(textNode('dt',label),textNode('dd',value));
    }
    section.append(dl);
    for(const [label,value] of [['Original handoff',p.sourceHandoff],['Original timing record',p.sourceTiming],['Initial execution constraints',p.executionConstraints]]) {
      if(typeof value==='string'&&value){const details=document.createElement('details');details.append(textNode('summary',label),textNode('pre',value,'source-receipt'));section.append(details);}
    }
    if(Array.isArray(p.sourceFiles)&&p.sourceFiles.length){const details=document.createElement('details');details.append(textNode('summary','Preserved source and check fingerprints'));
      details.append(textNode('pre',p.sourceFiles.map(file=>file.file+' / '+file.byteLength+' bytes / SHA-256 '+file.sha256).join('\n'),'source-receipt'));section.append(details);}
    return section;
  }));
}
function restorePaneLayout(){pointerClearers.forEach(clear=>clear());expanded=null;stages.classList.remove('is-expanded');document.querySelectorAll('.pane').forEach(p=>p.hidden=false);
  document.querySelectorAll('.focus-pane').forEach(b=>{b.textContent='Expand '+sides[Number(b.dataset.side)].toUpperCase();b.setAttribute('aria-pressed','false');});}
function selectPrompt(id,{updateUrl=true,chosenPair=null}={}){
  promptId=id;bootRequest++;loadAbort?.abort();loading=false;engine?.clear();restorePaneLayout();
  const remembered=voting.remembered(id),previous=pairSignature(remembered?.map(id=>({id})));
  const prompt=manifest.prompts.find(p=>p.id===id),pair=chosenPair||choosePair(manifest,id,previous);state.setPair(pair);resetPresentation();restored=null;
  $('prompt-title').textContent=prompt?.title||'No admitted prompt at this link';$('prompt-summary').textContent=shortBrief(prompt);
  $('prompt-text').textContent=prompt?.text||'This prompt has no verified admission record. Choose an available prompt to continue.';
  $('prompt-hash').textContent=prompt?'Canonical prompt SHA-256 · '+prompt.sha256:'';
  $('prompt-select').value=id;
  $('run-note').textContent=prompt?.comparisonDisclosure||'';$('run-note').hidden=!prompt?.comparisonDisclosure;
  const count=eligiblePairs(manifest,id).length;
  $('pair-count').textContent=count?count+' pair'+(count===1?'':'s'):'';
  $('inspection-status').textContent=pair?'Loading models…':'No eligible pair for this prompt.';
  sides.forEach((_,i)=>message(i,'empty',pair?'Loading models…':'Two verified attempts of the same prompt are required.'));
  $('provenance').replaceChildren();renderControls();
  if(updateUrl){const url=new URL(location.href);url.searchParams.set('prompt',id);history.replaceState(history.state,'',url);}
  restoreVote();loadPair();
}
async function loadPair(){
  const pair=state.snapshot.pair;if(!pair||loading||document.hidden)return;
  const request=++bootRequest,token=state.snapshot.generation;
  loadAbort?.abort();loadAbort=new AbortController();loading=true;state.setReady(0,false);state.setReady(1,false);
  sides.forEach((_,i)=>message(i,'loading','Verifying the frozen file…'));renderControls();
  try {
    if(!engine){
      const module=await import('./viewer.mjs');
      if(request!==bootRequest || document.hidden)return;
      let created;
      created=module.createViewer({mount:stages,surfaces,state,onStatus(side,kind,text,token){
        if(engine!==created||(token!==undefined&&token!==state.snapshot.generation)||(document.hidden&&kind!=='paused'))return;
        message(side,kind,text);
      },onFailure(text){
        if(engine!==created)return;
        bootRequest++;engine=null;loading=false;sides.forEach((_,i)=>message(i,'error',text));$('inspection-status').textContent=text;
      }});
      engine=created;
      engine.setMode($('surface-mode').value);engine.setLight($('light-angle').value);engine.setGrid($('grid-toggle').getAttribute('aria-pressed')==='true');
    }
    const ready=await engine.loadPair(pair,token);
    if(request!==bootRequest)return;
    $('inspection-status').textContent=ready.every(Boolean)?'':'Could not load both models. Retry or choose Next.';
  } catch(error) {
    if(request===bootRequest){engine?.dispose();engine=null;sides.forEach((_,i)=>message(i,'error',error.message));$('inspection-status').textContent='3D view unavailable. Retry or choose Next.';}
  } finally {if(request===bootRequest){loading=false;renderControls();}}
}
function changeCamera(side,value){if(statuses[side]!=='ready')return;state.setCamera(side,value);engine?.invalidate();}
$('load-pair').addEventListener('click',loadPair);
$('prompt-select').addEventListener('change',event=>selectPrompt(event.target.value));
$('link-cameras').addEventListener('click',()=>{state.setLinked(!state.snapshot.linked);renderControls();engine?.invalidate();});
$('reset-camera').addEventListener('click',()=>{state.reset();engine?.invalidate();});
$('surface-mode').addEventListener('change',event=>engine?.setMode(event.target.value));
$('light-angle').addEventListener('input',event=>{$('light-value').textContent=event.target.value+'°';engine?.setLight(event.target.value);});
$('grid-toggle').addEventListener('click',()=>{const visible=$('grid-toggle').getAttribute('aria-pressed')!=='true';$('grid-toggle').setAttribute('aria-pressed',String(visible));engine?.setGrid(visible);});
async function submitVote(value,{retryOnly=false}={}){
  const snapshot=state.snapshot,pair=snapshot.pair,generation=snapshot.generation;
  if(!pair||voteBusy||restoreBusy||restorationError||(!retryOnly&&!(snapshot.canVote||revising&&snapshot.ready.every(Boolean)||value==='withdraw'&&snapshot.revealed)))return;
  voteBusy=true;voteError='';renderControls();
  try{
    const choice=value==='withdraw'?'withdraw':value==='tie'?'tie':pair[value==='a'?0:1].id;
    const receipt=await voting.submit(pair,choice,catalogSha256,{reportedBlind:!snapshot.revealed,retryOnly});
    if(generation!==state.snapshot.generation)return;restored=receipt;revising=false;
    if(receipt.status==='saved'){
      const chosen=choiceFor(receipt);
      // Confirmation may arrive while hidden; reveal waits for both current imports.
      if(state.snapshot.revealed)state.revise(chosen);else state.vote(chosen);
      renderProvenance();$('choice-status').focus({preventScroll:true});
    }
    voteError=receipt.storageWarning||'';refreshLeaderboard();
  }catch(error){if(generation===state.snapshot.generation)voteError=error.blocked?error.message:error.terminal?'This request was rejected. Reload to refresh the admitted pair before choosing again.':error.status===401?'The browser credential was rejected. It has not been replaced; existing votes remain stored.':'The service has not confirmed this preference. Retry the same request. Labels stay hidden until confirmation.';}
  finally{voteBusy=false;renderControls();}
}
document.querySelectorAll('[data-vote]').forEach(button=>button.addEventListener('click',()=>submitVote(button.dataset.vote)));
$('retry-vote').addEventListener('click',()=>restorationError?restoreVote():submitVote('tie',{retryOnly:true}));
$('change-vote').addEventListener('click',()=>{revising=true;renderControls();});
$('withdraw-vote').addEventListener('click',()=>{revising=true;return submitVote('withdraw');});
$('refresh-leaderboard').addEventListener('click',refreshLeaderboard);
$('next-pair').addEventListener('click',()=>{
  if(voteBusy||voting.pending(state.snapshot.pair||[]))return;
  const next=chooseComparison(manifest,pairSignature(state.snapshot.pair));if(next)selectPrompt(next.promptId,{chosenPair:next.pair});
});
$('swap-pair').addEventListener('click',()=>{
  if(loading||voteBusy||voting.pending(state.snapshot.pair||[])||!state.swap())return;
  bootRequest++;loadAbort?.abort();engine?.clear();restorePaneLayout();resetPresentation();
  sides.forEach((_,i)=>message(i,'empty','Loading models…'));
  $('provenance').replaceChildren();$('inspection-status').textContent='Loading models…';
  restored=null;renderControls();restoreVote();loadPair();
});
document.querySelectorAll('.focus-pane').forEach(button=>button.addEventListener('click',()=>{
  const side=Number(button.dataset.side);expanded=expanded===side?null:side;state.setActive(side);stages.classList.toggle('is-expanded',expanded!==null);
  document.querySelectorAll('.pane').forEach((pane,index)=>pane.hidden=expanded!==null&&expanded!==index);
  document.querySelectorAll('.focus-pane').forEach(b=>{const on=Number(b.dataset.side)===expanded;b.textContent=on?'Show both':'Expand '+sides[Number(b.dataset.side)].toUpperCase();b.setAttribute('aria-pressed',String(on));});
  engine?.invalidate();
}));
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
  const side=Number(button.dataset.side),view=button.dataset.view;
  changeCamera(side,view==='face'?{...DEFAULT_CAMERA,distance:1.65,targetY:.58}:view==='back'?{...DEFAULT_CAMERA,yaw:Math.PI}:view==='side'?{...DEFAULT_CAMERA,yaw:Math.PI/2}:view==='top'?{...DEFAULT_CAMERA,pitch:1.35}:{...DEFAULT_CAMERA});
}));
surfaces.forEach((surface,side)=>{
  const pointers=new Map();pointerClearers.push(()=>pointers.clear());
  const pairDistance=()=>{const [a,b]=[...pointers.values()];return a&&b?Math.hypot(a.x-b.x,a.y-b.y):0;};
  surface.addEventListener('pointerdown',event=>{
    if(statuses[side]!=='ready'||event.button!==0)return;
    state.setActive(side);surface.focus({preventScroll:true});surface.setPointerCapture(event.pointerId);pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});event.preventDefault();
  });
  surface.addEventListener('pointermove',event=>{
    const previous=pointers.get(event.pointerId);if(!previous)return;
    const before=pairDistance();pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});const after=pairDistance();
    const camera=state.snapshot.cameras[side];
    if(pointers.size===2 && before>0&&after>0)changeCamera(side,{...camera,distance:camera.distance*before/after});
    else if(pointers.size===1)changeCamera(side,{...camera,yaw:camera.yaw-(event.clientX-previous.x)*.009,pitch:camera.pitch+(event.clientY-previous.y)*.007});
    event.preventDefault();
  });
  function clearPointer(event){pointers.delete(event.pointerId);}
  surface.addEventListener('pointerup',clearPointer);surface.addEventListener('pointercancel',clearPointer);surface.addEventListener('lostpointercapture',clearPointer);
  surface.addEventListener('wheel',event=>{
    if(statuses[side]!=='ready')return;const camera=state.snapshot.cameras[side];
    const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?surface.clientHeight:1);
    changeCamera(side,{...camera,distance:camera.distance*Math.exp(Math.max(-100,Math.min(100,delta))*.0025)});event.preventDefault();
  },{passive:false});
  surface.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&expanded!==null){restorePaneLayout();engine?.invalidate();event.preventDefault();return;}
    if(statuses[side]!=='ready')return;const camera=state.snapshot.cameras[side];let value={...camera};
    if(event.key==='ArrowLeft')value.yaw+=.12;else if(event.key==='ArrowRight')value.yaw-=.12;
    else if(event.key==='ArrowUp')value.pitch+=.08;else if(event.key==='ArrowDown')value.pitch-=.08;
    else if(['+','='].includes(event.key))value.distance*=.9;else if(['-','_'].includes(event.key))value.distance*=1.1;
    else if(event.key==='Home')value={...DEFAULT_CAMERA};else return;
    changeCamera(side,value);event.preventDefault();
  });
});
function depart(){bootRequest++;loading=false;restoreBusy=false;restorationError='';loadAbort?.abort();engine?.dispose();engine=null;state.setPair(state.snapshot.pair);restorePaneLayout();resetPresentation();
  sides.forEach((_,i)=>message(i,'paused','Reload both frozen attempts to resume inspection.'));$('provenance').replaceChildren();renderControls();}
window.addEventListener('pagehide',depart);
window.addEventListener('pageshow',event=>{if(event.persisted&&manifest){restoreVote();loadPair();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){bootRequest++;loading=false;loadAbort?.abort();engine?.clear();pointerClearers.forEach(clear=>clear());sides.forEach((_,i)=>message(i,'paused','Inspection paused while this tab is hidden.'));}else if(manifest&&!state.snapshot.ready.every(Boolean))loadPair();});
window.addEventListener('popstate',()=>{if(manifest){const query=new URL(location.href).searchParams.get('prompt'),next=!query&&chooseComparison(manifest,pairSignature(state.snapshot.pair));selectPrompt(query||next?.promptId||manifest.prompts[0]?.id,{updateUrl:false,chosenPair:next?.pair});}});
// Read-only host measurements for a cleared QA session; no preference/admission API.
if(new URL(location.href).searchParams.has('labqa'))Object.defineProperty(window,'__characterBench',{
  configurable:true,value:Object.freeze({get diagnostics(){return engine?.diagnostics??null;}})
});
async function boot(){
  try {
    const response=await fetch(new URL('../data/admission.json',import.meta.url),{credentials:'same-origin',cache:'no-cache',redirect:'error'});
    if(!response.ok)throw Error('Admission manifest unavailable.');const raw=await response.text();
    catalogSha256=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(raw))),b=>b.toString(16).padStart(2,'0')).join('');manifest=validateManifest(JSON.parse(raw));
    if(!manifest.prompts.length){$('inspection-status').textContent='Awaiting the verified admission manifest. No previews or model pairs have been fabricated.';renderControls();return;}
    if(!globalThis.crypto?.subtle)throw Error('A secure connection is required to verify canonical prompts.');
    for(const prompt of manifest.prompts){const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(prompt.text))),b=>b.toString(16).padStart(2,'0')).join('');if(hash!==prompt.sha256)throw Error('Canonical prompt text does not match its frozen hash.');}
    $('prompt-select').replaceChildren(...manifest.prompts.map(p=>{const option=document.createElement('option');option.value=p.id;option.textContent=p.title;return option;}));
    $('prompt-select').disabled=false;const requested=new URL(location.href).searchParams.get('prompt');
    if(requested&&!manifest.prompts.some(p=>p.id===requested)){const missing=document.createElement('option');missing.value=requested;missing.textContent='Unknown prompt';$('prompt-select').append(missing);}
    const remembered=voting.remembered(),pending=remembered&&voting.pending(remembered);
    const pendingEntries=pending?.entries?.map(id=>manifest.entries.find(entry=>entry.id===id));
    const pendingPair=pendingEntries?.length===2&&pendingEntries.every(Boolean)&&eligiblePairs(manifest,pendingEntries[0].promptId).some(pair=>pairSignature(pair)===pairSignature(pendingEntries))?pendingEntries:null;
    const first=!requested&&chooseComparison(manifest,pairSignature(remembered?.map(id=>({id}))));
    selectPrompt(pendingPair?.[0].promptId||requested||first?.promptId||manifest.prompts[0].id,{updateUrl:false,chosenPair:pendingPair||first?.pair});
    refreshLeaderboard();
  } catch(error){$('inspection-status').textContent=error.message+' No entries can be loaded or voted on.';sides.forEach((_,i)=>message(i,'error','The admission record could not be verified. Try reloading this page.'));}
}
boot();
