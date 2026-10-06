import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import * as TX from './textures.js';

const V3 = THREE.Vector3;
const TAU = Math.PI * 2;

// ---------------- renderer / scene ----------------
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
let hiQuality = true, autoScale = 1, autoOn = true;
const basePR = () => (hiQuality ? Math.min(window.devicePixelRatio, 1) * autoScale : 0.7);
renderer.setPixelRatio(basePR());
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.62;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.autoUpdate = false;
document.body.appendChild(renderer.domElement);
const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.06, 7000);
camera.rotation.order = 'YXZ';

// sun: late afternoon from the west-southwest, low
const sunElev = THREE.MathUtils.degToRad(17), sunAz = THREE.MathUtils.degToRad(248); // az from north, clockwise
const sunDir = new V3(Math.sin(sunAz) * Math.cos(sunElev), Math.sin(sunElev), -Math.cos(sunAz) * Math.cos(sunElev)).normalize();

// ---------------- sky + environment ----------------
const sky = new Sky();
sky.scale.setScalar(10000);
sky.frustumCulled = false;
sky.renderOrder = 3;
const su = sky.material.uniforms;
su.turbidity.value = 5.5; su.rayleigh.value = 1.4; su.mieCoefficient.value = 0.006; su.mieDirectionalG.value = 0.86;
su.sunPosition.value.copy(sunDir);
scene.add(sky);
{
  const pm = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  const s2 = new Sky(); s2.scale.setScalar(1000);
  for (const k of ['turbidity', 'rayleigh', 'mieCoefficient', 'mieDirectionalG']) s2.material.uniforms[k].value = su[k].value;
  s2.material.uniforms.sunPosition.value.copy(sunDir);
  envScene.add(s2);
  // warm ground hemisphere for bounce
  const gnd = new THREE.Mesh(new THREE.SphereGeometry(500, 32, 16, 0, TAU, Math.PI / 2, Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0.9, 0.62, 0.42), side: THREE.BackSide }));
  envScene.add(gnd);
  scene.environment = pm.fromScene(envScene, 0, 1, 2000).texture;
  scene.environmentIntensity = 0.55;
}
scene.fog = new THREE.FogExp2(new THREE.Color(0.84, 0.74, 0.64), 0.0005);

const sun = new THREE.DirectionalLight(new THREE.Color(1.0, 0.8, 0.58), 3.4);
sun.position.copy(sunDir).multiplyScalar(90).add(new V3(2, 0, 0));
sun.target.position.set(2, 0, 0);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
const sc = sun.shadow.camera;
sc.left = -36; sc.right = 36; sc.top = 30; sc.bottom = -30; sc.near = 20; sc.far = 190;
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.035;
sun.shadow.radius = 2;
scene.add(sun, sun.target);

// interior bounce fills (no shadows; cheap)
const fillChamber = new THREE.PointLight(0xffc796, 9, 13, 1.6);
fillChamber.position.set(-3.2, 1.0, 0.4);
const fillDome = new THREE.PointLight(0xbfd2ff, 6, 12, 1.6);
fillDome.position.set(0, 7.5, 0);
const fillPassage = new THREE.PointLight(0xffd0a0, 5, 9, 1.6);
fillPassage.position.set(13.6, 1.1, 0);
fillChamber.intensity = 11; fillChamber.position.set(-2.4, 2.2, 0.3); fillChamber.distance = 15;
scene.add(fillChamber, fillPassage);

// ---------------- textures & materials ----------------
const tPlaster = TX.plasterTex(aniso);
const tStone = TX.stoneTex(aniso);
const tMasonry = TX.masonryTex(aniso, { rows: 6, seed: 200, tint: [1.0, 0.84, 0.66], meters: 2.4, light: 0.7 });
const tFloor = TX.masonryTex(aniso, { rows: 4, seed: 260, tint: [0.98, 0.86, 0.72], meters: 3.0, light: 0.66 });
const tRock = TX.rockTex(aniso);
const tSand = TX.sandTex(aniso);
const tBronze = TX.bronzeTex(aniso);
const tTile = TX.tileTex(aniso);
const tWood = TX.woodTex(aniso);
const dialTex = TX.dialTexture('circle', aniso);
const sundialTex = TX.dialTexture('sundial', aniso);

// world-position GLSL helpers injected into the standard material
const GLSL_COMMON = /* glsl */`
varying vec3 vWPos;
uniform float uBaseY;
uniform float uGrimeH;
uniform float uGrime;
uniform float uStreak;
float h31(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(h31(i),h31(i+vec2(1,0)),f.x), mix(h31(i+vec2(0,1)),h31(i+vec2(1,1)),f.x), f.y); }
float interiorOcc(vec3 p){
  float r = length(p.xz);
  float drum = (1.0 - smoothstep(6.15, 6.75, r)) * (1.0 - smoothstep(4.9, 5.3, p.y));
  float dome = (1.0 - smoothstep(6.6, 6.85, length(p - vec3(0.0,5.0,0.0)))) * step(4.9, p.y);
  float ch = max(drum, dome);
  float pas = (1.0 - smoothstep(1.05, 1.45, abs(p.z))) * smoothstep(6.0, 6.6, p.x) * (1.0 - smoothstep(13.4, 15.3, p.x)) * (1.0 - smoothstep(3.55, 3.75, p.y));
  float pasEdge = (1.0 - smoothstep(1.05, 1.45, abs(p.z))) * smoothstep(13.4, 15.3, p.x) * (1.0 - smoothstep(15.3, 15.6, p.x)) * (1.0 - smoothstep(3.0, 3.6, p.y));
  return mix(1.0, 0.36, ch) * mix(1.0, 0.3, pas) * mix(1.0, 0.6, pasEdge);
}
`;
function patch(mat, { grime = 0, baseY = 0, grimeH = 1.0, occ = true, streak = 0 } = {}) {
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uBaseY = { value: baseY };
    sh.uniforms.uGrimeH = { value: grimeH };
    sh.uniforms.uGrime = { value: grime };
    sh.uniforms.uStreak = { value: streak };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\n' + GLSL_COMMON)
      .replace('#include <map_fragment>', `#include <map_fragment>
        {
          float big = vn(vWPos.xz * 0.35 + vWPos.y * 0.21) * 0.6 + vn(vWPos.xz * 1.7 - vWPos.y * 0.9) * 0.4;
          diffuseColor.rgb *= 0.9 + 0.2 * big;
          float yr = vWPos.y - uBaseY + (big - 0.5) * 0.5;
          float g = smoothstep(-0.05, uGrimeH, yr);
          diffuseColor.rgb *= mix(vec3(1.0), mix(vec3(0.66, 0.53, 0.4), vec3(1.0), g), uGrime);
          if (uStreak > 0.0) {
            float st = vn(vec2((vWPos.x * 0.7 + vWPos.z) * 7.0, vWPos.y * 0.35)) * vn(vec2((vWPos.x - vWPos.z * 0.6) * 2.3, 3.0));
            float band = smoothstep(uStreak - 2.2, uStreak - 0.1, vWPos.y) * (1.0 - smoothstep(uStreak - 0.1, uStreak + 0.05, vWPos.y));
            diffuseColor.rgb *= 1.0 - 0.32 * smoothstep(0.25, 0.7, st) * band;
          }
        }`)
      .replace('#include <lights_fragment_end>', occ ? `{ float oc = interiorOcc(vWPos); irradiance *= oc; iblIrradiance *= oc; radiance *= oc; }
        #include <lights_fragment_end>` : '#include <lights_fragment_end>');
  };
  mat.customProgramCacheKey = () => `p${grime}_${baseY}_${grimeH}_${occ}_${streak}`;
  return mat;
}
function stdMat(t, opts = {}, p = {}) {
  const m = new THREE.MeshStandardMaterial({
    map: t.map, normalMap: t.normalMap, roughnessMap: t.rmMap, metalnessMap: opts.metal ? t.rmMap : null,
    roughness: 1, metalness: opts.metal ? 1 : 0, ...opts.extra,
  });
  if (opts.color) m.color.set(opts.color);
  if (opts.normalScale) m.normalScale.set(opts.normalScale, opts.normalScale);
  return patch(m, p);
}
const M = {
  plaster: stdMat(tPlaster, { color: 0xffffff }, { grime: 1, baseY: 0.0, grimeH: 1.3, streak: 4.62 }),
  plasterIn: stdMat(tPlaster, { color: 0xf3e6d6 }, { grime: 1, baseY: 0.6, grimeH: 0.8 }),
  dome: stdMat(tPlaster, { color: 0xfff8ee }, { grime: 0 }),
  stone: stdMat(tStone, {}, { grime: 0.6, baseY: 0.0, grimeH: 0.5 }),
  masonry: stdMat(tMasonry, {}, { grime: 0.7, baseY: 0.0, grimeH: 0.6 }),
  floor: stdMat(tFloor, { normalScale: 0.55, color: 0xfff0e0 }, { grime: 0 }),
  tile: stdMat(tTile, { normalScale: 0.8 }, {}),
  bronze: stdMat(tBronze, { metal: true }, {}),
  bronzeDark: stdMat(tBronze, { metal: true, color: 0x8a7a68 }, {}),
  wood: stdMat(tWood, {}, {}),
  sand: stdMat(tSand, { normalScale: 0.7 }, {}),
  rock: stdMat(tRock, { color: 0xc49a7c }, {}),
  clay: stdMat(tStone, { color: 0xe0a07a, normalScale: 0.5 }, {}),
  iron: patch(new THREE.MeshStandardMaterial({ color: 0x2b2522, roughness: 0.55, metalness: 0.8 }), {}),
  glass: new THREE.MeshStandardMaterial({ color: 0x0b1a1e, roughness: 0.05, metalness: 0.2, envMapIntensity: 2.0 }),
  rubber: patch(new THREE.MeshStandardMaterial({ color: 0x151312, roughness: 0.75 }), {}),
  dial: patch(new THREE.MeshStandardMaterial({ map: dialTex, metalness: 0.85, roughness: 0.42 }), {}),
  sundial: patch(new THREE.MeshStandardMaterial({ map: sundialTex, metalness: 0.85, roughness: 0.45 }), { occ: false }),
};
// terrain material: vertex-colored rock
const terrainMat = new THREE.MeshStandardMaterial({ map: tRock.map, normalMap: tRock.normalMap, normalScale: new THREE.Vector2(0.3, 0.3), roughness: 0.95, vertexColors: true });
terrainMat.map = tRock.map;

