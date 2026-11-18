import { label, line, oval, paint, random, tracking } from './art.mjs';
import { borderPlate, pouchArt, priceCard, prizeLabel } from './graphics.mjs';
import { changer, counter, rack, room, stool } from './layout.mjs';
import { group } from './mesh.mjs';

const pi = Math.PI;
const paperCream = '#f3d7ae';

function stock(kit) {
  return {
    walnut: kit.material('#7c5851', { finish: 'wood', gloss: 31, shine: '#674c4d' }),
    darkWood: kit.material('#4e3c47', { finish: 'wood', gloss: 25 }),
    ash: kit.material('#ae8469', { finish: 'wood', gloss: 29, shine: '#786062' }),
    enamel: kit.material('#845665', { finish: 'paint', gloss: 47, shine: '#8e7380' }),
    flatTeal: kit.material('#638082', { finish: 'paint', gloss: 26 }),
    rubber: kit.material('#242631', { gloss: 21 }),
    bronze: kit.material('#b57f53', { finish: 'metal', gloss: 92, shine: '#af8b65' }),
    steel: kit.material('#a19da3', { finish: 'metal', gloss: 89, shine: '#a1a2ae' }),
    darkSteel: kit.material('#39343f', { finish: 'metal', gloss: 73, shine: '#868697' }),
    paper: kit.material(paperCream, { finish: 'paint', gloss: 4 }),
    red: kit.material('#9c5462', { finish: 'paint', gloss: 40 }),
    warmLight: kit.material('#e9bb94', { flat: true }),
    glass: kit.material('#b5cdd1', { gloss: 136, alpha: 0.19, shine: '#edecfb' }),
  };
}

function paperSign(kit, parent, parts, texture, x, y, z, w, h) {
  const holder = group(parent, x, y, z, -0.17);
  kit.box(holder, parts.darkWood, 0, 0, 0.002, w + 0.017, h + 0.018, 0.021, 0.004);
  kit.box(holder, parts.bronze, 0, 0, 0.015, w + 0.007, h + 0.008, 0.009, 0.0025);
  kit.plane(holder, kit.material('#fff4d8', { map: texture, gloss: 18 }), 0, 0, 0.021, w, h);
  kit.box(holder, parts.darkWood, 0, -h * 0.5, -0.023, w + 0.027, 0.026, 0.111, 0.007);
}

function register(kit, parts, parent) {
  const till = group(parent, -0.988, 1.022, 0.061, 0, -0.105);
  const body = kit.material('#b18459', { finish: 'paint', gloss: 45, shine: '#8b6b5b' });
  const keyDark = kit.material('#665563', { gloss: 67, shine: '#aaa0a6' });
  const keyLight = kit.material('#e3ccb0', { gloss: 61, shine: '#b2a59e' });
  kit.box(till, parts.rubber, 0, 0.022, 0, 0.395, 0.042, 0.334, 0.015);
  kit.box(till, parts.darkSteel, 0, 0.063, 0, 0.386, 0.062, 0.329, 0.012);
  kit.box(till, body, 0, 0.102, -0.021, 0.371, 0.076, 0.285, 0.018);
  kit.box(till, body, 0, 0.185, -0.104, 0.365, 0.12, 0.136, 0.024);
  kit.box(till, parts.bronze, 0, 0.061, 0.166, 0.336, 0.035, 0.014, 0.004);
  kit.box(till, parts.rubber, 0, 0.066, 0.177, 0.101, 0.010, 0.014, 0.003);
  const pad = group(till, 0, 0.145, 0.043, 0.24);
  kit.box(pad, parts.darkSteel, 0, 0, 0, 0.296, 0.025, 0.178, 0.007);
  for (let row = 0; row < 3; row += 1) for (let col = 0; col < 7; col += 1) {
    kit.box(pad, col === 6 ? parts.red : (row === 2 ? keyDark : keyLight), (col - 3) * 0.037, 0.020,
      (row - 1) * 0.044, 0.028, 0.016, 0.030, 0.004);
  }
  const registerDisplay = paint(344, 104, (ctx, w, h) => {
    ctx.fillStyle = '#1f3139';
    ctx.fillRect(0, 0, w, h);
    tracking(ctx, '0.00', w * 0.71, h / 2, 69, '#cce9c4', 1.8);
    label(ctx, 'USD', 40, h / 2, 23, '#85b29b');
  });
  kit.box(till, parts.darkSteel, 0, 0.207, -0.027, 0.249, 0.074, 0.019, 0.005);
  kit.plane(till, kit.litSign(registerDisplay), 0, 0.207, -0.015, 0.229, 0.059);
  kit.box(till, parts.steel, 0, 0.071, 0.183, 0.017, 0.016, 0.007, 0.003);
  kit.box(till, parts.rubber, 0, 0.071, 0.188, 0.002, 0.006, 0.002);
}

