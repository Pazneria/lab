// East alcove: motion-test rig (linear track + 3-joint arm inside an extrusion cage)
// with an operator control console, electrical cabinet and tool cart.
import * as THREE from 'three';
import { cableGeo } from './builder.js';

const D = Math.PI / 180;

export function buildMotion(ctx) {
  const { b, M, A } = ctx;
  const TX0 = 9.6, TX1 = 11.85, TZ0 = -1.5, TZ1 = 1.6, TOP = 0.82;
  const tx = (TX0 + TX1) / 2, tz = (TZ0 + TZ1) / 2;
  const breadboard = new THREE.MeshStandardMaterial({ color: 0x5a5e64, metalness: 0.7, roughness: 0.4, map: M.perf.map, normalMap: M.perf.normalMap });

  // ---- Test table ---------------------------------------------------------------
  b.box(TX1 - TX0, 0.05, TZ1 - TZ0, breadboard, [tx, TOP - 0.025, tz]);
  b.box(TX1 - TX0 - 0.04, 0.1, TZ1 - TZ0 - 0.04, M.paintGrey, [tx, TOP - 0.1, tz]);
  for (const x of [TX0 + 0.08, TX1 - 0.08]) for (const z of [TZ0 + 0.08, tz, TZ1 - 0.08]) {
    b.box(0.08, TOP - 0.15, 0.08, M.paintGrey, [x, (TOP - 0.15) / 2 + 0.02, z]);
    b.cyl(0.05, 0.06, 0.02, M.rubber, [x, 0.01, z], [0, 0, 0], 12);
  }
  b.box(TX1 - TX0 - 0.2, 0.06, 0.06, M.paintGrey, [tx, 0.18, TZ0 + 0.08]);
  b.box(TX1 - TX0 - 0.2, 0.06, 0.06, M.paintGrey, [tx, 0.18, TZ1 - 0.08]);
  b.collideBox(TX0 - 0.1, TX1 + 0.2, TZ0 - 0.1, TZ1 + 0.1);

  // ---- Linear track (rails, ball screw, servo, carriage) ----------------------------------
  const RZ0 = TZ0 + 0.15, RZ1 = TZ1 - 0.15, rl = RZ1 - RZ0, rc = (RZ0 + RZ1) / 2;
  b.box(0.5, 0.03, rl + 0.1, M.anodBlack, [10.55, TOP + 0.015, rc]);
  for (const x of [10.38, 10.72]) {
    b.box(0.03, 0.025, rl, M.chrome, [x, TOP + 0.0425, rc]);
    for (let z = RZ0 + 0.05; z < RZ1; z += 0.12) b.cyl(0.005, 0.005, 0.003, M.anodBlack, [x, TOP + 0.0555, z], [0, 0, 0], 6);
  }
  b.cyl(0.012, 0.012, rl - 0.1, M.chrome, [10.55, TOP + 0.06, rc], [Math.PI / 2, 0, 0], 12);
  for (const z of [RZ0 + 0.02, RZ1 - 0.02]) b.box(0.12, 0.08, 0.05, M.anodBlack, [10.55, TOP + 0.07, z]);
  // servo motor at -z end
  b.box(0.11, 0.11, 0.03, M.alu, [10.55, TOP + 0.07, RZ0 - 0.05]);
  b.box(0.1, 0.1, 0.16, M.anodBlack, [10.55, TOP + 0.07, RZ0 - 0.15]);
  b.cyl(0.04, 0.04, 0.05, M.paintBlue, [10.55, TOP + 0.07, RZ0 - 0.255], [Math.PI / 2, 0, 0], 16);
  b.add(A.sign(0.08, 0.03, { bg: '#f4f2ea', lines: [{ t: 'AX-1 SERVO', size: 0.5, weight: 700 }] }), M.label, [10.6005, TOP + 0.08, RZ0 - 0.15], [0, Math.PI / 2, 0]);
  // end-of-travel stops + limit switches
  for (const z of [RZ0 + 0.1, RZ1 - 0.1]) {
    b.box(0.04, 0.05, 0.03, M.paintYellow, [10.3, TOP + 0.055, z]);
    b.box(0.03, 0.03, 0.02, M.plastic, [10.82, TOP + 0.05, z]);
    b.box(0.006, 0.006, 0.006, M.ledAmber, [10.82, TOP + 0.068, z]);
  }
  // carriage
  const CZ = 0.25;
  for (const x of [10.38, 10.72]) for (const dz of [-0.09, 0.09]) b.box(0.06, 0.035, 0.08, M.steelDark, [x, TOP + 0.07, CZ + dz]);
  b.box(0.12, 0.05, 0.1, M.brass, [10.55, TOP + 0.07, CZ]);
  b.box(0.46, 0.025, 0.34, M.alu, [10.55, TOP + 0.1, CZ]);
  // scale strip along rail
  b.add(A.plane(rl, 0.02, 900, (c, w, h) => { c.fillStyle = '#d8d8d0'; c.fillRect(0, 0, w, h); c.fillStyle = '#222'; for (let i = 0; i < 300; i++) { const x = (i / 300) * w; c.fillRect(x, 0, 1, i % 10 === 0 ? h : i % 5 === 0 ? h * 0.6 : h * 0.35); } }), M.label, [10.31, TOP + 0.031, rc], [-Math.PI / 2, 0, Math.PI / 2]);

  // ---- 3-joint arm on the carriage -----------------------------------------------------
  b.push([10.55, TOP + 0.1125, CZ], [0, -0.5, 0]);
  b.cyl(0.13, 0.14, 0.05, M.anodBlack, [0, 0.025, 0], [0, 0, 0], 32);
  for (let k = 0; k < 8; k++) { const a = k * 45 * D; b.cyl(0.008, 0.008, 0.01, M.chrome, [Math.sin(a) * 0.115, 0.054, Math.cos(a) * 0.115], [0, 0, 0], 6); }
  b.cyl(0.11, 0.12, 0.16, M.paintOrange, [0, 0.13, 0], [0, 0, 0], 32);           // J1 turret
  b.cyl(0.115, 0.115, 0.02, M.anodBlack, [0, 0.06, 0], [0, 0, 0], 32);
  b.add(A.cylBand(0.1105, 0.03, -0.4, 0.8, 1400, (c, w, h) => { c.fillStyle = '#d7642a'; c.fillRect(0, 0, w, h); c.fillStyle = '#fff'; c.font = `700 ${h * 0.75}px Segoe UI`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('J1', w / 2, h * 0.55); }, 12), M.label, [0, 0.16, 0]);
  // shoulder yoke + J2
  for (const s of [-1, 1]) b.box(0.035, 0.16, 0.14, M.paintOrange, [s * 0.085, 0.27, 0]);
  b.push([0, 0.32, 0], [0, 0, 0]);
  b.cyl(0.07, 0.07, 0.22, M.anodBlack, [0, 0, 0], [0, 0, Math.PI / 2], 24);
  for (const s of [-1, 1]) b.cyl(0.055, 0.055, 0.012, M.alu, [s * 0.116, 0, 0], [0, 0, Math.PI / 2], 24);
  b.add(A.sign(0.05, 0.03, { bg: '#2b2e33', lines: [{ t: 'J2', size: 0.7, color: '#fff', weight: 700 }] }), M.label, [0.1225, 0, 0], [0, Math.PI / 2, 0]);
  // upper arm (tilted back 28 deg)
  b.push([0, 0, 0], [-28 * D, 0, 0]);
  b.box(0.1, 0.48, 0.1, M.paintOrange, [0, 0.24, 0]);
  b.box(0.104, 0.3, 0.02, M.paintDark, [0, 0.24, 0.05]);
  b.add(cableGeo([[0.06, 0.05, -0.05], [0.07, 0.25, -0.07], [0.06, 0.46, -0.06]], 0.012, 12, 6), M.rubber);
  b.push([0, 0.48, 0], [100 * D, 0, 0]);
  // elbow J3
  b.cyl(0.06, 0.06, 0.16, M.anodBlack, [0, 0, 0], [0, 0, Math.PI / 2], 24);
  for (const s of [-1, 1]) b.cyl(0.045, 0.045, 0.012, M.alu, [s * 0.086, 0, 0], [0, 0, Math.PI / 2], 24);
  b.add(A.sign(0.04, 0.025, { bg: '#2b2e33', lines: [{ t: 'J3', size: 0.7, color: '#fff', weight: 700 }] }), M.label, [0.0925, 0, 0], [0, Math.PI / 2, 0]);
  // forearm
  b.box(0.075, 0.36, 0.075, M.paintOrange, [0, 0.19, 0]);
  b.add(cableGeo([[0.045, 0.03, -0.045], [0.05, 0.2, -0.05], [0.04, 0.36, -0.04]], 0.009, 10, 6), M.rubber);
  b.push([0, 0.38, 0], [42 * D, 0, 0]);
  // wrist + gripper
  b.cyl(0.045, 0.045, 0.06, M.anodBlack, [0, 0.0, 0], [0, 0, 0], 20);
  b.cyl(0.05, 0.05, 0.012, M.paintBlue, [0, 0.035, 0], [0, 0, 0], 20);
  b.box(0.12, 0.03, 0.05, M.alu, [0, 0.06, 0]);
  for (const s of [-1, 1]) { b.box(0.015, 0.08, 0.035, M.steel, [s * 0.04, 0.11, 0]); b.box(0.01, 0.03, 0.03, M.rubber, [s * 0.03, 0.14, 0]); }
  b.box(0.045, 0.045, 0.045, M.paintYellow, [0, 0.135, 0], [0, 0.2, 0]);   // test block held in gripper
  b.pop(); b.pop(); b.pop(); b.pop(); b.pop();

  // ---- Energy chain (drag chain) beside the track -----------------------------------------
  {
    const x = 11.1, y0 = TOP + 0.02, R = 0.07, zFix = RZ0 + 0.1, zBend = (zFix + CZ) / 2 + 0.25;
    const links = [];
    for (let z = zFix; z < zBend; z += 0.04) links.push([z, y0, 0]);
    for (let a = 0; a <= 180; a += 20) links.push([zBend + Math.sin(a * D) * R, y0 + R - Math.cos(a * D) * R, a * D]);
    for (let z = zBend - 0.04; z > CZ + 0.1; z -= 0.04) links.push([z, y0 + 2 * R, Math.PI]);
    for (const [z, y, a] of links) {
      b.push([x, y + 0.02, z], [-a, 0, 0]);
      b.box(0.07, 0.035, 0.036, M.plastic, [0, 0, 0]);
      b.pop();
    }
    b.box(0.08, 0.03, 0.06, M.alu, [x, y0 + 2 * R + 0.02, CZ + 0.1]);
    b.box(0.5, 0.012, 0.05, M.alu, [10.85, TOP + 0.11, CZ + 0.1]);
  }

  // ---- Calibration fixtures on the table -------------------------------------------------
  b.box(0.2, 0.06, 0.2, M.steelDark, [10.0, TOP + 0.03, -0.9]);
  for (const [x, z] of [[-0.06, -0.06], [0.06, -0.06], [0, 0.06]]) b.cyl(0.008, 0.008, 0.05, M.chrome, [10.0 + x, TOP + 0.085, -0.9 + z], [0, 0, 0], 8);
  b.box(0.12, 0.06, 0.06, M.paintGrey, [10.05, TOP + 0.03, 1.2]);
  b.box(0.12, 0.06, 0.06, M.paintGrey, [10.05, TOP + 0.03, 1.3]);
  b.add(A.sign(0.1, 0.04, { bg: '#f4f2ea', lines: [{ t: '2 kg', size: 0.6, weight: 700 }] }), M.label, [9.9895, TOP + 0.03, 1.2], [0, -Math.PI / 2, 0]);
  // dial indicator on magnetic base
  b.box(0.06, 0.05, 0.05, M.paintRed, [10.0, TOP + 0.025, 0.7]);
  b.cyl(0.008, 0.008, 0.2, M.chrome, [10.0, TOP + 0.15, 0.7], [0, 0, 0], 8);
  b.cyl(0.006, 0.006, 0.12, M.chrome, [10.05, TOP + 0.24, 0.7], [0, 0, Math.PI / 2], 8);
  b.cyl(0.03, 0.03, 0.015, M.chrome, [10.11, TOP + 0.24, 0.7], [Math.PI / 2, 0, 0], 20);
  b.add(A.plane(0.05, 0.05, 1600, (c, w, h) => { c.fillStyle = '#fafafa'; c.beginPath(); c.arc(w / 2, h / 2, w / 2, 0, 7); c.fill(); c.strokeStyle = '#111'; for (let k = 0; k < 50; k++) { const a = (k / 50) * Math.PI * 2; c.lineWidth = k % 5 ? 1 : 2; c.beginPath(); c.moveTo(w / 2 + Math.cos(a) * w * 0.46, h / 2 + Math.sin(a) * h * 0.46); c.lineTo(w / 2 + Math.cos(a) * w * (k % 5 ? 0.41 : 0.37), h / 2 + Math.sin(a) * h * (k % 5 ? 0.41 : 0.37)); c.stroke(); } c.strokeStyle = '#c00'; c.lineWidth = 2; c.beginPath(); c.moveTo(w / 2, h / 2); c.lineTo(w * 0.75, h * 0.25); c.stroke(); }), M.labelCut, [10.11, TOP + 0.24, 0.7081]);

  // ---- Extrusion cage with polycarbonate guards --------------------------------------
  const CX0 = TX0 + 0.02, CX1 = TX1 - 0.02, CZ0 = TZ0 + 0.02, CZ1 = TZ1 - 0.02, CY0 = TOP, CY1 = 2.15, P = 0.045;
  const posts = [[CX0, CZ0], [CX1, CZ0], [CX0, CZ1], [CX1, CZ1], [CX0, tz], [CX1, tz]];
  for (const [x, z] of posts) { b.box(P, CY1 - CY0, P, M.alu, [x, (CY0 + CY1) / 2, z]); b.box(P + 0.004, 0.01, P + 0.004, M.plastic, [x, CY1 + 0.005, z]); }
  for (const y of [CY1, CY0 + 0.05]) {
    b.box(CX1 - CX0, P, P, M.alu, [tx, y - P / 2, CZ0]); b.box(CX1 - CX0, P, P, M.alu, [tx, y - P / 2, CZ1]);
    b.box(P, P, CZ1 - CZ0, M.alu, [CX0, y - P / 2, tz]); b.box(P, P, CZ1 - CZ0, M.alu, [CX1, y - P / 2, tz]);
  }
  b.box(P, P, CZ1 - CZ0, M.alu, [tx, CY1 - P / 2, tz]);
  // guard panels: back, two sides, front-upper only (front-lower open behind light curtain)
  b.box(0.006, CY1 - CY0 - 0.1, CZ1 - CZ0 - 0.05, M.glassTint, [CX1 + 0.03, (CY0 + CY1) / 2 + 0.02, tz]);
  for (const z of [CZ0, CZ1]) b.box(CX1 - CX0 - 0.05, CY1 - CY0 - 0.1, 0.006, M.glassTint, [tx, (CY0 + CY1) / 2 + 0.02, z + (z < 0 ? -0.03 : 0.03)]);
  b.box(0.006, 0.5, CZ1 - CZ0 - 0.05, M.glassTint, [CX0 - 0.03, CY1 - 0.28, tz]);
  b.box(P, P, CZ1 - CZ0, M.alu, [CX0, CY1 - 0.55, tz]);
  // corner gussets
  for (const [x, z] of posts.slice(0, 4)) b.box(0.06, 0.06, 0.012, M.alu, [x + (x < tx ? 0.03 : -0.03), CY1 - 0.08, z]);
  // light curtain posts on the open front
  for (const z of [CZ0 + 0.1, CZ1 - 0.1]) {
    b.box(0.04, 0.85, 0.04, M.paintYellow, [CX0 - 0.06, TOP + 0.47, z]);
    for (let k = 0; k < 8; k++) b.box(0.004, 0.02, 0.02, M.ledRed, [CX0 - 0.06 + 0.0, TOP + 0.12 + k * 0.1, z + (z < 0 ? 0.021 : -0.021)]);
  }
  b.add(A.sign(0.34, 0.24, { bg: '#f7d64a', border: '#111', lines: [{ t: '⚠ CAUTION', size: 0.2, color: '#111', weight: 800 }, { t: 'Moving parts', size: 0.14, color: '#111', weight: 600 }, { t: 'Light curtain active', size: 0.12, color: '#111', weight: 600 }] }), M.label, [CX0 - 0.034, CY1 - 0.28, -0.6], [0, -Math.PI / 2, 0]);
  b.add(A.sign(0.5, 0.1, { bg: '#2b2e33', lines: [{ t: 'RIG B  ·  LINEAR + 3R', size: 0.5, color: '#fff', weight: 700 }] }), M.label, [CX0 - 0.034, CY1 - 0.28, 0.5], [0, -Math.PI / 2, 0]);
  // signal tower
  const ST = [CX0, CZ0];
  b.cyl(0.012, 0.012, 0.12, M.steel, [ST[0], CY1 + 0.06, ST[1]], [0, 0, 0], 8);
  const tiers = [[M.ledGreen, 0], [new THREE.MeshStandardMaterial({ color: 0x8a5a10, roughness: 0.3, transparent: false }), 1], [new THREE.MeshStandardMaterial({ color: 0x6a1410, roughness: 0.3 }), 2]];
  for (const [m, i] of tiers) b.cyl(0.035, 0.035, 0.06, m, [ST[0], CY1 + 0.15 + i * 0.065, ST[1]], [0, 0, 0], 20);
  b.cyl(0.036, 0.036, 0.01, M.plastic, [ST[0], CY1 + 0.115, ST[1]], [0, 0, 0], 20);
  b.cyl(0.03, 0.036, 0.02, M.plastic, [ST[0], CY1 + 0.32, ST[1]], [0, 0, 0], 20);

  // ---- Floor hazard border around the rig ------------------------------------------------
  const HX0 = 9.1, HZ0 = -1.95, HZ1 = 2.05;
  b.box(0.08, 0.004, HZ1 - HZ0, M.hazard, [HX0, 0.002, (HZ0 + HZ1) / 2]);
  b.box(12 - HX0, 0.004, 0.08, M.hazard, [(HX0 + 12) / 2, 0.002, HZ0]);
  b.box(12 - HX0, 0.004, 0.08, M.hazard, [(HX0 + 12) / 2, 0.002, HZ1]);
  b.add(A.sign(1.2, 0.18, { bg: 'rgba(0,0,0,0)', lines: [{ t: 'OPERATORS ONLY BEYOND LINE', size: 0.55, color: '#e0b020', weight: 800 }] }), M.labelCut, [8.85, 0.005, 0.05], [-Math.PI / 2, 0, Math.PI / 2]);
  b.collideBox(HX0 + 0.1, 12, HZ0, HZ1);

  // ---- Control console -------------------------------------------------------------------
  b.push([8.55, 0, -2.78], [0, 0.4, 0]);
  b.box(1.2, 0.72, 0.6, M.paintGrey, [0, 0.38, -0.02]);
  b.box(1.2, 0.04, 0.6, M.skirting, [0, 0.02, -0.02]);
  b.box(1.16, 0.6, 0.012, M.paintGrey, [0, 0.4, 0.286]);
  b.box(0.1, 0.02, 0.02, M.steel, [0.45, 0.62, 0.3]);
  for (let k = 0; k < 6; k++) b.box(0.3, 0.006, 0.012, M.perf, [-0.35, 0.3 + k * 0.03, 0.295]);
  // sloped control deck
  b.push([0, 0.8, 0.05], [0.38, 0, 0]);
  b.box(1.24, 0.06, 0.5, M.paintDark, [0, 0, 0]);
  b.box(1.16, 0.004, 0.44, M.laminate, [0, 0.032, 0]);
  b.add(A.plane(1.16, 0.44, 700, (c, w, h) => drawDeck(c, w, h)), M.label, [0, 0.035, 0], [-Math.PI / 2, 0, 0]);
  // E-stop
  b.box(0.11, 0.05, 0.11, M.paintYellow, [0.45, 0.06, 0.04]);
  b.cyl(0.018, 0.018, 0.03, M.paintRed, [0.45, 0.095, 0.04], [0, 0, 0], 16);
  b.cyl(0.042, 0.035, 0.03, M.paintRed, [0.45, 0.12, 0.04], [0, 0, 0], 24);
  // illuminated push buttons
  const btn = (x, z, m, ring) => { b.cyl(0.026, 0.026, 0.012, M.chrome, [x, 0.038, z], [0, 0, 0], 20); b.cyl(0.02, 0.02, 0.018, m, [x, 0.045, z], [0, 0, 0], 20); };
  btn(-0.42, -0.08, M.ledGreen); btn(-0.3, -0.08, M.ledAmber); btn(-0.18, -0.08, M.paintDark);
  // selector + key switch + jog wheel + joystick
  b.cyl(0.03, 0.03, 0.01, M.chrome, [-0.42, 0.036, 0.1], [0, 0, 0], 20);
  b.box(0.012, 0.03, 0.045, M.plastic, [-0.42, 0.055, 0.1], [0, 0.6, 0]);
  b.cyl(0.022, 0.022, 0.015, M.chrome, [-0.3, 0.04, 0.1], [0, 0, 0], 16);
  b.box(0.006, 0.02, 0.025, M.brass, [-0.3, 0.058, 0.1], [0, 0.3, 0]);
  b.cyl(0.05, 0.05, 0.02, M.anodBlack, [0.05, 0.045, 0.08], [0, 0, 0], 28);
  b.cyl(0.008, 0.008, 0.025, M.chrome, [0.08, 0.07, 0.08], [0, 0, 0], 8);
  b.box(0.09, 0.02, 0.09, M.rubber, [0.22, 0.04, 0.07]);
  b.cyl(0.008, 0.01, 0.08, M.steel, [0.22, 0.09, 0.07], [0.15, 0, 0], 10);
  b.add(new THREE.SphereGeometry(0.02, 14, 10), M.paintRed, [0.22, 0.135, 0.078]);
  b.pop();
  // upper screen pod
  b.box(1.24, 0.42, 0.1, M.paintDark, [0, 1.25, -0.24], [-0.1, 0, 0]);
  b.push([0, 1.25, -0.24], [-0.1, 0, 0]);
  ctx.screen('joints', 0.56, 0.32, 640, 366, [-0.3, 0.0, 0.0505], [0, 0, 0]);
  ctx.screen('trace', 0.56, 0.32, 640, 366, [0.3, 0.0, 0.0505], [0, 0, 0]);
  b.pop();
  b.box(0.04, 0.4, 0.04, M.steelDark, [0, 1.0, -0.26]);
  b.add(A.sign(0.8, 0.07, { bg: '#2b2e33', lines: [{ t: 'RIG B  ·  OPERATOR CONSOLE', size: 0.55, color: '#e6eaee', weight: 700 }] }), M.label, [0, 1.495, -0.21], [-0.1, 0, 0]);
  b.collideLocalBox(1.3, 0.75, [0, 0, -0.02]);
  b.pop();
  // console -> rig cable protector
  b.push([9.05, 0, -1.25], [0, 0.55, 0]);
  b.box(0.22, 0.025, 1.6, M.paintDark, [0, 0.0125, 0]);
  b.box(0.12, 0.004, 1.58, M.hazard, [0, 0.026, 0]);
  b.pop();

  // ---- Electrical cabinet on back wall ------------------------------------------------------
  b.box(0.45, 1.9, 0.9, M.paintGrey, [11.75, 0.95, 2.75]);
  b.box(0.01, 1.84, 0.42, M.paintGrey, [11.522, 0.95, 2.52]);
  b.box(0.01, 1.84, 0.42, M.paintGrey, [11.522, 0.95, 2.98]);
  for (const z of [2.7, 2.8]) b.box(0.03, 0.14, 0.025, M.anodBlack, [11.505, 1.1, z]);
  b.add(A.sign(0.16, 0.14, { bg: '#f7d64a', border: '#111', lines: [{ t: '⚡', size: 0.5, color: '#111', weight: 800 }, { t: '400 V', size: 0.22, color: '#111', weight: 800 }] }), M.label, [11.516, 1.55, 2.52], [0, -Math.PI / 2, 0]);
  b.add(A.sign(0.3, 0.06, { bg: '#f4f2ea', lines: [{ t: 'PANEL B-2', size: 0.6, weight: 700 }] }), M.label, [11.516, 1.75, 2.98], [0, -Math.PI / 2, 0]);
  b.box(0.08, 0.08, 0.08, M.plastic, [11.505, 1.3, 2.98]);
  b.box(0.02, 0.04, 0.012, M.paintRed, [11.46, 1.3, 2.98]);
  b.collideBox(11.5, 12, 2.28, 3.25);
  // conduit from cabinet along wall to rig
  b.cyl(0.025, 0.025, 1.5, M.steelDark, [11.92, 2.1, 1.5], [Math.PI / 2, 0, 0], 12);
  b.add(cableGeo([[11.92, 1.9, 2.3], [11.92, 2.1, 2.1], [11.92, 2.1, 0.75], [11.92, 1.6, 0.55], [11.9, 1.0, 0.5], [11.82, 0.86, 0.4]], 0.02, 30, 8), M.rubber);

  // ---- Tool cart ---------------------------------------------------------------------------
  b.push([8.35, 0, 2.75], [0, -0.15, 0]);
  b.box(0.75, 0.72, 0.45, M.paintRed, [0, 0.5, 0]);
  for (let k = 0; k < 4; k++) { b.box(0.7, 0.003, 0.004, M.paintDark, [0, 0.3 + k * 0.13, 0.227]); b.box(0.3, 0.02, 0.02, M.steel, [0, 0.36 + k * 0.13, 0.24]); }
  b.box(0.79, 0.03, 0.49, M.rubber, [0, 0.875, 0]);
  for (const [x, z] of [[-0.32, -0.18], [0.32, -0.18], [-0.32, 0.18], [0.32, 0.18]]) b.cyl(0.05, 0.05, 0.035, M.rubber, [x, 0.06, z], [0, 0, Math.PI / 2], 14);
  b.box(0.04, 0.3, 0.04, M.steel, [0.42, 0.95, 0]);
  b.box(0.3, 0.06, 0.12, M.paintYellow, [-0.12, 0.92, 0.05]);
  b.cyl(0.012, 0.012, 0.22, M.paintBlue, [0.15, 0.9, -0.05], [0, 0, Math.PI / 2], 8);
  b.box(0.12, 0.01, 0.04, M.steel, [0.15, 0.895, 0.1], [0, 0.4, 0]);
  b.pop();
  b.collideBox(7.9, 8.8, 2.45, 3.05);
}

