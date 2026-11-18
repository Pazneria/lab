import {C} from './materials.js';
import {PI,TAU,mix,clamp} from './geometry.js';
import {shadow,plaque} from './rooms.js';

export const dress={x:-.67,z:-11.42,angle:-.15};
const points=(n,fn)=>Array.from({length:n},(_,i)=>fn(i/(n-1)));
function profileRow(table,y){
  let j=0;
  while(j<table.length-2&&y>table[j+1][0])j++;
  const [a,x1,z1]=table[j],[c,x2,z2]=table[j+1],f=clamp((y-a)/(c-a),0,1);
  return [mix(x1,x2,f),mix(z1,z2,f)];
}
const formProfile=[[1.04,.282,.21],[1.17,.292,.219],[1.28,.231,.181],[1.39,.237,.186],[1.53,.288,.21],[1.65,.333,.231],[1.75,.35,.194],[1.82,.358,.159],[1.88,.218,.128],[1.93,.109,.105],[2.052,.099,.098]];
function body(th,y,off=0){
  const [rx,rz]=profileRow(formProfile,y);
  return [(rx+off)*Math.sin(th),y,(rz+off)*Math.cos(th)+(y>1.52&&y<1.76?.016:0)];
}
function form(b){
  b.lathe([0,0,0],[[.16,0],[.25,.022],[.26,.046],[.18,.076],[.12,.09],[.085,.16],[.081,.39],[.103,.405],[.086,.451],[.039,.486],[.042,1.08],[.13,1.103]],'wood',C.walnut,40);
  b.cyl([0,.51,0],.058,.058,.085,'brass',C.brass);
  b.surface(64,40,(u,v)=>[...body(u*TAU,mix(1.04,2.052,v)),u*1.7,v*1.6],'cloth','#d6bd94');
  for(const a of [0,PI,PI*.5,-PI*.5]){
    b.curve(points(16,t=>body(a,mix(1.05,2.05,t),.0025)),.0028,'cloth','#927957',30,5);
  }
  b.cyl([0,2.061,0],.111,.114,.026,'brass',C.brass,32);
  b.lathe([0,2.072,0],[[.106,0],[.101,.022],[.061,.034],[.032,.058],[.028,.084],[.043,.097],[.02,.113],[.011,.122]],'wood',C.dark,24);
}
const backness=th=>(1-Math.cos(th))*.5;
function skirt(th,v,out=0,layer=0){
  const down=1-v,back=backness(th),left=(1-Math.sin(th))*.5;
  const fold=Math.sin(th*15+.42*Math.sin(th*3)+v*.58)*(.025+.059*down)*Math.pow(Math.max(down,.001),.60);
  const swing=Math.pow(down,1.18),hem=.205-.14*back+.021*Math.cos(th*9);
  const rx=.255+(.46+.32*back+.10*left)*swing+fold+out;
  const rz=.207+(.40+.50*back)*swing+fold*.88+out;
  return [rx*Math.sin(th)-.09*swing*back,mix(hem,1.295,v)+layer,rz*Math.cos(th)-.24*back*swing];
}
function underskirt(b){
  b.surface(100,19,(u,v)=>{const th=u*TAU,p=skirt(th,v,-.046),flute=.022*Math.cos(th*38)*(1-v);p[0]+=flute*Math.sin(th);p[2]+=flute*Math.cos(th);return [...p,u*4.3,v*1.13];},'moire','#c18263');
  for(let j=-5;j<=5;j++){
    const t=j*.077;
    b.curve(points(14,v=>{
      const th=t*(1.36-.34*v),p=skirt(th,v,-.027);p[1]+=.012;return p;
    }),.005,'silk',j%2?'#e1b27d':'#c39c70',19,5);
  }
  // The pale kick pleat appears through the incomplete split of the coat.
  b.surface(35,17,(u,v)=>{
    const th=(u-.5)*(.64+.30*(1-v)),p=skirt(th,v,-.014),r=.032*Math.cos(u*PI*14)*(1-v);
    p[0]+=r*Math.sin(th);p[2]+=r*Math.cos(th);p[1]+=.017;
    return [...p,u*.67,v*1.25];
  },'stripe',C.pearl);
}
function gores(b){
  const n=13,sea=['#1e6868','#2e7571','#205459','#327a74','#205d62','#256a68'];
  function panel(j,u,v,off=0){
    const fraction=(j+u)/n, width=mix(5.21,6.01,v),ang=(TAU-width)*.5+fraction*width;
    const p=skirt(ang,v,off+.016*Math.sin(PI*u)*(1-v));
    const lifted=Math.pow(1-j/n,12)*Math.pow(1-u,1.2)*Math.pow(1-v,.8);
    p[1]+=.295*lifted+.026*Math.sin(u*PI)*(1-v);p[2]+=.07*lifted;p[0]+=.015*lifted;
    return p;
  }
  for(let j=0;j<n;j++){
    const mat=j===0?'cloth':j===1||j===4||j===7||j===10?'shoal':j%3===0?'damask':'silk';
    b.surface(10,18,(u,v)=>[...panel(j,u,v),u*.57,v*1.26],mat,j===0?'#c8bfa4':mat==='shoal'?'#f5e8ce':sea[j%sea.length]);
    // Proper turned hem; a gold braid over an ochre facing, thick enough to read in silhouette.
    b.surface(14,2,(u,v)=>[...panel(j,u,.021+v*.040,.009),u*.62,v*.1],'silk','#c49f61');
    b.curve(points(9,u=>panel(j,u,.082,.008)),.005,'silk','#d3bb84',14,6);
    b.curve(points(17,v=>panel(j,.005,v,.006)),.006,'silk',j%3?'#b89d6a':'#dcc38a',24,6);
    for(let k=0;k<3;k++){
      const u0=(k+.5)/3;
      const wave=points(7,f=>panel(j,u0+(f-.5)*.28,.123+.038*Math.sin(f*PI),.008));
      b.curve(wave,.0038,'silk','#d0b581',10,5);
    }
  }
  // Transferred chalk marks and contrasting tailor's tacks on the basted trial gore.
  for(let j=0;j<17;j++){
    const v=.13+j*.046;
    b.rod(panel(0,.81,v,.012),panel(0,.79,v+.022,.012),.0034,'cloth','#975846',5);
    if(j%3===0)b.curve(points(7,u=>panel(0,.25+.46*u,v,.013)),.0026,'paper','#eee1be',10,5);
  }
  // Couched gold-work down the completed left front; each miniature shell follows its gore.
  for(const j of [1,n-1]){
    for(let k=0;k<3;k++){
      const vv=.21+k*.19;
      const stitch=(u,v)=>panel(j,u,vv+v,.014);
      for(let r=0;r<7;r++){
        const xx=(r-3)/3;
        b.curve(points(7,t=>stitch(.50+xx*.31*t,.012+.100*t*(1-.45*xx*xx)+.010*Math.sin(t*PI))),.0038,'silk','#dfbc7d',10,5);
      }
      b.curve(points(25,t=>{const xx=2*t-1;return stitch(.50+xx*.31,.110-.048*xx**2+.006*Math.sin(t*PI*6)**2);}),.0049,'silk',C.gilt,29,6);
      b.oval(stitch(.50,-.001),[.010,.013,.008],'silk',C.pearl,10);
    }
  }
  for(const [j,u] of [[0,0],[n-1,1]]){
    b.curve(points(16,v=>panel(j,u,v,.007)),.012,'silk','#d4b16b',24,6);
  }
  // A turned-back lap exposes salmon satin and the pinned untrimmed selvage.
  const facing=(u,v)=>{
    const p=panel(0,.008,v,.014);
    const width=.045+.147*Math.sin(PI*v)**.78;
    p[0]+=u*width;
    p[1]+=.045*u*Math.sin(PI*v);
    p[2]+=.029*u+.025*Math.sin(PI*u)*Math.sin(PI*v);
    return p;
  };
  b.surface(9,22,(u,v)=>[...facing(u,v),u*.28,v*1.22],'moire','#cf7962');
  b.curve(points(18,v=>facing(1,v)),.007,'cloth',C.flax,29,5);
  for(let j=0;j<13;j++){
    const v=.07+j*.067,p=facing(.86,v),q=facing(.88,v+.027);
    p[2]+=.006;q[2]+=.006;b.rod(p,q,.0032,'cloth','#f7e1aa',5);
  }
  for(const v of [.20,.52,.84]){
    const p=facing(.91,v);b.rod([p[0]-.021,p[1]-.012,p[2]+.011],[p[0]+.018,p[1]+.022,p[2]+.014],.002,'steel','#e5e7db',5);
    b.oval([p[0]+.019,p[1]+.023,p[2]+.015],[.009,.009,.009],'glow','#e7b369',8);
  }
  const raw=facing(1,.10);
  for(let j=0;j<4;j++)b.curve([[raw[0]+j*.008,raw[1]+.016,raw[2]],[raw[0]+.018+j*.01,raw[1]-.02,raw[2]+.004],[raw[0]+.010+j*.006,raw[1]-.061-j*.009,raw[2]+.012]],.0024,'cloth',C.flax,8,4);
}
function bodice(b){
  // The right front is still in toile, with chalk balance lines and basted boning channels.
  const top=th=>1.796+.083*Math.cos(th)**2+.033*Math.max(0,-Math.cos(th))-.060*Math.max(0,Math.cos(th));
  const bottom=th=>1.266-.105*Math.max(0,Math.cos(th))**4;
  function bp(th,v,off=.014){return body(th,mix(bottom(th),top(th),v),off);}
  for(let j=0;j<12;j++){
    const start=j*TAU/12+.006,end=(j+1)*TAU/12-.006,toile=j<3;
    b.surface(8,18,(u,v)=>[...bp(mix(start,end,u),v),u*.26,v*.72],toile?'cloth':j%3?'silk':'shoal',toile?['#dfc9a7','#d6bd99','#ccb38e'][j]:j%3?'#225e61':'#f5e4c7');
    b.curve(points(15,v=>bp(start,v,.021)),toile?.006:.008,'silk',toile?'#ab9575':'#b79b67',22,6);
    if(toile){
      for(let k=0;k<9;k++){let lo=.05+k*.105;b.rod(bp(start+.056,lo,.025),bp(start+.065,lo+.047,.025),.003,'cloth','#835b48',5);}
      for(const vv of [.35,.70])b.curve(points(8,u=>bp(mix(start,end,u),vv,.025)),.0028,'cloth','#e8dfc7',10,5);
    }
  }
  // Bound center edge and tiny hand-worked hooks.
  for(const t of [-.027,.027])b.curve(points(19,v=>bp(t,v,.026)),.009,'silk',C.trim,24,6);
  for(let i=0;i<8;i++){
    const p=bp(-.055,.10+i*.108,.036);
    b.oval(p,[.016,.012,.010],'brass',C.gilt,10);
    b.rod([p[0],p[1],p[2]],[p[0]+.043,p[1]+.004,p[2]-.004],.0032,'brass',C.gilt,5);
  }
  b.surface(64,3,(u,v)=>{const t=u*TAU,y=1.26+.072*v-.033*Math.cos(t);return [...body(t,y,.036),u*1.5,v*.12];},'silk','#bb985b');
  for(const vv of [0,1])b.curve(points(49,u=>body(u*TAU,1.26+.072*vv-.033*Math.cos(u*TAU),.039)),.006,'brass',C.gilt,56,6);
  b.oval([-.021,1.268,.247],[.065,.049,.023],'brass',C.gilt,20,[0,0,-.12]);
  b.oval([-.021,1.268,.270],[.032,.030,.012],'silk','#266867',16);
  // The finished back closes with paired hand-bound eyelets and a cross-laced silk cord.
  b.surface(9,15,(u,v)=>[...body(PI+(u-.5)*.48,1.338+.46*v,.026),u*.15,v*.46],'silk','#9d604b');
  const lace=(s,k)=>body(PI+s*.194,1.362+k*.065,.040);
  for(const s of [-1,1]){
    b.curve(points(13,t=>body(PI+s*.244,1.337+.463*t,.032)),.0064,'silk',C.brass,18,6);
    for(let k=0;k<7;k++){
      const p=lace(s,k);b.torus(p,.008,.0028,'brass',C.gilt,[0,s*.12,0],12);
      if(k<6){const q=lace(-s,k+1);b.curve([p,[(p[0]+q[0])/2,(p[1]+q[1])/2,(p[2]+q[2])/2-.010-s*.002],q],.0038,'silk',C.pearl,9,5);}
    }
  }
  b.curve([lace(-1,0),[.018,1.323,-.263],[.09,1.329,-.267],[.072,1.356,-.260],[.014,1.327,-.263],[-.06,1.277,-.296]],.004,'silk',C.pearl,21,5);
  // High open-front collar, indigo on the outside and copper silk inside.
  const collar=(t,v,o=0)=>{
    const a=mix(.70,TAU-.70,t),wave=Math.sin(t*PI),rise=.12+.16*wave;
    const [x,y,z]=body(a,1.85,.013);
    return [x+Math.sin(a)*(.02+v*.067+o),y+v*rise-.027*Math.cos(a),z+Math.cos(a)*(.018+v*.075+o)];
  };
  b.surface(40,7,(u,v)=>[...collar(u,v,.005),u*1.52,v*.33],'shoal','#fff2d2');
  b.surface(40,7,(u,v)=>[...collar(1-u,v,-.008),u*1.52,v*.33],'silk','#b96b52');
  b.curve(points(34,u=>collar(u,1)),.009,'silk',C.gilt,50,6);
  // Finished sleeve with a row of overlapping petals and a bound, visibly hollow cuff.
  const sleeve=(t,v,o=0)=>{
    const radius=(.092+.102*Math.sin(PI*(.12+.80*v))+.031*Math.cos(t*7)*Math.sin(v*PI))*(1-.17*v)+o;
    return [-.293-.28*v+Math.cos(t)*radius,1.79-.38*v+.049*Math.cos(t),.018+.080*v+Math.sin(t)*radius*.93];
  };
  b.surface(46,15,(u,v)=>[...sleeve(u*TAU,v),u*.84,v*.54],'damask','#347c75');
  for(const vv of [.90,.98])b.curve(points(37,u=>sleeve(u*TAU,vv,.006)),.008,'silk',C.gilt,42,6);
  for(let j=0;j<7;j++){const a=TAU*j/7;b.curve(points(10,v=>sleeve(a,mix(.08,.88,v),.002)),.004,'silk','#ba9d65',14,5);}
  // Bare shoulder cap and the canvas armscye on the unfinished side.
  b.oval([.338,1.744,.002],[.068,.116,.12],'wood',C.wood,24,[0,0,-.28]);
  b.oval([.397,1.75,0],[.013,.056,.059],'brass',C.brass,16);
}
function shellFan(b){
  // Radial panels are drafted from one shoulder. Each has a sewn ridge, a scalloped tip
  // and a different angle of incidence to the light. The opposite fan is still on its ribs.
  const origin=[-.265,1.794,-.095];
  const spoke=(a,len)=>[-Math.sin(a)*len,Math.cos(a)*len,-.13*len-.11*Math.sin(a)*len];
  const fan=(u,v,off=0)=>{
    const seg=u*9,phase=seg-Math.floor(seg),a=mix(-.16,1.92,u),l=.61+.28*Math.sin(PI*u)**.7+.063*Math.sin(phase*PI);
    const [x,y,z]=spoke(a,l*v);
    return [origin[0]+x,origin[1]+y,origin[2]+z+.074*Math.sin(phase*PI)*v-.046*Math.sin(v*PI)+off];
  };
  const hues=['#3f9990','#327c77','#65aaa0','#347674','#28706f','#3d9289','#78b7a3','#41857c','#33746c'];
  for(let j=0;j<9;j++){
    const f=(u,v,off=0)=>fan((j+u)/9,v,off);
    b.surface(8,12,(u,v)=>[...f(u,v),u*.45,v*.86],j===2||j===5?'shoal':'nacre',j===2||j===5?'#e2d8bf':hues[j]);
    b.surface(9,2,(u,v)=>[...f(u,.87+v*.048,.0035),u*.45,v*.08],'silk','#c19a58');
    b.curve(points(12,v=>f(0,v,.009)),.008,'brass','#b99a61',16,6);
    b.curve(points(13,u=>f(u,1,.006)),.007,'silk',C.gilt,18,6);
    for(const v of [.65,.76]){
      const p=f(.51,v,.008);b.oval(p,[.014,.019,.006],'silk','#d7c592',9,[0,0,.2+j*.13]);
    }
    const pin=f(.5,.977,.011);b.oval(pin,[.010,.011,.008],'brass',C.gilt,8);
  }
  b.curve(points(12,v=>fan(1,v,.008)),.009,'brass',C.gilt,17,6);
  for(let j=0;j<3;j++){
    const pts=[[.282,1.792,-.085],[.34+j*.045,1.98-j*.04,-.15],[.41+j*.102,2.164-j*.075,-.17],[.49+j*.133,2.294-j*.102,-.12]];
    b.curve(pts,.0075,'wood','#bb9560',18,6);
    b.oval(pts[3],[.014,.016,.013],'brass',C.gilt,9);
  }
  // A single muslin wedge is thread-tacked over the first two splines.
  b.surface(10,10,(u,v)=>[.287+v*(.20+.135*u),1.81+v*(.452-.10*u)+.015*Math.sin(u*PI)*v,-.13-.047*Math.sin(v*PI)+.013*Math.sin(u*PI),u*.24,v*.55],'cloth','#e3cda5');
  for(let j=0;j<6;j++){let v=.17+j*.128;b.rod([.287+.306*v,1.81+.378*v,-.119-.047*Math.sin(v*PI)],[.287+.306*(v+.06),1.81+.378*(v+.06),-.119-.047*Math.sin((v+.06)*PI)],.003,'cloth',C.rust,5);}
  b.oval([-.268,1.804,-.05],[.085,.095,.043],'brass',C.brass,18);
}
function backTrain(b){
  // Three scalloped overskirt tiers step down towards the train, anchored by a gathered bow.
  for(let tier=0;tier<3;tier++){
    const top=.998-tier*.23,low=.61-tier*.22,half=1.23-tier*.115;
    const flap=(u,v)=>{
      const a=PI+(2*u-1)*half*(.60+.4*(1-v));
      const q=mix(low+.114*Math.abs(2*u-1)-.036*Math.cos(u*TAU*3),top,v);
      const p=skirt(a,q,.030+.080*Math.sin(PI*v)+.032*(1-v)+.015*Math.cos(8*PI*u)*(1-v));
      p[1]+=.014;return p;
    };
    b.surface(40,13,(u,v)=>[...flap(u,v),u*1.4,v*.56],tier===1?'shoal':'silk',tier===1?'#e9ddbd':['#357f79','','#277371'][tier]);
    b.curve(points(39,u=>flap(u,0)),.010,'silk','#d5b77b',52,6);
  }
  for(const s of [-1,1])b.oval([s*.142,1.29,-.25],[.19,.094,.093],'damask','#4c857a',24,[.1,s*.1,s*.36]);
  b.oval([0,1.273,-.32],[.068,.068,.067],'silk','#c19c60',18);
}
export function buildMantle(b){
  b.zone='The sounding mantle';shadow(b,dress.x,dress.z,3.5,3.45);
  b.local([dress.x,0,dress.z],[0,dress.angle,0],()=>{
    b.cyl([0,.068,0],1.25,1.30,.127,'wood',C.dark,72);
    b.cyl([0,.142,0],1.22,1.25,.045,'wood',C.trim,72);
    b.cyl([0,.171,0],1.177,1.22,.038,'paint','#3f5e55',72);
    b.torus([0,.193,0],1.13,.009,'brass',C.brass,[-PI/2,0,0],80);
    b.local([0,.192,0],[0,0,0],()=>{form(b);underskirt(b);gores(b);bodice(b);backTrain(b);shellFan(b);});
    plaque(b,'Le Manteau de Sonde','COMMANDE DE LA COURONNE   /   Nº 17',[0,.108,1.296],.83,.139,0,true);
  });
}

