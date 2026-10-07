import * as THREE from 'three';

// Bay 03 is assembled from shared primitives and instanced fasteners so the
// first-person view stays light while the close-up surfaces still feel built.
const canvas = document.querySelector('#scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x11191c);
scene.fog = new THREE.Fog(0x11191c, 24, 48);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.06, 120);
camera.rotation.order = 'YXZ';
scene.add(camera);

const world = new THREE.Group();
scene.add(world);
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const unitCylinder = new THREE.CylinderGeometry(1, 1, 1, 16, 1, false);
const unitCylinder8 = new THREE.CylinderGeometry(1, 1, 1, 8, 1, false);
const sphereGeometry = new THREE.SphereGeometry(1, 12, 10);
const up = new THREE.Vector3(0, 1, 0);

let seed = 47305;
function random() {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
}

function grainTexture(color, scratches = 18) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 7500; i++) {
    const bright = random() > 0.48;
    ctx.fillStyle = bright ? `rgba(230,240,233,${random() * 0.095})` : `rgba(5,12,13,${random() * 0.11})`;
    const w = random() * 2.2 + .35;
    ctx.fillRect(random() * 256, random() * 256, w, random() * 1.4 + .4);
  }
  for (let i = 0; i < scratches; i++) {
    const x = random() * 256, y = random() * 256;
    ctx.strokeStyle = random() > .5 ? 'rgba(230,235,222,.18)' : 'rgba(5,10,10,.25)';
    ctx.lineWidth = random() * 1.3 + .35;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + random() * 34 + 4, y + (random() - .5) * 3);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
  return texture;
}

const paintMap = grainTexture('#47534f', 34);
const deckMap = grainTexture('#303c3d', 28);
const floorMap = grainTexture('#424a48', 44);
const wallMap = grainTexture('#64716b', 22);
paintMap.repeat.set(3, 3);
deckMap.repeat.set(5, 5);
floorMap.repeat.set(9, 8);
wallMap.repeat.set(4, 4);
const paint = new THREE.MeshStandardMaterial({ map: paintMap, color: 0xb5c3ba, metalness: .52, roughness: .62 });
const paintDark = new THREE.MeshStandardMaterial({ map: paintMap, color: 0x58635f, metalness: .58, roughness: .7 });
const paintCream = new THREE.MeshStandardMaterial({ map: wallMap, color: 0xd8d5c8, metalness: .3, roughness: .71 });
const paintBlue = new THREE.MeshStandardMaterial({ map: paintMap, color: 0x718d91, metalness: .52, roughness: .57 });
const deckMat = new THREE.MeshStandardMaterial({ map: deckMap, color: 0xb0bcb5, metalness: .57, roughness: .75 });
const floorMat = new THREE.MeshStandardMaterial({ map: floorMap, color: 0xb4b8ae, metalness: .48, roughness: .83 });
const charcoal = new THREE.MeshStandardMaterial({ color: 0x192224, metalness: .68, roughness: .63 });
const deepMetal = new THREE.MeshStandardMaterial({ color: 0x283336, metalness: .83, roughness: .39 });
const brushed = new THREE.MeshStandardMaterial({ color: 0x9eaaa7, metalness: .94, roughness: .27 });
const steel = new THREE.MeshStandardMaterial({ color: 0x596666, metalness: .92, roughness: .32 });
const rubber = new THREE.MeshStandardMaterial({ color: 0x171c1d, metalness: .06, roughness: .84 });
const rubberBlue = new THREE.MeshStandardMaterial({ color: 0x29484a, metalness: .16, roughness: .77 });
const safetyYellow = new THREE.MeshStandardMaterial({ color: 0xdca93e, metalness: .48, roughness: .55 });
const safetyBlack = new THREE.MeshStandardMaterial({ color: 0x22272a, metalness: .39, roughness: .72 });
const copper = new THREE.MeshStandardMaterial({ color: 0xb66b3a, metalness: .83, roughness: .33 });
const glass = new THREE.MeshStandardMaterial({ color: 0x80b9bb, metalness: .28, roughness: .2, transparent: true, opacity: .25, side: THREE.DoubleSide, depthWrite: false });
const glowMint = new THREE.MeshStandardMaterial({ color: 0x63bd9b, emissive: 0x2a986a, emissiveIntensity: 2.3, metalness: .14, roughness: .28 });
const glowAmber = new THREE.MeshStandardMaterial({ color: 0xe4af4f, emissive: 0xa05b18, emissiveIntensity: 1.7, metalness: .12, roughness: .32 });
const glowRed = new THREE.MeshStandardMaterial({ color: 0xe66e54, emissive: 0xb2321e, emissiveIntensity: 2.1, metalness: .15, roughness: .3 });

