import {returnToLab} from '../../navigation.mjs';
import {createStudioModes} from '../../modes.mjs';
const host$=id=>document.getElementById(id);
let authoringReady=null;
function ensureHumanStudy(){
 if(authoringReady)return authoringReady;
 const frame=host$('humanStudyFrame');
 const attempt=new Promise((resolve,reject)=>{
  let settled=false,timer;
  const cleanup=()=>{clearTimeout(timer);frame.onload=null;frame.onerror=null;};
  const fail=error=>{if(settled)return;settled=true;cleanup();
   // A fresh iframe isolates a retry from late events/scripts of the failed load.
   const replacement=frame.cloneNode(false);replacement.removeAttribute('srcdoc');frame.replaceWith(replacement);reject(error);
  };
  frame.onload=()=>{if(settled)return;const control=frame.contentWindow?.humanStudyControl;if(typeof control?.setActive!=='function'){fail(Error('Human01 study could not initialize. Select the tab to retry.'));return;}settled=true;cleanup();resolve(control);};
  frame.onerror=()=>fail(Error('Human01 study could not load. Select the tab to retry.'));
  timer=setTimeout(()=>fail(Error('Human01 study did not finish loading. Select the tab to retry.')),15000);
  try{frame.srcdoc=JSON.parse(host$('motion-editor-data').textContent).html;}catch(error){fail(error);}
 });
 authoringReady=attempt;attempt.catch(()=>{if(authoringReady===attempt)authoringReady=null;});return attempt;
}
const rigView={ensure:async()=>{await window.rigInspectorReady;if(!window.rigInspectorDiagnostics)throw Error('The rig viewport could not initialize.');},setActive:value=>window.rigStudioControl?.setActive(value)};
const motionView={ensure:ensureHumanStudy,setActive:value=>{const frame=host$('humanStudyFrame');if(value){frame.hidden=false;if(document.hasFocus())frame.contentDocument?.getElementById('view')?.focus({preventScroll:true});}frame.contentWindow?.humanStudyControl?.setActive(value);}};
const studioModes=createStudioModes({rig:rigView,motion:motionView,changed(mode,pending){
 host$('rig-panel').hidden=mode!=='rig';host$('study-panel').hidden=mode!=='motion';
 host$('humanStudyFrame').hidden=mode!=='motion'||pending;host$('studyLoading').hidden=mode!=='motion'||!pending;
 host$('rigTab').setAttribute('aria-selected',String(mode==='rig'));host$('studyTab').setAttribute('aria-selected',String(mode==='motion'));
 host$('hostState').textContent=pending?' / Loading':'';
},report(error){host$('modeError').hidden=false;host$('modeError').textContent=error.message;}});
host$('rigTab').onclick=()=>{host$('modeError').hidden=true;studioModes.select('rig');};
host$('studyTab').onclick=()=>{host$('modeError').hidden=true;studioModes.select('motion');};
host$('backToLab').addEventListener('click',event=>returnToLab(event,{base:location.href,referrer:document.referrer,history}));
window.addEventListener('pagehide',()=>studioModes.suspend());
window.addEventListener('pageshow',event=>{if(event.persisted)studioModes.restore();});
window.studioDiagnostics={get state(){const details=studioModes.mode==='rig'?window.rigInspectorDiagnostics?.state:host$('humanStudyFrame').contentWindow?.studioDiagnostics?.state;return {...details,mode:studioModes.mode,pending:studioModes.pending?'loading':details?.pending??null};},getGLError(){return studioModes.mode==='rig'?inspectorRenderer?.gl?.getError()??0:host$('humanStudyFrame').contentWindow?.studioDiagnostics?.getGLError()??0;}};
window.privateStudioHost={get mode(){return studioModes.mode;},get pending(){return studioModes.pending;},select:mode=>studioModes.select(mode)};
studioModes.select('rig');
