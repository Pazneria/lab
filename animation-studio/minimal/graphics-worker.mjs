import {Viewer} from './viewer.mjs';

let viewer=null,canvas=null,model=null,latest=null,lastPresentation=null,modelId=null,generation=0;
let recoveryTimer=0,attempt=0,disposed=false;
const health={state:'starting',attempts:0,losses:[],initializationMs:[],draws:0,liveBuffers:0};
const report=()=>postMessage({type:'health',health:{...health,liveBuffers:viewer?viewer.createdBuffers-viewer.deletedBuffers:0}});
function recover(reason){
 if(disposed||recoveryTimer)return;
 health.losses.push({reason,at:performance.now()});health.losses=health.losses.slice(-10);
 viewer?.destroy();viewer=null;latest=latest||lastPresentation;health.state=attempt<3?'recovering':'unavailable';report();
 if(attempt<3)recoveryTimer=setTimeout(()=>{recoveryTimer=0;initialize();},250);
}
function initialize(){
 if(disposed)return;attempt++;health.attempts=attempt;
 const started=performance.now();
 try{
  const current=canvas=new OffscreenCanvas(1,1);
  current.addEventListener('webglcontextlost',event=>{event.preventDefault();if(canvas===current)recover('WebGL context lost');});
  viewer=new Viewer(current);
  if(viewer.gl.isContextLost())throw Error('WebGL context lost during initialization');
  const error=viewer.gl.getError();if(error)throw Error('WebGL initialization error '+error);
  if(model)viewer.setModel(model);
  health.state='ready';health.initializationMs.push(performance.now()-started);
  if(latest)present();else report();
 }catch(error){health.initializationMs.push(performance.now()-started);recover(error.message);}
}
function present(){
 if(!viewer||!latest||disposed)return;
 try{
  if(model&&latest.frame){for(let i=0;i<model.geometry.length;i++)Object.assign(model.geometry[i],latest.frame.geometry[i]);model.lines=latest.frame.lines;model.points=latest.frame.points;model.highlight=latest.frame.highlight;viewer.update(model);}
  viewer.size=latest.size;viewer.draw(latest.camera,model,latest.bones);
  if(viewer.gl.isContextLost()){recover('WebGL context lost before presentation');return;}
  const bitmap=canvas.transferToImageBitmap();health.draws++;
  postMessage({type:'present',bitmap,generation,modelId,health:{...health,liveBuffers:viewer.createdBuffers-viewer.deletedBuffers}},[bitmap]);
  lastPresentation={...latest,frame:null,model:null};latest=null;
 }catch(error){recover(error.message);}
}
self.onmessage=({data})=>{
 if(data.type==='init')initialize();
 else if(data.type==='render'){
  generation=data.generation;modelId=data.modelId;
  if(data.model){model=data.model;viewer?.setModel(model);}
  if(data.clear){model=null;viewer?.releaseModel();}
  latest=data;present();
 }else if(data.type==='retry'){attempt=0;clearTimeout(recoveryTimer);recoveryTimer=0;viewer?.destroy();viewer=null;initialize();}
 else if(data.type==='lose'){viewer?.gl.getExtension('WEBGL_lose_context')?.loseContext();}
 else if(data.type==='probe'){
  const g=viewer?.gl,e=g?.getExtension('WEBGL_debug_renderer_info');
  postMessage({type:'probe',id:data.id,graphics:g?{version:g.getParameter(g.VERSION),renderer:g.getParameter(e?e.UNMASKED_RENDERER_WEBGL:g.RENDERER),error:g.getError(),lost:g.isContextLost()}:null});
 }else if(data.type==='dispose'){disposed=true;clearTimeout(recoveryTimer);viewer?.destroy();viewer=null;model=null;latest=null;close();}
};
