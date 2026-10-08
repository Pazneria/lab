import * as T from 'three';
import {mergeGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Static display optimization. Preserve material identity, vertex attributes,
// transforms, triangle winding and transparent sorting; never simplify geometry.
export function batchStaticCharacter(source){
  source.updateMatrixWorld(true);
  const output=new T.Group(),groups=new Map(),originalGeometries=new Set();
  let originalMeshes=0,triangles=0,originalVertices=0;
  source.traverse(mesh=>{
    if(!mesh.isMesh)return;
    originalMeshes++;
    const geometry=mesh.geometry;
    triangles+=(geometry.index?.count??geometry.attributes.position.count)/3;
    originalVertices+=geometry.attributes.position.count;
    originalGeometries.add(geometry);
    if(mesh.isSkinnedMesh||mesh.morphTargetInfluences||Array.isArray(mesh.material)||mesh.material.transparent){
      const preserved=mesh.clone(false);preserved.geometry=geometry.clone();preserved.matrix.copy(mesh.matrixWorld);
      preserved.matrixAutoUpdate=false;preserved.userData.destination='character';output.add(preserved);return;
    }
    const copied=geometry.clone();
    copied.applyMatrix4(mesh.matrixWorld);
    if(mesh.matrixWorld.determinant()<0){
      if(copied.index){
        const indices=copied.index.array;for(let i=0;i<indices.length;i+=3){const temporary=indices[i+1];indices[i+1]=indices[i+2];indices[i+2]=temporary;}
      }else for(const attribute of Object.values(copied.attributes)){
        const values=attribute.array,size=attribute.itemSize;
        for(let i=0;i<attribute.count;i+=3)for(let j=0;j<size;j++){
          const a=(i+1)*size+j,b=(i+2)*size+j,temporary=values[a];values[a]=values[b];values[b]=temporary;
        }
      }
    }
    const key=mesh.material.uuid+'|'+!!copied.index+'|'+Object.entries(copied.attributes).sort(([a],[b])=>a.localeCompare(b)).map(([name,a])=>`${name}:${a.itemSize}:${a.normalized}:${a.array.constructor.name}`).join('|');
    let group=groups.get(key);
    if(!group){group={material:mesh.material,geometries:[]};groups.set(key,group);}
    group.geometries.push(copied);
  });
  for(const {material,geometries} of groups.values()){
    const merged=mergeGeometries(geometries,false);
    if(!merged)throw new Error('Static character attributes could not be merged');
    merged.computeBoundingBox();merged.computeBoundingSphere();
    const mesh=new T.Mesh(merged,material);mesh.castShadow=true;mesh.receiveShadow=true;
    mesh.userData.destination='character';mesh.matrixAutoUpdate=false;mesh.updateMatrix();output.add(mesh);
    for(const g of geometries)g.dispose();
  }
  for(const geometry of originalGeometries)geometry.dispose();
  const displayVertices=output.children.reduce((count,mesh)=>count+mesh.geometry.attributes.position.count,0);
  output.userData.batch={originalMeshes,displayMeshes:output.children.length,triangles,originalVertices,displayVertices};
  return output;
}

export function fitCharacter(character,stage){
  character.updateMatrixWorld(true);
  const bounds=new T.Box3().setFromObject(character),size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3());
  if(!(size.y>0))throw new Error('The character has no displayable bounds');
  const scale=Math.min(stage.maxHeight/size.y,stage.maxWidth/Math.max(size.x,1e-6),stage.maxDepth/Math.max(size.z,1e-6));
  character.scale.setScalar(scale);
  character.position.set(stage.x-center.x*scale,stage.stageY-bounds.min.y*scale,stage.z-center.z*scale);
  character.updateMatrixWorld(true);
  return {scale,sourceBounds:{min:bounds.min.toArray(),max:bounds.max.toArray()},displayBounds:new T.Box3().setFromObject(character)};
}

export function disposeGraph(root){
  const geometries=new Set(),materials=new Set(),textures=new Set();
  root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const material of [].concat(o.material||[])){materials.add(material);for(const value of Object.values(material))if(value?.isTexture)textures.add(value);}});
  for(const texture of textures)texture.dispose();for(const material of materials)material.dispose();for(const geometry of geometries)geometry.dispose();
}