function tokenTray(kit, parts, countertop) {
  const tray = group(countertop, -0.25, 1.021, 0.175);
  kit.box(tray, parts.bronze, 0, 0.012, 0, 0.306, 0.024, 0.196, 0.010);
  kit.box(tray, parts.rubber, 0, 0.024, 0, 0.275, 0.009, 0.166, 0.004);
  for (const x of [-0.137, 0.137]) kit.box(tray, parts.bronze, x, 0.031, 0, 0.012, 0.017, 0.167, 0.003);
  for (const z of [-0.084, 0.084]) kit.box(tray, parts.bronze, 0, 0.031, z, 0.286, 0.017, 0.011, 0.003);
  const rng = random(417);
  const brassLight = kit.material('#c0a16d', { finish: 'metal', gloss: 98, shine: '#aa8e69' });
  for (let i = 0; i < 13; i += 1) {
    const x = -0.102 + rng() * 0.190;
    const z = -0.052 + rng() * 0.101;
    const coin = kit.cylinder(tray, i % 4 === 0 ? brassLight : parts.bronze, x, 0.030 + i * 0.00065,
      z, 0.0132, 0.0027, 0.0133, 14);
    coin.rotation.x = (rng() - 0.5) * 0.12;
    const stamp = kit.cylinder(tray, parts.bronze, x, 0.0316 + i * 0.00065,
      z, 0.0090, 0.0007, 0.0090, 14);
    stamp.rotation.x = coin.rotation.x;
  }
}

function ticketBook(kit, parts, parent) {
  const book = group(parent, 0.87, 1.032, 0.13, 0, 0.176);
  kit.box(book, parts.paper, 0, 0, 0, 0.236, 0.024, 0.154, 0.006);
  kit.box(book, parts.red, 0, 0.015, 0, 0.239, 0.009, 0.158, 0.003);
  const labelArt = borderPlate(398, 240, {
    top: 'PRIZE TICKETS', bottom: 'LANTERN ARCADE',
    background: '#a46265', ink: '#fae0b6', accent: '#ebaf88',
  });
  kit.plane(book, kit.material('#ffffff', { map: labelArt, gloss: 9 }), 0, 0.021, 0,
    0.221, 0.142).rotation.x = -pi / 2;
  kit.box(book, parts.darkWood, -0.105, 0.01, 0, 0.021, 0.035, 0.159, 0.007);
  const pencil = group(parent, 0.737, 1.029, 0.279, 0, 0.38);
  const end = kit.material('#ca9666', { gloss: 28 });
  kit.rod(pencil, end, [-0.082, 0, 0], [0.067, 0, 0], 0.006, 6);
  kit.rod(pencil, parts.paper, [0.067, 0, 0], [0.081, 0, 0], 0.0043, 6);
  kit.rod(pencil, parts.rubber, [0.080, 0, 0], [0.086, 0, 0], 0.0018, 6);
  kit.rod(pencil, parts.red, [-0.091, 0, 0], [-0.082, 0, 0], 0.0061, 9);
}

function pegboardArt() {
  return paint(1024, 480, (ctx, w, h) => {
    ctx.fillStyle = '#785e62';
    ctx.fillRect(0, 0, w, h);
    for (let x = 13; x < w - 1; x += 19) for (let y = 13; y < h - 1; y += 20) {
      oval(ctx, x, y + 1.3, 2.4, 2.6, '#a58379');
      oval(ctx, x, y, 2.2, 2.2, '#443641');
    }
    const rng = random(662);
    for (let i = 0; i < 10600; i += 1) {
      ctx.fillStyle = i % 3 ? '#45333c2a' : '#e7bfa626';
      ctx.fillRect(rng() * w, rng() * h, rng() * 2 + 0.6, rng() * 2 + 0.5);
    }
  });
}

