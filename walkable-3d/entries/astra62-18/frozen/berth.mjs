import {at,tilt,roll,basis,box,rod,path,lathe,ellipsoid,quad,curved,art,rectCollision,lamp,material} from './geometry.mjs';
import {M,TAU,pin,handle,drawer,sign,boardFrame,book,mug,pot,standingBooks} from './finish.mjs';
import {wall} from './hull.mjs';
import {cushion,bedCover,rug} from './textiles.mjs';
function bed(){
 // Recessed kick, stowage chassis and a soft, layered berth.
 box(0,.091,1.12,1.40,.182,2.04,M.iron,.033);
 box(0,.321,1.12,1.56,.345,2.21,M.deep,.041,.20);
 box(0,.473,1.14,1.623,.093,2.25,M.wood,.029,.20);
 for(const x of [-.394,.394]){drawer(x,.317,2.22,.735,.234,M.sea,false);handle(x,.349,2.240,.171);}
 for(const s of [-1,1])at(s*.780,0,1.14,s*Math.PI/2,()=>{
  for(const i of [-1,1]){drawer(i*.518,.315,0,.984,.23,M.blue,false);handle(i*.518,.344,.025,.17);}
 });
 rectCollision(0,1.14,1.62,2.26);
 box(0,.564,1.114,1.487,.184,2.145,M.bone,.074,.18);
 box(0,.544,1.114,1.492,.017,2.15,M.linen,.008,.22,false);
 bedCover();
 for(const s of [-1,1])tilt(s*.352,.726,.436,-.10,()=>cushion(0,0,0,.651,.179,.449,s>0?M.linen:M.pillow,M.bone,s*.055));
 tilt(-.43,.78,.681,-.26,()=>cushion(0,0,0,.414,.205,.273,M.tealWool,M.ochre,-.15));
 // Upholstered head panels and a solid-oak cap run behind the pillows.
 box(0,.83,.079,1.674,.722,.159,M.walnut,.031);
 for(const s of [-1,1])box(s*.398,.878,.154,.776,.508,.094,M.pad,.040);
 box(0,1.176,.106,1.765,.044,.225,M.wood,.016);
}
function shade(){
 // Articulated brass bedside lamp, broad shade and ceramic socket.
 lathe(0,0,0,[[.005,.002],[.11,.002],[.115,.011],[.105,.022],[.036,.028],[.026,.040]],M.brass);
 rod([0,.031,0],[0,.316,0],.015,M.bronze);
 rod([0,.296,0],[.079,.411,.039],.012,M.brass);
 ellipsoid(.082,.412,.040,.032,.030,.032,M.bronze);
 tilt(.093,.425,.052,-.18,()=>{
 lathe(0,0,0,[[.017,.020],[.041,.020],[.083,-.047],[.095,-.092],[.095,-.104],[.085,-.104],[.033,-.041]], [M.brass,M.sea,M.sea,M.brass,M.brass,M.cream],32);
 lathe(0,-.091,0,[[.082,0],[.001,0]],M.lamp,30);
 });
 lamp([.093,.308,.06],[1,.64,.31],.60,2.0,[.08,-1,.21],.075);
}
function bedside(){
 at(1.13,0,.43,0,()=>{
 box(0,.194,0,.56,.353,.60,M.deep,.024);
 box(0,.45,0,.591,.22,.626,M.blue,.022);drawer(0,.446,.315,.526,.17,M.sea);
 box(0,.609,0,.623,.081,.665,M.wood,.023,.081);
 rectCollision(0,0,.64,.68);
 at(-.129,.654,-.110,-.6,shade);
 book(.108,.653,.055,.207,.031,.28,M.rust,-.09);
 book(.102,.686,.059,.176,.021,.235,M.deep,.034,true);
 });
 at(-1.22,0,.245,0,()=>{
 box(0,.516,0,.677,.083,.42,M.wood,.022);
 box(0,.339,-.12,.066,.293,.107,M.gun,.008);
 rectCollision(0,0,.72,.47);
 mug(.20,.559,.056,.046,M.porcelain,1.1);
 standingBooks(-.275,.560,-.03,4,2);
 });
}
function alcove(){
 wall(-1,2.75,()=>{
 box(0,1.235,.032,3.53,1.74,.055,M.walnut,.018);
 for(let i=0;i<49;i++){
  const x=-1.715+i*.07145;
  box(x,1.248,.074,.056,1.683,.060,i%4===1?M.woodDark:i%3===1?M.walnut:M.wood,.008,.56);
 }
 box(0,2.105,.175,3.62,.112,.350,M.blue,.027);
 box(0,2.038,.178,3.46,.027,.258,M.wood,.008);
 box(0,2.019,.170,3.255,.016,.038,M.warm,.004,.5,false);
 for(const x of [-.98,0,.98])lamp([x,1.963,.23],[1,.67,.38],.65,2.9,[0,-.87,.32],.29);
 boardFrame(1,.01,1.61,.109,1.213,.644);
 // Small domestic snapshots in contrasting frames.
 boardFrame(11,-1.224,1.349,.120,.344,.421);
 bed();bedside();
 for(const x of [-1.34,-.45,.45,1.34]){
  box(x,2.286,.055,.864,.265,.206,M.sand,.016);
  box(x,2.168,.147,.20,.014,.033,M.iron,.004);
 }
 });
 rug(-1.14,2.74,3.24,2.33,M.carpet,M.ochre);
}
function jacket(){
 const canvas=material('648078',3),hem=material('3d5a55',3);
 // A soft survey jacket hangs from a timber hanger in the open locker.
 rod([0,1.916,0],[0,1.84,0],.008,M.nickel);
 path([[0,1.84,0],[-.222,1.734,0],[.222,1.734,0],[0,1.84,0]],.014,M.wood,8);
 const shape=(s,t,back=false)=>{
  const a=s*2-1,wide=.162+.044*Math.sin(t*2.16)+.015*Math.sin(Math.PI*t*3)*t;
  const x=a*wide+.013*Math.sin(t*3.6);
  const y=1.806-.643*t-.060*Math.pow(Math.abs(a),1.6)*(1-t)+.014*Math.sin(a*7+.8)*t**3;
  const z=(back?-.036:.038)+.012*Math.cos(a*3)+.014*Math.sin(a*12+t*4)*(t*.6+.4)+.004*Math.sin(a*24-4*t);
  return [x,y,z];};
 for(const back of [true,false])curved(28,26,(s,t)=>shape(s,t,back),canvas,(s,t)=>[s*.43,t*.66],false,!back);
 for(const k of [0,1])curved(3,24,(s,t)=>{const p=shape(k,t,!!(s>.5));p[2]=shape(k,t,true)[2]+s*(shape(k,t,false)[2]-shape(k,t,true)[2]);return p;},canvas);
 for(const side of [-1,1]){
  curved(14,23,(s,t)=>{let a=s*TAU,r=.057-.014*t;
  return [side*(.175+.102*t+.024*Math.sin(t*4))+Math.cos(a)*r,1.757-.478*t+.012*Math.cos(a),.008+.045*t+.043*Math.sin(t*3)+r*Math.sin(a)*.84+.005*Math.sin(19*t+2*a)];},canvas,(s,t)=>[s*.35,t*.5],false,side<0);
  box(side*.106,1.476,.075,.099,.120,.012,hem,.008,1,false);
  box(side*.106,1.518,.085,.110,.035,.012,canvas,.006,1,false);
  quad([side*.140,1.780,.041],[side*.057,1.830,.035],[side*.010,1.730,.080],[side*.059,1.692,.084],hem,1,false);
 }
 let pts=[];for(let i=0;i<=20;i++){let p=shape(.50,i/20);p[2]+=.004;pts.push(p);}path(pts,.0036,M.brass,6);
 art(8,[-.102,1.60,.083],[.071,0,0],[0,.072,0]);
}
function lockers(){
 wall(1,3.43,()=>{
 box(0,1.18,.118,3.17,2.32,.212,M.deep,.032);
 box(0,2.23,.277,3.23,.12,.514,M.light,.022);
 box(0,.128,.266,3.20,.213,.508,M.iron,.023);
 box(0,.269,.277,3.2,.087,.545,M.wood,.018);
 // Forward bay is open; two neighbouring cabinets have recessed door pulls.
 at(-1.008,0,.13,0,()=>{
 box(0,1.268,.022,1.00,1.85,.055,M.woodDark,.015);
 for(const side of [-1,1])box(side*.52,1.24,.140,.055,1.94,.35,M.gun,.011);
 rod([-.483,1.917,.131],[.488,1.917,.131],.014,M.steel);
 at(-.098,0,.144,.07,jacket);
 box(0,.779,.122,.990,.042,.305,M.wood,.009);
 // Two folded wool sweaters on the lower shelf.
 for(let k=0;k<2;k++)box(-.17,.846+k*.082,.155,.446,.078,.224,k?M.mintWool:M.linen,.031);
 book(.252,.805,.151,.155,.038,.222,M.clay,.08);
 });
 for(let i=0;i<2;i++){
  const x=.026+i*1.032;
  box(x,1.234,.342,.984,1.821,.094,i===0?M.body:M.sand,.026);
  for(let k=0;k<5;k++)box(x,1.939+k*.032,.393,.330,.010,.006,M.gun,.002,1,false);
  box(x+.318,1.184,.397,.085,.248,.020,M.deep,.022);
  handle(x+.318,1.184,.404,.172,true);
  sign(i===0?6:8,x-.175,1.554,.397,i===0?.297:.121,i===0?.117:.129);
  box(x,.609,.394,.843,.009,.007,M.gun,0,1,false);
 }
 for(const x of [-1.03,0,1.03]){drawer(x,.195,.512,.943,.133,M.blue,false);}
 rectCollision(0,.25,3.23,.54);
 });
}
export function bedroom(){alcove();lockers();}
