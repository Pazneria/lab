import { canvasMap, seeded } from './build.js';

const font = '"Segoe UI", Arial, sans-serif';
const mono = 'Consolas, "Courier New", monospace';
const greenInk = '#26372f';
const paper = '#e5e0d0';
const gold = '#ddbd81';
const percept = '#91bebc';
const motion = '#dda281';

function text(ctx, message, x, y, size, color, weight = 500, family = font, align = 'left') {
  ctx.font = weight + ' ' + size + 'px ' + family;
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = align;
  ctx.fillStyle = color;
  ctx.fillText(message, x, y);
  ctx.textAlign = 'left';
}

function line(ctx, segments, color, width = 1) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  segments.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.stroke();
}

function grid(ctx, x, y, w, h, spacing, color) {
  for (let i = 0; i <= w; i += spacing) line(ctx, [[x + i, y], [x + i, y + h]], color);
  for (let i = 0; i <= h; i += spacing) line(ctx, [[x, y + i], [x + w, y + i]], color);
}

function ellipse(ctx, x, y, r1, r2, angle, color, width = 2) {
  ctx.beginPath();
  ctx.ellipse(x, y, r1, r2, angle, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function orbit(ctx, x, y, scale, color) {
  ellipse(ctx, x - scale * .14, y, scale * .36, scale * .66, -.45, color, 3);
  ellipse(ctx, x + scale * .14, y, scale * .36, scale * .66, -.45, color, 3);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, scale * .071, 0, 2 * Math.PI);
  ctx.fill();
}

function tick(ctx, x, y, size, color) {
  line(ctx, [[x - size, y], [x + size, y]], color);
  line(ctx, [[x, y - size], [x, y + size]], color);
}

export function hallMural() {
  return canvasMap(1536, 552, (ctx, w, h) => {
    ctx.fillStyle = '#d4d1bd';
    ctx.fillRect(0, 0, w, h);
    const grain = seeded(41);
    for (let i = 0; i < 2700; ++i) {
      ctx.fillStyle = i % 2 ? '#343d2b18' : '#fffcef30';
      ctx.fillRect(grain() * w, grain() * h, 1 + grain() * 3, 1);
    }
    ctx.fillStyle = '#253832';
    ctx.fillRect(930, 0, 606, h);
    grid(ctx, 953, 25, 552, 504, 24, '#e1e7ca24');
    orbit(ctx, 88, 91, 39, '#344b3f');
    text(ctx, 'PARALLAX', 57, 254, 148, '#253832', 750);
    text(ctx, 'FIELD LAB', 62, 384, 124, '#253832', 355);
    line(ctx, [[61, 427], [869, 427]], '#526459', 2);
    text(ctx, 'INSTRUMENTATION GALLERY', 63, 473, 24, '#41584a', 700, mono);
    text(ctx, 'OPTICS  /  PERCEPTION  /  MOTION', 63, 511, 21, '#526459', 500, mono);
    const cx = 1236;
    const cy = 271;
    for (const radius of [44, 90, 124, 171]) ellipse(ctx, cx, cy, radius, radius * .74, -.48, '#b9c7a4b9', radius === 171 ? 3 : 1.5);
    ellipse(ctx, cx, cy, 164, 81, .58, '#e7bf7c', 2.4);
    line(ctx, [[1038, 271], [1447, 271]], '#c6d1b98c', 1.4);
    line(ctx, [[cx, 100], [cx, 444]], '#c6d1b985', 1.4);
    for (const [x, y] of [[1129, 223], [1309, 204], [1321, 318], [1173, 343], [1102, 313], [cx, cy]]) {
      ellipse(ctx, x, y, 7, 7, 0, '#e8bf78', 3);
    }
    text(ctx, 'PL. 11   /   OPTICAL FIELD ARRAY', 963, 56, 18, '#e0e4c8', 600, mono);
    text(ctx, 'INSTRUMENTATION   •   SECTION A–A', 963, 505, 17, '#e0e4c8', 500, mono);
  });
}

export function directory() {
  return canvasMap(800, 480, (ctx, w, h) => {
    ctx.fillStyle = '#2e4037';
    ctx.fillRect(0, 0, w, h);
    orbit(ctx, 74, 63, 31, '#bfceb0');
    text(ctx, 'GALLERY DIRECTORY', 128, 80, 36, paper, 680);
    const entries = [
      ['01', 'Spectral Array', 'Main gallery', '↑', '#dce5bf'],
      ['02', 'Perception Bench', 'West alcove', '←', percept],
      ['03', 'Motion Test Cell', 'East alcove', '→', motion]
    ];
    entries.forEach(([id, name, detail, arrow, accent], i) => {
      const y = 119 + 108 * i;
      line(ctx, [[49, y], [751, y]], '#e8f0d253', 2);
      text(ctx, id, 50, y + 49, 28, accent, 650, mono);
      text(ctx, name, 128, y + 48, 32, paper, 600);
      text(ctx, detail, 130, y + 76, 18, '#ccdbbe', 500, mono);
      text(ctx, arrow, 730, y + 59, 42, accent, 500, font, 'right');
    });
  });
}

export function fascia(id, name, accent) {
  return canvasMap(864, 140, (ctx, w, h) => {
    ctx.fillStyle = '#2c3834';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, 13, h);
    text(ctx, id, 36, 86, 53, accent, 550, mono);
    line(ctx, [[133, 35], [133, 106]], '#afc1b487', 2);
    text(ctx, name, 162, 92, 60, paper, 620);
  });
}

