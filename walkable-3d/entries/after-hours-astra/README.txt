AFTER HOURS — NEIGHBORHOOD ARCADE
================================

An original, standalone 3D browser scene. One main room, a small open token
counter alcove, two banks of upright cabinets, and the MOONWAKE feature cabinet.
All cabinet artwork, attract screens, material textures, and geometry were
authored procedurally for this entry. No borrowed game characters or assets.

LAUNCH THE FINISHED BUILD

The dist directory is already built and includes the pinned Three.js library.
No package installation or internet connection is needed to run it.
From PowerShell:

  Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-07\task\afterhours-arcade'
  node .\server.mjs --port 4387

Then manually open this SUGGESTED LAUNCH ADDRESS:

  http://127.0.0.1:4387

This is not a running preview. No server or browser was started during this run.
Port 4387 had no listener when checked. If it becomes occupied, use a different
port with --port. The server binds only to 127.0.0.1. Ctrl+C stops it.

Requires a current desktop browser with WebGL 2, a keyboard, and a mouse.
Node.js is used only for the local static server and optional build/check tools.
Opening index.html directly as a file is not supported by browser module rules.

CONTROLS

  Click Enter the arcade    Capture the mouse and begin exploring
  W A S D / arrow keys      Walk
  Mouse                    Look around
  Shift                    Walk faster
  R                        Reset position and view to the entrance
  H                        Show or hide controls
  Esc                      Pause and release the mouse
  Continue exploring       Capture the mouse again
  Quality: high / light    Toggle pixel density and shadows

If pointer lock is unavailable, hold the left mouse button and drag to look.
Movement still works in this fallback. Toolbar buttons can be used after Esc.
The camera stays at 1.64 m eye height. Collision uses a 0.23 m radius, sliding
around walls and major furniture. No jumping or falling is possible.

SUGGESTED INSPECTION ROUTE

Entrance -> left cyan bank (TIDAL CIRCUIT, DEEP SIGNAL) -> MOONWAKE front ->
left side -> behind MOONWAKE -> right side -> coral bank (SWITCHYARD,
SUNSET RUNNER) -> token counter -> look back toward the glass storefront.

The bank cabinets face inward. The central aisle is clear, and the path behind
MOONWAKE remains connected. The counter can be approached through the opening
on the right. The storefront doors are closed scene boundaries.

BUILD / CPU CHECKS

  npm run check
  npm run build

Only needed when editing sources. Dependencies are pinned in package-lock.json.
If recreating node_modules, use npm ci --ignore-scripts --no-audit --no-fund.

check runs JavaScript syntax checks and a bounded CPU-only structural validator:
  - real Three.js geometry construction using inert drawing calls
  - finite vertex checks and geometric bounds
  - five cabinets, arranged in the intended two banks plus one feature
  - connected navigation to ten inspection points on a 10 cm grid
  - player-radius collision checks in eight movement directions
  - 45 ray checks across the five screen surfaces for shell occlusion
  - bounded static triangle count and opaque material batches

The inert canvas stub does not draw or render anything. It is not a browser,
headless browser, UI test, screenshot renderer, GPU test, or performance test.
See validation.json and run-record.json for the actual results and timing.

RENDERING DESIGN

Original canvas textures are generated once at startup. There are no per-frame
texture uploads, full-screen bloom passes, physics engine, network requests,
or gameplay simulation. Rigid geometry is merged by material, and the one
1024-square shadow map is updated only on setup or a quality change. Screen
glow is restrained local lighting plus static floor pools. The light quality
mode caps pixel ratio at 1 and disables the shadow map.

KNOWN LIMITATIONS / VERIFICATION BOUNDARY

No browser, server, screenshot renderer, visual check, interactive test, GPU
test, or frame-time benchmark was run, as required by this entry's execution
conditions. Visual correctness, actual movement feel, browser-specific pointer
capture, and rendering performance remain unverified until a separate judging
session. Geometry checks and intended rendering costs are not frame-rate claims.

Cabinet screens are static original attract artwork; the games are not playable.
There is no audio. The street beyond the glass is a stylized procedural backdrop,
not another explorable room. Collision intentionally uses conservative boxes for
furniture. Screen reflections and contact shadows are stylized approximations.
Touch/mobile controls are outside this desktop scene's scope.

MODEL / TIME / PROCESSES

The provided identity is GPT-6 / Codex. The exact runtime model identifier and
reasoning-effort setting were not exposed to this task, so they are not guessed.
See run-record.json for the exact first implementation time, the deadline exactly
60 minutes later, the actual final stop time, and interruption / cleanup notes.
No other model, model-backed asset tool, or subagent was used.

LICENSE

Scene code and original generated artwork are supplied as this benchmark entry.
Three.js 0.180.0 is included under its MIT license in dist/vendor/THREE-LICENSE.txt.
