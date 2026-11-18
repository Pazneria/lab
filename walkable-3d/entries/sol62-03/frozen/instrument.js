import * as THREE from './vendor/three.module.min.js';
import { Draft, band, frameAt, mix, polar, tau } from './geometry.js';
import { blocks, roofSlot } from './layout.js';

const azimuth = roofSlot.angle;
const altitude = 0.51;
const cradleY = 1.995;
const yAxis = new THREE.Vector3(0, 1, 0);
const zAxis = new THREE.Vector3(0, 0, 1);
const axle = new THREE.Vector3(Math.cos(azimuth), 0, -Math.sin(azimuth));
const scopeAxis = new THREE.Vector3(Math.sin(azimuth) * Math.cos(altitude),
  Math.sin(altitude), Math.cos(azimuth) * Math.cos(altitude));
const scopeTurn = new THREE.Quaternion().setFromUnitVectors(yAxis, scopeAxis);
const axleTurn = new THREE.Quaternion().setFromUnitVectors(yAxis, axle);
const axleFace = new THREE.Quaternion().setFromUnitVectors(zAxis, axle);
const tintBrass = 0xe7ca91;
const tintBronze = 0xd4b784;
const across = (x, y, z = 0) => frameAt(azimuth, z, x, y);

function sight(x, along, z) {
  return new THREE.Vector3(x, along, z).applyQuaternion(scopeTurn).add(new THREE.Vector3(0, cradleY, 0)).toArray();
}

function gear(teeth, bore, root, tip, depth) {
  const sketch = new Draft();
  const layers = [root, tip, tip, root];
  const division = [0, 0.22, 0.70, 0.93];
  const count = teeth * division.length;
  const position = (i, inner, upper) => {
    const a = (Math.floor(i / division.length) + division[i % division.length]) * tau / teeth;
    return polar(a, inner ? bore : layers[i % layers.length], (upper ? 1 : -1) * depth / 2);
  };
  for (let i = 0; i < count; i += 1) {
    const a = position(i, true, true);
    const b = position(i, false, true);
    const c = position(i + 1, false, true);
    const d = position(i + 1, true, true);
    const e = position(i, true, false);
    const f = position(i, false, false);
    const g = position(i + 1, false, false);
    const h = position(i + 1, true, false);
    sketch.quad(a, b, c, d);
    sketch.quad(h, g, f, e);
    sketch.quad(f, g, c, b);
    sketch.quad(h, e, a, d);
  }
  return sketch.finish();
}

