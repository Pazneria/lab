import { Draft, band, mix, polar, tau, tint } from './geometry.js';
import { roofSlot } from './layout.js';

const base = 3.822;
const radius = 5.25;
const rise = 2.92;
const top = Math.acos(0.56 / radius);
const first = roofSlot.angle + roofSlot.half;
const last = roofSlot.angle - roofSlot.half + tau;

function profile(a, t, offset = 0, inside = false) {
  const r = radius + offset - (inside ? 0.168 : 0);
  const h = rise + offset - (inside ? 0.154 : 0);
  return polar(a, r * Math.cos(t), base + (inside ? -0.015 : 0) + h * Math.sin(t));
}

function shellNormal(a, t, inside) {
  const sign = inside ? -1 : 1;
  const vertical = Math.sin(t) / rise;
  const horizontal = Math.cos(t) / radius;
  const length = Math.hypot(vertical, horizontal);
  return [Math.sin(a) * horizontal / length * sign, vertical / length * sign, Math.cos(a) * horizontal / length * sign];
}

function shell(a0, a1, t0, t1, across, upwards, offset, inner, palette) {
  const mesh = new Draft();
  for (let i = 0; i < across; i += 1) {
    const a = mix(a0, a1, i / across);
    const b = mix(a0, a1, (i + 1) / across);
    for (let j = 0; j < upwards; j += 1) {
      const t = mix(t0, t1, j / upwards);
      const s = mix(t0, t1, (j + 1) / upwards);
      const cs = [[a, t], [b, t], [b, s], [a, s]];
      if (inner) cs.reverse();
      mesh.face(cs.map(([az, elev]) => profile(az, elev, offset, inner)), {
        uv: cs.map(([az, elev]) => [az * 3.5, 0.15 + elev * 4.4]),
        normal: cs.map(([az, elev]) => shellNormal(az, elev, inner)),
        color: cs.map(([az, elev]) => tint(palette,
          0.94 + Math.sin(elev * 18 + az * 7) * 0.018 + Math.cos(az * 3.2 - elev * 1.5) * 0.02)),
      });
    }
  }
  return mesh.finish();
}

function roofEdge(build, material, angle, direction, thickness, coat = 0) {
  const draft = new Draft();
  for (let i = 0; i < 32; i += 1) {
    const t = mix(0, top, i / 32);
    const s = mix(0, top, (i + 1) / 32);
    const p = [
      profile(angle, t, coat + thickness),
      profile(angle, s, coat + thickness),
      profile(angle, s, coat - 0.015, true),
      profile(angle, t, coat - 0.015, true),
    ];
    if (direction < 0) p.reverse();
    draft.face(p, { uv: [[0, t * 4], [0, s * 4], [0.20, s * 4], [0.20, t * 4]] });
  }
  build.add(draft.finish(), material, { tint: 0xbbac8b });
}

function curveBars(build, material, path, count, tube, options = {}) {
  let previous = path(0);
  for (let i = 1; i <= count; i += 1) {
    const current = path(i / count);
    build.bar(material, previous, current, tube, { segments: 7, ...options });
    previous = current;
  }
}

