import * as T from '../../lab-space/assets/vendor/three.module.min.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';
import {createLoadSlot,LIMITS} from './contracts.mjs';
import {preflight} from './preflight.mjs';

// One renderer serves both panes; no animation loop or model script is executed.
import {disposeObject,collectResources,disposeResources} from './resources.mjs';
function abortError(){return new DOMException('Import cancelled.','AbortError');}
async function readVerifiedAsset(entry,signal) {
  const url=new URL(entry.asset.path,new URL('../',import.meta.url));
  if(url.origin!==location.origin)throw Error('Character assets must be hosted with this viewer.');
  const response=await fetch(url,{signal,credentials:'same-origin',cache:'force-cache',redirect:'error'});
  if(!response.ok)throw Error('The frozen character file is unavailable.');
  const announced=Number(response.headers.get('content-length'));
  if(announced>LIMITS.bytes)throw Error('The character file exceeds the import limit.');
  const reader=response.body?.getReader();
  let buffer;
  if(reader) {
    const chunks=[];let size=0;
    try {while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;
      if(size>LIMITS.bytes || size>entry.asset.byteLength){await reader.cancel();throw Error('Character size does not match the frozen record.');}chunks.push(value);}}
    finally {reader.releaseLock();}
    const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}buffer=bytes.buffer;
  } else buffer=await response.arrayBuffer();
  if(signal.aborted)throw abortError();
  if(buffer.byteLength!==entry.asset.byteLength)throw Error('Character size does not match the frozen record.');
  if(!globalThis.crypto?.subtle)throw Error('A secure connection is required to verify frozen assets.');
  const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',buffer)),b=>b.toString(16).padStart(2,'0')).join('');
  if(hash!==entry.asset.sha256)throw Error('Character checksum does not match the frozen record.');
  return preflight(buffer,signal);
}
export function createViewer({mount,surfaces,state,onStatus,onFailure}) {
  if(typeof ResizeObserver!=='function'||typeof Worker!=='function')throw Error('This device needs module workers and resize observation for 3D inspection. The prompt and source records remain accessible.');
  const canvas=document.createElement('canvas');canvas.className='comparison-canvas';canvas.setAttribute('aria-hidden','true');mount.prepend(canvas);
  let renderer;
  try {renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'low-power'});}
  catch(error){canvas.remove();throw Error('3D inspection is unavailable on this device. The prompt and admission records remain accessible.');}
  renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
  // Count both scissored panes as one host draw instead of only the last pane.
  renderer.info.autoReset=false;
  renderer.setClearColor('#e9edeb');renderer.setScissorTest(true);
  const environmentScene=new T.Scene();environmentScene.background=new T.Color('#bfc4c2');
  const room=new T.Mesh(new T.BoxGeometry(12,12,12),new T.MeshBasicMaterial({color:'#c9cecb',side:T.BackSide}));environmentScene.add(room);
  const sources=[];
  for(const [x,y,z,w,h,rx,ry] of [[0,4,-3,5,3,0,0],[-4,1,0,3,6,0,Math.PI/2],[4,2,1,3,5,0,-Math.PI/2],[0,5,0,4,4,Math.PI/2,0]]) {
    const plane=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color().setScalar(3),side:T.DoubleSide}));
    plane.position.set(x,y,z);plane.rotation.set(rx,ry,0);environmentScene.add(plane);sources.push(plane);
  }
  let pmrem,environment;
  try {pmrem=new T.PMREMGenerator(renderer);environment=pmrem.fromScene(environmentScene,.04);}
  catch(error){renderer.dispose();renderer.forceContextLoss();canvas.remove();throw Error('Shared studio lighting could not initialize on this device.');}
  finally {pmrem?.dispose();disposeObject(environmentScene);}
  const neutral=new T.MeshStandardMaterial({color:'#c9cfcb',roughness:.72,metalness:0,side:T.DoubleSide});
  const wire=new T.MeshBasicMaterial({color:'#25463c',wireframe:true,side:T.DoubleSide});
  let mode='pbr',lightAngle=35,gridVisible=true,frame=0,closed=false,lastSize='',renderedFrames=0,lastDrawCpuMilliseconds=0,loadRequest=0;
  const panes=surfaces.map(surface=>{
    const scene=new T.Scene();scene.background=new T.Color('#e9edeb');scene.environment=environment.texture;
    scene.add(new T.HemisphereLight('#ffffff','#b9c3bd',1.5));
    const key=new T.DirectionalLight('#ffffff',2.8);scene.add(key);
    const fill=new T.DirectionalLight('#ffffff',1);fill.position.set(-3,1,-2);scene.add(fill);
    const grid=new T.GridHelper(5,20,'#aebdb5','#d5ddd8');grid.position.y=-1.04;scene.add(grid);
    const camera=new T.PerspectiveCamera(38,1,.015,40);
    return {surface,scene,key,grid,camera,object:null,materials:[],summary:null};
  });
  function materialMode(pane){
    for(const [node,original] of pane.materials)node.material=mode==='pbr'?original:Array.isArray(original)?original.map(()=>mode==='wire'?wire:neutral):mode==='wire'?wire:neutral;
  }
  function restoreMaterials(value){for(const [node,material] of value.materials)node.material=material;}
  async function importCharacter(entry,signal) {
    const {buffer,summary}=await readVerifiedAsset(entry,signal);
    const manager=new T.LoadingManager();
    manager.setURLModifier(url=>{if(!url.startsWith('blob:')&&!/^data:(?:application\/(?:octet-stream|gltf-buffer)|image\/(?:png|jpeg));base64,[A-Za-z0-9+/]*={0,2}$/.test(url))throw Error('External asset requests are disabled.');return url;});
    const loader=new GLTFLoader(manager),resources=new Set(),pending=new Set();
    // Track asynchronous parser branches so failures also release partial allocations.
    loader.register(parser=>{
      const track=promise=>{pending.add(promise);promise.then(()=>pending.delete(promise),()=>pending.delete(promise));return promise;};
      const dependency=parser.getDependency.bind(parser);
      parser.getDependency=(...args)=>track(dependency(...args).then(value=>{collectResources(value,resources);return value;}));
      const geometries=parser.loadGeometries.bind(parser);
      parser.loadGeometries=(...args)=>track(geometries(...args).then(values=>{values.forEach(value=>collectResources(value,resources));return values;}));
      const texture=parser.loadTextureImage.bind(parser);
      parser.loadTextureImage=(...args)=>track(texture(...args).then(value=>{if(!value)throw Error('An embedded material texture could not be decoded.');collectResources(value,resources);return value;}));
      return {name:'CharacterBenchTrackedResources'};
    });
    try {
      const gltf=await loader.parseAsync(buffer,''),root=gltf.scene;
      collectResources(root,resources);
      if(signal.aborted)throw abortError();
      // Submitted lighting is excluded from neutral inspection, without changing the frozen file.
      const lights=[];root.traverse(node=>{if(node.isLight)lights.push(node);});lights.forEach(light=>light.removeFromParent());
      root.updateMatrixWorld(true);
      root.traverse(node=>{if(node.isMesh){const positions=node.geometry?.attributes?.position;if(!positions)throw Error('Missing geometry.');
        for(let i=0;i<positions.count;i++)if(!Number.isFinite(positions.getX(i))||!Number.isFinite(positions.getY(i))||!Number.isFinite(positions.getZ(i)))throw Error('Character contains non-finite geometry.');}});
      const bounds=new T.Box3().setFromObject(root,true);
      if(bounds.isEmpty() || ![...bounds.min.toArray(),...bounds.max.toArray()].every(Number.isFinite))throw Error('Character has no finite bounds.');
      const sphere=bounds.getBoundingSphere(new T.Sphere());
      if(!Number.isFinite(sphere.radius)||sphere.radius<=.000001)throw Error('Character has degenerate bounds.');
      const group=new T.Group();group.add(root);root.position.sub(sphere.center);group.scale.setScalar(1/sphere.radius);
      const materials=[];root.traverse(node=>{if(node.isMesh)materials.push([node,node.material]);});
      return {group,root,resources,materials,summary,floor:(bounds.min.y-sphere.center.y)/sphere.radius};
    } catch(error){while(pending.size)await Promise.allSettled([...pending]);disposeResources(resources);throw error;}
  }
  const slots=panes.map((pane,side)=>createLoadSlot({
    load:importCharacter,
    attach(value){pane.object=value;pane.scene.add(value.group);pane.materials=value.materials;
      pane.grid.position.y=value.floor-.015;pane.summary=value.summary;materialMode(pane);invalidate();},
    dispose(value){restoreMaterials(value);value.group.removeFromParent();disposeResources(value.resources);
      renderer.renderLists.dispose();
      if(pane.object===value){pane.object=null;pane.materials=[];pane.summary=null;}invalidate();}
  }));
  function draw() {
    frame=0;if(closed||document.hidden)return;
    try {
      const started=performance.now();
      const parent=mount.getBoundingClientRect(),width=Math.max(1,Math.round(parent.width)),height=Math.max(1,Math.round(parent.height));
      const ratio=Math.min(devicePixelRatio||1,1.25,Math.sqrt(1800000/(width*height))),size=width+'x'+height+'@'+ratio;
      if(lastSize!==size){renderer.setPixelRatio(ratio);renderer.setSize(width,height,false);lastSize=size;}
      renderer.info.reset();
      renderer.setScissorTest(false);renderer.setViewport(0,0,width,height);renderer.clear();renderer.setScissorTest(true);
      const snapshot=state.snapshot;
      panes.forEach((pane,index)=>{
        const rect=pane.surface.getBoundingClientRect();if(rect.width<1||rect.height<1||!pane.surface.getClientRects().length)return;
        const x=rect.left-parent.left,y=height-(rect.bottom-parent.top),w=rect.width,h=rect.height;
        renderer.setViewport(x,y,w,h);renderer.setScissor(x,y,w,h);
        const c=snapshot.cameras[index];pane.camera.aspect=w/h;pane.camera.updateProjectionMatrix();
        pane.camera.position.set(Math.sin(c.yaw)*Math.cos(c.pitch)*c.distance,Math.sin(c.pitch)*c.distance+c.targetY,Math.cos(c.yaw)*Math.cos(c.pitch)*c.distance);
        pane.camera.lookAt(0,c.targetY,0);
        const angle=lightAngle*Math.PI/180;pane.key.position.set(Math.sin(angle)*4,3,Math.cos(angle)*4);
        pane.grid.visible=gridVisible;renderer.render(pane.scene,pane.camera);
      });
      renderedFrames++;lastDrawCpuMilliseconds=performance.now()-started;
    }catch(error){onFailure('The 3D renderer stopped. Retry inspection or continue with the source records.');dispose();}
  }
  function invalidate(){if(!closed&&!frame&&!document.hidden)frame=requestAnimationFrame(draw);}
  function contextLost(event){event.preventDefault();onFailure('3D context was lost. Retry to reload both frozen characters.');dispose();}
  canvas.addEventListener('webglcontextlost',contextLost);
  const resize=new ResizeObserver(()=>{lastSize='';invalidate();});resize.observe(mount);surfaces.forEach(s=>resize.observe(s));
  function visibility(){if(document.hidden){if(frame)cancelAnimationFrame(frame);frame=0;clear();panes.forEach((p,i)=>onStatus(i,'paused','Inspection paused while this tab was hidden. Reload the pair to continue.'));}
    else invalidate();}
  document.addEventListener('visibilitychange',visibility);
  async function loadPair(pair,token) {
    const request=++loadRequest;
    const current=()=>!closed&&request===loadRequest&&token===state.snapshot.generation;
    return Promise.all(pair.map(async(entry,side)=>{
      if(!current())return false;
      onStatus(side,'loading','Verifying and importing the frozen GLB…',token);
      try {const ready=await slots[side].open(entry);if(ready&&current()){onStatus(side,'ready','Ready to inspect',token);return true;}return false;}
      catch(error){if(current())onStatus(side,'error',error.message,token);return false;}
    }));
  }
  function clear(){loadRequest++;slots.forEach(s=>s.clear());invalidate();}
  function dispose(){if(closed)return;closed=true;if(frame)cancelAnimationFrame(frame);frame=0;
    resize.disconnect();document.removeEventListener('visibilitychange',visibility);canvas.removeEventListener('webglcontextlost',contextLost);
    slots.forEach(s=>s.close());panes.forEach(p=>disposeObject(p.grid));environment.dispose();neutral.dispose();wire.dispose();renderer.renderLists.dispose();renderer.dispose();renderer.forceContextLoss();canvas.remove();}
  invalidate();
  return {loadPair,clear,dispose,invalidate,
    get diagnostics(){return {threeRevision:T.REVISION,closed,pendingFrame:!!frame,renderedFrames,lastDrawCpuMilliseconds,
      drawingBuffer:{width:canvas.width,height:canvas.height},pixelRatio:renderer.getPixelRatio(),
      drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,
      geometryCount:renderer.info.memory.geometries,textureCount:renderer.info.memory.textures,
      paneReady:panes.map(p=>!!p.object)};},
    setMode(value){if(['pbr','clay','wire'].includes(value)){mode=value;panes.forEach(materialMode);invalidate();}},
    setLight(value){lightAngle=Number(value);invalidate();},setGrid(value){gridVisible=!!value;invalidate();}};
}
