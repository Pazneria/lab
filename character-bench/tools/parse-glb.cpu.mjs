// CPU-only, real pixel decoding through an already installed Python/Pillow.
// This is not a browser ImageBitmap implementation or a renderer.
import {readFileSync,writeFileSync,realpathSync,existsSync} from 'node:fs';
import {resolve,dirname,basename} from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {validateGLB,LIMITS} from '../assets/contracts.mjs';
import {GLTFLoader} from '../assets/vendor/GLTFLoader.js';
import {LoadingManager,Box3} from '../../lab-space/assets/vendor/three.module.min.js';
import {disposeObject} from '../assets/resources.mjs';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const decoder=fileURLToPath(new URL('./decode-image.cpu.py',import.meta.url));
export function decodeImage(bytes,python=process.env.CHARACTERBENCH_PYTHON||'python'){
  const run=spawnSync(python,[decoder],{input:bytes,maxBuffer:LIMITS.imagePixels*4+8,timeout:30000,windowsHide:true});
  if(run.error)throw run.error;
  if(run.status!==0)throw Error('Image decoder failed: '+String(run.stderr).trim().slice(-1000));
  const out=run.stdout;if(out.length<8)throw Error('Incomplete decoded image');
  const width=out.readUInt32LE(0),height=out.readUInt32LE(4),data=out.subarray(8);
  if(!width||!height||width>LIMITS.imageEdge||height>LIMITS.imageEdge||data.length!==width*height*4)throw Error('Invalid decoded image dimensions or pixels');
  return {width,height,data};
}
const dataBytes=uri=>Buffer.from(uri.slice(uri.indexOf(',')+1),'base64');
function embeddedImages(bytes,json){
  let binary=null;
  for(let p=12;p<bytes.length;){const n=bytes.readUInt32LE(p),kind=bytes.readUInt32LE(p+4);if(kind===0x004e4942)binary=bytes.subarray(p+8,p+8+n);p+=8+n;}
  const buffers=(json.buffers||[]).map(b=>b.uri?dataBytes(b.uri):binary);
  return (json.images||[]).map(image=>{
    if(image.uri)return dataBytes(image.uri);
    const v=json.bufferViews[image.bufferView],buffer=buffers[v.buffer];
    return buffer.subarray(v.byteOffset||0,(v.byteOffset||0)+v.byteLength);
  });
}
export async function inspectGLB(path){
  const bytes=readFileSync(path),sha256=hash(bytes);
  const result={path,byteLength:bytes.length,sha256,preflight:false,parser:false,decodedImages:[],textureBindings:0};
  const previous={self:globalThis.self,bitmap:globalThis.createImageBitmap,progress:globalThis.ProgressEvent,createURL:URL.createObjectURL,revokeURL:URL.revokeObjectURL};
  const urls=new Set(),cache=new Map(),bitmaps=new Set(),errors=[];let gltf;
  try{
    const buffer=bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),summary=validateGLB(buffer);
    result.preflight=true;result.meshes=summary.meshes;result.vertices=summary.vertices;
    let pixels=0;
    for(const [index,encoded] of embeddedImages(bytes,summary.json).entries()){
      const encodedSha256=hash(encoded),decoded=decodeImage(encoded);pixels+=decoded.width*decoded.height;
      if(pixels>LIMITS.imagePixels)throw Error('Decoded image pixel budget exceeded');
      cache.set(encodedSha256,decoded);
      result.decodedImages.push({index,encodedSha256,width:decoded.width,height:decoded.height,rgbaSha256:hash(decoded.data)});
    }
    globalThis.self=globalThis;
    globalThis.ProgressEvent ||= class extends Event {constructor(type,options){super(type);Object.assign(this,options);}};
    URL.createObjectURL=blob=>{const url=previous.createURL(blob);urls.add(url);return url;};
    URL.revokeObjectURL=url=>{previous.revokeURL(url);urls.delete(url);};
    globalThis.createImageBitmap=async(blob,options={})=>{
      if(options.imageOrientation && options.imageOrientation!=='none')throw Error('Unsupported CPU image orientation option');
      if(options.premultiplyAlpha && options.premultiplyAlpha!=='none')throw Error('Unsupported CPU alpha option');
      const encoded=Buffer.from(await blob.arrayBuffer()),decoded=cache.get(hash(encoded));
      if(!decoded)throw Error('Loader requested an image outside the validated embedded payloads');
      const bitmap={isImageBitmap:true,width:decoded.width,height:decoded.height,data:decoded.data,closed:false,close(){this.data=null;this.closed=true;}};
      bitmaps.add(bitmap);return bitmap;
    };
    const manager=new LoadingManager();
    manager.setURLModifier(url=>{
      if(urls.has(url)||/^data:(?:application\/(?:octet-stream|gltf-buffer)|image\/(?:png|jpeg));base64,[A-Za-z0-9+/]*={0,2}$/.test(url))return url;
      throw Error('Unexpected non-embedded loader resource');
    });
    manager.onError=url=>errors.push(url);
    gltf=await new GLTFLoader(manager).parseAsync(buffer,'');
    if(errors.length)throw Error('Loader resource failures: '+errors.length);
    const textures=new Set();let meshNodes=0;
    gltf.scene.traverse(node=>{
      if(node.isMesh)meshNodes++;
      for(const material of Array.isArray(node.material)?node.material:[node.material])
        if(material)for(const value of Object.values(material))if(value?.isTexture)textures.add(value);
    });
    for(const texture of textures){
      const image=texture.source?.data;
      if(!image||image.closed||!image.data||image.data.length!==image.width*image.height*4)throw Error('Missing decoded texture pixels');
    }
    result.textureBindings=textures.size;result.meshNodes=meshNodes;
    const box=new Box3().setFromObject(gltf.scene,true);result.bounds={min:box.min.toArray(),max:box.max.toArray()};
    if(![...result.bounds.min,...result.bounds.max].every(Number.isFinite))throw Error('Non-finite scene bounds');
    result.parser=true;
  }catch(error){result.parser=false;result.error=error.message;}
  finally{
    for(const scene of gltf?.scenes||[])disposeObject(scene);
    for(const bitmap of bitmaps)bitmap.close();
    for(const url of urls)previous.revokeURL(url);
    URL.createObjectURL=previous.createURL;URL.revokeObjectURL=previous.revokeURL;
    if(previous.self===undefined)delete globalThis.self;else globalThis.self=previous.self;
    if(previous.bitmap===undefined)delete globalThis.createImageBitmap;else globalThis.createImageBitmap=previous.bitmap;
    if(previous.progress===undefined)delete globalThis.ProgressEvent;else globalThis.ProgressEvent=previous.progress;
    result.decodedImagesClosed=[...bitmaps].every(b=>b.closed);cache.clear();
    result.sourceHashUnchanged=hash(readFileSync(path))===sha256;
  }
  return result;
}
if(process.argv[1]&&pathToFileURL(process.argv[1]).href===import.meta.url){
  const args=process.argv.slice(2),outputIndex=args.indexOf('--output'),output=outputIndex<0?null:args.splice(outputIndex,2)[1];
  const listIndex=args.indexOf('--list'),list=listIndex<0?null:args.splice(listIndex,2)[1];
  const paths=list?JSON.parse(readFileSync(list,'utf8')):args;
  if(!Array.isArray(paths)||!paths.length||paths.some(path=>typeof path!=='string'))throw Error('Supply one or more GLB input paths');
  if(output){
    const canonical=path=>existsSync(path)?realpathSync(path):resolve(realpathSync(dirname(path)),basename(path));
    const key=path=>process.platform==='win32'?canonical(path).toLowerCase():canonical(path);
    if(paths.some(path=>key(path)===key(output)))throw Error('Evidence output must not overwrite an input asset');
    if(!output.toLowerCase().endsWith('.json'))throw Error('Evidence output must be a JSON file');
  }
  const results=[];for(const path of paths)results.push(await inspectGLB(path));
  const evidence={cpuOnly:true,realImageDecode:true,visualReview:false,gpuPerformance:false,results};
  if(output)writeFileSync(output,JSON.stringify(evidence,null,2)+'\n');
  console.log(JSON.stringify({files:results.length,preflightPassed:results.filter(r=>r.preflight).length,importPassed:results.filter(r=>r.parser&&!r.error).length,imagesDecoded:results.reduce((n,r)=>n+r.decodedImages.length,0),failures:results.filter(r=>!r.parser||r.error).map(r=>({path:r.path,error:r.error}))},null,2));
  if(results.some(r=>!r.parser||r.error||!r.sourceHashUnchanged))process.exitCode=1;
}
