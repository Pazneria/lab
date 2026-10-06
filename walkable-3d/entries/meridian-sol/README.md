# Meridian — Desert Observatory

A fully walkable, human-scale WebGL scene on a layered sandstone plateau in late afternoon. A vaulted south passage connects a thick-walled circular instrument chamber to a guarded north terrace. The open dome, equatorial refractor, inset niches, tile courses, stone paving, and sheltered sand are modeled or generated in the source.

## Launch the finished build

The `dist` folder is the production build. All assets are local; no internet connection or npm install is needed to run it. Node.js is the only launcher requirement.

From this folder, run:

```powershell
node serve.mjs
```

Then open **http://127.0.0.1:48673/** in a desktop browser. Alternatively, double-click `start-observatory.cmd`. The launcher does not open or foreground a browser. Leave its server running while exploring. Stop with Ctrl+C. An alternate port can be supplied as `node serve.mjs 48674` if needed.

## Controls

| Input | Action |
| --- | --- |
| Click Enter / Return | Capture mouse and explore |
| Mouse | Look in every direction |
| WASD or arrow keys | Walk |
| Shift | Brisk walk |
| R | Reset to the south passage |
| Esc | Release mouse and pause |
| F | Toggle measured rolling frame times and draw count |
| Quality button while paused | Switch between high and standard pixel resolution |

The requested route is passage → circle the instrument → north doorway → terrace edge → turn back → return. The central plinth, furniture, walls, buttresses, parapet, and horizon table have collision. The terrace is broad enough to bypass its furnishings comfortably. Steps use a smooth walking ramp over the visible stone treads.

## Build and inspect

```powershell
npm ci
npm run dev
npm run build
```

Development also uses localhost port 48673. Stop the production server before starting it. Three.js 0.180.0 and Vite 7.1.7 are pinned through `package-lock.json`. Static scene meshes are batched by material; the sunlight shadow map is rendered once and reused. Exposure stays fixed across all spaces.

`evidence/route-test.json` records the keyboard-driven route, viewpoints, collisions, reset, browser errors, and renderer counts. The accompanying screenshots are supporting evidence; the delivered artifact is the actual movable 3D environment. Performance measurements and their hardware/browser context are recorded separately in `evidence/performance-test.json`.

The final production build passes the complete inspection route and 12 control/collision checks, with zero browser errors and zero external requests. The separate 1920×1080, DPR 1 headless Chromium run on Intel integrated graphics recorded 4,958 frames: median 10.5 ms, p95 25.3 ms, p99 33.4 ms. It also recorded 12 frames over 50 ms, including a 283.3 ms maximum. Raw frame times are included; these measurements include automated input overhead and do not replace Jordan's live assessment. Initial preparation took 3.6 seconds in that run, including shader warmup.

## Limitations and benchmark record

- Desktop keyboard and mouse, WebGL2, and pointer lock are required. No touch controls.
- The distant dunes and mesas are simple scenery. Exploration is limited to the connected architecture and entrance steps, with protected edges.
- Dome and telescope parts are static. There are no extra game mechanics or automatic tour.
- Headless automated measurements are supporting evidence, not a claimed score or a substitute for Jordan's separate live performance assessment.
- Occasional long frames occurred in the automated run and are preserved in the report. The paused menu provides a standard-resolution option for slower hardware.

`BUILD_RECORD.json` records task start, actual first implementation time, the one-hour deadline, actual stop time, environment delays, and asset provenance. The runtime identifies this agent as GPT-6/Codex but does not expose an exact backend model identifier or reasoning-effort setting; those fields are recorded as unavailable rather than guessed. No other models, subagents, other entrant files, existing project assets, paid services, credentials, external communication, or public publication were used.
