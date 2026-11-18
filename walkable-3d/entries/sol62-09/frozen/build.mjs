import * as THREE from './vendor/three.module.min.js';
import { drawPlacards, makePalette } from './materials.mjs';

export const TOP = [-Math.PI / 2, 0, 0];
export const CEILING = [Math.PI / 2, 0, 0];
export const FRONT = [0, Math.PI, 0];
export const WEST = [0, Math.PI / 2, 0];
export const EAST = [0, -Math.PI / 2, 0];

const yAxis = new THREE.Vector3(0, 1, 0);
const basis = {
  x: new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2),
  y: new THREE.Quaternion(),
  z: new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2),
};

export class BayBuilder {
  constructor(scene) {
    this.scene = scene;
    this.palette = makePalette();
    this.geometries = new Map();
    this.groups = new Map();
    this.signs = [];
    this.zone = 'floor';
    this.unitBox = this.cached('box', () => new THREE.BoxGeometry());
    this.unitPlane = this.cached('plane', () => new THREE.PlaneGeometry());
  }

  region(name) {
    this.zone = name;
  }

  cached(key, create) {
    if (!this.geometries.has(key)) this.geometries.set(key, create());
    return this.geometries.get(key);
  }

  add(mat, geometry, xyz, size = [1, 1, 1], options = {}) {
    const surface = this.palette[mat];
    if (!surface) throw new Error('Missing surface ' + mat);
    const { material, pigment } = surface;
    const cast = options.cast ?? (!material.transparent && !material.isMeshBasicMaterial);
    const receive = options.receive ?? (!material.transparent && !material.isMeshBasicMaterial);
    const order = options.order ?? 0;
    const key = [this.zone, material.name || mat, Number(cast), Number(receive), order].join('/');
    let group = this.groups.get(key);
    if (!group) {
      group = { key, material, cast, receive, order, parts: [], vertices: 0, indices: 0 };
      this.groups.set(key, group);
    }
    const position = new THREE.Vector3(...xyz);
    const quaternion = options.quaternion ??
      (options.rotation ? new THREE.Quaternion().setFromEuler(new THREE.Euler(...options.rotation)) : new THREE.Quaternion());
    const matrix = new THREE.Matrix4().compose(position, quaternion, new THREE.Vector3(...size));
    const tone = options.tone ?? 1;
    const color = new THREE.Color(options.tint ?? 0xffffff).multiply(pigment).multiplyScalar(tone);
    group.parts.push({ geometry, matrix, color, uv: options.uv, crop: options.crop });
    group.vertices += geometry.attributes.position.count;
    group.indices += geometry.index?.count ?? geometry.attributes.position.count;
  }

  box(mat, pos, size, options = {}) {
    this.add(mat, this.unitBox, pos, size, options);
  }

  bevel(mat, pos, [w, h, d], edge, options = {}) {
    const radius = Math.min(edge, w * 0.21, h * 0.21, d * 0.40);
    const geometry = this.cached(['bevel', w, h, d, radius].join(':'), () => {
      const shape = new THREE.Shape();
      const x = w / 2 - radius, y = h / 2 - radius;
      shape.moveTo(-x, -y);
      shape.lineTo(x, -y);
      shape.lineTo(x, y);
      shape.lineTo(-x, y);
      shape.closePath();
      const depth = d - 2 * radius;
      const g = new THREE.ExtrudeGeometry(shape, {
        depth, steps: 1, bevelEnabled: true, bevelSegments: 1, bevelSize: radius, bevelThickness: radius, curveSegments: 1,
      });
      g.translate(0, 0, -depth / 2);
      return g;
    });
    this.add(mat, geometry, pos, undefined, options);
  }

  plane(mat, pos, [w, h], rotation = TOP, options = {}) {
    this.add(mat, this.unitPlane, pos, [w, h, 1], { cast: false, ...options, rotation });
  }

  cylinder(mat, pos, radius, length, axis = 'y', segments = 16, options = {}) {
    const [top, bottom] = Array.isArray(radius) ? radius : [radius, radius];
    const ratio = top / bottom;
    const geometry = this.cached('cyl/' + ratio + '/' + segments, () => new THREE.CylinderGeometry(ratio, 1, 1, segments));
    this.add(mat, geometry, pos, [bottom, length, bottom], { ...options, quaternion: options.quaternion ?? basis[axis] });
  }