function packageItem(kit, parts, parent, texture, color, x, y, z, w, h, d, yaw = 0) {
  const prize = group(parent, x, y + h / 2, z, 0, yaw);
  kit.box(prize, kit.material(color, { gloss: 11, finish: 'paint' }), 0, 0, 0, w, h, d, 0.006);
  kit.box(prize, parts.paper, 0, h / 2 - 0.006, 0, w * 0.91, 0.012, d * 0.92, 0.004);
  kit.plane(prize, kit.material('#ffffff', { map: texture, gloss: 15 }),
    0, -0.001, d / 2 + 0.001, w * 0.961, h * 0.942);
  kit.box(prize, parts.paper, w * 0.5 + 0.001, -h * 0.23, 0, 0.001, h * 0.041, d * 0.79);
}

function marbleJar(kit, parts, parent, x, y, z) {
  const jar = group(parent, x, y, z);
  kit.cylinder(jar, parts.rubber, 0, 0.012, 0, 0.077, 0.026, 0.083, 28);
  const glass = kit.lathe(jar, parts.glass, 0, 0.020, 0, [
    [0.062, 0.0], [0.071, 0.012], [0.070, 0.151], [0.064, 0.164],
    [0.055, 0.184], [0.055, 0.209], [0.049, 0.209], [0.049, 0.185],
    [0.059, 0.166], [0.064, 0.151], [0.064, 0.012],
  ], 28);
  glass.renderOrder = 3;
  kit.cylinder(jar, parts.bronze, 0, 0.227, 0, 0.063, 0.025, 0.065, 26);
  const rng = random(224);
  for (let i = 0; i < 26; i += 1) {
    const angle = rng() * pi * 2;
    const r = Math.sqrt(rng()) * 0.050;
    const mat = kit.material(['#b46569', '#eab37a', '#8ebba7', '#7584ad'][i % 4], { gloss: 93, shine: '#decfc7' });
    kit.ball(jar, mat, r * Math.cos(angle), 0.039 + rng() * 0.099, r * Math.sin(angle), 0.0119, 1, 12, 8);
  }
  const tag = borderPlate(220, 90, {
    top: 'MARBLES', bottom: '18 TICKETS', background: '#cbb99f',
    ink: '#3c373f', accent: '#64505a',
  });
  kit.plane(jar, kit.material('#ffffff', { map: tag, gloss: 7 }), 0, 0.124, 0.072, 0.108, 0.041);
}

