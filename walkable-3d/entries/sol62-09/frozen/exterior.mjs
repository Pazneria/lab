import * as THREE from './vendor/three.module.min.js';
import { canvas2d, colorTexture, randomSequence } from './materials.mjs';

function stars(scene) {
  const w = 1536, h = 768;
  const [canvas, c] = canvas2d(w, h);
  const sky = c.createLinearGradient(0, 0, w * 0.64, h);
  sky.addColorStop(0, '#03070d');
  sky.addColorStop(0.48, '#070e18');
  sky.addColorStop(1, '#070b11');
  c.fillStyle = sky;
  c.fillRect(0, 0, w, h);
  const rng = randomSequence(687145);
  for (let i = 0; i < 1880; i++) {
    const x = rng() * w, y = rng() * h;
    const mag = rng() ** 4;
    const size = 0.65 + mag * 1.70;
    c.fillStyle = (i % 9 === 0 ? 'rgba(238,219,187,' : 'rgba(199,219,244,') + (0.12 + mag * 0.81) + ')';
    c.fillRect(x, y, size, size);
    if (mag > 0.95) {
      c.fillStyle = 'rgba(178,210,254,.19)';
      c.fillRect(x - 1.5, y + 0.55, size + 3.00, 0.70);
      c.fillRect(x + 0.70, y - 1.35, 0.64, size + 2.7);
    }
  }
  const background = new THREE.Mesh(new THREE.PlaneGeometry(337, 169),
    new THREE.MeshBasicMaterial({ map: colorTexture(canvas, false), toneMapped: false }));
  background.name = 'Star field beyond the station';
  background.position.set(0, 22, -246);
  scene.add(background);
}

function cloudAtlas() {
  const w = 768, h = 384;
  const [canvas, c] = canvas2d(w, h);
  const rng = randomSequence(11731);
  const lattice = new Float32Array(128 * 128).map(() => rng());
  const lerp = (a, b, t) => a + (b - a) * t;
  const s = (v) => v * v * (3 - 2 * v);
  function noise(x, y, period) {
    const ix = Math.floor(x), iy = Math.floor(y);
    const q = ix % period, r = (ix + 1) % period;
    const a = (iy & 127) * 128, b = ((iy + 1) & 127) * 128;
    const u = s(x - ix), v = s(y - iy);
    return lerp(lerp(lattice[a + q], lattice[a + r], u), lerp(lattice[b + q], lattice[b + r], u), v);
  }
  const image = c.createImageData(w, h);
  for (let row = 0; row < h; row++) {
    const v = row / (h - 1);
    for (let col = 0; col < w; col++) {
      const u = col / w, i = 4 * (row * w + col);
      const wind = (noise(u * 9, v * 22 + 19, 9) - 0.5) * 0.046 +
        (noise(u * 19, v * 39 + 37, 19) - 0.5) * 0.014 + Math.cos(u * 6.283) * 0.009;
      const stripe = v + wind;
      const large = Math.sin(stripe * 65.4 + Math.sin(stripe * 26.4) * 0.77);
      const jet = Math.sin(stripe * 222.4 + Math.cos(stripe * 70.1) * 1.91) * 0.10;
      const layers = noise(u * 16, stripe * 49 + 9, 16) * 0.21 + noise(u * 45, stripe * 92 + 7, 45) * 0.11;
      const veil = Math.min(1, Math.max(0, 0.36 + large * 0.245 + layers + jet));
      const pearl = Math.max(0, Math.sin(stripe * 39.1 + 2.54) - 0.57) * 29;
      image.data[i] = 57 + veil * 112 + pearl;
      image.data[i + 1] = 100 + veil * 100 + pearl * 0.47;
      image.data[i + 2] = 132 + veil * 88;
      image.data[i + 3] = 255;
    }
  }
  c.putImageData(image, 0, 0);
  const map = colorTexture(canvas, false);
  map.wrapS = THREE.RepeatWrapping;
  return map;
}

const planetVertex = `
  varying vec2 vTex;
  varying vec3 vSurface;
  varying vec3 vWorld;
  void main() {
    vTex = uv;
    vSurface = mat3(modelMatrix) * normal;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;
const sunVector = 'normalize(vec3(-0.68, 0.54, 0.59))';
const planetFragment = `
  uniform sampler2D clouds;
  varying vec2 vTex;
  varying vec3 vSurface;
  varying vec3 vWorld;
  void main() {
    vec3 n = normalize(vSurface);
    vec3 direction = ${sunVector};
    vec3 eye = normalize(cameraPosition - vWorld);
    float lit = smoothstep(-0.28, 0.91, dot(direction, n));
    float rim = pow(1.0 - max(dot(n, eye), 0.0), 3.0);
    vec3 gas = texture2D(clouds, vTex).rgb;
    vec3 sceneColor = gas * (0.079 + lit * 0.91);
    sceneColor += rim * (lit * 0.65 + 0.04) * vec3(0.12, 0.29, 0.40);
    gl_FragColor = vec4(sceneColor, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;
const hazeFragment = `
  varying vec3 vSurface;
  varying vec3 vWorld;
  void main() {
    vec3 n = normalize(vSurface);
    vec3 eye = normalize(cameraPosition - vWorld);
    float rim = pow(1.0 - max(dot(n, eye), 0.0), 5.8);
    float day = smoothstep(-0.43, 0.52, dot(n, ${sunVector}));
    gl_FragColor = vec4(0.30, 0.58, 0.76, rim * (day * 0.68 + 0.075));
    #include <colorspace_fragment>
  }
`;

function gasGiant(scene) {
  const shape = new THREE.SphereGeometry(1, 60, 40);
  const planet = new THREE.Mesh(shape, new THREE.ShaderMaterial({
    uniforms: { clouds: { value: cloudAtlas() } }, vertexShader: planetVertex, fragmentShader: planetFragment,
  }));
  planet.name = 'Cloud bands of the planet';
  planet.position.set(17, -28.5, -97);
  planet.rotation.set(0.48, -0.11, -0.29);
  planet.scale.setScalar(46.7);
  scene.add(planet);
  const haze = new THREE.Mesh(shape, new THREE.ShaderMaterial({
    vertexShader: planetVertex, fragmentShader: hazeFragment, transparent: true, depthWrite: false, toneMapped: false,
  }));
  haze.name = 'Planetary atmosphere';
  haze.position.copy(planet.position);
  haze.rotation.copy(planet.rotation);
  haze.scale.setScalar(47.05);
  haze.renderOrder = -1;
  scene.add(haze);
}

export function makeExterior(scene) {
  stars(scene);
  gasGiant(scene);
}