function box(x, y, z, sx, sy, sz, mat, parent = world, cast = false, receive = false) {
  const mesh = new THREE.Mesh(boxGeometry, mat);
  mesh.position.set(x, y, z);
  mesh.scale.set(sx, sy, sz);
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  parent.add(mesh);
  return mesh;
}
function cylinder(x, y, z, radius, height, mat, segments = 16, parent = world, cast = false) {
  const mesh = new THREE.Mesh(segments === 8 ? unitCylinder8 : unitCylinder, mat);
  mesh.position.set(x, y, z);
  mesh.scale.set(radius, height, radius);
  mesh.castShadow = cast;
  parent.add(mesh);
  return mesh;
}
function sphere(x, y, z, radius, mat, parent = world, cast = false, geometry = sphereGeometry) {
  const mesh = new THREE.Mesh(geometry, mat);
  mesh.position.set(x, y, z);
  mesh.scale.setScalar(radius);
  mesh.castShadow = cast;
  parent.add(mesh);
  return mesh;
}
function pipe(a, b, radius, mat, parent = world, radial = 8) {
  const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b);
  const delta = end.clone().sub(start);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, delta.length(), radial, 1), mat);
  mesh.position.copy(start.add(end).multiplyScalar(.5));
  mesh.quaternion.setFromUnitVectors(up, delta.normalize());
  parent.add(mesh);
  return mesh;
}
function tube(points, radius, mat, parent = world, segments = 48) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  const geometry = new THREE.TubeGeometry(curve, segments, radius, 8, false);
  const mesh = new THREE.Mesh(geometry, mat);
  parent.add(mesh);
  return mesh;
}
function beamBetween(a, b, thickness, mat, parent = world) {
  const v0 = new THREE.Vector3(...a), v1 = new THREE.Vector3(...b);
  const diff = v1.clone().sub(v0);
  const mesh = new THREE.Mesh(boxGeometry, mat);
  mesh.position.copy(v0.add(v1).multiplyScalar(.5));
  mesh.scale.set(thickness, diff.length(), thickness);
  mesh.quaternion.setFromUnitVectors(up, diff.normalize());
  parent.add(mesh);
  return mesh;
}
const instancedBoxes = new Map();
const dummy = new THREE.Object3D();
function boxInstance(x, y, z, sx, sy, sz, mat, rotationY = 0) {
  if (!instancedBoxes.has(mat)) instancedBoxes.set(mat, []);
  instancedBoxes.get(mat).push([x, y, z, sx, sy, sz, rotationY]);
}
function flushInstances() {
  for (const [mat, items] of instancedBoxes) {
    const mesh = new THREE.InstancedMesh(boxGeometry, mat, items.length);
    items.forEach((v, i) => {
      dummy.position.set(v[0], v[1], v[2]);
      dummy.rotation.set(0, v[6], 0);
      dummy.scale.set(v[3], v[4], v[5]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.receiveShadow = true;
    world.add(mesh);
  }
  instancedBoxes.clear();
}

const rivetGeometry = new THREE.CylinderGeometry(1, 1, 1, 8, 1, false);
const rivetMaterial = new THREE.MeshStandardMaterial({ color: 0xa6b1ac, metalness: .93, roughness: .31 });
const rivets = new THREE.InstancedMesh(rivetGeometry, rivetMaterial, 1700);
rivets.count = 0;
function rivet(x, y, z, orientation = 'up', size = .033) {
  if (rivets.count >= rivets.instanceMatrix.count) return;
  dummy.position.set(x, y, z);
  dummy.quaternion.setFromEuler(orientation === 'front' ? new THREE.Euler(Math.PI / 2, 0, 0) : orientation === 'left' ? new THREE.Euler(0, 0, -Math.PI / 2) : new THREE.Euler(0, 0, 0));
  dummy.scale.set(size, .014, size);
  dummy.updateMatrix();
  rivets.setMatrixAt(rivets.count++, dummy.matrix);
}

function labelTexture(title, sub = '', accent = '#d5aa62') {
  const c = document.createElement('canvas'); c.width = 512; c.height = 160;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#172326'; ctx.fillRect(0, 0, 512, 160);
  ctx.strokeStyle = '#667772'; ctx.lineWidth = 4; ctx.strokeRect(7, 7, 498, 146);
  ctx.fillStyle = accent; ctx.fillRect(18, 19, 8, 122);
  ctx.fillStyle = '#e1e7de'; ctx.font = '600 33px monospace'; ctx.fillText(title, 44, 69);
  ctx.fillStyle = '#8ea09a'; ctx.font = '20px monospace'; ctx.fillText(sub, 45, 113);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
  return tex;
}
function wallLabel(x, y, z, width, title, sub, face = 'front', accent) {
  const tex = labelTexture(title, sub, accent);
  const mat = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false });
  const plate = box(x, y, z, width + .08, .36, .045, charcoal);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(width, .29), mat);
  sign.position.set(x, y, z + .027);
  if (face === 'left') { sign.rotation.y = -Math.PI / 2; sign.position.set(x - .027, y, z); plate.rotation.y = Math.PI / 2; }
  else if (face === 'right') { sign.rotation.y = Math.PI / 2; sign.position.set(x + .027, y, z); plate.rotation.y = -Math.PI / 2; }
  else if (face === 'back') { sign.rotation.y = Math.PI; sign.position.z = z - .027; plate.rotation.y = Math.PI; }
  world.add(sign);
  return plate;
}

// General illumination: broad, neutral work light; localized color stays at task points.
scene.add(new THREE.HemisphereLight(0xd3e0d9, 0x30393b, 1.55));
const keyLight = new THREE.DirectionalLight(0xe4ebe5, 2.25);
keyLight.position.set(-3.5, 10.5, 7.5);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
keyLight.shadow.camera.left = -13; keyLight.shadow.camera.right = 13;
keyLight.shadow.camera.top = 12; keyLight.shadow.camera.bottom = -12;
keyLight.shadow.camera.near = .5; keyLight.shadow.camera.far = 28;
keyLight.shadow.bias = -.00055;
scene.add(keyLight);
const fillLight = new THREE.DirectionalLight(0x91b5b8, .7);
fillLight.position.set(8, 5, -7);
scene.add(fillLight);

// Floor cassette and construction seams.
box(0, -.23, 0, 20, .46, 16, floorMat, world, false, true);
for (let x = -9; x <= 9; x += 2) {
  boxInstance(x, .006, 0, .026, .012, 15.8, deepMetal);
  for (let z of [-7.4, -5.4, -3.4, -1.4, .6, 2.6, 4.6, 6.6]) {
    rivet(x + .12, .014, z, 'up', .024);
    rivet(x - .12, .014, z, 'up', .024);
  }
}
for (let z = -7; z <= 7; z += 2) boxInstance(0, .007, z, 19.8, .012, .026, deepMetal);
// Service covers: inset rims, recessed faces and flush fasteners.
for (let x = -8; x <= 8; x += 4) for (let z of [-6, -2, 2, 6]) {
  box(x, .015, z, 1.48, .035, 1.2, steel);
  box(x, .037, z, 1.35, .018, 1.07, paintDark);
  box(x, .049, z, .94, .009, .028, deepMetal);
  box(x, .049, z, .028, .009, .7, deepMetal);
  for (const dx of [-.61, .61]) for (const dz of [-.47, .47]) rivet(x + dx, .049, z + dz, 'up', .027);
}
// Recessed floor cable runs lead from the central service pad to wall conduits.
for (const side of [-1, 1]) {
  box(side * 5.2, .02, 0, .72, .035, .55, charcoal);
  for (let i = 0; i < 5; i++) box(side * (5.0 + i * .82), .055, 0, .43, .04, .12, i % 2 ? copper : brushed);
  for (let lane = 0; lane < 3; lane++) {
    const x = side * (5.2 + lane * .14);
    tube([[x, .08, 0], [x, .09, -1.1], [x, .12, -2.2], [x, .16, -3.8], [side * 8.9, .25, -4.7]], .035, lane === 1 ? rubberBlue : rubber);
  }
}

