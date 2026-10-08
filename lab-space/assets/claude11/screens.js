// Fictional, original test graphics for the lab displays. Each drawer gets (ctx, w, h, t).
const TAU = Math.PI * 2;

function grid(c, w, h, step, col) {
  c.strokeStyle = col; c.lineWidth = 1; c.beginPath();
  for (let x = 0; x <= w; x += step) { c.moveTo(x + 0.5, 0); c.lineTo(x + 0.5, h); }
  for (let y = 0; y <= h; y += step) { c.moveTo(0, y + 0.5); c.lineTo(w, y + 0.5); }
  c.stroke();
}
function header(c, w, h, title, sub, accent) {
  c.fillStyle = '#0d1a24'; c.fillRect(0, 0, w, h * 0.09);
  c.fillStyle = accent; c.fillRect(0, h * 0.09 - 3, w, 3);
  c.fillStyle = '#e8f0f4'; c.font = `600 ${h * 0.05}px Consolas, monospace`; c.textBaseline = 'middle'; c.textAlign = 'left';
  c.fillText(title, w * 0.02, h * 0.047);
  c.textAlign = 'right'; c.fillStyle = '#8fb3c8'; c.fillText(sub, w * 0.98, h * 0.047); c.textAlign = 'left';
}

// Perception display A: original resolution / colour test pattern with a sweeping scan line.
export function drawPattern(c, w, h, t) {
  c.fillStyle = '#5a5a5a'; c.fillRect(0, 0, w, h);
  const bars = ['#c0c0c0', '#c0c000', '#00c0c0', '#00c000', '#c000c0', '#c00000', '#0000c0'];
  bars.forEach((col, i) => { c.fillStyle = col; c.fillRect((i * w) / 7, 0, w / 7 + 1, h * 0.18); });
  for (let i = 0; i < 16; i++) { const v = Math.round((i / 15) * 255); c.fillStyle = `rgb(${v},${v},${v})`; c.fillRect((i * w) / 16, h * 0.82, w / 16 + 1, h * 0.18); }
  grid(c, w, h, h / 12, 'rgba(255,255,255,0.18)');
  const cx = w / 2, cy = h / 2;
  c.strokeStyle = '#fff'; c.lineWidth = 2;
  for (const r of [0.08, 0.16, 0.24, 0.3]) { c.beginPath(); c.arc(cx, cy, h * r, 0, TAU); c.stroke(); }
  // Siemens-style star in centre
  for (let k = 0; k < 24; k++) { c.fillStyle = k % 2 ? '#111' : '#eee'; c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, h * 0.075, (k / 24) * TAU, ((k + 1) / 24) * TAU); c.fill(); }
  // frequency wedges left/right
  for (let k = 0; k < 18; k++) { c.fillStyle = '#111'; c.fillRect(w * 0.06 + k * (w * 0.012 - k * 0.25), h * 0.3, Math.max(1, w * 0.006 - k * 0.12), h * 0.4); }
  for (let k = 0; k < 18; k++) { c.fillStyle = '#eee'; c.fillRect(w * 0.82, h * 0.3 + k * (h * 0.022), w * 0.12, Math.max(1, h * 0.011 - k * 0.25)); }
  // corner markers
  c.fillStyle = '#fff';
  for (const [x, y] of [[0.03, 0.22], [0.94, 0.22], [0.03, 0.72], [0.94, 0.72]]) { c.fillRect(w * x, h * y, w * 0.03, h * 0.012); c.fillRect(w * x + w * 0.009, h * y - h * 0.02, w * 0.012, h * 0.05); }
  // scan line
  const sy = h * 0.18 + ((t * 0.25) % 1) * h * 0.64;
  c.fillStyle = 'rgba(80,255,170,0.35)'; c.fillRect(0, sy, w, 3);
  c.fillStyle = '#000a'; c.fillRect(w * 0.02, h * 0.2, w * 0.3, h * 0.07);
  c.fillStyle = '#7dffb6'; c.font = `600 ${h * 0.04}px Consolas, monospace`; c.textBaseline = 'middle';
  c.fillText(`PB-A  CAL 04   ${(t % 60).toFixed(1).padStart(4, '0')}s`, w * 0.03, h * 0.235);
}

