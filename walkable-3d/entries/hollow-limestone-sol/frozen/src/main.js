import * as THREE from '../vendor/three.module.js';
import { clamp } from './noise.js';
import { SPAWN, dryFloorHeight, moveWithCollision, regionLabel } from './spatial.js';
import { makeMaterials, buildCavern, makeRubble, buildShore } from './stone.js';
import { buildWater } from './water.js';
import { buildProps, buildAtmosphere } from './props.js';

const $ = id => document.getElementById(id);
const canvas = $('scene');
let renderer, scene, camera, water, atmosphere;
let entered = false, paused = true, fallbackLook = false, dragging = false;
let yaw = SPAWN.yaw, pitch = -.055;
const player = { x: SPAWN.x, z: SPAWN.z, vx: 0, vz: 0, eyeY: dryFloorHeight(SPAWN.x, SPAWN.z) + 1.66 };
const keys = new Set();
let quality = 1, statsVisible = false;
const qualityNames = ['economy', 'balanced', 'high'];
const qualityCaps = [1.0, 1.35, 1.8];
let lastTime = 0, sceneTime = 0, statsLast = 0;
const intervals = new Float32Array(1600), timestamps = new Float64Array(1600);
let sampleHead = 0, sampleCount = 0;
let lastRegion = '';

function showFailure(error) {
  $('load').hidden = true; $('intro').hidden = true; $('hud').hidden = true; $('pause').hidden = true;
  $('error').hidden = false;
  $('error-detail').textContent = error?.message || String(error);
  console.error(error);
}

async function init() {
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', alpha: false });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Everything that casts a shadow is stationary. The map is built only once.
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
    scene = new THREE.Scene(); scene.background = new THREE.Color('#26383b');
    scene.fog = new THREE.FogExp2('#26383b', .0125);
    camera = new THREE.PerspectiveCamera(69, innerWidth / innerHeight, .06, 90);
    camera.rotation.order = 'YXZ'; reset(); resize();

    const materials = makeMaterials();
    scene.add(buildCavern(materials));
    // Give the browser a chance to paint its loading message during asset setup.
    await new Promise(resolve => requestAnimationFrame(resolve));
    scene.add(buildShore(materials.wet));
    scene.add(makeRubble(materials));
    scene.add(buildProps(materials));
    water = buildWater(); scene.add(water.water, water.caustics);
    atmosphere = buildAtmosphere(); scene.add(atmosphere.group);
    addLighting();

    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault(); paused = true; keys.clear();
      showFailure(new Error('The graphics context was lost. Reload the page to restore the chamber.'));
    });
    installControls();
    // Precompile every material before walking begins to limit shader hitches.
    if (renderer.compileAsync) await renderer.compileAsync(scene, camera);
    const uploadedTextures=new Set();
    scene.traverse(object=>{
      const materials=Array.isArray(object.material)?object.material:[object.material];
      for(const material of materials){
        if(!material)continue;
        for(const name of ['map','bumpMap']){
          const texture=material[name];
          if(texture&&!uploadedTextures.has(texture)){renderer.initTexture(texture);uploadedTextures.add(texture);}
        }
      }
    });
    renderer.render(scene, camera);
    $('load').hidden = true;
    lastTime = performance.now(); requestAnimationFrame(frame);
  } catch (error) { showFailure(error); }
}

function addLighting() {
  const sky = new THREE.HemisphereLight('#d3e0da', '#49483f', 1.02); scene.add(sky);
  const sun = new THREE.DirectionalLight('#ffefd0', 3.55);
  sun.position.set(.4, 15.0, 2.0); sun.target.position.set(-2.3, -.8, 1.5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 20, bottom: -20, near: .5, far: 38 });
  sun.shadow.normalBias = .07; sun.shadow.bias = -.00025; sun.shadow.radius = 2;
  scene.add(sun, sun.target);
  // Broad, low-power bounced light keeps pale stone legible below the vault.
  const poolBounce = new THREE.PointLight('#a7d3c9', 180, 22, 2); poolBounce.position.set(-2.6, 3.1, 2.2); scene.add(poolBounce);
  const dryBounce = new THREE.PointLight('#e0ccb0', 115, 19, 2); dryBounce.position.set(5.7, 4.2, 5.1); scene.add(dryBounce);
  const entranceBounce = new THREE.PointLight('#c4d8dd', 76, 14, 2); entranceBounce.position.set(3.8, 3.2, 14.4); scene.add(entranceBounce);
  const landingBounce = new THREE.PointLight('#c9d7c9', 105, 13, 2); landingBounce.position.set(3.7, 4.2, -13.1); scene.add(landingBounce);
}

