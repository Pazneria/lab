import { seeded } from './kit.js';
import { canvasMaterial } from './materials.js';

function polygon(ctx, points, fill) {
  ctx.beginPath();
  points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function line(ctx, x, y, x2, y2, color, width = 1) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

function label(ctx, text, x, y, size, color = '#c1cec3', weight = 600) {
  ctx.font = weight + ' ' + size + 'px Arial, sans-serif';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function badge(name, top, bottom, accent = '#c2b28d') {
  return canvasMaterial(name, 512, 96, (ctx, w, h) => {
    ctx.fillStyle = '#25363a';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, 5, h);
    ctx.fillRect(24, 25, 7, 22);
    ctx.fillRect(36, 25, 4, 15);
    label(ctx, top, 57, 46, 29, '#ebdfc6', 700);
    label(ctx, bottom, 59, 72, 14, '#b3c2b9', 600);
    line(ctx, 434, 69, 479, 69, accent, 2);
    line(ctx, 445, 62, 479, 62, '#738984', 2);
  });
}

function landscape(ctx, w, h, style) {
  const rng = seeded(style === 'night' ? 712 : 318);
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  const isNight = style === 'night';
  sky.addColorStop(0, isNight ? '#253a43' : '#b7a18b');
  sky.addColorStop(0.65, isNight ? '#80928c' : '#ead0a3');
  sky.addColorStop(1, isNight ? '#bcc5aa' : '#d9b987');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = isNight ? '#d5d8b5' : '#f1dcad';
  ctx.beginPath();
  ctx.arc(w * 0.72, h * 0.29, w * (isNight ? 0.074 : 0.11), 0, Math.PI * 2);
  ctx.fill();
  if (isNight) {
    for (let i = 0; i < 95; i++) {
      ctx.globalAlpha = .18 + rng() * .64;
      ctx.fillRect(rng() * w, rng() * h * .48, 1 + rng() * .7, 1 + rng() * .7);
    }
    ctx.globalAlpha = 1;
  }
  const hills = isNight ? ['#6c8078', '#4c6767', '#344f54', '#273d45'] : ['#a49979', '#837e64', '#52685d', '#354f49'];
  for (let layer = 0; layer < hills.length; layer++) {
    const points = [[0, h], [0, h * (0.5 + 0.1 * layer)]];
    for (let i = 0; i <= 40; i++) {
      const u = i / 40;
      const ridge = .075 * Math.cos(u * (10 + layer) + layer * 2)
        + .036 * Math.sin(u * 28 + 2 * layer) + (rng() - .5) * .025;
      points.push([u * w, (0.56 + layer * 0.1 + ridge) * h]);
    }
    points.push([w, h]);
    polygon(ctx, points, hills[layer]);
  }
  polygon(ctx, [[0, h * .95], [w * .29, h * .86], [w * .48, h * .85], [w * .54, h * .79],
    [w * .47, h * .77], [w * .59, h * .76], [w * .65, h * .8], [w * .58, h * .88],
    [w * .43, h * .94], [w * .33, h]], isNight ? '#69827e' : '#889482');
  for (let i = 0; i < 2100; i++) {
    ctx.globalAlpha = rng() * .12;
    ctx.fillStyle = i % 2 ? '#f3e5c4' : '#182a25';
    ctx.fillRect(rng() * w, rng() * h, 1, 1);
  }
  ctx.globalAlpha = 1;
}

function snapshot(ctx, w, h) {
  landscape(ctx, w, h, 'coast');
  const people = [
    { x: .36, y: .41, shirt: '#3a5559', hair: '#292e2c', skin: '#ab7d60', collar: '#9d9a79' },
    { x: .63, y: .46, shirt: '#7c4c43', hair: '#47382d', skin: '#c59a75', collar: '#d2b88a' }
  ];
  for (const person of people) {
    const x = person.x * w, y = person.y * h;
    const shoulders = ctx.createLinearGradient(x - w * .18, y, x + w * .15, h);
    shoulders.addColorStop(0, person.shirt);
    shoulders.addColorStop(1, '#2a3a39');
    polygon(ctx, [[x - w * .21, h], [x - w * .17, y + h * .37], [x - w * .08, y + h * .28],
      [x + w * .079, y + h * .277], [x + w * .18, y + h * .40], [x + w * .23, h]], shoulders);
    polygon(ctx, [[x - w * .069, y + h * .282], [x - w * .036, y + h * .181],
      [x + w * .041, y + h * .16], [x + w * .066, y + h * .29], [x, y + h * .332]], person.skin);
    ctx.beginPath();
    ctx.ellipse(x, y + h * .104, w * .075, h * .147, -.17, 0, Math.PI * 2);
    ctx.fillStyle = person.skin;
    ctx.fill();
    polygon(ctx, [[x - w * .076, y + h * .11], [x - w * .073, y + h * .01],
      [x - w * .044, y - h * .040], [x + w * .022, y - h * .05], [x + w * .067, y - h * .013],
      [x + w * .076, y + h * .076], [x + w * .041, y + h * .058], [x - w * .045, y + h * .067]], person.hair);
    line(ctx, x - w * .046, y + h * .106, x - w * .020, y + h * .101, '#513f34', 2);
    line(ctx, x + w * .016, y + h * .106, x + w * .043, y + h * .11, '#513f34', 2);
    line(ctx, x - w * .01, y + h * .195, x + w * .025, y + h * .193, '#855b4d', 2);
    polygon(ctx, [[x - w * .08, y + h * .273], [x - w * .005, y + h * .321],
      [x + w * .070, y + h * .279], [x + w * .054, y + h * .354],
      [x - w * .012, y + h * .373], [x - w * .061, y + h * .34]], person.collar);
    line(ctx, x - w * .007, y + h * .36, x + w * .008, h, '#a2987e88', 3);
  }
  const rng = seeded(7934);
  for (let i = 0; i < 5100; i++) {
    ctx.globalAlpha = rng() * .115;
    ctx.fillStyle = i % 2 ? '#f0e0be' : '#213234';
    ctx.fillRect(rng() * w, rng() * h, 1, 1);
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#d2c4a3';
  ctx.fillRect(0, h - 25, w, 25);
  label(ctx, 'NACRE  /  AFTER THE CROSSING', 16, h - 8, 12, '#545f51');
}

function ephemeris(ctx, w, h) {
  ctx.fillStyle = '#243e49';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#79969a';
  ctx.strokeRect(18, 18, w - 36, h - 36);
  const rng = seeded(71844);
  for (let i = 0; i < 380; i++) {
    ctx.globalAlpha = .14 + .55 * rng();
    ctx.fillStyle = i % 7 ? '#a8b9ac' : '#dac3a0';
    ctx.fillRect(31 + rng() * (w - 62), 33 + rng() * (h - 66), i % 19 ? 1 : 2.2, i % 19 ? 1 : 2.2);
  }
  ctx.globalAlpha = 1;
  const bx = w * .49, by = h * .53;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.ellipse(bx, by, 69 + i * 48, 28 + i * 17, -.245, 0, Math.PI * 2);
    ctx.lineWidth = 1.35;
    ctx.strokeStyle = i % 2 ? '#869c91' : '#627f81';
    ctx.stroke();
  }
  const gradient = ctx.createLinearGradient(bx - 64, by - 37, bx + 72, by + 47);
  gradient.addColorStop(0, '#9dbcc0');
  gradient.addColorStop(.52, '#577f8b');
  gradient.addColorStop(1, '#334f5c');
  ctx.beginPath();
  ctx.arc(bx, by, 49, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  for (const [x, y, r] of [[263, 227, 7], [613, 186, 6], [450, 103, 4.4], [205, 145, 4]]) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#c9b28a';
    ctx.fill();
  }
  line(ctx, 613, 185, 646, 140, '#c4aa7e', 1);
  label(ctx, 'PELAGIC  /  TRANSIT STUDY', 36, 47, 18, '#c7c9ac');
  label(ctx, 'VALE  ·  FIELD COPY', 36, h - 34, 12, '#a2b4ab');
  label(ctx, 'FIRST LIGHT', 647, 139, 12, '#c8ad8a');
}

export function graphics() {
  const manifest = canvasMaterial('Watch handover sheet', 512, 680, (ctx, w, h) => {
    ctx.fillStyle = '#d6c6a6';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#343e39';
    ctx.fillRect(29, 32, w - 58, 47);
    label(ctx, 'WATCH HANDOVER', 47, 63, 23, '#e2d6b8', 700);
    label(ctx, 'MERIDIAN     /     SHIFT 06', 34, 115, 19, '#3f4c49');
    const rng = seeded(366);
    for (let row = 0; row < 10; row++) {
      const y = 155 + row * 37;
      line(ctx, 33, y + 20, w - 33, y + 20, '#a59e83', 1);
      ctx.strokeStyle = '#65716a';
      ctx.strokeRect(36, y - 6, 14, 14);
      if (row < 6) {
        line(ctx, 36, y, 42, y + 5, '#79614c', 3);
        line(ctx, 42, y + 5, 51, y - 8, '#79614c', 3);
      }
      for (let col = 0; col < 3; col++) {
        const x = 79 + col * 124;
        line(ctx, x, y, x + 19 + rng() * 69, y, '#676d5f', 3);
        line(ctx, x, y + 7, x + 14 + rng() * 45, y + 7, '#93937c', 2);
      }
    }
    ctx.beginPath();
    ctx.ellipse(396, 608, 65, 30, -0.23, 0, Math.PI * 2);
    ctx.strokeStyle = '#95675a';
    ctx.lineWidth = 3;
    ctx.stroke();
    label(ctx, 'REVIEWED', 361, 616, 13, '#95675a');
  });

  const nav = canvasMaterial('Passive route display', 800, 480, (ctx, w, h) => {
    const backdrop = ctx.createLinearGradient(0, 0, w, h);
    backdrop.addColorStop(0, '#1c3538');
    backdrop.addColorStop(1, '#16292f');
    ctx.fillStyle = backdrop;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#435e5d';
    ctx.lineWidth = 1;
    for (let x = 29; x < w; x += 28) line(ctx, x, 0, x, h, '#374e50');
    for (let y = 30; y < h; y += 28) line(ctx, 0, y, w, y, '#374e50');

    const route = [[70, 373], [180, 282], [274, 315], [362, 201], [498, 232], [572, 143], [730, 110]];
    ctx.beginPath();
    route.forEach(([x, y], index) => index ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
    ctx.strokeStyle = '#d2ab77';
    ctx.lineWidth = 3;
    ctx.stroke();
    for (let i = 0; i < route.length; i++) {
      const [x, y] = route[i];
      ctx.beginPath();
      ctx.arc(x, y, i === 3 ? 12 : 6, 0, 2 * Math.PI);
      ctx.fillStyle = i === 3 ? '#d7b88b' : '#799b90';
      ctx.fill();
    }
    for (const [x, y, rx, ry] of [[365, 214, 91, 59], [567, 151, 55, 37], [274, 315, 34, 24]]) {
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, -0.28, 0, Math.PI * 2);
      ctx.strokeStyle = '#698982';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
    ctx.fillStyle = '#243b40';
    ctx.fillRect(0, 0, w, 61);
    ctx.fillRect(0, h - 37, w, 37);
    label(ctx, 'PILOTAGE   /   RELIEF TRACK', 27, 39, 20);
    label(ctx, '06     14     22', 608, 39, 16, '#96a9a0');
    for (let x = 32; x < w - 18; x += 21) line(ctx, x, h - 20, x, h - 14, '#76928a');
  }, { basic: true });

  const littleMap = canvasMaterial('Survey pinboard', 640, 360, (ctx, w, h) => {
    ctx.fillStyle = '#bbae90';
    ctx.fillRect(0, 0, w, h);
    const rng = seeded(15);
    for (let x = 19; x < w; x += 24) line(ctx, x, 0, x, h, '#9e9e85');
    for (let y = 18; y < h; y += 24) line(ctx, 0, y, w, y, '#9e9e85');
    for (let i = 0; i < 13; i++) {
      ctx.beginPath();
      for (let n = 0; n <= 72; n++) {
        const a = n / 72 * Math.PI * 2;
        const rx = 30 + i * 12 + 18 * Math.sin(a * 3.0) + 10 * Math.sin(a * 5.0 + 1);
        const ry = 20 + i * 7 + 11 * Math.sin(a * 4.0);
        const x = w * .57 + rx * Math.cos(a) + i * 2.1;
        const y = h * .49 + ry * Math.sin(a) - i * 1.6;
        if (n) ctx.lineTo(x, y); else ctx.moveTo(x, y);
      }
      ctx.strokeStyle = i % 3 === 0 ? '#64786d' : '#7b8975';
      ctx.lineWidth = i % 3 === 0 ? 2 : 1;
      ctx.stroke();
    }
    for (let i = 0; i < 60; i++) {
      const x = rng() * w, y = rng() * h;
      ctx.fillStyle = i % 9 === 0 ? '#825c4c' : '#93a08a';
      ctx.fillRect(x, y, i % 9 === 0 ? 6 : 2, i % 9 === 0 ? 6 : 2);
    }
    label(ctx, 'PELAGIC BASIN', 31, 45, 22, '#455b53', 700);
    label(ctx, 'RELIEF SURVEY   208.4', 32, 67, 12, '#4a645a');
  });

  return {
    berth: badge('Bedroom nameplate', '07  /  CAPT. SERA VALE', 'PRIVATE QUARTERS'),
    study: badge('Study threshold plate', 'PRIVATE STUDY', 'WATCH & NAVIGATION'),
    observation: badge('Observation threshold plate', 'OBSERVATION', 'PORTSIDE VIEW BAY', '#93b7ba'),
    hullMark: badge('Hatch certification plate', 'BULKHEAD  07–A', 'PRESSURE DOOR'),
    glazing: badge('Glazing certification plate', 'OBS–07  /  OUTER HULL', 'LAMINATED VIEWPORT', '#93b7ba'),
    manifest, nav, littleMap,
    snapshot: canvasMaterial('Nacre family photograph', 512, 360, snapshot),
    ephemeris: canvasMaterial('Hand-plotted Pelagic ephemeris', 768, 384, ephemeris),
    coast: canvasMaterial('Coastal sketch on cotton paper', 480, 340, (ctx, w, h) => landscape(ctx, w, h, 'coast')),
    hills: canvasMaterial('Night survey print', 480, 340, (ctx, w, h) => landscape(ctx, w, h, 'night')),
    notebook: canvasMaterial('Field notebook cover stamp', 256, 320, (ctx, w, h) => {
      ctx.fillStyle = '#645045';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#94795c';
      ctx.strokeRect(22, 21, w - 44, h - 42);
      label(ctx, 'S. VALE', 46, 71, 29, '#bdab86');
      for (let i = 0; i < 3; i++) line(ctx, 46, 97 + i * 8, 164 - i * 14, 97 + i * 8, '#a58a6b', 2);
      ctx.beginPath();
      ctx.arc(128, 206, 34, 0, 2 * Math.PI);
      ctx.strokeStyle = '#9c8466';
      ctx.stroke();
      line(ctx, 94, 209, 157, 195, '#9c8466', 2);
    })
  };
}
