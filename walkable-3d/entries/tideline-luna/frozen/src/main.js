import * as THREE from '../vendor/three.module.js';
import { PointerLockControls } from '../vendor/examples/jsm/controls/PointerLockControls.js';
import './style.css';

const root = document.getElementById('scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb2c3c1);
scene.fog = new THREE.FogExp2(0xb2c3c1, 0.0042);
const camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.08, 260);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
root.appendChild(renderer.domElement);

const controls = new PointerLockControls(camera, renderer.domElement);
const player = controls.getObject();
scene.add(player);
const sun = new THREE.DirectionalLight(0xffd6a5, 2.1);
sun.position.set(-13, 20, 7);
sun.castShadow = true;
sun.shadow.mapSize.set(1536, 1536);
sun.shadow.camera.left = -30; sun.shadow.camera.right = 30;
sun.shadow.camera.top = 34; sun.shadow.camera.bottom = -26;
sun.shadow.camera.near = 0.5; sun.shadow.camera.far = 80;
sun.shadow.bias = -0.0007;
sun.shadow.normalBias = 0.025;
sun.shadow.radius = 4;
scene.add(sun);
scene.add(new THREE.HemisphereLight(0xd5e7e3, 0x786a56, 0.74));
scene.add(new THREE.AmbientLight(0xc5d1c8, 0.32));

let seed = 918273;
function rand() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
function coastZ(x) {
  return 5.35 + 0.028 * x + 4.9 * Math.exp(-Math.pow((x - 12) / 4.7, 2)) + 7.8 * Math.exp(-Math.pow((x + 6.7) / 5.8, 2)) + 1.3 * Math.exp(-Math.pow((x + 18) / 5.4, 2));
}
function groundY(x, z) {
  const inland = clamp((coastZ(x) - z) / 5.5, 0, 1);
  const undulation = Math.sin(x * 0.31 + z * 0.17) * 0.035 + Math.sin(x * 0.79 - z * 0.44) * 0.012;
  return 0.105 + 0.205 * inland + undulation * (0.35 + 0.65 * inland);
}
function surfaceY(x, z) {
  if (Math.abs(x) < 5.5 && z > -4.15 && z < 3.25) return 0.44;
  if (z >= 3.25 && z <= 17.05 && Math.abs(x) <= 1.9) return 0.43;
  const ramp = rampInfo(x, z);
  if (ramp) return 0.43 - 0.27 * ramp.t;
  return groundY(x, z);
}
function rampInfo(x, z) {
  const ax = 2, az = 13.25, bx = 13, bz = 10.2;
  const dx = bx - ax, dz = bz - az;
  const t = ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz);
  if (t < -0.04 || t > 1.02) return null;
  const px = ax + t * dx, pz = az + t * dz;
  return Math.hypot(x - px, z - pz) < 1.55 ? { t: clamp(t, 0, 1) } : null;
}

function canvasTexture(kind, base, size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = base; ctx.fillRect(0, 0, size, size);
  if (kind === 'wood') {
    for (let i = 0; i < 340; i++) {
      const y = rand() * size, light = rand() > 0.52;
      ctx.strokeStyle = light ? 'rgba(229,222,197,' + (0.025 + rand() * 0.1) + ')' : 'rgba(38,45,41,' + (0.025 + rand() * 0.1) + ')';
      ctx.lineWidth = 0.4 + rand() * 2.2;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.bezierCurveTo(size * 0.28, y + rand() * 8 - 4, size * 0.72, y + rand() * 7 - 3.5, size, y + rand() * 4 - 2); ctx.stroke();
    }
    for (let i = 0; i < 7; i++) {
      const x = rand() * size, y = rand() * size, r = 7 + rand() * 20;
      ctx.strokeStyle = 'rgba(55,48,37,0.14)'; ctx.lineWidth = 1;
      for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(x, y, r * (0.55 + k * 0.24), r * (0.23 + k * 0.09), 0.1, 0, Math.PI * 2); ctx.stroke(); }
    }
    for (let i = 0; i < 120; i++) { ctx.fillStyle = 'rgba(44,50,43,' + (0.07 + rand() * 0.1) + ')'; ctx.fillRect(rand() * size, rand() * size, 1 + rand() * 2, 1 + rand() * 8); }
  } else if (kind === 'ground') {
    const img = ctx.getImageData(0, 0, size, size), d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (rand() - 0.5) * 25;
      d[i] = clamp(d[i] + n, 0, 255); d[i + 1] = clamp(d[i + 1] + n, 0, 255); d[i + 2] = clamp(d[i + 2] + n, 0, 255);
    }
    ctx.putImageData(img, 0, 0);
    for (let i = 0; i < 1900; i++) {
      const r = 0.3 + rand() * 2.1;
      ctx.fillStyle = rand() > 0.53 ? 'rgba(57,65,57,0.26)' : 'rgba(231,215,180,0.28)';
      ctx.beginPath(); ctx.ellipse(rand() * size, rand() * size, r, r * (0.5 + rand()), rand() * 3, 0, Math.PI * 2); ctx.fill();
    }
  } else if (kind === 'paint') {
    for (let i = 0; i < 110; i++) { ctx.fillStyle = 'rgba(33,44,43,' + (0.04 + rand() * 0.16) + ')'; ctx.fillRect(rand() * size, rand() * size, 1 + rand() * 4, 2 + rand() * 34); }
    for (let i = 0; i < 180; i++) { ctx.fillStyle = 'rgba(230,220,194,' + (0.07 + rand() * 0.18) + ')'; ctx.fillRect(rand() * size, rand() * size, 1 + rand() * 2, 1 + rand() * 8); }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
  return tex;
}

const woodTex = canvasTexture('wood', '#827e6c');
const deckTex = canvasTexture('wood', '#767669');
const paintTex = canvasTexture('paint', '#667a70');
const groundTex = canvasTexture('ground', '#aaa18a', 384);
const makeMat = (name, color, roughness = 0.82, map = null, extra = {}) => new THREE.MeshStandardMaterial({ name, color, roughness, map, ...extra });
const M = {
  cedar: makeMat('salt-worn cedar', 0xffffff, 0.91, woodTex),
  faded: makeMat('sun-grey timber', 0xffffff, 0.94, deckTex),
  darkWood: makeMat('tarred timber', 0x6b6758, 0.95, woodTex),
  interior: makeMat('workshop boards', 0xffffff, 0.88, woodTex),
  painted: makeMat('aged sage paint', 0xffffff, 0.86, paintTex),
  bluePaint: makeMat('weathered blue paint', 0xffffff, 0.86, canvasTexture('paint', '#617a7b')),
  creamPaint: makeMat('chalk paint', 0xffffff, 0.91, canvasTexture('paint', '#c1bca4')),
  roof: makeMat('weathered standing seam', 0x555e59, 0.9, deckTex),
  iron: makeMat('blackened iron', 0x39413d, 0.55, null, { metalness: 0.45 }),
  brass: makeMat('old brass', 0x9c8051, 0.48, null, { metalness: 0.52 }),
  rope: makeMat('hemp rope', 0xb49a70, 0.96),
  darkRope: makeMat('wet hemp rope', 0x736c54, 0.98),
  stone: makeMat('damp stone', 0x777a70, 0.97),
  stoneLight: makeMat('salt limestone', 0xa9a38d, 0.92),
  sand: makeMat('mud and shingle', 0xffffff, 1.0, groundTex, { vertexColors: true }),
  charcoal: makeMat('deep shadow', 0x293532, 0.98),
  glass: new THREE.MeshStandardMaterial({ color: 0x99b9b3, roughness: 0.33, metalness: 0.05, transparent: true, opacity: 0.56, depthWrite: false, side: THREE.DoubleSide }),
  paintedHull: makeMat('boat hull paint', 0xffffff, 0.55, canvasTexture('paint', '#3c655d')),
  redHull: makeMat('antifouling red paint', 0xffffff, 0.68, canvasTexture('paint', '#814d3e')),
  buoy: makeMat('faded buoy paint', 0xd18a4e, 0.68),
  reed: makeMat('salt-marsh grass', 0x687355, 0.95),
  moss: makeMat('dark algae', 0x53634d, 0.98),
};

