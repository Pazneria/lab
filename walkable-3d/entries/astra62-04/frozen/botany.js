"use strict";
PH.botany=(()=>{
  const {rand,pick,mix,clamp,TAU,add,sub,mul,norm,len,cross,lerp3,shift,rgb,tint,mat:M,solid,face,grid,tube,blob,lathe,box,beam,ao,plaque}=PH;
  const up=[0,1,0], ground=(x,z)=>PH.soilHeight(x,z);
  const vege=['3d7344','437847','537f49','64884b','467947','527e43'];
  // A blade has a curved central rib, a folded cross-section and unequal margins.
  function leaf(p,a,l,w,rise,fall,type,color,opt={}){
    const co=Math.cos(a),si=Math.sin(a),d=[co,0,si],s=[-si,0,co],phase=rand(0,TAU),lean=opt.lean??rand(-.34,.34),wind=rand(-.115,.115);
    const heart=type===M.monstera||type===M.heart||type===M.jewel,banana=type===M.banana,strap=type===M.strap;
    const scale=opt.scale??1,rows=opt.rows??(type===M.monstera?35:banana?16:strap?14:11),cols=opt.cols??(banana||type===M.monstera?8:4);
    const center=t=>add(p,add(mul(d,l*(.88*t+.12*t*t)),add(mul(s,l*wind*Math.sin(Math.PI*t)),[0,rise*Math.sin(t*Math.PI*.56)-fall*t*t,0])));
    const point=(u,v)=>{
      const q=u*2-1,abs=Math.abs(q),t=v,st=Math.sin(Math.PI*t);
      let profile=heart?(Math.pow(Math.max(0,st),.68)*.67+.55*Math.pow(1-t,.82)):(Math.pow(Math.max(0,st),banana?.67:.79)*(.86+.22*t));
      if(banana)profile*=.83+.28*t;
      const warp=1+.06*Math.sin(5.2*t+q*1.4+phase)*q;
      if(type===M.monstera){
        const cuts=Math.pow(.5+.5*Math.cos(TAU*(t*5.45+phase*.31+(q>0?.33:0))),8);
        profile*=1-cuts*.60*clamp((t-.1)*6)*clamp((.97-t)*9);
      }
      if(strap)profile*=1+.078*Math.sin(t*35+phase+q);
      const sideways=w*q*(.007+profile)*warp;
      const backward=(heart?-w*.94*Math.pow(1-t,3.6)*Math.sin(abs*Math.PI*.76):0)+l*(banana?.068:.078)*st*abs;
      const wLocal=w*profile;
      const height=wLocal*((banana?.23:strap?.42:-.16)*abs*abs+q*lean*(.5+t)+.075*Math.sin(t*(strap?32:15)+phase+q*2)*abs*abs);
      return add(center(t),add(mul(s,sideways),add(mul(d,backward),[0,height,0])));
    };
    const C=typeof color==='string'?rgb(color):color;
    grid(cols,rows,point,(u,v)=>tint(C,(.83+.17*v+.045*Math.sin(v*8+phase)+.045*(u-.5))*scale),type);
    if(opt.rib!==false&&l>.21){
      const path=[],r=[];
      for(let i=0;i<=9;i++){const t=i/9;path.push(shift(center(t),0,.002,0));r.push(Math.max(.0007,w*(banana?.035:.023)*(1-t)+.00085));}
      tube(path,r,tint(opt.vein|| (banana?'9bb170':'85a166'),rand(.87,1)),M.fiber,5);
    }
    return center(1);
  }
  function petiole(p,bend,end,r,c){
    const path=[],rs=[];
    for(let i=0;i<=5;i++){const t=i/5;path.push(lerp3(lerp3(p,bend,t),lerp3(bend,end,t),t));rs.push(r*mix(1,.50,t));}
    tube(path,rs,c,M.fiber,7);
  }
  function aroid(x,z,size,kind='monstera',elev=null){
    const y=elev??ground(x,z),initial=rand(0,TAU),N=kind==='monstera'?10:7;
    const trunk=kind==='monstera';
    const node=t=>[x+size*.17*Math.sin(initial+t*2.4),y+size*(.05+.85*t),z+size*.20*Math.cos(initial+t*1.7)];
    const nodes=Array.from({length:8},(_,i)=>node(i/7));
    tube(nodes,nodes.map((p,i)=>size*(.057+.014*Math.sin(i)-.003*i)),rgb('686947'),M.bark,9);
    for(let j=0;j<N;j++){
      const t=(j+.15)/N,a=initial+j*2.399+rand(-.27,.27),d=[Math.cos(a),0,Math.sin(a)];
      const base=node(t),e=add(base,add(mul(d,size*rand(.24,.48)),[0,size*(.18+.38*t+rand(.03,.14)),0]));
      petiole(base,add(base,add(mul(d,.12*size),[0,.32*size,0])),e,size*.021,tint(trunk?'84965b':'7b7351',rand(.78,1.08)));
      const m=trunk?(j<2?M.heart:M.monstera):M.jewel;
      const color=trunk?pick(['3d7951','36734a','487e4b','55894e','568650','326b43']):pick(['425e48','365a40','496c4e','456846']);
      leaf(e,a+rand(-.27,.27),size*rand(.52,.83),size*rand(.28,.42),size*rand(.06,.29),size*rand(.14,.32),m,color,{vein:trunk?'8b9b65':'b1bb8e'});
      if(trunk&&j%2===0){
        const p=node(t+.025),dx=rand(-.25,.25)*size,dz=rand(-.2,.2)*size;
        tube([p,shift(p,dx*.4,-size*.08,dz*.4),[p[0]+dx,y+.13,p[2]+dz],[p[0]+dx+.087,y-.015,p[2]+dz-.055]],[.013,.009,.006,.002].map(n=>n*size),rgb('857358'),M.fiber,5);
      }
    }
    ao(x,z,1.05*size,1.12*size,.38);
  }
  // Distichous bird-of-paradise fans, with their peeling overlapping sheaths.
  function strelitzia(x,z,scale,heading,flower=true,elev=null){
    const y=elev??ground(x,z),N=9;
    for(let j=0;j<N;j++){
      const side=j%2?1:-1,near=j/(N-1),a=heading+(side<0?Math.PI:0)+rand(-.39,.39);
      const d=[Math.cos(a),0,Math.sin(a)],rad=scale*rand(.26,.63)*(1-.58*near);
      const p=[x+rand(-.055,.055)*scale,y-.02,z+rand(-.06,.06)*scale];
      const e=add(p,add(mul(d,rad),[0,scale*(.45+.68*near+rand(-.08,.11)),0]));
      const base=shift(p,0,.16*scale,0);
      petiole(p,add(base,add(mul(d,rad*.23),[0,scale*.55,0])),e,scale*rand(.029,.044),tint(pick(['96a668','9ea16d','849b60','899667']),rand(.84,1.03)));
      if(j<6){
        const skinPath=[shift(p,0,.025,0),add(p,add(mul(d,.049*scale),[0,.26*scale,0])),add(p,add(mul(d,.075*scale),[0,scale*rand(.31,.52),0]))];
        tube(skinPath,[.061*scale,.035*scale,.003],rgb(pick(['9e976a','ac966c','758558'])),M.bark,8);
      }
      const golden=j===0&&rand()<.55;
      leaf(e,a,scale*rand(.60,.97)*(1-near*.29),scale*rand(.19,.27),scale*(.19+.5*near),scale*rand(.10,.38),golden?M.litter:M.banana,golden?'aa9a55':pick(['497e50','518858','5c9055','4f874e','59895d','67965c']),{lean:rand(-.48,.45),vein:'abb783'});
    }
    // One tightly furled emerging blade.
    const p=[x,y,z],end=shift(p,.10*scale,1.57*scale,.04*scale);
    tube([p,lerp3(p,end,.58),end,shift(end,.025*scale,.18*scale,.027*scale)],[.047,.032,.018,.001].map(v=>v*scale),rgb('a1b96d'),M.strap,8);
    if(flower){
      for(let k=0;k<2;k++){
        const a=heading+.91+k*2.72,d=[Math.cos(a),0,Math.sin(a)],l=[-d[2],0,d[0]],p=[x,y,z];
        const e=add(p,add(mul(d,(.39+.18*k)*scale),[0,(.78+.12*k)*scale,0]));
        petiole(p,shift(p,0,.57*scale,0),e,.018*scale,rgb('82915d'));
        const b=shift(e,0,-.03,0),tip=add(e,add(mul(d,.31*scale),[0,.076*scale,0]));
        tube([b,lerp3(e,tip,.3),lerp3(e,tip,.7),tip],[.035,.049,.029,.001].map(v=>v*scale),(i)=>lerp3(rgb('a57553'),rgb('536e67'),i/3),M.fiber,8);
        for(let h=0;h<5;h++){
          const p0=lerp3(e,tip,.10+.09*h),length=scale*rand(.10,.17);
          const p1=add(p0,add(mul(d,length*(h/5-.55)),[0,length*.51,0]));
          const p2=add(p1,add(mul(d,length*(h/4-.55)),add([0,length*.50,0],mul(l,length*rand(-.24,.24)))));
          tube([p0,p1,p2],[.01*scale,.018*scale,.0008],rgb(pick(['ed9a33','d78329','f1b54d'])),M.fiber,5);
        }
        tube([lerp3(e,tip,.35),add(lerp3(e,tip,.55),[0,.06*scale,0]),add(tip,[0,.066*scale,0])],[.011*scale,.014*scale,.001],rgb('496286'),M.fiber,6);
      }
    }
    ao(x,z,1.09*scale,1.2*scale,.43);
  }
  // Folded fern pinnules are solid geometry without transparent cards.
  function pinnule(a,b,width,c,m=M.fern){
    const d=sub(b,a),s=mul(norm([-d[2],0,d[0]]),width),n=norm([-.18*d[0],1,-.18*d[2]]);
    const mid=lerp3(a,b,.43),k=solid.n;
    solid.vertex(a,n,[.5,0],tint(c,.86),m);
    solid.vertex(add(mid,s),norm(add(n,mul(s,3))),[1,.40],c,m);
    solid.vertex(shift(mid,0,width*.31,0),n,[.5,.4],tint(c,1.05),m);
    solid.vertex(sub(mid,s),norm(sub(n,mul(s,3))),[0,.4],tint(c,.91),m);
    solid.vertex(b,n,[.5,1],c,m);
    solid.tri(k,k+2,k+1);solid.tri(k,k+3,k+2);solid.tri(k+1,k+2,k+4);solid.tri(k+2,k+3,k+4);
  }
  function fernFrond(base,a,reach,rise,drop,c,compound){
    const d=[Math.cos(a),0,Math.sin(a)],s=[-d[2],0,d[0]],wind=rand(-.11,.11);
    const pos=t=>add(base,add(mul(d,reach*t),add(mul(s,reach*wind*t*t),[0,rise*Math.sin(t*Math.PI*.59)-drop*t*t,0])));
    const path=Array.from({length:11},(_,i)=>pos(i/10));
    tube(path,path.map((p,i)=>Math.max(.001,reach*.009*(1-i/10))),tint('879459',rand(.83,1)),M.fiber,5);
    const N=compound?17:13;
    for(let i=0;i<N;i++)for(const side of [-1,1]){
      const t=.10+.86*(i+(side>0?.22:0))/N,root=pos(t);
      const width=reach*(compound?.215:.18)*Math.pow(Math.sin(Math.PI*t),.67)*(1-.22*t)*rand(.85,1.07);
      const tip=add(root,add(mul(s,side*width),add(mul(d,width*(.31+.52*t)),[0,-width*(.09+.12*t),0])));
      if(compound){
        const mid=shift(lerp3(root,tip,.5),0,width*.13,0),pinnaDir=norm(sub(tip,root));
        const off=norm([-pinnaDir[2],0,pinnaDir[0]]);
        const fn=u=>lerp3(lerp3(root,mid,u),lerp3(mid,tip,u),u);
        pinnule(root,tip,width*.024,tint(c,.86));
        const segs=i>N-4?5:8;
        for(let k=0;k<segs;k++)for(const hand of [-1,1]){
          const u=(k+.27)/segs,p=fn(u);
          const leaflet=width*.25*(.39+.66*Math.pow(Math.sin(Math.PI*(u+.11)*.88),.61))*(1-.25*u);
          const dest=add(p,add(mul(off,hand*leaflet),add(mul(pinnaDir,leaflet*(.51+.29*u)),[0,-leaflet*.19,0])));
          pinnule(p,dest,Math.max(.0022,width*.055*(1-.58*u)),tint(c,rand(.86,1.11)));
        }
      }else pinnule(root,tip,width*.17,tint(c,rand(.9,1.07)));
    }
  }
  function treeFern(x,z,height,radius,reach,heading){
    const y=ground(x,z),sway=rand(-.18,.18),lean=rand(-.16,.16);
    const node=t=>[x+sway*t*t,y+height*t,z+lean*Math.sin(t*1.55)];
    const path=Array.from({length:12},(_,i)=>node(i/11));
    (PH.fernRecords ||= []).push({base:path[0],crown:path[11],height,radius});
    tube(path,path.map((p,i)=>radius*(1+.30*Math.exp(-i*.63)+.11*Math.sin(i*.7))),rgb('746149'),M.bark,18);
    // The woolly stem is layered in abandoned petiole bases and trailing root fibres.
    for(let j=0;j<Math.ceil(height/.115);j++){
      const t=j*.115/height;
      for(let k=0;k<7;k++){
        const a=k*TAU/7+j*.47+rand(-.13,.13),d=[Math.cos(a),0,Math.sin(a)],s=[-d[2],0,d[0]],p=add(node(t),mul(d,radius*(1.03+.17*Math.exp(-t*8))));
        const extent=rand(.032,.066),q=shift(add(p,mul(d,extent)),0,.073,0);
        const C=rgb(pick(['6b553e','8a7354','6a6145','7d6146','968166']));
        face([shift(p,0,-.078,0),add(p,mul(s,.039)),q],C,M.bark);
        face([shift(p,0,-.078,0),q,sub(p,mul(s,.041))],tint(C,.81),M.bark);
        if(k%2===0&&j%2===0){
          const end=add(node(Math.max(0,t-.19)),mul(d,radius*1.09));
          tube([q,add(lerp3(q,end,.38),mul(d,.026)),end],[.0055,.0036,.001],tint(C,.89),M.fiber,4);
        }
      }
    }
    for(let k=0;k<12;k++){
      const a=heading+k*2.399+rand(-.14,.14),earlier=k<4,small=k>9;
      const p=shift(node(1),Math.cos(a)*radius*.42,rand(-.035,.032),Math.sin(a)*radius*.42);
      fernFrond(p,a,reach*(small?.64:rand(.83,1.05)),reach*(small?.51:earlier?.20:.36),reach*(earlier?.47:small?.09:.25),rgb(pick(['5b8845','658e4a','638641','749749','4c7842','77964b'])),true);
    }
    for(let j=0;j<7;j++){
      const a=rand(0,TAU),p=node(rand(.88,.98)),d=[Math.cos(a),0,Math.sin(a)],ext=rand(.15,.39);
      tube([p,add(p,add(mul(d,ext*.68),[0,.04,0])),add(p,add(mul(d,ext),[0,-rand(.08,.31),0]))],[.037,.025,.011],rgb(pick(['897457','75634c','a08b68'])),M.bark,7,true);
    }
    for(let j=0;j<2;j++){
      const a=heading+j*2.4,d=[Math.cos(a),0,Math.sin(a)],p=node(.99),p1=shift(add(p,mul(d,.14)),0,.29+.10*j,0);
      const curl=[p,shift(p,0,.17,0),p1];
      for(let k=0;k<=19;k++){const t=k/19,r=.095*(1-.76*t),q=t*Math.PI*2.05;curl.push(add(p1,add(mul(d,r*Math.sin(q)),[0,.091-r*Math.cos(q),0])));}
      tube(curl,curl.map((q,k)=>mix(.025,.009,k/(curl.length-1))),rgb('82924b'),M.fiber,7);
    }
    ao(x,z,reach*1.05,reach*1.12,.58);
  }
  function rosette(x,z,size,elev=null){
    const y=elev??ground(x,z),offset=rand(0,TAU),N=Math.floor(rand(12,17));
    for(let i=0;i<N;i++){
      const young=i/N,a=offset+i*2.399+rand(-.17,.17),l=size*(.71-.37*young)*rand(.83,1.19);
      const base=[x+Math.cos(a)*.025*size,y,z+Math.sin(a)*.025*size];
      leaf(base,a,l,size*rand(.085,.12)*(1-.21*young),size*(.40+.40*young),size*(.30-.21*young),M.strap,pick(['7b9c51','89a854','719747','96ab59','688e4b']),{rib:size>.75,cols:4,rows:13,lean:rand(-.26,.26)});
    }
    ao(x,z,size*.67,size*.67,.31);
  }
  function softFern(x,z,size,elev=null){
    const y=elev??ground(x,z),a0=rand(0,TAU);
    for(let i=0;i<8;i++)fernFrond([x,y,z],a0+i*2.399,size*rand(.62,1.07),size*rand(.26,.65),size*rand(.13,.43),rgb(pick(['60914e','699947','73954b','598344'])),false);
    ao(x,z,size*.76,size*.76,.25);
  }
  function runningVine(path,spacing,size){
    const c=rgb('73805a');
    tube(path,path.map((p,i)=>mix(.019,.004,i/(path.length-1))*size),c,M.fiber,6);
    let walked=0,seq=0;
    for(let j=1;j<path.length;j++){
      const start=path[j-1],end=path[j],span=len(sub(end,start));
      for(let s=spacing-walked;s<=span;s+=spacing){
        const p=lerp3(start,end,s/span),a=seq++*2.39+.3*j,root=shift(p,Math.cos(a)*.082*size,.032*size,Math.sin(a)*.082*size);
        tube([p,root],.0048*size,c,M.fiber,4);
        leaf(root,a,size*rand(.12,.23),size*rand(.07,.11),size*rand(.01,.09),size*rand(.09,.17),M.heart,pick(['718e51','6b8949','527748','829653','4c7649']),{rib:false,cols:4,rows:6,lean:rand(-.57,.57)});
        if(seq%3===1){
          const l=rand(.08,.27)*size;
          tube([p,shift(p,.028,-l*.35,.016),shift(p,.018,-l,.024)],[.0032,.002,.0007],rgb('8b7557'),M.fiber,4);
        }
      }
      walked=(walked+span)%spacing;
    }
  }
  function marker(x,z,angle,id,y=.41,h=.37){
    const right=[Math.cos(angle),0,-Math.sin(angle)],front=[Math.sin(angle),0,Math.cos(angle)],upTilt=add(mul(up,.91),mul(front,-.40));
    const p=[x,y+h,z];
    beam([x,y-.03,z],p,.021,.018,rgb('7c8170'),M.zinc);
    plaque(p,right,upTilt,.35,.145,id);
    const back=sub(p,mul(front,.006));face([add(add(back,mul(right,-.175)),mul(upTilt,-.0725)),add(add(back,mul(right,.175)),mul(upTilt,-.0725)),add(add(back,mul(right,.175)),mul(upTilt,.0725)),add(add(back,mul(right,-.175)),mul(upTilt,.0725))],rgb('586653'),M.zinc);
  }
  function moss(x,y,z,sz){
    const C=rgb(pick(['768148','819253','73804e','8c9659','667744']));
    blob(x,y,z,sz,sz*.28,sz*rand(.65,1.25),C,M.moss,3,8,.22);
  }
  return {leaf,petiole,aroid,strelitzia,treeFern,rosette,softFern,runningVine,marker,moss,pinnule};
})();