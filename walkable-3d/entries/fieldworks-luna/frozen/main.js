import * as THREE from 'three';
import { mergeGeometries } from '/node_modules/three/examples/jsm/utils/BufferGeometryUtils.js';
import { RoomEnvironment } from '/node_modules/three/examples/jsm/environments/RoomEnvironment.js';

const $ = (s) => document.querySelector(s);
const host = $('#world');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9ca9a6);
scene.fog = new THREE.Fog(0x9ca9a6, 27, 54);

const camera = new THREE.PerspectiveCamera(71, innerWidth / innerHeight, 0.09, 90);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.65));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.setAttribute('aria-label', 'Explore the Fieldworks experimental lab');
host.appendChild(renderer.domElement);
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
pmrem.dispose();

const mats = {};
const material = (key, color, roughness = 0.55, metalness = 0, extra = {}) =>
  (mats[key] ||= new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra }));
material('wall', 0xc4c9c2, .82);
material('wallHigh', 0xe0dfd4, .88);
material('wallShade', 0x29363a, .55, .2);
material('panel', 0x506065, .63, .38);
material('panelDark', 0x18272c, .36, .48);
material('steel', 0x899899, .3, .82);
material('steelDark', 0x3d4a4e, .42, .78);
material('aluminum', 0xc5c9c2, .27, .86);
material('paint', 0xd0d6cf, .38, .28);
material('sage', 0x416f69, .42, .36);
material('teal', 0x177b78, .33, .45);
material('amberPaint', 0xe1a94f, .4, .25);
material('redPaint', 0xa34537, .4, .3);
material('rubber', 0x121a1d, .82, .08);
material('surface', 0x394549, .7, .2);
material('floorEdge', 0x65716e, .55, .52);
material('white', 0xe4e8e0, .36, .16);
material('cyanLamp', 0x4ec9bd, .32, .18, { emissive: 0x167a77, emissiveIntensity: 1.7 });
material('amberLamp', 0xf1bb64, .38, .05, { emissive: 0xa55b18, emissiveIntensity: 1.5 });
material('redLamp', 0xea6252, .34, .04, { emissive: 0x7a1710, emissiveIntensity: 1.5 });
material('glassLens', 0x98e7e5, .13, .24, { emissive: 0x173f42, emissiveIntensity: .38, transparent: true, opacity: .74 });
material('sampleGlass', 0xcaf2e6, .16, .08, { color: 0x8cbfb1, transparent: true, opacity: .31, roughness: .14 });

const cube = new Map();
const round = new Map();
const sphereGeo = new THREE.SphereGeometry(1, 20, 14);
const v = (x, y, z) => new THREE.Vector3(x, y, z);
function box(name, x, y, z, w, h, d, mat, parent = scene, opts = {}) {
  const key = `${w.toFixed(3)}|${h.toFixed(3)}|${d.toFixed(3)}`;
  let geo = cube.get(key);
  if (!geo) cube.set(key, geo = new THREE.BoxGeometry(w, h, d));
  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = name;
  mesh.position.set(x, y, z);
  if (opts.rx) mesh.rotation.x = opts.rx;
  if (opts.ry) mesh.rotation.y = opts.ry;
  if (opts.rz) mesh.rotation.z = opts.rz;
  mesh.castShadow = !!opts.cast;
  mesh.receiveShadow = !!opts.receive;
  parent.add(mesh);
  return mesh;
}
function cyl(name, x, y, z, top, bottom, h, mat, parent = scene, segments = 24, opts = {}) {
  const key = `${top.toFixed(3)}|${bottom.toFixed(3)}|${h.toFixed(3)}|${segments}`;
  let geo = round.get(key);
  if (!geo) round.set(key, geo = new THREE.CylinderGeometry(top, bottom, h, segments, 1));
  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = name;
  mesh.position.set(x, y, z);
  if (opts.quaternion) mesh.quaternion.copy(opts.quaternion);
  else {
    if (opts.rx) mesh.rotation.x = opts.rx;
    if (opts.ry) mesh.rotation.y = opts.ry;
    if (opts.rz) mesh.rotation.z = opts.rz;
  }
  mesh.castShadow = !!opts.cast;
  parent.add(mesh);
  return mesh;
}
function disc(name, x, y, z, radius, h, mat, parent = scene, segments = 48) {
  return cyl(name, x, y, z, radius, radius, h, mat, parent, segments);
}
function orb(name, x, y, z, sx, sy, sz, mat, parent = scene, opts = {}) {
  const mesh = new THREE.Mesh(sphereGeo, mat);
  mesh.name = name;
  mesh.position.set(x, y, z);
  mesh.scale.set(sx, sy, sz);
  mesh.castShadow = !!opts.cast;
  parent.add(mesh);
  return mesh;
}
function hoop(name, x, y, z, radius, tube, mat, parent = scene, rotation = [0, 0, 0], segments = 64) {
  const geo = new THREE.TorusGeometry(radius, tube, 10, segments);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = name;
  mesh.position.set(x, y, z);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}
