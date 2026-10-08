// West alcove: perception-testing bench with machine-vision camera, turntable samples,
// calibration chart, lighting panels and test-pattern displays.
import * as THREE from 'three';
import { cableGeo } from './builder.js';

const D = Math.PI / 180;

export function buildPerception(ctx) {
  const { b, M, A } = ctx;
  const BX0 = -11.98, BX1 = -11.13, BZ0 = -2.5, BZ1 = 2.5, TOP = 0.92;
  const bx = (BX0 + BX1) / 2;

  // ---- Workbench --------------------------------------------------------------
  b.box(BX1 - BX0 + 0.02, 0.04, BZ1 - BZ0, M.worktop, [bx, TOP - 0.02, 0]);
  b.box(0.03, 0.06, BZ1 - BZ0, M.steelDark, [BX1 - 0.03, TOP - 0.07, 0]);
  for (const z of [BZ0 + 0.05, 0, BZ1 - 0.05]) for (const x of [BX0 + 0.05, BX1 - 0.06]) b.box(0.05, TOP - 0.04, 0.05, M.steelDark, [x, (TOP - 0.04) / 2, z]);
  b.box(BX1 - BX0 - 0.1, 0.025, BZ1 - BZ0 - 0.1, M.paintGrey, [bx, 0.24, 0]);
  for (const z of [BZ0 + 0.05, 0, BZ1 - 0.05]) b.box(BX1 - BX0 - 0.1, 0.04, 0.03, M.steelDark, [bx, 0.22, z]);
  // power rail + outlets on back upstand
  b.box(0.06, 0.1, BZ1 - BZ0, M.paintWhite, [BX0 + 0.03, TOP + 0.05, 0]);
  for (let z = BZ0 + 0.3; z < BZ1; z += 0.45) {
    b.box(0.006, 0.05, 0.08, M.plasticLight, [BX0 + 0.063, TOP + 0.05, z]);
    b.box(0.004, 0.012, 0.012, z > 0 ? M.ledRed : M.ledGreen, [BX0 + 0.066, TOP + 0.085, z + 0.03]);
  }
  b.collideBox(BX0 - 0.05, BX1 + 0.02, BZ0 - 0.02, BZ1 + 0.02);
  // anti-fatigue mat
  b.box(0.9, 0.012, 3.6, M.rubber, [-10.6, 0.006, -0.2]);
  for (const s of [-1, 1]) b.box(0.9, 0.014, 0.04, M.paintYellow, [-10.6, 0.007, -0.2 + s * 1.78]);

  // ---- Wall: uprights + shelf + bench sign --------------------------------------
  for (const z of [-2.3, -0.8, 0.8, 2.3]) b.box(0.02, 1.1, 0.03, M.steel, [-11.99, 1.75, z]);
  b.box(0.32, 0.025, 4.8, M.paintWhite, [-11.84, 2.05, 0]);
  for (const z of [-2.3, -0.8, 0.8, 2.3]) b.box(0.3, 0.04, 0.02, M.steel, [-11.85, 2.02, z]);
  const boxes = [[-2.1, 0.3, 0.2, M.cardboard], [-1.75, 0.25, 0.16, M.paintBlue], [-1.45, 0.22, 0.12, M.cardboard], [1.3, 0.28, 0.18, M.paintDark], [1.65, 0.3, 0.24, M.cardboard], [2.05, 0.2, 0.14, M.paintBlue]];
  for (const [z, w, h, m] of boxes) b.box(0.26, h, w, m, [-11.84, 2.0625 + h / 2, z]);
  b.add(A.sign(0.25, 0.05, { bg: '#f4f2ea', lines: [{ t: 'LENS KIT 2', size: 0.6, weight: 700 }] }), M.label, [-11.709, 2.15, -1.75], [0, Math.PI / 2, 0]);
  b.add(A.sign(0.3, 0.06, { bg: '#f4f2ea', lines: [{ t: 'SAMPLE SET B', size: 0.6, weight: 700 }] }), M.label, [-11.709, 2.2, 1.65], [0, Math.PI / 2, 0]);
  b.add(A.plane(0.6, 0.84, 500, (c, w, h) => drawProtocol(c, w, h)), M.label, [-11.995, 1.55, -0.35], [0, Math.PI / 2, 0]);

  // ---- Sample stage: turntable, samples, backdrop chart, light panels -----------------
  const TZ = 1.15, TX = -11.55;
  b.cyl(0.24, 0.26, 0.05, M.anodBlack, [TX, TOP + 0.025, TZ], [0, 0, 0], 48);
  b.cyl(0.22, 0.22, 0.015, M.calGrey, [TX, TOP + 0.057, TZ], [0, 0, 0], 48);
  b.add(A.plane(0.44, 0.44, 900, (c, w, h) => drawTurntable(c, w, h)), M.labelCut, [TX, TOP + 0.0655, TZ], [-Math.PI / 2, 0, 0]);
  const ty = TOP + 0.066;
  b.box(0.08, 0.08, 0.08, M.paintRed, [TX - 0.08, ty + 0.04, TZ - 0.08], [0, 0.4, 0]);
  b.add(new THREE.SphereGeometry(0.05, 28, 16), M.paintBlue, [TX + 0.09, ty + 0.05, TZ - 0.06]);
  b.add(new THREE.ConeGeometry(0.05, 0.12, 28), M.paintYellow, [TX - 0.06, ty + 0.06, TZ + 0.1]);
  b.cyl(0.04, 0.04, 0.1, M.paintGreen, [TX + 0.08, ty + 0.05, TZ + 0.1], [0, 0, 0], 28);
  b.add(new THREE.TorusGeometry(0.04, 0.015, 12, 28), M.paintOrange, [TX + 0.01, ty + 0.015, TZ + 0.01], [Math.PI / 2, 0, 0]);
  // spare samples in a tray
  b.box(0.3, 0.02, 0.2, M.plasticLight, [-11.4, TOP + 0.01, 2.2]);
  b.add(new THREE.IcosahedronGeometry(0.04, 0), M.paintWhite, [-11.47, TOP + 0.06, 2.2]);
  b.add(new THREE.TetrahedronGeometry(0.05, 0), M.paintTeal, [-11.35, TOP + 0.05, 2.22]);
  // turntable drive cable
  b.add(cableGeo([[TX - 0.2, TOP + 0.02, TZ - 0.2], [-11.85, TOP + 0.01, TZ - 0.35], [-11.9, TOP + 0.01, 0.2], [-11.93, TOP + 0.04, -0.2]], 0.006, 20, 6), M.rubber);
  // Calibration chart on a stand
  b.box(0.04, 0.8, 0.04, M.steelDark, [-11.88, TOP + 0.4, TZ]);
  b.box(0.2, 0.012, 0.3, M.steelDark, [-11.85, TOP + 0.006, TZ]);
  b.box(0.012, 0.6, 0.84, M.paintWhite, [-11.84, TOP + 0.47, TZ]);
  b.add(A.plane(0.8, 0.56, 900, (c, w, h) => drawChart(c, w, h)), M.label, [-11.8335, TOP + 0.47, TZ], [0, Math.PI / 2, 0]);
  // LED light panels on stands, aimed at the turntable
  for (const s of [-1, 1]) {
    const lz = TZ + s * 0.62, lx = -11.32;
    b.cyl(0.08, 0.09, 0.02, M.anodBlack, [lx, TOP + 0.01, lz], [0, 0, 0], 20);
    b.cyl(0.012, 0.012, 0.5, M.steel, [lx, TOP + 0.26, lz], [0, 0, 0], 10);
    b.pushLook([lx, TOP + 0.55, lz], [TX, TOP + 0.08, TZ]);
    b.box(0.3, 0.22, 0.04, M.anodBlack, [0, 0, 0]);
    b.box(0.27, 0.19, 0.004, M.lightPanel, [0, 0, -0.021]);
    for (let f = 0; f < 5; f++) b.box(0.26, 0.004, 0.02, M.alu, [0, -0.08 + f * 0.04, 0.03]);
    b.cyl(0.02, 0.02, 0.05, M.anodBlack, [0.17, 0, 0], [0, 0, Math.PI / 2], 10);
    b.pop();
    b.add(cableGeo([[lx, TOP + 0.45, lz + 0.03], [lx - 0.1, TOP + 0.2, lz + 0.05], [lx - 0.3, TOP + 0.01, lz + 0.04], [-11.9, TOP + 0.01, lz], [-11.93, TOP + 0.06, lz - 0.05 * s]], 0.005, 24, 6), M.rubber);
  }

  // ---- Machine-vision camera on optical rail + pan/tilt -----------------------------
  const CZ = -0.45, CX = -11.55;
  b.box(0.06, 0.03, 0.7, M.alu, [CX, TOP + 0.015, CZ]);
  for (const z of [CZ - 0.33, CZ + 0.33]) b.box(0.12, 0.02, 0.04, M.anodBlack, [CX, TOP + 0.01, z]);
  b.box(0.1, 0.03, 0.1, M.anodBlack, [CX, TOP + 0.045, CZ + 0.1]);
  b.cyl(0.015, 0.015, 0.03, M.chrome, [CX + 0.06, TOP + 0.045, CZ + 0.1], [0, 0, Math.PI / 2], 10);
  b.cyl(0.018, 0.018, 0.22, M.steel, [CX, TOP + 0.17, CZ + 0.1], [0, 0, 0], 12);
  b.cyl(0.035, 0.035, 0.04, M.anodBlack, [CX, TOP + 0.3, CZ + 0.1], [0, 0, 0], 16);
  b.pushLook([CX, TOP + 0.37, CZ + 0.1], [TX, TOP + 0.08, TZ]);
  b.box(0.13, 0.03, 0.1, M.anodBlack, [0, -0.06, 0]);           // tilt plate
  b.box(0.1, 0.1, 0.12, M.paintDark, [0, 0, 0]);                // camera body
  b.box(0.104, 0.02, 0.124, M.paintTeal, [0, 0.03, 0]);
  for (let f = 0; f < 4; f++) b.box(0.106, 0.004, 0.08, M.alu, [0, -0.035 + f * 0.012, 0.01]);
  b.cyl(0.04, 0.04, 0.012, M.anodBlack, [0, 0, -0.066], [Math.PI / 2, 0, 0], 24);   // C-mount
  b.cyl(0.036, 0.036, 0.1, M.anodBlack, [0, 0, -0.12], [Math.PI / 2, 0, 0], 24);
  b.cyl(0.039, 0.039, 0.02, M.rubber, [0, 0, -0.1], [Math.PI / 2, 0, 0], 24);
  b.cyl(0.039, 0.039, 0.016, M.rubber, [0, 0, -0.145], [Math.PI / 2, 0, 0], 24);
  b.cyl(0.044, 0.038, 0.04, M.anodBlack, [0, 0, -0.185], [Math.PI / 2, 0, 0], 24);   // hood
  b.add(new THREE.SphereGeometry(0.05, 18, 6, 0, Math.PI * 2, 0, 0.6), M.lensCoat, [0, 0, -0.172 + 0.05 * Math.cos(0.6)], [-Math.PI / 2, 0, 0]);
  b.box(0.012, 0.012, 0.004, M.ledGreen, [0.03, 0.03, 0.062]);
  b.box(0.012, 0.012, 0.004, M.ledBlue, [0.01, 0.03, 0.062]);
  b.cyl(0.012, 0.012, 0.03, M.cableOrange, [-0.02, -0.02, 0.075], [Math.PI / 2, 0, 0], 10);
  b.add(A.sign(0.08, 0.025, { bg: '#2b2e33', lines: [{ t: 'CAM-A1', size: 0.6, color: '#fff', weight: 700 }] }), M.label, [0.0505, 0, 0], [0, Math.PI / 2, 0]);
  // depth sensor bar on top
  b.box(0.18, 0.035, 0.035, M.paintDark, [0, 0.085, -0.02]);
  b.box(0.02, 0.03, 0.02, M.anodBlack, [0, 0.06, -0.02]);
  for (const x of [-0.065, 0.065]) b.cyl(0.01, 0.01, 0.006, M.lens, [x, 0.085, -0.04], [Math.PI / 2, 0, 0], 12);
  b.cyl(0.006, 0.006, 0.006, M.ledRed, [0.02, 0.085, -0.04], [Math.PI / 2, 0, 0], 8);
  b.pop();
  b.add(cableGeo([[CX - 0.02, TOP + 0.35, CZ + 0.18], [CX - 0.04, TOP + 0.25, CZ + 0.3], [CX - 0.25, TOP + 0.01, CZ + 0.25], [-11.92, TOP + 0.01, CZ], [-11.94, TOP + 0.01, -1.3], [-11.94, TOP - 0.1, -1.6], [-11.9, 0.45, -1.7]], 0.007, 40, 6), M.cableOrange);

  // ---- Displays on arm --------------------------------------------------------------
  const mon = (z, yaw, id) => {
    b.box(0.08, 0.02, 0.08, M.anodBlack, [-11.9, TOP + 0.01, z]);
    b.cyl(0.018, 0.018, 0.42, M.steel, [-11.9, TOP + 0.22, z], [0, 0, 0], 12);
    b.box(0.2, 0.025, 0.04, M.steel, [-11.82, TOP + 0.42, z], [0, 0, 0]);
    b.push([-11.68, TOP + 0.4, z], [0, Math.PI / 2 + yaw, 0]);
    b.box(0.62, 0.38, 0.03, M.anodBlack, [0, 0, 0]);
    b.box(0.2, 0.15, 0.04, M.plastic, [0, 0, -0.03]);
    b.box(0.06, 0.008, 0.012, M.plastic, [0.24, -0.192, 0.012]);
    b.box(0.006, 0.006, 0.004, M.ledWhite, [0.27, -0.19, 0.016]);
    ctx.screen(id, 0.594, 0.334, 640, 360, [0, 0.01, 0.0162], [0, 0, 0]);
    if (id === 'pattern') b.add(A.sign(0.07, 0.07, { bg: '#ffe66d', lines: [{ t: 'gain', size: 0.24, color: '#333', weight: 500, font: 'Segoe Print, cursive' }, { t: '+2dB?', size: 0.24, color: '#333', weight: 500, font: 'Segoe Print, cursive' }] }), M.label, [-0.275, 0.14, 0.0185], [0, 0, 0.08]);
    b.pop();
  };
  mon(-1.4, -0.22, 'pattern');
  mon(-2.08, -0.5, 'detect');
  // keyboard, mouse, notebook, mug
  b.push([-11.42, TOP, -1.55], [0, Math.PI / 2 + 0.12, 0]);
  b.box(0.44, 0.02, 0.14, M.plastic, [0, 0.01, 0], [0.06, 0, 0]);
  b.add(A.plane(0.42, 0.12, 900, (c, w, h) => drawKeys(c, w, h)), M.label, [0, 0.0215, 0], [-Math.PI / 2 + 0.06, 0, 0]);
  b.pop();
  b.add(new THREE.SphereGeometry(0.03, 16, 8), M.plastic, [-11.42, TOP + 0.005, -1.18], [0, 0, 0], { scale: [1.0, 0.5, 1.6] });
  b.box(0.2, 0.004, 0.24, M.rubber, [-11.42, TOP + 0.002, -1.18]);
  b.push([-11.4, TOP, -0.95], [0, 0.25, 0]);
  b.box(0.21, 0.012, 0.29, M.paper, [0, 0.006, 0]);
  b.add(A.plane(0.2, 0.28, 900, (c, w, h) => drawNotes(c, w, h)), M.label, [0, 0.0125, 0], [-Math.PI / 2, 0, 0]);
  b.cyl(0.004, 0.004, 0.15, M.paintBlue, [0.06, 0.016, 0.02], [Math.PI / 2, 0, 0.3], 6);
  b.pop();
  b.cyl(0.042, 0.038, 0.1, M.paintWhite, [-11.28, TOP + 0.05, -2.25], [0, 0, 0], 20);
  b.add(new THREE.TorusGeometry(0.028, 0.008, 8, 16), M.paintWhite, [-11.24, TOP + 0.055, -2.25], [0, 0, 0]);
  // PC tower + UPS under the bench
  b.box(0.45, 0.45, 0.2, M.paintDark, [-11.6, 0.475, -1.9]);
  b.box(0.01, 0.4, 0.15, M.perf, [-11.372, 0.48, -1.9]);
  b.box(0.004, 0.012, 0.012, M.ledBlue, [-11.365, 0.66, -1.85]);
  b.box(0.4, 0.2, 0.15, M.plastic, [-11.6, 0.36, -1.45]);
  b.add(cableGeo([[-11.6, 0.6, -1.8], [-11.75, 0.7, -1.75], [-11.93, 0.85, -1.6], [-11.93, 0.93, -1.5]], 0.008, 16, 6), M.rubber);
  // cable tray under bench back edge
  b.box(0.12, 0.02, 4.6, M.perf, [-11.88, 0.78, 0]);
  b.box(0.01, 0.06, 4.6, M.perf, [-11.82, 0.8, 0]);
  for (const [k, m] of [M.rubber, M.cableGrey, M.cableOrange].entries()) b.cyl(0.008, 0.008, 4.5, m, [-11.9 + k * 0.02, 0.8, 0], [Math.PI / 2, 0, 0], 6);

  // ---- Lab stool ------------------------------------------------------------------
  const SX = -10.75, SZ = -1.55;
  for (let k = 0; k < 5; k++) { const a = k * 72 * D; b.box(0.03, 0.025, 0.3, M.anodBlack, [SX + Math.sin(a) * 0.15, 0.06, SZ + Math.cos(a) * 0.15], [0, a, 0]); b.add(new THREE.SphereGeometry(0.025, 10, 6), M.plastic, [SX + Math.sin(a) * 0.29, 0.025, SZ + Math.cos(a) * 0.29]); }
  b.cyl(0.025, 0.03, 0.45, M.chrome, [SX, 0.3, SZ], [0, 0, 0], 12);
  b.add(new THREE.TorusGeometry(0.17, 0.008, 6, 24), M.chrome, [SX, 0.3, SZ], [Math.PI / 2, 0, 0]);
  b.cyl(0.19, 0.18, 0.07, M.rubber, [SX, 0.57, SZ], [0, 0, 0], 28);
  b.collideCircle(SX, SZ, 0.28);

  // ---- Side wall (north, z=-3.4): sample shelving -------------------------------
  const SHX = -10.4;
  for (const x of [SHX - 0.85, SHX + 0.85]) for (const z of [-3.36, -2.98]) b.box(0.035, 1.9, 0.035, M.steelDark, [x, 0.95, z]);
  for (const y of [0.15, 0.6, 1.05, 1.5, 1.88]) b.box(1.74, 0.02, 0.42, M.steel, [SHX, y, -3.17]);
  const binCols = [M.paintBlue, M.paintBlue, M.paintYellow, M.paintBlue, M.paintRed, M.paintBlue, M.paintGreen];
  let bi = 0;
  for (const y of [0.16, 0.61, 1.06, 1.51]) for (let k = 0; k < 4; k++) {
    if ((bi * 7) % 5 === 3) { bi++; continue; }
    const m = binCols[bi++ % binCols.length], x = SHX - 0.63 + k * 0.42;
    b.box(0.34, 0.16, 0.36, m, [x, y + 0.09, -3.15]);
    b.box(0.2, 0.05, 0.006, M.paper, [x, y + 0.11, -2.968]);
  }
  b.add(A.sign(0.8, 0.12, { bg: '#2d5f8c', lines: [{ t: 'REFERENCE SAMPLES', size: 0.5, color: '#fff', weight: 700 }] }), M.label, [SHX, 2.02, -3.38]);
  b.collideBox(SHX - 0.9, SHX + 0.9, -3.4, -2.92);

  // ---- Side wall (south, z=+3.4): whiteboard ---------------------------------------
  b.box(2.0, 1.1, 0.03, M.alu, [-9.9, 1.55, 3.385]);
  b.add(A.plane(1.94, 1.04, 520, (c, w, h) => drawWhiteboard(c, w, h)), M.label, [-9.9, 1.55, 3.368], [0, Math.PI, 0]);
  b.box(1.6, 0.03, 0.06, M.alu, [-9.9, 0.985, 3.36]);
  for (const [k, m] of [M.paintBlue, M.paintRed, M.paintGreen].entries()) b.cyl(0.008, 0.008, 0.12, m, [-10.3 + k * 0.05, 1.01, 3.355], [0, 0, Math.PI / 2], 8);
  // small rolling cart with spare light panel and target boards
  b.box(0.6, 0.02, 0.45, M.steel, [-8.2, 0.8, 2.85]);
  b.box(0.6, 0.02, 0.45, M.steel, [-8.2, 0.3, 2.85]);
  for (const [x, z] of [[-8.48, 2.65], [-7.92, 2.65], [-8.48, 3.05], [-7.92, 3.05]]) { b.box(0.025, 0.78, 0.025, M.steel, [x, 0.46, z]); b.cyl(0.035, 0.035, 0.03, M.rubber, [x, 0.035, z], [0, 0, Math.PI / 2], 12); }
  b.box(0.4, 0.3, 0.012, M.paintWhite, [-8.2, 0.96, 2.95], [-0.15, 0, 0]);
  b.add(A.plane(0.38, 0.28, 900, (c, w, h) => drawChart(c, w, h)), M.label, [-8.2, 0.96, 2.9435], [-0.15, Math.PI, 0]);
  b.box(0.3, 0.1, 0.25, M.paintDark, [-8.3, 0.36, 2.85]);
  b.collideBox(-8.55, -7.85, 2.6, 3.4);
}

