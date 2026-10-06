# Saffron Observatory

A fully explorable desert observatory built with Three.js. All architecture, instruments, terrain, textures, charts, and weathering were made procedurally for this entry.

## Launch

The preview is served at **http://127.0.0.1:4316**. The server binds to localhost only.

From this folder:

```powershell
npm start
```

Dependencies are included in `node_modules`. If they need reinstalling, run `npm ci` first. Use an HTTP server rather than opening `index.html` directly. An alternate port can be selected with `$env:PORT = '4317'` before `npm start`.

## Controls

- Click **Enter the observatory** to capture the mouse.
- **WASD** or **arrow keys**: walk; **mouse**: look.
- **Shift**: faster walking.
- **Esc**: release the mouse; use **Continue exploring** to capture it again.
- **R** or **Reset**: return to the entrance.
- **P** or **Performance**: show frame intervals and render-quality settings.
- With the mouse released, **click and drag** the scene to look; double-click to capture the mouse again.

Steps are automatic. There is no jumping or flying. The camera has a 1.65 m eye height and a 25 cm collision radius. Walls, instrument clearance, furniture, and terrace edges constrain movement.

## The route

Walk north through the shaded barrel vault into the circular instrument chamber. Circle the telescope in either direction; the clear route is approximately 2.75 m from its center. Look upward through the open dome, then pass through the opposite arch and descend the shallow steps onto the terrace. The parapet protects the perimeter. Turn back toward the chamber and return through either side of the instrument.

## Rendering and measurement

- Static geometry is merged by material; there are no external asset requests during exploration.
- A single 2048 px directional shadow map is rendered at setup and reused. Lighting and exposure stay fixed.
- Standard PBR materials use locally generated plaster, stone, sand, bronze, and patina textures. The telescope, masonry arches, coping, dome ribs and shutters, tiles, sand drifts, and distant mesas are geometry.
- High quality caps pixel ratio at 1.65. Balanced caps it at 1.15. Low uses 0.85.
- The performance panel displays rolling 10-second average, median, p95 and p99 frame intervals, plus draw calls. **Save measurements** exports the foreground frame samples collected since entering, including slow frames. Startup compilation and hidden-tab time are excluded. These are requestAnimationFrame intervals, not GPU timings.

## Validation

`npm test` runs the inspection route in headless Chrome using the actual keyboard movement and collision code, with programmatic gaze aiming. It checks entry, pointer capture, mouse look, reset, a complete circle, both connecting passages, terrace collision, return, the performance panel, and browser errors. It writes `evidence/route-test.json` with checks, positions, and frame samples.

The final route test passed **40/40 checks**, including render-quality switching and measurement export, with **no browser errors**. It ran on headless Chrome using ANGLE / Intel Graphics / Direct3D 11 at a 1440 × 1000 viewport. The exported sample data is retained in the evidence folder; no score is claimed.

`node inspect.mjs` captures the opening, chamber, instrument, dome, terrace return view, horizon, and entrance. `node smoke.mjs` captures close details and checks Escape and the WebGL renderer. Screenshots are supporting evidence; the delivered experience is the live walkable scene.

Headless measurements are development diagnostics and are not presented as a performance score. Independent interactive performance judging remains appropriate.

## Known limitations

- Desktop keyboard and mouse are required; touch controls are not implemented.
- WebGL2 is required. Chrome is the tested browser; other browsers may handle pointer capture differently.
- The telescope, sundial, and dome shutters are static display objects. The landscape beyond the terrace and entrance apron is intentionally outside the walking area.
- The exact runtime model ID and reasoning-effort setting were not exposed to this session. `BUILD_RECORD.json` records this rather than inventing them.

## Timing and provenance

`BUILD_RECORD.json` contains the actual first file creation time, conservative one-hour deadline, actual stop timestamp, and interruptions. No other models, subagents, paid services, external art assets, or other entrants' project assets were used. The only installed packages are pinned Three.js and Playwright dependencies from npm. The browser was tested headlessly and was not foregrounded.
