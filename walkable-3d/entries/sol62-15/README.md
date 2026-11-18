# Wren House — First Light

Iona Venn keeps the footbridges of the Lower Reach. Her work takes her out at dawn to mark the river's height and check which crossings held overnight. Follow the small signs of that routine through her bedroom, walk-in wardrobe and map study.

## Launch

Open dist/Wren-House.html in a desktop browser with WebGL 2 and hardware acceleration. It is a self-contained build and does not need a network connection.

To launch the source locally on Windows PowerShell, open this directory and run:

    npm ci
    npm run dev

Open http://127.0.0.1:48173/ after Vite reports that it is ready. This is the suggested launch address. To rebuild without serving the scene, run:

    npm run build

## Controls

- Click the scene or select **Capture mouse** to look with the mouse. Press **Esc** to release it. You can also drag the scene to turn without capturing the pointer.
- Use **W A S D** to walk and strafe. The **up** and **down** arrows also move forward and back. The **left** and **right** arrows turn.
- Press **R** or select **Reset** to return to the entrance.

From the entrance, walk past the foot of the bed and approach the bedside cabinet from the right. The arched opening on the bedroom's right leads into the wardrobe. Continue through the next arch to the desk, then take the same route back.

## Checks

Run npm run check for the CPU-only scene graph and collision checks. It exercises the geometry assembly and the route to the wardrobe and desk, then back to the entrance. Browser rendering, mouse input and measured frame times are reserved for the separate review session.
