
// ---------------------------------------------------------------------------
// Procedural canvas textures (all artwork is original and generated here)
// ---------------------------------------------------------------------------
const allTextures = [];
function cnv(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function tex(c, { repeat = false, srgb = true, aniso = 4, flipY = true } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = Math.min(aniso, maxAniso);
  t.flipY = flipY;
  allTextures.push(t);
  return t;
}
function grain(g, w, h, amt, seed = 1, mono = true) {
  const r = rng(seed), id = g.getImageData(0, 0, w, h), d = id.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (r() - 0.5) * amt;
    if (mono) { d[i] += n; d[i + 1] += n; d[i + 2] += n; }
    else { d[i] += n; d[i + 1] += (r() - 0.5) * amt; d[i + 2] += (r() - 0.5) * amt; }
  }
  g.putImageData(id, 0, 0);
}
const FONT = '"Arial Black", "Segoe UI Black", Impact, sans-serif';
const MONO = 'Consolas, "Courier New", monospace';

function logoText(g, text, x, y, size, c1, c2, outline = '#1a0630', opts = {}) {
  g.save();
  g.font = `${opts.italic === false ? '' : 'italic '}900 ${size}px ${FONT}`;
  g.textAlign = opts.align || 'center'; g.textBaseline = 'middle';
  if (opts.maxW) { const w = g.measureText(text).width; if (w > opts.maxW) { g.translate(x, y); g.scale(opts.maxW / w, 1); g.translate(-x, -y); } }
  g.lineJoin = 'round';
  if (opts.glow) { g.shadowColor = opts.glow; g.shadowBlur = size * 0.35; }
  g.lineWidth = size * 0.22; g.strokeStyle = outline; g.strokeText(text, x, y + size * 0.06);
  g.shadowBlur = 0;
  g.lineWidth = size * 0.1; g.strokeStyle = opts.mid || '#ffffff'; g.strokeText(text, x, y);
  const gr = g.createLinearGradient(0, y - size / 2, 0, y + size / 2);
  gr.addColorStop(0, c1); gr.addColorStop(1, c2);
  g.fillStyle = gr; g.fillText(text, x, y);
  g.restore();
}

// Game definitions -------------------------------------------------------------
const GAMES = {
  crater: { title: 'CRATER CRAWLER', short: 'CRATER\nCRAWLER', bank: 'VOLT-TEK', c: ['#ff7a1a', '#e0303a', '#ffe6b0', '#1c1030', '#ffc12e'], glow: 0xff8a3a, portrait: true, labels: ['JUMP', 'FIRE', 'BOOST'], hs: 'TOP DRIVERS' },
  nomads: { title: 'NEBULA NOMADS', short: 'NEBULA\nNOMADS', bank: 'VOLT-TEK', c: ['#ff3fa4', '#7b3cff', '#39e6ff', '#0b0820', '#ffe14d'], glow: 0xc060ff, portrait: true, labels: ['FIRE', 'WARP', 'SHIELD'], hs: 'GREAT NOMADS' },
  tide: { title: 'TIDEPOOL TANGO', short: 'TIDEPOOL\nTANGO', bank: 'WAVECREST', c: ['#19d3c5', '#ff6f61', '#ffd27a', '#06283a', '#b8fff4'], glow: 0x30e0d0, portrait: false, labels: ['STEP', 'SPIN', 'CLAP', 'POSE'], hs: 'TOP DANCERS' },
  kite: { title: 'KITE KNIGHTS', short: 'KITE\nKNIGHTS', bank: 'WAVECREST', c: ['#ffb347', '#ff5e8a', '#4b1f5c', '#1a0d2e', '#fff1d6'], glow: 0xff7a8a, portrait: false, labels: ['LUNGE', 'GUST', 'DIVE', 'LOOP'], hs: 'SKY CHAMPIONS' },
  light: { title: 'LUNAR LIGHTHOUSE', short: 'LUNAR\nLIGHTHOUSE', bank: 'STARLITE', c: ['#ffcf4a', '#e2384d', '#fff3c4', '#0a1638', '#36c6e8'], glow: 0x6fb8ff, portrait: false, labels: ['BEAM', 'HORN'], hs: 'KEEPERS OF THE LIGHT' },
};

