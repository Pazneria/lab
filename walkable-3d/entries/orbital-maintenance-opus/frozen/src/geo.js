// Geometry batching helpers: every static part is pushed into a per-material bucket and merged,
// so the whole bay renders in a few dozen draw calls. Collision volumes are registered alongside.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

let buckets = new Map();
const stack = [];
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _s = new THREE.Vector3(1, 1, 1);

export const solids = [];   // AABBs {minX,maxX,minY,maxY,minZ,maxZ}
export const circles = [];  // vertical cylinders {x,z,r,minY,maxY}
export const surfaces = []; // walkable {minX,maxX,minZ,maxZ,h(x,z),thick}

export function solid(minX, maxX, minY, maxY, minZ, maxZ) { solids.push({ minX, maxX, minY, maxY, minZ, maxZ }); }
export function solidC(x, y, z, sx, sy, sz) { solid(x - sx / 2, x + sx / 2, y - sy / 2, y + sy / 2, z - sz / 2, z + sz / 2); }
export function surface(minX, maxX, minZ, maxZ, h, thick = 0.3) { surfaces.push({ minX, maxX, minZ, maxZ, h: typeof h === 'number' ? () => h : h, thick }); }

export function beginBuckets() { const prev = buckets; buckets = new Map(); return prev; }
export function endBuckets(prev, parent, opts = {}) {
  const made = flush(parent, opts);
  buckets = prev;
  return made;
}
export function pushMatrix(m) { stack.push(m.clone()); }
export function popMatrix() { stack.pop(); }

function worldUV(g, s) {
  const p = g.attributes.position, n = g.attributes.normal, uv = new Float32Array(p.count * 2);
  for (let i = 0; i < p.count; i++) {
    const nx = Math.abs(n.getX(i)), ny = Math.abs(n.getY(i)), nz = Math.abs(n.getZ(i));
    let u, v;
    if (ny >= nx && ny >= nz) { u = p.getX(i); v = p.getZ(i); }
    else if (nx >= nz) { u = p.getZ(i); v = p.getY(i); }
    else { u = p.getX(i); v = p.getY(i); }
    uv[i * 2] = u * s; uv[i * 2 + 1] = v * s;
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
}

export function push(mat, geo, uvs = null) {
  let g = geo.index ? geo.toNonIndexed() : geo;
  for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal' && k !== 'uv') g.deleteAttribute(k);
  for (let i = stack.length - 1; i >= 0; i--) g.applyMatrix4(stack[i]);
  if (uvs) worldUV(g, uvs);
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
  let list = buckets.get(mat);
  if (!list) { list = []; buckets.set(mat, list); }
  list.push(g);
  return g;
}

export function xf(g, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  _e.set(rx, ry, rz, 'YXZ'); _q.setFromEuler(_e);
  _m.compose(_p.set(x, y, z), _q, _s);
  g.applyMatrix4(_m);
  return g;
}

const uvsOf = (mat) => mat.userData.uvs ?? null;

export function box(mat, sx, sy, sz, x, y, z, rx = 0, ry = 0, rz = 0) {
  return push(mat, xf(new THREE.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz), uvsOf(mat));
}
// box spanning min/max corners (axis-aligned)
export function boxMM(mat, x0, x1, y0, y1, z0, z1) { return box(mat, x1 - x0, y1 - y0, z1 - z0, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); }

function scaleUV(g, su, sv) {
  const uv = g.attributes.uv; if (!uv) return;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv);
}
// cylinder along Y by default; axis 'x' or 'z' rotates it
export function cyl(mat, r0, r1, h, x, y, z, axis = 'y', seg = 20, o = {}) {
  const g = new THREE.CylinderGeometry(r0, r1, h, seg, 1, !!o.open, o.ts ?? 0, o.tl ?? Math.PI * 2);
  const s = mat.userData.uvs;
  if (s) scaleUV(g, Math.max(1, Math.round(2 * Math.PI * r0 * s)), h * s);
  if (axis === 'x') g.rotateZ(-Math.PI / 2); else if (axis === 'z') g.rotateX(Math.PI / 2);
  if (o.rx || o.ry || o.rz) xf(g, 0, 0, 0, o.rx || 0, o.ry || 0, o.rz || 0);
  g.translate(x, y, z);
  return push(mat, g);
}
export function torus(mat, R, r, x, y, z, axis = 'y', arc = Math.PI * 2, seg = 32, o = {}) {
  const g = new THREE.TorusGeometry(R, r, 8, seg, arc);
  if (o.spin) g.rotateZ(o.spin);
  if (axis === 'y') g.rotateX(Math.PI / 2); else if (axis === 'x') g.rotateY(Math.PI / 2);
  g.translate(x, y, z);
  return push(mat, g);
}
export function tube(mat, pts, r, seg = 48, radial = 10) {
  const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
  const g = new THREE.TubeGeometry(curve, seg, r, radial, false);
  scaleUV(g, 6, 1);
  return push(mat, g);
}
// straight beam/rod between two points (box cross-section w x t), useful for braces and rails
export function rod(mat, a, b, w, t = w, round = false, seg = 10) {
  const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), d = B.clone().sub(A), L = d.length();
  const g = round ? new THREE.CylinderGeometry(w, w, L, seg, 1) : new THREE.BoxGeometry(w, L, t);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  g.applyQuaternion(q); g.translate((A.x + B.x) / 2, (A.y + B.y) / 2, (A.z + B.z) / 2);
  return push(mat, g, round ? null : uvsOf(mat));
}
export function bolts(mat, n, R, x, y, z, axis, r = 0.025, h = 0.03, start = 0) {
  for (let i = 0; i < n; i++) {
    const a = start + (i / n) * Math.PI * 2, c = Math.cos(a) * R, s = Math.sin(a) * R;
    if (axis === 'x') cyl(mat, r, r, h, x, y + c, z + s, 'x', 6);
    else if (axis === 'z') cyl(mat, r, r, h, x + c, y + s, z, 'z', 6);
    else cyl(mat, r, r, h, x + c, y, z + s, 'y', 6);
  }
}

function flush(parent, opts = {}) {
  const made = [];
  for (const [mat, list] of buckets) {
    if (!list.length) continue;
    const g = mergeGeometries(list, false);
    g.computeBoundingSphere();
    const mesh = new THREE.Mesh(g, mat);
    const noShadow = mat.userData.noShadow;
    mesh.castShadow = !noShadow && opts.cast !== false;
    mesh.receiveShadow = !mat.userData.noReceive;
    if (mat.userData.order) mesh.renderOrder = mat.userData.order;
    mesh.matrixAutoUpdate = !!opts.dynamic;
    mesh.updateMatrix();
    parent.add(mesh);
    made.push(mesh);
    list.forEach((x) => x.dispose());
  }
  buckets.clear();
  return made;
}
export function flushAll(parent, opts = {}) { return flush(parent, opts); }
