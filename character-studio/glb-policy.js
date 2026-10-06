// Deliberately independent of Three.js and the DOM; also used by the preflight worker.
export const LIMITS = Object.freeze({ fileBytes: 64 * 1024 ** 2, collectionBytes: 192 * 1024 ** 2,
  files: 12, jsonBytes: 4 * 1024 ** 2, nodes: 512, primitives: 512, triangles: 750000,
  vertices: 1500000, accessorBytes: 96 * 1024 ** 2, images: 32, imageEdge: 4096,
  imagePixels: 16 * 1024 ** 2, materials: 128, depth: 64, morphTargets: 8 });
const SUPPORTED = new Set(['KHR_materials_unlit', 'KHR_texture_transform', 'KHR_mesh_quantization',
  'KHR_materials_clearcoat', 'KHR_materials_emissive_strength', 'KHR_materials_ior',
  'KHR_materials_specular', 'KHR_materials_transmission', 'KHR_materials_volume',
  'KHR_materials_sheen', 'KHR_materials_iridescence', 'KHR_materials_anisotropy', 'KHR_materials_dispersion']);
const IGNORED = new Set(['KHR_lights_punctual']);
const COMPONENTS = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
const BYTES = { 5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4 };
const READ = { 5120: 'getInt8', 5121: 'getUint8', 5122: 'getInt16', 5123: 'getUint16', 5125: 'getUint32', 5126: 'getFloat32' };
function requireThat(condition, message) { if (!condition) throw new Error(message); }
function integer(value, min, max, label) { requireThat(Number.isSafeInteger(value) && value >= min && value <= max, `${label} is invalid or exceeds this viewer’s resource limit.`); return value; }
function list(value, label, max = 4096) { if (value === undefined) return []; requireThat(Array.isArray(value) && value.length <= max, `${label} must be a bounded array.`); return value; }
function ref(value, array, label) { return array[integer(value, 0, array.length - 1, label)]; }
function numericArray(value, length, label) { requireThat(Array.isArray(value) && value.length === length && value.every(n => Number.isFinite(n) && Math.abs(n) <= 1e8), `${label} must contain ${length} finite values.`); }

function imageSize(bytes, mime) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (mime === 'image/png') {
    requireThat(bytes.length >= 33 && view.getUint32(0) === 0x89504e47 && view.getUint32(4) === 0x0d0a1a0a && view.getUint32(8) === 13 && view.getUint32(12) === 0x49484452, 'An embedded PNG has an invalid header.');
    return [view.getUint32(16), view.getUint32(20)];
  }
  requireThat(mime === 'image/jpeg' && bytes.length >= 4 && view.getUint16(0) === 0xffd8, 'Use embedded PNG or JPEG textures with valid headers.');
  let offset = 2;
  while (offset + 4 <= bytes.length) {
    requireThat(bytes[offset++] === 0xff, 'An embedded JPEG has an invalid marker.');
    while (offset < bytes.length && bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    if (marker === 0xda || marker === 0xd9) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    requireThat(offset + 2 <= bytes.length, 'An embedded JPEG is truncated.');
    const size = view.getUint16(offset);
    requireThat(size >= 2 && offset + size <= bytes.length, 'An embedded JPEG is truncated.');
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      requireThat(size >= 8, 'An embedded JPEG frame is truncated.');
      return [view.getUint16(offset + 5), view.getUint16(offset + 3)];
    }
    offset += size;
  }
  throw new Error('Could not read JPEG dimensions. Re-export as a baseline/progressive JPEG or PNG.');
}

