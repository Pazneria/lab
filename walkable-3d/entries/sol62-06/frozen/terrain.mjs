// Shared survey coordinates. All distances are in metres, with the entrance at +z.
export const WATER_Y = -0.24;
export const POOL = Object.freeze({ x: -2.54, z: 2.02, rx: 6.28, rz: 7.94, angle: -0.13 });
export const SUN = Object.freeze([-0.244, 0.939, 0.244]);
export const START = Object.freeze({ x: 1.96, z: 13.55, yaw: -0.15, pitch: -0.075 });
export const RADIUS = 0.24;
export const EYE = 1.66;
export const Z_MIN = -21.0;
export const Z_MAX = 19.6;

export const clamp = (value, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, value));
export const mix = (a, b, t) => a + (b - a) * t;
export const smooth = (lo, hi, value) => {
  const t = clamp((value - lo) / (hi - lo));
  return t * t * (3 - 2 * t);
};

const cosPool = Math.cos(POOL.angle);
const sinPool = Math.sin(POOL.angle);

export function bankRadius(angle) {
  return 1 + 0.055 * Math.sin(3 * angle + 0.27) + 0.037 * Math.cos(5 * angle - 0.8) +
    0.025 * Math.sin(7 * angle + 1.4) + 0.019 * Math.cos(11 * angle) +
    0.012 * Math.sin(17 * angle - 0.4);
}

export function poolPoint(angle, offset = 0) {
  const radius = bankRadius(angle) + offset / 6.65;
  const u = POOL.rx * Math.cos(angle) * radius;
  const v = POOL.rz * Math.sin(angle) * radius;
  return [POOL.x + cosPool * u - sinPool * v, POOL.z + sinPool * u + cosPool * v];
}

export function shoreDistance(x, z) {
  const dx = x - POOL.x;
  const dz = z - POOL.z;
  const u = (cosPool * dx + sinPool * dz) / POOL.rx;
  const v = (-sinPool * dx + cosPool * dz) / POOL.rz;
  return (Math.hypot(u, v) - bankRadius(Math.atan2(v, u))) * 6.65;
}

// Cross sections ordered from the back of the landing to the entrance recess.
const SECTIONS = [
  [-21, 0.1, 2.0, 3.2],
  [-20.15, -1.0, 3.8, 4.1],
  [-18.6, -3.3, 6.5, 5.35],
  [-16.3, -4.45, 7.95, 6.35],
  [-14.3, -4.95, 7.65, 6.8],
  [-12.0, -3.85, 6.96, 6.05],
  [-10.6, -2.17, 6.25, 5.13],
  [-9.45, -1.78, 5.95, 4.86],
  [-8.55, -2.2, 6.4, 5.08],
  [-7.20, -4.9, 7.8, 6.4],
  [-5.80, -7.2, 8.85, 7.75],
  [-3.10, -9.7, 9.34, 9.55],
  [0.1, -10.45, 9.85, 10.7],
  [3.15, -10.15, 10.27, 11.05],
  [6.2, -9.45, 10.1, 9.66],
  [8.6, -8.1, 9.2, 7.80],
  [10.55, -5.45, 8.35, 6.14],
  [12.25, -2.85, 6.64, 4.85],
  [13.8, -1.9, 5.15, 3.84],
  [15.9, -1.5, 4.7, 3.45],
  [17.45, -1.26, 4.25, 3.50],
  [18.65, -0.44, 3.52, 3.26],
  [19.6, 0.85, 2.9, 2.88]
];

function curve(a, b, c, d, t, dt) {
  const mb = (c[dt] - a[dt]) / (c[0] - a[0]) * (c[0] - b[0]);
  const mc = (d[dt] - b[dt]) / (d[0] - b[0]) * (c[0] - b[0]);
  const t2 = t * t;
  const t3 = t * t2;
  return (2 * t3 - 3 * t2 + 1) * b[dt] + (t3 - 2 * t2 + t) * mb +
    (-2 * t3 + 3 * t2) * c[dt] + (t3 - t2) * mc;
}

export function section(z) {
  z = clamp(z, Z_MIN, Z_MAX);
  let i = 0;
  while (i < SECTIONS.length - 2 && z > SECTIONS[i + 1][0]) i++;
  const a = SECTIONS[Math.max(0, i - 1)];
  const b = SECTIONS[i];
  const c = SECTIONS[i + 1];
  const d = SECTIONS[Math.min(i + 2, SECTIONS.length - 1)];
  const t = (z - b[0]) / (c[0] - b[0]);
  return [curve(a, b, c, d, t, 1), curve(a, b, c, d, t, 2), curve(a, b, c, d, t, 3)];
}