// Outer pressure shell: full-height sidewalls, segmented bulkhead, open entry.
box(-9.82, 3.2, 0, .38, 6.4, 16, paintCream, world, false, true);
box(9.82, 3.2, 0, .38, 6.4, 16, paintCream, world, false, true);
// The aft wall is framed around a sealed panoramic observation pane.
box(-7.45, 3.2, -7.82, 5.1, 6.4, .38, paintCream, world, false, true);
box(7.45, 3.2, -7.82, 5.1, 6.4, .38, paintCream, world, false, true);
box(0, 1.32, -7.82, 4.8, 2.64, .38, paintCream, world, false, true);
box(0, 6.02, -7.82, 4.8, .76, .38, paintCream, world, false, true);
// Forward entry stays open; low kick plates and a deep overhead lintel define the threshold.
box(-6.2, 3.2, 7.82, 7.2, 6.4, .38, paintCream, world, false, true);
box(6.2, 3.2, 7.82, 7.2, 6.4, .38, paintCream, world, false, true);
box(0, 5.38, 7.82, 5.2, 2.04, .38, paintCream, world, false, true);
box(0, .095, 7.62, 5.2, .19, .78, steel);
box(-2.7, .55, 7.58, .22, 1.1, .3, safetyYellow);
box(2.7, .55, 7.58, .22, 1.1, .3, safetyYellow);
// Structural ribs, painted cover plates and exposed inner frame.
for (const side of [-1, 1]) {
  const x = side * 9.55;
  for (let z = -7.2; z <= 7.21; z += 2.4) {
    box(x, 3.05, z, .18, 6.05, .32, steel, world, true);
    box(side * 9.40, 3.0, z, .15, 5.7, .72, paintBlue, world, true);
    box(side * 9.30, 3.0, z, .03, 4.8, .38, paintDark);
    for (let y of [.42, 1.15, 4.75, 5.55]) rivet(side * 9.26, y, z - .22, side < 0 ? 'left' : 'left', .037);
  }
  box(side * 9.46, .4, 0, .28, .45, 15.8, safetyBlack);
  for (let z = -7.2; z < 7.2; z += .5) {
    if (Math.floor((z + 7.2) / .5) % 2 === 0) boxInstance(side * 9.30, .4, z, .04, .4, .16, safetyYellow);
  }
}
for (let x = -8.6; x <= 8.61; x += 2.15) {
  // Wide overhead hat beams and visible truss diagonals.
  box(x, 6.05, 0, .22, .4, 15.2, steel, world, true);
  box(x, 6.28, 0, .48, .08, 15.2, deepMetal);
  for (const z of [-7.45, 7.45]) {
    beamBetween([x, 5.72, z], [x + .8, 6.4, z], .09, steel);
  }
}
box(0, 6.43, 0, 19.5, .16, 15.5, charcoal, world, false, true);
// Ceiling service trays follow both long walls, broken by lamp housings.
for (const side of [-1, 1]) {
  box(side * 8.2, 5.68, 0, .62, .12, 15.2, deepMetal);
  for (let z = -6.8; z <= 6.8; z += 1.2) {
    box(side * 8.2, 5.77, z, .47, .05, .055, brushed);
    for (let lane = 0; lane < 3; lane++) {
      boxInstance(side * (7.98 + lane * .18), 5.55, z, .055, .12, 1.0, lane === 1 ? safetyYellow : steel);
    }
  }
}
// Long white work luminaires with milky covers.
for (const x of [-5.9, -1.95, 2.0, 5.95]) {
  box(x, 6.29, .4, .32, .13, 6.7, deepMetal);
  box(x, 6.205, .4, .2, .04, 5.8, new THREE.MeshStandardMaterial({ color: 0xdce7df, emissive: 0xaebfad, emissiveIntensity: .65, roughness: .4 }));
  const l = new THREE.PointLight(0xc9d8ce, 26, 11, 2.0);
  l.position.set(x, 5.92, .2); scene.add(l);
}

// Wall panels: inset faces, plate seams, seam clamps and labeled service doors.
for (let z = -6.9; z <= 6.91; z += 1.7) for (const side of [-1, 1]) {
  const x = side * 9.58;
  box(side * 9.59, 2.65, z, .055, 1.18, 1.47, side === 1 && z > -5 && z < 4 ? paintBlue : paintDark);
  box(side * 9.55, 2.68, z, .025, .035, 1.31, deepMetal);
  box(side * 9.55, 2.08, z, .025, .035, 1.31, deepMetal);
  for (const yy of [2.18, 3.08]) for (const dz of [-.57, .57]) rivet(side * 9.53, yy, z + dz, 'left', .03);
}
// Access doors and small inspection covers on the aft bulkhead.
for (const x of [-8.9, -7.1, 6.6, 8.35]) {
  box(x, 2.35, -7.57, 1.25, 2.0, .08, paintBlue);
  box(x, 2.35, -7.50, 1.07, 1.72, .045, paintDark);
  box(x, 2.36, -7.465, .06, 1.08, .025, brushed);
  for (const dx of [-.49, .49]) for (const yy of [1.58, 3.12]) rivet(x + dx, yy, -7.44, 'front', .034);
}
wallLabel(-7.75, 4.2, -7.55, 2.1, 'COOLANT LOOP', 'VALVE BANK / P-04', 'front', '#72b5a4');
wallLabel(7.45, 4.15, -7.54, 2.05, 'PRESSURE SEAL', 'INSPECT / 12 HR', 'front', '#dfa957');

// Sealed window; the starfield and near planet sit beyond its laminated glass.
box(0, 4.64, -7.51, 5.04, 2.35, .12, deepMetal, world, true);
box(0, 4.64, -7.43, 4.72, 2.04, .05, new THREE.MeshBasicMaterial({ color: 0x091a2c }));
const windowMesh = new THREE.Mesh(new THREE.PlaneGeometry(4.62, 1.95), glass);
windowMesh.position.set(0, 4.64, -7.395); windowMesh.renderOrder = 2; world.add(windowMesh);
for (let x of [-2.48, 2.48]) {
  box(x, 4.64, -7.36, .13, 2.45, .15, brushed);
  for (let y of [3.55, 5.73]) rivet(x, y, -7.26, 'front', .035);
}
for (let y of [3.48, 5.80]) box(0, y, -7.36, 5.05, .13, .15, brushed);
const starGeo = new THREE.SphereGeometry(1, 5, 4);
const starMat = new THREE.MeshBasicMaterial({ color: 0xd6e6e8, toneMapped: false });
const stars = new THREE.InstancedMesh(starGeo, starMat, 150);
for (let i = 0; i < 150; i++) {
  dummy.position.set((random() - .5) * 26, 2.1 + random() * 5.2, -16 - random() * 12);
  const r = .012 + random() * .024; dummy.scale.setScalar(r); dummy.updateMatrix(); stars.setMatrixAt(i, dummy.matrix);
}
scene.add(stars);
const planetMat = new THREE.MeshStandardMaterial({ color: 0x385b73, roughness: .96, metalness: .04, emissive: 0x10273a, emissiveIntensity: .55 });
const planet = new THREE.Mesh(new THREE.SphereGeometry(2.15, 30, 24), planetMat);
planet.position.set(2.3, 4.1, -22.5); scene.add(planet);
const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(2.23, 30, 24), new THREE.MeshBasicMaterial({ color: 0x5e9db2, transparent: true, opacity: .13, side: THREE.BackSide, depthWrite: false }));
atmosphere.position.copy(planet.position); scene.add(atmosphere);
const planetRing = new THREE.Mesh(new THREE.TorusGeometry(2.65, .045, 6, 64), new THREE.MeshBasicMaterial({ color: 0x91a4a0, transparent: true, opacity: .32 }));
planetRing.position.copy(planet.position); planetRing.rotation.set(.8, .25, -.25); scene.add(planetRing);