function strut(name, a, b, r, mat, parent = scene, segments = 10) {
  const delta = new THREE.Vector3().subVectors(b, a);
  const mesh = cyl(name, 0, 0, 0, r, r, delta.length(), mat, parent, segments);
  mesh.position.copy(a).add(b).multiplyScalar(.5);
  mesh.quaternion.setFromUnitVectors(v(0, 1, 0), delta.normalize());
  return mesh;
}
function cable(name, pts, radius = .033, mat = mats.rubber, parent = scene) {
  const curve = new THREE.CatmullRomCurve3(pts.map(p => Array.isArray(p) ? v(...p) : p));
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(16, pts.length * 7), radius, 7, false), mat);
  tube.name = name;
  parent.add(tube);
  return tube;
}
function canvasTexture(width, height, paint) {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  paint(ctx, width, height);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  return tex;
}
const compositeTexture = canvasTexture(512, 512, (c, w, h) => {
  c.fillStyle = '#737c78'; c.fillRect(0, 0, w, h);
  let seed = 69107;
  const rand = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296);
  for (let i = 0; i < 2300; i++) {
    const y = rand() * h, x = rand() * w, length = 5 + rand() * 110;
    c.strokeStyle = rand() > .49 ? 'rgba(226,232,224,.12)' : 'rgba(22,35,37,.13)';
    c.lineWidth = .3 + rand() * 1.2;
    c.beginPath(); c.moveTo(x, y); c.lineTo(Math.min(w, x + length), y + (rand() - .5) * 1.3); c.stroke();
  }
  // A few handling marks and fine brushed passes break up the large horizontal tops.
  c.strokeStyle = 'rgba(229,227,209,.13)'; c.lineWidth = 2;
  [[38,86,165],[294,334,120],[151,449,81],[366,139,92]].forEach(([x,y,l])=>{c.beginPath();c.moveTo(x,y);c.lineTo(x+l,y-1);c.stroke();});
});
compositeTexture.wrapS = compositeTexture.wrapT = THREE.RepeatWrapping;
compositeTexture.repeat.set(2.4, 2.4);
material('composite',0xffffff,.68,.13,{map:compositeTexture});
function placardTexture(title, subtitle, accent = '#80d6c2') {
  return canvasTexture(1024, 256, (c, w, h) => {
    c.fillStyle = '#17252a'; c.fillRect(0, 0, w, h);
    c.fillStyle = accent; c.fillRect(0, 0, 13, h);
    c.fillStyle = '#81948e'; c.font = '600 25px Segoe UI, sans-serif'; c.letterSpacing = '5px';
    c.fillText('FIELDWORKS     /     EXPERIMENT HALL 01', 46, 58);
    c.fillStyle = '#eef3ed'; c.font = '700 56px Segoe UI, sans-serif'; c.letterSpacing = '1px';
    c.fillText(title, 45, 131);
    c.fillStyle = '#a5b4ad'; c.font = '400 24px Segoe UI, sans-serif';
    c.fillText(subtitle, 48, 207);
    c.strokeStyle = 'rgba(193,214,205,.22)'; c.lineWidth = 2;
    for (let x = w - 125; x < w - 35; x += 23) { c.beginPath(); c.moveTo(x, 28); c.lineTo(x, 228); c.stroke(); }
  });
}
function screenTexture(kind) {
  return canvasTexture(768, 480, (c, w, h) => {
    c.fillStyle = '#101c22'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#1c2a31'; c.fillRect(0, 0, w, 50);
    c.fillStyle = '#91ded0'; c.fillRect(18, 20, 8, 8);
    c.font = '600 20px Segoe UI, sans-serif'; c.fillStyle = '#d9e7e1';
    c.fillText(kind === 'vision' ? 'PERCEPTION / CALIBRATION 07' : 'MOTION / STAGE CONTROL', 41, 30);
    c.fillStyle = '#71827e'; c.font = '16px Segoe UI, sans-serif'; c.fillText('FIELDWORKS   ·   LAB NETWORK ISOLATED', 22, h - 18);
    if (kind === 'vision') {
      const ox = 196, oy = 247, r = 142;
      c.fillStyle = '#14232a'; c.fillRect(22, 68, 431, 336);
      for (let x = 32; x < 452; x += 28) { c.strokeStyle = 'rgba(121,185,174,.12)'; c.beginPath(); c.moveTo(x, 70); c.lineTo(x, 399); c.stroke(); }
      for (let y = 78; y < 399; y += 28) { c.strokeStyle = 'rgba(121,185,174,.12)'; c.beginPath(); c.moveTo(24, y); c.lineTo(451, y); c.stroke(); }
      const grad = c.createConicGradient(-.8, ox, oy);
      grad.addColorStop(0, '#41c3ae'); grad.addColorStop(.23, '#4179a8'); grad.addColorStop(.5, '#a94e87'); grad.addColorStop(.74, '#dd9b48'); grad.addColorStop(1, '#41c3ae');
      c.fillStyle = grad; c.beginPath(); c.arc(ox, oy, r, 0, Math.PI * 2); c.fill();
      c.globalCompositeOperation = 'destination-out'; c.beginPath(); c.arc(ox, oy, 96, 0, Math.PI * 2); c.fill();
      c.globalCompositeOperation = 'source-over'; c.strokeStyle = 'rgba(231,244,235,.88)'; c.lineWidth = 3;
      for (const rr of [39, 70, 98, 125]) { c.beginPath(); c.arc(ox, oy, rr, 0, Math.PI * 2); c.stroke(); }
      c.fillStyle = '#e4f3e9'; c.fillRect(ox - 2, 89, 4, 316); c.fillRect(38, oy - 2, 315, 4);
      c.fillStyle = '#eef1e8'; c.fillRect(496, 76, 244, 310);
      for (let i = 0; i < 16; i++) { c.fillStyle = i % 2 ? '#17252d' : '#f1f1e7'; c.fillRect(503 + i * 15, 90, 15, 135); }
      for (let i = 0; i < 10; i++) { c.fillStyle = i % 2 ? '#15232a' : '#ebeee3'; c.fillRect(502, 245 + i * 13, 231, 13); }
      c.fillStyle = '#a6b6ae'; c.font = '14px Segoe UI, sans-serif'; c.fillText('RADIAL / CHROMA', 503, 377);
      c.fillStyle = '#97e1cc'; c.font = '14px Segoe UI, sans-serif'; c.fillText('01 / LENS ARRAY   97.8%', 486, 70);
    } else {
      c.fillStyle = '#111f25'; c.fillRect(22, 68, 482, 332);
      for (let x = 40; x < 500; x += 36) { c.strokeStyle = 'rgba(129,180,169,.11)'; c.beginPath(); c.moveTo(x, 74); c.lineTo(x, 393); c.stroke(); }
      for (let y = 80; y < 398; y += 30) { c.strokeStyle = 'rgba(129,180,169,.11)'; c.beginPath(); c.moveTo(28, y); c.lineTo(499, y); c.stroke(); }
      c.strokeStyle = '#4dd1bd'; c.lineWidth = 4; c.beginPath();
      c.moveTo(61, 317); c.lineTo(155, 317); c.lineTo(187, 277); c.lineTo(247, 277); c.lineTo(290, 209); c.lineTo(357, 209); c.lineTo(416, 130); c.lineTo(470, 130); c.stroke();
      c.fillStyle = '#e9b15d'; [[155,317],[247,277],[357,209],[470,130]].forEach(([x,y]) => { c.beginPath(); c.arc(x,y,7,0,Math.PI*2); c.fill(); });
      c.fillStyle = '#90ddca'; c.font = '15px Segoe UI, sans-serif'; c.fillText('PATH / 3 AXIS', 42, 92);
      const stats = [['X', '014.2 mm'], ['Y', '092.0°'], ['LOAD', '18.4%']];
      stats.forEach(([k,val], i) => { const y = 97 + i * 88; c.fillStyle='#1a2a30'; c.fillRect(532,y,209,70); c.fillStyle='#7d9991'; c.font='14px Segoe UI,sans-serif'; c.fillText(k,548,y+23); c.fillStyle='#e5eee7'; c.font='24px Segoe UI,sans-serif'; c.fillText(val,548,y+52); });
      c.fillStyle='#4bd1b1'; c.fillRect(545,374,151,7); c.fillStyle='#394b50'; c.fillRect(545,374,205,7);
    }
  });
}
function textPanel(name, x, y, z, w, h, texture, parent = scene, ry = 0) {
  const m = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
  const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
  p.name = name; p.position.set(x, y, z); p.rotation.y = ry; parent.add(p);
  return p;
}
function overheadTag(title, subtitle, x, y, z, w, h, accent) {
  const tex = placardTexture(title, subtitle, accent);
  box(`${title} sign backing`, x, y, z - .035, w + .1, h + .1, .10, mats.panelDark);
  textPanel(`${title} label`, x, y, z + .018, w, h, tex);
}
function lightPanel(x, z, w = 3.1, d = .55, color = 0xfff3d9) {
  box('Suspended light / dark well', x, 5.055, z, w + .12, .12, d + .12, mats.wallShade);
  box('Diffused ceiling luminaire', x, 4.98, z, w, .045, d, material(`light-${color}`, color, .32, 0, { emissive: new THREE.Color(color), emissiveIntensity: 1.05 }));
}
function batchStaticMeshes() {
  scene.updateMatrixWorld(true);
  const batches = new Map();
  const meshes = [];
  const mergedKeys = new Set();
  scene.traverse(obj => {
    if (!obj.isMesh || Array.isArray(obj.material) || obj.material.transparent || obj.isInstancedMesh) return;
    const key = `${obj.material.uuid}|${Number(obj.castShadow)}|${Number(obj.receiveShadow)}`;
    let batch = batches.get(key);
    if (!batch) batches.set(key, batch = { material: obj.material, cast: obj.castShadow, receive: obj.receiveShadow, entries: [] });
    const geo = obj.geometry.clone();
    geo.applyMatrix4(obj.matrixWorld);
    batch.entries.push(geo);
    meshes.push(obj);
  });
  for (const [key, batch] of batches) {
    if (batch.entries.length < 2) { for (const g of batch.entries) g.dispose(); continue; }
    const merged = mergeGeometries(batch.entries, false);
    for (const g of batch.entries) g.dispose();
    if (!merged) continue;
    mergedKeys.add(key);
    merged.computeBoundingSphere();
    const mesh = new THREE.Mesh(merged, batch.material);
    mesh.name = `Static detail batch ${key.slice(0,8)}`;
    mesh.castShadow = batch.cast;
    mesh.receiveShadow = batch.receive;
    scene.add(mesh);
  }
  // Keep single-mesh batches as they were; replace only materials with merged geometry.
  for (const obj of meshes) {
    const key = `${obj.material.uuid}|${Number(obj.castShadow)}|${Number(obj.receiveShadow)}`;
    if (mergedKeys.has(key)) obj.parent?.remove(obj);
  }
}
function spot(x, y, z, tx, ty, tz, color = 0xfff0d5, intensity = 510, angle = .82) {
  const s = new THREE.SpotLight(color, intensity, 23, angle, .68, 1.3);
  s.position.set(x, y, z); s.target.position.set(tx, ty, tz);
  s.castShadow = false;
  scene.add(s, s.target);
}

