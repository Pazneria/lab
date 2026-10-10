// One studio, one active renderer. Lazy authoring is never initialized at entry.
export function createStudioModes({rig,motion,changed=()=>{},report=()=>{}}){
 let mode='rig',epoch=0,disposed=false,pending=false;
 const views={rig,motion};
 const deactivate=()=>{for(const view of Object.values(views))view.setActive(false);};
 async function select(next){
  if(disposed||!Object.hasOwn(views,next))return false;
  const generation=++epoch;mode=next;pending=true;deactivate();changed(mode,pending);
  try{
   await views[next].ensure();
   if(disposed||generation!==epoch){if(disposed||mode!==next)views[next].setActive(false);return false;}
   views[next].setActive(true);pending=false;changed(mode,pending);return true;
  }catch(error){
   if(disposed||generation!==epoch)return false;
   mode='rig';pending=false;deactivate();try{rig.setActive(true);}catch(fallbackError){report(fallbackError);}changed(mode,pending);report(error);return false;
  }
 }
 function suspend(){++epoch;pending=false;deactivate();}
 function restore(){if(!disposed)return select(mode);return Promise.resolve(false);}
 function dispose(){disposed=true;suspend();}
 return {select,suspend,restore,dispose,get mode(){return mode;},get pending(){return pending;},get disposed(){return disposed;}};
}
