import * as THREE from 'three';
import {makeMaterials,environment,rand} from './materials.js';
import {buildWorld} from './world.js';

const canvas=document.querySelector('#scene');
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});}catch(error){document.querySelector('#error').hidden=false;document.querySelector('#error').textContent='This scene needs a browser with WebGL 2 and hardware acceleration enabled. '+error.message;throw error;}
const renderRatio=q=>Math.min(devicePixelRatio,q==='high'?1.5:1,Math.sqrt((q==='high'?2073600:1200000)/(innerWidth*innerHeight)));
renderer.setPixelRatio(renderRatio('high'));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.93;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
const scene=new THREE.Scene();scene.background=new THREE.Color('#182734');scene.fog=new THREE.FogExp2('#1b2d36',.019);scene.environment=environment(renderer);scene.environmentIntensity=.42;
const camera=new THREE.PerspectiveCamera(67,innerWidth/innerHeight,.07,85);camera.rotation.order='YXZ';
const hemi=new THREE.HemisphereLight('#b3cce0','#3e4740',1.15);scene.add(hemi);
const moon=new THREE.DirectionalLight('#aec9e3',1.55);moon.position.set(-7,16,7);moon.target.position.set(0,0,-5);scene.add(moon,moon.target);moon.castShadow=true;moon.shadow.mapSize.set(2048,2048);moon.shadow.camera.left=-18;moon.shadow.camera.right=18;moon.shadow.camera.top=22;moon.shadow.camera.bottom=-22;moon.shadow.camera.near=1;moon.shadow.camera.far=45;moon.shadow.bias=-.0003;moon.shadow.normalBias=.035;
const materials=makeMaterials(renderer);
const world=buildWorld(scene,materials);
// Two fixed shadowed lights capture the stall canopies and tea-room counter; all maps are baked once.
for(const index of[1,5]){const l=world.lamps[index];if(!l)continue;l.castShadow=true;const size=index===5?1024:512;l.shadow.mapSize.set(size,size);l.shadow.radius=2.5;l.shadow.bias=-.001;l.shadow.normalBias=.018;l.shadow.camera.near=.12;l.shadow.camera.far=8;}
renderer.shadowMap.needsUpdate=true;

// All lantern haloes share one draw call, and remain occluded by walls and roofs.
const glowPositions=[],glowSizes=[],glowColors=[];for(const l of world.lanterns){glowPositions.push(...l.position.toArray());glowSizes.push(l.radius*5.5);glowColors.push(...new THREE.Color(l.red?'#fba367':'#ffd8a4').toArray());}
const glowGeometry=new THREE.BufferGeometry();glowGeometry.setAttribute('position',new THREE.Float32BufferAttribute(glowPositions,3));glowGeometry.setAttribute('aSize',new THREE.Float32BufferAttribute(glowSizes,1));glowGeometry.setAttribute('color',new THREE.Float32BufferAttribute(glowColors,3));
const glowMaterial=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,vertexColors:true,uniforms:{uHeight:{value:innerHeight*renderer.getPixelRatio()}},vertexShader:`attribute float aSize;uniform float uHeight;varying vec3 vColor;void main(){vColor=color;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=aSize*uHeight*projectionMatrix[1][1]/max(1.,-mv.z);}`,fragmentShader:`varying vec3 vColor;void main(){float r=length(gl_PointCoord-.5)*2.;float glow=exp(-r*r*7.)*.16*(1.-smoothstep(.8,1.,r));gl_FragColor=vec4(vColor,glow);}`});
const glow=new THREE.Points(glowGeometry,glowMaterial);glow.frustumCulled=false;scene.add(glow);

// Delicate steam with no simulation, texture loading or dynamic light updates.
const count=world.steamSources.length*22,positions=new Float32Array(count*3),seeds=new Float32Array(count*4);
world.steamSources.forEach((s,j)=>{for(let i=0;i<22;i++){const k=j*22+i;positions.set(s.position.toArray(),k*3);seeds.set([rand(),rand(),s.spread,s.height],k*4);}});
const steamGeometry=new THREE.BufferGeometry();steamGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));steamGeometry.setAttribute('aSeed',new THREE.BufferAttribute(seeds,4));
const steamMaterial=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uTime:{value:0},uPixel:{value:renderer.getPixelRatio()}},vertexShader:`attribute vec4 aSeed;uniform float uTime;uniform float uPixel;varying float vAlpha;void main(){float age=fract(aSeed.x+uTime*.105);vec3 p=position;p.x+=(aSeed.y-.5)*aSeed.z+sin(age*5.+aSeed.y*12.)*.11*age;p.z+=cos(age*4.+aSeed.x*9.)*.10*age;p.y+=age*aSeed.w;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(27.+age*68.)*uPixel/max(1.,-mv.z);vAlpha=sin(age*3.14159)*.12;}`,fragmentShader:`varying float vAlpha;void main(){float d=length(gl_PointCoord-.5)*2.;float a=pow(max(0.,1.-d),2.)*vAlpha;gl_FragColor=vec4(.77,.82,.80,a);}`});
const steam=new THREE.Points(steamGeometry,steamMaterial);steam.frustumCulled=false;scene.add(steam);

