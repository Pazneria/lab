import * as T from 'three';
import { buildSite } from './site.js';
import { buildCraft } from './craft.js';
import { buildFoliage } from './foliage.js';
import { createMaterials } from './textures.js';
import { crouchHeight, eyeHeight, slide, spawn } from './world.js';

const elements = {
  view: document.getElementById('view'),
  overlay: document.getElementById('overlay'),
  enter: document.getElementById('enter'),
  reset: document.getElementById('reset'),
  status: document.getElementById('status'),
  hint: document.getElementById('hint'),
  look: document.getElementById('look-key'),
  dragHint: document.getElementById('drag-hint'),
};

const movementKeys = new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight']);
const key = (pressed, a,b) => pressed.has(a) || pressed.has(b);
const pitchLimit = Math.PI * .491;
const sunlight = new T.Vector3(8.7,12.6,7.6);
const sunTarget = new T.Vector3(0,1.0,-1.3);
const sunlightDirection = sunlight.clone().sub(sunTarget).normalize();

function sky(scene) {
  const geometry=new T.SphereGeometry(53,24,12);
  const material=new T.ShaderMaterial({
    side:T.BackSide, depthWrite:false, fog:false,
    uniforms:{sunDirection:{value:sunlightDirection}},
    vertexShader:[
      'varying vec3 direction;',
      'void main() {',
      ' direction = position;',
      ' gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);',
      '}',
    ].join('\n'),
    fragmentShader:[
      'uniform vec3 sunDirection;',
      'varying vec3 direction;',
      'void main() {',
      ' vec3 d = normalize(direction);',
      ' float up = smoothstep(-.02,.77,d.y);',
      ' float toward = max(0.,dot(d,sunDirection));',
      ' vec3 horizon = vec3(.61,.65,.53);',
      ' vec3 top = vec3(.30,.46,.51);',
      ' vec3 light = mix(horizon,top,up);',
      ' light += vec3(.58,.41,.23)*pow(toward,16.0);',
      ' light += vec3(1.40,.94,.57)*pow(toward,440.0);',
      ' light = mix(light,vec3(.31,.36,.24),(.60*smoothstep(0.0,.42,-d.y)));',
      ' gl_FragColor = vec4(light,1.0);',
      ' #include <tonemapping_fragment>',
      ' #include <colorspace_fragment>',
      '}',
    ].join('\n'),
  });
  const dome=new T.Mesh(geometry,material);
  dome.name='Filtered late-afternoon sky';
  dome.renderOrder=5;
  dome.frustumCulled=false;
  scene.add(dome);
}

function addLights(scene) {
  scene.add(new T.HemisphereLight(0xf2f1d8,0x6b7150,1.27));
  scene.add(new T.AmbientLight(0xb7c3bb,.36));
  const sun=new T.DirectionalLight(0xffe2ae,3.15);
  sun.position.copy(sunlight);
  sun.target.position.copy(sunTarget);
  sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);
  sun.shadow.camera.left=-11.9;
  sun.shadow.camera.right=11.9;
  sun.shadow.camera.top=11.1;
  sun.shadow.camera.bottom=-11.1;
  sun.shadow.camera.near=.35;
  sun.shadow.camera.far=33;
  sun.shadow.bias=-.00018;
  sun.shadow.normalBias=.014;
  sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.autoUpdate=false;
  sun.shadow.needsUpdate=true;
  scene.add(sun,sun.target);

  // A soft sky contribution enters through the lower, cooler windows.
  const windowBounce=new T.HemisphereLight(0xc5dbdc,0x8b968e,.43);
  windowBounce.position.set(-4.7,3.25,-2.1);
  scene.add(windowBounce);
}