// The room envelope and continuous, lightly polished floor.
const floorTex = canvasTexture(1024, 1024, (c, w, h) => {
  c.fillStyle = '#707a77'; c.fillRect(0, 0, w, h);
  let seed = 84219;
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < 52000; i++) {
    const light = Math.floor(103 + rand() * 28);
    c.fillStyle = `rgba(${light},${light + 4},${light + 1},${rand() * .10})`;
    c.fillRect(rand() * w, rand() * h, 1 + rand() * 3, 1 + rand() * 2);
  }
  c.strokeStyle = 'rgba(39,52,53,.38)'; c.lineWidth = 3;
  for (let i = 0; i <= 8; i++) { const p = i * w / 8; c.beginPath(); c.moveTo(p, 0); c.lineTo(p, h); c.stroke(); c.beginPath(); c.moveTo(0,p); c.lineTo(w,p); c.stroke(); }
  c.strokeStyle = 'rgba(215,223,213,.20)'; c.lineWidth = 1;
  for (let i = 0; i < 8; i++) { c.beginPath(); c.moveTo(i*w/8 + 10, 0); c.lineTo(i*w/8 + 10, h); c.stroke(); }
});
floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
floorTex.repeat.set(3.35, 2.7);
const floorMat = new THREE.MeshStandardMaterial({ map: floorTex, color: 0xffffff, roughness: .57, metalness: .16 });
box('Continuous resin terrazzo floor', 0, -.15, -.42, 27.5, .30, 21.5, floorMat, scene, { receive: true });
box('Raised floor sill / entrance', 0, -.06, 10.58, 4.5, .18, .54, mats.floorEdge);
box('Back-wall skirting', 0, .13, -10.54, 27.5, .26, .15, mats.wallShade);
box('Left-wall skirting', -13.72, .13, -.3, .16, .26, 20.9, mats.wallShade);
box('Right-wall skirting', 13.72, .13, -.3, .16, .26, 20.9, mats.wallShade);

// High enclosure with an open entry; wall paneling and service raceways add scale.
box('Insulated rear wall', 0, 2.8, -10.83, 27.7, 5.6, .38, mats.wallHigh, scene, { receive: true });
box('West wall', -13.82, 2.8, -.32, .38, 5.6, 21.4, mats.wall, scene, { receive: true });
box('East wall', 13.82, 2.8, -.32, .38, 5.6, 21.4, mats.wall, scene, { receive: true });
box('Entry wall / west return', -8.25, 2.72, 10.32, 11.5, 5.45, .38, mats.wallHigh, scene, { receive: true });
box('Entry wall / east return', 8.25, 2.72, 10.32, 11.5, 5.45, .38, mats.wallHigh, scene, { receive: true });
box('Entry lintel', 0, 5.0, 10.32, 5.1, .88, .38, mats.wallHigh, scene, { receive: true });
box('Ceiling / acoustic field', 0, 5.58, -.3, 27.7, .26, 21.4, mats.wallShade, scene, { receive: true });

for (const side of [-1, 1]) {
  const x = side * 13.6;
  for (let i = 0; i < 7; i++) {
    const z = -9.1 + i * 2.9;
    box('Wall acoustic bay', x, 2.8, z, .05, 2.42, 2.52, side < 0 ? mats.panel : mats.wallShade);
    box('Acoustic bay top rail', x + side * .035, 4.04, z, .11, .045, 2.56, mats.aluminum);
  }
  box('Wall service raceway', side * 13.45, 4.63, -.15, .12, .12, 19.3, mats.steelDark);
  for (let j = 0; j < 8; j++) box('Raceway clamp', side * 13.36, 4.63, -8.4 + j * 2.35, .08, .22, .08, mats.aluminum);
}
for (let i = 0; i < 9; i++) {
  const x = -12.3 + i * 3.08;
  box('Rear wall inset panel', x, 2.25, -10.605, 2.72, 2.7, .045, i % 2 ? mats.wall : mats.panel);
  box('Rear panel lower kick', x, .89, -10.55, 2.72, .08, .08, mats.steelDark);
}
// Serviceable ceiling cassette grid, with luminous neutral panels.
for (const z of [-8.2, -4.25, -.2, 3.85, 7.9]) {
  box('Ceiling acoustic raft', 0, 5.405, z, 24.7, .055, 2.95, mats.panelDark);
  for (const x of [-9.2, -3.1, 3.1, 9.2]) {
    box('Acoustic panel', x, 5.368, z, 5.7, .034, 2.63, mats.panel);
  }
}
for (const [x,z] of [[-9.2,-8.2],[0,-8.2],[9.2,-8.2],[-9.2,-.2],[0,-.2],[9.2,-.2],[-6.15,7.9],[6.15,7.9]]) lightPanel(x,z,3.65,.72);

