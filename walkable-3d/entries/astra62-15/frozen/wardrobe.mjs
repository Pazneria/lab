import {T,PI,TAU,grid,box,ell,lathe,pipe,rod,loop,group,rnd,tint,decal,onTop,collide,lampLight,plank,clamp,unit,cross,sub,add,mul} from './mesh.mjs'
import {oak,edge,walnut,dark,brass,oldBrass,iron,cream,teal,blue,red,drawer,turnedLeg,spool,rug,parcel,boot,satchel} from './objects.mjs'
const seq=(n,fn)=>Array.from({length:n},(_,i)=>fn(i/(n-1)))
function interp(y,pts){for(let i=1;i<pts.length;i++)if(y<=pts[i][0]){const a=pts[i-1],b=pts[i],k=(y-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*k}return pts.at(-1)[1]}
function hanger(){pipe([[0,.024,0],[0,.078,0],[.038,.108,0],[.052,.132,0],[.046,.162,0],[.025,.176,0],[-.005,.174,0],[-.023,.153,0],[-.022,.13,0]],.006,oldBrass,T.metal,7)
 pipe([[-.228,-.061,0],[-.212,-.036,0],[-.08,.014,0],[0,.038,0],[.08,.014,0],[.212,-.036,0],[.228,-.061,0]],.019,oak,T.wood,8)
 rod([-.213,-.06,0],[.213,-.06,0],.008,walnut,T.wood,7)}
function wingPin(x,y,z,s=1){for(const i of [-1,1])group([x,y,z],[0,0,-i*.41],()=>ell(i*.018*s,0,0,.026*s,.012*s,.004*s,brass,T.metal,10,6));ell(x,y,z+.004*s,.005*s,.019*s,.004*s,oldBrass,T.metal,8,6)}
export function garment(x,y,z,angle,c,length,kind,seed){group([x,y,z],[0,angle,0],()=>{
 hanger()
 const form=(u,v)=>{const a=(u-.5)*TAU,si=Math.sin(a),co=Math.cos(a),w=interp(v,[[0,.084],[.055,.226],[.15,.215],[.29,.175],[.49,.156],[.67,.178],[1,kind===2?.30:.232]])*(kind===1?.93:1)
  const d=interp(v,[[0,.055],[.08,.087],[.24,.081],[.48,.062],[1,.104]]),flute=(.006+.013*v)*Math.sin(a*7.0+seed+v*2.1)+(.003+.009*v)*Math.sin(a*12.0-v*3.1)
  return [si*(w+flute)+.018*v*v*Math.sin(seed),-.006-v*length+.016*Math.cos(a*4+seed)*v**4-(.022*Math.abs(si))*(1-v),co*(d+flute)+.021*Math.sin(v*4+seed)*v]}
 grid(36,26,form,c,kind===1?T.linen:T.wool,{flip:true,uv:(u,v)=>[u*3,v*2.4]})
 pipe(seq(37,u=>form(u,1)),.005,tint(c,.77),T.linen,6)
 for(const side of [-1,1]){
  const shoulder=[side*.192,-.065,0],elbow=[side*.286,-length*.31,-.012],wrist=[side*(kind===1?.26:.286),-length*(kind===1?.56:.638),.052]
  const center=v=>v<.48?add(shoulder,mul(sub(elbow,shoulder),v/.48)):add(elbow,mul(sub(wrist,elbow),(v-.48)/.52))
  const sf=(u,v)=>{const a=TAU*u,cc=center(v),r=(.077-.026*v)*(1+.085*Math.sin(a*5+v*7+seed)+.053*Math.cos(v*39)*(v**1.4));return [cc[0]+r*Math.cos(a),cc[1]+side*.017*Math.cos(a)*(1-v),cc[2]+r*.94*Math.sin(a)]}
  grid(18,15,sf,c,kind===1?T.linen:T.wool,{uv:(u,v)=>[u,v*1.8]});grid(18,4,(u,v)=>{const p=sf(u,.925+.075*v);p[0]+=.005*Math.cos(u*TAU);p[2]+=.005*Math.sin(u*TAU);return p},kind===2?teal:tint(c,.87),T.linen)
  pipe(seq(19,u=>sf(u,1)),.004,tint(c,.72),T.linen,5)
  // Folded collar and lapel, with an ecru edge on the heavy survey coat.
  const lap=(u,v)=>{const xx=side*((.035+u*.061)*(1-v)+(.011+u*.014)*v);return [xx,.012-v*length*.26-.025*u,.058+.04*Math.sin(v*PI*.85)+.012*u]}
  grid(5,7,lap,kind===2?'#a9ad8a':tint(c,1.14),T.linen,{flip:side>0});pipe(seq(10,v=>lap(1,v)),.003,kind===2?cream:tint(c,.81),T.linen,5)
 }
 const front=v=>form(.5,v)
 if(kind!==1){
  const f=(u,v)=>{const p=form(.507+.014*u,.169+.82*v);p[2]+=.003;return p};grid(2,22,f,tint(c,.86),T.wool,{flip:true})
  for(let j=0;j<5;j++){const p=front(.24+j*.117);ell(p[0]+.014,p[1],p[2]+.009,.009,.009,.003,kind===2?brass:'#9b8062',T.metal,9,5)}
  for(const s of [-1,1]){const xx=.115*s,yy=-length*.574;group([xx,yy,.072],[0,s*.48,s*-.10],()=>{box(0,-.031,0,.085,.078,.009,tint(c,.93),T.wool,.004);box(0,.006,.007,.096,.023,.008,tint(c,1.06),T.linen,.004)})}
 }
 if(kind===2){wingPin(-.104,-.174,.086,1.1);const belt=(u,v)=>{const p=form(u,.471+.041*v);p[0]*=1.026;p[2]*=1.06;return p};grid(40,3,belt,'#826141',T.leather,{flip:true});const pp=front(.49);loop(pp[0],pp[1],pp[2]+.012,.026,.022,0,.004,brass,'xy',T.metal,12)}
})}
function folded(x,y,z,w,d,h,c,rot=0,trim=false){group([x,y,z],[0,rot,0],()=>{
 // A continuous soft fold wrapped around a shallow stack. The turn stays visible from the aisle.
 const shape=(u,v)=>{const a=TAU*u,side=Math.sign(Math.cos(a)),sx=Math.sign(Math.sin(a)),cx=Math.abs(Math.cos(a))**.31,cy=Math.abs(Math.sin(a))**.58,xx=(v-.5)*w
  return [xx+.0033*Math.sin(u*13+v*12),h*.50+h*.50*sx*cy*(.72+.28*Math.sin(v*PI))+.003*Math.cos(v*20+u*8),side*d*.5*cx*(.94+.06*Math.sin(v*PI))+.009*Math.sin(v*9+u*4)]}
 grid(24,14,shape,c,T.wool,{flip:true,uv:(u,v)=>[u*1.3,v*1.5]})
 for(const v of [0,1]){const p=shape(0,v);grid(20,3,(u,k)=>{const q=shape(u,v);return [p[0],h*.5+(q[1]-h*.5)*k,q[2]*k]},tint(c,.88),T.wool,{flip:v===1})}
 const edgePts=seq(18,v=>{const p=shape(.005,v);p[1]-=.007;return p});pipe(edgePts,.005,tint(c,.73),T.linen,5)
 if(trim)for(const v of [.153,.18])pipe(seq(25,u=>{const p=shape(u,v);p[1]+=.0014;return p}),.004,cream,T.linen,5)
})}
function hangingBank(){group([2.41,0,-3.154],[0,0,0],()=>{
 const w=2.98;box(0,1.33,-.304,w,2.58,.052,'#85694e',T.wood,.008,.35)
 for(let i=0;i<14;i++)box((i-6.5)*.213,1.41,-.272,.201,1.93,.017,'#94795a',T.wood,.004)
 for(const x of [-1,1]){box(x*(w/2-.047),1.295,0,.084,2.56,.696,oak);box(x*(w/2-.047),1.3,.341,.111,2.6,.069,walnut);box(x*(w/2-.047),2.239,.34,.131,.095,.090,edge)}
 for(const yy of [.115,.43,2.233,2.649])box(0,yy,0,w+.05,.064,.72,oak)
 box(0,2.662,.002,w+.12,.073,.775,walnut);box(0,2.703,.006,w+.16,.037,.803,edge)
 for(let i=-1;i<=1;i++){box(i*.961,.276,0,.947,.239,.658,dark);drawer(i*.961,.277,.331,.926,.217,'#a38159')}
 rod([-1.438,2.093,-.018],[1.438,2.093,-.018],.021,brass,T.metal,14);for(const x of [-1.425,1.425])ell(x,2.093,-.018,.018,.051,.051,oldBrass,T.metal)
 const clothes=[[-1.115,-.94,'#926747',1.08,0],[-.824,-1.13,'#be8366',.79,1],[-.568,-1.1,'#dbcfb3',.72,1],[-.295,-1.23,'#54736d',1.02,0],[.01,-1.26,'#586674',1.11,0],[.304,-1.13,'#cfad72',.827,1],[.61,-1.12,'#944f3f',.947,0],[.962,-.71,'#b8914d',1.18,2]]
 for(let i=0;i<clothes.length;i++){const [xx,a,c,l,k]=clothes[i];garment(xx,1.936,-.018,a,c,l,k,i*1.413)}
 // Transit cases above, boots and a rush basket on the shelf below.
 parcel(-1.024,2.266,.025,.583,.269,.428,'#af8760',.013);parcel(-.405,2.266,-.06,.447,.211,.374,'#c9af87',-.067)
 folded(.224,2.267,.002,.55,.38,.089,'#948c70',.026,true);folded(.229,2.357,.002,.49,.36,.080,'#a55d48',-.05)
 group([.965,2.265,0],[0,.035,0],()=>{box(0,.146,0,.654,.29,.418,'#54716c',T.leather,.019);box(0,.278,0,.671,.063,.426,'#5e7b72',T.leather,.013);for(const s of [-1,1])box(s*.205,.146,.212,.03,.281,.012,'#a47f52',T.leather,.003);decal(0,.16,.218,.157,.089,T.boxlabel)})
 group([-.965,.465,.044],[0,.08,0],()=>{boot(-.1,0,.04);boot(.103,-.006,-.04)})
 folded(.90,.464,.004,.621,.414,.095,'#a9936b',-.016,true);folded(.89,.559,-.006,.60,.394,.095,'#b7b19c',.026,true)
 collide(0,0,w,.722)
})}
function foldedShelves(){group([3.832,0,-1.637],[0,-PI/2,0],()=>{
 const w=1.95;box(0,1.194,-.213,w,2.36,.054,'#617266',T.paint,.006,.32)
 for(const x of [-1,1]){box(x*(w/2-.031),1.19,.008,.066,2.38,.533,oak);box(x*(w/2-.031),1.19,.266,.089,2.38,.072,walnut)}
 for(const yy of [.099,.514,1.006,1.507,2.025,2.398]){box(0,yy,0,w+.045,.044,.556,oak);box(0,yy+.001,.277,w+.048,.051,.021,edge,T.wood,.006)}
 let stacks=[['#b98369','#c3a381','#e0c49b','#85988a'],['#687b78','#999b80','#c7b498'],['#b6a38e','#d8c8a4','#af755b','#e2cfb0','#776766'],['#535e63','#889383','#b4987b'],['#71807a','#c1b492','#9c745a']]
 const put=(cx,base,arr,ww)=>{let y=base;for(let i=0;i<arr.length;i++){const h=rnd(.058,.087);folded(cx+rnd(-.025,.025),y,rnd(-.014,.024),ww*rnd(.86,1.02),rnd(.31,.424),h,arr[i],rnd(-.055,.055),i%2===0);y+=h-.001}}
 put(-.487,.54,stacks[0],.65);put(.389,.54,stacks[1],.69);put(-.479,1.03,stacks[2],.73);put(.432,1.03,stacks[3],.61);put(-.46,1.532,stacks[4],.65)
 for(let i=0;i<3;i++)spool(.204+.18*i,1.531,.069+(i%2)*.04,.151,['#ad7652','#c89c52','#78918b'][i])
 parcel(.36,.124,-.02,.79,.266,.393,'#bfab88',.012);satchel(-.49,.125,.007,.73)
 put(.488,2.05,['#9d6852','#c29e7e','#8b957e'],.616);parcel(-.443,2.051,-.023,.697,.221,.411,'#a99675',-.013)
 for(const xx of [-.47,.46])for(const yy of [.516,1.007,1.51]){box(xx,yy,.294,.116,.031,.005,oldBrass,T.metal,.002);box(xx,yy,.298,.094,.018,.002,'#d9c59c',T.paper,0)}
 collide(0,0,w,.576)
})}
function pendant(x,z){group([x,0,z],[0,0,0],()=>{
 lathe(0,2.997,0,[[.038,0],[.063,.024],[.083,.049]],oldBrass,T.metal);rod([0,2.72,0],[0,3.02,0],.008,iron,T.metal,8)
 lathe(0,2.32,0,[[0,0],[.035,.016],[.087,.05],[.132,.139],[.118,.224],[.073,.26],[.029,.292],[0,.296]],'#e7b76e',T.glow,12)
 lathe(0,2.32,0,[[.031,.283],[.136,.222],[.144,.223],[.134,.243],[.055,.288],[.031,.307],[.022,.324],[0,.333]],oldBrass,T.metal,12)
 for(let i=0;i<6;i++){const a=i*TAU/6;pipe([[.03*Math.cos(a),2.331,.03*Math.sin(a)],[.087*Math.cos(a),2.37,.087*Math.sin(a)],[.132*Math.cos(a),2.46,.132*Math.sin(a)],[.119*Math.cos(a),2.546,.119*Math.sin(a)]],.005,oldBrass,T.metal,6)}
 rod([0,2.644,0],[0,2.73,0],.012,oldBrass,T.metal);lampLight([0,2.422,0],'#ffd09d',2.0)
})}
function rainCape(){group([3.485,2.079,-.506],[0,PI,0],()=>{
 box(0,.057,-.086,.65,.084,.063,walnut);rod([0,.102,-.079],[0,.176,.004],.024,oak,T.wood)
 const cloth='#426967',lining='#c69a60'
 const f=(u,v)=>{const slit=.08+.25*v,a=slit+u*(TAU-2*slit),w=interp(v,[[0,.109],[.066,.211],[.156,.26],[.63,.305],[1,.373]]),d=.065+.055*v
  const wave=(.005+.017*v)*Math.sin(7*a+.67*v)+(.002+.006*v)*Math.sin(13*a-2.8*v)
  return [Math.sin(a)*(w+wave)+.014*v*v,-v*1.039-.018*Math.abs(Math.sin(a))+.043*Math.cos(3*a+1.9)*v**4,(Math.cos(a)*(d+wave))*.84+.03+.02*v]}
 grid(52,32,f,cloth,T.wool,{flip:true,uv:(u,v)=>[u*2.7,v*2.9]})
 // A contrast lining shows in the front opening and turns out at the rain-worn hem.
 grid(48,4,(u,v)=>{const p=f(u,.962+.038*v);p[0]*=1.008;p[2]+=.003*Math.cos(u*TAU);return p},lining,T.linen,{flip:true})
 for(const u of [0,1])pipe(seq(33,v=>f(u,v)),.008,lining,T.linen,7)
 const storm=(u,v)=>{const p=f(u,.041+.22*v+.048*v*Math.cos(u*TAU));p[0]*=1.055;p[2]=.03+(p[2]-.03)*1.16;return p}
 grid(42,11,storm,'#4e7973',T.wool,{flip:true,uv:(u,v)=>[u*2.1,v*.6]})
 pipe(seq(43,u=>storm(u,1)),.006,lining,T.linen,6)
 const hood=(u,v)=>{const a=TAU*u,k=1-v**1.78*.96;return [.132*Math.cos(a)*k-.026*v*v,.132+.169*Math.sin(a)*k+.037*v*v,.13-.225*v+.015*Math.cos(a*2)*k]}
 grid(32,16,hood,cloth,T.wool,{flip:true,uv:(u,v)=>[u*1.25,v*.7]})
 grid(32,15,(u,v)=>{const p=hood(u,v*.96);return [p[0]*.923,.132+(p[1]-.132)*.926,p[2]-.004]},'#ad814f',T.linen,{uv:(u,v)=>[u*1.25,v*.7]})
 pipe(seq(33,u=>hood(u,0)),.0085,lining,T.linen,8)
 // Two chased clasps and a short fastening chain.
 for(const s of [-1,1]){wingPin(s*.055,-.132,.125,.61);loop(s*.045,-.145,.13,.009,.009,0,.0027,brass)}
 pipe([[-.043,-.146,.131],[-.028,-.168,.134],[0,-.183,.138],[.022,-.172,.134],[.044,-.146,.131]],.0034,oldBrass,T.metal,7)
 // A darn on the left front panel, stitched to follow the curvature of the coat.
 const patch=(u,v)=>{const p=f(.817+.059*u,.631+.092*v);p[0]*=1.019;p[2]=.025+(p[2]-.025)*1.035;return p};grid(6,7,patch,'#9d8661',T.linen,{flip:true})
 for(let i=0;i<6;i++)for(const v of [.032,.949])pipe([patch(.024+i*.163,v),patch(.108+i*.163,v+.034)],.0018,'#d1b080',T.linen,5)
})}
export function wardrobe(){hangingBank();foldedShelves();rainCape();rug(2.118,-1.69,1.20,1.77,T.runner,-.016);pendant(2.15,-1.76)
 // A pair of felt gaiters and a winding stool in the changing nook.
 group([3.278,0,-.735],[0,.09,0],()=>{for(const a of [.1,2.2,4.3])plank([.192*Math.cos(a),0,.192*Math.sin(a)],[.137*Math.cos(a),.386,.137*Math.sin(a)],.045,.047,oak)
  lathe(0,.37,0,[[.18,0],[.218,.024],[.226,.051],[.215,.071],[0,.076]],walnut,T.wood);folded(0,.446,0,.344,.229,.047,'#ad6c52',.13,true);collide(0,0,.433,.429)})
}
