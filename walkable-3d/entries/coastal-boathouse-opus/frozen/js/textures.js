// Procedural texture generation (albedo + normal maps) for the boathouse scene.
import * as THREE from 'three';

export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Tileable value noise: table of 256x256 random values; period P must divide into table (P <= 256).
const TS = 256;
const table = new Float32Array(TS * TS);
{ const r = rng(1234); for (let i = 0; i < table.length; i++) table[i] = r(); }
function vnoise(x, y, P, off = 0) {
  const xi = Math.floor(x), yi = Math.floor(y);
  let fx = x - xi, fy = y - yi;
  fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
  const x0 = ((xi % P) + P) % P, y0 = ((yi % P) + P) % P;
  const x1 = (x0 + 1) % P, y1 = (y0 + 1) % P;
  const o = off & 127;
  const a = table[((y0 + o) & 255) * TS + ((x0 + o * 3) & 255)], b = table[((y0 + o) & 255) * TS + ((x1 + o * 3) & 255)];
  const c = table[((y1 + o) & 255) * TS + ((x0 + o * 3) & 255)], d = table[((y1 + o) & 255) * TS + ((x1 + o * 3) & 255)];
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}
// fbm over unit tile coords u,v in [0,1), base frequency fu x fv cells (integers => tileable)
export function fbm(u, v, fu, fv, oct = 4, off = 0) {
  let sum = 0, amp = 1, norm = 0, ku = fu, kv = fv;
  for (let i = 0; i < oct; i++) {
    // anisotropic: use separate periods by scaling coordinates; period = max cells
    const P = Math.max(ku, kv);
    sum += amp * vnoise(u * ku * (P / ku), v * kv * (P / kv) * (1), P, off + i * 17) ;
    norm += amp; amp *= 0.5; ku *= 2; kv *= 2;
  }
  return sum / norm;
}
// Simple tileable anisotropic noise: fu cells along u, fv cells along v
function anoise(u, v, fu, fv, off = 0) {
  // sample using rectangular period by mapping u to [0,fu) and v to [0,fv)
  const x = u * fu, y = v * fv;
  const xi = Math.floor(x), yi = Math.floor(y);
  let fx = x - xi, fy = y - yi;
  fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
  const x0 = ((xi % fu) + fu) % fu, y0 = ((yi % fv) + fv) % fv;
  const x1 = (x0 + 1) % fu, y1 = (y0 + 1) % fv;
  const o = off & 127;
  const T = (yy, xx) => table[((yy + o * 5) & 255) * TS + ((xx + o * 3) & 255)];
  const a = T(y0, x0), b = T(y0, x1), c = T(y1, x0), d = T(y1, x1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}
function afbm(u, v, fu, fv, oct, off = 0) {
  let s = 0, a = 1, n = 0;
  for (let i = 0; i < oct; i++) { s += a * anoise(u, v, fu, fv, off + i * 13); n += a; a *= 0.5; fu *= 2; fv *= 2; }
  return s / n;
}

const clamp01 = (x) => x < 0 ? 0 : x > 1 ? 1 : x;
const sstep = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const mix = (a, b, t) => a + (b - a) * t;

function generate(N, fn) {
  const col = new Uint8Array(N * N * 4);
  const h = new Float32Array(N * N);
  const o = [0, 0, 0, 0, 1];
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      o[4] = 1;
      fn(i / N, j / N, o);
      const k = j * N + i;
      col[k * 4] = clamp01(o[0]) * 255; col[k * 4 + 1] = clamp01(o[1]) * 255; col[k * 4 + 2] = clamp01(o[2]) * 255; col[k * 4 + 3] = clamp01(o[4]) * 255;
      h[k] = o[3];
    }
  }
  return { col, h, N };
}

let maxAniso = 4;
export function setAniso(a) { maxAniso = a; }

function dataTex(arr, N, srgb, repeat = true) {
  const t = new THREE.DataTexture(arr, N, N, THREE.RGBAFormat, THREE.UnsignedByteType);
  t.wrapS = t.wrapT = repeat ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  t.magFilter = THREE.LinearFilter;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.generateMipmaps = true;
  t.anisotropy = maxAniso;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}
