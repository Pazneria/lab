import * as THREE from './vendor/three/build/three.module.js';
import { OrbitControls } from './vendor/three/addons/controls/OrbitControls.js';
import { GLTFLoader } from './vendor/three/addons/loaders/GLTFLoader.js';

const BACKDROPS = { slate: 0x414a43, light: 0xd8dcd4, dark: 0x171c1b };
const LIGHTS = {
  neutral: { key: [0xfff8ed, 3.2, -3, 5, 4], fill: [0xeef3ff, 1.5, 4, 2, 3], rim: [0xffffff, 2.0, 1, 4, -4], ambient: .7, environment: .7 },
  raking: { key: [0xfff8ee, 5.0, -5, 2, 1], fill: [0xffffff, .25, 4, 2, 3], rim: [0xf2f6ff, .65, 1, 4, -4], ambient: .18, environment: .22 },
  contrast: { key: [0xffcf9c, 3.2, -3, 4, 4], fill: [0xc1deff, .8, 4, 2, 3], rim: [0x8fc9ff, 3.5, 2, 3, -4], ambient: .45, environment: .5 },
};
const defaultDirection = new THREE.Vector3(3, 1.6, 5).normalize();
function collect(root, resources) {
  if (!root) return;
  if (root.isTexture || root.isMaterial || root.isBufferGeometry || root.isSkeleton) resources.add(root);
  if (root.isMaterial) for (const value of Object.values(root)) if (value?.isTexture) resources.add(value);
  if (root.traverse) root.traverse(object => { if (object.geometry) resources.add(object.geometry); if (object.skeleton) resources.add(object.skeleton); for (const material of [].concat(object.material ?? [])) collect(material, resources); });
}
function disposeResources(resources, bitmaps = []) {
  for (const resource of resources) resource.dispose?.();
  for (const bitmap of new Set(bitmaps)) bitmap.close?.();
  resources.clear();
}

