// Positions in metres; the eye stays level. A circle collider slides along furniture.
export const limits = Object.freeze({x:7.55,z:6.55,radius:.32});
export const obstacles = Object.freeze([
  {x1:-2.6,x2:2.6,z1:-3.9,z2:-2.0}, // central benchmark bench
  {x1:-7.85,x2:-6.2,z1:-5.9,z2:1.5}, // west apparatus bench
  {x1:-5.95,x2:-3.9,z1:-7,z2:-6.4}, // specimen case
  {x1:-2.26,x2:2.26,z1:-7,z2:-6.58}, // hall niche cabinet
  ...[-5,-.6,2.8,4.4].map(z=>({x1:-3.91,x2:-3.29,z1:z-.31,z2:z+.31})), // west piers
  ...[-.6,4.4].map(z=>({x1:3.29,x2:3.91,z1:z-.31,z2:z+.31})), // east piers
  {x1:3.5,x2:3.7,z1:-7,z2:-5.65}, // study north return; the portal remains open south of it
  {x1:3.85,x2:8,z1:-.7,z2:-.48}, // study south screen
  {x1:3.85,x2:6.35,z1:-7,z2:-6.6}, // study bookcase
  {x1:7.15,x2:7.95,z1:-3.7,z2:-1.5}, // writing desk
  {x1:6.2,x2:6.75,z1:-2.7,z2:-2.2}, // study chair
  {x1:7.5,x2:8,z1:.1,z2:4.3}, // east window seat
  {x1:-6.25,x2:-1.75,z1:6.55,z2:7}, // south stone seat
  {x1:6.2,x2:7.7,z1:-6.7,z2:-5.1}, // plant
  {x1:-7.45,x2:-6.55,z1:4.35,z2:5.25}, // west planter
]);
export function spawn(){return {x:2.8,z:5.4,yaw:.33,pitch:-.035};}
export function blocked(x,z){return obstacles.some(b=>x>=b.x1-limits.radius-.035&&x<=b.x2+limits.radius+.035&&z>=b.z1-limits.radius-.035&&z<=b.z2+limits.radius+.035);}
export function advance(p,actions,dt,gentle=false){
  const step=Math.min(dt,.05),speed=gentle?1.3:2.6;
  const forward=Number(actions.has('forward'))-Number(actions.has('backward'));
  const side=Number(actions.has('right'))-Number(actions.has('left'));
  p.yaw+=(Number(actions.has('turnLeft'))-Number(actions.has('turnRight')))*step*(gentle?.9:1.35);
  const norm=Math.hypot(forward,side)||1;
  const dx=(-Math.sin(p.yaw)*forward+Math.cos(p.yaw)*side)/norm*speed*step;
  const dz=(-Math.cos(p.yaw)*forward-Math.sin(p.yaw)*side)/norm*speed*step;
  const x=Math.max(-limits.x,Math.min(limits.x,p.x+dx));
  if(!blocked(x,p.z))p.x=x;
  const z=Math.max(-limits.z,Math.min(limits.z,p.z+dz));
  if(!blocked(p.x,z))p.z=z;
  return p;
}
export function nearby(p){
  if(p.z>-2.1&&p.z<.35&&Math.abs(p.x)<3.2)return 'catalog';
  if(Math.hypot(p.x-5.4,p.z-6.2)<2)return 'home';
  return null;
}
export function safeDestination(kind){
  const destinations={catalog:'https://pazneria.github.io/lab/',home:'https://pazneria.github.io/'};
  if(!Object.hasOwn(destinations,kind))throw new TypeError('Unknown room destination');
  const url=new URL(destinations[kind]);
  if(url.protocol!=='https:'||url.hostname!=='pazneria.github.io'||url.username||url.password||url.search||url.hash)throw new TypeError('Unsafe destination');
  return url.href;
}

