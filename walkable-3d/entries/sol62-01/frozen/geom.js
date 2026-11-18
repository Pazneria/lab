import * as T from './vendor/three.module.min.js';

const white = [1, 1, 1];
const colors = new Map();
const unitBox = new T.BoxGeometry(1, 1, 1);
const boxPositions = unitBox.getAttribute('position');
const boxNormals = unitBox.getAttribute('normal');
const sourceBoxIndices = unitBox.index.array;
const axisY = new T.Vector3(0, 1, 0);
const euler = new T.Euler(0, 0, 0, 'YXZ');
const rotation = new T.Quaternion();
const vector = new T.Vector3();

function tint(color) {
  if (color === undefined) return white;
  if (Array.isArray(color)) return color;
  if (!colors.has(color)) {
    const rgb = new T.Color(color);
    colors.set(color, [rgb.r, rgb.g, rgb.b]);
  }
  return colors.get(color);
}

function normal(a, b, c) {
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
  const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  const x = uy * vz - uz * vy, y = uz * vx - ux * vz, z = ux * vy - uy * vx;
  const length = Math.hypot(x, y, z) || 1;
  return [x / length, y / length, z / length];
}

class MeshData {
  constructor(material, casts, receives) {
    this.material = material;
    this.casts = casts;
    this.receives = receives;
    this.pos = [];
    this.nrm = [];
    this.uv = [];
    this.rgb = [];
    this.idx = [];
  }

  vertex(pos, direction, uv, rgb) {
    this.pos.push(...pos);
    this.nrm.push(...direction);
    this.uv.push(...uv);
    this.rgb.push(...rgb);
  }

  mesh() {
    const geometry = new T.BufferGeometry();
    geometry.setAttribute('position', new T.Float32BufferAttribute(this.pos, 3));
    geometry.setAttribute('normal', new T.Float32BufferAttribute(this.nrm, 3));
    geometry.setAttribute('uv', new T.Float32BufferAttribute(this.uv, 2));
    geometry.setAttribute('color', new T.Float32BufferAttribute(this.rgb, 3));
    geometry.setIndex(this.idx);
    geometry.computeBoundingSphere();
    const mesh = new T.Mesh(geometry, this.material);
    mesh.matrixAutoUpdate = false;
    mesh.matrixWorldAutoUpdate = false;
    mesh.castShadow = this.casts;
    mesh.receiveShadow = this.receives;
    return mesh;
  }
}

export class Batch {
  constructor(size = 17, shadow = true) {
    this.size = size;
    this.shadow = shadow;
    this.data = new Map();
  }

  region(material, x, z, opts = {}) {
    const casts = opts.shadow ?? this.shadow;
    const receives = opts.receive ?? true;
    const key = [material.id, Math.floor(x / this.size), Math.floor(z / this.size), +casts, +receives].join(':');
    if (!this.data.has(key)) this.data.set(key, new MeshData(material, casts, receives));
    return this.data.get(key);
  }

  box(materials, x, y, z, width, height, depth, opts = {}) {
    const rgb = tint(opts.tint);
    const rot = opts.quaternion || rotation.setFromEuler(euler.set(opts.rx ?? 0, opts.ry ?? 0, opts.rz ?? 0));
    const globalUV = opts.globalUV ?? !(opts.quaternion || opts.rx || opts.ry || opts.rz);
    const offset = opts.uvOffset ?? [0, 0];
    for (let face = 0; face < 6; face++) {
      const material = Array.isArray(materials) ? materials[face] : materials;
      if (!material) continue;
      const out = this.region(material, x, z, opts);
      const size = opts.uvScale ?? material.userData.scale ?? [1, 1];
      const start = out.pos.length / 3;
      const base = face * 4;
      vector.fromBufferAttribute(boxNormals, base).applyQuaternion(rot);
      const n = [vector.x, vector.y, vector.z];
      for (let j = 0; j < 4; j++) {
        const i = base + j;
        const a = boxPositions.getX(i) * width;
        const b = boxPositions.getY(i) * height;
        const c = boxPositions.getZ(i) * depth;
        const u = (face < 2 ? c + (globalUV ? z : 0) : a + (globalUV ? x : 0)) / size[0] + offset[0];
        const v = (face === 2 || face === 3 ? -c - (globalUV ? z : 0) : b + (globalUV ? y : 0)) / size[1] + offset[1];
        vector.set(a, b, c).applyQuaternion(rot);
        out.vertex([vector.x + x, vector.y + y, vector.z + z], n, [u, v], rgb);
      }
      for (let j = face * 6; j < face * 6 + 6; j++) out.idx.push(start + sourceBoxIndices[j] - base);
    }
  }

