# Section Seven

Section Seven is an explorable 3D museum with two rooms. The entrance gallery holds a carved limestone loop and a fluted cast-resin sculpture. A 5.8-metre-wide ramp rises 760 mm to the sculpture hall, where a folded bronze work stands under two recessed skylights.

## Launch

From this directory, serve the included build with Node.js.

~~~powershell
node scripts/serve.mjs 47107
~~~

Open [http://127.0.0.1:47107/](http://127.0.0.1:47107/) in a WebGL 2 browser. This is the suggested local address. The server binds only to the loopback interface. Use Ctrl+C to stop it. The compiled build includes its JavaScript dependencies and texture assets.

## Controls

| Action | Input |
| --- | --- |
| Enter and capture the mouse | Click **Enter the museum** |
| Move and strafe | **WASD** |
| Look | Mouse, or drag the view when the pointer is free |
| Move forward and back with arrow keys | **↑** and **↓** |
| Turn with keys | **←** and **→**, or **Q** and **E** |
| Walk faster | **Shift** |
| Release the mouse | **Esc** |
| Return to the entrance | **R** or **Reset view** |

On touchscreens, use the on-screen movement pad and drag the view to look around. A suggested route is past the two gallery works, up the ramp, around the bronze and back along the same passage.

## Rebuild and checks

~~~powershell
npm ci --no-audit --no-fund
npm run build
npm run check
~~~

The build uses Three.js and esbuild. The included material maps were generated from a local seeded script. Run Python 3 with the following command to regenerate them.

~~~powershell
python scripts/textures.py
~~~

The CPU-only checks exercise the collision route, all three ramp lines, floor continuity, portal sightlines, skylight openings, sculpture mesh closure and the packaged texture payloads.

A WebGL 2 browser is required. The execution conditions for this entry allow CPU-only checks. Visual verification, interactive browser testing and performance measurement are pending.
