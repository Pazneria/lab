import {T,PI,TAU,grid,box,ell,lathe,pipe,rod,loop,group,rnd,tint,onTop,decal,collide,plank,noShadow} from './mesh.mjs'
import {oak,edge,walnut,dark,brass,oldBrass,iron,cream,teal,blue,red,frame,knob} from './objects.mjs'
const H=3.15, panel='#547069', plaster='#e1ceb1'
function wainscot(a,b,side=1,c=panel){const w=b-a,m=(a+b)/2;if(w<.02)return
 group([m,0,0],[0,side===1?0:PI,0],()=>{
  box(0,.444,.105,w,.88,.043,c,T.paint,.001,.42);box(0,.074,.14,w,.145,.075,tint(c,.73),T.paint,.008)
  box(0,.808,.135,w,.081,.072,tint(c,.95),T.paint,.006);box(0,.872,.147,w,.052,.095,tint(c,1.08),T.paint,.008)
  const n=Math.max(1,Math.round(w/.51));for(let i=0;i<=n;i++){const xx=(i/n-.5)*(w-.043);box(xx,.458,.135,.043,.635,.052,tint(c,.94),T.paint,.004)}
  box(0,.174,.136,w,.044,.048,tint(c,.91),T.paint,.004)
 })
}
function solid(a,b,both,c=panel){const w=b-a;if(w<.01)return;box((a+b)/2,H/2,0,w,H,.18,plaster,T.plaster,.002,.44);collide((a+b)/2,0,w,.2);wainscot(a,b,1,c);if(both)wainscot(a,b,-1,c)}
function arch(a,b,tag){const mid=(a+b)/2,rx=(b-a)/2,spring=1.96,rise=.43;const archY=u=>spring+rise*Math.sqrt(Math.max(0,1-(u*2-1)**2))
 for(const sg of [-1,1]){
  grid(28,4,(u,v)=>[a+u*(b-a),archY(u)*(1-v)+H*v,sg*.092],plaster,T.plaster,{flip:sg<0,uv:(u,v)=>[u*2,v*.9]})
  for(const xx of [a-.024,b+.024]){box(xx,.99,sg*.113,.119,1.98,.109,walnut,T.wood,.012);box(xx,.119,sg*.125,.162,.235,.142,oak);box(xx,1.938,sg*.125,.169,.119,.14,oak);box(xx,1.986,sg*.129,.181,.035,.15,edge)}
  const archPts=(dr,dv,z)=>Array.from({length:37},(_,i)=>{const a=PI*i/36;return [mid+(rx+dr)*Math.cos(a),spring+(rise+dv)*Math.sin(a),z]})
  grid(36,2,(u,v)=>{const aa=PI*u;return [mid+(rx+v*.11)*Math.cos(aa),spring+(rise+v*.11)*Math.sin(aa),sg*.163]},walnut,T.wood,{flip:sg>0,uv:(u,v)=>[u*2,v*.24]})
  pipe(archPts(.108,.108,sg*.159),.015,edge,T.wood,8);pipe(archPts(.01,.01,sg*.163),.014,oak,T.wood,8)
  group([mid,spring+rise+.059,sg*.161],[0,0,0],()=>{box(0,.006,0,.117,.139,.045,oak);group([0,0,sg*.03],[0,0,PI/4],()=>box(0,0,0,.039,.039,.006,brass,T.metal,.002))})
 }
 grid(36,1,(u,v)=>[mid+rx*Math.cos(PI*u),spring+rise*Math.sin(PI*u),(v-.5)*.314],oak,T.wood,{uv:(u,v)=>[u*1.8,v*.4],flip:true})
 box(mid,.013,0,b-a,.023,.27,edge,T.wood,.006)
}
function curtain(x,bottom,top,width,sign){const h=top-bottom
 const fn=(u,v)=>{const tie=Math.exp(-((v-.54)**2)/.019),w=width*(1-.59*tie+.16*v);return [x+sign*(w*u+.044*Math.sin(v*PI)-.035*tie),top-v*h+.014*Math.sin(u*PI*7)*v,.21+.056*Math.cos(u*TAU*3.26+.5*v)+.014*Math.cos(v*6.5+u*10)]}
 grid(28,22,fn,'#e5ce9d',T.stripe,{flip:sign>0,uv:(u,v)=>[u*1.4,v*1.8]})
 for(const v of [.977,.991])pipe(Array.from({length:26},(_,i)=>fn(i/25,v)),.0035,'#a47a53',T.linen,5)
 const a=fn(.01,.53),b=fn(1,.53);pipe([[a[0],a[1]+.018,.25],[(a[0]+b[0])/2,a[1]-.004,.301],[b[0],b[1]+.018,.25]],.008,brass,T.linen)
}
function windowBay(a,b,bot,top,curtains=true){const m=(a+b)/2,w=b-a,h=top-bot
 box(m,bot/2,0,w,bot,.18,plaster,T.plaster,.001,.39);if(bot>.89)wainscot(a,b);box(m,(H+top)/2,0,w,H-top,.18,plaster,T.plaster,.001,.4);collide(m,0,w,.2)
 noShadow(()=>decal(m,(bot+top)/2,-.146,w+.015,h+.015,T.glass,'#ffffff',12,8))
 for(const xx of [a,b]){box(xx,(top+bot)/2,.035,.085,h+.09,.20,oak,T.wood,.008);box(xx,(top+bot)/2,.122,.118,h+.15,.043,edge)}
 for(const yy of [bot,top])box(m,yy,.04,w+.12,.095,.19,oak)
 box(m,bot-.014,.126,w+.30,.081,.33,edge,T.wood,.017)
 box(m,top+.06,.105,w+.21,.075,.139,walnut)
 const n=w>1.4?3:2;for(let i=1;i<n;i++)box(a+w*i/n,(bot+top)/2,.013,.047,h,.077,walnut,T.wood,.005)
 for(const yy of [bot+h*.48,bot+h*.79])box(m,yy,.015,w,.032,.059,walnut,T.wood,.003)
 // Small diamond quarries in the top lights.
 for(let i=0;i<n;i++){const xx=a+w*(i+.5)/n,y=bot+h*.79;pipe([[xx-w/n*.44,y+.012,.023],[xx,top-.021,.023],[xx+w/n*.44,y+.012,.023]],.009,oldBrass,T.metal,6)}
 if(curtains){rod([a-.26,top+.119,.205],[b+.26,top+.119,.205],.017,oldBrass,T.metal);for(const sg of [-1,1]){const xx=sg<0?a-.24:b+.24;ell(xx,top+.119,.205,.043,.033,.033,brass,T.metal,14,8);curtain(sg<0?a-.18:b+.18,bot-.24,top+.085,.39,-sg)
  for(let j=0;j<5;j++)loop(xx-sg*(.074+.081*j),top+.104,.205,0,.029,.027,.0045,oldBrass,'yz',T.metal,12)}}
}
function wall(origin,yaw,a,b,openings=[],both=false,c=panel){group(origin,[0,yaw,0],()=>{
 let at=a;for(const o of openings){solid(at,o[0],both,c);if(o[2]==='door')arch(o[0],o[1]);else windowBay(o[0],o[1],o[2],o[3],o[4]);at=o[1]}solid(at,b,both,c)
 box((a+b)/2,H-.09,.08,b-a,.14,.15,walnut,T.wood,.01);if(both)box((a+b)/2,H-.09,-.08,b-a,.14,.15,walnut,T.wood,.01)
})}
function frieze(x,z,yaw,w){group([x,2.911,z],[0,yaw,0],()=>noShadow(()=>grid(Math.ceil(w/.32),2,(u,v)=>[(u-.5)*w,(.5-v)*.095,0],'#fff9ee',T.frieze,{flip:true,uv:(u,v)=>[u*w/.82,v]})))}
export function architecture(){
 box(-.05,-.094,.2,8.76,.15,7.88,'#57473c',T.wood,0)
 // Staggered individually fitted floorboards, paired pegs and a narrow perimeter band.
 const floorColors=['#b88758','#ad7c50','#bf9468','#a97b52','#bb8a5f','#af8056','#c2976a','#b78d64']
 const lo=-4.35,hi=4.25,z0=-3.65,z1=4.05,n=40,bw=(hi-lo)/n
 for(let i=0;i<n;i++){let z=z0,j=0;while(z<z1-.01){let len=Math.min(z1-z,j?rnd(1.6,2.65):rnd(.49,2.48));if(z1-z-len<.23)len=z1-z
  const x=lo+bw*(i+.5),c=floorColors[Math.floor(rnd(0,floorColors.length))];box(x,-.012,z+len/2,bw-.003,.025,len-.004,c,T.wood,.002,.5)
  for(const zz of [z+.031,z+len-.031])for(const xx of [-.057,.058]){if(rnd()<.67)lathe(x+xx,.0012,zz,[[.0036,0],[0,0]],'#765b45',T.wood,6)}
  z+=len;j++}}
 wall([0,0,-3.65],0,-4.44,4.34)
 wall([-4.35,0,0],PI/2,-4.05,3.65,[[-.97,1.34,.97,2.69,true]])
 wall([0,0,4.05],PI,-4.34,4.44,[[-3.77,-1.58,1.11,2.71,true]])
 wall([4.25,0,0],-PI/2,-3.65,4.05)
 wall([.65,0,0],PI/2,-4.05,3.65,[[-2.99,-1.45,'door'],[1.33,2.83,'door']],true,'#657368')
 wall([0,0,-.25],0,.65,4.25,[[1.43,2.88,'door']],true,'#63796e')
 frieze(-1.85,-3.552,0,4.83);frieze(-4.252,.2,PI/2,7.52);frieze(-1.85,3.952,PI,4.83);frieze(.551,.2,-PI/2,7.52)
 // The charcoal-green painted ceiling and honey-coloured structural trusses.
 box(-.05,3.188,.2,8.78,.11,7.9,'#9f8e71',T.wood,.003,.65)
 for(let i=0;i<25;i++)box(-4.24+i*.35,3.126,.2,.014,.025,7.72,'#887658',T.wood,.003)
 for(const z of [-3.48,-1.51,.54,2.64,3.95]){box(-.05,3.043,z,8.71,.177,.137,walnut,T.wood,.012,.56)
  for(const x of [-4.2,.65,4.11])for(const s of (x===.65?[-1,1]:[x<0?1:-1])){plank([x,2.65,z],[x+s*.365,2.99,z],.09,.105,oak)}}
 for(const [x,z] of [[-4.22,-3.52],[4.12,-3.52],[-4.22,3.92],[4.12,3.92],[.65,-3.52],[.65,3.92],[4.12,-.25]]){box(x,1.51,z,.175,3.02,.175,walnut);box(x,.13,z,.212,.26,.209,oak)}
 // Entrance door, plankwork, rising strap hinges and porcelain stop.
 group([-.92,0,3.928],[0,PI,0],()=>{box(0,1.03,0,1.18,2.06,.103,dark);for(let i=0;i<7;i++)box((i-3)*.144,1.017,.066,.141,1.98,.045,'#476961',T.paint,.004)
  for(const xx of [-.57,.57])box(xx,1.07,.07,.105,2.14,.15,walnut);box(0,2.10,.075,1.25,.15,.15,walnut);for(const yy of [.32,1.62]){box(-.251,yy,.102,.48,.045,.024,iron,T.metal,.007);for(const xx of [-.461,-.18,-.04])ell(xx,yy,.115,.011,.011,.007,oldBrass,T.metal,8,5)}
  box(.326,1.02,.104,.059,.146,.016,oldBrass,T.metal,.012);knob(.326,1.039,.116,.034)})
}
