import {colliders} from './claude11/colliders.mjs';
import {exhibits} from './claude11/layout.mjs';
import {exitLayout,exitStaticColliders,isOriginalDoorCollider,doorColliders,boundedProgress} from './production-exit.mjs';
export {exhibits};

// The floor and collider records come from the derivative's authored geometry.
// A small clearance protects the 30 cm player from numerical contact at corners.
export const limits=Object.freeze({x:12,z:12.35,minZ:-7,maxZ:12.35,radius:.30});
export const roomLayoutVersion='claude11-production-west-scenebench-2026-10-09';
export const clearance=limits.radius+.015;
export const obstacles=colliders;
export const collisionObstacles=Object.freeze([...colliders.filter(c=>!isOriginalDoorCollider(c)),...exitStaticColliders]);
let doorProgress={inner:0,outer:0},exitGates=[...doorColliders('inner'),...doorColliders('outer')];
export function setExitDoors(doors){
  const next={inner:boundedProgress(doors.inner),outer:boundedProgress(doors.outer)};
  if(next.inner===doorProgress.inner&&next.outer===doorProgress.outer)return;
  doorProgress=next;exitGates=[...doorColliders('inner',next.inner),...doorColliders('outer',next.outer)];grid=null;
}
export const approaches=Object.freeze(Object.fromEntries(Object.entries(exhibits).map(([id,value])=>[id,value.approach])));
export function spawn(){return {x:0,z:7.3,yaw:0,pitch:-.04,eye:1.62};}

export const navigationFloors=Object.freeze([
  {minX:-7,maxX:7,minZ:-7,maxZ:8.5},
  {minX:-12,maxX:12,minZ:-3.4,maxZ:3.4},
  ...exitLayout.floors,
]);
const floors=navigationFloors;
const finitePoint=p=>Number.isFinite(p?.x)&&Number.isFinite(p?.z);
const inFloor=p=>floors.some(f=>p.x>=f.minX&&p.x<=f.maxX&&p.z>=f.minZ&&p.z<=f.maxZ);
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

// Uniform spatial buckets keep movement and route checks local. The stamps avoid
// allocating a Set for the same collider spanning several neighbouring buckets.
const bucketSize=1,buckets=new Map(),stamps=new Uint32Array(collisionObstacles.length);
let stamp=0;
const bucketKey=(x,z)=>(z+32)*64+x+32;
function colliderBounds(c){return c.type==='circle'?{minX:c.x-c.r,maxX:c.x+c.r,minZ:c.z-c.r,maxZ:c.z+c.r}:c;}
for(let i=0;i<collisionObstacles.length;i++){
  const c=collisionObstacles[i],b=colliderBounds(c);
  if(!['box','circle'].includes(c.type)||![b.minX,b.maxX,b.minZ,b.maxZ].every(Number.isFinite)||b.minX>b.maxX||b.minZ>b.maxZ)throw new TypeError('Invalid production collider');
  for(let z=Math.floor((b.minZ-clearance)/bucketSize);z<=Math.floor((b.maxZ+clearance)/bucketSize);z++)for(let x=Math.floor((b.minX-clearance)/bucketSize);x<=Math.floor((b.maxX+clearance)/bucketSize);x++){
    const key=bucketKey(x,z);if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(i);
  }
}
function candidates(minX,maxX,minZ,maxZ){
  stamp=(stamp+1)>>>0;if(!stamp){stamps.fill(0);stamp=1;}
  const found=[];
  for(let z=Math.floor(minZ/bucketSize);z<=Math.floor(maxZ/bucketSize);z++)for(let x=Math.floor(minX/bucketSize);x<=Math.floor(maxX/bucketSize);x++)for(const i of buckets.get(bucketKey(x,z))||[]){
    if(stamps[i]!==stamp){stamps[i]=stamp;found.push(collisionObstacles[i]);}
  }
  return found;
}
function overlaps(p,c){
  if(c.type==='circle')return (p.x-c.x)**2+(p.z-c.z)**2<=(c.r+clearance)**2;
  const x=p.x-clamp(p.x,c.minX,c.maxX),z=p.z-clamp(p.z,c.minZ,c.maxZ);
  return x*x+z*z<=clearance*clearance;
}
export function walkable(p){return finitePoint(p)&&inFloor(p)&&!candidates(p.x,p.x,p.z,p.z).some(c=>overlaps(p,c))&&!exitGates.some(c=>overlaps(p,c));}
export function blocked(x,z){return !walkable({x,z});}

