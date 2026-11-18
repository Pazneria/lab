import * as T from '../vendor/three.module.min.js';
import { eyeHeight, move, roomAt, start } from './layout.js';
import { makeScene } from './scene.js';

const view = document.getElementById('view');
const canvas = document.getElementById('world');
const enter = document.getElementById('enter');
const hint = document.getElementById('hint');
const help = document.getElementById('help');
const lookHelp = document.getElementById('look-help');
const room = document.getElementById('room');

const player = { ...start, vx: 0, vz: 0 };
const camera = new T.PerspectiveCamera(60, 1, .059, 56);
const keys = new Set();
const walkKeys = new Set([
  'KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
  'ShiftLeft', 'ShiftRight', 'KeyQ', 'KeyE', 'PageUp', 'PageDown',
]);
const pitchLimit = 1.49;
const sensitivity = .00222;

let renderer;
let scene;
let mode = 'loading';
let dirty = true;
let lastFrame;
let pointer = null;
let pendingLock = false;
let shownRoom = '';
let resourceLost = false;

function active() {
  return mode === 'locked' || mode === 'drag';
}

function clearMovement() {
  keys.clear();
  player.vx = player.vz = 0;
  pointer = null;
}

function setMode(next) {
  if (next !== mode) clearMovement();
  mode = next;
  view.dataset.mode = mode;
  if (mode === 'welcome' || mode === 'paused') {
    enter.disabled = false;
    enter.textContent = mode === 'welcome' ? 'Enter cottage' : 'Resume walk';
    hint.textContent = 'WASD to walk · mouse to look · H for controls';
  } else if (mode === 'drag' || mode === 'locked') {
    lookHelp.textContent = mode === 'locked' ? 'Mouse' : 'Drag on the scene';
    lookHelp.append(' · Q/E and PgUp/PgDn');
    if (document.activeElement === enter) enter.blur();
    help.hidden = mode === 'locked';
  }
}

function requestEntry() {
  if (mode !== 'welcome' && mode !== 'paused') return;
  if (typeof canvas.requestPointerLock !== 'function') {
    setMode('drag');
    return;
  }
  pendingLock = true;
  try {
    const result = canvas.requestPointerLock();
    result?.catch(unavailable);
  } catch {
    unavailable();
  }
}

function unavailable() {
  if (!pendingLock) return;
  pendingLock = false;
  setMode('drag');
}

function rotate(dx, dy) {
  player.yaw = (player.yaw - dx * sensitivity) % (2 * Math.PI);
  player.pitch = T.MathUtils.clamp(player.pitch - dy * sensitivity, -pitchLimit, pitchLimit);
  dirty = true;
}

function reset() {
  Object.assign(player, start, { vx: 0, vz: 0 });
  dirty = true;
}

function resize() {
  if (!renderer) return;
  const w = Math.max(1, view.clientWidth), h = Math.max(1, view.clientHeight);
  const scale = Math.min(window.devicePixelRatio || 1, 1.45, Math.sqrt(2550000 / (w * h)));
  renderer.setPixelRatio(scale);
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.fov = camera.aspect < 1.1 ? 69 : 60;
  camera.updateProjectionMatrix();
  dirty = true;
}

function update(dt) {
  const down = (...codes) => Number(codes.some(code => keys.has(code)));
  let front = down('KeyW', 'ArrowUp') - down('KeyS', 'ArrowDown');
  let side = down('KeyD', 'ArrowRight') - down('KeyA', 'ArrowLeft');
  if (front && side) { front *= Math.SQRT1_2; side *= Math.SQRT1_2; }
  const yawStep = down('KeyQ') - down('KeyE');
  const pitchStep = down('PageUp') - down('PageDown');
  if (yawStep || pitchStep) rotate(-yawStep * dt * 660, -pitchStep * dt * 530);
  const sin = Math.sin(player.yaw), cos = Math.cos(player.yaw);
  const speed = down('ShiftLeft', 'ShiftRight') ? 3.05 : 1.83;
  const blend = 1 - Math.exp(-dt * 23);
  player.vx += ((-sin * front + cos * side) * speed - player.vx) * blend;
  player.vz += ((-cos * front - sin * side) * speed - player.vz) * blend;
  if (Math.abs(player.vx) + Math.abs(player.vz) < .002) return;
  const oldX = player.x, oldZ = player.z;
  move(player, player.vx * dt, player.vz * dt);
  if (oldX !== player.x || oldZ !== player.z) dirty = true;
}

