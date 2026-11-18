import * as T from './vendor/three.module.min.js';
import {C} from './materials.js';
import {PI,TAU,mix,randomSeed} from './geometry.js';

export const zones=[['Fitting room',1.1,8.9],['Fabric archive',-6.6,1.1],['Commission workshop',-16,-6.6]];
export const halfW=4.8,ceiling=4.75;
export const zoneAt=z=>z>1.1?0:z>-6.6?1:2;
export function shadow(b,x,z,w,d,y=.009){
  b.tile([x,y,z],w,d,'shade',[0,0,1,1],[-PI/2,0,0]);
}
export function plaque(b,title,small,p,w,h,ry=0,dark=false){
  b.local(p,[0,ry,0],()=>{
    b.box([0,0,-.016],[w+.034,h+.032,.034],'brass',C.bronze);
    b.tile([0,0,.003],w,h,'print',b.print.label(title,small,dark));
    for(const s of [-1,1])b.oval([s*(w/2-.023),0,.006],[.009,.009,.005],'brass',C.gilt,8);
  });
}
export function frameArt(b,type,p,w,h,ry){
  b.local(p,[0,ry,0],()=>{
    b.box([0,0,-.036],[w+.145,h+.145,.08],'wood',C.walnut);
    b.box([0,0,.013],[w+.065,h+.065,.025],'brass',C.brass);
    b.tile([0,0,.03],w,h,'print',b.print.drawing(type));
    for(const side of [-1,1])b.box([side*(w/2+.068),0,.015],[.025,h+.16,.025],'wood',C.dark);
  });
}
function floorMaps(b,cpu){
  let parquet=null,sun=null;
  if(!cpu){
    const c=document.createElement('canvas');c.width=c.height=768;const x=c.getContext('2d'),rng=randomSeed(996);
    x.fillStyle='#665642';x.fillRect(0,0,768,768);
    for(let j=0;j<4;j++)for(let i=0;i<4;i++){
      x.save();x.translate(i*192+96,j*192+96);if((i+j)%2)x.rotate(PI/2);x.translate(-96,-96);
      for(let k=0;k<4;k++){
        const yy=k*48,v=Math.floor(rng()*22);
        x.fillStyle='rgb('+(172+v)+','+(145+v)+','+(109+v)+')';x.fillRect(1,yy+1,190,46);
        for(let a=0;a<91;a++){
          const y=yy+1+rng()*45,phase=rng()*6;x.beginPath();x.moveTo(2,y);
          x.bezierCurveTo(64,y+Math.sin(phase)*4,142,y+Math.sin(phase+2)*4,190,y+Math.cos(phase)*1.2);
          x.strokeStyle=rng()>.5?'rgba(89,56,31,.13)':'rgba(253,234,196,.18)';x.lineWidth=.4+rng()*.7;x.stroke();
        }
        x.fillStyle='rgba(255,237,197,.42)';x.fillRect(1,yy+1,190,1);
      }
      x.restore();
    }
    parquet=new T.CanvasTexture(c);parquet.wrapS=parquet.wrapT=T.RepeatWrapping;parquet.anisotropy=8;parquet.colorSpace=T.SRGBColorSpace;
    const l=document.createElement('canvas');l.width=256;l.height=256;const a=l.getContext('2d');
    const grad=a.createLinearGradient(0,0,256,9);grad.addColorStop(0,'rgba(230,247,236,.34)');grad.addColorStop(.68,'rgba(236,250,243,.25)');grad.addColorStop(1,'rgba(235,250,243,0)');
    a.fillStyle=grad;a.fillRect(0,0,256,256);a.globalCompositeOperation='destination-out';a.filter='blur(2px)';
    for(const z of [2,64,128,192,254])a.fillRect(0,z-2.5,256,5);
    for(const xx of [82,170])a.fillRect(xx-1,0,3,256);
    sun=new T.CanvasTexture(l);sun.colorSpace=T.SRGBColorSpace;
  }
  b.m.parquet=new T.MeshStandardMaterial({map:parquet,roughness:.57,vertexColors:true});
  b.m.sunwash=new T.MeshBasicMaterial({map:sun,vertexColors:true,transparent:true,depthWrite:false,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1});
}
function floor(b,a,z,n){
  const d=z-a,mid=(a+z)/2,edge=.39;
  b.surface(1,1,(u,v)=>{
    const x=mix(-halfW,halfW,u),zz=mix(z,a,v);
    return [x,0,zz,(x*.707+zz*.707)/3.16,(zz*.707-x*.707)/3.16];
  },'parquet',n===1?'#dfd5bb':'#efe0c7',false);
  for(const x of [-1,1]){
    b.box([x*(halfW-edge/2),.003,mid],[edge,.012,d],'wood',C.wood,[0,0,0],false);
    b.box([x*(halfW-edge),.011,mid],[.041,.008,d],'wood',C.dark,[0,0,0],false);
    b.box([x*(halfW-edge-.048),.013,mid],[.015,.007,d],'brass',C.gilt,[0,0,0],false);
  }
  for(const zz of [a+.12,z-.12]){
    b.box([0,.009,zz],[halfW*2,.017,.24],'wood',C.trim,[0,0,0],false);
    b.box([0,.02,zz],[halfW*2,.014,.028],'brass',C.gilt,[0,0,0],false);
  }
}
function wallPanel(b,w,n=3,h=1.03,color=C.jade) {
  // Local wall faces +Z; relieved panels sit inside rails and stiles.
  b.box([0,h/2,0],[w,h,.085],'paint',color,[0,0,0],false);
  for(let i=0;i<n;i++){
    const pw=w/n,cx=-w/2+pw*(i+.5);
    b.box([cx,h*.5,.045],[pw-.14,h-.29,.026],'paint',C.pine,[0,0,0],false);
    b.box([cx,h*.5,.062],[pw-.195,h-.35,.028],'paint',color,[0,0,0],false);
    b.box([cx,h*.5+.012,.082],[pw-.25,h-.42,.013],'paint',color,[0,0,0],false);
  }
  b.box([0,.1,.071],[w,.17,.14],'wood',C.dark,[0,0,0],false);
  b.box([0,h+.01,.061],[w,.075,.16],'wood',C.walnut,[0,0,0],false);
  b.box([0,h+.054,.083],[w,.026,.18],'wood',C.trim,[0,0,0],false);
}
function windowBay(b,w,h,bottom,arched=true) {
  const top=bottom+h,spring=top-(arched?.37:.07);
  const shape=new T.Shape();shape.moveTo(-w/2,bottom);shape.lineTo(w/2,bottom);shape.lineTo(w/2,spring);
  shape.bezierCurveTo(w/2,top+.065,-w/2,top+.065,-w/2,spring);shape.lineTo(-w/2,bottom);
  const g=new T.ShapeGeometry(shape,18),p=g.attributes.position,uv=g.attributes.uv;
  for(let i=0;i<p.count;i++)uv.setXY(i,p.getX(i)/w+.5,(p.getY(i)-bottom)/h);
  // Recess and painted stone surround.
  b.box([0,(bottom+top)/2,.012],[w+.24,h+.13,.07],'paint',C.jade,[0,0,0],false);
  b.put(g,'glass','#f0f5e9',[0,0,.055],[0,0,0],[1,1,1],false);
  for(const side of [-1,1]){
    b.box([side*(w/2+.042),(bottom+spring)/2,.09],[.087,spring-bottom,.12],'wood',C.trim);
    b.box([side*(w/2+.106),(bottom+spring)/2,.075],[.033,spring-bottom+.07,.08],'paint',C.pearl);
  }
  // Raised arched sash and spokes above the transom.
  const crown=t=>[w*.5*Math.cos(t*PI),spring+(top-spring)*1.04*Math.sin(t*PI),.10];
  b.curve(Array.from({length:15},(_,i)=>crown(i/14)),.043,'wood',C.trim,28,7);
  for(let i=1;i<6;i++){const end=crown(i/6);b.rod([0,spring,.099],end,.014,'brass',C.brass,6);}
  b.box([0,bottom-.02,.115],[w+.37,.11,.31],'wood',C.trim);
  b.box([0,bottom-.105,.06],[w+.20,.085,.16],'paint',C.jade);
  const bars=w>1.7?4:3;
  for(let i=1;i<bars;i++){
    const x=w*(i/bars-.5);
    b.box([x,(bottom+spring)/2,.09],[.030,spring-bottom,.069],'paint','#7a8d79');
  }
  for(const f of [.50,1]){
    b.box([0,mix(bottom,spring,f),.104],[w,.042,.085],'paint','#829381');
  }
  // Fine etched wave band in every lower sash.
  for(let row=0;row<2;row++){
    const pts=Array.from({length:25},(_,i)=>[-w/2+i*w/24,bottom+.16+row*.036+.037*Math.cos(i*PI/3),.091]);
    b.curve(pts,.0055,'paint','#dde5ce',32,4);
  }
}
function wash(b,zz,start=-4.66,len=4.5,w=1.75){
  b.surface(1,1,(u,v)=>[start+u*len,.022,zz+(v-.5)*w-u*1.6,u,v],'sunwash','#ffffff',false);
}
function sideWall(b,side,a,z,n){
  const d=z-a,mid=(a+z)/2,ry=side<0?PI/2:-PI/2;
  const wins=n===0?(side<0?[[2.39,1.48,2.64,1.2],[7.55,1.48,2.64,1.2]]:[[4.65,2.34,2.6,1.25]]):
    n===1?[[-.75,2.28,1.14,2.96],[-4.58,2.35,1.14,2.96]]:
    side<0?[[-8.55,2.50,2.75,1.22],[-13.62,2.82,2.75,1.22]]:[[-10.34,2.38,2.35,1.55]];
  // Solid masonry around each opening lets the stationary daylight shadow pass through the sash.
  const color=n===2?'#c6cebb':'#d6dac6';
  const masonry=(za,zb,lo,hi)=>{
    if(zb-za>.001&&hi-lo>.001)b.box([side*(halfW+.217),(lo+hi)*.5,(za+zb)*.5],[.27,hi-lo,zb-za],'wall',color);
  };
  let previous=a;
  for(const [zz,ww,hh,bt] of [...wins].sort((l,r)=>l[0]-r[0])){
    const lo=zz-ww/2,hi=zz+ww/2;
    masonry(previous,lo,0,ceiling);masonry(lo,hi,0,bt);masonry(lo,hi,bt+hh,ceiling);previous=hi;
  }
  masonry(previous,z,0,ceiling);
  b.local([side*(halfW+.079),0,mid],[0,ry,0],()=>{
    wallPanel(b,d,Math.ceil(d/1.05),1.03,n===2?C.pine:C.jade);
    for(let i=0;i<3;i++)b.box([0,ceiling-.16+i*.062,.04+i*.045],[d,.083,.11+i*.063],'paint',[C.jade,C.pearl,C.pine][i],[0,0,0],false);
  });
  for(const [zz,w,h,bt] of wins){
    b.local([side*(halfW+.017),0,zz],[0,ry,0],()=>windowBay(b,w,h,bt,true));
    if(side<0&&n!==1)wash(b,zz,-4.63,n===0?4:5.1,w);
  }
}
function partition(b,z,opening,title,sub){
  const outer=halfW+.04,h=ceiling,spring=2.62,archH=1.38,jamb=(outer-opening)/2;
  for(const s of [-1,1]){
    const cx=s*(opening+jamb);
    b.box([cx,h/2,z],[jamb*2,h,.33],'wall','#becbb7',[0,0,0],false);
    for(const face of [-1,1])b.local([cx,0,z+face*.197],[0,face<0?PI:0,0],()=>wallPanel(b,jamb*2,3,1.03,C.jade));
    b.block(cx,z,jamb*2,.40);
    b.box([s*(opening+.12),spring/2,z],[.25,spring,.49],'paint',C.pine);
    b.box([s*(opening+.12),.17,z],[.39,.34,.61],'wood',C.walnut);
    b.box([s*(opening+.12),spring-.12,z],[.41,.21,.66],'wood',C.trim);
    for(const face of [-1,1])for(const dx of [-.058,.058]){
      b.box([s*(opening+.12)+dx,spring/2,z+face*.259],[.022,spring-.56,.018],'brass',C.brass);
    }
  }
  for(const s of [-1,1]){
    b.surface(48,1,(u,v)=>{const x=(u*2-1)*opening*s;return [x,mix(spring+archH*Math.sqrt(Math.max(0,1-(x/opening)**2)),h,v),z+s*.166,x,v];},'wall','#bac9b6',false);
  }
  // Solid tapered voussoirs with a rolled brass edge.
  const rad=(a,r,face)=>[(opening+r)*Math.cos(a),spring+(archH+r)*Math.sin(a),z+face];
  for(let j=0;j<23;j++){
    const a0=j*PI/23+.001,a1=(j+1)*PI/23-.001;
    for(const face of [-1,1])b.surface(3,1,(u,v)=>rad(mix(a0,a1,face<0?u:1-u),v*(j===11?.30:.218),face*.244),'paint',j===11?C.trim:j%2?C.jade:'#759181');
    b.surface(3,1,(u,v)=>rad(mix(a0,a1,1-u),.001,mix(-.244,.244,v)),'wood',C.oak);
  }
  for(const face of [-1,1]){
    const pts=Array.from({length:31},(_,i)=>rad(i*PI/30,.227,face*.248));b.curve(pts,.027,'wood',C.trim,44,8);
    b.curve(pts.map(([x,y,z])=>[x*.908,y-(y-spring)*.14,z]),.022,'brass',C.brass,44,7);
  }
  plaque(b,title,sub,[0,4.43,z+.20],1.68,.31,0,true);
}
function roof(b,a,z,n){
  const mid=(a+z)/2,d=z-a;
  b.box([0,ceiling+.065,mid],[9.68,.13,d],'paint','#b0b8a3',[0,0,0],true);
  const span=n===2?4:3;
  for(let j=0;j<span;j++){
    const zz=a+(j+.5)*d/span;
    b.box([0,ceiling-.13,zz],[9.65,.24,.16],'wood',C.walnut,[0,0,0],false);
    b.box([0,ceiling-.257,zz],[9.68,.025,.193],'wood',C.trim,[0,0,0],false);
    for(const side of [-1,1]){
      b.rod([side*4.69,4.05,zz],[side*4.09,4.55,zz],.075,'wood',C.walnut,8);
      b.box([side*4.67,4.25,zz],[.17,.56,.26],'paint',C.pine);
    }
  }
  for(const x of [-3.18,-1.58,0,1.58,3.18])b.box([x,ceiling-.035,mid],[.073,.064,d],'paint','#799084',[0,0,0],false);
}
function entranceDoor(b){
  b.local([1.16,0,8.70],[0,PI,0],()=>{
    b.box([0,1.53,0],[2.33,3.06,.12],'wood',C.dark);
    for(const s of [-1,1]){
      b.box([s*.53,1.48,.075],[1.03,2.92,.105],'wood',C.walnut);
      for(const [yy,hh] of [[.7,.9],[2.03,1.25]]){
        b.box([s*.53,yy,.137],[.83,hh,.034],'wood',C.trim);
        b.box([s*.53,yy,.159],[.75,hh-.08,.024],'wood',C.walnut);
      }
      b.box([s*1.22,1.56,.07],[.17,3.1,.19],'paint',C.pine);
      b.oval([s*.12,1.16,.23],[.06,.06,.06],'brass',C.brass,16);
    }
    b.box([0,3.1,.1],[2.7,.18,.24],'wood',C.trim);
    plaque(b,'Maison des Marées','TAILLEURS DE LA COURONNE',[0,3.47,.12],1.81,.36,0,true);
  });
}
export function buildRooms(b,cpu=false){
  floorMaps(b,cpu);
  zones.forEach(([name,a,z],n)=>{
    b.zone=name;floor(b,a,z,n);sideWall(b,-1,a,z,n);sideWall(b,1,a,z,n);roof(b,a,z,n);
  });
  for(const [zz,ry,name] of [[8.99,PI,'Fitting room'],[-16.09,0,'Commission workshop']]){
    b.zone=name;b.local([0,0,zz],[0,ry,0],()=>{
      b.box([0,ceiling/2,-.089],[9.82,ceiling,.20],'wall',zz<0?'#95a99d':C.plaster,[0,0,0],false);
      wallPanel(b,9.65,9,1.03,zz<0?C.pine:C.jade);
      b.box([0,4.57,.027],[9.75,.12,.14],'wood',C.trim,[0,0,0],false);
    });
  }
  b.zone='Fitting room';entranceDoor(b);partition(b,1.1,2.12,'Archives textiles','TISSAGES   •   TEINTURES   •   ÉCHANTILLONS');
  b.zone='Fabric archive';partition(b,-6.6,2.12,'Atelier de la Couronne','CABINET DES GRANDES COMMANDES');
}

