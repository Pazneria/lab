import * as THREE from './vendor/three.module.min.js';
import {PI,TAU,UP,DOWN,rad,unit,sub,add,mul,randomSource} from './geometry.js';
import {F,desk,stool,INNER,HALL_WIDTH} from './layout.js';
const rnd=randomSource(91634);
const chartInk='#463c2c';
function canvasMaterial(w,h,draw,rough=.65,metal=0,extra={}){
  const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);
  const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=4;
  return new THREE.MeshStandardMaterial({map,roughness:rough,metalness:metal,vertexColors:true,...extra});
}
function stroke(c,x,y,X,Y){c.beginPath();c.moveTo(x,y);c.lineTo(X,Y);c.stroke()}
function arc(c,x,y,r,a=0,b=TAU){c.beginPath();c.arc(x,y,r,a,b);c.stroke()}
function grain(c,w,h){
  const r=randomSource(9141);
  for(let j=0;j<9500;j++){c.fillStyle=j%2?'rgba(45,35,23,.065)':'rgba(245,227,184,.13)';c.fillRect(r()*w,r()*h,1+r()*2,1+r())}
}
export function fittingMaterials(m){
  m.scaleFace=canvasMaterial(1024,1024,(c,w)=>{
    const R=w/2;c.fillStyle='#bea16c';c.fillRect(0,0,w,w);grain(c,w,w);
    c.strokeStyle=chartInk;c.lineWidth=1.5;for(const r of [505,500,467,404,389])arc(c,R,R,r);
    c.fillStyle=chartInk;c.textAlign='center';c.textBaseline='middle';
    for(let j=0;j<360;j++){
      const a=j*TAU/360;const l=j%10===0?38:(j%5===0?26:13);
      c.lineWidth=j%5?1.15:2.3;
      stroke(c,R+Math.sin(a)*(499-l),R-Math.cos(a)*(499-l),R+Math.sin(a)*499,R-Math.cos(a)*499);
      if(j%10===0){
        c.save();c.translate(R+Math.sin(a)*437,R-Math.cos(a)*437);c.rotate(a);c.font='23px Georgia,serif';c.fillText(String(j),0,0);c.restore();
      }
    }
  },.42,.49);
  m.quadrant=canvasMaterial(768,768,(c,w)=>{
    c.fillStyle='#b49b70';c.fillRect(0,0,w,w);grain(c,w,w);c.strokeStyle=chartInk;c.lineWidth=2;
    for(const r of [727,706,684,647,611,551,415,247,85])arc(c,0,0,r,0,PI/2);
    for(let i=0;i<=180;i++){
      const a=i*PI/360,l=i%10===0?54:(i%2===0?25:11);
      stroke(c,Math.cos(a)*(724-l),Math.sin(a)*(724-l),Math.cos(a)*724,Math.sin(a)*724);
      if(i%10===0 && i!==0 && i!==180){
        stroke(c,Math.cos(a)*93,Math.sin(a)*93,Math.cos(a)*599,Math.sin(a)*599);
        c.save();c.translate(Math.cos(a)*624,Math.sin(a)*624);c.rotate(a-PI/2);c.fillStyle=chartInk;c.font='23px Georgia,serif';c.textAlign='center';c.fillText(String(i/2),0,0);c.restore();
      }
    }
    c.save();c.translate(207,190);c.rotate(-PI/4);c.textAlign='center';c.fillStyle=chartInk;c.font='italic 24px Georgia,serif';c.fillText('Altitudo',0,0);c.restore();
  },.49,.47);
  m.ledger=canvasMaterial(512,704,(c,w,h)=>{
    c.fillStyle='#d9c9a4';c.fillRect(0,0,w,h);grain(c,w,h);c.strokeStyle='#8c7c62';c.lineWidth=1.3;c.strokeRect(29,36,w-58,h-72);
    c.fillStyle='#4d4939';c.textAlign='center';c.font='italic 33px Georgia,serif';c.fillText('Transit register',w/2,89);
    stroke(c,50,113,461,113);c.font='17px Georgia,serif';
    for(const [j,t] of ['Object','R. Asc.','Decl.'].entries())c.fillText(t,113+j*142,144);
    for(let j=0;j<13;j++){
      const y=177+j*37;stroke(c,50,y+10,461,y+10);
      if(j<9){c.fillText(['Vega','Deneb','Altair','Dubhe','Polaris','Caph','Mizar','Kochab','Sadr'][j],110,y);
        c.fillText(['18  37','20  41','19  51','11  04','02  32','00  09','13  24','14  51','20  23'][j],253,y);
        c.fillText(['+38° 47′','+45° 17′','+08° 52′','+61° 45′','+89° 16′','+59° 09′','+54° 56′','+74° 09′','+40° 15′'][j],389,y);}
    }
    for(const x of [179,323])stroke(c,x,120,x,634);c.font='italic 16px Georgia,serif';c.fillText('Observations    •    fol. XII',w/2,658);
  },.95);
  m.spall=canvasMaterial(512,384,(c,w,h)=>{
    const rand=randomSource(6234);const image=c.createImageData(w,h);
    const grid=(n,k)=>Array.from({length:n*k},()=>rand());
    const G=[grid(9,8),grid(33,25),grid(107,79)];
    function sample(g,n,k,x,y){const i=Math.floor(x*(n-1)),j=Math.floor(y*(k-1)),u=x*(n-1)-i,v=y*(k-1)-j;return ((1-u)*g[j*n+i]+u*g[j*n+i+1])*(1-v)+((1-u)*g[(j+1)*n+i]+u*g[(j+1)*n+i+1])*v}
    for(let j=0;j<h;j++)for(let i=0;i<w;i++){
      const x=i/w,y=j/h,a=sample(G[0],9,8,x,y),b=sample(G[1],33,25,x,y),f=sample(G[2],107,79,x,y);
      const d=Math.hypot((x-.49)*2.12,(y-.54)*2.59);
      const e=1.06-d+(a-.5)*1.28+(b-.5)*.59+(f-.5)*.30+(rand()-.5)*.15;
      const t=(f-.5)*28+(rand()-.5)*21;
      const l=4*(j*w+i),edge=e<.23;
      image.data[l]=(edge?209:176)+t;image.data[l+1]=(edge?182:146)+t;image.data[l+2]=(edge?148:111)+t;
      image.data[l+3]=Math.min(1,Math.max(0,(e-.18)*7))*Math.min(1,d*3+.25)*193;
    }c.putImageData(image,0,0);
  },.94,0,{transparent:true,alphaTest:.07,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
  m.soot=canvasMaterial(128,256,(c,w,h)=>{
    const r=randomSource(4480);
    for(let i=0;i<85;i++){
      const x=(r()+r())*w*.5,y=r()*h*.33,len=(.12+r()**2*.76)*h;
      const gr=c.createLinearGradient(0,y,0,y+len);gr.addColorStop(0,'rgba(102,77,50,.10)');gr.addColorStop(1,'rgba(137,98,67,0)');
      c.fillStyle=gr;c.fillRect(x,y,r()*4+.5,len);
    }
  },.95,0,{transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
}
function footShadow(g,x,z,y,w,h){
  g.face('contact',[[x-w/2,y,z+h/2],[x+w/2,y,z+h/2],[x+w/2,y,z-h/2],[x-w/2,y,z-h/2]],UP,{uv:[[0,0],[1,0],[1,1],[0,1]]});
}
function book(g){
  g.at(-.38,.921,-.10,-.14,()=>{
    const W=.224,H=.328;
    for(const s of [-1,1]){
      g.box('leather',s*W*.5,.013,0,W+.008,.026,H+.018);
      g.box('page',s*W*.5,.038,0,W-.003,.038,H);
      const pts=[[.002,.045],[.033,.063],[.082,.071],[.153,.068],[W,.058]];
      for(let i=0;i<pts.length-1;i++){
        const [a,y]=pts[i],[b,Y]=pts[i+1],ps=[[s*a,y,-H/2],[s*b,Y,-H/2],[s*b,Y,H/2],[s*a,y,H/2]];
        g.face('ledger',ps,UP,{uv:[[s>0?a/W:1-a/W,1],[s>0?b/W:1-b/W,1],[s>0?b/W:1-b/W,0],[s>0?a/W:1-a/W,0]]});
      }
      for(let j=0;j<4;j++)g.box('cloth',s*W*.5,.024+j*.007,H/2+.0003,W-.007,.0014,.0019);
    }
    g.box('wax',.048,.034,.147,.017,.001,.121);
  });
}
function workDesk(g){
  g.at(0,F,0,desk.a,()=>g.at(0,0,desk.r,0,()=>{
    const w=desk.w,d=desk.d;
    for(const x of [-w*.40,w*.40])for(const z of [-d*.34,d*.34]){
      g.beam('cedar',[x*1.04,.01,z*1.09],[x,.815,z],.102,.112);
      g.box('aged',x*1.04,.063,z*1.09,.109,.078,.119);
    }
    g.box('cedar',0,.735,-d*.34,w*.88,.189,.081);g.box('cedar',0,.754,d*.34,w*.88,.15,.081);
    for(const x of [-w*.40,w*.40]){
      g.box('cedar',x,.740,0,.093,.179,d*.82);g.box('cedar',x,.25,0,.082,.083,d*.89);
    }
    g.box('cedar',0,.285,0,w*.89,.097,.084);
    for(let i=0;i<3;i++)g.hewn('cedar',0,.872,-d/2+d*(i+.5)/3,w,.096,d/3-.005,.006,{tone:.90+i*.06});
    for(const x of [-w*.40,w*.40])for(const z of [-d*.33,d*.33]){
      g.cylinder('iron',[x,.919,z],[x,.925,z],.015,.014,12);
    }
    book(g);
    // Divider, graphite pencil, stoppered ink bottle and rolled paper.
    const hinge=[.225,.964,-.075];
    for(const [x,z] of [[.044,-.236],[.139,-.291]]){
      g.beam('brass',hinge,[x,.938,z],.014,.017);
      g.cylinder('gunmetal',[x,.938,z],[x-.029,.923,z-.028],.010,.001,8);
    }
    g.cylinder('gold',hinge,add(hinge,[0,.010,0]),.023,.022,14);
    g.cylinder('cedar',[-.034,.931,.110],[.218,.931,.176],.008,.008,8);
    g.cylinder('black',[-.034,.931,.110],[-.058,.931,.104],.007,0.001,8);
    g.at(.688,.921,.132,0,()=>{
      g.revolve('lapis',[[.077,.007],[.087,.019],[.082,.093],[.066,.129],[.042,.140],[.042,.167],[.048,.173]],20,{},true);
      g.revolve('brass',[[.043,.174],[.049,.182],[.038,.195],[.022,.205]],20,{},true);
    });
    for(const [x,z,length] of [[-.69,.171,.46],[-.46,.244,.37]]){
      const a=[x-length/2,.956,z],b=[x+length/2,.956,z];
      g.cylinder('page',a,b,.038,.037,24);
      for(const t of [-.085,.079])g.cylinder('cord',[x+t-.012,.956,z],[x+t+.012,.956,z],.041,.041,16);
      g.cylinder('cloth',[b[0]-.001,b[1],b[2]],[b[0]+.003,b[1],b[2]],.017,.017,16);
    }
  }));
  const r=stool.r,a=stool.a;
  g.at(Math.sin(a)*r,F,Math.cos(a)*r,.31,()=>{
    for(let j=0;j<3;j++){
      const a=j*TAU/3;
      g.cylinder('cedar',rad(a,.262,.012),rad(a,.170,.46),.045,.055,12);
      g.cylinder('cedar',rad(a,.227,.157),rad(a+TAU/3,.227,.157),.023,.024,10);
    }
    g.revolve('cedar',[[.235,.45],[.283,.458],[.287,.504],[.266,.525]],32,{},true);
  });
}
function hangingChart(g){
  g.at(0,0,0,desk.a,()=>g.at(0,2.45,5.096,PI,()=>{
    g.box('cedar',0,0,0,1.33,1.71,.075);
    g.decal('atlas',0,0,.043,1.27,1.66);
    for(const y of [-.850,.85]){
      g.cylinder('cedar',[-.714,y,.055],[.714,y,.055],.035,.035,16);
      for(const s of [-1,1])g.cylinder('copper',[s*.684,y,.055],[s*.725,y,.055],.039,.032,16);
    }
    for(const s of [-1,1]){
      g.cylinder('cord',[s*.62,.86,.015],[0,1.063,.007],.006,.006,8);
      for(const y of [-.77,.765])g.cylinder('brass',[s*.578,y,.043],[s*.578,y,.055],.014,.011,12);
    }
    g.cylinder('iron',[0,1.063,-.024],[0,1.063,.023],.026,.024,12);
  }));
}
function wallQuadrant(g){
  g.at(0,0,0,-1.58,()=>g.at(0,2.01,5.074,PI,()=>{
    const R=1.26,p=[-.55,.72,.077];
    for(const y of [-.435,.534])g.box('cedar',.04,y,-.018,1.53,.104,.128);
    g.at(...p,0,()=>{
      for(let i=0;i<32;i++){
        const a=i*PI/64,b=(i+1)*PI/64,pt=(t,z)=>[R*Math.cos(t),-R*Math.sin(t),z];
        const q=[0,0,.067],A=pt(a,.067),B=pt(b,.067);
        g.face('quadrant',[q,A,B],[0,0,1],{uv:[[0,1],[A[0]/R,1+A[1]/R],[B[0]/R,1+B[1]/R]]});
        g.face('copper',[pt(a,-.016),pt(b,-.016),B,A],[Math.cos(a),-Math.sin(a),0]);
      }
      g.beam('brass',[0,0,.088],[1.055,-.792,.088],.037,.034);
      for(const f of [.16,.89])g.box('aged',f*1.055,-f*.792,.119,.037,.053,.084);
      g.cylinder('copper',[0,0,.072],[0,0,.13],.087,.072,24);
      g.cylinder('brass',[0,0,.121],[0,0,.157],.034,.023,20);
      const x=.080,z=.134;
      g.cylinder('cord',[x,0,z],[x,-1.14,z],.004,.004,6);
      g.at(x,-1.31,z,0,()=>g.revolve('brass',[[.002,0],[.042,.087],[.034,.127],[.012,.15],[.009,.17]],20,{},true));
    });
  }));
}
function sundial(g){
  g.at(3.28,0,-12.66,0,()=>{
    const o={faceted:true};
    g.revolve('base',[[.48,.009],[.48,.094],[.411,.129],[.34,.166]],8,o,true);
    g.revolve('stone',[[.337,.159],[.304,.205],[.244,.769],[.270,.814],[.351,.837],[.36,.891]],8,o,true);
    g.revolve('lightFlag',[[.36,.88],[.521,.912],[.526,.975],[.494,1.002]],12,o,true);
    const R=.431,n=64;
    g.revolve('aged',[[R-.02,.999],[R,1.013],[R,1.027]],n,{},true);
    for(let j=0;j<n;j++){
      const p=[[0,1.032,0],rad(j*TAU/n,R-.015,1.032),rad((j+1)*TAU/n,R-.015,1.032)];
      g.face('dial',p,UP,{uv:p.map(([x,_,z])=>[.5+x/(2*(R-.015)),.5-z/(2*(R-.015))])});
    }
    for(const s of [-1,1]){
      const x=s*.012;
      g.face('brass',[[x,1.033,.158],[x,1.033,-.154],[x,1.327,-.141]],[s,0,0]);
    }
    g.face('gold',[[-.012,1.033,.158],[.012,1.033,.158],[.012,1.327,-.141],[-.012,1.327,-.141]],[0,1,1]);
    g.box('copper',0,1.040,0,.083,.016,.365);
  });
}
function terraceBench(g){
  g.at(-4.40,0,-10.71,PI/2,()=>{
    for(const x of [-.70,.70]){
      g.box('base',x,.066,0,.34,.129,.45);
      g.box('stone',x,.26,0,.24,.35,.36);
      g.box('stone',x,.416,0,.32,.082,.46);
    }
    g.hewn('lightFlag',0,.497,0,1.91,.112,.55,.021);
  });
}
function passageJar(g){
  g.at(1.32,0,10.83,-.42,()=>{
    g.revolve('ochre',[[.144,.008],[.180,.028],[.189,.094],[.244,.226],[.25,.332],[.226,.433],[.155,.516],[.118,.55],[.107,.602],[.113,.627]],32,{},true);
    g.revolve('teal',[[.112,.592],[.128,.606],[.13,.631],[.12,.646],[.095,.646],[.091,.607]],32);
    g.cylinder('recess',[0,.600,0],[0,.606,0],.093,.093,28);
    for(const s of [-1,1]){
      const p=[[s*.13,.554,0],[s*.203,.56,0],[s*.260,.512,0],[s*.263,.448,0],[s*.211,.405,0]];
      for(let j=0;j<p.length-1;j++)g.cylinder('ochre',p[j],p[j+1],.027,.027,10);
    }
  });
}
function domeDrive(g){
  // The handwheel and reeved cord turn a small drive shaft at the dome curb.
  g.at(0,0,0,-2.62,()=>g.at(0,0,4.986,PI,()=>{
    for(const y of [1.70,4.90]){
      g.hewn('cedar',0,y,-.105,.470,y<2?.44:.290,.184,.013);
      for(const x of [-.175,.175])for(const dy of [-.078,.078]){
        g.cylinder('brass',[x,y+dy,-.016],[x,y+dy,.004],.026,.022,8);
      }
    }
    const wheelY=1.86,hi=5.04,wrap=.124;
    for(const y of [wheelY,hi]){
      g.cylinder('iron',[0,y,-.170],[0,y,.178],.048,.047,20);
      g.axis([0,y,.038],[0,0,1],()=>{
        g.revolve('copper',[[.109,-.046],[.146,-.041],[.150,-.023],[.124,-.010],[.124,.024],[.152,.035],[.151,.055],[.116,.061]],32,{},true);
      });
    }
    for(const x of [-wrap,wrap]){
      g.cylinder('cord',[x,wheelY,.045],[x,hi,.045],.010,.010,10);
      // A few evenly spaced whippings show the direction of the hoist line.
      for(let j=0;j<7;j++)g.cylinder('cloth',[x,2.03+j*.42,.045],[x,2.048+j*.42,.045],.012,.012,8);
    }
    g.axis([0,wheelY,.161],[0,0,1],()=>{
      g.torus('copper',.224,.022,48,8);
      for(let j=0;j<5;j++){
        const a=j*TAU/5;
        g.cylinder('brass',rad(a,.040,0),rad(a+.079,.214,0),.019,.012,12);
      }
      g.revolve('aged',[[.069,-.035],[.079,-.011],[.070,.029],[.051,.046]],24,{},true);
      g.cylinder('brass',[.192,0,.083],[.192,.074,.083],.014,.014,12);
      g.cylinder('cedar',[.192,.067,.083],[.192,.118,.083],.026,.020,16);
    });
    g.beam('gunmetal',[-.111,hi+.045,-.039],[0,5.49,-.09],.061,.061);
    g.cylinder('aged',[-.10,5.49,-.092],[.10,5.49,-.092],.098,.098,20);
  }));
}
export function buildFittings(g){
  g.section('furnishings',true,()=>{workDesk(g);hangingChart(g);wallQuadrant(g);sundial(g);terraceBench(g);passageJar(g);domeDrive(g)});
  g.section('contact shadows',false,()=>{
    footShadow(g,0,0,F+.009,3.10,3.10);footShadow(g,3.28,-12.66,.008,1.50,1.39);
    footShadow(g,-4.40,-10.71,.008,1.0,2.31);footShadow(g,1.32,10.83,.008,.86,.80);
    g.at(0,F,0,desk.a,()=>footShadow(g,0,desk.r,.01,2.68,1.44));
    footShadow(g,Math.sin(stool.a)*stool.r,Math.cos(stool.a)*stool.r,F+.009,.79,.79);
  });
}
