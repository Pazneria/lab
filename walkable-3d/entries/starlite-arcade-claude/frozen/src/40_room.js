
// ---------------------------------------------------------------------------
// Room shell, entrance, counter alcove and props
// ---------------------------------------------------------------------------
const WALL_BANDS = [];
function initRoomMaterials() {
  TX.mural = muralTexture(); TX.wains = wainscotTexture(); TX.ceil = ceilingTexture();
  M.wains = new THREE.MeshLambertMaterial({ map: TX.wains });
  M.mural = new THREE.MeshLambertMaterial({ map: TX.mural });
  M.soffit = new THREE.MeshLambertMaterial({ color: 0x0b0a12 });
  M.ceil = new THREE.MeshLambertMaterial({ map: TX.ceil });
  M.base = new THREE.MeshLambertMaterial({ color: 0x0d0c10 });
  M.rail = new THREE.MeshStandardMaterial({ color: 0x8a8a96, roughness: 0.35, metalness: 0.9, map: TX.brushed });
  M.alu = new THREE.MeshStandardMaterial({ color: 0xa8a8b0, roughness: 0.32, metalness: 0.9, map: TX.brushed });
  M.wood = new THREE.MeshStandardMaterial({ map: woodTexture(), roughness: 0.6 });
  M.laminate = new THREE.MeshStandardMaterial({ map: laminateTexture(), roughness: 0.4 });
  M.countertop = new THREE.MeshStandardMaterial({ map: countertopTexture(), roughness: 0.3 });
  WALL_BANDS.push([0, 1.1, M.wains, 1.2, 1.1], [1.1, 2.62, M.mural, 3.0, 1.52], [2.62, 3.0, M.soffit, 1, 1]);
}
// wall strip from (x0,z0) to (x1,z1), facing n = (-dz, dx); s0 = running distance for UV continuity
function wallStrip(x0, z0, x1, z1, y0, y1, s0 = 0, trims = true) {
  const dx = x1 - x0, dz = z1 - z0, len = Math.hypot(dx, dz), ux = dx / len, uz = dz / len;
  const ry = Math.atan2(-uz, ux), nx = -uz, nz = ux;
  const mx = (x0 + x1) / 2, mz = (z0 + z1) / 2;
  for (const [b0, b1, mat, tw, th] of WALL_BANDS) {
    const a = Math.max(y0, b0), b = Math.min(y1, b1);
    if (b - a < 0.001) continue;
    const geo = new THREE.PlaneGeometry(len, b - a);
    const uv = geo.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (s0 + uv.getX(i) * len) / tw, (a - b0 + uv.getY(i) * (b - a)) / th);
    mesh(geo, mat, staticRoot, mx, (a + b) / 2, mz, 0, ry, 0);
  }
  if (trims) {
    if (y0 <= 0.001) box(len, 0.1, 0.014, M.base, staticRoot, mx + nx * 0.007, 0.05, mz + nz * 0.007, 0, ry, 0);
    if (y0 <= 1.1 && y1 >= 1.14) box(len, 0.04, 0.02, M.rail, staticRoot, mx + nx * 0.01, 1.12, mz + nz * 0.01, 0, ry, 0);
    if (y0 <= 2.62 && y1 >= 2.64) box(len, 0.03, 0.03, M.alu, staticRoot, mx + nx * 0.015, 2.62, mz + nz * 0.015, 0, ry, 0);
  }
}
function wallPlane(mat, w, h, x, y, z, ry) { return mesh(new THREE.PlaneGeometry(w, h), mat, staticRoot, x, y, z, 0, ry, 0); }

function carpetMaterial(wearTex) {
  const m = new THREE.MeshLambertMaterial({ map: carpetTexture(), color: 0x8c88a0 });
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uWear = { value: wearTex };
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vWPos;\nuniform sampler2D uWear;')
      .replace('#include <map_fragment>', `#include <map_fragment>
        float wear = texture2D(uWear, vec2((vWPos.x + 3.6) / 9.9, (vWPos.z + 11.0) / 11.0)).r;
        vec3 flatc = vec3(dot(diffuseColor.rgb, vec3(0.3, 0.5, 0.2)));
        diffuseColor.rgb = mix(diffuseColor.rgb, flatc * 1.25 + vec3(0.012, 0.011, 0.014), wear * 0.85);`)
      ;
  };
  return m;
}

