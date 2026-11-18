'use strict';
function crate(x,y,z,w=.78,h=.52,d=.56,yaw=0,mark=''){
 const ax=[Math.cos(yaw),0,Math.sin(yaw)],az=[-Math.sin(yaw),0,Math.cos(yaw)],P=(u,v,s)=>vadd([x,y+v,z],vadd(vmul(ax,u),vmul(az,s)));
 const col=pick(['#9c8764','#a48d67','#ab9570','#a99572']);
 for(const u of [-1,1])for(const s of [-1,1]){
  beam(P(u*(w*.5-.050),.015,s*(d*.5-.048)),P(u*(w*.5-.050),h-.015,s*(d*.5-.048)),.068,.071,tint(col,.80),WOOD,.004)
 }
 for(let i=0;i<4;i++){
  const v=h*(i+.5)/4;
  for(const s of [-1,1])beam(P(-w*.5,v,s*(d*.5-.019)),P(w*.5,v,s*(d*.5-.019)),.041,h/4-.008,tint(col,range(.89,1.08)),WOOD,.004);
  for(const u of [-1,1])beam(P(u*(w*.5-.016),v,-d*.5+.038),P(u*(w*.5-.016),v,d*.5-.038),.035,h/4-.008,tint(col,range(.89,1.07)),WOOD,.004)
 }
 for(const u of [-1,1])for(const s of [-1,1]){
  const xx=u*(w*.5-.083),zz=s*(d*.5+.009);
  beam(P(xx,.008,zz),P(xx,h-.007,zz),.073,.026,tint(col,.91),WOOD,.003,0,az);
  for(const v of [.055,h-.062]){
   const p=P(xx,v,s*(d*.5+.027));cyl(vadd(p,vmul(az,-s*.004)),vadd(p,vmul(az,s*.004)),.009,'#55584d',IRON,5)
  }
 }
 for(let k=0;k<4;k++){
  const s=mix(-d*.5,d*.5,(k+.5)/4);beam(P(-w*.5+.018,h-.002,s),P(w*.5-.018,h-.002,s),d/4-.006,.032,tint(col,range(.91,1.06)),WOOD,.003)
 }
 if(mark)sign(mark,P(0,h*.54,d*.5+.025),ax,Y,w*.66,h*.19,{ink:'#515d4e',bold:true,stencil:true});
 obb(x,z,w,d,yaw,y,y+h)
}
function barrel(x,y,z,r=.28,h=.87){
 const sides=19,levels=[0,.09,.25,.5,.75,.91,1],R=t=>r*(.86+.14*Math.sin(t*PI));
 for(let j=0;j<sides;j++){
  const a=TAU*(j+.013)/sides,b=TAU*(j+.985)/sides,col=pick(['#8d8065','#8b7f66','#978a70','#a19275','#80765e']);
  for(let k=0;k<levels.length-1;k++){
   const lo=levels[k],hi=levels[k+1],p=(t,s)=>[x+R(t)*Math.cos(s),y+h*t,z+R(t)*Math.sin(s)];
   quad(p(lo,a),p(hi,a),p(hi,b),p(lo,b),col,WOOD,[[lo*h,0],[hi*h,0],[hi*h,r*(b-a)],[lo*h,r*(b-a)]])
  }
 }
 for(const t of [.075,.28,.73,.925]){const rr=R(t)+.009;cyl([x,y+t*h-.021,z],[x,y+t*h+.021,z],rr,'#626d65',IRON,19)}
 for(let k=-3;k<=3;k++){const w=r*.253,s=k*w,half=Math.sqrt(Math.max(0,(r*.855)**2-(Math.abs(s)+w*.18)**2));beam([x-half,y+h-.009,z+s],[x+half,y+h-.009,z+s],w-.004,.028,'#918467',WOOD,.003)}
 ringTube([x,y+h+.009,z],X,Z,r*.86,r*.86,.009,'#666e61',IRON);
 obb(x,z,r*1.75,r*1.75,0,y,y+h)
}
function can(x,y,z,r,h,body,label='',lid=true){
 cyl([x,y+.008,z],[x,y+h-.006,z],r,body,PAINT,18);
 for(const v of [.013,h-.012])cyl([x,y+v-.009,z],[x,y+v+.009,z],r+.005,'#9b9e90',IRON,18);
 if(lid){cyl([x,y+h-.002,z],[x,y+h+.008,z],r*.96,'#9da299',IRON,18);ringTube([x,y+h+.009,z],X,Z,r*.82,r*.82,.003,'#777e73',IRON,0,TAU,24)}
 else{cyl([x,y+h-.024,z],[x,y+h-.019,z],r*.94,tint(body,.65),PAINT,16)}
 if(h>.16){
  const pts=[];for(let k=0;k<=16;k++){const a=PI*k/16;pts.push([x+r*.99*Math.cos(a),y+h*.70+.61*r*Math.sin(a),z+r*.51*Math.sin(a)])}tube(pts,.0048,'#737a6d',IRON,6)
 }
 if(label)sign(label,[x,y+h*.51,z+r+.003],X,Y,r*1.53,h*.21,{ink:'#e5dabe',bold:true})
}
function sawBench(){
 const y=DECK,tx=.42,tz=-3.48,len=4.12,depth=.86,top=y+.93;
 for(const x of [.10,.73])for(const z of [tz-len*.5+.22,tz+len*.5-.22]){
  beam([x-.026,y+.015,z],[x,top-.12,z],.106,.108,'#968466',WOOD,.008);
  box([x,y+.041,z],[.132,.058,.138],'#766b55',WOOD,0,.006)
 }
 for(const x of [.09,.76])for(const yy of [y+.26,top-.154])beam([x,yy,tz-len*.5+.10],[x,yy,tz+len*.5-.10],.091,.125,'#8b795d',WOOD,.007);
 for(const z of [tz-len*.5+.15,tz+len*.5-.15])beam([.08,y+.261,z],[.77,y+.261,z],.103,.088,'#9e8764');
 for(let j=0;j<4;j++){
  const x=tx-depth*.5+(j+.5)*depth/4;
  beam([x,top-.059,tz-len*.5],[x,top-.059,tz+len*.5],depth*.25-.003,.118,pick(['#b59c73','#b29a74','#a88e68','#b59d75']),WOOD,.009);
  if(j!==0)beam([x,y+.316,tz-len*.5+.13],[x,y+.316,tz+len*.5-.13],depth*.25-.013,.046,'#8d7c60',WOOD,.005)
 }
 obstacle(tx-depth*.5-.035,tx+depth*.5+.01,tz-len*.5,tz+len*.5,y,top);
 // Dog holes line the front of the bench; the face vise sits at the working end.
 for(let z=tz-len*.5+.32;z<tz+len*.5-.15;z+=.267)box([.11,top+.0008,z],[.025,.002,.027],'#5e523f',END);
 const vz=-2.02;
 box([-.072,top-.081,vz],[.125,.163,.43],'#9d835e',WOOD,0,.012);
 for(const z of [vz-.14,vz+.14])cyl([-.15,top-.094,z],[.053,top-.094,z],.025,'#636b60',IRON,9);
 cyl([-.19,top-.10,vz],[-.143,top-.10,vz],.050,'#5c695e',IRON,10);
 tube([[-.206,top-.275,vz-.082],[-.206,top+.079,vz+.083]],.0125,'#a28b68',WOOD,9);
 for(const [v,z] of [[-.278,-.082],[.079,.083]])ellipse([-.206,top+v,vz+z],[.021,.022,.021],'#a68f6d',WOOD,8,4);
 // A jack plane with a ground sole, angled iron, front knob and shaped tote.
 const plane=(x,v,z,a,s=1)=>{
  const ex=[Math.cos(a),0,Math.sin(a)],ez=[-Math.sin(a),0,Math.cos(a)],p=(u,h,q)=>vadd([x,v+h*s,z],vadd(vmul(ex,u*s),vmul(ez,q*s)));
  cuboid(p(0,.014,0),[.312*s,.028*s,.071*s],[ex,Y,ez],'#66716c',IRON,.006);
  cuboid(p(-.006,.038,0),[.259*s,.046*s,.064*s],[ex,Y,ez],'#514e40',IRON,.006);
  beam(p(-.048,.041,0),p(-.010,.122,0),.052*s,.010*s,'#a9aca0',IRON,.002);
  cyl(p(.091,.043,0),p(.091,.072,0),.019*s,'#876444',WOOD,9);
  ellipse(p(.091,.084,0),[.026*s,.028*s,.025*s],'#aa8153',WOOD,10,5);
  tube([p(-.100,.055,0),p(-.115,.10,0),p(-.133,.139,0),p(-.104,.148,0),p(-.076,.106,0),p(-.066,.056,0)],.014*s,'#926d49',WOOD,9);
  cyl(p(-.006,.102,0),p(-.006,.116,0),.012*s,'#a69a6d',BRASS,8)
 };
 plane(.365,top+.006,-2.54,-1.15,1.14);
 // Ash offcut and an accurately proportioned carpenter's square on the work surface.
 beam([.47,top+.022,-4.71],[.34,top+.022,-3.18],.198,.043,'#c7aa7c',WOOD,.003);
 box([.255,top+.062,-3.77],[.276,.022,.044],'#91734d',WOOD,-.11,.004);
 box([.358,top+.073,-3.96],[.036,.009,.392],'#9caaa2',IRON,-.11,.002);
 for(let j=0;j<13;j++){const z=-4.11+j*.024;box([.373+(z+3.96)*.108,top+.081,z],[j%4===0?.016:.008,.002,.002],'#54615b',PLAIN,-.11)}
 // Brass dividers opened over a paper pattern, pencil laid alongside.
 box([.47,top+.005,-5.02],[.47,.008,.46],'#cdbf9d',PAPER,-.084);
 sign('LINES',[.47,top+.011,-5.02],X,[0,0,-1],.447,.415,{art:'pattern',ink:'#5e706b'});
 tube([[.36,top+.026,-5.15],[.475,top+.078,-4.96],[.526,top+.026,-5.17]],.0056,'#91845d',BRASS,7);
 cyl([.459,top+.073,-4.963],[.489,top+.073,-4.963],.014,'#a69768',BRASS,9);
 cyl([.161,top+.011,-5.11],[.187,top+.011,-4.945],.0058,'#a68447',PAINT,6,.004);
 // Sheathed handles and open chisel rack below the window.
 const rackZ=-3.49,ry=top+.18;
 beam([.689,ry,rackZ-.39],[.689,ry,rackZ+.39],.091,.052,'#a99570',WOOD,.006);
 for(const z of [rackZ-.31,rackZ+.31])beam([.691,top+.019,z],[.691,ry-.025,z],.048,.046,'#9c8767',WOOD,.004);
 for(let j=0;j<6;j++){
  const z=rackZ-.315+j*.119,v=ry+range(.061,.090),r=range(.012,.019);
  box([.692,ry-.067,z],[r*1.5,.156,.007],'#9ba79f',IRON,0,.001);
  cyl([.692,ry-.002,z],[.692,v,z],r*.55,'#a4a79b',IRON,7);
  cyl([.692,v-.011,z],[.692,v+.011,z],r*.97,'#b59d64',BRASS,9);
  tube([[.692,v+.007,z],[.692,v+.036,z],[.692,v+.09,z],[.692,v+.102,z]],[r,r*1.25,r*1.17,r*.88],pick(['#a87e49','#c09b69','#94724c']),WOOD,10)
 }
 can(.58,y+.341,-2.32,.114,.221,'#587b70','OIL');
 can(.59,y+.341,-2.63,.118,.225,'#a1714f','WAX');
 crate(.41,y+.343,-4.75,.51,.28,.58,0,'FIXINGS');
 // Curls of recent plane shavings, on top and in a small sweep beneath.
 for(let j=0;j<37;j++){
  const floor=j>17,xx=floor?range(-.33,.04):range(.14,.51),zz=range(-3.27,-2.65),yy=floor?y+.012:top+.004;
  const rr=range(.006,.018),len=range(.030,.11),theta=range(0,TAU),pts=[];
  for(let k=0;k<=11;k++){const t=k/11,u=(t-.5)*len,v=Math.sin(t*TAU*1.45)*rr;pts.push([xx+u*Math.cos(theta)-v*Math.sin(theta),yy+rr*(1-Math.cos(t*TAU*1.45)),zz+u*Math.sin(theta)+v*Math.cos(theta)])}
  for(let k=1;k<pts.length;k++){const a=pts[k-1],b=pts[k],p=[.004*Math.sin(theta),.002,-.004*Math.cos(theta)];quad(vsub(a,p),vsub(b,p),vadd(b,p),vadd(a,p),pick(['#c6ad80','#bea275']),WOOD,null,Y)}
 }
}
function shopContents(){
 const y=DECK;sawBench();
 // An in-progress spar rests across two splayed trestles, leaving a passage on both sides.
 for(const z of [-3.53,-1.85]){
  const x=-4.25;
  for(const dx of [-1,1])for(const dz of [-1,1]){
   beam([x+dx*.44,y+.01,z+dz*.153],[x+dx*.23,y+.739,z+dz*.069],.063,.082,'#998364',WOOD,.005);
  }
  beam([x-.505,y+.761,z],[x+.505,y+.761,z],.16,.111,'#a48c68',WOOD,.007);
  beam([x-.365,y+.264,z],[x+.365,y+.264,z],.084,.090,'#827257',WOOD,.004);
  obb(x,z,.93,.32,0,y,y+.816)
 }
 const l0=[-4.38,y+.839,-4.15],l1=[-4.11,y+.839,-1.22];
 beam(l0,l1,.192,.049,'#c2a47a',WOOD,.004);
 beam([-4.10,y+.854,-3.95],[-3.94,y+.854,-1.29],.077,.070,'#ae9169',WOOD,.010);
 obb(-4.21,-2.67,.52,2.88,-.08,y+.65,y+.93);
 // Mallet and marking gauge on the timber, adjacent to the finished end.
 tube([[-4.43,y+.88,-2.06],[-4.14,y+.888,-1.93]],.018,'#af9164',WOOD,9);
 box([-4.398,y+.921,-2.046],[.092,.101,.149],'#917854',WOOD,.40,.013);
 // Rear west shelving with paint, pine tar, oakum and folded sailcloth.
 const sx=-5.91,sz=-4.64,w=.78,d=2.55;
 for(const x of [sx-w*.5+.031,sx+w*.5-.031])for(const z of [sz-d*.5+.04,sz+d*.5-.04])beam([x,y,z],[x,y+1.91,z],.073,.078,'#85775c');
 for(const h of [.19,.745,1.31,1.87]){
  for(let i=0;i<4;i++){const x=sx-w*.5+(i+.5)*w/4;beam([x,y+h-.026,sz-d*.5],[x,y+h-.026,sz+d*.5],w/4-.009,.052,'#968367',WOOD,.005)}
  beam([sx+w*.5-.02,y+h-.082,sz-d*.5],[sx+w*.5-.02,y+h-.082,sz+d*.5],.064,.075,'#88795e')
 }
 obstacle(sx-w*.5,sx+w*.5,sz-d*.5,sz+d*.5,y,y+1.91);
 crate(sx,y+.194,sz-.56,.55,.40,.72,.02,'OAKUM');
 for(let j=0;j<6;j++){
  const z=sz-1+j*.34,x=sx+.09+range(-.075,.061),r=range(.089,.134),h=range(.18,.28);
  can(x,y+.746,z,r,h,pick(['#537268','#a16b4c','#887952','#9b9b88']),pick(['OIL','TAR','','PRIMER']))
 }
 for(let j=0;j<4;j++){const z=sz-.9+j*.46;can(sx+.12,y+1.310,z,.105,.24,pick(['#8c7258','#74897d','#a7885b']),'')}
 for(let i=0;i<4;i++){
  box([sx+.03,y+1.356+i*.073,sz+.82],[.47,.08,.59],tint('#ab9d82',1-i*.036),CLOTH,range(-.028,.028),.026)
 }
 // Rolled canvas on the top shelf, tied with two turns of marline.
 const ra=[sx,y+2.04,sz-.73],rb=[sx,y+2.04,sz+.81];cyl(ra,rb,.153,'#b7aa8b',CLOTH,18,.144);
 for(const z of [sz-.49,sz+.57])for(const d of [-.012,.012])ringTube([sx,y+2.04,z+d],X,Y,.152,.152,.007,'#887952',ROPE,0,TAU,28);
 // Mounted half model and compact lines drawing share a solid wall bay.
 const px=WX0+.111,pz=-4.64,py=y+2.14,axes=[0,0,-1];
 box([px,py,pz],[.055,.64,1.44],'#755f46',WOOD,0,.015);
 box([px+.034,py,pz],[.023,.568,1.345],'#d3c4a0',PAPER);
 sign('DRAUGHT',[px+.049,py,pz],axes,Y,1.30,.535,{art:'lines',ink:'#52665b'});
 // Large panel saw and try square on a board close to the workbench.
 const eX=WX1-.115,ez=-.68,ey=y+1.51;
 box([eX,ey,ez],[.063,.76,.92],'#9d8868',WOOD,0,.014);
 for(const v of [ey-.32,ey+.32])for(const z of [ez-.40,ez+.40])cyl([eX-.042,v,z],[eX-.032,v,z],.013,'#686858',IRON,7);
 const sp=(u,v,d=.05)=>[eX-d,ey+v,ez+u];
 quad(sp(-.305,-.324),sp(-.196,-.326),sp(.145,.122),sp(.018,.176),'#9aa39b',IRON,null,[-1,0,0]);
 for(let k=0;k<22;k++){
  const t=k/22,p=lerp3(sp(-.196,-.326),sp(.145,.122),t),q=lerp3(sp(-.196,-.326),sp(.145,.122),(k+1)/22);
  triangle(p,q,vadd(p,[0,-.009,.013]),'#949f97',IRON,[-1,0,0])
 }
 const grip=[sp(.006,.154,.067),sp(.010,.234,.067),sp(.102,.290,.067),sp(.219,.250,.067),sp(.192,.169,.067),sp(.115,.125,.067),sp(.032,.161,.067)];
 tube(grip,.025,'#8d6744',WOOD,9);
 cyl(sp(.073,.174,.066),sp(.073,.174,.093),.013,'#b29861',BRASS,8);
 beam(sp(.286,.24,.054),sp(.286,-.247,.054),.035,.017,'#a4aba0',IRON,.002);
 beam(sp(.251,.201,.064),sp(.426,.201,.064),.043,.037,'#94744f',WOOD,.003);
 // Cast-iron stove stands on a slate hearth beneath its own flue.
 const cx=WX0+1.33,cz=WZ0+.88;
 box([cx,y+.025,cz],[.83,.05,.77],'#77796d',STONE,0,.02);
 for(const dx of [-1,1])for(const dz of [-1,1])beam([cx+dx*.22,y+.057,cz+dz*.19],[cx+dx*.19,y+.31,cz+dz*.16],.065,.065,'#474e47',IRON,.008);
 box([cx,y+.51,cz],[.52,.52,.45],'#4a544d',IRON,0,.036);
 box([cx,y+.798,cz],[.58,.058,.51],'#62695d',IRON,0,.018);
 cyl([cx,y+.81,cz],[cx,y+.93,cz],.109,'#545b51',IRON,12);
 box([cx,y+.52,cz+.239],[.376,.327,.035],'#697065',IRON,0,.015);
 box([cx,y+.51,cz+.259],[.303,.250,.020],'#444c46',IRON,0,.013);
 beam([cx+.093,y+.54,cz+.284],[cx+.239,y+.561,cz+.294],.021,.023,'#9a8e70',BRASS,.005);
 obstacle(cx-.43,cx+.43,cz-.41,cz+.41,y,y+.84);
 // Warm enamel pendants with a white inner reflector.
 function lamp(x,z,topY,shadeY,r){
  cyl([x,shadeY+.13,z],[x,topY,z],.008,'#4f5146',ROPE,7);
  cyl([x,shadeY+.06,z],[x,shadeY+.152,z],r*.19,'#716b51',BRASS,10);
  const prof=[[.04,.132],[.07,.109],[.11,.062],[r,.006],[r+.008,0]],inner=[];
  for(let j=0;j<prof.length-1;j++){
   const [r0,h0]=prof[j],[r1,h1]=prof[j+1];for(let k=0;k<22;k++){const a=k/22*TAU,b=(k+1)/22*TAU,P=(rr,hh,aa)=>[x+Math.cos(aa)*rr,shadeY+hh,z+Math.sin(aa)*rr];
    quad(P(r0,h0,a),P(r0,h0,b),P(r1,h1,b),P(r1,h1,a),'#426b60',PAINT,null,norm([Math.cos(a),1,Math.sin(a)]));
    quad(P(r0,h0-.004,b),P(r0,h0-.004,a),P(r1,h1-.004,a),P(r1,h1-.004,b),'#dad2b5',PAINT,null,[0,-1,0])
   }
  }
  ellipse([x,shadeY+.01,z],[.038,.061,.038],'#d6cead',GLASS,12,6);ringTube([x,shadeY,z],X,Z,r,r,.007,'#657d6a',IRON)
 }
 lamp(-2.68,-2.10,EY-.17,4.64,.238);lamp(.04,-4.23,EY-.17,4.72,.171);
 // Supplies at the loading side and the rain butt directly beneath its pipe.
 crate(-6.56,y,1.30,.84,.49,.61,-.046,'SHIP STORES');
 crate(-6.48,y+.505,1.30,.64,.34,.49,.042,'BRONZE');
 crate(-5.74,y,1.13,.67,.43,.50,-.019,'');
 coil(-5.72,y+.457,1.12,.226,.169,4.0,'#9a8865');
 barrel(1.57,y,-.61,.329,.91);
 // Dock chart fixed inside beside the door.
 const pc=[-4.62,y+1.44,WZ1-.103];
 box(pc,[.85,.89,.051],'#776b53',WOOD,0,.013);box(vadd(pc,[0,.005,-.031]),[.775,.809,.016],'#ccbea1',PAPER);
 sign('SOUNDINGS',vadd(pc,[0,.005,-.042]),[-1,0,0],Y,.742,.778,{art:'chart',ink:'#58736d'});
 for(const dx of [-.34,.34])for(const dy of [-.36,.36])cyl(vadd(pc,[dx,dy,-.052]),vadd(pc,[dx,dy,-.038]),.010,'#a79669',BRASS,7);
 // Two spare boat hooks in the corner by the doorway.
 for(let i=0;i<2;i++){
  const a=[-.51+i*.17,y+.025,-.23],b=[-.52+i*.15,y+1.84+i*.15,-.04];
  cyl(a,b,.019,'#ae9062',WOOD,9,.017);
  tube([b,vadd(b,[0,.14,0]),vadd(b,[0,.179,-.034]),vadd(b,[0,.107,-.074])],.010,'#778378',IRON,7)
 }
}
