# Meridian House

An explorable desert observatory for SceneBench 2026-11-17, scene 03. The vaulted south passage rises into a circular observing chamber. A bronze transit telescope stands under a split copper dome. The north portal opens onto a stone terrace with a sundial and a continuous guard wall.

## Launch

Extract the archive if needed. In the directory containing `index.html`, run the following command in PowerShell.

```powershell
python -m http.server 48753 --bind 127.0.0.1
```

Suggested launch address: `http://127.0.0.1:48753/`. All geometry, textures, scripts and the Three.js 0.180.0 runtime are local. Serving the included files requires no npm install or build step. Use a current WebGL 2 browser.

## Controls

| Input | Action |
| --- | --- |
| Click **Explore observatory**, click the scene, or press **E** | Enter mouse-look |
| **W A S D** | Walk |
| Mouse | Look around |
| Arrow keys | Turn or look up and down |
| Hold **Shift** | Walk faster |
| **Esc** | Release the mouse |
| **R** or **Reset** | Return to the south passage |
| **?** or **Controls** | Show the controls |
| **H** | Hide or restore the interface |

If pointer capture is unavailable, drag the scene to look. Touch input offers a left walking pad and drag-to-look. To follow the inspection route, climb the passage steps, circle the telescope, take the opposite arch to the terrace, then turn back at the parapet.

## Build and checks

The shipped scene contains 73 mesh batches and 186,939 indexed triangles. Direct sunlight uses a fixed 2048-pixel shadow map. The terrain carries baked distance shading. The telescope's metalwork has a fixed reflection field derived from the chamber openings.

The source geometry compiler and validation commands require Node.js.

```powershell
node build.mjs
node check.mjs
```

The optional `make-materials.mjs` generator also requires ImageMagick. The finished texture maps are included. The Three.js license is in `vendor/LICENSE`.

`CHECKS.txt` records the completed CPU-only checks. The telescope and shutter are fixed inspection objects. Browser interaction, visual appearance and frame times await independent inspection. No browser, renderer, server or performance benchmark was started during this entry.

## Provenance

Requested run: GPT-6.2 Astra, XHIGH effort, Standard service. The session exposed the generic GPT-6–based Codex identity. The exact serving model, effort and service tier were unavailable.

First implementation: 2026-11-17 23:07:02.4459684 UTC. Deadline: 2026-11-18 00:07:02.4459684 UTC. The separate `run.json` beside the original archive records the actual stop time, cleanup, interruptions and archive digest. The archive includes SHA-256 checksums of its build files.