// --- small motif painters (shared by marquees, side art, posters) -------------
function drawBuggy(g, x, y, s, c) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = c[0]; g.strokeStyle = '#1a0a1a'; g.lineWidth = 0.05;
  g.beginPath(); g.moveTo(-1.1, 0); g.lineTo(-0.9, -0.45); g.lineTo(0.5, -0.5); g.lineTo(1.1, -0.15); g.lineTo(1.1, 0.1); g.lineTo(-1.1, 0.1); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#7fe6ff'; g.beginPath(); g.ellipse(-0.1, -0.5, 0.38, 0.28, 0, Math.PI, 0); g.fill(); g.stroke();
  g.strokeStyle = c[2]; g.lineWidth = 0.04; g.beginPath(); g.moveTo(0.6, -0.45); g.lineTo(0.85, -1.0); g.stroke();
  g.fillStyle = c[1]; g.beginPath(); g.arc(0.85, -1.0, 0.07, 0, TAU); g.fill();
  for (const wx of [-0.75, 0, 0.75]) {
    g.fillStyle = '#20141e'; g.beginPath(); g.arc(wx, 0.2, 0.3, 0, TAU); g.fill();
    g.fillStyle = c[2]; g.beginPath(); g.arc(wx, 0.2, 0.12, 0, TAU); g.fill();
  }
  g.restore();
}
function drawShip(g, x, y, s, col, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.fillStyle = col; g.strokeStyle = '#0b0820'; g.lineWidth = 0.06;
  g.beginPath(); g.moveTo(0, -1); g.lineTo(0.35, 0.1); g.lineTo(0.9, 0.55); g.lineTo(0.3, 0.45); g.lineTo(0, 0.75); g.lineTo(-0.3, 0.45); g.lineTo(-0.9, 0.55); g.lineTo(-0.35, 0.1); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(0, -0.2, 0.12, 0.25, 0, 0, TAU); g.fill();
  g.restore();
}
function drawCrab(g, x, y, s, c) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.strokeStyle = '#3a0d14'; g.lineWidth = 0.06; g.fillStyle = c[1];
  for (const sx of [-1, 1]) {
    for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(sx * 0.5, 0.1 + k * 0.12); g.lineTo(sx * (0.95 + k * 0.08), 0.35 + k * 0.15); g.lineTo(sx * (1.05 + k * 0.05), 0.6 + k * 0.1); g.stroke(); }
    g.beginPath(); g.moveTo(sx * 0.45, -0.2); g.lineTo(sx * 0.85, -0.65); g.stroke();
    g.beginPath(); g.ellipse(sx * 0.95, -0.85, 0.3, 0.22, sx * 0.6, 0, TAU); g.fill(); g.stroke();
    g.fillStyle = c[3]; g.beginPath(); g.moveTo(sx * 0.95, -0.85); g.lineTo(sx * 1.3, -1.05); g.lineTo(sx * 1.25, -0.8); g.fill(); g.fillStyle = c[1];
    g.beginPath(); g.moveTo(sx * 0.18, -0.35); g.lineTo(sx * 0.22, -0.7); g.stroke();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(sx * 0.22, -0.75, 0.1, 0, TAU); g.fill(); g.fillStyle = '#111'; g.beginPath(); g.arc(sx * 0.24, -0.76, 0.05, 0, TAU); g.fill(); g.fillStyle = c[1];
  }
  g.beginPath(); g.ellipse(0, 0, 0.62, 0.42, 0, 0, TAU); g.fill(); g.stroke();
  g.strokeStyle = '#3a0d14'; g.beginPath(); g.arc(0, 0.02, 0.2, 0.2, Math.PI - 0.2); g.stroke();
  g.restore();
}
function drawKite(g, x, y, s, c1, c2, rot = 0, tail = true) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.lineWidth = 0.05; g.strokeStyle = '#2a0f30';
  g.fillStyle = c1; g.beginPath(); g.moveTo(0, -1); g.lineTo(0.6, -0.2); g.lineTo(0, 1); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = c2; g.beginPath(); g.moveTo(0, -1); g.lineTo(-0.6, -0.2); g.lineTo(0, 1); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(-0.6, -0.2); g.lineTo(0.6, -0.2); g.stroke();
  if (tail) {
    g.strokeStyle = '#fff1d6'; g.lineWidth = 0.035; g.beginPath(); g.moveTo(0, 1);
    for (let k = 1; k <= 12; k++) g.lineTo(Math.sin(k * 0.9) * 0.25, 1 + k * 0.18); g.stroke();
    for (let k = 3; k <= 12; k += 3) { g.fillStyle = k % 2 ? c1 : c2; const bx = Math.sin(k * 0.9) * 0.25, by = 1 + k * 0.18; g.beginPath(); g.moveTo(bx - 0.14, by - 0.08); g.lineTo(bx + 0.14, by + 0.08); g.lineTo(bx + 0.14, by - 0.08); g.lineTo(bx - 0.14, by + 0.08); g.fill(); }
  }
  g.restore();
}
function drawLighthouse(g, x, y, s, c) {
  g.save(); g.translate(x, y); g.scale(s, s);
  // beam
  const bg = g.createLinearGradient(0, -2.3, -3.5, -2.0);
  bg.addColorStop(0, 'rgba(255,243,196,0.85)'); bg.addColorStop(1, 'rgba(255,243,196,0)');
  g.fillStyle = bg; g.beginPath(); g.moveTo(0, -2.3); g.lineTo(-3.8, -3.0); g.lineTo(-3.8, -1.5); g.closePath(); g.fill();
  // tower
  g.fillStyle = '#f4efe6'; g.beginPath(); g.moveTo(-0.35, 0); g.lineTo(0.35, 0); g.lineTo(0.22, -2); g.lineTo(-0.22, -2); g.closePath(); g.fill();
  g.fillStyle = c[1];
  for (let k = 0; k < 3; k++) { const y0 = -0.3 - k * 0.6, y1 = y0 - 0.3; const w0 = 0.35 - (-y0 / 2) * 0.13, w1 = 0.35 - (-y1 / 2) * 0.13; g.beginPath(); g.moveTo(-w0, y0); g.lineTo(w0, y0); g.lineTo(w1, y1); g.lineTo(-w1, y1); g.fill(); }
  g.fillStyle = '#20253a'; g.fillRect(-0.32, -2.08, 0.64, 0.1);
  g.fillStyle = c[0]; g.fillRect(-0.18, -2.45, 0.36, 0.37);
  g.fillStyle = c[1]; g.beginPath(); g.moveTo(-0.26, -2.45); g.lineTo(0.26, -2.45); g.lineTo(0, -2.75); g.fill();
  // rock
  g.fillStyle = '#1b2236'; g.beginPath(); g.moveTo(-0.9, 0.3); g.quadraticCurveTo(-0.5, -0.2, 0, -0.05); g.quadraticCurveTo(0.6, -0.2, 1.0, 0.3); g.fill();
  g.restore();
}
function starfield(g, w, h, n, seed, alpha = 1) {
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const s = r() < 0.08 ? 2.2 : 1 + r();
    g.fillStyle = `rgba(255,255,255,${(0.35 + r() * 0.65) * alpha})`;
    g.beginPath(); g.arc(r() * w, r() * h, s, 0, TAU); g.fill();
  }
}

// --- Marquees (backlit translucent) -------------------------------------------
function marqueeTexture(key) {
  const G = GAMES[key], c = G.c, W = 1024, H = 256, cv = cnv(W, H), g = cv.getContext('2d');
  const bg = g.createLinearGradient(0, 0, 0, H);
  if (key === 'crater') { bg.addColorStop(0, '#2a0e3a'); bg.addColorStop(0.65, '#a8301f'); bg.addColorStop(1, '#ffb347'); }
  else if (key === 'nomads') { bg.addColorStop(0, '#05041a'); bg.addColorStop(0.6, '#3a1170'); bg.addColorStop(1, '#ff3fa4'); }
  else if (key === 'tide') { bg.addColorStop(0, '#7af7ee'); bg.addColorStop(0.5, '#1a9db0'); bg.addColorStop(1, '#063047'); }
  else if (key === 'kite') { bg.addColorStop(0, '#3b1650'); bg.addColorStop(0.55, '#ff5e8a'); bg.addColorStop(1, '#ffc25a'); }
  else { bg.addColorStop(0, '#040a24'); bg.addColorStop(0.7, '#0e2a5c'); bg.addColorStop(1, '#1f6f9a'); }
  g.fillStyle = bg; g.fillRect(0, 0, W, H);
  if (key === 'crater') {
    starfield(g, W, 120, 90, 11);
    g.fillStyle = '#ffd59a'; g.beginPath(); g.arc(880, 70, 46, 0, TAU); g.fill();
    g.fillStyle = '#5a1f2a'; g.beginPath(); g.moveTo(0, 230); for (let x = 0; x <= W; x += 32) g.lineTo(x, 200 - Math.abs(Math.sin(x * 0.013)) * 40); g.lineTo(W, H); g.lineTo(0, H); g.fill();
    drawBuggy(g, 150, 200, 48, c);
  } else if (key === 'nomads') {
    starfield(g, W, H, 160, 12);
    for (let i = 0; i < 6; i++) { const rg = g.createRadialGradient(150 + i * 160, 120 + (i % 2) * 40, 0, 150 + i * 160, 120, 140); rg.addColorStop(0, 'rgba(255,63,164,0.35)'); rg.addColorStop(1, 'rgba(123,60,255,0)'); g.fillStyle = rg; g.fillRect(0, 0, W, H); }
    drawShip(g, 110, 140, 52, c[2], -0.4); drawShip(g, 920, 120, 40, c[0], 0.5); drawShip(g, 980, 200, 22, c[4], 0.3);
  } else if (key === 'tide') {
    g.strokeStyle = 'rgba(255,255,255,0.25)'; g.lineWidth = 6;
    for (let k = 0; k < 6; k++) { g.beginPath(); for (let x = 0; x <= W; x += 16) g.lineTo(x, 40 + k * 40 + Math.sin(x * 0.02 + k) * 10); g.stroke(); }
    for (let i = 0; i < 28; i++) { g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 3; g.beginPath(); g.arc((i * 137) % W, (i * 71) % H, 4 + (i % 4) * 3, 0, TAU); g.stroke(); }
    drawCrab(g, 120, 160, 52, c); drawCrab(g, 915, 170, 40, ['#ffd27a', '#ff9e3d', '#fff', '#06283a']);
  } else if (key === 'kite') {
    g.fillStyle = '#ffe9a8'; g.beginPath(); g.arc(512, 250, 110, Math.PI, 0); g.fill();
    g.fillStyle = 'rgba(255,94,138,0.9)'; for (let k = 0; k < 5; k++) g.fillRect(380, 170 + k * 18, 264, 5 + k);
    for (let i = 0; i < 6; i++) { g.fillStyle = 'rgba(255,240,230,0.35)'; g.beginPath(); g.ellipse(80 + i * 180, 60 + (i % 3) * 30, 70, 18, 0, 0, TAU); g.fill(); }
    drawKite(g, 110, 100, 52, '#e2384d', '#ffd23f', -0.3, true); drawKite(g, 915, 95, 50, '#39a0ff', '#ffffff', 0.35, true);
  } else {
    starfield(g, W, H, 140, 14);
    g.fillStyle = '#fff8dc'; g.beginPath(); g.arc(120, 80, 50, 0, TAU); g.fill();
    g.fillStyle = '#0a1638'; g.beginPath(); g.arc(140, 70, 44, 0, TAU); g.fill();
    g.fillStyle = '#0b3a5c'; g.fillRect(0, 210, W, 46);
    g.strokeStyle = 'rgba(160,230,255,0.45)'; g.lineWidth = 3;
    for (let k = 0; k < 4; k++) { g.beginPath(); for (let x = 0; x <= W; x += 12) g.lineTo(x, 218 + k * 10 + Math.sin(x * 0.05 + k * 2) * 3); g.stroke(); }
    drawLighthouse(g, 930, 225, 62, c);
  }
  const lines = G.title.length > 13 && W ? [G.title] : [G.title];
  logoText(g, lines[0], W / 2, H * 0.47, key === 'light' ? 92 : 104, c[4] || '#fff', c[0], c[3], { maxW: 700, glow: 'rgba(0,0,0,0.6)' });
  g.font = `bold 20px ${FONT}`; g.textAlign = 'center'; g.fillStyle = 'rgba(255,255,255,0.85)';
  g.fillText(G.bank === 'STARLITE' ? '★ STARLITE ORIGINAL · 2-PLAYER DELUXE ★' : `${G.bank} AMUSEMENTS`, W / 2, H - 24);
  // inner frame line
  g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 4; g.strokeRect(10, 10, W - 20, H - 20);
  return tex(cv, { aniso: 8 });
}

