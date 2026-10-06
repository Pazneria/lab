# The Fern House

A self-contained, walkable tropical greenhouse. The central brick planting bed separates two aisles, joined at the entrance and the potting alcove. Banana leaves, perforated monstera leaves, feather palms, ferns, rosettes, climbing vines and a young fan palm share an aged iron-and-glass structure.

## Launch

The running preview is **http://127.0.0.1:4387**.

To start it again, open a terminal in this directory and run:

```text
node server.mjs
```

On Windows, `Launch.cmd` also starts the server. It prints the address without opening or foregrounding a browser. Node.js 18 or newer is required. Open the address yourself in a desktop browser with WebGL2 enabled. Keep the server running while exploring; stop it with Ctrl+C in its terminal. If the existing preview is already running, there is no need to start a second server.

All runtime libraries are included under `vendor/`; no download, account, API key, or network connection is needed to run the scene. Serve the files over localhost rather than opening `index.html` as a `file:` URL. An alternate port can be supplied through the `PORT` environment variable.

## Controls

| Input | Action |
| --- | --- |
| Click **Explore the glasshouse**, or click the scene | Capture the mouse |
| Mouse | Look around |
| W A S D / arrow keys | Walk |
| Hold Shift | Brisk walk |
| Hold C | Crouch beneath foliage |
| R / Reset button | Return to the threshold |
| Esc | Release the mouse |
| F / Stats button | Show recent measured frame times |
| Quality button | Cycle Balanced, High and Ultra |
| ? button | Show controls |

If mouse capture is unavailable, dragging within the scene also changes the view. The intended route is threshold → either aisle → potting alcove → opposite aisle → threshold. Walkable space is bounded by the building and its small enclosed forecourt. Major walls, the planting bed, bench, crate and large pots block movement; the floor remains at a fixed height.

## What is included

- Original procedural geometry and canvas materials; no borrowed scene or art assets.
- Curved, cut-out monstera leaves; torn banana blades; individually modelled fern and palm leaflets; rough, curved trunks with aligned scars; new fern fiddleheads.
- Weathered glazing, cracked and missing panes, a raised roof vent, riveted metal framing, ties, braces, gutters and downpipes.
- Worn pavers, exposed compost, moss, roots, fallen leaves, hollow pots, botanical labels, a hose and tap, watering can, seed tray and hand tools.
- Instanced repeated geometry, merged structural details, cached static shadows and non-refractive glass to limit render cost.

## Verification

`test-results/smoke-test.json` records a complete keyboard walking loop, mouse capture/look, crouch, reset, collision, anti-tunnelling, quality settings, resize, browser errors and raw frame intervals. `test-results/initial-inspection.json` and the numbered PNGs record the latest multi-view visual inspection, including the roof, the return aisle, leaf undersides, framing and the threshold turnaround. The filename is retained across iterations; its contents are from the latest inspection.

`test-results/view-sweeps.json`, when present, contains additional measurements while turning beside dense foliage and through multiple panes. These are headless-browser diagnostics on this host, including browser scheduling and possible other host activity. They are not a controlled benchmark, a promised frame rate, or a score. The live F overlay reports recent frame times, including long frames, for manual inspection.

To reproduce the checks, install the pinned development dependencies with `npm ci`, keep the server running, then run `npm test`. The test scripts use the installed Chrome executable at the standard Windows location and launch it headlessly. `node tests/inspect.mjs` regenerates the visual evidence.

## Limits

Desktop keyboard and mouse are required; touch and VR controls are not included. Plants and lighting are static. Glass uses inexpensive transparency and weathering rather than true refraction; reflections use an approximate sky environment. Small leaves, stems, the hose and hand tools have no individual collision. The garden gate bounds the forecourt and does not open. No space beyond the greenhouse and threshold is explorable.

## Build provenance

See `BUILD-RECORD.json` for the first implementation timestamp, conservative one-hour deadline, actual stop timestamp, tool/library provenance and interruptions. The provided execution instructions identify the model as **GPT-6 / Codex**. They do not expose the exact backend model variant or reasoning-effort setting, so those values are explicitly marked unavailable rather than guessed.

Three.js 0.180.0 is included under its MIT license in `vendor/THREE-LICENSE.txt`. Playwright 1.56.1 is used only for local verification. No subagents, other models, generated-image services, existing project assets, credentials, purchases or publication were used.
