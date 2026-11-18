import { bed, hearth, rug, sitting } from './domestic.js';
import { entranceBelongings, study } from './study.js';
import { book, flask, lantern, plant, plate, pottery } from './details.js';

const PI=Math.PI;
const H=[-PI/2,0,0];
const OFF={cast:false};

function windowFurniture(b,m) {
  b.placed([-2.79,0,3.027],PI,()=>{
    for(const x of [-.818,.818])for(const z of [-.205,.217])b.beam([x,.025,z],[x*.979,.473,z],.078,.077,m.timber,{bevel:.008});
    b.round([0,.312,0],[1.793,.194,.510],m.timber,.018);
    b.round([0,.443,.002],[1.823,.085,.533],m.trim,.018);
    b.round([0,.514,.012],[1.661,.101,.466],m.terracotta,.042);
    for(const x of [-.565,0,.564]){
      b.round([x,.318,.274],[.492,.147,.016],m.trim,.007,OFF);
      b.round([x,.319,.286],[.441,.110,.011],m.timber,.005,OFF);
    }
    b.round([-.600,.645,-.071],[.420,.291,.126],m.duck,.060,{angles:[-.39,.04,-.18]});
    b.round([-.265,.622,-.010],[.299,.236,.107],m.blanket,.049,{angles:[-.36,-.12,.22]});
    book(b,m,.431,.567,.093,.257,.183,.049,m.bookbrick,-.34);
    book(b,m,.446,.612,.076,.213,.161,.045,m.booksage,.16);
    b.round([.691,.575,-.105],[.184,.058,.187],m.linen,.022,OFF);
  });
  pottery(b,m,-3.056,1.100,3.276,.084,.146,m.clay);
  plant(b,m,-3.056,1.229,3.276,.323,497,true);
  for(const [x,w] of [[-3.267,.332],[-2.142,.292]]){
    b.rod([x-w*.51,2.423,3.23],[x+w*.509,2.423,3.23],.013,m.bronze,OFF);
    b.sheet(21,17,(u,v)=>{
      const weight=.92+.08*Math.sin(u*4);
      return [x+(u-.5)*w*(1-v*.54),2.42-v*.915*weight,3.221+.057*(.7+v*.23)*Math.sin(u*PI*7)];
    },m.linen,{...OFF,flip:true,repeatX:.7,repeatY:1.31});
    for(let i=0;i<7;i++)b.torus([x-w*.47+i*w*.157,2.413,3.23],.023,.004,m.bronze,{...OFF,angles:[0,PI/2,0],sides:11});
    b.tube([[x-w*.098,1.674,3.23],[x-.052,1.564,3.198],[x+.050,1.598,3.224]],.006,m.cord,{...OFF,segments:9});
  }

  b.placed([2.675,0,3.086],PI,()=>{
    for(const x of [-.551,.551])for(const z of [-.221,.213])b.beam([x,.013,z],[x*.96,.837,z],.069,.074,m.painted,{bevel:.010});
    b.round([0,.795,0],[1.19,.169,.52],m.painted,.024);
    b.round([0,.891,0],[1.245,.082,.558],m.trim,.017);
    b.round([0,.264,0],[1.105,.057,.49],m.trim,.012);
    for(const x of [-.28,.28]){
      b.round([x,.791,.267],[.473,.104,.027],m.weather,.010);
      b.ellipsoid([x,.792,.286],[.023,.020,.016],m.bronze,OFF);
    }
    plate(b,m,-.101,.935,.027,.229,.119,m.crock);
    pottery(b,m,.328,.931,-.064,.111,.287,m.crock,'jug');
    b.round([-.435,.949,-.010],[.161,.039,.117],m.leafPale,.012,OFF);
    b.round([-.448,.968,-.008],[.102,.032,.078],m.linen,.012,OFF);
    b.round([-.242,.316,.042],[.283,.076,.274],m.linen,.024,OFF);
    b.round([-.262,.361,.05],[.284,.047,.264],m.fadedBlue,.023,OFF);
    pottery(b,m,.34,.295,-.017,.109,.151,m.clay,'sealed');
    b.rod([.491,.636,.290],[.084,.637,.290],.013,m.bronze,OFF);
    b.sheet(18,12,(u,v)=>[.28+(u-.5)*.263,.651-v*.320+.013*Math.sin(u*19)*v,.289+.033*Math.sin(u*18)*(.46+.49*v)],m.linen,OFF);
  });
  for(const [x,r,h] of [[2.282,.056,.097],[2.121,.073,.126],[2.454,.046,.076]]){
    pottery(b,m,x,1.115,3.221,r,h,m.clay);
    plant(b,m,x,1.115+h*.87,3.221,.16+h*1.15,Math.round(x*921),x>2.3);
  }
}

