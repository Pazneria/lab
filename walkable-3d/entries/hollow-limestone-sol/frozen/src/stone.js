import * as THREE from '../vendor/three.module.js';
import { noise, fbm, mix, smooth, clamp, randomGenerator } from './noise.js';
import { POOL, ARCH, FORMATIONS, poolMetric, chamberRadius, mainMetric, inCave, floorHeight, mainCeilingHeight, landingCeilingHeight, entranceCeilingHeight, landingMetric } from './spatial.js';

const rand = randomGenerator(67193);
const stoneBase = new THREE.Color('#c8bc9f');
const wetBase = new THREE.Color('#6b7870');
const color = new THREE.Color();

export function stoneColor(x, y, z, mode = 'wall') {
  const broad = fbm(x * .33, y * .65, z * .33);
  const band = Math.sin(y * 9.8 + .36 * noise(x * .7, z * .7, 3)) * .037;
  const seam = Math.pow(.5 + .5 * Math.sin(y * 2.29 + .16 * Math.sin(x * .4 + z * .31)), 14) * .13;
  const variation = .76 + broad * .34 + band - seam;
  color.copy(stoneBase).multiplyScalar(variation);
  const r = poolMetric(x, z);
  let wet = (1 - smooth(.88, 1.24, r)) * (1 - smooth(.0, .65, y));
  if (mode === 'wall') wet = Math.max(wet, (1 - smooth(-.25, 1.3, y)) * .36);
  if (mode === 'floor') {
    wet = (1 - smooth(.94, 1.24, r)) * .88;
    const edgeAO = smooth(.81, 1.05, mainMetric(x, z));
    color.multiplyScalar(1 - edgeAO * .20);
    for (const f of FORMATIONS) {
      const d = Math.hypot((x - f.x) / f.rx, (z - f.z) / f.rz);
      color.multiplyScalar(.64 + .36 * smooth(.5, 2.1, d));
    }
  }
  if (mode === 'roof') color.multiplyScalar(.77 + .1 * broad);
  color.lerp(wetBase, wet).multiplyScalar(1 - wet * .17);
  return [color.r, color.g, color.b];
}

export function makeStoneTextures() {
  const size = 512;
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const data = ctx.createImageData(size, size);
  // Periodic value fields keep the procedural texture seamless at its edges.
  const grids = [8, 16, 32, 64].map(n => ({ n, values: Float32Array.from({ length: n * n }, () => rand()) }));
  function tiled(x, y, { n, values }) {
    const u = x / size * n, v = y / size * n, ix = Math.floor(u), iy = Math.floor(v);
    const tx = smooth(0, 1, u - ix), ty = smooth(0, 1, v - iy);
    const a = values[(iy % n) * n + ix % n], b = values[(iy % n) * n + (ix + 1) % n];
    const c = values[((iy + 1) % n) * n + ix % n], d = values[((iy + 1) % n) * n + (ix + 1) % n];
    return mix(mix(a, b, tx), mix(c, d, tx), ty);
  }
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const n = tiled(x, y, grids[0]) * .42 + tiled(x, y, grids[1]) * .29 + tiled(x, y, grids[2]) * .19 + tiled(x, y, grids[3]) * .10;
    const pore = rand();
    const v = 205 + (n - .5) * 51 + (pore - .5) * 13 - (pore < .022 ? 32 : 0);
    const p = (x + y * size) * 4;
    data.data[p] = v + 5; data.data[p + 1] = v + 3; data.data[p + 2] = v; data.data[p + 3] = 255;
  }
  ctx.putImageData(data, 0, 0);
  // Small mineral fissures, deliberately much quieter than the modelled strata.
  ctx.strokeStyle = 'rgba(72,70,63,.14)'; ctx.lineWidth = .65;
  for (let i = 0; i < 100; i++) {
    let x = rand() * size, y = rand() * size;
    ctx.beginPath(); ctx.moveTo(x, y);
    for (let j = 0; j < 4; j++) { x += (rand() - .5) * 18; y += rand() * 9; ctx.lineTo(x, y); }
    ctx.stroke();
  }
  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  const bump = new THREE.CanvasTexture(canvas);
  bump.wrapS = bump.wrapT = THREE.RepeatWrapping; bump.anisotropy = 4;
  return { map, bump };
}

