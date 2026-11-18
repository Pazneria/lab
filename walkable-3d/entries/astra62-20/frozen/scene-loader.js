import * as T from './package/build/three.module.min.js';

const base=new URL('./assets/',import.meta.url);
async function read(name){
  const response=await fetch(new URL(name,base));if(!response.ok)throw Error('Could not read '+name+' ('+response.status+')');return response;
}
const arrays={Float32Array,Int8Array,Uint8Array,Uint16Array,Uint32Array};
export async function loadScene(scene,renderer){
  const [spec,buffer]=await Promise.all([read('scene.json').then(r=>r.json()),read('scene.bin').then(r=>r.arrayBuffer())]);
  if(spec.version!==1||buffer.byteLength!==spec.bytes)throw Error('Incomplete scene data');
  const loader=new T.TextureLoader(),maxAnisotropy=renderer.capabilities.getMaxAnisotropy();
  const [maps,reflection]=await Promise.all([
    Promise.all(spec.textures.map(async s=>{
      const t=await loader.loadAsync(new URL(s.file,base).href);
      t.colorSpace=s.colorSpace;t.anisotropy=Math.min(s.anisotropy,maxAnisotropy);
      if(s.repeat)t.wrapS=t.wrapT=T.RepeatWrapping;
      return t;
    })),loader.loadAsync(new URL('glaze-reflection.png',base).href)
  ]);
  reflection.colorSpace=T.SRGBColorSpace;reflection.mapping=T.EquirectangularReflectionMapping;
  const bump={earth:.010,wood:.0047,paint:.0028,leather:.0015,cloth:.0008};
  const materials=spec.materials.map(s=>{
    const common={name:s.name,side:s.side,vertexColors:s.vertexColors,transparent:s.transparent,opacity:s.opacity,depthWrite:s.depthWrite,alphaTest:s.alphaTest,polygonOffset:s.polygonOffset,polygonOffsetFactor:s.polygonOffsetFactor,polygonOffsetUnits:s.polygonOffsetUnits,fog:s.fog};
    if(s.type==='ShaderMaterial')return new T.ShaderMaterial({...common,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,uniforms:{sunAt:{value:new T.Vector3().fromArray(s.sun)},field:{value:maps[s.field]}}});
    common.color=new T.Color().fromArray(s.color);common.map=s.map==null?null:maps[s.map];
    if(s.type==='MeshBasicMaterial')return new T.MeshBasicMaterial(common);
    const m=new T.MeshStandardMaterial({...common,roughness:s.roughness,metalness:s.metalness,emissive:new T.Color().fromArray(s.emissive),emissiveIntensity:s.emissiveIntensity});
    if(bump[s.name]){m.bumpMap=m.map;m.bumpScale=bump[s.name]}
    if(['metal','pottery','glass'].includes(s.name)){m.envMap=reflection;m.envMapIntensity=s.name==='metal'?.46:.29}
    return m;
  });
  const attribute=s=>new T.BufferAttribute(new arrays[s.type](buffer,s.offset,s.count),s.size,s.normalized);
  for(const q of spec.meshes){
    const g=new T.BufferGeometry();for(const [key,data] of Object.entries(q.attributes))g.setAttribute(key,attribute(data));
    g.setIndex(attribute(q.index));
    g.boundingBox=new T.Box3(new T.Vector3().fromArray(q.min),new T.Vector3().fromArray(q.max));
    g.boundingSphere=new T.Sphere(new T.Vector3().fromArray(q.sphere),q.sphere[3]);
    const mesh=new T.Mesh(g,materials[q.material]);mesh.name=q.name;mesh.castShadow=q.cast;mesh.receiveShadow=q.receive;mesh.renderOrder=q.order;mesh.frustumCulled=q.frustum;mesh.matrixAutoUpdate=false;scene.add(mesh);
  }
}