import * as THREE from '../vendor/three.module.js';

const cube = new THREE.BoxGeometry();
const quad = new THREE.PlaneGeometry();
const round = new THREE.SphereGeometry(1, 12, 8);
const cylinders = new Map();

const unit = new THREE.Vector3(1, 1, 1);
const vertical = new THREE.Vector3(0, 1, 0);
const angles = new THREE.Euler();
const localMatrix = new THREE.Matrix4();
const origin = new THREE.Vector3();
const rotation = new THREE.Quaternion();

function cylinder(segments, topRatio) {
  const key = segments + '/' + topRatio;
  if (!cylinders.has(key)) {
    cylinders.set(key, new THREE.CylinderGeometry(topRatio, 1, 1, segments, 1));
  }
  return cylinders.get(key);
}

export class MeshBuilder {
  constructor() {
    this.batches = new Map();
  }

  at(name, x = 0, y = 0, z = 0, yaw = 0) {
    return new Placement(this, name).at(x, y, z, yaw);
  }

  add(name, material, geometry, matrix, shadow) {
    const key = material.id + '/' + shadow;
    let batch = this.batches.get(key);
    if (!batch) {
      batch = { name, material, shadow, items: [], verts: 0, indices: 0 };
      this.batches.set(key, batch);
    }
    batch.items.push({ geometry, matrix: matrix.clone() });
    batch.verts += geometry.attributes.position.count;
    batch.indices += geometry.index ? geometry.index.count : geometry.attributes.position.count;
  }

  finish(scene) {
    const normalMatrix = new THREE.Matrix3();
    const value = new THREE.Vector3();
    let total = 0;
    let triangles = 0;
    for (const batch of this.batches.values()) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(batch.verts * 3);
      const normals = new Float32Array(batch.verts * 3);
      const uvs = new Float32Array(batch.verts * 2);
      const IndexArray = batch.verts > 65535 ? Uint32Array : Uint16Array;
      const indices = new IndexArray(batch.indices);
      let vertex = 0;
      let index = 0;
      for (const item of batch.items) {
        const { position, normal, uv } = item.geometry.attributes;
        normalMatrix.getNormalMatrix(item.matrix);
        for (let i = 0; i < position.count; i++) {
          value.fromBufferAttribute(position, i).applyMatrix4(item.matrix).toArray(positions, (vertex + i) * 3);
          value.fromBufferAttribute(normal, i).applyNormalMatrix(normalMatrix).toArray(normals, (vertex + i) * 3);
          uvs[(vertex + i) * 2] = uv.getX(i);
          uvs[(vertex + i) * 2 + 1] = uv.getY(i);
        }
        const source = item.geometry.index;
        for (let i = 0; i < (source ? source.count : position.count); i++) {
          indices[index++] = vertex + (source ? source.getX(i) : i);
        }
        vertex += position.count;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
      geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
      geometry.setIndex(new THREE.BufferAttribute(indices, 1));
      geometry.computeBoundingSphere();
      const mesh = new THREE.Mesh(geometry, batch.material);
      mesh.name = batch.name + ' / ' + batch.material.name;
      mesh.castShadow = batch.shadow === 1;
      mesh.receiveShadow = batch.shadow !== 2;
      mesh.matrixAutoUpdate = false;
      if (batch.material.userData.renderOrder !== undefined) {
        mesh.renderOrder = batch.material.userData.renderOrder;
      }
      scene.add(mesh);
      total++;
      triangles += batch.indices / 3;
    }
    this.batches.clear();
    return { meshes: total, triangles };
  }
}

class Placement {
  constructor(builder, name, matrix = new THREE.Matrix4()) {
    this.builder = builder;
    this.name = name;
    this.matrix = matrix;
  }

  at(x, y, z, yaw = 0) {
    const transform = new THREE.Matrix4().makeRotationY(yaw);
    transform.setPosition(x, y, z);
    return new Placement(this.builder, this.name, new THREE.Matrix4().multiplyMatrices(this.matrix, transform));
  }

  point(x, y, z) {
    return new THREE.Vector3(x, y, z).applyMatrix4(this.matrix);
  }

  primitive(material, geometry, x, y, z, sx, sy, sz, rx = 0, ry = 0, rz = 0, shadow = 0) {
    origin.set(x, y, z);
    rotation.setFromEuler(angles.set(rx, ry, rz));
    localMatrix.compose(origin, rotation, unit.set(sx, sy, sz)).premultiply(this.matrix);
    this.builder.add(this.name, material, geometry, localMatrix, shadow);
  }

  box(m, x, y, z, w, h, d, rx = 0, ry = 0, rz = 0, shadow = 0) {
    this.primitive(m, cube, x, y, z, w, h, d, rx, ry, rz, shadow);
  }

  plane(m, x, y, z, w, h, rx = 0, ry = 0, rz = 0) {
    this.primitive(m, quad, x, y, z, w, h, 1, rx, ry, rz, m.isMeshStandardMaterial ? 0 : 2);
  }

  cyl(m, x, y, z, r, height, segments = 12, rx = 0, ry = 0, rz = 0, topRatio = 1, shadow = 0) {
    this.primitive(m, cylinder(segments, topRatio), x, y, z, r, height, r, rx, ry, rz, shadow);
  }

  ball(m, x, y, z, sx, sy, sz, rx = 0, ry = 0, rz = 0) {
    this.primitive(m, round, x, y, z, sx, sy, sz, rx, ry, rz);
  }

  rod(m, a, b, radius, segments = 8, topRatio = 1, shadow = 0) {
    const delta = new THREE.Vector3().fromArray(b).sub(new THREE.Vector3().fromArray(a));
    const height = delta.length();
    if (height < 0.00001) return;
    origin.fromArray(a).addScaledVector(delta, 0.5);
    rotation.setFromUnitVectors(vertical, delta.divideScalar(height));
    localMatrix.compose(origin, rotation, unit.set(radius, height, radius)).premultiply(this.matrix);
    this.builder.add(this.name, m, cylinder(segments, topRatio), localMatrix, shadow);
  }

  line(m, points, radius, segments = 8) {
    for (let i = 1; i < points.length; i++) this.rod(m, points[i - 1], points[i], radius, segments);
  }
}
