import { fixture, grip, plate, screw, vent } from './props.js';

export const hall = {
  width: 5.8, ceiling: 2.86, start: 7.35, end: -8.19,
  study: { x: 0.68, z: 1.98, width: 2.40 },
  observation: { x: 0.38, z: -3.40, width: 2.54 }
};

export function clipped(width, bottom, top, cornerX, cornerY = cornerX) {
  const edge = width / 2;
  return [[-edge + cornerX, bottom], [edge - cornerX, bottom],
    [edge, bottom + cornerY], [edge, top - cornerY],
    [edge - cornerX, top], [-edge + cornerX, top],
    [-edge, top - cornerY], [-edge, bottom + cornerY]];
}

export function hull(k, m) {
  const depth = hall.start - hall.end;
  const center = (hall.start + hall.end) * 0.5;
  k.box(m.deckDark, 0, -.108, center, hall.width + .24, .184, depth + .19);
  k.box(m.graphite, 0, 2.898, center, hall.width + .24, .123, depth + .19);
  for (const side of [-1, 1]) {
    k.box(m.substrate, side * 2.98, 1.44, center, .18, 2.92, depth + .2);
    k.block('pressure hull', side * 3.03, center, .37, depth + .4);
  }
  k.block('entrance hatch', 0, hall.start + .045, 6.18, .21);
  k.block('observation sill', 0, -8.02, 6.18, .76);
  k.finish('Pressure hull').renderOrder = 8;
}

function sideWall(k, m, side, lower, upper, zone) {
  const size = upper - lower;
  const middle = (upper + lower) / 2;
  const yaw = side === -1 ? Math.PI / 2 : -Math.PI / 2;
  const widths = zone === 'observation' ? 4 : 5;
  const groupX = side * 2.865;
  k.group(groupX, 0, middle, yaw, () => {
    k.box(m.graphite, 0, .116, .026, size + .012, .217, .061, .007);
    k.box(m.nickel, 0, .227, .058, size + .012, .022, .016, .004);
    k.box(m.gasket, 0, .720, .038, size, .023, .022);
    k.box(m.darkMetal, 0, 2.342, .041, size, .048, .043, .005);
    k.box(m.gasket, 0, 2.289, .038, size, .022, .02);
    const stride = size / widths;
    for (let i = 0; i < widths; i++) {
      const x = (i + .5 - widths * .5) * stride;
      const low = zone === 'observation' ? m.lining : (i % 3 === 2 ? m.mushroom : m.greige);
      const high = zone === 'observation' ? (i % 3 ? m.mushroom : m.greige) : (i % 4 === 0 ? m.greige : m.chalk);
      k.box(low, x, .474, .029, stride - .014, .467, .061, .009);
      k.box(high, x, 1.508, .028, stride - .017, 1.545, .066, .011);
      k.box(m.substrate, x, 2.433, .022, stride - .013, .119, .048, .007);
      for (const end of [-1, 1]) {
        screw(k, m, x + end * (stride * .5 - .059), .657, .062, { size: .007 });
        screw(k, m, x + end * (stride * .5 - .059), 2.218, .064, { size: .009 });
      }
    }
    if (zone !== 'observation') {
      vent(k, m, size * .39, .46, .065, .49, .121, 11);
    }
  });
}

function floor(k, m, lower, upper, zone) {
  const size = upper - lower;
  const middle = (upper + lower) / 2;
  const floorMaterial = zone === 'observation' ? m.deckDark : m.deck;
  const strips = zone === 'observation' ? 3 : 4;
  for (let i = 0; i < strips; i++) {
    const pitch = size / strips;
    const z = lower + (i + .5) * pitch;
    k.box(floorMaterial, -1.625, -.027, z, 2.44, .056, pitch - .017, .005);
    k.box(m.runway, .595, -.026, z, 1.973, .057, pitch - .017, .004);
    k.box(floorMaterial, 2.229, -.027, z, 1.261, .056, pitch - .017, .004);
  }
  for (const x of [-2.82, -.405, 1.588, 2.84]) {
    k.box(x === -.405 || x === 1.588 ? m.nickel : m.graphite,
      x, -.001, middle, .014, .009, size, .002);
  }
  for (const z of [lower + .18, upper - .18]) {
    for (const x of [-.36, 1.55]) {
      k.box(m.orange, x, .004, z, .018, .002, .107);
    }
  }
}

