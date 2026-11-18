import * as T from '../vendor/three.module.min.js';
import { mat, random, softShadowMaterial } from './materials.js';

const PI = Math.PI;
const X = [-PI / 2, 0, 0];
const OFF = { cast: false };
const BACK = [0, PI, 0];

function plankFloor(b, m, bounds, seed, weathered = false) {
  const rng = random(seed);
  const [x0, x1, z0, z1] = bounds;
  const shades = [m.boardA, m.boardB, m.boardC, m.boardD, m.boardA, m.boardB];
  const shadesOut = [m.weather, m.boardB, m.weather, m.boardA];
  const palette = weathered ? shadesOut : shades;
  b.box([(x0 + x1) / 2, -.13, (z0 + z1) / 2], [x1 - x0, .21, z1 - z0], m.beam);
  let x = x0, i = 0;
  while (x < x1 - .01) {
    const w = Math.min(.21 + rng() * .105, x1 - x);
    let z = z0;
    while (z < z1 - .01) {
      let length = Math.min(1.06 + rng() * 2.18, z1 - z);
      if (z1 - z - length < .22) length = z1 - z;
      b.box([x + w * .5, -.025 - rng() * .002, z + length * .5],
        [w - .005, .05, length - .006], palette[Math.floor(rng() * palette.length)],
        { grain: 2, repeat: 1.6, cast: false });
      for (const zz of [z + .066, z + length - .067]) {
        if (w < .12 || length < .32) continue;
        for (const xx of [x + .046, x + w - .046]) b.cylinder([xx, .001, zz], .007, .007, .004, m.blackIron, { segments: 6, cast: false });
      }
      if (!weathered && i % 4 === 0 && length > .55) {
        b.box([x + .015, .0001, z + length * .35], [.01, .0017, length * .39], m.wornEdge, OFF);
      }
      z += length;
    }
    x += w;
    i++;
  }
}