function rectInterval(a,b,rect){
  let lo=0,hi=1;
  for(const [start,delta,min,max] of [[a.x,b.x-a.x,rect.minX,rect.maxX],[a.z,b.z-a.z,rect.minZ,rect.maxZ]]){
    if(Math.abs(delta)<1e-12){if(start<min||start>max)return null;}
    else{const t1=(min-start)/delta,t2=(max-start)/delta;lo=Math.max(lo,Math.min(t1,t2));hi=Math.min(hi,Math.max(t1,t2));if(lo>hi)return null;}
  }
  return [lo,hi];
}
function segmentInFloor(a,b){
  const intervals=floors.map(f=>rectInterval(a,b,f)).filter(Boolean).sort((x,y)=>x[0]-y[0]);
  let covered=0;
  for(const [lo,hi] of intervals){if(lo>covered+1e-10)return false;covered=Math.max(covered,hi);if(covered>=1-1e-10)return true;}
  return false;
}
function hitsCircle(a,b,x,z,r){
  const dx=b.x-a.x,dz=b.z-a.z,length=dx*dx+dz*dz;
  const t=length?clamp(((x-a.x)*dx+(z-a.z)*dz)/length,0,1):0;
  return (a.x+t*dx-x)**2+(a.z+t*dz-z)**2<=r*r;
}
function hitsCollider(a,b,c){
  if(c.type==='circle')return hitsCircle(a,b,c.x,c.z,c.r+clearance);
  // Minkowski sum of a rectangle and the player disk: two slabs + four rounded
  // corners. Expanding a square AABB would unnecessarily close real aisles.
  if(rectInterval(a,b,{minX:c.minX-clearance,maxX:c.maxX+clearance,minZ:c.minZ,maxZ:c.maxZ})||
     rectInterval(a,b,{minX:c.minX,maxX:c.maxX,minZ:c.minZ-clearance,maxZ:c.maxZ+clearance}))return true;
  for(const x of [c.minX,c.maxX])for(const z of [c.minZ,c.maxZ])if(hitsCircle(a,b,x,z,clearance))return true;
  return false;
}
export function segmentFree(a,b){
  if(!walkable(a)||!walkable(b)||!segmentInFloor(a,b))return false;
  return !candidates(Math.min(a.x,b.x),Math.max(a.x,b.x),Math.min(a.z,b.z),Math.max(a.z,b.z)).some(c=>hitsCollider(a,b,c))&&!exitGates.some(c=>hitsCollider(a,b,c));
}

