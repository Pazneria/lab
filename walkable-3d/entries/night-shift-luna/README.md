# Night Shift Arcade

Standalone first-person 3D arcade room. The scene is built procedurally in Three.js, including its cabinet illustrations and patterned materials; there are no borrowed game assets or external image/font downloads.

## Launch

From this folder, run:

```powershell
python -m http.server 4179
```

Then open **http://localhost:4179/** in a modern browser. The address is a suggested local launch address; no server was started or previewed for this entry.

## Controls

- Click **Step inside** to capture the mouse.
- **W A S D** move; mouse moves the view.
- Hold **Shift** to walk more slowly.
- **Esc** releases the pointer; click the scene to resume.
- **Reset view** returns to the entrance.

## Build record

- Model: GPT-6 (the exact effort setting was not exposed to this execution environment).
- First implementation action: 2026-10-07 04:01:53 UTC.
- One-hour deadline: 2026-10-07 05:01:53 UTC.
- First implementation environment: a newly empty workspace at `C:\Users\jmore\Documents\Codex\2026-10-07\task-3`.
- No interruptions to report.

## Limitations

The first load needs network access for the Three.js ES module. Visual verification, browser interaction, frame-time measurement and performance testing were intentionally not performed under this run's execution conditions. This is an environment scene, not a playable collection of arcade games.
