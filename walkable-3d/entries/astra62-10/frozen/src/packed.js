import * as T from '../vendor/three.module.min.js';

export function unpackScene(buffer,materials) {
  const source=new DataView(buffer),decoder=new TextDecoder();
  if(decoder.decode(new Uint8Array(buffer,0,8))!=='ALDR0001')throw new Error('Invalid scene package.');
  const headerSize=source.getUint32(8,true),info=JSON.parse(decoder.decode(new Uint8Array(buffer,12,headerSize)));
  const offset=12+Math.ceil(headerSize/4)*4,group=new T.Group();
  for(const m of info.meshes){
    if(!materials[m.mat])throw new Error('Unavailable material '+m.mat);
    const g=new T.BufferGeometry(),p=new Float32Array(m.num*3),uv=m.uv?new Float32Array(m.num*2):null;
    const normals=new Int8Array(m.num*3),colors=new Uint8Array(m.num*3);
    for(let i=0;i<m.num;i++){
      const at=offset+m.vo+i*16;
      for(let j=0;j<3;j++){
        p[i*3+j]=m.min[j]+source.getUint16(at+j*2,true)*(m.span[j]/65535);
        normals[i*3+j]=source.getInt8(at+10+j);colors[i*3+j]=source.getUint8(at+13+j);
      }
      if(uv)for(let j=0;j<2;j++)uv[i*2+j]=m.min[j+3]+source.getUint16(at+6+j*2,true)*(m.span[j+3]/65535);
    }
    g.setAttribute('position',new T.BufferAttribute(p,3));
    if(uv)g.setAttribute('uv',new T.BufferAttribute(uv,2));
    g.setAttribute('normal',new T.BufferAttribute(normals,3,true));g.setAttribute('color',new T.BufferAttribute(colors,3,true));
    const Index=m.bits===16?Uint16Array:Uint32Array;
    g.setIndex(new T.BufferAttribute(new Index(buffer,offset+m.io,m.ic).slice(),1));
    g.boundingSphere=new T.Sphere(new T.Vector3(...m.center),m.radius);
    const mesh=new T.Mesh(g,materials[m.mat]);mesh.name=m.name;mesh.castShadow=m.cast;mesh.receiveShadow=m.receive;group.add(mesh);
  }
  return {group,solids:info.solids};
}
export async function loadGeometry(){
  if(typeof DecompressionStream==='undefined')return null;
  const result=await fetch(new URL('../assets/library.mesh.gz',import.meta.url));
  if(!result.ok)throw new Error('Scene package could not be read.');
  const input=await result.arrayBuffer(),bytes=new Uint8Array(input);
  // Some static hosts decode gzip in transit. Both representations are supported.
  if(bytes[0]!==31||bytes[1]!==139)return input;
  const stream=new Blob([input]).stream().pipeThrough(new DecompressionStream('gzip'));
  return new Response(stream).arrayBuffer();
}
