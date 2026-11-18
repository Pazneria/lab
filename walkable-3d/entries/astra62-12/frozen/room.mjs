import {M} from "./model.mjs";
import {room as R,counter} from "./layout.mjs";
import {plate,screw} from "./cabinets.mjs";
import {buildCounter,bench,pendant,sconce,framed,pictureLamp} from "./furniture.mjs";
import {rect,line,text,rng,mono,serif} from "./graphics.mjs";

const green=M("#45665e","paint"),greenDark=M("#344e4a","paint"),bead=M("#58766a","lacquer"),sill=M("#b39a78","wood","wood"),mahog=M("#ae8b74","wood","wood"),brass=M("#bfa476","brass"),steel=M("#848b82","steel"),rubber=M("#343a3b","rubber");
const print=id=>M("#ffffff","print",id);
function floorRect(b,x1,z1,x2,z2,y,s,nu=1,nv=1){
  b.face([x1,y,z2],[x2,y,z2],[x2,y,z1],[x1,y,z1],s,nu,nv);
}
function floor(b){
  const s=M("#fffaf4","cloth","carpet",{repeat:[(R.right-R.left)/1.05,(R.front-R.back)/1.05],receive:true});
  floorRect(b,R.left,R.back,R.right,R.front,0,s,66,92);
  const edge=(x,z,length,yaw)=>b.at(x,.0013,z,yaw,()=>floorRect(b,-length/2,-.064,length/2,.064,0,M("#f1e9d7","cloth","border",{repeat:[length/.66,1],receive:true}),Math.ceil(length/.2),2));
  edge(0,R.back+.23,R.right-R.left-.32,0);edge(0,R.front-.24,R.right-R.left-.32,Math.PI);
  edge(R.left+.23,-.05,R.front-R.back-.60,Math.PI/2);edge(R.right-.23,-1.93,5.86,-Math.PI/2);
  floorRect(b,R.right,R.annexBack,R.annexRight,R.annexFront,.001,M("#e5ded0","lacquer","lino",{repeat:[(R.annexRight-R.right)/.49,(R.annexFront-R.annexBack)/.49],receive:true}),20,24);
  b.box(R.right,.005,(R.annexBack+R.annexFront)/2,.043,.013,R.annexFront-R.annexBack,brass);
  b.at(0,.006,4.29,Math.PI,()=>{
    b.box(0,0,0,1.515,.010,.777,rubber);
    floorRect(b,-.748,-.379,.748,.379,.006,print("mat"),8,4);
  });
}
function paneling(b,length,h=.849){
  b.panel(0,h/2+.012,.009,length,h,M("#4c6a61","paint","white",{receive:true}),0,0,0,Math.ceil(length/.28),3);
  const count=Math.round(length/.123),step=length/count;
  for(let i=1;i<count;i++){const x=-length/2+i*step;
    b.box(x,h*.51,.017,.005,h-.027,.01,greenDark);b.panel(x+.0047,h*.52,.023,.0026,h-.040,bead);
  }
  b.box(0,.088,.030,length,.162,.057,greenDark);b.box(0,.158,.048,length,.018,.044,bead);
  b.box(0,h-.005,.026,length,.062,.052,greenDark);b.box(0,h+.031,.044,length,.030,.087,sill);b.box(0,h+.048,.058,length,.008,.080,M("#c3a16f","brass"));
}
function wall(b,x,z,yaw,len,h=R.ceiling,mural=false){
  b.at(x,0,z,yaw,()=>{
    b.panel(0,h/2,0,len,h,M("#ebd6b6","matte","plaster",{repeat:[len/1.25,h/1.25],receive:true}),0,0,0,Math.ceil(len/.26),Math.ceil(h/.24));
    paneling(b,len);
    if(mural){
      b.panel(0,1.957,.008,len-.058,1.922,M("#f7e7cf","print","mural"),0,0,0,32,10);
      b.box(0,.984,.020,len,.021,.028,mahog);b.box(0,2.930,.017,len,.023,.027,mahog);
    }else{
      b.panel(0,h-.274,.004,len,.016,M("#a29174","paint"));
      b.panel(0,h-.248,.004,len,.006,M("#a29174","paint"));
    }
    b.box(0,h-.048,.031,len,.098,.063,mahog);
    b.box(0,h-.103,.047,len,.024,.093,sill);
  });
}
function ceiling(b){
  const y=R.ceiling;const cover=(x1,z1,x2,z2,yy,mat)=>b.face([x1,yy,z1],[x2,yy,z1],[x2,yy,z2],[x1,yy,z2],mat,Math.ceil((x2-x1)/.31),Math.ceil((z2-z1)/.31));
  cover(R.left,R.back,R.right,R.front,y,M("#d5bfa0","matte","ceiling",{repeat:[12,17]}));
  cover(R.right,R.annexBack,R.annexRight,R.annexFront,2.82,M("#e1ccac","matte","ceiling",{repeat:[5,6]}));
  for(const z of [-4.64,-2.58,-.49,1.61,3.75]){
    b.box(0,y-.069,z,7.10,.139,.125,mahog);b.box(0,y-.139,z,7.10,.013,.146,sill);
    for(const s of [-1,1]){
      b.at(s*3.446,y-.234,z,0,()=>{
        b.box(0,.043,0,.202,.106,.154,mahog);b.box(s*.042,-.038,0,.120,.066,.145,mahog);
      });
    }
  }
  // Shallow painted metal ceiling tracks and a supply-air grille.
  for(const x of [-2.58,2.58])b.box(x,y-.011,-.07,.033,.022,9.93,greenDark);
  b.at(-2.45,y-.026,2.78,0,()=>{
    b.box(0,0,0,.538,.033,.298,steel);b.panel(0,-.018,0,.48,.253,rubber,Math.PI/2);
    for(let i=0;i<12;i++)b.box((i-5.5)*.037,-.022,0,.015,.014,.23,steel);
  });
  // Adjustable gallery spot on the center joist, aimed at the feature cabinet's brass work.
  b.box(.34,2.925,-.49,.135,.044,.085,greenDark);
  b.tube([.34,2.909,-.49],[.34,2.838,-.49],.012,.012,brass,12);
  b.tube([.29,2.836,-.49],[.38,2.836,-.49],.023,.023,brass,16);
  b.tube([.345,2.858,-.462],[.309,2.770,-.586],.058,.071,greenDark,32);
  b.tube([.309,2.770,-.586],[.305,2.759,-.604],.073,.072,brass,32);
  b.tube([.305,2.759,-.604],[.304,2.756,-.609],.056,.056,M("#f7d6a3","light"),32);
  pendant(b,-.15,2.52,2.412,1.04);pendant(b,-1.40,-1.62,2.472,.96);pendant(b,1.50,-2.58,2.434,.96);
}
function doorAndWindows(b){
  const h=R.ceiling;
  b.at(0,0,R.front,Math.PI,()=>{
    // A shallow exterior view beyond the sealed glazing gives the windows depth as one walks past.
    b.panel(0,1.67,-.69,10.35,4.66,M("#b9c8c8","mirror","street"),0,0,0,15,7);
    const upper=M("#d3c3a6","matte","plaster");
    b.box(0,(h+2.55)/2,-.057,7.1,h-2.55,.114,upper);
    for(const s of [-1,1]){
      b.box(s*3.274,1.28,-.052,.554,2.56,.104,upper);
      b.at(s*3.274,0,0,0,()=>paneling(b,.554));
      b.box(s*1.808,.323,-.055,2.412,.646,.110,green);
      b.at(s*1.808,0,0,0,()=>paneling(b,2.412,.625));
      b.box(s*.598,1.30,-.052,.110,2.60,.106,greenDark);
      const cx=s*1.813,ww=2.354;
      b.box(cx,.664,.002,ww+.082,.067,.159,sill);b.box(cx,.707,-.015,ww,.040,.114,greenDark);
      for(const xx of [-ww/2,0,ww/2])b.box(cx+xx,1.641,-.012,xx===0?.047:.065,1.891,.114,greenDark);
      for(const xx of [-ww/2,ww/2])b.box(cx+xx,1.64,.049,.013,1.842,.008,brass);
      b.box(cx,2.237,-.010,ww,.053,.115,greenDark);
      b.panel(cx,2.408,-.068,ww-.042,.273,M("#cfcbb2","mirror","transom",{repeat:[2,1]}));
      b.box(cx,2.562,-.009,ww+.064,.058,.142,mahog);
      for(const xxx of [-.585,.585])b.box(cx+xxx,2.411,-.011,.026,.302,.108,greenDark);
    }
    b.box(0,.033,-.024,1.072,.064,.150,brass);
    for(const s of [-1,1]){
      b.box(s*.500,1.154,-.003,.071,2.28,.101,green);
      for(const yy of [.296,1.138,2.024])if(s<0)b.tube([s*.539,yy-.041,.050],[s*.539,yy+.041,.050],.012,.012,brass,12);
    }
    b.box(0,.286,-.012,.946,.501,.077,green);plate(b,0,.210,.032,.829,.286,.009,.012,brass);
    const r=rng(9321);
    for(let i=0;i<13;i++)b.at((r()-.5)*.760,.14+r()*.15,.037,0,()=>b.panel(0,0,0,.01+r()*.055,.0014,M("#9f8563","steel")),0,r()*.35-.17);
    b.box(0,.553,.01,.96,.059,.102,greenDark);b.box(0,2.209,.004,.97,.090,.104,green);
    b.box(0,2.272,.004,1.101,.049,.129,mahog);
    b.panel(0,2.425,-.059,1.021,.243,M("#d2c9ac","mirror","transom"));b.box(0,2.572,.009,1.115,.052,.145,mahog);
    for(const sx of [-.399,.399])b.tube([sx,.985,.032],[sx,.985,.095],.018,.018,brass,16);
    b.tube([-.429,.985,.099],[.429,.985,.099],.019,.019,brass,20);
    plate(b,.407,1.086,.055,.055,.114,.009,.013,brass);screw(b,.407,1.121,.062,.006);
    // Suspended sign, two short brass chains, offset from the window mullion.
    b.path([[-1.42,2.209,.03],[-1.39,1.971,.035],[-1.04,1.971,.035],[-1.025,2.209,.03]],.0028,brass,7);
    plate(b,-1.207,1.86,.044,.531,.222,.022,.034,M("#fff6e0","litPrint","open"),brass);
    b.box(0,2.784,.019,.380,.125,.103,greenDark);b.panel(0,2.782,.072,.343,.107,M("#e6efd5","litPrint","exit"));
    // A cast grille below the street-facing sill.
    b.box(1.796,.327,.029,1.15,.238,.061,greenDark);
    b.panel(1.796,.327,.061,1.099,.193,M("#a2ad99","matte","grill",{repeat:[6,1]}));
    for(let i=0;i<6;i++)b.box(1.796,.25+i*.028,.066,1.092,.008,.013,bead);
    b.box(0,h-.049,.030,7.10,.098,.06,mahog);b.box(0,h-.104,.044,7.10,.022,.089,sill);
  });
}
function opening(b){
  const z=(R.annexBack+R.annexFront)/2,w=R.annexFront-R.annexBack;
  b.at(R.right,0,z,-Math.PI/2,()=>{
    for(const s of [-1,1]){
      const x=s*(w/2-.050);
      b.box(x,1.391,0,.102,2.781,.156,greenDark);
      b.box(x,.51,.054,.124,1.02,.102,green);b.box(x,1.024,.061,.149,.046,.131,brass);
      b.box(x,2.409,.048,.123,.116,.113,mahog);b.box(x,2.487,.037,.185,.043,.181,sill);
      b.box(x,1.71,.079,.024,1.27,.014,brass);
    }
    b.box(0,2.826,0,w,.470,.147,mahog);
    b.box(0,2.620,.015,w+.038,.062,.201,sill);
    b.box(0,2.793,.081,w-.16,.284,.025,greenDark);
    b.panel(0,2.794,.098,w-.223,.258,M("#f7e3bc","litPrint","counterBanner"));
    b.box(0,2.970,.049,w+.067,.060,.183,sill);
  });
  b.at(4.99,2.751,3.64,0,()=>{b.box(0,0,0,.914,.057,.180,greenDark);b.box(0,-.034,0,.856,.027,.142,M("#f4dfb7","light"));for(const x of [-.376,.376])b.box(x,-.034,0,.016,.028,.147,brass)});
}
function clock(b,x,y,z,yaw){
  b.at(x,y,z,yaw,()=>{
    b.tube([0,0,0],[0,0,.053],.192,.191,M("#9e5e48","lacquer"),56);b.disc(0,0,.055,.178,print("clock"),60);b.torus(0,0,.056,.180,.007,brass,60);
  });
}
function conduit(b,x,z,yaw,length){
  b.at(x,0,z,yaw,()=>{
    b.tube([-length/2,.246,.055],[length/2,.246,.055],.009,.009,steel,12);
    for(let i=0;i<3;i++){
      const xx=(i-1)*length*.378;
      b.box(xx,.246,.057,.076,.088,.033,M("#7c8276","steel"));b.box(xx,.246,.078,.047,.055,.012,rubber);
      b.path([[xx+.010,.246,.087],[xx+.036,.226,.134],[xx+.046,.069,.171],[xx+.078,.021,.245]],.006,rubber,8);
    }
  });
}
export function additionalPrints(a){
  a.add("records",512,332,(c,w,h)=>{
    rect(c,0,0,w,h,"#334b43");for(let y=0;y<h;y+=7){rect(c,0,y,w,1.7,"#283c36");rect(c,0,y+2,w,.7,"#4c5b4e")}
    text(c,"HOUSE RECORDS",w/2,65,44,"#ebd6aa",{...serif,align:"center"});line(c,[[28,82],[484,82]],"#b3956b",2);
    const names=["EMBER PASS","DUST RELAY","LUNAR POST","KITE SIGNAL","BELL DIVER"],initials=["ELL","WES","KIT","JOE","MAR"],scores=["048600","036250","062140","029880","084700"];
    for(let i=0;i<5;i++){const yy=122+i*37;text(c,names[i],30,yy,23,"#e0d4b8",mono);text(c,initials[i],307,yy,22,"#d4b78a",mono);text(c,scores[i],w-28,yy,23,"#dfd1ad",{...mono,align:"right"})}
    text(c,"UPDATED BY THE NIGHT CLERK",w/2,310,16,"#aeaa91",{...mono,align:"center"});
  });
}
export function buildRoom(b){
  floor(b);ceiling(b);wall(b,0,R.back,0,R.right-R.left,R.ceiling,true);
  wall(b,R.left,(R.front+R.back)/2,Math.PI/2,R.front-R.back);
  wall(b,R.right,(R.annexBack+R.back)/2,-Math.PI/2,R.annexBack-R.back);wall(b,R.right,(R.annexFront+R.front)/2,-Math.PI/2,R.front-R.annexFront);
  wall(b,(R.right+R.annexRight)/2,R.annexBack,0,R.annexRight-R.right,2.82);
  wall(b,(R.right+R.annexRight)/2,R.annexFront,Math.PI,R.annexRight-R.right,2.82);
  wall(b,R.annexRight,(R.annexFront+R.annexBack)/2,-Math.PI/2,R.annexFront-R.annexBack,2.82);
  b.zone='storefront';doorAndWindows(b);b.zone='wicket';opening(b);buildCounter(b);b.zone='furnishings';bench(b);
  framed(b,R.left,1.788,3.08,Math.PI/2,.682,1.061,"ferry",true);
  framed(b,R.left,2.229,-.015,Math.PI/2,1.035,.672,"records");
  framed(b,R.right,1.794,-3.68,-Math.PI/2,.672,1.047,"regatta");
  framed(b,4.89,1.775,R.annexBack,0,.951,.364,"tokenSign",true);
  framed(b,5.02,1.758,R.annexFront,Math.PI,.303,.357,"rates");
  clock(b,R.right,2.184,-.964,-Math.PI/2);
  sconce(b,R.left,1.91,-2.63,Math.PI/2);
  sconce(b,R.right,1.984,-2.726,-Math.PI/2);
  pictureLamp(b,-1.96,2.750,R.back,0,.915);pictureLamp(b,1.96,2.750,R.back,0,.915);
  conduit(b,R.left,-.05,Math.PI/2,3.0);conduit(b,R.right,-.20,-Math.PI/2,2.64);
}
