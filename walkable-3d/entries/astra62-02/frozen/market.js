"use strict";
const P={};
function palette(){
  Object.assign(P,{
    iron:mat("#484c49","metal",2),black:mat("#303638","metal",2),brass:mat("#b39458","metal",2),rust:mat("#865e42","metal",2),
    steel:mat("#a9b5b3","metal",2),steelDark:mat("#717f80","metal",2),copper:mat("#a87350","metal",2),zinc:mat("#6e8389","metal",2),
    oak:mat("#af8051","wood"),lightwood:mat("#c6a071","wood"),darkwood:mat("#694a37","wood"),cedar:mat("#956145","wood"),
    almostBlack:mat("#332e29","wood"),cable:mat("#343938","fabric"),twine:mat("#b59b72","reed"),
    stone:mat("#a09e90","stone"),brick:mat("#99877b","brick"),cream:mat("#e1d3b7","paper"),slate:mat("#54616b","stone"),
    opal:mat("#fed49a","paper",4),white:mat("#e4e3ce","paper"),glass:mat("#82a39e","plain",3),
    terracotta:mat("#ad7055","stone"),ivory:mat("#d7c9ad","paper",3),cobalt:mat("#354f61","paper",3)
  });
}
function group(name,fn){
  const start=ni,rStart=nr,vStart=nv;fn();if(ni===start)return;
  const lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];
  for(let i=vStart;i<nv;i++)for(let j=0;j<3;j++){const x=verts[i*VSTR+j];if(x<lo[j])lo[j]=x;if(x>hi[j])hi[j]=x;}
  (S.groups||(S.groups=[])).push({name,start,count:ni-start,rStart,rCount:nr-rStart,lo,hi});
}
function signLamp(x,y,z,art,w,h,localColor="#ffbd79"){
  box(x,y,z,w+.065,h+.075,.11,P.almostBlack);front(x,y,z+.059,w,h,mat("#fff2d9",art,4));
  for(const s of [-1,1])box(x+s*(w/2+.012),y,z+.06,.022,h+.02,.018,P.brass);
  light(x,y-.06,z+.13,localColor,.84,3.65);
}
function lantern(x,y,z,w,h,kind="amber",intensity=1.65,visibleHalo=true){
  const r=w/2,asset=mat("#ffffff","lamp"+kind,4);
  const profile=v=>r*(.61+.39*Math.pow(Math.max(0,Math.sin(v*Math.PI)),.53))*(1-.012*Math.cos(v*TAU*16));
  surface(20,32,(u,v)=>{const a=(u-.5)*TAU,rr=profile(v);return [x+Math.sin(a)*rr,y+(v-.5)*h,z+Math.cos(a)*rr];},asset,(u,v)=>[u,1-v]);
  for(const side of [-1,1]){
    const yy=y+side*(h*.5+.014);
    lathe(x,yy-.026,z,[[0,0],[r*.68,0],[r*.72,.013],[r*.70,.043],[r*.59,.052],[0,.052]],P.almostBlack,18);
  }
  rod([x-w*.20,y+h/2+.038,z],[x,y+h/2+.13,z],.009,P.iron,6);
  rod([x,y+h/2+.13,z],[x+w*.20,y+h/2+.038,z],.009,P.iron,6);
  if(intensity>0)light(x,y-.025,z,kind==="grill"?"#ff995f":kind==="fish"?"#ffe7bd":"#ffc58d",intensity,Math.max(3.4,Math.sqrt(intensity)*4.4),visibleHalo?w*2.3:0);
}
function post(x,z,h,m=P.darkwood,w=.085){
  box(x,h/2,z,w,h,w,m);box(x,.061,z,w+.044,.115,w+.044,P.steelDark);box(x,.14,z,w+.013,.023,w+.013,P.black);
  barrier(x,z,w+.025,w+.025,0,h,false);contact(x,z,w,w,.34,.17);
}
function slatCabinet(x,y,z,w,h,d,body,trim=P.darkwood,slats=10){
  box(x,y+h*.5,z,w-.05,h-.055,d-.055,shade(body,.75));
  for(let i=0;i<slats;i++){const sw=w/slats;box(x-w/2+sw*(i+.5),y+h*.5,z+d/2-.018,sw-.012,h-.062,.04,shade(body,.93+.09*rand()));}
  for(const sy of [.045,h-.055])box(x,y+sy,z+d/2+.008,w,.076,.049,trim);
  for(const side of [-1,1]){
    box(x+side*(w/2-.04),y+h*.5,z+d/2+.011,.065,h,.055,trim);
    box(x+side*(w/2-.021),y+h*.5,z,.042,h,d-.02,body);
    box(x+side*w*.25,y+h*.49,z-d/2+.004,w*.485,h-.1,.035,body);
    box(x+side*.11,y+h*.62,z-d/2-.031,.085,.025,.048,P.iron);
  }
  box(x,y+h+.011,z,w+.07,.045,d+.065,trim);
  barrier(x,z,w,d,y,y+h);contact(x,z,w,d,.66,.54,.3);
}
function woodenCrate(x,y,z,w,h,d,wood=P.lightwood,marked=false){
  const tx=.035;
  box(x,y+.035,z,w-.025,.056,d-.025,shade(wood,.77));
  for(const sx of [-1,1])for(const sz of [-1,1])box(x+sx*(w/2-.045),y+h/2,z+sz*(d/2-.045),.072,h,.072,wood);
  const rows=h>.29?3:2,lh=(h-.018)/rows;
  for(let j=0;j<rows;j++){
    const cy=y+.015+(j+.5)*lh,m=shade(wood,between(.9,1.035));
    for(const sz of [-1,1])box(x,cy,z+sz*(d/2-tx/2),w,lh-.018,tx,m);
    for(const sx of [-1,1])box(x+sx*(w/2-tx/2),cy,z,tx,lh-.018,d-.05,m);
  }
  if(marked)front(x,y+h*.53,z+d/2+.002,w*.45,h*.55,mat("#ece4c9","delivery"));
}
function card(x,y,z,w,art){
  const h=w*.52;
  frame(x,y+h*.48,z,0,-.17,0,()=>{box(0,0,0,w+.01,h+.01,.014,P.lightwood);front(0,0,.009,w,h,mat("#ffffff",art));});
  box(x,y+.009,z+.005,w*.76,.018,.07,P.darkwood);
}
function wallMenu(x,y,z,w,shop){
  plaque(x,y,z,w,w*.83,shop+"Menu",P.darkwood);
  for(const side of [-1,1])rod([x+side*w*.40,y+w*.45,z-.022],[x,y+w*.63,z-.022],.006,P.twine,5);
}
function clothPanel(x,top,z,w,h,m,phase=0,art=false){
  const pattern=(u,v)=>[x+(u-.5)*w+.020*Math.sin(phase+2*v)*v,top-h*(1-v)+.026*Math.sin(u*Math.PI*2+phase)*(1-v),
    z+.027*Math.cos(u*TAU*2.5+phase)*(1-.5*v)+.04*(1-v)*Math.sin(u*3+phase)];
  surface(15,5,pattern,m,art?(u,v)=>[u,1-v]:(u,v)=>[u*w*1.8,(1-v)*h*2]);
  // A sewn weighted hem projects slightly from the cloth, visible from underneath.
  for(let i=0;i<8;i++)rod(pattern(i/8,.025),pattern((i+1)/8,.025),.007,shade(m,.86),5,.007,false);
}
function canopy(w,d,back,frontH,kind,a,b=null){
  const x0=-w/2,z0=-d/2+.16;
  const point=(u,v)=>{
    const x=x0+u*w,z=z0+v*d;
    let y=back*(1-v)+frontH*v;
    if(kind==="ridge")y+=.50*(1-Math.abs(2*v-1));
    if(kind==="barrel")y+=.49*Math.sin(u*Math.PI);
    y-=.075*Math.sin(Math.PI*v)*Math.sin(Math.PI*u)**2;
    y+=.025*Math.sin(u*TAU*4+.3)*Math.sin(v*Math.PI)+.023*Math.cos(u*TAU*3)*(v**4);
    return [x,y,z];
  };
  const strips=kind==="stripe"?9:5;
  for(let i=0;i<strips;i++){
    const m=kind==="stripe"&&i%2?b:a;
    const panel=(u,v)=>point((i+u)/strips,v);
    surface(4,8,panel,m,(u,v)=>[(i+u)*w/strips*1.7,v*d*1.5],true);
    // Each awning has a separately shaded reverse face for looking up from the counter.
    surface(4,6,(u,v)=>{const p=panel(u,v);p[1]-=.013;return p;},shade(m,.91),(u,v)=>[(i+u)*w/strips*1.7,v*d*1.5]);
    const edge=panel(0,1);
    if(i>0)for(let j=0;j<6;j++){const p=panel(0,j/6),q=panel(0,(j+1)/6);p[1]+=.009;q[1]+=.009;rod(p,q,.007,shade(m,1.08),5,.007,false);}
    if(kind==="stripe"){
      surface(12,2,(u,v)=>{const p=panel(u,1);p[1]-=(1-v)*(.13+.095*Math.sin(u*Math.PI));p[2]+=.014*(1-v);return p;},m,(u,v)=>[u,1-v]);
    }
  }
  for(const i of [0,.5,1]){
    for(let j=0;j<5;j++){const p=point(i,j/5),q=point(i,(j+1)/5);p[1]-=.052;q[1]-=.052;rod(p,q,.024,P.iron,8,.024,false);}
  }
  const p=point(0,1),q=point(1,1);
  if(kind==="barrel"){
    for(let i=0;i<14;i++){const a=point(i/14,1),b=point((i+1)/14,1);rod(a,b,.034,P.steelDark,9);}
  }else rod(p,q,.032,P.darkwood,10);
  contact(0,.16,w,d,.20,.52,.85);
  return point;
}
function pipePath(points,r,m,sides=9){for(let i=1;i<points.length;i++)rod(points[i-1],points[i],r,m,sides,r,false);}
function wheel(x,y,z,r,m){
  const path=[];
  for(let i=0;i<=24;i++){const a=i/24*TAU;path.push([x,y+r*Math.cos(a),z+r*Math.sin(a)]);}
  pipePath(path,.029,m,7);
  for(let i=0;i<10;i++){const a=i/10*TAU;rod([x,y,z],[x,y+r*Math.cos(a),z+r*Math.sin(a)],.011,P.iron,6);}
  rod([x-.064,y,z],[x+.064,y,z],.048,P.iron,12);
}
function bottle(x,y,z,r,h,m,cap=P.brass){
  objectContact(x,y,z,r*1.52,r*1.42,.29);
  lathe(x,y,z,[[0,0],[r*.82,0],[r,.026*h],[r,.64*h],[r*.88,.72*h],[r*.42,.79*h],[r*.42,.94*h],[r*.48,.96*h],[r*.48,h],[0,h]],m,14);
  lathe(x,y+h*.947,z,[[r*.47,0],[r*.5,.008],[r*.5,h*.055],[0,h*.055]],cap,14);
}
function bowl(x,y,z,r,h,m,trim=null){
  objectContact(x,y,z,r*.98,r*.97,.30);
  const p=[[0,0],[r*.40,0],[r*.43,h*.13],[r*.62,h*.26],[r*.87,h*.60],[r,h*.91],[r*.99,h],[r*.92,h],[r*.85,h*.70],[r*.63,h*.39],[r*.34,h*.24],[0,h*.23]];
  lathe(x,y,z,p,m,22,i=>trim&&i===5?trim:i>6?shade(m,.88):m);
}
function basket(x,y,z,r,h,m=P.lightwood){
  objectContact(x,y,z,r*1.16,r*1.14,.37);
  const reed=mat(m.c,"reed");lathe(x,y,z,[[0,0],[r*.72,0],[r*.83,h*.18],[r,h*.85],[r*1.02,h],[r*.93,h],[r*.69,h*.14],[0,h*.14]],reed,22);
  for(const j of [.19,.60,.89])lathe(x,y+h*j,z,[[r*(.77+.25*j),0],[r*(.79+.25*j),.013],[r*(.78+.25*j),.023]],shade(reed,.83),22);
}
function stool(x,z,r=.245,h=.46){
  const pts=[];for(let j=0;j<3;j++){const a=j*TAU/3,dx=Math.cos(a),dz=Math.sin(a);
    boxBeam([x+dx*r*.75,.03,z+dz*r*.75],[x+dx*r*.52,h-.04,z+dz*r*.52],.041,.042,P.darkwood);
    pts.push([x+dx*r*.67,h*.32,z+dz*r*.67]);}
  for(let j=0;j<3;j++)rod(pts[j],pts[(j+1)%3],.015,P.iron,7);
  lathe(x,h-.06,z,[[0,0],[r*.91,0],[r,.015],[r,.045],[r*.94,.06],[0,.06]],P.oak,24);
  barrier(x,z,r*1.65,r*1.65,0,h,false);contact(x,z,r*1.4,r*1.4,.44,.23);
}
function handleArch(x,y,z,r,m,alongX=true){
  let prev;
  for(let i=0;i<=14;i++){const a=i/14*Math.PI,p=[x+(alongX?Math.cos(a)*r:0),y+Math.sin(a)*r*1.12,z+(alongX?0:Math.cos(a)*r)];
    if(prev)rod(prev,p,.012,m,7,.012,false);prev=p;}
}
function vase(x,y,z,r,h,style,m,accent=null){
  objectContact(x,y,z,r*1.17,r*1.12,.38);
  const shapes={
    jar:[[.56,0],[.57,.06],[.83,.14],[1,.40],[.98,.60],[.82,.77],[.55,.84],[.50,.94],[.58,.96],[.58,1],[.44,1],[.43,.87],[0,.75]],
    flask:[[.58,0],[.66,.04],[.93,.19],[1,.42],[.90,.62],[.55,.72],[.32,.78],[.32,.94],[.42,.96],[.41,1],[.28,1],[.27,.80],[0,.73]],
    cup:[[.63,0],[.65,.09],[.81,.12],[.86,.29],[1,.93],[.98,1],[.87,1],[.74,.31],[.57,.20],[0,.20]],
    urn:[[.45,0],[.50,.05],[.75,.16],[.99,.38],[1,.55],[.88,.72],[.73,.87],[.79,.95],[.84,.98],[.82,1],[.68,1],[.64,.86],[0,.69]]
  };
  const profile=[[0,0],...shapes[style]].map(([u,v])=>[r*u,h*v]);
  lathe(x,y,z,profile,m,22,i=>i===1?P.terracotta:accent&&(i===3||i===profile.length-5)?accent:m);
  if(accent&&r>.085){
    for(const yy of [.37,.415]){
      const segment=shapes[style].findIndex((p,i,arr)=>i>0&&p[1]>=yy&&arr[i-1][1]<=yy),a=shapes[style][segment-1],b=shapes[style][segment];
      if(a&&b){const rr=r*(a[0]+(b[0]-a[0])*(yy-a[1])/(b[1]-a[1]));lathe(x,y+h*yy,z,[[rr+.001,0],[rr+.002,.006]],accent,22);}
    }
  }
}
function paintedDisc(x,y,z,r,art,mul="#ffffff",kind=0,n=40){
  const m=mat(mul,art,kind),normal=[0,0,1],center=vertex([x,y,z],normal,.5,.5,m);
  for(let i=0;i<=n;i++){const a=i/n*TAU,c=Math.cos(a),s=Math.sin(a);vertex([x+c*r,y+s*r,z],normal,.5+c*.5,.5-s*.5,m);if(i>0)tri(center,nv-2,nv-1);}
}
function dial(x,y,z,r){
  rod([x,y,z-.035],[x,y,z],r*1.08,P.steelDark,28);
  paintedDisc(x,y,z+.002,r,"scaleFace");
}
function dishTray(x,y,z,w,d,h,m){
  box(x,y+.009,z,w,.018,d,m);
  for(const s of [-1,1]){
    box(x,y+h*.52,z+s*(d/2-.009),w,h,.018,m);
    box(x+s*(w/2-.009),y+h*.52,z,.018,h,d-.025,m);
  }
}
function skewer(x,y,z,angle,mode){
  place(x,y,z,angle,()=>{
    rod([0,.002,-.194],[0,.008,.255],.006,P.lightwood,6);
    for(let j=0;j<4;j++){
      const zz=-.135+j*.067;
      if(mode==="green"&&j%2===1){
        rod([-.038,.028,zz-.004],[.039,.036,zz+.004],.025,mat("#c5c88b","paper"),9);
        rod([-.01,.032,zz],[.014,.034,zz+.001],.026,mat("#81894d","fabric"),9);
      }else{
        const meat=mat(pick(["#b76f3b","#ac6434","#cc884b","#ae6336"]),"stone",3);
        ell(0,.031,zz,.042,.031,.04,meat,8,4);
        for(let k=0;k<2;k++)rod([-.023,.053,zz-.012+k*.026],[.023,.0535,zz-.005+k*.026],.004,mat("#69472e","stone"),5);
      }
    }
  });
}
function grillStall(){
  const red=mat("#9b4739","fabric"),walnut=mat("#835b42","wood"),hood=mat("#727f7b","metal",2);
  slatCabinet(0,.29,-.05,3.18,.60,1.00,walnut);
  for(const x of [-1.28,1.28]){
    place(x,.245,.485,Math.PI/2,()=>wheel(0,0,0,.22,P.black));
    box(x,.16,-.39,.09,.32,.09,P.darkwood);
  }
  box(0,.935,-.045,3.34,.078,1.08,P.oak);
  for(const sx of [-1,1]){post(sx*1.83,1.43,2.61,P.darkwood);post(sx*1.83,-1.10,2.90,P.darkwood);}
  canopy(3.91,2.66,2.91,2.64,"ridge",red);
  for(const sx of [-1,1]){
    boxBeam([sx*1.83,2.18,1.43],[sx*1.83,2.65,.92],.06,.055,P.cedar);
    boxBeam([sx*1.83,2.35,-1.10],[sx*1.48,2.78,-1.10],.065,.05,P.cedar);
  }
  rod([-1.86,2.55,1.39],[1.86,2.55,1.39],.034,P.darkwood,10);
  for(let j=0;j<5;j++){
    const x=-1.36+j*.67;
    clothPanel(x,2.53,1.394,.64,j===2?.36:.45,mat("#ffffff","grillCloth"),j*.86,true);
    for(const sx of [-1,1])box(x+sx*.21,2.55,1.394,.045,.098,.058,red);
  }
  // Suspended sign is offset to the back, leaving the entire customer edge open.
  plaque(.36,2.31,-.86,1.85,.54,"grillSign",P.darkwood,.075);
  for(const sx of [-.39,1.08])rod([sx,2.59,-.88],[sx,2.84,-.88],.012,P.iron,6);
  lantern(-1.53,1.99,.66,.36,.55,"grill",2.25);
  rod([-1.53,2.39,.66],[-1.53,2.75,.66],.009,P.cable,6);
  lantern(1.51,2.32,1.24,.29,.40,"amber",1.45);
  rod([1.51,2.65,1.24],[1.51,2.70,1.24],.009,P.cable,6);
  const fireX=-.29;dishTray(fireX,.982,-.03,1.29,.64,.164,P.steelDark);
  box(fireX,1.012,-.03,1.20,.055,.57,mat("#4c3a32","stone"));
  reflected(false,()=>{
    for(let j=0;j<28;j++){const xx=fireX-.54+(j%7)*.177+between(-.026,.026),zz=-.23+Math.floor(j/7)*.139;
      ell(xx,1.064,zz,.072,.041,.056,mat(j%5===0?"#d77742":pick(["#5a4234","#775341","#855a42"]),"stone",j%5===0?4:0),7,4);}
    for(let j=0;j<16;j++)rod([fireX-.60+j*.079,1.148,-.32],[fireX-.60+j*.079,1.148,.26],.008,P.black,6);
    for(let j=0;j<7;j++)skewer(fireX-.49+j*.154,1.16,-.035+(j%2)*.045,between(-.08,.095),j%3?"green":"meat");
    for(let j=0;j<3;j++){rod([fireX+.21+j*.11,1.02,.294],[fireX+.21+j*.11,1.02,.312],.022,P.black,9);}
  });
  light(fireX,1.23,.01,"#ff9e59",.38,1.45,0,false);
  // Folded steel splashback, trapezoidal extractor and soot-dark chimney.
  box(fireX,1.25,-.412,1.40,.53,.043,hood);
  const ax=fireX;
  quad([ax-.70,1.83,-.11],[ax+.70,1.83,-.11],[ax+.40,2.06,-.35],[ax-.40,2.06,-.35],hood);
  quad([ax-.70,1.83,-.66],[ax-.70,1.83,-.11],[ax-.40,2.06,-.35],[ax-.40,2.06,-.59],hood);
  quad([ax+.70,1.83,-.11],[ax+.70,1.83,-.66],[ax+.40,2.06,-.59],[ax+.40,2.06,-.35],hood);
  box(ax,1.815,-.385,1.43,.07,.61,P.steel);box(ax,2.062,-.465,.81,.047,.26,P.steelDark);
  rod([ax,2.08,-.46],[ax,3.44,-.46],.11,P.zinc,16);lathe(ax,3.40,-.46,[[.123,0],[.118,.035],[.155,.07],[.15,.095],[0,.102]],P.steelDark,15);
  for(let h=2.25;h<3.35;h+=.36)lathe(ax,h,-.46,[[.115,0],[.116,.02]],P.black,16);
  reflected(false,()=>{
    box(1.00,.992,.01,.77,.039,.52,P.lightwood);
    dishTray(.99,1.018,-.035,.58,.30,.035,P.black);
    for(let i=0;i<3;i++)skewer(.79+i*.155,1.039,-.055,between(-.09,.09),"meat");
    bottle(1.41,.978,-.34,.061,.29,mat("#834c34","paper",3),P.black);
    bottle(1.23,.978,-.35,.047,.24,mat("#c49c55","paper",3),P.black);
    bowl(-1.22,.976,-.09,.145,.105,P.ivory,P.cobalt);bowl(-1.32,.976,.18,.085,.063,P.cobalt);
    const pot=mat("#adaba0","metal",2);
    lathe(-1.33,.98,-.35,[[0,0],[.076,0],[.082,.15],[.072,.15],[.070,.04],[0,.04]],pot,14);
    for(let i=0;i<10;i++){const a=between(0,TAU),r=between(.01,.055);rod([-1.33+Math.cos(a)*r,1.035,-.35+Math.sin(a)*r],[-1.33+Math.cos(a)*r*1.65,1.28+between(-.02,.045),-.35+Math.sin(a)*r*1.65],.004,P.lightwood,5);}
    card(.74,.979,.425,.27,"skewerTag");
  });
  wallMenu(-1.29,1.69,-.65,.47,"grill");
  woodenCrate(-.72,.016,-.92,.86,.33,.47,walnut);barrier(-.72,-.92,.86,.47,0,.35,false);contact(-.72,-.92,.86,.47,.56,.28);
  for(let i=0;i<9;i++){const x=-1.02+(i%5)*.14,y=.20+Math.floor(i/5)*.10;rod([x,y,-1.08],[x+.026,y+.032,-.73],.065,P.oak,6);}
  (S.steam||(S.steam=[])).push({p:wp(-.38,1.24,-.04),w:.22,h:.69,seed:2.7});
}
function fruitLeaf(x,y,z,a,len,m){
  const dx=Math.cos(a)*len,dz=Math.sin(a)*len,rx=-Math.sin(a)*len*.2,rz=Math.cos(a)*len*.2;
  const p=[x,y,z],q=[x+dx*.48+rx,y+.021,z+dz*.48+rz],r=[x+dx,y+.033,z+dz],s=[x+dx*.46-rx,y+.022,z+dz*.46-rz];
  quad(p,q,r,s,m,null,[0,1,0]);
}
function produce(x,y,z,r,type){
  const leaf=mat("#5c783f","paper");
  if(type==="pear"){
    const skin=mat(pick(["#c2ba77","#b6b06c","#b4b675","#c9bd82"]),"stone",3);
    lathe(x,y-r*.76,z,[[0,0],[r*.76,.012],[r,.056],[r*.89,r*1.12],[r*.58,r*1.55],[r*.38,r*1.89],[r*.22,r*2.05],[0,r*2.10]],skin,10);
    rod([x,y+r*1.29,z],[x+.012,y+r*1.61,z],.005,P.darkwood,5);
  }else{
    const skin=mat(pick(type==="mandarin"?["#f4a23e","#ed952c","#d88a2d","#e99138","#efaa4d"]:["#ab4940","#c1614c","#9f4439","#b85a42"]),"stone",3);
    ell(x,y,z,r,r*(type==="mandarin"?.80:.97),r*between(.95,1.04),skin,10,6);
    ell(x,y+r*(type==="mandarin"?.78:.89),z,.012,.007,.013,mat("#696640","paper"),7,3);
    if(type==="apple")rod([x,y+r*.9,z],[x+.009,y+r*1.23,z],.0045,P.darkwood,5);
    if(rand()<.29)fruitLeaf(x,y+r*.86,z,between(0,TAU),r*1.08,leaf);
  }
}
function produceBox(x,y,z,w,d,type){
  woodenCrate(x,y,z,w,.187,d,P.lightwood,type==="mandarin");
  box(x,y+.097,z,w-.072,.071,d-.067,mat("#bda77b","reed"));
  const nx=type==="mandarin"?6:4,nz=type==="mandarin"?3:2;
  const r=Math.min((w-.10)/nx,(d-.08)/nz)*.49;
  for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){
    const xx=x-w/2+.055+(i+.51)*(w-.11)/nx+between(-.012,.012),zz=z-d/2+.045+(j+.51)*(d-.09)/nz+between(-.014,.014);
    produce(xx,y+.14+r*.5,zz,r*between(.93,1.05),type);
  }
  if(type==="mandarin")for(let i=0;i<4;i++)produce(x-.26+i*.158,y+.235+r*.40,z-.01+between(-.045,.045),r*.97,type);
}
function fruitStall(){
  const sage=mat("#788667","wood"),canvas=mat("#caa458","fabric"),cream=mat("#ead6a3","fabric");
  for(const sx of [-1,1]){
    for(const sz of [-1,1])boxBeam([sx*1.50,.035,sz*.46],[sx*1.36,.84,sz*.36],.093,.103,sage);
    box(sx*1.43,.40,-.03,.11,.08,.83,sage);
    boxBeam([sx*1.41,.44,-.40],[sx*1.42,.81,.40],.067,.061,P.lightwood);
  }
  box(0,.54,-.33,2.82,.11,.07,shade(sage,.88));
  for(let j=0;j<7;j++)box(0,.866,-.53+j*.164,3.51,.077,.156,shade(P.oak,.96+.08*rand()));
  for(const sz of [-1,1])box(0,.77,sz*.50,3.41,.14,.063,sage);
  barrier(0,-.025,3.44,1.12,.035,.90);contact(0,-.025,3.44,1.12,.47,.53);
  for(const sx of [-1,1]){post(sx*1.89,1.34,2.53,P.lightwood,.077);post(sx*1.89,-1.08,3.08,P.lightwood,.082);
    boxBeam([sx*1.89,2.1,1.34],[sx*1.89,2.64,.72],.052,.068,P.oak);}
  canopy(4.04,2.64,3.14,2.55,"stripe",canvas,cream);
  const signWood=mat("#52664a","wood");
  box(-.02,2.78,-.94,3.76,.12,.098,P.oak);
  plaque(.14,2.49,-.90,1.73,.50,"fruitSign",signWood,.08);
  for(const xx of [-.52,.8])rod([xx,2.73,-.95],[xx,2.83,-.95],.01,P.iron,6);
  lantern(-1.55,2.20,.91,.32,.41,"amber",1.85);rod([-1.55,2.53,.91],[-1.55,2.67,.91],.008,P.cable,6);
  // A library of produce is kept small enough to read as a tended display.
  reflected(false,()=>{
    frame(-.38,.91,.08,.025,-.065,0,()=>produceBox(0,0,0,1.17,.53,"mandarin"));
    frame(.68,.92,-.14,-.045,-.12,0,()=>produceBox(0,0,0,.75,.56,"apple"));
    basket(1.41,.915,-.04,.248,.19,P.oak);
    for(let j=0;j<6;j++){const a=j*TAU/6;produce(1.41+.139*Math.cos(a),1.127,-.04+.135*Math.sin(a),.062,"pear");}
    produce(1.43,1.173,-.05,.068,"pear");
    card(-.36,.914,.465,.255,"mandarinTag");card(.72,.912,.41,.215,"appleTag");card(1.42,.91,.36,.218,"pearTag");
    // Enamel market scale on a cast base, with a dish and a printed dial.
    const xx=-1.33;
    box(xx,.948,-.08,.43,.073,.35,mat("#71877a","metal",3));
    frame(xx,1.103,-.10,0,-.10,0,()=>{box(0,0,0,.30,.265,.24,mat("#81968a","metal",3));dial(0,.007,.138,.105);});
    rod([xx,1.219,-.105],[xx,1.29,-.105],.035,P.steelDark,9);
    bowl(xx,1.277,-.105,.215,.055,P.steel,P.steelDark);
    box(-1.42,.919,.28,.235,.022,.155,P.cream);rod([-1.50,.935,.255],[-1.31,.935,.296],.006,mat("#9a6144","wood"),6);
  });
  woodenCrate(-.98,.02,-.12,.80,.30,.63,P.lightwood,true);
  woodenCrate(-.98,.324,-.12,.80,.28,.63,P.lightwood);
  woodenCrate(.03,.024,-.2,.82,.36,.58,shade(P.lightwood,.83),true);
  // A small three-quarter stack occupies the back corner, clear of the overhang.
  place(1.38,0,-.99,-.12,()=>{
    woodenCrate(0,.018,0,.65,.33,.53,P.lightwood,true);woodenCrate(0,.351,0,.65,.26,.53,P.oak);
    barrier(0,0,.65,.53,0,.63,false);contact(0,0,.66,.54,.55,.28);
  });
  basket(-1.44,.022,-.85,.24,.34,P.oak);barrier(-1.44,-.85,.44,.44,0,.36,false);
  reflected(false,()=>{for(let i=0;i<7;i++){
    const x=-1.44+between(-.13,.13),z=-.85+between(-.10,.10),a=between(0,TAU),dx=Math.cos(a)*.13,dz=Math.sin(a)*.13;
    rod([x,.18,z],[x+dx*.50,.49,z+dz*.50],.024,P.cream,7,.018);
    for(let j=0;j<3;j++){const ex=x+dx+between(-.06,.06),ez=z+dz+between(-.06,.06);rod([x+dx*.5,.45,z+dz*.5],[ex,between(.67,.86),ez],.015,mat(pick(["#68815b","#536e4c","#798d62"]),"fabric"),6,.007);}
  }});
  // A second practical hidden under the roof warms the sheltered counter.
  rod([.82,2.79,-.47],[1.32,2.79,-.47],.023,P.opal,8);light(1.04,2.73,-.44,"#ffdf9a",1.75,4.1);
}
function fishModel(x,y,z,len,angle,blue=true){
  place(x,y,z,angle,()=>{
    const outline=[[-.37,.09],[-.30,.22],[-.19,.62],[-.04,.90],[.12,1],[.26,.88],[.38,.61],[.48,.24],[.50,.04]];
    const width=len*(blue?.135:.15),depth=len*.065;
    const bodyPoint=(a,t)=>[a[0]*len,Math.sin(t)*depth*a[1],Math.cos(t)*width*a[1]];
    const sections=12,first=nv;
    for(const a of outline){
      for(let j=0;j<=sections;j++){
        const t=j/sections*TAU,belly=.5+.5*Math.cos(t),shine=.5+.5*Math.sin(t);
        const c=blue?[.27+.54*belly+.06*shine,.42+.39*belly+.06*shine,.46+.35*belly+.06*shine]:[.43+.41*belly,.48+.37*belly,.46+.32*belly];
        vertex(bodyPoint(a,t),unit([a[0]*.45,Math.sin(t)*1.4,Math.cos(t)]),a[0]+.5,j/sections,mat(c,"metal",3));
      }
    }
    for(let a=0;a<outline.length-1;a++)for(let j=0;j<sections;j++){const k=first+a*(sections+1)+j,b=k+sections+1;tri(k,b,b+1);tri(k,b+1,k+1);}
    const fin=mat(blue?"#61777c":"#8b8876","paper",3),dark=mat("#4d6471","paper",3);
    const mark=(ax,ay,az)=>[ax*len,ay*len,az*len];
    const tailroot=mark(-.34,0,0),t1=mark(-.51,.008,-.125),t2=mark(-.46,.004,0),t3=mark(-.52,.009,.13);
    flatTriangle(tailroot,t1,t2,fin);flatTriangle(tailroot,t2,t3,fin);
    flatTriangle(mark(-.08,.007,-.101),mark(-.135,.01,-.196),mark(.095,.009,-.128),fin);
    flatTriangle(mark(-.10,.009,.099),mark(-.17,.009,.151),mark(.01,.014,.121),fin);
    flatTriangle(mark(.29,.042,.040),mark(.11,.042,.093),mark(.18,.052,.020),fin);
    // The eye, gill line and dark transverse markings sit on the upper visible flank.
    ell(.355*len,.033*len,.026*len,.021*len,.010*len,.019*len,P.ivory,9,4);
    ell(.358*len,.042*len,.025*len,.012*len,.005*len,.013*len,P.black,8,4);
    ell(.361*len,.047*len,.021*len,.0045*len,.003*len,.0045*len,P.white,6,3);
    pipePath([mark(.26,.042,-.056),mark(.23,.055,-.024),mark(.22,.058,.014),mark(.247,.043,.072)],.0034,dark,5);
    if(blue)for(let i=0;i<7;i++){const xx=-.20+i*.056,taper=.64+.31*Math.sin((i+1)/9*Math.PI);
      pipePath([mark(xx,.034*taper,-.102*taper),mark(xx+.016,.051*taper,-.062*taper),mark(xx+.005,.062*taper,-.027*taper)],.0027,dark,4);}
    for(let i=0;i<3;i++){const t=(i+1)/4;rod(tailroot,mark(-.47-.03*t,.006,.13*t),.0019,shade(fin,1.13),4);}
  });
}
function iceChip(x,y,z,r){
  const m=mat(pick(["#d0e1df","#c7d9d9","#dde6db","#b3cbcd"]),"stone",3);
  const a=between(0,TAU),pts=[];
  for(let i=0;i<5;i++){const t=a+i*TAU/5,rr=between(.7,1.1)*r;pts.push([x+Math.cos(t)*rr,y,z+Math.sin(t)*rr*.80]);}
  const peak=[x+.11*r,y+.42*r,z-.10*r];
  for(let i=0;i<5;i++)flatTriangle(pts[(i+1)%5],pts[i],peak,shade(m,between(.94,1.03)));
}
function fishStall(){
  const blue=mat("#477780","fabric"),teal=mat("#577b79","wood"),tile=mat("#c8d4c6","stone",3);
  slatCabinet(0,.055,-.06,3.36,.764,.99,teal,shade(teal,.80),14);
  box(0,.867,-.035,3.48,.098,1.12,P.steelDark);box(0,.926,-.035,3.51,.037,1.125,P.steel);
  reflected(false,()=>{
    for(let i=0;i<16;i++)box(-1.626+i*.217,.75,.45,.209,.114,.044,shade(tile,between(.91,1.025)));
    for(const sx of [-1,1])for(let j=0;j<4;j++)box(sx*1.68,.75,-.40+j*.238,.040,.114,.229,tile);
  });
  for(const sx of [-1,1]){
    post(sx*1.86,-1.03,2.72,P.zinc,.066);post(sx*1.86,1.42,2.48,P.zinc,.065);
    boxBeam([sx*1.86,2.19,1.42],[sx*1.86,2.52,1.04],.036,.046,P.steelDark);
  }
  canopy(4.06,2.65,2.77,2.51,"barrel",blue);
  rod([-1.93,2.49,1.48],[1.93,2.49,1.48],.029,P.iron,9);
  // Painted enamel header and a pair of short, split indigo curtains.
  plaque(.02,2.62,1.507,1.60,.42,"fishSign",P.steelDark,.055);
  for(const x of [-1.50,1.48])clothPanel(x,2.45,1.44,.66,.38,mat("#fff4d9","fishCloth"),x,true);
  for(let j=0;j<4;j++)clothPanel(-1.22+j*.82,2.50,-.87,.82,1.26,mat(pick(["#537980","#486d76"]),"fabric"),j);
  rod([-1.82,2.55,-.9],[1.82,2.55,-.9],.035,P.iron);
  lantern(1.43,2.12,.62,.35,.48,"fish",1.85);
  rod([1.43,2.49,.62],[1.43,2.83,.62],.008,P.cable,6);
  // A modest cyan worklight is confined to the ice and stainless counter.
  rod([-.68,2.27,-.53],[.68,2.27,-.53],.027,mat("#b9e4de","plain",4),10);
  box(0,2.32,-.53,1.45,.063,.115,P.zinc);light(0,2.20,-.45,"#9cd9dc",1.80,4.3);
  reflected(false,()=>{
    for(let b=0;b<2;b++){
      const cx=-.59+b*1.04;
      dishTray(cx,.950,-.055,1.005,.72,.095,P.steel);
      box(cx,.998,-.055,.95,.034,.656,mat("#a6bdba","stone",3));
      for(let i=0;i<62;i++){
        const xx=cx+between(-.451,.451),zz=-.055+between(-.298,.298);iceChip(xx,1.015,zz,between(.020,.055));
      }
      for(let j=0;j<3;j++)fishModel(cx-.264+j*.255,1.057,-.053+between(-.034,.034),b===0?.425:.462,-1.01+between(-.17,.14),b===0);
      card(cx,.949,.437,.239,b===0?"mackerelTag":"ajiTag");
    }
    const zz=-.15,xx=1.32;
    rod([xx,2.70,zz],[xx,2.20,zz],.011,P.iron,7);dial(xx,2.06,zz,.128);
    for(const [dx,dz] of [[-.173,.07],[.171,.07],[0,-.17]])rod([xx,1.94,zz],[xx+dx,1.67,zz+dz],.004,P.steelDark,5);
    bowl(xx,1.606,zz,.204,.062,P.steel,P.steelDark);
    box(1.30,.972,.055,.53,.052,.62,P.lightwood);
    frame(1.28,1.002,.083,.38,0,0,()=>{
      box(-.057,0,0,.207,.013,.073,P.steel);box(.116,.007,0,.13,.024,.028,P.darkwood);
    });
    bowl(-1.43,.95,-.18,.157,.073,P.ivory,P.cobalt);
    pipePath([[-1.47,.96,-.40],[-1.47,1.24,-.40],[-1.47,1.29,-.35],[-1.47,1.29,-.25],[-1.47,1.24,-.22]],.016,P.steel);
  });
  // Rear sill, cooler and a coiled wash hose can be inspected from the service side.
  box(0,1.026,-.54,3.40,.14,.053,teal);
  place(.81,0,-.98,.055,()=>{
    const cool=mat("#b7c7bc","paper");
    box(0,.206,0,1.05,.36,.58,cool);box(0,.402,0,1.08,.065,.61,shade(cool,1.09));
    for(const xx of [-.34,.34])box(xx,.348,.299,.062,.089,.021,P.steelDark);
    barrier(0,0,1.08,.61,0,.44,false);contact(0,0,1.05,.58,.5,.34);
  });
  place(-1.29,0,-1.02,-.1,()=>{
    lathe(0,.014,0,[[0,0],[.145,0],[.18,.285],[.186,.3],[.17,.30],[.137,.045],[0,.045]],P.zinc,18);
    handleArch(0,.28,0,.177,P.iron);barrier(0,0,.32,.32,0,.45,false);
    for(let i=0;i<3;i++)ring(.55,.028+i*.027,-.04,.22+i*.013,.015,mat("#56665d","fabric"),16);
  });
}
function showPlate(x,y,z,r,angle){
  frame(x,y,z,angle,.29,0,()=>{
    rod([0,0,-.026],[0,0,0],r,P.ivory,32);paintedDisc(0,0,.002,r*.99,"reedPlate","#ffffff",3);
    for(const xx of [-r*.46,r*.46]){
      rod([xx,-r*.53,-.07],[xx,-r*.77,.032],.018,P.darkwood,7);
      rod([xx,-r*.77,.032],[xx,-r*.61,.042],.011,P.darkwood,7);
    }
  });
}
function squareLamp(x,y,z,w,h){
  const wood=shade(P.darkwood,.78);
  box(x,y,z,w,h,w,P.opal);
  for(const sx of [-1,1])for(const sz of [-1,1])box(x+sx*w*.5,y,z+sz*w*.5,.026,h+.048,.026,wood);
  for(const fy of [-.50,-.29,.29,.5]){
    for(const s of [-1,1]){
      box(x,y+fy*h,z+s*w*.51,w+.018,.02,.018,wood);
      box(x+s*w*.51,y+fy*h,z,.018,.02,w+.018,wood);
    }
  }
  box(x,y+h*.5+.025,z,w+.07,.055,w+.07,wood);box(x,y-h*.5-.018,z,w+.045,.04,w+.045,wood);
  light(x,y,z,"#ffcc91",1.98,5.3,w*1.9);
}
function potStall(){
  const umber=mat("#796047","wood"),indigo=mat("#535e71","metal",2),plum=mat("#715767","fabric");
  slatCabinet(0,.023,-.03,3.40,.79,1.03,umber,P.darkwood,11);
  box(0,.872,-.02,3.56,.101,1.15,P.oak);
  for(const sx of [-1,1]){post(sx*1.84,-1.01,2.75,P.darkwood,.094);post(sx*1.84,1.37,2.51,P.darkwood,.094);
    boxBeam([sx*1.84,2.16,1.37],[sx*1.84,2.53,.94],.068,.078,P.cedar);}
  // Standing seams, a projecting ridge cap and exposed ends give this roof a hard silhouette.
  const roof=(u,v)=>[-2.00+u*4.00,2.52+.61*(1-Math.abs(2*v-1))+.13*(1-v),-1.19+2.73*v];
  for(let i=0;i<2;i++){
    const panel=(u,v)=>roof(u,(i+v)/2);
    surface(10,2,panel,indigo,(u,v)=>[u*4,v*1.4],true);
    surface(10,1,(u,v)=>{const p=panel(u,v);p[1]-=.044;return p;},P.darkwood);
  }
  for(let i=0;i<=14;i++){
    const u=i/14;for(let j=0;j<2;j++){
      const a=roof(u,j*.5),b=roof(u,(j+1)*.5);a[1]+=.013;b[1]+=.013;rod(a,b,.017,shade(indigo,1.18),7,.017,false);
    }
  }
  box(0,3.20,.175,4.10,.096,.14,indigo);box(0,2.49,1.54,4.04,.12,.085,P.darkwood);
  for(const s of [-1,1]){
    const a=roof(s===1?1:0,0),b=roof(s===1?1:0,.5),c=roof(s===1?1:0,1);
    boxBeam(a,b,.088,.073,P.oak);boxBeam(b,c,.088,.073,P.oak);
  }
  for(const x of [-1.42,-.72,0,.72,1.42])boxBeam([x,2.65,-1.19],[x,2.48,1.60],.068,.074,P.oak);
  contact(0,.17,4.0,2.73,.19,.5,.91);
  signLamp(.27,2.31,-.77,"potSign",1.49,.43,"#edb9a2");
  squareLamp(-1.47,2.06,.75,.27,.43);rod([-1.47,2.31,.75],[-1.47,2.81,.75],.01,P.iron,7);
  for(let i=0;i<2;i++)clothPanel(.98+i*.54,2.43,1.53,.51,i===0?.36:.43,mat("#eee2cd","potCloth"),2+i,true);
  const back=mat("#926e50","wood");
  for(const xx of [-1.48,1.48])box(xx,1.30,-.58,.075,1.56,.12,P.darkwood);
  for(const h of [1.25,1.72])box(0,h,-.49,3.09,.061,.385,back);
  for(const xx of [-1.22,-.40,.42,1.22])box(xx,1.60,-.68,.032,.96,.025,shade(back,.85));
  reflected(false,()=>{
    const sea=mat("#72908b","paper",3),honey=mat("#ac855c","paper",3),cream=P.ivory,blue=P.cobalt,earth=mat("#a97662","stone",3);
    // Lower plinths stagger the silhouettes in the front row.
    box(-.79,.955,.045,1.20,.062,.60,mat("#b49874","reed"));
    box(.79,.968,-.036,1.06,.087,.49,P.darkwood);
    vase(-1.07,.991,-.03,.145,.32,"jar",sea,blue);
    vase(-.66,.991,.16,.084,.12,"cup",cream,blue);vase(-.45,.991,.12,.078,.116,"cup",cream,blue);
    showPlate(.68,1.21,-.012,.19,-.13);
    for(let i=0;i<3;i++)bowl(1.16,1.018+i*.031,.10,.152,.069,cream,blue);
    for(let i=0;i<2;i++)bowl(.22,.926,.258+i*.03,.117,.057,sea,blue);
    card(-.65,.925,.452,.242,"cupTag");card(1.06,.925,.456,.227,"wareTag");
    vase(-1.18,1.284,-.46,.097,.31,"flask",cream,blue);vase(-.91,1.284,-.48,.074,.22,"flask",sea);
    vase(.07,1.284,-.49,.135,.27,"urn",earth);vase(.50,1.284,-.45,.092,.17,"jar",honey);
    for(let i=0;i<3;i++)bowl(1.11,1.284+i*.024,-.43,.141,.060,blue,cream);
    vase(-1.16,1.752,-.46,.126,.24,"jar",honey,earth);vase(-.78,1.752,-.50,.069,.20,"flask",cream);
    vase(.67,1.752,-.49,.083,.235,"flask",sea,blue);vase(.97,1.752,-.47,.089,.18,"jar",cream,blue);
    box(-.04,1.769,-.46,.42,.031,.21,P.darkwood);vase(-.03,1.785,-.46,.093,.145,"cup",earth);
  });
  box(-1.48,.22,-1.02,.51,.38,.48,P.darkwood);woodenCrate(1.05,.023,-.93,.82,.32,.55,P.oak);
  barrier(-1.48,-1.02,.51,.48,0,.43,false);barrier(1.05,-.93,.82,.55,0,.37,false);
}
const shopLayout=[
  ["Charcoal grill",-3.94,3.08,1.10,grillStall],["Maruka produce",4.09,3.41,-1.11,fruitStall],
  ["Aoshio fish",-3.92,-3.83,.79,fishStall],["Tsuchine ceramics",4.07,-3.83,-.83,potStall]
];
function buildShops(){for(const [name,x,z,yaw,make] of shopLayout)group(name,()=>place(x,0,z,yaw,make));}
function objectContact(x,y,z,rx,rz,power=.34){
  const p=wp(x,y+.0028,z);if(p[1]<.18)return;
  (S.spots||(S.spots=[])).push({p,u:wn(rx,0,0),v:wn(0,0,rz),power});
}
function awningBindings(){
  for(const [name,x,z,yaw] of shopLayout)group(name+" fittings",()=>place(x,0,z,yaw,()=>{
    const fruit=name==="Maruka produce",fish=name==="Aoshio fish",grill=name==="Charcoal grill";
    const px=fruit?1.89:fish?1.86:grill?1.83:1.84,pz=fruit?1.34:fish?1.42:grill?1.43:1.37,top=fruit?2.52:fish?2.48:grill?2.60:2.50;
    for(const side of [-1,1]){
      const xx=side*px;
      for(let j=0;j<3;j++)lathe(xx,top-.123+j*.022,pz,[[.060,0],[.061,.015]],P.twine,10);
      pipePath([[xx,top-.08,pz+.055],[xx+side*.055,top-.13,pz+.06],[xx+side*.038,top-.18,pz+.067]],.007,P.twine,6);
      box(xx,top-.25,pz+.048,.047,.080,.014,P.iron);
      rod([xx,top-.25,pz+.054],[xx,top-.25,pz+.068],.012,P.brass,6);
    }
    reflected(false,()=>{
      if(grill){
        for(let j=0;j<12;j++)box(-.873+j*.105,1.772,-.38,.034,.019,.404,P.black);
        rod([-.85,1.771,-.135],[.28,1.771,-.135],.017,mat("#e0caa0","paper",4),8);
        light(-.29,1.71,-.14,"#ffc386",.63,1.85,0,false);
        rod([.63,1.62,-.484],[1.52,1.62,-.484],.018,P.steelDark,7);
        for(const xx of [.81,1.18])pipePath([[xx,1.63,-.50],[xx,1.65,-.462],[xx,1.60,-.440],[xx,1.58,-.459]],.006,P.brass,6);
        pipePath([[.78,1.37,-.455],[.81,1.58,-.455],[.839,1.37,-.455]],.009,P.steel,7);
        for(const j of [-1,1])box(.81+j*.033,1.346,-.454,.026,.059,.014,P.steel);
        rod([1.18,1.57,-.46],[1.18,1.39,-.46],.009,P.oak,7);
        frame(1.18,1.328,-.46,0,Math.PI/2,0,()=>{ring(0,0,0,.063,.006,P.steel,14);for(let j=-2;j<=2;j++)rod([j*.017,0,-.047],[j*.017,0,.047],.003,P.steel,4);});
      }else if(fruit){
        rod([-.69,2.08,-.95],[.98,2.08,-.95],.088,P.lightwood,14);
        for(let j=0;j<14;j++){const a=j/14*TAU;rod([-.71,2.08+Math.cos(a)*.09,-.95+Math.sin(a)*.09],[1.00,2.08+Math.cos(a)*.09,-.95+Math.sin(a)*.09],.012,P.oak,6,.012,false);}
        for(const xx of [-.53,.80])rod([xx-.018,2.08,-.95],[xx+.018,2.08,-.95],.105,P.twine,11);
        rod([-.62,1.938,-.94],[-.57,2.76,-.94],.007,P.twine,6);rod([.82,1.96,-.94],[.83,2.76,-.94],.007,P.twine,6);
      }else if(fish){
        for(let j=0;j<3;j++)box(-1.35,.965+j*.017,.30,.30-j*.017,.015,.14,mat(j===1?"#899c93":"#b2bcb0","fabric"));
        for(let i=0;i<2;i++)box(-1.42+i*.12,.999,.30,.016,.008,.139,mat("#6e8583","fabric"));
      }else{
        rod([1.84,2.47,1.35],[2.11,2.47,1.35],.018,P.iron,8);
        place(1.992,0,1.35,Math.PI/2,()=>{
          rod([-.25,2.43,0],[.25,2.43,0],.016,P.oak,8);
          clothPanel(0,2.40,0,.43,.91,mat("#f0ded1","kilnFlag"),3,true);
        });
      }
    });
  }));
}