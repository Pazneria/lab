import { WATER_Y } from './terrain.mjs';
import { ROCK_VERTEX, rockFragment, WATER_VERTEX, WATER_FRAGMENT, DUST_VERTEX, DUST_FRAGMENT } from './shaders.mjs';

const FOV = 56 * Math.PI / 180;
const NEAR = .055;
const FAR = 64;
const SKY = [.724, .788, .792, 1];

export function decodeScene(buffer) {
  if (buffer.byteLength < 32) throw new Error('scene.bin is incomplete.');
  const h = new Uint32Array(buffer, 0, 8);
  if (h[0] !== 0x36564c43 || h[1] !== 2) throw new Error('scene.bin has an unsupported format.');
  const [, , vertexCount, indexCount, waterCount, waterIndexCount, noiseSize, groupCount] = h;
  const total = 32 + groupCount * 32 + vertexCount * 16 + indexCount * 4 +
    waterCount * 16 + waterIndexCount * 2 + noiseSize ** 3 * 4;
  if (buffer.byteLength !== total) throw new Error('scene.bin has the wrong size.');
  let cursor = 32;
  const table = new Float32Array(buffer, cursor, groupCount * 8);
  cursor += table.byteLength;
  const vertices = new Uint8Array(buffer, cursor, vertexCount * 16);
  cursor += vertices.byteLength;
  const indices = new Uint32Array(buffer, cursor, indexCount);
  cursor += indices.byteLength;
  const water = new Float32Array(buffer, cursor, waterCount * 4);
  cursor += water.byteLength;
  const waterIndices = new Uint16Array(buffer, cursor, waterIndexCount);
  cursor += waterIndices.byteLength;
  const grain = new Uint8Array(buffer, cursor, noiseSize ** 3 * 4);
  const groups = [];
  for (let i = 0; i < table.length; i += 8) {
    groups.push({ bounds: table.subarray(i, i + 6), offset: table[i + 6], count: table[i + 7], distance: 0 });
  }
  const waterBounds = [Infinity, WATER_Y - .018, Infinity, -Infinity, WATER_Y + .018, -Infinity];
  for (let i = 0; i < water.length; i += 4) {
    waterBounds[0] = Math.min(waterBounds[0], water[i]);
    waterBounds[2] = Math.min(waterBounds[2], water[i + 1]);
    waterBounds[3] = Math.max(waterBounds[3], water[i]);
    waterBounds[5] = Math.max(waterBounds[5], water[i + 1]);
  }
  return { vertices, indices, groups, water, waterIndices, waterBounds, grain, noiseSize };
}

// Camera coordinates are right-handed, with zero heading looking down the cave (-z).
export function viewProjection(out, eye, yaw, pitch, aspect) {
  const sy = Math.sin(yaw), cy = Math.cos(yaw), sp = Math.sin(pitch), cp = Math.cos(pitch);
  const [ex, ey, ez] = eye;
  const sx = 1 / (Math.tan(FOV * .5) * Math.max(.72, aspect));
  const viewHeight = sx * aspect;
  const a = (FAR + NEAR) / (NEAR - FAR);
  const b = 2 * FAR * NEAR / (NEAR - FAR);
  const fx = sy * cp, fy = sp, fz = -cy * cp;
  const ux = -sy * sp, uy = cp, uz = cy * sp;
  const tx = -(cy * ex + sy * ez);
  const ty = -(ux * ex + uy * ey + uz * ez);
  const tz = fx * ex + fy * ey + fz * ez;
  out[0] = cy * sx; out[1] = ux * viewHeight; out[2] = -a * fx; out[3] = fx;
  out[4] = 0; out[5] = uy * viewHeight; out[6] = -a * fy; out[7] = fy;
  out[8] = sy * sx; out[9] = uz * viewHeight; out[10] = -a * fz; out[11] = fz;
  out[12] = tx * sx; out[13] = ty * viewHeight; out[14] = tz * a + b; out[15] = -tz;
  return out;
}

export function reflectProjection(out, direct) {
  out.set(direct);
  for (let i = 0; i < 4; i++) {
    out[12 + i] += direct[4 + i] * WATER_Y * 2;
    out[4 + i] *= -1;
  }
  return out;
}

function frustum(matrix, planes) {
  for (let axis = 0; axis < 3; axis++) {
    for (let col = 0; col < 4; col++) {
      const i = col * 4;
      planes[axis * 8 + col] = matrix[i + 3] + matrix[i + axis];
      planes[axis * 8 + 4 + col] = matrix[i + 3] - matrix[i + axis];
    }
  }
}

function insideFrustum(bounds, planes) {
  for (let i = 0; i < 24; i += 4) {
    const x = planes[i], y = planes[i + 1], z = planes[i + 2];
    if (x * bounds[x >= 0 ? 3 : 0] + y * bounds[y >= 0 ? 4 : 1] +
      z * bounds[z >= 0 ? 5 : 2] + planes[i + 3] < 0) return false;
  }
  return true;
}

