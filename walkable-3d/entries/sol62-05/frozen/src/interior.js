import * as THREE from '../vendor/three.module.js';
import { hut, random } from './layout.js';
import { caseBox, contact, grip } from './props.js';
import { makeQuarters } from './quarters.js';
import { graphic, plate, scheduleSheet } from './textures.js';
import { makeWorkshop } from './workshop.js';

export function makeInterior(scene, mesh, m) {
  makeWorkshop(mesh, m, hut.floor);
  makeQuarters(mesh, m, hut.floor);
  makeStorage(mesh, m);
  makeEntry(mesh, m);
  makeFixtures(scene, mesh, m);
}

function makeStorage(mesh, m) {
  const floor = hut.floor;
  const rack = mesh.at('supply shelves', -3.806, floor, -2.14, Math.PI / 2);
  contact(rack, m, 0, 0.02, 2.55, 1.13);
  const w = 2.28;
  const d = 0.60;
  for (const x of [-w / 2 + 0.031, 0.025, w / 2 - 0.031]) {
    for (const z of [-d / 2 + 0.02, d / 2 - 0.02]) {
      rack.box(m.petrol, x, 1.151, z, 0.044, 2.302, 0.044, 0, 0, 0, 1);
      rack.box(m.coal, x, 0.017, z, 0.062, 0.034, 0.071);
      for (let j = 0; j < 23; j++) {
        rack.box(m.ink, x, 0.123 + j * 0.092, z + 0.024, 0.008, 0.016, 0.0035);
      }
    }
  }
  for (const y of [0.14, 0.681, 1.25, 1.801, 2.264]) {
    rack.box(m.ply, 0, y - 0.022, 0.008, w - 0.045, 0.041, d - 0.044);
    rack.box(m.patina, 0, y - 0.035, 0.293, w + 0.003, 0.067, 0.033);
    rack.box(m.petrol, 0, y - 0.061, -0.273, w, 0.073, 0.036);
    for (const x of [-1.046, -0.041, 0.093, 1.046]) {
      rack.cyl(m.zinc, x, y - 0.036, 0.313, 0.010, 0.008, 6, Math.PI / 2);
    }
  }
  for (const x of [-0.57, 0.60]) {
    rack.rod(m.steel, [x - 0.51, 0.204, -0.279], [x + 0.50, 2.235, -0.279], 0.012, 8);
    rack.rod(m.steel, [x + 0.51, 0.204, -0.279], [x - 0.50, 2.235, -0.279], 0.012, 8);
  }
  const gravel = caseBox(rack, m, -0.63, 0.144, 0.017, 0.844, 0.435, 0.52, m.blueCase);
  labelCase(gravel, m, 'CORE CASE', 'WEST LINE / 08–12', 0.32, 0.222, 0.269, '#456976');
  caseBox(rack, m, 0.345, 0.144, 0.028, 0.528, 0.384, 0.51, m.luggage, 0.014);
  const spare = caseBox(rack, m, 0.837, 0.144, 0.023, 0.382, 0.354, 0.47, m.roofLight, -0.03);
  labelCase(spare, m, '12 V', 'SPARES', 0.22, 0.174, 0.246, '#49555c');
  const tool = caseBox(rack, m, 0.527, 0.682, 0.010, 0.788, 0.327, 0.49, m.ochrePaint, 0.026);
  labelCase(tool, m, 'TOOLS', 'DRY AFTER USE', 0.30, 0.161, 0.254, '#82612e');
  const firstAid = caseBox(rack, m, 0.746, 1.25, 0.026, 0.50, 0.357, 0.35, m.red, -0.043);
  firstAid.box(m.paper, -0.002, 0.178, 0.182, 0.105, 0.029, 0.009);
  firstAid.box(m.paper, -0.002, 0.178, 0.184, 0.030, 0.111, 0.010);
  rack.box(m.ink, -0.58, 0.744, 0.006, 0.84, 0.103, 0.465);
  const rng = random(2058);
  for (let i = 0; i < 8; i++) {
    const x = -0.92 + i * 0.097;
    const h = 0.132 + rng() * 0.050;
    rack.cyl(i % 3 === 1 ? m.frost : m.iceDeep, x, 0.781 + h / 2, 0.017, 0.038, h, 12);
    rack.cyl(m.zinc, x, 0.784 + h, 0.017, 0.044, 0.032, 10);
    rack.box(m.paper, x, 0.815, 0.056, 0.045, 0.025, 0.003, 0, 0.019);
    rack.box(m.plyEdge, x, 0.814, 0.058, 0.021, 0.005, 0.002);
  }
  for (let i = 0; i < 5; i++) {
    const x = -0.884 + i * 0.112;
    const yy = 1.262 + i * 0.024;
    rack.box(i === 2 ? m.plaid : m.canvas, x, yy + 0.041, -0.028, 0.156, 0.090, 0.368, 0.03, i * 0.048, i * 0.075);
    rack.box(m.mustard, x, yy + 0.029, 0.158, 0.066, 0.020, 0.024, 0, 0, i * 0.08);
  }
  for (const [x, y, r, h, color] of [[0.35, 1.805, 0.105, 0.276, m.linen],
    [0.62, 1.805, 0.092, 0.291, m.petrol], [0.88, 1.805, 0.074, 0.204, m.appliance]]) {
    rack.cyl(color, x, y + h / 2, 0.035, r, h, 12, 0, 0, 0, 0.98);
    rack.cyl(m.coal, x, y + h + 0.017, 0.035, r + 0.004, 0.040, 12);
    rack.box(m.paper, x, y + h * 0.55, 0.035 + r, r * 1.09, 0.062, 0.004);
  }
  for (let i = 0; i < 5; i++) {
    const angle = i === 4 ? -0.17 : 0.01 * (i - 2);
    const x = -1.02 + i * 0.103;
    rack.box([m.petrol, m.plaid, m.mustard, m.blueCase][i % 4], x,
      1.99, 0.033, 0.089, 0.361, 0.31, 0, 0, angle);
    rack.box(m.paper, x, 2.06, 0.190, 0.052, 0.083, 0.007, 0, 0, angle);
  }

  const power = mesh.at('power cabinet', -3.804, floor, -4.04, Math.PI / 2);
  caseBox(power, m, 0, 0.036, 0.014, 0.942, 0.539, 0.654, m.petrol);
  caseBox(power, m, 0.044, 0.585, -0.013, 0.727, 0.445, 0.574, m.appliance);
  const panel = power.at(0.050, 0.831, 0.28);
  panel.box(m.ink, 0, 0, 0, 0.536, 0.225, 0.027);
  panel.box(m.zinc, -0.157, 0.019, 0.017, 0.154, 0.125, 0.013);
  panel.box(m.paper, -0.157, 0.019, 0.025, 0.122, 0.091, 0.009);
  for (let i = 0; i < 7; i++) {
    const a = -1.04 + i * 0.346;
    panel.rod(m.ink, [-0.157 + 0.039 * Math.sin(a), 0.001 + 0.039 * Math.cos(a), 0.032],
      [-0.157 + 0.047 * Math.sin(a), 0.001 + 0.047 * Math.cos(a), 0.032], 0.0016, 4);
  }
  panel.rod(m.red, [-0.157, -0.006, 0.033], [-0.178, 0.038, 0.033], 0.0018, 5);
  panel.cyl(m.coal, 0.053, 0.02, 0.028, 0.035, 0.032, 12, Math.PI / 2);
  panel.cyl(m.status, 0.162, 0.033, 0.026, 0.011, 0.012, 10, Math.PI / 2);
  panel.cyl(m.warning, 0.196, 0.033, 0.026, 0.010, 0.012, 10, Math.PI / 2);
  panel.plane(plate('battery panel label', 'DC BUS', '', {
    background: '#87938b', border: '#536462', ink: '#243b35',
  }), 0.148, -0.037, 0.016, 0.167, 0.043);
  power.line(m.black, [[-0.35, 1.051, 0.05], [-0.39, 1.092, -0.01], [-0.43, 1.104, -0.19], [-0.454, 1.221, -0.27],
    [-0.455, 1.497, -0.267], [-0.455, 2.572, -0.29]], 0.014);
  power.line(m.red, [[-0.31, 1.05, 0.04], [-0.36, 1.09, -0.03], [-0.416, 1.10, -0.18],
    [-0.432, 1.21, -0.264], [-0.428, 2.57, -0.286]], 0.011);
  for (const y of [1.36, 1.67, 2.33]) {
    power.box(m.zinc, -0.438, y, -0.27, 0.079, 0.026, 0.029);
  }

  const heater = mesh.at('wall heater', -2.81, floor, -4.478);
  heater.box(m.ink, 0, 0.48, 0.035, 1.18, 0.467, 0.175);
  heater.box(m.appliance, 0, 0.49, 0.138, 1.128, 0.413, 0.055);
  for (let i = 0; i < 7; i++) {
    const y = 0.365 + i * 0.042;
    heater.box(m.black, 0, y, 0.167, 0.932, 0.016, 0.007);
    heater.box(m.trim, 0, y - 0.006, 0.175, 0.919, 0.009, 0.017, 0.4);
  }
  heater.cyl(m.zinc, 0.485, 0.602, 0.169, 0.024, 0.028, 12, Math.PI / 2);
  heater.cyl(m.warning, 0.484, 0.501, 0.167, 0.008, 0.006, 8, Math.PI / 2);
  heater.rod(m.steel, [-0.43, 0.69, -0.026], [-0.43, 2.728, -0.025], 0.045, 14);
  for (const y of [0.874, 1.68, 2.49]) heater.cyl(m.zinc, -0.43, y, -0.025, 0.061, 0.045, 12);

  const spareCase = mesh.at('front reserve case', -2.985, floor, 0.849, -0.08);
  contact(spareCase, m, 0, 0, 0.94, 1.02);
  caseBox(spareCase, m, 0, 0.015, 0, 0.63, 0.412, 0.783, m.blueCase, 0.04);
  caseBox(spareCase, m, 0.027, 0.427, 0.058, 0.52, 0.260, 0.415, m.luggage, -0.19);
  spareCase.box(m.canvas, -0.023, 0.715, 0.050, 0.431, 0.094, 0.305, 0, -0.15);
}

