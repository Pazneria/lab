// ORBIS-7: freestanding multi-view sample imager. A ring of lens / sensor modules and two
// crossed arches surround a small illuminated sample stage on a round plinth.
import * as THREE from 'three';
import { IC } from './hall.js';
import { cableGeo, ringSlab } from './builder.js';

const D = Math.PI / 180;

export function buildInstrument(ctx) {
  const { b, M, A } = ctx;
  const SY = 1.08; // sample height
  const LEGR = 1.25;

  b.push([IC.x, 0, IC.z]);
  b.collideCircle(IC.x, IC.z, 1.5);

  // ---- Plinth ---------------------------------------------------------------
  b.cyl(1.45, 1.45, 0.12, M.paintDark, [0, 0.06, 0], [0, 0, 0], 72);
  b.add(ringSlab(1.45, 1.475, 0.125, 96), M.steel, [0, 0, 0]);
  b.cyl(1.42, 1.42, 0.006, M.rubber, [0, 0.123, 0], [0, 0, 0], 72);
  b.add(ringSlab(1.476, 1.49, 0.012, 96), M.ledCyan, [0, 0.02, 0]);
  b.add(A.cylBand(1.477, 0.07, -0.42, 0.84, 420, (c, w, h) => {
    c.fillStyle = '#2b2e33'; c.fillRect(0, 0, w, h);
    c.font = `700 ${h * 0.6}px Segoe UI, Arial`; c.fillStyle = '#e6eaee'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('ORBIS-7   ·   MULTI-VIEW SAMPLE IMAGER', w / 2, h * 0.55);
  }, 32), M.label, [0, 0.075, 0]);

  // ---- Base drum + column -----------------------------------------------------
  b.cyl(0.55, 0.58, 0.5, M.paintWhite, [0, 0.375, 0], [0, 0, 0], 48);
  for (const y of [0.24, 0.5]) b.cyl(0.556, 0.556, 0.012, M.paintGrey, [0, y, 0], [0, 0, 0], 48);
  b.cyl(0.57, 0.57, 0.035, M.steel, [0, 0.64, 0], [0, 0, 0], 48);
  b.add(A.cylBand(0.553, 0.1, -0.55, 1.1, 600, (c, w, h) => {
    c.fillStyle = '#2d5f8c'; c.fillRect(0, 0, w, h);
    c.font = `700 ${h * 0.46}px Segoe UI, Arial`; c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('ORBIS-7  ·  UNIT 02', w / 2, h * 0.52);
  }, 24), M.label, [0, 0.37, 0]);
  for (let k = 0; k < 4; k++) {
    const a = (k * 90 + 45) * D;
    b.push([0, 0, 0], [0, a, 0]);
    b.box(0.26, 0.2, 0.02, M.perf, [0, 0.37, 0.55]);
    for (const [sx, sy] of [[-0.12, 0.09], [0.12, 0.09], [-0.12, -0.09], [0.12, -0.09]]) b.cyl(0.006, 0.006, 0.008, M.chrome, [sx, 0.37 + sy, 0.562], [Math.PI / 2, 0, 0], 8);
    b.pop();
  }
  // status window on drum
  b.box(0.16, 0.06, 0.01, M.screenOff, [0, 0.56, 0.548]);
  b.add(A.sign(0.15, 0.05, { bg: '#06120c', lines: [{ t: 'READY  13/13 CH', size: 0.42, color: '#5dffa0', weight: 600, font: 'Consolas, monospace' }] }), M.labelGlow, [0, 0.56, 0.554]);
  // Production derivative: the completed character stands on the existing drum.
  // Only the tiny specimen, shaft and sample holders are removed; all cameras,
  // arches, cables, drum construction and the external collision remain.

  // ---- Legs and crossed arches ----------------------------------------------
  for (const th of [45 * D, 135 * D]) {
    b.push([0, 0, 0], [0, th, 0]);
    b.add(new THREE.TorusGeometry(LEGR, 0.04, 10, 64, Math.PI), M.steel, [0, SY + 0.04, 0]);
    for (const s of [-1, 1]) {
      const x = s * LEGR;
      b.cyl(0.04, 0.04, SY + 0.04 - 0.12, M.steel, [x, (SY + 0.04 + 0.12) / 2, 0], [0, 0, 0], 16);
      b.box(0.18, 0.02, 0.18, M.steelDark, [x, 0.13, 0]);
      for (const [bx, bz] of [[-0.065, -0.065], [0.065, -0.065], [-0.065, 0.065], [0.065, 0.065]]) b.cyl(0.01, 0.01, 0.012, M.chrome, [x + bx, 0.145, bz], [0, 0, 0], 6);
      b.cyl(0.055, 0.055, 0.1, M.anodBlack, [x, SY + 0.04, 0], [0, 0, 0], 16);
      b.cyl(0.05, 0.05, 0.06, M.anodBlack, [x, 0.2, 0], [0, 0, 0], 16);
      // cable clips
      for (const y of [0.42, 0.78]) b.box(0.1, 0.025, 0.11, M.anodBlack, [x, y, 0]);
      // junction box at leg foot
      b.push([s * 1.37, 0.125, 0], [0, s > 0 ? -Math.PI / 2 : Math.PI / 2, 0]);
      b.box(0.16, 0.1, 0.09, M.paintGrey, [0, 0.05, 0]);
      b.box(0.012, 0.012, 0.004, M.ledGreen, [0.05, 0.08, 0.047]);
      b.cyl(0.012, 0.012, 0.02, M.anodBlack, [-0.04, 0.05, -0.05], [Math.PI / 2, 0, 0], 8);
      b.cyl(0.012, 0.012, 0.02, M.anodBlack, [0.04, 0.05, -0.05], [Math.PI / 2, 0, 0], 8);
      b.pop();
      // arch module (camera head) at 52 degrees elevation, pointing at sample
      const e = 52 * D, rr = LEGR - 0.1;
      const p = [s * rr * Math.cos(e), SY + 0.04 + rr * Math.sin(e), 0];
      b.push([s * LEGR * Math.cos(e), SY + 0.04 + LEGR * Math.sin(e), 0], [0, 0, s * e]);
      b.add(new THREE.TorusGeometry(0.052, 0.014, 6, 16), M.anodBlack, [0, 0, 0], [Math.PI / 2, 0, 0]);
      b.pop();
      b.pushLook(p, [0, SY, 0]);
      b.cyl(0.05, 0.05, 0.15, M.paintWhite, [0, 0, 0.0], [Math.PI / 2, 0, 0], 20);
      b.cyl(0.052, 0.052, 0.02, M.paintTeal, [0, 0, 0.04], [Math.PI / 2, 0, 0], 20);
      b.cyl(0.036, 0.036, 0.06, M.anodBlack, [0, 0, -0.1], [Math.PI / 2, 0, 0], 20);
      b.cyl(0.04, 0.04, 0.012, M.chrome, [0, 0, -0.13], [Math.PI / 2, 0, 0], 20);
      b.add(new THREE.SphereGeometry(0.05, 18, 6, 0, Math.PI * 2, 0, 0.62), M.lensCoat, [0, 0, -0.136 + 0.05 * Math.cos(0.62)], [-Math.PI / 2, 0, 0]);
      b.cyl(0.04, 0.04, 0.012, M.anodBlack, [0, 0, 0.081], [Math.PI / 2, 0, 0], 16);
      b.box(0.01, 0.01, 0.01, M.ledGreen, [0, 0.05, 0.05]);
      b.pop();
      // cable along the arch then down the leg
      const pts = [];
      for (let i = 0; i <= 8; i++) {
        const a = e - (e * i) / 8, R = LEGR + 0.055;
        pts.push([s * R * Math.cos(a), SY + 0.04 + R * Math.sin(a), 0.03]);
      }
      pts.unshift([s * (rr + 0.02) * Math.cos(e) + s * 0.02, SY + 0.04 + (rr + 0.12) * Math.sin(e), 0.02]);
      pts.push([s * (LEGR + 0.055), 0.6, 0.03], [s * (LEGR + 0.06), 0.2, 0.03], [s * 1.37, 0.16, 0.06]);
      b.add(cableGeo(pts, 0.009, 60, 6), M.cableGrey);
    }
    b.pop();
  }
  // Top hub: overhead camera with ring light, hanging from the arch crossing
  const HY = SY + 0.04 + LEGR;
  b.box(0.12, 0.08, 0.12, M.anodBlack, [0, HY - 0.06, 0], [0, 45 * D, 0]);
  b.cyl(0.14, 0.14, 0.14, M.paintWhite, [0, HY - 0.17, 0], [0, 0, 0], 32);
  b.cyl(0.145, 0.145, 0.025, M.paintTeal, [0, HY - 0.13, 0], [0, 0, 0], 32);
  b.cyl(0.15, 0.15, 0.02, M.anodBlack, [0, HY - 0.25, 0], [0, 0, 0], 32);
  b.add(ringSlab(0.08, 0.135, 0.004, 40), M.ledWhite, [0, HY - 0.264, 0], [Math.PI, 0, 0]);
  b.cyl(0.05, 0.05, 0.05, M.anodBlack, [0, HY - 0.28, 0], [0, 0, 0], 20);
  b.add(new THREE.SphereGeometry(0.06, 18, 6, 0, Math.PI * 2, 0, 0.6), M.lensCoat, [0, HY - 0.305 + 0.06 * Math.cos(0.6), 0], [Math.PI, 0, 0]);
  b.add(A.cylBand(0.142, 0.06, -0.6, 1.2, 900, (c, w, h) => {
    c.fillStyle = '#e8e8e3'; c.fillRect(0, 0, w, h);
    c.font = `700 ${h * 0.6}px Segoe UI, Arial`; c.fillStyle = '#2b2e33'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('T0', w / 2, h * 0.55);
  }, 12), M.label, [0, HY - 0.2, 0]);
  b.box(0.012, 0.012, 0.012, M.ledGreen, [0.0, HY - 0.15, 0.142]);

  // ---- Main sensor ring -----------------------------------------------------------
  const RY = 1.0;
  b.add(ringSlab(1.06, 1.19, 0.1, 96), M.steel, [0, RY, 0]);
  b.add(ringSlab(1.19, 1.205, 0.06, 96), M.paintBlue, [0, RY + 0.02, 0]);
  for (let k = 0; k < 4; k++) {
    const a = (45 + k * 90) * D;
    b.push([0, 0, 0], [0, a, 0]);
    b.box(0.1, 0.08, 0.12, M.anodBlack, [0, RY + 0.05, 1.2]);
    b.pop();
  }
  for (let k = 0; k < 8; k++) {
    const phi = (22.5 + 45 * k) * D, R = 1.13, lens = k % 2 === 0;
    const pos = [R * Math.sin(phi), RY + 0.1, R * Math.cos(phi)];
    b.pushLook(pos, [0, SY - 0.08, 0]);
    // saddle on ring
    b.box(0.14, 0.025, 0.12, M.anodBlack, [0, 0.0125, 0]);
    if (lens) {
      b.box(0.13, 0.12, 0.19, M.paintWhite, [0, 0.085, 0.01]);
      b.box(0.134, 0.03, 0.12, M.paintBlue, [0, 0.085, 0.03]);
      b.box(0.12, 0.11, 0.02, M.anodBlack, [0, 0.085, 0.115]);
      for (let f = 0; f < 6; f++) b.box(0.005, 0.03, 0.15, M.alu, [-0.05 + f * 0.02, 0.16, 0.02]);
      b.cyl(0.045, 0.045, 0.1, M.anodBlack, [0, 0.085, -0.13], [Math.PI / 2, 0, 0], 24);
      b.cyl(0.05, 0.05, 0.035, M.rubber, [0, 0.085, -0.115], [Math.PI / 2, 0, 0], 24);
      b.cyl(0.05, 0.05, 0.012, M.chrome, [0, 0.085, -0.186], [Math.PI / 2, 0, 0], 24);
      b.add(new THREE.SphereGeometry(0.07, 20, 6, 0, Math.PI * 2, 0, 0.58), M.lensCoat, [0, 0.085, -0.192 + 0.07 * Math.cos(0.58)], [-Math.PI / 2, 0, 0]);
      b.add(A.sign(0.05, 0.03, { bg: '#2b2e33', lines: [{ t: `L${k / 2 + 1}`, size: 0.7, color: '#fff', weight: 700 }] }), M.label, [0.0671, 0.085, 0.06], [0, Math.PI / 2, 0]);
      b.add(A.sign(0.05, 0.03, { bg: '#2b2e33', lines: [{ t: `L${k / 2 + 1}`, size: 0.7, color: '#fff', weight: 700 }] }), M.label, [-0.0671, 0.085, 0.06], [0, -Math.PI / 2, 0]);
    } else {
      b.cyl(0.065, 0.065, 0.2, M.paintDark, [0, 0.085, 0.0], [Math.PI / 2, 0, 0], 24);
      b.cyl(0.068, 0.068, 0.03, M.paintOrange, [0, 0.085, 0.05], [Math.PI / 2, 0, 0], 24);
      b.box(0.12, 0.12, 0.014, M.paintOrange, [0, 0.085, -0.1]);
      b.box(0.07, 0.07, 0.006, M.lens, [0, 0.085, -0.109]);
      for (const [ex, ey] of [[-0.045, -0.045], [0.045, -0.045], [-0.045, 0.045], [0.045, 0.045]]) b.cyl(0.006, 0.006, 0.006, M.ledRed, [ex, 0.085 + ey, -0.108], [Math.PI / 2, 0, 0], 8);
      b.cyl(0.05, 0.05, 0.01, M.perf, [0, 0.085, 0.102], [Math.PI / 2, 0, 0], 20);
      b.add(A.sign(0.05, 0.03, { bg: '#e8e8e3', lines: [{ t: `S${(k + 1) / 2}`, size: 0.7, color: '#1b1f24', weight: 700 }] }), M.label, [0.0661, 0.085, -0.02], [0, Math.PI / 2, 0]);
      b.add(A.sign(0.05, 0.03, { bg: '#e8e8e3', lines: [{ t: `S${(k + 1) / 2}`, size: 0.7, color: '#1b1f24', weight: 700 }] }), M.label, [-0.0661, 0.085, -0.02], [0, -Math.PI / 2, 0]);
    }
    b.box(0.012, 0.012, 0.012, k === 5 ? M.ledAmber : M.ledGreen, [0.04, lens ? 0.15 : 0.16, 0.09]);
    b.cyl(0.016, 0.016, 0.03, M.anodBlack, [0, 0.06, 0.12], [Math.PI / 2, 0, 0], 10);
    // cable to the nearest leg, then down to the junction box
    const sd = lens ? 1 : -1, lx = 1.25 * Math.sin(22.5 * D) * sd, lz = 1.25 * Math.cos(22.5 * D) - R;
    b.add(cableGeo([[0, 0.06, 0.13], [0, 0.03, 0.2], [lx * 0.5, -0.04, lz + 0.14], [lx * 0.88, -0.1, lz + 0.075], [lx * 0.93, -0.35, lz + 0.06], [lx * 0.93, -0.75, lz + 0.06], [lx * 0.95, -0.94, lz + 0.11], [lx * 0.9, -0.95, lz + 0.2]], 0.01, 50, 6), lens ? M.cableBlue : M.rubber);
    b.pop();
  }

  // ---- Harness ring on the plinth + trunk to the racks ----------------------------
  b.add(new THREE.TorusGeometry(1.33, 0.018, 8, 96), M.rubber, [0, 0.14, 0], [Math.PI / 2, 0, 0]);
  for (let k = 0; k < 16; k++) { const a = k * 22.5 * D; b.box(0.03, 0.03, 0.05, M.anodBlack, [Math.sin(a) * 1.33, 0.14, Math.cos(a) * 1.33], [0, a, 0]); }
  b.add(cableGeo([[0, 0.14, -1.33], [0, 0.13, -1.47], [0, 0.06, -1.52], [0, 0.02, -1.62]], 0.03, 16, 10), M.rubber);
  b.pop();

  // Floor cable protector: instrument -> north wall -> racks
  const prot = (x0, z0, x1, z1) => {
    const len = Math.hypot(x1 - x0, z1 - z0), ang = Math.atan2(x1 - x0, z1 - z0);
    b.push([(x0 + x1) / 2, 0, (z0 + z1) / 2], [0, ang, 0]);
    const sh = new THREE.Shape(); sh.moveTo(-0.16, 0); sh.lineTo(-0.07, 0.03); sh.lineTo(0.07, 0.03); sh.lineTo(0.16, 0); sh.closePath();
    const g = new THREE.ExtrudeGeometry(sh, { depth: len, bevelEnabled: false });
    b.add(g, M.paintDark, [0, 0, -len / 2]);
    b.box(0.12, 0.004, len - 0.02, M.hazard, [0, 0.031, 0]);
    b.pop();
  };
  prot(IC.x, IC.z - 1.62, IC.x, -6.45);
  prot(IC.x - 0.12, -6.55, -5.75, -6.55);
  b.box(0.36, 0.035, 0.36, M.paintDark, [0, 0.017, -6.55]);

  // ---- Exhibit lectern -----------------------------------------------------------------
  b.push([2.3, 0, 2.1], [0, -0.4, 0]);
  b.box(0.08, 0.95, 0.08, M.steel, [0, 0.475, 0]);
  b.box(0.42, 0.02, 0.32, M.steelDark, [0, 0.01, 0]);
  b.push([0, 1.0, 0], [0.45, 0, 0]);
  b.box(0.62, 0.03, 0.44, M.anodBlack, [0, 0, 0]);
  b.add(A.plane(0.58, 0.4, 700, (c, w, h) => drawLectern(c, w, h)), M.label, [0, 0.016, 0], [-Math.PI / 2, 0, 0]);
  b.pop();
  b.pop();
  b.collideCircle(2.3, 2.1, 0.32);
}

