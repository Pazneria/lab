import * as THREE from '../vendor/three.module.min.js';

const sans = '"Segoe UI", Arial, sans-serif';
const display = '"Arial Black", "Segoe UI", Arial, sans-serif';
const mono = 'Consolas, "Courier New", monospace';
const serif = 'Georgia, "Times New Roman", serif';

export function random(seed) {
  return function next() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

export function paint(width, height, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  draw(context, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function line(ctx, points, color, width = 1) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (const [x, y] of points.slice(1)) ctx.lineTo(x, y);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

export function polygon(ctx, points, color, stroke, width = 1) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (const [x, y] of points.slice(1)) ctx.lineTo(x, y);
  ctx.closePath();
  if (color) {
    ctx.fillStyle = color;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.stroke();
  }
}

export function oval(ctx, x, y, rx, ry, color, angle = 0, stroke = '', width = 1) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, angle, 0, Math.PI * 2);
  if (color) {
    ctx.fillStyle = color;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.stroke();
  }
}

export function label(ctx, content, x, y, size, color, options = {}) {
  const { align = 'left', family = sans, weight = 700, maxWidth, italic = false } = options;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.font = (italic ? 'italic ' : '') + weight + ' ' + size + 'px ' + family;
  ctx.fillStyle = color;
  if (maxWidth) ctx.fillText(content, x, y, maxWidth);
  else ctx.fillText(content, x, y);
}

export function tracking(ctx, content, center, y, size, color, spacing = 4, family = mono) {
  ctx.font = '700 ' + size + 'px ' + family;
  const letters = Array.from(content);
  const widths = letters.map(letter => ctx.measureText(letter).width);
  const total = widths.reduce((sum, width) => sum + width, 0) + spacing * (letters.length - 1);
  let x = center - total * 0.5;
  letters.forEach((letter, index) => {
    label(ctx, letter, x, y, size, color, { family });
    x += widths[index] + spacing;
  });
}

function background(ctx, w, h, top, bottom) {
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, top);
  gradient.addColorStop(1, bottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
}

function grain(ctx, w, h, seed, count, light = 'rgba(255,235,199,0.075)', dark = 'rgba(0,0,15,0.09)') {
  const rng = random(seed);
  for (let i = 0; i < count; i += 1) {
    ctx.fillStyle = i % 3 === 0 ? light : dark;
    ctx.fillRect(rng() * w, rng() * h, 0.5 + rng() * 2, 0.5 + rng() * 1.4);
  }
}

function star(ctx, x, y, radius, color, points = 4, turn = 0) {
  const vertices = [];
  for (let i = 0; i < points * 2; i += 1) {
    const angle = turn + i * Math.PI / points - Math.PI / 2;
    const r = i % 2 === 0 ? radius : radius * 0.24;
    vertices.push([x + Math.cos(angle) * r, y + Math.sin(angle) * r]);
  }
  polygon(ctx, vertices, color);
}

function sparks(ctx, w, h, seed, color, n = 80) {
  const rng = random(seed);
  for (let i = 0; i < n; i += 1) {
    ctx.globalAlpha = 0.2 + rng() * 0.56;
    const x = rng() * w;
    const y = rng() * h;
    if (i % 12 === 0) star(ctx, x, y, 2.5 + rng() * 4, color);
    else oval(ctx, x, y, 0.6 + rng() * 1.5, 0.6 + rng(), color);
  }
  ctx.globalAlpha = 1;
}

function ruling(ctx, x, y, w, h, color, step = 22) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  for (let a = x; a <= x + w; a += step) line(ctx, [[a, y], [a, y + h]], color);
  for (let b = y; b <= y + h; b += step) line(ctx, [[x, b], [x + w, b]], color);
  ctx.restore();
}

function contour(ctx, x, y, width, height, color, steps = 7) {
  for (let ring = 0; ring < steps; ring += 1) {
    const points = [];
    const factor = 0.27 + ring * 0.115;
    for (let i = 0; i <= 100; i += 1) {
      const t = i / 100 * Math.PI * 2;
      const warp = 1 + 0.12 * Math.sin(3 * t + ring * 0.1) + 0.075 * Math.sin(5 * t - ring * 0.12);
      points.push([x + Math.cos(t) * width * factor * warp, y + Math.sin(t) * height * factor * warp]);
    }
    line(ctx, points, color, 1.7);
  }
}

