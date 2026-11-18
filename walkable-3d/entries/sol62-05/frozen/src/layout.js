export const hut = Object.freeze({
  left: -4.25,
  right: 4.25,
  back: -4.68,
  front: 1.48,
  floor: 0.38,
  ceiling: 3.12,
  wall: 0.22,
  doorX: -2.06,
  doorWidth: 1.20,
  doorTop: 2.48,
  vestibuleHalf: 1.08,
  vestibuleFront: 3.62,
  vestibuleCeiling: 2.82,
  porchEnd: 4.61,
  rampEnd: 5.94,
  rampHalf: 0.79,
});

export const spawn = Object.freeze({ x: -6.2, z: 9.6, yaw: -0.52, pitch: 0.053 });
export const yard = Object.freeze({ x: 16.5, zMin: -13.6, zMax: 18.2 });

export const windows = Object.freeze({
  front: { low: 1.30, high: 2.44, start: 0.82, end: 3.67 },
  east: { low: 1.47, high: 2.38, start: -1.91, end: -0.19 },
  west: { low: 1.92, high: 2.48, start: -3.75, end: -2.91 },
  vestibule: { low: 1.44, high: 2.19, start: 2.00, end: 3.04 },
});

export const objects = Object.freeze({
  laboratory: { xmin: -2.13, xmax: 3.03, zmin: -4.60, zmax: -3.82 },
  rack: { xmin: -4.13, xmax: -3.47, zmin: -3.30, zmax: -0.98 },
  battery: { xmin: -4.13, xmax: -3.43, zmin: -4.55, zmax: -3.53 },
  bunk: { xmin: 3.06, xmax: 4.12, zmin: -4.45, zmax: -2.02 },
  galley: { xmin: 3.49, xmax: 4.13, zmin: -0.84, zmax: 1.30 },
  readingSeat: { xmin: 0.51, xmax: 2.94, zmin: 0.61, zmax: 1.31 },
  stool: { xmin: 0.89, xmax: 1.31, zmin: -3.44, zmax: -3.02 },
  instrumentCase: { xmin: -3.32, xmax: -2.64, zmin: 0.42, zmax: 1.30 },
  locker: { xmin: -3.01, xmax: -2.73, zmin: 1.79, zmax: 3.20 },
  outdoorCase: { xmin: 3.17, xmax: 4.00, zmin: 2.01, zmax: 2.63 },
  mast: { xmin: -6.21, xmax: -5.69, zmin: -0.73, zmax: -0.21 },
});

const x0 = hut.doorX - hut.doorWidth / 2;
const x1 = hut.doorX + hut.doorWidth / 2;
const v0 = hut.doorX - hut.vestibuleHalf;
const v1 = hut.doorX + hut.vestibuleHalf;
const t = hut.wall / 2;
const wallX = (x, zmin, zmax) => ({ xmin: x - t, xmax: x + t, zmin, zmax });
const wallZ = (z, xmin, xmax) => ({ xmin, xmax, zmin: z - t, zmax: z + t });

export const walls = [
  wallX(hut.left, hut.back - t, hut.front + t),
  wallX(hut.right, hut.back - t, hut.front + t),
  wallZ(hut.back, hut.left, hut.right),
  wallZ(hut.front, hut.left, x0),
  wallZ(hut.front, x1, hut.right),
  wallX(v0, hut.front, hut.vestibuleFront),
  wallX(v1, hut.front, hut.vestibuleFront),
  wallZ(hut.vestibuleFront, v0 - t, x0),
  wallZ(hut.vestibuleFront, x1, v1 + t),
  // The open leaves park against the west side, beyond the walking clearances.
  { xmin: x0 - 0.12, xmax: x0 + 0.06, zmin: 1.58, zmax: 2.46 },
  { xmin: x0 - 0.17, xmax: x0 + 0.055, zmin: 3.67, zmax: 4.69 },
  { xmin: -1.18, xmax: -1.11, zmin: 3.77, zmax: 4.66 },
  { xmin: -1.34, xmax: -1.11, zmin: 4.66, zmax: 5.43 },
  ...Object.values(objects),
];

export const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export function smooth(lo, hi, value) {
  const t = clamp((value - lo) / (hi - lo), 0, 1);
  return t * t * (3 - 2 * t);
}

