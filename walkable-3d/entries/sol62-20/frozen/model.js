import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const yAxis = new T.Vector3(0, 1, 0);

export function rng(seed = 1234567) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function paintedTexture(w, h, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  draw(canvas.getContext('2d'), w, h);
  const map = new T.CanvasTexture(canvas);
  map.colorSpace = T.SRGBColorSpace;
  map.anisotropy = 4;
  return map;
}

function grainTexture(worn) {
  return paintedTexture(512, 128, (ctx, w, h) => {
    const rand = rng(worn ? 331 : 927);
    const image = ctx.createImageData(w, h);
    const bands = Array.from({length: 152}, () => rand() * 18);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const fiber = y + Math.sin(x * .014 + y * .095) * 2.4 + Math.sin(x * .037 - y * .13) * .5 + 6;
        const row = Math.floor(fiber);
        const fine = T.MathUtils.lerp(bands[row], bands[row + 1], fiber - row);
        const v = 247 - fine - rand() * 8 - 5 * Math.sin(fiber * .45);
        const i = (y * w + x) * 4;
        image.data.set([v, v - 2, v - 5, 255], i);
      }
    }
    ctx.putImageData(image, 0, 0);
    for (let i = 0; i < (worn ? 112 : 45); i++) {
      const x = rand() * w;
      const y = rand() * h;
      const length = 6 + rand() ** 2 * 120;
      ctx.strokeStyle = rand() < .62 ? 'rgba(69,43,35,.16)' : 'rgba(255,244,217,.32)';
      ctx.lineWidth = rand() * 1.45 + .25;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x + length * .25, y - 1, x + length * .57, y + 1, x + length, y);
      ctx.stroke();
    }
    if (worn) {
      for (const [x, y, size] of [[112, 47, 10], [376, 87, 18]]) {
        for (let s = 1; s < 5; s++) {
          ctx.strokeStyle = 'rgba(75,54,42,.15)';
          ctx.beginPath();
          ctx.ellipse(x, y, size * s / 3, s * 1.4, -.07, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }
  });
}

export function weaveTexture() {
  return paintedTexture(128, 128, (ctx, w, h) => {
    const rand = rng(615);
    const image = ctx.createImageData(w, h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const v = 224 + (x % 3 === 0 ? 7 : 0) + (y % 3 === 0 ? 8 : 0) + rand() * 14;
        image.data.set([v, v - 3, v - 5, 255], (y * w + x) * 4);
      }
    }
    ctx.putImageData(image, 0, 0);
  });
}

export function surfaceMaterial(color, options = {}) {
  return new T.MeshStandardMaterial({color, roughness: .83, ...options});
}

function leatherTexture() {
  return paintedTexture(256, 128, (ctx, w, h) => {
    const rand = rng(11831);
    ctx.fillStyle = '#eee4d9';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 3400; i++) {
      ctx.fillStyle = i % 2 ? '#7d4c3329' : '#fff8e838';
      const x = rand() * w, y = rand() * h, size = rand() * 1.45 + .5;
      ctx.fillRect(x, y, size, size * .87);
    }
    for (let i = 0; i < 169; i++) {
      const x = rand() * w, y = rand() * h;
      ctx.strokeStyle = i % 3 ? '#6143333b' : '#fff5e04a';
      ctx.lineWidth = rand() * .67 + .3;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + rand() * 6, y + 2, x + rand() * 14, y - 2 + rand() * 8);
      ctx.stroke();
    }
  });
}

