import * as T from './vendor/three.module.min.js';
import { atlasUV, Batch } from './geom.js';
import {
  between, clamp, mix, pick, seeded, smooth, terrainHeight, trailDistance, trackCenter,
  CROSSING as crossing, PLATFORM as p, STATION as station
} from './layout.js';

const radians = Math.PI * 2;
const warmLeaves = [
  ['#f3b64d', '#cd8d32', '#e2a849', '#b68235', '#edc66a', '#dba43e'],
  ['#d87b3b', '#e89948', '#ba6033', '#cf7438', '#d99a51', '#bd7739'],
  ['#ce5e33', '#b75537', '#d57e43', '#964c38', '#d09a57', '#b5663d'],
  ['#b8a74f', '#ada45a', '#90823d', '#c5a554', '#c7a674', '#807a47'],
  ['#edc76e', '#e1b655', '#c39e4d', '#cfab5d', '#b5a14c', '#e8cb84']
];
const floorLeaves = ['#d78d44', '#c68b3d', '#bd763f', '#eaae53', '#bc8d4e', '#c4894f',
  '#b46e39', '#99723b', '#eaad65', '#8a603a', '#d39b50', '#d7843c'];
const bladePalette = ['#b5a160', '#a18d56', '#75653d', '#979353', '#807c49', '#bda266'];
const uvPatches = [0, 1, 2, 3].map(i => atlasUV(i));

