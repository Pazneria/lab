import * as T from 'three';
import { Model, palette, softContact } from './model.js';
import { FLOOR, Footprint, HOME_LIMIT, SPAWN } from './layout.js';
import { camp } from './camp.js';
import { wagon } from './wagon.js';
import { interior } from './interior.js';
import { shopfront } from './shopfront.js';

function atmosphere(scene) {
  const sunPosition = new T.Vector3(-8.6, 6.1, 9.8);
  const sunDirection = sunPosition.clone().normalize();
  const sky = new T.Mesh(
    new T.SphereGeometry(86, 40, 20),
    new T.ShaderMaterial({
      side: T.BackSide,
      depthWrite: false,
      toneMapped: false,
      uniforms: {
        horizon: {value: new T.Color('#e6cfab')},
        upper: {value: new T.Color('#91a9b2')},
        winterSun: {value: new T.Color('#fff1cc')},
        sunDirection: {value: sunDirection},
      },
      vertexShader: `
        varying vec3 vDirection;
        void main(){
          vDirection = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
        }
      `,
      fragmentShader: `
        uniform vec3 horizon;
        uniform vec3 upper;
        uniform vec3 winterSun;
        uniform vec3 sunDirection;
        varying vec3 vDirection;
        void main(){
          vec3 d = normalize(vDirection);
          float height = smoothstep(-.09, .68, d.y);
          float haze = pow(max(0., dot(d, sunDirection)), 8.);
          float sunDisc = smoothstep(.99982, .99994, dot(d, sunDirection));
          float trail = sin(d.x * 24. + d.z * 17. + sin(d.x * 17.) * .42 + d.y * 67.);
          float film = smoothstep(.37, .78, trail) * smoothstep(.12, .32, d.y)
            * (1. - smoothstep(.35, .65, d.y)) * .055;
          vec3 color = mix(mix(horizon, upper, height), winterSun, haze * .26 + film);
          color = mix(color, winterSun, sunDisc);
          gl_FragColor = vec4(color, 1.);
          #include <colorspace_fragment>
        }
      `,
    }),
  );
  sky.frustumCulled = false;
  sky.renderOrder = -10;
  scene.add(sky);
  scene.fog = new T.FogExp2('#dbc7a7', .030);

  scene.add(new T.HemisphereLight('#e9edf7', '#8b705b', 1.76));
  scene.add(new T.AmbientLight('#ffe6d1', .18));
  const sun = new T.DirectionalLight('#ffd1a0', 2.84);
  sun.position.copy(sunPosition);
  sun.target.position.set(0, 0, .2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, {left: -9.5, right: 9.5, top: 8.5, bottom: -8.5, near: .4, far: 29});
  sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.bias = -.00024;
  sun.shadow.normalBias = .021;
  sun.shadow.radius = 2;
  scene.add(sun, sun.target);
}

function world(scene) {
  const collision = new Footprint();
  const p = palette();
  const contact = softContact();
  const model = new Model(scene);
  camp(model, p, collision, contact);
  wagon(model, p, collision, contact);
  interior(model, p, collision, contact);
  shopfront(model, p, collision, contact);
  model.finish();
  return collision;
}

