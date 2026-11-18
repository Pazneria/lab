import * as THREE from './vendor/three.module.min.js';
import { Draft, mix, polar, random, tau, tint } from './geometry.js';
import { sunDirection } from './layout.js';

const plateauOutline = [
  [-15.5, 10.0], [-14.2, 14.3], [-9.5, 18.2], [-4.7, 17.9], [0.1, 19.2],
  [6.85, 17.6], [9.2, 14.4], [12.1, 12.0], [11.6, 8.2], [13.2, 5.1],
  [12.38, 3.55], [12.10, 1.9], [12.36, -0.14], [12.07, -3.16], [11.12, -4.55],
  [9.40, -5.60], [7.8, -7.9], [4.2, -8.9], [1.0, -9.9], [-4.7, -8.45],
  [-8.9, -8.1], [-12.0, -4.6], [-14.1, -0.8], [-15.7, 2.6], [-16.3, 6.2],
];
const plateauCenter = [-0.7, 4.25];

function plateauHeight(x, z) {
  const rugged = Math.min(1, Math.max(0, (Math.hypot(x * 0.88, (z - 3) * 0.83) - 6.3) / 6));
  return -0.826 + Math.sin(x * 0.58 - z * 0.36) * (0.016 + rugged * 0.042) +
    Math.cos(z * 0.49 + x * 0.13) * (0.020 + rugged * 0.028) - rugged * 0.042;
}

function contour() {
  const rng = random(615);
  const rim = [];
  for (let i = 0; i < plateauOutline.length; i += 1) {
    const a = plateauOutline[i];
    const b = plateauOutline[(i + 1) % plateauOutline.length];
    const count = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 1.52);
    for (let k = 0; k < count; k += 1) {
      const x = mix(a[0], b[0], k / count) + (k ? (rng() - 0.5) * 0.43 : 0);
      const z = mix(a[1], b[1], k / count) + (k ? (rng() - 0.5) * 0.43 : 0);
      rim.push({ x, z, grain: rng() });
    }
  }
  return rim;
}

