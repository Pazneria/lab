import * as T from './vendor/three.module.min.js';

async function get(path){
  const response=await fetch(new URL('./assets/'+path,import.meta.url));
  if(!response.ok)throw Error(path+' returned HTTP '+response.status);
  return response;
}
async function unpack(file){
  const bytes=new Uint8Array(await (await get(file)).arrayBuffer());
  if(bytes[0]!==31||bytes[1]!==139)return bytes.buffer;
  if(typeof DecompressionStream==='function'){
    const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    return new Response(stream).arrayBuffer();
  }
  const {gunzipSync}=await import('./vendor/fflate.module.js');
  const result=gunzipSync(bytes);return result.buffer.slice(result.byteOffset,result.byteOffset+result.byteLength);
}
export async function loadAssets(renderer){
  const loader=new T.TextureLoader(),base=new URL('./assets/',import.meta.url);
  const [meta,geometry,lighting,studio,finish,moon,traffic]=await Promise.all([
    get('bay.json').then(r=>r.json()),unpack('bay-geometry.gz'),unpack('light-volume.gz'),get('studio.f16').then(r=>r.arrayBuffer()),
    loader.loadAsync(new URL('finish.png',base).href),loader.loadAsync(new URL('satellite.png',base).href),loader.loadAsync(new URL('deck-use.png',base).href)
  ]);
  if(meta.version!==1||meta.packedBytes!==geometry.byteLength)throw Error('The packed geometry does not match its manifest.');
  if(lighting.byteLength!==meta.light.dim.reduce((a,b)=>a*b,4))throw Error('The baked lighting volume is incomplete.');
  const anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  finish.wrapS=finish.wrapT=T.RepeatWrapping;finish.anisotropy=Math.min(4,anisotropy);finish.colorSpace=T.NoColorSpace;
  traffic.colorSpace=T.NoColorSpace;traffic.flipY=false;traffic.anisotropy=Math.min(4,anisotropy);
  moon.colorSpace=T.SRGBColorSpace;moon.wrapS=T.RepeatWrapping;moon.anisotropy=anisotropy;
  const field=new T.Data3DTexture(new Uint8Array(lighting),...meta.light.dim);
  field.format=T.RGBAFormat;field.type=T.UnsignedByteType;field.minFilter=field.magFilter=T.LinearFilter;
  field.unpackAlignment=1;field.generateMipmaps=false;field.needsUpdate=true;
  const probe=new T.DataTexture(new Uint16Array(studio),256,128,T.RGBAFormat,T.HalfFloatType);
  probe.minFilter=probe.magFilter=T.LinearFilter;probe.mapping=T.EquirectangularReflectionMapping;
  probe.colorSpace=T.LinearSRGBColorSpace;probe.needsUpdate=true;
  return {meta,geometry,field,probe,finish,moon,traffic,anisotropy};
}
export function decodeBay(meta,buffer,materials){
  const room=new T.Group(),exterior=new T.Group();
  for(const b of meta.mesh){
    const n=b.count*3,g=new T.BufferGeometry(),src=new Int16Array(buffer,b.position,n),p=new Float32Array(n);
    for(let i=0;i<n;i++)p[i]=src[i]/1536;
    g.setAttribute('position',new T.BufferAttribute(p,3));
    g.setAttribute('normal',new T.BufferAttribute(new Int8Array(buffer,b.normal,n),3,true));
    g.setAttribute('color',new T.BufferAttribute(new Uint8Array(buffer,b.color,n),3,true));
    g.setAttribute('abrasion',new T.BufferAttribute(new Uint8Array(buffer,b.wear,b.count),1,true));
    const Idx=b.wide?Uint32Array:Uint16Array;
    g.setIndex(new T.BufferAttribute(new Idx(buffer,b.index,b.indexCount),1));
    g.computeBoundingSphere();
    if(!materials[b.material])throw Error('Missing surface finish '+b.material);
    const mesh=new T.Mesh(g,materials[b.material]);mesh.name=b.section+' / '+b.material;
    const out=b.material==='outside';
    mesh.receiveShadow=!out;
    mesh.castShadow=!out&&!['pressure hull','deck','overhead','utility runs'].includes(b.section)
      &&!['glass','lit','signal','black','mark'].includes(b.material);
    if(b.material==='glass')mesh.renderOrder=3;
    mesh.matrixAutoUpdate=false;(out?exterior:room).add(mesh);
  }
  return {room,exterior};
}

