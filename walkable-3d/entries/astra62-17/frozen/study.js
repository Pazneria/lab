(function(R){
'use strict';
const {T,PI,TAU,C,at,box,rounded,cyl,ball,lathe,torus,rod,beam,tube,panel,poly,grid,solid,story,shadow,rnd,pick,tint,canvasMat,frame}=R;
const {pottery,oilLamp,book,pillow,basket,ropeCoil,sprigs,pull,turnedLeg,scaleAt}=R.props;
const {rect,path,bez,oval,txt,line,fleck}=R.art;
canvasMat('botanical',480,650,(c,w,h)=>{
 rect(c,0,0,w,h,'#ddcfac');c.strokeStyle='#9a8d70';c.lineWidth=1.8;c.strokeRect(18,18,w-36,h-36);
 txt(c,'HERBARIUM  /  VESPER',36,51,15,'#686851','monospace');txt(c,'12',441,53,18,'#72694f','Georgia','right');line(c,[[36,64],[443,64]],'#9b9073',1);
 function stem(x,y,dx,dy,scale){bez(c,[[x,y],[x+dx*.35-11,y+dy*.45,x+dx*.65+4,y+dy*.73,x+dx,y+dy]],null,'#777954',2.3*scale);
 for(let j=1;j<=7;j++){const t=j/8,xx=x+t*dx-7*Math.sin(t*PI),yy=y+t*dy,dir=j%2?1:-1,sz=(29-14*t)*scale;
 bez(c,[[xx,yy],[xx+dir*sz*.35,yy-sz*.83,xx+dir*sz*1.42,yy-sz],[xx+dir*sz*1.06,yy+sz*.03,xx,yy]],j%3?'#848264':'#92916c','#697458',1);line(c,[[xx,yy],[xx+dir*sz*1.14,yy-sz*.83]],'#b0a77a',.9)}
 const xx=x+dx,yy=y+dy;for(let n=0;n<5;n++){let a=n*TAU/5+.3;oval(c,xx+Math.cos(a)*8*scale,yy+Math.sin(a)*8*scale,8*scale,5.8*scale,'#a98c89',a);line(c,[[xx,yy],[xx+Math.cos(a)*12*scale,yy+Math.sin(a)*12*scale]],'#876e72',.7)}oval(c,xx,yy,4*scale,4*scale,'#a6915f')}
 stem(242,491,-77,-276,1.18);stem(244,489,42,-329,1.18);stem(245,489,98,-193,1.03);stem(238,485,-127,-156,.97);
 line(c,[[225,489],[261,490]],'#8f7654',7);line(c,[[218,408],[261,410]],'#a98d68',5);rect(c,225,401,24,12,'#c5b48a');
 txt(c,'Saxifraga oppositifolia',240,549,29,'#505645','Georgia','center','italic');txt(c,'PURPLE SAXIFRAGE',240,578,15,'#686650','monospace','center');txt(c,'North saddle, near the melt line.  E.V.',240,614,15,'#736c56','Georgia','center','italic');fleck(c,w,h,3500,['#685d4c25','#f1e3c91a'])
});
canvasMat('compassFace',192,192,(c,w,h)=>{
 rect(c,0,0,w,h,'#d3c39b');for(let j=0;j<60;j++){c.save();c.translate(96,96);c.rotate(TAU*j/60);line(c,[[0,-85],[0,j%5?-80:-72]],'#585b4d',j%5?1.5:3);c.restore()}
 for(let j=0;j<8;j++){c.save();c.translate(96,96);c.rotate(j*PI/4);path(c,[[0,-58],[-8,0],[0,12]],j%2?'#8d8e72':'#5c665b');path(c,[[0,-58],[8,0],[0,12]],'#aaa485');c.restore()}
 for(let [s,x,y] of [['N',96,40],['S',96,165],['W',32,101],['E',161,101]])txt(c,s,x,y,18,'#484d43','Georgia','center')
});
function compass(x,y,z,scale=1){scaleAt(x,y,z,scale,-.23,()=>{
 cyl(0,.012,0,.057,.052,.024,'metal',C.brass,32);cyl(0,.026,0,.051,.052,.008,'glaze','#cabc96',32);
 /* The square printing plate is inset below the circular bezel. */
 panel(0,.0305,0,.0705,.0705,'compassFace','#ffffff',-PI/2);torus(0,.031,0,.051,.005,'metal','#ba9b5a',PI/2);
 poly([[-.006,.034,0],[.014,.034,-.038],[.006,.034,.002]],'metal','#8d4c36');poly([[.006,.034,0],[-.014,.034,.038],[-.006,.034,0]],'metal','#515b55');ball(0,.035,0,.006,.003,.006,'metal',C.brass,9,5);torus(0,.015,-.068,.015,.003,'metal',C.brass,PI/2)
})}
function scroll(x,y,z,r,len,col,vertical=false,yaw=0){
 at(x,y,z,yaw,()=>{at(0,0,0,0,()=>{
 cyl(0,0,0,r,r*.975,len,'paper',col,19);
 for(let j=0;j<2;j++)cyl(0,(j-.5)*len*.52,0,r+.0018,r+.0018,.016,'leather','#986c44',18);
 for(let s of [-1,1]){cyl(0,s*(len*.5+.001),0,r*.82,r*.82,.002,'paper','#b8a17a',20);
 let pts=[];for(let j=0;j<55;j++){const a=j/54*TAU*2.35,rr=r*(.12+.78*j/54);pts.push([Math.cos(a)*rr,s*(len*.5+.003),Math.sin(a)*rr])}tube(pts,.0018,'paper','#89795c',4,60)}
 },vertical?0:PI/2)})
}
function bookRow(x,y,z,n,maxw=.80){
 const cols=['#4f6257','#80563e','#966f45','#6e5443','#a28960','#586f70','#685449','#817956'];let cur=x,ws=Array.from({length:n},()=>rnd(.045,.103)),sum=ws.reduce((a,b)=>a+b,0);
 for(let i=0;i<n;i++){let w=ws[i]*maxw/sum,h=rnd(.215,.343),d=rnd(.164,.222);at(cur+w/2,y+h/2,z,0,()=>{
 const cc=pick(cols);rounded(0,0,0,w,h,d,.006,'leather',cc,0,0,0,1);box(0,0,d*.5+.0006,w*.70,h*.89,.003,'leather',tint(cc,.08));
 for(let t of [-.34,-.28,.24,.32])box(0,h*t,d/2+.003,w*.85,.004,.006,'metal','#b49c69');box(0,h*.087,d/2+.003,w*.55,.027,.005,'paper','#bda579');
 box(0,h/2+.001,-.005,w-.012,.004,d-.021,'paper','#c8b48d')
 });cur+=w+.005}
}
function satchel(x,y,z,s,yaw=0){scaleAt(x,y,z,s,yaw,()=>{
 rounded(0,.191,0,.43,.381,.211,.065,'leather','#9c6e48',0,0,0,4);
 rounded(0,.246,.053,.425,.254,.15,.044,'leather','#94613f',-.06,0,0,3);
 const pts=[[-.17,.284,.14],[-.185,.214,.142],[-.146,.15,.148],[-.039,.128,.152],[.132,.139,.148],[.185,.172,.145],[.189,.247,.141]];tube(pts,.0045,'leather','#c6996d',6,28);
 for(let q of [-1,1]){rounded(q*.119,.193,.151,.034,.225,.013,.003,'leather','#735238');for(let zc of [-1,1]){box(q*.119+zc*.024,.18,.163,.006,.052,.007,'metal',C.brass);box(q*.119,.18+zc*.024,.163,.05,.006,.007,'metal',C.brass)}box(q*.119,.181,.17,.004,.033,.004,'metal',C.brass);
 for(let j=0;j<3;j++)ball(q*.119,.107+j*.017,.161,.003,.003,.001,'iron',C.iron,6,4)}
 tube([[-.15,.367,.003],[-.106,.422,-.005],[.044,.43,-.006],[.129,.388,0]],.011,'leather','#745138',8,23);
 tube([[-.20,.323,0],[-.254,.242,-.007],[-.242,.089,.069],[-.179,.014,.113],[-.056,.012,.107]],.013,'leather','#79573c',7,24)
})}
function lens(x,y,z){at(x,y,z,-.58,()=>{
 torus(0,.023,0,.052,.006,'metal','#b59555',PI/2,0,0,30);cyl(0,.023,0,.049,.049,.005,'glass','#cddbc8',28);
 rod([0,.021,.053],[0,.016,.085],.008,.007,'metal',C.brass);rod([0,.016,.081],[0,.016,.177],.010,.013,'timber','#79593a',12);ball(0,.016,.177,.014,.014,.014,'timber',C.edge,12,7)
})}
function envelope(x,y,z){at(x,y,z,-.08,()=>{
 box(0,.002,0,.199,.004,.124,'paper','#d8c7a3');
 poly([[-.098,.0048,-.06],[.095,.0048,-.061],[.005,.005,.009]],'paper','#e6d4b1');
 for(let s of [-1,1]){rod([s*.097,.006,-.061],[.005,.006,.009],.0014,.001,'paper','#a79473',5);rod([s*.096,.006,.06],[s*.025,.006,.008],.001,.001,'paper','#b29e7e',5)}
 cyl(.003,.008,.005,.016,.019,.007,'glaze','#9a4e3d',13);torus(.003,.012,.005,.011,.0012,'glaze','#713f31',PI/2,0,0,14);
 rod([-.002,.013,.001],[.003,.013,.009],.001,.001,'glaze','#794435',4);rod([.003,.013,.009],[.008,.013,.001],.001,.001,'glaze','#794435',4)
})}
function desk(){
 at(1.983,0,-4.915,0,()=>{
 shadow(0,0,0,2.70,1.15);
 for(let x of [-.928,.928])for(let z of [-.258,.258])turnedLeg(x,.002,z,.751,.057,'#815c3d');
 box(0,.618,-.247,1.90,.182,.076,'timber',C.wood);for(let s of [-1,1])box(s*.926,.637,0,.067,.18,.544,'timber',C.edge);
 beam([-.925,.167,-.249],[.925,.167,-.249],.051,.064,'timber',C.edge);
 for(let s of [-1,1])beam([s*.926,.181,-.24],[s*.926,.181,.24],.051,.05,'timber',C.edge);
 rounded(0,.787,0,2.10,.102,.684,.016,'timber','#a0794f');box(0,.733,.009,2.01,.038,.65,'timber',C.edge);
 let sections=[[-.686,.48],[.025,.87],[.744,.44]];for(let [x,w] of sections){rounded(x,.657,.28,w,.126,.079,.009,'timber',tint('#946c46',.07));pull(x,.662,.33)}
 /* A leather blotter, folded chart, lens, graphite and dividers. */
 rounded(-.094,.844,.007,.995,.011,.585,.005,'leather','#746b52',0,-.035,0);
 at(-.113,.853,.021,.077,()=>{grid(23,17,(u,v)=>{const x=(u-.5)*.729,z=(.5-v)*.476,fold=.004*Math.exp(-(((u-.332)/.034)**2))+.005*Math.exp(-(((u-.668)/.035)**2)),edge=.013*Math.pow(Math.abs(2*u-1),12)*(.65+.35*Math.sin(v*11));return[x,.004+fold+edge+.002*Math.sin(v*9+u*4),z,u,v]},'map','#fff5de')});
 compass(-.405,.872,-.102,.87);lens(.135,.870,.137);
 for(let s of [-1,1])rod([.404,.853,-.123],[.439+s*.045,.853,.055],.006,.0022,'metal',C.brass,8);
 ball(.404,.853,-.123,.014,.005,.015,'metal',C.brass,12,6);
 rod([-.549,.854,.212],[-.668,.854,.08],.0044,.0039,'timber','#5b6250',6);rod([-.668,.854,.08],[-.677,.854,.07],.004,.0007,'timber','#b29466',7);
 oilLamp(.787,.839,-.126,1.04);envelope(.690,.84,.19);
 book(-.776,.87,-.076,.279,.063,.314,'#5b6c63',.09);book(-.79,.919,-.086,.245,.034,.29,'#9d8057',.036);
 const inkX=-.678;lathe(inkX,.839,.16,[[.001,0],[.037,0],[.044,.009],[.045,.05],[.030,.06],[.024,.068],[.025,.08],[.018,.08]],'glaze','#4f645d',16);
 rod([inkX,.899,.158],[inkX-.036,1.082,.116],.002,.003,'timber','#8d6b47',8);
 const feather=[[inkX-.034,1.046,.126],[inkX-.078,1.096,.125],[inkX-.096,1.17,.127],[inkX-.073,1.15,.125],[inkX-.061,1.159,.127],[inkX-.037,1.102,.126]];poly(feather,'wool','#c6baa2');
 solid(0,0,2.11,.689,0,'survey desk');story(.014,.86,.02,'The field copy','A way back','The red line crosses the saddle twice. Elin added the lower route years later, after a letter arrived from a guide who still worked the pass.',2.02);
 story(.69,.87,.19,'Sealed letter','Still sealed','The seal is Mara’s. Elin has set the kettle on first.',1.21)
 })
}
function studyStool(){at(1.526,0,-4.103,-.21,()=>{
 shadow(0,.002,0,.76,.72);
 for(let j=0;j<3;j++){const a=j*TAU/3+.3;
 rod([Math.cos(a)*.219,.005,Math.sin(a)*.219],[Math.cos(a)*.136,.453,Math.sin(a)*.136],.023,.032,'timber',C.oak,12);
 let b=a+TAU/3;rod([Math.cos(a)*.186,.168,Math.sin(a)*.186],[Math.cos(b)*.186,.168,Math.sin(b)*.186],.015,.015,'timber',C.edge,10)}
 lathe(0,.419,0,[[.001,0],[.199,0],[.227,.015],[.232,.04],[.218,.056],[.001,.058]],'timber','#a78056',32);
 pillow(0,.497,0,.407,.065,.383,'#888c6f','wool');solid(0,0,.46,.46,0,'map stool')
})}
function studyShelves(){
 at(.493,0,-4.043,PI/2,()=>{
 const w=1.515,d=.301;
 for(let s of [-1,1]){rounded(s*(w/2-.033),1.08,.157,.067,2.16,d,.011,'timber','#8b6949');box(s*(w/2-.031),2.14,.16,.112,.093,.324,'timber',C.edge)}
 for(let y of [.145,.642,1.09,1.54,2.07]){
 rounded(0,y,.153,w,.054,d+.023,.008,'timber',tint('#976e46',.1));box(0,y-.028,.31,w,.034,.035,'timber',C.wood)}
 for(let z of [.029]){box(0,.424,z,w-.09,.046,.04,'timber',C.wood);box(0,1.828,z,w-.09,.055,.04,'timber',C.wood)}
 /* A carrier bag, maps in tubes, survey volumes and the packed camp blanket. */
 satchel(-.367,.173,.177,.98,-.07);
 scaleAt(.185,.173,.153,.66,.03,()=>{basket(0,0,0,.266,.374);for(let j=0;j<5;j++){let x=rnd(-.105,.105),z=rnd(-.07,.07);scroll(x,.37,z,.047,rnd(.31,.45),'#d6c19c',true,rnd(-.1,.1))}});
 bookRow(-.672,.670,.167,6,.504);
 for(let j=0;j<3;j++){let y=.710+j*.075;book(.088,y,.166,.29,.074,.242,pick(['#917653','#74604d','#577067']),rnd(-.05,.05))}
 lathe(.469,.67,.137,[[.001,0],[.072,0],[.075,.027],[.068,.042],[.066,.319],[.078,.325],[.076,.363],[.001,.365]],'leather','#88633f',18);
 for(let y of [.71,.944,1.002])torus(.469,y,.137,.070,.0048,'metal','#a28b58',PI/2);
 for(let j=0;j<5;j++){let x=-.49+(j%3)*.112,y=1.166+Math.floor(j/3)*.081;scroll(x,y,.175,.047+rnd(0,.008),.297,'#d8c29c',false,-.055+j*.029)}
 for(let j=0;j<3;j++){rounded(.331,1.171+j*.099,.16,.531,.094,.239,.029,'wool',['#a29473','#89917a','#c3b696'][j],0,j*.035,0,3);box(.331,1.172+j*.099,.282,.45,.006,.007,'wool','#b3a589')}
 bookRow(-.648,1.57,.169,7,.635);
 pottery(.318,1.57,.16,.84,'jar','#8b7253');pottery(.57,1.57,.18,.50,'jug','#a08b69',.4);
 book(-.335,2.114,.152,.46,.035,.242,'#78654b',.013);book(-.332,2.151,.149,.378,.041,.232,'#616b59',-.025);
 ropeCoil(.316,2.099,.138,.120,3);
 solid(0,.153,w,d+.048,0,'field shelves')
 })
}
function board(){
 at(2.077,1.744,-5.20,0,()=>{
 rounded(0,0,0,1.23,.77,.056,.013,'timber','#7c5c40');box(0,0,.030,1.16,.70,.024,'wool','#a49b7b');
 at(-.192,.006,.055,-.009,()=>{panel(0,0,0,.687,.473,'map','#eee0bd',0,0,-.046);for(let s of [-1,1])for(let k of [-1,1])ball(s*.307,k*.202,.006,.008,.008,.005,'metal',C.brass,8,5)});
 panel(.34,.069,.052,.275,.369,'botanical','#e3d6b8',0,0,.047);
 box(.366,-.196,.059,.274,.116,.004,'paper','#cec2a2',0,0,.085);
 for(let j=0;j<4;j++)box(.358,-.166-j*.018,.063,.187-j*.018,.0027,.001,'paper','#92876e',0,0,.04);
 for(let p of [[.341,.238],[.365,-.145]])ball(p[0],p[1],.071,.01,.01,.008,'metal',C.brass,10,6);
 for(let s of [-1,1])rod([s*.51,.38,-.007],[0,.559,-.016],.0027,.0027,'wool','#8f7b59',5);
 });
}
R.region('study',()=>{desk();studyStool();studyShelves();board()});
Object.assign(R.props,{scroll,bookRow,satchel,compass});
})(Room);
