import * as T from "three";

export function random(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function surface(width, height = width) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return [canvas, canvas.getContext("2d")];
}

function texture(canvas, srgb = true, tiled = false) {
  const map = new T.CanvasTexture(canvas);
  if (srgb) map.colorSpace = T.SRGBColorSpace;
  if (tiled) map.wrapS = map.wrapT = T.RepeatWrapping;
  map.anisotropy = 4;
  return map;
}

function rounded(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function gray(value) {
  const v = Math.max(0, Math.min(255, Math.round(value)));
  return `rgb(${v},${v},${v})`;
}

function speckle(ctx, w, h, seed, amount) {
  const rand = random(seed);
  const bytes = ctx.getImageData(0, 0, w, h);
  const pixels = bytes.data;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const shift = (rand() - 0.5) * amount;
      pixels[i] += shift;
      pixels[i + 1] += shift;
      pixels[i + 2] += shift;
    }
  }
  ctx.putImageData(bytes, 0, 0);
}

function paving() {
  const n = 1024;
  const [c, ctx] = surface(n), [b, bump] = surface(n), [r, rough] = surface(n);
  const rand = random(24311);
  ctx.fillStyle = "#272c34"; ctx.fillRect(0, 0, n, n);
  bump.fillStyle = "#353535"; bump.fillRect(0, 0, n, n);
  rough.fillStyle = "#a0a0a0"; rough.fillRect(0, 0, n, n);

  const courses = 12, columns = 8, sh = n / courses, sw = n / columns;
  for (let row = 0; row < courses; row++) {
    for (let column = 0; column < columns; column++) {
      const x = column * sw + (row % 2 ? sw * 0.48 : 0);
      const y = row * sh + 2 + rand() * 2;
      const w = sw - 3 - rand() * 4, h = sh - 4 - rand() * 3;
      const corner = 3 + rand() * 8;
      const tone = 48 + rand() * 27, cool = 4 + rand() * 10;
      const glaze = 49 + rand() * 91;
      const marks = Array.from({length: 32}, () => [rand(), rand(), rand(), rand()]);
      for (const shift of [0, -n]) {
        const ox = x + shift;
        if (ox + w < 0) continue;
        const light = ctx.createLinearGradient(ox, y, ox + w * 0.5, y + h);
        light.addColorStop(0, `rgb(${tone + 12},${tone + 14},${tone + 14 + cool})`);
        light.addColorStop(0.22, `rgb(${tone + 2},${tone + 6},${tone + cool})`);
        light.addColorStop(1, `rgb(${tone - 6},${tone - 1},${tone + cool - 6})`);
        rounded(ctx, ox + 1, y, w, h, corner);
        ctx.fillStyle = light; ctx.fill();
        ctx.strokeStyle = "#a7a9a72c"; ctx.lineWidth = 1.3; ctx.stroke();
        ctx.save(); ctx.clip();
        for (const [a, v, length, weight] of marks) {
          ctx.strokeStyle = weight > 0.53 ? "#aeb9c232" : "#1d222d53";
          ctx.lineWidth = 0.65 + weight;
          ctx.beginPath();
          ctx.moveTo(ox + a * w, y + v * h);
          ctx.lineTo(ox + a * w + length * 13, y + v * h - length * 3);
          ctx.stroke();
        }
        ctx.restore();

        rounded(bump, ox + 1, y, w, h, corner);
        bump.fillStyle = "#838383"; bump.fill();
        rounded(bump, ox + 3.5, y + 2.5, w - 5, h - 5, corner);
        bump.fillStyle = gray(159 + (tone - 48) * 1.5); bump.fill();
        rounded(rough, ox + 1, y, w, h, corner);
        const gradient = rough.createLinearGradient(ox, y, ox + w, y + h);
        gradient.addColorStop(0, gray(glaze));
        gradient.addColorStop(1, gray(glaze + 23));
        rough.fillStyle = gradient; rough.fill();
      }
    }
  }
  speckle(ctx, n, n, 321, 23);
  speckle(bump, n, n, 532, 16);
  speckle(rough, n, n, 565, 16);
  return new T.MeshStandardMaterial({
    name: "Rain-dark basalt setts",
    map: texture(c, true, true),
    bumpMap: texture(b, false, true), bumpScale: 0.021,
    roughnessMap: texture(r, false, true), roughness: 0.94,
    metalness: 0.10, envMapIntensity: 0.42
  });
}