function pedestal(build, m, art) {
  build.lathe(m.stone, [0, 0, 0], [
    [0.00, 0.008], [0.91, 0.008], [0.945, 0.032], [0.945, 0.097],
    [0.911, 0.128], [0.863, 0.141], [0.840, 0.180], [0.824, 0.368],
    [0.860, 0.388], [0.883, 0.406], [0.883, 0.445], [0.850, 0.475], [0.00, 0.475],
  ], { tint: 0xe3cfaf, segments: 96, uvScale: [5.2, 0.81] });
  build.add(band(0.841, 0.854, 0, tau, 0.159, 0.173, 82), m.bronze, { tint: 0xac9677 });
  for (let i = 0; i < 32; i += 1) {
    const start = i * tau / 32 + 0.008;
    const end = (i + 1) * tau / 32 - 0.008;
    build.add(band(0.825, 0.852, start, end, 0.181, 0.263, 3), m.tile, {
      tint: [0x437d7a, 0x66958d, 0x8ba49a, 0x3d6e6c, 0xbdb493][i % 5],
    });
  }
  build.cylinder(m.darkMetal, [0, 0.490, 0], 0.744, 0.752, 0.041, { segments: 70 });
  build.cylinder(m.bronze, [0, 0.529, 0], 0.729, 0.740, 0.049, { tint: tintBronze, segments: 72 });
  build.add(gear(72, 0.535, 0.638, 0.660, 0.046), m.bronze, {
    at: [0, 0.582, 0], tint: 0xc4a471, uvScale: [0.31, 0.36],
  });
  build.cylinder(m.darkMetal, [0, 0.592, 0], 0.548, 0.558, 0.092, { tint: 0x9fa08b, segments: 64 });
  build.cylinder(m.bronze, [0, 0.649, 0], 0.538, 0.558, 0.044, { tint: 0xd5b582, segments: 64 });
  build.add(band(0.666, 0.722, 0, tau, 0.547, 0.558, 100), m.patina, { tint: 0xd2ccb1 });
  for (let i = 0; i < 96; i += 1) {
    const a = i * tau / 96;
    const major = i % 8 === 0;
    const size = major ? 0.049 : i % 4 === 0 ? 0.039 : 0.025;
    build.box(major ? m.brass : m.bronze, polar(a, 0.717 - size / 2, 0.561),
      [major ? 0.008 : 0.004, 0.006, size], { rotation: [0, a, 0], tint: 0xe6cd9b, cast: false });
    if (major) {
      build.cylinder(m.brass, polar(a, 0.496, 0.685), 0.022, 0.024, 0.021,
        { segments: 6, tint: 0xd7be8d });
      build.box(m.darkMetal, polar(a, 0.496, 0.697), [0.024, 0.004, 0.005],
        { rotation: [0, a * 1.43, 0], cast: false });
    }
  }
  const index = new Draft();
  index.tri([0, 0.568, 0.742], [0.027, 0.568, 0.642], [-0.027, 0.568, 0.642]);
  build.add(index.finish(), m.brass, { cast: false });

  build.lathe(m.patina, [0, 0, 0], [
    [0.00, 0.664], [0.456, 0.664], [0.466, 0.690], [0.463, 0.744], [0.399, 0.777],
    [0.361, 0.842], [0.304, 0.986], [0.303, 1.088], [0.343, 1.125], [0.381, 1.157],
    [0.381, 1.196], [0.350, 1.218], [0, 1.218],
  ], { tint: 0xcac5a2, segments: 70, uvScale: [4.2, 1.4] });
  for (const [y, r, h] of [[0.712, 0.467, 0.027], [0.794, 0.387, 0.018], [1.094, 0.327, 0.019], [1.170, 0.386, 0.029]]) {
    build.add(band(r - 0.018, r, 0, tau, y, y + h, 64), m.bronze, { tint: tintBronze });
  }
  for (let i = 0; i < 8; i += 1) {
    const a = i * tau / 8;
    build.bar(m.bronze, polar(a, 0.398, 0.787), polar(a, 0.317, 1.116), 0.027,
      { tint: 0xb2aa84, segments: 7 });
  }
  build.box(m.darkMetal, [0, 0.339, 0.842], [0.367, 0.144, 0.035], { tint: 0xd3b991 });
  build.plane(art.maker, [0, 0.339, 0.862], 0.345, 0.129);
  for (const x of [-0.163, 0.163]) {
    build.rock(m.brass, [x, 0.341, 0.865], [0.009, 0.009, 0.008]);
  }

  const stud = [0.45, 0.637, 0.497];
  const az = 0.735;
  const tangent = [Math.cos(az), 0, -Math.sin(az)];
  const worm = p => [stud[0] + p * tangent[0], stud[1], stud[2] + p * tangent[2]];
  build.bar(m.darkMetal, worm(-0.195), worm(0.27), 0.045, { segments: 17 });
  for (let i = 0; i < 9; i += 1) {
    const center = worm(-0.11 + i * 0.023);
    build.ring(m.brass, center, 0.045, 0.009, { segments: 18, rotation: [0, Math.PI / 2 + az, 0] });
  }
  build.bar(m.bronze, worm(0.19), worm(0.337), 0.052, { tint: tintBrass, segments: 24 });
  build.ring(m.brass, worm(0.35), 0.103, 0.018, { segments: 29, rotation: [0, Math.PI / 2 + az, 0] });
  const wc = worm(0.35);
  for (let i = 0; i < 4; i += 1) {
    const a = i * tau / 4;
    build.bar(m.bronze, wc, [wc[0] + Math.sin(az) * Math.cos(a) * 0.1,
      wc[1] + Math.sin(a) * 0.1, wc[2] + Math.cos(az) * Math.cos(a) * 0.1], 0.013, { tint: tintBronze });
  }
}

