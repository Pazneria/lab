import * as THREE from 'three';
import { makeNoise2, fbm, mulberry } from './noise.js';

const N = makeNoise2(7);
const N2 = makeNoise2(19);

function cv(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }

function tex(c, srgb = true, rep = true) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (rep) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  t.needsUpdate = true;
  return t;
}

// height (Float32Array w*h, 0..1) -> tangent-space normal map texture
function heightToNormal(hgt, w, h, strength) {
  const [c, g] = cv(w, h);
  const img = g.createImageData(w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const l = hgt[y * w + ((x - 1 + w) % w)], r = hgt[y * w + ((x + 1) % w)];
    const u = hgt[((y - 1 + h) % h) * w + x], d = hgt[((y + 1) % h) * w + x];
    let nx = (l - r) * strength, ny = (d - u) * strength, nz = 1;
    const len = Math.hypot(nx, ny, nz); nx /= len; ny /= len; nz /= len;
    const i = (y * w + x) * 4;
    img.data[i] = (nx * 0.5 + 0.5) * 255; img.data[i + 1] = (ny * 0.5 + 0.5) * 255; img.data[i + 2] = (nz * 0.5 + 0.5) * 255; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return tex(c, false);
}

// --- Exterior insulated cladding: ribbed sandwich panel, 1.2m x 1.2m per tile
export function cladding() {
  const W = 512, H = 512;
  const hgt = new Float32Array(W * H);
  const [c, g] = cv(W, H);
  const img = g.createImageData(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / H;
    // rib profile: 6 ribs per panel
    const rp = (u * 6) % 1;
    let rib = rp < 0.12 ? rp / 0.12 : rp < 0.42 ? 1 : rp < 0.54 ? 1 - (rp - 0.42) / 0.12 : 0;
    rib *= 0.6;
    // panel joint (vertical) at u=0 and horizontal at v=0
    const jx = Math.min(u, 1 - u) * W, jy = Math.min(v, 1 - v) * H;
    let joint = jx < 3 ? -0.5 : 0;
    if (jy < 3) joint = -0.5;
    const n = fbm(N, u * 8, v * 8, 4, 2, 0.5, 8);
    const hh = rib + joint + n * 0.02;
    hgt[y * W + x] = hh;
    // albedo
    const streak = Math.max(0, fbm(N2, u * 40, v * 1.5, 3, 2, 0.5, 40)) * Math.pow(v, 3) * 0.6;
    const base = [168, 62, 36];
    const k = 1 + n * 0.25 - streak * 0.5 + rib * 0.05;
    const i = (y * W + x) * 4;
    let r = base[0] * k, gg = base[1] * k, b = base[2] * k;
    if (jx < 3 || jy < 3) { r *= 0.4; gg *= 0.4; b *= 0.45; }
    img.data[i] = r; img.data[i + 1] = gg; img.data[i + 2] = b; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const map = tex(c); const normal = heightToNormal(hgt, W, H, 6);
  return { map, normal };
}

// --- Interior insulated wall panel 1.2 x 1.2 with aluminium joint strip + screws
export function interiorPanel() {
  const W = 512, H = 512;
  const hgt = new Float32Array(W * H);
  const [c, g] = cv(W, H);
  const img = g.createImageData(W, H);
  const screws = [];
  for (let k = 0; k < 8; k++) { screws.push([0.0, (k + 0.5) / 8]); screws.push([(k + 0.5) / 8, 0.0]); }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / H;
    const jx = Math.min(u, 1 - u), jy = Math.min(v, 1 - v);
    const strip = (jx < 0.022 || jy < 0.022);
    const n = fbm(N, u * 16, v * 16, 3, 2, 0.5, 16);
    // subtle quilted vinyl dimples
    const q = Math.sin(u * Math.PI * 12) * Math.sin(v * Math.PI * 12);
    let hh = strip ? 0.8 : 0.2 + q * 0.03 + n * 0.02;
    let col = strip ? [176, 178, 180] : [214, 207, 192];
    for (const s of screws) {
      let dx = Math.abs(u - s[0]); dx = Math.min(dx, 1 - dx);
      let dy = Math.abs(v - s[1]); dy = Math.min(dy, 1 - dy);
      const d = Math.hypot(dx, dy);
      if (d < 0.008) { hh = 1.0 - d * 30; col = [120, 122, 125]; if (Math.abs(dx - dy) < 0.0015 || Math.abs(dx + dy) < 0.0015) col = [70, 70, 72]; }
    }
    hgt[y * W + x] = hh;
    const k = 1 + n * 0.12;
    const i = (y * W + x) * 4;
    img.data[i] = col[0] * k; img.data[i + 1] = col[1] * k; img.data[i + 2] = col[2] * k; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return { map: tex(c), normal: heightToNormal(hgt, W, H, 4) };
}

// --- Wood plank floor (tile = 1m)
export function woodFloor() {
  const W = 512, H = 512; const rnd = mulberry(3);
  const hgt = new Float32Array(W * H);
  const [c, g] = cv(W, H);
  const img = g.createImageData(W, H);
  const rows = 6; const tints = []; const offs = [];
  for (let r = 0; r < rows; r++) { tints.push(0.8 + rnd() * 0.35); offs.push(rnd()); }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / H;
    const r = Math.floor(v * rows); const pv = (v * rows) % 1;
    const pu = (u + offs[r]) % 1;
    const seam = pv < 0.03 || pu < 0.006;
    const grain = fbm(N, pu * 0.9 + r * 3.1, pv * 2.5 + r * 7, 4, 2, 0.5);
    const ring = Math.sin((grain * 9 + pv * 5) * Math.PI) * 0.5 + 0.5;
    const t = tints[r] * (0.85 + ring * 0.15 + fbm(N2, u * 60, v * 4, 2) * 0.1);
    const wear = Math.max(0, fbm(N2, u * 3, v * 3, 3, 2, 0.5, 3)) * 0.25;
    let col = [150 * t * (1 + wear), 104 * t * (1 + wear), 66 * t];
    if (seam) col = col.map(q => q * 0.35);
    hgt[y * W + x] = seam ? 0 : 0.5 + ring * 0.05;
    const i = (y * W + x) * 4;
    img.data[i] = col[0]; img.data[i + 1] = col[1]; img.data[i + 2] = col[2]; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return { map: tex(c), normal: heightToNormal(hgt, W, H, 3) };
}

// --- Rubber coin mat (tile = 0.5m)
export function rubberMat() {
  const W = 256, H = 256;
  const hgt = new Float32Array(W * H);
  const [c, g] = cv(W, H);
  const img = g.createImageData(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / H;
    const cu = ((u * 8) % 1) - 0.5, cvv = ((v * 8) % 1) - 0.5;
    const d = Math.hypot(cu, cvv);
    const coin = d < 0.3 ? (d > 0.24 ? 1 : 0.85) : 0;
    const n = fbm(N, u * 10, v * 10, 3, 2, 0.5, 10);
    hgt[y * W + x] = coin;
    const k = 38 + n * 10 + coin * 6;
    const i = (y * W + x) * 4;
    img.data[i] = k; img.data[i + 1] = k + 1; img.data[i + 2] = k + 3; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return { map: tex(c), normal: heightToNormal(hgt, W, H, 3) };
}

// --- Snow micro-detail normal (tileable, tile = 4m)
export function snowDetail() {
  const W = 512, H = 512;
  const hgt = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / H;
    // wind ripples elongated across x + grain
    const rip = fbm(N, u * 6, v * 28, 3, 2, 0.5, 6);
    const ridged = 1 - Math.abs(rip);
    const grain = fbm(N2, u * 64, v * 64, 2, 2, 0.5, 64);
    hgt[y * W + x] = ridged * 0.5 + grain * 0.12 + fbm(N, u * 12, v * 12, 3, 2, 0.5, 12) * 0.2;
  }
  return heightToNormal(hgt, W, H, 10);
}

// --- Steel grating (tile = 0.5m)
export function grating() {
  const W = 256, H = 256;
  const [c, g] = cv(W, H);
  g.fillStyle = '#1a1c1e'; g.fillRect(0, 0, W, H);
  g.fillStyle = '#7a7f84';
  for (let i = 0; i < 8; i++) g.fillRect(i * 32, 0, 6, H);
  g.fillStyle = '#5d6266';
  for (let j = 0; j < 4; j++) g.fillRect(0, j * 64, W, 4);
  return tex(c);
}

// --- Window frost (corners)
export function windowFrost() {
  const W = 256, H = 256; const rnd = mulberry(11);
  const [c, g] = cv(W, H);
  const img = g.createImageData(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / H;
    const e = Math.min(u, 1 - u, v, 1 - v);
    const corner = Math.min(Math.hypot(Math.min(u, 1 - u), Math.min(v, 1 - v)), 1);
    const n = fbm(N, u * 14, v * 14, 5, 2.1, 0.55);
    let a = 1 - (Math.min(e * 5.5, corner * 3.2) - n * 0.6);
    a = Math.max(0, Math.min(1, a));
    a = Math.pow(a, 1.6);
    const i = (y * W + x) * 4;
    img.data[i] = 235; img.data[i + 1] = 243; img.data[i + 2] = 255; img.data[i + 3] = a * 235;
  }
  g.putImageData(img, 0, 0);
  // a few fern-like streaks
  g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 1;
  for (let k = 0; k < 40; k++) {
    let x = rnd() < 0.5 ? rnd() * 40 : W - rnd() * 40, y = rnd() < 0.5 ? rnd() * 40 : H - rnd() * 40;
    let a = rnd() * Math.PI * 2;
    g.beginPath(); g.moveTo(x, y);
    for (let s = 0; s < 12; s++) { a += (rnd() - 0.5) * 0.6; x += Math.cos(a) * 4; y += Math.sin(a) * 4; g.lineTo(x, y); }
    g.stroke();
  }
  const t = tex(c, true, false);
  return t;
}

// --- Simple text label
export function label(text, opts = {}) {
  const { w = 256, h = 128, bg = '#e9e4d6', fg = '#1c1c1c', font = 'bold 44px sans-serif', sub = '', border = true } = opts;
  const [c, g] = cv(w, h);
  g.fillStyle = bg; g.fillRect(0, 0, w, h);
  if (border) { g.strokeStyle = fg; g.lineWidth = 6; g.strokeRect(6, 6, w - 12, h - 12); }
  g.fillStyle = fg; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, w / 2, sub ? h * 0.4 : h / 2);
  if (sub) { g.font = '22px monospace'; g.fillText(sub, w / 2, h * 0.75); }
  return tex(c, true, false);
}

// --- Whiteboard with field notes
export function whiteboard() {
  const W = 1024, H = 512; const rnd = mulberry(5);
  const [c, g] = cv(W, H);
  g.fillStyle = '#f2f3f0'; g.fillRect(0, 0, W, H);
  // smudges
  for (let i = 0; i < 30; i++) { g.fillStyle = `rgba(120,130,140,${rnd() * 0.05})`; g.beginPath(); g.ellipse(rnd() * W, rnd() * H, 40 + rnd() * 120, 10 + rnd() * 30, rnd(), 0, 7); g.fill(); }
  g.fillStyle = '#1b3f8a'; g.font = 'bold 40px "Segoe Print", "Comic Sans MS", cursive';
  g.fillText('FIELD LOG  — WK 41', 40, 64);
  g.font = '28px "Segoe Print", "Comic Sans MS", cursive';
  const lines = ['AWS-2 batt: 12.4V  ✓', 'Snow pit 3: density 0.38 g/cc', 'Core C-17  0–1.2 m  bag+label', 'Gen service @ 1240 h', 'Wind: 14 kt SE, −31 °C'];
  lines.forEach((l, i) => g.fillText(l, 50, 130 + i * 52));
  g.fillStyle = '#9b1e1e'; g.fillText('!! check fuel line heater', 50, 130 + 5 * 52 + 20);
  // little graph
  g.strokeStyle = '#1e6b3a'; g.lineWidth = 3; g.beginPath();
  g.moveTo(620, 380); for (let i = 0; i < 14; i++) g.lineTo(620 + i * 25, 380 - 100 * Math.abs(Math.sin(i * 0.7)) - i * 6);
  g.stroke(); g.strokeStyle = '#333'; g.lineWidth = 2; g.beginPath(); g.moveTo(610, 160); g.lineTo(610, 390); g.lineTo(980, 390); g.stroke();
  g.fillStyle = '#333'; g.font = '22px sans-serif'; g.fillText('temp (°C) vs depth', 700, 420);
  return tex(c, true, false);
}

// --- Map / chart poster
export function mapPoster() {
  const W = 512, H = 640;
  const [c, g] = cv(W, H);
  g.fillStyle = '#dfe7ea'; g.fillRect(0, 0, W, H);
  const img = g.getImageData(0, 0, W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const n = fbm(N, x / 140, y / 140, 5) + 0.15 - Math.hypot(x - W / 2, y - H / 2) / 900;
    const i = (y * W + x) * 4;
    if (n > 0) {
      const band = Math.floor(n * 22) % 2;
      img.data[i] = 236 - band * 14; img.data[i + 1] = 240 - band * 10; img.data[i + 2] = 245 - band * 4;
      if (Math.abs((n * 22) % 1) < 0.08) { img.data[i] = 120; img.data[i + 1] = 150; img.data[i + 2] = 175; }
    } else { img.data[i] = 120; img.data[i + 1] = 155; img.data[i + 2] = 190; }
  }
  g.putImageData(img, 0, 0);
  g.strokeStyle = 'rgba(40,40,60,0.35)'; g.lineWidth = 1;
  for (let i = 0; i < W; i += 64) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, H); g.stroke(); }
  for (let i = 0; i < H; i += 64) { g.beginPath(); g.moveTo(0, i); g.lineTo(W, i); g.stroke(); }
  g.fillStyle = '#c0281e'; g.beginPath(); g.arc(270, 330, 7, 0, 7); g.fill();
  g.font = 'bold 20px sans-serif'; g.fillText('CAMP', 284, 336);
  g.fillStyle = '#222'; g.font = 'bold 28px sans-serif'; g.fillText('SECTOR 4 — 1:50 000', 20, 40);
  return tex(c, true, false);
}

export function stoveGlow() {
  const [c, g] = cv(128, 128);
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,220,170,1)'); gr.addColorStop(0.25, 'rgba(255,170,90,0.45)'); gr.addColorStop(1, 'rgba(255,140,60,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  return tex(c, true, false);
}

// --- Frost creeping in from one edge (u=0 is the cold edge), fades to nothing
export function frostEdge() {
  const W = 128, H = 512;
  const [c, g] = cv(W, H);
  const img = g.createImageData(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / H;
    const n = fbm(N, u * 6, v * 22, 5, 2.1, 0.55);
    const low = 1 - v * 0.5;                // heavier near floor (v=1 is bottom in canvas)
    let a = (1 - u) * 1.3 * (0.6 + 0.4 * (1 - (1 - v))) + n * 0.9 - 0.45;
    a = Math.max(0, Math.min(1, a * 1.6)) * Math.min(1, (1 - u) * 3) * Math.min(1, v * 6, (1 - v) * 20);
    const i = (y * W + x) * 4;
    img.data[i] = 236; img.data[i + 1] = 244; img.data[i + 2] = 255; img.data[i + 3] = a * 200 * (low > 0 ? 1 : 1);
  }
  g.putImageData(img, 0, 0);
  return tex(c, true, false);
}
