# Mass & Light

A small, walkable brutalist museum. Three original procedural sculptures occupy an entrance gallery and a taller sculpture hall, joined by a broad, gentle ramp. All geometry, surface textures, exhibit typography, and interface assets were authored inside this workspace. Three.js is the only runtime library. No runtime downloads or external services are required.

## Launch the frozen build

Requires a current desktop browser with WebGL 2 and a locally installed Node.js runtime (Node 22 or newer recommended).

1. Open a terminal in this folder.
2. Run `node serve.mjs` (or double-click `launch-museum.cmd` on Windows).
3. Open **http://127.0.0.1:5189/** manually.
4. Click **Enter the museum**.

The launcher serves the existing `dist` folder. It needs no npm install, does not open a browser, binds only to loopback, and refuses to replace a process already using port 5189. Press **Ctrl+C** in that terminal to stop it. Do not open `index.html` using a `file:` URL.

## Controls

| Action | Control |
|---|---|
| Walk | W / A / S / D |
| Look | Mouse after clicking Enter |
| Faster walk | Hold Shift |
| Pause / controls | Esc |
| Return to entrance | R, or Reset position in the menu |
| Keyboard look | Arrow keys |
| Mouse fallback | Drag on the scene if pointer lock is unavailable |
| Frame-time display | F |
| Clear measurement history | T |
| Export measurement history | Pause, then click `↓ log` in the frame-time panel |

The menu includes look sensitivity and three rendering detail levels. Balanced caps pixel ratio at 1.5; High allows 2 and increases shadow resolution; Lightweight caps it at 1 and reduces shadow resolution and resin transmission. Geometry and walkable space stay the same.

## Inspection route and scale

- Entrance gallery: 12 × 12 m; ceiling 4.4 m, with two 1.05 m deep roof apertures.
- Ramp: 4.8 m wide, 6.5 m long, rising 0.65 m (1:10). The floor follows the slope continuously.
- Sculpture hall: 18 × 14.5 m; floor at +0.65 m, ceiling at 7.8 m absolute; 1.35 m deep skylight.
- Eye height: 1.68 m. Collision radius: 0.24 m. No jumping or head bob.
- The main 3.96 m plinth has a clear walking circuit on all four sides. Furniture remains along the perimeter.
- **Quiet aperture:** a pale limestone solid with an off-axis through-hole and modeled bevels.
- **Held light:** three closed, rounded amber-resin crescents in a bronze cradle.
- **Counterfold:** a continuous, folded titanium ribbon with modeled thickness, polished edges, and a differently finished reverse face.

## Build from source

`npm ci` followed by `npm run build`. Development mode is available through `npm run dev`, on the same strict port 5189. Do not run both servers together. The lockfile pins the installed dependencies.

## Verification and limits

The implementation run was restricted to static and build checks. **No browser, server, GPU scene execution, interactive checks, or performance benchmarks were run.** Actual appearance, pointer lock, navigation, collision behavior, and frame-time performance remain unverified in a browser and require the later inspection round. A successful production build is not evidence of frame rate.

The optional in-scene log records `requestAnimationFrame` intervals during active exploration, with position, quality setting, mean, p95, and p99. It is not a GPU timer. Paused/hidden intervals are excluded, and samples are capped to avoid unbounded memory growth. No performance results have been pre-populated.

Lighting uses one cached directional shadow map, rectangular skylight fill lights, an environment map, and authored contact shading. Resin uses real-time screen-space transmission, so its refraction has the limitations of that technique; reflections use a static environment. No touch movement UI is provided. The entrance doors are a boundary of this compact interior, not an exit to another scene.

See `RUN-RECORD.md` for model disclosure, exact timing, interruptions, and cleanup evidence. Jordan assigns scores.