function planet(ctx, x, y, r, game, tilt) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tilt);
  for (let i = 0; i < 4; i += 1) oval(ctx, 0, 0, r * (1.53 + 0.1 * i), r * (0.34 + 0.045 * i), '', 0, i === 0 ? game.pale : game.bright, i === 0 ? 2.3 : 1.2);
  const planetLight = ctx.createLinearGradient(-r, -r, r, r);
  planetLight.addColorStop(0, game.pale);
  planetLight.addColorStop(0.32, game.bright);
  planetLight.addColorStop(0.64, game.second);
  planetLight.addColorStop(1, game.shade);
  oval(ctx, 0, 0, r, r, planetLight);
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();
  for (let i = -6; i < 12; i += 1) {
    const dy = i * r * 0.19;
    ctx.beginPath();
    ctx.moveTo(-r, dy);
    ctx.bezierCurveTo(-r * 0.5, dy - r * 0.22, r * 0.4, dy + r * 0.26, r, dy - r * 0.12);
    ctx.lineWidth = r * (i % 4 === 0 ? 0.08 : 0.022);
    ctx.strokeStyle = i % 3 ? game.shade + '70' : game.pale + 'aa';
    ctx.stroke();
  }
  ctx.restore();
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.ellipse(0, 0, r * (1.53 + 0.1 * i), r * (0.34 + 0.045 * i), 0, 0, Math.PI);
    ctx.strokeStyle = i === 0 ? game.pale : game.bright;
    ctx.lineWidth = i === 0 ? 2.4 : 1.3;
    ctx.stroke();
  }
  ctx.restore();
}

function courier(ctx, x, y, scale, game) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  polygon(ctx, [[-102, 16], [-49, -11], [52, -22], [103, -3], [34, 12], [-48, 29]], game.pale, game.ink, 2);
  polygon(ctx, [[-7, -14], [24, -40], [76, -21], [97, -6], [25, -3], [-19, 12]], game.bright, game.ink, 2);
  polygon(ctx, [[26, -29], [67, -20], [82, -10], [37, -13]], game.shade, game.ink, 2);
  polygon(ctx, [[11, 5], [31, 33], [-59, 31], [-85, 21], [-36, 11]], game.second, game.ink, 2);
  polygon(ctx, [[-70, -6], [-50, -52], [-23, -46], [-13, -18]], game.second, game.ink, 2);
  line(ctx, [[-40, -43], [-32, -42], [-19, -23]], game.pale, 1.8);
  line(ctx, [[-95, 19], [-52, 24], [14, 13], [63, 5]], game.bright, 2.2);
  for (let i = 0; i < 3; i += 1) {
    line(ctx, [[-122 - 22 * i, 20 + i * 5], [-100 - 12 * i, 20 + i * 5]], game.bright, 3 - i * 0.65);
  }
  ctx.restore();
}

function fern(ctx, x, y, scale, game, turn = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(turn);
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.moveTo(-18, 188);
  ctx.bezierCurveTo(26, 77, -22, -15, 10, -158);
  ctx.strokeStyle = game.pale;
  ctx.lineWidth = 4;
  ctx.stroke();
  for (let i = 0; i < 11; i += 1) {
    const yy = 140 - i * 24;
    const ll = 91 - i * 6.25;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(2, yy);
      ctx.bezierCurveTo(side * ll * 0.42, yy - 34, side * ll * 0.7, yy - 50, side * ll, yy - 51);
      ctx.bezierCurveTo(side * ll * 0.88, yy - 20, side * ll * 0.48, yy - 7, 2, yy);
      ctx.fillStyle = (i + side) % 3 === 0 ? game.bright : game.second;
      ctx.fill();
      line(ctx, [[1, yy - 3], [side * ll * 0.68, yy - 33]], game.pale + '9c', 1);
    }
  }
  ctx.restore();
}

