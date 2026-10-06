// Tidal Boathouse — explorable three.js scene.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import * as TX from './textures.js';

const ss = (e0, e1, x) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
const WATER = -1.9;      // fixed low-tide water level
const HW = -0.32;        // high-water (tide) mark
const EYE = 1.62, EYE_CROUCH = 0.95, RADIUS = 0.3, STEP = 0.42;

// ---------------------------------------------------------------- renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
let pixelScale = Math.min(window.devicePixelRatio, 1.25);
renderer.setPixelRatio(pixelScale);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false; // static scene: render the shadow map once
document.body.appendChild(renderer.domElement);
TX.setAniso(Math.min(8, renderer.capabilities.getMaxAnisotropy()));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.05, 1600);
const FOG_COL = new THREE.Color(0xc9ccc8);
scene.fog = new THREE.FogExp2(FOG_COL, 0.0048);
scene.background = FOG_COL;

// ---------------------------------------------------------------- light
const SUN_DIR = new THREE.Vector3(0.78, 0.33, 0.52).normalize();
const sun = new THREE.DirectionalLight(0xffdcb4, 3.1);
sun.position.copy(SUN_DIR).multiplyScalar(60).add(new THREE.Vector3(-2, 0, 2));
sun.target.position.set(-2, 0, 2);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
const sc = sun.shadow.camera;
sc.left = -30; sc.right = 30; sc.top = 30; sc.bottom = -30; sc.near = 10; sc.far = 130;
sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.025;
scene.add(sun, sun.target);
const hemi = new THREE.HemisphereLight(0xc4d4e0, 0x6b6150, 0.35);
scene.add(hemi);

// ---------------------------------------------------------------- sky
const skyUniforms = {
  uSun: { value: SUN_DIR },
  uZenith: { value: new THREE.Color(0x5f86b0) },
  uHorizon: { value: new THREE.Color(0xd9d3c8) },
  uGlow: { value: new THREE.Color(0xffd2a0) },
};
const SKY_GLSL = `
float skh(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float skn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(skh(i),skh(i+vec2(1,0)),f.x), mix(skh(i+vec2(0,1)),skh(i+vec2(1,1)),f.x), f.y); }
float cloudF(vec3 d){
  if (d.y <= 0.0) return 0.0;
  vec2 p = d.xz / (d.y + 0.06) * 1.2; p *= vec2(0.35, 1.0);
  float n = skn(p)*0.5 + skn(p*2.3+3.7)*0.28 + skn(p*5.1+1.1)*0.14;
  return smoothstep(0.48, 0.82, n) * smoothstep(0.0, 0.1, d.y) * (1.0 - smoothstep(0.5, 0.9, d.y));
}
vec3 skyCol(vec3 d){
  float h = clamp(d.y, -0.2, 1.0);
  vec3 c = mix(uHorizon, uZenith, pow(max(h,0.0), 0.55));
  float s = max(dot(d, uSun), 0.0);
  float cl = cloudF(d);
  c = mix(c, mix(vec3(0.93,0.91,0.88), vec3(1.0,0.86,0.7), pow(s, 3.0)*0.8), cl*0.6);
  c += uGlow * (pow(s, 6.0)*0.35 + pow(s, 64.0)*0.6);
  c += vec3(1.0,0.95,0.85) * pow(s, 1800.0) * 6.0;
  c = mix(c, uHorizon*0.92, smoothstep(0.0,-0.2,d.y));
  return c;
}`;
const skyMat = new THREE.ShaderMaterial({
  uniforms: skyUniforms, side: THREE.BackSide, depthWrite: false, fog: false,
  vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = modelViewMatrix*vec4(position,1.0); gl_Position = projectionMatrix*p; gl_Position.z = gl_Position.w*0.9999; }`,
  fragmentShader: `uniform vec3 uSun, uZenith, uHorizon, uGlow; varying vec3 vDir; ${SKY_GLSL}
  void main(){ vec3 d = normalize(vDir); gl_FragColor = vec4(skyCol(d), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  }`,
});
const sky = new THREE.Mesh(new THREE.SphereGeometry(1000, 32, 16), skyMat);
sky.renderOrder = -10; sky.frustumCulled = false;
scene.add(sky);
// environment map from the sky (one-off)
{
  const envScene = new THREE.Scene();
  const envSky = new THREE.Mesh(new THREE.SphereGeometry(100, 32, 16), skyMat.clone());
  envSky.material.uniforms = skyUniforms;
  envScene.add(envSky);
  // dark ground hemisphere so reflections pick up land/sea below horizon
  const g = new THREE.Mesh(new THREE.CircleGeometry(90, 24), new THREE.MeshBasicMaterial({ color: 0x4f5550 }));
  g.rotation.x = -Math.PI / 2; g.position.y = -4; envScene.add(g);
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(envScene, 0.02).texture;
  scene.environmentIntensity = 0.55;
  pm.dispose();
}

// ---------------------------------------------------------------- textures
const T = {
  boards: TX.woodTexture(11, { base: [0.60, 0.59, 0.55], alt: [0.53, 0.49, 0.43], dark: [0.24, 0.22, 0.20], grain: 0.22 }),
  dark: TX.woodTexture(23, { base: [0.30, 0.24, 0.18], alt: [0.22, 0.18, 0.14], dark: [0.10, 0.08, 0.07], grain: 0.25, normal: 4.5 }),
  warm: TX.woodTexture(37, { base: [0.58, 0.44, 0.30], alt: [0.48, 0.36, 0.24], dark: [0.25, 0.17, 0.11], grain: 0.3 }),
  crate: TX.woodTexture(53, { base: [0.70, 0.60, 0.45], alt: [0.62, 0.55, 0.45], dark: [0.30, 0.24, 0.18], grain: 0.25 }),
  clap: TX.weatherboardTexture(),
  stone: TX.stoneTexture(),
  flags: TX.flagsTexture(),
  sand: TX.sandTexture(),
  roof: TX.roofTexture(),
  rope: TX.ropeTexture(),
  hull: TX.hullTexture(),
  hullIn: TX.hullInnerTexture(),
};

// ---------------------------------------------------------------- tide-aware material patch
const TIDE_PARS = `
varying vec3 vWPos;
float th3(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,37.719)))*43758.5453); }
float vn3(vec3 p){ vec3 i=floor(p); vec3 f=fract(p); f=f*f*(3.0-2.0*f);
  float a=th3(i), b=th3(i+vec3(1,0,0)), c=th3(i+vec3(0,1,0)), d=th3(i+vec3(1,1,0));
  float e=th3(i+vec3(0,0,1)), g=th3(i+vec3(1,0,1)), h=th3(i+vec3(0,1,1)), k=th3(i+vec3(1,1,1));
  return mix(mix(mix(a,b,f.x),mix(c,d,f.x),f.y), mix(mix(e,g,f.x),mix(h,k,f.x),f.y), f.z); }
