
// ---------------------------------------------------------------------------
// Materials
// ---------------------------------------------------------------------------
const M = {};
let TX = {};
function initMaterials() {
  TX.glow = glowTexture(); TX.shadow = shadowTexture(); TX.wash = washTexture();
  TX.brushed = brushedTexture(150); TX.brushedDark = brushedTexture(70);
  TX.grille = grilleTexture(); TX.coinDoor = coinDoorTexture();
  const S = (o) => new THREE.MeshStandardMaterial(o);
  M.black = S({ color: 0x121116, roughness: 0.55, metalness: 0.0 });
  M.matte = S({ color: 0x050506, roughness: 0.95 });
  M.backPaint = S({ color: 0x1b1a20, roughness: 0.8 });
  M.kick = S({ color: 0x18171c, roughness: 0.7 });
  M.chrome = S({ color: 0xe8e8ee, roughness: 0.16, metalness: 1.0, map: TX.brushed });
  M.steel = S({ color: 0xb0b0b8, roughness: 0.35, metalness: 1.0, map: TX.brushed });
  M.darkMetal = S({ color: 0x9a9aa4, roughness: 0.45, metalness: 0.85, map: TX.brushedDark });
  M.coinDoor = S({ map: TX.coinDoor, roughness: 0.42, metalness: 0.75 });
  M.rubber = S({ color: 0x0c0c0e, roughness: 0.92 });
  M.grille = S({ map: TX.grille, roughness: 0.5, metalness: 0.6 });
  M.glass = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.04, metalness: 0.0, transparent: true, opacity: 0.22, depthWrite: false, envMapIntensity: 1.6 });
  M.tA = S({ color: 0xf2b705, roughness: 0.32 });            // Volt-Tek yellow T-molding
  M.tB = S({ color: 0xe6f4f6, roughness: 0.25, metalness: 0.2 }); // Wavecrest pearl
  M.gold = S({ color: 0xd9a83a, roughness: 0.28, metalness: 0.9 });
  M.shadow = new THREE.MeshBasicMaterial({ map: TX.shadow, color: 0x000000, transparent: true, opacity: 0.8, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
  M.plastic = {};
  for (const [k, c] of Object.entries({ red: 0xe0202a, yellow: 0xffc400, blue: 0x1f6fff, green: 0x22c45a, white: 0xf2f2f2, black: 0x111111, orange: 0xff6a10, purple: 0x8a3cff, teal: 0x18c8c0, pink: 0xff4f9a }))
    M.plastic[k] = S({ color: c, roughness: 0.22, metalness: 0.0 });
  M.coinLit = {};
}
function glowMat(color, opacity = 0.5, map = TX.glow) {
  return new THREE.MeshBasicMaterial({ map, color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: true });
}
function emissiveMat(map, intensity = 1.0, color = 0xffffff) {
  return new THREE.MeshStandardMaterial({ map, emissiveMap: map, emissive: color, emissiveIntensity: intensity, color: 0x202020, roughness: 0.35 });
}

// ---------------------------------------------------------------------------
// Cabinet parts
// ---------------------------------------------------------------------------
function sidePanels(parent, shape, W, D, thick, artL, artR, trim, bevel = 0.005) {
  const geo = new THREE.ExtrudeGeometry(shape, { depth: thick, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: 18 });
  geo.rotateY(-Math.PI / 2); geo.translate(0, 0, -D / 2);
  mesh(geo, [artL, trim], parent, -W / 2 + thick + bevel, 0, 0);
  mesh(geo, [artR, trim], parent, W / 2 - bevel, 0, 0);
  return thick + 2 * bevel;
}
function artMaterials(key, uMin, uMax, vMax) {
  const t = sideArtTexture(key, uMin, uMax, vMax);
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  t.repeat.set(1 / (uMax - uMin), 1 / vMax); t.offset.set(-uMin / (uMax - uMin), 0);
  const m = new THREE.MeshStandardMaterial({ map: t, roughness: 0.42, metalness: 0.0 });
  return [m, m];
}
function addCoinDoor(parent, x, y, z, s = 1, insertCol = '#c0101a') {
  const g = new THREE.Group(); g.position.set(x, y, z); g.scale.setScalar(s); parent.add(g);
  box(0.29, 0.38, 0.006, M.darkMetal, g, 0, 0, 0.003);
  box(0.265, 0.355, 0.012, M.coinDoor, g, 0, 0, 0.008);
  const key = insertCol;
  if (!M.coinLit[key]) M.coinLit[key] = emissiveMat(coinInsertTexture('25¢', insertCol), 2.2);
  for (const sx of [-0.065, 0.065]) {
    box(0.044, 0.085, 0.016, M.chrome, g, sx, 0.085, 0.014);
    box(0.034, 0.07, 0.004, M.coinLit[key], g, sx, 0.085, 0.0235);
    box(0.034, 0.022, 0.012, M.chrome, g, sx, 0.012, 0.018);
  }
  cyl(0.013, 0.013, 0.014, 16, M.chrome, g, 0, -0.1, 0.018, Math.PI / 2);
  box(0.003, 0.012, 0.002, M.matte, g, 0, -0.1, 0.0255);
  const gl = mesh(new THREE.PlaneGeometry(0.22, 0.14), glowMat(new THREE.Color(insertCol).multiplyScalar(0.8), 0.35), g, 0, 0.085, 0.03);
  return g;
}
// controls on a control-panel frame (local xy = panel top, +z up out of the panel)
function addControls(frame, L, layout, style) {
  for (const it of layout) {
    const x = it.x, y = it.y - L / 2;
    if (it.kind === 'stick') {
      cyl(0.03, 0.03, 0.003, 24, M.rubber, frame, x, y, 0.0015, Math.PI / 2);
      cyl(0.0055, 0.0055, 0.07, 10, M.chrome, frame, x, y, 0.035, Math.PI / 2);
      if (style === 'bat') {
        cyl(0.011, 0.012, 0.055, 16, M.plastic[it.color || 'black'], frame, x, y, 0.085, Math.PI / 2);
        mesh(new THREE.SphereGeometry(0.011, 16, 8), M.plastic[it.color || 'black'], frame, x, y, 0.1125);
      } else {
        mesh(new THREE.SphereGeometry(0.019, 20, 14), M.plastic[it.color || 'red'], frame, x, y, 0.085);
      }
    } else if (it.kind === 'spin') {
      cyl(0.05, 0.05, 0.004, 32, M.rubber, frame, x, y, 0.002, Math.PI / 2);
      cyl(0.042, 0.044, 0.03, 36, M.steel, frame, x, y, 0.02, Math.PI / 2);
      cyl(0.036, 0.042, 0.006, 36, M.chrome, frame, x, y, 0.038, Math.PI / 2);
      cyl(0.008, 0.008, 0.012, 12, M.plastic.red, frame, x + 0.022, y, 0.044, Math.PI / 2);
    } else if (it.kind === 'dome') {
      cyl(it.r * 1.25, it.r * 1.3, 0.008, 32, M.chrome, frame, x, y, 0.004, Math.PI / 2);
      const dm = mesh(new THREE.SphereGeometry(it.r, 32, 16, 0, TAU, 0, Math.PI / 2), it.mat, frame, x, y, 0.006, Math.PI / 2);
    } else {
      const r = it.r, mat = M.plastic[it.color || 'red'];
      cyl(r * 1.32, r * 1.38, 0.007, 28, mat, frame, x, y, 0.0035, Math.PI / 2);
      cyl(r * 0.95, r * 0.95, 0.012, 28, mat, frame, x, y, 0.012, Math.PI / 2);
      cyl(r * 1.0, r * 1.0, 0.003, 28, M.plastic.black, frame, x, y, 0.0072, Math.PI / 2);
    }
  }
}
function screenAssembly(parent, D, p0, p1, innerW, key, ow, oh, cy, light, offset, glassOut = 0.006) {
  const f = frameAt(parent, D, p0, p1, 0), len = f.userData.len;
  // bezel card with a rounded opening
  const sh = new THREE.Shape(); sh.moveTo(-innerW / 2, -len / 2); sh.lineTo(innerW / 2, -len / 2); sh.lineTo(innerW / 2, len / 2); sh.lineTo(-innerW / 2, len / 2); sh.closePath();
  sh.holes.push(roundRectShape(ow, oh, 0.03, 0, cy, new THREE.Path()));
  const bt = bezelTexture(key, innerW, len, ow, oh);
  bt.repeat.set(1 / innerW, 1 / len); bt.offset.set(0.5, 0.5);
  mesh(new THREE.ShapeGeometry(sh, 8), new THREE.MeshStandardMaterial({ map: bt, roughness: 0.55 }), f, 0, 0, -0.002);
  // tube surround
  const dz = 0.06;
  box(ow + 0.04, 0.02, dz, M.matte, f, 0, cy + oh / 2 + 0.01, -dz / 2 - 0.003);
  box(ow + 0.04, 0.02, dz, M.matte, f, 0, cy - oh / 2 - 0.01, -dz / 2 - 0.003);
  box(0.02, oh, dz, M.matte, f, -ow / 2 - 0.01, cy, -dz / 2 - 0.003);
  box(0.02, oh, dz, M.matte, f, ow / 2 + 0.01, cy, -dz / 2 - 0.003);
  const crt = mesh(crtGeometry(ow + 0.02, oh + 0.02, 0.02), screenMaterial(key, offset), f, 0, cy, -0.05);
  crt.userData.keep = true;
  mesh(new THREE.PlaneGeometry(innerW, len), M.glass, f, 0, 0, glassOut);
  // glass retaining strips
  box(innerW, 0.012, 0.01, M.black, f, 0, len / 2 - 0.006, glassOut);
  box(innerW, 0.012, 0.01, M.chrome, f, 0, -len / 2 + 0.006, glassOut);
  if (light) {
    const pl = new THREE.PointLight(GAMES[key].glow, light, 3.2, 2);
    pl.position.set(0, cy, 0.38); f.add(pl);
    f.userData.light = pl;
  }
  return f;
}
function marqueePanel(parent, D, p0, p1, innerW, key, intensity = 1.6) {
  const f = frameAt(parent, D, p0, p1, 0), len = f.userData.len;
  box(innerW, len, 0.02, M.matte, f, 0, 0, -0.03);
  mesh(new THREE.PlaneGeometry(innerW, len - 0.02), emissiveMat(marqueeTexture(key), intensity), f, 0, 0, -0.004);
  box(innerW, 0.016, 0.012, M.chrome, f, 0, len / 2 - 0.008, 0.002);
  box(innerW, 0.016, 0.012, M.chrome, f, 0, -len / 2 + 0.008, 0.002);
  mesh(new THREE.PlaneGeometry(innerW, len - 0.02), M.glass, f, 0, 0, 0.0);
  return f;
}
function addFeet(parent, W, D, inset = 0.06) {
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    cyl(0.018, 0.022, 0.012, 12, M.rubber, parent, sx * (W / 2 - inset), 0.006, sz * (D / 2 - inset));
  }
}
function blobShadow(parent, w, d, z = 0, op = 0.85) {
  const m = mesh(new THREE.PlaneGeometry(w, d), M.shadow, parent, 0, 0.003, z, -Math.PI / 2);
  return m;
}

