// Independent hosted control: no studio shader, model, bridge or pose code.
self.onmessage=()=>{
 const started=performance.now(),canvas=new OffscreenCanvas(64,64);
 const losses=[];canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();losses.push(performance.now());postMessage({event:'lost',losses});});
 try{
  const g=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power'});
  if(!g){postMessage({done:true,available:false,ms:performance.now()-started});return;}
  g.clearColor(0,.25,0,1);g.clear(g.COLOR_BUFFER_BIT);
  const e=g.getExtension('WEBGL_debug_renderer_info');
  postMessage({done:true,available:true,ms:performance.now()-started,error:g.getError(),lost:g.isContextLost(),renderer:g.getParameter(e?e.UNMASKED_RENDERER_WEBGL:g.RENDERER),version:g.getParameter(g.VERSION),losses});
 }catch(error){postMessage({done:true,errorMessage:error.message,ms:performance.now()-started,losses});}
};
