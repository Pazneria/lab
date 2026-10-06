export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const smooth = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
export const mix = (a, b, t) => a + (b - a) * t;
const fract = x => x - Math.floor(x);
const hash = (x, y, z) => fract(Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453);
export function noise(x, y = 0, z = 0) {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  let tx = fract(x), ty = fract(y), tz = fract(z);
  tx = tx * tx * (3 - 2 * tx); ty = ty * ty * (3 - 2 * ty); tz = tz * tz * (3 - 2 * tz);
  return mix(mix(mix(hash(ix, iy, iz), hash(ix + 1, iy, iz), tx), mix(hash(ix, iy + 1, iz), hash(ix + 1, iy + 1, iz), tx), ty),
    mix(mix(hash(ix, iy, iz + 1), hash(ix + 1, iy, iz + 1), tx), mix(hash(ix, iy + 1, iz + 1), hash(ix + 1, iy + 1, iz + 1), tx), ty), tz);
}
export function fbm(x, y = 0, z = 0) {
  return noise(x, y, z) * .57 + noise(x * 2.13, y * 2.13, z * 2.13) * .28 + noise(x * 4.61, y * 4.61, z * 4.61) * .15;
}
export function randomGenerator(seed = 81521) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
