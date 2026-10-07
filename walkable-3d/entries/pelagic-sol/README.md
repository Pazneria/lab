# Pelagic

A standalone first-person underwater researcher's apartment built with Three.js. All scene geometry, artwork, labels and textures are authored procedurally in this entry. There are no remote assets, runtime requests, accounts or backend services.

## Launch

Requires Node.js 20.19+ or 22.12+ and a desktop browser with WebGL and pointer lock. Dependencies and the production build are included in this workspace.

```powershell
Set-Location 'C:\Users\jmore\Documents\Codex\2026-10-07\task-32\pelagic-home'
npm.cmd run preview
```

Suggested launch address: **http://127.0.0.1:4317/**. No server is currently running. The command uses a strict port so it will fail instead of switching to another entry's port. If 4317 is occupied during the later inspection, choose another port explicitly:

```powershell
npm.cmd exec vite preview -- --host 127.0.0.1 --port 4327 --strictPort
```

For a source development launch, use `npm.cmd run dev`. Rebuild edited source with `npm.cmd run build`. Stop a server you launch with Ctrl+C.

## Controls

- Click **Enter the apartment** to capture the mouse.
- **Mouse:** look. **WASD / arrow keys:** walk.
- **Shift:** brisk pace. Diagonal movement is normalized.
- **R:** reset to the entrance. **Esc:** release the mouse and open settings.
- **F:** toggle the optional frame-interval display.
- The pause panel provides **Balanced / High / Low** render quality and optional gentle walking sway. Sway is off by default.

The camera stays at a 1.64 m eye height. There is no jumping, swimming or floor gravity. Circle-versus-box collision slides along the hull, partitions and major furniture, with substeps to prevent tunnelling. The observation sill remains a solid boundary.

## Inspection route

Start at the sealed entrance. Pass the woven sofa, coffee table, reading lamp and bed nook. Use the left doorway marked **02 / Field Lab** to approach the sample jars, specimen tray, microscope and notebook on the research bench. Take the side opening into **03 / Observation**. Approach the bolted window flange and look into its deep sleeve, then out at the bounded reef. Turn back and use the observation room's separate opening to return through the living area to the entrance.

The window includes a 760 mm sleeve, separate front and rear rubber seals, glazing retainers, a represented 110 mm laminated glazing edge, perimeter fasteners, sill, hand grips, vertical columns, deck anchors and gusseted knee braces. These dimensions describe scene geometry; the design is an artistic construction, not an engineering specification.

## Verification and limits

Checks performed during implementation:

- JavaScript syntax check.
- CPU-only layout check: 940 samples along the inspection loop, plus outer hull, partition, furniture, window and movement-subdivision checks.
- CPU-only generated geometry audit: finite vertex attributes, valid index bounds, finite geometry bounds, static triangle and object budgets. The audit uses no-op canvas stubs and **does not draw or render**.
- Vite production build.

Run the bounded checks with `npm.cmd run check`. See `geometry-audit.json` for the final generated geometry counts and `run-record.json` for timing and execution history.

**Not performed:** browser launch, interactive testing, screenshots, visual verification, WebGL/GPU tests or performance benchmarking. No frame rate is claimed. The optional in-scene display reports recent `requestAnimationFrame` intervals during exploration; those are frame intervals, not GPU timer measurements.

The scene uses merged static geometry, instanced fish, one shadow-casting spotlight, capped render resolution, small procedural textures and no postprocessing. Balanced mode caps rendering at approximately 3 million pixels and uses a 1024² shadow map; High allows approximately 6 million pixels and 2048² shadows; Low allows approximately 1.5 million pixels and disables shadows.

Glazing uses simple transparent shading and restrained reflection marks, without real refraction or a live planar reflection. Specimens and instruments are decorative. Reef fish have a gentle bounded animation without AI. Small props and lamps have no individual collision. Touch/mobile controls and audio are not included. Visual correctness and measured performance remain for the separate inspection session.

## Entry record

First implementation: **2026-10-07 09:05:25.0265576 +00:00**.

One-hour deadline: **2026-10-07 10:05:25.0265576 +00:00**.

The provided model identity is **GPT-6 / Codex**. The execution environment does not expose the exact model identifier or reasoning-effort setting; these are recorded as unavailable rather than guessed. No other model, subagent or model-backed tool was used.

There were no user interruptions or deadline extensions. An initial npm dependency attempt was blocked by sandbox network/cache access; the authorized retry downloaded pinned Three.js and Vite packages from the npm registry. Both attempts counted against the same deadline. All started commands exited; no server, browser, watcher or test process was left running. The final stop timestamp is recorded in `run-record.json`.