// ---------------- geometry builder (merged by material) ----------------
const buckets = new Map();
function boxUV(g, off) {
  const p = g.attributes.position, n = g.attributes.normal;
  const uv = new Float32Array(p.count * 2);
  const ox = off ? off[0] : 0, oy = off ? off[1] : 0;
  for (let i = 0; i < p.count; i += 3) {
    let nx = 0, ny = 0, nz = 0;
    for (let k = 0; k < 3; k++) { nx += n.getX(i + k); ny += n.getY(i + k); nz += n.getZ(i + k); }
    const ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz);
    for (let k = 0; k < 3; k++) {
      const x = p.getX(i + k), y = p.getY(i + k), z = p.getZ(i + k);
      let u, v;
      if (ay >= ax && ay >= az) { u = x; v = z; } else if (ax >= az) { u = z; v = y; } else { u = x; v = y; }
      uv[(i + k) * 2] = u + ox; uv[(i + k) * 2 + 1] = v + oy;
    }
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
}
function add(geo, mat, matrix, opt = {}) {
  let g = geo.index ? geo.toNonIndexed() : geo.clone();
  if (matrix) g.applyMatrix4(matrix);
  if (opt.boxUV) boxUV(g, opt.uvOff || [Math.random() * 5, Math.random() * 5]);
  for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
  if (opt.uvScale) { const a = g.attributes.uv.array; for (let i = 0; i < a.length; i++) a[i] *= opt.uvScale; }
  const cast = opt.cast !== false;
  const key = mat.uuid + (cast ? 'c' : 'n');
  if (!buckets.has(key)) buckets.set(key, { mat, cast, geos: [] });
  buckets.get(key).geos.push(g);
}
function finalize() {
  for (const b of buckets.values()) {
    const g = mergeGeometries(b.geos, false);
    const mesh = new THREE.Mesh(g, b.mat);
    mesh.castShadow = b.cast; mesh.receiveShadow = true;
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
  }
}
const _q = new THREE.Quaternion(), _e = new THREE.Euler();
function mtx(x, y, z, rx = 0, ry = 0, rz = 0, s = 1) {
  return new THREE.Matrix4().compose(new V3(x, y, z), _q.setFromEuler(_e.set(rx, ry, rz)), new V3(s, s, s));
}
function along(from, dir, len) { // cylinder (Y-axis) from 'from' along dir
  const d = dir.clone().normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(new V3(0, 1, 0), d);
  return new THREE.Matrix4().compose(from.clone().addScaledVector(d, len / 2), q, new V3(1, 1, 1));
}
function box(mat, x0, x1, y0, y1, z0, z1, opt = {}) {
  const w = x1 - x0, h = y1 - y0, d = z1 - z0;
  const g = opt.round ? new RoundedBoxGeometry(w, h, d, 2, Math.min(opt.round, w / 2.1, h / 2.1, d / 2.1)) : new THREE.BoxGeometry(w, h, d);
  add(g, mat, mtx((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2, 0, opt.ry || 0, 0), { boxUV: true, cast: opt.cast });
}

// quad accumulator for custom shells
class Acc {
  constructor() { this.p = []; this.n = []; this.uv = []; }
  tri(a, b, c, na, nb, nc, ua, ub, uc) {
    this.p.push(...a, ...b, ...c); this.n.push(...na, ...nb, ...nc); this.uv.push(...ua, ...ub, ...uc);
  }
  quad(P, N, U) { // P: 4 points (arrays), N: 4 normals, U: 4 uvs ; auto winding to match normal
    const e1 = [P[2][0] - P[0][0], P[2][1] - P[0][1], P[2][2] - P[0][2]];
    const e2 = [P[3][0] - P[1][0], P[3][1] - P[1][1], P[3][2] - P[1][2]];
    const cx = e1[1] * e2[2] - e1[2] * e2[1], cy = e1[2] * e2[0] - e1[0] * e2[2], cz = e1[0] * e2[1] - e1[1] * e2[0];
    const nn = [N[0][0] + N[2][0], N[0][1] + N[2][1], N[0][2] + N[2][2]];
    if (cx * nn[0] + cy * nn[1] + cz * nn[2] >= 0) {
      this.tri(P[0], P[1], P[2], N[0], N[1], N[2], U[0], U[1], U[2]);
      this.tri(P[0], P[2], P[3], N[0], N[2], N[3], U[0], U[2], U[3]);
    } else {
      this.tri(P[0], P[2], P[1], N[0], N[2], N[1], U[0], U[2], U[1]);
      this.tri(P[0], P[3], P[2], N[0], N[3], N[2], U[0], U[3], U[2]);
    }
  }
  geo() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    return g;
  }
}
const angNorm = (a) => ((a % TAU) + TAU) % TAU;
const angIn = (a, a0, a1) => angNorm(a - a0) < angNorm(a1 - a0);

// thick ring wall with rectangular radial openings; returns {outer, inner, caps}
function ringWall(rIn, rOut, y0, y1, openings = [], segs = 128, range = null) {
  const ops = openings.map((o) => { const ha = Math.asin(o.hw / rIn); return { a0: angNorm(o.a - ha), a1: angNorm(o.a + ha), y0: o.y0, y1: o.y1 }; });
  let angles = [];
  if (range) {
    const span = angNorm(range[1] - range[0]) || TAU;
    const n = Math.max(2, Math.ceil(span / TAU * segs));
    for (let i = 0; i <= n; i++) angles.push(range[0] + span * i / n);
  } else {
    for (let i = 0; i <= segs; i++) angles.push(i / segs * TAU);
    for (const o of ops) { angles.push(o.a0, o.a1); }
    angles = [...new Set(angles.map((a) => +a.toFixed(6)))].sort((a, b) => a - b);
  }
  const outer = new Acc(), inner = new Acc(), caps = new Acc();
  const pt = (r, a, y) => [r * Math.cos(a), y, r * Math.sin(a)];
  for (let i = 0; i < angles.length - 1; i++) {
    const a0 = angles[i], a1 = angles[i + 1], am = (a0 + a1) / 2;
    let iv = [[y0, y1]];
    for (const o of ops) {
      if (!angIn(am, o.a0, o.a1)) continue;
      const nv = [];
      for (const [ya, yb] of iv) {
        if (o.y1 <= ya || o.y0 >= yb) { nv.push([ya, yb]); continue; }
        if (o.y0 > ya) nv.push([ya, o.y0]);
        if (o.y1 < yb) nv.push([o.y1, yb]);
      }
      iv = nv;
    }
    const n0 = [Math.cos(a0), 0, Math.sin(a0)], n1 = [Math.cos(a1), 0, Math.sin(a1)];
    const m0 = n0.map((v) => -v), m1 = n1.map((v) => -v);
    for (const [ya, yb] of iv) {
      outer.quad([pt(rOut, a0, ya), pt(rOut, a1, ya), pt(rOut, a1, yb), pt(rOut, a0, yb)], [n0, n1, n1, n0],
        [[a0 * rOut, ya], [a1 * rOut, ya], [a1 * rOut, yb], [a0 * rOut, yb]]);
      inner.quad([pt(rIn, a0, ya), pt(rIn, a1, ya), pt(rIn, a1, yb), pt(rIn, a0, yb)], [m0, m1, m1, m0],
        [[a0 * rIn, ya], [a1 * rIn, ya], [a1 * rIn, yb], [a0 * rIn, yb]]);
      const up = [0, 1, 0], dn = [0, -1, 0];
      const cap = (y, nrm) => caps.quad([pt(rIn, a0, y), pt(rOut, a0, y), pt(rOut, a1, y), pt(rIn, a1, y)], [nrm, nrm, nrm, nrm],
        [[rIn * Math.cos(a0), rIn * Math.sin(a0)], [rOut * Math.cos(a0), rOut * Math.sin(a0)], [rOut * Math.cos(a1), rOut * Math.sin(a1)], [rIn * Math.cos(a1), rIn * Math.sin(a1)]]);
      cap(yb, up);
      if (ya > y0 + 1e-4) cap(ya, dn);
    }
  }
  const jamb = (a, sgn, ya, yb) => {
    const t = [-Math.sin(a) * sgn, 0, Math.cos(a) * sgn];
    caps.quad([pt(rIn, a, ya), pt(rOut, a, ya), pt(rOut, a, yb), pt(rIn, a, yb)], [t, t, t, t],
      [[rIn, ya], [rOut, ya], [rOut, yb], [rIn, yb]]);
  };
  for (const o of ops) { jamb(o.a0, 1, o.y0, o.y1); jamb(o.a1, -1, o.y0, o.y1); }
  if (range) { jamb(angles[0], -1, y0, y1); jamb(angles[angles.length - 1], 1, y0, y1); }
  return { outer: outer.geo(), inner: inner.geo(), caps: caps.geo() };
}
// thin curved band surface (tiles), facing inward (sgn=-1) or outward (+1)
function ringBand(r, y0, y1, a0, a1, sgn) {
  const acc = new Acc();
  const span = a1 - a0, n = Math.max(2, Math.ceil(Math.abs(span) * r / 0.3));
  for (let i = 0; i < n; i++) {
    const b0 = a0 + span * i / n, b1 = a0 + span * (i + 1) / n;
    const p = (a, y) => [r * Math.cos(a), y, r * Math.sin(a)];
    const nn = (a) => [Math.cos(a) * sgn, 0, Math.sin(a) * sgn];
    acc.quad([p(b0, y0), p(b1, y0), p(b1, y1), p(b0, y1)], [nn(b0), nn(b1), nn(b1), nn(b0)],
      [[b0 * r, 0], [b1 * r, 0], [b1 * r, y1 - y0], [b0 * r, y1 - y0]]);
  }
  return acc.geo();
}

// thick spherical patch, parameterised by x-slice (constant x lines => planar slit edges)
// point(rad, x, alpha) = (x, sqrt(rad^2-x^2) sin a, sqrt(rad^2-x^2) cos a)
function spherePatch(R1, R2, xlo, xhi, alo, ahi, nx = 24, na = 40, edges = true) {
  const acc = new Acc();
  const X = (rad, t) => { const lo = xlo === -Infinity ? -rad : xlo, hi = xhi === Infinity ? rad : xhi; return lo + (hi - lo) * t; };
  const P = (rad, t, a) => { const x = X(rad, t); const c = Math.sqrt(Math.max(0, rad * rad - x * x)); return [x, c * Math.sin(a), c * Math.cos(a)]; };
  const nrm = (p, s) => { const l = Math.hypot(p[0], p[1], p[2]) * s; return [p[0] / l, p[1] / l, p[2] / l]; };
  for (const [rad, s] of [[R2, 1], [R1, -1]]) {
    for (let i = 0; i < nx; i++) for (let j = 0; j < na; j++) {
      const t0 = i / nx, t1 = (i + 1) / nx, b0 = alo + (ahi - alo) * j / na, b1 = alo + (ahi - alo) * (j + 1) / na;
      const p = [P(rad, t0, b0), P(rad, t1, b0), P(rad, t1, b1), P(rad, t0, b1)];
      acc.quad(p, p.map((q) => nrm(q, s)), [[p[0][0], b0 * rad], [p[1][0], b0 * rad], [p[2][0], b1 * rad], [p[3][0], b1 * rad]]);
    }
  }
  if (edges) {
    for (const [t, sx] of [[0, -1], [1, 1]]) { // x edges
      for (let j = 0; j < na; j++) {
        const b0 = alo + (ahi - alo) * j / na, b1 = alo + (ahi - alo) * (j + 1) / na;
        const p = [P(R1, t, b0), P(R2, t, b0), P(R2, t, b1), P(R1, t, b1)];
        const n = [sx, 0, 0];
        acc.quad(p, [n, n, n, n], [[p[0][2], p[0][1]], [p[1][2], p[1][1]], [p[2][2], p[2][1]], [p[3][2], p[3][1]]]);
      }
    }
    for (const [a, sa] of [[alo, -1], [ahi, 1]]) { // alpha edges
      for (let i = 0; i < nx; i++) {
        const t0 = i / nx, t1 = (i + 1) / nx;
        const p = [P(R1, t0, a), P(R2, t0, a), P(R2, t1, a), P(R1, t1, a)];
        const n = [0, Math.cos(a) * sa, -Math.sin(a) * sa];
        acc.quad(p, [n, n, n, n], [[p[0][0], 0], [p[1][0], R2 - R1], [p[2][0], R2 - R1], [p[3][0], 0]]);
      }
    }
  }
  return acc.geo();
}

