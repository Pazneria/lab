import {T,PI,TAU,grid,box,ell,lathe,pipe,rod,loop,group,rnd,tint,onTop,decal,collide,lampLight,plank,clamp} from './mesh.mjs'
export const oak='#a87346',edge='#b48b62',walnut='#69452e',dark='#493329',brass='#c89952',oldBrass='#917148',iron='#4c504a',cream='#e5d3b0',teal='#385e59',blue='#335457',red='#af5742'
export function knob(x,y,z,r=.027){group([x,y,z],[PI/2,0,0],()=>lathe(0,0,0,[[r*.95,0],[r,.006],[r*.44,.01],[r*.42,.02],[r*.9,.025],[r,.032],[r*.68,.04],[0,.044]],brass,T.metal,14))}
export function drawer(x,y,z,w,h,wood=oak){box(x,y,z,w,h,.042,wood,T.wood,.009);box(x,y,z+.026,w-.052,h-.04,.015,tint(wood,1.05),T.wood,.006);for(const dx of w>.66?[-w*.28,w*.28]:[0])knob(x+dx,y,z+.035)}
export function turnedLeg(x,y,z,h,r,c=walnut){lathe(x,y,z,[[r*.62,0],[r*.84,.015*h],[r*.94,.046*h],[r*.68,.075*h],[r*.58,.12*h],[r*.60,.20*h],[r*.84,.43*h],[r,.55*h],[r*.86,.60*h],[r*.78,.64*h],[r*.92,.68*h],[r*.96,.71*h],[r*.80,.74*h],[r*.82,h]],c,T.wood,14)}
export function chest(w,h,d,drawers=2,wood=oak){const leg=.14
 for(const x of [-1,1])for(const z of [-1,1])turnedLeg(x*(w/2-.065),0,z*(d/2-.065),leg+.02,.046)
 box(0,(h+leg)/2,0,w-.035,h-leg-.04,d-.04,walnut);box(0,leg,0,w,.06,d,wood)
 for(const s of [-1,1]){const xx=s*(w/2-.013),yy=(h+leg)/2
  box(xx,yy,0,.018,h-leg-.135,d-.14,tint(wood,.88),T.wood,.006)
  for(const zsign of [-1,1])box(xx+s*.012,yy,zsign*(d/2-.047),.026,h-leg-.056,.055,wood)
  for(const fy of [leg+.063,h-.082]){box(xx+s*.012,fy,0,.023,.061,d-.055,wood);for(const zs of [-1,1])ell(xx+s*.025,fy,zs*(d/2-.048),.003,.008,.008,tint(wood,.64),T.wood,8,5)}
 }
 for(const x of [-1,1])box(x*(w/2-.027),(h+leg)/2,d/2-.018,.048,h-leg,.052,edge)
 const step=(h-leg-.089)/drawers;for(let i=0;i<drawers;i++)drawer(0,leg+.048+step*(i+.5),d/2-.008,w-.119,step-.016,wood)
 box(0,h-.034,0,w+.037,.065,d+.043,wood,T.wood,.011);collide(0,0,w,d)
}
export function frame(x,y,z,w,h,t,wood=walnut){box(x,y,z,w,h,.036,dark,T.wood,.004);decal(x,y,z+.021,w-.043,h-.043,t)
 for(const i of [-1,1]){box(x+i*(w/2-.012),y,z+.026,.026,h,.031,wood);box(x,y+i*(h/2-.012),z+.026,w-.038,.026,.031,wood);box(x+i*(w/2-.029),y,z+.032,.006,h-.046,.008,brass,T.metal,.002);box(x,y+i*(h/2-.029),z+.032,w-.055,.006,.008,brass,T.metal,.002)}
}
export function book(x,y,z,w,d,h,c,angle=0,cover=-1){group([x,y,z],[0,angle,0],()=>{box(0,h/2,0,w-.014,h-.009,d-.015,'#d7bf93',T.paper,.003);for(const yy of [.004,h-.004])box(0,yy,0,w,.008,d,c,T.leather,.003)
 box(-w/2+.008,h/2,0,.019,h,d,c,T.leather,.006);for(const zz of [-.36,.32])box(-w/2+.006,h/2,d*zz,.019,h+.003,.009,brass,T.metal,.001)
 if(cover>=0)onTop(.006,h+.001,0,w-.025,d-.012,cover)
})}
export function envelope(x,y,z,w,d,rot=0){group([x,y,z],[0,rot,0],()=>{box(0,.002,0,w,.004,d,'#deca9e',T.paper,.001);onTop(0,.0045,0,w-.002,d-.002,T.letter);ell(w*.095,.009,d*.03,.023,.005,.021,'#a34c35',T.plain,12,6)})}
export function spool(x,y,z,s,c){lathe(x,y,z,[[s*.46,0],[s*.50,s*.07],[s*.48,s*.14],[s*.36,s*.16],[s*.36,s*.84],[s*.49,s*.86],[s*.5,s*.94],[s*.44,s],[0,s]],oak,T.wood,16)
 lathe(x,y,z,[[s*.375,s*.18],[s*.41,s*.23],[s*.415,s*.77],[s*.375,s*.84]],c,T.linen,18);for(let i=0;i<6;i++)loop(x,y+s*(.25+i*.092),z,s*.414,0,s*.414,.0018,tint(c,.86),'xz',T.linen,18)}
