import * as THREE from '../vendor/three.module.min.js';
import { finishTexture, radialTexture } from './art.mjs';

export function group(parent, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  const object = new THREE.Group();
  object.position.set(x, y, z);
  object.rotation.set(rx, ry, rz);
  parent.add(object);
  return object;
}

function place(parent, geometry, material, x, y, z) {
  const object = new THREE.Mesh(geometry, material);
  object.position.set(x, y, z);
  parent.add(object);
  return object;
}

function beveledBox(w, h, d, radius) {
  const bevel = Math.min(radius, w * 0.45, h * 0.45, d * 0.45);
  if (bevel <= 0) return new THREE.BoxGeometry(w, h, d);
  const x = w / 2 - bevel;
  const y = h / 2 - bevel;
  const shape = new THREE.Shape([
    new THREE.Vector2(-x, -y), new THREE.Vector2(x, -y),
    new THREE.Vector2(x, y), new THREE.Vector2(-x, y),
  ]);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: d - 2 * bevel, bevelEnabled: true,
    bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, steps: 1,
  });
  geometry.translate(0, 0, -d / 2 + bevel);
  const { position, normal, uv } = geometry.attributes;
  for (let vertex = 0; vertex < position.count; vertex += 1) {
    const nx = Math.abs(normal.getX(vertex));
    const ny = Math.abs(normal.getY(vertex));
    const nz = Math.abs(normal.getZ(vertex));
    const end = nx > Math.max(ny, nz);
    const edge = !end && ny > nz;
    const u = end ? position.getZ(vertex) / d : position.getX(vertex) / w;
    const v = edge ? position.getZ(vertex) / d : position.getY(vertex) / h;
    uv.setXY(vertex, u + 0.5, v + 0.5);
  }
  return geometry;
}

export function createKit() {
  const geometryCache = new Map();
  const materials = new Map();
  const accentLights = [];
  const finishes = new Map();
  const transparentMaps = new Map();
  const tmpStart = new THREE.Vector3();
  const tmpEnd = new THREE.Vector3();
  const axis = new THREE.Vector3(0, 1, 0);

  function cachedGeometry(type, params, build) {
    const key = type + ':' + params.join(',');
    if (!geometryCache.has(key)) geometryCache.set(key, build());
    return geometryCache.get(key);
  }

  function material(color, options = {}) {
    const {
      map = null, finish, gloss = 10, shine = '#25232a',
      emission, flat = false, alpha = 1, blend = false, side = THREE.FrontSide,
    } = options;
    if (finish && !finishes.has(finish)) finishes.set(finish, finishTexture(finish));
    const texture = map ?? finishes.get(finish) ?? null;
    const key = [color, texture?.uuid, gloss, shine, emission, flat, alpha, blend, side].join('|');
    if (materials.has(key)) return materials.get(key);
    const parameters = {
      color, map: texture, side, opacity: alpha, transparent: alpha < 1 || blend,
      depthWrite: !(alpha < 1 || blend),
    };
    const result = flat
      ? new THREE.MeshBasicMaterial({ ...parameters, toneMapped: false })
      : new THREE.MeshPhongMaterial({
          ...parameters, shininess: gloss, specular: shine,
          emissive: emission ?? '#000000', vertexColors: true,
        });
    materials.set(key, result);
    return result;
  }

  function litSign(texture) {
    return material('#ffffff', { map: texture, flat: true });
  }

  function box(parent, material, x, y, z, w, h, d, radius = 0) {
    const geometry = cachedGeometry('box', [w, h, d, radius], () => beveledBox(w, h, d, radius));
    return place(parent, geometry, material, x, y, z);
  }

  function plane(parent, material, x, y, z, w, h, sx = 1, sy = 1) {
    const geometry = cachedGeometry('plane', [w, h, sx, sy], () => new THREE.PlaneGeometry(w, h, sx, sy));
    return place(parent, geometry, material, x, y, z);
  }

  function cylinder(parent, material, x, y, z, top, length, bottom = top, sides = 20) {
    const geometry = cachedGeometry('cylinder', [top, bottom, length, sides],
      () => new THREE.CylinderGeometry(top, bottom, length, sides));
    return place(parent, geometry, material, x, y, z);
  }

  function ball(parent, material, x, y, z, radius, flatten = 1, sides = 24, rings = 13) {
    const geometry = cachedGeometry('ball', [radius, sides, rings], () => new THREE.SphereGeometry(radius, sides, rings));
    const mesh = place(parent, geometry, material, x, y, z);
    mesh.scale.y = flatten;
    return mesh;
  }

  function lathe(parent, material, x, y, z, profile, sides = 24) {
    const geometry = cachedGeometry('lathe', [...profile.flat(), sides],
      () => new THREE.LatheGeometry(profile.map(([r, h]) => new THREE.Vector2(r, h)), sides));
    return place(parent, geometry, material, x, y, z);
  }

  function rod(parent, material, from, to, radius, sides = 8) {
    tmpStart.fromArray(from);
    tmpEnd.fromArray(to).sub(tmpStart);
    const length = tmpEnd.length();
    if (length < 0.0001) return null;
    const mesh = cylinder(parent, material, from[0] + tmpEnd.x / 2, from[1] + tmpEnd.y / 2,
      from[2] + tmpEnd.z / 2, radius, length, radius, sides);
    mesh.quaternion.setFromUnitVectors(axis, tmpEnd.normalize());
    return mesh;
  }

  function path(parent, material, points, radius, sides = 8) {
    for (let i = 1; i < points.length; i += 1) rod(parent, material, points[i - 1], points[i], radius, sides);
  }

  function panel(parent, material, x, y, z, points, thickness, bevel = 0) {
    const shape = new THREE.Shape(points.map(([px, py]) => new THREE.Vector2(px, py)));
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickness, bevelEnabled: bevel > 0,
      bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, steps: 1,
    });
    geometry.translate(0, 0, -thickness * 0.5);
    return place(parent, geometry, material, x, y, z);
  }

  function floorEffect(parent, x, z, width, depth, color, alpha, layer = 1, y = 0.004) {
    if (!transparentMaps.has(color)) transparentMaps.set(color, radialTexture(color));
    const effectMaterial = material('#ffffff', { map: transparentMaps.get(color), flat: true, alpha, blend: true });
    const effect = plane(parent, effectMaterial, x, y, z, width, depth);
    effect.rotation.x = -Math.PI / 2;
    effect.renderOrder = layer;
    return effect;
  }

  function addAccent(x, y, z, radius, color, strength) {
    accentLights.push({ x, y, z, radius, color: new THREE.Color(color), strength });
  }

  return { material, litSign, box, plane, cylinder, ball, lathe, rod, path, panel, floorEffect, addAccent, accentLights };
}