const unitBox = new THREE.BoxGeometry(1, 1, 1);
const boxBatches = new Map();
function addBox(w, h, d, x, y, z, material, color = 0xffffff, rx = 0, ry = 0, rz = 0) {
  let batch = boxBatches.get(material.uuid);
  if (!batch) { batch = { material, transforms: [], colors: [] }; boxBatches.set(material.uuid, batch); }
  const o = new THREE.Object3D();
  o.position.set(x, y, z); o.rotation.set(rx, ry, rz); o.scale.set(w, h, d); o.updateMatrix();
  batch.transforms.push(o.matrix.clone()); batch.colors.push(new THREE.Color(color));
}
function flushBoxes() {
  for (const b of boxBatches.values()) {
    const mesh = new THREE.InstancedMesh(unitBox, b.material, b.transforms.length);
    mesh.name = b.material.name + ' | repeated timber';
    for (let i = 0; i < b.transforms.length; i++) { mesh.setMatrixAt(i, b.transforms[i]); mesh.setColorAt(i, b.colors[i]); }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.castShadow = true; mesh.receiveShadow = true;
    scene.add(mesh);
  }
  boxBatches.clear();
}
function meshBox(w, h, d, x, y, z, material, cast = true, receive = true) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z); m.castShadow = cast; m.receiveShadow = receive; scene.add(m); return m;
}
function cylinder(radiusTop, radiusBottom, height, x, y, z, material, sides = 10, rotX = 0, rotY = 0, rotZ = 0) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, sides, 1), material);
  m.position.set(x, y, z); m.rotation.set(rotX, rotY, rotZ); m.castShadow = true; m.receiveShadow = true; scene.add(m); return m;
}
function beam(a, b, radius, material, sides = 8) {
  const start = new THREE.Vector3(a[0], a[1], a[2]), end = new THREE.Vector3(b[0], b[1], b[2]);
  const delta = end.clone().sub(start), len = delta.length();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.94, radius, len, sides, 1), material);
  m.position.copy(start.add(end).multiplyScalar(0.5)); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
  m.castShadow = true; m.receiveShadow = true; scene.add(m); return m;
}
function tube(points, radius, material, segments = 64, sides = 6) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p[0], p[1], p[2])));
  const m = new THREE.Mesh(new THREE.TubeGeometry(curve, segments, radius, sides, false), material);
  m.castShadow = true; m.receiveShadow = true; scene.add(m); return m;
}
function coil(x, y, z, radius = 0.24, material = M.rope, turns = 3.2, ry = 0) {
  const pts = [];
  for (let i = 0; i <= 144; i++) {
    const t = i / 144, angle = t * Math.PI * 2 * turns + 0.5;
    const r = radius * (0.12 + 0.88 * t);
    const lx = Math.cos(angle) * r, lz = Math.sin(angle) * r;
    pts.push([x + lx * Math.cos(ry) - lz * Math.sin(ry), y + 0.018 * Math.sin(angle * 0.5), z + lx * Math.sin(ry) + lz * Math.cos(ry)]);
  }
  tube(pts, 0.027, material, 180, 5);
  const tail = pts.slice(-12).reverse();
  tube(tail, 0.026, material, 18, 5);
}

