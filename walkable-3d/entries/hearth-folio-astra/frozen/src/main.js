import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {Batch} from './batch.js';
import {makeMaterials,random} from './materials.js';
import {architecture} from './architecture.js';
import {furnishings} from './furnishings.js';
import {details} from './details.js';
import {exterior} from './exterior.js';
import {move,START,EYE_HEIGHT} from './navigation.js';
import {installCollisionLayout} from './collision-layout.js';

const $=id=>document.getElementById(id),canvas=$('world');
let renderer;
function fatal(error){$('loading').hidden=true;$('error').hidden=false;$('error').textContent='The library could not open. This build needs a browser with WebGL 2 enabled. Please check the browser console for details. '+error.message;console.error(error);}
window.addEventListener('error',e=>{if(!renderer)fatal(e.error||new Error(e.message));});
try{
renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();scene.background=new THREE.Color(0xc8c6ad);scene.fog=new THREE.FogExp2(0xc8c6ad,.008);
const camera=new THREE.PerspectiveCamera(67,innerWidth/innerHeight,.065,200);camera.rotation.order='YXZ';
const materials=makeMaterials(),batch=new Batch(scene,materials);
scene.add(new THREE.HemisphereLight(0xf3e7c9,0x63684c,1.4));
const sun=new THREE.DirectionalLight(0xffddb0,3.4);sun.position.set(18,12,-3);sun.target.position.set(0,0,0);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-16,right:16,top:15,bottom:-15,near:1,far:65});sun.shadow.bias=-.00018;sun.shadow.normalBias=.022;sun.shadow.radius=2;scene.add(sun,sun.target);
const fill=new THREE.DirectionalLight(0xc3d4d4,.58);fill.position.set(-5,7,6);scene.add(fill);
for(const [x,y,z,intensity,distance]of [[10.5,1.7,4.1,12,6],[5.7,1.8,-6.6,10,5.5],[-5.3,2.5,3,7,5],[.2,5.95,.9,17,9],[2,5.2,-6.5,10,6]]){const l=new THREE.PointLight(0xffd197,intensity,distance,2);l.position.set(x,y,z);scene.add(l);}
const pmrem=new THREE.PMREMGenerator(renderer);const roomEnv=new RoomEnvironment();const environment=pmrem.fromScene(roomEnv,.04);scene.environment=environment.texture;scene.environmentIntensity=.25;roomEnv.dispose();pmrem.dispose();
architecture(scene,batch,materials);const props=furnishings(scene,batch,materials);details(scene,batch,materials,props);exterior(scene,batch,materials);const counts=batch.finish();installCollisionLayout();

// A sparse static dust field catches sunlight without simulation or per-frame uploads.
const dustRandom=random(891),dustPositions=[];for(let i=0;i<250;i++){dustPositions.push(-3+dustRandom()*10,.6+dustRandom()*6.6,-7+dustRandom()*14);}const dustGeo=new THREE.BufferGeometry();dustGeo.setAttribute('position',new THREE.Float32BufferAttribute(dustPositions,3));const dust=new THREE.Points(dustGeo,new THREE.PointsMaterial({color:0xfce4ad,size:.012,transparent:true,opacity:.36,depthWrite:false,sizeAttenuation:true}));scene.add(dust);

