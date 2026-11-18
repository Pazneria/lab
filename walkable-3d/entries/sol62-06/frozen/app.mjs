import { START, EYE, floorHeight, walkable, placeName, clamp } from './terrain.mjs';
import { CavernRenderer, decodeScene } from './render.mjs';

const canvas = document.querySelector('#view');
const enter = document.querySelector('#enter');
const reset = document.querySelector('#reset');
const panel = document.querySelector('#welcome');
const title = document.querySelector('#welcome-title');
const eyebrow = document.querySelector('#eyebrow');
const prompt = document.querySelector('#welcome-copy');
const locationLabel = document.querySelector('#place');
const lookHint = document.querySelector('#look-hint');
const exitHint = document.querySelector('#exit-hint');
const reticle = document.querySelector('#reticle');
const controls = document.querySelector('#controls');
const keys = new Set();
const movementKeys = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ShiftLeft', 'ShiftRight']);
const eye = new Float32Array(3);

let scene;
let renderer;
let mode = 'loading';
let frameId = 0;
let lastTime = 0;
let time = 0;
let resizePending = true;
let activePlace = '';
let pointer = null;
let capturePending = false;
let x, z, height, yaw, pitch, vx, vz;

function resetView() {
  x = START.x;
  z = START.z;
  height = floorHeight(x, z) + EYE;
  yaw = START.yaw;
  pitch = START.pitch;
  vx = 0;
  vz = 0;
  keys.clear();
  updatePlace();
}

function updatePlace() {
  const place = placeName(x, z);
  if (activePlace === place) return;
  activePlace = place;
  locationLabel.textContent = place;
}

function setMode(next) {
  mode = next;
  const exploring = next === 'locked' || next === 'drag';
  const paused = next === 'paused';
  const unavailable = next === 'loading' || next === 'error';
  document.body.dataset.mode = next;
  panel.hidden = exploring;
  reticle.hidden = !exploring;
  controls.hidden = unavailable;
  reset.disabled = unavailable;
  enter.disabled = unavailable;
  lookHint.textContent = next === 'drag' ? 'Drag to look' : 'Mouse to look';
  exitHint.textContent = next === 'drag' ? 'Pause' : 'Release mouse';
  if (exploring) {
    canvas.focus({ preventScroll: true });
    return;
  }
  keys.clear();
  pointer = null;
  vx = 0;
  vz = 0;
  if (paused) {
    eyebrow.textContent = 'Limewater cavern';
    title.textContent = 'Paused';
    prompt.textContent = 'Resume from where you stopped.';
    enter.textContent = 'Resume exploring';
    enter.focus({ preventScroll: true });
  }
  if (next === 'ready' || next === 'loading') {
    eyebrow.textContent = 'Limestone cavern';
    title.textContent = 'Limewater';
    prompt.textContent = 'Follow the dry bank through the arch to the survey landing.';
    enter.textContent = next === 'loading' ? 'Preparing cavern…' : 'Enter cavern';
  }
}

function reportError(error) {
  cancelAnimationFrame(frameId);
  frameId = 0;
  renderer = null;
  capturePending = false;
  if (document.pointerLockElement === canvas) document.exitPointerLock();
  setMode('error');
  eyebrow.textContent = 'Limewater cavern';
  title.textContent = 'Unable to start';
  prompt.textContent = error.message;
  enter.hidden = true;
  console.error(error);
}

function enterDragMode() {
  capturePending = false;
  if (mode === 'ready' || mode === 'paused') setMode('drag');
}

function captureLook() {
  if (capturePending || (mode !== 'ready' && mode !== 'paused')) return;
  if (typeof canvas.requestPointerLock !== 'function') {
    enterDragMode();
    return;
  }
  capturePending = true;
  try {
    const request = canvas.requestPointerLock();
    if (request && typeof request.catch === 'function') request.catch(enterDragMode);
  } catch {
    enterDragMode();
  }
}

function turn(dx, dy) {
  yaw += dx * .00245;
  pitch = clamp(pitch - dy * .00245, -1.44, 1.44);
  if (yaw > Math.PI || yaw < -Math.PI) yaw = Math.atan2(Math.sin(yaw), Math.cos(yaw));
}