// ---------------------------------------------------------------------------------------
function drawChart(c, w, h) {
  c.fillStyle = '#f4f4f0'; c.fillRect(0, 0, w, h);
  const cell = h / 9, ox = w * 0.04, oy = h * 0.06;
  for (let y = 0; y < 7; y++) for (let x = 0; x < 9; x++) { if ((x + y) % 2) { c.fillStyle = '#111'; c.fillRect(ox + x * cell, oy + y * cell, cell, cell); } }
  const px = ox + 9 * cell + w * 0.03, pw = w - px - w * 0.03;
  const cols = ['#7a4f3a', '#c49a86', '#5f7ba0', '#5c6d3e', '#8577b0', '#62bcae', '#d6853a', '#4b5aa8', '#c25563', '#5a3a6a', '#9cbc4a', '#e0a83a', '#30408f', '#4c9a50', '#b03a3a', '#e6c84a', '#b85a9a', '#2c88a8'];
  const cw = pw / 3, ch = (h * 0.62) / 6;
  cols.forEach((col, i) => { c.fillStyle = col; c.fillRect(px + (i % 3) * cw + 2, oy + ((i / 3) | 0) * ch + 2, cw - 4, ch - 4); });
  for (let i = 0; i < 12; i++) { const v = Math.round((i / 11) * 245 + 5); c.fillStyle = `rgb(${v},${v},${v})`; c.fillRect(ox + (i * (w - 2 * ox)) / 12, h * 0.84, (w - 2 * ox) / 12 + 1, h * 0.1); }
  // corner fiducials
  for (const [fx, fy] of [[px + 2, h * 0.7], [px + pw - h * 0.11, h * 0.7]]) {
    c.fillStyle = '#111'; c.fillRect(fx, fy, h * 0.11, h * 0.11);
    c.fillStyle = '#fff'; c.fillRect(fx + h * 0.022, fy + h * 0.022, h * 0.022, h * 0.044); c.fillRect(fx + h * 0.066, fy + h * 0.044, h * 0.022, h * 0.044);
  }
  c.fillStyle = '#333'; c.font = `600 ${h * 0.035}px Consolas, monospace`; c.fillText('ASL-CAL 9x7 / 25mm', ox, h * 0.82);
}

