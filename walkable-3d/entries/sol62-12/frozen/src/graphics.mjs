import { label, line, oval, paint, polygon, random, tracking } from './art.mjs';

const ivory = '#f9dfb4';
const honey = '#e6ad75';
const muted = '#bdaaa2';
const navy = '#222638';
const face = '"Arial Black", "Segoe UI", sans-serif';
const serif = 'Georgia, serif';
const mono = 'Consolas, "Courier New", monospace';

export function borderPlate(width, height, options) {
  const { top, bottom, background = '#26303b', ink = ivory, accent = honey } = options;
  return paint(width, height, (ctx, w, h) => {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = accent;
    ctx.lineWidth = h * 0.014;
    ctx.strokeRect(w * 0.020, h * 0.10, w * 0.96, h * 0.80);
    line(ctx, [[w * 0.128, h * 0.583], [w * 0.875, h * 0.583]], accent + '6b', h * 0.011);
    label(ctx, top, w * 0.5, h * 0.391, h * 0.263, ink, { family: face, align: 'center', maxWidth: w * 0.89 });
    label(ctx, bottom, w * 0.5, h * 0.725, h * 0.137, accent, { family: mono, align: 'center', maxWidth: w * 0.88 });
    for (const x of [w * 0.035, w * 0.965]) oval(ctx, x, h / 2, h * 0.023, h * 0.023, accent);
  });
}

export function serviceCard(name, id) {
  return paint(480, 156, (ctx, w, h) => {
    ctx.fillStyle = '#cfc3a8';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#3e3a42';
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, w - 16, h - 16);
    label(ctx, name, 24, 38, 33, '#2c2c38', { family: face, maxWidth: w - 48 });
    line(ctx, [[18, 62], [462, 62]], '#534c4b', 2);
    label(ctx, 'CABINET ' + id + '  ·  LANTERN SERVICE CO.', 24, 84, 18, '#2d2f3b', { family: mono });
    label(ctx, 'DISCONNECT POWER BEFORE SERVICING', 24, 116, 17, '#804946', { family: mono });
    const rng = random(67);
    for (let i = 0; i < 2300; i += 1) {
      ctx.fillStyle = i % 4 === 0 ? '#ffffff44' : '#3d303020';
      ctx.fillRect(rng() * w, rng() * h, 0.4 + rng() * 2.2, 0.5 + rng() * 1.1);
    }
  });
}

function lantern(ctx, x, y, scale, color, outline) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.moveTo(-42, -25);
  ctx.quadraticCurveTo(-50, 20, -27, 39);
  ctx.quadraticCurveTo(0, 55, 27, 39);
  ctx.quadraticCurveTo(50, 20, 42, -25);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 2.8;
  ctx.strokeStyle = outline;
  ctx.stroke();
  ctx.strokeRect(-35, -41, 70, 13);
  ctx.beginPath();
  ctx.arc(0, -43, 14, Math.PI, 2 * Math.PI);
  ctx.stroke();
  for (const s of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(s * 23, -24);
    ctx.bezierCurveTo(s * 34, 1, s * 32, 33, s * 15, 42);
    ctx.stroke();
  }
  polygon(ctx, [[0, -18], [8, 6], [24, 10], [8, 16], [0, 36], [-8, 16], [-24, 10], [-8, 6]], outline);
  ctx.restore();
}

export function transomArt() {
  return paint(1024, 180, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#57404b');
    g.addColorStop(1, '#302839');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#bf8b68';
    ctx.lineWidth = 2.7;
    ctx.strokeRect(11, 11, w - 22, h - 22);
    ctx.strokeStyle = '#b2815e77';
    ctx.strokeRect(19, 19, w - 38, h - 38);
    lantern(ctx, w / 2, 61, 0.60, '#9b5748', ivory);
    tracking(ctx, 'LANTERN ARCADE', w / 2, 130, 50, ivory, 8.3, serif);
    for (const s of [-1, 1]) for (let i = 0; i < 4; i += 1) {
      const x = w / 2 + 405 * s;
      const y = 59 + i * 13;
      line(ctx, [[x - 60, y], [x - 43, y - 11], [x + 43, y - 11], [x + 60, y]], '#ce9b7469', 2);
    }
  });
}

