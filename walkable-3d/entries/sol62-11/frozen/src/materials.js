import * as THREE from '../vendor/three.module.min.js';
import { canvasMap, luminous, seeded, standard } from './build.js';

function tile(size, seed, render, x = 1, y = 1) {
  const texture = canvasMap(size, size, (ctx) => render(ctx, size, seeded(seed)));
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(x, y);
  return texture;
}

function aggregate(ctx, size, random) {
  const image = ctx.createImageData(size, size);
  for (let i = 0; i < image.data.length; i += 4) {
    const stain = random() + random() + random();
    const shade = 176 + 26 * stain;
    image.data[i] = shade;
    image.data[i + 1] = shade - 1;
    image.data[i + 2] = shade - 5;
    image.data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
  for (let i = 0; i < 1250; ++i) {
    ctx.fillStyle = random() > .45 ? 'rgba(113,104,91,.13)' : 'rgba(255,251,229,.23)';
    ctx.beginPath();
    ctx.ellipse(random() * size, random() * size, .35 + random() * 1.5, .25 + random() * .65, 6 * random(), 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 39; ++i) {
    const x = random() * size;
    const y = random() * size;
    const r = 5 + random() * 32;
    const halo = ctx.createRadialGradient(x, y, 0, x, y, r);
    halo.addColorStop(0, random() > .5 ? 'rgba(105,97,76,.08)' : 'rgba(255,255,240,.13)');
    halo.addColorStop(1, 'rgba(155,145,128,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
}

function brushing(ctx, size, random) {
  ctx.fillStyle = '#d4d7d8';
  ctx.fillRect(0, 0, size, size);
  for (let y = 0; y < size; ++y) {
    const v = Math.floor(175 + random() * 75);
    ctx.fillStyle = 'rgba(' + v + ',' + v + ',' + v + ',.6)';
    ctx.fillRect(0, y, size, 1);
  }
  for (let i = 0; i < 410; ++i) {
    ctx.fillStyle = random() > .22 ? 'rgba(250,254,255,.19)' : 'rgba(28,36,40,.21)';
    ctx.fillRect(random() * size, random() * size, 2 + random() * size * .41, .55);
  }
}

function laminate(ctx, size, random) {
  ctx.fillStyle = '#e3c69d';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 1280; ++i) {
    const y = random() * size;
    const x = random() * size;
    const length = 15 + random() * 67;
    ctx.strokeStyle = random() > .45 ? 'rgba(116,69,33,.11)' : 'rgba(255,229,170,.29)';
    ctx.lineWidth = .45 + random() * .6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + length * .3, y - 1.3, x + length * .7, y + .6, x + length, y + .4);
    ctx.stroke();
  }
}

function lensMap() {
  return canvasMap(144, 144, (ctx, w, h) => {
    ctx.fillStyle = '#07151d';
    ctx.fillRect(0, 0, w, h);
    const center = w / 2;
    const optics = ctx.createRadialGradient(54, 52, 3, center, center, 74);
    optics.addColorStop(0, '#445d74');
    optics.addColorStop(.25, '#233443');
    optics.addColorStop(.58, '#162b35');
    optics.addColorStop(.77, '#35505d');
    optics.addColorStop(1, '#091821');
    ctx.fillStyle = optics;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#a9d6d03b';
    for (const radius of [37, 53, 63]) {
      ctx.beginPath();
      ctx.arc(center, center, radius, 3.75, 5.4);
      ctx.stroke();
    }
    ctx.fillStyle = '#c4e9df92';
    ctx.beginPath();
    ctx.ellipse(50, 45, 16, 5, -.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#998acc61';
    ctx.beginPath();
    ctx.ellipse(86, 94, 19, 6, -.63, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e1f8e5c7';
    ctx.beginPath();
    ctx.ellipse(51, 44, 5, 2, -.45, 0, Math.PI * 2);
    ctx.fill();
  });
}

function shadowMap() {
  return canvasMap(128, 128, (ctx) => {
    const shadow = ctx.createRadialGradient(64, 64, 3, 64, 64, 64);
    shadow.addColorStop(0, '#151914e0');
    shadow.addColorStop(.31, '#151914a0');
    shadow.addColorStop(.62, '#1519144b');
    shadow.addColorStop(1, '#15191400');
    ctx.fillStyle = shadow;
    ctx.fillRect(0, 0, 128, 128);
  });
}

export function materials() {
  const concrete = tile(384, 110, aggregate, 1.4, 1.25);
  const concrete2 = concrete.clone();
  const brushed = tile(192, 12, brushing, 1, 1);
  const wood = tile(256, 831, laminate, 1, 1);
  const fakeLens = lensMap();
  const ao = shadowMap();
  const wallEdge = canvasMap(8, 128, (ctx, width, height) => {
    const shade = ctx.createLinearGradient(0, 0, 0, height);
    shade.addColorStop(0, '#252d237e');
    shade.addColorStop(.14, '#252d2343');
    shade.addColorStop(.57, '#252d231c');
    shade.addColorStop(1, '#252d2300');
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, width, height);
  });
  return {
    slab: standard(0xaaa99d, .86, .045, { map: concrete }),
    slabWing: standard(0xa7aaa0, .9, .035, { map: concrete2 }),
    joint: standard(0x7f8278, .92),
    concrete: standard(0xb7b9ac, .94, 0, { map: concrete }),
    wall: standard(0xe1ded1, .89),
    wallPanel: standard(0xd4d5c7, .84),
    wallCream: standard(0xe9e3d3, .92),
    sage: standard(0x9ca997, .72),
    sageDark: standard(0x535e53, .71),
    ceiling: standard(0xc7c9ba, .9),
    darkBeam: standard(0x69746b, .76),
    ink: standard(0x273330, .76),
    grey: standard(0x71817e, .67),
    graphite: standard(0x272e2d, .55, .13),
    rubber: standard(0x1c2422, .92),
    cableLight: standard(0xb6b4a0, .79),
    cableBlue: standard(0x384d62, .68),
    cream: standard(0xe3dece, .38, .12),
    enamel: standard(0xeae8dd, .32, .14),
    slate: standard(0x40596b, .34, .25),
    blue: standard(0x335e79, .37, .19),
    bluePale: standard(0x8fadad, .43, .13),
    orange: standard(0xbc5e3a, .39, .16),
    ochre: standard(0xc79753, .62, .06),
    red: standard(0x9f4539, .38),
    steel: standard(0xc3cad0, .34, .74, { map: brushed, envMapIntensity: 1.36 }),
    dullSteel: standard(0x9a9f9d, .56, .42, { map: brushed }),
    chrome: standard(0xd8e4e8, .19, .87, { envMapIntensity: 1.47 }),
    bolt: standard(0xa4a9a7, .38, .59),
    bench: standard(0xe8c395, .72, 0, { map: wood }),
    plywood: standard(0xa38562, .75),
    paletteDark: standard(0x344044, .72),
    paletteLight: standard(0xc1c3ab, .53),
    lens: standard(0x213e4d, .19, .58, { envMapIntensity: 1.6 }),
    lensPrint: new THREE.MeshBasicMaterial({ map: fakeLens, toneMapped: false }),
    lensBlue: standard(0x537888, .26, .35, { envMapIntensity: 1.6 }),
    polycarbonate: standard(0xa6c8ca, .24, .2, { transparent: true, opacity: .255, depthWrite: false }),
    frost: standard(0x849c98, .29, .27, { envMapIntensity: 1.6 }),
    lightHousing: standard(0xd4d7c7, .41, .22),
    lamp: luminous(0xffffed),
    lightGreen: luminous(0xadf7ad),
    lightCyan: luminous(0x9ef0e4),
    lightAmber: luminous(0xffc371),
    lightRed: luminous(0xf58475),
    maskCream: standard(0xe1d7b3, .77),
    maskDark: standard(0x5e6b61, .83),
    motionStripe: standard(0xb17454, .76),
    perceptionStripe: standard(0x668589, .76),
    contactShadow: new THREE.MeshBasicMaterial({ map: ao, transparent: true, opacity: .57, depthWrite: false, toneMapped: false, userData: { staticBlend: true } }),
    smallShadow: new THREE.MeshBasicMaterial({ map: ao, transparent: true, opacity: .43, depthWrite: false, toneMapped: false, userData: { staticBlend: true } }),
    edgeShadow: new THREE.MeshBasicMaterial({ map: wallEdge, transparent: true, opacity: .54, depthWrite: false, toneMapped: false, userData: { staticBlend: true } })
  };
}

export function setLighting(scene) {
  scene.background = new THREE.Color(0xbfc6b6);
  const probe = canvasMap(384, 192, (ctx, w, h) => {
    const sweep = ctx.createLinearGradient(0, 0, 0, h);
    sweep.addColorStop(0, '#b4bfb6');
    sweep.addColorStop(.22, '#afbcb7');
    sweep.addColorStop(.42, '#666e66');
    sweep.addColorStop(.50, '#a0a697');
    sweep.addColorStop(.68, '#525953');
    sweep.addColorStop(1, '#333b36');
    ctx.fillStyle = sweep;
    ctx.fillRect(0, 0, w, h);
    for (const [x, y, width, height] of [[18, 29, 58, 31], [100, 26, 101, 24], [230, 31, 63, 24], [320, 18, 51, 38]]) {
      ctx.fillStyle = '#d9e0d4';
      ctx.fillRect(x - 4, y - 4, width + 8, height + 8);
      ctx.fillStyle = '#fff9e8';
      for (let i = 0; i < 3; ++i) ctx.fillRect(x + i * (width + 4) / 3, y, width / 3 - 3, height);
    }
    ctx.fillStyle = '#cadfd9';
    ctx.fillRect(124, 81, 74, 14);
    ctx.fillStyle = '#c6aa86';
    ctx.fillRect(288, 86, 35, 19);
  });
  probe.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = probe;
  scene.environmentIntensity = .89;
  scene.add(new THREE.HemisphereLight(0xf1f8ff, 0xc0af91, 1.32));
  const key = new THREE.DirectionalLight(0xfff3df, 2.45);
  key.position.set(-4, 8, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xe2f0fb, 1.22);
  fill.position.set(5, 5, -6);
  scene.add(fill);
  const lateral = new THREE.DirectionalLight(0xe8e9da, .32);
  lateral.position.set(-7, 3, -4);
  scene.add(lateral);
}
