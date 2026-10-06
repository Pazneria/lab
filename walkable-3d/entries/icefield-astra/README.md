# ICEFIELD — Station 07

A compact polar field station at clear blue twilight. All scene geometry, material textures, diagrams, labels, and furnishings were created procedurally for this entry. No external project assets, other models, or subagents were used.

## Launch

Double-click **start.cmd**, or open a terminal in this directory and run:

```powershell
node tools/server.mjs
```

Open **http://127.0.0.1:52941/** in Chrome or Edge. Node.js is the only requirement. No package install, internet connection, or credentials are needed. The server is local only and does not automatically open a browser.

## Controls

- Click **Explore the station** to capture the mouse.
- **Mouse:** look around. **W A S D:** walk. **Shift:** faster walking.
- **Up/Down arrows:** forward/back. **Left/Right arrows:** turn.
- **Esc:** release the mouse. Click the scene or Continue to resume.
- **R** or **Reset view:** return to the sheltered snow.
- **F:** display rolling frame times, p95, draw calls, and render resolution.
- **H:** hide/show the interface.
- **Quality:** switch between High and Balanced render resolution.
- If mouse capture is unavailable, hold and drag the scene to look.

The walking route leads around the entrance, up a shallow grated ramp, through two open doors, into the main research/living room, and back to the snow. Movement is collision-tested and frame-rate independent. The floor rises continuously by 30 cm through the ramp; there is no gravity or jumping mechanic.

## Technical notes and limitations

- Desktop keyboard and mouse experience; touch movement is not implemented.
- Requires WebGL2. The tested browser is Chrome on Windows.
- Doors and furnishings are fixed. The explorable area is deliberately bounded; distant mountains are scenery.
- Lighting has fixed exposure. Shadows are rendered during initial loading, then cached because the environment is static.
- Balanced is the default and caps device pixel ratio at 0.85. High caps it at 1.65. Geometry, furnishings, and lighting stay the same; select High for sharper rendering when your graphics hardware has headroom.
- Automated headless measurements are development evidence, not a claim about performance on the judging machine. Use **F** while exploring for current frame-time readings.

See `verification` for saved viewpoints, navigation/collision results, route samples, and frame-time measurements. See `BUILD_RECORD.md` for the actual implementation window, deadline, stop timestamp, and model-identification limitation.

Three.js is used under its MIT license, included in the portable build.
