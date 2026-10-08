// Exhibition hall shell: floors, walls, ceiling services, entrance, wall exhibits, floor guidance.
import * as THREE from 'three';
import { cableGeo, ringSlab } from './builder.js';

export const HALL = { x0: -7, x1: 7, z0: -7, z1: 8.5, h: 4.4 };
export const ALC = { z0: -3.4, z1: 3.4, depth: 5, h: 3.3 };
export const IC = { x: 0, z: -0.6 }; // instrument centre

const T = 0.2; // wall thickness

// Wall in the YZ plane at x, interior side = side (+1 interior toward +x).
function wallZ(b, M, x, z0, z1, h, side, y0 = 0, trim = true) {
  const mid = (z0 + z1) / 2, len = z1 - z0;
  b.box(T, h, len, M.wall, [x - side * T / 2, y0 + h / 2, mid]);
  if (trim && y0 === 0) {
    b.box(0.012, 1.0, len, M.wallAccent, [x + side * 0.006, 0.6, mid]);
    b.box(0.02, 0.035, len, M.steel, [x + side * 0.01, 1.115, mid]);
    b.box(0.018, 0.1, len, M.skirting, [x + side * 0.009, 0.05, mid]);
  }
  if (y0 === 0) b.collideBox(Math.min(x, x - side * T) - 0.01, Math.max(x, x - side * T) + 0.01, z0, z1);
}
// Wall in the XY plane at z, interior side = side (+1 interior toward +z).
function wallX(b, M, z, x0, x1, h, side, y0 = 0, trim = true) {
  const mid = (x0 + x1) / 2, len = x1 - x0;
  b.box(len, h, T, M.wall, [mid, y0 + h / 2, z - side * T / 2]);
  if (trim && y0 === 0) {
    b.box(len, 1.0, 0.012, M.wallAccent, [mid, 0.6, z + side * 0.006]);
    b.box(len, 0.035, 0.02, M.steel, [mid, 1.115, z + side * 0.01]);
    b.box(len, 0.1, 0.018, M.skirting, [mid, 0.05, z + side * 0.009]);
  }
  if (y0 === 0) b.collideBox(x0, x1, Math.min(z, z - side * T) - 0.01, Math.max(z, z - side * T) + 0.01);
}

function ceilingLight(b, M, x, y, z, len = 1.3, alongX = true) {
  const w = alongX ? len : 0.2, d = alongX ? 0.2 : len;
  b.box(w, 0.06, d, M.paintWhite, [x, y - 0.03, z]);
  b.box(alongX ? len - 0.06 : 0.14, 0.006, alongX ? 0.14 : len - 0.06, M.lightPanel, [x, y - 0.063, z]);
}

