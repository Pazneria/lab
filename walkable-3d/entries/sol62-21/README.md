# The Ember Ward

A walkable WebGL 2 scene built for SceneBench scene 21. The keeper’s bedroom leads past the service shelves and harness rack into a vaulted roost. The roost has a level route around the straw berth, with a banked hearth on one side and an iron-fed wash trough on the other.

## Launch

From Windows PowerShell, open the file in your default browser.

```powershell
Set-Location -LiteralPath 'C:\Users\jmore\Documents\Codex\2026-10-26\task\batch-20261117-gpt62\entrants\sol\scene-21'
Invoke-Item -LiteralPath .\index.html
```

To serve it locally for a later inspection, run this command from the same folder.

```powershell
python -m http.server 48221 --bind 127.0.0.1
```

Suggested launch address is `http://127.0.0.1:48221/`. No preview server is running. The scene uses local files and procedural geometry and textures, with no package install or network assets.

## Controls

- Select **Enter the quarters** to begin.
- **W A S D** or **arrow keys** walk. Hold **Shift** to walk faster.
- **Mouse** looks around. Hold and drag if mouse capture is unavailable.
- **R** resets position and view to the entrance. **Esc** pauses and shows controls.
- Aim at nearby equipment to identify it. The berth is inspected from floor level.

Use a desktop browser with WebGL 2 enabled and a keyboard. The scene is static. The coals glow, the roost has no live dragon, and the walking route stays on the floor.

Browser, graphics, interactive, and frame-time verification are reserved for the separate inspection. The checks for this run were CPU-only.