export function makeMaterials() {
  const { map, bump } = makeStoneTextures();
  const dry = new THREE.MeshStandardMaterial({ map, bumpMap: bump, bumpScale: .09, roughness: .94, vertexColors: true });
  const shell = dry.clone(); shell.side = THREE.DoubleSide;
  const wet = dry.clone(); wet.roughness = .47; wet.bumpScale = .045;
  return { dry, shell, wet };
}

function geometry(positions, uvs, colors, indices) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  g.setIndex(indices); g.computeVertexNormals(); g.computeBoundingSphere();
  return g;
}
function mesh(geo, material, name) {
  const m = new THREE.Mesh(geo, material); m.name = name;
  m.castShadow = true; m.receiveShadow = true; return m;
}

// Continuous surfaces carry all of the big forms. UVs are measured in metres.
function gridSurface(nu, nv, point, include, reverse = false, mode = 'wall') {
  const p = [], uv = [], col = [], idx = [];
  for (let v = 0; v <= nv; v++) for (let u = 0; u <= nu; u++) {
    const a = point(u / nu, v / nv); p.push(a.x, a.y, a.z);
    uv.push(a.u ?? a.x * .52, a.v ?? a.y * .52);
    col.push(...stoneColor(a.x, a.y, a.z, mode));
  }
  for (let v = 0; v < nv; v++) for (let u = 0; u < nu; u++) {
    if (include && !include((u + .5) / nu, (v + .5) / nv)) continue;
    const a = v * (nu + 1) + u, b = a + 1, c = a + nu + 1, d = c + 1;
    if (reverse) idx.push(a, c, b, b, c, d); else idx.push(a, b, c, b, d, c);
  }
  const result=geometry(p, uv, col, idx);
  const normal=result.attributes.normal;
  // Average the two sides of a wrapped seam without altering its texture UVs.
  for(let v=0;v<=nv;v++){
    const a=v*(nu+1),b=a+nu;
    if(Math.hypot(p[a*3]-p[b*3],p[a*3+1]-p[b*3+1],p[a*3+2]-p[b*3+2])>.00001)continue;
    const nx=normal.getX(a)+normal.getX(b),ny=normal.getY(a)+normal.getY(b),nz=normal.getZ(a)+normal.getZ(b),length=Math.hypot(nx,ny,nz)||1;
    normal.setXYZ(a,nx/length,ny/length,nz/length);normal.setXYZ(b,nx/length,ny/length,nz/length);
  }
  return result;
}

function wallPoint(theta, y) {
  const o = chamberRadius(theta, y);
  const x0 = -1 + (11.2 + o) * Math.sin(theta), z0 = 2 + (13.2 + o) * Math.cos(theta);
  const n = (fbm(x0 * 1.25, y * 1.35, z0 * 1.25) - .5) * .19;
  return { x: x0 + Math.sin(theta) * n, y, z: z0 + Math.cos(theta) * n, u: theta / (Math.PI*2) * 39, v: y * .52 };
}
function wallOpening(theta, y) {
  const p = wallPoint(theta, y);
  if (theta > 2.39 && theta < 3.035 && y < 6.55) return true;
  if (p.x > 1.02 && p.x < 7.36 && p.z > 11.8 && y < 5.8) return true;
  return false;
}

