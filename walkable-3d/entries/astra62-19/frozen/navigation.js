'use strict';
globalThis.HabitatWalk=(()=>{
 const R=.225;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function resolve(pos,items){
  for(let pass=0;pass<4;pass++){
   let touched=false;
   for(const ob of items){
    const dx=pos.x-ob.x,dz=pos.z-ob.z,cs=ob.cs,sn=ob.sn;
    let x=cs*dx-sn*dz,z=sn*dx+cs*dz,hx=ob.w*.5,hz=ob.d*.5;
    if(Math.abs(x)>hx+R||Math.abs(z)>hz+R)continue;
    let px=0,pz=0;
    if(ob.kind==='ellipse'){
     // A conservative radial offset leaves room for the walker's shoulders.
     const a=hx+R,b=hz+R,q=Math.hypot(x/a,z/b);
     if(q>=1)continue;
     if(q<.00001){px=a;}else{px=x/q-x;pz=z/q-z;}
    }else{
     let qx=x-clamp(x,-hx,hx),qz=z-clamp(z,-hz,hz),d2=qx*qx+qz*qz;
     if(d2>=R*R)continue;
     if(d2>1.e-12){const factor=R/Math.sqrt(d2)-1;px=qx*factor;pz=qz*factor;}
     else if(hx-Math.abs(x)<hz-Math.abs(z)){px=(x<0?-1:1)*(hx+R)-x;}
     else{pz=(z<0?-1:1)*(hz+R)-z;}
    }
    pos.x+=cs*px+sn*pz;pos.z+=-sn*px+cs*pz;touched=true;
   }
   if(!touched)break;
  }
  // Hard limits cover the short changes of hull width at the two bulkheads.
  const hw=pos.z<-4.75?3.2:pos.z<-1.45?3.3:3.75;
  pos.x=clamp(pos.x,-hw+R,hw-R);
  pos.z=clamp(pos.z,-8.12+R,5.3-R);
 }
 function prepare(items){return items.map(o=>({...o,cs:Math.cos(o.yaw),sn:Math.sin(o.yaw)}));}
 function move(pos,dx,dz,items){
  const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.085));
  for(let j=0;j<steps;j++){pos.x+=dx/steps;pos.z+=dz/steps;resolve(pos,items);}
 }
 function room(z){return z>=-1.45?'living':z>=-4.75?'work':'observation';}
 return {radius:R,prepare,move,resolve,room};
})();

