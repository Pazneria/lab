import {createViewer} from '../../walkable-3d/assets/viewer.js';
import {createGradeForm,renderLeaderboard} from '../../walkable-3d/assets/judgments.js';
import {comparisonKey,randomComparison,hasRandomComparison,isOpenable} from '../../walkable-3d/assets/comparisons.js';
import {publicVotingEnabled,submitPublicVote,hasPublicVote,loadPublicLeaderboard,renderPublicLeaderboard,subscribePublicJudgments} from '../../walkable-3d/assets/public-judgments.js';

// This canvas contains only two JPEG stills and host controls. No entrant runs here.
export function createWalkableScreen({changed,suspend,resume,approach}) {
  const $=id=>document.getElementById(id),base=new URL('../../walkable-3d/',import.meta.url);
  const source=document.createElement('canvas');source.width=1280;source.height=600;
  const ctx=source.getContext('2d'),images=new Map(),key='lab.walkable3d.judgments.v1';
  let entries=[],allEntries=[],prompts=[],promptId='01',pairs=[],index=0,blind=true,record={version:1,grades:{},preferences:{},opened:{}},persistent=true,error='';
  const openedThisComparison=new Set();
  const publicStatus=new Map();
  let canShuffle=false,revealed=false,labelsSeenThisComparison=false;
  function refresh(){if(!persistent)return;try{const old=JSON.parse(localStorage.getItem(key));if(old?.version===1)for(const field of ['grades','preferences','opened'])if(old[field]&&typeof old[field]==='object'&&!Array.isArray(old[field]))record[field]=old[field];}catch{persistent=false;}}
  refresh();try{localStorage.setItem(key,JSON.stringify(record));}catch{persistent=false;}
  const pair=()=>pairs[index]||entries.slice(0,1),pairKey=()=>comparisonKey(pair());
  const save=()=>{try{localStorage.setItem(key,JSON.stringify(record));}catch{persistent=false;}};
  const bothOpened=()=>pair().length===2&&pair().every(e=>openedThisComparison.has(e.id));
  function updateLeaderboard(){renderLeaderboard($('screen-leaderboard'),allEntries,record,persistent);}
  function gradeForm(entry){return createGradeForm(entry,{getRecord:()=>record,refresh,save,isPersistent:()=>persistent,onChange:updateLeaderboard});}
  const viewer=createViewer({base,gradeForm,gradeLabelFor:entry=>`${pair()[0]?.id===entry.id?'A':'B'} / ${entry.title} — ${!blind||revealed?entry.requestedConfiguration:'Model hidden until reveal'}`,onOpen:suspend,onReady(entry){if(pair().some(e=>e.id===entry.id))openedThisComparison.add(entry.id);refresh();record.opened[entry.id]=new Date().toISOString();save();render();},onClose(){render();resume();}});
  function box(x,y,w,h,label,disabled=false){ctx.fillStyle=disabled?'#41584b':'#f3efdf';ctx.fillRect(x,y,w,h);ctx.fillStyle=disabled?'#bec9be':'#1c3c30';ctx.font='24px Arial';ctx.textAlign='center';ctx.fillText(label,x+w/2,y+h/2+8);}
  function render(){
    const current=pair(),both=bothOpened(),hideModel=blind&&!revealed;
    $('screen-public-vote').textContent=publicStatus.get(pairKey())||'';
    const vote=record.preferences[pairKey()]?.choice;
    const choiceLabel=vote?(vote==='skip'?' · SKIPPED':vote==='tie'?' · YOUR CHOICE: TIE':` · YOUR CHOICE: ${vote===current[0]?.id?'A':'B'}`):'';
    ctx.fillStyle='#193b31';ctx.fillRect(0,0,1280,600);ctx.fillStyle='#f5efd9';ctx.textAlign='left';ctx.font='31px Georgia';ctx.fillText('WALKABLE WORLDS',40,49);ctx.font='20px Arial';ctx.textAlign='right';ctx.fillText(pairs.length?`PAIR ${index+1} / ${pairs.length}${choiceLabel}`:'WAITING FOR ENTRIES',1240,48);
    ctx.textAlign='left';ctx.font='19px Arial';ctx.fillStyle='#c4d3c3';ctx.fillText(`${(prompts.find(p=>p.id===promptId)?.title||'Autumn station').toUpperCase()}  /  STATIC PREVIEWS  /  CLICK TO EXPLORE`,40,82);
    for(let slot=0;slot<2;slot++){
      const x=40+slot*625,e=current[slot];ctx.fillStyle='#2f4c3e';ctx.fillRect(x,105,575,322);
      const img=e&&images.get(e.id);if(img?.complete&&img.naturalWidth){const scale=Math.min(575/img.width,322/img.height),w=img.width*scale,h=img.height*scale;ctx.drawImage(img,x+(575-w)/2,105+(322-h)/2,w,h);}
      else if(e?.previewAvailable===false){ctx.fillStyle='#f6f0dc';ctx.font='28px Georgia';ctx.fillText('Preview not captured',x+32,232,510);ctx.font='18px Arial';ctx.fillText('Click to inspect the frozen build.',x+32,271,510);ctx.fillText('Host runtime QA has not been run.',x+32,302,510);}
      ctx.fillStyle='#f6f0dc';ctx.font='25px Georgia';ctx.fillText(e?`${slot?'B':'A'}  /  ${e.title}`:'Awaiting a finished build',x,461,565);
      ctx.fillStyle='#c4d3c3';ctx.font='17px Arial';ctx.fillText(e?((e.completionStatus==='partial'?'Partial handoff · ':'')+(hideModel?'Model label hidden · Desktop keyboard + mouse':e.requestedConfiguration)+(e.availability==='unverified'?' · Runtime unverified':'')):'A real pair needs two entries.',x,491,565);
    }
    box(40,522,100,48,'←',index===0);box(1140,522,100,48,'Next',!canShuffle);
    box(180,522,230,48,'Prefer A',!both);box(450,522,170,48,'Tie',!both);box(660,522,230,48,'Prefer B',!both);box(930,522,170,48,'Inspect');
    $('screen-prompt-label').textContent=`Worlds exhibit / Prompt ${promptId}`;
    $('screen-full-prompt').href=new URL(`?prompt=${promptId}#full-prompt`,base);$('screen-notebook').href=new URL(`?prompt=${promptId}`,base);
    $('screen-pair').textContent=pairs.length?`Comparison ${index+1} of ${pairs.length}`:'Waiting for a second finished entry';
    $('screen-prev').disabled=index===0;$('screen-next').disabled=!canShuffle;
    const failed=allEntries.filter(e=>e.promptId===promptId&&e.availability==='failed').length;
    const unverified=entries.filter(e=>e.availability==='unverified').length;
    const partial=entries.filter(e=>e.completionStatus==='partial').length;
    $('screen-boundary').textContent=(canShuffle?(revealed?'Your choice and both model labels remain visible. Next comparison uses the random picker.':'Next skips to a random prompt and model pair without recording a vote.'):'Waiting for two admitted models to compare.')+(unverified?` ${unverified} ${unverified===1?'entry has':'entries have'} no independent host runtime verification. Inspect producer evidence and limitations in the notebook.`:'')+(partial?` Includes ${partial} partial handoff stopped early; no completion or repair was made.`:'')+(failed?` ${failed} saved result failed at startup; inspect its record in the notebook.`:'');
    const cards=current.map((entry,slot)=>{const card=document.createElement('article'),button=document.createElement('button'),img=document.createElement('img'),h=document.createElement('h3'),model=document.createElement('p'),details=document.createElement('a');
      button.type='button';button.dataset.screenOpen=entry.id;button.setAttribute('aria-label',`Open entry ${slot?'B':'A'}: ${entry.title}`);
      if(entry.previewAvailable===false){const placeholder=document.createElement('span');placeholder.className='screen-placeholder';placeholder.textContent='Preview not captured. Open the frozen build to inspect it.';button.append(placeholder);}
      else{img.src=new URL(`entries/${entry.id}/preview.jpg`,base);img.alt=entry.previewAlt;img.width=960;img.height=600;button.append(img);}
      button.addEventListener('click',()=>open(entry));h.textContent=`${slot?'B':'A'} / ${entry.title}`;model.textContent=(entry.completionStatus==='partial'?'Partial handoff · ':'')+(hideModel?'Model label hidden':entry.requestedConfiguration)+(entry.availability==='unverified'?' · Runtime unverified':'');card.dataset.preferred=String(revealed&&vote===entry.id);card.dataset.tied=String(revealed&&vote==='tie');details.href=new URL(`?entry=${entry.id}#compare-title`,base);details.textContent='Build inspector & personal grade';card.append(button,h,model,details);return card;});
    $('screen-cards').replaceChildren(...cards);
    for(const button of document.querySelectorAll('[data-screen-choice]'))button.disabled=!both;
    $('screen-vote').textContent=error||(revealed?'Models revealed. Choose Next comparison when ready.':both?'Both opened for this comparison. Choose your preference.':'Open both scenes in this comparison to vote.')+(vote?(vote==='tie'?' Saved preference: tie.':vote==='skip'?' Previously skipped.':` Saved preference: entry ${current[0]?.id===vote?'A':'B'}.`):'');
    $('screen-clear').disabled=!both||(!vote&&!hasPublicVote(current));$('screen-storage').textContent=publicVotingEnabled?'New A/B choices are sent anonymously to the public leaderboard. Existing private records and rubric notes are not uploaded.':persistent?'Preferences are saved in this browser only. No public tally.':'Storage unavailable: preferences last for this page session only.';
    $('screen-next').textContent=revealed?'Next comparison':'Next random pair';
    $('screen-next').setAttribute('aria-label',revealed?'Next random comparison; keep saved choice':'Skip to a random prompt and model pair without voting');
    $('screen-reveal').hidden=!revealed;$('screen-reveal-next').hidden=!revealed;$('screen-reveal-next').disabled=!canShuffle;
    if(revealed){
      const result=document.createElement('strong');result.textContent=vote==='tie'?'Your choice: tie':current.some(e=>e.id===vote)?`Your choice: ${vote===current[0].id?'A':'B'}`:'Choice cleared. Models remain revealed.';
      $('screen-reveal').replaceChildren(result,...current.map((entry,slot)=>{const p=document.createElement('p');p.textContent=`${slot?'B':'A'} / ${entry.title} — ${entry.requestedConfiguration}`;return p;}));
    }
    updateLeaderboard();
    changed(source);
  }
  function loadPreviews(){for(const entry of pair()){if(entry.previewAvailable===false||images.has(entry.id))continue;const img=new Image();images.set(entry.id,img);img.onload=()=>render();img.onerror=()=>render();img.src=new URL(`entries/${entry.id}/preview.jpg`,base);}}
  function rememberPair(){const url=new URL(location.href);url.searchParams.set('prompt',promptId);history.replaceState({...history.state,labPair:pairKey(),labPairOrder:pair().map(e=>e.id),labPrompt:promptId},'',url);}
  function step(delta){const next=Math.max(0,Math.min(pairs.length-1,index+delta));if(next===index)return;index=next;openedThisComparison.clear();revealed=false;labelsSeenThisComparison=false;rememberPair();loadPreviews();render();}
  function nextComparison(){
    const message=revealed?'Next comparison ready. Your saved preference is unchanged.':'Skipped without recording a vote. A random prompt and model pair are ready.';
    const next=randomComparison(prompts,allEntries,pairKey());if(!next){render();return;}
    if(viewer.isOpen)viewer.close(false);
    selectPrompt(next.promptId,false,next.entries);$('notice').textContent=message;
  }
  async function vote(choice){
    refresh();const current=pair();if(!bothOpened()||!['a','b','tie'].includes(choice))return;
    const previous=pairKey(),reportedBlind=blind&&!revealed&&!labelsSeenThisComparison&&!record.preferences[pairKey()];record.preferences[previous]={entries:current.map(e=>e.id),choice:choice==='a'?current[0].id:choice==='b'?current[1].id:choice,savedAt:new Date().toISOString()};revealed=true;save();render();$('notice').textContent='Preference saved. Both models are revealed; this comparison stays in place.';
    if(publicVotingEnabled){
      publicStatus.set(previous,'Sending your anonymous public preference…');render();
      try{await submitPublicVote(current,record.preferences[previous].choice,reportedBlind);publicStatus.set(previous,'Public preference saved. Repeating this pair replaces the same match.');}
      catch(error){publicStatus.set(previous,'Saved privately; public submission was not confirmed. '+error.message+' Choose again to retry.');}
      if(pairKey()===previous)render();
    }
  }
  function open(entry){if(!entry)return;$('comparison-dialog').close();viewer.open(entry,$('screen-controls'));}
  function inspect(){suspend();refresh();render();$('comparison-dialog').showModal();}
  $('screen-controls').addEventListener('click',inspect);
  $('visit-screen').addEventListener('click',approach);
  $('comparison-dialog').addEventListener('close',()=>{if(!viewer.isOpen)resume();$('screen-controls').focus({preventScroll:true});});
  $('screen-prev').addEventListener('click',()=>step(-1));$('screen-next').addEventListener('click',()=>nextComparison());
  $('screen-reveal-next').addEventListener('click',()=>nextComparison());
  $('screen-blind').addEventListener('change',e=>{blind=e.target.checked;if(!blind)labelsSeenThisComparison=true;render();});
  for(const button of document.querySelectorAll('[data-screen-choice]'))button.addEventListener('click',()=>vote(button.dataset.screenChoice));
  $('screen-clear').addEventListener('click',async()=>{
    if(!bothOpened())return;const current=pair(),previous=pairKey(),published=hasPublicVote(current);refresh();delete record.preferences[previous];save();render();
    if(publicVotingEnabled&&published){
      publicStatus.set(previous,'Withdrawing this browser’s public preference…');render();
      try{await submitPublicVote(current,'withdraw',false);publicStatus.set(previous,'Public preference withdrawn.');}
      catch(error){publicStatus.set(previous,'Private choice cleared; public withdrawal was not confirmed. '+error.message);}
      if(pairKey()===previous)render();
    }
  });
  addEventListener('storage',event=>{if(event.key===key){refresh();render();}});
  function activate({x,y}){if(y>=522&&y<=580){if(x<145)step(-1);else if(x>1135)nextComparison();else if(x<415)vote('a');else if(x<625)vote('tie');else if(x<895)vote('b');else inspect();}else if(y>=105&&y<500)open(pair()[x<640?0:1]);else inspect();}
  subscribePublicJudgments(()=>renderPublicLeaderboard($('screen-public-leaderboard')));
  renderPublicLeaderboard($('screen-public-leaderboard'));loadPublicLeaderboard();
  render();
  function selectPrompt(id,restore=false,chosenPair=null){
    openedThisComparison.clear();revealed=false;labelsSeenThisComparison=false;
    const prompt=prompts.find(p=>p.id===id)||prompts[0];promptId=prompt.id;entries=allEntries.filter(e=>e.promptId===promptId&&isOpenable(e));pairs=[];
    for(let i=0;i<entries.length;i++)for(let j=i+1;j<entries.length;j++)pairs.push([entries[i],entries[j]]);
    index=chosenPair?Math.max(0,pairs.findIndex(pair=>comparisonKey(pair)===comparisonKey(chosenPair))):restore?Math.max(0,pairs.findIndex(pair=>comparisonKey(pair)===history.state?.labPair)):0;
    const order=chosenPair?.map(e=>e.id)||(restore?history.state?.labPairOrder:null);
    if(pairs[index]&&Array.isArray(order)&&order.length===2&&order[0]!==order[1]&&order.every(id=>pairs[index].some(e=>e.id===id)))pairs[index]=order.map(id=>pairs[index].find(e=>e.id===id));
    $('screen-prompt').value=promptId;rememberPair();loadPreviews();render();
  }
  $('screen-prompt').addEventListener('change',()=>selectPrompt($('screen-prompt').value));
  fetch(new URL('entries.json',base),{credentials:'omit'}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{
    allEntries=data.entries;if(!Array.isArray(allEntries)||allEntries.some(e=>!/^[a-z0-9-]+$/.test(e.id)||!/^[a-f0-9]{64}$/.test(e.htmlSha256)))throw Error();prompts=data.prompts;canShuffle=hasRandomComparison(prompts,allEntries);
    $('screen-prompt').replaceChildren(...prompts.map(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=`${p.id} / ${p.title}`;return o;}));
    selectPrompt(history.state?.labPrompt||new URLSearchParams(location.search).get('prompt')||'01',true);
  }).catch(()=>{error='The entry index could not load. Use the standalone benchmark link or reload.';render();});
  return {source,activate,inspect,get ready(){return entries.length>0;}};
}
