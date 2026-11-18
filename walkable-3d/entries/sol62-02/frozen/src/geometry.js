import * as T from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { obstacle, toWorld } from "./navigation.js";
import { washTexture } from "./materials.js";

const axis = new T.Vector3(0, 1, 0);
const boxGeometry = new T.BoxGeometry();
const planeGeometry = new T.PlaneGeometry();
const mediumSphere = new T.SphereGeometry(1, 10, 7);
const cylinderCache = new Map();
const tubeResolution = 5;
const decalCache = new Map();
const swatches = new Map();

function tint(hex) {
  if (!swatches.has(hex)) swatches.set(hex, new T.Color(hex));
  return swatches.get(hex);
}

function cylinder(top, bottom, segments) {
  const key = [top, bottom, segments].join("/");
  if (!cylinderCache.has(key)) cylinderCache.set(key, new T.CylinderGeometry(top, bottom, 1, segments));
  return cylinderCache.get(key);
}

function parametric(fn, cols, rows) {
  const vertices = [], uv = [], triangles = [];
  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      const u = col / cols, v = row / rows;
      vertices.push(...fn(u, v));
      uv.push(u, v);
      if (row < rows && col < cols) {
        const i = row * (cols + 1) + col;
        triangles.push(i, i + cols + 1, i + 1, i + 1, i + cols + 1, i + cols + 2);
      }
    }
  }
  const geometry = new T.BufferGeometry();
  geometry.setAttribute("position", new T.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("uv", new T.Float32BufferAttribute(uv, 2));
  geometry.setIndex(triangles);
  geometry.computeVertexNormals();
  return geometry;
}

function decalMaterial(kind, color, opacity) {
  const key = [kind, color, opacity].join("/");
  if (decalCache.has(key)) return decalCache.get(key);
  const textureKey = kind + "/map";
  if (!decalCache.has(textureKey)) decalCache.set(textureKey, washTexture(kind));
  const map = decalCache.get(textureKey);
  const settings = {
    map, color, opacity, toneMapped: false, transparent: true, depthWrite: false, fog: true
  };
  if (kind !== "shadow") settings.blending = T.AdditiveBlending;
  const result = kind === "halo" ? new T.SpriteMaterial(settings) : new T.MeshBasicMaterial(settings);
  decalCache.set(key, result);
  return result;
}

export class Batch {
  constructor(parent, colliders, name, x = 0, z = 0, yaw = 0) {
    this.group = new T.Group();
    this.group.name = name;
    this.group.position.set(x, 0, z);
    this.group.rotation.y = yaw;
    parent.add(this.group);
    this.frame = { x, z, yaw };
    this.colliders = colliders;
    this.parts = new Map();
  }

  add(source, mat, x, y, z, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0, color = 0xffffff) {
    const g = source.clone();
    g.scale(sx, sy, sz);
    if (rx) g.rotateX(rx);
    if (ry) g.rotateY(ry);
    if (rz) g.rotateZ(rz);
    g.translate(x, y, z);
    if (mat.vertexColors) {
      const rgb = tint(color);
      const a = new Float32Array(g.attributes.position.count * 3);
      for (let i = 0; i < a.length; i += 3) {
        a[i] = rgb.r; a[i + 1] = rgb.g; a[i + 2] = rgb.b;
      }
      g.setAttribute("color", new T.BufferAttribute(a, 3));
    }
    if (!this.parts.has(mat)) this.parts.set(mat, []);
    this.parts.get(mat).push(g);
  }

  box(mat, x, y, z, w, h, d, color = 0xffffff, ry = 0, rz = 0, rx = 0) {
    this.add(boxGeometry, mat, x, y, z, w, h, d, rx, ry, rz, color);
  }

  orb(mat, x, y, z, w, h, d, color = 0xffffff, rz = 0, ry = 0) {
    this.add(mediumSphere, mat, x, y, z, w, h, d, 0, ry, rz, color);
  }

  cyl(mat, x, y, z, top, bottom, h, color = 0xffffff, segments = 16, ry = 0) {
    this.add(cylinder(top, bottom, segments), mat, x, y, z, 1, h, 1, 0, ry, 0, color);
  }

  lathe(mat, x, y, z, profile, color = 0xffffff, segments = 16) {
    const geo = new T.LatheGeometry(profile.map(([r, h]) => new T.Vector2(r, h)), segments);
    this.add(geo, mat, x, y, z, 1, 1, 1, 0, 0, 0, color);
    geo.dispose();
  }

  torus(mat, x, y, z, radius, thickness, orientation = "flat", color = 0xffffff, segments = 20) {
    const geo = new T.TorusGeometry(radius, thickness, 5, segments);
    this.add(geo, mat, x, y, z, 1, 1, 1, orientation === "flat" ? -Math.PI / 2 : 0,
      orientation === "side" ? Math.PI / 2 : 0, 0, color);
    geo.dispose();
  }