export function palette() {
  const wood = grainTexture(true);
  const paint = grainTexture(false);
  const weave = weaveTexture();
  const leather = leatherTexture();
  const family = (name, c, setup) => {
    const mat = surfaceMaterial(c, setup);
    mat.userData.batchFamily = name;
    return mat;
  };
  const board = (c) => family('timber', c, {map: wood});
  const painted = (c) => family('painted', c, {map: paint});
  const cloth = (c) => family('woven', c, {map: weave, roughness: 1});
  const metal = (c, r = .66) => family('metal-' + r, c, {metalness: .38, roughness: r});
  return {
    timber: board('#91614a'), timberLight: board('#b38459'), endgrain: board('#725047'),
    darkWood: board('#513d32'), honey: board('#c19a6a'), warmPly: board('#d5aa76'),
    floor: ['#986e50', '#a47a5a', '#a17c60', '#b18660', '#976d54'].map(board),
    inside: ['#d9b186', '#dfb98c', '#d8ad7c', '#cda477'].map(board),
    teal: ['#32665d', '#376b60', '#36655d', '#396e65', '#32625a'].map(painted),
    tealDeep: painted('#244941'), spruce: painted('#214039'), faded: painted('#729583'),
    trim: painted('#e1b97c'), chalk: painted('#f3d8a5'), ochre: painted('#b47b48'),
    red: painted('#884b40'), wine: painted('#6c433a'), seam: surfaceMaterial('#40362c'),
    brass: metal('#c29352', .48), brassDark: metal('#7c5938'), iron: metal('#434542'),
    ironLight: metal('#747b72'), blackIron: metal('#2b302f'), roof: surfaceMaterial('#304d49', {map: paint, roughness: .72, metalness: .25}),
    roofLight: metal('#53675a'), tin: metal('#aaa89c', .42), tinDark: metal('#626560'),
    copper: metal('#ae704a', .59), soot: surfaceMaterial('#3d3932'),
    leather: family('leather', '#6c3e30', {map: leather, roughness: .88}),
    leatherLight: family('leather', '#ac714a', {map: leather, roughness: .88}),
    cream: cloth('#eddbab'), flax: cloth('#caaa78'), quilt: cloth('#567e79'),
    cloth: ['#a45647', '#c49654', '#6c8b83', '#b9a88a', '#75835e', '#817487'].map(cloth),
    stitch: cloth('#e9d1a4'), threadDark: cloth('#8c654a'), paper: surfaceMaterial('#e9d3a7'),
    book: painted('#687d66'), bookRed: painted('#9c544c'), bookBlue: painted('#587375'),
    ceramic: surfaceMaterial('#e4d5bd', {roughness: .38}), darkCeramic: surfaceMaterial('#946450', {roughness: .57}),
    glassBrown: surfaceMaterial('#8b5730', {roughness: .27, metalness: .09}),
    glassGreen: surfaceMaterial('#526d55', {roughness: .27, metalness: .10}),
    glassBlue: surfaceMaterial('#70928f', {roughness: .25, metalness: .10}),
    cork: board('#ab825b'), lamp: surfaceMaterial('#edb96a', {emissive: '#ed9e4e', emissiveIntensity: .75, roughness: .42}),
    corkDark: board('#886247'), rope: cloth('#9c7c4f'), mat: cloth('#79614a'),
    stone: ['#a29378', '#8f8c79', '#9b8273', '#b0a28b', '#797a68'].map(c => surfaceMaterial(c)),
    slate: surfaceMaterial('#38403c'), twig: board('#76634a'),
  };
}

export function decalMaterial(w, h, draw) {
  return surfaceMaterial('#ffffff', {map: paintedTexture(w, h, draw), roughness: .93});
}

export class Model {
  constructor(scene) {
    this.scene = scene;
    this.batches = new Map();
    this.geometries = new Map();
    this.section = 'wagon';
    this.boxShape = new T.BoxGeometry(1, 1, 1);
    this.planeShape = new T.PlaneGeometry(1, 1);
    this.worldUp = yAxis;
  }

  geometry(key, create) {
    if (!this.geometries.has(key)) this.geometries.set(key, create());
    return this.geometries.get(key);
  }

  part(geom, mat, position, size = [1, 1, 1], rotation = [0, 0, 0], shadow = true) {
    const quat = rotation instanceof T.Quaternion
      ? rotation
      : new T.Quaternion().setFromEuler(new T.Euler(...rotation));
    const matrix = new T.Matrix4().compose(
      new T.Vector3(...position), quat, new T.Vector3(...size),
    );
    const family = mat.userData.batchFamily;
    const key = [this.section, family ?? mat.id, +(geom.index != null), +shadow].join('/');
    if (!this.batches.has(key)) this.batches.set(key, {mat, family, shadow, parts: []});
    this.batches.get(key).parts.push({geom, matrix, color: mat.color});
  }

  box(mat, x, y, z, w, h, d, ry = 0, rz = 0, rx = 0, shadow = true) {
    this.part(this.boxShape, mat, [x, y, z], [w, h, d], [rx, ry, rz], shadow);
  }

  plane(mat, x, y, z, w, h, rx = 0, ry = 0, rz = 0, shadow = false) {
    this.part(this.planeShape, mat, [x, y, z], [w, h, 1], [rx, ry, rz], shadow);
  }

  cylinder(mat, x, y, z, top, bottom, h, axis = 'y', sides = 14, shadow = true) {
    const geom = this.geometry('c' + [top, bottom, sides].join(','), () =>
      new T.CylinderGeometry(top, bottom, 1, sides));
    const rot = axis === 'x' ? [0, 0, -Math.PI / 2] : axis === 'z' ? [Math.PI / 2, 0, 0] : [0, 0, 0];
    this.part(geom, mat, [x, y, z], [1, h, 1], rot, shadow);
  }

  oval(mat, x, y, z, w, h, d, rot = [0, 0, 0], shadow = true) {
    const geom = this.geometry('sphere', () => new T.SphereGeometry(1, 12, 8));
    this.part(geom, mat, [x, y, z], [w, h, d], rot, shadow);
  }

  stone(mat, x, y, z, w, h, d, heading) {
    const geom = this.geometry('stone', () => new T.IcosahedronGeometry(1, 0));
    this.part(geom, mat, [x, y, z], [w, h, d], [.12, heading, .28]);
  }

