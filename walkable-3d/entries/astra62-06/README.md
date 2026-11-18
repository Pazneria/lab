# Hollowmere Cavern

Hollowmere is a first-person WebGL 2 limestone cavern. The rope traces the dry western shore of a shallow pool. Follow it around the bend, pass under the rock arch, and climb the sloping bed to the surveyor’s level on the upper landing. The eastern shelf provides another view across the water.

## Launch

From the folder containing `index.html`, run this command with Python 3.

```powershell
python -m http.server 48626 --bind 127.0.0.1
```

The suggested launch address is **http://127.0.0.1:48626/**. Open it in a WebGL 2 browser after starting the command. Press Ctrl+C in the terminal to stop serving. All scene assets are included locally.

## Controls

| Action | Input |
| --- | --- |
| Enter mouse-look | Click **Enter cavern** or click the scene |
| Walk and strafe | W, A, S, D |
| Look | Mouse, arrow keys, or drag the view |
| Walk faster | Hold Shift while moving |
| Return to entrance | R or **Reset** |
| Release mouse | Esc |
| Show controls | H or **Controls** |
| Touch navigation | Walk with the lower-left pad and drag the scene to look |

The walker has a 1.62 m eye height. A clearance field constrains movement against the pool, stone, and major props. Reset returns both position and viewing direction to the entrance recess.

## Rendering

The rock shell, erosion scallops, dipping ledges, flowstone, bridge, survey equipment and texture maps were generated for this entry. Ambient occlusion and diffuse light transfer are baked into the geometry. A shadow map and a reflection probe are created once at startup. Spatial batches outside the view are skipped, and small formations have distance-dependent geometry. The render buffer is capped at approximately two megapixels.

The water combines the visible submerged bed, animated surface normals and a parallax-corrected reflection probe. Reflections near irregular banks are approximate. The build requires WebGL 2 and HTTP serving.

## Verification

The workspace includes `verify.mjs` for repeatable CPU-only asset and geometry checks. Run `node verify.mjs` from the workspace. It validates mesh indices, bounds, normals, texture payloads, walking connectivity and sightlines. The portable ZIP contains the ready-to-serve build.

For this delivery, all 11 JavaScript modules passed syntax checks. All four shader pairs compiled and linked with Khronos glslang 11.7.0 on the CPU. The 29.99 m entrance-to-landing route gained 1.84 m of elevation. Static checks connected 11 reference positions and confirmed five views to the water, including the view back through the arch.

Browser launch, rendering, interactive inspection and frame-time measurement are reserved for the separate judging session. Timing, execution identity information and file hashes are recorded in the workspace’s `RUN.json`.

