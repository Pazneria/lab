import * as T from '../vendor/three.module.min.js';

const UNIT_BOX = new T.BoxGeometry();
const CYLINDERS = new Map();
const CHAMFERS = new Map();
const UNIT_PLANE = new T.PlaneGeometry(1, 1);
const UP = new T.Vector3(0, 1, 0);

function chamferBox(w, h, d, edge) {
  const key = [w, h, d, edge].map(n => n.toFixed(4)).join('/');
  if (CHAMFERS.has(key)) return CHAMFERS.get(key);
  const pos = [], normals = [], indices = [];
  const inset = [w, h, d].map(n => .5 - Math.min(.24, edge / n));
  const v0 = new T.Vector3(), v1 = new T.Vector3(), v2 = new T.Vector3();
  function face(points) {
    v0.fromArray(points[0]);
    v1.fromArray(points[1]).sub(v0);
    v2.fromArray(points[2]).sub(v0);
    v1.cross(v2).normalize();
    if (v1.dot(v0) < 0) {
      points.reverse();
      v1.negate();
    }
    const base = pos.length / 3;
    for (const p of points) {
      pos.push(...p);
      normals.push(v1.x, v1.y, v1.z);
    }
    indices.push(base, base + 1, base + 2);
    if (points.length === 4) indices.push(base, base + 2, base + 3);
  }
  for (let i = 0; i < 3; i++) {
    const j = (i + 1) % 3, k = (i + 2) % 3;
    for (const sign of [-1, 1]) {
      face([[-1,-1],[1,-1],[1,1],[-1,1]].map(([a,b]) => {
        const p = [];
        p[i] = sign * .5; p[j] = a * inset[j]; p[k] = b * inset[k];
        return p;
      }));
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 3; j++) {
      const k = 3 - i - j;
      for (const a of [-1,1]) for (const b of [-1,1]) {
        face([[i,-1],[j,-1],[j,1],[i,1]].map(([outer, end]) => {
          const p = [];
          p[i] = a * (outer === i ? .5 : inset[i]);
          p[j] = b * (outer === j ? .5 : inset[j]);
          p[k] = end * inset[k];
          return p;
        }));
      }
    }
  }
  for (const x of [-1,1]) for (const y of [-1,1]) for (const z of [-1,1]) {
    const signs = [x,y,z];
    face(signs.map((_, i) => signs.map((s, j) => s * (i === j ? .5 : inset[j]))));
  }
  const geo = new T.BufferGeometry();
  geo.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  geo.setAttribute('normal', new T.Float32BufferAttribute(normals, 3));
  geo.setIndex(indices);
  CHAMFERS.set(key, geo);
  return geo;
}

function cylinderShape(top, bottom, sides) {
  const key = [top,bottom,sides].join('/');
  if (!CYLINDERS.has(key)) CYLINDERS.set(key, new T.CylinderGeometry(top, bottom, 1, sides));
  return CYLINDERS.get(key);
}

export class Builder {
  constructor(scene) {
    this.scene = scene;
    this.zone = 'site';
    this.group = null;
    this.parts = new Map();
    this.serial = 0;
    this.position = new T.Vector3();
    this.normal = new T.Vector3();
    this.rotation = new T.Quaternion();
    this.angle = new T.Euler();
    this.scale = new T.Vector3();
    this.matrix = new T.Matrix4();
    this.normalMatrix = new T.Matrix3();
    this.tint = new T.Color();
  }

  add(geometry, material, options = {}) {
    const {
      at = [0,0,0], scale = [1,1,1], rotation = [0,0,0], quaternion,
      cast = true, receive = true, grain, tone = 1, color, shade, uv = [1,1,0,0]
    } = options;
    const name = this.group ?? this.zone;
    const key = [name, material.id, +cast, +receive].join(':');
    if (!this.parts.has(key)) this.parts.set(key, {
      name, material, cast, receive, pos: [], normals: [], tex: [], colors: [], index: []
    });
    const batch = this.parts.get(key);
    const base = batch.pos.length / 3;
    const pos = geometry.attributes.position;
    const nor = geometry.attributes.normal;
    const tex = geometry.attributes.uv;
    this.position.fromArray(at);
    this.scale.fromArray(scale);
    if (quaternion) this.rotation.copy(quaternion);
    else this.rotation.setFromEuler(this.angle.fromArray(rotation));
    this.matrix.compose(this.position, this.rotation, this.scale);
    this.normalMatrix.getNormalMatrix(this.matrix);
    this.tint.set(color ?? 0xffffff).multiplyScalar(tone);
    const sourceColor = geometry.attributes.color;
    const grainAxis = { x: 0, y: 1, z: 2 }[grain];
    const stamp = ++this.serial;
    const uShift = (stamp * .61803398875) % 1;
    const vShift = (stamp * .38196601125) % 1;
    for (let i = 0; i < pos.count; i++) {
      this.position.fromBufferAttribute(pos, i);
      this.normal.fromBufferAttribute(nor, i);
      if (grainAxis !== undefined) {
        const n = [Math.abs(this.normal.x), Math.abs(this.normal.y), Math.abs(this.normal.z)];
        const faceAxis = n[0] >= n[1] && n[0] >= n[2] ? 0 : n[1] >= n[2] ? 1 : 2;
        const across = [0,1,2].find(axis => axis !== faceAxis && axis !== grainAxis);
        const along = faceAxis === grainAxis ? 3 - across - faceAxis : grainAxis;
        const physicalLength = Math.max(.6, Math.min(3.5, scale[along] / 1.65));
        batch.tex.push(this.position.getComponent(across) + .5 + uShift,
          (this.position.getComponent(along) + .5) * physicalLength + vShift);
      } else if (tex) {
        batch.tex.push(tex.getX(i) * uv[0] + uv[2], tex.getY(i) * uv[1] + uv[3]);
      } else {
        batch.tex.push(0, 0);
      }
      const s = shade ? shade(this.position.x, this.position.y, this.position.z) : 1;
      batch.colors.push(this.tint.r * s * (sourceColor ? sourceColor.getX(i) : 1),
        this.tint.g * s * (sourceColor ? sourceColor.getY(i) : 1),
        this.tint.b * s * (sourceColor ? sourceColor.getZ(i) : 1));
      this.position.applyMatrix4(this.matrix);
      this.normal.applyNormalMatrix(this.normalMatrix);
      batch.pos.push(this.position.x, this.position.y, this.position.z);
      batch.normals.push(this.normal.x, this.normal.y, this.normal.z);
    }
    if (geometry.index) {
      for (let i = 0; i < geometry.index.count; i++) batch.index.push(base + geometry.index.getX(i));
    } else {
      for (let i = 0; i < pos.count; i++) batch.index.push(base + i);
    }
  }