function walls(b, m) {
  const P = { repeat: .60 };
  const wall = (x, y, z, sx, sy, sz, material = m.wall) => b.box([x, y, z], [sx, sy, sz], material, P);
  wall(-4.135, 1.56, -.04, .22, 3.12, 7.03, m.westWall);
  wall(1.39, 1.56, -3.54, 11.31, 3.12, .22);
  wall(4.12, 1.56, -3.115, .23, 3.12, .72, m.mapWall);
  wall(4.12, 1.56, 1.42, .23, 3.12, 4.16);
  wall(4.12, 2.88, -1.70, .23, .48, 2.10);
  wall(6.965, 1.56, -1.52, .23, 3.12, 3.99, m.mapWall);
  wall(5.53, 1.56, .39, 2.80, 3.12, .22, m.mapWall);

  const openings = [[-3.39, -2.02, 1.04, 2.35], [-1.09, 1.09, 0, 2.39], [1.76, 3.25, 1.07, 2.35]];
  let cursor = -4.22;
  for (const [a, d, low, high] of openings) {
    wall((cursor + a) / 2, 1.56, 3.45, a - cursor, 3.12, .22);
    if (low > 0) wall((a + d) / 2, low / 2, 3.45, d - a, low, .22);
    wall((a + d) / 2, (high + 3.12) / 2, 3.45, d - a, 3.12 - high, .22);
    cursor = d;
  }
  wall((cursor + 4.22) / 2, 1.56, 3.45, 4.22 - cursor, 3.12, .22);

  for (const x of [-3.93, 3.91]) for (const z of [-3.37, 3.30]) {
    b.round([x, 1.55, z], [.19, 3.1, .21], m.beam, .014);
  }
  for (const x of [-1.77, 1.87]) b.round([x, 1.65, -3.389], [.16, 2.90, .12], m.timber, .012);
  for (const x of [-3.93, -1.14, 1.15, 3.91]) b.round([x, 1.62, 3.30], [.14, 2.98, .12], m.timber, .013);
  for (const z of [-2.75, -.65]) b.round([4.08, 1.36, z], [.36, 2.72, .15], m.timber, .018);
  b.round([4.06, 2.68, -1.70], [.41, .20, 2.26], m.beam, .022);
  for (const side of [-1, 1]) {
    b.beam([3.91, 2.32, -1.70 + 1.02 * side], [3.91, 2.66, -1.70 + .63 * side], .092, .12, m.trim, { bevel: .009 });
    b.beam([4.24, 2.32, -1.70 + 1.02 * side], [4.24, 2.66, -1.70 + .63 * side], .092, .12, m.trim, { bevel: .009 });
  }

  for (const [x, z, len, yaw] of [
    [-.83, -3.411, 6.35, 0], [2.90, -3.411, 2.18, 0], [5.53, -3.411, 2.78, 0],
    [-4.01, -.06, 6.84, PI / 2], [4.00, 1.35, 3.92, -PI / 2], [6.84, -1.63, 3.45, -PI / 2],
    [5.48, .26, 2.67, PI], [-2.64, 3.32, 2.88, PI], [2.64, 3.32, 2.88, PI],
  ]) b.placed([x, 0, z], yaw, () => {
    b.box([0, .083, 0], [len, .16, .068], m.timber);
    b.round([0, .177, .005], [len, .041, .083], m.trim, .009);
    b.box([0, .018, .008], [len, .035, .088], m.beam);
  });

  // Raised lime repairs and small patches of brick showing through.
  const repair = (pos, shape, matl, angles = [0, 0, 0]) => b.profile(shape, .007, matl, { pos, angles, cast: false });
  repair([1.95, .83, -3.426], [[0, 0], [.61, -.09], [1.20, -.02], [1.62, .31], [1.42, .77], [.94, .86], [.54, .72], [.21, .9], [.03, .55]], m.westWall);
  repair([-.97, 2.12, -3.425], [[-.66, .32], [-.39, .07], [-.12, .10], [-.02, .02], [.49, .19], [.55, .55], [.19, .63], [-.19, .55]], m.mapWall);
  repair([6.849, 2.12, -.66], [[-.74, .05], [-.48, -.26], [.25, -.19], [.66, .13], [.49, .55], [.11, .62], [-.41, .44]], m.westWall, [0, -PI / 2, 0]);
  repair([5.11, .19, -3.426], [[-.62, .16], [-.22, .03], [.42, .08], [.78, .25], [.65, .66], [.25, .59], [-.37, .72]], m.westWall);
  repair([-3.92, 2.35, 3.337], [[-.15, .16], [.19, .04], [.68, .19], [.64, .53], [.32, .69], [-.02, .45]], m.westWall, BACK);
  const exposed = [[.0, 0], [.24, -.035], [.44, .045], [.47, .2], [.65, .23], [.61, .40], [.39, .37], [.29, .55], [.05, .47], [-.13, .10]];
  repair([2.92, .27, -3.422], exposed, m.mortar);
  for (const [x, y, w] of [[3.07,.34,.23], [3.31,.36,.19], [3.15,.46,.22], [3.36,.48,.24], [3.08,.58,.17], [3.28,.60,.23], [3.13,.70,.15]]) {
    b.round([x, y, -3.409], [w, .088, .04], x > 3.3 ? m.stonePale : m.clay, .012, OFF);
  }
}

