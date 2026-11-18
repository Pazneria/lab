'use strict';
const C={oak:0x715039,edge:0x8c6544,dark:0x49392e,smoke:0x51463b,cream:0xc7b69b,plaster:0xd5c6a5,stone:0x847f70,
 iron:0x443f37,brass:0xb49a5b,sage:0x697e6d,green:0x415d50,tile:0xb38d6e,red:0x985847,blue:0x516e78,ivory:0xe5d9b5};
function partition(x,y,z,w,h,d,col=C.plaster){box(x,y,z,w,h,d,col,M.lime,.012);if(y-h/2<.65)solid(x,z,w,d);if(y-h/2<1)ao(x,y,z,w,h,d,.32)}
function planksFace(x,y,z,w,h,depth,n,col){for(let i=0;i<n;i++)box(x-w/2+w/n*(i+.5),y,z,w/n-.006,h,depth,tint(col,between(.92,1.06)),M.wood,.004)}
function frameWindow(w,h,cols,rows,col=C.sage,leaded=false){
 const g=.075;
 for(const s of [-1,1]){box(s*w/2,0,0,g,h+.10,.145,col);box(0,s*h/2,0,w+.10,g,.15,col)}
 box(0,-h/2-.035,.028,w+.19,.083,.22,tint(col,1.08));
 for(let i=1;i<cols;i++)box(-w/2+i*w/cols,0,0,.042,h,.075,tint(col,1.07),M.wood,.004);
 for(let j=1;j<rows;j++)box(0,-h/2+j*h/rows,.004,w,.039,.08,col,M.wood,.004);
 for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){
  const xx=-w/2+(i+.5)*w/cols,yy=-h/2+(j+.5)*h/rows;
  poly([[xx-w/cols/2,yy-h/rows/2,-.013],[xx+w/cols/2,yy-h/rows/2,-.013],[xx+w/cols/2,yy+h/rows/2,-.013],[xx-w/cols/2,yy+h/rows/2,-.013]],pick([0xb9d5d5,0xc3dbd4,0xb6d2d1]),M.glass);
  if(leaded&&j===rows-1){const ww=w/cols*.5,hh=h/rows*.5;for(const s of [-1,1])for(const t of [-1,1])beam([xx+s*ww,yy,.001],[xx,yy+t*hh,.001],.012,.012,0x778077,M.metal,.001)}
 }
}
function slab(x,z,w,d,base,h,col,mat){
 const x0=x-w/2,x1=x+w/2,z0=z-d/2,z1=z+d/2;
 const a=Array.from({length:8},()=>between(.009,Math.min(w,d)*.15));
 const q=[[x0+a[0],z0],[x1-a[1],z0],[x1,z0+a[2]],[x1,z1-a[3]],[x1-a[4],z1],[x0+a[5],z1],[x0,z1-a[6]],[x0,z0+a[7]]];
 const top=q.map(([u,v])=>[x+(u-x)*.992,base+h,z+(v-z)*.99]);
 newUV();poly(top.slice().reverse(),col,mat,null,top.slice().reverse().map(p=>[p[0],p[2]]));
 for(let i=0;i<8;i++){const j=(i+1)%8;poly([[q[i][0],base,q[i][1]],top[i],top[j],[q[j][0],base,q[j][1]]],tint(col,.88),mat)}
}
function floorRows(x0,x1,z0,z1,rowD,minW,maxW,colors,mat,h){
 const rows=Math.ceil((z1-z0)/rowD),d=(z1-z0)/rows;
 for(let j=0;j<rows;j++){let x=x0;while(x<x1-.005){let w=Math.min(between(minW,maxW),x1-x);if(x1-x-w<minW*.56)w=x1-x;
  slab(x+w/2,z0+(j+.5)*d,w-.013,d-.013,-.065,h+between(-.0015,.0015),pick(colors),mat);x+=w}}
}
function rug(x,z,w,d,col){
 group(x,.009,z,0,()=>{
  function shape(pts,c,y=.001){poly(pts.map(p=>[p[0],y,p[1]]).reverse(),c,M.linen,null,pts.map(p=>[p[0]*3,p[1]*3]).reverse())}
  function rect(x,z,w,d,c,y){shape([[x-w/2,z-d/2],[x+w/2,z-d/2],[x+w/2,z+d/2],[x-w/2,z+d/2]],c,y)}
  rect(0,0,w,d,col,.001);const sand=0xc6a879,blue=0x4b6966;
  for(const s of [-1,1]){rect(s*(w/2-.037),0,.026,d-.04,sand,.002);rect(s*(w/2-.105),0,.07,d-.13,blue,.002);
   rect(0,s*(d/2-.047),w-.07,.025,sand,.002);rect(0,s*(d/2-.12),w-.18,.052,blue,.002)}
  const n=Math.max(2,Math.round(w/.49));
  for(let i=0;i<n;i++){let xx=(i-(n-1)*.5)*(w-.36)/n,rx=(w-.40)/n*.43,rz=d*.30;
   shape([[xx-rx,0],[xx,-rz],[xx+rx,0],[xx,rz]],sand,.003);
   shape([[xx-rx*.76,0],[xx,-rz*.7],[xx+rx*.76,0],[xx,rz*.7]],blue,.004);
   shape([[xx-rx*.33,0],[xx,-rz*.31],[xx+rx*.33,0],[xx,rz*.31]],0xc78f5c,.005)}
  for(const s of [-1,1])for(let i=0;i<Math.floor(d/.039);i++){const zz=-d/2+.024+i*.039;rect(s*(w/2+.024),zz,.059+rand()*.025,.016,0xc4b495,.001)}
 })
}
function gable(z){for(const s of [-1,1]){let mid=-.15;
 const a=[mid,4.42,z],b=[mid+s*3.55,2.67,z],c=[mid,2.67,z];
 poly([a,b,c],C.plaster,M.lime,[[0,0,z<0?1:-1],[0,0,z<0?1:-1],[0,0,z<0?1:-1]]);
 beam([mid+s*3.5,2.69,z+(z<0?.09:-.09)],[mid,4.45,z+(z<0?.09:-.09)],.14,.16,C.dark);
 beam([mid+s*1.75,2.72,z+(z<0?.07:-.07)],[mid+s*1.75,3.5,z+(z<0?.07:-.07)],.12,.13,C.oak)
 }box(-.15,3.52,z, .16,1.83,.21,C.dark)}
