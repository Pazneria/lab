import * as T from 'three';

export function seeded(seed) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

const unitBox = new T.BoxGeometry(1, 1, 1);
const unitPlane = new T.PlaneGeometry(1, 1);
const unitSphere = new T.SphereGeometry(1, 20, 12);
const cylinders = new Map();
const beveledBoxes = new Map();

function remap(value, half, radius, steps) {
  if (steps === 3) return Math.sign(value) * (Math.abs(value) > 0.8 ? half : half - radius);
  if (Math.abs(value) > 0.85) return Math.sign(value) * half;
  if (Math.abs(value) > 0.4) return Math.sign(value) * (half - radius * 0.48);
  return Math.sign(value) * (half - radius);
}

function bevelGeometry(width, height, depth, requestedRadius, soft, uvRate) {
  const radius = Math.min(requestedRadius, width * 0.46, height * 0.46, depth * 0.46);
  const key = [width, height, depth, radius, soft, ...(uvRate ?? [])].join('/');
  if (beveledBoxes.has(key)) return beveledBoxes.get(key);
  const steps = radius ? (soft ? 5 : 3) : 1;
  const geometry = radius ? new T.BoxGeometry(1, 1, 1, steps, steps, steps) : unitBox.clone();
  const positions = geometry.attributes.position;
  const normals = geometry.attributes.normal;
  const uvs = geometry.attributes.uv;
  const half = [width * 0.5, height * 0.5, depth * 0.5];
  for (let i = 0; i < positions.count; i++) {
    const faceX = normals.getX(i), faceY = normals.getY(i), faceZ = normals.getZ(i);
    let x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i);
    if (radius) {
      const px = remap(x * 2, half[0], radius, steps);
      const py = remap(y * 2, half[1], radius, steps);
      const pz = remap(z * 2, half[2], radius, steps);
      const ax = Math.max(-half[0] + radius, Math.min(half[0] - radius, px));
      const ay = Math.max(-half[1] + radius, Math.min(half[1] - radius, py));
      const az = Math.max(-half[2] + radius, Math.min(half[2] - radius, pz));
      const magnitude = Math.hypot(px - ax, py - ay, pz - az);
      const nx = (px - ax) / magnitude, ny = (py - ay) / magnitude, nz = (pz - az) / magnitude;
      normals.setXYZ(i, nx, ny, nz);
      x = ax + nx * radius;
      y = ay + ny * radius;
      z = az + nz * radius;
    } else {
      x *= width;
      y *= height;
      z *= depth;
    }
    positions.setXYZ(i, x, y, z);
    if (uvRate) {
      const u = Math.abs(faceX) > 0.5 ? half[2] - faceX * z : half[0] + (faceZ < -0.5 ? -x : x);
      const v = Math.abs(faceY) > 0.5 ? half[2] - faceY * z : half[1] + y;
      uvs.setXY(i, u * uvRate[0], v * uvRate[1]);
    }
  }
  beveledBoxes.set(key, geometry);
  return geometry;
}

function cylinderGeometry(top, bottom, sides, open) {
  const key = [top, bottom, sides, open].join('/');
  if (!cylinders.has(key)) cylinders.set(key, new T.CylinderGeometry(top, bottom, 1, sides, 1, open));
  return cylinders.get(key);
}

function merge(entries) {
  let vertexCount = 0, indexCount = 0;
  for (const { geometry } of entries) {
    vertexCount += geometry.attributes.position.count;
    indexCount += geometry.index?.count ?? geometry.attributes.position.count;
  }
  const position = new Float32Array(vertexCount * 3);
  const normal = new Float32Array(vertexCount * 3);
  const uv = new Float32Array(vertexCount * 2);
  const index = vertexCount <= 65535 ? new Uint16Array(indexCount) : new Uint32Array(indexCount);
  const transformed = new T.Vector3();
  const direction = new T.Vector3();
  const normalMatrix = new T.Matrix3();
  let offset = 0, indexOffset = 0;
  for (const { geometry, matrix } of entries) {
    const { position: p, normal: n, uv: t } = geometry.attributes;
    normalMatrix.getNormalMatrix(matrix);
    for (let i = 0; i < p.count; i++) {
      transformed.fromBufferAttribute(p, i).applyMatrix4(matrix).toArray(position, (offset + i) * 3);
      direction.fromBufferAttribute(n, i).applyNormalMatrix(normalMatrix).toArray(normal, (offset + i) * 3);
      if (t) {
        uv[(offset + i) * 2] = t.getX(i);
        uv[(offset + i) * 2 + 1] = t.getY(i);
      }
    }
    const source = geometry.index?.array;
    const count = source?.length ?? p.count;
    for (let i = 0; i < count; i++) index[indexOffset + i] = offset + (source ? source[i] : i);
    offset += p.count;
    indexOffset += count;
  }
  const result = new T.BufferGeometry();
  result.setAttribute('position', new T.BufferAttribute(position, 3));
  result.setAttribute('normal', new T.BufferAttribute(normal, 3));
  result.setAttribute('uv', new T.BufferAttribute(uv, 2));
  result.setIndex(new T.BufferAttribute(index, 1));
  result.computeBoundingSphere();
  return result;
}

