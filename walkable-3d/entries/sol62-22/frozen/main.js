import * as THREE from 'three';
import { buildArchitecture, PLAN } from './architecture.js';
import { buildArchive } from './archive.js';
import { buildCommission } from './commission.js';
import { buildFittingRoom } from './furnishings.js';
import { World, texture } from './geometry.js';
import { palette } from './materials.js';
import { ENTRANCE, EYE_HEIGHT, floorAt, look, moveWithCollisions } from './navigation.js';
import { buildWorkroom } from './workroom.js';

const atelier = document.querySelector('#atelier');
const viewport = document.querySelector('#viewport');
const welcome = document.querySelector('#welcome');
const enter = document.querySelector('#enter');
const resetButton = document.querySelector('#reset');
const helpButton = document.querySelector('#help');
const roomLabel = document.querySelector('#room');
const hint = document.querySelector('#hint');
const welcomeText = document.querySelector('#welcome-text');

function lightScene(scene, { benchLight, outfitLight }) {
  scene.add(new THREE.HemisphereLight('#cde8ff', '#ab8b6e', 1.55));

  const key = new THREE.DirectionalLight('#d0e5ff', 2.06);
  key.position.set(-7.8, 12.1, 1.55);
  key.target.position.set(0, .04, -3.0);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  const shadow = key.shadow.camera;
  Object.assign(shadow, { left: -13.3, right: 13.3, bottom: -13.0, top: 13.0, near: .8, far: 40 });
  shadow.updateProjectionMatrix();
  key.shadow.bias = -.00025;
  key.shadow.normalBias = .024;
  key.shadow.autoUpdate = false;
  key.shadow.needsUpdate = true;
  scene.add(key, key.target);

  const fill = new THREE.DirectionalLight('#c5e5f2', .63);
  fill.position.set(5.3, 4.8, -9.3);
  fill.target.position.set(-.4, 1.25, -5.6);
  scene.add(fill, fill.target);

  for (const [color, intensity, distance, at] of [
    ['#ffca89', 6.1, 5.3, outfitLight],
    ['#ffb875', 2.85, 3.42, benchLight],
    ['#ffcca5', 3.65, 5.6, [-2.0, 3.39, 4.9]],
    ['#ffcea0', 2.7, 4.6, [1.0, 3.39, -1.6]],
  ]) {
    const lamp = new THREE.PointLight(color, intensity, distance, 2);
    lamp.position.set(...at);
    scene.add(lamp);
  }
}

function floorContact(scene, renderer) {
  const map = texture(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, '#251612b0');
    g.addColorStop(.56, '#25161271');
    g.addColorStop(.76, '#2b1d2038');
    g.addColorStop(1, '#25161200');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }, renderer);
  const mat = new THREE.MeshBasicMaterial({ map, transparent: true, opacity: .62, depthWrite: false });
  for (const [x, z, w, d] of [[-.88, -8.82, 2.25, 1.82], [3.25, -9.23, 1.90, 3.73],
    [-2.0, -1.00, 2.50, 1.53], [4.48, 5.60, 1.39, 2.93], [3.66, 2.02, 2.61, 1.07]]) {
    const decal = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
    decal.rotation.x = -Math.PI / 2;
    decal.position.set(x, .009, z);
    scene.add(decal);
  }
}

