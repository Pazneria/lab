import * as THREE from './vendor/three.module.min.js';
import { Draft, frameAt, polar, random, tau, tint } from './geometry.js';
import { blocks } from './layout.js';

function tableFrame(block) {
  const cos = Math.cos(block.angle);
  const sin = Math.sin(block.angle);
  return {
    at: (x, y, z) => [block.x + cos * x + sin * z, y, block.z - sin * x + cos * z],
    turn: (x, y = 0, z = 0) => new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y + block.angle, z, 'YXZ')),
  };
}

function draftingTable(build, m, art) {
  const { at, turn } = tableFrame(blocks[0]);
  const wood = (x, y, z, w, h, d, tone, angle = 0) =>
    build.box(m.wood, at(x, y, z), [w, h, d], { turn: turn(0, angle), tint: tone, uvOffset: [x + 2, y + 1] });
  wood(0, 0.758, 0, 1.45, 0.113, 0.56, 0xddb997);
  for (const z of [-0.22, 0, 0.22]) wood(0, 0.836, z, 1.55, 0.059, 0.212, z === 0 ? 0xe4c5a5 : 0xc7af8e);
  for (const x of [-0.56, 0.56]) {
    for (const z of [-0.23, 0.23]) {
      wood(x, 0.362, z, 0.091, 0.74, 0.093, 0xd8b491);
      wood(x, 0.048, z, 0.112, 0.092, 0.117, 0x9b846b);
    }
    wood(x, 0.309, 0, 0.075, 0.063, 0.46, 0xa89173);
  }
  wood(0, 0.302, -0.146, 1.15, 0.071, 0.08, 0xc0a483);
  for (const x of [-0.59, 0.59]) {
    for (const z of [-0.331, 0.331]) {
      build.rock(m.bronze, at(x, 0.79, z), [0.018, 0.018, 0.008], { tint: 0xc9b28d });
    }
  }
  const chartTurn = turn(-Math.PI / 2, -0.045, -0.09);
  build.box(m.paper, at(0.032, 0.875, 0.007), [0.79, 0.020, 0.488], {
    turn: turn(0, -0.09), tint: 0xf2e3b3,
  });
  build.plane(art.chart, at(0.032, 0.886, 0.007), 0.785, 0.48, { turn: chartTurn });
  const scrollA = at(-0.504, 0.896, -0.22);
  const scrollB = at(-0.479, 0.898, 0.237);
  build.bar(m.paper, scrollA, scrollB, 0.039, { segments: 13, tint: 0xf2dbb1 });
  build.bar(m.wood, at(-0.507, 0.897, -0.246), at(-0.477, 0.898, 0.259), 0.014,
    { segments: 13, tint: 0xbeac89 });
  build.bar(m.bronze, at(-0.491, 0.898, 0.003), at(-0.489, 0.898, 0.025), 0.042, { segments: 13 });
  build.bar(m.darkMetal, at(0.28, 0.902, 0.145), at(0.48, 0.904, 0.205), 0.009, { segments: 8 });
  build.bar(m.brass, at(0.31, 0.902, 0.143), at(0.52, 0.904, 0.09), 0.010, { segments: 8 });
  build.rock(m.brass, at(0.301, 0.902, 0.147), [0.021, 0.018, 0.023]);

  const lamp = at(0.57, 0.866, -0.126);
  build.lathe(m.bronze, lamp, [
    [0, 0], [0.107, 0], [0.113, 0.024], [0.108, 0.041], [0.083, 0.059], [0.072, 0.10],
    [0.055, 0.133], [0.064, 0.147], [0.071, 0.161], [0.068, 0.173],
  ], { tint: 0xd7bf8b, segments: 30 });
  build.cylinder(m.patina, at(0.57, 1.080, -0.126), 0.073, 0.059, 0.102,
    { tint: 0x92a28b, segments: 30 });
  build.cylinder(m.bronze, at(0.57, 1.137, -0.126), 0.059, 0.077, 0.030,
    { tint: 0xdbbd82, segments: 30 });
  for (let i = 0; i < 6; i += 1) {
    const a = i * tau / 6;
    const x = Math.sin(a) * 0.068;
    const z = Math.cos(a) * 0.068;
    build.bar(m.darkMetal, at(0.57 + x, 1.026, -0.126 + z), at(0.57 + x, 1.133, -0.126 + z), 0.006);
  }
}

