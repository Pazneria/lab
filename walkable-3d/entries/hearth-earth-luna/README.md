# Hearth & Earth

A compact, keyboard-and-mouse 3D pottery studio built with Three.js. The workroom, covered glaze shed, and sunlit kiln court connect along one walkable route. Pottery and props are generated from geometry at runtime; no external art assets are required.

## Run

From this folder, install the listed packages and start Vite:

```powershell
npm install
npm run dev -- --port 4179
```

Then open the **suggested** address `http://127.0.0.1:4179/`. No preview server was started for this entry.

## Controls

- Click **Step inside** to capture the mouse. Move the mouse to look.
- **W A S D** or the arrow keys move at walking speed.
- **R** resets to the entrance; **Esc** releases the mouse. Click in the scene to recapture it.

## Run record

- Model: GPT-6 (the exact deployed model identifier and effort setting were not exposed in this execution).
- First implementation action: **2026-10-07 04:48:55 UTC**.
- Hard deadline: **2026-10-07 05:48:55 UTC**.
- Actual stop timestamp: reported in the handoff. Work interruptions: none.

## Scope and limitations

- This is a standalone scene, without crafting or firing mechanics.
- Visual, browser-interaction, and performance review were intentionally left for a separate session under the execution conditions.
- Walking stays at a fixed height over level floors. Collision uses conservative rectangles around major walls, benches, shelves, and the kiln; small loose tools do not collide.
- Typography uses local system fallbacks. The scene does not request external images or fonts.
