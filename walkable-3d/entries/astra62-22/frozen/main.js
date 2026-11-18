import * as T from './vendor/three.module.min.js';
import {buildAtelier} from './world.js';
import {lightScene} from './lighting.js';
import {shellMark} from './materials.js';
import {zoneAt,zones} from './rooms.js';
import {Walk} from './walking.js';
import {furnishingVisibility} from './visibility.js';

const el=id=>document.getElementById(id),canvas=el('view'),hud=el('hud'),help=el('help'),helpBtn=el('help-button');
let currentZone=-1,walk,noticeTimer;
const ui={
  room(z){
    const n=zoneAt(z);if(n===currentZone)return;currentZone=n;el('location').textContent=zones[n][0];
  },
  exploring(active){hud.classList.toggle('exploring',active);},
  status(text){
    if(hud.hidden)return;
    el('notice').textContent=text;el('notice').classList.add('show');
    clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>el('notice').classList.remove('show'),1550);
  },
  helpOpen:()=>!help.hidden,
  closeHelp(){help.hidden=true;helpBtn.setAttribute('aria-expanded','false');},
  toggleHelp(){
    if(!help.hidden){this.closeHelp();canvas.focus({preventScroll:true});return;}
    if(document.pointerLockElement)document.exitPointerLock();
    walk?.clear();help.hidden=false;helpBtn.setAttribute('aria-expanded','true');
  }
};
function fail(message){el('loading').hidden=false;el('loading-note').textContent=message;hud.hidden=true;}
async function openAtelier(){
  const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance',stencil:false});
  renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.06;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;
  renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
  const camera=new T.PerspectiveCamera(65,1,.031,52);
  function resize(){
    const width=Math.max(1,canvas.clientWidth),height=Math.max(1,canvas.clientHeight);
    const pixelRatio=Math.min(window.devicePixelRatio||1,1.6,Math.sqrt(2260000/(width*height)));
    renderer.setPixelRatio(pixelRatio);renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();
  }
  resize();
  const {scene,blocks}=buildAtelier();lightScene(scene);
  scene.updateMatrixWorld(true);scene.matrixWorldAutoUpdate=false;
  walk=new Walk(canvas,camera,blocks,ui);
  const cullFurnishings=furnishingVisibility(scene);
  const seal=el('seal').getContext('2d');shellMark(seal,45,46,1.34,'#ddc28b');
  helpBtn.addEventListener('click',()=>ui.toggleHelp());el('close-help').addEventListener('click',()=>ui.toggleHelp());
  el('reset-button').addEventListener('click',()=>{ui.closeHelp();walk.reset();canvas.focus({preventScroll:true});});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ui.helpOpen())ui.closeHelp();});
  if(matchMedia('(pointer:coarse)').matches){el('enter-hint').textContent='Drag to explore';el('move-hint').textContent='Left side to walk · Right side to look';}
  window.addEventListener('resize',resize);
  // Warm up material programs before handing control to the visitor.
  await renderer.compileAsync(scene,camera);
  renderer.render(scene,camera);
  el('loading').hidden=true;hud.hidden=false;
  let prev=0,stopped=false;
  function frame(time){
    if(stopped)return;
    const dt=prev?Math.min((time-prev)*.001,.045):0;prev=time;
    if(!document.hidden){walk.tick(dt);cullFurnishings(camera);renderer.render(scene,camera);}
    requestAnimationFrame(frame);
  }
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();stopped=true;walk.clear();fail('The graphics context was interrupted. Reload this page to reopen the atelier.');});
  requestAnimationFrame(frame);
}
requestAnimationFrame(()=>openAtelier().catch(error=>{
  console.error(error);
  fail('The atelier could not open. Use a WebGL 2 browser with graphics acceleration and serve this folder over localhost.');
}));

