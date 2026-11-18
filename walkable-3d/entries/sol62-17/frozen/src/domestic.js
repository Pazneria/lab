import * as T from '../vendor/three.module.min.js';
import { random, rugMaterial } from './materials.js';
import { basket, book, candle, portrait, portraitMaterial, pottery, shieldMaterial, tea, plate } from './details.js';

const PI = Math.PI;
const H = [-PI / 2, 0, 0];
const OFF = { cast: false };
const pick = (rng, values) => values[Math.floor(rng() * values.length)];

export function rug(b,m,x,z,w,d,yaw,small=false) {
  const rng=random(small?897:246);
  const art=rugMaterial(small);
  b.placed([x,0,z],yaw,()=>{
    b.round([0,.005,0],[w,.011,d],m.leatherDark,.004,OFF);
    b.sheet(25,25,(u,v)=>[(u-.5)*w,.011+.006*(1+Math.sin(u*19+v*6))*Math.pow(Math.abs(v-.5)*2,9),(v-.5)*d],art,OFF);
    const count=small?54:96;
    for(const end of [-1,1])for(let i=0;i<count;i++){
      const xx=(i/(count-1)-.5)*w*.991, zz=end*(d/2-.008);
      b.rod([xx,.015,zz],[xx+(rng()-.5)*.021,.006,zz+end*(.030+rng()*.046)],.0032,i%3?m.stitch:m.linen,{...OFF,segments:4});
    }
  });
}

function pillow(b,m,x,y,z,w,d,color,yaw=0){
  b.placed([x,y,z],yaw,()=>{
    b.round([0,0,0],[w,.152,d],color,.070,{angles:[-.14,0,.025]});
    const a=w*.472,c=d*.449;
    b.tube([[-a,.017,-c*.77],[-a*.76,.011,-c],[a*.77,.020,-c],[a,.025,-c*.72],[a,.021,c*.68],[a*.71,.001,c],[-a*.77,.012,c],[-a,.019,c*.71]],.0037,m.stitch,{...OFF,closed:true,segments:23});
  });
}