function beacon(ctx, x, y, s, game) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  polygon(ctx, [[-64, 132], [63, 132], [44, 89], [30, 84], [24, -83], [-24, -83], [-37, 94]], game.bright, game.pale, 2);
  polygon(ctx, [[0, 132], [63, 132], [44, 89], [30, 84], [24, -83], [8, -83]], game.second, '', 0);
  polygon(ctx, [[-36, -87], [35, -87], [30, -129], [0, -157], [-32, -129]], game.ink, game.pale, 2.5);
  polygon(ctx, [[-21, -90], [20, -90], [17, -119], [-17, -119]], game.pale);
  line(ctx, [[0, -91], [0, -118]], game.second, 2);
  line(ctx, [[-41, -84], [39, -84]], game.pale, 4);
  line(ctx, [[-31, 1], [27, -18]], game.shade, 15);
  line(ctx, [[-37, 68], [28, 44]], game.shade, 15);
  polygon(ctx, [[-13, 127], [9, 127], [9, 92], [-13, 92]], game.ink);
  ctx.restore();
}

function jelly(ctx, x, y, s, game, seed = 80) {
  const rng = random(seed);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  for (let i = 0; i < 13; i += 1) {
    const start = -104 + i * 17.1;
    const length = 94 + 114 * rng();
    const direction = i / 12 - 0.5;
    ctx.beginPath();
    ctx.moveTo(start, 9);
    ctx.bezierCurveTo(start + direction * 78, 66, start - 87, length * 0.62, start + direction * 87, length);
    ctx.strokeStyle = [game.second + 'b3', game.pale + 'a9', '#e99b898f'][i % 3];
    ctx.lineWidth = 1.3 + rng() * 2.8;
    ctx.stroke();
    if (i % 3 === 0) star(ctx, start + direction * 87, length, 4, game.bright);
  }
  const light = ctx.createLinearGradient(0, -114, 0, 32);
  light.addColorStop(0, '#fff0b9');
  light.addColorStop(0.22, game.second);
  light.addColorStop(0.72, '#276479');
  light.addColorStop(1, '#143343');
  ctx.beginPath();
  ctx.moveTo(-122, 8);
  ctx.bezierCurveTo(-132, -52, -70, -112, 0, -113);
  ctx.bezierCurveTo(70, -112, 132, -52, 122, 8);
  ctx.quadraticCurveTo(83, 30, 0, 23);
  ctx.quadraticCurveTo(-83, 30, -122, 8);
  ctx.fillStyle = light;
  ctx.fill();
  ctx.lineWidth = 2.6;
  ctx.strokeStyle = game.pale;
  ctx.stroke();
  for (let i = -5; i <= 5; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * 23, 13);
    ctx.quadraticCurveTo(i * 23, -62, i * 5, -110);
    ctx.strokeStyle = i % 2 ? '#fff1c5a8' : '#72d6c8cc';
    ctx.lineWidth = i % 2 ? 1.2 : 2.3;
    ctx.stroke();
  }
  oval(ctx, 0, 13, 121, 15, '', 0, game.bright, 2);
  for (let i = 0; i < 13; i += 1) oval(ctx, -103 + i * 17.1, 12 + Math.sin(i * 0.25) * 6, 2.8, 2.8, game.pale);
  ctx.restore();
}

function border(ctx, x, y, w, h, color, cutoff = 16, width = 2) {
  polygon(ctx, [
    [x + cutoff, y], [x + w - cutoff, y], [x + w, y + cutoff], [x + w, y + h - cutoff],
    [x + w - cutoff, y + h], [x + cutoff, y + h], [x, y + h - cutoff], [x, y + cutoff],
  ], '', color, width);
}

