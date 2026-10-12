// No graphics, model, DOM or application code. Independent renderer-thread clock.
const stamp=()=>({origin:performance.timeOrigin,now:performance.now(),epoch:Date.now()});
let last=performance.now();postMessage({type:'start',...stamp()});
setInterval(()=>{const now=performance.now();postMessage({type:'heartbeat',...stamp(),drift:now-last-100});last=now;},100);
