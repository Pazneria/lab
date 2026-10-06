# Local verification

The final functional run passed all **13 checks**, with **zero browser console errors**:

- Mouse capture and mouse-look.
- Complete keyboard loop through both aisles and the potting alcove, returning to the threshold.
- Crouching and reset.
- Collision against the bed, outer wall, bench and terracotta pot.
- A large movement step could not tunnel through the planting bed.
- Balanced, High and Ultra rendering settings.
- Browser resizing.

The latest visual inspection also checked the entrance, both aisles, dense planting, the potting bench, roof, leaf undersides, threshold turnaround and framing at close range. Numbered screenshots are in `test-results/`.

## Diagnostic frame intervals

Headless Chrome 154 on Windows, ANGLE / Intel Graphics / Direct3D 11, 1440 × 960 drawing buffer, High setting. Static shadows were already built. No screenshots were taken during these turning measurements.

| Turning location | Mean | P95 | P99 | Maximum | Frames > 50 ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| Beside dense planting | 13.1 ms | 23.3 ms | 31.0 ms | 40.5 ms | 0 |
| Multiple panes and the long axis | 8.5 ms | 17.3 ms | 21.5 ms | 26.0 ms | 0 |
| Looking back from the alcove | 13.5 ms | 25.4 ms | 30.3 ms | 34.6 ms | 0 |

These are short local diagnostics, not controlled performance judging, a promised frame rate, or a score. Browser scheduling, headless operation and other host activity can affect them. The manual scene includes an F-key overlay showing recent actual frame intervals, P95, maximum and long-frame count. Long intervals are not filtered out.

Raw data: `test-results/smoke-test.json` and `test-results/view-sweeps.json`. The earlier Escape/pointer-lock issue was corrected and the full functional test rerun successfully; its superseded diagnostic is retained as `intermediate-pointerlock-failure.json`.
