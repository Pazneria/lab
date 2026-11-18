'use strict';
const ware=[0xc0c6ae,0x658883,0x8b9e9c,0xc1a06c,0x8b735e,0xa77860,0x657883];
function latheScaled(x,y,z,shape,r,h,c,m,n=20,o={}){profile(x,y,z,shape.map(([a,b])=>[a*r,b*h]),c,m,n,o)}
function ringBand(x,y,z,r,h,c,mat=M.pot,s=22){profile(x,y,z,[[r,0],[r,h]],c,mat,s,{cap:false})}
function vessel(x,y,z,r,h,col,style='jar',decor=true){
 const shapes={
 jar:[[.66,0],[.72,.045],[.70,.09],[.91,.2],[1,.39],[.99,.7],[.94,.82],[.70,.91],[.72,.955],[.81,.965],[.81,1],[.69,1],[.66,.95],[.64,.90]],
 pot:[[.62,0],[.69,.035],[.66,.09],[.90,.76],[.96,.80],[1,.83],[1,.97],[.96,1],[.86,.995],[.84,.96],[.82,.85]],
 cup:[[.66,0],[.75,.055],[.73,.11],[.88,.44],[.98,.94],[1,.99],[.93,1],[.9,.95],[.79,.47],[.63,.13]],
 bowl:[[.38,0],[.46,.05],[.47,.12],[.70,.30],[.89,.65],[1,.94],[1,1],[.91,.99],[.86,.68],[.65,.34],[.37,.15]],
 jug:[[.54,0],[.64,.045],[.67,.13],[.94,.29],[1,.53],[.91,.68],[.56,.8],[.49,.94],[.64,.97],[.62,1],[.49,.99],[.42,.92]],
 mortar:[[.65,0],[.74,.06],[.71,.14],[.87,.28],[1,.86],[1,.97],[.96,1],[.82,.99],[.77,.8],[.55,.39],[.30,.22]]
 };
 const s=shapes[style],n=style==='cup'?20:24,colors=s.slice(0,-1).map((_,i)=>i>=s.length-4?tint(col,.78):i===1?tint(col,.84):col);
 latheScaled(x,y,z,s,r,h,col,style==='mortar'?M.stone:M.pot,n,{colors});
 if(decor){
  const cfg=style==='jar'?[.995,.63]:style==='bowl'?[.986,.91]:style==='cup'?[.971,.88]:style==='pot'?[1.012,.90]:[.515,.90];
  const dark=tint(col,.60);ringBand(x,y+h*cfg[1],z,r*cfg[0]+.001,.008,dark,M.pot,n);
  if(style==='jar'||style==='pot'){ringBand(x,y+h*cfg[1]-.019,z,r*cfg[0]+.0008,.005,0xcdba8c,M.pot,n);
   for(let i=0;i<12;i++){const a=TAU*i/12;group(x+r*cfg[0]*Math.sin(a),y+h*cfg[1]-.034,z+r*cfg[0]*Math.cos(a),a,()=>poly([[-.006,0,.001],[0,-.012,.002],[.006,0,.001],[0,.014,.002]],dark,M.pot))}}
 }
 if(style==='cup'||style==='jug'){
  const s=style==='cup'?1:.9;
  pathTube(Array.from({length:17},(_,i)=>{const a=PI*i/16;return [x+r*(.77+Math.sin(a)*.67*s),y+h*(.55+.30*Math.cos(a)),z]}),r*.11,col,M.pot,8)
 }
}
function curvedLabel(x,y,z,r,w,h,cell){
 const arc=w/r,c=cell%4,row=Math.floor(cell/4),n=9;
 for(let i=0;i<n;i++){
  const t=i/n,u=(i+1)/n;
  const at=(v,yy)=>[x+r*Math.sin((v-.5)*arc),yy,z+r*Math.cos((v-.5)*arc)];
  const uv=(v,j)=>[(c+.008+.984*v)/4,1-(row+(j?.008:.992))/8];
  poly([at(t,y),at(u,y),at(u,y+h),at(t,y+h)],0xffffff,M.ink,null,[uv(t,0),uv(u,0),uv(u,1),uv(t,1)])
 }
}
const liquids=[0x56776b,0xa77839,0x657477,0x895c51,0x7a8255,0x776179,0x708d85,0x9b8450];
function bottle(x,y,z,r,h,col,kind=0,label=-1){
 const shapes=[
 [[.78,0],[.94,.035],[1,.10],[1,.61],[.94,.68],[.43,.77],[.33,.81],[.33,.92],[.42,.93],[.42,.98],[.33,1]],
 [[.53,0],[.77,.04],[.98,.17],[1,.34],[.84,.49],[.35,.64],[.28,.70],[.27,.93],[.36,.94],[.36,1]],
 [[.89,0],[1,.04],[1,.73],[.94,.81],[.75,.84],[.74,.93],[.84,.94],[.84,.99],[.74,1]],
 [[.54,0],[.69,.04],[.71,.19],[1,.56],[.94,.64],[.33,.76],[.26,.92],[.36,.94],[.36,1]]
 ];
 const shp=shapes[kind%4],n=kind===3?8:16,glass=[0xb6c9b2,0xb2cdd0,0xc9bc9a,0xb1b8b5][kind%4];
 latheScaled(x,y,z,shp,r,h,glass,M.glass,n,{cap:false});
 const fill=[.57,.43,.66,.51][kind%4],li=[];
 for(let i=0;i<shp.length;i++){if(shp[i][1]<fill)li.push([Math.max(.01,shp[i][0]*.935),shp[i][1]+.022]);else{const a=shp[i-1],b=shp[i],t=(fill-a[1])/(b[1]-a[1]);li.push([.94*(a[0]+(b[0]-a[0])*t),fill]);break}}
 latheScaled(x,y,z,li,r,h,col,M.pot,n);
 const neck=shp.at(-1)[0]*r;profile(x,y+h*.985,z,[[neck*.83,0],[neck*.97,.013],[neck*1.03,h*.093],[neck*.94,h*.102]],0x917250,M.wood,n);
 if(kind===2){ringBand(x,y+h*.928,z,r*.854,.013,0x8f7e5e,M.metal,n)}
 if(label>=0)curvedLabel(x,y+h*(kind===1?.17:.235),z,r*1.008,r*(kind===1?1.7:2.0),h*.245,label)
}
function plate(x,y,z,r,col,paint=true){
 latheScaled(x,y,z,[[.43,0],[.52,.08],[.54,.20],[.87,.51],[.99,.82],[1,.92],[.96,1],[.84,.78],[.64,.39],[.44,.32]],r,r*.21,col,M.pot,28);
 if(paint)hoop(x,y+r*.17,z,r*.88,r*.012,0x557a7c,M.pot,32)
}
function drawer(x,y,z,w,h,col,tag=false){
 box(x,y,z,w,h,.052,col,M.wood,.012);box(x,y,z+.025,w-.04,h-.044,.018,tint(col,1.065),M.wood,.008);
 if(tag){
  box(x,y+.012,z+.042,Math.min(.18,w*.45),.068,.022,0x8c774e,M.metal,.007);
  box(x,y+.014,z+.055,Math.min(.133,w*.35),.036,.006,0xd9caa5,M.paper,.002);
  for(let j=0;j<3;j++)box(x+(j-1)*.026,y+.013,z+.060,.012+.009*(j%2),.003,.002,0x766957,M.plain,0);
  pathTube([[x-.045,y-.037,z+.043],[x-.046,y-.055,z+.092],[x+.046,y-.055,z+.092],[x+.045,y-.037,z+.043]],.009,C.brass,M.metal,6)
 }else{rod([x,y,z+.040],[x,y,z+.074],.014,.016,C.brass,M.metal,8);ball(x,y,z+.083,.025,.024,.022,C.brass,M.metal,10,6)}
}
function woodTable(x,y,z,w,d,h,col=C.oak){
 group(x,y,z,0,()=>{
  const top=.074,leg=.085;
  for(const u of [-1,1])for(const v of [-1,1]){const xx=u*(w/2-.09),zz=v*(d/2-.077);
   beam([xx+u*.031,.02,zz+v*.029],[xx,h-top,zz],leg,leg,tint(col,.85));box(xx,h-.217,zz,.108,.21,.108,col)}
  for(const s of [-1,1]){box(0,h-.15,s*(d/2-.08),w-.15,.15,.055,tint(col,.91));box(s*(w/2-.09),h-.15,0,.063,.15,d-.13,col);
   box(s*(w/2-.092),.23,0,.058,.080,d-.10,col)}
  box(0,.24,0,w-.14,.075,.056,tint(col,.9));
  const boards=Math.max(3,Math.ceil(d/.18));for(let j=0;j<boards;j++)box(0,h-top/2,-d/2+(j+.5)*d/boards,w,top,d/boards-.003,tint(col,between(.93,1.06)),M.wood,.010);
  baseMass(0,h/2,0,w-.07,h,d-.06,.33)
 })
}
function book(x,y,z,w,h,d,col){
 box(x,y+h/2,z,w*.85,h-.015,d-.022,0xc7b99c,M.paper,.003);
 for(const s of [-1,1])box(x+s*(w/2-.004),y+h/2,z,.010,h,d,col,M.linen,.003);
 box(x,y+h/2,z+d/2-.009,w,h,.025,col,M.linen,.009);
 for(const q of [.09,.18,.70,.85,.92])box(x,y+h*q,z+d/2+.005,w*.89,.009,.008,tint(col,1.37),M.linen,.003);
 box(x,y+h*.54,z+d/2+.005,w*.76,h*.16,.005,0x937d53,M.linen,.002);
 for(let j=0;j<2;j++)box(x,y+h*(.516+j*.045),z+d/2+.009,w*.52,.0025,.002,0xe1cda0,M.plain,0)
}
const bookCols=[0x7b5948,0x536e65,0x847345,0x655565,0x965d47,0x526271,0x735244];
function closedBook(x,y,z,w,d,h,c,cell=23){
 box(x,y+h/2,z,w-.015,h-.013,d-.015,0xc9b99a,M.paper,.006);
 for(const yy of [y+.006,y+h-.006])box(x,yy,z,w,.014,d,c,M.linen,.004);
 box(x-w/2+.005,y+h/2,z,.022,h,d,c,M.linen,.007);
 group(x,y+h+.001,z,0,()=>panel(0,0,0,w*.86,d*.82,cell),-PI/2);
 for(const t of [-1,1])box(x-w/2-.001,y+h*.5,z+t*d*.35,.009,h*.89,.016,tint(c,1.32),M.linen,.003)
}
function openBook(x,y,z,scale=1){
 group(x,y,z,0,()=>{
  const w=.226*scale,h=.309*scale;
  for(const s of [-1,1]){const angle=-s*.103;
   group(s*w*.50,.029*scale,0,0,()=>{
    box(0,-.014,0,w+.024*scale,.012,h+.029*scale,0x635246,M.linen,.004);
    box(0,0,0,w,.027,h,0xcfc0a1,M.paper,.004);
    group(0,.0145,0,0,()=>panel(0,0,0,w,h,s===-1?3:4),-PI/2)
   },0,angle)
  }
  box(.065*scale,.035*scale,h*.5, .019,.004,h*.28,0x985a50,M.linen,.001)
 })
}
function scroll(x,y,z,len,angle=0){
 group(x,y,z,angle,()=>{rod([-len/2,0,0],[len/2,0,0],.040,.043,0xc7b48f,M.paper,15);
  for(const s of [-1,1]){rod([s*(len*.5-.001),0,0],[s*(len*.5+.001),0,0],.030,.030,0x9b886b,M.paper,14);rod([s*(len*.5+.002),0,0],[s*(len*.5+.004),0,0],.019,.019,0x6e614c,M.paper,12)}
  rod([-.009,0,0],[.009,0,0],.044,.044,C.red,M.linen,14)})
}
function lamp(x,y,z,scale=1,hang=0){
 const s=scale;
 profile(x,y,z,[[.115*s,0],[.128*s,.022*s],[.102*s,.045*s],[.068*s,.067*s],[.055*s,.115*s],[.08*s,.128*s]],C.brass,M.metal,20);
 latheScaled(x,y+.12*s,z,[[.49,0],[.76,.12],[1,.33],[.89,.53],[.55,.72],[.51,1]],.119*s,.29*s,0xd3c2a2,M.glass,24);
 ball(x,y+.22*s,z,.046*s,.087*s,.045*s,0xffca79,M.light,16,10);
 for(let i=0;i<4;i++){const a=TAU*i/4+.27;pathTube([[x+.079*s*Math.cos(a),y+.075*s,z+.079*s*Math.sin(a)],[x+.134*s*Math.cos(a),y+.17*s,z+.134*s*Math.sin(a)],[x+.129*s*Math.cos(a),y+.35*s,z+.129*s*Math.sin(a)],[x+.072*s*Math.cos(a),y+.42*s,z+.072*s*Math.sin(a)]],.009*s,C.iron,M.metal,6)}
 profile(x,y+.399*s,z,[[.065*s,0],[.09*s,.024*s],[.077*s,.04*s],[.04*s,.067*s],[.027*s,.086*s]],C.brass,M.metal,16);
 pathTube(Array.from({length:16},(_,i)=>{const a=PI*i/15;return [x+Math.cos(a)*.068*s,y+.45*s+Math.sin(a)*.097*s,z]}),.008*s,C.iron,M.metal,6);
 if(hang>0)rod([x,y+.542*s,z],[x,y+.542*s+hang,z],.009,.009,C.iron,M.metal,8)
}
function wallArt(x,y,z,w,h,cell,col=C.dark){
 box(x,y,z,w+.075,h+.075,.044,col,M.wood,.01);box(x,y,z+.025,w+.023,h+.024,.015,C.brass,M.metal,.003);panel(x,y,z+.034,w,h,cell)
}
function basket(x,y,z,r,h,col=0xb29569){
 latheScaled(x,y,z,[[.65,0],[.76,.06],[.95,.56],[1,.96],[.97,1],[.87,.96],[.82,.76]],r,h,col,M.linen,18);
 for(let i=0;i<7;i++){const t=(i+1)/8;hoop(x,y+h*t,z,r*(.75+.235*Math.min(1,t*1.55)),.009,tint(col,i%2?1:.85),M.wood,20)}
 for(let i=0;i<14;i++){let a=TAU*i/14;rod([x+r*.74*Math.cos(a),y+.025,z+r*.74*Math.sin(a)],[x+r*.977*Math.cos(a),y+h*.97,z+r*.977*Math.sin(a)],.009,.008,tint(col,.82),M.wood,6)}
}
