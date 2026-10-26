# The Astral Atelier

A compact, first-person 3D royal tailor's house: fitting room, cloth archive, and the workshop of the unfinished Night Court mantle. All geometry and textures are generated locally in the scene; there are no downloaded image assets or runtime asset requests.

## Launch

With Node.js 20.19+ or 22.12+ installed, from this directory:

```powershell
npm install
npm run start
```

Open the **suggested launch address** http://127.0.0.1:5187/ after starting the command. No server is included as a running process. Click **Enter the Atelier** to capture the mouse. The project also builds with `npm run build`.

## Controls

- **W A S D** or arrow keys: walk
- **Mouse**: look around
- **Shift**: walk faster
- **R**: reset to the entrance
- **Esc**: release the mouse; click the scene to capture it again

## Implementation and limitations

Three.js renders a static, procedural environment. The mirror is a still metallic surface, rather than a real-time reflection. The outfit and cloth do not simulate or animate. Collision is a simple horizontal approximation around major walls and furniture; the raised fitting dais does not change camera height. There is no touch control.

The scene was built under a restriction against browser, GPU, visual, interactive, or performance testing. `node --check src/main.js` and `npm run build` passed. A successful build does not establish how the scene looks, that interaction works in a particular browser, or its frame rate. Vite reports its ordinary advisory for a JavaScript bundle above 500 kB.