export function buildHall(ctx) {
  const { b, M, A } = ctx;
  const { x0, x1, z0, z1, h } = HALL;

  // ---- Floors -------------------------------------------------------------
  b.box(x1 - x0, 0.1, z1 - z0, M.floor, [0, -0.05, (z0 + z1) / 2]);
  b.box(ALC.depth, 0.1, ALC.z1 - ALC.z0, M.vinyl, [x0 - ALC.depth / 2, -0.05, 0]);
  b.box(ALC.depth, 0.1, ALC.z1 - ALC.z0, M.ribRubber, [x1 + ALC.depth / 2, -0.05, 0]);
  for (const s of [-1, 1]) b.box(0.09, 0.008, ALC.z1 - ALC.z0, M.steel, [s * 7, 0.002, 0]); // thresholds

  // ---- Ceilings -------------------------------------------------------------
  b.box(x1 - x0 + 0.4, 0.1, z1 - z0 + 0.4, M.ceiling, [0, h + 0.05, (z0 + z1) / 2]);
  for (const s of [-1, 1]) b.box(ALC.depth, 0.1, ALC.z1 - ALC.z0, M.ceiling, [s * (7 + ALC.depth / 2), ALC.h + 0.05, 0]);

  // ---- Walls --------------------------------------------------------------
  wallX(b, M, z0, x0 - 0.2, x1 + 0.2, h, +1);                    // north
  wallX(b, M, z1, x0 - 0.2, -1.3, h, -1);                        // south (left of door)
  wallX(b, M, z1, 1.3, x1 + 0.2, h, -1);                         // south (right of door)
  wallX(b, M, z1, -1.3, 1.3, h - 2.5, -1, 2.5, false);           // door header
  for (const s of [-1, 1]) {
    const x = s * 7, side = -s;
    wallZ(b, M, x, z0, ALC.z0, h, side);
    wallZ(b, M, x, ALC.z1, z1, h, side);
    wallZ(b, M, x, ALC.z0, ALC.z1, h - ALC.h, side, ALC.h, false);   // header over alcove
    const xb = s * (7 + ALC.depth);
    wallZ(b, M, xb, ALC.z0 - 0.2, ALC.z1 + 0.2, ALC.h, -s);           // alcove back wall
    const xa = Math.min(x, xb), xbnd = Math.max(x, xb);
    wallX(b, M, ALC.z0, xa, xbnd, ALC.h, +1);
    wallX(b, M, ALC.z1, xa, xbnd, ALC.h, -1);
    // Pilasters and a painted portal frame around each alcove opening.
    for (const zz of [ALC.z0 + 0.15, ALC.z1 - 0.15]) {
      b.box(0.5, ALC.h, 0.3, M.paintGrey, [x, ALC.h / 2, zz]);
      b.collideBox(x - 0.25, x + 0.25, zz - 0.15, zz + 0.15);
    }
    b.box(0.5, 0.3, ALC.z1 - ALC.z0, M.paintGrey, [x, ALC.h - 0.15, 0]);
    // Ceiling lights in alcove
    for (const zz of [-1.6, 0, 1.6]) for (const dx of [1.5, 3.5]) ceilingLight(b, M, s * (7 + dx), ALC.h, zz, 1.3, false);
  }

  // ---- Ceiling services -----------------------------------------------------
  for (const x of [-4.8, -1.6, 1.6, 4.8]) for (const z of [-5.4, -2.9, -0.4, 2.1, 4.6, 7.1]) ceilingLight(b, M, x, h, z, 1.3, false);
  // Round supply duct with flanges and hangers along the east side.
  b.cyl(0.28, 0.28, z1 - z0, M.steelDark, [5.9, 3.9, (z0 + z1) / 2], [Math.PI / 2, 0, 0], 24);
  for (let z = z0 + 0.6; z < z1; z += 1.5) {
    b.cyl(0.3, 0.3, 0.04, M.steel, [5.9, 3.9, z], [Math.PI / 2, 0, 0], 24);
    b.cyl(0.008, 0.008, 0.25, M.steel, [5.9, 4.29, z], [0, 0, 0], 6);
  }
  for (const z of [-4, 0.5, 5]) { b.box(0.3, 0.2, 0.3, M.steelDark, [5.9, 3.55, z]); b.box(0.36, 0.02, 0.36, M.perf, [5.9, 3.44, z]); }
  // Rectangular return duct along the west side
  b.box(0.6, 0.35, z1 - z0, M.steelDark, [-5.9, 4.15, (z0 + z1) / 2]);
  for (let z = z0 + 0.5; z < z1; z += 1.2) b.box(0.64, 0.39, 0.03, M.steel, [-5.9, 4.15, z]);
  // Ladder cable tray along north wall with cables
  const ty = 3.3, tz = z0 + 0.35;
  for (const dz of [-0.15, 0.15]) b.box(x1 - x0, 0.06, 0.012, M.steel, [0, ty, tz + dz]);
  for (let x = x0 + 0.15; x < x1; x += 0.3) b.box(0.03, 0.012, 0.3, M.steel, [x, ty - 0.02, tz]);
  for (let x = x0 + 1; x < x1; x += 2.5) { b.cyl(0.006, 0.006, h - ty, M.steel, [x, (h + ty) / 2, tz], [0, 0, 0], 6); }
  const trayCables = [[M.cableBlue, -0.08], [M.rubber, -0.03], [M.cableGrey, 0.03], [M.cableOrange, 0.08]];
  for (const [mat, dz] of trayCables) b.cyl(0.011, 0.011, x1 - x0 - 0.2, mat, [0, ty + 0.0, tz + dz], [0, 0, Math.PI / 2], 6);

  // ---- Entrance doors + lobby ----------------------------------------------
  const dz = z1;
  b.box(2.7, 0.08, 0.16, M.alu, [0, 2.54, dz]);
  for (const s of [-1, 1]) b.box(0.08, 2.5, 0.16, M.alu, [s * 1.31, 1.25, dz]);
  for (const s of [-1, 1]) {
    const cx = s * 0.63;
    b.box(1.2, 2.4, 0.012, M.glass, [cx, 1.22, dz]);
    b.box(0.06, 2.42, 0.05, M.alu, [cx - 0.6 + 0.03, 1.22, dz]);
    b.box(0.06, 2.42, 0.05, M.alu, [cx + 0.6 - 0.03, 1.22, dz]);
    b.box(1.2, 0.06, 0.05, M.alu, [cx, 2.4, dz]);
    b.box(1.2, 0.18, 0.05, M.alu, [cx, 0.09, dz]);
    b.cyl(0.018, 0.018, 1.0, M.steel, [cx, 1.05, dz - 0.08], [0, 0, Math.PI / 2], 10);
    for (const ex of [-0.45, 0.45]) b.box(0.03, 0.03, 0.06, M.steel, [cx + ex, 1.05, dz - 0.05]);
  }
  b.collideBox(-1.35, 1.35, dz - 0.05, dz + 0.1);
  // Lobby seen through the glass
  b.box(4, 0.1, 3, M.floor, [0, -0.05, dz + 1.6]);
  b.box(4, 0.1, 3, M.ceiling, [0, 2.95, dz + 1.6]);
  for (const s of [-1, 1]) b.box(0.1, 3, 3, M.wall, [s * 2, 1.5, dz + 1.6]);
  b.box(4, 3, 0.1, M.wallAccent, [0, 1.5, dz + 3.1]);
  ceilingLight(b, M, 0, 2.9, dz + 1.6, 1.3, true);
  b.add(A.sign(2.2, 0.5, { bg: '#2c3e4c', lines: [{ t: 'APPLIED SENSING LAB', size: 0.34, color: '#f0f2f4', weight: 700 }, { t: 'Demonstration Hall · Open Day', size: 0.22, color: '#b9cad6', weight: 500 }] }), M.label, [0, 1.75, dz + 3.04], [0, Math.PI, 0]);

  // Exit sign above doors (glowing) + welcome header on the inside
  b.box(0.42, 0.18, 0.06, M.paintWhite, [0, 2.8, dz - 0.04]);
  b.add(A.sign(0.38, 0.14, { bg: '#0d8a3c', lines: [{ t: 'EXIT  ⟶', size: 0.62, color: '#ffffff', weight: 800 }] }), M.labelGlow, [0, 2.8, dz - 0.072], [0, Math.PI, 0]);
  b.add(A.sign(4.2, 0.55, { bg: '#e9e7e1', lines: [{ t: 'APPLIED SENSING LAB  ·  DEMONSTRATION HALL', size: 0.42, color: '#2c3e4c', weight: 700 }] }), M.label, [0, 3.35, dz - 0.012], [0, Math.PI, 0]);

  // Floor plan board beside the entrance
  b.box(1.3, 0.95, 0.04, M.alu, [2.7, 1.55, dz - 0.03]);
  b.add(A.plane(1.24, 0.89, 420, (c, w, hh) => drawFloorPlan(c, w, hh)), M.label, [2.7, 1.55, dz - 0.052], [0, Math.PI, 0]);
  // Fire extinguisher + sign
  b.box(0.2, 0.06, 0.08, M.steelDark, [-2.0, 1.15, dz - 0.04]);
  b.cyl(0.08, 0.08, 0.55, M.paintRed, [-2.0, 0.78, dz - 0.14], [0, 0, 0], 18);
  b.add(new THREE.SphereGeometry(0.08, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.paintRed, [-2.0, 1.055, dz - 0.14]);
  b.box(0.05, 0.08, 0.05, M.anodBlack, [-2.0, 1.16, dz - 0.14]);
  b.add(cableGeo([[-2.0, 1.17, -0.17 + dz], [-1.93, 1.1, -0.24 + dz], [-1.91, 0.85, -0.22 + dz]], 0.008, 12, 6), M.rubber);
  b.add(A.sign(0.2, 0.2, { bg: '#c0281f', lines: [{ t: 'FIRE', size: 0.3, color: '#fff', weight: 800 }, { t: 'EXT.', size: 0.3, color: '#fff', weight: 800 }] }), M.label, [-2.0, 1.45, dz - 0.012], [0, Math.PI, 0]);
  b.collideCircle(-2.0, dz - 0.14, 0.12);
  // Visitor bench
  b.box(2.0, 0.05, 0.42, M.laminate, [-4.6, 0.45, dz - 0.35]);
  for (const ex of [-0.85, 0.85]) { b.box(0.05, 0.43, 0.38, M.anodBlack, [-4.6 + ex, 0.215, dz - 0.35]); }
  b.collideBox(-5.65, -3.55, dz - 0.6, dz);

  // ---- North wall exhibits --------------------------------------------------
  // Large data wall (frame here, animated screen added by main)
  b.box(3.5, 2.0, 0.08, M.anodBlack, [0, 2.45, z0 + 0.04]);
  ctx.screen('datawall', 3.36, 1.89, 1024, 576, [0, 2.45, z0 + 0.085], [0, 0, 0]);
  b.add(A.sign(1.6, 0.16, { bg: '#2b2e33', lines: [{ t: 'ORBIS-7 · LIVE ACQUISITION FEED', size: 0.5, color: '#e0e6ea', weight: 600 }] }), M.label, [0, 1.33, z0 + 0.081]);
  // Equipment racks (west corner)
  for (const [i, rx] of [-6.55, -5.9].entries()) {
    const rz = z0 + 0.55;
    b.box(0.6, 2.0, 0.9, M.paintDark, [rx, 1.0, rz]);
    b.box(0.56, 1.8, 0.02, M.perf, [rx, 1.02, rz + 0.455]);
    b.box(0.02, 0.3, 0.03, M.steel, [rx + 0.24, 1.1, rz + 0.48]);
    for (let k = 0; k < 7; k++) b.box(0.52, 0.004, 0.004, M.steelDark, [rx, 0.25 + k * 0.25, rz + 0.468]);
    b.add(A.sign(0.22, 0.07, { bg: '#f2f2ee', lines: [{ t: `RACK R${i + 1}`, size: 0.55, weight: 700 }] }), M.label, [rx, 1.85, rz + 0.468]);
    for (let k = 0; k < 6; k++) b.box(0.012, 0.012, 0.004, k % 3 === 2 ? M.ledAmber : M.ledGreen, [rx - 0.2 + k * 0.02, 1.7, rz + 0.468]);
    b.collideBox(rx - 0.32, rx + 0.32, z0, rz + 0.48);
  }
  // Cable drop from tray into racks
  for (const [k, mat] of [M.cableBlue, M.rubber, M.cableGrey].entries()) {
    b.add(cableGeo([[-6.2 + k * 0.05, ty, tz], [-6.2 + k * 0.05, 2.6, tz + 0.05], [-6.2 + k * 0.05, 2.02, tz + 0.1]], 0.011, 12, 6), mat);
  }
  // Long storage counter with instruments on top (east corner)
  const cx = 5.1, cz = z0 + 0.4;
  b.box(3.4, 0.86, 0.62, M.paintWhite, [cx, 0.45, cz]);
  b.box(3.44, 0.04, 0.68, M.worktop, [cx, 0.9, cz + 0.02]);
  b.box(3.36, 0.1, 0.02, M.skirting, [cx, 0.05, cz + 0.31]);
  for (let k = 0; k < 4; k++) {
    b.box(0.82, 0.74, 0.012, M.paintWhite, [cx - 1.26 + k * 0.84, 0.48, cz + 0.312]);
    b.box(0.14, 0.02, 0.02, M.steel, [cx - 1.26 + k * 0.84, 0.8, cz + 0.33]);
  }
  b.collideBox(cx - 1.75, cx + 1.75, z0, cz + 0.4);
  // Oscilloscope
  b.box(0.36, 0.2, 0.26, M.plasticLight, [4.0, 1.02, cz]);
  b.box(0.2, 0.13, 0.005, M.screenOff, [3.93, 1.03, cz + 0.13]);
  b.add(A.plane(0.19, 0.12, 900, (c, w, hh) => drawScope(c, w, hh)), M.labelGlow, [3.93, 1.03, cz + 0.134]);
  for (let k = 0; k < 6; k++) b.cyl(0.01, 0.01, 0.02, M.plastic, [4.08 + (k % 2) * 0.05, 1.07 - ((k / 2) | 0) * 0.04, cz + 0.135], [Math.PI / 2, 0, 0], 10);
  // Spare-parts foam cases
  for (const [k, px] of [5.0, 5.5].entries()) {
    b.box(0.42, 0.14, 0.32, k ? M.paintDark : M.paintBlue, [px, 0.99, cz]);
    b.box(0.12, 0.02, 0.03, M.steel, [px, 1.02, cz + 0.17]);
  }
  b.add(A.sign(0.3, 0.06, { bg: '#f7d64a', lines: [{ t: 'SPARE LENS UNITS', size: 0.5, weight: 700 }] }), M.label, [5.0, 0.99, cz + 0.161]);
  // Parts bins
  for (let k = 0; k < 5; k++) {
    b.box(0.16, 0.1, 0.24, [M.paintBlue, M.paintYellow, M.paintBlue, M.paintRed, M.paintBlue][k], [6.05 + (k % 3) * 0.18 - 0.18, 0.97 + ((k / 3) | 0) * 0.105, cz]);
  }

  // ---- Side wall information panels ----------------------------------------
  const panel = (x, z, rotY, title, lines, accent) => {
    b.box(0.04, 1.1, 0.8, M.alu, [x, 1.75, z], [0, rotY, 0]);
    const off = Math.sign(-x) * 0.022;
    b.add(A.plane(0.76, 1.06, 500, (c, w, hh) => drawInfoPanel(c, w, hh, title, lines, accent)), M.label, [x + off, 1.75, z], [0, rotY + Math.PI / 2 * Math.sign(-x), 0]);
  };
  panel(-6.98, 5.6, 0, 'PERCEPTION', ['Can a machine tell a cube', 'from a cylinder under', 'changing light?', '', 'Bench A runs repeatable', 'trials with a calibrated', 'camera, turntable and', 'reference targets.'], '#2d5f8c');
  panel(6.98, 5.6, 0, 'MOTION', ['Precise movement starts', 'with careful testing.', '', 'Rig B moves a 3-joint arm', 'along a linear track while', 'encoders log every', 'millimetre.', '', 'Operators only beyond', 'the yellow line.'], '#d7642a');
  panel(-6.98, -5.2, 0, 'IMAGING', ['ORBIS-7 surrounds a single', 'sample with eight lens', 'and sensor modules plus', 'four arch-mounted views.', '', 'Each frame is captured', 'from 13 angles at once.'], '#2f7f7a');
  // First-aid box
  b.box(0.06, 0.4, 0.34, M.paintWhite, [6.97, 1.45, -5.2]);
  b.add(A.sign(0.32, 0.38, { bg: '#ffffff', lines: [{ t: '✚', size: 0.5, color: '#1d8a3c', weight: 800 }, { t: 'FIRST AID', size: 0.16, color: '#1d8a3c', weight: 800 }] }), M.label, [6.938, 1.45, -5.2], [0, -Math.PI / 2, 0]);

  // ---- Floor guidance ---------------------------------------------------------
  b.add(ringSlab(1.78, 1.9, 0.004, 96), M.hazard, [IC.x, 0, IC.z]);
  b.add(ringSlab(2.6, 2.66, 0.004, 96), M.floorPaintW, [IC.x, 0, IC.z]);
  for (const s of [-1, 1]) b.box(0.06, 0.004, 5.2, M.floorPaintY, [s * 1.4, 0.002, 5.6]);
  b.add(A.sign(2.6, 0.5, { bg: 'rgba(0,0,0,0)', lines: [{ t: '◄ PERCEPTION      MOTION ►', size: 0.5, color: '#e3e3dc', weight: 800 }] }), M.labelCut, [0, 0.005, 4.6], [-Math.PI / 2, 0, 0]);
  b.add(A.sign(1.2, 0.36, { bg: 'rgba(0,0,0,0)', lines: [{ t: 'EXIT ▲', size: 0.6, color: '#e3e3dc', weight: 800 }] }), M.labelCut, [0, 0.005, 3.4], [-Math.PI / 2, 0, Math.PI]);
  for (const s of [-1, 1]) {
    b.box(0.06, 0.004, 2.6, M.floorPaintY, [s * 6.2, 0.002, 0]);
    b.box(1.4, 0.004, 0.06, M.floorPaintY, [s * 5.5, 0.002, -1.3]);
    b.box(1.4, 0.004, 0.06, M.floorPaintY, [s * 5.5, 0.002, 1.3]);
  }

  // Alcove header signs (facing hall)
  b.add(A.sign(3.0, 0.42, { bg: '#2d5f8c', lines: [{ t: 'PERCEPTION TESTING  ·  BENCH A', size: 0.42, color: '#ffffff', weight: 700 }] }), M.label, [-6.985, 3.8, 0], [0, Math.PI / 2, 0]);
  b.add(A.sign(3.0, 0.42, { bg: '#c75a24', lines: [{ t: 'MOTION TESTING  ·  RIG B', size: 0.42, color: '#ffffff', weight: 700 }] }), M.label, [6.985, 3.8, 0], [0, -Math.PI / 2, 0]);
}

function drawFloorPlan(c, w, h) {
  c.fillStyle = '#f4f3ee'; c.fillRect(0, 0, w, h);
  c.fillStyle = '#2c3e4c'; c.fillRect(0, 0, w, h * 0.13);
  c.fillStyle = '#fff'; c.font = `700 ${h * 0.07}px Segoe UI, Arial`; c.textBaseline = 'middle'; c.fillText('HALL PLAN · VISITOR ROUTE', w * 0.04, h * 0.065);
  const s = Math.min(w / 26, (h * 0.8) / 17), ox = w / 2, oy = h * 0.14 + 7.2 * s;
  const X = (x) => ox + x * s, Y = (z) => oy + z * s;
  c.strokeStyle = '#2c3e4c'; c.lineWidth = 3; c.fillStyle = '#e2e4e2';
  c.beginPath();
  c.moveTo(X(-7), Y(-7)); c.lineTo(X(7), Y(-7)); c.lineTo(X(7), Y(-3.4)); c.lineTo(X(12), Y(-3.4)); c.lineTo(X(12), Y(3.4)); c.lineTo(X(7), Y(3.4));
  c.lineTo(X(7), Y(8.5)); c.lineTo(X(-7), Y(8.5)); c.lineTo(X(-7), Y(3.4)); c.lineTo(X(-12), Y(3.4)); c.lineTo(X(-12), Y(-3.4)); c.lineTo(X(-7), Y(-3.4)); c.closePath();
  c.fill(); c.stroke();
  c.fillStyle = '#2f7f7a'; c.beginPath(); c.arc(X(0), Y(-0.6), 1.6 * s, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#2d5f8c'; c.fillRect(X(-12), Y(-2.4), 0.9 * s, 4.8 * s);
  c.fillStyle = '#d7642a'; c.fillRect(X(9.6), Y(-1.5), 2.3 * s, 3.3 * s);
  c.strokeStyle = '#c0281f'; c.setLineDash([6, 5]); c.lineWidth = 3;
  c.beginPath(); c.moveTo(X(0), Y(7.6)); c.lineTo(X(0), Y(2.6)); c.arc(X(0), Y(-0.6), 3.2 * s, Math.PI / 2, Math.PI * 2.5); c.stroke();
  c.beginPath(); c.moveTo(X(-3.2), Y(-0.6)); c.lineTo(X(-10), Y(0)); c.moveTo(X(3.2), Y(-0.6)); c.lineTo(X(8.6), Y(0)); c.stroke();
  c.setLineDash([]);
  c.fillStyle = '#1b1f24'; c.font = `600 ${h * 0.045}px Segoe UI, Arial`; c.textAlign = 'center';
  c.fillText('ORBIS-7', X(0), Y(-0.6) + 0.1 * s);
  c.fillText('BENCH A', X(-9.5), Y(4.6)); c.fillText('RIG B', X(9.5), Y(4.6));
  c.fillStyle = '#c0281f'; c.beginPath(); c.arc(X(0), Y(7.4), 0.45 * s, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#1b1f24'; c.fillText('YOU ARE HERE', X(0), Y(8.5) + h * 0.05);
}

function drawScope(c, w, h) {
  c.fillStyle = '#04140c'; c.fillRect(0, 0, w, h);
  c.strokeStyle = 'rgba(80,140,100,0.5)'; c.lineWidth = 1;
  for (let i = 1; i < 10; i++) { c.beginPath(); c.moveTo((w * i) / 10, 0); c.lineTo((w * i) / 10, h); c.stroke(); }
  for (let i = 1; i < 8; i++) { c.beginPath(); c.moveTo(0, (h * i) / 8); c.lineTo(w, (h * i) / 8); c.stroke(); }
  c.strokeStyle = '#ffe14a'; c.lineWidth = 2; c.beginPath();
  for (let x = 0; x < w; x++) { const y = h * 0.35 + Math.sin(x * 0.12) * h * 0.12; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
  c.strokeStyle = '#4ad8ff'; c.beginPath();
  for (let x = 0; x < w; x++) { const y = h * 0.72 + ((x % 40) < 20 ? -1 : 1) * h * 0.08; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
}

function drawInfoPanel(c, w, h, title, lines, accent) {
  c.fillStyle = '#f5f4ef'; c.fillRect(0, 0, w, h);
  c.fillStyle = accent; c.fillRect(0, 0, w, h * 0.16);
  c.fillStyle = '#fff'; c.font = `700 ${h * 0.065}px Segoe UI, Arial`; c.textBaseline = 'middle'; c.fillText(title, w * 0.08, h * 0.085);
  c.fillStyle = '#2b2f35'; c.font = `500 ${h * 0.036}px Segoe UI, Arial`;
  lines.forEach((l, i) => c.fillText(l, w * 0.08, h * 0.23 + i * h * 0.052));
  c.strokeStyle = accent; c.lineWidth = 4;
  c.beginPath(); c.arc(w * 0.75, h * 0.86, h * 0.07, 0, Math.PI * 2); c.stroke();
  c.beginPath(); c.moveTo(w * 0.1, h * 0.93); c.lineTo(w * 0.55, h * 0.93); c.stroke();
}