export function openArt() {
  return paint(512, 235, (ctx, w, h) => {
    ctx.fillStyle = '#171c2b';
    ctx.beginPath();
    ctx.roundRect(5, 5, w - 10, h - 10, 23);
    ctx.fill();
    const stroke = '#d18664';
    ctx.shadowColor = '#eb7f63';
    ctx.shadowBlur = 12;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.shadowBlur = 17;
    label(ctx, 'OPEN LATE', w / 2, h * 0.45, 72, '#ffd3a3', { family: serif, align: 'center', maxWidth: 419 });
    ctx.shadowColor = '#65d3d6';
    ctx.shadowBlur = 11;
    tracking(ctx, 'UNTIL MIDNIGHT', w / 2, h * 0.77, 25, '#acece4', 4.2);
  });
}

export function entryMatArt() {
  return paint(900, 436, (ctx, w, h) => {
    ctx.fillStyle = '#403040';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#ae806e';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, w - 40, h - 40);
    ctx.lineWidth = 3;
    ctx.strokeRect(34, 34, w - 68, h - 68);
    lantern(ctx, w / 2, 144, 1.11, '#84524e', '#e7ad83');
    tracking(ctx, 'LANTERN ARCADE', w / 2, 280, 53, '#edc398', 8.6, serif);
    tracking(ctx, 'PLAY A WHILE', w / 2, 341, 20, '#bb8d76', 5);
    const rng = random(767);
    for (let i = 0; i < 27000; i += 1) {
      ctx.fillStyle = ['#100c193a', '#eee1d927', '#a2868a35'][i % 3];
      ctx.fillRect(rng() * w, rng() * h, rng() * 1.4 + 1.1, rng() * 3.5 + 0.8);
    }
  });
}

export function boothHeader() {
  return paint(1024, 220, (ctx, w, h) => {
    ctx.fillStyle = '#382a37';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#d7966e';
    ctx.lineWidth = 3;
    ctx.strokeRect(12, 12, w - 24, h - 24);
    lantern(ctx, 104, 110, 0.85, '#b3775b', '#f9dcac');
    tracking(ctx, 'TOKENS & PRIZES', 573, 93, 52, '#f7d6a8', 7, serif);
    tracking(ctx, 'L A N T E R N   C O U N T E R', 573, 154, 19, '#e2a987', 2.8);
    line(ctx, [[885, 157], [946, 157], [932, 144]], '#e2a987', 3);
  });
}

export function priceCard(variant = 'counter') {
  return paint(548, 308, (ctx, w, h) => {
    ctx.fillStyle = '#e5d3ac';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#765358';
    ctx.lineWidth = 3;
    ctx.strokeRect(12, 12, w - 24, h - 24);
    tracking(ctx, variant === 'changer' ? 'TOKEN EXCHANGE' : 'LANTERN TOKENS', w / 2, 65, 29, '#62505a', 3.8);
    label(ctx, '4 for $1', w / 2, 150, 97, '#402f42', { family: serif, align: 'center' });
    line(ctx, [[92, 211], [456, 211]], '#aa8275', 2.2);
    tracking(ctx, variant === 'changer' ? 'FEED BILLS FACE UP' : 'ASK ABOUT PRIZE TICKETS', w / 2, 251, 19, '#855657', 2.2);
  });
}

