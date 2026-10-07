# Fieldworks - AI & perception lab

A standalone, first-person Three.js exhibition scene. It is a scenic environment; the exhibits do not simulate experiments.

## Launch

Install the pinned dependency and start the local static server from this folder:

```powershell
npm install --cache .npm-cache
npm start
```

Then open the suggested address **http://127.0.0.1:4187** in a browser. This address is not running until you start the command. To use another port, set `$env:PORT` before `npm start`.

## Controls

- Click **Enter the lab** to capture the mouse; move the mouse to look around.
- **W A S D** or **arrow keys** to walk. Hold **Shift** to move faster.
- **Escape** releases the mouse and returns to the entry card.
- Click **Reset view** or press **R** to return to the entrance and starting view.

## Run record

- Model: Codex GPT-6 runtime. Exact model variant and effort were not exposed to this execution environment.
- First implementation action: 2026-10-07 04:03:37 UTC.
- Deadline: 2026-10-07 05:03:37 UTC.
- Actual stop time and interruption history: to be completed in the delivery report.

## Verification and limits

Three.js is pinned to `0.186.1`. The offline package install could not complete in this sandbox because npm could not write its shared cache; run the install command above where the package is available from npm.

The source receives bounded syntax and package-metadata checks only. This run does not launch a browser or server, and does not perform visual, interactive, GPU, or frame-time testing. Inspect the scene and performance in a separate session.