function labelCase(p, m, text, detail, w, y, z, bg) {
  p.box(m.ink, 0.023, y, z, w + 0.017, 0.116, 0.009);
  p.plane(plate(text + ' label', text, detail, { background: bg, border: '#bfbc9d', ink: '#efead3' }),
    0.023, y, z + 0.006, w, 0.107);
}

function makeEntry(mesh, m) {
  const floor = hut.floor;
  const p = mesh.at('vestibule fittings', hut.doorX, floor, 0);
  contact(p, m, 0, 2.87, 1.16, 1.38, 0.008);
  p.box(m.coal, 0, 0.011, 2.75, 1.254, 0.022, 1.30);
  p.box(m.baseboard, 0, 0.026, 2.76, 1.220, 0.010, 1.263);
  p.box(m.tread, 0, 0.031, 2.76, 1.171, 0.010, 1.198);
  for (let i = 0; i < 15; i++) {
    p.box(m.coal, 0, 0.036, 2.23 + i * 0.075, 1.139, 0.007, 0.016);
  }
  const rng = random(52060);
  for (let i = 0; i < 110; i++) {
    const x = (rng() - 0.5) * 1.06;
    const z = 2.34 + rng() * 1.30;
    const leftBehind = rng() * 0.8 + (z - 2.75) * 0.6 + Math.abs(x) * 0.4;
    if (leftBehind < 0.56) continue;
    p.box(rng() < 0.40 ? m.frost : m.snowDirty, x, 0.036 + rng() * 0.005, z,
      0.006 + rng() ** 2 * 0.042, 0.0015 + rng() * 0.002, 0.006 + rng() * 0.025, 0, rng() * 5.0);
  }

  const coat = mesh.at('drying hooks', -2.926, floor, 2.59, Math.PI / 2);
  coat.box(m.ink, 0, 0.28, 0.049, 1.43, 0.37, 0.221);
  coat.box(m.steel, 0, 0.478, 0.049, 1.426, 0.048, 0.268);
  coat.box(m.coal, 0.01, 0.51, 0.054, 1.371, 0.024, 0.254);
  for (const x of [-0.695, 0.67]) {
    coat.box(m.zinc, x, 0.361, 0.043, 0.032, 0.229, 0.27);
    for (const y of [0.301, 0.449]) coat.cyl(m.silver, x, y, 0.188, 0.010, 0.009, 8, Math.PI / 2);
  }
  coat.box(m.ply, 0, 1.98, -0.026, 1.43, 0.183, 0.067);
  for (const x of [-0.62, -0.31, -0.018, 0.278, 0.597]) {
    coat.cyl(m.zinc, x, 1.985, 0.013, 0.026, 0.013, 8, Math.PI / 2);
    coat.line(m.steel, [[x, 1.965, 0.014], [x, 1.925, 0.061], [x, 1.953, 0.100], [x, 2.027, 0.088]], 0.009, 7);
  }
  parka(coat.at(0.228, 1.915, 0.07, -0.16), m, m.red, m.oxide, 1);
  parka(coat.at(-0.463, 1.889, 0.03, 0.13), m, m.quilt, m.petrol, 0.90);
  boot(coat.at(-0.25, 0.498, 0.043, -0.14), m);
  boot(coat.at(-0.045, 0.498, 0.041, 0.14), m);
  coat.box(m.canvas, 0.471, 0.545, 0.06, 0.205, 0.069, 0.20, 0, 0.3);
  const mitt = coat.at(0.607, 1.954, 0.074);
  mitt.line(m.black, [[0, 0.066, -0.009], [0, 0.009, 0.068], [-0.09, -0.244, 0.073], [0.057, -0.278, 0.07]], 0.005);
  for (const [x, y, tilt] of [[-0.095, -0.272, -0.2], [0.059, -0.328, 0.16]]) {
    mitt.ball(m.felt, x, y, 0.074, 0.045, 0.086, 0.031, 0.021, 0, tilt);
    mitt.ball(m.felt, x + 0.034, y + 0.011, 0.076, 0.019, 0.045, 0.022, 0.06, 0, -0.42);
    mitt.box(m.canvas, x, y + 0.075, 0.074, 0.079, 0.044, 0.055, 0, 0, tilt);
  }

  const right = mesh.at('entry wall fittings', -1.122, floor, 2.98, -Math.PI / 2);
  right.box(m.plyEdge, 0.281, 1.007, 0.018, 0.40, 0.505, 0.024, 0, 0, -0.068);
  right.plane(scheduleSheet(), 0.281, 1.007, 0.033, 0.365, 0.474, 0, 0, -0.068);
  right.box(m.zinc, 0.294, 1.244, 0.049, 0.106, 0.028, 0.014, 0, 0, -0.068);
  right.box(m.appliance, -0.319, 0.815, 0.014, 0.184, 0.202, 0.065);
  right.box(m.ink, -0.317, 0.819, 0.052, 0.096, 0.107, 0.013);
  right.box(m.zinc, -0.314, 0.815, 0.061, 0.037, 0.071, 0.010, 0.082);
  right.box(m.status, -0.32, 0.915, 0.05, 0.012, 0.009, 0.008);
  right.box(m.trim, -0.319, 1.069, 0.012, 0.042, 0.307, 0.036);
  right.box(m.trim, -0.319, 0.539, 0.010, 0.039, 0.345, 0.037);

  const towardDoor = mesh.at('entry notices', hut.doorX, floor, hut.front - 0.142, Math.PI);
  const notice = plate('vestibule return sign', 'TO SNOWFIELD', 'LEAVE BOOTS ON THE TRAY', {
    background: '#425752', border: '#9ba99a', ink: '#f3e4bd', fontSize: 38,
  });
  towardDoor.box(m.ink, 0, 2.29, 0.013, 0.841, 0.259, 0.025);
  towardDoor.plane(notice, 0, 2.29, 0.027, 0.818, 0.234);
  const arrows = graphic('reflective floor arrows', 256, 96, (c, w, h) => {
    c.fillStyle = '#403c35';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#bd9a54';
    for (let i = 0; i < 6; i++) {
      const x = i * 52 - 46;
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(x + 24, 0);
      c.lineTo(x + 103, h);
      c.lineTo(x + 78, h);
      c.closePath();
      c.fill();
    }
  }, { lit: true });
  p.plane(arrows, 0, 0.007, 1.639, 1.095, 0.076, -Math.PI / 2);
}

