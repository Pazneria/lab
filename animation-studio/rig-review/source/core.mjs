/** Offline glTF review core. No DOM, renderer, network or mutable shared pose state. */
export const LIMITS = Object.freeze({bytes:64*1024*1024,vertices:100000,frames:30000,nodes:1024,clips:128,tracks:256,totalTracks:1024,accessors:2048,accessorValues:2000000,animationValues:2000000,primitives:64,skins:64,skinJoints:8192});
const fail = message => { throw new Error(message); };
const check = (condition,message) => { if(!condition) fail(message); };
export const clamp = (x,a,b) => Math.max(a,Math.min(b,x));
export const identity = () => [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
export const mul = (a,b) => Array.from({length:16},(_,i)=>{const r=i%4,c=i>>2;return a[r]*b[c*4]+a[r+4]*b[c*4+1]+a[r+8]*b[c*4+2]+a[r+12]*b[c*4+3];});
export const point = (m,p) => [0,1,2].map(r=>m[r]*p[0]+m[r+4]*p[1]+m[r+8]*p[2]+m[r+12]);
const vector = (m,p) => [0,1,2].map(r=>m[r]*p[0]+m[r+4]*p[1]+m[r+8]*p[2]);
export const unit = v => {const n=Math.hypot(...v);return n>1e-12?v.map(x=>x/n):v.map(()=>0);};
const finiteVector = (v,n,label) => {check(Array.isArray(v)&&v.length===n&&v.every(Number.isFinite),label+' must have '+n+' finite components');return v.slice();};
export const qmul = (a,b) => {const [x,y,z,w]=a,[X,Y,Z,W]=b;return [w*X+x*W+y*Z-z*Y,w*Y-x*Z+y*W+z*X,w*Z+x*Y-y*X+z*W,w*W-x*X-y*Y-z*Z];};
export function euler(degrees){const [x,y,z]=degrees.map(a=>a*Math.PI/360);return qmul(qmul([0,0,Math.sin(z),Math.cos(z)],[0,Math.sin(y),0,Math.cos(y)]),[Math.sin(x),0,0,Math.cos(x)]);}
export function quaternionEuler(q){const [x,y,z,w]=q;return [Math.atan2(2*(w*x+y*z),1-2*(x*x+y*y)),Math.asin(clamp(2*(w*y-z*x),-1,1)),Math.atan2(2*(w*z+x*y),1-2*(y*y+z*z))].map(v=>v*180/Math.PI);}
export function trs(p=[0,0,0],q=[0,0,0,1],s=[1,1,1]){
 const [x,y,z,w]=q;
 return [(1-2*y*y-2*z*z)*s[0],(2*x*y+2*z*w)*s[0],(2*x*z-2*y*w)*s[0],0,
 (2*x*y-2*z*w)*s[1],(1-2*x*x-2*z*z)*s[1],(2*y*z+2*x*w)*s[1],0,
 (2*x*z+2*y*w)*s[2],(2*y*z-2*x*w)*s[2],(1-2*x*x-2*y*y)*s[2],0,...p,1];
}
export function inverse(m){
 const a=Array.from({length:4},(_,r)=>[...Array.from({length:4},(_,c)=>m[r+c*4]),...Array.from({length:4},(_,c)=>r===c?1:0)]);
 for(let c=0;c<4;c++){let pivot=c;for(let r=c+1;r<4;r++)if(Math.abs(a[r][c])>Math.abs(a[pivot][c]))pivot=r;
 check(Math.abs(a[pivot][c])>1e-12,'Singular transform');[a[c],a[pivot]]=[a[pivot],a[c]];const div=a[c][c];a[c]=a[c].map(v=>v/div);
 for(let r=0;r<4;r++)if(r!==c){const k=a[r][c];a[r]=a[r].map((v,i)=>v-k*a[c][i]);}}
 return Array.from({length:16},(_,i)=>a[i%4][4+(i>>2)]);
}
function normalMatrix(m){const v=inverse(m);return [v[0],v[4],v[8],0,v[1],v[5],v[9],0,v[2],v[6],v[10],0,0,0,0,1];}
export function slerp(a,b,t){
 let d=a.reduce((s,v,i)=>s+v*b[i],0);if(d<0){b=b.map(v=>-v);d=-d;}
 if(d>.9995)return unit(a.map((v,i)=>v+(b[i]-v)*t));
 const theta=Math.acos(clamp(d,-1,1)),sin=Math.sin(theta);
 return a.map((v,i)=>(Math.sin((1-t)*theta)*v+Math.sin(t*theta)*b[i])/sin);
}
const TYPES={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT4:16};
const COMPONENTS={5120:[1,'getInt8',127],5121:[1,'getUint8',255],5122:[2,'getInt16',32767],5123:[2,'getUint16',65535],5125:[4,'getUint32',4294967295],5126:[4,'getFloat32',1]};
export function parseGlb(input,label='Imported GLB'){
 const bytes=input instanceof Uint8Array?input:new Uint8Array(input);
 check(bytes.byteLength>=20&&bytes.byteLength<=LIMITS.bytes,'GLB must be 20 bytes to 64 MiB');
 const d=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
 check(d.getUint32(0,true)===0x46546c67&&d.getUint32(4,true)===2,'Only glTF 2 binary files are supported');
 check(d.getUint32(8,true)===bytes.byteLength,'GLB declared length does not match file');
 let gltf=null,binary=null,offset=12;
 while(offset<bytes.length){check(offset+8<=bytes.length,'Truncated GLB chunk');const len=d.getUint32(offset,true),kind=d.getUint32(offset+4,true);offset+=8;
 check(len%4===0&&offset+len<=bytes.length,'Invalid GLB chunk bounds');
 const chunk=bytes.subarray(offset,offset+len);
 if(kind===0x4e4f534a){check(!gltf&&offset===20,'GLB JSON must be first and unique');gltf=JSON.parse(new TextDecoder().decode(chunk));}
 else if(kind===0x004e4942){check(!binary,'Multiple GLB binary chunks');binary=chunk;}
 offset+=len;}
 check(gltf?.asset?.version==='2.0','Missing glTF 2.0 asset');
 check(!(gltf.extensionsRequired?.length),'Required extensions are unsupported: '+(gltf.extensionsRequired||[]).join(', '));
 check(!(gltf.images?.length)&&!(gltf.textures?.length),'Textured assets need another adapter; this offline viewer accepts vertex colors');
 check((gltf.buffers||[]).length<=1&&!(gltf.buffers||[]).some(b=>b.uri),'External buffers are unsupported; use embedded GLB');
 binary=binary||new Uint8Array();
 check(!(gltf.buffers?.[0])||gltf.buffers[0].byteLength<=binary.length,'Missing binary buffer');
 check((gltf.nodes||[]).length<=LIMITS.nodes,'Too many nodes');
 check((gltf.accessors||[]).length<=LIMITS.accessors,'Too many accessors');
 let declaredValues=0,declaredTracks=0;for(const a of gltf.accessors||[]){const size=TYPES[a.type];check(size&&Number.isInteger(a.count)&&a.count>=0,'Invalid accessor declaration');declaredValues+=a.count*size;check(declaredValues<=LIMITS.accessorValues,'Aggregate accessor value budget exceeded');}
 check((gltf.animations||[]).length<=LIMITS.clips,'Too many clips');
 for(const a of gltf.animations||[]){declaredTracks+=(a.channels||[]).length;check((a.channels||[]).length<=LIMITS.tracks&&declaredTracks<=LIMITS.totalTracks,'Aggregate animation track budget exceeded');}
 const binView=new DataView(binary.buffer,binary.byteOffset,binary.byteLength),cache=new Map();
 function arrayAt(viewId,byteOffset,count,size,component,strideOverride){
  const v=gltf.bufferViews?.[viewId];check(v&&v.buffer===0,'Invalid accessor buffer view');
  const info=COMPONENTS[component];check(info,'Unsupported accessor component');
  const [width,method]=info,packed=size*width,stride=strideOverride??v.byteStride??packed;
  check(Number.isInteger(count)&&count>=0&&count<=LIMITS.vertices*16&&Number.isInteger(byteOffset)&&byteOffset>=0,'Invalid accessor count/offset');
  check(Number.isInteger(stride)&&stride>=packed&&stride%width===0,'Invalid accessor stride');
  const start=(v.byteOffset||0)+byteOffset,end=count?start+(count-1)*stride+packed:start;
  check(start>=0&&end<=(v.byteOffset||0)+v.byteLength&&end<=binary.length,'Accessor exceeds buffer bounds');
  const out=new Float64Array(count*size);
  for(let i=0;i<count;i++)for(let c=0;c<size;c++){const value=binView[method](start+i*stride+c*width,true);check(Number.isFinite(value),'Non-finite accessor');out[i*size+c]=value;}
  return out;
 }
 function accessor(id){
  if(cache.has(id))return cache.get(id);
  const a=gltf.accessors?.[id],size=TYPES[a?.type];check(a&&size,'Invalid or unsupported accessor type');
  check(Number.isInteger(a.count)&&a.count>=0&&a.count<=LIMITS.vertices*16,'Invalid accessor size');
  let out=a.bufferView===undefined?new Float64Array(a.count*size):arrayAt(a.bufferView,a.byteOffset||0,a.count,size,a.componentType);
  if(a.sparse){const sp=a.sparse;check(Number.isInteger(sp.count)&&sp.count<=a.count&&sp.count>=0,'Invalid sparse count');
   check([5121,5123,5125].includes(sp.indices.componentType),'Invalid sparse index type');
   const ids=arrayAt(sp.indices.bufferView,sp.indices.byteOffset||0,sp.count,1,sp.indices.componentType);
   const vals=arrayAt(sp.values.bufferView,sp.values.byteOffset||0,sp.count,size,a.componentType);
   let prior=-1;for(let i=0;i<ids.length;i++){check(ids[i]>prior&&ids[i]<a.count,'Sparse indices must increase');prior=ids[i];out.set(vals.subarray(i*size,(i+1)*size),ids[i]*size);}}
  if(a.normalized&&a.componentType!==5126){const max=COMPONENTS[a.componentType]?.[2];check(max,'Unsupported normalized component');out=out.map(v=>Math.max(a.componentType===5120||a.componentType===5122?-1:0,v/max));}
  cache.set(id,out);return out;
 }
 for(const n of gltf.nodes||[]){
  const q=n.rotation||[0,0,0,1];finiteVector(q,4,'Node rotation');check(Math.abs(Math.hypot(...q)-1)<.005,'Node rotation must be a unit quaternion');
  check((n.weights||[]).every(Number.isFinite),'Node morph weights must be finite');
  if(n.matrix)check(!n.translation&&!n.rotation&&!n.scale,'Node cannot mix matrix and TRS');
 }
 const nodes=(gltf.nodes||[]).map((n,i)=>({name:n.name||'node_'+i,parent:-1,
 position:finiteVector(n.translation||[0,0,0],3,'Node position'),rotation:unit(finiteVector(n.rotation||[0,0,0,1],4,'Node rotation')),
 scale:finiteVector(n.scale||[1,1,1],3,'Node scale'),matrix:n.matrix?finiteVector(n.matrix,16,'Node matrix'):null,
 weights:(n.weights||gltf.meshes?.[n.mesh]?.weights||[]).slice(),mesh:n.mesh,skin:n.skin}));
 gltf.nodes?.forEach((n,i)=>{for(const child of n.children||[]){check(nodes[child]&&child!==i&&nodes[child].parent===-1,'Invalid/multiply parented node');nodes[child].parent=i;}});
 const names=new Map();nodes.forEach((n,i)=>{if(!names.has(n.name))names.set(n.name,i);});
 check((gltf.skins||[]).length<=LIMITS.skins,'Aggregate skin count budget exceeded');
 let totalSkinJoints=0;for(const s of gltf.skins||[]){check(Array.isArray(s.joints),'Invalid skin joint list');totalSkinJoints+=s.joints.length;check(totalSkinJoints<=LIMITS.skinJoints,'Aggregate skin palette budget exceeded');}
 const skins=(gltf.skins||[]).map(s=>{check(s.joints?.length&&s.joints.every(i=>Number.isInteger(i)&&nodes[i])&&new Set(s.joints).size===s.joints.length,'Invalid or duplicate skin joints');
 if(s.inverseBindMatrices!==undefined)check(gltf.accessors?.[s.inverseBindMatrices]?.type==='MAT4'&&gltf.accessors[s.inverseBindMatrices].componentType===5126&&gltf.accessors[s.inverseBindMatrices].count===s.joints.length,'Inverse bind accessor must be FLOAT MAT4 per joint');
 const ib=s.inverseBindMatrices===undefined?s.joints.flatMap(identity):Array.from(accessor(s.inverseBindMatrices));
 check(ib.length===s.joints.length*16,'Inverse bind matrix count mismatch');return {joints:s.joints.slice(),inverseBind:ib};});
 const scene=gltf.scenes?.[gltf.scene??0];check(scene&&Array.isArray(scene.nodes),'Missing default scene');
 const active=new Set(),visiting=new Set();
 function visit(i){check(nodes[i],'Invalid scene node');check(!visiting.has(i),'Cyclic node hierarchy');if(active.has(i))return;visiting.add(i);active.add(i);for(const c of gltf.nodes[i].children||[])visit(c);visiting.delete(i);}
 scene.nodes.forEach(visit);
 const primitives=[];let totalVertices=0;
 nodes.forEach((n,nodeId)=>{if(n.mesh===undefined||!active.has(nodeId))return;
 const mesh=gltf.meshes?.[n.mesh];check(mesh,'Missing node mesh');check((mesh.weights||[]).every(Number.isFinite),'Mesh morph weights must be finite');
 for(const pr of mesh.primitives||[]){
  check(primitives.length<LIMITS.primitives,'Aggregate primitive budget exceeded');
  check((pr.mode??4)===4,'Only triangle primitives are supported');
  check(!pr.extensions?.KHR_draco_mesh_compression,'Compressed geometry is unsupported');
  check(pr.attributes?.POSITION!==undefined,'Missing POSITION');
  totalVertices+=gltf.accessors?.[pr.attributes.POSITION]?.count||0;check(totalVertices<=LIMITS.vertices,'Aggregate vertex budget exceeded');
  const positions=accessor(pr.attributes.POSITION),count=positions.length/3;
  check(gltf.accessors[pr.attributes.POSITION].type==='VEC3'&&count<=LIMITS.vertices&&count>0,'Invalid vertex positions');
  const indices=pr.indices===undefined?Array.from({length:count},(_,i)=>i):Array.from(accessor(pr.indices));
  check(indices.length%3===0&&indices.length<=LIMITS.vertices*12&&indices.every(v=>Number.isInteger(v)&&v>=0&&v<count),'Invalid triangle indices');
  let normals=pr.attributes.NORMAL===undefined?null:accessor(pr.attributes.NORMAL);
  check(!normals||normals.length===positions.length,'Normal count mismatch');
  if(!normals){normals=new Float64Array(positions.length);for(let i=0;i<indices.length;i+=3){const [a,b,c]=indices.slice(i,i+3).map(v=>Array.from(positions.subarray(v*3,v*3+3)));
   const u=b.map((v,k)=>v-a[k]),v=c.map((x,k)=>x-a[k]),normal=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
   for(const ix of indices.slice(i,i+3))for(let k=0;k<3;k++)normals[ix*3+k]+=normal[k];}}
  const material=gltf.materials?.[pr.material]||{},base=material.pbrMetallicRoughness?.baseColorFactor||[1,1,1,1];
  check((material.alphaMode||'OPAQUE')==='OPAQUE'&&base[3]===1,'Only opaque matte surfaces are supported');
  const color=pr.attributes.COLOR_0===undefined?null:accessor(pr.attributes.COLOR_0),components=color?TYPES[gltf.accessors[pr.attributes.COLOR_0].type]:3;
  check(!color||(components===3||components===4)&&color.length===count*components,'Color count mismatch');
  const colors=new Float32Array(count*3);for(let i=0;i<count;i++)for(let k=0;k<3;k++)colors[i*3+k]=(color?color[i*components+k]:1)*base[k];
  const joints=pr.attributes.JOINTS_0===undefined?null:accessor(pr.attributes.JOINTS_0),weights=pr.attributes.WEIGHTS_0===undefined?null:accessor(pr.attributes.WEIGHTS_0);
  check(!(pr.attributes.JOINTS_1!==undefined||pr.attributes.WEIGHTS_1!==undefined),'More than four influences need another adapter');
  if(n.skin!==undefined){check(skins[n.skin]&&joints?.length===count*4&&weights?.length===count*4,'Missing or invalid skin attributes');
   for(let i=0;i<count;i++){let sum=0;for(let k=0;k<4;k++){const j=joints[i*4+k],w=weights[i*4+k];check(Number.isInteger(j)&&j>=0&&j<skins[n.skin].joints.length&&w>=0,'Invalid skin influence');sum+=w;}check(Math.abs(sum-1)<.005,'Skin weights must sum to one');}}
  check(Array.isArray(pr.targets||[])&&(pr.targets||[]).length<=16,'Too many or invalid morph targets');
  const targets=(pr.targets||[]).map(t=>{const p=t.POSITION===undefined?new Float64Array(positions.length):accessor(t.POSITION),nn=t.NORMAL===undefined?new Float64Array(positions.length):accessor(t.NORMAL);check(p.length===positions.length&&nn.length===positions.length,'Morph count mismatch');return {positions:p,normals:nn};});
  const groups=mesh.extras?.faceGroups||null;
  if(groups)check(Object.values(groups).every(ids=>Array.isArray(ids)&&ids.every(i=>Number.isInteger(i)&&i>=0&&i<indices.length/3)),'Invalid face region metadata');
  primitives.push({nodeId,positions,normals,colors,indices,joints,weights,targets,doubleSided:!!material.doubleSided,faceGroups:groups});
 }});
 check(primitives.length>0&&primitives.length<=64&&primitives.reduce((s,p)=>s+p.positions.length/3,0)<=LIMITS.vertices,'No supported mesh or total geometry exceeds limit');
 const model={label,nodes,names,skins,primitives,clips:[],gltf,active};
 // Evaluating rest traverses every parent chain and rejects cycles outside scene too.
 poseAt(model,null,0);
 let animationValues=0;
 model.clips=(gltf.animations||[]).map((animation,ci)=>{
  check((animation.channels||[]).length<=LIMITS.tracks,'Too many animation tracks');
  const targets=new Set(),tracks=animation.channels.map(ch=>{
   const sampler=animation.samplers?.[ch.sampler],id=ch.target?.node,path=ch.target?.path;check(sampler&&nodes[id]&&['rotation','translation','scale','weights'].includes(path),'Invalid animation target');
   check(!nodes[id].matrix,'Animation cannot target matrix node');
   const targetKey=id+'/'+path;check(!targets.has(targetKey),'Duplicate animation channel target');targets.add(targetKey);
   animationValues+=(gltf.accessors?.[sampler.input]?.count||0)+(gltf.accessors?.[sampler.output]?.count||0)*(TYPES[gltf.accessors?.[sampler.output]?.type]||0);check(animationValues<=LIMITS.animationValues,'Aggregate animation sample value budget exceeded');
   const times=Array.from(accessor(sampler.input)),raw=Array.from(accessor(sampler.output)),mode=sampler.interpolation||'LINEAR';
   const size=path==='weights'?nodes[id].weights.length||gltf.meshes?.[nodes[id].mesh]?.primitives?.[0]?.targets?.length:path==='rotation'?4:3;
   check(size&&['LINEAR','STEP','CUBICSPLINE'].includes(mode),'Unsupported animation interpolation/target');
   validateTimes(times);
   const multiple=mode==='CUBICSPLINE'?3:1;check(raw.length===times.length*size*multiple,'Animation sample count mismatch');
   return {nodeId:id,node:nodes[id].name,path,times,values:Array.from({length:times.length*multiple},(_,i)=>raw.slice(i*size,(i+1)*size)),interpolation:mode};
  });
  return {id:'embedded_'+ci,name:animation.name||'Clip '+(ci+1),duration:tracks.reduce((d,t)=>Math.max(d,t.times.at(-1)),0),tracks,loop:false,contacts:{},provenance:animation.extras?.purpose||'Embedded authored GLB clip'};
 });
 check(model.clips.length<=LIMITS.clips,'Too many clips');return model;
}
function validateTimes(times){check(times.length>0&&times.length<=LIMITS.frames&&times.every((t,i)=>Number.isFinite(t)&&t>=0&&(i===0||t>times[i-1])),'Times must be finite, nonnegative and strictly increasing');}
export function sampleTrack(track,time){
 const {times,values,interpolation}=track,n=times.length;
 let i=0;while(i<n-1&&times[i+1]<=time)i++;
 const central=index=>values[interpolation==='CUBICSPLINE'?index*3+1:index];
 if(i===n-1||time<=times[0])return central(time<=times[0]?0:i).slice();
 const dt=times[i+1]-times[i],u=(time-times[i])/dt,a=central(i),b=central(i+1);
 if(interpolation==='STEP')return a.slice();
 if(interpolation==='CUBICSPLINE'){const u2=u*u,u3=u2*u,out=a.map((v,k)=>(2*u3-3*u2+1)*v+(u3-2*u2+u)*dt*values[i*3+2][k]+(-2*u3+3*u2)*b[k]+(u3-u2)*dt*values[(i+1)*3][k]);return track.path==='rotation'?unit(out):out;}
 return track.path==='rotation'?slerp(a,b,u):a.map((v,k)=>v+(b[k]-v)*u);
}
export function poseAt(model,clip,time,overrides={}){
 const nodes=model.nodes.map(n=>({position:n.position.slice(),rotation:n.rotation.slice(),scale:n.scale.slice(),weights:n.weights.slice()}));
 if(clip)for(const track of clip.tracks){check(nodes[track.nodeId],'Clip target does not exist');const prop=track.path==='translation'?'position':track.path;nodes[track.nodeId][prop]=sampleTrack(track,clamp(time,0,clip.duration));}
 for(const [name,q] of Object.entries(overrides)){const id=model.names.get(name);check(id!==undefined,'Unknown pose override joint');nodes[id].rotation=q.slice();}
 const world=[],visiting=new Set();
 function transform(i){if(world[i])return world[i];check(!visiting.has(i),'Cyclic hierarchy');visiting.add(i);const n=model.nodes[i],local=n.matrix||trs(nodes[i].position,nodes[i].rotation,nodes[i].scale);world[i]=n.parent>=0?mul(transform(n.parent),local):local;visiting.delete(i);return world[i];}
 for(let i=0;i<nodes.length;i++)transform(i);
 return {nodes,world};
}
export function filteredIndices(primitive,hiddenParts=[]){
 if(!hiddenParts.length)return primitive.indices;
 check(primitive.faceGroups,'Region metadata missing; cannot safely replace parts');
 const hidden=new Set(hiddenParts.flatMap(p=>primitive.faceGroups[p]||[]));
 return primitive.indices.filter((_,i)=>!hidden.has(Math.floor(i/3)));
}
export function deform(model,pose,{hiddenParts=[],mount=identity()}={}){
 return model.primitives.map(pr=>{
  const n=model.nodes[pr.nodeId],state=pose.nodes[pr.nodeId],skin=n.skin===undefined?null:model.skins[n.skin];
  const matrices=skin?skin.joints.map((id,i)=>mul(mount,mul(pose.world[id],skin.inverseBind.slice(i*16,(i+1)*16)))):[mul(mount,pose.world[pr.nodeId])];
  const normals=matrices.map(normalMatrix),positions=new Float32Array(pr.positions.length),outNormals=new Float32Array(pr.normals.length);
  for(let i=0;i<positions.length/3;i++){
   const p=Array.from(pr.positions.subarray(i*3,i*3+3)),nn=Array.from(pr.normals.subarray(i*3,i*3+3));
   pr.targets.forEach((t,k)=>{const w=state.weights[k]||0;for(let c=0;c<3;c++){p[c]+=t.positions[i*3+c]*w;nn[c]+=t.normals[i*3+c]*w;}});
   let out=[0,0,0],normal=[0,0,0];for(let k=0;k<(skin?4:1);k++){
    const j=skin?pr.joints[i*4+k]:0,w=skin?pr.weights[i*4+k]:1;if(!w)continue;
    const pp=point(matrices[j],p),vv=vector(normals[j],nn);for(let c=0;c<3;c++){out[c]+=pp[c]*w;normal[c]+=vv[c]*w;}}
   positions.set(out,i*3);outNormals.set(unit(normal),i*3);
  }
  return {positions,normals:outNormals,colors:pr.colors,indices:filteredIndices(pr,pr.faceGroups?hiddenParts:[]),doubleSided:pr.doubleSided};
 });
}
export const REPLACED_HEAD = Object.freeze(['head','nose','mouth','left_eye','right_eye','left_ear','right_ear','hair']);
export function composeReview(model,pose,{refined=false,head=null,hair=null,tool=null,showTool=false}={}){
 const canReplace=refined&&head&&hair&&model.names.has('socket_head')&&model.primitives.some(p=>p.faceGroups);
 const geometry=deform(model,pose,{hiddenParts:canReplace?REPLACED_HEAD:[]});
 if(canReplace){const mount=pose.world[model.names.get('socket_head')];for(const module of [head,hair])geometry.push(...deform(module,poseAt(module,null,0),{mount}));}
 if(showTool&&tool&&model.names.has('socket_right_grip'))geometry.push(...deform(tool,poseAt(tool,null,0),{mount:pose.world[model.names.get('socket_right_grip')]}));
 return {geometry,refined:!!canReplace};
}
export function motionClips(document,model){
 check(document&&Array.isArray(document.clips)&&document.clips.length<=LIMITS.clips,'Motion JSON needs a clips array (maximum 128)');
 const schemaOK=document.schema==='human01-motion/1'||document.schema===undefined&&document.schemaVersion===1;
 const rigId=document.rig??document.rigId;
 check(schemaOK&&rigId==='human01-rig-v1','Expected human01-motion/1 or schemaVersion 1 for human01-rig-v1');
 check(document.rig===undefined||document.rigId===undefined||document.rig===document.rigId,'Conflicting rig identity');
 const jointIds=new Set(model.skins.flatMap(s=>s.joints));check(jointIds.size===20&&model.names.has('pelvis'),'Motion JSON needs the Human01 20-joint rig');
 const names=new Set();let totalMotionTracks=0,totalMotionValues=0;
 return document.clips.map((clip,ci)=>{
  check(typeof clip.name==='string'&&clip.name.length>0&&clip.name.length<=100&&!names.has(clip.name),'Clip names must be unique and nonempty');names.add(clip.name);
  check(Number.isFinite(clip.duration)&&clip.duration>0&&clip.duration<=600,'Clip duration must be >0 and <=600 seconds');
  check(Array.isArray(clip.tracks)&&clip.tracks.length>0&&clip.tracks.length<=LIMITS.tracks,'Invalid clip tracks');
  totalMotionTracks+=clip.tracks.length;check(totalMotionTracks<=LIMITS.totalTracks,'Aggregate motion track budget exceeded');
  const seen=new Set(),tracks=clip.tracks.map(t=>{
   const id=model.names.get(t.node),path=t.property==='position'?'translation':t.property;
   check(id!==undefined&&jointIds.has(id)&&['rotation','translation'].includes(path),'Unknown joint or property: '+t.node+'/'+t.property);
   const key=id+'/'+path;check(!seen.has(key),'Duplicate track target');seen.add(key);
   validateTimes(t.times);check(t.times[t.times.length-1]<=clip.duration+1e-6,'Track extends beyond duration');
   check(Array.isArray(t.values)&&t.values.length===t.times.length,'Track sample count mismatch');
   const size=path==='rotation'?4:3;
   totalMotionValues+=t.times.length*(1+size);check(totalMotionValues<=LIMITS.animationValues,'Aggregate motion value budget exceeded');
   let values=t.values.map(v=>finiteVector(v,size,'Track value'));
   if(path==='rotation'){check(values.every(q=>Math.abs(Math.hypot(...q)-1)<.005),'Rotation samples must be unit quaternions');values=values.map(unit);}
   const positionMode=t.positionMode??document.positionMode;
   if(path==='translation'&&positionMode==='offset')values=values.map(v=>v.map((x,i)=>x+model.nodes[id].position[i]));
   check(positionMode===undefined||['offset','absolute'].includes(positionMode),'Unknown position mode');
   const mode=(t.interpolation||'linear').toUpperCase();check(['LINEAR','STEP'].includes(mode),'Motion JSON supports linear/step');
   return {nodeId:id,node:t.node,path,times:t.times.slice(),values,interpolation:mode};
  });
  const contacts={};for(const side of ['left','right']){contacts[side]=clip.contacts?.[side]||[];check(Array.isArray(contacts[side])&&contacts[side].every(v=>Array.isArray(v)&&v.length===2&&v.every(Number.isFinite)&&v[0]>=0&&v[0]<=v[1]&&v[1]<=clip.duration),'Invalid contact interval');contacts[side]=contacts[side].map(v=>v.slice());}
  return {id:'motion_'+ci,name:clip.name,duration:clip.duration,loop:!!clip.loop,tracks,contacts,provenance:clip.provenance||document.provenance||'Imported authored motion; provenance not supplied'};
 });
}
export function contactAt(clip,time,side){return (clip?.contacts?.[side]||[]).some(([a,b])=>time>=a&&time<b);}
export function footSamples(model,pose){
 const results={};for(const side of ['left','right']){
  const id=model.names.get('foot_'+side);if(id===undefined)continue;
  const base=poseAt(model,null,0).world[id],inv=inverse(base),points=[];
  for(const pr of model.primitives){for(const f of pr.faceGroups?.[side+'_foot']||[])for(const vi of pr.indices.slice(f*3,f*3+3))points.push(Array.from(pr.positions.subarray(vi*3,vi*3+3)));}
  if(!points.length)continue;
  const min=Math.min(...points.map(p=>p[1])),sole=points.filter(p=>p[1]<=min+.001),center=[0,1,2].map(c=>sole.reduce((s,p)=>s+p[c],0)/sole.length);
  const current=point(pose.world[id],point(inv,center));
  const low=Math.min(...sole.map(p=>point(pose.world[id],point(inv,p))[1]));
  results[side]={point:current,clearance:low,bindSole: min};
 }return results;
}
/** Demand-driven scheduler, injected callbacks make suspension CPU-testable. */
export class RenderClock {
 constructor({raf,cancel,now,draw,onStop=()=>{}}){Object.assign(this,{raf,cancel,now,draw,onStop});this.pending=null;this.playing=false;this.last=0;this.active=true;this.lastInput=now();this.frames=0;}
 touch(){this.lastInput=this.now();}
 request(){if(this.active&&this.pending===null)this.pending=this.raf(t=>this.tick(t));}
 play(){this.touch();this.playing=true;this.last=0;this.request();}
 stop(reason='Paused'){this.playing=false;this.last=0;if(this.pending!==null){this.cancel(this.pending);this.pending=null;}this.onStop(reason);}
 suspend(reason='Suspended'){this.active=false;this.stop(reason);}
 resume(){this.active=true;this.request();}
 tick(t){this.pending=null;if(!this.active)return;if(this.playing&&this.now()-this.lastInput>120000){this.stop('Paused after two minutes without input');return;}
 const elapsed=this.last?t-this.last:0;
 if(this.playing&&this.last&&elapsed<1000/30){this.request();return;}
 const dt=this.playing?Math.min(elapsed/1000,.1):0;this.last=t;this.frames++;this.draw(dt);
 if(this.playing)this.request();else this.last=0;
 }
}

