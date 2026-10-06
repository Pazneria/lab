# Bracken Hollow

An explorable, abandoned woodland railway station in autumn. Built with Three.js, original procedural geometry, and locally generated canvas materials. There are no runtime asset downloads or external services.

## Launch

The local preview uses **http://127.0.0.1:5187/**.

The ready-made build needs only Node.js; no install is needed to launch it:

```powershell
node serve.mjs
```

For development from the included source, use `npm ci` followed by `npm run dev`.

The port is strict: another application will not silently force this build onto a different address. To create the distributable static build:

```powershell
npm run build
```

The generated `dist` folder can be served by any ordinary static HTTP server. The included `serve.mjs` binds only to localhost. Do not open `index.html` directly with a `file:` URL.

## Controls

- Click **Enter the station** to capture the mouse.
- **WASD / arrow keys:** walk.
- **Mouse:** look around.
- **Shift:** brisk walk.
- **R / Reset:** return to the entrance.
- **Esc:** pause and release the mouse.
- **F:** show measured frame timing and rendering statistics.
- The detail button switches rendering resolution and shadow quality.
- When mouse capture is unavailable, drag the scene to look around.

Follow the entrance gap through the waiting room and onto the covered platform. Walk right to the timber crossing, then follow the gravel-edged woodland path. The path loops past a station viewpoint and back toward the entrance.

## Notes

This is a compact desktop exploration scene, with collision against the main walls, furniture, canopy supports, fences, and tree trunks. The level walking controller follows terrain and traversable steps; there is no jumping, train simulation, or gameplay objective. The distant woodland is scenery beyond a bounded walking area. Foliage and lighting are static. Quiet synthesized wind and footfall sounds start only after entering.

Timing records, test evidence, and benchmark provenance are in `BUILD_LOG.md` and `artifacts/`. Frame timing from a headless local browser is diagnostic evidence, not a guaranteed frame rate on another machine.

High detail caps the drawing buffer at approximately 1.8 million pixels for large displays; balanced detail caps it at 0.9 million. The interface remains at the browser's normal resolution.

Three.js is distributed under the MIT license; its notice is included in `THIRD_PARTY_LICENSES.txt`.
