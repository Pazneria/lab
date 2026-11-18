import * as THREE from 'three';
import { PI, TAU, clamp, grid, lerp, material, rng, texture } from './geometry.js';
import { placard, star } from './materials.js';

export const PLAN = Object.freeze({
  left: -5.35, right: 5.35, entry: 8.75, rear: -13.8,
  archive: 1.25, workshop: -4.65, arch: 2.16, ceiling: 4.25,
});

const { left, right, entry, rear, archive, workshop, arch, ceiling } = PLAN;

function archPoints(width, spring, rise, steps = 20) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const angle = PI - PI * i / steps;
    return [Math.cos(angle) * width / 2, spring + Math.sin(angle) * rise];
  });
}

function profileArc(world, point, inner, outer, spring, rise, depth, mat, steps = 24) {
  for (let i = 0; i < steps; i++) {
    const a = PI * i / steps, b = PI * (i + 1) / steps;
    const make = (t, border, boost) => point(Math.cos(t) * border, spring + Math.sin(t) * (rise + boost));
    const corners = [make(a, inner, 0), make(b, inner, 0), make(a, outer, depth), make(b, outer, depth)];
    const patch = grid(1, 1, (s, t) => corners[s + t * 2]);
    world.put(patch, mat);
  }
}

function masonryOpening(world, p, z, name, backName) {
  const spring = 2.43, rise = 1.02, thick = .36;
  world.zone = 'arch-' + z;
  for (const sign of [-1, 1]) {
    const center = sign * (Math.abs(left) + arch) / 2;
    world.box(center, ceiling / 2, z, right - arch, ceiling, thick, p.plaster);
    world.block(center, z, right - arch, thick);
    for (const side of [-1, 1]) {
      const face = z + side * .195;
      world.box(center, .46, face, right - arch, .90, .047, p.panel);
      world.box(center, .92, face + side * .026, right - arch, .115, .11, p.rail);
      world.box(center, .12, face + side * .029, right - arch, .23, .09, p.rail);
      for (let i = 0; i < 2; i++) {
        world.box(center + (i - .5) * 1.36, .52, face + side * .029, 1.16, .5, .042, p.panelInset);
      }
      world.box(sign * (arch + .088), spring / 2, face, .24, spring, .15, p.cutStone);
      world.box(sign * (arch + .10), spring - .065, face + side * .04, .34, .115, .17, p.paleStone);
      world.box(sign * (arch + .10), .15, face + side * .04, .32, .30, .16, p.paleStone);
      world.box(center, 4.06, face, right - arch, .16, .13, p.rail);
    }
    world.box(sign * (arch + .042), spring / 2, z, .085, spring, thick + .13, p.cutStone);
  }
  const points = archPoints(arch * 2, spring, rise);
  world.shape([...points, [arch, ceiling], [-arch, ceiling]], 0, 0, z - thick / 2, thick, p.plaster);
  for (let i = 0; i < 23; i++) {
    const a0 = PI * i / 23 + .0025, a1 = PI * (i + 1) / 23 - .0025;
    const v = (a, offset) => [Math.cos(a) * (arch + offset), spring + Math.sin(a) * (rise + offset)];
    world.shape([v(a0, -.012), v(a1, -.012), v(a1, .23), v(a0, .23)],
      0, 0, z - .265, .53, i % 4 === 2 ? p.paleStone : p.cutStone);
  }
  world.shape([[-.10, 3.38], [.10, 3.38], [.135, 3.70], [-.135, 3.70]], 0, 0, z - .29, .58, p.paleStone);
  for (const [side, words] of [[1, name], [-1, backName]]) {
    const y = 3.83;
    const sign = placard(p.renderer, words[0], words[1]);
    world.box(0, y, z + side * .215, 1.75, .49, .10, p.rail);
    world.plane(0, y, z + side * .268, 1.69, .45, sign, { ry: side === 1 ? 0 : PI });
    world.sphere(-.81, y, z + side * .274, .018, .018, .013, p.brass);
    world.sphere(.81, y, z + side * .274, .018, .018, .013, p.brass);
  }
  world.box(0, .009, z, 4.28, .016, .42, p.dark);
  for (const shift of [-.125, .125]) world.box(0, .019, z + shift, 4.28, .009, .016, p.brassDark);
}

