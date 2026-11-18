'use strict';
const Court = (() => {
 const {PI,TAU,rand,pick,shade,blend,M,at,area,box,cyl,rod,beam,tube,ring,blob,face,contact,collider,sign}=G;
 const {post,panel,peg,notice}=Yard,{pot}=Ceramics;
 function splitLog(x,y,z,len,r,phase){
   at(x,y,z,rand(-.065,.065),()=>{
     const points=[],n=8,sweep=rand(PI*.85,PI*1.26);
     for(let j=0;j<n;j++){let a=phase+sweep*j/(n-1),rr=r*rand(.87,1.07);points.push([Math.cos(a)*rr,Math.sin(a)*rr]);}
     points.push([Math.cos(phase+sweep/2)*r*-.22,Math.sin(phase+sweep/2)*r*-.18]);
     const end=len/2,cc=pick(['b79c72','a58d64','bca37b','b09b74']);
     for(const t of [-1,1]){const pts=[points[points.length-1],...points.slice(0,-1)].map(([u,v])=>[u,v,end*t]);face(pts,cc,M.wood,[0,0,t],pts.map(p=>[p[0]*.28,p[1]*.9]));
       if(t===1){let a=phase+sweep*.53;
         for(const f of [.40,.64,.82]){const a0=phase+.1,a1=phase+sweep-.1,path=Array.from({length:7},(_,k)=>[Math.cos(a0+(a1-a0)*k/6)*r*f,Math.sin(a0+(a1-a0)*k/6)*r*f,end+.0006]);tube(path,.0009,shade(cc,.73),M.wood,4);}
         face([[Math.cos(a)*r*.13,Math.sin(a)*r*.13,end+.0008],[Math.cos(a+.047)*r*.82,Math.sin(a+.047)*r*.82,end+.0008],[Math.cos(a+.088)*r*.75,Math.sin(a+.088)*r*.75,end+.0008]],'706146',M.wood,[0,0,1]);
       }
     }
     for(let j=0;j<points.length;j++){
       const [a,b]=points[j],[u,v]=points[(j+1)%points.length],isBark=j<n-1;
       face([[a,b,-end],[u,v,-end],[u,v,end],[a,b,end]],isBark?pick(['6a6150','736a54','786b52','685e4e']):cc,M.wood,null,[[0,0],[0,r*.5],[len,r*.5],[len,0]]);
     }
   });
 }
 function logRack(){
   at(-4.79,0,-5.64,PI/2,()=>{
     const w=1.65,d=.53;
     box(0,.126,0,w,.095,d,'7e735d',M.wood,.009);
     for(const x of [-w*.5,w*.5])for(const z of [-d*.38,d*.38])post(x,.477,z,.051,.931,.051,'686f60');
     for(const x of [-w*.5,w*.5])box(x,.857,0,.044,.057,d-.05,'7b7a62',M.wood);
     for(let j=0;j<4;j++)for(let k=0;k<8-j%2;k++){
       splitLog((k-(7-j%2)/2)*.186+rand(-.012,.012),.242+j*.134+rand(-.015,.015),rand(-.051,.049),rand(.36,.45),rand(.111,.134),rand(0,TAU));
     }
     // A removable sloped timber cover on the fuel rack.
     for(let j=0;j<4;j++)box(0,.985-.022*j,-.24+j*.147,w+.19,.045,.156,shade('92917a',rand(.94,1.05)),M.wood,.004);
     collider(0,0,w+.12,.61);contact(0,0,.003,w*.58,.44,.34);
   });
 }
 function leaf(p,length,width,heading,dip,c){
   const side=[-Math.sin(heading),0,Math.cos(heading)],fwd=[Math.cos(heading),0,Math.sin(heading)];
   const v=(t,s,ridge=0)=>G.add(p,G.add(G.mul(fwd,length*t),G.add(G.mul(side,width*s),[0,dip*t+length*.135*Math.sin(PI*t)+ridge,0])));
   const tip=v(1,0),mid=v(.48,0,.006),a=v(.30,-.70),b=v(.59,-1),d=v(.59,1),e=v(.30,.70);
   const tris=[[p,mid,a],[a,mid,b],[b,mid,tip],[tip,mid,d],[d,mid,e],[e,mid,p]];
   for(let j=0;j<tris.length;j++){const pts=tris[j],nm=G.unit(G.cross(G.sub(pts[1],pts[0]),G.sub(pts[2],pts[0])));
     if(nm[1]<0)for(let k=0;k<3;k++)nm[k]*=-1;
     face(pts,shade(c,j<3?1.02:.87),M.leaf,nm,[[0,0],[.5,.1],[.8,1]]);
   }
 }
 function vine(){
   // Espalier-trained vine on short wires against the boundary wall.
   at(-5.04,0,-6.74,PI/2,()=>{
     for(const y of [1.13,1.64,2.11]){
       rod([-2.37,y,.095],[2.12,y,.095],.003,'798070',M.iron,5);
       for(const x of [-2.37,2.12])rod([x,y,.016],[x,y,.104],.009,'696f5e',M.iron,6);
     }
     const root=[-.44,0,.17],branches=[
       [root,[-.38,.43,.20],[-.52,.80,.15],[-.31,1.14,.14],[-.48,1.56,.13],[-.23,1.91,.15],[.21,2.13,.17],[.59,2.19,.24],[1.10,2.17,.17],[1.76,2.23,.25]],
       [[-.31,1.14,.14],[-.83,1.30,.13],[-1.10,1.61,.16],[-1.56,1.7,.18],[-1.94,1.92,.21],[-2.28,1.86,.23]],
       [[-.48,1.56,.13],[-.84,1.89,.18],[-1.21,2.19,.17],[-1.70,2.25,.23],[-2.24,2.13,.26]],
       [[-.31,1.14,.14],[.13,1.32,.12],[.509,1.59,.21],[1.02,1.68,.21],[1.38,1.89,.23]],
       [[.21,2.13,.17],[.60,2.37,.22],[.95,2.48,.24],[1.3,2.56,.21]]
     ];
     for(let j=0;j<branches.length;j++){
       const path=branches[j];tube(path,t=>(j===0?.044:.022)*(1-.79*t),'796d4f',M.wood,8);
       for(let i=j===0?3:0;i<path.length-1;i++){
         for(let k=0;k<4;k++){
           const a=G.add(path[i],G.mul(G.sub(path[i+1],path[i]),(k+.4)/4));
           let dir=rand(0,TAU),len=rand(.122,.30),b=[a[0]+Math.cos(dir)*len,a[1]+rand(-.20,.18),a[2]+rand(.04,.16)];
           rod(a,b,rand(.002,.005),'77794e',M.wood,5,.002);
           for(let n=0;n<4;n++){const o=G.add(a,G.mul(G.sub(b,a),(n+1)/4));
             let l=rand(.080,.170),c=pick(['788752','768757','8d965e','667e52','9b9e69','718557','87935c']);
             leaf(o,l,l*rand(.28,.42),dir+(n%2?1.3:-1.3)+rand(-.38,.38),rand(-.094,.067),c);
           }
         }
       }
     }
     contact(-.45,0,.18,.23,.22,.37);
   });
 }
 function rosemary(x,z){
   pot(x,0,z,'crock',.385,.21,'red',{sides:38});
   cyl(x,.331,z,.195,.167,.034,'625b46',M.stone,24);
   for(let i=0;i<27;i++){
     const a=rand(0,TAU),h=rand(.20,.48),d=rand(.08,.29),start=[x+Math.cos(a)*.068,.342,z+Math.sin(a)*.068],end=[x+Math.cos(a)*d,.342+h,z+Math.sin(a)*d];
     rod(start,end,.0038,'888667',M.wood,5,.0014);
     for(let j=0;j<8;j++){const p=G.add(start,G.mul(G.sub(end,start),(j+1)/9));
       for(const s of [-1,1])leaf(p,rand(.037,.066),.0055,a+s*1.14,rand(.008,.03),pick(['87927a','738771','97a189','7a8b71']));}
   }
   collider(x,z,.39,.39);
 }
 function slidingDoor(){
   at(-1.29,0,-3.77,PI,()=>{
     const w=2.14,h=2.61;
     panel(0,h/2,0,w,h,.079,'61786b');
     for(let i=0;i<14;i++)box(-w/2+(i+.5)*w/14,h/2,.047,w/14-.004,h-.025,.038,shade('748979',rand(.87,1.065)),M.wood);
     for(const y of [.17,1.26,2.43])panel(0,y,.096,w-.04,.119,.064,'82917b');
     beam([-w*.43,.238,.095],[w*.43,1.186,.095],.105,.056,'82907c',M.wood,.004);
     beam([w*.43,1.327,.095],[-w*.43,2.359,.095],.105,.056,'7b8c77',M.wood,.004);
     for(const x of [-.85,.84]){
       panel(x,2.56,.095,.075,.298,.031,'525c50',M.iron);Annex.diskZ(x,2.742,.072,.078,.065,'566055');
       Annex.bolt(x,2.74,.116,.019);Annex.bolt(x,2.53,.113,.014);
     }
     for(const y of [1.02,1.24])rod([.87,y,.081],[.87,y,.185],.013,'4e5a50',M.iron,9);
     rod([.87,1.02,.185],[.87,1.24,.185],.016,'546257',M.iron,10);
     notice(.06,1.86,.079,.876,.218,'bone',['THROWING ROOM']);
     panel(1.05,2.815,.052,4.62,.058,.067,'4e594e',M.iron);
     for(let i=0;i<6;i++)Annex.bolt(-1.03+i*.84,2.812,.096,.014);
   });
   at(-3.495,0,-3.71,PI,()=>{
     for(const s of [-1,1])post(s*1.13,1.32,0,.121,2.64,.108,'93856a');
     panel(0,2.71,0,2.39,.133,.113,'9f8d6f');
     box(0,.008,.125,2.23,.017,.23,'b1a48a',M.stone,.006);
   });
 }
 function courtDetails(){
   area('yard-details',()=>{
     logRack();vine();rosemary(-4.53,-4.208);
     slidingDoor();
     // Low brick stack and the kiln-setter's iron rake hang safely along the north wall.
     at(-.26,0,-9.25,.07,()=>{
       const colors=['bd9772','b68d6a','c19d77','b49170'];
       for(let j=0;j<4;j++)for(let i=0;i<3-(j===3?1:0);i++)for(let k=0;k<2;k++){
         if(j%2)box((k-.5)*.27,.052+j*.098,(i-1)*.137,.263,.092,.129,pick(colors),M.brick,.005);
         else box((i-1)*.163,.052+j*.098,(k-.5)*.221,.157,.092,.216,pick(colors),M.brick,.005);
       }collider(0,0,.61,.54);
     });
     at(-4.996,0,-7.26,PI/2,()=>{
       panel(0,1.56,.065,.61,.065,.05,'84765d');
       for(const x of [-.18,.085]){
         tube([[x,1.56,.102],[x,1.52,.143],[x,1.545,.165]],.007,'5f6756',M.iron,6);
         rod([x-.031,.21,.212],[x,1.61,.156],.009,'646955',M.iron,8);
         rod([x,1.39,.164],[x,1.65,.153],.017,'9d825e',M.wood,9);
       }
       box(-.211,.187,.214,.134,.107,.013,'686a55',M.iron,.007);
     });
     at(-4.915,0,-8.48,PI/2,()=>notice(0,1.56,.029,.676,.43,'green',['KILN  02','DOWNDRAUGHT','1240 °C  /  STONEWARE']));
     // Weeds in the perimeter joints, away from the walking surface.
     for(let i=0;i<48;i++){
       const x=rand(-5.05,-4.89),z=rand(-9.50,-3.94),h=rand(.03,.10);
       for(let k=0;k<4;k++){const a=rand(0,TAU),w=rand(.005,.014);face([[x-w,.002,z],[x+w,.002,z+.002],[x+.036*Math.cos(a),h*rand(.65,1.12),z+.04*Math.sin(a)]],pick(['868762','778260','979469']),M.leaf,[.3,.7,.3]);}
     }
   });
 }
 return {courtDetails,leaf};
})();