const hemi = new THREE.HemisphereLight(0xe5eee7, 0x39464a, 1.35); scene.add(hemi);
const keyLight = new THREE.DirectionalLight(0xffefdc, 2.0);
keyLight.position.set(-7, 10, 7); keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1536, 1536);
keyLight.shadow.camera.left = -17; keyLight.shadow.camera.right = 17;
keyLight.shadow.camera.top = 14; keyLight.shadow.camera.bottom = -14;
keyLight.shadow.bias = -.00025; keyLight.shadow.normalBias = .025;
keyLight.shadow.autoUpdate = false;
keyLight.shadow.needsUpdate = true;
scene.add(keyLight);
spot(-8.4, 4.85, -1.4, -8.4, .4, -4.8, 0xffefcf, 560, .74);
spot(8.1, 4.85, -.8, 8.1, .5, -3.1, 0xe2f1ef, 590, .8);
spot(0, 4.8, 4.5, 0, .2, 0, 0xf1f3e8, 690, .72);
spot(-5.8, 4.75, -7.8, -8.4, 1, -5.4, 0xdcefe9, 340, .62);

// Two shallow wing fins make the work bays distinct while leaving their full front edges open.
for (const side of [-1, 1]) {
  const x = side * 4.82;
  box(side < 0 ? 'Perception bay / open divider' : 'Motion bay / open divider', x, .43, -5.1, .29, .86, 7.35, mats.wallShade, scene, { cast: true });
  box('Divider painted inner face', x + side * .17, .42, -5.05, .035, .67, 6.8, side < 0 ? mats.sage : mats.panel);
  box('Divider stainless cap', x, .88, -5.1, .39, .08, 7.4, mats.aluminum);
  box('Divider amber locator', x, .23, -1.4, .35, .12, .2, mats.amberPaint);
}
// Bay floor inserts and fine perimeter joints.
for (const side of [-1, 1]) {
  const x = side * 9.1;
  box('Inset bay floor mat', x, .009, -5.35, 7.75, .024, 9.25, mats.wallShade);
  const stripeX = side < 0 ? -5.36 : 5.36;
  box('Bay threshold stainless strip', stripeX, .024, -1.43, .08, .025, 1.14, mats.aluminum);
  for (let i=0; i<7; i++) box('Threshold warning dash', stripeX + (side<0 ? .18 : -.18), .027, -1.85 - i*.24, .22, .016, .09, mats.amberPaint);
}

// Main freestanding instrument: a multi-axis optical gimbal and live sample stage.
const core = new THREE.Group(); core.name = 'Asterion multi-axis optical array'; scene.add(core);
disc('Array foot / shadow plinth', 0, .045, 0, 1.58, .09, mats.rubber, core);
disc('Turntable lower race', 0, .16, 0, 1.47, .16, mats.steelDark, core);
disc('Turntable upper race', 0, .265, 0, 1.39, .075, mats.aluminum, core);
disc('Instrument basal housing', 0, .405, 0, 1.26, .24, mats.panelDark, core);
disc('Stage shoulder', 0, .55, 0, .91, .08, mats.steel, core);
disc('Sample positioning plate', 0, .635, 0, .58, .095, mats.surface, core);
hoop('Optical register / lower',0,.53,0,.83,.018,mats.amberPaint,core);
hoop('Optical register / upper',0,.285,0,1.18,.016,mats.cyanLamp,core);
for (let i=0;i<16;i++) {
  const a = i*Math.PI*2/16, x=Math.cos(a), z=Math.sin(a);
  cyl('Race fastener',x*1.32,.32,z*1.32,.045,.045,.045,mats.aluminum,core,12);
  if (i%2===0) orb('Status light',x*1.22,.535,z*1.22,.035,.025,.035,i%4===0?mats.cyanLamp:mats.amberLamp,core);
}
for (let i=0;i<6;i++) {
  const a=i*Math.PI*2/6, x=Math.cos(a), z=Math.sin(a);
  const foot=v(x*.65,.72,z*.65), shoulder=v(x*.94,1.18,z*.94);
  strut('Gimbal fork / lower',foot,shoulder,.068,mats.steelDark,core,12);
  orb('Fork pivot collar',shoulder.x,shoulder.y,shoulder.z,.14,.14,.14,mats.amberPaint,core);
  const cap=v(shoulder.x,shoulder.y+.13,shoulder.z);
  orb('Fork pivot cap',cap.x,cap.y,cap.z,.073,.073,.073,mats.aluminum,core);
}
// Three intersecting hoops, each with a fine inboard guide and supporting bearing blocks.
hoop('Azimuth gimbal / brushed alloy',0,2.09,0,1.17,.067,mats.aluminum,core,[0,0,0]);
hoop('Elevation gimbal / dark titanium',0,2.09,0,1.075,.074,mats.steelDark,core,[0,Math.PI/2,0]);
hoop('Polar gimbal / warm stainless',0,2.09,0,1.28,.052,mats.amberPaint,core,[Math.PI/2,0,0]);
hoop('Azimuth inner guide',0,2.09,0,1.005,.018,mats.cyanLamp,core,[0,0,0]);
for (const [x,z] of [[0,-1.17],[1.17,0],[0,1.17],[-1.17,0]]) {
  box('Gimbal bearing shoe',x,2.09,z,.30,.28,.18,mats.panelDark,core,{cast:true});
  box('Bearing end cap',x*1.12,2.09,z*1.12,.11,.22,.11,mats.aluminum,core);
  orb('Bearing pilot lamp',x*1.11,2.18,z*1.11,.045,.035,.045,mats.cyanLamp,core);
}
// Sensor pods point inward at the sample; only the small lens windows use transparency.
for (let i=0;i<8;i++) {
  const a=i*Math.PI/4, ux=Math.cos(a), uz=Math.sin(a);
  const px=ux*1.43, pz=uz*1.43, py=i%2?2.68:1.63;
  const inward=v(-ux,0,-uz);
  const opticalFrame=new THREE.Quaternion().setFromUnitVectors(v(0,0,1),inward);
  const pod = box('Radial optical sensor housing',px,py,pz,.40,.31,.49,i%2?mats.sage:mats.panelDark,core,{cast:true});
  pod.quaternion.copy(opticalFrame);
  const opticalAxis=new THREE.Quaternion().setFromUnitVectors(v(0,1,0),inward);
  cyl('Sensor bezel',px-ux*.04,py,pz-uz*.04,.145,.145,.035,mats.steelDark,core,24,{quaternion:opticalAxis});
  cyl('Optical lens',px-ux*.07,py,pz-uz*.07,.107,.107,.04,mats.glassLens,core,24,{quaternion:opticalAxis});
  const retainer=hoop('Lens retainer',px-ux*.094,py,pz-uz*.094,.118,.014,mats.aluminum,core,[0,0,0],32);
  retainer.quaternion.copy(opticalFrame);
  // A colored alignment pin sits just below each camera shell.
  orb('Sensor status pin',px+ux*.16,py-.115,pz+uz*.16,.032,.028,.032,i%2?mats.amberLamp:mats.cyanLamp,core);
}
// Isolated seed crystal, with a compact optical shutter above it.
disc('Kinematic specimen puck',0,.728,0,.245,.075,mats.aluminum,core,32);
box('Glazed reference sample',0,.94,0,.30,.34,.30,mats.sampleGlass,core,{cast:true});
orb('Illuminated calibration kernel',0,.948,0,.095,.11,.095,material('kernel',0x8ce6d2,.18,.15,{emissive:0x267d77,emissiveIntensity:.85}),core);
hoop('Sample cradle / lower',0,.82,0,.30,.018,mats.amberLamp,core,[Math.PI/2,0,0],40);
for (const z of [-.18,.18]) {
  strut('Sample cradle post',v(-.2,.74,z),v(-.12,1.22,z),.024,mats.steel,core,8);
  strut('Sample cradle post',v(.2,.74,z),v(.12,1.22,z),.024,mats.steel,core,8);
}
// Small service port and engraved front plinth badge.
box('Array service hatch',0,.43,1.265,.64,.16,.025,mats.steelDark,core);
box('Array serial plate',0,.43,1.282,.44,.075,.012,mats.panel,core);
for (const x of [-.255,.255]) orb('Hatch latch',x,.43,1.303,.018,.018,.016,mats.amberPaint,core);

