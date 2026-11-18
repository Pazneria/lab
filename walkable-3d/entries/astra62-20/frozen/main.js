import * as T from './package/build/three.module.min.js';
import {loadScene} from './scene-loader.js';
import {start,eye,walk,makeBounds,floorHeight} from './walk.js';

const mount=document.querySelector('#scene'),status=document.querySelector('#instruction'),help=document.querySelector('#help'),panel=document.querySelector('#helpPanel');
async function initialise(){
  const scene=new T.Scene();scene.background=new T.Color('#cfcab2');scene.fog=new T.FogExp2('#cacbb7',.0142);
  const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
  const canvas=renderer.domElement;canvas.tabIndex=0;canvas.setAttribute('aria-label',"Walk through Iris Vale's wagon and camp. Click for mouse look.");mount.append(canvas);
  const camera=new T.PerspectiveCamera(62.5,1,.039,190);
  camera.rotation.order='YXZ';
  const hemi=new T.HemisphereLight(0xfff3d8,0xc4ba9b,1.46);scene.add(hemi);
  scene.add(new T.AmbientLight(0xfff3dc,.31));
  const sun=new T.DirectionalLight(0xffdfaa,3.14);
  sun.position.set(-11.85,8.32,8.10);sun.target.position.set(0,.97,0);scene.add(sun,sun.target);
  sun.castShadow=true;
  const size=Math.min(3072,renderer.capabilities.maxTextureSize);
  sun.shadow.mapSize.set(size,size);
  Object.assign(sun.shadow.camera,{left:-9.20,right:9.20,top:7.00,bottom:-6.7,near:1.0,far:32});
  sun.shadow.camera.updateProjectionMatrix();sun.shadow.normalBias=.009;sun.shadow.bias=-.00015;
  // A broad reflected fill at the shop opening, and a warmer reflection from the berth.
  const stall=new T.PointLight(0xffecd6,3.15,5.2,1.5);stall.position.set(1.52,2.23,1.104);scene.add(stall);
  const cabin=new T.PointLight(0xf5dfb9,1.72,3.65,1.35);cabin.position.set(-2.08,2.52,.19);scene.add(cabin);
  await loadScene(scene,renderer);makeBounds();
  renderer.shadowMap.needsUpdate=true;
  let pan=0,tilt=0,eyeY=eye,oldTime=0,frame=0,dirty=true,dragging=false,moved=0,lastX=0,lastY=0,forward=0,right=0,locked=false,lost=false;
  const person={...start},keys=new Set();
  function reset(){
    person.x=start.x;person.z=start.z;
    const target=[-.71,1.80,.65],dx=target[0]-person.x,dz=target[2]-person.z;
    pan=Math.atan2(-dx,-dz);tilt=Math.atan2(target[1]-eye,Math.hypot(dx,dz));eyeY=eye;forward=right=0;keys.clear();dirty=true;
    refreshStatus();
  }
  function resize(){
    const w=Math.max(1,innerWidth),h=Math.max(1,innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.65,Math.sqrt(2500000/(w*h))));
    renderer.setSize(w,h,false);canvas.style.width='100%';canvas.style.height='100%';camera.aspect=w/h;camera.updateProjectionMatrix();dirty=true;
  }
  function refreshStatus(){
    let s='Click to explore';
    if(locked||dragging)s=Math.abs(person.z)<1.37&&Math.abs(person.x)<3.65?(person.x<-.08?'Inside the living quarters':'At the workbench'):(person.z>1.41&&person.z<3.15&&person.x>-.35&&person.x<3.65?'Under the awning':'Around the camp');
    if((locked||dragging)&&(person.x/11.3)**2+(person.z/9.4)**2>.975)s='Edge of camp';
    if(status.textContent!==s)status.textContent=s;
  }
  function look(dx,dy){pan-=dx*.00203;tilt=Math.max(-1.485,Math.min(1.485,tilt-dy*.00203));dirty=true}
  function toggleHelp(){
    panel.hidden=!panel.hidden;help.setAttribute('aria-expanded',String(!panel.hidden));
    if(!panel.hidden&&locked)document.exitPointerLock?.();
  }
  help.addEventListener('click',toggleHelp);
  document.querySelector('#reset').addEventListener('click',()=>{reset();canvas.focus({preventScroll:true})});
  const controls=new Set(['KeyW','KeyS','KeyA','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','PageUp','PageDown','ShiftLeft','ShiftRight']);
  addEventListener('keydown',e=>{
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    if(e.code==='KeyR'){if(!e.repeat)reset();e.preventDefault();return}
    if(e.code==='KeyH'){if(!e.repeat)document.body.classList.toggle('hud-off');e.preventDefault();return}
    if(e.code==='Escape'){panel.hidden=true;help.setAttribute('aria-expanded','false');keys.clear();return}
    if(controls.has(e.code)){keys.add(e.code);e.preventDefault()}
  });
  addEventListener('keyup',e=>keys.delete(e.code));
  function releaseKeys(){keys.clear();forward=right=0;dragging=false;refreshStatus()}
  addEventListener('blur',releaseKeys);
  document.addEventListener('pointerlockchange',()=>{
    locked=document.pointerLockElement===canvas;dragging=false;keys.clear();forward=right=0;refreshStatus();
    if(locked){panel.hidden=true;help.setAttribute('aria-expanded','false')}
  });
  canvas.addEventListener('pointerdown',e=>{
    if(locked||e.button!==0)return;canvas.focus({preventScroll:true});dragging=true;moved=0;lastX=e.clientX;lastY=e.clientY;
    canvas.setPointerCapture?.(e.pointerId);refreshStatus();
  });
  canvas.addEventListener('pointermove',e=>{
    if(locked||!dragging)return;const dx=e.clientX-lastX,dy=e.clientY-lastY;lastX=e.clientX;lastY=e.clientY;moved+=Math.abs(dx)+Math.abs(dy);look(dx,dy);
  });
  canvas.addEventListener('pointerup',e=>{
    if(locked||!dragging)return;dragging=false;
    if(canvas.hasPointerCapture?.(e.pointerId))canvas.releasePointerCapture(e.pointerId);
    if(moved<5&&e.pointerType!=='touch'&&canvas.requestPointerLock){
      try{const reply=canvas.requestPointerLock();reply?.catch(()=>{status.textContent='Drag to look'})}catch{status.textContent='Drag to look'}
    }
    refreshStatus();
  });
  canvas.addEventListener('pointercancel',()=>{dragging=false;refreshStatus()});
  document.addEventListener('mousemove',e=>{if(locked)look(e.movementX,e.movementY)});
  document.addEventListener('pointerlockerror',()=>{status.textContent='Drag to look'});
  function tick(now){
    if(lost||document.hidden)return;
    frame=requestAnimationFrame(tick);
    const dt=Math.min(.05,Math.max(0,(now-(oldTime||now))/1000));oldTime=now;
    let f=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'));
    let r=Number(keys.has('KeyD'))-Number(keys.has('KeyA'));
    if(f&&r){f*=Math.SQRT1_2;r*=Math.SQRT1_2}
    const turn=Number(keys.has('ArrowRight'))-Number(keys.has('ArrowLeft')),pitch=Number(keys.has('PageUp'))-Number(keys.has('PageDown'));
    if(turn||pitch){pan-=turn*dt*1.76;tilt=Math.max(-1.485,Math.min(1.485,tilt+pitch*dt*1.36));dirty=true}
    const gain=1-Math.exp(-dt*22),speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?2.92:1.69;
    forward+=(f*speed-forward)*gain;right+=(r*speed-right)*gain;
    if(Math.abs(forward)+Math.abs(right)>.001){
      const sn=Math.sin(pan),cs=Math.cos(pan),x=person.x,z=person.z;
      walk(person,(-sn*forward+cs*right)*dt,(-cs*forward-sn*right)*dt);
      if(x!==person.x||z!==person.z){dirty=true;refreshStatus()}
    }
    const targetY=floorHeight(person.x,person.z)+eye;
    if(Math.abs(targetY-eyeY)>.0003){eyeY+=(targetY-eyeY)*(1-Math.exp(-dt*18));dirty=true}
    if(dirty){
      camera.position.set(person.x,eyeY,person.z);camera.rotation.set(tilt,pan,0,'YXZ');renderer.render(scene,camera);dirty=false;
    }
  }
  document.addEventListener('visibilitychange',()=>{
    cancelAnimationFrame(frame);releaseKeys();oldTime=0;
    if(!document.hidden&&!lost){dirty=true;frame=requestAnimationFrame(tick)}
  });
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;cancelAnimationFrame(frame);status.textContent='Graphics paused'});
  canvas.addEventListener('webglcontextrestored',()=>{lost=false;oldTime=0;renderer.shadowMap.needsUpdate=true;dirty=true;refreshStatus();cancelAnimationFrame(frame);frame=requestAnimationFrame(tick)});
  addEventListener('resize',resize);resize();reset();frame=requestAnimationFrame(tick);
}
initialise().catch(error=>{
  status.textContent='Could not start the scene. WebGL and a local HTTP connection are required.';console.error(error);
});