# CharacterBench inspection studio

A common browser-local stage for character assets. This is product work, **not a benchmark entrant**, scoring system, autorigger, or animation editor. The calibration dummy is an engineering fixture made of nine boxes, clearly labeled throughout the interface. No competing character assets are included.

The entire implementation lives under `character-studio/`. It adds no homepage link, route change, root dependency, build system, service, account, storage backend, or deployment configuration. The intended eventual path is `/lab/character-studio/`; it has **not been published**. Parent coordination is required before integration/publication.

## Shared inspection

- Add multiple local GLB files, then switch the selected entrant in one viewport. Only one model is rendered; a replacement is validated/prepared before the old one is released. Camera orientation, relative target offset, distance, lighting, exposure, backdrop and material mode carry across selections. Spin stops on selection and interaction.
- Three lighting presets: neutral studio, raking light, and contrasting warm key/cool rim. A small procedural neutral reflection environment supports metallic materials; no remote HDR image is required. Exposure is in stops with Neutral tone mapping and sRGB output.
- Stable Y-up orbit, screen-space pan, zoom, frame, reset, front/side/back/top views, and double-click surface focus. No pointer lock, global mouse hooks, keyboard capture, external window, or held-input tooling.
- Original materials are the default. Optional neutral clay and wireframe views show both sides as explicitly labeled diagnostics. Returning to Original restores the exact loaded material references, alpha settings and sidedness.
- Static exported pose only. Morph weights and optional skinning are displayed as exported. No animation mixer or animation playback is created. Embedded cameras/lights/clips are excluded from the inspection copy to keep studio conditions common; source files are never rewritten.
- Native labeled controls, visible keyboard focus, responsive panels, polite loading status, explicit errors and load cancellation. Controls sit outside the viewport except for small noninteractive corner captions. Mouse, touch and focused-viewport keyboard controls are described in the interface.

The first file is framed automatically. Switching models normalizes their **largest dimension to 2.6 display units**, centers X/Z, and grounds the preview. Geometry, textures, skin bindings and relative transforms remain intact inside that display wrapper. Metadata reports the original scene dimensions in glTF meters. These are authored dimensions, not independently measured real-world scale. The normalized grid is a display reference, not a meter ruler or evidence of contract compliance. Frame recenters the current view; Reset restores the original three-quarter view. Front looks toward -Z at the character's +Z front.

The file collection lives only in the current tab. Removing files or closing/reloading the page releases references; there is no IndexedDB, localStorage, upload, analytics, image export, or automatic Git operation. Multiple entrant files can be imported, but no entrant HTML/JavaScript is accepted.

## Provisional asset compatibility

Final benchmark eligibility is still under discussion. This viewer does not enforce humanoid anatomy, naming, quad topology, pose quality, or rigging readiness. A skeleton is optional. Multiple meshes are supported. Skin/joint counts do **not** establish that the asset is ready to rig or deforms correctly.

Recommended authoring conventions from parent research: glTF meters, +Y up, +Z front; feet at Y=0 centered between the feet where applicable. A neutral A/T pose with limb clearance may aid later rigging for humanoids. These are guidance, not automatic rejection rules for stylized or nonhuman characters.

This preview accepts:

- GLB 2.0, one scene, one embedded binary buffer, with multiple root/mesh nodes allowed.
- Dense triangle-list/strip/fan geometry. Export sparse accessors as dense for this preview. Lines/points, instancing/compression extensions and additional scenes require re-export.
- Embedded PNG and baseline/progressive JPEG images in bufferViews. Constant PBR factors without textures are welcome. External dependencies and data URIs are rejected before the loader runs.
- Core metallic-roughness PBR and these pinned Three.js r180 extensions: `KHR_materials_unlit`, `KHR_texture_transform`, `KHR_mesh_quantization`, `KHR_materials_clearcoat`, `KHR_materials_emissive_strength`, `KHR_materials_ior`, `KHR_materials_specular`, `KHR_materials_transmission`, `KHR_materials_volume`, `KHR_materials_sheen`, `KHR_materials_iridescence`, `KHR_materials_anisotropy`, `KHR_materials_dispersion`.
- Optional core skins (up to four joint influences per vertex) and dense morph targets in their exported static state. Animation clips are counted, then excluded from parsing/playback.

Unsupported extensions produce an explicit error, including Draco, Meshopt, KTX2/Basis, WebP/AVIF texture extensions, and vendor extensions with no reviewed support. These exclusions are a **viewer compatibility profile**, not a judgment on the asset. Real-time transmission and transparent surface ordering still have renderer limitations. Unlit materials intentionally ignore lighting in Original mode. Color/detail correctness must be inspected with representative assets during authorized runtime QA.

## Resource and privacy boundary

