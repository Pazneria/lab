// Static-geometry builder: everything added here is transformed, given world-space UVs
// (or keeps its own), and merged into one mesh per material to keep draw calls low.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _s = new THREE.Vector3(), _p = new THREE.Vector3();
const _nm = new THREE.Matrix3();

export class Builder {
  constructor() {
    this.groups = new Map(); // material -> { geos: [], cast, receive }
    this.stack = [new THREE.Matrix4()];
    this.colliders = [];
  }
  get top() { return this.stack[this.stack.length - 1]; }
  // Push a local frame: position [x,y,z], rotation [rx,ry,rz] (radians), uniform/array scale.
  push(pos = [0, 0, 0], rot = [0, 0, 0], scl = 1) {
    _e.set(rot[0], rot[1], rot[2]); _q.setFromEuler(_e);
    if (typeof scl === 'number') _s.set(scl, scl, scl); else _s.set(scl[0], scl[1], scl[2]);
    _m.compose(_p.set(pos[0], pos[1], pos[2]), _q, _s);
    this.stack.push(this.top.clone().multiply(_m));
  }
  pop() { this.stack.pop(); }
  // Push a frame at pos whose local -Z axis points at target (both in the current frame).
  pushLook(pos, target, up = [0, 1, 0]) {
    const e = new THREE.Vector3(...pos), t = new THREE.Vector3(...target), u = new THREE.Vector3(...up);
    const dir = e.clone().sub(t).normalize();
    if (Math.abs(dir.dot(u)) > 0.999) u.set(0, 0, 1);
    const m = new THREE.Matrix4().lookAt(e, t, u); m.setPosition(e);
    this.stack.push(this.top.clone().multiply(m));
  }

  // Add a geometry with a local transform under the current frame.
  add(geo, mat, pos = [0, 0, 0], rot = [0, 0, 0], opts = {}) {
    _e.set(rot[0], rot[1], rot[2]); _q.setFromEuler(_e);
    const sc = opts.scale ? (typeof opts.scale === 'number' ? _s.set(opts.scale, opts.scale, opts.scale) : _s.set(...opts.scale)) : _s.set(1, 1, 1);
    _m.compose(_p.set(pos[0], pos[1], pos[2]), _q, sc);
    const world = this.top.clone().multiply(_m);
    let g = geo.index ? geo.toNonIndexed() : geo.clone();
    for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal' && k !== 'uv') g.deleteAttribute(k);
    g.applyMatrix4(world);
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    const mode = opts.uv || mat.userData.uv || 'world';
    if (mode === 'world') worldUV(g);
    const key = (this.region || '') + '|' + mat.uuid;
    let entry = this.groups.get(key);
    if (!entry) { entry = { mat, geos: [], cast: mat.userData.cast !== false, receive: mat.userData.receive !== false }; this.groups.set(key, entry); }
    entry.geos.push(g);
    return g;
  }
  box(w, h, d, mat, pos, rot, opts) { return this.add(new THREE.BoxGeometry(w, h, d), mat, pos, rot, opts); }
  cyl(rt, rb, h, mat, pos, rot, seg = 20, opts) { return this.add(new THREE.CylinderGeometry(rt, rb, h, seg), mat, pos, rot, opts); }

  // Collision helpers in world XZ (only valid when called with an identity/translation frame).
  collideBox(minX, maxX, minZ, maxZ) { this.colliders.push({ type: 'box', minX, maxX, minZ, maxZ }); }
  collideCircle(x, z, r) { this.colliders.push({ type: 'circle', x, z, r }); }
  // World-space AABB collider for a local box under the current frame.
  collideLocalBox(w, d, pos) {
    const corners = [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]];
    let minX = 1e9, maxX = -1e9, minZ = 1e9, maxZ = -1e9;
    for (const [cx, cz] of corners) {
      const v = new THREE.Vector3(pos[0] + cx, 0, pos[2] + cz).applyMatrix4(this.top);
      minX = Math.min(minX, v.x); maxX = Math.max(maxX, v.x); minZ = Math.min(minZ, v.z); maxZ = Math.max(maxZ, v.z);
    }
    this.collideBox(minX, maxX, minZ, maxZ);
  }

  build(scene) {
    let tris = 0;
    for (const entry of this.groups.values()) {
      const mat = entry.mat;
      const merged = mergeGeometries(entry.geos, false);
      merged.computeBoundingSphere();
      const mesh = new THREE.Mesh(merged, mat);
      mesh.castShadow = entry.cast; mesh.receiveShadow = entry.receive;
      mesh.matrixAutoUpdate = false; mesh.updateMatrix();
      if (mat.transparent) mesh.renderOrder = 2;
      scene.add(mesh);
      tris += merged.attributes.position.count / 3;
      for (const g of entry.geos) g.dispose();
    }
    this.groups.clear();
    return tris;
  }
}

// Box-projected UVs per triangle (metres), so textures keep a constant world scale.
function worldUV(g) {
  const p = g.attributes.position.array, uv = g.attributes.uv.array;
  const n = g.attributes.position.count;
  for (let t = 0; t < n; t += 3) {
    const a = t * 3, b = a + 3, c = a + 6;
    const ux = p[b] - p[a], uy = p[b + 1] - p[a + 1], uz = p[b + 2] - p[a + 2];
    const vx = p[c] - p[a], vy = p[c + 1] - p[a + 1], vz = p[c + 2] - p[a + 2];
    const nx = Math.abs(uy * vz - uz * vy), ny = Math.abs(uz * vx - ux * vz), nz = Math.abs(ux * vy - uy * vx);
    for (let k = 0; k < 3; k++) {
      const i = (t + k) * 3, o = (t + k) * 2;
      if (nx >= ny && nx >= nz) { uv[o] = p[i + 2]; uv[o + 1] = p[i + 1]; }
      else if (ny >= nz) { uv[o] = p[i]; uv[o + 1] = p[i + 2]; }
      else { uv[o] = p[i]; uv[o + 1] = p[i + 1]; }
    }
  }
}