  torus(mat, x, y, z, radius, tube, axis = 'z', segments = 36, shadow = true) {
    const geom = this.geometry('t' + [radius, tube, segments].join(','), () =>
      new T.TorusGeometry(radius, tube, 8, segments));
    const rot = axis === 'x' ? [0, Math.PI / 2, 0] : axis === 'y' ? [Math.PI / 2, 0, 0] : [0, 0, 0];
    this.part(geom, mat, [x, y, z], [1, 1, 1], rot, shadow);
  }

  rod(mat, a, b, w, d = w, rounded = false, shadow = true) {
    const av = new T.Vector3(...a);
    const bv = new T.Vector3(...b);
    const delta = bv.clone().sub(av);
    const length = delta.length();
    if (length < .00005) return;
    const rot = new T.Quaternion().setFromUnitVectors(this.worldUp, delta.normalize());
    const pos = av.add(bv).multiplyScalar(.5).toArray();
    const geom = rounded
      ? this.geometry('roundRod', () => new T.CylinderGeometry(.5, .5, 1, 8))
      : this.boxShape;
    this.part(geom, mat, pos, [w, length, d], rot, shadow);
  }

  curvedRod(mat, points, diameter, rounded = true, shadow = true) {
    for (let i = 1; i < points.length; i++) this.rod(mat, points[i - 1], points[i], diameter, diameter, rounded, shadow);
  }

  grid(mat, columns, rows, points, shadow = true) {
    const positions = [];
    const uvs = [];
    const faces = [];
    for (let j = 0; j <= rows; j++) {
      for (let i = 0; i <= columns; i++) {
        positions.push(...points(i / columns, j / rows));
        uvs.push(i / columns, j / rows);
        if (i < columns && j < rows) {
          const a = j * (columns + 1) + i;
          const c = a + columns + 1;
          faces.push(a, a + 1, c, c, a + 1, c + 1);
        }
      }
    }
    this.mesh(mat, positions, uvs, faces, shadow);
  }

  mesh(mat, positions, uvs, faces, shadow = true) {
    const geom = new T.BufferGeometry();
    geom.setAttribute('position', new T.Float32BufferAttribute(positions, 3));
    geom.setAttribute('uv', new T.Float32BufferAttribute(uvs, 2));
    geom.setIndex(faces);
    geom.computeVertexNormals();
    this.part(geom, mat, [0, 0, 0], [1, 1, 1], [0, 0, 0], shadow);
  }

  finish() {
    const combinedMaterials = new Map();
    for (const [key, {mat, family, shadow, parts}] of this.batches) {
      const instanced = parts.length > 6 && parts.every(item => item.geom === parts[0].geom);
      const combineColors = family && parts.some(item => !item.color.equals(mat.color));
      let material = mat;
      if (combineColors) {
        const familyKey = family + (instanced ? '-instances' : '-vertices');
        if (!combinedMaterials.has(familyKey)) {
          const newMat = mat.clone();
          newMat.color.setHex(0xffffff);
          newMat.vertexColors = !instanced;
          newMat.name = familyKey;
          combinedMaterials.set(familyKey, newMat);
        }
        material = combinedMaterials.get(familyKey);
      }
      if (instanced) {
        const mesh = new T.InstancedMesh(parts[0].geom, material, parts.length);
        parts.forEach(({matrix, color}, i) => {
          mesh.setMatrixAt(i, matrix);
          if (combineColors) mesh.setColorAt(i, color);
        });
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        mesh.computeBoundingSphere();
        mesh.castShadow = shadow;
        mesh.receiveShadow = true;
        mesh.name = key;
        this.scene.add(mesh);
        continue;
      }
      const running = parts.map(({geom, matrix, color}) => {
        const transformed = geom.clone().applyMatrix4(matrix);
        transformed.clearGroups();
        if (combineColors) {
          const colors = new Float32Array(transformed.attributes.position.count * 3);
          for (let i = 0; i < colors.length; i += 3) color.toArray(colors, i);
          transformed.setAttribute('color', new T.BufferAttribute(colors, 3));
        }
        return transformed;
      });
      const geometry = running.length === 1 ? running[0] : mergeGeometries(running);
      if (!geometry) throw new Error('Unable to batch geometry for ' + key);
      geometry.computeBoundingSphere();
      const mesh = new T.Mesh(geometry, material);
      mesh.castShadow = shadow;
      mesh.receiveShadow = true;
      mesh.name = key;
      this.scene.add(mesh);
      if (running.length > 1) running.forEach(geom => geom.dispose());
    }
    this.batches.clear();
  }
}

export function nail(b, p, x, y, z, r = .018, axis = 'z') {
  b.cylinder(p.iron, x, y, z, r, r, .015, axis, 8, false);
}

export function softContact(warm = false) {
  return new T.MeshBasicMaterial({
    map: paintedTexture(64, 64, ctx => {
      const g = ctx.createRadialGradient(32, 32, 1, 32, 32, 31);
      g.addColorStop(0, warm ? 'rgba(75,48,31,.38)' : 'rgba(47,36,29,.59)');
      g.addColorStop(.48, warm ? 'rgba(75,48,31,.20)' : 'rgba(47,36,29,.37)');
      g.addColorStop(1, 'rgba(60,41,28,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
    }),
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });
}
