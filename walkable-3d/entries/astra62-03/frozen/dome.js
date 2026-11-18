import {TAU,PI,add,mul,sub,unit,cross,rad,radial,UP,randomSource} from './geometry.js';
import {ROOF_YAW} from './layout.js';
const rr=randomSource(9293);
const R=5.80,H=3.65,EAVE=5.90,GAP=.205;
function shellPoint(l,t,inset=0){
  return [(R-inset)*Math.sin(l),EAVE+(H-inset)*Math.cos(l)*Math.sin(t),(R-inset)*Math.cos(l)*Math.cos(t)];
}
function shellNormal(l,t){
  return unit([Math.sin(l)/R,Math.cos(l)*Math.sin(t)/H,Math.cos(l)*Math.cos(t)/R]);
}
// Join successive quadrilateral sections to make a curved structural member.
function rib(g,mat,points,normals,width,depth,tone=1){
  const sections=points.map((p,i)=>{
    const run=unit(sub(points[Math.min(i+1,points.length-1)],points[Math.max(i-1,0)]));
    const n=normals[i],side=unit(cross(run,n));
    return [-1,1].flatMap(h=>[-1,1].map(w=>add(add(p,mul(n,depth*h/2)),mul(side,width*w/2))));
  });
  for(let i=0;i<sections.length-1;i++){
    const A=sections[i],B=sections[i+1],n=normals[i],s=unit(sub(A[1],A[0]));
    g.face(mat,[A[2],A[3],B[3],B[2]],n,{tone});
    g.face(mat,[A[1],A[0],B[0],B[1]],mul(n,-1),{tone});
    g.face(mat,[A[0],A[2],B[2],B[0]],mul(s,-1),{tone});
    g.face(mat,[A[1],A[3],B[3],B[1]],s,{tone});
  }
  const end=(i,f)=>{const a=sections[i];g.face(mat,[a[0],a[1],a[3],a[2]],f,{tone})};
  end(0,sub(points[0],points[1]));end(sections.length-1,sub(points.at(-1),points.at(-2)));
}
function lineRib(g,mat,l0,t0,l1,t1,offset,width,depth,n=32,tone=1){
  const p=[],ns=[];
  for(let j=0;j<=n;j++){
    const l=l0+(l1-l0)*j/n,t=t0+(t1-t0)*j/n;
    p.push(shellPoint(l,t,offset));ns.push(shellNormal(l,t));
  }
  rib(g,mat,p,ns,width,depth,tone);
}
function leaves(g){
  const max=PI/2-.009;
  for(const side of [-1,1]){
    const panelCount=9,nArc=32;
    for(let i=0;i<panelCount;i++){
      const L=side*(GAP+(max-GAP)*i/panelCount),U=side*(GAP+(max-GAP)*(i+1)/panelCount);
      for(let j=0;j<nArc;j++){
        const a=PI*j/nArc,b=PI*(j+1)/nArc;
        const coords=[[L,a],[U,a],[U,b],[L,b]],n=shellNormal((L+U)/2,(a+b)/2);
        const shade=.88+.16*(.5+.5*Math.sin(i*14.44+Math.floor((j+(i%2)*2)/4)*71.62+side));
        g.face('roof',coords.map(v=>shellPoint(...v)),n,{ns:coords.map(v=>shellNormal(...v)),uv:coords.map(([l,t])=>[l*R,t*R*Math.cos((L+U)/2)]),tone:shade});
        g.face('cedar',coords.map(v=>shellPoint(...v,.105)),mul(n,-1),{
          ns:coords.map(v=>mul(shellNormal(...v),-1)),uv:coords.map(([l,t])=>[l*R,t*R*Math.cos((L+U)/2)]),tone:.98+.14*rr()});
      }
      // Raised double-locked seams and short, staggered cross joints.
      lineRib(g,'aged',L,0,L,PI,-.012,.044,.042,32);
      for(let j=i%2?2:4;j<nArc;j+=4){
        const t=PI*j/nArc;lineRib(g,'roof',L,t,U,t,-.012,.029,.022,3,.91);
      }
      if(i%2===0)lineRib(g,'cedar',L,0,L,PI,.158,.105,.150,32,.83);
    }
    for(let j=1;j<10;j++){
      const t=j*PI/10;
      lineRib(g,'cedar',side*GAP,t,side*max,t,.138,.12,.095,18,.91);
      if(j%2===0)lineRib(g,'aged',side*GAP,t,side*max,t,.195,.041,.028,18);
    }
    // Heavy capped edges make the open shutter readable against the sky.
    lineRib(g,'copper',side*GAP,0,side*GAP,PI,.008,.165,.25,48);
    lineRib(g,'brass',side*GAP,0,side*GAP,PI,-.113,.074,.042,48,.9);
    for(let j=1;j<16;j++){
      const t=j*PI/16,n=shellNormal(side*GAP,t),p=shellPoint(side*GAP,t,.15);
      g.cylinder('brass',p,add(p,mul(n,-.037)),.046,.035,8);
    }
    const tip=shellPoint(side*max,PI/2,.05);
    g.cylinder('aged',[tip[0],EAVE-.045,0],[tip[0],EAVE+.065,0],.11,.10,16);
  }
}
function southernShutter(g){
  // A short telescoping shutter still covers the low southern end of the
  // observing slot. The clear meridian extends across the zenith to the north.
  const span=GAP+.019,stop=.53,S=10,T=12;
  for(let i=0;i<S;i++)for(let j=0;j<T;j++){
    const l=span*(2*i/S-1),L=span*(2*(i+1)/S-1),t=stop*j/T,u=stop*(j+1)/T;
    const points=[[l,t],[L,t],[L,u],[l,u]],n=shellNormal((l+L)/2,(t+u)/2);
    g.face('roof',points.map(v=>shellPoint(...v,-.171)),n,{ns:points.map(v=>shellNormal(...v)),uv:points.map(([a,b])=>[a*R,b*R]),tone:.92+(i%3)*.022});
    g.face('cedar',points.map(v=>shellPoint(...v,-.045)),mul(n,-1),{ns:points.map(v=>mul(shellNormal(...v),-1)),uv:points.map(([a,b])=>[a*R,b*R]),tone:.86+j%3*.036});
  }
  for(const side of [-1,1]){
    lineRib(g,'aged',side*span,0,side*span,stop,-.108,.09,.165,16);
    lineRib(g,'copper',side*GAP*.42,0,side*GAP*.42,stop,-.185,.043,.041,16);
  }
  for(const t of [0,stop*.48,stop]){
    lineRib(g,t===stop?'copper':'aged',-span,t,span,t,-.13,.09,.19,12);
  }
}
export function buildDome(g){
  g.section('dome',true,()=>{
    g.sector('gunmetal',5.22,5.95,0,TAU,5.52,5.605,128);
    g.sector('copper',5.28,5.97,0,TAU,5.60,5.68,128);
    g.sector('roof',5.27,5.91,0,TAU,5.67,5.91,128);
    g.sector('brass',5.255,5.95,0,TAU,5.73,5.768,128,{tone:.92});
    g.sector('aged',5.20,5.99,0,TAU,5.867,5.947,128);
    for(let i=0;i<48;i++){
      const a=i*TAU/48;
      g.at(0,0,0,a,()=>{
        g.box('aged',0,5.79,5.915,.05,.15,.037);
        if(i%2===0){
          g.box('stone',0,5.285,5.185,.30,.27,.30,{tone:.98});
          g.box('gunmetal',0,5.41,5.105,.22,.10,.26);
          g.cylinder('copper',[-.095,5.49,5.065],[.095,5.49,5.065],.096,.096,16);
          g.box('brass',0,5.465,4.96,.081,.115,.034);
        }
      });
    }
    g.at(0,0,0,ROOF_YAW,()=>{leaves(g);southernShutter(g)});
  });
}