// sand drift along a polyline [[x,z],...] lying at height y, spreading to side (+1/-1)
function drift(pts, y, w, h, side, seed = 1, yFn = null) {
  const samples = [];
  let L = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1];
    const len = Math.hypot(bx - ax, bz - az), n = Math.max(1, Math.ceil(len / 0.18));
    const tx = (bx - ax) / len, tz = (bz - az) / len;
    for (let k = 0; k < n; k++) samples.push({ x: ax + (bx - ax) * k / n, z: az + (bz - az) * k / n, tx, tz, s: L + len * k / n });
    L += len;
    if (i === pts.length - 2) samples.push({ x: bx, z: bz, tx, tz, s: L });
  }
  const C = 7;
  const pos = [], idx = [];
  for (const sm of samples) {
    const taper = Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0, sm.s / L))), 0.55);
    const hh = h * taper * (0.65 + 0.7 * TX.vnoise(sm.s * 0.9, 0.5, 0, seed));
    const ww = w * (0.7 + 0.6 * TX.vnoise(sm.s * 0.6, 2.5, 0, seed + 1)) * (0.35 + 0.65 * taper);
    const nx = -sm.tz * side, nz = sm.tx * side;
    for (let j = 0; j <= C; j++) {
      const f = j / C;
      const off = -0.03 + f * ww;
      const x = sm.x + nx * off, z = sm.z + nz * off;
      const by = yFn ? yFn(x, z) : y;
      pos.push(x, by + hh * Math.pow(1 - f, 1.7) - (j === C ? 0.015 : 0) + (j > 0 && j < C ? 0.008 * TX.vnoise(x * 6, z * 6, 0, seed + 2) : 0), z);
    }
  }
  for (let i = 0; i < samples.length - 1; i++) for (let j = 0; j < C; j++) {
    const a = i * (C + 1) + j, b = a + 1, c = a + C + 1, d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  // ensure normals point up
  const nA = g.attributes.normal;
  let up = 0; for (let i = 0; i < nA.count; i++) up += nA.getY(i);
  if (up < 0) { const ix = g.index.array; for (let i = 0; i < ix.length; i += 3) { const t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; } g.computeVertexNormals(); }
  const ng = g.toNonIndexed();
  boxUV(ng, [0, 0]);
  add(ng, M.sand, null, { cast: false });
}

// ---------------- collision world ----------------
const segs = [], circles = [];
const seg = (ax, az, bx, bz) => segs.push([ax, az, bx, bz]);
function arcSegs(r, a0, a1, cx = 0, cz = 0) {
  const n = Math.max(1, Math.ceil(Math.abs(a1 - a0) * r / 0.4));
  for (let i = 0; i < n; i++) {
    const b0 = a0 + (a1 - a0) * i / n, b1 = a0 + (a1 - a0) * (i + 1) / n;
    seg(cx + r * Math.cos(b0), cz + r * Math.sin(b0), cx + r * Math.cos(b1), cz + r * Math.sin(b1));
  }
}

// ---------------- terrain ----------------
const PC = [4, 0]; // plateau center
function edgeR(th) { return 25 + 2.2 * Math.sin(3 * th + 0.5) + 1.3 * Math.sin(5 * th + 2) + 0.8 * Math.sin(9 * th + 1); }
function plateauS(x, z) { const dx = x - PC[0], dz = z - PC[1]; return Math.hypot(dx, dz) - edgeR(Math.atan2(dz, dx)); }
function distSeg(px, pz, ax, az, bx, bz) {
  const vx = bx - ax, vz = bz - az; const t = Math.max(0, Math.min(1, ((px - ax) * vx + (pz - az) * vz) / (vx * vx + vz * vz)));
  return Math.hypot(px - ax - vx * t, pz - az - vz * t);
}
function terrainH(x, z) {
  const s = plateauS(x, z);
  const db = distSeg(x, z, -17, 0, 17, 0);
  const att = THREE.MathUtils.smoothstep(db, 9, 17);
  let top = -0.05 + att * ((TX.vnoise(x * 0.12, z * 0.12, 0, 5) - 0.5) * 0.9 + (TX.vnoise(x * 0.5, z * 0.5, 0, 6) - 0.5) * 0.18);
  top -= THREE.MathUtils.smoothstep(s, -3, 0) * 0.35;
  if (s <= 0) return top;
  const t = Math.min(1, s / 15);
  let hh = 44 * THREE.MathUtils.smoothstep(t, 0, 1);
  const k = Math.floor(hh / 5.5), f = hh / 5.5 - k;
  hh = (k + THREE.MathUtils.smoothstep(f, 0.25, 0.75)) * 5.5;
  const far = Math.max(0, s - 15);
  return top - hh - Math.min(far * 0.05, 2) + (s > 15 ? (TX.vnoise(x * 0.03, z * 0.03, 0, 9) - 0.5) * 3 * Math.min(1, far / 20) : 0);
}
function buildTerrain() {
  const size = 260, seg = 300;
  const g = new THREE.PlaneGeometry(size, size, seg, seg);
  g.rotateX(-Math.PI / 2);
  g.translate(PC[0], 0, PC[1]);
  const p = g.attributes.position;
  const col = new Float32Array(p.count * 3);
  const uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i);
    const y = terrainH(x, z);
    p.setY(i, y);
    uv.setXY(i, x / 5, z / 5);
    const s = plateauS(x, z);
    let r = 0.78, gg = 0.6, b = 0.45;
    if (s > 0 && s < 15) { // cliff strata
      const band = Math.sin(y * 1.3 + TX.vnoise(x * 0.1, z * 0.1, 0, 3) * 2) * 0.5 + 0.5;
      r = 0.62 + 0.14 * band; gg = 0.4 + 0.1 * band; b = 0.3 + 0.07 * band;
    }
    let sand = THREE.MathUtils.smoothstep(TX.vnoise(x * 0.09, z * 0.09, 0, 12) + TX.vnoise(x * 0.4, z * 0.4, 0, 13) * 0.3, 0.68, 0.9);
    // leeward (east) of the building collects sand
    const lee = THREE.MathUtils.smoothstep(x, 5, 9) * (1 - THREE.MathUtils.smoothstep(x, 20, 32)) * (1 - THREE.MathUtils.smoothstep(Math.abs(z), 6, 14));
    sand = Math.max(sand, lee * THREE.MathUtils.smoothstep(TX.vnoise(x * 0.3, z * 0.3, 0, 14), 0.25, 0.6));
    if (s > 14) sand = 1;
    const sr = 0.92, sg = 0.76, sb = 0.56;
    col[i * 3] = r + (sr - r) * sand; col[i * 3 + 1] = gg + (sg - gg) * sand; col[i * 3 + 2] = b + (sb - b) * sand;
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.computeVertexNormals();
  const mesh = new THREE.Mesh(g, terrainMat);
  mesh.receiveShadow = true; mesh.castShadow = true; mesh.renderOrder = 1;
  mesh.matrixAutoUpdate = false;
  scene.add(mesh);

  // far desert floor with dunes
  const fg = new THREE.PlaneGeometry(9000, 9000, 160, 160);
  fg.rotateX(-Math.PI / 2);
  const fp = fg.attributes.position, fuv = fg.attributes.uv;
  for (let i = 0; i < fp.count; i++) {
    const x = fp.getX(i), z = fp.getZ(i);
    const d = Math.hypot(x - PC[0], z);
    const dune = (Math.sin(x * 0.012 + Math.sin(z * 0.004) * 3) * 0.5 + 0.5) * 9 + TX.vnoise(x * 0.004, z * 0.004, 0, 21) * 14;
    fp.setY(i, -47.5 + dune * THREE.MathUtils.smoothstep(d, 150, 400));
    fuv.setXY(i, x / 40, z / 40);
  }
  fg.computeVertexNormals();
  const desertMat = new THREE.MeshStandardMaterial({ map: tSand.map, color: 0xe9c49a, roughness: 1 });
  const far = new THREE.Mesh(fg, desertMat); far.renderOrder = 2;
  far.matrixAutoUpdate = false;
  scene.add(far);

  // distant mesas (silhouettes)
  const mesaMat = new THREE.MeshStandardMaterial({ color: 0xc89878, roughness: 1, flatShading: true });
  const rnd = mulberry(77);
  const mesaGeos = [];
  for (let i = 0; i < 14; i++) {
    const ang = rnd() * TAU, dist = 1600 + rnd() * 2400, R = 60 + rnd() * 200, H = 40 + rnd() * 110;
    const eg = new THREE.CylinderGeometry(R, R * 1.7, H, 11, 4);
    const mp = eg.attributes.position;
    const sd = Math.floor(rnd() * 1000);
    for (let k = 0; k < mp.count; k++) {
      const x = mp.getX(k), y = mp.getY(k), z = mp.getZ(k);
      const a = Math.atan2(z, x);
      const f = 0.75 + 0.5 * TX.vnoise(Math.cos(a) * 2 + 5, Math.sin(a) * 2 + y / H, 0, sd);
      const yy = y < H / 2 - 1 ? y - H * 0.25 * (1 - (y + H / 2) / H) : y;
      mp.setXYZ(k, x * f, yy, z * f);
    }
    eg.translate(Math.cos(ang) * dist, -50 + H / 2, Math.sin(ang) * dist);
    for (const k of Object.keys(eg.attributes)) if (k !== 'position') eg.deleteAttribute(k);
    eg.computeVertexNormals();
    mesaGeos.push(eg.toNonIndexed());
  }
  const mg = mergeGeometries(mesaGeos); mg.computeVertexNormals();
  const mesas = new THREE.Mesh(mg, mesaMat); mesas.renderOrder = 2;
  mesas.matrixAutoUpdate = false;
  scene.add(mesas);
}
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