function brick() {
  const n = 512, [c, ctx] = surface(n), [b, bump] = surface(n);
  const rand = random(45);
  ctx.fillStyle = "#929197"; ctx.fillRect(0, 0, n, n);
  bump.fillStyle = "#414141"; bump.fillRect(0, 0, n, n);
  const bw = n / 6, bh = n / 14;
  for (let i = 0; i < 14; i++) {
    for (let j = 0; j < 6; j++) {
      const y = i * bh + 1.4, x = j * bw + (i % 2 ? bw / 2 : 0);
      const tone = 123 + rand() * 45, w = bw - 2.7, h = bh - 2.8;
      for (const shift of [0, -n]) {
        const left = x + shift;
        if (left + w < 0) continue;
        rounded(ctx, left, y, w, h, 1.5);
        const shading = ctx.createLinearGradient(left, y, left, y + h);
        shading.addColorStop(0, `rgb(${tone + 26},${tone + 16},${tone + 10})`);
        shading.addColorStop(0.15, `rgb(${tone + 10},${tone + 1},${tone - 5})`);
        shading.addColorStop(1, `rgb(${tone - 6},${tone - 15},${tone - 17})`);
        ctx.fillStyle = shading; ctx.fill();
        rounded(bump, left, y, w, h, 1.5);
        bump.fillStyle = "#b4b4b4"; bump.fill();
      }
    }
  }
  speckle(ctx, n, n, 432, 29);
  speckle(bump, n, n, 323, 15);
  return { map: texture(c, true, true), bumpMap: texture(b, false, true), bumpScale: 0.027 };
}

function wood() {
  const n = 384, [c, ctx] = surface(n);
  ctx.fillStyle = "#ad8259";
  ctx.fillRect(0, 0, n, n);
  const rand = random(1351);
  for (let i = 0; i < 280; i++) {
    const y = rand() * n, x = rand() * n, span = 20 + rand() * n;
    const a = (rand() * .15 + .02).toFixed(3);
    const ink = i % 3 === 0 ? "42,23,20" : "249,219,165";
    ctx.strokeStyle = `rgba(${ink},${a})`;
    ctx.lineWidth = .35 + rand() * 2;
    for (const shift of [0, -n]) {
      ctx.beginPath();
      ctx.moveTo(x + shift, y);
      ctx.bezierCurveTo(x + shift + span * .25, y + 3, x + shift + span * .8, y - 4, x + shift + span, y + 1);
      ctx.stroke();
    }
  }
  speckle(ctx, n, n, 754, 18);
  return texture(c, true, true);
}

function fabric(name, colors) {
  const size = 512, [c, ctx] = surface(size, 256);
  const stride = size / colors.length;
  for (let i = 0; i < colors.length; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillRect(i * stride - .5, 0, stride + 1, 256);
    if (colors.length > 1) {
      ctx.fillStyle = "#20182135";
      ctx.fillRect(i * stride + 1, 0, 2, 256);
      ctx.fillStyle = "#fff2dc30";
      ctx.fillRect((i + 1) * stride - 2, 0, 2, 256);
    }
  }
  const rand = random(210);
  for (let y = 0; y < 256; y += 2) {
    ctx.fillStyle = `rgba(28,20,28,${(.02 + rand() * .10).toFixed(2)})`;
    ctx.fillRect(0, y, size, 1);
  }
  for (let x = 0; x < size; x += 2) {
    ctx.fillStyle = `rgba(248,235,215,${(.025 + rand() * .08).toFixed(2)})`;
    ctx.fillRect(x, 0, 1, 256);
  }
  const waterline=ctx.createLinearGradient(0,0,0,256);
  waterline.addColorStop(0,"#32293550");
  waterline.addColorStop(.17,"#2b252b08");
  waterline.addColorStop(.38,"#2b252b00");
  waterline.addColorStop(.78,"#ffebbd10");
  waterline.addColorStop(1,"#30252b20");
  ctx.fillStyle=waterline;
  ctx.fillRect(0,0,size,256);
  for (let i=0;i<9;i++) {
    const x=rand()*size,y=rand()*256,r=11+rand()*39;
    const stain=ctx.createRadialGradient(x,y,1,x,y,r);
    stain.addColorStop(0,"#35293620");
    stain.addColorStop(1,"#35293600");
    ctx.fillStyle=stain; ctx.fillRect(x-r,y-r,r*2,r*2);
  }
  speckle(ctx, size, 256, 48, 9);
  return new T.MeshStandardMaterial({
    name, map: texture(c), side: T.DoubleSide, roughness: 0.88,
    envMapIntensity: 0.35, emissive: 0x3c2e2a, emissiveIntensity: 0.19
  });
}