export function random(seed = 70513) {
  return () => {
    seed = (Math.imul(1664525, seed) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}

export function segmentDistance(x, z, ax, az, bx, bz) {
  const dx = bx - ax;
  const dz = bz - az;
  const t = clamp(((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz), 0, 1);
  return Math.hypot(x - ax - dx * t, z - az - dz * t);
}

export const trail = [
  [-10.0, 16.1], [-7.2, 11.3], [-5.55, 8.20], [-3.70, 6.61], [-2.06, 5.65],
];

export const drifts = [
  [-8.4, 2.3, 0.98, 3.9, 1.5, 0.77],
  [-10.8, 6.6, 1.32, 3.55, 1.76, 0.62],
  [-11.3, -4.2, 1.23, 4.2, 2.05, 0.64],
  [1.4, 7.4, 0.58, 2.2, 0.95, 0.53],
  [7.85, 3.55, 0.86, 3.45, 1.54, 0.67],
  [6.37, -4.35, 1.02, 3.9, 1.52, 0.55],
  [-1.8, -8.4, 1.21, 4.65, 1.37, 0.93],
  [10.8, -8.7, 1.58, 5.0, 2.4, 0.65],
  [-2.2, 14.5, 0.57, 4.6, 1.52, 0.66],
];

export function trailDistance(x, z) {
  let distance = 100;
  for (let i = 1; i < trail.length; i++) {
    const [a, b] = trail[i - 1];
    const [c, d] = trail[i];
    distance = Math.min(distance, segmentDistance(x, z, a, b, c, d));
  }
  return distance;
}

export function wind(x, z) {
  return x * 0.62 - z * 0.83 + Math.sin((x + z) * 0.26) * 0.62
    + Math.cos(x * 0.26 - z * 0.07) * 0.35;
}

export function snowHeight(x, z) {
  let h = -0.09 + 0.13 * Math.sin(x * 0.31 + z * 0.16)
    + 0.09 * Math.cos(z * 0.41 - x * 0.13) + 0.039 * Math.sin(x * 0.83 - z * 0.46);
  for (const [cx, cz, height, length, width, angle] of drifts) {
    const dx = x - cx;
    const dz = z - cz;
    const u = (dx * Math.cos(angle) + dz * Math.sin(angle)) / length;
    const v = (-dx * Math.sin(angle) + dz * Math.cos(angle)) / width;
    if (Math.abs(u) > 3.4 || Math.abs(v) > 3.4) continue;
    const lip = v - 0.24 * Math.sin(u * 2.6) + u * u * 0.22;
    h += height * Math.exp(-u * u - lip * lip * (v > 0 ? 1.74 : 0.74));
  }
  const broad = 0.042 * Math.sin(wind(x, z) * 3.9) + 0.014 * Math.sin(wind(x, z) * 10.1);
  h += broad * (0.52 + 0.48 * Math.sin((x + z) * 0.24) ** 2);
  const way = trailDistance(x, z);
  const packing = 1 - smooth(0.31, 1.15, way);
  h = lerp(h, Math.min(h, 0.08) - 0.04, packing * 0.72);
  const nearDoor = (1 - smooth(0.76, 1.62, Math.abs(x - hut.doorX)))
    * (1 - smooth(5.56, 6.44, z)) * smooth(3.22, 3.58, z);
  h = lerp(h, -0.075 + broad * 0.18, nearDoor);
  const apron = (1 - smooth(0.0, 0.87, Math.max(Math.abs(x) - 4.22, hut.back - z, z - hut.front, 0)));
  h = lerp(h, Math.min(h, 0.14), apron * 0.84);
  // A shallow lee ridge has settled against the east and rear footings.
  const east = Math.max(0, x - hut.right);
  const rear = Math.max(0, hut.back - z);
  if (x > hut.right) {
    const along = Math.exp(-(((z + 3.45) / 1.46) ** 2));
    h += 0.30 * Math.exp(-(((east - 0.16) / 0.54) ** 2)) * along
      * (0.85 + 0.15 * Math.cos(wind(x, z) * 6.0));
  }
  if (z < hut.back) {
    const along = Math.exp(-(((x - 2.31) / 1.66) ** 2));
    h += 0.24 * Math.exp(-(((rear - 0.12) / 0.43) ** 2)) * along;
  }
  return h;
}

export function rampHeight(z) {
  const end = snowHeight(hut.doorX, hut.rampEnd) + 0.012;
  return lerp(hut.floor, end, clamp((z - hut.porchEnd) / (hut.rampEnd - hut.porchEnd), 0, 1));
}

export function floorAt(x, z) {
  if (x >= hut.left && x <= hut.right && z >= hut.back && z <= hut.front) return hut.floor;
  if (Math.abs(x - hut.doorX) < hut.vestibuleHalf && z <= hut.vestibuleFront + t
    && z >= hut.front - t) return hut.floor;
  if (z >= hut.vestibuleFront - 0.08 && z <= hut.rampEnd) {
    if (z <= hut.porchEnd && Math.abs(x - hut.doorX) <= 0.98) return hut.floor;
    if (z > 3.81 && z < 4.56 && x > hut.doorX - 1.29 && x < hut.doorX - 0.96) return 0.19;
    if (z > hut.porchEnd && Math.abs(x - hut.doorX) <= hut.rampHalf) return rampHeight(z);
  }
  return snowHeight(x, z);
}

export function zoneAt(x, z) {
  if (x > hut.left + t && x < hut.right - t && z < hut.front && z > hut.back + t) return 'LAB & QUARTERS';
  if (Math.abs(x - hut.doorX) < hut.vestibuleHalf - t && z >= hut.front && z < hut.vestibuleFront) return 'VESTIBULE';
  if (z >= hut.vestibuleFront && z < 6.18 && Math.abs(x - hut.doorX) < 1.48) return 'ENTRY DECK';
  return z < -1.8 ? 'LEE SIDE' : 'SHELTERED SNOW';
}
