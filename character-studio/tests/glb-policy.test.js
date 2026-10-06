// Prepared for a future authorized QA session. NOT executed during the local QA pause.
// These tests do not create a browser, WebGL context, server, or Three.js scene.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { inspectGLB, LIMITS } from '../glb-policy.js';
import { calibrationFile } from '../calibration.js';
import { BUNDLED_DEMO } from '../bundled-demo.js';

async function fixture(edit = () => {}) {
  const original = await calibrationFile().arrayBuffer(), view = new DataView(original);
  const jsonLength = view.getUint32(12, true);
  const json = JSON.parse(new TextDecoder().decode(new Uint8Array(original, 20, jsonLength)));
  let binary = new Uint8Array(original.slice(28 + jsonLength));
  const state = { json, binary }; edit(state); binary = state.binary;
  json.buffers[0].byteLength = binary.length;
  const text = new TextEncoder().encode(JSON.stringify(json)), padded = (text.length + 3) & ~3, binLength = (binary.length + 3) & ~3;
  const buffer = new ArrayBuffer(28 + padded + binLength), output = new DataView(buffer), bytes = new Uint8Array(buffer);
  output.setUint32(0, 0x46546c67, true); output.setUint32(4, 2, true); output.setUint32(8, buffer.byteLength, true); output.setUint32(12, padded, true); output.setUint32(16, 0x4e4f534a, true);
  bytes.fill(32, 20, 20 + padded); bytes.set(text, 20); output.setUint32(20 + padded, binLength, true); output.setUint32(24 + padded, 0x004e4942, true); bytes.set(binary, 28 + padded);
  return buffer;
}
function readJSON(buffer) { return JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, 20, new DataView(buffer).getUint32(12, true)))); }

test('bundled CC0 demo matches its pinned bytes and uses the unchanged static import profile', async () => {
  const bytes = await readFile(new URL('../assets/demo/RobotExpressive.glb', import.meta.url));
  assert.equal(bytes.byteLength, BUNDLED_DEMO.bytes);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), BUNDLED_DEMO.sha256);
  const result = inspectGLB(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  assert.equal(result.stats.skins, 2); assert.equal(result.stats.animations, 14);
  assert.equal(readJSON(result.buffer).animations, undefined);
  assert.ok(result.stats.triangles > 0);
});