// ---------------- architecture ----------------
const FL = 0.6;          // floor level of the building
const R_IN = 6.0, R_OUT = 6.9, DRUM_TOP = 5.0;
const deg = THREE.MathUtils.degToRad;
const doorE = { a: 0, hw: 0.8, y0: FL, y1: FL + 2.55 };
const doorW = { a: Math.PI, hw: 0.9, y0: FL, y1: FL + 2.75 };
const winAngles = [deg(45), deg(90), deg(135), deg(-45), deg(-90), deg(-135)];
const windows = winAngles.map((a) => ({ a, hw: 0.42, y0: FL + 1.55, y1: FL + 2.75 }));

function buildDrum() {
  // stone plinth ring (floor level threshold)
  const pl = ringWall(R_IN, 7.15, -0.3, FL, [], 128);
  add(pl.outer, M.masonry, null, { uvScale: 1 }); add(pl.caps, M.stone, null); add(pl.inner, M.masonry, null);
  // plaster drum
  const w = ringWall(R_IN, R_OUT, FL, DRUM_TOP, [doorE, doorW, ...windows], 160);
  add(w.outer, M.plaster, null); add(w.inner, M.plasterIn, null); add(w.caps, M.plasterIn, null);
  // cornice band at drum top
  const lathe = new THREE.LatheGeometry([
    new THREE.Vector2(6.88, DRUM_TOP - 0.42), new THREE.Vector2(7.0, DRUM_TOP - 0.36), new THREE.Vector2(7.04, DRUM_TOP - 0.2),
    new THREE.Vector2(7.16, DRUM_TOP - 0.14), new THREE.Vector2(7.18, DRUM_TOP), new THREE.Vector2(6.9, DRUM_TOP + 0.01)], 160);
  add(lathe, M.plaster, null, { boxUV: true });
  // bronze dome rail
  add(new THREE.TorusGeometry(6.97, 0.055, 8, 180), M.bronzeDark, mtx(0, DRUM_TOP + 0.05, 0, Math.PI / 2, 0, 0));
  // interior stone skirting + glazed tile band
  const sk = ringWall(R_IN - 0.035, R_IN, FL, FL + 0.16, [doorE, doorW], 128);
  add(sk.inner, M.stone, null); add(sk.caps, M.stone, null);
  const tileSpans = [[deg(9), deg(171)], [deg(189), deg(351)]];
  for (const [a0, a1] of tileSpans) {
    add(ringBand(R_IN - 0.012, FL + 0.9, FL + 1.2, a0, a1, -1), M.tile, null, { cast: false });
    // bronze strip edges
    const t1 = ringWall(R_IN - 0.03, R_IN, FL + 0.87, FL + 0.9, [], 64, [a0, a1]);
    add(t1.inner, M.bronzeDark, null, { cast: false }); add(t1.caps, M.bronzeDark, null, { cast: false });
    const t2 = ringWall(R_IN - 0.03, R_IN, FL + 1.2, FL + 1.23, [], 64, [a0, a1]);
    add(t2.inner, M.bronzeDark, null, { cast: false }); add(t2.caps, M.bronzeDark, null, { cast: false });
  }
  // windows: stone sills, bronze grilles, tiled reveals
  for (const o of windows) {
    const c = Math.cos(o.a), s = Math.sin(o.a);
    const m = new THREE.Matrix4().makeRotationY(-o.a + Math.PI / 2);
    const place = (geo, mat, rr, y, opt) => { const mm = new THREE.Matrix4().makeTranslation(rr * c, y, rr * s).multiply(m); add(geo, mat, mm, opt); };
    place(new RoundedBoxGeometry(1.15, 0.1, 1.25, 2, 0.025), M.stone, 6.5, o.y0 - 0.04, { boxUV: true });
    for (const dx of [-0.22, 0, 0.22]) {
      const mm = new THREE.Matrix4().makeTranslation(6.55 * c - s * dx, (o.y0 + o.y1) / 2, 6.55 * s + c * dx);
      add(new THREE.CylinderGeometry(0.018, 0.018, o.y1 - o.y0, 8), M.bronzeDark, mm);
    }
    const hb = new THREE.Matrix4().makeTranslation(6.55 * c, o.y0 + 0.55, 6.55 * s).multiply(m).multiply(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
    add(new THREE.CylinderGeometry(0.016, 0.016, 0.86, 8), M.bronzeDark, hb);
    // lintel stone outside
    place(new RoundedBoxGeometry(1.35, 0.22, 0.12, 2, 0.03), M.stone, 6.95, o.y1 + 0.11, { boxUV: true });
  }
  // door lintels (outside + inside), west door tile surround
  for (const d of [doorE, doorW]) {
    const c = Math.cos(d.a), s = Math.sin(d.a);
    const m = new THREE.Matrix4().makeRotationY(-d.a + Math.PI / 2);
    const mm = new THREE.Matrix4().makeTranslation(6.45 * c, d.y1 + 0.18, 6.45 * s).multiply(m);
    add(new RoundedBoxGeometry(2.6, 0.36, 1.06, 2, 0.04), M.stone, mm, { boxUV: true });
  }
  const aw = Math.asin(0.9 / R_OUT) + 0.005;
  add(ringBand(R_OUT + 0.012, FL, FL + 2.75 + 0.36 + 0.3, Math.PI - aw - 0.045, Math.PI - aw, 1), M.tile, null, { cast: false });
  add(ringBand(R_OUT + 0.012, FL, FL + 2.75 + 0.36 + 0.3, Math.PI + aw, Math.PI + aw + 0.045, 1), M.tile, null, { cast: false });
  add(ringBand(R_OUT + 0.012, FL + 2.75 + 0.36, FL + 2.75 + 0.36 + 0.3, Math.PI - aw, Math.PI + aw, 1), M.tile, null, { cast: false });
  // floor
  const fl = new THREE.CircleGeometry(R_IN + 0.01, 96); fl.rotateX(-Math.PI / 2); fl.translate(0, FL, 0);
  add(fl, M.floor, null, { boxUV: true, uvOff: [0, 0] });
  const ring = new THREE.RingGeometry(1.05, 1.85, 96, 2); ring.rotateX(-Math.PI / 2); ring.translate(0, FL + 0.004, 0);
  add(ring, M.tile, null, { boxUV: true, uvOff: [0, 0], cast: false });
  for (const r of [1.05, 1.85]) add(new THREE.TorusGeometry(r, 0.022, 6, 128), M.bronzeDark, mtx(0, FL + 0.004, 0, Math.PI / 2, 0, 0), { cast: false });
  // meridian line (north-south) in bronze
  for (const sgn of [-1, 1]) {
    box(M.bronze, -0.035, 0.035, FL - 0.01, FL + 0.008, sgn > 0 ? 1.9 : -5.95, sgn > 0 ? 5.95 : -1.9, { cast: false });
    for (let k = 0; k < 5; k++) { const z = sgn * (2.3 + k * 0.85); add(new THREE.CylinderGeometry(0.06, 0.06, 0.012, 20), M.bronze, mtx(0, FL + 0.003, z), { cast: false }); }
  }
  // stone benches inside (north & south arcs)
  for (const [a0, a1] of [[deg(62), deg(118)], [deg(242), deg(298)]]) {
    const b = ringWall(5.5, R_IN, FL, FL + 0.46, [], 64, [a0, a1]);
    add(b.outer, M.stone, null); add(b.inner, M.stone, null); add(b.caps, M.stone, null);
    arcSegs(5.5, a0, a1);
    seg(5.5 * Math.cos(a0), 5.5 * Math.sin(a0), 6 * Math.cos(a0), 6 * Math.sin(a0));
    seg(5.5 * Math.cos(a1), 5.5 * Math.sin(a1), 6 * Math.cos(a1), 6 * Math.sin(a1));
  }
  // collisions: inner and outer arcs with door gaps
  const ge = Math.asin(doorE.hw / R_IN), gw = Math.asin(doorW.hw / R_IN);
  arcSegs(R_IN, ge, Math.PI - gw); arcSegs(R_IN, Math.PI + gw, TAU - ge);
  arcSegs(R_OUT, ge, Math.PI - gw); arcSegs(R_OUT, Math.PI + gw, TAU - ge);
  for (const a of [ge, -ge, Math.PI - gw, Math.PI + gw]) seg(R_IN * Math.cos(a), R_IN * Math.sin(a), R_OUT * Math.cos(a), R_OUT * Math.sin(a));
}

function buildDome() {
  const R = 6.96, r = 6.66, hw = 1.0, aS = 0.07, aE = Math.PI / 2 + 0.38;
  const rot = deg(-30);
  const base = new THREE.Matrix4().makeTranslation(0, DRUM_TOP + 0.05, 0).multiply(new THREE.Matrix4().makeRotationY(rot));
  const parts = [
    spherePatch(r, R, -Infinity, -hw, 0, Math.PI, 26, 72),
    spherePatch(r, R, hw, Infinity, 0, Math.PI, 26, 72),
    spherePatch(r, R, -hw, hw, 0, aS, 8, 2),
    spherePatch(r, R, -hw, hw, aE, Math.PI, 8, 30),
  ];
  for (const p of parts) add(p, M.dome, base);
  // slit coaming rails (bronze) and up-and-over shutter
  add(spherePatch(R - 0.02, R + 0.16, hw, hw + 0.13, aS, Math.PI - 0.06, 2, 70), M.bronze, base);
  add(spherePatch(R - 0.02, R + 0.16, -hw - 0.13, -hw, aS, Math.PI - 0.06, 2, 70), M.bronze, base);
  add(spherePatch(R + 0.17, R + 0.24, -hw - 0.1, hw + 0.1, aE + 0.06, aE + 0.98, 10, 24), M.bronzeDark, base);
  // shutter ribs
  for (let k = 0; k < 5; k++) {
    const a = aE + 0.12 + k * 0.2;
    add(spherePatch(R + 0.24, R + 0.29, -hw - 0.08, hw + 0.08, a, a + 0.025, 6, 1), M.bronze, base);
  }
  // inner ribs parallel to slit + inner base ring (wood)
  for (const x0 of [-5.4, -4.1, -2.6, 1.5, 3.0, 4.4]) {
    add(spherePatch(r - 0.13, r, x0, x0 + 0.13, 0.02, Math.PI - 0.02, 1, 60), M.wood, base);
  }
  for (const a of [0.55, 1.2]) {
    // horizontal-ish rings not crossing slit: two arcs on each side
    add(spherePatch(r - 0.1, r, -Infinity, -hw, a, a + 0.05, 16, 1), M.wood, base);
    add(spherePatch(r - 0.1, r, hw, Infinity, a, a + 0.05, 16, 1), M.wood, base);
    add(spherePatch(r - 0.1, r, -Infinity, -hw, Math.PI - a - 0.05, Math.PI - a, 16, 1), M.wood, base);
    add(spherePatch(r - 0.1, r, hw, Infinity, Math.PI - a - 0.05, Math.PI - a, 16, 1), M.wood, base);
  }
  add(new THREE.TorusGeometry(6.55, 0.09, 8, 160), M.wood, mtx(0, DRUM_TOP + 0.12, 0, Math.PI / 2, 0, 0));
  // drive wheels on the rail (small bronze bogies)
  for (let k = 0; k < 10; k++) {
    const a = k / 10 * TAU + 0.2;
    add(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), M.bronzeDark, mtx(6.45 * Math.cos(a), DRUM_TOP + 0.13, 6.45 * Math.sin(a), 0, -a, Math.PI / 2));
  }
}

