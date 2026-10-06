import * as THREE from 'three';
import { makeNoise2, fbm, smooth, mulberry } from './noise.js';

export const SUN_DIR = new THREE.Vector3(-0.72, -0.07, -0.69).normalize();   // below horizon, behind-left of shelter
export const MOON_DIR = new THREE.Vector3(0.55, 0.42, 0.72).normalize();
export const WIND = new THREE.Vector3(-0.97, 0, -0.24).normalize();          // direction the wind blows toward

const nA = makeNoise2(101), nB = makeNoise2(202), nC = makeNoise2(303);

// distance from point to axis-aligned rect
function rectDist(x, z, x0, x1, z0, z1) {
  const dx = Math.max(x0 - x, 0, x - x1), dz = Math.max(z0 - z, 0, z - z1);
  return Math.hypot(dx, dz);
}

// ---------- terrain height (also used for walking) ----------
export function terrainH(x, z) {
  const u = x * WIND.x + z * WIND.z, v = -x * WIND.z + z * WIND.x;
  const dB = rectDist(x, z, -3.5, 3.5, -7.4, -2.1);
  const dE = rectDist(x, z, -2.2, 2.2, -2.1, 9);
  const calm = Math.min(smooth(0.2, 5, dB), smooth(0.0, 3.5, dE));    // flattened around building/entrance
  let h = fbm(nA, x * 0.018, z * 0.018, 3) * 1.6 * smooth(6, 30, dB);
  // sastrugi: elongated along wind, sharp crests
  const s = fbm(nB, u * 0.11, v * 0.75, 3);
  const ridge = Math.pow(1 - Math.abs(s), 4);
  const s2 = fbm(nC, u * 0.35, v * 2.2, 2);
  const ridge2 = Math.pow(1 - Math.abs(s2), 3);
  h += (ridge * 0.32 + ridge2 * 0.07) * calm;
  h += fbm(nC, x * 0.6, z * 0.6, 2) * 0.03;
  // lee drift tail behind the shelter (wind blows toward -x)
  const dl = -3.45 - x;
  if (dl > 0) {
    const dz = z + 4.7;
    const w = 2.8 + dl * 0.18;
    h += 1.05 * smooth(0.25, 2.6, dl) * Math.exp(-dl / 10) * Math.exp(-(dz * dz) / (w * w));
  }
  // windward scour moat and upwind drift
  const dw = x - 3.45;
  if (dw > 0) {
    const zf = smooth(-9, -6.5, z) * (1 - smooth(-2.5, 0, z));
    h += (-0.22 * Math.exp(-dw / 0.7) + 0.38 * Math.exp(-((dw - 3.2) ** 2) / 2.5)) * zf;
  }
  // snow fence at x=9.0, z in [-4.5, 9]: drift accumulates on its lee
  const zf2 = smooth(-6, -4, z) * (1 - smooth(8.5, 10.5, z));
  const df = 9.0 - x;
  if (df > -1.5) {
    if (df > 0) h += 0.8 * zf2 * smooth(0.0, 1.6, df) * Math.exp(-Math.max(0, df - 2.2) / 2.0);
    else h += 0.25 * zf2 * Math.exp(-((df + 0.6) ** 2) / 0.2);
  }
  // snow banked against the shelter walls (not windward)
  if (dB < 2.5 && x < 3.4) h += 0.16 * Math.exp(-dB / 0.5) * (1 - smooth(-2.2, -1.6, z) * smooth(-1.6, 1.6, x) * 0.0);
  // blue ice patch depression (flat)
  const di = Math.hypot(x - 6.2, z - 4.5);
  if (di < 3.2) h = h * smooth(1.4, 3.2, di) + 0.02 * (1 - smooth(1.4, 3.2, di));
  return h;
}

