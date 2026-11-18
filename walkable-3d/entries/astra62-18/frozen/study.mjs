import {box,quad,triangle,rod,path,at,tilt,roll,basis,lathe,ellipsoid,curved,art,rectCollision,lamp,material,add,mul,mix,unit,sub,cross} from './geometry.mjs';
import {M,TAU,pin,handle,drawer,sign,boardFrame,book,mug,pot,standingBooks} from './finish.mjs';
import {cushion} from './textiles.mjs';
import {wall} from './hull.mjs';
import {openJournal} from './joinery.mjs';
import {twoSided} from './geometry.mjs';
function chart(x,y,z,w,d,angle,tile=4){
 at(x,y,z,angle,()=>{
 box(0,.004,0,w,.008,d,M.paper,.003,1,false);
 art(tile,[0,.009,0],[w-.012,0,0],[0,0,-d+.012]);
 for(const k of [-1,1])box(k*w*.412,.017,-d*.495,.043,.019,.021,M.bronze,.004,1,false);
 });
}
function pencil(a,b){
 const v=unit(sub(b,a)),p=add(b,mul(v,-.020));rod(a,p,.0052,M.ochre,6);rod(p,b,.0052,M.wood,6,.0008);
 rod(a,add(a,mul(v,.015)),.0055,M.brass,9);
}
function dividers(x,y,z,angle){
 at(x,y,z,angle,()=>{
 for(const s of [-1,1]){
 rod([0,.015,-.076],[s*.046,.013,.054],.0065,M.brass,8,.004);
 rod([s*.046,.013,.054],[s*.058,.001,.084],.004,M.steel,7,.0006);
 }
 rod([0,.003,-.076],[0,.022,-.076],.016,M.gun,14);
 rod([-.024,.012,-.012],[.024,.012,-.012],.0028,M.steel,8);
 });
}
function orbitalInstrument(){
 // Recessed glass compass bowl in a brass gimbal.
 lathe(0,0,0,[[0,.001],[.069,.001],[.077,.011],[.078,.023],[.069,.033],[.060,.033],[.059,.023],[0,.023]], [M.walnut,M.bronze,M.brass,M.brass,M.brass,M.iron,M.deep],32);
 for(let k=0;k<16;k++)at(0,.026,0,k*TAU/16,()=>box(0,0,.047,.002,.001,k%4===0?.011:.006,M.paper,0,1,false));
 at(0,.031,0,.57,()=>{
 triangle([0,0,.052],[-.009,0,0],[.008,0,0],M.rust);
 triangle([0,0,-.052],[.008,0,0],[-.009,0,0],M.nickel);
 });
 ellipsoid(0,.033,0,.005,.004,.005,M.brass);
}
function monitor(){
 at(-.25,0,.195,0,()=>{
 box(0,.814,0,.424,.036,.205,M.gun,.014);
 rod([0,.827,0],[0,1.03,-.012],.032,M.steel,16);
 rod([-.181,1.035,-.003],[.181,1.035,-.003],.030,M.gun,16);
 tilt(0,1.220,.068,-.118,()=>{
 box(0,0,0,1.138,.578,.051,M.iron,.025);
 box(0,0,.029,1.099,.545,.012,M.gun,.012);
 art(2,[0,.003,.036],[1.065,0,0],[0,.496,0]);
 for(const k of [-1,1])pin(k*.542,-.252,.037,.006);
 box(.444,-.257,.038,.058,.008,.004,M.status,0,1,false);
 });
 });
}
function chair(){
 at(.135,0,1.545,-.20,()=>{
 lathe(0,0,0,[[.001,.003],[.263,.003],[.268,.016],[.245,.033],[.178,.043],[.089,.051],[.078,.104],[.051,.127],[.049,.365],[.087,.409]], [M.gun,M.gun,M.steel,M.iron,M.gun,M.steel,M.iron,M.nickel,M.gun],32);
 for(let k=0;k<6;k++){const a=k*TAU/6;rod([.21*Math.cos(a),.030,.21*Math.sin(a)],[.21*Math.cos(a),.036,.21*Math.sin(a)],.011,M.gun,6);}
 box(0,.415,0,.543,.058,.497,M.woodDark,.026);
 cushion(0,.476,-.006,.587,.117,.534,M.tealWool,M.ochre);
 for(const s of [-1,1]){
  path([[s*.204,.408,.005],[s*.222,.427,.19],[s*.224,.644,.282],[s*.223,.832,.291]],.016,M.steel,10);
  path([[s*.207,.409,-.115],[s*.285,.47,-.111],[s*.295,.659,-.102],[s*.29,.674,.142]],.015,M.gun,10);
  box(s*.29,.681,.024,.055,.038,.314,M.wood,.016,1,false);
 }
 tilt(0,.768,.268,.115,()=>{
 box(0,0,.028,.519,.427,.051,M.walnut,.024);
 box(0,0,-.017,.523,.400,.089,M.tealWool,.041);
 box(0,-.119,-.059,.442,.009,.009,M.mintWool,.004,1,false);
 });
 rectCollision(0,0,.645,.655);
 });
}
function desk(){
 wall(1,-1.42,()=>{
 // Continuous service rail and trestle which cantilevers out from the hull.
 box(0,.687,.072,3.405,.175,.117,M.gun,.010);
 for(const x of [-1.48,.635,1.52]){
  box(x,.553,.176,.080,.335,.218,M.gun,.013);
  rod([x,.416,.16],[x,.739,.818],.037,M.gun,8);
 }
 box(-1.136,.110,.474,.742,.202,.658,M.iron,.019);
 box(-1.136,.423,.470,.812,.512,.737,M.deep,.023);
 for(let i=0;i<3;i++)drawer(-1.136,.258+i*.151,.837,.756,.135,i===2?M.sea:M.blue);
 box(0,.750,.509,3.438,.081,.999,M.gun,.026,.24);
 box(0,.793,.519,3.459,.049,1.016,M.wood,.018,.10);
 box(0,.824,.097,3.363,.036,.14,M.walnut,.009);
 box(0,.825,.952,3.32,.015,.012,M.brass,.004,1,false);
 rectCollision(0,.52,3.48,1.05);
 // A leather plotting surface with a stitched border.
 box(.316,.822,.578,1.581,.010,.648,M.pad,.004,.081,false);
 for(const s of [-1,1])box(.316,.829,.578+s*.304,1.526,.002,.004,M.bronze,0,2,false);
 chart(.310,.830,.586,.764,.427,-.073);
 pencil([.685,.852,.710],[.830,.852,.801]);dividers(.015,.851,.636,.43);
 at(-.664,.818,.720,.07,orbitalInstrument);
 at(-1.229,.818,.437,.12,()=>{
 book(0,0,0,.396,.055,.287,M.deep,-.03,true);book(.014,.057,.006,.352,.028,.258,M.clay,.08,true);
 });
 monitor();openJournal();
 at(1.307,.819,.484,0,()=>{
 lathe(0,0,0,[[.001,.001],[.081,.001],[.086,.007],[.086,.014],[.072,.020],[0,.020]],M.stone,26);
 mug(0,.022,0,.047,M.glaze,.58);
 });
 // Insulated carafe, screw lid, and a handle fixed to two collars.
 at(1.475,.818,.213,-.2,()=>{
 lathe(0,0,0,[[.001,.002],[.065,.002],[.071,.017],[.072,.175],[.061,.222],[.045,.24],[.048,.253],[.049,.274],[.001,.281]], [M.iron,M.iron,M.porcelain,M.porcelain,M.steel,M.gun,M.deep,M.deep],28);
 path([[.064,.197,0],[.098,.191,0],[.103,.095,0],[.071,.079,0]],.009,M.bronze);
 });
 // Wall-mounted watch board, with a printed duty slate and two retaining clips.
 box(.950,1.508,.089,1.135,.703,.103,M.blue,.025);
 art(3,[.864,1.514,.143],[.865,0,0],[0,.576,0]);
 for(const x of [.568,1.143])box(x,1.805,.151,.088,.036,.031,M.brass,.005);
 for(let i=0;i<3;i++){const y=1.655-i*.124;box(1.426,y,.145,.091,.056,.015,i===0?M.clay:i===1?M.cream:M.sea,.006);}
 // Locked folio bins with flush paddle catches.
 for(let i=0;i<3;i++){
  const x=-1.138+i*.486;
  box(x,1.877,.112,.467,.351,.236,i===1?M.body:M.sand,.016);
  box(x,1.768,.235,.141,.036,.012,M.gun,.004);
  box(x,1.776,.245,.105,.012,.015,M.nickel,.002);
 }
 box(-.649,1.682,.163,1.542,.048,.337,M.wood,.012);
 box(-.649,1.653,.254,1.363,.015,.027,M.warm,.004,1,false);
 lamp([-.640,1.599,.286],[1,.817,.58],.76,2.7,[0,-.84,.48],.36);
 // Mechanical pencil trough and two index cards.
 box(.792,.838,.209,.340,.024,.079,M.bronze,.008,1,false);
 pencil([.646,.861,.214],[.809,.861,.211]);
 chair();
 });
}
function modelBoat(){
 // A scale model of the captain's home-port cutter. Bow is +X.
 at(0,0,0,0,()=>{
 box(0,.012,0,.683,.024,.235,M.walnut,.009);
 for(const x of [-.187,.165]){
 rod([x,.025,0],[x,.126,0],.009,M.brass);
 path([[x,.136,-.066],[x,.117,-.040],[x,.106,0],[x,.117,.040],[x,.136,.066]],.006,M.brass,7);
 }
 const hull=(s,t,side)=>{const x=(s-.5)*.796;
 const width=(.033*(1-s)+.087*Math.pow(Math.max(0,Math.sin(s*Math.PI)),.73))*(.17+.83*Math.pow(t,.67));
 return [x,.10+.104*t+.046*Math.pow(Math.abs(s-.49)*2,2)+.005*Math.sin(s*Math.PI),side*width];};
 for(const side of [-1,1]){
  curved(31,7,(s,t)=>hull(s,t*.47,side),M.rust,(s,t)=>[s*.8,t*.06],false,side<0);
  curved(31,7,(s,t)=>hull(s,.47+t*.53,side),M.deep,(s,t)=>[s*.8,t*.08],false,side<0);
  curved(31,2,(s,t)=>hull(s,.79+t*.064,side),M.paper);
  const edge=[];for(let i=0;i<=30;i++)edge.push(hull(i/30,1,side));path(edge,.004,M.brass,6);
 }
 curved(31,4,(s,t)=>mix(hull(s,1,-1),hull(s,1,1),t),M.wood,(s,t)=>[s*.80,t*.22],false,true);
 box(-.087,.232,0,.216,.057,.112,M.cream,.010);
 box(-.087,.264,0,.237,.018,.126,M.walnut,.007);
 for(let i=0;i<3;i++)box(-.163+i*.072,.241,.058,.044,.019,.003,M.deep,.003,1,false);
 rod([.043,.213,0],[.023,.758,0],.007,M.wood,10,.003);
 rod([.025,.296,0],[-.300,.303,.009],.005,M.brass,8);
 const sail=(a,b,c,belly,m)=>{
  const f=(s,t)=>{let p=mix(mix(a,b,s),c,t);p[2]+=Math.sin(s*Math.PI)*(1-t)*Math.sin((t*.82+.1)*Math.PI)*belly;return p;};
  twoSided(()=>curved(18,18,f,m,(s,t)=>[s*.33,t*.46],false));
  for(const edge of [[a,b],[a,c],[b,c]])rod(...edge,.0019,M.ochre,6);
  for(const v of [.25,.5,.75]){let pts=[];for(let i=0;i<=12;i++)pts.push(f(i/12,v));path(pts,.0016,M.paperEdge,5);}
 };
 sail([-.288,.311,.010],[.029,.302,.004],[.026,.718,.002],.035,M.linen);
 sail([.069,.313,.008],[.340,.254,0],[.039,.687,.004],.030,M.paper);
 path([[.389,.249,0],[.024,.749,0],[-.355,.238,0]],.0019,M.cord,5);
 for(const s of [-1,1])rod([-.067,.210,.09*s],[.025,.681,0],.0015,M.cord,5);
 });
}
function credenza(){
 wall(-1,-1.44,()=>{
 box(0,.156,.24,3.21,.267,.438,M.iron,.022);
 box(0,.544,.305,3.295,.572,.566,M.deep,.024);
 box(0,.851,.324,3.343,.060,.636,M.wood,.019,.105);
 for(let i=0;i<4;i++){
  const x=-1.213+i*.808;
  if(i===1){box(x,.546,.597,.765,.502,.035,M.walnut,.012);for(let k=0;k<17;k++)box(x-.349+k*.0436,.546,.621,.021,.450,.031,M.wood,.006,1,false);}
  else {drawer(x,.423,.602,.77,.236,i===0?M.body:M.sea);drawer(x,.68,.602,.77,.224,i===0?M.body:M.sea);}
 }
 rectCollision(0,.324,3.35,.655);
 at(.206,.881,.350,-.12,modelBoat);
 book(-1.14,.884,.333,.401,.044,.329,M.clay,.04,true);book(-1.122,.929,.326,.373,.029,.284,M.cream,-.06);
 at(1.220,.882,.328,0,()=>pot(0,0,0,.91));
 // Sliding library panel and retaining bar across the field manuals.
 box(-.95,1.49,.064,1.258,.904,.092,M.deep,.020);
 box(-.94,1.330,.164,1.213,.046,.263,M.wood,.011);
 standingBooks(-1.466,1.355,.172,12,1);
 rod([-1.538,1.453,.297],[-.351,1.453,.297],.009,M.brass,9);
 for(const k of [-1.538,-.351])rod([k,1.453,.154],[k,1.453,.302],.009,M.brass,8);
 sign(6,-.95,1.754,.120,.471,.119);
 boardFrame(14,.857,1.635,.056,.932,.537);
 });
}
export function study(){desk();credenza();}