function lanternPaper() {
  const [c,ctx]=surface(256,128);
  const lip=ctx.createLinearGradient(0,0,0,128);
  lip.addColorStop(0,"#785746");
  lip.addColorStop(.13,"#d6bf9d");
  lip.addColorStop(.39,"#f9e9ce");
  lip.addColorStop(.64,"#efdebf");
  lip.addColorStop(.86,"#c6a78a");
  lip.addColorStop(1,"#8c6f54");
  ctx.fillStyle=lip; ctx.fillRect(0,0,256,128);
  const rand=random(1595);
  for(let i=0;i<170;i++) {
    const y=rand()*128;
    ctx.fillStyle=i%2?"#5b463214":"#fffee01d";
    ctx.fillRect(rand()*256,y,8+rand()*76,.4+rand()*.84);
  }
  speckle(ctx,256,128,551,15);
  return texture(c,true,true);
}

function brushedSteel() {
  const [c,ctx]=surface(256,128);
  ctx.fillStyle="#b9b9b9"; ctx.fillRect(0,0,256,128);
  const rand=random(9515);
  for (let i=0;i<550;i++) {
    ctx.fillStyle=i%3===0?"#eeeeee42":"#6868683a";
    ctx.fillRect(rand()*256,rand()*128,7+rand()*110,.46+rand()*.6);
  }
  speckle(ctx,256,128,972,6);
  return texture(c,false,true);
}

function plain(name, color, roughness = .72, metalness = 0, extra = {}) {
  return new T.MeshStandardMaterial({ name, color, roughness, metalness, ...extra });
}

function tilework() {
  const n = 512, [c, ctx] = surface(n);
  const rand = random(33);
  ctx.fillStyle = "#455c60"; ctx.fillRect(0, 0, n, n);
  const g = n / 8;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const s = 145 + rand() * 44;
      ctx.fillStyle = `rgb(${s * .85},${s + 15},${s + 8})`;
      ctx.fillRect(x * g + 2, y * g + 2, g - 4, g - 4);
      ctx.strokeStyle = "#e2dfbe71";
      ctx.strokeRect(x * g + 3, y * g + 3, g - 7, g - 7);
      if ((x + y) % 2 === 0) {
        ctx.fillStyle = "#567873bc";
        ctx.beginPath();
        ctx.moveTo(x * g + g / 2, y * g + 13);
        ctx.lineTo(x * g + g - 13, y * g + g / 2);
        ctx.lineTo(x * g + g / 2, y * g + g - 13);
        ctx.lineTo(x * g + 13, y * g + g / 2);
        ctx.closePath(); ctx.fill();
      }
    }
  }
  speckle(ctx, n, n, 44, 8);
  return texture(c, true, true);
}

