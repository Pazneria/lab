# After Rain — courtyard night market

A browser-first, first-person WebGL scene. Everything needed to render it is in `index.html`; it uses a small hand-built WebGL renderer and generated geometry, so there are no model downloads, package installs, or external asset requests.

## Run locally

From this folder, start the static server:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open **http://127.0.0.1:4173** in a current desktop browser with WebGL enabled. Keep the server running while exploring. If port 4173 is occupied, choose a different local port in the command and address.

## Controls

- **W A S D** or arrow keys: walk
- **Mouse:** look around (click the scene to capture the pointer; **Esc** releases it)
- **Shift:** walk faster
- **Reset walk** button or **R:** return to the courtyard entrance

The upper-right readout measures recent browser frame rate and average frame time while the scene is running. Movement has solid boundaries at the courtyard walls, stall counters, and passage walls.

## Scene notes

Four stalls use distinct roofs and wares: a steel noodle griddle, produce crates, stacked bamboo steamers, and flower jars. The central paving has procedural slate joints and damp patches; the warm lamps and colored boards light nearby surfaces. The north opening leads through a covered timber passage to the tea counter and shelves.

The scene is built as a single static mesh and rendered in one draw call to keep camera movement light. Lighting is a small set of local point lights plus a cool night fill; there are no shadow maps, sound, animated people, or downloaded image textures. Roofs are intentionally open to a dark night sky over the courtyard.