function normalFromHeight(h, N, strength) {
  const out = new Uint8Array(N * N * 4);
  for (let j = 0; j < N; j++) {
    const jm = ((j - 1 + N) % N) * N, jp = ((j + 1) % N) * N, jc = j * N;
    for (let i = 0; i < N; i++) {
      const im = (i - 1 + N) % N, ip = (i + 1) % N;
      const dx = (h[jc + ip] - h[jc + im]) * strength;
      const dy = (h[jp + i] - h[jm + i]) * strength;
      const l = 1 / Math.sqrt(dx * dx + dy * dy + 1);
      const k = (jc + i) * 4;
      out[k] = (-dx * l * 0.5 + 0.5) * 255;
      out[k + 1] = (-dy * l * 0.5 + 0.5) * 255;
      out[k + 2] = (l * 0.5 + 0.5) * 255;
      out[k + 3] = 255;
    }
  }
  return out;
}
function finish(g, strength, srgb = true) {
  return { map: dataTex(g.col, g.N, srgb), normalMap: dataTex(normalFromHeight(g.h, g.N, strength), g.N, false) };
}

// ---------- Wood (grain along u). Tile = 1 m.
export function woodTexture(seed, pal) {
  const r = rng(seed);
  const knots = [];
  for (let i = 0; i < 4; i++) knots.push([r(), r(), 0.008 + r() * 0.012]);
  return finish(generate(512, (u, v, o) => {
    let warp = afbm(u, v, 3, 12, 3, seed) - 0.5;
    let kd = 0;
    for (const k of knots) {
      let dx = Math.abs(u - k[0]); dx = Math.min(dx, 1 - dx);
      let dy = Math.abs(v - k[1]); dy = Math.min(dy, 1 - dy);
      const d = Math.sqrt((dx * 0.25) ** 2 + dy * dy);
      kd = Math.max(kd, Math.exp(-d / k[2]));
      warp += Math.exp(-d / (k[2] * 3)) * 0.6 * Math.sign(v - k[1] + 1e-4);
    }
    const g = Math.sin((v * 160 + warp * 7) * Math.PI);
    const grain = Math.pow(0.5 + 0.5 * g, 3);
    const streak = afbm(u, v, 8, 128, 3, seed + 3);
    const low = afbm(u, v, 2, 4, 3, seed + 7);
    const crackN = anoise(u, v, 6, 96, seed + 11);
    const crack = sstep(0.86, 0.93, crackN) * sstep(0.35, 0.6, anoise(u, v, 4, 8, seed + 5));
    let c0 = pal.base, c1 = pal.alt, cd = pal.dark;
    const t = sstep(0.3, 0.75, low);
    let R = mix(c0[0], c1[0], t), G = mix(c0[1], c1[1], t), B = mix(c0[2], c1[2], t);
    const darken = 1 - grain * pal.grain - (streak - 0.5) * 0.25;
    R *= darken; G *= darken; B *= darken;
    const kk = kd * 0.8;
    R = mix(R, cd[0], kk); G = mix(G, cd[1], kk); B = mix(B, cd[2], kk);
    R = mix(R, cd[0] * 0.6, crack); G = mix(G, cd[1] * 0.6, crack); B = mix(B, cd[2] * 0.6, crack);
    o[0] = R; o[1] = G; o[2] = B;
    o[3] = (1 - grain) * 0.5 + streak * 0.35 - crack * 1.2 - kd * 0.3;
  }), pal.normal ?? 3.5);
}