export function stationBoard(kind) {
  const isPerception = kind === 'perception';
  const accent = isPerception ? percept : motion;
  const dark = isPerception ? '#243f40' : '#44372d';
  const heading = isPerception ? 'PERCEPTION' : 'MOTION TEST CELL';
  return canvasMap(1416, 559, (ctx, w, h) => {
    ctx.fillStyle = dark;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, 14, h);
    text(ctx, isPerception ? '02 / SENSOR LABORATORY' : '03 / ACTUATION LABORATORY', 51, 67, 28, accent, 600, mono);
    text(ctx, heading, 49, 164, isPerception ? 97 : 86, '#ece7d8', 670);
    line(ctx, [[52, 198], [1364, 198]], '#efe8d377', 2);
    const labels = isPerception ? [['01', 'Frame the target.'], ['02', 'Compare edges and color.'], ['03', 'Log the reference capture.']] :
      [['01', 'Zero the carriage.'], ['02', 'Set the travel limits.'], ['03', 'Compare commanded position.']];
    labels.forEach(([id, label], i) => {
      text(ctx, id, 54, 272 + 57 * i, 24, accent, 550, mono);
      text(ctx, label, 114, 272 + 57 * i, 28, '#f0ecdb', 500);
    });
    text(ctx, isPerception ? 'SENSOR AXIS   /   STATIC TARGET' : 'ENCODER AXIS   /   480 MM STROKE', 54, 493, 23, accent, 550, mono);
    grid(ctx, 735, 223, 612, 300, 24, '#e9edda24');
    if (isPerception) {
      const cx = 1037;
      const cy = 366;
      for (const r of [36, 73, 116]) ellipse(ctx, cx, cy, r, r, 0, '#c6dccaac', 2);
      for (const [x, y, sx, sy] of [[863, 257, 1, 1], [1208, 257, -1, 1], [863, 475, 1, -1], [1208, 475, -1, -1]]) {
        line(ctx, [[x, y + 27 * sy], [x, y], [x + 37 * sx, y]], accent, 4);
      }
      line(ctx, [[824, cy], [1254, cy]], '#d7e6d2b7');
      line(ctx, [[cx, 233], [cx, 504]], '#d7e6d2b7');
      tick(ctx, cx, cy, 7, paper);
      ellipse(ctx, 1089, 404, 7, 7, 0, '#e9bd7b', 3);
      ellipse(ctx, 988, 300, 6, 6, 0, '#e9bd7b', 3);
    } else {
      line(ctx, [[777, 473], [821, 473], [885, 437], [939, 345], [994, 289], [1043, 282], [1080, 313], [1125, 394], [1176, 442], [1298, 442]], accent, 5);
      line(ctx, [[776, 473], [841, 473], [894, 440], [941, 359], [1006, 302], [1048, 295], [1084, 324], [1125, 397], [1180, 449], [1298, 449]], '#eae2d58c', 2);
      [[885, 437], [994, 289], [1125, 394], [1176, 442]].forEach(([x, y]) => ellipse(ctx, x, y, 6, 6, 0, paper, 3));
    }
  });
}

