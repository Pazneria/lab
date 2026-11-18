export const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
export const mix = (a, b, f) => a + (b - a) * f;
export function smooth(a, b, value) {
  const t = clamp((value - a) / (b - a));
  return t * t * (3 - 2 * t);
}

export function seeded(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let v = Math.imul(state ^ state >>> 15, state | 1);
    v ^= v + Math.imul(v ^ v >>> 7, v | 61);
    return ((v ^ v >>> 14) >>> 0) / 4294967296;
  };
}

export const between = (random, a, b) => mix(a, b, random());
export const pick = (random, values) => values[Math.floor(random() * values.length)];

export const STATION = Object.freeze({
  left: -6.85, right: 4.45, back: 0.02, front: 5.52, wall: 0.28,
  floor: 0.446, eaves: 3.36, ridge: 4.85, door: -0.47, doorWidth: 1.22,
  partition: -2.98, apronLeft: -7.22, apronRight: 4.89, apronFront: 6.06
});
export const PLATFORM = Object.freeze({
  left: -13.12, right: 14.25, track: -3.84, inside: 0.26, top: 0.462
});
export const CROSSING = Object.freeze({
  x: 10.65, half: 1.11, start: -3.27, near: -4.11, far: -6.28, foot: -7.24, top: 0.231
});
export const SPAWN = Object.freeze({ x: 5.65, z: 14.60, yaw: 0.593, pitch: -0.015 });
export const PLAYER_RADIUS = 0.245;
export const STEP_HEIGHT = 0.232;
export const EYE_HEIGHT = 1.67;
export const WORLD_LIMIT = Object.freeze({ left: -50, right: 52, back: -46, front: 49 });

const approach = [[10.3, 21], [7.4, 17.4], [5.65, 14.6], [3.15, 12], [0.55, 9.8], [-0.49, 7.58], [-0.47, 6.25]];
const woodland = [[3.7, 12.48], [8.2, 12.94], [13.3, 15.36], [18.5, 13.10], [22.95, 8.66], [24.07, 3.25], [23.41, -2.07], [22.35, -7.83], [18.39, -11.86], [14.13, -12.8], [11.50, -10.77], [10.65, -7.17]];
const sidePath = [[13.2, 15.3], [13.5, 10.5], [13.74, 6.34], [14.35, 2.9], [15.30, -.30], [15.50, -1.99]];

function splinePoints(points) {
  const result = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    for (let j = 0; j < 5; j++) {
      const t = j / 5;
      const t2 = t * t;
      const t3 = t * t * t;
      result.push([0, 1].map(k => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t +
        (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 +
        (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3)));
    }
  }
  result.push(points[points.length - 1]);
  return result;
}

export const routes = [approach, woodland, sidePath].map(splinePoints);
const trailSegments = routes.flatMap(route => route.slice(1).map(([x2, z2], i) => {
  const [x, z] = route[i];
  const dx = x2 - x;
  const dz = z2 - z;
  return { x, z, dx, dz, lengthSq: dx * dx + dz * dz };
}));

export function trailDistance(x, z) {
  let closest = 145;
  for (const s of trailSegments) {
    const rx = x - s.x;
    const rz = z - s.z;
    if (Math.abs(rx) > 13 || Math.abs(rz) > 13) continue;
    const t = clamp((rx * s.dx + rz * s.dz) / s.lengthSq);
    closest = Math.min(closest, (rx - t * s.dx) ** 2 + (rz - t * s.dz) ** 2);
  }
  return Math.sqrt(closest);
}

export function trackCenter(x) {
  const far = Math.max(0, Math.abs(x) - 22);
  return -5.29 + (x > 0 ? 0.0052 : -0.0049) * far * far;
}

export function terrainHeight(x, z) {
  const undulation = 0.24 * Math.sin(x * 0.28 + z * 0.12) +
    0.24 * Math.sin(z * 0.23 - x * 0.09) + 0.11 * Math.cos(z * 0.51 - x * 0.43);
  const opening = smooth(8, 21, Math.hypot(x * 0.78, z - 1.5));
  const track = smooth(2.0, 4.5, Math.abs(z - trackCenter(x)));
  const outskirts = 0.86 * smooth(23, 52, Math.hypot(x * 0.88, z));
  const ridge = 0.58 * Math.exp(-((x - 28) ** 2 / 200 + (z + 10) ** 2 / 110));
  return 0.012 + (undulation * opening + outskirts + ridge) * track;
}