function sideboard(b,m) {
  b.placed([3.665,0,1.65],-PI/2,()=>{
    b.round([0,.498,-.107],[1.263,.887,.437],m.timber,.023);
    b.round([0,.936,.007],[1.345,.075,.598],m.trim,.020);
    b.round([0,.151,.001],[1.325,.089,.538],m.beam,.014);
    for(const x of [-.608,0,.606])b.round([x,.558,.228],[.077,.718,.101],m.trim,.013);
    for(const x of [-.305,.305]){
      b.round([x,.550,.261],[.514,.631,.058],m.painted,.014);
      b.round([x,.543,.297],[.411,.496,.016],m.weather,.008,OFF);
      b.round([x,.542,.311],[.371,.456,.013],m.painted,.006,OFF);
      b.torus([x+(x>0?-.14:.14),.603,.335],.034,.006,m.bronze,{sides:14});
    }
    b.round([-.278,.990,.042],[.458,.025,.291],m.honey,.012,{...OFF,angles:[0,-.15,0]});
    b.ellipsoid([-.283,1.059,.030],[.167,.068,.092],m.quilt,{...OFF,angles:[0,.26,0]});
    for(let i=0;i<4;i++){
      const x=-.36+i*.055;
      b.tube([[x,1.096,-.026],[x-.017,1.12,.018],[x+.014,1.113,.069]],.0034,m.linen,{...OFF,segments:7});
    }
    b.profile([[0,0],[.136,0],[.124,.073],[.093,.086],[.009,.069]],.083,m.crock,{pos:[-.044,1.004,.045],angles:[0,.29,0],bevel:.004,cast:false});
    pottery(b,m,.348,.978,-.093,.110,.242,m.clay,'sealed');
    flask(b,m,.452,.978,.148);
    b.round([0,1.804,-.104],[1.309,.065,.315],m.trim,.011);
    b.round([0,1.627,-.236],[1.346,.318,.055],m.timber,.016);
    for(const x of [-.542,.545])b.profile([[-.028,0],[.028,0],[.059,.159],[.170,.239],[-.025,.239]],.056,m.beam,{pos:[x,1.54,-.248],angles:[0,-PI/2,0],bevel:.006});
    for(const [x,r,h,clay] of [[-.456,.090,.190,m.crock],[-.224,.086,.148,m.clay],[.002,.074,.217,m.painted],[.397,.106,.173,m.crock]]){
      pottery(b,m,x,1.839,-.08,r,h,clay,'sealed');
    }
    b.rod([-.324,1.494,-.086],[.296,1.494,-.086],.012,m.bronze);
    for(const x of [-.238,-.035,.201]){
      b.torus([x,1.475,-.084],.028,.006,m.blackIron,{...OFF,sides:14,angles:[0,PI/2,0]});
      if(x<.1){
        b.rod([x,1.266,-.076],[x,1.465,-.074],.007,m.trim,OFF);
        b.ellipsoid([x,1.235,-.073],[.024,.046,.012],m.trim,OFF);
      }else b.torus([x,1.402,-.065],.069,.009,m.pewter,{sides:19});
    }
  });
}

