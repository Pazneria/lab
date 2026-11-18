import {at,box,curved,surface,material,unit,sub,add,mul,path,rod,quad,clamp} from './geometry.mjs';
import {M,TAU} from './finish.mjs';
const signed=(x,p)=>Math.sign(x)*Math.pow(Math.abs(x),p);
export function cushion(x,y,z,w,h,d,m,piping=M.linen,rotation=0){
 at(x,y,z,rotation,()=>{
 const f=(s,t)=>{const a=s*TAU,b=(t-.5)*Math.PI,cb=Math.cos(b),sb=Math.sin(b);
 const X=signed(Math.cos(a),.44),Z=signed(Math.sin(a),.44);
 const edge=1-.024*Math.exp(-b*b/.065);
 const r=signed(cb,.56)*edge;
 const crease=.004*Math.sin(14*a+.7)*Math.pow(cb,5);
 return [X*w*.5*r,(h*.5*signed(sb,.75))*(1-.084*Math.pow(Math.abs(X*Z),3))+.004*Math.sin(a*3)*cb+crease,Z*d*.5*r];};
 curved(44,20,f,m,(s,t)=>[s*(w+d)*1.6,t*(d*.5+h)],true,true);
 if(piping){let pts=[];for(let i=0;i<=60;i++)pts.push(f(i/60,.5));path(pts,.0037,piping,6);}
 });
}
export function bedCover(){
 const sigmoid=x=>Math.max(0,Math.min(1,x));
 const f=(s,t)=>{
 const a=s*2-1,abs=Math.abs(a),edge=sigmoid((abs-.835)/.165),foot=sigmoid((t-.82)/.18);
 const sx=abs<.835?abs/.835*.712:.712+.070*Math.sin(edge*Math.PI/2)+.011*Math.sin(11*t+edge)*edge;
 const z=.794+Math.min(t,.82)*1.60+.084*Math.sin(foot*Math.PI/2)+.018*Math.sin(a*4.4-.8)*Math.exp(-t*8);
 const fold=.027*Math.exp(-((t-.085-.015*Math.sin(3*a))**2)/.0018)+.014*Math.sin(11*a+7*t)*Math.sin(t*Math.PI)*Math.exp(-abs*.35)+.010*Math.sin(19*t+6*a+.4)*(.3+abs*.7);
 const seam=Math.max(0,Math.cos((s*7+.09*Math.sin(t*4))*TAU));
 const y=.682+fold+.009*(1-seam**9)-.205*edge**1.33-.219*foot**1.55+.145*foot*edge+.007*Math.sin(t*26+2*a)*edge;
 return [Math.sign(a)*sx,y,z];};
 curved(68,78,f,M.quilt,(s,t)=>[s*1.9,t*1.61],true,true);
 const band=(t0,t1,m,raise)=>curved(62,Math.max(2,Math.ceil((t1-t0)*75)),(s,t)=>{let p=f(s,t0+(t1-t0)*t);p[1]+=raise;p[0]+=(s-.5)*raise*1.4;p[2]+=t0>.8?raise:0;return p;},m,(s,t)=>[s*1.85,t*(t1-t0)*1.7],false,true);
 band(.001,.071,M.rust,.008);band(.065,.077,M.ochre,.009);
 band(.633,.713,M.rust,.003);band(.648,.658,M.stripe,.0045);band(.666,.676,M.ochre,.0045);band(.695,.702,M.stripe,.0045);
 band(.731,.741,M.stripe,.003);band(.95,.966,M.rust,.0035);
 for(const s of [0,1]){const pts=[];for(let i=0;i<=47;i++){let p=f(s,i/47);p[1]+=.002;pts.push(p);}path(pts,.004,M.rust,6);}
}
export function rug(x,z,w,d,main,edge){
 at(x,0,z,0,()=>{
 box(0,.012,0,w,.021,d,main,.008,.22,false);
 const line=(xx,zz,ww,dd,m)=>box(xx,.023,zz,ww,.002,dd,m,0,.26,false);
 for(const s of [-1,1]){
  line(s*(w/2-.062),0,.032,d-.095,edge);line(s*(w/2-.096),0,.007,d-.18,edge);
  line(0,s*(d/2-.062),w-.094,.032,edge);line(0,s*(d/2-.097),w-.18,.007,edge);
 }
 });
}