// Main gyrocore service cell, built in concentric levels around a walkable perimeter.
const machine = new THREE.Group(); machine.position.set(0, 0, 0); world.add(machine);
function mbox(x,y,z,sx,sy,sz,mat,cast=true){return box(x,y,z,sx,sy,sz,mat,machine,cast);}
function mcyl(x,y,z,r,h,mat,seg=16){return cylinder(x,y,z,r,h,mat,seg,machine,true);}
function mtorus(r,tubeRadius,y,mat,radial=10){
  const mesh=new THREE.Mesh(new THREE.TorusGeometry(r,tubeRadius,radial,72),mat);
  mesh.rotation.x=Math.PI/2;mesh.position.y=y;mesh.castShadow=true;machine.add(mesh);return mesh;
}
mcyl(0,.16,0,1.9,.32,deepMetal,16);
mcyl(0,.36,0,1.72,.16,safetyBlack,12);
mcyl(0,.48,0,1.61,.12,safetyYellow,16);
mcyl(0,.57,0,1.5,.15,steel,16);
mtorus(1.48,.047,.66,brushed);
mcyl(0,.98,0,1.22,.68,paintBlue,12);
mcyl(0,1.38,0,1.29,.16,deepMetal,16);
mtorus(1.32,.07,1.42,copper);
mcyl(0,1.82,0,1.12,.72,deepMetal,16);
mcyl(0,2.19,0,1.22,.14,steel,16);
mtorus(1.2,.05,2.28,safetyYellow);
mcyl(0,2.31,0,1.1,.12,charcoal,12);
// Crown inspection glass, internal rotor hub and protective guards.
mcyl(0,2.42,0,.84,.1,brushed,12);
mcyl(0,2.51,0,.68,.12,glass,16);
mcyl(0,2.59,0,.39,.16,paintBlue,12);
mcyl(0,2.69,0,.17,.05,glowMint,16);
const rotorRing = new THREE.Mesh(new THREE.TorusGeometry(.88,.055,8,64),copper);
rotorRing.rotation.x=Math.PI/2;rotorRing.position.y=2.58;machine.add(rotorRing);
// Six piston columns, machined couplings, clamp shoes and top-side tie bars.
const pistonAngles = [];
for(let i=0;i<6;i++){
  const a=i*Math.PI/3+.15, x=Math.cos(a)*1.35,z=Math.sin(a)*1.35;
  pistonAngles.push([a,x,z]);
  mcyl(x,.49,z,.16,.34,deepMetal,10);
  mcyl(x,.72,z,.105,.68,brushed,12);
  mcyl(x,1.02,z,.15,.09,copper,12);
  mcyl(x,1.43,z,.11,.81,steel,10);
  mcyl(x,1.82,z,.145,.11,safetyYellow,12);
  mcyl(x,2.12,z,.095,.52,brushed,12);
  mcyl(x,2.39,z,.16,.15,deepMetal,10);
  mbox(x,1.32,z,.28,.17,.28,paintBlue);
  for(const yy of [.88,1.66,2.29]) mcyl(x,yy,z,.13,.055,copper,12);
  // Captive shoulder bolts on the visible front faces.
  const frontZ=z>0?z+.164:z-.164;
  rivet(x,.49,frontZ,'front',.032); rivet(x,1.35,frontZ,'front',.032); rivet(x,2.18,frontZ,'front',.032);
}
// Radial cage rails create a guarded but open machine; lower skirt uses service hatches.
for(let i=0;i<12;i++){
  const a=i*Math.PI/6, x=Math.cos(a)*1.54,z=Math.sin(a)*1.54;
  const post=mcyl(x,1.31,z,.038,1.82,brushed,8);
  const base=mcyl(x,.42,z,.1,.11,safetyYellow,10);
  for(const yy of [.78,1.98]){
    const b=mcyl(x,yy,z,.066,.07,copper,10);
  }
}
for(let i=0;i<6;i++){
  const a=i*Math.PI/3, x=Math.cos(a)*1.5,z=Math.sin(a)*1.5;
  mbox(x,.83,z,.43,.48,.15,paintDark).rotation.y=a+Math.PI/2;
  mbox(x,1.78,z,.34,.28,.13,paintBlue).rotation.y=a+Math.PI/2;
}
// Eight accessible hatch latches and cooling vents around the lower housing.
for(let i=0;i<8;i++){
  const a=i*Math.PI/4, x=Math.cos(a)*1.235,z=Math.sin(a)*1.235;
  const cover=mbox(x,1.0,z,.36,.39,.035,i%2?paintDark:paintBlue); cover.rotation.y=a+Math.PI/2;
  for(let v=-1;v<=1;v++){
    const vx=x+Math.cos(a)*.038, vz=z+Math.sin(a)*.038;
    const vent=mbox(vx,1.0+v*.085,vz,.22,.024,.025,deepMetal);vent.rotation.y=a+Math.PI/2;
  }
}
// Six radial top braces meet the bearing cap; safety loops are staggered in height.
for(const [a,x,z] of pistonAngles){
  beamBetween([Math.cos(a)*.61,2.47,Math.sin(a)*.61],[x,2.25,z],.065,brushed,machine);
  mbox(Math.cos(a)*.76,2.45,Math.sin(a)*.76,.17,.08,.17,safetyYellow);
}
// Rigid fluid lines loop around the core with machined elbow blocks and unions.
for(const y of [.84,1.73]){
  const pts=[];for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;pts.push([1.08*Math.cos(a),y+.025*Math.sin(a*6),1.08*Math.sin(a)]);}
  const crv=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p)),true);
  machine.add(new THREE.Mesh(new THREE.TubeGeometry(crv,96,.038,8,true),y>.9?copper:brushed));
}
// Rubber supply hose from floor manifold, with two steel strain-relief bands.
tube([[1.03,.26,1.35],[1.55,.28,1.68],[1.84,.48,1.92],[1.88,.94,2.02],[1.78,1.32,1.93],[1.54,1.46,1.69],[1.12,1.43,1.42]],.082,rubber);
tube([[-1.0,.27,1.30],[-1.52,.35,1.63],[-1.72,.72,1.9],[-1.73,1.16,1.95],[-1.55,1.49,1.75],[-1.12,1.57,1.43]],.067,rubberBlue);
for(const [x,y,z] of [[1.82,.49,1.95],[1.76,1.32,1.91],[-1.68,.68,1.86],[-1.55,1.48,1.72]]){
  const c=mcyl(x,y,z,.105,.09,brushed,12); c.rotation.x=Math.PI/2;
}
// Fine runout cables gather at the service side and return to floor sockets.
for(let i=0;i<4;i++){
  const sx=-.66+i*.42;
  tube([[sx,2.05,.75],[sx+.15,1.86,1.08],[sx+.34,1.4,1.44],[sx+.42,.55,1.82],[sx+.7,.12,2.35],[sx+1.4,.08,3.0]],.022,i%2?rubberBlue:rubber);
}
// Small task lamps on the equipment crown.
for(let i=0;i<3;i++){
  const a=i*2.094, x=Math.cos(a)*1.18,z=Math.sin(a)*1.18;
  mcyl(x,2.62,z,.07,.18,deepMetal,8);
  sphere(x,2.73,z,.055,i===0?glowRed:i===1?glowMint:glowAmber,machine);
}
wallLabel(0,1.24,1.27,1.13,'GYROCORE 04','PHASE LOCK / SERVICE','front','#8bd2a8');
// Glass guard sections around the footing; openings remain wide enough to circle it.
for(let i=0;i<4;i++){
  const angle=i*Math.PI/2+.35, cx=2.2*Math.cos(angle), cz=2.2*Math.sin(angle);
  const tangent=angle+Math.PI/2;
  const pane=box(cx,.78,cz,1.12,1.05,.045,glass);pane.rotation.y=tangent;
  for(const end of [-.52,.52]){
    const x=cx+Math.cos(tangent)*end,z=cz+Math.sin(tangent)*end;
    cylinder(x,.71,z,.043,1.37,brushed,10);
    cylinder(x,.09,z,.09,.14,safetyYellow,10);
  }
  const top=box(cx,1.48,cz,1.18,.055,.07,brushed);top.rotation.y=tangent;
}
// Radial hazard blocks and segmented calibration marks on the floor.
for(let i=0;i<32;i++){
  const a=i*Math.PI*2/32, r=2.62;
  box(r*Math.cos(a),.014,r*Math.sin(a),i%2===0?.27:.17,.018,.085,i%2===0?safetyYellow:safetyBlack,world,false);
}
for(let i=0;i<24;i++){
  const a=i*Math.PI*2/24, r=2.93;
  box(r*Math.cos(a),.016,r*Math.sin(a),.22,.014,.018,i%3===0?glowMint:steel,world,false).rotation.y=-a;
}
// Bearings and bolt heads around the machine base are instanced fasteners.
for(let i=0;i<24;i++){
  const a=i*Math.PI*2/24;
  rivet(1.82*Math.cos(a),.337,1.82*Math.sin(a),'up',.044);
}