function advance(dt) {
  if (mode !== 'locked' && mode !== 'drag') return;
  const forward = Number(keys.has('KeyW') || keys.has('ArrowUp')) -
    Number(keys.has('KeyS') || keys.has('ArrowDown'));
  const side = Number(keys.has('KeyD') || keys.has('ArrowRight')) -
    Number(keys.has('KeyA') || keys.has('ArrowLeft'));
  const hurry = keys.has('ShiftLeft') || keys.has('ShiftRight');
  const pace = (hurry ? 3.55 : 2.58) / Math.max(1, Math.hypot(forward, side));
  const sy = Math.sin(yaw), cy = Math.cos(yaw);
  const easing = 1 - Math.exp(-dt * (forward || side ? 22 : 30));
  vx += ((forward * sy + side * cy) * pace - vx) * easing;
  vz += ((-forward * cy + side * sy) * pace - vz) * easing;
  const dx = vx * dt;
  const dz = vz * dt;
  if (Math.abs(dx) + Math.abs(dz) > .000025) {
    if (walkable(x + dx, z + dz)) {
      x += dx;
      z += dz;
    } else {
      if (walkable(x + dx, z)) x += dx;
      if (walkable(x, z + dz)) z += dz;
    }
    updatePlace();
  } else if (!(forward || side)) {
    vx = 0;
    vz = 0;
  }
  const standing = floorHeight(x, z) + EYE;
  height = Math.abs(standing - height) < .00012 ? standing :
    height + (standing - height) * (1 - Math.exp(-dt * 19));
}

function frame(now) {
  frameId = 0;
  const dt = lastTime ? clamp((now - lastTime) * .001, 0, .04) : 0;
  lastTime = now;
  time += dt;
  advance(dt);
  eye[0] = x;
  eye[1] = height;
  eye[2] = z;
  try {
    if (resizePending) {
      renderer.resize();
      resizePending = false;
    }
    renderer.render(eye, yaw, pitch, time);
  } catch (error) {
    reportError(error);
    return;
  }
  frameId = requestAnimationFrame(frame);
}

function prepareRenderer() {
  renderer = new CavernRenderer(canvas, scene);
  resizePending = true;
  lastTime = 0;
  resetView();
  enter.hidden = false;
  setMode('ready');
  frameId = requestAnimationFrame(frame);
}

enter.addEventListener('click', captureLook);
reset.addEventListener('click', resetView);
canvas.addEventListener('click', captureLook);
document.addEventListener('pointerlockchange', () => {
  capturePending = false;
  if (document.pointerLockElement === canvas && renderer) setMode('locked');
  else if (mode === 'locked') setMode('paused');
});
document.addEventListener('pointerlockerror', enterDragMode);
document.addEventListener('mousemove', event => {
  if (mode === 'locked') turn(event.movementX, event.movementY);
});
canvas.addEventListener('pointerdown', event => {
  if (mode !== 'drag' || event.button !== 0) return;
  pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener('pointermove', event => {
  if (mode !== 'drag' || pointer?.id !== event.pointerId) return;
  turn((event.clientX - pointer.x) * 1.28, (event.clientY - pointer.y) * 1.28);
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});
canvas.addEventListener('lostpointercapture', () => { pointer = null; });

window.addEventListener('keydown', event => {
  if (!renderer) return;
  if (event.code === 'KeyR' && !event.altKey && !event.ctrlKey && !event.metaKey) {
    event.preventDefault();
    if (!event.repeat) resetView();
  }
  if (mode === 'drag' && event.code === 'Escape') setMode('paused');
  if ((mode === 'locked' || mode === 'drag') && movementKeys.has(event.code)) {
    event.preventDefault();
    keys.add(event.code);
  }
});
window.addEventListener('keyup', event => keys.delete(event.code));
window.addEventListener('blur', () => {
  keys.clear();
  pointer = null;
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    keys.clear();
    lastTime = 0;
  }
});
window.addEventListener('resize', () => { resizePending = true; });
canvas.addEventListener('webglcontextlost', event => {
  event.preventDefault();
  reportError(new Error('The graphics context was lost. The cavern will restart if it recovers.'));
});
canvas.addEventListener('webglcontextrestored', () => {
  if (!scene) return;
  try {
    prepareRenderer();
  } catch (error) {
    reportError(error);
  }
});

async function loadCavern() {
  setMode('loading');
  try {
    const response = await fetch('./scene.bin');
    if (!response.ok) throw new Error('Could not load scene.bin. Start the project using the launch command in README.md.');
    scene = decodeScene(await response.arrayBuffer());
    prepareRenderer();
  } catch (error) {
    reportError(error);
  }
}

loadCavern();
