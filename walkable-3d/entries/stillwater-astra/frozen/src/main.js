import * as THREE from 'three';
import {createMaterials,createWater} from './materials.js';
import {buildWorld} from './world.js';
import {Walker} from './navigation.js';

const $=id=>document.getElementById(id);
let renderer;
const error=message=>{$('error').hidden=false;$('error').textContent=message;};
window.addEventListener('error',e=>error(`The scene encountered an error.\n${e.message}\nCheck that you opened the localhost address after running npm start.`));
window.addEventListener('unhandledrejection',e=>{if(!String(e.reason).includes('lock'))error(`Could not finish loading the scene.\n${e.reason}`);});

try{
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
}catch(e){error('WebGL 2 is needed to explore Stillwater. Please use a current desktop browser with hardware acceleration enabled.\n'+e.message);throw e;}
renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.07;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;renderer.shadowMap.autoUpdate=false;
renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','Stillwater 3D view. WASD to walk, mouse or drag to look, R to reset.');$('viewport').appendChild(renderer.domElement);
renderer.debug.onShaderError=(gl,program,vertex,fragment)=>{console.error(gl.getProgramInfoLog(program),gl.getShaderInfoLog(vertex),gl.getShaderInfoLog(fragment));error('A graphics shader could not be compiled by this browser. See the developer console for the driver diagnostic.');};

const scene=new THREE.Scene();scene.background=new THREE.Color(0xb9cecf);scene.fog=new THREE.FogExp2(0xb9ccc7,.008);
const camera=new THREE.PerspectiveCamera(66,innerWidth/innerHeight,.06,350);
const hemi=new THREE.HemisphereLight(0xc8dce4,0x696849,1.75);scene.add(hemi);
const sun=new THREE.DirectionalLight(0xffdfac,3.15);sun.position.set(-19,26,28);sun.target.position.set(0,0,3);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-22;sun.shadow.camera.right=22;sun.shadow.camera.top=22;sun.shadow.camera.bottom=-18;sun.shadow.camera.near=1;sun.shadow.camera.far=85;sun.shadow.bias=-.00022;sun.shadow.normalBias=.025;sun.shadow.radius=3;scene.add(sun,sun.target);
// Subtle cool light returned by the inlet into the open workshop.
const fill=new THREE.PointLight(0xb4d9d0,7,10,2);fill.position.set(.4,3.1,2.4);scene.add(fill);

