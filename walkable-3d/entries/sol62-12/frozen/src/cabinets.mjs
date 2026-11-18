import * as THREE from '../vendor/three.module.min.js';
import { borderPlate, serviceCard } from './graphics.mjs';
import { deckArt, glassFilm, label, marquee, paint, random, screenArt, sideArt, tracking } from './art.mjs';
import { feature, games } from './layout.mjs';
import { curvedDisplay, group, profileShell } from './mesh.mjs';

const orbitProfile = [
  [-0.49, 0.055], [0.43, 0.055], [0.47, 0.13], [0.475, 0.90],
  [0.64, 1.016], [0.63, 1.105], [0.36, 1.20], [0.245, 1.794],
  [0.535, 1.884], [0.56, 2.139], [0.44, 2.26], [-0.355, 2.26],
  [-0.49, 2.115],
];

const relayProfile = [
  [-0.46, 0.048], [0.415, 0.048], [0.46, 0.12], [0.403, 0.89],
  [0.648, 0.999], [0.639, 1.090], [0.37, 1.185], [0.275, 1.904],
  [0.45, 1.967], [0.509, 2.205], [0.366, 2.374], [-0.276, 2.374],
  [-0.469, 2.139],
];

const featureProfile = [
  [-0.646, 0.052], [0.61, 0.052], [0.648, 0.12], [0.597, 0.809],
  [0.854, 0.965], [0.871, 1.087], [0.552, 1.23], [0.464, 1.345],
  [0.336, 2.018], [0.553, 2.09], [0.594, 2.347], [0.518, 2.495],
  [0.361, 2.589], [-0.376, 2.589], [-0.585, 2.408], [-0.646, 2.185],
];

const fins = [
  [-0.534, 0.114], [0.315, 0.114], [0.275, 0.318], [0.20, 0.52],
  [0.038, 0.84], [-0.068, 1.14], [-0.113, 1.49], [-0.003, 1.78],
  [0.166, 2.055], [0.228, 2.205], [0.174, 2.422], [0.013, 2.626],
  [-0.170, 2.788], [-0.328, 2.639], [-0.469, 2.388], [-0.534, 2.071],
];

const rubber = '#202029';
const bareSteel = '#a49fa1';
const agedGold = '#b69265';



function parts(kit) {
  return {
    black: kit.material(rubber, { gloss: 19, finish: 'paint' }),
    steel: kit.material(bareSteel, { gloss: 90, finish: 'metal', shine: '#8c9ba4' }),
    brass: kit.material(agedGold, { gloss: 72, finish: 'metal', shine: '#cc9867' }),
    darkSteel: kit.material('#43414a', { gloss: 56, finish: 'metal', shine: '#586374' }),
    grille: kit.material('#14191d', { gloss: 8, finish: 'metal' }),
    lens: kit.material('#ffd99b', { flat: true }),
    pin: kit.material('#d7d0c0', { gloss: 98, shine: '#a9aeb0' }),
    pinShadow: kit.material('#181921', { gloss: 35 }),
    darkGlass: kit.material('#131f27', { gloss: 126, shine: '#b0c3d3' }),
    film: kit.material('#ffffff', { map: glassFilm(), flat: true, blend: true, alpha: 0.7 }),
  };
}

function screw(kit, shared, parent, x, y, z, radius = 0.009, angle = 0) {
  const cap = kit.cylinder(parent, shared.pin, x, y, z, radius * 0.91, 0.004, radius, 10);
  cap.rotation.x = Math.PI / 2;
  const slot = kit.box(parent, shared.pinShadow, x, y, z + 0.0025, radius * 1.16, radius * 0.21, 0.0015);
  slot.rotation.z = angle;
}

function gasket(kit, parent, radius, x, z, material) {
  return kit.cylinder(parent, material, x, 0.014, z, radius, 0.017, radius * 1.03, 20);
}

function button(kit, shared, parent, x, z, color, radius = 0.021, square = false) {
  const plastic = kit.material(color, { gloss: 98, shine: '#bbbbba' });
  if (square) {
    kit.box(parent, shared.darkSteel, x, 0.015, z, radius * 2.4, 0.016, radius * 2.28, 0.006);
    kit.box(parent, plastic, x, 0.027, z, radius * 2.03, 0.016, radius * 1.91, 0.007);
  } else {
    gasket(kit, parent, radius * 1.18, x, z, shared.darkSteel);
    kit.lathe(parent, plastic, x, 0.017, z, [
      [0.0, 0.001], [radius * 0.95, 0.001], [radius, 0.007],
      [radius * 0.94, 0.018], [radius * 0.78, 0.021], [0, 0.022],
    ], 24);
  }
}

