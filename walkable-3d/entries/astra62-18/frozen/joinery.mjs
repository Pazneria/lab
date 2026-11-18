import {box,at,tilt,rod,quad,art,rectCollision,lamp,curved,unit,sub,cross,mul,add} from './geometry.mjs';
import {M,pin,handle,sign} from './finish.mjs';
export function joinery(){
 // An oak privacy screen divides the berth from the chart table. Its slats
 // preserve the sightline up the cabin while sheltering the sleeping pocket.
 at(-1.878,0,.826,0,()=>{
  box(0,.115,0,1.553,.20,.195,M.iron,.014);
  box(0,.526,0,1.551,.697,.166,M.deep,.020);
  for(const s of [-1,1]){
   box(0,.521,s*.084,1.419,.569,.018,M.sea,.009);
   box(0,.295,s*.096,1.329,.012,.007,M.bronze,.002,1,false);
  }
  box(0,.900,0,1.581,.069,.241,M.wood,.017);
  box(0,2.484,0,1.575,.073,.182,M.gun,.015);
  for(const s of [-1,1]){
   box(s*.756,1.673,0,.062,1.511,.172,M.bronze,.013);
   for(const y of [.224,.804,2.47])pin(s*.748,y,.101,.011,M.nickel);
  }
  for(let i=0;i<11;i++)at(-.666+i*.133,0,0,-.27,()=>{
   box(0,1.695,0,.048,1.484,.140,i%4===1?M.walnut:M.wood,.012,.24);
   for(const h of [.944,2.444])rod([0,h-.015,0],[0,h+.015,0],.018,M.brass,10);
  });
  rectCollision(0,0,1.598,.251);
 });
 // Two removable overhead air-return cassettes, with inset baffles and screws.
 for(const [x,z] of [[1.70,3.16],[-1.66,-2.80]]){
  box(x,2.773,z,.417,.034,.879,M.gun,.014);
  box(x,2.753,z,.366,.014,.807,M.iron,.006);
  for(let i=0;i<12;i++)tilt(x,2.746,z-.347+i*.063,.39,()=>box(0,0,0,.333,.011,.039,M.steel,.003,1,false));
  for(const s of [-1,1])for(const k of [-1,1])rod([x+s*.187,2.752,z+k*.409],[x+s*.187,2.746,z+k*.409],.007,M.nickel,8);
 }
 // A low-level reading lamp in the observation couch's end jamb.
 at(-2.946,0,-4.234,Math.PI/2,()=>{
  box(0,1.588,.016,.174,.305,.053,M.gun,.024);
  box(0,1.575,.056,.108,.155,.046,M.bronze,.016);
  box(0,1.555,.083,.061,.096,.012,M.cream,.005);
  for(let i=0;i<4;i++)box(0,1.526+i*.020,.091,.052,.007,.006,M.lamp,0,1,false);
  lamp([0,1.52,.112],[1,.72,.40],.34,1.65,[0,-.68,.75],.06);
 });
}
export function rugTrim(){
 at(-1.14,.026,2.74,0,()=>{
  // Broken lozenges are individually woven into the carpet's broad end border.
  for(const s of [-1,1])for(let i=0;i<19;i++){
   const x=-1.444+i*.160,z=s*.983;
   const a=[x-.043,0,z],b=[x,-.0002,z-.032],c=[x+.043,0,z],d=[x,.0002,z+.032];
   quad(a,d,c,b,i%3===0?M.ochre:M.cord,1,false);
  }
  // Short, closely cropped warp fringe along both ends.
  for(const s of [-1,1])for(let i=0;i<79;i++){
   const x=-1.541+i*.0394,z=s*1.159,l=.021+.009*Math.cos(i*2.31);
   quad([x-.005,-.014,z],[x+.005,-.014,z],[x+.008,-.021,z+s*l],[x-.003,-.021,z+s*l],M.linen,1,false);
  }
 });
}
export function openJournal(){
 // Two gently cambered signatures meet at the gutter. Each has its own print
 // coordinates, so ink and page curvature agree at close range.
 at(1.171,.822,.765,-.107,()=>{
  box(0,.007,0,.462,.014,.274,M.rust,.005,1,false);
  const tile=5,col=tile%4,row=Math.floor(tile/4);
  for(const s of [-1,1]){
   const p=(u,t)=>{const k=s<0?1-u:u;
    return [(u+(s<0?-1:0))*.221,.026+.025*Math.sin(k*Math.PI)**.74+.005*k+.003*Math.sin(t*Math.PI)*k,(.5-t)*.253+.003*Math.sin(k*Math.PI)*(t-.5)];};
   // Paper edges appear as a stack under the bowed top leaves.
   for(let j=0;j<14;j++){
    const a=p(j/14,0),b=p((j+1)/14,0),c=p(j/14,1),d=p((j+1)/14,1);
    quad([a[0],.014,a[2]],[b[0],.014,b[2]],b,a,M.paperEdge,1,false);
    quad([d[0],.014,d[2]],[c[0],.014,c[2]],c,d,M.paperEdge,1,false);
   }
   const end=s<0?0:1,a=p(end,0),b=p(end,1);
   quad([a[0],.014,a[2]],[b[0],.014,b[2]],b,a,M.paperEdge,1,false);
   for(let j=0;j<3;j++)box(s*.221,.017+j*.004,0,.0008,.0007,.250,M.woodDark,0,1,false);
   const uvf=(u,t)=>[(col+.009+.982*((s<0?0:.5)+.5*u))/4,(row+.009+.982*(1-t))/4];
   curved(20,9,p,{c:[255,255,255],kind:12},uvf,false);
  }
  quad([.082,.018,.123],[.091,.018,.123],[.082,.011,.166],[.073,.011,.161],M.tealWool,1,false);
 });
}