export function cup(x,y,z,s=1,c='#d9d8b9'){group([x,y,z],[0,-.3,0],()=>{
 const a=s*.092;lathe(0,0,0,[[0,0],[a*.58,.003*s],[a*.67,.01*s],[a*.68,.024*s],[a,.115*s],[a*.99,.127*s],[a*.89,.127*s],[a*.86,.115*s],[a*.61,.03*s],[0,.029*s]],c,T.china)
 loop(0,.111*s,0,a*.975,0,a*.975,.003*s,teal,'xz',T.china)
 pipe([[a*.92,.105*s,0],[a*1.45,.11*s,0],[a*1.59,.088*s,0],[a*1.55,.065*s,0],[a*1.28,.042*s,0],[a*.78,.045*s,0]],.009*s,c,T.china,9)
 lathe(0,.075*s,0,[[0,0],[a*.795,0]],'#684634',T.plain)
})}
export function lamp(x,y,z,s=1){group([x,y,z],[0,.16,0],()=>{
 const pr=[[0,0],[.11,0],[.125,.012],[.129,.024],[.115,.037],[.087,.04],[.08,.061],[.055,.065],[.049,.09],[.043,.102],[.067,.113],[.067,.13],[.059,.141]].map(([a,b])=>[a*s,b*s])
 lathe(0,0,0,pr,oldBrass,T.metal);lathe(0,0,0,[[.049,.123],[.079,.151],[.087,.2],[.078,.238],[.044,.27],[.042,.35],[.048,.365]].map(([a,b])=>[a*s,b*s]),'#f5cc82',T.glow)
 lathe(0,0,0,[[.049,.32],[.115,.312],[.148,.286],[.145,.271],[.141,.267],[.166,.256],[.17,.266],[.13,.301],[.07,.339],[.048,.346]].map(([a,b])=>[a*s,b*s]),teal,T.metal,32)
 loop(0,.266*s,0,.167*s,0,.167*s,.004*s,brass,'xz');for(const i of [-1,1])pipe([[i*.062*s,.103*s,0],[i*.11*s,.14*s,0],[i*.114*s,.22*s,0],[i*.12*s,.267*s,0]],.004*s,brass,T.metal,8)
 knob(0,.082*s,.046*s,.012*s);lampLight([0,.219*s,0],'#ffbd75',1.52*s)
})}
export function vase(x,y,z,s=1,c='#608b85'){lathe(x,y,z,[[0,0],[.07,.002],[.088,.021],[.112,.082],[.119,.15],[.097,.205],[.052,.233],[.047,.268],[.057,.273],[.058,.286],[.046,.287],[.044,.267]].map(([a,b])=>[a*s,b*s]),c,T.china)
 for(const yy of [.048,.055,.212])loop(x,y+yy*s,z,(yy>.2?.09:.102)*s,0,(yy>.2?.09:.102)*s,.002*s,cream,'xz',T.china)}
