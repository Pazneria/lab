import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import * as T from './textures.js';

const $ = (id) => document.getElementById(id);
const overlay = $('overlay'), statsEl = $('stats'), zoneEl = $('zone');
const PI = Math.PI;

// ---------------------------------------------------------------- renderer
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', stencil: false });
// render-resolution budget instead of raw devicePixelRatio (keeps hi-dpi screens responsive)
const DPR = Math.min(window.devicePixelRatio || 1, 2);
let dynScale = 1, highQuality = true;
function targetPR() {
  const budget = highQuality ? 1.15e6 : 0.7e6;
  return Math.max(0.5, Math.min(DPR, Math.sqrt(budget / (innerWidth * innerHeight))) * dynScale);
}
let pixelRatio = targetPR();
renderer.setPixelRatio(pixelRatio);
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0b0e15, 0.028);
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.05, 140);

// ---------------------------------------------------------------- batching helpers
const batches = new Map();
let curZone = 'court';
const _o = new THREE.Object3D(), _m = new THREE.Matrix4();
let frame = new THREE.Matrix4();
function put(geo, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) {
  _o.position.set(x, y, z); _o.rotation.set(rx, ry, rz); _o.scale.set(sx, sy, sz); _o.updateMatrix();
  _m.multiplyMatrices(frame, _o.matrix);
  const g = geo.clone(); g.applyMatrix4(_m);
  const key = mat.uuid + (g.index ? 'i' : 'n') + curZone;
  let b = batches.get(key); if (!b) batches.set(key, b = { mat, geos: [] });
  b.geos.push(g);
}
function flushBatches() {
  for (const { mat, geos } of batches.values()) {
    for (const g of geos) for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal' && k !== 'uv') g.deleteAttribute(k);
    const merged = mergeGeometries(geos, false);
    merged.computeBoundingBox();
    const c = merged.boundingBox.getCenter(new THREE.Vector3());
    merged.translate(-c.x, -c.y, -c.z); // centre the mesh so the renderer can sort front-to-back
    const mesh = new THREE.Mesh(merged, mat);
    mesh.position.copy(c);
    mesh.matrixAutoUpdate = false; mesh.updateMatrix();
    scene.add(mesh);
  }
  batches.clear();
}
function inFrame(x, z, ry, fn) {
  const prev = frame;
  _o.position.set(x, 0, z); _o.rotation.set(0, ry, 0); _o.scale.set(1, 1, 1); _o.updateMatrix();
  frame = prev.clone().multiply(_o.matrix);
  fn();
  frame = prev;
}
const wp = (x, y, z) => new THREE.Vector3(x, y, z).applyMatrix4(frame);

const insts = new Map();
const _c = new THREE.Color();
function inst(name, geo, mat, x, y, z, rx, ry, rz, s, sy = s, color = null) {
  let e = insts.get(name); if (!e) insts.set(name, e = { geo, mat, list: [] });
  _o.position.set(x, y, z); _o.rotation.set(rx, ry, rz); _o.scale.set(s, sy, s); _o.updateMatrix();
  e.list.push({ m: new THREE.Matrix4().multiplyMatrices(frame, _o.matrix), color });
}
function flushInst() {
  for (const { geo, mat, list } of insts.values()) {
    const im = new THREE.InstancedMesh(geo, mat, list.length);
    list.forEach((it, i) => { im.setMatrixAt(i, it.m); if (it.color) im.setColorAt(i, it.color); });
    im.instanceMatrix.needsUpdate = true; if (im.instanceColor) im.instanceColor.needsUpdate = true;
    im.matrixAutoUpdate = false; im.frustumCulled = false;
    scene.add(im);
  }
}

// collisions (axis-aligned rectangles in XZ)
const colliders = [];
function block(x0, z0, x1, z1) {
  const a = wp(x0, 0, z0), b = wp(x1, 0, z1);
  colliders.push([Math.min(a.x, b.x), Math.min(a.z, b.z), Math.max(a.x, b.x), Math.max(a.z, b.z)]);
}

// lights
const lights = [];
function lamp(x, y, z, color, intensity, distance, flicker = 0.04) {
  const L = new THREE.PointLight(color, intensity, distance, 2);
  L.position.copy(wp(x, y, z));
  scene.add(L);
  lights.push({ L, base: intensity, flicker, phase: Math.random() * 100 });
  return L;
}

// geometry helpers with metre-scaled UVs
function boxGeo(w, h, d, uvs = 1) {
  const g = new THREE.BoxGeometry(w, h, d), uv = g.attributes.uv;
  const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) for (let k = 0; k < 4; k++) { const i = f * 4 + k; uv.setXY(i, uv.getX(i) * dims[f][0] * uvs, uv.getY(i) * dims[f][1] * uvs); }
  return g;
}
function planeGeo(w, h, ur = 1, vr = 1) {
  const g = new THREE.PlaneGeometry(w, h), uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * ur, uv.getY(i) * vr);
  return g;
}
const cyl = (rt, rb, h, seg = 12, open = false) => new THREE.CylinderGeometry(rt, rb, h, seg, 1, open);
const sph = (r, ws = 12, hs = 8) => new THREE.SphereGeometry(r, ws, hs);
function lathe(points, seg = 20) { return new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), seg); }
function tube(points, r, seg = 24, rs = 4) { return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), seg, r, rs, false); }
function catenary(a, b, sag, n = 16) {
  const pts = [];
  for (let i = 0; i <= n; i++) { const t = i / n; const p = a.clone().lerp(b, t); p.y -= sag * 4 * t * (1 - t); pts.push(p); }
  return pts;
}

// ---------------------------------------------------------------- materials
const std = (o) => new THREE.MeshStandardMaterial(o);
// Lambert for large, rough, non-metal surfaces (facades, brick, fabric, timber): visually equivalent at these roughnesses, much cheaper with 11 lights
const lam = (o) => { const c = { ...o }; delete c.roughness; delete c.metalness; delete c.roughnessMap; delete c.envMapIntensity; return new THREE.MeshLambertMaterial(c); };
const brushed = T.brushedTexture();
const M = {
  pole: std({ color: 0x1d2a25, metalness: 0.6, roughness: 0.42 }),
  steel: std({ color: 0xd6d9dd, metalness: 0.85, roughness: 0.38, roughnessMap: brushed, envMapIntensity: 1.6 }),
  darkMetal: std({ color: 0x26282c, metalness: 0.85, roughness: 0.4 }),
  wok: std({ color: 0x161514, metalness: 0.9, roughness: 0.3 }),
  copper: std({ color: 0xb8703f, metalness: 1, roughness: 0.28 }),
  ceramic: std({ color: 0xf0ece2, roughness: 0.16 }),
  blueCeramic: std({ color: 0x24477e, roughness: 0.2 }),
  clay: std({ color: 0x6b3522, roughness: 0.35 }),
  wood: lam({ map: T.woodTexture([125, 84, 50], 4), roughness: 0.72 }),
  crate: lam({ map: T.woodTexture([182, 140, 92], 2, 0.8), roughness: 0.8 }),
  darkWood: std({ map: T.woodTexture([74, 47, 30], 5), roughness: 0.6 }),
  redPlastic: std({ color: 0xb02a20, roughness: 0.45 }),
  bluePlastic: std({ color: 0x2257a3, roughness: 0.45 }),
  concrete: lam({ color: 0x55534f, roughness: 0.92 }),
  plaster: lam({ color: 0x77706a, roughness: 0.9 }),
  black: std({ color: 0x101010, roughness: 0.55 }),
  rubber: std({ color: 0x181818, roughness: 0.85 }),
  cable: std({ color: 0x0c0c0c, roughness: 0.6 }),
  glass: std({ color: 0x9fb8b0, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.45 }),
  bulb: std({ color: 0x000000, emissive: 0xffc078, emissiveIntensity: 7 }),
  bulbSoft: std({ color: 0x000000, emissive: 0xffb060, emissiveIntensity: 3.5 }),
  tubeLight: std({ color: 0x000000, emissive: 0xdff2ff, emissiveIntensity: 5 }),
  flame: std({ color: 0x000000, emissive: 0x3a74ff, emissiveIntensity: 6, transparent: true, opacity: 0.85, depthWrite: false }),
  noodles: std({ color: 0xe8c66a, roughness: 0.6 }),
  dough: std({ color: 0xf3ead6, roughness: 0.55 }),
  meat: std({ color: 0x7a2e16, roughness: 0.5 }),
  greens: std({ color: 0x3e7d2c, roughness: 0.6 }),
  leaf: lam({ color: 0x2c5a24, roughness: 0.7 }),
  terracotta: lam({ color: 0x8a4a2f, roughness: 0.85 }),
};
const fabric = (a, b, n, solid) => lam({ map: T.fabricTexture(a, b, n, { solid }), roughness: 0.88, side: THREE.DoubleSide, emissive: 0xffffff, emissiveIntensity: 0.025 });
const F = {
  red: fabric('#a3231b', '#e9dcc0', 10),
  green: fabric('#2f6b45', '#e6dcc2', 12),
  umbrella: fabric('#c9661c', '#efe2c4', 8),
  blue: fabric('#1f4f86', '#e8e4d8', 14),
  indigo: fabric('#1b2a52', '#1b2a52', 2, true),
  maroon: fabric('#5e1a1a', '#5e1a1a', 2, true),
};
for (const k in F) F[k].emissiveMap = F[k].map;
const signMat = (opts, w = 1024, h = 320) => std({ map: T.paintedSign(w, h, opts), roughness: 0.55 });
function neonMat(text, color, w = 1024, h = 360, font, sub) {
  const t = T.neonSign(w, h, text, color, font, sub);
  return std({ map: t.map, emissiveMap: t.emissiveMap, emissive: 0xffffff, emissiveIntensity: 3.2, roughness: 0.4 });
}

// ---------------------------------------------------------------- ground (wet setts + puddles)
const pave = T.pavingTextures();
const SITE = { x0: -10.5, z0: -9.5, w: 34, d: 22 };
const puddles = T.puddleMask([
  [(0 + 10.5) / 34, (0.4 + 9.5) / 22, 0.07, 0.11, 1.1],
  [(-4.4 + 10.5) / 34, (-3.4 + 9.5) / 22, 0.06, 0.06, 0.9],
  [(7 + 10.5) / 34, (-2.8 + 9.5) / 22, 0.05, 0.08, 1.0],
  [(1.8 + 10.5) / 34, (5.2 + 9.5) / 22, 0.06, 0.07, 0.9],
  [(0 + 10.5) / 34, (9.6 + 9.5) / 22, 0.04, 0.05, 0.9],
  [(12.6 + 10.5) / 34, (-3.2 + 9.5) / 22, 0.07, 0.035, 1.1],
  [(19 + 10.5) / 34, (-2.5 + 9.5) / 22, 0.05, 0.07, 1.0],
  [(-7.6 + 10.5) / 34, (0.6 + 9.5) / 22, 0.035, 0.12, 0.9],
  [(7.3 + 10.5) / 34, (6.2 + 9.5) / 22, 0.05, 0.06, 0.8],
  [(-2.5 + 10.5) / 34, (-1.8 + 9.5) / 22, 0.04, 0.05, 0.7],
]);
const ripple = T.rippleNormal();
const groundUniforms = { uTime: { value: 0 }, uRefl: { value: null }, uReflMatrix: { value: new THREE.Matrix4() }, uReflOn: { value: 1 } };
const groundMat = std({ map: pave.map, normalMap: pave.normalMap, roughnessMap: pave.roughnessMap, roughness: 0.95, normalScale: new THREE.Vector2(1, 1), envMapIntensity: 0.45 });
groundMat.onBeforeCompile = (sh) => {
  sh.uniforms.puddleMap = { value: puddles };
  sh.uniforms.rippleMap = { value: ripple };
  sh.uniforms.uTime = groundUniforms.uTime;
  sh.uniforms.uRefl = groundUniforms.uRefl;
  sh.uniforms.uReflMatrix = groundUniforms.uReflMatrix;
  sh.uniforms.uReflOn = groundUniforms.uReflOn;
  sh.vertexShader = sh.vertexShader
    .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
    .replace('#include <fog_vertex>', '#include <fog_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
  sh.fragmentShader = sh.fragmentShader
    .replace('#include <common>', `#include <common>
      varying vec3 vWPos; uniform sampler2D puddleMap; uniform sampler2D rippleMap; uniform float uTime; float gPud;
      uniform sampler2D uRefl; uniform mat4 uReflMatrix; uniform float uReflOn;`)
    .replace('#include <map_fragment>', `#include <map_fragment>
      gPud = texture2D(puddleMap, vec2((vWPos.x - (${SITE.x0.toFixed(2)})) / ${SITE.w.toFixed(2)}, (vWPos.z - (${SITE.z0.toFixed(2)})) / ${SITE.d.toFixed(2)})).r;
      diffuseColor.rgb *= mix(0.82, 0.42, smoothstep(0.0, 0.45, gPud));`)
    .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
      roughnessFactor = mix(roughnessFactor * 0.78, 0.05, smoothstep(0.12, 0.55, gPud));`)
    .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
      {
        vec3 upV = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
        vec2 rUv = vWPos.xz * 0.45;
        vec2 r1 = texture2D(rippleMap, rUv + vec2(uTime * 0.011, uTime * 0.006)).xy * 2.0 - 1.0;
        vec2 r2 = texture2D(rippleMap, rUv * 1.43 - vec2(uTime * 0.007, -uTime * 0.009)).xy * 2.0 - 1.0;
        vec2 rp = (r1 + r2) * 0.045;
        vec3 flatN = normalize(upV + (viewMatrix * vec4(rp.x, 0.0, rp.y, 0.0)).xyz);
        normal = normalize(mix(normal, flatN, smoothstep(0.18, 0.6, gPud)));
      }`)
    .replace('#include <opaque_fragment>', `
      if (uReflOn > 0.5) {
        float pw = smoothstep(0.12, 0.55, gPud);
        vec4 rc = uReflMatrix * vec4(vWPos, 1.0);
        vec2 ruv = rc.xy / rc.w + normal.xy * mix(0.06, 0.012, pw);
        float NdV = clamp(dot(normalize(-vViewPosition), normal), 0.0, 1.0);
        float fres = 0.04 + 0.96 * pow(1.0 - NdV, 5.0);
        vec3 refl = textureLod(uRefl, ruv, mix(3.5, 0.3, pw)).rgb;
        outgoingLight += refl * fres * mix(0.32, 1.0, pw);
      }
      #include <opaque_fragment>`);
};
{
  const g = new THREE.PlaneGeometry(SITE.w, SITE.d, 1, 1);
  g.rotateX(-PI / 2);
  g.translate(SITE.x0 + SITE.w / 2, 0, SITE.z0 + SITE.d / 2);
  const uv = g.attributes.uv, pos = g.attributes.position;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i) / 2.4, -pos.getZ(i) / 2.4);
  var ground = new THREE.Mesh(g, groundMat);
  ground.matrixAutoUpdate = false;
  scene.add(ground);
}

