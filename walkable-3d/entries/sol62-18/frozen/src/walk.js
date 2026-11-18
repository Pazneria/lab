export class WalkSpace {
  constructor(radius = .245) {
    this.radius = radius;
    this.obstacles = [];
  }

  add(name, x, z, width, depth) {
    this.obstacles.push({
      name, minX: x - width * .5, maxX: x + width * .5,
      minZ: z - depth * .5, maxZ: z + depth * .5
    });
  }

  blocked(x, z) {
    const limit = this.radius * this.radius;
    for (const box of this.obstacles) {
      const dx = x < box.minX ? box.minX - x : Math.max(0, x - box.maxX);
      const dz = z < box.minZ ? box.minZ - z : Math.max(0, z - box.maxZ);
      if (dx * dx + dz * dz < limit) return box;
    }
    return null;
  }

  advance(position, dx, dz) {
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(dx), Math.abs(dz)) / .076));
    const sx = dx / steps, sz = dz / steps;
    for (let i = 0; i < steps; i++) {
      const x = position.x + sx;
      const z = position.z + sz;
      if (!this.blocked(x, position.z)) position.x = x;
      if (!this.blocked(position.x, z)) position.z = z;
    }
  }
}

export function translation(yaw, side, forward) {
  const size = Math.max(1, Math.hypot(side, forward));
  const cosine = Math.cos(yaw), sine = Math.sin(yaw);
  return [(side * cosine - forward * sine) / size, (-forward * cosine - side * sine) / size];
}
