# Field Hut K-4: polar research shelter (benchmark entry)

- Model / effort: Claude Opus 5.5 (`claude-opus-5-5`), effort 40
- First implementation start: 2026-10-06 01:38:37 -04:00
- One-hour deadline: 2026-10-06 02:38:37 -04:00
- Stop: about 02:10 -04:00, ended early because the usage limit was reached. There were no other interruptions.

## Launch
```
python -m http.server 8947 --bind 127.0.0.1
```
Run it from this folder, then open http://localhost:8947/ (three.js 0.169 is installed locally in `node_modules`).

## Controls
Click to capture the mouse. Mouse to look, WASD or arrow keys to walk, Shift to walk faster, C or Ctrl to crouch,
R to reset to the start, F for the frame-time overlay (avg / p99 / max, draw calls), P to toggle adaptive resolution, Esc to release the mouse.

## What's in the scene
- **Exterior:** wind-shaped snow (sastrugi aligned to the wind, a scour moat on the windward wall, a lee drift tail, a drift behind the snow fence), a packed path, a blue-ice patch, icicles, a roof cornice, frost/rime on windward and low surfaces, bolted corner trims and battens, a steel grating deck with steps and handrails, route flags, fuel drums, a sled, a weather mast, distant mountains, and a twilight sky with the moon and stars.
- **Interior:** a vestibule with parkas, a helmet, a boot bench, a shovel and frost on the door frame; a main room with insulated panels, a workbench (pegboard, vise, laptop, radio, ice cores, lamp), shelving with labelled bins, a heater with flue, bunks, a kitchen counter and stove, a table and chairs, a whiteboard and a map.
- **Rendering:** the interior and exterior are drawn as separate passes, each with its own lights. Warm interior light can't leak outside and blue sky light can't leak inside, while both stay visible through the door and windows. Shadows are static and rendered once. Shaders are precompiled at load. The pass order switches depending on which side the viewer is on, and resolution adapts to hold frame time.

## Test results
- Loads with no console errors. Draw calls are about 82 per frame (both passes); the scene is about 245k triangles.
- Scripted walk test: snow to the steps (floor 0.03 to 0.50 m), through both doors into the room. The shelving, bench and stool block correctly.
- GPU: Intel integrated (ANGLE D3D11). Synchronized timing at 1920×1080, resolution 1.0: interior about 12–18 ms, exterior about 13–25 ms, and the close deck view up to about 30–45 ms. These measurements were noisy. Adaptive resolution (down to 0.5×) is meant to bring heavy views back toward 60 fps, but it was not verified in a live browser session.

## Known limitations
- Doors are fixed open. There is no jumping. Collision is 2D boxes against a 0.24 m player radius.
- Interior lights cast no shadows. Contact-shadow decals stand in for them.
- On weak GPUs, adaptive resolution softens the image in heavy views.
- Frame timing was measured with forced GPU sync in a hidden browser pane, not by live play.
