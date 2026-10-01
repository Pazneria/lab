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
export function blocked(x,z){return obstacles.some(b=>x>b.x1-limits.radius&&x<b.x2+limits.radius&&z>b.z1-limits.radius&&z<b.z2+limits.radius);}
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
