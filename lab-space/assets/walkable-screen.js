import {createSceneNavigation} from '../../walkable-3d/assets/scene-navigation.js';
import {comparisonLayout,comparisonTargetAt,fitPreview} from './interaction.mjs';
import {renderLeaderboard} from '../../walkable-3d/assets/judgments.js';
import {modelName,comparisonKey,randomComparison,hasRandomComparison,isOpenable,unavailableSummary} from '../../walkable-3d/assets/comparisons.js';
import {publicVotingEnabled,submitPublicVote,hasPublicVote,loadPublicLeaderboard,renderPublicLeaderboard,subscribePublicJudgments} from '../../walkable-3d/assets/public-judgments.js';

// This canvas contains only two JPEG stills and host controls. No entrant runs here.
export function createWalkableScreen({changed,suspend,resume,approach,depart=suspend,returned=null,initialPrompt=null}) {
  const $=id=>document.getElementById(id),base=new URL('../../walkable-3d/',import.meta.url);
  const source=document.createElement('canvas');source.width=comparisonLayout.width;source.height=comparisonLayout.height;
  const ctx=source.getContext('2d'),images=new Map(),key='lab.walkable3d.judgments.v1';
  let entries=[],allEntries=[],prompts=[],promptId='',pairs=[],index=0,blind=true,record={version:1,grades:{},preferences:{},opened:{}},persistent=true,error='';
  const openedThisComparison=new Set();
  const navigation=createSceneNavigation(base);
  let comparisonId='',leaving=false;
  const publicStatus=new Map();
  let canShuffle=false,revealed=false,labelsSeenThisComparison=false,previewRects=[];
  function refresh(){if(!persistent)return;try{const old=JSON.parse(localStorage.getItem(key));if(old?.version===1)for(const field of ['grades','preferences','opened'])if(old[field]&&typeof old[field]==='object'&&!Array.isArray(old[field]))record[field]=old[field];}catch{persistent=false;}}
  refresh();try{localStorage.setItem(key,JSON.stringify(record));}catch{persistent=false;}
  const pair=()=>pairs[index]||entries.slice(0,1),pairKey=()=>comparisonKey(pair());
  const save=()=>{try{localStorage.setItem(key,JSON.stringify(record));}catch{persistent=false;}};
  const bothOpened=()=>pair().length===2&&pair().every(e=>openedThisComparison.has(e.id));
  function updateLeaderboard(){renderLeaderboard($('screen-leaderboard'),allEntries,record,persistent);}
  function box(x,y,w,h,label,disabled=false){ctx.fillStyle=disabled?'#41584b':'#f3efdf';ctx.fillRect(x,y,w,h);ctx.fillStyle=disabled?'#bec9be':'#1c3c30';ctx.font='24px Arial';ctx.textAlign='center';ctx.fillText(label,x+w/2,y+h/2+8);}
  function render(){
    const current=pair(),both=bothOpened(),hideModel=blind&&!revealed;
    $('screen-public-vote').textContent=publicStatus.get(pairKey())||'';
    const vote=record.preferences[pairKey()]?.choice;
    const choiceLabel=vote?(vote==='skip'?' · SKIPPED':vote==='tie'?' · YOUR CHOICE: TIE':` · YOUR CHOICE: ${vote===current[0]?.id?'A':'B'}`):'';
    ctx.fillStyle='#193b31';ctx.fillRect(0,0,1280,600);ctx.fillStyle='#f5efd9';ctx.textAlign='left';ctx.font='31px Georgia';ctx.fillText('COMPARE WORLDS',40,49);ctx.font='20px Arial';ctx.textAlign='right';ctx.fillText(pairs.length?`PAIR ${index+1} / ${pairs.length}${choiceLabel}`:'WAITING FOR ENTRIES',1240,48);
    ctx.textAlign='left';ctx.font='19px Arial';ctx.fillStyle='#c4d3c3';ctx.fillText(`${(prompts.find(p=>p.id===promptId)?.title||'Loading comparisons').toUpperCase()}  /  CLICK TO EXPLORE`,40,82,920);
    previewRects=[];
    for(let slot=0;slot<2;slot++){
      const bounds=comparisonLayout.previews[slot],x=bounds.x,e=current[slot];ctx.fillStyle='#2f4c3e';ctx.fillRect(x,bounds.y,bounds.width,bounds.height);
      const img=e&&images.get(e.id);if(img?.complete&&img.naturalWidth){const fit=fitPreview(bounds,img.naturalWidth,img.naturalHeight);previewRects[slot]=fit;ctx.drawImage(img,fit.x,fit.y,fit.width,fit.height);}
      else if(e?.previewAvailable===false){ctx.fillStyle='#f6f0dc';ctx.font='28px Georgia';ctx.fillText('Preview not captured',x+32,232,510);ctx.font='18px Arial';ctx.fillText('Click to inspect the frozen build.',x+32,271,510);ctx.fillText('Host runtime QA has not been run.',x+32,302,510);}
      ctx.fillStyle='#f6f0dc';ctx.font='25px Georgia';ctx.fillText(e?`${slot?'B':'A'}  /  ${e.title}`:'Awaiting a finished build',x,461,565);
      ctx.fillStyle='#c4d3c3';ctx.font='17px Arial';ctx.fillText(e?(hideModel?'Model label hidden · Desktop keyboard + mouse':modelName(e)):'A real pair needs two entries.',x,491,565);
    }
    for(const bounds of comparisonLayout.buttons)box(bounds.x,bounds.y,bounds.width,bounds.height,bounds.label,
      bounds.kind==='previous'?index===0:bounds.kind==='next'?!canShuffle:bounds.kind==='vote'?!both:false);
    $('screen-prompt-label').textContent=promptId?`Worlds exhibit / Prompt ${promptId}`:'Worlds exhibit / Loading comparison';
    $('screen-full-prompt').href=new URL(`?prompt=${promptId}#full-prompt`,base);$('screen-notebook').href=new URL(`?prompt=${promptId}`,base);
    $('screen-pair').textContent=pairs.length?`Comparison ${index+1} of ${pairs.length}`:'Waiting for a second finished entry';
    $('screen-prev').disabled=index===0;$('screen-next').disabled=!canShuffle;
    const failed=allEntries.filter(e=>e.promptId===promptId&&e.availability==='failed');
    const unverified=entries.filter(e=>e.availability==='unverified').length;
    const partial=entries.filter(e=>e.completionStatus==='partial').length;
    $('screen-boundary').textContent=(canShuffle?(revealed?'Your choice and both model labels remain visible. Next comparison uses the random picker.':'Next skips to a random prompt and model pair without recording a vote.'):'Waiting for two admitted models to compare.')+(unverified?` ${unverified} ${unverified===1?'entry has':'entries have'} no independent host runtime verification. Inspect producer evidence and limitations in the notebook.`:'')+(partial?` Includes ${partial} partial handoff stopped early; no completion or repair was made.`:'')+(failed.length?` ${unavailableSummary(failed)}; inspect the records in the notebook.`:'');
    const cards=current.map((entry,slot)=>{const card=document.createElement('article'),button=document.createElement('button'),img=document.createElement('img'),h=document.createElement('h3'),model=document.createElement('p'),details=document.createElement('a');
      button.type='button';button.dataset.screenOpen=entry.id;button.setAttribute('aria-label',`Open entry ${slot?'B':'A'}: ${entry.title}`);
      if(entry.previewAvailable===false){const placeholder=document.createElement('span');placeholder.className='screen-placeholder';placeholder.textContent='Preview not captured. Open the frozen build to inspect it.';button.append(placeholder);}
      else{img.src=new URL(`entries/${entry.id}/preview.jpg`,base);img.alt=entry.previewAlt;img.width=960;img.height=600;button.append(img);}
      button.addEventListener('click',()=>open(entry));h.textContent=`${slot?'B':'A'} / ${entry.title}`;model.textContent=hideModel?'Model label hidden':modelName(entry);card.dataset.preferred=String(revealed&&vote===entry.id);card.dataset.tied=String(revealed&&vote==='tie');details.href=new URL(`?entry=${entry.id}#compare-title`,base);details.textContent='Build inspector & personal grade';card.append(button,h,model,details);return card;});
    $('screen-cards').replaceChildren(...cards);
    for(const button of document.querySelectorAll('[data-screen-choice]'))button.disabled=!both;
    $('screen-vote').textContent=error||(revealed?'Models revealed. Choose Next comparison when ready.':both?'Both opened for this comparison. Choose your preference.':'Open both scenes in this comparison to vote.')+(vote?(vote==='tie'?' Saved preference: tie.':vote==='skip'?' Previously skipped.':` Saved preference: entry ${current[0]?.id===vote?'A':'B'}.`):'');
    $('screen-clear').disabled=!both||(!vote&&!hasPublicVote(current));$('screen-storage').textContent=publicVotingEnabled?'New A/B choices are sent anonymously to the public leaderboard. Existing private records and rubric notes are not uploaded.':persistent?'Preferences are saved in this browser only. No public tally.':'Storage unavailable: preferences last for this page session only.';
    $('screen-next').textContent=revealed?'Next comparison':'Next random pair';
    $('screen-next').setAttribute('aria-label',revealed?'Next random comparison; keep saved choice':'Skip to a random prompt and model pair without voting');
    $('screen-reveal').hidden=!revealed;$('screen-reveal-next').hidden=!revealed;$('screen-reveal-next').disabled=!canShuffle;
    if(revealed){
      const result=document.createElement('strong');result.textContent=vote==='tie'?'Your choice: tie':current.some(e=>e.id===vote)?`Your choice: ${vote===current[0].id?'A':'B'}`:'Choice cleared. Models remain revealed.';
      $('screen-reveal').replaceChildren(result,...current.map((entry,slot)=>{const p=document.createElement('p');p.textContent=`${slot?'B':'A'} — ${modelName(entry)}`;return p;}));
    }
    updateLeaderboard();
    changed(source);
  }
  function loadPreviews(){for(const entry of pair()){if(entry.previewAvailable===false||images.has(entry.id))continue;const img=new Image();images.set(entry.id,img);img.onload=()=>render();img.onerror=()=>render();img.src=new URL(`entries/${entry.id}/preview.jpg`,base);}}
  function snapshot(){return {comparisonId,pair:pair().map(e=>e.id),promptId,opened:[...openedThisComparison],blind,revealed,labelsSeenThisComparison};}
  function rememberPair(){const url=new URL(location.href);url.searchParams.set('prompt',promptId);url.searchParams.delete('return');history.replaceState({...history.state,labPair:pairKey(),labPairOrder:pair().map(e=>e.id),labPrompt:promptId,labComparison:snapshot()},'',url);}
  function resetComparison(){comparisonId=crypto.randomUUID();openedThisComparison.clear();revealed=false;labelsSeenThisComparison=false;}
  function step(delta){if(leaving)return;const next=Math.max(0,Math.min(pairs.length-1,index+delta));if(next===index)return;index=next;resetComparison();rememberPair();loadPreviews();render();}
  function nextComparison(){
    if(leaving)return;
    const message=revealed?'Next comparison ready. Your saved preference is unchanged.':'Skipped without recording a vote. A random prompt and model pair are ready.';
    const next=randomComparison(prompts,allEntries,pairKey());if(!next){render();return;}
    selectPrompt(next.promptId,false,next.entries);$('notice').textContent=message;
  }
  async function vote(choice){
    refresh();const current=pair();if(leaving||!bothOpened()||!['a','b','tie'].includes(choice))return;
    const previous=pairKey(),reportedBlind=blind&&!revealed&&!labelsSeenThisComparison&&!record.preferences[pairKey()];record.preferences[previous]={entries:current.map(e=>e.id),choice:choice==='a'?current[0].id:choice==='b'?current[1].id:choice,savedAt:new Date().toISOString()};revealed=true;save();render();$('notice').textContent='Preference saved. Both models are revealed; this comparison stays in place.';
    rememberPair();
    if(publicVotingEnabled){
      publicStatus.set(previous,'Sending your anonymous public preference…');render();
      try{await submitPublicVote(current,record.preferences[previous].choice,reportedBlind);publicStatus.set(previous,'Public preference saved. Repeating this pair replaces the same match.');}
      catch(error){publicStatus.set(previous,'Saved privately; public submission was not confirmed. '+error.message+' Choose again to retry.');}
      if(pairKey()===previous)render();
    }
  }
  function open(entry){
    if(leaving||!entry||!isOpenable(entry))return;
    leaving=true;const returnToControls=$('comparison-dialog').open;
    rememberPair();depart();$('comparison-dialog').close();
    navigation.launch(entry,{...snapshot(),returnToControls,modelLabel:!blind||revealed?modelName(entry):'Model hidden until reveal'});
  }
  function inspect(){if(leaving)return;suspend();refresh();render();$('comparison-dialog').showModal();}
  $('screen-controls').addEventListener('click',inspect);
  $('visit-screen').addEventListener('click',approach);
  $('comparison-dialog').addEventListener('close',()=>{if(!leaving)resume();$('screen-controls').focus({preventScroll:true});});
  $('screen-prev').addEventListener('click',()=>step(-1));$('screen-next').addEventListener('click',()=>nextComparison());
  $('screen-reveal-next').addEventListener('click',()=>nextComparison());
  $('screen-blind').addEventListener('change',e=>{blind=e.target.checked;if(!blind)labelsSeenThisComparison=true;rememberPair();render();});
  for(const button of document.querySelectorAll('[data-screen-choice]'))button.addEventListener('click',()=>vote(button.dataset.screenChoice));
  $('screen-clear').addEventListener('click',async()=>{
    if(leaving||!bothOpened())return;const current=pair(),previous=pairKey(),published=hasPublicVote(current);refresh();delete record.preferences[previous];save();render();
    if(publicVotingEnabled&&published){
      publicStatus.set(previous,'Withdrawing this browser’s public preference…');render();
      try{await submitPublicVote(current,'withdraw',false);publicStatus.set(previous,'Public preference withdrawn.');}
      catch(error){publicStatus.set(previous,'Private choice cleared; public withdrawal was not confirmed. '+error.message);}
      if(pairKey()===previous)render();
    }
  });
  addEventListener('storage',event=>{if(event.key===key){refresh();render();}});
  function hitTest(point){
    const bounds=comparisonLayout.previews.map((rect,slot)=>previewRects[slot]||(pair()[slot]?.previewAvailable===false?rect:null));
    if(leaving||!point||point.x<0||point.y<0||point.x>=comparisonLayout.width||point.y>=comparisonLayout.height||!Number.isFinite(point.x)||!Number.isFinite(point.y))return null;
    const hit=comparisonTargetAt(point,bounds)||{kind:'inspect'};
    if(hit.kind==='entry'){const entry=pair()[hit.slot];return entry?{...hit,key:'entry:'+entry.id}:null;}
    if(hit.kind==='vote'&&!bothOpened()||hit.kind==='previous'&&index===0||hit.kind==='next'&&!canShuffle)return null;
    return {...hit,key:hit.kind+(hit.choice?':'+hit.choice:'')};
  }
  function activate(point){const hit=hitTest(point);if(!hit)return;
    if(hit.kind==='entry')open(pair()[hit.slot]);else if(hit.kind==='previous')step(-1);else if(hit.kind==='next')nextComparison();else if(hit.kind==='vote')vote(hit.choice);else if(hit.kind==='inspect')inspect();else if(hit.kind==='leaderboard')showLeaderboard();
  }
  function showLeaderboard(){inspect();const target=$(publicVotingEnabled?'screen-public-leaderboard':'screen-leaderboard');target.tabIndex=-1;target.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:'auto'});}
  $('screen-leaderboard-button').addEventListener('click',showLeaderboard);
  subscribePublicJudgments(()=>renderPublicLeaderboard($('screen-public-leaderboard')));
  renderPublicLeaderboard($('screen-public-leaderboard'));loadPublicLeaderboard();
  render();
  function selectPrompt(id,restore=false,chosenPair=null,entryId=null){
    resetComparison();
    const prompt=prompts.find(p=>p.id===id)||prompts[0];promptId=prompt.id;entries=allEntries.filter(e=>e.promptId===promptId&&isOpenable(e));pairs=[];
    for(let i=0;i<entries.length;i++)for(let j=i+1;j<entries.length;j++)pairs.push([entries[i],entries[j]]);
    index=chosenPair?Math.max(0,pairs.findIndex(pair=>comparisonKey(pair)===comparisonKey(chosenPair))):entryId?Math.max(0,pairs.findIndex(pair=>pair.some(e=>e.id===entryId))):restore?Math.max(0,pairs.findIndex(pair=>comparisonKey(pair)===history.state?.labPair)):0;
    const order=chosenPair?.map(e=>e.id)||(restore?history.state?.labPairOrder:null);
    if(pairs[index]&&Array.isArray(order)&&order.length===2&&order[0]!==order[1]&&order.every(id=>pairs[index].some(e=>e.id===id)))pairs[index]=order.map(id=>pairs[index].find(e=>e.id===id));
    if(restore)restoreSnapshot(history.state?.labComparison);
    $('screen-prompt').value=promptId;rememberPair();loadPreviews();render();
  }
  function restoreSnapshot(saved){
    if(!saved?.comparisonId||saved.promptId!==promptId||!Array.isArray(saved.pair)||saved.pair.join('::')!==pair().map(e=>e.id).join('::'))return;
    comparisonId=saved.comparisonId;openedThisComparison.clear();
    for(const id of saved.opened||[])if(pair().some(e=>e.id===id))openedThisComparison.add(id);
    blind=saved.blind!==false;revealed=saved.revealed===true;labelsSeenThisComparison=saved.labelsSeenThisComparison===true;$('screen-blind').checked=blind;
  }
  function receiveReturn(visit=navigation.receipt()){
    leaving=false;
    if(!visit||visit.comparisonId!==comparisonId||visit.pair.join('::')!==pair().map(e=>e.id).join('::'))return;
    if(visit.ready){openedThisComparison.add(visit.entryId);refresh();record.opened[visit.entryId]=new Date().toISOString();save();}
    rememberPair();render();
    if(visit.returnToControls)inspect();else if(returned)returned();else $('screen-controls').focus({preventScroll:true});
  }
  addEventListener('pageshow',event=>{if(event.persisted){receiveReturn();refresh();render();}});
  $('screen-prompt').addEventListener('change',()=>selectPrompt($('screen-prompt').value));
  fetch(new URL('entries.json',base),{credentials:'omit'}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{
    allEntries=data.entries;if(!Array.isArray(allEntries)||allEntries.some(e=>!/^[a-z0-9-]+$/.test(e.id)||!/^[a-f0-9]{64}$/.test(e.htmlSha256)))throw Error();prompts=data.prompts;canShuffle=hasRandomComparison(prompts,allEntries);
    $('screen-prompt').replaceChildren(...prompts.map(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=`${p.id} / ${p.title}`;return o;}));
    const params=new URLSearchParams(location.search),requestedEntry=allEntries.find(e=>e.id===params.get('entry')),visit=navigation.receipt();
    if(!initialPrompt&&visit&&!history.state?.labComparison)history.replaceState({...history.state,labPrompt:visit.promptId,labPairOrder:visit.pair,labPair:visit.pair.slice().sort().join('::'),labComparison:visit},'');
    if(initialPrompt)selectPrompt(initialPrompt);
    else if(history.state?.labPrompt)selectPrompt(history.state.labPrompt,true);
    else if(requestedEntry)selectPrompt(requestedEntry.promptId,false,null,requestedEntry.id);
    else if(params.has('prompt'))selectPrompt(params.get('prompt'));
    else {const initial=randomComparison(prompts,allEntries);selectPrompt(initial?.promptId||prompts[0]?.id,false,initial?.entries);}
    if(!initialPrompt)receiveReturn(visit);
  }).catch(()=>{error='The entry index could not load. Use the standalone benchmark link or reload.';render();});
  return {source,hitTest,activate,inspect,get ready(){return entries.length>0&&(!initialPrompt||pair().every(entry=>entry.previewAvailable===false||images.get(entry.id)?.complete));}};
}
