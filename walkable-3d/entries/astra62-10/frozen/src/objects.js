import {rng,mix,TAU} from './workshop.js';
import {walnut,honey,dark,teal,iron,brass} from './architecture.js';
import {book,flatStack,plaque} from './stacks.js';

export function rug(W,x,y,z,w,d,col='#ffffff',angle=0){
  W.at(x,y,z,angle,()=>{
    W.box('plain',0,.008,0,w+.014,.016,d+.012,'#645546');
    W.face('rug',[[-w/2,.020,d/2],[w/2,.020,d/2],[w/2,.020,-d/2],[-w/2,.020,-d/2]],col);
    for(const s of [-1,1]){
      W.box('plain',0,.011,s*(d/2+.014),w-.022,.012,.034,'#b5a588');
      const n=Math.ceil(w/.021);
      for(let i=0;i<n;i++){
        const xx=-w/2+(i+.5)*w/n,ll=.030+.018*Math.sin(i*1.571+2.2*s)**2;
        const ends=[[xx-.005,.013,s*(d/2+.023)],[xx+.003,.013,s*(d/2+.023)],[xx+.011,.013,s*(d/2+ll+.019)],[xx-.001,.013,s*(d/2+ll+.019)]];
        W.face('plain',s>0?ends.reverse():ends,i%3?'#c4b39a':'#998c73');
      }
    }
  });
}
function welt(W,x,y,z,w,d,col){
  const n=34,sp=a=>Math.sign(a)*Math.abs(a)**.35;
  const P=i=>{const a=i*TAU/n;return [x+sp(Math.cos(a))*w/2,y,z+sp(Math.sin(a))*d/2];};
  for(let i=0;i<n;i++)W.rod('hide',P(i),P(i+1),.005,.005,col,5);
}
export function club(W,x,y,z,angle,tint){
  W.at(x,y,z,angle,()=>{
    for(const sx of [-1,1])for(const sz of [-1,1]){
      const xx=sx*.328,zz=sz*.275;
      W.turn('wood',xx,.01,zz,[[0,.045],[.038,.053],[.085,.064],[.124,.048],[.168,.061]],dark,10);
      W.rod('brass',[xx,.004,zz],[xx,.034,zz],.039,.046,'#aa8c5c',10);
    }
    W.soft('hide',0,.244,0,.864,.238,.757,.29,tint,20,10,.065);
    W.soft('hide',0,.425,.058,.606,.171,.622,.38,tint,24,12,.14);
    welt(W,0,.476,.057,.593,.608,'#b59679');
    W.pose(0,.723,-.295,-.142,0,0,()=>{
      W.soft('hide',0,.046,0,.827,.741,.188,.42,tint,24,14,.1);
      W.soft('hide',0,.047,.065,.607,.531,.127,.53,tint,20,10,.14);
      for(let j=0;j<2;j++)for(let i=0;i<3-j;i++){
        const xx=(i-(2-j)/2)*.162,yy=.063+j*.155;
        W.rod('hide',[xx,yy,.118],[xx,yy,.132],.019,.015,'#9a7860',9);
        for(const s of [-1,1])W.beam('hide',[xx,yy,.127],[xx+s*.041,yy+.046,.126],.005,.003,'#a1846b');
      }
    });
    for(const s of [-1,1]){
      W.soft('hide',s*.378,.474,.035,.183,.41,.736,.34,tint,18,11,.12);
      W.soft('hide',s*.377,.651,.025,.222,.191,.775,.58,tint,22,12,.19);
      W.soft('hide',s*.377,.643,.379,.158,.157,.038,.66,'#baa08a',14,8,.06);
      for(let i=0;i<8;i++){
        const yy=.259+i*.036;
        W.rod('brass',[s*.393,yy,.394],[s*.393,yy,.401],.0075,.0066,'#b89b6a',7);
      }
    }
    for(let i=0;i<13;i++)W.rod('brass',[-.322+i*.054,.230,.368],[-.322+i*.054,.230,.380],.0068,.0065,'#ba9e6a',6);
    W.solid(0,.004,.909,.819,0,1.13,'leather armchair');
  });
}
function ottoman(W,x,z,angle){
  W.at(x,0,z,angle,()=>{
    for(const s of [-1,1])for(const k of [-1,1])W.turn('wood',s*.24,0,k*.15,[[.01,.035],[.055,.045],[.105,.031],[.161,.047]],dark,10);
    W.soft('hide',0,.222,0,.622,.174,.424,.31,'#dfac86',20,10,.12);
    welt(W,0,.263,0,.605,.410,'#bd9370');W.solid(0,0,.625,.432,0,.313,'footstool');
  });
}
export function folio(W,x,y,z,angle,scale=1){
  W.at(x,y,z,angle,()=>{
    const w=.50*scale,d=.316*scale,h=.038*scale;
    W.box('hide',0,.009*scale,0,w+.024*scale,.018*scale,d+.027*scale,'#8f745c');
    let prev;
    for(let i=0;i<=16;i++){
      const u=i/16,edge=Math.abs(u*2-1),xx=(u-.5)*w,yy=.017*scale+h*(.20+.79*Math.sin(Math.PI*.81*edge)**.82+.20*edge);
      const p=[xx,yy,u];
      if(prev){
        const [px,py,pu]=prev;
        W.face('folio',[[px,py,d/2],[xx,yy,d/2],[xx,yy,-d/2],[px,py,-d/2]],'#ffffff',[[pu,0],[u,0],[u,1],[pu,1]]);
        W.face('pages',[[px,.012*scale,d/2],[xx,.012*scale,d/2],[xx,yy,d/2],[px,py,d/2]],'#eee1bd',[[pu,0],[u,0],[u,.35],[pu,.35]]);
        W.face('pages',[[xx,.012*scale,-d/2],[px,.012*scale,-d/2],[px,py,-d/2],[xx,yy,-d/2]],'#e5d8b1');
      }prev=p;
    }
    for(const s of [-1,1])W.box('pages',s*w/2,.025*scale,0,.005,.027*scale,d,'#e5dabb');
    W.face('plain',[[.013,.008,d/2+.058],[.026,.008,d/2+.065],[.023,.027*scale,d/2+.002],[.010,.026*scale,d/2+.002]],'#a16649',undefined,[[0,1,0],[0,1,0],[0,1,0],[0,1,0]]);
  });
}
export function banker(W,x,y,z,angle=0){
  W.at(x,y,z,angle,()=>{
    W.turn('brass',0,0,0,[[0,.105],[.010,.12],[.023,.12],[.037,.091],[.050,.068],[.067,.043],[.095,.028],[.115,.022]],brass,22);
    W.rod('brass',[0,.110,0],[0,.386,-.038],.014,.014,brass,12);
    W.turn('brass',0,.353,-.034,[[0,.023],[.019,.032],[.047,.026]],brass,12);
    for(const s of [-1,1]){
      W.rod('brass',[0,.374,-.037],[s*.153,.374,-.037],.012,.012,brass,10);
      W.rod('brass',[s*.153,.374,-.037],[s*.165,.417,.009],.012,.012,brass,10);
    }
    const n=16,rr=.077,cy=.425,cz=.024;
    for(let j=0;j<n;j++){
      const a=-.20+j*Math.PI*1.12/n,b=-.20+(j+1)*Math.PI*1.12/n;
      const p=(s,t,r)=>[s*.187,cy+r*Math.sin(t),cz+r*Math.cos(t)];
      W.face('greenGlass',[p(-1,a,rr),p(1,a,rr),p(1,b,rr),p(-1,b,rr)],'#376448');
      W.face('opal',[p(-1,b,rr-.005),p(1,b,rr-.005),p(1,a,rr-.005),p(-1,a,rr-.005)],'#ece7c1');
      for(const s of [-1,1])W.face('brass',[[s*.188,cy,cz],p(s,a,rr),p(s,b,rr)],brass);
    }
    W.rod('brass',[.122,cy,cz],[.123,.285,cz],.002,.002,'#d6bc7e',6);
    W.soft('brass',.123,.278,cz,.014,.021,.014,1,brass,8,5);
  });
}
function cup(W,x,y,z){
  const china='#d3cbb0';
  W.turn('plain',x,y,z,[[0,.054],[.005,.067],[.011,.063]],china,20);
  W.turn('plain',x,y+.014,z,[[0,.026],[.009,.029],[.025,.039],[.073,.046]],china,20);
  W.rod('plain',[x,y+.087,z],[x,y+.089,z],.037,.037,'#5a4330',20);
  for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/10,b=a+Math.PI/10;const P=t=>[x+.038+Math.cos(t)*.028,y+.055+Math.sin(t)*.020,z];W.rod('plain',P(a),P(b),.0055,.0055,china,6);}
}
function sideTable(W,x,y,z){
  W.at(x,y,z,0,()=>{
    W.turn('wood',0,0,0,[[0,.17],[.038,.203],[.068,.156],[.083,.102],[.13,.080],[.2,.046],[.27,.064],[.31,.045],[.43,.039],[.46,.067],[.49,.052],[.56,.085]],walnut,16);
    W.turn('wood',0,.543,0,[[0,.234],[.024,.296],[.056,.307],[.067,.288]],honey,30);
    W.solid(0,0,.57,.57,0,.61,'side table');
  });
  return y+.61;
}
function straightChair(W,x,y,z,angle){
  W.at(x,y,z,angle,()=>{
    for(const a of [-1,1])for(const b of [-1,1]){
      W.beam('wood',[a*.202,.012,b*.182],[a*.162,.452,b*.145],.048,.046,walnut);
      W.rod('wood',[a*.187,.172,b*.167],[-a*.187,.172,b*.167],.014,.014,walnut,8);
    }
    W.box('wood',0,.424,0,.432,.077,.389,'#ad8f70');
    W.soft('hide',0,.468,.004,.409,.071,.367,.4,'#a9a17c',18,8,.10);
    for(const s of [-1,1])W.beam('wood',[s*.178,.383,-.153],[s*.179,.905,-.221],.043,.042,walnut);
    for(let i=-2;i<=2;i++)W.rod('wood',[i*.052,.466,-.149],[i*.061,.861,-.212],.009,.011,'#b89b79',8);
    W.pose(0,.877,-.218,-.106,0,0,()=>W.box('wood',0,0,0,.431,.117,.056,'#b69a79'));
    W.solid(0,-.018,.443,.445,0,.945,'desk chair');
  });
}
function writingTable(W,x,z,angle){
  W.at(x,0,z,angle,()=>{
    const w=3.15,d=1.17,top=.788;
    for(const s of [-1,1]){
      const xx=s*.998;
      W.box('wood',xx,.111,0,.226,.147,.897,walnut);
      for(const a of [-1,1]){
        W.box('wood',xx,.061,a*.377,.257,.11,.174,dark);
        W.turn('wood',xx,.166,a*.233,[[0,.089],[.053,.105],[.085,.080],[.135,.068],[.206,.102],[.255,.072],[.326,.062],[.390,.085],[.43,.099],[.50,.096]],walnut,14);
      }
      W.box('wood',xx,.661,0,.192,.134,.902,'#aa8c6d');
    }
    W.box('wood',0,.239,0,2.28,.103,.092,'#a38668');
    for(const s of [-1,1])W.box('wood',s*1.082,.246,0,.038,.175,.123,'#846b55');
    W.box('wood',0,.700,0,w-.17,.122,d-.15,walnut);
    W.box('wood',0,.752,0,w+.017,.061,d+.020,honey);
    for(let j=0;j<5;j++)W.box('wood',0,top-.010,-d/2+(j+.5)*d/5,w,.022,d/5-.003,j%2?'#ddc1a0':'#d3b392');
    for(const s of [-1,1]){
      W.box('hide',s*.78,top+.004,0,1.14,.008,.72,'#75917b');
      for(const t of [-1,1])W.box('brass',s*.78,top+.009,t*.341,1.09,.001,.004,'#bd9b61');
    }
    folio(W,-.74,top+.010,.075,-.12,1.20);banker(W,.00,top+.003,-.03,.04);
    flatStack(W,.96,top+.01,-.13,3,981,1.10);
    W.turn('iron',.45,top+.012,.241,[[0,.038],[.016,.043],[.051,.042],[.066,.023],[.076,.026]],'#374943',10);
    W.rod('wood',[.43,top+.015,.32],[.67,top+.018,.38],.005,.006,'#b78c60',7);
    W.rod('brass',[.67,top+.018,.38],[.689,top+.018,.385],.006,.001,brass,7);
    W.solid(0,0,w+.02,d+.015,0,top+.02,'reading table');
    straightChair(W,-.70,0,.879,Math.PI-.10);straightChair(W,.67,0,-.866,.055);
    straightChair(W,1.52,0,.816,Math.PI-.28);
  });
}
export function frame(W,x,y,z,angle,w,h,art){
  W.at(x,y,z,angle,()=>{
    W.box('wood',0,0,.035,w,h,.07,dark);
    W.box('plain',0,0,.073,w-.068,h-.068,.014,'#cfc7b4');
    W.panel(art,0,0,.083,w-.169,h-.169,'#fffdf3');
    for(let s of [-1,1]){
      W.box('wood',s*(w/2-.025),0,.070,.062,h,.067,walnut);W.box('wood',0,s*(h/2-.026),.071,w-.048,.061,.068,walnut);
      W.box('brass',s*(w/2-.066),0,.091,.011,h-.115,.014,'#ab976e');W.box('brass',0,s*(h/2-.066),.091,w-.122,.011,.014,'#ab976e');
    }
  });
}
function globe(W,x,y,z){
  W.at(x,y,z,-.18,()=>{
    for(let i=0;i<3;i++){
      const a=i*TAU/3;
      W.beam('wood',[.27*Math.cos(a),.023,.27*Math.sin(a)],[.060*Math.cos(a),.379,.060*Math.sin(a)],.061,.065,walnut);
      W.rod('brass',[.258*Math.cos(a),.02,.258*Math.sin(a)],[.25*Math.cos(a),.067,.25*Math.sin(a)],.034,.030,brass,10);
    }
    W.turn('wood',0,.21,0,[[0,.074],[.046,.086],[.112,.054],[.148,.069],[.196,.044],[.283,.044],[.321,.068],[.372,.079],[.427,.061]],walnut,16);
    const cy=.986,rr=.295;
    W.pose(0,cy,0,-.06,.3,-.28,()=>{
      const point=(i,j)=>{const a=i*TAU/40,t=-Math.PI/2+j*Math.PI/22,n=[Math.cos(t)*Math.cos(a),Math.sin(t),Math.cos(t)*Math.sin(a)];return {p:n.map(k=>k*rr),n,uv:[i/40,j/22]};};
      for(let i=0;i<40;i++)for(let j=0;j<22;j++){
        const pts=[point(i,j),point(i,j+1),point(i+1,j+1),point(i+1,j)];
        W.face('globe',pts.map(p=>p.p),'#fff8db',pts.map(p=>p.uv),pts.map(p=>p.n));
      }
      W.rod('brass',[0,-.361,0],[0,.363,0],.012,.012,brass,10);
      const P=t=>[.327*Math.cos(t),.327*Math.sin(t),0];
      for(let i=0;i<56;i++)W.beam('brass',P(TAU*i/56),P(TAU*(i+1)/56),.021,.033,brass);
    });
    const P=t=>[.353*Math.cos(t),cy-.023,.353*Math.sin(t)];
    for(let i=0;i<54;i++)W.rod('wood',P(TAU*i/54),P(TAU*(i+1)/54),.016,.016,honey,7);
    for(const s of [-1,1])W.beam('brass',[s*.045,.625,0],[s*.337,cy-.030,0],.023,.031,brass);
    W.solid(0,0,.72,.72,0,1.36,'library globe');
  });
}
function pendant(W,x,z,low,roof){
  W.at(x,low,z,0,()=>{
    const len=roof-low;
    W.turn('brass',0,len-.09,0,[[0,.03],[.038,.075],[.08,.115]],brass,16);
    W.rod('iron',[0,.56,0],[0,len-.08,0],.015,.015,iron,10);
    W.turn('brass',0,.27,0,[[0,.052],[.038,.081],[.107,.052],[.221,.036],[.260,.058],[.304,.027]],brass,16);
    for(let j=0;j<3;j++){
      const a=j*TAU/3+.40,x=Math.cos(a)*.390,z=Math.sin(a)*.390;
      W.rod('brass',[0,.325,0],[x*.67,.239,z*.67],.019,.017,brass,10);
      W.rod('brass',[x*.67,.239,z*.67],[x,.32,z],.016,.014,brass,10);
      W.rod('iron',[0,.74,0],[x*.84,.269,z*.84],.005,.005,iron,7);
      W.turn('brass',x,.206,z,[[0,.070],[.022,.088],[.063,.048],[.116,.034]],brass,16);
      W.turn('opal',x,-.057,z,[[0,.111],[.020,.147],[.037,.151],[.096,.123],[.145,.095],[.188,.070],[.262,.057]],'#f3e7c3',22);
      W.turn('brass',x,-.056,z,[[0,.115],[.008,.135],[.018,.145]],brass,20);
    }
  });
}
function sconce(W,x,y,z,angle){
  W.at(x,y,z,angle,()=>{
    W.soft('brass',0,0,.043,.14,.254,.066,.71,'#8b7955',14,8);
    W.rod('brass',[0,-.042,.077],[0,-.125,.225],.015,.015,brass,10);W.rod('brass',[0,-.125,.225],[0,-.035,.291],.016,.017,brass,10);
    W.turn('brass',0,-.035,.291,[[0,.035],[.028,.065],[.045,.072]],brass,14);
    W.turn('opal',0,.008,.291,[[0,.052],[.035,.066],[.120,.095],[.181,.089],[.207,.071]],'#f7dfb5',18);
  });
}
function entry(W){
  W.at(-.16,0,8.985,Math.PI,()=>{
    W.box('wood',0,1.335,.046,2.08,2.67,.13,walnut);
    for(let s of [-1,1]){
      W.box('paint',s*.469,1.25,.132,.913,2.50,.078,'#364843');
      for(const [yy,hh] of [[.44,.63],[1.48,1.18],[2.27,.22]]){
        W.box('paint',s*.469,yy,.18,.706,hh,.032,'#435b53');
        for(const t of [-1,1]){
          W.box('paint',s*.469+t*.351,yy,.204,.035,hh+.025,.037,'#53665c');W.box('paint',s*.469,yy+t*hh/2,.204,.712,.037,.039,'#53665c');
        }
      }
      W.box('wood',s*1.034,1.327,.142,.136,2.65,.188,'#ae9375');W.box('wood',s*1.055,.155,.155,.204,.31,.225,walnut);
      W.box('brass',s*.126,1.026,.204,.073,.283,.029,brass);W.rod('brass',[s*.126,1.029,.212],[s*.126,1.029,.276],.025,.031,brass,12);
      W.rod('brass',[s*.126,1.029,.276],[s*.247,1.032,.276],.017,.012,brass,10);
    }
    W.box('wood',0,2.614,.134,2.28,.181,.213,walnut);
    W.box('wood',0,2.756,.156,2.48,.098,.267,honey);
    plaque(W,0,2.608,.248,1.61,0,.107);
    W.box('stone',0,.023,.157,2.29,.047,.41,'#c7bbaa');
    // Clock face is set proud of the limewashed gable in a turned brass bezel.
    W.pose(0,5.06,.122,Math.PI/2,0,0,()=>{
      W.turn('wood',0,0,0,[[0,.63],[.05,.678],[.103,.661],[.122,.622]],walnut,64);
      W.turn('brass',0,.12,0,[[0,.622],[.024,.626],[.045,.588]],brass,64);
    });
    const n=64,cy=5.06,rad=.582,dz=.29;
    for(let i=0;i<n;i++){
      const a=i*TAU/n,b=(i+1)*TAU/n;
      W.face('clock',[[0,cy,dz],[rad*Math.cos(a),cy+rad*Math.sin(a),dz],[rad*Math.cos(b),cy+rad*Math.sin(b),dz]],'#fff8e6',[[.5,.5],[.5+.5*Math.cos(a),.5+.5*Math.sin(a)],[.5+.5*Math.cos(b),.5+.5*Math.sin(b)]]);
    }
  });
}
function displayBench(W){
  W.at(-1.74,0,-9.77,0,()=>{
    for(const x of [-1.29,0,1.29]){W.box('wood',x,.19,0,.14,.38,.384,walnut);W.box('wood',x,.061,0,.209,.111,.485,dark);}
    W.box('wood',0,.394,0,3.08,.096,.52,honey);
    for(let i=0;i<3;i++)W.soft('hide',(i-1)*.956,.474,0,.94,.119,.478,.32,'#93a48d',18,8,.12);
    W.solid(0,0,3.09,.525,0,.542,'window bench');
  });
}
export function furnishings(W){
  W.zone='reading room';
  rug(W,-2.06,.002,-.17,3.94,5.63,'#fff6e9',.024);
  writingTable(W,-2.06,-.17,Math.PI/2-.065);
  displayBench(W);entry(W);
  frame(W,-4.51,2.42,8.921,Math.PI,2.50,1.72,'map');
  frame(W,7.415,2.003,-3.76,-Math.PI/2,.946,1.19,'moth');
  frame(W,7.414,1.96,-2.57,-Math.PI/2,.84,1.13,'fern');
  banker(W,6.99,1.081,-4.66,-Math.PI/2);flatStack(W,7.04,1.08,-2.90,3,501,1.06);
  folio(W,-4.40,1.173,8.55,3.01,1.17);flatStack(W,-5.40,1.173,8.55,3,652);
  flatStack(W,-4.866,1.438,5.97,3,212,1.11);
  sconce(W,-2.01,2.49,8.94,Math.PI);sconce(W,1.72,2.49,8.94,Math.PI);
  pendant(W,-1.38,2.30,4.99,7.05);pendant(W,-1.38,-3.55,5.25,7.05);
  W.zone='window alcove';
  rug(W,-9.14,.004,-3.22,2.27,4.58,'#ded5ac',-.037);
  club(W,-9.67,0,-4.96,.684,'#e2a07b');club(W,-9.56,0,-1.40,2.36,'#c7937e');ottoman(W,-8.51,-4.18,.36);
  const y=sideTable(W,-9.92,0,-3.15);cup(W,-9.78,y,-3.16);
  flatStack(W,-10.00,y,-3.15,2,87,.77);
  frame(W,-9.15,2.02,-6.276,0,.91,1.22,'fern');
  frame(W,-9.21,2.00,-.04,Math.PI,.84,1.13,'moth');
  sconce(W,-8.19,2.16,-.05,Math.PI);
  W.zone='map gallery';
  rug(W,5.54,3.424,-1.48,1.34,6.53,'#d9d3b6');
  globe(W,5.13,3.42,-9.08);
  flatStack(W,7.07,4.343,-8.70,3,219,1.18);folio(W,7.08,4.343,-7.78,-Math.PI/2,1.08);
  club(W,6.16,3.42,4.33,-1.97,'#97a088');
  const sy=sideTable(W,6.61,3.42,3.33);banker(W,6.66,sy,3.31,-1.32);
  sconce(W,7.44,5.42,-6.36,-Math.PI/2);
}