// A thin route graphic stays flush with the floor and points to the two work bays.
const floorGuideTex = canvasTexture(768,192,(c,w,h)=>{
  c.clearRect(0,0,w,h); c.fillStyle='#d6e2da'; c.globalAlpha=.94;
  c.font='700 45px Segoe UI,sans-serif'; c.fillText('←  PERCEPTION',25,70); c.fillStyle='#e5b85f'; c.fillRect(25,91,600,3);
  c.fillStyle='#bdccc5'; c.font='400 24px Segoe UI,sans-serif'; c.fillText('VISION / SAMPLE BAY    ·    OPEN ACCESS',25,137);
});
function floorLabel(x,z,tex,rotation=0) {
  const m=new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:THREE.DoubleSide});
  const p=new THREE.Mesh(new THREE.PlaneGeometry(3.7,.92),m); p.position.set(x,.022,z); p.rotation.x=-Math.PI/2; p.rotation.z=rotation; scene.add(p);
}
floorLabel(-8.8,.05,floorGuideTex);
const motionGuideTex=canvasTexture(768,192,(c,w,h)=>{
  c.clearRect(0,0,w,h); c.fillStyle='#d6e2da'; c.globalAlpha=.94;
  c.font='700 45px Segoe UI,sans-serif'; c.fillText('MOTION   →',25,70); c.fillStyle='#e5b85f'; c.fillRect(25,91,510,3);
  c.fillStyle='#bdccc5'; c.font='400 24px Segoe UI,sans-serif'; c.fillText('KINEMATICS / ACTUATION BAY',25,137);
});
floorLabel(8.8,.05,motionGuideTex);

// Bay 01 · work surface, calibrated camera, geometry samples and an original image test.
const benchX=-9.05, benchZ=-6.0, benchTop=1.075;
box('Vision bench / steel apron',benchX,.99,benchZ,6.52,.23,1.38,mats.steelDark,scene,{cast:true});
box('Vision bench / graphite composite top',benchX,1.12,benchZ,6.62,.12,1.47,mats.composite,scene,{cast:true});
box('Bench front alloy edge',benchX,1.12,benchZ+.746,6.58,.085,.035,mats.aluminum);
box('Bench rear service lip',benchX,1.205,benchZ-.63,6.56,.065,.065,mats.steel);
for (const x of [benchX-2.85,benchX+2.85]) for (const z of [benchZ-.49,benchZ+.48]) {
  box('Vision bench leg',x,.54,z,.105,1.0,.105,mats.steelDark,scene,{cast:true});
  box('Bench leveling foot',x,.055,z,.17,.065,.17,mats.rubber);
}
box('Bench cross rail',benchX,.45,benchZ,5.9,.08,.11,mats.steel);
box('Cable tray under vision bench',benchX,.77,benchZ-.46,5.25,.075,.32,mats.panelDark);
for(let i=0;i<8;i++) box('Worktop locator groove',benchX-2.8+i*.8,1.183,benchZ+.40,.36,.008,.018,mats.aluminum);

// Camera mast and a real multi-piece objective barrel.
const camX=-10.58, camZ=-5.84;
disc('Survey camera tripod hub',camX,1.25,camZ,.19,.08,mats.steelDark);
for (let i=0;i<3;i++) {
  const a=i*Math.PI*2/3;
  strut('Tripod spreader',v(camX,1.23,camZ),v(camX+Math.cos(a)*.35,.17,camZ+Math.sin(a)*.35),.036,mats.steelDark,scene,8);
  box('Tripod soft foot',camX+Math.cos(a)*.35,.08,camZ+Math.sin(a)*.35,.16,.06,.14,mats.rubber,scene,{ry:-a});
}
cyl('Camera mast',camX,1.79,camZ,.046,.057,1.05,mats.aluminum);
box('Camera tilt yoke',camX,2.29,camZ,.34,.12,.30,mats.amberPaint);
box('Machine vision camera shell',camX,2.47,camZ,.70,.47,.56,mats.sage,scene,{cast:true});
box('Camera top cover',camX,2.72,camZ,.54,.06,.46,mats.aluminum);
box('Camera side cooling fins',camX-.365,2.47,camZ,.055,.25,.36,mats.steelDark);
cyl('Camera objective outer barrel',camX,2.45,camZ+.34,.25,.22,.38,mats.steelDark,scene,32,{rx:Math.PI/2});
cyl('Camera objective focus ring',camX,2.45,camZ+.535,.185,.185,.085,mats.aluminum,scene,32,{rx:Math.PI/2});
cyl('Camera front glass',camX,2.45,camZ+.585,.143,.143,.035,mats.glassLens,scene,32,{rx:Math.PI/2});
hoop('Camera objective lip',camX,2.45,camZ+.608,.158,.018,mats.steelDark,scene,[0,0,0],40);
for(let i=0;i<4;i++) box('Camera aperture mark',camX-.23+i*.15,2.775,camZ,.032,.016,.04,i===2?mats.amberLamp:mats.steel);
orb('Camera record lamp',camX+.32,2.52,camZ+.08,.037,.037,.037,mats.redLamp);

