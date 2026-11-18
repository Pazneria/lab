'use strict';
const Annex = (() => {
 const {PI,TAU,rand,pick,shade,blend,M,at,area,box,cyl,rod,beam,tube,ring,blob,face,contact,collider,sign}=G;
 const {post,panel,peg,notice,iron,oak,wood,pale,dark,paint}=Yard,{pot}=Ceramics;
 function diskZ(x,y,z,r,t,c,m=M.iron,n=24){
   rod([x,y,z-t/2],[x,y,z+t/2],r,c,m,n);
 }
 function bolt(x,y,z,r=.019){
   diskZ(x,y,z,r*1.38,.006,'585a50',M.iron,14);diskZ(x,y,z+.008,r,.015,'77796c',M.iron,6);
 }
 function pail(x,y,z,r,h,color,fill,label,handle=true){
   at(x,y,z,0,()=>{
     const s=32,outer=[],inner=[];
     for(let j=0;j<s;j++){const a=TAU*j/s,c=Math.cos(a),sn=Math.sin(a);
       outer.push([[r*.82*c,.015,r*.82*sn],[r*c,h,r*sn]]);inner.push([[(r*.82-.004)*c,.024,(r*.82-.004)*sn],[(r-.005)*c,h-.004,(r-.005)*sn]]);}
     for(let j=0;j<s;j++){let k=(j+1)%s;
       face([outer[j][0],outer[j][1],outer[k][1],outer[k][0]],color,M.paint);
       face([inner[k][0],inner[k][1],inner[j][1],inner[j][0]],shade(color,.72),M.paint);
     }
     cyl(0,.021,0,r*.828,r*.816,.013,shade(color,.74),M.paint,s);
     for(const [yy,rr,sz] of [[.018,.824,.005],[h*.22,.862,.003],[h*.72,.956,.003],[h,1,.007]])ring(0,yy,0,r*rr,sz,shade(color,.84),M.iron,32);
     if(fill){const water=.61; cyl(0,h*water,0,r*(.82+.18*water)-.003,r*.88,.003,fill,M.satin,36);}
     if(handle){
       for(const a of [-1,1])blob(r*.978*a,h*.84,0,.012,.022,.018,'696f63',M.iron,.02,9);
       const pts=[];for(let i=0;i<=26;i++){const a=PI*i/26;pts.push([r*1.055*Math.cos(a),h*.84+Math.sin(a)*r*.93,.007+Math.sin(a)*r*.46]);}
       tube(pts,.004,'6d7467',M.iron,7);
       tube(pts.slice(11,17),.010,'a99570',M.wood,9);
     }
     if(label)sign(0,h*.48,r*.918+.001,r*1.05,h*.23,'bone',[label]);
     contact(0,0,0,r*1.27,r*1.26,.36);
   });
 }
 function scale(x,y,z){
   at(x,y,z,-.105,()=>{
     panel(0,.029,0,.328,.058,.337,'445b54',M.paint);
     box(0,.120,-.013,.246,.185,.224,'758775',M.paint,.023);
     cyl(0,.232,-.015,.039,.050,.087,'7f8575',M.iron,18);
     cyl(0,.285,-.018,.153,.098,.031,'a7a590',M.iron,30);ring(0,.30,-.018,.151,.004,'b1b4a6',M.iron,30);
     diskZ(0,.141,.113,.105,.051,'667369');diskZ(0,.141,.142,.094,.009,'ddd6bb');
     sign(0,.141,.148,.178,.178,'dial',['KG','MARL']);
   });
 }
 function samples(){
   // The tiles are individually dipped. Their rough clay shoulders remain visible.
   const w=2.66,h=.979;
   box(0,1.932,-.025,w,h,.055,'82785f',M.wood,.009);
   for(let i=0;i<13;i++)box(-w/2+(i+.5)*w/13,1.932,.009,w/13-.004,h-.044,.026,shade('a59d85',rand(.94,1.035)),M.wood);
   for(const s of [-1,1]){panel(0,1.932+s*(h/2-.022),.04,w,.05,.048,'82775e');post(s*(w/2-.018),1.932,.039,.043,h,.05,'82775e');}
   const colors=['b4c3aa','93b29e','698e87','497675','3c6364','38525c','344650','b8ad88','a49561','8e8b62','b6a07c','be9464','ad7c4e','8c6241','d4cdb6','d0c0a5','bc9c86','ad8371','9d7463','796561','5b5658'];
   for(let j=0;j<3;j++)for(let i=0;i<7;i++){
     const x=(i-3)*.361,yy=2.22-j*.294,id=j*7+i,w=.132+rand(-.009,.011),h=.184+rand(-.012,.012);
     const tilt=rand(-.064,.064),c=Math.cos(tilt),s=Math.sin(tilt),col=colors[id];
     G.basis([x,yy,.069],[c,s,0],[-s,c,0],[0,0,1],()=>{
       box(0,-.012,0,w,h,.018,'bb9675',M.clay,.006);
       // Shallow relief channels show how each glaze pools in texture.
       const top=.021+rand(-.02,.018);
       const pts=[[-w*.48,-h*.47-.007,.012],[w*.47,-h*.47-.007,.012],[w*.48,top+.005,.012],[w*.27,top-.001,.012],[w*.07,top+.003,.012],[-w*.23,top-.006,.012],[-w*.49,top,.012]];
       face(pts,col,M.gloss,[0,0,1],pts.map(p=>[p[0]*3,p[1]*3]));
       for(let k=0;k<3;k++){let xx=(k-1)*.021;tube([[xx-.006,-.031,.011],[xx,-.051,.014],[xx+.005,-.076,.012]],.0034,shade(col,.84+k*.036),M.gloss,6);}
       diskZ(0,h*.32,.012,.0075,.003,'635749',M.clay,10);
       tube([[0,h*.32,.017],[-.006,h*.45,.022],[.008,h*.58,.015],[.008,h*.64,-.026]],.0023,'9a815a',M.cloth,5);
       peg(.008,h*.56,.016,.006,'625d4b');
     });
     sign(x,yy-h*.55-.034,.034,.112,.032,'bone',[(j===0?'C':j===1?'A':'S')+'  '+String(i+1).padStart(2,'0')]);
   }
   notice(0,2.568,-.03,1.57,.191,'green',['GLAZE TESTS    /    CONE 6']);
 }
 function glazeRoom(){
   area('glaze-work',()=>{
     at(4.60,0,-6.52,-PI/2,()=>{
       const top=.937;Studio.table(3.69,.899,top,{color:'798475',topColor:'b8ae92',leg:.093,lower:.25});
       // Mixing casks below, mineral jars, balance, brushes and a slip sieve above.
       for(const [i,x] of [-1.41,-.77,.10,.80,1.42].entries()){
         if(i===2)Studio.crate(x,.279,.016,.61,.352,.64,-.025,'OXIDES');
         else pail(x,.28,.015,i===4?.156:.200,i===4?.259:.335,pick(['9b9e8f','a4a18a','a4ad9e']),null,['KAOLIN','SILICA','','FELDSPAR','ASH'][i],false);
       }
       scale(.09,top,.079);pail(-.59,top,.018,.132,.207,'b2b2a0','aeb8a0','SLIP');
       for(let j=0;j<24;j++){
         const a=rand(0,TAU),d=rand(.11,.22),r=rand(.002,.008);
         Studio.ellipse(-.59+Math.cos(a)*d,top+.0009,.018+Math.sin(a)*d,r,r*rand(.48,1.14),pick(['b9b69f','afb09a','c1baa5']),M.clay);
       }
       for(const [x,z,a,color] of [[-.82,.263,-.14,'668c81'],[-.650,.299,.12,'8c9c83']])at(x,top,z,a,()=>{
         box(0,.0045,0,.079,.009,.134,'bf9e7f',M.clay,.003);
         box(.0003,.0099,.018,.077,.0021,.092,color,M.gloss,.0004);
         Studio.ellipse(0,.010,-.047,.0043,.0043,'756958',M.clay);
       });
       const sieve=[-.57,top+.255,.004];ring(...sieve,.127,.006,'888b7a',M.iron,32);
       for(let i=-6;i<=6;i++){let v=i*.0175,len=Math.sqrt(.119*.119-v*v);
         rod([sieve[0]+v,sieve[1]-.002,sieve[2]-len],[sieve[0]+v,sieve[1]-.002,sieve[2]+len],.0011,'939785',M.iron,4);
         rod([sieve[0]-len,sieve[1],sieve[2]+v],[sieve[0]+len,sieve[1],sieve[2]+v],.0011,'939785',M.iron,4);}
       rod([-.451,top+.254,.004],[-.297,top+.263,.009],.007,'807b64',M.wood,8);
       for(const [x,z,h,r,label,cc] of [[-1.52,-.15,.198,.080,'IRON','9a795c'],[-1.28,-.18,.178,.074,'ASH','9a9e8c'],[-1.01,-.16,.219,.083,'RUTILE','b09e78']]){
         pot(x,top,z,'crock',h,r,'porcelain',{lid:true,sides:28,color:cc});sign(x,top+h*.48,z+r*.962,r*1.44,h*.28,'bone',[label]);}
       at(-1.32,top,.15,-.09,()=>{panel(0,.008,0,.38,.015,.241,'ae997a');signPaper(0,.018,0,.31,.20,'paper',['MIXING RECORD','ASH     42     FELD.    28','SILICA   24     IRON      6']);});
       Studio.brushes(.675,top,-.168,.17,.075);Studio.brush([.52,top+.008,.20],[.82,top+.008,.258],.008);
       pot(1.21,top,.095,'deep',.158,.166,'celadon',{sides:45});pot(1.52,top,-.14,'cup',.128,.076,'bisque',{sides:30});pot(.97,top,-.194,'cup',.118,.061,'bisque',{sides:28});
       Studio.drape(1.41,top,.452,.293,.31,'bcc2aa','718574');
     });
     at(5.032,0,-6.6,-PI/2,samples);
     // Small stoneware sink below the north wall shelf.
     at(2.97,0,-9.33,0,()=>{
       let w=1.74;post(-.72,.42,.17,.09,.84,.09,'859183');post(.72,.42,.17,.09,.84,.09,'859183');
       panel(0,.732,.16,w,.126,.09,'849184');panel(0,.75,-.12,w,.08,.08,'849184');
       box(0,.827,-.002,w,.063,.62,'b7b7a2',M.stone,.015);
       for(const s of [-1,1]){box(s*(w/2-.041),.924,0,.082,.18,.63,'c9c8b3',M.satin,.016);box(0,.924,s*.273,w-.13,.18,.078,'c4c4b0',M.satin,.014);}
       cyl(.49,.862,0,.047,.047,.006,'818578',M.iron,18);
       for(let i=0;i<7;i++){let a=i*TAU/7;Studio.ellipse(.49+.027*Math.cos(a),.866,.027*Math.sin(a),.004,.004,'575e53',M.iron);}
       rod([-.34,.15,-.238],[-.34,1.285,-.238],.017,'968263',M.iron,12);
       tube([[-.34,1.28,-.238],[-.34,1.302,-.216],[-.34,1.302,-.052],[-.34,1.282,-.031],[-.34,1.248,-.031]],.021,'a09374',M.iron,12);
       rod([-.34,1.196,-.22],[-.34,1.196,-.145],.017,'8d8267',M.iron,9);
       for(const a of [-1,1])rod([-.34,1.196,-.136],[-.34+a*.056,1.196,-.136],.009,'799384',M.paint,8);
       tube([[.49,.797,0],[.49,.563,0],[.47,.516,.0],[.423,.497,.0],[.379,.519,.0],[.369,.56,-.011],[.369,.602,-.036],[.369,.602,-.278]],.026,'777d71',M.iron,12);
       Studio.stool(-1.17,.462,.22,.48);collider(0,0,w,.64);
       panel(0,1.615,-.161,1.90,.045,.27,'a08d73');
       for(const u of [-.70,.70]){beam([u,1.387,-.265],[u,1.584,-.062],.030,.032,'616f60',M.iron);}
       for(let i=0;i<5;i++)pot(-.73+i*.282,1.638,-.14,pick(['jar','crock']),rand(.16,.233),rand(.077,.107),pick(['ash','shino','porcelain']),{lid:true,sides:26});
     });
     Studio.pendant(2.94,-5.55,3.22,2.50,.80);
     // An enamel chart on the solid studio wall facing the gallery.
     at(1.31,0,-3.706,PI,()=>notice(0,1.61,0,.87,.69,'paper',['GLAZE BATCHES','01   CELADON ASH','02   IRON SATIN','03   WHITE SLIP','04   BLUE STONE']));
   });
 }
 function signPaper(x,y,z,w,d,theme,lines){G.basis([x,y,z],[1,0,0],[0,0,-1],[0,1,0],()=>sign(0,0,0,w,d,theme,lines));}
 const brickColors=['ae6c4e','aa694f','b47758','9b604c','b87a58','bd805e','9e6550','c18865','af7558','a9694c'];
 function brickColor(soot=0){return blend(shade(pick(brickColors),rand(.91,1.04)),'534b40',soot);}
 function wedge(cx,cy,rx,ry,t,a,b,z0,z1,c){
   const p=(ang,outer,z)=>[cx+(rx-(outer?0:t))*Math.cos(ang),cy+(ry-(outer?0:t))*Math.sin(ang),z];
   const oa=p(a,1,z1),ob=p(b,1,z1),ia=p(a,0,z1),ib=p(b,0,z1),oa0=p(a,1,z0),ob0=p(b,1,z0),ia0=p(a,0,z0),ib0=p(b,0,z0);
   face([oa,ob,ib,ia],c,M.brick,[0,0,1]);face([oa0,ia0,ib0,ob0],shade(c,.92),M.brick,[0,0,-1]);
   face([oa,oa0,ob0,ob],c,M.brick,G.unit([Math.cos((a+b)/2)/rx,Math.sin((a+b)/2)/ry,0]));
   face([ia,ib,ib0,ia0],shade(c,.77),M.brick,G.unit([-Math.cos((a+b)/2)/rx,-Math.sin((a+b)/2)/ry,0]));
   face([oa,ia,ia0,oa0],shade(c,.9),M.brick);face([ob0,ib0,ib,ob],shade(c,.92),M.brick);
 }
 function archBody(rx,ry,sp,bottom,z0,z1,col,m){
   const points=[[-rx,bottom],[rx,bottom]];
   for(let i=0;i<=30;i++){const a=PI*i/30;points.push([rx*Math.cos(a),sp+ry*Math.sin(a)]);}
   for(const [z,n] of [[z0,-1],[z1,1]])face(points.map(([x,y])=>[x,y,z]),col,m,[0,0,n],points);
   for(let i=0;i<points.length;i++){const [x,y]=points[i],[u,v]=points[(i+1)%points.length];
     face([[x,y,z0],[u,v,z0],[u,v,z1],[x,y,z1]],col,m,G.unit([v-y,x-u,0]));}
 }
 function kiln(){
   area('kiln',()=>at(-2.54,0,-8.49,.016,()=>{
     const rx=1.44,sp=1.505,ry=.78,front=.99,back=-.97,doorR=.596,doorSp=1.33,doorRy=.48,doorT=.194;
     collider(0,.080,rx*2+.2,2.25);contact(0,0,.16,1.79,1.44,.50);
     box(0,.061,0,3.05,.122,2.17,'888474',M.stone,.023);
     archBody(rx-.033,ry-.017,sp,.115,back+.026,front-.026,'8f7a65',M.stone);
     // Bonded facing clipped to the arched silhouette and the refractory doorway.
     const courses=23,ch=.094;
     for(let j=0;j<courses;j++){
       const y0=.124+j*ch,y1=y0+ch-.009,y=(y0+y1)/2;
       if(y>=sp+ry-.018)break;
       const ext=y<=sp?rx:rx*Math.sqrt(Math.max(0,1-((y-sp)/ry)**2));
       let hole=0;
       if(y>.51&&y<doorSp+doorRy+doorT)hole=y<doorSp?doorR+doorT:(doorR+doorT)*Math.sqrt(Math.max(0,1-((y-doorSp)/(doorRy+doorT))**2));
       const spans=hole?[[-ext,-hole],[hole,ext]]:[[-ext,ext]];
       for(const [left,right] of spans){
         if(right-left<.03)continue;let x=left;let k=0;
         while(x<right-.003){let ww=Math.min(right-x,k===0&&j%2?.135:rand(.225,.274));if(right-x<.35)ww=right-x;
           if(ww>.019)box(x+ww/2,y,front-.023+rand(-.004,.004),ww-.009,ch-.010,.109,brickColor(.05+.20*(y/sp)**2),M.brick,.007);
           x+=ww;k++;}
       }
     }
     // Both long sides are bonded brick with a slightly projecting foundation course.
     for(const s of [-1,1])for(let j=0;j<15;j++){
       let z=back;while(z<front-.004){let d=Math.min(front-z,(z===back&&j%2)? .127:rand(.239,.278));if(front-z<.335)d=front-z;
         box(s*(rx-.023+rand(-.003,.003)),.124+ch*(j+.5),z+d/2,.109,ch-.009,d-.009,brickColor(.07+.13*(j/16)**2),M.brick,.006);z+=d;}
     }
     // The barrel vault is individual tapered firebrick, bonded along the depth.
     for(let i=0;i<28;i++){
       let z=back-.038,k=0;while(z<front+.075-.001){
         const len=Math.min(front+.075-z,(i%2&&k===0)?.129:.259);if(len>.008)wedge(0,sp,rx+.048,ry+.05,.123,i*PI/28+.003,(i+1)*PI/28-.003,z+.003,z+len-.003,brickColor(rand(.12,.36)));
         z+=len;k++;
       }
     }
     // Kiln face jambs, radiating voussoirs, lintel and sealed iron charging door.
     const sill=.523;
     for(const s of [-1,1]){
       let nn=7;for(let j=0;j<nn;j++)box(s*(doorR+doorT*.5),sill+(j+.5)*(doorSp-sill)/nn,front+.074,doorT-.006,(doorSp-sill)/nn-.007,.17,brickColor(.16+j*.019),M.brick,.007);
     }
     for(let j=0;j<15;j++)wedge(0,doorSp,doorR+doorT,doorRy+doorT,doorT,j*PI/15+.005,(j+1)*PI/15-.005,front-.02,front+.165,brickColor(j>4&&j<11?.27:.17));
     box(0,sill-.05,front+.071,1.67,.097,.27,'9e8f78',M.stone,.008);
     archBody(doorR+.01,doorRy+.009,doorSp,sill+.01,front-.008,front+.093,'3d3c35',M.iron);
     archBody(doorR-.041,doorRy-.047,doorSp,sill+.047,front+.091,front+.121,'525349',M.iron);
     for(const x of [-.263,.255])box(x,.997,front+.128,.013,.84,.014,'46493f',M.iron,.003);
     for(const yy of [.679,1.235]){
       panel(-.027,yy,front+.153,1.21,.082,.039,'565a50',M.iron);
       for(const x of [-.493,-.327,.332,.495])bolt(x,yy,front+.177,.021);
       panel(-.706,yy,front+.178,.299,.107,.037,'555a4f',M.iron);
       cyl(-.614,yy,front+.212,.042,.042,.154,'65685c',M.iron,12);
       bolt(-.804,yy,front+.209,.021);
     }
     for(let j=0;j<10;j++){const a=.13+j*(PI-.26)/9;bolt((doorR-.088)*Math.cos(a),doorSp+(doorRy-.094)*Math.sin(a),front+.127,.014);}
     for(const s of [-1,1])for(const y of [.827,1.028,1.38])bolt(s*(doorR-.084),y,front+.127,.014);
     diskZ(.15,1.414,front+.15,.066,.044,'3b4038',M.iron);diskZ(.15,1.414,front+.18,.046,.021,'737466',M.iron);
     rod([.15,1.413,front+.2],[.379,1.50,front+.22],.018,'737568',M.iron,10);
     rod([.32,1.478,front+.221],[.46,1.53,front+.231],.025,'8e765a',M.wood,12);
     notice(-.182,1.457,front+.136,.292,.126,'brass',['Nº  02']);
     // The ash pit doors have sliding vent plates and individual black air slots.
     for(const x of [-.49,.49]){
       box(x,.313,front+.072,.686,.302,.112,'4c5047',M.iron,.012);
       box(x,.316,front+.136,.599,.219,.032,'5e5f51',M.iron,.012);
       for(let k=0;k<7;k++)box(x+(k-3)*.061,.295,front+.157,.024,.089,.008,'30362f',M.iron,.006);
       tube([[x-.072,.372,front+.16],[x-.072,.372,front+.203],[x+.072,.372,front+.203],[x+.072,.372,front+.16]],.009,'82806d',M.iron,8);
       for(const sx of [-1,1])bolt(x+sx*.275,.318,front+.151,.012);
     }
     // Angle-iron buckstays and threaded transverse tie rods restrain the vault.
     for(const s of [-1,1])for(const z of [-.762,.15,.838]){
       const x=s*(rx+.053);
       box(x,.986,z,.061,1.747,.074,'595c51',M.iron,.005);
       box(x-s*.038,.986,z-.039,.117,1.747,.023,'52564e',M.iron);
       box(x,.143,z,.153,.052,.18,'64665a',M.iron,.006);
       rod([x-s*.092,1.712,z],[x+s*.071,1.712,z],.019,'727466',M.iron,10);
       rod([x+s*.048,1.712,z],[x+s*.074,1.712,z],.041,'6e7164',M.iron,6);
     }
     for(const z of [-.766,.84])rod([-1.56,1.733,z],[1.56,1.733,z],.018,'666b5d',M.iron,12);
     // Pyrometer on a separate bracket at a readable height.
     panel(1.103,1.48,front+.089,.156,.22,.079,'666a5d',M.iron);
     diskZ(1.103,1.58,front+.152,.114,.075,'53625a');diskZ(1.103,1.58,front+.195,.101,.018,'a6ad99');
     sign(1.103,1.58,front+.206,.194,.194,'dial',['°C','PYRO']);
     tube([[1.101,1.39,front+.11],[1.103,1.29,front+.12],[1.19,1.232,front+.122],[1.303,1.23,front+.096],[1.332,1.206,front+.043]],.008,'766e56',M.iron,8);
     // Two draw ports on the working side, one open and one stoppered.
     at(rx+.045,0,.04,PI/2,()=>{
       for(const [xx,yy,shut] of [[-.415,1.09,false],[.38,1.19,true]]){
         diskZ(xx,yy,.013,.094,.029,'8a7761',M.brick,26);
         diskZ(xx,yy,.031,.067,.013,'534d40',M.clay,24);
         diskZ(xx,yy,.038,.044,.004,'34382f',M.plain,22);
         const points=Array.from({length:29},(_,j)=>[xx+.076*Math.cos(j*TAU/28),yy+.076*Math.sin(j*TAU/28),.038]);
         tube(points,.013,'bba383',M.brick,8);
         if(shut){
           rod([xx,yy,.037],[xx,yy,.095],.057,'a79373',M.stone,18,.068);
           rod([xx,yy,.092],[xx,yy,.147],.026,'9a8668',M.stone,12,.022);
         }
       }
       notice(.36,.94,.012,.218,.070,'brass',['DRAW PORT']);
     });
     // Rear flue and a real open chimney throat with corbelled cap courses.
     at(.83,0,-.565,0,()=>{
       const bottom=1.87,nn=31,h=.095,end=bottom+nn*h;
       box(0,(bottom+end-.17)/2,0,.56,end-.17-bottom,.55,'817662',M.stone);
       for(let i=0;i<nn;i++){
         const tread=i>=nn-3?(i===nn-2?.10:.066):i===17?.052:0;
         const s=.67-.073*i/(nn-1)+tread,yy=bottom+(i+.5)*h;
         const t=.109;
         for(const k of [-1,1]){
           if(i%2===0){
             for(let j=0;j<3;j++)box((j-1)*s/3,yy,k*(s-t)/2,s/3-.008,h-.008,t,brickColor(.09+.48*(i/nn)**3),M.brick,.005);
             for(let j=0;j<2;j++)box(k*(s-t)/2,yy,(j-.5)*(s-2*t)/2,t,h-.008,(s-2*t)/2-.007,brickColor(.08+.47*(i/nn)**3),M.brick,.005);
           }else{
             for(let j=0;j<2;j++)box((j-.5)*(s-2*t)/2,yy,k*(s-t)/2,(s-2*t)/2-.008,h-.008,t,brickColor(.10+.48*(i/nn)**3),M.brick,.005);
             for(let j=0;j<3;j++)box(k*(s-t)/2,yy,(j-1)*s/3,t,h-.008,s/3-.007,brickColor(.08+.47*(i/nn)**3),M.brick,.005);
           }
         }
       }
       box(0,end-.16,0,.41,.012,.41,'373c34',M.iron);
       for(const yy of [2.58,3.57]){
         for(const s of [-1,1]){box(0,yy,s*.324,.68,.043,.027,'5e6255',M.iron);box(s*.324,yy,0,.028,.043,.64,'5e6255',M.iron);}
         bolt(.248,yy,.349,.014);
       }
       panel(0,2.81,.417,.519,.035,.38,'6e6c58',M.iron);
       tube([[-.116,2.80,.584],[-.116,2.81,.690],[-.081,2.81,.721],[.08,2.81,.721],[.117,2.81,.687],[.117,2.80,.584]],.014,'766e55',M.iron,9);
     });
   }));
 }
 return {glazeRoom,kiln,pail,bolt,diskZ};
})();
