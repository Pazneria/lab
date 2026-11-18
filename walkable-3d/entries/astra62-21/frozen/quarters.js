"use strict";
function cushion(x,y,z,rx,ry,rz,m,yaw=0){
 frame(x,y,z,yaw,()=>{
  const p=22,q=13,sp=(n,k)=>Math.sign(n)*Math.pow(Math.abs(n),k),pts=[],ns=[];
  for(let j=0;j<=q;j++)for(let i=0;i<=p;i++){
   const a=i*TAU/p,b=(j/q-.5)*Math.PI,cb=Math.cos(b),cy=Math.sin(b);
   const xx=sp(cb,.58)*sp(Math.cos(a),.57),zz=sp(cb,.58)*sp(Math.sin(a),.57);
   const dent=(.09*Math.sin(xx*5+zz*3)+.14*Math.exp(-5*(xx*xx+zz*zz)))*Math.max(0,cy);
   pts.push([xx*rx,ry*(sp(cy,.61)-dent),zz*rz]);ns.push(V.unit([sp(cb,1.42)*sp(Math.cos(a),1.43)/rx,sp(cy,1.39)/ry,sp(cb,1.42)*sp(Math.sin(a),1.43)/rz]));
  }
  for(let j=0;j<q;j++)for(let i=0;i<p;i++){
   const o=j*(p+1)+i,ids=[o,o+p+1,o+p+2,o+1];if(j===0)ids.pop();if(j===q-1)ids.splice(2,1);
   face(ids.map(k=>pts[k]),m,ids.map(k=>[pts[k][0]*2,pts[k][2]*2]),ids.map(k=>ns[k]));
  }
  const seam=[];for(let i=0;i<36;i++){const a=TAU*i/36;seam.push([sp(Math.cos(a),.57)*rx,-.009,sp(Math.sin(a),.57)*rz]);}
  pipe(seam,.007,shade(m,.86),5,true);
 });
}
function bed(){
 group("bed and linen");frame(-2.30,0,6.18,0,()=>{
  const l=2.24,w=1.51,head=-l*.5,foot=l*.5;
  shadow(0,0,2.28,2.95,.56,.010);
  for(const sx of [-1,1])for(const sz of [-1,1]){
   const x=sx*w*.5,z=sz*l*.5,high=sz<0?1.26:.78;
   lathe(x,0,z,[[0,.008],[.073,.008],[.083,.052],[.067,.108],[.053,.123],[.046,.238],[.067,.274],[.073,.303],[.066,.341],[.066,high-.145],[.083,high-.112],[.085,high-.083],[.059,high-.068],[.040,high-.025],[0,high-.025]],WALNUT,12);
   ellipsoid(x,high-.012,z,.069,.076,.069,OAK,12,6);
  }
  for(const sx of [-1,1])box(sx*w*.5,.375,0,.094,.205,l+.04,OAK,.019);
  for(const sz of [-1,1])box(0,.375,sz*l*.5,w,.20,.093,OAK,.018);
  for(let i=0;i<13;i++)box(0,.443,head+.10+i*.169,w-.07,.057,.109,shade(OAK,.85),.007);
  const bd=[[ -.74,.47,head],[ .74,.47,head],[ .74,.94,head],[ .61,.96,head],[ .46,1.035,head],[ .21,1.087,head],[ 0,1.105,head],[-.21,1.087,head],[-.46,1.035,head],[-.61,.96,head],[-.74,.94,head]];
  prism(bd.map(a=>[a[0],a[1],head+.038]),bd.map(a=>[a[0],a[1],head-.060]),OAK);
  for(let i=0;i<7;i++){const x=(i-3)*.184,top=1.045-Math.abs(x)*.18;box(x,.735,head+.044,.010,(top-.49),.012,shade(WALNUT,.82));}
  for(let i=0;i<3;i++)box(0,.545+i*.062,foot,w-.065,.059,.060,shade(OAK,.93+i*.022),.008);
  cushion(0,.526,0,.733,.142,1.075,LINEN);
  cushion(-.10,.70,head+.34,.52,.111,.269,shade(LINEN,1.04),-.07);
  cushion(.43,.687,head+.41,.22,.079,.203,mat(7,0x96a497),.12);
  // The coverlet bends continuously over the tick, with gravity folds in both hanging sides.
  function blanket(u,v){
   const xx=(u-.5)*1.82,edge=Math.max(0,(Math.abs(xx)-.665)/.245),front=v*v*v;
   const x=Math.sign(xx)*(Math.min(Math.abs(xx),.665)+Math.sin(Math.min(1,edge)*1.51)*.089);
   const z=foot+.14-v*1.61;
   const fold=.020*Math.sin(xx*15+v*4)+.014*Math.sin(xx*25-v*11)*(.3+.7*edge)+.013*Math.sin(v*19+xx*3);
   const over=Math.max(0,(z-foot+.14)/.28);
   return [x+.011*Math.sin(v*17)*edge,.690-.252*edge**1.16-.206*over**1.55+fold+.018*Math.cos(xx*4)*front,z-Math.max(0,z-foot+.04)*.61];
  }
  surface(30,26,blanket,(u,v)=>[u*1.45,1.20-v*1.23],COVER);
  for(const u of [.015,.985]){const p=[];for(let j=0;j<=26;j++){const a=blanket(u,j/26);a[1]+=.004;p.push(a);}pipe(p,.008,mat(7,0xc0a981),5);}
  surface(26,5,(u,v)=>{const p=blanket(u,.87+.13*v);p[1]+=.014+.019*Math.sin(v*Math.PI);return p;},(u,v)=>[u*3.4,v*.52],mat(7,0xd2c2a4));
  // A short wool cover is left doubled over the footboard.
  surface(24,9,(u,v)=>{const p=blanket(u,.14+.23*v);p[1]+=.029+.009*Math.sin(u*25+v*3);return p;},(u,v)=>[u*3.1,v],GREEN);
  for(const v of [.175,.192,.331]){const p=[];for(let i=0;i<=27;i++){const a=blanket(i/27,v);a[1]+=.038;p.push(a);}pipe(p,.005,mat(7,0xb2ad86),5);}
  obstacle(0,0,1.66,2.43);
 });
}
function trunk(x,z,w,d,h){
 frame(x,0,z,0,()=>{
  shadow(0,0,w+.44,d+.32,.48,.012);
  box(0,h*.50,0,w,h-.055,d,shade(OAK,.91),.03);
  for(let j=0;j<3;j++)box(0,(j+.6)*h/3.9,d*.5+.002,w-.049,.009,.006,TAR);
  box(0,h-.011,0,w+.044,.078,d+.040,shade(WALNUT,1.12),.024);
  for(const s of [-1,1]){
    const x=s*w*.34;box(x,h*.49,d/2+.015,.078,h-.025,.024,LEATHER,.008);
    box(x,h+.032,0,.080,.015,d+.035,LEATHER,.004);
    for(const yy of [.084,h-.105])stud(x,yy,d/2+.026,.013,BRASS);
    nailPlate(s*(w/2-.061),.082,d/2+.01,.119,.122,BLACKIRON);
  }
  nailPlate(0,h-.078,d/2+.026,.13,.16,shade(BRASS,.76));
  hoop([0,h-.13,d/2+.058],[.023,0,0],[0,.035,0],.006,BLACKIRON,11,5);
  obstacle(0,0,w+.045,d+.05);
 });
}
function runner(x,z,w,d){
 frame(x,.016,z,.006,()=>{
  const m=mat(7,0x9e9171);box(0,.001,0,w,.009,d,m,.003);
  const dark=mat(7,0x536b5e),mad=mat(7,0x976446),och=mat(7,0xd1b481);
  for(const side of [-1,1])for(const [u,width,mm] of [[.46,.056,dark],[.405,.017,mad],[.38,.009,och]]){
   box(side*w*u,.008,0,width,.006,d*.99,mm);
  }
  for(let j=-3;j<=3;j++){const zz=j*d*.122;
   for(const side of [-1,1]){
    const p=[[0,.014,zz-.16],[w*.23,.014,zz],[0,.014,zz+.16],[-w*.23,.014,zz]];if(side<0)face(p,dark);
    else{const p2=[[0,.015,zz-.105],[w*.15,.015,zz],[0,.015,zz+.105],[-w*.15,.015,zz]];face(p2,m);}
   }
   face([[0,.016,zz-.044],[-.058,.016,zz],[0,.016,zz+.044],[.058,.016,zz]],mad);
  }
  for(const s of [-1,1]){
   for(const [off,mm] of [[.06,dark],[.105,och],[.139,mad]])box(0,.012,s*(d/2-off),w*.97,.005,.020,mm);
   for(let i=0;i<45;i++){
    const xx=(i/44-.5)*w*.98;
    face([[xx-.006,.001,s*d/2],[xx+.006,.001,s*d/2],[xx+.011,-.001,s*(d/2+rand(.035,.068))],[xx+.002,-.001,s*(d/2+.047)]],CORD);
   }
  }
 });
}
function boot(x,z,yaw){
 frame(x,.012,z,yaw,()=>{
  cushion(0,.037,-.041,.079,.034,.152,shade(BLACKIRON,.75));
  cushion(0,.078,-.057,.076,.064,.138,shade(LEATHER,.84));
  lathe(0,0,.035,[[.064,.065],[.065,.13],[.056,.20],[.063,.26],[.068,.29],[.052,.29],[.049,.24]],LEATHER,15);
  for(let k=0;k<3;k++){
   const yy=.13+k*.034;pipe([[-.035,yy,-.009],[.036,yy+.023,-.019]],.003,CORD,5);
   pipe([[.036,yy,-.011],[-.035,yy+.023,-.018]],.003,CORD,5);
  }
 });
}
function plantSprigs(x,y,z,s=1){
 for(let i=0;i<12;i++){
  const t=i*2.399,d=rand(.04,.16)*s,hh=rand(.22,.41)*s,b=[x+Math.cos(t)*d,y+hh,z+Math.sin(t)*d];
  cylinder([x+rand(-.018,.018),y,z+rand(-.018,.018)],b,.0037*s,.0015*s,mat(2,0x738b5a),5);
  for(let k=0;k<4;k++){const a=V.mix([x,y,z],b,.35+k*.15),side=(k%2?1:-1),p=[a[0]+Math.cos(t+.9)*.052*s*side,a[1]+.033*s,a[2]+Math.sin(t+.9)*.052*s*side];face([a,[a[0]+.010*s,a[1]+.022*s,a[2]-.009*s],p,[a[0]-.008*s,a[1]+.015*s,a[2]+.010*s]],mat(7,0x78825d));}
  ellipsoid(...b,.014*s,.034*s,.013*s,mat(7,i%3?0xae8a64:0xb9a17a),7,4);
 }
}
function chair(x,z,yaw){
 frame(x,0,z,yaw,()=>{
  shadow(0,0,.80,.84,.44,.011);
  for(const side of [-1,1])for(const end of [-1,1]){
    const rear=end>0;beam([side*.217,.014,end*.214],[side*.171,rear?.98:.466,end*(rear?.239:.168)],.049,.046,WALNUT,.010);
  }
  box(0,.462,.001,.46,.071,.45,OAK,.022);
  for(const y of [.70,.78,.90])box(0,y,.216,.362,.065,.038,shade(OAK,.85),.012);
  for(const s of [-1,1])beam([s*.193,.206,-.191],[s*.193,.206,.198],.027,.032,OAK,.003);
  folded(.028,.498,.008,.34,.041,.33,GREEN);
  obstacle(0,0,.49,.51);
 });
}
function desk(){
 group("tea and ledger");frame(2.91,0,5.23,-Math.PI/2,()=>{
  const w=1.71,d=.81,y=.838;
  shadow(0,.05,2.1,1.25,.46,.012);
  for(const s of [-1,1])for(const e of [-1,1]){
   box(s*(w/2-.114),.408,e*(d/2-.097),.102,.817,.11,WALNUT,.011);
   box(s*(w/2-.114),.119,e*(d/2-.097),.119,.069,.127,OAK,.01);
  }
  for(const e of [-1,1])box(0,.725,e*.313,1.53,.146,.061,OAK,.014);
  box(0,.212,-.307,1.39,.084,.061,OAK,.009);
  for(let i=0;i<4;i++)box(0,y-.038,-d*.5+(i+.5)*d/4,w,.076,d/4-.004,shade(OAK,rand(.89,1.06)),.012);
  for(const s of [-1,1]){box(s*.35,.724,.352,.654,.112,.020,WALNUT,.008);hoop([s*.35,.719,.381],[.047,0,0],[0,.023,0],.008,BRASS,14,5);}
  openBook(.05,y+.001,.075,.46,.29,-.10);
  mug(-.46,y,.097,.93,CELADON,-.35);jar(-.62,y,-.194,.087,.129,mat(12,0xa9ac81));
  label(-.620,y+.075,-.108,.122,.059,TEALABEL);
  lantern(.60,y,-.157,.77);
  const inkPot=mat(12,0x45605a);bottle(.39,y,.117,.047,.082,inkPot);
  cylinder([.191,y+.006,.236],[.44,y+.020,.167],.007,.006,WALNUT,8);
  cylinder([.186,y+.006,.238],[.199,y+.007,.234],.001,.007,BRASS,7);
  closedBook(-.22,y,-.21,.215,.045,.29,mat(11,0x80917b),.12);
  obstacle(0,0,w+.02,d);
  chair(.015,.89,.13);
  // Opposite the window, a narrow shelf holds two already-read volumes.
  box(0,1.71,-.431,1.61,.078,.24,OAK,.012);
  for(const s of [-1,1])beam([s*.57,1.48,-.53],[s*.57,1.68,-.333],.042,.050,IRON,.003);
  closedBook(-.43,1.753,-.429,.31,.057,.177,LEATHER,-.05);
  closedBook(-.42,1.811,-.426,.275,.047,.169,mat(11,0x738b7d),.06);
  jar(.56,1.751,-.429,.072,.16,CELADON,false);
  plantSprigs(.56,1.89,-.429,.71);
 });
 lamp([2.86,1.27,5.84],4.8,[2.6,1.45,.58],0);
}
function bedroomObjects(){
 bed();desk();group("quarters belongings");
 runner(-.30,6.33,1.02,3.90);
 trunk(-2.20,7.97,1.32,.52,.43);folded(-2.49,.470,7.96,.58,.11,.36,mat(7,0xa2a18a));
 boot(-1.21,7.08,.19);boot(-1.02,7.12,.31);
 frame(-2.36,0,4.23,0,()=>{
  shadow(0,0,1.0,.87,.45,.01);
  for(const x of [-.253,.253])for(const z of [-.196,.196])box(x,.29,z,.055,.58,.055,WALNUT,.006);
  box(0,.49,0,.61,.22,.46,shade(OAK,.91),.020);
  box(0,.62,0,.69,.055,.54,OAK,.012);stud(0,.50,.242,.023,BRASS);
  closedBook(-.10,.650,.043,.24,.039,.28,LEATHER,-.15);
  jar(.16,.649,-.068,.093,.179,CELADON,false);plantSprigs(.16,.802,-.068,.83);
  obstacle(0,0,.69,.55);
 });
 picture(-1.54,1.78,2.852,.90,.678,PORTRAIT,OAK,.049);
 // The herb drying rail and used apron are just inside the entrance.
 frame(-2.48,0,9.27,Math.PI,()=>{
  box(0,1.61,.10,1.15,.123,.075,OAK,.015);
  for(const x of [-.43,-.16,.16,.43])peg(x,1.61,.12);
  hangingCloth(-.18,1.64,.255,.39,.84,LINEN);
  hoop([.31,1.51,.32],[.077,0,0],[0,.142,0],.014,LEATHER,18,6);
 });
 frame(3.44,0,7.92,-Math.PI/2,()=>{
  box(0,1.64,.054,1.23,.142,.084,WALNUT,.015);
  for(const x of [-.45,-.15,.15,.45])peg(x,1.65,.08,.14);
  hangingCloth(-.28,1.69,.170,.49,.98,GREEN);
  hangingCloth(.38,1.67,.17,.19,.58,MADDER);
  smallBasket(.05,.012,.22,.231,.31);folded(.05,.260,.22,.26,.11,.23,LINEN);obstacle(.05,.22,.43,.45);
 });
 box(.56,.008,2.73,1.76,.026,.21,shade(FLAG,1.02),.012);
}

