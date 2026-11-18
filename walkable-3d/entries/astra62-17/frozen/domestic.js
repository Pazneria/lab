/* The view on returning from the gallery: washing, boots and hearth wood. */
(function(R){
'use strict';
const {T,PI,TAU,C,canvasMat,at,box,rounded,cyl,ball,torus,lathe,rod,beam,tube,poly,grid,panel,solid,shadow,rnd,pick,tint,frame,region}=R;
const {pottery,sprigs,basket,pillow,book,satchel,pull,turnedLeg,scaleAt}=R.props;
const {rect,bez,oval,line,fleck}=R.art;
canvasMat('tile',192,192,(c,w,h)=>{
 rect(c,0,0,w,h,'#c9c8ab');c.strokeStyle='#82988c';c.lineWidth=3;c.strokeRect(8,8,176,176);c.strokeStyle='#a0a993';c.lineWidth=1.5;c.strokeRect(13,13,166,166);
 c.translate(96,96);
 for(let j=0;j<4;j++){c.save();c.rotate(j*PI/2);bez(c,[[0,-5],[-6,-24,-18,-37,-26,-38],[-22,-25,-13,-12,0,-5]],'#7a9486');bez(c,[[1,-9],[16,-24,19,-40,14,-53],[2,-41,-5,-20,1,-9]],'#789183');bez(c,[[13,-50],[22,-61,33,-58,36,-50],[37,-60,28,-70,16,-63]],null,'#829389',2.3);
 oval(c,0,-70,3,3,'#929e89');oval(c,65,-65,4,4,'#91a08c');c.restore()}oval(c,0,0,7,7,'#a99163');fleck(c,96,96,230,['#75674027','#f5eacc30'])
},{roughness:.34});
function washstand(){at(3.396,0,2.22,-PI/2,()=>{
 shadow(0,0,.316,1.59,.99);
 for(let x of [-.515,.515])for(let z of [.089,.443])turnedLeg(x,.001,z,.798,.045,'#7f6348');
 rounded(0,.818,.268,1.19,.069,.55,.014,'timber','#a5815c');box(0,.759,.272,1.124,.069,.492,'timber','#876746');
 box(0,.689,.453,1.07,.102,.066,'timber','#99764e');for(let s of [-1,1])box(s*.515,.687,.267,.06,.103,.36,'timber',C.edge);
 for(let j=0;j<4;j++)box(0,.185,.12+j*.092,1.065,.037,.087,'timber',tint('#93744f',.13));
 basket(-.273,.207,.271,.137,.211,'#a08560');
 for(let i=0;i<3;i++)rounded(.230,.239+i*.065,.27,.424,.067,.29,.024,'wool',['#c2b69b','#b7b59b','#d0c4a4'][i],0,.012*(i-1),0,3);
 /* Two rows of old handpainted splash tiles and a pine ledge. */
 box(0,1.009,.031,1.146,.337,.037,'plaster','#b5a78a');
 for(let j=0;j<2;j++)for(let i=0;i<7;i++){const x=(i-3)*.160,y=.926+j*.16;rounded(x,y,.048,.155,.155,.019,.005,'glaze','#bec1a8',0,0,0,1);panel(x,y,.060,.148,.148,'tile','#f3edd6',0,0,(i+j)%2*PI/2)}
 box(0,1.190,.05,1.177,.043,.083,'timber',C.edge);
 at(-.128,.853,.288,0,()=>{
 lathe(0,0,0,[[.001,.001],[.093,.001],[.104,.009],[.095,.022],[.14,.034],[.188,.074],[.209,.114],[.217,.119],[.22,.127],[.207,.133],[.197,.127],[.18,.090],[.133,.053],[.084,.034],[.001,.033]],'glaze','#d3d5bc',40);
 torus(0,.128,0,.214,.0047,'glaze','#698986',PI/2,0,0,36);torus(0,.105,0,.204,.0027,'glaze','#93a699',PI/2,0,0,36)
 });
 pottery(.302,.853,.194,1.05,'jug','#829c91',-.77);
 at(-.459,.854,.176,.19,()=>{ball(0,.014,0,.066,.015,.048,'glaze','#acaa8e',18,8);rounded(0,.036,0,.081,.032,.048,.01,'plain','#cebd92')});
 for(let x of [.178,.479])rod([x,.724,.492],[x,.724,.575],.009,.009,'metal',C.brass,10);rod([.165,.724,.576],[.492,.724,.576],.010,.010,'metal',C.brass,12);
 grid(23,32,(u,v)=>{const a=v*PI*1.04,back=v>.5?1:-1,p=Math.max(0,Math.abs(v-.5)-.085)/.415;
 return[.329+(u-.5)*.225+.010*Math.sin(PI*v),.725+.018*Math.cos((v-.5)*PI*2)-p*(back===1?.305:.198)+.005*Math.sin(12*u+2*v),.576+back*(.012+.021*Math.sin(a))+.011*Math.sin(u*23+v*2),u,v]},'throw','#efead8');
 frame(0,1.755,.035,.444,.579,'botanical',0,'#806449');
 solid(0,.269,1.20,.566,0,'washstand')
})}
function boot(x,y,z,s,yaw){scaleAt(x,y,z,s,yaw,()=>{
 rounded(0,.033,.048,.124,.052,.281,.022,'leather','#574b38',0,0,0,3);
 rounded(0,.077,.101,.127,.072,.185,.033,'leather','#8f6946',-.04,0,0,3);
 ball(0,.12,.005,.068,.088,.103,'leather','#916c49',18,10);
 const shape=[[.057,.08],[.070,.123],[.064,.172],[.054,.235],[.061,.321],[.056,.331],[.048,.321],[.045,.285]];at(0,0,-.025,0,()=>R.local(R.matrix(0,0,0,0,0,0,1,1,.83),()=>lathe(0,0,0,shape,'leather','#896346',20)));
 for(let i=0;i<6;i++){let yy=.149+i*.028,zz=.048-(i/5)*.024,ww=.030-(i/5)*.008;for(let s of [-1,1]){torus(s*ww,yy,zz,.0064,.0018,'metal','#a99467',0,0,0,9);if(i<5)rod([s*ww,yy,zz+.004],[-s*(ww-.001),yy+.028,zz-.0005],.0028,.0028,'wool','#d1b993',5)}}
 tube([[-.048,.313,-.023],[-.060,.345,-.047],[-.037,.352,-.059],[-.031,.305,-.063]],.006,'leather','#6f513b',6,13)
})}
function cloak(x,y,z){
 at(x,y,z,0,()=>{
 const fn=(u,v)=>{let spread=.08+.352*(1-v)**.60,hang=1.07*(1-v),X=(u-.50)*spread+.047*Math.sin(v*3.9)-.03*(1-v);
 return[X,-hang+.025*Math.sin(u*11+1)*(1-v)**3,.066+.021*Math.sin(PI*v)+(.022+.031*(1-v))*Math.sin(u*PI*8+.7*v)+.016*Math.cos(v*10+u*3),u*1.3,v*2.5]};
 grid(38,28,fn,'wool','#77806b');
 const q=[];for(let k=0;k<=22;k++)q.push(fn(k/22,0).slice(0,3));tube(q,.005,'wool','#a19979',5,31);
 for(let s of [-1,1]){const q=[];for(let j=0;j<=20;j++)q.push(fn(s<0?0:1,j/20).slice(0,3));tube(q,.004,'wool','#a19876',5,26)}
 for(let k=0;k<2;k++)tube([[-.056,-.076,.068],[-.032,-.119,.099],[.022,-.144,.094],[.074,-.161,.060]],.010-k*.003,'leather','#846547',6,13);
 ball(.016,-.142,.105,.018,.017,.006,'metal',C.brass,12,7)
 })
}
function hat(x,y,z){at(x,y,z,0,()=>{
 at(0,0,0,0,()=>{
 grid(42,7,(u,v)=>{let a=u*TAU,rx=.112+v*.088,rz=.094+v*.074;return[Math.cos(a)*rx,.026*(v*v)*Math.sin(a*2-.5)+.012*Math.cos(a)*v,Math.sin(a)*rz,u*2.1,v*.7]},'wool','#a48b61');
 grid(42,15,(u,v)=>{let a=u*TAU,r=(1-v*.23)*(1-.22*v**5),yy=v*.126-.022*v**4*Math.cos(a*2);return[Math.cos(a)*r*.116,yy,Math.sin(a)*r*.10,u*2,v*.8]},'wool','#a68c61');
 ball(0,.114,0,.088,.015,.076,'wool','#a68b61',24,8);
 grid(42,3,(u,v)=>{let a=u*TAU;return[Math.cos(a)*(.115-v*.003),.023+v*.027,Math.sin(a)*(.1-v*.003),u,v]},'leather','#72573e');
 },1.07,-.22)
})}
function entryBench(){
 at(-.588,0,3.255,PI,()=>{
 shadow(0,.002,.18,1.99,1.03);
 for(let x of [-.68,.68])for(let z of [.032,.306])turnedLeg(x,.002,z,.401,.042,C.edge);
 rounded(0,.418,.187,1.56,.074,.428,.016,'timber','#a67e53');box(0,.344,.359,1.432,.084,.053,'timber','#87603e');
 for(let j=0;j<3;j++)box(0,.111,.076+j*.109,1.411,.032,.099,'timber',C.edge);
 boot(-.496,.128,.189,.96,.19);boot(-.325,.128,.171,.96,-.091);
 pillow(.40,.493,.183,.612,.077,.343,'#8e9275','wool',-.018);
 satchel(-.449,.459,.164,.82,.12);
 rounded(0,1.648,.015,1.714,.177,.078,.018,'timber','#95714b');
 for(let x of [-.69,-.35,0,.35,.69]){rod([x,1.64,.048],[x,1.701,.154],.017,.022,'timber','#ad865b',12);ball(x,1.706,.159,.027,.025,.025,'timber','#a78259',13,7)}
 cloak(.015,1.709,.135);hat(-.642,1.705,.167);
 const rp=[];for(let j=0;j<=4*36;j++){const a=j*TAU/36;rp.push([.61+Math.sin(a)*(.097+.005*j/36),1.445+Math.cos(a)*(.245+.006*j/36),.093+.013*(j/36)+.008*Math.sin(2*a)])}tube(rp,.0105,'wool','#b19a73',7,160);
 for(let i=0;i<4;i++)torus(.615,1.591+i*.012,.118,.066-i*.005,.0055,'leather','#876344',PI/2,0,0,20);
 solid(0,.187,1.57,.436,0,'shoe bench')
 });
 /* A key for the stair door, hanging within reach. */
 at(.565,1.52,3.286,PI,()=>{box(0,0,0,.104,.141,.033,'timber',C.edge);rod([0,.016,.02],[0,.024,.07],.006,.007,'metal',C.brass,9);
 torus(0,-.009,.066,.029,.005,'metal','#ae925a',0,0,0,18);rod([0,-.036,.067],[0,-.108,.067],.0055,.0055,'metal',C.brass,9);box(.009,-.096,.068,.024,.015,.011,'metal',C.brass)})
}
function firewood(){
 at(-2.996,0,2.936,-.19,()=>{
 shadow(0,.001,0,.75,.70);basket(0,.003,0,.243,.30,'#987a52');
 const rings=(x,y,z,r,col)=>{const pts=[];for(let j=0;j<=18;j++){let a=j/18*TAU,rr=r*(.98+.06*Math.sin(a*3));pts.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr,z])}tube(pts,.0018,'timber',col,4,19,true)};
 for(let k=0;k<7;k++){const x=(k%3-1)*.112+rnd(-.019,.019),y=.219+Math.floor(k/3)*.088+(k%3)*.009,z=rnd(-.029,.029),r=rnd(.043,.061),len=rnd(.319,.41);
 at(x,y,z,rnd(-.21,.21),()=>{cyl(0,0,0,r,r*1.06,len,'timber','#66523b',10,PI/2);cyl(0,0,len/2+.002,r*.95,r*.95,.006,'timber','#bd9a69',10,PI/2);
 rings(0,0,len/2+.0053,r*.63,'#977a51');rings(.004,0,len/2+.0053,r*.36,'#a18155');rod([0,.001,len/2+.005],[r*.82,r*.17,len/2+.005],.0018,.0012,'timber','#7a6143',4)},rnd(-.19,.14),rnd(-.27,.27))}
 solid(0,0,.49,.49,0,'log basket')
 })
}
function mountAxe(){
 at(-3.995,1.86,-.40,PI/2,()=>{
 const pts=[[-.325,-.216,.108],[-.12,-.069,.125],[.15,.145,.13],[.29,.238,.125]];
 tube(pts,.019,'timber','#b28a5b',10,28);
 rod([-.325,-.216,.108],[-.382,-.259,.103],.017,.005,'metal','#827c6c',9);
 poly([[.277,.21,.13],[.311,.255,.13],[.443,.218,.13],[.483,.203,.13],[.441,.197,.13],[.361,.208,.13],[.299,.217,.13],[.211,.318,.13],[.163,.345,.13],[.189,.289,.13]],'metal','#8b8b77');
 rod([.288,.215,.132],[.316,.245,.132],.022,.022,'metal',C.iron,10);
 for(let [x,y] of [[-.22,-.15],[.19,.174]]){rod([x,y,.012],[x,y,.148],.009,.009,'iron',C.iron,8);rod([x,y,.148],[x,y+.028,.148],.009,.009,'iron',C.iron,8)}
 tube([[.14,.153,.139],[.09,.03,.143],[.012,-.034,.14],[-.045,.004,.141],[.052,.087,.142]],.005,'leather','#947049',6,19)
 })
}
function pendant(){at(-.72,0,1.08,0,()=>{
 /* Adjustable oil pendant, suspended directly from the cross beam. */
 cyl(0,2.901,0,.06,.045,.026,'metal','#8b7755',24);torus(0,2.857,0,.031,.005,'iron',C.iron);
 for(let i=0;i<5;i++)torus(0,2.822-i*.039,0,.027,.005,'iron','#6e6757',0,(i%2)*PI/2,0,14);
 torus(0,2.629,0,.040,.006,'metal',C.brass,0,0,0,20);
 for(let a of [0,TAU/3,2*TAU/3]){
 let dx=Math.cos(a),dz=Math.sin(a);rod([dx*.021,2.601,dz*.021],[dx*.179,2.417,dz*.179],.004,.004,'metal',C.brass,7);
 tube([[dx*.178,2.416,dz*.178],[dx*.163,2.345,dz*.163],[dx*.110,2.259,dz*.11],[dx*.066,2.217,dz*.066]],.0065,'metal','#ad935f',7,13)
 }
 lathe(0,2.132,0,[[.001,0],[.038,.001],[.044,.014],[.041,.029],[.067,.034],[.089,.056],[.094,.076],[.086,.097],[.057,.106],[.045,.118],[.056,.128],[.057,.139]],'metal','#af8a53',32);
 lathe(0,2.263,0,[[.036,0],[.041,.027],[.051,.064],[.046,.093],[.032,.125],[.025,.2],[.032,.219],[.029,.224]],'glass','#f1dfb2',28);
 ball(0,2.316,0,.019,.040,.019,'warm','#fff0bc',12,8);
 const shape=[[.060,0],[.077,-.005],[.098,-.026],[.15,-.052],[.197,-.078],[.21,-.081],[.213,-.087]];
 lathe(0,2.498,0,shape,'glaze','#687c69',36);
 lathe(0,2.495,0,shape.map(([r,h])=>[r-.002,h]),'glaze','#dbcea6',36);
 torus(0,2.411,0,.211,.006,'metal','#b3955d',PI/2,0,0,36)
})}
function mendingChest(){at(3.413,0,-1.955,-PI/2,()=>{
 shadow(0,.001,.230,1.63,.90);
 for(let x of [-.454,.454])for(let z of [.070,.400])rounded(x,.052,z,.107,.105,.102,.009,'timber',C.edge);
 rounded(0,.284,.231,1.15,.397,.461,.024,'timber','#737965',0,0,0,3);
 for(let i=0;i<3;i++)box(0,.169+i*.113,.469,1.09,.108,.025,'timber',tint('#77826d',.072));
 rounded(0,.508,.230,1.19,.085,.491,.016,'timber','#927b55');
 for(let s of [-1,1]){box(s*.386,.283,.491,.042,.356,.011,'metal','#797968');box(s*.388,.516,.474,.043,.063,.015,'metal','#797968');
 box(s*.388,.553,.228,.043,.008,.461,'metal','#8c8871');
 for(let y of [.13,.289,.447,.52])ball(s*.385,y,.5,.006,.006,.005,'metal','#ab9c76',8,5);
 rounded(s*.58,.289,.232,.014,.104,.137,.006,'metal','#7a7966');
 let x=s*.599;tube([[x,.315,.177],[x+s*.025,.270,.177],[x+s*.026,.254,.227],[x+s*.023,.269,.285],[x,.315,.287]],.008,'metal','#8e896e',7,17)}
 box(0,.445,.491,.092,.124,.015,'metal','#a5956e');box(0,.487,.503,.057,.102,.015,'metal','#a08d65');torus(0,.453,.516,.018,.004,'metal',C.iron,0,0,0,14);
 for(let j=0;j<2;j++)rounded(-.306,.580+j*.051,.206,.432,.057,.305,.019,'wool',j?'#9c8a6a':'#b4a389',0,j*.038,0,3);
 /* A darning basket on the trunk lid, where the afternoon light reaches. */
 basket(.25,.552,.232,.14,.145,'#af9064');
 for(let [x,y,z,col,rr] of [[.188,.696,.212,'#9e714e',.059],[.284,.713,.206,'#888f72',.064],[.235,.694,.282,'#c6b895',.055]]){
 ball(x,y,z,rr,rr*.93,rr,'wool',col,18,12);
 for(let k=0;k<7;k++){const a=-.79+k*.236,rad=rr*Math.sqrt(1-a*a)*1.011;torus(x+a*rr,y,z,rad,.0023,'wool',tint(col,.11),0,PI/2,0,24)}
 }
 for(let i of [-1,1]){rod([.263,.658,.21],[.258+i*.065,.854,.192],.0021,.0024,'timber','#b29463',7);ball(.258+i*.065,.858,.192,.005,.006,.005,'timber','#bda573',8,5)}
 tube([[.260,.733,.254],[.309,.725,.274],[.365,.694,.301],[.385,.589,.325],[.428,.557,.342],[.462,.557,.309]],.0028,'wool','#9ca186',6,23);
 torus(-.307,.646,.220,.074,.0045,'timber',C.oakLight,PI/2,0,0,28);
 rod([-.341,.653,.274],[-.269,.652,.173],.0015,.001,'metal','#a6a592',6);
 solid(0,.23,1.20,.50,0,'mending chest')
})}
region('main',mendingChest);
region('entry',()=>{washstand();entryBench()});
region('hearthside',()=>{firewood();mountAxe();pendant()});
})(Room);
