export const DECK = 1.46;
export const WATER = 0;
export const SHOP = { minX: -6.15, maxX: 1.84, back: -5.82, front: 1.23, eaves: 4.26, ridge: 6.03 };
SHOP.center = (SHOP.minX + SHOP.maxX) / 2;
export const DOOR = { x: SHOP.center, width: 2.19, height: 2.42 };
export const BOARDWALK = { minX: -6.91, maxX: 3.06, minZ: 1.16, maxZ: 4.04 };
export const PIER = { minX: -2.32, maxX: 0.25, minZ: 3.99, maxZ: 12.96 };
export const LANDING = { minX: -2.72, maxX: .67, minZ: 11.15, maxZ: 13.19 };
export const STAIRS = { minX: 3.01, maxX: 5.54, minZ: 1.8, maxZ: 3.62, count: 7, bottom: .26 };
export const MAT = { minX: 5.47, maxX: 6.39, minZ: 1.80, maxZ: 3.62, height: .30 };
export const BOAT = { x: 7.74, z: 6.55, yaw: -.32 };
export const SPAWN = { x: -1.02, z: 12.70, yaw: .319, pitch: -.075 };

export const clamp = (x, low, high) => Math.min(high, Math.max(low, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export function smoothstep(a, b, x) {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}
export function rng(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let x = Math.imul(state ^ (state >>> 15), state | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function coastX(z) {
  return 4.25 + .163 * z + .30 * Math.sin(z * .52) + .49 * Math.max(0, z - 8.4);
}

export function shoreDistance(x, z) {
  const east = (x - coastX(z)) * .94;
  const north = (-z - 9.55 + .84 * Math.sin(x * .285)) * .88;
  return Math.max(east, north);
}

export function terrainHeight(x, z) {
  const d = shoreDistance(x, z);
  const ripple = (.027 * Math.sin(x * 2.4 + z * .66) + .019 * Math.cos(z * 2.1 - x * .93))
    * smoothstep(.15, 2.5, Math.abs(d));
  if (d < 0) return -.014 - .92 * (1 - Math.exp(d / 2.6)) + ripple;
  const highBank = smoothstep(7.6, 15.0, d) * (1.06 + .33 * Math.sin(z * .65 + x * .19));
  return .014 + .128 * (1 - Math.exp(-d / .76)) + .78 * (1 - Math.exp(-d / 5.8))
    + highBank + ripple;
}

export const rectContains = (r, x, z) => x >= r.minX && x <= r.maxX && z >= r.minZ && z <= r.maxZ;

export function stairsHeight(x) {
  const t = clamp((x - STAIRS.minX) / (STAIRS.maxX - STAIRS.minX), 0, 1);
  const step = clamp(Math.floor(t * STAIRS.count), 0, STAIRS.count - 1);
  return lerp(DECK, STAIRS.bottom, step / (STAIRS.count - 1));
}

const SHOP_FLOOR = { minX: SHOP.minX, maxX: SHOP.maxX, minZ: SHOP.back, maxZ: SHOP.front + .025 };

export function floorAt(x, z) {
  if (rectContains(SHOP_FLOOR, x, z) || rectContains(BOARDWALK, x, z)
    || rectContains(PIER, x, z) || rectContains(LANDING, x, z)) return DECK;
  if (rectContains(STAIRS, x, z)) return stairsHeight(x);
  if (rectContains(MAT, x, z)) return MAT.height;
  if (x < 4.36 || x > 30 || z < -13 || z > 29) return null;
  const height = terrainHeight(x, z);
  return height >= .074 && height < 1.48 ? height : null;
}

export function areaAt(x, z) {
  if (rectContains(SHOP_FLOOR, x, z) && z < SHOP.front - .06) return 'Workshop';
  if (rectContains(PIER, x, z) || rectContains(LANDING, x, z)) return 'Landing pier';
  if (rectContains(STAIRS, x, z)) return 'Shore steps';
  if (rectContains(BOARDWALK, x, z)) return 'Workshop apron';
  return Math.hypot(x - BOAT.x, z - BOAT.z) < 3 ? 'Dinghy berth' : 'Exposed shore';
}

const FOOTPRINT = [[-.205,0],[.205,0],[0,-.205],[0,.205],[-.145,-.145],[.145,-.145],[-.145,.145],[.145,.145]];

function reachesPolygon(x, z, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [ax, az] = points[j];
    const [bx, bz] = points[i];
    const ex = bx - ax, ez = bz - az;
    const u = clamp(((x - ax) * ex + (z - az) * ez) / (ex * ex + ez * ez), 0, 1);
    const dx = x - ax - u * ex, dz = z - az - u * ez;
    if (dx * dx + dz * dz < .235 * .235) return true;
    if ((az > z) !== (bz > z) && x < ax + (z - az) * ex / ez) inside = !inside;
  }
  return inside;
}

export class WalkMap {
  obstacles = [];

  box(x, z, width, depth, minY = -Infinity, maxY = Infinity) {
    this.obstacles.push({ x, z, hx: width / 2, hz: depth / 2, minY, maxY });
  }

  ellipse(x, z, rx, rz, yaw = 0, minY = -Infinity, maxY = Infinity) {
    this.obstacles.push({ x, z, rx, rz, c: Math.cos(yaw), s: Math.sin(yaw), minY, maxY });
  }

  polygon(points, minY, maxY) {
    const x = (Math.min(...points.map(p => p[0])) + Math.max(...points.map(p => p[0]))) * .5;
    const z = (Math.min(...points.map(p => p[1])) + Math.max(...points.map(p => p[1]))) * .5;
    const radius = Math.max(...points.map(p => Math.hypot(p[0] - x, p[1] - z))) + .235;
    this.obstacles.push({ points, x, z, radius, minY, maxY });
  }

  stand(x, z, fromY) {
    const h = floorAt(x, z);
    if (h === null || Math.abs(h - fromY) > .30) return null;
    for (const [dx, dz] of FOOTPRINT) {
      const edge = floorAt(x + dx, z + dz);
      if (edge === null || Math.abs(edge - h) > .32) return null;
    }
    for (const o of this.obstacles) {
      if (h + 1.63 <= o.minY || h + .055 >= o.maxY) continue;
      const dx = x - o.x;
      const dz = z - o.z;
      if (o.points) {
        if (dx * dx + dz * dz < o.radius * o.radius && reachesPolygon(x, z, o.points)) return null;
      } else if (o.hx !== undefined) {
        const cx = Math.max(Math.abs(dx) - o.hx, 0);
        const cz = Math.max(Math.abs(dz) - o.hz, 0);
        if (cx * cx + cz * cz < .235 * .235) return null;
      } else {
        const lx = dx * o.c - dz * o.s;
        const lz = dx * o.s + dz * o.c;
        if ((lx / (o.rx + .235)) ** 2 + (lz / (o.rz + .235)) ** 2 < 1) return null;
      }
    }
    return h;
  }
}
