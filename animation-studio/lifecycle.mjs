// The editing state stays in memory during bfcache; GPU resources do not.
export function installStudioLifecycle({window,document,clock,depart,destroy,restore,report}){
  let disposed=false;
  window.addEventListener('pagehide',()=>{
    clock.suspend('Returned to Lab');depart();
    if(!disposed){disposed=true;destroy();}
  });
  window.addEventListener('pageshow',event=>{
    if(!event.persisted||!disposed)return;
    try{restore();disposed=false;if(!document.hidden)clock.resume();}
    catch(error){clock.suspend('Studio restoration failed');report('The studio could not restore its viewport. Reload to resume viewing. '+error.message,true);}
  });
  return {get disposed(){return disposed;}};
}
