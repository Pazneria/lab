import * as THREE from '../vendor/three.module.js';
import { clamp, hut, lerp, random, smooth, snowHeight, trail, trailDistance, wind } from './layout.js';

export function makeLandscape(scene, mesh, m) {
  const atmosphere = makeSky(scene);
  makeSnow(scene, m);
  makeMountainChain(scene, -1.39, 1.23, 114, 26, 4571);
  makeMountainChain(scene, -1.63, 0.45, 76, 18, 1083);
  makeMountainChain(scene, 0.07, 1.92, 84, 17, 6637);
  makeMountainChain(scene, 1.72, 4.39, 115, 19, 2133);
  makeMountainChain(scene, 3.25, 4.73, 70, 10.3, 2993);
  makeGlacier(scene);
  makeSurfaceIce(scene, mesh, m);

  const footprints = [];
  bootTrail(footprints, trail, 1);
  bootTrail(footprints, [[-6.45, 8.92], [-6.73, 6.19], [-6.61, 3.0], [-5.91, 0.36]], 0.91);
  groundPatches(scene, m.footprint, footprints, 5, 0.014);

  groundPatches(scene, m.floorShadow, [
    { x: -1.90, z: 4.72, w: 3.2, d: 2.87, angle: 0 },
    { x: 3.47, z: 2.37, w: 1.90, d: 1.29, angle: -0.1 },
    { x: -6.01, z: -0.54, w: 1.3, d: 1.26, angle: 0 },
    { x: -5.08, z: 3.52, w: 1.85, d: 0.95, angle: -0.29 },
    { x: 3.37, z: -4.83, w: 7.9, d: 3.2, angle: 0.43 },
  ], 9, 0.022);

  groundPatches(scene, m.lampGlow, [
    { x: hut.doorX + 0.03, z: 5.20, w: 3.22, d: 4.27, angle: 0.05 },
    { x: 2.22, z: 2.75, w: 4.04, d: 3.44, angle: -0.14 },
  ], 13, 0.021);
  return atmosphere;
}

