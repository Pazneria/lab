"use strict";
globalThis.HouseArt=(()=>{
  function canvas(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
  function localNoise(seed){return ()=>((seed=(Math.imul(1664525,seed)+1013904223)>>>0)/4294967296);}
  const species=[
    null,['Monstera deliciosa','ARACEAE','Mexico · Central America','027'],
    ['Strelitzia reginae','STRELITZIACEAE','Eastern Cape · South Africa','042'],
    ['Dicksonia antarctica','DICKSONIACEAE','Tasmania · Australia','016'],
    ['Alocasia reginula','ARACEAE','Borneo · Malaysia','034'],
    ['Asplenium nidus','ASPLENIACEAE','Tropical Asia · Pacific','051'],
    ['Nephrolepis exaltata','NEPHROLEPIDACEAE','Tropical Americas','063']
  ];
  function atlas(){
    const sheet=canvas(2048,1024),ctx=sheet.getContext('2d'),r=localNoise(8631);
    for(let i=0;i<16;i++){
      const w=512,h=i===0?106:i===7?76:i===8?220:i===9||i===10?715:212;
      ctx.save();ctx.translate((i%4)*512,Math.floor(i/4)*256);ctx.scale(1,256/h);
      const plaque=i===0||i===7||i===11,slate=i===8,packet=i===9||i===10;
      ctx.fillStyle=plaque?'#30473f':slate?'#39463f':packet?'#c1ad84':'#d7d2b9';
      ctx.fillRect(0,0,w,h);
      for(let p=0;p<3800;p++){
        ctx.fillStyle=r()>.5?'rgba(255,248,208,.09)':'rgba(54,49,28,.075)';
        ctx.fillRect(r()*w,r()*h,.45+r()*1.6,.55+r()*1.68);
      }
      ctx.strokeStyle=plaque?'#a7a88a':slate?'#89917a':packet?'#6d7652':'#737f6b';ctx.lineWidth=2;ctx.strokeRect(7,7,w-14,h-14);
      ctx.textAlign='center';ctx.textBaseline='middle';
      if(plaque){
        ctx.fillStyle='#e4debf';ctx.font=i===0?'41px Baskervville,Georgia,serif':'bold 32px Baskervville,Georgia,serif';
        if(i===11){ctx.font='bold 43px Baskervville,Georgia,serif';ctx.fillText('ROOF VENTS',w/2,h*.43);ctx.font='22px monospace';ctx.fillText('OPEN  ↻',w/2,h*.69);}else ctx.fillText(i===0?'P A L M   H O U S E':'P O T T I N G   B A Y',w/2,h*.50);
      }else if(species[i]){
        const [name,family,place,no]=species[i];
        ctx.fillStyle='#4c6753';ctx.textAlign='left';ctx.font='bold 17px "Instrument Sans",Arial,sans-serif';ctx.fillText(family,30,36);
        ctx.textAlign='right';ctx.font='17px monospace';ctx.fillText('ACC. '+no,482,36);
        ctx.strokeStyle='#919680';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(29,61);ctx.lineTo(483,61);ctx.stroke();
        ctx.fillStyle='#243e32';ctx.textAlign='left';ctx.font='italic 37px Baskervville,Georgia,serif';
        ctx.fillText(name,29,111,455);
        ctx.fillStyle='#526553';ctx.font='21px Baskervville,Georgia,serif';ctx.fillText(place,30,166);
      }else if(slate){
        ctx.fillStyle='#c6cbb4';ctx.textAlign='left';ctx.font='italic 34px Baskervville,Georgia,serif';ctx.fillText('Propagation notes',29,43);
        ctx.strokeStyle='#819282';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(28,72);ctx.lineTo(480,68);ctx.stroke();
        ctx.font='italic 24px Baskervville,Georgia,serif';ctx.fillText('Fern spores   —   sow on damp loam',29,105);
        ctx.fillText('Cuttings   —   keep under glass',29,146);
        ctx.fillStyle='#a9b9a1';ctx.font='17px monospace';ctx.fillText('EAST RANGE     /     NOV.',30,189);
      }else if(packet){
        ctx.fillStyle='#3c5243';ctx.font='bold 30px Baskervville,Georgia,serif';ctx.fillText('BOTANICAL SEED',w/2,95);
        ctx.font='italic 42px Baskervville,Georgia,serif';ctx.fillText(i===9?'Caladium':'Asplenium',w/2,173);
        ctx.lineWidth=4;ctx.strokeStyle='#596b49';
        ctx.beginPath();ctx.moveTo(205,535);ctx.quadraticCurveTo(235,405,323,255);ctx.stroke();
        for(let j=0;j<11;j++){
          const t=j/11,x=213+t*105,y=500-t*222;
          for(const s of [-1,1]){
            ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+s*(55-24*t),y-6,x+s*(67-39*t),y-58+16*t);
            ctx.quadraticCurveTo(x+s*(23-9*t),y-42,x,y);ctx.stroke();
          }
        }
        ctx.font='23px monospace';ctx.fillText('CULTIVATION STOCK',w/2,620);
      }
      if(!packet){
        for(const x of [16,w-16]){
          ctx.fillStyle=slate?'#767567':'#8b8b71';ctx.beginPath();ctx.arc(x,h/2,3.1,0,Math.PI*2);ctx.fill();
          ctx.strokeStyle='#696a58';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(x-1.7,h/2+1);ctx.lineTo(x+1.7,h/2-1);ctx.stroke();
        }
      }
      ctx.restore();
    }
    return sheet;
  }
  // A wrapped, softly lit garden backdrop behind the glass. The navigable model ends at the apron.
  function garden(){
    const w=2048,h=768,c=canvas(w,h),g=c.getContext('2d'),r=localNoise(71388);
    let grad=g.createLinearGradient(0,0,0,h);
    for(const [at,col]of [[0,'#91b6c3'],[.22,'#c3d6d6'],[.39,'#e6e8d5'],[.50,'#e8e6cb'],[.56,'#a7ae91'],[.72,'#88937a'],[1,'#a3a38a']])grad.addColorStop(at,col);
    g.fillStyle=grad;g.fillRect(0,0,w,h);
    function circle(x,y,rx,ry,colour){
      g.fillStyle=colour;g.beginPath();g.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,Math.PI*2);g.fill();
    }
    const haze=canvas(512,130),hc=haze.getContext('2d'),im=hc.createImageData(512,130);
    const grids=[4,11,27,61].map(n=>({n,m:Math.max(2,Math.floor(n/4)),a:Array.from({length:n*Math.max(2,Math.floor(n/4))},()=>r())}));
    function smoothNoise(x,y,o){
      x=(x-Math.floor(x))*o.n;y=Math.max(0,Math.min(.999,y))*o.m;
      const i=Math.floor(x),j=Math.floor(y),k=(j+1)%o.m,l=(i+1)%o.n;
      x-=i;y-=j;x=x*x*(3-2*x);y=y*y*(3-2*y);
      return (o.a[j*o.n+i]*(1-x)+o.a[j*o.n+l]*x)*(1-y)+(o.a[k*o.n+i]*(1-x)+o.a[k*o.n+l]*x)*y;
    }
    for(let y=0;y<130;y++)for(let x=0;x<512;x++){const i=(y*512+x)*4,f=grids.reduce((sum,o,k)=>sum+smoothNoise(x/512,y/130,o)*[.46,.30,.16,.08][k],0);im.data[i]=249;im.data[i+1]=244;im.data[i+2]=220;im.data[i+3]=Math.max(0,(f-.36)*230);}
    hc.putImageData(im,0,0);g.drawImage(haze,0,0,w,h*.53);
    const sunx=w*.914,suny=h*.208,glow=g.createRadialGradient(sunx,suny,1,sunx,suny,240);
    glow.addColorStop(0,'rgba(255,247,209,.84)');glow.addColorStop(.16,'rgba(255,239,187,.54)');glow.addColorStop(1,'rgba(255,240,184,0)');
    g.fillStyle=glow;g.fillRect(0,0,w,h*.56);
    // Clusters are drawn with a wrapped copy so the equirectangular seam remains continuous.
    function wrapShape(x,width,draw){draw(x);if(x<width)draw(x+w);if(x>w-width)draw(x-w);}
    for(let layer=0;layer<3;layer++){
      const base=h*(.508+layer*.009),n=[97,74,57][layer];
      const palette=[['#b1b9a5','#bac1ab','#a9b49e','#b9bea8'],['#9fae96','#adba9d','#9bac95','#a5b399'],['#8c9f86','#96a88b','#9eac8f','#90a289']][layer];
      for(let j=0;j<n;j++){
        const x=(j+r()*.9)*w/n,treeH=(20+r()*35)*(1+.23*layer)+12*Math.sin(x/w*13+layer),rad=18+r()*27;
        const col=palette[Math.floor(r()*palette.length)],trunk=layer===2?'#929980':'#a5ae96';
        const lobes=Array.from({length:21},()=>[(r()-.5)*rad*1.75,(r()-.5)*treeH*.42,rad*(.19+r()*.29),treeH*(.13+r()*.22)]);
        const sprays=Array.from({length:layer===0?24:57},()=>{
          const l=lobes[Math.floor(r()*lobes.length)],ang=r()*Math.PI*2,radial=.5+r()*.53;
          return [l[0]+Math.cos(ang)*l[2]*radial,l[1]+Math.sin(ang)*l[3]*radial,1+r()*4,1+r()*3.1,r()>.52?'rgba(218,222,174,.20)':'rgba(64,86,64,.10)'];
        });
        wrapShape(x,rad*2,xx=>{
          g.strokeStyle=trunk;g.lineWidth=2+layer;g.beginPath();g.moveTo(xx,base+8);g.quadraticCurveTo(xx-3,base-.26*treeH,xx+2,base-treeH*.7);g.stroke();
          for(const l of lobes)circle(xx+l[0],base-treeH*.71+l[1],l[2],l[3],col);
          for(const q of sprays)circle(xx+q[0],base-treeH*.71+q[1],q[2],q[3],q[4]);
        });
      }
    }
    for(let j=0;j<14500;j++){
      const x=r()*w,y=h*(.516+r()*.484),a=r()*.07;
      circle(x,y,.6+r()*2.8,.3+r()*1.2,'rgba(52,74,36,'+a+')');
    }
    return c;
  }
  return {atlas,garden};
})();