function buildRoom() {
  initRoomMaterials();
  const { x0, x1, z0, z1, h } = ROOM;
  // --- floor with wear paths
  const spots = [];
  spots.push([0, -0.55, 1.0, 0.9]);
  for (let z = -1; z > -8.2; z -= 0.35) spots.push([Math.sin(z * 1.3) * 0.25, z, 0.8, 0.22]);
  for (let a = 0; a < TAU; a += 0.2) spots.push([Math.cos(a) * 1.35, -9.25 + Math.sin(a) * 1.35, 0.5, 0.26]);
  for (const z of [-4.0, -4.66]) spots.push([-2.4, z, 0.45, 0.75], [-2.55, z, 0.3, 0.5]);
  for (const z of [-6.5, -7.26]) spots.push([2.25, z, 0.45, 0.75], [2.4, z, 0.3, 0.5]);
  spots.push([0, -7.95, 0.7, 0.85], [-0.4, -7.95, 0.4, 0.6], [0.4, -7.95, 0.4, 0.6]);
  for (let x = 0.3; x < 4.4; x += 0.35) spots.push([x, -3.0 - Math.sin(x) * 0.25, 0.6, 0.2]);
  spots.push([4.2, -3.2, 0.6, 0.7], [4.15, -4.3, 0.35, 0.6]);
  for (let z = -2.5; z > -7.5; z -= 0.4) spots.push([-1.3, z, 0.5, 0.12], [1.3, z - 0.5, 0.5, 0.12]);
  const wear = wearTexture(spots);
  const carpet = carpetMaterial(wear);
  carpet.map.repeat.set(9.9 / 1.7, 11 / 1.7);
  mesh(new THREE.PlaneGeometry(9.9, 11), carpet, staticRoot, 1.35, 0, -5.5, -Math.PI / 2);
  // --- ceilings
  const cg = new THREE.PlaneGeometry(x1 - x0, z1 - z0); scaleUV(cg, (x1 - x0) / 1.2, (z1 - z0) / 1.2);
  mesh(cg, M.ceil, staticRoot, 0, h, (z0 + z1) / 2, Math.PI / 2);
  const acg = new THREE.PlaneGeometry(ALC.x1 - ALC.x0, ALC.z1 - ALC.z0); scaleUV(acg, (ALC.x1 - ALC.x0) / 1.2, (ALC.z1 - ALC.z0) / 1.2);
  mesh(acg, M.ceil, staticRoot, (ALC.x0 + ALC.x1) / 2, ALC.h, (ALC.z0 + ALC.z1) / 2, Math.PI / 2);
  // troffer lights (dim, warm)
  const troffer = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.9, 0.78).multiplyScalar(0.85) });
  for (const [x, z] of [[-1.2, -2.6], [1.2, -2.6], [-1.2, -6.8], [1.2, -6.8]]) {
    box(0.62, 0.02, 0.32, M.alu, staticRoot, x, h - 0.006, z);
    box(0.56, 0.01, 0.26, troffer, staticRoot, x, h - 0.016, z);
  }
  // --- walls (room on the left of travel direction => normal points inward)
  wallStrip(x0, z1, x0, z0, 0, h, 0);                       // left
  wallStrip(x0, z0, x1, z0, 0, h, 11);                      // far
  wallStrip(x1, z0, x1, ALC.z0, 0, h, 18.2);                // right, back part
  wallStrip(x1, ALC.z0, x1, ALC.z1, ALC.h, h, 24.3, false); // header over the alcove
  wallStrip(x1, ALC.z1, x1, z1, 0, h, 27.7);                // right, front part
  // entrance wall pieces (door x[-1,1] y<2.25, window x[1.4,3.2] y[0.95,2.35])
  wallStrip(x1, z1, 3.2, z1, 0, h, 30);
  wallStrip(3.2, z1, 1.4, z1, 0, 0.95, 30.4); wallStrip(3.2, z1, 1.4, z1, 2.35, h, 30.4);
  wallStrip(1.4, z1, 1.0, z1, 0, h, 32.2);
  wallStrip(1.0, z1, -1.0, z1, 2.25, h, 32.6);
  wallStrip(-1.0, z1, x0, z1, 0, h, 34.6);
  // alcove walls
  wallStrip(ALC.x0, ALC.z0, ALC.x1, ALC.z0, 0, ALC.h, 0);
  wallStrip(ALC.x1, ALC.z0, ALC.x1, ALC.z1, 0, ALC.h, 2.7);
  wallStrip(ALC.x1, ALC.z1, ALC.x0, ALC.z1, 0, ALC.h, 6.1);
  // alcove opening trim
  box(0.06, 0.06, ALC.z1 - ALC.z0 + 0.06, M.alu, staticRoot, x1 - 0.01, ALC.h - 0.03, (ALC.z0 + ALC.z1) / 2);
  for (const z of [ALC.z0, ALC.z1]) box(0.06, ALC.h, 0.06, M.alu, staticRoot, x1, ALC.h / 2, z);
  // colliders for the shell
  addCollider(-6, 0, 8, 2); addCollider(-6, -13, 8, z0); addCollider(-6, -13, x0, 2);
  addCollider(x1, -13, 8, ALC.z0); addCollider(x1, ALC.z1, 8, 2); addCollider(ALC.x1, -13, 8, 2);

  buildEntrance();
  buildNeon();
  buildCounter();
  buildProps();
  return wear;
}

