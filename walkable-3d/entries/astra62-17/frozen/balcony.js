(function(R){
'use strict';
const {T,PI,TAU,C,scene,mats,at,box,rounded,ball,cyl,lathe,torus,tube,beam,rod,grid,poly,panel,solid,story,rnd,pick,tint,canvasMat,shadow,region}=R;
const {pottery,sprigs,basket,scaleAt}=R.props,F=R.floorPlan;
function rail(a,b,yaw){
 const dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz);
 at((a[0]+b[0])/2,0,(a[1]+b[1])/2,yaw,()=>{
 const wood='#8a785d';rounded(0,1.035,0,len+.021,.095,.14,.019,'timber','#a58d69');box(0,.973,0,len,.041,.102,'timber','#79694f');box(0,.266,0,len,.081,.083,'timber',wood);box(0,.211,0,len,.034,.10,'timber','#7f6d54');
 const n=Math.round(len/.193),pitch=len/n;
 const steps=[[.29,.048],[.35,.050],[.375,.032],[.422,.026],[.456,.043],[.497,.057],[.537,.058],[.578,.045],[.60,.023],[.626,.021],[.677,.044],[.819,.049],[.86,.034],[.886,.03],[.922,.042],[.969,.043]];
 for(let i=0;i<n;i++){let x=-len/2+(i+.5)*pitch,col=tint(wood,.12);for(let j=0;j<steps.length-1;j++){const [y,w]=steps[j],[Y,W]=steps[j+1];
 for(let s of [-1,1])poly([[x-w,y,.025*s],[x+w,y,.025*s],[x+W,Y,.025*s],[x-W,Y,.025*s]],'timber',col);
 for(let s of [-1,1])poly([[x+s*w,y,-.025],[x+s*w,y,.025],[x+s*W,Y,.025],[x+s*W,Y,-.025]],'timber',col)}
 }
 solid(0,0,len,.12,0,'balcony rail')
 })
}
function post(x,z){
 const top=2.883;rounded(x,top/2,z,.137,top,.137,.010,'timber','#806d53');
 for(let y of [.13,.885,1.097,2.58]){rounded(x,y,z,.164,.048,.164,.007,'timber',y===1.097?'#ab906c':'#907b5e')}
 box(x,.072,z,.181,.143,.181,'timber','#77654f');for(let y of [.247,.972,2.72])cyl(x-.073,y,z,.017,.017,.009,'timber','#a48862',10,0,0,PI/2);
 solid(x,z,.151,.151,0,'balcony post')
}
function geraniums(x,y,z,s){
 scaleAt(x,y,z,s,0,()=>{
 for(let i=0;i<13;i++){let a=rnd(0,TAU),rr=rnd(.025,.14),xx=Math.cos(a)*rr,zz=Math.sin(a)*rr,h=rnd(.12,.25);
 rod([0,0,0],[xx,h,zz],.0027,.0016,'leaf','#61744a',5);
 for(let k=0;k<3;k++){let q=a+k*2.1,tt=.35+k*.19,cx=xx*tt+Math.cos(q)*.024,cz=zz*tt+Math.sin(q)*.024,cy=h*tt;
 rod([xx*tt,cy-.014,zz*tt],[cx,cy,cz],.0015,.0011,'leaf','#788456',4);
 let ps=[[cx,cy+.005,cz]];for(let j=0;j<=12;j++){const an=q+j/12*TAU,rad=.025*(1+.13*Math.cos(j*PI));ps.push([cx+Math.cos(an)*rad,cy+.002*Math.sin(j)+.010*Math.cos(an-q),cz+Math.sin(an)*rad])}poly(ps,'leaf',pick(['#748154','#697a50','#829068']))}
 for(let k=0;k<5;k++){let q=k*TAU/5,xx2=xx+Math.cos(q)*.016,zz2=zz+Math.sin(q)*.016;cyl(xx2,h,zz2,.011,.006,.012,'leaf',pick(['#b96958','#b77b64','#ab5c4c','#d08c73']),6);ball(xx2,h+.008,zz2,.005,.005,.005,'leaf','#c9a06d',6,4)}
 }})
}
function planter(x,z,len){
 at(x,0,z,PI/2,()=>{
 for(let i of [-1,1]){beam([i*len*.34,.78,.02],[i*len*.34,1.03,-.105],.027,.032,'iron',C.iron);box(i*len*.34,.884,-.089,.033,.287,.030,'iron',C.iron)}
 rounded(0,.989,-.14,len,.175,.197,.013,'timber','#97694a');rounded(0,1.083,-.14,len+.029,.029,.224,.006,'timber','#ae8059');box(0,1.099,-.14,len-.034,.009,.176,'plain','#51483a');
 for(let i=0;i<Math.floor(len/.145);i++){let xx=-len/2+.095+i*.155;if(i%3===0)geraniums(xx,1.105,-.134,.82);else sprigs(xx,1.105,-.143,.61,i%2===0,i%2?'#7b8862':'#7b886d')}
 })
}
function gallery(){
 R.arch.floor(3.63,5.238,-5.39,.932,true);
 for(let z of [-5.313,-3.260,-1.21,.83]){post(5.128,z);for(let s of [-1,1]){if((z< -5.2&&s===-1)||(z>.7&&s===1))continue;
 beam([5.128,2.45,z+s*.067],[5.128,2.795,z+s*.405],.089,.095,'timber','#947d5f')}
 beam([5.06,2.473,z],[4.71,2.857,z],.087,.099,'timber','#947d5f')
 }
 rail([5.128,-5.313],[5.128,.83],PI/2);rail([3.586,-5.313],[5.128,-5.313],0);rail([3.586,.83],[5.128,.83],0);
 box(5.128,2.867,-2.24,.153,.185,6.36,'timber','#74614b');
 const left=3.49,right=5.43,n=12,dx=(right-left)/n;
 for(let j=0;j<n;j++){let x=left+(j+.5)*dx,y=3.17-(x-left)*.145;box(x,y+.033,-2.25,dx+.004,.093,6.64,'timber',tint('#9d8566',.13),0,0,-.144)}
 for(let j=0;j<11;j++){let z=-5.45+j*.646;beam([3.50,3.111,z],[5.43,2.832,z],.086,.105,'timber','#887253')}
 box(5.413,2.845,-2.24,.072,.162,6.68,'timber','#876e52');box(3.641,3.042,-2.22,.144,.162,6.45,'timber',C.wood);
 for(let z of [-5.26,-3.13,-1.085,.735]){box(3.64,1.537,z,.144,3.071,.121,'timber',C.edge);cyl(3.717,2.893,z,.019,.02,.012,'timber','#a4845e',10,0,0,PI/2)}
 /* A short fold-down bench with shaped supports at the closed end. */
 at(4.31,0,.565,PI,()=>{
 for(let x of [-.367,.367]){beam([x,.127,-.134],[x,.427,.11],.045,.046,'timber','#796951');box(x,.273,-.129,.062,.363,.057,'timber','#877558')}
 for(let j=0;j<3;j++)rounded(0,.459,(j-1)*.094,.88,.052,.089,.008,'timber',tint('#a59172',.08));
 solid(0,-.012,.89,.325,0,'balcony bench')
 });
 planter(5.015,-3.05,.79);planter(5.015,-.83,.69);
 at(4.123,0,-4.998,.09,()=>{pottery(0,.001,0,1.47,'jar','#a1704c');sprigs(0,.36,0,1.07,true,'#81876a');solid(0,0,.40,.40,0,'lavender crock')});
 /* Small bell from the tavern, hung beside the study door. */
 at(3.644,1.805,-3.29,PI/2,()=>{
 box(0,.16,.016,.091,.245,.036,'timber',C.wood);tube([[0,.205,.024],[0,.222,.147],[0,.202,.217],[0,.147,.222]],.009,'iron','#6c6551',7,16);
 lathe(0,-.012,.217,[[.081,0],[.086,.009],[.078,.019],[.060,.035],[.046,.089],[.042,.125],[.022,.14],[.001,.142]],'metal','#b39960',24);
 ball(0,-.021,.217,.013,.016,.013,'metal','#927845',12,7);tube([[0,-.018,.217],[.009,-.144,.20],[-.003,-.294,.199]],.004,'wool','#a79570',6,14);ball(-.003,-.307,.199,.012,.021,.012,'timber',C.edge,10,6)
 });
 story(4.88,1.20,-.85,'The balcony boxes','Down from the pass','The saxifrage failed in the first summer. The kitchen sage liked the rail from the start.',1.68)
}
region('balcony',gallery);
/* Distant scenic ground is outside the walkable floor union. */
function vista(){
 const loader=new T.TextureLoader(R.manager),sk=R.textureSetup(loader.load(window.ROOM_SKY),true,false);sk.wrapS=T.RepeatWrapping;sk.anisotropy=1;
 const sky=new T.Mesh(new T.SphereGeometry(220,56,24),new T.MeshBasicMaterial({map:sk,side:T.BackSide,fog:false,depthWrite:false,toneMapped:false}));sky.name='Daylight panorama';sky.renderOrder=-12;scene.add(sky);
 const wedges=Array.from({length:12},()=>({p:[],c:[]}));const terrainMat=new T.MeshBasicMaterial({vertexColors:true,side:T.FrontSide,fog:false,toneMapped:false}),cs={};const color=h=>cs[h]||(cs[h]=new T.Color(h));
 function peaks(count,seed,extra){let a=[];for(let j=0;j<count;j++)a.push([j/count*TAU+rnd(-.09,.09),rnd(.42,1),rnd(.12,.42)]);return a.concat(extra||[])}
 const ranges=[
 {dist:145,base:13.5,relief:20.7,snow:22,haze:.68,peaks:peaks(25,2,[[.23,1.37,.31],[-.49,1.18,.32]]),colors:['#849394','#c4c8bd','#e5d9bd']},
 {dist:98,base:5.9,relief:16.3,snow:15,haze:.38,peaks:peaks(17,3,[[-.79,1.28,.3],[.48,1.28,.31]]),colors:['#798b87','#a8b3a9','#e2d4b4']},
 {dist:63,base:.00,relief:9.2,snow:99,haze:.23,peaks:peaks(16,4),colors:['#738579','#8f9d83','#b5b098']},
 {dist:35,base:-6.25,relief:5.66,snow:99,haze:.09,peaks:peaks(14,5),colors:['#5c7065','#738373','#9e9d7b']},
 {dist:19,base:-10.4,relief:4.4,snow:99,haze:0,peaks:peaks(13,6),colors:['#5a6956','#73816a','#94916d']}
 ];
 function terrain(a,t,L,k){
 const dif=(x,y)=>Math.abs(Math.atan2(Math.sin(x-y),Math.cos(x-y)));let pk=0;for(let [q,h,w] of L.peaks)pk=Math.max(pk,h*Math.max(0,1-dif(a,q)/w)**.84);
 const minor=(.46*Math.sin(a*29+k)+.265*Math.sin(a*51+.5)+.16*Math.cos(a*97+k)+.08*Math.sin(a*137))*L.relief*.18;
 const summit=L.base+pk*L.relief+minor,pos=.57+.061*Math.sin(7*a+k)+.029*Math.sin(16*a),f=Math.max(0,1-Math.abs(t-pos)/(t<pos?pos:1-pos));
 const val=-15+f*(summit+15)+Math.sin(27*a+t*4+k)*Math.sin(t*PI)*L.relief*.067+Math.cos(a*48+t*9)*Math.sin(t*PI)*L.relief*.038;
 const dist=L.dist*(.72+.48*t+.019*Math.sin(a*9))+Math.sin(a*34+k)*.52;
 return[Math.cos(a)*dist,val,Math.sin(a)*dist]
 }
 for(let k=0;k<ranges.length;k++){
 const L=ranges[k],N=k<2?365:204,M=k<2?20:13,rows=[];let bucket=wedges[0];for(let j=0;j<=M;j++){let row=[];for(let i=0;i<=N;i++){const a=i*TAU/N+(i===N||i===0?0:.0034*Math.sin(i*17.9+j*19.3));row.push(terrain(a,j/M,L,k))}rows.push(row)}
 const va=new T.Vector3(),vb=new T.Vector3(),vc=new T.Vector3(),norm=new T.Vector3(),sun=new T.Vector3(.87,.40,-.259);
 function tri(A,B,D){va.fromArray(A);vb.fromArray(B);vc.fromArray(D);norm.crossVectors(vb.sub(va),vc.sub(va)).normalize();if(norm.y<0)norm.negate();
 const y=(A[1]+B[1]+D[1])/3,XX=(A[0]+B[0]+D[0])/3,ZZ=(A[2]+B[2]+D[2])/3;
 const light=norm.dot(sun),fleck=.34*Math.sin(XX*.50+ZZ*.19)+.28*Math.cos(XX*.79-ZZ*.39)+.18*Math.sin(XX*1.33+ZZ*.94);
 const snow=y>L.snow+fleck*1.7+Math.max(0,.75-norm.y)*10;const tone=new T.Color().copy(color(L.colors[0])).lerp(color(L.colors[1]),Math.max(0,Math.min(1,.27+light*.57+fleck*.089)));
 if(snow)tone.lerp(color(light>.29?L.colors[2]:'#c1ceca'),.70+.2*Math.max(0,light));else if(k<2&&light>.58)tone.lerp(color('#c7b89b'),.26);
 if(k>=2&&y<-3&&Math.sin(XX*1.9+ZZ*.8)*.5+fleck>.08)tone.multiplyScalar(.90);
 for(let v of [A,B,D]){bucket.p.push(...v);bucket.c.push(tone.r,tone.g,tone.b)}
 }
 for(let j=0;j<M;j++)for(let i=0;i<N;i++){bucket=wedges[Math.floor(i/N*wedges.length)];let a=rows[j][i],b=rows[j][i+1],c=rows[j+1][i],d=rows[j+1][i+1];if((i+j)&1){tri(a,b,d);tri(a,d,c)}else{tri(a,b,c);tri(b,d,c)}}
 } for(const [k,bucket] of wedges.entries()){const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(bucket.p,3));g.setAttribute('color',new T.BufferAttribute(Uint8Array.from(bucket.c,v=>Math.round(Math.min(1,v)*255)),3,true));g.computeBoundingSphere();const m=new T.Mesh(g,terrainMat);m.name='Vesper ridge '+(k+1);scene.add(m)
 }
 const ground=new T.Mesh(new T.CircleGeometry(165,80),new T.MeshBasicMaterial({color:'#778273',side:T.DoubleSide,fog:false,toneMapped:false}));ground.rotation.x=-PI/2;ground.position.y=-14.93;ground.name='Valley floor';scene.add(ground);
 canvasMat('fir',192,384,(c,w,h)=>{
 const line=R.art.line;line(c,[[98,377],[96,226],[96,24]],'#45574c',3.1);
 for(let j=0;j<58;j++){let t=j/57,y=27+t*317,span=(5+t*67)*(1-.19*Math.cos(j*2.4));for(let s of [-1,1]){const x=96+rnd(-1.5,1.5),p=[[x,y-rnd(3,9)],[x+s*span*.30,y+rnd(4,12)],[x+s*span*.77,y+rnd(9,19)],[x+s*span,y+rnd(7,23)],[x+s*span*.57,y+rnd(13,26)],[x+s*span*.41,y+rnd(9,18)],[x+s*span*.11,y+rnd(2,13)]];R.art.path(c,p,pick(['#5a6d5c','#526352','#657563','#71816e']));
 for(let k=0;k<4;k++){let u=(k+.5)/4;line(c,[[x+s*span*u,y+u*14],[x+s*span*(u+.11),y+u*14+7]],'#5d6b56',1.7)}}}
 },{alphaTest:.48,side:T.DoubleSide});mats.fir.userData.noCast=true;
 /* Clustered treetops on the lower moraine, with the central view left open. */
 region('vista',()=>{for(let j=0;j<290;j++){let a=rnd(0,TAU),l=rnd(12.6,37.3),x=Math.cos(a)*l,z=Math.sin(a)*l,h=rnd(2.1,6.3),y=-11.8+1.3*Math.sin(a*3+.7)+1.1*Math.sin(a*9)+rnd(-.6,.7);if(Math.abs(Math.sin(a+.1))>.61&&l<23)h*=1.30;
 at(x,y+h*.5,z,Math.atan2(-x,-z),()=>panel(0,0,0,h*rnd(.39,.54),h,'fir',tint('#f0ebd9',.12)))
 }});
}
vista();
})(Room);
