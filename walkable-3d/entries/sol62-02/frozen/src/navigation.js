export const SPAWN = Object.freeze({ x: 0.2, z: 8.55, yaw: -0.055, pitch: 0.015 });
export const WALK_RADIUS = 0.24;

export function obstacle(x, z, width, depth, yaw = 0) {
  return { x, z, hw: width / 2, hd: depth / 2, cos: Math.cos(yaw), sin: Math.sin(yaw) };
}

export function toWorld(x, z, frame) {
  const c = Math.cos(frame.yaw), s = Math.sin(frame.yaw);
  return { x: frame.x + x * c + z * s, z: frame.z - x * s + z * c };
}

function pushOut(position, b, radius) {
  const dx = position.x - b.x, dz = position.z - b.z;
  const lx = dx * b.cos - dz * b.sin, lz = dx * b.sin + dz * b.cos;
  const qx = Math.min(b.hw, Math.max(-b.hw, lx));
  const qz = Math.min(b.hd, Math.max(-b.hd, lz));
  const ox = lx - qx, oz = lz - qz, distanceSquared = ox * ox + oz * oz;
  if (distanceSquared >= radius * radius) return;

  let x, z;
  if (distanceSquared > 1e-10) {
    const distance = Math.sqrt(distanceSquared);
    const factor = (radius - distance) / distance;
    x = ox * factor;
    z = oz * factor;
  } else if (b.hw - Math.abs(lx) < b.hd - Math.abs(lz)) {
    x = (lx < 0 ? -1 : 1) * (b.hw + radius) - lx;
    z = 0;
  } else {
    x = 0;
    z = (lz < 0 ? -1 : 1) * (b.hd + radius) - lz;
  }
  position.x += x * b.cos + z * b.sin;
  position.z += -x * b.sin + z * b.cos;
}

export function move(position, dx, dz, obstacles, radius = WALK_RADIUS) {
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.11));
  for (let i = 0; i < steps; i++) {
    position.x += dx / steps;
    position.z += dz / steps;
    for (let pass = 0; pass < 3; pass++) {
      for (const b of obstacles) pushOut(position, b, radius);
    }
  }
  return position;
}

export function areaName(z) {
  if (z < -11.6) return "Tea counter";
  if (z < -7.0) return "Covered passage";
  if (z > 7.1) return "Courtyard entrance";
  return "Market courtyard";
}
