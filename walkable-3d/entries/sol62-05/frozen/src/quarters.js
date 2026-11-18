import { random, smooth } from './layout.js';
import { graphic, plate } from './textures.js';
import { caseBox, clothSurface, contact, grip, mug } from './props.js';

export function makeQuarters(mesh, m, floor) {
  makeBunks(mesh.at('bunks', 3.57, floor, -3.23, -Math.PI / 2), m);
  makeGalley(mesh.at('galley', 3.80, floor, 0.225, -Math.PI / 2), m);
  makeSettee(mesh.at('window settee', 1.72, floor, 0.965, Math.PI), m);
}

function makeBunks(p, m) {
  contact(p, m, 0, 0, 2.79, 1.42, 0.007);
  const span = 2.29;
  const depth = 0.97;
  for (const x of [-span / 2 + 0.018, span / 2 - 0.018]) {
    for (const z of [-depth / 2, depth / 2]) {
      p.box(m.petrol, x, 1.044, z, 0.056, 2.088, 0.053, 0, 0, 0, 1);
      p.box(m.coal, x, 0.025, z, 0.072, 0.05, 0.071);
      p.box(m.zinc, x, 2.072, z, 0.063, 0.049, 0.059);
      for (const y of [0.418, 1.50, 1.946]) {
        p.box(m.patina, x, y, z + 0.035, 0.080, 0.067, 0.027);
        p.cyl(m.zinc, x, y, z + 0.056, 0.013, 0.011, 6, Math.PI / 2);
      }
    }
  }
  for (let i = 0; i < 2; i++) {
    const deck = 0.431 + i * 1.10;
    p.box(m.ink, 0, deck - 0.019, 0, span, 0.061, depth);
    p.box(m.ply, 0, deck + 0.016, 0, span - 0.095, 0.023, depth - 0.088);
    for (const z of [-depth / 2, depth / 2]) p.box(m.petrol, 0, deck, z, span + 0.032, 0.087, 0.052);
    for (const x of [-span / 2, span / 2]) {
      p.box(m.petrol, x, deck, 0, 0.052, 0.086, depth);
      p.rod(m.petrol, [x, deck + 0.36, -depth / 2], [x, deck + 0.36, depth / 2], 0.019);
      p.rod(m.steel, [x, deck + 0.26, -depth / 2], [x, deck + 0.26, depth / 2], 0.012);
    }
    p.box(m.linen, 0, deck + 0.099, -0.005, 2.07, 0.143, 0.847);
    p.box(m.linen, 0, deck + 0.133, -0.002, 2.10, 0.071, 0.875);
    p.box(m.felt, 0, deck + 0.108, 0.436, 2.055, 0.008, 0.008);
    p.ball(m.linen, -0.775 + i * 0.015, deck + 0.217, -0.117 + i * 0.038, 0.250, 0.091, 0.341,
      0.038, -0.15 + i * 0.057, -0.024);
    p.ball(m.paper, -0.782 + i * 0.015, deck + 0.241, -0.108 + i * 0.04, 0.219, 0.066, 0.304, 0, -0.15);
    quilt(p.at(0.206 - i * 0.021, deck + 0.192, 0.02, i ? 0.028 : -0.032), m, i);
  }
  for (const x of [0.775, 1.092]) {
    p.rod(m.petrol, [x, 0.024, 0.505], [x, 1.804, 0.490], 0.022, 10);
    p.box(m.coal, x, 0.020, 0.503, 0.065, 0.035, 0.067);
  }
  for (let i = 0; i < 6; i++) {
    const y = 0.265 + i * 0.241;
    p.rod(m.zinc, [0.77, y, 0.504], [1.10, y, 0.504], 0.018, 10);
    p.rod(m.tread, [0.82, y, 0.504], [1.048, y, 0.504], 0.0195, 10);
  }
  p.rod(m.petrol, [-1.045, 1.888, 0.488], [0.65, 1.888, 0.488], 0.021, 10);
  p.rod(m.petrol, [-1.045, 1.802, 0.487], [0.67, 1.802, 0.487], 0.013, 8);
  p.rod(m.steel, [0.658, 1.562, 0.490], [0.647, 1.886, 0.485], 0.016, 8);
  caseBox(p, m, 0.17, 0.035, 0.001, 0.72, 0.277, 0.63, m.luggage, 0.025);
  caseBox(p, m, -0.65, 0.032, 0.002, 0.56, 0.23, 0.52, m.blueCase, -0.035);

  const bunks = plate('bunk berth tags', 'BERTHS  01 / 02', '', {
    background: '#b2b8a4', border: '#535c52', ink: '#344137', fontSize: 48,
  });
  p.plane(bunks, -0.47, 1.534, 0.515, 0.34, 0.062);
  p.box(m.ink, -0.78, 1.364, -0.477, 0.159, 0.057, 0.058);
  p.box(m.warmOpal, -0.78, 1.337, -0.454, 0.139, 0.025, 0.04);
  p.box(m.ink, -0.78, 2.33, -0.482, 0.159, 0.058, 0.05);
  p.box(m.warmOpal, -0.78, 2.303, -0.461, 0.142, 0.023, 0.040);
}