export function littlePlaque(title, subtitle, options = {}) {
  const dark = options.dark ?? true;
  const accent = options.accent ?? (dark ? '#ccdec4' : '#405249');
  const ratio = options.ratio ?? 4.8;
  const h = 144;
  const w = Math.round(h * ratio);
  const map = canvasMap(w, h, (ctx) => {
    ctx.fillStyle = dark ? '#25312f' : '#d6d2bf';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = dark ? '#bcc4b778' : '#5e6c607a';
    ctx.lineWidth = 2;
    ctx.strokeRect(5, 5, w - 10, h - 10);
    if (options.stripe) {
      ctx.fillStyle = accent;
      ctx.fillRect(9, 9, 12, h - 18);
    }
    text(ctx, title, 31, subtitle ? 63 : 96, options.size ?? (subtitle ? 39 : 53), dark ? '#f4eddd' : greenInk, 660);
    if (subtitle) text(ctx, subtitle, 31, 111, options.small ?? 24, accent, 600, mono);
  });
  map.userData.plaque = true;
  return map;
}

export function floorSign(title, direction, palette = 'neutral') {
  const colors = { neutral: ['#657668', '#f1e9ca'], perception: ['#4c7373', '#f0eacf'], motion: ['#9b6349', '#f6e9cb'] };
  const [base, print] = colors[palette];
  return canvasMap(768, 184, (ctx, w, h) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    ctx.lineWidth = 3;
    ctx.strokeStyle = print + 'ac';
    ctx.strokeRect(10, 11, w - 20, h - 22);
    text(ctx, direction, 40, 124, 105, print, 450);
    text(ctx, title, 157, 112, 68, print, 640);
  });
}

export function sampleCard() {
  return canvasMap(512, 224, (ctx, w, h) => {
    ctx.fillStyle = '#e4dec7';
    ctx.fillRect(0, 0, w, h);
    text(ctx, 'REFLECTANCE STANDARD', 18, 43, 25, greenInk, 680, mono);
    line(ctx, [[18, 54], [494, 54]], '#62766a');
    const colors = ['#232b2a', '#686e64', '#b0ad98', '#faf1cf', '#ae533f', '#4e7c85'];
    colors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(18 + i * 80, 73, 70, 69);
      text(ctx, '0' + (i + 1), 21 + i * 80, 169, 16, greenInk, 650, mono);
    });
    text(ctx, 'PF–02    /    COMPARE UNDER NEUTRAL LIGHT', 18, 204, 16, greenInk, 600, mono);
  });
}

