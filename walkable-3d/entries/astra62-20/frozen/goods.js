import {box,place,rod,lathe,cylinder,ellipsoid,torus,path,grid,face,print,pi,tau} from './geometry.js';
import {P,rand,clothColors} from './materials.js';
import {pin,handle,spool,frame} from './joinery.js';
export function fold(x,y,z,w,d,h,col,mat='cloth',angle=0){
  place(x,y,z,()=>{
    const cross=[[-.48,.13],[-.50,.46],[-.485,.80],[-.40,.97],[.08,.95],[.456,1.00],[.495,.80],[.50,.45],[.485,.23],[.436,.13],[-.39,.125]];
    const point=(u,j)=>{const [zz,yy]=cross[j],a=u-.5;
      return [a*w+Math.sin(zz*6+a*9)*.003,h*yy+.0033*Math.sin(a*12+zz*8),zz*d+.003*Math.sin(u*8+yy)];
    };
    for(let j=0;j<cross.length-1;j++)for(let i=0;i<7;i++){
      const a=i/7,b=(i+1)/7,vs=[point(a,j),point(b,j),point(b,j+1),point(a,j+1)];
      face(vs,col,mat,vs.map(q=>[q[0]*2.7,q[2]*2.7+q[1]*1.9]));
    }
    for(const u of [0,1]){const a=Array.from({length:cross.length-1},(_,j)=>point(u,j));face(a,col,mat,a.map(q=>[q[2]*2,q[1]*2]));}
    path(Array.from({length:8},(_,j)=>{const q=point(j/7,8);q[1]+=.0015;return q}),.0018,'#c1ad89','cloth',9,4);
  },0,angle);
}
export function trunk(x,y,z,w,h,d,col=P.walnut){
  place(x,y,z,()=>{
    box(0,h*.43,0,w,h*.86,d,col,'leather',.025);
    const shape=(u,v)=>[-w/2+u*w,h*.84+h*.17*Math.sin(v*pi),d*(v-.5)];
    grid(2,12,shape,col,'leather',[w*3,d*3],true);
    for(const xx of [-w*.5,w*.5]){const a=Array.from({length:13},(_,i)=>[xx,h*.84+h*.17*Math.sin(i*pi/12),d*(i/12-.5)]);face(a,col,'leather',a.map(q=>[q[2]*3,q[1]*3]))}
    box(0,h*.79,d*.505,w,.017,.017,P.bronze,'metal');
    for(const s of [-1,1]){
      const xx=s*w*.31;box(xx,h*.42,d/2+.006,.052,h*.82,.015,P.leather,'leather');
      grid(1,12,(u,v)=>[xx+(u-.5)*.052,h*.84+h*.17*Math.sin(v*pi)+.004,d*(v-.5)],'#63412f','leather',[.31,1.3],true);
      frame(xx,h*.64,d/2+.016,.064,.073,.009,P.brass,.01,'metal');
      for(const sign of [-1,1])box(s*(w/2-.034),.032,sign*d*.498,.074,.061,.028,P.bronze,'metal');
      pin(xx,h*.27,d/2+.019,.007);
    }
    handle(0,h*.50,d/2+.011,Math.min(.24,w*.38));box(0,h*.794,d/2+.019,.08,.082,.014,P.brass,'metal');
  });
}
export function shears(x,y,z,scale=1,angle=0){
  place(x,y,z,()=>{
    for(const s of [-1,1]){
      place(s*.030,.011,-.081,()=>torus(0,0,0,s>0?.030:.023,.0058,P.brass,'metal',19,6),pi/2,0,s*.16,1,1.48,1);
      rod([s*.02,.011,-.055],[0,.011,0],.006,P.brass,'metal');
      const dep=s*.002;face([[s*.006,.011+dep,-.012],[-s*.011,.012+dep,.009],[-s*.044,.012+dep,.150],[-s*.021,.012+dep,.100]],'#bfc4b5','metal');
    }
    cylinder(0,.018,0,.009,.009,P.brass,'metal',12);
  },0,angle,0,scale,scale,scale);
}
export function rolled(x,y,z,r,h,id,lean=0){
  place(x,y,z,()=>{
    lathe(0,0,0,[[r*.93,0],[r,.013],[r,h-.012],[r*.97,h]],'#fff9e8','fabric'+id,22);
    const top=h+.001;
    for(let j=1;j<=4;j++)place(0,top,0,()=>torus(0,0,0,r*j*.195,.0018,'#aa9c7c','cloth',21,4),pi/2);
    cylinder(0,top+.001,0,r*.16,.003,'#766951','wood',12);
    lathe(0,0,0,[[r+.002,h*.47],[r+.002,h*.47+.033]],P.cream,'cloth',22,false);
    path([[0,h*.47+.017,r],[.05,h*.47-.021,r*.97],[.03,h*.47-.09,r*.95]],.004,P.cream,'cloth',7,4);
  },lean,0,-lean*.45);
}
export function machine(x,y,z){
  place(x,y,z,()=>{
    const lacquer='#283932',accent='#c6a15d';
    box(0,.026,0,.60,.052,.298,P.walnut,'wood',.02);
    box(0,.060,0,.558,.023,.263,lacquer,'metal',.009);
    for(const d of [-1,1]){
      box(0,.073,d*.109,.483,.003,.0035,accent,'metal',.001);
      box(d*.238,.073,0,.004,.003,.219,accent,'metal',.001);
    }
    box(-.140,.075,0,.127,.005,.119,'#a4aa9a','metal');
    lathe(.158,.070,0,[[.084,0],[.091,.015],[.069,.040],[.050,.084],[.043,.138],[.052,.184],[.068,.207],[.067,.242],[.050,.259]],lacquer,'pottery',23);
    // Sculpted arm bridges the gap between the upright and needle bar.
    const prof=[[-.147,.262,.030,.043],[-.138,.277,.055,.050],[-.107,.299,.046,.044],[-.065,.311,.035,.039],[.005,.319,.034,.040],[.084,.320,.041,.046],[.147,.303,.054,.060],[.187,.284,.046,.053]];
    for(let j=0;j<prof.length-1;j++)for(let i=0;i<18;i++){
      const a=tau*i/18,b=tau*(i+1)/18,p=(v,k)=>[v[0],v[1]+v[2]*Math.cos(k),v[3]*Math.sin(k)];
      face([p(prof[j],a),p(prof[j+1],a),p(prof[j+1],b),p(prof[j],b)],lacquer,'pottery');
    }
    lathe(-.14,0,0,[[.027,.217],[.041,.23],[.046,.277],[.041,.318],[.032,.335]],lacquer,'pottery',19);
    for(const yy of [.232,.306])lathe(-.14,yy,0,[[.046,0],[.046,.005]],accent,'metal',18,false);
    path([[-.115,.294,.042],[-.038,.315,.039],[.042,.317,.041],[.123,.305,.055],[.155,.26,.067]],.0035,accent,'metal',13,5);
    for(const yy of [.139,.205]){lathe(.158,yy,0,[[yy>.15?.049:.059,0],[yy>.15?.049:.059,.004]],accent,'metal',18,false)}
    rod([-.148,.129,.008],[-.148,.231,.008],.008,'#bbc0b4');rod([-.148,.081,.008],[-.148,.138,.008],.0028,'#d2d2bc');
    rod([-.126,.088,-.009],[-.126,.225,-.009],.005,P.brass);box(-.136,.085,-.002,.045,.009,.029,'#bdc0b1','metal');
    rod([.177,.285,0],[.32,.285,0],.021,P.bronze);
    place(.281,.285,0,()=>{
      torus(0,0,0,.129,.014,'#39453c','metal',32,8);
      torus(0,0,.005,.129,.004,accent,'metal',30,5);
      for(let j=0;j<6;j++){const a=j*tau/6;path([[.014*Math.cos(a),.014*Math.sin(a),0],[.071*Math.cos(a+.17),.071*Math.sin(a+.17),0],[.121*Math.cos(a),.121*Math.sin(a),0]],.0065,lacquer,'metal',8,5)}
      pin(0,0,.006,.028,accent);rod([.075,.086,0],[.075,.086,.049],.009,P.brass);
      rod([.075,.086,.040],[.075,.086,.10],.016,P.walnut,'wood',.012,10);
    },0,pi/2);
    rod([.106,.347,0],[.106,.452,0],.005,P.brass);spool(.106,.351,0,.030,.079,'#a76248');
    path([[.12,.401,.018],[.065,.392,.014],[-.102,.375,.012],[-.160,.321,.034],[-.168,.263,.031],[-.148,.132,.009]],.0015,'#c89e6a','cloth',12,4);
    for(const xx of [-.244,.244])for(const zz of [-.097,.097])cylinder(xx,.074,zz,.006,.004,P.brass,'metal',8);
  });
}
export function notionTray(x,y,z){
  place(x,y,z,()=>{
    box(0,.012,0,.656,.024,.31,P.walnut);
    for(const s of [-1,1]){
      box(0,.051,s*.149,.663,.084,.022,P.oak);box(s*.320,.051,0,.024,.084,.305,P.oak);
    }
    for(const xx of [-.106,.105])box(xx,.044,0,.013,.065,.28,P.chestnut);
    for(let j=0;j<14;j++){
      const xx=-.21+(rand()-.5)*.144,zz=(rand()-.5)*.20,yy=.032+.012*(j%3),r=.019+rand()*.009;
      cylinder(xx,yy,zz,r,.008,j%3?'#bfa475':'#977446','pottery',12);
      for(const sx of [-1,1])for(const sz of [-1,1])cylinder(xx+sx*.0046,yy+.0045,zz+sz*.0046,.0018,.001,'#4f4d3d','matte',6);
    }
    for(let k=0;k<3;k++){
      box(0,.034+k*.012,-.055+k*.045,.137,.009,.083,P.paper,'matte',.004);
      box(0,.041+k*.012,-.055+k*.045,.084,.007,.085,clothColors[k+2],'cloth');
    }
    for(let j=0;j<6;j++){
      const xx=.138+(j%3)*.040,z=-.070+Math.floor(j/3)*.092;
      spool(xx,.026,z,.021,.066,clothColors[(j+3)%8]);
    }
  })
}