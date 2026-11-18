import * as THREE from '../vendor/three.module.min.js';

const geometryCache = new Map();
const UP = new THREE.Vector3(0, 1, 0);
const IDENTITY = new THREE.Matrix4();
const origin = new THREE.Vector3();
const unitScale = new THREE.Vector3(1, 1, 1);
const mirrorSize = new THREE.Vector3();
const euler = new THREE.Euler();
const localMatrix = new THREE.Matrix4();
const worldMatrix = new THREE.Matrix4();
const q = new THREE.Quaternion();
const v = new THREE.Vector3();
const n = new THREE.Vector3();
const normalMatrix = new THREE.Matrix3();

function cached(key, create) {
  if (!geometryCache.has(key)) geometryCache.set(key, create());
  return geometryCache.get(key);
}

function transform(x, y, z, rotation) {
  origin.set(x, y, z);
  q.setFromEuler(euler.set(...rotation));
  return new THREE.Matrix4().compose(origin, q, unitScale);
}

export function frame(x = 0, y = 0, z = 0, rotation = [0, 0, 0], parent = IDENTITY) {
  return transform(x, y, z, rotation).premultiply(parent);
}

export function canvasMap(width, height, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  draw(ctx, width, height);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  return map;
}

export function seeded(seed) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

export function standard(color, roughness = .62, metalness = 0, options = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, ...options });
}

export function luminous(color) {
  return new THREE.MeshBasicMaterial({ color });
}

function roundGeometry(width, height, depth, radius) {
  const bevel = Math.min(.045, radius * .38, Math.min(width, height, depth) * .23);
  const halfX = width / 2 - bevel;
  const halfY = height / 2 - bevel;
  const r = Math.min(radius - bevel, halfX * .9, halfY * .9);
  const shape = new THREE.Shape();
  shape.moveTo(-halfX + r, -halfY);
  shape.lineTo(halfX - r, -halfY);
  shape.quadraticCurveTo(halfX, -halfY, halfX, -halfY + r);
  shape.lineTo(halfX, halfY - r);
  shape.quadraticCurveTo(halfX, halfY, halfX - r, halfY);
  shape.lineTo(-halfX + r, halfY);
  shape.quadraticCurveTo(-halfX, halfY, -halfX, halfY - r);
  shape.lineTo(-halfX, -halfY + r);
  shape.quadraticCurveTo(-halfX, -halfY, -halfX + r, -halfY);
  return new THREE.ExtrudeGeometry(shape, {
    depth: depth - bevel * 2, bevelEnabled: true, bevelSize: bevel,
    bevelThickness: bevel, bevelSegments: 2, curveSegments: 3
  }).translate(0, 0, -depth / 2 + bevel);
}

function arcGeometry(outer, inner, length, depth, bevel) {
  const count = Math.ceil(length * outer * 26) + 1;
  const shape = new THREE.Shape();
  for (let i = 0; i <= count; ++i) {
    const angle = i * length / count;
    const x = (outer - bevel) * Math.cos(angle);
    const y = (outer - bevel) * Math.sin(angle);
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  for (let i = count; i >= 0; --i) {
    const angle = i * length / count;
    shape.lineTo((inner + bevel) * Math.cos(angle), (inner + bevel) * Math.sin(angle));
  }
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, {
    depth: depth - bevel * 2, bevelEnabled: bevel > 0, bevelSize: bevel,
    bevelThickness: bevel, bevelSegments: 1, curveSegments: 1
  }).translate(0, 0, -depth / 2 + bevel);
}

function batchPart(batch, geometry, matrix) {
  const position = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  const uv = geometry.attributes.uv;
  const index = geometry.index;
  const offset = batch.position.length / 3;
  normalMatrix.getNormalMatrix(matrix);
  for (let i = 0; i < position.count; ++i) {
    v.fromBufferAttribute(position, i).applyMatrix4(matrix);
    batch.position.push(v.x, v.y, v.z);
    n.fromBufferAttribute(normal, i).applyMatrix3(normalMatrix).normalize();
    batch.normal.push(n.x, n.y, n.z);
    batch.uv.push(uv ? uv.getX(i) : 0, uv ? uv.getY(i) : 0);
  }
  if (index) {
    for (let i = 0; i < index.count; ++i) batch.index.push(offset + index.getX(i));
  } else {
    for (let i = 0; i < position.count; ++i) batch.index.push(offset + i);
  }
}

