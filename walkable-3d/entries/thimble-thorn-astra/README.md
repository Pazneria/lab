# The Thimble & Thorn

A standalone, explorable 3D traveling merchant's wagon. Mara Fen mends worn things and carries a small stock of remedies, thread and patches. Her berth, breakfast leaf, nested stools, galley, personal shelf and travel gear share a compact interior with a working mending bench. A lowered counter and supported canvas awning open the workshop toward a small camp.

## Launch

Dependencies are already installed in this entry's isolated workspace. Node.js 24 was used for the build.

```powershell
cd 'C:\Users\jmore\Documents\Codex\2026-10-07\task-36\merchant-wagon'
npm.cmd run preview
```

Suggested launch address: **http://127.0.0.1:5187/**. This is **not a running preview**. No server or browser was started during implementation. Port 5187 is configured with strict-port behavior, so it will fail clearly rather than silently choose another port if occupied. A read-only listener check found no listener on this port during implementation; availability can change.

The ready-to-serve production artifact is `dist/`. The preview command serves that build and does not automatically open a browser. To rebuild after changes, use `npm.cmd run build`. For source development, use `npm.cmd run dev`.

If moving the source folder to another machine, install its pinned dependencies first with `npm.cmd ci`. The generated scene has no runtime network assets, remote fonts, external services or account requirements. Serve `dist/` over local HTTP; opening its HTML directly through `file://` is not supported.

## Controls

| Control | Action |
| --- | --- |
| Click **Step into camp** | Begin and request mouse lock |
| Mouse | Look around |
| W A S D / arrow keys | Walk |
| Shift | Brisk walk |
| Esc | Release the mouse and pause |
| H | Controls / resume |
| R | Reset position and view to camp |
| Drag the scene | Look when mouse lock is unavailable |
| F2 | Optional live frame-interval diagnostics |

The pause card also offers reset and three shadow-detail settings. Balanced is the default. The renderer caps pixel ratio at 1.65 in Balanced, 1 in Low and 2 in High. Movement is independent of frame rate, diagonal movement is normalized, long frames are clamped, and collision movement is divided into short swept steps.

## Inspection route

Start in camp facing the wagon. Walk to the rear steps, centered beneath the open doorway. No jump or crouch is needed. Enter the home, inspect the fitted berth and drawers, breakfast table, nested stools, shelf and satchel, then follow the runner through the open curtain arch to the workbench and labeled cubbies. Return down the same stairs, walk around the right side, and approach the counter beneath the striped awning. From there, look into the workshop.

The wagon's main floor is 0.84 m above the clearing datum. Four exterior treads lead to the fifth rise at the landing. Upper rises are 0.168 m with 0.31 m treads; the first rise is slightly shorter because of the ground surface. Camera eye height is 1.63 m. The visitor-facing counter is 1.235 m high. The central passage and doorway have standing clearance. Major furniture, walls, wheels, supports, travel cases and camp furnishings have collision. Landing edges and other large drops block movement.

## Verification actually performed

- JavaScript syntax checks for the application, world builder and navigation module.
- CPU-only collision simulation of camp → stairs → home → workbench → return to camp → shop, plus wall, furniture, side-entry and landing-edge assertions.
- CPU-only construction of the Three.js scene with a no-drawing canvas stub. All geometry attributes are finite.
- CPU ray casts against the authored geometry verified floor support and 1.82 m standing clearance at 12 route locations.
- Successful Vite production build, using the native config loader to avoid a sandbox-specific config-bundling restriction.
- Read-only check of the suggested localhost port, and CLI help inspection without starting the preview server.

Final geometry construction count: **41 static material batches, 177,428 batched triangles, 61 meshes including labels and contact-darkening planes**. These are CPU structural counts, not measured frame rates or GPU performance claims. Shadow maps update on initial rendering and on quality changes; the scene geometry is static.

To repeat the permitted checks:

```powershell
npm.cmd run check
npm.cmd run build
```

## Not performed / limitations

- No browser launch, browser automation, screenshots, visual inspection, interactive playtest, GPU test or performance benchmark was performed, as required by this run's conditions. Visual correctness and actual interactive smoothness remain unverified.
- The F2 panel reports recent live animation-frame intervals only when a later user runs the scene. It is not a GPU timer or a substitute for independent performance judging.
- Desktop keyboard and mouse are required. Mobile touch movement, gamepads, jumping, crouching, audio, vehicle driving, trading, and animated furniture mechanisms are not implemented.
- Collision is intentionally simplified. Fine wares, cloth and ropes do not individually obstruct the player. The compact clearing has a movement boundary.
- WebGL 2 and a recent browser with hardware acceleration are required.

## Execution record

See `execution-record.json` for the authoritative implementation start, exact one-hour deadline, actual stop, checks and cleanup record. Implementation began **2026-10-07T09:06:43.3932637+00:00**; the deadline was **2026-10-07T10:06:43.3932637+00:00**.

The session identifies the assistant as **Codex, based on GPT-6**. It does not expose an exact backend model variant or reasoning-effort value; both are recorded as unavailable rather than guessed. No subagents, other models or model-backed asset tools were used.

There were no external interruptions or deadline extensions. An initial registry install was denied by the sandbox and retried successfully with authorized registry access; its elapsed time is included. An initial CSS import error and a sandbox-specific config-loader error were fixed before the final successful build. All art and scene code were created in this workspace; no other entrant's files or project assets were read or reused.

## Files

- `dist/` — production browser build.
- `src/world.js` — original procedural geometry, materials, light fixtures and authored details.
- `src/navigation.js` — human-scale walking surfaces and collision.
- `src/main.js` — renderer, lighting, mouse look, movement, reset, quality settings and optional live diagnostics.
- `scripts/` — bounded CPU-only validation.
- `package-lock.json` — pinned dependency resolution.

Dependencies: Three.js 0.180.0 and Vite 7.1.7. Their licenses remain in their installed package directories.