export function terrainMesh(m) {
  const material = m.forest.clone();
  material.onBeforeCompile = shader => {
    shader.uniforms.trailMap = { value: m.path.map };
    shader.uniforms.mossMap = { value: m.moss.map };
    shader.vertexShader = 'attribute vec2 blend; varying vec2 vGroundBlend;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>',
      '#include <begin_vertex>\nvGroundBlend = blend;');
    shader.fragmentShader = 'uniform sampler2D trailMap; uniform sampler2D mossMap; varying vec2 vGroundBlend;\n' +
      shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `
      #ifdef USE_MAP
        vec4 forest = texture2D(map, vMapUv);
        vec4 path = texture2D(trailMap, vMapUv);
        vec4 moss = texture2D(mossMap, vMapUv * 1.31);
        float edge = clamp(vGroundBlend.x + (forest.r - 0.10) * 0.40 * sin(vGroundBlend.x * 3.14159), 0., 1.);
        diffuseColor *= mix(mix(forest, moss, vGroundBlend.y), path, edge);
      #endif
    `);
  };

  const cols = 182, rows = 170;
  const xyz = [], uv = [], color = [], blend = [], indices = [];
  for (let j = 0; j <= rows; j++) {
    const z = -57.0 + 116.5 * j / rows;
    for (let i = 0; i <= cols; i++) {
      const x = -63 + 126 * i / cols;
      xyz.push(x, terrainHeight(x, z), z);
      uv.push(x / 3.4, -z / 3.4);
      const edge = trailDistance(x, z);
      const ripple = .13 * Math.sin(z * 2.1 - x * 1.04) + .147 * Math.sin(x * 2.2 + z * .66);
      const trail = .96 * (1 - smooth(.56, 1.34 + ripple, edge));
      const undulate = Math.sin(x * .41 + z * .37) * Math.sin(z * .61 - x * .13) + .31 * Math.sin(z * 1.08 + x * .91);
      const moss = smooth(-.31, .995, undulate) * .65 * (1 - trail);
      blend.push(trail, moss);
      const tint = .87 + undulate * .085 + .079 * trail;
      color.push(tint, tint * .985, tint * .95);
      if (i === cols || j === rows) continue;
      const n = i + (cols + 1) * j;
      indices.push(n, n + cols + 1, n + 1, n + 1, n + cols + 1, n + cols + 2);
    }
  }
  const geometry = new T.BufferGeometry();
  geometry.setAttribute('position', new T.Float32BufferAttribute(xyz, 3));
  geometry.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
  geometry.setAttribute('color', new T.Float32BufferAttribute(color, 3));
  geometry.setAttribute('blend', new T.Float32BufferAttribute(blend, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const mesh = new T.Mesh(geometry, material);
  mesh.matrixAutoUpdate = false;
  mesh.matrixWorldAutoUpdate = false;
  mesh.receiveShadow = true;
  return mesh;
}

const featuredTrees = [
  [-10.4, 6.58, 10.7, .35, 1, 'oak'], [-7.55, 10.95, 9.6, .31, 0, 'oak'],
  [-12.88, 11.80, 9.3, .25, 2, 'oak'], [-3.48, 8.58, 8.4, .22, 4, 'birch'],
  [.48, 16.55, 8.8, .17, 4, 'birch'], [-6.64, 15.16, 8.9, .20, 0, 'birch'],
  [7.52, 10.16, 9.4, .26, 1, 'oak'], [11.32, 11.98, 8.0, .26, 0, 'oak'],
  [15.63, 2.97, 10.8, .32, 2, 'oak'], [17.1, -1.18, 7.18, .18, 4, 'birch'],
  [7.6, -8.57, 9.28, .29, 1, 'oak'], [13.13, -8.87, 8.7, .18, 4, 'birch'],
  [2.79, -8.75, 11.6, .40, 2, 'oak'], [-2.80, -9.30, 9.75, .30, 0, 'oak'],
  [-8.22, -8.63, 10.14, .25, 3, 'oak'], [-14.91, -9.84, 9.50, .24, 4, 'birch'],
  [-16.81, -2.63, 10.6, .34, 1, 'oak'], [26.47, 3.92, 10.70, .25, 0, 'oak'],
  [26.93, -1.72, 8.42, .24, 2, 'oak'], [18.6, 16.55, 8.42, .19, 4, 'birch'],
  [19.15, -15.05, 11.58, .34, 2, 'oak'], [23.67, -12.10, 8.82, .28, 1, 'oak'],
  [14.47, -15.38, 9.36, .26, 0, 'oak'], [4.74, -12.2, 9.21, .27, 4, 'birch']
];

export function treeLocations() {
  const random = seeded(67557);
  const trees = featuredTrees.map(item => [...item, true]);
  for (let dz = -52; dz <= 55; dz += 3.72) {
    for (let dx = -59; dx <= 59; dx += 3.82) {
      const x = dx + between(random, -1.78, 1.78) + Math.sin(dz * .34) * .72;
      const z = dz + between(random, -1.55, 1.55);
      if (x > -15 && x < 14.7 && z > -7.72 && z < 7.96) continue;
      if (x > -3.1 && x < 9.27 && z > 6.05 && z < 16.4) continue;
      if (Math.abs(z - trackCenter(x)) < 2.35 || trailDistance(x, z) < 1.72) continue;
      const view = x > 11.9 && x < 19.8 && z > -12.63 && z < -3.8;
      if (view && random() < .82) continue;
      const edge = smooth(14, 49, Math.hypot(x * .83, z * .92));
      const grove = Math.sin(x * .19 + z * .08) * Math.cos(z * .25 - x * .07);
      if (random() > .54 - edge * .13 + grove * .16) continue;
      const birch = random() > .71;
      const height = between(random, birch ? 6.8 : 7.0, birch ? 11.0 : 12.7);
      const radius = height * between(random, .018, birch ? .028 : .038);
      const palette = birch ? pick(random, [0, 4, 4, 4, 3]) : pick(random, [0, 0, 1, 1, 1, 2, 3]);
      if (featuredTrees.some(([tx, tz]) => (tx - x) ** 2 + (tz - z) ** 2 < 2.65 ** 2)) continue;
      if (trees.some(([tx, tz]) => (tx - x) ** 2 + (tz - z) ** 2 < 1.64 ** 2)) continue;
      trees.push([x, z, height, radius, palette, birch ? 'birch' : 'oak', false]);
    }
  }
  return trees;
}

function groveCard(batch, m, random, center, width, height, tone, shadow, almostFlat = false, receive = true) {
  const yaw = between(random, 0, radians);
  const bank = between(random, -.51, .51);
  const tilt = almostFlat ? between(random, 1.08, 1.49) * (random() < .5 ? -1 : 1) : between(random, -.99, .99);
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  const ct = Math.cos(tilt), st = Math.sin(tilt);
  const cb = Math.cos(bank), sb = Math.sin(bank);
  const u = [cy * cb + sy * st * sb, ct * sb, -sy * cb + cy * st * sb];
  const v = [-cy * sb + sy * st * cb, ct * cb, sy * sb + cy * st * cb];
  batch.plane(m.foliage, center, u, v, width, height,
    { uv: uvPatches[Math.floor(random() * 4)], tint: tone, shadow, receive });
}

function buildTree(wood, leaves, m, collision, tree, i) {
  const [x, z, h, baseRadius, palette, species, featured] = tree;
  const random = seeded(59658 + i * 4711);
  const birch = species === 'birch';
  const y = terrainHeight(x, z) - .025;
  const range = Math.hypot(x * .78, z * .77);
  const close = featured || range < 20;
  const mid = range < 33;
  const casts = range < 25 && x < 20 && z > -13;
  const litShadow = range < 26;
  const mat = birch ? (mid ? m.birch : m.birchFar) : (mid ? m.bark : m.barkFar);
  const barkShade = birch ? pick(random, ['#ded5c5', '#eae0cb', '#c6c4b4']) :
    pick(random, ['#c9c0ae', '#ded5c3', '#c5bda8', '#aac0ac']);
  const leanX = between(random, -.95, .95);
  const leanZ = between(random, -.83, .93);
  const bend = random() * radians;
  const sin = Math.sin(bend), cos = Math.cos(bend);
  function spine(t) {
    return [x + leanX * t + Math.sin(t * Math.PI * 2.2) * .34 * cos,
      y + t * h, z + leanZ * t + Math.sin(t * Math.PI * 2.15) * .30 * sin];
  }
  const rs = [1.46, 1.04, .88, .66, .38, .14, .035];
  const ps = [0, .063, .205, .42, .67, .89, 1].map(spine);
  wood.tube(mat, ps, rs.map(f => baseRadius * f), {
    segments: close ? 10 : 7, shadow: casts, receive: litShadow, tint: barkShade, darken: .36,
    sideShade: birch ? .08 : .17, irregular: birch ? .055 : .129, uOffset: random()
  });
  collision.circle(x, z, baseRadius * 1.14);

  if (close) {
    const counts = featured ? 6 : 4;
    for (let j = 0; j < counts; j++) {
      const angle = j / counts * radians + between(random, -.39, .39);
      const reach = between(random, .43, 1.19) * (baseRadius > .27 ? 1.14 : .86);
      const dx = Math.sin(angle) * reach, dz = Math.cos(angle) * reach;
      wood.tube(mat, [[x + dx * .113, y + .24, z + dz * .113], [x + dx * .45, y + .066, z + dz * .43],
        [x + dx * .73, terrainHeight(x + dx * .73, z + dz * .73) + .022, z + dz * .73],
        [x + dx, terrainHeight(x + dx, z + dz) - .026, z + dz]],
      [baseRadius * .42, baseRadius * .29, baseRadius * .18, .009], {
        segments: 6, shadow: casts, receive: litShadow, tint: barkShade, darken: .11, irregular: .06, uOffset: random()
      });
    }
  }

  const limbs = close ? (birch ? 8 : 9) : mid ? 7 : 6;
  const skinny = random() < (birch ? .09 : .135);
  const density = skinny ? .39 : between(random, .77, 1.12);
  const crownShadows = featured && z > 3.5 && z < 16 && x > -16 && x < 11;
  const color = warmLeaves[palette];
  const phase = random() * radians;
  for (let j = 0; j < limbs; j++) {
    const index = j / (limbs - 1);
    const begin = clamp((birch ? .52 : .44) + index * .36 + between(random, -.034, .041), .37, .87);
    const root = spine(begin);
    const angle = phase + j * 2.38 + between(random, -.30, .29);
    const direction = [Math.cos(angle), Math.sin(angle)];
    const growth = h * (birch ? .25 : .36) * (1 - index * .55) * between(random, .69, 1.24);
    const upward = h * (birch ? .22 : .14) * between(random, .68, 1.31);
    const elbow = [root[0] + direction[0] * growth * .34, root[1] + upward * .32, root[2] + direction[1] * growth * .38];
    const hand = [root[0] + direction[0] * growth * .78 + between(random, -.22, .22),
      root[1] + upward * .78, root[2] + direction[1] * growth * .79];
    const tip = [root[0] + direction[0] * growth, root[1] + upward, root[2] + direction[1] * growth];
    const branchRadius = baseRadius * (birch ? .303 : .51) * (1 - index * .62) * between(random, .76, 1.17);
    wood.tube(mat, [root, elbow, hand, tip], [branchRadius, branchRadius * .71, branchRadius * .34, .008],
      { segments: close ? 7 : 5, shadow: casts, receive: litShadow, tint: barkShade, uOffset: random() });
    const forkSign = j % 2 === 0 ? 1 : -1;
    const fork = [elbow[0] + (direction[0] - direction[1] * forkSign) * growth * .44,
      elbow[1] + upward * .85, elbow[2] + (direction[1] + direction[0] * forkSign) * growth * .43];
    wood.tube(mat, [elbow, [mix(elbow[0], fork[0], .53), mix(elbow[1], fork[1], .50) - .07, mix(elbow[2], fork[2], .57)], fork],
      [branchRadius * .49, branchRadius * .271, .0045],
      { segments: close ? 6 : 4, shadow: casts, receive: litShadow, tint: barkShade, uOffset: random() });
    if (close) {
      const twig = [tip[0] + direction[0] * .52 - direction[1] * .32 * forkSign, tip[1] + .51,
        tip[2] + direction[1] * .52 + direction[0] * .32 * forkSign];
      wood.tube(mat, [hand, twig], [branchRadius * .21, .0035], { segments: 4, shadow: false, tint: barkShade });
    }
    const spread = clamp(growth * .50 + (birch ? .4 : .63), .67, 2.1);
    const cards = Math.ceil((close ? 18 : mid ? 13 : 8) * density);
    for (let k = 0; k < cards; k++) {
      const anchor = k % 3 ? tip : fork;
      const r = Math.sqrt(random()) * spread;
      const a = random() * radians;
      const center = [anchor[0] + Math.cos(a) * r, anchor[1] + between(random, -.53, 1.34) * spread * .67,
        anchor[2] + Math.sin(a) * r];
      const size = between(random, .72, 1.31) * spread * (close ? 1.05 : 1.23);
      groveCard(leaves, m, random, center, size, size * between(random, .72, 1.16), pick(random, color),
        crownShadows && k % 3 === 0, k % 4 === 0, litShadow);
    }
  }

  const high = spine(.96);
  for (let k = 0; k < (close ? 14 : 9); k++) {
    const a = random() * radians, spread = between(random, .08, birch ? 1.09 : 1.29);
    const size = between(random, .77, 1.56);
    groveCard(leaves, m, random, [high[0] + Math.cos(a) * spread, high[1] + between(random, -.45, .92),
      high[2] + Math.sin(a) * spread], size, size * between(random, .75, 1.24), pick(random, color), false, k % 3 === 0, litShadow);
  }
}

function litterCard(batch, m, random, x, z, y, size) {
  const angle = random() * radians;
  const u = [Math.cos(angle), between(random, -.15, .15), Math.sin(angle)];
  const v = [Math.sin(angle), between(random, -.12, .12), -Math.cos(angle)];
  batch.plane(m.litter, [x, y, z], u, v, size * between(random, .86, 1.22), size,
    { uv: uvPatches[Math.floor(random() * 4)], tint: pick(random, floorLeaves), shadow: false });
}

function addLitter(batch, m, random) {
  for (let i = 0; i < 4350; i++) {
    const x = between(random, -26, 32), z = between(random, -23, 27);
    if (x > p.left && x < p.right && z > p.track && z < p.inside) continue;
    if (x > station.apronLeft && x < station.apronRight && z > p.inside && z < 6.89) continue;
    if (Math.abs(x - crossing.x) < crossing.half + .09 && z > crossing.foot && z < crossing.start) continue;
    const edge = trailDistance(x, z);
    const trackDistance = Math.abs(z - trackCenter(x));
    if (edge < .54 && random() < .78) continue;
    if (trackDistance < 1.16 && random() < .69) continue;
    const ground = terrainHeight(x, z);
    const y = trackDistance < 1.22 ? Math.max(.127, ground + .018) : ground + between(random, .021, .049);
    litterCard(batch, m, random, x, z, y, between(random, .074, .195));
  }
  for (let i = 0; i < 1520; i++) {
    const x = between(random, p.left + .05, p.right - .05);
    const drift = random();
    const z = drift < .41 ? -.04 - random() ** 2.25 * 1.67 :
      drift < .79 ? p.track + .067 + random() ** 2.85 * .84 : between(random, -3.55, -.31);
    if (x > crossing.x - crossing.half && x < crossing.x + crossing.half && z < crossing.start) continue;
    if (z >= -.14 && x > station.left && x < station.right) continue;
    const deck = p.top + between(random, .016, .034);
    litterCard(batch, m, random, x, z, deck, between(random, .063, .177));
  }
  for (let i = 0; i < 106; i++) {
    const x = between(random, -7.35, 6.36);
    if (Math.sin(x * 1.57) < -.43 && random() < .61) continue;
    const z = between(random, -3.438, -3.371);
    litterCard(batch, m, random, x, z, between(random, 2.708, 2.728), between(random, .057, .120));
  }
  for (let i = 0; i < 176; i++) {
    const x = between(random, station.apronLeft, station.apronRight);
    const z = station.front + .09 + random() ** 1.75 * (station.apronFront - station.front - .09);
    if (Math.abs(x - station.door) < .53 && random() < .65) continue;
    litterCard(batch, m, random, x, z, station.floor + between(random, .012, .035), between(random, .072, .163));
  }
  for (let i = 0; i < 118; i++) {
    const entry = random() < .6;
    const x = entry ? station.door + between(random, -.47, .48) * between(random, .4, 2) : between(random, 2.75, 4.24);
    const z = entry ? (random() < .5 ? .2 + random() ** 2 * 1.27 : 5.29 - random() ** 2 * 1.1) : between(random, .54, 5.12);
    litterCard(batch, m, random, x, z, (z <= p.inside ? p.top : station.floor) + .012, between(random, .065, .159));
  }
}

function grassTuft(batch, m, random, x, y, z, scale, count) {
  for (let i = 0; i < count; i++) {
    const a = random() * radians;
    const dx = Math.sin(a), dz = Math.cos(a);
    const h = scale * between(random, .45, 1.14);
    const w = h * between(random, .048, .12);
    const lean = h * between(random, .14, .65);
    const root = [x + between(random, -.048, .048), y, z + between(random, -.048, .048)];
    const mid = [root[0] + dx * lean * .41, y + h * .59, root[2] + dz * lean * .41];
    const tip = [root[0] + dx * lean, y + h * between(random, .76, .97), root[2] + dz * lean];
    const points = [
      [root[0] - dz * w * .52, root[1], root[2] + dx * w * .52],
      [root[0] + dz * w * .43, root[1], root[2] - dx * w * .43],
      [mid[0] + dz * w * .233, mid[1], mid[2] - dx * w * .233], tip,
      [mid[0] - dz * w * .181, mid[1], mid[2] + dx * w * .181]
    ];
    batch.polygon(m.grass, points, { tint: pick(random, bladePalette), shadow: false });
  }
}

function fern(batch, m, random, x, z, size) {
  const y = terrainHeight(x, z) - .005;
  const fronds = 6 + Math.floor(random() * 4);
  const spin = random() * radians;
  for (let i = 0; i < fronds; i++) {
    const a = spin + i / fronds * radians + between(random, -.21, .21);
    const cos = Math.cos(a), sin = Math.sin(a);
    const length = size * between(random, .63, 1.14);
    const tilt = length * between(random, .46, .79);
    const point = t => [x + cos * length * t, y + tilt * Math.sin(t * 2.34), z + sin * length * t];
    batch.tube(m.grass, [point(0), point(.27), point(.48), point(.73), point(1)],
      [.009, .007, .005, .003, .001], { shadow: false, segments: 4, tint: '#939358' });
    for (let j = 1; j < 10; j++) {
      const t = j / 10;
      const anchor = point(t);
      const width = length * .24 * Math.sin(Math.PI * (t + .03)) ** .79;
      const tone = pick(random, ['#859155', '#9c9d56', '#99975a', '#85894e', '#a89b5b', '#8f924c']);
      for (const side of [-1, 1]) {
        const px = -sin * width * side, pz = cos * width * side;
        const joint = [anchor[0] + px * .49 + cos * width * .22, anchor[1] - .057 * width, anchor[2] + pz * .49 + sin * width * .22];
        const tip = [anchor[0] + px + cos * width * .52, anchor[1] - width * .20, anchor[2] + pz + sin * width * .52];
        batch.polygon(m.grass, [anchor,
          [joint[0] + cos * width * .169, joint[1], joint[2] + sin * width * .169], tip,
          [joint[0] - cos * width * .15, joint[1] - width * .09, joint[2] - sin * width * .15]],
        { tint: tone, shadow: false });
      }
    }
  }
}

function rock(batch, m, random, x, z, y, width, height, depth, ballast = false) {
  const angles = Array.from({ length: 6 }, (_, i) => i / 6 * radians + between(random, -.18, .20));
  const outer = angles.map(a => [x + Math.cos(a) * width * between(random, .79, 1.2), y - height * .21,
    z + Math.sin(a) * depth * between(random, .82, 1.14)]);
  const inner = outer.map(([ox, , oz]) => [mix(x, ox, between(random, .51, .78)), y + height * between(random, .52, .95),
    mix(z, oz, between(random, .49, .79))]);
  for (let j = 0; j < outer.length; j++) {
    const k = (j + 1) % outer.length;
    const face = [outer[j], inner[j], inner[k], outer[k]];
    batch.polygon(ballast ? m.ballast : m.stone, face, {
      tint: pick(random, ballast ? ['#acaaa0', '#b3a593', '#797c74', '#cebda4'] : ['#a5a994', '#b6b299', '#8d8977']),
      shadow: false,
      uv: face.map(v => [v[0] / .37 + v[2] / .38, v[1] / .246])
    });
  }
  const lid = [...inner].reverse();
  batch.polygon(ballast ? m.ballast : m.moss, lid, {
    tint: ballast ? '#c8bdac' : '#a49363', uv: lid.map(v => [v[0], v[2]]), shadow: false
  });
}

function woodlandFloor(batch, wood, m, collision, random) {
  for (let i = 0; i < 2430; i++) {
    const x = between(random, -31, 33), z = between(random, -26, 26);
    const dist = trailDistance(x, z);
    const isStation = x > -7.40 && x < 5.12 && z > p.inside && z < 6.76;
    if (isStation || dist < .77 || (Math.abs(x - crossing.x) < crossing.half + .19 && z > crossing.foot && z < crossing.start)) continue;
    const track = Math.abs(z - trackCenter(x));
    if (track < 1.05 && random() > .20) continue;
    const platform = x > p.left && x < p.right && z > p.track && z < p.inside;
    if (platform && (random() > .19 || (z > p.track + .21 && z < -.33))) continue;
    if (dist > 4 && random() > .62) continue;
    const y = platform ? p.top : track < 1.2 ? .108 : terrainHeight(x, z) - .017;
    grassTuft(batch, m, random, x, y, z, platform ? between(random, .081, .20) : between(random, .115, .435),
      4 + Math.floor(random() * 5));
  }

  for (let i = 0; i < 755; i++) {
    const x = between(random, -18, 23), d = between(random, -1.53, 1.53), z = trackCenter(x) + d;
    if (Math.abs(x - crossing.x) < crossing.half + .1 || (z > p.track && x < p.right && x > p.left)) continue;
    const width = between(random, .021, .080);
    const y = Math.abs(d) < 1.22 ? between(random, .091, .110) : between(random, .034, .063);
    rock(batch, m, random, x, z, y, width, width * between(random, .39, .79), width * between(random, .71, 1.2), true);
  }

  const ferns = [[3.02, 8.84, .79], [-2.46, 8.17, .64], [6.86, 8.97, .81], [-7.85, 8.45, .76],
    [13.97, -9.58, .72], [12.49, -10.86, .58], [17.77, -13.22, 1.06], [18.23, -14.09, .67],
    [19.73, -11.83, .74], [25.67, -3.68, .82], [25.67, 5.26, .73], [18.84, 14.11, .81],
    [21.45, 12.62, .88], [8.98, -8.63, .79], [-15.58, -2.73, .77], [5.98, -9.11, .54]];
  for (const [x, z, size] of ferns) fern(batch, m, random, x, z, size);

  for (let i = 0; i < 95; i++) {
    const x = between(random, -14, 29), z = between(random, -18, 19);
    if (x < 5.15 && x > -7.35 && z > .15 && z < 6.77) continue;
    if (x < p.right && x > p.left && z < p.inside && z > p.track - .15) continue;
    if (trailDistance(x, z) < .67 || Math.abs(z - trackCenter(x)) < 1.95) continue;
    const w = between(random, .087, .46);
    rock(batch, m, random, x, z, terrainHeight(x, z) - w * .19, w, w * between(random, .32, .70), w * .74);
  }
  for (const [x, z] of [[19.18, -13.7], [-11.1, 9.40], [7.74, -13.18]]) {
    const y = terrainHeight(x, z);
    const start = [x - .80, y + .16, z], end = [x + 1.52, y + .23, z - .81];
    wood.tube(m.bark, [start, [x + .07, y + .19, z - .18], end], [.239, .208, .149],
      { segments: 10, shadow: true, tint: '#b4a589', irregular: .09 });
    const axis = [end[0] - start[0], end[2] - start[2]];
    const len = Math.hypot(...axis);
    const u = [axis[1] / len, 0, -axis[0] / len];
    for (const [point, radius, direction] of [[start, .221, -1], [end, .14, 1]]) {
      const cap = Array.from({ length: 11 }, (_, j) => {
        const a = j / 11 * radians * direction;
        return [point[0] + u[0] * Math.cos(a) * radius + axis[0] / len * .006 * direction,
          point[1] + Math.sin(a) * radius, point[2] + u[2] * Math.cos(a) * radius + axis[1] / len * .006 * direction];
      });
      wood.polygon(m.cut, cap, { tint: '#c1a687', uv: cap.map(v => [(v[0] - x) * 1.4 + (v[2] - z) * 1.4, v[1] * 2.16]) });
    }
    wood.tube(m.bark, [[x - .37, y + .19, z - .09], [x - .55, y + .43, z + .15],
      [x - .52, y + .48, z + .37]], [.109, .058, .024], { segments: 7, shadow: true });
    collision.box(x + .33, z - .385, 2.19, .68);
  }
}

function understory(wood, leaves, m, random) {
  for (let i = 0; i < 145; i++) {
    const x = between(random, -24, 31), z = between(random, -24, 25);
    const d = trailDistance(x, z);
    if ((d < 1.75 || d > 7.9) || Math.abs(z - trackCenter(x)) < 2.5) continue;
    if (x > -8.08 && x < 5.5 && z < 9.23 && z > -.68) continue;
    if (x > -3.9 && x < 10.1 && z > 6.4 && z < 15.1 && random() < .82) continue;
    if (x > 12 && x < 19 && z > -12.5 && z < -6.2 && random() < .86) continue;
    const y = terrainHeight(x, z);
    const h = between(random, .62, 2.38);
    const a = random() * radians;
    const dx = Math.cos(a), dz = Math.sin(a);
    const twig = [x + dx * .31, y + h, z + dz * .27];
    const root = [x, y, z];
    wood.tube(m.bark, [root, [x, y + h * .49, z + .05], twig], [.022, .015, .004], { segments: 5, shadow: false });
    const palette = warmLeaves[pick(random, [1, 2, 3, 4])];
    for (let j = 0; j < 9; j++) {
      const ang = random() * radians;
      const r = between(random, .04, h * .38);
      const size = between(random, .35, .78) * Math.sqrt(h);
      groveCard(leaves, m, random, [twig[0] + Math.cos(ang) * r, twig[1] - between(random, -.11, h * .51),
        twig[2] + Math.sin(ang) * r], size, size * .78, pick(random, palette), false, j % 3 === 0);
    }
  }
}

export function buildWoodland(scene, m, collision) {
  scene.add(terrainMesh(m));
  const wood = new Batch(16);
  const leaves = new Batch(14, false);
  const floor = new Batch(12, false);
  const trees = treeLocations();
  for (let i = 0; i < trees.length; i++) buildTree(wood, leaves, m, collision, trees[i], i);
  const random = seeded(56147);
  understory(wood, leaves, m, random);
  woodlandFloor(floor, wood, m, collision, random);
  addLitter(floor, m, random);
  return [wood.finish(scene), leaves.finish(scene), floor.finish(scene)];
}
