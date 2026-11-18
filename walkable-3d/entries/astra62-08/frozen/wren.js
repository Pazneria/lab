'use strict';
const BOAT_X=5.27,BOAT_Z=5.50,BOAT_A=-.205,BOAT_BASE=.70;
const boatX=[Math.cos(BOAT_A),0,Math.sin(BOAT_A)],boatZ=[-Math.sin(BOAT_A),0,Math.cos(BOAT_A)];
function bp(u,v,w){
 // A slight heel gives the supported hull its grounded weight.
 const a=-.047,yy=v*Math.cos(a)-w*Math.sin(a),zz=v*Math.sin(a)+w*Math.cos(a);
 return vadd([BOAT_X,BOAT_BASE+yy,BOAT_Z],vadd(vmul(boatX,u),vmul(boatZ,zz)))
}
const loft=[
 [-2.38,.492,.164,.91],[-2.13,.612,.102,.874],[-1.79,.726,.048,.838],[-1.38,.815,.015,.809],[-.89,.876,0,.792],[-.32,.903,-.008,.789],[.24,.899,-.006,.807],[.76,.848,.010,.842],[1.25,.736,.047,.899],[1.71,.562,.123,.969],[2.08,.367,.246,1.052],[2.35,.190,.413,1.142],[2.52,.067,.615,1.222],[2.585,.012,.824,1.265]
];
function loftData(u){
 u=clamp(u,loft[0][0],loft.at(-1)[0]);let i=0;while(i<loft.length-2&&u>loft[i+1][0])i++;
 const p0=loft[Math.max(0,i-1)],p1=loft[i],p2=loft[i+1],p3=loft[Math.min(loft.length-1,i+2)],span=p2[0]-p1[0],t=(u-p1[0])/span;
 return [1,2,3].map(k=>{
  const a=(p2[k]-p0[k])/(p2[0]-p0[0])*span,b=(p3[k]-p1[k])/(p3[0]-p1[0])*span;
  return (2*t*t*t-3*t*t+1)*p1[k]+(t*t*t-2*t*t+t)*a+(-2*t*t*t+3*t*t)*p2[k]+(t*t*t-t*t)*b
 })
}
function hullPoint(u,t,side,offset=0){
 const [w,k,h]=loftData(u),f=.023+.977*Math.pow(Math.max(0,Math.sin(t*PI*.5)),.715);
 const rake=(1-t)*(.177*sm(-1.5,-2.38,u)-.39*sm(1.5,2.59,u));
 return bp(u+rake,mix(k,h,t),side*(w*f+offset))
}
function hullNormal(u,t,side){
 const a=hullPoint(u-.003,t,side),b=hullPoint(u+.003,t,side),c=hullPoint(u,Math.max(0,t-.002),side),d=hullPoint(u,Math.min(1,t+.002),side);
 return vmul(norm(cross(vsub(b,a),vsub(d,c))),side)
}
function skiff(){
 const u0=loft[0][0],u1=loft.at(-1)[0],sections=55,strakes=9;
 const hullPalette=['#8f5b45','#a1664e','#ad7054','#4f8175','#478079','#397c77','#417f7a','#43807a','#d4cfad'];
 function strip(side,t0,t1,d0,d1,col,mat,inside=false){
  const id=mesh.v.length/13;
  for(let s=0;s<=sections;s++){
   const u=mix(u0,u1,s/sections);
   for(const [t,d] of [[t0,d0],[t1,d1]]){
    const p=hullPoint(u,t,side,d),n=vmul(hullNormal(u,t,side),inside?-1:1);
    mesh.vertex(p,n,[u+.68*t0,t*.99+1.8*t0],col,mat,inside?.71+.27*t:1)
   }
   if(s){const v=id+2*s;mesh.i.push(v-2,v,v+1,v-2,v+1,v-1)}
  }
 }
 for(const side of [-1,1]){
  for(let j=0;j<strakes;j++){
   const a=j/strakes,b=(j+1)/strakes,col=hullPalette[j],inside=tint(pick(['#a98054','#ba9567','#b59060','#ac885c']),.98);
   strip(side,a,b,.017,.001,col,PAINT);strip(side,a,b,-.025,-.035,inside,WOOD,true);
   const pts=[],inner=[];
   for(let i=0;i<=sections;i++){const u=mix(u0,u1,i/sections);pts.push(hullPoint(u,a,side,.015));inner.push(hullPoint(u,b,side,-.034))}
   tube(pts,j===0?.010:.0075,tint(col,.72),j<3?PAINT:WOOD,5,{cap:false});
   if(j<strakes-1)tube(inner,.0065,'#806341',WOOD,5,{cap:false})
  }
  const rail=[],lower=[],inrail=[],stripe=[];
  for(let i=0;i<=sections;i++){
   const u=mix(u0,u1,i/sections);
   rail.push(vadd(hullPoint(u,1,side,.002),[0,.017,0]));
   inrail.push(vadd(hullPoint(u,.995,side,-.056),[0,.001,0]));
   lower.push(hullPoint(u,.883,side,.016));stripe.push(hullPoint(u,.862,side,.012))
  }
  tube(rail,.032,'#b49061',WOOD,9);tube(inrail,.025,'#9f794f',WOOD,7);
  tube(lower,.0125,'#b49763',WOOD,6);tube(stripe,.008,'#d1c8a3',PAINT,6);
  // Broken paint follows the laps; the broad faces retain their hand-brushed color.
  for(let i=0;i<102;i++){
   const u=range(u0+.10,u1-.12),j=Math.floor(range(1,9)),t=(j+range(.025,.32))/strakes,l=range(.021,.143),h=range(.002,.008);
   const a=hullPoint(u,t,side,.020),b=hullPoint(u+l*.45,t+h,side,.019),c=hullPoint(u+l,t+h*.3,side,.019),d=hullPoint(u+l*.28,t-h*.3,side,.020);
   quad(a,b,c,d,pick(j<3?['#b48d69','#9d8364']:['#b2ac8d','#83988a','#929782']),PAINT,null,hullNormal(u,t,side))
  }
 }
 // Continuous keel and brass half-round stem band.
 let keel=[];for(let i=0;i<=sections;i++){const u=mix(u0,u1,i/sections),p=lerp3(hullPoint(u,0,-1),hullPoint(u,0,1),.5);keel.push(vadd(p,[0,-.033,0]))}
 tube(keel,.044,'#765f47',WOOD,8);
 const stem=[];for(let i=0;i<=14;i++){const t=i/14;stem.push(lerp3(hullPoint(u1,t,-1),hullPoint(u1,t,1),.5))}
 tube(stem,.044,'#957d59',WOOD,10);
 tube(stem.map(p=>vadd(p,vmul(boatX,.038))),.012,'#959176',BRASS,8);
 // Steam-bent frames, sprung to the inner skin, with copper roves outside.
 for(const u of [-2.08,-1.75,-1.43,-1.10,-.77,-.44,-.11,.22,.55,.88,1.21,1.54,1.86,2.14]){
  const frame=[];
  for(let j=10;j>=0;j--)frame.push(hullPoint(u,j/10,-1,-.047));
  for(let j=1;j<=10;j++)frame.push(hullPoint(u,j/10,1,-.047));
  tube(frame,.022,'#ae8b5f',WOOD,7);
  for(const side of [-1,1])for(let j=1;j<9;j++){
   const t=(j+.18)/9,p=hullPoint(u,t,side,.017),n=hullNormal(u,t,side);
   cyl(vadd(p,vmul(n,-.002)),vadd(p,vmul(n,.005)),.0081,'#756a4c',BRASS,6)
  }
 }
 // Raked transom, fitted plank by plank. The end cap closes the hull.
 for(let j=0;j<9;j++){
  const a=j/9,b=(j+1)/9,p=hullPoint(u0,a,-1),q=hullPoint(u0,a,1),r=hullPoint(u0,b,1),s=hullPoint(u0,b,-1);
  quad(p,q,r,s,j<3?hullPalette[j]:'#5f8070',j<3?PAINT:WOOD,null,vmul(boatX,-1));
  const off=vmul(boatX,.046);quad(vadd(p,off),vadd(s,off),vadd(r,off),vadd(q,off),'#ad8759',WOOD,null,boatX)
 }
 beam(hullPoint(u0,1,-1),hullPoint(u0,1,1),.078,.067,'#b3986a',WOOD,.011);
 const trans=lerp3(hullPoint(u0,.67,-1),hullPoint(u0,.67,1),.5);
 sign('WREN',vadd(trans,vmul(boatX,-.022)),boatZ,Y,.64,.150,{ink:'#e7ddbb',family:'Georgia',bold:true,tracking:.10});
 sign('TERN  INLET',vadd(vadd(trans,vmul(boatX,-.003)),[0,-.132,0]),boatZ,Y,.47,.051,{ink:'#d8d0ac',bold:true});
 // Slatted sole boards and three fitted thwarts. Actual gaps expose the ribs below.
 for(let j=-2;j<=2;j++){
  const w=j*.133;beam(bp(-1.72,.242,w),bp(1.43,.242,w),.124,.050,pick(['#a18a63','#b29970','#a99168']),WOOD,.006)
 }
 for(const [u,v,depth] of [[-1.78,.594,.40],[-.57,.581,.252],[.92,.628,.248]]){
  const [w,k,h]=loftData(u),t=(v-k)/(h-k),half=w*(.023+.977*Math.sin(t*PI/2)**.715)-.04;
  beam(bp(u,v,-half),bp(u,v,half),depth,.052,'#b2986b',WOOD,.009);
  beam(bp(u,v-.051,-half*.91),bp(u,v-.051,half*.91),.094,.059,'#947956',WOOD,.006);
  for(const side of [-1,1])for(const d of [-1,1]){
   const head=bp(u+d*depth*.31,v+.026,side*(half-.06));
   cyl(head,vadd(head,[0,.004,0]),.010,'#7e765b',BRASS,6)
  }
 }
 // Open triangular breasthook and a small foredeck fitted between the rails.
 for(let j=0;j<6;j++){
  const a=mix(1.98,2.48,j/6),b=mix(1.98,2.48,(j+.97)/6);
  const p=hullPoint(a,.966,-1,-.037),q=hullPoint(a,.966,1,-.037),r=hullPoint(b,.966,1,-.037),s=hullPoint(b,.966,-1,-.037);
  quad(p,q,r,s,pick(['#b0966b','#b9a078','#af936d']),WOOD,null,Y)
 }
 for(const side of [-1,1]){
  const p=hullPoint(.05,1,side,.007);
  cyl(vadd(p,[0,.012,0]),vadd(p,[0,.054,0]),.039,'#8a8968',BRASS,10);
  const pts=[vadd(p,[0,.032,0]),vadd(p,[0,.117,0])];tube(pts,.013,'#a09169',BRASS,9);
  const fork=[];for(let i=0;i<=14;i++){const a=PI*.89+i/14*PI*1.22;fork.push(vadd(p,vadd(vmul(boatX,Math.cos(a)*.056),[0,.14+Math.sin(a)*.058,0])))}tube(fork,.011,'#9b9471',BRASS,8)
 }
 // Matched ash oars rest on the thwarts, long blades outboard of the handles.
 function oar(u0,w0,u1,w1,v,bladeTone){
  const a=bp(u0,v,w0),b=bp(u1,v+.038,w1),dir=norm(vsub(b,a)),across=norm(cross(dir,Y));
  const axis=[dir,Y,across],pt=t=>lerp3(a,b,t),sidept=(t,s,h)=>vadd(pt(t),vadd(vmul(across,s),[0,h,0]));
  tube([pt(0),pt(.085),pt(.115),pt(.39),pt(.68)],[.025,.027,.033,.030,.028],'#bc9b67',WOOD,10);
  tube([pt(.33),pt(.39),pt(.425)],[.034,.035,.034],'#89735c',CLOTH,9);
  const profile=[[.64,.027],[.73,.055],[.85,.091],[.977,.098],[1,.077]],top=[];
  for(let i=0;i<profile.length-1;i++){
   const [t0,s0]=profile[i],[t1,s1]=profile[i+1];
   for(const sg of [-1,1]){
    const p=sidept(t0,sg*s0,0),q=sidept(t1,sg*s1,0),r=sidept(t1,0,.015),s=sidept(t0,0,.020);
    quad(p,q,r,s,bladeTone,PAINT,null,Y);quad(vadd(p,[0,-.011,0]),vadd(q,[0,-.011,0]),q,p,'#a78c65',WOOD)
   }
  }
  for(const [t0,t1] of [[.833,.856],[.877,.889]])quad(sidept(t0,-.088,.023),sidept(t1,-.089,.023),sidept(t1,.089,.023),sidept(t0,.088,.023),'#a75c47',PAINT,null,Y)
 }
 oar(-1.67,-.28,1.66,.15,.682,'#d2c6a3');oar(-1.59,-.43,1.75,-.05,.743,'#cec2a1');
 const bowEye=bp(2.12,1.074,0);ringTube(bowEye,boatX,Y,.042,.045,.013,'#818367',BRASS);
 const landEye=[8.75,landY(8.75,4.68)+.16,4.68];
 stone(8.75,landY(8.75,4.68),4.68,.37,.17,.29,'#868b80',.8,true);
 ringTube(landEye,boatX,Y,.062,.054,.011,'#686e60',IRON);
 cord(bowEye,landEye,.17,.015,'#af9b72');
 // Cross-bearers and individually sawn chocks support the bilges on the beach.
 for(const u of [-1.43,1.12]){
  const p=bp(u,0,0),k=loftData(u)[1],ground=landY(p[0],p[2]),top=BOAT_BASE+k-.049;
  const tY=top-.069;
  beam([p[0]-boatZ[0]*1.07,tY,p[2]-boatZ[2]*1.07],[p[0]+boatZ[0]*1.07,tY,p[2]+boatZ[2]*1.07],.205,.138,'#766f58',WOOD,.012);
  for(const side of [-1,1]){
   const p0=bp(u,k-.039,side*.17),p1=bp(u,k+.12,side*.50),p2=bp(u,k+.20,side*.62);
   beam(p0,p1,.18,.10,'#8d7f61',WOOD,.008);beam(p1,p2,.18,.10,'#847557',WOOD,.008);
   const b=bp(u,0,side*.82),yy=landY(b[0],b[2]),r=top-.132-yy;
   if(r>.03)stone(b[0],yy+r*.42,b[2],.195,r*.62,.151,'#89867b')
  }
 }
}