function drawTurntable(c, w, h) {
  const cx = w / 2, cy = h / 2, r = w * 0.48;
  c.strokeStyle = '#f2f2ee'; c.fillStyle = '#f2f2ee'; c.lineWidth = 2;
  c.beginPath(); c.arc(cx, cy, r * 0.97, 0, Math.PI * 2); c.stroke();
  for (let k = 0; k < 72; k++) {
    const a = (k * 5 * Math.PI) / 180, l = k % 6 === 0 ? 0.1 : 0.05;
    c.lineWidth = k % 6 === 0 ? 3 : 1.5;
    c.beginPath(); c.moveTo(cx + Math.cos(a) * r * 0.97, cy + Math.sin(a) * r * 0.97); c.lineTo(cx + Math.cos(a) * r * (0.97 - l), cy + Math.sin(a) * r * (0.97 - l)); c.stroke();
  }
  c.lineWidth = 1.5; c.beginPath(); c.moveTo(cx - r * 0.2, cy); c.lineTo(cx + r * 0.2, cy); c.moveTo(cx, cy - r * 0.2); c.lineTo(cx, cy + r * 0.2); c.stroke();
  c.font = `700 ${w * 0.04}px Consolas, monospace`; c.textAlign = 'center';
  c.fillText('0°', cx, cy - r * 0.78); c.fillText('90°', cx + r * 0.76, cy + 6); c.fillText('180°', cx, cy + r * 0.84);
}