function drawLectern(c, w, h) {
  c.fillStyle = '#f5f4ef'; c.fillRect(0, 0, w, h);
  c.fillStyle = '#2f7f7a'; c.fillRect(0, 0, w, h * 0.17);
  c.fillStyle = '#fff'; c.textBaseline = 'middle';
  c.font = `700 ${h * 0.09}px Segoe UI, Arial`; c.fillText('EXHIBIT 01 · ORBIS-7', w * 0.05, h * 0.09);
  c.fillStyle = '#2b2f35'; c.font = `500 ${h * 0.048}px Segoe UI, Arial`;
  ['Multi-view sample imager. Thirteen synchronised', 'views capture one sample from every side in a', 'single 4 ms exposure.', '', 'L1–L4  telecentric lens units (blue cables)', 'S1–S4  depth / IR sensor units (black cables)', 'T0 + A1–A4  overhead and arch cameras'].forEach((l, i) => c.fillText(l, w * 0.05, h * 0.25 + i * h * 0.072));
  // mini schematic
  const cx = w * 0.82, cy = h * 0.72, r = h * 0.17;
  c.strokeStyle = '#2d5f8c'; c.lineWidth = 3; c.beginPath(); c.arc(cx, cy, r, 0, Math.PI * 2); c.stroke();
  for (let k = 0; k < 8; k++) { const a = (22.5 + k * 45) * Math.PI / 180; c.fillStyle = k % 2 ? '#d7642a' : '#2d5f8c'; c.fillRect(cx + Math.sin(a) * r - 5, cy + Math.cos(a) * r - 5, 10, 10); }
  c.fillStyle = '#58b8d8'; c.beginPath(); c.arc(cx, cy, 6, 0, Math.PI * 2); c.fill();
}