// Open service alcove at starboard. Partition ends frame a generous 3.6 m passage.
box(6.06,2.1,-4.78,.22,4.2,4.35,paintCream,world,true,true);
box(6.06,2.1,4.78,.22,4.2,4.35,paintCream,world,true,true);
box(6.06,4.25,0,.24,.32,5.3,steel,world,true);
for(const z of [-2.45,2.45]){
  box(5.91,2.1,z,.34,4.15,.18,deepMetal,world,true);
  box(5.72,.27,z,.5,.52,.53,safetyYellow);
  for(const y of [.45,3.75]) rivet(5.70,y,z,'left',.036);
}
// A framed valance and two cyan aisle/task lamps make the alcove recognizable.
box(7.95,4.03,-5.9,3.4,.17,.23,deepMetal);
for(const z of [-4.8,-2.1,.6,3.3]){
  box(7.5,3.91,z,.28,.08,.7,deepMetal);
  box(7.5,3.855,z,.13,.035,.48,new THREE.MeshStandardMaterial({color:0x8acdbf,emissive:0x389b89,emissiveIntensity:1.4,roughness:.4}));
}
const taskCyan=new THREE.PointLight(0x4ba99d,22,5.6,2);taskCyan.position.set(7.45,3.3,-1.1);scene.add(taskCyan);
const taskAmber=new THREE.PointLight(0xe29d4c,18,4.0,2);taskAmber.position.set(8.05,2.35,1.1);scene.add(taskAmber);
const taskRed=new THREE.PointLight(0xcf4936,7,3.2,2);taskRed.position.set(8.8,3.8,-3.8);scene.add(taskRed);
// Bench, drawer stack, pegboard, cable spool and useful hand tools.
box(8.26,1.0,0,1.3,.15,5.65,paintBlue,world,true,true);
for(const z of [-2.42,-.82,.82,2.42]){
  box(8.22,.52,z,.95,.83,.12,deepMetal,world,true);
  box(7.71,.62,z,.055,.035,.07,glowAmber);
  box(8.22,.91,z,.84,.015,.014,brushed);
}
for(const x of [7.72,8.79]) for(const z of [-2.63,2.63]){
  box(x,.49,z,.08,.9,.11,steel);
  cylinder(x,.09,z,.105,.12,safetyBlack,10);
}
// Scuffed worktop inserts and edge protector.
box(8.22,1.085,0,1.17,.025,5.42,deckMat);
box(7.6,1.13,0,.045,.07,5.62,safetyYellow);
// Wall-mounted perforated tool board on the starboard shell.
box(9.35,2.55,.05,.11,2.15,5.25,deepMetal);
box(9.275,2.55,.04,.035,1.95,5.05,paintBlue);
for(let z=-2.25;z<=2.251;z+=.32) for(let y=1.82;y<=3.281;y+=.28){
  cylinder(9.245,y,z,.023,.025,charcoal,8);
}
// Tool silhouettes: hanging wrench loops, drivers, pliers and a small parts caddy.
for(const z of [-1.8,-1.1,-.35,.42,1.18,1.95]){
  const y=3.0-(Math.abs(z)*.06);
  pipe([9.18,y,z],[9.18,y-.55,z+.06],.028,brushed);
  const loop=new THREE.Mesh(new THREE.TorusGeometry(.12,.026,6,14,Math.PI*1.55),brushed);
  loop.rotation.y=Math.PI/2;loop.position.set(9.17,y-.06,z);world.add(loop);
  box(9.14,y-.43,z+.06,.09,.1,.11,safetyYellow);
}
for(const z of [-1.5,-.7,.1,.9,1.7]){
  cylinder(9.17,2.12,z,.037,.72,copper,8);
  cylinder(9.15,1.77,z,.07,.1,deepMetal,8);
}
// Floor-side manifold cart, with wheel pair, handles and hose loops.
box(7.25,.72,-3.64,1.05,1.25,.72,paintBlue,world,true,true);
box(7.25,1.38,-3.64,1.12,.07,.82,steel);
for(const z of [-3.94,-3.34]){
  cylinder(6.72,.22,z,.19,.1,rubber,12).rotation.x=Math.PI/2;
  cylinder(7.78,.22,z,.19,.1,rubber,12).rotation.x=Math.PI/2;
}
for(let i=0;i<3;i++){
  cylinder(7.25,1.52,-3.87+i*.23,.11,.14,i===1?glowMint:glowAmber,10);
}
box(7.25,.8,-3.25,.58,.45,.08,charcoal);
wallLabel(7.25,1.35,-3.17,.73,'P-04','COOLANT CART','front','#70bda8');
// Flexible hose hangs from the cart and folds at the worktop edge.
tube([[7.78,1.3,-3.56],[8.03,1.14,-3.0],[8.37,.48,-2.86],[8.93,.35,-2.72],[9.13,.59,-2.68]],.073,rubber);
for(const [x,y,z] of [[8.01,1.15,-3.03],[8.88,.4,-2.72]]){const c=cylinder(x,y,z,.1,.11,brushed,12);c.rotation.z=Math.PI/2;}
// Bench tools and a metal parts tray; small parts stay at human hand scale.
box(8.0,1.15,.23,.36,.075,.65,charcoal);
box(8.0,1.2,.23,.28,.025,.55,steel);
for(let i=0;i<4;i++){
  cylinder(7.9+i*.075,1.22,.14+random()*.17,.024,.035,i%2?copper:brushed,8);
}
// Open case with foam insert and a few sockets.
box(8.25,1.19,1.24,.52,.12,.66,safetyBlack);
box(8.25,1.26,1.24,.45,.025,.57,new THREE.MeshStandardMaterial({color:0x333f3e,roughness:.94}));
for(let i=0;i<5;i++){
  const s=cylinder(8.08+i*.085,1.3,1.12,.045,.035,brushed,8);s.rotation.x=Math.PI/2;
}
// A wheeled tool chest and a wall-mounted cable drum in the alcove's rear bay.
box(7.25,.75,3.68,1.05,1.3,.9,paintDark,world,true,true);
for(let y of [.45,.9,1.32]){
  box(7.25,y,3.22,.94,.025,.025,brushed);
  box(7.25,y+.05,3.20,.18,.03,.06,safetyYellow);
}
for(const z of [3.32,4.03]) cylinder(7.25,.2,z,.17,.12,rubber,10).rotation.x=Math.PI/2;
cylinder(9.12,2.43,-4.6,.62,.16,deepMetal,24).rotation.z=Math.PI/2;
for(let i=0;i<8;i++){
  const a=i*Math.PI/4;
  sphere(9.02,2.43+.47*Math.sin(a),-4.6+.47*Math.cos(a),.065,brushed);
}
tube([[8.9,2.4,-4.6],[8.2,2.35,-4.5],[7.85,1.9,-4.22],[7.85,1.05,-3.8],[8.0,.18,-3.4]],.065,rubberBlue);

