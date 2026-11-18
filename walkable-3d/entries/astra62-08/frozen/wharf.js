'use strict';
const PX0=-5.66,PX1=-3.20,PZ0=2.70,PZ1=13.05;
function peg(x,y,z,r=.014,mat=IRON,c='#51524a'){cyl([x,y-.006,z],[x,y+.003,z],r,c,mat,r>.025?9:6)}
function pile(x,z,top,r=.17,slight=0){
 const bottom=landY(x,z)-.5;
 const levels=[bottom,...[-.22,.22,.59,.91].filter(v=>v>bottom+.04&&v<top-.05),top],colors=['#566257','#5d6657','#686b55','#78745e','#8b7e68'];
 for(let j=0;j<levels.length-1;j++){
  const lo=levels[j],hi=levels[j+1],f=sm(bottom,top,lo),g=sm(bottom,top,hi);
  cyl([x+slight*f,lo,z],[x+slight*g,hi,z],r*(1-.07*f),pick(hi<=.61?['#565d4c','#586150','#64664f']:[colors[Math.min(4,j+1)],'#847b64']),WOOD,12,r*(1-.07*g))
 }
 if(top>DECK+.24){
  cyl([x+slight,top-.105,z],[x+slight,top+.003,z],r*.945,'#bcb598',PAINT,12);
  peg(x+slight,top+.008,z,.026,IRON,'#626359')
 }
 if(bottom<.82)for(let i=0;i<18;i++){
  const a=range(0,TAU),y=range(.06,.77),s=range(.010,.029);if(y<bottom)continue;
  ellipse([x+Math.cos(a)*r*.99,y,z+Math.sin(a)*r*.99],[s,s*.74,s],pick(['#9f9d83','#b0ae97','#8f9077']),STONE,5,2)
 }
}
function cleat(x,y,z,yaw=0,s=1){
 const f=(u,v,w)=>[x+s*(u*Math.cos(yaw)-w*Math.sin(yaw)),y+s*v,z+s*(u*Math.sin(yaw)+w*Math.cos(yaw))];
 box(f(0,.021,0),[.31*s,.04*s,.155*s],'#40504e',IRON,yaw,.012);
 for(const t of [-1,1]){
  cyl(f(t*.075,.028,0),f(t*.085,.137,0),.031*s,'#536460',IRON,9,.037*s);
  peg(...f(t*.118,.041,0),.018*s,IRON,'#8f9182')
 }
 tube([f(-.236,.162,0),f(-.135,.139,0),f(0,.136,0),f(.135,.139,0),f(.236,.162,0)],[.016*s,.036*s,.04*s,.036*s,.016*s],'#66706a',IRON,10)
}
function ringTube(c,horizontal,vertical,rx,ry,r,color,mat=ROPE,arc0=0,arc1=TAU,s=48){
 let pts=[];for(let i=0;i<=s;i++){const a=mix(arc0,arc1,i/s);pts.push(vadd(c,vadd(vmul(horizontal,rx*Math.cos(a)),vmul(vertical,ry*Math.sin(a)))))}tube(pts,r,color,mat,8,{cap:arc1-arc0<TAU-.01})
}
function lifeRing(c,horiz=X,out=Z,s=1){
 const pp=(u,v,w)=>vadd(c,vadd(vmul(horiz,u*s),vadd([0,v*s,0],vmul(out,w*s))));
 ringTube(c,horiz,Y,.315*s,.318*s,.079*s,'#bf6241',CLOTH);
 for(let k=0;k<4;k++){
  const mid=PI*.25+k*PI*.5;
  ringTube(pp(0,0,.003),horiz,Y,.315*s,.318*s,.0815*s,'#ddd5b6',CLOTH,mid-.188,mid+.188,7)
 }
 const cordPts=[];
 for(let i=0;i<=64;i++){
  const a=i/64*TAU,ra=.405-.033*Math.cos(a*4-PI);
  cordPts.push(pp(Math.cos(a)*ra,Math.sin(a)*ra,.064))
 }
 tube(cordPts,.0095*s,'#c2ac82',ROPE,6);
 cyl(pp(0,.27,-.04),pp(0,.42,-.04),.018*s,'#646760',IRON,8)
}
function deckAndPier(){
 // Apron boards run out from the open shop front. Each has a bevel, end grain and fastenings.
 for(let i=0;i<53;i++){
  const step=10.47/53,x=-7.30+(i+.5)*step;
  beam([x,DECK-.064,.075],[x,DECK-.064,2.72],step-.008,.128,pick(dockwood),WOOD,.007);
  for(const z of [.26,1.42,2.55])for(const dx of [-.048,.048])peg(x+dx,DECK+.001,z+range(-.008,.008),.009)
 }
 for(let i=0;i<13;i++){
  const step=2.22/13,x=.95+(i+.5)*step;
  beam([x,DECK-.063,-3.2],[x,DECK-.063,.075],step-.007,.126,pick(dockwood),WOOD,.006)
 }
 for(const x of [-7.04,-4.45,-1.4,2.86])for(const z of [.32,2.42])pile(x,z,DECK-.25,.17);
 beam([-7.32,DECK-.18,2.65],[3.18,DECK-.18,2.65],.19,.29,'#867a63',WOOD,.012);
 for(const z of [.27,1.46])beam([-7.3,DECK-.20,z],[3.18,DECK-.20,z],.17,.26,'#786f5c');
 const pairs=[3.03,5.38,7.88,10.37,12.82];
 for(const [idx,z] of pairs.entries())for(const x of [PX0+.08,PX1-.08]){
  const top=idx===0?DECK+.59:DECK+(idx===4?.76:.65);
  pile(x,z,top,.135,range(-.016,.016));obb(x,z,.23,.23,0,-4,top)
 }
 for(const x of [PX0+.08,PX1-.08,(PX0+PX1)*.5]){
  beam([x,DECK-.212,PZ0-.06],[x,DECK-.212,PZ1+.07],.17,.265,'#817663',WOOD,.012)
 }
 for(let i=0;i<48;i++){
  const step=(PZ1-PZ0)/48,z=PZ0+(i+.5)*step,jit=range(-.012,.01);
  beam([PX0-.038+jit,DECK-.063,z],[PX1+.04+jit,DECK-.063,z],step-.011,.126,pick(dockwood),WOOD,.009);
  for(const x of [PX0+.28,PX1-.28])for(const dz of [-.055,.055])peg(x+range(-.01,.01),DECK+.001,z+dz,.0105)
 }
 // Framing and diagonal storm braces remain visible from the strand.
 for(let j=0;j<pairs.length-1;j++)for(const x of [PX0+.12,PX1-.12]){
  const a=pairs[j],b=pairs[j+1];
  beam([x,Math.max(.36,landY(x,a)+.04),a],[x,DECK-.36,b],.085,.145,'#726b54',WOOD,.006);
  if(j===1||j===3)beam([x-.075,DECK-.36,a],[x-.075,Math.max(.32,landY(x,b)+.025),b],.075,.135,'#7c735c',WOOD,.006)
 }
 for(let j=0;j<pairs.length-1;j++){
  const a=pairs[j],b=pairs[j+1],cx=PX0+.08;
  cord([cx,DECK+.53,a],[cx,DECK+.53,b],.16,.023,'#a8916e');
  if(j!==2)cord([PX1-.08,DECK+.48,a],[PX1-.08,DECK+.48,b],.15,.021,'#aa9168');
 }
 cord([PX0+.08,DECK+.60,12.82],[PX1-.08,DECK+.60,12.82],.13,.027,'#b09d78');
 for(const x of [PX0+.065,PX1-.065])beam([x,DECK+.056,PZ0+.4],[x,DECK+.056,PZ1-.18],.094,.115,'#948872',WOOD,.009);
 beam([PX0,DECK+.057,PZ1-.036],[PX1,DECK+.057,PZ1-.036],.10,.115,'#a69a7e');
 cleat(PX1-.24,DECK,8.28,PI/2,1.18);coil(PX1-.51,DECK+.004,8.99,.26,.37,5,'#a2895f',.30);
 cleat(PX0+.30,DECK,12.39,PI/2,1.08);
 coil(PX0+.64,DECK+.004,11.88,.28,.31,4.4,'#a58f6b',-.2);
 for(const x of [PX0+.15,PX1-.15]){
  // Zinc rub plates with square-headed fixings on the seaward beam.
  box([x,DECK-.18,PZ1+.03],[.21,.20,.022],'#62726d',IRON,0,.009);
  cyl([x,DECK-.18,PZ1+.04],[x,DECK-.18,PZ1+.07],.035,'#8d8f7b',IRON,6)
 }
 const lx=PX0-.15;
 for(const z of [10.92,11.39]){
  tube([[lx-.08,.23,z],[lx-.08,DECK+.46,z],[lx-.058,DECK+.54,z],[lx+.04,DECK+.57,z],[lx+.15,DECK+.52,z],[lx+.17,DECK+.34,z]],.029,'#81948d',IRON,9)
 }
 for(let y=.44;y<DECK+.03;y+=.28)cyl([lx-.08,y,10.92],[lx-.08,y,11.39],.022,'#7c8b80',IRON,8);
 // A fixed tide staff is screwed to the inner face of the outside piling.
 const tx=PX1+.064,tz=10.37;
 box([tx,1.29,tz],[.042,2.34,.147],'#d1caae',PAINT);
 for(let k=0;k<23;k++){
  const y=.18+k*.1;
  box([tx+.024,y,tz-.027],[.008,.022,k%5===0?.13:k%2===0?.088:.054],k%10<5?'#965346':'#384e50',PAINT)
 }
 sign('2',[tx+.030,2.24,tz+.025],[0,0,-1],Y,.083,.088,{ink:'#303f41',bold:true});
 // Fenders suspended where a hull would meet the wharf at high water.
 for(const z of [5.78,9.89]){
  const x=PX1+.13;
  cord([PX1-.02,DECK+.39,z-.16],[x+.05,1.50,z],.035,.013,'#978b6d');
  ellipse([x+.05,1.17,z],[.108,.33,.11],'#b7ac89',CLOTH,12,8);
  for(const yy of [.98,1.33])ringTube([x+.05,yy,z],X,Z,.096,.098,.012,'#817961',ROPE)
 }
 // Keep the apron edges legible without walling off the water view.
 for(const [a,b] of [[-7.1,PX0-.07],[PX1+.08,.15],[.15,3.01]]){
  for(const x of [a,b]){box([x,DECK+.39,2.61],[.12,.79,.13],'#8a8069',WOOD,0,.011)}
  beam([a,DECK+.79,2.61],[b,DECK+.79,2.61],.124,.095,'#a59a81',WOOD,.014);
  beam([a,DECK+.37,2.61],[b,DECK+.37,2.61],.080,.07,'#847b67');
 }
 for(const z of [.32,2.59])box([-7.14,DECK+.37,z],[.14,.79,.14],'#938570',WOOD);
 beam([-7.14,DECK+.8,.22],[-7.14,DECK+.8,2.69],.12,.10,'#a39a81');
 // Pitched shore gangway and handrails. The board ends follow its gradient.
 const rxs=[RAMP0,RAMP0+2.56,RAMP0+5.18,RAMP1-.06];
 for(const z of [RZ0+.08,RZ1-.08]){
  beam([RAMP0,rampY(RAMP0)-.157,z],[RAMP1,rampY(RAMP1)-.157,z],.15,.20,'#837b62',WOOD,.008);
  for(const x of rxs){
   const low=landY(x,z)-.19;
   beam([x,low,z],[x,rampY(x)+.81,z],.115,.133,'#8e826b',WOOD,.008);
   cyl([x-.076,rampY(x)+.58,z],[x+.076,rampY(x)+.58,z],.025,'#69736c',IRON,6)
  }
  beam([RAMP0-.04,rampY(RAMP0)+.82,z],[RAMP1+.05,rampY(RAMP1)+.82,z],.125,.097,'#ae9d80',WOOD,.016);
  beam([RAMP0,rampY(RAMP0)+.39,z],[RAMP1,rampY(RAMP1)+.39,z],.066,.095,'#8d856f',WOOD,.009)
 }
 for(let i=0;i<10;i++){
  const w=(RZ1-RZ0)/10,z=RZ0+(i+.5)*w,c=pick(dockwood);
  beam([RAMP0-.012,rampY(RAMP0)-.052,z],[RAMP1+.01,rampY(RAMP1)-.052,z],w-.007,.101,c,WOOD,.006)
 }
 for(let i=0;i<16;i++){
  const x=RAMP0+.27+i*.49,y=rampY(x);
  beam([x,y+.017,RZ0+.14],[x,y+.017,RZ1-.14],.066,.035,'#a9997a',WOOD,.006);
  for(const z of [RZ0+.31,RZ1-.31])peg(x,y+.037,z,.009)
 }
 // Gravel landing beyond the ramp foot. Scree makes the footing readable at both ends.
 for(let i=0;i<23;i++){const x=range(RAMP1+.08,RAMP1+.7),z=range(RZ0-.23,RZ1+.23),r=range(.04,.15);stone(x,landY(x,z)+.005,z,r,r*.25,r*.8)}
 for(const x of [1.14,3.02])box([x,DECK+.39,-3.07],[.13,.8,.13],'#968b72',WOOD);
 beam([1.0,DECK+.81,-3.07],[3.1,DECK+.81,-3.07],.12,.096,'#a69b82');
 beam([3.06,DECK+.81,-3.09],[3.06,DECK+.81,RZ0-.02],.12,.096,'#a69b82');
}
