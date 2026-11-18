# The Bramble & Kettle

An original first-person cottage for SceneBench 2026-11-17, scene 16. The cottage joins a kitchen, an apothecary workroom, and an attached glasshouse. All scene art is made from local geometry and procedural materials. The included Three.js module is pinned to r170, with its license under `vendor/`.

## Launch

From this directory, run:

```powershell
node .\serve.mjs 43116
```

Then open the suggested launch address in a WebGL 2 desktop browser:

```text
http://127.0.0.1:43116/
```

No dependency installation is needed. Stop the local server with Ctrl+C when finished. The launcher binds only to the local machine.

## Controls

| Input | Action |
| --- | --- |
| Click **Enter cottage** | Enable first-person controls |
| Mouse | Look around |
| WASD or arrow keys | Walk |
| Hold Shift | Walk faster |
| R | Reset to the entrance and original view |
| H | Show or hide controls |
| Esc | Pause and release the cursor |

If pointer lock is unavailable, drag on the scene to look. Q/E and Page Up/Page Down also turn and tilt the view.

Follow the kitchen counter to the timber arch. The workbench is to the left, the tall shelves are ahead, and the glazed doorway on the right opens into the greenhouse. Return through the same two openings.

## Checks and limitations

`npm run check` runs offline syntax, asset-assembly, and collision checks in Node. The texture check exercises the source path with a minimal canvas interface. Browser visuals, interactive controls, and GPU performance need a separate verification session.

Exploration stays on one level inside the cottage and greenhouse. The entrance door, containers, and magical objects are scenery. WebGL 2 and desktop mouse and keyboard input are required for the intended experience.
