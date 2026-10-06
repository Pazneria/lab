# Low Tide — A morning at the boathouse

A desktop 3D scene built for walking and close inspection. An open timber boatbuilding workshop leads to a short pier. A marked, railed timber ramp reaches the exposed shore and the small clinker skiff **Wren**, resting on a cradle beside the building.

## Launch the delivered build

The production build is already in `dist`. With Node.js installed, open a terminal in this folder and run:

```powershell
node .\scripts\serve.mjs
```

Then open **http://127.0.0.1:5187** in a desktop browser yourself. The launcher stays in the foreground and **Ctrl+C** stops it. It does not open or foreground a browser. `START.ps1` runs the same command.

No package installation or internet access is needed to serve the delivered build. All scene assets are generated locally from code; there are no remote fonts, textures or models. Use a WebGL 2 capable browser such as current Chrome, Edge or Firefox. Directly opening `dist/index.html` as a file is unsupported because ES modules need an HTTP origin.

If port 5187 is occupied during later testing, use an available distinct port:

```powershell
$env:LOW_TIDE_PORT = '5188'
node .\scripts\serve.mjs
```

## Controls

| Control | Action |
| --- | --- |
| Step inside / click the scene | Capture the mouse |
| Mouse | Look around |
| WASD or arrow keys | Walk / strafe |
| Shift | Brisk walk |
| Esc | Release the mouse |
| Hold left mouse and drag | Look without mouse capture |
| R or Reset button | Return to the workshop |
| Controls button | Open controls / pause walking |
| Quality button | Toggle high and balanced rendering |
| F | Show / hide frame-time display |
| P | Start recording frame intervals; press again to save CSV |

The route is continuous and requires no jumping: **workshop → pier end → return to landing → marked shore ramp → skiff → ramp → workshop**. The ramp is on the east side of the landing, to the left when first facing out from the workshop. The boat and ramp share the same exposed bank; there is no need to cross under the pier or enter the water. The centre aisle and ramp mouths are kept clear. Walls, rails, major furniture, boat hull and large shore boulders block walking. Movement uses a 22 cm radius, small substeps, floor height checks and edge clearance.

## Detail and rendering

Separate chamfered boards, exposed roof trusses, standing seams and gutter hardware form the workshop. The bench has a vise, hand plane, mallet, square, finishes, drawings and curled shavings. Racks, crates, an apron, a lamp and an electrical cable occupy working edges. Mooring cleats, rope coils, fenders and bands of damp timber detail the pier. The skiff has seven hull strakes per side, fastenings, ribs, thwarts, floorboards, a foredeck, oars, rowlocks, bow fittings and a keel. The shore has damp stone, shell fragments, kelp, shallow pools, grass and reeds.

The fixed morning sun casts one cached shadow map. Repeated timber, fixings, stones and plants are instanced; static meshes sharing materials are merged. Shader compilation, initial texture upload and the first shadow render happen behind the loading screen before the entry button appears. Water is a single sheet with analytic shallow-water colour, slow ripples and approximate sky / sun glints. There are no reflection render targets, water simulations, postprocessing passes or streaming assets. High quality caps device pixel ratio at 1.25 with a 2048 shadow map; balanced caps it at 1 with a 1024 map. These are implementation choices, **not measured performance claims**.

The frame display reports recent requestAnimationFrame intervals (average, p95 and p99 over up to 240 samples). CSV preserves frame intervals, including long hitches, plus elapsed time, position, location and quality. It measures display-loop timing, not isolated GPU rendering time. No timing samples were collected during implementation.

## Validation and run limits

`npm.cmd run check` performs syntax and eight non-browser static/data checks, including the inspection route, wall and edge rejection, large movement substeps and tapered hull collision. `npm.cmd run build` compiles the production artifact with Vite. See `STATIC_CHECKS.json` and `BUILD_REPORT.json` for the saved results. The ZIP includes the prebuilt artifact and complete source. `RUN_RECORD.json` and `PROCESS_CHECK.json` remain beside the ZIP in the original workspace; the final receipt links the timing record with start, deadline, stop, model/effort availability and process closure.

This run explicitly prohibited preview servers, browsers, browser automation, UI input, scene execution, GPU checks and performance benchmarks. **Interactive controls, rendered appearance, actual runtime collision and performance were not tested.** No preview server was started. The preview address above is the address to use after launching it later.

The tide, boat, props and distant land are fixed. Water reflections are approximate. Decorative small objects use visual geometry without individual collision. The skiff interior is inspectable from the shore but cannot be boarded. Exploration is limited to the dry bank, workshop, landing, pier and shore; swimming, jumping, touch controls, moving boats and a large coastline are outside this build.

## Source / rebuild

Source is in `src`. The registry dependencies are pinned in `package-lock.json`: Three.js 0.180.0 and Vite 7.1.9. The implementation used Node.js 24.14.0 and npm 11.9.0.

```powershell
npm.cmd ci --cache .npm-cache
npm.cmd run check
npm.cmd run build
```

`npm.cmd run dev` and `npm.cmd run preview` also use localhost port 5187 with strict port selection. Neither was run during this benchmark. Third-party licence text is in `THIRD_PARTY_NOTICES.txt`.