function terrainColor(x, z) {
  const edge = coastZ(x) - z;
  const c = new THREE.Color();
  if (edge < 0.55) c.setRGB(0.30, 0.33, 0.29);
  else if (edge < 1.7) c.setRGB(0.52, 0.49, 0.40);
  else if (z < -7 && Math.sin(x * 0.45 + z * 0.17) > 0.45) c.setRGB(0.38, 0.42, 0.32);
  else c.setRGB(0.70, 0.67, 0.56);
  const n = 0.94 + 0.1 * Math.sin(x * 4.8 + z * 2.6) * Math.sin(z * 6.4 - x * 1.9);
  c.multiplyScalar(n);
  return c;
}
function terrainNormal(x, z) {
  const e = 0.04;
  const dx = (groundY(x + e, z) - groundY(x - e, z)) / (2 * e);
  const dz = (groundY(x, z + e) - groundY(x, z - e)) / (2 * e);
  return new THREE.Vector3(-dx, 1, -dz).normalize();
}
function clipLand(poly) {
  const out = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const fa = coastZ(a[0]) - a[1], fb = coastZ(b[0]) - b[1];
    const ia = fa >= 0, ib = fb >= 0;
    if (ia) out.push(a);
    if (ia !== ib) { const t = fa / (fa - fb); out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); }
  }
  return out;
}
function createTerrain() {
  const positions = [], normals = [], colors = [], uvs = [];
  const step = 0.6, x0 = -30, z0 = -27, nx = 100, nz = 119;
  function addTri(a, b, c) {
    for (const p of [a, b, c]) {
      positions.push(p[0], groundY(p[0], p[1]), p[1]);
      const n = terrainNormal(p[0], p[1]); normals.push(n.x, n.y, n.z);
      const col = terrainColor(p[0], p[1]); colors.push(col.r, col.g, col.b);
      uvs.push(p[0] * 0.22, p[1] * 0.22);
    }
  }
  for (let ix = 0; ix < nx; ix++) for (let iz = 0; iz < nz; iz++) {
    const x = x0 + ix * step, z = z0 + iz * step;
    const p00 = [x, z], p10 = [x + step, z], p11 = [x + step, z + step], p01 = [x, z + step];
    for (const tri of [[p00, p11, p10], [p00, p01, p11]]) {
      const poly = clipLand(tri);
      for (let i = 1; i + 1 < poly.length; i++) addTri(poly[0], poly[i], poly[i + 1]);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.computeBoundingSphere();
  const land = new THREE.Mesh(geo, M.sand); land.name = 'tide-shaped shore terrain'; land.receiveShadow = true; scene.add(land);
}
createTerrain();

const waterVertex = [
  'precision highp float;', 'uniform float uTime;', 'varying vec3 vWorld;', '#include <fog_pars_vertex>',
  'void main(){',
  '  vec3 w=(modelMatrix*vec4(position,1.0)).xyz;',
  '  w.y += sin(w.x*0.29+uTime*0.42)*0.022 + cos(w.z*0.31-uTime*0.35)*0.018;',
  '  vWorld=w;', '  vec4 mvPosition=viewMatrix*vec4(w,1.0);', '  gl_Position=projectionMatrix*mvPosition;', '#include <fog_vertex>', '}'
].join('\n');
const waterFragment = [
  'precision highp float;', '#include <tonemapping_pars_fragment>', '#include <colorspace_pars_fragment>', '#include <fog_pars_fragment>', 'uniform float uTime;', 'uniform vec3 uCamera;', 'varying vec3 vWorld;',
  'void main(){',
  '  float x=vWorld.x; float z=vWorld.z;',
  '  float a=(x-12.0)/4.7; float b=(x+6.7)/5.8; float c=(x+18.0)/5.4;',
  '  float shore=5.35+0.028*x+4.9*exp(-(a*a))+7.8*exp(-(b*b))+1.3*exp(-(c*c));',
  '  float depth=z-shore;', '  if(depth<0.0) discard;',
  '  float d=smoothstep(0.0,27.0,depth);',
  '  vec3 shallow=vec3(0.36,0.47,0.43); vec3 deep=vec3(0.105,0.24,0.275);',
  '  vec3 col=mix(shallow,deep,d);',
  '  float ripple=sin(x*0.62+z*0.37+uTime*0.47)*cos(z*0.51-x*0.26-uTime*0.31);',
  '  float glint=pow(max(0.0,ripple),13.0)*0.20;',
  '  float foam=exp(-max(depth,0.0)*1.55)*(0.45+0.55*sin(x*3.0+z*1.7+uTime*0.35));',
  '  col+=vec3(0.09,0.14,0.12)*glint;',
  '  col=mix(col,vec3(0.53,0.60,0.53),max(foam,0.0)*0.11);',
  '  vec3 viewDir=normalize(uCamera-vWorld); float fresnel=1.0-max(dot(viewDir,vec3(0.0,1.0,0.0)),0.0);',
  '  col=mix(col,vec3(0.55,0.63,0.61),fresnel*0.13);',
  '  gl_FragColor=vec4(col,1.0);',
  '  #include <fog_fragment>', '  #include <tonemapping_fragment>', '  #include <colorspace_fragment>', '}'
].join('\n');
const waterGeo = new THREE.PlaneGeometry(112, 220, 128, 220);
waterGeo.rotateX(-Math.PI / 2);
const waterMat = new THREE.ShaderMaterial({
  name: 'inlet | thin tidal water', fog: true, uniforms: { uTime: { value: 0 }, uCamera: { value: new THREE.Vector3() } },
  vertexShader: waterVertex, fragmentShader: waterFragment, side: THREE.DoubleSide,
});
const water = new THREE.Mesh(waterGeo, waterMat);
water.position.set(0, 0.045, 90); water.frustumCulled = false; water.name = 'quiet tidal inlet'; scene.add(water);

function addRockBatch(items, material = M.stone) {
  const geo = new THREE.IcosahedronGeometry(1, 1);
  const batch = new THREE.InstancedMesh(geo, material, items.length);
  const o = new THREE.Object3D();
  items.forEach((it, i) => {
    o.position.set(it.x, it.y, it.z); o.rotation.set(it.rx || 0, it.ry || 0, it.rz || 0); o.scale.set(it.sx, it.sy, it.sz); o.updateMatrix(); batch.setMatrixAt(i, o.matrix);
    batch.setColorAt(i, new THREE.Color(it.color || 0xffffff));
  });
  batch.castShadow = true; batch.receiveShadow = true; scene.add(batch);
}
function shoreRocks() {
  const rocks = [], wet = [];
  for (let x = -22; x < 26; x += 0.82 + rand() * 0.8) {
    const edge = coastZ(x), z = edge - 0.25 - rand() * 1.9;
    if ((Math.abs(x) < 2.8 && z > 4 && z < 23) || (Math.abs(x + 6.7) < 3.8 && z > 2 && z < 14.5) || (x > 8.5 && x < 16.5 && z > 8.5 && z < 12.7)) continue;
    const s = 0.12 + rand() * 0.34;
    rocks.push({ x, y: groundY(x, z) + s * 0.31, z, sx: s * (1.1 + rand() * 0.7), sy: s * (0.45 + rand() * 0.55), sz: s * (0.8 + rand() * 0.9), rx: rand() * 0.3, ry: rand() * 6, rz: rand() * 0.2, color: 0xb9b39d + Math.floor(rand() * 0x111111) });
    if (rand() > 0.58) wet.push({ x, y: groundY(x, z) + s * 0.49, z, sx: s * 0.92, sy: s * 0.45, sz: s * 0.74, ry: rand() * 6, color: 0x6d786d });
  }
  addRockBatch(rocks, M.stone); addRockBatch(wet, M.moss);
}
shoreRocks();

const grassGeometry = new THREE.ConeGeometry(0.035, 1, 5);
const grassMatrices = [];
function addGrassTuft(x, z, scale = 1) {
  for (let i = 0; i < 5; i++) {
    const angle = rand() * Math.PI * 2, lean = (rand() - 0.5) * 0.28, h = scale * (0.28 + rand() * 0.48);
    const o = new THREE.Object3D();
    o.position.set(x + Math.cos(angle) * 0.11 * scale + lean, groundY(x, z) + h / 2, z + Math.sin(angle) * 0.11 * scale);
    o.rotation.z = lean * 1.8; o.rotation.y = angle; o.scale.set(scale, h, scale); o.updateMatrix(); grassMatrices.push(o.matrix.clone());
  }
}
for (let i = 0; i < 52; i++) {
  const x = -23 + rand() * 46, edge = coastZ(x), z = edge - 1.2 - rand() * 3.5;
  if (Math.abs(x) < 3 && z > 3 && z < 20) continue;
  if (Math.abs(x + 6.7) < 4 && z > 2 && z < 14.5) continue;
  if (x > 9 && x < 16 && z > 8.5 && z < 13) continue;
  addGrassTuft(x, z, 0.65 + rand() * 1.0);
}
const grassBatch = new THREE.InstancedMesh(grassGeometry, M.reed, grassMatrices.length);
for (let i = 0; i < grassMatrices.length; i++) grassBatch.setMatrixAt(i, grassMatrices[i]);
grassBatch.instanceMatrix.needsUpdate = true; grassBatch.castShadow = false; grassBatch.receiveShadow = false; scene.add(grassBatch);

function plankTint(base = 0xffffff, spread = 0x101010) {
  const v = Math.floor((rand() - 0.5) * spread);
  return new THREE.Color(base).offsetHSL(0, (rand() - 0.5) * 0.05, v / 255).getHex();
}
function wallSide(side) {
  const x = side * 5.88;
  for (let row = 0; row < 12; row++) {
    const y = 0.59 + row * 0.255;
    for (let i = 0; i < 13; i++) {
      const z = -4.02 + i * 0.58;
      const inWindow = y > 1.62 && y < 2.6 && z > -1.9 && z < 0.45;
      if (inWindow) continue;
      addBox(0.16, 0.235, 0.57, x, y, z, row < 3 ? M.cedar : M.faded, plankTint(row < 3 ? 0xc1aa7e : 0xc1c1ae, 0x252525));
    }
  }
  for (const zz of [-4.15, 3.44]) addBox(0.28, 3.22, 0.28, x, 1.96, zz, M.darkWood, 0x9d9478);
  // The inset sash sits in the board gap, its six small panes catch the inlet light.
  const wx = x - side * 0.105, wz = -0.76, wy = 2.12;
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.78, 0.94), M.glass);
  glass.rotation.y = side > 0 ? Math.PI / 2 : -Math.PI / 2;
  glass.position.set(wx, wy, wz); glass.castShadow = false; scene.add(glass);
  for (const zz of [wz - 0.98, wz + 0.98]) addBox(0.17, 1.15, 0.14, wx + side * 0.02, wy, zz, M.creamPaint, 0x9b947b);
  for (const yy of [wy - 0.56, wy + 0.56]) addBox(0.17, 0.14, 2.08, wx + side * 0.02, yy, wz, M.creamPaint, 0x958c73);
  addBox(0.18, 0.95, 0.11, wx + side * 0.035, wy, wz, M.faded, 0xc4baa0);
  addBox(0.18, 0.11, 1.78, wx + side * 0.035, wy, wz, M.faded, 0xc4baa0);
  addBox(0.16, 0.095, 2.3, x + side * 0.09, 1.53, wz, M.darkWood, 0x6d6655);
  addBox(0.19, 0.11, 2.4, x + side * 0.09, 2.71, wz, M.darkWood, 0x756b57);
}
function horizontalWall(z, front) {
  for (let row = 0; row < 12; row++) {
    const y = 0.58 + row * 0.255;
    for (let i = 0; i < 21; i++) {
      const x = -5.68 + i * 0.565;
      if (front && y < 3.12 && Math.abs(x) < 1.92) continue;
      addBox(0.56, 0.23, 0.16, x, y, z, row < 3 ? M.cedar : M.faded, plankTint(row < 3 ? 0xbca67e : 0xb9b9a5, 0x222222));
    }
  }
  for (const x of [-5.85, -2.0, 2.0, 5.85]) addBox(0.24, 3.22, 0.26, x, 1.95, z, M.darkWood, 0x807763);
  if (front) addBox(4.1, 0.24, 0.28, 0, 3.23, z, M.darkWood, 0x706954);
}
function gable(z) {
  const s = new THREE.Shape();
  s.moveTo(-5.84, 3.48); s.lineTo(5.84, 3.48); s.lineTo(0, 5.0); s.closePath();
  const geo = new THREE.ShapeGeometry(s, 1); geo.translate(0, 0, z);
  const mat = M.painted.clone(); mat.side = THREE.DoubleSide; mat.color.setHex(0x909486);
  const panel = new THREE.Mesh(geo, mat); panel.castShadow = true; panel.receiveShadow = true; scene.add(panel);
  for (let y = 3.6; y < 4.93; y += 0.22) {
    const half = 5.84 * (1 - (y - 3.48) / 1.52);
    if (half > 0.15) addBox(half * 2, 0.17, 0.13, 0, y, z + (z > 0 ? 0.08 : -0.08), M.faded, plankTint(0xbab8a5, 0x242424));
  }
  beam([-5.82, 3.52, z], [0, 5.02, z], 0.09, M.darkWood);
  beam([0, 5.02, z], [5.82, 3.52, z], 0.09, M.darkWood);
}
function roofPanel(points, material, flip = false) {
  const geo = new THREE.BufferGeometry();
  const p = points.flat();
  const order = flip ? [0, 2, 1, 0, 3, 2] : [0, 1, 2, 0, 2, 3];
  const pos = [], uv = [];
  for (const id of order) { pos.push(points[id][0], points[id][1], points[id][2]); uv.push(id === 0 || id === 3 ? 0 : 1, id < 2 ? 0 : 1); }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, material); m.castShadow = true; m.receiveShadow = true; scene.add(m); return m;
}
function workshop() {
  // Raised plank floor and open, full-height front door.
  addBox(11.85, 0.22, 8.05, 0, 0.31, -0.48, M.darkWood, 0x665f4e);
  for (let i = 0; i < 27; i++) {
    const z = -4.35 + i * 0.295;
    addBox(11.58, 0.09, 0.273, 0, 0.435, z, M.interior, plankTint(0xb1a082, 0x202020));
    if (i % 3 === 1) for (const x of [-5.22, 5.22]) cylinder(0.025, 0.025, 0.012, x, 0.483, z, M.iron, 8);
  }
  for (const x of [-5.72, 5.72]) addBox(0.35, 0.28, 7.8, x, 0.24, -0.48, M.darkWood, 0x544f43);
  wallSide(-1); wallSide(1);
  horizontalWall(-4.52, false);
  horizontalWall(3.48, true);
  gable(-4.43); gable(3.43);
  for (const x of [-5.83, 5.83]) {
    addBox(0.24, 3.0, 0.24, x, 1.94, -4.42, M.cedar, 0x927e5e);
    addBox(0.24, 3.0, 0.24, x, 1.94, 3.42, M.cedar, 0x927e5e);
  }
  // Dark, salt-marked double doors folded back on their jambs.
  for (const sign of [-1, 1]) {
    const cx = sign * 2.88;
    addBox(1.48, 2.72, 0.15, cx, 1.84, 3.56, M.painted, sign < 0 ? 0x68766c : 0x718073);
    for (let j = -2; j <= 2; j++) addBox(0.245, 2.6, 0.055, cx + j * 0.265, 1.84, 3.47, M.faded, plankTint(0xaeb09b, 0x262626));
    addBox(1.52, 0.16, 0.2, cx, 3.13, 3.45, M.darkWood, 0x71634d);
    addBox(1.52, 0.16, 0.2, cx, 0.54, 3.45, M.darkWood, 0x71634d);
    addBox(0.11, 2.6, 0.2, cx - sign * 0.69, 1.84, 3.45, M.darkWood, 0x71634d);
    addBox(0.11, 2.6, 0.2, cx + sign * 0.69, 1.84, 3.45, M.darkWood, 0x71634d);
    addBox(2.05, 0.11, 0.12, cx, 1.32, 3.38, M.cedar, 0x8a7657, 0, 0, sign * -0.73);
    cylinder(0.035, 0.035, 0.07, cx + sign * 0.54, 1.77, 3.35, M.iron, 10, Math.PI / 2);
  }
  // Gabled salt-grey roof, exposed rafters under deep eaves.
  const roofMat = M.roof.clone(); roofMat.side = THREE.DoubleSide;
  roofPanel([[-6.55, 3.53, -4.95], [0, 5.2, -4.95], [0, 5.2, 4.02], [-6.55, 3.53, 4.02]], roofMat);
  roofPanel([[0, 5.2, -4.95], [6.55, 3.53, -4.95], [6.55, 3.53, 4.02], [0, 5.2, 4.02]], roofMat, true);
  for (let z = -4.7; z <= 3.8; z += 0.88) {
    beam([-6.48, 3.52, z], [0, 5.15, z], 0.065, M.darkWood);
    beam([0, 5.15, z], [6.48, 3.52, z], 0.065, M.darkWood);
  }
  addBox(0.22, 0.24, 9.15, -6.58, 3.48, -0.46, M.darkWood, 0x655f4f);
  addBox(0.22, 0.24, 9.15, 6.58, 3.48, -0.46, M.darkWood, 0x655f4f);
  addBox(0.24, 0.24, 9.1, 0, 5.18, -0.46, M.darkWood, 0x574f40);

  // Broad apron joins the open shop threshold to the pier without a step.
  addBox(5.25, 0.22, 2.85, 0, 0.31, 4.75, M.darkWood, 0x756d5a);
  for (let i = 0; i < 9; i++) addBox(5.04, 0.09, 0.29, 0, 0.435, 3.55 + i * 0.315, M.faded, plankTint(0xb0a88d, 0x252525));
  // Low stone-and-timber causeway leads from the boat slip to the raised apron.
  for (let i = 0; i < 7; i++) {
    const t = i / 6, x = -1.45 - t * 3.05, z = 4.55 + t * 1.9, y = groundY(x, z) + 0.055;
    addBox(0.95, 0.12, 0.7, x, y, z, i % 2 ? M.stoneLight : M.stone, 0x9f9984, 0, 0.08 * Math.sin(i), 0.015 * Math.cos(i));
  }
  // Tide-darkened sill stones and worn corner blocks.
  for (let i = 0; i < 12; i++) {
    const x = -5.3 + i * 0.96;
    if (Math.abs(x) < 2.0) continue;
    addBox(0.77, 0.24, 0.26, x, groundY(x, 3.53) + 0.12, 3.55, M.stone, plankTint(0x77796f, 0x151515));
  }
  // Painted name board above the lintel.
  addBox(3.25, 0.61, 0.13, 0, 3.57, 3.62, M.darkWood, 0x5e594d);
  const signCanvas = document.createElement('canvas'); signCanvas.width = 512; signCanvas.height = 96;
  const sctx = signCanvas.getContext('2d');
  sctx.fillStyle = '#d4cfb3'; sctx.font = '500 39px Georgia'; sctx.textAlign = 'center'; sctx.fillText('EAST INLET  /  BOATHOUSE', 256, 60);
  const signTex = new THREE.CanvasTexture(signCanvas); signTex.colorSpace = THREE.SRGBColorSpace;
  const signMat = new THREE.MeshBasicMaterial({ map: signTex, transparent: true, toneMapped: false });
  const signFace = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 0.43), signMat); signFace.position.set(0, 3.58, 3.70); scene.add(signFace);
}
workshop();

