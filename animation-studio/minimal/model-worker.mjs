// All untrusted bytes, hierarchy evaluation and CPU skinning stay off the UI thread.
import {parseGlb,deform,quaternionEuler} from '../rig-review/source/core.mjs';
import {evaluateInspection} from '../rig-review/source/inspection.mjs';
let model,record,clips,joints;
const digest=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),v=>v.toString(16).padStart(2,'0')).join('');
function frame({clip='rest',time=0,edits={},selected=-1},initial=false){
 const c=clips.find(c=>c.id===clip);if(clip!=='rest'&&!c)throw Error('Unknown diagnostic');
 const pose=evaluateInspection(model,c?.pose?null:c,time,c?.pose||null,edits);
 const geometry=deform(model,pose).map(g=>initial?{...g,colors:g.colors.slice(),indices:new Uint32Array(g.indices)}:{positions:g.positions,normals:g.normals});
 const lines=[],points=[],highlight=[];
 for(const id of joints){const p=pose.world[id].slice(12,15);(id===selected?highlight:points).push(...p);const parent=model.nodes[id].parent;if(parent>=0)lines.push(...pose.world[parent].slice(12,15),...p);}
 return {geometry,lines:new Float32Array(lines),points:new Float32Array(points),highlight:new Float32Array(highlight),angles:selected>=0?quaternionEuler(pose.nodes[selected].rotation):null};
}
function send(message){const transfers=[];for(const g of message.frame?.geometry||[])for(const v of Object.values(g))if(ArrayBuffer.isView(v))transfers.push(v.buffer);for(const k of ['lines','points','highlight'])if(message.frame)transfers.push(message.frame[k].buffer);postMessage(message,[...new Set(transfers)]);}
self.onmessage=async({data})=>{const started=performance.now();try{
 if(data.type==='load'){
  record=data.record;if(!record.activeBindingAllowed||record.requiresReviewOptIn)throw Error('This input requires separate review; use the preserved legacy studio.');
  postMessage({type:'progress',text:'Loading pinned model…'});
  const response=await fetch(new URL(record.file,import.meta.url));if(!response.ok)throw Error('Model download failed ('+response.status+').');
  const declared=Number(response.headers.get('content-length'));if(declared>64*1024*1024)throw Error('Model exceeds byte budget.');
  const bytes=await response.arrayBuffer();if(bytes.byteLength!==record.bytes||await digest(bytes)!==record.sha256)throw Error('Pinned model integrity check failed.');
  postMessage({type:'progress',text:'Preparing joints and rest pose…'});
  model=parseGlb(bytes,record.label);joints=[...new Set(model.skins.flatMap(s=>s.joints))];
  clips=model.clips.map(c=>({...c,id:'embedded:'+c.id}));
  clips.push(...Object.entries(record.staticPoses?.poses||{}).filter(([,p])=>Object.keys(p).length).map(([name,pose])=>({id:'static:'+name,name,pose,duration:0})));
  const first=joints.find(id=>!model.nodes[id].matrix)??-1;
  const rest=frame({selected:first},true),low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity];
  for(const g of rest.geometry)for(let i=0;i<g.positions.length;i+=3)for(let k=0;k<3;k++){low[k]=Math.min(low[k],g.positions[i+k]);high[k]=Math.max(high[k],g.positions[i+k]);}
  if(!low.every(Number.isFinite))throw Error('Model has no finite visible geometry.');
  send({type:'ready',frame:rest,meta:{joints:joints.map(id=>({id,name:model.nodes[id].name,editable:!model.nodes[id].matrix})),selected:first,clips:clips.map(c=>({id:c.id,name:c.name,duration:c.duration,kind:c.pose?'Static diagnostic pose':'Diagnostic clip',provenance:c.provenance||'Existing static pose study'})),bounds:{center:low.map((v,k)=>(v+high[k])/2),span:Math.max(.15,...high.map((v,k)=>v-low[k]))*1.5}},ms:performance.now()-started});
 }else if(data.type==='pose')send({type:'pose',request:data.request,revision:data.revision,frame:frame(data),ms:performance.now()-started});
 }catch(error){postMessage({type:'error',message:error.message});}};
