import * as T from 'three';
import { locationAt, quarters, spawn } from './layout.js';
import { exterior, loadPlanet } from './space.js';
import { translation, WalkSpace } from './walk.js';

const viewport = document.querySelector('#viewport');
const experience = document.querySelector('#experience');
const loading = document.querySelector('#loading');
const status = document.querySelector('#status');
const zone = document.querySelector('#zone');
const controls = document.querySelector('#controls');
const help = document.querySelector('#help');
const startControl = document.querySelector('#enter');
const lookInstructions = document.querySelector('#look-instructions');
const resetControl = document.querySelector('#reset');
const keyCodes = new Set([
  'KeyW', 'KeyA', 'KeyS', 'KeyD', 'ShiftLeft', 'ShiftRight',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'
]);
const eyeHeight = 1.64;
const maxPitch = 1.32;
const view = { ...spawn };
const keys = new Set();
const velocity = { x: 0, z: 0 };

function helpVisible(visible) {
  controls.hidden = !visible;
  help.setAttribute('aria-expanded', String(visible));
}

function reset() {
  Object.assign(view, spawn);
  velocity.x = velocity.z = 0;
  keys.clear();
}

function installControls(canvas) {
  let drag = null;
  let usedMouse = false;
  const locked = () => document.pointerLockElement === canvas;
  const look = (dx, dy) => {
    view.yaw -= dx * .00235;
    view.pitch = T.MathUtils.clamp(view.pitch - dy * .00235, -maxPitch, maxPitch);
  };

  function captureUnavailable() {
    lookInstructions.textContent = 'Drag the scene to look. Use the keyboard to walk.';
    startControl.textContent = 'Focus scene';
  }

  function capture() {
    canvas.focus({ preventScroll: true });
    if (locked()) return;
    if (!canvas.requestPointerLock) {
      captureUnavailable();
      return;
    }
    try {
      canvas.requestPointerLock()?.catch(captureUnavailable);
    } catch {
      captureUnavailable();
    }
  }

  startControl.addEventListener('click', capture);
  resetControl.addEventListener('click', () => {
    reset();
    canvas.focus({ preventScroll: true });
  });
  help.addEventListener('click', () => helpVisible(controls.hidden));

  document.addEventListener('pointerlockerror', captureUnavailable);
  document.addEventListener('pointerlockchange', () => {
    const isLocked = locked();
    experience.classList.toggle('is-locked', isLocked);
    if (isLocked) {
      usedMouse = true;
      drag = null;
      helpVisible(false);
    } else if (usedMouse) {
      keys.clear();
      helpVisible(true);
    }
  });
  document.addEventListener('mousemove', event => {
    if (locked()) look(event.movementX, event.movementY);
  });
  canvas.addEventListener('pointerdown', event => {
    if (locked() || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, distance: 0 };
    canvas.focus({ preventScroll: true });
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId || locked()) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    drag.x = event.clientX;
    drag.y = event.clientY;
    drag.distance += Math.abs(dx) + Math.abs(dy);
    if (drag.distance > 3) {
      look(dx, dy);
      helpVisible(false);
    }
  });
  canvas.addEventListener('pointerup', event => {
    if (drag?.id !== event.pointerId) return;
    const click = drag.distance < 5;
    drag = null;
    if (click && event.pointerType === 'mouse') capture();
  });
  canvas.addEventListener('pointercancel', () => { drag = null; });

  window.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.code === 'KeyR') {
      if (!event.repeat) reset();
      return;
    }
    if (event.code === 'KeyH') {
      if (!event.repeat) helpVisible(controls.hidden);
      return;
    }
    if (!keyCodes.has(event.code)) return;
    event.preventDefault();
    keys.add(event.code);
  });
  window.addEventListener('keyup', event => keys.delete(event.code));
  window.addEventListener('blur', () => keys.clear());
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      keys.clear();
      velocity.x = velocity.z = 0;
    }
  });
}

async function start() {
  const renderer = new T.WebGLRenderer({
    antialias: true, alpha: false, depth: true, stencil: false,
    powerPreference: 'high-performance'
  });
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('aria-label', 'Captain’s quarters 3D view');
  viewport.append(renderer.domElement);

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(63, 1, .05, 134);
  camera.rotation.order = 'YXZ';
  camera.position.set(view.x, eyeHeight, view.z);
  camera.rotation.set(view.pitch, view.yaw, 0);
  const world = new WalkSpace();
  const planet = loadPlanet();
  const orderByRoom = quarters(scene, world);
  orderByRoom(view.z);
  const starsPixelRatio = exterior(scene, await planet);

  function resize() {
    const { clientWidth: w, clientHeight: h } = viewport;
    const width = Math.max(1, w);
    const height = Math.max(1, h);
    const ratio = Math.min(window.devicePixelRatio || 1, 1.4, Math.sqrt(1_950_000 / (width * height)));
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    starsPixelRatio.value = ratio;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lastTime = 0;
  let gait = 0;
  let sway = 0;
  let lastZone = '';
  const held = code => Number(keys.has(code));
  function frame(now) {
    const dt = Math.min(.044, Math.max(0, (now - (lastTime || now)) / 1000));
    lastTime = now;
    view.yaw += (held('ArrowLeft') - held('ArrowRight')) * dt * 1.66;
    const forward = Number(keys.has('KeyW') || keys.has('ArrowUp')) - Number(keys.has('KeyS') || keys.has('ArrowDown'));
    const side = held('KeyD') - held('KeyA');
    const [dx, dz] = translation(view.yaw, side, forward);
    const speed = keys.has('ShiftLeft') || keys.has('ShiftRight') ? 3.18 : 2.07;
    const follow = 1 - Math.exp(-14 * dt);
    velocity.x += (dx * speed - velocity.x) * follow;
    velocity.z += (dz * speed - velocity.z) * follow;
    const lastX = view.x, lastZ = view.z;
    world.advance(view, velocity.x * dt, velocity.z * dt);

    const distance = Math.hypot(view.x - lastX, view.z - lastZ);
    gait += distance * 7.3;
    const move = dt > 0 ? Math.min(1, distance / (dt * speed)) : 0;
    sway += ((reduceMotion.matches ? 0 : move * Math.sin(gait) * .012) - sway) * follow;
    camera.position.set(view.x, eyeHeight + sway, view.z);
    camera.rotation.set(view.pitch, view.yaw, 0);
    const zoneName = locationAt(view.z);
    if (zoneName !== lastZone) {
      zone.textContent = zoneName;
      orderByRoom(view.z);
      lastZone = zoneName;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  renderer.domElement.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    status.textContent = 'Graphics context lost. Waiting for the browser to restore it.';
    loading.hidden = false;
  });
  renderer.domElement.addEventListener('webglcontextrestored', () => { loading.hidden = true; });
  await renderer.compileAsync(scene, camera);
  renderer.render(scene, camera);
  loading.hidden = true;
  installControls(renderer.domElement);
  requestAnimationFrame(frame);
}

start().catch(error => {
  console.error(error);
  status.textContent = 'The quarters require WebGL 2. Check browser graphics support and reload.';
});
