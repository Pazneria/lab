# Thistlewick Cottage

A compact, first-person browser scene with a kitchen, a crowded magical workroom, and a framed glasshouse. The room sequence is walkable; the blue seed and sleeping cat are small fixed details.

## Launch

From this directory, run:

    python -m http.server 47831 --bind 127.0.0.1

Suggested launch address: http://127.0.0.1:47831/ . Run the command from this directory; no server is running now. The page loads Three.js 0.180.0 from jsDelivr, so the browser needs network access for that module.

## Controls

- Click the scene to capture the mouse; move the mouse to look.
- W, A, S, D or arrow keys to walk; hold Shift to walk faster.
- Esc releases the mouse.
- Press R or the on-screen button to reset to the entrance.

## Verification and limits

The inline module passed node --check. The scene was not opened in a browser, visually inspected, interaction-tested, benchmarked, or served during this run, per the execution conditions. It has no real-time shadow maps, spell animation, or offline copy of Three.js; the build uses a few point lights, instanced flagstones and foliage, and fixed collision bounds.

## Run timing

- Model: GPT-6 (the execution interface did not expose a more specific model identifier or effort setting).
- First implementation action: 2026-10-07 09:02:51 UTC.
- One-hour deadline: 2026-10-07 10:02:51 UTC.
- Interruption history: no external interruption. The first shell write was rejected by Windows' command-length limit, so implementation continued with workspace patches.
