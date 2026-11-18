# Lantern Arcade

SceneBench 2026-11-17 · Scene 12

Enter a neighborhood arcade at closing time. Night Current stands at the end of the aisle, with Ember Orbit and Comet Post on the left and Moss Relay and Glass Harbor on the right. The aisle wraps around Night Current and leads into the open token counter alcove.

## Launch

Run these commands in PowerShell with Python 3 installed.

```powershell
Set-Location -LiteralPath 'C:\Users\jmore\Documents\Codex\2026-10-26\task\batch-20261117-gpt62\entrants\sol\scene-12'
python -m http.server 8712 --bind 127.0.0.1
```

Open the suggested local address `http://127.0.0.1:8712/` in a desktop browser with WebGL 2. All scene code and the pinned Three.js 0.179.1 modules are included. The cabinet art, screens, materials and signage are generated locally from the source files.

## Controls

- Click **Enter arcade** or the scene to capture the mouse.
- Walk with **WASD** or the **arrow keys**. Hold **Shift** to slow down for close inspection.
- Move the **mouse** to look. In browsers that block pointer lock, **drag** to look or use **Q/E** to turn.
- Press **Esc** to free the cursor. Press **R** or click **Reset view** to return to the entrance.

## Verification and scope

CPU checks covered JavaScript syntax, finite and indexed geometry, cabinet and wall collision, route connectivity, and sightlines to the entrance marquee, five displays, control decks, exposed feature sides and street through the entrance glass. Desktop interaction, browser rendering and frame times are reserved for the separate inspection session.

The display graphics are static attract screens. The entrance glazing looks onto a street backdrop, and the doors are closed.

Three.js is bundled in `vendor/` under its MIT license. Build-file hashes and run timestamps are recorded in `SHA256SUMS.txt` and `RUN-TIMING.json`.