function quilt(p, m, upper) {
  const w = 1.64;
  const d = 0.925;
  const y = (x, z) => {
    const drape = smooth(0.32, 0.459, Math.abs(z)) * (z > 0 ? 0.101 : 0.065);
    const foot = smooth(w / 2 - 0.095, w / 2, x) * 0.055;
    const edge = smooth(0.32, 0.466, Math.abs(z));
    const small = 0.011 * Math.sin(x * 32 + Math.sin(z * 8));
    return 0.014 - drape - foot + 0.016 * Math.sin(x * 7.4 + z * 13) * edge
      + small + 0.012 * Math.sin(z * 46 + x * 0.62) + 0.008 * Math.sin(x * 9 + z * 4);
  };
  clothSurface(p, upper ? m.quilt : m.plaid, w, d, y, 46, 30);
  for (let i = 0; i < 7; i++) {
    const x = -0.72 + i * 0.221;
    const points = [];
    for (let j = 0; j <= 14; j++) {
      const z = -0.44 + j / 14 * 0.88;
      points.push([x, y(x, z) + 0.0038, z]);
    }
    p.line(upper ? m.quiltSeam : m.mustard, points, i % 3 ? 0.0021 : 0.0038, 5);
  }
  for (const zz of [-0.45, 0.45]) {
    const points = [];
    for (let j = 0; j <= 28; j++) {
      const x = -0.81 + j / 28 * 1.62;
      points.push([x, y(x, zz) + 0.0035, zz]);
    }
    p.line(upper ? m.quiltSeam : m.mustard, points, 0.0043, 6);
  }
}