function crate(x, y, z, scale = 1, material = M.faded) {
  const w = 0.74 * scale, h = 0.67 * scale, d = 0.66 * scale;
  addBox(w, h, d, x, y + h / 2, z, M.darkWood, 0x71654f);
  for (let r = 0; r < 4; r++) {
    const yy = y + 0.12 * scale + r * 0.145 * scale;
    addBox(w + 0.035 * scale, 0.115 * scale, 0.055 * scale, x, yy, z + d / 2 + 0.01, material, plankTint(0xb6a27d, 0x292929));
    addBox(w + 0.035 * scale, 0.115 * scale, 0.055 * scale, x, yy, z - d / 2 - 0.01, material, plankTint(0xb6a27d, 0x292929));
    addBox(0.055 * scale, 0.115 * scale, d, x - w / 2 - 0.01, yy, z, material, plankTint(0xb6a27d, 0x292929));
    addBox(0.055 * scale, 0.115 * scale, d, x + w / 2 + 0.01, yy, z, material, plankTint(0xb6a27d, 0x292929));
  }
  addBox(w * 0.42, 0.07 * scale, 0.12 * scale, x, y + h + 0.012, z, M.darkWood, 0x5e594c);
}
function barrel(x, y, z, scale = 1, open = false) {
  const points = [new THREE.Vector2(0, 0), new THREE.Vector2(0.30, 0), new THREE.Vector2(0.34, 0.12), new THREE.Vector2(0.39, 0.42), new THREE.Vector2(0.35, 0.75), new THREE.Vector2(0.29, 0.86), new THREE.Vector2(0, 0.86)];
  const geo = new THREE.LatheGeometry(points, 12); geo.scale(scale, scale, scale);
  const m = new THREE.Mesh(geo, M.cedar); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; scene.add(m);
  for (const yy of [0.13, 0.72]) {
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.34 * scale, 0.026 * scale, 5, 16), M.iron);
    hoop.rotation.x = Math.PI / 2; hoop.position.set(x, y + yy * scale, z); hoop.castShadow = true; scene.add(hoop);
  }
  if (open) cylinder(0.23 * scale, 0.23 * scale, 0.025 * scale, x, y + 0.80 * scale, z, M.charcoal, 12);
}