export function buildCavern(materials) {
  const group = new THREE.Group(); group.name = 'Limestone cavern';
  const wall = gridSurface(256, 68, (u, v) => wallPoint(u * Math.PI * 2, -.95 + v * 9.1),
    (u, v) => !wallOpening(u * Math.PI * 2, -.95 + v * 9.1), true);
  group.add(mesh(wall, materials.shell, 'Continuous layered chamber walls'));

  const roof = gridSurface(100, 112, (u, v) => {
    const x = -13.5 + u * 25, z = -12.8 + v * 29.6;
    const y = mainCeilingHeight(x, z);
    return { x, y, z, u: x * .5, v: z * .5 };
  }, (u, v) => {
    const x = -13.5 + u * 25, z = -12.8 + v * 29.6;
    const fissureX = .18 + .19 * Math.sin(z * 1.6) + .07 * Math.cos(z * 4.4);
    const slit = Math.abs(x - fissureX) < .52 + .09 * Math.sin(z * 3.1) && z > -1.5 && z < 5.8;
    return mainMetric(x, z) < 1.075 && !slit;
  }, false, 'roof');
  group.add(mesh(roof, materials.shell, 'Vault with narrow daylight fracture'));

  for (const side of [-1, 1]) {
    const fracture = gridSurface(44, 12, (u, v) => {
      const z = -1.58 + u * 7.47;
      const x = .18 + .19 * Math.sin(z * 1.6) + .07 * Math.cos(z * 4.4) + side * (.53 + .07 * Math.sin(z * 3.1));
      const bottom = mainCeilingHeight(x, z);
      return { x: x + side * .09 * Math.sin(v * 8 + z * 4), y: mix(bottom - .08, 14.4, v), z, u: z * .5, v: v * 1.6 };
    });
    group.add(mesh(fracture, materials.shell, 'Deep ragged daylight fracture'));
  }

  const floor = gridSurface(100, 150, (u, v) => {
    const x = -14 + u * 26, z = -20 + v * 40;
    return { x, y: floorHeight(x, z), z, u: x * .60, v: z * .60 };
  }, (u, v) => inCave(-14 + u * 26, -20 + v * 40, -.3), true, 'floor');
  group.add(mesh(floor, materials.dry, 'Continuous floor and shallow basin'));

  // Three rough walls make the entrance feel recessed, not like a floating spawn.
  for (const side of ['left', 'right', 'back']) {
    let wallStart = 11.7;
    if (side !== 'back') {
      const edgeX = side === 'left' ? 1.0 : 7.4;
      // Begin the recess wall exactly where the broader chamber ends.
      for (let z = 11.7; z < 17.4; z += .04) if (mainMetric(edgeX,z) < 1.01) wallStart = z;
    }
    const g = gridSurface(40, 26, (u, v) => {
      let x, z;
      if (side === 'back') { x = .95 + u * 6.55; z = 19.13; }
      else { x = side === 'left' ? 1.0 : 7.4; z = wallStart + u * (19.13 - wallStart); }
      const y = -.2 + v * (entranceCeilingHeight(x,z) + .2);
      const relief = (fbm((x ?? 0) * .8, y, z * .7) - .5) * .42 + .21 * Math.sin(y * 2.4);
      if (side === 'back') z += relief; else x += relief * (side === 'left' ? -1 : 1);
      return { x, y, z, u: (side === 'back' ? x : z) * .5, v: y * .5 };
    });
    group.add(mesh(g, materials.shell, `Entrance ${side} strata`));
  }
  const entranceRoof = gridSurface(28, 28, (u, v) => {
    const x = .7 + u * 7, z = 12 + v * 7.6;
    return { x, y: entranceCeilingHeight(x,z), z, u: x * .5, v: z * .5 };
  }, null, false, 'roof');
  group.add(mesh(entranceRoof, materials.shell, 'Entrance low eroded ceiling'));

  // Landing alcove opens south through the same broad arch.
  const landingWall = gridSurface(132, 42, (u, v) => {
    const theta = u * Math.PI * 2;
    const mod = .18 * Math.sin(theta * 5) + .13 * Math.sin(theta * 9 + 1);
    const y = .6 + v * 6.2;
    const relief = .20 * Math.sin(y * 2.5) + (noise(theta * 6, y * 1.3, 7) - .5) * .16;
    return { x: 3.6 + (5.1 + mod + relief) * Math.sin(theta), y,
      z: -14.55 + (4.7 + mod + relief) * Math.cos(theta), u: theta * 2.5, v: y * .5 };
  }, (u, v) => !(u < .165 || u > .835) || v > .90, true);
  group.add(mesh(landingWall, materials.shell, 'Landing alcove strata'));
  const landingRoof = gridSurface(48, 48, (u, v) => {
    const x = -2.0 + u * 11.2, z = -19.6 + v * 10.2;
    return { x, y: landingCeilingHeight(x, z), z, u: x * .5, v: z * .5 };
  }, (u, v) => landingMetric(-2 + u * 11.2, -19.6 + v * 10.2) < 1.12, false, 'roof');
  group.add(mesh(landingRoof, materials.shell, 'Landing vault'));
  group.add(buildArch(materials.shell));
  for (let i = 0; i < FORMATIONS.length; i++) group.add(buildFormation(FORMATIONS[i], materials.dry, i));
  return group;
}

