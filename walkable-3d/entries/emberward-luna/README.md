# Emberward — Dragon Caretaker's Quarters

A compact, first-person Three.js environment connecting a human caretaker's bedroom, a gear-lined service passage, and one high, warm roost. The roost's central floor path stays level; a separate broad stepped ramp with handrails leads to the resting platform.

## Launch

From this directory, run:

```powershell
python -m http.server 5187 --bind 127.0.0.1
```

Then open the **suggested launch address** `http://127.0.0.1:5187/` in a modern WebGL browser. The server command is intentionally documented only; it was not started for this task. Three.js is imported from jsDelivr, so the browser needs network access to that CDN.

## Controls

- Click the scene to capture the mouse; move the mouse to look around.
- **W/A/S/D** or arrow keys to walk; **Shift** to move faster.
- **Esc** releases mouse-look.
- **R** or **Reset to Entrance** returns to the bedroom entrance.

## Notes

The scene uses procedural Canvas textures, repeated instanced geometry, steady point lights, and a single low-resolution directional shadow map. There is no creature, fire simulation, external image asset, or audio. The platform ramp adjusts the camera height along its center. Collision is bounded to the room footprints and includes a few large furnishings; small loose props are decorative. Visual, interactive, and performance verification were not performed because this run forbade browser/server use.
