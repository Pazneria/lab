import * as THREE from './vendor/three.module.min.js';

export const tau = Math.PI * 2;
export const polar = (angle, radius, y) => [Math.sin(angle) * radius, y, Math.cos(angle) * radius];
export const mix = (a, b, t) => a + (b - a) * t;

export function random(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const white = new THREE.Color(0xffffff);

export class Draft {
  constructor() {
    this.positions = [];
    this.uvs = [];
    this.colors = [];
    this.indices = [];
    this.normals = [];
    this.explicitNormals = true;
  }

  face(points, { uv, color, normal } = {}) {
    const base = this.positions.length / 3;
    const uvs = uv ?? [[0, 0], [1, 0], [1, 1], [0, 1]];
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      this.positions.push(...point);
      this.uvs.push(...uvs[i]);
      const tint = Array.isArray(color) ? color[i] : color;
      this.colors.push(...(tint ?? white).toArray());
      if (normal) this.normals.push(...normal[i]);
      else this.explicitNormals = false;
    }
    this.indices.push(base, base + 1, base + 2);
    if (points.length === 4) this.indices.push(base, base + 2, base + 3);
  }

  quad(a, b, c, d, options) { this.face([a, b, c, d], options); }
  tri(a, b, c, options) { this.face([a, b, c], options); }

  finish() {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(this.uvs, 2));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(this.colors, 3));
    geometry.setIndex(this.indices);
    if (this.explicitNormals) {
      geometry.setAttribute('normal', new THREE.Float32BufferAttribute(this.normals, 3));
    } else geometry.computeVertexNormals();
    return geometry;
  }
}

const cube = new THREE.BoxGeometry(1, 1, 1);
const plane = new THREE.PlaneGeometry(1, 1);
const primitives = new Map();

function primitive(key, create) {
  if (!primitives.has(key)) primitives.set(key, create());
  return primitives.get(key);
}

const position = new THREE.Vector3();
const normal = new THREE.Vector3();
const quaternion = new THREE.Quaternion();
const rotation = new THREE.Euler();
const scaling = new THREE.Vector3();
const translated = new THREE.Vector3();
const matrix = new THREE.Matrix4();
const normalMatrix = new THREE.Matrix3();
const localY = new THREE.Vector3(0, 1, 0);

class Range {
  constructor(name, material, cast, receive) {
    this.name = name;
    this.material = material;
    this.cast = cast;
    this.receive = receive;
    this.parts = [];
    this.vertices = 0;
    this.indices = 0;
  }

  add(geometry, options) {
    const count = geometry.attributes.position.count;
    const size = geometry.index?.count ?? count;
    this.parts.push({ geometry, options, base: this.vertices, offset: this.indices });
    this.vertices += count;
    this.indices += size;
  }