function workbench() {
  const x = 0.55, z = -3.28;
  addBox(3.45, 0.16, 0.82, x, 1.08, z, M.cedar, 0x9c8562);
  addBox(3.52, 0.075, 0.86, x, 1.17, z, M.faded, 0xb3a382);
  for (const xx of [x - 1.48, x + 1.48]) for (const zz of [z - 0.31, z + 0.31]) {
    addBox(0.13, 1.05, 0.14, xx, 0.53, zz, M.darkWood, 0x635b49);
    addBox(0.24, 0.09, 0.2, xx, 0.13, zz, M.darkWood, 0x544e41);
  }
  addBox(0.95, 0.44, 0.68, x + 0.92, 0.72, z, M.darkWood, 0x665c49);
  for (let i = 0; i < 3; i++) addBox(0.8, 0.09, 0.025, x + 0.92, 0.6 + i * 0.14, z + 0.355, M.faded, 0x8a8068);
  for (let i = 0; i < 2; i++) addBox(0.13, 0.06, 0.07, x + 1.2, 0.6 + i * 0.14, z + 0.39, M.iron, 0x45483f);
  // A low, scarred shelf and pinboard above the working edge.
  addBox(3.7, 1.32, 0.12, x, 2.14, -4.24, M.faded, 0x8a8977);
  addBox(3.58, 1.18, 0.035, x, 2.14, -4.145, M.painted, 0x827e6a);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 12; c++) {
    cylinder(0.018, 0.018, 0.012, x - 1.5 + c * 0.27, 1.68 + r * 0.28, -4.11, M.iron, 6, Math.PI / 2);
  }
  addBox(3.65, 0.11, 0.23, x, 2.88, -4.1, M.darkWood, 0x76654e);
  // Hammers, a backsaw, chisels and a square hang within reach of the bench.
  const hangZ = -4.045;
  for (const [hx, hy] of [[-0.68, 2.36], [-0.1, 2.31], [0.55, 2.37], [1.2, 2.34], [1.7, 2.34]]) {
    beam([x + hx, hy - 0.26, hangZ], [x + hx + 0.02, hy + 0.13, hangZ], 0.032, M.cedar, 6);
    addBox(0.28, 0.065, 0.08, x + hx, hy + 0.12, hangZ, M.iron, 0x555b53);
  }
  beam([x - 1.25, 1.82, hangZ], [x - 1.25, 2.48, hangZ], 0.015, M.iron, 5);
  beam([x - 1.25, 2.48, hangZ], [x - 0.83, 2.48, hangZ], 0.019, M.iron, 5);
  addBox(0.12, 0.22, 0.13, x + 1.37, 1.91, hangZ, M.buoy, 0xc27c47);
  // Loose working tools laid on worn timber: mallet, awl, wrench, and folded sailmaker's measure.
  beam([x - 1.12, 1.27, z - 0.15], [x - 0.74, 1.28, z + 0.03], 0.035, M.cedar, 6);
  addBox(0.23, 0.09, 0.14, x - 1.12, 1.29, z - 0.15, M.darkWood, 0x675640, 0, 0.55);
  beam([x - 0.38, 1.255, z + 0.16], [x + 0.26, 1.255, z + 0.09], 0.018, M.iron, 6);
  beam([x + 0.46, 1.26, z - 0.12], [x + 1.0, 1.26, z + 0.08], 0.027, M.cedar, 6);
  for (let i = 0; i < 3; i++) cylinder(0.052, 0.06, 0.13, x - 0.25 + i * 0.2, 1.3, z - 0.22, i === 1 ? M.bluePaint : M.iron, 10);
  coil(x + 1.18, 1.27, z + 0.23, 0.14, M.darkRope, 2.6);
  // A galvanized vice, bolted to the left end of the bench.
  addBox(0.42, 0.08, 0.2, x - 1.4, 1.3, z - 0.32, M.iron, 0x58605a);
  addBox(0.1, 0.25, 0.1, x - 1.4, 1.42, z - 0.32, M.iron, 0x59615b);
  beam([x - 1.55, 1.44, z - 0.32], [x - 1.25, 1.44, z - 0.32], 0.025, M.iron, 7);
}
workbench();

function shelf(x, z, y = 0.5) {
  for (const zz of [z - 0.65, z + 0.65]) {
    addBox(0.13, 2.45, 0.13, x, y + 1.23, zz, M.darkWood, 0x5e594a);
    addBox(0.17, 2.3, 0.13, x + 0.2, y + 1.15, zz, M.darkWood, 0x5e594a);
  }
  for (let row = 0; row < 4; row++) {
    const yy = y + 0.4 + row * 0.55;
    addBox(0.82, 0.105, 1.52, x + 0.1, yy, z, M.cedar, 0x86795e);
    for (let i = 0; i < 5; i++) addBox(0.53, 0.065, 0.20, x + 0.12, yy + 0.1, z - 0.58 + i * 0.28, i % 2 ? M.bluePaint : M.creamPaint, i % 2 ? 0x607a78 : 0xb8b39f);
  }
}
function workshopProps() {
  shelf(4.68, 0.93, 0.45);
  barrel(-4.65, 0.48, -2.65, 0.84, true);
  barrel(-4.35, 0.45, 1.95, 0.66, false);
  crate(-3.9, 0.49, -1.45, 0.95, M.faded);
  crate(-4.62, 0.49, -0.56, 0.8, M.cedar);
  crate(3.64, 0.49, -2.45, 0.78, M.faded);
  // Oars and boat hooks lean beside the open door, clear of the threshold.
  beam([-4.85, 0.72, 2.25], [-4.32, 3.2, 1.52], 0.048, M.cedar, 8);
  beam([-4.25, 0.7, 2.15], [-3.72, 3.08, 1.53], 0.048, M.darkWood, 8);
  for (const x of [-4.85, -4.25]) addBox(0.18, 0.12, 0.5, x + 0.1, 2.97, 1.58, M.faded, 0xa39472, 0, 0.2);
  // Hanging net hoop and floats near the west window.
  const netPts = [];
  for (let i = 0; i <= 48; i++) { const a = i / 48 * Math.PI * 2; netPts.push([-5.55, 2.08 + 0.47 * Math.cos(a), -0.55 + 0.75 * Math.sin(a)]); }
  tube(netPts, 0.022, M.rope, 56, 5);
  for (let i = 0; i <= 8; i++) {
    const x = -5.56, z = -1.25 + i * 0.175;
    beam([x, 1.66, z], [x, 2.0 + 0.35 * Math.sin(i * Math.PI / 8), z], 0.009, M.darkRope, 4);
  }
  for (let i = 0; i < 5; i++) {
    const bx = -5.5, by = 1.68, bz = -1.05 + i * 0.39;
    const f = new THREE.Mesh(new THREE.SphereGeometry(0.072, 8, 6), i % 2 ? M.buoy : M.creamPaint);
    f.position.set(bx, by - 0.06, bz); f.castShadow = true; scene.add(f);
  }
  // Small tide board and a practical lantern above the east end of the bench.
  addBox(0.82, 1.03, 0.12, 3.8, 2.15, -4.27, M.darkWood, 0x5a5c50);
  addBox(0.7, 0.91, 0.055, 3.8, 2.15, -4.19, M.bluePaint, 0x4d6565);
  for (let i = 0; i < 5; i++) addBox(0.19, 0.023, 0.018, 3.55 + (i % 2) * 0.16, 1.83 + i * 0.13, -4.15, M.creamPaint, 0xd8d1b4);
  cylinder(0.08, 0.07, 0.22, 4.62, 3.1, -3.7, M.brass, 8);
  cylinder(0.12, 0.12, 0.03, 4.62, 3.23, -3.7, M.iron, 8);
  const lampGlass = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffd698 }));
  lampGlass.position.set(4.62, 3.07, -3.7); scene.add(lampGlass);
  const insideLamp = new THREE.PointLight(0xffd29b, 13, 9, 2); insideLamp.position.set(0.2, 3.45, -1.8); scene.add(insideLamp);
  // Two canvas sail patches sit on the dry rack rather than in the walking lane.
  addBox(1.45, 0.08, 0.95, -2.65, 0.72, 1.7, M.creamPaint, 0xb9ae8f);
  addBox(1.2, 0.05, 0.76, -2.65, 0.79, 1.7, M.faded, 0x8e8a75);
}
workshopProps();

