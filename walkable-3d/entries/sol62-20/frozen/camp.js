import * as T from 'three';
import { decalMaterial, paintedTexture, rng, surfaceMaterial } from './model.js';
import { clothRoll, crate, cushion, lantern, mug, wovenBasket } from './goods.js';

function dirtTexture() {
  return paintedTexture(512, 512, (ctx, w, h) => {
    const rand = rng(17803);
    const lattice = Array.from({length: 64 * 64}, rand);
    const image = ctx.createImageData(w, h);
    const field = (x, y, count) => {
      const ix = Math.floor(x), iy = Math.floor(y);
      const u = x - ix, v = y - iy;
      const blend = (i, j) => lattice[(i % count) + (j % count) * 64];
      const s = u * u * (3 - 2 * u), t = v * v * (3 - 2 * v);
      return T.MathUtils.lerp(T.MathUtils.lerp(blend(ix, iy), blend(ix + 1, iy), s),
        T.MathUtils.lerp(blend(ix, iy + 1), blend(ix + 1, iy + 1), s), t);
    };
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const f = field(x / w * 8, y / h * 8, 8) * 23 + field(x / w * 32, y / h * 32, 32) * 20;
        const v = 202 + f - rand() * 20;
        const i = (y * w + x) * 4;
        image.data.set([v, v - 5, v - 11, 255], i);
      }
    }
    ctx.putImageData(image, 0, 0);
    for (let i = 0; i < 2200; i++) {
      const x = rand() * w, y = rand() * h;
      ctx.fillStyle = i % 2 ? '#4b3e321c' : '#fcf1d883';
      ctx.fillRect(x, y, rand() * 2 + .4, rand() * 2 + .5);
    }
  });
}

function ground(b) {
  const tex = dirtTexture();
  tex.wrapS = tex.wrapT = T.RepeatWrapping;
  tex.repeat.set(24, 24);
  const mat = surfaceMaterial('#ffffff', {map: tex, vertexColors: true});
  const geom = new T.PlaneGeometry(120, 120, 84, 84);
  geom.rotateX(-Math.PI / 2);
  const pos = geom.getAttribute('position');
  const colors = [];
  const sand = new T.Color('#c7aa82');
  const clay = new T.Color('#a78768');
  const scrub = new T.Color('#909377');
  const dry = new T.Color('#a39a76');
  const blend = (x, z) => Math.sin(x * 1.74 + z * .71) * .28 + Math.cos(x * .87 - z * .91) * .39
    + Math.sin(x * .43 - z * .74) * .32;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const r = Math.hypot(x * .95, z * 1.09);
    const rough = blend(x, z);
    const edge = T.MathUtils.smoothstep(r + rough * 1.7, 5.9, 12.8);
    const high = T.MathUtils.smoothstep(r, 10.8, 30);
    const offset = Math.sin(x * .20 - z * .22) * .37 + Math.cos(z * .33 + x * .15) * .29;
    pos.setY(i, -.014 + high * (offset + high * .38));
    const color = sand.clone().lerp(clay, .18 + rough * .20)
      .lerp(scrub.clone().lerp(dry, .54 + rough * .44), edge * .88);
    colors.push(color.r, color.g, color.b);
  }
  geom.setAttribute('color', new T.Float32BufferAttribute(colors, 3));
  geom.computeVertexNormals();
  const mesh = new T.Mesh(geom, mat);
  mesh.name = 'Packed dirt and dry grass';
  mesh.receiveShadow = true;
  b.scene.add(mesh);
}

function ruts(b) {
  const map = paintedTexture(768, 128, (ctx, w, h) => {
    const rand = rng(76);
    for (let i = 0; i < 3500; i++) {
      const x = rand() * w;
      const y = h / 2 + (rand() + rand() + rand() - 1.5) * h * .34;
      const faded = Math.sin(Math.PI * x / w) ** .5;
      const stripe = Math.max(0, 1 - Math.abs(y / h - .5) * 2);
      ctx.globalAlpha = faded * stripe * (.19 + rand() * .24);
      ctx.fillStyle = i % 3 ? '#7d604b' : '#d3ae7c';
      ctx.fillRect(x, y, 2 + rand() * 20, rand() * 3 + .5);
    }
  });
  const mat = new T.MeshStandardMaterial({
    color: '#fff1d3', map, roughness: 1, transparent: true, depthWrite: false,
    polygonOffset: true, polygonOffsetFactor: -2,
  });
  b.plane(mat, 1.48, .001, 1.62, 10.93, .367, -Math.PI / 2, 0, -.009);
  b.plane(mat, .52, .001, -1.62, 12.41, .448, -Math.PI / 2, 0, .006);
}

