import { random } from './materials.js';
import { basket, book, compass, flask, framedMap, lantern, letter, mapMaterial, plant, pottery, standingBook } from './details.js';

const PI = Math.PI;
const H = [-PI/2,0,0];
const OFF = {cast:false};

export function study(b,m) {
  const art=mapMaterial();
  b.placed([5.640,0,-2.942],0,()=>{
    for(const x of [-.979,.986])for(const z of [-.303,.304])b.beam([x*1.014,.014,z*1.12],[x,.769,z],.078,.076,m.timber,{bevel:.009});
    b.round([0,.780,0],[2.144,.086,.824],m.timber,.022);
    for(let i=0;i<4;i++)b.round([0,.830,-.313+i*.207],[2.148,.043,.203],i%2?m.honey:m.trim,.008);
    b.round([0,.866,-.385],[2.166,.044,.065],m.beam,.010);
    b.round([0,.694,.335],[2.025,.134,.067],m.trim,.014);
    for(const [x,w] of [[-.627,.574],[.119,.737],[.737,.388]]){
      b.round([x,.695,.377],[w,.095,.038],m.timber,.010);
      b.torus([x,.706,.404],.033,.0055,m.bronze,{...OFF,sides:14});
    }
    b.round([0,.192,-.276],[1.985,.079,.069],m.beam,.011);
    b.placed([-.045,.856,.065],-.12,()=>{
      b.round([0,.003,0],[.582,.009,.409],m.leatherDark,.004,OFF);
      b.sheet(17,15,(u,v)=>[(.5-u)*.558,.014+.009*Math.pow(Math.abs(u-.50)*2,5)+.002*Math.sin(v*18),(.5-v)*.391],art,OFF);
      for(const z of [-.185,.194])b.cylinder([.014,.020,z],.021,.021,.517,m.paper,{...OFF,angles:[0,0,PI/2],segments:12});
    });
    for(let i=0;i<4;i++)b.round([-.721+i*.016,.857+i*.011,.046+i*.006],[.356,.009,.236],i%2?m.paper:m.stitch,.003,{...OFF,angles:[0,.21-i*.09,0]});
    letter(b,m,-.734,.902,.048,.18);
    compass(b,m,.425,.855,.203);
    b.round([.664,.863,.064],[.083,.021,.070],m.painted,.008,OFF);
    b.lathe([.664,.862,.063],[[0,0],[.040,0],[.048,.018],[.042,.050],[.026,.064],[.023,.089],[.026,.096],[.018,.096],[.015,.081],[0,.078]],m.blackIron,{...OFF,segments:16});
    b.rod([.662,.944,.067],[.765,1.135,.024],.0036,m.cord,OFF);
    b.profile([[0,0],[.032,.052],[.039,.122],[.022,.163],[.014,.111],[-.015,.060]],.003,m.linen,{pos:[.741,1.093,.028],angles:[0,0,-.48],cast:false});
    book(b,m,.745,.853,-.211,.334,.231,.052,m.bookblue,-.14);
    book(b,m,.748,.903,-.189,.288,.221,.066,m.booksage,.10);
    lantern(b,m,-.495,.852,-.246,1.05);
    pottery(b,m,-.878,.850,-.236,.068,.113,m.clay);
    plant(b,m,-.878,.949,-.236,.231,487);
    framedMap(b,m,.086,1.632,-.453,art,1.515,1.024);
    b.round([-.363,2.330,-.325],[1.296,.062,.355],m.trim,.012);
    for(const x of [-.843,.117])b.beam([x,2.130,-.437],[x,2.308,-.254],.057,.064,m.timber,{bevel:.007});
    flask(b,m,-.805,2.361,-.268);
    const cols=[m.booksage,m.booksienna,m.bookblue,m.bookbrick,m.leatherDark];
    for(const [i,x] of [[0,-.589],[1,-.498],[2,-.421],[3,-.341],[4,-.268]]){
      standingBook(b,m,x,2.362,-.330,.064,.225+(i%3)*.029,.182,cols[i],1,i===4?-.11:0);
    }
    pottery(b,m,.149,2.362,-.269,.100,.176,m.clay,'sealed');
    b.label([.02,1.625,-.409],'The Slatewater Road, marked by hand');
  });

  b.placed([5.788,0,-2.126],-.15,()=>{
    for(const x of [-.161,.161])for(const z of [-.158,.156])b.beam([x*1.24,.012,z*1.22],[x,.490,z],.052,.055,m.timber,{bevel:.009});
    for(const x of [-.186,.186])b.round([x,.177,0],[.039,.052,.386],m.trim,.008);
    b.round([0,.486,.013],[.440,.095,.421],m.trim,.019);
    b.round([0,.540,.013],[.395,.063,.368],m.ruby,.029);
    for(let i=0;i<3;i++)b.ellipsoid([-.105+i*.105,.574,.009],[.009,.003,.009],m.stitch,OFF);
  });

  b.placed([6.681,0,-1.236],-PI/2,()=>{
    const length=2.430;
    b.round([0,1.143,-.176],[length-.09,2.199,.089],m.beam,.014);
    for(let i=0;i<14;i++)b.box([-1.091+i*.168,1.168,-.120],[.162,2.15,.054],i%3?m.trim:m.timber,{grain:1});
    for(const x of [-1.200,1.200])b.round([x,1.183,.007],[.104,2.328,.390],m.timber,.016);
    for(const y of [.185,.675,1.211,1.691,2.183]){
      b.round([0,y,0],[length,.080,.403],m.timber,.014);
      b.round([0,y+.015,.207],[length+.019,.036,.027],m.wornEdge,.008,OFF);
    }
    b.round([0,2.322,-.008],[2.552,.166,.431],m.trim,.017);
    b.round([0,2.408,-.006],[2.588,.064,.48],m.beam,.012);
    const rng=random(763);
    const covers=[m.booksage,m.booksienna,m.bookblue,m.bookbrick,m.leatherDark,m.satchel,m.leather];
    for(const [x,y,n] of [[-.980,1.249,10],[.204,1.249,7],[-.973,1.728,8],[.135,.716,8]]){
      let dx=0;
      for(let i=0;i<n;i++){
        const w=.047+rng()*.068,h=.175+rng()*.189;
        const cover=covers[Math.floor(rng()*covers.length)];
        standingBook(b,m,x+dx,y,.039,w,h,.188+rng()*.065,cover,1,i===n-1?-.13:0);
        dx+=w+.010;
      }
    }
    for(let i=0;i<4;i++)book(b,m,.750,1.731+i*.039,.01,.317-(i%2)*.024,.184+(i%3)*.018,.041,covers[i],-.2+i*.10);
    for(const [x,z,r,h] of [[.04,.032,.072,.180],[.855,-.026,.095,.173],[.998,.013,.069,.120]])pottery(b,m,x,1.729,z,r,h,m.clay,'sealed');
    const roll=(x,y,z,th)=>{
      b.cylinder([x,y,z],.049,.049,.297,m.paper,{...OFF,segments:15,angles:[PI/2,0,th]});
      b.torus([x,y,z+.149],.035,.004,m.stitch,{...OFF,sides:16});
      b.torus([x,y,z+.151],.022,.0038,m.stitch,{...OFF,sides:13});
      b.torus([x,y,z+.012],.053,.006,m.cord,{...OFF,sides:14});
    };
    for(let i=0;i<4;i++)roll(-.977+i*.113,.756,.015,(i-1)*.065);
    roll(-.811,.828,.022,.08);
    b.round([-.796,.358,0],[.628,.270,.312],m.satchel,.043);
    b.round([-.797,.494,0],[.637,.123,.330],m.leather,.039);
    for(const x of [-.973,-.619]){
      b.round([x,.402,.172],[.052,.275,.022],m.leatherDark,.008);
      b.round([x,.507,0],[.056,.045,.352],m.leatherDark,.008);
      b.round([x,.384,.191],[.056,.048,.021],m.bronze,.004);
    }
    b.round([-.798,.442,.174],[.178,.069,.019],m.bronze,.007,OFF);
    basket(b,m,.653,.227,.027,.169,.238,'cloth');
    for(let i=0;i<5;i++)b.torus([-.051,.296+i*.019,.040],.143+(i%2)*.008,.012,m.cord,{...OFF,angles:[PI/2,i*.11,0],sides:20,segments:5});
    b.tube([[-.146,.336,.019],[-.184,.308,.169],[-.179,.285,.200],[-.049,.250,.232],[.023,.244,.206]],.009,m.cord,{...OFF,segments:16});
  });

  basket(b,m,6.230,0,-.036,.188,.319,'cloth');
  b.placed([5.379,0,.241],PI,()=>{
    b.round([0,1.837,.01],[.794,.118,.058],m.trim,.013);
    for(const x of [-.242,0,.242])b.tube([[x,1.754,.033],[x,1.735,.082],[x,1.768,.115],[x,1.827,.116]],.010,m.iron,{...OFF,segments:11});
    b.tube([[-.24,1.819,.111],[-.389,1.541,.128],[-.399,1.279,.160],[-.144,1.256,.145],[-.122,1.552,.141],[-.24,1.819,.111]],.016,m.leatherDark,{...OFF,segments:23});
    b.round([-.241,1.207,.178],[.314,.352,.146],m.satchel,.042);
    b.round([-.245,1.333,.251],[.307,.160,.050],m.leather,.026);
    for(const x of [-.33,-.154]){
      b.round([x,1.278,.285],[.032,.166,.019],m.leatherDark,.006);
      b.round([x,1.259,.301],[.035,.032,.013],m.bronze,.005,OFF);
    }
    b.torus([.176,1.628,.111],.117,.011,m.cord,{...OFF,sides:24,angles:[0,.26,.17]});
    b.torus([.176,1.611,.115],.103,.012,m.cord,{...OFF,sides:23,angles:[0,-.23,.20]});
  });
}

