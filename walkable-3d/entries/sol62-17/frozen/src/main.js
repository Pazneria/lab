import * as T from '../vendor/three.module.min.js';
import { Builder } from './craft.js';
import { materials } from './materials.js';
import { buildRoom } from './room.js';
import { buildFurnishings } from './furnish.js';
import { area, eye, move, start } from './layout.js';

const host = document.getElementById('scene');
const overlay = document.getElementById('overlay');
const enter = document.getElementById('enter');
const resetButton = document.getElementById('reset');
const error = document.getElementById('error');
const hud = document.getElementById('hud');
const place = document.getElementById('place');
const keys = document.getElementById('hud-keys');
const objectLabel = document.getElementById('object-label');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const scene = new T.Scene();
scene.background = new T.Color('#9a785f');
const camera = new T.PerspectiveCamera(65, 1, .045, 126);
camera.rotation.order = 'YXZ';
const vec = new T.Vector3();
const target = new T.Vector3();
const player = { ...start, phase: 0, bob: 0, vx: 0, vz: 0 };
const pressed = new Set();
const movement = new Set(['KeyW','KeyS','KeyA','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight']);
let renderer, labels = [], fire, flame;
let ready = false, active = false, dragging = false, fallback = false, entered = false, requesting = false;
let frame = 0, previous = 0, currentArea = '', currentLabel = '';

function lightRoom() {
  const skylight = new T.HemisphereLight('#f0e9e0', '#a77961', 1.34);
  scene.add(skylight, new T.AmbientLight('#dec2a0', .17));

  const sun = new T.DirectionalLight('#ffc084', 3.55);
  sun.position.set(-8.2, 7.90, 13.8);
  sun.target.position.set(0, 1, 0);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -9;
  sun.shadow.camera.right = 9;
  sun.shadow.camera.top = 8;
  sun.shadow.camera.bottom = -8;
  sun.shadow.camera.near = .35;
  sun.shadow.camera.far = 31;
  sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.bias = -.00017;
  sun.shadow.normalBias = .021;
  sun.shadow.intensity = .93;
  scene.add(sun, sun.target);

  // Warm pools fall off before they can flatten the contrast at the balcony.
  fire = new T.PointLight('#ff863b', 5.65, 5.8, 1.55);
  fire.position.set(-3.44, .59, -.21);
  const mantle = new T.PointLight('#ffc180', 2.85, 5.75, 1.6);
  mantle.position.set(-3.16, 1.88, -.64);
  const desk = new T.PointLight('#ffc68e', 4.65, 4.60, 1.6);
  desk.position.set(5.30, 1.69, -2.57);
  const bedside = new T.PointLight('#ffb46d', 1.05, 3.15, 1.8);
  bedside.position.set(2.06, 1.30, -2.76);
  scene.add(fire, mantle, desk, bedside);
}