function buildEntrance() {
  // outside: sidewalk + street backdrop seen through the glass
  const side = new THREE.MeshLambertMaterial({ color: 0x2a2830 });
  mesh(new THREE.PlaneGeometry(14, 6), side, staticRoot, 0, -0.01, 3, -Math.PI / 2);
  const st = streetTexture();
  mesh(new THREE.PlaneGeometry(18, 9), new THREE.MeshBasicMaterial({ map: st }), staticRoot, 0, 2.6, 6.5);
  const outsideLight = new THREE.MeshBasicMaterial({ color: 0x0 });
  // door frame
  const fr = M.alu, z = 0;
  box(0.08, 2.3, 0.12, fr, staticRoot, -1.0, 1.15, z); box(0.08, 2.3, 0.12, fr, staticRoot, 1.0, 1.15, z);
  box(2.08, 0.08, 0.12, fr, staticRoot, 0, 2.25, z); box(0.04, 2.22, 0.1, fr, staticRoot, 0, 1.11, z);
  for (const sx of [-1, 1]) {
    const cx = sx * 0.5;
    box(0.9, 0.12, 0.05, fr, staticRoot, cx, 0.06, z); box(0.9, 0.06, 0.05, fr, staticRoot, cx, 2.18, z);
    box(0.05, 2.2, 0.05, fr, staticRoot, cx - 0.45 * sx * -1 + 0.0, 1.1, z);
    mesh(new THREE.PlaneGeometry(0.88, 2.0), M.glass, staticRoot, cx, 1.12, z - 0.01, 0, Math.PI, 0);
    // push bar
    box(0.62, 0.035, 0.035, M.chrome, staticRoot, cx, 1.02, z - 0.08);
    for (const bx of [-0.3, 0.3]) box(0.03, 0.04, 0.07, M.chrome, staticRoot, cx + bx, 1.02, z - 0.045);
    // kick plate
    box(0.86, 0.22, 0.004, M.steel, staticRoot, cx, 0.24, z - 0.03);
  }
  // hours decal (reads correctly from outside, mirrored from inside)
  const hours = new THREE.MeshBasicMaterial({ map: (() => { const t = labelTexture(['STARLITE ARCADE', 'OPEN DAILY 2PM – 11PM', 'TOKENS · PRIZES · FUN'], 'rgba(0,0,0,0)', 'rgba(255,255,255,0.9)', 512, 160, 28); return t; })(), transparent: true, depthWrite: false });
  mesh(new THREE.PlaneGeometry(0.6, 0.19), hours, staticRoot, -0.5, 1.55, -0.02, 0, Math.PI, 0);
  // window
  box(1.9, 0.08, 0.14, fr, staticRoot, 2.3, 0.95, 0); box(1.9, 0.08, 0.14, fr, staticRoot, 2.3, 2.35, 0);
  box(0.08, 1.48, 0.14, fr, staticRoot, 1.4, 1.65, 0); box(0.08, 1.48, 0.14, fr, staticRoot, 3.2, 1.65, 0); box(0.04, 1.4, 0.1, fr, staticRoot, 2.3, 1.65, 0);
  mesh(new THREE.PlaneGeometry(1.8, 1.4), M.glass, staticRoot, 2.3, 1.65, -0.01, 0, Math.PI, 0);
  box(1.9, 0.03, 0.22, M.alu, staticRoot, 2.3, 0.94, -0.08); // sill
  // OPEN neon in the window (mirrored from inside)
  const open = neonTexture('OPEN', '#ff3048', 512, 200, true, 140);
  const om = mesh(new THREE.PlaneGeometry(0.8, 0.31), new THREE.MeshBasicMaterial({ map: open, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, color: new THREE.Color(2.2, 2.2, 2.2) }), staticRoot, 2.3, 1.75, -0.06, 0, Math.PI, 0);
  mesh(new THREE.PlaneGeometry(1.4, 0.9), glowMat(0xff2040, 0.25), staticRoot, 2.3, 1.75, -0.07, 0, Math.PI, 0);
  box(0.82, 0.33, 0.01, new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.5, transparent: true, opacity: 0.6 }), staticRoot, 2.3, 1.75, -0.045);
  for (const sx of [-0.3, 0.3]) cyl(0.002, 0.002, 0.6, 4, M.steel, staticRoot, 2.3 + sx, 2.05, -0.05);
  
  // door mat
  const matC = cnv(256, 128), mg = matC.getContext('2d'); mg.fillStyle = '#1e1d22'; mg.fillRect(0, 0, 256, 128);
  for (let y = 4; y < 128; y += 6) { mg.fillStyle = 'rgba(255,255,255,0.06)'; mg.fillRect(0, y, 256, 2); }
  const wg = mg.createRadialGradient(128, 64, 0, 128, 64, 90); wg.addColorStop(0, 'rgba(120,110,100,0.35)'); wg.addColorStop(1, 'rgba(0,0,0,0)'); mg.fillStyle = wg; mg.fillRect(0, 0, 256, 128);
  mg.font = `bold 22px ${FONT}`; mg.fillStyle = 'rgba(255,209,102,0.55)'; mg.textAlign = 'center'; mg.fillText('★ PRESS START ★', 128, 70);
  const matTex = tex(matC, { aniso: 8 });
  box(1.8, 0.012, 0.95, new THREE.MeshStandardMaterial({ map: matTex, roughness: 0.95 }), staticRoot, 0, 0.006, -0.62);
  blobShadow(staticRoot, 1.9, 1.05, -0.62);
}