// The warped strata appear as both actual ledges and mineral bands in the shader.
export function stratum(x, y, z) {
  return y + 0.18 * Math.sin(x * 0.47 - z * 0.31) +
    0.095 * Math.sin(z * 1.04 + x * 0.62) + 0.020 * z;
}

export function shellPoint(z, t, profile = section(z)) {
  const [left, right, crown] = profile;
  const center = (left + right) * 0.5 + 0.21 * Math.sin(z * 0.53);
  const ca = Math.cos(t);
  const sa = Math.max(0, Math.sin(t));
  const fromCenter = Math.sign(ca) * Math.pow(Math.abs(ca), 0.62);
  const x0 = center - fromCenter * (ca >= 0 ? center - left : right - center);
  const y0 = -1.7 + (crown + 1.7) * Math.pow(sa, 0.73);
  const layer = stratum(x0, y0, z);
  const wallness = Math.pow(Math.abs(ca), 0.66);
  const bending = Math.sin(z * 0.95 + t * 5.2) * Math.cos(y0 * 0.81 - z * 0.31);
  const coarse = 0.34 * bending + 0.20 * Math.sin(z * 0.61 - layer * 2.43 + t * 8.2);
  const ledge = 0.14 * Math.sin(layer * 7.05 + 0.14 * Math.sin(z * 0.9)) +
    0.075 * Math.sin(layer * 13.68 + t * 2.3) +
    0.21 * Math.pow(Math.max(0, Math.cos(layer * 4.55 + 0.4 * Math.sin(z * 0.68))), 5);
  const roundedScallops = 0.073 * Math.sin(z * 4.56 + t * 19 + y0 * 1.08) *
    Math.sin(z * 2.54 - t * 8 + y0 * 1.92);
  const lipZ = z + 8.67 + .24 * ca - .18 * Math.sin(t * 3.9);
  const ridge = Math.exp(-((lipZ / .48) ** 2)) * (.79 + .21 * Math.sin(t * 8.2));
  const rearRidge = Math.exp(-(((lipZ + 1.39 - .14 * ca) / .43) ** 2));
  const x = x0 + Math.sign(ca) * wallness * (coarse + ledge + roundedScallops + .32 * ridge + .19 * rearRidge);
  const y = y0 + Math.pow(sa, 0.54) * (
    0.40 * Math.sin(z * 0.90 + t * 4.8) * Math.cos(x * 0.68 + z * 0.20) +
    0.24 * Math.sin(x * 1.48 + z * 1.18) + 0.11 * Math.cos(z * 3.8 - x * 2.24) - .46 * ridge - .25 * rearRidge
  );
  return [x, y, z];
}

export const FISSURE = Object.freeze({ z0: -2.7, z1: 5.0, z: 1.15, y: 10.75, x: -2.6 });
export function fissure(z) {
  const along = clamp((z - FISSURE.z0) / (FISSURE.z1 - FISSURE.z0));
  const shape = Math.pow(Math.max(0, Math.sin(Math.PI * along)), 0.86);
  const center = FISSURE.x + 0.29 * (z - FISSURE.z) +
    0.23 * Math.sin((z - FISSURE.z) * 1.3) + 0.08 * Math.sin(z * 4.8);
  const width = shape * (0.58 + 0.12 * Math.sin(z * 1.84) + 0.10 * Math.cos(z * 3.24));
  return [center, width];
}

export function roofPoint(x, z, profile = section(z)) {
  let a = 0;
  let b = Math.PI;
  for (let i = 0; i < 19; i++) {
    const angle = (a + b) * 0.5;
    if (shellPoint(z, angle, profile)[0] < x) a = angle;
    else b = angle;
  }
  const t = (a + b) * 0.5;
  return { t, position: shellPoint(z, t, profile) };
}

export function floorHeight(x, z, signedShore = shoreDistance(x, z)) {
  const ramp = 1.44 * smooth(4.9, 13.4, -z) + 0.16 * smooth(14.0, 18.1, -z);
  const porch = 0.36 * smooth(9.8, 17.8, z);
  const drift = 0.060 * Math.sin(x * 0.81 + z * 0.55) +
    0.043 * Math.cos(x * 1.46 - z * 1.17) + 0.024 * Math.sin(x * 3.30 + z * 2.66);
  const eastShelf = 0.38 * smooth(7.1, 10.0, x) * (1 - smooth(6, 10, -z));
  const farShelf = 0.25 * smooth(3.7, 7.7, x) * smooth(11.2, 16.65, -z);
  const dry = 0.17 + ramp + porch + eastShelf + farShelf + drift;
  if (signedShore >= 0) {
    return mix(WATER_Y, dry, smooth(-0.16, 1.05, signedShore));
  }
  const bedShape = 1.10 + 0.12 * Math.cos(x * 0.71 - z * 0.65) +
    0.085 * Math.sin(x * 1.37 + z * 0.68);
  return WATER_Y - (1 - Math.exp(signedShore * 0.48)) * bedShape;
}

