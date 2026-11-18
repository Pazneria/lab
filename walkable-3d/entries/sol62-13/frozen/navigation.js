export const START = Object.freeze([2.65, 4.07])
const radius = .25

// The terminal fence, platform rail and lookout rails make up the visitor envelope.
const terminal = [-.83, 4.99, -9.24, 4.93]
const landing = [.91, 3.87, 4.85, 6.55]
const platform = [-1.62, 5.01, -21.87, -9.34]
const threshold = [-.83, 5.01, -9.45, -9.17]
const rearBay = [-4.56, -.96, -20.83, -18.08]
const lookout = [-.86, 5.01, -27.10, -21.62]
const forecourt = [-6.95, .04, 1.065, 4.93]
const routes = [terminal, landing, platform, threshold, rearBay, lookout, forecourt]
const solids = [
  [4.56, 5.13, -6.95, -5.55],
  [4.55, 5.13, -7.73, -7.16],
  [-6.95, -6.14, 2.47, 4.28],
  [-1.02, -.72, -14.16, -13.83],
  [-.86, -.29, -25.27, -23.44],
  [2.82, 4.20, -27.09, -26.35],
]

function inside(x, z) {
  return routes.some(([left,right,back,front]) => x >= left && x <= right && z >= back && z <= front)
}

export function walkable(x, z) {
  if (!inside(x,z)) return false
  for (const [left,right,back,front] of solids) {
    const dx = x - Math.max(left, Math.min(right, x))
    const dz = z - Math.max(back, Math.min(front, z))
    if (dx*dx + dz*dz < radius*radius) return false
  }
  for (const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1],[.7071,.7071],[.7071,-.7071],[-.7071,.7071],[-.7071,-.7071]]) {
    if (!inside(x+dx*radius, z+dz*radius)) return false
  }
  return true
}

export function move(x, z, dx, dz) {
  const steps = Math.max(1, Math.ceil(Math.hypot(dx,dz)/.14))
  const mx = dx/steps, mz = dz/steps
  for (let step=0; step<steps; step++) {
    if (walkable(x+mx,z)) x+=mx
    if (walkable(x,z+mz)) z+=mz
  }
  return [x,z]
}

export function zoneFor(z) {
  if (z < -21.74) return 'COVERED LOOKOUT'
  if (z < -9.25) return 'PLATFORM 01'
  return 'TERMINAL'
}
