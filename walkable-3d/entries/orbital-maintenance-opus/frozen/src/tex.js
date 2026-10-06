// Procedural canvas textures. Each PBR texture is painted twice with the same seeded RNG:
// once for colour, once for a data map (R = bump height, G = roughness, B = metalness).
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

let ANISO = 8;
export const setAniso = (a) => { ANISO = a; };

function canvas(w, h = w) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function hexRgb(hex) { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
// colour for the active pass
function enc(mode, hex, h, r, m, a = 1) {
  if (mode === 'color') { const [R, G, B] = hexRgb(hex); return `rgba(${R},${G},${B},${a})`; }
  return `rgba(${Math.round(h * 255)},${Math.round(r * 255)},${Math.round(m * 255)},${a})`;
}

function finish(c, srgb) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = ANISO;
  return t;
}

export function pbr(size, seed, paint) {
  const c = canvas(size), d = canvas(size);
  paint(c.getContext('2d'), 'color', rng(seed), size);
  paint(d.getContext('2d'), 'data', rng(seed), size);
  return { map: finish(c, true), data: finish(d, false) };
}

function blob(ctx, R, x, y, rad, pts = 7) {
  ctx.beginPath();
  for (let i = 0; i < pts; i++) {
    const a = (i / pts) * Math.PI * 2, rr = rad * (0.45 + R() * 0.75);
    const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr;
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
  }
  ctx.closePath(); ctx.fill();
}

// Generic worn painted metal: mottling, speckle, grime runs, seams + rivets, chipped edges, scratches.
export function paintedMetal(o) {
  const { base, light, dark, chip = '#9ea2a4', seams = 0, rivets = 0, rough = 0.55, chips = 1, grime = 1, stencil = null, mottle = 0.07 } = o;
  return (ctx, mode, R, S) => {
    const P = (c, h, r, m, a) => enc(mode, c, h, r, m, a);
    ctx.fillStyle = P(base, 0.55, rough, 0.08); ctx.fillRect(0, 0, S, S);
    for (let i = 0; i < 700; i++) {
      const x = R() * S, y = R() * S, rad = 8 + R() * 50, t = R();
      ctx.fillStyle = P(t > 0.5 ? light : dark, 0.55, rough + (R() - 0.5) * 0.25, 0.08, mottle);
      ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill();
    }
    for (let i = 0; i < 4000; i++) {
      const x = R() * S, y = R() * S, w = 1 + R() * 2;
      ctx.fillStyle = P(R() > 0.5 ? light : dark, 0.5 + R() * 0.12, rough, 0.08, mottle * 3.5 * R());
      ctx.fillRect(x, y, w, w);
    }
    // grime runs (downwards in world)
    for (let i = 0; i < 26 * grime; i++) {
      const x = R() * S, y = R() * S, w = 2 + R() * 14, l = 40 + R() * 260;
      const g = ctx.createLinearGradient(0, y, 0, y + l);
      g.addColorStop(0, P('#2a2620', 0.5, Math.min(1, rough + 0.25), 0.05, 0.28));
      g.addColorStop(1, P('#2a2620', 0.5, rough, 0.05, 0));
      ctx.fillStyle = g; ctx.fillRect(x, y, w, l);
    }
    const lines = [];
    if (seams) for (let k = 0; k < seams; k++) lines.push((k * S) / seams);
    for (const s of lines) {
      ctx.fillStyle = P('#1c1d1e', 0.12, 0.7, 0.2, 0.85); ctx.fillRect(s, 0, 3, S); ctx.fillRect(0, s, S, 3);
      ctx.fillStyle = P(light, 0.75, rough, 0.1, 0.6); ctx.fillRect(s + 3, 0, 1, S); ctx.fillRect(0, s + 3, S, 1);
      // seam grime + chips along edges
      for (let i = 0; i < 70 * chips; i++) {
        const along = R() * S, off = (R() - 0.5) * 22, vert = R() > 0.5;
        ctx.fillStyle = P(chip, 0.42, 0.32, 0.92, 0.95);
        blob(ctx, R, vert ? s + off : along, vert ? along : s + off, 1.5 + R() * 6);
      }
    }
    if (rivets) for (const s of lines) {
      const n = rivets;
      for (let i = 0; i < n; i++) {
        const a = ((i + 0.5) / n) * S;
        for (const [x, y] of [[s + 12, a], [a, s + 12]]) {
          ctx.fillStyle = P('#1d1e1f', 0.35, 0.6, 0.3, 0.6); ctx.beginPath(); ctx.arc(x + 1, y + 1, 4.5, 0, 7); ctx.fill();
          ctx.fillStyle = P(light, 1.0, rough - 0.1, 0.3); ctx.beginPath(); ctx.arc(x, y, 3.5, 0, 7); ctx.fill();
        }
      }
    }
    // random chips & scuffs
    for (let i = 0; i < 160 * chips; i++) {
      const x = R() * S, y = R() * S;
      ctx.fillStyle = P('#3a3530', 0.45, 0.6, 0.5, 0.35); blob(ctx, R, x + 1, y + 1, 1 + R() * 4);
      ctx.fillStyle = P(chip, 0.45, 0.3, 0.95, 0.9); blob(ctx, R, x, y, 0.8 + R() * 4);
    }
    ctx.lineCap = 'round';
    for (let i = 0; i < 90; i++) {
      const x = R() * S, y = R() * S, a = R() * Math.PI, l = 8 + R() * 70;
      ctx.strokeStyle = P(chip, 0.5, 0.3, 0.85, 0.35 + R() * 0.4); ctx.lineWidth = 0.6 + R() * 1.2;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); ctx.stroke();
    }
    if (stencil) stencil(ctx, mode, R, S, P);
  };
}

