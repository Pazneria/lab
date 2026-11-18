'use strict';
const Cabin=(()=>{
 const {mat,tint,group,box,cyl,ringX,beam,quad,tri,pipe,sub,add,mul,unit,cross,len,mix,vertex,indices}=G;
 const {bolt,sign}=Station,X=[1,0,0],Y=[0,1,0],Z=[0,0,1],nz=[0,0,-1],tau=Math.PI*2;
 const cx=-1.55,cz=-6.08,hx=1.59,hz=2.51;
 const poly=[[hx-.38,hz],[-hx+.38,hz],[-hx,hz-.48],[-hx,-hz+.48],[-hx+.38,-hz],[hx-.38,-hz],[hx,-hz+.48],[hx,hz-.48]];
 const oxide=mat('#a74632',10),brushed=mat('#bfc5bc',2),roof=mat('#bdc4b8',2),trim=mat('#3c4543',7),seat=mat('#446157',1),upholstery=mat('#57736a',7);
 const profile=[[-.46,.15],[-.33,.12],[-.05,.030],[.69,0],[.83,0],[2.28,.091],[2.49,.115],[2.58,.14],[2.70,.25]];
 function offset(y){for(let i=1;i<profile.length;i++)if(y<=profile[i][0])return profile[i-1][1]+(profile[i][1]-profile[i-1][1])*(y-profile[i-1][0])/(profile[i][0]-profile[i-1][0]);return .25}
 function corner(i,y,custom){const [x,z]=poly[i%8],d=custom===undefined?offset(y):custom;return [cx+x*(hx-d)/hx,y,cz+z*(hz-d)/hz]}
 function faceN(i){const a=poly[i],b=poly[(i+1)%8];return unit([b[1]-a[1],0,a[0]-b[0]])}
 function at(i,t,y,extra=0){return add(mix(corner(i,y),corner(i+1,y),t),mul(faceN(i),extra))}
 function skin(i,t0,t1,lo,hi,m,extra=0){quad(at(i,t1,lo,extra),at(i,t0,lo,extra),at(i,t0,hi,extra),at(i,t1,hi,extra),m,undefined,faceN(i))}
 function loopBand(lo,hi,m,extra=0){for(let i=0;i<8;i++)skin(i,0,1,lo,hi,m,extra)}
 function flat(y,m,d){const ctr=[cx,y,cz];for(let i=0;i<8;i++)tri(ctr,corner(i+1,y,d),corner(i,y,d),m)}
 function rivet(i,t,y,size=.018){const p=at(i,t,y,.012),n=faceN(i);cyl(p,add(p,mul(n,.014)),size,brushed,8)}
 function pane(i,a,b,bot=.88,top=2.26,heavy=false){
 const L=len(sub(at(i,.0,1),at(i,1,1)));const side=(heavy?.040:.029)/L;
 // The rubber glazing bead is wider than the outer stainless retaining strip.
 const lip=.064;skin(i,a,b,bot,bot+lip,trim,.009);skin(i,a,b,top-lip,top,trim,.009);
 skin(i,a,a+side*1.6,bot+lip,top-lip,trim,.009);skin(i,b-side*1.6,b,bot+lip,top-lip,trim,.009);
 skin(i,a,b,bot,bot+.014,brushed,.013);skin(i,a,b,top-.014,top,brushed,.013);
 group('glassCabin'+i);skin(i,a+side*1.6,b-side*1.6,bot+lip,top-lip,P.cabinGlass,.002);group('coach');
 }
 function decal(i,t,y,key,w,h,depth=.013){
 const n=faceN(i),r=unit(cross(Y,n)),p=at(i,t,y,depth);Signs.label(key,p,r,Y,w,h)
 }
 function shell(){
 group('coach');flat(-.42,P.ironDark,.14);flat(.076,P.grate,.038);
 for(let i=0;i<8;i++){if(i!==6){
 skin(i,0,1,-.41,-.28,P.redDark);skin(i,0,1,-.28,.12,oxide);skin(i,0,1,.12,.71,P.vermilion);
 skin(i,0,1,.71,.746,P.cream,.005);skin(i,0,1,.746,.80,P.redDark,.004);skin(i,0,1,.80,.892,brushed);
 skin(i,0,1,2.251,2.48,P.body);skin(i,0,1,2.48,2.58,roof);
 const parts=(i===2?3:i===4?2:1);for(let j=0;j<parts;j++){const a=j/parts,b=(j+1)/parts;
 pane(i,a+.007,b-.007);skin(i,a,a+.009,.879,2.263,brushed,.013);skin(i,b-.009,b,.879,2.263,brushed,.013)}
 const span=len(sub(corner(i,.2),corner(i+1,.2)));for(let j=0;j<Math.ceil(span/.39);j++)rivet(i,(j+.5)/Math.ceil(span/.39),-.193,.015)
 }}
 loopBand(-.332,-.272,P.rubber,.027);loopBand(-.267,-.249,brushed,.020);
 for(let i=0;i<8;i++){skin(i,0,1,2.56,2.693,roof);skin(i,0,1,2.486,2.533,P.rubber,.035);skin(i,0,1,2.526,2.55,brushed,.04)}
 flat(2.69,roof,.25);
 // Rounded front apron, contrasting fleet plate and recessed running lights.
 decal(0,.50,.42,'number',.78,.345,.035);decal(4,.51,.42,'car',1.20,.37,.038);
 for(const i of [0,4])for(const t of [.105,.895]){const n=faceN(i),p=at(i,t,.39,.015);cyl(p,add(p,mul(n,.05)),.091,trim,24);cyl(add(p,mul(n,.052)),add(p,mul(n,.065)),.064,t>.5?mat('#d9cbb0',10):mat('#973e31',10),20)}
 for(const i of [1,3,5,7]){const n=faceN(i);for(const y of [.19,.38]){const a=at(i,.28,y,.02),b=at(i,.72,y,.02);beam(a,b,.026,.023,P.redDark)}}
 }
 function eastSide(){const i=6,cuts=[0,.304,.5,.696,1],n=faceN(i),r=nz;
 for(const [a,b] of [[0,.304],[.696,1]]){skin(i,a,b,-.40,-.28,P.redDark);skin(i,a,b,-.28,.13,oxide);skin(i,a,b,.13,.71,P.vermilion);skin(i,a,b,.71,.746,P.cream,.005);skin(i,a,b,.746,.80,P.redDark);skin(i,a,b,.80,.896,brushed);
 pane(i,a+.009,b-.009,.886,2.258,true);skin(i,a,b,2.249,2.482,P.body);skin(i,a,b,2.48,2.58,roof);
 decal(i,(a+b)*.5,.43,a===0?'car':'number',a===0?1.02:.71,.36,.038);
 for(let k=0;k<4;k++)rivet(i,a+.028+k*(b-a-.055)/3,-.192)
 }
 // Two independent plug-door leaves. Each leaf has its own tall window, reveal and threshold.
 for(const [a,b] of [[.304,.5],[.5,.696]]){
 skin(i,a,b,-.41,.052,P.redDark,-.015);skin(i,a,b,.055,.63,P.vermilion,.015);skin(i,a,b,.621,.655,P.cream,.019);
 skin(i,a,b,.654,.70,brushed,.020);skin(i,a,b,2.23,2.422,P.body,.014);skin(i,a,b,2.42,2.58,roof);
 pane(i,a+.011,b-.011,.692,2.236,true);
 for(const t of [a+.009,b-.009]){skin(i,t-.007,t+.007,.06,2.438,brushed,.033);skin(i,t-.0029,t+.0029,.06,2.42,P.rubber,.041)}
 skin(i,a,b,.064,.123,P.rubber,.029);for(let j=0;j<3;j++)skin(i,a+.021,b-.021,.184+j*.069,.195+j*.069,P.redDark,.024);
 const t=b===.5?b-.040:a+.040,p=at(i,t,1.055,.042);
 box(p[0]+.011,p[1],p[2],.024,.206,.05,trim);pipe([[p[0]+.021,p[1]-.070,p[2]],[p[0]+.051,p[1]-.060,p[2]],[p[0]+.051,p[1]+.059,p[2]],[p[0]+.02,p[1]+.069,p[2]]],.012,brushed,8);
 // Frosted safety band across each pane remains translucent between the marks.
 for(let j=0;j<3;j++){const q=a+.048+j*.051;skin(i,q-.010,q+.010,1.35,1.383,P.cream,.023)}
 }
 skin(i,.303,.697,2.335,2.466,trim,.043);decal(i,.50,2.40,'door',.54,.13,.056);
 const dl=at(i,.302,.037,.065),dr=at(i,.698,.037,.065);beam(dl,dr,.111,.043,brushed);box(.108,.015,cz,.168,.031,1.57,P.grate);
 for(const z of [cz-1.72,cz+1.72]){box(.018,-.325,z,.148,.115,.32,trim);for(const d of [-.1,.1])bolt([.095,-.324,z+d],X,.023,P.steel)}
 }
 function interior(){group('carInterior');
 // Removable stays support narrow banquettes, with room to stand at the double doors.
 for(const z of [cz-1.58,cz+1.58,cz-.55,cz+.55]){box(cx-.98,.28,z,.17,.40,.075,P.ironDark);beam([cx-1.26,.22,z],[cx-.78,.45,z],.065,.062,P.steel)}
 box(cx-1.01,.475,cz,.66,.122,3.67,seat);
 for(let i=0;i<5;i++){const z=cz-1.47+i*.735;G.roundedBox(cx-.99,.56,z,.60,.095,.71,.037,upholstery);G.roundedBox(cx-1.288,.815,z,.093,.43,.71,.04,seat);box(cx-1.234,.96,z,.020,.064,.70,tint(upholstery,1.12))}
 for(const s of [-1,1]){const z=cz+s*1.91;box(cx+.24,.49,z,1.32,.11,.38,seat);G.roundedBox(cx+.24,.55,z,1.28,.08,.38,.033,upholstery);box(cx+.24,.79,z+s*.20,1.29,.41,.063,seat);
 for(const x of [cx-.23,cx+.69])box(x,.285,z,.068,.41,.072,P.ironDark)}
 const y=2.15,x=cx-.60;pipe([[x,2.445,cz-1.76],[x,y+.08,cz-1.76],[x,y,cz-1.66],[x,y,cz+1.66],[x,y+.08,cz+1.76],[x,2.446,cz+1.76]],.028,brushed,12);
 for(const z of [cz-1.23,cz-.42,cz+.42,cz+1.23]){cyl([x,y-.10,z],[x,y+.014,z],.019,trim,10);pipe([[x,y-.09,z],[x,y-.18,z-.084],[x,y-.25,z-.060],[x,y-.25,z+.060],[x,y-.18,z+.084],[x,y-.09,z]],.016,trim,8)}
 for(const z of [cz-1.46,cz+1.46]){cyl([cx+.35,.080,z],[cx+.35,2.55,z],.025,brushed,12);cyl([cx+.35,.082,z],[cx+.35,.114,z],.063,P.steel,16)}
 box(cx,2.56,cz,2.63,.062,4.28,P.body);for(const z of [cz-1.32,cz+1.32]){box(cx,2.51,z,.52,.056,.17,P.iron);box(cx,2.474,z,.43,.027,.12,P.glow)}
 // Small in-car route panel, readable through the near glazing.
 sign('map',[cx-1.34,1.52,cz-.78],nz,Y,.57,.33,.026);
 group('coach')
 }
 function roofwork(){group('hanger');
 for(const x of [cx-.63,cx+.63]){box(x,2.708,cz,.136,.106,3.93,P.iron);for(const z of [cz-1.63,cz-.66,cz+.66,cz+1.63]){box(x,2.77,z,.239,.047,.18,P.steel);for(const s of [-1,1])bolt([x+s*.075,2.796,z],Y,.026)}}
 for(const z of [cz-.78,cz+.78]){box(cx,2.799,z,1.63,.13,.145,P.iron);for(const x of [cx-.78,cx+.78])bolt([x,2.87,z],Y,.036)}
 // Twin roof saddles feed a central suspension hinge, clear of the roof access hatch.
 for(const xx of [cx-.21,cx+.21]){const yz=[[2.834,cz-.84],[2.834,cz+.80],[2.99,cz+.61],[3.12,cz+.25],[3.10,cz-.24],[2.99,cz-.57]];
 Machinery.yzPrism(xx-.063,xx+.063,yz,P.iron);for(const dz of [-.68,.65]){box(xx,2.84,cz+dz,.241,.067,.27,P.steel);bolt([xx+.078,2.879,cz+dz],Y,.036)}}
 cyl([cx-.35,3.044,cz],[cx+.35,3.044,cz],.109,P.steel,28);for(const sx of [-1,1]){const x=cx+sx*.348;cyl([x-.018,3.044,cz],[x+.018,3.044,cz],.139,P.ironDark,24);bolt([x+sx*.022,3.044,cz],[sx,0,0],.079,P.zinc)}
 // Built-up hanger with cheek plates, rebate and an independent diagonal damper.
 const arm=[[3.03,cz-.100],[3.03,cz+.112],[3.24,cz+.156],[4.33,cz-.11],[4.70,cz-.19],[4.95,cz-.165],[5.11,cz-.32],[5.03,cz-.48],[4.64,cz-.424],[4.28,cz-.33],[3.25,cz-.062]];
 Machinery.yzPrism(cx+.085,cx+.265,arm,P.iron);
 for(const sx of [-1,1]){
 const xx=cx+.175+sx*.096;beam([xx,3.25,cz+.046],[xx,4.62,cz-.28],.034,.073,P.steel);
 for(const p of [[3.28,.036],[3.71,-.06],[4.26,-.19],[4.64,-.284]])bolt([xx+sx*.018,p[0],cz+p[1]],[sx,0,0],.034,P.zinc)}
 const a=[cx-.071,3.00,cz-.59],b=[cx-.071,4.15,cz-.205],c=mix(a,b,.59);
 cyl(a,c,.065,P.ironDark,18);cyl(c,b,.033,brushed,16);for(const p of [a,b])cyl(add(p,[-.072,0,0]),add(p,[.222,0,0]),.078,P.steel,18);
 box(cx+.74,2.737,cz+1.22,.76,.095,.84,P.ironDark);box(cx+.74,2.798,cz+1.22,.70,.047,.77,roof);
 for(const dz of [-.26,.26])box(cx+1.01,2.827,cz+1.22+dz,.11,.036,.13,P.steel);
 for(const zz of [cz-.91,cz-.68,cz-.45])box(cx+.91,2.746,zz,.66,.067,.102,P.iron);
 // Fold-down access ladder follows the chamfered rear shell.
 const z=cz-hz;for(const dx of [-.60,-.23]){pipe([[cx+dx,.10,z+.06],[cx+dx,.14,z-.078],[cx+dx,2.41,z-.060],[cx+dx,2.63,z+.002],[cx+dx,2.72,z+.24]],.026,brushed,10);
 for(const yy of [.30,1.47,2.24])beam([cx+dx,yy,z+.087],[cx+dx,yy,z-.065],.042,.052,P.iron)}
 for(let i=0;i<8;i++)cyl([cx-.60,.269+i*.294,z-.073],[cx-.23,.269+i*.294,z-.073],.019,brushed,10)
 }
 function carriage(){group('carriage');const mid=cz-.30,y=5.276;
 // Each rocker carries two grooved rollers on its fixed track rope.
 for(const side of [-1,1]){const xx=cx+side*.38;
 for(const dz of [-.67,.67]){const z=mid+dz;
 const pts=[[y-.031,z-.35],[y+.082,z-.31],[y+.148,z-.15],[y+.153,z+.17],[y+.082,z+.33],[y-.033,z+.35],[y-.084,z+.19],[y-.084,z-.16]];
 for(const sx of [-1,1])Machinery.yzPrism(xx+sx*.096-.020,xx+sx*.096+.020,pts,P.iron);
 for(const zz of [z-.239,z+.239]){cyl([xx-.065,y,zz],[xx+.065,y,zz],.159,P.steel,32);
 for(const sx of [-1,1]){ringX(xx+sx*.061,y,zz,.142,.187,.022,P.ironDark,28);cyl([xx+sx*.085-.029,y,zz],[xx+sx*.085+.029,y,zz],.072,P.zinc,20);bolt([xx+sx*.122,y,zz],[sx,0,0],.044,P.iron)}}
 cyl([xx-.172,y+.038,z],[xx+.172,y+.038,z],.075,brushed,20);
 }
 const x=xx+side*.149,frame=[[5.292,mid-.73],[5.403,mid-.73],[5.432,mid-.59],[5.335,mid-.38],[5.251,mid+.38],[5.421,mid+.58],[5.42,mid+.73],[5.284,mid+.75],[5.102,mid+.41],[5.048,mid+.13],[5.048,mid-.20],[5.13,mid-.4]];
 Machinery.yzPrism(x-.032,x+.032,frame,casting());for(const dz of [-.67,.67])bolt([x+side*.038,5.321,mid+dz],[side,0,0],.075,P.steel)}
 cyl([cx-.61,5.14,mid],[cx+.61,5.14,mid],.114,P.steel,30);
 for(const sx of [-1,1]){cyl([cx+sx*.61-.025,5.14,mid],[cx+sx*.61+.025,5.14,mid],.142,P.iron,24);bolt([cx+sx*.64,5.14,mid],[sx,0,0],.076,P.zinc)}
 // Rope clamp below the equalizer, with visible jaw bolts and spring pack.
 for(const zz of [mid-.48,mid+.105]){box(cx,4.91,zz,.24,.069,.32,P.ironDark);box(cx,4.781,zz,.245,.058,.32,P.steel);
 for(const dx of [-.096,.096]){cyl([cx+dx,4.755,zz],[cx+dx,4.967,zz],.023,P.steel,10);bolt([cx+dx,4.967,zz],Y,.039,P.zinc)}}
 beam([cx,4.938,mid-.53],[cx,5.112,mid-.08],.128,.106,P.iron);for(let i=0;i<7;i++)cyl([cx-.16,4.944,mid+.17+i*.035],[cx-.16,4.944,mid+.189+i*.035],.062,P.ironDark,12);
 function casting(){return mat('#60726b',1)}
 }
 function build(){shell();eastSide();interior();roofwork();carriage()}
 return {build};
})();