// ---------- terrain mesh: nonuniform grid, dense near the shelter ----------
export function buildTerrain(snowNormal) {
  const S = 300;                 // segments per side
  const map = t => (t * 22 + t * t * t * 290);   // t in [-1,1] -> metres
  const pos = [], uv = [], col = [], idx = [];
  for (let j = 0; j <= S; j++) for (let i = 0; i <= S; i++) {
    const x = map(i / S * 2 - 1), z = map(j / S * 2 - 1) - 2;
    const y = terrainH(x, z);
    pos.push(x, y, z); uv.push(x / 4, z / 4);
  }
  for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
    const a = j * (S + 1) + i, b = a + 1, c = a + S + 1, d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  const nrm = g.attributes.normal;
  for (let k = 0; k < pos.length / 3; k++) {
    const x = pos[k * 3], y = pos[k * 3 + 1], z = pos[k * 3 + 2];
    const nx = nrm.getX(k), ny = nrm.getY(k), nz = nrm.getZ(k);
    const lee = -(nx * WIND.x + nz * WIND.z);      // faces upwind -> scoured, slightly darker/bluer
    const dE = rectDist(x, z, -1.2, 1.2, 2.2, 9);
    const packed = 1 - smooth(0.0, 1.4, dE);
    const di = Math.hypot(x - 6.2, z - 4.5);
    let r = 0.93, gg = 0.96, b = 1.0;
    const blue = Math.max(0, lee) * 0.25 + (1 - ny) * 0.6;
    r -= blue * 0.25; gg -= blue * 0.12;
    const n = fbm(nA, x * 0.9, z * 0.9, 2) * 0.05;
    r += n; gg += n; b += n;
    r -= packed * 0.1; gg -= packed * 0.08; b -= packed * 0.05;
    if (di < 3.4) { const k2 = 1 - smooth(1.6, 3.4, di); r -= k2 * 0.08; gg -= k2 * 0.03; }
    col.push(r, gg, b);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.82, metalness: 0, normalMap: snowNormal, normalScale: new THREE.Vector2(0.7, 0.7) });
  addSparkle(mat);
  const m = new THREE.Mesh(g, mat);
  m.receiveShadow = true; m.castShadow = false;
  return m;
}