function joystick(kit, shared, parent, x, z, color, tall = false) {
  gasket(kit, parent, 0.044, x, z, shared.darkSteel);
  kit.lathe(parent, shared.black, x, 0.017, z, [
    [0.039, 0], [0.040, 0.004], [0.031, 0.008], [0.020, 0.012], [0.011, 0.018],
  ], 22);
  kit.cylinder(parent, shared.steel, x, tall ? 0.056 : 0.047, z, 0.009, tall ? 0.060 : 0.044, 0.010, 16);
  kit.ball(parent, kit.material(color, { gloss: 105, shine: '#e9d0ad' }),
    x, tall ? 0.096 : 0.079, z, tall ? 0.026 : 0.030, tall ? 1.18 : 0.98);
}

function spinner(kit, shared, parent, x, z, color, radius = 0.047, index = false) {
  gasket(kit, parent, radius + 0.010, x, z, shared.steel);
  const knob = kit.material(color, { gloss: 49, shine: '#977f8f' });
  kit.lathe(parent, knob, x, 0.02, z, [
    [radius * 0.84, 0], [radius, 0.008], [radius, 0.027],
    [radius * 0.95, 0.033], [radius * 0.79, 0.040], [0, 0.040],
  ], 24);
  for (let n = 0; n < 16; n += 1) {
    const angle = n * Math.PI / 8;
    kit.cylinder(parent, shared.black, x + Math.cos(angle) * radius, 0.037,
      z + Math.sin(angle) * radius, 0.0023, 0.021, 0.0023, 5);
  }
  if (index) kit.box(parent, shared.lens, x, 0.061, z - radius * 0.37, 0.007, 0.002, radius * 0.64, 0.001);
}

function trackball(kit, shared, parent, x, z) {
  gasket(kit, parent, 0.065, x, z, shared.steel);
  kit.lathe(parent, shared.black, x, 0.019, z, [[0.060, 0], [0.058, 0.013], [0.050, 0.017], [0.047, 0.004]], 24);
  kit.ball(parent, kit.material('#edca85', { gloss: 132, shine: '#fff1d0' }), x, 0.016, z, 0.047, 1);
}

function displayFace(kit, shared, machine, game, width, height, y, z, tilt) {
  const face = group(machine, 0, y, z, tilt);
  const frameAccent = game.family === 'orbit' || game.family === 'feature' ? shared.brass : shared.steel;
  const screenWidth = width - (game.family === 'feature' ? 0.253 : game.family === 'relay' ? 0.210 : 0.120);
  const screenHeight = height - (game.family === 'orbit' ? 0.081 : 0.106);
  kit.box(face, shared.black, 0, 0, 0.013, width + 0.018, height + 0.018, 0.063, 0.019);
  kit.box(face, frameAccent, 0, 0, 0.045, width, height, 0.023, 0.008);
  kit.box(face, shared.darkGlass, 0, 0, 0.058, width - 0.020, height - 0.022, 0.025, 0.008);
  const hRail = (height - screenHeight - 0.024) * 0.5;
  const vRail = (width - screenWidth - 0.021) * 0.5;
  for (const side of [-1, 1]) {
    kit.box(face, shared.darkGlass, 0, side * (screenHeight * 0.5 + hRail * 0.5), 0.077,
      width - 0.032, hRail, 0.047, 0.014);
    kit.box(face, shared.darkGlass, side * (screenWidth * 0.5 + vRail * 0.5), 0, 0.077,
      vRail, screenHeight + 0.014, 0.043, 0.013);
    for (const corner of [-1, 1]) screw(kit, shared, face, side * (width / 2 - 0.025),
      corner * (height / 2 - 0.026), 0.101, 0.006, side * corner * 0.66);
  }
  const depth = game.family === 'feature' ? 0.024 : 0.017;
  curvedDisplay(face, screenWidth, screenHeight, depth, kit.litSign(screenArt(game)), 0.077);
  const film = curvedDisplay(face, screenWidth, screenHeight, depth, shared.film, 0.0795);
  film.renderOrder = 3;
  const indicator = kit.material(game.second, { flat: true });
  kit.box(face, indicator, width * 0.41, -height * 0.5 + 0.029, 0.102, 0.022, 0.006, 0.002, 0.001);
}