function makeGalley(p, m) {
  const width = 2.10;
  contact(p, m, 0, 0.02, 2.31, 1.02);
  p.box(m.ink, 0, 0.389, 0.006, width - 0.025, 0.778, 0.586, 0, 0, 0, 1);
  p.box(m.appliance, -0.005, 0.477, 0.002, width, 0.601, 0.613);
  for (const x of [-1.034, 1.024]) p.box(m.appliance, x, 0.820, 0.004, 0.032, 0.108, 0.611);
  p.box(m.appliance, 0.005, 0.820, -0.285, width - 0.06, 0.108, 0.043);
  p.box(m.tread, 0, 0.064, 0.31, width, 0.103, 0.034);
  p.box(m.ink, 0, 0.845, 0.317, width, 0.029, 0.029);
  for (let i = 0; i < 4; i++) {
    const x = (i - 1.5) * 0.51;
    p.box(i === 2 ? m.patina : m.appliance, x, 0.656, 0.320, 0.50, 0.32, 0.038);
    p.box(i === 1 ? m.panelAlt : m.appliance, x, 0.350, 0.320, 0.50, 0.277, 0.038);
    for (const y of [0.447, 0.767]) grip(p, m, x, y, 0.34, 0.145, m.steel);
  }

  const counter = 0.903;
  const sink = -0.572;
  p.box(m.plyEdge, 0.408, counter - 0.023, 0, 1.274, 0.050, 0.647, 0, 0, 0, 1);
  p.box(m.ply, 0.408, counter + 0.008, 0, 1.274, 0.019, 0.656);
  for (const x of [-1.005, -0.164]) p.box(m.ply, x, counter - 0.018, 0, 0.12, 0.056, 0.647);
  for (const z of [-0.27, 0.285]) p.box(m.ply, sink, counter - 0.018, z, 0.725, 0.056, 0.115);
  p.box(m.pewter, sink, counter - 0.104, 0.012, 0.708, 0.021, 0.419);
  for (const x of [-0.955, -0.184]) {
    p.box(m.silver, x, counter + 0.01, 0.01, 0.075, 0.023, 0.493);
    p.box(m.pewter, x + Math.sign(sink - x) * 0.025, counter - 0.039, 0.011, 0.027, 0.103, 0.488);
  }
  for (const z of [-0.227, 0.248]) {
    p.box(m.silver, sink, counter + 0.010, z, 0.769, 0.021, 0.051);
    p.box(m.steel, sink, counter - 0.034, z, 0.715, 0.113, 0.016);
  }
  p.cyl(m.steel, sink + 0.031, counter - 0.091, 0.023, 0.048, 0.012, 16);
  p.cyl(m.black, sink + 0.031, counter - 0.084, 0.023, 0.033, 0.004, 16);
  p.cyl(m.zinc, sink, counter + 0.034, -0.272, 0.046, 0.043, 12);
  const faucet = [];
  for (let i = 0; i <= 13; i++) {
    const t = i / 13;
    faucet.push([sink, counter + 0.062 + Math.sin(t * Math.PI * 0.89) * 0.234, -0.269 + t ** 2 * 0.25]);
  }
  p.line(m.silver, faucet, 0.016, 10);
  p.cyl(m.pewter, sink, faucet.at(-1)[1] - 0.012, faucet.at(-1)[2], 0.020, 0.027, 10);
  p.rod(m.zinc, [sink + 0.039, counter + 0.073, -0.268], [sink + 0.098, counter + 0.087, -0.278], 0.008);

  p.box(m.black, 0.432, counter + 0.017, 0.006, 0.528, 0.026, 0.498);
  p.box(m.pewter, 0.432, counter + 0.033, 0.004, 0.509, 0.010, 0.482);
  p.cyl(m.ink, 0.44, counter + 0.048, -0.046, 0.164, 0.026, 22);
  for (const radius of [0.072, 0.108, 0.147]) {
    const wire = [];
    for (let i = 0; i <= 26; i++) {
      const a = Math.PI * 2 * i / 26;
      wire.push([0.44 + Math.cos(a) * radius, counter + 0.064, -0.046 + Math.sin(a) * radius]);
    }
    p.line(m.steel, wire, 0.005, 6);
  }
  p.cyl(m.black, 0.59, counter + 0.043, 0.200, 0.028, 0.012, 12);
  p.cyl(m.warning, 0.52, counter + 0.040, 0.204, 0.009, 0.005, 8);
  kettle(p.at(0.43, counter + 0.065, -0.036, 0.77), m);
  mug(p, m, m.red, 0.844, counter + 0.02, 0.045, -0.15, 0.91);
  p.box(m.ply, 0.85, counter + 0.033, -0.17, 0.288, 0.022, 0.209, 0, 0.05);
  p.rod(m.silver, [0.98, counter + 0.049, -0.153], [0.82, counter + 0.052, -0.177], 0.006, 8);

  const cabinet = p.at(0.352, 1.991, -0.196);
  cabinet.box(m.appliance, 0, 0.238, 0, 1.30, 0.468, 0.329);
  cabinet.box(m.ink, 0, 0.466, 0, 1.32, 0.033, 0.33);
  for (const x of [-0.325, 0.325]) {
    cabinet.box(m.panel, x, 0.242, 0.178, 0.638, 0.426, 0.039);
    cabinet.box(m.trim, x, 0.245, 0.199, 0.609, 0.376, 0.006);
    grip(cabinet, m, x, 0.11, 0.213, 0.148);
  }
  cabinet.box(m.ink, 0, -0.020, 0.086, 0.704, 0.055, 0.157);
  cabinet.box(m.warmTube, 0, -0.053, 0.099, 0.613, 0.016, 0.073);
  p.plane(plate('drinking water label', 'POTABLE', 'MELT / BOIL / STORE', {
    background: '#a9b5a2', ink: '#334b48', border: '#66827a',
  }), -0.57, 1.22, -0.326, 0.43, 0.131);

  const towel = p.at(-1.008, 0.760, 0.366);
  towel.rod(m.steel, [-0.139, 0, 0], [0.144, 0, 0], 0.012);
  for (let i = 0; i < 13; i++) {
    const x = (i - 6) * 0.017;
    const length = 0.42 + Math.cos(i * 0.43) * 0.031;
    towel.box(i % 5 === 1 ? m.linen : m.mustard, x, -length / 2 + 0.016,
      0.023 + 0.011 * Math.sin(i * 1.65), 0.021, length, 0.013, 0.037, i % 3 * 0.11);
  }
}

