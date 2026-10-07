# Atelier of the Ninth Tide

A standalone, explorable Three.js royal tailor’s atelier. All geometry, cloth textures, wood grain, paper illustrations and labels were authored procedurally inside this entry. No project assets or comparison entries were read or reused.

The interior has a flush inlaid fitting circle, a five-bay cloth archive with a north-light roof and hanging weight samples, and a workshop around the unfinished **Meridian Mantle**. The mantle has seven pleated silk gores, a quilted copper underskirt, a turned-out lining, basting stitches, a muslin sleeve, exposed rear lacing and an eleven-rib silk-and-pearl fan collar. A cutting bench can be approached from its front and rear.

## Launch in a later inspection session

Dependencies are installed and the production build is in `dist/`.

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-07\task-41\ninth-tide-atelier'
npm.cmd run preview
```

**Suggested launch address:** http://127.0.0.1:4187/

This is **not a running preview**. No server or browser was launched during implementation. The command binds only to localhost and uses strict port selection: it will fail instead of silently selecting a different port if 4187 is occupied. Stop the later preview with `Ctrl+C`.

For a fresh copy without installed dependencies:

```powershell
npm.cmd ci --no-audit --no-fund --cache .npm-cache
npm.cmd run build
npm.cmd run preview
```

The `dist` folder is also suitable for any ordinary static HTTP server. Opening `index.html` directly with `file://` is not supported.

## Controls

| Input | Action |
| --- | --- |
| Enter the atelier / click the scene | Capture mouse and explore |
| Mouse | Look around |
| WASD or arrow keys | Walk |
| Shift | Brisk walk |
| Escape | Release cursor and stop movement |
| Left mouse + drag | Alternative look if pointer lock is unavailable |
| R / Reset button | Return to entrance |
| H / Controls button | Open or close controls |
| F / Timing button | Show live frame interval statistics |
| I | Hide or show room and object labels |
| Quality button | Cycle economy, balanced and fine |

Eye height is 1.67 m. Movement has smooth acceleration, a 23 cm collision radius, axis sliding and bounded steps. The player stays on the continuous walking surface. The fitting circle is intentionally almost flush. The route goes left around it, through the archive, across the side arch and around the mantle, past the workbench, then back through the wide salon arch. A fine brass line in the floor marks this loop.

The timing panel reports frame intervals from the actual future browser session, including mean, p95 and intervals over 33.4 ms. It does not measure GPU duration. It is provided for inspection; no values were measured during this build.

## Checks actually performed

- JavaScript syntax checks of all five source modules.
- Non-serving Vite production build.
- CPU-only construction audit, using an inert canvas API stub rather than a browser or image renderer.
- Finite vertex, normal and instance-transform checks; successful static geometry merging.
- Collision reachability of 15 inspection points on a conservative 10 cm grid using the build’s player radius and collision volumes.
- Read-only check for a listener on suggested port 4187; no listener was reported at the time of the check.

`static-audit.json` contains the route checks and geometry counts. `run-record.json` records the implementation clock, execution conditions, dependency-install recovery and process cleanup. The installed versions are pinned by `package-lock.json`.

To repeat the bounded static checks without a server:

```powershell
npm.cmd run check
node tools/static-audit.mjs
npm.cmd run build
```

## Limits and deferred verification

- **No browser, headless browser, screenshot renderer, GPU test or performance benchmark was used.** Appearance, browser initialization, pointer lock, interactive collisions and actual frame timing require the separate inspection session.
- Requires a recent desktop browser with WebGL 2 and keyboard/mouse. Touch navigation is not implemented.
- The fitting mirror is a static stylized smoked-glass image, not a real-time reflection. Window and roof light panels are static; there is no exterior exploration.
- Cloth is modeled as static geometry. Staff, cloth simulation and dressing interaction are outside this scene.
- Shadows are cached once because the scene is static. Economy disables shadows and caps pixel ratio at 1; balanced caps it at 1.5; fine caps it at 2 with a larger shadow map.
- No frame-rate claim is made. Material sheen, dynamic lights and the dense garment should be assessed on the inspection machine.
- The exact deployment model identifier and reasoning-effort value were not exposed in the available runtime metadata. The agent’s developer identity says GPT-6; the unavailable exact fields are disclosed in the run record rather than guessed.

The entry started at **2026-10-07 09:08:19.5445893 UTC**. Its fixed one-hour deadline is **2026-10-07 10:08:19.5445893 UTC**. The actual stop timestamp and process cleanup are in `run-record.json`.