export class Fabricator {
  constructor(scene) {
    this.scene = scene;
    this.zones = new Map();
    this.deferredDecals = [];
    this.zone('Hall');
  }

  zone(name) {
    if (!this.zones.has(name)) {
      const group = new THREE.Group();
      group.name = name;
      this.scene.add(group);
      this.zones.set(name, { group, batches: new Map() });
    }
    this.active = this.zones.get(name);
  }

  part(f, geometry, x, y, z, material, rotation = [0, 0, 0], scale = unitScale) {
    q.setFromEuler(euler.set(...rotation));
    return this.matrixPart(f, geometry, x, y, z, material, q, scale);
  }

  matrixPart(f, geometry, x, y, z, material, quaternion, scale = unitScale) {
    origin.set(x, y, z);
    localMatrix.compose(origin, quaternion, scale);
    worldMatrix.multiplyMatrices(f, localMatrix);
    if (material.transparent && !material.userData.staticBlend) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.matrix.copy(worldMatrix);
      mesh.matrixAutoUpdate = false;
      mesh.renderOrder = 2;
      this.active.group.add(mesh);
      return mesh;
    }
    const batches = this.active.batches;
    if (!batches.has(material)) {
      batches.set(material, { position: [], normal: [], uv: [], index: [] });
    }
    batchPart(batches.get(material), geometry, worldMatrix);
    return null;
  }

  box(f, w, h, d, x, y, z, material, rotation) {
    mirrorSize.set(w, h, d);
    return this.part(f, cached('box', () => new THREE.BoxGeometry()), x, y, z, material, rotation, mirrorSize);
  }

  rounded(f, w, h, d, radius, x, y, z, material, rotation) {
    const geometry = cached(['rounded', w, h, d, radius].join('/'), () => roundGeometry(w, h, d, radius));
    return this.part(f, geometry, x, y, z, material, rotation);
  }

  plane(f, w, h, x, y, z, material, rotation) {
    mirrorSize.set(w, h, 1);
    return this.part(f, cached('plane', () => new THREE.PlaneGeometry()), x, y, z, material, rotation, mirrorSize);
  }

  cylinder(f, top, bottom, height, x, y, z, material, rotation, sides = 24) {
    const geometry = cached(['cylinder', top, bottom, height, sides].join('/'), () =>
      new THREE.CylinderGeometry(top, bottom, height, sides, 1));
    return this.part(f, geometry, x, y, z, material, rotation);
  }

  sphere(f, x, y, z, sx, sy, sz, material, rotation) {
    mirrorSize.set(sx, sy, sz);
    return this.part(f, cached('sphere', () => new THREE.SphereGeometry(1, 24, 12)), x, y, z, material, rotation, mirrorSize);
  }

  ring(f, major, minor, x, y, z, material, rotation, segments = 48) {
    const geometry = cached(['torus', major, minor, segments].join('/'), () =>
      new THREE.TorusGeometry(major, minor, 8, segments));
    return this.part(f, geometry, x, y, z, material, rotation);
  }

  arc(f, outer, inner, depth, start, length, x, y, z, material, bevel = .009) {
    const geometry = cached(['arc', outer, inner, depth, length, bevel].join('/'), () =>
      arcGeometry(outer, inner, length, depth, bevel));
    return this.part(f, geometry, x, y, z, material, [0, 0, start]);
  }

  profile(f, points, depth, bevel, x, y, z, material, rotation) {
    const shape = new THREE.Shape(points.map(([px, py]) => new THREE.Vector2(px, py)));
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth - 2 * bevel, bevelEnabled: bevel > 0,
      bevelSize: bevel, bevelThickness: bevel, bevelSegments: 2
    }).translate(0, 0, -depth / 2 + bevel);
    return this.part(f, geometry, x, y, z, material, rotation);
  }

  rod(f, a, b, radius, material, sides = 12) {
    v.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    const length = v.length();
    q.setFromUnitVectors(UP, v.multiplyScalar(1 / length));
    const geometry = cached(['rod', sides].join('/'), () => new THREE.CylinderGeometry(1, 1, 1, sides));
    mirrorSize.set(radius, length, radius);
    return this.matrixPart(f, geometry, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, material, q, mirrorSize);
  }

  cable(f, points, radius, material, samples = 28) {
    const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
    return this.part(f, new THREE.TubeGeometry(curve, samples, radius, 6, false), 0, 0, 0, material);
  }

  decal(f, w, h, x, y, z, map, rotation) {
    if (map.userData.plaque) {
      this.deferredDecals.push({ zone: this.active, f, w, h, x, y, z, map, rotation });
      return null;
    }
    const material = new THREE.MeshBasicMaterial({ map, color: 0xffffff, toneMapped: false });
    return this.plane(f, w, h, x, y, z, material, rotation);
  }

  bakePlaques() {
    if (!this.deferredDecals.length) return;
    const size = 2048;
    const padding = 12;
    const rects = new Map();
    const batches = [];
    let current = [];
    let x = padding;
    let y = padding;
    let rowHeight = 0;
    for (const { map } of this.deferredDecals) {
      if (rects.has(map)) continue;
      const { width, height } = map.image;
      if (x + width + padding > size) {
        x = padding;
        y += rowHeight + padding * 2;
        rowHeight = 0;
      }
      if (y + height + padding > size) {
        batches.push(current);
        current = [];
        x = padding;
        y = padding;
        rowHeight = 0;
      }
      const region = { x, y, width, height, map };
      current.push(region);
      rects.set(map, region);
      x += width + padding * 2;
      rowHeight = Math.max(rowHeight, height);
    }
    batches.push(current);

    for (const regions of batches) {
      const atlasHeight = 2 ** Math.ceil(Math.log2(Math.max(...regions.map((r) => r.y + r.height + padding))));
      const atlas = canvasMap(size, atlasHeight, (ctx) => {
        for (const { x, y, width, height, map } of regions) {
          const image = map.image;
          ctx.drawImage(image, x, y);
          ctx.drawImage(image, 0, 0, width, 1, x, y - padding, width, padding);
          ctx.drawImage(image, 0, height - 1, width, 1, x, y + height, width, padding);
          ctx.drawImage(image, 0, 0, 1, height, x - padding, y, padding, height);
          ctx.drawImage(image, width - 1, 0, 1, height, x + width, y, padding, height);
        }
      });
      const material = new THREE.MeshBasicMaterial({ map: atlas, color: 0xffffff, toneMapped: false });
      for (const region of regions) {
        const plane = new THREE.PlaneGeometry();
        const uv = plane.attributes.uv;
        for (let i = 0; i < uv.count; ++i) {
          uv.setXY(i, (region.x + .5 + uv.getX(i) * (region.width - 1)) / size,
            1 - (region.y + .5 + (1 - uv.getY(i)) * (region.height - 1)) / atlasHeight);
        }
        region.plane = plane;
        region.material = material;
      }
    }

    const previous = this.active;
    for (const decal of this.deferredDecals) {
      const { zone, f, w, h, x, y, z, map, rotation } = decal;
      const region = rects.get(map);
      this.active = zone;
      mirrorSize.set(w, h, 1);
      this.part(f, region.plane, x, y, z, region.material, rotation, mirrorSize);
      map.dispose();
    }
    this.active = previous;
    this.deferredDecals.length = 0;
  }

  finish() {
    this.bakePlaques();
    let meshes = 0;
    let triangles = 0;
    for (const { group, batches } of this.zones.values()) {
      for (const [material, batch] of batches) {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(batch.position, 3));
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute(batch.normal, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(batch.uv, 2));
        geometry.setIndex(batch.index);
        geometry.computeBoundingSphere();
        const mesh = new THREE.Mesh(geometry, material);
        if (material.userData.staticBlend) mesh.renderOrder = 1;
        group.add(mesh);
      }
      for (const mesh of group.children) {
        ++meshes;
        const geometry = mesh.geometry;
        triangles += (geometry.index?.count ?? geometry.attributes.position.count) / 3;
      }
      batches.clear();
    }
    geometryCache.clear();
    return { meshes, triangles };
  }
}
