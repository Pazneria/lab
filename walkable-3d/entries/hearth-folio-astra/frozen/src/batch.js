import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

export class Batch {
  constructor(scene,materials){this.scene=scene;this.materials=materials;this.groups=new Map();this.geometries={box:new THREE.BoxGeometry(1,1,1),round:new RoundedBoxGeometry(1,1,1,2,.09),cyl:new THREE.CylinderGeometry(1,1,1,16),sphere:new THREE.SphereGeometry(1,12,8),cone:new THREE.CylinderGeometry(.5,1,1,20),plane:new THREE.PlaneGeometry(1,1),torus:new THREE.TorusGeometry(1,.06,6,32)};this.dummy=new THREE.Object3D();this.color=new THREE.Color();}
  register(name,geometry){this.geometries[name]=geometry;}
  frame(x=0,y=0,z=0,angle=0){const m=new THREE.Matrix4();return m.compose(new THREE.Vector3(x,y,z),new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),angle),new THREE.Vector3(1,1,1));}
  add(shape,material,p,s=[1,1,1],r=[0,0,0],color=null,frame=null,shadow=true){
    if((shape==='box'||shape==='round')&&(material==='wood'||material==='darkWood')&&s[0]>s[2]*1.4&&s[0]>s[1]*2)material+='H';
    const key=shape+'|'+material+'|'+shadow;let g=this.groups.get(key);if(!g){g={shape,material,shadow,items:[]};this.groups.set(key,g);}
    this.dummy.position.set(...p);this.dummy.scale.set(...s);this.dummy.rotation.set(r[0]||0,r[1]||0,r[2]||0);this.dummy.updateMatrix();const matrix=this.dummy.matrix.clone();if(frame)matrix.premultiply(frame);g.items.push({matrix,color});
  }
  box(mat,p,s,r=[0,0,0],color=null,frame=null,shadow=true){this.add('box',mat,p,s,r,color,frame,shadow);}
  rod(mat,a,b,r=.025,frame=null){const va=new THREE.Vector3(...a),vb=new THREE.Vector3(...b),dir=vb.clone().sub(va);const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),dir.clone().normalize());const e=new THREE.Euler().setFromQuaternion(q);this.add('cyl',mat,va.add(vb).multiplyScalar(.5).toArray(),[r,dir.length(),r],[e.x,e.y,e.z],null,frame);}
  finish(){let instances=0;for(const g of this.groups.values()){const mesh=new THREE.InstancedMesh(this.geometries[g.shape],this.materials[g.material],g.items.length);mesh.name=g.shape+' / '+g.material;g.items.forEach((a,i)=>{mesh.setMatrixAt(i,a.matrix);if(a.color!==null)mesh.setColorAt(i,this.color.set(a.color));});mesh.castShadow=g.shadow;mesh.receiveShadow=true;mesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);mesh.computeBoundingSphere();this.scene.add(mesh);instances+=g.items.length;}return{batches:this.groups.size,instances};}
}