function prizeShelf(kit, parts, world) {
  const shelf = group(world, room.booth.right - 0.061, 0, -4.57, 0, -pi / 2);
  kit.box(shelf, parts.darkWood, 0, 2.017, 0.018, 3.663, 1.362, 0.069, 0.016);
  kit.box(shelf, parts.walnut, 0, 2.017, 0.045, 3.596, 1.304, 0.037, 0.008);
  const pegs = kit.material('#ffffff', { map: pegboardArt(), gloss: 10 });
  kit.plane(shelf, pegs, 0, 2.026, 0.065, 3.497, 1.257, 12, 5);
  for (const x of [-1.758, 0.10, 1.758]) {
    kit.box(shelf, parts.darkWood, x, 2.022, 0.221, 0.039, 1.282, 0.348, 0.005);
    kit.box(shelf, parts.bronze, x, 2.022, 0.399, 0.020, 1.27, 0.012, 0.003);
  }
  for (const y of [1.393, 1.846, 2.331, 2.673]) {
    kit.box(shelf, parts.walnut, 0, y, 0.240, 3.555, 0.042, 0.377, 0.010);
    kit.box(shelf, parts.ash, 0, y, 0.431, 3.556, 0.040, 0.021, 0.004);
    if (y > 1.5) kit.box(shelf, parts.warmLight, 0, y - 0.028, 0.337, 3.41, 0.012, 0.019, 0.004);
  }
  const kite = prizeLabel('MOTH KITE', '#b77a73', '#55384c', 'kite');
  const patch = prizeLabel('STAR PATCH', '#bfad7b', '#554d62', 'star');
  const glass = prizeLabel('GLASS MARBLES', '#9baba2', '#464a62', 'marbles');

  packageItem(kit, parts, shelf, kite, '#9a6571', -1.42, 1.415, 0.248, 0.257, 0.294, 0.127, -0.104);
  packageItem(kit, parts, shelf, kite, '#a46a70', -1.084, 1.415, 0.239, 0.257, 0.292, 0.125, 0.013);
  packageItem(kit, parts, shelf, patch, '#a99976', -0.601, 1.414, 0.221, 0.299, 0.227, 0.122, 0.091);
  packageItem(kit, parts, shelf, patch, '#b3a07d', -0.267, 1.414, 0.231, 0.278, 0.194, 0.119, -0.088);
  packageItem(kit, parts, shelf, glass, '#7e9890', 0.356, 1.414, 0.241, 0.269, 0.222, 0.133, 0.118);
  packageItem(kit, parts, shelf, glass, '#829b9d', 0.66, 1.414, 0.245, 0.25, 0.241, 0.133, -0.082);
  marbleJar(kit, parts, shelf, 1.130, 1.414, 0.263);
  marbleJar(kit, parts, shelf, 1.471, 1.414, 0.266);
  packageItem(kit, parts, shelf, patch, '#b8a680', -1.37, 1.867, 0.282, 0.277, 0.229, 0.089, -0.094);
  packageItem(kit, parts, shelf, patch, '#afa07c', -1.073, 1.867, 0.253, 0.248, 0.227, 0.096, 0.075);
  packageItem(kit, parts, shelf, kite, '#9d6470', -0.531, 1.868, 0.211, 0.277, 0.275, 0.133, -0.083);
  kit.box(shelf, parts.darkWood, -0.183, 1.906, 0.238, 0.184, 0.081, 0.200, 0.007);
  packageItem(kit, parts, shelf, kite, '#9b6570', 0.452, 1.868, 0.241, 0.265, 0.241, 0.126, -0.077);
  packageItem(kit, parts, shelf, glass, '#829b96', 0.773, 1.868, 0.255, 0.241, 0.23, 0.133, 0.130);
  packageItem(kit, parts, shelf, glass, '#829b96', 1.128, 1.868, 0.274, 0.254, 0.211, 0.105, -0.073);
  packageItem(kit, parts, shelf, kite, '#9b6d77', 1.499, 1.868, 0.247, 0.248, 0.266, 0.136, 0.056);

  const banner = borderPlate(772, 148, {
    top: 'PRIZE SHELF', bottom: 'BRING YOUR TICKETS TO THE COUNTER',
    background: '#553d49', ink: '#f6d4ab', accent: '#cd9b83',
  });
  kit.box(shelf, parts.darkWood, -0.855, 2.495, 0.215, 1.331, 0.242, 0.067, 0.007);
  kit.plane(shelf, kit.material('#ffffff', { map: banner, gloss: 11 }), -0.855, 2.495, 0.251, 1.274, 0.196);
  for (let i = 0; i < 4; i += 1) {
    packageItem(kit, parts, shelf, patch, i % 2 === 0 ? '#a0947c' : '#9e876c', 0.376 + i * 0.290,
      2.352, 0.229 + i % 2 * 0.015, 0.221, 0.218, 0.114, (i % 2 - 0.5) * 0.23);
  }
}