  beam(material, a, b, width, depth = width, opts = {}) {
    const up = new T.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    const length = up.length();
    up.divideScalar(length || 1);
    const quaternion = new T.Quaternion().setFromUnitVectors(axisY, up);
    this.box(material, (a[0] + b[0]) * .5, (a[1] + b[1]) * .5, (a[2] + b[2]) * .5,
      width, length, depth, { ...opts, quaternion });
  }

  polygon(material, points, opts = {}) {
    const out = this.region(material, points[0][0], points[0][2], opts);
    const n = opts.normal ?? normal(points[0], points[1], points[2]);
    const start = out.pos.length / 3;
    const rgb = tint(opts.tint);
    const uv = opts.uv ?? [[0, 0], [1, 0], [1, 1], [0, 1]];
    for (let i = 0; i < points.length; i++) out.vertex(points[i], n, uv[i] ?? uv[0], rgb);
    for (let i = 1; i < points.length - 1; i++) out.idx.push(start, start + i, start + i + 1);
  }

  plane(material, center, u, v, width, height, opts = {}) {
    const a = width * 0.5;
    const b = height * 0.5;
    const points = [[-a, -b], [a, -b], [a, b], [-a, b]].map(([p, q]) =>
      [center[0] + u[0] * p + v[0] * q, center[1] + u[1] * p + v[1] * q, center[2] + u[2] * p + v[2] * q]);
    this.polygon(material, points, opts);
  }

  tube(material, points, radii, opts = {}) {
    const out = this.region(material, points[0][0], points[0][2], opts);
    const segments = opts.segments ?? 7;
    const start = out.pos.length / 3;
    const maxRad = Math.max(...radii);
    const uvScale = material.userData.scale ?? [1, 1];
    const rgb = tint(opts.tint);
    const darken = opts.darken ?? 0;
    let distance = opts.vOffset ?? 0;
    let widthScale = 2 * Math.PI * maxRad / uvScale[0];
    widthScale = Math.max(opts.minU ?? .41, widthScale);
    for (let k = 0; k < points.length; k++) {
      const p = points[k];
      const a = points[Math.max(0, k - 1)];
      const b = points[Math.min(points.length - 1, k + 1)];
      const direction = new T.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]).normalize();
      const reference = Math.abs(direction.x) < .89 ? new T.Vector3(1, 0, 0) : new T.Vector3(0, 0, 1);
      const side = new T.Vector3().crossVectors(direction, reference).normalize();
      const forward = new T.Vector3().crossVectors(side, direction).normalize();
      if (k > 0) distance += Math.hypot(p[0] - a[0], p[1] - a[1], p[2] - a[2]);
      for (let j = 0; j <= segments; j++) {
        const t = j / segments;
        const theta = 2 * Math.PI * t;
        const c = Math.cos(theta), s = Math.sin(theta);
        const ux = forward.x * c + side.x * s, uy = forward.y * c + side.y * s, uz = forward.z * c + side.z * s;
        const r = radii[k] * (1 + (opts.irregular ?? 0) * (Math.sin(theta * 3) + .47 * Math.cos(theta * 5 + k * .65)));
        const base = k === 0 ? 1 - darken : 1 - darken * Math.exp(-k * 1.4);
        const shaded = base * (1 - (opts.sideShade ?? 0) * (.5 + .5 * Math.cos(theta * 3)));
        out.vertex([p[0] + ux * r, p[1] + uy * r, p[2] + uz * r], [ux, uy, uz],
          [t * widthScale + (opts.uOffset ?? 0), distance / uvScale[1]], rgb.map(c => c * shaded));
      }
    }
    for (let k = 0; k < points.length - 1; k++) {
      for (let j = 0; j < segments; j++) {
        const a = start + k * (segments + 1) + j;
        const b = a + segments + 1;
        out.idx.push(a, a + 1, b, b, a + 1, b + 1);
      }
    }
  }

  finish(scene) {
    let vertices = 0;
    let triangles = 0;
    for (const group of this.data.values()) {
      vertices += group.pos.length / 3;
      triangles += group.idx.length / 3;
      scene.add(group.mesh());
    }
    const meshes = this.data.size;
    this.data.clear();
    return { vertices, triangles, meshes };
  }
}

export function atlasUV(index, pad = .011) {
  const left = index % 2 * .5 + pad;
  const top = 1 - Math.floor(index / 2) * .5 - pad;
  const right = left + .5 - pad * 2;
  const bottom = top - .5 + pad * 2;
  return [[left, bottom], [right, bottom], [right, top], [left, top]];
}