// Route planning uses the same furniture footprints as manual movement. A small
// extra clearance keeps smoothed paths away from corners; no diagonal cuts.
const clearance=limits.radius+.035,spacing=.22;
export const approaches=Object.freeze({catalog:{x:.55,z:-.85,yaw:0},home:{x:5.4,z:5.9,yaw:Math.PI}});
export function walkable(p){return Number.isFinite(p.x)&&Number.isFinite(p.z)&&Math.abs(p.x)<=limits.x&&Math.abs(p.z)<=limits.z&&!obstacles.some(b=>p.x>=b.x1-clearance&&p.x<=b.x2+clearance&&p.z>=b.z1-clearance&&p.z<=b.z2+clearance);}
export function segmentFree(a,b){
  if(!walkable(a)||!walkable(b))return false;
  // Slab intersection against each expanded rectangle, including its boundary.
  return !obstacles.some(o=>{
    let lo=0,hi=1;
    for(const [start,delta,min,max] of [[a.x,b.x-a.x,o.x1-clearance,o.x2+clearance],[a.z,b.z-a.z,o.z1-clearance,o.z2+clearance]]){
      if(Math.abs(delta)<1e-9){if(start<min||start>max)return false;}
      else{const t1=(min-start)/delta,t2=(max-start)/delta;lo=Math.max(lo,Math.min(t1,t2));hi=Math.min(hi,Math.max(t1,t2));if(lo>hi)return false;}
    }
    return true;
  });
}
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
let grid;
function routeGrid(){
  if(grid)return grid;
  const nx=Math.floor(limits.x*2/spacing)+1,nz=Math.floor(limits.z*2/spacing)+1,nodes=[];
  for(let z=0;z<nz;z++)for(let x=0;x<nx;x++){const p={x:-limits.x+x*spacing,z:-limits.z+z*spacing};nodes.push(walkable(p)?p:null);}
  const edges=nodes.map((p,i)=>{if(!p)return [];const x=i%nx,z=Math.floor(i/nx),list=[];for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dz||x+dx<0||x+dx>=nx||z+dz<0||z+dz>=nz)continue;const j=i+dx+dz*nx;if(nodes[j]&&segmentFree(p,nodes[j]))list.push(j);}return list;});
  return grid={nodes,edges};
}
export function planRoute(start,requested,{approach=false}={}){
  if(!walkable(start)||!Number.isFinite(requested?.x)||!Number.isFinite(requested?.z)||Math.abs(requested.x)>limits.x+.4||Math.abs(requested.z)>limits.z+.4)return null;
  const {nodes,edges}=routeGrid();let target={x:requested.x,z:requested.z};
  if(!walkable(target)){
    if(!approach)return null;
    // Furniture is approached from accessible floor, never entered. The room's
    // outer walls and windows are not projected into a different room.
    const candidates=nodes.filter(p=>p&&distance(p,target)<=1.8).sort((a,b)=>distance(a,target)+distance(a,start)*.025-distance(b,target)-distance(b,start)*.025);
    if(!candidates.length)return null;target={...candidates[0]};
  }
  if(segmentFree(start,target))return [target];
  const goals=new Set(nodes.flatMap((p,i)=>p&&distance(p,target)<spacing*2&&segmentFree(p,target)?[i]:[]));
  const cost=new Map(),previous=new Map(),open=[],closed=new Set();
  nodes.forEach((p,i)=>{if(p&&distance(p,start)<spacing*2&&segmentFree(start,p)){cost.set(i,distance(start,p));open.push(i);}});
  while(open.length){
    let best=0;for(let n=1;n<open.length;n++)if(cost.get(open[n])+distance(nodes[open[n]],target)<cost.get(open[best])+distance(nodes[open[best]],target))best=n;
    const current=open.splice(best,1)[0];if(closed.has(current))continue;
    if(goals.has(current)){
      const path=[target];let i=current;while(i!==undefined){path.unshift(nodes[i]);i=previous.get(i);}path.unshift({x:start.x,z:start.z});
      const smooth=[];let from=0;while(from<path.length-1){let to=path.length-1;while(to>from+1&&!segmentFree(path[from],path[to]))to--;smooth.push({...path[to]});from=to;}return smooth;
    }
    closed.add(current);
    for(const next of edges[current]){if(closed.has(next))continue;const value=cost.get(current)+distance(nodes[current],nodes[next]);if(value<(cost.get(next)??Infinity)){cost.set(next,value);previous.set(next,current);if(!open.includes(next))open.push(next);}}
  }
  return null;
}
export function followRoute(p,points,dt,gentle=false){
  let travel=Math.min(Math.max(dt,0),.05)*(gentle?1.3:3.1);
  while(points.length&&travel>0){const target=points[0],length=distance(p,target),step=Math.min(travel,length);if(length<1e-6){points.shift();continue;}const next={x:p.x+(target.x-p.x)*step/length,z:p.z+(target.z-p.z)*step/length};if(!segmentFree(p,next)){points.length=0;return 'blocked';}p.x=next.x;p.z=next.z;travel-=step;if(step===length)points.shift();}
  return points.length?'walking':'arrived';
}
