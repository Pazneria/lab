// Local, same-origin workbench routing. No external data or network access.
export const WORKBENCH_RETURN_KEY='lab.production.animation-return.v1';
const workbenchPose=p=>p&&['x','z','yaw','pitch'].every(key=>Number.isFinite(p[key]))&&(p.crouch===undefined||typeof p.crouch==='boolean');
export function workbenchDestination(href,base){
  if(!href)return null;
  try{const expected=new URL('../animation-studio/',base),url=new URL(href,base);
    return href&&url.origin===expected.origin&&url.pathname===expected.pathname&&!url.username&&!url.password&&!url.search&&!url.hash?url.href:null;
  }catch{return null;}
}
export function saveWorkbenchReturn(storage,base,layout,position){
  if(!workbenchPose(position))return;
  try{const {x,z,yaw,pitch,crouch=false}=position;storage.setItem(WORKBENCH_RETURN_KEY,JSON.stringify({version:1,lab:new URL('../lab-space/',base).href,layout,position:{x,z,yaw,pitch,crouch}}));}catch{}
}
export function takeWorkbenchReturn(storage,base,referrer,layout,walkable){
  try{const raw=storage.getItem(WORKBENCH_RETURN_KEY);storage.removeItem(WORKBENCH_RETURN_KEY);
    const back=JSON.parse(raw),expected=new URL('../animation-studio/',base),from=new URL(referrer),lab=new URL('../lab-space/',base).href;
    if(from.origin!==expected.origin||![expected.pathname,expected.pathname+'index.html'].includes(from.pathname)||back?.version!==1||back.lab!==lab||back.layout!==layout||!workbenchPose(back.position)||!walkable(back.position))return null;
    return back.position;
  }catch{return null;}
}
export function returnToLab(event,{base,referrer,history}){
  if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return false;
  try{const lab=new URL('../lab-space/',base),from=new URL(referrer);
    if(from.origin!==lab.origin||![lab.pathname,lab.pathname+'index.html'].includes(from.pathname)||history.length<=1)return false;
    event.preventDefault();history.back();return true;
  }catch{return false;}
}