function buildArch(material) {
  const group = new THREE.Group(); group.name = 'Broad natural arch';
  const point = (angle, radial, depth) => {
    const t = angle * Math.PI, d = depth * 2 - 1;
    const rx = ARCH.rx + radial * 1.43, ry = ARCH.ry + radial * 1.68;
    const wobble = (noise(Math.cos(t) * 3, Math.sin(t) * 3, d * 2 + 12) - .5) * (.20 + .22 * radial);
    const x = ARCH.x + (rx + wobble) * Math.cos(t) + .10 * Math.sin(t * 4 + d);
    const y = .48 + (ry + wobble) * Math.sin(t) + .04 * Math.sin(t * 11 + d * 2);
    const z = ARCH.z + d * ARCH.thickness * .5 + .17 * Math.sin(t * 5 + radial * 2) + .1 * Math.cos(t * 9 + d);
    return { x, y, z, u: x * .51, v: y * .51 };
  };
  for (const side of [0, 1]) {
    group.add(mesh(gridSurface(96, 12, (u, v) => point(u, v, side)), material, `Arch eroded face ${side}`));
  }
  for (const radial of [0, 1]) {
    group.add(mesh(gridSurface(96, 18, (u, v) => {
      const p = point(u, radial, v); p.u = u * 6.6; p.v = p.z * .6; return p;
    }), material, radial === 0 ? 'Arch worn underside' : 'Arch crown'));
  }
  for (const a of [0, 1]) {
    // End slabs extend both broad piers to the continuous sloped floor.
    const b = new THREE.BoxGeometry(1.55, 1.05, 2.9, 8, 6, 10);
    sculptGeometry(b, a ? ARCH.x - ARCH.rx - .68 : ARCH.x + ARCH.rx + .68, .25, ARCH.z, .12);
    group.add(mesh(b, material, 'Arch pier foot'));
  }
  // Ragged spandrels tie the arch crown into the surrounding ceiling.
  const crown = gridSurface(64, 18, (u, v) => {
    const x = -1.22 + u * 9.65;
    const nx = clamp((x - ARCH.x) / (ARCH.rx + 1.43), -1, 1);
    const lower = .50 + (ARCH.ry + 1.66) * Math.sqrt(Math.max(0, 1 - nx * nx));
    const y = mix(lower, 8.25, v) + (noise(x * 1.1, v * 6, 4) - .5) * .26;
    return { x, y, z: ARCH.z - .95 + .21 * Math.sin(x * 1.6 + v * 5), u: x * .5, v: y * .5 };
  });
  group.add(mesh(crown, material, 'Arch layered spandrel'));
  return group;
}