function neonTube(points, color, radius = 0.011) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), false, 'catmullrom', 0.2);
  const geo = new THREE.TubeGeometry(curve, Math.max(8, points.length * 10), radius, 6, false);
  mesh(geo, new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(2.6) }), staticRoot);
}
function buildNeon() {
  // long wall tubes with wall-wash
  const mag = 0xff3fa4, cyan = 0x33d6ff;
  const lTube = new THREE.MeshBasicMaterial({ color: new THREE.Color(mag).multiplyScalar(2.6) });
  const rTube = new THREE.MeshBasicMaterial({ color: new THREE.Color(cyan).multiplyScalar(2.6) });
  cyl(0.012, 0.012, 9.6, 8, lTube, staticRoot, -3.55, 2.72, -5.5, Math.PI / 2);
  cyl(0.012, 0.012, 5.4, 8, rTube, staticRoot, 3.55, 2.72, -7.9, Math.PI / 2);
  for (let z = -1; z > -10.5; z -= 1.2) box(0.04, 0.02, 0.02, M.alu, staticRoot, -3.58, 2.72, z);
  for (let z = -5.4; z > -10.5; z -= 1.2) box(0.04, 0.02, 0.02, M.alu, staticRoot, 3.58, 2.72, z);
  const washL = glowMat(mag, 0.32, TX.wash), washR = glowMat(cyan, 0.3, TX.wash);
  mesh(new THREE.PlaneGeometry(9.6, 1.5), washL, staticRoot, -3.585, 1.98, -5.5, 0, Math.PI / 2, 0);
  mesh(new THREE.PlaneGeometry(5.4, 1.5), washR, staticRoot, 3.585, 1.98, -7.9, 0, -Math.PI / 2, 0);
  const capL = glowMat(mag, 0.35, TX.wash), capR = glowMat(cyan, 0.35, TX.wash);
  mesh(new THREE.PlaneGeometry(9.6, 0.32), capL, staticRoot, -3.59, 2.87, -5.5, Math.PI, Math.PI / 2, 0);
  mesh(new THREE.PlaneGeometry(5.4, 0.32), capR, staticRoot, 3.59, 2.87, -7.9, Math.PI, -Math.PI / 2, 0);
  const lL = new THREE.PointLight(mag, 2.6, 7, 1.6); lL.position.set(-3.1, 2.45, -5.2); scene.add(lL);
  const lR = new THREE.PointLight(cyan, 2.4, 7, 1.6); lR.position.set(3.1, 2.45, -8.2); scene.add(lR);
  // far wall: crescent moon and stars framing the feature cabinet
  const zf = ROOM.z0 + 0.04, moon = [];
  for (let i = 0; i <= 24; i++) { const a = -2.2 + i / 24 * 4.4; moon.push([-1.75 + Math.cos(a) * 0.38, 2.35 + Math.sin(a) * 0.38, zf]); }
  for (let i = 24; i >= 0; i--) { const a = -1.55 + i / 24 * 3.1; moon.push([-1.62 + Math.cos(a) * 0.27, 2.35 + Math.sin(a) * 0.3, zf]); }
  neonTube(moon, 0xffd166);
  const star = (cx, cy, r) => { const p = []; for (let k = 0; k <= 10; k++) { const a = Math.PI / 2 + k / 10 * TAU, rr = k % 2 ? r * 0.42 : r; p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, zf]); } return p; };
  const starTube = (pts, col) => { const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)), false, 'catmullrom', 0.0), 60, 0.01, 6, false); mesh(geo, new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(2.6) }), staticRoot); };
  starTube(star(1.5, 2.55, 0.2), 0x33d6ff); starTube(star(2.1, 2.2, 0.12), 0xff3fa4); starTube(star(1.15, 2.05, 0.09), 0xffd166);
  mesh(new THREE.PlaneGeometry(1.6, 1.6), glowMat(0xffc860, 0.28), staticRoot, -1.7, 2.35, zf + 0.01);
  mesh(new THREE.PlaneGeometry(1.4, 1.2), glowMat(0x50c0ff, 0.2), staticRoot, 1.6, 2.35, zf + 0.01);
  // far wall mural board behind the cabinet: a framed painted panorama
  const pano = cnv(1024, 256), pg = pano.getContext('2d');
  const pgr = pg.createLinearGradient(0, 0, 0, 256); pgr.addColorStop(0, '#05081c'); pgr.addColorStop(1, '#123e6a'); pg.fillStyle = pgr; pg.fillRect(0, 0, 1024, 256);
  starfield(pg, 1024, 180, 160, 77);
  pg.strokeStyle = 'rgba(120,210,255,0.45)'; pg.lineWidth = 3; for (let k = 0; k < 6; k++) { pg.beginPath(); for (let x = 0; x <= 1024; x += 12) pg.lineTo(x, 190 + k * 11 + Math.sin(x * 0.04 + k) * 4); pg.stroke(); }
  for (let k = 0; k < 5; k++) { pg.fillStyle = 'rgba(255,240,190,0.08)'; pg.beginPath(); pg.moveTo(512, 120); pg.lineTo(0, 40 + k * 30); pg.lineTo(0, 55 + k * 30); pg.fill(); pg.beginPath(); pg.moveTo(512, 120); pg.lineTo(1024, 40 + k * 30); pg.lineTo(1024, 55 + k * 30); pg.fill(); }
  const pt = tex(pano, { aniso: 8 });
  mesh(new THREE.PlaneGeometry(4.6, 1.15), new THREE.MeshStandardMaterial({ map: pt, roughness: 0.7 }), staticRoot, 0.2, 1.62, ROOM.z0 + 0.02);
  box(4.7, 0.04, 0.04, M.gold, staticRoot, 0.2, 2.21, ROOM.z0 + 0.03); box(4.7, 0.04, 0.04, M.gold, staticRoot, 0.2, 1.03, ROOM.z0 + 0.03);
  // ceiling fill lights (warm, dim)
  const c1 = new THREE.PointLight(0xffd6b0, 4.5, 9, 1.5); c1.position.set(0, 2.85, -2.6); scene.add(c1);
  const c2 = new THREE.PointLight(0xffd6b0, 2.6, 9, 1.5); c2.position.set(0, 2.85, -6.4); scene.add(c2);
  // feature downlight: a warm pool on the far cabinet so it reads from the door
  const fs = new THREE.SpotLight(0xffe2c0, 30, 9, 0.42, 0.55, 1.5); fs.position.set(0, 2.96, -7.3);
  fs.target.position.set(0, 0.9, -9.1); scene.add(fs, fs.target);
  box(0.16, 0.05, 0.16, M.alu, staticRoot, 0, 2.975, -7.3);
  mesh(new THREE.CircleGeometry(0.05, 16), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.9, 0.75).multiplyScalar(2) }), staticRoot, 0, 2.948, -7.3, Math.PI / 2);
}