export function entranceBelongings(b,m){
  b.placed([-3.979,0,-1.955],PI/2,()=>{
    b.round([0,.214,.214],[1.074,.104,.391],m.timber,.016);
    for(const x of [-.43,.43]){
      b.round([x,.107,.211],[.139,.197,.332],m.timber,.015);
      b.round([x,1.576,.018],[.098,.258,.059],m.timber,.013);
    }
    b.round([0,1.673,.032],[1.072,.155,.092],m.trim,.018);
    for(const x of [-.392,-.134,.133,.392])b.tube([[x,1.657,.064],[x,1.635,.125],[x,1.659,.175],[x,1.718,.171]],.013,m.blackIron,{...OFF,segments:11});
    b.sheet(30,25,(u,v)=>{
      const w=.477+.101*v,fold=.067*Math.sin(u*PI*5+v*.7)*(v*.9+.25);
      return [(-.035+u-.5)*w+.119,1.698-v*(1.011+.064*Math.cos(u*13)),.186+fold+.018*v];
    },m.inkCloth,{...OFF,repeatX:1.3,repeatY:1.5});
    b.sheet(12,17,(u,v)=>[.359+(u-.5)*(.156+.045*v),1.718-v*.655+.018*Math.cos(u*11),.227+Math.sin(u*PI*3+v)*.036],m.ruby,{...OFF,repeatY:1.4});
    b.tube([[.329,1.681,.253],[.306,1.500,.256],[.321,1.330,.267],[.329,1.066,.254]],.0065,m.stitch,{...OFF,segments:19});
    for(const [x,z,ang] of [[-.240,.232,.19],[-.032,.230,-.13]])b.placed([x,.266,z],ang,()=>{
      b.round([0,.025,.024],[.147,.049,.247],m.leatherDark,.020,OFF);
      b.round([0,.068,.053],[.143,.104,.191],m.leather,.043,OFF);
      b.round([0,.135,-.041],[.128,.264,.131],m.leather,.034,OFF);
      b.round([0,.256,-.041],[.135,.035,.138],m.leatherDark,.017,OFF);
      for(let i=0;i<4;i++){
        b.rod([-.041,.098+i*.034,.063],[.046,.122+i*.034,.058],.0039,m.cord,OFF);
        b.rod([.041,.096+i*.034,.064],[-.047,.120+i*.034,.059],.0039,m.cord,OFF);
      }
      b.ellipsoid([0,.269,-.039],[.048,.005,.050],m.hearthVoid,OFF);
    });
    b.rod([.504,.012,.331],[.403,1.368,.166],.015,m.trim,{top:.017});
    b.rod([.407,1.345,.175],[.398,1.514,.157],.022,m.leatherDark,OFF);
    for(let i=0;i<5;i++)b.torus([.399,1.36+.027*i,.164],.022,.0032,m.cord,{...OFF,angles:H,sides:9});
  });
}
