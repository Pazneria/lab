# The Aster Reading House

An explorable hillside library made specifically for this benchmark. The main room has a pitched timber ceiling, tall north and east windows, a partial L-shaped gallery, a broad timber stair, and a connected window reading alcove. The lower collections, quiet corner, alcove, stair, gallery, and overlook form one continuous route.

## Launch

The Three.js runtime is included in `vendor/`. No installation or network connection is needed to launch the delivered build. Use Node.js 20 or newer (the implementation environment has Node.js 24.14.0).

```powershell
cd C:\Users\jmore\Documents\Codex\2026-10-06\task-17
node server.mjs
```

Then open **http://127.0.0.1:4387** manually in a desktop browser with WebGL 2 and hardware acceleration. Click **Enter the library**. Stop the server with **Ctrl+C** when finished. The server binds to localhost only, does not open a browser, and is not running at delivery.

For the ZIP version, extract it to a folder, open a terminal in that folder, and run the same `node server.mjs` command. Do not open `index.html` through a `file:` URL; browsers restrict local module imports.

If this port is occupied during later testing, use `$env:PORT=4388; node server.mjs` and visit that port. Port 4387 was chosen as this entry's distinct preview port.

## Controls

| Control | Action |
| --- | --- |
| WASD or arrow keys | Walk |
| Mouse | Look while the mouse is captured |
| Click and drag | Look if mouse capture is refused |
| Shift | Faster walk |
| Esc | Release mouse / pause movement |
| R or Reset button | Return to the entrance |
| H or Controls button | Show the controls |
| F or Frame times button | Show rolling frame intervals |
| Detail selector | Balanced, High, or Light rendering |

Toolbar buttons are accessible after releasing the mouse. Movement has a short acceleration response, diagonal speed normalization, collision sliding, and short movement subdivisions. The staircase uses a continuous collision ramp beneath its visible individual treads. Major walls, windows, bookcases, furniture, stair sides, and gallery guardrails block the visitor; smaller decorative objects are not collision obstacles. There is no jump or free-flight mode.

## Inspection route

From the entrance, walk left to the lower wall collections. The low double-sided shelf and freestanding case can also be browsed from the main aisle. Cross the main room to the east-side alcove; its opening is wide and level with the main floor. Return to the west-side stair and walk between the handrails. On the gallery, pass the reading chair on either side, follow the collection toward the north return, and look back over the room at the inner rail. Return using the same stair.

Human-scale reference dimensions: 1.66 m eye height, 3.0 m stair width, 20 risers at 175 mm, 280 mm treads, 3.5 m gallery elevation, and about 1.05 m gallery guardrail height.

## Visual and rendering design

- Deterministic, varied books with individual paper blocks, thin covers, textured spines, some raised bands, leaning volumes, horizontal stacks, archive boxes, and deliberate gaps.
- Warm grained timber, painted plaster and panelling, dark iron straps and railings, brass fittings, mottled leather upholstery, and two distinct woven rug designs.
- Tables arranged with open books, cups, a globe, writing objects, plants, and an old book press. Gallery furniture and shelf-top arrangements are detailed for views from above.
- One late-day directional light with cached shadows through actual window openings, sky fill, and warm lamps in shaded areas. Exterior terrain and distant trees supply a simple hillside view.
- Static geometry is merged by material. Shadows update at initial render and when the viewer changes detail settings. No assets stream in while moving, no LOD swaps occur, and no automatic quality changes interrupt the route.

Balanced is the default: up to 1.4 device pixel ratio with a 2048-square shadow map. High uses up to 1.75 and 4096-square shadows. Light caps pixel ratio at 1 and disables directional shadows. Antialiasing remains enabled. These are implementation settings, not measured performance results.

The frame-time panel shows the mean, median, and 95th percentile of requestAnimationFrame intervals over the last five seconds, plus current draw and triangle counts. It measures CPU frame intervals rather than GPU elapsed time and is provided for later inspection; it has not been used during this run.

## Validation and limitations

`npm run build` copied the pinned Three.js 0.180.0 runtime and its geometry merge helper into the delivery. `npm run check` passed JavaScript syntax, local dependency and artifact checks, UI ID binding checks, and constant layout dimension/connectivity checks. It does not construct or render the scene and does not simulate movement.

**Interactive, visual, collision traversal, GPU, and performance checks were not run.** The current execution constraint explicitly prohibited preview servers, browser/UI control, scene execution, and performance benchmarks. No screenshot or video was produced. The build is therefore supplied for subsequent browser evaluation, and no measured frame-rate claim is made.

The initial procedural texture and geometry preparation has not been timed. Collision uses conservative rectangular furniture footprints and a smooth stair ramp; contact with curved furniture will be approximate. The experience is designed for a desktop keyboard and mouse. The hillside backdrop is deliberately simple, and pages and catalog labels are decorative.

## Run record

Exact times, model identity disclosure, environment constraints, static check evidence, and final process cleanup are recorded in `RUN_RECORD.json`. The model is identified as GPT-6 by session instructions; the exact backend variant and reasoning effort are not exposed, and no model or effort override was used. No other models, subagents, entrant files, project assets, or external services were used. The only fetched dependency was the pinned reputable registry library.

The first implementation time was **2026-10-06 19:34:21 UTC** and the one-hour deadline was **2026-10-06 20:34:21 UTC**. The final stop timestamp is in the run record. There were no human interruptions. The initial sandboxed package download failed; a permitted registry retry succeeded without pausing the implementation clock.

The Three.js MIT license is included at `vendor/THREE-LICENSE.txt`. All scene geometry, procedural textures, artwork, and application code were created in this new workspace for this entry.
