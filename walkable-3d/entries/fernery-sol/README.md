# The Fernery

A human-scale, explorable tropical greenhouse. All scene geometry, lettering and texture artwork were authored procedurally in this workspace. The scene uses Three.js; no external images, project assets, APIs or runtime asset downloads are required.

## Preview and launch

The preview is at **http://127.0.0.1:4317/**. It binds only to localhost. The browser has not been foregrounded.

The production build is in `dist/`. To launch the already-built scene from this folder, run:

```powershell
npm start
```

Node.js is required. No installation is needed to serve the existing build. If the preview is already running, simply open the address above. The same instructions work with the portable build archive.

To rebuild from source:

```powershell
npm ci --cache .npm-cache
npm run build
npm start
```

## Controls

- Click **Enter the greenhouse** to capture the mouse.
- **Mouse:** look around.
- **W / A / S / D:** walk relative to your view.
- **Shift:** brisk walk.
- **C:** hold to crouch and inspect below the leaves.
- **Arrow keys:** turn and look vertically.
- **Esc:** release the mouse. Click Continue to capture it again.
- **R** or the **Reset** button: return to the threshold.
- **F:** show or hide measured frame-time percentiles and rendering counts.

The aisles connect at the front of the raised bed and in the rear potting alcove. Walls, the bed, open doors, large pots, the workbench and watering supplies block walking. Eye height is 1.66 m, crouched height 1.07 m; walking speed is 2.1 m/s. There is no jumping or flight.

## Scene and rendering

Curved banana paddles, perforated lobed monstera, tree ferns, a fan palm, philodendron, prayer plants, bromeliads and ground ferns provide distinct silhouettes. Rough bark, roots, soil aggregate, moss blades, leaf litter and small fungi occupy the lower layer. Slender iron ribs, trusses, purlins, bolts, cracked and missing glazing, guttering, open doors and a roof vent keep the greenhouse structure readable.

The potting bench includes open terracotta pots, a seedling tray, tools, twine, a ledger, shelf and faded signage. A watering can, coiled hose, broken pot pieces, baskets, aerial roots and cobweb remnants give nearby surfaces more detail.

Static geometry is indexed and batched by material and vegetation bay. The fixed daylight shadow map is rendered once. Weathered glazing uses inexpensive translucent surfaces; it does not calculate full physical refraction. Leaves are static, with curved geometry, veins and a small approximation of light through their undersides. Pixel density is capped at 1.5 and the render surface at 1.6 million pixels. This fixed cap is recalculated only when the window is resized; it does not change during walking. UI text remains at native resolution.

## Validation

`npm run build` compiles the production files. `npm test` uses headless Chrome to inspect seven viewpoints, verify pointer capture, keyboard movement, reset, collision boundaries and the complete route. `node tests/walkthrough.mjs` walks the route using keyboard input at 1920 × 1080, checks mouse-look, crouching and Escape, then turns through the dense planting.

The raw reports and frame intervals are in `test-results/inspection.json` and `test-results/walkthrough.json`. Viewpoint PNGs are supporting inspection evidence; the deliverable is the interactive 3D environment. Headless test frame times depend on the machine and do not replace the separate performance judging run.

## Limitations

Desktop keyboard and mouse with WebGL 2 are required. Foliage is deliberately non-solid; major structures and large props have collision. There is no audio, dynamic weather, touch navigation or animated foliage. Glass transparency approximates weathering and reflection rather than physical transmission. The explorable boundary ends at the immediate threshold. The exact serving model identifier and reasoning-effort setting were not exposed to the agent, and are marked as unavailable in the benchmark record rather than guessed.

Timing, the deadline, interruptions and the actual stop timestamp are recorded in `benchmark-record.json`.