function lightbox(kit, shared, parent, game, width, height, y, z, tilt = 0) {
  const face = group(parent, 0, y, z, tilt);
  const trim = game.family === 'relay' ? shared.steel : shared.brass;
  kit.box(face, shared.black, 0, 0, 0.007, width + 0.024, height + 0.025, 0.068, 0.022);
  kit.box(face, trim, 0, 0, 0.037, width, height, 0.032, 0.009);
  kit.box(face, shared.darkGlass, 0, 0, 0.050, width - 0.018, height - 0.020, 0.013, 0.004);
  kit.plane(face, kit.litSign(marquee(game)), 0, 0, 0.058, width - 0.034, height - 0.031);
  for (const side of [-1, 1]) {
    kit.box(face, trim, 0, side * (height / 2 - 0.007), 0.058, width - 0.010, 0.010, 0.015, 0.0035);
    screw(kit, shared, face, side * (width / 2 - 0.014), 0, 0.061, 0.006, side * 0.51);
  }
}

function vent(kit, shared, parent, width, height, lines, vertical = false) {
  kit.box(parent, shared.darkSteel, 0, 0, 0, width, height, 0.022, 0.008);
  kit.box(parent, shared.grille, 0, 0, 0.013, width - 0.016, height - 0.016, 0.008, 0.003);
  const span = vertical ? width - 0.033 : height - 0.031;
  for (let i = 0; i < lines; i += 1) {
    const along = (i / (lines - 1) - 0.5) * span;
    kit.box(parent, shared.darkSteel, vertical ? along : 0, vertical ? 0 : along, 0.019,
      vertical ? 0.004 : width - 0.028, vertical ? height - 0.033 : 0.004, 0.005, 0.001);
  }
  for (const side of [-1, 1]) {
    screw(kit, shared, parent, side * (width / 2 - 0.009), height / 2 - 0.009, 0.018, 0.0045, 0.5);
  }
}

function coinDoor(kit, shared, parent, tag, width, height, twins) {
  kit.box(parent, shared.black, 0, 0, 0, width + 0.024, height + 0.024, 0.034, 0.014);
  kit.box(parent, shared.steel, 0, 0, 0.018, width, height, 0.021, 0.009);
  kit.box(parent, shared.darkSteel, 0, 0, 0.031, width - 0.020, height - 0.024, 0.013, 0.006);
  for (const side of [-1, 1]) {
    for (const corner of [-1, 1]) {
      screw(kit, shared, parent, side * (width / 2 - 0.021), corner * (height / 2 - 0.024), 0.040,
        0.0065, 0.77 + side * corner * 0.26);
    }
  }
  const red = kit.material('#e68758', { flat: true });
  for (const x of twins ? [-0.078, 0.078] : [0]) {
    kit.box(parent, shared.black, x, height * 0.225, 0.044, 0.069, 0.084, 0.026, 0.007);
    kit.box(parent, red, x, height * 0.225, 0.059, 0.052, 0.067, 0.012, 0.004);
    kit.plane(parent, tag, x, height * 0.225 + 0.010, 0.066, 0.046, 0.030);
    kit.box(parent, shared.black, x, height * 0.225 - 0.018, 0.066, 0.027, 0.004, 0.003, 0.0008);
    kit.box(parent, shared.steel, x, -height * 0.20, 0.044, 0.078, 0.062, 0.019, 0.006);
    kit.box(parent, shared.darkGlass, x, -height * 0.20, 0.054, 0.060, 0.043, 0.004, 0.0015);
    kit.box(parent, shared.darkSteel, x, -height * 0.21, 0.058, 0.051, 0.030, 0.006, 0.002);
  }
  kit.cylinder(parent, shared.steel, width * 0.36, 0, 0.047, 0.014, 0.015, 0.014, 14).rotation.x = Math.PI / 2;
  kit.box(parent, shared.pinShadow, width * 0.36, 0, 0.056, 0.0025, 0.012, 0.0015);
}