// Validate before any image decoder, scene parser or GPU allocation is invoked.
export function inspectGLB(buffer) {
  requireThat(buffer instanceof ArrayBuffer && buffer.byteLength >= 28 && buffer.byteLength <= LIMITS.fileBytes, 'Choose a GLB between 28 bytes and 64 MiB.');
  const header = new DataView(buffer);
  requireThat(header.getUint32(0, true) === 0x46546c67, 'This file is not a binary glTF (.glb). Export a self-contained GLB 2.0.');
  requireThat(header.getUint32(4, true) === 2 && header.getUint32(8, true) === buffer.byteLength, 'Invalid GLB version or declared file length. GLB 2.0 is required.');
  let jsonBytes, binary, offset = 12, chunks = 0;
  while (offset < buffer.byteLength) {
    requireThat(offset + 8 <= buffer.byteLength, 'Truncated GLB chunk header.');
    const length = header.getUint32(offset, true), type = header.getUint32(offset + 4, true);
    offset += 8;
    requireThat(length % 4 === 0 && offset + length <= buffer.byteLength, 'Invalid GLB chunk length or alignment.');
    if (chunks === 0) {
      requireThat(type === 0x4e4f534a && length <= LIMITS.jsonBytes, 'The first GLB chunk must be JSON (up to 4 MiB).');
      jsonBytes = new Uint8Array(buffer, offset, length);
    } else {
      requireThat(chunks === 1 && type === 0x004e4942, 'This viewer accepts one JSON chunk and one embedded BIN chunk.');
      binary = new Uint8Array(buffer, offset, length);
    }
    chunks++; offset += length;
  }
  requireThat(binary?.length > 0, 'The GLB needs an embedded binary buffer. External files and data URIs are not accepted.');
  let json;
  try { json = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(jsonBytes)); }
  catch { throw new Error('The GLB contains malformed JSON or invalid UTF-8.'); }
  requireThat(json && !Array.isArray(json) && json.asset?.version === '2.0', 'The asset must declare glTF 2.0.');
  requireThat(!json.asset.minVersion || json.asset.minVersion === '2.0', 'This asset requires a newer glTF version.');
  const extensions = new Set(list(json.extensionsUsed, 'extensionsUsed', 32));
  for (const name of list(json.extensionsRequired, 'extensionsRequired', 32)) extensions.add(name);
  // Inspect actual extension objects as well, not just the exporter’s declaration.
  const work = [{ value: json, depth: 0 }];
  while (work.length) {
    const { value, depth } = work.pop();
    requireThat(depth <= LIMITS.depth, 'GLB JSON nesting is too deep.');
    if (typeof value === 'number') requireThat(Number.isFinite(value) && Math.abs(value) <= 1e12, 'GLB contains an unsafe numeric value.');
    if (!value || typeof value !== 'object') continue;
    for (const [key, child] of Object.entries(value)) {
      if (key === 'uri') throw new Error('External dependencies and data URIs are blocked. Embed all geometry and PNG/JPEG images as GLB bufferViews.');
      if (key === 'extensions') { requireThat(child && typeof child === 'object' && !Array.isArray(child), 'Invalid extensions object.'); for (const name of Object.keys(child)) extensions.add(name); }
      if (key !== 'extras') work.push({ value: child, depth: depth + 1 });
    }
  }
  for (const name of extensions) requireThat(SUPPORTED.has(name) || IGNORED.has(name), `Unsupported extension: ${String(name).slice(0, 90)}. Export core PBR GLB without Draco, Meshopt, KTX2 or other unsupported extensions.`);

  const buffers = list(json.buffers, 'buffers', 1);
  requireThat(buffers.length === 1 && !buffers[0].uri, 'Use one embedded binary buffer.');
  const declaredLength = integer(buffers[0].byteLength, 1, binary.length, 'Buffer length');
  requireThat(binary.length - declaredLength <= 3, 'Embedded BIN length disagrees with the declared buffer.');
  const views = list(json.bufferViews, 'bufferViews');
  for (const view of views) {
    requireThat(view && view.buffer === 0, 'A bufferView refers to a missing buffer.');
    const start = integer(view.byteOffset ?? 0, 0, declaredLength, 'BufferView offset');
    const length = integer(view.byteLength, 1, declaredLength, 'BufferView length');
    requireThat(start + length <= declaredLength, 'A bufferView extends beyond the embedded buffer.');
    if (view.byteStride !== undefined) requireThat(Number.isInteger(view.byteStride) && view.byteStride >= 4 && view.byteStride <= 252 && view.byteStride % 4 === 0, 'Invalid vertex byte stride.');
  }
  const accessors = list(json.accessors, 'accessors');
  let accessorBytes = 0;
  const layouts = accessors.map((accessor, i) => {
    requireThat(accessor && !accessor.sparse, 'Sparse accessors are not supported in this preview. Export dense geometry/morph data.');
    const components = COMPONENTS[accessor.type], bytes = BYTES[accessor.componentType];
    requireThat(components && bytes, `Accessor ${i} uses an unsupported element type.`);
    const count = integer(accessor.count, 1, LIMITS.vertices * 4, 'Accessor count');
    accessorBytes += count * components * bytes;
    requireThat(accessorBytes <= LIMITS.accessorBytes, 'Decoded accessors exceed the 96 MiB viewer budget.');
    const view = ref(accessor.bufferView, views, 'Accessor bufferView');
    const start = integer(accessor.byteOffset ?? 0, 0, view.byteLength, 'Accessor offset');
    const stride = view.byteStride ?? components * bytes;
    requireThat(stride >= components * bytes && start % bytes === 0 && (view.byteOffset ?? 0) % bytes === 0 && stride % bytes === 0 && start + (count - 1) * stride + components * bytes <= view.byteLength, 'An accessor has invalid alignment, stride or range.');
    const data = new DataView(buffer, binary.byteOffset + (view.byteOffset ?? 0) + start);
    if (accessor.componentType === 5126) {
      for (let n = 0; n < count; n++) for (let c = 0; c < components; c++) requireThat(Number.isFinite(data.getFloat32(n * stride + c * bytes, true)) && Math.abs(data.getFloat32(n * stride + c * bytes, true)) <= 1e8, 'Geometry contains non-finite or extreme floating-point values.');
    }
    if (accessor.min) numericArray(accessor.min, components, 'Accessor minimum');
    if (accessor.max) numericArray(accessor.max, components, 'Accessor maximum');
    return { data, stride, count, components, bytes, read: READ[accessor.componentType] };
  });
  const images = list(json.images, 'images', LIMITS.images);
  let imagePixels = 0;
  const imageDimensions = images.map(image => {
    const view = ref(image.bufferView, views, 'Image bufferView');
    requireThat(view.byteStride === undefined, 'An image bufferView cannot have a vertex stride.');
    const bytes = new Uint8Array(buffer, binary.byteOffset + (view.byteOffset ?? 0), view.byteLength);
    const [width, height] = imageSize(bytes, image.mimeType);
    integer(width, 1, LIMITS.imageEdge, 'Texture width'); integer(height, 1, LIMITS.imageEdge, 'Texture height');
    imagePixels += width * height;
    requireThat(imagePixels <= LIMITS.imagePixels, 'Textures exceed the combined 16-megapixel decode budget.');
    return [width, height];
  });
  const samplers = list(json.samplers, 'samplers', 128);
  const textures = list(json.textures, 'textures', 64);
  let texturePixels = 0;
  for (const texture of textures) {
    ref(texture.source, images, 'Texture image');
    if (texture.sampler !== undefined) ref(texture.sampler, samplers, 'Texture sampler');
    const [w, h] = imageDimensions[texture.source]; texturePixels += w * h;
  }
  requireThat(texturePixels <= LIMITS.imagePixels, 'Texture bindings exceed the combined 16-megapixel budget.');
  const materials = list(json.materials, 'materials', LIMITS.materials);
  for (const material of materials) {
    const pending = [material];
    while (pending.length) {
      const value = pending.pop();
      for (const [key, child] of Object.entries(value)) {
        if (/texture$/i.test(key) && child && typeof child === 'object') ref(child.index, textures, 'Material texture');
        if (child && typeof child === 'object' && !Array.isArray(child)) pending.push(child);
      }
    }
    if (material.alphaMode !== undefined) requireThat(['OPAQUE', 'MASK', 'BLEND'].includes(material.alphaMode), 'Unsupported material alpha mode.');
  }
  const meshes = list(json.meshes, 'meshes', LIMITS.primitives);
  let primitiveCount = 0;
  const meshStats = meshes.map(mesh => {
    let triangles = 0, vertices = 0;
    const primitives = list(mesh.primitives, 'Mesh primitives', LIMITS.primitives);
    requireThat(primitives.length > 0, 'A mesh has no primitives.');
    for (const primitive of primitives) {
      requireThat(++primitiveCount <= LIMITS.primitives, 'Too many mesh primitives (viewer limit: 512).');
      const position = ref(primitive.attributes?.POSITION, accessors, 'POSITION accessor');
      requireThat(position.type === 'VEC3', 'Mesh positions must be VEC3.');
      const attrs = primitive.attributes;
      for (const [semantic, index] of Object.entries(attrs)) {
        const attribute = ref(index, accessors, `${semantic} accessor`);
        requireThat(attribute.count === position.count, 'Vertex attribute counts disagree.');
        const expected = semantic === 'POSITION' || semantic === 'NORMAL' ? [3] : semantic === 'TANGENT' || /^(JOINTS|WEIGHTS)_/.test(semantic) ? [4] : /^TEXCOORD_/.test(semantic) ? [2] : /^COLOR_/.test(semantic) ? [3, 4] : null;
        requireThat(expected?.includes(COMPONENTS[attribute.type]), `Unsupported or malformed vertex attribute ${semantic}.`);
        requireThat(!/^(JOINTS|WEIGHTS)_[1-9]/.test(semantic), 'Only the core four joint influences (JOINTS_0 / WEIGHTS_0) are supported.');
      }
      let elements = position.count;
      if (primitive.indices !== undefined) {
        const indices = ref(primitive.indices, accessors, 'Index accessor');
        requireThat(indices.type === 'SCALAR' && [5121, 5123, 5125].includes(indices.componentType), 'Indices must be unsigned scalar integers.');
        requireThat(views[indices.bufferView].byteStride === undefined && !indices.normalized, 'Index buffers must be packed, non-normalized integers.');
        const layout = layouts[primitive.indices]; elements = indices.count;
        for (let n = 0; n < elements; n++) requireThat(layout.data[layout.read](n * layout.stride, true) < position.count, 'A mesh index points outside its vertex buffer.');
      }
      const mode = primitive.mode ?? 4;
      requireThat([4, 5, 6].includes(mode), 'This character viewer supports triangle meshes, strips and fans; export lines/points as meshes.');
      requireThat(elements >= 3 && (mode !== 4 || elements % 3 === 0), 'Invalid triangle primitive element count.');
      triangles += mode === 4 ? elements / 3 : elements - 2;
      vertices += position.count;
      if (primitive.material !== undefined) ref(primitive.material, materials, 'Primitive material');
      for (const target of list(primitive.targets, 'Morph targets', LIMITS.morphTargets)) for (const [semantic, index] of Object.entries(target)) {
        const attribute = ref(index, accessors, 'Morph target accessor');
        requireThat(['POSITION', 'NORMAL', 'TANGENT'].includes(semantic) && attribute.type === 'VEC3' && attribute.count === position.count, 'A morph target has invalid attributes.');
      }
    }
    return { triangles, vertices, primitives: primitives.length };
  });
  const nodes = list(json.nodes, 'nodes', LIMITS.nodes);
  const scenes = list(json.scenes, 'scenes', 1);
  requireThat(scenes.length === 1 && (json.scene === undefined || json.scene === 0), 'Export exactly one scene containing the complete character. Multiple character meshes are welcome.');
  const skins = list(json.skins, 'skins', 64);
  const parents = new Map();
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]; requireThat(node && typeof node === 'object', 'Invalid scene node.');
    if (node.mesh !== undefined) ref(node.mesh, meshes, 'Node mesh');
    if (node.skin !== undefined) { ref(node.skin, skins, 'Node skin'); requireThat(node.mesh !== undefined, 'A skinned node must have a mesh.'); }
    for (const [key, length] of [['translation', 3], ['rotation', 4], ['scale', 3], ['matrix', 16]]) if (node[key] !== undefined) numericArray(node[key], length, `Node ${key}`);
    requireThat(!node.matrix || (!node.translation && !node.rotation && !node.scale), 'A node cannot combine a matrix and TRS transforms.');
    for (const child of list(node.children, 'Node children', LIMITS.nodes)) {
      ref(child, nodes, 'Child node'); requireThat(!parents.has(child), 'Scene nodes must have a single parent.'); parents.set(child, i);
    }
  }
  // Validate every node, including disconnected content, to prevent cyclic parser recursion.
  for (let i = 0; i < nodes.length; i++) { let node = i, depth = 0; const chain = new Set(); while (node !== undefined) { requireThat(!chain.has(node) && ++depth <= LIMITS.depth, 'The node hierarchy is cyclic or too deep.'); chain.add(node); node = parents.get(node); } }
  const roots = list(scenes[0].nodes, 'Scene roots', LIMITS.nodes), visited = new Set();
  let triangles = 0, vertices = 0, draws = 0, meshNodes = 0;
  const pending = [...roots];
  for (const root of roots) { ref(root, nodes, 'Scene root'); requireThat(!parents.has(root), 'A scene root cannot also be a child.'); }
  while (pending.length) {
    const index = pending.pop(); requireThat(!visited.has(index), 'A scene root appears more than once.'); visited.add(index);
    const node = nodes[index];
    if (node.mesh !== undefined) { const stats = meshStats[node.mesh]; triangles += stats.triangles; vertices += stats.vertices; draws += stats.primitives; meshNodes++; }
    pending.push(...(node.children ?? []));
  }
  requireThat(meshNodes > 0 && triangles > 0, 'The scene has no visible triangle-mesh nodes.');
  requireThat(triangles <= LIMITS.triangles && vertices <= LIMITS.vertices && draws <= LIMITS.primitives, 'The scene exceeds the viewer budget (750,000 triangles, 1.5 million vertex references or 512 primitives). These are operational limits, not benchmark scores.');
  for (const skin of skins) {
    const joints = list(skin.joints, 'Skin joints', 256); requireThat(joints.length > 0 && new Set(joints).size === joints.length, 'A skin has missing or repeated joints.');
    for (const joint of joints) { ref(joint, nodes, 'Skin joint'); requireThat(visited.has(joint), 'Skin joints must belong to the exported scene.'); }
    if (skin.skeleton !== undefined) ref(skin.skeleton, nodes, 'Skeleton root');
    if (skin.inverseBindMatrices !== undefined) { const a = ref(skin.inverseBindMatrices, accessors, 'Inverse bind matrices'); requireThat(a.type === 'MAT4' && a.componentType === 5126 && a.count === joints.length, 'Inverse bind matrices do not match the skin.'); }
  }
  for (const node of nodes) if (node.skin !== undefined) for (const primitive of meshes[node.mesh].primitives) {
    const joints = ref(primitive.attributes.JOINTS_0, accessors, 'Skinned mesh joints');
    const weights = ref(primitive.attributes.WEIGHTS_0, accessors, 'Skinned mesh weights');
    requireThat([5121, 5123].includes(joints.componentType) && [5121, 5123, 5126].includes(weights.componentType), 'Invalid joint or weight component type.');
    const layout = layouts[primitive.attributes.JOINTS_0];
    for (let n = 0; n < joints.count; n++) for (let c = 0; c < 4; c++) requireThat(layout.data[layout.read](n * layout.stride + c * layout.bytes, true) < skins[node.skin].joints.length, 'A joint attribute points outside the skin.');
  }
  const animations = list(json.animations, 'animations', 256).length;
  const cameraCount = list(json.cameras, 'cameras', 128).length;
  const lightCount = json.extensions?.KHR_lights_punctual?.lights?.length ?? 0;
  const notes = [];
  if (animations) notes.push(`${animations} animation clip(s) ignored; the exported static pose is shown.`);
  if (cameraCount || lightCount) notes.push('Imported cameras and lights ignored to keep studio conditions shared.');
  if (skins.length) notes.push('Skin data present. Bind quality, deformation and rigging readiness are not verified.');
  if (extensions.has('KHR_materials_unlit')) notes.push('Unlit materials do not respond to studio lighting in Original mode.');
  if (materials.some(m => m.alphaMode === 'BLEND')) notes.push('Transparent surfaces use real-time sorting; inspect overlapping layers from several angles.');
  if (materials.some(m => m.doubleSided)) notes.push('Some materials are double-sided; Original mode preserves this.');
  // The inspection copy drops cameras/lights/clips only. The user’s file is never rewritten.
  delete json.animations; delete json.cameras;
  if (json.extensions) delete json.extensions.KHR_lights_punctual;
  for (const node of nodes) { delete node.camera; if (node.extensions) delete node.extensions.KHR_lights_punctual; }
  for (const key of ['extensionsUsed', 'extensionsRequired']) if (json[key]) json[key] = json[key].filter(name => !IGNORED.has(name));
  // Do not trust exporter POSITION min/max for framing. GLTFLoader derives them from these values.
  for (const mesh of meshes) for (const primitive of mesh.primitives) for (const index of [primitive.attributes.POSITION, ...(primitive.targets ?? []).map(t => t.POSITION).filter(i => i !== undefined)]) {
    const layout = layouts[index], accessor = accessors[index]; const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    for (let n = 0; n < layout.count; n++) for (let c = 0; c < 3; c++) { const v = layout.data[layout.read](n * layout.stride + c * layout.bytes, true); min[c] = Math.min(min[c], v); max[c] = Math.max(max[c], v); }
    accessor.min = min; accessor.max = max;
  }
  const jsonData = new TextEncoder().encode(JSON.stringify(json));
  const paddedJSON = (jsonData.length + 3) & ~3;
  const cleanBuffer = new ArrayBuffer(28 + paddedJSON + binary.byteLength);
  const cleanView = new DataView(cleanBuffer), cleanBytes = new Uint8Array(cleanBuffer);
  cleanView.setUint32(0, 0x46546c67, true); cleanView.setUint32(4, 2, true); cleanView.setUint32(8, cleanBuffer.byteLength, true);
  cleanView.setUint32(12, paddedJSON, true); cleanView.setUint32(16, 0x4e4f534a, true);
  cleanBytes.fill(0x20, 20, 20 + paddedJSON); cleanBytes.set(jsonData, 20);
  cleanView.setUint32(20 + paddedJSON, binary.byteLength, true); cleanView.setUint32(24 + paddedJSON, 0x004e4942, true); cleanBytes.set(binary, 28 + paddedJSON);
  const imageSources = images.map((image, i) => { const view = views[image.bufferView]; return { bytes: new Uint8Array(buffer, binary.byteOffset + (view.byteOffset ?? 0), view.byteLength), mime: image.mimeType, dimensions: imageDimensions[i] }; });
  return { buffer: cleanBuffer, imageSources, stats: { triangles, vertices, primitives: draws, meshNodes, materials: materials.length, textures: textures.length, images: images.length, imageDimensions, imagePixels, skins: skins.length, joints: new Set(skins.flatMap(s => s.joints)).size, nodes: visited.size, animations, extensions: [...extensions].filter(e => !IGNORED.has(e)), notes } };
}