| Budget | Limit | Purpose |
| --- | ---: | --- |
| GLB / collection | 64 MiB / 192 MiB, 12 files | Bound file memory |
| JSON / hierarchy | 4 MiB / 512 nodes, depth 64 | Bound parsing and recursion |
| Displayed primitives | 512 | Bound scene work |
| Displayed triangles / vertex references | 750,000 / 1.5 million | Count repeated mesh nodes too |
| Decoded accessor bytes | 96 MiB | Reject oversized/overlapping allocation claims |
| Material definitions / images | 128 / 32 | Bound surface complexity |
| Image edge / combined image pixels | 4,096 / 16,777,216 | Bound texture decode before allocation |
| Texture-binding pixels / parsed texture-copy pixels | 16,777,216 / 33,554,432 | Bound repeated maps/transforms before GPU upload |
| Preflight + image decoding | 30 seconds | Terminate the dedicated worker on timeout/cancel |
| Render resolution | max DPR 1.5 and 1.8 million pixels | Bound fill cost |
| Automatic spin | opt-in, at most 30 render frames/s | Avoid an idle render loop |

These are conservative operational guardrails, **not benchmark polycaps or quality scores**. An allowed asset can still be expensive on low-end hardware; the profile is not a GPU memory guarantee. No browser-side validator can guarantee recovery from a driver failure. Renderer/context failures are surfaced with a reload instruction.

GLB headers, chunk boundaries, dependency references, accessor ranges/alignment, floating-point data, triangle indices, hierarchy cycles, skins, texture dimensions and supported extensions are checked before scene parsing. Exporter position bounds are recomputed. Texture decoding runs sequentially in the cancellable worker. Bitmaps transfer to the main thread; a scoped pinned-loader adapter injects those images directly. The loader's URL modifier rejects any attempted resource request. The page CSP separately disallows external scripts, frames and network destinations. File names and metadata use `textContent`, never HTML interpolation.

This is defensive preflight for the viewer, **not a full Khronos conformance validator or a security certification**. The main-thread Three.js parser is serialized and bounded but not independently interruptible once parsing starts; Cancel prevents installation of a stale result and releases it when parsing settles. A previous model stays visible on validation/parse failure. New files do not execute code.

Idle rendering is demand-driven. Visibility loss stops spin; an offscreen viewport suspends its loop. Reduced motion disables automatic spin while retaining direct camera interaction. Model replacement/removal releases geometries, materials, textures, skeleton allocations and transferred ImageBitmaps. Failed/stale parses settle tracked branches before cleanup. Page exit disconnects observers, cancels frames/workers, clears the collection and releases the renderer/context. Returning from the browser's page cache shows an empty, restartable studio.

## Observed facts

Triangle and vertex-reference counts describe the selected scene with repeated mesh nodes included; vertex references are not welded unique vertices. Primitive counts do not claim measured draw calls. Material/image counts describe definitions in the file, including unused definitions. Dimensions come from the loaded scene in its exported pose. Skin/joint/clip presence and extension names are reported without scores, pass/fail grades, or rigging claims.

## Serving and review

This is a buildless static folder. It requires HTTP(S), JavaScript modules, module workers, WebGL 2 and worker ImageBitmap decoding for textured models. `file://` is unsupported. No package install or build is needed. `package.json` only identifies ESM for the deferred dependency-free data tests; it has no browser runtime dependencies.

**Local QA pause is still in force. Do not start a server, browser, Playwright, CUA, WebGL scene, or local test runner until the parent/user lifts it.** No existing checked-in remote test workflow was found at base `0fd498f03891b8f0d5f511dcf524a7a79eaec8fe`; a new remote runner was not created. See [review record](./REVIEW.md) for what was actually verified and the deferred checklist.

Prepared data-only tests, for a future authorized session with Node 22+: `node --test character-studio/tests/glb-policy.test.js`. This command was **not run**. Browser lifecycle, image color, camera framing, accessibility, mobile layout and GPU behavior remain unverified.

## Source references

- [Khronos glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html): binary container, coordinate conventions, scene/material/skin data.
- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html) and [pinned r180 loader source](https://github.com/mrdoob/three.js/blob/r180/examples/jsm/loaders/GLTFLoader.js): local import and material handling. This implementation is pinned to r180; newer documentation can describe APIs absent from r180.
- [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html) and [pinned r180 controls source](https://github.com/mrdoob/three.js/blob/r180/examples/jsm/controls/OrbitControls.js): orbit, pan and dolly behavior.
- [Blender glTF exporter documentation](https://docs.blender.org/manual/en/dev/addons/scene_gltf2.html): parent-provided authoring guidance; exported geometry is commonly triangulated.

Dependency provenance and local import-path adaptations are recorded in [vendor notes](./vendor/README.md).