function surface(positions, normals, uvs, indices) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}

export function profileShell(parent, profile, width, bandMaterial, sideMaterial) {
  const points = profile.map(([z, y]) => new THREE.Vector2(z, y));
  const triangles = THREE.ShapeUtils.triangulateShape(points, []);
  const half = width / 2;
  const zMin = Math.min(...profile.map(point => point[0]));
  const zMax = Math.max(...profile.map(point => point[0]));
  const yMin = Math.min(...profile.map(point => point[1]));
  const yMax = Math.max(...profile.map(point => point[1]));

  for (const side of [-1, 1]) {
    const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];
    for (const [z, y] of profile) {
      const u = (z - zMin) / (zMax - zMin);
      positions.push(side * half, y, z);
      normals.push(side, 0, 0);
      uvs.push(side === -1 ? u : 1 - u, (y - yMin) / (yMax - yMin));
    }
    for (const [a, b, c] of triangles) {
      const [p, q, r] = [profile[a], profile[b], profile[c]];
      const cross = (q[1] - p[1]) * (r[0] - p[0]) - (q[0] - p[0]) * (r[1] - p[1]);
      if (cross * side > 0) indices.push(a, b, c);
      else indices.push(a, c, b);
    }
    place(parent, surface(positions, normals, uvs, indices), sideMaterial, 0, 0, 0);
  }

  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  for (let i = 0; i < profile.length; i += 1) {
    const [z, y] = profile[i];
    const [nextZ, nextY] = profile[(i + 1) % profile.length];
    const length = Math.hypot(nextZ - z, nextY - y);
    const ny = (z - nextZ) / length;
    const nz = (nextY - y) / length;
    const start = positions.length / 3;
    positions.push(-half, y, z, half, y, z, half, nextY, nextZ, -half, nextY, nextZ);
    for (let j = 0; j < 4; j += 1) normals.push(0, ny, nz);
    uvs.push(0, 0, 1, 0, 1, length * 0.86, 0, length * 0.86);
    indices.push(start, start + 1, start + 2, start, start + 2, start + 3);
  }
  place(parent, surface(positions, normals, uvs, indices), bandMaterial, 0, 0, 0);
}

