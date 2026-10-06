import * as THREE from 'three';
import {mergeGeometries} from '../vendor/BufferGeometryUtils.js';

export class Batcher{
  constructor(scene){this.scene=scene;this.groups=new Map();this.counters={pieces:0,vertices:0};}
  add(geometry,material,position=[0,0,0],rotation=[0,0,0],scale=[1,1,1],cast=true){
    const matrix=new THREE.Matrix4().compose(new THREE.Vector3(...position),new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)),new THREE.Vector3(...scale));
    geometry.applyMatrix4(matrix);let key=material.uuid+(cast?'c':'n');
    if(!this.groups.has(key))this.groups.set(key,{material,cast,geometries:[]});this.groups.get(key).geometries.push(geometry);this.counters.pieces++;return geometry;
  }
  box(size,pos,material,rot=[0,0,0],cast=true){return this.add(new THREE.BoxGeometry(...size),material,pos,rot,[1,1,1],cast);}
  cylinder(r1,r2,h,pos,material,rot=[0,0,0],segments=12,cast=true){return this.add(new THREE.CylinderGeometry(r1,r2,h,segments),material,pos,rot,[1,1,1],cast);}
  sphere(r,pos,material,scale=[1,1,1],segments=12){return this.add(new THREE.SphereGeometry(r,segments,8),material,pos,[0,0,0],scale);}
  rod(a,b,r,material,segments=8){const va=new THREE.Vector3(...a),vb=new THREE.Vector3(...b),dir=vb.clone().sub(va);const geom=new THREE.CylinderGeometry(r,r,dir.length(),segments);geom.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize()));return this.add(geom,material,va.add(vb).multiplyScalar(.5).toArray());}
  finish(){for(const{material,cast,geometries}of this.groups.values()){
    // Extruded cushions use non-indexed vertices, whereas boxes and spheres use indices.
    // Normalize only mixed batches so the merge contract is satisfied without expanding all books.
    if(geometries.some(g=>g.index)&&geometries.some(g=>!g.index)){
      for(let i=0;i<geometries.length;i++)if(geometries[i].index){const old=geometries[i];geometries[i]=old.toNonIndexed();old.dispose();}
    }
    const geometry=mergeGeometries(geometries,false);if(!geometry)throw new Error('Static geometry batch could not merge.');
    geometry.computeBoundingSphere();const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=cast;mesh.receiveShadow=true;mesh.matrixAutoUpdate=false;mesh.updateMatrix();this.scene.add(mesh);this.counters.vertices+=geometry.attributes.position.count;
    for(const g of geometries)g.dispose();
  }this.groups.clear();return this.counters;}
}

export function colorGeometry(geometry,color){const c=new THREE.Color(color),data=new Float32Array(geometry.attributes.position.count*3);for(let i=0;i<data.length;i+=3){data[i]=c.r;data[i+1]=c.g;data[i+2]=c.b;}geometry.setAttribute('color',new THREE.BufferAttribute(data,3));return geometry;}

export function localPoint(x,y,z,origin,angle=0){return[origin[0]+x*Math.cos(angle)+z*Math.sin(angle),origin[1]+y,origin[2]-x*Math.sin(angle)+z*Math.cos(angle)];}