function ceiling(k, m, lower, upper, zone) {
  const size = upper - lower;
  const middle = (lower + upper) * .5;
  for (const side of [-1, 1]) {
    k.box(m.graphite, side * 2.44, 2.69, middle, .072, .089, size, .015);
    k.box(m.nickel, side * 2.46, 2.648, middle, .026, .018, size, .004);
    k.box(m.substrate, side * 1.895, 2.781, middle, 1.083, .137, size, .02);
    k.box(m.gasket, side * 1.33, 2.795, middle, .024, .112, size, .007);
    k.box(m.darkMetal, side * 1.309, 2.764, middle, .021, .072, size, .005);
  }
  const sections = zone === 'observation' ? 4 : 5;
  for (let i = 0; i < sections; i++) {
    const z0 = lower + size / sections * i + .007;
    const z1 = lower + size / sections * (i + 1) - .007;
    const z = (z0 + z1) * .5;
    const bevelMat = i % 3 === 1 ? m.mushroom : m.greige;
    k.quad(bevelMat, [[-2.867, 2.454, z0], [-2.453, 2.719, z0], [-2.453, 2.719, z1], [-2.867, 2.454, z1]]);
    k.quad(bevelMat, [[2.453, 2.719, z0], [2.867, 2.454, z0], [2.867, 2.454, z1], [2.453, 2.719, z1]]);
    k.box(i % 3 === 0 ? m.chalk : m.mushroom, 0, 2.819, z, 2.58, .057, z1 - z0, .009);
    for (const side of [-1, 1]) {
      k.box(m.lining, side * 1.887, 2.730, z, .779, .029, z1 - z0 - .12, .006);
    }
  }
  if (zone === 'bedroom') {
    fixture(k, m, .81, 2.767, 5.89, .112, 1.17, m.whiteLight);
    fixture(k, m, .81, 2.767, 2.81, .112, .72, m.whiteLight);
  } else if (zone === 'study') {
    fixture(k, m, -.27, 2.769, -.71, .187, 1.90, m.whiteLight);
    fixture(k, m, .83, 2.766, -2.68, .121, .64, m.whiteLight);
  } else {
    fixture(k, m, 1.00, 2.763, -4.39, .155, .99, m.coolLight);
    fixture(k, m, -.97, 2.763, -6.12, .105, 1.43, m.coolLight);
  }
}

export function shellRoom(k, m, lower, upper, zone) {
  floor(k, m, lower, upper, zone);
  ceiling(k, m, lower, upper, zone);
  sideWall(k, m, -1, lower, upper, zone);
  sideWall(k, m, 1, lower, upper, zone);
}

function doorSkin(k, m, width, plaque) {
  const outer = clipped(width + .38, -.004, 2.69, .26, .23);
  const surround = clipped(width + .16, .005, 2.562, .204, .199);
  const inner = clipped(width + .044, .011, 2.473, .172, .166);
  const clear = clipped(width, .017, 2.425, .147, .142);
  k.profile(m.graphite, outer, surround, .192, .233);
  k.profile(m.nickel, surround, inner, .233, .173);
  k.profile(m.gasket, inner, clear, .173, .124);
  k.profile(m.lining, clear, clear, .124, -.002);
  const half = width * .5;
  for (const side of [-1, 1]) {
    const x = side * (half + .12);
    for (const y of [.31, .74, 1.46, 2.16]) {
      screw(k, m, x, y, .215, { size: .010 });
    }
    k.box(m.darkMetal, x, .105, .224, .099, .122, .052, .018);
    k.box(m.orange, x, .143, .253, .055, .008, .004);
    k.box(m.greenLine, x, 1.231, .227, .015, .10, .005, .003);
  }
  plate(k, m, plaque, 0, 2.561, .238, .835, .109);
}