function makeSky(scene) {
  const sky = new THREE.Mesh(new THREE.SphereGeometry(229, 42, 24), new THREE.ShaderMaterial({
    name: 'blue twilight sky',
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      upper: { value: new THREE.Color('#14264c') },
      middle: { value: new THREE.Color('#4670a5') },
      lower: { value: new THREE.Color('#9db9d5') },
      afterglow: { value: new THREE.Color('#e7b3a4') },
      facing: { value: new THREE.Vector3(-0.49, -0.035, -0.87).normalize() },
      moon: { value: new THREE.Vector3(0.27, 0.25, -0.95).normalize() },
    },
    vertexShader: [
      'varying vec3 ray;',
      'void main() {',
      '  ray = position;',
      '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
      '}',
    ].join('\n'),
    fragmentShader: [
      'uniform vec3 upper, middle, lower, afterglow, facing, moon;',
      'varying vec3 ray;',
      'void main() {',
      '  vec3 r = normalize(ray);',
      '  float y = max(r.y, 0.0);',
      '  vec3 col = mix(lower, middle, smoothstep(-0.035, 0.36, r.y));',
      '  col = mix(col, upper, smoothstep(0.10, 0.86, y));',
      '  float horizon = (r.y - 0.011) * 12.5;',
      '  float rim = pow(max(0.0, dot(r, facing)), 4.0) * exp(-horizon * horizon);',
      '  col = mix(col, afterglow, rim * 0.61);',
      '  float streak = sin(r.x * 13.0 + r.z * 5.9 + 4.0 * r.y);',
      '  float plume = (r.y - 0.078 - streak * 0.011) / 0.009;',
      '  float haze = exp(-plume * plume);',
      '  haze *= pow(max(0.0, sin(r.x * 19.0 + r.z * 7.0 + sin(r.z * 21.0))), 1.5);',
      '  col += haze * vec3(0.045, 0.047, 0.066);',
      '  float lunar = length(r - moon);',
      '  float crescent = (1.0 - smoothstep(0.0034, 0.0045, lunar))',
      '    * smoothstep(0.00355, 0.00436, length(r - normalize(moon + vec3(0.0021, 0.0011, 0.0))));',
      '  col += vec3(1.10, 1.06, 0.91) * crescent + vec3(0.016, 0.025, 0.042) * exp(-63.0 * lunar);',
      '  gl_FragColor = vec4(col, 1.0);',
      '  #include <tonemapping_fragment>',
      '  #include <colorspace_fragment>',
      '}',
    ].join('\n'),
  }));
  sky.frustumCulled = false;
  sky.renderOrder = 19;


  const rng = random(77);
  const points = [];
  const brightness = [];
  for (let i = 0; i < 530; i++) {
    const az = rng() * Math.PI * 2;
    const y = 0.155 + rng() * 0.845;
    const radius = Math.sqrt(1 - y * y);
    points.push(195 * Math.sin(az) * radius, y * 195, -195 * Math.cos(az) * radius);
    brightness.push((0.27 + rng() ** 5 * 0.66) * smooth(0.15, 0.55, y));
  }
  const stars = new THREE.BufferGeometry();
  stars.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  stars.setAttribute('brightness', new THREE.Float32BufferAttribute(brightness, 1));
  const starField = new THREE.Points(stars, new THREE.ShaderMaterial({
    name: 'twilight stars', transparent: true, depthWrite: false,
    vertexShader: [
      'attribute float brightness;',
      'varying float power;',
      'void main(){',
      '  power = brightness;',
      '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
      '  gl_PointSize = 1.5 + brightness * 1.9;',
      '}',
    ].join('\n'),
    fragmentShader: [
      'varying float power;',
      'void main(){',
      '  float d = length(gl_PointCoord - 0.5) * 2.;',
      '  gl_FragColor = vec4(vec3(0.91, 0.94, 1.0), (1.0-smoothstep(0.12, 1.0, d)) * power * 0.72);',
      '}',
    ].join('\n'),
  }));
  starField.renderOrder = 1;
  starField.frustumCulled = false;
  const atmosphere = new THREE.Group();
  atmosphere.name = 'Camera-centered sky';
  atmosphere.add(sky, starField);
  scene.add(atmosphere);
  return atmosphere;
}

function axis(lower, upper) {
  const values = [];
  for (let x = -135; x < lower; x += Math.max(0.23, 0.22 + (lower - x) * 0.081)) values.push(x);
  for (let x = lower; x <= upper; x += 0.19) values.push(x);
  for (let x = upper + 0.19; x <= 135; x += 0.22 + (x - upper) * 0.081) values.push(x);
  return values;
}

