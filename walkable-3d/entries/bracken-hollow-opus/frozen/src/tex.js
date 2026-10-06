// Procedural texture generation (all textures are generated at load time, no external assets).
import * as THREE from 'three';

export let ANISO = 8;
export function setAniso(a) { ANISO = a; }

export function rng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function hash(ix, iy, s) {
  let h = Math.imul(ix | 0, 374761393) ^ Math.imul(iy | 0, 668265263) ^ Math.imul(s | 0, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
function vnoise(x, y, p, s) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  const x0 = ((ix % p) + p) % p, x1 = (x0 + 1) % p, y0 = ((iy % p) + p) % p, y1 = (y0 + 1) % p;
  const a = hash(x0, y0, s), b = hash(x1, y0, s), c = hash(x0, y1, s), d = hash(x1, y1, s);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}
// Tileable fbm noise tile, sampled bilinearly (period 1 in u,v).
const NT = 256;
const tile = new Float32Array(NT * NT);
for (let y = 0; y < NT; y++) for (let x = 0; x < NT; x++) {
  let s = 0, a = 0.5, n = 0, f = 1;
  for (let o = 0; o < 5; o++) { s += a * vnoise(x / NT * 8 * f, y / NT * 8 * f, 8 * f, o * 31 + 7); n += a; a *= 0.5; f *= 2; }
  tile[y * NT + x] = s / n;
}
export function N(u, v) {
  const x = u * NT, y = v * NT;
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const x0 = ix & 255, y0 = iy & 255, x1 = (x0 + 1) & 255, y1 = (y0 + 1) & 255;
  const a = tile[y0 * NT + x0], b = tile[y0 * NT + x1], c = tile[y1 * NT + x0], d = tile[y1 * NT + x1];
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}
// contrast-stretched noise in ~[0,1]
export function Nc(u, v) { return Math.min(1, Math.max(0, (N(u, v) - 0.5) * 2.4 + 0.5)); }

function cv(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
const cl = (v) => (v < 0 ? 0 : v > 1 ? 255 : v * 255);

function build(W, H, fn) {
  const c = cv(W, H), g = c.getContext('2d');
  const img = g.createImageData(W, H), d = img.data;
  const hg = new Float32Array(W * H);
  const o = { r: 0, g: 0, b: 0, a: 1, h: 0 };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    o.a = 1; o.h = 0; fn(x, y, o);
    const i = (y * W + x) * 4;
    d[i] = cl(o.r); d[i + 1] = cl(o.g); d[i + 2] = cl(o.b); d[i + 3] = cl(o.a);
    hg[y * W + x] = o.h;
  }
  g.putImageData(img, 0, 0);
  return { c, h: hg, W, H };
}
function normalCanvas(hg, W, H, k) {
  const c = cv(W, H), g = c.getContext('2d');
  const img = g.createImageData(W, H), d = img.data;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const l = hg[y * W + ((x - 1 + W) % W)], r = hg[y * W + ((x + 1) % W)];
    const u = hg[((y - 1 + H) % H) * W + x], dn = hg[((y + 1) % H) * W + x];
    let nx = (l - r) * k, ny = (dn - u) * k, nz = 1;
    const il = 1 / Math.hypot(nx, ny, nz); nx *= il; ny *= il; nz *= il;
    const i = (y * W + x) * 4;
    d[i] = (nx * 0.5 + 0.5) * 255; d[i + 1] = (ny * 0.5 + 0.5) * 255; d[i + 2] = (nz * 0.5 + 0.5) * 255; d[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return c;
}
export function tex(c, srgb = true, repeat = true) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = ANISO;
  return t;
}
function pair(b, k) { return { map: tex(b.c), normalMap: tex(normalCanvas(b.h, b.W, b.H, k), false) }; }

// Copy a canvas with alpha into a DataTexture, filling transparent texels with the cell's average colour
// (avoids dark fringes when mipmapping alpha-tested foliage).
export function alphaTex(c, cellsX = 1, cellsY = 1) {
  const W = c.width, H = c.height;
  const src = c.getContext('2d').getImageData(0, 0, W, H).data;
  const avg = [];
  const cw = W / cellsX, ch = H / cellsY;
  for (let cy = 0; cy < cellsY; cy++) for (let cx = 0; cx < cellsX; cx++) {
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = cy * ch; y < (cy + 1) * ch; y += 3) for (let x = cx * cw; x < (cx + 1) * cw; x += 3) {
      const i = (y * W + x) * 4; if (src[i + 3] > 128) { r += src[i]; g += src[i + 1]; b += src[i + 2]; n++; }
    }
    avg.push(n ? [r / n, g / n, b / n] : [90, 70, 40]);
  }
  const out = new Uint8Array(W * H * 4);
  for (let y = 0; y < H; y++) {
    const sy = H - 1 - y;
    for (let x = 0; x < W; x++) {
      const si = (sy * W + x) * 4, di = (y * W + x) * 4, a = src[si + 3];
      if (a < 10) { const f = avg[Math.floor(sy / ch) * cellsX + Math.floor(x / cw)]; out[di] = f[0]; out[di + 1] = f[1]; out[di + 2] = f[2]; out[di + 3] = 0; }
      else { out[di] = src[si]; out[di + 1] = src[si + 1]; out[di + 2] = src[si + 2]; out[di + 3] = a; }
    }
  }
  const t = new THREE.DataTexture(out, W, H, THREE.RGBAFormat);
  t.colorSpace = THREE.SRGBColorSpace;
  t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearMipmapLinearFilter; t.generateMipmaps = true;
  t.anisotropy = 4; t.needsUpdate = true;
  return t;
}