function start() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#a1bcb5');
  const camera = new THREE.PerspectiveCamera(66, 1, .046, 51);
  camera.rotation.order = 'YXZ';
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute('aria-label', 'First-person atelier viewport');
  viewport.append(canvas);

  const world = new World(scene);
  const p = palette(renderer);
  buildArchitecture(world, p);
  buildFittingRoom(world, p);
  buildArchive(world, p);
  buildCommission(world, p);
  const lampPositions = buildWorkroom(world, p);
  lightScene(scene, lampPositions);
  floorContact(scene, renderer);
  world.finalize();

  const controls = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
    'ShiftLeft', 'ShiftRight', 'KeyQ', 'KeyE']);
  const pressed = new Set(), view = { ...ENTRANCE };
  const velocity = new THREE.Vector2();
  let eyeY = EYE_HEIGHT, drag = null, hasEntered = false, menuOpen = true, lockUnavailable = false;
  let dirty = true, prev = performance.now(), room = '', frame = null;
  let viewportWidth = 0, viewportHeight = 0;

  function schedule() {
    if (frame === null) frame = requestAnimationFrame(tick);
  }

  function invalidate() {
    dirty = true;
    schedule();
  }

  function resize() {
    const w = viewport.clientWidth, h = viewport.clientHeight;
    if (!w || !h || (w === viewportWidth && h === viewportHeight)) return;
    viewportWidth = w;
    viewportHeight = h;
    const wanted = Math.min(window.devicePixelRatio || 1, 1.42, Math.sqrt(2500000 / (w * h)));
    renderer.setPixelRatio(wanted);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    invalidate();
  }

  function clearMovement() {
    pressed.clear();
    drag = null;
    velocity.set(0, 0);
  }

  function reset() {
    Object.assign(view, ENTRANCE);
    eyeY = EYE_HEIGHT;
    clearMovement();
    invalidate();
  }

  function showHint(text) {
    hint.textContent = text;
    hint.hidden = !text;
  }

  function setMenu(open) {
    menuOpen = open;
    welcome.hidden = !open;
    atelier.classList.toggle('is-active', !open && hasEntered);
    if (open) showHint('');
  }

  function enableDragLook() {
    lockUnavailable = true;
    if (!menuOpen) showHint('Drag to look · WASD or arrow keys to walk');
  }

  function requestLook() {
    if (!canvas.requestPointerLock || lockUnavailable) {
      enableDragLook();
      return;
    }
    try {
      const result = canvas.requestPointerLock();
      result?.catch(enableDragLook);
    } catch {
      enableDragLook();
    }
  }

  function activate() {
    hasEntered = true;
    setMenu(false);
    canvas.focus({ preventScroll: true });
    requestLook();
    invalidate();
  }

  enter.addEventListener('click', activate);
  resetButton.addEventListener('click', () => {
    reset();
    if (!menuOpen) canvas.focus({ preventScroll: true });
  });
  helpButton.addEventListener('click', () => {
    if (document.pointerLockElement === canvas) document.exitPointerLock();
    clearMovement();
    enter.textContent = hasEntered ? 'Resume exploring' : 'Enter the atelier';
    setMenu(true);
    enter.focus({ preventScroll: true });
  });

  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === canvas) {
      drag = null;
      showHint('');
    } else {
      clearMovement();
      if (!menuOpen) showHint('Click to capture the mouse · R to return to the entrance');
    }
  });
  document.addEventListener('pointerlockerror', enableDragLook);
  document.addEventListener('mousemove', event => {
    if (document.pointerLockElement !== canvas || menuOpen) return;
    look(view, event.movementX, event.movementY);
    invalidate();
  });

  canvas.addEventListener('pointerdown', event => {
    if (event.button !== 0 || document.pointerLockElement === canvas || menuOpen) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
    canvas.setPointerCapture?.(event.pointerId);
    canvas.focus({ preventScroll: true });
    if (!lockUnavailable && event.pointerType !== 'touch') requestLook();
  });
  canvas.addEventListener('pointermove', event => {
    if (document.pointerLockElement === canvas || drag?.id !== event.pointerId) return;
    look(view, event.clientX - drag.x, event.clientY - drag.y);
    drag.x = event.clientX;
    drag.y = event.clientY;
    invalidate();
  });
  function stopDrag(event) {
    if (drag?.id === event.pointerId) drag = null;
  }
  canvas.addEventListener('pointerup', stopDrag);
  canvas.addEventListener('pointercancel', stopDrag);
  canvas.addEventListener('lostpointercapture', stopDrag);

  window.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.code === 'KeyR') {
      reset();
      return;
    }
    if (menuOpen || !controls.has(event.code)) return;
    event.preventDefault();
    if (!pressed.size) prev = performance.now();
    pressed.add(event.code);
    schedule();
  });
  window.addEventListener('keyup', event => pressed.delete(event.code));
  window.addEventListener('blur', clearMovement);
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearMovement(); });
  window.addEventListener('resize', resize);

  function tick(now) {
    frame = null;
    const dt = Math.min(Math.max((now - prev) / 1000, 0), .055);
    prev = now;
    const walking = !menuOpen && pressed.size > 0;
    if (walking) {
      const x = Number(pressed.has('KeyD') || pressed.has('ArrowRight')) -
        Number(pressed.has('KeyA') || pressed.has('ArrowLeft'));
      const z = Number(pressed.has('KeyW') || pressed.has('ArrowUp')) -
        Number(pressed.has('KeyS') || pressed.has('ArrowDown'));
      const turn = Number(pressed.has('KeyQ')) - Number(pressed.has('KeyE'));
      view.yaw += turn * dt * 1.55;
      if (turn) dirty = true;
      const speed = pressed.has('ShiftLeft') || pressed.has('ShiftRight') ? 3.65 : 2.37;
      const length = Math.max(1, Math.hypot(x, z));
      const sine = Math.sin(view.yaw), cosine = Math.cos(view.yaw);
      const gain = 1 - Math.exp(-17 * dt);
      velocity.x += (((x * cosine - z * sine) * speed / length) - velocity.x) * gain;
      velocity.y += (((-z * cosine - x * sine) * speed / length) - velocity.y) * gain;
    } else {
      velocity.multiplyScalar(Math.exp(-21 * dt));
    }

    const moving = velocity.lengthSq() > .00008;
    if (moving) {
      moveWithCollisions(view, velocity.x * dt, velocity.y * dt, world.blockers);
      dirty = true;
    }
    const goalY = EYE_HEIGHT + floorAt(view.x, view.z, world.steps);
    const stepping = Math.abs(goalY - eyeY) > .001;
    if (stepping) {
      eyeY += (goalY - eyeY) * (1 - Math.exp(-18 * dt));
      dirty = true;
    }

    const next = view.z > PLAN.archive ? 'Fitting room' : view.z > PLAN.workshop ? 'Cloth archive' : 'Workroom';
    if (next !== room) {
      room = next;
      roomLabel.textContent = next;
    }
    if (dirty) {
      camera.position.set(view.x, eyeY, view.z);
      camera.rotation.set(view.pitch, view.yaw, 0);
      renderer.render(scene, camera);
      dirty = false;
    }
    if (walking || moving || stepping) schedule();
  }

  resize();
  enter.disabled = false;
  enter.textContent = 'Enter the atelier';
  invalidate();
}

try {
  start();
} catch (error) {
  console.error(error);
  welcomeText.textContent = 'The 3D scene could not start. This build requires a browser with WebGL 2 enabled.';
  enter.textContent = 'The atelier is unavailable';
  enter.disabled = true;
}