test('accepts the skeleton-free engineering fixture and counts displayed instances honestly', async () => {
  const result = inspectGLB(await fixture());
  assert.equal(result.stats.triangles, 108); assert.equal(result.stats.vertices, 216);
  assert.equal(result.stats.meshNodes, 9); assert.equal(result.stats.primitives, 9);
  assert.equal(result.stats.materials, 3); assert.equal(result.stats.skins, 0);
});
test('does not impose humanoid anatomy or naming requirements', async () => {
  const result = inspectGLB(await fixture(({ json }) => { json.nodes.forEach(node => { node.name = 'Tentacle <script>'; }); }));
  assert.equal(result.stats.meshNodes, 9);
});
test('rejects an invalid magic number, version, truncated chunk and mismatched length', async () => {
  for (const offset of [0, 4, 8, 12]) {
    const buffer = await fixture(); new DataView(buffer).setUint32(offset, 0xffffffff, true);
    assert.throws(() => inspectGLB(buffer));
  }
  assert.throws(() => inspectGLB(new ArrayBuffer(8)), /64 MiB/);
});
test('rejects file budget before parsing', () => {
  assert.throws(() => inspectGLB(new ArrayBuffer(LIMITS.fileBytes + 1)), /64 MiB/);
});
test('dependency blocking applies to buffers and images', async () => {
  for (const uri of ['https://example.invalid/model.bin', '../mesh.bin', 'data:application/octet-stream;base64,AA==', 'file:///private.bin']) {
    const buffer = await fixture(({ json }) => { json.buffers[0].uri = uri; });
    assert.throws(() => inspectGLB(buffer), /dependencies.*blocked/);
  }
  const image = await fixture(({ json }) => { json.images = [{ uri: 'texture.png' }]; });
  assert.throws(() => inspectGLB(image), /dependencies.*blocked/);
});
test('rejects unsupported extensions even if not declared in extensionsUsed', async () => {
  const buffer = await fixture(({ json }) => { json.meshes[0].primitives[0].extensions = { KHR_draco_mesh_compression: {} }; });
  assert.throws(() => inspectGLB(buffer), /Unsupported extension/);
});
test('validates accessor range and every triangle index', async () => {
  const overrun = await fixture(({ json }) => { json.accessors[0].count = 100000; });
  assert.throws(() => inspectGLB(overrun), /alignment, stride or range/);
  const badIndex = await fixture(({ binary }) => { new DataView(binary.buffer, binary.byteOffset).setUint16(576, 500, true); });
  assert.throws(() => inspectGLB(badIndex), /index points outside/);
});
test('rejects non-finite vertex data', async () => {
  const buffer = await fixture(({ binary }) => { new DataView(binary.buffer, binary.byteOffset).setFloat32(0, Infinity, true); });
  assert.throws(() => inspectGLB(buffer), /non-finite/);
});
test('recomputes exporter POSITION bounds from actual values', async () => {
  const buffer = await fixture(({ json }) => { json.accessors[0].min = [-100, -100, -100]; json.accessors[0].max = [100, 100, 100]; });
  const result = readJSON(inspectGLB(buffer).buffer);
  assert.deepEqual(result.accessors[0].min, [-.5, -.5, -.5]); assert.deepEqual(result.accessors[0].max, [.5, .5, .5]);
});
test('rejects hierarchy cycles, repeated roots and multiple parents', async () => {
  const edits = [
    ({ json }) => { json.nodes[0].children = [1]; json.nodes[1].children = [0]; },
    ({ json }) => { json.scenes[0].nodes.push(0); },
    ({ json }) => { json.nodes[0].children = [2]; json.nodes[1].children = [2]; },
  ];
  for (const edit of edits) { const buffer = await fixture(edit); assert.throws(() => inspectGLB(buffer), /cyclic|once|single parent/); }
});
test('counts repeated mesh instances against the primitive budget', async () => {
  const buffer = await fixture(({ json }) => {
    json.meshes[0].primitives.push(structuredClone(json.meshes[0].primitives[0]));
    json.nodes = Array.from({ length: 300 }, () => ({ mesh: 0 })); json.scenes[0].nodes = json.nodes.map((_, index) => index);
  });
  assert.throws(() => inspectGLB(buffer), /exceeds the viewer budget/);
});
test('excludes clips, lights and cameras while reporting their presence', async () => {
  const buffer = await fixture(({ json }) => {
    json.animations = [{ channels: [], samplers: [] }]; json.cameras = [{ type: 'perspective' }]; json.nodes[0].camera = 0;
    json.extensionsUsed = ['KHR_lights_punctual']; json.extensions = { KHR_lights_punctual: { lights: [{ type: 'point' }] } };
    json.nodes[0].extensions = { KHR_lights_punctual: { light: 0 } };
  });
  const result = inspectGLB(buffer), json = readJSON(result.buffer);
  assert.equal(result.stats.animations, 1); assert.equal(json.animations, undefined); assert.equal(json.cameras, undefined); assert.equal(json.nodes[0].camera, undefined);
  assert.ok(result.stats.notes.some(note => note.includes('cameras and lights ignored')));
});
test('rejects oversized texture header before decoder allocation', async () => {
  const buffer = await fixture(state => {
    const png = new Uint8Array(36), view = new DataView(png.buffer);
    view.setUint32(0, 0x89504e47); view.setUint32(4, 0x0d0a1a0a); view.setUint32(8, 13); view.setUint32(12, 0x49484452); view.setUint32(16, 20000); view.setUint32(20, 1);
    const combined = new Uint8Array(state.binary.length + png.length); combined.set(state.binary); combined.set(png, state.binary.length);
    state.json.bufferViews.push({ buffer: 0, byteOffset: state.binary.length, byteLength: png.length }); state.json.images = [{ bufferView: 3, mimeType: 'image/png' }]; state.binary = combined;
  });
  assert.throws(() => inspectGLB(buffer), /Texture width/);
});