const keys=new Set();let yaw=.025,pitch=-.035,locked=false,dragging=false,started=false,walkTime=0,quality='high';
const position=new THREE.Vector3(0,1.66,10.65),velocity=new THREE.Vector3();const radius=.24;
camera.position.copy(position);camera.rotation.set(pitch,yaw,0);
function overlaps(x,z,c,r=radius){const dx=x-c.x,dz=z-c.z,co=Math.cos(c.angle),si=Math.sin(c.angle),lx=dx*co-dz*si,lz=dx*si+dz*co;const qx=Math.max(-c.hx,Math.min(c.hx,lx)),qz=Math.max(-c.hz,Math.min(c.hz,lz));return (lx-qx)**2+(lz-qz)**2<r*r;}
function blocked(x,z){return world.colliders.some(c=>overlaps(x,z,c));}
function move(dx,dz){const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.08));for(let i=0;i<steps;i++){const xx=dx/steps,zz=dz/steps;if(!blocked(position.x+xx,position.z))position.x+=xx;if(!blocked(position.x,position.z+zz))position.z+=zz;}}
function begin(){started=true;document.body.classList.add('exploring');try{const promise=canvas.requestPointerLock();if(promise?.catch)promise.catch(()=>{});}catch{}canvas.focus();}
function reset(){position.set(0,1.66,10.65);yaw=.025;pitch=-.035;velocity.set(0,0,0);keys.clear();camera.position.copy(position);camera.rotation.set(pitch,yaw,0);}
canvas.tabIndex=0;document.querySelector('#enter').onclick=begin;canvas.addEventListener('click',()=>{if(!dragging&&!locked)begin();});document.querySelector('#reset').onclick=reset;document.querySelector('#home').onclick=e=>{e.preventDefault();reset();};
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===canvas;document.body.classList.toggle('locked',locked);if(!locked)keys.clear();});
document.addEventListener('mousemove',e=>{if(locked||dragging){yaw-=e.movementX*.0021;pitch-=e.movementY*.0021;pitch=Math.max(-1.38,Math.min(1.32,pitch));}});
canvas.addEventListener('pointerdown',e=>{if(!locked){dragging=true;started=true;document.body.classList.add('exploring');canvas.setPointerCapture(e.pointerId);}});canvas.addEventListener('pointerup',()=>{dragging=false;});window.addEventListener('blur',()=>{keys.clear();dragging=false;});
function help(){const p=document.querySelector('#controls');p.hidden=!p.hidden;if(!p.hidden&&locked)document.exitPointerLock();keys.clear();}document.querySelector('#help').onclick=help;document.querySelector('#close-help').onclick=help;
window.addEventListener('keydown',e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();if(!e.repeat){if(e.code==='KeyR')reset();if(e.code==='KeyH')help();if(e.code==='KeyP')document.querySelector('#metrics').hidden=!document.querySelector('#metrics').hidden;}keys.add(e.code);if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown'].includes(e.code)){started=true;document.body.classList.add('exploring');}});
window.addEventListener('keyup',e=>keys.delete(e.code));
document.querySelector('#quality').onclick=()=>{quality=quality==='high'?'balanced':'high';renderer.setPixelRatio(renderRatio(quality));renderer.setSize(innerWidth,innerHeight);steamMaterial.uniforms.uPixel.value=renderer.getPixelRatio();glowMaterial.uniforms.uHeight.value=innerHeight*renderer.getPixelRatio();document.querySelector('#quality').textContent='Quality: '+quality;};
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(renderRatio(quality));renderer.setSize(innerWidth,innerHeight);steamMaterial.uniforms.uPixel.value=renderer.getPixelRatio();glowMaterial.uniforms.uHeight.value=innerHeight*renderer.getPixelRatio();});