function distanceToBounds(eye, bounds) {
  const x = Math.max(bounds[0] - eye[0], eye[0] - bounds[3], 0);
  const y = Math.max(bounds[1] - eye[1], eye[1] - bounds[4], 0);
  const z = Math.max(bounds[2] - eye[2], eye[2] - bounds[5], 0);
  return x * x + y * y + z * z;
}

function compile(gl, type, source, name) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const reason = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(name + ' shader: ' + reason);
  }
  return shader;
}

function useProgram(gl, vertex, fragment, name, extraUniforms = []) {
  const compiledVertex = compile(gl, gl.VERTEX_SHADER, vertex, name);
  const compiledFragment = compile(gl, gl.FRAGMENT_SHADER, fragment, name);
  const program = gl.createProgram();
  gl.attachShader(program, compiledVertex);
  gl.attachShader(program, compiledFragment);
  gl.linkProgram(program);
  gl.deleteShader(compiledVertex);
  gl.deleteShader(compiledFragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const reason = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(name + ' program: ' + reason);
  }
  const uniforms = {};
  for (const key of ['uViewProjection', 'uEye', 'uTime', ...extraUniforms]) {
    uniforms[key] = gl.getUniformLocation(program, key);
  }
  return { program, uniforms };
}

function geometry(gl, vertices, indices, stride, attributes) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  for (const [location, components, type, normalized, byteOffset] of attributes) {
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, components, type, normalized, stride, byteOffset);
  }
  if (indices) {
    const ebo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  }
  gl.bindVertexArray(null);
  return vao;
}

function motePositions() {
  const cells = [];
  const fraction = x => x - Math.floor(x);
  for (let i = 0; i < 48; i++) {
    const a = fraction(i * .61803398875 + .14);
    const b = fraction(i * .41421356237 + .68);
    const t = fraction(i * .75487766625 + .32);
    const y = 1.16 + t * 8.69;
    const z = 1.15 + (y - 10.75) * .260 + (b - .5) * 4.64;
    const x = -2.60 - (y - 10.75) * .260 + (b - .5) * 1.22 + (a - .5) * 1.09;
    cells.push(x, y, z, fraction(i * .32471795724 + .09));
  }
  return new Float32Array(cells);
}

export class CavernRenderer {
  vp = new Float32Array(16);
  mirror = new Float32Array(16);
  reflectedEye = new Float32Array(3);
  viewVolume = new Float32Array(24);
  mirrorVolume = new Float32Array(24);
  lastReflection = [NaN, NaN, NaN, NaN, NaN];
  drawList = [];
  targetWidth = 0;
  targetHeight = 0;

