// Procedural canvas textures (generated once at load, tileable).
import * as THREE from 'three';

export function hash2(x, y, s) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(s | 0, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
function vnoise(x, y, px, py, s) {
  const ix = Math.floor(x), iy = Math.floor(y);
  let fx = x - ix, fy = y - iy;
  fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
  const x0 = ((ix % px) + px) % px, x1 = (x0 + 1) % px;
  const y0 = ((iy % py) + py) % py, y1 = (y0 + 1) % py;
  const a = hash2(x0, y0, s), b = hash2(x1, y0, s), c = hash2(x0, y1, s), d = hash2(x1, y1, s);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}
// tileable fbm: u,v in [0,1)
export function fbm(u, v, f, oct, s, fy) {
  let sum = 0, amp = 0.5, norm = 0, fxq = f, fyq = fy || f;
  for (let o = 0; o < oct; o++) {
    sum += amp * vnoise(u * fxq, v * fyq, fxq, fyq, s + o * 17);
    norm += amp; amp *= 0.5; fxq *= 2; fyq *= 2;
  }
  return sum / norm;
}
const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

function finish(canvas, srgb) {
  const t = new THREE.CanvasTexture(canvas);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}

export function genTex(w, h, fn, post) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const b = document.createElement('canvas'); b.width = w; b.height = h;
  const cx = c.getContext('2d'), bx = b.getContext('2d');
  const ci = cx.createImageData(w, h), bi = bx.createImageData(w, h);
  const o = [0, 0, 0, 0.5];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      fn(x / w, y / h, x, y, o);
      const i = (y * w + x) * 4;
      ci.data[i] = o[0] * 255; ci.data[i + 1] = o[1] * 255; ci.data[i + 2] = o[2] * 255; ci.data[i + 3] = 255;
      const hv = o[3] * 255;
      bi.data[i] = hv; bi.data[i + 1] = hv; bi.data[i + 2] = hv; bi.data[i + 3] = 255;
    }
  }
  cx.putImageData(ci, 0, 0); bx.putImageData(bi, 0, 0);
  if (post) post(cx, bx, w, h);
  return { map: finish(c, true), bump: finish(b, false) };
}

export function plasterTex() {
  return genTex(512, 512, (u, v, x, y, o) => {
    const n = fbm(u, v, 4, 5, 11), f = fbm(u, v, 32, 3, 12), s = fbm(u, v, 3, 3, 13);
    const k = 0.83 + 0.07 * (n - 0.5) + 0.05 * (f - 0.5) - 0.06 * sm(0.62, 0.8, s);
    o[0] = k * 0.965; o[1] = k * 0.975; o[2] = k; o[3] = 0.5 + 0.35 * (f - 0.5) + 0.2 * (n - 0.5);
  });
}

export function concreteTex() {
  return genTex(1024, 1024, (u, v, x, y, o) => {
    const n = fbm(u, v, 6, 5, 21), f = fbm(u, v, 48, 2, 22), d = fbm(u, v, 3, 4, 23), st = fbm(u, v, 9, 3, 24);
    let k = 0.5 + 0.12 * (n - 0.5) + 0.06 * (f - 0.5) + (hash2(x, y, 5) - 0.5) * 0.035;
    let r = k, g = k * 0.985, b = k * 0.965;
    const dust = sm(0.42, 0.75, d) * 0.6;
    r += (0.74 - r) * dust; g += (0.67 - g) * dust; b += (0.58 - b) * dust;
    const stain = sm(0.6, 0.78, st) * 0.07;
    r -= stain * 0.6; g -= stain * 0.65; b -= stain * 0.7;
    const jx = Math.min(x % 512, 512 - (x % 512)), jy = Math.min(y % 512, 512 - (y % 512));
    const joint = Math.min(jx, jy) < 2 ? 0.55 : 1;
    o[0] = r * joint; o[1] = g * joint; o[2] = b * joint;
    o[3] = (joint < 1 ? 0.1 : 0.55) + 0.2 * (f - 0.5) + 0.1 * (n - 0.5);
  });
}