function plateau(build, m) {
  const rng = random(357);
  const edge = contour();
  const tiers = [
    [0, 0, 0xdcc2a0], [-0.25, 0.006, 0xe0bf96], [-0.59, 0.010, 0xd5b08b],
    [-1.01, -0.004, 0xb38b68], [-1.16, -0.008, 0xc39870], [-1.56, 0.009, 0xd2ab82],
    [-2.26, 0.018, 0xd9a982], [-2.45, 0.016, 0xc49873], [-3.41, 0.027, 0xcba07a],
    [-3.72, 0.031, 0xad815e], [-3.90, 0.028, 0xbd8c68], [-4.88, 0.046, 0xc49570],
    [-6.48, 0.063, 0xb58a68], [-6.62, 0.053, 0xa77756], [-7.69, 0.070, 0xbc906b],
    [-9.07, 0.110, 0xc29776], [-9.43, 0.124, 0xb58464],
    [-11.10, 0.16, 0xb78666], [-13.8, 0.235, 0xb98968],
  ];
  build.section('Plateau / exposed sandstone beds');
  const wall = new Draft();
  const n = edge.length;
  const stack = tiers.map(([level, grow], row) => edge.map(({ x, z, grain }, i) => {
    const az = i * tau / n;
    const ox = x - plateauCenter[0];
    const oz = z - plateauCenter[1];
    const wiggle = row ? (Math.cos(row * 1.37 + az * 7.8) * 0.019 + (grain - 0.5) * 0.035) *
      Math.min(row / 3, 1) : 0;
    const base = plateauHeight(x, z);
    const sediment = row ? (Math.sin(az * 3 + 0.8) * 0.16 + Math.sin(az * 9.0) * 0.078) *
      Math.min(row / 4, 1) : 0;
    return [x + (grow + wiggle) * ox, base + level + sediment, z + (grow + wiggle) * oz];
  }));

  let u = 0;
  for (let i = 0; i < n; i += 1) {
    const j = (i + 1) % n;
    const nextU = u + Math.hypot(edge[i].x - edge[j].x, edge[i].z - edge[j].z);
    const gain = 0.84 + edge[i].grain * 0.15 + Math.sin(i * 2.431) * 0.063;
    for (let k = 0; k < tiers.length - 1; k += 1) {
      const a = stack[k][i];
      const b = stack[k][j];
      const c = stack[k + 1][j];
      const d = stack[k + 1][i];
      const tone = tiers[k][2];
      const g = gain + (rng() - 0.5) * 0.13;
      wall.tri(a, d, c, {
        uv: [[u * 0.66, a[1] * 0.86], [u * 0.66, d[1] * 0.86], [nextU * 0.66, c[1] * 0.86]],
        color: tint(tone, g - 0.035),
      });
      wall.tri(a, c, b, {
        uv: [[u * 0.66, a[1] * 0.86], [nextU * 0.66, c[1] * 0.86], [nextU * 0.66, b[1] * 0.86]],
        color: tint(tone, g + rng() * 0.038),
      });
    }
    u = nextU;
  }
  build.add(wall.finish(), m.rock);

  build.section('Plateau / sand and exposed bedrock');
  const floor = new Draft();
  const groundColor = (x, z) => {
    const a = Math.sin(x * 0.4 + z * 0.64 + Math.sin(z * 0.58) * 0.5);
    const b = Math.cos(x * 1.08 - z * 0.81);
    const tone = tint(0xe7cfac, 0.90 + a * 0.064 + b * 0.038);
    tone.b *= 1 - a * 0.054;
    return tone;
  };
  const rows = 11;
  const ground = Array.from({ length: rows }, (_, row) => {
    const ratio = (row + 1) / rows;
    return edge.map(({ x, z }) => {
      const px = mix(plateauCenter[0], x, ratio);
      const pz = mix(plateauCenter[1], z, ratio);
      return [px, plateauHeight(px, pz), pz];
    });
  });
  const center = [plateauCenter[0], plateauHeight(...plateauCenter), plateauCenter[1]];
  for (let row = 0; row < rows; row += 1) {
    for (let j = 0; j < n; j += 1) {
      const j1 = (j + 1) % n;
      const corners = row ? [ground[row - 1][j], ground[row][j], ground[row][j1], ground[row - 1][j1]] :
        [center, ground[row][j], ground[row][j1]];
      floor.face(corners, {
        uv: corners.map(([x, , z]) => [x * 0.81, z * 0.81]),
        color: corners.map(([x, , z]) => groundColor(x, z)),
      });
    }
  }
  build.add(floor.finish(), m.earth, { cast: false });
}

function fragment(seed, detail) {
  const geo = new THREE.IcosahedronGeometry(1, detail);
  const positions = geo.attributes.position;
  for (let i = 0; i < positions.count; i += 1) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);
    const step = Math.sin(x * 12.2 + y * 5.87 + z * 3.73 + seed);
    const noise = Math.sin(y * 19.7 - x * 6.9 + z * 8.2 + seed * 0.67);
    const gain = 1 + step * 0.16 + noise * 0.073;
    positions.setXYZ(i, x * gain + y * 0.19, Math.round(y * gain * 30) / 30, z * gain + x * 0.11);
  }
  geo.computeVertexNormals();
  const colors = new Float32Array(positions.count * 3);
  for (let i = 0; i < positions.count; i += 1) {
    const y = positions.getY(i);
    const normal = geo.attributes.normal.getY(i);
    const banding = Math.sin(y * 8.8 + seed * 0.32);
    const shade = 0.83 + normal * 0.075 + banding * 0.043;
    colors[i * 3] = shade * 1.04;
    colors[i * 3 + 1] = shade;
    colors[i * 3 + 2] = shade * (0.967 + banding * 0.048);
    geo.attributes.uv.setXY(i, (positions.getX(i) + positions.getZ(i)) * 0.6, y * 0.56);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}

