import {validateManifest,eligiblePairs,choosePair,createComparisonState,DEFAULT_CAMERA} from './contracts.mjs';
const $=id=>document.getElementById(id);
const state=createComparisonState(),stages=$('stages'),surfaces=[$('surface-a'),$('surface-b')];
const sides=['a','b'];let manifest=null,promptId=null,engine=null,loading=false,bootRequest=0,expanded=null,loadAbort=null;
const statuses=['empty','empty'];
function textNode(tag,text,className){const node=document.createElement(tag);node.textContent=text;if(className)node.className=className;return node;}
function pairSignature(pair){return pair?.map(e=>e.id).sort().join('|')||null;}
function message(side,kind,text){
  statuses[side]=kind;state.setReady(side,kind==='ready');
  const box=$('message-'+sides[side]);box.replaceChildren();box.hidden=kind==='ready';box.classList.toggle('is-loading',kind==='loading');
  const mark=textNode('span',kind==='loading'?'…':sides[side].toUpperCase(),'empty-mark');mark.setAttribute('aria-hidden','true');
  box.append(mark,textNode('strong',kind==='loading'?'Loading frozen attempt':kind==='error'?'Import unavailable':kind==='paused'?'Inspection paused':'Ready when the pair is admitted'),textNode('p',text));
  $('status-'+sides[side]).textContent=kind==='ready'?'Frozen GLB verified · ready':kind==='loading'?'Verifying source…':kind==='error'?'Import failed':kind==='paused'?'Unloaded while hidden':'No asset loaded';
  surfaces[side].classList.toggle('is-ready',kind==='ready');renderControls();
}
function renderControls(){
  const s=state.snapshot,hasPair=!!s.pair,inspect=!!engine&&s.ready.some(Boolean);
  $('load-pair').disabled=!hasPair||loading;
  $('load-pair').textContent=loading?'Loading comparison…':s.ready.every(Boolean)?'Reload comparison ↗':statuses.some(x=>['error','paused'].includes(x))?'Retry comparison ↗':'Load comparison ↗';
  $('link-cameras').disabled=!inspect;$('link-cameras').setAttribute('aria-pressed',String(s.linked));$('link-cameras').textContent=s.linked?'↔ Cameras linked':'⇄ Cameras independent';
  $('camera-note').textContent=s.linked?'Rotate or zoom either view to move both. Unlock cameras for independent inspection.':'Cameras are independent. Linking again adopts the last view you inspected.';
  for(const id of ['surface-mode','reset-camera','grid-toggle','light-angle'])$(id).disabled=!inspect;
  for(const button of document.querySelectorAll('[data-view],.focus-pane'))button.disabled=!inspect;
  document.querySelectorAll('[data-vote]').forEach(button=>{button.disabled=!s.canVote;button.classList.toggle('selected',button.dataset.vote===s.choice);});
  const pairs=manifest&&promptId?eligiblePairs(manifest,promptId):[];
  $('next-pair').disabled=pairs.length<2;
  sides.forEach((letter,index)=>{$('label-'+letter).textContent=state.label(index);});
  $('reveal').hidden=!s.revealed;
  $('vote-instruction').textContent=s.revealed?'Preference recorded for this inspection. The model identities are now visible.':s.canVote?'Both frozen attempts are ready. Choose when you have finished inspecting.':'Load and inspect both attempts before choosing. Model labels reveal after your choice.';
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
function restorePaneLayout(){expanded=null;stages.classList.remove('is-expanded');document.querySelectorAll('.pane').forEach(p=>p.hidden=false);
  document.querySelectorAll('.focus-pane').forEach(b=>{b.textContent='Expand '+sides[Number(b.dataset.side)].toUpperCase();b.setAttribute('aria-pressed','false');});}
function selectPrompt(id,{updateUrl=true}={}){
  promptId=id;bootRequest++;loadAbort?.abort();loading=false;engine?.clear();restorePaneLayout();
  const prompt=manifest.prompts.find(p=>p.id===id),pair=choosePair(manifest,id);state.setPair(pair);
  $('prompt-title').textContent=prompt?.title||'No admitted prompt at this link';
  $('prompt-text').textContent=prompt?.text||'This prompt has no verified admission record. Choose an available prompt to continue.';
  $('prompt-hash').textContent=prompt?'Canonical prompt SHA-256 · '+prompt.sha256:'';
  $('prompt-select').value=id;
  $('run-note').textContent=prompt?.comparisonDisclosure||'';$('run-note').hidden=!prompt?.comparisonDisclosure;
  const count=eligiblePairs(manifest,id).length;
  $('pair-count').textContent=count?count+' admitted pair'+(count===1?'':'s')+' · one canonical prompt':'Awaiting two verified attempts of this prompt.';
  $('inspection-status').textContent=pair?'Both panes use the same lighting and unit-sphere framing. Load this pair to begin.':'No two verified attempts of this prompt are available. Other character prompts are never substituted.';
  sides.forEach((_,i)=>message(i,'empty',pair?'Load comparison to verify and inspect this frozen attempt.':'A second verified attempt of the same prompt is required.'));
  $('provenance').replaceChildren();renderControls();
  if(updateUrl){const url=new URL(location.href);url.searchParams.set('prompt',id);history.replaceState(history.state,'',url);}
}
async function loadPair(){
  const pair=state.snapshot.pair;if(!pair||loading)return;
  const request=++bootRequest,token=state.snapshot.generation;
  loadAbort?.abort();loadAbort=new AbortController();loading=true;state.setReady(0,false);state.setReady(1,false);
  sides.forEach((_,i)=>message(i,'loading','Preparing shared inspection resources…'));renderControls();
  try {
    if(!engine){
      const module=await import('./viewer.mjs');
      if(request!==bootRequest || document.hidden)return;
      engine=module.createViewer({mount:stages,surfaces,state,onStatus:message,onFailure(text){
        engine=null;loading=false;sides.forEach((_,i)=>message(i,'error',text));$('inspection-status').textContent=text;
      }});
      engine.setMode($('surface-mode').value);engine.setLight($('light-angle').value);engine.setGrid($('grid-toggle').getAttribute('aria-pressed')==='true');
    }
    const ready=await engine.loadPair(pair,token);
    if(request!==bootRequest)return;
    $('inspection-status').textContent=ready.every(Boolean)?'Drag either character to rotate. Scroll or pinch to zoom. Both files passed the frozen source checks.':'A failed or paused import cannot be voted on. Retry the comparison to continue.';
  } catch(error) {
    if(request===bootRequest){engine?.dispose();engine=null;sides.forEach((_,i)=>message(i,'error',error.message));$('inspection-status').textContent='3D inspection is unavailable. The exact prompt and source contract remain accessible.';}
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
document.querySelectorAll('[data-vote]').forEach(button=>button.addEventListener('click',()=>{
  if(state.vote(button.dataset.vote)){renderProvenance();renderControls();}
}));
$('next-pair').addEventListener('click',()=>{
  const pair=choosePair(manifest,promptId,pairSignature(state.snapshot.pair));if(!pair)return;
  bootRequest++;loadAbort?.abort();loading=false;engine?.clear();restorePaneLayout();state.setPair(pair);
  sides.forEach((_,i)=>message(i,'empty','New blind pair selected. Load both frozen attempts to begin.'));$('provenance').replaceChildren();
  $('inspection-status').textContent='New pair selected. The previous preference was session-only.';renderControls();
});
document.querySelectorAll('.focus-pane').forEach(button=>button.addEventListener('click',()=>{
  const side=Number(button.dataset.side);expanded=expanded===side?null:side;state.setActive(side);stages.classList.toggle('is-expanded',expanded!==null);
  document.querySelectorAll('.pane').forEach((pane,index)=>pane.hidden=expanded!==null&&expanded!==index);
  document.querySelectorAll('.focus-pane').forEach(b=>{const on=Number(b.dataset.side)===expanded;b.textContent=on?'Show both':'Expand '+sides[Number(b.dataset.side)].toUpperCase();b.setAttribute('aria-pressed',String(on));});
  engine?.invalidate();
}));
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
  const side=Number(button.dataset.side),view=button.dataset.view;
  changeCamera(side,view==='face'?{...DEFAULT_CAMERA,distance:1.65,targetY:.58}:view==='back'?{...DEFAULT_CAMERA,yaw:Math.PI}:{...DEFAULT_CAMERA});
}));
surfaces.forEach((surface,side)=>{
  const pointers=new Map();
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
    if(statuses[side]!=='ready')return;const camera=state.snapshot.cameras[side];let value={...camera};
    if(event.key==='ArrowLeft')value.yaw+=.12;else if(event.key==='ArrowRight')value.yaw-=.12;
    else if(event.key==='ArrowUp')value.pitch+=.08;else if(event.key==='ArrowDown')value.pitch-=.08;
    else if(['+','='].includes(event.key))value.distance*=.9;else if(['-','_'].includes(event.key))value.distance*=1.1;
    else if(event.key==='Home')value={...DEFAULT_CAMERA};else return;
    changeCamera(side,value);event.preventDefault();
  });
});
function depart(){bootRequest++;loading=false;loadAbort?.abort();engine?.dispose();engine=null;state.setPair(state.snapshot.pair);
  sides.forEach((_,i)=>message(i,'paused','Reload both frozen attempts to resume inspection.'));$('provenance').replaceChildren();renderControls();}
