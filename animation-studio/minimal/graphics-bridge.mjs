// One bounded graphics request in flight. Failed workers are never reused.
export class GraphicsBridge {
 constructor(canvas,onHealth,limits={}) {
  this.canvas=canvas;this.onHealth=onHealth;
  this.limits={startupMs:12000,drawMs:8000,probeMs:1500,...limits};
  this.frames=0;this.createdBuffers=0;this.deletedBuffers=0;
  this.generation=0;this.modelId=null;this.presentedModel=null;
  this.pending=false;this.queued=null;this.nextModel=null;this.clear=true;
  this.model=null;this.lastDraw=null;this.disposed=false;this.output=null;
  this.probes=new Map();this.probeId=0;this.timer=0;this.recoveryPending=false;
  this.failures=[];this.workersCreated=0;this.workersTerminated=0;
  this.health={state:'starting',attempts:0,losses:[],initializationMs:[],liveBuffers:0};
  if(typeof OffscreenCanvas==='undefined')throw Error('Worker graphics unavailable. Pose controls and navigation remain usable.');
  this.startWorker();
 }
 updateHealth(data) {
  this.health={...data,failures:this.failures.slice(),workersCreated:this.workersCreated,workersTerminated:this.workersTerminated};
  this.createdBuffers=data.liveBuffers||0;this.deletedBuffers=0;
 }
 notify(){this.onHealth?.(this.health);}
 arm(ms,reason) {
  clearTimeout(this.timer);
  this.timer=setTimeout(()=>this.fail(reason),ms);
 }
 settleProbes() {
  for(const {resolve,timer} of this.probes.values()){clearTimeout(timer);resolve(null);}
  this.probes.clear();
 }
 stopWorker() {
  clearTimeout(this.timer);this.timer=0;this.settleProbes();
  if(this.worker){this.worker.onmessage=null;this.worker.onerror=null;this.worker.onmessageerror=null;this.worker.terminate();this.workersTerminated++;this.worker=null;}
  this.pending=false;this.recoveryPending=false;this.createdBuffers=0;this.deletedBuffers=0;
 }
 fail(reason) {
  if(this.disposed)return;
  this.stopWorker();this.presentedModel=null;
  this.failures.push({reason,at:performance.now()});this.failures=this.failures.slice(-10);
  this.updateHealth({...this.health,state:'unavailable',liveBuffers:0,reason});this.notify();
 }
 startWorker() {
  if(this.disposed)return;
  this.updateHealth({...this.health,state:'starting',liveBuffers:0,reason:null});
  try {
   const current=this.worker=new Worker(new URL('./graphics-worker.mjs',import.meta.url),{type:'module'});
   this.workersCreated++;this.updateHealth(this.health);
   current.onmessage=({data})=>{
    if(this.disposed||this.worker!==current){data.bitmap?.close();return;}
    if(data.type==='probe'){
     const entry=this.probes.get(data.id);if(entry){clearTimeout(entry.timer);entry.resolve(data.graphics);this.probes.delete(data.id);}return;
    }
    if(data.health)this.updateHealth(data.health);
    if(data.type==='present') {
     clearTimeout(this.timer);this.timer=0;this.pending=false;this.recoveryPending=false;
     try {
      if(data.generation===this.generation&&data.modelId===this.modelId) {
       this.canvas.width=data.bitmap.width;this.canvas.height=data.bitmap.height;
       // Delay the document's graphics connection until a valid worker frame.
       if(!this.output)this.output=this.canvas.getContext('bitmaprenderer')||this.canvas.getContext('2d');
       if(!this.output)throw Error('Bitmap presentation is unavailable');
       if(this.output.transferFromImageBitmap)this.output.transferFromImageBitmap(data.bitmap);else this.output.drawImage(data.bitmap,0,0);
       this.frames++;this.presentedModel=data.modelId;
      }
     }catch(error){this.fail('Graphics presentation failed: '+error.message);}
     finally{data.bitmap.close();}
     if(this.worker===current){this.notify();this.pump();}
    }else if(data.type==='health') {
     if(data.health.state==='unavailable'){this.fail(data.health.losses?.at(-1)?.reason||'Graphics initialization failed');return;}
     if(data.health.state!=='ready')this.presentedModel=null;
     // Idle context loss needs a deadline too. Repeated notifications cannot
     // extend an existing draw/recovery deadline, which lasts until a frame.
     if(data.health.state==='recovering'){
      this.recoveryPending=true;
      if(!this.timer)this.arm(this.limits.startupMs,'Graphics recovery timed out');
     }
     if(data.health.state==='ready'&&!this.pending&&!this.recoveryPending){clearTimeout(this.timer);this.timer=0;}
     if(data.health.state==='ready'&&this.recoveryPending&&!this.pending&&!this.queued)this.queued=this.lastDraw;
     this.notify();if(data.health.state==='ready')this.pump();
    }
   };
   current.onerror=event=>{event?.preventDefault?.();if(this.worker===current)this.fail('Graphics worker failed: '+(event?.message||'fatal error'));};
   current.onmessageerror=()=>{if(this.worker===current)this.fail('Graphics worker message failed');};
   this.arm(this.limits.startupMs,'Graphics initialization timed out');
   current.postMessage({type:'init'});
  }catch(error){this.fail('Graphics worker could not start: '+error.message);}
 }
 releaseModel() {
  this.generation++;this.modelId=null;this.presentedModel=null;
  this.model=null;this.lastDraw=null;this.nextModel=null;this.clear=true;this.queued=null;
 }
 setModel(frame,id) {
  this.generation++;this.modelId=id;this.presentedModel=null;
  // Retain constants and latest geometry so a terminated worker can be replaced.
  this.model=frame;this.nextModel=frame;this.clear=false;
 }
 update(){/* Latest geometry is retained by the next demand draw. */}
 draw(camera,frame,bones) {
  if(this.disposed)return;
  if(this.model&&frame){for(let i=0;i<this.model.geometry.length;i++)Object.assign(this.model.geometry[i],frame.geometry[i]);for(const key of ['lines','points','highlight'])this.model[key]=frame[key];}
  this.lastDraw={camera:structuredClone(camera),frame,bones,size:{width:this.canvas.clientWidth,height:this.canvas.clientHeight,dpr:Math.min(devicePixelRatio||1,1.25)}};
  this.queued=this.lastDraw;this.pump();
 }
 pump() {
  if(this.disposed||!this.worker||this.pending||!this.queued||this.health.state!=='ready')return;
  const data={type:'render',...this.queued,generation:this.generation,modelId:this.modelId,model:this.nextModel,clear:this.clear};
  this.queued=null;this.nextModel=null;this.clear=false;this.pending=true;
  if(!this.timer)this.arm(this.limits.drawMs,'Graphics draw timed out');
  try{this.worker.postMessage(data);}catch(error){this.fail('Graphics request failed: '+error.message);}
 }
 retry() {
  if(this.disposed)return;
  this.stopWorker();this.presentedModel=null;
  this.nextModel=this.model;this.clear=!this.model;this.queued=this.lastDraw;
  this.startWorker();this.notify();
 }
 loseContext(){this.worker?.postMessage({type:'lose'});}
 probe() {
  if(!this.worker||this.health.state!=='ready')return Promise.resolve(null);
  return new Promise(resolve=>{
   const id=++this.probeId;
   const timer=setTimeout(()=>{this.probes.delete(id);resolve(null);},this.limits.probeMs);
   this.probes.set(id,{resolve,timer});
   try{this.worker.postMessage({type:'probe',id});}catch{clearTimeout(timer);this.probes.delete(id);resolve(null);}
  });
 }
 destroy() {
  if(this.disposed)return;this.disposed=true;this.stopWorker();
  this.frames=0;this.queued=null;this.nextModel=null;this.model=null;this.lastDraw=null;this.presentedModel=null;
 }
}