function addFlames() {
  const shape = new T.LatheGeometry([
    [0,0],[.44,.026],[.69,.14],[.75,.26],[.66,.39],[.57,.52],[.43,.66],[.28,.78],[.146,.89],[0,1],
  ].map(([x,y]) => new T.Vector2(x,y)), 12);
  flame = new T.ShaderMaterial({
    uniforms: { seconds: { value: 0 } },
    vertexShader: `
      uniform float seconds;
      varying float rise;
      varying float ripple;
      void main() {
        vec3 p = position;
        float seed = modelMatrix[3].z * 19.0 + modelMatrix[3].x * 21.0;
        float phase = seconds * 5.0 + seed;
        float high = pow(max(p.y, 0.0), 1.6);
        p.x += (sin(phase + p.y * 4.8) * .37 + .16 * cos(phase * 1.9)) * high;
        p.z += .26 * cos(phase * .82 + p.y * 5.0) * high;
        p.y *= 1.0 + sin(phase * 1.3) * .11 + cos(phase * .56) * .08;
        rise = position.y;
        ripple = sin(phase + position.y * 9.0) * .05;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      varying float rise;
      varying float ripple;
      void main() {
        vec3 core = mix(vec3(1.7, .78, .19), vec3(3.0, 1.35, .35), smoothstep(.0, .24, rise));
        vec3 color = mix(core, vec3(.83, .128, .020), smoothstep(.27, 1.0, rise + ripple));
        gl_FragColor = vec4(color, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  for (const [x,z,h,w] of [[-3.645,-.31,.38,.073],[-3.638,-.125,.42,.067],
    [-3.579,-.223,.48,.079],[-3.617,-.295,.31,.063],[-3.657,-.035,.28,.065],[-3.599,-.380,.29,.056]]) {
    const mesh = new T.Mesh(shape, flame);
    mesh.position.set(x, .242, z);
    mesh.scale.set(w, h, w);
    scene.add(mesh);
  }
}

function setCamera() {
  camera.position.set(player.x, eye + player.bob, player.z);
  camera.rotation.set(player.pitch, player.yaw, 0, 'YXZ');
  camera.updateMatrixWorld();
}

function resize() {
  if (!renderer) return;
  const w = host.clientWidth || innerWidth;
  const h = host.clientHeight || innerHeight;
  const pixelBudget = Math.sqrt(2200000 / (w * h));
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.4, pixelBudget));
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  requestFrame();
}

function reset() {
  Object.assign(player, start, { phase: 0, bob: 0, vx: 0, vz: 0 });
  currentLabel = '';
  objectLabel.hidden = true;
  requestFrame();
}

function turn(dx, dy, sensitivity) {
  player.yaw -= dx * sensitivity;
  player.pitch = T.MathUtils.clamp(player.pitch - dy * sensitivity, -1.38, 1.38);
}

function walk(dt) {
  const down = (...codes) => codes.some(code => pressed.has(code));
  const f = Number(down('KeyW','ArrowUp')) - Number(down('KeyS','ArrowDown'));
  const s = Number(down('KeyD','ArrowRight')) - Number(down('KeyA','ArrowLeft'));
  const norm = f && s ? Math.SQRT1_2 : 1;
  const speed = (down('ShiftLeft','ShiftRight') ? 3.22 : 2.19) * norm;
  const sin = Math.sin(player.yaw), cos = Math.cos(player.yaw);
  const desiredX = (s * cos - f * sin) * speed;
  const desiredZ = (-s * sin - f * cos) * speed;
  const follow = 1 - Math.exp(-19 * dt);
  player.vx += (desiredX - player.vx) * follow;
  player.vz += (desiredZ - player.vz) * follow;
  const oldX = player.x, oldZ = player.z;
  move(player, player.vx * dt, player.vz * dt);
  const stride = Math.hypot(player.x - oldX, player.z - oldZ);
  player.phase += stride * 8.3;
  const targetBob = reduceMotion || !dt ? 0 : Math.sin(player.phase) * .012 * Math.min(1, stride / dt);
  player.bob += (targetBob - player.bob) * (1 - Math.exp(-18 * dt));
}

function updateHUD() {
  const name = area(player.x, player.z);
  if (name !== currentArea) {
    place.textContent = name;
    currentArea = name;
  }
  camera.getWorldDirection(vec);
  let bestDot = .982;
  let text = '';
  for (const label of labels) {
    target.copy(label.point).sub(camera.position);
    const distance = target.length();
    if (distance < .07 || distance > 2.8) continue;
    const dot = target.divideScalar(distance).dot(vec);
    if (dot > bestDot) {
      bestDot = dot;
      text = label.text;
    }
  }
  if (text !== currentLabel) {
    currentLabel = text;
    objectLabel.textContent = text;
    objectLabel.hidden = !text;
  }
}

function requestFrame() {
  if (!frame && ready) frame = requestAnimationFrame(render);
}

function render(now) {
  frame = 0;
  if (!ready) return;
  const dt = previous ? Math.min((now - previous) / 1000, .05) : 0;
  previous = now;
  if (active) walk(dt);
  setCamera();
  if (active) updateHUD();
  if (!reduceMotion) {
    const t = now * .001;
    flame.uniforms.seconds.value = t;
    fire.intensity = 5.65 + .26 * Math.sin(t * 7.1) + .16 * Math.cos(t * 12.7);
  }
  renderer.render(scene, camera);
  if (active) requestFrame();
}

function toggleWalking(walking) {
  active = walking;
  if (walking) entered = true;
  previous = 0;
  overlay.hidden = walking;
  hud.hidden = !walking;
  document.body.classList.toggle('walking', walking);
  enter.textContent = entered ? 'Resume walking' : 'Enter the room';
  resetButton.hidden = !entered;
  if (!walking) {
    pressed.clear();
    currentLabel = '';
    objectLabel.hidden = true;
    dragging = false;
    player.vx = player.vz = 0;
  }
  requestFrame();
}

function useDrag() {
  if (!requesting || !ready) return;
  requesting = false;
  fallback = true;
  error.textContent = 'Drag the scene with the mouse to look around.';
  error.hidden = false;
  keys.textContent = 'WASD · Walk   Drag · Look   R · Reset   Esc · Pause';
  toggleWalking(true);
}

enter.addEventListener('click', () => {
  if (!ready) return;
  if (fallback) {
    toggleWalking(true);
    return;
  }
  requesting = true;
  try {
    const lock = renderer.domElement.requestPointerLock;
    if (typeof lock !== 'function') {
      useDrag();
      return;
    }
    const result = lock.call(renderer.domElement);
    result?.catch(useDrag);
  } catch {
    useDrag();
  }
});
resetButton.addEventListener('click', reset);
document.addEventListener('pointerlockchange', () => {
  if (!ready) return;
  requesting = false;
  if (document.pointerLockElement === renderer.domElement) toggleWalking(true);
  else if (!fallback) toggleWalking(false);
});
document.addEventListener('pointerlockerror', useDrag);
document.addEventListener('keydown', event => {
  if (!ready || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.code === 'KeyR' && !event.repeat) {
    reset();
    return;
  }
  if (event.code === 'Escape' && fallback && active) {
    toggleWalking(false);
    enter.focus();
    return;
  }
  if (!active || !movement.has(event.code)) return;
  pressed.add(event.code);
  event.preventDefault();
});
document.addEventListener('keyup', event => pressed.delete(event.code));
document.addEventListener('mousemove', event => {
  if (active && (document.pointerLockElement === renderer.domElement || dragging)) {
    turn(event.movementX, event.movementY, dragging ? .004 : .0025);
  }
});
host.addEventListener('pointerdown', event => {
  if (fallback && active && event.button === 0) {
    dragging = true;
    renderer.domElement.setPointerCapture?.(event.pointerId);
  }
});
for (const type of ['pointerup','pointercancel','lostpointercapture']) host.addEventListener(type, () => { dragging = false; });
window.addEventListener('resize', resize);
window.addEventListener('blur', () => {
  pressed.clear();
  if (fallback && active) toggleWalking(false);
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    pressed.clear();
    previous = 0;
  } else requestFrame();
});

async function boot() {
  try {
    renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.16;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFShadowMap;
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
    host.append(renderer.domElement);
    renderer.domElement.addEventListener('webglcontextlost', () => {
      ready = false;
      toggleWalking(false);
      if (document.pointerLockElement) document.exitPointerLock();
      enter.textContent = 'Graphics context lost';
      enter.disabled = true;
      error.textContent = 'Reload the page to reopen the room.';
      error.hidden = false;
    });
    const builder = new Builder(scene);
    const palette = materials();
    buildRoom(scene,builder,palette);
    buildFurnishings(builder,palette);
    labels = builder.labels;
    builder.finish();
    lightRoom();
    addFlames();
    setCamera();
    resize();
    renderer.render(scene,camera);
    ready = true;
    enter.disabled = false;
    toggleWalking(false);
  } catch (problem) {
    console.error(problem);
    enter.textContent = 'Room unavailable';
    error.textContent = 'Open the scene over localhost in a desktop browser with WebGL 2 enabled.';
    error.hidden = false;
  }
}

requestAnimationFrame(boot);