function contactNormal(p,c,from){
  let x,z;
  if(c.type==='circle'){x=p.x-c.x;z=p.z-c.z;}
  else{
    x=p.x-clamp(p.x,c.minX,c.maxX);z=p.z-clamp(p.z,c.minZ,c.maxZ);
    if(Math.abs(x)+Math.abs(z)<1e-10){
      const faces=[{distance:p.x-c.minX,x:-1,z:0},{distance:c.maxX-p.x,x:1,z:0},{distance:p.z-c.minZ,x:0,z:-1},{distance:c.maxZ-p.z,x:0,z:1}];
      faces.sort((a,b)=>a.distance-b.distance);return faces[0];
    }
  }
  const length=Math.hypot(x,z);if(length>1e-10)return {x:x/length,z:z/length};
  const dx=from.x-p.x,dz=from.z-p.z,d=Math.hypot(dx,dz)||1;return {x:dx/d,z:dz/d};
}
function moveStep(p,dx,dz){
  const next={x:p.x+dx,z:p.z+dz};
  if(segmentFree(p,next)){p.x=next.x;p.z=next.z;return;}
  let sx=dx,sz=dz;
  for(const c of [...candidates(next.x,next.x,next.z,next.z),...exitGates])if(overlaps(next,c)){
    const normal=contactNormal(next,c,p),into=sx*normal.x+sz*normal.z;
    if(into<0){sx-=normal.x*into;sz-=normal.z*into;}
  }
  const slide={x:p.x+sx,z:p.z+sz};
  if(segmentFree(p,slide)){p.x=slide.x;p.z=slide.z;return;}
  // A second obstacle can block a projected tangent. Test each remaining axis
  // continuously, preferring the larger component; never step across a corner.
  const axes=Math.abs(dx)>=Math.abs(dz)?[{x:p.x+dx,z:p.z},{x:p.x,z:p.z+dz}]:[{x:p.x,z:p.z+dz},{x:p.x+dx,z:p.z}];
  for(const target of axes)if(segmentFree(p,target)){p.x=target.x;p.z=target.z;return;}
}
export function advance(p,actions,dt,gentle=false){
  if(!walkable(p)||!Number.isFinite(dt)||dt<=0)return p;
  const step=Math.min(dt,.05),crouch=actions.has('crouch')||p.crouch===true;
  const speed=(gentle?1.3:actions.has('sprint')?4.6:2.5)*(crouch?.55:1);
  p.yaw=(Number.isFinite(p.yaw)?p.yaw:0)+(Number(actions.has('turnLeft'))-Number(actions.has('turnRight')))*step*(gentle?.9:1.5);
  const forward=Number(actions.has('forward'))-Number(actions.has('backward')),side=Number(actions.has('right'))-Number(actions.has('left')),norm=Math.hypot(forward,side)||1;
  const wantedX=(-Math.sin(p.yaw)*forward+Math.cos(p.yaw)*side)/norm*speed,wantedZ=(-Math.cos(p.yaw)*forward-Math.sin(p.yaw)*side)/norm*speed;
  const blend=1-Math.exp(-12*step);
  p.vx=(p.vx||0)+(wantedX-(p.vx||0))*blend;p.vz=(p.vz||0)+(wantedZ-(p.vz||0))*blend;
  if(!forward&&!side&&Math.hypot(p.vx,p.vz)<.001)p.vx=p.vz=0;
  const dx=p.vx*step,dz=p.vz*step;
  const count=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.06));
  for(let i=0;i<count;i++)moveStep(p,dx/count,dz/count);
  settleEye(p,step,crouch);
  return p;
}
export function settleEye(p,dt,crouch=p.crouch===true){
  if(!Number.isFinite(dt)||dt<=0)return;
  const target=crouch?1:1.62;
  p.eye=(p.eye??1.62)+(target-(p.eye??1.62))*(1-Math.exp(-10*Math.min(dt,.05)));
  if(Math.abs(p.eye-target)<.002)p.eye=target;
}
export function nearby(p){
  if(!finitePoint(p))return null;
  for(const [id,radius] of [['character',1.1],['worlds',1.25],['catalog',1.1],['home',.9],['animation',.8]])if(distance(p,approaches[id])<radius)return id;
  return null;
}
export function safeDestination(kind){
  const destinations={catalog:'https://pazneria.github.io/lab/',home:'https://pazneria.github.io/'};
  if(!Object.hasOwn(destinations,kind))throw new TypeError('Unknown room destination');
  const url=new URL(destinations[kind]);
  if(url.protocol!=='https:'||url.hostname!=='pazneria.github.io'||url.username||url.password||url.search||url.hash)throw new TypeError('Unsafe destination');
  return url.href;
}

