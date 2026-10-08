// Build only the host derivative. Never rebuild an entrant or mutate its catalog.
const path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const dependencies=process.env.LAB_PRODUCTION_DEPENDENCIES;
if(!dependencies)throw new Error('Set LAB_PRODUCTION_DEPENDENCIES to a developer node_modules directory containing three@0.186.1 and esbuild@0.28.2.');
const modules=path.resolve(dependencies);
assert.equal(require(path.join(modules,'three/package.json')).version,'0.186.1');
assert.equal(require(path.join(modules,'esbuild/package.json')).version,'0.28.2');
require(path.join(modules,'esbuild')).buildSync({
  absWorkingDir:root,entryPoints:['lab-space/assets/claude11/room-source.mjs'],
  outfile:'lab-space/assets/production-room.mjs',bundle:true,format:'esm',minify:true,
  target:'es2020',platform:'browser',nodePaths:[modules],legalComments:'eof'
});
console.log('Built the production Lab with Three.js 0.186.1 / esbuild 0.28.2.');