function drawKeys(c, w, h) {
  c.fillStyle = '#2a2c30'; c.fillRect(0, 0, w, h);
  const rows = 5, cols = 15, kw = w / cols, kh = h / rows;
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    if (y === 4 && x > 3 && x < 10) { if (x === 4) { c.fillStyle = '#3c3f44'; c.fillRect(x * kw + 2, y * kh + 2, kw * 6 - 4, kh - 4); } continue; }
    c.fillStyle = '#3c3f44'; c.fillRect(x * kw + 2, y * kh + 2, kw - 4, kh - 4);
    c.fillStyle = '#9aa0a8'; c.fillRect(x * kw + kw * 0.35, y * kh + kh * 0.35, kw * 0.2, kh * 0.15);
  }
}

function drawNotes(c, w, h) {
  c.fillStyle = '#f7f5ec'; c.fillRect(0, 0, w, h);
  c.strokeStyle = '#a8c4dc'; c.lineWidth = 1;
  for (let y = h * 0.1; y < h; y += h * 0.045) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
  c.fillStyle = '#2a3b6a'; c.font = `${h * 0.032}px "Segoe Print", cursive`;
  ['Run 14  — 5 objects, 24 angles', 'cube   0.97 / 0.95 / 0.96', 'cyl    0.91  (glare at 90°)', 'cone   0.94', 'torus  0.88 → retry w/ diffuser', '', 'light panel L: 5600K, 60%', 'light panel R: 5600K, 55%', '', 'TODO: re-cal after lens swap'].forEach((l, i) => c.fillText(l, w * 0.06, h * 0.135 + i * h * 0.045));
}