function reset() {
  player.x = SPAWN.x; player.z = SPAWN.z; player.vx = player.vz = 0;
  player.eyeY = dryFloorHeight(player.x, player.z) + 1.66;
  yaw = SPAWN.yaw; pitch = -.055; keys.clear(); updateCamera();
  if ($('region')) $('region').textContent = 'Entrance recess';
  sampleCount = sampleHead = 0;
}
function resize() {
  if (!renderer) return;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, qualityCaps[quality]));
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
}
function setQuality() {
  quality = (quality + 1) % qualityNames.length;
  $('quality').textContent = `Quality: ${qualityNames[quality]}`; resize();
}
function toggleStats() { statsVisible = !statsVisible; $('stats').hidden = !statsVisible; }

function pause() {
  if (!entered) return;
  paused = true; dragging = false; keys.clear(); player.vx = player.vz = 0;
  $('pause').hidden = false; $('crosshair').hidden = true;
}
function resume() {
  entered = true; paused = false; $('intro').hidden = true; $('hud').hidden = false;
  $('pause').hidden = true; $('crosshair').hidden = false;
  lastTime = performance.now();
  if (fallbackLook) return;
  try {
    const result = canvas.requestPointerLock();
    if (result?.catch) result.catch(enableFallback);
  } catch { enableFallback(); }
}
function enableFallback() {
  fallbackLook = true; paused = false; $('pause').hidden = true;
  document.querySelector('.bottom > span').innerHTML = '<kbd>WASD</kbd> walk &nbsp; Drag mouse to look &nbsp; <kbd>Esc</kbd> pause';
  $('pause-message').textContent = 'Drag on the scene to look around. Keyboard movement remains available.';
}

