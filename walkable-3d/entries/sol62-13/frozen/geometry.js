export const MAT = Object.freeze({
  steel: 0, concrete: 1, timber: 2, paint: 3, rubber: 4, zinc: 5,
  glow: 6, water: 7, terrain: 8, cloth: 9, stripe: 10, asphalt: 11,
})

export const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
export const mul = (v, n) => [v[0] * n, v[1] * n, v[2] * n]
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
export const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
]
export const length = (v) => Math.hypot(v[0], v[1], v[2])
export const norm = (v) => mul(v, 1 / (length(v) || 1))
export const mix = (a, b, t) => add(mul(a, 1 - t), mul(b, t))
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

export function randomSource(seed) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
}

const colors = new Map()
function linear(channel) {
  return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4
}

export function color(value) {
  if (Array.isArray(value)) return value
  if (!colors.has(value)) {
    const hex = Number.parseInt(value.replace('#', ''), 16)
    colors.set(value, [linear((hex >>> 16) / 255), linear((hex >>> 8 & 255) / 255), linear((hex & 255) / 255)])
  }
  return colors.get(value)
}

const UP = [0, 1, 0]
const EAST = [1, 0, 0]
const SOUTH = [0, 0, 1]
const UV = [[0, 0], [1, 0], [1, 1], [0, 1]]

export class Mesh {
  constructor() {
    this.data = []
  }

  vertex(p, n, c, uv, material, detail) {
    this.data.push(p[0], p[1], p[2], n[0], n[1], n[2], c[0], c[1], c[2], uv[0], uv[1], material, detail)
  }

  tri(a, b, c, tint, material, detail = 0, normal = null, uv = UV, tones = null) {
    const n = normal ?? norm(cross(sub(b, a), sub(c, a)))
    const tintRGB = color(tint)
    this.vertex(a, n, tones?.[0] ?? tintRGB, uv[0], material, detail)
    this.vertex(b, n, tones?.[1] ?? tintRGB, uv[1], material, detail)
    this.vertex(c, n, tones?.[2] ?? tintRGB, uv[2], material, detail)
  }

  quad(a, b, c, d, tint, material, detail = 0, normal = null, uv = UV) {
    this.tri(a, b, c, tint, material, detail, normal, uv)
    this.tri(a, c, d, tint, material, detail, normal, [uv[0], uv[2], uv[3]])
  }

  panel(center, right, up, width, height, tint, material, detail = 0, uv = UV) {
    const x = mul(right, width / 2)
    const y = mul(up, height / 2)
    this.quad(sub(sub(center, x), y), sub(add(center, x), y), add(add(center, x), y),
      add(sub(center, x), y), tint, material, detail, norm(cross(right, up)), uv)
  }

  box(x, y, z, w, h, d, tint, material = MAT.steel, detail = 0) {
    this.oriented([x, y, z], EAST, UP, SOUTH, w, h, d, tint, material, detail)
  }

  oriented(center, east, up, south, w, h, d, tint, material = MAT.steel, detail = 0) {
    const p = (i, j, k) => add(center, add(mul(east, i * w / 2), add(mul(up, j * h / 2), mul(south, k * d / 2))))
    const x = -1, X = 1
    this.quad(p(x,x,X), p(X,x,X), p(X,X,X), p(x,X,X), tint, material, detail, south)
    this.quad(p(X,x,x), p(x,x,x), p(x,X,x), p(X,X,x), tint, material, detail, mul(south,-1))
    this.quad(p(X,x,X), p(X,x,x), p(X,X,x), p(X,X,X), tint, material, detail, east)
    this.quad(p(x,x,x), p(x,x,X), p(x,X,X), p(x,X,x), tint, material, detail, mul(east,-1))
    this.quad(p(x,X,X), p(X,X,X), p(X,X,x), p(x,X,x), tint, material, detail, up)
    this.quad(p(x,x,x), p(X,x,x), p(X,x,X), p(x,x,X), tint, material, detail, mul(up,-1))
  }

  beam(a, b, width, depth, tint, material = MAT.steel, detail = 0, reference = UP) {
    const axis = norm(sub(b, a))
    const side = norm(cross(Math.abs(dot(axis, reference)) > .98 ? EAST : reference, axis))
    const front = cross(side, axis)
    this.oriented(mix(a,b,.5), side, axis, front, width, length(sub(b,a)), depth, tint, material, detail)
  }

  cylinder(a, b, radius, tint, material = MAT.steel, sides = 12, endRadius = radius, detail = 0) {
    const axis = norm(sub(b,a))
    const side = norm(cross(axis, Math.abs(axis[1]) > .9 ? EAST : UP))
    const up = cross(axis, side)
    for (let i = 0; i < sides; i++) {
      const h0 = i / sides * Math.PI * 2
      const h1 = (i + 1) / sides * Math.PI * 2
      const r0 = add(mul(side, Math.cos(h0)), mul(up, Math.sin(h0)))
      const r1 = add(mul(side, Math.cos(h1)), mul(up, Math.sin(h1)))
      const p0 = add(a, mul(r0, radius)), p1 = add(a, mul(r1, radius))
      const p2 = add(b, mul(r1, endRadius)), p3 = add(b, mul(r0, endRadius))
      const slope = (radius - endRadius) / (length(sub(b, a)) || 1)
      const n0 = norm(add(r0, mul(axis, slope))), n1 = norm(add(r1, mul(axis, slope)))
      const ci = color(tint)
      this.vertex(p0, n0, ci, [0, 0], material, detail)
      this.vertex(p1, n1, ci, [1, 0], material, detail)
      this.vertex(p2, n1, ci, [1, 1], material, detail)
      this.vertex(p0, n0, ci, [0, 0], material, detail)
      this.vertex(p2, n1, ci, [1, 1], material, detail)
      this.vertex(p3, n0, ci, [0, 1], material, detail)
      this.tri(a, p1, p0, tint, material, detail, mul(axis,-1))
      this.tri(b, p3, p2, tint, material, detail, axis)
    }
  }

  ring(a, b, inner, outer, tint, material = MAT.steel, sides = 64) {
    const axis = norm(sub(b, a))
    const side = norm(cross(axis, Math.abs(axis[1]) > .9 ? EAST : UP))
    const up = cross(axis, side)
    const axisBack = mul(axis, -1)
    for (let i = 0; i < sides; i++) {
      const h0 = 2 * Math.PI * i / sides
      const h1 = 2 * Math.PI * (i + 1) / sides
      const r0 = add(mul(side, Math.cos(h0)), mul(up, Math.sin(h0)))
      const r1 = add(mul(side, Math.cos(h1)), mul(up, Math.sin(h1)))
      const i0 = mul(r0, inner), i1 = mul(r1, inner), o0 = mul(r0, outer), o1 = mul(r1, outer)
      const n = norm(add(r0, r1))
      this.quad(add(a, i0), add(a, i1), add(a, o1), add(a, o0), tint, material, 0, axisBack)
      this.quad(add(b, i0), add(b, o0), add(b, o1), add(b, i1), tint, material, 0, axis)
      this.quad(add(a, o0), add(a, o1), add(b, o1), add(b, o0), tint, material, 0, n)
      this.quad(add(b, i0), add(b, i1), add(a, i1), add(a, i0), tint, material, 0, mul(n, -1))
    }
  }

  pipe(points, radius, tint, material = MAT.steel, sides = 9) {
    for (let i = 1; i < points.length; i++) this.cylinder(points[i-1], points[i], radius, tint, material, sides)
  }
}