function exteriorGlass(renderer) {
  const map = texture(512, 512, (ctx, w, h) => {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#b9dce7');
    sky.addColorStop(.47, '#d4e9e7');
    sky.addColorStop(.80, '#e5e9d7');
    sky.addColorStop(1, '#b1c9bd');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);
    const random = rng(552);
    for (let i = 0; i < 22; i++) {
      const x = random() * w, y = 55 + random() * 340, radius = 30 + random() * 98;
      const haze = ctx.createRadialGradient(x, y, 0, x, y, radius);
      haze.addColorStop(0, '#f4f4dd6d');
      haze.addColorStop(1, '#f4f4dd00');
      ctx.fillStyle = haze;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    for (let row = 0; row < 3; row++) {
      let x = -26;
      while (x < w + 8) {
        const y = 441 + row * 27 + random() * 12;
        const d = 18 + random() * 40;
        const tower = 10 + random() * (29 - row * 5);
        ctx.fillStyle = ['#acc8c344', '#8da9ab52', '#78989977'][row];
        ctx.beginPath();
        ctx.moveTo(x, h);
        ctx.lineTo(x, y);
        ctx.lineTo(x + d * .35, y - tower * .5);
        ctx.lineTo(x + d * .53, y - tower);
        ctx.lineTo(x + d * .68, y - tower * .5);
        ctx.lineTo(x + d, y);
        ctx.lineTo(x + d, h);
        ctx.fill();
        x += d * .86;
      }
    }
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = '#608d9853';
    for (let i = -8; i < 17; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 64, 0);
      ctx.lineTo(i * 64 + 512, 512);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(i * 64, 0);
      ctx.lineTo(i * 64 - 512, 512);
      ctx.stroke();
    }
  }, renderer);
  return new THREE.MeshBasicMaterial({ color: '#fcffff', map });
}

function windowWell(world, p, glass, x, z, yaw, width, base, spring, rise) {
  const half = width / 2, c = Math.cos(yaw), s = Math.sin(yaw);
  const at = (u, y, v = 0) => [x + c * u + s * v, y, z - s * u + c * v];
  const box = (u, y, v, w, h, d, mat) => world.box(...at(u, y, v), w, h, d, mat, { ry: yaw });
  const g = grid(26, 7, (u, v) => {
    const wx = (u - .5) * width;
    const top = spring + rise * Math.sqrt(Math.max(0, 1 - (wx / half) ** 2));
    return [wx, lerp(base, top, v), 0];
  }, (u, v) => {
    const wx = (u - .5) * 2;
    return [u, v * (spring + rise * Math.sqrt(Math.max(0, 1 - wx ** 2)) - base) / (spring + rise - base)];
  });
  world.put(g, glass, x, 0, z, { ry: yaw });
  const border = p.cutStone;
  for (const side of [-1, 1]) {
    box(side * (half + .067), (base + spring) / 2, .054, .165, spring - base, .15, border);
    box(side * half, (base + spring) / 2, .105, .065, spring - base, .085, p.rail);
  }
  box(0, base - .05, .13, width + .33, .13, .36, p.paleStone);
  box(0, base + .021, .072, width, .053, .195, p.rail);
  box(0, spring, .080, width + .04, .058, .13, p.rail);
  const ringFront = material('#d9c8a5', .86, { side: THREE.DoubleSide });
  profileArc(world, (u, y) => at(u, y, .119), half - .013, half + .17, spring, rise, .15, ringFront);
  const archLine = archPoints(width, spring, rise, 18).map(([u, y]) => at(u, y, .14));
  world.tube(archLine, .031, p.rail, false, 39);
  for (let i = 1; i < 4; i++) {
    const u = (i / 4 - .5) * width;
    box(u, (base + spring) / 2, .089, .043, spring - base, .114, p.rail);
    const top = spring + rise * Math.sqrt(1 - (u / half) ** 2);
    world.link(at(0, spring, .107), at(u, top, .107), .019, p.rail, 5);
  }
  for (let i = 1; i <= 2; i++) box(0, lerp(base, spring, i / 3), .09, width, .038, .09, p.rail);
  const r = width * .158;
  world.torus(...at(0, spring + rise * .48, .105), r, .014, p.brassDark,
    { ry: yaw, sy: .74 }, TAU, 32);
  for (let i = 0; i < 8; i++) {
    const a = i * TAU / 8;
    const u = Math.sin(a) * r * 1.22;
    const y = clamp(spring + rise * .48 + Math.cos(a) * r * .88, spring + .012, spring + rise - .045);
    world.link(at(0, spring + rise * .48, .108), at(u, y, .108), .009, p.brassDark, 5);
  }
  world.sphere(...at(0, spring + rise * .48, .134), .046, .046, .037, p.brass);
}