export function flowers(x,y,z,s=1){for(let i=0;i<8;i++){const a=rnd(0,TAU),r=rnd(.055,.24)*s,dx=Math.cos(a)*r,dz=Math.sin(a)*r,h=rnd(.28,.52)*s;const end=[x+dx,y+h,z+dz]
 pipe([[x+rnd(-.018,.018),y,z],[x+dx*.25,y+h*.55,z+dz*.25],end],.0035*s,'#686c40',T.wood,6)
 for(let j=0;j<4;j++){const f=.32+j*.125,sgn=j%2?1:-1;group([x+dx*f*f,y+h*f,z+dz*f*f],[0,a+.3,sgn*.82],()=>ell(sgn*.009*s,0,0,.012*s,.042*s,.006*s,j%2?'#78805b':'#809174',T.linen,8,4))}
 for(let k=0;k<5;k++){const b=k*TAU/5;ell(end[0]+.018*s*Math.cos(b),end[1],end[2]+.018*s*Math.sin(b),.02*s,.014*s,.015*s,i%3?'#d7ac69':'#c9b2a0',T.linen,8,5)}ell(...end,.012*s,.016*s,.012*s,'#ac783d',T.wool,8,5)
}}
export function rug(x,z,w,d,t=T.rug,rot=0){group([x,.016,z],[0,rot,0],()=>{
 grid(20,28,(u,v)=>[(u-.5)*w,.009+.002*Math.sin(u*17+v*21)+.002*Math.cos(u*29-v*9),(v-.5)*d],'#ffffff',t,{flip:true})
 for(const sign of [-1,1])for(let i=0;i<Math.round(w*60);i++){const xx=(i/(Math.round(w*60)-1)-.5)*w,zz=sign*d/2;rod([xx,.01,zz],[xx+rnd(-.009,.009),.003,zz+sign*rnd(.025,.055)],.0038,'#cbba94',T.linen,4)}
})}
export function parcel(x,y,z,w,h,d,c='#bba078',rot=0){group([x,y,z],[0,rot,0],()=>{box(0,h/2,0,w,h,d,c,T.paper,.015);for(const zz of [-.26,.26]){box(0,h+.002,d*zz,w-.01,.005,.007,cream,T.linen,.001);box(w/2+.001,h/2,d*zz,.004,h-.01,.007,cream,T.linen,.001);box(-w/2-.001,h/2,d*zz,.004,h-.01,.007,cream,T.linen,.001)}
 box(w*.09,h+.004,0,.006,.006,d-.01,cream,T.linen,.001);for(const zz of [-1,1])box(w*.09,h/2,zz*(d/2+.001),.006,h-.008,.005,cream,T.linen,.001);onTop(w*.23,h+.008,d*.02,w*.24,d*.32,T.boxlabel,'#ffffff',.1)})}
export function clock(x,y,z,r){group([x,y,z],[.06,0,0],()=>{group([0,0,0],[PI/2,0,0],()=>lathe(0,0,0,[[0,-.025],[r*.95,-.025],[r,-.015],[r,.014],[r*.94,.024],[0,.024]],brass,T.metal,36));decal(0,0,.025,r*1.32,r*1.32,T.clock);loop(0,0,.026,r*.93,r*.93,0,.004,oldBrass);loop(0,r+.018,0,.018,.02,0,.004,brass)})}
export function satchel(x,y,z,scale=1){const s=scale;group([x,y,z],[0,-.11,.026],()=>{
 box(0,.19*s,0,.48*s,.35*s,.16*s,'#8d583b',T.leather,.045*s);box(0,.23*s,.078*s,.45*s,.205*s,.045*s,'#a16a45',T.leather,.031*s)
 for(const xx of [-.15,.15]){box(xx*s,.18*s,.107*s,.033*s,.2*s,.011*s,'#714b34',T.leather,.004);loop(xx*s,.17*s,.118*s,.022*s,.028*s,0,.0035*s,brass,'xy',T.metal,12)}
 pipe([[-.224*s,.28*s,0],[-.19*s,.49*s,-.008*s],[-.11*s,.59*s,0],[.095*s,.60*s,0],[.19*s,.52*s,0],[.228*s,.29*s,0]],.014*s,'#775035',T.leather)
})}
export function boot(x,z,rot,c='#755139'){group([x,.007,z],[0,rot,0],()=>{ell(0,.032,.052,.097,.029,.177,'#443831',T.leather,18,8);ell(0,.075,.058,.089,.066,.161,c,T.leather)
 lathe(0,0,-.037,[[.07,.062],[.088,.09],[.073,.139],[.069,.184],[.073,.23],[.087,.32],[.086,.345],[.074,.35],[.067,.321]],c,T.leather,18)
 for(const yy of [.14,.166,.193,.219]){rod([-.033,yy,.029],[.033,yy+.016,.028],.003,cream,T.linen,5);rod([.033,yy,.029],[-.033,yy+.016,.028],.003,cream,T.linen,5)}
 box(.079,.284,-.03,.011,.044,.048,brass,T.metal,.004)
})}
