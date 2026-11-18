import * as T from './vendor/three.module.min.js';
import { Batch } from './geom.js';
import {
  buildStationCollision, clamp, CollisionWorld, EYE_HEIGHT, slide, SPAWN, walkingSurface, zoneAt
} from './layout.js';
import { makeMaterials } from './materials.js';
import { buildRailway } from './railway.js';
import { buildStation } from './station.js';
import { buildWoodland } from './woodland.js';

const overlay = document.querySelector('#overlay');
const intro = document.querySelector('#intro');
const enter = document.querySelector('#enter');
const reset = document.querySelector('#reset');
const error = document.querySelector('#error');
const hud = document.querySelector('#hud');
const area = document.querySelector('#area');
const hint = document.querySelector('#hint');
const shortcut = document.querySelector('#shortcut');

function makeSky() {
  const shader = new T.ShaderMaterial({
    side: T.BackSide,
    depthWrite: false,
    uniforms: {
      horizon: { value: new T.Color('#d6c7a9') },
      sky: { value: new T.Color('#829da6') },
      zenith: { value: new T.Color('#567585') },
      light: { value: new T.Vector3(-24, 13.25, 19).normalize() }
    },
    vertexShader: `
      varying vec3 vSkyDir;
      void main() {
        vSkyDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vSkyDir;
      uniform vec3 horizon;
      uniform vec3 sky;
      uniform vec3 zenith;
      uniform vec3 light;
      void main() {
        vec3 ray = normalize(vSkyDir);
        float elevation = max(0.0, ray.y);
        vec3 shade = mix(horizon, sky, smoothstep(0.01, 0.44, elevation));
        shade = mix(shade, zenith, smoothstep(0.38, 1.0, elevation));
        float distanceToSun = max(0.0, dot(ray, light));
        float glow = 0.25 * pow(distanceToSun, 8.0) + 0.23 * pow(distanceToSun, 61.0);
        shade += vec3(0.91, 0.50, 0.20) * glow;
        shade += vec3(2.4, 1.7, 0.8) * smoothstep(0.99974, 0.99991, distanceToSun);
        float dither = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
        gl_FragColor = vec4(shade + (dither - 0.5) * 0.003, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `
  });
  const dome = new T.Mesh(new T.SphereGeometry(113, 32, 20), shader);
  dome.frustumCulled = false;
  dome.renderOrder = 1000;
  return dome;
}

function addLight(scene) {
  const hemisphere = new T.HemisphereLight('#c5d6e5', '#927753', 1.38);
  const ambient = new T.AmbientLight('#b4c0ce', .13);
  const sun = new T.DirectionalLight('#ffd299', 2.82);
  sun.position.set(-23, 14.1, 18);
  sun.target.position.set(1, 1.1, -1);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -26;
  sun.shadow.camera.right = 24;
  sun.shadow.camera.top = 23;
  sun.shadow.camera.bottom = -22;
  sun.shadow.camera.near = 4;
  sun.shadow.camera.far = 75;
  sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.bias = -.00018;
  sun.shadow.normalBias = .034;
  sun.shadow.intensity = .91;
  sun.shadow.radius = 2.2;
  scene.add(hemisphere, ambient, sun, sun.target);
}

const hints = {
  'Station approach': 'Follow the path to the station steps.',
  'Waiting room': 'The opposite doorway leads to the platform.',
  'Platform': 'Follow the platform past the canopy to the boarded crossing.',
  'Pedestrian crossing': 'The woodland path begins on the far side of the rails.',
  'Woodland footpath': 'The woodland path loops back to the station entrance.'
};