  box(material, x, y, z, w, h, d, options = {}) {
    const geometry = options.edge ? chamferBox(w,h,d,options.edge) : UNIT_BOX;
    this.add(geometry, material, { ...options, at: [x,y,z], scale: [w,h,d] });
  }

  board(material, x, y, z, w, h, d, options = {}) {
    const grain = w >= h && w >= d ? 'x' : h >= d ? 'y' : 'z';
    this.box(material, x,y,z,w,h,d, { grain, edge: .005, ...options });
  }

  stick(material, from, to, w, d = w, options = {}) {
    const a = new T.Vector3(...from);
    const b = new T.Vector3(...to);
    const dir = b.clone().sub(a);
    const len = dir.length();
    const q = new T.Quaternion().setFromUnitVectors(UP, dir.normalize());
    const center = a.add(b).multiplyScalar(.5);
    this.board(material, center.x, center.y, center.z, w, len, d, { quaternion: q, grain: 'y', ...options });
  }

  cyl(material, x, y, z, radius, height, options = {}) {
    const { top = 1, bottom = 1, sides = 12, ...rest } = options;
    const geometry = cylinderShape(top, bottom, sides);
    this.add(geometry, material, { ...rest, at: [x,y,z], scale: [radius,height,radius] });
  }

  panel(material, x, y, z, w, h, rotation = [0,0,0], options = {}) {
    this.add(UNIT_PLANE, material, { ...options, at: [x,y,z], scale: [w,h,1], rotation });
  }

  wire(material, points, radius, options = {}) {
    const path = new T.CatmullRomCurve3(points.map(p => new T.Vector3(...p)), false, 'centripetal');
    const segments = options.segments ?? Math.max(10, points.length * 3);
    this.add(new T.TubeGeometry(path, segments, radius, options.sides ?? 6, false), material, options);
  }

  coil(material, x, y, z, radius, turns, options = {}) {
    const points = [];
    const steps = 21 * turns;
    const pitch = options.pitch ?? .024;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const a = t * turns * 2 * Math.PI + (options.angle ?? 0);
      const r = radius * (.75 + .25 * t) + .009 * Math.sin(2.2*a);
      points.push([x + Math.cos(a) * r, y + t * pitch + .005 * Math.sin(a*2.7), z + Math.sin(a) * r * .86]);
    }
    const a = points.at(-1);
    points.push([a[0] + .14, a[1] - .008, a[2] + .053],
      [a[0] + .31, y, a[2] + .02], [a[0] + .39, y - .003, a[2] + .11]);
    this.wire(material, points, options.radius ?? .018, { segments: steps + 10, uv: [turns * 6,1,0,0], ...options });
  }

  finish() {
    let vertices = 0, triangles = 0, batches = 0;
    for (const data of this.parts.values()) {
      const geo = new T.BufferGeometry();
      geo.setAttribute('position', new T.Float32BufferAttribute(data.pos,3));
      geo.setAttribute('normal', new T.Float32BufferAttribute(data.normals,3));
      geo.setAttribute('uv', new T.Float32BufferAttribute(data.tex,2));
      geo.setAttribute('color', new T.Float32BufferAttribute(data.colors,3));
      geo.setIndex(data.index);
      geo.computeBoundingSphere();
      const mesh = new T.Mesh(geo, data.material);
      mesh.name = data.name;
      mesh.castShadow = data.cast;
      mesh.receiveShadow = data.receive;
      this.scene.add(mesh);
      vertices += data.pos.length / 3;
      triangles += data.index.length / 3;
      batches++;
    }
    this.parts.clear();
    CHAMFERS.clear();
    return { vertices, triangles, batches };
  }
}

export function indexedSurface(positions, uvs, indices, colors) {
  const geo = new T.BufferGeometry();
  geo.setAttribute('position', new T.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new T.Float32BufferAttribute(uvs, 2));
  if (colors) geo.setAttribute('color', new T.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}