function drawProtocol(c, w, h) {
  c.fillStyle = '#f5f4ef'; c.fillRect(0, 0, w, h);
  c.fillStyle = '#2d5f8c'; c.fillRect(0, 0, w, h * 0.11);
  c.fillStyle = '#fff'; c.font = `700 ${h * 0.05}px Segoe UI, Arial`; c.textBaseline = 'middle'; c.fillText('TEST PROTOCOL PB-A', w * 0.06, h * 0.055);
  c.fillStyle = '#222'; c.font = `500 ${h * 0.03}px Segoe UI, Arial`;
  ['1. Warm up light panels 10 min', '2. Verify chart focus (MTF50 > 0.3)', '3. Zero turntable at 0°', '4. Place sample set, log IDs', '5. Run 24-step rotation sweep', '6. Review detections on display B', '7. Export log, reset bench'].forEach((l, i) => c.fillText(l, w * 0.06, h * 0.18 + i * h * 0.065));
  c.strokeStyle = '#2d5f8c'; c.lineWidth = 3; c.strokeRect(w * 0.06, h * 0.67, w * 0.88, h * 0.28);
  c.fillStyle = '#2d5f8c'; c.font = `600 ${h * 0.028}px Segoe UI, Arial`; c.fillText('Lux at sample: 1200 ± 50', w * 0.1, h * 0.72);
  c.fillText('Camera: CAM-A1, f/4, 1/250 s', w * 0.1, h * 0.77); c.fillText('Last calibration: 03 OCT', w * 0.1, h * 0.82);
}