function scuffMaterial(kit) {
  const texture = paint(512, 192, (ctx, w, h) => {
    const rng = random(291);
    for (let i = 0; i < 860; i += 1) {
      const x = rng() * w;
      const y = h - (rng() ** 3.4) * (h - 2);
      const spread = Math.abs(x - w * 0.48) / (w * 0.5);
      ctx.globalAlpha = (0.15 + rng() * 0.28) * (1 - spread * 0.7);
      ctx.fillStyle = i % 3 === 0 ? '#d9b48f' : '#84767a';
      ctx.fillRect(x, y, 0.5 + rng() ** 4 * 17, 0.55 + rng() * 1.7);
    }
    ctx.globalAlpha = 1;
  });
  return kit.material('#ffffff', { map: texture, flat: true, blend: true, alpha: 0.65 });
}

function deck(kit, shared, parent, game, width, depth, y, z, slope) {
  const controls = group(parent, 0, y, z, slope);
  kit.box(controls, shared.black, 0, -0.017, 0, width + 0.028, 0.057, depth + 0.028, 0.024);
  kit.box(controls, game.family === 'relay' ? shared.steel : shared.brass, 0, 0.002, 0,
    width, 0.029, depth, 0.010);
  const art = kit.material('#ffffff', { map: deckArt(game), gloss: 33, shine: '#3f3d43' });
  const laminate = kit.plane(controls, art, 0, 0.0172, 0, width - 0.023, depth - 0.024, 6, 3);
  laminate.rotation.x = -Math.PI / 2;
  for (const side of [-1, 1]) {
    for (const corner of [-1, 1]) {
      const hole = group(controls, side * (width / 2 - 0.018), 0.018, corner * (depth / 2 - 0.018), -Math.PI / 2);
      screw(kit, shared, hole, 0, 0, 0, 0.006, side * corner * 0.49);
    }
  }

  if (game.family === 'feature') {
    joystick(kit, shared, controls, -0.555, -0.015, '#e9ad65', true);
    joystick(kit, shared, controls, 0.232, -0.015, '#70c7c2', true);
    spinner(kit, shared, controls, -0.03, -0.070, '#304d55', 0.046, true);
    for (const side of [-1, 1]) {
      const start = side < 0 ? -0.390 : 0.422;
      for (let i = 0; i < 3; i += 1) {
        button(kit, shared, controls, start + 0.085 * i, 0.031 - 0.055 * Math.sin(i * 0.84),
          ['#e0a66d', '#f1d4a2', '#d57369'][i], 0.027);
      }
    }
    button(kit, shared, controls, -0.050, 0.097, '#c7d3bc', 0.012, true);
    button(kit, shared, controls, 0.046, 0.097, '#c7d3bc', 0.012, true);
  } else if (game.controls === 'trackball') {
    trackball(kit, shared, controls, -0.167, -0.002);
    button(kit, shared, controls, 0.075, 0.004, '#eee1ba', 0.026);
    button(kit, shared, controls, 0.161, -0.029, '#efab56', 0.025);
    button(kit, shared, controls, 0.249, -0.052, '#a45b5c', 0.023);
    button(kit, shared, controls, 0.300, 0.095, '#fcdb86', 0.013);
  } else if (game.controls === 'dials') {
    spinner(kit, shared, controls, -0.228, -0.027, '#665f83', 0.045, true);
    spinner(kit, shared, controls, 0.218, -0.027, '#536783', 0.045, true);
    button(kit, shared, controls, -0.071, 0.016, '#c9b5f1', 0.022, true);
    button(kit, shared, controls, 0.070, 0.016, '#e4d4da', 0.022, true);
  } else {
    const orbit = game.family === 'orbit';
    joystick(kit, shared, controls, -0.213, -0.022, orbit ? '#cf6d54' : '#79c3a0', !orbit);
    for (let i = 0; i < 3; i += 1) {
      button(kit, shared, controls, 0.034 + 0.085 * i, -0.017 - 0.048 * Math.sin(i * 0.88),
        i === 0 ? game.second : i === 1 ? game.bright : game.pale, 0.023, !orbit);
    }
    button(kit, shared, controls, width * 0.378, 0.080, '#eee2c6', 0.012, !orbit);
  }
}

function shoe(kit, shared, parent, width, front, depth, wear) {
  kit.box(parent, shared.black, 0, 0.062, front - depth * 0.5, width, 0.125, depth, 0.030);
  kit.box(parent, shared.darkSteel, 0, 0.106, front + 0.004, width - 0.016, 0.116, 0.035, 0.010);
  kit.box(parent, shared.steel, 0, 0.153, front + 0.022, width - 0.046, 0.009, 0.010, 0.002);
  const scuffs = kit.plane(parent, wear, 0, 0.102, front + 0.023, width - 0.021, 0.105);
  scuffs.renderOrder = 2;
  for (const side of [-1, 1]) {
    screw(kit, shared, parent, side * (width / 2 - 0.045), 0.109, front + 0.026, 0.006, side * 0.72);
  }
}