export function woodTex(seed, base, dusty) {
  const [br, bg, bb] = base || [0.52, 0.37, 0.24];
  return genTex(512, 512, (u, v, x, y, o) => {
    const warp = fbm(u, v, 2, 3, seed + 1, 6) * 7;
    const ring = 0.5 + 0.5 * Math.sin((v * 46 + warp) * Math.PI);
    const fib = fbm(u, v, 3, 3, seed + 2, 160);
    const n = fbm(u, v, 4, 4, seed + 3);
    let k = 0.78 + 0.22 * ring * 0.8 + 0.18 * (fib - 0.5) + 0.12 * (n - 0.5);
    let r = br * k, g = bg * k, b = bb * k;
    if (dusty) {
      const d = sm(0.35, 0.75, fbm(u, v, 5, 4, seed + 9)) * dusty + 0.12 * dusty;
      r += (0.8 - r) * d; g += (0.75 - g) * d; b += (0.68 - b) * d;
    }
    o[0] = r; o[1] = g; o[2] = b; o[3] = 0.5 + 0.25 * (ring - 0.5) + 0.25 * (fib - 0.5);
  });
}

export function benchTopTex() {
  return genTex(1024, 512, (u, v, x, y, o) => {
    const warp = fbm(u, v, 2, 3, 41, 4) * 6;
    const ring = 0.5 + 0.5 * Math.sin((v * 28 + warp) * Math.PI);
    const fib = fbm(u, v, 4, 3, 42, 140);
    const n = fbm(u, v, 5, 4, 43);
    let k = 0.75 + 0.18 * ring + 0.16 * (fib - 0.5);
    let r = 0.55 * k, g = 0.42 * k, b = 0.3 * k;
    // board seams every 1/4 of v
    const sv = (v * 4) % 1; const seam = Math.min(sv, 1 - sv) < 0.006 ? 0.45 : 1;
    const d = sm(0.3, 0.7, fbm(u, v, 6, 5, 44)) * 0.75 + 0.15;
    r += (0.78 - r) * d; g += (0.71 - g) * d; b += (0.62 - b) * d;
    const wet = sm(0.62, 0.75, fbm(u, v, 7, 3, 45)) * 0.35;
    r -= wet * 0.25; g -= wet * 0.28; b -= wet * 0.3;
    o[0] = r * seam; o[1] = g * seam; o[2] = b * seam;
    o[3] = (seam < 1 ? 0.15 : 0.55) + 0.2 * (fib - 0.5) + 0.15 * (n - 0.5);
  }, (cx, bx, w, h) => {
    // slip rings and clay smears
    let s = 7;
    const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 26; i++) {
      cx.strokeStyle = `rgba(${150 + r() * 40},${115 + r() * 30},${85 + r() * 25},${0.25 + r() * 0.3})`;
      cx.lineWidth = 2 + r() * 6;
      cx.beginPath(); cx.arc(r() * w, r() * h, 18 + r() * 40, 0, Math.PI * 2 * (0.6 + r() * 0.4)); cx.stroke();
    }
    for (let i = 0; i < 40; i++) {
      cx.fillStyle = `rgba(${130 + r() * 50},${100 + r() * 30},${75 + r() * 20},${0.12 + r() * 0.25})`;
      const x = r() * w, y = r() * h;
      cx.beginPath(); cx.ellipse(x, y, 6 + r() * 40, 3 + r() * 12, r() * 3, 0, Math.PI * 2); cx.fill();
    }
    // knife scores
    cx.strokeStyle = 'rgba(60,40,25,0.35)'; cx.lineWidth = 1;
    for (let i = 0; i < 30; i++) { const x = r() * w, y = r() * h, a = r() * 3; cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + Math.cos(a) * 60, y + Math.sin(a) * 60); cx.stroke(); }
  });
}

