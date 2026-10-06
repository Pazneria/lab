import * as THREE from 'three';
import { Builder, box, addSpan, cyl, RoundedBoxGeometry } from './builder.js';
import * as T from './textures.js';
import { WIND, terrainH } from './world.js';
import { mulberry } from './noise.js';

export const FLOOR = 0.5;
const CEIL = 3.0;
const DOOR_W = 0.95, DOOR_TOP = 2.47;
const rnd = mulberry(42);

// ---------- frost / snow-dusting shader for exterior materials ----------
const frostGLSL = `
varying vec3 vWPf; varying vec3 vWNf; uniform vec3 uWind; uniform float uFrost;
float hf(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hf(i),hf(i+vec2(1,0)),f.x), mix(hf(i+vec2(0,1)),hf(i+vec2(1,1)),f.x), f.y); }
float fb(vec2 p){ return vn(p)*0.55 + vn(p*2.13)*0.3 + vn(p*4.7)*0.15; }
float frostAmt(){
  vec3 n = normalize(vWNf);
  float windward = smoothstep(0.35, 0.95, dot(n, -uWind));
  float up = smoothstep(0.55, 0.9, n.y);
  vec2 q = vec2(vWPf.x + vWPf.z * 0.7, vWPf.y * 1.7 - vWPf.z * 0.5) * 3.0;
  float nz = fb(q);
  float low = (1.0 - smoothstep(0.08, 0.55, vWPf.y)) * 0.7;
  float nf = fb(q * 3.7 + 7.0);
  float f = windward * smoothstep(0.6, 0.78, nz * 0.55 + nf * 0.45 + windward * 0.06) * 0.7;
  f = max(f, low * smoothstep(0.45, 0.65, nz) * 0.9);
  f = max(f, up * smoothstep(0.4, 0.6, nz) * 0.85);
  return clamp(f * uFrost, 0.0, 1.0);
}`;
function frosty(mat, amount = 1) {
  mat.onBeforeCompile = sh => {
    sh.uniforms.uWind = { value: WIND }; sh.uniforms.uFrost = { value: amount };
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWPf; varying vec3 vWNf;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWPf = (modelMatrix * vec4(transformed,1.0)).xyz; vWNf = mat3(modelMatrix) * objectNormal;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\n' + frostGLSL)
      .replace('#include <map_fragment>', '#include <map_fragment>\nfloat frA = frostAmt(); diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.82,0.88,0.95), frA);')
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, 0.6, frA);')
      .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\nmetalnessFactor = mix(metalnessFactor, 0.0, frA);');
  };
  mat.customProgramCacheKey = () => 'frost' + amount;
  return mat;
}

function rep(t, s) { const c = t.clone(); c.repeat.set(s, s); c.needsUpdate = true; return c; }