function installControls() {
  $('enter').addEventListener('click', resume); $('resume').addEventListener('click', resume);
  $('reset').addEventListener('click', reset); $('pause-reset').addEventListener('click', reset);
  $('stats-toggle').addEventListener('click', toggleStats); $('quality').addEventListener('click', setQuality);
  addEventListener('resize', resize);
  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === canvas) {
      fallbackLook = false; paused = false; $('pause').hidden = true; $('crosshair').hidden = false;
      document.querySelector('.bottom > span').innerHTML = '<kbd>WASD</kbd> walk &nbsp; <kbd>Shift</kbd> brisk &nbsp; <kbd>Esc</kbd> pause';
    } else if (entered && !fallbackLook) pause();
  });
  document.addEventListener('pointerlockerror', enableFallback);
  document.addEventListener('mousemove', event => {
    if (paused || (!dragging && document.pointerLockElement !== canvas)) return;
    yaw -= event.movementX * .0018; pitch = clamp(pitch - event.movementY * .0018, -1.43, 1.43);
    yaw = ((yaw + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
  });
  canvas.addEventListener('mousedown', event => {
    if (event.button !== 0 || !entered) return;
    if (fallbackLook && !paused) dragging = true;
    else if (paused) resume();
  });
  addEventListener('mouseup', () => { dragging = false; });
  canvas.addEventListener('contextmenu', event => event.preventDefault());
  document.addEventListener('keydown', event => {
    if (['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(event.code)) event.preventDefault();
    if (event.repeat) return;
    if (event.code === 'KeyR') { reset(); return; }
    if (event.code === 'KeyF') { toggleStats(); return; }
    if (event.code === 'KeyQ') { setQuality(); return; }
    if (event.code === 'Escape' && fallbackLook) { pause(); return; }
    if (event.code === 'Enter' && paused) { resume(); return; }
    keys.add(event.code);
  });
  document.addEventListener('keyup', event => keys.delete(event.code));
  addEventListener('blur', () => {
    pause(); if (document.pointerLockElement === canvas) document.exitPointerLock();
  });
  document.addEventListener('visibilitychange', () => {
    lastTime = performance.now();
    if (document.hidden) { pause(); if (document.pointerLockElement === canvas) document.exitPointerLock(); }
  });
}

function movement(dt) {
  const forward = (keys.has('KeyW') || keys.has('ArrowUp') ? 1 : 0) - (keys.has('KeyS') || keys.has('ArrowDown') ? 1 : 0);
  const side = (keys.has('KeyD') || keys.has('ArrowRight') ? 1 : 0) - (keys.has('KeyA') || keys.has('ArrowLeft') ? 1 : 0);
  const length = Math.hypot(forward, side) || 1;
  const speed = keys.has('ShiftLeft') || keys.has('ShiftRight') ? 3.35 : 2.05;
  const tx = (-Math.sin(yaw) * forward + Math.cos(yaw) * side) / length * speed;
  const tz = (-Math.cos(yaw) * forward - Math.sin(yaw) * side) / length * speed;
  const approach = 1 - Math.exp(-dt * 14);
  player.vx += (tx - player.vx) * approach; player.vz += (tz - player.vz) * approach;
  // Small substeps prevent tunnelling into the water or stone after a long frame.
  const n = Math.max(1, Math.ceil(dt / .012));
  for (let i = 0; i < n; i++) moveWithCollision(player, player.vx * dt / n, player.vz * dt / n);
  const desiredY = dryFloorHeight(player.x, player.z) + 1.66;
  player.eyeY += (desiredY - player.eyeY) * (1 - Math.exp(-dt * 18));
}
function updateCamera() {
  if (!camera) return;
  camera.position.set(player.x, player.eyeY, player.z);
  camera.rotation.set(pitch, yaw, 0, 'YXZ');
}

function recordInterval(now, ms) {
  intervals[sampleHead] = ms; timestamps[sampleHead] = now;
  sampleHead = (sampleHead + 1) % intervals.length; sampleCount = Math.min(sampleCount + 1, intervals.length);
  if (!statsVisible || now - statsLast < 650) return;
  statsLast = now; const values = [];
  for (let i = 0; i < sampleCount; i++) if (now - timestamps[i] <= 10000) values.push(intervals[i]);
  if (values.length < 20) return;
  values.sort((a,b)=>a-b);
  const at = q => values[Math.floor((values.length-1)*q)].toFixed(1);
  const mean = (values.reduce((a,b)=>a+b,0)/values.length).toFixed(1);
  $('stats-content').textContent = `Mean  ${mean} ms\nMedian  ${at(.5)} ms\n95th / 99th  ${at(.95)} / ${at(.99)} ms\nMaximum  ${at(1)} ms\n${values.length} samples · ${renderer.info.render.calls} draw calls\n${renderer.info.render.triangles.toLocaleString()} triangles`;
}
function frame(now) {
  requestAnimationFrame(frame);
  const raw = Math.max(0, now - lastTime); lastTime = now;
  if (document.hidden || !renderer || $('error').hidden === false) return;
  const dt = Math.min(raw / 1000, .05); sceneTime += dt;
  if (!paused) { movement(dt); recordInterval(now, raw); }
  updateCamera();
  const region = regionLabel(player.x, player.z);
  if (region !== lastRegion) { $('region').textContent = region; lastRegion = region; }
  water.update(sceneTime); atmosphere.update(sceneTime, renderer.getPixelRatio());
  renderer.render(scene, camera);
}

// Read-only hooks support later inspection without changing exploration.
window.hollowDiagnostics = {
  get location() { return { x: player.x, z: player.z, eyeY: player.eyeY, region: regionLabel(player.x, player.z) }; },
  get render() { return { calls: renderer?.info.render.calls, triangles: renderer?.info.render.triangles, pixelRatio: renderer?.getPixelRatio(), quality: qualityNames[quality] }; },
  get frameIntervals() {
    const now = performance.now(), result = [];
    for (let i = 0; i < sampleCount; i++) if (now - timestamps[i] <= 10000) result.push(intervals[i]);
    return result;
  }
};
init();