export function curvedDisplay(parent, width, height, depth, material, z = 0) {
  const geometry = new THREE.PlaneGeometry(width, height, 16, 12);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    const u = position.getX(i) / (width * 0.5);
    const v = position.getY(i) / (height * 0.5);
    position.setZ(i, depth * (1 - u * u) * (1 - v * v));
  }
  geometry.computeVertexNormals();
  return place(parent, geometry, material, 0, 0, z);
}

function applyAccent(points, position, normal) {
  let red = 1, green = 1, blue = 1;
  for (const light of points) {
    const dx = light.x - position.x;
    const dy = light.y - position.y;
    const dz = light.z - position.z;
    const distance = Math.hypot(dx, dy, dz);
    if (distance >= light.radius) continue;
    const dot = (normal.x * dx + normal.y * dy + normal.z * dz) / Math.max(distance, 0.001);
    const falloff = 1 - distance / light.radius;
    const intensity = (0.13 + 0.87 * Math.max(0, dot)) * falloff ** 2 * light.strength;
    red += light.color.r * intensity;
    green += light.color.g * intensity;
    blue += light.color.b * intensity;
  }
  return [red, green, blue];
}

function combinesTints(material) {
  return !material.transparent && (material.isMeshPhongMaterial || material.isMeshBasicMaterial);
}

function materialKey(mesh) {
  const material = mesh.material;
  if (!combinesTints(material)) return material.uuid + ':' + mesh.renderOrder;
  return [material.type, material.map?.uuid, material.side, material.shininess, material.specular?.getHex(),
    material.emissive?.getHex(), material.toneMapped, mesh.renderOrder].join(':');
}

export function batchStatic(source, lights) {
  source.updateMatrixWorld(true);
  const buckets = new Map();
  source.traverse(object => {
    if (!object.isMesh) return;
    const key = materialKey(object);
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(object);
  });
  const result = new THREE.Group();
  result.name = 'Batched arcade';
  const position = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3();

  for (const meshes of buckets.values()) {
    const originalMaterial = meshes[0].material;
    const mergedTint = combinesTints(originalMaterial);
    const material = mergedTint ? originalMaterial.clone() : originalMaterial;
    if (mergedTint) {
      material.color.setRGB(1, 1, 1);
      material.vertexColors = true;
    }
    const numVertices = meshes.reduce((sum, item) => sum + item.geometry.attributes.position.count, 0);
    const numIndices = meshes.reduce((sum, item) =>
      sum + (item.geometry.index?.count ?? item.geometry.attributes.position.count), 0);
    const positions = new Float32Array(numVertices * 3);
    const normals = new Float32Array(numVertices * 3);
    const uvs = new Float32Array(numVertices * 2);
    const colors = material.vertexColors ? new Float32Array(numVertices * 3) : null;
    const indices = numVertices > 65535 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
    let baseVertex = 0;
    let baseIndex = 0;

    for (const instance of meshes) {
      const geometry = instance.geometry;
      const p = geometry.attributes.position;
      const n = geometry.attributes.normal;
      const uv = geometry.attributes.uv;
      normalMatrix.getNormalMatrix(instance.matrixWorld);
      for (let i = 0; i < p.count; i += 1) {
        const vertex = baseVertex + i;
        position.fromBufferAttribute(p, i).applyMatrix4(instance.matrixWorld);
        normal.fromBufferAttribute(n, i).applyNormalMatrix(normalMatrix);
        position.toArray(positions, vertex * 3);
        normal.toArray(normals, vertex * 3);
        uvs[vertex * 2] = uv.getX(i);
        uvs[vertex * 2 + 1] = uv.getY(i);
        if (colors) {
          const tint = mergedTint ? instance.material.color : null;
          const lighting = material.isMeshPhongMaterial ? applyAccent(lights, position, normal) : [1, 1, 1];
          colors[vertex * 3] = lighting[0] * (tint?.r ?? 1);
          colors[vertex * 3 + 1] = lighting[1] * (tint?.g ?? 1);
          colors[vertex * 3 + 2] = lighting[2] * (tint?.b ?? 1);
        }
      }
      const index = geometry.index;
      const indexCount = index?.count ?? p.count;
      for (let i = 0; i < indexCount; i += 1) indices[baseIndex + i] = (index ? index.getX(i) : i) + baseVertex;
      baseVertex += p.count;
      baseIndex += indexCount;
    }

    const combined = new THREE.BufferGeometry();
    combined.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    combined.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    combined.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    if (colors) combined.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    combined.setIndex(new THREE.BufferAttribute(indices, 1));
    combined.computeBoundingSphere();
    const mesh = new THREE.Mesh(combined, material);
    mesh.renderOrder = meshes[0].renderOrder;
    result.add(mesh);
  }
  return result;
}