`;
function tidePatch(mat, o = {}) {
  const cfg = Object.assign({ str: 1, algae: 1, barn: 1, salt: 1, wetR: 0.3 }, o);
  const key = JSON.stringify(cfg);
  mat.customProgramCacheKey = () => 'tide' + key;
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
      .replace('#include <project_vertex>', `#include <project_vertex>
      vec4 twp = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        twp = instanceMatrix * twp;
      #endif
      vWPos = (modelMatrix * twp).xyz;`);
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\n' + TIDE_PARS)
      .replace('#include <color_fragment>', `#include <color_fragment>
      vec3 wp = vWPos;
      float nA = vn3(wp*vec3(2.1,6.0,2.1)); float nB = vn3(wp*9.0+7.0); float nC = vn3(wp*vec3(70.0,55.0,70.0));
      float hwL = ${HW.toFixed(3)} + (vn3(wp*vec3(1.3,0.0,1.3))-0.5)*0.10 + (nB-0.5)*0.025;
      float tWet = 1.0 - smoothstep(hwL-0.015, hwL+0.015, wp.y);
      float tD = hwL - wp.y;
      vec3 tc = diffuseColor.rgb;
      float salt = (1.0-tWet) * smoothstep(0.3, 0.0, wp.y-hwL) * smoothstep(0.6, 0.8, nB) * ${cfg.salt.toFixed(2)};
      tc = mix(tc, vec3(0.80,0.79,0.75), salt*0.3);
      float band = exp(-pow((tD-0.03)/0.045, 2.0));
      tc *= 1.0 - band*0.4*${cfg.str.toFixed(2)};
      tc *= mix(1.0, 0.52 - 0.12*smoothstep(0.2,1.2,tD), tWet*${cfg.str.toFixed(2)});
      float tAlg = tWet * smoothstep(0.1, 0.8, tD) * smoothstep(0.38, 0.62, nA*0.65+nB*0.35) * ${cfg.algae.toFixed(2)};
      tc = mix(tc, mix(vec3(0.08,0.11,0.05), vec3(0.15,0.16,0.07), nB), tAlg*0.8);
      float tBarn = tWet * smoothstep(0.03,0.25,tD) * (1.0-smoothstep(0.8,1.4,tD)) * smoothstep(0.83, 0.88, nC) * smoothstep(0.5,0.75,nA) * ${cfg.barn.toFixed(2)};
      tc = mix(tc, vec3(0.58,0.56,0.51)*(0.8+0.3*nC), tBarn*0.8);
      diffuseColor.rgb = tc;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
      roughnessFactor = mix(roughnessFactor, ${cfg.wetR.toFixed(2)}, tWet * smoothstep(-0.05, 0.9, tD) * ${cfg.str.toFixed(2)});
      roughnessFactor = mix(roughnessFactor, 0.85, tBarn);`);
  };
  return mat;
}

function stdMat(p, tex, opts = {}) {
  const m = new THREE.MeshStandardMaterial(Object.assign({ roughness: 0.85, metalness: 0, vertexColors: true }, p));
  if (tex) { m.map = tex.map; m.normalMap = tex.normalMap; if (opts.ns) m.normalScale.set(opts.ns, opts.ns); }
  return m;
}
const INT_ENV = 0.35;
const M = {
  boards: tidePatch(stdMat({ roughness: 0.92 }, T.boards, { ns: 1.0 })),
  dark: tidePatch(stdMat({ roughness: 0.8 }, T.dark, { ns: 1.2 }), { wetR: 0.25 }),
  clap: stdMat({ roughness: 0.82 }, T.clap, { ns: 1.0 }),
  lining: stdMat({ roughness: 0.85, envMapIntensity: INT_ENV }, T.warm, { ns: 0.8 }),
  floor: stdMat({ roughness: 0.8, envMapIntensity: INT_ENV }, T.boards, { ns: 0.9 }),
  bench: stdMat({ roughness: 0.7, envMapIntensity: INT_ENV }, T.warm, { ns: 0.9 }),
  stone: tidePatch(stdMat({ roughness: 0.9 }, T.stone, { ns: 1.1 }), { wetR: 0.22 }),
  flags: tidePatch(stdMat({ roughness: 0.88 }, T.flags, { ns: 0.9 }), { wetR: 0.22 }),
  roof: stdMat({ roughness: 0.6, metalness: 0.3 }, T.roof, { ns: 0.9 }),
  trim: stdMat({ roughness: 0.6, color: 0xe8e2d4 }, T.boards, { ns: 0.6 }),
  door: stdMat({ roughness: 0.65, color: 0x9fb8a8 }, T.boards, { ns: 0.9 }),
  crate: stdMat({ roughness: 0.85 }, T.crate, { ns: 1.0 }),
  metal: stdMat({ roughness: 0.45, metalness: 0.85, color: 0x5a5a58 }),
  rust: tidePatch(stdMat({ roughness: 0.75, metalness: 0.4, color: 0x6b3e26 }), { algae: 0.3, barn: 0.2, salt: 0 }),
  paintMetal: stdMat({ roughness: 0.5, metalness: 0.3, color: 0xffffff }),
  rope: stdMat({ roughness: 0.95 }, T.rope, { ns: 1.3 }),
  hull: tidePatch(stdMat({ roughness: 0.45 }, T.hull, { ns: 1.0 }), { str: 0.0, algae: 0.0, barn: 0.0, salt: 0.0 }),
  hullIn: new THREE.MeshStandardMaterial({ map: T.hullIn.map, normalMap: T.hullIn.normalMap, roughness: 0.7, side: THREE.BackSide }),
  varnish: stdMat({ roughness: 0.35, color: 0xd9b48a }, T.warm, { ns: 0.6 }),
  glass: new THREE.MeshStandardMaterial({ color: 0x334048, roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.3, envMapIntensity: 0.35 }),
  plain: stdMat({ roughness: 0.8 }),
  plainInt: stdMat({ roughness: 0.75, envMapIntensity: INT_ENV }),
  seaweed: stdMat({ roughness: 0.28, color: 0xffffff }),
};
M.glass.depthWrite = false;
// unbatched (boat) meshes have no colour attribute
M.hull.vertexColors = false;
const BM = { varnish: M.varnish.clone(), metal: M.metal.clone() };
BM.varnish.vertexColors = false; BM.metal.vertexColors = false;

// ---------------------------------------------------------------- geometry batching
const batches = new Map();
const R = TX.rng(4242);
function tintAttr(geo, tint) {
  const n = geo.attributes.position.count;
  const c = new Float32Array(n * 3);
  const col = new THREE.Color(tint ?? 0xffffff);
  for (let i = 0; i < n; i++) { c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b; }
  geo.setAttribute('color', new THREE.BufferAttribute(c, 3));
}
function addGeo(key, geo, tint) {
  let g = geo.index ? geo.toNonIndexed() : geo;
  for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(k)) g.deleteAttribute(k);
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
  if (!g.attributes.color || tint !== undefined) tintAttr(g, tint);
  g.clearGroups();
  if (!batches.has(key)) batches.set(key, []);
  batches.get(key).push(g);
  return g;
}
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _v = new THREE.Vector3(), _s = new THREE.Vector3(1, 1, 1);
function xform(g, x, y, z, rx = 0, ry = 0, rz = 0, order = 'YXZ') {
  _e.set(rx, ry, rz, order); _q.setFromEuler(_e); _m.compose(_v.set(x, y, z), _q, _s); g.applyMatrix4(_m); return g;
}
const FACE_U = ['z', 'z', 'x', 'x', 'x', 'x'], FACE_V = ['y', 'y', 'z', 'z', 'y', 'y'];
// Box with world-scaled UVs (tile = uvs metres), grain follows the longest axis unless specified.
function box(key, w, h, d, x, y, z, o = {}) {
  const g = new THREE.BoxGeometry(w, h, d);
  const tile = o.tile ?? 1;
  const dims = { x: w, y: h, z: d };
  const grain = o.grain ?? (w >= h && w >= d ? 'x' : d >= h ? 'z' : 'y');
  const uv = g.attributes.uv;
  const ou = R() * 7, ov = R() * 7;
  for (let f = 0; f < 6; f++) {
    const swap = FACE_V[f] === grain;
    for (let k = 0; k < 4; k++) {
      const i = f * 4 + k;
      let u = uv.getX(i) * dims[FACE_U[f]] / tile, v = uv.getY(i) * dims[FACE_V[f]] / tile;
      if (swap) { const t = u; u = v; v = t; }
      if (o.noOffset) uv.setXY(i, u, v); else uv.setXY(i, u + ou, v + ov);
    }
  }
  xform(g, x, y, z, o.rx || 0, o.ry || 0, o.rz || 0, o.order);
  addGeo(key, g, o.tint);
  return g;
}
function cyl(key, rt, rb, h, x, y, z, o = {}) {
  const g = new THREE.CylinderGeometry(rt, rb, h, o.seg ?? 12, 1, o.open ?? false);
  const tile = o.tile ?? 1; const uv = g.attributes.uv; const circ = Math.PI * 2 * Math.max(rt, rb);
  const ou = R() * 5, ov = R() * 5;
  for (let i = 0; i < uv.count; i++) {
    let u = uv.getX(i) * circ / tile, v = uv.getY(i) * h / tile;
    if (!o.noSwap) { const t = u; u = v; v = t; }
    uv.setXY(i, u + ou, v + ov);
  }
  xform(g, x, y, z, o.rx || 0, o.ry || 0, o.rz || 0, o.order);
  addGeo(key, g, o.tint);
  return g;
}
function bar(key, a, b, r, tintC, seg = 8) {
  const dir = new THREE.Vector3().subVectors(b, a); const len = dir.length();
  const g = new THREE.CylinderGeometry(r, r, len, seg);
  g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize()));
  g.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
  addGeo(key, g, tintC);
}
function tint(base, amt) { const c = new THREE.Color(base); const k = 1 + (R() - 0.5) * amt; c.r *= k * (1 + (R() - 0.5) * amt * 0.3); c.g *= k; c.b *= k * (1 + (R() - 0.5) * amt * 0.3); return c.getHex(); }
function flushBatches() {
  for (const [key, list] of batches) {
    const geo = mergeGeometries(list, false);
    const mesh = new THREE.Mesh(geo, M[key]);
    mesh.castShadow = key !== 'glass';
    mesh.receiveShadow = true;
    scene.add(mesh);
  }
  batches.clear();
}

// ---------------------------------------------------------------- collision registry
const walls = [];   // oriented boxes {x,z,hx,hz,c,s,y0,y1}
const floors = [];  // functions (x,z) => height | null
function addWall(x, z, hx, hz, rot, y0, y1) { walls.push({ x, z, hx, hz, c: Math.cos(rot), s: Math.sin(rot), y0, y1 }); }
function addWallAB(x0, x1, z0, z1, y0, y1) { addWall((x0 + x1) / 2, (z0 + z1) / 2, Math.abs(x1 - x0) / 2, Math.abs(z1 - z0) / 2, 0, y0, y1); }
function addFloor(x0, x1, z0, z1, y) { floors.push((x, z) => (x >= x0 && x <= x1 && z >= z0 && z <= z1) ? y : null); }
function addRamp(x0, x1, z0, z1, ya, yb) { floors.push((x, z) => (x >= x0 && x <= x1 && z >= z0 && z <= z1) ? ya + (yb - ya) * (z - z0) / (z1 - z0) : null); }

// ---------------------------------------------------------------- terrain
const SEAWALL_X0 = -14, SEAWALL_X1 = 10;
function coastZ(x) {
  if (x < SEAWALL_X0) return (SEAWALL_X0 - x) * 0.55;
  if (x > SEAWALL_X1) return (x - SEAWALL_X1) * 0.7;
  return 0;
}
function beachY(d) {
  if (d < 14) return -1.35 - 0.045 * d;
  return Math.max(-6.5, -1.98 - (d - 14) * 0.2);
}
function naturalY(d) {
  if (d < -4) return 0.15 + (-4 - d) * 0.03;
  if (d < 0) { const t = (d + 4) / 4; return 0.15 + (-1.35 - 0.15) * (t * t * (3 - 2 * t)); }
  return beachY(d);
}
function rawHeight(x, z) {
  const d = z - coastZ(x);
  let h;
  const tn = ss(SEAWALL_X0, SEAWALL_X0 - 3, x) + ss(SEAWALL_X1, SEAWALL_X1 + 3, x);
  const wallY = z <= -0.5 ? -0.03 : beachY(Math.max(z, 0));
  h = THREE.MathUtils.lerp(wallY, naturalY(d), Math.min(1, tn));
  // land rising inland and hills to the sides
  if (z < -14) h += (-14 - z) * 0.07;
  if (x < -40) h += (-40 - x) * 0.12 * ss(10, -10, d);
  if (x > 30) h += (x - 30) * 0.12 * ss(10, -10, d);
  // surface variation
  const n = Math.sin(x * 0.37 + Math.sin(z * 0.23) * 2.0) * Math.cos(z * 0.31 + x * 0.11);
  const n2 = Math.sin(x * 1.3 + z * 0.7) * Math.sin(z * 1.1 - x * 0.4);
  if (d > 0.6) h += n * 0.07 + n2 * 0.02;
  else if (h > -0.02 && (x < SEAWALL_X0 - 1 || x > SEAWALL_X1 + 1 || z < -14)) h += n * 0.12;
  // shallow scour runnel down the beach
  if (d > 1) h -= 0.08 * Math.exp(-Math.pow((x - (-4.2 + Math.sin(z * 0.35) * 1.4)) / 0.9, 2)) * ss(1, 4, d);
  return h;
}
// non-uniform grid: fine near the site
function axisCoords(min, max, fineMin, fineMax, fine, coarse) {
  const a = [];
  for (let v = min; v < fineMin; v += coarse) a.push(v);
  for (let v = fineMin; v < fineMax; v += fine) a.push(+v.toFixed(3));
  for (let v = fineMax; v <= max + 1e-6; v += coarse) a.push(v);
  return a;
}
const XS = axisCoords(-200, 200, -44, 36, 0.5, 4);
const ZS = axisCoords(-120, 160, -34, 34, 0.5, 4);
const NX = XS.length, NZ = ZS.length;
const HGRID = new Float32Array(NX * NZ);
function findIdx(arr, v) { let lo = 0, hi = arr.length - 2; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (arr[m] <= v) lo = m; else hi = m - 1; } return lo; }
function terrainH(x, z) {
  const i = findIdx(XS, x), j = findIdx(ZS, z);
  const fx = (x - XS[i]) / (XS[i + 1] - XS[i]), fz = (z - ZS[j]) / (ZS[j + 1] - ZS[j]);
  const a = HGRID[j * NX + i], b = HGRID[j * NX + i + 1], c = HGRID[(j + 1) * NX + i], d = HGRID[(j + 1) * NX + i + 1];
  return (a * (1 - fx) + b * fx) * (1 - fz) + (c * (1 - fx) + d * fx) * fz;
}
function buildTerrain() {
  const pos = new Float32Array(NX * NZ * 3), col = new Float32Array(NX * NZ * 3), uv = new Float32Array(NX * NZ * 2), wet = new Float32Array(NX * NZ);
  const cc = new THREE.Color();
  const grass = new THREE.Color(0x58602f), grass2 = new THREE.Color(0x7b7a45), shingle = new THREE.Color(0x8c8270), wrack = new THREE.Color(0x3c3220);
  const sandDry = new THREE.Color(0x9a8b70), sandWet = new THREE.Color(0x6b5f4c), mud = new THREE.Color(0x4e463a), algae = new THREE.Color(0x4a5230), seabed = new THREE.Color(0x5e5847);
  for (let j = 0; j < NZ; j++) for (let i = 0; i < NX; i++) {
    const x = XS[i], z = ZS[j], k = j * NX + i;
    const h = rawHeight(x, z);
    HGRID[k] = h;
    pos[k * 3] = x; pos[k * 3 + 1] = h; pos[k * 3 + 2] = z;
    uv[k * 2] = x / 4; uv[k * 2 + 1] = z / 4;
    const n = Math.sin(x * 0.9 + Math.sin(z * 0.7) * 3) * 0.5 + 0.5, n2 = Math.sin(x * 2.7 - z * 1.9) * Math.sin(z * 3.1 + x) * 0.5 + 0.5;
    let w = 0;
    const d = z - coastZ(x);
    const onLand = h > -0.08 && d < 0.2;
    if (onLand) {
      cc.copy(grass).lerp(grass2, n * 0.6);
      if (z > -2.5 && x > SEAWALL_X0 && x < SEAWALL_X1) cc.copy(shingle).multiplyScalar(0.85);
    } else if (h > HW + 0.3) {
      cc.copy(shingle).lerp(grass, ss(HW + 0.4, 0.1, h) * 0.8);
    } else if (h > HW - 0.12) {
      cc.copy(shingle).lerp(wrack, ss(HW + 0.3, HW + 0.02, h) * (0.6 + n2 * 0.4));
      w = 0.1;
    } else if (h > WATER) {
      const t = ss(HW - 0.1, WATER + 0.15, h);
      cc.copy(sandDry).lerp(sandWet, t).lerp(mud, Math.max(0, t - 0.5) * 0.9 * n);
      cc.lerp(algae, ss(0.7, 0.95, n2) * 0.5 * t);
      w = 0.25 + t * 0.6;
      if (h < WATER + 0.12) w = 0.95;
    } else {
      cc.copy(seabed).multiplyScalar(THREE.MathUtils.clamp(1 + (h - WATER) * 0.15, 0.55, 1));
      w = 1;
    }
    const v = 0.93 + n2 * 0.14;
    col[k * 3] = cc.r * v; col[k * 3 + 1] = cc.g * v; col[k * 3 + 2] = cc.b * v;
    wet[k] = w;
  }
  const idx = [];
  for (let j = 0; j < NZ - 1; j++) for (let i = 0; i < NX - 1; i++) {
    const a = j * NX + i, b = a + 1, c = a + NX, d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('aWet', new THREE.BufferAttribute(wet, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, map: T.sand.map, normalMap: T.sand.normalMap, roughness: 0.95 });
  mat.normalScale.set(0.45, 0.45);
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nattribute float aWet; varying float vWet;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWet = aWet;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vWet;')
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, 0.16, smoothstep(0.2,1.0,vWet));');
  };
  const mesh = new THREE.Mesh(g, mat);
  mesh.receiveShadow = true; mesh.castShadow = true;
  scene.add(mesh);
}

// ---------------------------------------------------------------- seawall, apron, steps, slipway
const STEPS_X0 = 0.8, STEPS_X1 = 2.6;
const SLIP_X0 = -9.4, SLIP_X1 = -5.6, SLIP_Z1 = 12;
const PIER_X0 = 4.6, PIER_X1 = 7.0, PIER_Z0 = -1.2, PIER_Z1 = 21.5, DECK = 0.1;
function buildQuay() {
  // seawall face: blocks from apron level down to beach, battered
  const segs = [[SEAWALL_X0, SLIP_X0], [SLIP_X1, STEPS_X0], [STEPS_X1, SEAWALL_X1]];
  for (const [a, b] of segs) {
    box('stone', b - a, 2.4, 0.9, (a + b) / 2, -1.2, -0.15, { tile: 2, grain: 'x', noOffset: false });
    // coping stones on top
    for (let x = a; x < b - 0.01; x += 0.9) {
      const w = Math.min(0.9, b - x);
      box('stone', w - 0.02, 0.16, 0.6, x + w / 2, 0.0, 0.02, { tile: 2, tint: tint(0xd8d2c8, 0.12) });
    }
  }
  // returns at the natural shore ends
  box('stone', 0.9, 2.4, 3.0, SEAWALL_X0 - 0.4, -1.2, -1.2, { tile: 2 });
  box('stone', 0.9, 2.4, 3.0, SEAWALL_X1 + 0.4, -1.2, -1.2, { tile: 2 });
  // apron paving
  box('flags', SEAWALL_X1 - SEAWALL_X0, 0.12, 3.0, (SEAWALL_X0 + SEAWALL_X1) / 2, -0.04, -1.8, { tile: 2, grain: 'x' });
  box('flags', 8.5, 0.12, 2.6, -7.5, -0.04, -12.6, { tile: 2, grain: 'x' }); // path behind workshop
  // apron floor (walk on y=0.02)
  addFloor(SEAWALL_X0 - 0.5, SEAWALL_X1 + 0.5, -3.3, 0.35, 0.02);
  // seawall collision: you can't walk off the quay or into the wall from the beach
  const railSegs = [[SEAWALL_X0, SLIP_X0], [SLIP_X1, STEPS_X0], [STEPS_X1, PIER_X0 - 0.15], [PIER_X1 + 0.15, SEAWALL_X1]];
  for (const [a, b] of railSegs) addWallAB(a, b, -0.05, 0.42, 0.06, 1.3);
  for (const [a, b] of segs) {
    addWallAB(a, b, -0.4, 0.42, -4, -0.06);          // wall face for people on the beach
  }
  // timber post-and-rail along the quay edge
  for (const [a, b] of railSegs) {
    const n = Math.max(1, Math.round((b - a) / 2));
    for (let i = 0; i <= n; i++) {
      const x = a + 0.12 + (b - a - 0.24) * i / n;
      box('boards', 0.1, 1.0, 0.1, x, 0.58, 0.18, { tint: tint(0xbdb5a8, 0.15) });
    }
    box('boards', b - a - 0.1, 0.07, 0.09, (a + b) / 2, 1.02, 0.18, { tint: 0xc8c0b2 });
    box('boards', b - a - 0.1, 0.05, 0.06, (a + b) / 2, 0.6, 0.18, { tint: 0xb8b0a2 });
  }
  // mooring rings set into the wall face (used by the boat's painter)
  for (const x of [-3.0, 3.6, -12.0]) {
    const ring = new THREE.TorusGeometry(0.09, 0.016, 8, 20); xform(ring, x, -0.75, 0.33, 0, 0, 0); addGeo('rust', ring);
    box('rust', 0.06, 0.06, 0.08, x, -0.66, 0.3);
  }
  // steps down to the beach (between boat and pier)
  const nSteps = 8, rise = 1.4 / nSteps, run = 0.34;
  for (let i = 0; i < nSteps; i++) {
    const top = -(i + 1) * rise + 0.02;
    const z0 = 0.42 + i * run;
    box('stone', STEPS_X1 - STEPS_X0, top + 1.6, run + 0.02, (STEPS_X0 + STEPS_X1) / 2, (top - 1.6) / 2, z0 + run / 2, { tile: 2, grain: 'x', tint: tint(0xe0dbd2, 0.1) });
    addFloor(STEPS_X0, STEPS_X1, z0 - 0.01, z0 + run, top);
  }
  addFloor(STEPS_X0, STEPS_X1, -0.1, 0.42, 0.02);
  const stepsEnd = 0.42 + nSteps * run;
  // stepped cheek walls with coping, and an iron handrail
  for (const x of [STEPS_X0 - 0.15, STEPS_X1 + 0.15]) {
    for (let i = 0; i < nSteps; i++) {
      const top = -(i + 1) * rise + 0.02 + 0.35;
      const z0 = 0.42 + i * run;
      box('stone', 0.3, top + 1.7, run + 0.01, x, (top - 1.7) / 2, z0 + run / 2, { tile: 2, grain: 'z', tint: tint(0xd8d2c8, 0.08) });
      box('stone', 0.36, 0.08, run + 0.03, x, top + 0.04, z0 + run / 2, { tile: 2, tint: 0xe2ddd4 });
    }
    addWallAB(x - 0.15, x + 0.15, 0.3, stepsEnd + 0.05, -4, 2);
  }
  {
    const hx = STEPS_X0 + 0.05, yA = 0.02 + 0.92, yB = -1.38 + 0.92;
    const a = new THREE.Vector3(hx, yA, 0.35), b = new THREE.Vector3(hx, yB, stepsEnd - 0.1);
    bar('paintMetal', a, b, 0.024, 0x2c3b3a);
    bar('paintMetal', new THREE.Vector3(hx, yA, 0.35), new THREE.Vector3(hx, yA, -0.2), 0.024, 0x2c3b3a);
    for (let i = 0; i <= 3; i++) {
      const t = i / 3, z = 0.4 + (stepsEnd - 0.55) * t, yTop = yA + (yB - yA) * t;
      const stepI = Math.min(nSteps - 1, Math.max(0, Math.floor((z - 0.42) / run)));
      const yBot = z < 0.42 ? 0.02 : -(stepI + 1) * rise + 0.02;
      bar('paintMetal', new THREE.Vector3(hx, yBot, z), new THREE.Vector3(hx, yTop, z), 0.02, 0x2c3b3a);
    }
  }

  // slipway: setts ramp from the workshop doors into the water
  const slipLen = SLIP_Z1;
  const slope = Math.atan2(2.1, slipLen);
  const L = Math.hypot(slipLen, 2.1);
  box('flags', SLIP_X1 - SLIP_X0, 0.3, L, (SLIP_X0 + SLIP_X1) / 2, -1.05 - 0.15, slipLen / 2, { rx: slope, tile: 1.2, grain: 'z' });
  addRamp(SLIP_X0, SLIP_X1, 0.0, slipLen, 0.02, -2.08);
  // slipway side kerbs and fill
  for (const x of [SLIP_X0 - 0.15, SLIP_X1 + 0.15]) {
    box('stone', 0.3, 0.5, L, x, -1.0, slipLen / 2, { rx: slope, tile: 2, grain: 'z' });
    // fill below to beach
    box('stone', 0.3, 1.8, L, x, -1.0 - 0.9 + 0.25, slipLen / 2, { rx: slope, tile: 2, grain: 'z' });
    addWallAB(x - 0.15, x + 0.15, 0.0, 7.6, -4, 2);
  }
  // timber runners on slipway (worn, tide-stained)
  for (const x of [-8.3, -6.7]) box('dark', 0.18, 0.08, L, x, -1.05 + 0.03, slipLen / 2, { rx: slope, grain: 'z' });
}

// ---------------------------------------------------------------- workshop
const WS = { x0: -11, x1: -4, z0: -11, z1: -2, floor: 0.15, eave: 3.15, ridge: 4.9 };
function wallRun(axis, fixed, a0, a1, y0, y1, openings, thick = 0.16) {
  // builds a wall along x (axis='x', at z=fixed) or z (axis='z', at x=fixed) with rectangular openings
  const ops = [...openings].sort((p, q) => p[0] - q[0]);
  const pieces = [];
  let cur = a0;
  for (const o of ops) { if (o[0] > cur) pieces.push([cur, o[0], y0, y1]); pieces.push([o[0], o[1], y0, o[2]]); pieces.push([o[0], o[1], o[3], y1]); cur = o[1]; }
  if (cur < a1) pieces.push([cur, a1, y0, y1]);
  for (const [p0, p1, q0, q1] of pieces) {
    if (q1 - q0 < 0.01 || p1 - p0 < 0.01) continue;
    const len = p1 - p0, mid = (p0 + p1) / 2, h = q1 - q0, ym = (q0 + q1) / 2;
    const outSign = axis === 'x' ? (fixed > -6.5 ? 1 : -1) : (fixed > -7.5 ? 1 : -1);
    if (axis === 'x') {
      box('clap', len, h, 0.03, mid, ym, fixed + outSign * (thick / 2), { tile: 2, grain: 'x', noOffset: true });
      box('lining', len, h, 0.03, mid, ym, fixed - outSign * (thick / 2), { tile: 1, grain: 'y', tint: tint(0xd8c8b0, 0.08) });
      if (q0 < 2) addWallAB(p0, p1, fixed - thick / 2, fixed + thick / 2, q0, q1);
    } else {
      box('clap', 0.03, h, len, fixed + outSign * (thick / 2), ym, mid, { tile: 2, grain: 'z', noOffset: true });
      box('lining', 0.03, h, len, fixed - outSign * (thick / 2), ym, mid, { tile: 1, grain: 'y', tint: tint(0xd8c8b0, 0.08) });
      if (q0 < 2) addWallAB(fixed - thick / 2, fixed + thick / 2, p0, p1, q0, q1);
    }
  }
}
function windowFrame(axis, fixed, a0, a1, y0, y1, outSign) {
  const w = a1 - a0, h = y1 - y0, m = (a0 + a1) / 2, ym = (y0 + y1) / 2;
  const fw = 0.07, depth = 0.24;
  const B = (bw, bh, bd, x, y, z) => axis === 'x' ? box('trim', bw, bh, bd, x, y, z) : box('trim', bd, bh, bw, z, y, x);
  // frame: sill, head, jambs, glazing bars
  B(w + 0.16, 0.06, depth + 0.08, m, y0 - 0.02, fixed + outSign * 0.04);
  B(w + 0.1, fw, depth, m, y1 + fw / 2 - 0.02, fixed);
  B(fw, h, depth, a0 + fw / 2, ym, fixed); B(fw, h, depth, a1 - fw / 2, ym, fixed);
  B(0.04, h, 0.05, m, ym, fixed + outSign * 0.02);
  B(w, 0.04, 0.05, m, ym, fixed + outSign * 0.02);
  if (axis === 'x') box('glass', w - 0.1, h - 0.06, 0.01, m, ym, fixed + outSign * 0.01);
  else box('glass', 0.01, h - 0.06, w - 0.1, fixed + outSign * 0.01, ym, m);
}
function buildWorkshop() {
  const { x0, x1, z0, z1, floor, eave, ridge } = WS;
  const fy = floor;
  // stone plinth
  box('stone', x1 - x0 + 0.3, 0.5, z1 - z0 + 0.3, (x0 + x1) / 2, fy - 0.27, (z0 + z1) / 2, { tile: 2, grain: 'x' });
  // floor boards
  for (let x = x0 + 0.08; x < x1 - 0.08; x += 0.16) {
    box('floor', 0.155, 0.04, z1 - z0 - 0.16, x + 0.08, fy - 0.01, (z0 + z1) / 2, { grain: 'z', tint: tint(0xcfc2ae, 0.18) });
  }
  addFloor(x0, x1, z0, z1 + 0.05, fy + 0.01);
  // threshold
  box('dark', 3.4, 0.06, 0.25, -7.5, fy + 0.0, z1 + 0.05, { tint: 0x9a8a7a });
  // walls
  const y0 = fy, y1 = eave;
  wallRun('x', z1, x0, x1, y0, y1, [[-9.2, -5.8, y0, 2.85]]);                       // front (doors)
  wallRun('x', z0, x0, x1, y0, y1, [[-8.4, -7.2, 1.3, 2.2]]);                        // back (small window)
  wallRun('z', x1, z0, z1, y0, y1, [[-8.6, -7.4, 1.25, 2.25], [-5.2, -4.0, 1.25, 2.25]]); // east (sun side)
  wallRun('z', x0, z0, z1, y0, y1, [[-7.2, -5.8, 1.35, 2.25]]);                      // west over bench
  windowFrame('z', x1, -8.6, -7.4, 1.25, 2.25, 1);
  windowFrame('z', x1, -5.2, -4.0, 1.25, 2.25, 1);
  windowFrame('z', x0, -7.2, -5.8, 1.35, 2.25, -1);
  windowFrame('x', z0, -8.4, -7.2, 1.3, 2.2, -1);
  // corner posts & door posts, sole plates, wall plates
  for (const [x, z] of [[x0, z0], [x1, z0], [x0, z1], [x1, z1]]) box('trim', 0.2, eave - fy + 0.05, 0.2, x, (eave + fy) / 2, z, { tint: 0xe2dccd });
  for (const x of [-9.25, -5.75]) box('trim', 0.14, 2.75, 0.24, x, fy + 1.37, z1, { tint: 0xe2dccd });
  box('trim', 3.6, 0.16, 0.24, -7.5, 2.86, z1, { tint: 0xe2dccd });
  // interior studs and girts (frame visible inside)
  for (let z = z0 + 1.0; z < z1 - 0.3; z += 1.1) {
    if (!(z > -8.7 && z < -7.3) && !(z > -5.3 && z < -3.9)) box('lining', 0.08, eave - fy, 0.1, x1 - 0.14, (eave + fy) / 2, z, { tint: 0xb59e7c });
    if (!(z > -7.3 && z < -5.7)) box('lining', 0.08, eave - fy, 0.1, x0 + 0.14, (eave + fy) / 2, z, { tint: 0xb59e7c });
  }
  for (const zz of [z0 + 0.14]) for (let x = x0 + 1.0; x < x1 - 0.3; x += 1.2) if (!(x > -8.5 && x < -7.1)) box('lining', 0.1, eave - fy, 0.08, x, (eave + fy) / 2, zz, { tint: 0xb59e7c });
  box('lining', 0.1, 0.12, z1 - z0, x1 - 0.14, 1.0, (z0 + z1) / 2, { tint: 0xa8916f, grain: 'z' });
  box('lining', 0.1, 0.12, z1 - z0, x0 + 0.14, 1.0, (z0 + z1) / 2, { tint: 0xa8916f, grain: 'z' });
  // gables (triangular, clapboard outside / lining inside)
  const span = x1 - x0, cx = (x0 + x1) / 2, rise = ridge - eave;
  const tri = new THREE.Shape([new THREE.Vector2(-span / 2 - 0.05, 0), new THREE.Vector2(span / 2 + 0.05, 0), new THREE.Vector2(0, rise)]);
  for (const [z, s] of [[z1, 1], [z0, -1]]) {
    for (const [key, off] of [['clap', 0.08], ['lining', -0.08]]) {
      const g = new THREE.ExtrudeGeometry(tri, { depth: 0.03, bevelEnabled: false });
      g.translate(0, 0, -0.015);
      if (key === 'clap') { const guv = g.attributes.uv; for (let i = 0; i < guv.count; i++) guv.setXY(i, guv.getX(i) * 0.5, guv.getY(i) * 0.5 + 0.075); }
      xform(g, cx, eave, z + s * off);
      addGeo(key, g, key === 'lining' ? 0xd0bfa6 : undefined);
    }
  }
  // roof: two slopes, corrugated, with rafters + tie beams inside
  const pitch = Math.atan2(rise, span / 2);
  const slopeLen = Math.hypot(rise, span / 2) + 0.45;
  for (const s of [-1, 1]) {
    const mx = cx + s * (span / 4 + 0.18 * Math.cos(pitch)), my = eave + rise / 2 - 0.18 * Math.sin(pitch) + 0.1;
    box('roof', slopeLen, 0.04, z1 - z0 + 0.7, mx, my + 0.02, (z0 + z1) / 2, { rz: -s * pitch, tile: 2, grain: 'z', noOffset: true });
    // purlins (under the sheet)
    for (let k = 0; k < 4; k++) {
      const t = (k + 0.5) / 4;
      const px = cx + s * (span / 2) * (1 - t), py = eave + rise * t;
      box('lining', 0.08, 0.12, z1 - z0 + 0.3, px, py - 0.02, (z0 + z1) / 2, { grain: 'z', tint: 0x9c8466 });
    }
    // fascia / barge boards
    for (const z of [z0 - 0.35, z1 + 0.35]) box('trim', slopeLen, 0.2, 0.04, mx, my - 0.06, z, { rz: -s * pitch, tint: 0xe6e0d2 });
  }
  box('roof', 0.3, 0.06, z1 - z0 + 0.7, cx, ridge + 0.1, (z0 + z1) / 2, { grain: 'z', tint: 0x8a6a5a });
  for (let z = z0 + 0.3; z <= z1 - 0.2; z += 1.75) {
    for (const s of [-1, 1]) box('lining', Math.hypot(rise, span / 2), 0.14, 0.07, cx + s * span / 4, eave + rise / 2 - 0.12, z, { rz: -s * pitch, tint: 0xa58b69 });
    box('lining', span, 0.16, 0.09, cx, eave + 0.05, z, { tint: 0xa58b69 });
  }
  // the big doors, swung open flat against the front wall
  for (const [hx, s] of [[-9.25, -1], [-5.75, 1]]) {
    const w = 1.7, cxl = hx + s * (w / 2 + 0.08);
    for (let k = 0; k < 9; k++) box('door', w / 9 - 0.006, 2.6, 0.04, cxl - s * (w / 2) + s * (k + 0.5) * w / 9, fy + 1.33, z1 + 0.22, { grain: 'y', tint: tint(0xffffff, 0.08) });
    for (const y of [0.45, 1.45, 2.45]) box('door', w, 0.12, 0.04, cxl, fy + y, z1 + 0.27, { tint: 0xd8e2d8 });
    // diagonal brace
    box('door', Math.hypot(w - 0.2, 1.0), 0.11, 0.035, cxl, fy + 0.95, z1 + 0.27, { rz: s * Math.atan2(1.0, w - 0.2), tint: 0xd0dcd0 });
    box('door', Math.hypot(w - 0.2, 1.0), 0.11, 0.035, cxl, fy + 1.95, z1 + 0.27, { rz: s * Math.atan2(1.0, w - 0.2), tint: 0xd0dcd0 });
    for (const y of [0.45, 2.45]) box('metal', 0.5, 0.04, 0.02, hx + s * 0.28, fy + y, z1 + 0.3);
    addWallAB(Math.min(hx, hx + s * 1.85), Math.max(hx, hx + s * 1.85), z1 + 0.15, z1 + 0.33, 0, 3);
  }
  // lifebuoy and name board on the front
  {
    const tor = new THREE.TorusGeometry(0.3, 0.07, 10, 28); xform(tor, -4.6, 1.75, z1 + 0.13); addGeo('paintMetal', tor, 0xd8541e);
    for (let k = 0; k < 4; k++) { const t2 = new THREE.TorusGeometry(0.3, 0.074, 6, 6, 0.32); xform(t2, -4.6, 1.75, z1 + 0.13, 0, 0, k * Math.PI / 2 + 0.6); addGeo('paintMetal', t2, 0xeeeae0); }
    box('metal', 0.04, 0.06, 0.1, -4.6, 2.07, z1 + 0.1);
  }
  buildWorkshopInterior();
}

function ropeCoil(cx, cy, cz, r0, turns, thick, key = 'rope', tintC = 0xc9a777, axis = 'flat', rot = 0) {
  // flat Flemish-style coil: spiral of tube
  const pts = [];
  const n = turns * 28;
  for (let i = 0; i <= n; i++) {
    const t = i / 28 * Math.PI * 2;
    const r = r0 + (i / n) * turns * thick * 1.05;
    const lift = axis === 'flat' ? Math.sin(t * 0.5) * 0.004 + (i / n) * 0.01 : 0;
    pts.push(axis === 'flat' ? new THREE.Vector3(Math.cos(t) * r, lift, Math.sin(t) * r) : new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, (i / n) * turns * thick * 0.9 - turns * thick * 0.45));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  const g = new THREE.TubeGeometry(curve, n, thick / 2, 6, false);
  const uv = g.attributes.uv; const len = curve.getLength();
  for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * len / 0.2);
  xform(g, cx, cy, cz, 0, rot, 0);
  addGeo(key, g, tintC);
}
function ropeAlong(points, thick, tintC = 0xc9a777) {
  const curve = new THREE.CatmullRomCurve3(points);
  const len = curve.getLength();
  const g = new THREE.TubeGeometry(curve, Math.max(8, Math.round(len * 14)), thick / 2, 6, false);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * len / 0.2);
  addGeo('rope', g, tintC);
}

function buildWorkshopInterior() {
  const fy = WS.floor;
  // workbench along the west wall
  const bx = -10.45, bz0 = -9.4, bz1 = -4.8, top = fy + 0.9;
  box('bench', 0.75, 0.07, bz1 - bz0, bx, top - 0.035, (bz0 + bz1) / 2, { grain: 'z', tint: 0xc9a988 });
  box('bench', 0.09, 0.2, bz1 - bz0, bx + 0.36, top - 0.13, (bz0 + bz1) / 2, { grain: 'z', tint: 0xb89878 });
  for (const z of [bz0 + 0.1, (bz0 + bz1) / 2, bz1 - 0.1]) for (const dx of [-0.3, 0.3]) box('bench', 0.08, top - fy, 0.08, bx + dx, (top + fy) / 2, z, { tint: 0xa88868 });
  box('bench', 0.65, 0.04, bz1 - bz0 - 0.2, bx, fy + 0.22, (bz0 + bz1) / 2, { grain: 'z', tint: 0x9c8064 }); // lower shelf
  addWallAB(bx - 0.4, bx + 0.42, bz0, bz1, 0, 1.0);
  // vise
  box('metal', 0.18, 0.12, 0.25, bx + 0.42, top - 0.02, -6.0);
  box('metal', 0.04, 0.12, 0.25, bx + 0.53, top - 0.02, -6.0);
  cyl('metal', 0.012, 0.012, 0.32, bx + 0.6, top - 0.02, -6.0, { rz: Math.PI / 2, seg: 6 });
  // tool board on wall over the bench, with hanging tools
  box('lining', 0.03, 0.9, 2.2, WS.x0 + 0.2, fy + 1.75, -8.4, { grain: 'z', tint: 0x8f7a5c });
  const wallX = WS.x0 + 0.24;
  // saw
  box('metal', 0.01, 0.12, 0.55, wallX + 0.02, fy + 1.85, -9.1, { rx: 0.15 }); box('bench', 0.03, 0.12, 0.14, wallX + 0.03, fy + 1.87, -8.78, { tint: 0x8a5a36 });
  // hammers / mallet
  for (const [z, l] of [[-8.6, 0.34], [-8.4, 0.3]]) { cyl('bench', 0.013, 0.013, l, wallX + 0.04, fy + 1.6, z, { seg: 6, tint: 0xc09060 }); box('metal', 0.03, 0.03, 0.11, wallX + 0.04, fy + 1.6 + l / 2, z); }
  box('bench', 0.07, 0.09, 0.15, wallX + 0.05, fy + 1.98, -8.1, { tint: 0xb0855a }); cyl('bench', 0.014, 0.014, 0.25, wallX + 0.05, fy + 1.82, -8.1, { seg: 6, tint: 0xb0855a });
  // chisels in a rack
  box('bench', 0.06, 0.04, 0.5, wallX + 0.04, fy + 1.45, -7.75, { grain: 'z', tint: 0x9a7a58 });
  for (let i = 0; i < 6; i++) { cyl('bench', 0.012, 0.012, 0.11, wallX + 0.05, fy + 1.52, -7.95 + i * 0.08, { seg: 6, tint: 0x9c6438 }); box('metal', 0.012, 0.13, 0.008 + i * 0.003, wallX + 0.05, fy + 1.39, -7.95 + i * 0.08); }
  // square & brace
  box('metal', 0.006, 0.3, 0.03, wallX + 0.02, fy + 1.95, -7.6); box('metal', 0.006, 0.03, 0.2, wallX + 0.02, fy + 2.09, -7.52);
  // tools on the bench top
  // plane
  box('bench', 0.07, 0.06, 0.24, bx + 0.1, top + 0.03, -5.3, { tint: 0xc08a58 }); box('metal', 0.02, 0.05, 0.06, bx + 0.1, top + 0.07, -5.28, { rx: 0.5 });
  // mallet lying down
  cyl('bench', 0.014, 0.014, 0.28, bx + 0.05, top + 0.015, -6.6, { rz: Math.PI / 2, rx: 0, ry: 0.4, seg: 6, tint: 0xb38658 });
  box('bench', 0.09, 0.08, 0.14, bx - 0.12, top + 0.04, -6.55, { ry: 0.4, tint: 0xa87a50 });
  // hand drill / chisel / pencil and offcuts
  for (let i = 0; i < 5; i++) box('crate', 0.05 + R() * 0.25, 0.025, 0.06 + R() * 0.1, bx + (R() - 0.5) * 0.5, top + 0.013, -8.9 + R() * 1.6, { ry: R() * 3, tint: tint(0xd8c09a, 0.2) });
  box('metal', 0.012, 0.012, 0.2, bx + 0.2, top + 0.006, -7.2, { ry: 0.3 });
  cyl('bench', 0.012, 0.012, 0.12, bx + 0.2, top + 0.006, -7.31, { rz: Math.PI / 2, ry: 0.3 + Math.PI / 2, seg: 6, tint: 0x8c3a28 });
  // paint tins & jars on a shelf on the back wall
  box('bench', 2.4, 0.04, 0.3, -9.5, fy + 1.55, WS.z0 + 0.3, { tint: 0xa88a66 });
  box('bench', 2.4, 0.04, 0.3, -9.5, fy + 2.05, WS.z0 + 0.3, { tint: 0xa88a66 });
  const tinCols = [0x2f5b66, 0xb33a26, 0xe7e1d0, 0x3e4b3a, 0x8a6a2a, 0x5b6a72];
  for (let i = 0; i < 9; i++) {
    const x = -10.5 + i * 0.25 + R() * 0.05, shelf = i % 2 ? 1.55 : 2.05;
    const r = 0.06 + R() * 0.03, h = 0.1 + R() * 0.1;
    cyl('paintMetal', r, r, h, x, fy + shelf + 0.02 + h / 2, WS.z0 + 0.3 + (R() - 0.5) * 0.08, { tint: tinCols[i % tinCols.length], seg: 14 });
  }
  // sawhorses with a plank (new strake being shaped)
  for (const z of [-7.8, -5.2]) {
    box('crate', 0.9, 0.08, 0.1, -7.2, fy + 0.7, z, { tint: 0xd2b996 });
    for (const sx of [-0.35, 0.35]) for (const sz of [-1, 1]) box('crate', 0.06, 0.75, 0.06, -7.2 + sx, fy + 0.35, z + sz * 0.15, { rx: sz * 0.2, tint: 0xc4ab86 });
    addWallAB(-7.7, -6.7, z - 0.22, z + 0.22, 0, 0.8);
  }
  box('crate', 0.28, 0.025, 3.6, -7.2, fy + 0.755, -6.5, { grain: 'z', ry: 0.04, tint: 0xe0c8a0 });
  // wood shavings under the sawhorses (instanced curls)
  {
    const g = new THREE.TorusGeometry(0.025, 0.006, 4, 8, Math.PI * 1.4);
    const mat = new THREE.MeshStandardMaterial({ color: 0xe6cfa6, roughness: 0.8, envMapIntensity: INT_ENV });
    const n = 260; const im = new THREE.InstancedMesh(g, mat, n);
    const d = new THREE.Object3D();
    for (let i = 0; i < n; i++) {
      const near = i < 160;
      d.position.set(near ? -7.2 + (R() - 0.5) * 1.3 : -10.0 + (R() - 0.5) * 0.9, fy + 0.02, near ? -6.5 + (R() - 0.5) * 3.4 : -7 + (R() - 0.5) * 4);
      d.rotation.set(Math.PI / 2 + (R() - 0.5) * 0.8, R() * 6, R() * 6);
      const s = 0.7 + R() * 0.9; d.scale.set(s, s, s);
      d.updateMatrix(); im.setMatrixAt(i, d.matrix);
    }
    im.receiveShadow = true; scene.add(im);
  }
  // crates stacked by the door, ready to carry out
  const crate = (x, y, z, ry = 0) => {
    const w = 0.6, h = 0.4, d = 0.42;
    for (let k = 0; k < 3; k++) {
      box('crate', w, h / 3 - 0.012, 0.018, x, y + (k + 0.5) * h / 3, z - d / 2, { ry, tint: tint(0xe0d0b0, 0.12) });
    }
    // proper oriented crate via local transforms
    const g = new THREE.Group();
    return g;
  };
  buildCrate(-5.0, fy, -3.0, 0.1); buildCrate(-5.0, fy + 0.41, -3.0, -0.08); buildCrate(-4.95, fy, -3.7, 0.05);
  addWallAB(-5.4, -4.6, -4.0, -2.7, 0, 1.0);
  // oars and boathook leaning in the corner
  for (let i = 0; i < 3; i++) {
    const x = WS.x1 - 0.35 - i * 0.12, z = WS.z0 + 0.35;
    const L2 = 2.5 + i * 0.1;
    cyl('varnish', 0.022, 0.022, L2, x, fy + L2 / 2 * Math.cos(0.18), z + 0.2, { rx: -0.18, seg: 8 });
    box('varnish', 0.012, 0.6, 0.13, x, fy + 0.32, z + 0.2 + 0.2, { rx: -0.18 });
  }
  // stool and a drum
  cyl('bench', 0.17, 0.17, 0.04, -9.4, fy + 0.62, -5.6, { seg: 16, tint: 0xb08860 });
  for (let k = 0; k < 3; k++) { const a = k * 2.1; cyl('bench', 0.017, 0.022, 0.62, -9.4 + Math.cos(a) * 0.11, fy + 0.31, -5.6 + Math.sin(a) * 0.11, { rx: Math.sin(a) * 0.15, rz: -Math.cos(a) * 0.15, seg: 6, tint: 0xa07850 }); }
  cyl('paintMetal', 0.29, 0.29, 0.88, -10.5, fy + 0.44, -3.0, { seg: 20, tint: 0x2f4f5a });
  addWallAB(-10.85, -10.15, -3.35, -2.65, 0, 1.0);
  // rope coil hanging on a peg on the east wall
  cyl('bench', 0.02, 0.02, 0.18, WS.x1 - 0.2, fy + 1.9, -6.4, { rz: Math.PI / 2, seg: 6, tint: 0x8a6a48 });
  ropeCoil(WS.x1 - 0.26, fy + 1.62, -6.4, 0.2, 5, 0.028, 'rope', 0xc8a676, 'wall', Math.PI / 2);
  // hanging lamp
  cyl('metal', 0.005, 0.005, 0.9, -7.5, WS.eave - 0.4, -6.6, { seg: 4 });
  cyl('paintMetal', 0.04, 0.2, 0.12, -7.5, WS.eave - 0.9, -6.6, { seg: 18, open: true, tint: 0x2d4a3e });
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 8), new THREE.MeshBasicMaterial({ color: 0xfff1d0 }));
  bulb.position.set(-7.5, WS.eave - 0.97, -6.6); scene.add(bulb);
  const lamp = new THREE.PointLight(0xffc78a, 7, 11, 1.6);
  lamp.position.set(-7.5, WS.eave - 1.02, -6.6); scene.add(lamp);
  const fill = new THREE.PointLight(0xffe0bc, 2.2, 7, 1.5);
  fill.position.set(-10.2, 2.0, -8.5); scene.add(fill);
}
function buildCrate(x, y, z, ry) {
  // a slatted fish/tool crate built in local space then moved
  const parts = [];
  const w = 0.62, h = 0.4, d = 0.44;
  const local = [];
  for (let k = 0; k < 3; k++) for (const s of [-1, 1]) { local.push([w, h / 3 - 0.014, 0.018, 0, (k + 0.5) * h / 3, s * (d / 2 - 0.009)]); local.push([0.018, h / 3 - 0.014, d - 0.04, s * (w / 2 - 0.009), (k + 0.5) * h / 3, 0]); }
  local.push([w - 0.02, 0.016, d - 0.02, 0, 0.012, 0]);
  for (const s of [-1, 1]) for (const t of [-1, 1]) local.push([0.04, h, 0.04, s * (w / 2 - 0.03), h / 2, t * (d / 2 - 0.03)]);
  for (const [bw, bh, bd, lx, ly, lz] of local) {
    const g = new THREE.BoxGeometry(bw, bh, bd);
    const uv = g.attributes.uv; const ou = R() * 5;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * Math.max(bw, bd) + ou, uv.getY(i) * 0.12);
    g.translate(lx, ly, lz); g.rotateY(ry); g.translate(x, y, z);
    addGeo('crate', g, tint(0xe6d6b8, 0.12));
  }
}

// ---------------------------------------------------------------- pier
function buildPier() {
  const z0 = PIER_Z0, z1 = PIER_Z1, x0 = PIER_X0, x1 = PIER_X1, w = x1 - x0, cx = (x0 + x1) / 2;
  // deck planks running across the pier, salt-worn with gaps and slight unevenness
  for (let z = z0; z < z1; z += 0.165) {
    const worn = z > 6 ? 1 : 0;
    box('boards', w + 0.1 + (R() - 0.5) * 0.06, 0.045, 0.15, cx + (R() - 0.5) * 0.04, DECK - 0.022 + (R() - 0.5) * 0.006, z + 0.08, { grain: 'x', ry: (R() - 0.5) * 0.008, rz: (R() - 0.5) * 0.006, tint: tint(worn ? 0xd8d4cc : 0xe2dcd0, 0.22) });
  }
  addFloor(x0, x1, z0, z1, DECK);
  // galvanised nail heads over each stringer, some weeping rust
  {
    const ng = new THREE.CylinderGeometry(0.007, 0.007, 0.006, 6);
    const nm = new THREE.MeshStandardMaterial({ color: 0x5b534a, roughness: 0.6, metalness: 0.6 });
    const cnt = Math.ceil((z1 - z0) / 0.165) * 6;
    const nails = new THREE.InstancedMesh(ng, nm, cnt); const d = new THREE.Object3D(); let n = 0;
    const rust = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.02, 0.05), new THREE.MeshStandardMaterial({ color: 0x6a3a1c, roughness: 0.9, transparent: true, opacity: 0.55, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }), cnt); let rn = 0;
    for (let z = z0; z < z1; z += 0.165) for (const x of [x0 + 0.1, cx, x1 - 0.1]) for (const dz of [0.045, 0.115]) {
      if (n >= cnt) break;
      d.position.set(x + (R() - 0.5) * 0.02, DECK + 0.002, z + dz); d.rotation.set(0, 0, 0); d.scale.set(1, 1, 1); d.updateMatrix(); nails.setMatrixAt(n++, d.matrix);
      if (R() < 0.35 && rn < cnt) { d.position.set(x, DECK + 0.0015, z + dz + 0.02); d.rotation.set(-Math.PI / 2, 0, (R() - 0.5) * 0.4); const sc = 0.6 + R(); d.scale.set(sc, sc, 1); d.updateMatrix(); rust.setMatrixAt(rn++, d.matrix); }
    }
    nails.count = n; rust.count = rn; nails.receiveShadow = true; rust.receiveShadow = true; scene.add(nails, rust);
  }
  // stringers & joists
  for (const x of [x0 + 0.1, cx, x1 - 0.1]) box('dark', 0.12, 0.25, z1 - z0, x, DECK - 0.18, (z0 + z1) / 2, { grain: 'z' });
  // piles with cross bracing
  const pileZ = []; for (let z = 1.2; z < z1; z += 2.4) pileZ.push(z);
  pileZ.push(z1 - 0.15);
  for (const z of pileZ) {
    const bed = Math.min(terrainH(x0, z), terrainH(x1, z));
    for (const x of [x0 - 0.05, x1 + 0.05]) {
      const top = DECK + (z > z1 - 1 ? 0.9 : 0.02), bot = bed - 0.6;
      cyl('dark', 0.14, 0.15, top - bot, x, (top + bot) / 2, z, { seg: 12, tint: tint(0xffffff, 0.15), tile: 1 });
    }
    box('dark', w + 0.4, 0.2, 0.12, cx, DECK - 0.36, z, { grain: 'x' });  // cap/headstock
    if (bed < -1.2) {
      const h = (DECK - 0.4) - (bed + 0.3);
      box('dark', Math.hypot(w, h), 0.16, 0.08, cx, (DECK - 0.4 + bed + 0.3) / 2, z + 0.12, { rz: Math.atan2(h, w), grain: 'x' });
    }
    // mussels / weed clinging around pile bases handled by instancing later
  }
  // kerbs (edge timbers) and handrails
  for (const x of [x0 + 0.06, x1 - 0.06]) box('dark', 0.12, 0.14, z1 - z0, x, DECK + 0.07, (z0 + z1) / 2, { grain: 'z', tint: 0xa89888 });
  for (const [x, s] of [[x0 + 0.06, -1], [x1 - 0.06, 1]]) {
    for (let z = 0.4; z < z1 - 3.2; z += 2.4) box('boards', 0.1, 1.0, 0.1, x, DECK + 0.5, z, { tint: tint(0xcfc8bc, 0.15) });
    box('boards', 0.08, 0.07, z1 - 3.0 - 0.4, x, DECK + 1.0, 0.4 + (z1 - 3.4) / 2, { grain: 'z', tint: 0xd6d0c4 });
    box('boards', 0.05, 0.06, z1 - 3.0 - 0.4, x, DECK + 0.55, 0.4 + (z1 - 3.4) / 2, { grain: 'z', tint: 0xc4beb2 });
    addWallAB(x - 0.12, x + 0.12, 0.3, z1 + 0.2, 0.06, 1.4);
  }
  addWallAB(x0 - 0.2, x1 + 0.2, z1 - 0.05, z1 + 0.25, 0.06, 1.4);
  // pier end: posts used as bollards, a cleat, ladder, lamp post
  box('dark', w + 0.2, 0.14, 0.14, cx, DECK + 0.07, z1 - 0.07, { grain: 'x', tint: 0xa89888 });
  for (const z of [z1 - 0.15]) for (const x of [x0 - 0.05, x1 + 0.05]) {
    cyl('rope', 0.155, 0.155, 0.12, x, DECK + 0.55, z, { seg: 12, tint: 0xa88c62, noSwap: true });
  }
  // cleats
  for (const [x, z] of [[x0 + 0.25, z1 - 2.0], [x1 - 0.25, z1 - 5.0], [x1 - 0.25, 8.0]]) {
    box('metal', 0.08, 0.05, 0.12, x, DECK + 0.03, z); box('metal', 0.06, 0.04, 0.38, x, DECK + 0.08, z);
  }
  // rope coils beside the mooring points
  ropeCoil(x0 + 0.55, DECK + 0.015, z1 - 2.3, 0.08, 6, 0.024, 'rope', 0x3c6d8e);
  ropeCoil(x1 - 0.55, DECK + 0.015, z1 - 4.6, 0.06, 5, 0.03, 'rope', 0xc9a777);
  ropeCoil(x1 - 0.5, DECK + 0.015, 8.35, 0.05, 4, 0.022, 'rope', 0xb69a6c);
  // a line from the pier-end bollard down to the water (mooring for a dinghy that's out)
  ropeAlong([new THREE.Vector3(x1 + 0.05, DECK + 0.55, z1 - 0.15), new THREE.Vector3(x1 + 0.5, -0.6, z1 + 0.6), new THREE.Vector3(x1 + 0.8, WATER - 0.05, z1 + 1.8), new THREE.Vector3(x1 + 1.0, WATER - 0.6, z1 + 3.5)], 0.024, 0x3c6d8e);
  // mooring buoy
  { const s = new THREE.SphereGeometry(0.22, 14, 10); xform(s, x1 + 1.05, WATER + 0.08, z1 + 3.6); addGeo('paintMetal', s, 0xe46a24); }
  // ladder down the end
  const lx = x0 + 0.65, lz = z1 + 0.1;
  for (const dx of [-0.22, 0.22]) box('dark', 0.07, 2.7, 0.08, lx + dx, DECK - 1.25, lz + 0.05, { grain: 'y' });
  for (let k = 0; k < 8; k++) box('metal', 0.44, 0.035, 0.035, lx, DECK - 0.15 - k * 0.3, lz + 0.05, { tint: 0x8a7a6a });
  // lamp post on the pier end
  box('dark', 0.12, 2.6, 0.12, x1 - 0.15, DECK + 1.3, z1 - 0.5, { tint: 0xb0a090 });
  box('paintMetal', 0.22, 0.3, 0.22, x1 - 0.15, DECK + 2.7, z1 - 0.5, { tint: 0x2a3f3a });
  // lobster pots and fish boxes at the pier head where they'd be loaded
  for (let i = 0; i < 2; i++) lobsterPot(x0 + 0.6, DECK, 0.8 + i * 0.75, i * 0.3);
  lobsterPot(x0 + 0.6, DECK + 0.42, 1.15, 0.2);
  buildCrate(x1 - 0.45, DECK, -0.2, 0.3);
  buildCrate(x1 - 0.45, DECK + 0.41, -0.2, 0.2);
  addWallAB(x0 + 0.2, x0 + 1.0, 0.4, 1.6, 0, 1.0);
  addWallAB(x1 - 0.85, x1 - 0.05, -0.55, 0.15, 0, 1.0);
  // under-pier barrier for beach walkers
  addWallAB(x0 - 0.25, x1 + 0.25, 0.3, z1 + 0.3, -6, -0.05);
}
function lobsterPot(x, y, z, ry) {
  // D-shaped creel: base + hoops + netting suggested by thin rods
  const g0 = new THREE.BoxGeometry(0.62, 0.03, 0.42); g0.rotateY(ry); g0.translate(x, y + 0.015, z); addGeo('dark', g0, 0x9a8a7a);
  for (let k = 0; k < 3; k++) {
    const t = new THREE.TorusGeometry(0.2, 0.012, 5, 14, Math.PI);
    t.translate(0, 0, 0); t.rotateY(Math.PI / 2); t.translate(-0.24 + k * 0.24, 0, 0);
    t.rotateY(ry); t.translate(x, y + 0.03, z); addGeo('rope', t, 0x3b4a3a);
  }
  for (let k = 0; k < 7; k++) {
    const a = (k + 0.5) / 7 * Math.PI;
    const c = new THREE.CylinderGeometry(0.004, 0.004, 0.5, 3); c.rotateZ(Math.PI / 2);
    c.translate(0, Math.sin(a) * 0.2 + 0.03, Math.cos(a) * 0.2); c.rotateY(ry); c.translate(x, y, z); addGeo('rope', c, 0x2a4a5a);
  }
}

// ---------------------------------------------------------------- boat
const BOAT = { x: -1.6, z: 5.4, yaw: Math.PI + 0.28, heel: 0.13, L: 3.7 };
function hullPoint(s, w, out) {
  const L = BOAT.L, Bm = 0.74;
  const b = s < 0.55 ? Bm * (1 - Math.pow(1 - s / 0.55, 2)) : Bm * (1 - 0.3 * Math.pow((s - 0.55) / 0.45, 2));
  const keel = 0.05 * Math.pow((s - 0.5) / 0.5, 2) + (s < 0.18 ? Math.pow((0.18 - s) / 0.18, 2) * 0.3 : 0) + (s > 0.85 ? (s - 0.85) / 0.15 * 0.1 : 0);
  const sheer = 0.6 + (s < 0.5 ? Math.pow((0.5 - s) / 0.5, 2) * 0.17 : Math.pow((s - 0.5) / 0.5, 2) * 0.07);
  const v = Math.abs(w), th = v * Math.PI / 2;
  const x = Math.sign(w) * b * Math.pow(Math.sin(th), 0.75) * (0.9 + 0.1 * v);
  const y = keel + (sheer - keel) * (1 - Math.cos(th));
  out.set(x, y, (0.5 - s) * L);
  return out;
}
function buildBoat() {
  const NS = 48, NW = 32;
  const pos = [], uv = [], idx = [];
  const p = new THREE.Vector3();
  for (let i = 0; i <= NS; i++) for (let j = 0; j <= NW; j++) {
    const s = i / NS, w = j / NW * 2 - 1;
    hullPoint(s, w, p); pos.push(p.x, p.y, p.z); uv.push(s, Math.abs(w));
  }
  for (let i = 0; i < NS; i++) for (let j = 0; j < NW; j++) {
    const a = i * (NW + 1) + j, b = a + 1, c = a + NW + 1, d = c + 1;
    idx.push(a, b, c, b, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals();
  // make sure normals face outward (check a point on the starboard side amidships)
  { const k = Math.round(NS / 2) * (NW + 1) + Math.round(NW * 0.85); const nx = g.attributes.normal.getX(k), px = g.attributes.position.getX(k); if (nx * px < 0) { const ix = g.index.array; for (let t = 0; t < ix.length; t += 3) { const tmp = ix[t + 1]; ix[t + 1] = ix[t + 2]; ix[t + 2] = tmp; } g.computeVertexNormals(); } }
  const group = new THREE.Group();
  const outer = new THREE.Mesh(g, M.hull); outer.castShadow = true; outer.receiveShadow = true; group.add(outer);
  const gi = g.clone(); gi.scale(0.955, 0.97, 0.975); gi.translate(0, 0.035, 0);
  const inner = new THREE.Mesh(gi, M.hullIn); inner.receiveShadow = true; group.add(inner);
  // transom
  const tp = []; for (let j = 0; j <= NW; j++) { hullPoint(1, j / NW * 2 - 1, p); tp.push(new THREE.Vector2(p.x, p.y)); }
  const tShape = new THREE.Shape(tp);
  const tg = new THREE.ShapeGeometry(tShape);
  const tuv = tg.attributes.uv; const tpos = tg.attributes.position;
  for (let i = 0; i < tuv.count; i++) tuv.setXY(i, -tpos.getX(i) / 1.3 + 0.5, tpos.getY(i) / 0.75);
  const tmat = new THREE.MeshStandardMaterial({ map: TX.transomTexture('KITTIWAKE', 'SALTHAVEN'), roughness: 0.5, side: THREE.DoubleSide });
  const tm = new THREE.Mesh(tg, tmat); tm.position.z = -BOAT.L / 2 - 0.005; tm.castShadow = true; tm.receiveShadow = true; group.add(tm);
  // gunwale rails, stem, keel band
  const B = [];
  const add = (geo, mat) => { const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; group.add(m); return m; };
  for (const sd of [-1, 1]) {
    const pts = []; for (let i = 0; i <= 24; i++) { hullPoint(i / 24, sd, p); pts.push(p.clone().add(new THREE.Vector3(-sd * 0.012, 0.01, 0))); }
    const cur = new THREE.CatmullRomCurve3(pts);
    add(new THREE.TubeGeometry(cur, 48, 0.028, 6, false), BM.varnish);
  }
  { const pts = []; for (let i = 0; i <= 24; i++) { hullPoint(i / 24, 0, p); pts.push(p.clone().add(new THREE.Vector3(0, -0.02, 0))); }
    add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.03, 6, false), BM.metal); }
  // thwarts, stern sheets, floor boards
  const thwart = (s, wdt) => { hullPoint(s, 1, p); const halfB = p.x; const y = p.y - 0.17; const b = new THREE.BoxGeometry(halfB * 2 - 0.1, 0.035, wdt); const m = add(b, BM.varnish); m.position.set(0, y, (0.5 - s) * BOAT.L); };
  thwart(0.35, 0.22); thwart(0.62, 0.22); thwart(0.92, 0.36);
  for (let k = -2; k <= 2; k++) { const fb = new THREE.BoxGeometry(0.1, 0.02, 2.0); const m = add(fb, BM.varnish); m.position.set(k * 0.12, 0.09 + Math.abs(k) * 0.02, -0.1); m.rotation.z = -k * 0.08; }
  // oars resting across the thwarts
  for (const sd of [-1, 1]) {
    const shaft = add(new THREE.CylinderGeometry(0.022, 0.022, 2.4, 8), BM.varnish);
    shaft.rotation.x = Math.PI / 2; shaft.rotation.y = sd * 0.06; shaft.position.set(sd * 0.22, 0.47, -0.2);
    const blade = add(new THREE.BoxGeometry(0.13, 0.012, 0.55), BM.varnish); blade.position.set(sd * 0.22 + sd * 0.06, 0.47, 0.95);
  }
  // rowlocks
  for (const sd of [-1, 1]) { hullPoint(0.5, sd, p); const r = add(new THREE.TorusGeometry(0.04, 0.008, 6, 10, Math.PI), BM.metal); r.position.set(p.x, p.y + 0.06, (0.5 - 0.5) * BOAT.L - 0.1); r.rotation.y = Math.PI / 2; }
  // small rainwater puddle in the bilge
  const pud = add(new THREE.CircleGeometry(0.22, 18), new THREE.MeshStandardMaterial({ color: 0x3c3a30, roughness: 0.03, metalness: 0.1 }));
  pud.rotation.x = -Math.PI / 2; pud.scale.set(0.8, 2.2, 1); pud.position.set(0.15, 0.07, 0.6); pud.castShadow = false;
  // place on the beach: heeled onto its port bilge, bow toward the wall
  const gy = terrainH(BOAT.x, BOAT.z);
  group.position.set(BOAT.x, gy - 0.02 + 0.06, BOAT.z);
  group.rotation.set(0, BOAT.yaw, BOAT.heel, 'YXZ');
  scene.add(group);
  // collision: oriented box around the hull
  addWall(BOAT.x, BOAT.z, 0.72, BOAT.L / 2 + 0.05, -BOAT.yaw, -4, 1);
  // painter from bow ring up the beach to the wall ring
  const bow = new THREE.Vector3(0, 0.62, BOAT.L / 2 - 0.05).applyEuler(group.rotation).add(group.position);
  const ring = new THREE.Vector3(-3.0, -0.75, 0.42);
  const mid1 = bow.clone().lerp(ring, 0.33); mid1.y = terrainH(mid1.x, mid1.z) + 0.03;
  const mid2 = bow.clone().lerp(ring, 0.7); mid2.y = terrainH(mid2.x, mid2.z) + 0.03;
  ropeAlong([bow, new THREE.Vector3(bow.x, bow.y - 0.4, bow.z + 0.15).lerp(mid1, 0.4), mid1, mid2, new THREE.Vector3(ring.x, -1.2, 0.6), ring], 0.022, 0xc5a57a);
  // spare coil of painter lying at the wall foot near the ring
  ropeCoil(-2.6, terrainH(-2.6, 0.9) + 0.02, 0.9, 0.06, 4, 0.022, 'rope', 0xc5a57a);
}

// ---------------------------------------------------------------- shore details (instanced)
function buildShoreDetails() {
  const d = new THREE.Object3D();
  // pebbles & cobbles
  const pg = new THREE.IcosahedronGeometry(1, 0);
  { const pp = pg.attributes.position; for (let i = 0; i < pp.count; i++) { const k = 1 + (Math.sin(i * 12.9) * 0.5) * 0.18; pp.setXYZ(i, pp.getX(i) * k, pp.getY(i) * k, pp.getZ(i) * k); } pg.computeVertexNormals(); }
  const pmat = tidePatch(new THREE.MeshStandardMaterial({ roughness: 0.75 }), { algae: 0.4, barn: 0.3, salt: 0.2, wetR: 0.18 });
  const N = 2600; const pebbles = new THREE.InstancedMesh(pg, pmat, N);
  const cols = [0x8a857c, 0x6e6a62, 0x9c9282, 0x5a554e, 0xb8b2a6, 0x7a6a58, 0xd8d2c6];
  const c = new THREE.Color();
  let n = 0;
  for (let tries = 0; n < N && tries < 30000; tries++) {
    const x = -32 + R() * 50, z = -3 + R() * 18;
    const h = terrainH(x, z);
    if (h > HW + 0.6 || h < WATER - 0.4) continue;
    if (x > SEAWALL_X0 - 1 && x < SEAWALL_X1 + 1 && z < 0.5) continue;
    if (x > PIER_X0 - 0.4 && x < PIER_X1 + 0.4) continue;
    if (x > SLIP_X0 - 0.3 && x < SLIP_X1 + 0.3 && z < SLIP_Z1) continue;
    if (x > STEPS_X0 - 0.4 && x < STEPS_X1 + 0.4 && z < 3.4) continue;
    if (Math.hypot(x - BOAT.x, z - BOAT.z) < 2.0) continue;
    const dw = z - coastZ(x);
    // denser near the wall foot and on the upper shore
    const dens = (dw < 2.5 ? 1 : 0.25) + (h > HW - 0.2 ? 0.8 : 0);
    if (R() > dens) continue;
    const s = (h > HW - 0.3 ? 0.03 + R() * 0.07 : 0.02 + R() * 0.05) * (R() < 0.05 ? 3 : 1);
    d.position.set(x, h + s * 0.25, z);
    d.rotation.set(R() * 0.5, R() * 6, R() * 0.5);
    d.scale.set(s * (1 + R() * 0.6), s * (0.45 + R() * 0.3), s * (0.8 + R() * 0.4));
    d.updateMatrix(); pebbles.setMatrixAt(n, d.matrix);
    c.setHex(cols[(R() * cols.length) | 0]).multiplyScalar(0.85 + R() * 0.3); pebbles.setColorAt(n, c);
    n++;
  }
  pebbles.count = n; pebbles.receiveShadow = true; pebbles.castShadow = false; scene.add(pebbles);

  // seaweed (wrack) clumps: strand line, wall foot, around piles and rocks
  const blades = [];
  for (let k = 0; k < 11; k++) {
    const b = new THREE.PlaneGeometry(0.07, 0.3 + (k % 3) * 0.06, 1, 4);
    const pp = b.attributes.position;
    for (let i = 0; i < pp.count; i++) { const y = pp.getY(i) + 0.19; pp.setXYZ(i, pp.getX(i) * (1 - y * 0.6) + Math.sin(y * 9 + k) * 0.035, 0.01 + Math.sin(y * 5 + k) * 0.025 + (1 - y * 2.5) * 0.03 * (k % 2), -y * (0.7 + (k % 3) * 0.15)); }
    b.rotateY(k / 11 * Math.PI * 2 + Math.sin(k * 3.7) * 0.6);
    blades.push(b);
  }
  const sg = mergeGeometries(blades); sg.computeVertexNormals();
  const smat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, side: THREE.DoubleSide });
  const SN = 900; const weed = new THREE.InstancedMesh(sg, smat, SN);
  const wcols = [0x4f4a1e, 0x5c5220, 0x45441a, 0x6a5a26, 0x3e3c18];
  n = 0;
  for (let tries = 0; n < SN && tries < 40000; tries++) {
    const x = -32 + R() * 50, z = -3 + R() * 20;
    const h = terrainH(x, z);
    if (h < WATER - 0.2 || h > HW + 0.08) continue;
    if (x > PIER_X0 - 0.3 && x < PIER_X1 + 0.3 && z < 0.4) continue;
    if (x > SLIP_X0 - 0.2 && x < SLIP_X1 + 0.2 && z < SLIP_Z1) continue;
    if (x > STEPS_X0 - 0.3 && x < STEPS_X1 + 0.3 && z < 3.3) continue;
    if (Math.hypot(x - BOAT.x, z - BOAT.z) < 1.9) continue;
    const dw = z - coastZ(x);
    const strand = Math.abs(h - HW) < 0.12 ? 1 : 0;
    const wallFoot = (dw > 0.3 && dw < 1.6 && x > SEAWALL_X0 && x < SEAWALL_X1) ? 0.9 : 0;
    const nearPier = (Math.abs(x - PIER_X0) < 0.8 || Math.abs(x - PIER_X1) < 0.8) ? 0.5 : 0;
    const low = h < WATER + 0.2 ? 0.12 : 0.02;
    if (R() > strand + wallFoot + nearPier + low) continue;
    d.position.set(x, h + 0.005, z);
    d.rotation.set(0, R() * 6.28, 0);
    const s = 0.3 + R() * 0.5; d.scale.set(s * (0.7 + R() * 0.6), s * (0.6 + R() * 0.6), s * (0.7 + R() * 0.6));
    d.updateMatrix(); weed.setMatrixAt(n, d.matrix);
    c.setHex(wcols[(R() * wcols.length) | 0]); weed.setColorAt(n, c);
    n++;
  }
  weed.count = n; weed.receiveShadow = true; scene.add(weed);

  // mussel clusters at pile bases and wall foot
  const mg = new THREE.SphereGeometry(1, 5, 4); mg.scale(1, 0.45, 0.55);
  const mm = new THREE.MeshStandardMaterial({ color: 0x1d2128, roughness: 0.25, metalness: 0.1 });
  const MN = 1400; const mus = new THREE.InstancedMesh(mg, mm, MN);
  n = 0;
  const pileZ = []; for (let z = 1.2; z < PIER_Z1; z += 2.4) pileZ.push(z);
  for (const z of pileZ) for (const x of [PIER_X0 - 0.05, PIER_X1 + 0.05]) {
    const bed = terrainH(x, z);
    for (let k = 0; k < 45 && n < MN; k++) {
      const a = R() * 6.28, y = bed + R() * Math.min(0.7, Math.max(0.1, HW - 0.5 - bed)) * R();
      d.position.set(x + Math.cos(a) * 0.15, y, z + Math.sin(a) * 0.15);
      d.rotation.set(R() * 3, a, R() * 3); const s = 0.018 + R() * 0.02; d.scale.set(s, s, s);
      d.updateMatrix(); mus.setMatrixAt(n++, d.matrix);
    }
  }
  for (let k = 0; k < 500 && n < MN; k++) {
    const x = SEAWALL_X0 + R() * (SEAWALL_X1 - SEAWALL_X0);
    if ((x > SLIP_X0 - 0.4 && x < SLIP_X1 + 0.4) || (x > STEPS_X0 - 0.4 && x < STEPS_X1 + 0.4) || (x > PIER_X0 - 0.3 && x < PIER_X1 + 0.3)) continue;
    const z = 0.35 + R() * 0.12, bed = terrainH(x, z + 0.3);
    d.position.set(x, bed + R() * 0.25, z + 0.06); d.rotation.set(R() * 3, R() * 3, R() * 3); const s = 0.015 + R() * 0.018; d.scale.set(s, s, s);
    d.updateMatrix(); mus.setMatrixAt(n++, d.matrix);
  }
  mus.count = n; mus.receiveShadow = true; scene.add(mus);

  // boulders on the natural shore (east and west), tide-marked
  const rg = new THREE.IcosahedronGeometry(1, 3);
  { const pp = rg.attributes.position; for (let i = 0; i < pp.count; i++) { _v.fromBufferAttribute(pp, i); const k = 1 + Math.sin(_v.x * 3.1 + _v.y * 2.3) * 0.12 + Math.sin(_v.z * 5.3 + _v.x * 4.1) * 0.06; pp.setXYZ(i, _v.x * k, _v.y * k * 0.7, _v.z * k); } rg.computeVertexNormals(); }
  const rockMat = tidePatch(stdMat({ roughness: 0.85, vertexColors: false, color: 0x8b857b }, T.stone, { ns: 0.6 }), { wetR: 0.2 });
  const rocks = [[12.5, 6, 1.1], [14.2, 9.5, 1.5], [11.4, 11, 0.8], [16.5, 6.5, 0.9], [-17, 6.5, 1.2], [-19.5, 9.5, 1.6], [-15.8, 11, 0.7], [-22, 13.5, 1.3], [9.0, 8.5, 0.6], [-13.0, 3.5, 0.55]];
  const rim = new THREE.InstancedMesh(rg, rockMat, rocks.length);
  rocks.forEach(([x, z, s], i) => {
    d.position.set(x, terrainH(x, z) + s * 0.15, z); d.rotation.set(R() * 0.3, R() * 6, R() * 0.3); d.scale.set(s * (1 + R() * 0.4), s, s * (0.8 + R() * 0.4));
    d.updateMatrix(); rim.setMatrixAt(i, d.matrix);
    addWall(x, z, s * 0.95, s * 0.95, 0, -6, 3);
  });
  rim.castShadow = true; rim.receiveShadow = true; scene.add(rim);

  // rain/tide puddles on the upper beach (glassy)
  const pudMat = new THREE.MeshStandardMaterial({ color: 0x5c5a50, roughness: 0.03, metalness: 0.0, transparent: true, opacity: 0.55, depthWrite: false, envMapIntensity: 1.4 });
  const pdg = new THREE.CircleGeometry(1, 20);
  const PN = 26; const puds = new THREE.InstancedMesh(pdg, pudMat, PN); n = 0;
  for (let tries = 0; n < PN && tries < 3000; tries++) {
    const x = -14 + R() * 18, z = 1.5 + R() * 9;
    const h = terrainH(x, z); if (h > WATER + 0.35 || h < WATER + 0.06) continue;
    if (x > SLIP_X0 - 0.3 && x < SLIP_X1 + 0.3) continue;
    if (Math.hypot(x - BOAT.x, z - BOAT.z) < 2.2) continue;
    d.position.set(x, h + 0.012, z); d.rotation.set(-Math.PI / 2, 0, R() * 6); const s = 0.25 + R() * 0.6; d.scale.set(s * (1 + R()), s, 1);
    d.updateMatrix(); puds.setMatrixAt(n++, d.matrix);
  }
  puds.count = n; puds.receiveShadow = true; puds.renderOrder = 1; scene.add(puds);

  // footprints in the wet sand: from the foot of the steps to the boat and around its bow
  {
    const fg = new THREE.CircleGeometry(1, 12); fg.rotateX(-Math.PI / 2);
    const fm = new THREE.MeshStandardMaterial({ color: 0x2e2a22, roughness: 0.12, transparent: true, opacity: 0.5, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3 });
    const path = new THREE.CatmullRomCurve3([new THREE.Vector3(1.7, 0, 3.3), new THREE.Vector3(1.0, 0, 4.4), new THREE.Vector3(0.0, 0, 5.0), new THREE.Vector3(-0.6, 0, 6.6), new THREE.Vector3(-1.2, 0, 7.6), new THREE.Vector3(-2.8, 0, 7.4)]);
    const L = path.getLength(), stepN = Math.floor(L / 0.36);
    const fp = new THREE.InstancedMesh(fg, fm, stepN); let fn = 0;
    for (let i = 0; i < stepN; i++) {
      const t = i / stepN, p0 = path.getPointAt(t), tan = path.getTangentAt(t);
      const side = i % 2 ? 1 : -1, ang = Math.atan2(tan.x, tan.z);
      const x = p0.x + Math.cos(ang) * 0.1 * side, z = p0.z - Math.sin(ang) * 0.1 * side;
      if (Math.hypot(x - BOAT.x, z - BOAT.z) < 1.1) continue;
      d.position.set(x, terrainH(x, z) + 0.008, z); d.rotation.set(0, ang + (R() - 0.5) * 0.15, 0); d.scale.set(0.05, 1, 0.13);
      d.updateMatrix(); fp.setMatrixAt(fn++, d.matrix);
    }
    fp.count = fn; fp.receiveShadow = true; fp.renderOrder = 1; scene.add(fp);
  }
  // grapnel anchor and chain lying on the sand beside the boat
  {
    const ax = 0.4, az = 6.9, ay = terrainH(ax, az);
    cyl('rust', 0.018, 0.018, 0.42, ax, ay + 0.03, az, { rz: Math.PI / 2, ry: 0.6, seg: 8 });
    for (let k = 0; k < 4; k++) {
      const a = k * Math.PI / 2 + 0.3;
      const t = new THREE.TorusGeometry(0.09, 0.012, 6, 10, Math.PI * 0.6);
      t.rotateY(a); t.rotateZ(0.4); t.translate(ax - Math.cos(0.6) * 0.2, ay + 0.06, az + Math.sin(0.6) * 0.2); addGeo('rust', t);
    }
    let px = ax + Math.cos(0.6) * 0.21, pz = az - Math.sin(0.6) * 0.21;
    for (let k = 0; k < 26; k++) {
      const t = new THREE.TorusGeometry(0.03, 0.007, 5, 8);
      if (k % 2) t.rotateX(Math.PI / 2);
      const dir = 0.6 + Math.sin(k * 0.35) * 0.7 + k * 0.03;
      px += Math.cos(dir) * 0.05; pz -= Math.sin(dir) * 0.05;
      t.rotateY(dir); t.translate(px, terrainH(px, pz) + 0.012, pz); addGeo('rust', t);
    }
  }
  // grass tufts along the land edges
  const tg = new THREE.ConeGeometry(0.05, 0.32, 4, 1, true); tg.translate(0, 0.16, 0);
  const tmat = new THREE.MeshStandardMaterial({ color: 0x6d7038, roughness: 0.9, side: THREE.DoubleSide });
  const GN = 2500; const grass = new THREE.InstancedMesh(tg, tmat, GN); n = 0;
  for (let tries = 0; n < GN && tries < 40000; tries++) {
    const x = -40 + R() * 70, z = -22 + R() * 30;
    const h = terrainH(x, z);
    const inBuild = x > WS.x0 - 0.6 && x < WS.x1 + 0.6 && z > WS.z0 - 3 && z < 0.5;
    if (inBuild || (z > -3.4 && x > SEAWALL_X0 - 0.5 && x < SEAWALL_X1 + 0.5) || h < HW + 0.35) continue;
    if (x > PIER_X0 - 0.5 && x < PIER_X1 + 0.5 && z > -4) continue;
    const s = 0.6 + R() * 1.2;
    for (let k = 0; k < 4 && n < GN; k++) {
      d.position.set(x + (R() - 0.5) * 0.25, h, z + (R() - 0.5) * 0.25);
      d.rotation.set((R() - 0.5) * 0.6, R() * 6, (R() - 0.5) * 0.6); d.scale.set(s, s * (0.7 + R() * 0.6), s);
      d.updateMatrix(); grass.setMatrixAt(n, d.matrix); c.setHex(0x6d7038).multiplyScalar(0.75 + R() * 0.5); c.r *= 0.9 + R() * 0.3; grass.setColorAt(n, c); n++;
    }
  }
  grass.count = n; grass.receiveShadow = true; scene.add(grass);
}

// ---------------------------------------------------------------- props around the quay
function buildQuayProps() {
  // bollards along the quay edge with a rope coil beside one
  for (const x of [-12.6, -3.6, 3.7, 8.6]) {
    cyl('paintMetal', 0.13, 0.15, 0.55, x, 0.28, -0.35, { seg: 16, tint: 0x2b2f30 });
    cyl('paintMetal', 0.18, 0.18, 0.07, x, 0.57, -0.35, { seg: 16, tint: 0x2b2f30 });
    addWallAB(x - 0.2, x + 0.2, -0.55, -0.15, 0, 1);
  }
  ropeCoil(3.15, 0.03, -0.75, 0.07, 5, 0.026, 'rope', 0xc8a676);
  ropeAlong([new THREE.Vector3(3.7, 0.45, -0.35), new THREE.Vector3(3.45, 0.2, -0.55), new THREE.Vector3(3.25, 0.05, -0.68)], 0.026, 0xc8a676);
  ropeCoil(-3.1, 0.03, -0.8, 0.06, 4, 0.022, 'rope', 0x3c6d8e);
  // hand cart by the pier head with a crate on it
  {
    const cx = 3.0, cz = -2.4;
    box('crate', 0.7, 0.05, 1.1, cx, 0.45, cz, { ry: 0.5, tint: 0xc8b090 });
    for (const s of [-1, 1]) { const t = new THREE.TorusGeometry(0.22, 0.04, 8, 18); t.rotateY(Math.PI / 2 + 0.5); t.translate(cx + s * 0.4 * Math.cos(0.5), 0.24, cz - s * 0.4 * Math.sin(0.5)); addGeo('paintMetal', t, 0x2a2a28); }
    for (const s of [-1, 1]) box('crate', 0.05, 0.05, 1.2, cx + s * 0.3 * Math.cos(0.5) + Math.sin(0.5) * 0.6, 0.5, cz - s * 0.3 * Math.sin(0.5) + Math.cos(0.5) * 0.6, { ry: 0.5, tint: 0xb09070 });
    buildCrate(cx, 0.48, cz, 0.5);
    addWall(cx, cz, 0.45, 0.75, -0.5, 0, 1);
  }
  // net floats / fenders hung on the workshop side wall
  for (let i = 0; i < 3; i++) { const s = new THREE.SphereGeometry(0.12, 12, 10); s.scale(1, 1.25, 1); xform(s, WS.x1 + 0.22, 1.4 - i * 0.05, -8.0 + i * 0.32); addGeo('paintMetal', s, [0xe46a24, 0xe8e2d0, 0xe46a24][i]); }
  box('dark', 0.04, 0.04, 1.2, WS.x1 + 0.12, 1.65, -7.7, { grain: 'z' });
  // water butt at the downpipe corner, timber stack under the eaves
  cyl('crate', 0.32, 0.3, 0.85, WS.x1 + 0.45, 0.45, WS.z0 + 0.6, { seg: 18, tint: 0x9a8670 });
  addWallAB(WS.x1 + 0.1, WS.x1 + 0.8, WS.z0 + 0.25, WS.z0 + 0.95, 0, 1);
  for (let i = 0; i < 6; i++) box('crate', 0.12, 0.05, 3.0, WS.x0 - 0.35 - (i % 3) * 0.14, 0.15 + Math.floor(i / 3) * 0.06, -6.5, { grain: 'z', tint: tint(0xbfae94, 0.15) });
  box('dark', 0.1, 0.1, 3.0, WS.x0 - 0.5, 0.05, -6.5, { grain: 'z' });
  addWallAB(WS.x0 - 0.65, WS.x0 - 0.1, -8.0, -5.0, 0, 1);
  // downpipe and gutters
  for (const s of [-1, 1]) cyl('paintMetal', 0.05, 0.05, WS.z1 - WS.z0 + 0.6, (WS.x0 + WS.x1) / 2 + s * 3.75, WS.eave - 0.05, (WS.z0 + WS.z1) / 2, { rx: Math.PI / 2, seg: 8, tint: 0x3a3c3a });
  cyl('paintMetal', 0.035, 0.035, WS.eave, WS.x1 + 0.22, WS.eave / 2, WS.z0 + 0.2, { seg: 8, tint: 0x3a3c3a });
}

// ---------------------------------------------------------------- distant land
function buildDistant() {
  const mat = new THREE.MeshStandardMaterial({ color: 0x6f7a62, roughness: 1, flatShading: false });
  const mk = (cx, cz, w, d, hgt, seed) => {
    const g = new THREE.PlaneGeometry(w, d, 48, 16); g.rotateX(-Math.PI / 2);
    const pp = g.attributes.position;
    for (let i = 0; i < pp.count; i++) {
      const x = pp.getX(i), z = pp.getZ(i);
      const e = Math.max(0, 1 - Math.pow(Math.abs(z) / (d / 2), 2)) * Math.max(0, 1 - Math.pow(Math.abs(x) / (w / 2), 4));
      const hh = hgt * e * (0.6 + 0.4 * Math.sin(x * 0.02 + seed) * Math.cos(x * 0.011 + seed * 2)) + Math.sin(x * 0.07 + seed) * 2 * e;
      pp.setY(i, hh - 6);
    }
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, mat); m.position.set(cx, 0, cz); scene.add(m);
  };
  mk(-40, 260, 520, 140, 38, 1);
  mk(260, 120, 160, 300, 30, 2);
  mk(-280, 100, 180, 300, 34, 3);
  // a few far white cottages on the opposite shore
  for (let i = 0; i < 5; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(6, 4, 5), new THREE.MeshStandardMaterial({ color: 0xd8d2c6, roughness: 1 })); b.position.set(-120 + i * 37 + R() * 10, 0, 206 + R() * 8); scene.add(b); }
}

// ---------------------------------------------------------------- water
function buildWater() {
  // depth texture sampled from the terrain grid, so the water fades out on the shallows
  const N = 512, X0 = -80, X1 = 80, Z0 = -40, Z1 = 120;
  const data = new Uint8Array(N * N * 4);
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const x = X0 + (i + 0.5) / N * (X1 - X0), z = Z0 + (j + 0.5) / N * (Z1 - Z0);
    const dep = WATER - terrainH(x, z);
    const k = (j * N + i) * 4;
    data[k] = THREE.MathUtils.clamp((dep + 0.5) / 5 * 255, 0, 255); data[k + 3] = 255;
  }
  const dt = new THREE.DataTexture(data, N, N); dt.magFilter = THREE.LinearFilter; dt.minFilter = THREE.LinearFilter; dt.needsUpdate = true;
  const nrm = TX.waterNormalTexture();
  const uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
    uTime: { value: 0 }, uDepth: { value: null }, uNorm: { value: null }, uBounds: { value: new THREE.Vector4(X0, Z0, X1 - X0, Z1 - Z0) },
    uSun: { value: SUN_DIR }, uSunCol: { value: new THREE.Color(0xffe2bc) },
    uZenith: { value: skyUniforms.uZenith.value }, uHorizon: { value: skyUniforms.uHorizon.value }, uGlow: { value: skyUniforms.uGlow.value },
  }]);
  uniforms.uDepth.value = dt; uniforms.uNorm.value = nrm;
  const mat = new THREE.ShaderMaterial({
    uniforms, fog: true, transparent: true, depthWrite: false,
    vertexShader: `varying vec3 vW;
      #include <fog_pars_vertex>
      void main(){ vec4 w = modelMatrix*vec4(position,1.0); vW = w.xyz; vec4 mvPosition = viewMatrix*w; gl_Position = projectionMatrix*mvPosition;
      #include <fog_vertex>
      }`,
    fragmentShader: `uniform float uTime; uniform sampler2D uDepth, uNorm; uniform vec4 uBounds; uniform vec3 uSun, uSunCol, uZenith, uHorizon, uGlow; varying vec3 vW;
      #include <fog_pars_fragment>
      ${SKY_GLSL}
      void main(){
        vec2 duv = (vW.xz - uBounds.xy)/uBounds.zw;
        float dep = 5.0;
        if (duv.x>0.0 && duv.x<1.0 && duv.y>0.0 && duv.y<1.0) dep = texture2D(uDepth, duv).r*5.0 - 0.5;
        vec2 p = vW.xz;
        vec3 n1 = texture2D(uNorm, p*0.09 + vec2(uTime*0.010, uTime*0.006)).xyz*2.0-1.0;
        vec3 n2 = texture2D(uNorm, p*0.23 + vec2(-uTime*0.013, uTime*0.017)).xyz*2.0-1.0;
        vec3 n3 = texture2D(uNorm, p*0.031 + vec2(uTime*0.004, -uTime*0.003)).xyz*2.0-1.0;
        vec2 slope = n1.xy*0.55 + n2.xy*0.35 + n3.xy*0.6;
        vec3 V = normalize(cameraPosition - vW);
        float dist = length(cameraPosition - vW);
        slope *= mix(0.13, 0.04, smoothstep(5.0, 120.0, dist)) * smoothstep(-0.05, 0.4, dep);
        vec3 N = normalize(vec3(slope.x, 1.0, slope.y));
        float fres = 0.02 + 0.98*pow(1.0 - max(dot(N, V), 0.0), 5.0);
        vec3 R = reflect(-V, N); R.y = abs(R.y);
        vec3 refl = skyCol(R);
        float spec = pow(max(dot(R, uSun), 0.0), 900.0) * 9.0 + pow(max(dot(R, uSun), 0.0), 80.0) * 0.25;
        vec3 deepC = vec3(0.10, 0.20, 0.22), shallowC = vec3(0.36, 0.40, 0.33);
        float dd = clamp(dep, 0.0, 4.0);
        vec3 body = mix(shallowC, deepC, smoothstep(0.0, 2.6, dd));
        // sun-lit body tint
        body *= 0.75 + 0.35*max(uSun.y,0.0);
        float clarity = smoothstep(0.0, 1.6, dd);
        float a = mix(0.10, 0.88, clarity);
        a = max(a, fres*0.9);
        // gentle lapping line at the water's edge
        float edge = (1.0 - smoothstep(0.0, 0.06, dep)) * smoothstep(-0.05, 0.0, dep);
        float lap = 0.5 + 0.5*sin(uTime*1.2 + (vW.x+vW.z)*0.6 + n2.x*3.0);
        vec3 col = mix(body, refl, fres) + uSunCol*spec;
        col += vec3(0.85,0.85,0.8) * edge * lap * 0.18;
        a *= smoothstep(-0.03, 0.03, dep);
        gl_FragColor = vec4(col, clamp(a + spec*0.5, 0.0, 1.0));
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`,
  });
  const g = new THREE.PlaneGeometry(2400, 2400, 1, 1); g.rotateX(-Math.PI / 2);
  const w = new THREE.Mesh(g, mat); w.position.y = WATER; w.renderOrder = 2; w.frustumCulled = false;
  scene.add(w);
  return mat;
}

// ---------------------------------------------------------------- build everything
buildTerrain();
buildQuay();
buildWorkshop();
buildPier();
buildQuayProps();
buildBoat();
buildShoreDetails();
buildDistant();
flushBatches();
const waterMat = buildWater();
renderer.shadowMap.needsUpdate = true;

// ---------------------------------------------------------------- player
const START = { x: 1.4, z: -2.6, yaw: Math.PI * 0.86, pitch: -0.08 };
const VIEWS = {
  1: { x: -7.6, z: -3.4, yaw: -0.15 + Math.PI * 0, pitch: -0.1, name: 'Workshop' },
  2: { x: 5.8, z: 20.4, yaw: 0.5, pitch: -0.1, name: 'Pier end' },
  3: { x: 1.7, z: 3.9, yaw: 1.75, pitch: -0.12, name: 'Shore steps (foot)' },
  4: { x: 1.2, z: 8.2, yaw: 0.9, pitch: -0.22, name: 'Boat' },
  5: { ...START, name: 'Start' },
};
const player = { x: 0, z: 0, feet: 0, vy: 0, vx: 0, vz: 0, yaw: 0, pitch: 0, eye: EYE, crouch: false, grounded: true };
function groundAt(x, z, feet) {
  let g = terrainH(x, z);
  for (const f of floors) { const h = f(x, z); if (h !== null && h <= feet + STEP && h > g) g = h; }
  return g;
}
function teleport(v) {
  player.x = v.x; player.z = v.z; player.yaw = v.yaw; player.pitch = v.pitch;
  player.feet = groundAt(v.x, v.z, 10); player.vx = player.vz = player.vy = 0;
}
teleport(START);
function collideWalls(x, z, feet) {
  const b0 = feet + 0.25, b1 = feet + 1.7;
  for (let it = 0; it < 2; it++) {
    for (const w of walls) {
      if (w.y1 < b0 || w.y0 > b1) continue;
      const dx = x - w.x, dz = z - w.z;
      const lx = dx * w.c + dz * w.s, lz = -dx * w.s + dz * w.c;
      const cx = Math.max(-w.hx, Math.min(w.hx, lx)), cz = Math.max(-w.hz, Math.min(w.hz, lz));
      let ex = lx - cx, ez = lz - cz; const d2 = ex * ex + ez * ez;
      if (d2 >= RADIUS * RADIUS) continue;
      let px, pz;
      if (d2 > 1e-8) { const d = Math.sqrt(d2); const push = (RADIUS - d) / d; px = ex * push; pz = ez * push; }
      else { // inside: push out along the smallest axis
        const ox = w.hx - Math.abs(lx), oz = w.hz - Math.abs(lz);
        if (ox < oz) { px = Math.sign(lx || 1) * (ox + RADIUS); pz = 0; } else { pz = Math.sign(lz || 1) * (oz + RADIUS); px = 0; }
      }
      x += px * w.c - pz * w.s; z += px * w.s + pz * w.c;
    }
  }
  return [x, z];
}
const BOUNDS = { x0: -34, x1: 24, z0: -24, z1: 24 };
function okPos(x, z, feet) {
  if (x < BOUNDS.x0 || x > BOUNDS.x1 || z < BOUNDS.z0 || z > BOUNDS.z1) return null;
  const g = groundAt(x, z, feet);
  if (g < WATER - 0.08) return null;  // no wading into the inlet
  return g;
}
const keys = {};
function updatePlayer(dt) {
  const f = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
  const s = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0);
  const speed = (keys.ShiftLeft || keys.ShiftRight ? 4.6 : 2.4) * (player.crouch ? 0.55 : 1);
  let wx = 0, wz = 0;
  if (f || s) {
    const l = Math.hypot(f, s);
    const sy = Math.sin(player.yaw), cy = Math.cos(player.yaw);
    wx = (-sy * f + cy * s) / l * speed; wz = (-cy * f - sy * s) / l * speed;
  }
  const acc = 1 - Math.exp(-dt * 12);
  player.vx += (wx - player.vx) * acc; player.vz += (wz - player.vz) * acc;
  let nx = player.x + player.vx * dt, nz = player.z + player.vz * dt;
  [nx, nz] = collideWalls(nx, nz, player.feet);
  let g = okPos(nx, nz, player.feet);
  if (g === null) {
    // slide along the boundary on one axis
    let g2 = okPos(nx, player.z, player.feet);
    if (g2 !== null) { nz = player.z; g = g2; }
    else { g2 = okPos(player.x, nz, player.feet); if (g2 !== null) { nx = player.x; g = g2; } }
    if (g === null) { nx = player.x; nz = player.z; g = groundAt(nx, nz, player.feet); player.vx *= 0.3; player.vz *= 0.3; }
  }
  player.x = nx; player.z = nz;
  // vertical: smooth step up/down, fall for bigger drops
  if (g > player.feet) { player.feet += (g - player.feet) * Math.min(1, dt * 18); if (g - player.feet < 0.005) player.feet = g; player.vy = 0; }
  else if (player.feet - g < 0.5 && player.grounded) { player.feet += (g - player.feet) * Math.min(1, dt * 14); player.vy = 0; }
  else { player.vy -= 9.8 * dt; player.feet += player.vy * dt; if (player.feet <= g) { player.feet = g; player.vy = 0; } }
  player.grounded = player.feet - g < 0.05;
  const targetEye = player.crouch ? EYE_CROUCH : EYE;
  player.eye += (targetEye - player.eye) * Math.min(1, dt * 10);
  camera.position.set(player.x, player.feet + player.eye, player.z);
  camera.rotation.set(player.pitch, player.yaw, 0, 'YXZ');
}

// ---------------------------------------------------------------- input / UI
const overlay = document.getElementById('overlay');
const perfEl = document.getElementById('perf');
const toastEl = document.getElementById('toast');
let toastT = 0;
function toast(msg) { toastEl.textContent = msg; toastEl.style.opacity = 1; toastT = 1.8; }
overlay.addEventListener('click', () => renderer.domElement.requestPointerLock());
renderer.domElement.addEventListener('click', () => { if (!document.pointerLockElement) renderer.domElement.requestPointerLock(); });
document.addEventListener('pointerlockchange', () => {
  const locked = document.pointerLockElement === renderer.domElement;
  overlay.style.display = locked ? 'none' : 'flex';
  if (!locked) for (const k in keys) keys[k] = false;
});
document.addEventListener('mousemove', (e) => {
  if (document.pointerLockElement !== renderer.domElement) return;
  const mx = THREE.MathUtils.clamp(e.movementX, -250, 250), my = THREE.MathUtils.clamp(e.movementY, -250, 250);
  player.yaw -= mx * 0.0022; player.pitch -= my * 0.0022;
  player.pitch = THREE.MathUtils.clamp(player.pitch, -1.5, 1.5);
});
let showPerf = true, adaptOff = false;
document.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'KeyR') { teleport(START); toast('Reset to start'); }
  if (e.code === 'KeyC') { player.crouch = !player.crouch; }
  if (e.code === 'KeyP') { showPerf = !showPerf; perfEl.style.display = showPerf ? 'block' : 'none'; }
  if (e.code === 'KeyQ') {
    const full = Math.min(window.devicePixelRatio, 1.25);
    adaptOff = true;
    pixelScale = pixelScale === full ? Math.max(0.6, full * 0.67) : full;
    renderer.setPixelRatio(pixelScale); renderer.setSize(window.innerWidth, window.innerHeight);
    toast(`Render scale ${pixelScale.toFixed(2)}`);
  }
  const n = e.code.startsWith('Digit') ? +e.code.slice(5) : 0;
  if (VIEWS[n]) { teleport(VIEWS[n]); toast(VIEWS[n].name); }
  if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
});
document.addEventListener('keyup', (e) => { keys[e.code] = false; });
window.addEventListener('blur', () => { for (const k in keys) keys[k] = false; });
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------------------------------------------------------------- loop with frame-time stats
const frameTimes = new Float32Array(240); let fi = 0, fCount = 0, perfAcc = 0, adaptT = 0;
let last = performance.now();
window.__perf = { frames: [], record: false };
function loop(now) {
  const rawDt = (now - last) / 1000; last = now;
  const dt = Math.min(rawDt, 0.05);
  frameTimes[fi] = rawDt * 1000; fi = (fi + 1) % frameTimes.length; fCount = Math.min(fCount + 1, frameTimes.length);
  if (window.__perf.record) window.__perf.frames.push(rawDt * 1000);
  updatePlayer(dt);
  waterMat.uniforms.uTime.value = now / 1000;
  sky.position.copy(camera.position);
  renderer.render(scene, camera);
  perfAcc += rawDt;
  adaptT += rawDt;
  if (!adaptOff && adaptT > 3 && fCount >= 180 && pixelScale > 0.75) {
    adaptT = 0;
    const arr = Array.from(frameTimes.slice(0, fCount)).sort((a, b) => a - b);
    if (arr[fCount >> 1] > 24 && document.visibilityState === 'visible' && document.pointerLockElement) {
      pixelScale = Math.max(0.75, pixelScale * 0.85); renderer.setPixelRatio(pixelScale); renderer.setSize(window.innerWidth, window.innerHeight);
      toast(`Render scale lowered to ${pixelScale.toFixed(2)} for smoothness (Q restores)`);
    }
  }
  if (toastT > 0) { toastT -= rawDt; if (toastT <= 0) toastEl.style.opacity = 0; }
  if (perfAcc > 0.5 && showPerf) {
    perfAcc = 0;
    const arr = Array.from(frameTimes.slice(0, fCount)).sort((a, b) => a - b);
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    const p99 = arr[Math.floor(arr.length * 0.99) - 1] || avg;
    const info = renderer.info.render;
    perfEl.textContent = `${avg.toFixed(1)} ms avg  ${(1000 / avg).toFixed(0)} fps\n99th ${p99.toFixed(1)} ms  calls ${info.calls}  tris ${(info.triangles / 1000).toFixed(0)}k`;
  }
  requestAnimationFrame(loop);
}
document.getElementById('loading').style.display = 'none';
window.__app = { renderer, scene, camera, player, teleport, VIEWS, keys, updatePlayer, groundAt };
requestAnimationFrame(loop);
