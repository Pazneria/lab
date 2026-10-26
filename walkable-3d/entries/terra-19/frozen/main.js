// Pelagic House: a compact, entirely local WebGL scene. No external assets or libraries.
const canvas = document.querySelector('#scene');
const gl = canvas.getContext('webgl', {antialias:true, alpha:false, powerPreference:'high-performance'});
if (!gl) { document.body.innerHTML='<p style="padding:3em">This scene needs a browser with WebGL enabled.</p>'; throw new Error('WebGL unavailable'); }
const vs = `attribute vec3 aPosition; attribute vec3 aNormal; attribute vec3 aColor; attribute float aKind;
uniform mat4 uViewProjection; varying vec3 vWorld; varying vec3 vNormal; varying vec3 vColor; varying float vKind;
void main(){vWorld=aPosition; vNormal=aNormal; vColor=aColor; vKind=aKind; gl_Position=uViewProjection*vec4(aPosition,1.0);}`;
const fs = `precision mediump float; varying vec3 vWorld; varying vec3 vNormal; varying vec3 vColor; varying float vKind; uniform float uAlpha;
float hash(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}
void main(){vec3 n=normalize(vNormal); vec3 light=vec3(.31,.36,.34); vec3 p=vWorld;
vec3 d=vec3(-6.1,3.25,0.0)-p; float l=length(d); light+=vec3(1.0,.68,.38)*max(dot(n,d/l),0.0)*2.15/(1.0+.22*l+.18*l*l);
d=vec3(.2,3.25,-1.2)-p;l=length(d);light+=vec3(1.0,.72,.48)*max(dot(n,d/l),0.0)*2.0/(1.0+.24*l+.2*l*l);
d=vec3(6.4,3.25,0.0)-p;l=length(d);light+=vec3(.62,.8,.76)*max(dot(n,d/l),0.0)*1.65/(1.0+.2*l+.16*l*l);
d=vec3(13.0,3.5,0.0)-p;l=length(d);light+=vec3(.12,.52,.56)*max(dot(n,d/l),0.0)*1.45/(1.0+.18*l+.1*l*l);
light+=max(dot(n,normalize(vec3(.2,.8,.35))),0.0)*vec3(.17,.18,.16);
float grain=hash(floor(p*(vKind>1.5?18.0:8.0))); float tex=1.0;
if(vKind>.5 && vKind<1.5) tex=.97+grain*.06;
if(vKind>1.5 && vKind<2.5) tex=.95+grain*.10;
if(vKind>2.5) tex=.98+grain*.04;
vec3 col=vColor*light*tex; if(vKind>3.5) col=vColor; gl_FragColor=vec4(col,uAlpha);}`;
function shader(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
const program=gl.createProgram(); gl.attachShader(program,shader(gl.VERTEX_SHADER,vs));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));gl.useProgram(program);
const loc={p:gl.getAttribLocation(program,'aPosition'),n:gl.getAttribLocation(program,'aNormal'),c:gl.getAttribLocation(program,'aColor'),k:gl.getAttribLocation(program,'aKind'),vp:gl.getUniformLocation(program,'uViewProjection'),alpha:gl.getUniformLocation(program,'uAlpha')};
const opaque=[],glass=[]; let target=opaque;
const C={wall:[.48,.58,.55],wall2:[.35,.47,.45],panel:[.57,.65,.60],edge:[.19,.29,.29],dark:[.08,.14,.14],rubber:[.045,.075,.075],metal:[.39,.48,.46],steel:[.55,.62,.59],brass:[.64,.47,.27],wood:[.38,.235,.14],woodLight:[.58,.39,.24],floor:[.31,.38,.34],cream:[.79,.76,.64],fabric:[.44,.53,.48],blue:[.24,.39,.40],rust:[.43,.27,.17],paper:[.84,.79,.64],reef:[.065,.15,.16]};
function pushVertex(p,n,c,k){target.push(p[0],p[1],p[2],n[0],n[1],n[2],c[0],c[1],c[2],k);}
function tri(a,b,c,n,col,k=0){pushVertex(a,n,col,k);pushVertex(b,n,col,k);pushVertex(c,n,col,k);}
function quad(a,b,c,d,n,col,k=0){tri(a,b,c,n,col,k);tri(a,c,d,n,col,k);}
function box(x,y,z,w,h,d,col,k=0){let x0=x-w/2,x1=x+w/2,y0=y-h/2,y1=y+h/2,z0=z-d/2,z1=z+d/2;
quad([x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1],[0,0,1],col,k);quad([x1,y0,z0],[x0,y0,z0],[x0,y1,z0],[x1,y1,z0],[0,0,-1],col,k);
quad([x1,y0,z1],[x1,y0,z0],[x1,y1,z0],[x1,y1,z1],[1,0,0],col,k);quad([x0,y0,z0],[x0,y0,z1],[x0,y1,z1],[x0,y1,z0],[-1,0,0],col,k);
quad([x0,y1,z1],[x1,y1,z1],[x1,y1,z0],[x0,y1,z0],[0,1,0],col,k);quad([x0,y0,z0],[x1,y0,z0],[x1,y0,z1],[x0,y0,z1],[0,-1,0],col,k);}
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]], add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]], scale=(a,s)=>a.map(v=>v*s), cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]], norm=a=>scale(a,1/(Math.hypot(...a)||1));
function cylinder(a,b,r,col,k=0,sides=12,r2=r){const axis=norm(sub(b,a)), helper=Math.abs(axis[1])>.9?[1,0,0]:[0,1,0], u=norm(cross(axis,helper)),v=cross(axis,u);for(let i=0;i<sides;i++){let t=i*2*Math.PI/sides,t2=(i+1)*2*Math.PI/sides, q=add(scale(u,Math.cos(t)),scale(v,Math.sin(t))),q2=add(scale(u,Math.cos(t2)),scale(v,Math.sin(t2))),p0=add(a,scale(q,r)),p1=add(a,scale(q2,r)),p2=add(b,scale(q2,r2)),p3=add(b,scale(q,r2)),n=norm(add(q,q2));quad(p0,p1,p2,p3,n,col,k);tri(a,p1,p0,scale(axis,-1),col,k);tri(b,p3,p2,axis,col,k);}}
function ellipsoid(x,y,z,rx,ry,rz,col,k=0,segments=12,rings=8){for(let j=0;j<rings;j++){let p0=-Math.PI/2+Math.PI*j/rings,p1=-Math.PI/2+Math.PI*(j+1)/rings;for(let i=0;i<segments;i++){let t0=2*Math.PI*i/segments,t1=2*Math.PI*(i+1)/segments;let pt=(p,t)=>[x+rx*Math.cos(p)*Math.cos(t),y+ry*Math.sin(p),z+rz*Math.cos(p)*Math.sin(t)];let a=pt(p0,t0),b=pt(p0,t1),c=pt(p1,t1),d=pt(p1,t0),mid=pt((p0+p1)/2,(t0+t1)/2),n=norm([(mid[0]-x)/(rx*rx),(mid[1]-y)/(ry*ry),(mid[2]-z)/(rz*rz)]);quad(a,b,c,d,n,col,k);}}}
function bolt(x,y,z,axis='x',r=.045){let d=.028;if(axis==='x') cylinder([x-d,y,z],[x+d,y,z],r,C.brass,3,8);else if(axis==='z') cylinder([x,y,z-d],[x,y,z+d],r,C.brass,3,8);else cylinder([x,y-d,z],[x,y+d,z],r,C.brass,3,8);}
const colliders=[];function solid(x,z,w,d){colliders.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2});}
function wall(x,z,w,d,h=3.8){box(x,h/2,z,w,h,d,C.wall,1);solid(x,z,w,d);}
function pipe(a,b,r=.035,col=C.brass){cylinder(a,b,r,col,3,10);}
function panelWallZ(z){ // seam strips, skirting, and insulated hull ribs
for(let x=-9.4;x<9.5;x+=1.6){box(x,1.9,z*.986,.035,3.65,.045,C.edge,3);for(let y of [.25,1.9,3.52])bolt(x,y,z*.974,'z',.025);}
box(0,.16,z*.976,19.4,.23,.09,C.edge,3);box(0,3.55,z*.976,19.4,.10,.1,C.edge,3);
}
// Hull, floor, ceiling and doors.
box(0,-.15,0,20,.3,8.2,C.floor,1); box(0,3.9,0,20,.2,8.2,C.wall2,1);
wall(0,-4,20,.22);wall(0,4,20,.22);wall(-10,0,.25,8);panelWallZ(-4);panelWallZ(4);
// Floor seams and inset walking strips.
for(let x=-9.5;x<9.8;x+=1.0) box(x,.006,0,.018,.012,7.8,[.20,.27,.25],0);
for(let z of [-3.7,3.7]) box(0,.012,z,19.5,.025,.12,C.edge,3);
for(let x of [-8.8,-6.0,-3.2,-.5,2.5,5.4,8.4]){box(x,3.75,0,.18,.22,7.75,C.edge,3);box(x,3.61,-3.75,.25,.18,.3,C.metal,3);box(x,3.61,3.75,.25,.18,.3,C.metal,3);}
// Internal bulkheads leave offset openings for the route.
function bulkhead(x,openMin,openMax){let a=(-4+openMin)/2,b=(openMax+4)/2; wall(x,a,.24,openMin+4);wall(x,b,.24,4-openMax);box(x,3.48,(openMin+openMax)/2,.30,.64,openMax-openMin,C.wall2,1);box(x-.15,1.65,openMin,.12,3.3,.15,C.edge,3);box(x-.15,1.65,openMax,.12,3.3,.15,C.edge,3);box(x-.15,3.31,(openMin+openMax)/2,.12,.16,openMax-openMin,C.edge,3);box(x+.15,1.65,openMin,.12,3.3,.15,C.edge,3);box(x+.15,1.65,openMax,.12,3.3,.15,C.edge,3);box(x+.15,3.31,(openMin+openMax)/2,.12,.16,openMax-openMin,C.edge,3);box(x,.018,(openMin+openMax)/2,.5,.035,openMax-openMin,C.brass,3);for(let z of [openMin+.1,openMax-.1])for(let y of [.32,1,2,3])bolt(x-.22,y,z,'x',.03);}
bulkhead(-1, -.25, 1.9); bulkhead(3,-1.8,.4);
// Decorative sealed entrance hatch with heavy layered trim.
box(-9.82,1.65,1.4,.08,3.0,2.05,C.edge,3);box(-9.75,1.65,1.4,.08,2.74,1.8,C.rubber,3);box(-9.68,1.65,1.4,.10,2.57,1.64,C.wall2,1);box(-9.60,1.7,1.4,.06,.5,1.3,C.metal,3);box(-9.56,1.7,1.4,.06,.36,1.12,C.dark,3);box(-9.52,1.7,1.4,.04,.28,1.02,[.18,.31,.31],3);pipe([-9.49,1.05,.84],[-9.49,1.75,.84],.035,C.brass);for(let z of [.52,2.28])for(let y of [.38,1.1,2.1,2.9])bolt(-9.58,y,z,'x');
// Ceiling lamps: emissive diffusers and protective cages.
function ceilingLamp(x,z){box(x,3.67,z,1.18,.08,.38,C.edge,3);box(x,3.61,z,.95,.045,.23,[1,.77,.48],4);for(let dx of [-.4,0,.4])box(x+dx,3.56,z,.035,.06,.33,C.brass,3);}
ceilingLamp(-6.2,0);ceilingLamp(.2,-1.3);ceilingLamp(6.2,0);
// Utility lines give the home a sealed, serviceable construction.
for(let z of [-3.82,3.82]){pipe([-9.4,3.23,z],[9.35,3.23,z],.035,C.brass);pipe([-9.4,3.04,z],[9.35,3.04,z],.025,C.edge);for(let x=-9;x<9;x+=1.6){box(x,3.14,z,.08,.30,.08,C.metal,3);}}
// Domestic room: layered soft goods, warm wood, and small signs of everyday life.
box(-6.0,.023,.15,4.65,.028,3.6,[.33,.39,.34],2);box(-6,.04,.15,4.35,.01,3.3,[.50,.45,.34],2);for(let x=-7.95;x<-4;x+=.20)box(x,.049,-1.35,.045,.01,.12,C.cream,2);
// Bed against the port wall.
box(-6.5,.28,-2.95,3.15,.45,1.75,C.wood,1);box(-6.5,.55,-2.95,3.02,.25,1.67,C.cream,2);box(-6.05,.71,-2.95,2.06,.12,1.69,[.30,.43,.43],2);box(-5.55,.78,-2.95,1.05,.055,1.7,[.39,.50,.48],2);for(let x of [-7.58,-7.12]){box(x,.75,-2.95,.40,.20,1.20,[.84,.82,.71],2);box(x,.86,-2.95,.38,.03,1.14,[.91,.87,.75],2);}box(-8.15,.8,-2.95,.18,1.15,1.85,C.wood,1);solid(-6.5,-2.95,3.25,1.85);
// A short bedside cabinet and a shaded lamp.
box(-8.52,.38,-1.55,.66,.76,.65,C.wood,1);box(-8.52,.63,-1.20,.52,.26,.035,C.woodLight,1);bolt(-8.52,.64,-1.17,'z',.035);cylinder([-8.52,.78,-1.55],[-8.52,1.12,-1.55],.035,C.brass,3);cylinder([-8.52,1.04,-1.55],[-8.52,1.37,-1.55],.25,[.81,.72,.53],2,12,.13);solid(-8.52,-1.55,.7,.7);
// Sofa with separate cushions, arms, seams and a folded throw.
box(-6.5,.34,2.93,3.1,.55,1.35,[.27,.39,.37],2);box(-6.5,.78,3.48,3.10,.92,.35,[.32,.44,.41],2);for(let x of [-7.42,-6.50,-5.58]){box(x,.68,2.82,.84,.25,1.02,[.43,.53,.47],2);box(x,1.0,3.20,.84,.51,.24,[.39,.49,.44],2);}for(let x of [-8.0,-5.0])box(x,.68,2.91,.25,.68,1.35,[.31,.43,.40],2);box(-5.32,.83,2.80,.42,.10,.9,[.69,.48,.32],2);solid(-6.5,2.96,3.2,1.45);
// Low coffee table, books and tea.
box(-6.35,.49,.20,1.65,.12,.94,C.woodLight,1);for(let x of [-7.02,-5.68])for(let z of [-.14,.54])box(x,.25,z,.08,.48,.08,C.wood,1);solid(-6.35,.2,1.65,.94);
box(-6.77,.58,.15,.48,.07,.32,[.58,.36,.25],1);box(-6.74,.63,.13,.42,.035,.29,C.paper,1);box(-6.69,.68,.13,.42,.05,.29,[.22,.37,.37],1);cylinder([-5.96,.57,.25],[-5.96,.75,.25],.105,[.83,.80,.67],1,12,.09);cylinder([-5.96,.75,.25],[-5.96,.757,.25],.075,[.19,.16,.12],0,12);cylinder([-5.65,.57,-.02],[-5.65,.70,-.02],.12,C.brass,3);ellipsoid(-5.65,.73,-.02,.14,.10,.14,C.brass,3);
// Cabinet, books, personal framed art and a plant.
box(-3.15,.65,3.23,1.65,1.3,1.1,C.wood,1);box(-3.15,1.34,3.20,1.74,.08,1.16,C.woodLight,1);for(let x of [-3.55,-2.78]){box(x,.66,2.66,.69,1.10,.04,C.woodLight,1);bolt(x+.19,.70,2.61,'z',.035);}solid(-3.15,3.22,1.75,1.2);
for(let i=0;i<6;i++){box(-3.75+i*.12,1.55,3.12,.10,.37,.42,[[.30,.39,.35],[.58,.42,.29],[.75,.67,.53],[.24,.33,.36]][i%4],1);}
cylinder([-2.72,1.38,3.08],[-2.72,1.72,3.08],.18,[.52,.32,.22],1,10,.22);for(let i=0;i<6;i++){let a=i*Math.PI/3, tip=[-2.72+Math.cos(a)*.28,2.05+(i%2)*.12,3.08+Math.sin(a)*.25];pipe([-2.72,1.7,3.08],tip,.025,[.27,.43,.30]);ellipsoid(tip[0],tip[1],tip[2],.09,.18,.06,[.27,.43,.30],1,8,5);}
// Artwork on wall: a simple framed marine study.
box(-5.1,2.35,-3.86,1.4,1.02,.09,C.wood,1);box(-5.1,2.35,-3.80,1.20,.82,.04,C.paper,1);box(-5.1,2.35,-3.76,1.05,.68,.025,[.26,.42,.41],1);for(let i=0;i<5;i++){let xx=-5.48+i*.18;pipe([xx,2.09,-3.73],[xx+.08,2.30+(i%3)*.11,-3.73],.012,[.64,.72,.57]);}
// Research workbench and cupboard.
box(.80,.79,-3.14,3.42,.14,1.30,C.woodLight,1);box(.80,.62,-3.14,3.30,.20,1.18,C.edge,3);for(let x of [-.65,2.25])for(let z of [-3.55,-2.72])box(x,.37,z,.10,.72,.10,C.metal,3);solid(.80,-3.2,3.48,1.40);
box(1.86,.40,-3.13,.76,.72,1.0,C.wall2,1);for(let y of [.22,.45,.66]){box(1.86,y,-2.61,.67,.18,.04,C.metal,3);box(1.86,y,-2.58,.24,.025,.02,C.brass,3);}
// Backboard, shelves, notebook, loose papers and instruments.
box(.70,1.65,-3.83,3.40,1.35,.06,C.edge,3);box(.70,1.64,-3.78,3.27,1.22,.04,[.32,.42,.39],1);box(.65,2.26,-3.49,3.1,.08,.58,C.wood,1);for(let x of [-.7,1.9])box(x,2.03,-3.54,.08,.43,.44,C.brass,3);
for(let i=0;i<8;i++){box(-.65+i*.11,2.49,-3.48,.09,.37,.35,[[.60,.48,.34],[.29,.39,.37],[.71,.65,.51],[.38,.31,.24]][i%4],1);}
for(let i=0;i<3;i++){let x=1.08+i*.37;cylinder([x,2.31,-3.46],[x,2.63,-3.46],.115,[.48,.62,.57],3,12);cylinder([x,2.62,-3.46],[x,2.67,-3.46],.12,C.brass,3,12);ellipsoid(x,2.46,-3.46,.055,.10,.055,[.29,.39,.27],1,8,5);}
box(-.12,.89,-2.99,.82,.035,.52,C.paper,1);box(-.12,.92,-2.98,.70,.025,.46,[.76,.72,.59],1);for(let z of [-3.12,-3.02,-2.92])box(-.14,.94,z,.56,.008,.012,[.34,.41,.39],0);pipe([.30,.94,-2.77],[.67,.94,-2.83],.015,C.dark);
// A compact microscope, specimen slides and an adjustable task light.
box(1.15,.91,-3.13,.62,.08,.50,C.dark,3);cylinder([1.08,.96,-3.13],[1.08,1.48,-3.13],.10,C.metal,3,10);pipe([1.08,1.43,-3.13],[1.30,1.62,-3.13],.075,C.edge);pipe([1.30,1.62,-3.13],[1.46,1.48,-3.13],.085,C.dark);box(1.13,1.18,-3.13,.40,.05,.31,C.metal,3);box(1.13,1.215,-3.13,.22,.015,.12,[.65,.75,.68],3);
box(2.02,.89,-2.85,.36,.04,.25,C.cream,1);for(let i=0;i<4;i++)box(1.9+i*.08,.93,-2.85,.035,.025,.19,[.45,.60,.58],3);
cylinder([-.45,.88,-3.35],[-.45,.95,-3.35],.18,C.dark,3);pipe([-.45,.95,-3.35],[-.45,1.50,-3.35],.035,C.brass);pipe([-.45,1.50,-3.35],[-.15,1.70,-3.35],.035,C.brass);cylinder([-.15,1.70,-3.35],[.02,1.48,-3.35],.18,C.edge,3,12,.11);
// A wall mounted storage locker and neatly routed cables.
box(.8,1.10,3.40,2.55,2.05,.95,C.wall2,1);for(let x of [-.02,.80,1.62]){box(x,1.13,2.90,.72,1.84,.045,C.metal,1);box(x+.23,1.17,2.86,.045,.30,.035,C.dark,3);for(let y of [.36,1.92])bolt(x-.26,y,2.85,'z',.025);}box(.8,2.18,3.38,2.65,.10,1.02,C.edge,3);solid(.8,3.40,2.65,1.1);
// Observation chamber, a quiet place to sit and look out.
box(6.45,.025,0,3.1,.035,4.4,[.25,.35,.33],2);box(6.45,.046,0,2.86,.01,4.16,[.33,.43,.39],2);
// Side bench leaves the approach to the glazing completely clear.
box(5.65,.48,3.13,2.4,.16,1.04,C.wood,1);for(let x of [4.68,6.62])for(let z of [2.75,3.48])box(x,.25,z,.10,.50,.10,C.edge,3);box(5.65,.62,3.13,2.25,.14,.91,[.46,.53,.46],2);box(5.30,.73,3.08,.54,.12,.75,[.72,.63,.48],2);solid(5.65,3.15,2.5,1.12);
// Consoles and a folded chart beside the observation window.
box(7.55,.50,-3.25,1.15,1.0,1.02,C.wall2,1);box(7.55,1.03,-3.25,1.20,.07,1.08,C.woodLight,1);box(7.55,.54,-2.72,1.0,.70,.04,C.metal,3);box(7.55,.60,-2.69,.25,.045,.02,C.dark,3);solid(7.55,-3.25,1.25,1.1);box(7.55,1.08,-3.22,.75,.025,.53,C.paper,1);for(let i=0;i<4;i++)box(7.55,1.098,-3.40+i*.10,.58,.005,.012,[.38,.50,.46],0);
// Window pressure wall: a thick, deep rectangular opening, layered gaskets,
// bolted inner and outer frames, and diagonal load-bearing braces.
box(9.62,.33,0,.84,.66,8,C.wall2,1);box(9.62,3.48,0,.84,.64,8,C.wall2,1);box(9.62,1.89,-3.42,.84,2.5,1.16,C.wall2,1);box(9.62,1.89,3.42,.84,2.5,1.16,C.wall2,1);solid(9.65,0,.8,8);
// Reveal liners make the opening's depth readable as you approach.
box(9.62,.72,0,.86,.12,5.72,C.metal,3);box(9.62,3.10,0,.86,.12,5.72,C.metal,3);box(9.62,1.91,-2.80,.86,2.48,.12,C.metal,3);box(9.62,1.91,2.80,.86,2.48,.12,C.metal,3);
for(let x of [9.15,10.08]){box(x,.77,0,.20,.25,5.85,C.edge,3);box(x,3.06,0,.20,.25,5.85,C.edge,3);for(let z of [-2.75,2.75])box(x,1.92,z,.20,2.35,.25,C.edge,3);}
// A broad black compression gasket and a second metal lip.
box(9.255,.91,0,.10,.12,5.35,C.rubber,3);box(9.255,2.92,0,.10,.12,5.35,C.rubber,3);for(let z of [-2.62,2.62])box(9.255,1.91,z,.10,2.08,.12,C.rubber,3);
box(9.32,.96,0,.08,.075,5.16,C.brass,3);box(9.32,2.86,0,.08,.075,5.16,C.brass,3);for(let z of [-2.56,2.56])box(9.32,1.91,z,.08,1.94,.075,C.brass,3);
for(let z=-2.5;z<=2.51;z+=.36){bolt(9.02,.77,z,'x',.042);bolt(9.02,3.06,z,'x',.042);}for(let y=1.08;y<=2.8;y+=.29){bolt(9.02,y,-2.75,'x',.042);bolt(9.02,y,2.75,'x',.042);}
// Uprights, angular struts, sill and handrail.
for(let z of [-3.16,3.16]){box(8.98,1.92,z,.32,3.53,.35,C.edge,3);box(8.79,1.92,z,.09,3.4,.15,C.metal,3);pipe([8.90,.24,z],[8.25,1.13,z],.105,C.edge);pipe([8.90,3.46,z],[8.25,2.73,z],.105,C.edge);for(let y of [.36,1.2,2.2,3.4])bolt(8.74,y,z,'x',.05);}
box(8.83,.66,0,.55,.13,5.5,C.edge,3);box(8.72,.76,0,.22,.08,5.25,C.brass,3);
// Heavy low sill retains a close approach while keeping a safe foot stop.
box(8.96,.18,0,.55,.36,5.5,C.wall2,1);solid(9.05,0,.36,5.5);
// Glass is one transparent plane, with a faint edge reflection rather than expensive screen effects.
target=glass;box(9.79,1.91,0,.035,1.92,5.05,[.21,.52,.52],3);target=opaque;
// Reef outside: bounded dark backdrop, stones, sparse kelp and a few muted points of life.
box(15,-.36,0,11,.7,14,[.055,.12,.12],1);box(20,3.4,0,.2,7,14,[.025,.075,.085],0);box(15,3.4,-7,10,7,.2,[.03,.085,.09],0);box(15,3.4,7,10,7,.2,[.03,.085,.09],0);
let seed=947;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
for(let i=0;i<36;i++){let x=10.8+rand()*7.6,z=-6.3+rand()*12.6,rx=.32+rand()*.9,ry=.25+rand()*.65;ellipsoid(x,ry*.35,z,rx,ry,.35+rand()*.8,[[.06,.14,.14],[.08,.17,.16],[.10,.18,.16],[.07,.12,.13]][i%4],1,8,5);}
for(let i=0;i<25;i++){let x=11+rand()*7.5,z=-5.8+rand()*11.6,h=.5+rand()*1.5;let base=[x,.06,z],mid=[x+.15,h*.55,z+.1],tip=[x+.28,h,z];pipe(base,mid,.035,[.10,.23,.20]);pipe(mid,tip,.025,[.10,.23,.20]);for(let j=0;j<3;j++){let t=.35+j*.25,xx=x+.28*t,yy=h*t,zz=z+.1*t;ellipsoid(xx+(j%2?-.16:.16),yy,zz,.25,.08,.055,[.10,.23,.20],1,8,5);}}
for(let i=0;i<14;i++){let x=11.5+rand()*6,z=-4.5+rand()*9,y=.3+rand()*1.5;ellipsoid(x,y,z,.045,.045,.045,[.28,.48,.43],4,6,4);}
// Restrained surface scuffs, drains, and a few service details.
for(let i=0;i<32;i++){let x=-9+rand()*18,y=.25+rand()*2.9,z=(i%2?3.87:-3.87);box(x,y,z,.10+rand()*.22,.012,.008,[.31,.40,.37],1);}
for(let x of [-8.9,-2.1,4.0,8.5]){box(x,.025,-3.4,.46,.025,.25,C.edge,3);for(let j=0;j<5;j++)box(x-.16+j*.08,.042,-3.4,.025,.008,.18,C.dark,3);}
// More intimate details: a wall clock, a reading light, and maintained fittings.
cylinder([-7.75,2.40,-3.83],[-7.75,2.40,-3.72],.34,C.brass,3,20);cylinder([-7.75,2.40,-3.71],[-7.75,2.40,-3.69],.28,C.cream,1,20);
pipe([-7.75,2.40,-3.66],[-7.75,2.58,-3.66],.012,C.dark);pipe([-7.75,2.40,-3.66],[-7.61,2.34,-3.66],.012,C.dark);
for(let a=0;a<12;a++){let t=a*Math.PI/6;ellipsoid(-7.75+Math.sin(t)*.23,2.40+Math.cos(t)*.23,-3.66,.013,.013,.012,C.dark,0,6,4);}
cylinder([-4.42,.04,3.30],[-4.42,.11,3.30],.22,C.edge,3);pipe([-4.42,.1,3.30],[-4.42,1.88,3.30],.028,C.brass);cylinder([-4.42,1.72,3.30],[-4.42,2.02,3.30],.26,[.75,.68,.52],2,12,.14);
box(-3.15,2.55,-3.83,.85,.62,.10,C.edge,3);box(-3.15,2.55,-3.76,.72,.49,.05,[.58,.65,.57],1);for(let y of [2.38,2.48,2.58,2.68])box(-3.15,y,-3.72,.50,.018,.012,C.dark,0);
// Pressure gauge and a valved pipe in the work area.
pipe([2.55,.35,-3.85],[2.55,2.65,-3.85],.047,C.brass);cylinder([2.55,1.85,-3.81],[2.55,1.85,-3.68],.20,C.edge,3,16);cylinder([2.55,1.85,-3.67],[2.55,1.85,-3.64],.15,C.cream,1,16);pipe([2.55,1.85,-3.61],[2.64,1.92,-3.61],.013,C.dark);
// Observation fittings and a framed field sketch for the return view.
box(4.20,2.05,-3.85,1.22,.88,.08,C.wood,1);box(4.20,2.05,-3.79,1.06,.72,.04,C.paper,1);box(4.20,2.05,-3.76,.91,.58,.02,[.30,.43,.40],1);for(let i=0;i<5;i++)pipe([3.88+i*.15,1.82,-3.73],[3.91+i*.15,2.06+(i%3)*.06,-3.73],.013,[.65,.71,.56]);
for(let x of [4.0,7.0]){box(x,3.67,-2.50,.68,.05,.48,C.edge,3);for(let i=0;i<5;i++)box(x-.24+i*.12,3.63,-2.5,.035,.035,.38,C.metal,3);}
// Simple raised lettering keeps labels legible without external font assets.
const glyph={A:['01110','10001','10001','11111','10001','10001','10001'],B:['11110','10001','10001','11110','10001','10001','11110'],C:['01111','10000','10000','10000','10000','10000','01111'],D:['11110','10001','10001','10001','10001','10001','11110'],E:['11111','10000','10000','11110','10000','10000','11111'],H:['10001','10001','10001','11111','10001','10001','10001'],I:['11111','00100','00100','00100','00100','00100','11111'],L:['10000','10000','10000','10000','10000','10000','11111'],N:['10001','11001','10101','10011','10001','10001','10001'],O:['01110','10001','10001','10001','10001','10001','01110'],P:['11110','10001','10001','11110','10000','10000','10000'],R:['11110','10001','10001','11110','10100','10010','10001'],S:['01111','10000','10000','01110','00001','00001','11110'],T:['11111','00100','00100','00100','00100','00100','00100'],U:['10001','10001','10001','10001','10001','10001','01110'],V:['10001','10001','10001','10001','10001','01010','00100'],W:['10001','10001','10001','10101','10101','10101','01010'],'0':['01110','10011','10101','10101','11001','10001','01110'],'4':['10010','10010','10010','11111','00010','00010','00010'],' ':['00000','00000','00000','00000','00000','00000','00000']};
function sign(text,x,y,z,size=.035,reverse=false){const width=text.length*6*size;box(x+width/2-size/2,y+3*size,z,width+.14,7*size+.13,.035,C.edge,3);for(let i=0;i<text.length;i++){let g=glyph[text[i]]||glyph[' '];for(let row=0;row<7;row++)for(let col=0;col<5;col++)if(g[row][col]==='1')box(x+(i*6+col)*size,y+(6-row)*size,z+(reverse?-.025:.025),size*.77,size*.77,.015,C.cream,4);}}
sign('RESEARCH',-.45,2.82,-3.75,.034);sign('OBSERVATION',4.55,2.85,3.85,.029,true);sign('HABITAT 04',-8.68,2.77,-3.76,.028);
// GPU buffers: the static scene is batched into one opaque and one glass draw.
function bufferFor(data){let b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);return {buffer:b,count:data.length/10};}
const world=bufferFor(opaque),windowGlass=bufferFor(glass);
function bind(mesh){gl.bindBuffer(gl.ARRAY_BUFFER,mesh.buffer);const stride=40;for(const [attr,count,offset] of [[loc.p,3,0],[loc.n,3,12],[loc.c,3,24],[loc.k,1,36]]){gl.enableVertexAttribArray(attr);gl.vertexAttribPointer(attr,count,gl.FLOAT,false,stride,offset);}}
function mul(a,b){let o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let i=0;i<4;i++)o[c*4+r]+=a[i*4+r]*b[c*4+i];return o;}
function perspective(fov,aspect,near,far){const f=1/Math.tan(fov/2),q=1/(near-far);return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*q,-1,0,0,2*far*near*q,0]);}
function lookAt(eye,center){let z=norm(sub(eye,center)),x=norm(cross([0,1,0],z)),y=cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-(x[0]*eye[0]+x[1]*eye[1]+x[2]*eye[2]),-(y[0]*eye[0]+y[1]*eye[1]+y[2]*eye[2]),-(z[0]*eye[0]+z[1]*eye[1]+z[2]*eye[2]),1]);}
let player={x:-8.8,z:1.45,yaw:0,pitch:0}; const keys=new Set();let locked=false,started=false;
function reset(){player={x:-8.8,z:1.45,yaw:0,pitch:0};}
function blocked(x,z){const radius=.24;for(const b of colliders){let nx=Math.max(b.x0,Math.min(x,b.x1)),nz=Math.max(b.z0,Math.min(z,b.z1));if((x-nx)**2+(z-nz)**2<radius*radius)return true;}return false;}
function resize(){const ratio=Math.min(window.devicePixelRatio||1,1.5);let w=Math.max(1,Math.floor(innerWidth*ratio)),h=Math.max(1,Math.floor(innerHeight*ratio));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}}
const intro=document.querySelector('#intro'),notice=document.querySelector('#notice');document.querySelector('#start').addEventListener('click',()=>{started=true;intro.style.display='none';canvas.requestPointerLock();});canvas.addEventListener('click',()=>{if(started&&!locked)canvas.requestPointerLock();});document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===canvas;notice.style.display=started&&!locked?'block':'none';});document.addEventListener('mousemove',e=>{if(!locked)return;player.yaw+=e.movementX*.0023;player.pitch=Math.max(-1.38,Math.min(1.38,player.pitch-e.movementY*.0023));});
window.addEventListener('keydown',e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight','KeyR'].includes(e.code))e.preventDefault();keys.add(e.code);if(e.code==='KeyR'&&!e.repeat)reset();});window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>keys.clear());
gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.clearColor(.018,.055,.06,1);
let previous=performance.now();function frame(now){let dt=Math.min((now-previous)/1000,.05);previous=now;resize();if(started&&locked){let f=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0),s=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);let mag=Math.hypot(f,s)||1,speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?3.8:2.45)*dt/mag;let dx=(Math.cos(player.yaw)*f-Math.sin(player.yaw)*s)*speed,dz=(Math.sin(player.yaw)*f+Math.cos(player.yaw)*s)*speed;if(!blocked(player.x+dx,player.z))player.x+=dx;if(!blocked(player.x,player.z+dz))player.z+=dz;}
let cp=Math.cos(player.pitch),eye=[player.x,1.63,player.z],dir=[Math.cos(player.yaw)*cp,Math.sin(player.pitch),Math.sin(player.yaw)*cp];let vp=mul(perspective(65*Math.PI/180,canvas.width/canvas.height,.05,55),lookAt(eye,add(eye,dir)));gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.uniformMatrix4fv(loc.vp,false,vp);gl.uniform1f(loc.alpha,1);bind(world);gl.drawArrays(gl.TRIANGLES,0,world.count);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);gl.uniform1f(loc.alpha,.18);bind(windowGlass);gl.drawArrays(gl.TRIANGLES,0,windowGlass.count);gl.depthMask(true);gl.disable(gl.BLEND);requestAnimationFrame(frame);}
requestAnimationFrame(frame);