export function bed(b,m){
  b.placed([.72,0,-2.24],0,()=>{
    b.round([0,.354,0],[1.57,.202,2.155],m.timber,.025);
    b.round([0,.475,0],[1.60,.083,2.185],m.trim,.015);
    for(const xx of [-.788,.788]){
      for(const zz of [-1.018,1.013]){
        const h=zz<0?1.315:.73;
        b.lathe([xx,0,zz],[[0,0],[.058,0],[.072,.026],[.067,.078],[.054,.147],[.044,h*.43],[.065,h*.48],[.060,h*.52],[.053,h*.56],[.051,h*.82],[.067,h*.84],[.070,h*.881],[.047,h*.91],[.059,h*.951],[.043,h*.987],[0,h]],m.timber,{segments:14});
        b.torus([xx,h*.845,zz],.062,.0065,m.trim,{angles:H,sides:14,segments:5});
      }
      b.round([xx,.39,0],[.087,.16,2.04],m.timber,.013);
      b.round([xx,.465,0],[.102,.024,2.02],m.wornEdge,.006,OFF);
    }
    b.profile([[-.755,.42],[-.755,1.12],[-.61,1.17],[-.4,1.15],[-.16,1.209],[0,1.267],[.16,1.209],[.4,1.15],[.61,1.17],[.755,1.12],[.755,.42]],.078,m.timber,{pos:[0,0,-1.041],bevel:.014});
    b.tube([[-.714,1.113,-.953],[-.57,1.143,-.947],[-.35,1.133,-.946],[-.16,1.183,-.949],[0,1.228,-.947],[.16,1.183,-.949],[.35,1.133,-.946],[.57,1.143,-.947],[.715,1.113,-.953]],.012,m.wornEdge,{...OFF,segments:27});
    for(const xx of [-.48,0,.48]){
      b.round([xx,.925,-.951],[.345,.345,.035],m.trim,.015,OFF);
      b.round([xx,.926,-.926],[.296,.295,.02],m.timber,.008,OFF);
      b.torus([xx,.926,-.912],.047,.007,m.wornEdge,{...OFF,sides:14,segments:6});
    }
    b.round([0,.577,.009],[1.52,.224,2.025],m.linen,.078);
    b.round([0,.667,-.005],[1.51,.095,2.036],m.pale,.046);
    b.tube([[-.724,.639,-.915],[-.746,.634,-.70],[-.751,.637,.66],[-.713,.632,.973],[.717,.632,.973],[.751,.637,.66],[.746,.634,-.70],[.724,.639,-.915]],.006,m.stitch,{...OFF,closed:true,segments:37});
    pillow(b,m,-.379,.764,-.685,.673,.46,m.pale,.09);
    pillow(b,m,.375,.761,-.711,.663,.42,m.linen,-.11);
    pillow(b,m,.385,.82,-.56,.405,.29,m.ruby,.16);
    const fabricY=(x,z)=>{
      const bend=Math.pow(Math.max(0,(Math.abs(x)-.741)/.086),1.5)*.242;
      const end=Math.pow(Math.max(0,(z-.967)/.187),1.73)*.232;
      const pleat=(.013+bend*.066+end*.098)*Math.sin(x*25+z*4.9)+.009*Math.sin(x*43-z*7.4)+.012*Math.cos(z*14+x*4);
      return .748+pleat-Math.max(bend,end)-Math.min(bend,end)*.55;
    };
    const fabric=(u,v)=>{
      const z=-.466+v*1.62+.015*Math.sin(u*15);
      const x=(u-.5)*(1.642-.02*Math.sin(z*10));
      return [x,fabricY(x,z),z];
    };
    b.sheet(40,37,fabric,m.blanket,{repeatX:2.62,repeatY:3});
    for(const [z,width,color] of [[-.392,.177,m.duck],[-.317,.022,m.stitch],[.611,.035,m.stitch],[.691,.123,m.duck],[.770,.023,m.stitch],[.910,.105,m.quilt],[1.016,.031,m.stitch]]){
      b.sheet(40,5,(u,v)=>{
        const zz=z+(v-.5)*width+.008*Math.sin(u*15), x=(u-.5)*1.647;
        return [x,fabricY(x,zz)+.008,zz];
      },color,{...OFF,repeatX:2.6});
    }
    b.tube(Array.from({length:26},(_,i)=>{
      const [x,y,z]=fabric(i/25,1);return [x,y+.002,z+.004];
    }),.0067,m.duck,{...OFF,segments:39});
    for(let i=0;i<38;i++){
      const [x,y,z]=fabric((i+.3)/38,1);
      b.rod([x,y,z],[x+.009*Math.sin(i),y-.041-(i%5)*.004,z+.013],.0036,i%3?m.stitch:m.duck,{...OFF,segments:4});
    }
    b.round([-.39,.751,-.478],[.55,.038,.134],m.pale,.013,{...OFF,angles:[.06,.15,0]});
  });

  b.placed([.71,0,-.817],0,()=>{
    b.round([0,.187,0],[1.24,.356,.414],m.timber,.021);
    b.round([0,.382,0],[1.275,.095,.443],m.trim,.021);
    b.round([0,.408,0],[1.222,.058,.402],m.honey,.019);
    b.box([0,.324,.211],[1.169,.011,.006],m.beam,OFF);
    for(const x of [-.47,.47]){
      b.round([x,.369,0],[.061,.062,.456],m.blackIron,.008);
      b.round([x,.235,.215],[.064,.31,.017],m.blackIron,.006);
      for(let i=0;i<4;i++) b.ellipsoid([x,.101+i*.063,.228],[.0095,.0095,.005],m.bronze,OFF);
    }
    b.round([0,.317,.226],[.14,.127,.03],m.bronze,.009);
    b.ellipsoid([0,.313,.244],[.009,.016,.002],m.hearthVoid,OFF);
    for(const x of [-.49,.49])for(const z of [-.135,.135])b.round([x,.027,z],[.147,.048,.113],m.beam,.009,OFF);
    b.round([.31,.455,-.033],[.376,.060,.27],m.terracotta,.028,{...OFF,angles:[.01,-.17,.02]});
    b.round([.28,.480,-.029],[.356,.042,.245],m.ruby,.016,{...OFF,angles:[.01,-.17,-.02]});
  });

  b.placed([2.00,0,-3.07],0,()=>{
    for(const x of [-.252,.252])for(const z of [-.194,.194])b.beam([x,.012,z],[x*.95,.61,z*.95],.052,.055,m.timber);
    b.round([0,.575,0],[.600,.071,.522],m.trim,.015);
    b.round([0,.442,.021],[.516,.145,.47],m.timber,.012);
    b.round([0,.444,.266],[.438,.095,.023],m.honey,.008);
    b.ellipsoid([0,.444,.284],[.027,.021,.015],m.bronze,OFF);
    b.round([0,.193,0],[.496,.043,.389],m.trim,.009,OFF);
    pottery(b,m,-.13,.611,-.04,.085,.213,m.crock,'jug');
    plate(b,m,.116,.613,.065,.081,.028,m.clay);
    candle(b,m,.116,.627,.064,.135,.022);
    book(b,m,-.054,.219,0,.246,.188,.042,m.bookblue,.13);
  });

  b.rod([.155,2.476,-3.328],[1.448,2.476,-3.328],.021,m.stave);
  b.ellipsoid([.140,2.476,-3.328],[.031,.036,.031],m.bronze,OFF);
  b.ellipsoid([1.462,2.476,-3.328],[.031,.036,.031],m.bronze,OFF);
  for(const x of [.304,.553,.797,1.042,1.294])b.torus([x,2.466,-3.324],.032,.006,m.cord,{...OFF,sides:12,angles:[0,PI/2,0]});
  b.sheet(23,20,(u,v)=>[.275+u*1.058,2.439-v*1.194-.021*Math.cos(u*14)*v,-3.308+.029*Math.sin(u*17+v*.54)],rugMaterial(true),OFF);
  for(let i=0;i<29;i++){
    const u=i/28,x=.275+u*1.058,z=-3.308+.029*Math.sin(u*17+.54),y=1.245-.021*Math.cos(u*14);
    b.rod([x,y,z],[x+.006*Math.sin(i),y-.065-(i%3)*.009,z+.004],.0038,i%4?m.stitch:m.blanket,OFF);
  }
}