export function brickTex(opt) {
  const { w = 1024, h = 512, cols = 5, rows = 8, mortar = 9, palette, mortarCol = [0.62, 0.59, 0.54], seed = 1, soot = 0, jitter = 0.18 } = opt;
  return genTex(w, h, (u, v, x, y, o) => {
    const rh = h / rows, bw = w / cols;
    const row = Math.floor(y / rh), off = (row % 2) * 0.5;
    const bxF = x / bw + off, col = Math.floor(bxF);
    const fx = (bxF - col) * bw, fy = y - row * rh;
    const ci = ((col % cols) + cols) % cols;
    const h1 = hash2(ci, row, seed), h2 = hash2(ci, row, seed + 7), h3 = hash2(ci, row, seed + 3);
    const pc = palette[Math.floor(h1 * palette.length)];
    const n = fbm(u, v, 8, 4, seed + 20), f = fbm(u, v, 64, 2, seed + 30);
    const m = mortar / 2 + (fbm(u, v, 24, 2, seed + 40) - 0.5) * 3;
    const dEdge = Math.min(fx, bw - fx, fy, rh - fy);
    const sootK = soot ? sm(0.4, 0.8, fbm(u, v, 3, 3, seed + 50)) * soot : 0;
    if (dEdge < m) {
      const k = 0.92 + 0.2 * (n - 0.5) + 0.1 * (f - 0.5);
      o[0] = mortarCol[0] * k; o[1] = mortarCol[1] * k; o[2] = mortarCol[2] * k;
      o[3] = 0.18 + 0.1 * f;
    } else {
      const k = 0.85 + 0.35 * (n - 0.5) + 0.22 * (f - 0.5) + (h2 - 0.5) * jitter;
      const burnt = h3 > 0.86 ? 0.7 + 0.3 * (fx / bw) : 1;
      o[0] = pc[0] * k * burnt; o[1] = pc[1] * k * burnt; o[2] = pc[2] * k * burnt;
      const bev = sm(m, m + 5, dEdge);
      o[3] = 0.35 + 0.4 * bev + 0.18 * (f - 0.5) + 0.1 * (n - 0.5);
    }
    if (sootK) { o[0] *= 1 - sootK; o[1] *= 1 - sootK; o[2] *= 1 - sootK * 0.95; }
  });
}

export function gravelTex() {
  return genTex(512, 512, (u, v, x, y, o) => {
    const n = fbm(u, v, 8, 3, 61);
    o[0] = 0.42 + 0.1 * n; o[1] = 0.39 + 0.1 * n; o[2] = 0.35 + 0.08 * n; o[3] = 0.2;
  }, (cx, bx, w, h) => {
    let s = 3; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 5200; i++) {
      const x = r() * w, y = r() * h, rx = 2 + r() * 6, ry = 2 + r() * 5, a = r() * 3;
      const g = 95 + r() * 110, t = r() * 25;
      for (const [ox, oy] of [[0, 0], [w, 0], [-w, 0], [0, h], [0, -h]]) {
        cx.fillStyle = `rgb(${g + t},${g + t * 0.6},${g - 5})`;
        cx.beginPath(); cx.ellipse(x + ox, y + oy, rx, ry, a, 0, 6.3); cx.fill();
        bx.fillStyle = `rgb(${150 + r() * 100},${150},${150})`;
        bx.beginPath(); bx.ellipse(x + ox, y + oy, rx, ry, a, 0, 6.3); bx.fill();
      }
    }
  });
}

export function roofTileTex() {
  return genTex(512, 512, (v, u, x, y, o) => {
    const cols = 8, rows = 6;
    const row = Math.floor(v * rows), off = (row % 2) * 0.5;
    const cu = u * cols + off, ci = Math.floor(cu), fu = cu - ci, fv = v * rows - row;
    const h1 = hash2(((ci % cols) + cols) % cols, row, 71);
    const curve = Math.sin(fu * Math.PI);
    const n = fbm(u, v, 8, 4, 72);
    const lap = sm(0.0, 0.18, fv);
    let k = (0.55 + 0.45 * curve) * (0.55 + 0.45 * lap) * (0.85 + 0.3 * (n - 0.5));
    o[0] = (0.58 + h1 * 0.12) * k; o[1] = (0.3 + h1 * 0.06) * k; o[2] = (0.2 + h1 * 0.03) * k;
    const moss = sm(0.6, 0.8, fbm(u, v, 5, 3, 73)) * 0.4;
    o[0] += (0.35 - o[0]) * moss; o[1] += (0.36 - o[1]) * moss; o[2] += (0.22 - o[2]) * moss;
    o[3] = curve * 0.6 + lap * 0.3 + 0.1 * n;
  });
}

export function corrugatedTex() {
  return genTex(256, 256, (u, v, x, y, o) => {
    const c = 0.5 + 0.5 * Math.sin(u * 16 * Math.PI * 2);
    const n = fbm(u, v, 4, 4, 81), rust = sm(0.62, 0.82, fbm(u, v, 6, 4, 82)) * 0.55;
    const k = 0.5 + 0.25 * c + 0.1 * (n - 0.5);
    o[0] = k * 0.78 + rust * 0.25; o[1] = k * 0.8 + rust * 0.08; o[2] = k * 0.82 - rust * 0.05; o[3] = c;
  });
}

