# Applied Sensing Lab — explorable 3D exhibition hall

A compact science / AI demonstration lab built with three.js (r186), bundled into `dist/`.

## Launch
```
npm start
```
then open http://localhost:5173 (any static server pointed at `dist/` also works, e.g. `python -m http.server -d dist 5173`).
To rebuild after editing `src/`: `npm run build`.

## Controls
| Input | Action |
|---|---|
| Click | Capture mouse for mouse-look (Esc releases; click-drag also looks around if pointer lock is unavailable) |
| W A S D / arrows | Walk |
| Shift | Walk faster |
| C | Crouch toggle (inspect low equipment) |
| R | Reset to entrance |
| 1 2 3 4 | Jump to entrance / instrument / perception bench / motion rig |
| F | Frame-time statistics (avg, p99, max, draw calls, triangles) |
| P | Cycle render resolution scale |
| H | Help overlay |

## Layout
Entrance (south) → ORBIS-7 multi-view imager on a round plinth in the centre (walk all the way around) →
Perception Testing Bench A (west alcove) → Motion Testing Rig B (east alcove) → return across the hall to the entrance.
