import {M, TAU, box, solid, plane, rod, screw, tube, torus, beam, band, oct, art, zone, light, obstacle, occlude, place, face, lathe, ellipsoid, tint, rand, range, add, mul, mix} from './geometry.mjs';
export const P={hull:'a3b7ad',pale:'c6c9b2',bone:'dcd8bc',green:'65877f',blue:'355953',dark:'243e3c',iron:'404e4b',rubber:'26322f', red:'9c4e3b',cream:'e3d9b8',brass:'b39c65',nickel:'a6b0a3',floor:'707c72',wood:'ab8056',lamp:'ffe4ad'};
const {hull,pale,bone,green,blue,dark,iron,rubber,red,cream,brass,nickel,floor,wood,lamp}=P;
const rooms=[
 {name:'living',hw:3.75,a:-1.45,b:5.3,h:2.94},
 {name:'work',hw:3.3,a:-4.75,b:-1.45,h:2.85},
 {name:'observation',hw:3.20,a:-8.12,b:-4.75,h:3.0}];
export function wallLamp(x,y,z,side=1){
 // Local back at negative Z; the perforated guard stands clear of the opal lens.
 place([x,y,z],side*Math.PI/2,()=>{
  box([0,0,.015],[.24,.43,.055],dark,M.PAINT,.043);
  box([0,0,.061],[.183,.345,.065],brass,M.BRASS,.04);
  box([0,0,.096],[.139,.285,.073],'ffe7b6',M.LAMP,.051);
  for(let k of [-1,0,1])tube([[-.091,k*.085,.084],[-.084,k*.085,.129],[-.060,k*.085,.145],[.060,k*.085,.145],[.084,k*.085,.129],[.091,k*.085,.084]],.0065,brass,M.BRASS,8);
  for(let xx of [-.079,.079])for(let yy of [-.17,.17])screw([xx,yy,.049],[0,0,1],.010);
  light([0,0,.18],[1,.72,.39],1.08,4.9,.13,[0,.07,1]);
 });
}
function wallBay(s,x,z,len,h,lab){
 const xo=x-s*.018;
 // The dark grooves between panels are actual gaps backed by the pressure hull.
 box([x-s*.024,h*.5,z],[.12,h,len],dark,M.PAINT);
 box([xo,.40,z],[.094,.76,len-.018],lab?'688980':blue,M.PAINT,.013);
 box([xo,1.75,z],[.075,1.90,len-.019],lab?'b7c5b7':hull,M.PAINT,.015);
 box([x+s*.035,.84,z],[.048,.098,len-.004],lab?green:dark,M.PAINT,.008);
 box([x+s*.059,.876,z],[.011,.016,len-.015],lab?cream:brass,M.METAL,.002);
 box([x+s*.043,.108,z],[.15,.19,len-.006],dark,M.RUBBER,.023);
 for(const zz of [-1,1])for(const yy of [.19,.70,1.00,2.55])screw([x+s*.036,yy,z+zz*(len/2-.074)],[s,0,0],.012,'939d90');
}
function floorDeck(r){
 const w=2*r.hw,depth=r.b-r.a,cz=(r.a+r.b)*.5;
 box([0,-.098,cz],[w+.13,.16,depth+.02],rubber,M.RUBBER);
 const nx=r.name==='living'?5:4,nz=Math.ceil(depth/1.48);
 const tileCols=r.name==='living'?['859084','899285','828c80']:['738880','798d85','7c9087'];
 for(let iz=0;iz<nz;iz++)for(let ix=0;ix<nx;ix++){
  let x=-r.hw+(ix+.5)*w/nx,z=r.a+(iz+.5)*depth/nz,col=tileCols[(iz+ix*2)%3];
  box([x,-.020,z],[w/nx-.012,.036,depth/nz-.010],col,M.DECK,.005,.26);
 }
 // Flush insulated service channels follow the edges of the rooms.
 for(let s of [-1,1]){
  box([s*(r.hw-.26),.003,cz],[.24,.012,depth-.02],iron,M.METAL,.005);
  for(let k=0;k<Math.floor(depth/.129);k++){
   let z=r.a+.07+.129*k;
   let x=s*(r.hw-.26),top=.0101;
   face([[-.077,-.005],[-.071,-.011],[.071,-.011],[.077,-.005],[.077,.005],[.071,.011],[-.071,.011],[-.077,.005]].map(([dx,dz])=>[x+dx,top,z+dz]),rubber,M.RUBBER,[0,1,0]);
  }
 }
}
function roomShell(r) {
 zone(r.name);
 let cz=(r.a+r.b)*.5,depth=r.b-r.a,w=r.hw;
 floorDeck(r);
 const bays=Math.ceil(depth/1.72);
 for(let s of [-1,1]){
  let x=-s*w;
  for(let i=0;i<bays;i++)wallBay(s,x,r.a+(i+.5)*depth/bays,depth/bays,r.h,r.name==='work');
  obstacle([x-s*.1,1.4,cz],[.22,2.8,depth+.08]);
  // The angled shoulder under each deckhead hides electrical and air services.
  place([x+s*.145,r.h-.14,cz],[0,0,s*Math.PI/4],()=>box([0,0,0],[.52,.15,depth+.01],pale,M.PAINT,.018));
  box([x+s*.16,r.h-.22,cz],[.14,.115,depth+.01],green,M.PAINT,.015);
 }
 box([0,r.h+.043,cz],[2*w+.06,.12,depth+.1],pale,M.PAINT,.015,.27);
 for(let i=0;i<=bays;i++){
  let z=r.a+i*depth/bays;
  box([0,r.h-.042,z],[2*w-.49,.083,.098],r.name==='observation'?green:hull,M.PAINT,.012);
  for(let s of [-1,1]){
   beam([s*(w-.03),r.h-.43,z],[s*(w-.41),r.h-.042,z],.115,.1,green,M.PAINT,.016);
   box([s*(w-.025),r.h-.45,z],[.084,.12,.19],hull,M.PAINT,.01);
  }
 }
 // Two insulated service runs and a thinner copper return, with union collars.
 for(let [off,drop,rad,col] of [[.48,.16,.055,green],[.65,.137,.038,'a6a98e'],[.76,.117,.021,'96725a']]){
  let x=w-off,y=r.h-drop;
  rod([x,y,r.a+.02],[x,y,r.b-.02],rad,col,M.PAINT,16);
  for(let i=0;i<bays;i++){
   let z=r.a+(i+.43)*depth/bays;
   rod([x,y,z-.021],[x,y,z+.021],rad+.014,iron,M.METAL,16);
   rod([x,y,z-.006],[x,y,z+.006],rad+.017,'9ca693',M.METAL,16);
  }
 }
}
function endplate(xc,yc,w,h,z,c,blocking=true){
 solid([xc,yc,z],[w,h,.185],c,M.PAINT,.010,blocking,.20);
}
function threshold(z,cx,w){
 box([cx,.012,z],[w+.02,.045,.30],iron,M.METAL,.016);
 for(let k=-2;k<=2;k++)box([cx,.038,z+k*.045],[w-.09,.008,.009],nickel,M.METAL,.002);
}
function bulkhead(z,hw,h,cx,clearW,sign,farName){
 const clearH=2.40,w=clearW,lh=cx-w/2,rh=cx+w/2;
 endplate((-hw+lh)*.5,h*.5,hw+lh,h,z,sign===6?green:hull);
 endplate((hw+rh)*.5,h*.5,hw-rh,h,z,sign===6?green:hull);
 endplate(cx,(h+clearH)*.5,w, h-clearH,z,hull,false);
 // Frame has cropped upper corners and a low sill that a resident can step across.
 let inner=[[-w/2,0],[w/2,0],[w/2,.05],[w/2,clearH-.25],[w/2-.26,clearH],[-w/2+.26,clearH],[-w/2,clearH-.25],[-w/2,.05]];
 let outer=[[-w/2-.13,-.032],[w/2+.13,-.032],[w/2+.13,.07],[w/2+.13,clearH-.18],[w/2-.18,clearH+.13],[-w/2+.18,clearH+.13],[-w/2-.13,clearH-.18],[-w/2-.13,.07]];
 for(let side of [-1,1]){
  let zf=z+side*.146;
  if(side>0)band(cx,0,outer,zf,inner,zf,bone,M.PAINT);
  else band(cx,0,inner,zf,outer,zf,green,M.PAINT);
  band(cx,0,outer,z+side*.094,outer,zf,green,M.PAINT);
  for(let s of [-1,1])for(let yy of [.20,.92,1.68,2.16])screw([cx+s*(w/2+.073),yy,zf],[0,0,side],.016);
 }
 band(cx,0,inner,z+.146,inner,z-.146,iron,M.METAL);
 for(let s of [-1,1]){
  for(let y of [.65,1.56])box([cx+s*(w/2+.026),y,z+.155],[.074,.16,.034],red,M.PAINT,.008);
  box([cx+s*(w/2+.182),1.23,z+.134],[.038,1.94,.052],dark,M.RUBBER,.012);
 }
 threshold(z,cx,w);
 box([cx,2.66,z+.108],[1.39,.212,.043],dark,M.PAINT,.012);
 art(sign,[cx,2.66,z+.131],[1.29,0,0],[0,.181,0]);
 art(18,[cx,2.665,z-.099],[-1.38,0,0],[0,.185,0]);
 // Vertical compression seams and an inset low belt either side of the opening.
 for(let [a,b] of [[-hw,lh-.19],[rh+.19,hw]]){
  if(b-a<.18)continue;
  for(let side of [-1,1]){
   box([(a+b)/2,.42,z+side*.10],[b-a,.78,.025],sign===6?blue:green,M.PAINT,.006);
   box([(a+b)/2,.835,z+side*.107],[b-a,.052,.035],dark,M.PAINT,.005);
  }
  let count=Math.floor((b-a)/1.25);
  for(let j=1;j<=count;j++){
   let x=mix(a,b,j/(count+1));box([x,h/2,z+.099],[.012,h-.15,.008],iron,M.RUBBER,.002);
  }
 }
}
function entrance(){
 let z=5.30;
 endplate(0,1.48,7.5,2.96,z,green);
 place([.84,0,z-.105],Math.PI,()=>{
  let cy=1.23;
  const a=oct(1.82,2.52,.24),b=oct(1.65,2.40,.22),c=oct(1.52,2.26,.205),d=oct(1.47,2.20,.195);
  band(0,cy,a,.014,b,.06,blue);band(0,cy,b,.06,c,.091,bone);band(0,cy,c,.091,d,.078,rubber,M.RUBBER);
  face(d.map(([x,y])=>[x,cy+y,.077]),hull,M.PAINT,[0,0,1]);
  for(let s of [-1,1]){
   for(let y of [.48,1.42,2.02]){
    box([s*.758,y,.115],[.19,.095,.085],iron,M.METAL,.019);
    rod([s*.80,y-.079,.165],[s*.80,y+.079,.165],.026,brass,M.BRASS,12);
   }
  }
  let p=[-.04,1.12,.17];
  rod([p[0],p[1],.088],p,.077,iron,M.METAL,20);
  torus(p,[0,0,1],.203,.024,red,M.PAINT,40,10);
  for(let j=0;j<3;j++){let a=j*TAU/3;rod(p,[p[0]+.19*Math.cos(a),p[1]+.19*Math.sin(a),p[2]],.013,red,M.PAINT);}
  rod(p,add(p,[0,0,.027]),.041,nickel,M.METAL,8);
  art(5,[0,1.85,.082],[1.05,0,0],[0,.43,0]);
  box([0,2.02,.092],[1.18,.012,.012],cream,M.PAINT);
 });
 // Identification stencil and utility locker on aft wall.
 art(1,[-1.68,1.71,z-.101],[-1.37,0,0],[0,.70,0]);
 for(let x of [-3.20,-2.45,2.55,3.36])box([x,1.4,z-.101],[.014,2.75,.014],blue,M.RUBBER,.002);
 wallLamp(2.27,1.84,z-.11,2);
}
function windowAssembly(){
 const z=-8.12,cy=1.62;
 const outer=oct(6.03,2.57,.38,.32), flange=oct(5.86,2.42,.35,.29), reveal=oct(5.44,2.03,.29,.24), throat=oct(5.1,1.70,.27,.22), rim=oct(5.01,1.61,.245,.21), opening=oct(4.94,1.545,.235,.195);
 band(0,cy,oct(6.40,3.26,0),z+.015,outer,z+.015,hull);
 band(0,cy,outer,z+.012,outer,z+.127,dark,M.METAL);
 band(0,cy,outer,z+.127,flange,z+.185,'aeb9a7');
 band(0,cy,flange,z+.185,reveal,z+.185,'688880');
 band(0,cy,reveal,z+.185,oct(5.37,1.96,.285,.23),z+.153,bone);
 band(0,cy,oct(5.37,1.96,.285,.23),z+.153,throat,z-.28,'96a69b',M.METAL,.15);
 band(0,cy,throat,z-.28,rim,z-.283,iron,M.PAINT);
 band(0,cy,rim,z-.283,opening,z-.313,rubber,M.RUBBER);
 band(0,cy,opening,z-.313,opening,z-.340,'79938a',M.DARKGLASS);
 band(0,cy,opening,z-.340,opening,z-.346,'354e48',M.RUBBER);
 band(0,cy,opening,z-.346,opening,z-.371,'6c9187',M.DARKGLASS);
 band(0,cy,opening,z-.371,opening,z-.380,'435e58',M.DARKGLASS);
 const far=oct(4.89,1.505,.226,.19);
 band(0,cy,opening,z-.38,far,z-.40,'79a39b',M.DARKGLASS);
 face(far.map(([x,y])=>[x,cy+y,z-.402]),'92c8bd',M.GLASS,[0,0,1]);
 // Compression bolts sit on separate washers with dark recessed sockets.
 function stud(x,y,r=.029){
  const b=[x,y,z+.187];
  rod(b,add(b,[0,0,.007]),r*1.45,'344d48',M.RUBBER,18);
  rod(add(b,[0,0,.005]),add(b,[0,0,.011]),r*1.30,'afb4a1',M.METAL,16);
  rod(add(b,[0,0,.011]),add(b,[0,0,.039]),r,'88978b',M.METAL,6);
  rod(add(b,[0,0,.039]),add(b,[0,0,.040]),r*.47,'344940',M.METAL,6);
 }
 for(let s of [-1,1]){
  for(let j=-6;j<=6;j++)stud(j*.378,cy+s*1.114);
  for(let j=-2;j<=2;j++)stud(s*2.818,cy+j*.348);
  for(let sy of [-1,1])stud(s*2.657,cy+sy*.971);
 }
 // Torque witness marks cross the head and washer. The laminated lite carries a maker's etch.
 for(let [x,y] of [[-.756,cy-1.114],[1.512,cy-1.114],[2.818,cy+.348],[-2.818,cy-.348]]){
  box([x+.014,y,z+.228],[.029,.006,.002],'d9c897',M.PAINT,.0008);
  box([x+.038,y,z+.199],[.011,.006,.002],'d9c897',M.PAINT,.0008);
 }
 art(25,[1.97,cy-.622,z-.399],[.472,0,0],[0,.108,0],216);
 art(26,[-1.17,cy-1.079,z+.1865],[.50,0,0],[0,.099,0]);
 art(26,[2.835,cy-.17,z+.1865],[.139,0,0],[0,.168,0]);
 // The sight line runs continuously across the fixed surround and the removable retaining ring.
 for(const s of [-1,1])for(const t of [-1,1]){
  let px=s*2.63,py=cy+t*1.039;
  place([px,py,z+.188],[0,0,-s*t*.53],()=>{
   box([0,0,.003],[.089,.013,.004],'b9bd9f',M.PAINT,.001);
  });
 }
 // Four box-section knees transfer the flange into the deck and deckhead.
 for(let s of [-1,1]){
  let x=s*2.91;
  solid([x,.245,z+.19],[.37,.49,.36],green,M.PAINT,.029);
  beam([x,.20,z+.44],[x,.73,z+.134],.238,.18,green,M.PAINT,.022);
  box([x,.045,z+.22],[.54,.08,.63],iron,M.METAL,.014);
  for(let dx of [-.191,.191])screw([x+dx,.086,z+.431],[0,1,0],.026);
  beam([s*3.07,2.88,z+.42],[s*2.74,2.66,z+.15],.21,.15,green,M.PAINT,.015);
 }
 // A raised toe board below the glass protects its lower sealing surface.
 box([0,.126,z+.081],[5.52,.23,.224],dark,M.PAINT,.025);
 box([0,.244,z+.10],[5.50,.030,.22],iron,M.METAL,.008);
 for(let i=0;i<20;i++)box([-2.43+i*.113,.13,z+.196],[.057,.081,.008],rubber,M.RUBBER,.007);
 box([1.76,.387,z+.137],[.79,.126,.038],brass,M.BRASS,.012);
 art(8,[1.76,.387,z+.158],[.722,0,0],[0,.103,0]);
 // Outer cold-light jambs, visible at oblique angles through the laminate.
 band(0,cy,oct(5.52,2.09,.28),z-.49,far,z-.49,'344f50',M.METAL);
 obstacle([0,1.45,z-.04],[6.44,2.9,.16]);
 occlude([0,.30,z],[6.4,.56,.26]);
 occlude([0,2.93,z],[6.4,.35,.24]);
 for(let s of [-1,1])occlude([s*2.99,1.6,z],[.37,2.62,.27]);
 for(let x of [-1.62,0,1.62])light([x,1.72,z-.27],[.23,.67,.75],1.22,5.4,.55,[0,0,1]);
}
export function ceilingLight(x,y,z,len=1.1){
 box([x,y+.031,z],[len+.13,.087,.213],dark,M.PAINT,.025);
 box([x,y-.013,z],[len+.04,.061,.17],brass,M.METAL,.02);
 box([x,y-.046,z],[len,.054,.126],'ffebca',M.LAMP,.018);
 for(let s of [-1,1])box([x+s*len*.49,y-.031,z],[.044,.086,.184],green,M.PAINT,.009);
 light([x,y-.11,z],[1,.83,.61],1.52,5.1,.34,[0,-1,0]);
}
export function buildArchitecture(){
 for(let r of rooms)roomShell(r);
 zone('living');entrance();zone('hatch01');bulkhead(-1.45,3.75,2.94,.68,2.48,6,'work');zone('living');
 // Practical fixtures are also the origins of the precomputed light sources.
 ceilingLight(1.13,2.83,4.62,.88);ceilingLight(.68,2.83,-.71,.97);
 wallLamp(-3.682,1.76,3.47,1);
 wallLamp(3.682,1.83,.08,-1);
 zone('hatch02');bulkhead(-4.75,3.30,2.88,1.28,2.07,7,'observation');zone('work');
 ceilingLight(1.29,2.74,-3.47,1.03);
 zone('observation');windowAssembly();wallLamp(-3.13,1.70,-6.46,1);
 wallLamp(3.13,1.75,-5.58,-1);
}

