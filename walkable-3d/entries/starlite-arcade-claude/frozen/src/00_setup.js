import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Core setup
// ---------------------------------------------------------------------------
const TAU = Math.PI * 2;
function rng(seed) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', stencil: false });
const RENDER_SCALES = [1.5, 1.0, 0.75, 2.0];
let renderScaleIdx = 0;
function applyPixelRatio() {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, RENDER_SCALES[renderScaleIdx]));
  renderer.setSize(window.innerWidth, window.innerHeight);
}
applyPixelRatio();
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;
document.body.prepend(renderer.domElement);
const maxAniso = renderer.capabilities.getMaxAnisotropy();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020106);
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.03, 40);

const staticRoot = new THREE.Group(); // merged by material after construction
const dynRoot = new THREE.Group();    // animated / special objects
scene.add(staticRoot, dynRoot);

const colliders = [];
function addCollider(x0, z0, x1, z1) {
  colliders.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1) });
}
// collider from a local rectangle of an (already positioned) object
const _cv = new THREE.Vector3();
function addLocalCollider(obj, x0, z0, x1, z1) {
  obj.updateMatrixWorld(true);
  let a = Infinity, b = Infinity, c = -Infinity, d = -Infinity;
  for (const [x, z] of [[x0, z0], [x1, z0], [x0, z1], [x1, z1]]) {
    _cv.set(x, 0, z).applyMatrix4(obj.matrixWorld);
    a = Math.min(a, _cv.x); b = Math.min(b, _cv.z); c = Math.max(c, _cv.x); d = Math.max(d, _cv.z);
  }
  addCollider(a, b, c, d);
}

const animators = []; // (t, dt) => void
const uTime = { value: 0 };

// Room dimensions (metres). +z points out through the entrance.
const ROOM = { x0: -3.6, x1: 3.6, z0: -11, z1: 0, h: 3.0 };
const ALC = { x0: 3.6, x1: 6.3, z0: -4.9, z1: -1.5, h: 2.55 };

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------
function mesh(geo, mat, parent = staticRoot, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z); m.rotation.set(rx, ry, rz);
  parent.add(m);
  return m;
}
function box(w, h, d, mat, parent, x, y, z, rx = 0, ry = 0, rz = 0) {
  return mesh(new THREE.BoxGeometry(w, h, d), mat, parent, x, y, z, rx, ry, rz);
}
function cyl(rt, rb, h, seg, mat, parent, x, y, z, rx = 0, ry = 0, rz = 0, open = false) {
  return mesh(new THREE.CylinderGeometry(rt, rb, h, seg, 1, open), mat, parent, x, y, z, rx, ry, rz);
}
function scaleUV(geo, su, sv, ou = 0, ov = 0) {
  const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * su + ou, uv.getY(i) * sv + ov);
  return geo;
}
function roundRectShape(w, h, r, cx = 0, cy = 0, path = new THREE.Shape()) {
  const x = cx - w / 2, y = cy - h / 2;
  path.moveTo(x + r, y);
  path.lineTo(x + w - r, y); path.quadraticCurveTo(x + w, y, x + w, y + r);
  path.lineTo(x + w, y + h - r); path.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  path.lineTo(x + r, y + h); path.quadraticCurveTo(x, y + h, x, y + h - r);
  path.lineTo(x, y + r); path.quadraticCurveTo(x, y, x + r, y);
  return path;
}

// Profile helpers for cabinets: points are [u, v] = [distance from back, height].
// Cabinet-local space: x across, y up, z forward (front = +z), origin at floor centre.
function slab(parent, D, p0, p1, width, thick, mat, x = 0) {
  const dz = p1[0] - p0[0], dy = p1[1] - p0[1], len = Math.hypot(dz, dy);
  const m = new THREE.Mesh(new THREE.BoxGeometry(width, len, thick), mat);
  m.rotation.x = Math.atan2(dz, dy);
  const mz = (p0[0] + p1[0]) / 2 - D / 2, my = (p0[1] + p1[1]) / 2;
  m.position.set(x, my + dz / len * thick / 2, mz - dy / len * thick / 2);
  parent.add(m);
  return m;
}
// a group whose local XY plane lies on the profile segment p0->p1 (y along segment, z outward)
function frameAt(parent, D, p0, p1, out = 0) {
  const dz = p1[0] - p0[0], dy = p1[1] - p0[1], len = Math.hypot(dz, dy);
  const g = new THREE.Group();
  g.rotation.x = Math.atan2(dz, dy);
  g.position.set(0, (p0[1] + p1[1]) / 2 - dz / len * out, (p0[0] + p1[0]) / 2 - D / 2 + dy / len * out);
  g.userData.len = len;
  parent.add(g);
  return g;
}

// ---------------------------------------------------------------------------
// Static merge: bake world transforms and merge every static mesh by material.
// ---------------------------------------------------------------------------
function mergeStatic(root) {
  root.updateMatrixWorld(true);
  const buckets = new Map();
  const victims = [];
  const v = new THREE.Vector3(), n = new THREE.Vector3(), nm = new THREE.Matrix3();
  root.traverse(o => {
    if (!o.isMesh || o.userData.keep || o.isInstancedMesh) return;
    let p = o.parent, skip = false;
    while (p) { if (p.userData.keep) { skip = true; break; } p = p.parent; }
    if (skip) return;
    const g = o.geometry, mats = Array.isArray(o.material) ? o.material : [o.material];
    const pos = g.attributes.position, nor = g.attributes.normal, uv = g.attributes.uv, idx = g.index;
    const total = idx ? idx.count : pos.count;
    const groups = (Array.isArray(o.material) && g.groups.length) ? g.groups : [{ start: 0, count: total, materialIndex: 0 }];
    const m = o.matrixWorld; nm.getNormalMatrix(m);
    const flip = m.determinant() < 0;
    for (const gr of groups) {
      const mat = mats[gr.materialIndex]; if (!mat) continue;
      let b = buckets.get(mat);
      if (!b) { b = { p: [], n: [], u: [], ro: o.renderOrder }; buckets.set(mat, b); }
      const end = Math.min(gr.start + gr.count, total);
      for (let i = gr.start; i + 2 < end + 0; i += 3) {
        const tri = flip ? [i, i + 2, i + 1] : [i, i + 1, i + 2];
        for (const k of tri) {
          const vi = idx ? idx.getX(k) : k;
          v.fromBufferAttribute(pos, vi).applyMatrix4(m); b.p.push(v.x, v.y, v.z);
          if (nor) { n.fromBufferAttribute(nor, vi).applyMatrix3(nm).normalize(); b.n.push(n.x, n.y, n.z); } else b.n.push(0, 1, 0);
          if (uv) b.u.push(uv.getX(vi), uv.getY(vi)); else b.u.push(0, 0);
        }
      }
    }
    victims.push(o);
  });
  for (const o of victims) { o.parent.remove(o); o.geometry.dispose(); }
  let calls = 0;
  for (const [mat, b] of buckets) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(b.p, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(b.n, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(b.u, 2));
    geo.computeBoundingSphere();
    const mm = new THREE.Mesh(geo, mat);
    mm.renderOrder = b.ro || 0;
    mm.matrixAutoUpdate = false;
    root.add(mm); calls++;
  }
  return calls;
}
