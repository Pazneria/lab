'use strict';
const Landscape=(()=>{
 const {mat,group,vertex,indices,quad,tri,cyl,beam,box,unit,sub,cross,add,mul,mix,seeded}=G;
 const tau=2*Math.PI,clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),smooth=t=>t*t*(3-2*t);
 function hash(x,z){let h=Math.imul(x+401,1597334677)^Math.imul(z+13,3812015801);h=Math.imul(h^(h>>>15),2246822519);return ((h^(h>>>13))>>>0)/4294967296}
 function noise(x,z){const i=Math.floor(x),j=Math.floor(z),a=smooth(x-i),b=smooth(z-j);return (hash(i,j)*(1-a)+hash(i+1,j)*a)*(1-b)+(hash(i,j+1)*(1-a)+hash(i+1,j+1)*a)*b}
 function fb(x,z){return noise(x*.031,z*.031)*.52+noise(x*.087+31,z*.087)*.27+noise(x*.22,z*.22+17)*.14+noise(x*.5,z*.5)*.07}
 function ground(x,z){const d=Math.max(0,Math.abs(x)-6.6,-z-15,z-14);const m=smooth(clamp(d/12));const left=27*Math.exp(-Math.pow((x+50+11*Math.sin(z*.040))/24,2)-Math.pow((z+51)/77,2));const right=29*Math.exp(-Math.pow((x-65+11*Math.sin(z*.032))/31,2)-Math.pow((z+10)/95,2));
 return -2.55-Math.max(0,-z-5)*.40+Math.min(0,15-z)*.035+ m*(left+right+4*Math.sin(x*.059+z*.04)+11*(fb(x,z)-.5)+.028*Math.abs(x)) }
 const nearColor=mat('#5c6f63',11),rockColor=mat('#72807a',11);
 function grid(w,h,point,color,blend=.64){const pts=[],ns=[];for(let j=0;j<=h;j++)for(let i=0;i<=w;i++)pts.push(point(i,j));const ix=(x,y)=>Math.max(0,Math.min(h,y))*(w+1)+Math.max(0,Math.min(w,x));
 for(let j=0;j<=h;j++)for(let i=0;i<=w;i++){let n=unit(cross(sub(pts[ix(i,j+1)],pts[ix(i,j-1)]),sub(pts[ix(i+1,j)],pts[ix(i-1,j)])));if(n[1]<0)n=mul(n,-1);ns.push(n)}
 function triangle(a,b,c){let flat=unit(cross(sub(pts[b],pts[a]),sub(pts[c],pts[a])));if(flat[1]<0)flat=mul(flat,-1);let v=[];for(const k of [a,b,c]){const norm=unit(mix(flat,ns[k],blend)),p=pts[k];v.push(vertex(p,norm,[p[0]*.15,p[2]*.15],color(p,norm)))}indices(...v)}
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const a=ix(x,y),b=ix(x+1,y),c=ix(x+1,y+1),d=ix(x,y+1);if((x+y)%2){triangle(a,c,b);triangle(a,d,c)}else{triangle(a,d,b);triangle(b,d,c)}}
 }
 function alpineRing(k){const rand=seeded(144+k);const ticks=186,steps=17;const radius=[116,197,301][k],width=[47,65,79][k],base=[-46,-44,-36][k];
 const peaks=[];for(let n=0;n<25;n++){peaks.push([(n+rand()*.66)*tau/25,.09+rand()*.17,(.38+rand()*.69)*[38,67,90][k]])}
 if(k===2)peaks.push([-.15+tau,.20,123],[.11,.105,109],[.42,.19,89],[tau-.61,.18,104]);
 if(k===1)peaks.push([tau-.49,.24,66],[.35,.17,69]);
 function profile(a){let max=0;for(const [b,w,height] of peaks){const d=Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));max=Math.max(max,height*Math.pow(Math.max(0,1-d/w),.92))}return base+[30,37,42][k]+max+2.9*Math.sin(a*27+3*k)+1.6*Math.cos(a*47)}
 group('landRange'+k);
 grid(ticks,steps,(i,j)=>{let a=i/ticks*tau;const u=j/steps,off=(u-.62)/.62;const jitter=(i===ticks||i===0?0:(hash(i,j+k*91)-.5)*.011);a+=jitter;const crest=profile(a),r=radius+width*off+8*Math.sin(a*5+k)+3.6*Math.sin(a*12+k);const x=r*Math.sin(a),z=-r*Math.cos(a);const shoulder=clamp(1-Math.abs(off)*1.25);const gullies=(fb(x*1.9,z*1.9)-.5)*15*shoulder+4*Math.cos(a*19+u*11)*shoulder;let y=base+(crest-base)*Math.pow(shoulder,.80)+gullies;
 return [x,y,z]},(p,n)=>{const [x,y,z]=p,g=fb(x*1.8,z*1.8),band=2.9*Math.sin(x*.23+z*.11)+5*(g-.5);
 const snow=clamp((y-[32,29,32][k]+band)*.095+(n[1]-.68)*3.6+(n[2]-.1)*.34);
 const light=.69+.38*g+.075*Math.cos(y*.42+x*.12+z*.08);const raw=mix([.315,.371,.372],[.72,.75,.73],clamp((y+21)*.009)*.38);
 const co=mix(mul(raw,light),[.88,.906,.894],snow*.98);return mat(co,11)},.26)
 }
 function fir(x,y,z,h,rand){
 const r=h*(.135+rand()*.056),lean=(rand()-.5)*h*.04,turn=rand()*tau,dark=.68+rand()*.34;
 if(h>3.5)cyl([x,y,z],[x+lean*.45,y+h*.62,z],r*.11,mat('#615e50',16),5,r*.045);
 const tiers=5,sides=10;
 for(let j=0;j<tiers;j++){const t=j/tiers,cy=y+h*(.085+t*.81),rr=r*(1-.8*t),height=h*(.26-.09*t),phase=turn+j*.96;
 const tp=[x+lean*(t+.3),j===tiers-1?y+h:cy+height*1.6,z],rim=[];
 for(let i=0;i<sides;i++){const a=tau*i/sides+phase,rad=rr*(i%2?.48:.92+rand()*.19);rim.push([x+lean*t+Math.cos(a)*rad,cy+rr*(i%2?.30:-.08-rand()*.24),z+Math.sin(a)*rad])}
 for(let i=0;i<sides;i++){const c=mul([.209+.038*t,.292+.057*t,.267+.07*t],dark*(i%2?.93:1.05));tri(tp,rim[(i+1)%sides],rim[i],mat(c,16))}
 }
 }
 function rocks(rand){for(let j=0;j<83;j++){let x=(rand()-.5)*65,z=-34+rand()*61;if(Math.abs(x)<6.6&&z> -16.9&&z<14.4)continue;const y=ground(x,z),r=.34+rand()*1.13,h=r*(.35+rand()*.6),ring=[];
 for(let i=0;i<7;i++){let a=tau*i/7;ring.push([x+Math.cos(a)*r*(.7+rand()*.7),y-r*.14+rand()*r*.16,z+Math.sin(a)*r*(.65+rand()*.4)])}
 for(let i=0;i<7;i++)tri([x+r*.15,y+h,z-r*.15],ring[(i+1)%7],ring[i],G.tint(rockColor,.73+.23*rand()))}}
 function build(){
 for(let k=2;k>=0;k--)alpineRing(k);
 group('landGround');grid(86,77,(i,j)=>{const x=-114+2.65*i+(hash(i,j)-.5)*.9,z=-127+j*2.46+(hash(j,i+9)-.5)*.9;return [x,ground(x,z),z]},(p,n)=>{const v=fb(p[0],p[2]);return mat(mul(mix(nearColor.color,rockColor.color,clamp((.9-n[1])*3+v*.2)),.76+.39*v),11)},.7);
 const rand=seeded(10487);group('landRock');rocks(rand);
 const cells=new Map();
 for(let i=0;i<1250;i++){const x=(rand()-.5)*202,z=-117+rand()*186,r=Math.hypot(x,z);if(Math.abs(x)<10.2&&z> -24&&z<18||r<12)continue;
 const y=ground(x,z),clump=fb(x*1.4,z*1.4);if(clump<.37||Math.abs(x)<11&&z<-34&&rand()<.89||y>23)continue;const key='landFir'+Math.floor((x+110)/54)+'_'+Math.floor((z+125)/60);if(!cells.has(key))cells.set(key,[]);cells.get(key).push([x,y-.25,z,2.2+rand()*5.6+(r<35?1.2:0)])}
 for(const [key,trees] of cells){group(key);for(const t of trees)fir(...t,rand)}
 group('tower');const z=-51,x=-1.55,top=.48,y=ground(x,z);let foots=[];for(const dx of [-1,1])for(const dz of [-1,1]){const lo=[x+dx*1.7,y,z+dz*1.12],hi=[x+dx*.65,top-.75,z+dz*.52];foots.push([lo,hi]);box(lo[0],y+.03,lo[2],.65,.6,.65,P.foundation);beam(lo,hi,.17,.19,P.steel)}
 for(let i=0;i<4;i++){const next=[1,3,0,2][i];for(let j=0;j<5;j++){const a=mix(...foots[i],j/5),b=mix(...foots[next],j/5),c=mix(...foots[next],(j+1)/5);beam(a,b,.09,.09,P.iron);beam(a,c,.075,.075,P.steel)}}
 box(x,top-.52,z,2.4,.27,1.75,P.iron);G.ringX(x,top-.128,z,.032,.091,.082,P.steel,18);for(const xx of [x-.38,x+.38]){beam([xx,top-.42,z+.72],[xx,top+.04,z],.13,.15,P.steel);box(xx,top+.084,z,.16,.18,1.75,P.iron)}
 }
 return {build,ground};
})();