// ---------- Painted clapboard. Tile = 2 m, 10 boards high.
export function weatherboardTexture() {
  return finish(generate(512, (u, v, o) => {
    const b = Math.floor(v * 10), t = v * 10 - b;
    const boardShift = (b * 0.37) % 1;
    const grainW = Math.sin((v * 520 + (afbm(u + boardShift, v, 4, 20, 3, 9) - 0.5) * 6) * Math.PI) * 0.5 + 0.5;
    const peel = afbm(u + boardShift * 0.5, v, 5, 9, 4, 21) * 0.7 + anoise(u, v, 2, 2, 22) * 0.3;
    const fade = afbm(u, v, 3, 3, 3, 4);
    const lapShade = sstep(0.0, 0.08, t);
    const lapEdge = 1 - sstep(0.0, 0.025, t);
    const peelMask = sstep(0.69, 0.72, peel + (1 - t) * 0.04);
    // paint: faded oxblood/red ochre, sun-bleached in patches
    let R = mix(0.40, 0.50, fade), G = mix(0.19, 0.25, fade), B = mix(0.15, 0.19, fade);
    // grime streaks running down from lap
    const streak = anoise(u, v, 64, 6, 5);
    const grime = sstep(0.55, 0.9, streak) * (1 - t) * 0.25;
    R *= 1 - grime; G *= 1 - grime; B *= 1 - grime;
    // exposed weathered grey wood under peeled paint
    const wg = 0.40 + grainW * 0.06;
    R = mix(R, wg, peelMask); G = mix(G, wg * 0.98, peelMask); B = mix(B, wg * 0.92, peelMask);
    const sh = 0.55 + 0.45 * lapShade;
    o[0] = R * sh; o[1] = G * sh; o[2] = B * sh;
    o[3] = (1 - t) * 1.0 + lapEdge * 0.4 + (1 - peelMask) * 0.06 + grainW * 0.02 * peelMask;
  }), 4.0);
}

// ---------- Coursed stone blocks / paving flags. Tile = 2 m.
function blocksTexture(seed, rows, minW, maxW, mortar, palette, rough) {
  const r = rng(seed);
  const rowData = [];
  for (let i = 0; i < rows; i++) {
    const edges = []; let x = r() * 0.3; const start = x;
    while (x < start + 1 - minW * 0.5) { edges.push(x); x += minW + r() * (maxW - minW); }
    const cols = edges.map(() => [r(), r(), r()]);
    rowData.push({ edges, start, cols });
  }
  return generate(512, (u, v, o) => {
    const rf = v * rows, ri = Math.floor(rf), tv = rf - ri;
    const row = rowData[ri];
    let uu = u; if (uu < row.start) uu += 1;
    let k = row.edges.length - 1;
    for (let e = 0; e < row.edges.length; e++) { if (uu < row.edges[e]) { k = e - 1; break; } }
    if (k < 0) k = row.edges.length - 1;
    const e0 = row.edges[k], e1 = k + 1 < row.edges.length ? row.edges[k + 1] : row.start + 1;
    const du = Math.min(uu - e0, e1 - uu) * 2, dv = Math.min(tv, 1 - tv) / rows * 2;
    const ed = Math.min(du, dv);
    const isM = 1 - sstep(mortar * 0.6, mortar, ed);
    const bevel = sstep(mortar, mortar * 3.5, ed);
    const c = row.cols[k];
    const pit = afbm(u, v, 16, 16, 4, seed + ri * 7 + k);
    const speck = anoise(u, v, 200, 200, seed + 3);
    const p = palette;
    let R = mix(p[0][0], p[1][0], c[0]), G = mix(p[0][1], p[1][1], c[0]), B = mix(p[0][2], p[1][2], c[0]);
    const lum = 0.85 + c[1] * 0.25 + (pit - 0.5) * 0.35 + (speck > 0.82 ? 0.15 : speck < 0.12 ? -0.18 : 0);
    R *= lum; G *= lum; B *= lum;
    const m = p[2];
    R = mix(R, m[0], isM); G = mix(G, m[1], isM); B = mix(B, m[2], isM);
    o[0] = R; o[1] = G; o[2] = B;
    o[3] = bevel * (0.75 + pit * rough + c[2] * 0.15) - isM * 0.2;
  });
}
export function stoneTexture() {
  return finish(blocksTexture(77, 5, 0.22, 0.48, 0.012, [[0.50, 0.48, 0.44], [0.58, 0.53, 0.46], [0.42, 0.40, 0.36]], 0.6), 5.0);
}
export function flagsTexture() {
  return finish(blocksTexture(91, 3, 0.25, 0.5, 0.006, [[0.56, 0.53, 0.47], [0.62, 0.58, 0.50], [0.36, 0.34, 0.30]], 0.3), 3.0);
}