export function createPalette() {
  const bricks = brick(), grain = wood(), paper = lanternPaper();
  const colored = { vertexColors: true };
  return {
    stone: paving(),
    brickWarm: plain("Oxide brick", 0x947b77, .9, 0, bricks),
    brickCoal: plain("Blue-brown engineering brick", 0x667580, .88, 0, bricks),
    brickOld: plain("Old red brick", 0xa37d68, .96, 0, bricks),
    mortar: plain("Limestone", 0x66636a, .90, 0, colored),
    wash: plain("Painted stucco", 0xada18d, .96, 0, colored),
    wood: plain("Oiled wood", 0xb18e72, .65, .03, { map: grain, ...colored }),
    woodDark: plain("Stained timber", 0x503a30, .76, 0, { map: grain, ...colored }),
    black: plain("Blackened angle iron", 0x363b42, .42, .57, colored),
    steel: plain("Brushed cooking steel", 0xb8bab8, .54, .73, { roughnessMap: brushedSteel(), ...colored }),
    enamel: plain("Glazed ceramic", 0xd8d7cf, .31, .07, colored),
    rubber: plain("Rubber and dark seams", 0x26232a, .92, 0, colored),
    skin: plain("Fresh produce", 0xffffff, .55, 0, colored),
    foliage: plain("Leaves", 0xffffff, .73, 0, { side: T.DoubleSide, ...colored }),
    cloth: plain("Dyed fabric", 0xffffff, .91, 0, { side: T.DoubleSide, ...colored }),
    greenCanvas: fabric("Olive woven awning", ["#596449","#c2ad81","#667255","#c8b18b","#596449","#c2ad81","#667255"]),
    redCanvas: fabric("Oxide red oilcloth", ["#8c3f37","#ad5949","#943c35"]),
    blueCanvas: fabric("Indigo dyed raincloth", ["#303e5c","#526279","#344661"]),
    stripeCanvas: fabric("Faded ochre and cream awning", ["#a87439","#cfb278","#a87439","#d6b780","#a87439","#cfb278","#a87439"]),
    teaTile: plain("Sage diamond tile", 0xc4cac0, .36, .06, {map: tilework()}),
    glass: plain("Dark shop glazing", 0x354a59, .22, .44, colored),
    warmWindow: plain("Backlit amber shade", 0xb28d63, .79, 0, {emissive:0x9c602f, emissiveIntensity:.37, ...colored}),
    amberCore: plain("Amber lantern paper", 0xf1a864, .79, 0, {emissive: 0xffa94d, emissiveMap: paper, emissiveIntensity: 1.65, ...colored}),
    coolCore: plain("Blue-green luminous enamel", 0x7ba9a0, .67, 0, {emissive: 0x63d6c3, emissiveIntensity: .82, ...colored})
  };
}

const signFaces = {
  serif: "bold {size}px Georgia",
  stencil: "bold {size}px Impact, Arial Narrow, sans-serif",
  sans: "700 {size}px Trebuchet MS, sans-serif",
  hand: "italic bold {size}px Georgia"
};

export function enamelSign({ name, sub = "", background, ink, line, tall = false, glow = 0, face = "serif" }) {
  const w = tall ? 256 : 768, h = tall ? 512 : 256;
  const [c, ctx] = surface(w, h);
  const rand = random(65487);
  ctx.fillStyle = background; ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = line; ctx.lineWidth = 5;
  ctx.strokeRect(13, 13, w - 26, h - 26);
  ctx.globalAlpha = .52; ctx.lineWidth = 1.3;
  ctx.strokeRect(22, 22, w - 44, h - 44); ctx.globalAlpha = 1;
  ctx.fillStyle = ink;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (tall) {
    const letters = name.split("");
    ctx.font = `600 ${Math.min(86, 405 / letters.length)}px Georgia`;
    for (const [i, letter] of letters.entries()) ctx.fillText(letter, w / 2, 51 + (i + .5) * 409 / letters.length);
  } else {
    const family = signFaces[face];
    ctx.font = family.replace("{size}",118);
    const size = Math.min(112, 112 * (w - 106) / Math.max(1, ctx.measureText(name).width));
    ctx.font = family.replace("{size}",size);
    ctx.fillText(name, w / 2, sub ? h * .43 : h * .53, w - 75);
    if (sub) {
      ctx.font = "600 27px sans-serif";
      ctx.letterSpacing = "5px";
      ctx.globalAlpha = .86;
      ctx.fillText(sub, w / 2, 174, w - 108);
      ctx.globalAlpha = 1;
    }
  }
  for (let i = 0; i < 420; i++) {
    const x = rand() * w, y = rand() * h, edge = Math.min(x, w - x, y, h - y);
    if (edge > 30 && rand() > .21) continue;
    ctx.fillStyle = rand() > .5 ? "#2319238c" : "#d6bd8d65";
    ctx.fillRect(x, y, 1 + rand() * 6, .5 + rand() * 2);
  }
  if (!tall && (face === "hand" || face === "serif")) {
    ctx.strokeStyle=line;
    ctx.lineWidth=2.4;
    for(const side of [-1,1]) {
      const x=side===1 ? 41 : w-41;
      const y=h*.5;
      ctx.beginPath();
      ctx.moveTo(x,y-18);
      ctx.bezierCurveTo(x+side*13,y-6,x+side*13,y+6,x,y+18);
      ctx.bezierCurveTo(x-side*8,y+6,x-side*8,y-6,x,y-18);
      ctx.stroke();
    }
  }
  speckle(ctx, w, h, 18, 7);
  const map = texture(c);
  return plain(name + " sign", 0xffffff, .58, .045, {map, emissive: 0xffffff, emissiveMap: map, emissiveIntensity: glow});
}