function makeSnow(scene, m) {
  const xs = axis(-14.25, 14.25);
  const zs = axis(-11.75, 14.72);
  const pos = [];
  const colors = [];
  const indices = [];
  const uvs = [];
  const snow = new THREE.Color('#f3f8fc');
  const shaded = new THREE.Color('#8aaaca');
  const path = new THREE.Color('#99acb8');
  const color = new THREE.Color();
  for (const z of zs) {
    for (const x of xs) {
      const y = snowHeight(x, z);
      pos.push(x, y, z);
      const lay = wind(x, z);
      uvs.push((x * 0.81 + z * 0.58) * 0.27, lay * 0.29);
      const hills = smooth(0.005, 0.81, y);
      const flecks = Math.sin(lay * 17.0 + Math.cos(x * 2.1) * 0.8) * 0.031
        + Math.sin(x * 7.7 + z * 5.13) * 0.023;
      const ripple = Math.sin(lay * 4.0) * (0.084 + hills * 0.04);
      color.copy(snow).lerp(shaded, clamp(0.23 - y * 0.10 + ripple + flecks, 0, 0.57));
      if (Math.abs(x) < 20 && z > 3 && z < 20) {
        const churn = 1 - smooth(0.17, 0.81, trailDistance(x, z));
        color.lerp(path, churn * (0.17 + flecks));
      }
      const hutShade = 1 - smooth(0.01, 1.27, Math.max(x - 4.27, -x - 4.27, -4.68 - z, z - 1.48));
      color.multiplyScalar(1 - 0.23 * hutShade);
      colors.push(color.r, color.g, color.b);
    }
  }
  for (let z = 0; z < zs.length - 1; z++) {
    for (let x = 0; x < xs.length - 1; x++) {
      const a = z * xs.length + x;
      const b = a + 1;
      const d = a + xs.length;
      indices.push(a, d, b, b, d, d + 1);
    }
  }
  const geometry = indexedGeometry(pos, indices, colors);
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  const material = new THREE.MeshLambertMaterial({
    name: 'wind-shaped snow',
    map: m.snow.map,
    color: m.snow.color,
    vertexColors: true,
  });
  const terrain = new THREE.Mesh(geometry, material);
  terrain.name = 'Wind-packed snow, drifts, apron and trail';
  terrain.receiveShadow = true;
  terrain.renderOrder = 12;
  scene.add(terrain);
}

function indexedGeometry(positions, indices, colors) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  if (colors) geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function makeMountainChain(scene, start, end, baseRadius, height, seed) {
  const rng = random(seed);
  const peaks = [];
  for (let i = 0; i < 15; i++) {
    peaks.push([rng(), 0.025 + rng() * 0.075, 0.26 + rng() ** 1.45 * 0.81]);
  }
  const columns = 189;
  const rows = 15;
  const verts = [];
  const colors = [];
  const triangles = [];
  const lit = new THREE.Color(baseRadius > 93 ? '#bacbdc' : '#c3d7e7');
  const rock = new THREE.Color(baseRadius > 93 ? '#6c89ad' : '#5c779c');
  const dark = new THREE.Color('#435d83');
  const color = new THREE.Color();
  for (let i = 0; i < rows; i++) {
    const d = i / (rows - 1);
    const taper = 0.017 + Math.sin(d * Math.PI) ** 1.23;
    for (let j = 0; j < columns; j++) {
      const t = j / (columns - 1);
      const theta = lerp(start, end, t);
      const endFade = smooth(0, 0.105, t) * smooth(0, 0.105, 1 - t);
      let ridge = 0.06;
      for (const [where, width, peak] of peaks) {
        const tooth = Math.max(0, 1 - Math.abs(t - where) / width);
        ridge = Math.max(ridge, 0.045 + peak * tooth ** 0.68);
        ridge += 0.10 * peak * Math.exp(-(((t - where) / (width * 1.75)) ** 2));
      }
      const grain = Math.sin(t * 401 + d * 8) * 0.026 + Math.sin(t * 823 - d * 3) * 0.021;
      const shear = Math.sin(t * 161 + 1.2 * Math.cos(d * 6)) * (0.04 + 0.065 * (1 - d));
      let h = height * endFade * Math.max(0, (ridge + grain + shear) * taper);
      h += height * 0.07 * Math.sin(d * 7.5 + t * 55) * endFade * Math.sin(d * 3.14);
      const radius = baseRadius + (d - 0.5) * 47 + 4.9 * Math.sin(t * 18) + 2.35 * Math.sin(t * 63.1);
      verts.push(Math.sin(theta) * radius, h - 0.54, -Math.cos(theta) * radius);
      const gullies = Math.sin(t * 281.0 + d * 3.1) * 0.25
        + Math.sin(t * 101.0 - 0.8 * Math.cos(d * 15.0)) * 0.24
        + Math.sin(t * 573 + d * 7) * 0.097;
      const snowLine = smooth(0.13, 0.86, h / height);
      const stone = smooth(-0.07, 0.31, gullies - snowLine * 0.37) * (0.69 + 0.21 * taper);
      color.copy(lit).lerp(rock, stone).lerp(dark, Math.max(0, grain * 1.6 + shear * 1.5) * stone);
      colors.push(color.r, color.g, color.b);
      if (i === rows - 1 || j === columns - 1) continue;
      const a = i * columns + j;
      triangles.push(a, a + 1, a + columns, a + 1, a + columns + 1, a + columns);
    }
  }
  const mesh = new THREE.Mesh(indexedGeometry(verts, triangles, colors),
    new THREE.MeshLambertMaterial({ name: 'glacial cirques', vertexColors: true }));
  mesh.name = 'Distant mountain range';
  mesh.renderOrder = 15;
  scene.add(mesh);
}

