import {validateManifest,safeAssetPath,createComparisonState,DEFAULT_CAMERA} from './contracts.mjs';
export function inspectableEntry(catalog,id){
 const e=catalog.entries.find(e=>e.id===id);
 return e&&safeAssetPath(e.asset?.path)&&e.admission?.frozen===true&&e.admission?.selfContained===true?e:null;
}
export async function bootInspection({document,window,location,fetch,loadViewer=()=>import('./viewer.mjs')}){
 const $=id=>document.getElementById(id),surface=$('surface'),state=createComparisonState();
 const controls=[$('mode'),$('light'),$('grid'),$('reset'),...document.querySelectorAll('[data-view]')];
 let entry=null,engine=null,ready=false,loading=false,serial=0;const pointers=new Map();
 function status(kind,text){ready=kind==='ready';$('status').textContent=text;surface.setAttribute('aria-busy',String(kind==='loading'));controls.forEach(c=>c.disabled=!ready);}
 function stop(){serial++;loading=false;engine?.dispose();engine=null;pointers.clear();$('load').disabled=!entry;status('paused','View unloaded. Select Load 3D view to resume.');}
 function camera(value){if(ready){state.setCamera(0,value);engine?.invalidate();}}
 async function load(){
  if(!entry||loading||document.hidden)return;loading=true;$('load').disabled=true;const run=++serial;
  status('loading','Verifying the original file and loading the view.');
  try{
   engine?.dispose();engine=null;
   {const {createViewer}=await loadViewer();if(run!==serial||document.hidden)return;
    const created=createViewer({mount:$('stages'),surfaces:[surface],state,onStatus(side,kind,text){if(run===serial)status(kind,text);},onFailure(text){if(run===serial){engine=null;status('error',text);}}});engine=created;
    engine.setMode($('mode').value);engine.setLight($('light').value);engine.setGrid($('grid').getAttribute('aria-pressed')==='true');
   }
   await engine.loadPair([entry],state.snapshot.generation);
  }catch(error){if(run===serial){engine?.dispose();engine=null;status('error',error.message);}}
  finally{if(run===serial){loading=false;$('load').disabled=false;}}
 }
 $('load').addEventListener('click',load);
 $('mode').addEventListener('change',()=>engine?.setMode($('mode').value));
 $('light').addEventListener('input',()=>engine?.setLight($('light').value));
 $('grid').addEventListener('click',()=>{const on=$('grid').getAttribute('aria-pressed')!=='true';$('grid').setAttribute('aria-pressed',String(on));engine?.setGrid(on);});
 $('reset').addEventListener('click',()=>camera({...DEFAULT_CAMERA}));
 document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.view;camera(v==='face'?{...DEFAULT_CAMERA,distance:1.65,targetY:.58}:v==='back'?{...DEFAULT_CAMERA,yaw:Math.PI}:v==='side'?{...DEFAULT_CAMERA,yaw:Math.PI/2}:v==='top'?{...DEFAULT_CAMERA,pitch:1.35}:{...DEFAULT_CAMERA});}));
 const distance=()=>{const [a,b]=[...pointers.values()];return a&&b?Math.hypot(a.x-b.x,a.y-b.y):0;};
 surface.addEventListener('pointerdown',e=>{if(!ready||e.button!==0)return;surface.focus({preventScroll:true});surface.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});e.preventDefault();});
 surface.addEventListener('pointermove',e=>{const prior=pointers.get(e.pointerId);if(!prior||!ready)return;const before=distance();pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});const after=distance(),c=state.snapshot.cameras[0];camera(pointers.size===2&&before&&after?{...c,distance:c.distance*before/after}:{...c,yaw:c.yaw-(e.clientX-prior.x)*.009,pitch:c.pitch+(e.clientY-prior.y)*.007});e.preventDefault();});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])surface.addEventListener(event,e=>pointers.delete(e.pointerId));
 surface.addEventListener('wheel',e=>{if(!ready)return;const c=state.snapshot.cameras[0],delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?surface.clientHeight:1);camera({...c,distance:c.distance*Math.exp(Math.max(-100,Math.min(100,delta))*.0025)});e.preventDefault();},{passive:false});
 surface.addEventListener('keydown',e=>{if(!ready)return;const c={...state.snapshot.cameras[0]};if(e.key==='ArrowLeft')c.yaw+=.12;else if(e.key==='ArrowRight')c.yaw-=.12;else if(e.key==='ArrowUp')c.pitch+=.08;else if(e.key==='ArrowDown')c.pitch-=.08;else if(['+','='].includes(e.key))c.distance*=.9;else if(['-','_'].includes(e.key))c.distance*=1.1;else if(e.key==='Home')Object.assign(c,DEFAULT_CAMERA);else return;camera(c);e.preventDefault();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.addEventListener('pagehide',stop);
 try{
  const response=await fetch('data/admission.json',{cache:'no-cache',redirect:'error'});if(!response.ok)throw Error('Could not load the attempt catalog.');
  const catalog=validateManifest(await response.json());entry=inspectableEntry(catalog,new URL(location.href).searchParams.get('attempt'));if(!entry)throw Error('This attempt has no available frozen GLB.');
  const prompt=catalog.prompts.find(p=>p.id===entry.promptId);$('title').textContent=prompt.title;$('model').textContent=entry.provenance.modelLabel;
  $('disclosure').textContent=(entry.votingAvailable===false?(entry.votingUnavailableReason||'Public voting is unavailable for this attempt.')+' ':'')+(entry.comparisonEligible===false?'Prompt mapping is unresolved; this attempt is excluded from comparisons. ':'')+(entry.provenance.limitations||[]).join(' ');
  $('record').href='results.html?attempt='+encodeURIComponent(entry.id);$('download').href=entry.asset.path;$('download').hidden=false;state.setPair([entry]);$('load').disabled=false;
 }catch(error){status('error',error.message);}
 return {state,load,stop,get entry(){return entry;}};
}
if(typeof document!=='undefined')bootInspection({document,window,location,fetch});