export class StudioViewer {
  constructor(host, { onFault, onSpinChange }) {
    this.host = host; this.onFault = onFault; this.onSpinChange = onSpinChange;
    this.disposed = false; this.contextLost = false; this.frameId = 0; this.lastFrame = 0; this.visible = true; this.spinning = false; this.active = null;
    this.settings = { lighting: 'neutral', exposure: 0, background: 'slate', surface: 'original', grid: true };
    try {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, 1, .002, 100);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power', preserveDrawingBuffer: false });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.setPixelRatio(1); // Physical size is explicitly budgeted in resize().
    this.renderer.domElement.setAttribute('aria-hidden', 'true');
    this.host.replaceChildren(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = false;
    this.controls.rotateSpeed = .65; this.controls.panSpeed = .75; this.controls.zoomSpeed = .7;
    this.controls.minPolarAngle = .005; this.controls.maxPolarAngle = Math.PI - .005;
    this.controls.minDistance = .02; this.controls.maxDistance = 25; this.controls.maxTargetRadius = 5;
    this.controls.screenSpacePanning = true;
    this.change = () => this.invalidate();
    this.interaction = () => this.setSpin(false);
    this.controls.addEventListener('change', this.change);
    this.controls.addEventListener('start', this.interaction);
    this.lights = {};
    for (const name of ['key', 'fill', 'rim']) { this.lights[name] = new THREE.DirectionalLight(); this.scene.add(this.lights[name]); }
    this.ambient = new THREE.HemisphereLight(0xf5f7ee, 0x626b61, .7); this.scene.add(this.ambient);
    this.grid = new THREE.GridHelper(8, 16, 0x8b9786, 0x778370);
    this.grid.position.y = -.005; this.grid.material.transparent = true; this.grid.material.opacity = .23; this.grid.material.depthWrite = false; this.scene.add(this.grid);
    this.clay = new THREE.MeshStandardMaterial({ color: 0xb6b9ad, roughness: .75, metalness: 0, side: THREE.DoubleSide });
    this.wire = new THREE.MeshBasicMaterial({ color: 0xc9e7ac, wireframe: true, side: THREE.DoubleSide });
    // A small, analytic environment makes metalness inspectable without an HDR download.
    // It is neutral in all presets. Directional key/fill/rim carry the preset colors.
    const width = 256, height = 128, pixels = new Uint8Array(width * height * 4);
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const u = x / width, v = y / height;
      const softbox = Math.exp(-((u - .2) ** 2 / .008 + (v - .28) ** 2 / .026)) + .75 * Math.exp(-((u - .72) ** 2 / .02 + (v - .4) ** 2 / .025));
      const value = Math.min(255, 20 + 60 * (1 - v) + 175 * softbox), index = (y * width + x) * 4;
      pixels[index] = value; pixels[index + 1] = value; pixels[index + 2] = value; pixels[index + 3] = 255;
    }
    const source = new THREE.DataTexture(pixels, width, height, THREE.RGBAFormat);
    source.mapping = THREE.EquirectangularReflectionMapping; source.needsUpdate = true;
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    try { this.environment = pmrem.fromEquirectangular(source); this.scene.environment = this.environment.texture; }
    finally { pmrem.dispose(); source.dispose(); }
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(host);
    this.intersection = new IntersectionObserver(entries => { this.visible = entries[0].isIntersecting; if (!this.visible) this.cancelFrame(); else this.invalidate(); }); this.intersection.observe(host);
    this.visibility = () => { if (document.hidden) { this.setSpin(false); this.cancelFrame(); } else this.invalidate(); };
    document.addEventListener('visibilitychange', this.visibility);
    this.loss = event => { event.preventDefault(); this.contextLost = true; this.setSpin(false); this.cancelFrame(); this.onFault('The graphics context was lost. Reload the page to release resources and reopen your files.'); };
    this.renderer.domElement.addEventListener('webglcontextlost', this.loss);
    this.doubleClick = event => this.focusSurface(event); this.renderer.domElement.addEventListener('dblclick', this.doubleClick);
    this.pointerFocus = () => host.parentElement.focus({ preventScroll: true }); this.renderer.domElement.addEventListener('pointerdown', this.pointerFocus);
    this.keyboard = event => this.key(event); host.parentElement.addEventListener('keydown', this.keyboard);
    this.resize(); this.configure(this.settings);
    } catch (error) { this.dispose(); throw error; }
  }
  configure(settings) {
    Object.assign(this.settings, settings);
    const preset = LIGHTS[this.settings.lighting] ?? LIGHTS.neutral;
    for (const name of ['key', 'fill', 'rim']) { const [color, intensity, x, y, z] = preset[name]; this.lights[name].color.setHex(color); this.lights[name].intensity = intensity; this.lights[name].position.set(x, y, z); }
    this.ambient.intensity = preset.ambient; this.scene.environmentIntensity = preset.environment;
    this.scene.background = new THREE.Color(BACKDROPS[this.settings.background] ?? BACKDROPS.slate);
    this.renderer.toneMappingExposure = 2 ** this.settings.exposure;
    this.grid.visible = this.settings.grid;
    this.wire.color.setHex(this.settings.background === 'light' ? 0x314832 : 0xc9e7ac);
    if (this.active) for (const [mesh, original] of this.active.materials) mesh.material = this.settings.surface === 'original' ? original : this.settings.surface === 'clay' ? this.clay : this.wire;
    this.invalidate();
  }
  async prepare({ buffer, bitmaps }, signal) {
    const resources = new Set(), pending = new Set();
    const manager = new THREE.LoadingManager();
    manager.setURLModifier(() => { throw new Error('Unexpected resource request blocked. Export one embedded GLB.'); });
    const loader = new GLTFLoader(manager);
    loader.register(parser => {
      // Pinned r180 parser adapter: all images already decoded by the cancellable worker.
      // No URL, fetch, network fallback or silent missing-texture substitution is permitted.
      parser.loadImageSource = async index => {
        if (signal.aborted) throw new DOMException('Load cancelled', 'AbortError');
        const bitmap = bitmaps[index]; if (!bitmap) throw new Error('A required embedded texture is missing.');
        const texture = new THREE.Texture(bitmap); texture.flipY = false; texture.needsUpdate = true; resources.add(texture); return texture;
      };
      const loadTexture = parser.loadTextureImage.bind(parser);
      parser.loadTextureImage = (...args) => loadTexture(...args).then(texture => { if (!texture) throw new Error('A material texture could not be decoded.'); collect(texture, resources); return texture; });
      const getDependency = parser.getDependency.bind(parser);
      parser.getDependency = (...args) => {
        const promise = getDependency(...args).then(value => { collect(value, resources); return value; });
        pending.add(promise); promise.then(() => pending.delete(promise), () => pending.delete(promise)); return promise;
      };
      const loadGeometries = parser.loadGeometries.bind(parser);
      parser.loadGeometries = (...args) => { const promise = loadGeometries(...args).then(geometries => { for (const geometry of geometries) collect(geometry, resources); return geometries; }); pending.add(promise); promise.then(() => pending.delete(promise), () => pending.delete(promise)); return promise; };
      return { name: 'CharacterStudioEmbeddedImages' };
    });
    try {
      const gltf = await loader.parseAsync(buffer, '');
      if (signal.aborted || this.disposed) throw new DOMException('Load cancelled', 'AbortError');
      const root = gltf.scene, materials = new Map(); collect(root, resources);
      root.traverse(object => { if (object.isMesh) { materials.set(object, object.material); object.castShadow = false; object.receiveShadow = false; if (object.isSkinnedMesh) object.skeleton.update(); } });
      let texturePixels = 0;
      for (const resource of resources) if (resource.isTexture) texturePixels += (resource.image?.width ?? 0) * (resource.image?.height ?? 0);
      if (texturePixels > 32 * 1024 ** 2) throw new Error('Material texture copies exceed the 32-megapixel GPU allocation budget. Reduce texture size or duplicate texture transforms.');
      root.updateMatrixWorld(true);
      const originalBox = new THREE.Box3().setFromObject(root, true), size = originalBox.getSize(new THREE.Vector3());
      const span = Math.max(size.x, size.y, size.z);
      if (originalBox.isEmpty() || ![...originalBox.min, ...originalBox.max, span].every(Number.isFinite) || span < 1e-6 || span > 1e6) throw new Error('The scene has empty, non-finite or extreme bounds. Check its transforms and export scale.');
      const wrapper = new THREE.Group(), center = originalBox.getCenter(new THREE.Vector3());
      const scale = 2.6 / span;
      wrapper.add(root); wrapper.scale.setScalar(scale); wrapper.position.set(-center.x * scale, -originalBox.min.y * scale, -center.z * scale);
      wrapper.updateMatrixWorld(true);
      const box = originalBox.clone(); box.min.multiplyScalar(scale).add(wrapper.position); box.max.multiplyScalar(scale).add(wrapper.position);
      return { wrapper, root, materials, resources, bitmaps, size: size.toArray(), originalMin: originalBox.min.toArray(), center: box.getCenter(new THREE.Vector3()), radius: box.getBoundingSphere(new THREE.Sphere()).radius, scale };
    } catch (error) {
      // Pending parser branches may still allocate after another branch has failed.
      while (pending.size) await Promise.allSettled([...pending]);
      disposeResources(resources, bitmaps); throw error;
    }
  }
  release(asset) { if (!asset) return; for (const [mesh, original] of asset.materials) mesh.material = original; asset.wrapper.removeFromParent(); disposeResources(asset.resources, asset.bitmaps); asset.materials.clear(); }
  show(asset, preserveView = false) {
    if (this.disposed || this.contextLost) throw new Error('The viewer is unavailable. Reload the page and reopen the file.');
    const previousCenter = this.active?.center.clone();
    this.setSpin(false); this.release(this.active); this.active = asset; this.scene.add(asset.wrapper);
    this.renderer.renderLists.dispose();
    this.controls.cursor.copy(asset.center);
    this.controls.maxTargetRadius = asset.radius * 3; this.controls.minDistance = asset.radius * .012; this.controls.maxDistance = asset.radius * 16;
    this.camera.near = Math.max(.001, asset.radius / 1500); this.camera.far = asset.radius * 60; this.camera.updateProjectionMatrix();
    if (preserveView && previousCenter) { const delta = asset.center.clone().sub(previousCenter); this.camera.position.add(delta); this.controls.target.add(delta); this.controls.update(); }
    else this.reset();
    this.configure(this.settings);
  }
  clear() { this.setSpin(false); this.release(this.active); this.active = null; this.renderer.renderLists.dispose(); this.invalidate(); }
  frame(direction) {
    if (!this.active) return;
    this.setSpin(false);
    const vector = direction?.clone() ?? this.camera.position.clone().sub(this.controls.target).normalize();
    const vertical = THREE.MathUtils.degToRad(this.camera.fov / 2), horizontal = Math.atan(Math.tan(vertical) * this.camera.aspect);
    const distance = this.active.radius / Math.sin(Math.min(vertical, horizontal)) * 1.13;
    this.controls.target.copy(this.active.center); this.camera.position.copy(this.active.center).addScaledVector(vector, distance); this.controls.update(); this.invalidate();
  }
  reset() { this.frame(defaultDirection); }
  view(name) { this.frame(({ front: new THREE.Vector3(0, 0, 1), side: new THREE.Vector3(1, 0, 0), back: new THREE.Vector3(0, 0, -1), top: new THREE.Vector3(0, 1, .005) })[name]); }
  zoom(factor) { if (!this.active) return; this.setSpin(false); const offset = this.camera.position.clone().sub(this.controls.target); offset.multiplyScalar(factor).clampLength(this.controls.minDistance, this.controls.maxDistance); this.camera.position.copy(this.controls.target).add(offset); this.controls.update(); }
  key(event) {
    if (event.target !== this.host.parentElement || event.altKey || event.metaKey || event.ctrlKey || !this.active) return;
    const key = event.key.toLowerCase();
    if (!['arrowleft', 'arrowright', 'arrowup', 'arrowdown', '+', '=', '-', '_', 'f', 'home', 'escape'].includes(key)) return;
    event.preventDefault(); this.setSpin(false);
    if (key === 'f') return this.frame(); if (key === 'home') return this.reset(); if (key === 'escape') return;
    if (key === '+' || key === '=') return this.zoom(.86); if (key === '-' || key === '_') return this.zoom(1 / .86);
    const x = key === 'arrowleft' ? -1 : key === 'arrowright' ? 1 : 0, y = key === 'arrowup' ? 1 : key === 'arrowdown' ? -1 : 0;
    if (event.shiftKey) {
      const distance = this.camera.position.distanceTo(this.controls.target) * .035;
      const delta = new THREE.Vector3().setFromMatrixColumn(this.camera.matrix, 0).multiplyScalar(x * distance).addScaledVector(new THREE.Vector3().setFromMatrixColumn(this.camera.matrix, 1), y * distance);
      this.controls.target.add(delta); this.camera.position.add(delta);
    } else {
      const spherical = new THREE.Spherical().setFromVector3(this.camera.position.clone().sub(this.controls.target)); spherical.theta += x * .09; spherical.phi -= y * .09; spherical.makeSafe(); this.camera.position.copy(this.controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
    }
    this.controls.update();
  }
  focusSurface(event) {
    if (!this.active) return; this.setSpin(false);
    const rect = this.renderer.domElement.getBoundingClientRect(), point = new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(point, this.camera);
    const hit = ray.intersectObject(this.active.wrapper, true)[0];
    if (hit) { this.controls.target.copy(hit.point); this.controls.update(); }
  }
  setSpin(value) { const next = Boolean(value && this.active && !this.disposed && !this.contextLost); if (next === this.spinning) return; this.spinning = next; this.controls.autoRotate = next; this.controls.autoRotateSpeed = .65; this.onSpinChange(next); this.invalidate(); }
  resize() {
    if (this.disposed) return;
    const width = this.host.clientWidth, height = this.host.clientHeight; if (!width || !height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(1800000 / (width * height)));
    this.renderer.setSize(Math.max(1, Math.floor(width * ratio)), Math.max(1, Math.floor(height * ratio)), false);
    this.camera.aspect = width / height; this.camera.updateProjectionMatrix(); this.invalidate();
  }
  cancelFrame() { if (this.frameId) cancelAnimationFrame(this.frameId); this.frameId = 0; this.lastFrame = 0; }
  invalidate() { if (!this.frameId && !this.disposed && !this.contextLost && !document.hidden && this.visible) this.frameId = requestAnimationFrame(time => this.render(time)); }
  render(time) {
    this.frameId = 0;
    if (this.disposed || this.contextLost || document.hidden || !this.visible) return;
    if (this.spinning && this.lastFrame && time - this.lastFrame < 1000 / 30) { this.invalidate(); return; }
    const delta = this.lastFrame ? Math.min((time - this.lastFrame) / 1000, .1) : 1 / 30; this.lastFrame = time;
    try { if (this.spinning) this.controls.update(delta); this.renderer.render(this.scene, this.camera); }
    catch { this.contextLost = true; this.setSpin(false); this.cancelFrame(); this.onFault('The graphics renderer could not display this asset. Reload the page and try a smaller or re-exported GLB.'); return; }
    if (this.spinning) this.invalidate();
  }
  dispose() {
    if (this.disposed) return; this.setSpin(false); this.disposed = true; this.cancelFrame(); this.release(this.active); this.active = null;
    this.resizeObserver?.disconnect(); this.intersection?.disconnect(); document.removeEventListener('visibilitychange', this.visibility);
    this.host.parentElement.removeEventListener('keydown', this.keyboard); this.renderer?.domElement.removeEventListener('dblclick', this.doubleClick); this.renderer?.domElement.removeEventListener('pointerdown', this.pointerFocus); this.renderer?.domElement.removeEventListener('webglcontextlost', this.loss);
    this.controls?.removeEventListener('change', this.change); this.controls?.removeEventListener('start', this.interaction); this.controls?.dispose();
    this.grid?.geometry.dispose(); this.grid?.material.dispose(); this.clay?.dispose(); this.wire?.dispose(); this.environment?.dispose(); this.scene?.clear(); this.renderer?.dispose(); this.renderer?.forceContextLoss(); this.host.replaceChildren();
  }
}
