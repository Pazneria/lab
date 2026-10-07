# Orison · Captain's Quarters

A compact, walkable starship suite built as a real-time Three.js scene. The interior is about 6.5 × 8 m, with a 2.7 m ceiling. It contains a sleeping cabin, the captain's private study, and a small window-side observation nook, joined by open portals along one continuous floor.

## Launch

Requires Node.js 20.19+ (or 22.12+). Three.js r180 is included locally; npm install is not required.

```powershell
npm run dev
```

Open the suggested launch address **http://127.0.0.1:5187/** in a WebGL-capable browser. The address is a launch suggestion only; no server is running from this build session. `npm run build` creates a static production bundle in `dist/`. To serve that bundle locally, run `npm run preview`.

## Controls

- Click **Enter Quarters** to capture the mouse.
- **W A S D** move; **arrow keys** also work.
- Move the mouse to look around.
- Hold **Shift** to move faster.
- Press **R** to return to the entry position and initial view.
- Press **Esc** to release the mouse; click the scene to recapture it.

## Notes

The view beyond the observation glass is a deliberately simple, static starfield and distant planet. Desk graphics are quiet, noninteractive set dressing. Movement uses a fixed standing height and horizontal circle-versus-box collision around the main furnishings, plus room bounds. The scene uses no external model or image assets or runtime network requests. Three.js is distributed under the included MIT license.

Visual and interactive verification, browser compatibility checks, and frame-time/performance measurements were not performed in this run. See the task report for the static checks that were completed.
