# Greyglass — Mountain Cable Station

An explorable, first-person browser scene of a compact mountain cable-car terminal, loading platform, stationary gondola and covered ridge lookout.

## Launch

Requires a modern browser with WebGL 2 and an internet connection for the Three.js module and display fonts. From this folder, run:

```powershell
python -m http.server 5179 --bind 127.0.0.1
```

Then open **http://127.0.0.1:5179/**. This is a suggested launch address; no server was started during this build.

## Controls

- Click **Enter Station** to capture the mouse; move the mouse to look.
- **W A S D** to walk; **Shift** to move faster.
- **R** resets to the arrival hall facing the sheave.
- **Esc** releases the mouse; click the view to capture it again.

Movement stays at human eye height, clamps to the floors and guarded deck, and collides with the machine footprint, cabin and boarding gate. The opening view starts near the arrival threshold, facing the large sheave. Approach its front, then move around to the marked visitor lane on its right as you face it; continue beside the cabin to the lookout, then return through the hall.

## Implementation and limitations

Geometry is generated in Three.js from lightweight primitives. Small surface-grain textures are generated locally in canvas; the scene uses fog, static lights, low-poly ridge silhouettes, wet-surface puddle marks and rain streaks on glazing. No real-time rain, cable movement, shadow maps, reflections, audio or dynamic weather are simulated. Three.js 0.180.0 is loaded from jsDelivr; typography uses system fonts.

Visual inspection, interactive exploration, browser checks, and performance measurement were not performed in this run, per execution conditions. A Node ES-module syntax check and lightweight source assertions passed.

## Run record

- First implementation action: 2026-10-07 04:48:15 UTC
- One-hour deadline: 2026-10-07 05:48:15 UTC
- Model: GPT-6-based Codex, per task system. The exact deployment variant and effort setting were not exposed in the executor metadata.
- Interruptions: none.
- Actual stop timestamp: reported in the completion message.