function sculptGeometry(g, x, y, z, amount = .12) {
  const pos = g.attributes.position, colors = [], uv = [];
  for (let i = 0; i < pos.count; i++) {
    const px = pos.getX(i), py = pos.getY(i), pz = pos.getZ(i);
    const n = (fbm(px * 1.9 + x, py * 2.2 + y, pz * 1.9 + z) - .5) * amount;
    const a = x + px + n, b = y + py + n * .7, c = z + pz + n;
    pos.setXYZ(i, a, b, c); colors.push(...stoneColor(a, b, c)); uv.push(a * .55, b * .55 + c * .23);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.computeVertexNormals(); return g;
}

export function buildFormation(f, material, seed = 0) {
  const group = new THREE.Group(); group.name = `${f.kind} formation`;
  const base = floorHeight(f.x, f.z) - .12;
  const g = gridSurface(56, 50, (u, v) => {
    const theta = u * Math.PI * 2;
    let profile;
    if (f.kind === 'column') profile = .58 + .46 * Math.exp(-v * 8) + .35 * Math.pow(v, 6);
    else if (f.kind === 'boulder') profile = Math.pow(Math.max(0, Math.sin(Math.PI * (.08 + .92 * v))), .55);
    else profile = Math.pow(1 - v, 1.25) * 1.07;
    const fluting = .90 + .07 * Math.sin(theta * 9 + .3 * Math.sin(v * 6)) + .06 * Math.cos(theta * 5 + seed);
    const skirt = .07 * Math.sin(v * 30 - .3 * Math.sin(theta * 3)) * (1 - v);
    const n = (fbm(Math.cos(theta) * 2 + seed, v * 6, Math.sin(theta) * 2) - .5) * .12 * (f.kind === 'column' ? 1 : 1-v);
    const bend = .16 * Math.sin(v * 3 + seed) * v;
    return { x: f.x + f.rx * (profile * fluting + skirt + n) * Math.cos(theta) + bend,
      y: base + v * f.h, z: f.z + f.rz * (profile * fluting + skirt + n) * Math.sin(theta),
      u: u * Math.max(1,Math.round((f.rx + f.rz) * 1.7)), v: v * f.h * .5 };
  }, null, true);
  group.add(mesh(g, material, 'Fluted calcite surface'));
  return group;
}
export function buildPendant(f, ceilingY, material, seed = 1) {
  const g = gridSurface(30, 24, (u, v) => {
    const t = u * Math.PI * 2;
    const profile = Math.pow(1 - v, 1.7) * (.95 + .08 * Math.sin(t * 7 + seed)) + .018 * (1-v);
    const ripple = .023 * Math.sin(v * 35 + t * 3) * (1 - v);
    return { x: f.x + (profile + ripple) * f.rx * Math.cos(t), y: ceilingY - v * f.h,
      z: f.z + (profile + ripple) * f.rz * Math.sin(t), u: u * Math.max(1,Math.round(f.rx * 4)), v: v * f.h * .5 };
  });
  return mesh(g, material, 'Rounded ceiling pendant');
}

export function makeRubble(material) {
  const group = new THREE.Group(); group.name = 'Sediment and fallen limestone';
  const g = new THREE.IcosahedronGeometry(1, 1);
  const pos = g.attributes.position;
  const colors = [], uv = [];
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i), s = .9 + noise(x * 4, y * 4, z * 4) * .2;
    pos.setXYZ(i, x * s, y * s, z * s); colors.push(.73, .69, .59); uv.push(x * .7, z * .7);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.computeVertexNormals();
  const dryInstances = [], wetInstances = [];
  for (const [x,z,s,sy,rot] of [[-3.7,3.5,1.5,.15,.4],[-4.8,-.3,.9,.21,1.1],[.45,1.8,1.2,.18,.7],[-1.9,-2.5,.8,.22,2.2],[-2.5,6.9,1.1,.12,.9],[-5.6,5.2,.65,.25,1.8]]) {
    wetInstances.push({x,y:floorHeight(x,z)+s*.03,z,s,sy,rot});
  }
  for (let i = 0; i < 520; i++) {
    const x = -12.5 + rand() * 24, z = -18.8 + rand() * 37.5;
    if (!inCave(x, z, .35)) continue;
    const r = poolMetric(x, z), outer = mainMetric(x, z);
    if (r > 1.2 && outer < .8 && rand() > .11) continue;
    if (x > 3.8 && x < 5.8 && z < 14 && z > -12 && r > 1.1) continue;
    const s = .045 + Math.pow(rand(), 3) * .42;
    const entry = { x, y: floorHeight(x, z) + s * .14, z, s, sy: .22 + rand() * .30, rot: rand() * 6.28 };
    (r < 1.07 ? wetInstances : dryInstances).push(entry);
  }
  const dummy = new THREE.Object3D();
  for (const [list, mat] of [[dryInstances, material.dry], [wetInstances, material.wet]]) {
    const m = new THREE.InstancedMesh(g, mat, list.length);
    for (let i = 0; i < list.length; i++) {
      const a = list[i]; dummy.position.set(a.x, a.y, a.z); dummy.scale.set(a.s, a.s * a.sy, a.s * .83);
      dummy.rotation.set(.15, a.rot, .06); dummy.updateMatrix(); m.setMatrixAt(i, dummy.matrix);
      color.set(a.y < -.2 ? '#828c77' : '#c3b695'); m.setColorAt(i, color);
    }
    m.castShadow = true; m.receiveShadow = true; group.add(m);
  }
  return group;
}

export function buildShore(material) {
  const g = gridSurface(240, 9, (u, v) => {
    const t = u * Math.PI * 2;
    const wave = 1 + .047 * Math.sin(3 * t + .6) + .026 * Math.sin(7 * t + 1.8) + .022 * Math.cos(5 * t);
    const r = (.925 + v * .19) * wave;
    const x = POOL.x + POOL.rx * Math.cos(t) * r, z = POOL.z + POOL.rz * Math.sin(t) * r;
    const y = floorHeight(x, z) + .010 + .025 * Math.sin(t * 26) * Math.sin(v * Math.PI);
    return { x, y, z, u: u * 20, v: v * .65 };
  }, null, false, 'floor');
  return mesh(g, material, 'Dark eroded waterline shelf');
}
