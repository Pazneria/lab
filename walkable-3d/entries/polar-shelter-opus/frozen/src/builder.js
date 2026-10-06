import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Collects static geometry per material and merges it into a few draw calls.
export class Builder {
  constructor() { this.groups = new Map(); this._m = new THREE.Matrix4(); this._q = new THREE.Quaternion(); this._e = new THREE.Euler(); }
  add(geo, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) {
    let g = geo.index ? geo.toNonIndexed() : geo.clone();
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    g.clearGroups();
    this._e.set(rx, ry, rz, 'YXZ');
    this._q.setFromEuler(this._e);
    this._m.compose(new THREE.Vector3(x, y, z), this._q, new THREE.Vector3(sx, sy, sz));
    g.applyMatrix4(this._m);
    if (!this.groups.has(mat)) this.groups.set(mat, []);
    this.groups.get(mat).push(g);
    return g;
  }
  addM(geo, mat, matrix) {
    let g = geo.index ? geo.toNonIndexed() : geo.clone();
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
    g.clearGroups(); g.applyMatrix4(matrix);
    if (!this.groups.has(mat)) this.groups.set(mat, []);
    this.groups.get(mat).push(g);
  }
  build(parent, opts = {}) {
    const meshes = [];
    for (const [mat, list] of this.groups) {
      const g = mergeGeometries(list, false);
      g.computeBoundingSphere();
      const m = new THREE.Mesh(g, mat);
      m.castShadow = mat.userData.noShadow ? false : (opts.cast ?? true);
      m.receiveShadow = opts.receive ?? true;
      m.matrixAutoUpdate = false;
      parent.add(m); meshes.push(m);
    }
    this.groups.clear();
    return meshes;
  }
}

// Box with UVs in metres (1 uv unit = 1 m)
export function box(w, h, d) {
  const g = new THREE.BoxGeometry(w, h, d);
  const uv = g.attributes.uv;
  for (let i = 0; i < 24; i++) {
    const f = Math.floor(i / 4);
    let su, sv;
    if (f < 2) { su = d; sv = h; } else if (f < 4) { su = w; sv = d; } else { su = w; sv = h; }
    uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv);
  }
  return g;
}

// Box spanning [x0,x1]x[y0,y1]x[z0,z1]
export function addSpan(b, mat, x0, x1, y0, y1, z0, z1) {
  b.add(box(x1 - x0, y1 - y0, z1 - z0), mat, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
}

export function cyl(rt, rb, h, seg = 16, open = false) {
  const g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, open);
  const uv = g.attributes.uv; const circ = Math.PI * (rt + rb);
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * circ, uv.getY(i) * h);
  return g;
}

// rounded box (cheap): box with bevel via scale-sphere trick not needed; use RoundedBox from addons
export { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