export class Kit {
  constructor(scene, obstacle) {
    this.scene = scene;
    this.obstacle = obstacle;
    this.transform = new T.Matrix4();
    this.next = new Map();
    this.origin = new T.Vector3();
    this.scale = new T.Vector3();
    this.rotation = new T.Quaternion();
    this.euler = new T.Euler();
    this.up = new T.Vector3(0, 1, 0);
  }

  group(x, y, z, yaw, fn) {
    const old = this.transform;
    this.transform = old.clone().multiply(new T.Matrix4().makeRotationY(yaw).setPosition(x, y, z));
    try { fn(); } finally { this.transform = old; }
  }

  geo(material, geometry, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1, angles = {}) {
    const rotation = angles.isQuaternion ? angles
      : this.rotation.setFromEuler(this.euler.set(angles.rx ?? 0, angles.ry ?? 0, angles.rz ?? 0));
    const matrix = new T.Matrix4().compose(this.origin.set(x, y, z), rotation, this.scale.set(sx, sy, sz));
    matrix.premultiply(this.transform);
    if (!this.next.has(material)) this.next.set(material, []);
    this.next.get(material).push({ geometry, matrix });
  }

  box(material, x, y, z, width, height, depth, radius = 0, angles = {}) {
    if (width <= 0 || height <= 0 || depth <= 0) throw new RangeError('Box dimensions must be positive');
    const uvRate = material.userData.uvRate;
    if (!radius && !uvRate) this.geo(material, unitBox, x, y, z, width, height, depth, angles);
    else this.geo(material, bevelGeometry(width, height, depth, radius, angles.soft, uvRate), x, y, z, 1, 1, 1, angles);
  }

  plane(material, x, y, z, width, height, angles) {
    this.geo(material, unitPlane, x, y, z, width, height, 1, angles);
  }

  sphere(material, x, y, z, width, height = width, depth = width, angles) {
    this.geo(material, unitSphere, x, y, z, width, height, depth, angles);
  }

  cylinder(material, x, y, z, top, height, bottom = top, sides = 16, angles = {}) {
    this.geo(material, cylinderGeometry(top, bottom, sides, angles.open ?? false), x, y, z, 1, height, 1, angles);
  }

  strut(material, start, end, radius, sides = 8) {
    const a = new T.Vector3(...start), b = new T.Vector3(...end);
    const direction = b.clone().sub(a);
    const distance = direction.length();
    const center = a.lerp(b, 0.5);
    const rotation = new T.Quaternion().setFromUnitVectors(this.up, direction.normalize());
    this.geo(material, cylinderGeometry(radius, radius, sides, false), center.x, center.y, center.z, 1, distance, 1, rotation);
  }

  tube(material, points, radius, steps = 16, sides = 8, closed = false) {
    const path = new T.CatmullRomCurve3(points.map(point => new T.Vector3(...point)), closed);
    this.geo(material, new T.TubeGeometry(path, steps, radius, sides, closed));
  }

  lathe(material, profile, x, y, z, segments = 16) {
    const points = profile.map(point => new T.Vector2(...point));
    this.geo(material, new T.LatheGeometry(points, segments), x, y, z);
  }

  polygon(material, points, z = 0) {
    const outline = new T.Shape(points.map(point => new T.Vector2(...point)));
    this.geo(material, new T.ShapeGeometry(outline), 0, 0, z);
  }

  quad(material, vertices, flip = false) {
    const geometry = new T.BufferGeometry();
    geometry.setAttribute('position', new T.Float32BufferAttribute(vertices.flat(), 3));
    geometry.setAttribute('uv', new T.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 1], 2));
    geometry.setIndex(flip ? [0, 2, 1, 0, 3, 2] : [0, 1, 2, 0, 2, 3]);
    geometry.computeVertexNormals();
    this.geo(material, geometry);
  }

  profile(material, front, back, zFront, zBack) {
    for (let i = 0; i < front.length; i++) {
      const n = (i + 1) % front.length;
      this.quad(material, [
        [...front[i], zFront], [...front[n], zFront],
        [...back[n], zBack], [...back[i], zBack]
      ]);
    }
  }

  shadow(material, x, z, width, depth, y = 0.009) {
    this.plane(material, x, y, z, width, depth, { rx: -Math.PI / 2 });
  }

  block(name, x, z, width, depth) {
    const center = new T.Vector3(x, 0, z).applyMatrix4(this.transform);
    const matrix = this.transform.elements;
    const w = Math.abs(matrix[0]) * width + Math.abs(matrix[8]) * depth;
    const d = Math.abs(matrix[2]) * width + Math.abs(matrix[10]) * depth;
    this.obstacle(name, center.x, center.z, w, d);
  }

  finish(name) {
    const group = new T.Group();
    group.name = name;
    for (const [material, entries] of this.next) {
      const mesh = new T.Mesh(merge(entries), material);
      mesh.name = material.name;
      mesh.matrixAutoUpdate = false;
      group.add(mesh);
    }
    this.next.clear();
    this.scene.add(group);
    return group;
  }
}