// Label atlas: every sign / plate in the scene is drawn into one canvas so all labels
// share one material and merge into a single draw call.
export class Atlas {
  constructor(size = 2048) {
    this.size = size;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvas.height = size;
    this.ctx = this.canvas.getContext('2d');
    this.x = 0; this.y = 0; this.rowH = 0;
  }
  alloc(w, h) {
    w = Math.ceil(w) + 4; h = Math.ceil(h) + 4;
    if (this.x + w > this.size) { this.x = 0; this.y += this.rowH; this.rowH = 0; }
    if (this.y + h > this.size) throw new Error('atlas full');
    const r = { x: this.x + 2, y: this.y + 2, w: w - 4, h: h - 4 };
    this.x += w; this.rowH = Math.max(this.rowH, h);
    return r;
  }
  // Returns a PlaneGeometry (w x h metres) with UVs mapped into the drawn region.
  plane(wm, hm, pxPerM, draw) {
    pxPerM = Math.min(pxPerM, (this.size - 8) / wm, (this.size - 8) / hm);
    const r = this.alloc(wm * pxPerM, hm * pxPerM);
    const ctx = this.ctx;
    ctx.save(); ctx.translate(r.x, r.y); ctx.beginPath(); ctx.rect(0, 0, r.w, r.h); ctx.clip(); ctx.clearRect(0, 0, r.w, r.h);
    draw(ctx, r.w, r.h);
    ctx.restore();
    const g = new THREE.PlaneGeometry(wm, hm);
    const uv = g.attributes.uv, S = this.size;
    for (let i = 0; i < uv.count; i++) {
      const u = uv.getX(i), v = uv.getY(i);
      uv.setXY(i, (r.x + u * r.w) / S, 1 - (r.y + (1 - v) * r.h) / S);
    }
    return g;
  }
  // Open cylinder band (around Y) with the drawn region wrapped over thetaLength.
  cylBand(radius, hm, thetaStart, thetaLength, pxPerM, draw, seg = 32) {
    pxPerM = Math.min(pxPerM, (this.size - 8) / (radius * thetaLength));
    const r = this.alloc(radius * thetaLength * pxPerM, hm * pxPerM);
    const ctx = this.ctx;
    ctx.save(); ctx.translate(r.x, r.y); ctx.beginPath(); ctx.rect(0, 0, r.w, r.h); ctx.clip(); ctx.clearRect(0, 0, r.w, r.h);
    draw(ctx, r.w, r.h);
    ctx.restore();
    const g = new THREE.CylinderGeometry(radius, radius, hm, seg, 1, true, thetaStart, thetaLength);
    const uv = g.attributes.uv, S = this.size;
    for (let i = 0; i < uv.count; i++) {
      const u = uv.getX(i), v = uv.getY(i);
      uv.setXY(i, (r.x + u * r.w) / S, 1 - (r.y + (1 - v) * r.h) / S);
    }
    return g;
  }
  // Common sign: background, optional border, centred text lines [{t, size, color, weight}]
  sign(wm, hm, { bg = '#f2f2ee', border = null, lines = [], align = 'center', pad = 0.08, px = 400 } = {}) {
    return this.plane(wm, hm, px, (ctx, w, h) => {
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
      if (border) { ctx.strokeStyle = border; ctx.lineWidth = Math.max(2, h * 0.04); ctx.strokeRect(ctx.lineWidth / 2, ctx.lineWidth / 2, w - ctx.lineWidth, h - ctx.lineWidth); }
      const total = lines.reduce((s, l) => s + l.size * h * 1.25, 0);
      let y = (h - total) / 2;
      for (const l of lines) {
        const fs = l.size * h;
        ctx.font = `${l.weight || 600} ${fs}px ${l.font || '"Segoe UI", Arial, sans-serif'}`;
        ctx.fillStyle = l.color || '#1b1f24';
        ctx.textBaseline = 'middle';
        ctx.textAlign = l.align || align;
        const x = (l.align || align) === 'left' ? w * pad : (l.align || align) === 'right' ? w * (1 - pad) : w / 2;
        ctx.fillText(l.t, x, y + fs * 0.62, w * (1 - pad * 2));
        y += fs * 1.25;
      }
    });
  }
  texture(anisotropy) {
    const t = new THREE.CanvasTexture(this.canvas);
    t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = anisotropy;
    return t;
  }
}

// Smooth cable along control points (TubeGeometry).
export function cableGeo(points, radius = 0.012, segs = 40, radial = 6) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, 'centripetal');
  return new THREE.TubeGeometry(curve, segs, radius, radial, false);
}

// Flat annulus slab (ring with rectangular cross-section) lying in XZ, from y=0 to y=h.
export function ringSlab(rIn, rOut, h, seg = 64, arc = Math.PI * 2) {
  const s = new THREE.Shape();
  if (arc >= Math.PI * 2 - 1e-4) {
    s.absarc(0, 0, rOut, 0, Math.PI * 2, false);
    const hole = new THREE.Path(); hole.absarc(0, 0, rIn, 0, Math.PI * 2, true); s.holes.push(hole);
  } else {
    s.absarc(0, 0, rOut, 0, arc, false); s.absarc(0, 0, rIn, arc, 0, true);
  }
  const g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: false, curveSegments: seg });
  g.rotateX(-Math.PI / 2);
  return g;
}