function entrance(b, m) {
  b.placed([-3.01, 0, -3.401], 0, () => {
    b.round([0, 1.102, -.003], [1.13, 2.20, .10], m.beam, .020);
    for (let i = 0; i < 6; i++) b.box([-.468 + i * .186, 1.089, .052], [.178, 2.16, .053], i % 2 ? m.painted : m.weather, { grain: 1 });
    for (const x of [-.591, .591]) b.round([x, 1.124, .055], [.143, 2.248, .147], m.trim, .018);
    b.round([0, 2.245, .054], [1.34, .178, .151], m.beam, .021);
    b.round([0, 2.337, .081], [1.45, .060, .13], m.trim, .013);
    for (const y of [.40, 1.82]) {
      b.round([0, y, .09], [1.02, .105, .062], m.timber, .012);
      b.profile([[-.53, -.032], [-.17, -.024], [-.095, 0], [-.17, .027], [-.53, .033]], .016, m.blackIron, { pos: [0, y, .119] });
      for (const x of [-.46, -.28, -.17]) b.ellipsoid([x, y, .139], [.013, .013, .009], m.iron, OFF);
    }
    b.round([.36, 1.03, .10], [.122, .20, .032], m.blackIron, .010);
    b.ellipsoid([.36, 1.083, .125], [.04,.032,.027], m.bronze);
    b.torus([.36, 1.032, .149], .046, .010, m.bronze, { sides: 18 });
    b.round([0, .024, .065], [1.18, .041, .23], m.wornEdge, .009);
  });
}

function windowsAndDoors(b, m) {
  for (const [left, right, low, high] of [[-3.39, -2.02, 1.04, 2.35], [1.76, 3.25, 1.07, 2.35]]) {
    const x = (left + right) / 2, w = right - left, y = (low + high) / 2;
    for (const xx of [left, right]) b.round([xx, y, 3.438], [.13, high - low + .17, .325], m.trim, .014);
    b.round([x, low, 3.429], [w + .27, .105, .46], m.wornEdge, .017);
    b.round([x, high, 3.435], [w + .25, .137, .32], m.beam, .017);
    b.round([x, high + .083, 3.305], [w + .38, .035, .112], m.trim, .007);
    b.round([x, y, 3.451], [.075, high - low, .097], m.timber, .012);
    b.round([x, y + .16, 3.451], [w, .067, .085], m.timber, .010);
    for (const end of [left + .14, right - .14]) {
      b.beam([end, high - .27, 3.45], [end + Math.sign(x - end) * .23, high - .038, 3.45], .051, .07, m.trim);
    }
    for (const s of [-1, 1]) b.placed([x + s * (w / 2 + .085), y, 3.583], s * -.17, () => {
      b.box([s * .22, 0, .006], [.45, high - low + .045, .068], m.painted);
      for (const xx of [.12,.24,.36]) b.box([s * xx, 0, .043], [.009, high - low, .008], m.timber, OFF);
      for (const yy of [-.44, .44]) b.round([s * .22, yy, .051], [.43, .075, .036], m.timber, .007);
    });
  }

  for (const x of [-1.095, 1.095]) {
    b.round([x, 1.19, 3.439], [.17, 2.42, .36], m.timber, .019);
    for (const z of [3.275, 3.608]) b.round([x, 1.194, z], [.209, 2.39, .047], m.trim, .007);
    for (const y of [.31, 1.84]) b.ellipsoid([x, y, 3.250], [.022, .023, .013], m.iron, OFF);
  }
  b.round([0, 2.422, 3.443], [2.37, .21, .41], m.beam, .019);
  b.round([0, 2.528, 3.295], [2.43, .055, .098], m.trim, .009);
  for (const side of [-1, 1]) {
    b.beam([side * 1.040, 2.12, 3.425], [side * .785, 2.381, 3.425], .105, .25, m.trim, { bevel: .012 });
    b.placed([side * 1.17, 0, 3.67], -side * .145, () => {
      b.round([side * .39, 1.2, .005], [.79, 2.31, .09], m.timber, .012);
      for (let k = 0; k < 5; k++) b.box([side * (.073 + .156 * k), 1.19, .055], [.148, 2.25, .042], m.painted, { grain: 1 });
      for (const y of [.30, 1.86, 2.255]) b.round([side * .39, y, .075], [.78, .104, .047], m.trim, .011);
      b.beam([side * .067, .34, .087], [side * .71, 1.83, .087], .105, .037, m.timber);
      b.torus([side * .67, 1.14, .103], .038, .009, m.blackIron, { sides: 16 });
    });
  }
  b.round([0, .017, 3.455], [2.04, .037, .38], m.wornEdge, .010);
}