export function marquee(game) {
  const isFeature = game.family === 'feature';
  const texture = paint(isFeature ? 1024 : 768, isFeature ? 252 : 208, (ctx, w, h) => {
    background(ctx, w, h, game.shade, game.ink);
    if (game.family === 'orbit') {
      sparks(ctx, w, h, 34, game.bright, 85);
      planet(ctx, 112, 108, 46, game, -0.42);
      for (let i = 0; i < 4; i += 1) line(ctx, [[613, 52 + i * 21], [721, 52 + i * 21]], game.bright + '61', 2);
      label(ctx, game.name, 425, 100, 59, game.pale, { align: 'center', family: display, maxWidth: 458, italic: true });
      tracking(ctx, 'O R B I T   C L U B', 431, 157, 17, game.bright, 1.6);
    } else if (game.family === 'relay') {
      ruling(ctx, 20, 19, w - 40, h - 38, game.second + '34', 17);
      contour(ctx, 108, 104, 113, 82, game.second + 'bc');
      if (game.id === 'moss') fern(ctx, 100, 110, 0.34, game, -0.35);
      else beacon(ctx, 103, 103, 0.39, game);
      label(ctx, game.name, 437, 99, 53, game.pale, { align: 'center', family: display, maxWidth: 505 });
      tracking(ctx, 'RELAY SYSTEMS', 434, 157, 18, game.bright, 4);
    } else {
      sparks(ctx, w, h, 12, game.pale, 90);
      for (let i = 0; i < 5; i += 1) {
        const offset = i * 12;
        line(ctx, [[32, 178 - offset], [145, 161 - offset], [207, 178 - offset]], game.second + 'bf', 1.8);
        line(ctx, [[w - 32, 178 - offset], [w - 145, 161 - offset], [w - 207, 178 - offset]], game.second + 'bf', 1.8);
      }
      star(ctx, 132, 105, 29, game.bright);
      star(ctx, w - 132, 105, 29, game.bright);
      tracking(ctx, 'N I G H T', w / 2, 69, 44, game.bright, 4.3, serif);
      label(ctx, 'CURRENT', w / 2, 139, 101, game.pale, { align: 'center', family: serif, maxWidth: 611 });
      tracking(ctx, 'B I O L U M I N E S C E N T   R I D E', w / 2, 211, 18, game.second, 2.2);
    }
    border(ctx, 13, 13, w - 26, h - 26, game.bright, 13, 3);
    border(ctx, 21, 21, w - 42, h - 42, game.bright + '68', 11, 1.4);
    grain(ctx, w, h, 90, 3000);
  });
  texture.name = game.name + ' marquee';
  return texture;
}

