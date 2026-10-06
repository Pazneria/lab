// An intentionally simple engineering fixture, not a CharacterBench entrant.
// The same local import and validation path is used for this generated GLB.
export function calibrationFile() {
  const positions = [], normals = [], indices = [];
  const faces = [
    [[1, 0, 0], [[.5, -.5, .5], [.5, -.5, -.5], [.5, .5, -.5], [.5, .5, .5]]],
    [[-1, 0, 0], [[-.5, -.5, -.5], [-.5, -.5, .5], [-.5, .5, .5], [-.5, .5, -.5]]],
    [[0, 1, 0], [[-.5, .5, .5], [.5, .5, .5], [.5, .5, -.5], [-.5, .5, -.5]]],
    [[0, -1, 0], [[-.5, -.5, -.5], [.5, -.5, -.5], [.5, -.5, .5], [-.5, -.5, .5]]],
    [[0, 0, 1], [[-.5, -.5, .5], [.5, -.5, .5], [.5, .5, .5], [-.5, .5, .5]]],
    [[0, 0, -1], [[.5, -.5, -.5], [-.5, -.5, -.5], [-.5, .5, -.5], [.5, .5, -.5]]],
  ];
  for (const [normal, vertices] of faces) { const start = positions.length / 3; for (const vertex of vertices) { positions.push(...vertex); normals.push(...normal); } indices.push(start, start + 1, start + 2, start, start + 2, start + 3); }
  const p = new Float32Array(positions), n = new Float32Array(normals), i = new Uint16Array(indices);
  const binary = new Uint8Array(p.byteLength + n.byteLength + i.byteLength); binary.set(new Uint8Array(p.buffer)); binary.set(new Uint8Array(n.buffer), p.byteLength); binary.set(new Uint8Array(i.buffer), p.byteLength + n.byteLength);
  const parts = [
    ['Head', [0, 1.77, 0], [.35, .35, .33], 0], ['Torso', [0, 1.23, 0], [.53, .62, .3], 0],
    ['Left arm', [-.5, 1.15, 0], [.19, .65, .2], 1], ['Right arm', [.5, 1.15, 0], [.19, .65, .2], 1],
    ['Left leg', [-.18, .54, 0], [.22, .73, .23], 0], ['Right leg', [.18, .54, 0], [.22, .73, .23], 0],
    ['Left foot', [-.18, .08, .075], [.25, .16, .4], 2], ['Right foot', [.18, .08, .075], [.25, .16, .4], 2],
    ['Front marker', [0, 1.32, .161], [.14, .16, .025], 2],
  ];
  const json = { asset: { version: '2.0', generator: 'CharacterBench calibration fixture — not an entrant' }, scene: 0,
    scenes: [{ nodes: parts.map((_, index) => index) }],
    nodes: parts.map(([name, translation, scale, mesh]) => ({ name, translation, scale, mesh })),
    meshes: [0, 1, 2].map(material => ({ primitives: [{ attributes: { POSITION: 0, NORMAL: 1 }, indices: 2, material }] })),
    materials: [
      { name: 'Matte ceramic', pbrMetallicRoughness: { baseColorFactor: [.54, .61, .48, 1], metallicFactor: 0, roughnessFactor: .65 } },
      { name: 'Brushed metal', pbrMetallicRoughness: { baseColorFactor: [.47, .52, .46, 1], metallicFactor: 1, roughnessFactor: .3 } },
      { name: 'Terracotta marker', pbrMetallicRoughness: { baseColorFactor: [.65, .25, .12, 1], metallicFactor: 0, roughnessFactor: .4 } },
    ], buffers: [{ byteLength: binary.length }],
    bufferViews: [{ buffer: 0, byteOffset: 0, byteLength: p.byteLength }, { buffer: 0, byteOffset: p.byteLength, byteLength: n.byteLength }, { buffer: 0, byteOffset: p.byteLength + n.byteLength, byteLength: i.byteLength }],
    accessors: [{ bufferView: 0, componentType: 5126, count: 24, type: 'VEC3', min: [-.5, -.5, -.5], max: [.5, .5, .5] }, { bufferView: 1, componentType: 5126, count: 24, type: 'VEC3' }, { bufferView: 2, componentType: 5123, count: 36, type: 'SCALAR' }],
  };
  const text = new TextEncoder().encode(JSON.stringify(json)), padded = (text.length + 3) & ~3;
  const buffer = new ArrayBuffer(28 + padded + binary.length), view = new DataView(buffer), bytes = new Uint8Array(buffer);
  view.setUint32(0, 0x46546c67, true); view.setUint32(4, 2, true); view.setUint32(8, buffer.byteLength, true); view.setUint32(12, padded, true); view.setUint32(16, 0x4e4f534a, true);
  bytes.fill(0x20, 20, 20 + padded); bytes.set(text, 20); view.setUint32(20 + padded, binary.length, true); view.setUint32(24 + padded, 0x004e4942, true); bytes.set(binary, 28 + padded);
  return new File([buffer], 'Calibration dummy.glb', { type: 'model/gltf-binary' });
}