// Anti-slip deck plate floor with tile seams, worn traffic paths, oil stains.
export function floorPaint(ctx, mode, R, S) {
  const P = (c, h, r, m, a) => enc(mode, c, h, r, m, a);
  ctx.fillStyle = P('#3f4246', 0.45, 0.62, 0.35); ctx.fillRect(0, 0, S, S);
  for (let i = 0; i < 500; i++) {
    ctx.fillStyle = P(R() > 0.5 ? '#4b4e52' : '#34373a', 0.45, 0.55 + R() * 0.2, 0.35, 0.12);
    ctx.beginPath(); ctx.arc(R() * S, R() * S, 10 + R() * 60, 0, 7); ctx.fill();
  }
  // diamond tread
  const step = 22;
  for (let y = 0; y < S; y += step) for (let x = 0; x < S; x += step) {
    const odd = ((x + y) / step) & 1, cx = x + step / 2, cy = y + step / 2;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(odd ? 0.785 : -0.785);
    ctx.fillStyle = P('#1e2022', 0.2, 0.7, 0.3, 0.5); ctx.fillRect(-7, -1.5, 15, 4.5);
    ctx.fillStyle = P(R() > 0.82 ? '#8d9196' : '#5b5f63', 0.95, 0.42, 0.7); ctx.fillRect(-7, -2.5, 14, 3.5);
    ctx.restore();
  }
  // worn polish
  for (let i = 0; i < 40; i++) {
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    const x = R() * S, y = R() * S, r = 40 + R() * 120;
    g.addColorStop(0, P('#8a8e92', 0.6, 0.35, 0.75, 0.22)); g.addColorStop(1, P('#8a8e92', 0.6, 0.35, 0.75, 0));
    ctx.save(); ctx.translate(x, y); ctx.scale(r, r * (0.4 + R())); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 1, 0, 7); ctx.fill(); ctx.restore();
  }
  // oil / coolant stains
  for (let i = 0; i < 9; i++) {
    const x = R() * S, y = R() * S;
    ctx.fillStyle = P('#17140f', 0.45, 0.18, 0.2, 0.35); blob(ctx, R, x, y, 12 + R() * 40, 11);
    ctx.fillStyle = P('#17140f', 0.45, 0.12, 0.2, 0.25); blob(ctx, R, x + 6, y + 4, 6 + R() * 20, 9);
  }
  // scuff arcs (cart wheels)
  ctx.lineCap = 'round';
  for (let i = 0; i < 26; i++) {
    const a0 = R() * 6;
    ctx.strokeStyle = P('#141414', 0.45, 0.75, 0.1, 0.12 + R() * 0.18); ctx.lineWidth = 1.5 + R() * 3;
    ctx.beginPath(); ctx.arc(R() * S, R() * S, 80 + R() * 220, a0, a0 + 0.12 + R() * 0.3); ctx.stroke();
  }
  // tile seams + countersunk bolts
  for (const s of [0, S / 2]) {
    ctx.fillStyle = P('#0d0e0f', 0.05, 0.8, 0.2); ctx.fillRect(s, 0, 4, S); ctx.fillRect(0, s, S, 4);
    for (let i = 0; i < 8; i++) {
      const a = (i + 0.5) * S / 8;
      for (const [x, y] of [[s + 18, a], [a, s + 18]]) {
        ctx.fillStyle = P('#202224', 0.2, 0.6, 0.6); ctx.beginPath(); ctx.arc(x, y, 7, 0, 7); ctx.fill();
        ctx.fillStyle = P('#9a9ea2', 0.55, 0.35, 0.9); ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fill();
        ctx.fillStyle = P('#1a1a1a', 0.3, 0.6, 0.5); ctx.fillRect(x - 3.5, y - 1, 7, 2);
      }
    }
  }
}