function rearHardware(kit, shared, parent, width, z, game) {
  const rear = group(parent, 0, 0.86, z, 0, Math.PI);
  kit.box(rear, shared.black, 0, 0.14, 0, width * 0.83, 0.99, 0.032, 0.012);
  kit.box(rear, kit.material(game.shade, { gloss: 13, finish: 'paint' }), 0, 0.14, 0.020, width * 0.80, 0.95, 0.020, 0.007);
  const upper = group(rear, 0, 0.45, 0.036);
  vent(kit, shared, upper, width * 0.57, 0.159, 8);
  for (const side of [-1, 1]) {
    for (const dy of [-0.274, 0.551]) screw(kit, shared, rear, side * width * 0.363, dy, 0.032, 0.007, side * 0.97);
  }
  kit.plane(rear, kit.material('#ffffff', { map: serviceCard(game.name, game.station), gloss: 16 }),
    0, 0.22, 0.033, Math.min(0.28, width * 0.43), 0.083);
  kit.box(rear, shared.black, 0, -0.31, 0.025, 0.061, 0.052, 0.047, 0.006);
  const cable = kit.material('#171a1f', { gloss: 28 });
  kit.path(rear, cable, [[0, -0.31, 0.049], [0, -0.43, 0.070], [0.041, -0.59, 0.075],
    [0.057, -0.744, 0.062], [0.094, -0.786, 0.039]], 0.006, 8);
}

function upright(kit, shared, world, game, tokenTag, wear) {
  const orbit = game.family === 'orbit';
  const p = orbit ? orbitProfile : relayProfile;
  const cabinet = group(world, game.x, 0, game.z, 0, game.yaw);
  const band = kit.material(game.shade, { finish: 'paint', gloss: 20, shine: '#57404a' });
  const art = kit.material('#ffffff', { map: sideArt(game), gloss: 25, shine: '#4e4750' });
  const trim = kit.material(orbit ? game.bright : game.second, { finish: orbit ? 'paint' : 'metal', gloss: 58, shine: '#8a8d9b' });
  const width = game.width;

  profileShell(cabinet, p, width, band, art);
  for (const side of [-1, 1]) {
    kit.path(cabinet, shared.black, p.map(([z, y]) => [side * (width / 2 + 0.001), y, z]), 0.019, 9);
    kit.path(cabinet, trim, p.slice(1, 12).map(([z, y]) => [side * (width / 2 + 0.008), y, z + 0.003]), orbit ? 0.010 : 0.007, 8);
    for (const [y, z] of [[0.21, 0.342], [1.11, 0.347], [1.97, -0.290]]) {
      const service = group(cabinet, side * (width / 2 + 0.001), y, z, 0, side * Math.PI / 2);
      screw(kit, shared, service, 0, 0, 0.002, 0.008, side * 0.69);
    }
  }

  shoe(kit, shared, cabinet, width - 0.014, orbit ? 0.472 : 0.455, 0.922, wear);
  const lower = group(cabinet, 0, 0.54, orbit ? 0.474 : 0.431, orbit ? 0.002 : -0.063);
  const coinWidth = orbit ? 0.232 : 0.198;
  const coinHeight = orbit ? 0.323 : 0.312;
  coinDoor(kit, shared, lower, tokenTag, coinWidth, coinHeight, false);
  const strip = kit.material(game.second, { finish: 'paint', gloss: 23 });
  for (const side of [-1, 1]) {
    kit.box(lower, strip, side * (width / 2 - 0.096), 0.018, 0.008, orbit ? 0.013 : 0.031,
      orbit ? 0.425 : 0.393, 0.013, 0.004);
    if (orbit) {
      kit.box(lower, trim, side * (width / 2 - 0.127), 0.018, 0.009, 0.006, 0.425, 0.007, 0.002);
    }
  }

  const badge = borderPlate(426, 109, {
    top: orbit ? 'ORBIT CLUB' : 'RELAY SYSTEMS',
    bottom: 'SERIAL  ' + game.station + '  /  LANTERN ARCADE',
    background: game.ink, ink: game.pale, accent: game.bright,
  });
  kit.plane(lower, kit.material('#ffffff', { map: badge, gloss: 18 }), 0, -0.235, 0.017, 0.24, 0.060);

  if (orbit) {
    vent(kit, shared, group(cabinet, 0, 1.846, 0.392, -1.24), 0.57, 0.102, 13, true);
    displayFace(kit, shared, cabinet, game, width - 0.079, 0.570, 1.499, 0.301, -0.19);
    lightbox(kit, shared, cabinet, game, width - 0.066, 0.232, 2.023, 0.554, 0.097);
    kit.box(cabinet, trim, 0, 2.155, 0.495, width - 0.042, 0.024, 0.123, 0.012);
    deck(kit, shared, cabinet, game, width - 0.076, 0.317, 1.155, 0.494, 0.344);
  } else {
    for (const side of [-1, 1]) {
      const slim = group(cabinet, side * (width / 2 - 0.064), 1.896, 0.352, -0.66);
      vent(kit, shared, slim, 0.065, 0.115, 5);
    }
    displayFace(kit, shared, cabinet, game, width - 0.147, 0.694, 1.544, 0.327, -0.128);
    lightbox(kit, shared, cabinet, game, width - 0.070, 0.208, 2.089, 0.492, 0.170);
    kit.box(cabinet, shared.steel, 0, 2.224, 0.479, width - 0.035, 0.029, 0.145, 0.009);
    kit.box(cabinet, trim, 0, 2.238, 0.449, width - 0.048, 0.011, 0.117, 0.005);
    deck(kit, shared, cabinet, game, width - 0.080, 0.296, 1.139, 0.500, 0.344);
  }
  rearHardware(kit, shared, cabinet, width, orbit ? -0.493 : -0.467, game);
  kit.floorEffect(world, game.x, game.z, 1.85, 1.60, '#0e1020', 0.61);
  const screenX = game.x + Math.sin(game.yaw) * 0.85;
  const screenZ = game.z + Math.cos(game.yaw) * 0.85;
  kit.floorEffect(world, screenX, screenZ, 1.80, 1.65, game.bright, 0.045, 0);
  kit.addAccent(screenX, 1.63, screenZ, 2.00, game.bright, 1.34);
}