function frame(now) {
  const dt = lastFrame === undefined ? 0 : Math.min(.045, (now - lastFrame) / 1000);
  lastFrame = now;
  if (active() && !resourceLost) update(dt);
  if (dirty && !resourceLost) {
    camera.position.set(player.x, eyeHeight, player.z);
    camera.rotation.set(player.pitch, player.yaw, 0, 'YXZ');
    renderer.render(scene, camera);
    const label = roomAt(player.x, player.z);
    if (label !== shownRoom) {
      shownRoom = label;
      room.textContent = label;
    }
    dirty = false;
  }
  requestAnimationFrame(frame);
}

enter.addEventListener('click', requestEntry);
document.addEventListener('pointerlockchange', () => {
  pendingLock = false;
  if (document.pointerLockElement === canvas) setMode('locked');
  else if (mode === 'locked') setMode('paused');
});
document.addEventListener('pointerlockerror', unavailable);
document.addEventListener('mousemove', e => {
  if (mode === 'locked') rotate(e.movementX, e.movementY);
});
canvas.addEventListener('pointerdown', e => {
  if (mode !== 'drag' || e.button !== 0) return;
  canvas.setPointerCapture(e.pointerId);
  pointer = { id: e.pointerId, x: e.clientX, y: e.clientY };
});
canvas.addEventListener('pointermove', e => {
  if (!pointer || pointer.id !== e.pointerId) return;
  rotate(e.clientX - pointer.x, e.clientY - pointer.y);
  pointer.x = e.clientX;
  pointer.y = e.clientY;
});
canvas.addEventListener('lostpointercapture', () => { pointer = null; });
window.addEventListener('keydown', e => {
  if (!active()) return;
  if (walkKeys.has(e.code)) {
    e.preventDefault();
    keys.add(e.code);
  } else if (!e.repeat && e.code === 'KeyR') {
    reset();
  } else if (!e.repeat && e.code === 'KeyH') {
    help.hidden = !help.hidden;
  } else if (e.code === 'Escape' && mode === 'drag') {
    setMode('paused');
  }
});
window.addEventListener('keyup', e => keys.delete(e.code));
window.addEventListener('blur', clearMovement);
window.addEventListener('resize', resize);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) clearMovement();
  else dirty = true;
});
canvas.addEventListener('webglcontextlost', event => {
  event.preventDefault();
  resourceLost = true;
  if (document.pointerLockElement === canvas) document.exitPointerLock();
  setMode('waiting');
  enter.disabled = true;
  enter.textContent = 'Restoring graphics…';
  hint.textContent = 'The browser paused the graphics context.';
});
canvas.addEventListener('webglcontextrestored', () => {
  resourceLost = false;
  renderer.shadowMap.needsUpdate = true;
  dirty = true;
  setMode('paused');
});

async function boot() {
  try {
    renderer = new T.WebGLRenderer({
      canvas, antialias: true, alpha: false, depth: true, stencil: false,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
    ({ scene } = makeScene());
    resize();
    await renderer.compileAsync(scene, camera);
    frame(performance.now());
    setMode('welcome');
  } catch (error) {
    console.error(error);
    setMode('error');
    enter.textContent = 'Cottage unavailable';
    hint.textContent = 'Use a browser with WebGL 2 and hardware acceleration enabled.';
  }
}
requestAnimationFrame(() => requestAnimationFrame(boot));
