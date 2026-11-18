import * as T from '../vendor/three.module.min.js';
import { makePalette, random, between } from './art.js';
import { plan } from './layout.js';
import { kitchenShell, workroomShell, greenhouseShell, landscape } from './rooms.js';
import { kitchenFurniture } from './kitchen.js';
import { workroomFurniture } from './workroom.js';
import { greenhousePlants } from './plants.js';

const TAU = Math.PI * 2;
const unitBox = new T.BoxGeometry(1, 1, 1);
const unitPlane = new T.PlaneGeometry(1, 1);
const sphere = new T.SphereGeometry(1, 10, 6);
const sphereFine = new T.SphereGeometry(1, 20, 12);
const ico = new T.IcosahedronGeometry(1, 1);
const chip = new T.IcosahedronGeometry(1, 0);
const cylinder = new T.CylinderGeometry(1, 1, 1, 14);
const narrowCylinder = new T.CylinderGeometry(1, 1, 1, 7);
const disk = new T.CylinderGeometry(1, 1, 1, 24);
const torus = new T.TorusGeometry(1, .105, 6, 24);
const smallTorus = new T.TorusGeometry(1, .105, 5, 14);
const up = new T.Vector3(0, 1, 0);
const WHITE = new T.Color(0xffffff);

function roundedBox(w, h, d, radius) {
  const geo = new T.BoxGeometry(w, h, d, 3, 3, 3);
  const p = geo.attributes.position;
  const n = geo.attributes.normal;
  const a = new T.Vector3();
  const b = new T.Vector3();
  const rr = Math.min(radius, w * .24, h * .24, d * .24);
  const half = [w / 2, h / 2, d / 2];
  const inset = half.map(v => v - rr);
  const adjust = (value, k) => {
    if (Math.abs(value) < 1e-7) return 0;
    if (Math.abs(value) > half[k] * .75) return value;
    return Math.sign(value) * inset[k];
  };
  for (let i = 0; i < p.count; i++) {
    a.set(adjust(p.getX(i), 0), adjust(p.getY(i), 1), adjust(p.getZ(i), 2));
    b.set(
      T.MathUtils.clamp(a.x, -inset[0], inset[0]),
      T.MathUtils.clamp(a.y, -inset[1], inset[1]),
      T.MathUtils.clamp(a.z, -inset[2], inset[2]),
    );
    a.sub(b).normalize();
    n.setXYZ(i, a.x, a.y, a.z);
    a.multiplyScalar(rr).add(b);
    p.setXYZ(i, a.x, a.y, a.z);
  }
  return geo;
}

class StaticScene {
  constructor(scene, textures) {
    const { m, printNames } = makePalette(textures);
    this.scene = scene;
    this.m = m;
    this.printNames = printNames;
    this.region = 'shell';
    this.groups = new Map();
    this.geometries = new Map();
    this.rng = random(65872);
    this.dummy = new T.Object3D();
    this.authored = 0;
  }

  mesh(geometry, material, x, y, z, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0,
    tint = null, cast = true, uvRect = null, quaternion = null) {
    const mat = typeof material === 'string' ? this.m[material] : material;
    if (!mat) throw new Error('Unknown material ' + material);
    cast = cast && !mat.transparent && this.region.startsWith('kitchen');
    const key = this.region + '/' + mat.id + '/' + Number(cast);
    if (!this.groups.has(key)) this.groups.set(key, { mat, cast, meshes: [], region: this.region });
    const d = this.dummy;
    d.position.set(x, y, z);
    d.scale.set(sx, sy, sz);
    if (quaternion) d.quaternion.copy(quaternion);
    else d.rotation.set(rx, ry, rz, 'XYZ');
    d.updateMatrix();
    this.groups.get(key).meshes.push({
      g: geometry, matrix: d.matrix.clone(), color: tint === null ? WHITE : new T.Color(tint), uvRect,
    });
    this.authored++;
  }

  box(w, h, d, x, y, z, m, ry = 0, tint = null, cast = true) {
    this.mesh(unitBox, m, x, y, z, w, h, d, 0, ry, 0, tint, cast);
  }