export function washTexture(kind) {
  const n = 256, [c, ctx] = surface(n);
  if (kind === "halo") {
    const gradient = ctx.createRadialGradient(128,128,2,128,128,126);
    gradient.addColorStop(0, "#ffffff90");
    gradient.addColorStop(.13, "#ffffff45");
    gradient.addColorStop(.37, "#ffffff15");
    gradient.addColorStop(1, "#ffffff00");
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, n, n);
  } else {
    const rand = random(6930);
    const im = ctx.createImageData(n, n);
    for (let y = 0; y < n; y++) {
      const v = (y - 127.5) / 128;
      const ripples = .43 + .21 * Math.sin(y * .28 + .7 * Math.sin(y * .13)) + .13 * Math.sin(y * .84);
      for (let x = 0; x < n; x++) {
        const u = (x - 127.5) / 128;
        const stripe = u + .044 * Math.sin(y * .15) + .028 * Math.sin(y * .53);
        const shape = Math.max(0, 1 - u * u - v * v);
        const broad = Math.exp(-stripe * stripe * 4.5);
        const narrow = Math.exp(-stripe * stripe * (26 + v * v * 20));
        const light = kind === "shadow" ? shape ** 2 : (broad * .28 + narrow * .53) * shape ** .8 * (ripples + rand() * .43);
        const i = (y * n + x) * 4;
        im.data[i] = im.data[i + 1] = im.data[i + 2] = 255;
        im.data[i + 3] = light * 232;
      }
    }
    ctx.putImageData(im, 0, 0);
  }
  return texture(c, false);
}

export function environmentTexture() {
  const w = 128, h = 64, data = new Uint16Array(w * h * 4);
  const lobes = [
    [0.26, .38, 85, 3.1, .41, .20],
    [0.68, .48, 96, .23, .81, 1.0],
    [0.89, .53, 114, 1.55, .82, .32],
    [0.52, .18, 15, .22, .33, .56]
  ];
  for (let y = 0; y < h; y++) {
    const sky = (1 - y / h) ** 2;
    for (let x = 0; x < w; x++) {
      let r = .045 + sky * .115, g = .060 + sky * .16, b = .080 + sky * .245;
      for (const [cx, cy, spread, lr, lg, lb] of lobes) {
        const dx = Math.min(Math.abs(x / w - cx), 1 - Math.abs(x / w - cx)), dy = y / h - cy;
        const weight = Math.exp(-spread * (dx * dx * 4 + dy * dy));
        r += lr * weight; g += lg * weight; b += lb * weight;
      }
      const i = (y * w + x) * 4;
      data[i] = T.DataUtils.toHalfFloat(r);
      data[i + 1] = T.DataUtils.toHalfFloat(g);
      data[i + 2] = T.DataUtils.toHalfFloat(b);
      data[i + 3] = T.DataUtils.toHalfFloat(1);
    }
  }
  const map = new T.DataTexture(data, w, h, T.RGBAFormat, T.HalfFloatType);
  map.mapping = T.EquirectangularReflectionMapping;
  map.colorSpace = T.LinearSRGBColorSpace;
  map.magFilter = T.LinearFilter; map.minFilter = T.LinearFilter;
  map.needsUpdate = true;
  return map;
}
