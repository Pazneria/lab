import * as THREE from './vendor/three.module.min.js';
import { makeChamber, makePassage } from './architecture.js';
import { makeDetails } from './details.js';
import { Build } from './geometry.js';
import { makeInstrument } from './instrument.js';
import { makeLandscape, makeSky } from './landscape.js';
import { sunDirection } from './layout.js';
import { createMaterials, illustrations } from './materials.js';
import { createWalker } from './movement.js';
import { makeDome } from './roof.js';
import { makeTerrace } from './terrace.js';

const ui = {
  world: document.getElementById('world'),
  intro: document.getElementById('intro'),
  enter: document.getElementById('enter'),
  headline: document.getElementById('headline'),
  description: document.getElementById('intro-description'),
  hint: document.getElementById('hint'),
  reset: document.getElementById('reset'),
  controls: document.getElementById('controls'),
  reticle: document.getElementById('reticle'),
  lookLabel: document.getElementById('look-label'),
  location: document.getElementById('location'),
};

function lighting(scene) {
  const skyLight = new THREE.HemisphereLight(0xc4d9da, 0xac886a, 1.47);
  scene.add(skyLight);
  const sun = new THREE.DirectionalLight(0xffdfb1, 3.08);
  sun.name = 'Low western sun';
  sun.target.position.set(1.2, 0.8, 4.0);
  sun.position.copy(sun.target.position).addScaledVector(
    new THREE.Vector3(sunDirection.x, sunDirection.y, sunDirection.z), 39,
  );
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -17;
  sun.shadow.camera.right = 17;
  sun.shadow.camera.top = 16;
  sun.shadow.camera.bottom = -16;
  sun.shadow.camera.near = 15;
  sun.shadow.camera.far = 67;
  sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.bias = -0.00017;
  sun.shadow.normalBias = 0.023;
  sun.shadow.radius = 1.1;
  sun.shadow.autoUpdate = false;
  sun.shadow.needsUpdate = true;
  scene.add(sun, sun.target);
  const valley = new THREE.DirectionalLight(0xc9e0dd, 0.34);
  valley.position.set(19, 7, -9);
  scene.add(valley);
  return sun;
}

function showFailure(error) {
  ui.intro.hidden = false;
  ui.enter.disabled = true;
  ui.enter.textContent = 'Scene unavailable';
  ui.description.textContent = 'Meridian House needs a browser with WebGL 2 and hardware acceleration.';
  ui.hint.textContent = 'Reload after enabling WebGL 2.';
  console.error(error);
}

function start() {
  try {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.03;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0xd9bf98);
    const canvas = renderer.domElement;
    canvas.tabIndex = 0;
    canvas.setAttribute('aria-label', 'First-person view of Meridian House');
    ui.world.append(canvas);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xe3c1a4, 26, 164);
    scene.add(makeSky());
    const sun = lighting(scene);
    const camera = new THREE.PerspectiveCamera(62, 1, 0.048, 245);
    const materials = createMaterials(renderer.extensions.has('EXT_color_buffer_float'));
    const art = illustrations();
    const build = new Build();
    makeLandscape(build, materials);
    makeChamber(build, materials, art);
    makePassage(build, materials, art);
    makeDome(build, materials);
    makeTerrace(build, materials);
    makeInstrument(build, materials, art);
    makeDetails(build, materials, art);
    build.finish(scene);

    let refresh = true;
    let suspended = false;
    const resize = () => {
      const width = Math.max(1, ui.world.clientWidth);
      const height = Math.max(1, ui.world.clientHeight);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.35, Math.sqrt(2900000 / (width * height)));
      renderer.setPixelRatio(ratio);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      refresh = true;
    };
    window.addEventListener('resize', resize);
    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault();
      suspended = true;
    });
    canvas.addEventListener('webglcontextrestored', () => {
      suspended = false;
      sun.shadow.needsUpdate = true;
      refresh = true;
    });
    resize();
    const walker = createWalker(camera, canvas, ui);
    walker.update(0);
    renderer.render(scene, camera);
    ui.enter.disabled = false;
    ui.enter.textContent = 'Enter observatory';

    let last = 0;
    function frame(now) {
      const delta = last ? Math.min(0.055, Math.max(0, (now - last) * 0.001)) : 0;
      last = now;
      const changed = walker.update(delta);
      if (!suspended && (refresh || changed)) {
        renderer.render(scene, camera);
        refresh = false;
      }
      window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  } catch (error) {
    showFailure(error);
  }
}

window.requestAnimationFrame(start);