// ---------------------------------------------------------------------------
// Bank A: Volt-Tek classic uprights (angular, portrait screen, 1P stick + 3 buttons)
// ---------------------------------------------------------------------------
function buildVoltTek(key, offset, btnColors, stickColor) {
  const g = new THREE.Group();
  const W = 0.64, D = 0.84, H = 1.84;
  const P = [[0, 0], [0.72, 0], [0.72, 0.84], [0.84, 0.88], [0.84, 0.96], [0.57, 1.04], [0.54, 1.08], [0.41, 1.5], [0.48, 1.55], [0.53, 1.78], [0.45, 1.84], [0, 1.84]];
  const shape = new THREE.Shape(); shape.moveTo(...P[0]); for (let i = 1; i < P.length; i++) shape.lineTo(...P[i]); shape.closePath();
  const [aL, aR] = artMaterials(key, 0, 0.84, 1.84);
  const st = sidePanels(g, shape, W, D, 0.012, aL, aR, M.tA, 0.004);
  const Wi = W - 2 * st;
  const front = new THREE.MeshStandardMaterial({ color: key === 'crater' ? 0x6a1420 : 0x2a1260, roughness: 0.45 });
  slab(g, D, [0.72, 0], [0.72, 0.1], Wi, 0.02, M.kick);
  slab(g, D, [0.72, 0.1], [0.72, 0.84], Wi, 0.02, front);
  // stripes across the lower front
  const sc = [M.plastic.yellow, M.plastic.orange, M.plastic.red];
  for (let k = 0; k < 3; k++) box(Wi, 0.012, 0.002, sc[k], g, 0, 0.74 - k * 0.022, 0.72 - D / 2 + 0.001);
  addCoinDoor(g, 0, 0.42, 0.72 - D / 2, 1, '#c0101a');
  slab(g, D, [0.72, 0.84], [0.84, 0.88], Wi, 0.02, M.black);
  slab(g, D, [0.84, 0.88], [0.84, 0.96], Wi + 0.002, 0.02, front);
  // control panel with overlay
  const layout = [
    { kind: 'stick', x: -0.15, y: 0.14, r: 0.02, color: stickColor },
    { kind: 'btn', x: 0.02, y: 0.11, r: 0.015, color: btnColors[0] },
    { kind: 'btn', x: 0.085, y: 0.135, r: 0.015, color: btnColors[1] },
    { kind: 'btn', x: 0.15, y: 0.15, r: 0.015, color: btnColors[2] },
    { kind: 'start', x: -0.23, y: 0.235, r: 0.01, color: 'white', label: '1P' },
  ];
  const L = Math.hypot(0.27, 0.08);
  const cpo = cpoTexture(key, Wi, L, layout);
  const cp = slab(g, D, [0.84, 0.96], [0.57, 1.04], Wi, 0.02, M.black);
  cp.material = [M.black, M.black, M.black, M.black, new THREE.MeshStandardMaterial({ map: cpo, roughness: 0.38 }), M.black];
  const cpf = frameAt(g, D, [0.84, 0.96], [0.57, 1.04], 0);
  addControls(cpf, L, layout, 'ball');
  box(Wi, 0.008, 0.012, M.chrome, cpf, 0, -L / 2 + 0.004, 0.0); // front edge trim
  slab(g, D, [0.57, 1.04], [0.54, 1.08], Wi, 0.02, M.black);
  const sf = screenAssembly(g, D, [0.54, 1.08], [0.41, 1.5], Wi, key, 0.33, 0.38, 0.0, 0, offset);
  slab(g, D, [0.41, 1.5], [0.48, 1.55], Wi, 0.012, M.grille);
  marqueePanel(g, D, [0.48, 1.55], [0.53, 1.78], Wi, key, 1.7);
  slab(g, D, [0.53, 1.78], [0.45, 1.84], Wi, 0.02, M.black);
  slab(g, D, [0.45, 1.84], [0, 1.84], Wi, 0.02, M.black);
  slab(g, D, [0, 1.84], [0, 0], Wi, 0.02, M.backPaint);
  addFeet(g, W, D);
  blobShadow(g, W + 0.35, D + 0.4, 0.05);
  // manufacturer badge
  const badge = new THREE.MeshStandardMaterial({ map: labelTexture(['VOLT-TEK'], '#d8d8de', '#7a1020', 256, 64, 34), roughness: 0.3, metalness: 0.6 });
  box(0.12, 0.03, 0.003, badge, g, 0.0, 0.18, 0.72 - D / 2 + 0.002);
  g.userData = { W, D, cpOver: 0.0, light: sf.userData.light };
  return g;
}

