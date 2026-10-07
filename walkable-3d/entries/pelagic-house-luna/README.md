# Pelagic House — Habitat 04

A self-contained first-person WebGL scene of a compact undersea residence. The domestic cabin opens through two pressure-hull portals into a marine research nook and a small observation room. The window, furnishings, research props, and bounded reef are procedurally built in the page; the scene does not fetch models, textures, fonts, or scripts from a network.

## Launch

Open `index.html` in a current desktop browser with WebGL enabled. In PowerShell from this folder, the launch command is:

```powershell
Start-Process .\index.html
```

Suggested local file address: `file:///C:/Users/jmore/Documents/Codex/2026-10-07/task-31/index.html`. No preview server is running.

## Controls

- Click **Enter Habitat** to begin and capture the mouse.
- **W A S D** walk; **mouse** looks around.
- **Shift** moves more slowly.
- **R** returns to the entrance and resets the view.
- **F** toggles fullscreen; **Esc** releases the mouse. Click the scene to recapture it.

Use the center aisle to pass the sofa and bed, approach the bench from its open side, then walk up to the glazing through the center of the observation room. The status label identifies the current room bay.

## Implementation and verification

- One HTML file, inline CSS and JavaScript, raw WebGL 1.0, no build step or external runtime dependencies.
- Static geometry is batched by material. Movement is bounded by the hull and the major furniture; the center of the observation aperture is walk-up accessible while its side supports remain blocked.
- CPU-only verification completed: extracted inline JavaScript passed Node.js `v24.14.0` syntax parsing.
- Not performed by design: browser launch, visual inspection, pointer-lock or movement testing, screenshot capture, GPU checks, frame-time measurement, or performance claims.

See `BUILD_LOG.md` for the execution window and timestamp notes.