// Low rotating sample deck; none of the samples touches the visitor route.
const sampleX=-8.67, sampleZ=-5.95;
box('Sample inspection pad',sampleX,1.2,sampleZ,1.65,.08,.82,mats.panelDark);
box('Sample tray satin insert',sampleX,1.247,sampleZ,1.52,.025,.72,mats.steel);
for(let i=0;i<3;i++) box('Sample nest',sampleX-.48+i*.48,1.27,sampleZ,.39,.028,.39,mats.rubber);
disc('Pearl reference sphere pedestal',sampleX-.48,1.36,sampleZ,.15,.14,mats.aluminum,scene,24);
orb('Pearl reference sphere',sampleX-.48,1.5,sampleZ,.155,.155,.155,material('pearl',0xe0d9c2,.25,.08),scene,{cast:true});
box('Coded cube pedestal',sampleX,1.355,sampleZ,.26,.13,.26,mats.amberPaint);
box('Coded cube / matte red',sampleX,1.51,sampleZ,.235,.22,.235,mats.redPaint,scene,{cast:true});
cyl('Trihedral sample socket',sampleX+.49,1.35,sampleZ,.19,.19,.12,mats.teal,scene,3,{ry:Math.PI/6});
cyl('Trihedral prism',sampleX+.49,1.52,sampleZ,.19,.19,.23,mats.amberPaint,scene,3,{ry:Math.PI/6});
box('Sample tray engraved label',sampleX,1.29,sampleZ+.37,.62,.014,.10,mats.wallShade);

// Static fictional radial/chroma calibration graphics.
const visionScreenX=-6.52, visionScreenZ=-6.33;
box('Vision display pedestal',visionScreenX,1.37,visionScreenZ-.03,.38,.46,.36,mats.steelDark);
strut('Vision display neck',v(visionScreenX,1.49,visionScreenZ),v(visionScreenX,1.76,visionScreenZ),.05,mats.aluminum);
box('Vision display case',visionScreenX,2.05,visionScreenZ,.13+1.72,1.11,.18,mats.panelDark,scene,{cast:true});
box('Display glass bezel edge',visionScreenX,2.05,visionScreenZ+.101,1.68,1.07,.018,mats.steelDark);
textPanel('Radial spectrum / original test pattern',visionScreenX,2.05,visionScreenZ+.113,1.58,.965,screenTexture('vision'));
for (const x of [visionScreenX-.69,visionScreenX+.69]) orb('Vision display status dot',x,1.55,visionScreenZ+.12,.027,.027,.018,x<visionScreenX?mats.cyanLamp:mats.amberLamp);
for (let i=0;i<3;i++) {
  cyl('Camera gain dial',-7.2+i*.28,1.31,-5.26,.055,.055,.05,mats.panelDark,scene,20);
  orb('Dial index',-7.2+i*.28,1.36,-5.26,.012,.014,.012,mats.amberLamp);
}
box('Perception bay instrument placard',-8.7,3.92,-10.47,5.55,.99,.10,mats.panelDark);
textPanel('Perception bay label',-8.7,3.92,-10.407,5.36,.80,placardTexture('PERCEPTION / BAY 01','RADIAL CHROMA · OBJECT RECOGNITION','#91dfcb'));