function yokeArms(build, m) {
  const outline = [
    [0.205, 1.17], [0.525, 1.14], [0.675, 1.235], [0.762, 1.399],
    [0.755, 1.786], [0.701, 1.967], [0.631, 2.079], [0.496, 2.108],
    [0.434, 2.017], [0.464, 1.899], [0.489, 1.686], [0.436, 1.474],
    [0.314, 1.317], [0.205, 1.282],
  ];
  const flourish = [
    [0.353, 1.252], [0.529, 1.226], [0.623, 1.329], [0.679, 1.516],
    [0.667, 1.796], [0.616, 1.93], [0.543, 1.868], [0.578, 1.680],
    [0.528, 1.458], [0.446, 1.327],
  ];
  for (const side of [-1, 1]) {
    for (const [profile, material, depth, bevel, forward, color] of [
      [outline, m.patina, 0.242, 0.032, -0.121, 0xc5c0a2],
      [flourish, m.bronze, 0.018, 0.011, 0.136, 0xcfb58c],
      [flourish, m.bronze, 0.015, 0.010, -0.151, 0xbda67d],
    ]) {
      const shape = new THREE.Shape(profile.map(([x, y]) => new THREE.Vector2(x * side, y)));
      const geom = new THREE.ExtrudeGeometry(shape, {
        depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, steps: 1,
      });
      build.add(geom, material, { at: across(0, 0, forward), rotation: [0, azimuth, 0], tint: color });
    }
    for (const z of [-0.172, 0.174]) {
      for (const [x, y] of [[0.366, 1.265], [0.597, 1.42], [0.637, 1.752]]) {
        build.rock(m.brass, across(x * side, y, z), [0.025, 0.025, 0.018], { tint: 0xd6c490 });
      }
    }
  }
  build.bar(m.darkMetal, across(-0.80, cradleY), across(0.81, cradleY), 0.123, { segments: 26, tint: 0xd6ceb6 });
  build.bar(m.bronze, across(-0.45, cradleY), across(0.45, cradleY), 0.173, { segments: 26, tint: 0xbda47b });
  for (const side of [-1, 1]) {
    const center = x => across(x * side, cradleY);
    build.cylinder(m.bronze, center(0.646), 0.183, 0.183, 0.209, { turn: axleTurn, segments: 38, tint: tintBronze });
    build.cylinder(m.patina, center(0.756), 0.149, 0.149, 0.094, { turn: axleTurn, segments: 32, tint: 0xc6bfa1 });
    build.ring(m.brass, center(0.807), 0.126, 0.013, { turn: axleFace, segments: 32, tint: tintBrass });
    build.cylinder(m.brass, center(0.825), 0.060, 0.060, 0.043, { turn: axleTurn, segments: 12, tint: 0xe0c897 });
    for (let i = 0; i < 8; i += 1) {
      const angle = i * tau / 8;
      build.cylinder(m.bronze, across(side * 0.805, cradleY + Math.cos(angle) * 0.108, Math.sin(angle) * 0.108),
        0.015, 0.016, 0.03, { turn: axleTurn, segments: 6, tint: 0xdcc69d });
    }
  }
}

function altitudeControls(build, m) {
  const center = across(0.797, cradleY);
  build.add(gear(56, 0.218, 0.339, 0.371, 0.057), m.bronze, {
    at: center, turn: axleTurn, tint: 0xd3b17d, uvScale: [0.38, 0.38],
  });
  build.cylinder(m.patina, across(0.814, cradleY), 0.277, 0.277, 0.036,
    { turn: axleTurn, segments: 58, tint: 0xbdbba3 });
  for (const [r, width] of [[0.312, 0.007], [0.239, 0.008]]) {
    build.ring(m.brass, across(0.832, cradleY), r, width, { turn: axleFace, segments: 72, tint: 0xd4c094 });
  }
  for (let i = 0; i < 72; i += 1) {
    const a = i * tau / 72;
    const isMajor = i % 6 === 0;
    const marker = r => across(0.836, cradleY + Math.sin(a) * r, Math.cos(a) * r);
    build.bar(m.brass, marker(isMajor ? 0.258 : 0.282), marker(0.308), isMajor ? 0.006 : 0.003,
      { tint: isMajor ? 0xeee0b2 : 0xc5a971, segments: 5, cast: false });
  }

  const hubY = 1.619;
  const hubZ = -0.138;
  build.bar(m.bronze, across(0.66, hubY + 0.1, hubZ), across(1.022, hubY, hubZ), 0.055, { segments: 18 });
  build.add(gear(18, 0.026, 0.088, 0.104, 0.033), m.brass, {
    at: across(0.820, hubY, hubZ), turn: axleTurn, tint: 0xd0ab77,
  });
  const hand = across(1.04, hubY, hubZ);
  build.ring(m.bronze, hand, 0.154, 0.026, { turn: axleFace, segments: 37, tint: 0xd9be91 });
  build.ring(m.brass, across(1.059, hubY, hubZ), 0.156, 0.010, { turn: axleFace, segments: 37, tint: 0xc4aa78 });
  build.cylinder(m.brass, hand, 0.041, 0.040, 0.053, { turn: axleTurn, segments: 19, tint: tintBrass });
  for (let i = 0; i < 5; i += 1) {
    const a = i * tau / 5;
    build.bar(m.bronze, hand, across(1.04, hubY + Math.sin(a) * 0.155, hubZ + Math.cos(a) * 0.155),
      0.016, { tint: 0xd6b585, segments: 7 });
  }
  build.bar(m.darkMetal, across(1.033, hubY + 0.147, hubZ - 0.042), across(1.198, hubY + 0.147, hubZ - 0.042),
    0.017, { segments: 10 });
  build.bar(m.wood, across(1.097, hubY + 0.147, hubZ - 0.042), across(1.221, hubY + 0.147, hubZ - 0.042),
    0.034, { tint: 0xe7d2ad, segments: 16 });

  build.cylinder(m.bronze, across(-0.791, cradleY), 0.268, 0.268, 0.057,
    { turn: axleTurn, segments: 59, tint: tintBronze });
  build.cylinder(m.patina, across(-0.825, cradleY), 0.239, 0.239, 0.023,
    { turn: axleTurn, segments: 59, tint: 0x9caf9d });
  build.ring(m.brass, across(-0.843, cradleY), 0.206, 0.018, { turn: axleFace, segments: 55, tint: tintBrass });
  for (let i = 0; i < 12; i += 1) {
    const angle = i * tau / 12;
    const y = cradleY + Math.cos(angle) * 0.221;
    const z = Math.sin(angle) * 0.221;
    build.cylinder(m.brass, across(-0.848, y, z), 0.013, 0.015, 0.023,
      { turn: axleTurn, segments: 6, tint: 0xdbbd88 });
  }
  build.bar(m.bronze, across(-0.841, cradleY), across(-0.868, cradleY + 0.291, 0.20), 0.033,
    { tint: tintBronze });
  build.bar(m.wood, across(-0.865, cradleY + 0.29, 0.20), across(-0.866, cradleY + 0.38, 0.26),
    0.043, { tint: 0xdac29b, segments: 17 });
}