function addSparkle(mat) {
  mat.onBeforeCompile = sh => {
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWP;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWP = (modelMatrix * vec4(transformed,1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
      varying vec3 vWP;
      float hsh(vec3 p){ p = fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
      {
        vec3 cell = floor(vWP * 70.0);
        float r = hsh(cell + floor(cameraPosition * 4.0) * 0.137);
        float d = length(vWP - cameraPosition);
        float sp = step(0.9988, r) * (1.0 - smoothstep(2.0, 14.0, d));
        totalEmissiveRadiance += vec3(0.55, 0.65, 0.9) * sp * 0.9;
      }`);
  };
}

// ---------- sky ----------
const skyVert = `varying vec3 vDir; void main(){ vDir = (modelMatrix*vec4(position,0.0)).xyz; vec4 p = projectionMatrix*viewMatrix*vec4(position + cameraPosition,1.0); gl_Position = p.xyww; }`;
const skyFrag = `
varying vec3 vDir; uniform vec3 uSun; uniform vec3 uMoon; uniform float uMoonDisk;
void main(){
  vec3 d = normalize(vDir);
  float h = d.y;
  vec2 hz = normalize(d.xz + 1e-5); vec2 sz = normalize(uSun.xz);
  float toward = dot(hz, sz) * 0.5 + 0.5;
  float away = 1.0 - toward;
  vec3 zenith = vec3(0.012, 0.035, 0.13);
  vec3 mid = vec3(0.045, 0.12, 0.34);
  vec3 horizAway = vec3(0.16, 0.24, 0.45);
  vec3 horizSun = vec3(0.95, 0.55, 0.32);
  float t = pow(clamp(h, 0.0, 1.0), 0.5);
  vec3 horiz = mix(horizAway, horizSun, pow(toward, 4.0));
  vec3 band = mix(horiz, vec3(0.55,0.62,0.78)*mix(0.6,1.0,toward), smoothstep(0.0,0.12,t) * 0.6);
  vec3 col = mix(horiz, band, smoothstep(0.0, 0.15, t));
  col = mix(col, mid, smoothstep(0.12, 0.45, t));
  col = mix(col, zenith, smoothstep(0.45, 1.0, t));
  // belt of Venus / earth shadow on antisolar side
  col += vec3(0.22, 0.10, 0.16) * pow(away, 3.0) * exp(-pow((h - 0.09) / 0.05, 2.0));
  col *= 1.0 - 0.35 * pow(away, 2.0) * exp(-pow(h / 0.045, 2.0));
  float sd = max(dot(d, uSun), 0.0);
  col += vec3(1.0, 0.5, 0.25) * pow(sd, 10.0) * 0.5;
  if (h < 0.0) col = mix(horiz * 0.9, vec3(0.16, 0.2, 0.3), clamp(-h * 5.0, 0.0, 1.0));
  float md = dot(d, uMoon);
  col += uMoonDisk * smoothstep(0.99975, 0.9999, md) * vec3(1.4, 1.42, 1.35);
  col += pow(max(md, 0.0), 300.0) * vec3(0.12, 0.15, 0.22);
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export function makeSky(moonDisk = 1) {
  const mat = new THREE.ShaderMaterial({
    vertexShader: skyVert, fragmentShader: skyFrag, side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { uSun: { value: SUN_DIR }, uMoon: { value: MOON_DIR }, uMoonDisk: { value: moonDisk } },
  });
  const m = new THREE.Mesh(new THREE.SphereGeometry(10, 48, 24), mat);
  m.frustumCulled = false; m.renderOrder = -10;
  return m;
}

export function makeStars() {
  const rnd = mulberry(77); const p = [], c = [];
  for (let i = 0; i < 1600; i++) {
    const y = 0.25 + rnd() * 0.75; const a = rnd() * Math.PI * 2; const r = Math.sqrt(1 - y * y);
    const v = new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    if (v.dot(SUN_DIR) > 0.3) continue;
    p.push(v.x * 900, v.y * 900, v.z * 900);
    const b = (0.25 + rnd() * rnd() * 1.2) * (0.3 + 0.7 * Math.min(1, (y - 0.25) * 2.5));
    c.push(b * 0.85, b * 0.9, b);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(c, 3));
  const m = new THREE.Points(g, new THREE.PointsMaterial({ size: 1.6, sizeAttenuation: false, vertexColors: true, fog: false, depthWrite: false, transparent: true }));
  m.onBeforeRender = (r, s, cam) => m.position.copy(cam.position);
  m.renderOrder = -9; m.frustumCulled = false;
  return m;
}

// ---------- distant mountains / ice ridges ----------
export function buildMountains() {
  const A = 360, R = 34; const n1 = makeNoise2(555), n2 = makeNoise2(666);
  const pos = [], col = [], idx = [];
  const sunAz = Math.atan2(SUN_DIR.z, SUN_DIR.x);
  for (let j = 0; j <= R; j++) for (let i = 0; i <= A; i++) {
    const a = i / A * Math.PI * 2; const t = j / R;
    const rad = 240 + t * 900;
    // massif envelope: lower toward the sun glow so horizon band stays open
    let da = Math.abs(Math.atan2(Math.sin(a - sunAz), Math.cos(a - sunAz)));
    const env = 0.25 + 0.75 * smooth(0.35, 1.4, da);
    const ca = Math.cos(a), sa = Math.sin(a);
    const big = Math.max(0, fbm(n1, ca * 2.2 + 10, sa * 2.2 + 10, 3) + 0.35);
    const ridged = Math.pow(1 - Math.abs(fbm(n2, ca * 6 + t * 3, sa * 6 + t * 2, 4)), 2.2);
    let h = (big * 260 + ridged * 120 * big) * env;
    h *= smooth(0.08, 0.55, t) * (1 - smooth(0.85, 1.0, t) * 0.6);
    h += -1 + t * 4;
    pos.push(ca * rad, h, sa * rad - 2);
  }
  for (let j = 0; j < R; j++) for (let i = 0; i < A; i++) {
    const a = j * (A + 1) + i, b = a + 1, c = a + A + 1, d = c + 1;
    idx.push(a, b, c, b, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx); g.computeVertexNormals();
  const nr = g.attributes.normal;
  for (let k = 0; k < nr.count; k++) {
    const ny = nr.getY(k); const y = pos[k * 3 + 1];
    const rock = smooth(0.78, 0.55, ny) * smooth(15, 50, y);
    const nn = fbm(n1, pos[k * 3] * 0.02, pos[k * 3 + 2] * 0.02, 2) * 0.08;
    col.push(0.86 - rock * 0.68 + nn, 0.9 - rock * 0.68 + nn, 1.0 - rock * 0.66 + nn);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, flatShading: false }));
  m.matrixAutoUpdate = false;
  return m;
}
