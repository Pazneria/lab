import {T,PI,TAU,grid,box,ell,lathe,pipe,rod,loop,group,rnd,tint,decal,onTop,collide,plank} from './mesh.mjs'
import {oak,edge,walnut,dark,brass,oldBrass,iron,cream,teal,blue,red,frame,knob,drawer,turnedLeg,chest,book,envelope,spool,cup,lamp,vase,flowers,rug,parcel,clock} from './objects.mjs'
function trestleDesk(){const w=2.32,d=.936,h=.836
 for(const s of [-1,1]){const xx=s*.908;for(const zz of [-.334,.334]){turnedLeg(xx,0,zz,.728,.053,walnut);box(xx,.682,zz,.098,.133,.1,walnut)}
  box(xx,.215,0,.075,.076,.69,oak);box(xx,.747,0,.103,.125,.78,walnut)}
 box(0,.239,-.164,1.977,.082,.081,walnut);for(const x of [-.98,.98])box(x,.243,-.164,.032,.14,.097,edge)
 box(0,.747,-.338,1.91,.104,.075,walnut);box(0,.737,.332,1.94,.124,.066,walnut);drawer(.548,.739,.364,.633,.102,oak)
 for(let i=0;i<4;i++)box(0,h-.032,(i-1.5)*(d/4),w,.063,d/4-.002,['#ac7f53','#bd9063','#af8256','#bc9063'][i],T.wood,.009,.25)
 for(const x of [-1,1])box(x*(w/2-.031),h-.031,0,.061,.064,d+.006,edge,T.wood,.006)
 box(0,h-.076,0,w-.053,.036,d-.034,walnut,T.wood,.006)
 for(const xx of [-.919,.919])for(const zz of [-.355,.355])lathe(xx,h+.0006,zz,[[.009,0],[0,.0003]],'#7e603e',T.wood,10)
 // Incised tally ticks and a burnished strip at the near lip of the desk.
 for(let i=0;i<13;i++){const x=-.485+i*.014;rod([x,h+.0008,.444],[x+.003,h+.0008,.444+(i%4?.008:.013)],.0008,'#916d4b',T.wood,4)}
 collide(0,0,w,d)
}
function deskChart(){group([-.148,.839,.032],[0,.067,0],()=>{
 const W=1.13,D=.704;const f=(u,v)=>[(u-.5)*W,.009+.046*Math.exp(-((u-.003)**2)/.0007)+.018*Math.exp(-((u-.992)**2)/.0007)+.005*Math.sin(u*13+v*8)+.004*Math.cos(u*4-v*11),(v-.5)*D]
 group([-.038,.003,.009],[0,-.064,0],()=>{box(0,0,0,1.138,.003,.737,'#cab789',T.paper,.001);onTop(0,.002,0,1.126,.725,T.chart)})
 grid(44,26,f,'#fff4d7',T.map,{flip:true})
 const st=[[.17,.72],[.335,.58],[.492,.646],[.63,.392],[.796,.284]],ps=st.map(([u,v])=>f(u,v))
 for(const [i,p] of ps.entries()){rod([p[0],p[1],p[2]],[p[0]+.002,p[1]+.028,p[2]],.003,oldBrass,T.metal,6);ell(p[0]+.002,p[1]+.028,p[2],.009,.009,.009,i===4?teal:red,T.plain,10,6)}
 for(let i=1;i<ps.length;i++){const a=ps[i-1],b=ps[i];pipe([[a[0],a[1]+.019,a[2]],[(a[0]+b[0])/2,(a[1]+b[1])/2+.012,(a[2]+b[2])/2+.006],[b[0],b[1]+.02,b[2]]],.0026,'#b34936',T.linen,5)}
 group([.279,.033,.182],[0,-.26,0],()=>{box(0,0,0,.407,.009,.035,brass,T.metal,.002);for(let i=0;i<33;i++)box((i-16)*.011,.005,.011-(i%4===0?.005:0),.0014,.001,i%4===0?.016:.008,dark,T.plain,0)})
 // Dividers are open over an unfinished triangular course.
 group([-.289,.036,-.098],[0,.41,0],()=>{ell(0,.009,0,.018,.007,.018,oldBrass,T.metal,16,6);for(const i of [-1,1]){pipe([[0,.009,0],[i*.019,.004,.079],[i*.061,.003,.213]],[.009,.006,.0017],brass,T.metal,8)}rod([-.032,.008,.112],[.032,.008,.112],.003,iron,T.metal,6)})
})}
function quill(x,y,z){group([x,y,z],[-.11,.4,.28],()=>{
 const h=.294;pipe([[0,0,0],[.004,.06,0],[.003,.13,0],[.023,.22,0],[.051,h,0]],[.002,.0036,.0034,.0025,.0007],'#d9c9a2',T.plain,6)
 for(const s of [-1,1]){const f=(u,v)=>{const y=.062+.233*v,w=.034*Math.pow(Math.sin(PI*v),.65)*(s===1?1.15:.72),notch=(Math.floor(v*35)%6===0?.64:1);return [.052*v*v+s*w*u*notch,y-.025*u*(1-v*.67),.011*u+.003*Math.sin(v*51)]};grid(3,38,f,s>0?'#d4c095':'#a99c7a',T.linen,{flip:s<0})
 for(let i=0;i<15;i++){const v=.09+i*.055;pipe([f(.1,v),f(.54,v+.014),f(.9,v+.031)],.0011,'#ac9e7b',T.plain,4)}}
})}
function fieldBasket(){group([-.661,.006,-.127],[0,-.13,0],()=>{
 const h=.396,rAt=v=>.123+.049*v+.017*Math.sin(v*PI),straw=['#be9863','#ab8558','#c09b6e','#ac875e']
 lathe(0,0,0,[[0,.007],[.12,.007],[.121,.017],[.136,.083],[.157,.218],[.172,.385],[.163,.39],[.15,.228],[.115,.027],[0,.026]],'#9c7951',T.linen,28)
 for(let j=0;j<13;j++){const v=(j+.5)/13,r=rAt(v);const pts=[];for(let i=0;i<=64;i++){const a=TAU*i/64,rr=r+.006*Math.cos(a*16+j*PI);pts.push([rr*Math.cos(a),h*v+.002*Math.sin(a*16),rr*Math.sin(a)])}pipe(pts,.0094,straw[j%4],T.linen,6)}
 for(let i=0;i<16;i++){const a=TAU*i/16,pts=[];for(let j=0;j<=14;j++){const v=j/14,rr=rAt(v)+.0065*Math.cos(v*13*PI);pts.push([rr*Math.cos(a),h*v,rr*Math.sin(a)])}pipe(pts,.0066,'#af8758',T.wood,6)}
 loop(0,.394,0,.174,0,.174,.011,'#bd9968','xz',T.wood,36)
 for(const [xx,zz,ht,ang,c] of [[-.042,-.052,.661,-.14,'#dbc69a'],[.058,-.036,.586,.15,'#cfb58b'],[.012,.069,.639,.07,'#e0ccaa']]){group([xx,.036,zz],[ang*.57,0,ang],()=>{
   lathe(0,0,0,[[.043,0],[.046,ht],[.04,ht+.001],[.036,ht-.039],[.038,.08]],c,T.paper,20)
   loop(0,ht*.63,0,.045,0,.045,.004,'#946747','xz',T.linen,18)
   const pts=[];for(let i=0;i<26;i++){const a=i*.26,r=.036-.001*i;pts.push([r*Math.cos(a),ht-.006,r*Math.sin(a)])}pipe(pts,.0035,tint(c,.91),T.paper,5)
  })}
})}
function tableAccessories(){const y=.839
 lamp(.891,y,-.215,1.27);book(-.923,y,-.152,.334,.417,.064,'#864f3e',.07,T.logbook);book(-.935,y+.064,-.163,.317,.398,.061,teal,-.095,T.logbook)
 envelope(-.918,y+.128,-.156,.243,.158,.18)
 // Footed ink bottle, saucer, pen rest and a tiny wax spill.
 lathe(.616,y,-.082,[[0,0],[.047,0],[.057,.012],[.054,.079],[.034,.091],[.03,.109],[.036,.113],[.035,.125],[.025,.125],[.023,.11]],'#365052',T.china,12)
 loop(.616,y+.115,-.082,.035,0,.035,.0035,brass,'xz',T.metal,14);quill(.616,y+.11,-.082)
 group([.678,y+.006,.216],[0,-.29,0],()=>{pipe([[-.103,0,0],[.07,0,0],[.107,0,0]],[.006,.006,.001],'#95533b',T.paint,6);rod([.084,.001,0],[.108,.001,0],.002,'#51493d',T.plain,5)})
 cup(.904,y,.146,.80,'#d9cfad');spool(-.858,y,.236,.079,red)
 group([-.756,y+.008,.242],[0,-.27,0],()=>{lathe(0,0,0,[[0,0],[.076,0],[.083,.009],[.082,.027],[.074,.034],[0,.034]],oldBrass,T.metal,28)
  onTop(0,.0348,0,.119,.119,T.clock);loop(0,.036,0,.078,0,.078,.005,brass,'xz');rod([-.035,.038,.027],[.042,.038,-.031],.003,red,T.metal,6)})
}
function chair(x,z,angle){group([x,0,z],[0,angle,0],()=>{
 for(const s of [-1,1])for(const t of [-1,1]){const a=[s*.203,.008,t*.208],b=[s*.159,.455,t*.165];plank(a,b,.046,.048,walnut);if(t===-1)plank(b,[s*.184,.885,-.224],.045,.044,walnut)}
 for(const z0 of [-.175,.175])box(0,.172,z0,.366,.031,.032,oak);for(const x0 of [-.18,.18])box(x0,.20,0,.033,.032,.36,oak)
 box(0,.437,0,.436,.061,.423,oak,T.wood,.018);box(0,.475,.002,.415,.035,.405,'#69837a',T.leather,.015)
 group([0,.81,-.213],[-.148,0,0],()=>box(0,0,0,.422,.13,.043,oak,T.wood,.017));for(let i=-1;i<=1;i++)plank([i*.087,.467,-.182],[i*.093,.764,-.21],.021,.023,edge)
 collide(0,-.009,.46,.49)
})}
function board(){group([-.095,1.926,-.394],[0,0,0],()=>{
 // Broad survey board with a pegged linen chart, photographs and stitched route line.
 box(0,0,0,1.87,1.25,.059,walnut,T.wood,.015);box(0,0,.032,1.803,1.186,.024,'#977a5c',T.linen,.007,.27)
 for(const s of [-1,1]){box(s*.925,0,.047,.048,1.28,.045,edge);box(0,s*.616,.047,1.862,.049,.045,edge)}
 group([-.248,-.018,.051],[0,0,-.031],()=>{decal(0,0,0,1.17,.936,T.map,'#f7e5c0',12,9)
  const station=[[.17,.72],[.335,.58],[.492,.646],[.63,.392],[.796,.284]]
  for(let i=0;i<station.length;i++){const [u,v]=station[i],xx=(u-.5)*1.17,yy=(.5-v)*.936;ell(xx,yy,.014,.014,.014,.009,i===4?teal:red,T.plain,10,7);if(i){const [a,b]=station[i-1];pipe([[(a-.5)*1.17,(.5-b)*.936,.013],[(a+u-1)*1.17/2,(1-b-v)*.936/2-.014,.015],[xx,yy,.013]],.0036,'#a95139',T.linen,6)}}
  for(const xx of [-.558,.557])for(const yy of [-.438,.438])ell(xx,yy,.008,.013,.013,.006,oldBrass,T.metal,10,6)})
 group([.584,.248,.06],[0,0,.052],()=>{decal(0,0,0,.396,.464,T.moths);ell(0,.205,.009,.015,.015,.007,brass,T.metal,10,6)})
 group([.566,-.266,.062],[0,0,-.08],()=>{decal(0,0,0,.409,.332,T.station);ell(0,.145,.008,.013,.013,.006,teal,T.paint,10,6)})
})}
function scroll(x,y,z,r,len,c,rot=0){group([x,y,z],[0,rot,PI/2],()=>{lathe(0,-len/2,0,[[0,0],[r,0],[r,len],[0,len]],c,T.paper,22);for(const s of [-1,1]){loop(0,s*(len/2+.001),0,r*.72,0,r*.72,.0014,tint(c,.62),'xz',T.paper,20);loop(0,s*(len/2+.001),0,r*.42,0,r*.42,.0011,tint(c,.66),'xz',T.paper,20)}loop(0,0,0,r+.002,0,r+.002,.0046,red,'xz',T.linen,18)})}
function uprightBook(x,y,z,w,h,d,c,tilt=0){group([x,y,z],[0,0,tilt],()=>{box(0,h/2,0,w-.009,h-.014,d-.011,'#cdba95',T.paper,.003);for(const s of [-1,1])box(s*(w/2-.003),h/2,0,.007,h,d,c,T.leather,.002);box(0,h/2,d*.5,w,h,.018,c,T.leather,.005)
 for(const f of [.095,.137,.81,.846])box(0,h*f,d*.5+.01,w*.93,.005,.002,brass,T.metal,.001)
 box(0,h*.68,d*.5+.012,w*.75,h*.166,.003,'#bea278',T.paper,.001);for(const f of [.652,.673,.692])box(0,h*f,d*.5+.014,w*.52,.003,.001,'#75634b',T.plain,0)
})}
function cubby(){group([1.502,0,3.62],[0,PI,0],()=>{const w=1.36,d=.453
 for(const x of [-1,1])box(x*(w/2-.025),.877,0,.058,1.718,d,walnut);box(0,.895,-.218,w,1.705,.043,'#617469',T.paint,.004,.36)
 for(const yy of [.096,.529,.965,1.35,1.741])box(0,yy,0,w+.055,.049,d+.044,oak)
 for(const xx of [-.218,.202])box(xx,1.353,0,.043,.738,d-.021,walnut)
 for(let i=0;i<7;i++)uprightBook(-.501+i*.114,.56,-.017,.089+rnd(-.008,.012),rnd(.275,.376),rnd(.263,.324),['#785543','#5e7873','#ae8254','#985e48','#68706d','#9a8969','#58736a'][i],i<2?-.05:0)
 for(let j=0;j<2;j++)for(let i=0;i<3;i++){const xx=(i-1)*.425;for(let k=0;k<2+(i%2);k++)envelope(xx+rnd(-.034,.034),.995+j*.384+k*.012,.046,.31,.225,rnd(-.08,.08))}
 parcel(-.255,.122,0,.579,.269,.344,'#af8865');book(.346,.124,.007,.352,.325,.072,'#82785b',.012);book(.331,.198,.014,.33,.306,.055,red,-.048)
 for(let i=0;i<3;i++)scroll(-.3,1.805+(i===2?.074:0),i===2?.018:-.047+.139*i,.054,.58,'#d7bf95',.056)
 vase(.419,1.77,-.056,.78,'#557e78');flowers(.419,1.962,-.056,.67);collide(0,0,w,d)
})}
export function study(){rug(2.477,1.72,1.815,2.497,T.runner,.012)
 group([3.643,0,1.456],[0,-PI/2,0],()=>{trestleDesk();deskChart();tableAccessories();board();fieldBasket()})
 chair(2.635,1.949,1.82);cubby()
 group([3.55,0,-.098],[0,0,0],()=>{frame(0,1.941,0,.77,1.056,T.moths,walnut);box(0,1.018,.098,.86,.039,.225,oak);for(const xx of [-.299,.299])plank([xx,.877,.012],[xx,1.005,.186],.039,.041,walnut)
  for(let i=0;i<4;i++)spool(-.276+i*.146,1.039,.102,.096,['#ad7654','#d3a958','#758e80','#a4513e'][i])})
 group([.799,0,.689],[0,PI/2,0],()=>{frame(0,1.839,0,.607,.743,T.chart,oldBrass)})
}
