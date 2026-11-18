import {box,rod,torus,place,print,path,pi,tau,lathe,ellipsoid,face} from './geometry.js';
import {P,rand} from './materials.js';
export const pick=a=>a[Math.floor(rand()*a.length)];
export function frame(x,y,z,w,h,th,col=P.oak,depth=.036,mat='wood'){
  box(x,y-h/2+th/2,z,w,th,depth,col,mat);
  box(x,y+h/2-th/2,z,w,th,depth,col,mat);
  for(const s of [-1,1])box(x+s*(w-th)/2,y,z,th,h-2*th,depth,col,mat);
}
export function pin(x,y,z,r=.014,col=P.brass){rod([x,y,z-.006],[x,y,z+.006],r,col,'metal',r,8)}
export function panel(x,y,z,w,h,base=P.pine,ed=P.deep){
  box(x,y,z,w,h,.032,base,'paint');
  frame(x,y,z+.019,w-.019,h-.016,.031,ed,.026,'paint');
  frame(x,y,z+.027,w-.097,h-.093,.008,P.trim,.009,'paint');
}
export function handle(x,y,z,w=.13){
  for(const d of [-1,1]){pin(x+d*w*.47,y,z,.018,P.bronze);rod([x+d*w*.47,y,z],[x+d*w*.47,y-.014,z+.031],.009,P.brass)}
  path([[x-w*.47,y-.014,z+.031],[x-w*.30,y-.044,z+.045],[x+w*.30,y-.044,z+.045],[x+w*.47,y-.014,z+.031]],.0095,P.brass,'metal',9,6);
}
export function drawer(x,y,z,w,h,label=null,col=P.pine){
  box(x,y,z,w,h,.039,col,'paint',.012);
  frame(x,y,z+.023,w-.032,h-.029,.014,P.deep,.017,'paint');
  if(label){box(x,y+h*.16,z+.032,.122,.054,.011,P.brass,'metal',.002);print(label,x,y+h*.16,z+.039,.103,.036);}
  handle(x,y-(label?h*.07:0),z+.033,Math.min(.145,w*.48));
}
export function strapHinge(x,y,z,len=.17){
  box(x,y+len*.29,z,.046,len*.67,.014,P.iron,'metal',.006);box(x,y-len*.23,z,.06,len*.45,.015,P.iron,'metal');
  rod([x-.037,y,z+.01],[x+.037,y,z+.01],.014,P.bronze,'metal');
  for(const j of [-.35,.22,.47])pin(x,y+len*j,z+.008,.006,P.brass)
}
export function wear(x,y,z,w,h,count=18){
  for(let i=0;i<count;i++){
    const u=x+(rand()-.5)*w,v=y+(rand()-.5)*h,l=.009+rand()**2*.065;
    face([[u-l/2,v,z],[u+l*.33,v+.0025,z],[u+l/2,v+.004,z],[u-l*.25,v+.002,z]],pick(['#9b855d','#b8996e','#7c7458']),'matte');
  }
}
export function spool(x,y,z,r,h,col,axis=0){
  place(x,y,z,()=>{
    lathe(0,0,0,[[r*.89,0],[r,.006],[r,.015],[r*.65,.019],[r*.65,h-.019],[r,h-.015],[r,h-.005],[r*.91,h]],P.maple,'wood',14);
    lathe(0,0,0,[[r*.73,.018],[r*.86,.026],[r*.83,h-.027],[r*.72,h-.018]],col,'cloth',16);
    for(let i=0;i<3;i++){const yy=.026+(h-.057)*i/3;lathe(0,0,0,[[r*.842,yy],[r*.842,yy+.0035]],col,'cloth',14,false)}
    lathe(0,h+.0006,0,[[r*.19,0],[r*.19,.001]],'#514230','wood',10);
  },axis);
}
export function book(x,y,z,w,h,d,col,standing=false){
  place(x,y,z,()=>{box(0,h/2,0,w-.012,h-.008,d-.009,'#d9caa5','matte',.002);
    for(const s of [0,h])box(0,s,0,w,.009,d,col,'leather',.003);
    box(0,h/2,d/2,w,h,.015,col,'leather',.004);for(const s of [-.34,.34])box(w*s,h/2,d/2+.009,.007,h*.84,.005,P.brass,'metal',.001);
  },0,0,standing?pi/2:0)
}
export function cleat(x,y,z){box(x,y,z,.12,.036,.035,P.brass,'metal');for(const s of [-1,1])pin(x+s*.04,y,z+.02,.007)}
export function basket(x,y,z,r,h,handles=true){
  lathe(x,y,z,[[r*.76,0],[r*.86,.04],[r,h*.9],[r*.97,h]],'#aa8253','leather',22);
  for(let j=0;j<8;j++){const t=j/8,rr=r*(.84+.16*t);lathe(x,y,z,[[rr,y*0+h*t+.01],[rr+.008,h*t+.018],[rr,h*t+.026]],j%2?'#b79a65':'#977748','wood',22,false)}
  for(let i=0;i<15;i++){const a=i*tau/15,cs=Math.cos(a),sn=Math.sin(a);rod([x+r*.82*cs,y+.025,z+r*.82*sn],[x+r*.99*cs,y+h-.011,z+r*.99*sn],.0055,'#d0ab73','wood',.006,5)}
  lathe(x,y+h-.015,z,[[r*.99,0],[r*1.02,.01],[r,.026],[r*.9,.026]],'#c3a171','wood',24);
  if(handles)for(const d of [-1,1])path([[x-.075,y+h,z+d*r*.9],[x-.056,y+h+.065,z+d*r*.97],[x+.058,y+h+.065,z+d*r*.97],[x+.075,y+h,z+d*r*.9]],.009,'#b59665','wood',12);
}
export function flask(x,y,z,r,h,col,label=null){
  lathe(x,y,z,[[r*.77,0],[r,.014],[r,h*.63],[r*.85,h*.72],[r*.45,h*.80],[r*.44,h*.91],[r*.51,h*.92],[r*.51,h*.97],[r*.39,h*.98]],col,'pottery',18);
  lathe(x,y+h*.958,z,[[r*.37,0],[r*.4,h*.095]],P.chestnut,'wood',13);
  if(label){box(x,y+h*.42,z+r*.997,r*1.32,h*.24,.005,'#ddcda5','matte',.001);print(label,x,y+h*.42,z+r+.0035,r*1.29,h*.21)}
}
export function lantern(x,y,z,sc=1){
  place(x,y,z,()=>{
    lathe(0,0,0,[[.085,0],[.108,.014],[.11,.037],[.085,.055],[.068,.083]],P.bronze,'metal',18);
    lathe(0,0,0,[[.06,.075],[.083,.12],[.07,.237],[.05,.26]],'#ffe3a4','lamp',16);
    for(const a of [0,pi/2,pi,pi*1.5])rod([.087*Math.cos(a),.045,.087*Math.sin(a)],[.077*Math.cos(a),.265,.077*Math.sin(a)],.006,P.iron);
    lathe(0,0,0,[[.085,.251],[.09,.265],[.065,.276],[.051,.291],[.042,.319],[.022,.322]],P.bronze,'metal',18);
    torus(0,.361,0,.048,.006,P.iron,'metal',18,5);
  },0,0,0,sc,sc,sc);
}