function balconyLife(b,m) {
  b.placed([2.583,0,5.078],PI,()=>{
    for(const x of [-.639,.639]){
      for(const z of [-.118,.125])b.beam([x,.009,z],[x,.431,z],.07,.073,m.timber,{bevel:.009});
      b.round([x,.358,.002],[.079,.072,.405],m.beam,.013);
    }
    for(let i=0;i<4;i++)b.round([0,.439,-.159+i*.103],[1.520,.072,.098],i%2?m.weather:m.trim,.011);
    b.round([.342,.492,-.026],[.542,.060,.327],m.fadedBlue,.024,{...OFF,angles:[.013,.12,-.03]});
    b.round([.373,.520,-.005],[.513,.047,.294],m.inkCloth,.020,{...OFF,angles:[.006,.12,-.049]});
    book(b,m,-.455,.477,.012,.247,.179,.049,m.booksienna,.20);
  });
  for(const [x,count] of [[-2.775,4],[-.616,3]]){
    const w=count===4?1.385:.937;
    b.round([x,.689,5.318],[w,.047,.298],m.timber,.010);
    for(const s of [-1,1]){
      b.round([x+s*(w/2-.020),.807,5.319],[.039,.233,.295],m.timber,.007);
      b.round([x,.806,5.318+s*.133],[w,.233,.034],m.timber,.008);
      b.round([x+s*(w/2-.003),.923,5.315],[.043,.036,.328],m.weather,.008);
      b.round([x,.923,5.315+s*.145],[w+.026,.036,.040],m.weather,.008);
    }
    for(let i=0;i<4;i++)b.round([x,.716+i*.049,5.154],[w,.041,.027],i%2?m.weather:m.trim,.006,OFF);
    b.round([x,.858,5.306],[w-.078,.116,.226],m.soil,.011,OFF);
    for(let i=0;i<count;i++){
      const offset=((i+.5)/count-.5)*(w-.069);
      plant(b,m,x+offset,.916,5.309,.355+i%3*.078,1097+i*37+Math.round(x*47),true);
    }
    for(const s of [-1,1])b.round([x+s*(w*.358),.799,5.147],[.041,.31,.019],m.blackIron,.005,OFF);
  }
  lantern(b,m,-1.72,2.038,4.048,.90,9);
  pottery(b,m,-3.306,.008,4.002,.144,.248,m.clay,'jug');
  pottery(b,m,-3.37,.011,4.594,.199,.280,m.clay);
  plant(b,m,-3.37,.252,4.594,.55,1963);
  b.placed([2.98,2.253,3.651],0,()=>{
    b.rod([-.336,.177,0],[.336,.177,0],.012,m.iron,OFF);
    for(const [i,x] of [[0,-.231],[1,.002],[2,.212]]){
      b.rod([x,.177,0],[x,0,.024],.0045,m.cord,OFF);
      for(let j=0;j<8;j++){
        const spread=(j-3.5)*.013,dy=.17+(j%3)*.04;
        b.rod([x,0,.024],[x+spread,-dy,.029+Math.sin(j)*.031],.0034,m.cord,OFF);
        for(let k=0;k<4;k++)b.ellipsoid([x+spread*(k+1)/4,-dy*(k+1)/4,.029+Math.sin(j)*.031*(k+1)/4],[.010,.024,.009],i===2?m.violet:m.leafPale,{...OFF,angles:[.1,.2,spread*9]});
      }
      b.torus([x,-.034,.025],.020,.004,m.cord,{...OFF,angles:H,sides:10});
    }
  });
}

export function buildFurnishings(b,m){
  rug(b,m,.231,1.422,2.936,3.118,-.041);
  rug(b,m,-2.783,1.161,1.546,2.171,-.193,true);
  rug(b,m,5.283,-1.369,.909,1.322,.069,true);
  bed(b,m);
  hearth(b,m);
  sitting(b,m);
  windowFurniture(b,m);
  sideboard(b,m);
  study(b,m);
  entranceBelongings(b,m);
  balconyLife(b,m);
}