// Machine isolation cabinet, breaker handles, pressure dials, and wall-side pipe tree.
box(8.1,2.72,4.73,1.7,2.45,.26,paintDark,world,true);
box(8.1,2.72,4.57,1.48,2.12,.09,paintBlue);
for(const z of [4.4,4.58,4.76,4.94]){
  pipe([7.42,2.0,z],[7.42,3.37,z],.027,brushed);
  cylinder(7.42,3.28,z,.07,.09,iColor(z),10);
}
function iColor(z){return z>4.8?glowRed:z>4.55?glowAmber:glowMint;}
for(const y of [2.05,2.42,2.79,3.16]){
  cylinder(8.65,y,4.46,.1,.08,brushed,16).rotation.x=Math.PI/2;
  box(8.65,y-.17,4.46,.035,.24,.045,safetyYellow);
}
wallLabel(8.1,3.62,4.48,1.25,'ISOLATE 2A','PANEL / 18 kW','back','#dca958');
// Galvanized and copper plumbing follows wall ribs into the service cart.
for(let i=0;i<4;i++){
  const y=4.66+i*.16, mat=i===2?copper:brushed;
  pipe([9.45,y,-6.8],[9.28,y,-5.7],.035,mat);
  pipe([9.28,y,-5.7],[9.28,y,3.4],.035,mat);
  pipe([9.28,y,3.4],[8.45,y,4.15],.035,mat);
  for(const z of [-4.5,-1.0,2.4]){
    box(9.20,y,z,.14,.11,.22,deepMetal);
  }
  for(const z of [-3.9,.1,2.9]){
    cylinder(9.19,y,z,.07,.12,mat,10).rotation.z=Math.PI/2;
  }
}
// Removable access ladder rungs on an alcove wall are service detail, not a player route.
for(let y=.5;y<3.8;y+=.42){
  pipe([9.16,y,-5.8],[9.16,y,-5.3],.026,brushed);
}

// Upper inspection deck: open grating texture, stiffeners and stout guardrails.
const deckX0=-5.0, deckX1=5.55, deckZ0=-7.5, deckZ1=-5.0, deckY=2.68;
box((deckX0+deckX1)/2,deckY-.09,(deckZ0+deckZ1)/2,deckX1-deckX0,.18,deckZ1-deckZ0,deckMat,world,true,true);
for(let x=deckX0+.24;x<deckX1;x+=.34){
  boxInstance(x,deckY+.012,(deckZ0+deckZ1)/2,.024,.024,deckZ1-deckZ0-.12,steel);
}
for(let z=deckZ0+.18;z<deckZ1;z+=.3){
  boxInstance((deckX0+deckX1)/2,deckY+.013,z,deckX1-deckX0-.12,.018,.024,deepMetal);
}
for(const x of [deckX0+.2,deckX1-.2]) for(const z of [deckZ0+.2,deckZ1-.2]){
  box(x,1.31,z,.22,2.62,.22,steel,world,true);
  box(x,2.54,z,.32,.13,.32,safetyBlack);
}
for(const x of [-4.65,-2.9,-1.15,.6,2.35,4.1]){
  box(x,2.36,-6.23,.16,.48,2.26,deepMetal);
}
// Rear rail and the viewing-side rail; leave a wide throat at the stair landing.
for(const x of [-4.8,-3.8,-2.8,-1.8,-.8,.2,1.2,2.2,3.2,4.2,5.2]){
  if(x < -4.1) continue;
  for(const z of [-5.08,-7.43]){
    boxInstance(x,3.28,z,.075,1.16,.075,brushed);
    boxInstance(x,2.84,z,.19,.11,.18,safetyYellow);
  }
}
boxInstance(.65,3.86,-5.08,8.9,.11,.11,safetyYellow);
boxInstance(.2,3.38,-5.08,8.9,.07,.07,brushed);
boxInstance(.2,3.86,-7.43,9.0,.11,.11,brushed);
boxInstance(5.48,3.86,-6.25,.1,.11,2.2,brushed);
boxInstance(5.48,3.38,-6.25,.07,.07,2.2,steel);
// Toe guard with alternating warning blocks at the exposed deck edge.
box(.22,2.85,-5.02,9.5,.22,.1,safetyBlack);
for(let x=-4.4;x<5.2;x+=.48) boxInstance(x,2.86,-4.96,.2,.18,.12,Math.floor((x+4.4)/.48)%2===0?safetyYellow:safetyBlack);

