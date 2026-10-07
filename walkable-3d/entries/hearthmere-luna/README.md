# Hearthmere Library

A self-contained, procedural WebGL browser scene. The room, furnishings, books, and hillside are generated locally in `index.html`; there are no external assets or runtime package dependencies.

## Launch

From this folder, run:

```powershell
python -m http.server 43173 --bind 127.0.0.1
```

Then open the **suggested launch address** `http://127.0.0.1:43173/` in a WebGL-capable browser. This is only a suggested address; no server or preview is running. Stop the local server with Ctrl+C when finished.

## Controls

- Click the room to capture the mouse and enable mouse look.
- W/A/S/D moves; hold Shift to walk slowly.
- Escape releases the mouse.
- R or **Reset view** returns to the starting position and direction.
- **Controls** toggles the on-screen control card.

## What is included

A tall timber-and-plaster reading hall, bookcases with individually varied spines and shelf groupings, a broad stair and upper gallery overlook, a connected window alcove, leather chairs and reading furniture, late-day directional lighting, warm lamp pools, framed details, and a simple layered hillside beyond the tall windows. Geometry is batched into static WebGL buffers; movement uses room bounds, shelf/furniture AABBs, and a smooth stair ramp that follows the visible treads.

## Checks and limits

`node --check` passed on the extracted inline JavaScript (Node.js 24.14.0). No browser, server, visual check, interactive walk, WebGL shader compilation, or performance measurement was run under this entry's execution rules. The renderer uses solid colors and faceted procedural geometry; it has no texture maps, dynamic shadows, detailed book text, or physically based lighting. Movement collision is intentionally simple, and stair elevation is smoothed rather than matching each tread exactly. Frame rate and visual appearance remain for separate exploration and judging.

## Run record

- Model: the execution context exposed the GPT-6 family only; the exact deployed model variant was unavailable.
- Effort setting: unavailable in the execution metadata.
- First implementation action: 2026-10-07 04:00:51 UTC.
- Deadline (60 minutes after first implementation): 2026-10-07 05:00:51 UTC.
- Interruptions: none.
- Actual stop time: recorded in the handoff report.
- Process cleanup: no server, watcher, browser, or test process was left running.
