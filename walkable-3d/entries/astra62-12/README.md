# The Night Pier

A neighborhood arcade after the last ferry. Bell Diver sits under a brass gallery light at the end of the central aisle. Its rear service hatch, copper lines and side ports can be inspected on foot. Ember Pass and Dust Relay occupy the walnut bank. Across the aisle, Lunar Post has a trackball and Kite Signal has a rotary control. The open token window faces the aisle near the glazed entrance.

## Launch

Extract the archive into a folder. On Windows, run **launch.cmd** in that folder with Python 3 installed. Alternatively, run the following command from the folder containing index.html.

    python -m http.server 49172 --bind 127.0.0.1

Suggested launch address after starting the server is **http://127.0.0.1:49172/**. Open it in a current desktop browser and select **Enter arcade**. The launcher serves local files and leaves the choice of browser to the visitor. Stop the server with Ctrl+C in its terminal.

## Controls

| Action | Input |
| --- | --- |
| Walk and strafe | W, A, S, D |
| Look around | Mouse |
| Walk forward or back | Up or Down arrow |
| Turn or look up and down using the keyboard | Left or Right arrow, Page Up or Page Down |
| Walk faster | Hold Shift |
| Return to the entrance | R or Reset |
| Show the controls | H or Controls |
| Release the mouse | Esc |

Drag the view to look around when browser pointer capture is unavailable. The fixed eye height is 1.57 m, with a 0.205 m collision radius. The cabinet screens are static attract illustrations.

## Build

All cabinet artwork, signage, scenery, props and material prints were authored for this entry. The browser loads four local WebP atlases and one compressed static mesh. Surface lighting and contact shadows are baked into the geometry. Curved glass, control caps and metal pick up view-dependent reflections. The scene uses per-object-group frustum culling, mipmapped textures and a 2.30-megapixel render cap.

Three.js 0.170.0 and its MIT license are included in the vendor folder. Launch requires a browser with WebGL 2, WebP and gzip DecompressionStream support. The delivered build runs from local files served over HTTP without a package install.

The original construction sources are included. With Node installed, run **node check.mjs** for CPU-only integrity and floor-plan checks. To regenerate assets in a separate working copy, install **@napi-rs/canvas@0.1.80** and run **node bake.mjs**. The original texture bake used Windows system fonts.

## Validation

The CPU build produced 122,544 triangles across 23 opaque geometry batches. Checks covered the packed data, atlas headers, indices, normals, local imports and control IDs. Static GLSL parsing covered the opaque surfaces, storefront glass and lamp halos.

A 0.10 m floor-plan search connected all five control decks, both sides and the rear of Bell Diver, the token counter, the return view and the entrance. The checked route measured 30.2 m. Collision checks included all five cabinet fronts, the end walls and 1,712 directional movement cases.

Browser play-through, visual verification, GPU checks and frame-time measurements are reserved for the separate inspection session.