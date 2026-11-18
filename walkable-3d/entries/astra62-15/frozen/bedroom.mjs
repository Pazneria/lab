import {T,PI,TAU,grid,box,ell,lathe,pipe,rod,loop,group,rnd,tint,decal,onTop,collide,plank,clamp} from './mesh.mjs'
import {oak,edge,walnut,dark,brass,oldBrass,iron,cream,teal,blue,red,frame,knob,turnedLeg,chest,book,envelope,spool,cup,lamp,vase,flowers,rug,parcel,clock,satchel,boot} from './objects.mjs'
function pillow(x,y,z,w,d,loft,angle,c,t=T.linen){group([x,y,z],[0,angle,-.04],()=>{
 const form=(u,v,sign)=>{const a=(u-.5)*2,b=(v-.5)*2,fill=Math.pow(Math.max(0,Math.sin(u*PI)*Math.sin(v*PI)),.50),crinkle=(Math.cos(v*37+u*7)*(.4+.6*Math.cos(u*11))+.58*Math.sin(u*39-v*15))
  return [w*.5*a*(1-.10*Math.pow(Math.abs(b),4)),sign*loft*fill+.006*crinkle*Math.abs(a)**3+.035*(.5-v),d*.5*b*(1-.10*Math.pow(Math.abs(a),4))]}
 for(const s of [-1,1])grid(26,18,(u,v)=>form(u,v,s),c,t,{flip:s>0,uv:(u,v)=>[u*1.6,v]})
 const pts=[];for(let i=0;i<24;i++)pts.push(form(i/24,0,1));for(let i=0;i<16;i++)pts.push(form(1,i/16,1));for(let i=0;i<24;i++)pts.push(form(1-i/24,1,1));for(let i=0;i<16;i++)pts.push(form(0,1-i/16,1));pipe(pts,.006,tint(c,.79),T.linen,6,true)
})}
function mothToy(x,y,z){group([x,y,z],[.0,-.34,.12],()=>{
 // A small wool toy, with mismatched button eyes and a red darn across its left wing.
 for(const s of [-1,1]){group([s*.102,.075,.008],[.08,0,s*-.46],()=>{ell(s*.018,.006,0,.119,.073,.042,'#bd9158',T.wool,22,12);ell(s*.046,.013,.034,.043,.028,.014,'#637e73',T.linen,16,8);ell(s*.05,.013,.047,.019,.014,.004,'#d8bb88',T.linen,12,7)})
  ell(s*.078,.028,.076,.067,.047,.056,'#a97e53',T.wool,16,8);pipe([[s*.029,.165,.045],[s*.047,.213,.037],[s*.082,.23,.035]],.005,'#755541',T.linen,6);ell(s*.082,.23,.035,.011,.013,.01,'#cc9e69',T.wool,10,7)}
 ell(0,.066,.045,.056,.074,.098,'#d4b98d',T.wool);ell(0,.128,.06,.063,.06,.056,'#dfcca2',T.wool)
 for(const s of [-1,1])ell(s*.027,.141,.107,.011,.012,.005,s>0?'#483b31':'#836d4d',T.metal,10,7)
 for(let i=0;i<4;i++)rod([-.142+i*.008,.074,.046],[-.145+i*.008,.093,.047],.0025,red,T.linen,5)
})}
function bed(){group([-2.54,0,-2.10],[0,0,0],()=>{
 const w=1.84,d=2.29
 for(const s of [-1,1]){box(s*(w/2-.04),.352,0,.087,.259,d,walnut);box(s*(w/2-.035),.464,0,.098,.038,d,edge)
 for(const zz of [-d*.5,d*.5]){const h=zz<0?1.45:.73;lathe(s*(w/2-.037),0,zz,[[.052,0],[.072,.018],[.073,.057],[.061,.074],[.047,.112],[.058,.184],[.066,.205],[.066,h-.17],[.080,h-.157],[.078,h-.126],[.052,h-.109],[.046,h-.081],[.068,h-.066],[.079,h-.027],[.061,h],[.026,h+.024],[0,h+.028]],walnut,T.wood,20)
 loop(s*(w/2-.037),h-.129,zz,.078,0,.078,.006,brass,'xz',T.metal,20)}}
 box(0,.405,1.142,w-.12,.192,.075,oak);box(0,.488,1.142,w-.115,.039,.09,edge)
 for(let j=-1;j<=1;j++){box(j*.533,.404,1.182,.478,.116,.018,tint(oak,.87),T.wood,.007);box(j*.533,.404,1.193,.432,.076,.011,tint(oak,1.04),T.wood,.005)}
 box(0,.56,0,w-.089,.223,d-.05,'#c8bf9d',T.linen,.05,.29)
 for(const yy of [.476,.639]){for(const s of [-1,1])pipe([[s*.866,yy,-1.055],[s*.873,yy,-.83],[s*.874,yy,.82],[s*.862,yy,1.062]],.009,'#dbcca7',T.linen,6)}
 const crown=u=>1.09+.255*(1-Math.cos(u*TAU))*.5+.049*Math.cos((u-.5)*PI*3)
 grid(30,9,(u,v)=>[(u-.5)*1.71,.49+(crown(u)-.49)*v,-1.122],teal,T.paint,{uv:(u,v)=>[u*1.7,v*2]})
 const rim=[];for(let i=0;i<=40;i++){let u=i/40;rim.push([(u-.5)*1.72,crown(u),-1.111])}pipe(rim,.038,walnut,T.wood,12)
 const trim=rim.map(p=>[p[0],p[1]-.052,p[2]+.003]);pipe(trim,.006,brass,T.metal,6)
 for(let i=-5;i<=5;i++){const u=.5+i*.081;box((u-.5)*1.71,(crown(u)-.09+.53)/2,-1.113,.011,crown(u)-.62,.014,'#547871',T.paint,.003)}
 pillow(-.418,.794,-.818,.844,.53,.136,.055,'#eedfc6',T.stripe);pillow(.402,.772,-.794,.827,.53,.12,-.074,'#e7d9bb');pillow(-.45,.87,-.63,.47,.32,.096,-.11,'#517975',T.linen)
 const drape=(u,v)=>{const a=2*u-1,q=clamp((Math.abs(a)-.775)/.225),foot=clamp((v-.847)/.153),qt=q*PI/2,ft=foot*PI/2
  const x=Math.sign(a)*(Math.min(Math.abs(a)/.775,1)*.849+.127*Math.sin(qt)),z=-.557+1.60*Math.min(v/.847,1)+.159*Math.sin(ft)
  const diagonal=Math.sin(u*19+v*8+.6*Math.sin(v*10)),soft=Math.cos(u*12-v*13)
  const y=.741+.064*Math.sin(PI*u)*Math.sin(PI*v)+.026*diagonal+.014*soft+.012*Math.sin(u*37+v*24)*(1-v)-.31*(1-Math.cos(qt))-.267*(1-Math.cos(ft))+.126*(1-Math.cos(qt))*(1-Math.cos(ft))
  return [x+Math.sign(a)*q*.029*Math.sin(v*27),y,z+.026*Math.sin(u*18)*foot+.041*(1-v)*Math.sin(PI*u*2+.4)]}
 grid(64,64,drape,'#ffffff',T.quilt,{flip:true})
 for(const v of [.012,.986])pipe(Array.from({length:65},(_,i)=>drape(i/64,v)),.008,'#b7774f',T.linen,6)
 for(const u of [.004,.996])pipe(Array.from({length:56},(_,i)=>drape(u,i/55)),.008,'#b7774f',T.linen,6)
 // The turned-back top sheet bends around the occupant's side.
 const turn=(u,v)=>{let p=drape(u,.012+v*(.151+.022*Math.sin(u*6.5)));p[1]+=.014+.024*Math.sin(v*PI)+.012*Math.sin(u*17+.4);p[2]-=.01;return p}
 grid(54,10,turn,'#eadbb9',T.stripe,{flip:true,uv:(u,v)=>[u*1.8,v*.43]});pipe(Array.from({length:60},(_,i)=>turn(i/59,1)),.008,'#dac7a5',T.linen,7)
 mothToy(.455,.845,-.58)
 collide(0,0,1.94,2.41)
})}
function wallBanner(){group([-2.56,2.19,-3.505],[0,0,0],()=>{
 rod([-.824,.575,.062],[.824,.575,.062],.017,oldBrass,T.metal);for(const s of [-1,1]){ell(s*.83,.575,.062,.036,.029,.029,brass,T.metal,14,7);rod([s*.66,.59,0],[s*.66,.59,.08],.014,walnut,T.wood)}
 const f=(u,v)=>[(u-.5)*1.46,.553-v*(.995+.131*(1-Math.abs(2*u-1))),.089+.022*Math.cos(u*PI*5+.6*v)+.01*Math.cos(v*8+u*8)]
 grid(28,24,f,'#fff9e6',T.flag,{flip:true});for(const u of [.012,.988])pipe(Array.from({length:18},(_,i)=>f(u,i/17)),.004,'#b79b68',T.linen,5)
})}
function bench(){group([-3.878,0,.15],[0,PI/2,0],()=>{
 for(const x of [-.75,.75])for(const z of [-.209,.209])turnedLeg(x,0,z,.44,.047);box(0,.34,0,1.59,.136,.407,walnut)
 for(let i=0;i<4;i++)box(0,.45,(i-1.5)*.132,1.73,.077,.126,oak)
 pillow(-.36,.532,.003,.78,.442,.053,.028,'#9f6554',T.stripe)
 group([.477,.49,-.027],[0,-.16,0],()=>{book(0,0,0,.226,.27,.043,teal,.12,T.logbook);envelope(-.012,.044,.022,.177,.121,-.04)})
 const shawl=(u,v)=>{const q=clamp((v-.736)/.264),a=q*PI/2;return [.19+(u-.5)*.536+.009*Math.sin(v*10+2*u),.499+.007*Math.sin(u*25+.62*v)+.003*Math.cos(u*14-v*7)-.28*(1-Math.cos(a)),-.223+.478*Math.min(1,v/.736)+.057*Math.sin(a)+.015*q*Math.sin(u*25)]}
 grid(31,29,shawl,'#b06e52',T.wool,{flip:true,uv:(u,v)=>[u*1.4,v*2]})
 for(const v of [.09,.109,.844,.865,.951])pipe(Array.from({length:33},(_,i)=>shawl(i/32,v)),.0033,cream,T.linen,5)
 for(let i=0;i<31;i++){const p=shawl(i/30,1);pipe([p,[p[0]+.003,p[1]-.016,p[2]+.006],[p[0]+rnd(-.006,.006),p[1]-rnd(.027,.044),p[2]+.002]],.0027,'#cba17d',T.wool,5)}
 // An embroidery hoop catches the sun. One wing has been worked and the other is still chalk.
 group([.155,.516,.008],[0,-.20,.009],()=>{
  grid(18,16,(u,v)=>[(u-.5)*.293,.004+.008*Math.sin(u*11+v*7)*(Math.abs(u-.5)*2)**4,(v-.5)*.284],'#fff7de',T.selvedge,{flip:true})
  loop(0,.014,0,.119,0,.119,.0062,'#b68d57','xz',T.wood,44);loop(0,.018,0,.124,0,.124,.0034,'#dfba7e','xz',T.wood,44)
  for(const xx of [-.014,.014])box(xx,.017,-.126,.014,.022,.029,oldBrass,T.metal,.002);rod([-.027,.019,-.137],[.031,.019,-.137],.0037,brass,T.metal,7)
  rod([.011,.011,-.004],[.057,.027,-.039],.0017,'#b5b8a9',T.metal,5)
  pipe([[.056,.026,-.037],[.063,.034,-.026],[.073,.031,-.012],[.081,.013,-.007],[.107,.009,.001],[.147,.004,.015],[.162,.001,.038],[.185,-.005,.021]],.0019,'#ab6044',T.linen,5)
 })
 spool(.675,.49,.102,.085,'#a96349')
 collide(0,0,1.75,.54)
})}
function stationKeys(){group([.523,0,.03],[0,-PI/2,0],()=>{
 box(0,1.752,0,.957,.168,.049,walnut);box(0,1.765,.03,.887,.093,.019,oak,T.wood,.007)
 for(const s of [-1,1]){ell(s*.438,1.76,.044,.013,.013,.006,brass,T.metal,9,6);box(s*.468,1.751,.011,.032,.195,.055,edge)}
 for(let i=0;i<5;i++){const xx=(i-2)*.16;pipe([[xx,1.745,.043],[xx,1.721,.084],[xx,1.749,.101]],.009,oldBrass,T.metal,8)
  if(i===1)continue
  const dy=i%2*.027;pipe([[xx,1.747,.099],[xx-.036,1.638-dy,.084],[xx-.018,1.593-dy,.075],[xx+.019,1.59-dy,.076],[xx+.031,1.639-dy,.086],[xx,1.747,.099]],.0041,'#8e7457',T.leather,6)
  loop(xx,1.582-dy,.077,.018,.02,0,.0035,brass,'xy',T.metal,15)
  if(i===3){rod([xx,1.571-dy,.077],[xx,1.461-dy,.076],.006,brass);box(xx+.011,1.478-dy,.075,.027,.012,.014,brass,T.metal,.002);box(xx+.013,1.466-dy,.076,.033,.01,.014,brass,T.metal,.002)}
  else{group([xx,1.531-dy,.079],[0,.13*(i-2),i%2?.15:-.09],()=>{ell(0,0,0,.037,.046,.006,oldBrass,T.metal,16,8);ell(0,-.003,.005,.027,.032,.004,[teal,red,'#c39955',teal,red][i],T.china,16,8);group([0,-.002,.01],[0,0,PI/4],()=>box(0,0,0,.012,.012,.003,cream,T.china,.001))})}
 }
 group([.098,2.193,.021],[0,0,-.031],()=>{frame(0,0,0,.415,.442,T.station,walnut)})
})}
export function bedroom(){
 rug(-2.25,-.08,2.77,2.95,T.rug,-.028);bed();wallBanner()
 group([-1.047,0,-2.974],[0,-.028,0],()=>{chest(.79,.756,.58,2,'#a47752');lamp(-.214,.758,-.057,1.05)
 group([.157,.758,-.13],[-.15,-.10,.03],()=>{frame(0,.143,0,.213,.284,T.portrait,oldBrass);plank([0,.19,-.016],[0,.006,-.078],.019,.02,walnut)})
 book(.151,.758,.088,.238,.187,.04,red,.14);envelope(.128,.801,.086,.186,.131,-.13);clock(-.075,.819,.173,.049)
 })
 group([-3.82,0,-2.886],[0,.05,0],()=>{for(const xx of [-.179,.179])for(const zz of [-.16,.16])turnedLeg(xx,0,zz,.61,.037);box(0,.616,0,.506,.053,.446,oak);vase(0,.644,-.052,.68);flowers(0,.804,-.052,.75);cup(.116,.644,.084,.59);collide(0,0,.5,.44)})
 bench();stationKeys()
 // A pegboard and delivery cabinet on the wall opposite the bed give the return view its own story.
 group([-2.97,0,3.67],[0,PI,0],()=>{chest(1.83,.823,.50,3,'#86664c');parcel(-.54,.823,-.017,.44,.19,.28,'#b99b73',.08);parcel(-.52,1.014,-.01,.32,.125,.22,'#d6bd8c',-.12)
 satchel(.13,.824,0,.91);vase(.68,.825,-.065,.64,'#b37350');flowers(.68,.986,-.065,.52)
 frame(.26,1.86,-.205,.68,.86,T.station,walnut);box(-.632,1.68,-.181,.45,.096,.085,oak)
 for(let i=0;i<3;i++){const xx=-.79+i*.157;pipe([[xx,1.685,-.142],[xx,1.655,-.095],[xx,1.688,-.079]],.012,brass,T.metal,8)}
 loop(-.63,1.574,-.076,.075,.09,0,.009,'#735137','xy',T.leather);loop(-.63,1.5,-.07,.034,.036,0,.006,brass);rod([-.633,1.48,-.067],[-.633,1.395,-.067],.006,brass);box(-.62,1.404,-.067,.032,.013,.011,brass,T.metal,.001)
 })
 // Felt house shoes, slipped off at different angles.
 for(const [x,z,r] of [[-1.29,-1.48,-.22],[-1.20,-1.18,.23]])group([x,.018,z],[0,r,0],()=>{ell(0,.013,0,.071,.019,.142,'#786244',T.leather,16,8);ell(0,.045,-.035,.074,.05,.109,'#ac7454',T.wool,18,9);ell(0,.058,.027,.05,.014,.057,'#69513f',T.wool,14,7)})
}
