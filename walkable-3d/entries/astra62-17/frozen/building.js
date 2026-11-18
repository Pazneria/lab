(function(R){
'use strict';
const {C,PI,TAU,at,box,rounded,beam,rod,cyl,torus,ball,poly,grid,solid,tint,rnd,pick,panel,canvasMat,region,shadow}=R;
const H=3.14,F={left:-4.10,right:3.55,front:3.42,back:-3.05,studyBack:-5.33,studyLeft:.40,rail:5.13,balconyEnd:.84};
R.floorPlan=F;
canvasMat('wash',512,384,(c,w,h)=>{
 const pts=[];for(let i=0;i<78;i++){const a=TAU*i/78,v=.78+rnd(-.10,.10)+.13*Math.sin(a*5+1)+.065*Math.sin(a*11);pts.push([w*.51+Math.cos(a)*w*.45*v,h*.51+Math.sin(a)*h*.43*v])}
 R.art.path(c,pts,'rgba(152,135,111,.38)');const g=c.createRadialGradient(240,220,12,255,193,243);g.addColorStop(0,'#cbbd9c');g.addColorStop(1,'#cfc0a1');c.fillStyle=g;c.fill();
 for(let i=0;i<70;i++){const n=Math.floor(rnd(0,pts.length)),[x,y]=pts[n];c.fillStyle=i%2?'#998c7155':'#efdfb944';c.fillRect(x+rnd(-2,7),y+rnd(-3,3),rnd(.5,4),rnd(1,3))}
 let x=330,y=136;for(let i=0;i<14;i++){const a=x+rnd(-9,16),b=y+rnd(4,11);R.art.line(c,[[x,y],[a,b]],'#7d715c80',1.2);x=a;y=b}
},{transparent:true,depthWrite:false});R.mats.wash.userData.noCast=true;
function floor(x0,x1,z0,z1,exterior=false){
 const colors=exterior?['#8b7c64','#8a755b','#7c705e','#99876b']:['#9b704d','#a78057','#aa8057','#926946','#ac865d','#976e4b','#9e7955'];
 box((x0+x1)/2,-.11,(z0+z1)/2,x1-x0,.20,z1-z0,'timber','#4e4032');
 const n=Math.ceil((z1-z0)/(exterior?.159:.197)),dw=(z1-z0)/n;
 for(let i=0;i<n;i++){
 let x=x0,end=Math.min(x1,x+rnd(.65,2.8));const z=z0+dw*(i+.5);
 while(x<x1-.005){if(x1-end<.39)end=x1;
 box((x+end)/2,-.026,z,end-x-.004,.052,dw-.0035,'timber',pick(colors));
 if(end-x>.5&&i%2===0){for(let sx of [x+.05,end-.05])for(let j of [-1,1])cyl(sx,.001,z+j*dw*.29,.0055,.006,.002,'iron','#655748',6)}
 x=end;end=Math.min(x1,x+rnd(1.75,3.65))
 }}
}
function ceiling(x0,x1,z0,z1,y=H){const n=Math.ceil((x1-x0)/.203),w=(x1-x0)/n;
 box((x0+x1)/2,y+.10,(z0+z1)/2,x1-x0,.16,z1-z0,'timber','#443629');
 for(let i=0;i<n;i++)box(x0+(i+.5)*w,y+.028,(z0+z1)/2,w-.004,.065,z1-z0,'timber',pick(['#89694b','#8e7152','#a1825e','#8c7155','#977655']))}
function wall(w,h,lower=0,coll=true,plinth=true){
 box(0,lower+h/2,0,w,h,.16,'plaster',tint(C.plaster,.027));
 if(coll)solid(0,0,w,.17,0,'wall');
 if(lower===0&&plinth&&w>.09){box(0,.092,.1,w,.184,.074,'timber',C.wood);box(0,.184,.107,w,.027,.072,'timber',C.edge)}
}
function segment(x0,x1,z,rot=0){at((x0+x1)/2,0,z,rot,()=>wall(x1-x0,H))}
function east(z0,z1,study=false){at(F.right,0,(z0+z1)/2,-PI/2,()=>wall(z1-z0,H))}
function stud(x,z,w=.16,d=.18,h=H){box(x,h/2,z,w,h,d,'timber',tint(C.beam,.09))}
function postFace(x,z,yaw,w=.16){at(x,0,z,yaw,()=>{stud(0,0,w,.18);for(let y of [.27,2.61,2.89])cyl(0,y,.094,.021,.022,.012,'timber','#927153',10,PI/2)})}
function skirting(w,h=.70){
 box(0,h*.5,.105,w,h,.045,'timber','#6e503b');
 const n=Math.ceil(w/.24),d=w/n;for(let i=0;i<n;i++){box(-w/2+(i+.5)*d,h*.5,.133,d-.008,h-.024,.027,'timber',tint('#806047',.14))}
 box(0,h+.013,.135,w,.052,.073,'timber','#886449');box(0,.075,.14,w,.15,.068,'timber',C.wood)
}
function lintel(w,height=2.32){for(let s of [-1,1]){
 box(s*(w/2+.06),height/2,.005,.12,height,.235,'timber',C.wood);
 box(s*(w/2+.097),height/2,.104,.044,height,.052,'timber',C.edge);
 box(s*(w/2+.065),.13,.01,.162,.26,.25,'timber',C.beam);
 box(s*(w/2-.015),height-.09,.012,.12,.11,.205,'timber',C.edge,0,0,s*-.63);
 cyl(s*(w/2+.06),height-.13,.129,.02,.021,.009,'timber','#a08461',10,PI/2)}
 box(0,height+.07,0,w+.33,.15,.244,'timber',C.wood);box(0,height+.154,0,w+.41,.043,.27,'timber',C.edge);
 box(0,.011,0,w+.07,.024,.19,'timber','#a28259')
}
function patch(x,y,z,w,h,yaw=0){panel(x,y,z,w,h,'wash','#ffffff',0,yaw)}
region('main',()=>{
 floor(F.left-.08,F.right+.08,F.back-.06,F.front+.08);ceiling(F.left-.08,F.right+.10,F.back-.08,F.front+.1);
 segment(F.left-.08,.67,F.back);segment(3.24,F.right+.08,F.back);
 at(1.955,0,F.back,0,()=>wall(2.57,H-2.44,2.44,false,false));
 at(1.955,0,F.back,0,()=>lintel(2.57,2.40));
 at(F.left,0,(F.front+F.back)/2,PI/2,()=>{wall(F.front-F.back+.16,H);skirting(F.front-F.back+.04,.62)});
 at((F.left+F.right)/2,0,F.front,PI,()=>{wall(F.right-F.left+.16,H);skirting(F.right-F.left+.04,.71)});
 at((F.left+.63)/2,0,F.back,0,()=>skirting(.63-F.left,.71));
 east(F.back,-2.68);east(-1.24,-.91);east(.62,F.front+.08);
 at(F.right,0,-1.96,-PI/2,()=>{
 wall(1.44,.87,0,true);wall(1.44,H-2.45,2.45,false,false);
 for(let s of [-1,1]){box(s*.719,1.66,0,.095,1.66,.202,'timber',C.wood);box(0,s===1?2.455:.875,.027,1.55,.096,.225,'timber',C.edge)}
 box(0,.865,.082,1.63,.07,.30,'timber',C.oakLight);box(0,1.66,-.051,.054,1.58,.057,'timber',C.edge);
 box(0,1.80,-.052,1.44,.048,.058,'timber',C.edge);
 R.standard('bottleGlass',{color:'#c5d6bd',roughness:.21,metalness:.07,transparent:true,opacity:.088,depthWrite:false,side:R.T.DoubleSide,normalMap:R.mats.plaster.normalMap,normalScale:new R.T.Vector2(.033,.033),envMapIntensity:.74});
 R.mats.bottleGlass.userData.noCast=true;R.mats.bottleGlass.forceSinglePass=true;panel(0,1.664,-.069,1.362,1.502,'bottleGlass');
 for(let x of [-.36,.36])box(x,1.66,-.046,.019,1.58,.023,'metal','#706e5e');
 for(let y of [1.29,2.14])box(0,y,-.046,1.42,.017,.023,'metal','#706e5e')
 });
 at(F.right,0,(-.91+.62)/2,-PI/2,()=>{wall(1.53,H-2.41,2.41,false,false);lintel(1.53,2.37)});
 for(let z of [F.back+.01,-1.1,1.08,F.front-.025]){postFace(F.left+.07,z,PI/2,.17);postFace(F.right-.07,z,-PI/2,.16);
 box((F.left+F.right)/2,H-.10,z,F.right-F.left+.09,.22,.195,'timber',tint('#5e4532',.065));
 for(let x of [F.left+.30,F.right-.30]){
 const s=x<0?1:-1;beam([x-s*.16,H-.52,z],[x+s*.20,H-.15,z],.11,.143,'timber',C.edge);
 cyl(x,H-.115,z+.102,.024,.025,.012,'timber','#997859',10,PI/2)}
 }
 for(let x of [-3.93,-.51,3.38])postFace(x,F.front-.06,PI);
 for(let x of [-3.98,-1.60,.46,3.42])postFace(x,F.back+.053,0);
 box((F.left+F.right)/2,2.96,F.back+.065,F.right-F.left,.16,.16,'timber',C.wood);
 box((F.left+F.right)/2,2.96,F.front-.065,F.right-F.left,.16,.16,'timber',C.wood);
 /* The closed stair door marks the safe return point. */
 at(1.36,0,F.front-.112,PI,()=>{
 box(0,1.08,.055,1.06,2.16,.11,'timber','#483e33');
 for(let i=0;i<5;i++)box((i-2)*.19,1.06,.122,.184,2.08,.052,'timber',tint('#896e4e',.12));
 for(let s of [-1,1]){rounded(s*.551,1.115,.115,.135,2.23,.145,.013,'timber',C.wood);box(s*.552,.13,.129,.159,.25,.153,'timber',C.edge)}
 rounded(0,2.24,.115,1.23,.145,.157,.016,'timber',C.wood);
 for(let y of [.31,1.74]){box(-.22,y,.155,.53,.055,.025,'iron',C.iron);poly([[.02,y-.048,.17],[.15,y,.17],[.02,y+.048,.17]],'iron',C.iron);
 for(let x of [-.41,-.27,-.08])ball(x,y,.176,.012,.012,.009,'metal','#92806a',9,5)}
 box(.32,1.01,.163,.104,.24,.024,'iron','#554f43');torus(.32,1.02,.195,.056,.009,'metal',C.brass);
 box(.34,.98,.201,.12,.021,.026,'metal',C.brass);
 panel(0,1.56,.157,.43,.174,'doorPlaque');solid(0,.104,1.075,.129,0,'stair door')
 });
 patch(-.12,2.0,F.back+.084,.65,.58);patch(-2.32,2.59,F.back+.084,.88,.38);
 patch(F.left+.084,1.28,-1.65,.85,.62,PI/2);patch(2.79,1.54,F.front-.084,.86,.73,PI);
 patch(F.right-.084,2.35,1.86,.82,.43,-PI/2);
});
region('study',()=>{
 floor(F.studyLeft-.05,F.right+.08,F.studyBack-.06,F.back-.065);ceiling(F.studyLeft-.08,F.right+.1,F.studyBack-.08,F.back-.08);
 at(F.studyLeft,0,(F.studyBack+F.back)/2,PI/2,()=>{wall(F.back-F.studyBack+.1,H);skirting(F.back-F.studyBack,.61)});
 segment(F.studyLeft-.08,F.right+.08,F.studyBack);
 east(F.studyBack,-4.89);east(-3.53,F.back);
 at(F.right,0,-4.21,-PI/2,()=>{wall(1.36,H-2.26,2.26,false,false);lintel(1.36,2.22)});
 for(let z of [F.studyBack+.035,-4.12]){box(1.975,3.035,z,3.19,.22,.155,'timber',C.beam)}
 for(let x of [F.studyLeft+.055,F.right-.065])postFace(x,F.studyBack+.06,0,.135);
 patch(2.96,1.55,F.studyBack+.083,.67,.59);box(1.98,2.92,F.studyBack+.077,3.19,.104,.14,'timber',C.wood)
});
R.arch={floor,ceiling,wall,postFace,lintel,H};
})(Room);
