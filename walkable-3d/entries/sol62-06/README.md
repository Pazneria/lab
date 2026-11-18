# Limewater Cavern

Limewater is a first-person limestone cavern with a shallow pool, a dry route around its eastern bank, and a survey landing beyond a natural arch. The scene assets are generated from original procedural geometry and shipped with the project.

## Run locally

Use Node.js 18 or later. From this directory, run:

~~~powershell
node .\serve.cjs
~~~

Open **http://127.0.0.1:47063/** in a desktop browser with WebGL 2. That is the suggested launch address. The launcher binds to loopback and leaves the browser closed. Press **Ctrl+C** in the launcher terminal to stop it. The shipped build requires no installation or network downloads.

## Explore

Click **Enter cavern**. Follow the open floor toward the pool and walk along the rope on the right-hand bank. The floor rises gently under the arch. Turn around at the survey tripod for a view back into the pool chamber.

| Input | Action |
| --- | --- |
| Mouse | Look around. Drag to look if the browser blocks mouse capture. |
| WASD or arrow keys | Walk |
| Shift | Walk faster |
| Esc | Release the mouse or pause drag mode |
| R or the Reset button | Return to the entrance and reset the view |

The pool edge is a walking boundary. The dry path, arch, and landing are connected by graded limestone. The interface is designed for a keyboard and mouse.

## Build and verification

The shipped **scene.bin** is the generated scene asset. The source is in **build.mjs** and **terrain.mjs**. To regenerate the mesh, baked lighting, and volume texture, run **node build.mjs** from this directory. This command writes the binary asset and exits.

The pool uses a low-resolution planar reflection and approximate animated caustics. Rock relief combines modeled strata and shader detail. Collision follows the terrain surface and uses simplified envelopes for the largest formations.

The entry was prepared and checked without launching a browser or server. Visual verification, browser interaction, WebGL shader compilation and performance measurements remain for the separate judging session.