// ---------------------------------------------------------------- surfaces
export function brick() {
  const W = 1024, H = 1024, courses = 24, per = 8, ch = H / courses, bw = W / per;
  return pair(build(W, H, (x, y, o) => {
    const row = Math.floor(y / ch), off = (row % 2) * bw * 0.5, xx = (x + off) % W, col = Math.floor(xx / bw);
    const lx = xx - col * bw, ly = y - row * ch;
    const id = hash(col, row, 11), id2 = hash(col, row, 23);
    const n = N(x / W * 8, y / H * 8), n2 = N(x / W * 32 + 0.3, y / H * 32 + 0.7), n3 = N(x / W * 64, y / H * 64);
    const m = 3.4 + (N(x / W * 16, y / H * 16) - 0.5) * 4;
    const e = Math.min(lx, bw - lx, ly, ch - ly);
    if (e < m) {
      const v = 0.5 + (n2 - 0.5) * 0.35 + (n3 - 0.5) * 0.2;
      o.r = v * 0.8; o.g = v * 0.76; o.b = v * 0.68; o.h = 0.12 + n3 * 0.15;
    } else {
      let r, g, b;
      if (id < 0.07) { r = 0.27; g = 0.22; b = 0.22; }
      else if (id < 0.2) { r = 0.6; g = 0.34; b = 0.2; }
      else if (id < 0.32) { r = 0.42; g = 0.19; b = 0.13; }
      else if (id < 0.38) { r = 0.55; g = 0.42; b = 0.3; }
      else { r = 0.52 + id2 * 0.12; g = 0.24 + id2 * 0.06; b = 0.16; }
      const sh = 0.78 + (n - 0.5) * 0.6 + (n2 - 0.5) * 0.3 + (n3 - 0.5) * 0.18;
      r *= sh; g *= sh; b *= sh;
      const er = Math.min(1, (e - m) / 3.5);
      o.h = 0.55 + er * 0.3 + (n3 - 0.5) * 0.25;
      if (id2 > 0.88 && N(x / W * 24 + id * 3, y / H * 24) > 0.48) { o.h -= 0.3; r = r * 1.12 + 0.06; g = g * 1.1 + 0.03; b *= 1.05; }
      o.r = r; o.g = g; o.b = b;
    }
    const soot = N(x / W * 4 + 0.5, y / H * 4 + 0.2);
    if (soot > 0.58) { const k = 1 - (soot - 0.58) * 1.4; o.r *= k; o.g *= k; o.b *= k; }
    const lich = N(x / W * 12 + 0.1, y / H * 12 + 0.9);
    if (lich > 0.7 && e >= m) { const k = (lich - 0.7) * 3; o.r += (0.55 - o.r) * k; o.g += (0.56 - o.g) * k; o.b += (0.42 - o.b) * k; }
  }), 4);
}

export function slate() {
  const W = 512, H = 512, rows = 8, per = 6, rh = H / rows, sw = W / per;
  return pair(build(W, H, (x, y, o) => {
    const row = Math.floor(y / rh), off = (row % 2) * sw * 0.5, xx = (x + off) % W, col = Math.floor(xx / sw);
    const lx = xx - col * sw, ly = y - row * rh, id = hash(col, row, 5);
    const n = N(x / W * 16, y / H * 16), n2 = N(x / W * 48, y / H * 48);
    let v = 0.25 + id * 0.09 + (n - 0.5) * 0.12 + (n2 - 0.5) * 0.06;
    o.r = v * 0.92; o.g = v * 0.95; o.b = v * 1.1; o.h = 0.4 + (ly / rh) * 0.35 + n2 * 0.1;
    if (lx < 2 || lx > sw - 2) { o.r *= 0.3; o.g *= 0.3; o.b *= 0.3; o.h = 0.1; }
    if (ly < 6) { const k = 0.45 + ly / 6 * 0.4; o.r *= k; o.g *= k; o.b *= k; o.h = 0.25; }
    const L = N(x / W * 10 + 0.3, y / H * 10 + 0.6);
    if (L > 0.66) { const k = Math.min(1, (L - 0.66) * 5); o.r += (0.62 - o.r) * k * 0.8; o.g += (0.6 - o.g) * k * 0.8; o.b += (0.32 - o.b) * k * 0.8; }
    const M = N(x / W * 6 + 0.7, y / H * 6 + 0.1);
    if (M > 0.62 && ly > rh * 0.55) { const k = Math.min(1, (M - 0.62) * 4); o.r += (0.2 - o.r) * k; o.g += (0.3 - o.g) * k; o.b += (0.1 - o.b) * k; o.h += 0.1 * k; }
  }), 3);
}