function decoMedallion(kit, shared, parent, radius, front) {
  const sleeve = kit.material('#25474e', { finish: 'metal', gloss: 47, shine: '#8aada9' });
  kit.cylinder(parent, shared.darkSteel, 0, 0, 0, radius + 0.020, 0.061, radius + 0.021, 34).rotation.x = Math.PI / 2;
  kit.cylinder(parent, shared.brass, 0, 0, 0.036, radius, 0.022, radius + 0.005, 40).rotation.x = Math.PI / 2;
  kit.cylinder(parent, sleeve, 0, 0, 0.048, radius * 0.88, 0.012, radius * 0.9, 40).rotation.x = Math.PI / 2;
  const inner = group(parent, 0, 0, 0.057);
  for (let i = 0; i < 16; i += 1) {
    const theta = i * Math.PI / 8;
    const outer = radius * 0.76;
    const point = (r, angle) => [Math.cos(angle) * r, Math.sin(angle) * r, 0.001];
    kit.rod(inner, i % 4 === 0 ? shared.lens : shared.brass,
      point(radius * 0.292, theta - 0.166), point(outer, theta), 0.0035, 7);
  }
  kit.panel(inner, front ? shared.lens : shared.brass, 0, 0, 0.006, [
    [0, radius * 0.39], [radius * 0.16, radius * 0.155], [radius * 0.34, 0],
    [radius * 0.16, -radius * 0.155], [0, -radius * 0.39],
    [-radius * 0.16, -radius * 0.155], [-radius * 0.34, 0], [-radius * 0.16, radius * 0.155],
  ], 0.013, 0.003);
  for (let i = 0; i < 4; i += 1) {
    const angle = (i + 0.5) * Math.PI / 2;
    screw(kit, shared, parent, Math.cos(angle) * radius * 0.938, Math.sin(angle) * radius * 0.938,
      0.049, 0.008, angle);
  }
}