function buildCounter(kit, parts, world) {
  const desk = group(world, counter.x, 0, counter.z, 0, -pi / 2);
  const w = counter.d;
  const d = counter.w;
  kit.box(desk, parts.rubber, 0, 0.071, 0, w - 0.106, 0.139, d - 0.092, 0.011);
  kit.box(desk, parts.darkWood, 0, 0.501, 0, w - 0.052, 0.88, d - 0.039, 0.019);
  kit.box(desk, parts.enamel, 0, 0.514, d / 2 - 0.010, w - 0.113, 0.773, 0.051, 0.014);
  kit.box(desk, parts.ash, 0, 0.964, 0.006, w, 0.077, d, 0.022);
  kit.box(desk, parts.walnut, 0, 1.004, 0.006, w - 0.022, 0.034, d - 0.019, 0.013);
  kit.box(desk, parts.bronze, 0, 0.945, d / 2 + 0.004, w - 0.041, 0.016, 0.022, 0.005);
  for (const y of [0.182, 0.856]) kit.box(desk, parts.darkWood, 0, y, d / 2 + 0.008,
    w - 0.102, 0.041, 0.045, 0.007);
  for (let i = 0; i <= 46; i += 1) {
    const x = (i / 46 - 0.5) * (w - 0.215);
    kit.box(desk, i % 4 === 0 ? parts.walnut : parts.darkWood, x, 0.523, d / 2 + 0.024,
      0.026, 0.623, 0.030, 0.008);
  }
  for (const side of [-1, 1]) {
    kit.box(desk, parts.walnut, side * (w * 0.5 - 0.067), 0.537, d / 2 + 0.021,
      0.055, 0.644, 0.035, 0.008);
    const end = group(desk, side * (w * 0.5 - 0.020), 0.50, -0.017, 0, side * pi / 2);
    kit.box(end, parts.enamel, 0, 0.015, 0.005, d - 0.069, 0.742, 0.016, 0.004);
    kit.box(end, parts.walnut, 0, -0.315, 0.016, d - 0.080, 0.036, 0.021, 0.005);
  }
  const kick = kit.material('#7f6672', { finish: 'metal', gloss: 63, shine: '#9b8492' });
  kit.box(desk, kick, 0, 0.075, d / 2 - 0.02, w - 0.132, 0.083, 0.021, 0.005);

  register(kit, parts, desk);
  tokenTray(kit, parts, desk);
  ticketBook(kit, parts, desk);
  paperSign(kit, desk, parts, priceCard(), 0.36, 1.184, 0.029, 0.346, 0.183);
  const card = borderPlate(480, 124, {
    top: 'RING FOR TOKENS', bottom: 'THANKS FOR PLAYING',
    background: '#d8bf9e', ink: '#513f47', accent: '#865d61',
  });
  kit.plane(desk, kit.material('#ffffff', { map: card, gloss: 7 }), 1.366, 1.026, 0.230, 0.229, 0.066).rotation.x = -pi / 2;
  kit.cylinder(desk, parts.rubber, 1.366, 1.036, 0.104, 0.051, 0.022, 0.053, 22);
  kit.ball(desk, parts.bronze, 1.366, 1.049, 0.104, 0.047, 0.53);
  kit.cylinder(desk, parts.steel, 1.366, 1.083, 0.104, 0.008, 0.027, 0.009, 12);
  kit.floorEffect(world, counter.x - 0.10, counter.z, 2.08, 4.6, '#10101c', 0.59);
  kit.floorEffect(world, counter.x - 1.15, counter.z, 2.82, 4.39, '#b98576', 0.103, 0);
  kit.addAccent(7.0, 2.55, -4.53, 2.85, '#f0b883', 2.33);
  prizeShelf(kit, parts, world);
}

function buildStool(kit, parts, world) {
  const seat = group(world, stool.x, 0, stool.z);
  const legs = kit.material('#68515d', { finish: 'metal', gloss: 83, shine: '#aaa2ac' });
  const leather = kit.material('#754856', { gloss: 48, finish: 'fabric', shine: '#80616e' });
  kit.cylinder(seat, parts.rubber, 0, 0.607, 0, 0.230, 0.057, 0.224, 36);
  kit.cylinder(seat, leather, 0, 0.642, 0, 0.224, 0.067, 0.230, 36);
  kit.cylinder(seat, parts.bronze, 0, 0.632, 0, 0.231, 0.011, 0.231, 36);
  kit.ball(seat, leather, 0, 0.653, 0, 0.219, 0.122);
  const ring = [];
  for (let i = 0; i <= 28; i += 1) {
    const angle = i * pi * 2 / 28;
    ring.push([0.197 * Math.cos(angle), 0.229, 0.197 * Math.sin(angle)]);
  }
  kit.path(seat, parts.bronze, ring, 0.009, 8);
  for (let i = 0; i < 4; i += 1) {
    const angle = (i + 0.5) * pi / 2;
    const cx = Math.cos(angle), sz = Math.sin(angle);
    kit.rod(seat, legs, [cx * 0.149, 0.594, sz * 0.149], [cx * 0.234, 0.021, sz * 0.234], 0.018, 10);
    kit.cylinder(seat, parts.rubber, cx * 0.234, 0.019, sz * 0.234, 0.022, 0.036, 0.024, 10);
  }
  kit.floorEffect(world, stool.x, stool.z, 0.92, 0.92, '#12111c', 0.52);
}

