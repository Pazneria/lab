# Final local verification

Production preview: http://127.0.0.1:5187/ — serves the packaged `dist/` build.

All runtime source files match their packaged copies by SHA-256. JavaScript syntax checks and build passed. Headless Chrome reported no page errors, and the final verification observed no external asset requests.

The actual keyboard walking test reached all 12 checkpoints: the four awnings, connecting courtyard space, covered passage, tea counter and return. Each checkpoint was clear and connected on the collision grid. A sustained walk into a counter stopped without overlap. Reset and drag-look passed; the frame-timing panel and camera resize also passed.

| Test | Samples | Median | P95 | P99 | Frames over 50 ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| Walking, 1440 × 900 | 2909 | 15.2 ms | 26.6 ms | 33.6 ms | 0 |
| Slow turns, 1440 × 900 | 1199 | 14.7 ms | 25.7 ms | 32.8 ms | 0 |
| Slow turns, 1920 × 1080 window | 666 | 16.8 ms | 31.4 ms | 37.9 ms | 0 |

The larger window rendered at 1788 × 1006 under the documented pixel budget. Cold scene setup in the final walking run took 2705.7 ms. The final larger-window check observed 2592.4 ms startup before resize.

GPU: ANGLE (Intel, Intel(R) Graphics (0x00007D67) Direct3D11 vs_5_0 ps_5_0, D3D11)

These are animation-frame intervals from local headless Chrome. They are supporting evidence, not a score or a promise of performance on every device. Jordan's later interactive judging is authoritative. Full summaries and raw frame times are in `evidence/route-test.json`, `evidence/walking-frame-times.json`, `evidence/final-verify.json`, and `evidence/full-hd-frame-times.json`.

Known limits: desktop keyboard/mouse controls; WebGL 2 required; approximate static reflections; no jumping, touch controls, people or surrounding city. Small countertop decorations have no individual collision.

The benchmark record discloses setup detours, timestamps and the unavailable exact model variant/effort setting. There were no external interruptions.
