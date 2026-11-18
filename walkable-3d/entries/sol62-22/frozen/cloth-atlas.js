import * as THREE from 'three';
import { material, texture } from './geometry.js';

const TILE = 192;
const GUTTER = 8;
const IMAGE = TILE - 2 * GUTTER;

const finishes = {
  silk: { columns: 6, rows: 5, roughness: .37, metalness: .075 },
  velvet: { columns: 4, rows: 2, roughness: .85, metalness: .013 },
  woven: { columns: 8, rows: 6, roughness: .91, metalness: .014 },
};

function makePage(renderer, finish) {
  const { columns, rows, roughness, metalness } = finish;
  const width = TILE * columns, height = TILE * rows;
  let canvasContext;
  const map = texture(width, height, ctx => {
    canvasContext = ctx;
    ctx.imageSmoothingQuality = 'high';
  }, renderer);
  const mat = material('#ffffff', roughness, { map, side: THREE.DoubleSide, metalness });
  const tileScale = { value: new THREE.Vector2(IMAGE / width, IMAGE / height) };
  mat.onBeforeCompile = shader => {
    shader.uniforms.clothTileScale = tileScale;
    shader.vertexShader = [
      'attribute vec2 clothOrigin;',
      'varying vec2 vClothOrigin;',
      shader.vertexShader.replace('#include <uv_vertex>', '#include <uv_vertex>\nvClothOrigin = clothOrigin;'),
    ].join('\n');
    shader.fragmentShader = [
      'varying vec2 vClothOrigin;',
      'uniform vec2 clothTileScale;',
      shader.fragmentShader.replace('#include <map_fragment>', [
        'vec2 fabricUV = vClothOrigin + fract(vMapUv) * clothTileScale;',
        'vec2 fabricDx = dFdx(vMapUv) * clothTileScale;',
        'vec2 fabricDy = dFdy(vMapUv) * clothTileScale;',
        'diffuseColor *= textureGrad(map, fabricUV, fabricDx, fabricDy);',
      ].join('\n')),
    ].join('\n');
  };
  mat.customProgramCacheKey = () => 'meridian-repeat-textiles';
  return { mat, map, canvasContext, width, height, columns, count: 0, capacity: columns * rows };
}

function pack(page, source) {
  const x = (page.count % page.columns) * TILE + GUTTER;
  const y = Math.floor(page.count / page.columns) * TILE + GUTTER;
  const edge = Math.round(source.width * GUTTER / IMAGE);
  // Wrap the opposite edges into the gutters so minification stays inside the swatch.
  const ranges = origin => [
    [source.width - edge, edge, origin - GUTTER, GUTTER],
    [0, source.width, origin, IMAGE],
    [0, edge, origin + IMAGE, GUTTER],
  ];
  for (const [sx, sw, dx, dw] of ranges(x)) {
    for (const [sy, sh, dy, dh] of ranges(y)) {
      page.canvasContext.drawImage(source, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }
  page.count++;
  page.map.needsUpdate = true;
  return { atlasMaterial: page.mat, tileOrigin: [x / page.width, 1 - (y + IMAGE) / page.height] };
}

export function clothLibrary(renderer, paintSwatch) {
  const pages = new Map(), swatches = new Map();
  return (name, kind = 'linen') => {
    const key = name + '/' + kind;
    if (!swatches.has(key)) {
      const finish = kind === 'silk' || kind === 'moire' ? 'silk' : kind === 'velvet' ? 'velvet' : 'woven';
      let page = pages.get(finish);
      if (!page || page.count === page.capacity) {
        page = makePage(renderer, finishes[finish]);
        pages.set(finish, page);
      }
      const tile = paintSwatch(name, kind, renderer);
      swatches.set(key, pack(page, tile.image));
      tile.dispose();
    }
    return swatches.get(key);
  };
}