function featureCrown(kit, shared, cabinet) {
  const wing = [
    [-0.934, -0.137], [-0.941, 0.045], [-0.780, 0.085], [-0.626, 0.162],
    [-0.342, 0.162], [-0.171, 0.266], [0, 0.405], [0.171, 0.266],
    [0.342, 0.162], [0.626, 0.162], [0.780, 0.085], [0.941, 0.045],
    [0.934, -0.137],
  ];
  const aqua = kit.material('#346c6c', { finish: 'paint', gloss: 51, shine: '#7faaaa' });
  const dark = kit.material('#25343b', { finish: 'paint', gloss: 33, shine: '#7e868a' });
  const coral = kit.material('#dc9b77', { flat: true });
  const mint = kit.material('#88cfc1', { flat: true });
  kit.panel(cabinet, shared.black, 0, 2.585, 0.152, wing, 0.312, 0.017);
  kit.panel(cabinet, shared.brass, 0, 2.59, 0.321, wing.map(([x, y]) => [x * 0.992, y * 0.977]), 0.030, 0.009);
  kit.panel(cabinet, aqua, 0, 2.588, 0.349, wing.map(([x, y]) => [x * 0.965, y * 0.915]), 0.026, 0.009);
  kit.panel(cabinet, dark, 0, 2.581, 0.367, wing.map(([x, y]) => [x * 0.897, y * 0.804]), 0.010, 0.004);
  for (const side of [-1, 1]) {
    for (let n = 0; n < 3; n += 1) {
      const height = 2.546 + n * 0.046;
      kit.path(cabinet, n === 0 ? coral : mint, [
        [side * 0.811, height, 0.379], [side * 0.686, height + 0.031, 0.379],
        [side * 0.511, height + 0.031, 0.379], [side * 0.409, height + 0.082, 0.379],
        [side * (0.145 + n * 0.033), height + 0.082, 0.380],
      ], n === 0 ? 0.010 : 0.006, 9);
    }
  }
  decoMedallion(kit, shared, group(cabinet, 0, 2.755, 0.402), 0.117, true);
}