function parka(p, m, shell, shadow, s) {
  p.ball(shell, 0, -0.30 * s, 0.018, 0.245 * s, 0.351 * s, 0.102 * s, 0.045, 0, -0.045);
  p.box(shell, -0.012, -0.466 * s, 0.025, 0.410 * s, 0.320 * s, 0.165 * s, 0.059, 0, -0.049);
  p.ball(shadow, 0.018, -0.013 * s, 0.012, 0.147 * s, 0.139 * s, 0.094 * s, 0.042, 0.025, 0.085);
  p.ball(m.felt, 0.024, -0.026 * s, 0.074, 0.112 * s, 0.106 * s, 0.04 * s, 0, 0, 0.12);
  p.ball(shadow, 0.016, -0.034 * s, 0.071, 0.087 * s, 0.077 * s, 0.051 * s, 0, 0, 0.10);
  for (const side of [-1, 1]) {
    p.ball(shell, side * 0.194 * s, -0.185 * s, 0.028, 0.112 * s, 0.147 * s, 0.081 * s, 0.08, 0, side * 0.27);
    const x = side * (side === -1 ? 0.251 : 0.265) * s;
    p.rod(shell, [side * 0.191 * s, -0.145 * s, 0.02], [x, -0.430 * s, 0.065], 0.094 * s, 11, 0.74);
    p.rod(shell, [x, -0.410 * s, 0.067], [x - side * 0.018, -0.627 * s, 0.080], 0.073 * s, 11, 0.67);
    p.rod(m.felt, [x - side * 0.018, -0.612 * s, 0.079], [x - side * 0.018, -0.647 * s, 0.083], 0.052 * s, 10, 0.92);
    p.box(shadow, side * 0.124 * s, -0.449 * s, 0.115, 0.113 * s, 0.104 * s, 0.021, 0, 0, side * 0.16);
    p.box(m.quiltSeam, side * 0.123 * s, -0.398 * s, 0.131, 0.112 * s, 0.007, 0.003, 0, 0, side * 0.16);
  }
  p.rod(m.black, [0.008, -0.118 * s, 0.108], [-0.014, -0.605 * s, 0.116], 0.0057, 6);
  p.box(m.zinc, 0.004, -0.185 * s, 0.119, 0.011, 0.029, 0.008, 0, 0, 0.1);
  p.rod(shadow, [-0.186 * s, -0.595 * s, 0.100], [0.185 * s, -0.607 * s, 0.097], 0.012, 8);
}