function drawWhiteboard(c, w, h) {
  c.fillStyle = '#f8f8f6'; c.fillRect(0, 0, w, h);
  c.lineCap = 'round'; c.lineJoin = 'round';
  c.strokeStyle = '#1f4e9a'; c.fillStyle = '#1f4e9a'; c.lineWidth = 3;
  c.font = `${h * 0.06}px "Segoe Print", cursive`; c.fillText('Sweep plan — week 41', w * 0.04, h * 0.1);
  c.font = `${h * 0.04}px "Segoe Print", cursive`;
  ['• diffuser on both panels', '• torus + cyl: glare test', '• 24 steps × 15°', '• compare CAM-A1 vs depth bar'].forEach((l, i) => c.fillText(l, w * 0.05, h * 0.22 + i * h * 0.075));
  // axes + curve
  const ox = w * 0.55, oy = h * 0.82, gw = w * 0.4, gh = h * 0.6;
  c.strokeStyle = '#222'; c.beginPath(); c.moveTo(ox, oy - gh); c.lineTo(ox, oy); c.lineTo(ox + gw, oy); c.stroke();
  c.strokeStyle = '#c0281f'; c.beginPath();
  for (let i = 0; i <= 40; i++) { const x = ox + (i / 40) * gw, y = oy - gh * (0.85 - 0.25 * Math.exp(-((i - 20) ** 2) / 30)); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
  c.fillStyle = '#222'; c.font = `${h * 0.035}px "Segoe Print", cursive`; c.fillText('angle →', ox + gw * 0.6, oy + h * 0.06); c.fillText('conf.', ox - w * 0.05, oy - gh - h * 0.02);
  c.fillStyle = '#c0281f'; c.fillText('glare dip @ 90°', ox + gw * 0.3, oy - gh * 0.45);
  // sketch of setup
  c.strokeStyle = '#2a7a3a'; c.lineWidth = 3;
  c.strokeRect(w * 0.06, h * 0.6, w * 0.08, h * 0.08); c.beginPath(); c.moveTo(w * 0.14, h * 0.64); c.lineTo(w * 0.36, h * 0.64); c.stroke();
  c.beginPath(); c.arc(w * 0.42, h * 0.64, h * 0.08, 0, Math.PI * 2); c.stroke();
  c.fillStyle = '#2a7a3a'; c.fillText('cam', w * 0.06, h * 0.75); c.fillText('table', w * 0.38, h * 0.79);
}