function overhead(b, m) {
  for (let i = 0; i < 31; i++) {
    const z = -3.41 + i * .227;
    b.box([-.04, 3.023, z], [8.18, .137, .221], i % 5 ? m.timber : m.trim, { grain: 0 });
  }
  for (let i = 0; i < 17; i++) {
    b.box([5.48, 2.91, -3.38 + i * .224], [2.96, .19, .216], i % 3 ? m.timber : m.trim, { grain: 0 });
  }
  for (const z of [-3.30, -1.82, -.27, 1.26, 2.69, 3.31]) {
    b.round([-.02, 2.861, z], [8.24, .294, .224], m.beam, .021);
    for (const x of [-3.80, 3.80]) {
      b.round([x, 2.747, z], [.37, .12, .29], m.trim, .013);
      b.ellipsoid([x, 2.724, z - .153], [.026,.024,.014], m.blackIron, OFF);
    }
  }
  for (const x of [-3.94, 3.94, 6.79]) {
    const isAlcove = x > 4;
    b.round([x, isAlcove ? 2.78 : 2.80, isAlcove ? -1.54 : -.025], [.18, .21, isAlcove ? 3.85 : 6.92], m.beam, .018);
  }
  for (const z of [-3.28, -2.18, -.95, .20]) b.round([5.51, 2.762, z], [2.87, .224, .15], m.beam, .014);
}

function balcony(b, m) {
  const rng = random(1492);
  for (const x of [-3.68, -1.79, 1.79, 3.68]) {
    b.round([x, 1.398, 5.31], [.167, 2.805, .18], m.weather, .018);
    b.round([x, .136, 5.31], [.221, .255, .22], m.beam, .016);
    b.round([x, 2.62, 5.313], [.24, .15, .243], m.trim, .017);
    for (const side of [-1, 1]) if (Math.abs(x + .30 * side) < 3.72) {
      b.beam([x, 2.35, 5.314], [x + .42 * side, 2.75, 5.314], .089, .107, m.trim, { bevel: .009 });
    }
  }
  b.round([0, 2.752, 5.317], [7.63, .216, .22], m.beam, .016);
  b.round([0, 2.958, 3.56], [7.76, .214, .19], m.beam, .015);
  for (let i = 0; i < 20; i++) {
    const x = -3.73 + i * .394;
    b.beam([x, 2.967, 3.49], [x, 2.747, 5.54], .095, .143, m.weather, { bevel: .009 });
    b.round([x, 2.712, 5.505], [.112,.12,.21], m.trim, .012);
  }
  for (let i = 0; i < 10; i++) {
    const z = 3.53 + i * .23;
    b.box([0, 3.04 - i * .025, z], [7.84, .131, .223], i % 2 ? m.timber : m.weather, { grain: 0, angles: [-.108, 0, 0] });
  }
  b.round([0, 2.898, 5.615], [7.88, .137, .125], m.trim, .015);
  b.round([0, .993, 5.322], [7.47, .081, .166], m.wornEdge, .022);
  b.round([0, .221, 5.322], [7.46, .072, .123], m.beam, .009);
  for (let i = 0; i < 29; i++) {
    const x = -3.51 + i * .251;
    if (Math.abs(Math.abs(x) - 1.79) < .10) continue;
    b.round([x, .604, 5.322], [.069, .737, .083], i % 3 ? m.weather : m.trim, .009);
    if (i % 2 === 0) b.torus([x + .125, .653, 5.333], .086, .009, m.blackIron, { sides: 12 });
  }
  for (const s of [-1, 1]) {
    b.round([s * 3.71, .991, 4.43], [.153,.083,1.73], m.wornEdge, .022);
    b.round([s * 3.71, .220, 4.43], [.122,.08,1.72], m.beam, .014);
    for (let i = 0; i < 6; i++) {
      b.round([s * 3.71, .595, 3.71 + i * .28], [.08,.74,.075], m.weather, .013);
    }
    b.beam([s * 3.71, 2.32, 5.32], [s * 3.71, 2.79, 4.81], .10, .12, m.trim);
  }
  for (let i = 0; i < 50; i++) {
    const x = rng() * 7.44 - 3.72;
    const z = rng() * 1.7 + 3.53;
    b.box([x, .001, z], [.009,.002,.04 + rng() * .08], m.wornEdge, OFF);
  }
}