// Motion bay · compact linear stage, visible link joints and independent control console.
const rigX=8.35, rigZ=-3.66;
box('Motion fixture / load plate',rigX,.84,rigZ,4.55,.21,3.02,mats.steelDark,scene,{cast:true});
box('Motion fixture / isolation feet',rigX,.19,rigZ,4.17,.22,2.68,mats.rubber);
box('Motion fixture top deck',rigX,.972,rigZ,4.34,.07,2.79,mats.composite);
for (const x of [rigX-1.92,rigX+1.92]) for (const z of [rigZ-.97,rigZ+.97]) {
  box('Fixture corner guard',x,1.06,z,.12,.16,.12,mats.amberPaint);
  orb('Fixture fastener',x,1.06,z+.071,.022,.022,.014,mats.aluminum);
}
// Two precision linear ways run across the alcove; bearing shoes and marked stops are visible.
for (const z of [rigZ-.63,rigZ+.63]) {
  box('Linear guide rail',rigX,1.14,z,3.86,.15,.16,mats.aluminum);
  box('Linear bearing black race',rigX,1.225,z,3.50,.045,.105,mats.rubber);
  for(let i=0;i<12;i++) box('Rail indexing mark',rigX-1.62+i*.295,1.251,z+.057,.018,.008,.018,mats.panelDark);
  for(const x of [rigX-1.75,rigX+1.75]) box('Travel end stop',x,1.38,z,.16,.40,.31,mats.amberPaint);
}
// Portal frame, gantry crossbar and moving carriage.
for(const x of [rigX-1.93,rigX+1.93]) {
  for(const z of [rigZ-.78,rigZ+.78]) {
    box('Gantry upright',x,1.86,z,.15,1.54,.16,mats.steelDark,scene,{cast:true});
    box('Gantry foot plate',x,1.12,z,.36,.09,.34,mats.aluminum);
    orb('Upright anchor bolt',x,1.175,z,.039,.028,.039,mats.amberPaint);
  }
  box('Gantry upper bridge',x,2.73,rigZ,.22,.20,1.72,mats.steelDark);
  box('Bridge caution band',x,2.735,rigZ+.06,.224,.075,1.22,mats.amberPaint);
}
box('Moving carriage / linear saddle',rigX,1.49,rigZ,1.04,.24,1.02,mats.panelDark,scene,{cast:true});
box('Moving carriage top plate',rigX,1.63,rigZ,.84,.09,.82,mats.aluminum);
for(const z of [rigZ-.63,rigZ+.63]) box('Linear shoe',rigX,1.42,z,.98,.13,.26,mats.sage,scene,{cast:true});
// Articulated two-link pick-and-place arm held at a readable sample pose.
const p0=v(rigX,1.72,rigZ), p1=v(rigX-.34,2.16,rigZ+.05), p2=v(rigX+.28,2.46,rigZ+.12), p3=v(rigX+.57,2.27,rigZ+.24);
orb('Arm yaw joint',p0.x,p0.y,p0.z,.22,.14,.22,mats.amberPaint,scene,{cast:true});
strut('Lower robot link',p0,p1,.105,mats.sage,scene,14);
strut('Link inlay / lower',v(p0.x,p0.y+.035,p0.z),v(p1.x,p1.y+.035,p1.z),.027,mats.aluminum,scene,8);
orb('Elbow bearing / outer',p1.x,p1.y,p1.z,.19,.19,.19,mats.steelDark,scene,{cast:true});
orb('Elbow bearing / orange cap',p1.x,p1.y,p1.z+.117,.11,.11,.055,mats.amberPaint);
strut('Upper robot link',p1,p2,.087,mats.teal,scene,14);
box('Link protective cover', (p1.x+p2.x)/2,(p1.y+p2.y)/2,(p1.z+p2.z)/2,.19,.15,.47,mats.sage,scene,{rz:-.43,ry:-.76});
orb('Wrist multi-axis joint',p2.x,p2.y,p2.z,.145,.145,.145,mats.aluminum,scene,{cast:true});
strut('Wrist tool offset',p2,p3,.055,mats.steelDark,scene,10);
orb('Tool flange',p3.x,p3.y,p3.z,.115,.12,.115,mats.amberPaint);
strut('Soft-grip jaw left',v(p3.x,p3.y,p3.z),v(p3.x+.025,p3.y-.25,p3.z-.105),.035,mats.steelDark,scene,8);
strut('Soft-grip jaw right',v(p3.x,p3.y,p3.z),v(p3.x+.025,p3.y-.25,p3.z+.105),.035,mats.steelDark,scene,8);
box('Motion witness cube',rigX+.54,1.13,rigZ+.25,.26,.28,.26,mats.amberPaint,scene,{cast:true});
box('Witness cube black face',rigX+.54,1.13,rigZ+.386,.12,.12,.018,mats.panelDark);
// A protected service harness follows the shoulder and stays clear of the floor.
cable('Robot energy chain / main',[p0.clone().add(v(0,.08,-.28)),v(rigX-.36,1.94,rigZ-.52),v(rigX-.32,2.12,rigZ-.33),v(rigX-.2,2.22,rigZ-.12),p1.clone().add(v(-.02,.04,-.14))],.045,mats.rubber);
cable('Robot sensor lead / blue',[v(p1.x-.04,p1.y+.1,p1.z-.11),v(p1.x+.12,p1.y+.24,p1.z-.12),v(p2.x-.05,p2.y+.17,p2.z-.12),v(p2.x+.1,p2.y+.04,p2.z-.1)],.018,mats.teal);
for(const y of [1.94,2.12,2.30]) box('Arm vent slot',rigX-.32,y,rigZ-.11,.035,.014,.14,mats.panelDark,{rz:-.45});
// Console with an informational graphic, tactile knobs and a gated lever.
const consX=11.63, consZ=-5.06;
box('Motion console pedestal',consX,.57,consZ,.70,1.02,.68,mats.steelDark,scene,{cast:true});
box('Console foot / rubber isolation',consX,.105,consZ,.86,.14,.83,mats.rubber);
box('Console desktop',consX,1.12,consZ,.92,.16,.91,mats.panelDark,scene,{cast:true});
box('Console work surface',consX,1.212,consZ,.86,.045,.85,mats.composite);
box('Console screen body',consX,1.77,consZ-.30,1.02,1.00,.17,mats.panelDark,scene,{cast:true});
box('Console screen rim',consX,1.77,consZ-.203,.93,.91,.025,mats.aluminum);
textPanel('Motion control graphic',consX,1.77,consZ-.185,.84,.81,screenTexture('motion'));
for(let i=0;i<3;i++) {
  cyl('Console rotary selector',consX-.23+i*.23,1.28,consZ+.22,.067,.067,.08,mats.steelDark,scene,20);
  hoop('Selector bright index ring',consX-.23+i*.23,1.326,consZ+.22,.073,.009,i===1?mats.amberLamp:mats.cyanLamp,scene,[Math.PI/2,0,0],24);
  orb('Selector detent',consX-.23+i*.23,1.37,consZ+.22,.018,.022,.018,mats.white);
}
for(const x of [consX-.32,consX+.32]) {
  box('Console guarded rocker bezel',x,1.285,consZ+.39,.13,.055,.17,mats.steelDark);
  box('Console illuminated rocker',x,1.323,consZ+.39,.055,.025,.085,x<consX?mats.cyanLamp:mats.redLamp);
}
// Four robust cable glands route into a shallow, visible floor channel toward the gantry.
for(let i=0;i<3;i++) {
  const z=consZ-.22+i*.18;
  cyl('Console cable gland',consX-.36,.59,z,.055,.055,.055,mats.aluminum);
  cable('Console routed service cable',[[consX-.36,.58,z],[consX-.8,.18,z-.05],[10.35,.08,z-.1],[9.72,.08,z-.05],[9.35,.45,z]],.025,i===1?mats.teal:mats.rubber);
}
box('Motion bay instrument placard',8.88,3.92,-10.47,5.55,.99,.10,mats.panelDark);
textPanel('Motion bay label',8.88,3.92,-10.407,5.36,.80,placardTexture('MOTION / BAY 02','KINEMATICS · POSITION / FORCE TRACE','#edbd69'));

// Recessed wall service cupboards, pipe runs and human-scale details.
for(const [x,label] of [[-2.7,'Calibration kit cabinet'],[2.7,'Actuation service cabinet']]) {
  box(label,x,1.38,-10.28,1.56,2.48,.42,mats.wallShade,scene,{cast:true});
  box('Cabinet painted door',x,1.40,-10.04,1.39,2.23,.045,x<0?mats.sage:mats.panel);
  box('Cabinet top service cap',x,2.62,-10.01,1.55,.08,.10,mats.aluminum);
  box('Cabinet pull handle',x+.5,1.43,-9.99,.045,.34,.06,mats.steel);
  for(let i=0;i<4;i++) box('Cabinet louvre',x-.30+i*.19,.64,-9.99,.11,.028,.025,mats.steelDark);
  orb('Cabinet lock',x-.55,1.50,-9.98,.025,.025,.022,mats.amberLamp);
}
// Main title plaque and return wayfinding at the entrance.
box('Hall identity sign backing',0,4.38,-10.43,5.08,1.32,.12,mats.panelDark);
textPanel('Hall identity / main title',0,4.38,-10.353,4.9,1.13,placardTexture('ASTERION ARRAY','MULTI-AXIS OPTICAL CHARACTERIZATION','#95e5d0'));
const exitTexture=placardTexture('RETURN / ENTRY','CLEAR ROUTE  ·  KEEP THE CENTER AISLE OPEN','#edbd69');
box('Return sign case',0,4.06,9.91,4.46,.88,.12,mats.panelDark);
textPanel('Return / exit label',0,4.06,9.835,4.24,.68,exitTexture,scene,Math.PI);
// Door jambs, accessible threshold and pair of compact card readers.
for(const x of [-2.45,2.45]) {
  box('Entrance alloy jamb',x,2.36,10.08,.12,4.65,.16,mats.aluminum);
  box('Entrance jamb locator light',x,2.35,9.98,.045,1.0,.055,mats.cyanLamp);
}
box('Entry threshold tactile bar',0,.035,10.02,4.72,.035,.10,mats.aluminum);
for(const x of [-2.16,2.16]) {
  box('Accessible entry reader',x,1.18,9.87,.22,.58,.12,mats.panelDark);
  box('Reader screen',x,1.31,9.796,.13,.18,.018,mats.cyanLamp);
  box('Reader lower push pad',x,1.04,9.796,.12,.07,.018,mats.amberPaint);
}

