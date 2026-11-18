import { clamp, floorAt, spawn, walls, yard } from './layout.js';

export const bodyRadius = 0.202;
const eyeHeight = 1.64;
const radiusSquared = bodyRadius * bodyRadius;
const maxStep = 0.064;

export function move(position, dx, dz) {
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / maxStep));
  for (let i = 0; i < steps; i++) {
    position.x += dx / steps;
    position.z += dz / steps;
    stayInYard(position);
    for (let pass = 0; pass < 4 && separate(position); pass++) {
      // A corner can touch two adjoining colliders after the first push.
    }
  }
}

function stayInYard(position) {
  const mid = (yard.zMin + yard.zMax) / 2;
  const half = (yard.zMax - yard.zMin) / 2;
  const x = position.x / yard.x;
  const z = (position.z - mid) / half;
  const sum = x ** 6 + z ** 6;
  if (sum <= 1) return;
  const scale = sum ** (-1 / 6);
  position.x *= scale;
  position.z = mid + (position.z - mid) * scale;
}

function separate(position) {
  let changed = false;
  for (const wall of walls) {
    if (position.x < wall.xmin - bodyRadius || position.x > wall.xmax + bodyRadius
      || position.z < wall.zmin - bodyRadius || position.z > wall.zmax + bodyRadius) continue;
    const nx = position.x - clamp(position.x, wall.xmin, wall.xmax);
    const nz = position.z - clamp(position.z, wall.zmin, wall.zmax);
    const d2 = nx * nx + nz * nz;
    if (d2 >= radiusSquared - 0.000000002) continue;
    changed = true;
    if (d2 > 0.00000001) {
      const push = bodyRadius / Math.sqrt(d2) - 1;
      position.x += nx * push;
      position.z += nz * push;
      continue;
    }
    const a = position.x - wall.xmin;
    const b = wall.xmax - position.x;
    const c = position.z - wall.zmin;
    const d = wall.zmax - position.z;
    const min = Math.min(a, b, c, d);
    if (min === a) position.x = wall.xmin - bodyRadius;
    else if (min === b) position.x = wall.xmax + bodyRadius;
    else if (min === c) position.z = wall.zmin - bodyRadius;
    else position.z = wall.zmax + bodyRadius;
  }
  return changed;
}

export class Walker {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = spawn.x;
    this.z = spawn.z;
    this.y = floorAt(this.x, this.z) + eyeHeight;
    this.yaw = spawn.yaw;
    this.pitch = spawn.pitch;
    this.stop();
  }

  stop() {
    this.vx = 0;
    this.vz = 0;
  }

  look(dx, dy, sensitivity) {
    this.yaw = (this.yaw - dx * sensitivity) % (Math.PI * 2);
    this.pitch = clamp(this.pitch - dy * sensitivity, -1.48, 1.48);
  }

  update(dt, side, forward, fast = false) {
    const input = Math.hypot(side, forward);
    const speed = (fast ? 3.7 : 2.22) / Math.max(1, input);
    const cos = Math.cos(this.yaw);
    const sin = Math.sin(this.yaw);
    const goalX = speed * (side * cos - forward * sin);
    const goalZ = speed * (-side * sin - forward * cos);
    const follow = 1 - Math.exp(-(input > 0.03 ? 13 : 20) * dt);
    this.vx += (goalX - this.vx) * follow;
    this.vz += (goalZ - this.vz) * follow;
    if (input < 0.03 && Math.abs(this.vx) + Math.abs(this.vz) < 0.006) this.stop();
    if (this.vx || this.vz) move(this, this.vx * dt, this.vz * dt);
    this.y += (floorAt(this.x, this.z) + eyeHeight - this.y) * (1 - Math.exp(-23 * dt));
  }
}