// ---------- Sand / mud detail (greyscale multiplier) with ripples. Tile = 4 m.
export function sandTexture() {
  return finish(generate(512, (u, v, o) => {
    const w = afbm(u, v, 4, 4, 3, 31);
    const rip = Math.sin((v * 34 + (w - 0.5) * 5 + Math.sin(u * Math.PI * 2 * 3) * 0.3) * Math.PI * 2);
    const ripple = 0.5 + 0.5 * rip;
    const grains = anoise(u, v, 256, 256, 41);
    const bits = anoise(u, v, 128, 128, 51);
    let l = 0.92 + (grains - 0.5) * 0.16 + (w - 0.5) * 0.1 - ripple * 0.05;
    if (bits > 0.86) l += 0.22; else if (bits < 0.1) l -= 0.25;
    o[0] = l; o[1] = l; o[2] = l * 0.98;
    o[3] = ripple * 0.7 + grains * 0.25 + (bits > 0.86 ? 0.4 : 0);
  }), 2.2);
}

// ---------- Corrugated roof sheet (ridges vary along u). Tile = 2 m.
export function roofTexture() {
  return finish(generate(512, (u, v, o) => {
    const s = Math.sin(u * Math.PI * 2 * 26);
    const rust = afbm(u, v, 4, 16, 4, 61);
    const streak = anoise(u, v, 52, 3, 62);
    const lich = anoise(u, v, 40, 40, 63);
    let R = 0.40, G = 0.21, B = 0.15;
    const rr = sstep(0.5, 0.8, rust * 0.7 + streak * 0.5);
    R = mix(R, 0.46, rr); G = mix(G, 0.27, rr); B = mix(B, 0.13, rr);
    const grey = sstep(0.55, 0.85, afbm(u, v, 3, 3, 3, 64));
    R = mix(R, 0.42, grey * 0.5); G = mix(G, 0.36, grey * 0.5); B = mix(B, 0.33, grey * 0.5);
    if (lich > 0.88) { R = 0.62; G = 0.62; B = 0.42; }
    const sh = 0.85 + 0.15 * s;
    o[0] = R * sh; o[1] = G * sh; o[2] = B * sh;
    o[3] = s * 1.0 + rust * 0.08 + (lich > 0.88 ? 0.1 : 0);
  }), 3.0);
}

// ---------- Rope: 3 helical strands. u along rope (tile = 0.2 m), v around.
export function ropeTexture() {
  return finish(generate(256, (u, v, o) => {
    const ph = u * 6 + v * 3;
    const t = ph - Math.floor(ph);
    const strand = Math.sin(t * Math.PI);
    const fib = anoise(u, v, 96, 16, 71);
    const fiber = Math.sin((u * 60 + v * 18 + fib * 1.5) * Math.PI * 2) * 0.5 + 0.5;
    const l = 0.55 + strand * 0.4 + (fiber - 0.5) * 0.12;
    o[0] = l; o[1] = l * 0.97; o[2] = l * 0.92;
    o[3] = strand * 1.0 + fiber * 0.15;
  }), 4.0);
}

