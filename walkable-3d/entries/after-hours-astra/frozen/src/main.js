import * as THREE from 'three';
import {createWorld,room} from './world.js';
import {createMovement,wallColliders} from './movement.js';

const $=id=>document.getElementById(id);
let renderer;
try{
 renderer=new THREE.WebGLRenderer({canvas:$('scene'),antialias:true,powerPreference:'high-performance',alpha:false});
}catch(error){$('load').hidden=true;$('welcome').hidden=true;$('error').hidden=false;$('error').textContent='This scene needs a browser with WebGL 2 enabled.\n\n'+error.message;throw error;}
renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.65));renderer.setSize(window.innerWidth,window.innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.22;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
const scene=new THREE.Scene();scene.background=new THREE.Color('#0d1922');scene.fog=new THREE.Fog('#18242c',12,23);
const camera=new THREE.PerspectiveCamera(66,window.innerWidth/window.innerHeight,.065,40);
let world,movement,started=false,lowQuality=false,last=performance.now(),frameId;

function reportError(error){$('load').hidden=true;$('error').hidden=false;$('error').textContent='The arcade could not finish loading.\n'+(error?.message||String(error))+'\n\nServe the dist directory using the launch command in README.txt.';}
window.addEventListener('error',event=>reportError(event.error||event.message));
window.addEventListener('unhandledrejection',event=>reportError(event.reason));

// Give the loading message one paint before the bounded procedural setup.
requestAnimationFrame(()=>{try{
 world=createWorld(scene);
 movement=createMovement(camera,$('scene'),[...wallColliders(room),...world.colliders],{
  onPause:()=>{if(started)$('paused').hidden=false;},
  onLookMode:mode=>{$('hint').innerHTML=mode==='drag'?'WASD to walk <b>·</b> Hold left mouse + drag to look <b>·</b> R to reset':'WASD to walk <b>·</b> Mouse to look <b>·</b> Esc to pause';$('paused').hidden=true;}
 });
 renderer.render(scene,camera);$('load').hidden=true;$('enter').disabled=false;
 // Counts are engineering diagnostics, not performance measurements.
 window.arcadeDiagnostics=Object.freeze({geometry:world.stats,version:'1.0.0',renderer:'Three.js 0.180.0',note:'No frame-rate claim. Judge interactively in a separate session.'});
 loop(performance.now());
}catch(error){reportError(error);}});

function enter(){if(!movement)return;started=true;$('welcome').hidden=true;$('hud').hidden=false;$('paused').hidden=true;movement.capture();}
$('enter').addEventListener('click',enter);$('resume').addEventListener('click',enter);
$('reset').addEventListener('click',()=>{movement?.reset();if(started)enter();});
$('help').addEventListener('click',()=>{$('helpbox').hidden=!$('helpbox').hidden;});
$('quality').addEventListener('click',()=>{lowQuality=!lowQuality;renderer.setPixelRatio(lowQuality?Math.min(window.devicePixelRatio,1):Math.min(window.devicePixelRatio,1.65));renderer.shadowMap.enabled=!lowQuality;renderer.shadowMap.needsUpdate=true;$('quality').textContent='Quality: '+(lowQuality?'light':'high');});
document.addEventListener('keydown',e=>{if(e.code==='KeyR'&&started&&!e.repeat){movement?.reset();e.preventDefault();}if(e.code==='KeyH'&&started&&!e.repeat)$('helpbox').hidden=!$('helpbox').hidden;});
window.addEventListener('resize',()=>{camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);});
$('scene').addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(frameId);$('error').hidden=false;$('error').textContent='The graphics context was interrupted. Reload this page to return to the entrance.';});

let lastZone='';function updateZone(){if(!movement)return;const p=movement.position;let name='01 / ENTRY',caption='WELCOME BACK';if(p.x>3.8){name='05 / TOKEN COUNTER';caption='A LITTLE CHANGE GOES A LONG WAY';}else if(p.z<-2.3){name='03 / MOONWAKE';caption='NIGHT COURIER • FEATURE CABINET';}else if(p.x<-1.25&&p.z<1.45){name='02 / DEEPWATER';caption='TIDAL CIRCUIT • DEEP SIGNAL';}else if(p.x>1.25&&p.z<1.3){name='04 / CITYLINE';caption='SWITCHYARD • SUNSET RUNNER';}else if(p.z<2.9){name='AFTER HOURS';caption='TAKE YOUR TIME';}if(lastZone!==name){$('location').firstElementChild.textContent=name;$('location').lastElementChild.textContent=caption;lastZone=name;}}
function loop(time){frameId=requestAnimationFrame(loop);const dt=Math.min((time-last)/1000,.05);last=time;if(document.hidden)return;movement?.tick(dt);updateZone();renderer.render(scene,camera);}