function storage(build, m) {
  const { at, turn } = tableFrame(blocks[1]);
  const box = (material, x, y, z, w, h, d, tone) =>
    build.box(material, at(x, y, z), [w, h, d], { turn: turn(0), tint: tone, uvOffset: [x, z] });
  for (const x of [-0.49, 0.49]) {
    box(m.stone, x, 0.247, 0, 0.199, 0.49, 0.401, 0xd5c5a3);
    box(m.stone, x, 0.042, 0, 0.25, 0.084, 0.465, 0xc2ad8c);
  }
  box(m.stone, 0, 0.517, 0, 1.30, 0.106, 0.477, 0xe5d3b4);
  box(m.wood, 0.31, 0.704, 0.017, 0.51, 0.282, 0.338, 0xc8ad90);
  box(m.wood, 0.31, 0.864, 0.017, 0.538, 0.044, 0.359, 0xe0bd9c);
  for (const x of [0.122, 0.50]) {
    box(m.bronze, x, 0.717, 0.19, 0.047, 0.299, 0.016, 0xc6a982);
    box(m.bronze, x, 0.883, 0.017, 0.047, 0.012, 0.366, 0xd0b48a);
  }
  box(m.brass, 0.31, 0.790, 0.198, 0.063, 0.075, 0.018, 0xe9c899);
  build.ring(m.bronze, at(0.31, 0.737, 0.203), 0.026, 0.006, { turn: turn(0), segments: 19 });
  for (const [x, y, z, w, d, tilt] of [[-0.30, 0.602, 0.03, 0.33, 0.24, 0.05],
    [-0.31, 0.652, 0.02, 0.30, 0.22, -0.13], [-0.283, 0.696, -0.014, 0.24, 0.18, 0.14]]) {
    build.box(m.paper, at(x, y, z), [w, 0.039, d], { turn: turn(0, tilt), tint: 0xe3ce9d });
    build.box(m.tile, at(x, y + 0.019, z), [w + 0.019, 0.010, d + 0.012],
      { turn: turn(0, tilt), tint: y > 0.67 ? 0x42766e : 0x5d837e });
  }
}

function sconces(build, m) {
  for (const [x, z, side] of [[-1.358, 6.20, 1], [1.358, 9.76, -1]]) {
    build.box(m.darkMetal, [x - side * 0.067, 2.278, z], [0.058, 0.27, 0.122], { tint: 0xb1a489 });
    build.bar(m.bronze, [x - side * 0.064, 2.233, z], [x + side * 0.095, 2.233, z], 0.019,
      { tint: 0xbfa579 });
    build.cylinder(m.bronze, [x + side * 0.084, 2.246, z], 0.082, 0.051, 0.051,
      { segments: 21, tint: 0xc4a77b });
    build.cylinder(m.paper, [x + side * 0.084, 2.329, z], 0.061, 0.05, 0.138,
      { segments: 18, tint: 0xb0936c });
    build.cylinder(m.bronze, [x + side * 0.084, 2.413, z], 0.049, 0.087, 0.053,
      { segments: 21, tint: 0xd4b18a });
    for (let i = 0; i < 4; i += 1) {
      const a = (i + 0.5) * tau / 4;
      const dx = Math.sin(a) * 0.066;
      const dz = Math.cos(a) * 0.066;
      build.bar(m.darkMetal, [x + side * 0.084 + dx, 2.255, z + dz], [x + side * 0.084 + dx, 2.406, z + dz],
        0.007, { tint: 0xe0c9a6 });
    }
  }
}