// Ordinary broad stairs climb to the inspection deck; every tread has a readable nosing.
const stairStart=-8.15, stairEnd=-4.62, stairZ=-6.27, stairWidth=1.52, stairHeight=deckY, stepCount=12;
const run=(stairEnd-stairStart)/stepCount, rise=stairHeight/stepCount;
for(let i=0;i<stepCount;i++){
  const x=stairStart+(i+.5)*run, top=(i+1)*rise;
  boxInstance(x,top/2,stairZ,run+.035,top,stairWidth, i%3===0?paintBlue:deckMat);
  boxInstance(x+run*.38,top+.008,stairZ,run*.18,.028,stairWidth-.1,safetyYellow);
  boxInstance(x,top+.021,stairZ,run-.03,.018,stairWidth-.12,steel);
  for(const z of [stairZ-stairWidth/2+.11,stairZ+stairWidth/2-.11]) rivet(x,top+.035,z,'up',.027);
}
for(const side of [-1,1]){
  const z=stairZ+side*.91;
  for(let i=0;i<=6;i++){
    const f=i/6,x=stairStart+f*(stairEnd-stairStart),y=f*stairHeight;
    pipe([x,y+.12,z],[x,y+1.02,z],.045,brushed);
    box(x,y+.08,z,.17,.16,.17,safetyBlack);
  }
  beamBetween([stairStart,1.02,z],[stairEnd,stairHeight+1.02,z],.085,safetyYellow);
  beamBetween([stairStart,.52,z],[stairEnd,stairHeight+.52,z],.055,steel);
  // Low intermediate stringer shows how the flight is supported.
  beamBetween([stairStart,.22,z-side*.08],[stairEnd,stairHeight-.13,z-side*.08],.13,deepMetal);
}
// Stair approach markings and landing tag.
box(stairStart-.32,.022,stairZ,1.45,.024,2.0,safetyBlack);
for(let i=0;i<5;i++) box(stairStart-.77+i*.22,.04,stairZ,.1,.025,1.72,safetyYellow);
wallLabel(-6.4,1.55,-7.1,1.15,'UP / DECK','INSPECTION WALK','front','#ddae57');

// Deck lighting and restrained status points.
for(const x of [-2.7,.4,3.4]){
  box(x,3.0,-7.30,.08,.07,.42,deepMetal);
  box(x,3.04,-7.07,.055,.035,.13,glowMint);
}
const deckLight=new THREE.PointLight(0xd1ded7,10,5,2);deckLight.position.set(0,4.35,-6.4);scene.add(deckLight);

// Walls of light steel ceiling ribs form a compact orbital work cell.
for(const z of [-7.2,-4.8,-2.4,0,2.4,4.8,7.2]){
  const path=[[-9.52,4.9,z],[-8.9,5.62,z],[-7.7,6.16,z],[-4.0,6.34,z],[0,6.37,z],[4.0,6.34,z],[7.7,6.16,z],[8.9,5.62,z],[9.52,4.9,z]].map(p=>new THREE.Vector3(...p));
  const curve=new THREE.CatmullRomCurve3(path);
  const rib=new THREE.Mesh(new THREE.TubeGeometry(curve,70,.07,8,false),steel);world.add(rib);
  for(const side of [-1,1]){
    const x=side*8.9;
    beamBetween([x,5.48,z],[side*9.48,4.87,z],.1,paintBlue);
    box(side*9.28,4.98,z,.34,.12,.4,safetyBlack);
  }
}

// Add two service placards and small warning pips around the room.
wallLabel(-9.56,4.0,2.5,1.25,'AIRLOCK','ACCESS / KEEP CLEAR','right','#d3ad67');
wallLabel(9.56,4.0,-1.5,1.18,'BAY 03','SERVICE CELL','left','#78bea6');
for(const [x,y,z,mat] of [[-9.22,4.8,2.5,glowMint],[9.22,4.8,-1.5,glowAmber],[-8.94,5.4,-3.7,glowRed],[8.94,5.4,2.8,glowMint]]){
  sphere(x,y,z,.055,mat);
}

flushInstances();
world.add(rivets); rivets.instanceMatrix.needsUpdate=true;

// Player controller and conservative collision proxies for pressure walls, rotor and benches.
const initial = { x: 0, z: 6.45, feet: 0, yaw: 0, pitch: 0 };
let player = { ...initial };
let velocityX = 0, velocityZ = 0;
const keys = new Set();
const colliders = [];
function rectCollider(minX,maxX,minZ,maxZ){colliders.push({minX,maxX,minZ,maxZ,type:'rect'});}
function circleCollider(x,z,r){colliders.push({x,z,r,type:'circle'});}
function orientedRectCollider(x,z,width,depth,rotationY){colliders.push({x,z,hx:width/2,hz:depth/2,rotationY,type:'orientedRect'});}
// Hard limits stop the visitor at bulkheads and keep the service bay enclosed.
const insideX=9.27, insideZ=7.23, actorRadius=.31;
circleCollider(0,0,1.96); // the gyroscope enclosure
for(let i=0;i<4;i++){
  const angle=i*Math.PI/2+.35, tangent=angle+Math.PI/2;
  orientedRectCollider(2.2*Math.cos(angle),2.2*Math.sin(angle),1.12,.16,tangent);
}
rectCollider(5.90,6.22,-7.2,-2.12); rectCollider(5.90,6.22,2.12,7.2);
rectCollider(7.52,9.18,-2.72,2.72); // service bench and under-bench cabinets
rectCollider(6.65,7.86,-4.15,-3.12); // coolant cart
rectCollider(6.63,7.87,3.16,4.18); // rolling tool chest
// Stair side rails, platform viewing rail and outside deck posts.
rectCollider(-8.28,-4.50,-7.24,-7.12); rectCollider(-8.28,-4.50,-5.42,-5.30);
rectCollider(-4.30,5.72,-5.20,-4.96);
rectCollider(5.65,5.81,-7.55,-5.0); rectCollider(-5.14,-4.98,-7.55,-5.25);