// --- Side art -----------------------------------------------------------------
// canvas x: back -> front, canvas y: top -> bottom of the cabinet side
function sideArtTexture(key, uMin, uMax, vMax) {
  const G = GAMES[key], c = G.c, W = 1024, H = 1024, cv = cnv(W, H), g = cv.getContext('2d');
  const r = rng(key.length * 31 + 5);
  const X = u => (u - uMin) / (uMax - uMin) * W, Y = v => (1 - v / vMax) * H;
  if (G.bank === 'VOLT-TEK') {
    // classic painted upright: solid colour with racing stripes and a big motif
    g.fillStyle = key === 'crater' ? '#1c1030' : '#0b0820'; g.fillRect(0, 0, W, H);
    const base = g.createLinearGradient(0, 0, W, H);
    base.addColorStop(0, key === 'crater' ? '#7a1a2a' : '#2a0f5c'); base.addColorStop(1, key === 'crater' ? '#f06a20' : '#c02d8a');
    g.fillStyle = base; g.beginPath(); g.moveTo(0, Y(1.25)); g.lineTo(W, Y(0.55)); g.lineTo(W, H); g.lineTo(0, H); g.fill();
    // three brand stripes
    const sc = ['#ffd23f', '#ff8a1f', '#e0303a'];
    for (let k = 0; k < 3; k++) { g.fillStyle = sc[k]; g.beginPath(); g.moveTo(0, Y(1.32) + k * 26); g.lineTo(W, Y(0.62) + k * 26); g.lineTo(W, Y(0.62) + k * 26 + 14); g.lineTo(0, Y(1.32) + k * 26 + 14); g.fill(); }
    if (key === 'crater') {
      g.fillStyle = 'rgba(255,214,150,0.18)';
      for (let i = 0; i < 9; i++) { g.beginPath(); g.ellipse(r() * W, Y(0.15 + r() * 0.5), 40 + r() * 70, 14 + r() * 20, 0, 0, TAU); g.fill(); }
      g.fillStyle = '#ffd59a'; g.beginPath(); g.arc(X(0.25), Y(1.55), 85, 0, TAU); g.fill();
      g.strokeStyle = '#ff7a1a'; g.lineWidth = 10; g.beginPath(); g.ellipse(X(0.25), Y(1.55), 150, 34, -0.3, 0, TAU); g.stroke();
      starfield(g, W, Y(1.3), 70, 21);
      drawBuggy(g, X(0.42), Y(0.42), 120, c);
    } else {
      starfield(g, W, H, 180, 22);
      for (let i = 0; i < 5; i++) { const rg = g.createRadialGradient(X(0.1 + r() * 0.6), Y(0.4 + r() * 1.2), 0, X(0.35), Y(1.0), 260); rg.addColorStop(0, 'rgba(57,230,255,0.28)'); rg.addColorStop(1, 'rgba(57,230,255,0)'); g.fillStyle = rg; g.fillRect(0, 0, W, H); }
      drawShip(g, X(0.48), Y(1.25), 120, c[2], -0.5); drawShip(g, X(0.2), Y(0.75), 60, c[4], -0.3); drawShip(g, X(0.62), Y(0.6), 38, '#ffffff', -0.7);
    }
  } else if (G.bank === 'WAVECREST') {
    // flowing wave bands
    const bg = g.createLinearGradient(0, 0, 0, H);
    if (key === 'tide') { bg.addColorStop(0, '#0f6f86'); bg.addColorStop(0.6, '#08364f'); bg.addColorStop(1, '#041a28'); }
    else { bg.addColorStop(0, '#3b1650'); bg.addColorStop(0.55, '#b83a6e'); bg.addColorStop(1, '#2a0f30'); }
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    const bands = key === 'tide' ? ['#19d3c5', '#7af7ee', '#ff6f61'] : ['#ffb347', '#ffe9a8', '#39a0ff'];
    for (let k = 0; k < 3; k++) {
      g.fillStyle = bands[k]; g.globalAlpha = 0.85; g.beginPath();
      const y0 = Y(0.55 - k * 0.12);
      g.moveTo(0, y0); for (let x = 0; x <= W; x += 16) g.lineTo(x, y0 + Math.sin(x * 0.012 + k * 1.3) * 34);
      g.lineTo(W, y0 + 70); for (let x = W; x >= 0; x -= 16) g.lineTo(x, y0 + 40 + Math.sin(x * 0.012 + k * 1.3 + 0.4) * 34); g.closePath(); g.fill();
    }
    g.globalAlpha = 1;
    if (key === 'tide') {
      for (let i = 0; i < 40; i++) { g.strokeStyle = 'rgba(200,255,250,0.55)'; g.lineWidth = 3; g.beginPath(); g.arc(r() * W, Y(0.7 + r() * 1.2), 5 + r() * 16, 0, TAU); g.stroke(); }
      drawCrab(g, X(0.45), Y(1.15), 150, c);
    } else {
      g.fillStyle = '#ffe9a8'; g.beginPath(); g.arc(X(0.55), Y(0.95), 150, 0, TAU); g.fill();
      for (let i = 0; i < 6; i++) { g.fillStyle = 'rgba(255,240,230,0.35)'; g.beginPath(); g.ellipse(r() * W, Y(1.0 + r() * 0.8), 90, 22, 0, 0, TAU); g.fill(); }
      drawKite(g, X(0.35), Y(1.45), 120, '#e2384d', '#ffd23f', -0.35); drawKite(g, X(0.68), Y(1.2), 80, '#39a0ff', '#ffffff', 0.3);
    }
    // wavecrest chrome swoosh
    g.strokeStyle = 'rgba(255,255,255,0.8)'; g.lineWidth = 8; g.beginPath(); g.moveTo(0, Y(1.75)); g.bezierCurveTo(W * 0.3, Y(1.95), W * 0.6, Y(1.55), W, Y(1.7)); g.stroke();
  } else {
    // feature cabinet: deep navy with gold pinstripes, beam rays, moon & sea
    const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#071030'); bg.addColorStop(0.7, '#0c2250'); bg.addColorStop(1, '#06122c');
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    starfield(g, W, H * 0.7, 220, 31);
    for (let k = 0; k < 7; k++) {
      const a = -0.9 + k * 0.22; g.fillStyle = `rgba(255,236,170,${0.05 + (k % 2) * 0.05})`;
      g.beginPath(); g.moveTo(X(0.95), Y(2.0)); g.lineTo(X(0.95) + Math.cos(Math.PI + a) * 1600, Y(2.0) + Math.sin(Math.PI + a) * 1600); g.lineTo(X(0.95) + Math.cos(Math.PI + a + 0.08) * 1600, Y(2.0) + Math.sin(Math.PI + a + 0.08) * 1600); g.fill();
    }
    g.fillStyle = '#fff3c4'; g.beginPath(); g.arc(X(0.25), Y(1.75), 70, 0, TAU); g.fill();
    g.fillStyle = '#0a1a40'; g.beginPath(); g.arc(X(0.25) + 28, Y(1.75) - 14, 62, 0, TAU); g.fill();
    g.fillStyle = '#123e6a'; g.fillRect(0, Y(0.55), W, H);
    g.strokeStyle = 'rgba(120,210,255,0.5)'; g.lineWidth = 5;
    for (let k = 0; k < 8; k++) { g.beginPath(); for (let x = 0; x <= W; x += 12) g.lineTo(x, Y(0.52) + k * 26 + Math.sin(x * 0.03 + k) * 6); g.stroke(); }
    drawLighthouse(g, X(0.62), Y(0.62), 150, c);
    g.strokeStyle = '#ffcf4a'; g.lineWidth = 6; g.strokeRect(24, 24, W - 48, H - 48);
    g.lineWidth = 2; g.strokeRect(38, 38, W - 76, H - 76);
  }
  // wear: kick scuffs along the bottom, chips at the front edge, light scratches
  g.fillStyle = '#0a0a0e'; g.fillRect(0, Y(0.1), W, H);
  for (let i = 0; i < 70; i++) {
    const x = r() * W, y = Y(0.1) - r() * 70 * r();
    g.strokeStyle = `rgba(${r() < 0.5 ? '20,15,20' : '230,220,210'},${0.15 + r() * 0.3})`; g.lineWidth = 1 + r() * 3;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 60, y + (r() - 0.5) * 10); g.stroke();
  }
  for (let i = 0; i < 26; i++) { const x = W - r() * 40 * r(), y = Y(0.3 + r() * 1.4); g.fillStyle = 'rgba(25,18,14,0.75)'; g.beginPath(); g.ellipse(x, y, 3 + r() * 7, 2 + r() * 4, r(), 0, TAU); g.fill(); }
  for (let i = 0; i < 40; i++) { const x = r() * W, y = r() * H; g.strokeStyle = 'rgba(255,255,255,0.08)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 120, y + (r() - 0.5) * 30); g.stroke(); }
  grain(g, W, H, 10, 9);
  return tex(cv, { aniso: 8 });
}

