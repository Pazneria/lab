import { random } from './layout.js';
import { fieldChart, graphic, plate, scheduleSheet } from './textures.js';
import { caseBox, contact, grip, mug } from './props.js';

export function makeWorkshop(mesh, m, floor) {
  const p = mesh.at('workbench', 0.44, floor, -4.21);
  const top = 0.922;
  const depth = 0.765;
  const width = 5.11;
  contact(p, m, 0, 0.04, 5.56, 1.52);
  p.box(m.ink, 0, top - 0.078, 0.015, width - 0.12, 0.09, 0.69);
  for (let i = 0; i < 3; i++) {
    const x = (i - 1) * width / 3;
    p.box(m.ply, x, top - 0.028, 0, width / 3 - 0.003, 0.055, depth, 0, 0, 0, 1);
    p.box(m.plyEdge, x, top - 0.031, depth / 2 + 0.005, width / 3 - 0.007, 0.047, 0.015);
    for (let j = 0; j < 3; j++) {
      p.box(m.ply, x, top - 0.046 + j * 0.013, depth / 2 + 0.016, width / 3 - 0.013, 0.0036, 0.005);
    }
  }
  for (const x of [-2.43, -0.86, 0.85, 2.43]) {
    for (const z of [-0.271, 0.283]) {
      p.box(m.petrol, x, 0.449, z, 0.065, 0.895, 0.060, 0, 0, 0, 1);
      p.box(m.coal, x, 0.033, z, 0.084, 0.06, 0.082);
      p.box(m.patina, x, top - 0.173, z + 0.037, 0.118, 0.166, 0.017);
      for (const y of [top - 0.234, top - 0.147]) {
        p.cyl(m.zinc, x + 0.025, y, z + 0.051, 0.011, 0.01, 6, Math.PI / 2);
      }
    }
  }
  p.box(m.petrol, 0, 0.209, -0.264, 4.9, 0.081, 0.062);
  for (const x of [-2.42, 2.42]) {
    p.rod(m.steel, [x, 0.23, 0.26], [x, 0.23, -0.273], 0.022);
    p.rod(m.steel, [x, 0.24, -0.25], [x, 0.722, 0.255], 0.014);
  }

  const files = p.at(-1.78, 0.125, 0.02);
  files.box(m.ink, 0, 0.33, 0, 0.89, 0.66, 0.60);
  for (let i = 0; i < 3; i++) {
    const y = 0.109 + i * 0.221;
    files.box(i === 1 ? m.patina : m.petrol, 0, y, 0.309, 0.856, 0.206, 0.036);
    grip(files, m, 0, y + 0.025, 0.335, 0.18);
    files.box(m.zinc, 0.267, y + 0.028, 0.334, 0.118, 0.046, 0.014);
    files.box(m.paper, 0.267, y + 0.028, 0.344, 0.104, 0.033, 0.006);
    for (let j = 0; j < 2; j++) {
      files.box(m.plyEdge, 0.267, y + 0.023 + j * 0.011, 0.348, 0.070 - j * 0.009, 0.0017, 0.0018);
    }
  }
  caseBox(p, m, 1.72, 0, 0.063, 0.70, 0.29, 0.55, m.luggage, 0.02);
  caseBox(p, m, 1.73, 0.29, 0.032, 0.58, 0.24, 0.43, m.ochrePaint, -0.05);
  p.box(m.coal, 0.270, top + 0.005, 0.024, 1.39, 0.009, 0.638);
  for (const x of [-0.403, 0.948]) p.box(m.baseboard, x, top + 0.009, 0.024, 0.018, 0.009, 0.633);
  p.box(m.trim, 0, top + 0.043, -0.362, width - 0.04, 0.089, 0.045);
  mountRail(p, m);
  pegboard(p, m);
  deskPaper(p, m, -0.93, top, 0.174);
  equipmentRadio(p.at(-2.03, top, -0.083, -0.08), m);
  microscope(p.at(0.43, top + 0.012, -0.033, 0.15), m);
  coreRack(p.at(1.75, top, 0.043, -0.12), m);
  benchLamp(p.at(2.29, top, -0.238), m);
  mug(p, m, m.blueCase, -1.50, top + 0.002, 0.245, -0.45, 0.88);
  p.rod(m.red, [-1.30, top + 0.014, 0.274], [-1.48, top + 0.014, 0.124], 0.006, 8);
  p.rod(m.ochrePaint, [0.62, top + 0.013, 0.295], [0.774, top + 0.013, 0.301], 0.0035, 6);

  const stool = mesh.at('workshop stool', 1.10, floor, -3.23);
  contact(stool, m, 0, 0, 0.68, 0.64);
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + 0.8;
    const x = Math.cos(a);
    const z = Math.sin(a);
    stool.rod(m.steel, [x * 0.201, 0.038, z * 0.201], [x * 0.117, 0.541, z * 0.117], 0.020, 8);
    stool.cyl(m.coal, x * 0.201, 0.022, z * 0.201, 0.027, 0.043, 8);
  }
  stool.cyl(m.steel, 0, 0.248, 0, 0.117, 0.028, 12);
  stool.cyl(m.ink, 0, 0.55, 0, 0.199, 0.071, 16);
  stool.cyl(m.plyEdge, 0, 0.594, 0, 0.190, 0.037, 18, 0, 0, 0, 0.95);
  stool.cyl(m.ply, 0, 0.616, 0, 0.183, 0.017, 20);
}