function explorer(camera, renderer, scene, view, collision) {
  const button = document.getElementById('enter');
  const place = document.getElementById('location');
  const lookLabel = document.getElementById('look-mode');
  const canvas = renderer.domElement;
  const held = new Set();
  const direction = new T.Vector2();
  const pos = {x: 0, y: 0, z: 0};
  const speed = new T.Vector2();
  const movementKeys = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']);
  let yaw, pitch, rise;
  let mode = 'idle';
  let dragPointer = null;
  let locationName = '';
  let dirty = true;
  let last = performance.now();
  let nextFrame = 0;
  let previousDrag = [0, 0];

  function queueFrame() {
    if (!nextFrame && !document.hidden) nextFrame = requestAnimationFrame(frame);
  }

  function invalidate() {
    dirty = true;
    queueFrame();
  }

  function reset() {
    Object.assign(pos, {x: SPAWN.x, z: SPAWN.z, y: 0});
    yaw = SPAWN.yaw;
    pitch = SPAWN.pitch;
    rise = 0;
    speed.set(0, 0);
    invalidate();
  }

  function resize() {
    const width = Math.max(1, view.clientWidth);
    const height = Math.max(1, view.clientHeight);
    camera.aspect = width / height;
    camera.fov = camera.aspect < 1 ? 72 : 62;
    camera.updateProjectionMatrix();
    const renderRatio = Math.min(window.devicePixelRatio || 1, 1.35, Math.sqrt(2500000 / (width * height)));
    renderer.setPixelRatio(renderRatio);
    renderer.setSize(width, height, false);
    invalidate();
  }

  function setMode(next) {
    if (mode === next) return;
    mode = next;
    held.clear();
    speed.set(0, 0);
    document.body.classList.toggle('exploring', mode !== 'idle');
    lookLabel.textContent = mode === 'drag' ? 'Drag to look' : 'Mouse look';
    if (mode !== 'idle') view.focus({preventScroll: true});
    if (mode === 'idle') dragPointer = null;
    last = performance.now();
    invalidate();
  }

  function enter() {
    if (!canvas.requestPointerLock) {
      setMode('drag');
      return;
    }
    try {
      const lock = canvas.requestPointerLock();
      if (lock && typeof lock.catch === 'function') lock.catch(() => setMode('drag'));
    } catch {
      setMode('drag');
    }
  }

  function look(dx, dy) {
    yaw -= T.MathUtils.clamp(dx, -260, 260) * .00217;
    pitch = T.MathUtils.clamp(pitch - T.MathUtils.clamp(dy, -260, 260) * .00217, -1.47, 1.47);
    invalidate();
  }

  function labelLocation() {
    let next = 'Roadside camp';
    if (pos.y >= FLOOR - .015 && pos.x > -3.16) {
      next = pos.x < HOME_LIMIT ? 'Living quarters' : 'Workbench & storage';
    } else if (pos.y > 0) next = 'Rear steps';
    else if (pos.x > .04 && pos.x < 3.20 && pos.z > 2.49 && pos.z < 4.21) next = 'Open shopfront';
    if (next !== locationName) {
      locationName = next;
      place.textContent = next;
    }
  }

  function frame(now) {
    nextFrame = 0;
    const dt = Math.min(.048, Math.max(0, (now - last) / 1000));
    last = now;
    if (mode !== 'idle') {
      const forward = Number(held.has('KeyW') || held.has('ArrowUp')) - Number(held.has('KeyS') || held.has('ArrowDown'));
      const right = Number(held.has('KeyD') || held.has('ArrowRight')) - Number(held.has('KeyA') || held.has('ArrowLeft'));
      direction.set(right, forward);
      if (direction.lengthSq() > 1) direction.normalize();
      const pace = pos.y > .01 ? 1.76 : 2.48;
      const c = Math.cos(yaw), s = Math.sin(yaw);
      speed.x = T.MathUtils.damp(speed.x, pace * (c * direction.x - s * direction.y), 13, dt);
      speed.y = T.MathUtils.damp(speed.y, pace * (-s * direction.x - c * direction.y), 13, dt);
      if (speed.lengthSq() > .00005) {
        collision.advance(pos, speed.x * dt, speed.y * dt);
        dirty = true;
      }
    }
    if (Math.abs(rise - pos.y) > .0005) {
      rise = T.MathUtils.damp(rise, pos.y, 28, dt);
      dirty = true;
    }
    if (dirty || mode !== 'idle') {
      camera.position.set(pos.x, rise + 1.637, pos.z);
      camera.rotation.set(pitch, yaw, 0, 'YXZ');
      labelLocation();
      renderer.render(scene, camera);
      dirty = false;
    }
    if (mode !== 'idle' || Math.abs(rise - pos.y) > .0005) queueFrame();
  }

  button.addEventListener('click', enter);
  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === canvas) setMode('lock');
    else if (mode === 'lock') setMode('idle');
  });
  document.addEventListener('pointerlockerror', () => setMode('drag'));
  document.addEventListener('mousemove', e => {
    if (mode === 'lock') look(e.movementX, e.movementY);
  });
  canvas.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    if (mode === 'idle') {
      if (e.pointerType === 'touch') setMode('drag');
      else { enter(); return; }
    }
    if (mode === 'drag' && dragPointer === null) {
      previousDrag = [e.clientX, e.clientY];
      dragPointer = e.pointerId;
      canvas.setPointerCapture(e.pointerId);
    }
  });
  canvas.addEventListener('pointermove', e => {
    if (mode === 'drag' && dragPointer === e.pointerId) {
      look(e.clientX - previousDrag[0], e.clientY - previousDrag[1]);
      previousDrag = [e.clientX, e.clientY];
    }
  });
  canvas.addEventListener('lostpointercapture', () => { dragPointer = null; });
  window.addEventListener('keydown', e => {
    if (e.code === 'Escape' && mode === 'drag') setMode('idle');
    if (e.code === 'KeyR' && !e.repeat && !e.altKey && !e.ctrlKey && !e.metaKey) reset();
    if (mode !== 'idle' && movementKeys.has(e.code)) {
      e.preventDefault();
      held.add(e.code);
    }
  });
  window.addEventListener('keyup', e => held.delete(e.code));
  window.addEventListener('blur', () => {
    held.clear();
    speed.set(0, 0);
    dragPointer = null;
  });
  document.addEventListener('visibilitychange', () => {
    last = performance.now();
    held.clear();
    speed.set(0, 0);
    if (document.hidden && nextFrame) {
      cancelAnimationFrame(nextFrame);
      nextFrame = 0;
    } else invalidate();
  });
  window.addEventListener('resize', resize);
  renderer.domElement.addEventListener('webglcontextlost', e => {
    e.preventDefault();
    document.getElementById('error').textContent = 'The 3D context was interrupted. Reload this page to restart the scene.';
    document.getElementById('error').hidden = false;
  }, {once: true});
  reset();
  resize();
  button.textContent = 'Explore the wagon';
  button.disabled = false;
}

function start() {
  const view = document.getElementById('view');
  const camera = new T.PerspectiveCamera(62, 1, .040, 128);
  const scene = new T.Scene();
  const renderer = new T.WebGLRenderer({antialias: true, powerPreference: 'high-performance'});
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  view.appendChild(renderer.domElement);
  atmosphere(scene);
  const collision = world(scene);
  renderer.shadowMap.needsUpdate = true;
  explorer(camera, renderer, scene, view, collision);
}

try {
  start();
} catch (failure) {
  console.error(failure);
  const error = document.getElementById('error');
  error.hidden = false;
  error.textContent = 'The 3D scene could not start. Use a browser with WebGL 2 and hardware acceleration.';
}
