'use strict';
(() => {
 const {box,rounded,face,tri,at,cylinder,cyl,tube,ball,prism,decal,group,block,contact,tint,mix,random}=S;
 const pi=Math.PI,rnd=random(58074),zinc='869498',trim='485658',rubber='343b39',cream='d8d5c0',orange='b85935';
 function collar(x,y,z,r,col='9da5a0',m=1){
   cylinder([x,y,z],[x,y,z+.007],r,r,col,m,10);
   cylinder([x,y,z+.006],[x,y,z+.016],r*.62,r*.62,'778381',1,6);
 }
 S.bolt=collar;
 function localBlock(x,z,w,d){
   const p=S.point([x,0,z]),a=S.point([x+w/2,0,z+d/2]),b=S.point([x-w/2,0,z+d/2]);
   block(p[0],p[2],Math.abs(a[0]-p[0])+Math.abs(b[0]-p[0]),Math.abs(a[2]-p[2])+Math.abs(b[2]-p[2]));
 }
 function overlap(lo,hi,a,b){return lo<b-.00001&&hi>a+.00001}
 function wall(width,holes,vest=false){
   const low=.647,high=vest?3.08:3.30,e=.11;
   let xx=[-width/2,width/2],yy=[low,.90,vest?2.76:2.87,high];
   for(let i=1,n=Math.ceil(width/(vest?.86:1.14));i<n;i++)xx.push(-width/2+i*width/n);
   for(let a of holes){xx.push(a[0],a[1]);yy.push(Math.max(a[2],low),a[3])}
   xx=[...new Set(xx)].sort((a,b)=>a-b);yy=[...new Set(yy)].sort((a,b)=>a-b);
   for(let i=1;i<xx.length;i++)for(let j=1;j<yy.length;j++){
     let l=xx[i-1],r=xx[i],b=yy[j-1],t=yy[j],x=(l+r)/2,y=(b+t)/2,w=r-l,h=t-b;
     if(w<.001||h<.001||holes.some(a=>x>a[0]&&x<a[1]&&y>a[2]&&y<a[3]))continue;
     box(x,y,0,w,h,e*2,'696c61',0);
     let col=y<.90?'53605b':y>(vest?2.76:2.87)?(vest?'ac5636':'c7c7b7'):orange;
     box(x,y,e+.011,Math.max(.005,w-.006),Math.max(.005,h-.006),.022,tint(col,.978+.042*rnd()),2);
     group(vest?'vestibule':'interior',vest?.79:1,()=>{
       box(x,y,-e-.016,Math.max(.003,w-.007),Math.max(.003,h-.008),.032,tint(cream,.980+.022*rnd()),3);
     });
   }
   // Pressed stiffening flutes and the vertical joining strips meet the aperture edges.
   for(let i=0,n=Math.floor(width/.20);i<n;i++){
     const x=-width/2+(i+.5)*width/n,major=i%6===0;
     let spans=[[.925,vest?2.743:2.855]];
     for(let a of holes)if(x>=a[0]-.06&&x<=a[1]+.06)spans=spans.flatMap(([b,t])=>[[b,Math.min(t,a[2]-.06)],[Math.max(b,a[3]+.06),t]].filter(q=>q[1]>q[0]));
     for(let [b,t] of spans){
       if(t-b<.045)continue;
       box(x,(t+b)/2,.136,major?.036:.020,t-b,major?.019:.013,major?'ad5333':'ba603e',2);
       if(major&&t-b>.26){collar(x,b+.078,.147,.017);collar(x,t-.078,.147,.017)}
     }
   }
   // Horizontal breaks in the skin follow the door cutout.
   for(let y of [.86,vest?2.77:2.894]){
     let ranges=[[-width/2,width/2]];
     for(let a of holes)if(y>a[2]-.02&&y<a[3]+.02)ranges=ranges.flatMap(([l,r])=>[[l,Math.min(r,a[0]-.025)],[Math.max(l,a[1]+.025),r]].filter(p=>p[1]>p[0]));
     for(let [l,r] of ranges)box((l+r)/2,y,.14,r-l,.039,.04,y<1?'87928b':'bbbbae',1);
   }
   const zone=vest?.8:1;
   group(vest?'vestibule':'interior',zone,()=>{
     const n=Math.ceil(width/.98);
     for(let i=0;i<=n;i++){
       let x=-width/2+i*width/n;
       let spans=[[.79,high-.02]];
       for(let a of holes)if(x>a[0]-.07&&x<a[1]+.07)spans=spans.flatMap(([b,t])=>[[b,Math.min(t,a[2]-.04)],[Math.max(b,a[3]+.04),t]].filter(p=>p[1]>p[0]));
       for(let [b,t] of spans){box(x,(t+b)/2,-.148,.038,t-b,.032,'a5ac9f',1);
         for(let y=b+.13;y<t-.055;y+=.73)cylinder([x,y,-.164],[x,y,-.171],.013,.013,'707a76',1,7);
       }
     }
     for(let a of holes)if(a[4]==='window')box((a[0]+a[1])/2,a[2]-.049,-.172,a[1]-a[0]+.18,.055,.18,'a2aaa1',1);
   });
   let gap=holes.filter(a=>a[4]==='door').sort((a,b)=>a[0]-b[0]),start=-width/2;
   for(let a of gap){if(a[0]>start)localBlock((start+a[0])/2,0,a[0]-start,.27);start=a[1]}
   if(start<width/2)localBlock((start+width/2)/2,0,width/2-start,.27);
   for(let a of holes){
     let [l,r,b,t,kind]=a,w=r-l,h=t-b,cx=(l+r)/2;
     if(kind==='window'){
       for(let side of [-1,1]){
         let zz=side*.145,bc=side>0?'6c7b7a':'909c93';
         group(side>0?'station':vest?'vestibule':'interior',side>0?0:zone,()=>{
           for(let edge of [l,r]){box(edge,(t+b)/2,zz,.113,h+.12,.09,bc,1);box(edge+(edge===l?.043:-.043),(t+b)/2,zz+side*.013,.047,h-.033,.083,rubber,9)}
           for(let edge of [b,t]){box(cx,edge,zz,w+.09,.089,.089,bc,1);box(cx,edge+(edge===b?.038:-.038),zz+side*.016,w-.068,.038,.082,rubber,9)}
           if(w>1.72){box(cx,(t+b)/2,zz*.59,.069,h-.05,.095,bc,1);box(cx,(t+b)/2,zz*.60+side*.041,.035,h-.07,.027,rubber,9)}
           for(let edge of [l,r])for(let yy of [b+.08,t-.08])if(side>0)collar(edge,yy,zz+.049,.019);
         });
       }
       face([l+.035,b+.035,.007],[r-.035,b+.035,.007],[r-.035,t-.035,.007],[l+.035,t-.035,.007],'b9d2da',13);
       box(cx,b+.025,.175,w+.12,.035,.13,'c7d3d5',17);
       for(let k=0;k<Math.floor(w/.17);k++){
         let x=l+.035+rnd()*(w-.07),length=.018+rnd()**2*.103;
         cylinder([x,b-.03-length,.224],[x+.002,b-.029,.224],.001,.008+rnd()*.009,'adc5cb',8,6);
       }
     }else{
       for(let edge of [l,r]){
         box(edge,(t+b)/2,.012,.099,h+.055,.346,'85918b',1);
         box(edge+(edge===l?.049:-.049),(t+b)/2,.008,.026,h,.296,rubber,9);
         for(let y=b+.19;y<t;y+=.53)collar(edge,y,.187,.019);
       }
       box(cx,t,.005,w+.12,.099,.348,'85918b',1);box(cx,t-.055,.004,w-.08,.029,.286,rubber,9);
       box(cx,.774,0,w,.039,.34,'a5afa7',20);
     }
   }
 }
 function roof(x,z,w,d,h,vest){
   at(x,0,z,0,()=>{
     let W=w/2+.13,D=d/2+.13;
     const top=xx=>h+.105+.102*(1-Math.abs(xx)/W)+.13*(1-S.smooth(W-.25,W,Math.abs(xx)));
     prism([[-W,h],[W,h],[W,h+.11],[W-.24,h+.241],[0,h+.342],[-W+.24,h+.241],[-W,h+.11]],-D,D,vest?'89948f':'929d98',1);
     for(let f of [-D,D]){
       box(0,h+.035,f,w+.28,.078,.065,trim,1);
       for(let j=0;j<Math.floor(w/.63);j++)if(f>0)collar(-w/2+.29+j*.63,h+.042,f+.035,.016);
     }
     for(let xx of [-W,W])box(xx,h+.026,0,.062,.087,d+.29,'5c6a69',1);
     const n=Math.ceil(w/.27),m=Math.ceil(d/.30),grid=[];
     for(let j=0;j<=m;j++){let row=[];for(let i=0;i<=n;i++){
       let xx=-W+.014+(2*W-.028)*i/n,zz=-D+.02+(2*D-.04)*j/m,k=S.noise((xx+x)*1.1,(zz+z)*1.6);
       if(j===m)zz-=.045+.093*k;if(j===0)zz+=.04*k;
       row.push([xx,top(xx)+.018+.073*k+.016*Math.sin(xx*2.2+zz*4),zz]);
     }grid.push(row)}
     for(let j=0;j<m;j++)for(let i=0;i<n;i++){let a=grid[j][i],b=grid[j+1][i],c=grid[j+1][i+1],dd=grid[j][i+1];face(a,b,c,dd,tint('d2dce2',.976+.026*rnd()),6)}
     for(let j of [0,m])for(let i=0;i<n;i++){
       let a=grid[j][i],b=grid[j][i+1],c=[b[0],top(b[0])-.008,b[2]],dd=[a[0],top(a[0])-.008,a[2]];
       if(j===m)face(b,a,dd,c,'c4d0d8',17);else face(a,b,c,dd,'c4d0d8',17);
     }
     for(let i=0;i<Math.floor(w*2.5);i++){let xx=(rnd()-.5)*w,ll=.027+rnd()**3*.17;cylinder([xx,h-.023-ll,D+.018],[xx,h-.017,D+.018],.001,.008+rnd()*.011,'b6cbd0',8,6)}
   });
 }
 function undercarriage(){
   box(0,.627,-1.20,9.22,.249,5.90,'4e5856',1);
   for(let x of [-3.52,3.52]){
     for(let z of [-3.37,-.63,1.13]){box(x,.36,z,.21,.53,.28,'65716f',1);box(x,.165,z,.44,.07,.54,'818d87',1);contact(x,z,.77,.84,.45)}
     at(x,0,-1.18,Math.PI/2,()=>prism([[-3.21,.065],[2.96,.065],[3.35,.235],[3.34,.293],[2.90,.152],[-3.21,.152]],-.145,.145,'627170',1));
   }
   for(let x of [-3.5,-1.77,0,1.77,3.5])box(x,.456,-1.18,.11,.141,5.89,'616d6b',1);
   for(let z of [-4.12,1.73])for(let xx of [-3.92,-1.96,0,1.96,3.92]){
     box(xx,.55,z,.115,.24,.075,'82908b',1);if(z>0)collar(xx,.56,z+.042,.022);
   }
   box(-.79,.654,2.81,2.53,.194,2.28,'53605e',1);
 }
 function hatch(x,z,yaw){
   at(x,0,z,yaw,()=>{
     let w=1.49,b=.79,t=2.886,cutB=1.89,cutT=2.42,cutW=.63;
     for(let [cx,cy,cw,ch] of [[0,(b+cutB)/2,w,cutB-b],[0,(cutT+t)/2,w,t-cutT],[-(w+cutW)/4,(cutB+cutT)/2,(w-cutW)/2,cutT-cutB],[(w+cutW)/4,(cutB+cutT)/2,(w-cutW)/2,cutT-cutB]]){
       box(cx,cy,0,cw,ch,.098,'a5aca0',1);box(cx,cy,.056,cw-.005,ch-.006,.017,'c5c5b1',3);
     }
     for(let xx of [-w/2,w/2])box(xx,(t+b)/2,.01,.031,t-b,.141,rubber,9);
     for(let yy of [t,b])box(0,yy,.01,w+.02,.032,.14,rubber,9);
     for(let xx of [-cutW/2,cutW/2])box(xx,(cutT+cutB)/2,.062,.054,cutT-cutB+.06,.047,trim,9);
     for(let yy of [cutB,cutT])box(0,yy,.063,cutW,.059,.049,trim,9);
     face([-cutW/2,cutB,.019],[cutW/2,cutB,.019],[cutW/2,cutT,.019],[-cutW/2,cutT,.019],'b7cbd0',13);
     for(let yy of [1.08,1.80,2.65]){rounded(-.62,yy,.081,.15,.11,.035,.021,'84908a',1);cyl(-.70,yy,.104,.024,.14,'7c8884',16,11)}
     rounded(.51,1.62,.083,.13,.31,.034,.023,'7d8880',1);
     tube([[.51,1.69,.098],[.51,1.69,.188],[.33,1.69,.188]],.028,'434d49',9,12);
     for(let y of [1.05,1.24,1.43])box(0,y,.071,.90,.025,.014,'b6b9a6',3);
     localBlock(0,0,w,.16);
   });
 }
 function fixture(x,y,z,scale=1){
   rounded(x,y,z,.40*scale,.22*scale,.08*scale,.066*scale,'4c5a57',1);
   rounded(x,y,z+.052*scale,.32*scale,.158*scale,.054*scale,.05*scale,'ffe1ab',11);
   for(let i=-2;i<=2;i++)box(x+i*.055*scale,y,z+.084*scale,.011*scale,.157*scale,.014*scale,'82908a',1);
   for(let side of [-1,1])box(x,y+side*.067*scale,z+.080*scale,.29*scale,.011*scale,.014*scale,'73817b',1);
 }
 S.fixture=fixture;
 function landing(){
   const cx=-.79;
   // Landing and three open risers. The slats leave the snow visible between the treads.
   for(let [z,y,w,d] of [[4.59,.75,2.34,1.32],[5.40,.59,1.72,.32],[5.72,.43,1.72,.32],[6.04,.27,1.72,.32]]){
     for(let xx of [cx-w/2,cx+w/2])box(xx,y-.041,z,.045,.09,d,'808f8c',1);
     for(let iz=0,n=Math.round(d/.050);iz<n;iz++)box(cx,y-.014,z-d/2+(iz+.5)*d/n,w,.029,.029,'9daba7',1);
     for(let ix=-2;ix<=2;ix++)box(cx+ix*w/5,y-.039,z,.023,.044,d,'626e6d',1);
     box(cx,y-.024,z+d/2,w+.047,.052,.047,'a6aca0',20);
     box(cx,y-.021,z+d/2+.025,w*.52,.021,.004,'d2aa65',2);
   }
   for(let side of [-1,1]){
     let sx=cx+side*.91,xx=cx+side*1.165;
     for(let zz of [4.02,5.13]){box(xx,.39,zz,.075,.70,.075,'72817e',1);box(xx,.101,zz,.22,.075,.24,'7d8883',1);contact(xx,zz,.32,.39,.30)}
     for(let zz of [4.06,5.11]){cyl(xx,1.18,zz,.025,.90,'8b9994',1,12);cyl(xx,.774,zz,.062,.042,'72817c',1,12)}
     tube([[xx,1.64,3.95],[xx,1.64,5.08],[sx,1.52,5.42],[sx,1.13,6.16],[sx,1.04,6.21]],.029,'a8b2aa',1,12);
     tube([[xx,1.18,4.06],[xx,1.18,5.12],[sx,.763,6.16]],.017,'85918d',1,10);
     cyl(sx,.69,6.13,.024,.86,'8f9b93',1,10);
     cylinder([sx,.12,6.21],[xx,.67,5.07],.047,.047,'707e79',1,8);
     block(xx,4.60,.065,1.12);block(sx,5.91,.063,.54);
   }
   at(cx,.75,4.22,0,()=>decal('hazard',0,.008,0,.51,.082,0,-pi/2));
 }
 function addons(){
   // Service module, vibration isolators, return duct and accessible filter housing.
   at(4.57,0,-2.43,pi/2,()=>{
     for(let x of [-.63,.63]){box(x,1.01,.26,.085,.11,.61,trim,1);tube([[x,.77,.10],[x,1.03,.51]],.032,'798782',1,8)}
     rounded(0,1.42,.36,1.55,.73,.49,.054,'83918c',2);
     rounded(-.13,1.44,.616,1.03,.50,.035,.031,'384a48',9);
     for(let i=0;i<10;i++)at(-.13,1.233+i*.045,.65,0,()=>box(0,0,0,.995,.033,.049,'8e9b90',1),-.31);
     decal('service',.55,1.46,.617,.236,.079);
     for(let x of [-.73,.73])for(let y of [1.12,1.71])collar(x,y,.611,.015);
     for(let y of [1.19,1.36])tube([[-.77,y,.35],[-1.0,y,.35],[-1.09,y+.11,.35],[-1.09,y+.11,.13]],.039,'6a7771',9,10);
     localBlock(0,.34,1.58,.68);
   });
   // Raised external power raceway on the right-hand side.
   at(4.55,0,-1.20,pi/2,()=>{
     tube([[-2.76,.985,.19],[-2.55,1.16,.19],[1.30,1.16,.19]],.021,'7d8a83',1,10);
     for(let i=0;i<7;i++)box(-2.43+i*.52,1.16,.196,.034,.089,.073,'99a499',1);
   });
   at(-4.57,0,-2.62,-pi/2,()=>{
     rounded(0,1.48,.20,1.15,.68,.21,.052,'a5ab9c',1);
     for(let x of [-.39,.39])box(x,1.45,.318,.047,.32,.046,'596660',9);
     decal('service',0,1.51,.311,.50,.162);
     localBlock(0,.16,1.17,.41);
   });
   const mx=3.46,mz=-3.39;
   cyl(mx,3.60,mz,.145,.20,'667572',1,12);cyl(mx,4.42,mz,.037,1.65,'788781',1,12);cyl(mx,5.72,mz,.023,1.08,'a7b1a5',1,10);
   for(let [x,z] of [[1.4,-3.84],[4.27,-1.04],[4.38,-3.77]]){tube([[mx,5.32,mz],[x,3.60,z]],.006,'687575',1,5);cyl(x,3.60,z,.055,.08,'64726e',1,9)}
   for(let i=0;i<3;i++){
     let a=i*S.TAU/3+.26,x=mx+Math.cos(a)*.31,z=mz+Math.sin(a)*.31;
     cylinder([mx,6.17,mz],[x,6.17,z],.013,.013,'8e9a92',1,8);ball(x,6.17,z,.064,.068,.069,'566461',1,10,6);
   }
   tube([[mx,5.71,mz],[mx-.33,5.71,mz],[mx-.33,5.82,mz]],.016,'75847c',1,9);
   cyl(mx-.33,5.84,mz,.10,.10,'c4c7b6',3,16);
   for(let i=0;i<5;i++)cyl(mx-.33,5.86+i*.041,mz,.12-i*.003,.018,'d8d9c9',3,16);
   const vx=-3.38,vz=-3.37;cyl(vx,3.60,vz,.204,.17,'727f79',1,16);cyl(vx,3.95,vz,.11,.68,'8c9890',16,20);
   for(let j=0;j<3;j++)cyl(vx,3.70+j*.21,vz,.117,.029,'67756e',1,20);
   cylinder([vx,4.23,vz],[vx,4.36,vz],.218,.077,'798782',1,20);
 }
 S.shelter=()=>group('station',0,()=>{
   undercarriage();
   at(0,0,1.70,0,()=>wall(9.10,[[-1.61,.03,.647,2.92,'door'],[1.40,3.85,1.70,2.59,'window']]));
   at(0,0,-4.10,pi,()=>wall(9.10,[[-2.52,-.56,2.01,2.79,'window']]));
   at(-4.55,0,-1.20,-pi/2,()=>wall(5.80,[[-1.15,.67,1.75,2.44,'window']]));
   at(4.55,0,-1.20,pi/2,()=>wall(5.80,[[-2.09,-.56,1.78,2.65,'window']]));
   at(-.79,0,3.92,0,()=>wall(2.56,[[-.81,.81,.647,2.92,'door']],true));
   for(let side of [-1,1])at(-.79+side*1.28,0,2.81,side*pi/2,()=>wall(2.22,[],true));
   for(let x of [-4.55,4.55])for(let z of [-4.10,1.70]){
     box(x,1.971,z,.247,2.65,.247,'a3aba3',1);
     for(let y of [.82,1.47,2.25,3.12]){
       if(z>0)collar(x,y,z+.128,.020);
       at(x+Math.sign(x)*.128,y,z,Math.sign(x)*pi/2,()=>collar(0,0,0,.020));
     }
   }
   roof(0,-1.20,9.10,5.80,3.298,false);roof(-.79,2.81,2.56,2.22,3.08,true);
   group('interior',1,()=>hatch(-1.65,.80,pi/2));group('vestibule',.78,()=>hatch(-1.724,3.043,pi/2));
   // Identification and enamel signage at the working entrance.
   rounded(2.65,1.32,1.862,2.10,.534,.032,.027,'697772',1);decal('brand',2.65,1.32,1.881,2.063,.502);
   for(let x of [1.64,3.66])for(let y of [1.095,1.544])collar(x,y,1.885,.011);
   decal('number',-3.31,1.94,1.862,1.52,1.097);
   rounded(-.79,2.992,4.088,1.12,.202,.035,.016,trim,1);decal('port',-.79,2.992,4.108,1.09,.193);
   at(4.71,2.28,-1.58,pi/2,()=>{rounded(0,0,0,1.37,.269,.027,.016,'68746d',1);decal('west',0,0,.016,1.345,.239)});
   fixture(.262,2.40,4.073,.79);
   // Weather-side conduit to the entrance light.
   tube([[.265,2.505,4.09],[.265,2.74,4.09],[.19,2.81,4.09],[.19,3.04,4.09]],.012,'8f9a91',1,8);
   landing();addons();
   for(let x of [-3.9,-2.4,-.8,.8,2.4,3.9])contact(x,-1.2,2.0,3.72,.44);
   contact(-.78,2.83,1.66,1.75,.42);contact(-.79,4.56,1.55,1.04,.33);
 });
})();