function optics(build, m) {
  const turn = scopeTurn;
  const at = sight(0, 0, 0);
  build.lathe(m.patina, at, [
    [0.133, -0.93], [0.153, -0.91], [0.166, -0.76], [0.200, -0.692], [0.218, -0.515],
    [0.229, -0.14], [0.243, 0.115], [0.253, 0.439], [0.282, 0.705],
    [0.306, 0.796], [0.309, 0.866],
  ], { turn, tint: 0xc5c6a9, segments: 64, uvScale: [3.6, 2.1] });
  for (const [a, radius, width, material, tone] of [
    [-0.771, 0.176, 0.046, m.bronze, 0xd4b284],
    [-0.683, 0.207, 0.053, m.brass, 0xd8bb87],
    [-0.437, 0.239, 0.058, m.bronze, 0xd5b381],
    [-0.095, 0.263, 0.113, m.darkMetal, 0xbeb69d],
    [0.098, 0.272, 0.111, m.darkMetal, 0xc4bda6],
    [0.198, 0.260, 0.035, m.bronze, 0xdabc92],
    [0.434, 0.267, 0.046, m.bronze, 0xe0c094],
    [0.614, 0.292, 0.060, m.brass, 0xe0be8c],
    [0.706, 0.307, 0.086, m.bronze, 0xcbb18b],
  ]) {
    const profile = [[radius - 0.019, a - width / 2], [radius - 0.007, a - width / 2],
      [radius, a - width / 2 + 0.013], [radius, a + width / 2 - 0.010],
      [radius - 0.008, a + width / 2], [radius - 0.020, a + width / 2]];
    build.lathe(material, at, profile, { turn, segments: 54, tint: tone });
  }
  build.lathe(m.bronze, at, [
    [0.279, 0.721], [0.313, 0.730], [0.344, 0.785], [0.351, 0.861], [0.353, 1.095],
    [0.369, 1.115], [0.371, 1.167], [0.358, 1.192], [0.326, 1.190], [0.316, 1.166],
    [0.319, 0.967], [0.298, 0.910], [0.279, 0.905],
  ], { turn, segments: 72, tint: 0xe2c08b, uvScale: [3.2, 1.0] });
  build.lathe(m.darkMetal, at, [[0.316, 0.935], [0.321, 1.164], [0.310, 1.163], [0.303, 0.954]],
    { turn, segments: 66, tint: 0xab9f86 });
  build.lathe(m.black, at, [[0.301, 1.164], [0.315, 1.165], [0.316, 1.148], [0.310, 0.950], [0.293, 0.950]],
    { turn, segments: 66 });
  const lens = [[0, 0.966], [0.298, 0.966], [0.293, 0.987], [0.266, 1.000],
    [0.191, 1.016], [0.101, 1.025], [0.005, 1.030], [0, 1.030]];
  build.lathe(m.glass, at, lens, { turn, segments: 62, cast: false });
  const reflection = new Draft();
  for (const z of [-0.096, -0.071]) {
    reflection.quad(sight(-0.147, 1.036, z), sight(-0.134, 1.037, z + 0.010),
      sight(0.061, 1.036, z + 0.064), sight(0.048, 1.037, z + 0.052));
  }
  build.add(reflection.finish(), m.glare, { cast: false, receive: false });
  for (let i = 0; i < 32; i += 1) {
    const a = i * tau / 32;
    const along = i % 8 === 0 ? 1.173 : 1.159;
    build.rock(i % 8 === 0 ? m.darkMetal : m.brass, sight(Math.sin(a) * 0.356, along, Math.cos(a) * 0.356),
      i % 8 === 0 ? [0.018, 0.011, 0.019] : [0.008, 0.009, 0.008], { tint: 0xbfac82, cast: false });
  }

  build.lathe(m.darkMetal, at, [[0.079, -1.36], [0.108, -1.36], [0.117, -1.322],
    [0.112, -1.27], [0.088, -1.245], [0.085, -1.129], [0.109, -1.073], [0.120, -0.930],
    [0.153, -0.923], [0.151, -0.883]], { turn, segments: 51, tint: 0xc2c0a4 });
  build.lathe(m.black, at, [[0, -1.322], [0.071, -1.322], [0.079, -1.361], [0.105, -1.361]],
    { turn, segments: 49 });
  build.cylinder(m.glass, sight(0, -1.327, 0), 0.054, 0.057, 0.017, { turn, segments: 36, cast: false });
  for (const [a, r, width] of [[-1.236, 0.091, 0.035], [-1.172, 0.098, 0.053], [-1.038, 0.119, 0.032], [-0.924, 0.149, 0.032]]) {
    build.cylinder(m.bronze, sight(0, a, 0), r, r, width, { turn, segments: 44, open: true, tint: 0xe0bd87 });
    for (let i = 0; i < 26; i += 1) {
      const a0 = i * tau / 26;
      build.bar(m.brass, sight(Math.sin(a0) * r, a - width * 0.40, Math.cos(a0) * r),
        sight(Math.sin(a0) * r, a + width * 0.40, Math.cos(a0) * r), 0.0045,
        { segments: 5, tint: 0xc5b085, cast: false });
    }
  }
  build.bar(m.darkMetal, sight(-0.098, -1.061, 0.039), sight(-0.212, -1.061, 0.043), 0.024, { segments: 13 });
  build.bar(m.brass, sight(-0.206, -1.061, 0.043), sight(-0.257, -1.061, 0.043), 0.051, { segments: 20, tint: tintBrass });

  const finder = [0.227, 0.265];
  const mount = (x, y, z) => sight(x + finder[0], y, z + finder[1]);
  for (const a of [-0.12, 0.384]) {
    build.bar(m.darkMetal, sight(0.127, a, 0.152), mount(0, a, 0), 0.052, { segments: 10, tint: 0xc9bc9f });
    build.cylinder(m.brass, mount(0, a, 0), 0.071, 0.071, 0.054, { turn, segments: 36, tint: tintBrass });
  }
  build.cylinder(m.patina, mount(0, 0.185, 0), 0.063, 0.057, 0.790,
    { turn, segments: 34, tint: 0xd4c9a9 });
  build.cylinder(m.bronze, mount(0, 0.568, 0), 0.085, 0.075, 0.154,
    { turn, segments: 36, tint: tintBronze });
  build.cylinder(m.darkMetal, mount(0, 0.649, 0), 0.084, 0.085, 0.028, { turn, segments: 38, tint: 0xa7a68e });
  build.cylinder(m.glass, mount(0, 0.665, 0), 0.060, 0.060, 0.012, { turn, segments: 33, cast: false });
  build.cylinder(m.bronze, mount(0, -0.229, 0), 0.052, 0.069, 0.112, { turn, segments: 35, tint: tintBronze });
  build.cylinder(m.black, mount(0, -0.290, 0), 0.050, 0.056, 0.030, { turn, segments: 33 });
  for (const z of [-0.189, 0.174]) {
    build.bar(m.brass, sight(0.071, -0.532, z), sight(0.158, 0.502, z), 0.011, { tint: 0xc9af76, segments: 9 });
  }
}

export function makeInstrument(build, m, art) {
  build.section('Transit telescope / mineral and metal pedestal');
  pedestal(build, m, art);
  build.section('Transit telescope / yoke and mechanical controls');
  yokeArms(build, m);
  altitudeControls(build, m);
  build.section('Transit telescope / optics and finder');
  optics(build, m);
}
