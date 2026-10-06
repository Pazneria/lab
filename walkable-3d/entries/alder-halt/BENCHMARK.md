# Alder Halt — benchmark record

- Environment: new, initially empty workspace `C:\Users\jmore\Documents\Codex\2026-10-05\task-7`.
- Model identity provided by this execution context: **GPT-6**. Exact backend model identifier and selected reasoning-effort setting are not exposed to this delegated execution; neither is guessed.
- First implementation artifact: `package.json`, created by `npm init -y` at **2026-10-06 01:02:55.1361045 UTC**, verified from the file's NTFS creation timestamp. This replaces the initial coarse clock estimate.
- One-hour editing deadline: **2026-10-06 02:02:55.1361045 UTC**.
- Distinct preview port: **4377**.
- No subagents, other models, paid services, credentials, external communications or public publication.
- All scene geometry and textures authored in this workspace. Third-party library: Three.js 0.180.0 from npm. Playwright is used for browser verification only.
- Scene implementation frozen at **2026-10-06 01:41:27.1549523 UTC**, verified from the final `scene.js` write timestamp.
- Final per-view/browser-control verification completed **2026-10-06 01:42:10 UTC**. All 13 assertions passed, with no runtime errors.
- Final continuous keyboard route completed **2026-10-06 01:44:14 UTC**. All 13 stops were reached, including the waiting room, covered platform, timber crossing, woodland loop and entrance return. Reset and mouse release passed.
- Final walking measurement: 1,684 recorded frames at 1440 × 900, DPR 1, Balanced rendering; mean **17.12 ms**, p95 **29.20 ms**, p99 **33.40 ms**, maximum **41.70 ms**. These are raw local headless measurements, not a promised frame rate or a score. Full records are in `evidence/navigation.json` and `evidence/verification.json`; the P panel remains available for the separate judging run.
- Interruptions: **no human or scheduling interruptions**. The first restricted npm fetches failed; an authorized registry install succeeded. The bundled dependency helper was unavailable, so the ordinary installed Node.js and Chromium runtimes were used. Setup and retries are included in the elapsed time.
- All browser testing was headless. The user's browser was not foregrounded. The live server binds only to `127.0.0.1:4377`.
- Deliverables: workspace source, bundled Three.js runtime/license, README, a portable `alder-halt-build.zip`, and test JSON/PNG evidence. Packaging was completed before the one-hour deadline.