  bake() {
    const positions = new Float32Array(this.vertices * 3);
    const normals = new Float32Array(this.vertices * 3);
    const colors = new Float32Array(this.vertices * 3);
    const uvs = new Float32Array(this.vertices * 2);
    const indices = this.vertices > 65535 ? new Uint32Array(this.indices) : new Uint16Array(this.indices);
    for (const { geometry, options, base, offset } of this.parts) {
      const source = geometry.attributes;
      translated.fromArray(options.at ?? [0, 0, 0]);
      scaling.fromArray(options.scale ?? [1, 1, 1]);
      if (options.turn) quaternion.copy(options.turn);
      else quaternion.setFromEuler(rotation.fromArray(options.rotation ?? [0, 0, 0]));
      matrix.compose(translated, quaternion, scaling);
      normalMatrix.getNormalMatrix(matrix);
      const tint = options.tint?.isColor ? options.tint : new THREE.Color(options.tint ?? 0xffffff);
      const uvScale = options.uvScale ?? [1, 1];
      const uvOffset = options.uvOffset ?? [0, 0];

      for (let i = 0; i < source.position.count; i += 1) {
        const point = i + base;
        const xyz = point * 3;
        const st = point * 2;
        position.fromBufferAttribute(source.position, i).applyMatrix4(matrix).toArray(positions, xyz);
        normal.fromBufferAttribute(source.normal, i);
        let u = source.uv?.getX(i) ?? 0;
        let v = source.uv?.getY(i) ?? 0;
        if (options.boxUV) {
          if (Math.abs(normal.x) > 0.9) { u *= scaling.z; v *= scaling.y; }
          else if (Math.abs(normal.y) > 0.9) { u *= scaling.x; v *= scaling.z; }
          else { u *= scaling.x; v *= scaling.y; }
        }
        normal.applyNormalMatrix(normalMatrix).toArray(normals, xyz);
        uvs[st] = u * uvScale[0] + uvOffset[0];
        uvs[st + 1] = v * uvScale[1] + uvOffset[1];
        colors[xyz] = tint.r * (source.color?.getX(i) ?? 1);
        colors[xyz + 1] = tint.g * (source.color?.getY(i) ?? 1);
        colors[xyz + 2] = tint.b * (source.color?.getZ(i) ?? 1);
      }
      if (geometry.index) {
        for (let i = 0; i < geometry.index.count; i += 1) indices[offset + i] = geometry.index.getX(i) + base;
      } else {
        for (let i = 0; i < source.position.count; i += 1) indices[offset + i] = i + base;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeBoundingSphere();
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.name = this.name + ' / ' + this.material.name;
    mesh.castShadow = this.cast;
    mesh.receiveShadow = this.receive;
    this.parts.length = 0;
    return mesh;
  }
}

export class Build {
  constructor() {
    this.name = 'World';
    this.ranges = new Map();
    this.completed = false;
  }

  section(name) { this.name = name; }

  add(geometry, material, options = {}) {
    if (this.completed) throw new Error('Cannot add to a finished scene.');
    const cast = options.cast ?? true;
    const receive = options.receive ?? true;
    const key = [this.name, material.id, cast, receive].join('/');
    if (!this.ranges.has(key)) this.ranges.set(key, new Range(this.name, material, cast, receive));
    this.ranges.get(key).add(geometry, options);
  }

  box(material, at, scale, options = {}) {
    this.add(cube, material, { boxUV: true, at, scale, ...options });
  }

  plane(material, at, width, height, options = {}) {
    this.add(plane, material, { at, scale: [width, height, 1], cast: false, ...options });
  }

  cylinder(material, at, top, bottom, height, options = {}) {
    const segments = options.segments ?? 32;
    const key = ['tube', top, bottom, height, segments, Boolean(options.open)].join(':');
    const geometry = primitive(key, () => new THREE.CylinderGeometry(top, bottom, height, segments, 1, options.open));
    const uvScale = options.uvScale ?? [Math.PI * (top + bottom), Math.max(height, 0.22)];
    this.add(geometry, material, { at, uvScale, ...options });
  }

  lathe(material, at, profile, options = {}) {
    const points = profile.map(([r, y]) => new THREE.Vector2(r, y));
    this.add(new THREE.LatheGeometry(points, options.segments ?? 48), material, { at, ...options });
  }

  ring(material, at, radius, tube, options = {}) {
    const key = ['ring', radius, tube, options.arc ?? tau, options.segments ?? 48, options.cross ?? 8].join(':');
    const geometry = primitive(key, () =>
      new THREE.TorusGeometry(radius, tube, options.cross ?? 8, options.segments ?? 48, options.arc ?? tau));
    this.add(geometry, material, { at, ...options });
  }

  bar(material, first, second, radius, options = {}) {
    const from = new THREE.Vector3(...first);
    const to = new THREE.Vector3(...second);
    const center = from.clone().lerp(to, 0.5).toArray();
    const span = to.sub(from);
    const height = span.length();
    if (height < 0.0001) return;
    const turn = new THREE.Quaternion().setFromUnitVectors(localY, span.divideScalar(height));
    const sides = options.segments ?? 9;
    const key = ['bar', sides].join(':');
    const geometry = primitive(key, () => new THREE.CylinderGeometry(1, 1, 1, sides));
    this.add(geometry, material, { at: center, scale: [radius, height, radius], turn, ...options });
  }

  rock(material, at, scale, options = {}) {
    const detail = options.detail ?? 0;
    const key = ['rock', detail].join(':');
    const shape = primitive(key, () => new THREE.IcosahedronGeometry(1, detail));
    this.add(shape, material, { at, scale, ...options });
  }

  finish(root) {
    for (const range of this.ranges.values()) {
      if (range.vertices) root.add(range.bake());
    }
    this.ranges.clear();
    this.completed = true;
    return root;
  }
}

export function band(rInner, rOuter, aStart, aEnd, low, high, samples = 12) {
  const draft = new Draft();
  const inner = typeof rInner === 'function' ? rInner : () => rInner;
  const outer = typeof rOuter === 'function' ? rOuter : () => rOuter;
  const bottom = typeof low === 'function' ? low : () => low;
  const top = typeof high === 'function' ? high : () => high;
  const point = (radius, angle, height) => polar(angle, radius(angle, height), height);
  for (let i = 0; i < samples; i += 1) {
    const a = mix(aStart, aEnd, i / samples);
    const b = mix(aStart, aEnd, (i + 1) / samples);
    const l = bottom(a);
    const m = bottom(b);
    const h = top(a);
    const n = top(b);
    const io = point(inner, a, l);
    const jo = point(inner, b, m);
    const it = point(inner, a, h);
    const jt = point(inner, b, n);
    const oo = point(outer, a, l);
    const po = point(outer, b, m);
    const ot = point(outer, a, h);
    const pt = point(outer, b, n);
    const ua = a * 4.85;
    const ub = b * 4.85;
    draft.quad(oo, po, pt, ot, { uv: [[ua, l], [ub, m], [ub, n], [ua, h]] });
    draft.quad(jo, io, it, jt, { uv: [[ub, m], [ua, l], [ua, h], [ub, n]] });
    draft.quad(it, ot, pt, jt, { uv: [[ua, 0], [ua, 0.72], [ub, 0.72], [ub, 0]] });
    draft.quad(io, jo, po, oo, { uv: [[ua, 0], [ub, 0], [ub, 0.72], [ua, 0.72]] });
    if (i === 0 && aEnd - aStart < tau - 0.0001) draft.quad(io, oo, ot, it);
    if (i === samples - 1 && aEnd - aStart < tau - 0.0001) draft.quad(po, jo, jt, pt);
  }
  return draft.finish();
}

export function flatPolygon(points, y, repeat = 1) {
  const draft = new Draft();
  const first = points[0];
  for (let i = 1; i < points.length - 1; i += 1) {
    const corners = [first, points[i], points[i + 1]];
    draft.tri(...corners.map(([x, z]) => [x, y, z]), {
      uv: corners.map(([x, z]) => [x * repeat, z * repeat]),
    });
  }
  return draft.finish();
}

export function tint(hex, gain = 1) { return new THREE.Color(hex).multiplyScalar(gain); }

export function frameAt(angle, distance, side = 0, y = 0) {
  return [
    Math.sin(angle) * distance + Math.cos(angle) * side,
    y,
    Math.cos(angle) * distance - Math.sin(angle) * side,
  ];
}