function shutterHoist(build, m) {
  build.section('Dome / interior shutter hoist');
  const angle = last - 0.49;
  const locate = (x, y, radius = 4.48) => [
    Math.sin(angle) * radius + Math.cos(angle) * x,
    y,
    Math.cos(angle) * radius - Math.sin(angle) * x,
  ];
  const rotation = [0, angle, 0];
  const brass = 0xc7ac7f;
  build.box(m.wood, locate(0, 2.096, 4.535), [0.308, 0.56, 0.094], { rotation, tint: 0xc9b18e });
  for (const y of [1.876, 2.312]) {
    build.box(m.darkMetal, locate(0, y, 4.480), [0.315, 0.051, 0.041], { rotation, tint: 0xc8bca0 });
    for (const x of [-0.119, 0.119]) {
      build.rock(m.brass, locate(x, y, 4.45), [0.022, 0.022, 0.019], { tint: brass });
    }
  }
  build.bar(m.darkMetal, locate(0, 2.12, 4.532), locate(0, 2.12, 4.346), 0.099,
    { segments: 27, tint: 0xc3b79d });
  build.ring(m.bronze, locate(0, 2.12, 4.394), 0.096, 0.021, { rotation, segments: 29, tint: brass });
  build.ring(m.patina, locate(0, 2.12, 4.34), 0.118, 0.015, { rotation, segments: 31, tint: 0xd7c9a9 });
  for (let i = 0; i < 5; i += 1) {
    const a = i * tau / 5;
    build.bar(m.bronze, locate(0, 2.12, 4.34),
      locate(Math.cos(a) * 0.113, 2.12 + Math.sin(a) * 0.113, 4.34), 0.013,
      { segments: 7, tint: brass });
  }
  build.bar(m.darkMetal, locate(0.102, 2.073, 4.36), locate(0.102, 2.073, 4.242), 0.013, { segments: 10 });
  build.bar(m.wood, locate(0.101, 2.073, 4.277), locate(0.101, 2.073, 4.219), 0.024,
    { segments: 13, tint: 0xd8bd99 });

  for (const x of [-0.092, 0.092]) {
    for (let i = 0; i < 27; i += 1) {
      const y = 2.20 + i * 0.0605;
      build.ring(m.darkMetal, locate(x, y, 4.417), 0.019, 0.0051, {
        rotation: [0, angle + (i % 2) * Math.PI / 2, 0], scale: [1, 1.63, 1],
        segments: 10, cross: 5, tint: 0xc7b79b, cast: false,
      });
    }
  }
  build.box(m.patina, locate(0, 3.783, 4.477), [0.267, 0.179, 0.183], { rotation, tint: 0xc7c09f });
  build.bar(m.darkMetal, locate(0, 3.79, 4.368), locate(0, 3.79, 4.49), 0.090,
    { segments: 30, tint: 0xb4ab93 });
  build.bar(m.bronze, locate(0, 3.777, 4.431), locate(0, 4.064, 4.920), 0.032,
    { segments: 10, tint: 0xbbab87 });
  build.bar(m.darkMetal, locate(0.135, 3.741, 4.48), locate(0.123, 4.079, 4.905), 0.021,
    { segments: 8, tint: 0xb8ab8b });
  build.bar(m.darkMetal, locate(-0.135, 3.741, 4.48), locate(-0.123, 4.079, 4.905), 0.021,
    { segments: 8, tint: 0xb8ab8b });
}