// Grid is created only when a click needs a detour. The graph is cached; a heap
// avoids scanning the entire open set on every A* iteration.
const spacing=.24,nx=Math.floor(24/spacing)+1,nz=Math.ceil((limits.maxZ-limits.minZ)/spacing)+1;
let grid;
function routeGrid(){
  if(grid)return grid;
  const nodes=new Array(nx*nz),edges=new Array(nx*nz);
  for(let z=0;z<nz;z++)for(let x=0;x<nx;x++){const p={x:-12+x*spacing,z:-7+z*spacing};nodes[x+z*nx]=walkable(p)?p:null;}
  return grid={nodes,edges};
}
function neighbours(index){
  const {nodes,edges}=routeGrid();if(edges[index])return edges[index];
  const x=index%nx,z=Math.floor(index/nx),out=[];
  for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){
    if(!dx&&!dz||x+dx<0||x+dx>=nx||z+dz<0||z+dz>=nz)continue;
    const next=index+dx+dz*nx;
    if(!nodes[next]||dx&&dz&&(!nodes[index+dx]||!nodes[index+dz*nx]))continue;
    if(segmentFree(nodes[index],nodes[next]))out.push(next);
  }
  return edges[index]=out;
}
function closeNodes(p,radius){
  const {nodes}=routeGrid(),out=[];
  const minX=clamp(Math.floor((p.x-radius+12)/spacing),0,nx-1),maxX=clamp(Math.ceil((p.x+radius+12)/spacing),0,nx-1);
  const minZ=clamp(Math.floor((p.z-radius+7)/spacing),0,nz-1),maxZ=clamp(Math.ceil((p.z+radius+7)/spacing),0,nz-1);
  for(let z=minZ;z<=maxZ;z++)for(let x=minX;x<=maxX;x++){const i=x+z*nx;if(nodes[i]&&distance(nodes[i],p)<=radius)out.push(i);}
  return out;
}
class Heap{
  values=[];
  push(value){const v=this.values;v.push(value);let i=v.length-1;while(i){const parent=(i-1)>>1;if(v[parent].score<=value.score)break;v[i]=v[parent];i=parent;}v[i]=value;}
  pop(){const v=this.values,first=v[0],last=v.pop();if(v.length){let i=0;while(i*2+1<v.length){let child=i*2+1;if(child+1<v.length&&v[child+1].score<v[child].score)child++;if(v[child].score>=last.score)break;v[i]=v[child];i=child;}v[i]=last;}return first;}
}
function pathTo(start,target){
  if(segmentFree(start,target))return [{x:target.x,z:target.z}];
  const {nodes}=routeGrid(),goals=new Set(closeNodes(target,spacing*2).filter(i=>segmentFree(nodes[i],target)));
  if(!goals.size)return null;
  const cost=new Float64Array(nodes.length);cost.fill(Infinity);
  const previous=new Int32Array(nodes.length);previous.fill(-1);
  const closed=new Uint8Array(nodes.length),heap=new Heap();
  for(const i of closeNodes(start,spacing*2))if(segmentFree(start,nodes[i])){cost[i]=distance(start,nodes[i]);heap.push({index:i,score:cost[i]+distance(nodes[i],target)});}
  while(heap.values.length){
    const current=heap.pop().index;if(closed[current])continue;
    if(goals.has(current)){
      const path=[{x:target.x,z:target.z}];for(let i=current;i!==-1;i=previous[i])path.unshift(nodes[i]);path.unshift(start);
      const smooth=[];let from=0;
      while(from<path.length-1){let to=path.length-1;while(to>from+1&&!segmentFree(path[from],path[to]))to--;smooth.push({...path[to]});from=to;}
      return smooth;
    }
    closed[current]=1;
    for(const next of neighbours(current))if(!closed[next]){
      const value=cost[current]+distance(nodes[current],nodes[next]);
      if(value<cost[next]){cost[next]=value;previous[next]=current;heap.push({index:next,score:value+distance(nodes[next],target)});}
    }
  }
  return null;
}
export function planRoute(start,requested,{approach=false}={}){
  if(!walkable(start)||!finitePoint(requested)||!inFloor(requested))return null;
  if(walkable(requested))return pathTo(start,requested);
  if(!approach)return null;
  const {nodes}=routeGrid(),options=closeNodes(requested,2.4);
  options.sort((a,b)=>distance(nodes[a],requested)-distance(nodes[b],requested)+(distance(nodes[a],start)-distance(nodes[b],start))*.025);
  // A nearest furniture-side point can be enclosed by another object; try the
  // other nearby floor points instead of silently abandoning a reachable prop.
  for(const i of options){const path=pathTo(start,nodes[i]);if(path)return path;}
  return null;
}
export function followRoute(p,points,dt,gentle=false){
  settleEye(p,dt);
  if(!walkable(p)||!Array.isArray(points)){if(Array.isArray(points))points.length=0;return 'blocked';}
  let travel=Number.isFinite(dt)?Math.min(Math.max(dt,0),.05)*(gentle?1.3:3.1):0;
  while(points.length&&travel>0){
    const target=points[0];if(!finitePoint(target)){points.length=0;return 'blocked';}
    const length=distance(p,target);if(length<1e-7){points.shift();continue;}
    const step=Math.min(travel,length),next={x:p.x+(target.x-p.x)*step/length,z:p.z+(target.z-p.z)*step/length};
    if(!segmentFree(p,next)){points.length=0;return 'blocked';}
    p.x=next.x;p.z=next.z;travel-=step;if(step===length)points.shift();
  }
  return points.length?'walking':'arrived';
}
