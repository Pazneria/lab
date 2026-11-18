import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export const PI = Math.PI;
export const TAU = PI * 2;
export const v3 = (x, y, z) => new THREE.Vector3(x, y, z);
export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function rng(seed) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function texture(w, h, draw, renderer, repeat = false) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  draw(ctx, w, h);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  if (repeat) map.wrapS = map.wrapT = THREE.RepeatWrapping;
  return map;
}

export function material(color, roughness = 0.75, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness, ...extra });
}

export function glow(color, intensity = 1.0) {
  return material(color, 0.6, { emissive: color, emissiveIntensity: intensity });
}

export function grid(columns, rows, position, uv = (s, t) => [s, t], flip = false) {
  const vertices = [], uvs = [], indices = [];
  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= columns; i++) {
      const s = i / columns, t = j / rows;
      vertices.push(...position(s, t));
      uvs.push(...uv(s, t));
    }
  }
  const stride = columns + 1;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      const a = i + j * stride, b = a + 1, c = a + stride, d = c + 1;
      if (flip) indices.push(a, c, b, b, c, d);
      else indices.push(a, b, c, b, d, c);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

const yAxis = v3(0, 1, 0);

export class World {
  constructor(scene) {
    this.scene = scene;
    this.groups = new Map();
    this.blockers = [];
    this.steps = [];
    this.zone = 'shell';
    this.rotation = new THREE.Euler(0, 0, 0, 'YXZ');
    this.transform = new THREE.Matrix4();
    this.position = new THREE.Vector3();
    this.quaternion = new THREE.Quaternion();
    this.scale = new THREE.Vector3();
  }

  put(geo, mat, x = 0, y = 0, z = 0, options = {}) {
    const { rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1, cast = false, quaternion } = options;
    this.rotation.set(rx, ry, rz);
    this.quaternion.setFromEuler(this.rotation);
    this.position.set(x, y, z);
    this.scale.set(sx, sy, sz);
    this.transform.compose(this.position, quaternion ?? this.quaternion, this.scale);
    geo.applyMatrix4(this.transform);
    if (!geo.index) {
      const vertexCount = geo.attributes.position.count;
      const index = Array.from({ length: vertexCount }, (_, i) => i);
      geo.setIndex(index);
    }
    if (mat.tileOrigin) {
      const origin = new Float32Array(geo.attributes.position.count * 2);
      for (let i = 0; i < origin.length; i += 2) {
        origin[i] = mat.tileOrigin[0];
        origin[i + 1] = mat.tileOrigin[1];
      }
      geo.setAttribute('clothOrigin', new THREE.BufferAttribute(origin, 2));
      mat = mat.atlasMaterial;
    }
    const key = this.zone + '/' + mat.id;
    if (!this.groups.has(key)) this.groups.set(key, { mat, cast, geometries: [] });
    const group = this.groups.get(key);
    group.cast ||= cast;
    group.geometries.push(geo);
  }

  box(x, y, z, w, h, d, mat, options) {
    this.put(new THREE.BoxGeometry(w, h, d), mat, x, y, z, options);
  }

  plane(x, y, z, w, h, mat, options) {
    this.put(new THREE.PlaneGeometry(w, h), mat, x, y, z, options);
  }

  cyl(x, y, z, rt, rb, h, mat, options, segments = 18) {
    this.put(new THREE.CylinderGeometry(rt, rb, h, segments), mat, x, y, z, options);
  }

  sphere(x, y, z, a, b, c, mat, options = {}, segments = 16) {
    this.put(new THREE.SphereGeometry(1, segments, Math.max(4, Math.min(14, Math.ceil(segments * .51)))), mat, x, y, z,
      { ...options, sx: a, sy: b, sz: c });
  }

  torus(x, y, z, radius, wire, mat, options, length = TAU, segments = 40) {
    this.put(new THREE.TorusGeometry(radius, wire, 6, segments, length), mat, x, y, z, options);
  }

  link(a, b, radius, mat, segments = 6, cast = false) {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b);
    const direction = end.clone().sub(start);
    const length = direction.length();
    if (length < 0.00001) return;
    const mid = start.addScaledVector(direction, 0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(yAxis, direction.normalize());
    this.cyl(mid.x, mid.y, mid.z, radius, radius, length, mat, { quaternion, cast }, segments);
  }

  tube(points, radius, mat, closed = false, segments = null, cast = false) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), closed);
    this.put(new THREE.TubeGeometry(curve, segments ?? Math.max(12, points.length * 3), radius, 5, closed),
      mat, 0, 0, 0, { cast });
  }

  shape(points, x, y, z, depth, mat, options = {}) {
    const shape = new THREE.Shape();
    points.forEach(([px, py], i) => i === 0 ? shape.moveTo(px, py) : shape.lineTo(px, py));
    shape.closePath();
    this.put(new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false }), mat, x, y, z, options);
  }

  block(x, z, width, depth) {
    this.blockers.push({ type: 'box', x, z, hx: width / 2, hz: depth / 2 });
  }

  blockCircle(x, z, radius) {
    this.blockers.push({ type: 'circle', x, z, radius });
  }

  step(x, z, width, depth, height) {
    this.steps.push({ x, z, hx: width / 2, hz: depth / 2, height });
  }

  finalize() {
    for (const [key, { mat, cast, geometries }] of this.groups) {
      const combined = mergeGeometries(geometries);
      if (!combined) throw new Error('Could not merge geometry for ' + key);
      combined.computeBoundingSphere();
      const mesh = new THREE.Mesh(combined, mat);
      mesh.name = key;
      mesh.castShadow = cast;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      for (const geometry of geometries) geometry.dispose();
    }
    this.groups.clear();
  }
}

export function sampleLine(fn, count, first = 0, last = 1) {
  return Array.from({ length: count + 1 }, (_, i) => fn(lerp(first, last, i / count)));
}