export function makeDome(build, m) {
  shutterHoist(build, m);
  build.section('Dome / structural shell');
  const count = 18;
  const colors = [0xfbead2, 0xf1dac0, 0xf4dfc0, 0xf7dfbb, 0xe7d1b6, 0xf5e2c6];
  for (let i = 0; i < count; i += 1) {
    const a = mix(first, last, i / count);
    const b = mix(first, last, (i + 1) / count);
    build.add(shell(a, b, 0, top, 5, 28, 0, false, colors[i % colors.length]), m.dome);
    build.add(shell(a, b, 0, top, 4, 26, 0, true, [0xe0d5bd, 0xd2c5aa, 0xe8d8bb][i % 3]),
      m.domeInside, { cast: false });
  }
  const crown = new Draft();
  for (let i = 0; i < 48; i += 1) {
    const a = mix(first, last, i / 48);
    const b = mix(first, last, (i + 1) / 48);
    crown.quad(profile(a, top), profile(b, top), profile(b, top, 0, true), profile(a, top, 0, true),
      { uv: [[a, 0], [b, 0], [b, 0.18], [a, 0.18]] });
  }
  build.add(crown.finish(), m.stone);
  build.add(band(5.157, 5.287, 0, tau, base - 0.028, base + 0.132, 124), m.patina, { tint: 0xb9bea5 });
  build.add(band(5.277, 5.314, 0, tau, base + 0.035, base + 0.063, 124), m.bronze, { tint: 0xbba37b });
  build.add(band(5.299, 5.333, 0, tau, base - 0.005, base + 0.021, 124), m.bronze, { tint: 0xbfb294 });
  build.add(band(0.525, 0.612, first, last, base + rise * Math.sin(top) - 0.013,
    base + rise * Math.sin(top) + 0.064, 54), m.patina, { tint: 0x9f9980 });

  build.section('Dome / aperture and ribs');
  for (let i = 0; i <= count; i += 1) {
    const a = mix(first, last, i / count);
    const edge = i === 0 || i === count;
    const outerTone = edge ? 0xb2a78f : i % 3 === 0 ? 0xc2aa8b : 0xe1d0af;
    curveBars(build, edge ? m.patina : m.bronze, step => profile(a, mix(0.025, top, step), edge ? 0.023 : 0.004),
      28, edge ? 0.046 : 0.017, { tint: outerTone });
    if (i % 2 === 0 || edge) {
      curveBars(build, m.patina, step => profile(a, mix(0.036, top, step), edge ? -0.044 : -0.014, true),
        27, edge ? 0.047 : 0.033, { tint: edge ? 0xc6c4a8 : 0xcdc0a4, cast: edge });
      const anchor = profile(a, 0.06, -0.065, true);
      build.box(m.bronze, anchor, [0.16, 0.20, 0.071], { tint: 0xae9471, rotation: [0, a, 0] });
      for (const side of [-1, 1]) {
        const p = profile(a + side * 0.009, 0.065, -0.117, true);
        build.rock(m.brass, p, [0.026, 0.028, 0.027], { cast: false });
      }
    }
  }
  for (const t of [0.19, 0.48, 0.77, 1.06, 1.30]) {
    const arc = Math.max(19, Math.ceil(Math.cos(t) * 66));
    curveBars(build, m.dome, step => profile(mix(first, last, step), t, 0.003), arc, 0.013,
      { tint: 0xc1ad90, cast: false });
  }

  for (const [angle, direction] of [[first, 1], [last, -1]]) {
    roofEdge(build, m.stone, angle, direction, 0.018);
    const other = angle + direction * 0.255;
    const openingSide = angle + direction * 0.018;
    const a = Math.min(other, openingSide);
    const b = Math.max(other, openingSide);
    build.add(shell(a, b, 0.038, top - 0.03, 8, 28, 0.102, false, 0xd9c7a4), m.patina);
    build.add(shell(a, b, 0.043, top - 0.033, 7, 26, 0.074, true, 0xcab190),
      m.patina, { cast: false });
    for (let i = 0; i <= 4; i += 1) {
      const az = mix(a, b, i / 4);
      curveBars(build, i === 0 || i === 4 ? m.bronze : m.patina,
        step => profile(az, mix(0.045, top - 0.029, step), 0.106), 23, i === 0 || i === 4 ? 0.035 : 0.018,
        { tint: 0xd4c29e, cast: i === 0 || i === 4 });
    }
    for (const t of [0.09, 0.44, 0.88, 1.25]) {
      curveBars(build, m.bronze, step => profile(mix(a, b, step), t, 0.114), 8, 0.023,
        { tint: 0xceb286 });
      const wheel = profile(angle + direction * 0.24, t, -0.05, true);
      build.cylinder(m.darkMetal, wheel, 0.085, 0.085, 0.049, {
        rotation: [0, angle, Math.PI / 2], segments: 16,
      });
    }
    curveBars(build, m.brass, step => profile(angle - direction * 0.003, mix(0.022, top - 0.015, step), -0.035, true),
      29, 0.023, { tint: 0xb5a179 });
  }
  for (const t of [0.072, 0.55]) {
    curveBars(build, m.bronze, step => profile(mix(first, last, step), t, -0.038, true),
      80, 0.021, { tint: 0xc1ac80, cast: false });
  }
}