function cleat(x, z, y = 0.52) {
  addBox(0.32, 0.075, 0.18, x, y, z, M.iron, 0x4a5048);
  cylinder(0.055, 0.055, 0.13, x, y + 0.09, z, M.iron, 8);
  addBox(0.31, 0.065, 0.07, x, y + 0.17, z - 0.12, M.iron, 0x51574f);
  addBox(0.31, 0.065, 0.07, x, y + 0.17, z + 0.12, M.iron, 0x51574f);
}
function pier() {
  const start = 3.35, end = 17.0, y = 0.37;
  // Heavy wale timbers sit below the weather-worn cross planking.
  for (const x of [-2.2, 2.2]) addBox(0.28, 0.23, end - start, x, 0.25, (start + end) / 2, M.darkWood, 0x5c594e);
  for (let z = start + 0.12, i = 0; z < end; z += 0.39, i++) {
    addBox(4.56, 0.12, 0.35, 0, y, z, i % 5 === 0 ? M.cedar : M.faded, plankTint(i % 7 === 0 ? 0x9b8e70 : 0xaaa58f, 0x292929));
    if (i % 3 === 0) for (const x of [-1.93, 1.93]) cylinder(0.023, 0.023, 0.012, x, y + 0.066, z, M.iron, 7);
  }
  // Green tide sleeves stain the pilings right at the changing waterline.
  for (const z of [5.0, 8.0, 11.0, 14.0, 16.8]) for (const x of [-2.13, 2.13]) {
    addBox(0.31, 1.03, 0.31, x, -0.09, z, M.darkWood, 0x514d42);
    cylinder(0.19, 0.19, 0.12, x, 0.06, z, M.moss, 8);
  }
  const postZs = [];
  for (let z = 6.8; z <= 16.15; z += 2.05) postZs.push(z);
  for (const side of [-1, 1]) {
    if (side < 0) {
      for (const z of postZs) addBox(0.16, 0.99, 0.16, side * 2.12, 0.91, z, M.cedar, 0x8c836c);
      addBox(0.13, 0.15, 10.05, side * 2.12, 1.36, 11.78, M.darkWood, 0x706957);
      addBox(0.11, 0.1, 10.05, side * 2.12, 0.82, 11.78, M.faded, 0x918b78);
    } else {
      for (const z of postZs) if (z < 11.2 || z > 14.1) addBox(0.16, 0.99, 0.16, side * 2.12, 0.91, z, M.cedar, 0x8c836c);
      addBox(0.13, 0.15, 4.3, side * 2.12, 1.36, 9.0, M.darkWood, 0x706957);
      addBox(0.11, 0.1, 4.3, side * 2.12, 0.82, 9.0, M.faded, 0x918b78);
      addBox(0.13, 0.15, 2.35, side * 2.12, 1.36, 15.675, M.darkWood, 0x706957);
      addBox(0.11, 0.1, 2.35, side * 2.12, 0.82, 15.675, M.faded, 0x918b78);
    }
  }
  addBox(4.26, 0.16, 0.16, 0, 1.36, 16.88, M.darkWood, 0x706957);
  addBox(4.26, 0.11, 0.12, 0, 0.82, 16.88, M.faded, 0x918b78);
  for (const x of [-1.9, 1.9]) addBox(0.14, 0.96, 0.15, x, 0.9, 16.85, M.cedar, 0x8c836c);

  // Low, continuous handrail ramp branches east to the broad exposed beach.
  const ax = 2, az = 13.25, bx = 13, bz = 10.2;
  const dx = bx - ax, dz = bz - az, len = Math.hypot(dx, dz), angle = Math.atan2(dx, dz);
  for (let t = 0.05, i = 0; t < 1.0; t += 0.044, i++) {
    const x = ax + dx * t, z = az + dz * t, h = 0.43 - 0.27 * t;
    addBox(3.0, 0.12, 0.42, x, h - 0.045, z, i % 4 === 0 ? M.cedar : M.faded, plankTint(0xaaa38c, 0x282828), 0, angle);
  }
  for (const side of [-1, 1]) {
    const nx = Math.cos(angle) * side * 1.43, nz = -Math.sin(angle) * side * 1.43;
    for (let t = 0.04; t <= 1.001; t += 0.17) {
      const x = ax + dx * t + nx, z = az + dz * t + nz, h = 0.43 - 0.27 * t;
      const base = h - 0.02;
      beam([x, base, z], [x, base + 0.84, z], 0.055, M.cedar, 7);
    }
    beam([ax + nx, 1.24, az + nz], [bx + nx, 0.97, bz + nz], 0.065, M.darkWood, 7);
    beam([ax + nx, 0.78, az + nz], [bx + nx, 0.51, bz + nz], 0.044, M.faded, 7);
  }
  // A short apron of salt-worn stones helps the ramp meet the beach without a lip.
  for (let i = 0; i < 4; i++) {
    const t = 0.78 + i * 0.072, x = ax + dx * t, z = az + dz * t, h = 0.43 - 0.27 * t;
    addBox(0.7, 0.08, 0.46, x + 1.52, groundY(x + 1.52, z) + 0.06, z, M.stoneLight, 0x9b9887, 0, angle);
  }
  for (const z of [5.9, 9.1, 15.9]) {
    cleat(-1.64, z, 0.51);
    if (z !== 9.1) coil(-1.2, 0.51, z + 0.28, 0.21, z === 17.3 ? M.darkRope : M.rope, 3.1);
  }
  // Amber shore lantern, tucked beyond the pier's turning space.
  addBox(0.1, 0.94, 0.1, -1.86, 0.94, 7.3, M.darkWood, 0x564e3f);
  cylinder(0.09, 0.12, 0.1, -1.86, 1.45, 7.3, M.iron, 8);
  const pierLamp = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.26, 0.12), new THREE.MeshBasicMaterial({ color: 0xffd89b }));
  pierLamp.position.set(-1.86, 1.31, 7.3); scene.add(pierLamp);
}
pier();

function groupBeam(parent, a, b, radius, material, sides = 8) {
  const start = new THREE.Vector3(a[0], a[1], a[2]), end = new THREE.Vector3(b[0], b[1], b[2]);
  const delta = end.clone().sub(start), len = delta.length();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.9, radius, len, sides, 1), material);
  m.position.copy(start.add(end).multiplyScalar(0.5)); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
  m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
}
function createBoat() {
  const g = new THREE.Group(); g.name = 'small beached working skiff';
  const stations = [
    [-2.72, 0.045, 0.24, 0.78], [-2.36, 0.46, 0.27, 0.84], [-1.65, 0.77, 0.3, 0.88],
    [-0.6, 0.94, 0.34, 0.91], [0.55, 0.98, 0.37, 0.92], [1.5, 0.81, 0.41, 0.91], [2.25, 0.55, 0.48, 0.88], [2.66, 0.07, 0.56, 0.79],
  ];
  const pos = [], colors = [], indices = [];
  const greens = new THREE.Color(0x53766b), pale = new THREE.Color(0x9a9a78), red = new THREE.Color(0x81483d), dark = new THREE.Color(0x49483f);
  for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
    const side = sideIndex === 0 ? -1 : 1, base = pos.length / 3;
    for (const s of stations) {
      const z = s[0], w = s[1], bottom = s[2], top = s[3];
      pos.push(side * w, top, z, side * w * 0.76, bottom + (top - bottom) * 0.43, z, 0, bottom, z);
      colors.push(greens.r, greens.g, greens.b, red.r, red.g, red.b, dark.r, dark.g, dark.b);
    }
    for (let i = 0; i < stations.length - 1; i++) for (let row = 0; row < 2; row++) {
      const a = base + i * 3 + row, b = base + i * 3 + row + 1, c = base + (i + 1) * 3 + row + 1, d = base + (i + 1) * 3 + row;
      indices.push(a, b, c, a, c, d);
    }
  }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); geo.setIndex(indices); geo.computeVertexNormals();
  const hullMat = new THREE.MeshStandardMaterial({ name: 'chipped sage hull over red lead paint', vertexColors: true, roughness: 0.57, side: THREE.DoubleSide });
  const hull = new THREE.Mesh(geo, hullMat); hull.castShadow = true; hull.receiveShadow = true; g.add(hull);
  // A narrow salt-bleached pinstripe follows the painted gunwale.
  const railLeft = [], railRight = [];
  for (const s of stations) { railLeft.push([-s[1], s[3] + 0.015, s[0]]); railRight.push([s[1], s[3] + 0.015, s[0]]); }
  for (const list of [railLeft, railRight]) {
    const curve = new THREE.CatmullRomCurve3(list.map(p => new THREE.Vector3(p[0], p[1], p[2])));
    const trim = new THREE.Mesh(new THREE.TubeGeometry(curve, 54, 0.027, 6, false), M.creamPaint); trim.castShadow = true; g.add(trim);
  }
  const bottom = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.055, 3.65), M.charcoal);
  bottom.position.set(0, 0.59, -0.05); bottom.castShadow = true; g.add(bottom);
  // Three weathered thwarts, a stern seat and their simple knees.
  for (const z of [-1.24, -0.12, 0.98]) {
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.1, 0.28), M.cedar);
    seat.position.set(0, 0.84, z); seat.castShadow = true; seat.receiveShadow = true; g.add(seat);
    for (const x of [-0.54, 0.54]) groupBeam(g, [x, 0.61, z], [x * 0.9, 0.79, z], 0.04, M.darkWood, 6);
  }
  const transom = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.61, 0.11), M.cedar);
  transom.position.set(0, 0.71, -2.42); transom.rotation.y = 0.04; g.add(transom);
  // Curved bow stem and rubbed keel strip.
  groupBeam(g, [0, 0.33, -2.5], [0, 0.58, 2.48], 0.055, M.darkWood, 8);
  for (const x of [-0.48, 0.48]) {
    groupBeam(g, [x, 0.96, -0.25], [x * 1.18, 1.02, -0.1], 0.026, M.brass, 6);
    const oar = new THREE.Mesh(new THREE.BoxGeometry(0.105, 0.065, 2.05), M.cedar);
    oar.position.set(x * 1.63, 0.9, -0.12); oar.rotation.y = x < 0 ? -0.18 : 0.18; g.add(oar);
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.045, 0.54), M.faded);
    blade.position.set(x * 2.0, 0.86, 0.78); blade.rotation.y = oar.rotation.y; g.add(blade);
  }
  for (const z of [-2.34, 2.37]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.018, 5, 12), M.brass);
    ring.position.set(0, z < 0 ? 0.93 : 0.92, z); ring.rotation.x = Math.PI / 2; g.add(ring);
  }
  // Soft fenders lie against the side; the open middle remains easy to inspect.
  for (const side of [-1, 1]) {
    const fender = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), M.creamPaint);
    fender.scale.set(0.65, 0.75, 1.5); fender.position.set(side * 0.91, 0.73, -0.65); fender.castShadow = true; g.add(fender);
    groupBeam(g, [side * 0.91, 0.85, -0.65], [side * 0.91, 1.0, -0.93], 0.014, M.rope, 5);
  }
  g.position.set(-6.7, groundY(-6.7, 9.0) - 0.24, 9.0); g.rotation.y = -0.09; scene.add(g);

  // Twin beach moorings and slack lines still damp from the falling tide.
  for (const p of [[-9.5, 9.0], [-4.12, 3.55]]) {
    const y = groundY(p[0], p[1]);
    cylinder(0.12, 0.15, 0.92, p[0], y + 0.46, p[1], M.darkWood, 8, 0, 0, (rand() - 0.5) * 0.12);
    cylinder(0.13, 0.13, 0.12, p[0], y + 0.86, p[1], M.iron, 8);
  }
  tube([[-9.5, groundY(-9.5, 9.0) + 0.84, 9.0], [-8.7, 0.95, 9.7], [-7.8, 0.91, 10.55], [-6.75, 0.91, 11.45]], 0.035, M.rope, 42, 6);
  tube([[-4.12, groundY(-4.12, 3.55) + 0.84, 3.55], [-4.75, 0.82, 4.0], [-5.62, 0.83, 4.72], [-6.3, 0.9, 6.35]], 0.031, M.darkRope, 42, 6);
  coil(-9.1, groundY(-9.1, 8.6) + 0.035, 8.6, 0.3, M.rope, 3.4, 0.2);
  // A split plank and shallow puddle make the exposed slip read as tidal ground.
  addBox(0.54, 0.075, 1.16, -10.25, groundY(-10.25, 5.25) + 0.07, 5.25, M.faded, 0x817c68, 0, 0.12, 0.03);
  return g;
}
createBoat();