// --- Control panel overlays ------------------------------------------------------
// layout items: {x, y (from front edge), r, kind:'stick'|'btn'|'start'|'spin'|'dome', label}
function cpoTexture(key, Wd, L, layout) {
  const G = GAMES[key], c = G.c, W = 1024, H = Math.round(1024 * L / Wd / 2) * 2 || 512, cv = cnv(W, Math.max(256, H)), g = cv.getContext('2d');
  const HH = cv.height, P = (x, y) => [(x / Wd + 0.5) * W, (1 - y / L) * HH], S = W / Wd;
  const bg = g.createLinearGradient(0, 0, W, HH);
  if (key === 'crater') { bg.addColorStop(0, '#2a1230'); bg.addColorStop(1, '#5a1a20'); }
  else if (key === 'nomads') { bg.addColorStop(0, '#120a34'); bg.addColorStop(1, '#3a0f4a'); }
  else if (key === 'tide') { bg.addColorStop(0, '#08364f'); bg.addColorStop(1, '#0f5a6a'); }
  else if (key === 'kite') { bg.addColorStop(0, '#3b1650'); bg.addColorStop(1, '#6a1f4a'); }
  else { bg.addColorStop(0, '#081634'); bg.addColorStop(1, '#0d2a5a'); }
  g.fillStyle = bg; g.fillRect(0, 0, W, HH);
  const r = rng(key.length * 7);
  // background motifs
  if (G.bank === 'VOLT-TEK') { const sc = ['#ffd23f', '#ff8a1f', '#e0303a']; for (let k = 0; k < 3; k++) { g.fillStyle = sc[k]; g.fillRect(0, HH * 0.12 + k * 14, W, 7); } }
  else if (G.bank === 'WAVECREST') { g.strokeStyle = 'rgba(255,255,255,0.18)'; g.lineWidth = 5; for (let k = 0; k < 5; k++) { g.beginPath(); for (let x = 0; x <= W; x += 16) g.lineTo(x, HH * (0.15 + k * 0.18) + Math.sin(x * 0.015 + k) * 10); g.stroke(); } }
  else { starfield(g, W, HH, 90, 5, 0.6); g.strokeStyle = '#ffcf4a'; g.lineWidth = 4; g.strokeRect(10, 10, W - 20, HH - 20); }
  g.font = `bold ${Math.round(S * 0.013)}px ${FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle';
  let bi = 0;
  for (const it of layout) {
    const [x, y] = P(it.x, it.y), rr = it.r * S;
    // worn halo: art rubbed away by hands
    const wear = it.kind === 'stick' || it.kind === 'spin' ? 2.6 : 1.9;
    const wg = g.createRadialGradient(x, y, rr * 0.8, x, y, rr * wear);
    wg.addColorStop(0, 'rgba(190,185,190,0.38)'); wg.addColorStop(1, 'rgba(190,185,190,0)');
    g.fillStyle = wg; g.beginPath(); g.arc(x, y, rr * wear, 0, TAU); g.fill();
    if (it.kind === 'stick' || it.kind === 'spin') {
      g.strokeStyle = 'rgba(255,255,255,0.75)'; g.lineWidth = 4; g.beginPath(); g.arc(x, y, rr * 1.55, 0, TAU); g.stroke();
      for (let k = 0; k < 8; k++) { const a = k / 8 * TAU; g.fillStyle = 'rgba(255,255,255,0.8)'; g.beginPath(); g.moveTo(x + Math.cos(a) * rr * 1.75, y + Math.sin(a) * rr * 1.75); g.lineTo(x + Math.cos(a + 0.12) * rr * 1.95, y + Math.sin(a + 0.12) * rr * 1.95); g.lineTo(x + Math.cos(a - 0.12) * rr * 1.95, y + Math.sin(a - 0.12) * rr * 1.95); g.fill(); }
    } else {
      g.strokeStyle = it.kind === 'dome' ? '#ffcf4a' : 'rgba(255,255,255,0.7)'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, rr * 1.35, 0, TAU); g.stroke();
      const lab = it.label || (it.kind === 'start' ? (it.x < 0 ? '1P' : '2P') : G.labels[bi++ % G.labels.length]);
      g.fillStyle = '#fff'; g.fillText(lab, x, y + rr * 2.0);
    }
  }
  // palm-rest wear along the front edge and a few scratches
  const fw = g.createLinearGradient(0, HH, 0, HH * 0.75); fw.addColorStop(0, 'rgba(200,195,200,0.25)'); fw.addColorStop(1, 'rgba(200,195,200,0)');
  g.fillStyle = fw; g.fillRect(0, HH * 0.75, W, HH * 0.25);
  for (let i = 0; i < 50; i++) { const x = r() * W, y = r() * HH; g.strokeStyle = `rgba(255,255,255,${0.05 + r() * 0.12})`; g.lineWidth = 1; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 50, y + (r() - 0.5) * 12); g.stroke(); }
  // cigarette-burn-free, but a coffee ring someone left years ago
  g.strokeStyle = 'rgba(80,50,30,0.25)'; g.lineWidth = 3; g.beginPath(); g.arc(W * 0.9, HH * 0.3, 26, 0.3, 5.6); g.stroke();
  grain(g, W, HH, 8, 4);
  return tex(cv, { aniso: 8 });
}

// --- Screen bezels with printed instructions -------------------------------------
function bezelTexture(key, wB, hB, wO, hO) {
  const G = GAMES[key], c = G.c, W = 1024, H = Math.round(1024 * hB / wB), cv = cnv(W, H), g = cv.getContext('2d');
  g.fillStyle = '#08070c'; g.fillRect(0, 0, W, H);
  const ox = (wB - wO) / 2 / wB * W, oy = (hB - hO) / 2 / hB * H, ow = wO / wB * W, oh = hO / hB * H;
  g.strokeStyle = c[0]; g.lineWidth = 6; g.strokeRect(ox - 14, oy - 14, ow + 28, oh + 28);
  g.strokeStyle = c[1]; g.lineWidth = 3; g.strokeRect(ox - 26, oy - 26, ow + 52, oh + 52);
  g.fillStyle = 'rgba(255,255,255,0.85)'; g.textAlign = 'center'; g.textBaseline = 'middle';
  const side = Math.min(ox, W * 0.3);
  const txt = G.bank === 'STARLITE'
    ? ['TURN THE DIAL', 'TO STEER THE', 'LIGHTHOUSE BEAM', '', 'PRESS BEAM', 'TO GUIDE SHIPS', 'HOME SAFELY']
    : G.portrait ? ['1 PLAYER', '', 'JOYSTICK', 'MOVES', '', `${G.labels[0]} /`, `${G.labels[1]}`] : ['1 OR 2', 'PLAYERS', '', 'MATCH THE', 'BEAT /', 'BEAT THE', 'WIND'];
  if (side > 60) {
    g.font = `bold ${Math.round(side * 0.13)}px ${FONT}`;
    txt.forEach((t, i) => g.fillText(t, side / 2, oy + oh * 0.15 + i * side * 0.17));
    g.fillStyle = c[0];
    g.font = `bold ${Math.round(side * 0.14)}px ${FONT}`;
    ['25¢', 'PER', 'PLAY'].forEach((t, i) => g.fillText(t, W - side / 2, oy + oh * 0.25 + i * side * 0.2));
  }
  if (oy > 40) {
    g.font = `bold ${Math.round(oy * 0.42)}px ${FONT}`; g.fillStyle = c[0];
    g.fillText(G.title, W / 2, oy / 2);
    g.font = `bold ${Math.round((H - oy - oh) * 0.32)}px ${FONT}`; g.fillStyle = 'rgba(255,255,255,0.7)';
    g.fillText('© STARLITE AMUSEMENT CO. — FOR AMUSEMENT ONLY', W / 2, H - (H - oy - oh) / 2);
  }
  grain(g, W, H, 6, 2);
  return tex(cv, { aniso: 4 });
}

// --- Screen sheet: logo, hud, insert coin, high scores -------------------------
function screenSheet(key) {
  const G = GAMES[key], c = G.c, W = 512, H = 512, cv = cnv(W, H), g = cv.getContext('2d');
  g.clearRect(0, 0, W, H);
  const parts = G.short.split('\n');
  logoText(g, parts[0], W / 2, 62, 76, c[4] || '#fff', c[0], '#000', { maxW: 470 });
  logoText(g, parts[1], W / 2, 146, 76, '#ffffff', c[1], '#000', { maxW: 470 });
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `bold 26px ${MONO}`;
  g.fillStyle = '#ff4040'; g.fillText('1UP', 70, 220); g.fillStyle = '#fff'; g.fillText('004250', 70, 246 - 4);
  g.fillStyle = '#ff4040'; g.fillText('HI-SCORE', 300, 220); g.fillStyle = '#fff'; g.fillText('051270', 300, 246 - 4);
  g.font = `bold 34px ${MONO}`; g.fillStyle = c[4] || '#ffe14d'; g.fillText('INSERT  COIN', W / 2, 285);
  g.font = `bold 28px ${MONO}`; g.fillStyle = c[0]; g.fillText(G.hs, W / 2, 330);
  const names = [['JMR', '051270'], ['AVA', '044810'], ['DOT', '039950'], ['KAI', '031200'], ['LOU', '027640']];
  g.font = `bold 26px ${MONO}`;
  names.forEach(([n, s], i) => { g.fillStyle = ['#ffe14d', '#ffffff', '#7fe6ff', '#ff9ed2', '#9dff8a'][i]; g.fillText(`${i + 1}. ${n}  ${s}`, W / 2, 372 + i * 30); });
  const t = tex(cv, { aniso: 4 });
  return t;
}

// --- Room surfaces ---------------------------------------------------------------
function carpetTexture() {
  const S = 1024, cv = cnv(S, S), g = cv.getContext('2d'), r = rng(7);
  g.fillStyle = '#231c48'; g.fillRect(0, 0, S, S);
  const cols = ['#ff3fa4', '#33e1ff', '#ffd23f', '#7cff6b', '#9a5bff', '#ff7a2f'];
  const tiled = fn => { for (const ox of [-S, 0, S]) for (const oy of [-S, 0, S]) { g.save(); g.translate(ox, oy); fn(); g.restore(); } };
  for (let i = 0; i < 400; i++) { const x = r() * S, y = r() * S, col = cols[i % cols.length], rr = 1.5 + r() * 3; tiled(() => { g.globalAlpha = 0.7; g.fillStyle = col; g.beginPath(); g.arc(x, y, rr, 0, TAU); g.fill(); g.globalAlpha = 1; }); }
  for (let i = 0; i < 64; i++) {
    const x = r() * S, y = r() * S, type = Math.floor(r() * 5), col = cols[Math.floor(r() * cols.length)], s = 22 + r() * 34, rot = r() * TAU, col2 = cols[(i + 2) % cols.length];
    tiled(() => {
      g.save(); g.translate(x, y); g.rotate(rot); g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 6; g.lineCap = 'round'; g.lineJoin = 'round';
      if (type === 0) { g.beginPath(); for (let k = 0; k <= 24; k++) { const t = k / 24; g.lineTo(-s * 1.5 + t * s * 3, Math.sin(t * TAU * 1.5) * s * 0.35); } g.stroke(); }
      else if (type === 1) { g.beginPath(); g.moveTo(0, -s); g.lineTo(s * 0.87, s * 0.5); g.lineTo(-s * 0.87, s * 0.5); g.closePath(); g.stroke(); }
      else if (type === 2) { g.beginPath(); g.arc(0, 0, s * 0.5, 0, TAU); g.fill(); g.strokeStyle = col2; g.lineWidth = 5; g.beginPath(); g.ellipse(0, 0, s * 1.05, s * 0.28, 0, 0, TAU); g.stroke(); }
      else if (type === 3) { g.beginPath(); for (let k = 0; k < 10; k++) { const rr = k % 2 ? s * 0.25 : s * 0.62, a = k / 10 * TAU; g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } g.closePath(); g.fill(); }
      else { g.beginPath(); g.moveTo(-s, -s * 0.3); g.lineTo(-s * 0.3, s * 0.3); g.lineTo(s * 0.2, -s * 0.3); g.lineTo(s, s * 0.3); g.stroke(); }
      g.restore();
    });
  }
  grain(g, S, S, 34, 3, false);
  return tex(cv, { repeat: true, aniso: 16 });
}
function wearTexture(spots) {
  // grayscale wear over world rect x[-3.6, 6.3], z[-11, 0]
  const W = 512, H = 568, cv = cnv(W, H), g = cv.getContext('2d'), r = rng(99);
  g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
  const X = x => (x + 3.6) / 9.9 * W, Z = z => (z + 11) / 11 * H, s = W / 9.9;
  for (const [x, z, rad, a] of spots) {
    const gr = g.createRadialGradient(X(x), Z(z), 0, X(x), Z(z), rad * s);
    gr.addColorStop(0, `rgba(255,255,255,${a})`); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(X(x), Z(z), rad * s, 0, TAU); g.fill();
  }
  const id = g.getImageData(0, 0, W, H), d = id.data;
  for (let i = 0; i < d.length; i += 4) { const n = d[i] * (0.75 + r() * 0.5); d[i] = d[i + 1] = d[i + 2] = Math.min(255, n); }
  g.putImageData(id, 0, 0);
  const t = tex(cv, { srgb: false, flipY: false });
  return t;
}
function muralTexture() {
  const W = 1024, H = 512, cv = cnv(W, H), g = cv.getContext('2d'), r = rng(42);
  const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#0b0820'); bg.addColorStop(1, '#1c1238');
  g.fillStyle = bg; g.fillRect(0, 0, W, H);
  const tiledX = fn => { for (const ox of [-W, 0, W]) { g.save(); g.translate(ox, 0); fn(); g.restore(); } };
  for (let i = 0; i < 260; i++) { const x = r() * W, y = r() * H, s = r() < 0.1 ? 2.5 : 1.2; tiledX(() => { g.fillStyle = `rgba(220,230,255,${0.3 + r() * 0.5})`; g.beginPath(); g.arc(x, y, s, 0, TAU); g.fill(); }); }
  const planets = [[160, 180, 60, '#ff3fa4', '#7b3cff'], [620, 330, 36, '#33e1ff', '#1a6fff'], [880, 140, 22, '#ffd23f', '#ff7a2f']];
  for (const [x, y, rad, a, b] of planets) tiledX(() => {
    const pg = g.createRadialGradient(x - rad * 0.4, y - rad * 0.4, rad * 0.1, x, y, rad); pg.addColorStop(0, a); pg.addColorStop(1, b);
    g.fillStyle = pg; g.beginPath(); g.arc(x, y, rad, 0, TAU); g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.5)'; g.lineWidth = 3; g.beginPath(); g.ellipse(x, y, rad * 1.8, rad * 0.4, -0.25, 0, TAU); g.stroke();
  });
  for (let i = 0; i < 4; i++) { const x = r() * W, y = 60 + r() * 300; tiledX(() => { const cg = g.createLinearGradient(x, y, x - 140, y + 50); cg.addColorStop(0, 'rgba(160,255,240,0.8)'); cg.addColorStop(1, 'rgba(160,255,240,0)'); g.strokeStyle = cg; g.lineWidth = 4; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 140, y + 50); g.stroke(); g.fillStyle = '#e0fffa'; g.beginPath(); g.arc(x, y, 4, 0, TAU); g.fill(); }); }
  // squiggle border band at the bottom (matches carpet)
  g.strokeStyle = '#ff3fa4'; g.lineWidth = 5; g.beginPath(); for (let x = 0; x <= W; x += 8) g.lineTo(x, H - 26 + Math.sin(x / W * TAU * 8) * 8); g.stroke();
  g.strokeStyle = '#33e1ff'; g.lineWidth = 3; g.beginPath(); for (let x = 0; x <= W; x += 8) g.lineTo(x, H - 12 + Math.sin(x / W * TAU * 8 + 1.5) * 5); g.stroke();
  grain(g, W, H, 10, 8);
  return tex(cv, { repeat: true, aniso: 8 });
}
function wainscotTexture() {
  const W = 512, H = 512, cv = cnv(W, H), g = cv.getContext('2d'), r = rng(5);
  g.fillStyle = '#2a1838'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 4; i++) { const x = i * W / 4; g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(x, 0, 4, H); g.fillStyle = 'rgba(255,255,255,0.06)'; g.fillRect(x + 4, 0, 2, H); }
  for (let i = 0; i < 120; i++) { const x = r() * W, y = H - r() * r() * 200; g.strokeStyle = `rgba(${r() < 0.7 ? '10,5,12' : '200,180,210'},${0.1 + r() * 0.25})`; g.lineWidth = 1 + r() * 3; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 40, y + (r() - 0.5) * 6); g.stroke(); }
  grain(g, W, H, 12, 6);
  return tex(cv, { repeat: true, aniso: 8 });
}
function ceilingTexture() {
  const W = 512, H = 512, cv = cnv(W, H), g = cv.getContext('2d'), r = rng(3);
  g.fillStyle = '#26232f'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 2600; i++) { g.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '255,255,255'},${0.08 + r() * 0.12})`; g.fillRect(r() * W, r() * H, 1 + r() * 3, 1 + r() * 2); }
  g.fillStyle = '#6a6672'; g.fillRect(0, 0, W, 6); g.fillRect(0, H / 2 - 3, W, 6); g.fillRect(0, 0, 6, H); g.fillRect(W / 2 - 3, 0, 6, H);
  return tex(cv, { repeat: true, aniso: 8 });
}
function brushedTexture(base = 150) {
  const W = 256, H = 256, cv = cnv(W, H), g = cv.getContext('2d'), r = rng(base);
  g.fillStyle = `rgb(${base},${base},${base + 6})`; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 900; i++) { const y = r() * H, v = (r() - 0.5) * 60; g.fillStyle = `rgba(${v > 0 ? '255,255,255' : '0,0,0'},${Math.abs(v) / 255})`; g.fillRect(0, y, W, 1); }
  return tex(cv, { repeat: true });
}
function grilleTexture() {
  const W = 256, H = 256, cv = cnv(W, H), g = cv.getContext('2d');
  g.fillStyle = '#3a3a42'; g.fillRect(0, 0, W, H);
  g.fillStyle = '#060608';
  for (let y = 8; y < H; y += 16) for (let x = 8 + ((y / 16) % 2) * 8; x < W; x += 16) { g.beginPath(); g.arc(x, y, 5, 0, TAU); g.fill(); }
  return tex(cv, { repeat: true });
}
function laminateTexture() {
  const W = 512, H = 512, cv = cnv(W, H), g = cv.getContext('2d'), r = rng(77);
  g.fillStyle = '#1d4f5c'; g.fillRect(0, 0, W, H);
  const cols = ['#ff6f9f', '#ffd23f', '#e8f3ff', '#ff7a2f'];
  const tiled = fn => { for (const ox of [-W, 0, W]) for (const oy of [-H, 0, H]) { g.save(); g.translate(ox, oy); fn(); g.restore(); } };
  for (let i = 0; i < 70; i++) {
    const x = r() * W, y = r() * H, t = Math.floor(r() * 3), col = cols[i % 4], rot = r() * TAU, s = 10 + r() * 16;
    tiled(() => { g.save(); g.translate(x, y); g.rotate(rot); g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 4; g.lineCap = 'round';
      if (t === 0) { g.beginPath(); g.arc(0, 0, s * 0.4, 0, TAU); g.fill(); }
      else if (t === 1) { g.beginPath(); g.moveTo(-s, 0); g.quadraticCurveTo(-s / 2, -s, 0, 0); g.quadraticCurveTo(s / 2, s, s, 0); g.stroke(); }
      else { g.fillRect(-s / 2, -2, s, 4); }
      g.restore(); });
  }
  grain(g, W, H, 8, 1);
  return tex(cv, { repeat: true, aniso: 4 });
}
function countertopTexture() {
  const W = 512, H = 512, cv = cnv(W, H), g = cv.getContext('2d'), r = rng(12);
  g.fillStyle = '#d9cfc0'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 3000; i++) { g.fillStyle = ['rgba(90,80,70,0.5)', 'rgba(180,140,60,0.6)', 'rgba(255,255,255,0.6)', 'rgba(40,90,110,0.4)'][i % 4]; g.fillRect(r() * W, r() * H, 1 + r() * 3, 1 + r() * 2); }
  return tex(cv, { repeat: true, aniso: 8 });
}
function woodTexture() {
  const W = 256, H = 256, cv = cnv(W, H), g = cv.getContext('2d'), r = rng(8);
  g.fillStyle = '#6b4126'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 70; i++) { const y = r() * H; g.strokeStyle = `rgba(${r() < 0.5 ? '40,20,10' : '150,100,60'},${0.2 + r() * 0.3})`; g.lineWidth = 1 + r() * 2; g.beginPath(); for (let x = 0; x <= W; x += 16) g.lineTo(x, y + Math.sin(x * 0.03 + i) * 3); g.stroke(); }
  return tex(cv, { repeat: true });
}
function glowTexture() {
  const S = 128, cv = cnv(S, S), g = cv.getContext('2d');
  const gr = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,255,255,0.45)'); gr.addColorStop(0.6, 'rgba(255,255,255,0.1)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, S, S);
  return tex(cv, { srgb: false });
}
function shadowTexture() {
  const S = 128, cv = cnv(S, S), g = cv.getContext('2d');
  // soft rounded-rect contact shadow
  g.filter = 'blur(10px)'; g.fillStyle = '#000'; g.fillRect(22, 22, S - 44, S - 44); g.filter = 'none';
  return tex(cv, { srgb: false });
}
function washTexture() {
  const W = 16, H = 128, cv = cnv(W, H), g = cv.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,255,255,0.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  return tex(cv, { srgb: false });
}
function neonTexture(text, color, w = 1024, h = 256, mirror = false, size = 150, font = 'italic 900') {
  const cv = cnv(w, h), g = cv.getContext('2d');
  if (mirror) { g.translate(w, 0); g.scale(-1, 1); }
  g.font = `${font} ${size}px ${text.length > 8 ? '"Segoe Script", "Brush Script MT", cursive' : FONT}`;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  const tw = g.measureText(text).width; if (tw > w * 0.9) { g.translate(w / 2, 0); g.scale(w * 0.9 / tw, 1); g.translate(-w / 2, 0); }
  g.lineJoin = 'round';
  g.shadowColor = color; g.shadowBlur = 30; g.strokeStyle = color; g.lineWidth = 14; g.strokeText(text, w / 2, h / 2);
  g.shadowBlur = 12; g.lineWidth = 8; g.strokeText(text, w / 2, h / 2);
  g.shadowBlur = 0; g.strokeStyle = '#ffffff'; g.lineWidth = 3; g.strokeText(text, w / 2, h / 2);
  return tex(cv);
}
function streetTexture() {
  const W = 1024, H = 512, cv = cnv(W, H), g = cv.getContext('2d'), r = rng(60);
  const sky = g.createLinearGradient(0, 0, 0, H * 0.55); sky.addColorStop(0, '#04050f'); sky.addColorStop(1, '#1a2040');
  g.fillStyle = sky; g.fillRect(0, 0, W, H);
  // buildings across the street
  let x = 0;
  while (x < W) {
    const bw = 90 + r() * 140, bh = 120 + r() * 160, y0 = H * 0.62 - bh;
    g.fillStyle = `rgb(${14 + r() * 10},${14 + r() * 10},${24 + r() * 14})`; g.fillRect(x, y0, bw - 4, bh);
    for (let wy = y0 + 14; wy < H * 0.62 - 30; wy += 26) for (let wx = x + 10; wx < x + bw - 20; wx += 22) if (r() < 0.35) { g.fillStyle = r() < 0.5 ? 'rgba(255,200,120,0.85)' : 'rgba(150,200,255,0.6)'; g.fillRect(wx, wy, 11, 14); }
    x += bw;
  }
  // laundromat sign across the street
  g.save(); g.shadowColor = '#7cff9b'; g.shadowBlur = 18; g.fillStyle = '#c8ffd8'; g.font = `bold 34px ${FONT}`; g.textAlign = 'center'; g.fillText('SUDS & SPIN 24H', W * 0.3, H * 0.47); g.restore();
  g.fillStyle = 'rgba(255,240,200,0.12)'; g.fillRect(W * 0.18, H * 0.5, W * 0.24, H * 0.12);
  // sidewalk and road
  g.fillStyle = '#16151c'; g.fillRect(0, H * 0.62, W, H * 0.38);
  g.fillStyle = '#2a2830'; g.fillRect(0, H * 0.62, W, 10);
  g.fillStyle = 'rgba(255,220,120,0.6)'; for (let k = 0; k < 8; k++) g.fillRect(k * 140 + 20, H * 0.8, 70, 5);
  // reflections of the lamps on wet asphalt
  for (const lx of [W * 0.12, W * 0.72]) {
    g.fillStyle = '#2c2c36'; g.fillRect(lx - 3, H * 0.2, 6, H * 0.43);
    const lg = g.createRadialGradient(lx, H * 0.2, 0, lx, H * 0.2, 90); lg.addColorStop(0, 'rgba(255,214,150,0.95)'); lg.addColorStop(1, 'rgba(255,214,150,0)');
    g.fillStyle = lg; g.beginPath(); g.arc(lx, H * 0.2, 90, 0, TAU); g.fill();
    const rg = g.createLinearGradient(0, H * 0.64, 0, H); rg.addColorStop(0, 'rgba(255,200,130,0.35)'); rg.addColorStop(1, 'rgba(255,200,130,0)');
    g.fillStyle = rg; g.fillRect(lx - 24, H * 0.64, 48, H * 0.36);
  }
  // a parked hatchback silhouette
  g.fillStyle = '#0b0b12'; g.beginPath(); g.moveTo(W * 0.5, H * 0.74); g.lineTo(W * 0.52, H * 0.66); g.lineTo(W * 0.6, H * 0.64); g.lineTo(W * 0.66, H * 0.68); g.lineTo(W * 0.68, H * 0.74); g.fill();
  g.fillStyle = 'rgba(255,60,60,0.8)'; g.fillRect(W * 0.675, H * 0.7, 8, 5);
  grain(g, W, H, 8, 2);
  return tex(cv);
}
function posterTexture(kind) {
  const W = 512, H = 720, cv = cnv(W, H), g = cv.getContext('2d'), r = rng(kind.length * 13);
  g.textAlign = 'center'; g.textBaseline = 'middle';
  if (kind === 'rules') {
    g.fillStyle = '#f4ecd8'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#e2384d'; g.fillRect(0, 0, W, 110);
    g.fillStyle = '#fff'; g.font = `900 52px ${FONT}`; g.fillText('HOUSE RULES', W / 2, 58);
    g.fillStyle = '#222'; g.font = `bold 30px ${FONT}`;
    ['1. HAVE FUN, BE KIND', '2. NO DRINKS ON', '    THE MACHINES', '3. ONE TOKEN = 25¢', '4. TOKENS CAN\'T BE', '    REFUNDED', '5. ASK AT THE COUNTER', '    IF A GAME EATS', '    YOUR TOKEN!'].forEach((t, i) => { g.textAlign = 'left'; g.fillText(t, 40, 170 + i * 52); });
    g.textAlign = 'center'; g.fillStyle = '#7b3cff'; g.font = `italic bold 28px ${FONT}`; g.fillText('— THE MGMT ♥', W / 2, H - 50);
  } else if (kind === 'night') {
    const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#2a0f5c'); bg.addColorStop(1, '#ff3fa4'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
    starfield(g, W, H * 0.5, 80, 3);
    logoText(g, 'TOKEN', W / 2, 150, 96, '#ffe14d', '#ff7a1a', '#1a0630');
    logoText(g, 'TUESDAYS', W / 2, 260, 80, '#ffffff', '#33e1ff', '#1a0630');
    g.fillStyle = '#fff'; g.font = `900 120px ${FONT}`; g.fillText('2 FOR 1', W / 2, 430);
    g.font = `bold 32px ${FONT}`; g.fillText('6 PM — CLOSE', W / 2, 540);
    g.font = `bold 24px ${FONT}`; g.fillText('BRING A FRIEND · BEAT A SCORE', W / 2, 600);
  } else if (kind === 'light') {
    const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#040a24'); bg.addColorStop(1, '#1f6f9a'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
    starfield(g, W, H * 0.6, 120, 9);
    drawLighthouse(g, W * 0.68, H * 0.82, 120, GAMES.light.c);
    g.fillStyle = '#0b3a5c'; g.fillRect(0, H * 0.84, W, H * 0.16);
    logoText(g, 'NOW PLAYING', W / 2, 70, 48, '#ffffff', '#36c6e8', '#000');
    logoText(g, 'LUNAR', W * 0.35, 150, 70, '#ffcf4a', '#e2384d', '#000');
    logoText(g, 'LIGHTHOUSE', W * 0.42, 225, 62, '#fff3c4', '#ffcf4a', '#000');
  } else { // high-score board
    g.fillStyle = '#0d0a1c'; g.fillRect(0, 0, W, H);
    g.strokeStyle = '#ffd23f'; g.lineWidth = 8; g.strokeRect(12, 12, W - 24, H - 24);
    logoText(g, 'HALL OF FAME', W / 2, 70, 50, '#ffe14d', '#ff7a1a', '#000');
    g.font = `bold 26px ${MONO}`;
    let y = 140;
    for (const k of ['light', 'crater', 'nomads', 'tide', 'kite']) {
      g.fillStyle = GAMES[k].c[0]; g.fillText(GAMES[k].title, W / 2, y); y += 34;
      g.fillStyle = '#ddd'; g.fillText(`${['JMR', 'AVA', 'DOT', 'KAI', 'LOU'][Math.floor(r() * 5)]} ....... ${String(20000 + Math.floor(r() * 60000)).padStart(6, '0')}`, W / 2, y); y += 70;
    }
  }
  grain(g, W, H, 10, 4);
  return tex(cv, { aniso: 4 });
}
function labelTexture(lines, bg, fg, w = 256, h = 128, size = 34) {
  const cv = cnv(w, h), g = cv.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, w, h);
  g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = `bold ${size}px ${FONT}`;
  lines.forEach((t, i) => g.fillText(t, w / 2, h / 2 + (i - (lines.length - 1) / 2) * size * 1.15));
  return tex(cv);
}
function coinDoorTexture() {
  const W = 256, H = 384, cv = cnv(W, H), g = cv.getContext('2d'), r = rng(17);
  g.fillStyle = '#2b2b31'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 300; i++) { const y = r() * H; g.fillStyle = `rgba(255,255,255,${r() * 0.05})`; g.fillRect(0, y, W, 1); }
  g.strokeStyle = 'rgba(0,0,0,0.6)'; g.lineWidth = 4; g.strokeRect(10, 10, W - 20, H - 20);
  g.strokeStyle = 'rgba(255,255,255,0.12)'; g.lineWidth = 2; g.strokeRect(14, 14, W - 28, H - 28);
  // scratches around the slots where tokens miss
  for (const sx of [W * 0.3, W * 0.7]) for (let i = 0; i < 26; i++) { const x = sx + (r() - 0.5) * 70, y = H * 0.3 + (r() - 0.5) * 90; g.strokeStyle = `rgba(220,220,230,${0.15 + r() * 0.3})`; g.lineWidth = 1; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 30, y + (r() - 0.5) * 30); g.stroke(); }
  g.fillStyle = 'rgba(255,255,255,0.75)'; g.font = `bold 18px ${FONT}`; g.textAlign = 'center';
  g.fillText('TOKENS ONLY', W / 2, H * 0.72);
  g.font = `bold 13px ${FONT}`; g.fillText('PUSH TO RETURN', W / 2, H * 0.53);
  return tex(cv);
}
function coinInsertTexture(txt, col) {
  const W = 64, H = 128, cv = cnv(W, H), g = cv.getContext('2d');
  g.fillStyle = col; g.fillRect(0, 0, W, H);
  const gr = g.createLinearGradient(0, 0, W, 0); gr.addColorStop(0, 'rgba(0,0,0,0.35)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.15)'); gr.addColorStop(1, 'rgba(0,0,0,0.35)');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.fillStyle = '#100'; g.fillRect(W / 2 - 4, 14, 8, 50);
  g.fillStyle = '#fff'; g.font = `bold 22px ${FONT}`; g.textAlign = 'center'; g.fillText(txt, W / 2, 100);
  return tex(cv);
}
function stripesTexture(a, b, n = 6) {
  const cv = cnv(64, 256), g = cv.getContext('2d');
  for (let i = 0; i < n; i++) { g.fillStyle = i % 2 ? b : a; g.fillRect(0, i * 256 / n, 64, 256 / n); }
  return tex(cv);
}