function tokenChanger(kit, parts, world) {
  const m = group(world, changer.x, 0, changer.z, 0, pi / 2);
  kit.box(m, parts.rubber, 0, 0.077, 0, 0.469, 0.154, 0.57, 0.019);
  kit.box(m, parts.flatTeal, 0, 0.783, 0, 0.474, 1.40, 0.548, 0.028);
  kit.box(m, parts.darkSteel, 0, 0.801, 0.276, 0.422, 1.312, 0.026, 0.011);
  kit.box(m, parts.flatTeal, 0, 0.825, 0.291, 0.386, 1.236, 0.019, 0.006);
  kit.plane(m, kit.material('#ffffff', { map: priceCard('changer'), gloss: 22 }),
    0, 1.247, 0.303, 0.337, 0.181);
  kit.box(m, parts.steel, 0, 0.969, 0.305, 0.242, 0.088, 0.026, 0.006);
  kit.box(m, parts.rubber, 0, 0.970, 0.320, 0.171, 0.039, 0.006, 0.003);
  kit.box(m, parts.warmLight, 0, 1.015, 0.316, 0.103, 0.007, 0.005, 0.002);
  kit.box(m, parts.darkSteel, 0, 0.607, 0.305, 0.241, 0.165, 0.024, 0.008);
  kit.box(m, parts.rubber, 0, 0.623, 0.319, 0.189, 0.105, 0.007, 0.004);
  kit.box(m, parts.steel, 0, 0.576, 0.329, 0.192, 0.020, 0.034, 0.006);
  kit.box(m, parts.bronze, -0.14, 0.763, 0.315, 0.019, 0.019, 0.010, 0.003);
  kit.floorEffect(world, changer.x + 0.01, changer.z, 1.09, 1.00, '#0e1020', 0.47);
}

function flyerRack(kit, parts, world) {
  const f = group(world, rack.x, 0, rack.z, 0, pi / 2);
  kit.box(f, parts.rubber, 0, 0.045, 0, 1.067, 0.087, 0.542, 0.012);
  for (const x of [-0.506, 0.506]) {
    kit.box(f, parts.darkWood, x, 0.440, 0, 0.046, 0.879, 0.510, 0.010);
    kit.box(f, parts.bronze, x, 0.451, 0.258, 0.015, 0.787, 0.010, 0.002);
  }
  kit.box(f, parts.walnut, 0, 0.751, 0, 1.071, 0.059, 0.524, 0.011);
  kit.box(f, parts.darkWood, 0, 0.236, 0, 1.007, 0.047, 0.504, 0.008);
  const stand = group(f, 0, 0.841, -0.047, -0.22);
  kit.box(stand, parts.darkWood, 0, 0.064, 0, 0.936, 0.213, 0.047, 0.006);
  kit.plane(stand, kit.material('#fff4e8', { map: pouchArt(), gloss: 9 }), 0, 0.079, 0.025, 0.892, 0.177);
  const tickets = paint(336, 234, (ctx, w, h) => {
    ctx.fillStyle = '#d5bb97';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#8e6967';
    ctx.lineWidth = 3;
    ctx.strokeRect(13, 13, w - 26, h - 26);
    label(ctx, 'LEAGUE CARD', w / 2, 72, 39, '#695062', { align: 'center' });
    for (let i = 0; i < 3; i += 1) line(ctx, [[42, 117 + i * 28], [292, 117 + i * 28]], '#997a75', 2.1);
  });
  for (const [x, z, rotation] of [[-0.29, 0.102, -0.12], [-0.014, 0.104, 0.06], [0.281, 0.128, 0.07]]) {
    const pile = group(f, x, 0.788, z, 0, rotation);
    kit.box(pile, parts.paper, 0, 0, 0, 0.205, 0.021, 0.146, 0.002);
    kit.plane(pile, kit.material('#ffffff', { map: tickets, gloss: 6 }), 0, 0.0115, 0, 0.200, 0.143).rotation.x = -pi / 2;
  }
  kit.floorEffect(world, rack.x + 0.04, rack.z, 1.05, 1.54, '#14111e', 0.45);
}

export function buildProps(kit, world) {
  const parts = stock(kit);
  buildCounter(kit, parts, world);
  buildStool(kit, parts, world);
  tokenChanger(kit, parts, world);
  flyerRack(kit, parts, world);
}
