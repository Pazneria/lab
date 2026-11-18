# The Hushwing Post

Mara Venn surveys night routes between the lantern stations of Alder Fell. Her private rooms connect the work of a night courier with the things she comes home to. A button-eyed childhood moth rests by her pillow. At the window bench, one wing of an embroidery is finished and the other is still in chalk. The worn rain cape in her wardrobe has a contrasting repair. A red thread follows her next route across the study desk.

## Launch

Open a terminal in the directory containing `index.html` and `rooms.bin.gz`. Run the following command with Python 3.

```powershell
python -m http.server 47115 --bind 127.0.0.1
```

The suggested local address is **http://127.0.0.1:47115/**. Click **Enter rooms**. The build uses local files throughout and requires a modern browser with WebGL 2, Canvas 2D and gzip DecompressionStream support.

## Controls

| Input | Action |
| --- | --- |
| Mouse | Look around after entering |
| W, A, S, D | Walk and sidestep |
| Shift | Walk faster |
| Arrow keys | Turn and look up or down |
| R | Return to the entrance and restore the opening view |
| Escape | Release the mouse and reveal the controls |

If mouse capture is unavailable, drag the scene to look. On touch devices, use the left pad to walk, drag to look, and tap the reset arrow to return.

Walk along the right side of the bed for the lamp, photograph and pocket watch. The arch beside the bed leads into the wardrobe. Pass the patched rain cape and continue through the adjoining arch to the survey desk. The study's other arch returns to the bedroom.

## Construction and checks

The complete baked scene is included. The source modules build the furniture, curved textiles, joinery, accessories and architecture in metres. The asset contains indexed geometry, surface-contact lighting, visibility from the windows and three lamps, and eleven procedural material swatches. Eighteen original illustrated sheets supply the map, textiles, portraits and field-work details. The renderer batches opaque geometry by room and spatial bounds, builds a static sunlight shadow map, and caps the drawing-buffer pixel count.

For a CPU-only structural check with Node.js, run `node verify.mjs`. To regenerate the compiled asset from its sources, run `node bake.mjs`. The delivered asset was built with Node.js 24.14.0.

The delivered geometry contains 286,341 vertices and 395,164 triangles in 50 spatial batches. Static verification checked every mesh index and batch bound, the 18 artwork command streams, and contacts with the bed, wardrobe, desk and walls. The 19.16 m inspection loop passed 773 clearance samples for the 0.218 m player radius.

All twelve JavaScript modules passed syntax checks. All six shader sources passed an in-memory GLSL grammar check with ShaderFrog's parser 7.0.1. Visual inspection, browser integration, interactive movement and frame-time measurements are reserved for the separate judging session. The furniture and props are stationary, and the player walks at a fixed eye height.

## Entry record

| Field | Value |
| --- | --- |
| Entry | SceneBench 2026-11-17, scene 15 |
| Requested run | GPT-6.2 Astra, XHIGH effort, Standard service |
| Exposed serving information | Codex, based on GPT-6. Exact model variant, effort and service tier were not exposed. |
| First implementation action | 2026-11-18 01:04:34.4903315 UTC, workspace and dependency inventory |
| One-hour deadline | 2026-11-18 02:04:34.4903315 UTC |
| Interruptions | No pause or timer reset. The sandbox denied an optional build subdirectory, so all source and build files use the verified entry directory. |

The final handoff records the stop time and archive checksum. No browser, server, watcher or GPU test was launched during production.
