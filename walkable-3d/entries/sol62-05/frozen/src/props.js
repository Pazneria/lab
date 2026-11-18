import * as THREE from '../vendor/three.module.js';

const cupProfile = [
  [0, 0.022], [0.81, 0.022], [0.88, 0], [0.97, 0.008], [1, 0.06],
  [1.06, 0.95], [1.045, 0.989], [0.968, 1], [0.934, 0.943],
  [0.89, 0.15], [0.83, 0.102], [0, 0.102],
].map(([r, y]) => new THREE.Vector2(r, y));
const cupBody = new THREE.LatheGeometry(cupProfile, 22);
const cupRim = new THREE.RingGeometry(0.968, 1.047, 22).rotateX(-Math.PI / 2);

export function mug(p, m, color, x, y, z, yaw = 0, scale = 1) {
  const q = p.at(x, y, z, yaw);
  const r = 0.048 * scale;
  const h = 0.101 * scale;
  q.primitive(color, cupBody, 0, 0, 0, r, h, r);
  q.primitive(m.silver, cupRim, 0, h, 0, r, 1, r);
  q.cyl(m.boltDark, 0, h * 0.76, 0, r * 0.92, 0.0025 * scale, 20);
  const handle = [];
  for (let i = 0; i <= 9; i++) {
    const a = Math.PI * (0.5 - i / 9);
    handle.push([r * Math.cos(a) * 0.66 + r * 0.86, h * 0.55 + r * Math.sin(a) * 0.65, 0]);
  }
  q.line(color, handle, 0.0082 * scale, 8);
}

export function caseBox(p, m, x, y, z, w, h, d, color, yaw = 0, hardware = m.zinc) {
  const q = p.at(x, y, z, yaw);
  q.box(m.ink, 0, 0.032, 0, w, 0.064, d);
  q.box(color, 0, h * 0.478, 0, w - 0.020, h * 0.86, d - 0.025);
  q.box(color, 0, h * 0.92, 0, w + 0.023, h * 0.17, d + 0.014);
  q.box(m.seam, 0, h * 0.831, d / 2 + 0.002, w + 0.021, 0.011, 0.012);
  for (const s of [-1, 1]) {
    q.box(hardware, s * (w / 2 - 0.085), h * 0.80, d / 2 + 0.017, 0.045, 0.080, 0.029);
    q.box(m.black, s * (w / 2 - 0.085), h * 0.778, d / 2 + 0.035, 0.036, 0.050, 0.017);
    q.box(hardware, s * (w / 2 - 0.029), h - 0.030, d / 2 - 0.020, 0.049, 0.065, 0.054);
  }
  if (w > 0.34) {
    q.box(m.ink, 0, h * 0.60, d / 2 + 0.012, w * 0.29, 0.05, 0.022);
    q.rod(m.tread, [-w * 0.117, h * 0.59, d / 2 + 0.041], [w * 0.117, h * 0.59, d / 2 + 0.041], 0.013, 8);
  }
  return q;
}

export function clothSurface(p, material, w, d, height, nx = 34, nz = 20) {
  const positions = [];
  const uvs = [];
  const indices = [];
  for (let j = 0; j <= nz; j++) {
    for (let i = 0; i <= nx; i++) {
      const u = i / nx;
      const v = j / nz;
      const x = (u - 0.5) * w;
      const z = (v - 0.5) * d;
      positions.push(x, height(x, z), z);
      uvs.push(u * 1.5, v * 1.5);
      if (i === nx || j === nz) continue;
      const a = j * (nx + 1) + i;
      indices.push(a, a + nx + 1, a + 1, a + 1, a + nx + 1, a + nx + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  p.primitive(material, geometry, 0, 0, 0, 1, 1, 1);
}

export function contact(p, m, x, z, w, d, y = 0.005, rotation = 0) {
  p.at(x, y, z, rotation).plane(m.floorShadow, 0, 0, 0, w, d, -Math.PI / 2);
}

export function grip(p, m, x, y, z, w, type = m.ink) {
  for (const end of [-1, 1]) {
    p.box(m.zinc, x + end * w / 2, y, z, 0.03, 0.037, 0.036);
    p.rod(m.zinc, [x + end * w / 2, y, z], [x + end * w / 2, y, z + 0.033], 0.008);
  }
  p.rod(type, [x - w / 2, y, z + 0.034], [x + w / 2, y, z + 0.034], 0.011);
}