function buildCounter() {
  const cx0 = 4.62, cx1 = 5.22, cz0 = -4.6, cz1 = -1.9, ch = 1.0;
  const g = staticRoot, cz = (cz0 + cz1) / 2, len = cz1 - cz0;
  // body with laminate front
  box(cx1 - cx0 - 0.04, ch - 0.1, len, M.black, g, (cx0 + cx1) / 2 + 0.02, (ch - 0.1) / 2 + 0.1, cz);
  const lg = new THREE.PlaneGeometry(len, ch - 0.14); scaleUV(lg, len / 0.9, (ch - 0.14) / 0.9);
  mesh(lg, M.laminate, g, cx0 + 0.001, (ch - 0.14) / 2 + 0.1, cz, 0, -Math.PI / 2, 0);
  box(0.02, 0.1, len, M.base, g, cx0 + 0.04, 0.05, cz); // recessed toe kick
  box(0.012, 0.04, len, M.alu, g, cx0 - 0.004, 0.97 - 0.02, cz);
  // countertop with bullnose and a worn front edge
  const topG = new THREE.BoxGeometry(cx1 - cx0 + 0.1, 0.04, len + 0.08); scaleUV(topG, 1.5, 1.5);
  box(cx1 - cx0 + 0.1, 0.04, len + 0.08, M.countertop, g, (cx0 + cx1) / 2 - 0.03, ch + 0.02, cz).geometry = topG;
  cyl(0.02, 0.02, len + 0.08, 16, M.countertop, g, cx0 - 0.08, ch + 0.02, cz, Math.PI / 2);
  const worn = new THREE.MeshStandardMaterial({ color: 0xece4d6, roughness: 0.2, transparent: true, opacity: 0.35, depthWrite: false });
  mesh(new THREE.PlaneGeometry(0.12, 1.2), worn, g, cx0 - 0.02, ch + 0.0405, -3.2, -Math.PI / 2);
  box(0.012, 0.045, len + 0.08, M.alu, g, cx0 - 0.1, ch + 0.02, cz);
  // glass prize case on the counter
  const caseX = 4.95, caseZ = -4.15;
  box(0.5, 0.03, 0.62, M.alu, g, caseX, ch + 0.055, caseZ);
  box(0.5, 0.03, 0.62, M.alu, g, caseX, ch + 0.44, caseZ);
  for (const [dx, dz] of [[-0.24, -0.3], [0.24, -0.3], [-0.24, 0.3], [0.24, 0.3]]) box(0.02, 0.38, 0.02, M.alu, g, caseX + dx, ch + 0.25, caseZ + dz);
  const caseGlass = M.glass;
  mesh(new THREE.PlaneGeometry(0.62, 0.36), caseGlass, g, caseX - 0.25, ch + 0.25, caseZ, 0, -Math.PI / 2, 0);
  mesh(new THREE.PlaneGeometry(0.5, 0.36), caseGlass, g, caseX, ch + 0.25, caseZ + 0.31);
  mesh(new THREE.PlaneGeometry(0.5, 0.36), caseGlass, g, caseX, ch + 0.25, caseZ - 0.31, 0, Math.PI, 0);
  const r = rng(404);
  const toyCols = ['pink', 'yellow', 'teal', 'purple', 'orange', 'green', 'blue', 'red'];
  for (let i = 0; i < 9; i++) {
    const tx = caseX - 0.15 + (i % 3) * 0.15, tz = caseZ - 0.2 + Math.floor(i / 3) * 0.2;
    if (i % 3 === 1) mesh(new THREE.TorusGeometry(0.03, 0.012, 8, 20), M.plastic[toyCols[i % 8]], g, tx, ch + 0.1, tz, -Math.PI / 2);
    else if (i % 2) mesh(new THREE.SphereGeometry(0.035, 14, 10), M.plastic[toyCols[i % 8]], g, tx, ch + 0.105, tz);
    else box(0.07, 0.09, 0.05, M.plastic[toyCols[(i + 3) % 8]], g, tx, ch + 0.115, tz, 0, r());
  }
  box(0.44, 0.01, 0.02, new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.95, 0.85).multiplyScalar(1.5) }), g, caseX, ch + 0.42, caseZ - 0.27);
  // token dispenser
  const td = new THREE.Group(); td.position.set(4.95, ch + 0.04, -2.35); g.add(td);
  box(0.3, 0.42, 0.3, M.steel, td, 0, 0.21, 0);
  box(0.22, 0.1, 0.004, new THREE.MeshStandardMaterial({ map: labelTexture(['TOKENS', '4 FOR $1'], '#ffd23f', '#1a0630', 256, 128, 40), roughness: 0.4 }), td, 0, 0.32, 0.152).rotation.y = 0;
  td.rotation.y = -Math.PI / 2;
  box(0.18, 0.05, 0.1, M.chrome, td, 0, 0.06, 0.17);
  box(0.06, 0.08, 0.004, emissiveMat(coinInsertTexture('$1', '#20a040'), 1.6), td, 0, 0.2, 0.152);
  // tokens cup and loose tokens
  const tokenMat = new THREE.MeshStandardMaterial({ color: 0xd8a640, metalness: 1.0, roughness: 0.3 });
  cyl(0.045, 0.04, 0.09, 20, new THREE.MeshStandardMaterial({ color: 0x2060c0, roughness: 0.3 }), g, 4.8, ch + 0.085, -2.85);
  for (let i = 0; i < 12; i++) cyl(0.012, 0.012, 0.003, 14, tokenMat, g, 4.8 + (r() - 0.5) * 0.05, ch + 0.13 + i * 0.002, -2.85 + (r() - 0.5) * 0.05, (r() - 0.5) * 0.3, 0, (r() - 0.5) * 0.3);
  for (let i = 0; i < 7; i++) cyl(0.012, 0.012, 0.003, 14, tokenMat, g, 4.72 + r() * 0.12, ch + 0.0415 + i * 0.0031 * (i < 4 ? 1 : 0), -3.05 + (i < 4 ? 0 : r() * 0.1));
  // register
  const rg = new THREE.Group(); rg.position.set(5.0, ch + 0.04, -3.45); rg.rotation.y = -Math.PI / 2; g.add(rg);
  box(0.36, 0.1, 0.32, new THREE.MeshStandardMaterial({ color: 0x3a3a40, roughness: 0.5 }), rg, 0, 0.05, 0);
  box(0.34, 0.08, 0.2, new THREE.MeshStandardMaterial({ color: 0x2a2a2e, roughness: 0.6 }), rg, 0, 0.13, -0.02, -0.4);
  for (let i = 0; i < 12; i++) box(0.035, 0.012, 0.03, M.plastic[i % 4 === 3 ? 'red' : 'white'], rg, -0.09 + (i % 4) * 0.055, 0.17 + Math.floor(i / 4) * 0.018, 0.04 - Math.floor(i / 4) * 0.045, -0.4);
  box(0.16, 0.06, 0.03, new THREE.MeshBasicMaterial({ color: new THREE.Color(0.2, 1.0, 0.5).multiplyScalar(0.9) }), rg, 0, 0.23, -0.12, -0.3);
  // bell
  cyl(0.04, 0.045, 0.012, 20, M.darkMetal, g, 4.78, ch + 0.046, -3.85);
  mesh(new THREE.SphereGeometry(0.035, 20, 10, 0, TAU, 0, Math.PI / 2), M.chrome, g, 4.78, ch + 0.052, -3.85);
  // price sign tent
  const ps = labelTexture(['PRIZES', '10 TIX · STICKER', '50 TIX · BOUNCY', '200 TIX · PLUSH', '500 TIX · BIG ONE'], '#fff6e0', '#3a1a5c', 256, 256, 24);
  const tent = new THREE.MeshStandardMaterial({ map: ps, roughness: 0.7 });
  box(0.004, 0.16, 0.16, tent, g, 4.74, ch + 0.12, -3.62, 0, 0, -0.25);
  // shelves of prizes on the back wall
  const shelfX = ALC.x1 - 0.17;
  for (const y of [1.15, 1.55, 1.95]) {
    box(0.32, 0.025, 2.6, M.wood, g, shelfX, y, -3.2);
    for (let k = 0; k < 9; k++) {
      const z = -4.35 + k * 0.29 + (r() - 0.5) * 0.05, t = Math.floor(r() * 4), col = M.plastic[toyCols[Math.floor(r() * 8)]];
      if (t === 0) { // plush blob with ears
        mesh(new THREE.SphereGeometry(0.075, 14, 10), col, g, shelfX - 0.02, y + 0.085, z).scale.set(1, 0.95, 1);
        mesh(new THREE.SphereGeometry(0.055, 12, 8), col, g, shelfX - 0.03, y + 0.19, z);
        for (const e of [-1, 1]) mesh(new THREE.SphereGeometry(0.02, 8, 6), col, g, shelfX - 0.03, y + 0.235, z + e * 0.035);
        for (const e of [-1, 1]) mesh(new THREE.SphereGeometry(0.008, 6, 4), M.plastic.black, g, shelfX - 0.08, y + 0.2, z + e * 0.02);
      } else if (t === 1) box(0.12, 0.16 + r() * 0.1, 0.1, col, g, shelfX, y + 0.1, z, 0, (r() - 0.5) * 0.3);
      else if (t === 2) { cyl(0.05, 0.05, 0.14, 16, M.glass, g, shelfX, y + 0.08, z); for (let b = 0; b < 5; b++) mesh(new THREE.SphereGeometry(0.018, 8, 6), M.plastic[toyCols[b]], g, shelfX + (r() - 0.5) * 0.04, y + 0.03 + b * 0.022, z + (r() - 0.5) * 0.04); }
      else { mesh(new THREE.SphereGeometry(0.04, 12, 8), M.plastic.yellow, g, shelfX - 0.02, y + 0.05, z); mesh(new THREE.SphereGeometry(0.025, 10, 8), M.plastic.yellow, g, shelfX - 0.04, y + 0.1, z); mesh(new THREE.ConeGeometry(0.012, 0.025, 8), M.plastic.orange, g, shelfX - 0.07, y + 0.1, z, 0, 0, Math.PI / 2); }
    }
  }
  for (const z of [-4.5, -1.9]) box(0.3, 0.9, 0.02, M.wood, g, shelfX, 1.55, z);
  // prize neon + TOKENS neon on the header
  const tk = neonTexture('TOKENS', '#ffd23f', 1024, 256, false, 170);
  mesh(new THREE.PlaneGeometry(1.5, 0.375), new THREE.MeshBasicMaterial({ map: tk, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, color: new THREE.Color(2, 2, 2) }), g, ROOM.x1 - 0.02, 2.78, -3.2, 0, -Math.PI / 2, 0);
  mesh(new THREE.PlaneGeometry(2.4, 0.7), glowMat(0xffb020, 0.22), g, ROOM.x1 - 0.025, 2.78, -3.2, 0, -Math.PI / 2, 0);
  const pz = neonTexture('Prizes!', '#ff5fd0', 1024, 256, false, 170, 'bold');
  mesh(new THREE.PlaneGeometry(1.2, 0.3), new THREE.MeshBasicMaterial({ map: pz, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, color: new THREE.Color(1.8, 1.8, 1.8) }), g, ALC.x1 - 0.02, 2.28, -3.2, 0, -Math.PI / 2, 0);
  // pendant lamps
  for (const z of [-3.9, -2.5]) {
    cyl(0.003, 0.003, 0.5, 4, M.matte, g, 4.95, ALC.h - 0.25, z);
    mesh(new THREE.ConeGeometry(0.13, 0.14, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0xc23a2a, roughness: 0.4, metalness: 0.3, side: THREE.DoubleSide }), g, 4.95, ALC.h - 0.55, z);
    mesh(new THREE.SphereGeometry(0.035, 12, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.8, 0.5).multiplyScalar(3) }), g, 4.95, ALC.h - 0.6, z);
  }
  const pl = new THREE.PointLight(0xffb070, 8.5, 5.5, 1.7); pl.position.set(4.95, ALC.h - 0.7, -3.2); scene.add(pl);
  // staff stool behind the counter and a customer stool at the end
  stool(5.75, -2.9, 0.62); stool(4.25, -1.95, 0.72);
  // change machine
  const ch2 = new THREE.Group(); ch2.position.set(4.12, 0, ALC.z0 + 0.2); g.add(ch2);
  box(0.46, 1.35, 0.36, new THREE.MeshStandardMaterial({ color: 0x1f3a6a, roughness: 0.4, metalness: 0.3 }), ch2, 0, 0.675, 0);
  box(0.4, 0.3, 0.004, emissiveMat(labelTexture(['CHANGE', '$1 · $5 · $10', 'BILLS → TOKENS'], '#ffe14d', '#1a0630', 256, 192, 30), 1.2), ch2, 0, 1.1, 0.181);
  box(0.12, 0.05, 0.03, M.chrome, ch2, 0, 0.82, 0.19);
  box(0.09, 0.008, 0.004, new THREE.MeshBasicMaterial({ color: 0x40ff80 }), ch2, 0, 0.85, 0.206);
  box(0.24, 0.1, 0.12, M.steel, ch2, 0, 0.4, 0.22);
  box(0.2, 0.02, 0.1, M.matte, ch2, 0, 0.36, 0.23);
  blobShadow(ch2, 0.7, 0.6, 0.05);
  addCollider(3.85, ALC.z0, 4.4, ALC.z0 + 0.45);
  addCollider(cx0 - 0.1, ALC.z0, ALC.x1, ALC.z1);
  blobShadow(staticRoot, 0.9, len + 0.3, cz).position.x = (cx0 + cx1) / 2;
}
function stool(x, z, h) {
  const g = staticRoot;
  cyl(0.2, 0.22, 0.03, 24, M.steel, g, x, 0.015, z);
  cyl(0.022, 0.022, h - 0.07, 12, M.chrome, g, x, h / 2, z);
  mesh(new THREE.TorusGeometry(0.16, 0.01, 8, 28), M.chrome, g, x, h * 0.4, z, Math.PI / 2);
  cyl(0.18, 0.17, 0.07, 28, new THREE.MeshStandardMaterial({ color: 0xb01828, roughness: 0.35 }), g, x, h, z);
  mesh(new THREE.CircleGeometry(0.11, 24), new THREE.MeshStandardMaterial({ color: 0xd04050, roughness: 0.6, transparent: true, opacity: 0.35, depthWrite: false }), g, x, h + 0.036, z, -Math.PI / 2);
  mesh(new THREE.TorusGeometry(0.18, 0.008, 6, 32), M.chrome, g, x, h - 0.035, z, Math.PI / 2);
  blobShadow(g, 0.6, 0.6, z).position.x = x;
  addCollider(x - 0.2, z - 0.2, x + 0.2, z + 0.2);
}