// ---------------------------------------------------------------------------
// Bank B: Wavecrest uprights (curved hood, landscape screen, wide 2P panel)
// ---------------------------------------------------------------------------
function buildWavecrest(key, offset, p1c, p2c) {
  const g = new THREE.Group();
  const W = 0.74, D = 0.82, H = 1.94;
  const s = new THREE.Shape();
  s.moveTo(0, 0); s.lineTo(0.78, 0); s.lineTo(0.78, 0.08); s.lineTo(0.74, 0.84); s.lineTo(0.6, 1.0); s.lineTo(0.56, 1.06); s.lineTo(0.43, 1.5);
  s.quadraticCurveTo(0.56, 1.52, 0.64, 1.6); s.lineTo(0.67, 1.8);
  s.quadraticCurveTo(0.68, 1.94, 0.5, 1.94); s.bezierCurveTo(0.3, 1.94, 0.1, 1.95, 0.02, 1.86); s.lineTo(0, 1.8); s.closePath();
  const [aL, aR] = artMaterials(key, 0, 0.78, 1.94);
  const st = sidePanels(g, s, W, D, 0.014, aL, aR, M.tB, 0.006);
  const Wi = W - 2 * st;
  const paint = new THREE.MeshStandardMaterial({ color: key === 'tide' ? 0x0b4d63 : 0x5a1d58, roughness: 0.32, metalness: 0.1 });
  slab(g, D, [0.78, 0], [0.78, 0.08], Wi, 0.02, M.kick);
  const fp = slab(g, D, [0.78, 0.08], [0.74, 0.84], Wi, 0.02, paint);
  const ff = frameAt(g, D, [0.78, 0.08], [0.74, 0.84], 0);
  addCoinDoor(ff, 0, -0.02, 0, 1, '#1a8a40');
  // wave stripe
  box(Wi, 0.02, 0.003, M.plastic.teal, ff, 0, 0.3, 0.001); box(Wi, 0.01, 0.003, M.plastic.pink, ff, 0, 0.27, 0.001);
  // wide control panel (overhangs the sides)
  const cpS = new THREE.Shape();
  cpS.moveTo(0.6, 0.84); cpS.lineTo(0.86, 0.86); cpS.quadraticCurveTo(0.93, 0.88, 0.91, 0.95); cpS.lineTo(0.89, 0.99); cpS.lineTo(0.58, 1.07); cpS.lineTo(0.55, 0.98); cpS.closePath();
  const CW = W + 0.1;
  const cpg = new THREE.ExtrudeGeometry(cpS, { depth: CW - 0.016, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 3, curveSegments: 10 });
  cpg.rotateY(-Math.PI / 2); cpg.translate(0, 0, -D / 2);
  mesh(cpg, [paint, M.black], g, CW / 2 - 0.008, 0, 0);
  const layout = [];
  for (const sx of [-1, 1]) {
    const pc = sx < 0 ? p1c : p2c;
    layout.push({ kind: 'stick', x: sx * 0.3, y: 0.15, r: 0.02, color: 'black' });
    layout.push({ kind: 'btn', x: sx * 0.2, y: 0.115, r: 0.014, color: pc[0] });
    layout.push({ kind: 'btn', x: sx * 0.145, y: 0.13, r: 0.014, color: pc[1] });
    layout.push({ kind: 'btn', x: sx * 0.2, y: 0.18, r: 0.014, color: pc[2] });
    layout.push({ kind: 'btn', x: sx * 0.145, y: 0.195, r: 0.014, color: pc[3] });
    layout.push({ kind: 'start', x: sx * 0.04, y: 0.24, r: 0.009, color: 'white' });
  }
  const L = Math.hypot(0.31, 0.08);
  const cpo = cpoTexture(key, CW - 0.02, L, layout);
  const cpf = frameAt(g, D, [0.89, 0.99], [0.58, 1.07], 0.0085);
  mesh(new THREE.PlaneGeometry(CW - 0.02, L), new THREE.MeshStandardMaterial({ map: cpo, roughness: 0.3 }), cpf, 0, 0, 0);
  addControls(cpf, L, layout, 'bat');
  // stick to cpf's frame: bat-tops use the colour list
  slab(g, D, [0.58, 1.07], [0.56, 1.06], Wi, 0.02, M.black);
  const sf = screenAssembly(g, D, [0.56, 1.06], [0.43, 1.5], Wi, key, 0.5, 0.375, 0.0, 0, offset);
  // hood underside with a soft downlight onto the panel
  slab(g, D, [0.43, 1.5], [0.64, 1.6], Wi, 0.02, M.black);
  const hf = frameAt(g, D, [0.43, 1.5], [0.64, 1.6], 0.002);
  box(Wi - 0.08, 0.025, 0.004, new THREE.MeshBasicMaterial({ color: new THREE.Color(0xd8fff8).multiplyScalar(1.6) }), hf, 0, 0.05, -0.001);
  marqueePanel(g, D, [0.64, 1.6], [0.67, 1.8], Wi, key, 1.6);
  const topPts = [[0.67, 1.8], [0.64, 1.91], [0.5, 1.94], [0.3, 1.945], [0.1, 1.93], [0.02, 1.86], [0, 1.8]];
  for (let i = 0; i < topPts.length - 1; i++) slab(g, D, topPts[i], topPts[i + 1], Wi, 0.02, M.black);
  slab(g, D, [0, 1.8], [0, 0], Wi, 0.02, M.backPaint);
  addFeet(g, W, D);
  blobShadow(g, W + 0.4, D + 0.45, 0.06);
  const badge = new THREE.MeshStandardMaterial({ map: labelTexture(['WAVECREST'], '#e6f4f6', '#0b4d63', 256, 64, 30), roughness: 0.3, metalness: 0.5 });
  box(0.14, 0.03, 0.003, badge, ff, 0, -0.33, 0.002);
  g.userData = { W, D, cpOver: 0.11, light: sf.userData.light };
  return g;
}

