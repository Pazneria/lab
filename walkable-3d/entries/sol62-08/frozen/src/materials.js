import * as T from '../vendor/three.module.min.js';
import { clamp, rng } from './layout.js';

function makeCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return [canvas, canvas.getContext('2d', { alpha: false })];
}

function canvasTexture(canvas, anisotropy = 6, repeat = true) {
  const texture = new T.CanvasTexture(canvas);
  texture.colorSpace = T.SRGBColorSpace;
  if (repeat) {
    texture.wrapS = T.RepeatWrapping;
    texture.wrapT = T.RepeatWrapping;
  }
  texture.anisotropy = anisotropy;
  return texture;
}

function line(ctx, points, ink, width) {
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    const [x,y] = points[i];
    if (i === 0) ctx.moveTo(x,y);
    else ctx.lineTo(x,y);
  }
  ctx.strokeStyle = ink;
  ctx.lineWidth = width;
  ctx.stroke();
}

function wood({ base, tint = [0,0,0], salt = 0, paint = 0, seed }) {
  const width = 384, height = 640;
  const [canvas, ctx] = makeCanvas(width, height);
  const rand = rng(seed), image = ctx.createImageData(width, height);
  const grain = Array.from({ length: width + 1 }, () => (rand() - .5) * 32);
  const knots = Array.from({ length: 5 }, () => ({
    x: rand()*width, y: rand()*height, rx: 9 + rand()*28, ry: 25 + rand()*80
  }));
  for (let y = 0; y < height; y++) {
    const rowBend = 3.3*Math.sin(y*.024) + 3.7*Math.sin(y*.009);
    const cloudy = 5 * Math.sin(y*.019 + .8*Math.cos(y*.007));
    for (let x = 0; x < width; x++) {
      let q = x + rowBend + .9 * Math.sin(y*.031 + x*.042);
      let knot = 0;
      for (const k of knots) {
        const dx = (x-k.x)/k.rx, dy = (y-k.y)/k.ry;
        if (Math.abs(dx) < 2.8 && Math.abs(dy) < 2.8) {
          const r2 = dx*dx + dy*dy;
          q += 12 * Math.exp(-r2*.65) * (dx < 0 ? -1 : 1);
          knot -= Math.exp(-r2*2.2) * 37;
        }
      }
      const xt = (Math.round(q) % width + width) % width;
      const fine = (rand() - .5) * 12;
      const lamina = Math.sin(q*.17 + y*.012) * 4.6 + Math.sin(q*.052 + y*.005)*9;
      const stains = Math.sin(x*.061 + y*.047)*Math.sin(y*.019 - x*.026)*5 + cloudy;
      const fading = Math.max(0, Math.sin(q*.083 + y*.023)) * salt * 9;
      const value = grain[xt] * (1 - paint*.66) + lamina * (1 - paint*.41) + knot*(1 - paint*.54) + stains + fine + fading;
      const offset = (y*width+x)*4;
      for (let c = 0; c < 3; c++) image.data[offset+c] = base[c] + value + tint[c]*stains*.13;
      image.data[offset+3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  for (let i = 0; i < 1350; i++) {
    const x = rand()*width, y = rand()*height;
    const length = 6 + Math.pow(rand(), 2) * (paint > .5 ? 67 : 194);
    const pale = rand() < .44 + salt*.24;
    const alpha = .06 + rand()*.22;
    const ink = pale ? 'rgba(219,208,177,' + alpha + ')' : 'rgba(41,33,24,' + alpha + ')';
    line(ctx, [[x,y],[x+rand()*1.6,y+length*.4],[x+(rand()-.5)*4,y+length]], ink, .25+rand()*1.35);
  }
  for (const k of knots) {
    ctx.save();
    ctx.translate(k.x,k.y);
    ctx.rotate(.13 * (rand() - .5));
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.ellipse(0,0,(i+1)*k.rx*.21,(i+1)*k.ry*.17,0,0,Math.PI*2);
      ctx.lineWidth = (1.7 - i*.17) * (1 - paint*.6);
      ctx.strokeStyle = 'rgba(64,40,25,' + (.36 - i*.035) + ')';
      ctx.stroke();
    }
    ctx.restore();
  }
  if (paint > .5) {
    for (let i = 0; i < 115; i++) {
      const x = rand()*width, y = rand()*height, l = 3 + rand()*31;
      line(ctx, [[x,y],[x+rand()*3,y+l*.55],[x+rand()*3,y+l]],
        rand() < .62 ? 'rgba(117,81,52,.31)' : 'rgba(227,210,171,.29)', .35+rand()*1.8);
    }
  }
  return canvasTexture(canvas);
}

function grit(seed, kind) {
  const [canvas,ctx] = makeCanvas(256,256);
  const rand = rng(seed);
  const palette = kind === 'metal' ? [137,128,111]
    : kind === 'stone' ? [135,136,126] : [158,146,120];
  const image = ctx.createImageData(256,256);
  for (let y=0; y<256; y++) for (let x=0; x<256; x++) {
    const wav = (Math.cos(x*Math.PI/32+y*Math.PI/64) + Math.sin(y*Math.PI/32-x*Math.PI/64)) * 5;
    const pore = (rand()+rand()+rand()-1.5) * 34;
    const v = wav + pore;
    const j = (y*256+x)*4;
    for (let k=0;k<3;k++) image.data[j+k] = palette[k]+v;
    image.data[j+3] = 255;
  }
  ctx.putImageData(image,0,0);
  for (let i=0; i<3900; i++) {
    const a = rand();
    ctx.fillStyle = a < .34 ? 'rgba(224,219,195,.27)' : a < .7 ? 'rgba(39,42,33,.28)' : 'rgba(115,81,49,.21)';
    const w = kind === 'metal' ? .3+rand()*1.7 : .5+rand()*2.2;
    ctx.fillRect(rand()*256,rand()*256,w,w*(.4+rand()*.6));
  }
  return canvasTexture(canvas);
}

function ropeTexture() {
  const [canvas,ctx] = makeCanvas(160,128);
  ctx.fillStyle = '#8e7451';
  ctx.fillRect(0,0,160,128);
  for (let j = -5; j < 14; j++) {
    const x = j*20;
    line(ctx,[[x,0],[x-56,128]],'#c0a27a',12);
    line(ctx,[[x+4,0],[x-52,128]],'#6f5538',4.5);
    line(ctx,[[x-4,0],[x-60,128]],'#dac197',2.2);
  }
  const rand = rng(916);
  for (let i = 0; i < 850; i++) {
    const x=rand()*160, y=rand()*128, h=rand()*16;
    line(ctx,[[x,y],[x-h*.4375,y+h]],i%2 ? 'rgba(247,232,190,.27)' : 'rgba(58,47,29,.34)',.3+rand()*.65);
  }
  return canvasTexture(canvas);
}

export function signMaterial({ background, ink, border, lines, w = 768, h = 256, seed = 26 }) {
  const [canvas,ctx] = makeCanvas(w,h);
  const rand = rng(seed);
  ctx.fillStyle = background;
  ctx.fillRect(0,0,w,h);
  ctx.strokeStyle = border;
  ctx.lineWidth = 4;
  ctx.strokeRect(11,11,w-22,h-22);
  ctx.lineWidth = 1.2;
  ctx.strokeRect(19,19,w-38,h-38);
  ctx.fillStyle = ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const spec of lines) {
    ctx.font = spec.font;
    ctx.fillText(spec.text,w/2,h*spec.y,w-70);
  }
  for (let i=0;i<w*h*.032;i++) {
    ctx.fillStyle = i%4 ? 'rgba(197,184,144,.15)' : 'rgba(32,31,24,.33)';
    ctx.fillRect(rand()*w,rand()*h,.6+rand()*3.2,.5+rand()*1.5);
  }
  for (let i=0;i<52;i++) {
    const x=rand()*w, y=rand()*h;
    line(ctx,[[x,y],[x+7+rand()*45,y+rand()*1.0]],'rgba(42,40,28,.12)',.8);
  }
  return surface({ map: canvasTexture(canvas, 6, false), roughness: .85 });
}

function surface(options = {}) {
  return new T.MeshStandardMaterial({ roughness: .86, vertexColors: true, ...options });
}

function contactMaterial() {
  const size=64, pixels=new Uint8Array(size*size*4);
  for(let y=0;y<size;y++) for(let x=0;x<size;x++){
    const i=(y*size+x)*4;
    const u=(x+.5)/size*2-1, v=(y+.5)/size*2-1;
    const f=clamp(1-Math.hypot(u,v),0,1);
    pixels[i]=pixels[i+1]=pixels[i+2]=255;
    pixels[i+3]=Math.round((f*f*(3-2*f))*.48*255);
  }
  const map = new T.DataTexture(pixels,size,size);
  map.magFilter=T.LinearFilter;
  map.minFilter=T.LinearFilter;
  map.needsUpdate=true;
  return new T.MeshBasicMaterial({
    map, color: 0x302b21, vertexColors: true, transparent: true,
    depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1
  });
}

export function createMaterials() {
  const paleWood = wood({ base: [154,134,102], salt: .7, seed: 71 });
  const weatheredWood = wood({ base: [155,150,132], salt: 1, seed: 12 });
  const oldWood = wood({ base: [126,99,70], seed: 531 });
  const freshWood = wood({ base: [172,129,84], seed: 739 });
  const bluePaint = wood({ base: [126,153,145], tint: [.2,1,1], salt: 1, paint: .76, seed: 856 });
  const creamPaint = wood({ base: [194,185,152], salt: .65, paint: .75, seed: 119 });
  const greenPaint = wood({ base: [66,111,102], tint: [.2,.7,.7], salt: .7, paint: .89, seed: 262 });
  const redPaint = wood({ base: [160,83,66], tint: [1,.4,.3], paint: .87, seed: 423 });
  const grayGrit = grit(14,'stone');
  const mudGrit = grit(5,'mud');
  const corroded = grit(89,'metal');
  return {
    deck: surface({ map: weatheredWood, roughness: .92 }),
    pine: surface({ map: paleWood, roughness: .85 }),
    beam: surface({ map: oldWood, roughness: .89 }),
    cedar: surface({ map: freshWood, roughness: .77 }),
    siding: surface({ map: bluePaint, roughness: .91 }),
    trim: surface({ map: creamPaint, roughness: .84 }),
    green: surface({ map: greenPaint, roughness: .69, bumpMap: greenPaint, bumpScale: .010 }),
    red: surface({ map: redPaint, roughness: .73 }),
    roof: surface({ map: corroded, color: 0x85908b, metalness: .42, roughness: .67 }),
    wetWood: surface({ map: oldWood, color: 0x9b9b73, roughness: .64 }),
    steel: surface({ map: corroded, color: 0x80817d, metalness: .62, roughness: .53 }),
    zinc: surface({ map: corroded, color: 0xd9dcd4, metalness: .47, roughness: .48 }),
    rust: surface({ map: corroded, color: 0xa86942, metalness: .15, roughness: .79 }),
    brass: surface({ color: 0xbca471, metalness: .51, roughness: .51 }),
    rubber: surface({ color: 0x333833, roughness: .92 }),
    paper: surface({ color: 0xdccba0, roughness: 1 }),
    oilcloth: surface({ color: 0x7b8164, roughness: .78, side: T.DoubleSide }),
    ground: surface({ map: mudGrit, bumpMap: mudGrit, bumpScale: .016, roughness: .88 }),
    rock: surface({ map: grayGrit, bumpMap: grayGrit, bumpScale: .022, roughness: .91 }),
    wetRock: surface({ map: grayGrit, color: 0x969e88, roughness: .55, bumpMap: grayGrit, bumpScale: .016 }),
    moss: surface({ map: mudGrit, color: 0x899267, roughness: .93 }),
    shell: surface({ color: 0xbfb199, roughness: .72 }),
    algae: surface({ color: 0x5b6441, roughness: .66, side: T.DoubleSide }),
    grass: surface({ color: 0x899077, roughness: 1, side: T.DoubleSide }),
    rope: surface({ map: ropeTexture(), roughness: .89 }),
    contact: contactMaterial(),
    window: new T.MeshPhysicalMaterial({
      vertexColors: true, color: 0xced9c3, metalness: .02, roughness: .22,
      transparent: true, opacity: .12, depthWrite: false, side: T.DoubleSide
    }),
    glassGlow: surface({ color: 0xffdda0, emissive: 0xe98130, emissiveIntensity: .7, roughness: .45 }),
    distant: surface({ roughness: 1 })
  };
}

export function mixTone(rand, range = .23) {
  return 1 - range*.54 + rand()*range;
}

export function noiseTexture() {
  const [canvas,ctx] = makeCanvas(128,128);
  const rand = rng(665);
  const img=ctx.createImageData(128,128);
  for (let i=0;i<img.data.length;i+=4) {
    const v = Math.floor(rand()*255);
    img.data[i]=v; img.data[i+1]=v; img.data[i+2]=v; img.data[i+3]=255;
  }
  ctx.putImageData(img,0,0);
  const texture = canvasTexture(canvas, 1);
  texture.colorSpace = T.NoColorSpace;
  texture.minFilter = T.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}