function buildProps() {
  const g = staticRoot, r = rng(55);
  // posters
  const poster = (kind, x, y, z, ry, w = 0.6) => {
    const t = posterTexture(kind);
    mesh(new THREE.PlaneGeometry(w, w * 1.4), new THREE.MeshStandardMaterial({ map: t, roughness: 0.65 }), g, x, y, z, 0, ry, 0);
    const nx = Math.sin(ry) * 0.012, nz = Math.cos(ry) * 0.012;
    box(w + 0.04, 0.02, 0.02, M.alu, g, x - nx * 0, y + w * 0.7 + 0.01, z, 0, ry, 0);
    box(w + 0.04, 0.02, 0.02, M.alu, g, x, y - w * 0.7 - 0.01, z, 0, ry, 0);
  };
  poster('rules', -3.585, 1.75, -1.7, Math.PI / 2);
  poster('night', -3.585, 1.75, -2.75, Math.PI / 2);
  poster('fame', -3.585, 1.75, -9.4, Math.PI / 2, 0.7);
  poster('light', 3.585, 1.75, -9.4, -Math.PI / 2, 0.7);
  poster('fame', -2.4, 1.7, -0.015, Math.PI, 0.6);
  // soda machine (fictional brand) on the left wall
  const sm = new THREE.Group(); sm.position.set(-3.6 + 0.42, 0, -7.4); sm.rotation.y = Math.PI / 2; g.add(sm);
  const sc = cnv(512, 1024), sg = sc.getContext('2d');
  const sgr = sg.createLinearGradient(0, 0, 0, 1024); sgr.addColorStop(0, '#ff4f6a'); sgr.addColorStop(1, '#a01030'); sg.fillStyle = sgr; sg.fillRect(0, 0, 512, 1024);
  sg.save(); sg.translate(256, 420); sg.rotate(-0.25); logoText(sg, 'FIZZ', 0, -80, 150, '#ffffff', '#ffe0e0', '#5a0010'); logoText(sg, 'POP!', 0, 80, 150, '#ffe14d', '#ffb000', '#5a0010'); sg.restore();
  for (let i = 0; i < 30; i++) { sg.strokeStyle = 'rgba(255,255,255,0.5)'; sg.lineWidth = 3; sg.beginPath(); sg.arc(r() * 512, 650 + r() * 300, 4 + r() * 12, 0, TAU); sg.stroke(); }
  const smt = tex(sc, { aniso: 4 });
  box(0.82, 1.82, 0.78, new THREE.MeshStandardMaterial({ color: 0xc01830, roughness: 0.35 }), sm, 0, 0.92, 0);
  box(0.56, 1.5, 0.01, emissiveMat(smt, 0.9), sm, -0.08, 1.0, 0.395);
  const btns = labelTexture(['COLA', 'LEMON', 'GRAPE', 'ORANGE', 'ROOT BEER', 'WATER'], '#1a1a1a', '#ffffff', 128, 512, 26);
  box(0.12, 0.7, 0.012, emissiveMat(btns, 0.7), sm, 0.31, 1.3, 0.396);
  box(0.08, 0.12, 0.02, M.chrome, sm, 0.31, 0.85, 0.4);
  box(0.5, 0.16, 0.05, M.matte, sm, -0.08, 0.16, 0.39);
  mesh(new THREE.PlaneGeometry(1.2, 1.4), glowMat(0xff4060, 0.12), sm, -0.08, 1.0, 0.42);
  blobShadow(sm, 1.1, 1.0, 0.0);
  addCollider(-3.6, -7.4 - 0.45, -3.6 + 0.85, -7.4 + 0.45);
  // trash can with a liner, bench, plant, fire extinguisher
  cyl(0.19, 0.17, 0.62, 24, new THREE.MeshStandardMaterial({ color: 0x23252a, roughness: 0.6, metalness: 0.4, map: TX.brushedDark }), g, -3.3, 0.31, -8.4);
  mesh(new THREE.TorusGeometry(0.19, 0.012, 8, 24), new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.4 }), g, -3.3, 0.62, -8.4, Math.PI / 2);
  blobShadow(g, 0.6, 0.6, -8.4).position.x = -3.3;
  addCollider(-3.6, -8.65, -3.08, -8.15);
  // bench by the entrance
  const bx = -2.55, bz = -0.32;
  box(1.3, 0.05, 0.38, M.wood, g, bx, 0.45, bz);
  for (const sx of [-0.55, 0.55]) { box(0.05, 0.43, 0.32, M.steel, g, bx + sx, 0.215, bz); }
  box(1.3, 0.3, 0.04, M.wood, g, bx, 0.75, -0.06);
  blobShadow(g, 1.6, 0.6, bz).position.x = bx;
  addCollider(bx - 0.7, -0.55, bx + 0.7, 0);
  // potted plant in the corner
  cyl(0.17, 0.13, 0.36, 20, new THREE.MeshStandardMaterial({ color: 0xc8643a, roughness: 0.7 }), g, -3.32, 0.18, -0.95);
  const leaf = new THREE.MeshStandardMaterial({ color: 0x2f7a3a, roughness: 0.55, side: THREE.DoubleSide });
  for (let i = 0; i < 14; i++) { const a = i / 14 * TAU + r(), l = 0.35 + r() * 0.3; const lm = mesh(new THREE.PlaneGeometry(0.09, l), leaf, g, -3.32 + Math.cos(a) * 0.08, 0.36 + l * 0.45, -0.95 + Math.sin(a) * 0.08, 0, -a, 0); lm.rotateX(0.35 + r() * 0.3); }
  blobShadow(g, 0.5, 0.5, -0.95).position.x = -3.32;
  addCollider(-3.6, -1.15, -3.1, -0.75);
  // fire extinguisher
  cyl(0.075, 0.075, 0.45, 18, new THREE.MeshStandardMaterial({ color: 0xc81010, roughness: 0.3 }), g, 3.48, 0.75, -0.8);
  cyl(0.03, 0.04, 0.08, 10, M.matte, g, 3.48, 1.02, -0.8);
  box(0.02, 0.3, 0.15, M.steel, g, 3.59, 0.85, -0.8);
  // exit door on the far wall
  const ex = -2.75, zf = ROOM.z0 + 0.01;
  box(1.0, 2.2, 0.06, M.alu, g, ex, 1.1, zf);
  box(0.9, 2.1, 0.05, new THREE.MeshStandardMaterial({ color: 0x3a3c48, roughness: 0.5, metalness: 0.4 }), g, ex, 1.05, zf + 0.02);
  box(0.75, 0.05, 0.05, M.chrome, g, ex, 1.0, zf + 0.08);
  for (const sx of [-0.36, 0.36]) box(0.05, 0.08, 0.06, M.darkMetal, g, ex + sx, 1.0, zf + 0.06);
  box(0.8, 0.18, 0.004, new THREE.MeshStandardMaterial({ color: 0x808088, roughness: 0.5, metalness: 0.6 }), g, ex, 0.15, zf + 0.047);
  const exitT = labelTexture(['EXIT'], '#0b3a18', '#7dff9a', 256, 96, 64);
  box(0.36, 0.14, 0.06, new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 }), g, ex, 2.4, zf + 0.03);
  mesh(new THREE.PlaneGeometry(0.32, 0.11), new THREE.MeshBasicMaterial({ map: exitT, color: new THREE.Color(1.6, 1.6, 1.6) }), g, ex, 2.4, zf + 0.062);
  mesh(new THREE.PlaneGeometry(0.9, 0.5), glowMat(0x40ff70, 0.16), g, ex, 2.4, zf + 0.07);
  // wall clock above the entrance
  const clk = cnv(256, 256), kg = clk.getContext('2d');
  kg.fillStyle = '#f4ecd8'; kg.beginPath(); kg.arc(128, 128, 124, 0, TAU); kg.fill();
  kg.fillStyle = '#222'; for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; kg.fillRect(128 + Math.cos(a) * 100 - 3, 128 + Math.sin(a) * 100 - 3, 6, 6); }
  kg.strokeStyle = '#222'; kg.lineWidth = 8; kg.beginPath(); kg.moveTo(128, 128); kg.lineTo(128 + Math.cos(-1.2) * 60, 128 + Math.sin(-1.2) * 60); kg.stroke();
  kg.lineWidth = 5; kg.beginPath(); kg.moveTo(128, 128); kg.lineTo(128 + Math.cos(0.9) * 90, 128 + Math.sin(0.9) * 90); kg.stroke();
  kg.fillStyle = '#e2384d'; kg.font = `bold 20px ${FONT}`; kg.textAlign = 'center'; kg.fillText('STARLITE', 128, 90);
  mesh(new THREE.CircleGeometry(0.17, 32), new THREE.MeshStandardMaterial({ map: tex(clk), roughness: 0.4 }), g, 0, 2.55, -0.04, 0, Math.PI, 0);
  mesh(new THREE.TorusGeometry(0.17, 0.015, 8, 32), M.chrome, g, 0, 2.55, -0.04);
  // power cord protector from the feature cabinet to the far wall
  box(0.09, 0.012, 0.95, M.rubber, g, 0.32, 0.006, -10.52);
  box(0.06, 0.08, 0.03, new THREE.MeshStandardMaterial({ color: 0xe8e4d8, roughness: 0.5 }), g, 0.32, 0.3, ROOM.z0 + 0.015);
  const cord = new THREE.CatmullRomCurve3([new THREE.Vector3(0.32, 0.25, -10.06), new THREE.Vector3(0.32, 0.03, -10.04), new THREE.Vector3(0.32, 0.016, -10.2)]);
  mesh(new THREE.TubeGeometry(cord, 12, 0.008, 6), M.rubber, g);
  const cord2 = new THREE.CatmullRomCurve3([new THREE.Vector3(0.32, 0.016, -10.95), new THREE.Vector3(0.32, 0.1, -10.985), new THREE.Vector3(0.32, 0.29, -10.98)]);
  mesh(new THREE.TubeGeometry(cord2, 12, 0.008, 6), M.rubber, g);
}
