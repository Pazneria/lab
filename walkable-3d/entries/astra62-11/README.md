# Fieldwork — Instrument Hall

A standalone first-person metrology lab for SceneBench 2026-11-17, scene 11. The **Parallax PX-01** scanner surrounds a calcite specimen with eight optical heads. Its rear face carries the reference collimator, harness and service connections. The west alcove houses the **Sightline** calibration bench. The east alcove houses the **Vector M3** arm, linear stage and console.

## Launch

With Python 3 installed, run this command from the extracted build directory.

```powershell
python -m http.server 54111 --bind 127.0.0.1
```

The suggested launch address is **http://127.0.0.1:54111/** after starting the command.

The original workspace can be served from any directory with this command.

```powershell
python -m http.server 54111 --bind 127.0.0.1 --directory "C:\Users\jmore\Documents\Codex\2026-10-26\task\batch-20261117-gpt62\entrants\astra\scene-11"
```

Open the address in a current desktop browser with WebGL 2 and gzip DecompressionStream support. Stop the local server with Ctrl+C. The shipped build includes Three.js and every texture. Launching it requires only a static file server. All scene data loads locally.

## Controls

| Action | Input |
| --- | --- |
| Capture mouse / enter | Click the scene or **Enter hall** |
| Look | Move the mouse. Drag on the canvas when capture is unavailable |
| Walk / sidestep | W A S D |
| Faster walk | Hold Shift |
| Keyboard movement and look | Up / Down to walk, Left / Right to turn, Page Up / Page Down to tilt |
| Release mouse | Esc |
| Return to the entrance | R or **Reset** |
| Open controls | ? or **Controls** |
| Hide or show the interface | H |
| Touch exploration | Left movement pad and a drag elsewhere to look |

Walk around either end of the scanner base, through the opening marked **02** to inspect the camera and test plate, then across to **03** for the arm and console. The double doors mark the return to the entrance.

## Implementation and verification

The apparatus and architecture are authored in `src/`. A CPU build compiles their geometry into static material batches, bakes local ambient occlusion into vertex colors, and packs the original printed graphics and screen artwork into atlases. Metal uses a directional roughness texture. The browser supplies an interior reflection environment, a fixed directional shadow map and localized task lighting. Movement runs on a flat floor plan with a circular body and solid wall and equipment footprints.

Run `node verify.mjs` to check the release without launching a browser. This verifies JavaScript syntax, local file and UI bindings, decompression, mesh attributes and indices, texture dimensions, atlas coordinates and a sampled inspection route through the collision plan.

The browser build is already compiled. For an optional source rebuild with Node.js and npm, run `npm ci`, then `npm run build`, then `node verify.mjs`. The canvas and BVH packages are build-time dependencies. The Three.js MIT license is in `vendor/LICENSE`.

## Inspection limits

The exhibits and screens are static. The entrance doors are scenic, and the player stays at a fixed standing eye height. Visual inspection, live input and collision testing, and frame-time measurement were reserved for the separate judging session. The inspection-route check tests authored clearances only.

## Run record

The requested assignment was GPT-6.2 Astra, XHIGH effort, Standard service. The runtime identifies the agent as Codex based on GPT-6. It did not expose a serving model identifier, reasoning-effort field or service-tier field for this turn.

Dependency work began at **2026-11-18 01:05:06.780727 UTC**. The one-hour deadline was **2026-11-18 02:05:06.780727 UTC**. The external `RUN.json` receipt records the actual stop, checks, cleanup and SHA-256 of the release archive.