  soft(w, h, d, x, y, z, m, ry = 0, tint = null, cast = true, r = .025) {
    const geoKey = [w, h, d, r].map(v => v.toFixed(3)).join(',');
    if (!this.geometries.has(geoKey)) this.geometries.set(geoKey, roundedBox(w, h, d, r));
    this.mesh(this.geometries.get(geoKey), m, x, y, z, 1, 1, 1, 0, ry, 0, tint, cast);
  }

  ball(x, y, z, sx, sy, sz, m, rx = 0, ry = 0, rz = 0, tint = null, cast = true, fine = false) {
    this.mesh(fine ? sphereFine : sphere, m, x, y, z, sx, sy, sz, rx, ry, rz, tint, cast);
  }

  pebble(x, y, z, sx, sy, sz, m, ry = 0, tint = null, cast = true) {
    this.mesh(Math.max(sx, sy, sz) < .10 ? chip : ico, m, x, y, z, sx, sy, sz, 0, ry, .1, tint, cast);
  }

  disc(r, h, x, y, z, m, rx = 0, ry = 0, rz = 0, tint = null, cast = true, fine = false) {
    this.mesh(fine ? disk : r < .021 ? narrowCylinder : cylinder, m, x, y, z, r, h, r, rx, ry, rz, tint, cast);
  }

  ring(r, x, y, z, m, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, cast = true) {
    this.mesh(r < .075 ? smallTorus : torus, m, x, y, z, r * sx, r * sy, r, rx, ry, rz, null, cast);
  }

  beam(a, b, w, d, m, tint = null, cast = true) {
    this.link(unitBox, a, b, w, d, m, tint, cast);
  }

  rod(a, b, r, m, endRadius = r, cast = true) {
    let geometry = r < .026 ? narrowCylinder : cylinder;
    if (endRadius !== r) {
      const taper = (endRadius / r).toFixed(2);
      const key = 'taper:' + taper;
      if (!this.geometries.has(key)) this.geometries.set(key, new T.CylinderGeometry(+taper, 1, 1, 7));
      geometry = this.geometries.get(key);
    }
    this.link(geometry, a, b, r, r, m, null, cast);
  }

  link(geometry, a, b, w, d, m, tint, cast) {
    const direction = new T.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    const length = direction.length();
    if (length < 1e-6) return;
    const rotation = new T.Quaternion().setFromUnitVectors(up, direction.multiplyScalar(1 / length));
    this.mesh(geometry, m, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2,
      w, length, d, 0, 0, 0, tint, cast, null, rotation);
  }

  tube(points, radius, m, segments = 14, sides = 6, cast = true) {
    const curve = new T.CatmullRomCurve3(points.map(p => new T.Vector3(...p)));
    this.mesh(new T.TubeGeometry(curve, segments, radius, sides), m, 0, 0, 0,
      1, 1, 1, 0, 0, 0, null, cast);
  }

  lathe(profile, m, x, y, z, sx = 1, sy = 1, sz = sx, ry = 0, cast = true, segments = 20) {
    const key = 'lathe/' + segments + '/' + JSON.stringify(profile);
    if (!this.geometries.has(key)) {
      this.geometries.set(key, new T.LatheGeometry(profile.map(([r, h]) => new T.Vector2(r, h)), segments));
    }
    this.mesh(this.geometries.get(key), m, x, y, z, sx, sy, sz, 0, ry, 0, null, cast);
  }

  plane(w, h, x, y, z, m, rx = 0, ry = 0, rz = 0, tint = null, cast = false) {
    this.mesh(unitPlane, m, x, y, z, w, h, 1, rx, ry, rz, tint, cast);
  }