function grass(b, p) {
  const rand = rng(93811);
  const colors = ['#8e855d', '#9b8f61', '#ad9a69', '#747f5e'];
  const mat = colors.map(c => surfaceMaterial(c, {side: T.DoubleSide}));
  const lists = mat.map(() => ({positions: [], uvs: [], faces: []}));
  const addBlade = (list, x, z, ht, width, a, bend, root) => {
    const {positions, faces, uvs} = list;
    const idx = positions.length / 3;
    const vx = Math.sin(a), vz = Math.cos(a);
    positions.push(x - vx * width, root, z - vz * width,
      x + vx * width, root, z + vz * width,
      x - vx * width * .48 + vz * bend * .30, root + ht * .54, z - vz * width * .48 - vx * bend * .30,
      x + vx * width * .48 + vz * bend * .30, root + ht * .54, z + vz * width * .48 - vx * bend * .30,
      x + vz * bend, root + ht, z - vx * bend);
    faces.push(idx, idx + 1, idx + 2, idx + 1, idx + 3, idx + 2, idx + 2, idx + 3, idx + 4);
    uvs.push(0, 0, 1, 0, .23, .55, .77, .55, .5, 1);
  };
  const patches = [[-5.43, -2.77, 1.29], [-2.63, -2.45, .82], [-4.45, 2.66, .66], [4.39, 2.61, .90],
    [3.77, 6.16, .87], [-1.28, 6.51, .88], [-6.69, 4.46, .86], [3.68, -3.13, .65], [5.47, .29, 1.09],
    [5.72, 4.56, .92], [-6.69, .52, .86], [6.25, -4.86, 1.44], [-5.63, -5.28, 1.08]];
  for (let i = 0; i < 344; i++) {
    const [px, pz, span] = patches[i % patches.length];
    const a = rand() * 6.283;
    const distance = rand() * rand() * span + .05;
    const x = px + Math.sin(a) * distance, z = pz + Math.cos(a) * distance;
    const h = .046 + rand() ** 2 * .135;
    for (let j = 0; j < 5; j++) addBlade(lists[(i + j) % mat.length],
      x + (rand() - .5) * .064, z + (rand() - .5) * .064, h * (.48 + rand() * .66),
      .006 + rand() * .006, rand() * 6.28, .018 + rand() * .071, -.015);
  }
  for (let i = 0; i < 120; i++) {
    const a = rand() * 6.28, r = 6.1 + rand() * 6.9;
    const x = Math.cos(a) * r, z = Math.sin(a) * r * .86;
    const h = .045 + rand() * .12;
    for (let j = 0; j < 3; j++) addBlade(lists[(i + j) % mat.length], x + (rand() - .5) * .07,
      z + (rand() - .5) * .07, h * (.40 + rand() * .9), .0075, rand() * 6.28, rand() * .067, -.014);
  }
  for (let i = 0; i < mat.length; i++) {
    const {positions, uvs, faces} = lists[i];
    b.mesh(mat[i], positions, uvs, faces, false);
  }

  for (let i = 0; i < 156; i++) {
    const x = (rand() - .5) * 18.3, z = (rand() - .4) * 15.3;
    if (Math.abs(x) < 3.2 && Math.abs(z) < 1.8) continue;
    if (x < -3.3 && x > -4.9 && z > -.5 && z < 1) continue;
    const s = .009 + rand() ** 2 * .047;
    b.stone(p.stone[i % 5], x, s * .14 - .009, z, s * (1 + rand() * .5), s * .36, s * .87, rand() * 6.28);
  }
  for (const [x, z, s] of [[-6.49, -3.61, .16], [-6.71, -3.45, .08], [5.52, -3.71, .13],
    [6.29, 4.38, .16], [6.42, 4.29, .09], [3.69, 6.44, .10], [-2.61, 6.59, .073]]) {
    b.stone(p.stone[1], x, s * .33, z, s * 1.7, s * .67, s, x);
  }
}

