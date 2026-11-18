'use strict';
function windowLinen(){
 group(-3.566,0,3.414,PI/2,()=>{
  const col=0xdacdb0,border=0x9e7761;
  rod([-1.16,2.407,.095],[1.16,2.407,.095],.017,.017,C.brass,M.metal,12);
  for(const s of [-1,1]){
   ball(s*1.166,2.407,.095,.030,.027,.027,C.brass,M.metal,12,6);
   rod([s*1.02,2.40,-.07],[s*1.02,2.40,.111],.011,.011,C.brass,M.metal,8);
   const cols=20,rows=18;
   const pt=(i,j)=>{
    const u=i/cols,v=j/rows,tie=Math.exp(-((v-.57)**2)/.019);
    const width=.381-.261*tie+.048*v,xx=s*(1.008-u*width-.030*Math.sin(v*PI));
    const folds=Math.cos(u*TAU*4+.25*Math.sin(v*5));
    return [xx,2.365-v*(.831+.042*Math.sin(u*PI)+.016*Math.cos(u*TAU*4)),.100+(.034+.015*v-.020*tie)*folds+.038*v*v+.038*tie]
   };
   for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){
    const q=[pt(i,j),pt(i+1,j),pt(i+1,j+1),pt(i,j+1)];const c=i===1||i===18?border:i===3||i===16?0xb29a7c:col;
    poly(q,c,M.linen,null,[[i/cols,j/rows],[((i+1)/cols),j/rows],[(i+1)/cols,(j+1)/rows],[i/cols,(j+1)/rows]])
   }
   for(let k=0;k<=5;k++)group(s*(1.005-k*.074),2.382,.096,0,()=>{pathTube(Array.from({length:13},(_,i)=>[0,.032*Math.cos(i*TAU/13),.026*Math.sin(i*TAU/13)]),.004,C.brass,M.metal,6,true)});
   pathTube([pt(0,10),V.add(pt(10,10),[0,-.017,.034]),pt(20,10)],.008,0x9b855c,M.linen,7);
   pathTube([pt(20,10),V.add(pt(17,10),[s*.023,-.063,.035]),V.add(pt(18,10),[s*.014,-.107,.026])],.006,0xa08b62,M.linen,6)
  }
 });
 group(-3.595,0,3.61,PI/2,()=>{
  const n=15,w=2.79/n;for(let i=0;i<n;i++){
   const x=(i-(n-1)/2)*w,y=1.052;box(x,y,0,w-.004,.158,.033,pick([0xc6c7ad,0xd6cbb1,0xccceb7]),M.pot,.005);
   if(i%2===0){
    const pts=[[x,y+.052,.018],[x+.044,y,.018],[x,y-.052,.018],[x-.044,y,.018]];
    poly(pts,0x708a82,M.pot);poly(pts.map(p=>[x+(p[0]-x)*.63,y+(p[1]-y)*.63,.019]),0xcacbb0,M.pot);
    for(let k=0;k<4;k++){const a=k*PI/2,one=(r,side)=>[x+Math.cos(a)*r-Math.sin(a)*side,y+Math.sin(a)*r+Math.cos(a)*side,.02];poly([one(.002,0),one(.014,.007),one(.029,0),one(.014,-.007)],0x839889,M.pot)}
   }else{for(const s of [-1,1])poly([[x-.023,y+s*.04,.018],[x,y+s*.055,.018],[x+.023,y+s*.04,.018],[x,y+s*.045,.018]],0x8d9d87,M.pot)}
  }
 });
 group(-2.24,0,3.64,PI/2,()=>rug(0,0,2.05,.62,0x94624d));
}
function copperRack(){
 group(-3.539,0,4.97,PI/2,()=>{
  rod([-.423,1.979,.041],[.445,1.979,.041],.015,.015,C.iron,M.metal,10);
  for(const s of [-1,1])rod([s*.374,1.979,-.084],[s*.374,1.979,.058],.012,.012,C.iron,M.metal,8);
  for(let i=0;i<2;i++){
   const x=(i-.5)*.415,y=1.445+i*.068,r=.169-i*.035;
   pathTube([[x,1.99,.043],[x,1.981,.077],[x,1.93,.092],[x,1.919,.102]],.007,C.brass,M.metal,7);
   group(x,y,.096,0,()=>{
    box(0,.296-i*.037,0,.035,.405-i*.064,.022,0x695540,M.wood,.008);
    for(let j=0;j<2;j++)ball(0,.137+j*.044,.018,.008,.008,.004,C.brass,M.metal,8,5);
    group(0,0,0,0,()=>{latheScaled(0,0,0,[[.69,0],[.82,.1],[.96,.79],[1,.93],[.98,1],[.90,.95],[.79,.34],[.66,.21]],r,.061,i?0x8c8d7f:0xb78257,M.metal,28);
     hoop(0,.056,0,r*.985,.004,0xc3a57a,M.metal,28)},PI/2)
   })
  }
 })
}
function feltHat(){
 group(2.969,1.885,.278,-.18,()=>{
  const rings=[[.301,0,0,.01],[.307,.010,0,.01],[.238,.023,-.003,0],[.159,.041,0,0],[.148,.065,0,0],[.132,.142,-.011,.003],[.112,.215,-.033,.012],[.084,.283,-.070,.017],[.058,.332,-.119,.02],[.037,.354,-.177,.028],[.021,.348,-.224,.031],[.003,.326,-.253,.035]];
  const n=32,cols=[0x66505d,0x79606b,0x7d6571,0x705c69,0x6d5966,0x77616e,0x7e6572,0x826a77,0x7a6570,0x75616f,0x75636e];
  const p=(i,j)=>{const a=TAU*i/n,[r,h,dx,dz]=rings[j],v=j<4?.019*(1-j/4)*Math.sin(a*3+.38)+.010*Math.sin(a*2):.004*Math.sin(a*2);return [dx+r*Math.cos(a),h+v,dz+r*.85*Math.sin(a)]};
  newUV();for(let j=0;j<rings.length-1;j++)for(let i=0;i<n;i++){const k=(i+1)%n;poly([p(i,j),p(i,j+1),p(k,j+1),p(k,j)],cols[j],M.linen,null,[[i/n,rings[j][1]],[i/n,rings[j+1][1]],[(i+1)/n,rings[j+1][1]],[(i+1)/n,rings[j][1]]])}
  pathTube(Array.from({length:n},(_,i)=>p(i,1)),.004,0x9a8083,M.linen,6,true);
  for(let i=0;i<n;i++){const at=(t,y)=>{const a=t*TAU/n,r=.149-(y-.064)*.22;return [-.002+r*Math.cos(a),y,r*.86*Math.sin(a)]};
   poly([at(i,.069),at(i,.107),at(i+1,.107),at(i+1,.069)],0x6c503e,M.wood)}
  box(-.016,.090,.126,.047,.033,.009,0xb79c66,M.metal,.004);box(-.016,.090,.133,.029,.016,.005,0x705441,M.linen,.002)
 },.44,-.07);
 rod([2.966,1.80,.103],[2.966,1.85,.284],.023,.021,C.oak,M.wood,9);
}
function gardeningDetails(){
 // A porcelain thermometer and a rack of hand-cut rooting labels.
 group(6.077,1.52,-2.754,-PI/2,()=>{
  box(0,0,0,.074,.402,.026,0xd1cbb1,M.pot,.008);box(0,0,.016,.009,.301,.007,0xabaca0,M.glass,.002);box(0,-.069,.021,.004,.151,.003,0xa76550,M.pot,0);ball(0,-.149,.021,.011,.012,.008,0x9a5f50,M.pot,9,5);
  for(let j=0;j<21;j++)box(.013,-.126+j*.014,.016,j%5===0?.019:.009,.002,.002,0x747a68,M.metal,0);
  for(const s of [-1,1])ball(0,s*.181,.016,.005,.005,.002,C.brass,M.metal,7,4)
 });
 group(4.37,1.65,-4.58,0,()=>{box(0,0,0,.57,.177,.034,0x758675);box(0,0,.023,.485,.107,.014,0xcbc4a5,M.pot,.005);panel(0,0,.031,.47,.094,31)});
}
function finishCottage(){windowLinen();copperRack();feltHat();gardeningDetails()}