// Exposed measurements describe this run, not a promised frame rate on other hardware.
const frameTimes=[],MAX_FRAMES=3600;let last=performance.now(),elapsed=0,lastMetrics=0,frames=0;
function timingCSV(){let total=0;return 'frame,elapsed_ms,frame_ms\n'+frameTimes.map((ms,i)=>`${i+1},${(total+=ms).toFixed(3)},${ms.toFixed(3)}`).join('\n');}
document.querySelector('#export-metrics').onclick=()=>{const blob=new Blob([timingCSV()],{type:'text/csv'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='raincourt-frame-times.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
function measure(){const s=[...frameTimes].sort((a,b)=>a-b);const p=q=>s[Math.min(s.length-1,Math.floor(s.length*q))]||0;return{frames:s.length,medianMs:+p(.5).toFixed(2),p95Ms:+p(.95).toFixed(2),p99Ms:+p(.99).toFixed(2),maxMs:+(s.at(-1)||0).toFixed(2),fps:+(1000/(p(.5)||1)).toFixed(1),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,position:{x:+position.x.toFixed(2),z:+position.z.toFixed(2)},pixelRatio:renderer.getPixelRatio(),resolution:renderer.getDrawingBufferSize(new THREE.Vector2()).toArray(),quality};}
const locationName=()=>position.z<-19.4?'ONE LAST CUP':position.z<-12.2?'THE COVERED PASSAGE':'NIGHT MARKET';
function animate(now){const raw=now-last;last=now;const dt=Math.min(raw/1000,.05);elapsed+=dt;if(frames>20&&document.visibilityState==='visible'){frameTimes.push(raw);if(frameTimes.length>MAX_FRAMES)frameTimes.shift();}
 const turn=(keys.has('KeyQ')?1:0)-(keys.has('KeyE')?1:0);yaw+=turn*dt*1.1;
 let fw=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0),st=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);const len=Math.hypot(fw,st);if(len){fw/=len;st/=len;}
 const speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?3.65:2.35,tx=(-Math.sin(yaw)*fw+Math.cos(yaw)*st)*speed,tz=(-Math.cos(yaw)*fw-Math.sin(yaw)*st)*speed;const ease=1-Math.exp(-dt*14);velocity.x+=(tx-velocity.x)*ease;velocity.z+=(tz-velocity.z)*ease;if(Math.abs(velocity.x)<.0001)velocity.x=0;if(Math.abs(velocity.z)<.0001)velocity.z=0;move(velocity.x*dt,velocity.z*dt);if(len)walkTime+=dt*7;camera.position.set(position.x,1.66+(len?Math.sin(walkTime)*.009:0),position.z);camera.rotation.set(pitch,yaw,0);steamMaterial.uniforms.uTime.value=elapsed;renderer.render(scene,camera);frames++;
 if(now-lastMetrics>700){lastMetrics=now;const area=locationName();document.querySelector('#location').textContent=area;document.querySelector('#area').textContent=area==='NIGHT MARKET'?(position.z>8?'COURTYARD ENTRANCE':'THE COURTYARD'):area;if(!document.querySelector('#metrics').hidden){const a=measure();document.querySelector('#metrics-text').textContent=`FRAME TIMES · rolling ${a.frames} frames\nMedian   ${a.medianMs.toFixed(2)} ms\n95th     ${a.p95Ms.toFixed(2)} ms\n99th     ${a.p99Ms.toFixed(2)} ms\nDraws    ${a.drawCalls}\nTris     ${a.triangles.toLocaleString()}\nBuffer   ${a.resolution.join(' × ')}\nQuality  ${a.quality}\n\nP to hide · Esc to release mouse`;}}
 requestAnimationFrame(animate);
}
// Local inspection hooks support repeatable collision and route verification.
window.__raincourt={ready:false,measure,reset,timingCSV,colliders:world.colliders,blocked,move:(dx,dz)=>move(dx,dz),setView:(x,z,y,p=0)=>{position.set(x,1.66,z);yaw=y;pitch=p;velocity.set(0,0,0);},getView:()=>({x:position.x,z:position.z,yaw,pitch}),clearMeasurements:()=>{frameTimes.length=0;},info:{three:THREE.REVISION,world:world.stats,materials:Object.keys(materials).length},renderer};
// Upload all material textures and warm the reverse-facing batches before the viewer enters.
// This keeps the first turn away from the opening view from triggering lazy texture uploads.
const initialized=new Set();scene.traverse(o=>{if(!o.material)return;for(const material of(Array.isArray(o.material)?o.material:[o.material]))for(const key of['map','bumpMap','roughnessMap','emissiveMap']){const texture=material[key];if(texture&&!initialized.has(texture)){renderer.initTexture(texture);initialized.add(texture);}}});
await renderer.compileAsync(scene,camera);
for(let i=0;i<4;i++){camera.rotation.y=yaw+i*Math.PI/2;renderer.render(scene,camera);}camera.rotation.y=yaw;renderer.render(scene,camera);last=performance.now();window.__raincourt.ready=true;
requestAnimationFrame(animate);requestAnimationFrame(()=>{const loading=document.querySelector('#loading');loading.style.opacity=0;setTimeout(()=>loading.remove(),700);});
