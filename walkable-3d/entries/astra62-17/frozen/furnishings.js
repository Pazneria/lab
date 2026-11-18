(function(R){
'use strict';
const {T,PI,TAU,C,box,rounded,ball,lathe,torus,cyl,tube,rod,beam,panel,poly,grid,at,solid,story,shadow,rnd,pick,tint,frame}=R;
const {pillow,book,oilLamp,pottery,basket,sprigs,ropeCoil}=R.props;
function pull(x,y,z){for(let s of [-1,1]){cyl(x+s*.038,y,z,.013,.014,.011,'metal',C.brass,12,PI/2);rod([x+s*.038,y,z],[x+s*.038,y-.009,z+.023],.005,.005,'metal',C.brass)}tube([[x-.039,y-.009,z+.022],[x-.028,y-.037,z+.029],[x+.028,y-.037,z+.029],[x+.039,y-.009,z+.022]],.006,'metal','#a38c57',7,13)}
function turnedLeg(x,y,z,h,r,col=C.wood){
 lathe(x,y,z,[[.001,0],[r*.67,0],[r*.75,h*.045],[r*.66,h*.10],[r*.48,h*.14],[r*.59,h*.26],[r*.92,h*.58],[r*.82,h*.69],[r*.62,h*.73],[r*.64,h*.78],[r,h*.81],[r,h*.88],[r*.85,h*.92],[r*.85,h]],'timber',col,14)
}
function armchair(){
 at(-2.80,0,.48,1.29,()=>{
 shadow(0,.021,0,1.47,1.36);
 for(let x of [-.335,.335])for(let z of [-.323,.326])turnedLeg(x,.018,z,.249,.055,'#674c36');
 rounded(0,.286,0,.87,.155,.83,.029,'timber','#734d31');
 rounded(0,.347,.016,.876,.157,.837,.042,'leather','#74472f');
 for(let i=0;i<16;i++){const x=-.393+i*.052;ball(x,.328,.433,.007,.007,.004,'metal','#a0824c',8,5)}
 pillow(0,.466,.068,.706,.194,.694,'#a06a43','leather');
 /* Button-tufted back, with individually recessed buttons and curved shoulders. */
 const back=(u,v)=>{const X=(u-.5)*2,width=.403+.040*Math.sin(PI*v)-.019*v;
 const x=X*width,y=.451+.77*v-.061*X*X*v*v,z=-.318-.153*v+.078*X*X+.029*Math.sin(PI*v);
 let indent=0;for(let i=0;i<3;i++)for(let j=0;j<(i%2?4:3);j++){let ux=(j+(i%2?.56:1.06))/4.12,vy=.266+i*.245,dx=(u-ux)*.844,dy=(v-vy)*.76,dd=dx*dx+dy*dy;indent+=.051*Math.exp(-dd/.00165)+.011*Math.exp(-dd/.01)}
 const diagA=Math.abs(Math.sin(PI*((u-.015)*4.12+(v-.266)*2.04))),diagB=Math.abs(Math.sin(PI*((u-.015)*4.12-(v-.266)*2.04)));
 let folds=.009*Math.exp(-((diagA+diagB)*2.2));return[x,y,z-indent-folds,u*2,v*1.7]};
 grid(48,38,back,'leather','#945e3d',(x,y,z)=>.93+.07*Math.sin((y-.45)*3));
 grid(18,15,(u,v)=>{const p=back(1-u,v);return[p[0],p[1],p[2]-.095,u*2,v*2]},'leather','#805238');
 for(let s of [0,1])grid(4,20,(a,v)=>{const p=back(s,v);return[p[0]+(s?.012:-.012)*Math.sin(a*PI),p[1],p[2]-a*.096,a*.35,v*2]},'leather','#925d3c');
 grid(24,5,(u,v)=>{const p=back(u,1);return[p[0],p[1]+.018*Math.sin(PI*v),p[2]-.094*v,u*2,v*.26]},'leather','#ad7952');
 const edge=[];for(let j=0;j<=16;j++)edge.push(back(0,j/16).slice(0,3));for(let i=1;i<=20;i++)edge.push(back(i/20,1).slice(0,3));for(let j=15;j>=0;j--)edge.push(back(1,j/16).slice(0,3));tube(edge,.009,'leather','#bb8961',6,68);
 for(let i=0;i<3;i++)for(let j=0;j<(i%2?4:3);j++){const p=back((j+(i%2?.56:1.06))/4.12,.266+i*.245);ball(p[0],p[1],p[2]+.006,.016,.016,.009,'leather','#6d4430',12,6)}
 for(let s of [-1,1]){
 const fn=(a,t)=>{const q=a*TAU,k=.78+.22*Math.sin(t*PI*.85),cx=s*(.403+.031*t),cy=.575+.218*(1-t)**1.65,cz=-.397+.79*t;return[cx+.091*k*Math.cos(q),cy+.101*k*Math.sin(q),cz,a*1.6,t*1.95]};
 grid(28,17,fn,'leather','#a16a44',(x,y,z,nx,ny)=>.93+.29*Math.max(0,ny)*(.68+.32*Math.sin(5*z)));for(let t of [0,1]){const p=fn(0,t),x=s*(.403+.031*t),y=.575+.218*(1-t)**1.65;ball(x,y,p[2],.080,.091,.025,'leather','#98613e',20,12);let loop=[];for(let j=0;j<32;j++)loop.push(fn(j/32,t).slice(0,3));tube(loop,.005,'leather','#c08c62',6,32,true)}
 rounded(s*.401,.449,.002,.151,.227,.69,.049,'leather','#855438');
 tube([[s*.403,.397,-.27],[s*.438,.451,-.03],[s*.45,.47,.23],[s*.428,.515,.321]],.018,'timber','#835e3c',8,20);
 for(let j=0;j<7;j++)ball(s*.484,.452,-.257+j*.084,.006,.006,.006,'metal','#ad8b52',7,5)
 }
 solid(0,-.024,.99,.96,0,'leather chair')
 })
}
function runner(s){
 const nodes=[[-.775,.105],[-.695,.073],[-.51,.073],[.31,.073],[.57,.083],[.70,.105],[.80,.151],[.876,.232],[.918,.321],[.922,.377],[.902,.421],[.861,.43]];
 const X=s*.285;for(let i=0;i<nodes.length-1;i++){
 const [z,y]=nodes[i],[Z,Y]=nodes[i+1],x=X,w=.052,h=.05;
 poly([[x-w/2,y,z],[x+w/2,y,z],[x+w/2,Y,Z],[x-w/2,Y,Z]],'timber','#ac8154');
 for(let t of [-1,1])poly([[x+t*w/2,y-h,z],[x+t*w/2,Y-h,Z],[x+t*w/2,Y,Z],[x+t*w/2,y,z]],'timber','#b79563');
 poly([[x-w/2,y-h+.002,z],[x+w/2,y-h+.002,z],[x+w/2,Y-h+.002,Z],[x-w/2,Y-h+.002,Z]],'metal','#716c5d');
 for(let t of [-1,1])poly([[x+t*(w/2+.001),y-h-.001,z],[x+t*(w/2+.001),Y-h-.001,Z],[x+t*(w/2+.001),Y-h+.008,Z],[x+t*(w/2+.001),y-h+.008,z]],'metal','#807561')
 }
}
function teapot(x,y,z){
 at(x,y,z,-.48,()=>{
 lathe(0,0,0,[[.001,.001],[.069,.001],[.083,.009],[.087,.023],[.113,.047],[.126,.095],[.122,.138],[.106,.161],[.085,.174],[.083,.183],[.072,.183],[.073,.166]],'glaze','#517b76',32);
 torus(0,.035,0,.104,.0025,'glaze','#c2baa0',PI/2);
 lathe(0,.18,0,[[.001,0],[.083,0],[.086,.006],[.075,.012],[.048,.024],[.001,.030]],'glaze','#72918a',28);
 ball(0,.219,0,.023,.015,.023,'timber','#72563c',16,8);
 const p=[[-.08,.083,0],[-.136,.10,0],[-.166,.138,0],[-.188,.176,0],[-.213,.184,0]];for(let i=0;i<p.length-1;i++)rod(p[i],p[i+1],[.043,.036,.026,.021][i],[.036,.026,.021,.018][i],'glaze','#638c83',16);
 cyl(-.209,.183,0,.0135,.0135,.003,'iron','#574f3d',14,0,0,.98);
 tube([[.086,.149,0],[.151,.175,0],[.188,.147,0],[.181,.085,0],[.122,.054,0],[.093,.071,0]],.015,'glaze','#5f8177',10,29);
 })
}
function sledge(){
 at(-1.25,0,.63,-.235,()=>{
 shadow(0,.023,.01,1.15,2.15);
 runner(-1);runner(1);
 for(let x of [-.286,.286])for(let z of [-.49,.41]){
 beam([x,.066,z+.046],[x,.346,z-.03],.054,.057,'timber','#a78155');
 rounded(x,.088,z+.034,.075,.071,.081,.005,'metal','#807357');
 for(let k=0;k<3;k++)torus(x,.311+k*.012,z-.026,.044,.005,'leather','#88653d',PI/2,0,0,14);
 }
 for(let z of [-.54,-.03,.52])box(0,.344,z,.705,.062,.069,'timber','#8c6a47');
 for(let i=0;i<5;i++)rounded((i-2)*.133,.397,-.016,.13,.041,1.346,.009,'timber',tint('#b99160',.10));
 for(let s of [-1,1]){
 rounded(s*.349,.370,-.014,.041,.103,1.43,.009,'timber','#536e63');
 for(let z of [-.635,-.49,.42,.63])cyl(s*.374,.375,z,.015,.016,.009,'metal','#bf9c59',10,0,0,PI/2);
 at(s*.371,.371,-.006,s*PI/2,()=>panel(0,0,.002,.547,.077,'stencil'));
 }
 /* Rawhide webbing still ties the bent nose and rear stretcher together. */
 rod([-.286,.41,.871],[.286,.41,.871],.023,.023,'timber','#ad8556',14);
 for(let s of [-1,1]){tube([[s*.33,.413,.48],[s*.291,.337,.68],[s*.284,.36,.90],[s*.28,.415,.884]],.009,'leather','#896341',6,20);
 for(let j=0;j<4;j++){const x=s*(.22+j*.016);torus(x,.411,.868,.028,.005,'wool','#b89c6f',0,PI/2,0,12)}}
 for(let j=0;j<4;j++){let x=-.24+j*.14;rod([x,.399,.653],[x+.13,.409,.862],.0045,.0045,'leather','#bd9665',5);rod([x+.13,.398,.653],[x,.408,.862],.0045,.0045,'leather','#bd9665',5)}
 ropeCoil(0,.111,-.40,.13,3,'#a98b65');
 /* Domestic use: the restored deck holds a teapot and two cups. */
 cyl(.06,.425,-.24,.156,.16,.011,'timber','#976c47',36);
 for(let j=0;j<7;j++)torus(.06,.433,-.24,.145-j*.016,.0047,'wool','#bb9c6b',PI/2,0,0,32);
 teapot(.06,.439,-.233);
 at(-.127,.421,.11,-.09,()=>{cyl(0,.008,0,.090,.073,.014,'glaze','#c5c7ad',26);pottery(0,.017,0,.85,'cup','#78978c',.6)});
 book(.019,.447,.43,.247,.054,.31,'#84513c',.13);
 box(.001,.477,.43,.101,.003,.054,'paper','#d1bd93',0,.13,0);
 at(.194,.42,.075,-.4,()=>{for(let i=0;i<2;i++)rounded(0,.009+i*.014,0,.116,.015,.164,.005,'wool','#cfc19e');pottery(0,.035,0,.62,'cup','#d3c8aa',-.2)});
 solid(0,.048,.736,1.78,0,'sledge tea table');
 story(0,.42,.09,'Field sledge','Runner No. 04','Elin took the canvas off after the last crossing. The runners still hold their curve. These days the only thing that rattles on the way to the fire is the second cup.',2.1)
 })
}
function clothPoint(u,v,width,len,z0,ybase,extra,foot,variation=0){
 const a=(u-.5)*(width+2*extra),b=v*(len+foot),half=width*.5,ex=Math.max(0,Math.abs(a)-half),ez=Math.max(0,b-len),r=.055;
 const bend=q=>q<r*PI/2?[r*Math.sin(q/r),r*(1-Math.cos(q/r))]:[r,r+q-r*PI/2];
 const [ox,dx]=bend(ex),[oz,dz]=bend(ez);
 let x=Math.sign(a)*(Math.min(Math.abs(a),half)+ox),z=z0+Math.min(b,len)+oz;
 let f=.012*Math.sin(u*17+v*12+variation)+.008*Math.sin(v*28+u*9)+.006*Math.sin(u*34-v*15)+.004*Math.sin(v*50-u*7);
 let droop=Math.max(dx,dz)+.27*Math.min(dx,dz),y=ybase+f+.039*Math.max(0,1-(a/half)**2)*Math.sin(PI*(.21+.69*v))-droop;
 x+=Math.sign(a)*Math.min(1,ex/.09)*(.014*Math.sin(v*35+variation)+.007*Math.cos(v*18+2));z+=Math.min(1,ez/.08)*.016*Math.sin(u*30);
 y+=.008*Math.cos(v*31)*Math.min(1,ex/.10);return[x,y,z,u,v]
}
function bed(){
 at(-2.605,0,-1.875,0,()=>{
 const wid=1.51,len=2.16;shadow(0,0,0,2.13,2.76);
 for(let s of [-1,1]){
 box(s*.721,.365,0,.105,.205,2.12,'timber','#946d48');
 box(s*.754,.254,0,.043,.052,2.13,'timber','#6e5038');
 box(s*.746,.46,0,.065,.043,2.12,'timber','#aa8256')
 }
 for(let x of [-.745,.745])for(let z of [-1.054,1.052]){
 let ht=z<0?1.11:.676;rounded(x,ht/2,z,.106,ht,.106,.012,'timber',C.oak);
 cyl(x,ht+.024,z,.071,.074,.045,'timber',C.edge,14);lathe(x,ht+.045,z,[[.03,0],[.037,.012],[.031,.04],[.049,.065],[.047,.084],[.028,.111],[.001,.119]],'timber',C.oakLight,16)
 }
 box(0,.643,-1.06,1.44,.711,.084,'timber','#7e5c3f');for(let i=0;i<7;i++)rounded((i-3)*.197,.70,-1.007,.187,.515,.034,.014,'timber',tint('#9f7750',.11));
 rounded(0,1.012,-1.05,1.51,.079,.127,.015,'timber','#aa8050');box(0,.439,1.055,1.47,.187,.077,'timber',C.oak);
 for(let j=0;j<9;j++){box((j-4)*.15,.513,1.054,.086,.23,.059,'timber',tint('#906c47',.08))}
 rounded(0,.628,1.055,1.46,.064,.102,.012,'timber',C.oakLight);
 rounded(0,.489,0,1.43,.23,2.05,.082,'wool','#d8ccb0',0,0,0,4);
 const base=(u,v)=>clothPoint(u,v,1.41,1.47,-.505,.63,.22,.19);
 grid(50,48,(u,t)=>base(u,1-t),'blanket','#fcf4df');
 for(let u of [0,1]){const pts=[];for(let j=0;j<=34;j++)pts.push(base(u,j/34).slice(0,3));tube(pts,.009,'wool','#85866c',6,55)}
 let fold=[];for(let i=0;i<=38;i++){const p=base(i/38,0);fold.push([p[0],p[1]+.004,p[2]])}tube(fold,.017,'wool','#b3b49a',8,52);
 pillow(-.30,.68,-.736,.68,.203,.425,'#dfd2b2','wool',.036,-.12,-.035);
 pillow(.334,.676,-.718,.627,.183,.41,'#c5c3a5','wool',-.094,-.13,.022);
 const throwP=(u,v)=>{let p=clothPoint(u,v,1.45,.44,.31,.695,.312,0,1.9);p[2]+=(u-.5)*.11+.011*Math.sin(u*17);p[1]+=.014*Math.sin(v*15+u*4);return p};
 grid(48,19,(u,t)=>throwP(u,1-t),'throw','#f7ecd4');
 for(let u of [0,1])for(let j=0;j<34;j++){const p=throwP(u,j/33);rod(p.slice(0,3),[p[0]+(u?.009:-.009)+rnd(-.008,.008),p[1]-rnd(.043,.077),p[2]+rnd(-.007,.009)],.0031,.0017,'wool','#c7b99b',5)}
 solid(0,0,1.60,2.23,0,'bed')
 })
}
function nightstand(){
 at(-1.146,0,-2.57,.015,()=>{
 shadow(0,0,0,.95,.75);
 for(let x of [-.256,.256])for(let z of [-.182,.182])turnedLeg(x,0,z,.175,.043,C.wood);
 rounded(0,.372,0,.59,.47,.405,.015,'timber','#846341');rounded(0,.632,0,.65,.063,.472,.014,'timber','#ad8456');
 for(let j=0;j<2;j++){rounded(0,.266+j*.205,.214,.516,.176,.036,.009,'timber',tint('#9d774c',.06));box(0,.265+j*.205,.237,.42,.109,.012,'timber','#93704c');pull(0,.275+j*.205,.247)}
 oilLamp(-.124,.665,-.027,.88);book(.143,.686,.014,.189,.043,.228,'#626b59',-.06);book(.141,.721,.003,.184,.029,.214,'#926848',.07);
 solid(0,0,.67,.48,0,'bedside chest')
 })
}
function rug(){
 at(-1.78,0,.78,-.038,()=>{
 box(0,.01,0,3.55,.02,2.44,'wool','#825440');panel(0,.021,0,3.55,2.44,'rug','#ffffff',-PI/2);
 for(let x of [-1.775,1.775])for(let j=0;j<119;j++){let z=-1.204+j*.0204,len=rnd(.035,.068);rod([x,.013,z],[x+Math.sign(x)*len,.009,z+rnd(-.005,.005)],.0044,.0032,'wool',tint('#bcac88',.12),4)}
 })
}
function footstool(){at(-2.57,0,1.62,.28,()=>{
 shadow(0,.024,0,.84,.62);
 for(let x of [-.22,.22])for(let z of [-.13,.13])turnedLeg(x,.021,z,.211,.036);
 rounded(0,.23,0,.55,.079,.346,.017,'timber',C.edge);
 pillow(0,.298,0,.564,.128,.359,'#a49572','wool');
 solid(0,0,.56,.37,0,'footstool')
})}
function curtains(){
 at(3.416,0,-.145,-PI/2,()=>{
 rod([-1.00,2.62,.103],[1.00,2.62,.103],.018,.018,'metal','#8e7652',14);
 for(let s of [-1,1]){
 ball(s*1.027,2.62,.103,.038,.029,.029,'metal',C.brass,14,8);
 /* The middle gathers around a braided tie. */
 const fabric=(u,v)=>{let w=.36-.23*Math.exp(-(((v-.47)/.125)**2)),bend=.108*Math.sin(PI*v);
 return[s*(.839-w*.5+w*u+bend),.305+2.25*v+.020*Math.cos(u*PI*8)*((1-v)**8),.153+.045*Math.sin(u*PI*9+.36*Math.sin(v*7))*(w/.36)+.046*(1-v),u*.89,v*4.1]};
 grid(33,23,fabric,'wool',s===1?'#be9b70':'#c4a57a');
 for(let j=0;j<6;j++){const p=fabric(j/5,1);torus(p[0],2.596,.102,.028,.004,'metal',C.brass,0,PI/2,0,14)}
 let p=fabric(.5,.47);tube([[p[0]-s*.09,p[1]+.014,.139],[p[0]-s*.04,p[1]-.013,.209],[p[0]+s*.067,p[1]-.018,.196],[s*1.01,p[1]+.039,.064]],.009,'wool','#957747',6,15);
 tube([[p[0]+s*.043,p[1]-.016,.198],[p[0]+s*.07,p[1]-.113,.196],[p[0]+s*.042,p[1]-.194,.21]],.005,'wool','#b29661',6,13);
 cyl(p[0]+s*.042,p[1]-.224,.21,.009,.024,.059,'wool','#ad905b',12)
 }})
}
R.region('main',()=>{
 rug();R.region('bed',()=>{bed();nightstand()});R.region('hearthside',()=>{armchair();sledge();footstool()});curtains();
 frame(-2.629,1.99,-2.952,1.419,1.06,'summitPrint',0,'#674d35');
 frame(-1.377,1.85,-2.95,.389,.482,'mara',0,'#8a6847');frame(-.904,1.90,-2.950,.389,.482,'arden',0,'#795a42');
 story(-1.14,1.86,-2.91,'The expedition portraits','Two places at tea','Mara used to mend the traces. Arden made the maps. Elin still sets out the blue cup when either of them comes up the stairs.',2.1)
});
Object.assign(R.props,{pull,turnedLeg});
})(Room);