function truss(z,heavy){
 const mid=-.15,wood=heavy?C.dark:C.oak;
 for(const s of [-1,1]){beam([mid+s*3.54,2.65,z],[mid,4.43,z],heavy?.20:.105,heavy?.22:.105,wood);
  if(heavy){beam([mid+s*2.99,2.70,z],[mid+s*2.20,3.31,z],.145,.16,C.oak);beam([mid+s*1.1,2.69,z],[mid,3.43,z],.10,.12,C.oak)}}
 if(heavy){box(mid,2.69,z,7.18,.21,.22,wood,M.wood,.025);box(mid,3.54,z,.15,1.73,.17,C.oak);
  for(let i of [-2.95,-1.05,0,1.05,2.95])for(const s of [-1,1])rod([mid+i,2.69,z+s*.112],[mid+i,2.69,z+s*.123],.023,.023,0x403627,M.wood,9)}
}
function shell(){
 box(-.15,-.106,.42,7.1,.09,10.25,0x675f52,M.stone,0);
 floorRows(-3.65,3.35,-.03,5.52,.61,.58,1.17,[0xa09a83,0xb0a48b,0x999686,0xb2a88e,0xa59d8a,0x949184],M.stone,.065);
 for(let i=0;i<Math.ceil(7/.235);i++){const xx=-3.65+(i+.5)*7/30;let z=-4.66;while(z<-.03){let len=Math.min(between(1.52,3.05),-.03-z);if(-.03-z-len<.64)len=-.03-z;
  box(xx,-.031,z+len/2,7/30-.005,.061,len-.007,pick([0x85684b,0x927254,0x816248,0x987758,0x82674e]),M.wood,.004);
  for(const zz of [z+.045,z+len-.05])for(const ss of [-1,1])if(len>.3)rod([xx+ss*.07,-.001,zz],[xx+ss*.07,.0002,zz],.006,.006,0x544939,M.metal,6);z+=len}}
 box(4.76,-.108,-.85,2.86,.10,7.65,0x686858,M.stone,0);
 floorRows(3.34,6.18,-4.68,2.97,.28,.39,.61,[0x9c7862,0xa18068,0x917b68,0xb18a70,0x887769],M.stone,.063);
 rug(-.52,-2.81,3.14,1.01,0x9d5e49);
 rug(1.94,4.12,2.14,1.64,0x9c7451);
 // Plastered outer walls with true openings.
 partition(-3.71,1.34,-1.14,.17,2.68,7.1);
 partition(-3.71,1.34,4.98,.17,2.68,1.12);
 partition(-3.71,.56,3.40,.17,1.12,2.05);partition(-3.71,2.52,3.40,.17,.34,2.06);
 group(-3.65,1.74,3.415,PI/2,()=>frameWindow(2.01,1.21,3,2,0x7b8470,true));
 // North wall. Large working window above the stillroom table.
 partition(-2.99,1.34,-4.73,1.50,2.68,.17);partition(1.48,1.34,-4.73,3.87,2.68,.17);
 partition(-1.34,.70,-4.73,1.8,1.4,.17);partition(-1.34,2.59,-4.73,1.8,.2,.17);
 group(-1.34,1.94,-4.65,0,()=>frameWindow(1.8,1.10,3,2,C.sage,true));
 // Entrance wall and breakfast window.
 partition(-2.0,1.34,5.59,3.42,2.68,.18);partition(.43,2.47,5.59,1.5,.45,.18);
 partition(1.27,1.34,5.59,.21,2.68,.18);partition(2.36,.62,5.59,1.99,1.24,.18);partition(2.36,2.52,5.59,1.99,.37,.18);
 group(2.35,1.78,5.52,PI,()=>frameWindow(1.92,1.10,3,2,0x79836e,true));
 group(.44,0,5.51,PI,()=>{box(0,1.11,0,1.48,2.24,.12,C.dark);planksFace(0,1.07,.07,1.29,2.12,.08,7,0x657b69);
 for(const s of [-1,1])box(s*.70,1.12,.108,.12,2.25,.15,C.oak);box(0,2.23,.10,1.54,.15,.15,C.oak);
 for(let y of [.27,1.77]){box(-.34,y,.136,.53,.062,.026,C.iron,M.metal);for(let x of [-.55,-.33,-.12])ball(x,y,.155,.017,.017,.008,C.brass,M.metal,8,4)}
 box(.43,1.03,.137,.09,.22,.025,C.iron,M.metal);ball(.43,1.01,.197,.047,.047,.05,C.brass,M.metal);
 solid(0,0,1.48,.18)});
 partition(3.43,1.35,4.24,.16,2.7,2.66);
 for(const [x,z,w,d] of [[-3.595,.43,.105,10.17],[-.16,-4.61,7.0,.105],[-1.96,5.48,3.28,.105],[2.26,5.48,2.16,.105],[3.33,4.24,.1,2.53]]){
  box(x,.12,z,w,.24,d,C.smoke,M.wood,.01)}
 for(const z of [-4.62,-2.38,-.02,2.68,5.48]){
  for(const x of [-3.58,3.32]){if(x>0&&z===-2.38)continue;box(x,1.37,z,.165,2.74,.19,C.oak,M.wood,.018);solid(x,z,.16,.18)}
 }
 for(let j=0;j<2;j++){const xx=j===0?-3.58:3.32;box(xx,2.66,.43,.19,.17,10.30,C.dark)}
 // Boarded underside of the pitched roof with purlins and pegged trusses.
 for(const s of [-1,1]){
  for(let k=0;k<15;k++){const u=(k+.5)/15,r=-.15+s*3.65*u,y=4.55-1.81*u;
   group(r,y,.43,0,()=>box(0,0,0,.278,.085,10.45,pick([0x8b7155,0x957c61,0x806950,0x98806a]),M.wood,.006),0,-s*.460)}
  box(-.15+s*1.84,3.53,.43,.155,.17,10.39,C.dark);box(-.15+s*2.95,2.984,.43,.125,.13,10.39,C.oak)
 }
 for(let z of [-4.61,-3.49,-2.37,-1.20,-.02,1.29,2.66,4.09,5.48])truss(z,[-4.61,-.02,5.48].includes(z));
 gable(-4.67);gable(5.55);
 // Enfold the kitchen and stillroom with a broad, carpenter-built opening.
 for(const [x,w] of [[-3.09,1.08],[2.99,.77]]){
  partition(x,1.30,0,w,2.60,.18,0xc5b699);box(x,.25,0,w,.50,.21,0x7d7966,M.stone,.019)
 }
 for(const x of [-2.50,2.55]){
  box(x,1.32,0,.19,2.64,.23,C.dark,M.wood,.024);solid(x,0,.2,.23);
  beam([x,1.97,0],[x+(x<0?.74:-.74),2.60,0],.15,.205,C.oak)
 }
}
function glasshouse(){
 const frameCol=0x667e72,trim=0x8a9b85,metal=0x727c6c;
 function section(z0,z1,door){
  const len=z1-z0,z=(z0+z1)/2;
  if(door){
   box(3.39,2.29,z,.16,.135,len+.03,C.oak);group(3.40,2.51,z,-PI/2,()=>frameWindow(len-.07,.33,2,1,frameCol));
   for(const q of [z0,z1]){box(3.39,1.18,q,.19,2.38,.14,C.oak);solid(3.39,q,.17,.13)}
   box(3.39,.013,z,.20,.027,len,0x93846d,M.stone,.003)
  }else{
   partition(3.42,.38,z,.15,.76,len,0xa99e84);box(3.41,.76,z,.235,.095,len+.015,C.oak);
   group(3.42,1.72,z,-PI/2,()=>frameWindow(len,1.85,Math.ceil(len/.62),2,frameCol))
  }
 }
 section(-4.65,-3.10,false);section(-3.10,-1.81,true);section(-1.81,.98,false);section(.98,2.33,true);section(2.33,2.99,false);
 function dwarf(x,z,w,d){box(x,.22,z,w,.44,d,0x97917a,M.stone,.018);box(x,.46,z,w+.045,.095,d+.045,0xa69b7f,M.stone,.013);solid(x,z,w,d);
  const len=Math.max(w,d),n=Math.ceil(len/.56),alongX=w>d;
  for(let j=0;j<2;j++)for(let i=0;i<n;i++){const a=-len/2+(i+.5)*len/n;
   box(x+(alongX?a:0),.113+j*.204,z+(alongX?0:a),alongX?len/n-.012:w+.013,.192,alongX?d+.012:len/n-.012,pick([0x958e79,0xa09981,0x878979]),M.stone,.012)}
 }
 dwarf(6.19,-.84,.19,7.8);for(const zz of [-4.73,3.04])dwarf(4.79,zz,2.94,.19);
 const zStart=-4.68,zEnd=2.995,n=8,step=(zEnd-zStart)/n;
 for(let i=0;i<n;i++){
  const z=zStart+(i+.5)*step;group(6.17,1.38,z,-PI/2,()=>frameWindow(step-.025,1.75,2,2,trim));
 }
 for(const z of [-4.67,3.00]){
  group(4.80,1.38,z,0,()=>frameWindow(2.76,1.75,4,2,trim));
  const q=[[3.4,2.29,z],[6.18,2.29,z],[3.4,3.08,z]];poly(q,0xbcd7d1,M.glass);
  for(let i=0;i<4;i++){const t=i/4,x=3.4+t*2.78;box(x,2.29+(1-t)*.395,z,.052,(1-t)*.79,.08,frameCol)}
 }
 for(let i=0;i<=n;i++){
  const z=zStart+i*step;beam([3.36,3.11,z],[6.22,2.29,z],.075,.093,frameCol);
  if(i%2===0){box(6.16,1.38,z,.095,1.85,.095,frameCol);beam([6.15,1.92,z],[5.87,2.33,z],.048,.052,frameCol)}
  if(i<n){
   const a=z+.035,b=z+step-.035;
   for(let j=0;j<3;j++){
    const pos=t=>[3.38+t*2.80,3.088-t*.795];
    const [x,y]=pos(j/3),[xx,yy]=pos((j+1)/3);
    const vent=i===3&&j===2,raise=vent?.255:0;
    poly([[x,y,a],[xx,yy+raise,a],[xx,yy+raise,b],[x,y,b]],0xb6d1cd,M.glass);
    if(vent){
     for(const zz of [a,b])beam([x,y,zz],[xx,yy+raise,zz],.043,.043,frameCol);
     beam([xx,yy+raise,a],[xx,yy+raise,b],.043,.043,frameCol);
     rod([xx-.026,yy-.013,b-.13],[xx-.11,yy+raise+.004,b-.13],.007,.007,C.brass,M.metal,8);
     for(const zz of [a+.12,b-.12])rod([x,y+.012,zz-.038],[x,y+.012,zz+.038],.013,.013,C.brass,M.metal,9)
    }
   }
  }
 }
 for(let j=0;j<=3;j++){const t=j/3;box(3.38+2.80*t,3.09-.795*t,-.84,.053,.056,7.80,j===0?C.oak:metal,M.wood,.005)}
 box(6.22,2.29,-.84,.11,.11,7.88,frameCol);box(3.38,2.85,-.84,.18,.40,7.81,0x82745a,M.wood,.012);
}
function surroundings(){
 // Shallow silhouettes beyond the glass give the glazing a horizon and parallax.
 box(0,-.19,0,58,.17,58,0x859088,M.lime,0);
 const colors=[0x88998b,0x9ba99a,0x909f93,0x859688,0xa6b09f];
 for(let i=0;i<55;i++){
  const a=TAU*i/55+between(-.045,.045),r=between(13,25),x=Math.cos(a)*r,z=Math.sin(a)*r,y=between(.8,2.2),s=between(1.15,2.65);
  rod([x,-.15,z],[x+.08,y+1.6,z],.14,.068,0x827f6e,M.wood,7);ball(x,y+s*.45,z,s,s*between(.63,1.30),s*.78,pick(colors),M.lime,10,6)
 }
 // Old boundary coping just beyond the glasshouse.
 for(let i=0;i<20;i++){const z=-7+i*.65;box(8.65,.31,z,.3,.67,.635,pick([0x909383,0x9c9c85,0xa1a18c]),M.stone,.04);
  box(8.65,.684,z,.39,.096,.65,0xa9a894,M.stone,.023)}
}
