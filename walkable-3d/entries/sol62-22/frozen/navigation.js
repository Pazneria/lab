import { clamp } from './geometry.js';

export const ENTRANCE = Object.freeze({ x: .26, z: 7.62, yaw: .108, pitch: -.045 });
export const EYE_HEIGHT = 1.66;
export const WALK_RADIUS = .221;

export function floorAt(x, z, steps) {
  let height = 0;
  for (const step of steps) {
    if (Math.abs(x - step.x) <= step.hx && Math.abs(z - step.z) <= step.hz) {
      height = Math.max(height, step.height);
    }
  }
  return height;
}

export function canOccupy(x, z, blockers, radius = WALK_RADIUS) {
  for (const obstacle of blockers) {
    const dx = Math.abs(x - obstacle.x), dz = Math.abs(z - obstacle.z);
    if (obstacle.type === 'circle') {
      if (dx ** 2 + dz ** 2 < (obstacle.radius + radius) ** 2) return false;
    } else {
      const nearX = Math.max(0, dx - obstacle.hx), nearZ = Math.max(0, dz - obstacle.hz);
      if (nearX ** 2 + nearZ ** 2 < radius ** 2) return false;
    }
  }
  return true;
}

export function moveWithCollisions(position, deltaX, deltaZ, blockers) {
  const count = Math.max(1, Math.ceil(Math.hypot(deltaX, deltaZ) / .079));
  const dx = deltaX / count, dz = deltaZ / count;
  let { x, z } = position;
  for (let i = 0; i < count; i++) {
    if (canOccupy(x + dx, z + dz, blockers)) {
      x += dx;
      z += dz;
      continue;
    }
    if (canOccupy(x + dx, z, blockers)) x += dx;
    if (canOccupy(x, z + dz, blockers)) z += dz;
  }
  position.x = x;
  position.z = z;
}

export function look(view, dx, dy) {
  view.yaw -= dx * .00205;
  view.pitch = clamp(view.pitch - dy * .00205, -1.49, 1.49);
}