  panel(a, b, c, d, m, tint = null) {
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute([...a, ...b, ...c, ...d], 3));
    g.setAttribute('uv', new T.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 1], 2));
    g.setIndex([0, 1, 2, 0, 2, 3]);
    g.computeVertexNormals();
    this.mesh(g, m, 0, 0, 0, 1, 1, 1, 0, 0, 0, tint, false);
  }

  stamp(key, w, h, x, y, z, rx = 0, ry = 0, rz = 0) {
    const i = this.printNames.indexOf(key);
    if (i < 0) throw new Error('Unknown print ' + key);
    const rect = [(i % 4) / 4 + .002, .75 - Math.floor(i / 4) / 4 + .002, .246, .246];
    this.mesh(unitPlane, 'print', x, y, z, w, h, 1, rx, ry, rz, null, false, rect);
  }

  shadow(x, z, w, d, y = .014, ry = 0) {
    this.plane(w, d, x, y, z, 'shade', -Math.PI / 2, 0, ry);
  }

  tint(amount = .17) {
    const gray = Math.round(255 * between(this.rng, 1 - amount, 1));
    return (gray << 16) | (gray << 8) | gray;
  }

  finish() {
    const point = new T.Vector3();
    const normal = new T.Vector3();
    const normalMatrix = new T.Matrix3();
    let vertices = 0;
    let triangles = 0;
    for (const { mat, cast, meshes, region } of this.groups.values()) {
      const vertexCount = meshes.reduce((sum, x) => sum + x.g.attributes.position.count, 0);
      const indexCount = meshes.reduce((sum, x) => sum + (x.g.index?.count ?? x.g.attributes.position.count), 0);
      const p = new Float32Array(vertexCount * 3);
      const n = new Float32Array(vertexCount * 3);
      const c = new Float32Array(vertexCount * 3);
      const uv = new Float32Array(vertexCount * 2);
      const buffers = vertexCount > 65535 ? new Uint32Array(indexCount) : new Uint16Array(indexCount);
      let vertex = 0;
      let index = 0;
      for (const entry of meshes) {
        const { g, matrix, color, uvRect } = entry;
        const source = g.attributes;
        const base = vertex;
        normalMatrix.getNormalMatrix(matrix);
        for (let i = 0; i < source.position.count; i++, vertex++) {
          point.fromBufferAttribute(source.position, i).applyMatrix4(matrix).toArray(p, vertex * 3);
          normal.fromBufferAttribute(source.normal, i).applyNormalMatrix(normalMatrix).toArray(n, vertex * 3);
          const tint = source.color;
          c[vertex * 3] = color.r * (tint ? tint.getX(i) : 1);
          c[vertex * 3 + 1] = color.g * (tint ? tint.getY(i) : 1);
          c[vertex * 3 + 2] = color.b * (tint ? tint.getZ(i) : 1);
          const u = source.uv?.getX(i) ?? 0;
          const v = source.uv?.getY(i) ?? 0;
          uv[vertex * 2] = uvRect ? uvRect[0] + u * uvRect[2] : u;
          uv[vertex * 2 + 1] = uvRect ? uvRect[1] + v * uvRect[3] : v;
        }
        const indices = g.index;
        const count = indices?.count ?? source.position.count;
        for (let i = 0; i < count; i++) buffers[index++] = base + (indices ? indices.getX(i) : i);
      }
      const geometry = new T.BufferGeometry();
      geometry.setAttribute('position', new T.BufferAttribute(p, 3));
      geometry.setAttribute('normal', new T.BufferAttribute(n, 3));
      geometry.setAttribute('color', new T.BufferAttribute(c, 3));
      geometry.setAttribute('uv', new T.BufferAttribute(uv, 2));
      geometry.setIndex(new T.BufferAttribute(buffers, 1));
      geometry.computeBoundingSphere();
      const piece = new T.Mesh(geometry, mat);
      piece.name = region + ' / ' + mat.name;
      piece.castShadow = cast;
      piece.receiveShadow = !mat.transparent && region.startsWith('kitchen');
      if (mat === this.m.shade) piece.renderOrder = 1;
      if (mat === this.m.halo) piece.renderOrder = 2;
      if (mat === this.m.panes) piece.renderOrder = 5;
      this.scene.add(piece);
      vertices += vertexCount;
      triangles += indexCount / 3;
    }
    return { authored: this.authored, batches: this.groups.size, vertices, triangles };
  }
}