export function sideArt(game) {
  const texture = paint(640, 1024, (ctx, w, h) => {
    background(ctx, w, h, game.body, game.ink);
    const rng = random(13);
    if (game.family === 'orbit') {
      for (let i = 0; i < 6; i += 1) {
        const d = i * 29;
        polygon(ctx, [[0, 225 + d], [308, 525 + d], [640, 613 + d], [640, 629 + d], [304, 541 + d], [0, 241 + d]],
          [game.ink + 'b3', game.shade, game.second + 'af'][i % 3]);
      }
      sparks(ctx, w, h * 0.72, 33, game.bright, 135);
      planet(ctx, 306, 482, 132, game, -0.54);
      ctx.save();
      ctx.translate(352, 645);
      ctx.rotate(-0.34);
      courier(ctx, 0, 0, 1.24, game);
      ctx.restore();
      tracking(ctx, 'O R B I T   C L U B', 317, 171, 20, game.pale, 2);
      label(ctx, game.split[0], 317, 231, 87, game.pale, { align: 'center', family: display, italic: true, maxWidth: 479 });
      label(ctx, game.split[1], 317, 309, 87, game.bright, { align: 'center', family: display, italic: true, maxWidth: 477 });
      line(ctx, [[80, 805], [190, 805], [221, 829], [559, 829]], game.bright + '9c', 3.2);
      tracking(ctx, game.tagline, 320, 868, 19, game.pale, 2.3);
      label(ctx, 'CAB ' + game.station + '   •   LANTERN SERVICE CO.', 82, 920, 15, game.bright + 'ae', { family: mono });
    } else if (game.family === 'relay') {
      ruling(ctx, 28, 119, 584, 780, game.bright + '28', 27);
      border(ctx, 37, 147, 566, 748, game.bright + '90', 34, 2.5);
      border(ctx, 49, 159, 542, 724, game.bright + '55', 31, 1.4);
      contour(ctx, 321, 531, 258, 243, game.second + 'c3', 9);
      for (let i = 0; i < 29; i += 1) {
        const yy = 186 + 23.3 * i;
        line(ctx, [[64, yy], [i % 4 === 0 ? 88 : 77, yy]], game.pale + 'a0', 1.7);
        line(ctx, [[575, yy], [i % 4 === 0 ? 551 : 563, yy]], game.pale + 'a0', 1.7);
      }
      if (game.id === 'moss') {
        fern(ctx, 318, 548, 1.43, game, -0.29);
        fern(ctx, 400, 609, 0.57, game, 0.56);
      } else {
        polygon(ctx, [[322, 416], [545, 350], [545, 434]], game.bright + '56');
        polygon(ctx, [[319, 416], [103, 367], [108, 450]], game.second + '89');
        beacon(ctx, 322, 568, 1.34, game);
        for (let i = 0; i < 4; i += 1) {
          ctx.beginPath();
          ctx.moveTo(110, 752 + i * 15);
          ctx.bezierCurveTo(242, 693 + i * 19, 302, 808 + i * 11, 540, 747 + i * 14);
          ctx.strokeStyle = i % 2 ? game.second : game.bright;
          ctx.lineWidth = 2.8;
          ctx.stroke();
        }
      }
      label(ctx, game.split[0], 315, 231, 74, game.pale, { align: 'center', family: display, maxWidth: 493 });
      tracking(ctx, game.split[1], 315, 296, 51, game.bright, 9, display);
      tracking(ctx, game.tagline, 320, 837, 16, game.pale, 2.1);
      label(ctx, 'RELAY FIELD UNIT  /  ' + game.station, 74, 935, 18, game.bright, { family: mono });
    } else {
      sparks(ctx, w, h, 71, game.pale, 149);
      border(ctx, 44, 63, 552, 865, game.bright + 'bc', 32, 5);
      border(ctx, 62, 81, 516, 829, game.second + '89', 27, 2);
      for (let i = 0; i < 9; i += 1) {
        const dy = i * 16;
        ctx.beginPath();
        ctx.moveTo(38, 728 + dy);
        ctx.bezierCurveTo(255, 698 + dy, 377, 811 + dy, 603, 686 + dy);
        ctx.strokeStyle = (i % 3 ? game.second : game.bright) + (i % 2 ? 'a0' : '69');
        ctx.lineWidth = i % 3 ? 2.2 : 4;
        ctx.stroke();
      }
      jelly(ctx, 325, 452, 1.75, game);
      tracking(ctx, 'N I G H T', 320, 190, 37, game.bright, 3.5, serif);
      label(ctx, 'CURRENT', 320, 252, 73, game.pale, { family: serif, align: 'center' });
      star(ctx, 125, 369, 18, game.pale);
      star(ctx, 513, 399, 25, game.bright);
      tracking(ctx, 'DEEP WATER DIVISION', 320, 884, 16, game.pale, 3);
    }
    grain(ctx, w, h, 789, 26000);
    for (let i = 0; i < 550; i += 1) {
      const atFoot = i > 70;
      const y = atFoot ? h - rng() ** 2.3 * 115 : 473 + rng() * 80;
      const x = rng() * w;
      ctx.fillStyle = i % 4 ? '#190f1e75' : '#e6bf8f60';
      ctx.fillRect(x, y, 0.8 + rng() ** 3 * 11, 0.5 + rng() * 1.25);
    }
  });
  texture.name = game.name + ' side';
  return texture;
}