export function sheetMap(kind) {
  const perception = kind === 'perception';
  return canvasMap(368, 496, (ctx, w, h) => {
    ctx.fillStyle = '#e8e1c9';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#a9ad92';
    ctx.fillRect(0, 0, w, 80);
    text(ctx, perception ? 'CAPTURE LOG' : 'TRAVEL CHECK', 25, 64, 32, greenInk, 700, mono);
    text(ctx, perception ? 'PF–02  /  REFERENCE SET' : 'PF–03  /  RAIL POSITION', 27, 114, 16, greenInk, 660, mono);
    for (let i = 0; i < 7; ++i) {
      const y = 145 + 41 * i;
      line(ctx, [[25, y], [343, y]], '#727e6680');
      text(ctx, '0' + (i + 1), 33, y + 27, 17, greenInk, 550, mono);
      ctx.strokeStyle = '#627862';
      ctx.strokeRect(314, y + 10, 15, 15);
      if (i < 4) {
        line(ctx, [[316, y + 15], [321, y + 22], [329, y + 8]], '#557245', 2);
        line(ctx, [[79, y + 19], [119, y + 19], [125, y + 23], [163, y + 18], [214, y + 20]], '#74816670', 2.4);
      }
    }
    text(ctx, 'INSTRUMENTATION GALLERY', 25, 469, 16, greenInk, 590, mono);
  });
}

function screen(draw, title, sections, accent) {
  return canvasMap(928, 540, (ctx, w, h) => {
    ctx.fillStyle = '#142120';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#253735';
    ctx.fillRect(0, 0, w, 80);
    ctx.fillRect(0, 489, w, 51);
    text(ctx, title, 22, 49, 29, '#e3ebd7', 650);
    text(ctx, sections.top, 904, 47, 19, accent, 600, mono, 'right');
    text(ctx, sections.left, 22, 519, 18, '#d4e3cc', 600, mono);
    text(ctx, sections.right, 904, 519, 18, accent, 600, mono, 'right');
    draw(ctx);
  });
}

export function perceptionScreen() {
  return screen((ctx) => {
    grid(ctx, 23, 104, 576, 360, 24, '#799f9327');
    ctx.strokeStyle = '#768c806b';
    ctx.strokeRect(23, 104, 576, 360);
    const cx = 313;
    const cy = 284;
    const ringColors = ['#6c9997', '#91ada4', '#b7c4a6', '#dbd2a6'];
    [56, 86, 119, 150].forEach((r, i) => ellipse(ctx, cx, cy, r, r, 0, ringColors[i], i === 3 ? 4.5 : 2.3));
    line(ctx, [[52, cy], [566, cy]], '#b0d9c37d', 1.7);
    line(ctx, [[cx, 119], [cx, 446]], '#b0d9c37d', 1.7);
    for (const [x, y] of [[208, 226], [345, 203], [343, 360], [426, 315], [240, 323]]) {
      tick(ctx, x, y, 8, '#edbb69');
      ellipse(ctx, x, y, 13, 13, 0, '#edbb69', 2);
    }
    [[44, 127, 1, 1], [578, 127, -1, 1], [44, 441, 1, -1], [578, 441, -1, -1]].forEach(([x, y, a, b]) =>
      line(ctx, [[x + 20 * a, y], [x, y], [x, y + 21 * b]], '#a6dec6', 3));
    text(ctx, 'TEST FIELD C', 67, 156, 16, '#deefcc', 650, mono);
    line(ctx, [[621, 102], [621, 466]], '#97ad946c');
    text(ctx, 'COLOR REFERENCE', 646, 136, 19, '#a5d2c4', 650, mono);
    const swatches = ['#a14e43', '#b99f62', '#d6bf83', '#66877a', '#5d8c98', '#83768f', '#2f3837', '#686d64', '#969684', '#c5c0a6', '#dcd7bd', '#f4f0d9'];
    for (let i = 0; i < swatches.length; ++i) {
      ctx.fillStyle = swatches[i];
      ctx.fillRect(647 + i % 6 * 42, 160 + Math.floor(i / 6) * 41, 38, 36);
    }
    text(ctx, 'EDGE STEPS', 646, 288, 19, '#a5d2c4', 650, mono);
    for (let i = 0; i < 7; ++i) {
      const v = Math.floor(43 + i * 26);
      ctx.fillStyle = 'rgb(' + v + ',' + (v + 3) + ',' + v + ')';
      ctx.fillRect(647 + i * 36, 312, 35, 53);
    }
    text(ctx, '35 MM    F/5.6    1/80', 646, 428, 19, '#e4e8cd', 600, mono);
  }, 'Optical reference / C', { top: '■  REFERENCE FRAME', left: 'PF–02   /   STATIONARY TARGET', right: '640 × 480' }, '#a4dbc0');
}