const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{sunDir:{value:sun.position.clone().normalize()}},vertexShader:`varying vec3 vPos;void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`
 precision highp float;varying vec3 vPos;uniform vec3 sunDir;
 void main(){vec3 d=normalize(vPos);float h=max(d.y,0.);vec3 col=mix(vec3(.77,.83,.79),vec3(.37,.58,.68),pow(h,.6));
 float sun=max(dot(d,sunDir),0.);col+=vec3(.23,.17,.07)*pow(sun,22.);col+=vec3(1.,.86,.60)*smoothstep(.9991,.99965,sun)*2.;
 float streak=sin(d.x*20.+d.z*8.+sin(d.z*13.)*.4)*sin(d.x*9.-d.z*17.);float cloud=smoothstep(.44,.78,streak)*smoothstep(.07,.19,h)*(1.-smoothstep(.28,.49,h));col=mix(col,vec3(.9,.9,.82),cloud*.20);
 gl_FragColor=vec4(col,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }
 `});
const sky=new THREE.Mesh(new THREE.SphereGeometry(250,32,16),skyMat);sky.frustumCulled=false;scene.add(sky);

const materials=createMaterials();for(const value of Object.values(materials)){if(value?.isMaterial){for(const key of ['map','bumpMap'])if(value[key])value[key].anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());}}
const world=buildWorld(scene,materials);const water=createWater();water.mat.uniforms.sunDir.value.copy(sun.position).normalize();scene.add(water.mesh);
renderer.shadowMap.needsUpdate=true;
let toastTimer;
function toast(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3600);}
function onArea(area){$('area-number').textContent=area[0];$('area-label').replaceChildren(document.createTextNode(area[1]));const small=document.createElement('small');small.textContent=area[2];$('area-label').appendChild(small);}
function onLock(locked){$('reticle').hidden=!locked;if(locked){document.body.classList.add('playing');$('settings').hidden=true;}else if(walker.enabled)toast('Cursor released · click the view to resume, or drag to look.');}
const walker=new Walker(camera,renderer.domElement,world.colliders,onArea,onLock,toast);
$('enter').addEventListener('click',()=>{document.body.classList.add('playing');walker.capture();});
renderer.domElement.addEventListener('click',()=>{if(walker.enabled&&!walker.dragging&&performance.now()-walker.lastDragTime>220&&document.pointerLockElement!==renderer.domElement)walker.capture();});
$('reset-button').addEventListener('click',()=>{walker.reset();toast('Returned to the workshop.');});
$('help-button').addEventListener('click',()=>{if(document.pointerLockElement)document.exitPointerLock();document.body.classList.remove('playing');walker.keys.clear();$('settings').hidden=true;$('enter').textContent='Resume exploring ↗';});
$('settings-button').addEventListener('click',()=>{if(document.pointerLockElement)document.exitPointerLock();$('settings').hidden=!$('settings').hidden;});
$('sensitivity').addEventListener('input',e=>walker.sensitivity=Number(e.target.value));
$('quality').addEventListener('change',e=>{
 const quality=e.target.value;renderer.setPixelRatio(Math.min(devicePixelRatio,quality==='high'?2:quality==='balanced'?1.5:1));
 sun.shadow.mapSize.set(quality==='low'?1024:2048,quality==='low'?1024:2048);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null;}renderer.shadowMap.needsUpdate=true;renderer.setSize(innerWidth,innerHeight);toast(`${e.target.selectedOptions[0].text} display quality`);
});
let showStats=false;const samples=new Float32Array(240);let sampleIndex=0,sampleCount=0,statsTick=0;
function statsToggle(value){showStats=value;$('stats').hidden=!value;$('show-stats').checked=value;}
$('show-stats').addEventListener('change',e=>statsToggle(e.target.checked));
window.addEventListener('keydown',e=>{if(e.code==='F3'){e.preventDefault();statsToggle(!showStats);}if(e.code==='KeyH'){if(document.pointerLockElement)document.exitPointerLock();$('help-button').click();}});
const chart=$('frame-chart').getContext('2d');
function updateStats(ms){
 samples[sampleIndex]=ms;sampleIndex=(sampleIndex+1)%samples.length;sampleCount=Math.min(sampleCount+1,samples.length);statsTick+=ms;
 if(!showStats||statsTick<300)return;statsTick=0;
 const times=Array.from(samples.subarray(0,sampleCount)).sort((a,b)=>a-b),mean=times.reduce((a,b)=>a+b,0)/times.length,p95=times[Math.floor((times.length-1)*.95)];
 $('fps').textContent=Math.round(1000/mean);$('frame-ms').textContent=mean.toFixed(1);$('stats-detail').textContent=`p95 ${p95.toFixed(1)} ms · ${renderer.info.render.calls} draws · ${(renderer.info.render.triangles/1000).toFixed(0)}k tris`;
 chart.clearRect(0,0,230,46);chart.strokeStyle='#bdd4b529';chart.beginPath();chart.moveTo(0,46-16.67/50*46);chart.lineTo(230,46-16.67/50*46);chart.stroke();chart.beginPath();chart.strokeStyle='#d6c991';chart.lineWidth=1;
 for(let i=0;i<Math.min(230,sampleCount);i++){const n=(sampleIndex-1-i+samples.length)%samples.length,x=229-i,y=46-Math.min(samples[n],50)/50*46;if(i===0)chart.moveTo(x,y);else chart.lineTo(x,y);}chart.stroke();
}
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
// The scene is static except for water shading and the walker. Shadows are cached.
let last=performance.now(),elapsed=0;
function frame(now){
 const ms=now-last;last=now;if(document.hidden){requestAnimationFrame(frame);return;}
 const dt=Math.min(ms/1000,.05);elapsed+=dt;walker.update(dt);water.mat.uniforms.time.value=elapsed;renderer.render(scene,camera);if(ms<1000)updateStats(ms);requestAnimationFrame(frame);
}
document.addEventListener('visibilitychange',()=>{last=performance.now();});
// Compile the full material set before enabling entry, so turns do not discover new shaders.
await renderer.compileAsync(scene,camera);
renderer.render(scene,camera);last=performance.now();
$('enter').disabled=false;$('enter').innerHTML='Enter the workshop <span>↗</span>';
requestAnimationFrame(frame);
// Read-only diagnostics, without running an automatic tour or benchmark.
window.STILLWATER={version:'1.0.0',three:THREE.REVISION,geometry:world.details,getPosition:()=>({x:walker.x,z:walker.z,y:camera.position.y}),getFrameSummary:()=>{const a=Array.from(samples.subarray(0,sampleCount)).sort((a,b)=>a-b);return {samples:a.length,meanMs:a.reduce((s,n)=>s+n,0)/Math.max(1,a.length),p95Ms:a[Math.floor((a.length-1)*.95)]||0};}};