function makeGlacier(scene) {
  const rng = random(8931);
  const positions = [];
  const triangles = [];
  const colors = [];
  const band = [
    new THREE.Color('#6388aa'), new THREE.Color('#799ebb'), new THREE.Color('#9cbbd0'),
    new THREE.Color('#5b7c9d'), new THREE.Color('#b5d0df'),
  ];
  const x0 = -50;
  const count = 171;
  for (let i = 0; i < count; i++) {
    const x = x0 + i * 0.57;
    const t = i / (count - 1);
    const fade = smooth(0, 0.23, t) * smooth(0, 0.19, 1 - t);
    const z = -42.7 + Math.sin(t * 6 + 0.2) * 3.0 + Math.sin(t * 22) * 0.72;
    const rim = fade * (1.2 + Math.sin(t * 7.9) * 0.43 + 1.2 * rng() ** 1.6);
    positions.push(x, -0.32, z + 0.26, x + (rng() - 0.5) * 0.42, rim, z - 0.51,
      x + 0.10, rim * 0.86 + 0.55 * fade, z - 7.4 - rng() * 3.0,
      x, 1.22 * fade, z - 19);
    for (let j = 0; j < 4; j++) {
      const c = band[j === 0 ? 3 : j > 1 ? 4 : Math.floor(rng() * 4)];
      colors.push(c.r, c.g, c.b);
    }
    if (i === count - 1) continue;
    const k = i * 4;
    for (let j = 0; j < 3; j++) {
      const a = k + j;
      triangles.push(a, a + 4, a + 1, a + 4, a + 5, a + 1);
    }
  }
  const material = new THREE.MeshLambertMaterial({ name: 'distant glacier shelf', vertexColors: true });
  const mesh = new THREE.Mesh(indexedGeometry(positions, triangles, colors), material);
  mesh.renderOrder = 14;
  scene.add(mesh);
}

function groundPatches(scene, material, patches, divisions, offset) {
  const positions = [];
  const uvs = [];
  const indices = [];
  const size = divisions + 1;
  for (const { x, z, w, d, angle } of patches) {
    const start = positions.length / 3;
    const cs = Math.cos(angle);
    const sn = Math.sin(angle);
    for (let v = 0; v <= divisions; v++) {
      for (let u = 0; u <= divisions; u++) {
        const lx = w * (u / divisions - 0.5);
        const lz = d * (v / divisions - 0.5);
        const xx = x + lx * cs - lz * sn;
        const zz = z + lx * sn + lz * cs;
        positions.push(xx, snowHeight(xx, zz) + offset, zz);
        uvs.push(u / divisions, 1 - v / divisions);
        if (u !== divisions && v !== divisions) {
          const i = start + v * size + u;
          indices.push(i, i + size, i + 1, i + 1, i + size, i + size + 1);
        }
      }
    }
  }
  const geometry = indexedGeometry(positions, indices);
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  const mesh = new THREE.Mesh(geometry, material);
  mesh.renderOrder = material.userData.renderOrder ?? 3;
  scene.add(mesh);
}