function plankBase(x, y, W, H, planks, seed) {
  const pw = W / planks, p = Math.floor(x / pw), lx = x - p * pw, id = hash(p, 0, seed);
  const joint = Math.floor((y / H + id) * 2);
  const g1 = N(x / W * 24 + id * 3.1, y / H * 1 + id), g2 = N(x / W * 64, y / H * 3 + id);
  const lines = Math.abs(Math.sin(g1 * 40 + lx * 0.07));
  const seam = lx < 1.6 || lx > pw - 1.6 || ((y / H + id) * 2 % 1) < 0.004;
  return { id: hash(p, joint, seed + 1), g1, g2, lines, seam, lx, pw };
}
export function wood(kind) {
  const W = 512, H = 512;
  const base = kind === 'floor' ? [0.4, 0.29, 0.19] : kind === 'dark' ? [0.26, 0.2, 0.15] : [0.47, 0.42, 0.36];
  return pair(build(W, H, (x, y, o) => {
    const p = plankBase(x, y, W, H, kind === 'floor' ? 5 : 4, kind === 'floor' ? 7 : 3);
    const k = 0.8 + (p.g1 - 0.5) * 0.7 + (p.id - 0.5) * 0.25 - (p.lines > 0.93 ? 0.18 : 0);
    o.r = base[0] * k; o.g = base[1] * k; o.b = base[2] * k;
    o.h = 0.6 + (p.g2 - 0.5) * 0.4 - (p.lines > 0.9 ? 0.12 : 0);
    const crack = N(x / W * 20 + 0.2, y / H * 3);
    if (Math.abs(crack - 0.5) < 0.006) { o.r *= 0.4; o.g *= 0.4; o.b *= 0.4; o.h -= 0.3; }
    if (kind === 'floor') { const dirt = N(x / W * 4, y / H * 4); o.r *= 0.75 + dirt * 0.4; o.g *= 0.75 + dirt * 0.4; o.b *= 0.75 + dirt * 0.35; }
    if (p.seam) { o.r *= 0.25; o.g *= 0.25; o.b *= 0.25; o.h = 0; }
  }), 3);
}
export function paintedWood(col, planks = 4, peel = 0.47) {
  const W = 512, H = 512;
  return pair(build(W, H, (x, y, o) => {
    const p = plankBase(x, y, W, H, planks, 13);
    const k = 0.8 + (p.g1 - 0.5) * 0.6 - (p.lines > 0.93 ? 0.15 : 0);
    let r = 0.46 * k, g = 0.42 * k, b = 0.36 * k, h = 0.5 + (p.g2 - 0.5) * 0.3;
    const pm = N(x / W * 6 + 0.37, y / H * 6 + 0.11) + (N(x / W * 28, y / H * 28) - 0.5) * 0.35 + (p.id - 0.5) * 0.1;
    if (pm > peel) {
      const d = 0.85 + (N(x / W * 12, y / H * 12) - 0.5) * 0.3 + (p.g2 - 0.5) * 0.1;
      r = col[0] * d; g = col[1] * d; b = col[2] * d; h = 0.72 + (p.g2 - 0.5) * 0.08;
      const dirt = N(x / W * 3 + 0.5, y / H * 3); if (dirt > 0.55) { const q = 1 - (dirt - 0.55) * 1.2; r *= q; g *= q; b *= q * 0.95; }
    } else if (pm > peel - 0.03) { r *= 0.55; g *= 0.55; b *= 0.55; h = 0.64; }
    if (p.seam) { r *= 0.2; g *= 0.2; b *= 0.2; h = 0; }
    o.r = r; o.g = g; o.b = b; o.h = h;
  }), 3);
}
export function rust(paint, scale = 1) {
  const W = 512, H = 512;
  return pair(build(W, H, (x, y, o) => {
    const n = N(x / W * 8, y / H * 8), n2 = N(x / W * 32, y / H * 32), n3 = N(x / W * 64 + 0.5, y / H * 64 + 0.5);
    const t = Math.min(1, Math.max(0, n * 1.3 + (n2 - 0.5) * 0.9 - 0.2));
    let r = 0.22 + t * 0.36, g = 0.11 + t * 0.17, b = 0.06 + t * 0.06, h = n2 * 0.5 + n3 * 0.3;
    if (n3 > 0.68) { r *= 0.55; g *= 0.5; b *= 0.5; h -= 0.2; }
    if (paint) {
      const pm = N(x / W * 5 + 0.3, y / H * 5 * scale + 0.7) + (n3 - 0.5) * 0.3;
      if (pm > 0.47) { const d = 0.85 + (n2 - 0.5) * 0.25; r = paint[0] * d; g = paint[1] * d; b = paint[2] * d; h = 0.8; }
      else if (pm > 0.44) { r *= 0.6; g *= 0.55; b *= 0.5; h = 0.7; }
    }
    o.r = r; o.g = g; o.b = b; o.h = h;
  }), 3);
}
export function corrugated() {
  const W = 512, H = 512;
  return pair(build(W, H, (x, y, o) => {
    const n = N(x / W * 6, y / H * 6), n2 = N(x / W * 32, y / H * 32), n3 = N(x / W * 64, y / H * 64);
    const t = Math.min(1, Math.max(0, n * 1.4 + (n2 - 0.5) * 0.8 - 0.25));
    let r = 0.2 + t * 0.38, g = 0.11 + t * 0.18, b = 0.07 + t * 0.06;
    const streak = N(x / W * 24, y / H * 1.5);
    if (streak > 0.6) { r *= 0.75; g *= 0.7; b *= 0.7; }
    const galv = N(x / W * 4 + 0.6, y / H * 4 + 0.2);
    if (galv > 0.58) { const k = Math.min(1, (galv - 0.58) * 4); r += (0.42 - r) * k; g += (0.42 - g) * k; b += (0.4 - b) * k; }
    o.r = r; o.g = g; o.b = b;
    o.h = Math.sin(x / W * Math.PI * 2 * 12) * 0.5 * 1.0 + n3 * 0.05;
  }), 6);
}
export function flagstone() {
  const W = 1024, H = 1024, cols = 4, rows = 5, sw = W / cols, sh = H / rows;
  return pair(build(W, H, (x, y, o) => {
    const row = Math.floor(y / sh), off = (row % 2) * sw * 0.5, xx = (x + off) % W, col = Math.floor(xx / sw);
    const lx = xx - col * sw, ly = y - row * sh, id = hash(col, row, 9);
    const n = N(x / W * 6, y / H * 6), n2 = N(x / W * 40, y / H * 40), n3 = N(x / W * 96, y / H * 96);
    const e = Math.min(lx, sw - lx, ly, sh - ly);
    const gap = 4 + (n2 - 0.5) * 5;
    let v = 0.5 + (id - 0.5) * 0.18 + (n - 0.5) * 0.25 + (n3 - 0.5) * 0.12;
    let r = v * 0.98, g = v * 0.94, b = v * 0.86, h = 0.7 + (n3 - 0.5) * 0.2 + (n2 - 0.5) * 0.1;
    if (e < gap) {
      const moss = N(x / W * 20, y / H * 20);
      r = 0.16 + moss * 0.1; g = 0.2 + moss * 0.18; b = 0.08; h = 0.15 + moss * 0.2;
    } else {
      const cr = N(x / W * 3 + id * 5, y / H * 3 + id * 7);
      if (Math.abs(cr - 0.5) < 0.0045 + n3 * 0.002) { r = 0.15; g = 0.17; b = 0.08; h = 0.2; }
      const L = N(x / W * 14 + 0.2, y / H * 14 + 0.5);
      if (L > 0.68) { const k = Math.min(1, (L - 0.68) * 5); r += (0.66 - r) * k * 0.6; g += (0.66 - g) * k * 0.6; b += (0.5 - b) * k * 0.6; }
      const dirt = N(x / W * 2 + 0.3, y / H * 2 + 0.3);
      if (dirt > 0.55) { const k = 1 - (dirt - 0.55) * 1.3; r *= k; g *= k; b *= k; }
    }
    o.r = r; o.g = g; o.b = b; o.h = h;
  }), 3);
}
export function ballast() {
  const W = 512, H = 512, cell = 22, cells = Math.round(W / cell);
  const cs = W / cells;
  return pair(build(W, H, (x, y, o) => {
    const gx = Math.floor(x / cs), gy = Math.floor(y / cs);
    let f1 = 1e9, f2 = 1e9, id = 0;
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
      const cx = gx + i, cy = gy + j, wx = ((cx % cells) + cells) % cells, wy = ((cy % cells) + cells) % cells;
      const px = (cx + 0.15 + hash(wx, wy, 1) * 0.7) * cs, py = (cy + 0.15 + hash(wx, wy, 2) * 0.7) * cs;
      const d = Math.hypot((x - px) * (0.8 + hash(wx, wy, 4) * 0.4), y - py);
      if (d < f1) { f2 = f1; f1 = d; id = hash(wx, wy, 3); } else if (d < f2) f2 = d;
    }
    const edge = f2 - f1, n = N(x / W * 32, y / H * 32);
    let v = 0.36 + id * 0.26 + (n - 0.5) * 0.12;
    let r = v * (0.98 + id * 0.08), g = v * 0.96, b = v * 0.92;
    if (id > 0.85) { r *= 1.15; g *= 0.92; b *= 0.8; }
    const st = N(x / W * 3, y / H * 3); if (st > 0.55) { const k = (st - 0.55) * 1.6; r += (0.35 - r) * k; g += (0.2 - g) * k; b += (0.12 - b) * k; }
    let h = Math.max(0, 1 - f1 / (cs * 0.75)) * 0.8 + n * 0.1;
    if (edge < 2.5) { r *= 0.3; g *= 0.3; b *= 0.28; h *= 0.4; }
    o.r = r; o.g = g; o.b = b; o.h = h;
  }), 5);
}
export function bark(kind) {
  const W = 256, H = 512;
  return pair(build(W, H, (x, y, o) => {
    if (kind === 'birch') {
      const n = N(x / W * 4, y / H * 8), len = N(x / W * 3 + 0.2, y / H * 40), big = N(x / W * 2 + 0.6, y / H * 5);
      let v = 0.82 + (n - 0.5) * 0.15; let r = v, g = v * 0.98, b = v * 0.93, h = 0.6;
      if (len > 0.66) { r = g = b = 0.12; h = 0.3; }
      if (big > 0.64) { const k = Math.min(1, (big - 0.64) * 6); r += (0.1 - r) * k; g += (0.09 - g) * k; b += (0.08 - b) * k; h = 0.4; }
      o.r = r; o.g = g; o.b = b; o.h = h; return;
    }
    const smoothB = kind === 'beech';
    const rid = 1 - Math.abs(N(x / W * (smoothB ? 2 : 6), y / H * 1.2) * 2 - 1);
    const n2 = N(x / W * 12, y / H * 16), n3 = N(x / W * 32, y / H * 48);
    const h = smoothB ? 0.5 + (n2 - 0.5) * 0.3 : Math.pow(rid, 1.6) * 0.8 + n3 * 0.2;
    let v = smoothB ? 0.42 + (n2 - 0.5) * 0.2 : 0.16 + h * 0.22 + (n3 - 0.5) * 0.06;
    let r = v * (smoothB ? 0.95 : 1.05), g = v * (smoothB ? 0.95 : 0.92), b = v * (smoothB ? 0.92 : 0.8);
    const L = N(x / W * 3 + 0.4, y / H * 4 + 0.1);
    if (L > 0.6) { const k = Math.min(1, (L - 0.6) * 4) * 0.7; r += (0.36 - r) * k; g += (0.42 - g) * k; b += (0.24 - b) * k; }
    o.r = r; o.g = g; o.b = b; o.h = h;
  }), 4);
}
export function plaster() {
  const W = 512, H = 512;
  const b = build(W, H, (x, y, o) => {
    const n = N(x / W * 3, y / H * 3), n2 = N(x / W * 24, y / H * 24), hole = N(x / W * 2 + 0.2, y / H * 2 + 0.7) + (n2 - 0.5) * 0.1;
    let r = 0.78, g = 0.75, b = 0.62;
    const k = 0.92 + (n2 - 0.5) * 0.12; r *= k; g *= k; b *= k;
    if (n > 0.56) { const s = Math.min(1, (n - 0.56) * 3); r -= 0.25 * s; g -= 0.28 * s; b -= 0.3 * s; }
    if (Math.abs(n - 0.56) < 0.006) { r *= 0.7; g *= 0.65; b *= 0.6; }
    const m = N(x / W * 16 + 0.4, y / H * 16); if (m > 0.68) { r *= 0.6; g *= 0.62; b *= 0.55; }
    o.h = 0.7 + (n2 - 0.5) * 0.15;
    if (hole > 0.665) { o.a = 0; } else if (hole > 0.645) { r *= 0.62; g *= 0.6; b *= 0.55; o.h = 0.45; }
    o.r = r; o.g = g; o.b = b;
  });
  const t = pair(b, 2); return t;
}

