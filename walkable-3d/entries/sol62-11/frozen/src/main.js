import * as THREE from '../vendor/three.module.min.js';
import { Fabricator } from './build.js';
import { buildHall } from './hall.js';
import { materials, setLighting } from './materials.js';
import { buildExhibits } from './exhibits.js';
import { SPAWN, WalkController } from './navigation.js';

const viewport = document.getElementById('viewport');
const enter = document.getElementById('enter');
const reset = document.getElementById('reset');
const hint = document.getElementById('hint');
const prompt = document.getElementById('prompt');
const reticle = document.getElementById('reticle');
const error = document.getElementById('error');
const stationId = document.getElementById('station-id');
const stationName = document.getElementById('station-name');
const planPlayer = document.getElementById('plan-player');
const lookShortcut = document.getElementById('look-shortcut');

function reportError(message) {
  error.textContent = message;
  error.hidden = false;
}

function initialize() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = .92;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-label', 'First-person view of Parallax Field Lab');
  viewport.appendChild(canvas);

  const scene = new THREE.Scene();
  setLighting(scene);
  const b = new Fabricator(scene);
  const m = materials();
  buildHall(b, m);
  buildExhibits(b, m);
  b.finish();

  const camera = new THREE.PerspectiveCamera(57, 1, .045, 33);
  let pendingFrame = 0;
  let lastFrame = 0;
  let needsRender = true;
  let contextLost = false;
  let mode = '';
  let station = '';
  let entered = false;
  const player = new WalkController(canvas, refresh);

  function schedule() {
    if (!pendingFrame && !contextLost) pendingFrame = requestAnimationFrame(tick);
  }

  function refresh() {
    needsRender = true;
    schedule();
  }

  function resize() {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    const density = Math.min(window.devicePixelRatio || 1, 1.42, Math.sqrt(2500000 / (width * height)));
    renderer.setPixelRatio(density);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = width / height < 1.16 ? 65 : 57;
    camera.updateProjectionMatrix();
    refresh();
  }

  function updateInterface() {
    if (mode !== player.mode) {
      mode = player.mode;
      if (mode !== 'idle') entered = true;
      prompt.hidden = mode !== 'idle';
      reticle.hidden = mode === 'idle';
      lookShortcut.hidden = mode !== 'drag';
      if (mode === 'idle') {
        enter.textContent = entered ? 'Resume exploring' : 'Enter lab';
        hint.textContent = 'WASD to walk · Mouse to look · Esc to pause';
      }
    }
    const { x, z } = player.position;
    const area = x < -4.61 ? ['02', 'Perception Bench'] :
      x > 4.61 ? ['03', 'Motion Test Cell'] : z > 3.50 ? ['00', 'Entrance'] : ['01', 'Spectral Array'];
    if (station !== area[0]) {
      [stationId.textContent, stationName.textContent] = area;
      station = area[0];
    }
    const px = 65 + x * 6.68;
    const py = 8 + (z + 7.10) * (84 / 13.3);
    const heading = -player.yaw * 180 / Math.PI;
    planPlayer.setAttribute('transform', 'translate(' + px.toFixed(2) + ' ' + py.toFixed(2) + ') rotate(' + heading.toFixed(1) + ')');
  }

  function tick(time) {
    pendingFrame = 0;
    const dt = lastFrame ? Math.min((time - lastFrame) * .001, .048) : 1 / 60;
    lastFrame = time;
    const moved = player.update(dt);
    if (needsRender || moved) {
      needsRender = false;
      camera.position.set(player.position.x, SPAWN.y, player.position.z);
      camera.rotation.set(player.pitch, player.yaw, 0, 'YXZ');
      renderer.render(scene, camera);
      updateInterface();
    }
    if (player.mode !== 'idle') schedule();
    else lastFrame = 0;
  }

  enter.addEventListener('click', () => player.activate());
  reset.addEventListener('click', () => player.reset());
  window.addEventListener('resize', resize);
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    contextLost = true;
    if (pendingFrame) cancelAnimationFrame(pendingFrame);
    pendingFrame = 0;
    enter.disabled = true;
    player.pause();
    reportError('The graphics context was interrupted. Reload the page if the view does not recover.');
  });
  canvas.addEventListener('webglcontextrestored', () => {
    contextLost = false;
    error.hidden = true;
    enter.disabled = false;
    refresh();
  });

  resize();
  renderer.render(scene, cameraAtEntrance(camera));
  needsRender = false;
  updateInterface();
  enter.disabled = false;
}

function cameraAtEntrance(camera) {
  camera.position.set(SPAWN.x, SPAWN.y, SPAWN.z);
  camera.rotation.set(SPAWN.pitch, SPAWN.yaw, 0, 'YXZ');
  return camera;
}

requestAnimationFrame(() => {
  try {
    initialize();
  } catch (failure) {
    console.error(failure);
    enter.textContent = 'Lab unavailable';
    reportError('The scene could not start. A desktop browser with WebGL 2 and hardware acceleration is required.');
  }
});
