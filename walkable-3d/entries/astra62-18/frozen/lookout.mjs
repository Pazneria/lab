import {box,quad,rod,path,at,tilt,roll,lathe,curved,ellipsoid,art,rectCollision,lamp,add,mul,mix,unit,material} from './geometry.mjs';
import {M,TAU,handle,pin,sign,ring,chamferLoop,drawer,book,boardFrame} from './finish.mjs';
import {cushion} from './textiles.mjs';
import {wall} from './hull.mjs';
function viewport(){
 const levels=[
 [6.61,3.14,.07,1.40,-6.43],[5.68,2.273,.371,1.57,-6.43],
 [5.655,2.248,.36,1.57,-6.425],[5.565,2.171,.342,1.57,-6.346],
 [5.430,2.048,.318,1.57,-6.329],[5.405,2.023,.310,1.57,-6.338],
 [5.29,1.911,.287,1.57,-6.359],[4.924,1.658,.250,1.60,-6.686],
 [4.842,1.584,.237,1.60,-6.706],[4.80,1.545,.227,1.60,-6.729],
 [4.79,1.536,.227,1.60,-6.766],[4.94,1.68,.25,1.60,-6.888]
 ];
 const mat=[M.blue,M.seam,M.gun,M.body,M.seam,M.steel,M.deep,M.nickel,M.black,M.gun,M.iron];
 for(let i=1;i<levels.length;i++){
  const a=levels[i-1],b=levels[i];ring(chamferLoop(...a.slice(0,4)),chamferLoop(...b.slice(0,4)),a[4],b[4],mat[i-1],.185);
 }
 // Corner clamp shoes sit on the flange and are secured by paired captive nuts.
 for(const s of [-1,1]){
  for(const h of [-1,1])for(const x of [.355,1.624]){
   const y=1.57+h*1.041;
   box(s*x,y,-6.324,.189,.078,.026,M.gun,.009);
   pin(s*x-.058,y,-6.306,.013,M.nickel);pin(s*x+.058,y,-6.306,.013,M.nickel);
  }
  for(const y of [1.19,1.90]){
   box(s*2.744,y,-6.326,.066,.149,.026,M.gun,.008);
   pin(s*2.744,y-.043,-6.308,.010,M.nickel);pin(s*2.744,y+.043,-6.308,.010,M.nickel);
  }
 }
 // Two raked pressure bars capture the edges of the clear central pane.
 for(const side of [-1,1])roll(side*1.786,1.602,-6.731,-side*.104,()=>{
  box(0,0,-.024,.057,1.632,.113,M.iron,.010,.18);
  box(0,0,.043,.042,1.608,.022,M.steel,.006,.18);
  for(const y of [-.691,.691]){box(0,y,.054,.060,.095,.018,M.gun,.005,1,false);pin(0,y,.065,.009,M.nickel);}
 });
 // The laminate is shaded in a single, angle-dependent glass pass.
 const loop=chamferLoop(4.82,1.556,.227,1.60);
 for(let i=1;i<loop.length-1;i++){const a=loop[0],b=loop[i],c=loop[i+1];quad([...a,-6.741],[...b,-6.741],[...c,-6.741],[...c,-6.741],M.glass,20,false);}
 box(0,.385,-6.318,5.647,.676,.222,M.deep,.027,.23);
 box(0,.604,-6.24,5.47,.085,.366,M.wood,.020,.21);
 box(0,.657,-6.374,5.27,.024,.191,M.steel,.007);
 rectCollision(0,-6.354,5.70,.545);
 for(const s of [-1,1]){
  for(let j=0;j<3;j++){
   const x=s*(.563+j*.836);
   drawer(x,.357,-6.195,.792,.317,M.blue,false);
   for(let k=0;k<8;k++)box(x-.22+k*.064,.354,-6.173,.028,.136,.008,M.iron,.004,1,false);
  }
 }
 sign(7,0,.373,-6.178,.295,.098);
 // The view casts broad illumination. No real-time light passes are required.
 for(const x of [-1.65,0,1.65])lamp([x,1.60,-6.68],[.48,.77,1.0],2.23,5.9,[0,-.04,1],.47);
}
function seat(){
 wall(-1,-4.995,()=>{
 box(0,.129,.442,2.365,.254,.712,M.iron,.038);
 box(0,.325,.486,2.512,.210,.846,M.blue,.029);
 box(0,.438,.480,2.55,.053,.873,M.wood,.016);
 for(const s of [-1,1]){
 drawer(s*.609,.321,.915,1.146,.143,M.deep,false);handle(s*.609,.324,.942,.151);
 cushion(s*.598,.526,.539,1.173,.143,.731,M.tealWool,M.mintWool);
 tilt(s*.604,.761,.177,-.130,()=>box(0,0,0,1.180,.568,.192,M.tealWool,.086,.20));
 }
 // A stitched lumbar pillow rests against the inboard arm.
 tilt(-.768,.708,.433,-.50,()=>cushion(0,0,0,.515,.229,.318,M.ochre,M.linen,-.15));
 for(const s of [-1,1]){
 box(s*1.272,.523,.499,.067,.219,.817,M.walnut,.027);
 box(s*1.272,.649,.479,.083,.062,.829,M.wood,.021);
 }
 box(0,1.071,.087,2.578,.053,.189,M.wood,.014);
 // Acoustic lining above the observing couch; interrupted by brushed ribs.
 for(let i=0;i<5;i++)box(-1.056+i*.526,1.531,.054,.494,.819,.114,i%2===0?M.deep:M.blue,.033,.28);
 for(const s of [-1,1]){
 box(s*1.284,1.532,.102,.035,.783,.038,M.bronze,.007);
 }
 book(.371,.605,.582,.203,.033,.278,M.clay,-.17,true);
 // A folded lap blanket drapes over the arm nearest the window.
 const throwPoint=(s,t)=>{
  const edge=Math.max(0,(t-.71)/.29),x=.781+Math.min(.71,t)*.692+.066*Math.sin(edge*Math.PI/2);
  const z=.306+s*.437+.009*Math.sin(t*11+s*2);
  return [x,.616+.072*Math.exp(-((x-1.27)**2)/.0094)+.013*Math.sin(s*15+t*3)+.007*Math.sin(s*27-t*4)-.269*edge**1.44,z];};
 curved(38,43,throwPoint,M.linen,(s,t)=>[s*.47,t*.78],true);
 for(const [a,b,mat] of [[.11,.147,M.tealWool],[.16,.172,M.ochre],[.80,.827,M.tealWool],[.837,.853,M.ochre]]){
  curved(4,43,(s,t)=>{let p=throwPoint(a+(b-a)*s,t);p[1]+=.0028;p[0]+=.0036*Math.max(0,(t-.65)/.35);return p;},mat,(s,t)=>[s*.027,t*.78],false);
 }
 for(let j=0;j<31;j++){let p=throwPoint((j+.3)/31,1);rod(p,[p[0]+.003,p[1]-.022-.005*Math.sin(j*2.1),p[2]+.003*Math.sin(j)],.0019,M.bone,5);}
 rectCollision(0,.483,2.63,.936);
 });
}
function binoculars(){
 at(1.65,0,-5.90,-.136,()=>{
 lathe(0,0,0,[[.001,.005],[.186,.005],[.194,.025],[.185,.044],[.128,.060],[.092,.086],[.082,.141],[.065,.736],[.085,.761],[.085,.801],[.064,.817],[.052,1.029]], [M.iron,M.iron,M.steel,M.blue,M.blue,M.brass,M.blue,M.gun,M.brass,M.gun,M.steel],32);
 for(let i=0;i<4;i++){const a=i*TAU/4+.78;rod([.148*Math.cos(a),.047,.148*Math.sin(a)],[.148*Math.cos(a),.055,.148*Math.sin(a)],.013,M.gun,6);}
 path([[-.143,1.225,0],[-.141,1.082,0],[-.088,1.032,0],[.088,1.032,0],[.141,1.082,0],[.143,1.225,0]],.020,M.brass,12);
 rod([-.178,1.210,0],[.178,1.210,0],.032,M.gun,16);
 tilt(0,1.237,0,.155,()=>{
 for(const s of [-1,1]){
  const x=s*.074;
  rod([x,0,.143],[x,0,-.065],.047,M.pad,22,.060);
  rod([x,0,-.056],[x,0,-.230],.062,M.sea,28,.077);
  rod([x,0,-.229],[x,0,-.246],.080,M.brass,32);
  rod([x,0,-.247],[x,0,-.252],.065,M.deep,28);
  rod([x,0,.137],[x,0,.187],.042,M.gun,18,.030);
  rod([x,0,.185],[x,0,.220],.038,M.black,20,.044);
  rod([x,0,.217],[x,0,.224],.029,M.deep,20);
 }
 box(0,.019,-.075,.139,.038,.052,M.gun,.012);
 rod([0,.038,.064],[0,.038,.126],.025,M.brass,16);
 });
 rectCollision(0,0,.39,.44);
 });
}
function mapCase(){
 wall(1,-4.915,()=>{
 box(0,.511,.144,2.132,.64,.225,M.deep,.027);
 for(const s of [-1,1]){drawer(s*.510,.520,.266,.978,.519,M.body,false);handle(s*.507,.667,.288,.170);}
 box(0,.865,.224,2.208,.061,.443,M.wood,.020);
 rectCollision(0,.213,2.22,.443);
 boardFrame(9,-.143,1.573,.082,.795,.814);
 sign(14,.686,1.445,.078,.379,.198);
 // Brass handhold at the turning space by the glass.
 path([[-1.030,1.13,.051],[-1.030,1.13,.133],[-1.006,1.13,.161],[.983,1.13,.161],[1.018,1.13,.133],[1.018,1.13,.051]],.020,M.bronze,12);
 for(const s of [-1,1])box(s*1.016,1.130,.061,.084,.090,.040,M.gun,.011);
 });
}
export function lookout(){viewport();seat();binoculars();mapCase();}