// ---------------------------------------------------------------- leaves & plants
export const PAL = {
  maple: [[178, 34, 24], [200, 60, 26], [214, 92, 30], [160, 28, 30], [226, 122, 36], [190, 48, 22], [150, 40, 50]],
  beech: [[196, 108, 40], [176, 90, 32], [210, 132, 50], [160, 80, 30], [222, 152, 60], [190, 120, 40]],
  birch: [[232, 190, 60], [220, 170, 40], [240, 208, 90], [205, 160, 45], [214, 182, 70], [190, 170, 60]],
  oak: [[140, 92, 40], [160, 110, 46], [122, 82, 36], [150, 122, 52], [112, 98, 42], [170, 120, 50]],
  fallen: [[120, 70, 34], [140, 84, 40], [104, 60, 30], [160, 96, 40], [90, 56, 30], [176, 120, 50], [150, 50, 30], [190, 150, 60]],
};
function leafShape(g, type, s) {
  g.beginPath();
  for (let i = 0; i <= 48; i++) {
    const a = i / 48 * Math.PI * 2;
    let x, y;
    if (type === 0) {
      const ph = a / (Math.PI * 2) * 5, d = Math.abs(ph - Math.round(ph));
      const r = s * (0.38 + 0.62 * Math.pow(1 - 2 * d, 1.4)) * (1 + 0.05 * Math.sin(a * 30));
      x = Math.sin(a) * r; y = -Math.cos(a) * r;
    } else if (type === 1) {
      x = 0.5 * s * Math.sin(a) * (1 + 0.24 * Math.abs(Math.sin(a * 4.5))); y = -s * Math.cos(a);
    } else {
      x = 0.46 * s * Math.sin(a) * (1 - 0.32 * Math.cos(a)) * (1 + (type === 2 ? 0.05 * Math.sin(a * 26) : 0)); y = -s * Math.cos(a);
    }
    i ? g.lineTo(x, y) : g.moveTo(x, y);
  }
  g.closePath();
}
export function drawLeaf(g, x, y, rot, s, type, c, k = 1, spots = 0) {
  g.save(); g.translate(x, y); g.rotate(rot);
  leafShape(g, type, s);
  const col = (m) => `rgb(${Math.min(255, c[0] * m) | 0},${Math.min(255, c[1] * m) | 0},${Math.min(255, c[2] * m) | 0})`;
  const gr = g.createLinearGradient(-s, -s, s, s);
  gr.addColorStop(0, col(k * 1.08)); gr.addColorStop(1, col(k * 0.82));
  g.fillStyle = gr; g.fill();
  g.lineWidth = Math.max(0.8, s * 0.04); g.strokeStyle = 'rgba(50,25,8,0.35)'; g.stroke();
  g.strokeStyle = 'rgba(70,35,12,0.45)'; g.lineWidth = Math.max(0.8, s * 0.045);
  g.beginPath(); g.moveTo(0, s * 1.3); g.lineTo(0, -s * 0.85); g.stroke();
  if (s > 10) {
    g.lineWidth = Math.max(0.5, s * 0.02);
    for (let i = 1; i < 4; i++) { const yy = s * (0.6 - i * 0.35); g.beginPath(); g.moveTo(0, yy + s * 0.2); g.lineTo(s * 0.4, yy - s * 0.1); g.moveTo(0, yy + s * 0.2); g.lineTo(-s * 0.4, yy - s * 0.1); g.stroke(); }
  }
  for (let i = 0; i < spots; i++) { g.fillStyle = 'rgba(30,20,10,0.55)'; g.beginPath(); g.arc((Math.random() - 0.5) * s * 0.6, (Math.random() - 0.5) * s, s * 0.06 + Math.random() * s * 0.06, 0, 7); g.fill(); }
  g.restore();
}
// 2x2 atlas of leafy twig clusters
export function leafAtlas() {
  const S = 512, c = cv(S * 2, S * 2), g = c.getContext('2d');
  const r = rng(77);
  const cells = [
    { type: 0, pal: PAL.maple, n: 46, s0: 26, s1: 46 },
    { type: 1, pal: PAL.beech, n: 60, s0: 22, s1: 36 },
    { type: 2, pal: PAL.birch, n: 90, s0: 14, s1: 24 },
    { type: 1, pal: PAL.oak, n: 60, s0: 22, s1: 38 },
  ];
  cells.forEach((cd, ci) => {
    const ox = (ci % 2) * S, oy = Math.floor(ci / 2) * S;
    const base = { x: ox + S * 0.5, y: oy + S * 0.97 };
    const tw = [];
    g.strokeStyle = 'rgb(66,48,34)'; g.lineCap = 'round';
    for (let k = 0; k < 6; k++) {
      const ang = -Math.PI / 2 + (r() - 0.5) * 2.0, len = S * (0.32 + r() * 0.36);
      const ex = base.x + Math.cos(ang) * len, ey = base.y + Math.sin(ang) * len;
      tw.push([base.x, base.y, ex, ey]);
      g.lineWidth = S * 0.012; g.beginPath(); g.moveTo(base.x, base.y);
      g.quadraticCurveTo((base.x + ex) / 2 + (r() - 0.5) * S * 0.12, (base.y + ey) / 2, ex, ey); g.stroke();
    }
    for (let pass = 0; pass < 2; pass++) {
      const n = cd.n * (pass ? 0.6 : 0.45);
      for (let i = 0; i < n; i++) {
        const t = tw[Math.floor(r() * tw.length)], f = 0.25 + r() * 0.8;
        const s = cd.s0 + r() * (cd.s1 - cd.s0);
        let x = t[0] + (t[2] - t[0]) * f + (r() - 0.5) * S * 0.2, y = t[1] + (t[3] - t[1]) * f + (r() - 0.5) * S * 0.2;
        x = Math.min(ox + S - s * 1.4, Math.max(ox + s * 1.4, x)); y = Math.min(oy + S - s * 1.4, Math.max(oy + s * 1.4, y));
        const col = cd.pal[Math.floor(r() * cd.pal.length)];
        const k = pass ? 0.92 + r() * 0.22 : 0.55 + r() * 0.2;
        drawLeaf(g, x, y, Math.atan2(y - base.y, x - base.x) + Math.PI / 2 + (r() - 0.5) * 1.0, s, cd.type, col, k, r() < 0.15 ? 2 : 0);
      }
    }
  });
  return alphaTex(c, 2, 2);
}
export function spruceTex() {
  const W = 256, H = 512, c = cv(W, H), g = c.getContext('2d'), r = rng(5);
  g.lineCap = 'round';
  g.strokeStyle = 'rgb(58,44,30)'; g.lineWidth = 5; g.beginPath(); g.moveTo(W / 2, H); g.lineTo(W / 2, 8); g.stroke();
  for (let i = 0; i < 30; i++) {
    const y = H - 20 - i * 16, len = (1 - i / 34) * 105 + 14;
    for (const sd of [-1, 1]) {
      const ex = W / 2 + sd * len, ey = y - len * 0.45;
      g.strokeStyle = 'rgb(50,40,28)'; g.lineWidth = 2; g.beginPath(); g.moveTo(W / 2, y); g.lineTo(ex, ey); g.stroke();
      for (let t = 0; t < 1; t += 0.07) {
        const px = W / 2 + (ex - W / 2) * t, py = y + (ey - y) * t;
        for (const a of [-1, 1]) {
          const ang = Math.atan2(ey - y, ex - W / 2) + a * (0.9 + r() * 0.3), l = 9 + r() * 7;
          const gcol = 30 + r() * 26;
          g.strokeStyle = `rgb(${gcol * 0.6 | 0},${gcol + 22 | 0},${gcol * 0.75 | 0})`; g.lineWidth = 1.6;
          g.beginPath(); g.moveTo(px, py); g.lineTo(px + Math.cos(ang) * l, py + Math.sin(ang) * l); g.stroke();
        }
      }
    }
  }
  return alphaTex(c);
}
export function fernTex() {
  const W = 256, H = 512, c = cv(W, H), g = c.getContext('2d'), r = rng(9);
  const cols = [[170, 92, 40], [188, 112, 50], [150, 80, 36], [178, 146, 62], [128, 112, 50], [160, 70, 30]];
  g.lineCap = 'round';
  const pts = []; for (let i = 0; i <= 30; i++) { const t = i / 30; pts.push([W / 2 + Math.sin(t * 2.2) * 18 * t, H - 6 - t * (H - 20)]); }
  g.strokeStyle = 'rgb(110,70,36)'; g.lineWidth = 4; g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.stroke();
  for (let i = 3; i < 30; i++) {
    const t = i / 30, p = pts[i], len = Math.sin(Math.PI * Math.min(1, t * 1.15)) * 100 + 8;
    for (const sd of [-1, 1]) {
      const ang = -Math.PI / 2 + sd * (1.15 - t * 0.3);
      const col = cols[Math.floor(r() * cols.length)];
      for (let j = 0; j < 1; j += 0.1) {
        const px = p[0] + Math.cos(ang) * len * j, py = p[1] + Math.sin(ang) * len * j + j * j * 14;
        const s = (1 - j) * 7 + 2.5;
        g.fillStyle = `rgb(${col[0] * (0.8 + r() * 0.3) | 0},${col[1] * (0.8 + r() * 0.3) | 0},${col[2] | 0})`;
        g.beginPath(); g.ellipse(px, py, s, s * 0.55, ang + Math.PI / 2, 0, 7); g.fill();
      }
    }
  }
  return alphaTex(c);
}
export function grassTex() {
  const W = 256, H = 256, c = cv(W, H), g = c.getContext('2d'), r = rng(3);
  const cols = [[190, 172, 112], [172, 160, 100], [118, 124, 62], [140, 108, 62], [160, 150, 90], [98, 110, 52]];
  for (let i = 0; i < 90; i++) {
    const x0 = 30 + r() * (W - 60), w = 1.5 + r() * 2.5, h = 80 + r() * 160, lean = (r() - 0.5) * 120;
    const col = cols[Math.floor(r() * cols.length)];
    g.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`;
    g.beginPath(); g.moveTo(x0 - w, H); g.quadraticCurveTo(x0 + lean * 0.3, H - h * 0.6, x0 + lean, H - h); g.quadraticCurveTo(x0 + lean * 0.3 + w, H - h * 0.6, x0 + w, H); g.fill();
  }
  return alphaTex(c);
}
export function groundLeafAtlas() {
  const S = 128, c = cv(S * 4, S * 4), g = c.getContext('2d'), r = rng(31);
  for (let i = 0; i < 16; i++) {
    const ox = (i % 4) * S + S / 2, oy = Math.floor(i / 4) * S + S / 2;
    const type = i % 3, pal = i < 6 ? PAL.fallen : i < 10 ? PAL.maple : i < 13 ? PAL.birch : PAL.beech;
    drawLeaf(g, ox, oy + 8, r() * 0.6 - 0.3, type === 0 ? 40 : 44, type, pal[Math.floor(r() * pal.length)], 0.85 + r() * 0.2, r() < 0.4 ? 3 : 0);
  }
  return alphaTex(c, 4, 4);
}
export function ivyTex() {
  const W = 512, H = 512, c = cv(W, H), g = c.getContext('2d'), r = rng(12);
  const pal = [[150, 20, 24], [178, 34, 30], [120, 18, 34], [196, 60, 30], [140, 40, 50], [110, 70, 30]];
  g.strokeStyle = 'rgb(80,55,40)'; g.lineCap = 'round';
  const nodes = [];
  for (let v = 0; v < 7; v++) {
    let x = 40 + r() * (W - 80), y = H; g.lineWidth = 3; g.beginPath(); g.moveTo(x, y);
    while (y > 10) { x += (r() - 0.5) * 40; x = Math.max(20, Math.min(W - 20, x)); y -= 20 + r() * 20; g.lineTo(x, y); nodes.push([x, y]); }
    g.stroke();
  }
  nodes.forEach(([x, y]) => { for (let k = 0; k < 2; k++) drawLeaf(g, x + (r() - 0.5) * 30, y + (r() - 0.5) * 20, (r() - 0.5) * 2.4, 16 + r() * 12, 0, pal[Math.floor(r() * pal.length)], 0.8 + r() * 0.3); });
  return alphaTex(c);
}
export function impostorAtlas() {
  const S = 256, c = cv(S * 4, S * 2), g = c.getContext('2d'), r = rng(44);
  const pals = [PAL.maple, PAL.beech, PAL.birch, null];
  for (let k = 0; k < 4; k++) {
    const ox = k * S, cx = ox + S / 2;
    g.fillStyle = k === 2 ? 'rgb(200,196,186)' : 'rgb(58,46,36)';
    g.fillRect(cx - 6, S * 1.1, 12, S * 0.9);
    if (k === 3) {
      for (let i = 0; i < 16; i++) {
        const y = S * 1.75 - i * S * 0.1, w = (1 - i / 17) * S * 0.42;
        for (let j = 0; j < 40; j++) {
          const gcol = 26 + r() * 30; g.strokeStyle = `rgb(${gcol * 0.6 | 0},${gcol + 18 | 0},${gcol * 0.8 | 0})`; g.lineWidth = 3;
          const sx = cx + (r() - 0.5) * w * 2; g.beginPath(); g.moveTo(cx, y - 20); g.lineTo(sx, y + r() * 14); g.stroke();
        }
      }
      continue;
    }
    for (let i = 0; i < 420; i++) {
      const a = r() * Math.PI * 2, rr = Math.sqrt(r());
      const x = cx + Math.cos(a) * rr * S * 0.44, y = S * 0.62 + Math.sin(a) * rr * S * 0.55;
      const col = pals[k][Math.floor(r() * pals[k].length)];
      const sh = 0.55 + 0.5 * ((cx - x) / S + (S * 0.62 - y) / S + 0.6);
      g.fillStyle = `rgb(${Math.min(255, col[0] * sh) | 0},${Math.min(255, col[1] * sh) | 0},${Math.min(255, col[2] * sh) | 0})`;
      g.beginPath(); g.arc(x, y, 6 + r() * 12, 0, 7); g.fill();
    }
  }
  return alphaTex(c, 4, 1);
}

// ---------------------------------------------------------------- ground
export function litter() {
  const W = 1024, c = cv(W, W), g = c.getContext('2d'), hc = cv(W, W), hg = hc.getContext('2d');
  const soil = build(W, W, (x, y, o) => { const n = N(x / W * 8, y / W * 8), n2 = N(x / W * 64, y / W * 64); const v = 0.6 + n * 0.5 + (n2 - 0.5) * 0.3; o.r = 0.2 * v; o.g = 0.14 * v; o.b = 0.09 * v; });
  g.drawImage(soil.c, 0, 0); hg.fillStyle = '#202020'; hg.fillRect(0, 0, W, W);
  const r = rng(101);
  const total = 2600;
  for (let i = 0; i < total; i++) {
    const x = r() * W, y = r() * W, s = 9 + r() * 15, rot = r() * 7, type = Math.floor(r() * 3);
    const col = PAL.fallen[Math.floor(r() * PAL.fallen.length)], k = 0.55 + r() * 0.5;
    const hv = 60 + i / total * 190;
    for (const dx of [-W, 0, W]) for (const dy of [-W, 0, W]) {
      const px = x + dx, py = y + dy; if (px < -40 || px > W + 40 || py < -40 || py > W + 40) continue;
      drawLeaf(g, px, py, rot, s, type, col, k, r() < 0.1 ? 2 : 0);
      hg.save(); hg.translate(px, py); hg.rotate(rot); leafShape(hg, type, s); hg.fillStyle = `rgb(${hv | 0},${hv | 0},${hv | 0})`; hg.fill(); hg.restore();
    }
    if (i % 40 === 0) { g.strokeStyle = 'rgb(60,42,28)'; g.lineWidth = 2 + r() * 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 120, y + (r() - 0.5) * 120); g.stroke(); }
  }
  const hd = hg.getImageData(0, 0, W, W).data, hgt = new Float32Array(W * W);
  for (let i = 0; i < W * W; i++) hgt[i] = hd[i * 4] / 255;
  return { map: tex(c), normalMap: tex(normalCanvas(hgt, W, W, 3), false) };
}
export function dirt() {
  const W = 512;
  const b = build(W, W, (x, y, o) => {
    const n = N(x / W * 6, y / W * 6), n2 = N(x / W * 48, y / W * 48), n3 = N(x / W * 128 % 256, y / W * 128 % 256);
    const cx = Math.floor(x / 10), cy = Math.floor(y / 10), pid = hash(cx, cy, 8);
    const px = (cx + 0.5) * 10, py = (cy + 0.5) * 10, pr = 1.5 + pid * 3.2;
    let v = 0.75 + (n - 0.5) * 0.5 + (n2 - 0.5) * 0.3;
    let r = 0.36 * v, g = 0.27 * v, bb = 0.19 * v, h = n2 * 0.4 + n3 * 0.1;
    if (pid > 0.55 && Math.hypot(x - px, y - py) < pr) { const k = 0.55 + pid * 0.3; r = k * 0.62; g = k * 0.58; bb = k * 0.52; h = 0.8; }
    o.r = r; o.g = g; o.b = bb; o.h = h;
  });
  const g = b.c.getContext('2d'), r = rng(55);
  for (let i = 0; i < 140; i++) drawLeaf(g, r() * W, r() * W, r() * 7, 6 + r() * 8, Math.floor(r() * 3), PAL.fallen[Math.floor(r() * 8)], 0.6 + r() * 0.4);
  return pair(b, 3);
}

// ---------------------------------------------------------------- signs & paper
function weather(c, amount = 1, seed = 1) {
  const g = c.getContext('2d'), W = c.width, H = c.height, img = g.getImageData(0, 0, W, H), d = img.data;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const n = N(x / W * 3 + seed * 0.13, y / H * 2 + seed * 0.29), n2 = N(x / W * 24 + seed, y / H * 12);
    let k = 0.82 + (n2 - 0.5) * 0.25;
    if (n > 0.6) k *= 1 - (n - 0.6) * 1.5 * amount;
    d[i] = d[i] * k + (n > 0.64 ? 40 * amount : 0); d[i + 1] = d[i + 1] * k + (n > 0.64 ? 18 * amount : 0); d[i + 2] = d[i + 2] * k;
    const chip = N(x / W * 8 + seed * 0.5, y / H * 4 + 0.3);
    if (chip > 0.7 * (2 - amount)) { d[i] = 110 + n2 * 40; d[i + 1] = 60 + n2 * 20; d[i + 2] = 30; }
  }
  g.putImageData(img, 0, 0);
}
export function signTex(w, h, draw, amount = 1, seed = 1) {
  const c = cv(w, h), g = c.getContext('2d'); draw(g, w, h); weather(c, amount, seed);
  const t = tex(c, true, false); return t;
}
export function nameBoard() {
  return signTex(1024, 192, (g, w, h) => {
    g.fillStyle = '#1d2f24'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#d9d0b4'; g.lineWidth = 10; g.strokeRect(14, 14, w - 28, h - 28);
    g.fillStyle = '#e4dcc2'; g.font = 'bold 92px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('BRACKEN HOLLOW', w / 2, h / 2 + 6);
  }, 1, 3);
}
export function waitingSign() {
  return signTex(512, 96, (g, w, h) => {
    g.fillStyle = '#25412e'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#ddd3b5'; g.font = 'bold 54px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('WAITING ROOM', w / 2, h / 2 + 3);
  }, 0.9, 5);
}
export function crossingSign() {
  return signTex(384, 384, (g, w, h) => {
    g.fillStyle = '#e6e1d4'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#151515'; g.lineWidth = 12; g.strokeRect(10, 10, w - 20, h - 20);
    g.fillStyle = '#121212'; g.textAlign = 'center'; g.font = 'bold 62px Arial, sans-serif';
    g.fillText('STOP', w / 2, 90); g.fillText('LOOK', w / 2, 160); g.fillText('LISTEN', w / 2, 230);
    g.font = 'bold 34px Arial, sans-serif'; g.fillText('BEWARE OF', w / 2, 290); g.fillText('TRAINS', w / 2, 330);
  }, 1.2, 8);
}
export function timetableTex() {
  return signTex(512, 640, (g, w, h) => {
    g.fillStyle = '#d8ccaa'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#2a2420'; g.textAlign = 'center'; g.font = 'bold 30px Georgia, serif'; g.fillText('BRACKEN HOLLOW', w / 2, 52);
    g.font = '20px Georgia, serif'; g.fillText('Train Services — Winter 1965', w / 2, 82);
    g.fillRect(40, 96, w - 80, 3);
    g.textAlign = 'left'; g.font = '17px Courier New, monospace';
    const rows = ['Up trains      dep.', 'Ashby Cross    7.12   9.40  12.55', 'Fennick        7.31   9.58   1.14', 'Market Lydd    7.52  10.20   1.36', '', 'Down trains    dep.', 'Wellow End     8.05  11.15   4.20', 'Coldharbour    8.24  11.33   4.41', 'Hythe Moor     8.47  11.57   5.02', '', 'Sundays — no service', 'By order'];
    rows.forEach((t, i) => g.fillText(t, 44, 136 + i * 30));
    g.save(); g.translate(w / 2, h * 0.72); g.rotate(-0.12);
    g.fillStyle = '#f1ece0'; g.fillRect(-190, -70, 380, 150);
    g.fillStyle = '#9a1c16'; g.font = 'bold 30px Arial, sans-serif'; g.textAlign = 'center'; g.fillText('NOTICE', 0, -30);
    g.fillStyle = '#1a1a1a'; g.font = '17px Arial, sans-serif';
    g.fillText('Passenger services at this station', 0, 4); g.fillText('were withdrawn on and from', 0, 28); g.fillText('Monday 3rd October 1966', 0, 54);
    g.restore();
  }, 1.1, 11);
}
export function enamelTex() {
  return signTex(256, 384, (g, w, h) => {
    g.fillStyle = '#1f3a6b'; g.fillRect(0, 0, w, h); g.strokeStyle = '#e8dfc4'; g.lineWidth = 8; g.strokeRect(10, 10, w - 20, h - 20);
    g.fillStyle = '#efe4c4'; g.textAlign = 'center'; g.font = 'bold 40px Georgia, serif'; g.fillText('WRENFIELD', w / 2, 110);
    g.font = 'italic 34px Georgia, serif'; g.fillText('Cocoa', w / 2, 160);
    g.fillStyle = '#c9302c'; g.beginPath(); g.arc(w / 2, 250, 52, 0, 7); g.fill();
    g.fillStyle = '#efe4c4'; g.font = 'bold 22px Georgia, serif'; g.fillText('WARMS', w / 2, 248); g.fillText('& CHEERS', w / 2, 272);
  }, 1.5, 14);
}
export function clockTex() {
  return signTex(256, 256, (g, w, h) => {
    g.fillStyle = '#e9e3d2'; g.beginPath(); g.arc(128, 128, 124, 0, 7); g.fill();
    g.strokeStyle = '#222'; g.lineWidth = 8; g.stroke();
    g.fillStyle = '#222'; g.font = 'bold 26px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    for (let i = 1; i <= 12; i++) { const a = i / 12 * Math.PI * 2; g.fillText(String(i), 128 + Math.sin(a) * 96, 128 - Math.cos(a) * 96); }
    g.lineCap = 'round'; g.lineWidth = 8; g.beginPath(); g.moveTo(128, 128); const ha = (4 + 17 / 60) / 12 * Math.PI * 2; g.lineTo(128 + Math.sin(ha) * 55, 128 - Math.cos(ha) * 55); g.stroke();
    g.lineWidth = 5; g.beginPath(); g.moveTo(128, 128); const ma = 17 / 60 * Math.PI * 2; g.lineTo(128 + Math.sin(ma) * 85, 128 - Math.cos(ma) * 85); g.stroke();
  }, 0.8, 17);
}
export function footpathSign() {
  return signTex(512, 128, (g, w, h) => {
    g.fillStyle = '#6b5a3e'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#efe6c8'; g.font = 'bold 44px Arial, sans-serif'; g.textBaseline = 'middle'; g.fillText('FOOTPATH', 30, h / 2 + 2);
    g.beginPath(); g.moveTo(w - 30, h / 2); g.lineTo(w - 90, h / 2 - 34); g.lineTo(w - 90, h / 2 + 34); g.fill(); g.fillRect(w - 160, h / 2 - 12, 80, 24);
  }, 0.8, 21);
}
export function brokenGlassTex() {
  const W = 256, c = cv(W, W), g = c.getContext('2d');
  g.fillStyle = 'rgba(170,180,175,0.42)'; g.fillRect(0, 0, W, W);
  const r = rng(66);
  g.globalCompositeOperation = 'destination-out';
  g.beginPath(); const cx = 90 + r() * 80, cy = 90 + r() * 80;
  for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2, rr = 40 + r() * 90; i ? g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) : g.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }
  g.fill();
  g.globalCompositeOperation = 'source-over'; g.strokeStyle = 'rgba(230,235,230,0.7)'; g.lineWidth = 1.5;
  for (let i = 0; i < 12; i++) { const a = r() * 7; g.beginPath(); g.moveTo(cx + Math.cos(a) * 50, cy + Math.sin(a) * 50); g.lineTo(cx + Math.cos(a) * 200, cy + Math.sin(a) * 200); g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
export function dirtyGlassTex() {
  const b = build(256, 256, (x, y, o) => { const n = N(x / 256 * 4, y / 256 * 4), n2 = N(x / 256 * 32, y / 256 * 32); o.r = 0.55 + n * 0.2; o.g = 0.58 + n * 0.2; o.b = 0.55 + n * 0.15; o.a = 0.25 + n * 0.35 + (n2 - 0.5) * 0.2; });
  const t = new THREE.CanvasTexture(b.c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
export function mushroomTex() {
  const c = cv(128, 64), g = c.getContext('2d');
  g.fillStyle = '#b4221a'; g.fillRect(0, 0, 128, 64);
  const r = rng(4); g.fillStyle = '#efe6d0';
  for (let i = 0; i < 40; i++) { g.beginPath(); g.arc(r() * 128, r() * 40, 1.5 + r() * 2.5, 0, 7); g.fill(); }
  g.fillStyle = '#e6dcc0'; g.fillRect(0, 54, 128, 10);
  return tex(c);
}
export function aoTex(v) { const d = new Uint8Array([v, v, v, 255, v, v, v, 255, v, v, v, 255, v, v, v, 255]); const t = new THREE.DataTexture(d, 2, 2); t.needsUpdate = true; return t; }