export function screenArt(game) {
  const portrait = game.family === 'relay';
  const texture = paint(portrait ? 512 : game.id === 'current' ? 912 : 768, portrait ? 640 : 512, (ctx, w, h) => {
    background(ctx, w, h, game.screen, game.ink);
    border(ctx, 17, 19, w - 34, h - 38, game.second + 'a3', 12, 2);
    ctx.save();
    ctx.beginPath();
    ctx.rect(23, 26, w - 46, h - 52);
    ctx.clip();
    if (game.family === 'orbit') {
      sparks(ctx, w, h, 26, game.pale, 155);
      const g = ctx.createLinearGradient(0, 115, 0, 356);
      g.addColorStop(0, '#00000000');
      g.addColorStop(1, game.second + '64');
      ctx.fillStyle = g;
      ctx.fillRect(0, 115, w, 241);
      planet(ctx, game.id === 'ember' ? 500 : 506, 244, game.id === 'ember' ? 94 : 73, game, -0.43);
      ctx.save();
      ctx.translate(273, 311);
      ctx.rotate(-0.18);
      courier(ctx, 0, 0, 1.37, game);
      ctx.restore();
      if (game.id === 'comet') {
        for (let i = 0; i < 12; i += 1) {
          const x = 52 + i * 54;
          const y = 349 - Math.sin(i * 0.48) * 61;
          polygon(ctx, [[x, y], [x + 15, y - 7], [x + 28, y + 7], [x + 12, y + 19], [x - 7, y + 12]], game.shade, game.second, 1.4);
        }
      } else {
        for (let i = 0; i < 9; i += 1) {
          star(ctx, 127 + i * 31, 361 - i * 9, 3.0 + i * 0.28, game.bright);
        }
      }
      label(ctx, game.name, 384, 113, 62, game.pale, { align: 'center', family: display, italic: true, maxWidth: 639 });
      tracking(ctx, game.tagline, 384, 161, 16, game.bright, 3.6);
      label(ctx, '1UP  024650', 38, 49, 17, game.bright, { family: mono });
      label(ctx, 'HI  084300', 730, 49, 17, game.bright, { family: mono, align: 'right' });
    } else if (portrait) {
      ruling(ctx, 24, 28, w - 48, h - 56, game.second + '31', 19);
      sparks(ctx, w, h, 60, game.bright, 74);
      contour(ctx, 256, 369, 206, 170, game.second + 'a3', 9);
      label(ctx, game.split[0], 256, 119, 65, game.pale, { align: 'center', family: display, maxWidth: 425 });
      tracking(ctx, game.split[1], 256, 176, 46, game.bright, 5, display);
      tracking(ctx, 'SIGNAL 0' + game.station[1] + '    ·    MODE A', 256, 51, 16, game.bright, 1.0);
      if (game.id === 'moss') {
        fern(ctx, 258, 379, 0.83, game, 0.22);
        fern(ctx, 168, 445, 0.39, game, -0.25);
        for (let i = 0; i < 5; i += 1) oval(ctx, 100 + i * 71, 487 - Math.sin(i * 0.66) * 211, 5, 5, game.bright);
      } else {
        polygon(ctx, [[259, 340], [483, 261], [488, 365]], game.bright + '4c');
        polygon(ctx, [[259, 340], [31, 283], [26, 388]], game.second + '65');
        beacon(ctx, 260, 406, 0.77, game);
        for (const [x, y] of [[75, 456], [400, 477], [344, 506]]) {
          polygon(ctx, [[x, y], [x + 23, y], [x + 30, y - 11], [x - 9, y - 11]], game.pale);
        }
      }
      tracking(ctx, game.tagline, 256, 539, 15, game.pale, 1.8);
    } else {
      sparks(ctx, w, h, 384, game.second, 176);
      const water = ctx.createRadialGradient(652, 234, 9, 652, 234, 336);
      water.addColorStop(0, '#3a899dbf');
      water.addColorStop(0.56, '#306d7c6d');
      water.addColorStop(1, '#14253000');
      ctx.fillStyle = water;
      ctx.fillRect(31, 33, w - 62, h - 66);
      for (let i = 0; i < 8; i += 1) {
        const yy = 283 + i * 21;
        ctx.beginPath();
        ctx.moveTo(10, yy + 18);
        ctx.bezierCurveTo(234, yy - 34, 401, yy + 46, w + 1, yy - 30);
        ctx.strokeStyle = game.second + (i % 2 ? '4e' : '72');
        ctx.lineWidth = 1.7;
        ctx.stroke();
      }
      jelly(ctx, 631, 211, 1.07, game);
      jelly(ctx, 770, 152, 0.29, game, 23);
      tracking(ctx, 'N I G H T', 257, 159, 38, game.bright, 1.4, serif);
      label(ctx, 'CURRENT', 257, 217, 72, game.pale, { family: serif, align: 'center', maxWidth: 435 });
      tracking(ctx, 'DESCENT  •  0084 M', 257, 267, 17, game.second, 2.3);
      star(ctx, 257, 314, 13, game.bright);
      label(ctx, 'CHANNEL  05', 39, 54, 17, game.pale, { family: mono });
      label(ctx, 'DEPTH  084', w - 41, 54, 17, game.pale, { family: mono, align: 'right' });
    }
    ctx.fillStyle = game.ink;
    ctx.fillRect(0, h - 80, w, 59);
    tracking(ctx, game.id === 'current' ? 'INSERT TOKEN TO DIVE' : 'INSERT TOKEN', w * 0.5, h - 55, portrait ? 21 : 26, game.pale, 4.2);
    line(ctx, [[w * 0.35, h - 34], [w * 0.65, h - 34]], game.second + 'a0', 1.8);
    ctx.restore();
    ctx.fillStyle = 'rgba(5,8,22,0.19)';
    for (let y = 1; y < h; y += 4) ctx.fillRect(0, y, w, 1);
    const vignette = ctx.createRadialGradient(w / 2, h / 2, w * 0.26, w / 2, h / 2, w * 0.64);
    vignette.addColorStop(0, '#09061700');
    vignette.addColorStop(1, '#0906177a');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
  });
  texture.name = game.name + ' screen';
  return texture;
}

