// Bay 3 maintenance bay: structure, CMG-4 gimbal machine, service alcove, walkway, stairs, lights, space view.
import * as THREE from 'three';
import * as T from './tex.js';
import {
  box, boxMM, cyl, torus, tube, rod, bolts, push, xf, pushMatrix, popMatrix, beginBuckets, endBuckets, flushAll,
  solid, solidC, surface, circles,
} from './geo.js';

const PI = Math.PI;

function makeMaterials(maxAniso) {
  T.setAniso(Math.min(8, maxAniso));
  const std = (o, uvs = null, ud = {}) => { const m = new THREE.MeshStandardMaterial(o); m.userData = { uvs, ...ud }; return m; };
  const pbrMat = (tex, uvs, extra = {}) => std({ map: tex.map, roughnessMap: tex.data, metalnessMap: tex.data, bumpMap: tex.data, bumpScale: 1.2, metalness: 1, roughness: 1, ...extra }, uvs);
  const M = {};
  M.wall = pbrMat(T.pbr(1024, 11, T.paintedMetal({ base: '#a4adb1', light: '#bcc4c7', dark: '#8a9397', seams: 4, rivets: 10, rough: 0.5, grime: 0.45, mottle: 0.03 })), 1 / 3, { bumpScale: 2.2 });
  M.slate = pbrMat(T.pbr(512, 12, T.paintedMetal({ base: '#4a5560', light: '#65717b', dark: '#343c44', rough: 0.5, chips: 0.8 })), 1);
  M.yellow = pbrMat(T.pbr(512, 13, T.paintedMetal({ base: '#c8941c', light: '#ddb03c', dark: '#946b12', chip: '#a3a7aa', rough: 0.48, chips: 0.45, grime: 0.7 })), 1);
  M.white = pbrMat(T.pbr(1024, 14, T.paintedMetal({ base: '#cfcdc4', light: '#e2e0d8', dark: '#a19f97', rough: 0.45, chips: 0.7, grime: 0.6 })), 1);
  M.ceil = M.wall.clone(); M.ceil.color.set(0x8c9296); M.ceil.userData = { uvs: 1 / 3 };
  M.whiteDS = M.white.clone(); M.whiteDS.side = THREE.DoubleSide; M.whiteDS.userData = { uvs: 1 };
  M.slateDS = M.slate.clone(); M.slateDS.side = THREE.DoubleSide; M.slateDS.userData = { uvs: 1 };
  M.cart = pbrMat(T.pbr(512, 15, T.paintedMetal({ base: '#8a2c22', light: '#a5412f', dark: '#5f1d17', rough: 0.4, chips: 0.6 })), 1.5);
  M.floor = pbrMat(T.pbr(1024, 21, T.floorPaint), 1 / 3, { bumpScale: 2.0 });
  M.machined = pbrMat(T.pbr(512, 31, T.machinedPaint), 1, { bumpScale: 0.3, envMapIntensity: 1.4 });
  M.gun = pbrMat(T.pbr(512, 41, T.gunmetalPaint), 1);
  M.hazard = pbrMat(T.pbr(256, 51, T.hazardPaint), 2);
  M.hazardFloor = std({ map: M.hazard.map, roughness: 0.6, metalness: 0.05, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  M.line = std({ color: '#b98f22', roughness: 0.75, metalness: 0, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  M.grate = std({ color: '#8b9095', metalness: 0.85, roughness: 0.42, alphaMap: T.gratingAlpha(), alphaTest: 0.5, side: THREE.DoubleSide }, 2);
  M.rubber = std({ color: '#141516', roughness: 0.82, metalness: 0 });
  M.rubberRed = std({ color: '#6a2219', roughness: 0.72, metalness: 0 });
  M.copper = std({ color: '#c07a3e', roughness: 0.3, metalness: 1, envMapIntensity: 1.3 });
  M.glass = std({ color: '#b9d6e6', roughness: 0.03, metalness: 0.1, transparent: true, opacity: 0.16, depthWrite: false, envMapIntensity: 2.2 }, null, { noShadow: true, noReceive: true, order: 5 });
  M.cableBlack = std({ color: '#1b1c1d', roughness: 0.6, metalness: 0 });
  M.cableOrange = std({ color: '#c4561c', roughness: 0.55, metalness: 0 });
  M.cableBlue = std({ color: '#2a5a8c', roughness: 0.55, metalness: 0 });
  M.cableGray = std({ color: '#7f8386', roughness: 0.6, metalness: 0 });
  M.pipeBlue = std({ color: '#2f5e88', roughness: 0.45, metalness: 0.3 });
  M.pipeGreen = std({ color: '#3f6b46', roughness: 0.5, metalness: 0.3 });
  M.bin = std({ color: '#2d6aa0', roughness: 0.55, metalness: 0 });
  M.binOr = std({ color: '#c46a1c', roughness: 0.55, metalness: 0 });
  M.dark = std({ color: '#0d0e10', roughness: 0.7, metalness: 0.2 });
  const glow = (c, k) => { const m = new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k) }); m.userData = { noShadow: true }; return m; };
  M.lamp = glow('#fff6ea', 2.4);
  M.amberGlow = glow('#ffb35a', 3.0);
  M.cyanGlow = glow('#7fe4ff', 3.0);
  M.redGlow = glow('#ff3020', 3.0);
  M.greenGlow = glow('#40ff70', 2.0);
  M.peg = std({ map: T.shadowBoard(), roughness: 0.7, metalness: 0.1 });
  M.ao = new THREE.MeshBasicMaterial({ color: 0x000000, alphaMap: T.blobTex(), transparent: true, opacity: 0.5, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
  M.ao.userData = { noShadow: true, noReceive: true, order: 2 };
  return M;
}

const LABELS = [
  { text: 'CMG-4  GIMBAL ASSEMBLY', bg: '#1f3550', fg: '#f2f2ea', border: '#d8dde2' },
  { text: 'CAUTION — ROTATING MASS', bg: '#d9a51c', fg: '#141414', stripes: true, size: 40 },
  { text: 'NO STEP', bg: '#f0ede4', fg: '#b3221a', border: '#b3221a' },
  { text: 'SERVICE ALCOVE 3B', bg: '#2b2f33', fg: '#f0f0ea', border: '#d9a51c' },
  { text: 'INSPECTION WALKWAY\nMAX LOAD 400 KG', bg: '#d9a51c', fg: '#141414' },
  { text: 'BAY 3 · MAINTENANCE', bg: '#2b2f33', fg: '#e8e6dc', size: 58 },
  { text: 'SLOW-ROLL TEST\nIN PROGRESS', bg: '#a8201a', fg: '#ffffff', border: '#ffffff' },
  { text: 'COOLANT RETURN  ▶', bg: '#2f5e88', fg: '#ffffff' },
  { text: 'N2 PURGE  ▶', bg: '#3f6b46', fg: '#ffffff' },
  { text: 'PRESSURE DOOR\nSEALED · CYCLE AT LOCK 2', bg: '#161616', fg: '#e3b02a', border: '#e3b02a' },
  { text: 'VIEWPORT 3-A\nPRESSURE GLASS — DO NOT STRIKE', bg: '#2b2f33', fg: '#e8e6dc' },
  { text: 'LEVEL 2  ▲  WALKWAY', bg: '#1f3550', fg: '#f2f2ea' },
  { text: 'KEEP CLEAR', fg: '#d9a51c', size: 76 },
  { text: 'PANEL 3-C REMOVED\nTAG #4471', bg: '#f0ede4', fg: '#1a1a1a', border: '#b3221a' },
  { text: 'PDU-3 · 120 VDC', bg: '#d9a51c', fg: '#141414' },
  { text: 'INSPECTION POINT\nCMG-4 UPPER BEARING', bg: '#1f3550', fg: '#f2f2ea' },
  { text: 'BAY 3', fg: '#c9c4b4', size: 110 },
  { text: 'EMERGENCY O2 · SUITS', bg: '#f0ede4', fg: '#a8201a', border: '#a8201a' },
  { text: 'TORQUE 85 N·m\nCROSS PATTERN', bg: '#f0ede4', fg: '#1a1a1a' },
  { text: 'LOCKOUT · AUTHORIZED ONLY', bg: '#a8201a', fg: '#ffffff', size: 38 },
];

export function buildBay(scene, renderer) {
  const M = makeMaterials(renderer.capabilities.getMaxAnisotropy());
  M.label = new THREE.MeshStandardMaterial({ map: T.labelAtlas(LABELS), roughness: 0.6, metalness: 0, alphaTest: 0.5, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  M.label.userData = { noShadow: true };

  function label(i, w, h, x, y, z, ry = 0, rx = 0) {
    const g = new THREE.PlaneGeometry(w, h), uv = g.attributes.uv;
    const c = i % 4, r = Math.floor(i / 4), u0 = c / 4 + 0.001, u1 = (c + 1) / 4 - 0.001, v1 = 1 - r / 8 - 0.001, v0 = 1 - (r + 1) / 8 + 0.001;
    for (let k = 0; k < uv.count; k++) uv.setXY(k, u0 + uv.getX(k) * (u1 - u0), v0 + uv.getY(k) * (v1 - v0));
    push(M.label, xf(g, x, y, z, rx, ry, 0));
  }
  const ao = (x, z, sx, sz, y = 0.004) => push(M.ao, xf(new THREE.PlaneGeometry(sx, sz), x, y, z, -PI / 2, 0, 0));

  // ------------------------------------------------------------------ hull shell
  boxMM(M.floor, -12, 12, -0.1, 0, -8, 8);
  boxMM(M.floor, 12, 17, -0.1, 0, -3, 3);
  boxMM(M.wall, -12, 12, 0, 6, -8.12, -8);
  boxMM(M.ceil, -12, 12, 8, 8.12, -6, 6);
  box(M.ceil, 24, 0.12, 2.83, 0, 7.04, -7.04, -PI / 4);
  box(M.ceil, 24, 0.12, 2.83, 0, 7.04, 7.04, PI / 4);
  // front wall with viewport opening x[-7.35,-1.65] y[1.1,3.7]
  boxMM(M.wall, -12, -7.35, 0, 6, 8, 8.12);
  boxMM(M.wall, -1.65, 12, 0, 6, 8, 8.12);
  boxMM(M.wall, -7.35, -1.65, 0, 1.1, 8, 8.12);
  boxMM(M.wall, -7.35, -1.65, 3.7, 6, 8, 8.12);
  const sideWall = (x, notch) => {
    const pts = notch ? [[-8, 0], [-3, 0], [-3, 3.4], [3, 3.4], [3, 0], [8, 0], [8, 6], [6, 8], [-6, 8], [-8, 6]] : [[-8, 0], [8, 0], [8, 6], [6, 8], [-6, 8], [-8, 6]];
    const s = new THREE.Shape(); s.moveTo(...pts[0]); pts.slice(1).forEach((p) => s.lineTo(...p));
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: false });
    g.rotateY(-PI / 2); g.translate(x, 0, 0);
    push(M.wall, g, 1 / 3);
  };
  sideWall(-12, false); sideWall(12.12, true);

  // ribs: I-beam frames following the hull profile
  const prof = [[-8, 0], [-8, 6], [-6, 8], [6, 8], [8, 6], [8, 0]];
  const seg = (mat, x, z1, y1, z2, y2, w, t, inset) => {
    const dz = z2 - z1, dy = y2 - y1, L = Math.hypot(dz, dy), th = Math.atan2(dz, dy);
    let nz = -dy / L, ny = dz / L; const mz = (z1 + z2) / 2, my = (y1 + y2) / 2;
    if (nz * (0 - mz) + ny * (4 - my) < 0) { nz = -nz; ny = -ny; }
    const off = inset + t / 2;
    box(mat, w, L + 0.02, t, x, my + ny * off, mz + nz * off, th);
  };
  const ribXs = [-10.5, -7.5, -4.5, -1.5, 1.5, 4.5, 7.5, 10.5];
  for (const x of ribXs) {
    for (let i = 0; i < prof.length - 1; i++) {
      const [z1, y1] = prof[i], [z2, y2] = prof[i + 1];
      seg(M.slate, x, z1, y1, z2, y2, 0.12, 0.38, 0);
      seg(M.slate, x, z1, y1, z2, y2, 0.34, 0.05, 0.38);
      seg(M.slate, x, z1, y1, z2, y2, 0.36, 0.03, 0.0);
    }
    for (const s of [-1, 1]) {
      box(M.slate, 0.02, 0.6, 0.6, x + 0.07, 6.1, s * 7.4, s > 0 ? PI / 4 : -PI / 4); // knee gusset
      box(M.slate, 0.02, 0.6, 0.6, x - 0.07, 6.1, s * 7.4, s > 0 ? PI / 4 : -PI / 4);
      solid(x - 0.18, x + 0.18, 0, 6.5, s > 0 ? 7.6 : -8, s > 0 ? 8 : -7.6);
      for (const y of [0.9, 2.4, 4.4]) bolts(M.machined, 4, 0.1, x, y, s * 7.6, 'z', 0.018, 0.03, PI / 4);
    }
  }
  // side wall stiffeners
  for (const z of [-6.5, -4.5, 4.5, 6.5, -1.5, 1.5]) {
    if (Math.abs(z) > 3.2) { boxMM(M.slate, 11.75, 12, 0, 6, z - 0.12, z + 0.12); }
    boxMM(M.slate, -12, -11.75, 0, 6, z - 0.12, z + 0.12);
  }
  // ceiling light fixtures
  for (const x of [-9, -6, -3, 0, 3, 6, 9]) for (const z of [-3.2, 3.2]) {
    boxMM(M.gun, x - 0.9, x + 0.9, 7.82, 8, z - 0.24, z + 0.24);
    boxMM(M.lamp, x - 0.8, x + 0.8, 7.8, 7.82, z - 0.15, z + 0.15);
  }
  // walls collision
  solid(-12.6, 12.6, 0, 9, -8.6, -7.6);
  solid(-12.6, 12.6, 0, 9, 7.6, 8.6);
  solid(-12.6, -11.72, 0, 9, -8.6, 8.6);
  solid(11.75, 12.6, 0, 9, -8.6, -3.25);
  solid(11.75, 12.6, 0, 9, 3.25, 8.6);
  solid(11.75, 12.6, 3.0, 9, -3.3, 3.3);
  surface(-12, 17, -8, 8, 0, 0.3);

  // ------------------------------------------------------------------ viewport
  boxMM(M.gun, -7.62, -7.35, 0.85, 3.95, 7.6, 8.75);
  boxMM(M.gun, -1.65, -1.38, 0.85, 3.95, 7.6, 8.75);
  boxMM(M.gun, -7.62, -1.38, 0.85, 1.1, 7.55, 8.75);
  boxMM(M.gun, -7.62, -1.38, 3.7, 3.95, 7.6, 8.75);
  boxMM(M.gun, -4.62, -4.38, 1.1, 3.7, 7.9, 8.75);
  for (const z of [8.3, 8.58]) {
    boxMM(M.glass, -7.35, -4.62, 1.1, 3.7, z, z + 0.02);
    boxMM(M.glass, -4.38, -1.65, 1.1, 3.7, z, z + 0.02);
    for (const [a, b] of [[-7.35, -4.62], [-4.38, -1.65]]) { // rubber gaskets
      boxMM(M.rubber, a, b, 1.1, 1.16, z - 0.02, z + 0.04); boxMM(M.rubber, a, b, 3.64, 3.7, z - 0.02, z + 0.04);
      boxMM(M.rubber, a, a + 0.06, 1.1, 3.7, z - 0.02, z + 0.04); boxMM(M.rubber, b - 0.06, b, 1.1, 3.7, z - 0.02, z + 0.04);
    }
  }
  for (let i = 0; i < 14; i++) { // frame bolts
    const x = -7.5 + i * 0.47;
    cyl(M.machined, 0.025, 0.025, 0.03, x, 1.0, 7.56, 'z', 6); cyl(M.machined, 0.025, 0.025, 0.03, x, 3.82, 7.59, 'z', 6);
  }
  label(10, 1.6, 0.4, -4.5, 4.2, 7.97, PI);
  boxMM(M.slate, -7.7, -1.3, 0.75, 0.85, 7.4, 7.6); // handrail ledge

  // ------------------------------------------------------------------ cable trays & pipes
  const tray = (x0, x1, y, z, cables) => {
    boxMM(M.gun, x0, x1, y, y + 0.025, z - 0.22, z + 0.22);
    boxMM(M.gun, x0, x1, y, y + 0.12, z - 0.23, z - 0.21); boxMM(M.gun, x0, x1, y, y + 0.12, z + 0.21, z + 0.23);
    cables.forEach((m, i) => cyl(m, 0.028, 0.028, x1 - x0, (x0 + x1) / 2, y + 0.055 + (i % 2) * 0.04, z - 0.15 + i * 0.06, 'x', 8));
  };
  const CAB = [M.cableBlack, M.cableOrange, M.cableBlack, M.cableGray, M.cableBlue, M.cableBlack];
  tray(-11.7, 11.7, 7.36, -4.2, CAB); tray(-11.7, 11.7, 7.36, 4.2, CAB);
  for (const x of ribXs) for (const z of [-4.2, 4.2]) rod(M.machined, [x + 0.15, 7.36, z], [x + 0.15, 7.62, z], 0.012, 0.012, true, 6);
  tray(-11.7, 11.7, 5.85, -7.35, CAB.slice(0, 4)); tray(-11.7, 11.7, 5.75, 7.35, CAB.slice(1, 5));
  // pipes along back wall (below walkway) dropping into a floor trench toward the machine
  const pipe = (m, r, y, z) => { cyl(m, r, r, 21, -0.5, y, z, 'x', 14); };
  pipe(M.pipeBlue, 0.075, 2.25, -7.4); pipe(M.pipeGreen, 0.05, 2.62, -7.42); pipe(M.machined, 0.045, 2.92, -7.42);
  for (const x of ribXs.slice(1)) for (const y of [2.25, 2.62, 2.92]) torus(M.gun, y === 2.25 ? 0.085 : 0.06, 0.012, x + 0.25, y, -7.4, 'x', PI * 2, 16);
  label(7, 0.8, 0.2, -6, 2.25, -7.31); label(8, 0.8, 0.2, 6, 2.62, -7.36);
  // drop to trench at x=2.45
  tube(M.pipeBlue, [[2.2, 2.25, -7.4], [2.45, 2.0, -7.4], [2.45, 0.6, -7.4], [2.45, -0.05, -7.2]], 0.075, 24, 12);
  tube(M.pipeGreen, [[2.0, 2.62, -7.42], [2.6, 2.3, -7.42], [2.62, 0.6, -7.42], [2.62, -0.05, -7.25]], 0.05, 24, 10);
  // valves with handwheels
  for (const [x, y, m] of [[2.45, 1.4, M.pipeBlue], [2.62, 1.0, M.pipeGreen]]) {
    cyl(M.gun, 0.11, 0.11, 0.22, x, y, -7.4, 'y', 12);
    rod(M.machined, [x, y, -7.4], [x, y, -7.12], 0.015, 0.015, true, 6);
    torus(M.cart, 0.12, 0.016, x, y, -7.1, 'z', PI * 2, 20);
  }
  // floor trench with grating cover (machine services)
  boxMM(M.dark, 2.15, 2.85, -0.35, -0.3, -7.6, -2.1);
  boxMM(M.gun, 2.1, 2.15, -0.35, 0.0, -7.6, -2.1); boxMM(M.gun, 2.85, 2.9, -0.35, 0.0, -7.6, -2.1);
  boxMM(M.grate, 2.15, 2.85, -0.03, -0.005, -7.6, -2.1);
  cyl(M.pipeBlue, 0.07, 0.07, 5.2, 2.4, -0.18, -4.8, 'z', 10); cyl(M.pipeGreen, 0.045, 0.045, 5.2, 2.62, -0.2, -4.8, 'z', 10);
  cyl(M.rubber, 0.04, 0.04, 5.2, 2.28, -0.22, -4.8, 'z', 8);

  // trench-to-plinth service hoses, conduit drop to the PDU, floor tie-downs
  tube(M.rubber, [[2.35, -0.12, -2.2], [2.3, 0.08, -1.95], [1.95, 0.3, -1.55], [1.6, 0.55, -1.25]], 0.045, 24, 10);
  tube(M.pipeBlue, [[2.6, -0.12, -2.2], [2.55, 0.1, -1.9], [2.1, 0.32, -1.38], [1.75, 0.55, -1.05]], 0.05, 24, 10);
  for (const [x, z] of [[1.6, -1.25], [1.75, -1.05]]) cyl(M.machined, 0.07, 0.07, 0.1, x, 0.53, z, 'y', 12);
  rod(M.gun, [6.6, 5.85, -7.35], [6.6, 2.1, -7.35], 0.04, 0.04, true, 10); rod(M.gun, [6.75, 5.85, -7.35], [6.75, 2.1, -7.35], 0.03, 0.03, true, 10);
  for (const y of [2.6, 3.4, 4.4, 5.2]) boxMM(M.machined, 6.5, 6.85, y, y + 0.04, -7.42, -7.3);
  for (const [x, z] of [[-6, 0], [-6, -3], [6, 0], [6, 3], [-3, 5], [3, -4.5], [8.5, -1], [-8.5, 1.5]]) {
    boxMM(M.gun, x - 0.12, x + 0.12, 0, 0.012, z - 0.12, z + 0.12); torus(M.machined, 0.06, 0.012, x, 0.014, z, 'y', PI * 2, 14);
  }
  // hull access panels (front wall faces -z, back wall above walkway faces +z); one hinged open on a cable riser
  const accessPanel = (x, y, z, dir, open) => {
    const w = 0.9, h = 1.2, zf = z + dir * 0.02;
    boxMM(M.gun, x - w / 2 - 0.05, x + w / 2 + 0.05, y - 0.05, y + h + 0.05, Math.min(z, zf), Math.max(z, zf));
    if (open) {
      boxMM(M.dark, x - w / 2, x + w / 2, y, y + h, Math.min(zf, zf + dir * 0.005), Math.max(zf, zf + dir * 0.005));
      [M.cableOrange, M.cableBlack, M.cableBlue, M.cableBlack, M.cableGray, M.cableOrange, M.cableBlack].forEach((m, i) =>
        cyl(m, 0.022, 0.022, h + 0.1, x - 0.3 + i * 0.1, y + h / 2, zf + dir * 0.05, 'y', 8));
      for (const yy of [y + 0.25, y + 0.9]) boxMM(M.machined, x - 0.38, x + 0.38, yy, yy + 0.03, Math.min(zf, zf + dir * 0.09), Math.max(zf, zf + dir * 0.09));
      boxMM(M.gun, x - 0.12, x + 0.12, y + 0.45, y + 0.7, Math.min(zf, zf + dir * 0.12), Math.max(zf, zf + dir * 0.12));
      const g = new THREE.BoxGeometry(w, h, 0.03); g.translate(w / 2, 0, 0);
      xf(g, x - w / 2, y + h / 2, zf + dir * 0.02, 0, dir > 0 ? -2.85 : PI + 2.85, 0); push(M.slate, g, 1);
    } else {
      boxMM(M.slate, x - w / 2, x + w / 2, y, y + h, Math.min(zf, zf + dir * 0.03), Math.max(zf, zf + dir * 0.03));
      for (const [bx, by] of [[-1, 0], [1, 0], [-1, 1], [1, 1]]) cyl(M.machined, 0.02, 0.02, 0.06, x + bx * (w / 2 - 0.06), y + 0.06 + by * (h - 0.12), zf + dir * 0.03, 'z', 6);
      boxMM(M.machined, x - 0.12, x + 0.12, y + h * 0.5 - 0.02, y + h * 0.5 + 0.02, Math.min(zf, zf + dir * 0.07), Math.max(zf, zf + dir * 0.07));
    }
  };
  accessPanel(6.0, 0.6, 7.98, -1, true); accessPanel(9.0, 0.6, 7.98, -1, false); accessPanel(-9.0, 0.6, 7.98, -1, false);
  accessPanel(-3.0, 4.15, -8.0, 1, false); accessPanel(3.0, 4.15, -8.0, 1, true); accessPanel(6.0, 4.15, -8.0, 1, false);
  label(13, 0.48, 0.14, 6.0, 1.95, 7.94, PI);
  // ------------------------------------------------------------------ overhead crane
  boxMM(M.yellow, -11, 11, 6.95, 7.3, -0.035, 0.035);
  boxMM(M.yellow, -11, 11, 6.9, 6.95, -0.15, 0.15); boxMM(M.yellow, -11, 11, 7.3, 7.35, -0.15, 0.15);
  for (const x of ribXs) { boxMM(M.slate, x - 0.06, x + 0.06, 7.35, 7.62, -0.12, 0.12); boxMM(M.slate, x - 0.2, x + 0.2, 7.35, 7.38, -0.18, 0.18); }
  boxMM(M.slate, -0.4, 0.4, 6.95, 7.25, -0.24, -0.18); boxMM(M.slate, -0.4, 0.4, 6.95, 7.25, 0.18, 0.24);
  for (const x of [-0.25, 0.25]) for (const z of [-0.12, 0.12]) cyl(M.machined, 0.06, 0.06, 0.04, x, 6.98, z, 'z', 12);
  boxMM(M.slate, -0.3, 0.3, 6.55, 6.95, -0.22, 0.22);
  cyl(M.yellow, 0.2, 0.2, 0.62, 0, 6.42, 0, 'x', 20);
  label(19, 0.56, 0.14, 0, 6.75, 0.225);
  for (let i = 0; i < 18; i++) torus(M.gun, 0.035, 0.009, 0, 6.2 - i * 0.065, 0, i % 2 ? 'x' : 'z', PI * 2, 10);
  boxMM(M.yellow, -0.12, 0.12, 4.95, 5.12, -0.08, 0.08);
  torus(M.machined, 0.09, 0.022, 0, 4.82, 0, 'z', PI * 1.4, 16, { spin: PI * 0.8 });

  // ------------------------------------------------------------------ CMG-4 machine
  cyl(M.slate, 2.1, 2.16, 0.45, 0, 0.225, 0, 'y', 8, { ry: PI / 8 });
  cyl(M.hazard, 2.17, 2.17, 0.14, 0, 0.31, 0, 'y', 8, { ry: PI / 8, open: true });
  cyl(M.gun, 1.95, 1.95, 0.04, 0, 0.47, 0, 'y', 40);
  bolts(M.machined, 28, 1.85, 0, 0.5, 0, 'y', 0.028, 0.04);
  circles.push({ x: 0, z: 0, r: 2.2, minY: 0, maxY: 4.6 });
  ao(0, 0, 6.2, 6.2);
  { const rg = new THREE.RingGeometry(2.3, 2.62, 64, 1), uv = rg.attributes.uv; for (let k = 0; k < uv.count; k++) uv.setXY(k, uv.getX(k) * 9, uv.getY(k) * 9); push(M.hazardFloor, xf(rg, 0, 0.004, 0, -PI / 2)); }
  label(12, 1.8, 0.45, 0, 0.005, 3.05, 0, -PI / 2);
  label(12, 1.8, 0.45, 0, 0.005, -3.05, PI, -PI / 2);
  for (const z of [-0.8, 0.8]) boxMM(M.slate, -1.85, 1.85, 0.49, 0.76, z - 0.15, z + 0.15);
  for (const x of [-1.3, 1.3]) boxMM(M.slate, x - 0.12, x + 0.12, 0.49, 0.7, -0.65, 0.65);
  for (const s of [-1, 1]) {
    const x = s * 1.48;
    boxMM(M.yellow, x - 0.15, x + 0.15, 0.7, 3.15, -0.5, 0.5);
    boxMM(M.yellow, x - 0.18, x + 0.18, 0.7, 2.9, 0.5, 0.56); boxMM(M.yellow, x - 0.18, x + 0.18, 0.7, 2.9, -0.56, -0.5);
    boxMM(M.yellow, x - 0.4, x + 0.4, 0.76, 0.9, -0.7, 0.7);
    for (const z of [-0.6, 0.6]) bolts(M.machined, 1, 0, x + s * 0.3, 0.92, z, 'y', 0.035, 0.05);
    cyl(M.gun, 0.44, 0.44, 0.44, x, 2.7, 0, 'x', 32);
    cyl(M.machined, 0.33, 0.33, 0.08, x + s * 0.26, 2.7, 0, 'x', 32);
    cyl(M.machined, 0.12, 0.12, 0.06, x + s * 0.32, 2.7, 0, 'x', 16);
    bolts(M.gun, 10, 0.38, x + s * 0.23, 2.7, 0, 'x', 0.026, 0.05);
    cyl(M.gun, 0.2, 0.2, 0.03, x + s * 0.16, 1.55, 0, 'x', 20); bolts(M.machined, 6, 0.16, x + s * 0.18, 1.55, 0, 'x', 0.014, 0.02);
    label(0, 0.8, 0.2, x + s * 0.155, 2.05, 0, s * PI / 2);
  }
  label(1, 0.9, 0.225, 0, 0.31, 2.012);
  label(18, 0.4, 0.1, 1.48, 1.2, 0.565);
  // +x torque motor (finned) and -x motor with cover removed (copper windings exposed)
  cyl(M.slate, 0.34, 0.34, 0.32, 1.96, 2.7, 0, 'x', 32);
  for (let i = 0; i < 6; i++) cyl(M.gun, 0.38, 0.38, 0.018, 1.83 + i * 0.05, 2.7, 0, 'x', 32);
  cyl(M.machined, 0.22, 0.24, 0.08, 2.15, 2.7, 0, 'x', 24);
  boxMM(M.gun, 1.85, 2.08, 3.02, 3.14, -0.1, 0.1);
  cyl(M.slateDS, 0.34, 0.34, 0.32, -1.96, 2.7, 0, 'x', 32, { open: true, ts: PI * 0.5, tl: PI });
  cyl(M.gun, 0.17, 0.17, 0.34, -1.96, 2.7, 0, 'x', 16);
  for (let i = 0; i < 5; i++) torus(M.copper, 0.25, 0.036, -1.84 - i * 0.058, 2.7, 0, 'x', PI * 2, 28);
  cyl(M.machined, 0.22, 0.24, 0.08, -2.15, 2.7, 0, 'x', 24);
  // hoses: coolant to the gimbal motors
  for (const s of [-1, 1]) {
    const m = s > 0 ? M.rubber : M.rubberRed;
    tube(m, [[s * 2.0, 2.42, 0.24], [s * 2.12, 1.9, 0.5], [s * 2.0, 1.1, 0.78], [s * 1.82, 0.6, 0.86]], 0.042);
    tube(M.rubber, [[s * 2.0, 2.42, -0.24], [s * 2.16, 1.7, -0.6], [s * 1.95, 0.95, -0.95], [s * 1.72, 0.6, -1.0]], 0.042);
    for (const [y, z] of [[2.42, 0.24], [2.42, -0.24]]) cyl(M.machined, 0.055, 0.055, 0.1, s * 2.0, y, z, 'y', 12);
    for (const [x, z] of [[1.82, 0.86], [1.72, -1.0]]) { cyl(M.machined, 0.055, 0.055, 0.12, s * x, 0.55, z, 'y', 12); boxMM(M.gun, s * x - 0.1, s * x + 0.1, 0.49, 0.56, z - 0.1, z + 0.1); }
  }
  // service cable bundle from ceiling tray to the gimbal electronics (service loop)
  tube(M.cableBlack, [[-0.55, 3.95, -0.66], [-0.75, 4.5, -0.95], [-0.8, 5.5, -1.3], [-0.5, 6.6, -1.5], [-0.3, 7.36, -1.6], [-0.3, 7.4, -4.0]], 0.05, 64, 10);
  tube(M.cableOrange, [[-0.45, 3.95, -0.64], [-0.62, 4.5, -0.92], [-0.66, 5.5, -1.26], [-0.38, 6.6, -1.46], [-0.2, 7.36, -1.56], [-0.2, 7.4, -4.0]], 0.025, 64, 8);

  // drum (rotor housing) in tilted gimbal frame
  const gimbal = new THREE.Matrix4().compose(new THREE.Vector3(0, 2.7, 0), new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.45, 0, 0)), new THREE.Vector3(1, 1, 1));
  pushMatrix(gimbal);
  const G0 = 0.62, P0 = 4.03, P1 = 4.53;
  cyl(M.whiteDS, 1.15, 1.15, 1.45, -0.525, 0, 0, 'x', 56, { open: true, ts: G0, tl: PI * 2 - 2 * G0 });
  cyl(M.whiteDS, 1.15, 1.15, 0.25, 1.125, 0, 0, 'x', 56, { open: true, ts: G0, tl: PI * 2 - 2 * G0 });
  cyl(M.whiteDS, 1.15, 1.15, 0.8, 0.6, 0, 0, 'x', 56, { open: true, ts: G0, tl: P0 - G0 });
  cyl(M.whiteDS, 1.15, 1.15, 0.8, 0.6, 0, 0, 'x', 56, { open: true, ts: P1, tl: PI * 2 - G0 - P1 });
  cyl(M.glass, 1.17, 1.17, 0.8, 0.6, 0, 0, 'x', 16, { open: true, ts: P0, tl: P1 - P0 });
  for (const x of [-1.25, 1.25]) {
    cyl(M.white, 1.15, 1.15, 0.06, x, 0, 0, 'x', 56);
    torus(M.machined, 1.16, 0.045, x * 0.98, 0, 0, 'x', PI * 2, 56);
    bolts(M.gun, 20, 1.08, x * 1.035, 0, 0, 'x', 0.022, 0.04);
  }
  for (const x of [-0.75, -0.1]) torus(M.white, 1.17, 0.035, x, 0, 0, 'x', PI * 2 - 2 * G0, 44, { spin: PI + G0 });
  for (const x of [0.2, 1.0]) torus(M.gun, 1.18, 0.03, x, 0, 0, 'x', P1 - P0 + 0.08, 12, { spin: PI - (2 * PI - P0) - 0.04 + 0 });
  for (const a of [G0, -G0]) {
    const y = -1.15 * Math.sin(a), z = 1.15 * Math.cos(a);
    box(M.gun, 2.5, 0.08, 0.08, 0, y, z);
    for (let k = 0; k < 9; k++) cyl(M.machined, 0.018, 0.018, 0.1, -1.1 + k * 0.275, y * 1.04, z * 1.04, 'y', 6, { rx: PI / 2 + a });
  }
  for (const a of [P0, P1]) box(M.gun, 0.84, 0.06, 0.06, 0.6, -1.17 * Math.sin(a), 1.17 * Math.cos(a));
  // top spin bearing cap + sensor package
  cyl(M.machined, 0.34, 0.37, 0.18, 0, 1.2, 0, 'y', 36);
  cyl(M.gun, 0.24, 0.24, 0.1, 0, 1.33, 0, 'y', 24);
  cyl(M.machined, 0.08, 0.08, 0.06, 0, 1.4, 0, 'y', 12);
  bolts(M.gun, 12, 0.3, 0, 1.31, 0, 'y', 0.022, 0.04);
  boxMM(M.gun, -0.82, -0.36, 1.05, 1.36, -0.24, 0.24);
  for (let i = 0; i < 9; i++) box(M.machined, 0.012, 0.1, 0.44, -0.8 + i * 0.054, 1.41, 0);
  boxMM(M.greenGlow, -0.42, -0.38, 1.2, 1.24, 0.24, 0.245); boxMM(M.amberGlow, -0.5, -0.46, 1.2, 1.24, 0.24, 0.245);
  label(2, 0.48, 0.12, 0.6, 1.16, 0.0, 0, -PI / 2);
  // bottom bearing
  cyl(M.machined, 0.34, 0.37, 0.16, 0, -1.2, 0, 'y', 36);
  popMatrix();

  // ------------------------------------------------------------------ props around the machine
  // tool cart (built in place, then offset outward to keep a walking ring around the plinth)
  pushMatrix(new THREE.Matrix4().makeTranslation(0.45, 0, 0.25));
  boxMM(M.cart, 2.6, 3.5, 0.16, 0.92, 1.9, 2.58);
  for (let i = 0; i < 4; i++) { boxMM(M.machined, 2.75, 3.35, 0.32 + i * 0.17, 0.34 + i * 0.17, 2.58, 2.61); boxMM(M.dark, 2.62, 3.48, 0.24 + i * 0.17, 0.25 + i * 0.17, 2.58, 2.585); }
  boxMM(M.gun, 2.58, 3.52, 0.92, 0.95, 1.88, 2.6);
  boxMM(M.gun, 2.58, 3.52, 0.95, 1.0, 1.88, 1.9); boxMM(M.gun, 2.58, 3.52, 0.95, 1.0, 2.58, 2.6);
  for (const x of [2.68, 3.42]) for (const z of [1.98, 2.5]) { cyl(M.rubber, 0.07, 0.07, 0.04, x, 0.07, z, 'z', 14); boxMM(M.gun, x - 0.03, x + 0.03, 0.08, 0.16, z - 0.03, z + 0.03); }
  rod(M.machined, [3.52, 0.85, 1.95], [3.7, 0.95, 1.95], 0.014, 0.014, true); rod(M.machined, [3.52, 0.85, 2.52], [3.7, 0.95, 2.52], 0.014, 0.014, true);
  rod(M.rubber, [3.7, 0.95, 1.9], [3.7, 0.95, 2.57], 0.022, 0.022, true);
  // tools on cart
  boxMM(M.machined, 2.7, 3.15, 0.955, 0.97, 2.0, 2.04); cyl(M.machined, 0.035, 0.035, 0.02, 2.68, 0.962, 2.02, 'y', 6);
  rod(M.machined, [2.65, 0.97, 2.3], [3.05, 0.97, 2.2], 0.016, 0.016, true); boxMM(M.gun, 3.03, 3.13, 0.95, 0.99, 2.16, 2.24);
  rod(M.rubber, [2.75, 0.97, 2.26], [2.95, 0.97, 2.22], 0.022, 0.022, true);
  for (let i = 0; i < 6; i++) cyl(M.machined, 0.018 + i * 0.002, 0.018 + i * 0.002, 0.05, 2.75 + i * 0.07, 0.975, 2.45, 'y', 10);
  cyl(M.slateDS, 0.34, 0.34, 0.32, 3.3, 0.97, 2.25, 'x', 24, { open: true, ts: PI, tl: PI });
  ao(3.05, 2.25, 1.6, 1.3);
  popMatrix();
  solid(3.0, 4.2, 0, 1.6, 2.1, 2.9);
  // removed access panel on an A-frame stand
  const pz = 3.25, px = -3.45;
  for (const s of [-1, 1]) {
    rod(M.yellow, [px + s * 0.75, 0.0, pz - 0.35], [px + s * 0.75, 1.5, pz], 0.03, 0.03);
    rod(M.yellow, [px + s * 0.75, 0.0, pz + 0.35], [px + s * 0.75, 1.5, pz], 0.03, 0.03);
  }
  rod(M.yellow, [px - 0.75, 1.5, pz], [px + 0.75, 1.5, pz], 0.025, 0.025, true);
  rod(M.yellow, [px - 0.75, 0.3, pz - 0.29], [px + 0.75, 0.3, pz - 0.29], 0.02, 0.02, true);
  cyl(M.whiteDS, 1.15, 1.15, 1.6, px, 0.6, pz + 1.15 - 0.3, 'x', 16, { open: true, ts: PI - 0.55, tl: 1.1, rx: 0.25 });
  label(13, 0.44, 0.13, px + 0.3, 1.0, pz - 0.35, PI, -0.25);
  solid(px - 0.85, px + 0.85, 0, 1.6, pz - 0.45, pz + 0.45);
  ao(px, pz, 2.2, 1.4);
  // lockout post with slow-roll beacon (red task light)
  const lx = -3.35, lz = -1.95;
  cyl(M.gun, 0.05, 0.05, 1.7, lx, 0.85, lz, 'y', 10); cyl(M.gun, 0.2, 0.22, 0.05, lx, 0.025, lz, 'y', 16);
  boxMM(M.yellow, lx - 0.25, lx + 0.25, 1.05, 1.5, lz - 0.05, lz + 0.03);
  for (let i = 0; i < 4; i++) { boxMM(M.cart, lx - 0.2 + i * 0.12, lx - 0.13 + i * 0.12, 0.92, 1.02, lz + 0.03, lz + 0.06); torus(M.machined, 0.025, 0.006, lx - 0.165 + i * 0.12, 1.04, lz + 0.045, 'z', PI, 8); }
  label(6, 0.5, 0.125, lx, 1.3, lz + 0.035);
  label(6, 0.5, 0.125, lx, 1.3, lz - 0.055, PI);
  cyl(M.dark, 0.08, 0.08, 0.06, lx, 1.73, lz, 'y', 14);
  cyl(M.redGlow, 0.065, 0.065, 0.14, lx, 1.83, lz, 'y', 14);
  circles.push({ x: lx, z: lz, r: 0.28, minY: 0, maxY: 2 });
  // tripod inspection lamp (cyan task light) aimed into the open drum
  const tx = 1.9, tz = 3.75;
  for (let i = 0; i < 3; i++) { const a = i * 2.1 + 0.3; rod(M.gun, [tx + Math.cos(a) * 0.45, 0, tz + Math.sin(a) * 0.45], [tx, 1.1, tz], 0.014, 0.014, true); }
  rod(M.machined, [tx, 1.1, tz], [tx, 2.05, tz], 0.02, 0.02, true);
  boxMM(M.gun, tx - 0.18, tx + 0.18, 2.0, 2.2, tz - 0.1, tz + 0.1);
  const lampHead = new THREE.Vector3(tx, 2.1, tz - 0.12);
  boxMM(M.cyanGlow, tx - 0.15, tx + 0.15, 2.03, 2.17, tz - 0.105, tz - 0.1);
  rod(M.rubber, [tx + 0.1, 2.0, tz + 0.1], [tx + 0.2, 0.02, tz + 0.7], 0.01, 0.01, true);
  circles.push({ x: tx, z: tz, r: 0.42, minY: 0, maxY: 2.3 });
  // spare bearing crate
  boxMM(M.gun, 3.2, 4.2, 0, 0.6, -2.8, -2.0); boxMM(M.machined, 3.18, 4.22, 0.58, 0.62, -2.82, -1.98);
  for (const x of [3.35, 4.05]) boxMM(M.dark, x - 0.04, x + 0.04, 0.4, 0.5, -2.01, -1.97);
  torus(M.machined, 0.3, 0.06, 3.7, 0.69, -2.4, 'y', PI * 2, 32); torus(M.machined, 0.2, 0.04, 3.7, 0.67, -2.4, 'y', PI * 2, 24);
  solid(3.15, 4.25, 0, 0.8, -2.85, -1.95); ao(3.7, -2.4, 1.5, 1.3);

  // ------------------------------------------------------------------ back wall (under walkway): lockers, PDU
  for (let i = 0; i < 4; i++) {
    const x0 = -7.3 + i * 0.65;
    boxMM(M.slate, x0, x0 + 0.62, 0, 2.0, -7.6, -7.05);
    for (let k = 0; k < 6; k++) boxMM(M.dark, x0 + 0.15, x0 + 0.47, 1.6 + k * 0.04, 1.615 + k * 0.04, -7.05, -7.04);
    boxMM(M.machined, x0 + 0.52, x0 + 0.55, 0.9, 1.15, -7.05, -7.02);
  }
  label(17, 1.6, 0.4, -6.0, 2.25, -7.04);
  solid(-7.35, -4.65, 0, 2.1, -7.6, -7.0); ao(-6, -7.3, 3.2, 1.2);
  boxMM(M.gun, 4.7, 7.3, 0, 2.1, -7.6, -7.15);
  boxMM(M.dark, 5.99, 6.01, 0.1, 2.0, -7.15, -7.14);
  for (const x of [5.85, 6.15]) boxMM(M.machined, x - 0.02, x + 0.02, 0.9, 1.3, -7.15, -7.11);
  for (let i = 0; i < 5; i++) boxMM(i === 3 ? M.amberGlow : M.greenGlow, 4.9 + i * 0.12, 4.96 + i * 0.12, 1.8, 1.84, -7.15, -7.14);
  label(14, 1.0, 0.25, 6.6, 1.6, -7.14);
  solid(4.65, 7.35, 0, 2.2, -7.6, -7.1); ao(6, -7.35, 3.2, 1.1);

  // ------------------------------------------------------------------ left wall: pressure door; right wall: control panel
  boxMM(M.hazard, -11.95, -11.8, 0, 3.3, 2.7, 3.0); boxMM(M.hazard, -11.95, -11.8, 0, 3.3, 6.2, 6.5); boxMM(M.hazard, -11.95, -11.8, 3.0, 3.3, 2.7, 6.5);
  boxMM(M.slate, -11.95, -11.82, 0.02, 3.0, 3.0, 6.2);
  boxMM(M.gun, -11.86, -11.78, 0.4, 2.7, 4.55, 4.65);
  torus(M.yellow, 0.32, 0.03, -11.74, 1.5, 4.0, 'x', PI * 2, 32); rod(M.yellow, [-11.74, 1.18, 4.0], [-11.74, 1.82, 4.0], 0.02, 0.02, true); rod(M.yellow, [-11.74, 1.5, 3.68], [-11.74, 1.5, 4.32], 0.02, 0.02, true);
  cyl(M.gun, 0.06, 0.06, 0.1, -11.78, 1.5, 4.0, 'x', 12);
  cyl(M.gun, 0.26, 0.26, 0.06, -11.8, 2.2, 5.4, 'x', 24); cyl(M.dark, 0.2, 0.2, 0.065, -11.8, 2.2, 5.4, 'x', 20); cyl(M.glass, 0.2, 0.2, 0.07, -11.79, 2.2, 5.4, 'x', 20);
  label(9, 1.6, 0.4, -11.8, 3.6, 4.6, PI / 2);
  label(5, 2.8, 0.7, 11.99, 4.4, 0, -PI / 2);
  boxMM(M.gun, 11.6, 11.75, 1.0, 1.9, 4.0, 4.9);
  cyl(M.cart, 0.05, 0.05, 0.06, 11.57, 1.65, 4.25, 'x', 16); cyl(M.yellow, 0.08, 0.08, 0.02, 11.59, 1.65, 4.25, 'x', 16);
  for (let i = 0; i < 4; i++) boxMM(i ? M.greenGlow : M.amberGlow, 11.59, 11.6, 1.3, 1.35, 4.5 + i * 0.09, 4.56 + i * 0.09);
  rod(M.gun, [11.68, 1.9, 4.45], [11.68, 5.75, 4.45], 0.05, 0.05, true, 10);
  label(16, 2.4, 0.6, 7.2, 0.005, 5.6, -PI / 2, -PI / 2);
  // emergency locker + extinguisher on front wall
  boxMM(M.white, 2.0, 3.4, 0.4, 2.3, 7.3, 7.6); boxMM(M.dark, 2.69, 2.71, 0.45, 2.25, 7.29, 7.3);
  label(17, 1.2, 0.3, 2.7, 2.0, 7.29, PI);
  cyl(M.cart, 0.09, 0.09, 0.55, 4.0, 0.75, 7.48, 'y', 16); cyl(M.dark, 0.03, 0.03, 0.12, 4.0, 1.08, 7.48, 'y', 8);
  solid(1.95, 4.2, 0, 2.4, 7.25, 7.6);

  // ------------------------------------------------------------------ service alcove (x 12..17, z -3..3)
  boxMM(M.wall, 12, 17, 0, 3.4, -3.12, -3); boxMM(M.wall, 12, 17, 0, 3.4, 3, 3.12);
  boxMM(M.wall, 17, 17.12, 0, 3.4, -3, 3); boxMM(M.wall, 12, 17, 3.4, 3.52, -3, 3);
  for (const x of [13.6, 15.4]) {
    boxMM(M.slate, x - 0.1, x + 0.1, 0, 3.4, -3, -2.82); boxMM(M.slate, x - 0.1, x + 0.1, 0, 3.4, 2.82, 3);
    boxMM(M.slate, x - 0.1, x + 0.1, 3.2, 3.4, -3, 3);
  }
  boxMM(M.hazard, 11.85, 12.35, 0, 3.4, -3.25, -3.0); boxMM(M.hazard, 11.85, 12.35, 0, 3.4, 3.0, 3.25);
  boxMM(M.hazard, 11.85, 12.35, 3.4, 3.7, -3.25, 3.25);
  boxMM(M.slate, 12.1, 12.6, 3.0, 3.4, -3.0, 3.0);
  rod(M.gun, [12.15, 0.01, -2.95], [12.15, 0.01, 2.95], 0.04, 0.02);
  label(3, 1.6, 0.4, 11.84, 3.55, 0, -PI / 2);
  solid(12, 17.6, 0, 4, -3.6, -2.82); solid(12, 17.6, 0, 4, 2.82, 3.6); solid(16.98, 17.6, 0, 4, -3, 3);
  // light fixtures
  boxMM(M.gun, 13.9, 15.1, 3.3, 3.4, -0.25, 0.25); boxMM(M.lamp, 14.0, 15.0, 3.29, 3.3, -0.15, 0.15);
  boxMM(M.gun, 15.9, 16.4, 3.1, 3.4, -0.35, 0.35); boxMM(M.amberGlow, 15.95, 16.35, 3.09, 3.1, -0.3, 0.3);
  // workbench
  boxMM(M.machined, 15.95, 17, 0.88, 0.93, -2.45, 2.45);
  boxMM(M.slate, 16.05, 16.97, 0.1, 0.88, -2.4, 2.4);
  boxMM(M.dark, 16.05, 16.97, 0, 0.1, -2.35, 2.35);
  for (let r = 0; r < 3; r++) for (const z of [-1.6, 0, 1.6]) {
    boxMM(M.dark, 16.04, 16.05, 0.15 + r * 0.24, 0.16 + r * 0.24, z - 0.75, z + 0.75);
    boxMM(M.machined, 16.0, 16.04, 0.3 + r * 0.24, 0.32 + r * 0.24, z - 0.2, z + 0.2);
  }
  solid(15.9, 17, 0, 1.0, -2.5, 2.5); ao(16.5, 0, 1.6, 5.4);
  // vise
  boxMM(M.gun, 16.2, 16.6, 0.93, 1.05, -2.1, -1.7); boxMM(M.slate, 16.25, 16.55, 1.05, 1.2, -2.05, -1.98); boxMM(M.slate, 16.25, 16.55, 1.05, 1.2, -1.82, -1.75);
  cyl(M.machined, 0.02, 0.02, 0.5, 16.4, 1.12, -1.6, 'z', 8); rod(M.machined, [16.25, 1.12, -1.4], [16.55, 1.12, -1.4], 0.01, 0.01, true);
  // spare spin bearing under protective glass shield
  torus(M.machined, 0.3, 0.06, 16.45, 0.99, 0.2, 'y', PI * 2, 40);
  torus(M.machined, 0.18, 0.045, 16.45, 0.98, 0.2, 'y', PI * 2, 32);
  for (let i = 0; i < 14; i++) { const a = (i / 14) * PI * 2; cyl(M.copper, 0.03, 0.03, 0.07, 16.45 + Math.cos(a) * 0.24, 0.985, 0.2 + Math.sin(a) * 0.24, 'y', 8); }
  cyl(M.dark, 0.06, 0.06, 0.04, 16.0 + 0.2, 0.95, -0.35, 'y', 12); rod(M.machined, [16.2, 0.97, -0.35], [16.3, 1.25, -0.1], 0.008, 0.008, true); cyl(M.white, 0.04, 0.04, 0.02, 16.33, 1.25, -0.05, 'z', 16);
  for (const z of [-0.45, 0.82]) boxMM(M.gun, 16.0, 16.03, 0.93, 1.6, z, z + 0.03);
  boxMM(M.gun, 16.0, 17.0, 1.58, 1.6, -0.45, 0.85);
  box(M.glass, 0.02, 0.7, 1.28, 16.03, 1.25, 0.2); boxMM(M.glass, 16.02, 16.98, 1.565, 1.58, -0.43, 0.83);
  boxMM(M.glass, 16.02, 16.98, 0.93, 1.56, -0.45, -0.43); boxMM(M.glass, 16.02, 16.98, 0.93, 1.56, 0.83, 0.85);
  // shadow board + hanging tools (two wrenches missing: they are on the cart)
  push(M.peg, xf(new THREE.PlaneGeometry(4.6, 1.7), 16.985, 2.05, 0, 0, -PI / 2, 0));
  const bz = (cx) => -2.3 + (4.6 * cx) / 1024, byy = (cy) => 2.9 - (1.7 * cy) / 512;
  for (const i of [0, 1, 2, 4, 6]) {
    const cx = 80 + i * 46, l = 120 + i * 18;
    boxMM(M.machined, 16.95, 16.97, byy(110 + l), byy(110), bz(cx) - 0.028, bz(cx) + 0.028);
    torus(M.machined, 0.06, 0.014, 16.96, byy(100), bz(cx), 'x', PI * 1.5, 12, { spin: -PI * 0.25 });
  }
  boxMM(M.rubber, 16.94, 16.97, byy(300), byy(70), bz(487) - 0.06, bz(487) + 0.06); boxMM(M.gun, 16.92, 16.97, byy(80), byy(40), bz(440), bz(534));
  for (let i = 0; i < 5; i++) { boxMM(i % 2 ? M.binOr : M.rubber, 16.94, 16.97, byy(90), byy(50), bz(596 + i * 40), bz(618 + i * 40)); boxMM(M.machined, 16.955, 16.965, byy(240), byy(90), bz(604 + i * 40), bz(610 + i * 40)); }
  // parts shelving on -z side
  for (const x of [12.6, 15.55]) for (const z of [-2.95, -2.45]) boxMM(M.gun, x - 0.03, x + 0.03, 0, 2.6, z - 0.03, z + 0.03);
  for (const y of [0.15, 0.75, 1.35, 1.95, 2.55]) {
    boxMM(M.gun, 12.55, 15.6, y, y + 0.03, -2.98, -2.42);
    if (y < 2.5) for (let i = 0; i < 6; i++) {
      const x0 = 12.7 + i * 0.47, m = (i + Math.round(y * 3)) % 3 === 0 ? M.binOr : M.bin;
      boxMM(m, x0, x0 + 0.4, y + 0.03, y + 0.3, -2.9, -2.5);
      boxMM(M.dark, x0 + 0.1, x0 + 0.3, y + 0.1, y + 0.2, -2.5, -2.495);
    }
  }
  solid(12.5, 15.65, 0, 2.7, -3, -2.38);
  // gas cylinders + hose reel on +z side
  for (let i = 0; i < 3; i++) {
    const x = 13.1 + i * 0.36;
    cyl(M.pipeGreen, 0.13, 0.13, 1.45, x, 0.75, 2.65, 'y', 20); cyl(M.pipeGreen, 0.08, 0.13, 0.12, x, 1.53, 2.65, 'y', 20);
    cyl(M.machined, 0.03, 0.03, 0.12, x, 1.64, 2.65, 'y', 8); boxMM(M.machined, x - 0.05, x + 0.05, 1.68, 1.78, 2.6, 2.7);
    cyl(M.white, 0.035, 0.035, 0.02, x, 1.73, 2.59, 'z', 14);
    tube(M.rubber, [[x, 1.73, 2.72], [x + 0.1, 1.9, 2.8], [14.4, 1.85, 2.85], [14.85, 1.6, 2.86]], 0.014, 24, 6);
  }
  boxMM(M.yellow, 12.9, 14.0, 1.15, 1.2, 2.5, 2.52);
  for (let i = 0; i < 6; i++) torus(M.rubberRed, 0.26, 0.022, 14.95, 1.6, 2.78 - i * 0.045, 'z', PI * 2, 28);
  cyl(M.gun, 0.12, 0.12, 0.35, 14.95, 1.6, 2.72, 'z', 16); boxMM(M.slate, 14.8, 15.1, 1.2, 1.7, 2.92, 2.98);
  solid(12.9, 15.25, 0, 2.0, 2.4, 3);
  // stool
  cyl(M.rubber, 0.2, 0.2, 0.06, 15.3, 0.68, 1.15, 'y', 20); cyl(M.machined, 0.025, 0.025, 0.65, 15.3, 0.33, 1.15, 'y', 8);
  for (let i = 0; i < 4; i++) { const a = i * PI / 2 + 0.4; rod(M.gun, [15.3, 0.2, 1.15], [15.3 + Math.cos(a) * 0.25, 0.01, 1.15 + Math.sin(a) * 0.25], 0.012, 0.012, true); }
  circles.push({ x: 15.3, z: 1.15, r: 0.25, minY: 0, maxY: 0.75 });

  // ------------------------------------------------------------------ walkway (y 3.6) + spur + stairs
  const DY = 3.6;
  const rail = (ax, az, bx, bz) => {
    const L = Math.hypot(bx - ax, bz - az), n = Math.max(1, Math.round(L / 1.5));
    for (let i = 0; i <= n; i++) { const t = i / n, x = ax + (bx - ax) * t, z = az + (bz - az) * t; boxMM(M.yellow, x - 0.03, x + 0.03, DY, DY + 1.1, z - 0.03, z + 0.03); }
    rod(M.yellow, [ax, DY + 1.1, az], [bx, DY + 1.1, bz], 0.026, 0.026, true, 10);
    rod(M.yellow, [ax, DY + 0.58, az], [bx, DY + 0.58, bz], 0.018, 0.018, true, 8);
    const dx = bx - ax, dz = bz - az;
    if (Math.abs(dx) > Math.abs(dz)) boxMM(M.yellow, Math.min(ax, bx), Math.max(ax, bx), DY, DY + 0.12, az - 0.008, az + 0.008);
    else boxMM(M.yellow, ax - 0.008, ax + 0.008, DY, DY + 0.12, Math.min(az, bz), Math.max(az, bz));
  };
  boxMM(M.grate, -12, 8, DY - 0.04, DY, -7.6, -5.8);
  boxMM(M.slate, -12, 8, DY - 0.2, DY, -5.86, -5.8); boxMM(M.slate, -12, 8, DY - 0.2, DY, -7.62, -7.56);
  for (let x = -11.25; x < 8; x += 1.5) boxMM(M.slate, x - 0.04, x + 0.04, DY - 0.18, DY - 0.04, -7.56, -5.86);
  for (const x of [-12, 8]) boxMM(M.slate, x - 0.03, x + 0.03, DY - 0.2, DY, -7.6, -5.8);
  rail(-10.5, -5.8, -1.2, -5.8); rail(1.2, -5.8, 8, -5.8); rail(8, -5.8, 8, -7.55);
  for (const x of ribXs) if (x < 8) rod(M.slate, [x, DY - 1.1, -7.58], [x, DY - 0.2, -6.5], 0.08, 0.08);
  for (const x of [-7.5, -4.0, 4.0, 7.5, -1.1, 1.1]) {
    boxMM(M.slate, x - 0.09, x + 0.09, 0, DY - 0.2, -6.04, -5.86);
    boxMM(M.gun, x - 0.18, x + 0.18, 0, 0.02, -6.13, -5.77); bolts(M.machined, 4, 0.14, x, 0.03, -5.95, 'y', 0.015, 0.03, PI / 4);
    solid(x - 0.12, x + 0.12, 0, DY - 0.2, -6.07, -5.83);
  }
  for (let x = -9; x < 8; x += 3) { boxMM(M.gun, x - 0.4, x + 0.4, DY - 0.24, DY - 0.2, -7.0, -6.8); boxMM(M.lamp, x - 0.35, x + 0.35, DY - 0.245, DY - 0.24, -6.97, -6.83); }
  label(4, 1.4, 0.35, -5.6, DY + 0.3, -5.79, 0);
  // spur
  boxMM(M.grate, -1.2, 1.2, DY - 0.04, DY, -5.8, -3.0);
  boxMM(M.slate, -1.26, -1.2, DY - 0.2, DY, -5.8, -3.0); boxMM(M.slate, 1.2, 1.26, DY - 0.2, DY, -5.8, -3.0);
  boxMM(M.slate, -1.26, 1.26, DY - 0.2, DY, -3.06, -3.0);
  for (let z = -5.2; z > -3.1; z -= 0.7) boxMM(M.slate, -1.2, 1.2, DY - 0.18, DY - 0.04, z - 0.04, z + 0.04);
  rail(-1.2, -5.8, -1.2, -3.0); rail(1.2, -5.8, 1.2, -3.0); rail(-1.2, -3.0, 1.2, -3.0);
  for (const s of [-1, 1]) rod(M.slate, [s * 1.1, 2.15, -5.95], [s * 1.1, DY - 0.2, -3.25], 0.08, 0.08);
  label(15, 0.72, 0.18, 0, DY + 0.3, -3.01, PI);
  label(15, 0.72, 0.18, 0, DY + 0.3, -3.05, 0);
  boxMM(M.gun, -0.38, 0.38, DY + 0.19, DY + 0.41, -3.04, -3.02);
  // clamp lamp on spur end rail (neutral) + clipboard
  boxMM(M.gun, 0.74, 0.84, DY + 1.12, DY + 1.17, -3.05, -2.95); rod(M.machined, [0.79, DY + 1.17, -3.0], [0.79, DY + 1.3, -2.9], 0.01, 0.01, true); box(M.gun, 0.1, 0.08, 0.12, 0.79, DY + 1.32, -2.86, 0.5); box(M.lamp, 0.08, 0.06, 0.01, 0.79, DY + 1.29, -2.8, 0.5);
  boxMM(M.white, -0.9, -0.6, DY + 0.75, DY + 1.05, -3.03, -3.02);
  // stairs: 20 risers of 0.18 m, 19 treads of 0.33 m, 1.2 m clear width
  const SX0 = -11.7, SX1 = -10.5;
  for (let k = 1; k <= 19; k++) {
    const y = 0.18 * k, zf = 0.47 - 0.33 * (k - 1), zb = 0.47 - 0.33 * k;
    boxMM(M.grate, SX0, SX1, y - 0.04, y, zb - 0.02, zf);
    boxMM(M.yellow, SX0, SX1, y - 0.05, y + 0.004, zf - 0.05, zf);
  }
  for (const x of [SX0 - 0.03, SX1 + 0.03]) rod(M.slate, [x, -0.1, 0.8], [x, DY - 0.08, -5.8], 0.06, 0.3);
  const stairY = (z) => 0.18 + (0.47 - z) * (3.42 / 6.27);
  for (let i = 0; i <= 4; i++) { const z = 0.3 - i * 1.5, y = stairY(z) - 0.1; boxMM(M.yellow, SX1 + 0.02, SX1 + 0.08, y, y + 1.05, z - 0.03, z + 0.03); }
  rod(M.yellow, [SX1 + 0.05, stairY(0.47) + 0.92, 0.47], [SX1 + 0.05, DY + 1.1, -5.8], 0.026, 0.026, true, 10);
  rod(M.yellow, [SX1 + 0.05, stairY(0.47) + 0.45, 0.47], [SX1 + 0.05, DY + 0.58, -5.8], 0.018, 0.018, true, 8);
  rod(M.yellow, [SX0 - 0.02, stairY(0.47) + 0.92, 0.6], [SX0 - 0.02, DY + 0.92, -5.6], 0.022, 0.022, true, 10);
  for (let i = 0; i < 5; i++) { const z = 0.2 - i * 1.4; rod(M.gun, [-11.75, stairY(z) + 0.85, z], [SX0 - 0.02, stairY(z) + 0.92, z], 0.01, 0.01, true, 6); }
  { const s = new THREE.Shape(); s.moveTo(0.75, 0); s.lineTo(-5.8, DY - 0.15); s.lineTo(-5.8, 0); s.closePath();
    const g = new THREE.ShapeGeometry(s); g.rotateY(-PI / 2); g.translate(SX1 + 0.03, 0, 0); push(M.grate, g, 2); }
  label(11, 1.2, 0.3, -11.74, 2.0, 1.4, PI / 2);
  solid(SX1 - 0.02, SX1 + 0.1, 0, 5.0, -5.85, 0.8);
  surface(-12, 8, -7.6, -5.8, DY, 0.25);
  surface(-1.2, 1.2, -5.8, -3.0, DY, 0.25);
  surface(SX0, SX1, -5.8, 0.8, (x, z) => Math.min(DY, Math.max(0, (0.8 - z) * (3.6 / 6.6) - 0.06)), 0.35);
  solid(-10.5, -1.2, DY, DY + 1.3, -5.84, -5.76); solid(1.2, 8.06, DY, DY + 1.3, -5.84, -5.76);
  solid(7.96, 8.06, DY, DY + 1.3, -7.6, -5.8);
  solid(-1.26, -1.16, DY, DY + 1.3, -5.8, -2.96); solid(1.16, 1.26, DY, DY + 1.3, -5.8, -2.96); solid(-1.26, 1.26, DY, DY + 1.3, -3.06, -2.96);

  // floor lane markings
  const lineMat = M.line;
  for (const [x0, x1, z0, z1] of [[-9.8, 11.5, 3.6, 3.7], [-9.8, 11.5, -5.0, -4.9], [11.4, 11.5, -3.6, 3.6], [-9.9, -9.8, -5.0, 3.7]]) push(lineMat, xf(new THREE.PlaneGeometry(x1 - x0, z1 - z0), (x0 + x1) / 2, 0.003, (z0 + z1) / 2, -PI / 2));

  flushAll(scene);

  // ------------------------------------------------------------------ rotor (animated, spins about the drum's local Y)
  const pivot = new THREE.Group(); pivot.position.set(0, 2.7, 0); pivot.rotation.x = -0.45; scene.add(pivot);
  const rotor = new THREE.Group(); pivot.add(rotor);
  const prev = beginBuckets();
  cyl(M.machined, 0.95, 0.95, 0.3, 0, 0, 0, 'y', 56);
  torus(M.gun, 0.95, 0.03, 0, 0.15, 0, 'y', PI * 2, 56); torus(M.gun, 0.95, 0.03, 0, -0.15, 0, 'y', PI * 2, 56);
  torus(M.machined, 0.5, 0.012, 0, 0.152, 0, 'y', PI * 2, 40); torus(M.machined, 0.78, 0.012, 0, 0.152, 0, 'y', PI * 2, 48);
  cyl(M.machined, 0.26, 0.26, 2.2, 0, 0, 0, 'y', 28);
  cyl(M.gun, 0.36, 0.36, 0.36, 0, 0, 0, 'y', 28);
  for (let i = 0; i < 10; i++) { const a = i / 10 * PI * 2; cyl(M.dark, 0.065, 0.065, 0.31, Math.cos(a) * 0.65, 0, Math.sin(a) * 0.65, 'y', 12); }
  for (let i = 0; i < 3; i++) { const a = i / 3 * PI * 2 + 0.3; box(M.yellow, 0.12, 0.08, 0.06, Math.cos(a) * 0.88, 0.17, Math.sin(a) * 0.88, 0, -a, 0); }
  for (let i = 0; i < 24; i++) { const a = i / 24 * PI * 2; box(M.gun, 0.02, 0.26, 0.04, Math.cos(a) * 0.955, 0, Math.sin(a) * 0.955, 0, -a, 0); }
  endBuckets(prev, rotor, { dynamic: false, cast: false });

  // ------------------------------------------------------------------ lights
  scene.add(new THREE.HemisphereLight(0xdfe5ec, 0x3b3934, 0.55));
  const key = new THREE.SpotLight(0xfff3e4, 520, 0, 1.08, 0.75, 2);
  key.position.set(0.6, 7.75, 2.6); key.target.position.set(0, 0.6, -0.8);
  key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.camera.near = 1.5; key.shadow.camera.far = 16;
  key.shadow.bias = -0.0004; key.shadow.normalBias = 0.03; key.shadow.radius = 3;
  scene.add(key, key.target);
  for (const [x, y, z, i] of [[-7.5, 6.8, 3.0, 55], [7.5, 6.8, -2.5, 55], [-4, DY - 0.5, -6.9, 14]]) {
    const p = new THREE.PointLight(0xf4f1ea, i, 0, 2); p.position.set(x, y, z); scene.add(p);
  }
  const amber = new THREE.SpotLight(0xffa24a, 95, 0, 0.85, 0.6, 2);
  amber.position.set(16.15, 3.05, 0); amber.target.position.set(16.5, 0.9, 0.0); scene.add(amber, amber.target);
  const cyan = new THREE.SpotLight(0x5ad6ff, 120, 0, 0.42, 0.55, 2);
  cyan.position.copy(lampHead); cyan.target.position.set(0, 2.95, 0.7); scene.add(cyan, cyan.target);
  const red = new THREE.PointLight(0xff2a18, 3.5, 0, 2); red.position.set(lx, 1.95, lz); scene.add(red);
  // soft additive halos on the coloured task-light sources
  const haloTex = T.blobTex();
  const halo = (c, x, y, z, sz, o) => {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, color: c, transparent: true, opacity: o, blending: THREE.AdditiveBlending, depthWrite: false }));
    sp.position.set(x, y, z); sp.scale.set(sz, sz, 1); sp.renderOrder = 6; scene.add(sp); return sp;
  };
  halo(0xffa24a, 16.15, 3.05, 0, 0.9, 0.35);
  halo(0x5ad6ff, lampHead.x, lampHead.y, lampHead.z - 0.03, 0.55, 0.5);
  const redHalo = halo(0xff3020, lx, 1.83, lz, 0.45, 0.5);

  // ------------------------------------------------------------------ space beyond the viewport
  const sky = new THREE.Mesh(new THREE.SphereGeometry(600, 48, 24), new THREE.MeshBasicMaterial({ map: T.starSky(), side: THREE.BackSide, depthWrite: false }));
  sky.renderOrder = -10; scene.add(sky);
  const starG = new THREE.BufferGeometry(), sp = [], R = T.rng(4);
  for (let i = 0; i < 2200; i++) { const u = R() * 2 - 1, a = R() * PI * 2, r = Math.sqrt(1 - u * u); sp.push(Math.cos(a) * r * 550, u * 550, Math.sin(a) * r * 550); }
  starG.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
  scene.add(new THREE.Points(starG, new THREE.PointsMaterial({ color: 0xdfe6ff, size: 1.6, sizeAttenuation: false, depthWrite: false })));
  const sun = new THREE.Vector3(-0.55, 0.5, -0.67).normalize();
  const planetMat = new THREE.ShaderMaterial({
    uniforms: { map: { value: T.planetTex() }, sun: { value: sun } },
    vertexShader: 'varying vec2 vUv; varying vec3 vN; varying vec3 vW; void main(){ vUv=uv; vN=normalize(mat3(modelMatrix)*normal); vec4 w=modelMatrix*vec4(position,1.0); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }',
    fragmentShader: 'uniform sampler2D map; uniform vec3 sun; varying vec2 vUv; varying vec3 vN; varying vec3 vW; void main(){ vec3 n=normalize(vN); float d=dot(n,sun); float l=smoothstep(-0.12,0.6,d); vec3 c=texture2D(map,vUv).rgb; vec3 v=normalize(cameraPosition-vW); float rim=pow(1.0-max(dot(n,v),0.0),3.0); vec3 col=c*c*(0.02+1.15*l)+vec3(0.25,0.5,1.0)*rim*(0.15+0.9*l); gl_FragColor=vec4(col,1.0); }',
  });
  const planet = new THREE.Mesh(new THREE.SphereGeometry(140, 64, 48), planetMat);
  planet.position.set(-30, -62, 260); planet.rotation.set(0.3, 0.8, 0.2); scene.add(planet);
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(146, 64, 48), new THREE.ShaderMaterial({
    uniforms: { sun: { value: sun } }, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.BackSide,
    vertexShader: 'varying vec3 vN; varying vec3 vW; void main(){ vN=normalize(mat3(modelMatrix)*normal); vec4 w=modelMatrix*vec4(position,1.0); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }',
    fragmentShader: 'uniform vec3 sun; varying vec3 vN; varying vec3 vW; void main(){ vec3 v=normalize(cameraPosition-vW); float f=pow(max(0.0,1.0-abs(dot(normalize(vN),v))),2.0); float l=smoothstep(-0.3,0.5,dot(normalize(vN),sun)); gl_FragColor=vec4(vec3(0.3,0.6,1.0)*f*l*1.2,1.0); }',
  }));
  atmo.position.copy(planet.position); scene.add(atmo);
  // exterior truss and radiator wing seen through the viewport
  const trussM = new THREE.MeshStandardMaterial({ color: '#8d9298', roughness: 0.5, metalness: 0.6 });
  trussM.userData = { noShadow: true };
  const panelM = new THREE.MeshStandardMaterial({ color: '#1b2a44', roughness: 0.35, metalness: 0.5, emissive: '#05080e' });
  panelM.userData = { noShadow: true };
  const A = new THREE.Vector3(-14, -4, 18), B = new THREE.Vector3(-70, 2, 120), dir = B.clone().sub(A);
  const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => new THREE.Vector3(a * 1.2, b * 1.2, 0));
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir.clone().normalize());
  const n = 14;
  for (let i = 0; i <= n; i++) {
    const c = A.clone().addScaledVector(dir, i / n);
    const pts = corners.map((k) => k.clone().applyQuaternion(q).add(c));
    for (let j = 0; j < 4; j++) rod(trussM, pts[j].toArray(), pts[(j + 1) % 4].toArray(), 0.12, 0.12);
    if (i < n) {
      const c2 = A.clone().addScaledVector(dir, (i + 1) / n), p2 = corners.map((k) => k.clone().applyQuaternion(q).add(c2));
      for (let j = 0; j < 4; j++) { rod(trussM, pts[j].toArray(), p2[j].toArray(), 0.16, 0.16); rod(trussM, pts[j].toArray(), p2[(j + 1) % 4].toArray(), 0.08, 0.08); }
    }
  }
  for (let i = 0; i < 4; i++) {
    const c = A.clone().addScaledVector(dir, 0.35 + i * 0.16);
    box(panelM, 16, 0.2, 5.5, c.x + 9, c.y + 1.6, c.z, 0.0, -0.5, 0.1);
    box(trussM, 16.2, 0.3, 0.2, c.x + 9, c.y + 1.6, c.z, 0, -0.5, 0.1);
  }
  flushAll(scene, { cast: false });

  return {
    key,
    update(t, dt) { rotor.rotation.y += dt * 0.9; const k = 0.55 + 0.45 * Math.sin(t * 3.0); red.intensity = 5 * k; redHalo.material.opacity = 0.25 + 0.35 * k; },
  };
}