function horizon(scene, b, m) {
  const sky = new T.ShaderMaterial({
    side: T.BackSide, depthWrite: false, fog: false,
    uniforms: { sunDir: { value: new T.Vector3(-.47, .395, .79).normalize() } },
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * vec4(mat3(viewMatrix) * position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 sunDir;
      varying vec3 vDir;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
          mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
      }
      void main() {
        vec3 d = normalize(vDir);
        float level = max(d.y, 0.0);
        float sun = max(dot(d, sunDir), 0.0);
        vec3 base = mix(vec3(0.80, 0.59, 0.38), vec3(0.19, 0.34, 0.46), smoothstep(0.00, 0.78, level));
        base += vec3(1.0, 0.46, 0.10) * pow(sun, 18.0) * .30;
        vec2 p = vec2(atan(d.x, d.z) * 5.6 + d.y * 7.0, d.y * 22.0);
        float cloud = .57 * noise(p) + .28 * noise(p * 2.24) + .15 * noise(p * 4.65);
        float soft = smoothstep(.49, .75, cloud) * smoothstep(-.02, .21, d.y) * (1.0 - smoothstep(.45, .87, d.y));
        base = mix(base, vec3(1.05, .77, .53), soft * .59);
        base += vec3(3.0, 1.8, .79) * smoothstep(.99825, .99878, sun);
        gl_FragColor = vec4(base, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const dome = new T.Mesh(new T.SphereGeometry(104, 28, 18), sky);
  dome.frustumCulled = false;
  dome.renderOrder = 1000;
  scene.add(dome);

  const rng = random(597);
  const distant = [
    [62, -1.9, 5.3, '#92918a'], [48, -1.7, 4.8, '#82877a'], [36, -2.3, 4.8, '#727d6c'],
    [26, -3.7, 4.4, '#68775d'], [20, -4.5, 3.8, '#657051'],
  ];
  for (let layer = 0; layer < distant.length; layer++) {
    const [depth, high, amplitude, color] = distant[layer];
    const r = rng() * 7;
    const hill = (u) => high + Math.sin(u * 15 + r) * amplitude * .48 +
      Math.sin(u * 36 + r * .5) * amplitude * .16 + Math.cos(u * 69 + layer) * .22;
    const material = new T.MeshBasicMaterial({ color, side: T.DoubleSide });
    const curveX = (u) => (u - .5) * depth * 2.5;
    b.sheet(76, 1, (u, v) => [curveX(u), -18 + v * (18 + hill(u)), depth + Math.sin(u * 6) * 2.3], material, { cast: false, receive: false });
    if (layer < 2) continue;
    const silhouettes = [new T.MeshBasicMaterial({ color: layer === 2 ? '#687669' : '#53614d' }), new T.MeshBasicMaterial({ color: layer === 2 ? '#707d6b' : '#5a684f' })];
    for (let i = 0; i < 65; i++) {
      const u = .16 + rng() * .69;
      const h = .28 + Math.pow(rng(), 1.4) * .92;
      b.cylinder([curveX(u), hill(u) - .10 + h * .38, depth + Math.sin(u * 6) * 2.3 - .12], 0, h * .29, h,
        silhouettes[i % 2], { segments: 5, cast: false, receive: false });
    }
  }

  groundBelow(b,m);

  // Only the nearby roofs are visible from the upper floor.
  for (const [x, y, z, w, d, yaw] of [[-6.0, -1.74, 11.3, 3.8, 3.2, .14], [7.6, -1.85, 14.8, 4.6, 3.8, -.31], [1.4, -2.9, 17.5, 3.4, 3.0, .25]]) {
    b.placed([x, y, z], yaw, () => {
      b.box([0, -1.4, 0], [w, 2.8, d], m.outside, OFF);
      b.profile([[-w / 2, 0], [0, w * .32], [w / 2, 0]], d, m.outside, { pos: [0, 0, -d / 2], cast: false });
      for (const side of [-1, 1]) {
        b.beam([0, w * .32, 0], [side * (w / 2 + .15), -.06, 0], .13, d + .29, m.roof, OFF);
        for (let i = 1; i < 8; i++) {
          const u = i / 8;
          b.box([side * (w / 2 + .15) * u, w * .32 * (1 - u) + .035, 0], [.043, .05, d + .32], m.clay, OFF);
        }
      }
      b.box([-.22 * w, .87, .33], [.36, 1.40, .38], m.exteriorStone, OFF);
      b.box([-.22 * w, 1.57, .33], [.46, .103, .49], m.stoneDark, OFF);
    });
  }
}

function groundBelow(b,m) {
  const quiet = { cast: false, receive: false };
  b.box([.04,-1.83,3.31],[8.44,3.36,.37],m.outside,{...quiet,repeat:.70});
  b.round([.04,-.259,3.65],[8.44,.218,.212],m.beam,.019,quiet);
  b.round([.04,-.473,3.53],[8.44,.084,.089],m.trim,.011,quiet);
  b.round([0,-.263,5.402],[7.55,.230,.170],m.beam,.022,quiet);
  for (const x of [-3.64,-1.79,1.79,3.64]) {
    b.beam([x,-1.400,3.548],[x,-.300,5.28],.19,.17,m.weather,{...quiet,bevel:.016});
    b.round([x,-.910,3.51],[.19,1.449,.18],m.timber,.016,quiet);
  }
  const rng = random(1793);
  const ground = mat('#888061');
  b.sheet(21,20,(u,v)=>[(u-.5)*72,-3.53+.13*Math.sin(u*19)*Math.sin(v*15),3.25+v*39],ground,quiet);
  const lane = mat('#b19574');
  b.sheet(11,26,(u,v)=>[(u-.5)*(2.8+1.6*v)+3.6*Math.sin(v*3.2),-3.371+.012*Math.sin(u*17+v*22),3.44+v*26.0],lane,quiet);
  for (let i=0;i<38;i++) {
    const x=(rng()-.5)*27, z=7.7+rng()*14.5;
    if (Math.abs(x-3.6*Math.sin((z-3.44)*3.2/26))<2.8) continue;
    const r=.16+.44*rng(), h=.09+.09*rng();
    b.ellipsoid([x,-3.395,z],[r,h,r*.67],i%3?m.exteriorStone:m.weather,quiet);
  }
}

export function buildRoom(scene, b, m) {
  plankFloor(b, m, [-4.08, 4.10, -3.48, 3.47], 403);
  plankFloor(b, m, [4.10, 6.90, -3.48, .39], 204);
  plankFloor(b, m, [-3.77, 3.77, 3.47, 5.43], 190, true);
  walls(b, m);
  entrance(b, m);
  windowsAndDoors(b, m);
  overhead(b, m);
  balcony(b, m);
  horizon(scene, b, m);
  const shadow = softShadowMaterial();
  const f = [0, PI, 0];
  for (const [x, y, z, w, h, angles] of [
    [.72,.003,-2.24,2.24,2.86,X], [-2.84,.019,1.61,1.56,1.60,X],
    [-1.84,.006,.55,1.47,1.37,X], [5.74,.003,-2.91,2.45,1.26,X],
    [3.62,.003,1.61,1.01,1.79,X], [-2.80,.003,3.03,2.16,.89,X],
    [2.63,.003,3.06,1.61,.82,X], [2.60,.003,5.08,1.84,.68,X],
    [-2.78,1.58,3.329,1.7,1.83,f], [.72,1.08,-3.426,2.23,1.63,[0,0,0]],
  ]) b.plane([x, y, z], [w, h], shadow, { angles, receive: false });
}
