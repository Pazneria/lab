(function(R){
'use strict';
const {T,PI,C,scene,mats,stories,navigation:nav}=R,canvas=document.getElementById('view'),loading=document.getElementById('loading');
let renderer;
try{renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance',stencil:false,preserveDrawingBuffer:false})}
catch(e){loading.textContent='This room needs WebGL. Enable hardware acceleration and reload.';console.error(e);return}
renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.07;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
const camera=new T.PerspectiveCamera(64,1,.043,249);camera.rotation.order='YXZ';
scene.background=new T.Color('#c6c2a8');
/* A small static reflection field gives the worn metals, tea glaze and hide
   soft room reflections without live mirrors, refraction or scene captures. */
const ew=128,eh=64,env=new Uint8Array(ew*eh*4);
for(let y=0;y<eh;y++)for(let x=0;x<ew;x++){
 const u=x/ew,v=y/eh,high=Math.max(0,Math.sin(v*PI)),win=Math.exp(-((u-.46)**2/.018+(v-.51)**2/.044)),fire=Math.exp(-((u-.94)**2/.009+(v-.39)**2/.025)),p=(y*ew+x)*4;
 env[p]=Math.min(255,53+45*high+111*win+101*fire);env[p+1]=Math.min(255,42+39*high+119*win+45*fire);env[p+2]=Math.min(255,33+33*high+113*win+17*fire);env[p+3]=255
}
const et=new T.DataTexture(env,ew,eh,T.RGBAFormat);et.mapping=T.EquirectangularReflectionMapping;et.colorSpace=T.SRGBColorSpace;et.needsUpdate=true;scene.environment=et;
scene.add(new T.HemisphereLight('#f8eedf','#b59d80',1.22));
const skyFill=new T.DirectionalLight('#d6e1df',.62);skyFill.position.set(3.7,2.7,-2);scene.add(skyFill);
const sun=new T.DirectionalLight('#ffe2aa',3.45);sun.position.set(12.9,6.32,-4.84);sun.target.position.set(0,.78,-.52);scene.add(sun,sun.target);
sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-6.6,right:6.6,top:5.2,bottom:-5.2,near:3,far:24});sun.shadow.camera.updateProjectionMatrix();sun.shadow.bias=-.00019;sun.shadow.normalBias=.013;
function lamp(x,y,z,col,power,range){const l=new T.PointLight(col,power,range,2);l.position.set(x,y,z);scene.add(l);return l}
const hearth=lamp(-3.43,.70,2.11,'#ffab62',12.3,5.5);
lamp(-1.27,1.015,-2.59,'#ffd39a',2.55,3.8);lamp(2.77,1.18,-5.031,'#ffd397',3.65,4.1);
lamp(-.72,2.305,1.08,'#ffdbac',5.0,7.8);
R.finish();renderer.shadowMap.needsUpdate=true;
const outside=scene.children.filter(obj=>/^(balcony \/|vista \/|Vesper ridge|Daylight panorama|Valley floor)/.test(obj.name)),alcove=scene.children.filter(o=>o.name.startsWith('study /'));
const frustum=new T.Frustum(),viewProjection=new T.Matrix4(),bounds=(a,b)=>new T.Box3(new T.Vector3(...a),new T.Vector3(...b));
const openings=[[-.99,.70,0,2.53],[-2.79,-1.13,.78,2.55],[-5.00,-3.42,0,2.38]].map(([z0,z1,y0,y1])=>bounds([3.36,y0,z0],[3.77,y1,z1]));
const studyMouth=bounds([.48,-.05,-3.27],[3.40,2.62,-2.84]);
function updateVisibility(){
 if(renderer.shadowMap.needsUpdate)return;
 frustum.setFromProjectionMatrix(viewProjection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
 const external=player.x>3.23||openings.some(b=>frustum.intersectsBox(b));
 const study=player.z< -2.68||player.x>3.18||frustum.intersectsBox(studyMouth);
 for(const m of outside)m.visible=external;for(const m of alcove)m.visible=study
}
const cap=Math.min(1.55,window.devicePixelRatio||1);
function resize(){const width=canvas.clientWidth||innerWidth,height=canvas.clientHeight||innerHeight;
 renderer.setPixelRatio(Math.min(cap,Math.sqrt(2073600/(width*height))));renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix()}
resize();addEventListener('resize',resize);
const start=document.getElementById('start'),resetBtn=document.getElementById('reset'),focus=document.getElementById('focus'),note=document.getElementById('note'),reticle=document.getElementById('reticle');
const player={...nav.spawn},keys=new Set();let velX=0,velZ=0,locked=false,drag=false,lastX=0,lastY=0,engaged=false,lookX=0,lookY=0,focusStory=null,noteStory=null,bob=0,phase=0;
const direction=new T.Vector3(),target=new T.Vector3();
function closeNote(){note.hidden=true;noteStory=null}
function reset(){Object.assign(player,nav.spawn);velX=velZ=bob=phase=lookX=lookY=0;keys.clear();closeNote();focus.hidden=true;focusStory=null;syncCamera();canvas.focus({preventScroll:true})}
function syncCamera(){camera.position.set(player.x,1.574+bob,player.z);camera.rotation.set(player.pitch,player.yaw,0,'YXZ');camera.updateMatrixWorld()}
function walkState(v){engaged=v;document.body.classList.toggle('walking',v);if(!v){focus.hidden=true;closeNote()}}
function grab(){
 canvas.focus({preventScroll:true});
 if(!canvas.requestPointerLock){start.querySelector('span:last-child').textContent='Drag to look';walkState(true);return}
 try{const p=canvas.requestPointerLock();if(p&&p.catch)p.catch(()=>{start.querySelector('span:last-child').textContent='Drag to look';walkState(true)})}catch(e){start.querySelector('span:last-child').textContent='Drag to look';walkState(true)}
}
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===canvas;drag=false;keys.clear();velX=velZ=lookX=lookY=0;walkState(locked)});
document.addEventListener('pointerlockerror',()=>{start.querySelector('span:last-child').textContent='Drag to look';walkState(true)});
canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;lastX=e.clientX;lastY=e.clientY;drag=true;if(!locked)grab()});
document.addEventListener('pointerup',()=>{drag=false});
document.addEventListener('mousemove',e=>{if(locked){lookX+=Math.max(-350,Math.min(350,e.movementX));lookY+=Math.max(-350,Math.min(350,e.movementY))}
 else if(drag){lookX+=e.clientX-lastX;lookY+=e.clientY-lastY;lastX=e.clientX;lastY=e.clientY}});