export function hearth(b,m){
  const rng=random(417);
  b.placed([-4.003,0,-.199],PI/2,()=>{
    b.round([0,.061,.340],[1.74,.116,.731],m.stoneDark,.021);
    b.round([0,.125,.349],[1.71,.040,.716],m.stonePale,.012);
    b.box([0,.690,.055],[1.56,1.14,.18],m.hearthVoid);
    for(const side of [-1,1])for(let j=0;j<5;j++){
      const x=side*(.602+.012*(j%3)),y=.229+j*.169,w=.394+.023*(j%2);
      b.round([x,y,.271],[w,.159,.444],pick(rng,[m.stone,m.stone,m.stonePale,m.stoneDark]),.025);
      b.round([x+side*.13,y+.024,.503],[.147,.051,.024],m.stonePale,.009,OFF);
    }
    const c=.677,outside=.630,inside=.393;
    for(let i=0;i<9;i++){
      const a=i*PI/9+.018,d=(i+1)*PI/9-.018,t=(a+d)/2;
      const q=[[Math.cos(a)*inside,c+Math.sin(a)*inside],[Math.cos(a)*outside,c+Math.sin(a)*outside],[Math.cos(t)*outside*1.014,c+Math.sin(t)*outside*1.014],[Math.cos(d)*outside,c+Math.sin(d)*outside],[Math.cos(d)*inside,c+Math.sin(d)*inside]];
      b.profile(q,.447,i===4?m.stonePale:pick(rng,[m.stone,m.stone,m.stonePale]),{pos:[0,0,.056],bevel:.009});
    }
    b.round([0,1.294,.26],[1.73,.123,.627],m.stoneDark,.026);
    b.round([0,1.365,.271],[1.84,.071,.653],m.stonePale,.017);
    b.box([0,1.984,.094],[1.36,1.224,.271],m.westWall,{repeat:.68});
    for(const side of [-1,1])b.round([side*.674,1.985,.217],[.08,1.22,.10],m.timber,.012);
    for(let row=0;row<5;row++)for(let col=0;col<4;col++){
      const xx=(col-1.5)*.209+(row%2)*.059;
      b.round([xx,.235+row*.102,.153],[.194,.09,.034],row>2?m.stoneDark:m.clay,.014,OFF);
    }
    b.round([0,.157,.313],[.791,.055,.433],m.stoneDark,.013);
    for(const x of [-.298,.300]){
      b.rod([x,.164,.245],[x,.311,.485],.019,m.blackIron);
      b.ellipsoid([x,.318,.488],[.025,.044,.025],m.iron,OFF);
    }
    b.rod([-.318,.199,.475],[.320,.199,.475],.016,m.blackIron);
    for(let i=0;i<7;i++)b.rod([-.244+i*.082,.196,.244],[-.244+i*.082,.195,.467],.010,m.blackIron,OFF);
    for(const [a,c] of [[[-.249,.244,.398],[.202,.285,.312]],[[.233,.243,.418],[-.206,.285,.276]],[[-.11,.203,.240],[.157,.272,.454]]]){
      b.rod(a,c,.043,m.beam,{top:.037,segments:9});
      b.ellipsoid([a[0],a[1],a[2]],[.032,.034,.031],m.stoneDark,OFF);
      b.rod([a[0],a[1]+.034,a[2]],[c[0],c[1]+.03,c[2]],.007,m.ember,OFF);
    }
    for(let i=0;i<20;i++){
      const x=(rng()-.5)*.61,y=.218+rng()*.068,z=.238+rng()*.212;
      b.ellipsoid([x,y,z],[.017+rng()*.016,.008+rng()*.012,.015+rng()*.013],i%4===0?m.fire:i%3===0?m.stoneDark:m.ember,OFF);
    }
    for(const [i,x,w,h] of [[0,-.487,.222,.296],[1,-.177,.287,.376],[2,.172,.208,.278]]){
      portrait(b,m,x,1.411+h/2,.374,w,h,portraitMaterial(i));
      b.beam([x,1.432,.354],[x,1.611,.257],.03,.023,m.timber,OFF);
    }
    b.cylinder([.484,1.408,.345],.078,.068,.026,m.bronze,{...OFF,segments:17});
    b.lathe([.484,1.415,.345],[[.045,0],[.031,.023],[.020,.061],[.032,.098],[.048,.113],[.048,.122],[.018,.125]],m.bronze,OFF);
    candle(b,m,.484,1.530,.345,.152,.022);
    candle(b,m,.675,1.400,.301,.095,.023);
    b.round([0,2.455,.252],[1.29,.098,.125],m.trim,.013);
    b.round([0,2.584,.184],[1.62,.159,.321],m.beam,.019);
    b.torus([.021,2.184,.256],.139,.018,m.iron,{sides:23});
    b.torus([.021,2.184,.277],.096,.009,m.bronze,{sides:21});
    for(let i=0;i<4;i++){
      const a=PI*i/2+.3;
      b.rod([.021+Math.cos(a)*.067,2.184+Math.sin(a)*.067,.278],[.021+Math.cos(a)*.141,2.184+Math.sin(a)*.141,.271],.008,m.blackIron,OFF);
    }
    b.label([-.18,1.60,.41],'The companions who made it home');
  });

  b.placed([-3.82,0,.799],PI/2,()=>{
    b.cylinder([0,.031,0],.159,.177,.051,m.blackIron,{segments:14});
    for(const x of [-.089,.092]){
      b.rod([x,.04,0],[x+.046,.735,.033],.011,m.blackIron);
      b.torus([x+.046,.741,.032],.031,.008,m.iron,{sides:13});
    }
    b.rod([.095,.07,.09],[-.07,.644,.084],.010,m.iron);
    b.round([.073,.082,.089],[.086,.125,.016],m.blackIron,.007,{angles:[0,.1,.21]});
  });
}