export const ROUTE = Object.freeze([
  [1.96, 13.55], [2.05, 11.8], [3.1, 10.2], [4.75, 8.9],
  [5.76, 6.22], [6.12, 3.65], [6.25, 1.60], [5.62, -1.02],
  [4.6, -3.3], [3.28, -5.60], [2.72, -7.30], [2.15, -9.25],
  [2.30, -11.35], [2.18, -13.15], [1.40, -14.62], [0.86, -16.10]
]);

// The large objects and their conservative foot-level collision envelopes.
export const BLOCKERS = Object.freeze([
  [-6.89, -2.20, 0.95, 0.84],
  [-8.91, 0.72, 1.39, 1.50],
  [-7.94, 5.41, 1.73, 1.12],
  [8.41, 3.16, 0.93, 1.10],
  [8.63, -0.20, 1.13, 1.04],
  [8.20, 6.05, 1.34, 1.49],
  [8.45, -3.27, 1.33, 1.32],
  [6.92, -6.15, 1.04, 1.01],
  [-0.36, -7.68, 0.74, 0.80],
  [-2.53, -13.38, 1.32, 1.37],
  [-1.88, -15.65, 1.24, 1.30],
  [5.22, -14.50, 1.30, 1.11],
  [5.36, -16.02, 1.04, 1.15],
  [4.08, 14.78, 0.64, 0.69],
  [-0.45, 13.05, 0.62, 0.92],
  [0.20, 16.65, 0.70, 0.66],
  [5.83, -8.98, 0.80, 1.22],
  [3.63, 11.38, 0.14, 0.16],
  [4.38, -13.27, 0.52, 0.53]
]);

export const RAIL = Object.freeze([
  [4.70, 6.60], [4.55, 5.05], [4.53, 3.45], [4.61, 1.77], [4.47, 0.14], [4.04, -1.46]
]);

function wallX(z, targetY, right, profile) {
  let inside = Math.PI * 0.5;
  let outside = right ? Math.PI : 0;
  for (let n = 0; n < 8; n++) {
    const t = (inside + outside) * 0.5;
    if (shellPoint(z, t, profile)[1] < targetY) outside = t;
    else inside = t;
  }
  return shellPoint(z, (inside + outside) * 0.5, profile)[0];
}

export function walkable(x, z) {
  if (z < -19.05 || z > 18.78) return false;
  const shore = shoreDistance(x, z);
  if (shore < 0.52) return false;
  const profile = section(z);
  const head = floorHeight(x, z, shore) + 1.80;
  if (head > profile[2] - 0.36) return false;
  const left = Math.max(wallX(z, head, false, profile), wallX(z, head - 1.52, false, profile));
  const right = Math.min(wallX(z, head, true, profile), wallX(z, head - 1.52, true, profile));
  if (x < left + RADIUS + 0.07 || x > right - RADIUS - 0.07) return false;
  for (const [bx, bz, rx, rz] of BLOCKERS) {
    const dx = (x - bx) / (rx + RADIUS);
    const dz = (z - bz) / (rz + RADIUS);
    if (dx * dx + dz * dz < 0.94) return false;
  }
  for (let i = 1; i < RAIL.length; i++) {
    if (segmentDistance(x, z, RAIL[i - 1], RAIL[i]) < RADIUS + 0.10) return false;
  }
  return true;
}

export function segmentDistance(x, z, a, b) {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const t = clamp(((x - a[0]) * dx + (z - a[1]) * dz) / (dx * dx + dz * dz));
  return Math.hypot(x - a[0] - dx * t, z - a[1] - dz * t);
}

export function routeDistance(x, z) {
  let nearest = Infinity;
  for (let i = 1; i < ROUTE.length; i++) {
    nearest = Math.min(nearest, segmentDistance(x, z, ROUTE[i - 1], ROUTE[i]));
  }
  return nearest;
}

export function placeName(x, z) {
  if (z > 11.9) return 'Entrance recess';
  if (z > -7.9) return 'Pool chamber';
  if (z > -11.4) return 'Limestone arch';
  return 'Survey landing';
}