  constructor(canvas, scene) {
    this.canvas = canvas;
    this.scene = scene;
    const gl = canvas.getContext('webgl2', {
      alpha: false, antialias: true, depth: true, stencil: false, powerPreference: 'high-performance'
    });
    if (!gl) throw new Error('This scene requires a browser with WebGL 2 enabled.');
    this.gl = gl;
    this.rockProgram = useProgram(gl, ROCK_VERTEX, rockFragment(), 'Cave', ['uGrain']);
    this.reflectionProgram = useProgram(gl, ROCK_VERTEX, rockFragment(true), 'Reflection', ['uGrain']);
    this.waterProgram = useProgram(gl, WATER_VERTEX, WATER_FRAGMENT, 'Water', ['uReflection']);
    this.dustProgram = useProgram(gl, DUST_VERTEX, DUST_FRAGMENT, 'Dust', ['uPixels']);
    this.rockMesh = geometry(gl, scene.vertices, scene.indices, 16, [
      [0, 3, gl.SHORT, false, 0], [1, 3, gl.BYTE, true, 6],
      [2, 3, gl.UNSIGNED_BYTE, true, 9], [3, 4, gl.UNSIGNED_BYTE, true, 12]
    ]);
    this.waterMesh = geometry(gl, scene.water, scene.waterIndices, 16, [
      [0, 2, gl.FLOAT, false, 0], [1, 2, gl.FLOAT, false, 8]
    ]);
    const dust = motePositions();
    this.dustMesh = geometry(gl, dust, null, 16, [[0, 4, gl.FLOAT, false, 0]]);
    this.dustCount = dust.length / 4;

    gl.activeTexture(gl.TEXTURE0);
    this.grainTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_3D, this.grainTexture);
    const n = scene.noiseSize;
    gl.texImage3D(gl.TEXTURE_3D, 0, gl.RGBA8, n, n, n, 0, gl.RGBA, gl.UNSIGNED_BYTE, scene.grain);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.REPEAT);
    gl.generateMipmap(gl.TEXTURE_3D);
    for (const pass of [this.rockProgram, this.reflectionProgram]) {
      gl.useProgram(pass.program);
      gl.uniform1i(pass.uniforms.uGrain, 0);
    }

    this.reflectBuffer = gl.createFramebuffer();
    this.reflectTexture = gl.createTexture();
    this.reflectDepth = gl.createRenderbuffer();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.reflectTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.useProgram(this.waterProgram.program);
    gl.uniform1i(this.waterProgram.uniforms.uReflection, 1);
    gl.clearColor(...SKY);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.cullFace(gl.BACK);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    this.maxResolution = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
  }

  resize() {
    const gl = this.gl;
    const { canvas } = this;
    const cssWidth = Math.max(1, canvas.clientWidth);
    const cssHeight = Math.max(1, canvas.clientHeight);
    const scale = Math.min(devicePixelRatio || 1, 1.5,
      Math.sqrt(2350000 / (cssWidth * cssHeight)),
      this.maxResolution / Math.max(cssWidth, cssHeight));
    const width = Math.max(1, Math.round(cssWidth * scale));
    const height = Math.max(1, Math.round(cssHeight * scale));
    if (canvas.width !== width || canvas.height !== height) {
      this.lastReflection[0] = NaN;
      canvas.width = width;
      canvas.height = height;
    }
    const factor = Math.min(.44, 720 / width, 470 / height);
    const rw = Math.max(1, Math.round(width * factor));
    const rh = Math.max(1, Math.round(height * factor));
    if (rw === this.targetWidth && rh === this.targetHeight) return;
    this.targetWidth = rw;
    this.targetHeight = rh;
    this.lastReflection[0] = NaN;
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.reflectTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, rw, rh, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.reflectDepth);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, rw, rh);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.reflectBuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.reflectTexture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.reflectDepth);
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if (status !== gl.FRAMEBUFFER_COMPLETE) throw new Error('The pool reflection framebuffer could not be created.');
  }

  bind(pass, projection, eye, time) {
    const gl = this.gl;
    const u = pass.uniforms;
    gl.useProgram(pass.program);
    if (u.uViewProjection !== null) gl.uniformMatrix4fv(u.uViewProjection, false, projection);
    if (u.uEye !== null) gl.uniform3fv(u.uEye, eye);
    if (u.uTime !== null) gl.uniform1f(u.uTime, time);
  }

  drawRock(pass, projection, volume, eye, time, mirrored) {
    const gl = this.gl;
    this.bind(pass, projection, eye, time);
    gl.bindVertexArray(this.rockMesh);
    const visible = this.drawList;
    visible.length = 0;
    for (const group of this.scene.groups) {
      if (mirrored && group.bounds[4] < WATER_Y) continue;
      if (!insideFrustum(group.bounds, volume)) continue;
      group.distance = distanceToBounds(eye, group.bounds);
      visible.push(group);
    }
    visible.sort((a, b) => a.distance - b.distance);
    for (const group of visible) {
      gl.drawElements(gl.TRIANGLES, group.count, gl.UNSIGNED_INT, group.offset * 4);
    }
  }

  render(eye, yaw, pitch, time) {
    const gl = this.gl;
    const width = this.canvas.width;
    const height = this.canvas.height;
    viewProjection(this.vp, eye, yaw, pitch, width / height);
    frustum(this.vp, this.viewVolume);
    const seeWater = insideFrustum(this.scene.waterBounds, this.viewVolume);
    gl.enable(gl.CULL_FACE);
    gl.disable(gl.BLEND);
    gl.depthMask(true);

    const last = this.lastReflection;
    if (seeWater && (last[0] !== eye[0] || last[1] !== eye[1] || last[2] !== eye[2] ||
      last[3] !== yaw || last[4] !== pitch)) {
      last[0] = eye[0]; last[1] = eye[1]; last[2] = eye[2]; last[3] = yaw; last[4] = pitch;
      reflectProjection(this.mirror, this.vp);
      frustum(this.mirror, this.mirrorVolume);
      this.reflectedEye.set([eye[0], WATER_Y * 2 - eye[1], eye[2]]);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.reflectBuffer);
      gl.viewport(0, 0, this.targetWidth, this.targetHeight);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.frontFace(gl.CW);
      this.drawRock(this.reflectionProgram, this.mirror, this.mirrorVolume, this.reflectedEye, time, true);
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, width, height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.frontFace(gl.CCW);
    this.drawRock(this.rockProgram, this.vp, this.viewVolume, eye, time, false);

    gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.depthMask(false);
    if (seeWater) {
      this.bind(this.waterProgram, this.vp, eye, time);
      gl.bindVertexArray(this.waterMesh);
      gl.drawElements(gl.TRIANGLES, this.scene.waterIndices.length, gl.UNSIGNED_SHORT, 0);
    }
    this.bind(this.dustProgram, this.vp, eye, time);
    gl.uniform1f(this.dustProgram.uniforms.uPixels, height);
    gl.bindVertexArray(this.dustMesh);
    gl.drawArrays(gl.POINTS, 0, this.dustCount);
    gl.depthMask(true);
  }
}