function weathering(build, m) {
  const rng = random(489);
  const scatter = (x, z, y, w, d, angle, stones = 0, tone = 0xffffff) => {
    build.plane(m.sandDrift, [x, y + 0.006, z], w, d, {
      rotation: [-Math.PI / 2, 0, angle], tint: tone,
    });
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    for (let i = 0; i < stones; i += 1) {
      const lx = (rng() - 0.5) * w * 0.65;
      const lz = (rng() - 0.5) * d * 0.54;
      const size = 0.009 + rng() ** 2 * 0.026;
      build.rock(m.stone, [x + cos * lx + sin * lz, y + size * 0.21, z - sin * lx + cos * lz],
        [size * 1.20, size * 0.54, size * 0.82], { rotation: [0, rng() * tau, 0], cast: false,
          tint: [0xd3c0a0, 0xe2c48e, 0xa9987d, 0xe7cba2][i % 4] });
    }
  };

  build.section('Weathering / shaded floor deposits');
  for (const [angle, width] of [[0.55, 0.82], [0.76, 1.21], [2.13, 1.17], [2.43, 0.86],
    [2.78, 0.68], [3.48, 1.4], [3.66, 0.89], [4.46, 1.02], [5.13, 0.78], [5.90, 0.80]]) {
    const [x, , z] = polar(angle, 4.34, 0);
    scatter(x, z, 0.007, width, 0.24 + rng() * 0.18, -angle, 8, 0xc2ad8d);
  }
  for (const [side, z, width] of [[1, 5.53, 0.80], [-1, 6.08, 0.90], [1, 6.91, 1.24],
    [-1, 8.35, 1.22], [1, 9.77, 1.22], [-1, 10.43, 0.95]]) {
    scatter(side * (1.31 + rng() * 0.052), z, 0.005, width, 0.40, Math.PI / 2, 10, 0xd0bd97);
  }
  scatter(-0.82, 10.86, 0.011, 1.10, 0.28, -0.42, 8, 0xcab287);
  scatter(0.56, 11.28, -0.16, 1.09, 0.26, 0.29, 7, 0xd8c19b);
  scatter(-1.52, 11.71, -0.33, 0.82, 0.19, 0.05, 8, 0xddcba5);
  for (const side of [-1, 1]) {
    scatter(side * 2.06, 12.35, -0.674, 1.67, 0.54, side * 0.13, 15);
    scatter(side * 3.84, 13.54, -0.675, 1.84, 0.47, Math.PI / 2 + side * 0.22, 12);
    scatter(side * 3.95, 14.43, -0.675, 1.30, 0.40, Math.PI / 2, 11);
  }
  scatter(2.59, 14.72, -0.675, 2.20, 0.58, 0.07, 12);
  scatter(-1.68, 14.87, -0.675, 2.60, 0.50, 0.14, 15);

  build.section('Weathering / terrace wind shadows');
  for (const [x, z, w, depth, angle] of [
    [5.70, 2.83, 1.12, 0.52, 0.61], [6.47, 3.06, 1.46, 0.40, 0.03], [7.82, 3.107, 1.32, 0.38, 0],
    [9.77, 3.062, 1.56, 0.43, -0.05], [10.80, 2.97, 1.02, 0.34, -0.13],
    [11.19, 1.63, 1.39, 0.24, Math.PI / 2], [11.24, -1.50, 1.25, 0.28, Math.PI / 2],
    [10.88, -2.71, 1.36, 0.44, -0.64], [9.77, -3.05, 1.71, 0.39, 0.03],
    [7.55, -2.98, 1.78, 0.37, 0.07], [6.43, -3.015, 1.83, 0.42, 0.03],
  ]) scatter(x, z, 0.010, w, depth, angle, 11);
  scatter(5.99, -0.96, 0.006, 1.29, 0.36, -0.17, 7, 0xd0bd98);
}

function plasterRepairs(build, m) {
  build.section('Weathering / plaster repairs');
  const draft = new Draft();
  const rng = random(944);
  const cracks = [
    [0.50, 1.18, 0.090, 0.64], [-0.44, 0.30, 0.18, 0.26],
    [1.94, 0.52, 0.079, 0.79], [2.25, 0.46, 0.132, 0.22],
    [2.69, 2.42, 0.081, 0.36], [3.33, 0.42, 0.16, 0.25],
    [4.16, 0.37, 0.11, 0.19], [4.96, 0.96, 0.135, 0.71], [5.52, 0.31, 0.113, 0.29],
  ];
  for (const [angle, y, width, height] of cracks) {
    const segments = 9;
    const r = 5.283;
    const middle = polar(angle, r, y);
    const low = tint(0xe4ceb1, 0.98 + rng() * 0.13);
    const high = tint(0xffecd2, 0.98);
    const edge = [];
    for (let i = 0; i < segments; i += 1) {
      const a = i * tau / segments;
      const irregular = 0.61 + rng() * 0.43;
      edge.push(polar(angle + Math.cos(a) * width / r * irregular, r,
        y + Math.sin(a) * height * irregular * 0.5));
    }
    for (let i = 0; i < segments; i += 1) {
      const a = edge[i];
      const b = edge[(i + 1) % segments];
      draft.tri(middle, a, b, { uv: [[angle, y], [a[0], a[1]], [b[0], b[1]]], color: [low, high, high] });
    }
  }
  build.add(draft.finish(), m.plaster, { cast: false });
}

function approachEdging(build, m) {
  build.section('Approach / low stone curb');
  for (const side of [-1, 1]) {
    for (let i = 0; i < 5; i += 1) {
      build.box(m.stone, [side * 4.273, -0.665, 12.64 + i * 0.523], [0.212, 0.224, 0.508], {
        tint: [0xead4b2, 0xd4b594, 0xe4ccaa][i % 3],
      });
    }
  }
  for (let i = 0; i < 8; i += 1) {
    const x = (i - 3.5) * 1.063;
    if (Math.abs(x) < 1.23) continue;
    build.box(m.stone, [x, -0.678, 15.054], [1.046, 0.206, 0.19], {
      tint: [0xe7d3b3, 0xe3ccae, 0xd9c0a2][i % 3],
    });
  }
}

export function makeDetails(build, m, art) {
  build.section('Instrument chamber / chart table and instrument case');
  draftingTable(build, m, art);
  storage(build, m);
  build.section('Entrance passage / sconces');
  sconces(build, m);
  approachEdging(build, m);
  plasterRepairs(build, m);
  weathering(build, m);
}