function bootTrail(patches, waypoints, scale) {
  const rng = random(231 + Math.floor(scale * 100));
  let lead = 0;
  let step = 0;
  for (let i = 1; i < waypoints.length; i++) {
    const [x, z] = waypoints[i - 1];
    const [ex, ez] = waypoints[i];
    const length = Math.hypot(ex - x, ez - z);
    const dx = (ex - x) / length;
    const dz = (ez - z) / length;
    for (; lead < length; lead += (0.38 + rng() * 0.15) * scale) {
      const offset = (0.105 + rng() * 0.065) * (step++ % 2 ? -1 : 1);
      patches.push({
        x: x + dx * lead - offset * dz, z: z + dz * lead + offset * dx,
        w: scale * (0.27 + rng() * 0.04), d: scale * (0.42 + rng() * 0.06),
        angle: Math.atan2(dx, -dz) + (rng() - 0.5) * 0.30,
      });
    }
    lead -= length;
  }
}

function makeSurfaceIce(scene, mesh, m) {
  const rng = random(639);
  const positions = [];
  const colors = [];
  const indices = [];
  const deep = new THREE.Color('#688eae');
  const scuffed = new THREE.Color('#acc6d7');
  const edge = new THREE.Color('#d8e8f1');
  const color = new THREE.Color();
  const spot = [[2.63, 5.08, 1.63, 0.54, -0.41], [5.39, 1.25, 1.39, 0.55, 0.32],
    [-5.95, 5.15, 0.88, 0.27, -0.52], [4.48, -4.78, 1.74, 0.48, -0.17]];
  const sides = 35;
  const rings = 7;
  for (const [x, z, w, d, angle] of spot) {
    const base = positions.length / 3;
    const cs = Math.cos(angle);
    const sn = Math.sin(angle);
    for (let j = 0; j <= rings; j++) {
      const r = (j + 0.013) / (rings + 0.013);
      for (let i = 0; i <= sides; i++) {
        const a = i / sides * Math.PI * 2;
        const rough = 1 + 0.12 * Math.sin(a * 3 + r) + 0.098 * Math.cos(a * 7 - r);
        const u = Math.cos(a) * r * w * rough;
        const v = Math.sin(a) * r * d * rough;
        const xx = x + u * cs - v * sn;
        const zz = z + u * sn + v * cs;
        positions.push(xx, snowHeight(xx, zz) + 0.029 + (1 - r) * 0.003, zz);
        color.copy(deep).lerp(scuffed, clamp(rng() * 0.32 + Math.cos(u * 3 + v * 15) * 0.16, 0, 1));
        color.lerp(edge, smooth(0.64, 1, r) * (0.84 + rng() * 0.16));
        colors.push(color.r, color.g, color.b);
        if (i === sides || j === rings) continue;
        const k = base + j * (sides + 1) + i;
        const p = k + sides + 1;
        indices.push(k, k + 1, p, k + 1, p + 1, p);
      }
    }
    const as = mesh.at('ice scratches');
    for (let i = 0; i < 16; i++) {
      const lx = (rng() - 0.5) * w * 1.48;
      const lz = (rng() - 0.5) * d * 1.41;
      const length = 0.08 + rng() * 0.26;
      const points = [];
      for (let j = 0; j < 4; j++) {
        const u = lx + (j / 3 - 0.5) * length;
        const v = lz + j * (rng() - 0.35) * 0.055;
        const xx = x + u * cs - v * sn;
        const zz = z + u * sn + v * cs;
        points.push([xx, snowHeight(xx, zz) + 0.034, zz]);
      }
      as.line(i % 3 === 0 ? m.iceDeep : m.frost, points, 0.0017 + rng() * 0.0007, 4);
    }
  }
  const mat = new THREE.MeshStandardMaterial({
    name: 'wind-polished ice', vertexColors: true, roughness: 0.28, metalness: 0.08,
  });
  const patch = new THREE.Mesh(indexedGeometry(positions, indices, colors), mat);
  patch.receiveShadow = true;
  scene.add(patch);
}