function tidePools() {
  const pools = [[-1.4, 6.05, 1.3, 0.62], [3.5, 6.55, 1.6, 0.48], [8.35, 8.15, 1.25, 0.52], [15.6, 9.0, 1.4, 0.54], [-15.3, 5.3, 1.6, 0.5]];
  const poolMat = new THREE.MeshPhysicalMaterial({ color: 0x6c8880, roughness: 0.22, metalness: 0.08, transparent: true, opacity: 0.72, side: THREE.DoubleSide });
  for (const [x, z, rx, rz] of pools) {
    if (z > coastZ(x) - 0.4) continue;
    const sh = new THREE.Shape();
    for (let i = 0; i <= 48; i++) {
      const a = i / 48 * Math.PI * 2, n = 0.88 + 0.1 * Math.sin(a * 5 + x) + 0.05 * Math.cos(a * 7 + z);
      const xx = Math.cos(a) * rx * n, zz = Math.sin(a) * rz * n;
      if (i === 0) sh.moveTo(xx, zz); else sh.lineTo(xx, zz);
    }
    sh.closePath();
    const geo = new THREE.ShapeGeometry(sh, 2); geo.rotateX(-Math.PI / 2); geo.translate(x, groundY(x, z) + 0.04, z);
    const p = new THREE.Mesh(geo, poolMat); p.receiveShadow = true; scene.add(p);
    // Salt-darkened damp margin ring around the hollow.
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1, 0.065, 5, 44), M.moss);
    rim.scale.set(rx, rz, 1); rim.rotation.x = Math.PI / 2; rim.position.set(x, groundY(x, z) + 0.008, z); scene.add(rim);
  }
}
tidePools();

function beachDetails() {
  // Shell fragments and shingle cluster just above the branch ramp landing.
  for (let i = 0; i < 19; i++) {
    const x = 10.8 + rand() * 4.5, z = 8.15 + rand() * 1.65;
    if (z > coastZ(x) - 0.1) continue;
    const shell = new THREE.Mesh(new THREE.DodecahedronGeometry(0.075 + rand() * 0.075, 0), i % 3 === 0 ? M.creamPaint : M.stoneLight);
    shell.position.set(x, groundY(x, z) + 0.07, z); shell.scale.set(1.2, 0.45, 0.75); shell.rotation.y = rand() * 5; shell.castShadow = true; scene.add(shell);
  }
  // Stranded seaweed at the wrack line, beyond the clear walking strip.
  for (let i = 0; i < 12; i++) {
    const x = -16 + i * 2.8, z = coastZ(x) - 0.45;
    if ((Math.abs(x) < 3 && z < 23) || (x > 9 && x < 16)) continue;
    const mat = i % 2 ? M.moss : M.reed;
    for (let j = 0; j < 3; j++) beam([x + j * 0.11, groundY(x, z) + 0.07, z], [x + j * 0.12 + 0.16, groundY(x, z) + 0.1, z - 0.38], 0.022, mat, 5);
  }
  // Buoyed shoreline stones define the exposed landing edge without blocking it.
  for (const [x, z] of [[9.3, 8.7], [16.5, 9.2]]) {
    cylinder(0.12, 0.15, 0.42, x, groundY(x, z) + 0.2, z, M.darkWood, 8);
    const f = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), M.buoy); f.position.set(x, groundY(x, z) + 0.54, z); f.castShadow = true; scene.add(f);
  }
}
beachDetails();

function exteriorWorkshopDetails() {
  // Spare planks, sawhorses and a rain barrel make the back elevation feel used.
  for (let i = 0; i < 3; i++) {
    const z = -6.25 - i * 0.08, x = 3.65;
    addBox(2.4, 0.12, 0.18, x, 0.3 + i * 0.18, z, i === 1 ? M.cedar : M.faded, plankTint(0x91866f, 0x252525));
  }
  for (const x of [2.8, 4.5]) {
    addBox(0.12, 0.56, 0.12, x, 0.42, -6.22, M.darkWood, 0x5d584a);
    addBox(0.1, 0.54, 0.1, x + 0.28, 0.42, -6.22, M.darkWood, 0x5d584a);
  }
  barrel(7.1, groundY(7.1, -2.0), -2.0, 1.0, true);
  cylinder(0.065, 0.08, 3.0, 6.05, 1.84, -2.5, M.iron, 8);
  beam([6.55, 3.2, -4.9], [6.05, 3.2, -2.5], 0.045, M.iron, 7);
  beam([6.05, 3.2, -2.5], [6.05, 0.42, -2.5], 0.045, M.iron, 7);
  // A low timber repair trestle and split rudder are set away from the walking line.
  for (const z of [2.0, 2.75]) {
    addBox(0.1, 0.78, 0.1, 7.35, groundY(7.35, z) + 0.4, z, M.cedar, 0x826c4e, 0, 0, 0.16);
    addBox(0.1, 0.78, 0.1, 8.15, groundY(8.15, z) + 0.4, z, M.cedar, 0x826c4e, 0, 0, -0.16);
  }
  addBox(1.15, 0.12, 1.1, 7.75, groundY(7.75, 2.35) + 0.9, 2.35, M.cedar, 0x897252);
  beam([7.36, 0.8, 2.4], [7.9, 2.0, 2.5], 0.06, M.faded, 7);
  addBox(0.47, 1.04, 0.09, 7.88, 1.38, 2.49, M.faded, 0x9b8969, 0, 0, -0.08);
  // Exterior double block and lantern on the front corner.
  for (const [x, z] of [[-5.3, 3.8], [5.5, 3.9]]) {
    const gy = groundY(x, z);
    addBox(0.54, 0.34, 0.42, x, gy + 0.16, z, M.stone, 0x77766d);
    cylinder(0.08, 0.09, 0.52, x, gy + 0.61, z, M.darkWood, 8);
    cylinder(0.15, 0.14, 0.08, x, gy + 0.88, z, M.iron, 8);
  }
  const signPost = cylinder(0.045, 0.06, 2.2, 10.0, groundY(10.0, 5.3) + 1.1, 5.3, M.darkWood, 8);
  addBox(0.96, 0.44, 0.12, 10.0, groundY(10.0, 5.3) + 1.8, 5.3, M.faded, 0x82775d, 0, 0.06);
  addBox(0.67, 0.055, 0.025, 10.0, groundY(10.0, 5.3) + 1.8, 5.38, M.creamPaint, 0xd0c6a7);
  // A capped stove flue peeks above the rear roof slope.
  addBox(0.44, 0.78, 0.42, 4.2, 5.36, -2.0, M.iron, 0x555b53);
  addBox(0.58, 0.1, 0.57, 4.2, 5.8, -2.0, M.darkWood, 0x454b46);
  addBox(0.2, 0.22, 0.18, 4.2, 5.97, -2.0, M.iron, 0x48524d);
}
exteriorWorkshopDetails();

