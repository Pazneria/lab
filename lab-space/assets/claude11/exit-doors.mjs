// Host-added south exit: moving leaves replace the derivative's fixed panes;
// the existing first frame and lobby remain in hall.js. No DOM/renderer needed.
import {exitLayout,doorLeafCenter,boundedProgress} from '../production-exit.mjs';

export function createExitDoors(T,materials){
  const group=new T.Group();group.name='Production south exit';group.userData.productionExit=true;
  const boxGeometry=new T.BoxGeometry(1,1,1),handleGeometry=new T.CylinderGeometry(.018,.018,1,10);
  const resources=[boxGeometry,handleGeometry],dynamic=[];
  const matrix=new T.Matrix4(),position=new T.Vector3(),scale=new T.Vector3(),quaternion=new T.Quaternion(),euler=new T.Euler();
  const parts=new Map(),staticParts=new Map();
  const part=(store,material,geometry,dimensions,at,rotation=[0,0,0],leaf=null)=>{
    const key=material.uuid+'|'+geometry.uuid;
    if(!store.has(key))store.set(key,{material,geometry,records:[]});
    store.get(key).records.push({dimensions,at,rotation,leaf});
  };
  const staticBox=(material,dimensions,at)=>part(staticParts,material,boxGeometry,dimensions,at);
  // The original floor starts 10 cm after the hall; a flat sill closes that gap.
  staticBox(materials.alu,[2.6,.02,.22],[0,.01,8.53]);
  // Shallow pockets conceal the open leaves and permanently exclude their
  // swept area from walking, so opening/closing cannot trap a player at a jamb.
  for(const sign of [-1,1])staticBox(materials.wall,[1.08,2.5,.18],[sign*1.84,1.25,8.56]);
  // Rear wall is split around a second real 2.6 m doorway, rather than hiding a
  // trigger on the original solid wall. Its ceiling remains the original one.
  for(const sign of [-1,1]){
    staticBox(materials.wallAccent,[1.08,3,.18],[sign*1.84,1.5,11.56]);
    staticBox(materials.alu,[.08,2.5,.16],[sign*1.31,1.25,11.5]);
    staticBox(materials.wallAccent,[.1,1,.75],[sign*1.35,.5,11.975]);
  }
  staticBox(materials.wallAccent,[2.6,.5,.1],[0,2.75,11.6]);
  staticBox(materials.alu,[2.7,.08,.16],[0,2.54,11.5]);
  staticBox(materials.floor,[2.6,.1,.75],[0,-.05,11.975]);
  staticBox(materials.wallAccent,[2.8,1,.1],[0,.5,12.4]);
  staticBox(materials.alu,[2.6,.02,.2],[0,.01,11.5]);
  for(const id of ['inner','outer'])for(const sign of [-1,1]){
    const leaf={id,sign},z=exitLayout.doors[id].z;
    const leafBox=(material,dimensions,at)=>part(parts,material,boxGeometry,dimensions,at,[0,0,0],leaf);
    leafBox(materials.glass,[1.2,2.4,.012],[0,1.22,z]);
    for(const x of [-.57,.57])leafBox(materials.alu,[.06,2.42,.05],[x,1.22,z]);
    leafBox(materials.alu,[1.2,.06,.05],[0,2.4,z]);
    leafBox(materials.alu,[1.2,.18,.05],[0,.09,z]);
    for(const x of [-.45,.45])leafBox(materials.steel,[.03,.03,.06],[x,1.05,z-.05]);
    part(parts,materials.steel,handleGeometry,[1,1,1],[0,1.05,z-.08],[0,0,Math.PI/2],leaf);
  }
  function transform(record,progress){
    const offset=record.leaf?doorLeafCenter(record.leaf.id,record.leaf.sign,progress[record.leaf.id]):0;
    position.set(record.at[0]+offset,record.at[1],record.at[2]);scale.set(...record.dimensions);
    quaternion.setFromEuler(euler.set(...record.rotation));matrix.compose(position,quaternion,scale);return matrix;
  }
  function meshes(store,moving){
    for(const entry of store.values()){
      const mesh=new T.InstancedMesh(entry.geometry,entry.material,entry.records.length);
      mesh.name=moving?'Exit sliding panels':'Exit vestibule frame';mesh.userData.productionExit=true;
      mesh.castShadow=entry.material.userData.cast!==false;mesh.receiveShadow=entry.material.userData.receive!==false;
      mesh.matrixAutoUpdate=false;mesh.updateMatrix();
      if(entry.material.transparent)mesh.renderOrder=2;
      if(moving){mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);dynamic.push({mesh,records:entry.records});}
      entry.records.forEach((record,i)=>mesh.setMatrixAt(i,transform(record,{inner:0,outer:0})));
      mesh.computeBoundingBox();mesh.computeBoundingSphere();group.add(mesh);
    }
  }
  meshes(staticParts,false);meshes(parts,true);
  let previous={inner:0,outer:0},disposed=false;
  return {
    group,
    // Returns true only when instance matrices changed. The host owns rendering
    // and shadow refresh; these are the same progress values used by collision.
    setProgress(progress){
      if(disposed)return false;
      const next={inner:boundedProgress(progress.inner),outer:boundedProgress(progress.outer)};
      if(next.inner===previous.inner&&next.outer===previous.outer)return false;
      for(const {mesh,records} of dynamic){
        records.forEach((record,i)=>mesh.setMatrixAt(i,transform(record,next)));
        mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingBox();mesh.computeBoundingSphere();
      }
      previous=next;return true;
    },
    dispose(){
      if(disposed)return;disposed=true;group.removeFromParent();
      group.traverse(object=>{if(object.isInstancedMesh)object.dispose();});
      for(const geometry of resources)geometry.dispose();
      // Materials belong to the room; disposing them here would break its hall.
      group.clear();
    },
  };
}
