// Pure comparison contracts; no DOM, GPU, storage or network.
export const LIMITS = Object.freeze({bytes:64*1024*1024, meshes:1200, vertices:2000000, nodes:4096, accessorBytes:96*1024*1024, imageEdge:4096, imagePixels:32*1024*1024});
const idPattern=/^[a-z0-9][a-z0-9-]{0,95}$/;
const hashPattern=/^[a-f0-9]{64}$/;
export function safeAssetPath(path) {
  return typeof path==='string' && /^\.\/entries\/[a-z0-9-]+\.glb$/.test(path);
}
export function validateManifest(input) {
  if(input?.version!==1 || !Array.isArray(input.prompts) || !Array.isArray(input.entries)) throw Error('Unsupported admission manifest.');
  const prompts=new Map(), ids=new Set();
  for(const p of input.prompts) {
    if(!idPattern.test(p.id) || prompts.has(p.id) || typeof p.title!=='string' || !p.title || typeof p.text!=='string' || !p.text || !hashPattern.test(p.sha256)) throw Error('Invalid canonical prompt record.');
    prompts.set(p.id,Object.freeze({...p}));
  }
  const entries=input.entries.map(e=>{
    const p=prompts.get(e.promptId);
    if(!idPattern.test(e.id) || ids.has(e.id) || !p || e.promptSha256!==p.sha256) throw Error('Entry does not match its canonical prompt.');
    ids.add(e.id);
    if(!['verified','pending','withheld','invalid'].includes(e.admission?.status)) throw Error('Missing admission status.');
    if(e.admission.status==='verified') {
      if(e.admission.frozen!==true || e.admission.selfContained!==true || !safeAssetPath(e.asset?.path) ||
         !hashPattern.test(e.asset?.sha256) || !Number.isInteger(e.asset?.byteLength) || e.asset.byteLength<20 || e.asset.byteLength>LIMITS.bytes ||
         typeof e.provenance?.modelLabel!=='string' || !e.provenance.modelLabel.trim()) throw Error('Incomplete verified entry record.');
    }
    return Object.freeze({...e});
  });
  return Object.freeze({version:1,prompts:[...prompts.values()],entries});
}
export function eligiblePairs(manifest,promptId) {
  const entries=manifest.entries.filter(e=>e.promptId===promptId && e.admission.status==='verified');
  const pairs=[];
  for(let i=0;i<entries.length;i++) for(let j=i+1;j<entries.length;j++) {
    if(entries[i].id!==entries[j].id && entries[i].promptSha256===entries[j].promptSha256) pairs.push([entries[i],entries[j]]);
  }
  return pairs;
}
export function choosePair(manifest,promptId,previous=null,random=Math.random) {
  const pairs=eligiblePairs(manifest,promptId);
  if(!pairs.length) return null;
  const signature=p=>p.map(e=>e.id).sort().join('|');
  const candidates=pairs.filter(p=>signature(p)!==previous);
  const pool=candidates.length?candidates:pairs;
  const index=Math.min(pool.length-1,Math.max(0,Math.floor(random()*pool.length)));
  const pair=pool[index];
  return random()<.5?[...pair]:[pair[1],pair[0]];
}
export function chooseComparison(manifest,previous=null,random=Math.random) {
  const options=manifest.prompts.map(prompt=>({promptId:prompt.id,pairs:eligiblePairs(manifest,prompt.id)})).filter(option=>option.pairs.length);
  const alternatives=options.map(option=>({...option,pairs:option.pairs.filter(pair=>pair.map(entry=>entry.id).sort().join('|')!==previous)})).filter(option=>option.pairs.length);
  const pool=alternatives.length?alternatives:options;if(!pool.length)return null;
  const pick=items=>items[Math.min(items.length-1,Math.max(0,Math.floor(random()*items.length)))];
  // Choose the prompt first so extra attempts cannot give it extra weight.
  const option=pick(pool),pair=pick(option.pairs);
  return {promptId:option.promptId,pair:random()<.5?[...pair]:[pair[1],pair[0]]};
}
export const DEFAULT_CAMERA=Object.freeze({yaw:0,pitch:.12,distance:3.6,targetY:0});
export function clampCamera(value) {
  const result={...DEFAULT_CAMERA,...value};
  for(const k of Object.keys(DEFAULT_CAMERA)) if(!Number.isFinite(result[k])) result[k]=DEFAULT_CAMERA[k];
  result.pitch=Math.max(-1.35,Math.min(1.35,result.pitch));
  result.distance=Math.max(1.15,Math.min(8,result.distance));
  result.targetY=Math.max(-.8,Math.min(.8,result.targetY));
  return result;
}
export function createComparisonState(pair=null) {
  let current=pair, generation=0, choice=null, ready=[false,false], linked=true, active=0;
  let cameras=[{...DEFAULT_CAMERA},{...DEFAULT_CAMERA}];
  const isValidPair=()=>current?.length===2 && current[0].id!==current[1].id && current[0].promptId===current[1].promptId &&
    current[0].promptSha256===current[1].promptSha256 && current.every(e=>e.admission?.status==='verified');
  return {
    get snapshot(){return {pair:current,generation,choice,ready:[...ready],linked,active,cameras:cameras.map(c=>({...c})),revealed:choice!==null,canVote:!!isValidPair()&&ready.every(Boolean)&&choice===null};},
    setPair(pair){current=pair;generation++;choice=null;ready=[false,false];linked=true;active=0;cameras=[{...DEFAULT_CAMERA},{...DEFAULT_CAMERA}];return generation;},
    swap(){if(!isValidPair()||choice!==null)return false;this.setPair([current[1],current[0]]);return true;},
    setReady(side,value,token=generation){if(token===generation && [0,1].includes(side)) ready[side]=!!value;},
    setActive(side){if([0,1].includes(side))active=side;},
    setLinked(value){linked=!!value;if(linked)cameras=[{...cameras[active]},{...cameras[active]}];},
    setCamera(side,value){if(![0,1].includes(side))return;cameras[side]=clampCamera(value);active=side;if(linked)cameras[1-side]={...cameras[side]};},
    reset(){cameras=[{...DEFAULT_CAMERA},{...DEFAULT_CAMERA}];},
    vote(value){if(!['a','b','tie'].includes(value)||!this.snapshot.canVote)return false;choice=value;return true;},
    revise(value){if(!['a','b','tie'].includes(value)||choice===null||!ready.every(Boolean))return false;choice=value;return true;},
    label(side){if(!current?.[side])return 'Attempt '+(side?'B':'A');return choice===null?'Attempt '+(side?'B':'A'):current[side].provenance.modelLabel;}
  };
}
export function validateGLB(buffer) {
  if(!(buffer instanceof ArrayBuffer) || buffer.byteLength<20 || buffer.byteLength>LIMITS.bytes) throw Error('GLB exceeds the supported size limit or is empty.');
  const view=new DataView(buffer);
  if(view.getUint32(0,true)!==0x46546c67 || view.getUint32(4,true)!==2 || view.getUint32(8,true)!==buffer.byteLength) throw Error('Expected a complete glTF 2 GLB.');
  let offset=12, json=null, binaryBytes=0, binaryOffset=0, chunks=0;
  while(offset<buffer.byteLength) {
    if(offset+8>buffer.byteLength)throw Error('Truncated GLB chunk.');
    const length=view.getUint32(offset,true),type=view.getUint32(offset+4,true);offset+=8;
    if(length%4 || offset+length>buffer.byteLength)throw Error('Invalid GLB chunk length.');
    if(chunks===0 && type!==0x4e4f534a)throw Error('GLB JSON must be the first chunk.');
    if(type===0x4e4f534a) {
      if(json)throw Error('Duplicate GLB JSON.');
      json=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(new Uint8Array(buffer,offset,length)));
    } else if(type===0x004e4942) {
      if(binaryBytes)throw Error('Duplicate GLB binary buffer.');
      binaryBytes=length;binaryOffset=offset;
    } else throw Error('Unsupported GLB chunk.');
    offset+=length;chunks++;
  }
  if(json?.asset?.version!=='2.0' || !Array.isArray(json.scenes) || json.scenes.length!==1 || !json.nodes?.length || !json.meshes?.length) throw Error('Expected one static character scene.');
  if(json.scene!==undefined && json.scene!==0)throw Error('Invalid default scene.');
  if(json.nodes.length>LIMITS.nodes)throw Error('Character exceeds the node budget.');
  const parents=new Map();
  for(let index=0;index<json.nodes.length;index++) {
    const node=json.nodes[index];
    if(node.mesh!==undefined && !json.meshes[node.mesh])throw Error('Invalid scene mesh reference.');
    for(const child of node.children||[]) {
      if(!Number.isInteger(child)||!json.nodes[child]||parents.has(child))throw Error('Invalid or repeated child node.');
      parents.set(child,index);
    }
    for(const [key,length] of [['translation',3],['rotation',4],['scale',3],['matrix',16]])if(node[key]!==undefined && (!Array.isArray(node[key])||node[key].length!==length||!node[key].every(n=>Number.isFinite(n)&&Math.abs(n)<=1e8)))throw Error('Invalid scene transform.');
  }
  for(let index=0;index<json.nodes.length;index++) {
    const chain=new Set();let cursor=index;
    while(cursor!==undefined){if(chain.has(cursor)||chain.size>=64)throw Error('Cyclic or excessive scene hierarchy.');chain.add(cursor);cursor=parents.get(cursor);}
  }
  for(const root of json.scenes[0].nodes||[])if(!Number.isInteger(root)||!json.nodes[root]||parents.has(root))throw Error('Invalid scene root.');
  if(!json.buffers?.length)throw Error('Missing embedded buffers.');
  const dataBytes=(uri,mimes)=>{
    if(typeof uri!=='string')throw Error('Missing embedded data URI.');
    const match=uri.match(/^data:([a-z0-9/+.-]+);base64,([A-Za-z0-9+/]*={0,2})$/);
    if(!match || !mimes.includes(match[1]) || !match[2].length || match[2].length%4)throw Error('Only embedded base64 data is supported.');
    return match[2].length/4*3-(match[2].endsWith('==')?2:match[2].endsWith('=')?1:0);
  };
  let totalBytes=0;
  const sizes=json.buffers.map((b,index)=>{
    if(!Number.isInteger(b.byteLength)||b.byteLength<1)throw Error('Invalid embedded buffer length.');
    const size=b.uri===undefined?(index===0?binaryBytes:0):dataBytes(b.uri,['application/octet-stream','application/gltf-buffer']);
    if(size<b.byteLength || (b.uri===undefined?size-b.byteLength>3:size!==b.byteLength))throw Error('Embedded buffer does not match its declared length.');
    totalBytes+=b.byteLength;return b.byteLength;
  });
  if(totalBytes>LIMITS.bytes)throw Error('Embedded data exceeds the import budget.');
  const decodedBuffers=new Map();
  const decodeURI=uri=>Uint8Array.from(atob(uri.slice(uri.indexOf(',')+1)),char=>char.charCodeAt(0));
  const imageSize=(bytes,mime)=>{
    const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
    if(mime==='image/png') {
      if(bytes.length<33||view.getUint32(0)!==0x89504e47||view.getUint32(4)!==0x0d0a1a0a||view.getUint32(8)!==13||view.getUint32(12)!==0x49484452)throw Error('Invalid embedded PNG header.');
      return [view.getUint32(16),view.getUint32(20)];
    }
    if(bytes.length<4||view.getUint16(0)!==0xffd8)throw Error('Invalid embedded JPEG header.');
    let cursor=2;
    while(cursor+4<=bytes.length){if(bytes[cursor++]!==255)throw Error('Invalid embedded JPEG marker.');while(bytes[cursor]===255)cursor++;
      const marker=bytes[cursor++];if(marker===0xda||marker===0xd9)break;if(marker===1||(marker>=0xd0&&marker<=0xd7))continue;
      if(cursor+2>bytes.length)break;const length=view.getUint16(cursor);if(length<2||cursor+length>bytes.length)throw Error('Truncated embedded JPEG.');
      if([0xc0,0xc1,0xc2].includes(marker)){if(length<8)throw Error('Truncated JPEG frame.');return [view.getUint16(cursor+5),view.getUint16(cursor+3)];}cursor+=length;
    }
    throw Error('Unsupported embedded JPEG dimensions.');
  };
  let imagePixels=0;const imageDimensions=[];
  if((json.images?.length||0)>32)throw Error('Character exceeds the image budget.');
  for(const image of json.images||[]) {
    let bytes,mime=image.mimeType;
    if(image.uri){dataBytes(image.uri,['image/png','image/jpeg']);bytes=decodeURI(image.uri);mime=image.uri.slice(5,image.uri.indexOf(';'));}
    else {const view=json.bufferViews?.[image.bufferView];if(!view||!Number.isInteger(view.buffer)||!json.buffers[view.buffer]||!['image/png','image/jpeg'].includes(mime))throw Error('Textures must be embedded PNG or JPEG.');
      const definition=json.buffers[view.buffer];let raw;
      if(definition.uri){if(!decodedBuffers.has(view.buffer))decodedBuffers.set(view.buffer,decodeURI(definition.uri));raw=decodedBuffers.get(view.buffer);}
      else raw=new Uint8Array(buffer,binaryOffset,binaryBytes);
      bytes=raw.subarray(view.byteOffset??0,(view.byteOffset??0)+view.byteLength);
    }
    const [width,height]=imageSize(bytes,mime);imagePixels+=width*height;
    if(!width||!height||width>LIMITS.imageEdge||height>LIMITS.imageEdge||imagePixels>LIMITS.imagePixels)throw Error('Embedded textures exceed the decode budget.');
    imageDimensions.push([width,height]);
  }
  let texturePixels=0;
  for(const texture of json.textures||[]){const dimensions=imageDimensions[texture.source];if(!dimensions)throw Error('Invalid material texture source.');texturePixels+=dimensions[0]*dimensions[1];}
  if(texturePixels>LIMITS.imagePixels)throw Error('Texture bindings exceed the decode budget.');
  for(const b of json.bufferViews||[]) if(!Number.isInteger(b.buffer) || b.buffer<0 || b.buffer>=sizes.length ||
    !Number.isInteger(b.byteLength) || b.byteLength<0 || !Number.isInteger(b.byteOffset??0) || (b.byteOffset??0)<0 ||
    (b.byteOffset??0)+b.byteLength>sizes[b.buffer]) throw Error('Invalid embedded buffer range.');
  for(const image of json.images||[]) {
    if(image.uri!==undefined) {
      if(image.bufferView!==undefined)throw Error('Texture has two conflicting sources.');
      totalBytes+=dataBytes(image.uri,['image/png','image/jpeg']);
    } else if(!Number.isInteger(image.bufferView)||!json.bufferViews?.[image.bufferView]||!['image/png','image/jpeg'].includes(image.mimeType))throw Error('Textures must be embedded PNG or JPEG.');
  }
  if(totalBytes>LIMITS.bytes)throw Error('Embedded data exceeds the import budget.');
  const unavailable=new Set(['KHR_draco_mesh_compression','EXT_meshopt_compression','KHR_texture_basisu']);
  if((json.extensionsUsed||[]).some(e=>unavailable.has(e)))throw Error('Compressed assets require a decoder that is not enabled here.');
  const supported=new Set(['KHR_materials_unlit','KHR_materials_clearcoat','KHR_materials_sheen','KHR_materials_transmission','KHR_materials_volume','KHR_materials_ior','KHR_materials_specular','KHR_materials_iridescence','KHR_materials_anisotropy','KHR_materials_dispersion','KHR_materials_emissive_strength','KHR_texture_transform','KHR_mesh_quantization','KHR_lights_punctual']);
  if([...(json.extensionsRequired||[]),...(json.extensionsUsed||[])].some(e=>!supported.has(e)))throw Error('A required glTF extension is not supported by this viewer.');
  const widths={5120:1,5121:1,5122:2,5123:2,5125:4,5126:4},components={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT4:16};
  let allocatedBytes=0;
  for(const accessor of json.accessors||[]) {
    const size=widths[accessor.componentType]*components[accessor.type];
    if(!size||!Number.isInteger(accessor.count)||accessor.count<1||accessor.sparse)throw Error('Invalid or unsupported accessor.');
    allocatedBytes+=accessor.count*size;if(allocatedBytes>LIMITS.accessorBytes)throw Error('Accessor allocation exceeds the import budget.');
    if(accessor.bufferView!==undefined) {
      const view=json.bufferViews?.[accessor.bufferView],start=accessor.byteOffset??0,stride=view?.byteStride??size;
      if(!view||!Number.isInteger(start)||start<0||!Number.isInteger(stride)||stride<size||stride>252||start+(accessor.count-1)*stride+size>view.byteLength)throw Error('Accessor is outside its embedded buffer range.');
    }
  }
  let vertices=0;
  if(json.meshes.length>LIMITS.meshes)throw Error('Character exceeds the mesh budget.');
  for(const mesh of json.meshes)for(const primitive of mesh.primitives||[]) {
    if(primitive.mode!==undefined && ![4,5,6].includes(primitive.mode))throw Error('Only triangle meshes, strips and fans are supported.');
    const accessor=json.accessors?.[primitive.attributes?.POSITION];
    if(!accessor || !Number.isInteger(accessor.count) || accessor.count<1 || accessor.type!=='VEC3')throw Error('Missing character geometry.');
    vertices+=accessor.count;
  }
  if(vertices>LIMITS.vertices)throw Error('Character exceeds the vertex budget.');
  let displayedVertices=0,displayedPrimitives=0;const seen=new Set(),pending=[...(json.scenes[0].nodes||[])];
  while(pending.length){const index=pending.pop();if(seen.has(index))throw Error('Repeated scene root.');seen.add(index);const node=json.nodes[index];
    if(node.mesh!==undefined)for(const primitive of json.meshes[node.mesh].primitives){displayedPrimitives++;displayedVertices+=json.accessors[primitive.attributes.POSITION].count;}
    pending.push(...(node.children||[]));
  }
  if(!displayedPrimitives||displayedPrimitives>LIMITS.meshes||displayedVertices>LIMITS.vertices)throw Error('Displayed character exceeds the geometry budget or has no visible meshes.');
  return {json,vertices,meshes:json.meshes.length};
}
export function createLoadSlot({load,attach,dispose}) {
  let serial=0,controller=null,current=null,closed=false;
  return {
    async open(entry) {
      if(closed)return false;
      const token=++serial;controller?.abort();controller=new AbortController();
      const signal=controller.signal;
      if(current){dispose(current);current=null;}
      let value;
      try {
        value=await load(entry,signal);
        if(closed||token!==serial||signal.aborted){dispose(value);return false;}
        attach(value);current=value;return true;
      } catch(error) {
        if(value && value!==current)dispose(value);
        if(closed||token!==serial||signal.aborted)return false;
        throw error;
      }
    },
    clear(){serial++;controller?.abort();if(current)dispose(current);current=null;},
    close(){closed=true;this.clear();}
  };
}
