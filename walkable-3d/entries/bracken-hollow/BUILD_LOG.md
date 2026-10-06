# Bracken Hollow — benchmark build

- Workspace: `C:\Users\jmore\Documents\Codex\2026-10-05\task-6`
- Work began: 2026-10-06 01:02:10 UTC.
- Implementation start: 2026-10-06 01:04:09 UTC (recorded immediately before the first source-writing call; `index.html` was created at 01:04:10 UTC).
- One-hour implementation deadline: 2026-10-06 02:04:09 UTC. The earlier whole-task limit is 02:02:10 UTC; this build is being completed before both.
- Model: Codex, GPT-6 family as identified by the execution instructions. The exact serving model identifier and reasoning-effort setting are not exposed to this session, so they cannot be truthfully specified more precisely.
- No other models or subagents used.
- Assets: original procedural geometry and canvas textures created in this workspace. Libraries from npm only.
- Interruptions: no user interruptions. The first dependency download was blocked by sandbox network access; an automatically approved npm registry retry succeeded. This was included in elapsed work time.
- Preview port: 5187 (localhost only).

## Implementation and validation record

- Scene/source editing stopped: 2026-10-06 01:53:08 UTC, before both deadlines.
- Production build: successful, about 625 kB uncompressed total. All assets are generated locally; the page makes no asset-service or CDN requests.
- Source libraries pinned to Three.js 0.186.1, Vite 8.3.2, and Playwright 1.63.0 in the lockfile.
- Main walking route: all 15 waypoints completed using real keyboard input, including both doorways, the platform, the principal crossing, the woodland loop, and the return boardwalk.
- Control checks: mouse capture/look, Escape pause/release, reset, detail toggle, and frame-timing display passed.
- Collisions checked against front/side walls, canopy posts and benches; doorways and timber crossing remained passable.
- All testing used a headless Chrome instance; the user's browser was not foregrounded.
- A high-DPI resize test also passed. The production server is left running on port 5187, with no test browsers left open after verification.
- Runtime performance evidence is saved in `artifacts/final-performance.json`, `artifacts/route-test.json`, and `artifacts/route-frame-times.json`. These are measured local diagnostics, not a promised frame rate on another machine.

## Known limits

- Desktop keyboard and mouse controls; no touch navigation.
- A bounded, approximately 76 × 64 metre walking area. The more distant forest uses original tree impostors and is decorative.
- Foliage and sunlight are static. No trains, jumping, or gameplay objectives.
- Exact serving model identifier and reasoning-effort setting were unavailable in the execution environment. The family label above is not a claim of a more precise model configuration.
