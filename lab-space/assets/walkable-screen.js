import {createViewer} from '../../walkable-3d/assets/viewer.js';

// This canvas contains only two JPEG stills and host controls. No entrant runs here.
export function createWalkableScreen({changed,suspend,resume,approach}) {
  const $=id=>document.getElementById(id),base=new URL('../../walkable-3d/',import.meta.url);
  const source=document.createElement('canvas');source.width=1280;source.height=600;
  const ctx=source.getContext('2d'),images=new Map(),key='lab.walkable3d.judgments.v1';
  let entries=[],allEntries=[],prompts=[],promptId='01',pairs=[],index=0,blind=true,record={version:1,grades:{},preferences:{},opened:{}},persistent=true,error='';
  function refresh(){try{const old=JSON.parse(localStorage.getItem(key));if(old?.version===1)for(const field of ['grades','preferences','opened'])if(old[field]&&typeof old[field]==='object'&&!Array.isArray(old[field]))record[field]=old[field];}catch{persistent=false;}}
  refresh();try{localStorage.setItem(key,JSON.stringify(record));}catch{persistent=false;}
  const pair=()=>pairs[index]||entries.slice(0,1),pairKey=()=>pair().map(e=>e.id).sort().join('::');
  const save=()=>{try{localStorage.setItem(key,JSON.stringify(record));}catch{persistent=false;}};
  const viewer=createViewer({base,onOpen:suspend,onReady(entry){refresh();record.opened[entry.id]=new Date().toISOString();save();render();},onClose(){render();resume();}});
  function box(x,y,w,h,label,disabled=false){ctx.fillStyle=disabled?'#41584b':'#f3efdf';ctx.fillRect(x,y,w,h);ctx.fillStyle=disabled?'#bec9be':'#1c3c30';ctx.font='24px Arial';ctx.textAlign='center';ctx.fillText(label,x+w/2,y+h/2+8);}
  function render(){
    const current=pair(),both=current.length===2&&current.every(e=>record.opened[e.id]);
    const vote=record.preferences[pairKey()]?.choice;
    const choiceLabel=vote?(vote==='skip'?' · SKIPPED':vote==='tie'?' · YOUR CHOICE: TIE':` · YOUR CHOICE: ${vote===current[0]?.id?'A':'B'}`):'';
    ctx.fillStyle='#193b31';ctx.fillRect(0,0,1280,600);ctx.fillStyle='#f5efd9';ctx.textAlign='left';ctx.font='31px Georgia';ctx.fillText('WALKABLE WORLDS',40,49);ctx.font='20px Arial';ctx.textAlign='right';ctx.fillText(pairs.length?`PAIR ${index+1} / ${pairs.length}${choiceLabel}`:'WAITING FOR ENTRIES',1240,48);
    ctx.textAlign='left';ctx.font='19px Arial';ctx.fillStyle='#c4d3c3';ctx.fillText(`${(prompts.find(p=>p.id===promptId)?.title||'Autumn station').toUpperCase()}  /  STATIC PREVIEWS  /  CLICK TO EXPLORE`,40,82);
    for(let slot=0;slot<2;slot++){
      const x=40+slot*625,e=current[slot];ctx.fillStyle='#2f4c3e';ctx.fillRect(x,105,575,322);
      const img=e&&images.get(e.id);if(img?.complete&&img.naturalWidth){const scale=Math.min(575/img.width,322/img.height),w=img.width*scale,h=img.height*scale;ctx.drawImage(img,x+(575-w)/2,105+(322-h)/2,w,h);}
      ctx.fillStyle='#f6f0dc';ctx.font='25px Georgia';ctx.fillText(e?`${slot?'B':'A'}  /  ${e.title}`:'Awaiting a finished build',x,461,565);
      ctx.fillStyle='#c4d3c3';ctx.font='17px Arial';ctx.fillText(e?(blind?'Model label hidden · Desktop keyboard + mouse':e.requestedConfiguration):'A real pair needs two entries.',x,491,565);
    }
    box(40,522,100,48,'←',index===0);box(1140,522,100,48,'→',index>=pairs.length-1);
    box(180,522,230,48,'Prefer A',!both);box(450,522,170,48,'Tie',!both);box(660,522,230,48,'Prefer B',!both);box(930,522,170,48,'Inspect');
    $('screen-prompt-label').textContent=`North-wall screen / Prompt ${promptId}`;
    $('screen-full-prompt').href=new URL(`?prompt=${promptId}#full-prompt`,base);$('screen-notebook').href=new URL(`?prompt=${promptId}`,base);
    $('screen-pair').textContent=pairs.length?`Comparison ${index+1} of ${pairs.length}`:'Waiting for a second finished entry';
    $('screen-prev').disabled=index===0;$('screen-next').disabled=index>=pairs.length-1;
    const failed=allEntries.filter(e=>e.promptId===promptId&&e.availability==='failed').length;
    $('screen-boundary').textContent=(pairs.length<2?'No other comparisons yet.':index===0?'First comparison.':index===pairs.length-1?'Last comparison.':'')+(failed?` ${failed} completed build failed at startup; inspect its record in the notebook.`:'');
    const cards=current.map((entry,slot)=>{const card=document.createElement('article'),button=document.createElement('button'),img=document.createElement('img'),h=document.createElement('h3'),model=document.createElement('p'),details=document.createElement('a');
      button.type='button';button.dataset.screenOpen=entry.id;button.setAttribute('aria-label',`Open entry ${slot?'B':'A'}: ${entry.title}`);img.src=new URL(`entries/${entry.id}/preview.jpg`,base);img.alt=entry.previewAlt;img.width=960;img.height=600;button.append(img);button.addEventListener('click',()=>open(entry));h.textContent=`${slot?'B':'A'} / ${entry.title}`;model.textContent=blind?'Model label hidden':entry.requestedConfiguration;details.href=new URL(`?entry=${entry.id}#compare-title`,base);details.textContent='Build inspector & personal grade';card.append(button,h,model,details);return card;});
    $('screen-cards').replaceChildren(...cards);
    for(const button of document.querySelectorAll('[data-screen-choice]'))button.disabled=!both;
    $('screen-vote').textContent=error||(!vote?(both?'Both opened. Choose your preference.':'Open both scenes to record a preference.'):vote==='tie'?'Your preference: tie.':vote==='skip'?'This pair is skipped.':`Your preference: entry ${current[0]?.id===vote?'A':'B'}.`);
    $('screen-clear').disabled=!vote;$('screen-storage').textContent=persistent?'Preferences are saved in this browser only. No public tally.':'Storage unavailable: preferences last for this page session only.';
    changed(source);
  }
  function loadPreviews(){for(const entry of pair()){if(images.has(entry.id))continue;const img=new Image();images.set(entry.id,img);img.onload=()=>render();img.onerror=()=>render();img.src=new URL(`entries/${entry.id}/preview.jpg`,base);}}
  function step(delta){const next=Math.max(0,Math.min(pairs.length-1,index+delta));if(next===index)return;index=next;history.replaceState({...history.state,labPair:pairKey(),labPrompt:promptId},'');loadPreviews();render();}
  function vote(choice){refresh();const current=pair();if(current.length!==2||!current.every(e=>record.opened[e.id]))return;record.preferences[pairKey()]={entries:current.map(e=>e.id),choice:choice==='a'?current[0].id:choice==='b'?current[1].id:choice,savedAt:new Date().toISOString()};save();render();}
  function open(entry){if(!entry)return;$('comparison-dialog').close();viewer.open(entry,$('screen-controls'));}
  function inspect(){suspend();refresh();render();$('comparison-dialog').showModal();}
  $('screen-controls').addEventListener('click',inspect);
  $('visit-screen').addEventListener('click',approach);
  $('comparison-dialog').addEventListener('close',()=>{if(!viewer.isOpen)resume();$('screen-controls').focus({preventScroll:true});});
  $('screen-prev').addEventListener('click',()=>step(-1));$('screen-next').addEventListener('click',()=>step(1));
  $('screen-blind').addEventListener('change',e=>{blind=e.target.checked;render();});
  for(const button of document.querySelectorAll('[data-screen-choice]'))button.addEventListener('click',()=>vote(button.dataset.screenChoice));
  $('screen-clear').addEventListener('click',()=>{refresh();delete record.preferences[pairKey()];save();render();});
  addEventListener('storage',event=>{if(event.key===key){refresh();render();}});
  function activate({x,y}){if(y>=522&&y<=580){if(x<145)step(-1);else if(x>1135)step(1);else if(x<415)vote('a');else if(x<625)vote('tie');else if(x<895)vote('b');else inspect();}else if(y>=105&&y<500)open(pair()[x<640?0:1]);else inspect();}
  render();
  function selectPrompt(id,restore=false){
    const prompt=prompts.find(p=>p.id===id)||prompts[0];promptId=prompt.id;entries=allEntries.filter(e=>e.promptId===promptId&&e.availability!=='failed');pairs=[];
    for(let i=0;i<entries.length;i++)for(let j=i+1;j<entries.length;j++)pairs.push([entries[i],entries[j]]);
    index=restore?Math.max(0,pairs.findIndex(pair=>pair.map(e=>e.id).sort().join('::')===history.state?.labPair)):0;
    $('screen-prompt').value=promptId;history.replaceState({...history.state,labPair:pairKey(),labPrompt:promptId},'');loadPreviews();render();
  }
  $('screen-prompt').addEventListener('change',()=>selectPrompt($('screen-prompt').value));
  fetch(new URL('entries.json',base),{credentials:'omit'}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{
    allEntries=data.entries;if(!Array.isArray(allEntries)||allEntries.some(e=>!/^[a-z0-9-]+$/.test(e.id)||!/^[a-f0-9]{64}$/.test(e.htmlSha256)))throw Error();prompts=data.prompts;
    $('screen-prompt').replaceChildren(...prompts.map(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=`${p.id} / ${p.title}`;return o;}));
    selectPrompt(history.state?.labPrompt||new URLSearchParams(location.search).get('prompt')||'01',true);
  }).catch(()=>{error='The entry index could not load. Use the standalone benchmark link or reload.';render();});
  return {source,activate,inspect,get ready(){return entries.length>0;}};
}
