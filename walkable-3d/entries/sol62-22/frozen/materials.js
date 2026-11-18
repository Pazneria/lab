import * as THREE from 'three';
import { clothLibrary } from './cloth-atlas.js';
import { material, glow, texture, rng, PI, TAU } from './geometry.js';

function woodGrain(renderer) {
  return texture(128, 512, (ctx, w, h) => {
    const random = rng(82);
    const grains = Array.from({ length: 28 }, () => random() * TAU);
    const data = ctx.createImageData(w, h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const curl = x + 2.6 * Math.sin(y / h * TAU) + 1.0 * Math.sin(y / h * TAU * 3 + x / 17);
        const broad = 9 * Math.sin(curl / 8.8) + 6 * Math.sin(curl / 2.7);
        const fine = 12 * Math.sin(curl * 1.7 + grains[x % grains.length]) + 7 * (random() - 0.5);
        const value = 203 + broad + fine;
        const i = (x + y * w) * 4;
        data.data.set([value + 9, value + 4, value - 5, 255], i);
      }
    }
    ctx.putImageData(data, 0, 0);
    for (let i = 0; i < 65; i++) {
      ctx.strokeStyle = i % 3 ? '#3e28171d' : '#fff4d124';
      const x = random() * w, y = random() * h, length = 5 + random() * 83;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + 4 * (random() - 0.5), y + length / 2, x + 2 * (random() - 0.5), y + length);
      ctx.stroke();
    }
  }, renderer, true);
}

function mortar(renderer) {
  return texture(128, 128, (ctx, w, h) => {
    ctx.fillStyle = '#ddd7cd';
    ctx.fillRect(0, 0, w, h);
    const random = rng(123);
    for (let i = 0; i < 6500; i++) {
      ctx.fillStyle = i % 2 ? '#382d2651' : '#fff9e75e';
      ctx.globalAlpha = random() * 0.3;
      ctx.fillRect(random() * w, random() * h, random() * 2.6, random() * 1.7);
    }
  }, renderer, true);
}

const fabrics = {
  ink:       ['#1d424b', '#70a5a4', '#cbad75'],
  navy:      ['#23394c', '#73878e', '#c8a471'],
  peacock:   ['#234f51', '#61968c', '#d9b978'],
  lichen:    ['#64683b', '#b5a86a', '#e5ce91'],
  ochre:     ['#ad7541', '#d3ad67', '#813e29'],
  paprika:   ['#9b4c47', '#d48571', '#e0a977'],
  wine:      ['#6e3948', '#a86874', '#d4ab85'],
  garnet:    ['#753431', '#bc6955', '#ffad81'],
  slate:     ['#536278', '#a6b6b9', '#e1c99f'],
  indigo:    ['#38405b', '#7d87ad', '#deb889'],
  flax:      ['#bfaa83', '#e9d9af', '#8b7059'],
  cream:     ['#cbc2a5', '#eee0be', '#987e5c'],
  fog:       ['#a2aba9', '#d7d6bf', '#657b80'],
  brown:     ['#664235', '#b0856b', '#e2c392'],
  salmon:    ['#b66859', '#dc927b', '#f5bd92'],
  lapis:     ['#26425c', '#5892af', '#e4ba7a'],
  turquoise: ['#467578', '#8caaaa', '#e2c494'],
};

export function diamond(ctx, x, y, width, height) {
  ctx.beginPath();
  ctx.moveTo(x, y - height / 2);
  ctx.lineTo(x + width / 2, y);
  ctx.lineTo(x, y + height / 2);
  ctx.lineTo(x - width / 2, y);
  ctx.closePath();
}