async function run() {
  const renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;

  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute('aria-label', 'First-person view of Alder Halt');
  document.querySelector('#scene').append(canvas);
  const scene = new T.Scene();
  scene.background = new T.Color('#cfc0a3');
  scene.fog = new T.FogExp2('#c3b69b', .0192);
  const sky = makeSky();
  scene.add(sky);
  addLight(scene);

  const material = makeMaterials();
  const scenery = new Batch(15);
  const collision = new CollisionWorld();
  buildStationCollision(collision);
  buildStation(scenery, material);
  buildRailway(scenery, material);
  scenery.finish(scene);
  buildWoodland(scene, material, collision);

  const camera = new T.PerspectiveCamera(64, 1, .055, 185);
  camera.rotation.order = 'YXZ';
  const pose = { ...SPAWN, y: walkingSurface(SPAWN.x, SPAWN.z) };
  let eyeY = pose.y + EYE_HEIGHT;
  let speedX = 0, speedZ = 0, fallSpeed = 0;
  let active = false, started = false, pointerWasLocked = false, pendingCapture = false, drag = false;
  let raf = 0, lastTime = 0, lastArea = '', ready = false;
  const pressed = new Set();

  function draw() {
    camera.position.set(pose.x, eyeY, pose.z);
    camera.rotation.set(pose.pitch, pose.yaw, 0, 'YXZ');
    sky.position.copy(camera.position);
    renderer.render(scene, camera);
  }

  function resize() {
    const w = Math.max(window.innerWidth, 1);
    const h = Math.max(window.innerHeight, 1);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.30, Math.sqrt(2650000 / (w * h)));
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (!active && ready) draw();
  }

  function updateArea() {
    const name = zoneAt(pose.x, pose.z);
    if (name === lastArea) return;
    area.textContent = name;
    hint.textContent = hints[name];
    lastArea = name;
  }

  function restart() {
    Object.assign(pose, SPAWN, { y: walkingSurface(SPAWN.x, SPAWN.z) });
    eyeY = pose.y + EYE_HEIGHT;
    speedX = speedZ = fallSpeed = 0;
    updateArea();
    if (!active) draw();
  }

  function frame(now) {
    raf = 0;
    if (!active) return;
    const dt = lastTime ? clamp((now - lastTime) / 1000, 0, .053) : 0;
    lastTime = now;
    if (dt) {
      let forward = Number(pressed.has('KeyW') || pressed.has('ArrowUp')) -
        Number(pressed.has('KeyS') || pressed.has('ArrowDown'));
      let right = Number(pressed.has('KeyD') || pressed.has('ArrowRight')) -
        Number(pressed.has('KeyA') || pressed.has('ArrowLeft'));
      const runSpeed = pressed.has('ShiftLeft') || pressed.has('ShiftRight') ? 3.58 : 2.15;
      const length = Math.hypot(forward, right) || 1;
      const sine = Math.sin(pose.yaw), cosine = Math.cos(pose.yaw);
      forward *= runSpeed / length;
      right *= runSpeed / length;
      const follow = 1 - Math.exp(-dt * 16);
      speedX += (right * cosine - forward * sine - speedX) * follow;
      speedZ += (-right * sine - forward * cosine - speedZ) * follow;
      const samples = Math.max(1, Math.ceil(dt / .021));
      for (let i = 0; i < samples; i++) {
        const step = dt / samples;
        if (Math.abs(speedX) + Math.abs(speedZ) > .005) slide(collision, pose, speedX * step, speedZ * step);
        const surface = walkingSurface(pose.x, pose.z);
        if (pose.y > surface + .002) {
          fallSpeed = Math.min(5.4, fallSpeed + step * 10);
          pose.y = Math.max(surface, pose.y - fallSpeed * step);
        } else {
          fallSpeed = 0;
          pose.y = surface;
        }
      }
      eyeY += (pose.y + EYE_HEIGHT - eyeY) * (1 - Math.exp(-dt * 22));
      updateArea();
    }
    draw();
    raf = requestAnimationFrame(frame);
  }

  function pause() {
    active = false;
    pendingCapture = false;
    drag = false;
    pressed.clear();
    speedX = speedZ = 0;
    lastTime = 0;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    overlay.hidden = false;
    hud.hidden = true;
    intro.textContent = 'Explore the waiting room, platform and woodland path.';
    enter.textContent = 'Resume exploring';
    reset.hidden = false;
    if (document.pointerLockElement === canvas) document.exitPointerLock();
    enter.focus({ preventScroll: true });
  }

  function useDrag() {
    pendingCapture = false;
    if (!active || document.pointerLockElement === canvas) return;
    shortcut.setAttribute('aria-label', 'Drag to look, Escape to pause, R to reset');
    const dragInstruction = document.createElement('span');
    dragInstruction.className = 'drag-label';
    dragInstruction.textContent = 'Drag to look';
    shortcut.querySelector('.drag-label')?.remove();
    shortcut.prepend(dragInstruction);
  }

  function play() {
    started = true;
    active = true;
    lastTime = 0;
    overlay.hidden = true;
    hud.hidden = false;
    canvas.focus({ preventScroll: true });
    updateArea();
    raf = requestAnimationFrame(frame);
    shortcut.querySelector('.drag-label')?.remove();
    shortcut.removeAttribute('aria-label');
    if (typeof canvas.requestPointerLock !== 'function') {
      useDrag();
      return;
    }
    pendingCapture = true;
    try {
      const capture = canvas.requestPointerLock();
      if (capture?.catch) capture.catch(useDrag);
    } catch {
      useDrag();
    }
  }

  enter.addEventListener('click', play);
  reset.addEventListener('click', restart);
  document.addEventListener('pointerlockerror', useDrag);
  document.addEventListener('pointerlockchange', () => {
    const locked = document.pointerLockElement === canvas;
    if (locked) {
      pendingCapture = false;
      shortcut.querySelector('.drag-label')?.remove();
    }
    if (!locked && pointerWasLocked && active) pause();
    pointerWasLocked = locked;
  });

  function look(dx, dy) {
    const sensitivity = .00205;
    pose.yaw = (pose.yaw - dx * sensitivity) % (Math.PI * 2);
    pose.pitch = clamp(pose.pitch - dy * sensitivity, -1.49, 1.49);
  }
  document.addEventListener('mousemove', event => {
    if (active && document.pointerLockElement === canvas) look(event.movementX, event.movementY);
  });
  let dragX = 0, dragY = 0;
  canvas.addEventListener('pointerdown', event => {
    if (!active || document.pointerLockElement === canvas) return;
    if (pendingCapture) useDrag();
    drag = true;
    dragX = event.clientX;
    dragY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    if (!drag) return;
    look(event.clientX - dragX, event.clientY - dragY);
    dragX = event.clientX;
    dragY = event.clientY;
  });
  for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    canvas.addEventListener(event, () => { drag = false; });
  }

  const movement = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ShiftLeft', 'ShiftRight']);
  window.addEventListener('keydown', event => {
    if (event.code === 'KeyR' && started && !event.repeat) restart();
    if (!active) return;
    if (event.code === 'Escape' && document.pointerLockElement !== canvas) pause();
    if (movement.has(event.code)) {
      event.preventDefault();
      pressed.add(event.code);
    }
  });
  window.addEventListener('keyup', event => pressed.delete(event.code));
  window.addEventListener('blur', () => {
    if (active) pause();
  });
  window.addEventListener('resize', resize);
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    pause();
    enter.disabled = true;
    error.hidden = false;
    error.textContent = 'The graphics context was interrupted. Waiting for it to recover.';
  });
  canvas.addEventListener('webglcontextrestored', () => {
    renderer.shadowMap.needsUpdate = true;
    error.hidden = true;
    enter.disabled = false;
    draw();
  });

  updateArea();
  resize();
  await renderer.compileAsync(scene, camera);
  ready = true;
  draw();
  enter.disabled = false;
  enter.textContent = 'Enter the station';
}

requestAnimationFrame(() => {
  run().catch(cause => {
    console.error(cause);
    error.hidden = false;
    error.textContent = 'The 3D scene could not start. Open this page over localhost in a desktop browser with WebGL 2 enabled.';
    enter.textContent = 'Scene unavailable';
  });
});