function stairHeightAt(x,z){
  if(x<stairStart-.08||x>stairEnd+.16||Math.abs(z-stairZ)>stairWidth*.52)return null;
  const f=THREE.MathUtils.clamp((x-stairStart)/ (stairEnd-stairStart),0,1);
  return Math.floor(f*stepCount+1e-5)*rise;
}
function platformFootprint(x,z){return x>=deckX0-.12&&x<=deckX1+.12&&z>=deckZ0-.12&&z<=deckZ1+.12;}
function groundTarget(x,z,feet){
  const step=stairHeightAt(x,z);
  if(step!==null) return step;
  if(platformFootprint(x,z)&&feet>1.55) return deckY;
  return 0;
}
function blocked(x,z,feet){
  if(x < -insideX+actorRadius || x > insideX-actorRadius || z < -insideZ+actorRadius || z > insideZ-actorRadius) return true;
  for(const c of colliders){
    if(c.type==='circle'&&feet<2.25&&Math.hypot(x-c.x,z-c.z)<c.r+actorRadius) return true;
    if(c.type==='rect'&&x>c.minX-actorRadius&&x<c.maxX+actorRadius&&z>c.minZ-actorRadius&&z<c.maxZ+actorRadius) return true;
    if(c.type==='orientedRect'&&feet<1.35){
      const dx=x-c.x,dz=z-c.z, co=Math.cos(c.rotationY),si=Math.sin(c.rotationY);
      const lx=dx*co-dz*si,lz=dx*si+dz*co;
      if(Math.abs(lx)<c.hx+actorRadius&&Math.abs(lz)<c.hz+actorRadius)return true;
    }
  }
  return false;
}
function resetPlayer(){
  player={...initial};velocityX=velocityZ=0;
  updateCamera();
}
function updateCamera(){
  camera.position.set(player.x,player.feet+1.67,player.z);
  camera.rotation.set(player.pitch,player.yaw,0,'YXZ');
}
updateCamera();

const intro=document.querySelector('#intro');
const loading=document.querySelector('#loading');
const lockHint=document.querySelector('#lockHint');
const helpPanel=document.querySelector('#helpPanel');
const caption=document.querySelector('#surfaceCaption');
let locked=false;
function requestLock(){canvas.requestPointerLock?.();}
document.querySelector('#enterButton').addEventListener('click',()=>{
  intro.classList.add('dismissed'); requestLock();
});
canvas.addEventListener('click',()=>{if(!intro.classList.contains('dismissed')){intro.classList.add('dismissed');} if(!locked)requestLock();});
document.addEventListener('pointerlockchange',()=>{
  locked=document.pointerLockElement===canvas;
  lockHint.classList.toggle('show',!locked&&intro.classList.contains('dismissed'));
});
document.addEventListener('mousemove',e=>{
  if(!locked)return;
  player.yaw-=e.movementX*.0021;
  player.pitch=THREE.MathUtils.clamp(player.pitch-e.movementY*.0018,-1.36,1.36);
  updateCamera();
});
document.addEventListener('keydown',e=>{
  const key=e.key.toLowerCase();keys.add(key);
  if(['w','a','s','d','shift','arrowup','arrowdown','arrowleft','arrowright',' '].includes(key))e.preventDefault();
  if(key==='r')resetPlayer();
  if(key==='h')helpPanel.classList.toggle('hidden');
});
document.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
document.querySelector('#resetButton').addEventListener('click',resetPlayer);
document.querySelector('#closeHelp').addEventListener('click',()=>helpPanel.classList.add('hidden'));

function updateMovement(dt){
  const forward=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0);
  const side=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0);
  const len=Math.hypot(forward,side)||1;
  const sprint=keys.has('shift'), speed=sprint?4.35:3.15;
  const fx=-Math.sin(player.yaw), fz=-Math.cos(player.yaw);
  const rx=Math.cos(player.yaw), rz=-Math.sin(player.yaw);
  const targetX=(fx*forward+rx*side)/len*speed;
  const targetZ=(fz*forward+rz*side)/len*speed;
  const smooth=1-Math.exp(-13*dt);
  velocityX+=(targetX-velocityX)*smooth;velocityZ+=(targetZ-velocityZ)*smooth;
  const distance=Math.hypot(velocityX,velocityZ)*dt;
  const steps=Math.max(1,Math.ceil(distance/.07));
  for(let i=0;i<steps;i++){
    const dx=velocityX*dt/steps,dz=velocityZ*dt/steps;
    let nx=player.x+dx,nz=player.z;
    let target=groundTarget(nx,nz,player.feet);
    if(!blocked(nx,nz,player.feet)&&target-player.feet<=.25+1e-4) {player.x=nx;if(target>player.feet-.24)player.feet=target;}
    nx=player.x;nz=player.z+dz;target=groundTarget(nx,nz,player.feet);
    if(!blocked(nx,nz,player.feet)&&target-player.feet<=.25+1e-4){player.z=nz;if(target>player.feet-.24)player.feet=target;}
  }
  const ground=groundTarget(player.x,player.z,player.feet);
  if(player.feet>ground) player.feet=Math.max(ground,player.feet-8.5*dt);
  else if(player.feet<ground) player.feet=ground;
  // Keep the stance comfortable when crossing to the next lower stair tread.
  updateCamera();
}

function updateCaption(){
  if(player.feet>1.8) caption.innerHTML='INSPECTION DECK <span>·</span> ELEVATED VIEW';
  else if(player.x>6.05&&Math.abs(player.z)<5.3) caption.innerHTML='OPEN SERVICE ALCOVE <span>·</span> COOLANT WORK';
  else caption.innerHTML='MAIN WORK FLOOR <span>·</span> GYRO CORE';
}

let previous=performance.now();
function animate(now){
  const dt=Math.min((now-previous)/1000,.04);previous=now;
  updateMovement(dt);
  updateCaption();
  rotorRing.rotation.y += dt*.18;
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
window.addEventListener('resize',()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.65));
  renderer.setSize(window.innerWidth,window.innerHeight);
});
requestAnimationFrame(()=>{loading.classList.add('done');requestAnimationFrame(animate);});