function rockGarden(build, m) {
  const rng = random(598);
  const types = Array.from({ length: 5 }, (_, i) => fragment(i + 0.75, i === 4 ? 0 : 1));
  const palette = [0xd3ac85, 0xe5be93, 0xb9997e, 0xe2c49d, 0xd8b896, 0xcba57e, 0xf0d6b1];
  const boulder = (x, z, sx, sy, sz, exposed = true) => {
    const y = plateauHeight(x, z) + sy * 0.37;
    const shape = types[Math.floor(rng() * types.length)];
    build.add(shape, m.rock, { at: [x, y, z], scale: [sx, sy, sz],
      rotation: [(rng() - 0.5) * 0.24, rng() * tau, (rng() - 0.5) * 0.19],
      tint: palette[Math.floor(rng() * palette.length)], cast: exposed });
  };
  build.section('Plateau / ledges and sandstone fragments');
  const landmarks = [
    [-6.25, 13.65, 1.02, 0.52, 0.74], [-7.5, 11.62, 1.54, 1.05, 0.98],
    [-5.25, 12.25, 0.54, 0.27, 0.41], [-6.9, 15.3, 0.86, 0.42, 0.89],
    [5.8, 12.6, 0.91, 0.47, 0.61], [6.9, 10.94, 1.17, 0.83, 0.83],
    [4.55, 11.04, 0.56, 0.39, 0.40], [5.73, 14.68, 0.83, 0.37, 0.92],
    [8.87, 7.65, 1.83, 0.88, 0.72], [10.5, 6.45, 0.93, 0.48, 0.74],
    [11.2, 8.93, 1.14, 0.64, 0.83], [7.22, -5.24, 1.22, 0.88, 0.55],
    [10.70, -4.13, 0.74, 0.39, 0.44], [-5.82, -4.51, 1.0, 0.54, 0.74],
    [-10.45, -1.2, 1.29, 0.69, 1.32], [-11.17, 5.49, 1.09, 0.84, 1.02],
    [2.28, -6.59, 0.65, 0.47, 0.81], [2.42, 16.77, 0.79, 0.61, 1.1],
  ];
  for (const [x, z, sx, sy, sz] of landmarks) {
    boulder(x, z, sx, sy, sz);
    for (let j = 0; j < 8; j += 1) {
      const size = 0.075 + rng() ** 2 * 0.38;
      boulder(x + (rng() - 0.5) * sx * 2.8, z + (rng() - 0.5) * sz * 2.7,
        size, size * (0.48 + rng() * 0.43), size * (0.8 + rng() * 0.57), size > 0.2);
    }
  }
  const nearBuilding = (x, z) => Math.hypot(x, z) < 5.72 ||
    (Math.abs(x) < 2.65 && z > 4.1 && z < 12.5) ||
    (Math.abs(x) < 4.45 && z > 12.05 && z < 15.35) ||
    (x > 4.96 && x < 11.9 && Math.abs(z) < 3.62);
  for (let i = 0; i < 220; i += 1) {
    const x = (rng() - 0.5) * 25 - 1;
    const z = (rng() - 0.5) * 24 + 4;
    if (nearBuilding(x, z) || Math.hypot(x / 1.06, z - 4) > 11.6) continue;
    const s = 0.068 + rng() ** 3 * 0.61;
    boulder(x, z, s, s * (0.4 + rng() * 0.5), s * (0.8 + rng() * 0.6), s > 0.24);
  }

  build.section('Plateau / dry bunchgrass');
  const blades = new Draft();
  for (const [cx, cz] of [
    [-5.86, 12.61], [-7.58, 12.18], [-4.93, 15.42], [-2.3, 16.26], [4.74, 13.91], [6.4, 11.08],
    [5.80, 15.35], [8.74, 7.86], [8.08, 7.16], [11.49, 5.63], [10.4, -4.15], [7.16, -5.31],
    [5.33, -5.94], [-6.2, -5.25], [-8.61, 0.3], [-7.89, 2.83], [-5.39, 6.75], [4.12, 7.7],
  ]) {
    const base = plateauHeight(cx, cz) + 0.035;
    const scale = 0.70 + rng() * 0.74;
    for (let i = 0; i < 22; i += 1) {
      const a = rng() * tau;
      const height = (0.12 + rng() * 0.39) * scale;
      const bend = (0.045 + rng() * 0.23) * scale;
      const width = (0.009 + rng() * 0.015) * scale;
      const bx = cx + (rng() - 0.5) * 0.14;
      const bz = cz + (rng() - 0.5) * 0.14;
      const sx = Math.sin(a);
      const sz = Math.cos(a);
      const w = (h, shift, side) => [bx + h * h * sx * bend + side * width * sz + shift * h,
        base + height * h, bz + h * h * sz * bend - side * width * sx];
      const colors = [tint(0x95845f, 0.70 + rng() * 0.25), tint(0xc8b27e), tint(0xe9d5a2)];
      blades.quad(w(0, 0, -0.5), w(0, 0, 0.5), w(0.65, 0.02, 0.25), w(0.65, 0.02, -0.25),
        { color: [colors[0], colors[0], colors[1], colors[1]] });
      blades.tri(w(0.65, 0.02, -0.25), w(0.65, 0.02, 0.25), w(1, 0.025, 0),
        { color: [colors[1], colors[1], colors[2]] });
    }
  }
  build.add(blades.finish(), m.dryPlant, { cast: false });
}