export function machinedPaint(ctx, mode, R, S) {
  const P = (c, h, r, m, a) => enc(mode, c, h, r, m, a);
  ctx.fillStyle = P('#b5b9bd', 0.5, 0.26, 1.0); ctx.fillRect(0, 0, S, S);
  for (let i = 0; i < 1400; i++) {
    const y = R() * S, l = 40 + R() * S * 0.8, x = R() * S, v = R();
    ctx.fillStyle = P(v > 0.5 ? '#d4d8dc' : '#8e9296', 0.5 + (v - 0.5) * 0.1, 0.18 + R() * 0.18, 1.0, 0.22);
    ctx.fillRect(x, y, l, 1);
  }
  for (let i = 0; i < 25; i++) {
    ctx.fillStyle = P('#6d6a62', 0.5, 0.45, 0.85, 0.12); blob(ctx, R, R() * S, R() * S, 6 + R() * 26, 9);
  }
}

export function gunmetalPaint(ctx, mode, R, S) {
  const P = (c, h, r, m, a) => enc(mode, c, h, r, m, a);
  ctx.fillStyle = P('#3b3f43', 0.5, 0.42, 0.85); ctx.fillRect(0, 0, S, S);
  for (let i = 0; i < 6000; i++) {
    ctx.fillStyle = P(R() > 0.5 ? '#4c5156' : '#2c2f32', 0.4 + R() * 0.2, 0.35 + R() * 0.25, 0.85, 0.35);
    ctx.fillRect(R() * S, R() * S, 1 + R() * 2, 1 + R() * 2);
  }
  for (let i = 0; i < 60; i++) {
    ctx.strokeStyle = P('#9aa0a6', 0.5, 0.25, 1, 0.3); ctx.lineWidth = 0.7;
    const x = R() * S, y = R() * S, a = R() * 3.14, l = 10 + R() * 50;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); ctx.stroke();
  }
}

export function hazardPaint(ctx, mode, R, S) {
  const P = (c, h, r, m, a) => enc(mode, c, h, r, m, a);
  ctx.fillStyle = P('#d8a21a', 0.55, 0.5, 0.05); ctx.fillRect(0, 0, S, S);
  ctx.fillStyle = P('#161616', 0.55, 0.55, 0.05);
  for (let k = -4; k < 8; k++) {
    ctx.beginPath(); const x = k * S / 4;
    ctx.moveTo(x, 0); ctx.lineTo(x + S / 8, 0); ctx.lineTo(x + S / 8 + S, S); ctx.lineTo(x + S, S); ctx.closePath(); ctx.fill();
  }
  for (let i = 0; i < 220; i++) { ctx.fillStyle = P('#8d9195', 0.4, 0.32, 0.9, 0.9); blob(ctx, R, R() * S, R() * S, 1 + R() * 4); }
  for (let i = 0; i < 20; i++) { ctx.fillStyle = P('#2a2620', 0.5, 0.8, 0.05, 0.25); blob(ctx, R, R() * S, R() * S, 8 + R() * 30, 9); }
}