function nightCurrent(kit, shared, world, tag, wear) {
  const game = feature;
  const cabinet = group(world, game.x, 0, game.z);
  const blue = kit.material('#2b555a', { finish: 'paint', gloss: 33, shine: '#5f7d84' });
  const darkBlue = kit.material('#233840', { finish: 'paint', gloss: 27, shine: '#546c72' });
  const scarlet = kit.material('#ce8f75', { finish: 'paint', gloss: 64, shine: '#b6a390' });
  const tealLight = kit.material('#93d9c9', { flat: true });
  const orangeLight = kit.material('#eebf8d', { flat: true });
  const art = kit.material('#ffffff', { map: sideArt(game), gloss: 35, shine: '#636e75' });
  profileShell(cabinet, featureProfile, game.width, darkBlue, art);
  for (const side of [-1, 1]) {
    kit.path(cabinet, shared.black, featureProfile.map(([z, y]) => [side * game.width / 2, y, z]), 0.023, 10);
    kit.path(cabinet, shared.brass, featureProfile.slice(1, 13).map(([z, y]) => [side * (game.width / 2 + 0.009), y, z + 0.007]), 0.012, 9);
    kit.path(cabinet, scarlet, [[side * 0.792, 0.18, 0.650], [side * 0.792, 0.802, 0.606], [side * 0.792, 0.956, 0.859]], 0.007, 8);
    const fin = group(cabinet, side * 0.931, 0, 0);
    profileShell(fin, fins, 0.251, blue, darkBlue);
    kit.path(fin, shared.brass, fins.slice(1, 14).map(([z, y]) => [side * 0.123, y, z + 0.004]), 0.015, 9);
    const inset = group(fin, side * 0.119, -0.004, -0.020);
    const blade = fins.map(([z, y]) => [z * 0.90 - 0.07, y * 0.946 + 0.018]);
    profileShell(inset, blade, 0.071, scarlet, blue);
    kit.path(fin, tealLight, [[side * 0.154, 0.318, -0.050], [side * 0.154, 0.63, -0.181],
      [side * 0.154, 1.09, -0.286], [side * 0.154, 1.45, -0.302],
      [side * 0.154, 1.76, -0.202], [side * 0.154, 2.079, -0.036],
      [side * 0.154, 2.206, 0.014], [side * 0.154, 2.403, -0.030]], 0.0075, 8);
    const sideFace = group(cabinet, side * 1.095, 1.815, -0.262, 0, side * Math.PI / 2);
    decoMedallion(kit, shared, sideFace, 0.143, false);

    const foot = group(cabinet, side * 0.966, 0.135, -0.147);
    kit.box(foot, shared.darkSteel, 0, -0.045, 0, 0.267, 0.155, 0.846, 0.046);
    kit.box(foot, shared.brass, 0, 0.006, 0.386, 0.240, 0.055, 0.088, 0.012);
    kit.box(foot, shared.black, 0, -0.040, 0.431, 0.192, 0.054, 0.024, 0.007);
  }
  shoe(kit, shared, cabinet, 1.633, 0.651, 1.274, wear);

  const lower = group(cabinet, 0, 0.543, 0.625, -0.075);
  const enamel = kit.material('#365052', { finish: 'paint', gloss: 26, shine: '#657a77' });
  kit.box(lower, shared.black, 0, -0.062, 0, 1.328, 0.662, 0.036, 0.013);
  kit.box(lower, shared.brass, 0, -0.058, 0.025, 1.292, 0.625, 0.024, 0.010);
  kit.box(lower, enamel, 0, -0.058, 0.040, 1.255, 0.586, 0.021, 0.008);
  coinDoor(kit, shared, group(lower, 0, -0.030, 0.054), tag, 0.333, 0.338, true);
  for (const side of [-1, 1]) {
    decoMedallion(kit, shared, group(lower, side * 0.428, 0.022, 0.067), 0.144, false);
    for (let i = 0; i < 4; i += 1) {
      const inset = i * 0.021;
      kit.box(lower, i === 0 ? orangeLight : shared.brass, side * 0.425, -0.181 - inset, 0.065,
        0.276 - 1.8 * inset, 0.0065, 0.008, 0.003);
    }
  }
  const plaque = borderPlate(580, 112, {
    top: 'LANTERN BUILT NO. 005', bottom: 'NIGHT CURRENT  /  DEEP WATER DIVISION',
    background: '#222e35', ink: '#fbdbad', accent: '#8a9f87',
  });
  kit.plane(lower, kit.material('#ffffff', { map: plaque, gloss: 30, shine: '#4d514c' }), 0, -0.257, 0.055, 0.321, 0.061);

  displayFace(kit, shared, cabinet, game, 1.419, 0.719, 1.667, 0.403, -0.181);
  lightbox(kit, shared, cabinet, game, 1.596, 0.391, 2.300, 0.555, 0.110);
  kit.box(cabinet, shared.brass, 0, 2.501, 0.540, 1.587, 0.044, 0.141, 0.013);
  kit.box(cabinet, scarlet, 0, 2.529, 0.496, 1.553, 0.026, 0.110, 0.009);
  deck(kit, shared, cabinet, game, 1.581, 0.381, 1.184, 0.701, 0.409);
  featureCrown(kit, shared, cabinet);
  rearHardware(kit, shared, cabinet, 1.55, -0.649, game);
  const rear = group(cabinet, 0, 1.83, -0.655, 0, Math.PI);
  vent(kit, shared, rear, 1.023, 0.28, 21, true);
  const detail = borderPlate(552, 132, {
    top: 'NIGHT CURRENT', bottom: 'FIELD SERVICE  ·  PULL BOTH LATCHES',
    background: '#24303a', ink: '#ddc092', accent: '#65a698',
  });
  kit.plane(rear, kit.material('#ffffff', { map: detail, gloss: 32 }), 0, -0.310, 0.008, 0.348, 0.083);
  kit.floorEffect(world, game.x, game.z - 0.025, 3.20, 2.48, '#0e1121', 0.76);
  kit.floorEffect(world, game.x, game.z + 1.20, 3.72, 2.85, '#578f9a', 0.115, 0);
  kit.addAccent(game.x, 1.72, game.z + 1.04, 3.5, '#83e0cd', 2.15);
  kit.addAccent(game.x, 2.53, game.z + 0.61, 2.90, '#f4b974', 1.83);
}

export function buildCabinets(kit, world) {
  const shared = parts(kit);
  const token = kit.litSign(paint(144, 88, (ctx, w, h) => {
    ctx.fillStyle = '#e98d5f';
    ctx.fillRect(0, 0, w, h);
    tracking(ctx, '1 TOKEN', w / 2, h * 0.45, 29, '#321e25', 1.5);
    label(ctx, 'PUSH TO RETURN', w / 2, h * 0.79, 12, '#532f37', { align: 'center' });
  }));
  const wear = scuffMaterial(kit);
  for (const game of games) upright(kit, shared, world, game, token, wear);
  nightCurrent(kit, shared, world, token, wear);
}