function explore(renderer,scene,camera) {
  const canvas=renderer.domElement;
  const pressed=new Set();
  const pos={x:spawn.x,z:spawn.z};
  let yaw=spawn.yaw, pitch=spawn.pitch;
  let vx=0,vz=0,eye=eyeHeight;
  let mode='menu';
  let dragId=null, dragX=0, dragY=0, pointerPending=false, fallback=false;
  let frame=0, last=0, entered=false, contextLost=false, firstFrame=true;
  canvas.setAttribute('aria-label','Interactive view inside the greenhouse');

  function reset(){
    pressed.clear();
    pos.x=spawn.x; pos.z=spawn.z;
    yaw=spawn.yaw; pitch=spawn.pitch; eye=eyeHeight;
    vx=0; vz=0;
    queue();
  }

  function isPlaying(){ return mode!=='menu'; }

  function queue(){
    if(!frame && !contextLost) frame=requestAnimationFrame(render);
  }

  function render(now){
    frame=0;
    const dt=last ? Math.min((now-last)*.001,.04) : 0;
    last=now;
    if(isPlaying()){
      const forward=Number(key(pressed,'KeyW','ArrowUp'))-Number(key(pressed,'KeyS','ArrowDown'));
      const strafe=Number(key(pressed,'KeyD','ArrowRight'))-Number(key(pressed,'KeyA','ArrowLeft'));
      const low=pressed.has('KeyC');
      const speed=(low?.89:1.63)/Math.max(1,Math.hypot(forward,strafe));
      const sin=Math.sin(yaw),cos=Math.cos(yaw);
      const wantX=(strafe*cos-forward*sin)*speed;
      const wantZ=(-strafe*sin-forward*cos)*speed;
      const response=1-Math.exp(-dt*15);
      vx+=(wantX-vx)*response;
      vz+=(wantZ-vz)*response;
      eye+=((low?crouchHeight:eyeHeight)-eye)*(1-Math.exp(-dt*13));
      slide(pos,vx*dt,vz*dt);
    }
    camera.position.set(pos.x,eye,pos.z);
    camera.rotation.set(pitch,yaw,0,'YXZ');
    renderer.render(scene,camera);
    if(firstFrame){
      firstFrame=false;
      elements.enter.disabled=false;
      setMode('menu');
    }
    if(isPlaying()) queue();
    else last=0;
  }

  function look(dx,dy){
    const sensitivity=.00205;
    yaw=(yaw-dx*sensitivity)%(2*Math.PI);
    pitch=T.MathUtils.clamp(pitch-dy*sensitivity,-pitchLimit,pitchLimit);
    queue();
  }

  function resize(){
    const width=Math.max(1,elements.view.clientWidth);
    const height=Math.max(1,elements.view.clientHeight);
    const maxPixels=2_250_000;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,1.4,Math.sqrt(maxPixels/(width*height))));
    renderer.setSize(width,height,false);
    const aspect=width/height;
    camera.aspect=aspect;
    // Preserve a practical horizontal field of view when the window is narrow.
    camera.fov=T.MathUtils.clamp(T.MathUtils.radToDeg(2*Math.atan(Math.tan(.55)*1.57/Math.min(1.57,aspect))),62,81);
    camera.updateProjectionMatrix();
    queue();
  }

  function setMode(next){
    if(contextLost) return;
    const wasPlaying=isPlaying();
    mode=next;
    const active=isPlaying();
    entered=entered||active;
    if(!active){
      pressed.clear();
      vx=0; vz=0; dragId=null;
      last=0;
    } else if(!wasPlaying){
      last=0;
    }
    document.body.classList.toggle('exploring',active);
    elements.overlay.hidden=active;
    elements.hint.hidden=!active;
    elements.dragHint.hidden=next!=='drag';
    elements.reset.hidden=!entered || active;
    const status=fallback?'Drag to look · keyboard to walk':entered?'Exploration paused':'';
    elements.status.textContent=status;
    elements.status.hidden=!status;
    elements.enter.firstChild.textContent=entered?'Resume exploring ':'Enter the greenhouse ';
    if(!active && wasPlaying) elements.enter.focus({preventScroll:true});
    queue();
  }

  function allowDrag(){
    if(!pointerPending && mode==='drag') return;
    pointerPending=false;
    fallback=true;
    elements.look.textContent='Drag';
    setMode('drag');
  }

  function activate(){
    if(contextLost || isPlaying() || pointerPending) return;
    if(!canvas.requestPointerLock || fallback){
      allowDrag();
      return;
    }
    pointerPending=true;
    try {
      const pending=canvas.requestPointerLock();
      if(pending && typeof pending.catch==='function'){
        pending.catch(()=>{
          if(pointerPending) allowDrag();
        });
      }
    } catch {
      allowDrag();
    }
  }

  elements.enter.addEventListener('click',activate);
  elements.reset.addEventListener('click',reset);
  document.addEventListener('pointerlockchange',()=>{
    if(document.pointerLockElement===canvas){
      pointerPending=false;
      setMode('locked');
    } else if(mode==='locked'){
      setMode('menu');
    }
  });
  document.addEventListener('pointerlockerror',()=>{
    if(pointerPending) allowDrag();
  });
  document.addEventListener('mousemove',event=>{
    if(mode==='locked') look(event.movementX,event.movementY);
  });
  canvas.addEventListener('pointerdown',event=>{
    if(mode!=='drag' || event.button!==0) return;
    dragId=event.pointerId;
    dragX=event.clientX; dragY=event.clientY;
    canvas.setPointerCapture(dragId);
  });
  canvas.addEventListener('pointermove',event=>{
    if(mode!=='drag' || dragId!==event.pointerId) return;
    look(event.clientX-dragX,event.clientY-dragY);
    dragX=event.clientX; dragY=event.clientY;
  });
  for(const type of ['pointerup','pointercancel','lostpointercapture']){
    canvas.addEventListener(type,event=>{
      if(event.pointerId===dragId) dragId=null;
    });
  }

  window.addEventListener('keydown',event=>{
    if(event.altKey || event.ctrlKey || event.metaKey) return;
    if(event.code==='KeyR' && !event.repeat){
      event.preventDefault();
      reset();
    }
    if(!isPlaying()) return;
    if(event.code==='Escape'){
      if(mode==='locked') document.exitPointerLock();
      else setMode('menu');
    } else if(movementKeys.has(event.code) || event.code==='KeyC'){
      event.preventDefault();
      pressed.add(event.code);
    }
  });
  window.addEventListener('keyup',event=>pressed.delete(event.code));
  window.addEventListener('blur',()=>{
    pressed.clear();
    vx=0; vz=0;
    if(mode==='drag') setMode('menu');
  });
  window.addEventListener('resize',resize);
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){
      pressed.clear();
      vx=0; vz=0; last=0;
    } else queue();
  });
  canvas.addEventListener('webglcontextlost',event=>{
    event.preventDefault();
    if(document.pointerLockElement===canvas) document.exitPointerLock();
    setMode('menu');
    contextLost=true;
    elements.enter.disabled=true;
    elements.status.hidden=false;
    elements.status.textContent='Graphics context interrupted';
    elements.enter.firstChild.textContent='Reload the page ';
  });
  canvas.addEventListener('webglcontextrestored',()=>{
    contextLost=false;
    renderer.shadowMap.needsUpdate=true;
    scene.traverse(object=>{
      if(object.isDirectionalLight && object.castShadow) object.shadow.needsUpdate=true;
    });
    elements.enter.disabled=false;
    setMode('menu');
    resize();
  });

  resize();
}

function boot(){
  const renderer = new T.WebGLRenderer({ antialias:true, stencil:false, powerPreference:'high-performance' });
  renderer.outputColorSpace=T.SRGBColorSpace;
  renderer.toneMapping=T.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.09;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=T.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate=false;
  renderer.shadowMap.needsUpdate=true;

  const scene=new T.Scene();
  scene.background=new T.Color(0xb8ba9f);
  scene.fog=new T.Fog(0x9fa58b,13,37);
  const camera=new T.PerspectiveCamera(62,1,.065,68);
  sky(scene);
  addLights(scene);
  const materials=createMaterials();
  buildSite(scene,materials);
  buildCraft(scene,materials);
  buildFoliage(scene,materials);
  elements.view.appendChild(renderer.domElement);
  explore(renderer,scene,camera);
}

requestAnimationFrame(()=>{
  try {
    boot();
  } catch(error) {
    console.error(error);
    elements.status.hidden=false;
    elements.status.textContent='The greenhouse could not start';
    elements.enter.firstChild.textContent='WebGL 2 is required ';
  }
});
