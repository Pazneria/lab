import {point} from './core.mjs';
import {paletteMembership,nodeKind} from './inspection.mjs';
const requireFamily=(ok,message)=>{if(!ok)throw Error(message);};
export function modelReviewGroup(record){
 if(record.parentStatus?.visualAcceptance==='held_pending_revision')return 'Historical - held revisions';
 if(record.role==='proposed_candidate'||record.role==='authoring_candidate')return 'Proposed - awaiting acceptance';
 if(record.collection==='keeper'||record.parentStatus?.visualAcceptance==='parent_confirmed_keeper')return 'Accepted visual keepers';
 if(record.id==='human01')return 'Original rig proof';
 if(record.role==='module_or_reference')return 'Modules and references';
 return 'Preserved review assets';
}
export function resolveFamilyMapping(asset){
 const m=asset.record.semanticMapping;
 return m&&m.glb_sha256===asset.record.sha256&&m.asset_id===asset.record.stableId?m:null;
}
export function validateFamilyMapping(asset){
 const m=resolveFamilyMapping(asset);if(!m)return null;
 requireFamily(asset.model.primitives.length===1,'Mapped contact associations require the pinned single-primitive export');
 for(const a of Object.values(m.semantic_aliases)){
  requireFamily(asset.model.nodes[a.node_index]?.name===a.node_name,'Semantic node identity mismatch');
  requireFamily(paletteMembership(asset.model,a.node_index).some(p=>p.paletteIndex===a.palette_index),'Semantic palette identity mismatch');
 }
 for(const marker of Object.values(m.markers)){
  const n=asset.model.nodes[marker.node_index];requireFamily(n?.name===marker.node_name&&asset.model.nodes[n.parent]?.name===marker.parent_name,'Marker frame identity mismatch');
 }
 const count=asset.model.primitives[0].positions.length/3;
 for(const contact of Object.values(m.contacts)){
  const sets=contact.points?.map(p=>p.render_vertex_indices)||[[contact.nearest_owned_render_vertex]];
  for(const ids of sets)requireFamily(ids?.length&&ids.every(i=>Number.isInteger(i)&&i>=0&&i<count),'Contact render association is out of range');
 }
 return m;
}
export function familyHierarchyRows(asset){
 const m=resolveFamilyMapping(asset);if(!m)return asset.rows;
 const markers=new Set(Object.values(m.markers).map(p=>p.node_index));
 return asset.rows.map(r=>({...r,kind:markers.has(r.id)&&!r.palettes.length?'socket':r.kind,semanticRoles:Object.entries(m.semantic_aliases).filter(([,a])=>a.node_index===r.id).map(([role])=>role)}));
}
export function actualStudioOverlay(asset,pose,selected,{joints=true,sockets=true}={}){
 const groups={joint:[],locator:[],socket:[]},dots={joint:[],locator:[],socket:[],selected:[]},segments=[];
 const rows=familyHierarchyRows(asset),kind=id=>rows.find(r=>r.id===id)?.kind||nodeKind(asset.model,id);
 asset.model.nodes.forEach((n,id)=>{
  const k=kind(id);if(k==='mesh')return;const key=k==='joint'?'joint':k==='socket'?'socket':'locator';
  if(key==='socket'?!sockets:!joints)return;
  dots[id===selected?'selected':key].push(...pose.world[id].slice(12,15));
  if(n.parent>=0){const lineKind=key==='socket'?'socket':key==='joint'&&kind(n.parent)==='joint'?'joint':'locator';groups[lineKind].push(...pose.world[n.parent].slice(12,15),...pose.world[id].slice(12,15));segments.push({child:id,parent:n.parent,kind:lineKind});}
 });return {groups,dots,segments};
}
export function evaluatedFamilyContacts(asset,geometry,placement){
 const m=resolveFamilyMapping(asset);if(!m)return null;const p=geometry[0].positions;
 const get=i=>point(placement.matrix,Array.from(p.subarray(i*3,i*3+3)));
 return Object.entries(m.contacts).map(([limb,c])=>{
  const samples=c.points||[{render_vertex_indices:[c.nearest_owned_render_vertex],bind_position:c.bind_position}];
  const points=samples.map(s=>get(s.render_vertex_indices[0]));
  return {limb,kind:c.kind,owner:c.owner||null,guide:c.marker||c.contact_guides||null,points,renderAssociations:samples.map(s=>s.render_vertex_indices.slice()),minHeight:Math.min(...points.map(p=>p[1])),maxHeight:Math.max(...points.map(p=>p[1])),supportSchedule:null};
 });
}
export function familyContactLayers(contacts){
 return (contacts||[]).map(c=>({points:c.points.flat(),lines:[],color:[.25,.72,.72]}));
}