// ---------- Boat hull exterior. u along hull (0 bow -> 1 stern), v keel (0) -> gunwale (1).
export function hullTexture() {
  const N = 1024;
  return finish(generate(N, (u, v, o) => {
    const strakes = 7;
    const sv = v * strakes, si = Math.floor(sv), t = sv - si;
    const wl = 0.30 + 0.05 * Math.pow(Math.abs(u - 0.45) * 2, 2);
    const chips = afbm(u, v, 24, 8, 4, 81);
    const scuff = anoise(u, v, 6, 120, 82);
    const fade = afbm(u, v, 4, 3, 3, 83);
    let R, G, B;
    if (v < wl) { R = 0.42; G = 0.16; B = 0.12; R = mix(R, 0.30, fade * 0.5); G = mix(G, 0.15, fade * 0.4); }
    else if (v < wl + 0.022) { R = 0.86; G = 0.84; B = 0.78; }
    else if (si >= strakes - 1) { R = 0.86; G = 0.81; B = 0.68; }
    else { R = mix(0.10, 0.17, fade); G = mix(0.28, 0.37, fade); B = mix(0.34, 0.42, fade); }
    // wear: chips at lap edges, bow and keel
    const wearZone = sstep(0.75, 1.0, 1 - t) * 0.2 + (u < 0.12 ? 0.25 : 0) + (v < 0.1 ? 0.3 : 0);
    const chip = sstep(0.68, 0.72, chips + wearZone * 0.5);
    const primer = sstep(0.72, 0.76, chips + wearZone * 0.5);
    if (chip > 0) { R = mix(R, 0.82, chip); G = mix(G, 0.80, chip); B = mix(B, 0.74, chip); }
    if (primer > 0) { R = mix(R, 0.45, primer); G = mix(G, 0.38, primer); B = mix(B, 0.30, primer); }
    // scrapes near keel / waterline
    const sc = sstep(0.8, 0.95, scuff) * (v < wl + 0.1 ? 1 : 0.3);
    R = mix(R, R * 1.25 + 0.05, sc * 0.5); G = mix(G, G * 1.2 + 0.05, sc * 0.5); B = mix(B, B * 1.15 + 0.05, sc * 0.5);
    // copper rivets along laps with verdigris streaks
    const rv = u * 46, rvi = rv - Math.floor(rv);
    const rd = Math.hypot((rvi - 0.5) * 0.9, (t - 0.07) * 1.6);
    const rivet = 1 - sstep(0.04, 0.07, rd);
    const verd = (1 - sstep(0.0, 0.1, Math.abs(rvi - 0.5))) * sstep(0.07, 0.4, t) * (1 - sstep(0.4, 0.9, t)) * 0.0;
    if (rivet > 0) { R = mix(R, 0.55, rivet); G = mix(G, 0.42, rivet); B = mix(B, 0.30, rivet); }
    const lap = sstep(0.0, 0.06, t);
    const sh = 0.72 + 0.28 * lap;
    o[0] = R * sh + verd; o[1] = G * sh; o[2] = B * sh;
    o[3] = (1 - t) * 0.9 + (1 - chip) * 0.08 + (1 - primer) * 0.04 + rivet * 0.35 - sc * 0.05;
  }), 5.0);
}
export function hullInnerTexture() {
  return finish(generate(512, (u, v, o) => {
    const rib = u * 26, rt = rib - Math.floor(rib);
    const ribM = 1 - sstep(0.03, 0.06, Math.abs(rt - 0.5) * 0.5);
    const st = v * 7 - Math.floor(v * 7);
    const dirt = afbm(u, v, 8, 6, 4, 91);
    let R = 0.70, G = 0.68, B = 0.62;
    R = mix(R, 0.60, ribM * 0.6); G = mix(G, 0.58, ribM * 0.6); B = mix(B, 0.53, ribM * 0.6);
    const sandy = sstep(0.32, 0.12, v) * sstep(0.3, 0.7, dirt);
    R = mix(R, 0.50, sandy); G = mix(G, 0.44, sandy); B = mix(B, 0.34, sandy);
    const dd = 1 - (dirt - 0.5) * 0.25;
    o[0] = R * dd; o[1] = G * dd; o[2] = B * dd;
    o[3] = ribM * 1.0 + (1 - st) * 0.3 + dirt * 0.1;
  }), 4.0);
}

// Transom with painted name (canvas)
export function transomTexture(name, port) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#1e4a55'; g.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 400; i++) { g.fillStyle = `rgba(${200 + Math.random() * 40},${200 + Math.random() * 30},${180},${Math.random() * 0.08})`; g.fillRect(Math.random() * 512, Math.random() * 256, 2 + Math.random() * 20, 1 + Math.random() * 3); }
  g.fillStyle = '#e9e2cf'; g.font = 'bold 62px Georgia, serif'; g.textAlign = 'center';
  g.fillText(name, 256, 120);
  g.font = 'bold 30px Georgia, serif'; g.fillText(port, 256, 168);
  g.fillStyle = '#5a1d14'; g.fillRect(0, 222, 512, 34);
  for (let i = 0; i < 90; i++) { g.fillStyle = `rgba(150,140,120,${Math.random() * 0.5})`; g.beginPath(); g.arc(Math.random() * 512, Math.random() * 256, Math.random() * 3, 0, 7); g.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso;
  return t;
}

// Tileable water ripple normal map
export function waterNormalTexture() {
  const N = 256;
  const g = generate(N, (u, v, o) => {
    const n = afbm(u, v, 8, 8, 5, 101);
    const n2 = afbm(u, v, 16, 4, 3, 102);
    o[0] = o[1] = o[2] = 0.5; o[3] = n * 0.8 + n2 * 0.4;
  });
  return dataTex(normalFromHeight(g.h, N, 9.0), N, false);
}