export function walkingSurface(x, z) {
  const ground = terrainHeight(x, z);
  const s = STATION;
  const p = PLATFORM;
  const c = CROSSING;

  if (Math.abs(x - c.x) <= c.half && z <= c.start && z >= c.foot) {
    if (z >= c.near) return mix(c.top, p.top, (z - c.near) / (c.start - c.near));
    if (z <= c.far) return mix(ground, c.top, (z - c.foot) / (c.far - c.foot));
    return c.top;
  }
  if (x >= p.left && x <= p.right && z >= p.track && z <= p.inside) return p.top;
  if (x >= s.apronLeft && x <= s.apronRight && z >= 0.0 && z <= s.apronFront) return s.floor;
  if (Math.abs(x - s.door) <= 1.07 && z > s.apronFront && z <= 6.80) {
    return z <= 6.43 ? 0.292 : 0.148;
  }
  if (x >= p.right && x <= 15.16 && z >= -2.83 && z <= -1.16) {
    return x <= 14.69 ? 0.308 : 0.154;
  }
  if (z >= trackCenter(x) - 1.27 && z <= trackCenter(x) + 1.27) return Math.max(0.094, ground);
  return ground;
}

export class CollisionWorld {
  constructor() {
    this.cells = new Map();
  }

  add(shape, left, right, back, front) {
    for (let x = Math.floor(left / 3); x <= Math.floor(right / 3); x++) {
      for (let z = Math.floor(back / 3); z <= Math.floor(front / 3); z++) {
        const name = x + ',' + z;
        if (!this.cells.has(name)) this.cells.set(name, []);
        this.cells.get(name).push(shape);
      }
    }
  }

  box(x, z, width, depth) {
    const shape = { left: x - width / 2, right: x + width / 2, back: z - depth / 2, front: z + depth / 2 };
    this.add(shape, shape.left - PLAYER_RADIUS, shape.right + PLAYER_RADIUS,
      shape.back - PLAYER_RADIUS, shape.front + PLAYER_RADIUS);
  }

  circle(x, z, radius) {
    const shape = { x, z, radius };
    const border = radius + PLAYER_RADIUS;
    this.add(shape, x - border, x + border, z - border, z + border);
  }

  blocks(x, z) {
    const limits = WORLD_LIMIT;
    if (x < limits.left || x > limits.right || z < limits.back || z > limits.front) return true;
    const local = this.cells.get(Math.floor(x / 3) + ',' + Math.floor(z / 3));
    if (!local) return false;
    for (const shape of local) {
      if (shape.radius !== undefined) {
        if ((x - shape.x) ** 2 + (z - shape.z) ** 2 < (shape.radius + PLAYER_RADIUS) ** 2) return true;
      } else {
        const dx = x - clamp(x, shape.left, shape.right);
        const dz = z - clamp(z, shape.back, shape.front);
        if (dx * dx + dz * dz < PLAYER_RADIUS ** 2) return true;
      }
    }
    return false;
  }
}

export function buildStationCollision(world) {
  const s = STATION;
  for (const z of [s.back, s.front]) {
    const a = s.door - s.doorWidth / 2;
    const b = s.door + s.doorWidth / 2;
    world.box((s.left + a) / 2, z, a - s.left, s.wall);
    world.box((s.right + b) / 2, z, s.right - b, s.wall);
  }
  for (const x of [s.left, s.right]) world.box(x, (s.back + s.front) / 2, s.wall, s.front - s.back);
  world.box(s.partition, (s.back + s.front) / 2, 0.15, s.front - s.back);
  for (const x of [-7.34, -3.06, 1.29, 5.68]) world.circle(x, -2.87, 0.125);
  world.box(3.74, 2.67, 0.58, 1.86);
  world.box(2.77, -0.56, 1.68, 0.51);
  world.box(3.78, -0.29, .95, .23);
  world.box(-7.55, -0.68, 1.65, 0.51);
  world.box(8.10, -0.55, 1.55, 0.57);
  world.circle(10.10, 0.50, 0.135);
  world.circle(11.98, 0.50, 0.135);
  world.box(13.45, -0.39, 0.22, 1.72);
  for (const x of [9.38, 11.92]) {
    world.box(x, -3.655, .11, .95);
    world.box(x, -6.835, .11, 1.17);
  }
  world.circle(11.9, -8.55, 0.14);
  world.circle(4.65, 11.37, 0.16);
  world.circle(7.35, -7.52, 0.145);
  world.box(17.04, -10.56, 2.22, .65);
}

export function slide(world, pose, dx, dz) {
  function canStep(x, z) {
    return !world.blocks(x, z) && walkingSurface(x, z) <= pose.y + STEP_HEIGHT;
  }
  const startX = pose.x;
  const startZ = pose.z;
  if (canStep(startX + dx, startZ + dz)) {
    pose.x += dx;
    pose.z += dz;
    return;
  }
  if (canStep(startX + dx, startZ)) pose.x += dx;
  if (canStep(pose.x, startZ + dz)) pose.z += dz;
}

export function zoneAt(x, z) {
  const s = STATION;
  if (x > s.left && x < s.right && z > 0.15 && z < s.front - 0.10) return 'Waiting room';
  if (Math.abs(x - CROSSING.x) < 1.45 && z < -3.36 && z > -7.3) return 'Pedestrian crossing';
  if (x > PLATFORM.left && x < PLATFORM.right && z < 0.26 && z > PLATFORM.track) return 'Platform';
  if (z < -6.6 || x > 16 || (x > 9 && z > 12)) return 'Woodland footpath';
  return 'Station approach';
}
