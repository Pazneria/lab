// Shared drawn bounds and CPU-only input math. No renderer or entrant code.
export const comparisonLayout=Object.freeze({
  width:1280,height:600,
  previews:Object.freeze([{x:40,y:105,width:575,height:322},{x:665,y:105,width:575,height:322}].map(Object.freeze)),
  buttons:Object.freeze([
    {kind:'previous',x:40,y:522,width:100,height:48,label:'←'},
    {kind:'next',x:1140,y:522,width:100,height:48,label:'Next'},
    {kind:'vote',choice:'a',x:180,y:522,width:230,height:48,label:'Prefer A'},
    {kind:'vote',choice:'tie',x:450,y:522,width:170,height:48,label:'Tie'},
    {kind:'vote',choice:'b',x:660,y:522,width:230,height:48,label:'Prefer B'},
    {kind:'inspect',x:930,y:522,width:170,height:48,label:'Inspect'},
  ].map(Object.freeze)),
});

export function containsPoint(bounds,point){
  return !!bounds&&Number.isFinite(point?.x)&&Number.isFinite(point?.y)&&
    point.x>=bounds.x&&point.x<bounds.x+bounds.width&&point.y>=bounds.y&&point.y<bounds.y+bounds.height;
}
export function fitPreview(bounds,width,height){
  if(!Number.isFinite(width)||!Number.isFinite(height)||!(width>0&&height>0))return null;
  const scale=Math.min(bounds.width/width,bounds.height/height),w=width*scale,h=height*scale;
  return {x:bounds.x+(bounds.width-w)/2,y:bounds.y+(bounds.height-h)/2,width:w,height:h};
}
export function comparisonTargetAt(point,previews=comparisonLayout.previews){
  for(let slot=0;slot<previews.length;slot++)if(containsPoint(previews[slot],point))return {kind:'entry',slot};
  return comparisonLayout.buttons.find(bounds=>containsPoint(bounds,point))||null;
}
export function canvasPointer(clientX,clientY,rect){
  if(!rect||![rect.left,rect.top,rect.width,rect.height,clientX,clientY].every(Number.isFinite)||!(rect.width>0&&rect.height>0))return null;
  const x=(clientX-rect.left)/rect.width,y=(clientY-rect.top)/rect.height;
  if(x<0||x>=1||y<0||y>=1)return null;
  // BoundingClientRect and pointer coordinates are both CSS pixels. Drawing
  // buffer size/devicePixelRatio must not enter this conversion.
  return {x:x*2-1,y:1-y*2};
}
export function firstVisibleHit(hits,ignore){
  return hits.find(hit=>{
    if(hit.object===ignore)return false;
    for(let object=hit.object;object;object=object.parent)if(object.visible===false)return false;
    const material=Array.isArray(hit.object.material)?hit.object.material[hit.face?.materialIndex||0]:hit.object.material;
    return material?.visible!==false;
  })||null;
}
export function clickSlop(pointerType){return pointerType==='touch'?8:5;}
export function movedBeyondClick(gesture,event){
  return Math.hypot(event.clientX-gesture.startX,event.clientY-gesture.startY)>gesture.slop;
}
export function intentionalClick(gesture,event,targetKey,view){
  return !gesture.moved&&event.pointerId===gesture.id&&event.button===0&&event.isPrimary!==false&&
    !movedBeyondClick(gesture,event)&&gesture.targetKey!==null&&gesture.targetKey===targetKey&&
    ['x','z','yaw','pitch'].every(key=>Math.abs(gesture.view[key]-view[key])<1e-7);
}
