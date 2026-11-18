/* The inglenook and shared small household objects. */
(function(R){
'use strict';
const {T,PI,TAU,C,scene,mats,standard,canvasMat,box,rounded,cyl,ball,lathe,torus,tube,beam,rod,panel,poly,grid,at,local,matrix,solid,story,shadow,rnd,pick,tint,region}=R;
standard('glass',{color:'#ead9ae',metalness:.12,roughness:.18,transparent:true,opacity:.19,depthWrite:false,side:T.FrontSide,envMapIntensity:.9});
mats.glass.userData.noCast=true;
function scaleAt(x,y,z,s,yaw,fn){at(x,y,z,yaw,()=>local(matrix(0,0,0,0,0,0,s,s,s),fn))}
function pottery(x,y,z,s,type='jar',col='#68877d',yaw=0){
 scaleAt(x,y,z,s,yaw,()=>{
 const profiles={jar:[[.001,0],[.071,.001],[.085,.008],[.082,.022],[.11,.053],[.128,.118],[.125,.18],[.112,.211],[.082,.236],[.08,.264],[.086,.267],[.087,.279],[.073,.28],[.072,.255],[.066,.247]],
 jug:[[.001,0],[.079,.001],[.089,.008],[.087,.025],[.115,.064],[.123,.12],[.112,.179],[.083,.228],[.064,.245],[.062,.299],[.071,.313],[.069,.323],[.056,.32],[.054,.30]],
 bowl:[[.001,.001],[.065,.002],[.069,.009],[.065,.018],[.10,.032],[.14,.066],[.166,.113],[.168,.123],[.16,.128],[.152,.119],[.129,.078],[.095,.049],[.057,.031],[.001,.029]],
 cup:[[.001,0],[.045,.001],[.049,.012],[.049,.026],[.058,.053],[.065,.103],[.064,.116],[.067,.12],[.065,.127],[.058,.127],[.057,.119],[.052,.068],[.045,.025],[.001,.019]]};
 const p=profiles[type]||profiles.jar;lathe(0,0,0,p,'glaze',col,28);
 if(type==='cup'||type==='jug'){
 const jug=type==='jug';tube(jug?[[.058,.29,0],[.144,.292,0],[.167,.249,0],[.146,.163,0],[.108,.132,0]]:[[.057,.105,0],[.092,.113,0],[.106,.092,0],[.096,.065,0],[.054,.042,0]],jug?.014:.009,'glaze',col,8);
 if(!jug)cyl(0,.103,0,.058,.058,.002,'glaze','#53412b',28);
 }
 if(type==='jar'){torus(0,.189,0,.121,.0035,'glaze','#c1af81',PI/2);torus(0,.204,0,.115,.002,'glaze','#b7a679',PI/2)}
 if(type==='bowl'){torus(0,.112,0,.165,.003,'glaze','#b8ad83',PI/2);torus(0,.099,0,.158,.002,'glaze','#7d8b7d',PI/2)}
 })
}
function oilLamp(x,y,z,s=1){
 scaleAt(x,y,z,s,0,()=>{
 lathe(0,0,0,[[.001,0],[.108,0],[.115,.009],[.111,.019],[.085,.027],[.073,.04],[.044,.055],[.045,.072],[.067,.081],[.081,.11],[.1,.126],[.103,.155],[.087,.178],[.04,.187],[.042,.201],[.051,.206],[.05,.224],[.032,.231]],'metal','#ad8851',32);
 torus(0,.022,0,.096,.003,'metal','#c4a363',PI/2);for(let j=0;j<12;j++){let a=j*TAU/12;box(Math.cos(a)*.044,.214,Math.sin(a)*.044,.009,.012,.009,'iron','#5f5545')}
 cyl(.061,.217,0,.014,.014,.016,'metal',C.brass,16,0,0,PI/2);cyl(0,.237,0,.012,.017,.023,'iron',C.iron);
 ball(0,.266,0,.016,.039,.016,'warm','#fff0bb',12,8,0,0,-.10);
 lathe(0,0,0,[[.037,.219],[.038,.24],[.053,.254],[.060,.283],[.057,.314],[.041,.341],[.028,.378],[.028,.431],[.034,.445],[.033,.451],[.029,.449]],'glass','#f9eccd',32);
 torus(0,.448,0,.032,.0021,'glaze','#dbd6b5',PI/2)
 })
}
function book(x,y,z,w,h,d,col,yaw=0){at(x,y,z,yaw,()=>{
 const cover=Math.max(.004,Math.min(.011,h*.18));box(.004,0,0,w-.013,h-2*cover,d-.015,'paper','#d4c3a1');
 for(let s of [-1,1])rounded(0,s*(h-cover)/2,0,w,cover,d,.003,'leather',col,0,0,0,1);
 rounded(-w/2+.005,0,0,.019,h,d,.005,'leather',col,0,0,0,1);
 for(let t of [-.33,-.23,.26,.33])box(-w/2-.004,0,d*t,.003,h*.89,.006,'metal','#b99c61');
 for(let t of [-.31,-.10,.24])box(.005,t*(h-2*cover),d/2-.006,w-.025,.0014,.002,'paper','#ac997a')
 })}
function pillow(x,y,z,w,h,d,col,mat='wool',yaw=0,pitch=0,roll=0){
 at(x,y,z,yaw,()=>{const sides=44,rings=12,pow=(v,p)=>Math.sign(v)*Math.abs(v)**p,xy=(a,v)=>{
 const ang=TAU*a,b=-PI/2+PI*v,cu=pow(Math.cos(ang),.36),su=pow(Math.sin(ang),.36),rad=Math.pow(Math.max(.000001,Math.cos(b)),.48);
 const wave=(Math.sin(ang*13+1.1)*.45+Math.sin(ang*17-.2)*.55)*.018;
 const crease=1-(.018+.5*Math.abs(wave))*Math.exp(-(((v-.48)/.12)**2));
 return[cu*w*.5*rad*crease,Math.sin(b)*h*.5+(wave*h)*rad*rad,su*d*.5*rad*crease,a*(w+d)/.29,v*(d+h)/.32]};
 grid(sides,rings,(a,b)=>xy(1-a,b),mat,col);
 const pts=[];for(let i=0;i<48;i++){const p=xy(i/48,.5);pts.push(p.slice(0,3))}tube(pts,Math.min(.008,h*.047),mat,tint(col,.05),5,72,true)
 },pitch,roll)
}
function basket(x,y,z,r,h,col='#a88957'){
 const p=[[.001,0],[r*.67,0],[r*.72,.02],[r*.97,h*.91],[r,h],[r*.95,h],[r*.91,h*.9],[r*.67,.025],[.001,.025]];
 lathe(x,y,z,p,'timber',col,32);
 for(let j=0;j<10;j++){const yy=(j+.6)/10;torus(x,y+h*yy,z,r*(.70+.29*yy),.006,'timber',tint(col,.11),PI/2,0,0,32)}
 for(let j=0;j<20;j++){const a=j*TAU/20;const pts=[];for(let k=0;k<=10;k++){const t=k/10,v=(.708+.281*t)*r+(k%2?.005:-.004);pts.push([x+Math.cos(a)*v,y+h*t,z+Math.sin(a)*v])}tube(pts,.0045,'timber','#b79a66',4,11)}
 torus(x,y+h,z,r,.011,'timber',C.oakLight,PI/2)
}
function ropeCoil(x,y,z,r,turns=5,col='#ab936a',tilt=0){
 at(x,y,z,0,()=>{const pts=[];for(let i=0;i<=turns*30;i++){const a=i*TAU/30,rad=r*(1-.115*i/(turns*30));pts.push([Math.cos(a)*rad+.009*Math.sin(a*.53),.007+i/30*.015,Math.sin(a)*rad*.82])}tube(pts,.0105,'wool',col,6,turns*35)},tilt)
}
function sprigs(x,y,z,s=1,flowers=false,col='#798663'){
 scaleAt(x,y,z,s,0,()=>{for(let j=0;j<(flowers?14:11);j++){let a=rnd(0,TAU),d=rnd(.04,.15),h=rnd(.18,.37),end=[Math.cos(a)*d,h,Math.sin(a)*d];
 let mid=[end[0]*.45,h*.55,end[2]*.48];tube([[0,0,0],mid,end],.0024,'leaf','#707754',5,6);
 for(let k=1;k<7;k++){let t=k/7,ang=a+(k%2?1:-1)*1.12,xx=end[0]*t,zz=end[2]*t,yy=h*t,l=rnd(.025,.061),dx=Math.cos(ang)*l,dz=Math.sin(ang)*l;let base=[xx,yy,zz],tip=[xx+dx,yy+l*.42,zz+dz],cx=xx+dx*.45,cz=zz+dz*.45,bw=l*.19;
 poly([base,[cx-Math.sin(ang)*bw,yy+l*.34,cz+Math.cos(ang)*bw],tip,[cx,yy+l*.31,cz]],'leaf',tint(col,.18));
 poly([base,[cx,yy+l*.31,cz],tip,[cx+Math.sin(ang)*bw,yy+l*.30,cz-Math.cos(ang)*bw]],'leaf',tint(col,.18))}
 if(flowers){const palette=['#9c8f9e','#b0a2b0','#89879b'];for(let k=0;k<5;k++)ball(end[0]+rnd(-.009,.009),h+k*.009,end[2]+rnd(-.009,.009),.011-k*.0013,.016,.01-k*.001,'wool',pick(palette),6,4)}
 }})
}
function clock(x,y,z){
 at(x,y,z,0,()=>{
 rounded(0,.02,0,.32,.042,.135,.013,'timber',C.wood);rounded(0,.051,0,.278,.037,.112,.011,'timber',C.oak);
 box(0,.123,0,.251,.13,.096,'timber',C.wood);cyl(0,.191,0,.126,.126,.097,'timber',C.wood,32,PI/2);
 cyl(0,.187,.054,.099,.102,.018,'metal',C.brass,32,PI/2);cyl(0,.187,.066,.092,.092,.006,'paper','#e1d8b9',32,PI/2);
 for(let j=0;j<12;j++){const a=TAU*j/12;box(Math.sin(a)*.077,.187+Math.cos(a)*.077,.07,.004,.013,.003,'iron','#635c4b',0,0,-a)}
 rod([0,.187,.074],[-.041,.218,.074],.003,.001,'iron',C.iron,6);rod([0,.187,.076],[.057,.207,.076],.002,.001,'iron',C.iron,6);ball(0,.187,.079,.006,.006,.003,'metal',C.brass,8,5)
 })
}
function hearth(){
 at(-4.005,0,2.11,PI/2,()=>{
 const rock=['#9c917c','#b2a187','#a79b86','#a4967e','#b6a78d','#9e937f'];
 rounded(0,.067,.33,2.16,.134,.98,.034,'stone','#968b77');rounded(0,.144,.31,1.96,.053,.92,.014,'stone','#b0a189');
 box(0,.70,.01,1.94,1.1,.22,'stone','#625a4c');box(0,.77,.145,1.18,1.2,.07,'stone','#443b31');
 for(let j=0;j<6;j++){for(let i=0;i<5;i++){const x=(i-2)*.254+(j%2?.1:-.03);if(Math.abs(x)>.60)continue;box(x,.247+j*.143,.188,.244,.132,.033,'stone',tint(j<2?'#73503a':'#544437',.15))}}
 for(let s of [-1,1]){
 box(s*.762,.84,.256,.38,1.34,.43,'stone','#827762');
 for(let j=0;j<3;j++)rounded(s*(.744+rnd(-.01,.01)),.257+j*.172,.33,.378+rnd(-.01,.01),.164,.397,.018,'stone',pick(rock));
 }
 /* Individually cut arch stones around the fire mouth. */
 for(let i=0;i<11;i++){let a=i*PI/11+.009,b=(i+1)*PI/11-.009,ri=.56,ro=i===5?.86:.814;const p=(ang,r,d)=>[Math.cos(ang)*r,.664+Math.sin(ang)*r,d];
 const col=pick(rock);poly([p(a,ri,.55),p(a,ro,.55),p(b,ro,.55),p(b,ri,.55)],'stone',col);
 poly([p(a,ri,.166),p(a,ri,.55),p(b,ri,.55),p(b,ri,.166)],'stone',tint(col,.10));poly([p(a,ro,.19),p(a,ro,.55),p(b,ro,.55),p(b,ro,.19)],'stone',col);
 poly([p(a,ri,.17),p(a,ro,.17),p(a,ro,.55),p(a,ri,.55)],'stone',col);
 }
 for(let s of [-1,1]){rounded(s*.83,1.396,.32,.27,.15,.39,.017,'stone',pick(rock));rounded(s*.80,1.474,.37,.27,.115,.43,.025,'timber',C.wood)}
 box(0,1.476,.25,1.84,.10,.39,'stone','#aa9c81');
 rounded(0,1.569,.31,2.18,.148,.67,.026,'timber','#71533b');box(0,1.65,.285,2.20,.033,.70,'timber','#937153');
 const chimney=[[1.00,1.66,.47],[.95,1.79,.455],[.63,2.38,.32],[.57,2.55,.29],[.57,3.14,.29]];
 for(let i=0;i<chimney.length-1;i++){let [w,y,d]=chimney[i],[W,Y,D]=chimney[i+1];poly([[-w,y,d],[w,y,d],[W,Y,D],[-W,Y,D]],'plaster','#cfbd9b');for(let s of [-1,1])poly([[s*w,y,-.08],[s*w,y,d],[s*W,Y,D],[s*W,Y,-.08]],'plaster','#bfaf91')}
 for(let x of [-.34,.34]){rod([x,.19,.29],[x,.25,.63],.024,.019,'iron',C.iron,8);rod([x,.18,.64],[x,.39,.62],.022,.017,'iron',C.iron,9);ball(x,.397,.62,.034,.038,.034,'iron','#706354',10,7)}
 for(let j=0;j<6;j++){let a=[rnd(-.46,-.23),.225+rnd(0,.09),rnd(.26,.56)],b=[rnd(.19,.42),.237+rnd(0,.085),rnd(.28,.52)];
 rod(a,b,.051,.038,'timber','#513a2b',9);for(let k=0;k<5;k++){let t=rnd(.12,.90),p=a.map((v,i)=>v+(b[i]-v)*t);ball(p[0],p[1]+.035,p[2]+.015,.041,.009,.018,'coal',tint('#d26d31',.3),7,4)}}
 /* Simple emissive tongues share a single animated mesh. */
 const fp=[],fc=[],fi=[];for(let j=0;j<18;j++){let x=rnd(-.35,.35),z=rnd(.27,.54),h=rnd(.12,.34),r=rnd(.023,.059),lean=rnd(-.067,.067);let i0=fp.length/3;
 for(let row=0;row<5;row++){let t=row/4,rr=r*[.60,1,.74,.41,.018][row],c=new T.Color(['#f97819','#ffad32','#ffc45a','#ffa523','#eb5e16'][row]);for(let k=0;k<8;k++){let a=k*TAU/8;fp.push(x+Math.cos(a)*rr+lean*t+.018*Math.sin(j+t*6)*t,.268+t*h,z+Math.sin(a)*rr);fc.push(c.r,c.g,c.b);if(row<4){let n=i0+row*8+k,next=i0+row*8+(k+1)%8;fi.push(n,next,n+8,next,next+8,n+8)}}}}
 const fg=new T.BufferGeometry();fg.setAttribute('position',new T.Float32BufferAttribute(fp,3));fg.setAttribute('color',new T.Float32BufferAttribute(fc,3));fg.setIndex(fi);
 const fm=new T.MeshBasicMaterial({vertexColors:true,side:T.DoubleSide,toneMapped:false});const fire=new T.Mesh(fg,fm);fire.position.set(-4.005,0,2.11);fire.rotation.y=PI/2;scene.add(fire);
 R.animations.push(time=>{fire.scale.y=1+.037*Math.sin(time*4.7)+.025*Math.sin(time*6.9+.3)});
 clock(-.18,1.669,.37);pottery(.67,1.669,.333,.70,'jar','#858775');sprigs(.67,1.84,.34,.67,true,'#898767');
 book(-.70,1.698,.32,.37,.053,.23,'#5b6960',-.08);book(-.68,1.745,.32,.31,.041,.205,'#8c6342',.045);
 cyl(-.68,1.79,.33,.045,.056,.053,'metal',C.brass);cyl(-.68,1.863,.33,.024,.027,.112,'wool','#d8c79f');rod([-.68,1.92,.33],[-.682,1.93,.33],.002,.002,'iron','#443b2d',6);
 shadow(0,0,.35,2.4,1.38);solid(0,.37,2.11,.96,0,'hearth')
 });
}
region('hearthside',hearth);
Object.assign(R,{props:{pottery,oilLamp,book,pillow,basket,ropeCoil,sprigs,clock,scaleAt}});
})(Room);
