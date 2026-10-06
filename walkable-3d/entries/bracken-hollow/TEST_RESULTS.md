# Bracken Hollow — release checks

The production build runs at **http://127.0.0.1:5187/**. The bundled static files can be served without npm dependencies using `node serve.mjs`.

## Functional checks

- Production build completed successfully.
- All 15 route waypoints were reached using keyboard input: entrance, waiting room, platform, main timber crossing, woodland viewpoint, return boardwalk, and entrance again.
- Wall, bench, and canopy-post collision checks passed. Both waiting-room doorways and the crossing remained passable.
- A live three-second walk into the side wall stopped at x = 4.485 m, outside the wall.
- Pointer lock, mouse-look, Escape pause, reset, high/balanced detail selection, and the F timing panel passed.
- A DPR 2 resize test passed at 2560 × 1440 and back to 1280 × 720, with both rendering budgets respected and no runtime errors.
- Final production inspection reported no JavaScript/WebGL errors, no console warnings, and no external network requests.
- Screenshots were reviewed from the approach, room, canopy, track crossing, woods, gable, timetable, and disturbed platform edge.

## Measured frame timing

Chrome 154 headless, Intel Graphics / Direct3D 11, 1440 × 900 CSS pixels, device pixel ratio 1, high detail. One test browser ran at a time. The host's other workloads were not controlled, so these are local diagnostic samples rather than a promised frame rate.

The complete keyboard-route run recorded 4,951 frames: **10.7 ms median, 16.0 ms p95, 21.0 ms p99**. A separate deliberate camera-rotation run recorded:

| View | Median | p95 | p99 |
|---|---:|---:|---:|
| Station approach | 23.1 ms | 37.9 ms | 48.5 ms |
| Waiting room, full turn | 23.4 ms | 37.5 ms | 53.4 ms |
| Canopy and dense foliage, full turn | 23.1 ms | 40.9 ms | 54.6 ms |
| Track crossing, full turn | 20.7 ms | 36.4 ms | 50.8 ms |
| Woodland viewpoint, full turn | 19.8 ms | 37.4 ms | 45.4 ms |

All per-frame samples are retained in `artifacts/final-performance.json` and `artifacts/route-frame-times.json`. Timing varied between local runs; the separate inspection planned by Jordan remains the performance assessment. Initial generation and shader warm-up took 3.23 seconds in the rotation-test run, behind the loading screen.

The final large-display resolution cap leaves the measured 1440 × 900 / DPR 1 setting unchanged. High detail limits the drawing buffer to approximately 1.8 million pixels; balanced detail uses approximately 0.9 million. Shadows are cached after initial rendering, foliage uses spatially culled instances, and shaders are compiled before entry.

## Limits

Desktop keyboard/mouse navigation only. The walking area is bounded; distant trees are decorative impostors. Foliage and sunlight are static. There are no trains or gameplay systems. Build timing and model-metadata availability are recorded in `BUILD_LOG.md`.
