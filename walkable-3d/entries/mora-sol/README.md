# MORA — Studies in matter

A compact, explorable brutalist museum. Two rooms, three original sculptures and one broad ramp. Geometry, textures, exhibit graphics and sculpture designs were made procedurally for this build; no external image or model assets are loaded.

## Launch later

From this folder in PowerShell:

```powershell
npm run preview
```

Then open **http://127.0.0.1:5187/** yourself. The production build is already in `dist/`. The command uses a strict, dedicated port and will exit if that port is occupied. Stop the server with **Ctrl+C** when finished.

For development, `npm run dev` uses the same port. If transferring the source to a new machine, run `npm ci`, then `npm run build`, then `npm run preview`. Node.js 20.19+ or 22.12+ is required by this pinned Vite version.

The `dist/` folder is also a standalone static web build that can be served by any ordinary HTTP server. Opening `index.html` directly using `file://` is not supported. Runtime access to the internet is unnecessary.

## Controls

- **Enter the museum / click canvas:** capture mouse and begin exploring.
- **W A S D** or **arrow keys:** walk. **Mouse:** look.
- **Shift:** walk faster. **Esc:** pause and release the cursor.
- **R:** reset to the entrance. **Controls:** settings and reset.
- **P:** toggle frame interval readings. The panel can download the actual recorded animation-frame intervals and camera positions as JSON.
- If pointer lock is unavailable, hold the left mouse button and drag to look while using keyboard movement.

Balanced rendering caps pixel ratio at 1.35 and uses reduced-resolution resin transmission. High increases the cap to 1.75; Low uses a cap of 1.0. Mouse sensitivity is adjustable. Movement and turn handling are independent of the HUD's measurement update rate.

The architecture, furniture and opaque sculpture parts are consolidated into shared material batches. Static world transforms and sun shadows are calculated once. Shader preparation happens behind the initial loading screen. Those are implementation choices, not measured performance results.

## Suggested inspection

Start in the gallery. Approach **Counterfold**, the thick folded copper work on the left, and **Meniscus**, three translucent resin volumes containing bubbles and copper filaments on the right. The offset portal leads to a **5.4 m-wide, 7.2 m-long ramp** with a **0.6 m rise (1:12)**. Enter the taller hall and circle **Held interval**, a twisted limestone loop on a low, bevelled circular datum. Look back through the broad opening and return down the ramp.

Gallery ceiling: 4.3 m. Hall ceiling: 8.8 m above datum, 8.2 m above its floor. Eye height: 1.66 m. The main sculpture has a fully clear 3.25 m-radius walking loop around its centre. Walls and plinths block movement, and floor height is continuous through both ramp thresholds.

## Validation and limits

`npm run check` performs source syntax checks and non-browser numerical checks for the connected route, ramp grade, continuous elevation, a full circle around the main work, boundary collision, plinth collision and return route. `npm run build` creates the production distribution.

**Interactive checks, browser rendering, shader compilation, screenshots, GPU execution and performance benchmarks were not run**, because this entry's implementation rules prohibit them. Frame interval readings are available for the later evaluator; they report browser `requestAnimationFrame` timing, not GPU duration. No measured frame-rate claim is made.

Requires a desktop browser with WebGL 2. Touch navigation is not implemented. The glazed entrance is closed; the visit stays within the requested museum spaces. Lighting and sun shadows are static. Resin uses Three.js screen-space transmission, so internal overlapping translucent details are an approximation rather than ray-traced optics. These material and visual choices need later browser inspection.

The exact implementation times, execution restrictions, test outcomes and cleanup receipt are in `RUN_RECORD.md`.
