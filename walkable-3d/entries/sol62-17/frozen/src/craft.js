import * as T from '../vendor/three.module.min.js';

const unitBox = new T.BoxGeometry(1, 1, 1);
const subdivBox = new T.BoxGeometry(1, 1, 1, 3, 3, 3);
const smallSphere = new T.SphereGeometry(1, 8, 5);
const mediumSphere = new T.SphereGeometry(1, 12, 8);
const largeSphere = new T.SphereGeometry(1, 18, 12);
const unitPlane = new T.PlaneGeometry(1, 1);
const rotation = new T.Quaternion();
const transform = new T.Matrix4();
const normalMatrix = new T.Matrix3();
const p = new T.Vector3(), n = new T.Vector3(), center = new T.Vector3();
const zero = new T.Vector3(0, 0, 0);
const one = new T.Vector3(1, 1, 1);
const up = new T.Vector3(0, 1, 0);

const vec = (xyz) => new T.Vector3(...xyz);
const orient = (angles) => new T.Quaternion().setFromEuler(new T.Euler(...angles));
const floorAngle = [-Math.PI / 2, 0, 0];
const boxUVs = (point, normal, size, grain, repeat, u0, v0) => {
  const amounts = [point.x * size[0], point.y * size[1], point.z * size[2]];
  const direction = Math.abs(normal.x) > .5 ? 0 : Math.abs(normal.y) > .5 ? 1 : 2;
  const axes = direction === 0 ? [2, 1] : direction === 1 ? [0, 2] : [0, 1];
  if (axes.includes(grain) && axes[0] !== grain) axes.reverse();
  return [amounts[axes[0]] * repeat + u0, amounts[axes[1]] * repeat + v0];
};

export class Builder {
  constructor(scene) {
    this.scene = scene;
    this.local = new T.Matrix4();
    this.batches = new Map();
    this.labels = [];
    this.order = 0;
  }

  placed(position, yaw, build) {
    const parent = this.local;
    const frame = new T.Matrix4().makeRotationY(yaw).setPosition(...position);
    this.local = new T.Matrix4().multiplyMatrices(parent, frame);
    try { build(this); }
    finally { this.local = parent; }
  }

  label(point, text) {
    this.labels.push({ point: vec(point).applyMatrix4(this.local), text });
  }

  add(geometry, material, pos, dimensions, options = {}) {
    const { angles = [0, 0, 0], quat, cast = true, receive = true, uv, bevel = 0 } = options;
    const surface = material.userData.batchSurface ?? material;
    const key = surface.uuid + '/' + cast + '/' + receive;
    let batch = this.batches.get(key);
    if (!batch) {
      batch = { material: surface, cast, receive, position: [], normal: [], uv: [], index: [], colors: [] };
      this.batches.set(key, batch);
    }
    rotation.copy(quat ?? orient(angles));
    transform.compose(pos ? vec(pos) : zero, rotation, dimensions && !bevel ? vec(dimensions) : one);
    transform.premultiply(this.local);
    normalMatrix.getNormalMatrix(transform);
    const position = geometry.attributes.position;
    const normals = geometry.attributes.normal;
    const uvs = geometry.attributes.uv;
    const index = geometry.index;
    const offset = batch.position.length / 3;
    for (let i = 0; i < position.count; i++) {
      p.fromBufferAttribute(position, i);
      n.fromBufferAttribute(normals, i);
      const coords = uv ? uv(p, n) : [uvs.getX(i), uvs.getY(i)];
      if (bevel) {
        center.copy(p).clampScalar(-1 / 6, 1 / 6);
        n.copy(p).sub(center).normalize();
        p.set(
          center.x * (dimensions[0] / 2 - bevel) * 6 + n.x * bevel,
          center.y * (dimensions[1] / 2 - bevel) * 6 + n.y * bevel,
          center.z * (dimensions[2] / 2 - bevel) * 6 + n.z * bevel,
        );
      }
      p.applyMatrix4(transform);
      n.applyMatrix3(normalMatrix).normalize();
      batch.position.push(p.x, p.y, p.z);
      batch.normal.push(n.x, n.y, n.z);
      batch.uv.push(coords[0], coords[1]);
      if (surface.vertexColors) batch.colors.push(material.color.r, material.color.g, material.color.b);
    }
    if (index) for (let i = 0; i < index.count; i++) batch.index.push(index.getX(i) + offset);
    else for (let i = 0; i < position.count; i++) batch.index.push(i + offset);
  }

  box(pos, dimensions, mat, options = {}) {
    const {
      grain = dimensions.indexOf(Math.max(...dimensions)),
      repeat = 1.22,
      bevel = 0,
    } = options;
    const u = (this.order * .331) % 1, v = (this.order++ * .719) % 1;
    this.add(bevel ? subdivBox : unitBox, mat, pos, dimensions, {
      ...options, uv: (a, b) => boxUVs(a, b, dimensions, grain, repeat, u, v),
    });
  }

