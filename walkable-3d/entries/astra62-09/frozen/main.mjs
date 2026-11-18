import * as T from './vendor/three.module.min.js';
import {makeMaterials,illuminate} from './materials.mjs';
import {buildMarkings,contactShadows} from './markings.mjs';
import {createSky} from './outside.mjs';
import {createWalker,controls} from './navigation.mjs';
import {loadAssets,decodeBay} from './load.mjs';

const byId=id=>document.getElementById(id);
const canvas=byId('view'),helpPanel=byId('instructions'),loader=byId('loading');
let input=null,ready=false,toastTimer;
function notify(message){
  const box=byId('toast');box.textContent=message;box.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.classList.remove('show'),1900);
}
function toggleHelp(open=helpPanel.hidden){
  if(!ready)return;
  input?.clear();
  if(open&&document.pointerLockElement)document.exitPointerLock();
  helpPanel.hidden=!open;byId('help').setAttribute('aria-expanded',String(open));
  if(open)byId('close-help').focus();else canvas.focus({preventScroll:true});
}
function failure(title,detail){loader.hidden=false;byId('load-title').textContent=title;byId('load-detail').textContent=detail}
function onLock(locked,failed){
  document.body.classList.toggle('captured',locked);
  if(failed){byId('hint').textContent='WASD move · Drag to look';byId('explore').textContent='Focus bay';}
}
async function openBay(){
  if(location.protocol==='file:'){failure('Open over localhost','Serve this folder with the launch command in README.md, then open the suggested localhost address.');return}
  const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,stencil:false,powerPreference:'high-performance'});
  renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.04;
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(63,1,.065,310);
  scene.background=new T.Color(0x080e18);scene.fog=new T.FogExp2(0x859191,.0092);
  camera.rotation.order='YXZ';
  const data=await loadAssets(renderer);
  const generator=new T.PMREMGenerator(renderer);
  const environment=generator.fromEquirectangular(data.probe);scene.environment=environment.texture;
  data.probe.dispose();generator.dispose();
  const mats=makeMaterials(data.finish,data.field,data.meta.light,data.traffic);
  const {room,exterior}=decodeBay(data.meta,data.geometry,mats);scene.add(room,exterior);data.geometry=null;
  createSky(exterior,data.moon);
  room.add(buildMarkings(data.meta.labels,data.anisotropy),contactShadows(data.meta.contacts));
  illuminate(scene,renderer);
  const walker=createWalker(data.meta.solids),w=walker.state;
  input=controls(canvas,walker,{
    onLock,onHelp:()=>toggleHelp(),onReset:()=>notify('Starting position restored'),onArea:name=>byId('area').textContent=name,
    blocked:()=>!ready||!helpPanel.hidden
  });
  byId('help').addEventListener('click',()=>toggleHelp());
  byId('close-help').addEventListener('click',()=>toggleHelp(false));
  byId('back').addEventListener('click',()=>{toggleHelp(false);input.engage()});
  byId('explore').addEventListener('click',()=>input.engage());
  byId('reset').addEventListener('click',()=>{toggleHelp(false);input.reset();canvas.focus({preventScroll:true})});
  window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!helpPanel.hidden){e.preventDefault();toggleHelp(false)}});
  function resize(){
    const width=Math.max(1,canvas.clientWidth),height=Math.max(1,canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5,Math.sqrt(2170000/(width*height))));
    renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();input.invalidate();
  }
  const port=new T.Box3(new T.Vector3(-4.87,2.88,-7.54),new T.Vector3(4.01,5.51,-6.69));
  const frustum=new T.Frustum(),vp=new T.Matrix4();
  function positionCamera(){
    camera.position.set(w.x,w.eye,w.z);camera.rotation.set(w.pitch,w.yaw,0,'YXZ');camera.updateMatrixWorld();
    vp.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(vp);
    exterior.visible=frustum.intersectsBox(port);
  }
  resize();positionCamera();
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;input.clear();failure('Graphics interrupted','Reload this page to reopen the bay.')});
  window.addEventListener('resize',resize);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)input.invalidate()});
  byId('load-detail').textContent='Preparing materials and lighting…';
  // Compile even the reverse views before the first walk around the machine.
  exterior.visible=true;
  await renderer.compileAsync(scene,camera);
  positionCamera();renderer.render(scene,camera);ready=true;loader.hidden=true;
  let last=0;
  function frame(now){
    requestAnimationFrame(frame);
    const dt=last?Math.min(.065,(now-last)/1000):1/60;last=now;
    if(!ready||document.hidden)return;
    if(input.tick(dt)){positionCamera();renderer.render(scene,camera)}
  }
  requestAnimationFrame(frame);
}
openBay().catch(error=>{
  console.error(error);
  failure('Bay could not open','Use a WebGL 2 browser and serve the complete entry over localhost. '+(error?.message||'An asset could not be loaded.'));
});