export function star(ctx, x, y, radius, points = 4, inside = 0.23) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const theta = i * PI / points - PI / 2;
    const r = i % 2 ? radius * inside : radius;
    const px = x + Math.cos(theta) * r, py = y + Math.sin(theta) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function textile(name, kind, renderer) {
  const [ground, mid, accent] = fabrics[name];
  const satin = kind === 'silk' || kind === 'moire';
  return texture(192, 192, (ctx, w, h) => {
    const random = rng(257);
    ctx.fillStyle = ground;
    ctx.fillRect(0, 0, w, h);

    if (kind === 'stripe' || kind === 'check') {
      ctx.globalAlpha = .53;
      for (let x = 0; x < w; x += 32) {
        ctx.fillStyle = mid;
        ctx.fillRect(x + 1, 0, 7, h);
        ctx.fillStyle = accent;
        ctx.fillRect(x + 11, 0, 1, h);
        if (kind === 'check') ctx.fillRect(0, x + 3, w, 4);
      }
    }
    if (kind === 'brocade' || kind === 'sprig') {
      ctx.lineWidth = kind === 'brocade' ? 1.6 : 1.15;
      for (let j = -1; j <= 4; j++) {
        for (let i = -1; i <= 4; i++) {
          const x = i * 48 + (j % 2) * 24, y = j * 48;
          ctx.globalAlpha = .50;
          ctx.strokeStyle = mid;
          if (kind === 'brocade') {
            diamond(ctx, x, y, 36, 44);
            ctx.stroke();
            diamond(ctx, x, y, 30, 38);
            ctx.stroke();
          }
          ctx.beginPath();
          for (let p = 0; p < 4; p++) {
            const a = p * PI / 2;
            ctx.moveTo(x, y);
            ctx.quadraticCurveTo(x + Math.cos(a - .45) * 13, y + Math.sin(a - .45) * 13,
              x + Math.cos(a) * 17, y + Math.sin(a) * 17);
            ctx.quadraticCurveTo(x + Math.cos(a + .45) * 13, y + Math.sin(a + .45) * 13, x, y);
          }
          ctx.stroke();
          ctx.globalAlpha = .73;
          ctx.fillStyle = accent;
          star(ctx, x, y, kind === 'brocade' ? 6 : 3.6);
          ctx.fill();
        }
      }
    }
    if (kind === 'moire') {
      ctx.globalAlpha = .16;
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = mid;
      for (let y = -12; y < h + 14; y += 5) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(w / 3, y + 12, 2 * w / 3, y - 12, w, y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = satin ? .07 : .14;
    ctx.fillStyle = '#ffeac7';
    for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);
    ctx.globalAlpha = satin ? .065 : .16;
    ctx.fillStyle = '#150c11';
    for (let x = 0; x < w; x += 3) ctx.fillRect(x, 0, 1, h);
    for (let i = 0; i < 3800; i++) {
      ctx.globalAlpha = random() * (satin ? .09 : .21);
      ctx.fillStyle = i % 2 ? '#241a1c' : '#fff5d4';
      ctx.fillRect(random() * w, random() * h, kind === 'linen' ? 2.6 : 1.4, 1);
    }
  }, renderer);
}

export function palette(renderer) {
  const grain = woodGrain(renderer);
  const flecks = mortar(renderer);
  const wood = (color, roughness = .62) => material(color, roughness, { map: grain });
  const cloth = clothLibrary(renderer, textile);
  return {
    renderer, cloth, wood,
    plaster: material('#b4ae9c', .98, { map: flecks }),
    lime: material('#c0b6a0', .93, { map: flecks }),
    ceiling: material('#b2a28c', .98, { map: flecks, side: THREE.DoubleSide }),
    cutStone: material('#c1ad89', .94, { map: flecks }),
    paleStone: material('#e0ccaa', .91, { map: flecks }),
    mortar: material('#7b6752', 1),
    rail: wood('#294239'),
    railHighlight: wood('#476457'),
    panel: wood('#3b554b'),
    panelInset: wood('#31463e'),
    dark: wood('#3a2d24'),
    walnut: wood('#68452f'),
    darkOak: wood('#553627', .72),
    oak: wood('#8d5e3f'),
    waxedOak: wood('#ad7e52', .46),
    birch: wood('#d0a275'),
    floor: ['#9e7250', '#916849', '#a37754', '#876044', '#996e4e', '#8f6547', '#a37752'].map(wood),
    under: material('#49392f', .98),
    ink: material('#242930', .85),
    blueInk: material('#4a6274', .87),
    brass: material('#b58244', .43, { metalness: .57 }),
    gold: material('#e6b874', .38, { metalness: .43 }),
    brightGold: material('#efca77', .47, { metalness: .23 }),
    brassDark: material('#65503b', .52, { metalness: .65 }),
    steel: material('#a7b2af', .31, { metalness: .65 }),
    darkSteel: material('#4a5352', .47, { metalness: .58 }),
    bronze: material('#815040', .45, { metalness: .54 }),
    black: material('#231d1b', .75),
    paper: material('#e0c49a', .94, { map: flecks, side: THREE.DoubleSide }),
    kraft: material('#9e7650', .94, { map: flecks, side: THREE.DoubleSide }),
    chalk: material('#e7d5b5', .94),
    stitch: material('#f3cc9d', .73),
    raw: material('#d28f79', .82),
    pinHead: material('#e0ae75', .45, { metalness: .2 }),
    wax: glow('#ffd08a', .85),
    lamp: glow('#fed396', 1.45),
    coolGlass: glow('#a9d3dc', .45),
    blueGlass: glow('#6495a1', .32),
    moonGlass: glow('#a6c7bb', .32),
    sunGlass: glow('#dbc48d', .32),
    mirror: material('#829c98', .29, { metalness: .21 }),
    mirrorDark: material('#526963', .40, { metalness: .18 }),
  };
}

export function carpet(renderer, long = false) {
  const map = texture(long ? 384 : 768, 768, (ctx, w, h) => {
    const random = rng(437);
    ctx.fillStyle = '#213d40';
    ctx.fillRect(0, 0, w, h);
    const stroke = (color, line, inset) => {
      ctx.lineWidth = line;
      ctx.strokeStyle = color;
      ctx.strokeRect(inset, inset, w - 2 * inset, h - 2 * inset);
    };
    stroke('#172c30', 23, 9);
    stroke('#ab7552', 13, 22);
    stroke('#b99565', 4, 33);
    stroke('#5c3b33', 17, 48);
    stroke('#9a734f', 3, 59);
    stroke('#77958d', 2, 67);
    const tile = long ? 49 : 58;

    for (let i = 1; i * tile < w - 55; i++) {
      for (let j = 1; j * tile < h - 38; j++) {
        const x = 30 + i * tile + (j % 2) * tile * .45, y = 28 + j * tile;
        if (x > w - 76 || y < 76 || y > h - 76) continue;
        ctx.strokeStyle = (i + j) % 4 ? '#48676a' : '#8b6950';
        ctx.lineWidth = 1.6;
        diamond(ctx, x, y, 28, 32);
        ctx.stroke();
        ctx.fillStyle = (i + j) % 4 ? '#668177' : '#bc8960';
        star(ctx, x, y, 6, 4, .33);
        ctx.fill();
      }
    }

    const medallions = long ? [209, 559] : [384];
    for (const y of medallions) {
      const x = w / 2, r = long ? 91 : 156;
      ctx.fillStyle = '#21383c';
      star(ctx, x, y, r * 1.15, 12, .87);
      ctx.fill();
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = ['#a67550', '#577673', '#ccab76', '#7d5344'][i];
        ctx.lineWidth = 3;
        star(ctx, x, y, r * (1.12 - i * .11), 12, .88);
        ctx.stroke();
      }
      ctx.fillStyle = '#916448';
      star(ctx, x, y, r * .69, 8, .49);
      ctx.fill();
      ctx.fillStyle = '#d2af7d';
      star(ctx, x, y, r * .42, 4, .25);
      ctx.fill();
      ctx.fillStyle = '#e3caa0';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, TAU);
      ctx.fill();
    }
    for (let i = 0; i < 24000; i++) {
      ctx.globalAlpha = random() * .24;
      ctx.fillStyle = i % 2 ? '#ede0c4' : '#111514';
      ctx.fillRect(random() * w, random() * h, 1.9, 1);
    }
  }, renderer);
  return material('#ffffff', .98, { map });
}