function duneHeight(x, z) {
  const a = Math.sin((x * 0.062 - z * 0.027) + Math.sin(z * 0.044) * 1.5);
  const b = Math.sin(z * 0.099 + x * 0.033 + a * 0.48);
  const c = Math.sin(x * 0.153 - z * 0.11 + b * 0.4);
  return -13.38 + (a + 0.27) ** 2 * 1.3 + b * 0.93 + c * 0.36;
}

function dunes(build, m) {
  build.section('Basin / rolling dune field');
  const field = new THREE.PlaneGeometry(371.28, 371.28, 102, 102).rotateX(-Math.PI / 2);
  const { position, normal } = field.attributes;
  const colors = new Float32Array(position.count * 3);
  const clay = tint(0xe5b58c);
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const dx = (duneHeight(x + 0.2, z) - duneHeight(x - 0.2, z)) / 0.4;
    const dz = (duneHeight(x, z + 0.2) - duneHeight(x, z - 0.2)) / 0.4;
    const len = Math.hypot(dx, 1, dz);
    const shade = 0.84 + Math.sin(x * 0.09 + z * 0.044) * 0.057 + Math.cos(z * 0.13 - x * 0.047) * 0.062;
    position.setY(i, duneHeight(x, z));
    normal.setXYZ(i, -dx / len, 1 / len, -dz / len);
    colors[i * 3] = clay.r * shade;
    colors[i * 3 + 1] = clay.g * shade;
    colors[i * 3 + 2] = clay.b * shade;
  }
  field.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  build.add(field, m.distance, { cast: false, receive: false });
}

function mesa(build, m, spec) {
  const [cx, cz, rx, rz, height, angle, seed] = spec;
  const rng = random(seed);
  const count = 23;
  const ring = Array.from({ length: count + 1 }, (_, i) => {
    const a = i * tau / count;
    const randomOffset = 0.84 + rng() * 0.2;
    const fingerprint = Math.sin(a * 5 + seed) * 0.075 + Math.cos(a * 3 - seed * 0.2) * 0.11;
    return [Math.sin(a) * (randomOffset + fingerprint), Math.cos(a) * (randomOffset + fingerprint), rng()];
  });
  ring[count] = ring[0];
  const base = -14.1 + (rng() - 0.5) * 1.5;
  const geometry = new Draft();
  const beds = [
    [0.0, 1.40, 0xbb8e75], [0.19, 1.12, 0xcd9b7b], [0.33, 0.95, 0xb88770],
    [0.39, 0.89, 0xc28e70], [0.50, 0.87, 0xad7e68], [0.53, 0.83, 0xc6997d],
    [0.63, 0.80, 0xc29782], [0.72, 0.73, 0xb17d65], [0.74, 0.77, 0xc99a7d],
    [0.90, 0.73, 0xb68972], [1.00, 0.70, 0xd3a588],
  ];
  const coordinate = (row, i) => {
    const [h, r] = beds[row];
    const [x, z, wave] = ring[i];
    const sx = x * rx * r + h * seed % 4 * 0.29;
    const sz = z * rz * r;
    return [cx + sx * Math.cos(angle) + sz * Math.sin(angle),
      base + h * height + (wave - 0.5) * Math.min(row / 5, 1) * 1.35,
      cz - sx * Math.sin(angle) + sz * Math.cos(angle)];
  };
  for (let i = 0; i < count; i += 1) {
    const columnTone = 0.76 + rng() * 0.22;
    for (let row = 0; row < beds.length - 1; row += 1) {
      const a = coordinate(row, i);
      const b = coordinate(row, i + 1);
      const c = coordinate(row + 1, i + 1);
      const d = coordinate(row + 1, i);
      geometry.quad(a, b, c, d, { color: tint(beds[row][2], columnTone + (rng() - 0.5) * 0.095) });
    }
    const top = [cx, base + height - 0.22, cz];
    geometry.tri(top, coordinate(beds.length - 1, i), coordinate(beds.length - 1, i + 1),
      { color: tint(0xcba78b, 0.81 + rng() * 0.096) });
  }
  build.add(geometry.finish(), m.distance, { cast: false, receive: false });
}