function wallLights(world, p, x, z, yaw, height = 2.35) {
  const c = Math.cos(yaw), s = Math.sin(yaw);
  const at = (u, y, v = 0) => [x + c * u + s * v, y, z - s * u + c * v];
  world.box(...at(0, height, .05), .12, .34, .06, p.brassDark, { ry: yaw });
  world.tube([at(0, height - .11, .08), at(0, height - .16, .20), at(0, height - .06, .30)], .025, p.brassDark);
  world.cyl(...at(0, height - .03, .30), .087, .06, .06, p.brass);
  world.cyl(...at(0, height + .064, .30), .046, .051, .13, p.wax);
  world.sphere(...at(0, height + .16, .30), .021, .053, .018, p.lamp);
  world.torus(...at(0, height + .02, .30), .085, .009, p.brass, { rx: -PI / 2 }, TAU, 20);
}

function wallPanels(world, p, xmin, xmax, z, facing) {
  const length = xmax - xmin, center = (xmin + xmax) / 2;
  world.box(center, .455, z, length, .91, .053, p.panel);
  world.box(center, .942, z + facing * .034, length, .145, .115, p.rail);
  world.box(center, .885, z + facing * .092, length, .043, .04, p.railHighlight);
  world.box(center, .105, z + facing * .034, length, .212, .12, p.rail);
  world.box(center, 4.012, z + facing * .034, length, .23, .115, p.rail);
  const n = Math.ceil(length / 1.18), stride = length / n;
  for (let i = 0; i < n; i++) {
    const x = xmin + (i + .5) * stride;
    world.box(x, .497, z + facing * .033, stride - .15, .55, .031, p.railHighlight);
    world.box(x, .497, z + facing * .055, stride - .21, .48, .028, p.panelInset);
  }
}

function sidePanels(world, p, xmin, zmin, zmax, facing) {
  const length = zmax - zmin, center = (zmin + zmax) / 2;
  world.box(xmin, .455, center, .054, .91, length, p.panel);
  world.box(xmin + facing * .033, .942, center, .115, .145, length, p.rail);
  world.box(xmin + facing * .087, .885, center, .039, .043, length, p.railHighlight);
  world.box(xmin + facing * .034, .105, center, .12, .212, length, p.rail);
  world.box(xmin + facing * .033, 4.012, center, .115, .23, length, p.rail);
  const n = Math.ceil(length / 1.16), stride = length / n;
  for (let i = 0; i < n; i++) {
    const z = zmin + (i + .5) * stride;
    world.box(xmin + facing * .03, .497, z, .031, .55, stride - .15, p.railHighlight);
    world.box(xmin + facing * .055, .497, z, .028, .48, stride - .21, p.panelInset);
  }
}