function buildPassage() {
  const x0 = 6.6, x1 = 15.0, zi = 1.0, zo = 1.7, top = 3.6;
  // floor slab
  box(M.floor, 7.15, x1, -0.3, FL, -zi - 0.05, zi + 0.05);
  box(M.masonry, 7.0, x1, -0.3, FL - 0.02, -zo, zo);
  // walls with deep windows on the south side
  const wins = [[9.0, 9.55], [12.0, 12.55]];
  const wy0 = FL + 1.25, wy1 = FL + 2.2;
  for (const sgn of [-1, 1]) {
    const za = sgn > 0 ? zi : -zo, zb = sgn > 0 ? zo : -zi;
    if (sgn > 0) {
      let cx = x0;
      for (const [a, b] of wins) {
        box(M.plaster, cx, a, 0, top, za, zb);
        box(M.plaster, a, b, 0, wy0, za, zb);
        box(M.plaster, a, b, wy1, top, za, zb);
        box(M.stone, a - 0.08, b + 0.08, wy0 - 0.06, wy0, za - 0.05, zb + 0.08, { round: 0.02 });
        for (const dx of [0.18, 0.37]) add(new THREE.CylinderGeometry(0.015, 0.015, wy1 - wy0, 8), M.bronzeDark, mtx(a + dx, (wy0 + wy1) / 2, (za + zb) / 2));
        cx = b;
      }
      box(M.plaster, cx, x1, 0, top, za, zb);
    } else {
      box(M.plaster, x0, x1, 0, top, za, zb);
      // shallow niche with tiles on the north wall (inner face)
      box(M.tile, 10.6, 11.6, FL + 1.0, FL + 1.9, -zi - 0.012, -zi + 0.004, { cast: false });
      box(M.stone, 10.5, 11.7, FL + 0.92, FL + 1.0, -zi - 0.02, -zi + 0.07, { round: 0.015 });
    }
    seg(x0, sgn * zi, x1, sgn * zi);
    seg(x0 + 0.3, sgn * zo, x1, sgn * zo);
    seg(x1, sgn * zi, x1, sgn * zo);
  }
  // entrance lintel: deep opening
  box(M.stone, x1 - 0.72, x1 + 0.06, FL + 2.45, FL + 2.85, -zo, zo, { round: 0.03 });
  box(M.plaster, x1 - 0.7, x1, FL + 2.85, top, -zi, zi);
  // roof slab, parapet and wood ceiling
  box(M.plaster, x0, x1 + 0.25, top, top + 0.42, -zo - 0.2, zo + 0.2);
  box(M.plaster, x0, x1 + 0.25, top + 0.42, top + 0.72, -zo - 0.2, -zo + 0.08);
  box(M.plaster, x0, x1 + 0.25, top + 0.42, top + 0.72, zo - 0.08, zo + 0.2);
  box(M.plaster, x1 - 0.03, x1 + 0.25, top + 0.42, top + 0.72, -zo + 0.08, zo - 0.08);
  box(M.wood, x0, x1 - 0.7, top - 0.03, top, -zi, zi, { cast: false });
  // vigas
  for (let x = 7.4; x < x1 - 0.5; x += 0.85) {
    add(new THREE.CylinderGeometry(0.1, 0.11, 2 * zo + 0.9, 12, 1), M.wood, mtx(x, top - 0.1, 0, Math.PI / 2, 0, 0.02 * Math.sin(x * 7)));
  }
  // canales (drain spouts)
  for (const x of [9.5, 13.2]) box(M.wood, x - 0.12, x + 0.12, top + 0.42, top + 0.58, -zo - 0.85, -zo - 0.1);
  // corner quoins at entrance
  for (const sgn of [-1, 1]) {
    for (let k = 0; k < 7; k++) {
      const y = k * 0.46, long = k % 2 === 0;
      const zc = sgn * (zo - (long ? 0.3 : 0.18));
      box(M.stone, x1 - (long ? 0.2 : 0.36), x1 + 0.04, y, y + 0.44, zc - (long ? 0.34 : 0.22), zc + (long ? 0.34 : 0.22), { round: 0.03 });
    }
  }
  // entrance steps
  const steps = [[15.0, 15.42, FL - 0.15], [15.42, 15.84, FL - 0.3], [15.84, 16.26, FL - 0.45]];
  for (const [a, b, h] of steps) box(M.stone, a - 0.05, b, -0.3, h, -1.62, 1.62, { round: 0.035 });
  for (const sgn of [-1, 1]) {
    box(M.masonry, x1, 16.4, -0.3, FL + 0.18, sgn > 0 ? 1.62 : -2.05, sgn > 0 ? 2.05 : -1.62);
    box(M.stone, x1 - 0.02, 16.48, FL + 0.18, FL + 0.28, sgn > 0 ? 1.58 : -2.1, sgn > 0 ? 2.1 : -1.58, { round: 0.03 });
    seg(x1, sgn * 1.62, 16.4, sgn * 1.62);
    seg(16.4, sgn * 1.62, 16.4, sgn * 2.05);
  }
  // heavy wooden door leaf standing open against north interior wall
  box(M.wood, x1 - 1.95, x1 - 0.72, FL + 0.02, FL + 2.4, -zi + 0.02, -zi + 0.11);
  for (let k = 0; k < 4; k++) for (let j = 0; j < 3; j++) add(new THREE.SphereGeometry(0.018, 8, 6), M.bronze, mtx(x1 - 1.8 + j * 0.45, FL + 0.3 + k * 0.6, -zi + 0.115));
  seg(x1 - 1.95, -zi + 0.12, x1 - 0.72, -zi + 0.12);
}

function buildTerrace() {
  const xW = -16.5;
  const shape = new THREE.Shape();
  const ra = 7.15, xE = -2.0;
  const zE = Math.sqrt(ra * ra - xE * xE);
  // shape coords: (x, -z)
  shape.moveTo(xE, -7); shape.lineTo(xW, -7); shape.lineTo(xW, 7); shape.lineTo(xE, 7); shape.lineTo(xE, zE);
  const a0 = Math.atan2(zE, xE), a1 = Math.atan2(-zE, xE) + TAU;
  for (let i = 0; i <= 40; i++) { const a = a0 + (a1 - a0) * i / 40; shape.lineTo(ra * Math.cos(a), ra * Math.sin(a)); }
  shape.lineTo(xE, -7);
  const mk = (d, y) => { const g = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false, curveSegments: 4 }); g.rotateX(-Math.PI / 2); g.translate(0, y, 0); return g; };
  add(mk(0.85, -0.3), M.masonry, null, { boxUV: true });
  add(mk(0.06, FL - 0.06), M.floor, null, { boxUV: true });
  // coping lip along platform edge
  box(M.stone, xW - 0.06, xE, FL - 0.1, FL - 0.02, 6.98, 7.08, { round: 0.02 });
  box(M.stone, xW - 0.06, xE, FL - 0.1, FL - 0.02, -7.08, -6.98, { round: 0.02 });
  // parapet walls with stone coping
  const pt = 0.45, ph = 0.95;
  box(M.plaster, xW, xW + pt, FL, FL + ph, -7, 7);
  box(M.plaster, xW + pt, xE, FL, FL + ph, -7, -7 + pt);
  box(M.plaster, xW + pt, -12.5, FL, FL + ph, 7 - pt, 7);
  box(M.plaster, -10.5, xE, FL, FL + ph, 7 - pt, 7);
  const cap = (x0, x1, z0, z1) => box(M.stone, x0, x1, FL + ph, FL + ph + 0.1, z0, z1, { round: 0.03 });
  cap(xW - 0.06, xW + pt + 0.06, -7.06, 7.06);
  cap(xW + pt + 0.06, xE, -7.06, -7 + pt + 0.06);
  cap(xW + pt + 0.06, -12.5 + 0.06, 7 - pt - 0.06, 7.06);
  cap(-10.5 - 0.06, xE, 7 - pt - 0.06, 7.06);
  // tile inlay strip on parapet face toward the terrace (west wall)
  box(M.tile, xW + pt, xW + pt + 0.012, FL + 0.55, FL + 0.7, -5.5, 5.5, { cast: false });
  // collision
  seg(xW + pt, -7 + pt, xW + pt, 7 - pt);
  seg(xW + pt, -7 + pt, xE, -7 + pt);
  seg(xW + pt, 7 - pt, -12.5, 7 - pt); seg(-10.5, 7 - pt, xE, 7 - pt);
  seg(-12.5, 7 - pt, -12.5, 7); seg(-10.5, 7 - pt, -10.5, 7);
  // south stairs down to the plateau
  const st = [[7.0, 7.42, FL - 0.15], [7.42, 7.84, FL - 0.3], [7.84, 8.26, FL - 0.45]];
  for (const [a, b, h] of st) box(M.stone, -12.5, -10.5, -0.35, h, a - 0.05, b, { round: 0.035 });
  // sundial on pedestal
  const sx = -11.6, sz = -3.4;
  add(new THREE.CylinderGeometry(0.42, 0.48, 0.16, 8), M.stone, mtx(sx, FL + 0.08, sz), { boxUV: true });
  add(new THREE.CylinderGeometry(0.24, 0.28, 0.72, 8), M.stone, mtx(sx, FL + 0.52, sz), { boxUV: true });
  add(new THREE.CylinderGeometry(0.4, 0.3, 0.12, 8), M.stone, mtx(sx, FL + 0.94, sz), { boxUV: true });
  add(new THREE.CylinderGeometry(0.36, 0.36, 0.025, 48), M.bronze, mtx(sx, FL + 1.012, sz));
  const dg = new THREE.CircleGeometry(0.35, 48); dg.rotateX(-Math.PI / 2);
  add(dg, M.sundial, mtx(sx, FL + 1.026, sz, 0, Math.PI, 0), { cast: false });
  const gs = new THREE.Shape(); gs.moveTo(-0.3, 0); gs.lineTo(0.26, 0); gs.lineTo(-0.3, 0.56 * Math.tan(deg(32))); gs.lineTo(-0.3, 0);
  const gg = new THREE.ExtrudeGeometry(gs, { depth: 0.014, bevelEnabled: false }); gg.translate(0, 0, -0.007);
  add(gg, M.bronze, mtx(sx, FL + 1.026, sz, 0, Math.PI / 2, 0));
  circles.push([sx, sz, 0.5]);
  // stone bench along west parapet
  for (const zc of [-3.6, 3.2]) {
    box(M.stone, xW + pt, xW + pt + 0.48, FL + 0.4, FL + 0.48, zc - 1.1, zc + 1.1, { round: 0.03 });
    for (const dz of [-0.85, 0.85]) box(M.masonry, xW + pt + 0.04, xW + pt + 0.42, FL, FL + 0.4, zc + dz - 0.18, zc + dz + 0.18);
    seg(xW + pt + 0.48, zc - 1.1, xW + pt + 0.48, zc + 1.1);
  }
  // clay water jars near the door
  for (const [x, z, s] of [[-7.6, -4.9, 1], [-8.15, -5.4, 0.8]]) {
    const pts = [];
    for (let i = 0; i <= 14; i++) { const t = i / 14; pts.push(new THREE.Vector2((0.12 + Math.sin(t * Math.PI) * 0.2 + (t > 0.85 ? 0.04 : 0)) * s, t * 0.75 * s)); }
    add(new THREE.LatheGeometry(pts, 24), M.clay, mtx(x, FL, z), { boxUV: true });
    circles.push([x, z, 0.3 * s]);
  }
}

