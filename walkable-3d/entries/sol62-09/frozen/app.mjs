import * as THREE from './vendor/three.module.min.js';
import { DECK, EYE_HEIGHT, START, locationOf, move } from './navigation.mjs';
import { createBay } from './world.mjs';

const viewport = document.getElementById('viewport');
const engage = document.getElementById('engage');
const dragMode = document.getElementById('drag-mode');
const gate = document.getElementById('gate');
const gateTitle = document.getElementById('gate-title');
const gateCopy = document.getElementById('gate-copy');
const zoneNode = document.getElementById('zone');
const levelNode = document.getElementById('level');
const lookControl = document.getElementById('look-control');
const releaseControl = document.getElementById('release');
const moveCodes = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ShiftLeft', 'ShiftRight']);

async function initialise() {
  await new Promise(resolve => requestAnimationFrame(resolve));
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.03;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-label', 'Interactive 3D view of the maintenance bay');
  canvas.tabIndex = -1;
  viewport.prepend(canvas);

  const scene = createBay();
  const camera = new THREE.PerspectiveCamera(63, 1, 0.075, 310);
  camera.rotation.order = 'YXZ';
  const pose = { ...START };
  const keys = new Set();
  let visualFeet = pose.y;
  let vx = 0, vz = 0;
  let lastTime = 0;
  let mode = 'idle';
  let previousZone = '';
  let dragging = null;
  let dirty = true;

  function setMode(next) {
    mode = next;
    const exploring = mode !== 'idle';
    gate.hidden = exploring;
    viewport.classList.toggle('is-exploring', exploring);
    lookControl.innerHTML = mode === 'drag' ? '<kbd>Drag</kbd> Look' : '<kbd>Mouse</kbd> Look';
    releaseControl.innerHTML = mode === 'drag' ? '<kbd>Esc</kbd> Pause' : '<kbd>Esc</kbd> Release';
    if (exploring) {
      engage.textContent = 'Resume exploration';
      canvas.focus({ preventScroll: true });
    } else {
      keys.clear();
      dragging = null;
      vx = vz = 0;
    }
    dirty = true;
  }

  function resize() {
    const width = Math.max(1, viewport.clientWidth);
    const height = Math.max(1, viewport.clientHeight);
    const maxPixels = 2300000;
    const scale = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(maxPixels / (width * height)));
    renderer.setPixelRatio(scale);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = camera.aspect < 1.0 ? 72 : 63;
    camera.updateProjectionMatrix();
    dirty = true;
  }

  function describeLocation() {
    const zone = locationOf(pose);
    if (zone === previousZone) return;
    zoneNode.textContent = zone;
    levelNode.textContent = zone === 'INSPECTION DECK' && pose.y >= DECK.height - 0.04 ? 'L1' : 'L0';
    previousZone = zone;
  }

  function reset() {
    Object.assign(pose, START);
    visualFeet = pose.y;
    vx = vz = 0;
    keys.clear();
    dirty = true;
    if (mode !== 'idle') canvas.focus({ preventScroll: true });
  }

  function pointerUnavailable() {
    gateCopy.textContent = 'Mouse capture is unavailable. Use drag-to-look to explore with the keyboard.';
    dragMode.hidden = false;
  }

  async function activate() {
    if (mode !== 'idle') return;
    if (!canvas.requestPointerLock) {
      setMode('drag');
      return;
    }
    try {
      await canvas.requestPointerLock();
    } catch {
      pointerUnavailable();
    }
  }

  function look(dx, dy) {
    if (!dx && !dy) return;
    pose.yaw -= dx * 0.00218;
    pose.pitch = THREE.MathUtils.clamp(pose.pitch - dy * 0.00218, -1.515, 1.515);
    dirty = true;
  }

  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === canvas) {
      gateCopy.textContent = 'Walk the work floor, then take the stairs to the inspection deck.';
      setMode('locked');
    } else if (mode === 'locked') {
      setMode('idle');
    }
  });
  document.addEventListener('pointerlockerror', pointerUnavailable);
  document.addEventListener('mousemove', event => {
    if (mode === 'locked') look(event.movementX, event.movementY);
  });

  canvas.addEventListener('pointerdown', event => {
    if (mode !== 'drag' || event.button !== 0) return;
    canvas.setPointerCapture(event.pointerId);
    dragging = { id: event.pointerId, x: event.clientX, y: event.clientY };
    canvas.focus({ preventScroll: true });
  });
  canvas.addEventListener('pointermove', event => {
    if (mode !== 'drag' || dragging?.id !== event.pointerId) return;
    look((event.clientX - dragging.x) * 1.45, (event.clientY - dragging.y) * 1.45);
    dragging.x = event.clientX;
    dragging.y = event.clientY;
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    canvas.addEventListener(type, event => {
      if (dragging?.id === event.pointerId) dragging = null;
    });
  }

  window.addEventListener('keydown', event => {
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    if (event.code === 'KeyR' && !event.repeat) {
      event.preventDefault();
      reset();
      return;
    }
    if (event.code === 'Escape' && mode === 'drag') {
      setMode('idle');
      return;
    }
    if (mode === 'idle' || !moveCodes.has(event.code)) return;
    event.preventDefault();
    keys.add(event.code);
  });
  window.addEventListener('keyup', event => keys.delete(event.code));
  window.addEventListener('blur', () => {
    keys.clear();
    vx = vz = 0;
  });
  window.addEventListener('resize', resize);
  engage.addEventListener('click', activate);
  dragMode.addEventListener('click', () => setMode('drag'));
  document.getElementById('reset').addEventListener('click', reset);

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    if (document.pointerLockElement === canvas) document.exitPointerLock();
    setMode('idle');
    engage.disabled = true;
    engage.textContent = 'Reconnecting graphics';
    gateCopy.textContent = 'Waiting for the browser to restore the 3D view.';
  });
  canvas.addEventListener('webglcontextrestored', () => {
    renderer.shadowMap.needsUpdate = true;
    engage.disabled = false;
    engage.textContent = 'Resume exploration';
    gateCopy.textContent = 'Walk the work floor, then take the stairs to the inspection deck.';
    dirty = true;
  });

  function placeCamera() {
    camera.position.set(pose.x, visualFeet + EYE_HEIGHT, pose.z);
    camera.rotation.set(pose.pitch, pose.yaw, 0, 'YXZ');
  }

  function frame(time) {
    const dt = Math.min((time - lastTime) / 1000 || 0.016, 0.05);
    lastTime = time;
    if (mode !== 'idle') {
      const forward = Number(keys.has('KeyW') || keys.has('ArrowUp')) - Number(keys.has('KeyS') || keys.has('ArrowDown'));
      const side = Number(keys.has('KeyD') || keys.has('ArrowRight')) - Number(keys.has('KeyA') || keys.has('ArrowLeft'));
      const speed = (keys.has('ShiftLeft') || keys.has('ShiftRight') ? 4.65 : 3.22) / (forward && side ? Math.SQRT2 : 1);
      const sine = Math.sin(pose.yaw), cosine = Math.cos(pose.yaw);
      const blend = 1 - Math.exp(-dt * (forward || side ? 22 : 29));
      vx += ((side * cosine - forward * sine) * speed - vx) * blend;
      vz += ((-forward * cosine - side * sine) * speed - vz) * blend;
      if (Math.abs(vx) + Math.abs(vz) > 0.005) {
        move(pose, vx * dt, vz * dt);
        dirty = true;
      }
    }
    if (Math.abs(visualFeet - pose.y) > 0.0002) {
      visualFeet += (pose.y - visualFeet) * (1 - Math.exp(-dt * 23));
      dirty = true;
    }
    if (!dirty) return;
    placeCamera();
    describeLocation();
    renderer.render(scene, camera);
    dirty = false;
  }

  resize();
  placeCamera();
  await renderer.compileAsync(scene, camera);
  // The first frame uploads the static buffers before exploration begins.
  const staticMeshes = scene.children.filter(node => node.isMesh && node.frustumCulled);
  for (const mesh of staticMeshes) mesh.frustumCulled = false;
  frame(performance.now());
  for (const mesh of staticMeshes) mesh.frustumCulled = true;
  renderer.setAnimationLoop(frame);
  dragMode.hidden = false;
  engage.disabled = false;
  engage.textContent = 'Enter bay';
}

initialise().catch(error => {
  console.error(error);
  gateTitle.textContent = 'Unable to open the bay';
  gateCopy.textContent = 'This scene requires a desktop browser with WebGL 2. Check hardware acceleration and reload.';
  engage.textContent = '3D view unavailable';
  engage.disabled = true;
});