export function makeLandscape(build, m) {
  dunes(build, m);
  build.section('Basin / buttes and eroded mesas');
  for (const spec of [
    [42, -16, 9.5, 6.2, 16.6, -0.6, 37], [53, -25, 12.4, 10.2, 17.5, 0.35, 29],
    [56, 28, 20, 9.3, 14.5, 0.68, 43], [49, 40, 9.7, 9.2, 11.9, -0.95, 19],
    [83, 13, 13.3, 6.0, 20, -0.25, 72], [88, -37, 19.5, 10.4, 21.6, 0.72, 31],
    [29, -50, 17.2, 12.2, 17.3, -0.48, 16], [9, -57, 9.3, 6.0, 18.9, 0.18, 11],
    [-33, -56, 19.5, 11.5, 21.0, 0.48, 27], [-55, -20, 20.5, 11.5, 15.7, -0.62, 5],
    [-78, 15, 20.5, 8.6, 20.4, -0.04, 90], [-46, 40, 14, 11.8, 18.1, 0.33, 51],
    [0, 70, 23.4, 13.2, 18.2, 0.52, 16], [34, 83, 12.3, 13.9, 21.6, -0.73, 48],
  ]) mesa(build, m, spec);
  plateau(build, m);
  rockGarden(build, m);
}

export function makeSky() {
  const sun = new THREE.Vector3(sunDirection.x, sunDirection.y, sunDirection.z).normalize();
  const material = new THREE.ShaderMaterial({
    name: 'late afternoon desert sky',
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    toneMapped: false,
    uniforms: {
      sun: { value: sun },
      zenith: { value: new THREE.Color(0x426978) },
      middle: { value: new THREE.Color(0x93a9aa) },
      horizon: { value: new THREE.Color(0xf1d2a7) },
      warm: { value: new THREE.Color(0xf9ddac) },
      lower: { value: new THREE.Color(0xe1bd91) },
    },
    vertexShader: [
      'varying vec3 world;',
      'void main() {',
      '  world = (modelMatrix * vec4(position, 1.0)).xyz;',
      '  gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);',
      '}',
    ].join('\n'),
    fragmentShader: [
      'varying vec3 world;',
      'uniform vec3 sun, zenith, middle, horizon, warm, lower;',
      'void main() {',
      '  vec3 direction = normalize(world - cameraPosition);',
      '  float y = direction.y;',
      '  vec3 color = mix(horizon, middle, smoothstep(-0.015, 0.4, y));',
      '  color = mix(color, zenith, smoothstep(0.30, 1.0, y));',
      '  color = mix(color, lower, smoothstep(0.0, 0.25, -y));',
      '  float lit = max(0.0, dot(direction, sun));',
      '  color = mix(color, warm, pow(lit, 12.0) * 0.31);',
      '  color += vec3(0.132, 0.086, 0.033) * pow(lit, 85.0);',
      '  if (y > 0.055 && y < 0.39) {',
      '    float drape = sin(y * 145.0 + direction.x * 7.0 + sin(direction.z * 18.0) * 0.77);',
      '    float torn = smoothstep(0.30, 0.87, sin(direction.z * 8.5 + direction.x * 17.0 + y * 2.1));',
      '    float veil = smoothstep(0.055, 0.11, y) * (1.0 - smoothstep(0.12, 0.39, y));',
      '    color = mix(color, warm, smoothstep(0.72, 1.0, drape) * torn * veil * 0.16);',
      '  }',
      '  color = mix(color, vec3(1.0, 0.923, 0.710), smoothstep(0.999937, 0.999959, lit));',
      '  gl_FragColor = vec4(color, 1.0);',
      '  #include <colorspace_fragment>',
      '}',
    ].join('\n'),
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(218, 32, 18), material);
  sky.name = 'Sky';
  sky.frustumCulled = false;
  sky.renderOrder = 10;
  return sky;
}
