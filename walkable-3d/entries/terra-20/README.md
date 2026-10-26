# Thistle & Thread — The Wayfarer's Wagon

A small first-person browser scene: an inhabited wagon, its work area and fold-out shop, and the camp around it.

## Launch

From this folder, run:

```powershell
npm install
npm run dev
```

Then open the **suggested** address <http://127.0.0.1:5187/>. The server is not started by the build process and was not started for this entry. Dependencies are already installed in this workspace; `npm install` is useful if moving the source to another machine with Node.js.

## Controls

Click the scene to capture the mouse. Move with WASD or the arrow keys, look with the mouse, hold Shift to walk faster, press R to return to camp, and press Escape to release the mouse. The entrance steps are at the end of the wagon; another set of steps leads onto the customer landing in front of the open shop.

## Checks and limitations

`npm run build` produces the non-serving `dist` build. `node route-check.cjs` checks connectivity using the scene's collision map, and `node geometry-check.mjs` checks the procedural geometry and batching using a lightweight canvas stub. These are CPU-only checks. No browser, screenshot, interactive, GPU, or performance test was run under the execution conditions. The scene is designed for desktop mouse and keyboard; touch controls are not included. Lighting and material appearance remain unverified visually, and frame rate has not been measured.

The static geometry is merged by material, and directional shadows are rendered once rather than recalculated on every frame. Furniture and fold-out mechanisms are static. The wagon is not a vehicle and the shop has no trading interface.

## Entry record

First implementation action: 2026-10-26 20:12:06 UTC. Deadline: 2026-10-26 21:12:06 UTC. The exact assigned model identifier and reasoning-effort setting were not exposed in this execution environment; the system identifies Codex as GPT-6 based. The initial sandboxed package installation was interrupted after it did not complete; the same public packages were then installed successfully with the permitted network escalation. No other interruptions occurred. The actual stop timestamp and process cleanup are recorded in the delivery report.