canvas.addEventListener('touchmove',e=>{if(e.touches.length===1){let t=e.touches[0];lookX+=t.clientX-lastX;lookY+=t.clientY-lastY;lastX=t.clientX;lastY=t.clientY;e.preventDefault()}},{passive:false});
start.addEventListener('click',grab);start.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();grab()}});resetBtn.addEventListener('click',reset);
function inspect(){if(noteStory){closeNote();return}if(!focusStory)return;noteStory=focusStory;note.querySelector('h2').textContent=noteStory.title;note.querySelector('p').textContent=noteStory.body;note.hidden=false;focus.hidden=true}
const motion=['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'];
document.addEventListener('keydown',e=>{
 if(e.ctrlKey||e.altKey||e.metaKey)return;if(motion.includes(e.code)){keys.add(e.code);e.preventDefault();if(!engaged)walkState(true)}
 if(!e.repeat&&e.code==='KeyR')reset();
 if(!e.repeat&&e.code==='KeyE'){inspect();e.preventDefault()}if(e.code==='Escape'&&!locked){walkState(false);keys.clear();drag=false}
});
document.addEventListener('keyup',e=>keys.delete(e.code));
function stop(){keys.clear();velX=velZ=lookX=lookY=0;drag=false}
addEventListener('blur',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
function nearestStory(){
 if(!engaged||noteStory){focus.hidden=true;return}camera.getWorldDirection(direction);let best=null,bestScore=-1;
 for(const s of stories){target.copy(s.p).sub(camera.position);const d=target.length();if(d>s.range||d<.1)continue;const dot=target.multiplyScalar(1/d).dot(direction);
 if(dot<.976)continue;let blocked=false;const steps=Math.ceil(d/.17);for(let i=1;i<steps;i++){const q=i/steps,x=player.x+(s.p.x-player.x)*q,z=player.z+(s.p.z-player.z)*q;for(let o of R.solids){if(o.tag!=='wall')continue;let dx=x-o.x,dz=z-o.z;if(Math.abs(dx*o.cs-dz*o.sn)<o.w&&Math.abs(dx*o.sn+dz*o.cs)<o.d){blocked=true;break}}if(blocked)break}
 const score=dot-.014*d;if(!blocked&&score>bestScore){best=s;bestScore=score}}
 if(best!==focusStory){focusStory=best;if(best)focus.querySelector('span').textContent=best.label}focus.hidden=!best
}
reset();const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let prev=performance.now(),startTime=prev,focusIn=0,ready=false;
function frame(now){
 requestAnimationFrame(frame);if(document.hidden){prev=now;return}
 const dt=Math.max(0,Math.min(.040,(now-prev)/1000));prev=now;const t=(now-startTime)/1000;
 player.yaw-=lookX*.00203;player.pitch=Math.max(-1.46,Math.min(1.46,player.pitch-lookY*.00203));lookX=lookY=0;
 player.yaw+=((keys.has('ArrowLeft')?1:0)-(keys.has('ArrowRight')?1:0))*dt*1.65;
 let f=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0),s=(keys.has('KeyD')?1:0)-(keys.has('KeyA')?1:0);
 const m=Math.max(1,Math.hypot(f,s)),rate=keys.has('ShiftLeft')||keys.has('ShiftRight')?2.41:1.59;f=f/m*rate;s=s/m*rate;
 const sn=Math.sin(player.yaw),cs=Math.cos(player.yaw),wantedX=-sn*f+cs*s,wantedZ=-cs*f-sn*s,mix=1-Math.exp(-dt*(f||s?16:24));
 velX+=(wantedX-velX)*mix;velZ+=(wantedZ-velZ)*mix;
 if(Math.abs(velX)+Math.abs(velZ)>.001){const lastX=player.x,lastZ=player.z;nav.move(player,dt*velX,dt*velZ);const travel=Math.hypot(player.x-lastX,player.z-lastZ);phase+=travel*9.9;bob+=(Math.sin(phase)*Math.min(.007,travel*.29)-bob)*Math.min(1,dt*12);if(noteStory&&travel>.004)closeNote()}else bob*=Math.max(0,1-dt*15);
 if(reduced)bob=0;syncCamera();
 if(!reduced){for(const a of R.animations)a(t);hearth.intensity=12.3+.23*Math.sin(t*3.9)+.17*Math.sin(t*6.3)}
 focusIn-=dt;if(focusIn<=0){nearestStory();focusIn=.1}
 updateVisibility();renderer.render(scene,camera);
 if(!ready&&(t>3||Object.values(R.textures).every(q=>q.image))){ready=true;loading.style.opacity=0;setTimeout(()=>loading.hidden=true,480)}
}
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();loading.hidden=false;loading.style.opacity=1;loading.textContent='Graphics context interrupted. Reload to return to the room.'});
/* Compile all material variants before exploration to avoid first-visit shader stalls. */
const begin=()=>requestAnimationFrame(frame);
if(typeof renderer.compileAsync==='function')renderer.compileAsync(scene,camera).then(begin,begin);else begin();
})(Room);