// ---------------------------------------------------------------- sky
{
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { uTime: groundUniforms.uTime },
    vertexShader: `varying vec3 vDir; void main(){ vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position = p.xyww; }`,
    fragmentShader: `varying vec3 vDir; uniform float uTime;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
      float fbm(vec2 p){ float s=0., a=.5; for(int i=0;i<5;i++){ s+=a*n(p); p*=2.03; a*=.5; } return s; }
      void main(){
        vec3 d = normalize(vDir); float y = max(d.y, 0.0);
        vec3 col = mix(vec3(0.20,0.12,0.09), vec3(0.018,0.024,0.045), pow(y, 0.42));
        vec2 p = d.xz / (d.y + 0.25) * 1.6 + vec2(uTime * 0.004, 0.0);
        float c = fbm(p);
        col += vec3(0.11, 0.08, 0.075) * smoothstep(0.42, 0.85, c) * (1.0 - y * 0.6);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(100, 32, 16), skyMat);
  sky.frustumCulled = false; sky.renderOrder = -1;
  scene.add(sky);
}

// ---------------------------------------------------------------- architecture
const brick = T.brickTextures();
const brickMat = lam({ map: brick.map, normalMap: brick.normalMap, roughness: 0.82 });
const BAND = 3.4;
function facadeMat(w, h, opts) {
  const t = T.facadeTextures(w, h, opts);
  return lam({ map: t.map, emissiveMap: t.emissiveMap, emissive: 0xffffff, emissiveIntensity: 0.9, roughness: 0.88 });
}
// One courtyard wall: brick ground band with optional openings + upper painted facade + cornice
function wall(cx, cz, ry, width, height, fmat, openings = [], cols = 0) {
  inFrame(cx, cz, ry, () => {
    // 3D sills + lintels matching the painted window grid of the facade texture
    if (cols) {
      const fh = height - BAND;
      for (let f = 0; (f + 1) * 3.0 <= fh + 0.1; f++) for (let k = 0; k < cols; k++) {
        const x = -width / 2 + (k + 0.5) * width / cols, y = BAND + f * 3.0 + 1.775;
        put(boxGeo(1.45, 0.07, 0.16), M.concrete, x, y - 0.86, 0.08);
        put(boxGeo(1.4, 0.12, 0.07), M.concrete, x, y + 0.86, 0.035);
        put(boxGeo(0.06, 1.62, 0.05), M.concrete, x - 0.66, y, 0.025);
        put(boxGeo(0.06, 1.62, 0.05), M.concrete, x + 0.66, y, 0.025);
      }
    }
    // ground band segments
    let x = -width / 2;
    const segs = [];
    for (const [ox, ow, oh] of openings) { segs.push([x, ox - ow / 2]); x = ox + ow / 2; }
    segs.push([x, width / 2]);
    for (const [a, b] of segs) if (b - a > 0.01) {
      put(planeGeo(b - a, BAND, (b - a) / 1.76, BAND / 1.6), brickMat, (a + b) / 2, BAND / 2, 0);
      put(boxGeo(b - a, 0.25, 0.06), M.concrete, (a + b) / 2, 0.125, 0.03); // plinth
    }
    for (const [ox, ow, oh] of openings) put(planeGeo(ow, BAND - oh, ow / 1.76, (BAND - oh) / 1.6), brickMat, ox, oh + (BAND - oh) / 2, 0);
    put(planeGeo(width, height - BAND), fmat, 0, BAND + (height - BAND) / 2, 0);
    // string course and cornice
    put(boxGeo(width, 0.16, 0.18), M.concrete, 0, BAND, 0.09);
    put(boxGeo(width + 0.4, 0.3, 0.45), M.concrete, 0, height, 0.2);
  });
}

// Courtyard: x [-9, 9], z [-8, 8]
const fN = facadeMat(18, 12 - BAND, { base: [150, 136, 118], lit: 0.35, cols: 6 });
const fS = facadeMat(18, 11 - BAND, { base: [126, 128, 124], lit: 0.3, cols: 6 });
const fW = facadeMat(16, 10 - BAND, { base: [146, 124, 104], lit: 0.25, cols: 5 });
const fE = facadeMat(16, 13 - BAND, { base: [120, 116, 108], lit: 0.4, cols: 5 });
wall(0, -8, 0, 18, 12, fN, [], 6);
wall(0, 8, PI, 18, 11, fS, [[0, 3.2, 3.2]], 6);
wall(-9, 0, PI / 2, 16, 10, fW, [], 5);
wall(9, 0, -PI / 2, 16, 13, fE, [[-3.2, 2.4, 3.0]], 5); // local x=-3.2 -> world z=-3.2
colliders.push([-10, -9, 10, -8], [-10, -9, -9, 9], [-10, 8, -1.6, 9.5], [1.6, 8, 10, 9.5], [9, -9, 10, -4.4], [9, -2.0, 10, 9]);
// corner pilasters
for (const [x, z] of [[-9, -8], [9, -8], [-9, 8], [9, 8]]) put(boxGeo(0.5, 12, 0.5), M.concrete, x, 6, z);

curZone = 'entry';
// Entrance vestibule (south), x [-1.6,1.6], z [8, 11.6]
put(planeGeo(3.6, 3.2, 3.6 / 1.76, 3.2 / 1.6), brickMat, -1.6, 1.6, 9.8, 0, PI / 2);
put(planeGeo(3.6, 3.2, 3.6 / 1.76, 3.2 / 1.6), brickMat, 1.6, 1.6, 9.8, 0, -PI / 2);
put(planeGeo(3.2, 3.6), M.concrete, 0, 3.2, 9.8, PI / 2);
{ // wooden street gate at the back, slightly ajar with warm street light behind
  const gate = std({ map: T.woodTexture([92, 58, 34], 8), roughness: 0.7 });
  put(boxGeo(1.55, 2.9, 0.08), gate, -0.8, 1.45, 11.55);
  put(boxGeo(1.55, 2.9, 0.08), gate, 0.85, 1.45, 11.5, 0, 0.18);
  put(boxGeo(3.2, 0.3, 0.2), M.darkWood, 0, 3.05, 11.5);
  for (const sx of [-1, 1]) for (let k = 0; k < 3; k++) put(sph(0.035, 8, 6), M.darkMetal, sx * 0.5 + (sx > 0 ? 0.35 : -0.3), 0.8 + k * 0.7, 11.49);
  put(planeGeo(0.3, 2.9), std({ color: 0x000000, emissive: 0xffa860, emissiveIntensity: 1.2 }), 0.02, 1.45, 11.62, 0, PI);
}
colliders.push([-2.2, 8, -1.6, 12.2], [1.6, 8, 2.2, 12.2], [-2.2, 11.4, 2.2, 12.2]);
curZone = 'court';
// entrance arch sign (facing courtyard)
{ const sm = signMat({ bg: '#2a1a12', fg: '#f2c76e', title: '雨 後 夜 市', sub: 'AFTER-RAIN NIGHT MARKET', titleFont: 'bold 150px "Microsoft YaHei", serif', subFont: '600 44px Georgia, serif', border: '#b8893f' });
  sm.emissiveMap = sm.map; sm.emissive.set(0xffffff); sm.emissiveIntensity = 0.35; // gilded letters catch the string lights
  put(planeGeo(2.8, 0.7), sm, 0, 3.75, 7.92, 0, PI); }
put(boxGeo(3.0, 0.08, 0.12), M.darkWood, 0, 3.38, 7.95);
lamp(0, 2.9, 9.6, 0xffb46a, 2.2, 6, 0.02);
put(boxGeo(0.35, 0.08, 0.35), M.darkMetal, 0, 3.16, 9.6);
put(sph(0.09, 12, 8), M.bulb, 0, 3.05, 9.6);

// ---------------------------------------------------------------- facade details
function acUnit(x, y, z, ry) {
  inFrame(x, z, ry, () => {
    put(boxGeo(0.8, 0.55, 0.3), std({ color: 0xbdb8ae, roughness: 0.6 }), 0, y, 0.15);
    put(cyl(0.2, 0.2, 0.02, 16), M.black, 0.1, y, 0.31, PI / 2);
    put(boxGeo(0.7, 0.03, 0.34), M.darkMetal, 0, y - 0.3, 0.17);
    put(tube([new THREE.Vector3(-0.35, y - 0.1, 0.1), new THREE.Vector3(-0.45, y - 0.6, 0.06), new THREE.Vector3(-0.45, y - 1.6, 0.05)], 0.012, 8, 4), M.cable);
  });
}
const acMat = std({ color: 0xbdb8ae, roughness: 0.6 });
acUnit(-6.0, 6.5, -8, 0); acUnit(2.8, 9.2, -8, 0); acUnit(-9, 5.8, -3.5, PI / 2); acUnit(-9, 8.6, 3.9, PI / 2);
acUnit(9, 7.1, 1.5, -PI / 2); acUnit(9, 10.0, -6.2, -PI / 2); acUnit(5.8, 6.4, 8, PI);
function balcony(x, y, z, ry, w = 2.2) {
  inFrame(x, z, ry, () => {
    put(boxGeo(w, 0.14, 0.9), M.concrete, 0, y, 0.45);
    put(boxGeo(w, 0.05, 0.05), M.darkMetal, 0, y + 1.0, 0.88);
    for (let k = 0; k <= Math.round(w / 0.14); k++) put(boxGeo(0.02, 1.0, 0.02), M.darkMetal, -w / 2 + k * w / Math.round(w / 0.14), y + 0.5, 0.88);
    for (const s of [-1, 1]) put(boxGeo(0.05, 1.0, 0.9), M.darkMetal, s * w / 2, y + 0.5, 0.45, 0, 0, 0, 0.4, 1, 1);
    // potted plants / laundry on balconies
    put(cyl(0.14, 0.1, 0.24, 10), M.terracotta, -w / 2 + 0.3, y + 0.19, 0.6);
    put(sph(0.22, 8, 6), M.leaf, -w / 2 + 0.3, y + 0.42, 0.6, 0, 0, 0, 1, 0.8, 1);
  });
}
balcony(-3, 6.4, -8, 0); balcony(3, 9.4, -8, 0); balcony(-9, 6.4, 0.8, PI / 2, 1.8); balcony(9, 6.4, -6.0, -PI / 2, 1.8); balcony(9, 9.4, 4.5, -PI / 2);
// drainpipes
for (const [x, z] of [[-8.6, -7.85], [8.6, -7.85], [-8.85, 7.6], [8.85, 7.6], [-1.9, 7.85]]) {
  put(cyl(0.055, 0.055, 12, 10), M.darkMetal, x, 6, z);
  put(cyl(0.075, 0.075, 0.1, 10), M.darkMetal, x, 0.4, z);
}
// rooftop silhouettes
put(cyl(0.9, 0.9, 1.6, 16), std({ color: 0x3a3c3e, metalness: 0.4, roughness: 0.7 }), -4, 13.0, -9.2);
for (const x of [-4.6, -3.4]) put(boxGeo(0.1, 0.9, 0.1), M.darkMetal, x, 12.3, -9.2);
put(boxGeo(0.06, 3, 0.06), M.darkMetal, 5, 13.5, -8.6);
put(boxGeo(1.4, 0.04, 0.04), M.darkMetal, 5, 14.5, -8.6);
put(boxGeo(2.2, 1.6, 1.8), M.concrete, 6.5, 13.8, 9.2);
// overhead power / phone cables between facades
for (const [a, b, s] of [[[-9, 8.2, -6], [9, 9.0, -2], 0.5], [[-9, 7.6, 3], [9, 8.4, 6], 0.6], [[-4, 9.5, -8], [3, 9.2, 8], 0.7]]) {
  put(tube(catenary(new THREE.Vector3(...a), new THREE.Vector3(...b), s, 12), 0.012, 24, 3), M.cable);
}
// laundry line across the north-west corner, hanging damp after the rain
{
  const A = new THREE.Vector3(-8.85, 7.6, -4.2), B = new THREE.Vector3(-4.4, 7.7, -7.85);
  const pts = catenary(A, B, 0.45, 20);
  put(tube(pts, 0.006, 30, 3), M.cable);
  const cloths = [[F.indigo, 0.5, 0.7], [F.red, 0.4, 0.55], [F.maroon, 0.55, 0.45], [F.green, 0.35, 0.6], [F.blue, 0.6, 0.8], [F.umbrella, 0.3, 0.3]];
  cloths.forEach(([mat, w, h], i) => {
    const t = 0.14 + i * 0.14, p = A.clone().lerp(B, t); p.y -= 0.45 * 4 * t * (1 - t);
    const ang = Math.atan2(B.x - A.x, B.z - A.z) + PI / 2;
    put(planeGeo(w, h), mat, p.x, p.y - h / 2, p.z, 0.04 * (i % 2 ? 1 : -1), ang, 0);
    put(boxGeo(0.02, 0.04, 0.02), M.darkWood, p.x, p.y, p.z);
  });
}
// ground-floor fronts: rolling shutters, doors, a lit shop window
const sh = T.shutterTextures();
const shutterMat = std({ map: sh.map, normalMap: sh.normalMap, metalness: 0.5, roughness: 0.5 });
function shutter(x, z, ry, w = 2.6, h = 2.6) {
  inFrame(x, z, ry, () => {
    put(planeGeo(w, h, w / 1.3, h / 1.3), shutterMat, 0, h / 2, 0.02);
    put(boxGeo(w + 0.2, 0.35, 0.3), M.darkMetal, 0, h + 0.17, 0.15);
    put(boxGeo(0.06, h, 0.08), M.darkMetal, -w / 2 - 0.03, h / 2, 0.04);
    put(boxGeo(0.06, h, 0.08), M.darkMetal, w / 2 + 0.03, h / 2, 0.04);
  });
}
shutter(-5.2, -8, 0); shutter(4.2, -8, 0, 3.0); shutter(-9, 4.0, PI / 2, 2.4);
function door(x, z, ry, lit) {
  inFrame(x, z, ry, () => {
    put(boxGeo(1.1, 2.2, 0.06), M.darkWood, 0, 1.1, 0.03);
    put(boxGeo(1.3, 0.1, 0.12), M.concrete, 0, 2.25, 0.06);
    put(planeGeo(1.0, 0.4), lit ? std({ color: 0x000000, emissive: 0xffa458, emissiveIntensity: 0.7 }) : M.glass, 0, 2.55, 0.02);
    put(boxGeo(0.04, 0.4, 0.03), M.darkWood, -0.17, 2.55, 0.03); put(boxGeo(0.04, 0.4, 0.03), M.darkWood, 0.17, 2.55, 0.03);
    put(sph(0.03, 8, 6), M.copper, 0.4, 1.05, 0.08);
    put(boxGeo(1.3, 0.12, 0.4), M.concrete, 0, 0.06, 0.2);
  });
}
door(-9, -1.2, PI / 2, true); door(9, 4.6, -PI / 2, false); door(-5.5, 8, PI, true);
{ // lit shop window on the south facade with goods silhouettes
  inFrame(5.2, 8, PI, () => {
    const wc = document.createElement('canvas'); wc.width = 512; wc.height = 320; const x = wc.getContext('2d');
    const gr = x.createLinearGradient(0, 0, 0, 320); gr.addColorStop(0, '#f2b874'); gr.addColorStop(1, '#6b3a1c');
    x.fillStyle = gr; x.fillRect(0, 0, 512, 320);
    x.fillStyle = '#2a1608'; for (const y of [110, 215]) x.fillRect(0, y, 512, 10);
    for (let k = 0; k < 14; k++) { x.fillStyle = ['#3a2010', '#5a2a14', '#24344a'][k % 3]; const w = 18 + (k * 7) % 20; x.fillRect(12 + k * 36, (k % 2 ? 215 : 110) - 30 - (k * 13) % 30, w, 30 + (k * 13) % 30); }
    x.fillStyle = 'rgba(30,14,6,0.7)'; x.fillRect(0, 0, 90, 320); x.fillRect(440, 0, 72, 320);
    const wt = new THREE.CanvasTexture(wc); wt.colorSpace = THREE.SRGBColorSpace;
    put(planeGeo(2.4, 1.5), std({ color: 0x000000, emissive: 0xffffff, emissiveMap: wt, emissiveIntensity: 0.75 }), 0, 1.6, 0.01);
    put(boxGeo(2.6, 0.1, 0.35), M.concrete, 0, 0.82, 0.12);
    for (let k = 0; k < 5; k++) put(cyl(0.08, 0.08, 0.3 + (k % 2) * 0.12, 10), M.blueCeramic, -0.9 + k * 0.45, 1.0 + 0.15, 0.06);
    put(boxGeo(2.6, 0.08, 0.1), M.darkWood, 0, 2.4, 0.05);
    put(boxGeo(0.06, 1.6, 0.08), M.darkWood, 0, 1.6, 0.04);
  });
}

// ---------------------------------------------------------------- neon signs (restrained)
function neon(x, y, z, ry, w, h, matN, color, li) {
  inFrame(x, z, ry, () => {
    put(planeGeo(w, h), matN, 0, y, 0.07);
    put(boxGeo(w + 0.08, h + 0.08, 0.06), M.black, 0, y, 0.03);
    for (const s of [-1, 1]) put(boxGeo(0.04, 0.04, 0.3), M.darkMetal, s * w * 0.4, y + h / 2 - 0.05, 0.0);
    if (li) lamp(0, y - 0.2, 0.8, color, li, 7, 0.0);
  });
}
const neonPink = neonMat('夜市', '#ff3d7a', 1024, 420, 'bold 230px "Microsoft YaHei", sans-serif', 'NIGHT MARKET');
const neonCyan = neonMat('拉麺', '#3fe0ff', 768, 420, 'bold 220px "Microsoft YaHei", sans-serif', 'NOODLE BAR');
const neonTea = neonMat('茶 →', '#7dff9a', 768, 300, 'bold 180px "Microsoft YaHei", sans-serif');
neon(-0.6, 5.1, -8, 0, 2.4, 1.0, neonPink, 0xff3d7a, 5);
neon(-9, 4.6, -4.8, PI / 2, 1.7, 0.93, neonCyan, 0x3fe0ff, 4);
neon(9, 3.75, -0.9, -PI / 2, 1.1, 0.43, neonTea, 0x7dff9a, 0);

// ---------------------------------------------------------------- reusable props
function makeCrate(w = 0.5, d = 0.36, h = 0.26) {
  const parts = [];
  const add = (g, x, y, z) => { g.translate(x, y, z); parts.push(g); };
  add(boxGeo(w, 0.015, d, 2), 0, 0.0075, 0);
  for (const s of [0.03, 0.15]) {
    add(boxGeo(w, 0.075, 0.012, 2), 0, s + 0.0375, d / 2 - 0.006);
    add(boxGeo(w, 0.075, 0.012, 2), 0, s + 0.0375, -d / 2 + 0.006);
    add(boxGeo(0.012, 0.075, d, 2), w / 2 - 0.006, s + 0.0375, 0);
    add(boxGeo(0.012, 0.075, d, 2), -w / 2 + 0.006, s + 0.0375, 0);
  }
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(boxGeo(0.03, h, 0.03, 2), sx * (w / 2 - 0.015), h / 2, sz * (d / 2 - 0.015));
  return mergeGeometries(parts);
}
const crateGeo = makeCrate();
const fruitGeo = sph(1, 12, 9);
const FRUIT = {
  orange: std({ color: 0xffffff, roughness: 0.5 }),
  apple: std({ color: 0xffffff, roughness: 0.3 }),
  lime: std({ color: 0xffffff, roughness: 0.4 }),
  lemon: std({ color: 0xffffff, roughness: 0.45 }),
  dragon: std({ color: 0xffffff, roughness: 0.45 }),
  eggplant: std({ color: 0xffffff, roughness: 0.22 }),
  melon: std({ color: 0xffffff, roughness: 0.5 }),
};
const FCOL = { orange: 0xe8701a, apple: 0x9c1a18, lime: 0x5c9a2a, lemon: 0xe3b62a, dragon: 0xd23a77, eggplant: 0x3a1840, melon: 0x2f5a25 };
function crateOf(kind, x, y, z, ry = 0, tilt = 0, r = 0.04, sy = 1) {
  inFrame(x, z, ry, () => {
    put(crateGeo, M.crate, 0, y, 0, tilt);
    const nx = Math.floor(0.47 / (2 * r)), nz = Math.floor(0.33 / (2 * r));
    const base = new THREE.Color(FCOL[kind]);
    for (let layer = 0; layer < 2; layer++) for (let i = 0; i < nx - layer; i++) for (let k = 0; k < nz - layer; k++) {
      const px = -0.235 + r + (i + layer * 0.5) * 2 * r + (T.rand() - 0.5) * r * 0.3;
      const pz = -0.165 + r + (k + layer * 0.5) * 2 * r + (T.rand() - 0.5) * r * 0.3;
      const py = 0.2 + layer * r * 1.4 + r * 0.6;
      // tilt with crate (rotate around x)
      const cy = y + py * Math.cos(tilt) - pz * Math.sin(tilt), cz = py * Math.sin(tilt) + pz * Math.cos(tilt);
      _c.copy(base).offsetHSL((T.rand() - 0.5) * 0.03, (T.rand() - 0.5) * 0.1, (T.rand() - 0.5) * 0.08);
      inst(kind, fruitGeo, FRUIT[kind], px, cy, cz, T.rand() * 3, T.rand() * 3, 0, r * (0.9 + T.rand() * 0.2), r * sy * (0.9 + T.rand() * 0.2), _c.clone());
    }
  });
}
const lanternGeo = sph(0.2, 16, 12);
const lanternMats = {};
function lanternMat(color, ch) {
  const k = color + ch;
  if (!lanternMats[k]) { const t = T.lanternTexture(color, ch); lanternMats[k] = lam({ map: t, emissiveMap: t, emissive: 0xffffff, emissiveIntensity: 2.4, roughness: 0.7 }); }
  return lanternMats[k];
}
function lantern(x, y, z, s = 1, color = '#c8261c', ch = '福', cord = 0.3) {
  put(lanternGeo, lanternMat(color, ch), x, y, z, 0, 0, 0, s, s * 1.18, s);
  put(cyl(0.1 * s, 0.1 * s, 0.05 * s, 12), M.black, x, y + 0.24 * s, z);
  put(cyl(0.1 * s, 0.1 * s, 0.05 * s, 12), M.black, x, y - 0.24 * s, z);
  put(cyl(0.006, 0.006, cord, 4), M.cable, x, y + 0.24 * s + cord / 2, z);
  put(cyl(0.012, 0.004, 0.22 * s, 5), M.redPlastic, x, y - 0.38 * s, z);
}
function stool(x, z, colorMat = M.redPlastic, h = 0.45) {
  put(cyl(0.16, 0.15, 0.04, 14), colorMat, x, h, z);
  for (let k = 0; k < 4; k++) { const a = k * PI / 2 + PI / 4; put(cyl(0.018, 0.022, h, 6), colorMat, x + Math.cos(a) * 0.11, h / 2, z + Math.sin(a) * 0.11, Math.sin(a) * 0.12, 0, -Math.cos(a) * 0.12); }
}
const shadowTex = T.radialTexture('rgba(0,0,0,0.75)', 'rgba(0,0,0,0)');
const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
function contactShadow(x, z, w, d) { put(planeGeo(w, d), shadowMat, x, 0.006, z, -PI / 2); }

// ---------------------------------------------------------------- particles (steam / smoke / drips)
const particleSystems = [];
function steam(origin, { count = 26, color = 0xd8d4cc, size = 0.35, rise = 0.45, life = 3.2, spread = 0.08, alpha = 0.16 } = {}) {
  const pos = new Float32Array(count * 3), a = new Float32Array(count), s = new Float32Array(count);
  const st = []; for (let i = 0; i < count; i++) st.push({ t: Math.random(), ox: (Math.random() - 0.5) * spread, oz: (Math.random() - 0.5) * spread, w: Math.random() * 6 });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aA', new THREE.BufferAttribute(a, 1)); g.setAttribute('aS', new THREE.BufferAttribute(s, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uColor: { value: new THREE.Color(color) }, uScale: pointScale },
    vertexShader: `attribute float aA; attribute float aS; varying float vA; uniform float uScale;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * mv; gl_PointSize = aS * uScale / -mv.z; vA = aA; }`,
    fragmentShader: `uniform vec3 uColor; varying float vA;
      void main(){ vec2 c = gl_PointCoord - 0.5; float d = 1.0 - dot(c,c) * 4.0; if (d <= 0.0) discard; gl_FragColor = vec4(uColor, d * d * vA); }`,
  });
  const pts = new THREE.Points(g, mat); pts.frustumCulled = false; scene.add(pts);
  particleSystems.push({ update(dt, time) {
    for (let i = 0; i < count; i++) {
      const p = st[i]; p.t += dt / life; if (p.t > 1) { p.t -= 1; p.ox = (Math.random() - 0.5) * spread; p.oz = (Math.random() - 0.5) * spread; }
      const t = p.t;
      pos[i * 3] = origin.x + p.ox * (1 + t * 3) + Math.sin(time * 0.7 + p.w) * 0.06 * t + t * 0.08;
      pos[i * 3 + 1] = origin.y + t * rise * life * 0.5;
      pos[i * 3 + 2] = origin.z + p.oz * (1 + t * 3) + Math.cos(time * 0.5 + p.w) * 0.05 * t;
      a[i] = alpha * Math.sin(t * PI) * (1 - t * 0.3);
      s[i] = size * (0.4 + t * 1.6);
    }
    g.attributes.position.needsUpdate = true; g.attributes.aA.needsUpdate = true; g.attributes.aS.needsUpdate = true;
  } });
}
const pointScale = { value: 1 };
const dripSpawns = [];
function drips() {
  const count = dripSpawns.length;
  const pos = new Float32Array(count * 3), st = dripSpawns.map((p) => ({ p, y: p.y, v: 0, wait: Math.random() * 4 }));
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uScale: pointScale },
    vertexShader: `uniform float uScale; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * mv; gl_PointSize = max(1.5, 0.018 * uScale / -mv.z); }`,
    fragmentShader: `void main(){ vec2 c = gl_PointCoord - 0.5; float d = 1.0 - dot(c,c)*4.0; if (d <= 0.0) discard; gl_FragColor = vec4(vec3(0.75,0.82,0.95) * d, d * 0.8); }`,
  });
  const pts = new THREE.Points(g, mat); pts.frustumCulled = false; scene.add(pts);
  particleSystems.push({ update(dt) {
    for (let i = 0; i < count; i++) {
      const d = st[i];
      if (d.wait > 0) { d.wait -= dt; d.y = d.p.y; d.v = 0; }
      else { d.v += 9.8 * dt; d.y -= d.v * dt; if (d.y < 0.02) { d.wait = 1.5 + Math.random() * 5; } }
      pos[i * 3] = d.p.x; pos[i * 3 + 1] = d.wait > 0 ? -5 : d.y; pos[i * 3 + 2] = d.p.z;
    }
    g.attributes.position.needsUpdate = true;
  } });
}
function dripsAlong(x0, x1, y, z, n) { for (let i = 0; i < n; i++) dripSpawns.push(wp(x0 + (x1 - x0) * (i + Math.random() * 0.6) / n, y, z)); }

// ---------------------------------------------------------------- STALL A: wok & noodles (metal, sloped awning, scalloped valance)
inFrame(-5.0, -5.6, 0, () => {
  const W = 3.0;
  for (const [x, z, h] of [[-1.45, -0.85, 2.62], [1.45, -0.85, 2.62], [-1.45, 0.85, 2.36], [1.45, 0.85, 2.36]]) put(cyl(0.03, 0.03, h, 8), M.pole, x, h / 2, z);
  // sloped awning, back at z=-0.95 y=2.66, front at z=1.6 y=2.28
  const len = Math.hypot(2.55, 0.38), ang = Math.atan2(0.38, 2.55);
  const aw = planeGeo(W + 0.3, len); aw.rotateX(-PI / 2);
  put(aw, F.red, 0, 2.47, 0.325, ang);
  // scalloped valance
  const shp = new THREE.Shape(); const vw = W + 0.3, n = 9;
  shp.moveTo(-vw / 2, 0); shp.lineTo(vw / 2, 0); shp.lineTo(vw / 2, -0.16);
  for (let k = n; k > 0; k--) { const x1 = -vw / 2 + (k - 1) * vw / n; shp.quadraticCurveTo(x1 + vw / n / 2, -0.32, x1, -0.16); }
  shp.lineTo(-vw / 2, 0);
  const vg = new THREE.ShapeGeometry(shp, 6);
  put(vg, F.red, 0, 2.29, 1.6);
  // steel counter with menu panel
  put(boxGeo(2.6, 0.9, 0.72), M.steel, 0, 0.45, 0.35);
  put(boxGeo(2.66, 0.03, 0.78), M.steel, 0, 0.915, 0.35);
  put(planeGeo(1.5, 0.5), signMat({ bg: '#efe4c8', fg: '#7d1c14', title: '牛肉麺  炒麺', sub: 'BEEF NOODLE · WOK FRIED · 8', border: '#7d1c14', titleFont: 'bold 120px "Microsoft YaHei", serif' }, 1024, 340), -0.2, 0.55, 0.715);
  // burner + wok + blue flame
  put(cyl(0.2, 0.22, 0.08, 16), M.darkMetal, -0.6, 0.97, 0.3);
  put(new THREE.TorusGeometry(0.17, 0.02, 6, 18), M.darkMetal, -0.6, 1.02, 0.3, PI / 2);
  put(lathe([[0.0, 0.0], [0.12, 0.01], [0.24, 0.06], [0.32, 0.15], [0.335, 0.17]], 24), M.wok, -0.6, 1.02, 0.3);
  put(cyl(0.012, 0.012, 0.3, 6), M.darkWood, -0.6 + 0.48, 1.18, 0.3, 0, 0, PI / 2);
  put(new THREE.ConeGeometry(0.15, 0.08, 16, 1, true), M.flame, -0.6, 1.04, 0.3, PI);
  put(lathe([[0.0, 0.0], [0.15, 0.0], [0.17, 0.02], [0.19, 0.06]], 16), M.noodles, -0.6, 1.07, 0.3); // noodles in wok
  // stockpot with ladle
  put(cyl(0.2, 0.19, 0.4, 20, true), M.steel, 0.45, 1.13, 0.28);
  put(cyl(0.19, 0.19, 0.02, 20), std({ color: 0x5a3416, roughness: 0.15 }), 0.45, 1.27, 0.28);
  put(cyl(0.008, 0.008, 0.55, 6), M.steel, 0.52, 1.42, 0.25, 0.3, 0, -0.35);
  // bowls stacked
  for (let k = 0; k < 6; k++) put(lathe([[0, 0], [0.05, 0], [0.06, 0.01], [0.09, 0.05], [0.095, 0.06]], 14), M.ceramic, 1.05, 0.93 + k * 0.022, 0.45);
  for (let k = 0; k < 4; k++) put(lathe([[0, 0], [0.05, 0], [0.06, 0.01], [0.09, 0.05], [0.095, 0.06]], 14), M.blueCeramic, 1.05, 0.93 + k * 0.022, 0.2);
  // squeeze bottles + chopstick cup
  put(cyl(0.03, 0.03, 0.17, 8), M.redPlastic, 0.0, 1.02, 0.6);
  put(cyl(0.03, 0.03, 0.17, 8), std({ color: 0xd8a51c, roughness: 0.4 }), 0.08, 1.02, 0.6);
  put(cyl(0.04, 0.035, 0.12, 10), M.steel, 0.2, 0.99, 0.62);
  for (let k = 0; k < 8; k++) put(cyl(0.003, 0.003, 0.22, 4), M.darkWood, 0.2 + (k % 3 - 1) * 0.012, 1.08, 0.62 + (k % 2 - 0.5) * 0.015, (k % 3 - 1) * 0.1, 0, (k % 2 - 0.5) * 0.2);
  // noodle portions on tray
  put(boxGeo(0.5, 0.02, 0.3), M.steel, -0.05, 0.94, 0.35);
  for (let k = 0; k < 4; k++) put(sph(0.06, 8, 6), M.noodles, -0.22 + k * 0.11, 0.97, 0.35, 0, 0, 0, 1, 0.45, 1);
  // back prep table, utensil rail, gas bottle
  put(boxGeo(2.4, 0.06, 0.45), M.wood, 0, 0.86, -0.6);
  for (const x of [-1.1, 1.1]) put(boxGeo(0.05, 0.86, 0.4), M.darkMetal, x, 0.43, -0.6);
  put(cyl(0.16, 0.16, 0.5, 16), std({ color: 0x2b5d9e, metalness: 0.3, roughness: 0.45 }), -0.75, 0.28, -0.5);
  put(sph(0.16, 16, 8), std({ color: 0x2b5d9e, metalness: 0.3, roughness: 0.45 }), -0.75, 0.53, -0.5, 0, 0, 0, 1, 0.5, 1);
  put(tube([new THREE.Vector3(-0.75, 0.6, -0.5), new THREE.Vector3(-0.7, 0.75, -0.1), new THREE.Vector3(-0.6, 0.8, 0.2)], 0.012, 10, 4), M.rubber);
  put(cyl(0.012, 0.012, 2.9, 6), M.steel, 0, 1.95, -0.84, 0, 0, PI / 2);
  for (let k = 0; k < 6; k++) {
    const x = -1.0 + k * 0.4;
    put(cyl(0.006, 0.006, 0.42, 5), M.steel, x, 1.73, -0.84);
    if (k % 2) put(lathe([[0, 0], [0.04, 0.005], [0.055, 0.03]], 10), M.steel, x, 1.48, -0.84, PI);
    else put(boxGeo(0.1, 0.12, 0.004), M.steel, x, 1.48, -0.84);
  }
  // cabbage & greens basket on prep table
  put(cyl(0.18, 0.14, 0.14, 14, true), M.crate, 0.6, 0.96, -0.6);
  for (let k = 0; k < 5; k++) put(sph(0.07, 8, 6), M.greens, 0.53 + (k % 3) * 0.07, 1.02 + (k > 2 ? 0.04 : 0), -0.64 + (k % 2) * 0.08);
  // sign board on top
  put(planeGeo(1.7, 0.5), signMat({ bg: '#6d1812', fg: '#ffe2a6', title: '麺', sub: 'NOODLES', titleFont: 'bold 200px "Microsoft YaHei", serif', subFont: 'bold 56px Georgia, serif' }, 768, 256), 0, 2.85, 1.25, -0.12);
  put(boxGeo(1.8, 0.05, 0.05), M.pole, 0, 2.58, 1.27);
  lantern(1.05, 2.0, 1.25); lantern(-1.05, 2.0, 1.25, 0.9);
  lamp(0, 2.05, 1.0, 0xff9a52, 6, 7.5, 0.05);
  steam(wp(0.45, 1.3, 0.28), { count: 30, size: 0.3, alpha: 0.2 });
  steam(wp(-0.6, 1.1, 0.3), { count: 18, size: 0.25, alpha: 0.12, life: 2.2 });
  dripsAlong(-1.6, 1.6, 2.13, 1.6, 6);
  contactShadow(0, 0, 3.3, 2.4);
  block(-1.5, -0.9, 1.5, 0.75);
});

// ---------------------------------------------------------------- STALL B: fruit & produce (gable tent, crate tiers)
inFrame(4.0, -5.4, 0, () => {
  for (const [x, z] of [[-1.6, -1.5], [1.6, -1.5], [-1.6, 1.5], [1.6, 1.5]]) put(cyl(0.032, 0.032, 2.2, 8), M.pole, x, 1.1, z);
  put(cyl(0.03, 0.03, 0.8, 8), M.pole, 0, 2.55, 1.5); put(cyl(0.03, 0.03, 0.8, 8), M.pole, 0, 2.55, -1.5);
  const sl = Math.hypot(1.75, 0.78), ang = Math.atan2(0.78, 1.75);
  const pg = planeGeo(sl, 3.25, 1, 1); pg.rotateX(-PI / 2);
  put(pg, F.green, -0.875, 2.59, 0, 0, 0, ang);
  put(pg, F.green, 0.875, 2.59, 0, 0, 0, -ang);
  put(cyl(0.025, 0.025, 3.3, 8), M.pole, 0, 2.98, 0, PI / 2);
  // closed back gable
  const tri = new THREE.Shape(); tri.moveTo(-1.75, 0); tri.lineTo(1.75, 0); tri.lineTo(0, 0.78); tri.lineTo(-1.75, 0);
  put(new THREE.ShapeGeometry(tri), F.green, 0, 2.2, -1.62);
  // side valances
  for (const s of [-1, 1]) put(planeGeo(3.25, 0.18), F.green, s * 1.75, 2.12, 0, 0, PI / 2);
  // tiered display: back riser of crates tilted towards customers
  put(boxGeo(3.0, 0.5, 0.5), M.wood, 0, 0.25, -1.1);
  put(boxGeo(3.0, 0.8, 0.4), M.wood, 0, 0.4, -1.4);
  const kinds = [['orange', 0.042], ['apple', 0.04], ['lime', 0.032], ['lemon', 0.036], ['dragon', 0.05]];
  for (let i = 0; i < 5; i++) { const [k, r] = kinds[i]; crateOf(k, -1.2 + i * 0.6, 0.8, -1.35, 0, 0.35, r, k === 'lemon' ? 1.25 : 1); }
  const kinds2 = [['apple', 0.04], ['orange', 0.042], ['eggplant', 0.035], ['lime', 0.032], ['orange', 0.042]];
  for (let i = 0; i < 5; i++) { const [k, r] = kinds2[i]; crateOf(k, -1.2 + i * 0.6, 0.5, -0.9, 0, 0.18, r, k === 'eggplant' ? 2.2 : 1); }
  // ground-level crates in front, slightly askew
  crateOf('melon', -1.1, 0.0, -0.35, 0.1, 0, 0.11, 1.25);
  crateOf('orange', 1.15, 0.0, -0.4, -0.15, 0, 0.042);
  // price tags
  const tags = [['¥6', '#fff7e0'], ['¥8', '#fff7e0'], ['¥5', '#fff7e0'], ['¥12', '#fff7e0']];
  tags.forEach(([t], i) => put(planeGeo(0.14, 0.08), signMat({ bg: '#f4ecd6', fg: '#b01e1e', title: t, titleFont: 'bold 110px Georgia, serif', border: '#222' }, 256, 150), -0.9 + i * 0.6, 0.66, -0.68, -0.25));
  // hanging scale
  put(cyl(0.004, 0.004, 0.5, 4), M.cable, 0.55, 1.9, 0.6);
  put(cyl(0.07, 0.07, 0.035, 18), M.ceramic, 0.55, 1.6, 0.6, PI / 2);
  put(cyl(0.12, 0.12, 0.012, 18), M.steel, 0.55, 1.35, 0.6);
  for (let k = 0; k < 3; k++) put(cyl(0.002, 0.002, 0.22, 3), M.steel, 0.55 + Math.cos(k * 2.1) * 0.06, 1.47, 0.6 + Math.sin(k * 2.1) * 0.06);
  // bare bulbs on cords
  for (const x of [-0.7, 0.7]) { put(cyl(0.005, 0.005, 0.6, 4), M.cable, x, 2.45, 0.2); put(sph(0.045, 10, 8), M.bulb, x, 2.13, 0.2); }
  lamp(0, 2.05, 0.1, 0xffb067, 5.5, 7.5, 0.03);
  // hanging painted board under ridge front
  put(planeGeo(1.3, 0.4), signMat({ bg: '#e9d9a8', fg: '#1f4a2c', title: '鲜果', sub: 'FRESH FRUIT', titleFont: 'bold 170px "Microsoft YaHei", serif', border: '#1f4a2c' }, 768, 256), 0, 2.38, 1.6);
  dripsAlong(-1.75, -0.2, 2.17, 1.62, 3); dripsAlong(0.2, 1.75, 2.17, 1.62, 3);
  contactShadow(0, -0.9, 3.4, 1.8);
  block(-1.6, -1.65, 1.6, -0.6);
  block(-1.4, -0.6, -0.8, -0.1); block(0.85, -0.65, 1.45, -0.15);
  for (const [x, z] of [[-1.6, 1.5], [1.6, 1.5]]) block(x - 0.06, z - 0.06, x + 0.06, z + 0.06);
});

// ---------------------------------------------------------------- STALL C: skewer grill cart under round umbrella
inFrame(-5.4, 3.8, PI / 2, () => {
  // umbrella
  put(cyl(0.035, 0.035, 2.75, 10), M.pole, 0, 1.38, -0.1);
  put(new THREE.ConeGeometry(1.8, 0.6, 8, 1, true), F.umbrella, 0, 2.86, -0.1);
  put(cyl(1.8, 1.8, 0.14, 8, true), F.umbrella, 0, 2.5, -0.1);
  for (let k = 0; k < 8; k++) { const a = k * PI / 4; put(boxGeo(0.02, 0.02, 1.85), M.darkMetal, Math.sin(a) * 0.9, 2.84, -0.1 + Math.cos(a) * 0.9, -0.32, a, 0); }
  put(cyl(0.3, 0.38, 0.12, 16), M.concrete, 0, 0.06, -0.1);
  // cart
  put(boxGeo(1.5, 0.08, 0.75), M.darkWood, 0, 0.82, -0.6);
  put(boxGeo(1.5, 0.7, 0.04), M.wood, 0, 0.45, -0.24);
  put(boxGeo(1.5, 0.7, 0.04), M.wood, 0, 0.45, -0.96);
  put(planeGeo(1.3, 0.45), signMat({ bg: '#1d1a17', fg: '#ffb347', title: '串 烧', sub: 'CHARCOAL SKEWERS', titleFont: 'bold 150px "Microsoft YaHei", serif', border: '#ffb347' }, 1024, 340), 0, 0.5, -0.215);
  for (const x of [-0.6, 0.6]) {
    put(cyl(0.22, 0.22, 0.05, 16), M.rubber, x, 0.22, -0.2, 0, 0, PI / 2);
    put(cyl(0.05, 0.05, 0.06, 8), M.darkMetal, x, 0.22, -0.2, 0, 0, PI / 2);
  }
  // grill box with glowing coals
  put(boxGeo(1.0, 0.18, 0.38), M.darkMetal, -0.15, 0.95, -0.6);
  const coalTex = T.fabricTexture('#ff5a14', '#7a1c06', 2, { solid: false });
  put(planeGeo(0.94, 0.32), std({ color: 0x220a04, emissive: 0xff5a1c, emissiveIntensity: 3.0, emissiveMap: coalTex, roughness: 0.9 }), -0.15, 1.02, -0.6, -PI / 2);
  for (let k = 0; k < 12; k++) {
    const x = -0.55 + k * 0.075;
    put(cyl(0.0025, 0.0025, 0.48, 4), std({ color: 0xc8a878, roughness: 0.7 }), x, 1.07, -0.6, PI / 2);
    for (let j = 0; j < 4; j++) put(boxGeo(0.03, 0.025, 0.03), k % 3 === 2 ? M.greens : M.meat, x, 1.07, -0.73 + j * 0.06, 0, j * 0.7, 0);
  }
  // prepared skewers tray, sauce pot, brush
  put(boxGeo(0.34, 0.03, 0.3), M.steel, 0.52, 0.88, -0.6);
  for (let k = 0; k < 7; k++) put(boxGeo(0.28, 0.02, 0.02), M.meat, 0.52, 0.91, -0.72 + k * 0.04);
  put(cyl(0.06, 0.05, 0.1, 12), M.clay, 0.5, 0.91, -0.33);
  // lantern & light
  lantern(1.2, 2.05, 0.7, 1.0, '#c8261c', '串', 0.3);
  lantern(-1.2, 2.05, 0.7, 0.85, '#d2491a', '福', 0.3);
  lamp(0, 1.5, 0.2, 0xff8a40, 6, 7.5, 0.12);
  // small folding table & stools for diners
  put(cyl(0.38, 0.38, 0.03, 20), std({ color: 0xd8d0c0, roughness: 0.4 }), 0.1, 0.72, 1.05);
  put(cyl(0.025, 0.025, 0.72, 8), M.darkMetal, 0.1, 0.36, 1.05);
  put(cyl(0.2, 0.2, 0.02, 12), M.darkMetal, 0.1, 0.01, 1.05);
  stool(-0.5, 1.2); stool(0.65, 1.45, M.bluePlastic);
  put(cyl(0.035, 0.03, 0.2, 10), std({ color: 0x2f5d2c, roughness: 0.1, transparent: true, opacity: 0.8 }), 0.0, 0.84, 1.1);
  put(cyl(0.03, 0.03, 0.08, 10), M.ceramic, 0.2, 0.775, 0.95);
  // plastic crate of drink bottles
  put(boxGeo(0.4, 0.28, 0.3), M.redPlastic, -0.95, 0.14, -0.55);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { put(cyl(0.028, 0.028, 0.22, 8), std({ color: 0x5b7a2c, roughness: 0.08, metalness: 0.2 }), -1.1 + i * 0.1, 0.36, -0.65 + j * 0.1); }
  steam(wp(-0.15, 1.15, -0.6), { count: 30, color: 0x9a948c, size: 0.45, alpha: 0.12, life: 3.8, spread: 0.4, rise: 0.4 });
  for (let k = 0; k < 8; k++) { const a = k * PI / 4 + PI / 8; dripSpawns.push(wp(Math.sin(a) * 1.8, 2.43, -0.1 + Math.cos(a) * 1.8)); }
  contactShadow(0, -0.4, 2.2, 1.6); contactShadow(0.1, 1.05, 1.3, 1.3);
  block(-0.78, -1.0, 0.78, -0.2);
  block(-0.08, -0.18, 0.08, -0.02);
  block(-0.05, 1.0, 0.25, 1.1);
});

// ---------------------------------------------------------------- STALL D: dumplings & bao (barrel-vault canopy, steamer stacks)
inFrame(5.4, 3.6, -PI / 2, () => {
  for (const [x, z] of [[-1.5, -1.0], [1.5, -1.0], [-1.5, 1.0], [1.5, 1.0]]) put(cyl(0.03, 0.03, 2.05, 8), M.pole, x, 1.03, z);
  const bg = new THREE.CylinderGeometry(1.12, 1.12, 3.2, 20, 1, true, 0, PI); bg.rotateZ(PI / 2);
  put(bg, F.blue, 0, 2.03, 0, 0, 0, 0, 1, 0.55, 1);
  for (const x of [-1.5, 0, 1.5]) put(new THREE.TorusGeometry(1.12, 0.014, 4, 20, PI), M.darkMetal, x, 2.03, 0, 0, PI / 2, 0, 1, 1, 1);
  // squash the hoops to match the canopy
  // wooden counter
  put(boxGeo(2.7, 0.95, 0.7), M.wood, 0, 0.475, -0.2);
  put(boxGeo(2.8, 0.05, 0.8), M.darkWood, 0, 0.975, -0.2);
  put(planeGeo(1.8, 0.55), signMat({ bg: '#f2ead2', fg: '#173d6e', title: '餃子 · 包子', sub: 'DUMPLINGS · STEAMED BAO', titleFont: 'bold 130px "Microsoft YaHei", serif', border: '#173d6e' }, 1024, 320), 0, 0.52, 0.155);
  // steamer stacks
  const bamboo = std({ map: T.bambooTexture(), roughness: 0.7 });
  const stacks = [[-0.9, 4], [-0.45, 3], [0.15, 2]];
  for (const [x, n] of stacks) {
    put(cyl(0.21, 0.21, 0.05, 20), M.steel, x, 1.025, -0.25);
    for (let k = 0; k < n; k++) put(cyl(0.18, 0.18, 0.1, 20), bamboo, x, 1.1 + k * 0.1, -0.25);
    put(lathe([[0.18, 0], [0.17, 0.04], [0.1, 0.08], [0, 0.09]], 20), bamboo, x, 1.05 + n * 0.1, -0.25);
  }
  // open steamer with dumplings
  put(cyl(0.18, 0.18, 0.09, 20), bamboo, 0.65, 1.045, -0.25);
  for (let k = 0; k < 7; k++) { const a = k / 7 * PI * 2; put(sph(0.04, 10, 6), M.dough, 0.65 + Math.cos(a) * 0.1 * (k ? 1 : 0), 1.1, -0.25 + Math.sin(a) * 0.1 * (k ? 1 : 0), 0, a, 0, 1.2, 0.65, 0.9); }
  put(cyl(0.18, 0.18, 0.012, 20), bamboo, 0.95, 1.1, -0.48, 0.5, 0, 0.3); // lid leaning
  // bao tray
  put(boxGeo(0.5, 0.025, 0.32), M.steel, 1.05, 1.0, 0.0);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) put(sph(0.05, 12, 8, 0), M.dough, 0.88 + i * 0.11, 1.02, -0.07 + j * 0.14, 0, 0, 0, 1, 0.75, 1);
  // sauce bottles, chopsticks, pot of water on burner at back
  for (let k = 0; k < 3; k++) put(cyl(0.025, 0.03, 0.18, 8), std({ color: 0x2a140a, roughness: 0.08 }), -1.15 + k * 0.07, 1.09, 0.05);
  put(cyl(0.035, 0.03, 0.12, 10), M.bluePlastic, -0.85, 1.06, 0.05);
  put(boxGeo(2.2, 0.06, 0.4), M.wood, 0, 0.8, -0.85);
  put(cyl(0.22, 0.2, 0.35, 18), M.steel, -0.6, 1.0, -0.85);
  put(boxGeo(0.5, 0.2, 0.3), M.dough, 0.5, 0.93, -0.85); // dough block
  put(cyl(0.02, 0.02, 0.4, 8), M.darkWood, 0.5, 1.05, -0.75, 0, 0, PI / 2);
  // vertical banner
  put(cyl(0.02, 0.02, 2.8, 6), M.pole, 1.75, 1.4, 1.05);
  put(planeGeo(0.38, 1.3), signMat({ bg: '#b52d22', fg: '#fff1d6', title: '包', vertical: true, titleFont: 'bold 220px "Microsoft YaHei", serif', border: '#f2c26b' }, 256, 768), 1.75 - 0.21, 2.0, 1.05, 0, 0.12);
  // lantern string along the front edge
  for (let k = 0; k < 4; k++) lantern(-1.2 + k * 0.8, 1.88, 1.02, 0.55, k % 2 ? '#c8261c' : '#d8681c', '福', 0.12);
  lamp(0, 1.85, 0.6, 0xffa25a, 5.5, 7.5, 0.04);
  steam(wp(-0.9, 1.5, -0.25), { count: 26, size: 0.32, alpha: 0.18 });
  steam(wp(0.65, 1.12, -0.25), { count: 20, size: 0.26, alpha: 0.15, life: 2.6 });
  steam(wp(-0.6, 1.2, -0.85), { count: 14, size: 0.25, alpha: 0.12 });
  dripsAlong(-1.6, 1.6, 2.02, 1.12, 5); dripsAlong(-1.6, 1.6, 2.02, -1.12, 4);
  contactShadow(0, -0.4, 3.2, 2.0);
  block(-1.45, -1.1, 1.45, 0.16);
  for (const [x, z] of [[-1.5, 1.0], [1.5, 1.0]]) block(x - 0.06, z - 0.06, x + 0.06, z + 0.06);
  block(1.7, 1.0, 1.8, 1.1);
});

// ---------------------------------------------------------------- string lights over the courtyard
{
  const bulbGeo = sph(0.045, 8, 6);
  const strands = [
    [[-9, 4.9, -3.2], [9, 4.9, -6.6], 0.55], [[-9, 4.6, 1.8], [9, 4.7, -1.2], 0.6],
    [[-9, 4.9, 6.2], [9, 4.8, 2.6], 0.55], [[-6, 5.3, -8], [5, 5.2, 8], 0.7],
  ];
  for (const [a, b, sag] of strands) {
    const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
    const pts = catenary(A, B, sag, 40);
    put(tube(pts, 0.006, 60, 3), M.cable);
    const n = Math.floor(A.distanceTo(B) / 0.75);
    for (let i = 1; i < n; i++) { const t = i / n; const p = A.clone().lerp(B, t); p.y -= sag * 4 * t * (1 - t) + 0.06; inst('bulb', bulbGeo, M.bulb, p.x, p.y, p.z, 0, 0, 0, 1); }
  }
  lamp(0, 4.4, -0.5, 0xffb070, 7, 14, 0.0);
}

// ---------------------------------------------------------------- central drain, planters, stacked goods
put(boxGeo(0.6, 0.02, 0.6), M.darkMetal, 0, 0.005, 0.4);
for (let k = 0; k < 7; k++) put(boxGeo(0.03, 0.025, 0.5), M.black, -0.24 + k * 0.08, 0.008, 0.4);
function planter(x, z, s = 1) {
  put(cyl(0.3 * s, 0.24 * s, 0.5 * s, 14), M.terracotta, x, 0.25 * s, z);
  for (let k = 0; k < 6; k++) { const a = k * 1.1; put(sph(0.22 * s, 8, 6), M.leaf, x + Math.cos(a) * 0.12 * s, 0.62 * s + (k % 3) * 0.1 * s, z + Math.sin(a) * 0.12 * s, 0, 0, 0, 1, 1.3, 1); }
  block(x - 0.3 * s, z - 0.3 * s, x + 0.3 * s, z + 0.3 * s);
}
planter(-8.4, -7.3); planter(8.3, 7.3, 1.2); planter(-8.4, 7.3, 0.9); planter(-1.2, -7.5, 0.8);
// stacked crates & folded tarp near the north-east corner (out of the main route)
for (let k = 0; k < 3; k++) put(crateGeo, M.crate, 7.9, k * 0.26, -7.5, 0, 0.1 * k);
put(crateGeo, M.crate, 7.35, 0, -7.5, 0, -0.2);
put(boxGeo(0.7, 0.18, 0.5), F.maroon, 8.0, 0.86, -7.5);
block(7.0, -7.9, 8.4, -7.1);
// bicycle leaning on west wall
inFrame(-8.75, -1.0 + 2.2, PI / 2, () => {
  for (const x of [-0.5, 0.5]) { put(new THREE.TorusGeometry(0.32, 0.02, 6, 24), M.rubber, x, 0.34, 0.05, 0, 0, 0); put(new THREE.TorusGeometry(0.3, 0.004, 3, 24), M.steel, x, 0.34, 0.05); }
  put(tube([new THREE.Vector3(-0.5, 0.34, 0.05), new THREE.Vector3(-0.1, 0.62, 0.05), new THREE.Vector3(0.4, 0.66, 0.05)], 0.016, 8, 5), std({ color: 0x8a2a24, metalness: 0.5, roughness: 0.4 }));
  put(tube([new THREE.Vector3(0.0, 0.34, 0.05), new THREE.Vector3(-0.15, 0.62, 0.05), new THREE.Vector3(-0.18, 0.78, 0.05)], 0.016, 6, 5), std({ color: 0x8a2a24, metalness: 0.5, roughness: 0.4 }));
  put(tube([new THREE.Vector3(0.0, 0.34, 0.05), new THREE.Vector3(0.45, 0.66, 0.05), new THREE.Vector3(0.5, 0.34, 0.05)], 0.014, 6, 5), std({ color: 0x8a2a24, metalness: 0.5, roughness: 0.4 }));
  put(boxGeo(0.2, 0.05, 0.1), M.black, -0.18, 0.82, 0.05);
  put(cyl(0.012, 0.012, 0.5, 6), M.steel, 0.42, 0.85, 0.05, PI / 2);
  block(-0.85, -0.05, 0.85, 0.25);
});

curZone = 'passage';
// ---------------------------------------------------------------- COVERED PASSAGE  x [9, 16.5], z [-4.4, -2.0], h 3.0
const tiles = T.tileTextures([150, 178, 166]);
const tileMat = std({ map: tiles.map, normalMap: tiles.normalMap, roughness: 0.22 });
{
  const L = 7.5, cx = 12.75;
  for (const [z, ry] of [[-4.4, 0], [-2.0, PI]]) {
    put(planeGeo(L, 1.4, L / 1.2, 1.4 / 1.2), tileMat, cx, 0.7, z, 0, ry);
    put(planeGeo(L, 1.6), M.plaster, cx, 2.2, z, 0, ry);
    put(boxGeo(L, 0.06, 0.04), M.concrete, cx, 1.42, z + (ry ? -0.02 : 0.02));
  }
  put(planeGeo(L, 2.4), M.concrete, cx, 3.0, -3.2, PI / 2);
  // beams
  for (let k = 0; k < 4; k++) put(boxGeo(0.25, 0.22, 2.4), M.concrete, 9.5 + k * 2.2, 2.89, -3.2);
  // pipes and cable trays along the ceiling
  put(cyl(0.06, 0.06, L, 10), M.darkMetal, cx, 2.72, -4.2, 0, 0, PI / 2);
  put(cyl(0.035, 0.035, L, 8), M.copper, cx, 2.62, -4.25, 0, 0, PI / 2);
  put(boxGeo(L, 0.05, 0.25), M.darkMetal, cx, 2.75, -2.2);
  for (let k = 0; k < 5; k++) put(cyl(0.012, 0.012, L, 5), M.cable, cx, 2.79, -2.28 + k * 0.04, 0, 0, PI / 2);
  // fluorescent fixtures
  for (const x of [10.8, 14.6]) { put(boxGeo(1.25, 0.05, 0.14), M.darkMetal, x, 2.96, -3.2); put(boxGeo(1.18, 0.035, 0.06), M.tubeLight, x, 2.925, -3.2); }
  lamp(12.75, 2.6, -3.2, 0xd4ecff, 5, 8, 0.0);
  // posters, meter box, notices
  put(planeGeo(0.6, 0.85), std({ map: T.posterTexture(360, 512, '#d9c79a', '#8a1d1d', '戏', ['OPERA NIGHT', 'Sat · Courtyard', '8 PM']), roughness: 0.8 }), 11.2, 1.75, -4.38);
  put(planeGeo(0.55, 0.78), std({ map: T.posterTexture(360, 512, '#284a5c', '#e8d9b0', '租', ['ROOM FOR RENT', 'ask at tea counter']), roughness: 0.8 }), 12.0, 1.62, -4.38, 0, 0, 0.04);
  put(boxGeo(0.5, 0.65, 0.18), std({ color: 0x7e8a86, metalness: 0.3, roughness: 0.6 }), 14.0, 1.8, -2.1);
  put(tube([new THREE.Vector3(14.0, 2.12, -2.1), new THREE.Vector3(14.0, 2.6, -2.15), new THREE.Vector3(14.2, 2.78, -2.22)], 0.02, 8, 4), M.cable);
  put(planeGeo(0.36, 0.5), std({ map: T.posterTexture(256, 360, '#efe6d0', '#1f3a66', '茶', ['TEA', 'this way →']), roughness: 0.8 }), 10.4, 1.6, -2.02, 0, PI);
  // drain channel along the wall
  put(boxGeo(L, 0.02, 0.18), M.darkMetal, cx, 0.006, -2.15);
  colliders.push([9, -5, 16.5, -4.4], [9, -2.0, 16.5, -1.4]);
  // lantern pair on brackets flanking the passage mouth (courtyard side)
  for (const z of [-4.75, -1.65]) {
    put(boxGeo(0.5, 0.04, 0.04), M.darkMetal, 8.75, 2.75, z);
    lantern(8.55, 2.38, z, 0.75, '#c8261c', '茶', 0.2);
  }
  lamp(8.3, 2.4, -3.2, 0xffa860, 3.2, 6.5, 0.04);
  dripsAlong(9.05, 9.05, 2.95, -3.2, 1);
  dripSpawns.push(new THREE.Vector3(9.1, 2.98, -2.6), new THREE.Vector3(9.1, 2.98, -3.9));
}

curZone = 'tea';
// ---------------------------------------------------------------- TEA COUNTER courtyard  x [16.5, 22.5], z [-7.5, 1.0]
{
  const fT = facadeMat(8.5, 6.5 - BAND, { base: [140, 122, 100], lit: 0.4, cols: 3 });
  const fT2 = facadeMat(6, 6.5 - BAND, { base: [128, 120, 110], lit: 0.4, cols: 2 });
  wall(19.5, -7.5, 0, 6, 6.5, fT2, [], 2);
  wall(19.5, 1.0, PI, 6, 6.5, fT2, [], 2);
  wall(22.5, -3.25, -PI / 2, 8.5, 6.5, fT, [], 3);
  wall(16.5, -3.25, PI / 2, 8.5, 6.5, fT, [[-0.05, 2.4, 3.0]], 3);
  colliders.push([16.5, -8.2, 23, -7.5], [16.5, 1.0, 23, 1.6], [22.5, -8, 23.2, 1.5], [16, -8, 16.5, -4.4], [16, -2.0, 16.5, 1.5]);
  // eave roof over the counter (corrugated metal on timber)
  const corr = std({ color: 0x4a3a30, metalness: 0.6, roughness: 0.45 });
  for (let k = 0; k < 28; k++) put(cyl(0.035, 0.035, 3.1, 6, true), corr, 21.0, 2.72, -6.2 + k * 0.23, 0, 0, PI / 2 + 0.12, 1, 1, 0.3);
  put(boxGeo(3.2, 0.03, 6.5), corr, 21.0, 2.7, -3.0, 0, 0, 0.12);
  put(boxGeo(0.14, 0.14, 6.6), M.darkWood, 19.5, 2.48, -3.0);
  for (const z of [-6.1, 0.1]) { put(boxGeo(0.12, 2.48, 0.12), M.darkWood, 19.5, 1.24, z); colliders.push([19.42, z - 0.08, 19.58, z + 0.08]); }
  // counter
  put(boxGeo(0.62, 1.0, 4.0), M.wood, 20.75, 0.5, -3.2);
  put(boxGeo(0.8, 0.06, 4.15), M.darkWood, 20.7, 1.03, -3.2);
  put(planeGeo(1.6, 0.5), signMat({ bg: '#2a3b2c', fg: '#e9dcb0', title: '一 期 一 会', sub: 'TEA · 6 PM – LATE', titleFont: 'bold 110px "Microsoft YaHei", serif', border: '#b9a26a' }, 1024, 320), 20.43, 0.55, -3.2, 0, -PI / 2);
  colliders.push([20.3, -5.3, 21.2, -1.1]);
  // back wall shelving with tins & jars
  const tinCols = [0x8a1f1f, 0x1f4e3a, 0xc29a3a, 0x24477e, 0x2b2b2b, 0x6b3522];
  for (const y of [1.25, 1.7, 2.15]) {
    put(boxGeo(0.32, 0.04, 4.0), M.darkWood, 22.32, y, -3.2);
    for (let k = 0; k < 12; k++) {
      const z = -5.0 + k * 0.32 + (T.rand() - 0.5) * 0.06;
      if (T.rand() < 0.18) continue;
      if (T.rand() < 0.35) put(cyl(0.07, 0.07, 0.22, 12), M.glass, 22.3, y + 0.13, z);
      else put(cyl(0.06, 0.06, 0.16 + T.rand() * 0.08, 12), std({ color: tinCols[k % 6], metalness: 0.6, roughness: 0.35 }), 22.3, y + 0.11, z);
    }
  }
  colliders.push([21.9, -5.3, 22.5, -1.1]);
  // back counter: kettle on burner, hot water urn
  put(boxGeo(0.5, 0.85, 3.6), M.darkWood, 21.85, 0.43, -3.2);
  put(cyl(0.11, 0.12, 0.06, 14), M.darkMetal, 21.85, 0.89, -4.3);
  put(lathe([[0, 0], [0.13, 0.0], [0.15, 0.06], [0.14, 0.15], [0.08, 0.2], [0.04, 0.22], [0, 0.22]], 18), M.copper, 21.85, 0.92, -4.3);
  put(tube([new THREE.Vector3(21.85, 1.06, -4.18), new THREE.Vector3(21.85, 1.08, -4.07), new THREE.Vector3(21.85, 1.15, -4.02)], 0.012, 6, 4), M.copper);
  put(new THREE.TorusGeometry(0.08, 0.008, 4, 12, PI), M.darkWood, 21.85, 1.14, -4.3, 0, PI / 2);
  put(cyl(0.16, 0.16, 0.5, 18), M.steel, 21.85, 1.11, -2.3);
  put(cyl(0.17, 0.17, 0.04, 18), M.darkMetal, 21.85, 1.38, -2.3);
  put(boxGeo(0.06, 0.04, 0.05), M.black, 21.68, 0.95, -2.3);
  // counter items: teapots, cups, tea tray, menu
  const teapot = lathe([[0, 0], [0.06, 0], [0.085, 0.03], [0.09, 0.06], [0.075, 0.1], [0.04, 0.115], [0.03, 0.125], [0, 0.13]], 18);
  for (const [z, mat] of [[-4.4, M.clay], [-2.6, std({ color: 0x3e5a4c, roughness: 0.18 })]]) {
    put(boxGeo(0.4, 0.025, 0.3), M.darkWood, 20.7, 1.07, z);
    put(teapot, mat, 20.7, 1.085, z);
    put(cyl(0.008, 0.012, 0.08, 6), mat, 20.62, 1.15, z, 0, 0, 0.9);
    put(new THREE.TorusGeometry(0.035, 0.008, 4, 10), mat, 20.79, 1.15, z);
    for (let k = 0; k < 3; k++) put(cyl(0.025, 0.02, 0.035, 12), M.ceramic, 20.6 + k * 0.08, 1.1, z + 0.11);
  }
  put(cyl(0.05, 0.05, 0.12, 12), std({ color: 0x8a1f1f, metalness: 0.6, roughness: 0.35 }), 20.75, 1.12, -3.5);
  put(boxGeo(0.02, 0.28, 0.2), signMat({ bg: '#f3ead4', fg: '#2a3b2c', title: '烏龍 · 普洱', sub: 'OOLONG · PU-ERH · JASMINE', titleFont: 'bold 90px "Microsoft YaHei", serif', subFont: '600 30px Georgia, serif' }, 512, 300), 20.82, 1.2, -3.5, 0, 0, 0);
  // noren curtain on the eave front
  const noren = std({ map: T.paintedSign(1024, 512, { bg: '#1b2a52', fg: '#ece4d0', title: '茶', titleFont: 'bold 300px "Microsoft YaHei", serif', border: '#1b2a52' }), roughness: 0.9, side: THREE.DoubleSide });
  for (let k = 0; k < 4; k++) {
    const g = planeGeo(0.82, 0.62); const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setX(i, (uv.getX(i) + k) / 4);
    put(g, noren, 19.4, 2.12, -4.45 + k * 0.85 + 0.42, 0, -PI / 2, 0);
  }
  // pendant lamps
  for (const z of [-4.2, -2.2]) {
    put(cyl(0.004, 0.004, 0.5, 4), M.cable, 20.7, 2.42, z);
    put(new THREE.ConeGeometry(0.16, 0.14, 16, 1, true), std({ color: 0x2a2420, metalness: 0.6, roughness: 0.4, side: THREE.DoubleSide }), 20.7, 2.12, z);
    put(sph(0.045, 10, 8), M.bulb, 20.7, 2.05, z);
  }
  lamp(20.6, 2.0, -3.2, 0xffb468, 6.5, 8, 0.02);
  // caged wall sconce beside the passage exit (tea side) so the return view starts lit
  put(boxGeo(0.12, 0.2, 0.08), M.darkMetal, 16.54, 2.45, -1.45);
  put(cyl(0.008, 0.008, 0.3, 4), M.darkMetal, 16.68, 2.45, -1.45, 0, 0, PI / 2);
  put(sph(0.07, 10, 8), M.bulbSoft, 16.84, 2.4, -1.45);
  put(new THREE.ConeGeometry(0.12, 0.1, 12, 1, true), std({ color: 0x1e1a16, metalness: 0.6, roughness: 0.4, side: THREE.DoubleSide }), 16.84, 2.5, -1.45);
  lamp(17.0, 2.35, -1.45, 0xffa75c, 3.0, 7, 0.03);
  lantern(17.2, 2.7, -6.9, 0.8, '#c8261c', '茶', 0.3);
  // stools, table for two, plant, crates
  for (const z of [-4.3, -3.0, -1.7]) {
    put(cyl(0.17, 0.17, 0.05, 14), M.darkWood, 19.85, 0.68, z);
    for (let k = 0; k < 3; k++) { const a = k * 2.1; put(cyl(0.015, 0.02, 0.68, 5), M.darkMetal, 19.85 + Math.cos(a) * 0.1, 0.34, z + Math.sin(a) * 0.1); }
    colliders.push([19.7, z - 0.15, 20.0, z + 0.15]);
  }
  put(cyl(0.35, 0.35, 0.03, 18), M.darkWood, 17.9, 0.7, -0.4);
  put(cyl(0.03, 0.03, 0.7, 8), M.darkMetal, 17.9, 0.35, -0.4);
  stool(17.35, -0.5, M.darkWood, 0.42); stool(18.4, -0.1, M.darkWood, 0.42);
  put(teapot, M.clay, 17.9, 0.715, -0.4, 0, 0, 0, 0.8, 0.8, 0.8);
  put(cyl(0.025, 0.02, 0.035, 12), M.ceramic, 18.05, 0.735, -0.3);
  colliders.push([17.5, -0.8, 18.3, 0.0]);
  planter(22.0, 0.4, 1.1); planter(17.0, -7.0, 0.9);
  for (let k = 0; k < 2; k++) put(crateGeo, M.crate, 22.1, k * 0.26, -6.8, 0, PI / 2 + k * 0.15);
  colliders.push([21.8, -7.2, 22.5, -6.4]);
  steam(new THREE.Vector3(21.85, 1.16, -4.0), { count: 18, size: 0.2, alpha: 0.16, life: 2.5 });
  steam(new THREE.Vector3(20.7, 1.22, -4.4), { count: 10, size: 0.12, alpha: 0.12, life: 2.0 });
  dripsAlong(19.4, 19.4, 2.5, -5.5, 1); dripSpawns.push(new THREE.Vector3(19.4, 2.5, -1.0), new THREE.Vector3(19.4, 2.5, -3.6), new THREE.Vector3(19.4, 2.5, 0.0));
  contactShadow(21.2, -3.2, 2.4, 5.0);
}

// wet fallen leaves gathered near planters, walls and the drain
{
  const leafGeo = new THREE.PlaneGeometry(0.07, 0.045); leafGeo.rotateX(-PI / 2);
  const leafMat = lam({ color: 0xffffff, side: THREE.DoubleSide });
  const spots = [[-8.2, -6.9, 0.9], [8.0, 6.9, 1.1], [-8.1, 6.9, 0.8], [-1.2, -7.1, 0.7], [0.1, 0.4, 0.6], [8.5, -5.5, 0.6], [21.6, 0.1, 0.8], [17.3, -6.6, 0.7], [-8.6, 1.0, 0.8], [10.5, -2.3, 0.5]];
  const cols = [0x6b4a1e, 0x8a5a1c, 0x4a5a22, 0x5a3412, 0x9a7a2a];
  for (const [cx, cz, r] of spots) for (let k = 0; k < 9; k++) {
    const a = T.rand() * PI * 2, d = Math.sqrt(T.rand()) * r;
    _c.set(cols[k % cols.length]).multiplyScalar(0.55 + T.rand() * 0.3);
    inst('leaf', leafGeo, leafMat, cx + Math.cos(a) * d, 0.004 + k * 0.0004, cz + Math.sin(a) * d, (T.rand() - 0.5) * 0.15, T.rand() * PI * 2, 0, 0.8 + T.rand() * 0.6, 0.8 + T.rand() * 0.6, _c.clone());
  }
}

drips();
flushBatches();
flushInst();

// ---------------------------------------------------------------- ambient
scene.add(new THREE.HemisphereLight(0x2a3a52, 0x0c0907, 0.85));

// ---------------------------------------------------------------- environment (static cube capture of the market itself)
const pmrem = new THREE.PMREMGenerator(renderer);
{
  const cubeRT = new THREE.WebGLCubeRenderTarget(256, { type: THREE.HalfFloatType });
  const cubeCam = new THREE.CubeCamera(0.1, 80, cubeRT);
  cubeCam.position.set(0, 1.4, -0.5);
  scene.add(cubeCam);
  cubeCam.update(renderer, scene);
  const env = pmrem.fromCubemap(cubeRT.texture);
  scene.environment = env.texture;
  scene.environmentIntensity = 0.9;
  cubeRT.dispose();
}

// ---------------------------------------------------------------- planar reflection for the wet ground (quarter res, mipmapped for blur)
const REFL_SCALE = 0.5;
const reflRT = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter, magFilter: THREE.LinearFilter });
groundUniforms.uRefl.value = reflRT.texture;
const reflCam = new THREE.PerspectiveCamera();
const _ru = new THREE.Vector3(), _rp = new THREE.Vector3(), _rt = new THREE.Vector3(), _rd = new THREE.Vector3();
const biasM = new THREE.Matrix4().set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
function sizeRefl() { reflRT.setSize(Math.max(2, Math.floor(innerWidth * pixelRatio * REFL_SCALE)), Math.max(2, Math.floor(innerHeight * pixelRatio * REFL_SCALE))); }
sizeRefl();
let reflEnabled = true;
function renderReflection() {
  if (!reflEnabled) return;
  camera.updateMatrixWorld();
  _rp.setFromMatrixPosition(camera.matrixWorld);
  camera.getWorldDirection(_rd);
  _rt.copy(_rp).add(_rd);
  reflCam.position.set(_rp.x, -_rp.y, _rp.z);
  _ru.set(0, 1, 0).applyQuaternion(camera.quaternion); _ru.y = -_ru.y;
  reflCam.up.copy(_ru);
  reflCam.lookAt(_rt.x, -_rt.y, _rt.z);
  reflCam.fov = camera.fov; reflCam.aspect = camera.aspect; reflCam.near = camera.near; reflCam.far = camera.far;
  reflCam.updateProjectionMatrix(); reflCam.updateMatrixWorld();
  groundUniforms.uReflMatrix.value.copy(biasM).multiply(reflCam.projectionMatrix).multiply(reflCam.matrixWorldInverse);
  ground.visible = false;
  renderer.setRenderTarget(reflRT);
  renderer.render(scene, reflCam);
  renderer.setRenderTarget(null);
  ground.visible = true;
}

// ---------------------------------------------------------------- post-processing
// Depth pre-pass: lay down depth with a trivial shader first, so the 10-light PBR shading runs once per pixel
const prepassMat = new THREE.MeshBasicMaterial({ colorWrite: false, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 2 });
const prepassHide = [];
scene.traverse((o) => { if ((o.isMesh || o.isPoints) && (o.material.transparent || !o.material.depthWrite || o.isPoints)) prepassHide.push(o); });
class PrepassRenderPass extends RenderPass {
  render(renderer, writeBuffer, readBuffer) {
    const ac = renderer.autoClear;
    renderer.autoClear = false;
    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
    renderer.setClearColor(0x000000, 1);
    renderer.clear();
    for (const o of prepassHide) o.visible = false;
    this.scene.overrideMaterial = prepassMat;
    renderer.render(this.scene, this.camera);
    this.scene.overrideMaterial = null;
    for (const o of prepassHide) o.visible = true;
    renderer.render(this.scene, this.camera);
    renderer.autoClear = ac;
  }
}
let composer, bloom;
function buildComposer() {
  const rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 2 });
  composer = new EffectComposer(renderer, rt);
  composer.setPixelRatio(pixelRatio);
  composer.setSize(innerWidth, innerHeight);
  composer.addPass(new PrepassRenderPass(scene, camera));
  bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.6, 0.6, 0.92);
  // run the bloom mip chain at half the composer resolution: ~4x cheaper, visually identical glow
  const bloomSetSize = bloom.setSize.bind(bloom);
  bloom.setSize = (w, h) => bloomSetSize(Math.max(2, Math.round(w / 2)), Math.max(2, Math.round(h / 2)));
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
}
buildComposer();
function applyQuality() {
  pixelRatio = targetPR();
  renderer.setPixelRatio(pixelRatio);
  composer.setPixelRatio(pixelRatio);
  composer.setSize(innerWidth, innerHeight);
  bloom.enabled = highQuality;
  sizeRefl();
  updatePointScale();
}
function updatePointScale() { pointScale.value = innerHeight * pixelRatio / (2 * Math.tan(camera.fov * PI / 360)); }
updatePointScale();
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  applyQuality();
});

// ---------------------------------------------------------------- controls & movement
const controls = new PointerLockControls(camera, document.body);
controls.pointerSpeed = 0.75;
const START = { pos: new THREE.Vector3(0, 1.62, 10.6), yaw: 0, pitch: -0.04 };
const player = new THREE.Vector3(), vel = new THREE.Vector3();
let eye = 1.62;
function reset() {
  player.set(START.pos.x, 0, START.pos.z); vel.set(0, 0, 0);
  camera.rotation.set(START.pitch, START.yaw, 0, 'YXZ');
  eye = 1.62;
}
camera.rotation.order = 'YXZ';
reset();
const keys = {};
addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'KeyR') reset();
  if (e.code === 'KeyF') statsEl.style.display = statsEl.style.display === 'block' ? 'none' : 'block';
  if (e.code === 'KeyG') { highQuality = !highQuality; applyQuality(); }
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
});
addEventListener('keyup', (e) => { keys[e.code] = false; });
addEventListener('blur', () => { for (const k in keys) keys[k] = false; });
overlay.addEventListener('click', () => controls.lock());
controls.addEventListener('lock', () => overlay.classList.add('hidden'));
controls.addEventListener('unlock', () => { overlay.classList.remove('hidden'); for (const k in keys) keys[k] = false; });

const R = 0.28;
function collide(p) {
  for (let it = 0; it < 2; it++) for (const [x0, z0, x1, z1] of colliders) {
    const cx = Math.max(x0, Math.min(p.x, x1)), cz = Math.max(z0, Math.min(p.z, z1));
    const dx = p.x - cx, dz = p.z - cz, d2 = dx * dx + dz * dz;
    if (d2 < R * R) {
      if (d2 > 1e-8) { const d = Math.sqrt(d2), push = (R - d) / d; p.x += dx * push; p.z += dz * push; }
      else { // centre inside box: push out along the shallowest axis
        const l = p.x - x0 + R, r = x1 - p.x + R, b = p.z - z0 + R, t = z1 - p.z + R, m = Math.min(l, r, b, t);
        if (m === l) p.x = x0 - R; else if (m === r) p.x = x1 + R; else if (m === b) p.z = z0 - R; else p.z = z1 + R;
      }
    }
  }
}
const fwd = new THREE.Vector3(), right = new THREE.Vector3(), wish = new THREE.Vector3();
function move(dt) {
  const yaw = camera.rotation.y;
  fwd.set(-Math.sin(yaw), 0, -Math.cos(yaw)); right.set(Math.cos(yaw), 0, -Math.sin(yaw));
  wish.set(0, 0, 0);
  if (keys.KeyW || keys.ArrowUp) wish.add(fwd);
  if (keys.KeyS || keys.ArrowDown) wish.sub(fwd);
  if (keys.KeyD || keys.ArrowRight) wish.add(right);
  if (keys.KeyA || keys.ArrowLeft) wish.sub(right);
  const crouch = keys.KeyC;
  const speed = crouch ? 1.1 : (keys.ShiftLeft || keys.ShiftRight) ? 4.2 : 2.3;
  if (wish.lengthSq() > 0) wish.normalize().multiplyScalar(speed);
  const k = 1 - Math.exp(-(wish.lengthSq() > 0 ? 10 : 12) * dt);
  vel.lerp(wish, k);
  // sub-step to avoid tunnelling through thin colliders
  const steps = Math.max(1, Math.ceil(vel.length() * dt / 0.1));
  for (let s = 0; s < steps; s++) { player.x += vel.x * dt / steps; player.z += vel.z * dt / steps; collide(player); }
  eye += ((crouch ? 1.0 : 1.62) - eye) * (1 - Math.exp(-10 * dt));
  camera.position.set(player.x, eye, player.z);
}

// zone label
let zone = '', zoneT = 0;
function zoneOf(p) { return p.x > 16.4 ? 'Tea counter' : p.x > 9 ? 'Covered passage' : p.z > 8 ? 'Courtyard entrance' : 'Courtyard'; }

// ---------------------------------------------------------------- loop
const clock = new THREE.Clock();
const ft = new Float32Array(240); let fi = 0, statT = 0;
let elapsed = 0, adaptAcc = 0, adaptN = 0;
function frameLoop() {
  const rawDt = clock.getDelta();
  const dt = Math.min(rawDt, 0.05);
  elapsed += dt;
  ft[fi++ % ft.length] = rawDt * 1000;
  if (controls.isLocked) move(dt); else camera.position.set(player.x, eye, player.z);
  groundUniforms.uTime.value = elapsed;
  for (const l of lights) if (l.flicker) l.L.intensity = l.base * (1 - l.flicker * (0.5 + 0.5 * Math.sin(elapsed * 7.3 + l.phase) * Math.sin(elapsed * 3.1 + l.phase * 1.7)));
  neonPink.emissiveIntensity = 3.2 * ((Math.sin(elapsed * 0.9) > 0.995 && Math.sin(elapsed * 41) > 0) ? 0.35 : 1);
  for (const p of particleSystems) p.update(dt, elapsed);
  const z = zoneOf(player);
  if (z !== zone) { zone = z; zoneEl.textContent = z; zoneEl.style.color = 'rgba(255,225,190,0.85)'; zoneT = 2.2; }
  if (zoneT > 0) { zoneT -= dt; if (zoneT <= 0) zoneEl.style.color = 'rgba(255,225,190,0)'; }
  renderReflection();
  composer.render();
  // adaptive resolution: if sustained frame time is poor while exploring, step render scale down (never up, to avoid oscillation)
  if (controls.isLocked && document.visibilityState === 'visible') {
    adaptAcc += rawDt; adaptN++;
    if (adaptAcc > 1.5) {
      const avgMs = adaptAcc / adaptN * 1000;
      if (avgMs > 18.5 && dynScale > 0.62) { dynScale *= 0.88; applyQuality(); }
      adaptAcc = 0; adaptN = 0;
    }
  }
  statT += rawDt;
  if (statsEl.style.display === 'block' && statT > 0.25) {
    statT = 0;
    const n = Math.min(fi, ft.length), arr = Array.from(ft.slice(0, n)).sort((a, b) => a - b);
    const avg = arr.reduce((s, v) => s + v, 0) / n, p99 = arr[Math.floor(n * 0.99) - 1] || arr[n - 1], mx = arr[n - 1];
    const info = renderer.info.render;
    statsEl.textContent = `${(1000 / avg).toFixed(0)} fps  avg ${avg.toFixed(2)} ms\n99% ${p99.toFixed(2)} ms  max ${mx.toFixed(1)} ms\ncalls ${info.calls}  tris ${(info.triangles / 1000).toFixed(0)}k\nres ${pixelRatio.toFixed(2)}x (${renderer.domElement.width}x${renderer.domElement.height})  ${highQuality ? 'HIGH' : 'PERF'}\npos ${player.x.toFixed(1)}, ${player.z.toFixed(1)}`;
  }
  requestAnimationFrame(frameLoop);
}

// warm up shaders before showing the start prompt to avoid first-turn hitches
(async () => {
  try { if (renderer.compileAsync) await renderer.compileAsync(scene, camera); } catch (e) { console.warn(e); }
  camera.position.set(player.x, eye, player.z);
  renderReflection();
  composer.render();
  $('loading').style.display = 'none';
  $('start').style.display = 'block';
  clock.getDelta();
  requestAnimationFrame(frameLoop);
})();
// benchmark hook: renders n frames synchronously (GPU-flushed) from the current view
function bench(n = 30) {
  const gl = renderer.getContext(), px = new Uint8Array(4);
  const t0 = performance.now();
  for (let i = 0; i < n; i++) { camera.position.set(player.x, eye, player.z); renderReflection(); composer.render(); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); }
  return +((performance.now() - t0) / n).toFixed(2);
}
window.__market = { move, controls, collide, renderer, scene, camera, colliders, player, reset, bench, get composer() { return composer; }, groundUniforms, lights, setRefl(v) { reflEnabled = v; } };
