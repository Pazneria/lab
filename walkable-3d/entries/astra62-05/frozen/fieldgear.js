'use strict';
S.fieldgear=function(){
 const {at,box,face,tri,rounded,cyl,cylinder,tube,ball,decal,contact,tint,random}=S;
 const pi=Math.PI,TAU=S.TAU,rng=random(818),metal='929e98',iron='52615b';
 function ovalTube(x,y,z,rx,ry,r,c,mat=1){
   let points=[];for(let k=0;k<=20;k++){let a=k*TAU/20;points.push([x+rx*Math.cos(a),y+ry*Math.sin(a),z])}tube(points,r,c,mat,7);
 }
 function ski(){
   let rows=[[0,.031,.029],[.04,.035,.007],[.26,.040,0],[.68,.038,-.017],[.98,.035,-.023],[1.35,.040,-.006],[1.59,.046,.007],[1.72,.049,.045],[1.81,.040,.088],[1.85,.019,.111],[1.858,.006,.116]];
   for(let i=1;i<rows.length;i++){
     let [b,l,z0]=rows[i-1],[t,r,z1]=rows[i],thick=.014;
     face([-l,b,z0],[l,b,z0],[r,t,z1],[-r,t,z1],i>6?'c89e61':'4d6b65',2);
     face([l,b,z0-thick],[-l,b,z0-thick],[-r,t,z1-thick],[r,t,z1-thick],'424e49',9);
     face([l,b,z0],[l,b,z0-thick],[r,t,z1-thick],[r,t,z1],metal,16);
     face([-l,b,z0-thick],[-l,b,z0],[-r,t,z1],[-r,t,z1-thick],metal,16);
   }
   for(let j=0;j<3;j++){let yy=1.37+j*.052;face([-.039,yy,-.003],[.039,yy+.036,.001],[.039,yy+.058,.002],[-.039,yy+.023,-.002],'c5c5a3',2)}
   box(0,.865,-.002,.058,.193,.037,'68756c',1);
   for(let side of [-1,1]){box(side*.021,.873,.025,.013,.103,.045,'7d8a80',1);S.bolt(side*.017,.816,.020,.0055)}
   rounded(0,.945,.025,.070,.077,.046,.009,'424d45',9);
   box(0,1.006,.011,.046,.064,.036,'aab29e',1);box(0,.621,.019,.047,.095,.046,'a3ac9b',1);
   for(let j=0;j<3;j++)box(0,.62+j*.016,.044,.037,.005,.009,'58665a',9);
 }
 function pole(x,z){
   at(x,.436,z,0,()=>{
     cylinder([0,0,0],[.012,1.34,-.032],.007,.012,'aaa58b',1,9);
     cylinder([.012,1.34,-.032],[.016,1.495,-.030],.019,.020,'4b5649',9,12);
     for(let y of [1.36,1.39,1.42,1.45])cyl(.014,y,-.031,.0204,.007,'636e5e',9,10);
     ovalTube(.04,1.388,-.033,.023,.077,.004,'766f56',5);
     let p=[];for(let i=0;i<=12;i++){let a=i/12*TAU;p.push([.001+.040*Math.cos(a),.081,.040*Math.sin(a)])}
     tube(p,.004,'4a584a',9,6);
     for(let i=0;i<4;i++)tube([[0,.081,0],p[3*i]],.003,'4c584d',9,5);
   },.12);
 }
 function shovel(){
   at(.405,.394,.193,0,()=>{
     const xs=[-.144,-.107,0,.107,.144],heights=[.012,.003,0,.003,.012];
     const low=[],mid=[],up=[];
     for(let i=0;i<5;i++){let x=xs[i],edge=Math.abs(x/.144);
       low.push([x,heights[i],.064+.017*edge]);mid.push([x*.96,.139,.018+.059*edge*edge]);up.push([x*.80,.274-.037*edge,.018+.039*edge*edge]);}
     for(let i=0;i<4;i++){face(low[i],low[i+1],mid[i+1],mid[i],'a5b3ae',1);face(mid[i],mid[i+1],up[i+1],up[i],'9fafa7',1)}
     for(let i of [0,4])tube([low[i],mid[i],up[i]],.007,'aebbaf',16,7);
     tube(low,.009,'aab5ad',16,8);
     for(let x of [-.061,0,.061])tube([[x,.046,.049],[x,.119,.034],[x*.74,.223,.031]],.005,'aab7ac',1,8);
     cylinder([0,.173,.021],[0,1.106,-.041],.016,.014,'b88f50',2,12);
     cylinder([0,.20,.019],[0,.325,.011],.021,.019,'84948a',1,12);
     tube([[0,1.044,-.037],[-.066,1.142,-.043],[-.064,1.189,-.047],[.066,1.189,-.047],[.066,1.142,-.043],[0,1.044,-.037]],.014,'4b584e',9,10);
   },.043,-.052);
 }
 S.group('station',0,()=>{
   at(.660,0,2.705,pi/2,()=>{
     for(let yy of [.456,1.609]){
       box(0,yy,0,1.419,.073,.061,'6c7c72',1);
       for(let x of [-.624,.624])S.bolt(x,yy,.034,.021);
       for(let x of [-.48,-.19,.06,.45])tube([[x,yy,.029],[x,yy-.027,.148],[x,yy+.015,.168]],.013,metal,1,8);
     }
     for(let [xx,roll] of [[-.36,-.048],[-.16,-.026]])at(xx,.391,.181,0,ski,-.062,roll);
     pole(.038,.21);pole(.13,.239);shovel();
   });
   S.block(.779,2.71,.288,1.39);
   // Shipping case outside the laboratory, supported clear of the wet snow.
   const x=-3.31,z=2.27,base=.32;
   at(x,base,z,-.067,()=>{
     for(let xx of [-.437,.437])box(xx,-.058,0,.102,.132,.635,'978b70',4);
     rounded(0,.214,0,1.23,.419,.612,.037,'617565',2);
     rounded(0,.425,0,1.259,.088,.637,.025,'83937c',2);box(0,.391,.306,1.212,.022,.026,'3f5044',9);
     for(let xx of [-.512,-.376,.377,.512])box(xx,.223,.313,.042,.237,.032,'6e816d',2);
     for(let xp of [-.417,.417]){
       rounded(xp,.365,.331,.072,.112,.033,.011,'9aa491',1);box(xp,.352,.355,.046,.047,.015,'697768',1);
       for(let zz of [-.18,.18])box(xp,.478,zz,.083,.019,.232,'889980',2);
     }
     rounded(0,.22,.324,.421,.157,.015,.007,'bcc1a7',3);decal('cargo',0,.22,.335,.396,.132);
     for(let side of [-1,1]){
       at(side*.62,.21,0,side*pi/2,()=>{rounded(0,0,0,.233,.135,.019,.015,'44574a',9);tube([[-.089,.028,.013],[-.084,-.016,.039],[.084,-.016,.039],[.089,.028,.013]],.012,metal,1,9)});
     }
     const top=[];for(let j=0;j<=13;j++){let xx=-.601+j*.092;top.push([xx,.476+.011*rng(),-.255+.037*rng()])}
     for(let j=1;j<top.length;j++){let a=top[j-1],b=top[j];face([a[0],.474,a[2]+.055+rng()*.029],[b[0],.474,b[2]+.055+rng()*.029],b,a,'c8d4d9',17)}
   });
   S.block(x,z,1.26,.69);contact(x,z,.92,.60,.47);
   // Maintenance access at the lee end.
   at(-2.84,0,-4.286,pi,()=>{
     for(let side of [-1,1]){
       let x=side*.259;
       tube([[x,.51,.197],[x,3.53,.197],[x,3.71,.17],[x,3.79,.079],[x,3.80,-.080],[x,3.73,-.258],[x,3.58,-.265]],.029,'9daaa3',1,12);
       for(let yy of [.76,1.69,2.68,3.18]){
         box(x,yy,-.018,.114,.124,.032,'78867e',1);tube([[x,yy,0],[x,yy,.196]],.026,metal,1,9);
       }
     }
     for(let j=0;j<10;j++){
       let yy=.627+j*.296;cylinder([-.25,yy,.196],[.25,yy,.196],.020,.020,'a2afa6',1,12);
       for(let x of [-.143,.143])cylinder([x-.045,yy,.196],[x+.045,yy,.196],.021,.021,'7a8980',1,12);
     }
     rounded(.89,1.91,0,.404,.364,.088,.016,'889689',2);
     for(let x of [.805,.985]){cylinder([x,1.923,.046],[x,1.923,.094],.048,.051,'47584c',9,14);cylinder([x,1.923,.094],[x,1.923,.104],.044,.044,'a39b72',2,14)}
     tube([[.893,1.734,0],[.893,1.41,0],[1.04,1.265,0],[2.67,1.265,0]],.016,'8d9c90',1,10);
     decal('service',.89,1.795,.047,.257,.085);
   });
   S.block(-2.84,-4.47,.58,.27);
 });
};
