// WebGL construction, shader work and drawing never run on the document thread.
export class GraphicsBridge{
 constructor(canvas,onHealth){
  this.canvas=canvas;this.onHealth=onHealth;this.frames=0;this.createdBuffers=0;this.deletedBuffers=0;
  this.generation=0;this.modelId=null;this.presentedModel=null;this.pending=false;this.queued=null;this.nextModel=null;this.clear=true;this.disposed=false;this.probes=new Map();this.probeId=0;
  this.health={state:'starting',attempts:0,losses:[],initializationMs:[],liveBuffers:0};
  // Do not ask the document to connect to the GPU service while it starts.
  // Create the presentation context only after the worker has a valid frame.
  this.output=null;
  if(typeof OffscreenCanvas==='undefined')throw Error('Worker graphics unavailable. Pose controls and navigation remain usable.');
  this.worker=new Worker(new URL('./graphics-worker.mjs',import.meta.url),{type:'module'});
  this.worker.onmessage=({data})=>{
   if(this.disposed){data.bitmap?.close();return;}
   if(data.type==='probe'){this.probes.get(data.id)?.(data.graphics);this.probes.delete(data.id);return;}
   if(data.health){this.health=data.health;this.createdBuffers=data.health.liveBuffers;this.deletedBuffers=0;}
   if(data.type==='present'){
    this.pending=false;
    if(data.generation===this.generation){this.canvas.width=data.bitmap.width;this.canvas.height=data.bitmap.height;
     if(!this.output)this.output=this.canvas.getContext('bitmaprenderer')||this.canvas.getContext('2d');
     if(this.output.transferFromImageBitmap)this.output.transferFromImageBitmap(data.bitmap);else this.output.drawImage(data.bitmap,0,0);
     this.frames++;this.presentedModel=data.modelId;
    }
    data.bitmap.close();this.onHealth?.(this.health);this.pump();
   }else if(data.type==='health'){if(data.health.state!=='ready')this.presentedModel=null;this.onHealth?.(this.health);if(data.health.state==='ready')this.pump();}
  };
  this.worker.onerror=()=>{this.pending=false;this.health.state='unavailable';this.onHealth?.(this.health);};
  this.worker.postMessage({type:'init'});
 }
 releaseModel(){this.generation++;this.modelId=null;this.presentedModel=null;this.nextModel=null;this.clear=true;this.queued=null;}
 setModel(frame,id){this.generation++;this.modelId=id;this.presentedModel=null;this.nextModel=frame;this.clear=false;}
 update(){/* The latest frame travels with the next demand draw. */}
 draw(camera,frame,bones){this.queued={camera:structuredClone(camera),frame,bones,size:{width:this.canvas.clientWidth,height:this.canvas.clientHeight,dpr:Math.min(devicePixelRatio||1,1.25)}};this.pump();}
 pump(){if(this.disposed||this.pending||!this.queued||this.health.state!=='ready')return;
  const data={type:'render',...this.queued,generation:this.generation,modelId:this.modelId,model:this.nextModel,clear:this.clear};
  this.queued=null;this.nextModel=null;this.clear=false;this.pending=true;this.worker.postMessage(data);
 }
 retry(){this.pending=false;this.worker.postMessage({type:'retry'});}
 loseContext(){this.worker.postMessage({type:'lose'});}
 probe(){return new Promise(resolve=>{const id=++this.probeId;this.probes.set(id,resolve);this.worker.postMessage({type:'probe',id});});}
 destroy(){if(this.disposed)return;this.disposed=true;this.worker.postMessage({type:'dispose'});this.worker.terminate();this.worker=null;this.frames=0;this.createdBuffers=0;this.deletedBuffers=0;this.pending=false;this.queued=null;this.nextModel=null;for(const resolve of this.probes.values())resolve(null);this.probes.clear();}
}