  rod(mat, a, b, radius, color = 0xffffff, segments = 7) {
    const from = new T.Vector3(...a), to = new T.Vector3(...b);
    const offset = to.clone().sub(from);
    const mid = from.addScaledVector(offset, .5);
    const q = new T.Quaternion().setFromUnitVectors(axis, offset.clone().normalize());
    const matrix = new T.Matrix4().compose(mid, q, new T.Vector3(1, offset.length(), 1));
    const geo = cylinder(radius, radius, segments).clone().applyMatrix4(matrix);
    this.add(geo, mat, 0, 0, 0, 1, 1, 1, 0, 0, 0, color);
    geo.dispose();
  }

  tube(mat, path, radius, color = 0xffffff, segments = 16) {
    const curve = new T.CatmullRomCurve3(path.map(xyz => new T.Vector3(...xyz)));
    const geo = new T.TubeGeometry(curve, segments, radius, tubeResolution, false);
    this.add(geo, mat, 0, 0, 0, 1, 1, 1, 0, 0, 0, color);
    geo.dispose();
  }

  panel(mat, x, y, z, w, h, rx = 0, ry = 0, color = 0xffffff, uvScale = null, rz = 0) {
    if (!uvScale) {
      this.add(planeGeometry, mat, x, y, z, w, h, 1, rx, ry, rz, color);
      return;
    }
    const geo = planeGeometry.clone(), uv = geo.attributes.uv;
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(i, uv.getX(i) * uvScale[0] + (uvScale[2] ?? 0), uv.getY(i) * uvScale[1] + (uvScale[3] ?? 0));
    }
    this.add(geo, mat, x, y, z, w, h, 1, rx, ry, rz, color);
    geo.dispose();
  }

  sheet(mat, fn, cols = 16, rows = 8, color = 0xffffff) {
    const geo = parametric(fn, cols, rows);
    this.add(geo, mat, 0, 0, 0, 1, 1, 1, 0, 0, 0, color);
    geo.dispose();
  }

  block(x, z, w, d, yaw = 0) {
    const p = toWorld(x, z, this.frame);
    this.colliders.push(obstacle(p.x, p.z, w, d, this.frame.yaw + yaw));
  }

  light(x, y, z, color, power, distance) {
    const light = new T.PointLight(color, power, distance, 2);
    light.position.set(x, y, z);
    this.group.add(light);
  }

  halo(x, y, z, size, color, opacity = .5) {
    const sprite = new T.Sprite(decalMaterial("halo", color, opacity));
    sprite.position.set(x, y, z);
    sprite.scale.setScalar(size);
    sprite.renderOrder = 3;
    this.group.add(sprite);
  }

  decal(kind, x, z, w, d, color, opacity, yaw = 0) {
    const mesh = new T.Mesh(planeGeometry, decalMaterial(kind, color, opacity));
    mesh.rotation.set(-Math.PI / 2, 0, yaw);
    mesh.position.set(x, kind === "shadow" ? .007 : .011, z);
    mesh.scale.set(w, d, 1);
    mesh.renderOrder = kind === "shadow" ? 1 : 2;
    this.group.add(mesh);
  }

  finish() {
    for (const [mat, list] of this.parts) {
      const geometry = list.length === 1 ? list[0] : mergeGeometries(list);
      if (list.length > 1) for (const part of list) part.dispose();
      const mesh = new T.Mesh(geometry, mat);
      mesh.name = mat.name;
      this.group.add(mesh);
    }
    this.parts.clear();
  }
}

export function sign(b, m, material, x, y, z, w, h, rail = 0x9b8871) {
  b.box(m.woodDark, x, y, z - .025, w + .065, h + .065, .07, rail);
  b.panel(material, x, y, z + .016, w, h);
  for (const dx of [-1, 1]) for (const dy of [-1, 1]) {
    b.cyl(m.steel, x + dx * (w / 2 - .032), y + dy * (h / 2 - .031), z + .027, .012, .012, .016, 0x9c846d, 6);
  }
}

