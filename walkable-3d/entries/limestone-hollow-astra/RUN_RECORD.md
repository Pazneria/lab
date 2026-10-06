# Limestone Hollow — run record

- Workspace: `C:\Users\jmore\Documents\Codex\2026-10-06\task-7`
- Session work began: **2026-10-06 17:04:33 UTC**.
- First implementation command began: **2026-10-06 17:09:25 UTC**. First source file creation was **2026-10-06 17:09:27.8228492 UTC**, confirmed from `package.json` filesystem metadata. The earlier progress update used the command-start time.
- Hard deadline: **2026-10-06 18:04:33 UTC** (one hour from initial work, including planning).
- Model identity supplied by session: **Codex, based on GPT-6**. Requested exact model/effort: **not specified in the delegated prompt**. No exact backend model identifier or reasoning-effort setting is exposed; relevant model/effort environment fields were absent. Exact model and effort therefore remain **unverified**, rather than inferred from a product label.
- Constraint: source implementation and lightweight non-browser checks only. No preview server, browser, UI automation, GPU scene execution, or performance benchmark may be run during this build.
- All scene geometry and textures are created in this workspace. No other entrant files, prior project assets, external image services, subagents, or other models are used.
- Intended later preview: `http://127.0.0.1:43187` (port was not listening at initial inspection or the 17:35:45 UTC recheck). No server was started.
- Actual stop: **2026-10-06 17:38:48 UTC**. Source, build, checks, packaging, and process audit are complete; no edits will follow this record.
- Interruptions: a coordination notice reported disconnect notices, but no disconnect-induced pause or lost work was observed in this execution. Initial registry access and esbuild ancestor-directory access failed under the sandbox; both were resolved through the available approval mechanism. These retries consumed time within the original deadline. No extension was taken.
- Interactive and performance checks: **NOT RUN**, as required by the execution constraint.

## Delivered artifact

- Original source: `src/`, `index.html`, and build/server/check scripts in `scripts/`.
- Ready-to-serve build: `dist/` (all runtime files local).
- Portable build and source archive: `limestone-hollow.zip`. The final run record is supplied separately beside the archive, so its stop time can be recorded after packaging.
- Instructions: `README.md`; launch with `npm start` or `launch.cmd`, then manually open the preview address.
- No background preview or browser process was started. Dependency installation and build/check commands completed.

## Final verification

- `npm run build`: PASS. Bundled JavaScript is about 529 KiB, plus its source map and local CSS/HTML/license.
- `npm run check`: PASS. Syntax checks; 663 dry-route samples; all three tested pool-side viewpoints and the landing connected; water and exterior boundaries rejected.
- Analytic main-route maximum grade: 27.6%; minimum roof clearance: 3.45 m. The arch has its own conservative clearance check.
- Pure floor flood fill: 6,984 reachable quarter-metre cells, including the required route.
- `TEST_RESULTS.txt` preserves the final output.
- These are static mathematical/build checks, **not** rendered, interactive, or measured performance results. No score or frame rate is claimed.

## Known limitations

Runtime visuals and shader compatibility have not been browser-tested. Water uses an analytic reflection approximation rather than rendering reflected geometry. Formation collisions use conservative footprints; tiny gravel and survey pins are decorative. Desktop keyboard and mouse are required. The optional F3 display reports animation-frame intervals, not GPU timer queries.


## Artifact integrity and shutdown

- Archive: 753,127 bytes; 20 entries, inspected without executing the scene.
- SHA-256: `2EDB9ACD53F5B629051FB501C29C44337E362D96551B983F3BD2C9370EE1BCCE`.
- Final read-only process audit: PASS, no Node/esbuild processes referencing this workspace remain. The initial sandboxed process query was denied; the approved read-only retry succeeded.

