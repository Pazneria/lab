# Maison des Marées

A first-person royal tailor’s atelier. Follow the fitting dais through the textile archive to the Sounding Mantle, a ceremonial coat for the royal tide reader. Its finished shell fan, provisional muslin ribs, trial gore, exposed satin facing and laced back can be approached from several sides. The cutting bench carries matching drafts and yardage.

## Launch

The complete browser build is in `atelier`. It includes Three.js 0.180.0 and its MIT license. All scene geometry, textiles and illustrations were authored for this entry. The page needs a WebGL 2 browser and a local HTTP origin. It loads its assets locally.

From this entry’s directory, run the following command in PowerShell.

```powershell
python -m http.server 8422 --bind 127.0.0.1 --directory .\atelier
```

Suggested launch address: **http://127.0.0.1:8422/**. Start the server yourself before opening the address. Port availability was not confirmed. Press Ctrl+C in that terminal to stop the server.

## Controls

| Action | Input |
| --- | --- |
| Look around | Click the scene and move the mouse. Drag to look if capture is unavailable. |
| Walk or strafe | W, A, S, D |
| Walk briskly | Hold Shift while moving |
| Inspect fine details | Hold F for a narrower field of view |
| Lower your viewpoint | Hold C |
| Keyboard look | Left / right arrows turn, Page Up / Down tilt |
| Keyboard walk | Up / down arrows move forward / backward |
| Return to the entrance | R or the Reset button |
| Show controls or release the mouse | H shows controls. Esc releases the mouse. |
| Touch movement | Drag on the left to move and on the right to look. |

## Verification and limitations

Run `node .\verify.mjs` from the entry directory to repeat the CPU-only structural checks. They check finite attributes, index bounds, local dependencies, garment sightlines, doorway visibility and route connectivity through the movement solver. The route includes the fitting platform, archive cases and samples, four sides of the mantle, both sides of the cutting bench and the return to the entrance.

The looking glass uses painted, fixed reflected light. Collision covers the room shell, partitions, major furniture and garment clearance. Small tools and trim share their supporting furniture’s footprint. The scene uses a static daylight shadow map, pre-grouped geometry and room visibility checks.

The execution conditions reserved browser, visual, interaction and frame-time testing for a later judging session. There are no measured frame rates for this entry.

The build’s SHA-256 checksums are in `SHA256SUMS.txt`. Timing, requested identity and exposed serving metadata are recorded separately in `run-record.json`.

