import {zone,box,place,rod,beam,lathe,cylinder,ellipsoid,path,torus,face,grid,print,pi,tau} from './geometry.js';
import {P,rand,seeded} from './materials.js';
import {pin,handle,frame,basket,book,spool,pick} from './joinery.js';
import {fold,trunk,rolled} from './goods.js';
const rng=seeded(2091);
function crate(x,y,z,w,h,d,mark=false){
  place(x,y,z,()=>{
    const boards=['#9e7c50','#a9895c','#ae9064','#97754d'];
    box(0,.032,0,w,.063,d,P.walnut);
    for(const s of [-1,1]){
      for(let j=0;j<3;j++){
        box(0,.069+(j+.5)*(h-.071)/3,s*(d-.029)/2,w-.02,(h-.071)/3-.010,.034,pick(boards),'wood',.005);
        box(s*(w-.03)/2,.069+(j+.5)*(h-.071)/3,0,.034,(h-.071)/3-.009,d-.078,pick(boards),'wood',.005);
      }
      for(const k of [-1,1]){
        box(s*(w/2-.05),h/2,k*(d/2-.029),.060,h,.053,P.chestnut);
        for(const yy of [.064,h-.045])pin(s*(w/2-.05),yy,k*(d/2+.001),.010,P.iron);
      }
    }
    if(mark)print('stock',0,h*.54,d/2+.006,w*.33,.061);
  })
}
function campStock(){
  place(2.46,0,3.76,()=>{
    crate(0,.008,0,.862,.35,.512,true);
    for(let i=0;i<4;i++)box(-.323+i*.216,.363,0,.208,.037,.517,pick(['#b79669','#ae8c60','#b18f64']));
    basket(-.106,.383,.01,.215,.177,false);fold(-.11,.56,.005,.34,.264,.037,'#eee0bc','fabric3',.08);
    fold(-.118,.593,.003,.30,.232,.027,'#d4bd89');
    // A small ball of cord in an open canvas sack.
    ellipsoid(.232,.425,-.024,.083,.061,.069,'#c5ad7e','cloth',16,9);
    for(let j=-2;j<=2;j++)place(.232,.426,-.024,()=>torus(0,0,j*.020,.065*(1-.095*Math.abs(j)),.0025,'#a88f62','cloth',18,4),.14,.24,.22);
  },0,-.13);
  place(3.22,0,3.83,()=>{crate(0,.006,0,.497,.278,.426);for(let i=0;i<3;i++)rolled(-.139+i*.135,.046,.003,.057,.318+(i%2)*.071,i+1,.094*(i-1));},0,.14);
  // Folding X-stool with a slung leather seat.
  place(-.98,0,4.40,()=>{
    for(const s of [-1,1]){
      beam([-.209,.023,s*.148],[.188,.441,s*.148],.041,.036,P.oak);
      beam([.211,.023,s*.169],[-.190,.441,s*.169],.041,.036,P.chestnut);
      rod([0,.236,s*.128],[0,.236,s*.195],.022,P.brass,'metal',.022,10);
    }
    for(const xx of [-.19,.19])rod([xx,.432,-.208],[xx,.432,.208],.023,P.oak,'wood',.023,12);
    grid(9,4,(u,v)=>[(u-.5)*.394,.452-.069*Math.sin(pi*u)*(1-.20*Math.cos(tau*v)),(v-.5)*.379],P.leather,'leather',[1.9,1.8],true);
    for(const d of [-1,1])path(Array.from({length:12},(_,i)=>{const u=i/11;return [(u-.5)*.394,.452-.055*Math.sin(pi*u),d*.188]}),.0034,'#c4a27b','cloth',12,4);
  },0,-.224);
}
function dyeFire(){
  place(4.45,.004,-2.08,()=>{
    // Dyepot on the embers, away from the canvas and the living door.
    lathe(0,0,0,[[.475,0],[.447,.021],[.35,.026]],'#595445','earth',25);
    for(let i=0;i<10;i++){
      const a=i*tau/10+.04*rng(),r=.416+.022*rng();
      place(r*Math.cos(a),.047,r*Math.sin(a),()=>ellipsoid(0,0,0,.087+rng()*.04,.077,.119,pick(['#8a826e','#888673','#a39680','#747967']),'earth',9,5),0,-a,rng()*.2);
    }
    for(let i=0;i<7;i++){
      const a=i*1.74;rod([Math.cos(a)*.29,.051,Math.sin(a)*.29],[Math.cos(a+2.54)*.25,.081,Math.sin(a+2.54)*.25],.042,i%2?'#4c4539':'#5d5140','wood',.033,9);
    }
    for(let i=0;i<17;i++){const a=rng()*tau,r=rng()*.251;ellipsoid(Math.cos(a)*r,.071,Math.sin(a)*r,.026,.011,.019,i%3?'#9c6842':'#bf7846','matte',7,4)}
    for(let i=0;i<3;i++){const a=(i+.22)*tau/3;
      rod([Math.cos(a)*.507,.011,Math.sin(a)*.507],[Math.cos(a+pi)*.063,1.190+i*.026,Math.sin(a+pi)*.063],.025,'#787052','wood',.017,9);
    }
    for(let j=0;j<4;j++)place(0,1.040+j*.014,0,()=>torus(0,0,0,.056,.009,'#a18a62','cloth',18,5),pi/2);
    for(let j=0;j<7;j++)place(0,1.036-j*.039,0,()=>torus(0,0,0,.022,.0046,P.iron,'metal',12,5),0,j%2*pi/2,0,.67,1.18,1);
    path([[0,.802,0],[.025,.751,0],[.012,.724,0],[-.012,.736,0]],.006,P.iron,'metal',8);
    lathe(0,.162,0,[[.134,0],[.207,.044],[.249,.147],[.245,.252],[.215,.285],[.234,.301],[.234,.319],[.214,.325],[.204,.30]],'#755544','metal',27,false);
    cylinder(0,.455,0,.211,.003,'#6b5041','pottery',26);
    path([[-.231,.433,0],[-.205,.609,0],[-.051,.723,0],[.022,.731,0],[.197,.621,0],[.231,.433,0]],.009,P.iron,'metal',19,7);
    rod([-.11,.492,-.176],[.217,.654,.362],.014,P.walnut,'wood',.018,9);
    for(let i=0;i<9;i++){
      const xx=.14+i*.005;
      path([[xx,.468,.117],[xx+.02,.492,.184],[xx+.015,.453,.225],[xx-.011,.332,.234],[xx-.016,.310,.220],[xx-.004,.411,.215]],.0031,i%2?'#a96755':'#b2765c','cloth',13,4);
    }
  });
}
function herb(x,y,z,sc,flower=false){
  place(x,y,z,()=>{
    for(let j=0;j<(flower?4:7);j++){
      const a=j*2.38+rand()*.42,xx=Math.cos(a)*(.03+rand()*.084),zz=Math.sin(a)*.079,h=.14+rand()*.20;
      rod([0,0,0],[xx,h,zz],.0036,'#667347','matte',.0018,5);
      for(let k=0;k<5;k++){
        const t=.24+k*.128,side=k%2?1:-1,ax=xx*t,az=zz*t,b=a+side*1.23,ux=Math.cos(b),uz=Math.sin(b),l=flower?.049:.033;
        const tip=[ax+l*ux,h*t+.025,az+l*uz],wd=flower?.018:.010;
        face([[ax,h*t,az],[ax+l*.5*ux-wd*uz,h*t+.014,az+l*.5*uz+wd*ux],tip,[ax+l*.5*ux+wd*uz,h*t+.004,az+l*.5*uz-wd*ux]],pick(['#798952','#657d52','#82945b','#536c46']),'matte');
      }
      if(flower)for(let k=0;k<6;k++){const b=k*2.399;
        ellipsoid(xx+.016*Math.cos(b),h+.010*Math.sin(b),zz+.017*Math.sin(b),.013,.009,.013,j%2?'#b97666':'#ba6e5d','matte',7,4);}
    }
  },0,0,0,sc,sc,sc);
}
function windowGarden(){
  const z=1.57;
  for(const d of [-1,1]){
    const xx=-2.523+d*.46;beam([xx,1.477,1.463],[xx,1.655,1.672],.035,.039,P.iron,'metal');
    box(xx,1.558,1.462,.039,.204,.026,P.iron,'metal');
  }
  box(-2.52,1.676,z,1.207,.047,.237,P.oak);
  for(const zz of [-.109,.110])box(-2.52,1.744,z+zz,1.22,.119,.029,P.red,'paint');
  for(const xx of [-3.112,-1.929])box(xx,1.746,z,.033,.127,.231,P.red,'paint');
  box(-2.52,1.775,z,1.14,.028,.175,'#716149','earth');
  for(let i=0;i<7;i++)herb(-3.027+i*.167,1.787,z,.79+rand()*.18,i===0||i===2||i===5);
  // Rolled sun blind buckled above the living-room sash.
  rod([-3.224,2.740,1.502],[-1.826,2.740,1.502],.059,'#c9b284','cloth',.058,18);
  for(const xx of [-3.057,-1.990]){
    place(xx,2.741,1.502,()=>torus(0,0,0,.060,.010,P.leather,'leather',18,6),0,pi/2);
    box(xx,2.736,1.565,.035,.042,.009,P.brass,'metal');
  }
}
function keg(){
  place(-3.063,.303,-1.704,()=>{
    const r=.226,l=.73;
    // Long axis along the wagon, brass spigot on the exposed head.
    place(-l/2,0,0,()=>{
      lathe(0,0,0,[[r*.81,0],[r*.86,.045],[r*.96,l*.23],[r,l*.47],[r*.97,l*.73],[r*.83,l-.027],[r*.82,l]],'#9c7952','wood',23);
      for(const [yy,rr] of [[.048,r*.881],[.176,r*.968],[.548,r*.972],[.672,r*.874]])lathe(0,yy,0,[[rr,0],[rr,.025]],P.iron,'metal',23,false);
      lathe(0,.004,0,[[r*.73,0],[r*.73,.005]],P.oak,'wood',22);
    },0,0,-pi/2);
    rod([-.369,-.058,0],[-.427,-.058,0],.020,P.brass);
    rod([-.421,-.054,0],[-.421,-.095,0],.016,P.brass);rod([-.403,-.040,0],[-.403,-.009,0],.009,P.brass);
    rod([-.403,-.007,-.028],[-.403,-.007,.028],.007,P.brass);
    for(const s of [-1,1]){box(s*.235,-.222,0,.106,.110,.376,P.chestnut);beam([s*.235,-.231,-.175],[s*.235,-.09,-.20],.051,.049,P.walnut)}
  });
}
export function buildCamp(){zone('camp');campStock();dyeFire();zone('exteriorDetails');windowGarden();keg();}