function door(world, p) {
  const z = entry - .175;
  world.box(0, 1.64, z, 2.62, 3.28, .17, p.dark);
  world.box(0, 1.64, z - .093, 2.37, 3.16, .12, p.rail);
  for (const sign of [-1, 1]) {
    world.box(sign * 1.23, 1.66, z - .15, .13, 3.33, .19, p.walnut);
    world.box(sign * .58, 1.62, z - .175, 1.12, 3.10, .08, p.panel);
    for (const [y, h] of [[.67, .89], [2.17, 1.52]]) {
      world.box(sign * .58, y, z - .228, .83, h, .06, p.railHighlight);
      world.box(sign * .58, y, z - .265, .75, h - .09, .034, p.panelInset);
      world.box(sign * .58, y, z - .287, .63, h - .20, .016, p.panel);
    }
    world.box(sign * .143, .99, z - .245, .16, .37, .032, p.brassDark);
    world.torus(sign * .14, 1.035, z - .282, .059, .012, p.brass, {}, TAU, 20);
    world.sphere(sign * .14, 1.106, z - .289, .024, .023, .017, p.gold);
    for (const y of [.30, 1.39, 2.83]) {
      world.box(sign * 1.003, y, z - .282, .19, .048, .029, p.brassDark);
      world.sphere(sign * 1.021, y, z - .300, .013, .013, .012, p.brass);
    }
  }
  world.box(0, 3.28, z - .146, 2.74, .21, .21, p.walnut);
  world.box(0, 3.41, z - .208, 2.9, .08, .26, p.dark);
  world.box(0, 3.64, z - .070, 1.49, .40, .13, p.rail);
  world.plane(0, 3.64, z - .139, 1.44, .374,
    placard(p.renderer, 'Main entrance', 'WARDROBE OF THE MERIDIAN COURT'), { ry: PI });
}

function lightCarpet(world, p) {
  const map = texture(128, 160, (ctx, w, h) => {
    const halo = ctx.createRadialGradient(w * .50, h * .50, 4, w * .50, h * .50, w * .55);
    halo.addColorStop(0, '#c7e6ff5d');
    halo.addColorStop(.63, '#c5dff931');
    halo.addColorStop(1, '#c4def400');
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, w, h);
  }, p.renderer);
  const tint = new THREE.MeshBasicMaterial({
    map, transparent: true, blending: THREE.AdditiveBlending, opacity: .49, depthWrite: false,
    polygonOffset: true, polygonOffsetFactor: -1,
  });
  for (const [x, z, w, d, yaw] of [[-3.28, 5.5, 4.35, 3.24, -.50], [3.75, 5.47, 2.84, 2.64, -.78],
    [-2.68, -7.43, 4.75, 3.58, -.48], [2.53, -11.37, 4.87, 3.33, .48]]) {
    world.plane(x, .026, z, w, d, tint, { rx: -PI / 2, rz: yaw });
  }
}

