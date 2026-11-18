import { agePaper, canvas, label } from './materials.js';
import { between, seeded } from './layout.js';

export function enamelSign(title, second, { small = false, arrow = '', cream = false } = {}) {
  const width = small ? 512 : 768;
  const height = second ? 220 : 156;
  const image = canvas(width, height);
  const c = image.getContext('2d');
  const bg = cream ? '#ad9969' : '#344d44';
  const fg = cream ? '#312d26' : '#ddd2a1';
  c.fillStyle = '#41352a';
  c.fillRect(0, 0, width, height);
  c.fillStyle = bg;
  c.fillRect(4, 4, width - 8, height - 8);
  c.strokeStyle = fg;
  c.globalAlpha = .72;
  c.lineWidth = 4.5;
  c.strokeRect(15, 14, width - 30, height - 28);
  c.globalAlpha = 1;
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillStyle = fg;
  const titleSize = small ? 59 : second ? 91 : 104;
  c.font = 'bold ' + titleSize + 'px Georgia, serif';
  c.fillText(title, width / 2, second ? height * .40 : height * .53, width - 62);
  if (second) {
    c.font = 'bold 34px Georgia, serif';
    c.fillText(second, width * (arrow ? .445 : .5), height * .73, arrow ? width * .70 : width - 60);
  }
  if (arrow) {
    c.font = 'bold 40px sans-serif';
    c.fillText(arrow, width * .86, height * .74);
  }
  agePaper(c, width, height, 871 + title.length, .7);
  const random = seeded(6883 + title.length);
  for (let i = 0; i < 65; i++) {
    const x = random() * width, y = random() < .5 ? between(random, 3, 13) : height - between(random, 3, 17);
    c.fillStyle = i % 3 ? '#60452b90' : '#b19b6a82';
    c.fillRect(x, y, between(random, 1, 6), between(random, 1, 4));
  }
  for (const x of [25, width - 25]) {
    c.fillStyle = '#362e26';
    c.beginPath();
    c.arc(x, height * .52, 6, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#c7a680';
    c.fillRect(x - 3, height * .52 - 2, 7, 1.5);
  }
  return label(image);
}

export function printedNotice(kind) {
  const w = 512, h = 640;
  const image = canvas(w, h);
  const c = image.getContext('2d');
  const timetable = kind === 'timetable';
  const ticket = kind === 'ticket';
  c.fillStyle = timetable ? '#c8b184' : ticket ? '#d0bb92' : '#c2ac7c';
  c.fillRect(0, 0, w, h);
  c.fillStyle = '#352d22';
  c.textAlign = 'center';
  c.font = 'bold 25px Georgia, serif';
  c.fillText('WREN VALLEY RAILWAY', w / 2, 64);
  c.fillRect(45, 83, w - 90, 2);
  c.font = 'bold 38px Georgia, serif';
  c.fillText(timetable ? 'ALDER HALT' : ticket ? 'TICKET OFFICE' : 'PUBLIC NOTICE', w / 2, 135);
  c.font = 'bold 22px Georgia, serif';
  c.fillText(timetable ? 'WEEKDAY PASSENGER SERVICE' : ticket ? 'BOOKING ARRANGEMENTS' : 'WITHDRAWAL OF SERVICE', w / 2, 184, 430);
  c.font = '20px Georgia, serif';
  if (timetable) {
    c.textAlign = 'left';
    const columns = [54, 310, 390];
    const rows = [
      ['Calling at', 'a.m.', 'p.m.'], ['Millbrook', '7  18', '4  42'], ['ALDER HALT', '7  31', '4  55'],
      ['Lower Wren', '7  39', '5  03'], ['Hathersett Junction', '7  58', '5  22']
    ];
    for (let i = 0; i < rows.length; i++) {
      c.fillStyle = i ? '#382d21' : '#65442e';
      rows[i].forEach((s, j) => c.fillText(s, columns[j], 245 + i * 49));
      c.fillStyle = '#796343';
      c.fillRect(51, 259 + i * 49, w - 102, 1);
    }
    c.textAlign = 'center';
    c.fillText('Trains stop here by request.', w / 2, 525);
    c.fillText('Valid from 13 June 1966', w / 2, 565);
  } else {
    const lines = ticket ? [
      'Apply at the window ten minutes', 'before the departure of the train.', '',
      'Passengers joining at this halt', 'may also obtain tickets on board.'
    ] : [
      'The last passenger train will call at', 'Alder Halt on Saturday 8 October 1966.', '',
      'The public footpath and the boarded', 'crossing will remain available.', '',
      'By order of the station superintendent.'
    ];
    lines.forEach((s, i) => c.fillText(s, w / 2, 258 + i * 40));
  }
  agePaper(c, w, h, timetable ? 6643 : 6175, .95);
  const random = seeded(4437);
  for (let i = 0; i < 80; i++) {
    const x = between(random, 0, w), y = between(random, 0, h);
    const radius = between(random, 2, 23);
    const mark = c.createRadialGradient(x, y, 0, x, y, radius);
    mark.addColorStop(0, '#60402025');
    mark.addColorStop(1, '#60402000');
    c.fillStyle = mark;
    c.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
  c.fillStyle = '#7d7250a0';
  c.fillRect(2, 1, w - 4, 6);
  return label(image);
}

export function stainMaterial(kind) {
  const image = canvas(256);
  const c = image.getContext('2d');
  const random = seeded(kind === 'moss' ? 7586 : 1963);
  for (let i = 0; i < 460; i++) {
    const x = between(random, 4, 252);
    const y = kind === 'moss' ? 250 - random() ** 3 * 185 : 6 + random() ** 2 * 221;
    const horizontal = Math.sin(x / 256 * Math.PI) ** 0.38;
    const rx = between(random, 1.0, kind === 'moss' ? 13 : 5);
    const ry = between(random, .9, kind === 'moss' ? 9 : 26);
    const rgb = kind === 'moss' ? (i % 3 ? '57,69,34' : '86,86,40') : (i % 3 ? '45,43,32' : '81,62,38');
    const g = c.createRadialGradient(0, 0, 0, 0, 0, 1);
    g.addColorStop(0, 'rgba(' + rgb + ',' + horizontal * between(random, .04, .22) + ')');
    g.addColorStop(1, 'rgba(' + rgb + ',0)');
    c.save();
    c.translate(x, y);
    c.scale(rx, ry);
    c.fillStyle = g;
    c.fillRect(-1, -1, 2, 2);
    c.restore();
  }
  return label(image, { transparent: true });
}

export function freestandingSign(batch, m, sign, x, z, base, width, height, yaw, { iron = false } = {}) {
  const u = [Math.cos(yaw), 0, -Math.sin(yaw)];
  const n = [Math.sin(yaw), 0, Math.cos(yaw)];
  const signY = base + 1.53;
  const postMat = iron ? m.iron : m.green;
  const postDistance = width > 1.8 ? width * .39 : 0;
  const posts = postDistance ? [-postDistance, postDistance] : [0];
  for (const offset of posts) {
    batch.box(m.stone, x + u[0] * offset, base + .027, z + u[2] * offset, .27, .12, .27, { ry: yaw });
    batch.box(postMat, x + u[0] * offset, base + .78, z + u[2] * offset, .115, 1.56, .125, { ry: yaw });
  }
  batch.box(m.wood, x + n[0] * .08, signY, z + n[2] * .08, width, height, .064, { ry: yaw });
  batch.plane(sign, [x + n[0] * .114, signY, z + n[2] * .114], u, [0, 1, 0], width * .985, height * .976,
    { shadow: false });
}

export function bench(batch, m, x, z, base, yaw, width, interior = false) {
  const side = [Math.cos(yaw), 0, -Math.sin(yaw)];
  const nose = [Math.sin(yaw), 0, Math.cos(yaw)];
  const at = (u, y, v) => [x + side[0] * u + nose[0] * v, base + y, z + side[2] * u + nose[2] * v];
  const box = (mat, u, y, v, w, h, d, opts = {}) => batch.box(mat, ...at(u, y, v), w, h, d, { ry: yaw, ...opts });
  const slat = interior ? m.wood : m.enamel;
  for (const end of [-1, 1]) {
    const u = end * width * .39;
    box(m.iron, u, .032, .13, .135, .064, .23);
    box(m.iron, u, .029, -.154, .139, .058, .21);
    batch.tube(m.iron, [at(u, .05, .175), at(u, .29, .135), at(u, .408, .13),
      at(u, .423, -.08), at(u, .16, -.178), at(u, .055, -.18)], [.031, .024, .028, .031, .026, .029], { segments: 7 });
    batch.tube(m.iron, [at(u, .37, -.16), at(u, .59, -.238), at(u, .91, -.286)],
      [.036, .027, .024], { segments: 7 });
    if (!interior) {
      batch.tube(m.iron, [at(u, .48, .142), at(u, .64, .13), at(u, .671, .044), at(u, .644, -.132)],
        [.022, .023, .022, .023], { segments: 6 });
    }
  }
  for (let j = 0; j < 4; j++) {
    box(slat, -.014 * (j % 2), .442 - j * .005, -.097 + j * .083, width, .041, .074,
      { uvOffset: [.23 * j, .38 * j], tint: j === 3 ? '#d6c3a0' : '#e9e2cd' });
  }
  for (let j = 0; j < 2; j++) {
    box(slat, j ? .012 : 0, .67 + j * .152, -.249 - j * .026, j && !interior ? width * .92 : width, .112, .043,
      { rx: -.13, uvOffset: [.45 + j * .24, .19 * j] });
  }
  for (const u of [-width * .39, width * .39]) {
    for (let j = 0; j < 4; j++) box(m.steel, u, .464 - j * .005, -.097 + j * .083, .022, .006, .021);
  }
}

export function crackedGlass(batch, m, transform, width, height, style, offset = 0) {
  const w = width * .5, h = height * .5;
  const pane = (points, shift = 0) => batch.polygon(m.glass, points.map(([u, v]) => transform(u, v, offset + shift)), { shadow: false });
  const line = (a, b) => batch.beam(m.glassEdge, transform(a[0], a[1], offset + .002),
    transform(b[0], b[1], offset + .002), .003, .003, { shadow: false });
  if (style === 0) {
    pane([[-w, -h], [w, -h], [w, h], [-w, h]]);
    line([-w, h * .88], [-w * .19, h * .16]);
    line([-w * .19, h * .16], [w * .15, -h * .45]);
    line([w * .15, -h * .45], [w, -h * .77]);
    line([-w * .19, h * .16], [w * .45, h * .61]);
  } else if (style === 1) {
    pane([[-w, -h], [w, -h], [w, -h * .66], [w * .42, -h * .78], [-w * .13, -h * .50], [-w, -h * .41]]);
    pane([[-w, -.39 * h], [-w * .3, h * .22], [-w * .55, h], [-w, h]]);
    pane([[w, h * .28], [w, h], [w * .31, h]]);
    line([-w * .8, -h], [-w * .45, -h * .64]);
  } else if (style === 2) {
    pane([[-w, -h], [-w * .09, -h], [-w * .68, -h * .66]]);
    pane([[w * .53, h], [w, h], [w, h * .58]]);
  }
}

export function contactShadow() {
  const image = canvas(128);
  const ctx = image.getContext('2d');
  const falloff = ctx.createRadialGradient(64, 64, 1, 64, 64, 63);
  falloff.addColorStop(0, 'rgba(32,26,21,0.64)');
  falloff.addColorStop(.32, 'rgba(32,26,21,0.43)');
  falloff.addColorStop(.72, 'rgba(32,26,21,0.14)');
  falloff.addColorStop(1, 'rgba(32,26,21,0)');
  ctx.fillStyle = falloff;
  ctx.fillRect(0, 0, 128, 128);
  return label(image, { surface: false, transparent: true });
}

export function clockDial() {
  const size = 512;
  const center = size / 2;
  const image = canvas(size);
  const c = image.getContext('2d');
  c.fillStyle = '#443a31';
  c.beginPath();
  c.arc(center, center, 252, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = '#c9bea0';
  c.beginPath();
  c.arc(center, center, 238, 0, Math.PI * 2);
  c.fill();
  c.save();
  c.clip();
  c.strokeStyle = '#3d382f';
  c.fillStyle = '#3d382f';
  c.font = 'bold 39px Georgia, serif';
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  for (let i = 0; i < 60; i++) {
    const a = i * Math.PI / 30;
    const x = Math.sin(a), y = -Math.cos(a);
    const inner = i % 5 ? 214 : 199;
    c.lineWidth = i % 5 ? 2.8 : 5;
    c.beginPath();
    c.moveTo(center + x * inner, center + y * inner);
    c.lineTo(center + x * 222, center + y * 222);
    c.stroke();
    if (i % 5 === 0) c.fillText(String(i / 5 || 12), center + x * 166, center + y * 166);
  }
  c.font = 'bold 18px Georgia, serif';
  c.fillText('WREN VALLEY', center, center + 83);
  function hand(time, length, width) {
    const a = time * Math.PI / 30;
    const x = Math.sin(a), y = -Math.cos(a);
    c.lineWidth = width;
    c.beginPath();
    c.moveTo(center - x * 24, center - y * 24);
    c.lineTo(center + x * length, center + y * length);
    c.stroke();
  }
  hand(24.58, 129, 13);
  hand(55, 188, 8);
  c.beginPath();
  c.arc(center, center, 12, 0, Math.PI * 2);
  c.fill();
  agePaper(c, size, size, 48636, 1.18);
  c.strokeStyle = 'rgba(85,77,56,.56)';
  c.lineWidth = 2.4;
  c.beginPath();
  c.moveTo(8, 317);
  c.lineTo(129, 305);
  c.lineTo(202, 279);
  c.lineTo(313, 314);
  c.moveTo(129, 305);
  c.lineTo(83, 382);
  c.lineTo(61, 424);
  c.stroke();
  c.restore();
  return label(image, { transparent: true });
}
