# The Glasshouse

A first-person, procedurally built greenhouse scene. The two stone aisles run on either side of a raised central bed and reconnect at the doorway and at the potting alcove.

## Launch

Requires Node.js 20.19+ or 22.12+. In this directory:

```powershell
npm ci
npm run start
```

Open the **suggested launch address** `http://127.0.0.1:4187/` after starting Vite. The server uses that fixed port and will report an error if it is occupied. Dependencies are pinned in `package-lock.json`. The scene's textures and geometry are generated locally; it does not fetch visual assets at runtime.

## Controls

- Click **Enter the glasshouse** to capture the mouse.
- Move with **W A S D** or the arrow keys; move the mouse to look.
- Hold **Shift** to walk faster.
- Press **R** to reset to the threshold.
- Press **Escape** to release the mouse; click the enter button again to resume.

The raised bed, enclosing walls, doorway and potting bench have simple collision boundaries. Plants are intentionally permeable so their foliage can be inspected closely.

## Verification and limitations

The build and JavaScript syntax were checked without running a server or browser. A CPU-only reachability check found a path from the threshold to both aisles and the alcove using the movement collision bounds. Interactive behavior, actual appearance, and graphics performance have not been tested; those require a separate browser session. The renderer uses static shadows, and the glass is stylized transparent material rather than physically simulated glazing.
