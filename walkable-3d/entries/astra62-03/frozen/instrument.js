import {TAU,PI,UP,DOWN,rad,radial,mix,add,mul,sub,unit,randomSource} from './geometry.js';
import {F,ROOF_YAW} from './layout.js';

function turned(g,mat,profile,n=48,opts={}){
  g.revolve(mat,profile,n,opts,true);
}
function bolt(g,p,axis,r=.042){
  const end=(h)=>add(p,mul(axis,h));
  g.cylinder('aged',p,end(r*.31),r*1.22,r*1.22,16);
  g.cylinder('brass',end(r*.29),end(r*.83),r,r*.94,6,{faceted:true});
}
function teeth(g,mat,inner,root,tip,y,h,count){
  const profile=[[0,root],[.19,root],[.30,tip],[.59,tip],[.72,root],[1,root]];
  for(let i=0;i<count;i++)for(let j=0;j<profile.length-1;j++){
    const a=(i+profile[j][0])*TAU/count,b=(i+profile[j+1][0])*TAU/count,ra=profile[j][1],rb=profile[j+1][1];
    const A=rad(a,ra,y),B=rad(b,rb,y),C=rad(b,rb,y+h),D=rad(a,ra,y+h);
    g.face(mat,[A,B,C,D],radial((a+b)/2),{tone:j===2?1:.91});
    g.face(mat,[rad(a,inner,y+h),D,C,rad(b,inner,y+h)],UP);
    g.face(mat,[rad(a,inner,y),A,B,rad(b,inner,y)],DOWN);
  }
}
function annularFace(g,mat,ri,ro,y,segments){
  for(let i=0;i<segments;i++){
    const a=i*TAU/segments,b=(i+1)*TAU/segments,ps=[rad(a,ri,y),rad(a,ro,y),rad(b,ro,y),rad(b,ri,y)];
    g.face(mat,ps,UP,{uv:ps.map(([x,_,z])=>[.5+x/(2*ro),.5-z/(2*ro)])});
  }
}
function screwCircle(g,r,y,num,size=.033){
  for(let j=0;j<num;j++)bolt(g,rad(j*TAU/num,r,y),UP,size);
}
function spokeWheel(g,radius,spokes,finish='copper',rim=.041){
  g.torus(finish,radius,rim,48,8);
  for(let i=0;i<spokes;i++){
    const a=i*TAU/spokes;
    g.cylinder(finish,rad(a,.036,0),rad(a+.055,radius-.006,.003),rim*.8,rim*.63,10);
  }
  turned(g,'brass',[[.087,-.048],[.085,.039],[.07,.055]],20);
}
function masonryPier(g){
  const oct={faceted:true};
  turned(g,'base',[[1.04,.008],[1.04,.081],[.998,.112],[.974,.13]],12,oct);
  turned(g,'lightFlag',[[.945,.129],[.945,.175],[.893,.205],[.828,.21]],12,oct);
  turned(g,'stone',[[.834,.19],[.837,.25],[.774,.298],[.716,.34],[.637,.78],[.659,.807]],8,oct);
  turned(g,'lightFlag',[[.659,.795],[.723,.815],[.767,.851],[.768,.909],[.726,.931]],8,oct);
  g.box('aged',0,.556,.659,.477,.159,.034);
  g.decal('maker',0,.556,.679,.464,.142);
  // The azimuth turntable is bolted through an octagonal cast sole plate.
  turned(g,'gunmetal',[[.676,.926],[.704,.946],[.705,.988],[.657,1.003]],32);
  screwCircle(g,.636,.992,12,.036);
  turned(g,'copper',[[.539,.987],[.558,1.013],[.555,1.081],[.504,1.104]],64);
  teeth(g,'brass',.487,.543,.568,1.045,.048,100);
  turned(g,'aged',[[.487,1.09],[.618,1.116],[.626,1.168],[.606,1.191]],64);
  annularFace(g,'scaleFace',.455,.604,1.192,96);
  turned(g,'gunmetal',[[.421,1.169],[.438,1.188],[.410,1.222]],40);
}
function cheek(g,side){
  // Two splayed bronze webs leave the casting open below the trunnion.
  const X=side*.372;
  for(const fore of [-1,1]){
    // Split the cast web into convex strips with a wider heel.
    const rows=[[1.193,.239,.468],[1.285,.226,.426],[1.46,.170,.325],[1.80,.082,.211],[1.974,.052,.160]];
    for(let i=0;i<rows.length-1;i++){
      const [y,a,b]=rows[i],[Y,A,B]=rows[i+1],h=.066-(i/rows.length)*.009;
      for(const s of [-1,1]){
        const x=X+s*h;
        g.face('copper',[[x,y,fore*a],[x,y,fore*b],[x,Y,fore*B],[x,Y,fore*A]],[s,0,0]);
      }
      for(const [z,Z,n] of [[a,A,-fore],[b,B,fore]]){
        g.face('copper',[[X-h,y,fore*z],[X+h,y,fore*z],[X+h,Y,fore*Z],[X-h,Y,fore*Z]],[0,0,n],{tone:.94});
      }
    }
    // Raised edges catch sunlight on each leg of the yoke.
    g.cylinder('brass',[X+side*.065,1.26,fore*.355],[X+side*.056,1.89,fore*.139],.012,.009,8);
    g.hewn('aged',X,1.214,fore*.321,.248,.078,.355,.012);
    for(const z of [.224,.423])bolt(g,[X,1.253,fore*z],UP,.035);
  }
  const axle=[side,0,0],P=[side*.28,1.98,0];
  g.cylinder('aged',P,[side*.473,1.98,0],.181,.178,40);
  g.cylinder('brass',[side*.465,1.98,0],[side*.504,1.98,0],.162,.148,40);
  for(let i=0;i<6;i++){
    const a=i*TAU/6;bolt(g,[side*.503,1.98+.114*Math.sin(a),.114*Math.cos(a)],axle,.016);
  }
}
function altitudeCircle(g){
  const P=[-.536,1.98,0];
  g.axis(P,[-1,0,0],()=>{
    const r=.551;
    g.sector('copper',.407,r,0,TAU,-.029,.024,88);
    teeth(g,'aged',.492,.535,.561,-.044,.031,100);
    annularFace(g,'scaleFace',.410,r,.025,100);
    g.sector('brass',.403,.417,0,TAU,.019,.036,90);
    g.sector('brass',r-.006,r+.004,0,TAU,.017,.032,90);
    for(let j=0;j<6;j++)g.at(0,0,0,j*TAU/6,()=>{
      // Web faces separated by a long narrow slot along each spoke.
      for(const s of [-1,1])g.beam('copper',[s*.026,-.004,.087],[s*.028,-.004,.415],.032,.034);
      g.box('brass',0,-.002,.40,.11,.036,.049);
    });
    turned(g,'aged',[[.124,-.059],[.139,-.030],[.123,.051],[.092,.072]],40);
    turned(g,'brass',[[.071,.065],[.073,.101],[.050,.121]],24);
    bolt(g,[0,.117,0],UP,.035);
  });
  // Fixed reading index and tangent screw sit below the divided circle.
  g.beam('gunmetal',[-.365,1.29,.248],[-.652,1.507,.229],.091,.084);
  g.box('brass',-.63,1.507,.201,.115,.078,.154);
  g.face('gold',[[-.692,1.481,.250],[-.692,1.513,.131],[-.692,1.575,.172]],[-1,0,0]);
  g.cylinder('copper',[-.570,1.411,-.26],[-.570,1.411,.352],.042,.042,20);
  for(let j=0;j<11;j++)g.cylinder('brass',[-.570,1.411,-.104+j*.020],[-.570,1.411,-.095+j*.020],.055,.047,16);
  g.axis([-.570,1.411,.366],[0,0,1],()=>spokeWheel(g,.132,5,'gunmetal',.018));
  // Opposite balance weights and their clamp nut.
  g.cylinder('brass',[.483,1.98,0],[.919,1.98,0],.075,.073,32);
  g.axis([.585,1.98,0],[1,0,0],()=>{
    turned(g,'gunmetal',[[.145,0],[.215,.029],[.228,.065],[.228,.178],[.204,.208],[.155,.221]],48);
    g.sector('copper',.212,.231,0,TAU,.088,.106,48);
    turned(g,'brass',[[.098,.22],[.108,.237],[.108,.278],[.086,.292]],12,{faceted:true});
  });
}
function lens(g,r,y){
  // A dark annular recess, edge coating and convex optical surface.
  g.sector('black',r*.94,r*1.09,0,TAU,y-.024,y+.028,64);
  g.revolve('lens',[[r*.962,y],[r*.85,y+.010],[r*.63,y+.022],[r*.36,y+.028],[.0005,y+.031]],64);
  g.sector('glassEdge',r*.951,r*.969,0,TAU,y-.0005,y+.008,64);
  for(const a of [0,TAU/3,2*TAU/3])g.at(0,y+.017,0,a,()=>g.box('gunmetal',0,0,r*.974,.026,.025,.025));
}
function opticalTube(g){
  const tilt=.58,axis=[0,Math.sin(tilt),-Math.cos(tilt)],ab=[0,Math.cos(tilt),Math.sin(tilt)];
  g.basis([0,1.98,0],[1,0,0],axis,ab,()=>{
    // Each change in diameter is a separate barrel, coupling or slide.
    turned(g,'copper',[[.141,-.97],[.162,-.927],[.164,-.704],[.183,-.677],[.196,-.34],[.198,.38],[.225,.923],[.235,1.076]],64);
    turned(g,'roof',[[.202,-.307],[.209,-.287],[.211,.322],[.205,.352]],64,{tone:.78});
    for(const [y,r,w] of [[-.921,.167,.039],[-.678,.187,.054],[-.315,.221,.066],[.325,.226,.070],[.903,.237,.049],[1.049,.245,.043]]){
      turned(g,'brass',[[r-.009,y-w*.5],[r,y-w*.30],[r,y+w*.32],[r-.009,y+w*.5]],64);
      if(w>.05)g.sector('aged',r-.002,r+.001,0,TAU,y-.005,y+.005,64);
    }
    // Objective cell and unfilled dew hood with a rolled leading edge.
    g.revolve('copper',[[.230,1.057],[.250,1.091],[.266,1.111],[.269,1.167],[.283,1.19],[.296,1.495],[.301,1.522],[.302,1.544],[.288,1.55]],64);
    g.revolve('black',[[.288,1.55],[.278,1.493],[.251,1.208],[.237,1.192]],64);
    g.sector('brass',.287,.306,0,TAU,1.520,1.549,64);
    for(const y of [1.25,1.32,1.389])g.sector('black',.249+(y-1.25)*.091,.28,0,TAU,y,y+.009,56);
    lens(g,.240,1.187);
    // Sliding focus tube, wrapped eyecup, rack and small pinion wheels.
    turned(g,'aged',[[.142,-1.073],[.157,-1.053],[.162,-.985],[.148,-.953]],48);
    turned(g,'brass',[[.09,-1.326],[.101,-1.307],[.101,-1.061]],40);
    g.revolve('gunmetal',[[.073,-1.485],[.092,-1.481],[.106,-1.464],[.101,-1.416],[.069,-1.389],[.075,-1.342],[.116,-1.332],[.116,-1.293],[.094,-1.281]],40);
    g.cylinder('lens',[0,-1.454,0],[0,-1.471,0],.066,.067,40);
    for(let i=0;i<24;i++)g.at(0,0,0,i*TAU/24,()=>g.box('black',0,-1.317,.114,.005,.031,.006));
    g.box('gunmetal',0,-1.113,-.111,.067,.327,.039);
    for(let i=0;i<11;i++)g.box('brass',0,-1.25+i*.020,-.135,.055,.008,.012);
    g.cylinder('brass',[-.172,-.979,-.104],[.172,-.979,-.104],.022,.022,16);
    for(const s of [-1,1])g.axis([s*.163,-.979,-.104],[s,0,0],()=>{
      turned(g,'gunmetal',[[.049,0],[.063,.012],[.063,.044],[.053,.051]],20,{faceted:true});
      bolt(g,[0,.05,0],UP,.019);
    });
    for(const side of [-1,1]){
      g.cylinder('aged',[side*.173,0,0],[side*.407,0,0],.104,.092,32);
      for(const y of [-.294,.343])bolt(g,[side*.219,y,0],[side,0,0],.022);
    }
    // Finder supported by two bored rings on dovetailed brass saddles.
    for(const y of [-.324,.272]){
      g.box('aged',0,y,.235,.115,.081,.103);
      g.cylinder('brass',[0,y,.245],[0,y,.331],.038,.032,12);
      g.at(0,y,.365,0,()=>g.sector('brass',.056,.076,0,TAU,-.035,.035,24));
    }
    g.at(0,0,.365,0,()=>{
      turned(g,'aged',[[.046,-.575],[.057,-.539],[.057,.427],[.067,.449],[.067,.515]],32);
      g.sector('brass',.058,.070,0,TAU,.490,.533,32);lens(g,.052,.515);
      turned(g,'gunmetal',[[.043,-.656],[.055,-.652],[.055,-.616],[.034,-.607],[.038,-.569]],24);
    });
    // Back sight and tiny screws on the objective retaining band.
    for(let j=0;j<8;j++){
      const a=j*TAU/8;bolt(g,rad(a,.268,1.146),radial(a),.014);
    }
  });
}
function azimuthCrank(g){
  const P=[.416,1.027,.408];
  g.hewn('gunmetal',P[0],P[1],P[2],.20,.15,.19,.015);
  g.cylinder('brass',[.431,1.041,.39],[.807,1.041,.39],.031,.027,16);
  g.axis([.820,1.041,.39],[1,0,0],()=>{
    spokeWheel(g,.134,4,'copper',.016);
    g.cylinder('brass',[0,.012,.113],[0,.112,.113],.014,.014,12);
    turnedKnob(g,[0,.094,.113],UP,.028,.070);
  });
}
function turnedKnob(g,p,axis,r,h){
  g.axis(p,axis,()=>turned(g,'cedar',[[r*.51,0],[r*.91,h*.12],[r,h*.49],[r*.80,h*.88],[r*.42,h]],16));
}
export function buildInstrument(g){
  g.section('transit instrument',true,()=>{
    g.at(0,F,0,0,()=>masonryPier(g));
    g.at(0,F,0,ROOF_YAW,()=>{
      cheek(g,-1);cheek(g,1);altitudeCircle(g);opticalTube(g);azimuthCrank(g);
    });
  });
}