function kettle(b, p, x, y, z) {
  b.oval(p.blackIron, x, y + .13, z, .147, .129, .127);
  b.cylinder(p.blackIron, x, y + .221, z, .103, .124, .043);
  b.cylinder(p.tinDark, x, y + .253, z, .109, .11, .023);
  b.oval(p.timberLight, x, y + .271, z, .026, .015, .027);
  b.rod(p.blackIron, [x + .10, y + .118, z + .027], [x + .201, y + .168, z + .064], .056, .056, true);
  b.rod(p.tinDark, [x + .20, y + .16, z + .063], [x + .235, y + .218, z + .073], .043, .043, true);
  b.rod(p.blackIron, [x + .225, y + .208, z + .071], [x + .247, y + .246, z + .077], .036, .036, true);
  const handle = Array.from({length: 14}, (_, i) => {
    const a = i * Math.PI / 13;
    return [x + Math.cos(a) * .137, y + .155 + .242 * Math.sin(a), z];
  });
  b.curvedRod(p.blackIron, handle, .014);
  for (const s of [-1, 1]) b.cylinder(p.iron, x + s * .137, y + .155, z, .023, .023, .031, 'x', 10);
}

function hearth(b, p, c, contact) {
  const fx = -.91, fz = 4.85;
  const rand = rng(641);
  b.plane(contact, fx, .003, fz, 1.54, 1.39, -Math.PI / 2);
  b.cylinder(p.soot, fx, .012, fz, .317, .352, .038, 'y', 17);
  for (let i = 0; i < 13; i++) {
    const r = .358 + rand() * .075;
    const a = i * 2 * Math.PI / 13;
    b.stone(p.stone[i % 5], fx + Math.cos(a) * r, .055 + rand() * .019, fz + Math.sin(a) * r,
      .111 + rand() * .052, .073 + rand() * .035, .091 + rand() * .066, a);
  }
  for (const [dx, dz, av, h] of [[0, .105, .19, .047], [.04, -.127, -.61, .064], [-.07, -.028, 1.05, .11]]) {
    const a = [fx + dx + Math.cos(av) * .246, h, fz + dz + Math.sin(av) * .223];
    const c = [fx + dx - Math.cos(av) * .246, h + .015, fz + dz - Math.sin(av) * .221];
    b.rod(p.soot, a, c, .095, .093, true);
    b.rod(p.endgrain, a, [a[0] * .92 + c[0] * .08, a[1] + .001, a[2] * .92 + c[2] * .08], .087, .087, true);
  }
  const ember = surfaceMaterial('#ed924f', {emissive: '#e55818', emissiveIntensity: 1.05, roughness: 1});
  const ash = surfaceMaterial('#746053');
  for (let i = 0; i < 18; i++) {
    const x = fx + (rand() - .5) * .39, z = fz + (rand() - .5) * .35;
    b.stone(i % 5 < 2 ? ember : ash, x, .039 + rand() * .065, z, .022 + rand() * .024, .021, .022 + rand() * .014, i);
  }
  for (const [dx, dz] of [[.56, .25], [-.47, .32], [-.06, -.62]]) {
    b.rod(p.blackIron, [fx + dx, .057, fz + dz], [fx + dx * .035, 1.22, fz + dz * .035], .027, .027, true);
    b.plane(contact, fx + dx, .006, fz + dz, .22, .19, -Math.PI / 2);
  }
  b.torus(p.blackIron, fx, 1.192, fz, .039, .010, 'y', 16);
  for (let i = 0; i < 5; i++) b.torus(p.blackIron, fx, 1.166 - i * .049, fz, .028, .0058, i % 2 ? 'x' : 'z', 14);
  kettle(b, p, fx, .551, fz);
  c.circle(fx, fz, .455, 0, 1.25);
  for (const [x, z] of [[fx + .56, fz + .25], [fx - .47, fz + .32], [fx - .06, fz - .62]]) c.circle(x, z, .069, 0, 1.25);
}