window.addEventListener('pagehide',depart);
document.addEventListener('visibilitychange',()=>{if(document.hidden){bootRequest++;loading=false;sides.forEach((_,i)=>message(i,'paused','Inspection paused while this tab was hidden. Reload both frozen attempts to continue.'));}});
window.addEventListener('popstate',()=>{if(manifest){const query=new URL(location.href).searchParams.get('prompt');selectPrompt(query||manifest.prompts[0]?.id,{updateUrl:false});}});
// Read-only host measurements for a cleared QA session; no preference/admission API.
if(new URL(location.href).searchParams.has('labqa'))Object.defineProperty(window,'__characterBench',{
  configurable:true,value:Object.freeze({get diagnostics(){return engine?.diagnostics??null;}})
});
async function boot(){
  try {
    const response=await fetch(new URL('../data/admission.json',import.meta.url),{credentials:'same-origin',cache:'no-cache',redirect:'error'});
    if(!response.ok)throw Error('Admission manifest unavailable.');manifest=validateManifest(await response.json());
    if(!manifest.prompts.length){$('inspection-status').textContent='Awaiting the verified admission manifest. No previews or model pairs have been fabricated.';renderControls();return;}
    if(!globalThis.crypto?.subtle)throw Error('A secure connection is required to verify canonical prompts.');
    for(const prompt of manifest.prompts){const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(prompt.text))),b=>b.toString(16).padStart(2,'0')).join('');if(hash!==prompt.sha256)throw Error('Canonical prompt text does not match its frozen hash.');}
    $('prompt-select').replaceChildren(...manifest.prompts.map(p=>{const option=document.createElement('option');option.value=p.id;option.textContent=p.title;return option;}));
    $('prompt-select').disabled=false;const requested=new URL(location.href).searchParams.get('prompt');
    if(requested&&!manifest.prompts.some(p=>p.id===requested)){const missing=document.createElement('option');missing.value=requested;missing.textContent='Unknown prompt';$('prompt-select').append(missing);}
    selectPrompt(requested||manifest.prompts[0].id,{updateUrl:false});
  } catch(error){$('inspection-status').textContent=error.message+' No entries can be loaded or voted on.';sides.forEach((_,i)=>message(i,'error','The admission record could not be verified. Try reloading this page.'));}
}
boot();