export function portal(k, m, opening, nearPlaque, farPlaque, name) {
  const { x, z, width } = opening;
  const leftEdge = x - width * .5, rightEdge = x + width * .5;
  const leftWidth = leftEdge + 2.91, rightWidth = 2.91 - rightEdge;
  k.box(m.lining, -2.91 + leftWidth * .5, 1.427, z, leftWidth, 2.861, .248, .01);
  k.box(m.lining, rightEdge + rightWidth * .5, 1.427, z, rightWidth, 2.861, .248, .01);
  k.box(m.lining, x, 2.656, z, width + .03, .421, .249, .01);
  for (const side of [-1, 1]) {
    k.group(x, 0, z, side === 1 ? 0 : Math.PI, () => doorSkin(k, m, width, side === 1 ? nearPlaque : farPlaque));
    k.group(0, 0, z + .131 * side, side === 1 ? 0 : Math.PI, () => {
      for (const [worldX, w] of [[-2.91 + leftWidth * .5, leftWidth], [rightEdge + rightWidth * .5, rightWidth]]) {
        const p = worldX * side;
        k.box(m.greige, p, 1.279, .010, w - .131, 2.334, .036, .013);
        k.box(m.graphite, p, .204, .035, w - .127, .186, .017, .004);
        k.box(m.lining, p, 2.22, .033, w - .155, .16, .014, .007);
        k.box(m.darkMetal, p, .821, .035, w - .144, .018, .014, .003);
      }
    });
  }
  k.box(m.darkMetal, x, .004, z, width + .088, .021, .42, .008);
  for (const d of [-.153, -.109, .109, .153]) {
    k.box(m.nickel, x, .016, z + d, width - .105, .004, .018, .002);
  }
  k.block(name + ' left jamb', -2.91 + leftWidth * .5, z, leftWidth + .02, .421);
  k.block(name + ' right jamb', rightEdge + rightWidth * .5, z, rightWidth + .02, .421);
  return k.finish(name);
}

export function entrance(k, m, g) {
  k.group(0, 0, hall.start, Math.PI, () => {
    k.box(m.substrate, 0, 1.45, -.04, 5.9, 2.9, .15);
    for (const side of [-1, 1]) {
      k.box(m.greige, -side * 2.03, 1.49, .049, 1.63, 2.72, .074, .023);
      k.box(m.chalk, -side * 2.03, 1.446, .097, 1.52, 1.85, .031, .013);
      k.box(m.lining, -side * 2.03, .353, .095, 1.52, .297, .037, .016);
      vent(k, m, side * 2.19, .36, .120, .54, .091, 12);
    }
    const outer = clipped(2.44, .026, 2.65, .27);
    const inner = clipped(2.11, .039, 2.497, .18);
    k.profile(m.graphite, outer, inner, .144, .083);
    k.polygon(m.ink, inner, .071);
    for (const side of [-1, 1]) {
      k.box(m.mushroom, side * .496, 1.234, .093, .968, 2.326, .09, .063);
      k.box(m.greige, side * .496, 1.242, .148, .872, 2.201, .033, .042);
      k.box(m.lining, side * .496, .679, .17, .866, .192, .017, .012);
      k.box(m.mushroom, side * .496, 1.673, .17, .866, .149, .015, .012);
      grip(k, m, side * .273, 1.057, .172, .167);
    }
    k.box(m.gasket, 0, 1.232, .141, .023, 2.293, .012);
    plate(k, m, g.berth, 0, 2.603, .164, 1.06, .128);
    plate(k, m, g.hullMark, 1.873, 1.578, .127, .657, .105);
    k.box(m.graphite, 1.319, 1.169, .140, .194, .32, .072, .025);
    k.box(m.gasket, 1.319, 1.231, .180, .139, .088, .012, .008);
    k.box(m.greenLine, 1.319, 1.240, .187, .079, .012, .005, .002);
    for (let i = 0; i < 3; i++) {
      k.box(m.nickel, 1.271 + i * .048, 1.119, .183, .031, .027, .011, .004);
    }
    k.box(m.darkMetal, 0, .005, .154, 2.09, .019, .222, .013);
  });
}
