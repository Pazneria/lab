"use strict";
const COURT={left:-7.65,right:7.65,back:-8.14,front:9.04,axis:.54,passW:3.04,roomW:4.18,turnZ:-12.83,endZ:-16.79};
function paver(x,z,w,d,y,m,rot,ofs){
  const hw=w/2,hd=d/2,corner=.018,edge=.009;
  const corners=[[-hw+corner,hd],[hw-corner,hd],[hw,hd-corner],[hw,-hd+corner],[hw-corner,-hd],[-hw+corner,-hd],[-hw,-hd+corner],[-hw,hd-corner]];
  const first=nv,st=(a,b)=>rot?[b*1.6+ofs,-a*1.4+ofs*.3]:[a*1.4+ofs,b*1.6+ofs*.31];
  const inner=corners.map(([a,b])=>[a*(1-edge/hw),b*(1-edge/hd)]);
  for(const [a,b] of inner)vertex([x+a,y,z+b],[0,1,0],...st(x+a,z+b),m);
  for(let j=1;j<7;j++)tri(first,first+j,first+j+1);
  for(let j=0;j<8;j++){
    const k=(j+1)%8,mid=[(corners[j][0]+corners[k][0])*.5,0,(corners[j][1]+corners[k][1])*.5];
    const norm=unit([Math.abs(mid[0])/hw>.98?Math.sign(mid[0])*.47:0,1,Math.abs(mid[2])/hd>.98?Math.sign(mid[2])*.47:0]);
    const pts=[[...inner[j],y],[...corners[j],y-.012],[...corners[k],y-.012],[...inner[k],y]];
    const base=nv;for(const [a,b,h] of pts)vertex([x+a,h,z+b],norm,...st(x+a,z+b),m);tri(base,base+1,base+2);tri(base,base+2,base+3);
  }
}
function pavingField(x0,x1,z0,z1,h,d,w,scheme){
  const low=mat("#5c6264","stone",1);
  quad([x0,h-.023,z1],[x1,h-.023,z1],[x1,h-.023,z0],[x0,h-.023,z0],low);
  let row=0,z=z0;
  while(z<z1-.009){
    const dd=Math.min(d*between(.94,1.06),z1-z),offset=row%2?w*.51:.07;
    let x=x0-offset;
    while(x<x1-.01){
      const ww=w*between(.86,1.16),a=Math.max(x,x0),b=Math.min(x+ww,x1),rw=b-a;
      if(rw>.052&&dd>.05){
        const m=mat(pick(scheme),"stone",1);paver((a+b)*.5,z+dd*.5,rw-.012,dd-.010,h+between(-.003,.003),shade(m,between(.963,1.035)),rand()>.7,rand()*12);
      }
      x+=ww;
    }
    row++;z+=dd;
  }
}
function pavement(){
  reflected(false,()=>{
    const stone=["#929898","#949b9e","#969b98","#9c9e97","#999a98","#98a0a0","#8c9599","#919698"];
    const alley=["#98928e","#a0968d","#9d958e","#a09a94","#9e9b93"];
    group("West courtyard stones",()=>pavingField(-7.68,-1.27,-8.15,9.05,0,.424,.79,stone));
    group("East courtyard stones",()=>pavingField(-1.085,7.68,-8.15,9.05,0,.424,.79,stone));
    group("Drainage channel",()=>{
      const x=-1.177;box(x,-.025,.44,.19,.024,17.2,P.black);
      for(const dx of [-.086,.086])box(x+dx,-.001,.44,.018,.025,17.2,P.steelDark);
      for(let j=0;j<27;j++){const z=-8.12+j*.638;
        for(let k=0;k<6;k++)box(x,-.002,z+.064+k*.096,.155,.021,.039,shade(P.steelDark,.88));
        box(x,-.001,z+.619,.16,.018,.047,P.iron);
      }
    });
    group("Covered passage stones",()=>pavingField(-1.56,2.65,-16.80,-8.15,-.002,.31,.53,alley));
    group("Entry recess stones",()=>pavingField(-1.57,1.65,9.04,10.76,-.001,.37,.62,stone));
  });
}
function windowUnit(x,y,z,w,h,lit=false,style=0){
  const surround=style===2?mat("#817a6c","stone"):P.iron,frameWood=style===1?shade(P.darkwood,.88):shade(P.iron,.83);
  box(x,y,z,w+.14,h+.15,.095,surround);
  box(x,y,z+.065,w+.05,h+.055,.08,frameWood);
  const glass=lit?mat(pick(["#bf9b6e","#d6b27e","#e4c598","#b29679"]),"paper",4):mat(pick(["#4e666f","#526874","#566a73","#435761"]),"metal",3);
  box(x,y,z+.104,w-.04,h-.045,.021,glass);
  const cnt=w>1.28?3:2;
  for(let i=1;i<cnt;i++)box(x-w/2+w*i/cnt,y,z+.127,.034,h-.01,.042,frameWood);
  box(x,y+h*.18,z+.127,w,.038,.044,frameWood);
  if(style===1){
    for(let j=1;j<4;j++)box(x,y-h/2+h*j/4,z+.135,w,.022,.023,P.darkwood);
  }else if(lit){
    for(let j=0;j<3;j++)box(x,y+h*.5-.09-j*.073,z+.124,w-.02,.049,.024,mat("#c6b397","fabric"));
    box(x-w*.35,y-.04,z+.123,.018,h-.10,.012,shade(glass,.82));
  }
  box(x,y-h*.51-.038,z+.08,w+.21,.087,.22,shade(P.stone,.88));
  if(lit)glow(x,y,z+.13,"#edae74",Math.min(w,h)*1.3);
}
function balcony(x,y,z,w){
  const m=mat("#555d5c","metal",2);
  box(x,y,z+.33,w+.18,.14,.83,shade(P.stone,.91));
  for(const side of [-1,1]){
    rod([x+side*w/2,y+.06,z+.69],[x+side*w/2,y+.92,z+.69],.026,m,8);
    rod([x+side*w/2,y+.91,z-.02],[x+side*w/2,y+.91,z+.69],.024,m,8);
    boxBeam([x+side*w*.34,y-.44,z-.02],[x+side*w*.34,y-.05,z+.63],.071,.066,m);
  }
  for(let i=0;i<=Math.ceil(w/.20);i++){const xx=x-w/2+w*i/Math.ceil(w/.20);rod([xx,y+.09,z+.69],[xx,y+.86,z+.69],.011,m,6,.011,false);}
  rod([x-w/2,y+.88,z+.69],[x+w/2,y+.88,z+.69],.026,m,8);rod([x-w/2,y+.28,z+.69],[x+w/2,y+.28,z+.69],.015,m,6);
}
function drainPipe(x,z,top,bottom=.19,m=P.zinc,bend=1){
  const p=[[x,top,z],[x,top-.29,z],[x+bend*.135,top-.47,z+.065],[x+bend*.135,bottom+.24,z+.065],[x+bend*.135,bottom+.14,z+.15],[x+bend*.135,bottom+.14,z+.28]];
  pipePath(p,.048,m,12);
  for(let y=bottom+.65;y<top-.51;y+=1.47){
    lathe(x+bend*.135,y,z+.065,[[.054,0],[.057,.015],[.054,.054]],P.iron,12);
    box(x+bend*.135,y+.025,z-.011,.10,.029,.132,P.iron);
  }
  for(let y=bottom+1.10;y<top-.56;y+=1.88)lathe(x+bend*.135,y,z+.065,[[.055,0],[.055,.042],[.050,.052]],shade(m,.88),12);
}
function ventUnit(x,y,z,w=.80){
  const h=w*.65;
  box(x,y,z+.11,w,h,.26,mat("#acae9e","metal",2));box(x,y+h*.5,z+.115,w+.025,.028,.275,P.zinc);
  const rr=h*.365,xx=x-w*.19,zz=z+.246;
  rod([xx,y,zz],[xx,y,zz+.006],rr*1.12,P.steelDark,24);
  for(const r of [.32,.54,.76,.98]){
    const path=[];for(let j=0;j<=18;j++){const a=j*TAU/18;path.push([xx+Math.cos(a)*rr*r,y+Math.sin(a)*rr*r,zz+.012]);}pipePath(path,.005,P.black,4);
  }
  for(let j=0;j<4;j++){const a=j*TAU/8;rod([xx+Math.cos(a)*rr,y+Math.sin(a)*rr,zz+.016],[xx-Math.cos(a)*rr,y-Math.sin(a)*rr,zz+.016],.005,P.black,4);}
  for(let j=0;j<7;j++)box(x+w*.235,y-h*.30+j*h*.085,zz+.003,w*.25,.012,.018,P.steelDark);
  for(const s of [-1,1]){box(x+s*w*.32,y-h*.53,z+.08,.053,.044,.30,P.iron);box(x+s*w*.32,y-h*.61,z-.005,.053,.12,.052,P.iron);}
  pipePath([[x+w*.50,y-h*.19,z+.07],[x+w*.57,y-h*.25,z+.07],[x+w*.58,y-h*.80,z+.032],[x+w*.73,y-h*.94,z+.032]],.016,P.cream,7);
}
function shutter(x,z,w,h,color){
  const m=mat(color,"metal",2);
  box(x,h/2+.035,z,w+.09,h+.07,.062,P.iron);
  for(let i=0;i<Math.ceil(h/.112);i++){
    const yy=.06+i*.112,hh=Math.min(.111,h+.03-yy);if(hh<.012)continue;
    quad([x-w/2,yy,z+.064],[x+w/2,yy,z+.064],[x+w/2,yy+hh*.78,z+.048],[x-w/2,yy+hh*.78,z+.048],m);
    quad([x-w/2,yy+hh*.78,z+.048],[x+w/2,yy+hh*.78,z+.048],[x+w/2,yy+hh,z+.065],[x-w/2,yy+hh,z+.065],shade(m,.86));
  }
  for(const s of [-1,1])box(x+s*(w/2+.04),h/2+.03,z+.051,.085,h+.10,.11,P.iron);
  box(x,h+.075,z+.04,w+.24,.20,.20,shade(m,.93));box(x,.073,z+.067,w,.084,.055,shade(m,.85));
  box(x,.25,z+.089,.165,.042,.031,P.iron);
}
function door(x,z,w=1.04,h=2.14,c="#667264",glazed=true){
  box(x,h/2+.022,z,w+.15,h+.08,.084,P.darkwood);box(x,h/2+.02,z+.052,w,h,.057,mat(c,"wood"));
  for(const xx of [-.43,.43])box(x+xx*w,h*.50,z+.09,.056,h-.043,.042,shade(P.darkwood,.92));
  if(glazed){
    box(x,h*.675,z+.088,w*.72,h*.41,.033,mat("#6d8283","metal",3));
    for(let i=-1;i<=1;i++)box(x+i*w*.22,h*.675,z+.112,.025,h*.42,.023,P.iron);
    box(x,h*.692,z+.114,w*.75,.026,.024,P.iron);
  }
  box(x,h*.26,z+.085,w*.72,h*.34,.034,mat(c,"wood"));box(x+w*.34,h*.468,z+.108,.055,.13,.026,P.brass);
  rod([x+w*.34,h*.47,z+.128],[x+w*.34-.093,h*.47,z+.133],.012,P.brass,7);
  box(x,.034,z+.109,w+.16,.059,.25,P.stone);
}
function bulkhead(x,y,z,tone="#eac99a",intensity=.74){
  box(x,y,z,.282,.18,.087,P.iron);
  box(x,y,z+.06,.239,.131,.075,mat(tone,"paper",4));
  for(const fx of [-.080,0,.08])box(x+fx,y,z+.106,.011,.144,.011,P.iron);
  light(x,y,z+.14,tone,intensity,3.0,.49);
}
function noticeBoard(x,y,z,w=1.21){
  box(x,y,z,w,.92,.06,P.darkwood);box(x,y,z+.034,w-.055,.86,.028,mat("#927659","reed"));
  frame(x-w*.20,y+.028,z+.055,0,0,-.033,()=>front(0,0,0,w*.44,.66,mat("#f1e4c9","poster")));
  frame(x+w*.23,y+.056,z+.057,0,0,.046,()=>front(0,0,0,w*.36,.52,mat("#efe3cf","stationery")));
  for(const px of [-.38,-.02,.092,.37]){const yy=px<0?y+.33:y+.29;rod([x+px*w,yy,z+.057],[x+px*w,yy,z+.063],.010,P.brass,7);}
  box(x,y+.495,z+.038,w+.11,.045,.14,P.zinc);
}
function broadPlant(x,y,z,size,count=12){
  const pot=mat("#916a50","stone");
  lathe(x,y,z,[[0,0],[size*.23,0],[size*.26,size*.06],[size*.34,size*.44],[size*.365,size*.46],[size*.36,size*.52],[size*.315,size*.52],[size*.302,size*.44],[0,size*.44]],pot,18);
  lathe(x,y+size*.455,z,[[size*.298,0],[0,.006]],mat("#493e32","stone"),16);
  for(let i=0;i<count;i++){
    const a=i*2.399+between(-.25,.25),r=size*between(.35,.72),h=size*between(.55,1.03),bw=size*between(.055,.094);
    const dx=Math.cos(a),dz=Math.sin(a),m=mat(pick(["#718962","#607758","#567258","#85916a","#718b62"]),"fabric");
    const leaf=(u,v)=>{const q=v**1.32,ww=(u-.5)*2*bw*Math.sin(Math.PI*v)**.68;return [x+dx*r*q-dz*ww,y+size*.44+h*(1.46*v-.88*v*v)+.075*size*Math.sin(Math.PI*v)*(1-Math.abs(u-.5)*2),z+dz*r*q+dx*ww];};
    surface(2,6,leaf,m,(u,v)=>[u,v],true);
    for(let j=0;j<3;j++)rod(leaf(.5,j*.23),leaf(.5,(j+1)*.23),size*.004,shade(m,1.16),4);
  }
  if(y<.1){barrier(x,z,size*.61,size*.61,0,y+size*.52,false);contact(x,z,size*.56,size*.56,.48,.23);}
}
function serviceMeter(x,y,z){
  box(x,y,z,.40,.59,.11,P.steelDark);box(x,y,z+.065,.36,.54,.035,mat("#989e8a","metal",2));
  box(x,y+.10,z+.087,.23,.13,.025,P.iron);box(x,y+.10,z+.102,.18,.071,.013,mat("#a8b2a0","plain",3));
  front(x,y-.12,z+.085,.21,.103,mat("#e1d5ac","utility"));
  for(let i=0;i<3;i++)pipePath([[x-.11+i*.097,y-.30,z+.03],[x-.11+i*.097,y-.63,z+.03],[x-.08+i*.097,y-.71,z+.03],[x-.08+i*.097,.11,z+.03]],.014,P.zinc,7);
}
function aerial(x,y,z){
  rod([x,y,z],[x,y+1.16,z],.018,P.steelDark,7);rod([x-.52,y+1.01,z],[x+.54,y+1.01,z],.011,P.steelDark,6);
  for(let i=0;i<6;i++){const xx=x-.43+i*.171,dd=.15+i*.024;rod([xx,y+1.02,z-dd],[xx,y+1.02,z+dd],.010,P.zinc,5);}
}
function brickScars(x,y,z,n=13){
  const colors=["#987f6f","#9c8271","#908073","#998a76"];
  for(let j=0;j<3;j++){const count=Math.max(1,Math.round(n/3)-j);for(let i=0;i<count;i++){
    if(rand()<.13)continue;
    box(x+(i-count/2)*.238+(j%2)*.10,y+j*.108,z,.224,.092,.014,mat(pick(colors),"stone"));
  }}
}
function facadeBase(w,h,color,brick=false){
  const f=mat(color,brick?"brick":"wall",6,brick?.51:.74);
  wallBlock(0,h/2,-.225,w,h,.45,f);barrier(0,-.215,w,.43,0,h);
  box(0,.158,.033,w,.316,.097,mat("#737972","stone",6));
  box(0,.343,.049,w+.005,.064,.119,shade(P.stone,.85));
  box(0,.048,.113,w,.095,.23,mat("#7c817d","stone",1));
  box(0,h+.023,-.175,w+.13,.15,.59,mat("#767c78","stone",6));
  box(0,h+.125,-.17,w+.17,.056,.62,P.zinc);
  contact(0,-.03,w,.18,.43,.43,.12);
  for(const s of [-1,1])box(s*(w/2-.092),h*.51,.018,.125,h*.99,.064,shade(f,.95));
}
function upperFacade(w,h,type,seed){
  const r=randomSource(seed),cream=type==="residence"||type==="hall";
  const n=w>6.1?3:2;
  for(let level=0;3.35+level*2.48<h-.85;level++){
    const yy=3.74+level*2.45;
    for(let i=0;i<n;i++){
      const xx=(i+.5)*w/n-w/2+.07*(level%2);
      const wide=(cream?1.49:1.20)*(1+r()*.13),lit=r()<.26;
      windowUnit(xx,yy,.02,wide,1.15+(i%2)*.11,lit,cream?1:0);
      if((type==="residence"&&i===0&&level===0)||(type==="hall"&&i===1&&level===0))balcony(xx,yy-.76,.01,wide+.44);
      if(!lit&&r()<.24)box(xx+wide*.24,yy,.171,wide*.42,1.09,.040,mat("#71786a","wood"));
    }
    if(level===0&&type==="garage")ventUnit(w*.14,2.78,.04,.74);
  }
  box(0,2.96,.038,w,.085,.12,mat("#767a73","stone",6));
  drainPipe(-w*.5+.31,.096,h-.05,.14,type==="residence"?P.rust:P.zinc,type==="hall"?-1:1);
  if(h>7.3&&seed%3===0)aerial(w*.2,h+.12,-.32);
  if(type==="garage"||type==="supply")box(w*.18,h+.36,-.46,.75,.44,.57,P.zinc);
}
function frontDesign(w,type){
  if(type==="garage"){
    shutter(-.12,.035,w*.65,2.47,"#77847e");
    serviceMeter(w*.424,1.39,.045);
    plaque(w*.26,2.72,.078,.72,.20,"delivery",P.darkwood,.025);
  }else if(type==="residence"){
    door(-w*.216,.03,.98,2.15,"#7c715e",true);
    windowUnit(w*.184,1.66,.04,1.38,.89,false,1);
    for(let i=0;i<8;i++)box(w*.184-.68+i*.193,.79,.062,.106,.76,.055,P.darkwood);
    box(w*.184,1.143,.099,1.55,.091,.135,P.oak);
    bulkhead(-w*.405,2.21,.082,"#d7c39f",.67);
  }else if(type==="supply"){
    shutter(-w*.154,.032,w*.48,2.33,"#6e7979");door(w*.302,.028,.92,2.15,"#626e66",false);
    plaque(-w*.15,2.66,.076,2.18,.38,"wallType",shade(P.stone,.89),.030);
  }else if(type==="hall"){
    door(.02,.035,1.16,2.21,"#756854",true);noticeBoard(-w*.29,1.42,.085,1.03);
    box(w*.29,1.56,.12,.79,.95,.16,mat("#6f7c74","metal",2));front(w*.29,1.66,.203,.37,.161,mat("#e1ddc6","locker"));
    bulkhead(.91,2.27,.076,"#e6bf91",.8);
  }else{
    windowUnit(-.26,1.65,.02,1.51,.89,false,0);ventUnit(w*.30,1.62,.056,.8);
    brickScars(-w*.31,.45,.067,14);
  }
}
function facade(name,x,z,yaw,w,h,color,type,seed,brick=false){
  group(name,()=>place(x,0,z,yaw,()=>{
    facadeBase(w,h,color,brick);frontDesign(w,type);upperFacade(w,h,type,seed);
  }));
}
function enclosingFacades(){
  const west=[[-8.14,-2.13,7.59,"#a99f8a","supply",321,true],[-2.13,3.60,8.32,"#a99a87","residence",488,false],[3.60,9.04,6.71,"#aba99a","garage",714,false]];
  const east=[[-8.14,-2.70,8.73,"#a1988d","residence",155,false],[-2.70,3.15,6.82,"#97968c","garage",563,true],[3.15,9.04,8.02,"#acaa94","hall",231,false]];
  for(const [side,list] of [[-1,west],[1,east]])for(const [a,b,h,col,type,seed,brick] of list)
    facade((side<0?"West ":"East ")+type,side*7.65,(a+b)/2,side<0?Math.PI/2:-Math.PI/2,b-a,h,col,type,seed,brick);
  const leftEdge=COURT.axis-COURT.passW/2,rightEdge=COURT.axis+COURT.passW/2;
  facade("Fish warehouse",(-7.65+leftEdge)/2,-8.14,0,leftEdge+7.65,8.07,"#aaa18d","garage",432,true);
  facade("North co-operative",(7.65+rightEdge)/2,-8.14,0,7.65-rightEdge,7.12,"#b6a994","hall",621);
  // Upper story bridges the passage, with a separate lintel and deep timber reveals.
  group("North gatehouse",()=>place(COURT.axis,0,-8.14,0,()=>{
    const w=COURT.passW,h=8.03,open=2.70,plaster=mat("#ac9f8d","wall",6);
    wallBlock(0,(h+open)*.5,-.33,w,h-open,.66,plaster);shadeBlock(0,-.33,w,.65,open,h);
    box(0,open+.019,-.16,w+.28,.19,.69,P.darkwood);
    box(0,h+.039,-.22,w+.08,.14,.66,P.stone);box(0,h+.14,-.22,w+.14,.062,.70,P.zinc);
    windowUnit(.08,5.12,.018,1.61,1.25,true,1);balcony(.08,4.38,.024,2.08);
    box(0,3.48,.062,2.53,.80,.10,P.darkwood);plaque(0,3.48,.132,2.43,.72,"courtSign",P.darkwood);
    for(const xx of [-1.04,1.04]){boxBeam([xx,3.88,.01],[xx,4.00,.36],.026,.026,P.iron);rod([xx,3.959,.36],[xx,3.91,.36],.055,P.iron,12);}
    light(0,3.88,.53,"#f8d9a0",.94,2.75);
    for(const s of [-1,1]){
      box(s*(w/2-.057),1.40,-.10,.111,2.80,.26,P.darkwood);
      box(s*(w*.5-.075),.14,-.078,.166,.27,.29,P.stone);
    }
    signLamp(0,2.485,-.06,"teaWay",1.17,.302,"#e6c598");
    for(const xx of [-1.16,1.16])clothPanel(xx,2.60,-.14,.47,.31,mat("#797e63","fabric"),xx);
  }));
  group("Painted market blade",()=>place(-2.10,0,-8.01,.13,()=>{
    for(const yy of [3.69,5.23]){box(0,yy,.22,.072,.084,.47,P.iron);box(0,yy,.008,.26,.21,.033,P.steelDark);}
    box(0,4.48,.47,.56,1.99,.18,P.black);front(0,4.48,.565,.478,1.87,mat("#c0d5bc","blade",4));
    for(const s of [-1,1])box(s*.264,4.48,.555,.019,1.92,.026,P.copper);
    light(0,4.46,.60,"#85c3b4",.81,3.5,0);
  }));
  const enL=-1.56,enR=1.65;
  facade("South-side stores",(-7.65+enL)/2,9.04,Math.PI,enL+7.65,6.83,"#9b9f90","hall",345);
  facade("South repair shop",(7.65+enR)/2,9.04,Math.PI,7.65-enR,7.61,"#aba190","supply",456,true);
  group("East entrance",()=>place(.045,0,9.04,Math.PI,()=>{
    const w=3.21;
    wallBlock(0,4.39,-.25,w,3.02,.50,mat("#aa9d88","wall",6));box(0,2.89,-.09,w+.24,.20,.65,P.darkwood);
    box(0,5.93,-.19,w+.13,.13,.59,P.zinc);windowUnit(0,4.71,.022,1.24,.78,false,1);
    plaque(0,3.51,.081,1.76,.5,"exitSign",P.darkwood);
    for(const s of [-1,1]){
      wallBlock(s*(w*.5+.10),1.52,-.85,.20,3.04,1.70,mat("#928f81","wall",6));barrier(s*(w*.5+.10),-.85,.20,1.70,0,3.04);
      post(s*(w*.5-.071),.038,2.85,P.darkwood,.118);
    }
    box(0,2.96,-.86,w,.15,1.74,P.darkwood);
    wallBlock(0,1.48,-1.77,w,2.96,.15,mat("#5e7275","wall",6));barrier(0,-1.68,w,.19,0,3.0);
    for(let i=0;i<16;i++)box(-1.47+i*.197,1.18,-1.58,.045,2.36,.042,P.iron);
    for(const yy of [.25,1.45,2.34])box(0,yy,-1.57,w-.07,.048,.056,P.steelDark);
    for(const s of [-1,1])box(s*.037,1.20,-1.54,.046,2.4,.071,P.iron);
    bulkhead(-1.24,2.24,-1.54,"#dbbc92",.72);
  }));
}
function shoji(x,y,z,w,h,lit=true){
  box(x,y,z,w+.09,h+.09,.08,P.darkwood);box(x,y,z+.047,w,h,.035,lit?mat("#cbb08c","paper",4):mat("#a5a798","paper"));
  for(let i=0;i<=6;i++)box(x-w/2+i*w/6,y,z+.071,i===3?.039:.022,h+.034,.023,P.darkwood);
  for(let j=0;j<=4;j++)box(x,y-h/2+j*h/4,z+.076,w+.021,.021,.027,P.darkwood);
}
function kettle(x,y,z,scale,iron=true){
  const m=iron?mat("#53524b","stone",2):mat("#ad7c5a","paper",3),cap=iron?P.black:P.cobalt,r=.155*scale,h=.215*scale;
  lathe(x,y,z,[[0,0],[r*.57,0],[r*.79,h*.09],[r*.98,h*.37],[r,h*.58],[r*.91,h*.76],[r*.71,h*.90],[r*.64,h*.94],[r*.52,h*.86],[0,h*.85]],m,24);
  lathe(x,y+h*.91,z,[[0,0],[r*.72,0],[r*.73,h*.044],[r*.62,h*.085],[r*.18,h*.14],[0,h*.14]],cap,22);
  ell(x,y+h*1.095,z,r*.115,h*.09,r*.115,P.brass,10,6);
  rod([x+r*.65,y+h*.35,z],[x+r*1.18,y+h*.64,z],r*.29,m,12,r*.23);
  rod([x+r*1.18,y+h*.64,z],[x+r*1.42,y+h*.96,z],r*.23,m,12,r*.15);
  rod([x+r*1.416,y+h*.961,z],[x+r*1.424,y+h*.979,z],r*.105,shade(P.black,.7),12);
  const pts=[];for(let i=0;i<=16;i++){const a=i/16*Math.PI;pts.push([x+Math.cos(a)*r*.86,y+h*.69+Math.sin(a)*h*.98,z]);}
  pipePath(pts,.015*scale,cap,8);
  for(const s of [-1,1])ell(x+s*r*.86,y+h*.69,z,.024*scale,.03*scale,.022*scale,P.copper,9,5);
}
function umbrellaStand(x,z){
  const pot=mat("#6b8074","paper",3);
  vase(x,.018,z,.117,.37,"urn",pot,P.cobalt);
  for(const [dx,ang,c] of [[-.028,-.16,"#755763"],[.035,.15,"#576779"]]){
    frame(x+dx,.09,z,0,.09,ang,()=>{
      rod([0,0,0],[0,.68,0],.008,P.iron,7);
      lathe(0,.17,0,[[.014,0],[.046,.27],[.060,.34],[.032,.38],[.020,.44]],mat(c,"fabric"),9);
      lathe(0,.44,0,[[.049,0],[.047,.019]],P.darkwood,9);
      pipePath([[0,.65,0],[0,.72,0],[.028,.747,0],[.060,.733,0],[.063,.710,0]],.009,P.oak,7);
    });
  }
  barrier(x,z,.24,.24,0,.84,false);contact(x,z,.22,.22,.42,.15);
}
function teaTin(x,y,z,r,h){
  surface(22,2,(u,v)=>{const a=(u-.5)*TAU;return [x+Math.sin(a)*r,y+v*h,z+Math.cos(a)*r];},mat("#f2ecda","teaTin",2),(u,v)=>[u,1-v]);
  lathe(x,y+h-.015,z,[[r*1.03,0],[r*1.03,.024],[r*.96,.028],[0,.028]],P.brass,20);
}
function teaRoom(){
  const c=COURT,ax=c.axis,left=ax-c.passW/2,right=ax+c.passW/2,zMid=(c.turnZ+c.back)/2,long=c.back-c.turnZ;
  const plaster=mat("#b1a28a","wall",6),tile=mat("#899c90","metal",3),walnut=P.darkwood;
  group("Covered passage",()=>{
    for(const s of [-1,1]){
      const x=s<0?left:right;
      place(x,0,zMid,s<0?Math.PI/2:-Math.PI/2,()=>{
        wallBlock(0,1.39,-.13,long,2.78,.26,plaster);barrier(0,-.13,long,.26,0,2.80);
        box(0,.32,.022,long,.64,.050,tile);box(0,.68,.051,long,.071,.084,P.oak);
        for(let j=0;j<3;j++)box(0,.105+j*.205,.052,long,.012,.009,shade(tile,.61));
        for(let j=0;j<3;j++)for(let i=0;i<11;i++)box(-long/2+.13+(i+(j%2)*.5)*.427,.185+j*.204,.053,.010,.189,.009,shade(tile,.66));
        box(0,.06,.069,long,.12,.089,P.slate);contact(0,.01,long,.12,.41,.36,.40);
        if(s<0){
          shoji(-.52,1.65,.04,1.33,.70,false);pipePath([[-2.24,2.37,.064],[.17,2.37,.064],[.38,2.22,.064],[2.28,2.22,.064]],.019,P.iron,7);
          bulkhead(.91,1.89,.08,"#eac794",1.22);
        }else{
          plaque(.78,1.53,.075,.64,.86,"fishPrint",walnut,.039);
          plaque(-.44,1.51,.07,.35,.42,"stationery",walnut,.025);
          bulkhead(-1.41,2.16,.075,"#f0c791",1.05);
        }
      });
    }
    box(ax,2.85,zMid,c.passW+.10,.16,long+.11,P.darkwood);
    for(let j=0;j<10;j++)box(left+.164+j*.304,2.743,zMid,.288,.061,long+.12,shade(P.cedar,.77+.08*rand()));
    for(let j=0;j<4;j++)box(ax,2.675,c.back-.23-j*1.37,c.passW+.08,.13,.14,P.darkwood);
    contact(ax,zMid,c.passW,long,.08,.15,1);
    for(const z of [c.back+.012,c.turnZ+.017]){box(ax,.004,z,c.passW,.019,.175,mat("#aaa394","stone",1));}
  });
  group("Tea alcove",()=>{
    const rw=c.roomW,rl=c.turnZ-c.endZ,rm=(c.turnZ+c.endZ)/2;
    const teaPlaster=mat("#b9aa8c","wall",6);
    for(const s of [-1,1]){
      const x=ax+s*rw/2;
      place(x,0,rm,s<0?Math.PI/2:-Math.PI/2,()=>{
        wallBlock(0,1.55,-.12,rl,3.10,.24,teaPlaster);barrier(0,-.12,rl,.24,0,3.1);
        box(0,.42,.045,rl,.84,.09,P.cedar);
        for(let i=0;i<Math.floor(rl/.16);i++)box(-rl/2+.075+i*.16,.42,.098,.019,.78,.014,P.darkwood);
        box(0,.857,.06,rl,.065,.105,P.darkwood);contact(0,.03,rl,.10,.51,.33,.6);
        if(s>0)shoji(-.25,1.72,.04,1.68,.95,true);
        else{plaque(-.57,1.62,.081,.35,1.05,"teaScroll",P.oak,.027);wallMenu(.63,1.56,.082,.49,"tea");}
      });
      const nib=(rw-c.passW)/2;
      wallBlock(ax+s*(c.passW/2+nib/2),1.48,c.turnZ+.075,nib,2.96,.15,teaPlaster);
      barrier(ax+s*(c.passW/2+nib/2),c.turnZ+.075,nib,.15,0,2.96);
    }
    box(ax,3.15,rm,rw+.44,.23,rl+.30,P.darkwood);
    for(let i=0;i<4;i++)box(ax,3.015,c.turnZ-.35-i*1.01,rw+.01,.11,.12,P.oak);
    wallBlock(ax,1.55,c.endZ-.13,rw,3.10,.26,teaPlaster);barrier(ax,c.endZ-.13,rw,.26,0,3.10);
    shoji(ax+.44,1.79,c.endZ+.017,1.73,.96,true);
    for(const s of [-1,1])box(ax+s*1.89,1.49,c.endZ+.09,.10,2.98,.15,P.darkwood);
    contact(ax,rm,rw,rl,.06,.19,1);
    place(ax,0,-15.84,0,()=>{
      slatCabinet(0,.025,-.03,2.99,.84,.90,mat("#876749","wood"),P.darkwood,16);
      box(0,.919,-.011,3.15,.104,1.01,P.lightwood);
      box(-.38,.981,-.015,1.02,.014,.46,mat("#75795c","reed"));
      box(-.42,.995,-.043,.41,.025,.30,P.darkwood);
      bowl(-.42,1.015,-.052,.117,.080,P.cobalt,P.brass);
      kettle(-.43,1.088,-.05,1.12,true);
      for(const [xx,zz] of [[.01,.04],[.19,.076]])vase(xx,.974,zz,.056,.080,"cup",P.ivory,P.cobalt);
      teaTin(.68,.974,-.25,.084,.185);teaTin(.88,.974,-.28,.076,.155);
      bowl(.70,.974,.063,.094,.051,P.ivory,mat("#8c9e86","paper",3));
      rod([.77,1.035,.102],[.98,1.028,.028],.007,P.lightwood,6);
      card(1.23,.975,.23,.242,"teaMenu");
      vase(-1.17,.975,-.23,.082,.225,"flask",mat("#799188","paper",3));
      const greens=mat("#819562","fabric");for(let j=0;j<3;j++){
        const a=-.22+j*.22;rod([-1.17,1.17,-.23],[-1.17+a,1.50+Math.abs(a)*.4,-.23+j*.035],.006,P.oak,6);
        for(let k=0;k<3;k++)fruitLeaf(-1.17+a*(.55+k*.17),1.36+k*.06,-.22+j*.022,k*2.7+j,.060,greens);
      }
      box(0,1.30,-.855,2.82,.057,.21,P.darkwood);
      teaTin(-.87,1.335,-.85,.090,.20);teaTin(-.65,1.335,-.85,.077,.17);
      vase(.12,1.334,-.835,.093,.20,"flask",P.ivory,P.cobalt);bowl(.78,1.334,-.84,.14,.065,P.cobalt);
      plaque(-1.07,1.90,-.875,.55,.64,"teaMenu",P.darkwood);
      S.steam.push({p:wp(-.22,1.33,-.05),w:.12,h:.49,seed:5.2});
    });
    stool(ax-.87,-14.88,.23,.48);stool(ax+.67,-14.91,.23,.48);
    lantern(ax-1.14,2.22,-14.99,.34,.50,"tea",2.55);
    rod([ax-1.14,2.60,-14.99],[ax-1.14,3.01,-14.99],.011,P.cable,7);
    signLamp(ax+.20,2.58,c.endZ+.115,"teaSign",1.40,.42,"#e7c68f");
    light(ax+.91,2.19,-15.60,"#f4d2a0",1.22,3.6);
    umbrellaStand(ax+1.71,-13.33);
  });
}
function bicycle(){
  const frameMetal=mat("#61786f","metal",2),rubber=mat("#393c39","fabric"),tyreSide=mat("#9d967b","fabric"),metal=P.steelDark;
  function bicycleWheel(xx){
    const cy=.34,rz=.332,n=32;
    for(const [r,minor,m,depth] of [[rz,.022,rubber,0],[rz-.019,.009,tyreSide,.013],[rz-.038,.012,metal,0]]){
      const pts=[];for(let j=0;j<=n;j++){const a=j*TAU/n;pts.push([xx+Math.cos(a)*r,cy+Math.sin(a)*r,depth]);}pipePath(pts,minor,m,6);
    }
    for(let j=0;j<20;j++){const a=j*TAU/20,b=a+.45;rod([xx+Math.cos(a)*.031,cy+Math.sin(a)*.031,j%2?.033:-.033],[xx+Math.cos(b)*.288,cy+Math.sin(b)*.288,0],.0037,P.steel,5,.0037,false);}
    rod([xx,cy,-.062],[xx,cy,.064],.024,P.steelDark,10);
    const pts=[];for(let j=0;j<17;j++){const a=.05*Math.PI+j*.94*Math.PI/16;pts.push([xx+Math.cos(a)*.364,cy+Math.sin(a)*.364,0]);}pipePath(pts,.016,frameMetal,7);
  }
  bicycleWheel(-.54);bicycleWheel(.54);
  for(const zz of [-.044,.044]){
    pipePath([[-.54,.34,zz],[-.11,.302,zz],[-.22,.790,zz*.35],[-.54,.34,zz]],.018,frameMetal,8);
    rod([.54,.34,zz],[.365,.79,zz*.48],.019,frameMetal,8);
  }
  pipePath([[-.10,.304,0],[.078,.353,0],[.34,.73,0],[.37,.80,0]],.027,frameMetal,9);
  pipePath([[-.20,.663,0],[-.02,.453,0],[.126,.448,0],[.355,.754,0]],.017,frameMetal,8);
  rod([-.22,.76,0],[-.245,.884,0],.019,P.steel,9);
  ell(-.265,.895,0,.113,.032,.074,P.darkwood,12,5);
  pipePath([[.365,.783,0],[.328,.97,0],[.25,1.0,-.14],[.18,.975,-.21]],.014,P.steel,8);
  pipePath([[.328,.97,0],[.25,1.0,.14],[.18,.975,.21]],.014,P.steel,8);
  for(const sz of [-1,1])rod([.23,.991,sz*.156],[.17,.970,sz*.222],.021,rubber,8);
  rod([-.105,.31,-.083],[-.105,.31,.085],.067,metal,13);
  rod([-.105,.31,.088],[-.232,.30,.088],.016,metal,7);rod([-.232,.30,.065],[-.232,.30,.160],.023,rubber,7);
  pipePath([[-.54,.34,.045],[-.54,.739,.045],[-.29,.739,.045]],.011,metal,7);
  box(-.53,.749,0,.43,.026,.14,frameMetal);
  // Tapered open wire basket over the front mudguard.
  for(let j=0;j<3;j++){
    const yy=.77+j*.07,w=.27+j*.039,d=.24+j*.03;
    const pts=[[.55-w/2,yy,-d/2],[.55+w/2,yy,-d/2],[.55+w/2,yy,d/2],[.55-w/2,yy,d/2],[.55-w/2,yy,-d/2]];
    pipePath(pts,.007,metal,6);
  }
  for(const s of [-1,1])for(let i=0;i<6;i++){const u=i/5-.5;rod([.55+u*.27,.77,s*.12],[.55+u*.348,.916,s*.15],.005,metal,5);}
  pipePath([[-.09,.30,-.045],[-.21,.025,-.19],[-.27,.015,-.20]],.012,metal,6);
  barrier(0,0,1.72,.37,0,1.04,false);contact(0,0,1.62,.35,.34,.23);
}
function manhole(x,z,r=.30){
  const m=shade(P.steelDark,.79);
  lathe(x,.001,z,[[r,0],[r,.008],[r*.95,.014],[0,.014]],m,32);
  const rim=shade(P.iron,.96);
  for(const k of [.91,.81,.38])lathe(x,.015,z,[[r*k,.001],[r*k-.008,.006],[r*k-.014,.001]],rim,30);
  for(let j=0;j<18;j++){
    const a=j*TAU/18;
    place(x+Math.sin(a)*r*.61,.017,z+Math.cos(a)*r*.61,a+.42,()=>box(0,0,0,.019,.009,r*.25,rim));
  }
  for(const s of [-1,1])box(x+s*r*.67,.021,z,.024,.006,.054,P.black);
}
function streetDetails(){
  group("Entrance delivery bicycle",()=>place(5.22,0,8.46,-.12,bicycle));
  group("Courtyard service details",()=>{
    place(-7.48,0,5.04,Math.PI/2,()=>{
      broadPlant(-.74,.012,.30,.49,12);broadPlant(-.25,.012,.36,.34,9);
      serviceMeter(.75,1.31,.034);
      pipePath([[.77,2.01,.07],[.77,2.26,.07],[1.98,2.26,.07],[2.12,2.39,.07],[2.12,3.12,.07]],.016,P.iron,7);
    });
    place(7.47,0,-4.67,-Math.PI/2,()=>{
      broadPlant(-.63,.012,.22,.43,10);broadPlant(-.18,.012,.29,.26,8);
      frame(1.42,1.49,.055,0,0,-.027,()=>front(0,0,0,.48,.64,mat("#dcd3b7","poster")));
    });
    place(-6.42,0,-7.91,.03,()=>{
      woodenCrate(0,.017,0,.70,.38,.48,P.oak,true);woodenCrate(.04,.400,.009,.64,.27,.44,P.lightwood);
      barrier(0,0,.71,.49,0,.69,false);contact(0,0,.70,.49,.52,.31);
      broadPlant(.64,.012,.04,.36,9);
    });
    place(2.45,0,-7.97,0,()=>{broadPlant(.10,.008,.26,.44,11);});
    place(-2.21,0,8.75,Math.PI,()=>{broadPlant(0,.01,0,.46,11);broadPlant(.45,.01,.05,.29,8);});
    reflected(false,()=>{
      manhole(.82,5.94,.294);manhole(2.02,-1.20,.207);
      for(let i=0;i<41;i++){
        const z=between(-7.64,8.57),x=i<22?-1.30+between(-.08,.26):pick([-1,1])*between(6.80,7.38);
        const m=mat(pick(["#a58852","#786344","#ab925e","#8b7950"]),"paper"),len=between(.043,.082),a=between(0,TAU);
        place(x,.009,z,a,()=>{quad([-len*.50,.002,0],[-len*.11,.008,-len*.21],[len*.48,.011,0],[-len*.14,.012,len*.17],m,null,[0,1,0]);});
      }
    });
  });
  group("Catenary lamps and utilities",()=>{
    const lines=[
      [[-7.52,4.47,5.91],[7.56,4.77,3.91],.66,[[.22,.30,.40,"plain",.72],[.51,.38,.48,"amber",2.65],[.80,.29,.38,"plain",.69]]],
      [[-7.53,4.95,-1.73],[7.54,4.36,-4.87],.70,[[.19,.29,.39,"plain",.81],[.45,.35,.47,"amber",2.25],[.73,.29,.40,"plain",.94]]]
    ];
    for(const [a,b,sag,lamps] of lines){
      const point=rope(a,b,sag,.012,P.cable,24);
      for(const [t,w,h,kind,pow] of lamps){
        const [x,y,z]=point(t),s=.17+(t%.13);rod([x,y,z],[x,y-s,z],.008,P.cable,6);
        lantern(x,y-s-.13-h/2,z,w,h,kind,pow);
      }
    }
    for(let j=0;j<3;j++){rope([-7.58,6.41+j*.13,1.31],[7.58,6.87+j*.12,-5.16],.33+j*.03,.009,P.cable,19);}
    rope([-5.52,6.23,-8.13],[7.62,6.60,2.84],.48,.013,P.cable,20);
    // Small insulators finish the cables where they actually meet the walls.
    for(const [x,y,z] of [[-7.50,4.47,5.91],[7.50,4.77,3.91],[-7.50,4.95,-1.73],[7.50,4.36,-4.87]]){
      box(x,y,z,.22,.085,.090,P.iron);lathe(x,y,z,[[.035,0],[.042,.037],[.029,.051],[.040,.070],[.035,.094]],P.ivory,10);
    }
  });
}
function buildWorld(){
  palette();pavement();enclosingFacades();buildShops();teaRoom();streetDetails();awningBindings();roofAndWorkshopDetails();
}
function metalOverdoor(w,h,d,m){
  surface(Math.round(w/.10),5,(u,v)=>[(u-.5)*w,h+.19*(1-v)+.015*Math.cos(u*TAU*Math.round(w/.24)),d*v],m,(u,v)=>[u*w,v*d],true);
  box(0,h-.012,d,w+.035,.065,.07,shade(m,.89));
  for(const s of [-1,1]){
    const x=s*(w*.5-.14);
    boxBeam([x,h-.32,.02],[x,h-.038,d-.04],.033,.042,P.iron);
    box(x,h+.01,d*.45,.045,.043,d*.94,P.steelDark);
  }
}
function roofAndWorkshopDetails(){
  group("Warehouse canopy and ladder",()=>place(-4.17,0,-8.055,0,()=>{
    metalOverdoor(3.86,2.64,.57,mat("#78857d","metal",2));
    for(const xx of [-2.75,-2.33])rod([xx,2.84,.17],[xx,8.57,.17],.020,P.zinc,8);
    for(let j=0;j<18;j++)rod([-2.75,3.0+j*.302,.17],[-2.33,3.0+j*.302,.17],.015,P.steelDark,7);
    for(const yy of [3.12,4.88,6.65,7.95])for(const xx of [-2.75,-2.33])rod([xx,yy,-.04],[xx,yy,.17],.018,P.iron,6);
    for(const xx of [-2.75,-2.33])pipePath([[xx,8.54,.17],[xx,8.66,.11],[xx,8.66,-.09],[xx,8.56,-.17]],.020,P.zinc,7);
  }));
  group("Workshop entrance canopy",()=>place(4.93,0,8.97,Math.PI,()=>{
    metalOverdoor(2.78,2.57,.55,mat("#877b68","metal",2));
  }));
  group("Gatehouse rooftop cistern",()=>place(5.06,7.29,-8.65,-.07,()=>{
    for(const s of [-1,1])for(const z of [-.35,.35])box(s*.59,.19,z,.095,.38,.099,P.steelDark);
    const tank=mat("#8b9997","metal",2);box(0,.895,0,1.55,1.09,.95,tank);
    for(const yy of [.38,.91,1.41])box(0,yy,.012,1.58,.035,.96,P.steelDark);
    for(const xx of [-.76,0,.76])box(xx,.90,.482,.032,1.05,.023,P.zinc);
    for(const s of [-1,1]){
      boxBeam([s*.73,.438,.487],[s*.075,.862,.487],.023,.017,shade(tank,1.08));
      boxBeam([s*.73,1.378,.487],[s*.075,.963,.487],.023,.017,shade(tank,1.08));
    }
    box(-.32,1.46,-.05,.39,.035,.35,P.steelDark);pipePath([[.76,.47,0],[.91,.47,0],[.94,.38,0],[.94,-.085,0]],.039,P.zinc,10);
  }));
  group("Residence bamboo shade",()=>place(-7.52,0,.53,Math.PI/2,()=>{
    const bx=-1.26,by=4.31;
    for(let j=0;j<14;j++)rod([bx-.60,by-j*.038,.071],[bx+.60,by-j*.038,.071],.016,shade(P.oak,j%3===0?.83:.96),7,.016,false);
    for(const dx of [-.45,.42])rod([bx+dx,by+.051,.08],[bx+dx,by-.57,.085],.006,P.twine,6);
    rod([bx-.64,by+.048,.066],[bx+.64,by+.048,.066],.029,P.darkwood,9);
  }));
}