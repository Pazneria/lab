import {Viewer} from './viewer.mjs';
import {euler,clamp} from '../rig-review/source/core.mjs';
import {returnToLab} from '../navigation.mjs';
const $=id=>document.getElementById(id),canvas=$('view');
const stats={started:performance.now(),readyMs:null,workersCreated:0,workersTerminated:0,loads:[],poseMs:[],longTasks:[],heartbeatMaxDriftMs:0,heartbeatTicks:0,errors:[],cancelled:0};
let renderer=null,worker=null,timeout=0,records=[],record=null,meta=null,frame=null,revision=0,inflight=false,poseWanted=false,request=0;
let selected=-1,clip='rest',time=0,edits={},playing=false,anchor=0,anchorTime=0,raf=0,tick=0,dirty=false,onscreen=true,disposed=false,loadStarted=0;
const camera={yaw:.45,pitch:.15,span:2,center:[0,1,0]};
const activeClip=()=>meta?.clips.find(c=>c.id===clip);
const visible=()=>!disposed&&!document.hidden&&onscreen;
function status(text,error=false){$('status').textContent=text;$('status').classList.toggle('error',error);}
function stopWorker(){clearTimeout(timeout);timeout=0;if(worker){worker.terminate();stats.workersTerminated++;worker=null;}inflight=false;poseWanted=false;}
function controls(){const ready=!!meta,canEdit=ready&&meta.joints.find(j=>j.id===selected)?.editable;for(const id of ['joint','clip','reset'])$(id).disabled=!ready;$('play').disabled=!ready||!(activeClip()?.duration>0);$('time').disabled=!ready||!(activeClip()?.duration>0);for(const id of ['x','y','z','rangeX','rangeY','rangeZ','clearJoint'])$(id).disabled=!canEdit;$('cancel').disabled=!worker||ready;}
function fail(message){pause();stopWorker();meta=null;frame=null;renderer?.releaseModel();dirty=true;invalidate();controls();status(message,true);$('retry').hidden=false;stats.errors.push(message);stats.errors=stats.errors.slice(-20);}
function guard(ms,message){clearTimeout(timeout);timeout=setTimeout(()=>fail(message),ms);}
function pause(){playing=false;clearTimeout(tick);tick=0;$('play').textContent='Play diagnostic';}
function cancel(){stats.cancelled++;pause();stopWorker();meta=null;frame=null;renderer?.releaseModel();dirty=true;invalidate();controls();status('Load cancelled. Choose a model or retry.');$('retry').hidden=false;}
function invalidate(){dirty=true;if(visible()&&!raf)raf=requestAnimationFrame(draw);}
function draw(){raf=0;if(!visible()||!dirty)return;dirty=false;if(renderer)try{renderer.draw(camera,frame,$('bones').checked);}catch(error){renderer.destroy();renderer=null;fail('Viewer draw failed: '+error.message);}}
function angles(values){if(!values)return;for(let k=0;k<3;k++){const axis='XYZ'[k];const n=Math.round(values[k]*100)/100;$('range'+axis).value=n;$(axis.toLowerCase()).value=n;}}
function timeline(){const duration=activeClip()?.duration||0;$('time').max=duration;$('time').value=time;$('timeLabel').textContent=time.toFixed(3)+' / '+duration.toFixed(3)+' s';}
function queuePose(){revision++;poseWanted=true;pumpPose();}
function pumpPose(){if(!worker||!meta||inflight||!poseWanted||!visible())return;poseWanted=false;inflight=true;guard(8000,'Pose calculation timed out. Choose another model or retry.');worker.postMessage({type:'pose',request:++request,revision,clip,time,edits,selected});}
function playback(){tick=0;if(!playing||!visible())return;const duration=activeClip()?.duration||0;time=Math.min(duration,anchorTime+(performance.now()-anchor)/1000);timeline();queuePose();if(time>=duration)pause();}
function nextTick(){if(playing&&!tick)tick=setTimeout(playback,34);}
function fit(){if(meta){camera.center=meta.bounds.center.slice();camera.span=meta.bounds.span;camera.yaw=.45;camera.pitch=.15;invalidate();}}
function chooseClip(){pause();clip=$('clip').value;time=0;edits={};$('editNote').textContent='No local overrides.';const c=activeClip();$('clipNote').textContent=c?c.kind+' · '+c.name+'. '+c.provenance+' — not an approved finished animation.':'Rest pose. No diagnostic playing.';timeline();controls();queuePose();}
function option(select,value,text){const el=document.createElement('option');el.value=value;el.textContent=text;select.append(el);}
function load(id){pause();stopWorker();revision++;meta=null;frame=null;edits={};clip='rest';time=0;selected=-1;renderer?.releaseModel();invalidate();record=records.find(r=>r.id===id);$('retry').hidden=true;$('joint').replaceChildren();$('clip').replaceChildren();option($('clip'),'rest','Rest pose');$('editNote').textContent='No local overrides.';$('clipNote').textContent='Diagnostic studies are not approved finished animations.';timeline();controls();if(!record){fail('Model is absent from the pinned catalog.');return;}
 $('modelNote').textContent=record.label+' · pinned '+record.sha256.slice(0,12)+'. '+(record.limits?.[0]||'Inspection input; production acceptance is not claimed.');
 status('Loading '+record.label+'…');loadStarted=performance.now();
 try{const current=worker=new Worker(new URL('./model-worker.mjs',import.meta.url),{type:'module'});stats.workersCreated++;controls();guard(15000,'Model load timed out. The page remains usable; choose another model or retry.');
 current.onerror=()=>{if(worker===current)fail('Model worker failed. Choose another model or retry.');};
 current.onmessage=({data})=>{if(worker!==current||disposed)return;
  if(data.type==='progress'){status(data.text);return;}
  if(data.type==='error'){fail(data.message);return;}
  clearTimeout(timeout);timeout=0;
  if(data.type==='ready'){meta=data.meta;frame=data.frame;selected=meta.selected;inflight=false;
   try{renderer?.setModel(frame);}catch(error){fail(error.message);return;}
   for(const j of meta.joints)option($('joint'),j.id,j.name+(j.editable?'':' (matrix; read only)'));$('joint').value=selected;
   for(const c of meta.clips)option($('clip'),c.id,c.kind+' · '+c.name);
   controls();angles(frame.angles);fit();status(renderer?'Ready · '+record.label:'Model ready; viewer unavailable. Navigation and pose controls remain usable.',!renderer);
   const ms=performance.now()-loadStarted;stats.loads.push({id,ms,workerMs:data.ms});stats.loads=stats.loads.slice(-40);if(stats.readyMs===null)stats.readyMs=performance.now()-stats.started;
  }else if(data.type==='pose'){inflight=false;stats.poseMs.push(data.ms);stats.poseMs=stats.poseMs.slice(-100);if(data.revision===revision){frame=data.frame;try{renderer?.update(frame);}catch(error){fail(error.message);return;}angles(frame.angles);invalidate();}pumpPose();nextTick();}
 };
 current.postMessage({type:'load',record});
 }catch(error){fail(error.message);}
}
function edit(){pause();const values=['x','y','z'].map(id=>Number($(id).value));if(['x','y','z'].some(id=>$(id).value.trim()==='')||values.some(v=>!Number.isFinite(v)||Math.abs(v)>180)){status('Enter a rotation from −180 to 180 degrees.',true);return;}edits={...edits,[selected]:{rotation:euler(values)}};for(let k=0;k<3;k++)$('range'+'XYZ'[k]).value=values[k];$('editNote').textContent=Object.keys(edits).length+' local joint override(s).';status('Local inspection pose · '+record.label);queuePose();}
for(const axis of ['X','Y','Z']){$('range'+axis).addEventListener('input',()=>{$(axis.toLowerCase()).value=$('range'+axis).value;edit();});$(axis.toLowerCase()).addEventListener('input',edit);}
$('model').addEventListener('change',()=>load($('model').value));$('retry').addEventListener('click',()=>load($('model').value));$('cancel').addEventListener('click',cancel);$('clip').addEventListener('change',chooseClip);
$('joint').addEventListener('change',()=>{pause();selected=Number($('joint').value);controls();queuePose();});
$('clearJoint').addEventListener('click',()=>{pause();delete edits[selected];edits={...edits};$('editNote').textContent=Object.keys(edits).length+' local joint override(s).';queuePose();});
$('reset').addEventListener('click',()=>{$('clip').value='rest';chooseClip();status('Rest pose restored.');});
$('time').addEventListener('input',()=>{pause();time=Number($('time').value);timeline();queuePose();});
$('play').addEventListener('click',()=>{if(playing){pause();return;}if(!activeClip()?.duration)return;if(time>=activeClip().duration)time=0;edits={};$('editNote').textContent='No local overrides.';playing=true;anchor=performance.now();anchorTime=time;$('play').textContent='Pause diagnostic';playback();});
$('fit').addEventListener('click',fit);$('bones').addEventListener('change',invalidate);
function zoom(factor){camera.span=clamp(camera.span*factor,.05,100);invalidate();}
$('zoomIn').addEventListener('click',()=>zoom(.85));$('zoomOut').addEventListener('click',()=>zoom(1/.85));
function pan(dx,dy){const scale=camera.span/Math.max(canvas.clientHeight,1),x=-dx*scale,y=dy*scale,a=Math.cos(camera.yaw),b=Math.sin(camera.yaw),u=Math.cos(camera.pitch),v=Math.sin(camera.pitch);camera.center=camera.center.map((p,k)=>p+[a*x-b*v*y,u*y,b*x+a*v*y][k]);invalidate();}
for(const [id,x,y] of [['panLeft',40,0],['panRight',-40,0],['panUp',0,-40],['panDown',0,40]])$(id).addEventListener('click',()=>pan(x,y));
let drag=null;
canvas.addEventListener('pointerdown',e=>{if(!renderer||!meta)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,pan:e.shiftKey||e.button===2};canvas.setPointerCapture(e.pointerId);});
canvas.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.x=e.clientX;drag.y=e.clientY;if(drag.pan)pan(dx,dy);else{camera.yaw+=dx*.008;camera.pitch=clamp(camera.pitch+dy*.008,-1.4,1.4);invalidate();}});
for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,()=>{drag=null;});
canvas.addEventListener('contextmenu',e=>e.preventDefault());canvas.addEventListener('wheel',e=>{if(!e.ctrlKey&&!e.metaKey)return;e.preventDefault();zoom(Math.exp(clamp(e.deltaY,-100,100)*.003));},{passive:false});
canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();if(e.shiftKey)pan(e.key==='ArrowLeft'?30:e.key==='ArrowRight'?-30:0,e.key==='ArrowUp'?-30:e.key==='ArrowDown'?30:0);else{camera.yaw+=e.key==='ArrowLeft'?-.1:e.key==='ArrowRight'?.1:0;camera.pitch=clamp(camera.pitch+(e.key==='ArrowUp'?-.1:e.key==='ArrowDown'?.1:0),-1.4,1.4);invalidate();}});
function gate(){if(!visible()){pause();cancelAnimationFrame(raf);raf=0;}else{invalidate();pumpPose();}}
document.addEventListener('visibilitychange',gate);window.addEventListener('blur',pause);
const intersection=new IntersectionObserver(entries=>{onscreen=entries[0].isIntersecting;gate();});intersection.observe(canvas);
const resize=new ResizeObserver(invalidate);resize.observe(canvas);
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();renderer?.destroy();renderer=null;pause();$('reloadView').hidden=false;status('WebGL context lost. Reload to restore the viewer; navigation remains usable.',true);stats.errors.push('WebGL context lost');});
$('reloadView').addEventListener('click',()=>location.reload());
$('back').addEventListener('click',event=>returnToLab(event,{base:location.href,referrer:document.referrer,history}));
let heartbeatLast=performance.now();const heartbeat=setInterval(()=>{const now=performance.now();if(!document.hidden){stats.heartbeatMaxDriftMs=Math.max(stats.heartbeatMaxDriftMs,now-heartbeatLast-250);stats.heartbeatTicks++;}heartbeatLast=now;},250);
let observer;try{observer=new PerformanceObserver(list=>{for(const e of list.getEntries())stats.longTasks.push({start:e.startTime,duration:e.duration});stats.longTasks=stats.longTasks.slice(-50);});observer.observe({type:'longtask',buffered:true});}catch{}
const snapshot=()=>({model:record?.id,ready:!!meta,selected,clip,time,playing,edits:structuredClone(edits),camera:structuredClone(camera),visible:visible(),pending:!!worker&&!meta,inflight,queued:poseWanted,raf:!!raf,playbackTimer:!!tick,rendererFrames:renderer?.frames||0,liveBuffers:renderer?renderer.createdBuffers-renderer.deletedBuffers:0,liveWorkers:stats.workersCreated-stats.workersTerminated,stats:structuredClone(stats)});
window.minimalStudioDiagnostics={snapshot};$('healthRefresh').addEventListener('click',()=>{$('health').textContent=JSON.stringify(snapshot(),null,2);});
function dispose(){if(disposed)return;disposed=true;pause();stopWorker();cancelAnimationFrame(raf);raf=0;renderer?.destroy();renderer=null;intersection.disconnect();resize.disconnect();observer?.disconnect();clearInterval(heartbeat);}
window.addEventListener('pagehide',dispose);window.addEventListener('pageshow',e=>{if(e.persisted&&disposed)location.reload();});
try{renderer=new Viewer(canvas);}catch(error){status(error.message,true);$('reloadView').hidden=false;stats.errors.push(error.message);}
try{const response=await fetch(new URL('./catalog.json',import.meta.url));if(!response.ok)throw Error('Model catalog unavailable ('+response.status+'). Reload to retry.');const catalog=await response.json();records=catalog.records.filter(r=>r.activeBindingAllowed&&!r.requiresReviewOptIn);for(const r of records)option($('model'),r.id,r.label);$('model').disabled=false;load(records[0]?.id);}catch(error){fail(error.message);$('retry').hidden=true;}