// grating alpha mask (bars white)
export function gratingAlpha() {
  const S = 256, c = canvas(S), ctx = c.getContext('2d');
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, S, S);
  ctx.fillStyle = '#fff';
  for (let x = 0; x < S; x += 32) ctx.fillRect(x, 0, 7, S);
  for (let y = 0; y < S; y += 64) ctx.fillRect(0, y, S, 5);
  return finish(c, false);
}

// pegboard shadow board for the alcove
export function shadowBoard() {
  const W = 1024, H = 512, c = canvas(W, H), ctx = c.getContext('2d'), R = rng(77);
  ctx.fillStyle = '#5d6b6f'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 3000; i++) { ctx.fillStyle = `rgba(${R() > 0.5 ? '255,255,255' : '0,0,0'},0.05)`; ctx.fillRect(R() * W, R() * H, 2, 2); }
  ctx.fillStyle = '#20272a';
  for (let y = 12; y < H; y += 24) for (let x = 12; x < W; x += 24) { ctx.beginPath(); ctx.arc(x, y, 3.2, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#e8e2cf'; ctx.strokeStyle = '#e8e2cf'; ctx.lineWidth = 3;
  // tool silhouettes (outlines painted on board)
  const wrench = (x, y, l) => { ctx.save(); ctx.translate(x, y); ctx.strokeRect(-7, 0, 14, l); ctx.beginPath(); ctx.arc(0, -10, 16, 0.6, Math.PI * 2 - 0.6 + Math.PI); ctx.stroke(); ctx.restore(); };
  for (let i = 0; i < 7; i++) wrench(80 + i * 46, 110, 120 + i * 18);
  ctx.strokeRect(470, 60, 34, 240); ctx.strokeRect(440, 40, 94, 40); // hammer
  for (let i = 0; i < 5; i++) { ctx.strokeRect(600 + i * 40, 80, 14, 160); ctx.strokeRect(596 + i * 40, 50, 22, 40); }
  ctx.strokeRect(820, 60, 150, 50); ctx.strokeRect(880, 110, 30, 180); // torque wrench head
  ctx.font = 'bold 30px Bahnschrift, Arial Narrow, Arial'; ctx.fillText('TORQUE TOOLS — SIGN OUT AT DESK', 60, 470);
  ctx.font = 'bold 20px Bahnschrift, Arial'; ctx.fillText('BAY 3B  ·  CHECK CALIBRATION TAG BEFORE USE', 60, 500);
  return finish(c, true);
}

// label atlas: 4 x 8 slots of 512 x 128
export function labelAtlas(labels) {
  const W = 2048, H = 1024, c = canvas(W, H), ctx = c.getContext('2d'), R = rng(5);
  ctx.clearRect(0, 0, W, H);
  labels.forEach((L, i) => {
    const x = (i % 4) * 512, y = Math.floor(i / 4) * 128;
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, 512, 128); ctx.clip();
    if (L.bg) { ctx.fillStyle = L.bg; ctx.fillRect(x + 2, y + 2, 508, 124); }
    if (L.border) { ctx.strokeStyle = L.border; ctx.lineWidth = 6; ctx.strokeRect(x + 10, y + 10, 492, 108); }
    if (L.stripes) {
      ctx.fillStyle = '#161616';
      for (let k = -2; k < 16; k++) { ctx.beginPath(); const sx = x + k * 40; ctx.moveTo(sx, y); ctx.lineTo(sx + 20, y); ctx.lineTo(sx + 60, y + 128); ctx.lineTo(sx + 40, y + 128); ctx.fill(); }
      ctx.fillStyle = L.bg; ctx.fillRect(x + 24, y + 24, 464, 80);
    }
    ctx.fillStyle = L.fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const lines = L.text.split('\n');
    const fs = L.size || (lines.length > 1 ? 40 : 54);
    ctx.font = `bold ${fs}px Bahnschrift, "Arial Narrow", Arial, sans-serif`;
    lines.forEach((t, k) => ctx.fillText(t, x + 256, y + 64 + (k - (lines.length - 1) / 2) * fs * 1.1, 470));
    // weathering: knock out small specks
    ctx.globalCompositeOperation = 'destination-out';
    for (let k = 0; k < 260; k++) { ctx.fillStyle = `rgba(0,0,0,${0.3 + R() * 0.6})`; ctx.fillRect(x + R() * 512, y + R() * 128, 1 + R() * 3, 1 + R() * 2); }
    ctx.globalCompositeOperation = 'source-over';
    for (let k = 0; k < 6; k++) { ctx.fillStyle = 'rgba(40,32,20,0.12)'; blob(ctx, R, x + R() * 512, y + R() * 128, 10 + R() * 30, 8); }
    ctx.restore();
  });
  const t = finish(c, true); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

export function starSky() {
  const W = 2048, H = 1024, c = canvas(W, H), ctx = c.getContext('2d'), R = rng(9);
  ctx.fillStyle = '#010104'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 26; i++) {
    const x = R() * W, y = H * (0.3 + R() * 0.4), r = 80 + R() * 260;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const hue = R() > 0.5 ? '70,60,130' : '40,80,120';
    g.addColorStop(0, `rgba(${hue},0.10)`); g.addColorStop(1, `rgba(${hue},0)`);
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  for (let i = 0; i < 2500; i++) { const b = 120 + R() * 135; ctx.fillStyle = `rgba(${b},${b},${b + 10},${0.3 + R() * 0.7})`; ctx.fillRect(R() * W, R() * H, R() > 0.97 ? 2 : 1, 1); }
  const t = finish(c, true); t.wrapT = THREE.ClampToEdgeWrapping; t.mapping = THREE.EquirectangularReflectionMapping;
  return t;
}

export function planetTex() {
  const W = 2048, H = 1024, c = canvas(W, H), ctx = c.getContext('2d'), R = rng(31);
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#dfe8ef'); g.addColorStop(0.1, '#1c4c74'); g.addColorStop(0.5, '#0d3a63'); g.addColorStop(0.9, '#1c4c74'); g.addColorStop(1, '#e2eaf0');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const soft = (x, y, r, col, a) => { const gr = ctx.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(${col},${a})`); gr.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = gr; ctx.fillRect(x - r, y - r, r * 2, r * 2); };
  // shallow shelves, then land masses built from many soft blobs along random walks
  for (let k = 0; k < 16; k++) {
    let x = R() * W, y = H * (0.18 + R() * 0.64);
    const land = R() > 0.45 ? '96,104,60' : '128,108,70';
    for (let i = 0; i < 140; i++) {
      x += (R() - 0.5) * 46; y += (R() - 0.5) * 26;
      soft(x, y, 26 + R() * 30, '40,110,140', 0.10);
      soft(x, y, 8 + R() * 20, R() > 0.8 ? '150,130,90' : land, 0.55);
    }
  }
  // cloud bands and swirls
  for (let i = 0; i < 900; i++) {
    const x = R() * W, y = H * (0.05 + R() * 0.9);
    ctx.save(); ctx.translate(x, y); ctx.scale(2.5 + R() * 4, 1); soft(0, 0, 4 + R() * 12, '245,248,252', 0.18 + R() * 0.3); ctx.restore();
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; t.anisotropy = ANISO;
  return t;
}

export function blobTex() {
  const S = 128, c = canvas(S), ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.55, 'rgba(255,255,255,0.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
  return finish(c, false);
}
