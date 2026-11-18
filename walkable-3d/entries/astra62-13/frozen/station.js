'use strict';
const Station=(()=>{
 const {mat,tint,box,beam,ibeam,cyl,quad,tri,pipe,group,local,mul,add,sub,unit,cross,len,mix,solid,seeded}=G;
 const X=[1,0,0],Y=[0,1,0],Z=[0,0,1],nz=[0,0,-1],nx=[-1,0,0];
 const label=Signs.label;
 function bolt(p,axis,r=.037,m=P.zinc){cyl(p,add(p,mul(axis,r*.50)),r,m,6)}
 function plate(x,y,z,w,d,m=P.iron){box(x,y+.019,z,w,.038,d,m);for(const dx of [-1,1])for(const dz of [-1,1])bolt([x+dx*(w*.5-.056),y+.038,z+dz*(d*.5-.056)],Y,.034)}
 function rail(a,b,style='plant',span=1.46){
 const d=unit(sub(b,a)),l=len(sub(b,a)),count=Math.ceil(l/span),h=style==='deck'?1.13:1.08,m=style==='plant'?P.ironDark:P.rail;
 for(let i=0;i<=count;i++){const p=mix(a,b,i/count);plate(p[0],p[1],p[2],.165,.165,m);box(p[0],p[1]+h*.49,p[2],.064,h*.97,.064,m);
 if(style==='deck')box(p[0],p[1]+h-.038,p[2],.103,.052,.102,P.steel)}
 const lifted=(p,k)=>add(p,[0,k,0]);
 if(style==='deck'){beam(lifted(a,h),lifted(b,h),.12,.10,tint(P.plank,.82));for(const k of [.25,.52,.78])cyl(lifted(a,k),lifted(b,k),.013,P.steel,8);beam(lifted(a,.074),lifted(b,.074),.043,.105,P.rail)}
 else{for(const [k,r] of [[h,.039],[.55,.024]])cyl(lifted(a,k),lifted(b,k),r,style==='plant'&&k===h?P.edge:P.steel,10);
 beam(lifted(a,.12),lifted(b,.12),.06,.095,m)}
 }
 function post(x,z,h,base=0){plate(x,base,z,.47,.49);box(x,base+h/2,z,.27,h,.28,P.iron);for(const sign of [-1,1])box(x+sign*.145,base+h/2,z,.041,h,.345,P.ironDark);
 for(const dz of [-1,1])bolt([x,base+.24,z+dz*.142],[0,0,dz],.052)}
 function sign(key,c,r,u,w,h,thick=.045){const face=unit(cross(r,u));local(r,u,face,c,()=>box(0,0,-thick/2,w+.055,h+.055,thick,P.ironDark));label(key,add(c,mul(face,.002)),r,u,w,h)}
 function bracketSign(key,x,y,z,w,h,face=Z){const right=face[2]<0?nx:face[0]>0?nz:face[0]<0?Z:X;sign(key,[x,y,z],right,Y,w,h)}
 function tubeClamp(x,y,z,axis=Z){cyl([x-axis[0]*.027,y-axis[1]*.027,z-axis[2]*.027],[x+axis[0]*.027,y+axis[1]*.027,z+axis[2]*.027],.065,P.zinc,10)}
 function pendant(x,y,z,length=1,small=false){
 const R=small?.22:.34;
 cyl([x,y+.27,z],[x,y+.27+length,z],.014,P.black,8);cyl([x,y+.19,z],[x,y+.32,z],R*.23,P.ironDark,12);
 cyl([x,y+.018,z],[x,y+.235,z],R,R===.22?P.ironDark:P.iron,24,R*.25);
 cyl([x,y-.012,z],[x,y+.02,z],R,P.ironDark,24);cyl([x,y-.022,z],[x,y-.011,z],R*.90,P.glow,24);
 cyl([x,y-.037,z],[x,y-.021,z],R*.28,P.glow,16)
 }
 function lightBar(x,y,z,l){box(x,y+.06,z,.24,.13,l+.14,P.ironDark);box(x,y-.026,z,.18,.067,l,P.glow);for(const k of [-.41,0,.41])box(x,y-.033,z+k*l,.192,.079,.018,P.steel)}
 function floorPanel(x1,x2,z1,z2,m=P.floor,top=0){box((x1+x2)/2,top-.14,(z1+z2)/2,x2-x1,.28,z2-z1,m)}
 function drain(x,z1,z2){const z=(z1+z2)/2,d=Math.abs(z2-z1);
 box(x,.012,z,.172,.017,d,P.ironDark);for(const dx of [-.071,.071])box(x+dx,.025,z,.018,.016,d,P.steel);
 // Short groups of longitudinal slots retain a legible grate at a distance.
 for(let k=Math.min(z1,z2)+.055;k<Math.max(z1,z2)-.02;k+=.082)box(x,.027,k,.131,.012,.018,P.steel)}
 function hatch(x,z,w,d){box(x,.020,z,w,.036,d,P.ironDark);box(x,.043,z,w-.061,.021,d-.061,P.grate);for(const a of [-1,1])for(const b of [-1,1])bolt([x+a*(w/2-.065),.055,z+b*(d/2-.067)],Y,.021,P.steel);for(const a of [-1,1])box(x+a*w*.30,.057,z,.05,.014,.18,P.ironDark)}
 function wallBoard(x,y,z,w,h,d,m,s=1){box(x,y,z,w,h,d,tint(m,s))}
 function sideGlass(key,x,z1,z2,bottom,top,normal=1,m=P.window){group('glass'+key);
 const a=[x,bottom,z1],b=[x,bottom,z2],c=[x,top,z2],d=[x,top,z1];quad(a,b,c,d,m,undefined,[normal,0,0]);group('building')}
 function terminalFloor(){group('building');
 box(-.30,-.24,7,12.0,.21,13.5,P.darkFloor);const rnd=seeded(194);const xx=[-6.35,-3.3,-.28,2.69,5.64],zz=[.30,2.94,5.58,8.22,10.87,13.67];
 for(let i=0;i<xx.length-1;i++)for(let j=0;j<zz.length-1;j++)floorPanel(xx[i]+.006,xx[i+1]-.006,zz[j]+.006,zz[j+1]-.006,tint(P.floor,.94+.09*rnd()));
 for(const [x,z,w,d] of [[4.72,10.1,.52,.69],[4.70,5.93,.56,.71],[1.93,1.49,.82,.64]])hatch(x,z,w,d);
 drain(5.15,1.03,12.75);
 // Painted exclusion line follows the equipment enclosure with breaks at the service gate.
 box(1.31,.009,6.26,.067,.012,8.07,P.paint);box(-1.77,.009,10.39,6.23,.012,.066,P.paint);
 for(let z=2.42;z<10.19;z+=.51)box(1.15,.011,z,.21,.012,.055,tint(P.paint,.89));
 }
 function eastWall(){
 const zs=[.38,3.68,7.98,11.04,13.59],base=1.02;
 for(let i=0;i<zs.length-1;i++){const z0=zs[i],z1=zs[i+1],l=z1-z0,z=(z0+z1)/2;
 box(5.67,.48,z,.29,1.07,l-.012,tint(P.concrete,.96+i*.016));box(5.56,1.04,z,.37,.10,l,P.ironDark);box(5.66,3.68,z,.28,.19,l,P.ironDark);
 const solidWall=i===2;
 if(solidWall){box(5.62,2.38,z,.22,2.63,l,P.concrete);for(let n=0;n<17;n++){const zz=z0+(n+.5)*l/17;box(5.477,2.39,zz,.075,2.56,l/17-.011,tint(P.cedar,.87+.17*((n*13)%11)/10))}}
 else{const count=i===1?4:3;for(let j=0;j<count;j++){const a=z0+j*l/count,b=z0+(j+1)*l/count;
 sideGlass('East'+i,5.63,a+.03,b-.03,1.12,3.59,-1);box(5.61,2.35,a,.094,2.57,.068,P.iron);box(5.59,2.99,(a+b)/2,.093,.042,b-a,P.iron);
 // Recessed metal gaskets and interior sill.
 box(5.58,1.12,(a+b)/2,.155,.067,b-a,P.steel)}}
 for(let j=0;j<Math.ceil(l/.20);j++){let b=Math.ceil(l/.20);box(5.66,4.13,z0+(j+.5)*l/b,.19,.81,l/b-.010,tint(P.timber,.9+.15*((j*5+i)%9)/8))}
 for(let zz=z0+.41;zz<z1;zz+=1.04){cyl([5.513,.62,zz],[5.522,.62,zz],.026,P.darkFloor,8);cyl([5.509,.62,zz],[5.513,.62,zz],.014,P.foundation,8)}
 }
 box(5.43,.12,6.98,.065,.21,13.08,P.iron);
 // Framed route diagram and a maintenance slip behind a glazed noticeboard.
 sign('map',[5.415,2.14,9.57],Z,Y,1.64,.88,.07);sign('service',[5.414,1.51,10.44],Z,Y,.31,.37);
 for(const z of [8.42,10.68]){box(5.41,2.99,z,.22,.17,.28,P.ironDark);box(5.285,2.98,z,.046,.114,.22,P.glow)}
 }
 function westWall(){const z0=.30,z1=13.68,l=z1-z0;
 for(let i=0;i<5;i++)for(let j=0;j<3;j++){const w=l/5-.014,h=1.11-.012;box(-6.33,(j+.5)*1.11,z0+(i+.5)*l/5,.30,h,w,tint(P.concrete,.88+.021*((i+j)%5)));
 for(const p of [-.32,.32]){const zz=z0+(i+.5)*l/5+p*w;cyl([-6.175,(j+.47)*1.11,zz],[-6.167,(j+.47)*1.11,zz],.026,P.darkFloor,8)}}
 for(let i=0;i<67;i++)box(-6.32,3.94,z0+(i+.5)*l/67,.22,1.25,l/67-.01,tint(P.cedar,.89+.17*((i*7)%15)/14));
 // Tall service louvres backed by a dark recessed grille.
 box(-6.132,2.45,6.14,.17,1.56,3.42,P.ironDark);for(let j=0;j<14;j++){const yy=1.78+j*.103;beam([-6.002,yy,4.52],[-6.002,yy,7.76],.102,.040,P.steel)}
 sign('drive',[-6.157,2.21,9.61],nz,Y,1.96,.84);
 for(const y of [.53,.69]){pipe([[-6.07,y,1.46],[-6.07,y,12.66]],.041,P.steel);for(let z=1.9;z<12.7;z+=1.25)tubeClamp(-6.07,y,z)}
 }
 function backWall(){const z=13.68,doorX=2.64,doorW=2.10;const edges=[[-6.34,doorX-doorW/2],[doorX+doorW/2,5.68]];
 for(const [a,b] of edges){box((a+b)/2,1.56,z,b-a,3.12,.28,P.concrete);for(let y=.87;y<3.1;y+=1.02)box((a+b)/2,y,z-.145,b-a,.012,.006,P.foundation)}
 box(-.33,3.81,z,12.02,1.43,.27,P.ironDark);
 for(let i=0;i<67;i++){const x=-6.35+(i+.5)*12.04/67;const top=roofY(x)-.15;box(x,(top+3.13)/2,z-.1,12.04/67-.01,top-3.13,.17,tint(P.timber,.90+.16*(i%7)/6))}
 box(doorX,2.995,z+.045,doorW,.25,.10,P.ironDark);
 for(const s of [-1,1])box(doorX+s*(doorW*.5-.025),1.45,z+.02,.055,2.90,.15,P.ironDark);
 box(doorX,-.10,z+.71,2.72,.22,1.45,P.wet);box(doorX,-.29,z+1.60,2.72,.20,.40,P.concrete);
 for(const i of [-1,1]){const x=doorX+i*.507;box(x,.57,z-.04,.986,1.14,.15,P.panel);box(x,2.66,z-.04,.986,.41,.15,P.panel);
 for(const s of [-1,1])box(x+s*.467,1.76,z-.06,.058,1.48,.13,P.iron);
 group('glassEntrance');quad([x-.435,1.14,z-.076],[x+.435,1.14,z-.076],[x+.435,2.47,z-.076],[x-.435,2.47,z-.076],P.window);group('building');
 box(x,1.06,z-.148,.78,.053,.051,P.zinc);box(x+.28*i,.89,z-.14,.08,.2,.032,P.steel)}
 bracketSign('back',doorX,3.19,z-.26,1.55,.61,nz);
 sign('terminal',[-2.02,2.25,z-.155],nx,Y,2.70,1.08);
 // Service door in the return view.
 box(-4.77,1.17,z-.16,1.19,2.34,.11,P.ironDark);box(-4.77,1.15,z-.228,1.08,2.22,.045,P.panel);box(-5.13,1.08,z-.275,.18,.044,.051,P.zinc);label('warning',[-4.77,1.66,z-.256],nx,Y,.44,.23)
 }
 function roofY(x){return 6.65-Math.abs(x+.35)*.352}
 function roofStrip(x1,x2,z1,z2,y1,y2,thick,m){
 const xv=unit([x2-x1,y2-y1,0]),yv=[-xv[1],xv[0],0],l=Math.hypot(x2-x1,y2-y1);
 local(xv,yv,Z,[(x1+x2)/2,(y1+y2)/2,(z1+z2)/2],()=>box(0,0,0,l,thick,z2-z1,m))}
 function roofs(){group('roof');const z1=-11.68,z2=14.08,rng=seeded(172);
 // Broad timber soffit, built from boards with staggered end joints at the purlins.
 for(const [a,b] of [[-6.89,-.35],[-.35,6.15]]){const n=26,dx=(b-a)/n;
 for(let i=0;i<n;i++){const x1=a+i*dx+.004,x2=a+(i+1)*dx-.004;const breaks=[z1,...(i%2?[ -6.94,.4,7.99]:[-3.38,3.75,10.98]),z2];for(let j=0;j<breaks.length-1;j++)roofStrip(x1,x2,breaks[j]+.005,breaks[j+1]-.005,roofY(x1),roofY(x2),.104,tint(P.timber,.84+.26*rng()))}
 roofStrip(a,b,z1-.05,z2+.05,roofY(a)+.105,roofY(b)+.105,.11,P.roof);
 for(let x=a+.30;x<b;x+=.73){box(x,roofY(x)+.203,(z1+z2)/2,.036,.092,z2-z1+.13,P.roof)}
 for(let x=a+.4;x<b;x+=1.43)box(x,roofY(x)-.165,(z1+z2)/2,.145,.225,z2-z1,tint(P.plank,.83))}
 for(const z of [-11.02,-7.29,-3.45,.41,3.74,8.02,11.04,13.47]){
 const xx=[-6.16,5.50];for(const x of xx)post(x,z,roofY(x)-.28);
 for(const [a,b] of [[-6.67,-.35],[-.35,5.96]]){roofStrip(a,b,z-.119,z+.119,roofY(a)-.395,roofY(b)-.395,.36,tint(P.plank,.93))}
 // Knee braces and bolted steel shoes carry the laminated rafters.
 for(const [x,s] of [[-6.16,1],[5.50,-1]]){beam([x,3.46,z],[x+s*1.39,roofY(x+s*1.39)-.53,z],.145,.18,P.timber);
 for(const side of [-1,1]){box(x,roofY(x)-.45,z+side*.17,.40,.32,.033,P.iron);for(const dx of [-.12,.12])bolt([x+dx,roofY(x)-.44,z+side*.188],[0,0,side],.046)}}
 // Tie rods sit over the cable carriage envelope.
 cyl([-3.55,5.65,z],[2.82,5.65,z],.018,P.steel,8);cyl([-.35,5.65,z],[-.35,6.15,z],.024,P.iron,8)
 }
 // Rain gutters, clips and swan-neck downpipes.
 for(const x of [-6.91,6.15]){const yy=roofY(x);cyl([x,yy-.015,z1],[x,yy-.015,z2],.097,P.zinc,12);for(let z=z1+.46;z<z2;z+=1.15)box(x,yy-.059,z,.218,.095,.038,P.iron)}
 for(const z of [-10.93,.57,12.74]){pipe([[6.15,roofY(6.15),z],[6.15,4.04,z],[5.92,3.76,z],[5.92,-.23,z],[6.08,-.45,z]],.07,P.steel,10);for(const y of [.45,2.08,3.50])tubeClamp(5.92,y,z,Y)}
 group('building')
 }
 function portal(){const z=.39;
 box(-5.27,1.76,z,2.14,3.52,.33,P.concrete);for(let i=0;i<12;i++){const x=-6.32+(i+.5)*2.13/12;box(x,4.12,z,.166,.97,.20,tint(P.cedar,.85+.17*(i%6)/5))}
 box(5.26,1.77,z,.65,3.54,.31,P.concrete);
 ibeam([-6.18,4.05,z],[5.52,4.05,z],.24,.38,P.iron); // Interrupted above the track ropes by the open gable.
 for(const [a,b] of [[-6.18,-3.32],[.36,5.52]]){box((a+b)/2,3.89,z,b-a,.18,.27,P.ironDark)}
 // The arch has a raised cable opening between its two independent header beams.
 for(const [xx,sg] of [[-3.34,-1],[.33,1]]){ibeam([xx,4.03,z],[xx,5.66,z],.16,.18,P.iron);beam([xx,5.59,z],[xx+sg*1.5,4.15,z],.079,.089,P.steel)}
 for(const x of [2.21,3.81])cyl([x,3.38,z-.02],[x,3.96,z-.02],.012,P.steel,8);
 bracketSign('board',3.01,3.17,z+.054,1.91,.68,Z);bracketSign('guide',3.01,3.17,z-.059,1.91,.68,nz);
 box(.23,.052,z+.01,1.12,.08,.14,P.grate);
 rail([-6.07,0,.56],[.16,0,.56],'edge',1.64)
 }
 function platform(){const rng=seeded(808);group('platform');
 box(2.92,-.39,-5.53,5.46,.42,11.89,P.foundation);const zmin=-11.48,zmax=.36,n=5;
 for(const [a,b] of [[.20,2.66],[2.675,5.65]])for(let j=0;j<n;j++){const dz=(zmax-zmin)/n;floorPanel(a,b,zmin+j*dz+.005,zmin+(j+1)*dz-.005,tint(P.floor,.88+.13*rng()))}
 box(.16,-.15,-5.55,.19,.31,11.82,P.iron);box(.224,.023,-5.55,.10,.035,11.82,P.grate);
 for(let j=0;j<30;j++)box(.50,.012,zmin+.203+j*.387,.126,.014,.34,tint(P.paint,.87+.15*rng()));
 // A ribbed tactile band runs behind the sill in front of the doors.
 for(const x of [.728,.76,.793])box(x,.017,-5.6,.014,.022,11.5,P.steel);
 for(const [a,b] of [[-11.3,-8.71],[-3.41,.42]])rail([.29,0,a],[.29,0,b],'edge',1.43);
 for(let z=-10.98;z<.4;z+=3.76){box(2.91,-.76,z,5.47,.47,.68,P.foundation);for(const x of [.89,5.15]){box(x,-2.25,z,.59,3.04,.61,P.concrete);beam([x,-1.78,z],[x+(x<2?1:-1)*.88,-.70,z],.19,.19,P.iron)}}
 // Track recess and inspection walkway opposite the passenger deck.
 box(-2.98,-2.04,-5.65,6.27,.34,12.0,P.darkFloor);box(-5.02,-.52,-5.56,2.32,.32,11.93,P.foundation);
 for(const z of [-10.5,-6.64,-2.77]){box(-3.00,-1.87,z,5.97,.12,.18,P.iron);box(-3.01,-1.79,z,.82,.065,.25,P.grate)}
 rail([-4.0,-.35,-11.26],[-4.0,-.35,-.05],'edge',1.57);for(const z of [-10.7,-6.99,-3.26,-.03])box(-5.1,-1.64,z,.62,2.26,.63,P.concrete);
 // Wind screens leave the upper roof open above brushed steel handrails.
 rail([5.42,0,-11.23],[5.42,0,.27],'deck',1.45);
 for(const [j,a,b] of [[0,-7.20,-3.55],[1,-3.36,.23]]){
 box(5.54,1.86,(a+b)/2,.075,.071,b-a,P.ironDark);
 for(let i=0;i<3;i++){const z0=a+i*(b-a)/3,z1=a+(i+1)*(b-a)/3;sideGlass('Wind'+j,5.54,z0+.035,z1-.035,.21,1.83,-1);box(5.54,1.02,z0,.071,1.79,.055,P.iron)}
 }
 group('platform');drain(4.92,-10.82,-.20);
 // Bay marker and boarding directions, readable on the return walk.
 bracketSign('bay',5.32,2.71,-3.45,.68,.66,nz);sign('lookout',[5.354,2.22,-7.30],Z,Y,.98,.40);
 hatch(4.39,-2.19,.61,.79);
 rail([-6.09,-.36,-11.19],[-4.08,-.36,-11.19],'edge',1.25);
 group('building')
 }
 function lookout(){group('lookout');const a=.47,b=5.61,za=-17.23,zb=-11.47;const width=b-a;
 const rng=seeded(319);for(let i=0;i<35;i++){const dz=(zb-za)/35;box((a+b)/2,-.058,za+(i+.5)*dz,width,.116,dz-.007,mat(tint(P.plank,.71+.20*rng()).color,23))}
 box((a+b)/2,-.23,za,width+.13,.34,.15,P.iron);for(const x of [a+.08,2.99,b-.08]){ibeam([x,-.24,za],[x,-.24,zb+.14],.22,.30,P.ironDark);box(x,-1.93,-15.97,.37,3.25,.38,P.foundation);beam([x,-1.63,-15.98],[x,-.34,za+.12],.15,.15,P.iron)}
 for(const x of [a+.1,b-.1])rail([x,0,za+.085],[x,0,zb-.03],'deck',1.5);
 rail([a+.1,0,za+.085],[b-.1,0,za+.085],'deck',1.72);
 // A sloped timber canopy frames the valley without a beam through the horizon.
 for(const x of [a+.15,b-.15])for(const z of [za+.58,zb-.24]){const hh=x<2?3.26:3.60;plate(x,0,z,.32,.33);box(x,hh/2,z,.183,hh,.19,P.cedar);for(const k of [-1,1])bolt([x,hh-.32,z+k*.10],[0,0,k],.045);
 const end=z< -15?1:-1;beam([x,hh-.75,z],[x,hh-.17,z+end*.80],.112,.135,P.timber)}
 const yy=x=>3.35+(x-a)*.070;for(let i=0;i<27;i++){const x0=a-.37+i*(width+.74)/27,x1=a-.37+(i+1)*(width+.74)/27;roofStrip(x0+.004,x1-.004,za-.40,zb+.18,yy(x0),yy(x1),.092,tint(P.timber,.82+.20*rng()))}
 roofStrip(a-.41,b+.41,za-.48,zb+.22,yy(a-.41)+.10,yy(b+.41)+.10,.094,P.roof);
 for(const z of [za+.57,(za+zb)/2,zb-.24])roofStrip(a-.29,b+.29,z-.10,z+.10,yy(a-.29)-.15,yy(b+.29)-.15,.20,P.plank);
 for(const x of [a+.15,b-.15])box(x,yy(x)-.28,(za+zb)/2,.20,.24,zb-za+.29,P.cedar);
 cyl([a-.43,yy(a)-.02,za-.46],[a-.43,yy(a)-.02,zb+.19],.066,P.zinc,12);
 lightBar(3.44,2.99,-14.00,.84);
 // Enamel panorama table faces the viewer, with the upper edge sloping toward the mountains.
 const u=unit([0,.67,-.74]),r=X,n=unit(cross(r,u));sign('panorama',[2.3,1.03,-16.82],r,u,1.67,.53,.073);
 for(const x of [1.72,2.88]){beam([x,.06,-16.72],[x,.91,-16.82],.072,.085,P.iron);plate(x,0,-16.72,.22,.21)}
 box(3.03,.013,-11.48,5.17,.024,.135,P.grate);
 group('building')
 }
 function furnishings(){group('fittings');
 pendant(1.88,3.91,8.20,roofY(1.88)-4.30);pendant(-2.3,3.72,4.0,roofY(-2.3)-4.09,true);
 pendant(2.4,3.62,1.32,roofY(2.4)-3.97,true);pendant(2.54,3.62,-5.9,roofY(2.54)-3.96);
 // Three metal electrical cabinets on the terminal service wall.
 for(let i=0;i<3;i++){const z=2.17+i*.68;box(-5.78,.11,z,.73,.18,.67,P.ironDark);G.roundedBox(-5.83,1.12,z,.68,1.87,.665,.036,tint(P.panel,.94+i*.025));box(-5.472,1.13,z,.035,1.77,.602,P.panel);
 for(let j=0;j<6;j++)box(-5.449,.46+j*.054,z,.016,.016,.35,P.ironDark);box(-5.43,1.09,z+.218,.045,.15,.035,P.ironDark);const key=i===0?'speed':i===1?'panel':'warning';label(key,[-5.451,1.59,z],nz,Y,.48,.25);
 for(let j=0;j<3;j++)cyl([-5.444,1.31,z-.15+j*.145],[-5.425,1.31,z-.15+j*.145],.03,j===1?P.led:j===0?P.enamel:P.edge,12);
 pipe([[-5.83,2.06,z],[-5.83,2.26,z],[-6.03,2.46,z],[-6.03,3.47,z]],.026,P.zinc,8)}
 // Water-resistant wall luminaire, inspection tags and a compact extinguisher.
 function extinguisher(x,z,turn=0){box(x,1.08,z+.11,.31,.47,.07,P.ironDark);cyl([x,.40,z],[x,1.06,z],.115,P.vermilion,18);cyl([x,1.06,z],[x,1.16,z],.114,P.vermilion,18,.045);cyl([x,1.13,z],[x,1.25,z],.035,P.zinc,12);box(x+.03,1.23,z,.15,.038,.045,P.ironDark);
 pipe([[x+.06,1.17,z],[x+.15,1.13,z],[x+.16,.80,z-.01],[x+.12,.62,z-.018]],.017,P.black,7);box(x,.83,z-.115,.11,.17,.009,P.cream)}
 extinguisher(4.66,13.39);solid(4.48,13.16,4.89,13.58);
 // Weathered return-side bench against the timber panel.
 for(const z of [8.71,10.37]){plate(5.00,0,z,.35,.20);beam([5.0,.05,z],[4.91,.45,z],.083,.10,P.iron);beam([4.90,.40,z],[5.28,.40,z],.085,.09,P.iron)}
 for(const x of [4.82,5.0,5.18])box(x,.483,9.55,.155,.082,2.09,P.plank);for(const y of [.75,.94])box(5.28,y,9.55,.075,.145,2.09,P.timber);solid(4.70,8.47,5.45,10.63);
 for(const z of [2.01,3.68,8.02,11.04]){box(5.38,3.48,z,.28,.22,.33,P.ironDark)}
 // Exterior enamel station name on the far wall of the service platform.
 box(-6.18,1.19,-5.91,.24,2.97,4.9,P.concrete);sign('terminal',[-6.052,1.63,-5.94],nz,Y,2.99,1.15);
 for(let i=0;i<24;i++)box(-6.16,3.27,-8.34+(i+.5)*4.86/24,.19,1.22,.192,tint(P.timber,.82+(i%7)*.033));
 group('building')
 }
 function finishing(){
 group('stationHardware');
 // Rain flashing closes the roof ends, with a small open louvre in each gable peak.
 for(const z of [-11.66,14.04]){for(const [a,b] of [[-6.9,-.35],[-.35,6.15]])roofStrip(a,b,z-.063,z+.063,roofY(a)-.015,roofY(b)-.015,.20,P.roof);
 for(let j=0;j<6;j++){const y=5.69+j*.132,half=(6.55-y)/.352;if(half>.12)box(-.35,y,z,half*2,.086,.114,tint(P.cedar,.94+.014*j))}}
 for(const z of [-11.02,-7.29,-3.45]){box(-6.16,-.174,z,.55,.35,.57,P.concrete);box(-6.16,-1.63,z,.49,2.89,.49,P.foundation)}
 // A bolted tension cross braces the sheltered maintenance side.
 for(const [a,b] of [[.41,3.74],[8.02,11.04],[-11.02,-7.29]]){
 cyl([-6.05,3.49,a+.09],[-6.05,4.23,b-.09],.021,P.steel,8);cyl([-6.09,4.23,a+.09],[-6.09,3.49,b-.09],.021,P.steel,8);
 const mid=(a+b)/2;cyl([-6.05,3.80,mid-.22],[-6.05,3.92,mid+.22],.042,P.ironDark,8)}
 // A perforated boot scraper lies flush with the entrance mat.
 box(2.64,.012,12.91,1.79,.022,.70,P.ironDark);
 for(let j=0;j<22;j++)box(1.81+j*.079,.028,12.91,.036,.021,.64,P.rubber);
 for(const z of [12.56,13.26])box(2.64,.030,z,1.85,.024,.035,P.steel);
 // Pull-box, surface conduit and a caged amber pilot lamp on the portal jamb.
 G.roundedBox(5.103,1.66,.608,.30,.41,.139,.027,P.panel);box(5.103,1.66,.688,.252,.354,.028,P.iron);
 for(const x of [5.018,5.188])for(const y of [1.53,1.79])bolt([x,y,.708],Z,.020,P.zinc);
 pipe([[5.10,1.88,.61],[5.10,2.83,.61],[5.03,2.90,.61],[4.99,2.90,.61]],.025,P.steel,9);
 box(5.02,2.99,.60,.22,.18,.13,P.ironDark);cyl([5.02,2.98,.667],[5.02,2.98,.745],.073,P.edge,16);
 for(const xx of [4.979,5.061])box(xx,2.98,.749,.008,.122,.016,P.iron);
 // Tensioned service cable trays follow the west wall into the drive bay.
 for(const y of [3.11,3.26])cyl([-5.97,y,1.11],[-5.97,y,11.85],.029,P.ironDark,8);
 for(let z=1.24;z<11.8;z+=1.21){box(-6.045,3.19,z,.23,.256,.049,P.steel);bolt([-5.915,3.20,z],X,.025)}
 }
 function build(){terminalFloor();eastWall();westWall();backWall();roofs();portal();platform();lookout();furnishings();finishing();
 for(const [x,z] of [[5.50,.41],[5.50,3.74],[5.50,8.02],[5.50,11.04],[5.50,-3.45],[5.50,-7.29],[5.50,-11.02],[.62,-16.65],[5.46,-16.65],[.62,-11.71],[5.46,-11.71]])solid(x-.155,z-.18,x+.155,z+.18);
 solid(-6.36,.20,-4.19,.59);solid(4.933,.21,5.72,.58);solid(-6.12,1.73,-5.39,3.93);solid(1.40,-17.18,3.18,-16.58)
 }
 return {build,rail,plate,bolt,sign,bracketSign,pendant,roofY,hatch};
})();
