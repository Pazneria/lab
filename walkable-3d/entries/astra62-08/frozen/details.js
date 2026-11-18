'use strict';
function finishDetails(){
 mesh=nearMesh;
 // Stone piers bed the sill into the sloping bank. A continuous skirt would trap seawater.
 for(const x of [WX0+.16,WX1-.16])for(const z of [WZ0+.18,-3.85,-1.83,WZ1-.17]){
  const bottom=landY(x,z)-.12,top=DECK-.22,n=Math.max(1,Math.ceil((top-bottom)/.31));
  for(let k=0;k<n;k++){
   const h=(top-bottom)/n,yy=bottom+(k+.5)*h,scale=1.08-.12*k/n;
   for(let j=0;j<2;j++){
    const zz=z+(j-.5)*.30*scale;
    box([x+range(-.015,.015),yy,zz],[.46*scale,h-.009,.305*scale-.006],tint(pick(rockColors),.87+.07*k/n),STONE,range(-.022,.022),.029)
   }
  }
  box([x,top+.028,z],[.51,.06,.67],'#8c8b7a',STONE,0,.017)
 }
 for(const x of [WX0+.13,WX1-.13])beam([x,DECK-.181,WZ0-.04],[x,DECK-.181,WZ1+.04],.23,.218,'#796f58',WOOD,.010);
 // Exposed schist breaks into flat, tilted layers amongst the rounded shingle.
 function ledge(x,z,rx,rz,ht,yaw){
  const base=landY(x,z)-.10,angle=range(0,TAU),N=10,cs=Math.cos(yaw),sn=Math.sin(yaw),ring=[];
  for(let j=0;j<N;j++){
   const a=angle+j/N*TAU,rr=range(.85,1.08);
   ring.push([Math.cos(a)*rx*rr,Math.sin(a)*rz*rr])
  }
  const tiltX=range(-.081,.085),tiltZ=range(-.045,.07),P=(u,v,w)=>[x+cs*u-sn*w,base+v+tiltX*u+tiltZ*w,z+sn*u+cs*w],slope=norm([-tiltX,1,-tiltZ]);
  const layers=[[.00,.94],[.23,1.03],[.295,1.005],[.36,1.03],[.67,.97],[.76,.923],[.83,.94],[1,.81]];
  for(let k=0;k<layers.length-1;k++){
   const [a,ra]=layers[k],[b,rb]=layers[k+1];
   for(let j=0;j<N;j++){
    const p=ring[j],q=ring[(j+1)%N],col=k===1?'#b1ac92':k===5?'#898f7b':pick(['#83877c','#7d837c','#898a7d','#919184']);
    quad(P(p[0]*ra,a*ht,p[1]*ra),P(p[0]*rb,b*ht,p[1]*rb),P(q[0]*rb,b*ht,q[1]*rb),P(q[0]*ra,a*ht,q[1]*ra),col,STONE)
   }
  }
  const coords=ring.map(([u,w])=>P(u*.81,ht,w*.81)),center=P(0,ht+.007,0);
  for(let i=0;i<N;i++){
   const p=coords[i],q=coords[(i+1)%N],id=mesh.v.length/13;
   for(const v of [center,q,p])mesh.vertex(v,slope,[v[0]*1.23,v[2]],'#95988b',STONE);mesh.i.push(id,id+1,id+2)
  }
  // Pale mineral streak and a few barnacle chimneys on the upper tidal face.
  const vein=[];for(let j=0;j<8;j++){const t=j/7;vein.push(P(mix(-rx*.58,rx*.52,t),ht+.011,rz*(.16*Math.sin(t*6.1)+.09*t)))}
  for(let i=1;i<vein.length;i++){const a=vein[i-1],b=vein[i],off=[0,0,.005+.004*Math.sin(i)];quad(vsub(a,off),vsub(b,off),vadd(b,off),vadd(a,off),'#b8b7a1',STONE,null,slope)}
  for(let k=0;k<12;k++){
   const u=range(-.54,-.03)*rx,w=range(-.28,.27)*rz,p=P(u,ht+.003,w),r=range(.008,.026);
   cyl(p,vadd(p,[.003,r*.72,0]),r,pick(['#aaa68d','#b0ad96','#c3bca1']),STONE,7,r*.52);
   cyl(vadd(p,[.003,r*.72,0]),vadd(p,[.003,r*.76,0]),r*.29,'#798072',STONE,6)
  }
  if(ht>.36)obb(x,z,rx*1.65,rz*1.58,yaw,base,base+ht)
 }
 for(const args of [[.34,8.46,.82,.37,.265,-.22],[-.44,7.52,.65,.30,.287,.24],[13.9,8.60,.88,.46,.28,.48],[14.33,7.76,.63,.31,.327,.41],[-8.43,6.58,.84,.34,.422,-.7],[15.55,4.82,.98,.49,.50,.4]])ledge(...args);
 // A metric gauge and rope hitches give the drop from deck to low water a visible scale.
 for(const [v,text] of [[.52,'0.5'],[1.02,'1'],[1.52,'1.5']])sign(text,[PX1+.094,v,10.390],[0,0,-1],Y,.073,.057,{ink:'#3a4a45',bold:true});
 for(const z of [5.38,7.88,10.37,12.82])for(const x of [PX0+.08,PX1-.08]){
  const y=DECK+(x<PX0+.20?.53:.48),rr=.134;
  const pts=[];for(let k=0;k<=32;k++){const t=k/32,a=t*TAU*1.45;pts.push([x+rr*Math.cos(a),y+.025+t*.037,z+rr*Math.sin(a)])}
  tube(pts,.016,'#a48e65',ROPE,7)
 }
 // Small sign on the uphill handrail, readable from the pier.
 const sx=RAMP0+.67,sy=rampY(sx)+.755,sz=RZ0+.147;
 box([sx,sy,sz],[.81,.165,.036*1.1],'#55756b',PAINT,0,.009);
 sign('SHORE   →',[sx,sy,sz+.022],X,Y,.652,.085,{ink:'#e2d8b5',bold:true});
 for(const xx of [sx-.365,sx+.365])cyl([xx,sy,sz+.017],[xx,sy,sz+.024],.010,'#9e9d86',IRON,6);
 // A builder's half model, carved lifts showing the shape of the working boat.
 const plaque=[-2.80,5.045,WZ0+.282],wide=1.81;
 box(plaque,[wide,.429,.073],'#775f45',WOOD,0,.018);
 for(const yy of [-.165,.165])for(const xx of [-.84,.84])cyl(vadd(plaque,[xx,yy,.035]),vadd(plaque,[xx,yy,.045]),.012,'#a59367',BRASS,7);
 const mu=(u,t)=>{
  const p=hullPoint(u,t,1),localU=(p[0]-BOAT_X)*boatX[0]+(p[2]-BOAT_Z)*boatX[2],localZ=(p[0]-BOAT_X)*boatZ[0]+(p[2]-BOAT_Z)*boatZ[2];
  return [plaque[0]+localU*.291,plaque[1]+(p[1]-BOAT_BASE-.52)*.274,plaque[2]+.041+localZ*.278]
 };
 const cols=['#aa8860','#bd9c70','#ae8b60','#c4a77c','#b49668','#c7ab7f'];
 for(let j=0;j<6;j++)for(let k=0;k<27;k++){
  const u=mix(loft[0][0],loft.at(-1)[0],k/27),v=mix(loft[0][0],loft.at(-1)[0],(k+1)/27),a=j/6,b=(j+1)/6;
  quad(mu(u,a),mu(v,a),mu(v,b),mu(u,b),cols[j],WOOD)
 }
 // Waxed sailmaker's palm, a corked oil bottle and a used brush at the end of the bench.
 // A wall-mounted stock rack keeps the long spruce and oak clear of the damp ground.
 for(const z of [-4.76,-3.36]){
  const wall=WX1+.090;
  for(const h of [2.92,3.24]){
   beam([wall,h,z],[wall+.32,h,z],.044,.035,'#59675b',IRON,.003);
   beam([wall,h-.19,z],[wall+.255,h-.018,z],.027,.024,'#6c786b',IRON,.002);
   box([wall+.009,h-.065,z],[.029,.275,.076],'#697568',IRON);
   cyl([wall,h+.041,z],[wall+.033,h+.041,z],.015,'#8f917c',IRON,6)
  }
 }
 for(let j=0;j<3;j++){
  const h=2.962+j*.046,x=WX1+.251,za=-5.44+.09*j,zb=-2.72-.07*j;
  beam([x,h,za],[x,h,zb],.218,.041,pick(['#ae986f','#ac9166','#b7a27a']),WOOD,.003)
 }
 for(let j=0;j<2;j++)cyl([WX1+.19+j*.10,3.298,-5.60+j*.18],[WX1+.19+j*.10,3.304,-2.68+j*.09],.034,'#beaa81',WOOD,11,.031);
 obstacle(WX1+.06,WX1+.43,-5.62,-2.56,2.65,3.35);
 // A shop-made marking gauge rides beside the left-hand bench dog.
 const gauge=[.193,DECK+.965,-2.95];
 box(gauge,[.088,.061,.064],'#a98857',WOOD,.29,.006);
 beam(vadd(gauge,[-.062,.006,-.13]),vadd(gauge,[.045,.006,.112]),.020,.020,'#ae946a',WOOD,.002);
 cyl(vadd(gauge,[0,.030,0]),vadd(gauge,[0,.045,0]),.012,'#aa9769',BRASS,8);
 const by=DECK+.939;
 const ox=.62,oz=-1.81;
 tube([[ox,by+.015,oz],[ox,by+.128,oz],[ox,by+.158,oz],[ox,by+.186,oz]],[.042,.042,.023,.019],'#657564',GLASS,12);
 cyl([ox,by+.180,oz],[ox,by+.206,oz],.018,'#a58d65',WOOD,9);
 sign('OIL',[ox,by+.083,oz+.043],X,Y,.062,.031,{ink:'#e4d9b3',bold:true});
 const a=[.274,by+.011,-1.73],b=[.44,by+.016,-1.89],vs=norm(vsub(b,a)),side=norm(cross(vs,Y));
 beam(a,b,.020,.016,'#b08c5c',WOOD,.005);
 const q=vadd(b,vmul(vs,.042)),end=vadd(q,vmul(vs,.049));
 beam(b,q,.049,.018,'#91988b',IRON,.003);
 for(let j=0;j<14;j++){
  const off=vmul(side,(j/13-.5)*.048);
  tube([vadd(q,off),vadd(end,vadd(vmul(vs,range(-.007,.004)),vmul(off,.97)))],[.0027,.0020],pick(['#a39979','#9b9070','#b0a687']),CLOTH,4)
 }
}