export function paperLantern(b, m, x, y, z, scale = 1, cool = false) {
  const frame = m.black;
  const core = cool ? m.coolCore : m.amberCore;
  const profile = [[.085,-.23],[.135,-.20],[.185,-.14],[.204,-.07],[.209,0],[.204,.07],[.184,.15],[.135,.21],[.087,.23]];
  b.lathe(core, x, y, z, profile.map(([r,h]) => [r * scale, h * scale]), 0xffffff, 18);
  for (let i = 0; i < profile.length; i++) {
    const [r, dy] = profile[i];
    b.torus(i === 0 || i === profile.length - 1 ? frame : m.woodDark, x, y + dy * scale, z,
      (r + .001) * scale, .004 * scale, "flat", 0xc08e6a, 18);
  }
  for (const dy of [-.24, .24]) b.cyl(frame, x, y + dy * scale, z, .09 * scale, .09 * scale, .032 * scale, 0x85776a);
  b.rod(frame, [x, y + .24 * scale, z], [x, y + .39 * scale, z], .009);
  b.rod(m.wood, [x, y - .25 * scale, z], [x, y - .35 * scale, z], .013, 0xa87a45);
  b.halo(x, y, z, .88 * scale, cool ? 0x6edcd0 : 0xffa654, cool ? .30 : .37);
}

export function canopy(b, m, options) {
  const {w, back, front, high, low, fabric, steel = false, scallop = .034, ridged = .1, lean = 0} = options;
  const frame = steel ? m.black : m.woodDark;
  const point = (u, v) => {
    const x = (u - .5) * w;
    const sag = Math.sin(Math.PI * v) * (.055 + .021 * Math.sin(u * 12 * Math.PI));
    const ridge = Math.sin(v * Math.PI) * ridged;
    const crown = Math.sin(u * Math.PI) * .05 + (u - .5) * lean;
    return [x, high + (low - high) * v + ridge - sag + crown, back + (front - back) * v];
  };
  b.sheet(fabric, point, 42, 14);
  b.decal("shadow",0,(back+front)*.5,w+.36,front-back+.86,0x23202a,.27);
  for (const u of [.012, .167, .333, .50, .667, .833, .988]) {
    const path = Array.from({length: 7}, (_, i) => {
      const v = point(u, i / 6); v[1] -= .014;
      return v;
    });
    b.tube(frame, path, .017, 0xc6af90, 10);
  }
  b.sheet(fabric, (u, v) => {
    const [x, y, z] = point(u, 1);
    return [x, y - v * (.19 + (1 - Math.cos(u * Math.PI * 14)) * scallop), z + .015 + Math.sin(u * Math.PI * 14) * .024 * v];
  }, 56, 3);
  for (const u of [.025, .975]) {
    const [x1, y1] = point(u, .05);
    const [x2, y2] = point(u, .86);
    const z1 = back + .15, z2 = front - .36;
    b.box(frame, x1, y1 / 2, z1, .09, y1, .10, 0xc9a381);
    b.box(frame, x2, y2 / 2, z2, .073, y2, .073, 0xc9a381);
    b.box(m.steel, x2, .035, z2, .14, .07, .14, 0x716b5b);
    b.rod(frame, [x2, y2 - .5, z2], [x2, y2 - .12, z2 - .50], .025, 0xc7a58a);
    b.block(x1, z1, .12, .12);
    b.block(x2, z2, .105, .105);
  }
  b.rod(frame, [-w / 2, low - .008 - lean / 2, front - .04],
    [w / 2, low - .008 + lean / 2, front - .04], .024, 0xb09d83);
}

export function bowl(b, m, x, y, z, radius = .15, color = 0xf2e4c9) {
  const p = [[0,0],[.37,.01],[.47,.06],[.70,.14],[.91,.31],[1,.48],[.98,.51],[.92,.49],[.82,.30],[.64,.17],[.2,.095],[0,.095]];
  b.lathe(m.enamel, x, y, z, p.map(([r,h]) => [r * radius,h * radius]), color, 16);
  b.torus(m.enamel, x, y + radius * .49, z, radius * .981, .005, "flat", 0xaabebc, 16);
}

export function crate(b, m, x, y, z, w, h, d, trim = 0xe4b282, tilted = 0) {
  b.box(m.woodDark, x, y + .024, z, w, .048, d, trim, tilted);
  const c = Math.cos(tilted), s = Math.sin(tilted);
  const coord = (dx,dz) => [x + dx * c + dz * s, z - dx * s + dz * c];
  for (const a of [-1, 1]) {
    for (const e of [-1, 1]) {
      const [px,pz] = coord(a * (w / 2 - .027), e * (d / 2 - .029));
      b.box(m.woodDark, px, y + h / 2, pz, .061, h, .060, 0xc9ab7d, tilted);
    }
    const [fx,fz] = coord(0, a * (d / 2 - .014));
    const [sx,sz] = coord(a * (w / 2 - .015), 0);
    for (let j = 0; j < 3; j++) {
      const yy = y + (j + .5) * h / 3;
      b.box(m.wood, fx, yy, fz, w, h / 3 - .012, .026, j === 0 ? 0xb39376 : trim, tilted);
      b.box(m.wood, sx, yy, sz, .026, h / 3 - .012, d, trim, tilted);
    }
  }
}
