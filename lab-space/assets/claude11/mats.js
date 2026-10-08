import * as THREE from 'three';

export function makeMaterials(T, atlasTex) {
  const std = (o, tex, extra = {}) => {
    const m = new THREE.MeshStandardMaterial({ ...(tex || {}), ...o });
    Object.assign(m.userData, extra);
    return m;
  };
  const basic = (color, extra = {}) => {
    const m = new THREE.MeshBasicMaterial({ color });
    Object.assign(m.userData, { cast: false, receive: false, ...extra });
    return m;
  };
  const paint = (color, rough = 0.5, extra) => std({ color, roughness: rough, metalness: 0.0, normalScale: new THREE.Vector2(0.35, 0.35) }, T.paint, extra);
  const metal = (color, rough = 0.35) => std({ color, metalness: 1.0, roughness: rough, normalScale: new THREE.Vector2(0.25, 0.25) }, T.brushed);

  const M = {
    floor: std({ color: 0xffffff, roughness: 1, metalness: 0, normalScale: new THREE.Vector2(0.6, 0.6) }, T.floor, { cast: false }),
    vinyl: std({ color: 0xffffff, roughness: 1, metalness: 0 }, T.vinyl, { cast: false }),
    ribRubber: std({ color: 0xffffff, roughness: 1, metalness: 0, normalScale: new THREE.Vector2(0.6, 0.6) }, T.ribRubber, { cast: false }),
    wall: std({ color: 0xe9e7e1, roughness: 0.85, normalScale: new THREE.Vector2(0.5, 0.5) }, T.wall),
    wallAccent: std({ color: 0x4f6878, roughness: 0.7, normalScale: new THREE.Vector2(0.5, 0.5) }, T.wall),
    ceiling: std({ color: 0xf2f2f0, roughness: 0.95 }, T.ceiling, { cast: false }),
    skirting: std({ color: 0x2a2c2f, roughness: 0.8 }, T.rubber),

    steel: metal(0xc8ccd1, 0.32),
    steelDark: metal(0x6d7279, 0.42),
    alu: metal(0xd6d9dd, 0.45),
    chrome: std({ color: 0xe8eaec, metalness: 1, roughness: 0.12 }),
    anodBlack: std({ color: 0x232529, metalness: 0.6, roughness: 0.42 }, T.brushed),
    brass: std({ color: 0xc9a25a, metalness: 1, roughness: 0.35 }, T.brushed),

    paintWhite: paint(0xe8e8e3, 0.42),
    paintGrey: paint(0x53595f, 0.5),
    paintDark: paint(0x2b2e33, 0.55),
    paintBlue: paint(0x2d5f8c, 0.45),
    paintTeal: paint(0x2f7f7a, 0.45),
    paintYellow: paint(0xe0b020, 0.45),
    paintOrange: paint(0xd7642a, 0.42),
    paintRed: paint(0xb3261e, 0.42),
    paintGreen: paint(0x3d7a4a, 0.5),
    paintCream: paint(0xd9d2c0, 0.55),

    rubber: std({ color: 0x1d1e20, roughness: 0.85, metalness: 0 }, T.rubber),
    cableBlue: std({ color: 0x2f6fb0, roughness: 0.6 }, T.rubber),
    cableOrange: std({ color: 0xd2662a, roughness: 0.6 }, T.rubber),
    cableGrey: std({ color: 0x8c9196, roughness: 0.65 }, T.rubber),
    cableYellow: std({ color: 0xd8b525, roughness: 0.6 }, T.rubber),
    plastic: std({ color: 0x3a3d42, roughness: 0.55 }),
    plasticLight: std({ color: 0xc8c9c4, roughness: 0.5 }),

    worktop: std({ color: 0xffffff, roughness: 1, metalness: 0 }, T.worktop),
    laminate: std({ color: 0xffffff, roughness: 1, metalness: 0 }, T.laminate),
    hazard: std({ color: 0xffffff, roughness: 0.6 }, T.hazard, { cast: false }),
    perf: std({ color: 0xffffff, roughness: 0.45, metalness: 0.7, normalScale: new THREE.Vector2(0.5, 0.5) }, T.perf),
    floorPaintY: std({ color: 0xd9ad22, roughness: 0.55 }, null, { cast: false }),
    floorPaintW: std({ color: 0xe6e6e0, roughness: 0.55 }, null, { cast: false }),
    paper: std({ color: 0xf4f2ea, roughness: 0.9 }),
    cardboard: std({ color: 0xb08a5a, roughness: 0.9 }),
    calGrey: std({ color: 0x8a8a8a, roughness: 0.9 }),

    // Optical glass: lenses are opaque dark-coated glass (cheap), panels are thin transparent sheets.
    lens: std({ color: 0x0a1018, metalness: 0.2, roughness: 0.04, envMapIntensity: 2.2 }),
    lensCoat: std({ color: 0x2a1a48, metalness: 0.6, roughness: 0.06, envMapIntensity: 2.0 }),
    glass: std({ color: 0xcfe3ea, metalness: 0.0, roughness: 0.05, transparent: true, opacity: 0.16, depthWrite: false, envMapIntensity: 1.6 }, null, { cast: false, receive: false }),
    glassTint: std({ color: 0x9fb8c0, metalness: 0.0, roughness: 0.08, transparent: true, opacity: 0.22, depthWrite: false, envMapIntensity: 1.4 }, null, { cast: false, receive: false }),

    lightPanel: basic(0xfffcf4),
    ledGreen: basic(0x3dff7a),
    ledAmber: basic(0xffb020),
    ledRed: basic(0xff2a1a),
    ledBlue: basic(0x3aa0ff),
    ledCyan: basic(0x7ff6ff),
    ledWhite: basic(0xf4f8ff),
    screenOff: std({ color: 0x07090b, roughness: 0.15, metalness: 0.3 }),

    label: std({ map: atlasTex, roughness: 0.55, metalness: 0 }, null, { uv: 'keep', cast: false }),
    labelCut: std({ map: atlasTex, roughness: 0.6, metalness: 0, alphaTest: 0.5 }, null, { uv: 'keep', cast: false }),
    labelGlow: new THREE.MeshBasicMaterial({ map: atlasTex }),
  };
  Object.assign(M.labelGlow.userData, { uv: 'keep', cast: false, receive: false });
  M.lightPanel.toneMapped = false;
  M.glass.side = THREE.DoubleSide;
  M.glassTint.side = THREE.DoubleSide;
  return M;
}