export function sitting(b,m){
  b.placed([-2.75,0,1.615],2.23,()=>{
    for(const x of [-.355,.355])for(const z of [-.337,.327])b.beam([x*1.09,.012,z*1.10],[x,.402,z],.063,.061,m.timber,{bevel:.009});
    b.round([0,.363,0],[.817,.116,.813],m.timber,.024);
    b.round([0,.430,.027],[.783,.137,.749],m.duck,.043);
    b.round([0,.483,.066],[.625,.106,.620],m.duck,.043,{angles:[-.075,.019,.03]});
    b.tube([[-.29,.488,.302],[-.27,.476,.366],[.212,.484,.371],[.301,.485,.297]],.006,m.stitch,{...OFF,segments:14});
    b.round([0,.791,-.323],[.773,.663,.138],m.timber,.043,{angles:[-.155,0,0]});
    b.round([0,.811,-.245],[.684,.605,.137],m.duck,.064,{angles:[-.155,0,0]});
    for(const x of [-.175,0,.175]){
      b.ellipsoid([x,.815,-.176],[.013,.012,.007],m.leatherDark,OFF);
      b.ellipsoid([x,.817,-.171],[.006,.006,.004],m.bronze,OFF);
    }
    b.tube([[-.280,.568,-.194],[-.331,.665,-.190],[-.324,1.024,-.242],[-.244,1.086,-.253],[.243,1.087,-.252],[.325,1.009,-.239],[.329,.661,-.189],[.28,.567,-.192]],.0048,m.stitch,{...OFF,closed:true,segments:38});
    for(const s of [-1,1]){
      b.beam([s*.365,.389,.282],[s*.416,.672,.253],.063,.063,m.timber,{bevel:.011});
      b.beam([s*.354,.502,-.315],[s*.405,.679,-.278],.066,.071,m.timber,{bevel:.009});
      b.round([s*.414,.684,.016],[.144,.130,.696],m.leather,.048,{angles:[-.022,0,-s*.059]});
      b.tube([[s*.481,.680,-.239],[s*.490,.686,-.087],[s*.485,.679,.108],[s*.472,.675,.304]],.0046,m.stitch,{...OFF,segments:17});
      for(let i=0;i<10;i++)b.ellipsoid([s*.485,.676,-.213+i*.051],[.0034,.007,.0067],m.bronze,OFF);
    }
    b.round([.068,.647,-.132],[.338,.291,.120],m.ruby,.057,{angles:[-.27,.12,-.22]});
    b.tube([[-.10,.566,-.061],[-.11,.695,-.091],[-.04,.795,-.122],[.191,.761,-.112],[.240,.710,-.079],[.186,.538,-.050]],.0041,m.stitch,{...OFF,segments:20});
    b.sheet(20,12,(u,v)=>{
      const x=-.594+u*.427,z=.055+(v-.5)*.319;
      const drop=Math.pow(Math.max(0,Math.abs(x+.429)-.065)*7,1.37)*.24;
      return [x,.770-drop+.013*Math.sin(v*21+u*3),z+.009*Math.sin(u*17)];
    },m.terracotta,{repeatX:1.1,repeatY:1.1});
    for(let i=0;i<13;i++){
      const v=i/12,z=.055+(v-.5)*.319,y=.770-Math.pow((.165-.065)*7,1.37)*.24+.013*Math.sin(v*21);
      b.rod([-.594,y,z],[-.601,y-.038,z+(i%3)*.003],.0036,m.stitch,{...OFF,segments:5});
    }
  });

  b.placed([-1.840,0,.550],-.21,()=>{
    b.lathe([0,0,0],[[0,0],[.081,0],[.091,.045],[.079,.086],[.061,.163],[.050,.279],[.074,.335],[.057,.351],[.062,.415],[.077,.471],[.055,.489],[.095,.566],[.09,.576],[0,.590]],m.timber,{segments:15});
    for(let i=0;i<3;i++)b.placed([0,0,0],i*PI*2/3,()=>{
      b.profile([[0,.050],[.082,.088],[.164,.101],[.309,.092],[.353,.047],[.364,.018],[.332,.011],[.295,.038],[.184,.052],[.074,.048],[0,.029]],.054,m.timber,{pos:[0,0,-.027],bevel:.008});
      b.beam([.053,.183,0],[.289,.078,0],.041,.047,m.trim,{bevel:.008});
    });
    for(const xx of [-.284,.284]){
      b.round([xx,.548,0],[.059,.056,.736],m.timber,.010);
      b.tube([[xx,.595,-.265],[xx-.005,.515,-.145],[xx,.480,-.013],[xx+.010,.505,.113],[xx,.595,.234]],.025,m.leatherDark,{segments:16});
      b.round([xx,.591,.232],[.087,.023,.099],m.iron,.008,OFF);
      b.ellipsoid([xx,.590,.253],[.012,.005,.012],m.bronze,OFF);
    }
    b.lathe([0,0,0],[[0,.554],[.13,.556],[.295,.577],[.452,.601],[.497,.607],[.514,.617],[.514,.648],[.500,.659],[.475,.651],[0,.650]],m.trim,{segments:44});
    const face=new T.CircleGeometry(.501,52);
    b.add(face,shieldMaterial(),[0,.653,0],null,{angles:H,cast:false});
    face.dispose();
    b.torus([0,.638,0],.512,.0145,m.bronze,{angles:H,sides:52});
    b.torus([0,.657,0],.500,.0069,m.brass,{...OFF,angles:H,sides:52});
    b.torus([0,.651,0],.469,.0044,m.blackIron,{...OFF,angles:H,sides:46});
    for(let i=0;i<22;i++){
      const a=i*2*PI/22,r=.501+Math.sin(i*8)*.002;
      b.ellipsoid([Math.cos(a)*r,.665,Math.sin(a)*r],[.010,.008,.011],i%4?m.bronze:m.iron,OFF);
    }
    b.lathe([0,.651,0],[[.104,0],[.104,.013],[.086,.019],[.070,.032],[.052,.060],[.032,.072],[.014,.076],[0,.077]],m.iron,{segments:30});
    b.torus([0,.662,0],.098,.0057,m.bronze,{...OFF,angles:H});
    for(let i=0;i<6;i++){
      const a=i*PI/3;
      b.ellipsoid([Math.cos(a)*.087,.672,Math.sin(a)*.087],[.008,.006,.008],m.bronze,OFF);
    }
    tea(b,m);
    b.label([-.012,.686,-.015],'Mara’s trail shield, now the tea table');
  });
  basket(b,m,-3.62,0,2.292,.226,.263,'wool');
  book(b,m,-3.30,.012,2.484,.245,.181,.065,m.booksienna,-.27);
}
