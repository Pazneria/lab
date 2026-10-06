# Kestrel — Maintenance 07

A compact orbital maintenance bay built as a freely explorable Three.js environment. The central drive cartridge can be circled on the main floor. An open service alcove holds the bench and tooling. Sixteen ordinary stairs lead to an L-shaped inspection gallery overlooking the opened upper machine casing and the sealed orbital window.

## Launch the delivered build

From this folder, run:

```powershell
node serve.mjs
```

Then manually open **http://127.0.0.1:5187/** in a desktop browser. Alternatively, double-click **Start-Bay.cmd**. Neither launch method opens a browser automatically. Stop the local server with **Ctrl+C**.

The compiled `dist/` build is included. This launch method uses only Node.js built-in modules; it needs no npm install, external asset downloads, credentials or network access. Node.js 24.14.0 was available during implementation. A desktop WebGL2-capable browser and keyboard/mouse are required.

The preview server was **not started** during this run. Port 5187 was checked as free during packaging; a later user process could occupy it.

## Controls

| Input | Action |
|---|---|
| Click **Enter Maintenance Bay** or the scene | Capture the mouse and begin walking |
| Mouse | Look around |
| WASD or arrow keys | Walk / strafe |
| Shift | Brisk walk |
| R or **Reset** | Return to the entry and reset view |
| Esc | Release the mouse / pause walking |
| Detail selector | High, Balanced (default), or Low rendering settings |

Follow the inspection route: entry → circle the machine → service alcove on the right → stairs on the left → gallery → return down the same stairs. There is no elevator, jumping requirement, automatic tour or scripted transition. The gallery edge and rails block falls. Small floor cables do not create trip physics.

## Construction and rendering

- Human-scale layout in metres: a 14 × 16 m main floor, 3.4 × 5.4 m alcove, 2.72 m gallery, 1.8 m stair width, 170 mm risers and 300 mm treads. Eye height is 1.68 m.
- Bolted shell panels and ribs, panel corner radii, cable trays, cooling pipes, pressure glazing, analog instruments, drawer pulls, hanging wrenches, vise, regulator bottle, removable cover trolley and lifting frame.
- The drive cartridge has bearing rings, a spindle, copper feed lines, rubber hoses, cooling fins and visible rotor laminations under the removed upper quadrant.
- Procedural paint wear, anti-slip floor texture, brushed metal, hose ridges and contact shadows. All artwork and geometry were authored inside this workspace. There are no fetched image assets.
- Static geometry is merged by material. There is one cached shadow map, a generated reflection environment, and a limited group of local lights. No postprocessing chain or per-frame scene rebuild is used. Balanced resolution is capped at 1.5× device pixel ratio; High at 2×; Low at 1× with shadows disabled.
- Space is a procedural celestial backdrop inside a sky sphere, with exterior structural members providing local parallax. It is not a geographically accurate Earth model.

## Verification and limitations

**Passed:** JavaScript syntax checks; Vite production build; non-rendering collision/layout checks covering 2,992 route samples, all stair risers in both directions, both gallery ends, alcove access, major obstacles, rail blocking and prevention of gallery falls. The production bundle is approximately 548 kB of JavaScript before compression.

**Not run:** preview server, browser launch, WebGL/GPU execution, visual inspection, mouse/pointer-lock checks, interactive walking, frame-time measurements or performance benchmarks. These were explicitly excluded by the execution constraint. The numeric route check is not a substitute for an interactive test, and no frame-rate claim is made. Browser shader/runtime and final visual quality remain unverified until later testing.

The environment is intentionally static, with no machinery simulation, audio, touch controls or game objectives. Glass uses inexpensive transparent shading rather than ray-traced refraction. Decorative minor parts use the enclosing machinery collision volume where appropriate.

## Source and permitted checks

```powershell
npm ci
npm run check
npm run build
```

`npm start` is equivalent to `node serve.mjs`. For source development, `npm run dev` starts Vite on the same reserved port. Do not run the development and delivered-build servers simultaneously. The checked-in lockfile pins Three.js 0.180.0 and Vite 7.1.7. Third-party notices are included.

`RUN_TIMING.json` records start, deadline and stop in UTC. `RUN_RECORD.md` records model disclosure, restrictions, interruptions, checks and process cleanup. `CHECK_RESULTS.json` contains the numeric layout results.
