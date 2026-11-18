'use strict';
const Studio = (() => {
 const {PI,TAU,rand,pick,shade,blend,M,at,area,box,cyl,rod,beam,tube,ring,blob,face,contact,collider,sign}=G;
 const {post,panel,peg,notice,iron,oak,wood,pale,dark,paint}=Yard,{pot}=Ceramics;
 M.worktop=17;
 function ellipse(x,y,z,rx,rz,c,m=M.clay){
   const pts=Array.from({length:32},(_,j)=>[x+rx*Math.cos(TAU*j/32),y,z+rz*Math.sin(TAU*j/32)]);
   face(pts,c,m,[0,1,0],pts.map(p=>[p[0],p[2]]));
 }
 function dust(x,y,z,r,count=6){
   for(let i=0;i<count;i++){
     const a=rand(0,TAU),d=rand(r*.55,r*1.25),l=rand(.003,.014);
     blob(x+d*Math.cos(a),y+.001,z+d*Math.sin(a),l,rand(.001,.005),l*rand(.5,1.3),pick(['cfb497','c5aa91','b79880']),M.clay,.10,7);
   }
 }
 function bat(x,y,z,r,c='b39875',h=.023){cyl(x,y+h/2,z,r,r*.99,h,c,M.wood,36);ring(x,y+h+.0008,z,r*.82,.0018,shade(c,.82),M.wood,34);return y+h;}
 function stool(x,z,a=0,top=.48){
   at(x,0,z,a,()=>{
     contact(0,0,0,.29,.29,.37);
     for(const [u,v] of [[-.12,-.09],[.12,-.09],[0,.147]]){
       rod([u*1.53,.019,v*1.53],[u,top-.035,v],.028,'887052',M.wood,10,.033);
     }
     rod([-.155,.185,-.113],[.155,.185,-.113],.014,'8d7657',M.wood,8);
     cyl(0,top-.031,0,.202,.193,.062,'ad8e67',M.wood,30);
     for(const [u,v] of [[-.12,-.09],[.12,-.09],[0,.147]])ellipse(u,top+.0008,v,.009,.009,'796448',M.wood);
     collider(0,0,.34,.34);
   });
 }
 function crate(x,y,z,w,h,d,a=0,label=null){
   at(x,y,z,a,()=>{
     box(0,.025,0,w-.04,.05,d-.04,'847257',M.wood);
     for(const s of [-1,1])for(const t of [-1,1])post(s*(w/2-.037),h/2,t*(d/2-.037),.052,h,.054,'8d7858');
     for(let j=0;j<3;j++)for(const s of [-1,1]){
       const yy=(j+.5)*h/3;box(0,yy,s*(d/2-.01),w,h/3-.017,.025,shade('9b8667',rand(.9,1.08)),M.wood);
       box(s*(w/2-.013),yy,0,.025,h/3-.017,d-.05,shade('9c8668',rand(.91,1.06)),M.wood);
     }
     if(label)sign(0,h*.51,d/2+.004,w*.51,h*.21,'wood',[label]);
   });
 }
 function table(w,d,top,opts={}){
   const legsX=w/2-.16,legsZ=d/2-.128,leg=opts.leg||.108,t=opts.slab||.074;
   const base=opts.color||'907352',board=opts.topColor||'b09774';
   const shelf=opts.lower===undefined?.255:opts.lower;
   contact(0,0,0,w*.62,d*.76,.32);
   for(const sx of [-1,1])for(const sz of [-1,1]){
     post(sx*legsX,(top-t)/2,sz*legsZ,leg,top-t,leg,shade(base,rand(.95,1.035)));
     contact(sx*legsX,0,sz*legsZ,leg*1.24,leg*1.24,.45);
   }
   for(const sz of [-1,1]){
     panel(0,top-t-.082,sz*legsZ,w-.21,.168,.06,base);
     panel(0,shelf-.04,sz*legsZ,w-.22,.079,.053,shade(base,.89));
     if(sz>0)for(const sx of [-1,1])for(const yy of [top-t-.044,top-t-.117,shelf-.036])peg(sx*legsX,yy,sz*legsZ+.038,.016);
   }
   for(const sx of [-1,1]){
     panel(sx*legsX,top-t-.079,0,.058,.157,d-.17,base);
     panel(sx*legsX,shelf-.046,0,.059,.093,d-.17,shade(base,.91));
     beam([sx*legsX,.067,-legsZ+.02],[sx*legsX,top-t-.16,legsZ-.04],.052,.05,shade(base,.94));
   }
   let count=Math.max(3,Math.ceil(d/.225));
   for(let i=0;i<count;i++){
     box(0,top-t/2,-d/2+(i+.5)*d/count,w,t,d/count-.002,shade(board,rand(.94,1.055)),M.worktop,.005);
   }
   if(opts.slat!==false){
     for(let i=0;i<5;i++)box(0,shelf+.012,(i-2)*(d-.19)/5,w-.24,.029,(d-.19)/5-.008,shade(base,rand(.92,1.04)),M.wood);
   }
   collider(0,0,w-.025,d-.025);
 }
 function drape(x,y,z,width,drop,c='c2baa2',stripe='6f8180'){
   // The folded linen follows the horizontal surface and hangs over its front edge.
   const rows=19,cols=28,g=G.group(M.cloth),start=g.vs.length/G.stride,grid=[];
   for(let j=0;j<=rows;j++){const t=j/rows;grid[j]=[];
     for(let i=0;i<=cols;i++){const u=i/cols,fold=Math.sin(u*PI*7+.5*Math.sin(t*4)+.4)*.012+.007*Math.sin(u*PI*13+t);
       const hang=Math.max(0,(t-.40)/.60);const yy=t<.4?y+.009+fold*.32:y+.008-hang*drop+fold*.17;
       const zz=t<.4?z-.23*(1-t/.4):z+.014+fold*(.35+.65*hang)+.012*Math.sin(hang*PI);
       grid[j][i]=[x+(u-.5)*width+hang*(.014*Math.sin(t*3)+.017*Math.sin(u*PI)),yy+.009*Math.sin(u*9+1)*hang,zz];
     }
   }
   for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){
     const p=grid[j][i],du=G.sub(grid[j][Math.min(cols,i+1)],grid[j][Math.max(0,i-1)]),dv=G.sub(grid[Math.min(rows,j+1)][i],grid[Math.max(0,j-1)][i]);
     const nm=G.unit(G.cross(dv,du));const color=(i===3||i===5||i===23||i===25)?stripe:c;
     G.vertex(g,p,nm,color,i/cols*width,j/rows*(drop+.23),M.cloth);
     if(i<cols&&j<rows){const k=start+j*(cols+1)+i;g.ix.push(k,k+cols+1,k+1,k+1,k+cols+1,k+cols+2);}
   }
   for(let i=0;i<cols;i+=2){const p=grid[rows][i];rod(p,[p[0]+.002,p[1]-.013,p[2]+.001],.0014,c,M.cloth,4);}
 }
 function brush(a,b,r=.009,c='a07b4c',bristles='6e5942'){
   const v=G.sub(b,a),p=t=>G.add(a,G.mul(v,t));
   rod(a,p(.69),r,c,M.wood,10,r*.75);rod(p(.69),p(.82),r*.86,'a5a399',M.iron,10,r*1.25);
   rod(p(.82),p(.90),r*1.25,bristles,M.cloth,10,r*1.5);rod(p(.90),b,r*1.5,bristles,M.cloth,10,r*.16);
 }
 function brushes(x,y,z,h=.18,r=.075){
   pot(x,y,z,'beaker',h,r,'honey',{sides:28});
   for(let i=0;i<8;i++){
     const a=rand(0,TAU),d=rand(.03,.1);brush([x+Math.cos(a)*r*.27,y+h*.45,z+Math.sin(a)*r*.27],
       [x+d*Math.cos(a),y+h+rand(.115,.258),z+d*Math.sin(a)],rand(.004,.008),pick(['a87944','8e5b37','b39463','475a53']));
   }
 }
 function loopTool(x,y,z,a,l=.22){
   at(x,y,z,a,()=>{
     rod([-.47*l,.009,0],[.17*l,.009,0],.010,'ad865b',M.wood,10,.007);
     rod([.14*l,.009,0],[.22*l,.009,0],.008,'83877c',M.iron,9);
     tube([[.20*l,.009,0],[.30*l,.009,-.014],[.48*l,.009,-.018],[.52*l,.009,-.010],[.52*l,.009,.010],[.48*l,.009,.018],[.30*l,.009,.014],[.20*l,.009,0]],.0022,'747d76',M.iron,6);
   });
 }
 function kidney(x,y,z,a=.4,c='af895e'){
   at(x,y,z,a,()=>{
     const outline=[[-.074,.008],[-.068,-.02],[-.047,-.04],[-.012,-.046],[.027,-.043],[.059,-.025],[.076,0],[.071,.02],[.053,.035],[.022,.027],[.005,.011],[-.013,.01],[-.04,.032],[-.06,.027]];
     const pts=outline.map(([x,z])=>[x,.008,z]),avg=[0,.008,-.016];
     for(let i=0;i<pts.length;i++){let j=(i+1)%pts.length;face([avg,pts[i],pts[j]],c,M.wood,[0,1,0]);face([pts[i],[pts[i][0],0,pts[i][2]],[pts[j][0],0,pts[j][2]],pts[j]],shade(c,.9),M.wood);}
   });
 }
 function pendant(x,z,top,lower,scale=1){
   rod([x,top,z],[x,lower+.26*scale,z],.008,'4b4b3f',M.iron,8);
   cyl(x,top-.018,z,.07,.047,.035,'706d59',M.iron,16);
   cyl(x,lower+.239*scale,z,.038*scale,.047*scale,.062*scale,'7d7562',M.iron,18);
   // Spun enamel shade and its cream interior, built around the pendant bulb.
   const rs=[[.043,.214],[.084,.203],[.115,.15],[.169,.095],[.235,.060],[.26,.020],[.259,.008]];
   const g=G.group(M.iron),n=38;
   for(const inside of [false,true]){
     const first=g.vs.length/G.stride;
     for(let i=0;i<rs.length;i++)for(let j=0;j<=n;j++){
       const [r,y]=rs[i],a=TAU*j/n,pr=rs[Math.max(0,i-1)],nx=rs[Math.min(rs.length-1,i+1)];
       let nm=G.unit([Math.cos(a)*(pr[1]-nx[1]),nx[0]-pr[0],Math.sin(a)*(pr[1]-nx[1])]);if(inside)nm=G.mul(nm,-1);
       G.vertex(g,[x+(r-(inside?.003:0))*scale*Math.cos(a),lower+(y-(inside?.004:0))*scale,z+(r-(inside?.003:0))*scale*Math.sin(a)],nm,inside?'d6d2b8':'375e53',j/n,i*.15,M.iron);
       if(j<n&&i<rs.length-1){let k=first+i*(n+1)+j;if(inside)g.ix.push(k,k+n+1,k+1,k+1,k+n+1,k+n+2);else g.ix.push(k,k+1,k+n+1,k+1,k+n+2,k+n+1);}
     }
   }
   ring(x,lower+.012*scale,z,.259*scale,.007*scale,'45675a',M.iron,40);
   blob(x,lower+.006*scale,z,.048*scale,.065*scale,.048*scale,'eee1b9',M.plain,.01,16);
 }
 function heroBench(){
   area('workbench',()=>at(-.25,0,1.05,-.024,()=>{
     const h=.908,w=3.55,d=1.48;table(w,d,h,{leg:.125,topColor:'bba179',color:'927557',lower:.245,slab:.081});
     // Drawer and the turned hardwood knobs on the near apron.
     for(const x of [-.84,.35]){
       panel(x,.75,d/2-.089,.91,.125,.049,'9e8260');
       for(const u of [-.30,.30]){rod([x+u,.75,d/2-.064],[x+u,.75,d/2-.034],.013,iron,M.iron,10);blob(x+u,.75,d/2-.021,.024,.023,.019,'685840',M.wood,.018,12);}
     }
     crate(-.92,.274,.005,.94,.35,.80,.016,'FIRE CLAY');
     for(let i=0;i<3;i++)box(-1.19+.26*i,.57,-.035,.234,.34,.35,shade('b5a088',rand(.93,1.05)),M.paper,.027);
     for(let j=0;j<7;j++)bat(.12+rand(-.015,.015),.275+j*.023,.16,.285,shade('bfa583',rand(.89,1.05)),.022);
     pot(1.02,.276,-.03,'crock',.32,.198,'greenware',{sides:32});
     ring(1.02,.61,-.03,.183,.008,'bca080',M.clay,28);
     // Large just-thrown jar on a wheel bat, opposite a finished sample pitcher.
     const y1=bat(-1.12,h,-.18,.336);pot(-1.12,y1,-.18,'urn',.52,.247,'wet',{sides:64,irregular:1.22});dust(-1.12,h,-.18,.31,13);
     pot(-.49,h,-.33,'pear',.40,.144,'greenware',{sides:52,flutes:13});
     pot(-.11,h,-.345,'bud',.232,.093,'bisque',{sides:38});
     at(.79,h,-.17,-.12,()=>{
       panel(0,.022,0,1.04,.044,.624,'b19a77');
       pot(.16,.044,.003,'jug',.359,.146,'brush',{sides:56,angle:.27});
       pot(-.218,.044,-.063,'cup',.125,.075,'lagoon',{handle:true,angle:2.2,sides:36});
     });
     // Wedging slab: cut clay, shavings, a kidney and a double-ended trimming tool.
     at(-.71,h,.35,.04,()=>{
       box(0,.015,0,1.16,.031,.54,'d0c5b0',M.stone,.009);
       const yy=.031;
       blob(-.28,yy+.056,-.018,.139,.065,.103,'af795a',M.clay,.16,17);
       blob(-.235,yy+.105,-.010,.084,.035,.062,'b48260',M.clay,.19,12);
       kidney(.24,yy,.061,-.21);loopTool(.287,yy,-.08,.19,.225);
       for(let k=0;k<4;k++){let px=-.038+k*.055,pz=-.041+rand(-.04,.06);
         tube(Array.from({length:11},(_,i)=>[px+i*.006,yy+.005+.0025*Math.sin(i*.8),pz+.013*Math.sin(i*.45+k)]),.003,'b98c6d',M.clay,5);}
       dust(-.16,yy,0,.17,17);
     });
     const y2=bat(.295,h,.308,.238,'b9a281',.017);
     pot(.295,y2,.308,'bowl',.149,.195,'greenware',{sides:56,irregular:1.6});
     loopTool(.842,h,.383,-.50,.252);brush([.75,h+.009,.225],[1.04,h+.009,.159],.008);
     blob(1.18,h+.031,.255,.076,.034,.05,'b9a062',M.stone,.22,12);
     brushes(1.50,h,-.36,.157,.069);
     drape(1.18,h,d/2+.003,.36,.335,'c8beaa','607e80');
     // Hart-shaped potter's calipers, pinned together at their brass pivot.
     at(-.581,h,-.606,-.051,()=>{
       for(const s of [-1,1]){
         const curve=[[-.158,.0,.013],[-.116,.041,.012],[-.056,.083,.010],[.028,.104,.008],[.112,.084,.006],[.164,.045,.0027]];
         const yy=.006+(s+1)*.0022;
         for(let j=0;j<curve.length-1;j++){
           const [u,v,r]=curve[j],[u1,v1,r1]=curve[j+1];
           face([[u,yy,s*v-r],[u1,yy,s*v1-r1],[u1,yy,s*v1+r1],[u,yy,s*v+r]],'666f63',M.iron,[0,1,0]);
         }
       }
       cyl(-.153,.012,0,.013,.012,.01,'a98f61',M.iron,12);
       box(-.153,.0175,0,.014,.0015,.0018,'6b634c',M.iron);
     });
     // A fine bowed cutting wire between its two wooden toggles.
     for(const [u,v] of [[-1.55,.27],[-1.36,.49]])rod([u,h+.009,v-.029],[u+.018,h+.009,v+.029],.007,'806245',M.wood,8);
     tube([[-1.54,h+.006,.27],[-1.58,h+.004,.40],[-1.53,h+.003,.49],[-1.43,h+.003,.515],[-1.35,h+.006,.49]],.0016,'73786e',M.iron,5);
   }));
 }
 function rack(w,h,ys,backed=false){
   const depth=backed?.493:.51,c=backed?'65796c':'9d8562';
   for(const s of [-1,1])for(const zz of [.02,depth-.026])post(s*(w/2-.044),h/2,zz,.079,h,.072,shade(c,rand(.93,1.03)));
   if(backed){
     const n=Math.ceil(w/.205);
     for(let i=0;i<n;i++)box(-w/2+(i+.5)*w/n,h*.50,-.042,w/n-.002,h-.055,.047,shade('8a8a74',rand(.90,1.04)),M.wood);
   }else{
     beam([-w/2+.04,.22,.014],[w/2-.04,h-.08,.014],.053,.029,'857354');
     beam([w/2-.04,.22,.036],[-w/2+.04,h-.08,.036],.050,.028,'817156');
   }
   for(const y of ys){
     for(let j=0;j<3;j++)box(0,y-.022,(j+.5)*depth/3,w+.045,.044,depth/3-.0015,shade(backed?'a38e69':'a99474',rand(.96,1.04)),M.wood,.003);
     panel(0,y-.053,depth-.023,w-.13,.055,.042,c);
     for(const s of [-1,1])peg(s*(w/2-.045),y-.053,depth+.002,.010);
   }
   collider(0,depth/2,w+.06,depth+.018);
   contact(0,0,depth*.52,w*.57,depth*.96,.48);
 }
 function gallery(){
   area('form-library',()=>at(-.115,0,-3.335,0,()=>{
     const levels=[.30,.998,1.645,2.228],w=4.13;rack(w,2.30,levels,true);
     const rows=[
       [[-1.68,'crock',.415,.197,'tenmoku'],[-1.18,'jar',.49,.228,'olive',{lid:true}],[-.61,'urn',.47,.198,'shino'],[.02,'deep',.235,.21,'ink'],[.48,'bowl',.186,.184,'ash'],[1.12,'crock',.459,.21,'honey',{handle:2}],[1.64,'pear',.47,.156,'porcelain']],
       [[-1.73,'jug',.34,.143,'brush',{angle:.35}],[-1.38,'cup',.132,.089,'stripe',{handle:true,angle:.83}],[-.98,'tall',.398,.126,'lagoon',{flutes:12}],[-.655,'bud',.237,.096,'celadon'],[-.20,'bowl',.214,.204,'shino'],[.30,'moon',.39,.171,'ink'],[.82,'pear',.467,.154,'ash',{flutes:15}],[1.20,'bottle',.37,.110,'celadon'],[1.65,'deep',.199,.166,'honey']],
       [[-1.63,'bottle',.44,.17,'porcelain'],[-1.21,'bud',.30,.116,'shino'],[-.81,'bowl',.168,.186,'brush'],[-.27,'moon',.274,.17,'celadon',{angle:.05,handle:true,lid:true,spout:true}],[.145,'beaker',.163,.081,'tenmoku'],[.43,'cup',.131,.091,'tenmoku',{handle:true}],[.90,'urn',.397,.176,'stripe'],[1.45,'pear',.355,.126,'lagoon'],[1.74,'bud',.206,.087,'ash']],
       [[-1.66,'jar',.365,.178,'ink',{lid:true}],[-1.15,'bottle',.455,.134,'shino'],[-.82,'bottle',.313,.096,'ash'],[-.22,'dish',.139,.207,'lagoon'],[.53,'tall',.33,.128,'porcelain',{flutes:17}],[.85,'bud',.207,.085,'porcelain'],[1.37,'urn',.443,.191,'honey']]
     ];
     for(let i=0;i<rows.length;i++)for(const [x,s,h,r,f,opts] of rows[i])pot(x,levels[i],.250+rand(-.028,.029),s,h,r,f,opts||{});
     for(let j=0;j<3;j++){let x=[-1.25,-.03,1.14][j];sign(x,1.598,.498,.28,.060,'bone',[['ASH / 04','IRON / 12','CELADON / 08'][j]]);}
     notice(0,2.96,-.105,1.77,.295,'bone',['FORM LIBRARY','MARL YARD   •   STONEWARE']);
   }));
   area('drying-rack',()=>at(4.96,0,.27,-PI/2,()=>{
     let ys=[.27,.855,1.428,2.005];rack(3.29,2.08,ys);
     for(let j=0;j<6;j++)bat(-1.055+rand(-.016,.016),ys[0]+j*.022,.26,.182,'b09a77',.021);
     crate(-.11,ys[0],.25,.77,.34,.40,.008,'BATS');
     pot(.85,ys[0],.258,'crock',.38,.18,'red');
     for(let i=0;i<3;i++){
       const x=-1.27+i*.338;pot(x,ys[1],.24+rand(-.02,.02),'beaker',rand(.16,.22),rand(.081,.104),'greenware',{handle:i!==1,angle:.75});
     }
     pot(-.076,ys[1],.25,'urn',.38,.17,'greenware');
     for(let i=0;i<4;i++)pot(.55,ys[1]+i*.029,.259,'plate',.068,.173-i*.002,'bisque',{sides:30});
     pot(1.22,ys[1],.23,'bowl',.154,.165,'bisque');
     for(const [x,s,h,r,f] of [[-1.27,'deep',.21,.187,'bisque'],[-.78,'bowl',.161,.164,'bisque'],[-.24,'pear',.38,.14,'red'],[.12,'pear',.32,.11,'red'],[.59,'jug',.32,.13,'greenware'],[1.14,'crock',.23,.141,'greenware']])pot(x,ys[2],.245,s,h,r,f);
     for(const [x,s,h,r,f] of [[-1.18,'urn',.392,.187,'red'],[-.59,'bottle',.407,.139,'bisque'],[-.20,'bottle',.28,.102,'bisque'],[.38,'dish',.105,.162,'greenware'],[.97,'jar',.274,.148,'greenware']])pot(x,ys[3],.256,s,h,r,f);
     sign(-.95,1.378,.513,.37,.071,'bone',['LEATHER HARD']);sign(.83,1.378,.513,.27,.065,'bone',['BISQUE']);
     notice(0,2.71,-.106,1.20,.213,'green',['DRYING BOARDS']);
   }));
 }
 function wheel(){
   area('wheel',()=>at(-3.78,0,.69,.40,()=>{
     contact(0,0,0,.66,.72,.43);
     for(const [x,z] of [[-.245,-.195],[.245,-.195],[0,.315]])rod([x*1.32,.03,z*1.32],[x,.535,z],.039,'647a6a',M.iron,10,.046);
     box(0,.443,-.02,.58,.187,.62,'72867a',M.paint,.032);
     cyl(0,.546,0,.167,.140,.095,'787c6a',M.iron,22);
     pot(0,.532,0,'dish',.122,.335,'shino',{sides:60,color:'c1b498'});
     cyl(0,.642,0,.218,.211,.048,'9b9f96',M.iron,52);
     for(let i=1;i<=4;i++)ring(0,.6668,0,.048*i,.0018,'777e72',M.iron,40);
     pot(.001,.668,0,'deep',.165,.158,'wet',{sides:58});
     for(let j=0;j<2;j++)peg(j?.13:-.13,.45,.30,.018);
     panel(.34,.046,.516,.147,.087,.244,'525d54',M.iron);
     for(let j=0;j<6;j++)box(.34,.091,.422+j*.034,.123,.007,.008,'777b6c',M.iron);
     tube([[.24,.37,.28],[.27,.18,.36],[.28,.025,.47],[.32,.018,.55]],.007,'4e5347',M.iron,7);
     collider(0,0,.72,.72);stool(-.07,.90,.18,.485);
   }));
 }
 function wareCart(){
   area('ware-cart',()=>at(3.80,0,5.78,PI-.115,()=>{
     const w=1.05,d=.61;contact(0,0,0,.69,.43,.40);
     for(const s of [-1,1])for(const t of [-1,1]){
       const x=s*.452,z=t*.241;
       rod([x-.025,.087,z],[x+.025,.087,z],.072,'53594e',M.iron,16);
       rod([x-.028,.087,z],[x+.028,.087,z],.034,'969a87',M.iron,12);
       for(const j of [-1,1])box(x+j*.034,.125,z,.011,.104,.048,'7f8e7f',M.iron,.005);
       rod([x,.163,z],[x,.761,z],.021,'718579',M.paint,10);
     }
     for(const y of [.209,.731]){
       panel(0,y,0,w,.044,d,'ad9979');
       for(const s of [-1,1]){
         box(0,y+.012,s*d/2,w,.070,.026,'6e8377',M.paint,.004);
         box(s*w/2,y+.012,0,.027,.070,d-.016,'758b7e',M.paint,.003);
       }
     }
     tube([[-.455,.718,-.24],[-.528,.921,-.24],[-.537,.947,-.218],[-.537,.947,.218],[-.528,.921,.24],[-.455,.718,.24]],.020,'6b8276',M.paint,10);
     rod([-.537,.947,-.156],[-.537,.947,.156],.025,'897658',M.wood,12);
     for(let i=0;i<5;i++)at(-.154,.234+i*.030,.015,rand(-.026,.026),()=>box(0,.014,0,.60,.028,.421,'b9b296',M.stone,.006));
     for(let i=0;i<4;i++)cyl(.267+(i%2)*.081,.308,-.116+Math.floor(i/2)*.122,.038,.041,.151,'c2b494',M.stone,9);
     pot(-.260,.753,-.017,'jug',.285,.111,'bisque',{angle:.20,sides:36});
     pot(.084,.753,-.126,'cup',.147,.078,'bisque',{handle:true,angle:.52,sides:32});
     pot(.282,.753,.100,'deep',.147,.123,'greenware',{sides:38,flutes:12});
     at(-.033,.754,.156,-.08,()=>G.basis([0,0,0],[1,0,0],[0,0,-1],[0,1,0],()=>sign(0,0,.0018,.186,.096,'paper',['FIRING SLIP','BISQUE   •   LOAD 04'])));
     sign(0,.736,d/2+.014,.29,.043,'bone',['KILN FURNITURE']);
     collider(-.009,0,1.115,.634);
   }));
 }
 function studioDetails(){
   area('studio-tools',()=>{
     // Low window ledge for throwing water, sponges and bats.
     at(-4.76,0,1.01,PI/2,()=>{
       table(2.05,.56,.91,{color:'85907e',topColor:'ac9778',leg:.074});
       for(let i=0;i<4;i++)bat(-.65,.91+i*.018,.018,.173,'ab9571',.017);
       pot(-.07,.91,.02,'crock',.24,.139,'porcelain',{sides:38});
       blob(.28,.951,.10,.071,.045,.055,'b8a15d',M.stone,.19,12);
       brushes(.60,.91,-.07,.18,.074);drape(.51,.91,.284,.258,.22,'b7ac91','8e7060');
     });
     // Clay apron, two pegs and the sketch board by the entrance.
     at(-2.27,0,6.478,PI,()=>{
       panel(0,1.88,0,1.78,.116,.058,'8a7559');
       for(let i=0;i<5;i++){let x=(i-2)*.34;rod([x,1.87,.022],[x,1.909,.138],.017,'7c664b',M.wood,10);}
       function apron(x,y,c){
         tube([[x-.10,y-.12,.09],[x-.057,y+.09,.12],[x,y+.117,.135],[x+.063,y+.075,.11],[x+.102,y-.12,.087]],.009,c,M.cloth,6);
         const rows=[[.0,.105],[.13,.112],[.245,.239],[.48,.241],[.75,.248],[.92,.238]];
         for(let j=0;j<rows.length-1;j++)for(let i=0;i<16;i++){
           const p=(jj,ii)=>{const u=ii/16;return [x+(u-.5)*rows[jj][1]*2+.014*Math.sin(jj*.9),y-.10-rows[jj][0]+.010*Math.sin(u*12+jj*.6),.093+.023*Math.cos(u*PI*7+.38*jj)];};
           face([p(j,i),p(j+1,i),p(j+1,i+1),p(j,i+1)],shade(c,.95+.055*Math.cos(i*1.4)),M.cloth,[0,0,1]);
         }
         panel(x,y-.58,.119,.20,.137,.008,shade(c,.89),M.cloth);
       }apron(-.34,1.80,'7a8882');apron(.34,1.80,'b1a489');
     });
     at(2.98,0,6.473,PI,()=>{
       panel(0,1.62,0,1.58,.99,.054,'8e7553');
       panel(0,1.62,.029,1.48,.895,.026,'9e8a6c',M.cloth);
       for(const [x,y,w,h,t,lines] of [[-.425,1.67,.38,.53,'drawing',['PROFILE STUDIES','PL. 03']], [.05,1.74,.394,.455,'paper',['KILN LOG','LOAD    08 / 27','BISQUE    980°','GLAZE    1240°']], [.41,1.54,.33,.39,'drawing',['SAGGAR','FIG. 11']], [-.09,1.36,.32,.15,'bone',['WEDGING BATS']]]){
         sign(x,y,.048,w,h,t,lines);peg(x,y+h/2-.019,.056,.010,'a16a42');
       }
     });
     // Wiring follows the upper timber and drops to the light switches.
     at(2.38,0,6.45,PI,()=>{
       tube([[0,1.25,0],[0,2.99,0],[.02,3.04,.0],[.075,3.06,0],[2.83,3.06,0]],.013,'828575',M.iron,8);
       panel(0,1.20,.017,.079,.119,.048,'b2ab92',M.iron);panel(0,1.207,.046,.029,.049,.016,'5b5c4c',M.iron);
     });
     pendant(-1.47,1.59,3.36,2.47,.92);pendant(1.27,1.59,3.36,2.47,.92);
     wheel();wareCart();
   });
 }
 return {table,stool,crate,bat,drape,brush,brushes,loopTool,kidney,pendant,dust,ellipse,heroBench,gallery,studioDetails};
})();