export function motionScreen() {
  return screen((ctx) => {
    grid(ctx, 45, 117, 552, 312, 24, '#9fb79e31');
    ctx.strokeStyle = '#b7c5aa83';
    ctx.strokeRect(45, 117, 552, 312);
    const intended = [[45, 386], [127, 386], [190, 335], [253, 230], [315, 171], [369, 170], [427, 264], [482, 344], [597, 344]];
    const measured = [[45, 393], [135, 393], [196, 340], [256, 237], [320, 182], [369, 180], [421, 263], [483, 353], [597, 353]];
    line(ctx, intended, '#efbd80', 4);
    line(ctx, measured, '#74bcb1', 3);
    for (const [x, y] of intended.slice(1, -1)) ellipse(ctx, x, y, 4.5, 4.5, 0, '#efbd80', 3);
    text(ctx, '0.0 s', 45, 458, 17, '#d8dfc8', 500, mono);
    text(ctx, '4.0 s', 597, 458, 17, '#d8dfc8', 500, mono, 'right');
    line(ctx, [[623, 117], [623, 458]], '#9fb79e69');
    text(ctx, 'CARRIAGE', 652, 152, 22, '#ebc895', 620, mono);
    text(ctx, '184.2', 647, 226, 62, '#f3edda', 520, mono);
    text(ctx, 'mm', 851, 226, 23, '#c1d7c1', 500, mono);
    text(ctx, 'COMMAND', 652, 302, 21, '#ebc895', 600, mono);
    text(ctx, 'ENCODER', 652, 353, 21, '#89c5b6', 600, mono);
    line(ctx, [[818, 293], [889, 293]], '#efbd80', 4);
    line(ctx, [[818, 345], [889, 345]], '#74bcb1', 4);
    text(ctx, 'BRAKE ENGAGED', 652, 429, 19, '#cddabd', 600, mono);
  }, 'Linear travel / A', { top: '■  READY', left: 'PF–03   /   RECORDED PASS', right: 'STEP 06 OF 06' }, '#efc18e');
}

export function arrayScreen() {
  return screen((ctx) => {
    grid(ctx, 41, 103, 504, 360, 24, '#80ac9538');
    const x = 291, y = 284;
    for (const r of [49, 88, 127, 163]) ellipse(ctx, x, y, r, r * .82, -.12, '#bddcc3a5', 2);
    line(ctx, [[68, y], [514, y]], '#bfdabf73', 2);
    line(ctx, [[x, 132], [x, 439]], '#bfdabf73', 2);
    for (let i = 0; i < 7; ++i) {
      const a = i * Math.PI * 2 / 7;
      ellipse(ctx, x + Math.cos(a) * 130, y + Math.sin(a) * 108, 7, 7, 0, '#e7c175', 3.5);
    }
    text(ctx, 'SAMPLE BAY', 587, 159, 25, '#c1dbbe', 650, mono);
    text(ctx, 'CLEAR', 585, 218, 48, '#e7edcc', 550, mono);
    text(ctx, 'EMITTERS          07', 588, 290, 23, '#a4c7ae', 500, mono);
    text(ctx, 'RECEIVERS        07', 588, 335, 23, '#a4c7ae', 500, mono);
    text(ctx, 'SOURCE       4500 K', 588, 380, 23, '#a4c7ae', 500, mono);
  }, 'Spectral Array', { top: '■  STANDBY', left: 'PF–01   /   OPTICAL STAGE', right: 'FIELD CLEAR' }, '#b2dfb1');
}