function kettle(p, m) {
  p.cyl(m.ink, 0, 0.019, 0, 0.111, 0.029, 18);
  p.cyl(m.petrol, 0, 0.083, 0, 0.111, 0.101, 20, 0, 0, 0, 0.87);
  p.cyl(m.petrol, 0, 0.148, 0, 0.096, 0.031, 18, 0, 0, 0, 0.81);
  p.cyl(m.steel, 0, 0.17, 0, 0.066, 0.020, 18, 0, 0, 0, 0.76);
  p.cyl(m.ink, 0, 0.198, 0, 0.027, 0.035, 12, 0, 0, 0, 0.80);
  p.rod(m.petrol, [0, 0.068, 0.078], [0, 0.119, 0.151], 0.035, 12, 0.81);
  p.rod(m.petrol, [0, 0.118, 0.146], [0, 0.173, 0.18], 0.028, 12, 0.63);
  p.rod(m.zinc, [0, 0.166, 0.175], [0, 0.179, 0.183], 0.021, 12);
  p.rod(m.ink, [0, 0.176, 0.182], [0, 0.181, 0.184], 0.017, 10);
  const handle = [];
  for (let i = 0; i <= 14; i++) {
    const a = Math.PI * i / 14;
    handle.push([Math.cos(a) * 0.108, 0.13 + Math.sin(a) * 0.135, -0.021]);
  }
  p.line(m.coal, handle, 0.0135, 10);
}

function makeSettee(p, m) {
  contact(p, m, 0, 0.01, 2.63, 1.08);
  for (const x of [-1.08, 0, 1.08]) {
    for (const z of [-0.255, 0.26]) {
      p.box(m.petrol, x, 0.197, z, 0.055, 0.391, 0.060);
      p.box(m.coal, x, 0.019, z, 0.071, 0.035, 0.078);
    }
  }
  p.box(m.petrol, 0, 0.385, 0, 2.40, 0.066, 0.645);
  p.box(m.ply, 0, 0.423, 0.005, 2.40, 0.035, 0.674, 0, 0, 0, 1);
  for (const x of [-0.69, -0.003]) {
    p.box(m.felt, x, 0.480, -0.002, 0.674, 0.088, 0.577);
    p.ball(m.quilt, x, 0.504, -0.017, 0.348, 0.072, 0.301);
    p.box(m.felt, x, 0.677, -0.265, 0.681, 0.387, 0.103, -0.10);
    p.ball(m.quilt, x, 0.680, -0.209, 0.322, 0.179, 0.065, -0.13);
    for (const ox of [-0.214, 0.0, 0.214]) {
      p.rod(m.quiltSeam, [x + ox, 0.514, 0.259], [x + ox, 0.539, 0.206], 0.0038, 6);
    }
  }
  p.ball(m.mustard, -0.863, 0.666, -0.095, 0.216, 0.167, 0.102, -0.23, -0.09, -0.33);
  p.ball(m.plaid, -0.876, 0.67, -0.062, 0.188, 0.139, 0.078, -0.24, 0, -0.3);
  const table = p.at(0.81, 0.453, 0.019);
  table.box(m.plyEdge, 0, 0.022, 0, 0.71, 0.045, 0.613);
  table.box(m.ply, 0, 0.048, 0, 0.692, 0.013, 0.603);
  table.box(m.plaid, -0.03, 0.061, 0.027, 0.319, 0.018, 0.23, 0, 0.15);
  table.box(m.paper, -0.03, 0.073, 0.027, 0.303, 0.019, 0.207, 0, 0.15);
  table.box(m.petrol, -0.03, 0.087, 0.029, 0.321, 0.011, 0.233, 0, 0.15);
  table.at(-0.03, 0.094, 0.029, 0.15).plane(plate('field handbook', 'LARK', 'FIELD NOTES', {
    background: '#49706d', border: '#aca890', ink: '#e3d3ad', fontSize: 58,
  }), 0, 0, 0, 0.296, 0.194, -Math.PI / 2);
  mug(table, m, m.red, 0.226, 0.054, -0.12, -0.72, 0.89);
  caseBox(p, m, 0.505, 0.021, -0.022, 0.46, 0.254, 0.47, m.luggage, 0.12);
}