export function placard(renderer, title, subtitle, style = 'green') {
  const map = texture(512, 160, (ctx, w, h) => {
    const green = style === 'green';
    ctx.fillStyle = green ? '#1f3732' : '#c6a47a';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = green ? '#ad8356' : '#614435';
    ctx.lineWidth = 2;
    ctx.strokeRect(9, 9, w - 18, h - 18);
    ctx.strokeRect(15, 15, w - 30, h - 30);
    ctx.fillStyle = green ? '#dbb97e' : '#472d24';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '42px Georgia';
    ctx.fillText(title, w / 2, 67, w - 62);
    ctx.font = '700 16px Georgia';
    ctx.fillText(subtitle, w / 2, 111, w - 44);
    star(ctx, 32, 68, 8);
    ctx.fill();
    star(ctx, w - 32, 68, 8);
    ctx.fill();
  }, renderer);
  return material('#ffffff', .78, { map });
}

export function print(renderer, ink, width, height, draw, paperColor = '#d4b58a') {
  const map = texture(width, height, (ctx, w, h) => {
    const random = rng(523);
    ctx.fillStyle = paperColor;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < w * h * .065; i++) {
      ctx.globalAlpha = random() * .13;
      ctx.fillStyle = i % 2 ? '#4c302b' : '#fff5d5';
      ctx.fillRect(random() * w, random() * h, 2, 1);
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = ctx.strokeStyle = ink;
    draw(ctx, w, h);
  }, renderer);
  return material('#ffffff', .93, { map, side: THREE.DoubleSide });
}