export function deckArt(game) {
  const texture = paint(768, 256, (ctx, w, h) => {
    background(ctx, w, h, game.shade, game.ink);
    if (game.family === 'orbit') {
      for (let i = 0; i < 5; i += 1) {
        polygon(ctx, [[0, 37 + i * 26], [252, 37 + i * 26], [343, 116 + i * 26], [768, 116 + i * 26], [768, 122 + i * 26], [340, 122 + i * 26], [251, 43 + i * 26], [0, 43 + i * 26]],
          i % 2 ? game.second : game.bright + 'a3');
      }
    } else {
      ruling(ctx, 21, 19, w - 42, h - 38, game.second + '61', 15);
      contour(ctx, 196, 123, 159, 109, game.second + '7d', 5);
      contour(ctx, 579, 123, 156, 109, game.second + '7d', 5);
    }
    border(ctx, 21, 15, w - 42, h - 30, game.bright, 19, 3);
    border(ctx, 31, 24, w - 62, h - 48, game.second + 'ab', 15, 1.8);
    tracking(ctx, game.id === 'glass' ? 'PORT  /  STARBOARD' : game.id === 'current' ? 'DEPTH CONTROL' : 'PLAYER CONTROL', w * 0.5, 217, 19, game.pale, 3.1);
    grain(ctx, w, h, 675, 6800);
    const rng = random(211);
    for (let i = 0; i < 300; i += 1) {
      const yy = h - rng() ** 3.2 * 76;
      ctx.fillStyle = i % 4 === 0 ? '#fbe7bb52' : '#110f17a0';
      ctx.fillRect(rng() * w, yy, 1 + rng() ** 3 * 19, 0.6 + rng() * 1.8);
    }
  });
  texture.name = game.name + ' deck';
  return texture;
}

export function glassFilm() {
  return paint(512, 512, (ctx, w, h) => {
    const gradient = ctx.createLinearGradient(51, 0, 268, 403);
    gradient.addColorStop(0, '#b6dbe63e');
    gradient.addColorStop(0.28, '#b6dbe615');
    gradient.addColorStop(0.55, '#b6dbe600');
    gradient.addColorStop(0.78, '#ded3c206');
    gradient.addColorStop(1, '#ded3c21b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    polygon(ctx, [[0, 7], [163, 7], [475, 512], [410, 512]], '#e0eafb0d');
    polygon(ctx, [[33, 7], [67, 7], [376, 512], [337, 512]], '#c8f4ef0f');
    for (const [x, y, angle] of [[43, 433, 0.29], [61, 441, 0.42], [462, 76, -0.50]]) {
      for (let i = 0; i < 8; i += 1) {
        oval(ctx, x, y, 4 + i * 1.8, 5 + i * 2, '', angle, '#d5e8ef11', 0.9);
      }
    }
  });
}

export function tile(texture, repeatX, repeatY) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  return texture;
}