const player={x:START.x,y:START.y,z:START.z};let yaw=START.yaw,pitch=START.pitch,eyeY=EYE_HEIGHT,started=false,locked=false,dragging=false,lastTime=0,high=true,showStats=false,helpOpen=true;
const keys=new Set();let samples=[],sampleClock=0;
function resize(){const maxPixels=high?2750000:1550000;renderer.setPixelRatio(Math.min(devicePixelRatio||1,high?1.5:1,Math.sqrt(maxPixels/(innerWidth*innerHeight))));renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}
window.addEventListener('resize',resize);resize();
function clearKeys(){keys.clear();dragging=false;}
function reset(){Object.assign(player,{x:START.x,y:START.y,z:START.z});yaw=START.yaw;pitch=START.pitch;eyeY=EYE_HEIGHT;clearKeys();samples=[];}
function look(dx,dy){yaw-=dx*.002;pitch=Math.max(-1.38,Math.min(1.38,pitch-dy*.0018));}
function updateHint(){document.body.classList.toggle('exploring',locked||dragging);$('hint').hidden=!started||locked||dragging||helpOpen;}
async function capture(){
  started=true;helpOpen=false;$('welcome').hidden=true;clearKeys();
  try{if(canvas.requestPointerLock)await canvas.requestPointerLock();}catch{ /* Browsers that deny capture retain click-and-drag navigation. */ }
  updateHint();
}
$('enter').addEventListener('click',capture);
$('help').addEventListener('click',()=>{helpOpen=!helpOpen;$('welcome').hidden=!helpOpen;if(helpOpen){document.exitPointerLock?.();clearKeys();$('enter').innerHTML='Resume wandering <span>↗</span>';}updateHint();});
$('reset').addEventListener('click',reset);
$('quality').addEventListener('click',()=>{high=!high;$('quality').textContent='Detail: '+(high?'High':'Balanced');dust.visible=high;resize();});
function toggleStats(){showStats=!showStats;$('stats').hidden=!showStats;}
$('statsToggle').addEventListener('click',toggleStats);
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===canvas;clearKeys();updateHint();});
document.addEventListener('pointerlockerror',()=>{locked=false;updateHint();});
canvas.addEventListener('click',()=>{if(started&&!helpOpen&&!locked&&!dragging)capture();});
canvas.addEventListener('pointerdown',e=>{if(started&&!helpOpen&&!locked&&e.button===0){dragging=true;canvas.setPointerCapture(e.pointerId);updateHint();}});
canvas.addEventListener('pointerup',()=>{dragging=false;updateHint();});
document.addEventListener('mousemove',e=>{if(locked||dragging)look(e.movementX,e.movementY);});
window.addEventListener('blur',clearKeys);document.addEventListener('visibilitychange',()=>{clearKeys();lastTime=0;samples=[];});
document.addEventListener('keydown',e=>{
  if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight','KeyQ','KeyE'].includes(e.code)){e.preventDefault();if(started&&!helpOpen)keys.add(e.code);}
  if(e.repeat)return;if(e.code==='KeyR')reset();if(e.code==='KeyH')$('help').click();if(e.code==='KeyF')toggleStats();
});
document.addEventListener('keyup',e=>keys.delete(e.code));
function location(){if(player.y>3.2)return player.z>-5.3?'The gallery · west walk':'The gallery · overlook';if(player.x>8)return 'The window reading alcove';if(player.x<-4.8&&player.z>.4&&player.z<6.7)return 'The broad stair';if(player.z<-.1)return 'The lower collection';return 'The reading hall';}
function frame(time){
  if(document.hidden){lastTime=0;requestAnimationFrame(frame);return;}
  const raw=lastTime?(time-lastTime)/1000:0;lastTime=time;const dt=Math.min(raw,.05);
  if(started&&!helpOpen){
    let f=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0),r=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);
    if(keys.has('KeyQ'))yaw+=dt*1.4;if(keys.has('KeyE'))yaw-=dt*1.4;
    const n=Math.hypot(f,r);if(n){f/=n;r/=n;const speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?3.8:2.35;move(player,(r*Math.cos(yaw)-f*Math.sin(yaw))*speed*dt,(-r*Math.sin(yaw)-f*Math.cos(yaw))*speed*dt);}
  }
  eyeY=THREE.MathUtils.lerp(eyeY,player.y+EYE_HEIGHT,1-Math.exp(-dt*18));camera.position.set(player.x,eyeY,player.z);camera.rotation.set(pitch,yaw,0,'YXZ');
  renderer.render(scene,camera);
  // Static architecture, furniture and sun: render the shadow map once.
  renderer.shadowMap.autoUpdate=false;
  if(raw>0){samples.push({t:time,ms:raw*1000});while(samples.length&&samples[0].t<time-5000)samples.shift();}
  if(time-sampleClock>500){sampleClock=time;$('location').textContent=location();if(showStats&&samples.length>5){const v=samples.map(s=>s.ms).sort((a,b)=>a-b),sum=v.reduce((a,c)=>a+c,0),at=q=>v[Math.min(v.length-1,Math.floor(v.length*q))].toFixed(1);$('timingText').textContent=`Mean  ${(sum/v.length).toFixed(1)} ms · ${(1000/(sum/v.length)).toFixed(0)} fps\nP50   ${at(.5)} ms\nP95   ${at(.95)} ms\nMax   ${v.at(-1).toFixed(1)} ms\nDraws ${renderer.info.render.calls} · ${(renderer.info.render.triangles/1000).toFixed(0)}k triangles`;}}
  requestAnimationFrame(frame);
}
// Compilation is deferred until the user launches this build. No scene was executed during authoring.
camera.position.set(player.x,EYE_HEIGHT,player.z);camera.rotation.set(pitch,yaw,0,'YXZ');
await renderer.compileAsync(scene,camera);
$('loading').style.opacity='0';setTimeout(()=>$('loading').hidden=true,650);$('welcome').hidden=false;
console.info('Hearth & Folio ready.',{...counts,books:props.bookCount,controls:'WASD/arrows walk; mouse look; Shift faster; Q/E turn; R reset; H controls; F timing'});
requestAnimationFrame(frame);
}catch(error){fatal(error);}
