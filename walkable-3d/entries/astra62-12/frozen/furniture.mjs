import {M} from "./model.mjs";
import {counter,room} from "./layout.mjs";
import {plate,screw} from "./cabinets.mjs";
import {rng} from "./graphics.mjs";
const wood=M("#d9b99b","wood","wood"),darkwood=M("#aa8c74","wood","wood"),brass=M("#b49a68","brass"),silver=M("#b8bbb1","chrome"),ink=M("#333738","rubber"),enamel=M("#3b625b","lacquer"),paper=M("#dfd1ae","matte"),red=M("#b56853","lacquer");
const print=s=>M("#ffffff","print",s);
export function pendant(b,x,z,bottom=2.43,scale=1){
  const top=bottom+.265*scale,stem=room.ceiling-.065;
  b.tube([x,stem,z],[x,room.ceiling-.003,z],.083,.124,brass,32);
  b.tube([x,top,z],[x,stem,z],.008,.008,M("#62594e","rubber"),12);
  b.tube([x,top-.02,z],[x,top+.019,z],.057*scale,.034*scale,brass,28);
  const pr=[[0,.045],[.019,.112],[.047,.155],[.081,.192],[.103,.205],[.133,.210],[.153,.197],[.169,.161],[.20,.119],[.237,.081],[.256,.063]];
  const milk=M("#f7dcac","light");for(let i=0;i<pr.length-1;i++){
    const [y,r]=pr[i],[yy,rr]=pr[i+1];b.tube([x,bottom+y*scale,z],[x,bottom+yy*scale,z],r*scale,rr*scale,milk,48);
  }
  b.torus(x,bottom+.134*scale,z,.209*scale,.0038*scale,brass,48,Math.PI/2);
  b.tube([x,bottom-.006,z],[x,bottom+.005,z],.043*scale,.053*scale,brass,24);
}
export function sconce(b,x,y,z,yaw){
  b.at(x,y,z,yaw,()=>{
    b.tube([0,.02,0],[0,.02,.043],.095,.085,brass,32);
    b.path([[0,-.005,.041],[0,-.053,.089],[0,-.056,.154],[0,-.018,.177]],.015,brass,14);
    b.tube([0,-.020,.178],[0,.017,.178],.053,.069,brass,28);
    b.tube([0,.019,.178],[0,.198,.178],.060,.073,M("#f3cfa1","light"),36);
    b.tube([0,.198,.178],[0,.219,.178],.076,.056,brass,28);
    b.ball(0,.218,.178,.061,.019,.061,brass);
    for(let i=0;i<4;i++){const q=i*Math.PI/2+Math.PI/4;b.tube([.064*Math.cos(q),.016,.178+.064*Math.sin(q)],[.077*Math.cos(q),.202,.178+.077*Math.sin(q)],.0035,.0035,brass,8)}
  });
}
export function pictureLamp(b,x,y,z,yaw,width=.70){
  b.at(x,y,z,yaw,()=>{
    for(const xx of [-width*.28,width*.28]){
      b.tube([xx,0,0],[xx,0,.035],.032,.025,brass,16);b.path([[xx,0,.02],[xx,.087,.118],[xx,.085,.243]],.009,brass,12);
    }
    b.tube([-width/2,.076,.238],[width/2,.076,.238],.044,.044,brass,24);
    b.panel(0,.041,.251,width*.94,.037,M("#f7d8ad","light"),Math.PI/2-.38);
  });
}
export function framed(b,x,y,z,yaw,w,h,id,light=false){
  b.at(x,y,z,yaw,()=>{
    b.box(0,0,.014,w+.062,h+.062,.028,darkwood);
    b.box(0,0,.031,w+.038,h+.038,.012,brass);
    b.panel(0,0,.039,w+.022,h+.022,paper);
    b.panel(0,0,.040,w,h,print(id));if(light)pictureLamp(b,0,h/2+.092,0,0,w*.75);
  });
}
function register(b,x,y,z){
  b.at(x,y,z,.09,()=>{
    const green=M("#718878","lacquer"),off=M("#c7c4ad","plastic");
    b.box(0,.036,0,.432,.072,.310,green);b.box(0,.018,.148,.393,.025,.024,silver);
    plate(b,0,.049,.156,.077,.019,.009,.004,silver);
    const p=[[-.135,.071],[.133,.071],[.142,.091],[-.012,.158],[-.041,.239],[-.129,.239]];
    b.profile(p,.393,green,green);
    b.panel(0,.194,-.022,.291,.061,M("#dbe5c7","litPrint","register"),-.340);
    b.at(0,.126,.058,0,()=>{
      for(let j=0;j<3;j++)for(let i=0;i<6;i++){const xx=(i-2.5)*.040,yy=(j-1)*.034;
        b.tube([xx,yy,.004],[xx,yy,.013],.014,.013,i===5?red:off,12);b.panel(xx,yy,.014,.005,.0028,ink);
      }
    },-1.15);
    b.tube([.210,.103,.021],[.240,.103,.021],.016,.016,silver,12);b.path([[.241,.103,.021],[.240,.148,-.04],[.240,.189,-.063]],.009,silver,12);
    b.ball(.24,.192,-.065,.016,.016,.020,M("#463d35","plastic"));
  });
}
function serviceBell(b,x,y,z){
  b.tube([x,y,z],[x,y+.012,z],.073,.071,ink,36);b.tube([x,y+.012,z],[x,y+.021,z],.069,.065,brass,36);
  b.ball(x,y+.021,z,.061,.047,.061,silver);b.tube([x,y+.061,z],[x,y+.08,z],.006,.006,brass,12);b.ball(x,y+.081,z,.015,.005,.015,brass);
}
function coin(b,x,y,z,turn=0){
  b.tube([x,y,z],[x,y+.0035,z],.0133,.0133,brass,20);
  b.at(x,y+.004,z,turn,()=>b.disc(0,0,0,.0128,print("token"),20,-Math.PI/2));
}
function toyBoat(b,x,y,z,scale,col){
  b.at(x,y,z,.15,()=>{
    const w=.185*scale,h=.053*scale;
    const p=[[-w*.50,h*.66],[-w*.39,0],[w*.34,0],[w*.5,h*.90],[-w*.5,h*.90]];
    b.outline(p,0,.054*scale,M(col,"lacquer"),M(col,"lacquer"));
    b.box(-.004*scale,h,0,w*.80,.008*scale,.053*scale,paper);
    b.tube([-.005*scale,h,0],[-.005*scale,h+.155*scale,0],.003*scale,.002*scale,brass,8);
    b.poly([[-.060*scale,h+.01*scale,.002],[-.009*scale,h+.146*scale,.002],[-.009*scale,h+.005*scale,.002]],[0,0,1],[[0,0],[1,1],[1,0]],paper);
    b.poly([[.001*scale,h+.005*scale,.001],[.001*scale,h+.126*scale,.001],[.072*scale,h+.007*scale,.001]],[0,0,1],[[0,0],[0,1],[1,0]],M(col,"cloth"));
  });
}
function cuttlefish(b,x,y,z,s,col){
  const cloth=M(col,"cloth"),pale=M("#d9b89d","cloth");
  b.ball(x,y+.104*s,z,.080*s,.102*s,.069*s,cloth);
  b.ball(x-.061*s,y+.110*s,z-.007*s,.039*s,.052*s,.024*s,cloth);
  b.ball(x+.061*s,y+.110*s,z-.007*s,.039*s,.052*s,.024*s,cloth);
  for(let i=0;i<5;i++){const q=i*Math.PI/4-.08;b.ball(x+Math.cos(q)*.061*s,y+.022*s,z+Math.sin(q)*.045*s,.025*s,.021*s,.036*s,cloth)}
  b.ball(x,y+.079*s,z+.051*s,.047*s,.035*s,.015*s,pale);
  for(const sign of [-1,1]){b.ball(x+sign*.029*s,y+.122*s,z+.060*s,.008*s,.010*s,.005*s,ink);b.ball(x+sign*.029*s-.0015*s,y+.125*s,z+.064*s,.002*s,.002*s,.001*s,paper)}
  b.path([[x-.010*s,y+.092*s,z+.065*s],[x,y+.087*s,z+.067*s],[x+.010*s,y+.092*s,z+.065*s]],.0018*s,ink,6);
}
function lighthouse(b,x,y,z,s){
  b.tube([x,y,z],[x,y+.021*s,z],.061*s,.059*s,darkwood,20);
  for(let i=0;i<5;i++)b.tube([x,y+(.021+i*.034)*s,z],[x,y+(.055+i*.034)*s,z],(.047-i*.0045)*s,(.0425-i*.0045)*s,i%2?red:paper,18);
  b.tube([x,y+.191*s,z],[x,y+.202*s,z],.042*s,.042*s,ink,20);b.tube([x,y+.202*s,z],[x,y+.243*s,z],.029*s,.029*s,M("#dbba82","plastic"),12);
  b.tube([x,y+.242*s,z],[x,y+.274*s,z],.043*s,.002*s,red,20);
}
function prizes(b){
  const back=-(room.annexRight-counter.x)+.025;
  b.at(0,0,back,0,()=>{
    for(const yy of [1.39,1.80]){
      b.box(.280,yy,.138,1.31,.037,.27,wood);b.box(.280,yy+.001,.273,1.31,.020,.011,brass);
      for(const x of [-.24,.79]){b.path([[x,yy-.158,.020],[x,yy-.023,.223],[x,yy-.023,.03],[x,yy-.158,.020]],.010,brass,10)}
    }
    cuttlefish(b,-.234,1.413,.166,1.1,"#cb907b");cuttlefish(b,-.053,1.413,.150,.86,"#8ea89a");cuttlefish(b,.108,1.413,.156,.90,"#c7a77b");
    toyBoat(b,.403,1.412,.157,.94,"#6a9095");toyBoat(b,.703,1.412,.146,1.13,"#bd6b54");
    lighthouse(b,-.242,1.822,.130,.91);lighthouse(b,-.088,1.822,.156,1.22);lighthouse(b,.077,1.822,.150,.97);
    for(let i=0;i<3;i++){const x=.318+i*.167;b.box(x,1.886,.141,.141,.127,.151,M(["#ac765f","#789793","#bc9e75"][i],"matte"));
      b.panel(x,1.89,.217,.112,.074,print("tickets"));b.box(x,1.954,.141,.149,.016,.159,paper)}
    b.panel(.282,1.794,.285,.190,.054,print("shelfTag"));b.panel(-.065,1.382,.283,.165,.052,print("shelfTag"));
    framed(b,.28,2.18,.006,0,.600,.187,"prizeCard");
    framed(b,-.827,1.858,.006,0,.475,.681,"tideCard");
  });
}
function stool(b,x,z){
  const leather=M("#a96550","plastic");b.tube([x,.009,z],[x,.038,z],.175,.160,gunmetal(),32);
  b.tube([x,.038,z],[x,.098,z],.109,.053,silver,28);b.tube([x,.086,z],[x,.573,z],.030,.029,silver,24);
  b.torus(x,.219,z,.126,.009,silver,32,Math.PI/2);
  for(let i=0;i<3;i++){const q=i*Math.PI*2/3;b.tube([x,.182,z],[x+.121*Math.cos(q),.219,z+.121*Math.sin(q)],.006,.006,silver,10)}
  b.tube([x,.554,z],[x,.575,z],.15,.166,silver,36);b.tube([x,.575,z],[x,.622,z],.166,.162,leather,36);b.ball(x,.619,z,.163,.016,.163,leather);b.torus(x,.616,z,.163,.0028,paper,40,Math.PI/2);
}
function gunmetal(){return M("#666a65","steel")}
export function buildCounter(b){
  b.at(counter.x,0,counter.z,counter.yaw,()=>{
    const w=counter.w,d=counter.d,z=d/2;
    b.box(0,.063,-.015,w-.11,.119,d-.13,ink);b.box(0,.498,0,w-.050,.801,d-.055,wood);
    const front=z-.022;
    for(let i=0;i<3;i++){const xx=(i-1)*(w-.145)/3,ww=(w-.145)/3-.050;
      b.box(xx,.480,front,ww,.603,.018,enamel);
      for(const sx of [-1,1])b.box(xx+sx*(ww/2-.016),.480,front+.010,.011,.561,.012,M("#8f977a","paint"));
      for(const sy of [-1,1])b.box(xx,.480+sy*.275,front+.010,ww-.035,.011,.012,M("#8f977a","paint"));
    }
    b.panel(0,.513,front+.013,.415,.132,print("houseplate"));
    b.box(0,.889,0,w+.02,.030,d+.028,brass);
    b.box(0,.923,0,w+.056,.057,d+.063,M("#ece2c6","lacquer","laminate",{repeat:[3,1]}));
    b.box(0,.910,z+.034,w+.035,.010,.007,darkwood);const top=.952;
    register(b,-.652,top,-.082);
    b.at(.213,top,.136,.06,()=>{
      b.box(0,.008,0,.344,.016,.184,brass);b.box(0,.019,0,.325,.008,.167,M("#436559","cloth"));
      for(const s of [-1,1]){b.box(s*.168,.021,0,.009,.017,.183,brass);b.box(0,.021,s*.087,.342,.017,.009,brass)}
      const r=rng(173);for(let i=0;i<14;i++)coin(b,(r()-.5)*.267,.023+Math.floor(i/9)*.003,(r()-.5)*.122,r()*6);
    });
    serviceBell(b,.681,top,.170);
    b.at(.591,top,-.116,-.11,()=>{
      b.box(0,.009,0,.248,.018,.163,red);b.box(0,.020,0,.238,.010,.153,paper);b.panel(0,.0254,0,.235,.150,print("ledger"),-Math.PI/2);
      b.tube([-.093,.034,.040],[.027,.034,-.050],.003,.003,M("#b88950","wood"),6);
    });
    b.at(-.089,top,-.084,0,()=>{
      b.box(0,.004,0,.219,.008,.088,brass);b.panel(0,.058,.003,.206,.083,print("shift"),-.22);
      b.panel(0,.057,-.020,.206,.083,paper,.22,Math.PI);
    });
    for(let i=0;i<3;i++){const xx=-.29+i*.043;b.tube([xx,top,-.244],[xx,top+.056,-.244],.021,.021,M(["#cca588","#d3c8a0","#b38370"][i],"matte"),18);b.tube([xx,top+.055,-.244],[xx,top+.057,-.244],.007,.007,ink,12)}
    // Bank of oak drawers on the staff side.
    b.at(0,.508,-z+.022,Math.PI,()=>{for(let i=0;i<3;i++)for(let j=0;j<2;j++){const xx=(i-1)*.66,yy=(j-.5)*.29;b.box(xx,yy,.004,.61,.266,.013,darkwood);b.path([[xx-.068,yy+.04,.015],[xx-.068,yy+.04,.041],[xx+.068,yy+.04,.041],[xx+.068,yy+.04,.015]],.006,brass,8)}});
    prizes(b);
  });
  stool(b,5.758,2.623);
}
export function bench(b){
  b.at(3.04,0,-3.62,-Math.PI/2,()=>{
    const leather=M("#9c6651","plastic");
    for(const x of [-.46,.46]){
      b.path([[x,.026,.184],[x,.331,.164],[x,.358,.119],[x,.358,-.136],[x,.326,-.164],[x,.024,-.198]],.017,gunmetal(),12);
      b.tube([x,.033,.185],[x,.014,.187],.022,.023,ink,12);b.tube([x,.031,-.197],[x,.011,-.201],.022,.023,ink,12);
      b.path([[x,.348,-.151],[x,.471,-.181],[x,.752,-.222]],.014,gunmetal(),12);
    }
    b.box(0,.361,0,1.204,.038,.421,darkwood);b.box(0,.398,0,1.195,.065,.414,leather);
    b.box(0,.429,0,1.171,.014,.407,leather);b.box(0,.419,.207,1.158,.004,.003,M("#d6b48b","cloth"));
    b.at(0,.641,-.201,0,()=>{for(const yy of [-.059,.054]){b.box(0,yy,0,1.218,.102,.028,wood);b.panel(0,yy,.015,1.192,.090,print("benchSlat"))}},-.12);
    b.at(.415,.437,-.017,.17,()=>{b.box(0,.002,0,.203,.004,.137,paper);b.panel(0,.0046,0,.202,.136,print("tickets"),-Math.PI/2)});
  });
}