// Short, tidy conduit drops and one visible bend at each bench keep wiring purposeful.
cable('Vision trunk / cable drop',[[-12.15,1.03,-6.35],[-12.5,.48,-6.85],[-12.75,.13,-7.25],[-12.75,.12,-8.6],[-12.85,.34,-9.0],[-12.85,4.6,-9.0]],.043,mats.rubber);
cable('Vision data / teal sheath',[[-10.58,2.24,-5.55],[-10.58,1.82,-5.34],[-10.36,1.45,-5.2],[-9.5,1.35,-5.2],[-9.1,.95,-5.3]],.022,mats.teal);
cable('Vision display / power',[[-6.52,1.83,-6.2],[-6.52,1.50,-5.72],[-6.78,.8,-5.3],[-6.78,.12,-5.2],[-6.78,.10,-8.2]],.028,mats.rubber);
// Junction boxes with practical labels at the back of each open bay.
box('Vision power junction',-12.7,4.39,-8.72,.40,.49,.25,mats.steelDark);
box('Vision junction ID',-12.7,4.39,-8.578,.26,.20,.018,mats.amberPaint);
box('Motion power junction',12.78,4.39,-8.72,.40,.49,.25,mats.steelDark);
box('Motion junction status',12.78,4.39,-8.578,.25,.16,.018,mats.cyanLamp);

// The architecture and exhibits do not move; merge repeated solid parts before rendering.
batchStaticMeshes();

// Spatial collisions are deliberately only at walls and solid equipment; alcove floors stay open.
const blockers = [
  {x0:-14.05,x1:-13.56,z0:-11.05,z1:10.5}, {x0:13.56,x1:14.05,z0:-11.05,z1:10.5},
  {x0:-13.9,x1:13.9,z0:-11.08,z1:-10.56},
  {x0:-14.0,x1:-2.52,z0:10.10,z1:10.57}, {x0:2.52,x1:14.0,z0:10.10,z1:10.57},
  {x0:-5.01,x1:-4.63,z0:-8.85,z1:-1.35}, {x0:4.63,x1:5.01,z0:-8.85,z1:-1.35},
  {x0:-12.35,x1:-5.75,z0:-6.70,z1:-5.20},
  {x0:6.02,x1:10.70,z0:-5.30,z1:-2.02},
  {x0:11.13,x1:12.13,z0:-5.58,z1:-4.56}
];
const machineCenter = v(0,0,0), machineRadius=2.03;
const start = { p:v(0,1.67,8.52), yaw:0, pitch:-.025 };
let yaw=start.yaw, pitch=start.pitch;
camera.position.copy(start.p); camera.rotation.order='YXZ';
const held = new Set();
let active=false, last=performance.now();
let fallbackPointer=null;

function blocked(x,z) {
  const r=.34;
  if(x < -13.35+r || x > 13.35-r || z < -10.3+r || z > 10.22) return true;
  if(z > 9.72 && Math.abs(x) > 2.24-r) return true;
  for(const b of blockers) {
    const qx=Math.max(b.x0,Math.min(x,b.x1)), qz=Math.max(b.z0,Math.min(z,b.z1));
    if((x-qx)*(x-qx)+(z-qz)*(z-qz) < r*r) return true;
  }
  const dx=x-machineCenter.x,dz=z-machineCenter.z;
  return dx*dx+dz*dz < machineRadius*machineRadius;
}
function resetView() {
  camera.position.copy(start.p); yaw=start.yaw; pitch=start.pitch;
  camera.rotation.set(pitch,yaw,0,'YXZ');
  held.clear();
}
function showEntry() { active=false; $('#entry').classList.remove('hidden'); }
function enterLab() {
  $('#entry').classList.add('hidden');
  renderer.domElement.requestPointerLock?.();
  active=true;
  renderer.domElement.focus?.();
}
$('#enter').addEventListener('click', enterLab);
$('#reset').addEventListener('click', () => { resetView(); if(document.pointerLockElement) renderer.domElement.requestPointerLock?.(); });
document.addEventListener('pointerlockchange', () => {
  if(document.pointerLockElement === renderer.domElement) { active=true; fallbackPointer=null; $('#entry').classList.add('hidden'); }
  else if(active) showEntry();
});
document.addEventListener('pointerlockerror', () => { active=true; fallbackPointer=null; $('#status').textContent='Mouse capture unavailable: move the mouse over the scene to look; use W A S D to walk.'; });
document.addEventListener('mousemove', e => {
  if(document.pointerLockElement !== renderer.domElement && !active) return;
  let dx=e.movementX, dy=e.movementY;
  if(document.pointerLockElement !== renderer.domElement) {
    if(fallbackPointer) { dx=e.clientX-fallbackPointer.x; dy=e.clientY-fallbackPointer.y; }
    fallbackPointer={x:e.clientX,y:e.clientY};
  }
  yaw -= dx * .00215;
  pitch -= dy * .0019;
  pitch = THREE.MathUtils.clamp(pitch,-1.35,1.35);
  camera.rotation.set(pitch,yaw,0,'YXZ');
});
document.addEventListener('keydown', e => {
  const k=e.key.toLowerCase();
  if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(k)) e.preventDefault();
  if(k==='r') resetView();
  held.add(k);
});
document.addEventListener('keyup', e => held.delete(e.key.toLowerCase()));
window.addEventListener('blur',()=>held.clear());

function move(dt) {
  if(!active) return;
  const forward=(held.has('w')||held.has('arrowup')?1:0)-(held.has('s')||held.has('arrowdown')?1:0);
  const side=(held.has('d')||held.has('arrowright')?1:0)-(held.has('a')||held.has('arrowleft')?1:0);
  if(!forward&&!side) return;
  const len=Math.hypot(forward,side)||1, pace=held.has('shift')?5.1:3.35;
  const dx=((-Math.sin(yaw)*forward + Math.cos(yaw)*side)/len)*pace*dt;
  const dz=((-Math.cos(yaw)*forward - Math.sin(yaw)*side)/len)*pace*dt;
  const p=camera.position;
  if(!blocked(p.x+dx,p.z)) p.x+=dx;
  if(!blocked(p.x,p.z+dz)) p.z+=dz;
}
function animate(now) {
  requestAnimationFrame(animate);
  const dt=Math.min(.05,(now-last)/1000); last=now;
  move(dt);
  renderer.render(scene,camera);
}
window.addEventListener('resize',()=>{
  camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.65)); renderer.setSize(innerWidth,innerHeight);
});
resetView();
requestAnimationFrame(animate);
