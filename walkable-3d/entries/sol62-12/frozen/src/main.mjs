import * as THREE from '../vendor/three.module.min.js';
import { eyeHeight, moveWithCollision, spawn } from './layout.mjs';
import { createArcade } from './scene.mjs';

const arcade = document.querySelector('#arcade');
const stage = document.querySelector('#stage');
const enter = document.querySelector('#enter');
const entry = document.querySelector('#entry');
const hint = document.querySelector('#hint');
const lookHelp = document.querySelector('#look-help');
const exitHelp = document.querySelector('#exit-help');
const status = document.querySelector('#status');
const resetButton = document.querySelector('#reset');
const movementKeys = new Set([
  'KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'KeyQ', 'KeyE', 'ShiftLeft', 'ShiftRight',
]);

function start() {
  const scene = createArcade();
  const camera = new THREE.PerspectiveCamera(59, window.innerWidth / window.innerHeight, 0.055, 44);
  camera.rotation.order = 'YXZ';
  const renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: false, powerPreference: 'high-performance', stencil: false,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute('aria-label', 'Arcade view. Click to capture the mouse, use W A S D to walk, and press R to return to the entrance.');
  stage.append(canvas);

  const keys = new Set();
  const pose = { ...spawn };
  let velocityX = 0;
  let velocityZ = 0;
  let dirty = true;
  let lastFrame = 0;
  let frame = 0;
  let lockUnavailable = typeof canvas.requestPointerLock !== 'function';
  let entered = false;
  let dragPointer = null;
  let dragX = 0;
  let dragY = 0;
  let menuReturnFocus = false;
  let contextLost = false;

  function locked() {
    return document.pointerLockElement === canvas;
  }

  function refreshControls() {
    const active = locked() || (lockUnavailable && entered);
    arcade.classList.toggle('has-look', active);
    entry.hidden = active;
    lookHelp.textContent = lockUnavailable ? 'Drag to look · Q/E to turn' : 'Mouse look';
    hint.textContent = lockUnavailable ? 'WASD to move · Drag to look' : 'WASD to move · Mouse to look';
    exitHelp.hidden = lockUnavailable;
  }

  function wake() {
    if (!frame && !contextLost) frame = requestAnimationFrame(tick);
  }

  function enterDragMode() {
    if (locked()) return;
    lockUnavailable = true;
    entered = true;
    canvas.focus({ preventScroll: true });
    refreshControls();
  }

  function captureMouse() {
    if (contextLost || locked()) return;
    if (lockUnavailable) {
      enterDragMode();
      return;
    }
    entered = true;
    canvas.focus({ preventScroll: true });
    try {
      const request = canvas.requestPointerLock();
      if (request && typeof request.catch === 'function') request.catch(enterDragMode);
    } catch {
      enterDragMode();
    }
  }

  function reset() {
    Object.assign(pose, spawn);
    velocityX = 0;
    velocityZ = 0;
    keys.clear();
    dirty = true;
    wake();
  }

  function resize() {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    const limit = Math.sqrt(3100000 / (width * height));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.45, limit));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    dirty = true;
    wake();
  }

  function turn(dx, dy, sensitivity) {
    if (dx === 0 && dy === 0) return;
    pose.yaw -= dx * sensitivity;
    pose.pitch = THREE.MathUtils.clamp(pose.pitch - dy * sensitivity, -1.40, 1.40);
    dirty = true;
    wake();
  }

  function held(primary, secondary) {
    return keys.has(primary) || keys.has(secondary) ? 1 : 0;
  }

  function tick(now) {
    frame = 0;
    if (contextLost) return;
    const dt = lastFrame ? Math.min(0.043, (now - lastFrame) / 1000) : 1 / 60;
    lastFrame = now;

    const forward = held('KeyW', 'ArrowUp') - held('KeyS', 'ArrowDown');
    const strafe = held('KeyD', 'ArrowRight') - held('KeyA', 'ArrowLeft');
    const yawDirection = Number(keys.has('KeyE')) - Number(keys.has('KeyQ'));
    if (yawDirection) {
      pose.yaw -= yawDirection * 1.60 * dt;
      dirty = true;
    }
    const directionLength = Math.max(1, Math.hypot(forward, strafe));
    const speed = (held('ShiftLeft', 'ShiftRight') ? 1.17 : 2.40) / directionLength;
    const c = Math.cos(pose.yaw);
    const s = Math.sin(pose.yaw);
    const damping = 1 - Math.exp(-22 * dt);
    velocityX += ((c * strafe - s * forward) * speed - velocityX) * damping;
    velocityZ += ((-s * strafe - c * forward) * speed - velocityZ) * damping;
    const walking = Math.abs(velocityX) + Math.abs(velocityZ) > 0.004;
    if (walking) {
      moveWithCollision(pose, velocityX * dt, velocityZ * dt);
      dirty = true;
    } else {
      velocityX = 0;
      velocityZ = 0;
    }

    if (dirty || locked()) {
      camera.position.set(pose.x, eyeHeight, pose.z);
      camera.rotation.set(pose.pitch, pose.yaw, 0, 'YXZ');
      renderer.render(scene, camera);
      dirty = false;
    }
    if (locked() || walking || yawDirection || forward || strafe) wake();
    else lastFrame = 0;
  }

  enter.addEventListener('click', () => {
    menuReturnFocus = true;
    captureMouse();
  });
  resetButton.addEventListener('click', reset);
  canvas.addEventListener('click', event => {
    if (event.button === 0 && !lockUnavailable) captureMouse();
  });
  canvas.addEventListener('pointerdown', event => {
    if (!(lockUnavailable || event.pointerType === 'touch') || event.button !== 0) return;
    if (!entered || event.pointerType === 'touch') enterDragMode();
    dragPointer = event.pointerId;
    dragX = event.clientX;
    dragY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    if (dragPointer !== event.pointerId) return;
    turn(event.clientX - dragX, event.clientY - dragY, 0.0042);
    dragX = event.clientX;
    dragY = event.clientY;
  });
  canvas.addEventListener('lostpointercapture', () => { dragPointer = null; });
  canvas.addEventListener('pointercancel', () => { dragPointer = null; });
  canvas.addEventListener('pointerup', () => { dragPointer = null; });
  canvas.addEventListener('contextmenu', event => event.preventDefault());

  document.addEventListener('pointerlockchange', () => {
    keys.clear();
    velocityX = 0;
    velocityZ = 0;
    refreshControls();
    if (!locked() && menuReturnFocus) enter.focus({ preventScroll: true });
    wake();
  });
  document.addEventListener('pointerlockerror', enterDragMode);
  document.addEventListener('mousemove', event => {
    if (locked()) turn(event.movementX, event.movementY, 0.00225);
  });
  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.code === 'KeyR' && !event.repeat) {
      event.preventDefault();
      reset();
      return;
    }
    if (!movementKeys.has(event.code)) return;
    event.preventDefault();
    keys.add(event.code);
    wake();
  });
  document.addEventListener('keyup', event => keys.delete(event.code));
  window.addEventListener('blur', () => {
    keys.clear();
    velocityX = 0;
    velocityZ = 0;
  });
  window.addEventListener('resize', resize);

  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    contextLost = true;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    if (locked()) document.exitPointerLock();
    status.textContent = 'The graphics context was interrupted. Waiting for WebGL to recover.';
    status.hidden = false;
  });
  canvas.addEventListener('webglcontextrestored', () => {
    contextLost = false;
    status.hidden = true;
    resize();
  });

  refreshControls();
  resize();
  status.hidden = true;
}

requestAnimationFrame(() => {
  try {
    start();
  } catch (error) {
    console.error('Lantern Arcade could not initialize.', error);
    entry.hidden = true;
    status.hidden = false;
    status.textContent = 'Lantern Arcade could not start. Check that this browser supports WebGL 2.';
  }
});