// ---------------- the telescope (German equatorial mount) ----------------
function buildTelescope() {
  const B = M.bronze, BD = M.bronzeDark;
  // stone pier
  add(new THREE.CylinderGeometry(0.8, 0.86, 0.18, 8), M.stone, mtx(0, FL + 0.09, 0, 0, Math.PI / 8, 0), { boxUV: true });
  add(new THREE.CylinderGeometry(0.62, 0.7, 0.14, 8), M.stone, mtx(0, FL + 0.25, 0, 0, Math.PI / 8, 0), { boxUV: true });
  add(new THREE.CylinderGeometry(0.4, 0.46, 0.92, 8), M.stone, mtx(0, FL + 0.78, 0, 0, Math.PI / 8, 0), { boxUV: true });
  add(new THREE.CylinderGeometry(0.54, 0.44, 0.13, 8), M.stone, mtx(0, FL + 1.3, 0, 0, Math.PI / 8, 0), { boxUV: true });
  const plateY = FL + 1.39;
  add(new THREE.CylinderGeometry(0.44, 0.46, 0.05, 48), BD, mtx(0, plateY, 0));
  for (let k = 0; k < 8; k++) { const a = k / 8 * TAU; add(new THREE.CylinderGeometry(0.028, 0.028, 0.04, 6), B, mtx(Math.cos(a) * 0.37, plateY + 0.04, Math.sin(a) * 0.37)); }
  // azimuth circle
  const az = new THREE.CircleGeometry(0.33, 64); az.rotateX(-Math.PI / 2);
  add(az, M.dial, mtx(0, plateY + 0.027, 0), { cast: false });
  // equatorial head
  const lat = deg(32);
  const P = new V3(0, Math.sin(lat), -Math.cos(lat));
  const H = new V3(0, plateY + 0.42, 0);
  // fork-style latitude casting: two cheeks + base
  add(new RoundedBoxGeometry(0.36, 0.12, 0.42, 2, 0.03), BD, mtx(0, plateY + 0.08, 0), { boxUV: true });
  for (const sx of [-0.14, 0.14]) {
    const sh = new THREE.Shape(); sh.moveTo(-0.22, 0); sh.lineTo(0.22, 0); sh.lineTo(0.12, 0.36); sh.lineTo(-0.16, 0.42); sh.lineTo(-0.22, 0);
    const eg = new THREE.ExtrudeGeometry(sh, { depth: 0.04, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 2 });
    eg.translate(0, 0, -0.02);
    add(eg, B, mtx(sx, plateY + 0.12, 0, 0, Math.PI / 2, 0), { boxUV: true });
  }
  // latitude adjustment screws
  for (const sx of [-0.08, 0.08]) {
    add(new THREE.CylinderGeometry(0.012, 0.012, 0.32, 8), M.iron, along(new V3(sx, plateY + 0.16, 0.2), new V3(0, 0.6, -1), 0.3));
    add(new THREE.CylinderGeometry(0.03, 0.03, 0.03, 12), B, along(new V3(sx, plateY + 0.15, 0.22), new V3(0, 0.6, -1), 0.03));
  }
  // polar axis housing
  add(new THREE.CylinderGeometry(0.13, 0.15, 0.72, 32), B, along(H.clone().addScaledVector(P, -0.36), P, 0.72));
  for (const t of [-0.36, -0.1, 0.18, 0.36]) add(new THREE.TorusGeometry(0.145, 0.014, 8, 40), BD, along(H.clone().addScaledVector(P, t), P, 0).multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2)));
  // RA worm wheel (toothed)
  {
    const gsh = new THREE.Shape(); const N = 72, r0 = 0.2, r1 = 0.215;
    for (let i = 0; i <= N * 2; i++) { const a = i / (N * 2) * TAU, rr = i % 2 ? r1 : r0; i === 0 ? gsh.moveTo(rr * Math.cos(a), rr * Math.sin(a)) : gsh.lineTo(rr * Math.cos(a), rr * Math.sin(a)); }
    const hole = new THREE.Path(); hole.absarc(0, 0, 0.13, 0, TAU, true); gsh.holes.push(hole);
    const gg = new THREE.ExtrudeGeometry(gsh, { depth: 0.035, bevelEnabled: false, curveSegments: 2 });
    gg.translate(0, 0, -0.0175);
    const q = new THREE.Quaternion().setFromUnitVectors(new V3(0, 0, 1), P);
    add(gg, BD, new THREE.Matrix4().compose(H.clone().addScaledVector(P, -0.2), q, new V3(1, 1, 1)));
    // worm housing
    const side = new V3(1, 0, 0);
    const wp = H.clone().addScaledVector(P, -0.2).addScaledVector(new V3().crossVectors(P, side).normalize(), -0.24);
    add(new THREE.CylinderGeometry(0.04, 0.04, 0.32, 16), B, along(wp.clone().addScaledVector(side, -0.16), side, 0.32));
    add(new THREE.CylinderGeometry(0.008, 0.008, 0.55, 6), M.iron, along(wp.clone().addScaledVector(side, 0.16), new V3(0.3, -1, 0.2), 0.55));
    add(new THREE.SphereGeometry(0.03, 12, 8), M.wood, mtx(wp.x + 0.16 + 0.16, wp.y - 0.53, wp.z + 0.1));
  }
  // RA setting circle (graduated dial)
  {
    const c = H.clone().addScaledVector(P, -0.39);
    add(new THREE.CylinderGeometry(0.25, 0.25, 0.025, 64), BD, along(c.clone().addScaledVector(P, -0.0125), P, 0.025));
    const dg = new THREE.CircleGeometry(0.245, 64);
    const q = new THREE.Quaternion().setFromUnitVectors(new V3(0, 0, 1), P.clone().negate());
    add(dg, M.dial, new THREE.Matrix4().compose(c.clone().addScaledVector(P, -0.027), q, new V3(1, 1, 1)), { cast: false });
  }
  // aim the tube through the dome slit
  const slitDir = new V3(-Math.sin(deg(30)), 0, Math.cos(deg(30)));
  const el = deg(50);
  const D = new V3(slitDir.x * Math.cos(el), Math.sin(el), slitDir.z * Math.cos(el)).normalize();
  const A = new V3().crossVectors(P, D).normalize();
  const D0 = H.clone().addScaledVector(P, 0.42);
  // declination housing
  add(new THREE.CylinderGeometry(0.11, 0.11, 0.5, 32), B, along(D0.clone().addScaledVector(A, -0.14), A, 0.5));
  add(new THREE.SphereGeometry(0.14, 24, 16), BD, mtx(D0.x, D0.y, D0.z));
  {
    const c = D0.clone().addScaledVector(A, -0.16);
    add(new THREE.CylinderGeometry(0.2, 0.2, 0.022, 64), BD, along(c.clone().addScaledVector(A, -0.011), A, 0.022));
    const dg = new THREE.CircleGeometry(0.195, 64);
    const q = new THREE.Quaternion().setFromUnitVectors(new V3(0, 0, 1), A.clone().negate());
    add(dg, M.dial, new THREE.Matrix4().compose(c.clone().addScaledVector(A, -0.023), q, new V3(1, 1, 1)), { cast: false });
  }
  // counterweight shaft + weights
  add(new THREE.CylinderGeometry(0.028, 0.028, 1.0, 16), M.iron, along(D0.clone().addScaledVector(A, -0.15), A.clone().negate(), 1.0));
  for (const [t, rr, hh] of [[0.62, 0.14, 0.13], [0.82, 0.12, 0.11]]) {
    add(new THREE.CylinderGeometry(rr, rr, hh, 32), BD, along(D0.clone().addScaledVector(A, -t - hh / 2), A, hh));
    add(new THREE.CylinderGeometry(0.018, 0.018, 0.08, 8), M.iron, along(D0.clone().addScaledVector(A, -t).addScaledVector(D, rr - 0.01), D, 0.08));
  }
  add(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 16), B, along(D0.clone().addScaledVector(A, -1.15), A, 0.04));
  // saddle + tube rings
  const C = D0.clone().addScaledVector(A, 0.62);
  const saddleC = D0.clone().addScaledVector(A, 0.37);
  {
    const q = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(A, D, new V3().crossVectors(A, D)));
    add(new RoundedBoxGeometry(0.06, 0.7, 0.16, 2, 0.015), BD, new THREE.Matrix4().compose(saddleC, q, new V3(1, 1, 1)), { boxUV: true });
    for (const t of [-0.28, 0.28]) {
      const rc = C.clone().addScaledVector(D, t);
      add(new THREE.TorusGeometry(0.2, 0.025, 10, 48), B, along(rc, D, 0).multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2)));
      add(new RoundedBoxGeometry(0.2, 0.05, 0.08, 2, 0.01), BD, new THREE.Matrix4().compose(rc.clone().addScaledVector(A, -0.17), q, new V3(1, 1, 1)), { boxUV: true });
      add(new THREE.CylinderGeometry(0.012, 0.012, 0.09, 8), M.iron, along(rc.clone().addScaledVector(A, 0.2).addScaledVector(new V3().crossVectors(A, D), 0.03), A, 0.09));
      add(new THREE.CylinderGeometry(0.026, 0.026, 0.03, 12), B, along(rc.clone().addScaledVector(A, 0.28).addScaledVector(new V3().crossVectors(A, D), 0.03), A, 0.03));
    }
  }
  // main tube
  const rear = C.clone().addScaledVector(D, -1.0);
  add(new THREE.CylinderGeometry(0.17, 0.17, 2.3, 48, 1, true), B, along(rear, D, 2.3));
  for (const t of [0.0, 0.55, 1.75, 2.3]) add(new THREE.CylinderGeometry(0.182, 0.182, 0.05, 48), BD, along(rear.clone().addScaledVector(D, t - 0.025), D, 0.05));
  // objective cell + dew shield (open, dark inside) + lens
  const front = rear.clone().addScaledVector(D, 2.3);
  add(new THREE.CylinderGeometry(0.19, 0.19, 0.12, 48), BD, along(front, D, 0.12));
  add(new THREE.CylinderGeometry(0.2, 0.2, 0.4, 48, 1, true), B, along(front.clone().addScaledVector(D, 0.12), D, 0.4));
  add(new THREE.CylinderGeometry(0.19, 0.19, 0.4, 48, 1, true), M.rubber, along(front.clone().addScaledVector(D, 0.12), D, 0.4).multiply(new THREE.Matrix4().makeScale(-1, 1, 1)), { cast: false });
  add(new THREE.TorusGeometry(0.195, 0.012, 8, 48), BD, along(front.clone().addScaledVector(D, 0.52), D, 0).multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2)));
  const lens = new THREE.CircleGeometry(0.17, 48);
  const qL = new THREE.Quaternion().setFromUnitVectors(new V3(0, 0, 1), D);
  add(lens, M.glass, new THREE.Matrix4().compose(front.clone().addScaledVector(D, 0.13), qL, new V3(1, 1, 1)), { cast: false });
  // rear cell, focuser, diagonal, eyepiece
  add(new THREE.CylinderGeometry(0.15, 0.175, 0.1, 48), BD, along(rear.clone().addScaledVector(D, -0.1), D, 0.1));
  add(new THREE.CylinderGeometry(0.06, 0.06, 0.14, 24), B, along(rear.clone().addScaledVector(D, -0.24), D, 0.14));
  add(new THREE.CylinderGeometry(0.042, 0.042, 0.16, 24), M.iron, along(rear.clone().addScaledVector(D, -0.4), D, 0.16));
  const side = new V3().crossVectors(D, A).normalize();
  for (const s of [-1, 1]) {
    add(new THREE.CylinderGeometry(0.012, 0.012, 0.16, 8), M.iron, along(rear.clone().addScaledVector(D, -0.19), side.clone().multiplyScalar(s), 0.16));
    add(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 20), B, along(rear.clone().addScaledVector(D, -0.19).addScaledVector(side, s * 0.15), side.clone().multiplyScalar(s), 0.03));
  }
  const diag = rear.clone().addScaledVector(D, -0.44);
  add(new RoundedBoxGeometry(0.09, 0.09, 0.09, 2, 0.015), BD, mtx(diag.x, diag.y, diag.z), { boxUV: true });
  const up = new V3().crossVectors(A, D).normalize();
  const epDir = up.y < 0 ? up.clone().negate() : up.clone();
  add(new THREE.CylinderGeometry(0.03, 0.03, 0.1, 20), M.iron, along(diag, epDir, 0.1));
  add(new THREE.CylinderGeometry(0.036, 0.034, 0.07, 20), M.rubber, along(diag.clone().addScaledVector(epDir, 0.1), epDir, 0.07));
  // finder scope on brackets
  const fOff = up.clone().multiplyScalar(epDir === up ? 1 : -1).multiplyScalar(-1);
  const fBase = C.clone().addScaledVector(A, 0.0).addScaledVector(side, 0.27).addScaledVector(D, -0.55);
  add(new THREE.CylinderGeometry(0.035, 0.035, 0.5, 20), B, along(fBase, D, 0.5));
  add(new THREE.CylinderGeometry(0.045, 0.045, 0.06, 20), BD, along(fBase.clone().addScaledVector(D, 0.48), D, 0.06));
  add(new THREE.CylinderGeometry(0.02, 0.016, 0.06, 12), M.rubber, along(fBase.clone().addScaledVector(D, -0.06), D, 0.06));
  for (const t of [0.1, 0.38]) {
    add(new THREE.CylinderGeometry(0.012, 0.012, 0.13, 8), BD, along(fBase.clone().addScaledVector(D, t), side.clone().negate(), 0.13));
    add(new THREE.TorusGeometry(0.045, 0.01, 6, 24), BD, along(fBase.clone().addScaledVector(D, t), D, 0).multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2)));
  }
  void fOff;
  // dec slow-motion cable
  add(new THREE.CylinderGeometry(0.008, 0.008, 0.6, 6), M.iron, along(D0.clone().addScaledVector(A, 0.1), new V3(0.2, -1, 0.3), 0.6));
  const kn = D0.clone().addScaledVector(A, 0.1).addScaledVector(new V3(0.2, -1, 0.3).normalize(), 0.6);
  add(new THREE.SphereGeometry(0.03, 12, 8), M.wood, mtx(kn.x, kn.y, kn.z));
  circles.push([0, 0, 1.38]);
}

