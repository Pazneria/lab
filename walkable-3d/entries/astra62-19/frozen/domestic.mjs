import {M, TAU, add, sub, mul, cross, unit, box, solid, plane, surface, patch, face, rod, screw, tube, torus, beam, art, zone, light, obstacle, occlude, place, lathe, ellipsoid, tint, rand, range, clamp, mix} from './geometry.mjs';
import {P} from './architecture.mjs';
const {hull,pale,bone,green,blue,dark,iron,rubber,red,cream,brass,nickel,wood}=P;
const powSign=(x,k)=>Math.sign(x)*Math.pow(Math.abs(x),k);
export function cushion(p,sz,col,{pinch=.08,piping=true,exp=.39,sag=.012,mat=M.LINEN}={}){
 const [w,h,d]=sz, half=[w/2,h/2,d/2];
 function outline(a){return [powSign(Math.cos(a),exp),powSign(Math.sin(a),exp)];}
 function shape(u,v){
  let a=u*TAU,b=(v-.5)*Math.PI,[x,z]=outline(a),cv=Math.pow(Math.max(0,Math.cos(b)),.45),yv=powSign(Math.sin(b),.59);
  const dart=Math.cos(8*a+.35)*.009*Math.pow(Math.abs(yv),.50)*Math.sin(Math.PI*v);
  let py=half[1]*yv - sag*Math.max(0,yv)*(1-Math.abs(x*cv)**3)*(1-Math.abs(z*cv)**3);
  return [p[0]+half[0]*x*cv*(1+dart),p[1]+py,p[2]+half[2]*z*cv*(1+dart)];
 }
 patch(40,20,shape,col,mat,(u,v)=>[u*2*(w+d),v*(h+d)],true);
 if(piping){
  let points=[];for(let i=0;i<=64;i++)points.push(shape(i/64,.53));
  tube(points,.0065,tint(col,.72),mat,7);
 }
}
export function book(p,w,h,d,col,angle=0){
 place(p,angle,()=>{
  occlude([0,h/2,0],[w-.005,Math.max(.005,h-.003),d-.005]);
  box([0,.5*h,0],[w-.012,h-.009,d-.009],'d6c9a6',M.PAPER,.003);
  for(let y of [.004,h-.004])box([0,y,0],[w,.008,d],col,M.LINEN,.002);
  box([-w*.49,h/2,0],[.013,h,d],col,M.LINEN,.003);
  for(let z of [d*.24,-d*.25])box([-w*.49,h+.001,z],[.014,.003,.014],brass,M.BRASS);
 });
}
export function mug(p,col=bone,angle=0,scale=1){
 place(p,angle,()=>{
  const r=.047*scale,h=.094*scale;
  occlude([0,h*.47,0],[r*1.65,h*.92,r*1.65]);
  lathe([0,0,0],[[0,0],[r*.81,.001],[r*.90,.006],[r,h*.84],[r*1.025,h-.004],[r,h],[r*.88,h],[r*.87,h*.72]],col,M.CERAMIC,28);
  rod([0,h*.79,0],[0,h*.802,0],r*.887,'34271d',M.DARKGLASS,28);
  let pts=[];for(let i=0;i<=18;i++){let a=i/18*Math.PI;pts.push([r*.93+r*.72*Math.sin(a),h*.53+h*.30*Math.cos(a),0]);}
  tube(pts,r*.115,col,M.CERAMIC,9);
  torus([0,h*.899,0],[0,1,0],r*.999,.0018,blue,M.PAINT,28,5);
 });
}
export function picture(p,angle,w,h,id,col=wood){
 place(p,angle,()=>{
  box([0,0,0],[w,h,.054],col,M.WOOD,.008);
  box([0,0,.028],[w-.036,h-.036,.013],'343b30',M.WOOD,.003);
  box([0,0,.037],[w-.053,h-.053,.010],'decfae',M.PAPER,.002);
  art(id,[0,0,.043],[w-.077,0,0],[0,h-.077,0]);
 });
}
function potPlant(p,size=1){
 place(p,.12,()=>{
  const s=size;
  occlude([0,.083*s,0],[.151*s,.156*s,.151*s]);
  lathe([0,0,0],[[.068*s,0],[.082*s,.017*s],[.105*s,.156*s],[.111*s,.16*s],[.112*s,.176*s],[.101*s,.18*s]],'ac6c4d',M.CERAMIC);
  rod([0,.161*s,0],[0,.165*s,0],.1*s,'453d30',M.STONE,16);
  for(let j=0;j<12;j++){
   let a=j*2.399,d=range(.075,.185)*s,h=range(.18,.35)*s,start=[Math.cos(a)*.018*s,.172*s,Math.sin(a)*.018*s];
   const mid=[Math.cos(a)*d*.48,.18*s+h*.77,Math.sin(a)*d*.48],tip=[Math.cos(a)*d,.18*s+h,Math.sin(a)*d];
   tube([start,mid,tip],.0029*s,'696d42',M.WOOD,6);
   const col=['78865d','657e60','8c9566','536e57'][j%4];
   const width=range(.021,.046)*s;
   const fn=(u,v)=>{let b=Math.sin(Math.PI*v)**.76,w=(u-.5)*2*width*b;
    return [mix(mid[0]*.51,tip[0]*1.18,v)-Math.sin(a)*w,.22*s+h*(.18+.84*v)+b*.030*s-Math.abs(w)*.32,mix(mid[2]*.51,tip[2]*1.18,v)+Math.cos(a)*w];};
   patch(4,9,fn,col,M.LINEN);
   patch(4,9,fn,tint(col,.84),M.LINEN,undefined,true);
  }
 });
}
function berth(){
 place([-2.99,0,1.67],Math.PI/2,()=>{
  solid([0,.145,0],[2.69,.28,1.30],dark,M.PAINT,.045);
  solid([0,.304,0],[2.74,.227,1.34],wood,M.WOOD,.042);
  box([0,.258,.671],[2.65,.215,.023],iron,M.PAINT,.007);
  for(let i=0;i<3;i++){
   let x=(i-1)*.865;
   box([x,.267,.698],[.837,.185,.042],['ad835b','b18a65','a7805a'][i],M.WOOD,.010);
   box([x,.292,.724],[.152,.038,.013],dark,M.METAL,.010);
   box([x,.305,.733],[.127,.013,.013],brass,M.BRASS,.003);
  }
  solid([0,.513,.006],[2.71,.211,1.32],'c7c3a6',M.LINEN,.073,false);
  cushion([0,.597,.005],[2.72,.16,1.34],'d3c9aa',{exp:.24,sag:.002});
  solid([0,.715,-.61],[2.78,.73,.123],'986b48',M.WOOD,.037,false);
  box([0,1.085,-.61],[2.84,.058,.155],'be946a',M.WOOD,.016);
  // Leaned pillows have hand-sewn welts protruding a few millimetres.
  place([-.79,.877,-.33],[.35,-.09,-.08],()=>cushion([0,0,0],[.77,.51,.25],'d6ceb3',{exp:.58}));
  place([-.045,.860,-.348],[.28,.07,.09],()=>cushion([0,0,0],[.68,.45,.25],'9baba0',{exp:.56}));
  place([-.42,.776,-.052],[.39,-.23,-.14],()=>cushion([0,0,0],[.435,.32,.205],'be8f48',{exp:.64}));
  // Ochre-red coverlet folds over the berth edge. The hem follows its undulating surface.
  const cloth=(u,v)=>{
   const x=.12+u*1.23+.018*Math.sin(v*4.4)*Math.sin(Math.PI*u);
   const fold=.010*Math.sin(u*34+v*2.3)+.007*Math.cos(u*16-v*5)+.007*Math.sin(v*12+u*9);
   let z,y;if(v<.74){let t=v/.74;z=-.535+1.139*t;y=.694+.025*Math.sin(Math.PI*t)+fold;}
   else if(v<.83){let a=(v-.74)/.09*Math.PI/2;z=.604+.088*Math.sin(a);y=.606+.088*Math.cos(a)+fold;}
   else{let t=(v-.83)/.17;z=.694+.020*Math.sin(33*u+3*t)*(.2+.8*t);y=.606-.235*t+fold+.019*Math.sin(u*6)*t;}
   return [x,y,z];
  };
  patch(34,40,cloth,'ae6042',M.QUILT,(u,v)=>[u*1.23,v*1.57],true);
  for(let u of [0,.996]){let pts=[];for(let i=0;i<=45;i++)pts.push(cloth(u,i/45));tube(pts,.006,'894b36',M.LINEN,7);}
  let hem=[];for(let i=0;i<=42;i++)hem.push(cloth(i/42,.999));tube(hem,.008,'b98d68',M.LINEN,7);
  // Folded flannel throw at the foot.
  place([.99,.73,.01],[0,-.028,.013],()=>cushion([0,0,0],[.47,.065,1.15],'7b8c82',{exp:.22,sag:.001}));
  occlude([.55,.594,.02],[1.47,.17,1.30]);
 });
 // Reading rail and a framed natural-history print above the headboard.
 picture([-3.645,1.86,1.75],Math.PI/2,.99,1.13,0);
 picture([-3.643,1.80,.90],Math.PI/2,.43,.53,4,'957558');
 place([-3.53,0,3.30],Math.PI/2,()=>{
  solid([0,.36,.235],[.71,.65,.55],'99744f',M.WOOD,.021);
  box([0,.707,.235],[.755,.052,.60],'bb9369',M.WOOD,.015);
  box([0,.52,.529],[.60,.235,.018],wood,M.WOOD,.007);
  rod([0,.527,.535],[0,.527,.565],.027,brass,M.BRASS,16);
  book([-.09,.735,.25],.30,.051,.201,blue,.10);book([-.105,.786,.24],.26,.035,.19,red,-.06);
  mug([.19,.737,.28],'8fa499',-.33,.94);
 });
}
function rugAndTable(){
 // A domestic spun-enamel pendant hangs directly over the low table.
 place([-.98,2.178,1.39],0,()=>{
  lathe([0,.669,0],[[.071,0],[.08,.007],[.083,.042],[.074,.066]],dark,M.PAINT,24);
  rod([0,.178,0],[0,.674,0],.0055,'3b4136',M.LINEN,9);
  lathe([0,.148,0],[[.029,0],[.034,.010],[.030,.027],[.022,.048],[.014,.053]],brass,M.BRASS,24);
  const shade=(u,v,inner)=>{
   let a=u*TAU,t=v*Math.PI*.474,r=(inner?.229:.237)*Math.cos(t);
   return [Math.cos(a)*r,(inner?.143:.154)*Math.sin(t)+(inner?.002:0),Math.sin(a)*r];
  };
  patch(48,11,(u,v)=>shade(u,v,false),'617e6d',M.PAINT,(u,v)=>[u*1.35,v*.27],true);
  patch(48,11,(u,v)=>shade(u,v,true),'e3d4aa',M.CERAMIC,(u,v)=>[u*1.35,v*.26]);
  torus([0,.001,0],[0,1,0],.234,.0065,brass,M.BRASS,48,7);
  ellipsoid([0,.047,0],[.052,.075,.052],'ffdda0',M.LAMP,24,14);
  light([0,-.009,0],[1,.68,.36],1.57,4.8,.20,[0,-1,0]);
 });
 // Bound woven runner with a geometric border, laid in the common living area.
 place([-.846,0,1.29],-.036,()=>{
  box([0,.010,0],[2.58,.020,2.81],'a29069',M.CARPET,.009,.24);
  for(let s of [-1,1]){
   box([s*1.249,.021,0],[.045,.006,2.78],'536a5f',M.CARPET);
   for(let z of [1.29,1.22,1.16])box([0,.022,s*z],[2.52,.004,z===1.22?.042:.016],'626e59',M.CARPET);
   for(let i=0;i<52;i++){
    let x=-1.255+i*.049,zz=s*(1.419+range(0,.012));
    rod([x,.011,s*1.392],[x+range(-.006,.006),.008,zz],.005,'b1a07f',M.LINEN,5);
   }
  }
 });
 place([-.95,0,1.37],.13,()=>{
  // Low oval birch table, with a dark lipped edging under its top.
  function oval(y,w,d,h,c,m){const count=56;
   surface(count,1,(u,v)=>{let a=u*TAU;return [[w*Math.cos(a),y+h*v,d*Math.sin(a)],unit([Math.cos(a)/w,0,Math.sin(a)/d]),[u*3,v*h]];},c,m);
   surface(count,9,(u,v)=>{let a=u*TAU,x=w*v*Math.cos(a),z=d*v*Math.sin(a);return [[x,y+h,z],[0,1,0],[x,z]];},c,m);
  }
  for(let [x,z] of [[-.38,-.19],[.35,-.21],[.04,.27]]){
   rod([x*1.05,.024,z*1.07],[x*.8,.407,z*.78],.028,'956f4c',M.WOOD,12,.042);
   rod([x*1.05,.024,z*1.07],[x*1.047,.049,z*1.065],.029,brass,M.BRASS,12);
  }
  oval(.393,.612,.389,.036,iron,M.METAL);oval(.423,.625,.403,.035,'ae865f',M.WOOD);
  obstacle([0,.25,0],[1.24,.45,.80],'ellipse');occlude([0,.427,0],[.97,.061,.54]);
  book([-.15,.462,-.027],.325,.039,.224,'6b8279',-.11);
  place([-.14,.503,-.03],-.11,()=>art(16,[0,.001,0],[.282,0,0],[0,0,-.190]));
  mug([.23,.458,.092],'e2d7b9',-.62,1.03);
  torus([.265,.461,-.116],[0,1,0],.046,.0015,'9b7855',M.WOOD,28,5);
 });
}
function loungeChair(){
 place([1.87,0,1.11],-1.16,()=>{
  for(let x of [-.314,.314])for(let z of [-.291,.278])rod([x*1.10,.018,z*1.12],[x,.45,z],.026,wood,M.WOOD,14,.036);
  solid([0,.40,0],[.742,.133,.72],'8c6949',M.WOOD,.031,false);
  cushion([0,.488,.025],[.74,.174,.706],'bb975d',{exp:.35});
  place([0,.757,-.304],[-.12,0,0],()=>{
   cushion([0,0,0],[.756,.594,.163],'b5935c',{exp:.35});
   for(let x of [-.19,.19])ellipsoid([x,.050,.08],[.015,.015,.009],'92724b',M.LINEN,12,7);
  });
  for(let s of [-1,1]){
   beam([s*.373,.396,.23],[s*.383,.648,.24],.045,.044,wood,M.WOOD,.01);
   beam([s*.373,.414,-.28],[s*.383,.684,-.265],.046,.049,wood,M.WOOD,.008);
   place([s*.38,.676,-.022],[.052,0,0],()=>box([0,0,0],[.084,.057,.68],'a97b50',M.WOOD,.021));
  }
  obstacle([0,.43,0],[.84,.85,.86]);occlude([0,.453,0],[.74,.14,.7]);occlude([0,.75,-.30],[.76,.55,.13]);
 });
}
function kettle(p){
 place(p,.34,()=>{
  lathe([0,0,0],[[.10,0],[.135,.01],[.143,.056],[.138,.14],[.112,.183],[.075,.198],[.073,.203]],'a5b3a1',M.CERAMIC,32);
  lathe([0,.197,0],[[.073,0],[.082,.004],[.078,.012],[.057,.023],[.018,.031],[0,.031]],iron,M.METAL);
  ellipsoid([0,.239,0],[.022,.021,.022],rubber,M.RUBBER);
  tube([[.115,.058,0],[.175,.092,0],[.205,.154,0],[.235,.174,0]],.039,'b5beaa',M.CERAMIC,18,[.044,.04,.027,.032]);
  rod([.226,.169,0],[.235,.175,0],.026,iron,M.METAL,16);
  let pp=[];for(let j=0;j<=16;j++){let a=j/16*Math.PI;pp.push([-.083,.134+.167*Math.sin(a),.121*Math.cos(a)]);}tube(pp,.013,rubber,M.RUBBER,10);
 });
}
function galley(){
 place([3.72,0,2.61],-Math.PI/2,()=>{
  solid([0,.448,.286],[2.36,.856,.57],green,M.PAINT,.026);
  box([0,.899,.293],[2.42,.061,.614],wood,M.WOOD,.017,.11);
  for(let i=0;i<3;i++){
   const x=(i-1)*.776;
   box([x,.46,.58],[.755,.733,.026],i===1?'758e82':'80968a',M.PAINT,.014);
   box([x,.755,.604],[.220,.031,.035],iron,M.METAL,.008);
  }
  box([0,1.026,.042],[2.40,.182,.075],nickel,M.METAL,.01);
  // The sink has an open bowl, separate rim sections, drain and a bent faucet.
  let sx=-.61;
  box([sx,.934,.299],[.601,.012,.371],'586a63',M.METAL,.027);
  box([sx,.940,.299],[.548,.009,.315],'6b8078',M.METAL,.030);
  for(let s of [-1,1]){
   box([sx+s*.300,.947,.299],[.032,.016,.40],nickel,M.METAL,.01);
   box([sx,.947,.299+s*.181],[.608,.016,.034],nickel,M.METAL,.01);
  }
  rod([sx+.095,.945,.235],[sx+.095,.949,.235],.032,'424f48',M.METAL,18);
  const faucet=[[sx, .931,.089],[sx,1.127,.089],[sx,1.181,.100],[sx,1.207,.139],[sx,1.207,.208],[sx,1.184,.24],[sx,1.14,.24]];
  tube(faucet,.016,'bec3ae',M.METAL,14);
  rod([sx+.105,.934,.104],[sx+.105,.992,.104],.025,iron,M.METAL,12);
  box([sx+.115,.994,.107],[.069,.014,.019],nickel,M.METAL,.005);
  box([.654,.941,.303],[.445,.021,.421],iron,M.DARKGLASS,.018);
  torus([.654,.953,.302],[0,1,0],.153,.007,nickel,M.METAL,26,6);
  kettle([.655,.956,.303]);mug([.107,.932,.352],'e2c89b',-.65);
  // Recessed open shelf with three pantry jars and neatly stacked plates.
  box([.13,1.70,.131],[2.0,.057,.25],wood,M.WOOD,.012);
  for(let x of [-.60,.85])beam([x,1.52,.026],[x,1.673,.22],.028,.028,iron,M.METAL);
  for(let i=0;i<3;i++){
   let x=-.55+i*.202,ht=[.235,.195,.260][i];
   lathe([x,1.73,.145],[[.063,0],[.075,.009],[.075,ht-.035],[.065,ht-.020],[.064,ht]],['8e9b81','c4ae87','b0906d'][i],M.CERAMIC,20);
   rod([x,1.728+ht,.145],[x,1.749+ht,.145],.068,wood,M.WOOD,20);
   box([x,1.82,.218],[.072,.041,.005],cream,M.PAPER,.002);
  }
  for(let i=0;i<4;i++)lathe([.46,1.73+i*.012,.147],[[.072,0],[.117,.009],[.119,.013],[.113,.016],[.073,.009],[0,.009]],bone,M.CERAMIC,26);
  rod([.39,1.43,.072],[1.05,1.43,.072],.012,brass,M.BRASS,12);
  // Striped linen hangs in small folds from the galley rail.
  patch(20,17,(u,v)=>[.63+u*.245,1.438-v*.306+.006*Math.cos(u*17)*v,.085+.014*Math.sin(u*21)*(1-.35*v)],'c3c3a5',M.QUILT,(u,v)=>[u*.3,v*.42],true);
  art(15,[.02,1.37,.060],[.50,0,0],[0,.145,0]);
 });
}
function cabinetAndArt(){
 place([-2.07,0,-1.321],0,()=>{
  solid([0,.331,.196],[2.51,.653,.43],'8e6b4b',M.WOOD,.025);
  box([0,.676,.204],[2.57,.054,.465],wood,M.WOOD,.014,.105);
  for(let i of [-1,0,1]){
   box([i*.818,.355,.421],[.795,.503,.026],'a78059',M.WOOD,.009);
   let x=i*.818+.24;
   rod([x,.377,.436],[x,.377,.469],.022,brass,M.BRASS,12);
  }
  picture([-.105,1.644,.061],0,1.79,1.12,9,'786149');
  potPlant([.934,.706,.215],1.07);
  book([-.89,.706,.242],.38,.056,.244,red,-.061);book([-.867,.763,.239],.362,.042,.234,green,.014);
  // Compact analogue radio with a cloth speaker grille and two brass controls.
  place([-.37,.704,.232],.06,()=>{
   box([0,.108,0],[.304,.216,.137],'b78d61',M.WOOD,.022);
   box([-.038,.11,.071],[.189,.155,.011],'7b715a',M.CARPET,.008);
   for(let y of [.074,.15])rod([.106,y,.072],[.106,y,.091],.021,brass,M.BRASS,16);
   rod([.094,.209,-.036],[.152,.468,-.064],.003,nickel,M.METAL,6);
  });
  picture([.346,.856,.150],-.09,.258,.28,4,'b1996d');
 });
}
function entryPegs(){
 place([-1.62,0,5.15],Math.PI,()=>{
  box([0,1.17,.059],[1.11,.073,.047],wood,M.WOOD,.014);
  for(let x of [-.39,0,.39]){
   tube([[x,1.17,.073],[x,1.168,.141],[x,1.198,.158]],.011,brass,M.BRASS,9);
  }
  // A canvas tote, its handles looping over the rail.
  let pts=[];for(let i=0;i<=18;i++){let a=i/18*Math.PI;pts.push([-.39+.106*Math.cos(a),1.07+.13*Math.sin(a),.153]);}tube(pts,.012,'9e8a65',M.LINEN,7);
  place([-.39,.904,.145],[-.05,0,-.05],()=>cushion([0,0,0],[.38,.36,.094],'9d9b7b',{exp:.35,piping:false}));
 });
 place([2.94,0,5.151],Math.PI,()=>{
  // The resident's oilskin hangs above two rubber deck boots beside the entrance.
  box([0,1.973,.026],[.147,.100,.049],wood,M.WOOD,.013);
  tube([[0,1.979,.041],[0,1.957,.101],[0,1.975,.123],[0,2.002,.125]],.011,brass,M.BRASS,10);
  const garment=(u,v)=>{
   let a=u*TAU,shoulder=.105+.128*Math.sin(Math.min(1,v/.15)*Math.PI/2);
   let width=shoulder-.027*Math.sin(v*Math.PI)+.009*Math.cos(v*7);
   let creases=(.005+.011*v)*Math.sin(a*11+v*2.3)+.007*Math.sin(a*5-v*4);
   return [Math.cos(a)*(width+creases)-.021*v,1.916-.896*v+.014*v*Math.cos(a*4),.126+(Math.sin(a)*(.062+.039*Math.sin(v*Math.PI)+creases))];
  };
  patch(42,24,garment,'ac8e53',M.LINEN,(u,v)=>[u*1.01,v*.92]);
  for(let s of [-1,1]){
   let pts=[[s*.162,1.838,.143],[s*.225,1.776,.135],[s*.258,1.618,.135],[s*.265,1.499,.164],[s*.287,1.362,.177],[s*.298,1.224,.176]];
   tube(pts,.07,'aa8a4d',M.LINEN,17,[.076,.079,.073,.063,.064,.054]);
   rod(pts[5],add(pts[5],[s*.003,-.041,.002]),.055,'947d4a',M.LINEN,16,.051);
   place([s*.116-.018,1.332,.207],[.06,s*.31,-s*.07],()=>{
    box([0,0,0],[.131,.130,.011],'a88c55',M.LINEN,.011);
    box([0,.047,.008],[.138,.046,.009],'b59960',M.LINEN,.007);
   });
  }
  let seam=[];for(let i=1;i<23;i++)seam.push(add(garment(.251,i/24),[.003,0,.002]));
  tube(seam,.0042,'897448',M.LINEN,7);
  for(let i=0;i<5;i++){let p=garment(.251,.25+i*.138);rod(p,add(p,[0,0,.009]),.008,brass,M.BRASS,9);}
  place([0,1.886,.129],[.16,0,.04],()=>cushion([0,0,0],[.212,.161,.144],'a18a55',{exp:.73,piping:false}));
  for(let s of [-1,1])place([s*.117,0,.208+s*.031],s*.13,()=>{
   box([0,.021,.054],[.144,.038,.304],'303c35',M.RUBBER,.019);
   ellipsoid([0,.071,.081],[.071,.064,.133],'4a6156',M.RUBBER,20,9);
   lathe([0,0,-.026],[[.063,.046],[.066,.105],[.059,.165],[.072,.285],[.072,.304],[.059,.305],[.055,.268]],'4d6559',M.RUBBER,22);
   rod([0,.265,-.026],[0,.268,-.026],.056,'273a31',M.RUBBER,18);
   torus([0,.296,-.026],[0,1,0],.068,.005,'a6a085',M.RUBBER,23,6);
   tube([[0,.274,-.090],[0,.324,-.096],[0,.331,-.087],[0,.303,-.077]],.006,red,M.LINEN,7);
  });
 });
}
export function buildDomestic(){zone('living');berth();rugAndTable();loungeChair();cabinetAndArt();galley();entryPegs();}