function reflectionTexture() {
  const w = 128, h = 64;
  const pixels = new Uint8Array(w * h * 4);
  const lobe = (u, v, cx, cy, sx, sy) => {
    const dx = Math.min(Math.abs(u - cx), 1 - Math.abs(u - cx)) / sx;
    const dy = (v - cy) / sy;
    return Math.exp(-1.9 * (dx ** 3 + Math.abs(dy) ** 3));
  };
  for (let y = 0; y < h; y++) {
    const v = (y + .5) / h;
    for (let x = 0; x < w; x++) {
      const u = (x + .5) / w;
      const base = 47 + 34 * Math.sin(v * Math.PI) + 18 * v;
      const sky = lobe(u, v, .72, .67, .067, .125)
        + .50 * lobe(u, v, .16, .65, .045, .112);
      const lantern = lobe(u, v, .43, .73, .036, .056);
      const i = (y * w + x) * 4;
      pixels[i] = Math.min(255, base + 121 * sky + 127 * lantern);
      pixels[i + 1] = Math.min(255, base + 135 * sky + 91 * lantern);
      pixels[i + 2] = Math.min(255, base + 136 * sky + 43 * lantern);
      pixels[i + 3] = 255;
    }
  }
  const map = new T.DataTexture(pixels, w, h, T.RGBAFormat, T.UnsignedByteType);
  map.colorSpace = T.SRGBColorSpace;
  map.mapping = T.EquirectangularReflectionMapping;
  map.minFilter = map.magFilter = T.LinearFilter;
  map.needsUpdate = true;
  return map;
}

function lights(scene) {
  scene.add(new T.HemisphereLight(0xe1eae1, 0xa38d70, 1.75));
  const fill = new T.DirectionalLight(0xd4e7ed, .65);
  fill.position.set(2.4, 7.2, -5.7);
  scene.add(fill);

  const broadSky = new T.SpotLight(0xcce6e8, 52, 14, 1.03, .66, 2);
  broadSky.position.set(4.16, 4.33, -4.19);
  broadSky.target.position.set(.25, .31, -3.80);
  scene.add(broadSky, broadSky.target);

  const kitchenLamp = new T.SpotLight(0xffd29a, 53, 8.4, 1.06, .69, 2);
  kitchenLamp.position.set(-2.25, 2.56, 1.92);
  kitchenLamp.target.position.set(-3.0, 0, 1.43);
  kitchenLamp.castShadow = true;
  kitchenLamp.shadow.mapSize.set(1024, 1024);
  kitchenLamp.shadow.camera.near = .22;
  kitchenLamp.shadow.camera.far = 8.4;
  kitchenLamp.shadow.bias = -.00022;
  kitchenLamp.shadow.normalBias = .026;
  scene.add(kitchenLamp, kitchenLamp.target);

  const points = [
    [0xffb467, 10, 4.25, -.36, 2.03, .81],
    [0xff893e, 1.35, 1.8, -3.54, .42, -.31],
    [0xffd5a8, 15, 5.55, -3.36, 2.48, -4.00],
    [0x91e7d1, 2.5, 2.75, -3.46, 1.31, -2.24],
  ];
  for (const [color, intensity, distance, x, y, z] of points) {
    const light = new T.PointLight(color, intensity, distance, 2);
    light.position.set(x, y, z);
    scene.add(light);
  }
}

export function makeScene({ textures = true } = {}) {
  const scene = new T.Scene();
  scene.background = new T.Color(0xb8cdc6);
  scene.fog = new T.FogExp2(0xc0d2c8, .043);
  scene.environment = reflectionTexture();
  scene.environmentIntensity = .61;
  const art = new StaticScene(scene, textures);

  art.region = 'kitchen architecture';
  kitchenShell(art, plan);
  art.region = 'kitchen objects';
  kitchenFurniture(art, plan);
  art.region = 'workroom architecture';
  workroomShell(art, plan);
  art.region = 'workroom objects';
  workroomFurniture(art, plan);
  art.region = 'greenhouse architecture';
  greenhouseShell(art, plan);
  art.region = 'greenhouse plants';
  greenhousePlants(art, plan);
  art.region = 'outside';
  landscape(art, plan);
  const stats = art.finish();
  lights(scene);
  return { scene, stats };
}