// Perception display B: schematic detections of the turntable samples.
export function drawDetect(c, w, h, t) {
  c.fillStyle = '#10161b'; c.fillRect(0, 0, w, h);
  header(c, w, h, 'CAM-A1 · DETECTION REVIEW', `RUN 14 · STEP ${(Math.floor(t * 0.6) % 24) + 1}/24`, '#3aa0ff');
  const fx = w * 0.03, fy = h * 0.12, fw = w * 0.62, fh = h * 0.8;
  c.fillStyle = '#2a3036'; c.fillRect(fx, fy, fw, fh);
  grid(c, fw, fh, 1e9, '#000');
  c.save(); c.translate(fx + fw / 2, fy + fh * 0.62); c.scale(1, 0.38);
  c.fillStyle = '#4a5056'; c.beginPath(); c.arc(0, 0, fw * 0.36, 0, TAU); c.fill();
  c.restore();
  const ang = Math.floor(t * 0.6) * (TAU / 24);
  const objs = [['cube', '#c0392b', 0.97], ['sphere', '#2d6fb0', 0.99], ['cone', '#e0b020', 0.94], ['cylinder', '#3d8a4a', 0.91], ['torus', '#d7642a', 0.88]];
  objs.forEach(([name, col, conf], i) => {
    const a = ang + (i / objs.length) * TAU, ox = fx + fw / 2 + Math.cos(a) * fw * 0.24, oy = fy + fh * 0.62 + Math.sin(a) * fh * 0.13 - fh * 0.08;
    const s = fh * 0.1 * (0.85 + 0.15 * Math.sin(a));
    c.fillStyle = col;
    if (name === 'sphere') { c.beginPath(); c.arc(ox, oy, s * 0.5, 0, TAU); c.fill(); }
    else if (name === 'cone') { c.beginPath(); c.moveTo(ox, oy - s * 0.6); c.lineTo(ox + s * 0.45, oy + s * 0.5); c.lineTo(ox - s * 0.45, oy + s * 0.5); c.fill(); }
    else if (name === 'torus') { c.lineWidth = s * 0.22; c.strokeStyle = col; c.beginPath(); c.ellipse(ox, oy, s * 0.45, s * 0.22, 0, 0, TAU); c.stroke(); }
    else c.fillRect(ox - s * 0.4, oy - s * 0.5, s * 0.8, s);
    const cf = Math.max(0.5, conf - (name === 'cylinder' && Math.abs(Math.sin(a)) > 0.9 ? 0.2 : 0));
    c.strokeStyle = cf > 0.9 ? '#5dffa0' : '#ffc040'; c.lineWidth = 2; c.strokeRect(ox - s * 0.65, oy - s * 0.75, s * 1.3, s * 1.45);
    c.fillStyle = c.strokeStyle; c.font = `600 ${h * 0.034}px Consolas, monospace`; c.textBaseline = 'bottom'; c.fillText(`${name} ${cf.toFixed(2)}`, ox - s * 0.65, oy - s * 0.78);
  });
  // side table
  const tx = w * 0.68;
  c.fillStyle = '#c8d6df'; c.font = `600 ${h * 0.036}px Consolas, monospace`; c.textBaseline = 'top';
  c.fillText('CLASS      CONF  IoU', tx, h * 0.14);
  objs.forEach(([n, col, cf], i) => { c.fillStyle = col; c.fillRect(tx, h * 0.2 + i * h * 0.065, h * 0.03, h * 0.03); c.fillStyle = '#c8d6df'; c.fillText(`${n.padEnd(9)} ${cf.toFixed(2)}  0.${80 + i * 3}`, tx + h * 0.045, h * 0.195 + i * h * 0.065); });
  c.strokeStyle = '#3aa0ff'; c.lineWidth = 2; c.beginPath();
  for (let i = 0; i < 60; i++) { const x = tx + (i / 59) * w * 0.29, y = h * 0.86 - (0.6 + 0.3 * Math.sin(i * 0.3 + t * 0.5) * Math.cos(i * 0.11)) * h * 0.4; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
  c.fillStyle = '#8fb3c8'; c.fillText('mean conf / step', tx, h * 0.9);
}

// Motion console screen 1: joint states.
export function drawJoints(c, w, h, t) {
  c.fillStyle = '#0f1418'; c.fillRect(0, 0, w, h);
  header(c, w, h, 'RIG B · AXIS STATUS', 'MODE: TEST  ●', '#d7642a');
  const rows = [['AX-1', 'mm', 412.6 + Math.sin(t * 0.4) * 0.3, 0.55], ['J1', '°', -28.6, 0.42], ['J2', '°', 28.0, 0.58], ['J3', '°', -100.0, 0.22], ['J4', '°', 42.0, 0.62]];
  rows.forEach(([n, u, v, f], i) => {
    const y = h * 0.16 + i * h * 0.155;
    c.fillStyle = '#c8d6df'; c.font = `600 ${h * 0.06}px Consolas, monospace`; c.textBaseline = 'middle';
    c.fillText(n, w * 0.04, y + h * 0.04);
    c.fillStyle = '#1e2a33'; c.fillRect(w * 0.18, y + h * 0.015, w * 0.48, h * 0.05);
    c.fillStyle = '#d7642a'; c.fillRect(w * 0.18, y + h * 0.015, w * 0.48 * f, h * 0.05);
    c.fillStyle = '#e8f0f4'; c.textAlign = 'right'; c.fillText(`${v.toFixed(1)} ${u}`, w * 0.9, y + h * 0.04); c.textAlign = 'left';
    c.fillStyle = '#5dffa0'; c.beginPath(); c.arc(w * 0.95, y + h * 0.04, h * 0.018, 0, TAU); c.fill();
  });
  c.fillStyle = '#8fb3c8'; c.font = `500 ${h * 0.045}px Consolas, monospace`;
  c.fillText(`CYCLE 1${String(Math.floor(t / 4) % 1000).padStart(3, '0')}   E-STOP OK   CURTAIN OK`, w * 0.04, h * 0.95);
}

// Motion console screen 2: position trace + following error.
export function drawTrace(c, w, h, t) {
  c.fillStyle = '#0f1418'; c.fillRect(0, 0, w, h);
  header(c, w, h, 'AX-1 POSITION TRACE', '10 s WINDOW', '#3aa0ff');
  const gx = w * 0.06, gy = h * 0.14, gw = w * 0.9, gh = h * 0.5;
  c.save(); c.translate(gx, gy); grid(c, gw, gh, gh / 5, 'rgba(120,160,190,0.18)'); c.restore();
  const f = (x) => Math.sin(x * 0.8) * 0.8 + Math.sin(x * 2.1) * 0.12;
  c.strokeStyle = '#3aa0ff'; c.lineWidth = 2; c.beginPath();
  for (let i = 0; i <= 160; i++) { const x = gx + (i / 160) * gw, y = gy + gh / 2 - f(t + i * 0.06) * gh * 0.42; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
  c.strokeStyle = 'rgba(255,255,255,0.4)'; c.setLineDash([5, 5]); c.beginPath();
  for (let i = 0; i <= 160; i++) { const x = gx + (i / 160) * gw, y = gy + gh / 2 - Math.sin((t + i * 0.06) * 0.8) * 0.8 * gh * 0.42; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); c.setLineDash([]);
  const ey = h * 0.72, eh = h * 0.18;
  c.save(); c.translate(gx, ey); grid(c, gw, eh, eh / 2, 'rgba(120,160,190,0.18)'); c.restore();
  c.strokeStyle = '#ffc040'; c.beginPath();
  for (let i = 0; i <= 160; i++) { const x = gx + (i / 160) * gw, y = ey + eh / 2 - Math.sin((t + i * 0.06) * 2.1) * 0.12 * eh * 2.5; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
  c.fillStyle = '#8fb3c8'; c.font = `500 ${h * 0.045}px Consolas, monospace`; c.textBaseline = 'middle';
  c.fillText('following error  ±0.05 mm', gx, h * 0.95);
}

// Hall data wall: ORBIS-7 acquisition overview.
export function drawDataWall(c, w, h, t) {
  c.fillStyle = '#0c1318'; c.fillRect(0, 0, w, h);
  header(c, w, h, 'ORBIS-7 · LIVE ACQUISITION', `FRAME ${String(Math.floor(t * 2.5)).padStart(6, '0')} · 13 VIEWS · SYNC OK`, '#2f9f98');
  // 13 thumbnail tiles of the sample from different views
  const cols = 5, tw = (w * 0.62) / cols, th = tw * 0.62, ox = w * 0.025, oy = h * 0.13;
  for (let i = 0; i < 13; i++) {
    const x = ox + (i % cols) * tw, y = oy + Math.floor(i / cols) * (th + h * 0.035);
    c.fillStyle = '#16232b'; c.fillRect(x + 3, y + 3, tw - 6, th - 6);
    const a = (i / 13) * TAU + t * 0.15, cx = x + tw / 2, cy = y + th / 2;
    const sx = Math.abs(Math.cos(a)) * th * 0.18 + th * 0.06, sy = th * 0.3;
    const g = c.createRadialGradient(cx, cy, 1, cx, cy, sy);
    g.addColorStop(0, '#e6ffff'); g.addColorStop(0.5, '#58c8e8'); g.addColorStop(1, 'rgba(20,60,80,0)');
    c.fillStyle = g; c.beginPath(); c.moveTo(cx, cy - sy); c.lineTo(cx + sx, cy); c.lineTo(cx, cy + sy); c.lineTo(cx - sx, cy); c.closePath(); c.fill();
    c.fillStyle = '#8fb3c8'; c.font = `600 ${h * 0.026}px Consolas, monospace`; c.textBaseline = 'top';
    c.fillText(i < 4 ? `L${i + 1}` : i < 8 ? `S${i - 3}` : i < 12 ? `A${i - 7}` : 'T0', x + 8, y + 7);
    c.fillStyle = i === 5 ? '#ffb020' : '#5dffa0'; c.fillRect(x + tw - 18, y + 9, 8, 8);
  }
  // right column: histogram + exposure stats
  const rx = w * 0.67, rw = w * 0.3;
  c.fillStyle = '#c8d6df'; c.font = `600 ${h * 0.032}px Consolas, monospace`; c.textBaseline = 'top';
  c.fillText('INTENSITY HISTOGRAM', rx, h * 0.13);
  for (let i = 0; i < 48; i++) {
    const v = Math.exp(-((i - 30) ** 2) / 60) * 0.8 + Math.exp(-((i - 10) ** 2) / 20) * 0.35 + 0.03 * Math.sin(i * 3 + t * 2);
    c.fillStyle = '#2f9f98'; c.fillRect(rx + i * (rw / 48), h * 0.45 - v * h * 0.26, rw / 48 - 1, v * h * 0.26);
  }
  const stats = [['exposure', '4.0 ms'], ['gain', '+2 dB'], ['sample temp', `${(22.4 + Math.sin(t * 0.2) * 0.1).toFixed(1)} °C`], ['stage XY', '+0.012 / -0.004 mm'], ['ring light', '62 %'], ['channel 6', 'RECAL DUE']];
  stats.forEach(([k, v], i) => { c.fillStyle = '#8fb3c8'; c.fillText(k, rx, h * 0.52 + i * h * 0.06); c.fillStyle = i === 5 ? '#ffb020' : '#e8f0f4'; c.textAlign = 'right'; c.fillText(v, rx + rw, h * 0.52 + i * h * 0.06); c.textAlign = 'left'; });
  c.fillStyle = '#2f9f98'; c.fillRect(0, h - 6, ((t * 0.1) % 1) * w, 6);
}

export const DRAWERS = { pattern: drawPattern, detect: drawDetect, joints: drawJoints, trace: drawTrace, datawall: drawDataWall };