  turned(mat, pos, profile, axis = 'z', segments = 44, options = {}) {
    const geometry = this.cached('lathe/' + segments + '/' + profile.flat().join(','), () =>
      new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), segments));
    this.add(mat, geometry, pos, undefined, { ...options, quaternion: basis[axis] });
  }

  ring(mat, pos, inner, outer, depth, axis = 'z', segments = 44, options = {}) {
    const d = depth / 2;
    const c = Math.min(d * 0.4, (outer - inner) * 0.17, 0.024);
    this.turned(mat, pos, [
      [inner + c, -d], [outer - c, -d], [outer, -d + c], [outer, d - c],
      [outer - c, d], [inner + c, d], [inner, d - c], [inner, -d + c], [inner + c, -d],
    ], axis, segments, options);
  }

  torus(mat, pos, radius, thickness, axis = 'z', radial = 34, options = {}) {
    const geometry = this.cached(['torus', radius, thickness, radial].join(':'), () => {
      const g = new THREE.TorusGeometry(radius, thickness, 7, radial);
      g.rotateX(-Math.PI / 2);
      return g;
    });
    this.add(mat, geometry, pos, undefined, { ...options, quaternion: basis[axis] });
  }

  rod(mat, from, to, radius, segments = 10, options = {}) {
    const p = new THREE.Vector3(...from);
    const q = new THREE.Vector3(...to);
    const length = p.distanceTo(q);
    if (length < 0.0001) return;
    const quaternion = new THREE.Quaternion().setFromUnitVectors(yAxis, q.clone().sub(p).divideScalar(length));
    this.cylinder(mat, p.lerp(q, 0.5).toArray(), radius, length, 'y', segments, { ...options, quaternion });
  }

  beam(mat, from, to, thickness, depth, options = {}) {
    const p = new THREE.Vector3(...from);
    const q = new THREE.Vector3(...to);
    const length = p.distanceTo(q);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(yAxis, q.clone().sub(p).divideScalar(length));
    this.box(mat, p.lerp(q, 0.5).toArray(), [thickness, length, depth], { ...options, quaternion });
  }

  tube(mat, points, radius, segments = 20, radial = 8, options = {}) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    this.add(mat, new THREE.TubeGeometry(curve, segments, radius, radial, false), [0, 0, 0], undefined, options);
    return curve;
  }

  bolt(pos, radius = 0.032, axis = 'z', material = 'steelDull', withWasher = true) {
    if (withWasher) this.cylinder('darkSteel', pos, radius * 1.27, radius * 0.28, axis, 10, { cast: false });
    this.cylinder(material, pos, radius * 0.90, radius * 0.67, axis, 6, { cast: false });
  }

  shade(pos, size, rotation = TOP, tone = 1) {
    this.plane('shadow', pos, size, rotation, { tone, order: 3 });
  }

  sign(title, subtitle, pos, size, rotation = [0, 0, 0], scheme = 'dark') {
    this.signs.push({ title, subtitle, pos, size, rotation, scheme });
  }

  finish() {
    if (this.signs.length) {
      this.palette.placard = { material: drawPlacards(this.signs), pigment: new THREE.Color(0xffffff) };
      this.region('signage');
      for (const sign of this.signs) {
        this.plane('placard', sign.pos, sign.size, sign.rotation, { crop: sign.uv });
      }
    }
    for (const group of this.groups.values()) this.scene.add(this.bake(group));
    for (const geometry of this.geometries.values()) geometry.dispose();
    this.groups.clear();
    this.geometries.clear();
  }

  bake(group) {
    const { vertices, indices } = group;
    const position = new Float32Array(vertices * 3);
    const normal = new Float32Array(vertices * 3);
    const color = new Float32Array(vertices * 3);
    const uv = new Float32Array(vertices * 2);
    const index = vertices > 65535 ? new Uint32Array(indices) : new Uint16Array(indices);
    const p = new THREE.Vector3();
    const n = new THREE.Vector3();
    const normalMatrix = new THREE.Matrix3();
    let vertexOffset = 0;
    let indexOffset = 0;
    for (const part of group.parts) {
      const attributes = part.geometry.attributes;
      const sourceIndex = part.geometry.index;
      const vertexCount = attributes.position.count;
      normalMatrix.getNormalMatrix(part.matrix);
      for (let i = 0; i < vertexCount; i++) {
        const j = vertexOffset + i;
        p.fromBufferAttribute(attributes.position, i).applyMatrix4(part.matrix);
        n.fromBufferAttribute(attributes.normal, i).applyNormalMatrix(normalMatrix);
        p.toArray(position, j * 3);
        n.toArray(normal, j * 3);
        part.color.toArray(color, j * 3);
        let u = attributes.uv.getX(i);
        let v = attributes.uv.getY(i);
        if (part.uv) {
          u *= part.uv[0];
          v *= part.uv[1];
        }
        if (part.crop) {
          u = part.crop[0] + (part.crop[2] - part.crop[0]) * u;
          v = part.crop[1] + (part.crop[3] - part.crop[1]) * v;
        }
        uv[j * 2] = u;
        uv[j * 2 + 1] = v;
      }
      const indexCount = sourceIndex?.count ?? vertexCount;
      for (let i = 0; i < indexCount; i++) index[indexOffset++] = vertexOffset + (sourceIndex?.getX(i) ?? i);
      vertexOffset += vertexCount;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geometry.setAttribute('color', new THREE.BufferAttribute(color, 3));
    geometry.setIndex(new THREE.BufferAttribute(index, 1));
    geometry.computeBoundingSphere();
    const mesh = new THREE.Mesh(geometry, group.material);
    mesh.name = group.key;
    mesh.castShadow = group.cast;
    mesh.receiveShadow = group.receive;
    mesh.renderOrder = group.order;
    return mesh;
  }
}