function mountRail(p, m) {
  p.box(m.seam, 0, 1.216, -0.315, 5.06, 0.075, 0.027);
  p.box(m.trim, 0, 1.246, -0.309, 5.08, 0.014, 0.036);
  for (const x of [-1.97, -0.24, 1.31, 2.17]) {
    p.box(m.appliance, x, 1.216, -0.291, 0.112, 0.086, 0.045);
    for (const ox of [-0.024, 0.024]) {
      p.box(m.seam, x + ox, 1.221, -0.264, 0.011, 0.020, 0.006);
    }
  }
  p.line(m.ink, [[-2.0, 1.184, -0.265], [-1.986, 1.073, -0.24], [-2.103, 0.977, -0.194]], 0.010);
  p.line(m.black, [[2.147, 1.204, -0.258], [2.137, 1.025, -0.249], [2.257, 0.938, -0.219], [2.34, 0.939, -0.20]], 0.008);
}

function pegboard(p, m) {
  const peg = graphic('perforated plywood tool board', 512, 256, (c, w, h) => {
    c.fillStyle = '#a98964';
    c.fillRect(0, 0, w, h);
    const rng = random(441);
    for (let i = 0; i < 285; i++) {
      c.fillStyle = i % 2 ? '#d8b98c32' : '#552e181f';
      c.fillRect(rng() * w, rng() * h, rng() * 110, 0.5 + rng() * 1.7);
    }
    for (let y = 13; y < h; y += 18) {
      for (let x = 12; x < w; x += 18) {
        c.beginPath();
        c.fillStyle = '#775d4c';
        c.arc(x, y + 0.9, 2.6, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#423c34';
        c.beginPath();
        c.arc(x, y, 1.8, 0, Math.PI * 2);
        c.fill();
      }
    }
  }, { lit: true });
  p.box(m.plyEdge, -1.35, 1.726, -0.332, 1.98, 1.035, 0.075);
  p.plane(peg, -1.35, 1.726, -0.293, 1.943, 0.995);
  for (const x of [-2.34, -0.362]) p.box(m.ply, x, 1.726, -0.284, 0.030, 1.044, 0.028);
  for (const y of [1.212, 2.242]) p.box(m.ply, -1.35, y, -0.284, 2.012, 0.035, 0.028);

  const chart = fieldChart();
  p.box(m.baseboard, 1.20, 1.847, -0.336, 2.215, 1.164, 0.066);
  p.box(m.paper, 1.20, 1.847, -0.298, 2.154, 1.103, 0.014);
  p.plane(chart, 1.20, 1.847, -0.289, 2.146, 1.087);
  for (const x of [0.16, 2.24]) {
    for (const y of [1.341, 2.358]) p.cyl(m.zinc, x, y, -0.283, 0.012, 0.009, 8, Math.PI / 2);
  }
  p.box(m.trim, -0.21, 1.68, -0.307, 0.47, 0.61, 0.026, 0, 0, -0.043);
  p.plane(scheduleSheet(), -0.21, 1.68, -0.288, 0.433, 0.577, 0, 0, -0.043);

  for (const [x, y, length, tilt, handle] of [
    [-2.01, 1.85, 0.231, 0.27, m.red], [-1.81, 1.97, 0.287, -0.17, m.ochrePaint],
    [-1.64, 1.81, 0.188, -0.23, m.petrol], [-0.79, 1.94, 0.26, 0.083, m.red],
  ]) {
    const tool = p.at(x, y, -0.239);
    const dx = Math.sin(tilt);
    const dy = Math.cos(tilt);
    tool.rod(m.steel, [0, 0.053, -0.045], [0, 0.011, 0.032], 0.008);
    tool.rod(m.silver, [0, 0, 0.022], [dx * length, -dy * length, 0.022], 0.007, 8);
    tool.rod(handle, [dx * length * 0.54, -dy * length * 0.54, 0.022], [dx * length * 0.96, -dy * length * 0.96, 0.022], 0.018, 10);
  }
  p.rod(m.zinc, [-1.28, 1.98, -0.247], [-1.28, 2.036, -0.297], 0.008);
  p.rod(m.steel, [-1.28, 1.973, -0.223], [-1.18, 1.711, -0.223], 0.02);
  for (const [x, y, r] of [[-1.28, 1.972, 0.040], [-1.18, 1.709, 0.033]]) {
    p.cyl(m.zinc, x, y, -0.223, r, 0.020, 10, Math.PI / 2);
    p.cyl(m.boltDark, x, y, -0.21, r * 0.48, 0.008, 8, Math.PI / 2);
  }
  p.box(m.ink, -1.838, 1.305, -0.281, 0.70, 0.039, 0.072);
  for (let i = 0; i < 10; i++) {
    const x = -2.119 + i * 0.065;
    p.rod(m.zinc, [x, 1.289, -0.248], [x, 1.372 + i % 3 * 0.015, -0.244], 0.0054, 6);
  }
}

function deskPaper(p, m, x, top, z) {
  const base = p.at(x, top, z, -0.31);
  for (let i = 0; i < 3; i++) {
    base.box(i === 0 ? m.plyEdge : m.paper, i * 0.006, 0.006 + i * 0.005, i * 0.007,
      0.293 - i * 0.009, 0.009, 0.365 - i * 0.006, 0, i * 0.022);
  }
  base.plane(scheduleSheet(), 0.010, 0.022, 0.01, 0.270, 0.353, -Math.PI / 2);
  base.box(m.zinc, 0, 0.026, -0.153, 0.113, 0.014, 0.041);
  base.rod(m.ink, [0.106, 0.028, 0.112], [0.041, 0.028, -0.089], 0.0057, 8);
  base.rod(m.silver, [0.041, 0.028, -0.089], [0.037, 0.028, -0.101], 0.004, 8, 0.2);
}

function equipmentRadio(p, m) {
  p.box(m.ink, 0, 0.112, 0, 0.59, 0.207, 0.304);
  p.box(m.patina, 0, 0.120, 0.159, 0.566, 0.196, 0.025);
  for (const x of [-0.261, 0.261]) {
    for (const z of [-0.101, 0.108]) p.cyl(m.coal, x, 0.012, z, 0.027, 0.029, 8);
    p.box(m.ink, x, 0.119, 0.177, 0.034, 0.172, 0.032);
    p.rod(m.zinc, [x, 0.048, 0.181], [x, 0.054, 0.214], 0.010);
    p.rod(m.zinc, [x, 0.183, 0.181], [x, 0.179, 0.214], 0.010);
    p.rod(m.ink, [x, 0.054, 0.214], [x, 0.179, 0.214], 0.012);
  }
  p.box(m.ink, -0.094, 0.154, 0.174, 0.236, 0.072, 0.018);
  const radioScreen = graphic('radio frequency display', 256, 72, (c, w, h) => {
    c.fillStyle = '#33493e';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#b4d6a3';
    c.font = '32px monospace';
    c.fillText('4.318 MHz', 20, 46);
    c.font = '10px monospace';
    c.fillText('RX   FIELD NET', 21, 60);
  }, { lit: true, glow: '#6c9670' });
  p.plane(radioScreen, -0.094, 0.154, 0.1845, 0.217, 0.061);
  for (const [x, y, r] of [[0.166, 0.130, 0.049], [0.068, 0.084, 0.024], [0.074, 0.159, 0.019]]) {
    p.cyl(m.ink, x, y, 0.199, r, 0.044, 14, Math.PI / 2);
    p.cyl(m.steel, x, y, 0.227, r * 0.88, 0.01, 12, Math.PI / 2);
    p.box(m.paper, x, y + r * 0.51, 0.234, 0.0035, r * 0.47, 0.002);
  }
  for (let i = 0; i < 6; i++) {
    p.box(m.coal, -0.194 + i * 0.033, 0.070, 0.180, 0.024, 0.029, 0.015);
  }
  p.box(m.status, 0.017, 0.074, 0.187, 0.012, 0.010, 0.006);
  for (let i = 0; i < 10; i++) {
    p.box(m.roofDark, -0.21 + i * 0.042, 0.219, -0.073, 0.023, 0.003, 0.084);
  }

  p.box(m.coal, -0.043, 0.039, 0.338, 0.128, 0.069, 0.213, 0.046, 0.46, 0);
  p.box(m.patina, -0.08, 0.075, 0.301, 0.075, 0.012, 0.087, 0.046, 0.46, 0);
  for (let i = 0; i < 5; i++) p.box(m.ink, -0.087 + i * 0.0045, 0.082, 0.268 + i * 0.01, 0.067, 0.006, 0.0046, 0, 0.46);
  const cable = [];
  for (let i = 0; i <= 64; i++) {
    const t = i / 64;
    const a = t * Math.PI * 16;
    cable.push([0.106 + Math.sin(a) * 0.016 + 0.047 * Math.sin(t * Math.PI),
      0.035 + Math.cos(a) * 0.016 + 0.002 * Math.sin(t * Math.PI), 0.183 + 0.211 * t]);
  }
  p.line(m.black, [[0.102, 0.062, 0.184], ...cable, [0.01, 0.043, 0.392]], 0.0049, 6);
}

function microscope(p, m) {
  p.box(m.ink, 0, 0.030, 0, 0.412, 0.069, 0.446);
  p.box(m.appliance, 0, 0.084, 0.007, 0.394, 0.073, 0.420);
  p.box(m.patina, 0, 0.119, 0.005, 0.374, 0.021, 0.397);
  p.cyl(m.silver, 0, 0.134, 0.057, 0.080, 0.021, 14);
  p.cyl(m.warmOpal, 0, 0.149, 0.057, 0.058, 0.013, 14);
  p.box(m.appliance, 0, 0.296, -0.132, 0.136, 0.339, 0.111, -0.077);
  p.box(m.appliance, 0, 0.483, -0.099, 0.138, 0.125, 0.151, -0.57);
  p.box(m.appliance, 0, 0.550, 0.001, 0.181, 0.101, 0.204);
  p.box(m.ink, 0, 0.267, 0.033, 0.319, 0.038, 0.255);
  p.box(m.zinc, 0, 0.293, 0.059, 0.131, 0.015, 0.101);
  p.box(m.ice, 0.022, 0.309, 0.057, 0.087, 0.009, 0.054, 0, 0.09);
  for (const x of [-0.108, 0.108]) {
    p.rod(m.silver, [x, 0.292, -0.038], [x * 0.72, 0.301, 0.07], 0.006, 8);
  }

  p.cyl(m.steel, 0, 0.482, 0.064, 0.084, 0.051, 14, 0.084);
  for (const [x, z, length, band] of [[-0.049, 0.069, 0.099, m.ochrePaint], [0.036, 0.100, 0.138, m.red], [0.02, 0.023, 0.076, m.petrol]]) {
    const y = 0.466 - length / 2;
    p.cyl(m.zinc, x, y, z, 0.029, length, 12, 0.07, 0, x * 1.7, 0.91);
    p.cyl(m.ink, x, y - length / 2 + 0.011, z, 0.026, 0.026, 12, 0.07, 0, x * 1.7);
    p.cyl(band, x, y - length / 2 + 0.023, z, 0.030, 0.009, 12, 0.07);
  }
  for (const s of [-1, 1]) {
    p.cyl(m.coal, s * 0.101, 0.355, -0.085, 0.060, 0.045, 16, 0, 0, Math.PI / 2);
    p.cyl(m.zinc, s * 0.133, 0.355, -0.085, 0.039, 0.021, 14, 0, 0, Math.PI / 2);
    p.cyl(m.ink, s * 0.156, 0.355, -0.085, 0.028, 0.026, 14, 0, 0, Math.PI / 2);
    p.rod(m.ink, [s * 0.041, 0.566, 0.064], [s * 0.064, 0.707, 0.159], 0.037, 14);
    p.rod(m.steel, [s * 0.043, 0.583, 0.075], [s * 0.053, 0.622, 0.104], 0.041, 14);
    p.rod(m.coal, [s * 0.059, 0.687, 0.149], [s * 0.067, 0.726, 0.174], 0.042, 16);
    p.rod(m.darkLens, [s * 0.067, 0.724, 0.171], [s * 0.067, 0.728, 0.175], 0.031, 16);
  }
  p.box(m.status, 0.143, 0.084, 0.228, 0.021, 0.012, 0.009);
  p.box(m.ink, -0.145, 0.079, 0.229, 0.045, 0.014, 0.011);
}

function coreRack(p, m) {
  p.box(m.plyEdge, 0, 0.021, 0, 0.816, 0.040, 0.483);
  p.box(m.ply, 0, 0.049, 0, 0.801, 0.020, 0.470);
  for (const z of [-0.236, 0.236]) p.box(m.ply, 0, 0.083, z, 0.812, 0.068, 0.029);
  for (const x of [-0.393, 0.393]) p.box(m.ply, x, 0.083, 0, 0.029, 0.068, 0.455);
  for (const x of [-0.241, -0.08, 0.08, 0.241]) {
    p.box(m.plyEdge, x, 0.083, 0, 0.019, 0.056, 0.440);
  }
  const rng = random(7656);
  for (let i = 0; i < 5; i++) {
    const x = -0.32 + i * 0.16;
    const baseMaterial = [m.iceDeep, m.frost, m.ice, m.rockLight, m.ice][i];
    for (let j = 0; j < 3; j++) {
      const z = -0.139 + j * 0.118 + (rng() - 0.5) * 0.025;
      const length = 0.07 + rng() * 0.038;
      const radius = 0.038 + rng() * 0.02;
      p.cyl(baseMaterial, x + (rng() - 0.5) * 0.029, 0.062 + radius, z, radius, length, 10,
        Math.PI / 2 + (rng() - 0.5) * 0.16, 0, (rng() - 0.5) * 0.19, 0.88 + rng() * 0.26);
      p.cyl(i % 2 ? m.frost : m.iceDeep, x, 0.062 + radius, z + length * 0.27, radius * 1.013,
        0.009 + rng() * 0.011, 10, Math.PI / 2, 0, 0, 0.95);
    }
    p.box(m.paper, x, 0.081, 0.252, 0.084, 0.036, 0.003);
    for (let j = 0; j < 3; j++) p.box(m.ink, x - 0.015 + j * 0.014, 0.081, 0.255, 0.003, 0.013, 0.0015);
  }
  grip(p, m, 0, 0.048, 0.251, 0.142);
}

function benchLamp(p, m) {
  p.cyl(m.ink, 0, 0.021, 0, 0.107, 0.046, 18);
  p.cyl(m.petrol, 0, 0.048, 0, 0.099, 0.024, 18, 0, 0, 0, 0.9);
  const a = [0.0, 0.061, 0.0];
  const b = [-0.021, 0.379, 0.071];
  const c = [-0.209, 0.481, 0.213];
  p.rod(m.steel, a, b, 0.018, 10);
  p.rod(m.steel, b, c, 0.014, 10);
  p.rod(m.coal, [-0.038, 0.066, 0.028], [-0.054, 0.366, 0.096], 0.008, 8);
  p.cyl(m.petrol, b[0], b[1], b[2], 0.035, 0.047, 12, Math.PI / 2);
  p.cyl(m.zinc, b[0], b[1], b[2] + 0.023, 0.013, 0.012, 8, Math.PI / 2);
  p.box(m.petrol, c[0] - 0.091, c[1], c[2], 0.354, 0.076, 0.179, -0.20, 0.26);
  p.box(m.ink, c[0] - 0.091, c[1] - 0.039, c[2] + 0.006, 0.315, 0.026, 0.150, -0.20, 0.26);
  p.box(m.warmTube, c[0] - 0.089, c[1] - 0.057, c[2] + 0.01, 0.276, 0.012, 0.110, -0.20, 0.26);
}
