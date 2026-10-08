// CPU-only geometry checks. No renderer, browser, listener or server.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import * as T from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {batchStaticCharacter,fitCharacter,disposeGraph} from './character.mjs';
import {exhibits} from './layout.mjs';
const bytes=readFileSync(process.argv[2]);
const data=bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength);
const gltf=await new GLTFLoader().parseAsync(data,'');
assert.equal(gltf.animations.length,0);
let beforeMeshes=0,beforeTriangles=0,beforeVertices=0;const originalMaterials=new Set();
gltf.scene.traverse(mesh=>{if(mesh.isMesh){beforeMeshes++;beforeTriangles+=(mesh.geometry.index?.count??mesh.geometry.attributes.position.count)/3;beforeVertices+=mesh.geometry.attributes.position.count;for(const mat of [].concat(mesh.material))originalMaterials.add(mat);}});
const beforeBounds=new T.Box3().setFromObject(gltf.scene);
const character=batchStaticCharacter(gltf.scene);
const afterBounds=new T.Box3().setFromObject(character);
assert.ok(beforeBounds.min.distanceTo(afterBounds.min)<1e-6);assert.ok(beforeBounds.max.distanceTo(afterBounds.max)<1e-6);
let afterTriangles=0,afterVertices=0;const mergedMaterials=new Set();character.traverse(mesh=>{if(mesh.isMesh){afterTriangles+=(mesh.geometry.index?.count??mesh.geometry.attributes.position.count)/3;afterVertices+=mesh.geometry.attributes.position.count;assert.equal(mesh.userData.destination,'character');for(const mat of [].concat(mesh.material))mergedMaterials.add(mat);}});
assert.equal(afterTriangles,beforeTriangles);assert.deepEqual(mergedMaterials,originalMaterials);
assert.equal(afterVertices,beforeVertices);assert.ok(character.children.every(mesh=>mesh.geometry.index),'source indexing is retained');
assert.ok(character.children.length<beforeMeshes);
const fit=fitCharacter(character,exhibits.character),size=fit.displayBounds.getSize(new T.Vector3());
assert.ok(size.y<=1.35+1e-6);assert.ok(size.x<=1.6+1e-6);assert.ok(size.z<=1.3+1e-6);
assert.ok(Math.abs(fit.displayBounds.min.y-.66)<1e-6);assert.ok(fit.displayBounds.max.y<2.02);
assert.ok(Math.hypot(size.x/2,size.z/2)<.9,'character stays inside the inner camera ring');
const direction=new T.Vector3(0,0,-1).applyEuler(new T.Euler(.18,0,0));assert.ok(direction.y>0,'positive pitch looks up');
// A screen-space bounding rectangle must never replace the real silhouette.
const ray=new T.Raycaster();let silhouetteHits=0,boundsMisses=0;
for(let row=1;row<12;row++)for(let column=1;column<12;column++){
  ray.set(new T.Vector3(fit.displayBounds.min.x+size.x*column/12,fit.displayBounds.min.y+size.y*row/12,3),new T.Vector3(0,0,-1));
  const hits=ray.intersectObject(character,true);
  if(hits.length){silhouetteHits++;assert.equal(hits[0].object.userData.destination,'character');}else boundsMisses++;
}
assert.ok(silhouetteHits>10);assert.ok(boundsMisses>10);
// Mirroring an indexed primitive reverses indices rather than expanding vertices.
const mirrorGeometry=new T.BufferGeometry();mirrorGeometry.setAttribute('position',new T.Float32BufferAttribute([0,0,0,1,0,0,0,1,0],3));mirrorGeometry.setAttribute('normal',new T.Float32BufferAttribute([0,0,1,0,0,1,0,0,1],3));mirrorGeometry.setIndex([0,1,2]);
const mirrorSource=new T.Group(),mirrorMesh=new T.Mesh(mirrorGeometry,new T.MeshStandardMaterial());mirrorMesh.scale.x=-1;mirrorSource.add(mirrorMesh);
const mirrored=batchStaticCharacter(mirrorSource);assert.deepEqual(Array.from(mirrored.children[0].geometry.index.array),[0,2,1]);assert.equal(mirrored.children[0].geometry.attributes.position.count,3);disposeGraph(mirrored);
console.log(JSON.stringify({passed:true,originalMeshes:beforeMeshes,displayMeshes:character.children.length,materials:originalMaterials.size,triangles:beforeTriangles,sourceVertices:beforeVertices,displayVertices:afterVertices,bounds:{min:fit.displayBounds.min.toArray(),max:fit.displayBounds.max.toArray()},scale:fit.scale,silhouetteHits,boundsMisses,renderers:0}));
disposeGraph(character);