export function buildShelter(scene, iscene, warmEnv) {
  const ext = new Builder();   // exterior-lit
  const int = new Builder();   // interior-lit
  const colliders = [];
  const col = (x0, x1, z0, z1) => colliders.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1) });

  // ---------- textures ----------
  const clad = T.cladding(); const ipan = T.interiorPanel(); const wood = T.woodFloor(); const rub = T.rubberMat();
  const grat = T.grating();

  // ---------- materials ----------
  const S = (p) => new THREE.MeshStandardMaterial(p);
  const IM = (p) => { const m = S(p); m.envMap = warmEnv; m.envMapIntensity = p.envMapIntensity ?? 0.55; return m; };
  const M = {
    clad: frosty(S({ map: rep(clad.map, 1 / 1.2), normalMap: rep(clad.normal, 1 / 1.2), roughness: 0.55, metalness: 0.15 }), 1),
    trim: frosty(S({ color: 0xb8bcc0, roughness: 0.35, metalness: 0.85 }), 1),
    steel: frosty(S({ color: 0x3c4146, roughness: 0.5, metalness: 0.7 }), 1),
    bolt: frosty(S({ color: 0x9a9fa4, roughness: 0.3, metalness: 0.9 }), 0.8),
    grate: frosty(S({ map: rep(grat, 2), roughness: 0.6, metalness: 0.6, color: 0xcfd4d8 }), 1.2),
    roof: frosty(S({ color: 0x5b6066, roughness: 0.45, metalness: 0.6 }), 1),
    snow: S({ color: 0xf2f6ff, roughness: 0.85 }),
    ice: new THREE.MeshPhysicalMaterial({ color: 0xbfe3f5, roughness: 0.06, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05, transparent: true, opacity: 0.82, envMapIntensity: 1.6 }),
    blueIce: new THREE.MeshPhysicalMaterial({ color: 0xd2e6f0, roughness: 0.28, metalness: 0, clearcoat: 0.7, clearcoatRoughness: 0.08, envMapIntensity: 0.75 }),
    glassExt: S({ color: 0x0a1018, roughness: 0.04, metalness: 0.9, transparent: true, opacity: 0.28, envMapIntensity: 1.3, depthWrite: false }),
    rubber: S({ color: 0x151617, roughness: 0.85 }),
    crate: frosty(S({ color: 0x8a6a45, roughness: 0.8 }), 1),
    drumBlue: frosty(S({ color: 0x1f4f8f, roughness: 0.45, metalness: 0.5 }), 1),
    drumRed: frosty(S({ color: 0x9b2a20, roughness: 0.45, metalness: 0.5 }), 1),
    flagR: S({ color: 0xc8261b, roughness: 0.7, side: THREE.DoubleSide }),
    flagG: S({ color: 0x1f7a3a, roughness: 0.7, side: THREE.DoubleSide }),
    bamboo: S({ color: 0xb59a62, roughness: 0.7 }),
    fence: frosty(S({ color: 0x6d5a44, roughness: 0.85 }), 1.3),
    lampExt: S({ color: 0x000000, emissive: 0xffc27a, emissiveIntensity: 6 }),
    solar: S({ color: 0x0b1530, roughness: 0.15, metalness: 0.6 }),
    yellow: frosty(S({ color: 0xd8a320, roughness: 0.5 }), 1),
    // interior
    wall: IM({ map: rep(ipan.map, 1 / 1.2), normalMap: rep(ipan.normal, 1 / 1.2), roughness: 0.7 }),
    floor: IM({ map: wood.map, normalMap: wood.normal, roughness: 0.6 }),
    mat: IM({ map: rep(rub.map, 2), normalMap: rep(rub.normal, 2), roughness: 0.9 }),
    alu: IM({ color: 0xb5b9bd, roughness: 0.35, metalness: 0.85 }),
    darkMetal: IM({ color: 0x2b2e31, roughness: 0.5, metalness: 0.6 }),
    ply: IM({ color: 0xc49a66, roughness: 0.65 }),
    plyDark: IM({ color: 0x8a6a48, roughness: 0.7 }),
    blackPl: IM({ color: 0x1b1c1e, roughness: 0.55 }),
    greyPl: IM({ color: 0x6f757a, roughness: 0.6 }),
    bluePl: IM({ color: 0x2d5f9a, roughness: 0.55 }),
    yellowPl: IM({ color: 0xd9a520, roughness: 0.5 }),
    orangePl: IM({ color: 0xd4561e, roughness: 0.55 }),
    redFab: IM({ color: 0x9e2b23, roughness: 0.9 }),
    blueFab: IM({ color: 0x23406e, roughness: 0.9 }),
    greenFab: IM({ color: 0x4b5a3a, roughness: 0.9 }),
    mattress: IM({ color: 0x5a6b78, roughness: 0.95 }),
    cream: IM({ color: 0xe1dccd, roughness: 0.5, metalness: 0.1 }),
    steelI: IM({ color: 0xa8acb0, roughness: 0.3, metalness: 0.9 }),
    cardboard: IM({ color: 0xa47f55, roughness: 0.9 }),
    copper: IM({ color: 0xb06a3a, roughness: 0.35, metalness: 0.9 }),
    iceI: new THREE.MeshPhysicalMaterial({ color: 0xd6eefa, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.08, transparent: true, opacity: 0.75, envMap: warmEnv, envMapIntensity: 1.2 }),
    lampI: new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffd09a, emissiveIntensity: 5 }),
    heaterGlow: new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xff7a2a, emissiveIntensity: 4 }),
    screen: new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffffff, emissiveIntensity: 0.9, emissiveMap: T.label('', { bg: '#0b1a22', w: 4, h: 4, border: false }) }),
  };
  M.glassExt.userData.noShadow = true; M.ice.userData.noShadow = true; M.iceI.userData.noShadow = true;

  // =====================================================================
  // SHELL — main module x[-3.4,3.4] z[-7.2,-2.3], vestibule x[-1.1,1.1] z[-2.3,0]
  // =====================================================================
  const X0 = -3.2, X1 = 3.2, Z0 = -7.0, Z1 = -2.5, TW = 0.2;
  const WB = 0.3, WT = 3.08;   // exterior wall bottom/top

  // wall with rectangular openings, along x (constant z range) or along z
  function wallX(b, mat, x0, x1, z0, z1, y0, y1, holes) {
    let cx = x0; holes = [...holes].sort((a, c) => a[0] - c[0]);
    for (const [hx0, hx1, hy0, hy1] of holes) {
      if (hx0 > cx) addSpan(b, mat, cx, hx0, y0, y1, z0, z1);
      if (hy0 > y0) addSpan(b, mat, hx0, hx1, y0, hy0, z0, z1);
      if (hy1 < y1) addSpan(b, mat, hx0, hx1, hy1, y1, z0, z1);
      cx = hx1;
    }
    if (cx < x1) addSpan(b, mat, cx, x1, y0, y1, z0, z1);
  }
  function wallZ(b, mat, x0, x1, z0, z1, y0, y1, holes) {
    let cz = z0; holes = [...holes].sort((a, c) => a[0] - c[0]);
    for (const [hz0, hz1, hy0, hy1] of holes) {
      if (hz0 > cz) addSpan(b, mat, x0, x1, y0, y1, cz, hz0);
      if (hy0 > y0) addSpan(b, mat, x0, x1, y0, hy0, hz0, hz1);
      if (hy1 < y1) addSpan(b, mat, x0, x1, hy1, y1, hz0, hz1);
      cz = hz1;
    }
    if (cz < z1) addSpan(b, mat, x0, x1, y0, y1, cz, z1);
  }

  // windows: [axis, centre, sillY, w, h]
  const winFront = [[-2.2, 1.55, 0.8, 0.7], [2.2, 1.55, 0.8, 0.7]];
  const winRight = [[-4.8, 1.62, 0.9, 0.62]];
  const winLeft = [[-3.75, 1.62, 0.7, 0.6]];
  const door = [-DOOR_W / 2, DOOR_W / 2, FLOOR, DOOR_TOP];
  const fh = winFront.map(([c, s, w, h]) => [c - w / 2, c + w / 2, s, s + h]);
  const rh = winRight.map(([c, s, w, h]) => [c - w / 2, c + w / 2, s, s + h]);
  const lh = winLeft.map(([c, s, w, h]) => [c - w / 2, c + w / 2, s, s + h]);

  // exterior skins (thin cladding layer) + interior skins (thin panel layer), core in between hidden
  const eo = 0.06;  // cladding thickness
  // front wall (z -2.5..-2.3)
  wallX(ext, M.clad, X0 - TW, X1 + TW, Z1 + TW - eo, Z1 + TW, WB, WT, [door, ...fh]);
  wallX(int, M.wall, X0, X1, Z1, Z1 + TW - eo, FLOOR, CEIL, [door, ...fh]);
  // back wall
  wallX(ext, M.clad, X0 - TW, X1 + TW, Z0 - TW, Z0 - TW + eo, WB, WT, []);
  wallX(int, M.wall, X0, X1, Z0 - TW + eo, Z0, FLOOR, CEIL, []);
  // right wall (x 3.2..3.4) windward
  wallZ(ext, M.clad, X1 + TW - eo, X1 + TW, Z0 - TW, Z1 + TW, WB, WT, rh);
  wallZ(int, M.wall, X1, X1 + TW - eo, Z0, Z1, FLOOR, CEIL, rh);
  // left wall
  wallZ(ext, M.clad, X0 - TW, X0 - TW + eo, Z0 - TW, Z1 + TW, WB, WT, lh);
  wallZ(int, M.wall, X0 - TW + eo, X0, Z0, Z1, FLOOR, CEIL, lh);
  // floor + ceiling + under-floor
  addSpan(int, M.floor, X0, X1, FLOOR - 0.05, FLOOR, Z0, Z1);
  addSpan(int, M.wall, X0, X1, CEIL, CEIL + 0.05, Z0, Z1);
  addSpan(ext, M.steel, X0 - TW, X1 + TW, WB - 0.05, FLOOR - 0.05, Z0 - TW, Z1 + TW);
  // window reveals (interior-lit sills, exterior-lit outer reveal)
  const reveal = (axis, c, s, w, h, wall) => {
    if (axis === 'x') {
      const z0 = Z1 + TW - eo, z1 = Z1;
      addSpan(int, M.alu, c - w / 2, c + w / 2, s - 0.03, s, Z1, Z1 + TW - eo);
      addSpan(int, M.alu, c - w / 2, c + w / 2, s + h, s + h + 0.02, Z1, Z1 + TW - eo);
      addSpan(int, M.alu, c - w / 2 - 0.02, c - w / 2, s, s + h, Z1, Z1 + TW - eo);
      addSpan(int, M.alu, c + w / 2, c + w / 2 + 0.02, s, s + h, Z1, Z1 + TW - eo);
      // ext frame + drip sill
      addSpan(ext, M.trim, c - w / 2 - 0.06, c + w / 2 + 0.06, s - 0.07, s - 0.03, Z1 + TW, Z1 + TW + 0.07);
      addSpan(ext, M.trim, c - w / 2 - 0.05, c + w / 2 + 0.05, s + h, s + h + 0.05, Z1 + TW, Z1 + TW + 0.03);
      addSpan(ext, M.trim, c - w / 2 - 0.05, c - w / 2, s - 0.03, s + h, Z1 + TW, Z1 + TW + 0.03);
      addSpan(ext, M.trim, c + w / 2, c + w / 2 + 0.05, s - 0.03, s + h, Z1 + TW, Z1 + TW + 0.03);
      // snow on sill
      ext.add(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), M.snow, c + (rnd() - 0.5) * 0.2, s - 0.03, Z1 + TW + 0.035, 0, 0, 0, w * 0.45, 0.035, 0.04);
    } else {
      const sx = wall === 'r' ? 1 : -1; const xo = wall === 'r' ? X1 + TW : X0 - TW; const xi = wall === 'r' ? X1 : X0;
      const xa = Math.min(xi, xo - sx * eo), xb = Math.max(xi, xo - sx * eo);
      addSpan(int, M.alu, xa, xb, s - 0.03, s, c - w / 2, c + w / 2);
      addSpan(int, M.alu, xa, xb, s + h, s + h + 0.02, c - w / 2, c + w / 2);
      addSpan(int, M.alu, xa, xb, s, s + h, c - w / 2 - 0.02, c - w / 2);
      addSpan(int, M.alu, xa, xb, s, s + h, c + w / 2, c + w / 2 + 0.02);
      const x0 = Math.min(xo, xo + sx * 0.07), x1 = Math.max(xo, xo + sx * 0.07);
      addSpan(ext, M.trim, x0, x1, s - 0.07, s - 0.03, c - w / 2 - 0.06, c + w / 2 + 0.06);
      const x2 = Math.min(xo, xo + sx * 0.03), x3 = Math.max(xo, xo + sx * 0.03);
      addSpan(ext, M.trim, x2, x3, s + h, s + h + 0.05, c - w / 2 - 0.05, c + w / 2 + 0.05);
      addSpan(ext, M.trim, x2, x3, s - 0.03, s + h, c - w / 2 - 0.05, c - w / 2);
      addSpan(ext, M.trim, x2, x3, s - 0.03, s + h, c + w / 2, c + w / 2 + 0.05);
    }
  };
  winFront.forEach(([c, s, w, h]) => reveal('x', c, s, w, h));
  winRight.forEach(([c, s, w, h]) => reveal('z', c, s, w, h, 'r'));
  winLeft.forEach(([c, s, w, h]) => reveal('z', c, s, w, h, 'l'));

  // glass panes (double: outer reflective + inner frost decal)
  const frostTex = T.windowFrost();
  const frostMat = new THREE.MeshStandardMaterial({ map: frostTex, transparent: true, roughness: 0.6, depthWrite: false, envMap: warmEnv, envMapIntensity: 0.6, side: THREE.DoubleSide });
  const glassGroup = new THREE.Group(); scene.add(glassGroup);
  const pane = (x, y, z, w, h, ry) => {
    const g = new THREE.Mesh(new THREE.PlaneGeometry(w, h), M.glassExt); g.position.set(x, y, z); g.rotation.y = ry; glassGroup.add(g);
    const f = new THREE.Mesh(new THREE.PlaneGeometry(w, h), frostMat); f.position.set(x, y, z); f.rotation.y = ry; f.translateZ(-0.015); f.renderOrder = 2; iscene.add(f);
  };
  winFront.forEach(([c, s, w, h]) => pane(c, s + h / 2, Z1 + TW - 0.05, w, h, 0));
  winRight.forEach(([c, s, w, h]) => pane(X1 + TW - 0.05, s + h / 2, c, w, h, Math.PI / 2));
  winLeft.forEach(([c, s, w, h]) => pane(X0 - TW + 0.05, s + h / 2, c, w, h, -Math.PI / 2));

  // ---------- vestibule x[-1.1,1.1] z[-2.3,0] ----------
  const VX = 0.9, VZ0 = Z1 + TW, VZ1 = -0.2, VC = 2.78;
  // side walls
  addSpan(ext, M.clad, VX + TW - eo, VX + TW, WB, VC + 0.2, VZ0, 0);
  addSpan(ext, M.clad, -VX - TW, -VX - TW + eo, WB, VC + 0.2, VZ0, 0);
  addSpan(int, M.wall, VX, VX + TW - eo, FLOOR, VC, VZ0, VZ1);
  addSpan(int, M.wall, -VX - TW + eo, -VX, FLOOR, VC, VZ0, VZ1);
  // front wall w/ door
  wallX(ext, M.clad, -VX - TW, VX + TW, -eo, 0, WB, VC + 0.2, [door]);
  wallX(int, M.wall, -VX, VX, VZ1, -eo, FLOOR, VC, [door]);
  addSpan(int, M.mat, -VX, VX, FLOOR - 0.05, FLOOR, VZ0, VZ1);
  // interior lining over the main wall's outer face inside the vestibule
  wallX(int, M.wall, -VX, VX, VZ0, VZ0 + 0.015, FLOOR, VC, [door]);
  addSpan(int, M.wall, -VX, VX, VC, VC + 0.05, VZ0, VZ1);
  addSpan(ext, M.steel, -VX - TW, VX + TW, WB - 0.05, FLOOR - 0.05, VZ0, 0);
  // vestibule roof (mono pitch) + snow
  ext.add(box(2.6, 0.12, 2.75), M.roof, 0, VC + 0.27, -1.05, 0.05, 0, 0);
  ext.add(new RoundedBoxGeometry(2.5, 0.16, 2.55, 2, 0.07), M.snow, 0.05, VC + 0.38, -1.1, 0.05, 0, 0.02);
  // door frames (heavy aluminium) on both doorways
  const doorFrame = (z, depth, b = ext, tr = M.trim, st = M.steel) => {
    addSpan(b, tr, -DOOR_W / 2 - 0.07, -DOOR_W / 2, FLOOR, DOOR_TOP + 0.07, z - depth, z + 0.02);
    addSpan(b, tr, DOOR_W / 2, DOOR_W / 2 + 0.07, FLOOR, DOOR_TOP + 0.07, z - depth, z + 0.02);
    addSpan(b, tr, -DOOR_W / 2 - 0.07, DOOR_W / 2 + 0.07, DOOR_TOP, DOOR_TOP + 0.07, z - depth, z + 0.02);
    addSpan(b, st, -DOOR_W / 2, DOOR_W / 2, FLOOR, FLOOR + 0.025, z - depth, z);   // threshold
  };
  doorFrame(0, 0.2);
  doorFrame(Z1 + TW, 0.2, int, M.alu, M.darkMetal);
  // outer door leaf (insulated freezer door) open ~100deg outward, hinge at +x
  const doorLeaf = (b, hx, hz, ang, outward, F = M.clad, Tm = M.trim, Hd = M.steel) => {
    const g = new THREE.Group();
    const m = new THREE.Matrix4();
    const parts = [];
    parts.push([box(DOOR_W - 0.04, DOOR_TOP - FLOOR - 0.04, 0.09), F, -(DOOR_W - 0.04) / 2, (DOOR_TOP - FLOOR) / 2, 0]);
    parts.push([box(DOOR_W - 0.1, DOOR_TOP - FLOOR - 0.1, 0.02), Tm, -(DOOR_W - 0.04) / 2, (DOOR_TOP - FLOOR) / 2, outward * 0.055]);
    parts.push([box(DOOR_W - 0.1, DOOR_TOP - FLOOR - 0.1, 0.02), Tm, -(DOOR_W - 0.04) / 2, (DOOR_TOP - FLOOR) / 2, -outward * 0.055]);
    // gasket
    parts.push([box(0.02, DOOR_TOP - FLOOR - 0.06, 0.1), M.rubber, -DOOR_W + 0.05, (DOOR_TOP - FLOOR) / 2, 0]);
    // freezer latch handles, both sides
    for (const s of [1, -1]) {
      parts.push([box(0.06, 0.32, 0.05), Hd, -DOOR_W + 0.13, 1.05, s * 0.09]);
      parts.push([box(0.04, 0.04, 0.2), Hd, -DOOR_W + 0.13, 1.18, s * 0.17]);
      parts.push([box(0.035, 0.035, 0.06), Hd, -DOOR_W + 0.13, 0.95, s * 0.075]);
    }
    // hinges
    for (const hy of [0.25, 1.0, 1.75]) parts.push([box(0.1, 0.18, 0.14), Hd, 0.02, hy, 0]);
    const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), ang);
    for (const [geo, mat, x, y, z] of parts) {
      const v = new THREE.Vector3(x, y, z).applyQuaternion(q);
      m.compose(new THREE.Vector3(hx + v.x, FLOOR + v.y, hz + v.z), q, new THREE.Vector3(1, 1, 1));
      b.addM(geo, mat, m);
    }
    // collider (approx)
    const ex = hx + Math.cos(ang) * -DOOR_W, ez = hz - Math.sin(ang) * -DOOR_W;
    col(Math.min(hx, ex) - 0.06, Math.max(hx, ex) + 0.06, Math.min(hz, ez) - 0.06, Math.max(hz, ez) + 0.06);
  };
  // outer door: hinge on +x side at z=0.02, swings out to lie along +x in front of wall
  doorLeaf(ext, DOOR_W / 2 + 0.02, 0.07, Math.PI, 1);
  // hold-open hook chain
  ext.add(cyl(0.008, 0.008, 0.3, 6), M.steel, 1.15, 1.5, 0.05, 0, 0, Math.PI / 2.4);
  // inner door: hinge on -x side at main front wall, swings into room
  doorLeaf(int, -DOOR_W / 2 - 0.02, Z1 - 0.05, -Math.PI / 2, -1, M.cream, M.alu, M.darkMetal);

  // ---------- main roof (gable, ridge along z) ----------
  const ridgeH = 3.62, eaveH = 3.04, half = 3.8;
  const slope = Math.atan2(ridgeH - eaveH, half);
  const rl = Math.hypot(half, ridgeH - eaveH);
  const RZ0 = Z0 - TW - 0.35, RZ1 = Z1 + TW + 0.3;
  for (const s of [1, -1]) {
    ext.add(box(rl, 0.14, RZ1 - RZ0), M.roof, s * half / 2, (ridgeH + eaveH) / 2 + 0.08, (RZ0 + RZ1) / 2, 0, 0, -s * slope);
    // fascia
    ext.add(box(0.05, 0.22, RZ1 - RZ0), M.trim, s * (half + 0.02), eaveH + 0.02, (RZ0 + RZ1) / 2);
  }
  // gable triangles
  const tri = new THREE.Shape(); tri.moveTo(-3.4, 0); tri.lineTo(3.4, 0); tri.lineTo(0, ridgeH - WT + 0.1); tri.closePath();
  const triG = new THREE.ExtrudeGeometry(tri, { depth: eo, bevelEnabled: false });
  ext.add(triG, M.clad, 0, WT, Z1 + TW - eo);
  ext.add(triG, M.clad, 0, WT, Z0 - TW);
  // roof snow: windward (+x) thin & patchy, lee (-x) thick with cornice
  ext.add(new RoundedBoxGeometry(rl * 0.92, 0.1, RZ1 - RZ0 - 0.3, 2, 0.045), M.snow, half / 2 - 0.15, (ridgeH + eaveH) / 2 + 0.17, (RZ0 + RZ1) / 2, 0, 0, -slope);
  ext.add(new RoundedBoxGeometry(rl + 0.1, 0.28, RZ1 - RZ0 - 0.1, 3, 0.13), M.snow, -half / 2 - 0.05, (ridgeH + eaveH) / 2 + 0.24, (RZ0 + RZ1) / 2, 0, 0, slope);
  // cornice lip curling over lee eave
  const corn = new THREE.CapsuleGeometry(0.16, RZ1 - RZ0 - 0.6, 4, 10);
  ext.add(corn, M.snow, -half - 0.12, eaveH + 0.12, (RZ0 + RZ1) / 2, Math.PI / 2, 0, 0, 1.0, 1, 0.75);
  // stove flue + antenna + vent on roof
  ext.add(cyl(0.07, 0.07, 1.4, 14), M.trim, 2.75, 3.6, -6.7);
  ext.add(cyl(0.14, 0.1, 0.12, 14), M.steel, 2.75, 4.32, -6.7);
  ext.add(cyl(0.18, 0.18, 0.02, 14), M.steel, 2.75, 4.42, -6.7);
  ext.add(cyl(0.025, 0.025, 2.4, 8), M.trim, -1.5, 4.6, -6.2);
  for (let i = 0; i < 4; i++) ext.add(cyl(0.01, 0.01, 0.6 - i * 0.12, 6), M.trim, -1.5, 5.0 + i * 0.35, -6.2, 0, 0, Math.PI / 2);
  ext.add(cyl(0.004, 0.004, 3.6, 4), M.steel, -2.4, 4.4, -6.2, 0, 0, 0.53);
  ext.add(cyl(0.004, 0.004, 3.6, 4), M.steel, -0.6, 4.4, -6.2, 0, 0, -0.53);

  // ---------- skids + base ----------
  for (const sx of [-2.6, 2.6]) {
    addSpan(ext, M.steel, sx - 0.12, sx + 0.12, 0.27, 0.3, Z0 - 0.5, Z1 + 0.5);
    addSpan(ext, M.steel, sx - 0.03, sx + 0.03, 0.03, 0.27, Z0 - 0.5, Z1 + 0.5);
    addSpan(ext, M.steel, sx - 0.12, sx + 0.12, 0.0, 0.03, Z0 - 0.5, Z1 + 0.5);
    // upturned skid tips + tow eye
    ext.add(box(0.24, 0.03, 0.5), M.steel, sx, 0.12, Z1 + 0.68, -0.5, 0, 0);
    ext.add(new THREE.TorusGeometry(0.06, 0.015, 6, 12), M.steel, sx, 0.25, Z1 + 0.92);
  }
  // corner trims with exposed bolts
  const boltGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.012, 6);
  const washerGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.004, 12);
  const bolts = [];  // [x,y,z,nx,nz]
  for (const [cx, cz, nx, nz] of [[X1 + TW, Z1 + TW, 1, 1], [X0 - TW, Z1 + TW, -1, 1], [X1 + TW, Z0 - TW, 1, -1], [X0 - TW, Z0 - TW, -1, -1]]) {
    addSpan(ext, M.trim, Math.min(cx, cx + nx * 0.008) - (nx < 0 ? 0 : 0), Math.max(cx, cx + nx * 0.008), WB, WT + 0.02, Math.min(cz - nz * 0.12, cz), Math.max(cz - nz * 0.12, cz));
    addSpan(ext, M.trim, Math.min(cx - nx * 0.12, cx), Math.max(cx - nx * 0.12, cx), WB, WT + 0.02, Math.min(cz, cz + nz * 0.008), Math.max(cz, cz + nz * 0.008));
    for (let y = WB + 0.15; y < WT; y += 0.4) { bolts.push([cx + nx * 0.008, y, cz - nz * 0.06, nx, 0]); bolts.push([cx - nx * 0.06, y, cz + nz * 0.008, 0, nz]); }
  }
  // panel joint battens along long walls with fasteners
  for (let x = X0 - TW + 1.2; x < X1 + TW - 0.3; x += 1.2) {
    for (const [z, nz] of [[Z0 - TW, -1]]) {
      addSpan(ext, M.trim, x - 0.03, x + 0.03, WB, WT, z - 0.01, z);
      for (let y = WB + 0.2; y < WT; y += 0.45) bolts.push([x, y, z - 0.01, 0, nz]);
    }
  }
  for (const x of [-3.0, -1.4, 1.4, 3.0]) {
    addSpan(ext, M.trim, x - 0.03, x + 0.03, WB, WT, Z1 + TW, Z1 + TW + 0.01);
    for (let y = WB + 0.2; y < WT; y += 0.45) bolts.push([x, y, Z1 + TW + 0.01, 0, 1]);
  }
  for (let z = Z0 - TW + 1.2; z < Z1 + TW - 0.2; z += 1.2) {
    for (const [x, nx] of [[X1 + TW, 1], [X0 - TW, -1]]) {
      if (Math.abs(z - winRight[0][0]) < 0.6 && nx > 0) continue;
      if (Math.abs(z - winLeft[0][0]) < 0.5 && nx < 0) continue;
      addSpan(ext, M.trim, Math.min(x, x + nx * 0.01), Math.max(x, x + nx * 0.01), WB, WT, z - 0.03, z + 0.03);
      for (let y = WB + 0.2; y < WT; y += 0.45) bolts.push([x + nx * 0.01, y, z, nx, 0]);
    }
  }
  // base flashing along bottom with bolts
  addSpan(ext, M.trim, X0 - TW - 0.01, X1 + TW + 0.01, WB, WB + 0.12, Z0 - TW - 0.01, Z0 - TW);
  addSpan(ext, M.trim, X0 - TW - 0.01, X1 + TW + 0.01, WB, WB + 0.12, Z1 + TW, Z1 + TW + 0.01);
  addSpan(ext, M.trim, X1 + TW, X1 + TW + 0.01, WB, WB + 0.12, Z0 - TW, Z1 + TW);
  addSpan(ext, M.trim, X0 - TW - 0.01, X0 - TW, WB, WB + 0.12, Z0 - TW, Z1 + TW);
  // vestibule corner trims + bolts
  for (const sx of [1, -1]) {
    addSpan(ext, M.trim, Math.min(sx * (VX + TW), sx * (VX + TW + 0.008)), Math.max(sx * (VX + TW), sx * (VX + TW + 0.008)), WB, VC + 0.2, -0.12, 0);
    addSpan(ext, M.trim, Math.min(sx * (VX + TW - 0.12), sx * (VX + TW)), Math.max(sx * (VX + TW - 0.12), sx * (VX + TW)), WB, VC + 0.2, 0, 0.008);
    for (let y = WB + 0.15; y < VC + 0.1; y += 0.4) { bolts.push([sx * (VX + TW + 0.008), y, -0.06, sx, 0]); bolts.push([sx * (VX + TW - 0.06), y, 0.008, 0, 1]); }
  }
  const up = new THREE.Vector3(0, 1, 0);
  const bm = new THREE.Matrix4(); const bq = new THREE.Quaternion();
  for (const [x, y, z, nx, nz] of bolts) {
    bq.setFromUnitVectors(up, new THREE.Vector3(nx, 0, nz));
    bm.compose(new THREE.Vector3(x + nx * 0.006, y, z + nz * 0.006), bq, new THREE.Vector3(1, 1, 1));
    ext.addM(boltGeo, M.bolt, bm);
    bm.compose(new THREE.Vector3(x + nx * 0.002, y, z + nz * 0.002), bq, new THREE.Vector3(1, 1, 1));
    ext.addM(washerGeo, M.bolt, bm);
  }

  // ---------- exterior wall equipment ----------
  // door lamp (caged bulkhead)
  ext.add(box(0.26, 0.12, 0.16), M.steel, 0, DOOR_TOP + 0.24, 0.08);
  ext.add(new THREE.SphereGeometry(0.07, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.lampExt, 0, DOOR_TOP + 0.18, 0.12, Math.PI, 0, 0);
  for (let i = 0; i < 3; i++) ext.add(new THREE.TorusGeometry(0.075, 0.006, 4, 16, Math.PI), M.steel, -0.04 + i * 0.04, DOOR_TOP + 0.18, 0.12, 0, Math.PI / 2, Math.PI);
  // station sign
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.28), new THREE.MeshStandardMaterial({ map: T.label('FIELD HUT K-4', { bg: '#f0efe8', fg: '#1a2a4a', font: 'bold 30px sans-serif', sub: 'ELEV 2 841 m · EMERG CH 16', w: 512, h: 200 }), roughness: 0.6 }));
  sign.position.set(-0.68, 2.0, 0.012); sign.scale.set(0.55, 0.6, 1); scene.add(sign);
  // vent hood on windward wall + conduit box + cable
  ext.add(box(0.06, 0.3, 0.4), M.trim, X1 + TW + 0.03, 2.4, -6.2);
  ext.add(box(0.18, 0.04, 0.42), M.trim, X1 + TW + 0.1, 2.56, -6.2, 0, 0, -0.35);
  ext.add(box(0.12, 0.26, 0.2), M.steel, X0 - TW - 0.06, 1.2, -6.0);
  ext.add(cyl(0.015, 0.015, 0.9, 6), M.rubber, X0 - TW - 0.05, 0.65, -6.0);
  // power cable running across snow to "generator" sled
  ext.add(box(0.5, 0.5, 0.8), M.yellow, -6.5, terrainH(-6.5, -9.5) + 0.25, -9.5);
  ext.add(box(0.52, 0.04, 0.82), M.snow, -6.5, terrainH(-6.5, -9.5) + 0.52, -9.5);

  // ---------- deck + steps ----------
  addSpan(ext, M.grate, -1.3, 1.3, FLOOR - 0.06, FLOOR, 0, 1.3);
  addSpan(ext, M.steel, -1.3, 1.3, FLOOR - 0.14, FLOOR - 0.06, 1.24, 1.3);
  addSpan(ext, M.steel, -1.3, -1.24, FLOOR - 0.14, FLOOR - 0.06, 0, 1.3);
  addSpan(ext, M.steel, 1.24, 1.3, FLOOR - 0.14, FLOOR - 0.06, 0, 1.3);
  for (const [px, pz] of [[-1.25, 0.1], [1.25, 0.1], [-1.25, 1.25], [1.25, 1.25]]) addSpan(ext, M.steel, px - 0.04, px + 0.04, -0.2, FLOOR - 0.06, pz - 0.04, pz + 0.04);
  const steps = [[1.3, 1.6, 0.375], [1.6, 1.9, 0.25], [1.9, 2.2, 0.125]];
  for (const [z0, z1, y] of steps) {
    addSpan(ext, M.grate, -0.7, 0.7, y - 0.04, y, z0, z1);
    addSpan(ext, M.trim, -0.7, 0.7, y - 0.035, y, z1 - 0.03, z1);   // nosing
  }
  // stringers
  for (const sx of [-0.73, 0.73]) ext.add(box(0.04, 0.16, 1.15), M.steel, sx, 0.22, 1.74, -Math.atan2(0.5, 0.9), 0, 0);
  // railings
  const rail = (x0, z0, y0, x1, z1, y1) => {
    const len = Math.hypot(x1 - x0, y1 - y0, z1 - z0);
    const mid = [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2];
    const dir = new THREE.Vector3(x1 - x0, y1 - y0, z1 - z0).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(up, dir);
    const m = new THREE.Matrix4().compose(new THREE.Vector3(...mid), q, new THREE.Vector3(1, 1, 1));
    ext.addM(cyl(0.022, 0.022, len, 10), M.trim, m);
  };
  const post = (x, z, y0, h) => ext.add(cyl(0.022, 0.022, h, 10), M.trim, x, y0 + h / 2, z);
  for (const sx of [-1.27, 1.27]) {
    post(sx, 0.12, FLOOR, 1.0); post(sx, 1.27, FLOOR, 1.0);
    rail(sx, 0.12, FLOOR + 1.0, sx, 1.27, FLOOR + 1.0); rail(sx, 0.12, FLOOR + 0.5, sx, 1.27, FLOOR + 0.5);
    col(sx - 0.05, sx + 0.05, 0, 1.3);
  }
  for (const sx of [-1, 1]) {
    rail(sx * 1.27, 1.27, FLOOR + 1.0, sx * 0.74, 1.27, FLOOR + 1.0);
    post(sx * 0.74, 1.27, FLOOR, 1.0);
    post(sx * 0.74, 2.15, 0.12, 1.0);
    rail(sx * 0.74, 1.27, FLOOR + 1.0, sx * 0.74, 2.15, 1.12);
    rail(sx * 0.74, 1.27, FLOOR + 0.5, sx * 0.74, 2.15, 0.62);
    col(sx * 0.74 - 0.05, sx * 0.74 + 0.05, 1.27, 2.2);
    col(Math.min(sx * 1.3, sx * 0.74), Math.max(sx * 1.3, sx * 0.74), 1.24, 1.32);
  }
  // snow drifted into deck corners & step ends
  const lump = (x, y, z, sx, sy, sz) => ext.add(new THREE.SphereGeometry(1, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.snow, x, y, z, 0, rnd() * 3, 0, sx, sy, sz);
  lump(-1.12, FLOOR, 0.12, 0.2, 0.06, 0.12); lump(1.15, FLOOR, 1.18, 0.15, 0.05, 0.12);
  lump(-0.6, 0.375, 1.45, 0.12, 0.03, 0.1); lump(0.62, 0.25, 1.78, 0.1, 0.03, 0.1); lump(-0.62, 0.125, 2.05, 0.12, 0.03, 0.1);
  // snow tracked onto vestibule mat (interior)
  for (let i = 0; i < 4; i++) int.add(new THREE.SphereGeometry(1, 10, 5, 0, Math.PI * 2, 0, Math.PI / 2), M.snow, (rnd() - 0.5) * 0.5, FLOOR, -0.3 - rnd() * 0.35, 0, rnd() * 3, 0, 0.03 + rnd() * 0.03, 0.006, 0.025 + rnd() * 0.02);

  // ---------- icicles under eaves, railing ----------
  const iceGeo = new THREE.ConeGeometry(1, 1, 7, 1);
  const icicle = (x, y, z, len, r) => ext.add(iceGeo, M.ice, x, y - len / 2, z, Math.PI, rnd() * 3, (rnd() - 0.5) * 0.08, r, len, r);
  for (let z = RZ0 + 0.2; z < RZ1 - 0.1; z += 0.09 + rnd() * 0.18) {
    if (rnd() < 0.3) continue;
    const L = 0.05 + Math.pow(rnd(), 2.2) * 0.45; icicle(-half - 0.05, eaveH - 0.08, z, L, 0.012 + L * 0.06);
    if (rnd() < 0.35) { const L2 = 0.03 + rnd() * 0.1; icicle(half + 0.02, eaveH - 0.08, z, L2, 0.01 + L2 * 0.05); }
  }
  for (let x = -1.2; x < 1.25; x += 0.12 + rnd() * 0.12) { if (rnd() < 0.4) continue; const L = 0.03 + rnd() * 0.18; icicle(x, VC + 0.2, 0.35 + x * 0.0, L, 0.01 + L * 0.06); }
  for (let z = 0.2; z < 1.25; z += 0.15 + rnd() * 0.2) { if (rnd() < 0.5) continue; const L = 0.02 + rnd() * 0.08; icicle(1.27, FLOOR + 0.98, z, L, 0.008 + L * 0.06); }

  // ---------- exterior props ----------
  // fuel drums half-buried on lee side
  const drum = (x, z, mat, tilt = 0) => {
    const y = terrainH(x, z);
    ext.add(cyl(0.29, 0.29, 0.88, 20), mat, x, y + 0.36, z, tilt, rnd() * 3, 0);
    for (const dy of [-0.15, 0.15]) ext.add(new THREE.TorusGeometry(0.292, 0.012, 4, 24), mat, x, y + 0.36 + dy, z, Math.PI / 2 + tilt, 0, 0);
    ext.add(cyl(0.27, 0.29, 0.07, 20), M.snow, x, y + 0.82, z, tilt, 0, 0);
    col(x - 0.32, x + 0.32, z - 0.32, z + 0.32);
  };
  drum(-5.2, -1.6, M.drumBlue); drum(-5.85, -1.35, M.drumBlue); drum(-5.5, -0.8, M.drumRed, 0.06); drum(-4.7, -0.6, M.drumBlue);
  // Nansen sled with crates (right side, near entrance)
  {
    const sx = 4.6, sz = 0.8, y = terrainH(sx, sz);
    for (const o of [-0.35, 0.35]) { ext.add(box(0.05, 0.04, 2.4), M.crate, sx + o, y + 0.03, sz); ext.add(box(0.05, 0.04, 0.4), M.crate, sx + o, y + 0.1, sz + 1.33, -0.6, 0, 0); }
    for (let i = 0; i < 6; i++) { const z = sz - 1.0 + i * 0.4; ext.add(box(0.05, 0.25, 0.05), M.crate, sx - 0.35, y + 0.17, z); ext.add(box(0.05, 0.25, 0.05), M.crate, sx + 0.35, y + 0.17, z); }
    ext.add(box(0.85, 0.035, 2.2), M.crate, sx, y + 0.3, sz);
    ext.add(box(0.6, 0.4, 0.5), M.crate, sx, y + 0.52, sz - 0.5);
    ext.add(box(0.62, 0.05, 0.52), M.snow, sx, y + 0.74, sz - 0.5);
    ext.add(box(0.55, 0.32, 0.6), M.yellow, sx - 0.02, y + 0.48, sz + 0.3, 0, 0.1, 0);
    ext.add(box(0.5, 0.03, 0.55), M.snow, sx - 0.02, y + 0.65, sz + 0.3, 0, 0.1, 0);
    col(sx - 0.45, sx + 0.45, sz - 1.25, sz + 1.5);
  }
  // route flags leading toward the entrance
  for (let i = 0; i < 7; i++) {
    const fx = (i % 2 ? 1.6 : -1.6), fz = 3.0 + i * 2.6; const y = terrainH(fx, fz);
    const lean = (rnd() - 0.5) * 0.06;
    ext.add(cyl(0.012, 0.015, 2.0, 6), M.bamboo, fx, y + 1.0, fz, lean, 0, lean);
    const fg = new THREE.PlaneGeometry(0.34, 0.24, 6, 1);
    const p = fg.attributes.position; for (let k = 0; k < p.count; k++) { const xx = p.getX(k) + 0.17; p.setZ(k, Math.sin(xx * 9 + i) * 0.03 * xx * 3); p.setY(k, p.getY(k) - xx * 0.12); }
    fg.computeVertexNormals();
    ext.add(fg, i % 2 ? M.flagR : M.flagG, fx + 0.17 * WIND.x, y + 1.82, fz + 0.17 * WIND.z, 0, Math.atan2(WIND.z, -WIND.x) * -1 + Math.PI, 0);
    col(fx - 0.05, fx + 0.05, fz - 0.05, fz + 0.05);
  }
  // snow fence (slatted) at x=9 with drift on lee
  for (let z = -4.5; z <= 9; z += 1.5) {
    const y = terrainH(9.0, z);
    ext.add(box(0.08, 1.9, 0.08), M.fence, 9.0, y + 0.75, z);
  }
  for (let h = 0.35; h < 1.6; h += 0.27) {
    for (let z = -4.5; z < 9; z += 1.5) {
      const y = Math.max(terrainH(9.0, z), terrainH(9.0, z + 1.5));
      ext.add(box(0.025, 0.14, 1.5), M.fence, 9.06, y + h, z + 0.75, 0, 0, (rnd() - 0.5) * 0.03);
    }
  }
  col(8.9, 9.15, -4.6, 9.1);
  // automatic weather station mast with rime on windward side
  {
    const mx = 6.0, mz = -7.5, y = terrainH(mx, mz);
    ext.add(cyl(0.03, 0.035, 3.6, 10), M.trim, mx, y + 1.8, mz);
    ext.add(box(0.9, 0.03, 0.03), M.trim, mx, y + 3.4, mz);
    ext.add(box(0.5, 0.7, 0.04), M.solar, mx + 0.0, y + 1.7, mz + 0.12, -0.6, 0, 0);
    ext.add(box(0.3, 0.4, 0.18), M.steel, mx, y + 1.0, mz - 0.1);
    ext.add(cyl(0.008, 0.008, 0.25, 6), M.trim, mx + 0.42, y + 3.53, mz);
    for (let k = 0; k < 3; k++) { const a = k * 2.09; ext.add(new THREE.SphereGeometry(0.035, 8, 6, 0, Math.PI), M.trim, mx + 0.42 + Math.cos(a) * 0.09, y + 3.66, mz + Math.sin(a) * 0.09, 0, a, 0); }
    ext.add(box(0.2, 0.06, 0.03), M.trim, mx - 0.4, y + 3.5, mz);
    // rime feathers growing into the wind (+x)
    for (let k = 0; k < 18; k++) { const yy = y + 0.3 + k * 0.18; ext.add(new THREE.ConeGeometry(0.02, 0.09 + rnd() * 0.06, 5), M.snow, mx + 0.06, yy, mz + (rnd() - 0.5) * 0.02, 0, 0, -Math.PI / 2); }
    // guy wires
    for (const [gx, gz] of [[1.5, 1.0], [-1.5, 1.0], [0, -1.6]]) {
      const x1 = mx + gx, z1 = mz + gz, y1 = terrainH(x1, z1);
      rail.call(null, mx, mz, y + 3.0, x1, z1, y1);
    }
    col(mx - 0.25, mx + 0.25, mz - 0.25, mz + 0.25);
  }
  // blue ice patch (wind-polished)
  {
    const sh = new THREE.Shape(); const n = 28;
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; const r = 1.5 + Math.sin(a * 3 + 1) * 0.25 + Math.sin(a * 7) * 0.12; const p = [Math.cos(a) * r * 1.3, Math.sin(a) * r * 0.8]; i ? sh.lineTo(...p) : sh.moveTo(...p); }
    const g = new THREE.ShapeGeometry(sh, 4); g.rotateX(-Math.PI / 2); g.rotateY(0.25);
    ext.add(g, M.blueIce, 6.2, 0.035, 4.5, 0, 0, 0, 0.75, 1, 0.75);
  }

  // =====================================================================
  // INTERIOR
  // =====================================================================
  // ceiling battens and light fixtures
  for (let x = -2.4; x <= 2.4; x += 1.2) addSpan(int, M.alu, x - 0.02, x + 0.02, CEIL - 0.015, CEIL, Z0, Z1);
  const fixture = (x, z) => {
    addSpan(int, M.alu, x - 0.09, x + 0.09, CEIL - 0.07, CEIL, z - 0.6, z + 0.6);
    addSpan(int, M.lampI, x - 0.06, x + 0.06, CEIL - 0.085, CEIL - 0.07, z - 0.56, z + 0.56);
  };
  fixture(-0.9, -4.75); fixture(0.9, -4.75);
  // cable tray along ceiling + conduit down to bench
  addSpan(int, M.darkMetal, 2.3, 2.5, CEIL - 0.12, CEIL - 0.08, Z0, Z1);
  for (let k = 0; k < 3; k++) int.add(cyl(0.012, 0.012, 6.5, 6), [M.blackPl, M.orangePl, M.greyPl][k], 2.35 + k * 0.05, CEIL - 0.065, -4.75, Math.PI / 2, 0, 0);
  // floor mat runner
  addSpan(int, M.mat, -0.5, 0.5, FLOOR, FLOOR + 0.008, -6.2, Z1);
  // skirting
  addSpan(int, M.alu, X0, X1, FLOOR, FLOOR + 0.08, Z0, Z0 + 0.012);
  addSpan(int, M.alu, X0, X0 + 0.012, FLOOR, FLOOR + 0.08, Z0, Z1);
  addSpan(int, M.alu, X1 - 0.012, X1, FLOOR, FLOOR + 0.08, Z0, Z1);

  // --- workbench (right wall) x[2.45,3.2] z[-6.4,-3.2]
  const BT = FLOOR + 0.9;
  addSpan(int, M.ply, 2.45, 3.2, BT - 0.04, BT, -6.4, -3.2);
  addSpan(int, M.plyDark, 2.47, 3.18, BT - 0.08, BT - 0.04, -6.38, -3.22);
  for (const z of [-6.35, -4.8, -3.25]) for (const x of [2.5, 3.15]) addSpan(int, M.alu, x - 0.025, x + 0.025, FLOOR, BT - 0.08, z - 0.025, z + 0.025);
  addSpan(int, M.ply, 2.5, 3.18, FLOOR + 0.18, FLOOR + 0.2, -6.35, -3.25);  // lower shelf
  col(2.42, 3.25, -6.42, -3.18);
  // pegboard panels with tools
  for (const [z0, z1] of [[-6.35, -5.35], [-4.2, -3.25]]) {
    addSpan(int, M.plyDark, X1 - 0.02, X1, BT + 0.15, BT + 1.1, z0, z1);
    for (let k = 0; k < 5; k++) {
      const z = z0 + 0.12 + k * (z1 - z0 - 0.2) / 4, y = BT + 0.5 + (k % 2) * 0.3;
      const tool = k % 3;
      if (tool === 0) { int.add(box(0.02, 0.22, 0.03), M.darkMetal, X1 - 0.04, y, z); int.add(box(0.03, 0.1, 0.035), M.redFab, X1 - 0.045, y - 0.15, z); }
      else if (tool === 1) { int.add(box(0.02, 0.25, 0.02), M.steelI, X1 - 0.04, y, z); int.add(box(0.03, 0.05, 0.08), M.steelI, X1 - 0.04, y + 0.13, z); }
      else { int.add(new THREE.TorusGeometry(0.07, 0.015, 6, 14), M.orangePl, X1 - 0.04, y, z, 0, Math.PI / 2, 0); }
    }
  }
  // vise
  int.add(box(0.14, 0.1, 0.22), M.bluePl, 2.6, BT + 0.05, -3.45);
  int.add(box(0.03, 0.03, 0.3), M.steelI, 2.6, BT + 0.07, -3.3);
  // laptop with data
  const screenTex = T.label('', { bg: '#081218', border: false, w: 256, h: 160 });
  {
    const c = screenTex.image; const g = c.getContext('2d');
    g.strokeStyle = '#46d18a'; g.lineWidth = 2; g.beginPath();
    for (let i = 0; i < 256; i++) g.lineTo(i, 100 - Math.sin(i * 0.07) * 25 - Math.sin(i * 0.31) * 6);
    g.stroke(); g.fillStyle = '#9fc7ff'; g.font = '14px monospace'; g.fillText('AWS-2  T -31.4C  WS 7.2m/s', 8, 20); g.fillText('P 712.6 hPa  RH 64%', 8, 38);
    g.strokeStyle = '#ffb347'; g.beginPath(); for (let i = 0; i < 256; i++) g.lineTo(i, 140 - Math.cos(i * 0.05) * 10); g.stroke();
    screenTex.needsUpdate = true;
  }
  const scrMat = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffffff, emissiveMap: screenTex, emissiveIntensity: 1.2 });
  int.add(box(0.34, 0.018, 0.24), M.blackPl, 2.82, BT + 0.009, -4.15, 0, -1.65, 0);
  const lap = new THREE.Group(); lap.position.set(2.98, BT + 0.018, -4.15); lap.rotation.y = -Math.PI / 2 - 0.08;
  const lid = new THREE.Mesh(box(0.34, 0.23, 0.012), M.blackPl); lid.position.set(0, 0.11, -0.0); lid.rotation.x = -0.25; lap.add(lid);
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.31, 0.2), scrMat); scr.position.set(0, 0.112, 0.0075); scr.rotation.x = -0.25; scr.position.z += 0.0; lap.add(scr);
  iscene.add(lap);
  lid.castShadow = true;
  // HF radio + data logger
  int.add(box(0.35, 0.14, 0.28), M.darkMetal, 2.95, BT + 0.07, -5.0);
  int.add(box(0.33, 0.1, 0.005), M.blackPl, 2.8, BT + 0.08, -5.0, 0, Math.PI / 2, 0);
  for (let k = 0; k < 4; k++) int.add(cyl(0.015, 0.015, 0.02, 10), M.steelI, 2.79, BT + 0.07, -5.12 + k * 0.08, 0, 0, Math.PI / 2);
  int.add(new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.025)).geometry, M.lampI, 2.795, BT + 0.115, -4.9, 0, -Math.PI / 2, 0);
  int.add(box(0.08, 0.2, 0.06), M.blackPl, 2.95, BT + 0.25, -5.05); // handset
  // ice core tray (icy surfaces)
  int.add(box(0.3, 0.06, 1.0), M.bluePl, 2.75, BT + 0.03, -5.85);
  for (let k = 0; k < 3; k++) int.add(cyl(0.045, 0.045, 0.28 + k * 0.08, 18), M.iceI, 2.68 + k * 0.08, BT + 0.075, -5.85, Math.PI / 2, 0, 0);
  int.add(box(0.12, 0.002, 0.08), M.cream, 2.75, BT + 0.061, -5.45);
  // multimeter, toolbox, mug, notebook
  int.add(box(0.09, 0.03, 0.16), M.yellowPl, 2.65, BT + 0.015, -4.55, 0, 0.3, 0);
  int.add(box(0.5, 0.22, 0.24), M.redFab, 2.85, FLOOR + 0.31, -3.8);
  int.add(box(0.5, 0.03, 0.03), M.steelI, 2.85, FLOOR + 0.44, -3.8);
  int.add(cyl(0.04, 0.035, 0.1, 14), M.cream, 2.6, BT + 0.05, -3.75);
  int.add(box(0.15, 0.015, 0.21), M.blueFab, 2.7, BT + 0.008, -4.6, 0, -0.2, 0);
  // bench lamp (articulated)
  int.add(cyl(0.07, 0.08, 0.03, 14), M.darkMetal, 3.05, BT + 0.015, -5.55);
  int.add(cyl(0.01, 0.01, 0.5, 6), M.darkMetal, 3.0, BT + 0.25, -5.5, 0, 0, 0.25);
  int.add(cyl(0.01, 0.01, 0.42, 6), M.darkMetal, 2.86, BT + 0.55, -5.5, 0, 0, -1.0);
  int.add(cyl(0.05, 0.08, 0.12, 14, true), M.orangePl, 2.68, BT + 0.6, -5.5, 0, 0, 0.6);
  int.add(new THREE.SphereGeometry(0.03, 10, 6), M.lampI, 2.66, BT + 0.57, -5.5);
  // stool
  int.add(cyl(0.17, 0.17, 0.04, 16), M.blackPl, 2.05, FLOOR + 0.62, -4.4);
  for (let k = 0; k < 3; k++) { const a = k * 2.09; int.add(cyl(0.012, 0.012, 0.64, 6), M.alu, 2.05 + Math.cos(a) * 0.1, FLOOR + 0.3, -4.4 + Math.sin(a) * 0.1, Math.sin(a) * 0.12, 0, -Math.cos(a) * 0.12); }
  col(1.85, 2.25, -4.6, -4.2);

  // --- heater in back-right corner + flue
  addSpan(int, M.cream, 2.55, 3.15, FLOOR, FLOOR + 0.55, -6.95, -6.5);
  addSpan(int, M.darkMetal, 2.58, 3.12, FLOOR + 0.55, FLOOR + 0.58, -6.92, -6.53);
  addSpan(int, M.heaterGlow, 2.65, 3.05, FLOOR + 0.18, FLOOR + 0.36, -6.5, -6.495);
  for (let k = 0; k < 6; k++) addSpan(int, M.darkMetal, 2.65, 3.05, FLOOR + 0.19 + k * 0.03, FLOOR + 0.2 + k * 0.03, -6.49, -6.485);
  int.add(cyl(0.06, 0.06, CEIL - FLOOR - 0.58, 14), M.steelI, 2.75, (FLOOR + 0.58 + CEIL) / 2, -6.7);
  int.add(cyl(0.02, 0.02, 1.2, 6), M.copper, 3.1, FLOOR + 0.3, -6.0, Math.PI / 2, 0, 0);
  col(2.5, 3.2, -7.0, -6.45);

  // --- shelving rack on back wall x[-0.4,2.2]
  for (const x of [-0.4, 0.9, 2.2]) for (const z of [-6.95, -6.52]) addSpan(int, M.alu, x - 0.02, x + 0.02, FLOOR, FLOOR + 2.2, z - 0.02, z + 0.02);
  const shelfY = [0.12, 0.62, 1.12, 1.62, 2.12];
  for (const y of shelfY) addSpan(int, M.alu, -0.42, 2.22, FLOOR + y - 0.02, FLOOR + y, -6.97, -6.5);
  const binCols = [M.bluePl, M.greyPl, M.yellowPl, M.greyPl, M.orangePl, M.bluePl, M.cardboard, M.cardboard];
  const labels = ['SPARES', 'SENSORS', 'FOOD', 'CABLES', 'SAMPLES', 'MED', 'FILTERS', 'BATT'];
  let li = 0;
  for (let s = 0; s < 4; s++) {
    let x = -0.36;
    while (x < 2.0) {
      const w = 0.35 + rnd() * 0.25; if (x + w > 2.18) break;
      const h = 0.18 + rnd() * 0.22, d = 0.36 + rnd() * 0.06;
      const m = binCols[Math.floor(rnd() * binCols.length)];
      if (rnd() < 0.85) {
        int.add(new RoundedBoxGeometry(w, h, d, 1, 0.015), m, x + w / 2, FLOOR + shelfY[s] + h / 2, -6.73 + (rnd() - 0.5) * 0.04, 0, (rnd() - 0.5) * 0.06, 0);
        if (rnd() < 0.5 && li < 16) {
          const lab = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.07), new THREE.MeshStandardMaterial({ map: T.label(labels[li % labels.length], { w: 256, h: 112, font: 'bold 40px sans-serif' }), roughness: 0.7, envMap: warmEnv, envMapIntensity: 0.5 }));
          lab.position.set(x + w / 2, FLOOR + shelfY[s] + h * 0.55, -6.73 + d / 2 + 0.003); iscene.add(lab); li++;
        }
      }
      x += w + 0.04;
    }
  }
  // jerrycans on floor
  for (let k = 0; k < 2; k++) { int.add(new RoundedBoxGeometry(0.17, 0.45, 0.34, 2, 0.03), k ? M.redFab : M.greenFab, 1.5 + k * 0.25, FLOOR + 0.225, -6.4); int.add(box(0.04, 0.04, 0.12), M.blackPl, 1.5 + k * 0.25, FLOOR + 0.47, -6.45); }
  col(-0.45, 2.25, -7.0, -6.25);

  // --- bunk bed (back-left) x[-3.2,-2.3] z[-7.0,-5.0]
  for (const z of [-6.97, -5.03]) for (const x of [-3.17, -2.33]) addSpan(int, M.alu, x - 0.03, x + 0.03, FLOOR, FLOOR + 1.85, z - 0.03, z + 0.03);
  for (const y of [0.32, 1.27]) {
    addSpan(int, M.alu, -3.2, -2.3, FLOOR + y - 0.05, FLOOR + y, -7.0, -6.94);
    addSpan(int, M.alu, -3.2, -2.3, FLOOR + y - 0.05, FLOOR + y, -5.06, -5.0);
    addSpan(int, M.alu, -2.36, -2.3, FLOOR + y - 0.05, FLOOR + y, -7.0, -5.0);
    addSpan(int, M.ply, -3.18, -2.32, FLOOR + y - 0.03, FLOOR + y, -6.96, -5.04);
    int.add(new RoundedBoxGeometry(0.82, 0.12, 1.88, 2, 0.05), M.mattress, -2.75, FLOOR + y + 0.06, -6.0);
    // sleeping bag (rumpled)
    int.add(new THREE.CapsuleGeometry(0.28, 1.2, 4, 12), y < 1 ? M.redFab : M.blueFab, -2.72, FLOOR + y + 0.17, -5.85, Math.PI / 2, 0.05, 0, 1, 1, 0.42);
    int.add(new RoundedBoxGeometry(0.45, 0.1, 0.3, 2, 0.05), M.cream, -2.8, FLOOR + y + 0.17, -6.75, 0, 0.1, 0);
  }
  addSpan(int, M.alu, -2.36, -2.3, FLOOR + 1.27, FLOOR + 1.6, -6.4, -6.36); // upper guard
  for (let k = 0; k < 4; k++) addSpan(int, M.alu, -2.29, -2.25, FLOOR + 0.5 + k * 0.3, FLOOR + 0.53 + k * 0.3, -5.45, -5.1);
  col(-3.2, -2.25, -7.0, -4.97);

  // --- kitchen counter (left wall) x[-3.2,-2.6] z[-4.7,-2.75]
  addSpan(int, M.ply, -3.2, -2.58, FLOOR + 0.86, FLOOR + 0.9, -4.7, -2.75);
  addSpan(int, M.cream, -3.18, -2.62, FLOOR, FLOOR + 0.86, -4.68, -2.77);
  for (const z of [-4.2, -3.25]) { addSpan(int, M.alu, -2.62, -2.61, FLOOR + 0.1, FLOOR + 0.8, z - 0.45, z + 0.44); int.add(box(0.02, 0.02, 0.18), M.steelI, -2.6, FLOOR + 0.7, z + 0.3); }
  // stove 2-burner
  int.add(box(0.36, 0.08, 0.55), M.steelI, -2.9, FLOOR + 0.94, -4.25);
  for (const z of [-4.38, -4.1]) int.add(new THREE.TorusGeometry(0.07, 0.008, 5, 16), M.darkMetal, -2.9, FLOOR + 0.985, z, Math.PI / 2, 0, 0);
  // kettle + pot
  int.add(cyl(0.07, 0.09, 0.17, 18), M.steelI, -2.9, FLOOR + 1.07, -4.38);
  int.add(new THREE.TorusGeometry(0.06, 0.008, 5, 14, Math.PI), M.blackPl, -2.9, FLOOR + 1.16, -4.38);
  int.add(cyl(0.11, 0.11, 0.12, 20), M.alu, -2.9, FLOOR + 1.04, -4.1);
  // water jug, mugs
  int.add(new RoundedBoxGeometry(0.22, 0.32, 0.22, 2, 0.04), M.bluePl, -3.0, FLOOR + 1.06, -3.1);
  for (let k = 0; k < 3; k++) int.add(cyl(0.04, 0.035, 0.09, 12), [M.orangePl, M.cream, M.bluePl][k], -2.75, FLOOR + 0.945, -3.7 + k * 0.12);
  // wall cabinet
  addSpan(int, M.cream, -3.2, -2.85, FLOOR + 1.6, FLOOR + 2.15, -4.7, -4.15);
  addSpan(int, M.cream, -3.2, -2.85, FLOOR + 1.6, FLOOR + 2.15, -3.35, -2.75);
  int.add(box(0.02, 0.12, 0.02), M.steelI, -2.84, FLOOR + 1.68, -4.2);
  int.add(box(0.02, 0.12, 0.02), M.steelI, -2.84, FLOOR + 1.68, -3.3);
  col(-3.2, -2.55, -4.72, -2.73);

  // --- table + chairs (centre-left)
  const TX = -1.35, TZ = -5.0;
  addSpan(int, M.ply, TX - 0.5, TX + 0.5, FLOOR + 0.72, FLOOR + 0.75, TZ - 0.35, TZ + 0.35);
  for (const dx of [-0.45, 0.45]) for (const dz of [-0.3, 0.3]) int.add(cyl(0.015, 0.015, 0.72, 8), M.alu, TX + dx, FLOOR + 0.36, TZ + dz);
  col(TX - 0.52, TX + 0.52, TZ - 0.37, TZ + 0.37);
  const chair = (cx, cz, ry) => {
    const g = []; const c = Math.cos(ry), s = Math.sin(ry);
    const P = (x, z) => [cx + x * c + z * s, cz - x * s + z * c];
    let [x, z] = P(0, 0); int.add(box(0.4, 0.03, 0.4), M.bluePl, x, FLOOR + 0.45, z, 0, ry, 0);
    [x, z] = P(0, -0.19); int.add(box(0.4, 0.3, 0.03), M.bluePl, x, FLOOR + 0.75, z, 0.08, ry, 0);
    for (const [a, b] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]]) { [x, z] = P(a, b); int.add(cyl(0.012, 0.012, 0.45, 6), M.alu, x, FLOOR + 0.225, z); }
    [x, z] = P(0, 0); col(x - 0.22, x + 0.22, z - 0.22, z + 0.22);
  };
  chair(TX - 0.15, TZ + 0.62, Math.PI + 0.2); chair(TX + 0.75, TZ - 0.1, -Math.PI / 2 - 0.15);
  // table items: notebook, mug, satellite phone, headlamp, map case
  int.add(box(0.21, 0.012, 0.3), M.orangePl, TX - 0.15, FLOOR + 0.756, TZ + 0.05, 0, 0.3, 0);
  int.add(cyl(0.04, 0.035, 0.09, 12), M.redFab, TX + 0.25, FLOOR + 0.795, TZ + 0.12);
  int.add(box(0.06, 0.025, 0.17), M.blackPl, TX + 0.2, FLOOR + 0.762, TZ - 0.18, 0, -0.5, 0);
  int.add(cyl(0.004, 0.004, 0.12, 4), M.blackPl, TX + 0.24, FLOOR + 0.8, TZ - 0.22);
  int.add(new THREE.TorusGeometry(0.06, 0.012, 6, 16), M.blackPl, TX - 0.35, FLOOR + 0.762, TZ - 0.15, Math.PI / 2, 0, 0);

  // --- wall decor: whiteboard + map + extinguisher + first aid + clock
  const wb = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.5), IM({ map: T.whiteboard(), roughness: 0.25 })); wb.position.set(1.2, 1.85, Z1 - 0.012); wb.rotation.y = Math.PI; iscene.add(wb);
  addSpan(int, M.alu, 0.68, 1.72, 1.58, 1.6, Z1 - 0.05, Z1);
  const mp = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.6), IM({ map: T.mapPoster(), roughness: 0.8 })); mp.position.set(-1.25, 1.75, Z1 - 0.005); mp.rotation.y = Math.PI; iscene.add(mp);
  int.add(cyl(0.07, 0.07, 0.45, 16), M.redFab, 0.68, FLOOR + 0.35, Z1 - 0.1);
  int.add(cyl(0.025, 0.03, 0.08, 10), M.blackPl, 0.68, FLOOR + 0.62, Z1 - 0.1);
  int.add(box(0.3, 0.25, 0.1), M.cream, -0.8, 1.6, Z1 - 0.05);
  int.add(box(0.12, 0.03, 0.005), M.redFab, -0.8, 1.6, Z1 - 0.103); int.add(box(0.03, 0.12, 0.005), M.redFab, -0.8, 1.6, Z1 - 0.103);
  int.add(cyl(0.12, 0.12, 0.03, 24), M.cream, 0.0, 2.75, Z0 + 0.02, Math.PI / 2, 0, 0);
  // thermometer near door showing inside temp
  int.add(box(0.04, 0.22, 0.01), M.cream, 0.58, 1.6, Z1 - 0.01);
  int.add(box(0.008, 0.12, 0.012), M.redFab, 0.58, 1.6, Z1 - 0.012);

  // --- vestibule fittings: coat hooks, parkas, boot rack, shovel
  addSpan(int, M.ply, -VX, -VX + 0.03, 1.75, 1.85, -2.1, -0.5);
  for (const [z, m] of [[-1.85, M.redFab], [-1.25, M.orangePl], [-0.72, M.redFab]]) {
    int.add(cyl(0.008, 0.008, 0.08, 6), M.steelI, -VX + 0.06, 1.8, z, 0, 0, Math.PI / 2);
    if (z > -0.8) {   // helmet + goggles on the last hook
      int.add(new THREE.SphereGeometry(0.13, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.yellowPl, -VX + 0.17, 1.66, z);
      int.add(cyl(0.15, 0.15, 0.012, 18), M.yellowPl, -VX + 0.17, 1.66, z);
      int.add(new THREE.TorusGeometry(0.1, 0.012, 6, 18), M.blackPl, -VX + 0.17, 1.7, z, Math.PI / 2, 0, 0);
      continue;
    }
    // parka: body, sleeves, hood with fur ruff, zip
    int.add(new RoundedBoxGeometry(0.2, 0.82, 0.5, 3, 0.08), m, -VX + 0.15, 1.3, z, 0, 0, 0.04);
    for (const s of [-1, 1]) int.add(new THREE.CapsuleGeometry(0.065, 0.48, 4, 10), m, -VX + 0.16, 1.3, z + s * 0.28, s * 0.08, 0, 0);
    int.add(new THREE.SphereGeometry(0.13, 14, 10), m, -VX + 0.13, 1.76, z, 0, 0, 0, 0.8, 0.85, 1);
    int.add(new THREE.TorusGeometry(0.085, 0.03, 6, 16), M.cream, -VX + 0.19, 1.75, z, 0, Math.PI / 2, 0, 1, 1.1, 0.6);
    int.add(box(0.005, 0.7, 0.012), M.darkMetal, -VX + 0.252, 1.3, z);
    int.add(box(0.012, 0.1, 0.16), M.blackPl, -VX + 0.255, 0.98, z - 0.12);
  }
  // boot bench (right wall)
  addSpan(int, M.ply, VX - 0.38, VX, FLOOR + 0.42, FLOOR + 0.46, -2.1, -1.0);
  for (const z of [-2.05, -1.05]) addSpan(int, M.alu, VX - 0.36, VX - 0.32, FLOOR, FLOOR + 0.42, z - 0.02, z + 0.02);
  for (let k = 0; k < 3; k++) {
    const z = -1.9 + k * 0.3;
    for (const dz of [-0.06, 0.06]) {
      int.add(new RoundedBoxGeometry(0.28, 0.13, 0.11, 2, 0.04), M.blackPl, VX - 0.2, FLOOR + 0.065, z + dz, 0, (rnd() - 0.5) * 0.3, 0);
      int.add(cyl(0.05, 0.055, 0.22, 10), k === 1 ? M.cream : M.blackPl, VX - 0.26, FLOOR + 0.24, z + dz);
    }
  }
  col(VX - 0.4, VX, -2.12, -0.98);
  // shovel leaning in corner near outer door
  int.add(cyl(0.015, 0.015, 1.1, 8), M.ply, VX - 0.12, FLOOR + 0.62, -0.42, 0.15, 0, -0.12);
  int.add(box(0.25, 0.32, 0.015), M.orangePl, VX - 0.08, FLOOR + 0.12, -0.35, 0.15, 0.4, -0.12);
  // vestibule bulkhead light
  int.add(cyl(0.11, 0.11, 0.04, 16), M.darkMetal, 0, VC - 0.02, -1.25);
  int.add(new THREE.SphereGeometry(0.09, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.lampI, 0, VC - 0.04, -1.25, Math.PI, 0, 0);
  // frost creeping on the inside of the outer door frame (cold bridge)
  const edgeMat = new THREE.MeshStandardMaterial({ map: T.frostEdge(), transparent: true, roughness: 0.55, depthWrite: false, envMap: warmEnv, envMapIntensity: 0.7, polygonOffset: true, polygonOffsetFactor: -2, side: THREE.DoubleSide });
  for (const sx of [-1, 1]) {
    const fp = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 1.95), edgeMat);
    fp.position.set(sx * (DOOR_W / 2 + 0.07 + 0.11), FLOOR + 0.975, VZ1 - 0.003); fp.rotation.y = Math.PI; fp.scale.x = -sx; fp.renderOrder = 2; iscene.add(fp);
  }
  // ---------- soft contact shadows (decals) under furniture and along wall bases ----------
  {
    const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
    g.filter = 'blur(14px)'; g.fillStyle = '#000'; g.fillRect(26, 26, 76, 76);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    const aoMat = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, opacity: 0.6, polygonOffset: true, polygonOffsetFactor: -4 });
    const ao = (x0, x1, z0, z1, op = 0.6, y = FLOOR + 0.004) => {
      const pad = 0.22; const w = x1 - x0 + pad * 2, d = z1 - z0 + pad * 2;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w * 1.45, d * 1.45), op === 0.6 ? aoMat : aoMat.clone());
      if (op !== 0.6) m.material.opacity = op;
      m.rotation.x = -Math.PI / 2; m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2); m.renderOrder = 1; iscene.add(m);
    };
    ao(2.45, 3.2, -6.4, -3.2, 0.55); ao(-0.42, 2.22, -6.97, -6.5, 0.6); ao(-3.2, -2.3, -7.0, -5.0, 0.6);
    ao(-3.2, -2.58, -4.7, -2.75, 0.6); ao(-1.85, -0.85, -5.35, -4.65, 0.35); ao(2.55, 3.15, -6.95, -6.5, 0.5);
    ao(VX - 0.38, VX, -2.1, -1.0, 0.5);
    // wall bases
    ao(X0, X1, Z0 - 0.05, Z0 + 0.02, 0.45); ao(X0, X1, Z1 - 0.02, Z1 + 0.05, 0.4);
    ao(X0 - 0.05, X0 + 0.02, Z0, Z1, 0.45); ao(X1 - 0.02, X1 + 0.05, Z0, Z1, 0.45);
    ao(-VX - 0.05, -VX + 0.02, VZ0, VZ1, 0.4); ao(VX - 0.02, VX + 0.05, VZ0, VZ1, 0.4);
  }

  // ---------- walls colliders ----------
  const ox = X0 - TW, ox1 = X1 + TW, oz0 = Z0 - TW, oz1 = Z1 + TW;
  col(ox, ox1, oz0, Z0);                  // back
  col(ox, X0, oz0, oz1); col(X1, ox1, oz0, oz1);
  col(ox, -DOOR_W / 2, Z1, oz1); col(DOOR_W / 2, ox1, Z1, oz1);   // front wall pieces
  col(-VX - TW, -VX, VZ0, 0); col(VX, VX + TW, VZ0, 0);           // vestibule sides
  col(-VX - TW, -DOOR_W / 2, VZ1, 0); col(DOOR_W / 2, VX + TW, VZ1, 0);
  col(-2.3, 2.3, -9.0, -7.25 + 0.0001 - 0.05 * 0); // skid tails? keep player off the back skids
  colliders.pop();

  // ---------- build meshes ----------
  const extMeshes = ext.build(scene, { cast: true, receive: true });
  const intMeshes = int.build(iscene, { cast: false, receive: false });

  // ---------- lights ----------
  // Interior lights live in the interior scene (rendered in its own pass), so they never
  // touch exterior surfaces and need no shadow maps to stay inside the walls.
  const lights = [];
  const warm = 0xffb066;
  const main = new THREE.PointLight(warm, 9, 9, 1.6);
  main.position.set(0, 2.72, -4.75); iscene.add(main); lights.push(main);
  const bench = new THREE.SpotLight(0xffc488, 6, 4, 0.85, 0.7, 1.5);
  bench.position.set(2.66, BT + 0.56, -5.5); bench.target.position.set(2.85, BT, -5.2);
  iscene.add(bench, bench.target);
  const vest = new THREE.PointLight(0xffb873, 2.6, 4.5, 1.6);
  vest.position.set(0, VC - 0.2, -1.25); iscene.add(vest);
  const heat = new THREE.PointLight(0xff7a30, 0.9, 1.8, 2);
  heat.position.set(2.85, FLOOR + 0.3, -6.25); iscene.add(heat);
  // cool twilight spilling in through the open outer door (interior pass only)
  const coolIn = new THREE.PointLight(0x7f9fe0, 1.4, 3.4, 1.4);
  coolIn.position.set(0, 1.5, 0.5); iscene.add(coolIn);
  // exterior: caged lamp above the door (shadowed), door spill and window spill (no shadows)
  const porch = new THREE.SpotLight(0xffb06a, 14, 10, 1.0, 0.65, 1.6);
  porch.position.set(0, DOOR_TOP + 0.15, 0.25); porch.target.position.set(0, 0, 3.0);
  porch.castShadow = true; porch.shadow.mapSize.set(1024, 1024); porch.shadow.bias = -0.0015; porch.shadow.normalBias = 0.02; porch.shadow.radius = 3;
  porch.shadow.camera.near = 0.1; porch.shadow.camera.far = 12;
  scene.add(porch, porch.target);
  const spill = new THREE.SpotLight(0xffb878, 7, 9, 0.26, 0.8, 1.4);
  spill.position.set(0, 1.9, -2.0); spill.target.position.set(0, 0, 4.5); scene.add(spill, spill.target);
  const winSpill = (x, y, z, tx, tz) => { const l = new THREE.SpotLight(0xffb070, 3.2, 6, 0.55, 0.9, 1.5); l.position.set(x, y, z); l.target.position.set(tx, 0, tz); scene.add(l, l.target); };
  winSpill(-2.2, 1.9, -2.6, -2.2, 0.6); winSpill(2.2, 1.9, -2.6, 2.2, 0.6);

  // glow sprites (cheap bloom substitute)
  const glowTex = T.stoveGlow();
  const glow = (x, y, z, s, op = 0.6, tgt = scene) => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, fog: false })); sp.position.set(x, y, z); sp.scale.set(s, s, s); tgt.add(sp); };
  glow(0, DOOR_TOP + 0.17, 0.14, 0.7, 0.7);
  glow(0, VC - 0.07, -1.25, 0.45, 0.4, iscene);
  glow(2.85, FLOOR + 0.27, -6.47, 0.5, 0.35, iscene);

  // ---------- floor function for walking ----------
  function floorAt(x, z) {
    let h = terrainH(x, z);
    if (x > X0 - TW && x < X1 + TW && z > Z0 - TW && z < Z1 + TW) h = Math.max(h, FLOOR);
    if (x > -VX - TW && x < VX + TW && z > Z1 && z < 0.02) h = Math.max(h, FLOOR);
    if (x > -1.3 && x < 1.3 && z >= 0 && z < 1.3) h = Math.max(h, FLOOR);
    for (const [z0, z1, y] of steps) if (x > -0.72 && x < 0.72 && z >= z0 && z < z1) h = Math.max(h, y);
    return h;
  }

  return { colliders, floorAt, lights, extMeshes, intMeshes };
}
