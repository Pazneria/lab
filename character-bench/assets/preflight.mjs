// A dedicated module worker keeps large embedded JSON/preflight off the UI thread.
export function preflight(buffer,signal,{WorkerClass=globalThis.Worker,timeoutMs=30000}={}) {
  return new Promise((resolve,reject)=>{
    if(signal.aborted){reject(new DOMException('Import cancelled.','AbortError'));return;}
    let worker,timer;
    const cleanup=()=>{clearTimeout(timer);signal.removeEventListener('abort',cancel);worker?.terminate();};
    const fail=error=>{cleanup();reject(error);};
    const cancel=()=>fail(new DOMException('Import cancelled.','AbortError'));
    try {
      worker=new WorkerClass(new URL('./preflight-worker.mjs',import.meta.url),{type:'module'});
      signal.addEventListener('abort',cancel,{once:true});
      worker.onmessage=event=>{cleanup();event.data.error?reject(Error(event.data.error)):resolve(event.data);};
      worker.onerror=()=>fail(Error('Character preflight could not complete on this device.'));
      timer=setTimeout(()=>fail(Error('Character preflight exceeded the 30-second limit.')),timeoutMs);
      worker.postMessage({buffer},[buffer]);
    }catch(error){fail(error);}
  });
}