// ---------------- rocks & sand ----------------
function rockGeo(seed, sx, sy, sz) {
  const g = new THREE.IcosahedronGeometry(1, 3);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const n = 0.75 + 0.35 * TX.vnoise(x * 1.7 + seed, z * 1.7 + y * 1.3, 0, seed) + 0.12 * TX.vnoise(x * 5 + y * 3, z * 5, 0, seed + 1);
    const flat = y > 0.3 ? 0.85 : 1;
    p.setXYZ(i, x * n * sx, Math.max(-0.3, y * n * flat) * sy, z * n * sz);
  }
  g.computeVertexNormals();
  return g;
}
function buildRocks() {
  const rnd = mulberry(4242);
  let placed = 0, tries = 0;
  while (placed < 46 && tries < 900) {
    tries++;
    const a = rnd() * TAU, d = 10 + rnd() * 18;
    const x = PC[0] + Math.cos(a) * d, z = PC[1] + Math.sin(a) * d;
    if (plateauS(x, z) > -1.5) continue;
    if (distSeg(x, z, -17.5, 0, 17.5, 0) < 11.5) continue;
    if (x > 15 && x < 28 && Math.abs(z) < 3.5) continue; // keep the approach clear
    const s = 0.3 + Math.pow(rnd(), 2.2) * 1.8;
    const g = rockGeo(placed * 7 + 1, s * (0.8 + rnd() * 0.6), s * (0.45 + rnd() * 0.35), s * (0.8 + rnd() * 0.6));
    const y = terrainH(x, z) - s * 0.12;
    add(g, M.rock, mtx(x, y, z, 0, rnd() * TAU, 0), { boxUV: true });
    if (s > 0.45) {
      circles.push([x, z, s * 0.95]);
      drift([[x - s * 1.2, z - s * 0.6], [x + s * 0.2, z - s * 1.1], [x + s * 1.2, z + 0.1]], 0, s * 1.4, s * 0.25, -1, placed, terrainH);
    }
    placed++;
  }
  // low bedrock slabs breaking through the plateau surface
  let slabs = 0; tries = 0;
  while (slabs < 26 && tries < 600) {
    tries++;
    const a = rnd() * TAU, d = 8 + rnd() * 20;
    const x = PC[0] + Math.cos(a) * d, z = PC[1] + Math.sin(a) * d;
    if (plateauS(x, z) > -1.2) continue;
    if (distSeg(x, z, -17.5, 0, 17.5, 0) < 11.0) continue;
    if (x > 15 && x < 30 && Math.abs(z) < 3.2) continue;
    const s = 0.9 + rnd() * 1.8;
    const g = rockGeo(3000 + slabs, s * (1 + rnd()), 0.22 + rnd() * 0.18, s * (0.7 + rnd() * 0.6));
    add(g, M.rock, mtx(x, terrainH(x, z) - 0.06, z, 0, rnd() * TAU, 0), { boxUV: true });
    circles.push([x, z, s * 0.75]);
    slabs++;
  }
  // small gravel scatter near paths
  for (let i = 0; i < 220; i++) {
    const x = -20 + rnd() * 50, z = -20 + rnd() * 40;
    if (plateauS(x, z) > -1) continue;
    if (heightAtBuilding(x, z) !== null) continue;
    const s = 0.04 + rnd() * 0.1;
    add(rockGeo(1000 + i, s, s * 0.6, s * (0.7 + rnd() * 0.6)), M.rock, mtx(x, terrainH(x, z), z, 0, rnd() * 6, 0), { boxUV: true, cast: false });
  }
}
function buildSand() {
  // exterior drum base, leeward (east) arcs on the ground
  const arcPts = (r, a0, a1, n = 24) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [r * Math.cos(a), r * Math.sin(a)]; });
  drift(arcPts(7.15, deg(-80), deg(-20)), 0, 1.6, 0.42, -1, 3, terrainH);
  drift(arcPts(7.15, deg(20), deg(75)), 0, 1.3, 0.32, -1, 4, terrainH);
  drift(arcPts(7.15, deg(100), deg(150)), 0, 0.8, 0.18, -1, 5, terrainH);
  // passage exterior bases
  drift([[7.2, -1.7], [15.0, -1.7]], 0, 1.3, 0.34, -1, 6, terrainH);
  drift([[7.3, 1.7], [12.5, 1.7]], 0, 0.9, 0.2, 1, 7, terrainH);
  // inside the passage along both walls (thinning inward)
  drift([[15.0, -0.98], [9.6, -0.98]], FL, 0.42, 0.12, -1, 8);
  drift([[14.9, 0.98], [11.0, 0.98]], FL, 0.36, 0.1, -1, 9);
  // entrance step corners
  for (const [x, y] of [[15.0, FL - 0.15], [15.42, FL - 0.3], [15.84, FL - 0.45]]) {
    drift([[x + 0.02, -1.6], [x + 0.02, -0.7]], y, 0.2, 0.06, -1, x * 10);
    drift([[x + 0.02, 1.0], [x + 0.02, 1.6]], y, 0.16, 0.05, -1, x * 10 + 1);
  }
  drift([[16.3, -2.0], [16.3, 2.0]], 0, 0.9, 0.12, -1, 12, terrainH);
  // terrace: lee of the west parapet and corners
  drift([[-16.04, -6.55], [-16.04, 6.5]], FL, 0.65, 0.16, -1, 13);
  drift([[-16.0, -6.54], [-11.5, -6.54]], FL, 0.5, 0.12, -1, 14);
  drift([[-16.0, 6.54], [-13.0, 6.54]], FL, 0.45, 0.1, 1, 15);
  drift(arcPts(6.92, deg(150), deg(172), 10), FL, 0.5, 0.1, -1, 16);
  drift(arcPts(6.92, deg(188), deg(212), 10), FL, 0.5, 0.11, -1, 17);
  // chamber: sand blown in through the west door + along inner wall foot
  drift([[-5.98, -0.95], [-5.98, 0.95]], FL, 1.0, 0.05, 1, 18);
  drift(arcPts(5.98, deg(160), deg(176), 8), FL, 0.35, 0.05, 1, 19);
  drift(arcPts(5.98, deg(184), deg(205), 8), FL, 0.4, 0.06, 1, 20);
  drift(arcPts(5.48, deg(244), deg(296), 16), FL, 0.25, 0.035, 1, 21);
  // terrace stairs
  for (const [z, y] of [[7.0, FL - 0.15], [7.42, FL - 0.3], [7.84, FL - 0.45]]) drift([[-10.52, z + 0.02], [-11.3, z + 0.02]], y, 0.18, 0.05, -1, z * 7);
}

