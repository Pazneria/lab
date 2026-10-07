# Mira's Wayfarer

A standalone, first-person 3D scene of a compact merchant wagon, its connected living and work spaces, and a small camp. The entire scene is custom geometry in one self-contained HTML file; it has no asset downloads or package-install step.

## Launch

From PowerShell in this folder:

```powershell
Start-Process -FilePath (Resolve-Path .\index.html).Path
```

Suggested local launch address: `file:///C:/Users/jmore/Documents/Codex/2026-10-07/task-34/index.html`. No localhost preview is running; this entry's execution conditions prohibited starting a server.

## Controls and route

- **W / A / S / D** or **arrow keys**: walk
- **Mouse**: look; click **Step inside** (or click the scene) to capture the pointer. Drag-look is also wired as a fallback.
- **Shift**: move a little faster
- **Esc**: release pointer capture
- **R**: reset to the camp starting position

Start on the camp side of the wagon. Walk around to the east end, climb the three broad fixed steps through the open doorway, and follow the open aisle through the home and its partition doorway into the storeroom/workshop. Return through the end door and circle to the front, where the supported canvas shop awning shades the counter. The small camp is directly beside the wagon.

The wagon is approximately 4.8 m long and 2.6 m wide, with about 2.1 m of interior headroom. The steps are ordinary fixed treads. The opening and awning stay in their displayed open positions.

## Verification and limits

Checks performed: a CPU-only JavaScript syntax check (`node --check`) and static inspection of the single-file launch and controls. No browser was launched; there was no visual verification, interactive playtest, frame-time measurement, or performance benchmark, as required by the execution conditions. The scene uses one static interleaved mesh and procedural shader variation. Its collision is a small set of horizontal wall/furniture bounds with step-height logic, rather than a full physics engine. Pointer capture depends on browser support; click-and-drag look is included as a fallback. No drivable vehicle, trading mechanics, audio, or backend is included.

## Run record

- Model/effort exposed by this run: **GPT-6**; the exact serving variant and effort setting were not surfaced in the execution context.
- First implementation action: **2026-10-07 09:06:02 UTC**.
- Hard deadline (60 minutes later): **2026-10-07 10:06:02 UTC**.
- Interruptions: **none experienced during this run**.
- The exact stop timestamp is included in the completion report for this entry.