function distantLand() {
  function ridge(z, color, seedOffset, peakScale) {
    const shape = new THREE.Shape();
    shape.moveTo(-110, -1); shape.lineTo(-110, 1.4);
    for (let i = 0; i <= 32; i++) {
      const x = -110 + i * (220 / 32);
      const wave = Math.sin(i * 0.53 + seedOffset) * 0.5 + Math.sin(i * 1.13 + seedOffset * 1.7) * 0.24 + Math.sin(i * 0.19) * 0.35;
      const y = 1.4 + Math.max(0, wave + 0.4) * peakScale;
      shape.lineTo(x, y);
    }
    shape.lineTo(110, -1); shape.closePath();
    const geo = new THREE.ShapeGeometry(shape, 1); geo.translate(0, 0, z);
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 1, side: THREE.DoubleSide }));
    m.receiveShadow = false; m.castShadow = false; scene.add(m);
  }
  ridge(82, 0x839b96, 2.3, 4.5);
  ridge(103, 0x9caeaa, 7.4, 3.0);
  // Sparse wind-shaped pines keep the far shore legible, softened by inlet haze.
  const trunk = new THREE.CylinderGeometry(0.1, 0.16, 1.4, 6);
  const cone1 = new THREE.ConeGeometry(0.9, 2.0, 6);
  const cone2 = new THREE.ConeGeometry(0.66, 1.65, 6);
  const treeData = [];
  for (let i = 0; i < 18; i++) {
    treeData.push({ x: -49 + i * 5.7 + rand() * 2.1, z: 79 + rand() * 1.8, y: 1.4 + rand() * 1.2, sx: 0.85 + rand() * 0.35, sy: 0.65 + rand() * 0.4, sz: 0.85 + rand() * 0.35 });
  }
  function treeBatch(geometry, material, localY, count) {
    const batch = new THREE.InstancedMesh(geometry, material, count), o = new THREE.Object3D();
    treeData.forEach((t, i) => { o.position.set(t.x, t.y + localY * t.sy, t.z); o.scale.set(t.sx, t.sy, t.sz); o.rotation.y = (i % 3 - 1) * 0.14; o.updateMatrix(); batch.setMatrixAt(i, o.matrix); });
    batch.instanceMatrix.needsUpdate = true; batch.castShadow = false; batch.receiveShadow = false; scene.add(batch);
  }
  treeBatch(trunk, M.darkWood, 0.7, treeData.length);
  treeBatch(cone1, M.reed, 1.65, treeData.length);
  treeBatch(cone2, M.moss, 2.55, treeData.length);
}
distantLand();

const colliders = [
  { x: 0.55, z: -3.28, hx: 1.78, hz: 0.52 },
  { x: 4.68, z: 0.93, hx: 0.58, hz: 0.85 },
  { x: -4.65, z: -2.65, hx: 0.48, hz: 0.47 },
  { x: -4.22, z: -0.9, hx: 0.57, hz: 0.7 },
  { x: -4.35, z: 1.95, hx: 0.4, hz: 0.42 },
  { x: 3.64, z: -2.45, hx: 0.45, hz: 0.45 },
];
function canWalkAt(x, z) {
  if (x < -27.5 || x > 27.5 || z < -24 || z > 39) return false;
  const inside = Math.abs(x) < 5.58 && z > -4.16 && z < 3.25;
  // Continuous major walls, with a generous open double-door aperture at the front.
  if (Math.abs(x) > 5.73 && Math.abs(x) < 6.12 && z > -4.4 && z < 3.55) return false;
  if (z > -4.69 && z < -4.34 && Math.abs(x) < 5.95) return false;
  if (z > 3.34 && z < 3.76 && Math.abs(x) < 5.95 && Math.abs(x) > 1.93) return false;
  if (inside) {
    for (const c of colliders) if (Math.abs(x - c.x) < c.hx + 0.22 && Math.abs(z - c.z) < c.hz + 0.22) return false;
    return true;
  }
  // Keep a shoulder-width inside the pier rails and behind its end rail.
  if (z > 3.18 && z < 17.0 && Math.abs(x) < 1.88) {
    if (z > 16.78 && z < 17.0) return false;
    return true;
  }
  const ramp = rampInfo(x, z);
  if (ramp && rampInfo(x, z).t < 0.97) return Math.abs(x) < 14.7;
  if (z <= coastZ(x) - 0.035) {
    for (const c of colliders) if (Math.abs(x - c.x) < c.hx + 0.22 && Math.abs(z - c.z) < c.hz + 0.22) return false;
    // Keep the player outside the skiff's painted hull while leaving room to circle it.
    const dx = (x + 6.7) / 1.12, dz = (z - 9.0) / 2.62;
    if (dx * dx + dz * dz < 1.04) return false;
    return true;
  }
  return false;
}

const SPAWN = { x: 0, z: -1.6, yaw: 0.06 };
function resetPlayer(relock = false) {
  player.position.set(SPAWN.x, surfaceY(SPAWN.x, SPAWN.z) + 1.64, SPAWN.z);
  camera.quaternion.setFromEuler(new THREE.Euler(0, SPAWN.yaw, 0, 'YXZ'));
  if (relock && !controls.isLocked) controls.lock();
}
resetPlayer();

const intro = document.getElementById('intro');
const enter = document.getElementById('enter');
const toast = document.getElementById('toast');
let hasEntered = false, toastTimer = 0;
function showToast(text, duration = 2400) {
  toast.textContent = text; toast.classList.add('show'); clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}
enter.addEventListener('click', () => { hasEntered = true; document.body.classList.add('entered'); controls.lock(); });
renderer.domElement.addEventListener('click', () => { if (hasEntered && !controls.isLocked) controls.lock(); });
controls.addEventListener('lock', () => { document.body.classList.add('playing'); document.body.classList.add('entered'); toast.classList.remove('show'); });
controls.addEventListener('unlock', () => { document.body.classList.remove('playing'); if (hasEntered) showToast('Click in the scene to look around · Esc releases the mouse', 3600); });
document.getElementById('reset').addEventListener('click', () => { const wasLocked = controls.isLocked; if (wasLocked) controls.unlock(); hasEntered = true; document.body.classList.add('entered'); resetPlayer(false); if (!wasLocked) controls.lock(); showToast('Back in the workshop', 1800); });

const keys = new Set();
window.addEventListener('keydown', e => {
  if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ShiftLeft', 'ShiftRight'].includes(e.code)) e.preventDefault();
  keys.add(e.code);
  if (e.code === 'KeyR' && !e.repeat) { hasEntered = true; document.body.classList.add('entered'); resetPlayer(controls.isLocked); showToast('Back in the workshop', 1800); }
});
window.addEventListener('keyup', e => keys.delete(e.code));
window.addEventListener('blur', () => keys.clear());
document.addEventListener('pointerlockchange', () => { if (!document.pointerLockElement) keys.clear(); });

flushBoxes();
renderer.shadowMap.autoUpdate = false;
renderer.shadowMap.needsUpdate = true;

let previous = performance.now();
function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min((now - previous) / 1000, 0.035); previous = now;
  waterMat.uniforms.uTime.value = now * 0.001;
  waterMat.uniforms.uCamera.value.copy(camera.position);
  if (controls.isLocked) {
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion); forward.y = 0; forward.normalize();
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
    let mx = 0, mz = 0;
    if (keys.has('KeyW') || keys.has('ArrowUp')) { mx += forward.x; mz += forward.z; }
    if (keys.has('KeyS') || keys.has('ArrowDown')) { mx -= forward.x; mz -= forward.z; }
    if (keys.has('KeyD') || keys.has('ArrowRight')) { mx += right.x; mz += right.z; }
    if (keys.has('KeyA') || keys.has('ArrowLeft')) { mx -= right.x; mz -= right.z; }
    const mag = Math.hypot(mx, mz);
    if (mag > 0) {
      mx /= mag; mz /= mag;
      const speed = keys.has('ShiftLeft') || keys.has('ShiftRight') ? 4.15 : 2.85;
      const distance = speed * dt, steps = Math.max(1, Math.ceil(distance / 0.075));
      for (let i = 0; i < steps; i++) {
        const sx = mx * distance / steps, sz = mz * distance / steps;
        const nx = player.position.x + sx, nz = player.position.z + sz;
        if (canWalkAt(nx, player.position.z)) player.position.x = nx;
        if (canWalkAt(player.position.x, nz)) player.position.z = nz;
      }
    }
    player.position.y = surfaceY(player.position.x, player.position.z) + 1.64;
  }
  renderer.render(scene, camera);
}
requestAnimationFrame(animate);
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5)); renderer.setSize(innerWidth, innerHeight);
});