export function buildArchitecture(world, p) {
  const span = entry - rear, mid = (entry + rear) / 2, width = right - left;
  const random = rng(192);
  world.zone = 'base';
  world.box(0, -.113, mid, width + .4, .20, span + .35, p.under);
  const roomSegments = [[rear, workshop], [workshop, archive], [archive, entry]];
  for (const [first, last] of roomSegments) {
    world.zone = 'floor-' + first;
    for (let row = 0; row < 37; row++) {
      const plankWidth = width / 37;
      const x = left + (row + .5) * plankWidth;
      let z = first - ((row * 1.02) % 2.3);
      while (z < last - .01) {
        const next = z + 1.52 + random() * 1.32;
        const lo = Math.max(z, first), hi = Math.min(next, last);
        if (hi - lo > .015) {
          world.box(x, -.013, (hi + lo) / 2, plankWidth - .007, .025, hi - lo - .009,
            p.floor[Math.floor(random() * p.floor.length)]);
        }
        z = next;
      }
    }
    for (const x of [left + .12, right - .12]) world.box(x, .003, (first + last) / 2, .195, .009, last - first, p.darkOak);
  }

  world.zone = 'walls';
  for (const x of [left, right]) {
    const facing = x < 0 ? 1 : -1;
    world.box(x - facing * .119, ceiling / 2, mid, .24, ceiling, span, p.plaster);
    world.block(x - facing * .119, mid, .24, span + .48);
    sidePanels(world, p, x + facing * .018, rear, entry, facing);
  }
  for (const z of [entry, rear]) {
    const facing = z < 0 ? 1 : -1;
    world.box(0, ceiling / 2, z - facing * .119, width + .48, ceiling, .24, p.plaster);
    world.block(0, z - facing * .119, width + .48, .24);
    wallPanels(world, p, left, right, z + facing * .018, facing);
  }

  world.zone = 'roof';
  world.box(0, 4.278, mid, width + .2, .105, span + .2, p.ceiling);
  for (const [start, end] of roomSegments) {
    const n = Math.ceil((end - start) / 1.78);
    const stride = (end - start) / n;
    for (let i = 0; i <= n; i++) {
      const z = start + stride * i;
      world.box(0, 4.12, z, width, .265, .22, p.rail);
      world.box(0, 3.971, z, width, .061, .147, p.railHighlight);
      for (const x of [-4.75, 4.75]) world.box(x, 3.93, z, 1.16, .16, .27, p.rail);
      for (const x of [-2.62, 0, 2.62]) {
        world.cyl(x, 3.938, z, .034, .034, .021, p.brassDark, {}, 10);
      }
    }
    for (const x of [-3.36, 3.36]) {
      world.box(x, 4.150, (start + end) / 2, .143, .184, end - start, p.rail);
      world.box(x, 4.047, (start + end) / 2, .086, .033, end - start, p.railHighlight);
    }
  }
  masonryOpening(world, p, archive, ['Cloth archive', 'STOCK  •  SAMPLES'], ['Fitting room', 'ENTRANCE  •  DAIS']);
  masonryOpening(world, p, workshop, ['Workroom', 'THE WINTER COMMISSION'], ['Cloth archive', 'RETURN TO FITTING ROOM']);

  const glass = exteriorGlass(p.renderer);
  world.zone = 'windows-fit';
  windowWell(world, p, glass, left + .071, 5.27, PI / 2, 2.62, 1.19, 3.10, .62);
  windowWell(world, p, glass, right - .071, 5.82, -PI / 2, 2.48, 1.22, 3.08, .59);
  world.zone = 'windows-archive';
  windowWell(world, p, glass, left + .07, -1.65, PI / 2, 3.01, 2.77, 3.39, .35);
  windowWell(world, p, glass, right - .07, -1.65, -PI / 2, 3.01, 2.77, 3.39, .35);
  world.zone = 'windows-work';
  windowWell(world, p, glass, left + .07, -8.06, PI / 2, 2.63, 1.28, 3.09, .60);
  windowWell(world, p, glass, right - .07, -10.70, -PI / 2, 2.48, 1.30, 3.09, .60);
  for (const x of [-2.92, 2.92]) windowWell(world, p, glass, x, rear + .07, 0, 2.27, 1.07, 3.01, .71);

  world.zone = 'entry-and-sconces';
  door(world, p);
  wallLights(world, p, -1.90, entry - .071, PI, 2.32);
  wallLights(world, p, 1.90, entry - .071, PI, 2.32);
  wallLights(world, p, left + .06, 2.54, PI / 2, 2.45);
  wallLights(world, p, right - .06, 2.54, -PI / 2, 2.45);
  wallLights(world, p, left + .06, -11.36, PI / 2, 2.60);
  wallLights(world, p, right - .06, -6.08, -PI / 2, 2.58);
  lightCarpet(world, p);
}