function buildProps() {
  const rnd = mulberry(99);
  for (let i = 0; i < 16; i++) {
    const a = deg(-85) + rnd() * deg(70) + (rnd() < 0.5 ? 0 : deg(100));
    const r = 7.3 + rnd() * 0.9;
    const x = r * Math.cos(a), z = r * Math.sin(a);
    if (Math.abs(z) < 2.2 && x > 0) continue;
    const s = 0.06 + rnd() * 0.12;
    add(rockGeo(500 + i, s * 1.4, s * 0.6, s), rnd() < 0.5 ? M.stone : M.plaster, mtx(x, terrainH(x, z) + s * 0.2, z, rnd(), rnd() * 6, rnd() * 0.3), { boxUV: true });
  }
  // wooden observing stool beside the eyepiece
  const sx = 1.95, sz = -1.55, top = FL + 0.62;
  box(M.wood, sx - 0.24, sx + 0.24, top - 0.05, top, sz - 0.2, sz + 0.2, { round: 0.015 });
  for (const [dx, dz] of [[-0.19, -0.15], [0.19, -0.15], [-0.19, 0.15], [0.19, 0.15]]) {
    add(new THREE.CylinderGeometry(0.022, 0.028, 0.6, 8), M.wood, mtx(sx + dx * 1.08, FL + 0.29, sz + dz * 1.08, dz * 0.25, 0, -dx * 0.25));
  }
  box(M.wood, sx - 0.2, sx + 0.2, FL + 0.2, FL + 0.23, sz - 0.012, sz + 0.012);
  circles.push([sx, sz, 0.32]);
  // brass star chart case on the north bench
  box(M.wood, -0.6, 0.6, FL + 0.46, FL + 0.56, -5.95, -5.6, { round: 0.01 });
  box(M.bronze, -0.55, 0.55, FL + 0.56, FL + 0.58, -5.9, -5.65);
}

// ---------------- walkable heights ----------------
function heightAtBuilding(x, z) {
  const r = Math.hypot(x, z);
  if (r < 7.15) return FL;
  if (x >= 7.0 && x <= 15.0 && Math.abs(z) < 1.75) return FL;
  if (x > 15.0 && x <= 16.26 && Math.abs(z) < 1.62) return x < 15.42 ? FL - 0.15 : x < 15.84 ? FL - 0.3 : FL - 0.45;
  if (x >= -16.5 && x <= -2.0 && Math.abs(z) <= 7.0) return FL;
  if (x >= -12.5 && x <= -10.5 && z > 7.0 && z <= 8.26) return z < 7.42 ? FL - 0.15 : z < 7.84 ? FL - 0.3 : FL - 0.45;
  return null;
}
function heightAt(x, z) { const b = heightAtBuilding(x, z); return b !== null ? b : terrainH(x, z); }

// ---------------- build everything ----------------
buildTerrain();
buildDrum();
buildDome();
buildPassage();
buildTerrace();
buildTelescope();
buildRocks();
buildSand();
buildProps();
finalize();
renderer.shadowMap.needsUpdate = true;

// ---------------- player ----------------
const EYE = 1.65, PR = 0.3;
const player = { x: 0, z: 0, y: 0, yaw: 0, pitch: 0, vx: 0, vz: 0, floor: 0 };
const views = {
  1: { x: 22, z: 0.4, yaw: Math.PI / 2, pitch: 0.02 },
  2: { x: 3.4, z: 2.6, yaw: Math.atan2(3.4, 2.6), pitch: 0.05 },
  3: { x: -15.2, z: 1.8, yaw: -Math.PI / 2 + 0.05, pitch: 0.08 },
  4: { x: -2.6, z: 3.8, yaw: Math.atan2(0.5, -0.866) + Math.PI, pitch: 0.95 },
};
function setView(v) {
  player.x = v.x; player.z = v.z; player.yaw = v.yaw; player.pitch = v.pitch; player.vx = player.vz = 0;
  player.floor = heightAt(v.x, v.z); player.y = player.floor + EYE;
}
// view 4: look up along the slit direction
views[4].yaw = Math.atan2(-(-0.5), -(0.866)) ;
views[4].x = 2.2; views[4].z = -3.0;
setView(views[1]);

function resolve(p) {
  for (let it = 0; it < 3; it++) {
    for (const s of segs) {
      const vx = s[2] - s[0], vz = s[3] - s[1];
      const l2 = vx * vx + vz * vz;
      let t = l2 > 0 ? ((p.x - s[0]) * vx + (p.z - s[1]) * vz) / l2 : 0;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const cx = s[0] + vx * t, cz = s[1] + vz * t;
      const dx = p.x - cx, dz = p.z - cz, d = Math.hypot(dx, dz);
      if (d < PR && d > 1e-6) { p.x = cx + dx / d * PR; p.z = cz + dz / d * PR; }
    }
    for (const c of circles) {
      const dx = p.x - c[0], dz = p.z - c[1], d = Math.hypot(dx, dz), m = c[2] + PR;
      if (d < m && d > 1e-6) { p.x = c[0] + dx / d * m; p.z = c[1] + dz / d * m; }
    }
  }
  return p;
}
function walkable(p, floor) {
  if (plateauS(p.x, p.z) > -1.4) return false;
  const h = heightAt(p.x, p.z);
  return h <= floor + 0.4 && h >= floor - 1.0;
}

const keys = {};
addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'KeyR') setView(views[1]);
  if (['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(e.code)) setView(views[+e.code.slice(5)]);
  if (e.code === 'KeyQ') { hiQuality = !hiQuality; autoOn = false; autoScale = 1; renderer.setPixelRatio(basePR()); renderer.setSize(innerWidth, innerHeight); }
  if (e.code === 'KeyP') perfEl.style.display = perfEl.style.display === 'none' ? '' : 'none';
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
});
addEventListener('keyup', (e) => { keys[e.code] = false; });
addEventListener('blur', () => { for (const k in keys) keys[k] = false; });

const overlay = document.getElementById('overlay');
const canvas = renderer.domElement;
overlay.addEventListener('click', () => canvas.requestPointerLock());
canvas.addEventListener('click', () => { if (document.pointerLockElement !== canvas) canvas.requestPointerLock(); });
document.addEventListener('pointerlockchange', () => { overlay.style.display = document.pointerLockElement === canvas ? 'none' : 'flex'; });
document.addEventListener('mousemove', (e) => {
  if (document.pointerLockElement !== canvas) return;
  const mx = Math.max(-200, Math.min(200, e.movementX)), my = Math.max(-200, Math.min(200, e.movementY));
  player.yaw -= mx * 0.0022;
  player.pitch -= my * 0.0022;
  player.pitch = Math.max(-1.52, Math.min(1.52, player.pitch));
});
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

function update(dt) {
  let fx = 0, fz = 0;
  if (keys.KeyW || keys.ArrowUp) fz -= 1;
  if (keys.KeyS || keys.ArrowDown) fz += 1;
  if (keys.KeyA || keys.ArrowLeft) fx -= 1;
  if (keys.KeyD || keys.ArrowRight) fx += 1;
  const len = Math.hypot(fx, fz);
  const speed = (keys.ShiftLeft || keys.ShiftRight) ? 5.2 : 2.6;
  let tx = 0, tz = 0;
  if (len > 0) {
    fx /= len; fz /= len;
    const s = Math.sin(player.yaw), c = Math.cos(player.yaw);
    tx = (fx * c + fz * s) * speed; tz = (-fx * s + fz * c) * speed;
  }
  const k = 1 - Math.exp(-dt * 11);
  player.vx += (tx - player.vx) * k; player.vz += (tz - player.vz) * k;
  const nx = player.x + player.vx * dt, nz = player.z + player.vz * dt;
  let cand = resolve({ x: nx, z: nz });
  if (!walkable(cand, player.floor)) {
    cand = resolve({ x: nx, z: player.z });
    if (!walkable(cand, player.floor)) {
      cand = resolve({ x: player.x, z: nz });
      if (!walkable(cand, player.floor)) cand = { x: player.x, z: player.z };
    }
  }
  player.x = cand.x; player.z = cand.z;
  player.floor = heightAt(player.x, player.z);
  const ty = player.floor + EYE;
  player.y += (ty - player.y) * (1 - Math.exp(-dt * (ty < player.y ? 9 : 14)));
  camera.position.set(player.x, player.y, player.z);
  camera.rotation.set(player.pitch, player.yaw, 0);
}

// ---------------- perf readout & loop ----------------
const perfEl = document.getElementById('perf');
const ft = new Float32Array(240); let fti = 0, ftn = 0, perfT = 0;
let last = performance.now(), frames = 0, autoAcc = 0, autoN = 0;
document.getElementById('loading').remove();
renderer.setAnimationLoop(() => {
  const now = performance.now();
  const raw = now - last; last = now;
  const dt = Math.min(0.05, raw / 1000);
  ft[fti] = raw; fti = (fti + 1) % ft.length; ftn = Math.min(ftn + 1, ft.length);
  update(dt);
  renderer.render(scene, camera);
  perfT += raw;
  // one-way adaptive resolution: if the GPU cannot hold ~50 fps, render slightly smaller (never oscillates)
  frames++;
  if (autoOn && frames > 90 && !document.hidden) {
    autoAcc += raw; autoN++;
    if (autoN >= 120) {
      const avg = autoAcc / autoN; autoAcc = 0; autoN = 0;
      if (avg > 18 && avg < 200 && autoScale > 0.71) { autoScale = Math.max(0.7, autoScale - 0.15); renderer.setPixelRatio(basePR()); renderer.setSize(innerWidth, innerHeight); }
    }
  }
  if (perfT > 500 && perfEl.style.display !== 'none') {
    perfT = 0;
    let s = 0, mx = 0; const arr = Array.from(ft.slice(0, ftn)).sort((a, b) => a - b);
    for (let i = 0; i < ftn; i++) { s += ft[i]; mx = Math.max(mx, ft[i]); }
    const avg = s / ftn, p99 = arr[Math.floor(arr.length * 0.99)] || 0;
    const info = renderer.info.render;
    perfEl.textContent = `${(1000 / avg).toFixed(0)} fps  avg ${avg.toFixed(1)} ms\np99 ${p99.toFixed(1)} ms  max ${mx.toFixed(1)} ms\ncalls ${info.calls}  tris ${(info.triangles / 1000).toFixed(0)}k  ${hiQuality ? 'HQ' : 'fast'} res ${(renderer.getPixelRatio()).toFixed(2)}x`;
  }
});
window.__obs = { renderer, scene, camera, player, setView, views, update, keys, heightAt };
