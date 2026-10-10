/** Inspection state over the isolated task35 loader/evaluator. No DOM or graphics. */
import {parseGlb,poseAt,deform,motionClips,trs,mul,point,euler,unit,clamp} from './core.mjs';
export const INSPECTOR_VERSION='private-rig-inspector/1.1';
const inspectCheck=(ok,message)=>{if(!ok)throw Error(message);};
export function paletteMembership(model,nodeId){
 return model.skins.flatMap((s,skinIndex)=>s.joints.flatMap((id,paletteIndex)=>id===nodeId?[{skinIndex,paletteIndex}]:[]));
}
export function nodeKind(model,id){
 const n=model.nodes[id];if(paletteMembership(model,id).length)return n.parent<0||/^root(?:_|$)/i.test(n.name)?'root-locator':'joint';
 if(/socket|mount|grip|anchor|locator/i.test(n.name))return 'socket';
 return n.mesh!==undefined?'mesh':'intermediary';
}
export function hierarchyRows(model){
 const rows=[],seen=new Set();
 function visit(id,depth){inspectCheck(!seen.has(id),'Hierarchy repeated node');seen.add(id);rows.push({id,name:model.nodes[id].name,parent:model.nodes[id].parent,depth,kind:nodeKind(model,id),palettes:paletteMembership(model,id)});model.nodes.forEach((n,i)=>{if(n.parent===id)visit(i,depth+1);});}
 model.nodes.forEach((n,i)=>{if(n.parent<0)visit(i,0);});inspectCheck(rows.length===model.nodes.length,'Hierarchy coverage mismatch');return rows;
}
export function skeletonOverlay(model,pose,selected=-1){
 const groups={joint:[],locator:[],socket:[]},dots={joint:[],locator:[],socket:[],selected:[]},segments=[];
 model.nodes.forEach((n,id)=>{
  const kind=nodeKind(model,id);if(kind==='mesh')return;
  const position=pose.world[id].slice(12,15),key=kind==='joint'?'joint':kind==='socket'?'socket':'locator';
  dots[id===selected?'selected':key].push(...position);
  if(n.parent>=0){const parentKind=nodeKind(model,n.parent),lineKind=kind==='socket'?'socket':kind==='joint'&&parentKind==='joint'?'joint':'locator';groups[lineKind].push(...pose.world[n.parent].slice(12,15),...position);segments.push({child:id,parent:n.parent,kind:lineKind});}
 });
 return {groups,dots,segments};
}
export function evaluateInspection(model,clip,time,poseRecord=null,edits={}){
 const pose=poseAt(model,clip,time);
 if(poseRecord)for(const [name,degrees] of Object.entries(poseRecord)){
  const matches=model.nodes.flatMap((n,i)=>n.name===name?[i]:[]);inspectCheck(matches.length===1,'Static diagnostic target is absent or ambiguous: '+name);
  inspectCheck(paletteMembership(model,matches[0]).length&&degrees.length===3&&degrees.every(Number.isFinite),'Invalid static pose target');pose.nodes[matches[0]].rotation=euler(degrees);
 }
 for(const [key,value] of Object.entries(edits)){
  const id=Number(key);inspectCheck(Number.isInteger(id)&&model.nodes[id]&&paletteMembership(model,id).length&&!model.nodes[id].matrix,'Inspection editor needs an actual TRS skin joint');
  for(const path of ['position','rotation','scale'])if(value[path]){const v=value[path];inspectCheck(Array.isArray(v)&&v.length===(path==='rotation'?4:3)&&v.every(Number.isFinite),'Invalid local edit');if(path==='rotation')inspectCheck(Math.hypot(...v)>1e-9,'Zero quaternion');if(path==='scale')inspectCheck(v.every(x=>Math.abs(x)>1e-6),'Singular local scale');pose.nodes[id][path]=path==='rotation'?unit(v):v.slice();}
 }
 const world=[],visiting=new Set();
 const worldAt=id=>{if(world[id])return world[id];inspectCheck(!visiting.has(id),'Hierarchy cycle');visiting.add(id);const n=model.nodes[id],v=pose.nodes[id],local=n.matrix||trs(v.position,v.rotation,v.scale);world[id]=n.parent<0?local:mul(worldAt(n.parent),local);visiting.delete(id);return world[id];};
 model.nodes.forEach((_,i)=>worldAt(i));pose.world=world;return pose;
}
export function selectedNodeInfo(model,pose,id,clip=null,poseRecord=null,edits={}){
 const n=model.nodes[id];inspectCheck(n,'Node selection missing');
 const writers={translation:'bind',rotation:'bind',scale:'bind',weights:'bind'};
 for(const t of clip?.tracks||[])if(t.nodeId===id)writers[t.path]=clip.classification+' / '+clip.name+' / '+t.interpolation;
 if(poseRecord?.[n.name])writers.rotation='existing static diagnostic';
 for(const p of Object.keys(edits[id]||{}))writers[p==='position'?'translation':p]='inspection-only local override';
 return {nodeIndex:id,name:n.name,kind:nodeKind(model,id),palette:paletteMembership(model,id),parentIndex:n.parent<0?null:n.parent,parentName:n.parent<0?null:model.nodes[n.parent].name,localTransformRepresentation:n.matrix?'glTF matrix; separate TRS fields are not authored':'glTF TRS',bindLocal:{translation:n.matrix?null:n.position,rotation:n.matrix?null:n.rotation,scale:n.matrix?null:n.scale,matrix:n.matrix||trs(n.position,n.rotation,n.scale),weights:n.weights},evaluatedLocal:{translation:n.matrix?null:pose.nodes[id].position,rotation:n.matrix?null:pose.nodes[id].rotation,scale:n.matrix?null:pose.nodes[id].scale,matrix:n.matrix||trs(pose.nodes[id].position,pose.nodes[id].rotation,pose.nodes[id].scale),weights:pose.nodes[id].weights},worldMatrix:pose.world[id],worldOrigin:pose.world[id].slice(12,15),writtenChannels:writers};
}
export function influenceWeights(model,primitive,nodeId){
 const weights=new Float32Array(primitive.positions.length/3),skin=model.skins[model.nodes[primitive.nodeId].skin];
 if(!skin)return weights;
 for(let i=0;i<weights.length;i++)for(let k=0;k<4;k++)if(skin.joints[primitive.joints[i*4+k]]===nodeId)weights[i]+=primitive.weights[i*4+k];
 return weights;
}
export function weightGeometry(model,geometry,nodeId){
 return geometry.map((g,pi)=>{const weights=influenceWeights(model,model.primitives[pi],nodeId),colors=g.colors.slice();for(let i=0;i<weights.length;i++){const w=clamp(weights[i],0,1);if(w===0)continue;const heat=[1,.14+.55*(1-w),.025];for(let k=0;k<3;k++)colors[i*3+k]=colors[i*3+k]*(1-w)+heat[k]*w;}return {...g,colors};});
}
const triArea=(p,a,b,c)=>{const u=[0,1,2].map(k=>p[b*3+k]-p[a*3+k]),v=[0,1,2].map(k=>p[c*3+k]-p[a*3+k]);return Math.hypot(u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0])/2;};
export function areaAudit(model,geometry,bindGeometry){
 return geometry.map((g,pi)=>{const ratios=[],flagged=[];let minimum=Infinity,maximum=-Infinity;for(let f=0;f<g.indices.length/3;f++){const ids=g.indices.slice(f*3,f*3+3),base=triArea(bindGeometry[pi].positions,...ids),ratio=base>1e-12?triArea(g.positions,...ids)/base:null;ratios.push(ratio);if(ratio!==null){minimum=Math.min(minimum,ratio);maximum=Math.max(maximum,ratio);if(ratio<.5||ratio>2)flagged.push(f);}}return {ratios,flagged,minimum,maximum};});
}
export function areaGeometry(geometry,audit){
 return geometry.map((g,pi)=>{const flagged=new Set(audit[pi].flagged),positions=new Float32Array(g.indices.length*3),normals=new Float32Array(positions.length),colors=new Float32Array(positions.length),indices=[];g.indices.forEach((id,i)=>{const f=Math.floor(i/3);positions.set(g.positions.slice(id*3,id*3+3),i*3);normals.set(g.normals.slice(id*3,id*3+3),i*3);colors.set(flagged.has(f)?audit[pi].ratios[f]<.5?[.25,.25,1]:[1,.05,.08]:g.colors.slice(id*3,id*3+3),i*3);indices.push(i);});return {...g,positions,normals,colors,indices};});
}
export function flaggedTriangleLines(geometry,primitive,triangle){
 const g=geometry[primitive];if(!g||triangle<0||triangle>=g.indices.length/3)return [];
 const ids=g.indices.slice(triangle*3,triangle*3+3),lines=[];for(const [a,b] of [[0,1],[1,2],[2,0]])lines.push(...g.positions.slice(ids[a]*3,ids[a]*3+3),...g.positions.slice(ids[b]*3,ids[b]*3+3));return lines;
}
export function inspectionClipList(model,record,priorDocument=null,priorMeta=null){
 const clips=model.clips.map(c=>({...c,id:'embedded:'+c.id,classification:'existing-diagnostic',sourceHash:record.sha256}));
 const exactHuman=record.sha256==='eef773e568c1fda0713481e068e7d7eeb1a6f876abe65d793ac5650138befa67';
 if(exactHuman&&priorDocument)clips.push(...motionClips(priorDocument,model).map(c=>({...c,id:'prior:'+c.id,classification:'prior-original',sourceHash:priorMeta.sha256,source:priorMeta.source,referenceSpeed:priorDocument.clips.find(x=>x.name===c.name)?.referenceSpeed||0})));
 return clips;
}
export function prepareAsset(bytes,record,priorDocument=null,priorMeta=null){
 const model=parseGlb(bytes,record.label||record.id);const bind=evaluateInspection(model,null,0),bindGeometry=deform(model,bind),rows=hierarchyRows(model);
 const staticPoses=Object.entries(record.staticPoses?.poses||{}).filter(([,v])=>Object.keys(v).length).map(([name,pose])=>({id:'static:'+name,name,pose,classification:'existing-static-diagnostic',sourceHash:record.staticPoses.sha256}));
 for(const item of staticPoses){const test=evaluateInspection(model,null,0,item.pose);inspectCheck(test.world.every(m=>m.every(Number.isFinite)),'Non-finite static pose');}
 return {model,record,bind,bindGeometry,rows,staticPoses,clips:inspectionClipList(model,record,priorDocument,priorMeta)};
}
export function verifyCandidateCompatibility(original,candidate,receipt,priorDocument,priorMeta){
 const sourceHash='eef773e568c1fda0713481e068e7d7eeb1a6f876abe65d793ac5650138befa67',candidateHash='e98d63f78c4ea55dfdf0e130638bb102f41411f1d06e7edb4ae4bdfc4201481f',motionHash='bfac4a0a9f04ee74a19b0e7e0314ca2ae6342667c487542cf9abb01db5a38088';
 inspectCheck(receipt?.schema==='rig-motion-compatibility/1'&&receipt.source_rig_glb_sha256===sourceHash&&original.record.sha256===sourceHash&&receipt.candidate_rig_glb_sha256===candidateHash&&candidate.record.sha256===candidateHash&&receipt.external_motion?.sha256===motionHash&&priorMeta.sha256===motionHash,'Candidate compatibility needs exact separately pinned source, candidate and prior-motion hashes');
 inspectCheck(priorDocument.rigId===receipt.external_motion.declaredRigId&&receipt.source_rig_contract_id==='human01-rig-v1'&&receipt.candidate_rig_contract_id==='human01-rig-skin-candidate-v1','Candidate declared rig contract mismatch');
 const a=original.model,b=candidate.model,equal=(x,y,label)=>inspectCheck(JSON.stringify(x)===JSON.stringify(y),'Candidate changed '+label);
 equal(a.nodes,b.nodes,'node names, parents and bind transforms');equal(a.gltf.nodes,b.gltf.nodes,'actual node hierarchy or sockets');equal(a.skins,b.skins,'skin palettes or inverse binds');equal(a.gltf.materials,b.gltf.materials,'materials');equal(a.gltf.animations,b.gltf.animations,'embedded diagnostic metadata');equal(a.clips,b.clips,'embedded diagnostic sample arrays');
 inspectCheck(a.primitives.length===b.primitives.length,'Candidate primitive count changed');const changed=[];
 a.primitives.forEach((p,pi)=>{const q=b.primitives[pi];for(const key of ['nodeId','positions','normals','colors','indices','targets','doubleSided','faceGroups'])equal(p[key],q[key],'primitive '+pi+' '+key);for(let v=0;v<p.positions.length/3;v++){const offsets=[0,1,2,3].map(k=>v*4+k);if(offsets.some(i=>p.joints[i]!==q.joints[i]||p.weights[i]!==q.weights[i]))changed.push(v);}});
 equal(changed,[172,190,287,289],'authorized changed skin rows');equal(changed,receipt.verification.changed_render_vertices,'receipt skin row list');
 const prior=motionClips(priorDocument,b);equal(prior.map(c=>c.name),receipt.external_motion.permitted_clip_names,'permitted prior clip names');
 candidate.clips.push(...prior.map(c=>({...c,id:'prior:'+c.id,classification:'prior-original',sourceHash:priorMeta.sha256,source:priorMeta.source,compatibleCandidate:true})));
 candidate.compatibility={verified:true,sourceHash,candidateHash,motionHash,changedRenderVertices:changed,acceptance:'proposed / not catalog registered / not visually accepted'};return candidate.compatibility;
}
export function resolvePairedClip(activeAsset,pairedAsset,activeClip,motionHash){
 if(!activeClip)return null;
 const prior=activeClip.id.startsWith('prior:')&&activeClip.classification==='prior-original'&&activeClip.sourceHash===motionHash,embedded=activeClip.id.startsWith('embedded:')&&activeClip.classification==='existing-diagnostic'&&activeClip.sourceHash===activeAsset.record.sha256;
 inspectCheck(prior||embedded,'Imported or unidentified motion cannot enter pinned candidate comparison');
 const paired=pairedAsset.clips.find(c=>c.id===activeClip.id&&c.classification===activeClip.classification&&(prior?c.sourceHash===activeClip.sourceHash:c.sourceHash===pairedAsset.record.sha256));
 inspectCheck(paired,'Exact clip identity unavailable for candidate comparison');return paired;
}
export class AtomicAssetStore {
 constructor(){this.current=null;this.generation=0;}
 begin(){return ++this.generation;}
 commit(generation,prepared){if(generation!==this.generation)return false;inspectCheck(prepared?.model&&prepared?.bind,'Unprepared asset');this.current=prepared;return true;}
 cancel(){++this.generation;}
}
export class InspectionGate {
 constructor(states,{resume,suspend}){this.states=states;this.resume=resume;this.suspend=suspend;}
 get open(){return Object.values(this.states).every(Boolean);}
 set(key,value,reason='Resource gate closed'){inspectCheck(Object.hasOwn(this.states,key),'Unknown resource gate');this.states[key]=!!value;if(this.open)this.resume();else this.suspend(reason);}
}
export const PRIOR_MOTION_SHA256='bfac4a0a9f04ee74a19b0e7e0314ca2ae6342667c487542cf9abb01db5a38088';
/** Authorization comes from the exact file's channels and referenceSpeed, never a name guess. */
export function authorizePriorMovement(asset,clip,priorDocument,priorMeta){
 if(!clip||clip.classification!=='prior-original'||clip.sourceHash!==PRIOR_MOTION_SHA256||priorMeta?.sha256!==PRIOR_MOTION_SHA256||!clip.id.startsWith('prior:')||!priorDocument?.clips)return null;
 const original=asset.record.sha256==='eef773e568c1fda0713481e068e7d7eeb1a6f876abe65d793ac5650138befa67',candidate=asset.compatibility?.verified&&asset.compatibility.motionHash===PRIOR_MOTION_SHA256&&asset.compatibility.candidateHash===asset.record.sha256;
 if(!original&&!candidate)return null;
 const index=priorDocument.clips.findIndex((c,i)=>'prior:motion_'+i===clip.id),source=priorDocument.clips[index];
 if(!source||source.name!==clip.name||!['idle_original','walk_original','run_original'].includes(source.name)||!Number.isFinite(source.referenceSpeed)||source.referenceSpeed<0)return null;
 const expected=motionClips(priorDocument,asset.model)[index];
 if(JSON.stringify(expected.tracks)!==JSON.stringify(clip.tracks)||JSON.stringify(expected.contacts)!==JSON.stringify(clip.contacts)||expected.duration!==clip.duration)return null;
 return Object.freeze({schema:'prior-human-reference-proof/1',clipId:clip.id,clipName:clip.name,motionSha256:PRIOR_MOTION_SHA256,rigSha256:asset.record.sha256,referenceSpeed:source.referenceSpeed,duration:source.duration,rootPolicy:'single actor wrapper +Z = referenceSpeed * clamped clip seconds',loopPolicy:'one cycle, clamp; no automatic world loop',classification:'prior-original reference-speed straight-level fixture; not motion acceptance'});
}
export function actorPlacement(permission,time,enabled=false){
 if(!enabled)return {enabled:false,seconds:time,translation:[0,0,0],matrix:trs(),space:'intrinsic exported GLB world'};
 inspectCheck(permission&&permission.motionSha256===PRIOR_MOTION_SHA256,'World movement needs pinned prior-motion authorization');
 const seconds=clamp(Number(time)||0,0,permission.duration),translation=[0,0,permission.referenceSpeed*seconds];
 return {enabled:true,seconds,translation,matrix:trs(translation),referenceSpeed:permission.referenceSpeed,duration:permission.duration,space:'placed world = actor wrapper * intrinsic exported GLB world',classification:permission.classification,loopPolicy:permission.loopPolicy};
}
const wrapTriples=(values,matrix)=>{const out=[];for(let i=0;i<values.length;i+=3)out.push(...point(matrix,values.slice(i,i+3)));return out;};
export const placedLines=(values,placement)=>placement.enabled?wrapTriples(values,placement.matrix):values;
export function placedGeometry(geometry,placement){
 if(!placement.enabled)return geometry;
 return geometry.map(g=>({...g,positions:new Float32Array(wrapTriples(g.positions,placement.matrix))}));
}
export function placedSkeleton(overlay,placement){
 if(!placement.enabled)return overlay;
 return {...overlay,groups:Object.fromEntries(Object.entries(overlay.groups).map(([key,v])=>[key,wrapTriples(v,placement.matrix)])),dots:Object.fromEntries(Object.entries(overlay.dots).map(([key,v])=>[key,wrapTriples(v,placement.matrix)]))};
}
export function placedNodeInfo(info,placement){
 const displayed=mul(placement.matrix,info.worldMatrix);
 return {...info,worldMatrixSpace:'intrinsic exported GLB world (before actor placement)',actorPlacement:{enabled:placement.enabled,translation:placement.translation,wrapperMatrix:placement.matrix,space:placement.space,referenceSpeed:placement.referenceSpeed??null,seconds:placement.seconds,loopPolicy:placement.loopPolicy||null},placedWorldMatrix:displayed,placedWorldOrigin:displayed.slice(12,15)};
}
/** Keep all distinct lowest exported sole positions and every split-render association. */
export function deriveSoleDefinition(model){
 const sides={};
 for(const side of ['left','right']){
  const entries=[];model.primitives.forEach((pr,primitiveIndex)=>{const faces=pr.faceGroups?.[side+'_foot']||[],ids=[...new Set(faces.flatMap(f=>pr.indices.slice(f*3,f*3+3)))];if(!ids.length)return;const floor=ids.reduce((v,id)=>Math.min(v,pr.positions[id*3+1]),Infinity);for(const id of ids)if(pr.positions[id*3+1]<=floor+.001)entries.push({primitiveIndex,renderVertex:id,bindPoint:Array.from(pr.positions.slice(id*3,id*3+3)),floor});});
  inspectCheck(entries.length,'Actual exported '+side+' foot region has no sole vertices');
  const unique=new Map();for(const e of entries){const key=e.bindPoint.join(',');if(!unique.has(key))unique.set(key,{id:side+'.sole.'+unique.size,bindPoint:e.bindPoint,renderVertices:[]});unique.get(key).renderVertices.push({primitiveIndex:e.primitiveIndex,renderVertex:e.renderVertex});}
  const points=[...unique.values()],centerXZ=[0,2].map(k=>points.reduce((sum,p)=>sum+p.bindPoint[k],0)/points.length),polygonOrder=points.map((_,i)=>i).sort((a,b)=>Math.atan2(points[a].bindPoint[2]-centerXZ[1],points[a].bindPoint[0]-centerXZ[0])-Math.atan2(points[b].bindPoint[2]-centerXZ[1],points[b].bindPoint[0]-centerXZ[0]));
  sides[side]={source:'actual lowest exported foot-region render positions; .001 authored-unit floor band',points,polygonOrder,bindFloor:Math.min(...entries.map(e=>e.floor)),splitRenderVertexCount:entries.length};
 }
 return {schema:'actual-exported-human-sole-polygons/1',sides,markerPolicy:'each point uses an actual skinned render vertex; no socket, ankle or averaged contact marker'};
}
export function evaluatedSoles(definition,geometry,clip,time){
 const sides={};for(const [side,def] of Object.entries(definition.sides)){
  const intervalIndex=(clip.contacts?.[side]||[]).findIndex(([start,end])=>time>=start&&time<end),points=def.points.map(p=>{const first=p.renderVertices[0],position=Array.from(geometry[first.primitiveIndex].positions.slice(first.renderVertex*3,first.renderVertex*3+3));let duplicateSeparation=0;for(const r of p.renderVertices){const q=geometry[r.primitiveIndex].positions.slice(r.renderVertex*3,r.renderVertex*3+3);duplicateSeparation=Math.max(duplicateSeparation,Math.hypot(...position.map((v,k)=>v-q[k])));}return {...p,position,duplicateSeparation};});
  const polygon=[];for(let i=0;i<def.polygonOrder.length;i++)polygon.push(...points[def.polygonOrder[i]].position,...points[def.polygonOrder[(i+1)%def.polygonOrder.length]].position);
  sides[side]={points,polygon,contactActive:intervalIndex>=0,intervalIndex,halfOpen:true,minimumHeight:points.reduce((v,p)=>Math.min(v,p.position[1]),Infinity),maximumAbsoluteHeight:points.reduce((v,p)=>Math.max(v,Math.abs(p.position[1])),0)};
 }
 return sides;
}
export function movementFixture(asset,clip,time,permission,{travel=false,markers=false,pose=null,definition=null}={}){
 inspectCheck(permission&&permission.clipId===clip?.id&&permission.rigSha256===asset.record.sha256,'Movement fixture identity mismatch');
 const placement=actorPlacement(permission,time,travel),intrinsicPose=pose||evaluateInspection(asset.model,clip,placement.seconds),intrinsicGeometry=deform(asset.model,intrinsicPose),geometry=placedGeometry(intrinsicGeometry,placement),overlay=placedSkeleton(skeletonOverlay(asset.model,intrinsicPose),placement),soleDefinition=definition||deriveSoleDefinition(asset.model),soles=markers?evaluatedSoles(soleDefinition,geometry,clip,placement.seconds):null;
 return {placement,intrinsicPose,intrinsicGeometry,geometry,overlay,soleDefinition,soles};
}
export function soleMarkerLayers(soles){
 if(!soles)return [];
 return Object.entries(soles).map(([side,s])=>({side,contactActive:s.contactActive,color:s.contactActive?[.15,.85,.4]:[1,.53,.08],lines:s.polygon,points:s.points.flatMap(p=>p.position)}));
}
