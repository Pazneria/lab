# Holloway Halt — Last Light

A self-contained, first-person WebGL 2 scene of an abandoned rural station in autumn woods. No build step or third-party library is required.

## Launch

In PowerShell, run:

```powershell
Set-Location "C:\Users\jmore\Documents\Codex\2026-10-06\task-32"
python -m http.server 48731 --bind 127.0.0.1
```

Then open `http://127.0.0.1:48731/` in a browser with WebGL 2. This is a suggested local address; the server is not running by default.

## Controls

- Click the scene to capture the mouse; move the mouse to look around.
- `W A S D` move; hold `Shift` to walk briskly.
- `Esc` releases the mouse; click the scene to recapture it.
- `R` or **Reset walk** returns to the entrance.

Follow the path from the entrance through the waiting room, use the platform-side doorway, continue to the timber crossing at the end of the tracks, then take the loop through the trees.

## Notes

The station, forest, leaves, signs, timetable, and material textures are generated locally by `scene.js`. The geometry is packed into static material batches. The scene uses a fixed low-afternoon light, static foliage, contact-shadow decals, and flat walkable terrain. It has no audio, touch controls, animated foliage, or dynamic shadow maps.

Only JavaScript syntax and a CPU-only mocked scene-generation path were checked. No browser, real WebGL context, visual inspection, interactive route test, or performance benchmark was run.