function drawDeck(c, w, h) {
  c.fillStyle = '#d8d8d0'; c.fillRect(0, 0, w, h);
  c.strokeStyle = '#555'; c.lineWidth = 2; c.strokeRect(6, 6, w - 12, h - 12);
  c.fillStyle = '#222'; c.font = `700 ${h * 0.06}px Segoe UI, Arial`; c.textAlign = 'center'; c.textBaseline = 'middle';
  const X = (x) => w / 2 + (x / 1.16) * w, Y = (z) => h / 2 + (z / 0.44) * h;
  c.fillText('START', X(-0.42), Y(-0.16)); c.fillText('HOLD', X(-0.3), Y(-0.16)); c.fillText('RESET', X(-0.18), Y(-0.16));
  c.fillText('MODE', X(-0.42), Y(0.18)); c.fillText('KEY', X(-0.3), Y(0.18));
  c.fillText('JOG AX-1', X(0.05), Y(0.18)); c.fillText('J1 / J2', X(0.22), Y(0.18));
  c.fillStyle = '#b3261e'; c.font = `800 ${h * 0.07}px Segoe UI, Arial`; c.fillText('EMERGENCY STOP', X(0.45), Y(0.16));
  c.fillStyle = '#e0b020'; c.beginPath(); c.arc(X(0.45), Y(0.04), h * 0.16, 0, 7); c.fill();
}