// ---------------------------------------------------------------------------
// Feature cabinet: LUNAR LIGHTHOUSE (swept fins, arched marquee, beacon tower)
// ---------------------------------------------------------------------------
function buildLighthouse(offset) {
  const g = new THREE.Group();
  const W = 1.16, D = 1.0, key = 'light', c = GAMES.light.c;
  const s = new THREE.Shape();
  s.moveTo(0.0, 0); s.lineTo(1.0, 0); s.lineTo(1.0, 0.1); s.lineTo(0.96, 0.84); s.lineTo(0.76, 1.06); s.lineTo(0.74, 1.08); s.lineTo(0.56, 1.62);
  s.lineTo(0.88, 1.74); s.lineTo(0.9, 1.93); s.quadraticCurveTo(0.6, 2.02, 0.3, 1.97);
  s.quadraticCurveTo(0.02, 1.9, -0.24, 1.32); s.quadraticCurveTo(-0.05, 1.18, 0.0, 0.95); s.closePath();
  const [aL, aR] = artMaterials(key, -0.24, 1.0, 2.02);
  const st = sidePanels(g, s, W, D, 0.03, aL, aR, M.gold, 0.008);
  const Wi = W - 2 * st;
  const navy = new THREE.MeshStandardMaterial({ color: 0x0c1d48, roughness: 0.35, metalness: 0.15 });
  const deck = new THREE.MeshStandardMaterial({ color: 0x0a0f22, roughness: 0.5 });
  slab(g, D, [1.0, 0], [1.0, 0.1], Wi, 0.02, M.kick);
  slab(g, D, [1.0, 0.1], [0.96, 0.84], Wi, 0.02, navy);
  const ff = frameAt(g, D, [1.0, 0.1], [0.96, 0.84], 0);
  addCoinDoor(ff, 0, -0.04, 0, 1.05, '#d08a10');
  // porthole speakers
  for (const sx of [-0.33, 0.33]) {
    mesh(new THREE.TorusGeometry(0.075, 0.012, 10, 40), M.gold, ff, sx, 0.12, 0.004);
    mesh(new THREE.CircleGeometry(0.075, 32), M.grille, ff, sx, 0.12, 0.002);
    for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; mesh(new THREE.SphereGeometry(0.006, 8, 6), M.chrome, ff, sx + Math.cos(a) * 0.075, 0.12 + Math.sin(a) * 0.075, 0.012); }
  }
  // gold pinstripes on the front
  box(Wi, 0.006, 0.002, M.gold, ff, 0, 0.3, 0.001); box(Wi, 0.006, 0.002, M.gold, ff, 0, -0.33, 0.001);
  // console control panel
  const cpS = new THREE.Shape();
  cpS.moveTo(0.82, 0.8); cpS.lineTo(1.1, 0.83); cpS.quadraticCurveTo(1.2, 0.85, 1.18, 0.93); cpS.lineTo(1.16, 0.99); cpS.lineTo(0.76, 1.1); cpS.lineTo(0.74, 0.98); cpS.closePath();
  const CW = W + 0.18;
  const cpg = new THREE.ExtrudeGeometry(cpS, { depth: CW - 0.02, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 3, curveSegments: 12 });
  cpg.rotateY(-Math.PI / 2); cpg.translate(0, 0, -D / 2);
  mesh(cpg, [navy, M.gold], g, CW / 2 - 0.01, 0, 0);
  // under-console glow strip
  box(CW - 0.1, 0.012, 0.01, new THREE.MeshBasicMaterial({ color: new THREE.Color(0x40d8ff).multiplyScalar(2.0) }), g, 0, 0.83, 1.06 - D / 2);
  const domeMat = new THREE.MeshStandardMaterial({ color: 0xffc23a, emissive: 0xffa010, emissiveIntensity: 1.2, roughness: 0.2, transparent: false });
  M.beamDome = domeMat;
  const layout = [
    { kind: 'dome', x: 0, y: 0.19, r: 0.05, mat: domeMat, label: 'BEAM' },
    { kind: 'start', x: -0.1, y: 0.33, r: 0.01, color: 'white' }, { kind: 'start', x: 0.1, y: 0.33, r: 0.01, color: 'white' },
  ];
  for (const sx of [-1, 1]) {
    layout.push({ kind: 'spin', x: sx * 0.42, y: 0.18, r: 0.045 });
    layout.push({ kind: 'btn', x: sx * 0.26, y: 0.14, r: 0.017, color: sx < 0 ? 'red' : 'blue' });
    layout.push({ kind: 'btn', x: sx * 0.19, y: 0.2, r: 0.017, color: sx < 0 ? 'yellow' : 'white' });
  }
  const L = Math.hypot(0.4, 0.11);
  const cpo = cpoTexture(key, CW - 0.03, L, layout);
  const cpf = frameAt(g, D, [1.16, 0.99], [0.76, 1.1], 0.0105);
  mesh(new THREE.PlaneGeometry(CW - 0.03, L), new THREE.MeshStandardMaterial({ map: cpo, roughness: 0.3 }), cpf, 0, 0, 0);
  addControls(cpf, L, layout, 'ball');
  slab(g, D, [0.76, 1.1], [0.74, 1.08], Wi, 0.02, M.black);
  const sf = screenAssembly(g, D, [0.74, 1.08], [0.56, 1.62], Wi, key, 0.66, 0.46, 0.0, 3.4, offset);
  // hood underside with gold downlight
  slab(g, D, [0.56, 1.62], [0.88, 1.74], Wi, 0.02, deck);
  const hf = frameAt(g, D, [0.56, 1.62], [0.88, 1.74], 0.002);
  box(Wi - 0.12, 0.02, 0.004, new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffd890).multiplyScalar(1.5) }), hf, 0, 0.08, -0.001);
  // top & back
  slab(g, D, [0.9, 1.93], [0.45, 1.98], Wi, 0.02, M.black);
  slab(g, D, [0.45, 1.98], [0.02, 1.62], Wi, 0.02, M.black);
  slab(g, D, [0.02, 1.62], [0.02, 0], Wi, 0.02, M.backPaint);
  // back service details
  const bf = frameAt(g, D, [0.02, 1.62], [0.02, 0], 0);
  const backTex = labelTexture(['⚠ CAUTION', 'HIGH VOLTAGE', 'INSIDE', '', 'SERVICE BY', 'STARLITE STAFF', 'ONLY'], '#e8c020', '#111', 256, 384, 26);
  box(0.16, 0.24, 0.002, new THREE.MeshStandardMaterial({ map: backTex, roughness: 0.6 }), bf, -0.25, -0.35, 0.002);
  const serial = labelTexture(['STARLITE AMUSEMENT CO.', 'MODEL LL-2  SER. 00417', '120V 60Hz 3.2A'], '#c8c8cc', '#222', 512, 160, 30);
  box(0.16, 0.05, 0.002, new THREE.MeshStandardMaterial({ map: serial, roughness: 0.3, metalness: 0.7 }), bf, 0.25, -0.45, 0.002);
  for (let k = 0; k < 9; k++) box(0.42, 0.012, 0.004, M.matte, bf, 0, 0.45 - k * 0.03, 0.001);
  box(0.6, 0.8, 0.004, M.darkMetal, bf, 0, -0.05, 0.0005).scale.set(1, 1, 1);
  cyl(0.012, 0.012, 0.01, 12, M.chrome, bf, 0.27, 0.0, 0.005, Math.PI / 2);
  // arched marquee header
  const hw = Wi + 0.02, archH = 0.16, archPk = 0.52;
  const arch = new THREE.Shape(); arch.moveTo(-hw / 2, 0); arch.lineTo(hw / 2, 0); arch.lineTo(hw / 2, archH); arch.quadraticCurveTo(0, archPk, -hw / 2, archH); arch.closePath();
  const ag = new THREE.ExtrudeGeometry(arch, { depth: 0.22, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3, curveSegments: 32 });
  const hdr = new THREE.Group(); hdr.position.set(0, 1.745, 0.88 - D / 2 - 0.22 - 0.012); g.add(hdr);
  mesh(ag, [navy, M.gold], hdr, 0, 0, 0);
  const inset = new THREE.Shape(); const iw = hw - 0.05;
  inset.moveTo(-iw / 2, 0.02); inset.lineTo(iw / 2, 0.02); inset.lineTo(iw / 2, archH - 0.005); inset.quadraticCurveTo(0, archPk - 0.05, -iw / 2, archH - 0.005); inset.closePath();
  const mt = marqueeTexture('light'); mt.repeat.set(1 / iw, 1 / 0.34); mt.offset.set(0.5, -0.02 / 0.34);
  mesh(new THREE.ShapeGeometry(inset, 32), emissiveMat(mt, 2.0), hdr, 0, 0, 0.2345);
  // chase bulbs following the arch
  const pts = [];
  for (let i = 0; i <= 22; i++) { const t = i / 22; const a = new THREE.Vector2(hw / 2, archH), cpt = new THREE.Vector2(0, archPk), b = new THREE.Vector2(-hw / 2, archH);
    pts.push([(1 - t) * (1 - t) * a.x + 2 * t * (1 - t) * cpt.x + t * t * b.x, (1 - t) * (1 - t) * a.y + 2 * t * (1 - t) * cpt.y + t * t * b.y]); }
  for (let i = 1; i <= 3; i++) { pts.unshift([hw / 2, archH - i * 0.05]); pts.push([-hw / 2, archH - i * 0.05]); }
  const bulbs = new THREE.InstancedMesh(new THREE.SphereGeometry(0.011, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }), pts.length);
  const dm = new THREE.Object3D();
  pts.forEach(([x, y], i) => { const nx = x * 0.985, ny = y + (y > archH - 0.001 ? 0.012 : 0); dm.position.set(nx, ny, 0.24); dm.updateMatrix(); bulbs.setMatrixAt(i, dm.matrix); bulbs.setColorAt(i, new THREE.Color(1, 0.8, 0.4)); });
  bulbs.userData.keep = true; hdr.add(bulbs);
  g.userData.bulbs = bulbs; g.userData.nBulbs = pts.length;
  // lighthouse tower
  const tw = new THREE.Group(); tw.position.set(0, 1.745 + 0.34 + 0.01, hdr.position.z + 0.11); g.add(tw);
  const stripe = new THREE.MeshStandardMaterial({ map: stripesTexture('#f4efe6', '#d0283c', 6), roughness: 0.45 });
  cyl(0.13, 0.15, 0.04, 32, navy, tw, 0, 0.02, 0);
  cyl(0.085, 0.11, 0.3, 32, stripe, tw, 0, 0.19, 0);
  cyl(0.13, 0.13, 0.016, 32, M.darkMetal, tw, 0, 0.348, 0);
  mesh(new THREE.TorusGeometry(0.125, 0.004, 6, 40), M.steel, tw, 0, 0.395, 0, Math.PI / 2);
  for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; cyl(0.003, 0.003, 0.045, 6, M.steel, tw, Math.cos(a) * 0.125, 0.375, Math.sin(a) * 0.125); }
  const lantern = new THREE.MeshStandardMaterial({ color: 0x222833, roughness: 0.05, transparent: true, opacity: 0.35, depthWrite: false, envMapIntensity: 1.5 });
  cyl(0.07, 0.07, 0.11, 24, lantern, tw, 0, 0.415, 0, 0, 0, 0, true);
  for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; cyl(0.004, 0.004, 0.11, 6, M.darkMetal, tw, Math.cos(a) * 0.07, 0.415, Math.sin(a) * 0.07); }
  cyl(0.09, 0.09, 0.012, 24, M.darkMetal, tw, 0, 0.476, 0);
  mesh(new THREE.ConeGeometry(0.095, 0.1, 24), new THREE.MeshStandardMaterial({ color: 0xa01826, roughness: 0.35, metalness: 0.4 }), tw, 0, 0.53, 0);
  mesh(new THREE.SphereGeometry(0.016, 12, 8), M.gold, tw, 0, 0.59, 0);
  const lamp = mesh(new THREE.SphereGeometry(0.034, 16, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.9, 0.6).multiplyScalar(3) }), tw, 0, 0.415, 0);
  lamp.userData.keep = true;
  // rotating beacon beams (soft additive cones)
  const beamMat = new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(1.0, 0.86, 0.55) } },
    vertexShader: `varying float vA; varying vec3 vN; varying vec3 vV; void main(){ vA = uv.y; vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
    fragmentShader: `uniform vec3 uColor; varying float vA; varying vec3 vN; varying vec3 vV; void main(){ float f = abs(dot(normalize(vN), normalize(vV))); float a = pow(vA, 2.2) * f * f * 0.45; gl_FragColor = vec4(uColor*a, 1.0); }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  });
  const beamGeo = new THREE.ConeGeometry(0.22, 1.3, 20, 1, true); beamGeo.translate(0, -0.65, 0); beamGeo.rotateZ(Math.PI / 2);
  const beams = new THREE.Group(); beams.position.set(0, 0.415, 0); tw.add(beams); beams.userData.keep = true;
  const b1 = mesh(beamGeo, beamMat, beams); const b2 = mesh(beamGeo, beamMat, beams, 0, 0, 0, 0, Math.PI, 0);
  g.userData.beams = beams;
  const spot = new THREE.SpotLight(0xffd9a0, 6, 14, 0.2, 0.7, 1.4);
  spot.position.set(0, 0.415, 0); tw.add(spot);
  const tgt = new THREE.Object3D(); beams.add(tgt); tgt.position.set(4, -1.2, 0); spot.target = tgt;
  g.userData.spot = spot;
  const halo = mesh(new THREE.PlaneGeometry(0.5, 0.5), glowMat(0xffd890, 0.5), tw, 0, 0.415, 0.0);
  halo.userData.keep = true; g.userData.halo = halo;
  // display dais
  const dais = new THREE.Group(); g.add(dais);
  const dw = W + 0.42, dz0 = -D / 2 - 0.3, dz1 = 1.16 - D / 2 + 0.22, dd = dz1 - dz0;
  box(dw, 0.06, dd, new THREE.MeshStandardMaterial({ color: 0x15132a, roughness: 0.6 }), dais, 0, 0.03, (dz0 + dz1) / 2);
  box(dw + 0.012, 0.012, dd + 0.012, M.chrome, dais, 0, 0.062, (dz0 + dz1) / 2);
  const led = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x40d8ff).multiplyScalar(1.5) });
  box(dw - 0.02, 0.008, 0.004, led, dais, 0, 0.028, dz1 + 0.003);
  box(0.004, 0.008, dd - 0.02, led, dais, -dw / 2 - 0.003, 0.028, (dz0 + dz1) / 2);
  box(0.004, 0.008, dd - 0.02, led, dais, dw / 2 + 0.003, 0.028, (dz0 + dz1) / 2);
  const fglow = glowMat(0x40c8ff, 0.22, TX.wash);
  mesh(new THREE.PlaneGeometry(dw, 0.5), fglow, dais, 0, 0.004, dz1 + 0.25, -Math.PI / 2);
  g.position.y = 0;
  addFeet(g, W, D, 0.08);
  g.children.forEach(ch => { if (ch !== dais) ch.position.y += 0.06; });
  blobShadow(dais, dw + 0.4, dd + 0.4, (dz0 + dz1) / 2);
    g.userData.W = W; g.userData.D = D; g.userData.dais = [dw, dz0, dz1]; g.userData.light = sf.userData.light;
  return g;
}
