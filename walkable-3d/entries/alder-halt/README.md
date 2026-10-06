# Alder Halt

An abandoned station on a woodland branch, after the last passenger service in 1968. This is a real first-person WebGL 2 environment with a connected inspection route: entrance → waiting room → covered platform → timber crossing → woodland footpath → station view → entrance.

## Launch

The runtime library is bundled. No package installation, network connection, credentials or external assets are needed to explore.

```powershell
cd C:\Users\jmore\Documents\Codex\2026-10-05\task-7
node server.cjs
```

Open **http://127.0.0.1:4377** in a desktop browser, then click **Enter the station**. The browser has not been foregrounded by the build or tests. If port 4377 is already used, set `$env:PORT = 4378` before launching and use that address.

For the portable ZIP, change into the extracted folder containing `server.cjs` and run `node server.cjs` there. It contains the same bundled runtime and scene.

## Controls

| Control | Action |
|---|---|
| Mouse | Look, while captured |
| W A S D | Walk |
| Shift | Brisk walk |
| Arrow keys | Turn or tilt the view |
| R | Reset position and view to the entrance |
| Esc | Pause, release mouse and show controls |
| P | Show rolling frame times, percentiles, draw calls and triangle count |
| Q | Cycle Balanced / High / Performance rendering |

Reset and quality options also appear in the pause menu. Walking uses a 1.68 m eye height and 0.24 m collision radius. Doors, ramps and crossing require no jump.

## Scene

Procedural brick, timber grain and peeling paint, oxidized metal, slate, stone and bark. Open waiting room with floorboards, stopped clock, barred ticket hatch, stove, torn branch map and leaf drift. Corrugated canopy with iron supports, gutters and old lamps. Broken timetable case, damaged bench, newspaper, luggage trolley, disturbed coping and exposed roots. Detailed rails, sleepers, fastening plates and mixed ballast. Autumn tree crowns, saplings, ferns, grasses, litter, fallen trunk, fungi and milepost. Afternoon directional lighting, cool interior fill, static soft shadows, sky gradient and distance haze.

Geometry is merged into static material batches; leaves and ballast are instanced. Distant branches use fewer polygons. Shadows are computed during startup and retained. There is no live asset streaming or network activity during exploration.

## Verification

`evidence/verification.json` contains route and wall checks, real keyboard movement/reset results and per-view raw frame-time summaries. `evidence/navigation.json` records a continuous keyboard walk around the complete route, a camera turn beneath the canopy, reset and mouse release. PNGs show the inspected viewpoints. These captures support the tests; the browser environment is the delivered experience.

To rerun tests, install the pinned development dependencies with `npm ci`, set `CHROME_PATH` to an installed Chromium executable if needed, and run `npm test` or `node navigation-check.cjs` while the server runs. Browser tests use headless Chromium and do not show a browser window.

## Limits

- Desktop keyboard/mouse and a WebGL 2 browser are required; touch controls are not included.
- Forest bounds are finite. Small loose debris and foliage do not have individual collision shapes; major walls, trunks, fences, columns and furniture do.
- Leaves, lighting and shadows are static. No train, soundscape, weather simulation or day/night cycle.
- Headless frame times varied across runs on the shared host. Raw measurements are retained; this build does not claim a guaranteed frame rate. The P panel is available during the judge's separate interactive run.

## Build record

See `BENCHMARK.md` for the model disclosure, first implementation time, one-hour deadline, finish time and interruption record. Three.js **0.180.0**, MIT licensed, is bundled under `vendor/three`; its license is included. All scene content was created locally for this entry.
