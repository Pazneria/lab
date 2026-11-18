import * as T from '../vendor/three.module.min.js';
import { areaAt, clamp, floorAt, SPAWN } from './layout.js';
import { createInlet } from './world.js';

const viewport = document.querySelector('#viewport');
const panel = document.querySelector('#panel');
const menu = document.querySelector('#game-menu');
const status = document.querySelector('#status');
const hud = document.querySelector('#hud');
const location = document.querySelector('#location');
const enter = document.querySelector('#enter');
const reset = document.querySelector('#reset');

const CONTROLS = new Set([
  'KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight',
  'ShiftLeft','ShiftRight','KeyR','KeyQ','KeyE'
]);
const EYE = 1.638;

function run() {
  const renderer = new T.WebGLRenderer({
    alpha: false, antialias: true, powerPreference: 'high-performance'
  });
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-label','3D workshop, landing pier and tidal shore');
  viewport.prepend(canvas);

  const { scene, walk, waterTime } = createInlet();
  const camera = new T.PerspectiveCamera(63,1,.036,230);
  camera.rotation.order = 'YXZ';
  const keys = new Set();
  let active = false;
  let locked = false;
  let contextLost = false;
  let drag = null;
  let x, z, yaw, pitch, floor, eye, vx, vz;
  let last = performance.now();
  let area;

  function resize() {
    const width = Math.max(1,viewport.clientWidth);
    const height = Math.max(1,viewport.clientHeight);
    const deviceRatio = window.devicePixelRatio || 1;
    const renderRatio = Math.min(deviceRatio,1.5,Math.sqrt(3_100_000 / (width*height)));
    renderer.setPixelRatio(renderRatio);
    renderer.setSize(width,height,false);
    camera.aspect = width/height;
    camera.fov = 63 + 7 * clamp((1.65-camera.aspect)/.43,0,1);
    camera.updateProjectionMatrix();
  }

  function returnToStart() {
    ({ x,z,yaw,pitch } = SPAWN);
    floor = floorAt(x,z);
    eye = floor+EYE;
    vx = 0;
    vz = 0;
    updateCamera();
  }

  function updateCamera() {
    camera.position.set(x,eye,z);
    camera.rotation.set(pitch,-yaw,0,'YXZ');
    const nextArea=areaAt(x,z);
    if (nextArea !== area) {
      area=nextArea;
      location.textContent=area;
    }
  }

  function updateMenu() {
    panel.hidden=active;
    hud.hidden=!active;
    document.body.classList.toggle('locked',locked);
  }

  function tryPointerLock() {
    if (!canvas.requestPointerLock) return;
    try {
      const result=canvas.requestPointerLock();
      if(result?.catch) result.catch(()=>{});
    } catch {
      // Drag look stays available when the embedding page blocks pointer lock.
    }
  }

  function start() {
    if(contextLost) return;
    active=true;
    updateMenu();
    tryPointerLock();
  }

  function end() {
    active=false;
    drag=null;
    keys.clear();
    vx=0;
    vz=0;
    updateMenu();
  }

  function look(dx,dy,rate=.00225) {
    yaw += dx*rate;
    pitch = clamp(pitch - dy*rate,-1.41,1.41);
  }

  document.addEventListener('pointerlockchange',()=>{
    const wasLocked=locked;
    locked=document.pointerLockElement===canvas;
    if (locked) {
      active=true;
      drag=null;
      updateMenu();
    } else if(wasLocked) {
      end();
    }
  });
  document.addEventListener('mousedown',event=>{
    if(locked && event.button===0) event.preventDefault();
  });
  document.addEventListener('mousemove',event=>{
    if(locked && active) look(event.movementX,event.movementY);
  });
  canvas.addEventListener('pointerdown',event=>{
    if (event.button!==0 || locked) return;
    if (!active) {
      start();
      return;
    }
    drag={id:event.pointerId,x:event.clientX,y:event.clientY};
    canvas.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  canvas.addEventListener('pointermove',event=>{
    if(locked || drag?.id!==event.pointerId) return;
    look(event.clientX-drag.x,event.clientY-drag.y,event.pointerType==='touch'?.0052:.0034);
    drag.x=event.clientX;
    drag.y=event.clientY;
  });
  for(const name of ['pointerup','pointercancel','lostpointercapture']){
    canvas.addEventListener(name,event=>{
      if(drag?.id===event.pointerId) drag=null;
    });
  }

  document.addEventListener('keydown',event=>{
    if(event.code==='Escape' && active && !locked){
      end();
      return;
    }
    if ((!active && event.code!=='KeyR') || !CONTROLS.has(event.code) || event.ctrlKey || event.altKey || event.metaKey) return;
    event.preventDefault();
    if(event.code==='KeyR'){
      if(!event.repeat) returnToStart();
      return;
    }
    keys.add(event.code);
  });
  document.addEventListener('keyup',event=>keys.delete(event.code));
  window.addEventListener('blur',()=>{
    keys.clear();
    drag=null;
    vx=0;
    vz=0;
  });
  window.addEventListener('resize',resize);
  enter.addEventListener('click',start);
  reset.addEventListener('click',returnToStart);

  canvas.addEventListener('webglcontextlost',()=>{
    contextLost=true;
    if(locked) document.exitPointerLock?.();
    end();
    menu.hidden=true;
    status.hidden=false;
    status.textContent='The graphics context was lost. Waiting for the browser to restore it…';
  });
  canvas.addEventListener('webglcontextrestored',()=>{
    contextLost=false;
    renderer.shadowMap.needsUpdate=true;
    menu.hidden=false;
    status.hidden=true;
  });

  function move(dt) {
    if(!active) return;
    const f=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'));
    const side=Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'));
    const turn=Number(keys.has('KeyE'))-Number(keys.has('KeyQ'));
    yaw+=dt*turn*1.82;
    const pace=keys.has('ShiftLeft')||keys.has('ShiftRight')?4.25:2.76;
    const speed=pace/Math.max(1,Math.hypot(f,side));
    const dx=(Math.sin(yaw)*f+Math.cos(yaw)*side)*speed;
    const dz=(-Math.cos(yaw)*f+Math.sin(yaw)*side)*speed;
    const a=1-Math.exp(-dt*23);
    vx+=(dx-vx)*a;
    vz+=(dz-vz)*a;
    const hops=Math.max(1,Math.ceil(Math.hypot(vx,vz)*dt/.048));
    for(let i=0;i<hops;i++) {
      const xx=vx*dt/hops, zz=vz*dt/hops;
      if(Math.abs(xx)>.00001){
        const h=walk.stand(x+xx,z,floor);
        if(h!==null) {
          x+=xx;
          floor=h;
        } else vx=0;
      }
      if(Math.abs(zz)>.00001){
        const h=walk.stand(x,z+zz,floor);
        if(h!==null) {
          z+=zz;
          floor=h;
        } else vz=0;
      }
    }
    eye+=(floor+EYE-eye)*(1-Math.exp(-dt*17));
  }

  function draw(now) {
    requestAnimationFrame(draw);
    const dt = Math.min(.047,Math.max(0,(now-last)/1000));
    last=now;
    if(contextLost) return;
    move(dt);
    updateCamera();
    waterTime.value=now*.001;
    renderer.render(scene,camera);
  }

  returnToStart();
  resize();
  status.hidden=true;
  menu.hidden=false;
  requestAnimationFrame(draw);
}

try {
  run();
} catch (error) {
  console.error(error);
  status.hidden=false;
  status.textContent='The inlet could not load. Open the scene through a local HTTP server in a browser with WebGL 2 enabled.';
}
