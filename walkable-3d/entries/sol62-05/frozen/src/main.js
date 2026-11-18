import * as THREE from '../vendor/three.module.js';
import { connectInput } from './input.js';
import { makeInterior } from './interior.js';
import { makeLandscape } from './landscape.js';
import { zoneAt } from './layout.js';
import { MeshBuilder } from './mesh.js';
import { makeShelter } from './shelter.js';
import { materials } from './textures.js';
import { Walker } from './walk.js';

const view = document.querySelector('#view');
const overlay = document.querySelector('#overlay');
const go = document.querySelector('#go');
const intro = document.querySelector('#intro');
const help = document.querySelector('.hud-help');
const locationLabel = document.querySelector('#location');

function start() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: false, stencil: false, powerPreference: 'high-performance',
  });
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  view.prepend(canvas);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#4d709b');
  scene.fog = new THREE.FogExp2('#819fbc', 0.0108);
  const camera = new THREE.PerspectiveCamera(58, 1, 0.052, 305);
  camera.rotation.order = 'YXZ';

  const fill = new THREE.HemisphereLight('#b0c9ee', '#7188a2', 1.14);
  scene.add(fill);

  const outside = new THREE.DirectionalLight('#a8c9ff', 1.77);
  outside.position.set(-12.5, 10, 8);
  outside.target.position.set(0.3, 0, -0.4);
  outside.castShadow = true;
  outside.shadow.mapSize.set(1536, 1536);
  const shadow = outside.shadow.camera;
  shadow.left = -11;
  shadow.right = 11;
  shadow.top = 11;
  shadow.bottom = -11;
  shadow.near = 0.9;
  shadow.far = 33;
  shadow.updateProjectionMatrix();
  outside.shadow.bias = -0.00025;
  outside.shadow.normalBias = 0.026;
  outside.shadow.radius = 2.2;
  scene.add(outside, outside.target);

  const bounce = new THREE.DirectionalLight('#668ebb', 0.32);
  bounce.position.set(7.6, 3.2, -13.0);
  scene.add(bounce);

  const m = materials();
  const mesh = new MeshBuilder();
  const atmosphere = makeLandscape(scene, mesh, m);
  makeShelter(scene, mesh, m);
  makeInterior(scene, mesh, m);
  mesh.finish(scene);

  const walker = new Walker();
  let raf = 0;
  let active = false;
  let previousTime = 0;

  const input = connectInput({ view, canvas, overlay, go, intro, help }, walker, {
    started() {
      active = true;
      previousTime = 0;
      invalidate();
    },
    stopped() {
      active = false;
      invalidate();
    },
    dirty: invalidate,
  });

  function invalidate() {
    if (!raf) raf = requestAnimationFrame(draw);
  }

  function resize() {
    const width = Math.max(1, view.clientWidth);
    const height = Math.max(1, view.clientHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35, Math.sqrt(2400000 / (width * height)));
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = camera.aspect >= 2.15 ? 55 : camera.aspect < 1 ? 66 : 58;
    camera.updateProjectionMatrix();
    invalidate();
  }

  function draw(time) {
    raf = 0;
    const dt = previousTime ? Math.min(0.05, (time - previousTime) / 1000) : 1 / 60;
    previousTime = time;
    if (active) input.step(dt);
    camera.position.set(walker.x, walker.y, walker.z);
    camera.rotation.set(walker.pitch, walker.yaw, 0);
    atmosphere.position.copy(camera.position);
    const zone = zoneAt(walker.x, walker.z);
    if (zone !== locationLabel.textContent) locationLabel.textContent = zone;
    renderer.render(scene, camera);
    if (active) invalidate();
  }

  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    active = false;
    input.suspend();
    cancelAnimationFrame(raf);
    raf = 0;
    go.disabled = true;
    go.textContent = 'Graphics interrupted';
    intro.textContent = 'Waiting for the graphics context to recover.';
  });
  canvas.addEventListener('webglcontextrestored', () => {
    go.disabled = false;
    go.textContent = 'Resume exploring';
    intro.textContent = 'The graphics context has recovered.';
    renderer.shadowMap.needsUpdate = true;
    invalidate();
  });
  window.addEventListener('resize', resize);
  resize();
}

requestAnimationFrame(() => setTimeout(() => {
  try {
    start();
  } catch (error) {
    console.error(error);
    go.textContent = 'Scene unavailable';
    intro.textContent = 'The scene needs WebGL 2. Check that graphics acceleration is available, then reload.';
  }
}, 0));