  round(pos, dimensions, mat, bevel = .025, options = {}) {
    this.box(pos, dimensions, mat, { ...options, bevel: Math.min(bevel, Math.min(...dimensions) / 2 - .0005) });
  }

  ellipsoid(pos, radii, mat, options = {}) {
    const size = Math.max(...radii);
    const sphere = size < .043 ? smallSphere : size < .134 ? mediumSphere : largeSphere;
    this.add(sphere, mat, pos, radii, options);
  }

  plane(pos, size, mat, options = {}) {
    this.add(unitPlane, mat, pos, [...size, 1], { cast: false, ...options });
  }

  flat(pos, size, mat, options = {}) {
    this.plane(pos, size, mat, { angles: floorAngle, ...options });
  }

  cylinder(pos, rt, rb, height, mat, options = {}) {
    const { segments = 14 } = options;
    const g = new T.CylinderGeometry(rt, rb, height, segments);
    this.add(g, mat, pos, null, options);
    g.dispose();
  }

  rod(start, end, rad, mat, options = {}) {
    const a = vec(start), b = vec(end);
    const delta = b.clone().sub(a);
    const quat = new T.Quaternion().setFromUnitVectors(up, delta.clone().normalize());
    this.cylinder(a.lerp(b, .5).toArray(), options.top ?? rad, rad, delta.length(), mat, { ...options, quat, segments: options.segments ?? (rad < .009 ? 5 : 8) });
  }

  beam(start, end, width, depth, mat, options = {}) {
    const a = vec(start), b = vec(end);
    const delta = b.clone().sub(a);
    const quat = new T.Quaternion().setFromUnitVectors(up, delta.clone().normalize());
    this.box(a.lerp(b, .5).toArray(), [width, delta.length(), depth], mat, { ...options, quat, grain: 1 });
  }

  torus(pos, radius, wire, mat, options = {}) {
    const { sides = 28, segments = 7, arc = Math.PI * 2 } = options;
    const circumferenceSteps = Math.min(sides, radius < .053 ? 16 : radius < .16 ? 25 : 64);
    const radialSteps = Math.min(segments, wire < .010 ? 5 : 7);
    const g = new T.TorusGeometry(radius, wire, radialSteps, circumferenceSteps, arc);
    this.add(g, mat, pos, null, options);
    g.dispose();
  }

  lathe(pos, profile, mat, options = {}) {
    const g = new T.LatheGeometry(profile.map(([x, y]) => new T.Vector2(x, y)), options.segments ?? 24);
    this.add(g, mat, pos, null, options);
    g.dispose();
  }

  tube(points, rad, mat, options = {}) {
    const curve = new T.CatmullRomCurve3(points.map(vec), options.closed ?? false);
    const g = new T.TubeGeometry(curve, options.segments ?? (points.length * 3), rad, options.sides ?? 6, options.closed ?? false);
    this.add(g, mat, null, null, options);
    g.dispose();
  }

  profile(points, depth, mat, options = {}) {
    const shape = new T.Shape(points.map(([x, y]) => new T.Vector2(x, y)));
    const b = options.bevel ?? 0;
    const g = new T.ExtrudeGeometry(shape, { depth, bevelEnabled: b > 0, bevelSize: b, bevelThickness: b, bevelSegments: 1, curveSegments: 7 });
    this.add(g, mat, options.pos, null, { ...options, bevel: 0 });
    g.dispose();
  }

  sheet(nx, ny, surface, mat, options = {}) {
    const g = new T.BufferGeometry();
    const verts = [], uv = [], index = [];
    for (let y = 0; y <= ny; y++) for (let x = 0; x <= nx; x++) {
      const u = x / nx, v = y / ny;
      verts.push(...surface(u, v));
      uv.push(u * (options.repeatX ?? 1), v * (options.repeatY ?? 1));
      if (x > 0 && y > 0) {
        const c = y * (nx + 1) + x;
        if (options.flip) index.push(c - nx - 2, c - nx - 1, c - 1, c - nx - 1, c, c - 1);
        else index.push(c - nx - 2, c - 1, c - nx - 1, c - nx - 1, c - 1, c);
      }
    }
    g.setAttribute('position', new T.Float32BufferAttribute(verts, 3));
    g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
    g.setIndex(index);
    g.computeVertexNormals();
    this.add(g, mat, null, null, options);
    g.dispose();
  }

  finish() {
    let triangles = 0;
    for (const data of this.batches.values()) {
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.Float32BufferAttribute(data.position, 3));
      g.setAttribute('normal', new T.Float32BufferAttribute(data.normal, 3));
      g.setAttribute('uv', new T.Float32BufferAttribute(data.uv, 2));
      if (data.colors.length) g.setAttribute('color', new T.Float32BufferAttribute(data.colors, 3));
      g.setIndex(data.index);
      g.computeBoundingSphere();
      const mesh = new T.Mesh(g, data.material);
      mesh.castShadow = data.cast;
      mesh.receiveShadow = data.receive;
      this.scene.add(mesh);
      triangles += data.index.length / 3;
    }
    const batches = this.batches.size;
    this.batches.clear();
    return { batches, triangles };
  }
}
