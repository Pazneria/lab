# The Lantern Room

Compact first-person browser scene about an adventurer's quiet retirement above an inn. The only runtime dependency is Three.js; Vite serves the bundled scene locally. Textures, portraits, furniture, props, and lighting are generated in the scene code, with no external asset requests.

## Launch

From this folder, run:

```powershell
npm install
npm run dev
```

Suggested launch address: <http://127.0.0.1:4173/> (the server is not running now). The Vite script binds only to loopback and uses port 4173.

## Controls

- **W A S D** — walk
- **Mouse** — look around (click **Step Inside** or the scene to capture the mouse; press **Esc** to release)
- **Shift** — brisk walk
- **R** or **Reset** — return to the entrance

## Notes

The scene is built as low-poly furnished geometry with procedural canvas textures. Movement uses a fixed-height first-person camera and circular wall/furniture checks. Visual verification, browser interaction, and frame-time/performance measurement were intentionally not performed in this run; those are reserved for a separate session. The opening start card covers the first view until dismissed.
