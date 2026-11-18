# Fallow Kiln

SceneBench 2026-11-17, scene 14. Fallow Kiln is a walkable ceramics workshop with a making studio, a sheltered glazing bench and a kiln courtyard. The geometry and textures are generated locally by the scene.

## Launch the supplied build

In PowerShell, change to this scene folder and run:

~~~powershell
py -3 -m http.server 43114 --bind 127.0.0.1 --directory dist
~~~

Open http://127.0.0.1:43114/ in a desktop browser with WebGL 2, then select **Enter workshop**. This is a suggested local address. The supplied build uses the files in **dist** and needs no npm install or Internet access. Press Ctrl+C in the launch terminal to exit the server.

## Controls

- **WASD** or **arrow keys** to walk. Hold **Shift** to walk faster.
- **Mouse** to look. If the browser declines pointer lock, drag in the scene to look. **Q** and **E** also turn.
- **R** returns to the entrance.
- **Esc** releases the mouse and opens the controls. Use **Resume walk** to continue.

Start at the forming bench, walk around it to the pottery shelves, and use the framed opening to enter the glazing shelter. The wider opening beyond it leads to the courtyard. Turn back from the open courtyard aisle for a view through both openings.

## Source build

Run **npm ci** and **npm run build** to rebuild the supplied static files. The pinned dependencies are Three.js and Vite.

The production build, CPU geometry checks, and collision routes were checked during the benchmark run. Browser rendering, interactive input and frame-time measurement were reserved for the separate judging session.

