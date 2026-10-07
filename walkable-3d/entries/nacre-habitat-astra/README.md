# Nacre — Habitat 04

A standalone, explorable underwater apartment: a warm living/sleeping room, a marine research nook, and a raised-ceiling observation bay overlooking a small dark reef. All scene geometry, textures and artwork were authored procedurally for this entry. There are no external asset requests at runtime.

## Launch

The finished production build is in `dist/`. Dependencies are installed in this workspace. `nacre-habitat-04.zip` contains the build, source and documentation without dependency/cache folders. The build was produced with Node 24.14.0 and npm 11.9.0.

From PowerShell:

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-07\task-33'
npm.cmd run preview
```

Then open **http://127.0.0.1:5179/** yourself. This is a **suggested launch address, not a running preview**. The launcher uses `--strictPort`, so it will stop if that port is occupied rather than silently choosing another port. Port 5179 had no reported listener when checked during construction; availability has not been verified by starting a server.

For a clean copy of the source:

```powershell
npm.cmd ci --no-audit --no-fund
npm.cmd run build
npm.cmd run preview
```

For later development, `npm.cmd run dev` uses the same host and port. The production build must be served over HTTP; double-clicking `index.html` through `file://` will not load its JavaScript modules reliably.

## Controls

| Input | Action |
|---|---|
| Enter the habitat | Capture the cursor and begin exploring |
| Mouse | Look around |
| W A S D / arrow keys | Walk |
| Shift | Move faster |
| Esc | Release the cursor and show controls |
| R / Reset button | Return to the entrance |
| Q / Quality button | Toggle High / Eco rendering |
| Left-button drag | Mouse-look fallback if cursor capture is unavailable |

High caps the device pixel ratio at 1.6 and enables one cached soft shadow map. Eco caps it at 1 and disables that shadow map. The eye height is 1.65 m; movement remains on the dry floor. There is no jumping or swimming. Major furniture, bulkheads, the hull, braces and window sill have collision.

The route is entrance → berth/sofa → forward bulkhead → workbench on the left → next bulkhead → observation frame and reef → return through the two open bulkheads. The entrance hatch is sealed.

## Verification actually performed

- JavaScript syntax checks with Node.
- CPU-only scene construction using a non-rendering canvas stub: finite geometry, valid collision boxes and successful static geometry batching.
- Numerical collision checks along 21 inspection-route waypoints, plus blocked bulkhead, window and entrance checks.
- A Vite production build.

The exact final results are in `checks/results.json`. These checks did **not** open a browser, create a renderer or WebGL context, draw a screenshot, test pointer lock, exercise real keyboard/mouse input, or measure frame times. **Visual correctness, interactive operation and performance remain unverified in a browser**, as required by the execution conditions.

## Implementation and limits

Three.js 0.180.0, Vite 7.1.9. Static opaque meshes are batched by material, the only dynamic objects are six gently moving fish, and the reef is a bounded diorama. There is no fluid simulation, creature AI, dynamic reflection camera, post-processing chain, network backend or telemetry. Textures and a small reflection-lighting environment are generated at load time. Glazing uses a low-opacity surface and visible pane-edge geometry; its reflection cues are approximate. The research instruments are decorative.

The npm scripts use Vite's native configuration loader to avoid a config-bundling access issue in the restricted Windows workspace.

A current desktop browser with WebGL 2, mouse and keyboard is required. Touch-only navigation is not implemented. GPU compatibility, appearance, pointer-lock behavior, actual responsiveness and frame times require the later separate inspection session. If the graphics context is lost, reload the page.

## Execution record

See `execution-record.json` for the first implementation time, exact one-hour deadline, final stop time, model metadata availability and process cleanup. No other entrants' source or assets were used, and no subagents or model-backed tools were used. No development/preview server, browser, watcher, screenshot process or performance benchmark was launched during construction.
