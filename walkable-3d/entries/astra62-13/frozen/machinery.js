'use strict';
const Machinery=(()=>{
 const {group,box,cyl,beam,ibeam,quad,tri,ringX,pipe,mat,tint,add,sub,mul,unit,cross,mix,len,solid,vertex,indices}=G;
 const {plate,bolt,sign}=Station,X=[1,0,0],Y=[0,1,0],Z=[0,0,1],tau=Math.PI*2;
 const cx=-1.55,cy=2.68,cz=6.10,R=2.16;
 const casting=mat('#627771',1),castingEdge=mat('#84958c',1),grease=mat('#504d3f',7),liner=mat('#524f47',7);
 function ax(x1,x2,y,z,r,m,n=24,r2=r){cyl([x1,y,z],[x2,y,z],r,m,n,r2)}
 function yzPrism(x1,x2,points,m,face=m){
 const turn=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
 const area=points.reduce((s,a,i)=>{const b=points[(i+1)%points.length];return s+a[0]*b[1]-b[0]*a[1]},0);
 const pp=area<0?[...points].reverse():points,ids=[],cap=[];
 for(let i=0;i<pp.length;i++){const a=pp[i],b=pp[(i+1)%pp.length];quad([x1,...a],[x1,...b],[x2,...b],[x2,...a],m);
 ids.push(i);cap.push([vertex([x1,...a],[-1,0,0],[a[1],a[0]],face),vertex([x2,...a],X,[a[1],a[0]],face)])}
 function fill(a,b,c){indices(cap[a][0],cap[c][0],cap[b][0],cap[a][1],cap[b][1],cap[c][1])}
 while(ids.length>3){const k=ids.findIndex((b,i)=>{const a=ids[(i+ids.length-1)%ids.length],c=ids[(i+1)%ids.length];if(turn(pp[a],pp[b],pp[c])<=.00000001)return false;
 return !ids.some(j=>j!==a&&j!==b&&j!==c&&turn(pp[a],pp[b],pp[j])>-.00000001&&turn(pp[b],pp[c],pp[j])>-.00000001&&turn(pp[c],pp[a],pp[j])>-.00000001)});
 if(k<0)throw Error('Invalid cast plate outline');fill(ids[(k+ids.length-1)%ids.length],ids[k],ids[(k+1)%ids.length]);ids.splice(k,1)}
 fill(...ids)
 }
 function pc(x,r,t,a){return [x,cy+r*Math.cos(a)-t*Math.sin(a),cz+r*Math.sin(a)+t*Math.cos(a)]}
 function spoke(angle){
 // Shallow sweep, cast fillets at each end, and raised flanges on both faces.
 const outline=[[.40,-.195],[.54,-.23],[.71,-.154],[.91,-.105],[1.65,-.005],[1.85,-.014],[2.035,-.11],[2.035,.25],[1.86,.170],[1.65,.16],[.91,.093],[.67,.13],[.52,.235],[.40,.22]];
 function shape(points,xa,xb,m){yzPrism(xa,xb,points.map(([r,t])=>pc(0,r,t,angle).slice(1)),m)}
 shape(outline,cx-.101,cx+.101,P.wheel);
 for(const side of [-1,1]){let a=cx+side*.102,b=a+side*.056;shape([[.52,-.07],[.80,-.053],[1.70,.060],[1.98,.036],[1.99,.137],[1.72,.116],[.8,.026],[.52,.066]],Math.min(a,b),Math.max(a,b),P.wheelLight)}
 }
 function wheel(){
 group('wheel');ringX(cx,cy,cz,1.90,2.108,.285,P.wheel,96);ringX(cx,cy,cz,1.982,2.14,.325,P.wheelLight,96);
 ringX(cx,cy,cz,2.104,2.145,.318,P.ironDark,96);
 // Rope groove lies between two steel lips.
 for(const side of [-1,1]){ringX(cx+side*.150,cy,cz,2.108,2.204,.043,P.steel,96);
 ringX(cx+side*.172,cy,cz,1.941,2.012,.028,P.wheel,96)}
 ringX(cx+.226,cy,cz,1.739,2.093,.052,P.steel,96);
 for(let i=0;i<10;i++){const a=i*tau/10+.11;spoke(a);
 for(const side of [-1,1]){let q=pc(cx+side*.174,1.967,0,a+.04);bolt(q,[side,0,0],.043,P.ironDark)}
 for(const r of [1.81,1.953]){let q=pc(cx+.257,r,0,a);bolt(q,X,.036,P.zinc)}
 }
 ax(cx-.205,cx+.211,cy,cz,.614,P.wheel,56);for(const side of [-1,1]){
 const q=cx+side*.22;ax(q-.030,q+.03,cy,cz,.491,P.wheelLight,48);for(let j=0;j<8;j++){const p=pc(q+side*.033,.409,0,j*tau/8);bolt(p,[side,0,0],.054,P.ironDark)}}
 ax(cx-.37,cx+.37,cy,cz,.287,P.iron,48);ax(-3.44,-.402,cy,cz,.171,P.steel,36);
 // Four clamp joints bind the segmental rim.
 for(let i=0;i<4;i++){const a=i*tau/4+.48;const p=pc(cx-.192,2.025,0,a);ax(p[0]-.044,p[0]+.031,p[1],p[2],.083,P.iron,12)}
 }
 function foot(x,z,w=.78,d=.82,y=0){box(x,y+.145,z,w+.18,.29,d+.19,P.foundation);plate(x,y+.30,z,w,d,P.ironDark);
 for(const dx of [-1,1])for(const dz of [-1,1]){let a=[x+dx*(w*.5-.086),y+.338,z+dz*(d*.5-.09)];cyl(a,add(a,[0,.07,0]),.042,P.steel,10);bolt(add(a,[0,.014,0]),Y,.062,P.zinc)}}
 function bearing(x,front){
 const wide=front?.39:.43,z=cz;
 for(const dz of [-1.44,1.44]){foot(x,z+dz,.70,.75);ibeam([x,.375,z+dz],[x,2.32,z+Math.sign(dz)*.185],.29,.31,casting);
 // Tapered stiffening gussets connect the legs to the anchor plates.
 for(const side of [-1,1])yzPrism(x+side*.14-.015,x+side*.14+.015,[[.36,z+dz-.24],[.36,z+dz+.24],[.86,z+dz*.85]],P.iron)}
 beam([x,.86,z-1.1],[x,.86,z+1.1],.18,.19,P.ironDark);
 for(const dz of [-.35,.35])bolt([x+wide*.52,2.19,z+dz],X,.057,P.zinc);
 yzPrism(x-wide*.5,x+wide*.5,[[2.10,z-.43],[2.10,z+.43],[2.33,z+.53],[2.39,z+.36],[2.39,z-.36],[2.33,z-.53]],casting);
 box(x,2.376,z,wide+.12,.103,1.03,castingEdge);
 // Split plummer block, removable cap and grease line.
 const cap=[];for(let i=0;i<=14;i++){const a=Math.PI*i/14;cap.push([cy+Math.sin(a)*.312,z+Math.cos(a)*.312])}cap.push([cy-.205,z-.31],[cy-.24,z+.31]);
 yzPrism(x-wide*.5,x+wide*.5,cap,casting);
 box(x,cy-.02,z,wide+.07,.091,.875,castingEdge);
 for(const dz of [-.355,.355])for(const dx of [-.119,.119])bolt([x+dx,cy+.03,z+dz],Y,.057);
 cyl([x,2.989,z],[x,3.066,z],.026,P.copper,8);bolt([x,3.052,z],Y,.034,P.copper);
 ax(x+wide*.5,x+wide*.5+.061,cy,z,.228,P.ironDark,32);
 if(front){ax(x+.214,x+.289,cy,z,.184,P.steel,32);ax(x+.289,x+.302,cy,z,.122,P.iron,24);bolt([x+.303,cy,z],X,.069,P.zinc);
 pipe([[x+.035,3.04,z],[x+.046,3.094,z+.08],[x+.08,3.094,z+.28],[x+.12,2.98,z+.368],[x+.14,2.55,z+.41],[x+.156,2.28,z+.43],[x+.15,.47,z+1.43]],.014,P.copper,8)}
 }
 function motor(){group('powertrain');
 // Concrete inertia block, beveled reducer casing and bolted inspection cover.
 box(-3.79,.225,6.94,2.35,.45,5.4,P.foundation);box(-3.76,.493,6.77,2.10,.084,4.89,P.ironDark);
 const profile=[[.54,5.10],[.54,7.31],[.76,7.53],[1.68,7.48],[2.42,7.01],[2.99,6.65],[3.20,6.28],[3.18,5.80],[2.89,5.46],[1.39,5.07]];
 yzPrism(-4.32,-3.12,profile,casting);
 for(const xx of [-4.33,-3.11]){const f=xx>-4?1:-1;ax(xx-.055,xx+.055,cy,cz,.49,castingEdge,34);ax(xx-.094,xx+.094,cy,cz,.40,casting,34);for(let i=0;i<8;i++)bolt([xx+f*.102,cy+.421*Math.cos(i*tau/8),cz+.421*Math.sin(i*tau/8)],[f,0,0],.047,P.zinc)}
 for(let i=0;i<5;i++){const z=5.32+i*.41;box(-3.093,1.11,z,.095,1.1,.087,castingEdge);bolt([-3.033,1.59,z],X,.049,P.steel)}
 box(-3.70,1.82,6.30,1.31,.096,2.31,castingEdge);
 cyl([-3.87,3.17,6.03],[-3.87,3.31,6.03],.07,P.copper,10);box(-3.49,3.23,6.12,.24,.068,.38,castingEdge);
 sign('nameplate',[-3.055,1.32,6.15],[0,0,-1],Y,.60,.31);
 const mx=-3.90,my=1.38,mz=8.58;
 for(const x of [mx-.36,mx+.36])for(const z of [7.93,9.02]){box(x,.66,z,.26,.28,.31,casting);bolt([x+.09,.82,z],Y,.05)}
 cyl([mx,my,7.68],[mx,my,9.31],.48,casting,36);
 // Axial cooling fins, fan cover, lifting eye and weatherproof junction box.
 for(let i=0;i<24;i++){const a=i*tau/24,p=[mx+.487*Math.cos(a),my+.487*Math.sin(a),7.86],q=[p[0],p[1],9.12];beam(p,q,.053,.089,castingEdge)}
 for(const z of [7.71,9.2])cyl([mx,my,z-.06],[mx,my,z+.06],.52,P.iron,32);
 cyl([mx,my,9.30],[mx,my,9.59],.494,castingEdge,32,.405);cyl([mx,my,9.58],[mx,my,9.603],.365,P.ironDark,32);
 for(let j=-4;j<=4;j++){const y=my+j*.071,hw=Math.sqrt(.345*.345-Math.pow(j*.071,2));box(mx,y,9.62,hw*2,.024,.023,P.steel)}
 box(mx,1.96,mz,.50,.28,.55,P.panel);box(mx,2.12,mz,.55,.048,.60,P.iron);ringX(mx+.36,1.88,8.16,.075,.115,.042,P.ironDark,20);
 cyl([mx,my,7.43],[mx,my,7.69],.222,P.ironDark,20);
 pipe([[mx-.26,1.98,mz],[mx-.52,1.98,mz],[mx-.70,1.83,mz],[mx-.70,.49,mz],[mx-.78,.33,mz+.16],[-5.61,.33,8.77],[-5.93,.57,8.77]],.053,P.black,12);
 // Grouped lubricant lines alongside the service floor.
 for(let i=0;i<3;i++){const x=-5.25-i*.105;pipe([[x,.24,9.45],[x,.24,3.48],[x+.20,.24,3.18],[-2.03,.24,3.18+i*.09]],.030,i===1?P.copper:P.steel,10)}
 }
 function pressureGauge(x,y,z,r){
 ax(x-.061,x+.018,y,z,r,P.ironDark,32);ax(x+.019,x+.026,y,z,r*.85,P.cream,32);
 for(let i=0;i<11;i++){const a=(-2.3+i*.46);beam([x+.030,y+Math.cos(a)*r*.60,z+Math.sin(a)*r*.60],[x+.030,y+Math.cos(a)*r*.78,z+Math.sin(a)*r*.78],.004,.010,P.ironDark)}
 beam([x+.034,y,z],[x+.034,y+r*.45,z-r*.47],.011,.012,P.enamel);ax(x+.033,x+.043,y,z,r*.11,P.ironDark,10)
 }
 function brakes(){group('hydraulics');const x=-1.56,z=3.97;
 foot(x,z-.27,1.13,.76);for(const xx of [x-.36,x+.36]){ibeam([xx,.37,z-.33],[xx,2.63,z-.34],.19,.23,P.ironDark);beam([xx,.46,z-.05],[xx,1.34,z-.33],.10,.12,P.iron)}
 box(x,2.63,z-.33,1.01,.245,.42,P.iron);
 for(const yy of [2.48,2.81]){for(const sx of [-1,1]){const xx=x+sx*.34;box(xx,yy,z-.032,.216,.23,.51,P.redDark);box(xx-sx*.084,yy,z+.072,.079,.202,.296,liner);
 ax(xx-.13,xx+.13,yy,z-.16,.108,castingEdge,20);bolt([xx+sx*.145,yy,z-.16],[sx,0,0],.065,P.ironDark)}}
 // Twin brake accumulator bottles in a fixed reservoir frame.
 const hx=-1.67,hz=2.56;box(hx,.24,hz,1.49,.45,.78,P.ironDark);box(hx,.49,hz,1.54,.061,.82,castingEdge);
 for(const xx of [hx-.44,hx+.02]){cyl([xx,.54,hz],[xx,.65,hz],.123,P.ironDark,18);cyl([xx,.64,hz],[xx,1.23,hz],.144,casting,20);cyl([xx,1.23,hz],[xx,1.33,hz],.144,casting,20,.078);cyl([xx,1.33,hz],[xx,1.41,hz],.048,P.iron,12);box(xx,.86,hz,.30,.065,.17,P.steel)}
 box(hx+.45,.70,hz,.34,.32,.43,casting);pressureGauge(hx+.66,.77,hz,.098);
 for(const [i,yy] of [[0,2.48],[1,2.81]]){const xx=x+.48+i*.065;pipe([[xx,yy,z-.17],[xx+.14,yy-.05,z-.17],[xx+.16,yy-.31,z-.30],[xx+.09,1.17,z-.49],[xx+.02,.91,z-.62],[xx-.16,.82,hz+.22]],.022,P.black,10)}
 }
 function ropeTube(points,r,m,sides=10){
 let dist=0;for(let i=0;i<points.length;i++){const p=points[i];if(i)dist+=len(sub(p,points[i-1]));const t=unit(sub(points[Math.min(points.length-1,i+1)],points[Math.max(0,i-1)])),u=unit(cross(t,Math.abs(t[0])<.95?X:Y)),v=cross(t,u);
 const ids=[];for(let s=0;s<=sides;s++){const a=s*tau/sides,n=add(mul(u,Math.cos(a)),mul(v,Math.sin(a)));ids.push(vertex(add(p,mul(n,r)),n,[s/sides*.303,dist],m))}
 if(i)for(let s=0;s<sides;s++){let k=ids[s],pr=k-sides-1;indices(pr,pr+1,k+1,pr,k+1,k)}
 }}
 function cables(){group('haulRope');
 // The haul rope makes a half turn around the drive sheave and disappears into a guarded return trench.
 const top=cy+R,bottom=cy-R,rope=[[cx,top,-11.92],[cx,top,-3],[cx,top,cz]];
 for(let j=1;j<=56;j++){const a=j*Math.PI/56;rope.push([cx,cy+R*Math.cos(a),cz+R*Math.sin(a)])}
 rope.push([cx,bottom,2.42]);for(let j=1;j<=12;j++){const a=j*Math.PI/2/12;rope.push([cx,bottom-.31+.31*Math.cos(a),2.42-.31*Math.sin(a)])}
 rope.push([cx,-.46,2.11]);ropeTube(rope,.041,P.cable,12);
 ringX(cx,bottom-.31,2.42,.075,.283,.102,P.iron,36);ax(cx-.184,cx+.184,bottom-.31,2.42,.067,P.steel,16);
 // Between the end bulkhead and the exposed platform, the two carrying ropes run through separate saddles.
 for(const xx of [cx-.38,cx+.38]){
 ropeTube([[xx,5.063,3.42],[xx,5.063,-11.92]],.049,P.cable,14);
 cyl([xx,5.063,2.55],[xx,5.063,3.43],.118,P.steel,18,.19);box(xx,5.065,3.50,.46,.50,.16,P.ironDark);
 for(const dx of [-.16,.16])for(const dy of [-.15,.15])bolt([xx+dx,5.063+dy,3.592],Z,.045)}
 ibeam([-3.15,5.065,3.72],[-.04,5.065,3.72],.28,.38,P.iron);
 for(const xx of [-3.17,.03]){beam([xx,5.065,3.72],[xx,5.68,3.72],.18,.20,P.iron);beam([xx,5.08,3.72],[xx,5.73,4.37],.095,.095,P.steel)}
 for(const [off,dy,r] of [[-.38,.223,.049],[.38,.223,.049],[0,0,.041]]){
 const line=[[cx+off,top+dy,-11.92]];for(let i=1;i<=28;i++){const t=i/28;line.push([cx+off,top+dy+( .48-top)*t-.72*Math.sin(Math.PI*t),-11.92-39.08*t])}
 for(let i=1;i<=42;i++){const t=i/42;line.push([cx+off,.48+dy-25*t-3.25*Math.sin(t*Math.PI),-51-144*t])}ropeTube(line,r,P.cable,8)}
 }
 function safety(){group('machineGuard');
 const x=.87,z1=1.87,z2=10.02;Station.rail([x,0,z1],[x,0,z2],'plant',1.4);Station.rail([-5.82,0,z2],[x,0,z2],'plant',1.52);
 Station.rail([-4.64,0,z1],[x,0,z1],'plant',1.43);
 // Mesh at the brake end protects the nip point while leaving the wheel face exposed.
 group('mesh');const meshW=1.24,meshH=.81;
 for(const slope of [-1,1])for(let k=-15;k<=25;k++){const bias=k*.082,edge=[];
 for(const u of [0,meshW]){const v=slope*u+bias;if(v>=0&&v<=meshH)edge.push([u,v])}
 for(const v of [0,meshH]){const u=(v-bias)/slope;if(u>.0001&&u<meshW-.0001)edge.push([u,v])}
 if(edge.length===2){const pts=edge.map(([u,v])=>[x+slope*.004,.19+v,z1+.06+u]);if(len(sub(pts[1],pts[0]))>.005)cyl(pts[0],pts[1],.0047,P.steel,5,.0047,false)}}
 for(const zz of [z1+.06,z1+1.30])box(x,.595,zz,.031,.847,.027,P.iron);
 for(const yy of [.19,1.00])box(x,yy,z1+.68,.035,.027,1.264,P.iron);
 group('machineGuard');
 sign('noentry',[x+.045,.787,8.61],[0,0,-1],Y,.56,.27);
 sign('nameplate',[x+.047,.78,5.03],[0,0,-1],Y,.57,.27);
 // Stop button accessible from the visitor aisle, wired into a corrugated drop.
 box(x+.03,1.08,3.23,.15,.33,.24,P.edge);ax(x+.109,x+.14,1.11,3.23,.083,P.ironDark,20);ax(x+.141,x+.19,1.11,3.23,.066,P.vermilion,20,.083);
 pipe([[x+.01,.94,3.23],[x+.01,.25,3.23],[x-.08,.14,3.23],[x-.48,.14,3.23]],.025,P.black,8);
 solid(-5.96,1.80,.958,10.09);
 }
 function build(){group('machineBase');
 // Bunded bed and raised inspection strips.
 box(-2.46,.055,6.05,5.83,.10,7.64,P.darkFloor);for(const z of [4.58,7.61])box(-1.60,.094,z,2.97,.084,.85,P.foundation);
 for(let j=0;j<5;j++)box(-4.85,.127,2.5+j*.76,.75,.15,.73,P.grate);
 wheel();group('bearings');bearing(-.66,true);bearing(-2.52,false);motor();brakes();cables();safety()
 }
 return {build,ropeTube,pressureGauge,yzPrism};
})();