function boot(p, m) {
  p.box(m.ink, 0, 0.026, 0.048, 0.131, 0.052, 0.254);
  p.ball(m.black, 0, 0.066, 0.105, 0.068, 0.058, 0.111);
  p.cyl(m.roofDark, 0, 0.122, -0.026, 0.065, 0.178, 12, -0.095, 0, 0, 1.10);
  p.cyl(m.felt, 0, 0.222, -0.030, 0.071, 0.040, 12, -0.095);
  p.cyl(m.coal, 0, 0.244, -0.031, 0.057, 0.004, 12);
  for (let i = 0; i < 4; i++) {
    const y = 0.091 + i * 0.025;
    p.rod(m.mustard, [-0.033, y, 0.04 + (3 - i) * 0.015], [0.033, y + 0.013, 0.046 + (3 - i) * 0.019], 0.0036, 5);
  }
}

function makeFixtures(scene, mesh, m) {
  const p = mesh.at('practical light fixtures');
  const lab = [-0.53, 2.903, -2.62];
  const living = [1.65, 2.903, -0.23];
  const entry = [hut.doorX, 2.637, 2.632];
  for (const [x, y, z, w, small] of [[...lab, 2.12, false], [...living, 1.42, false], [...entry, 0.685, true]]) {
    const mount = small ? hut.vestibuleCeiling : hut.ceiling;
    for (const d of [-1, 1]) {
      p.box(m.trim, x + d * w * 0.35, mount - 0.006, z, 0.198, 0.034, 0.223);
      p.rod(m.steel, [x + d * w * 0.35, y + 0.012, z], [x + d * w * 0.35, mount - 0.01, z], 0.013, 8);
    }
    p.box(m.ink, x, y + 0.066, z, w + 0.059, 0.101, 0.218);
    p.box(m.zinc, x, y + 0.013, z, w, 0.040, 0.205);
    p.box(m.warmTube, x, y - 0.012, z, w - 0.126, 0.040, 0.147);
    for (const d of [-1, 1]) {
      p.box(m.steel, x + d * (w / 2 - 0.017), y - 0.001, z, 0.035, 0.053, 0.211);
      p.rod(m.steel, [x - w * 0.43, y - 0.045, z + d * 0.091],
        [x + w * 0.43, y - 0.045, z + d * 0.091], 0.0041, 6);
    }
    for (let i = 0; i < Math.ceil(w * 5); i++) {
      const xx = x + (i / Math.ceil(w * 5) - 0.5) * w + 0.045;
      p.rod(m.zinc, [xx, y - 0.017, z - 0.101], [xx, y - 0.043, z - 0.074], 0.0061, 6);
      p.rod(m.zinc, [xx, y - 0.043, z - 0.074], [xx, y - 0.043, z + 0.074], 0.0061, 6);
      p.rod(m.zinc, [xx, y - 0.043, z + 0.074], [xx, y - 0.017, z + 0.101], 0.0061, 6);
    }
  }
  p.line(m.steel, [[-3.97, 3.04, -2.62], [-1.25, 3.04, -2.62], [-1.25, 2.962, -2.62]], 0.010);
  p.line(m.steel, [[3.98, 3.039, -0.23], [2.16, 3.039, -0.23], [2.16, 2.966, -0.23]], 0.010);
  for (const [x, z] of [[-3.42, -2.62], [-2.40, -2.62], [3.33, -0.23], [2.68, -0.23]]) {
    p.box(m.trim, x, 3.055, z, 0.039, 0.043, 0.049);
  }

  spot(scene, '#ffd6a6', 22, 7.1, 1.17, 0.55, [-0.60, 2.82, -2.64], [-0.24, 0.43, -2.09]);
  spot(scene, '#ffe0b7', 16, 6.2, 1.18, 0.56, [1.64, 2.81, -0.23], [1.73, 0.40, -0.43]);
  spot(scene, '#ffb984', 8.4, 3.85, 1.08, 0.62, [hut.doorX, 2.565, 2.605], [hut.doorX + 0.11, 0.40, 2.58]);
  spot(scene, '#ffc68c', 2.2, 2.46, 0.85, 0.78, [2.43, 1.719, -4.22], [2.35, 1.30, -4.12]);
  spot(scene, '#ffb87b', 24, 6.5, 0.81, 0.69, [hut.doorX, 2.616, 3.916], [hut.doorX + 0.08, 0.29, 4.92]);
  spot(scene, '#ffbf84', 5.4, 4.55, 0.67, 0.93, [2.17, 1.78, 1.677], [2.23, 0.03, 4.36]);

  const fill = new THREE.PointLight('#ffd0a0', 2.25, 3.9, 2);
  fill.name = 'Bounce near the laboratory wall';
  fill.position.set(0.20, 1.73, -3.13);
  scene.add(fill);
}

function spot(scene, color, intensity, range, angle, penumbra, position, target) {
  const light = new THREE.SpotLight(color, intensity, range, angle, penumbra, 2);
  light.position.fromArray(position);
  light.target.position.fromArray(target);
  scene.add(light, light.target);
}