export function steelTex() {
  return genTex(256, 256, (u, v, x, y, o) => {
    const n = fbm(u, v, 6, 5, 91), rust = sm(0.55, 0.75, fbm(u, v, 5, 4, 92));
    const k = 0.32 + 0.12 * (n - 0.5);
    o[0] = k + rust * 0.22; o[1] = k * 0.98 + rust * 0.07; o[2] = k * 1.02 - rust * 0.04; o[3] = 0.5 + 0.3 * (n - 0.5) + rust * 0.2;
  });
}

export function canvasClothTex() {
  return genTex(256, 256, (u, v, x, y, o) => {
    const wv = ((x >> 1) + (y >> 1)) % 2 ? 1 : 0.85;
    const d = sm(0.3, 0.7, fbm(u, v, 4, 4, 101));
    const k = 0.95 * wv;
    o[0] = (0.74 - d * 0.18) * k; o[1] = (0.68 - d * 0.2) * k; o[2] = (0.58 - d * 0.2) * k; o[3] = wv * 0.6;
  });
}

export function groundTex() {
  return genTex(512, 512, (u, v, x, y, o) => {
    const n = fbm(u, v, 6, 5, 111), g = fbm(u, v, 3, 3, 112), f = fbm(u, v, 64, 2, 113);
    const grass = sm(0.4, 0.6, g);
    o[0] = (0.42 * (1 - grass) + 0.26 * grass) * (0.85 + 0.3 * (n - 0.5) + 0.15 * (f - 0.5));
    o[1] = (0.36 * (1 - grass) + 0.36 * grass) * (0.85 + 0.3 * (n - 0.5) + 0.15 * (f - 0.5));
    o[2] = (0.28 * (1 - grass) + 0.16 * grass) * (0.85 + 0.3 * (n - 0.5));
    o[3] = f;
  });
}

export function sootTex() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, 'rgba(14,10,8,0.85)'); g.addColorStop(0.5, 'rgba(18,14,10,0.45)'); g.addColorStop(1, 'rgba(20,16,12,0)');
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function labelTex() {
  // sheet of paper labels / glaze chart for the glazing wall
  const c = document.createElement('canvas'); c.width = 512; c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = '#e9e2d0'; x.fillRect(0, 0, 512, 256);
  x.fillStyle = '#3b2f25'; x.font = 'bold 26px Georgia'; x.fillText('GLAZE RECIPES  cone 10 R', 18, 36);
  x.font = '17px Georgia';
  const lines = ['Celadon  - feldspar 25, silica 30, whiting 20, kaolin 25 + RIO 1',
    'Tenmoku  - custer 40, silica 25, whiting 15, kaolin 10 + RIO 10',
    'Shino    - nepheline 60, spodumene 20, EPK 20, soda ash 3',
    'Ash      - wood ash 40, feldspar 40, ball clay 20',
    'Copper R - ferro 3134 15, custer 45 ... + Cu carb 0.5, tin 1',
    'Cobalt   - base white + cobalt carb 1.5',
    'test 14 - too runny! add 5 EPK'];
  lines.forEach((l, i) => x.fillText(l, 18, 72 + i * 26));
  x.strokeStyle = 'rgba(120,90,60,0.4)'; x.lineWidth = 6; x.beginPath(); x.arc(420, 200, 30, 0, 5); x.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}

export function chalkTex() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 320;
  const x = c.getContext('2d');
  x.fillStyle = '#26302b'; x.fillRect(0, 0, 512, 320);
  for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(200,210,200,${0.03 + Math.random() * 0.05})`; x.beginPath(); x.ellipse(Math.random() * 512, Math.random() * 320, 30 + Math.random() * 80, 8 + Math.random() * 20, Math.random() * 3, 0, 6.3); x.fill(); }
  x.fillStyle = 'rgba(235,235,225,0.9)'; x.font = 'italic 30px Georgia'; x.fillText('Firing log', 24, 44);
  x.font = '20px Georgia';
  ['Mon  bisque  cone 06  - 2 shelves', 'Wed  glaze   cone 10R  reduction 1000C', 'Thu  unload after 12:00!', 'Order: 10 bags buff, 2 porcelain', 'Mugs x24 for market - handles Tue'].forEach((l, i) => x.fillText(l, 28, 90 + i * 40));
  x.strokeStyle = 'rgba(235,235,225,0.6)'; x.lineWidth = 2; x.beginPath(); x.moveTo(24, 56); x.lineTo(170, 56); x.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
