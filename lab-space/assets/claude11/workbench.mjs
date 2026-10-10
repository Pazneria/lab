// Host-owned miniature on the existing east tool-cart counter. No room rebuild,
// source mesh mutation, animation mixer, dedicated display or extra render loop.
const cart=Object.freeze({x:8.35,z:2.75,yaw:-.15,width:.79,depth:.49,top:.89});
const localX=-.245,localZ=-.128,scale=.19,baseHeight=.014;
const x=cart.x+localX*Math.cos(cart.yaw)+localZ*Math.sin(cart.yaw);
const z=cart.z-localX*Math.sin(cart.yaw)+localZ*Math.cos(cart.yaw);
const approachX=7.35,approachZ=1.65,height=1.78*scale,y=cart.top+baseHeight+height*.55;
export const FIGURINE_SOURCE=Object.freeze({sha256:'e0b87964820e62eb6b7106bd13818e63ac0f7b20d688b8392473080077f53457',bytes:861620,triangles:4202,joints:25,diagnosticClips:6});
export const workbenchLayout=Object.freeze({x,y,z,scale,height,baseY:cart.top,baseHeight,baseRadius:.104,cart,
  local:Object.freeze({x:localX,z:localZ}),yaw:Math.atan2(approachX-x,approachZ-z),
  approach:Object.freeze({x:approachX,z:approachZ,yaw:Math.atan2(-(x-approachX),-(z-approachZ)),pitch:Math.atan2(y-1.62,Math.hypot(x-approachX,z-approachZ))})});

export function createWorkbenchFigurine(T,source){
  source.updateMatrixWorld(true);
  const bounds=new T.Box3().setFromObject(source),size=bounds.getSize(new T.Vector3());
  let triangles=0,joints=0,meshes=0;
  source.traverse(object=>{if(object.isBone)joints++;if(object.isMesh){meshes++;triangles+=(object.geometry.index?.count??object.geometry.attributes.position.count)/3;}});
  if(triangles!==FIGURINE_SOURCE.triangles||joints!==FIGURINE_SOURCE.joints||meshes!==1||Math.abs(size.y-1.78)>.00001||Math.abs(bounds.min.y)>.00001)throw Error('Crypt Warden source geometry or rest frame differs from its accepted contract');
  const root=new T.Group();root.name='crypt-warden-counter-figurine';root.position.set(x,cart.top,z);root.rotation.y=workbenchLayout.yaw;
  const actor=new T.Group();actor.name='accepted-skeleton-instance';actor.position.y=baseHeight;actor.scale.setScalar(scale);actor.add(source);root.add(actor);
  // Keep the complete bone/mesh hierarchy and every source attribute intact.
  source.traverse(object=>{if(object.isMesh){object.castShadow=true;object.receiveShadow=true;object.userData.destination='animation';}});
  const base=new T.Mesh(new T.CylinderGeometry(.101,.104,baseHeight,32),new T.MeshStandardMaterial({color:0x27343a,metalness:.68,roughness:.4}));
  base.name='figurine-base';base.position.y=baseHeight/2;base.castShadow=true;base.receiveShadow=true;base.userData.destination='animation';root.add(base);
  const cueMaterial=new T.MeshStandardMaterial({color:0x88bdb2,metalness:.52,roughness:.42,emissive:0x579788,emissiveIntensity:.10,side:T.DoubleSide});
  const cue=new T.Mesh(new T.RingGeometry(.098,.101,40),cueMaterial);cue.name='figurine-interaction-rim';cue.rotation.x=-Math.PI/2;cue.position.y=baseHeight+.00025;cue.userData.destination='animation';root.add(cue);
  const glyphGeometry=new T.BufferGeometry();glyphGeometry.setAttribute('position',new T.Float32BufferAttribute([-.006,0,.086,.007,0,.078,-.006,0,.070],3));glyphGeometry.computeVertexNormals();
  const glyph=new T.Mesh(glyphGeometry,new T.MeshStandardMaterial({color:0xd3b58b,metalness:.5,roughness:.45,side:T.DoubleSide}));glyph.name='figurine-play-mark';glyph.position.y=baseHeight+.0003;glyph.userData.destination='animation';root.add(glyph);
  // Rib gaps and thin limbs should still be easy to select. This bounded target
  // is on a ray-only layer, excluded from the camera and from shadow rendering.
  const target=new T.Mesh(new T.BoxGeometry(.7765*scale+.025,height+.018,.29011902*scale+.025),new T.MeshBasicMaterial());
  target.name='figurine-selectable-bounds';target.position.set(-.00075*scale,baseHeight+height/2,.01805951*scale);target.layers.set(1);target.userData.destination='animation';root.add(target);
  const light=new T.SpotLight(0xffe8c7,1.7,2.5,.36,.95,2);light.name='figurine-soft-key';light.position.set(-.20,1.02,.30);light.target.position.set(0,baseHeight+height*.53,0);light.castShadow=false;root.add(light,light.target);
  root.userData.destination='animation';root.userData.sourceSha256=FIGURINE_SOURCE.sha256;root.userData.sourceTriangles=triangles;root.updateMatrixWorld(true);
  let hovered=false;
  return {root,actor,source,sourceBounds:{min:bounds.min.toArray(),max:bounds.max.toArray()},scale,height,
    setHovered(value){value=!!value;if(value===hovered)return false;hovered=value;cueMaterial.emissiveIntensity=value ? .48 : .10;return true;},
    get hovered(){return hovered;}};
}
