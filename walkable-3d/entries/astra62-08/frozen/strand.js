'use strict';
function strandDetails(){
 mesh=nearMesh;
 // Drift collected just above the wash, settled into the strand at one end.
 for(const [cx,cz,len,yaw,r] of [[12.6,6.68,1.18,-.24,.061],[-.71,4.52,1.57,.27,.083],[13.96,5.34,.94,-.51,.043],[-7.70,5.63,.67,.64,.045]]){
  const yy=landY(cx,cz),ax=[Math.cos(yaw),0,Math.sin(yaw)],p=(u,v,w)=>[cx+ax[0]*u-ax[2]*w,yy+v,cz+ax[2]*u+ax[0]*w];
  const pts=[p(-len*.5,.034,0),p(-len*.24,r*.89,.015),p(len*.15,r,.006),p(len*.5,r*.7,.041)];
  tube(pts,[r*.65,r,r*.86,r*.36],'#a49c85',WOOD,10);
  tube([p(-len*.12,r*.94,.012),p(-len*.20,r*2.1,-.063),p(-len*.26,r*2.5,-.097)],[r*.42,r*.3,r*.13],'#aaa08a',WOOD,8)
 }
 // Salt-tolerant thrift and grass favor fissures above the high-water rocks.
 for(const [x,z,r] of [[15.96,4.3,1.44],[-9.68,1.96,1.2],[13.8,-.88,1.0],[-8.16,-1.66,1.14],[18.1,1.4,1.9]]){
  for(let i=0;i<16;i++){
   const a=range(0,TAU),d=range(.12,r),xx=x+Math.cos(a)*d,zz=z+Math.sin(a)*d,y=landY(xx,zz);
   grassClump(xx,zz,range(.48,.95),Math.floor(range(9,19)));
   if(i%3===0)for(let j=0;j<4;j++){
    const px=xx+range(-.085,.085),pz=zz+range(-.064,.064),p=[px,y+range(.14,.29),pz];
    cyl([xx,y+.013,zz],p,.0025,'#7f845c',GRASS,4);
    ellipse(p,[.021,.022,.02],pick(['#b99098','#c1a1a4','#b3969f']),GRASS,7,4)
   }
  }
 }
 // Perched herring gull, built from body masses and overlapping tapered primaries.
 function gull(x,y,z,a,s){
  const ex=[Math.cos(a),0,Math.sin(a)],ez=[-Math.sin(a),0,Math.cos(a)],P=(u,v,w)=>vadd([x,y+v*s,z],vadd(vmul(ex,u*s),vmul(ez,w*s)));
  for(const side of [-1,1]){
   tube([P(-.014,.109,side*.044),P(-.021,.048,side*.046),P(.002,.011,side*.049)],.006*s,'#aa907b',PLAIN,6);
   for(const f of [-1,0,1])cyl(P(.002,.009,side*.049),P(.041,.006,side*.049+f*.019),.004*s,'#b0967e',PLAIN,5,.002)
  }
  ellipse(P(-.015,.174,0),[.191*s,.103*s,.084*s],'#dbdace',CLOTH,13,7,a);
  ellipse(P(.118,.229,0),[.069*s,.104*s,.068*s],'#e2e0d0',CLOTH,12,7,a);
  ellipse(P(.143,.303,0),[.065*s,.060*s,.055*s],'#e6e3d2',CLOTH,12,7,a);
  for(const side of [-1,1]){
   ellipse(P(-.044,.196,side*.061),[.163*s,.069*s,.027*s],'#969f9e',CLOTH,12,6,a);
   for(let i=0;i<3;i++){
    const w=side*(.044+.011*i),l=-.261-.014*i;
    const p=P(-.072,.222-i*.017,w),q=P(-.102,.252-i*.017,w+side*.012),r=P(l,.184-i*.003,w*.68);
    triangle(p,q,r,i===2?'#586262':'#727c7c',CLOTH,norm(vadd(Y,vmul(ez,side*.6))));
    triangle(lerp3(q,r,.81),lerp3(p,r,.79),r,'#d4d6c9',CLOTH,Y)
   }
   ellipse(P(.167,.316,side*.047),[.007*s,.007*s,.005*s],'#333e38',PLAIN,7,4,a)
  }
  tube([P(.188,.299,0),P(.228,.296,0),P(.249,.287,0)],[.014*s,.011*s,.002*s],'#c0a16b',BRASS,7)
 }
 gull(PX0+.08,DECK+.763,12.82,-.91,1.03);
 // Workshop bell light over the door, with its gooseneck and wire guard.
 const x=-.48,z=WZ1+.13,y=4.92;
 cyl([x,y,z-.03],[x,y,z+.015],.079,'#53645b',IRON,12);
 tube([[x,y,z],[x,y+.07,z+.12],[x,y+.07,z+.25],[x,y+.034,z+.33],[x,y-.045,z+.33]],.014,'#53675b',IRON,9);
 cyl([x,y-.065,z+.33],[x,y-.137,z+.33],.048,'#536b5f',IRON,14,.143);
 cyl([x,y-.143,z+.33],[x,y-.134,z+.33],.145,'#c2bfa2',PAINT,18);
 ellipse([x,y-.167,z+.33],[.043,.062,.044],'#d9d1b2',GLASS,13,6);
 // Wound hose on wall brackets between the side windows, clear of the ramp.
 const cc=[WX1+.14,3.32,-2.99];
 for(let i=0;i<4;i++)ringTube(vadd(cc,[i*.024,0,0]),Z,Y,.217+i*.006,.292+i*.006,.015,'#536b5c',PLAIN,0,TAU,36);
 tube([vadd(cc,[.085,.26,.116]),vadd(cc,[.080,.14,.274]),vadd(cc,[.081,-.26,.31]),vadd(cc,[.071,-.43,.35])],.015,'#536b5c',PLAIN,8);
}