function packedCamp(b, p, c, contact) {
  const x = .018, z = 5.60;
  cushion(b, p.cloth[0], x, .431, z, .52, .075, .422, -.10);
  for (const s of [-1, 1]) {
    b.rod(p.timber, [x + s * .184, .017, z - .201], [x + s * .169, .400, z + .17], .049);
    b.rod(p.timberLight, [x + s * .181, .019, z + .211], [x + s * .17, .400, z - .17], .049);
    b.cylinder(p.iron, x + s * .202, .203, z, .022, .022, .028, 'x', 10);
  }
  b.rod(p.darkWood, [x - .20, .199, z], [x + .20, .199, z], .024, .024, true);
  b.plane(contact, x, .010, z, .79, .72, -Math.PI / 2);
  c.rect(x - .26, x + .26, z - .221, z + .221, 0, .47);

  crate(b, p, 1.141, .004, 5.173, .65, .414, .51, true);
  b.plane(contact, 1.14, .008, 5.173, .94, .84, -Math.PI / 2);
  mug(b, p, 1.024, .461, 5.108, 1.17);
  lantern(b, p, 1.337, .464, 5.280, .96, false);
  c.rect(.814, 1.47, 4.914, 5.431, 0, .459);

  const mat = decalMaterial(512, 320, (ctx, w, h) => {
    ctx.fillStyle = '#ab865c'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 14; i++) {
      const off = i * 8;
      ctx.strokeStyle = i % 3 === 0 ? '#765e48' : '#d0a777';
      ctx.lineWidth = i % 3 === 0 ? 2 : 1;
      ctx.strokeRect(off, off, w - 2 * off, h - 2 * off);
    }
    const rand = rng(771);
    for (let i = 0; i < 6000; i++) {
      ctx.fillStyle = i % 2 ? '#462f2445' : '#efd3a93f';
      ctx.fillRect(rand() * w, rand() * h, 1 + rand() * 3, 1);
    }
  });
  b.plane(mat, 2.226, .006, 5.188, 1.27, .79, -Math.PI / 2, 0, -.117);
  clothRoll(b, p, 2.514, .012, 5.245, .537, .126, p.cloth[3]);
  wovenBasket(b, p, 2.091, .012, 5.193, .157, .214);
  b.box(p.cloth[0], 2.099, .230, 5.199, .205, .046, .162, -.18);
  c.rect(1.90, 2.81, 4.99, 5.43, 0, .29);
}

function sign(b, p, c, contact) {
  const x = 3.65, z = 2.581;
  const board = decalMaterial(420, 560, (ctx, w, h) => {
    ctx.fillStyle = '#303a33'; ctx.fillRect(0, 0, w, h);
    const rand = rng(237);
    for (let i = 0; i < 1570; i++) {
      ctx.fillStyle = i % 2 ? '#f0e4c530' : '#201c15a0';
      ctx.fillRect(rand() * w, rand() * h, 1 + rand() * 4, 1);
    }
    ctx.textAlign = 'center';
    ctx.fillStyle = '#efdaab';
    ctx.strokeStyle = '#e7c990a9';
    ctx.lineWidth = 2;
    ctx.strokeRect(21, 22, w - 42, h - 44);
    ctx.font = 'italic 35px Georgia';
    ctx.fillText('Nell Finch', w / 2, 107);
    ctx.font = 'bold 66px Georgia';
    ctx.fillText('REPAIRS', w / 2, 213);
    ctx.beginPath(); ctx.moveTo(117, 249); ctx.lineTo(302, 249); ctx.stroke();
    ctx.font = '34px Georgia';
    ctx.fillText('Hinges & catches', w / 2, 319);
    ctx.fillText('Thread & tea', w / 2, 374);
    ctx.font = 'italic 29px Georgia';
    ctx.fillText('Come have a look', w / 2, 477);
  });
  const tilt = -.172;
  b.box(p.timber, x, .515, z, .514, .688, .058, 0, 0, tilt);
  b.plane(board, x, .515, z + .030, .459, .620, tilt);
  for (const xx of [x - .243, x + .243]) {
    b.rod(p.timberLight, [xx, .002, z + .090], [xx, .867, z - .06], .051, .055);
    b.rod(p.endgrain, [xx, .009, z - .30], [xx, .855, z - .059], .049, .050);
    b.rod(p.leather, [xx, .33, z + .031], [xx, .33, z - .204], .016, .027);
  }
  b.plane(contact, x, .008, z - .095, .80, .64, -Math.PI / 2);
  c.rect(x - .277, x + .277, z - .33, z + .115, 0, .87);
}

export function camp(b, p, c, contact) {
  b.section = 'road';
  ground(b);
  ruts(b);
  grass(b, p);
  b.section = 'camp fittings';
  hearth(b, p, c, contact);
  packedCamp(b, p, c, contact);
  sign(b, p, c, contact);
}