export function prizeLabel(title, color, shade, mark) {
  return paint(320, 256, (ctx, w, h) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = shade;
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    const c = w / 2;
    oval(ctx, c, 101, 65, 62, '', 0, shade, 2.7);
    if (mark === 'kite') {
      polygon(ctx, [[c, 50], [c - 38, 91], [c, 148], [c + 38, 91]], shade, ivory, 2.5);
      line(ctx, [[c, 50], [c, 147], [c + 15, 162], [c - 5, 175]], ivory, 2.2);
      line(ctx, [[c - 37, 92], [c + 37, 92]], ivory, 2.2);
    } else if (mark === 'star') {
      const points = [];
      for (let i = 0; i < 10; i += 1) {
        const angle = i * Math.PI / 5 - Math.PI / 2;
        const r = i % 2 ? 20 : 45;
        points.push([c + Math.cos(angle) * r, 104 + Math.sin(angle) * r]);
      }
      polygon(ctx, points, shade, ivory, 2);
    } else {
      for (let i = 0; i < 3; i += 1) {
        oval(ctx, c - 33 + i * 33, i === 1 ? 78 : 114, 21, 21, shade, 0, ivory, 2.3);
        oval(ctx, c - 38 + i * 33, i === 1 ? 73 : 109, 6, 5, ivory);
      }
    }
    label(ctx, title, c, 190, 37, shade, { family: face, align: 'center', maxWidth: 275 });
    tracking(ctx, 'LANTERN PRIZES', c, 224, 13, shade, 2.5);
  });
}

function posterFinish(ctx, w, h) {
  const rng = random(98);
  for (let i = 0; i < 6000; i += 1) {
    ctx.fillStyle = i % 3 ? '#22182616' : '#fce6bf2c';
    ctx.fillRect(rng() * w, rng() * h, 0.5 + rng() * 4, 0.5 + rng() * 2);
  }
  ctx.strokeStyle = '#eac09891';
  ctx.lineWidth = 2.3;
  ctx.strokeRect(23, 24, w - 46, h - 48);
}

export function poster(type) {
  return paint(512, 680, (ctx, w, h) => {
    const c = w * 0.5;
    if (type === 'scores') {
      ctx.fillStyle = '#302c39';
      ctx.fillRect(0, 0, w, h);
      tracking(ctx, 'LANTERN ARCADE', c, 71, 22, honey, 3.4);
      label(ctx, 'FRIDAY', c, 143, 62, ivory, { family: serif, align: 'center' });
      label(ctx, 'HIGH SCORES', c, 208, 57, ivory, { family: serif, align: 'center' });
      line(ctx, [[60, 253], [452, 253]], '#bc846b', 2.8);
      const records = [['01', 'MICA', '084300'], ['02', 'NELL', '073510'], ['03', 'FOX', '069480'], ['04', 'ARO', '061050'], ['05', 'PIP', '055040']];
      records.forEach(([rank, name, score], i) => {
        const y = 297 + i * 56;
        label(ctx, rank, 64, y, 26, honey, { family: mono });
        label(ctx, name, 142, y, 29, ivory, { family: mono });
        label(ctx, score, 447, y, 29, ivory, { family: mono, align: 'right' });
        line(ctx, [[63, y + 25], [447, y + 25]], '#aa7e7165', 1.3);
      });
      tracking(ctx, 'ASK THE COUNTER TO ADD YOUR SCORE', c, 613, 14, '#c3a798', 1.1);
    } else if (type === 'orbit') {
      ctx.fillStyle = '#5a3944';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#c983604d';
      ctx.fillRect(24, 205, w - 48, 306);
      for (let i = 0; i < 19; i += 1) {
        const angle = i * 0.81;
        oval(ctx, c + Math.cos(angle) * (58 + i * 6), 350 + Math.sin(angle * 3) * (36 + i * 4), i % 3 + 1.5, i % 3 + 1.5, ivory + '90');
      }
      oval(ctx, c, 354, 147, 34, '', -0.4, '#f0bb87', 3.3);
      oval(ctx, c, 352, 89, 89, '#e4a36f');
      oval(ctx, c + 18, 344, 72, 75, '#b06759');
      oval(ctx, c, 354, 150, 40, '', -0.4, '#f9d7ac', 2.9);
      tracking(ctx, 'LANTERN GAME CLUB', c, 63, 18, ivory, 4.4);
      label(ctx, 'ORBIT', c, 121, 80, ivory, { family: face, align: 'center', italic: true });
      label(ctx, 'NIGHT', c, 183, 71, '#edb280', { family: face, align: 'center', italic: true });
      label(ctx, 'EVERY FRIDAY', c, 551, 39, ivory, { family: serif, align: 'center' });
      tracking(ctx, 'PILOTS WELCOME FROM 7 PM', c, 608, 18, '#e7aa89', 3);
    } else if (type === 'relay') {
      ctx.fillStyle = '#365456';
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 11; i += 1) {
        const yy = 208 + i * 27;
        ctx.beginPath();
        ctx.moveTo(23, yy);
        ctx.bezierCurveTo(131, yy + 91, 394, yy - 117, 489, yy - 20);
        ctx.lineWidth = 1.9 + (i % 3 ? 0 : 1.7);
        ctx.strokeStyle = i % 3 ? '#9ab6a89d' : '#ceceae';
        ctx.stroke();
      }
      for (const [x, y] of [[125, 377], [236, 301], [357, 398]]) {
        oval(ctx, x, y, 7, 7, ivory, 0, '#45516a', 3.9);
        oval(ctx, x, y, 18, 18, '', 0, '#c6e8cba1', 1.8);
      }
      tracking(ctx, 'RELAY SYSTEMS', c, 70, 21, '#c7d7bb', 5.3);
      label(ctx, 'FIELD NOTES', c, 136, 61, ivory, { family: face, align: 'center', maxWidth: 430 });
      tracking(ctx, 'F I N D   T H E   S I G N A L', c, 558, 19, '#cee2cd', 2.4);
      label(ctx, 'MOSS RELAY   /   GLASS HARBOR', c, 610, 17, '#a5c2b3', { family: mono, align: 'center' });
    } else {
      ctx.fillStyle = '#615057';
      ctx.fillRect(0, 0, w, h);
      lantern(ctx, c, 146, 1.48, '#ac6a5e', ivory);
      label(ctx, 'HOUSE RULES', c, 274, 48, ivory, { family: serif, align: 'center', maxWidth: 418 });
      for (const [i, caption] of ['TAKE TURNS', 'MIND THE JOYSTICKS', 'LAST TOKENS AT 11:45'].entries()) {
        const y = 375 + i * 79;
        line(ctx, [[96, y - 35], [416, y - 35]], '#bf9381', 1.6);
        label(ctx, caption, c, y, 29, '#edc8a9', { family: mono, align: 'center' });
      }
    }
    posterFinish(ctx, w, h);
  });
}

