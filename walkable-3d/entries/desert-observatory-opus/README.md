# Desert Observatory: explorable 3D scene

A small plaster observatory on a rocky mesa plateau in late-afternoon sun. Built with three.js r170 (installed locally from npm). All geometry and all textures are generated procedurally at load time. There are no external assets and no network fetches beyond the local server.

## Launch

```
cd opus-desert-observatory-entry
python -m http.server 5297 --bind 127.0.0.1
```
Then open **http://127.0.0.1:5297/** (or http://localhost:5297/). Any static server works. `node_modules/three` must be present: it is already installed, or run `npm install`. Loading takes a few seconds while the textures are generated.

## Controls

| Input | Action |
|---|---|
| Click | Capture mouse (pointer lock) |
| Mouse | Look |
| W A S D / arrow keys | Walk (2.6 m/s) |
| Shift | Walk faster (5.2 m/s) |
| R | Reset to the start position (outside the entrance) |
| 1 / 2 / 3 / 4 | Viewpoints: entrance · instrument · terrace edge looking back · under the dome looking up the slit |
| Q | Toggle render resolution (full / 0.7x fast mode) |
| P | Toggle the frame-time readout (fps, avg, p99, max ms, draw calls, triangles) |
| Esc | Release mouse |

## What's in it

- **Route:** East-facing stone steps lead into a shaded entrance passage. It has a flat viga-beam roof, a deep stone-lintel portal, deep barred slit windows, an open plank door and a tiled niche. The passage opens into a round chamber (6 m inner radius, 0.9 m thick walls, six deep barred windows, two doorways, stone benches). The west doorway leads onto a sunlit terrace with a parapet at the plateau edge. Stairs on the terrace's south side go down to the plateau, so you can walk all the way around the building.
- **Dome:** A thick shell with a meridian slit that runs past the zenith. It has bronze slit rails, an up-and-over shutter parked on the back, wooden interior ribs and a bronze rail ring with bogies.
- **Instrument:** A German-equatorial refractor on an octagonal stone pier, built from these parts:
  - mount: latitude casting, polar housing with toothed worm wheel and worm, engraved RA, Dec and azimuth setting circles, latitude screws, slow-motion cables;
  - balance: counterweight shaft with two weights;
  - tube assembly: saddle and tube rings, banded tube, objective cell, dew shield, lens, focuser with knobs, star diagonal, eyepiece, and a finder scope on brackets.
  
  The tube points out through the slit. A collision ring keeps you about 1.7 m from the axis, so you can circle it without clipping.
- **Materials:**
  - sun-bleached trowelled plaster, with low grime at the base and weathering streaks under the cornice;
  - dressed sandstone and coursed masonry;
  - flagstone floors;
  - worn bronze with verdigris (PBR metalness and roughness);
  - cool cobalt and turquoise glazed tiles with chips: chamber band, pier ring, door surround, parapet strip, passage niche;
  - weathered wood.
- **Sand:** Sand collects on the leeward (east/north-east) side of the drum and passage, inside the passage along the walls, in the step corners, in the lee of the terrace parapet and its corners, as a fan blown in through the west door, and behind boulders. The plateau has rock slabs, boulders and gravel. The distant mesas and dunes are simple silhouettes under haze.
- **Lighting:** One low sun (17° elevation, from the WSW) casts a 4096² shadow map that is rendered only once, because the scene is static. Ambient light is an IBL sky with warm ground bounce. A position-based ambient-occlusion term darkens the chamber, the deep openings and the passage gradually. Exposure is fixed, so there is no exposure shift between the passage, the chamber and the terrace.

## Performance notes / tests run

- Geometry is merged by material into about 25 draw calls (about 390k triangles). The shadow map is rendered once.
- Default pixel ratio is capped at 1.0. If average frame time stays above 18 ms over 120 frames, the resolution drops one-way, in 0.15 steps down to 0.7x. It never steps back up, so it cannot oscillate. Q overrides it.
- Measured on this machine (Intel integrated graphics, ANGLE/D3D11, Chrome-based pane). Each figure is the GPU-synced average over 40 frames while turning:
  - 1280×720: about 6–7 ms/frame at entrance, passage, circling the instrument, looking up the dome, and the terrace look-back.
  - 1920×1080: about 8.5–12 ms/frame.
  
  These are synthetic render timings taken in a hidden preview pane, not an interactive rAF capture. Please judge with your own frame-time tool.
- **Automated walk tests (simulated key input):**
  - steps → passage → chamber (slides around the pier) → west door → terrace, stopping at the parapet;
  - terrace stairs → full loop around the building on the plateau;
  - walking toward the cliff stops at the plateau boundary;
  - no console errors.

## Known limitations

- Collision is 2D (walls, pier, rocks) plus a floor-height map. There is no jumping or crouching, and the eye height is fixed at 1.65 m. The eyepiece is about 1.2 m above the floor, and you can't get closer than about 1.7 m from the pier axis.
- Ambient occlusion is faked with a position-based term plus hard sun shadows. There is no SSAO and no bounce GI. Two cheap point lights stand in for bounce light in the chamber and passage.
- The cliff faces use a heightfield, so the texture stretches on the steepest strata. Distant mesas are deliberately low-detail.
- Textures are generated on the main thread, which takes a few seconds behind the loading screen.
- The browser pane used for testing was hidden, so frame times could only be measured with synchronous render loops, not live interactive capture.

## Run log

- Model: Claude Opus 5.5 (`claude-opus-5-5`), running in Claude Code desktop. Effort: the session's configured default. I didn't change it, and the exact level isn't exposed to me.
- Session start (first command): 2026-10-06 00:49:32 EDT
- First implementation file written (index.html): 2026-10-06 01:00:45 EDT
- One-hour deadline: 2026-10-06 01:49:32 EDT
- Stop timestamp (last edit): 2026-10-06 01:19:19 EDT
- Interruptions: none.
- Local port: 5297. No subagents, other models, paid services or external assets were used.