export function carpetTexture() {
  return paint(1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#34323f';
    ctx.fillRect(0, 0, w, h);
    const rng = random(613);
    const palettes = ['#a65e70', '#5c9d9a', '#c2a670', '#7569a1', '#686b9a'];
    const stars = [
      [170, 162, 0.62], [498, 65, -0.62], [827, 182, 2.13], [73, 422, -1.37],
      [403, 370, 1.2], [682, 410, -0.49], [963, 504, 2.74], [266, 635, 0.78],
      [592, 646, -0.37], [925, 815, 1.26], [460, 923, 2.24], [62, 844, -0.23], [700, 957, 0.1],
    ];
    for (let i = 0; i < stars.length; i += 1) {
      const [x, y, angle] = stars[i];
      for (let tx = -1; tx <= 1; tx += 1) for (let ty = -1; ty <= 1; ty += 1) {
        ctx.save();
        ctx.translate(x + tx * w, y + ty * h);
        ctx.rotate(angle);
        const primary = palettes[i % palettes.length];
        const accent = palettes[(i + 2) % palettes.length];
        oval(ctx, 0, 0, 119, 28, '', 0, primary + 'c9', 6);
        oval(ctx, 1, 0, 109, 19, '', 0, primary + '9c', 2);
        line(ctx, [[-104, -31], [-52, 6], [27, -5], [127, 23]], accent + 'bb', 5);
        line(ctx, [[-105, -22], [-51, 17], [23, 8], [126, 33]], accent + '97', 2.3);
        star(ctx, -46, 8, 31, accent + 'db');
        star(ctx, 136, 31, 11, primary + 'da');
        oval(ctx, 97, -34, 4.6, 4.6, accent + 'bb');
        ctx.restore();
      }
    }
    for (let i = 0; i < 44000; i += 1) {
      const x = rng() * w;
      const y = rng() * h;
      ctx.fillStyle = ['#f3cfa92d', '#9091b64d', '#0e12286d', '#1217267e', '#c2a9a83d'][i % 5];
      ctx.fillRect(x, y, 0.65 + rng() * 2.45, 0.6 + rng() * 2.0);
    }
    ctx.fillStyle = '#1013222b';
    for (let y = 2; y < h; y += 4) ctx.fillRect(0, y, w, 0.9);
  });
}

export function finishTexture(kind) {
  return paint(256, 256, (ctx, w, h) => {
    const rng = random(kind.length * 107);
    ctx.fillStyle = '#f3f0eb';
    ctx.fillRect(0, 0, w, h);
    if (kind === 'wood') {
      for (let i = 0; i < 95; i += 1) {
        const y = rng() * h;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(w * 0.27, y + 8 * Math.sin(i), w * 0.69, y - 8 * Math.cos(i), w, y);
        ctx.strokeStyle = i % 3 ? '#35263737' : '#faf1dd81';
        ctx.lineWidth = 0.6 + rng() ** 2 * 2.0;
        ctx.stroke();
      }
    }
    if (kind === 'metal') {
      for (let i = 0; i < 2600; i += 1) {
        ctx.fillStyle = i % 2 ? '#3e34484b' : '#ffffff67';
        ctx.fillRect(rng() * w, rng() * h, 1 + rng() ** 2 * 95, 0.45 + rng() * 0.6);
      }
    }
    if (kind === 'ceiling') {
      ctx.fillStyle = '#191b2639';
      for (let x = 0; x < w; x += 8) for (let y = 0; y < h; y += 8) {
        oval(ctx, x + rng() * 6, y + rng() * 6, 0.65 + rng(), 0.65 + rng(), '#171f2e4a');
      }
    }
    grain(ctx, w, h, 324, 8500, '#ffffff62', '#22192a25');
  });
}

export function radialTexture(color, sharpness = 1) {
  return paint(128, 128, (ctx, w, h) => {
    const rgb = new THREE.Color(color);
    const hex = rgb.getHexString();
    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    gradient.addColorStop(0, '#' + hex + 'e5');
    gradient.addColorStop(0.29, '#' + hex + (sharpness === 1 ? 'bc' : '76'));
    gradient.addColorStop(0.63, '#' + hex + (sharpness === 1 ? '55' : '16'));
    gradient.addColorStop(1, '#' + hex + '00');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  });
}