export function rearMural() {
  return paint(1360, 660, (ctx, w, h) => {
    const background = ctx.createLinearGradient(0, 0, 0, h);
    background.addColorStop(0, '#365153');
    background.addColorStop(1, '#263542');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);
    for (let j = 0; j < 16; j += 1) {
      const y = 110 + j * 35;
      ctx.beginPath();
      ctx.moveTo(0, y + 53);
      ctx.bezierCurveTo(405, y + 147, 744, y - 161, w, y - 31);
      ctx.lineWidth = j % 4 ? 1.7 : 3.5;
      ctx.strokeStyle = j % 3 ? '#64a1987f' : '#c69b7273';
      ctx.stroke();
    }
    for (const [x, y, r] of [[175, 139, 40], [286, 232, 27], [1021, 150, 34], [1172, 241, 52], [1292, 411, 15], [198, 403, 18], [383, 337, 20]]) {
      polygon(ctx, [[x, y - r], [x + r * 0.19, y - r * 0.16], [x + r * 0.72, y],
        [x + r * 0.18, y + r * 0.15], [x, y + r], [x - r * 0.18, y + r * 0.15],
        [x - r * 0.72, y], [x - r * 0.20, y - r * 0.17]], '#c9a57dba');
    }
    ctx.strokeStyle = '#98a79b7a';
    ctx.lineWidth = 3;
    ctx.strokeRect(15, 14, w - 30, h - 29);
    ctx.strokeStyle = '#a59a8574';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(24, 23, w - 48, h - 47);
    const rng = random(85);
    for (let i = 0; i < 20000; i += 1) {
      ctx.fillStyle = i % 4 ? '#181e2720' : '#ead7b926';
      ctx.fillRect(rng() * w, rng() * h, 1 + rng() * 5, 0.5 + rng() * 1.5);
    }
  });
}

export function pouchArt() {
  return borderPlate(624, 132, {
    top: 'LANTERN ARCADE', bottom: 'PASSES  /  LEAGUE CARDS  /  HOUSE SCORES',
    background: navy, ink: ivory, accent: muted,
  });
}
