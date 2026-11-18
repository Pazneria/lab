import {rng,pick,mix} from './workshop.js';
import {spineBase} from './art.js';
import {walnut,honey,dark,teal,iron,brass} from './architecture.js';

export function plaque(W,x,y,z,width,index,h=.072){
  W.box('brass',x,y,z,width+.025,h+.023,.016,'#9f8c66');
  const bot=1-(index+1)/8+.002,top=1-index/8-.002;
  W.panel('label',x,y,z+.010,width,h,'#fff6e3',[[.002,bot],[.998,bot],[.998,top],[.002,top]]);
}
export function book(W,x,y,z,w,h,d,id,lean=0){
  W.pose(x,y,z,0,0,lean,()=>{
    const col=spineBase(id),l=-w/2,R=w/2,back=-d,th=Math.min(.0035,w*.075);
    const v0=1-(Math.floor(id/16)+1)/8+.0008,v1=v0+1/8-.0016,xu=(id%16)/16;
    // Projecting boards, recessed page block, and a separately rounded cloth or leather spine.
    const pp=[[l+th,h-.002,-.008],[R-th,h-.002,-.008],[R-th,h-.002,back+.007],[l+th,h-.002,back+.007]];
    W.face('pages',pp,'#f3e8cb',[[0,0],[1,0],[1,1],[0,1]]);
    W.face('pages',[[R-th,.002,back+.007],[l+th,.002,back+.007],[l+th,h-.002,back+.007],[R-th,h-.002,back+.007]],'#efdfbd');
    W.face('pages',[[l+th,.002,back+.007],[R-th,.002,back+.007],[R-th,.002,-.008],[l+th,.002,-.008]],'#e9d7b3');
    const coverU0=xu+.0005,coverU1=xu+1/16-.0005;
    W.face('cover',[[R,0,0],[R,0,back],[R,h,back],[R,h,0]],'#ffffff',[[coverU0,v0],[coverU1,v0],[coverU1,v1],[coverU0,v1]]);
    W.face('plain',[[l,0,back],[l,0,0],[l,h,0],[l,h,back]],col);
    for(const [a,b] of [[l,l+th],[R-th,R]]){
      W.face('plain',[[a,h,0],[b,h,0],[b,h,back],[a,h,back]],col);
      W.face('plain',[[a,0,back],[b,0,back],[b,0,0],[a,0,0]],col);
      W.face('plain',[[b,0,back],[a,0,back],[a,h,back],[b,h,back]],col);
    }
    const side=[0,.22,.5,.78,1],bulge=Math.min(.011,w*.19);
    for(let i=0;i<4;i++){
      const f=side[i],g=side[i+1],a=l+f*w,b=l+g*w,az=Math.sin(Math.PI*f)*bulge,bz=Math.sin(Math.PI*g)*bulge;
      const u0=xu+(.007+f*.986)/16,u1=xu+(.007+g*.986)/16;
      W.face('spine',[[a,0,az],[b,0,bz],[b,h,bz],[a,h,az]],'#ffffff',[[u0,v0],[u1,v0],[u1,v1],[u0,v1]]);
      W.face('plain',[[a,h,az],[b,h,bz],[b,h,-.008],[a,h,-.008]],col);
    }
  });
}
export function flatStack(W,x,y,z,count,seed,scale=1){
  const r=rng(seed);let yy=y;
  for(let i=0;i<count;i++){
    const th=(.028+r()*.028)*scale,len=(.235+r()*.07)*scale,depth=(.175+r()*.052)*scale;
    W.at(x+(r()-.5)*.026,yy+th/2,z+(r()-.5)*.025,(r()-.5)*.15,()=>{
      W.pose(len/2,0,depth/2,0,0,Math.PI/2,()=>book(W,0,0,0,th,len,depth,Math.floor(r()*128)));
    });yy+=th+.001;
  }return yy;
}
function archiveBox(W,x,y,z,w,h,d,shade){
  W.box('paint',x,y+h/2,z-d/2,w,h,d,shade);W.box('paint',x,y+h-.013,z-d/2,w+.012,.037,d+.012,'#a89a7e');
  W.box('brass',x,y+h*.52,z+.002,w*.48,h*.34,.014,'#8f8063');
  W.box('plain',x,y+h*.52,z+.011,w*.39,h*.22,.007,'#d9c7a0');
  W.box('iron',x,y+h*.52,z+.018,w*.17,.009,.005,'#716d58');
}
function row(W,l,R,y,clear,depth,seed,compact){
  const r=rng(seed),width=R-l,mode=r();
  let left=l+.014,right=R-.013;
  if(mode<.24&&width>.62){
    const wide=clear>.30?1.13:.91,cnt=Math.max(1,Math.min(4,Math.floor(clear/(.061*wide))-1));
    flatStack(W,R-.175*wide,y,depth-.137,cnt,seed+912,wide);
    right-=.365*wide;
  }else if(mode<.32&&width>.65){
    archiveBox(W,l+.16,y,depth-.045,.281,clear*.54,depth*.72,pick(['#a49b83','#7c8375','#a79373'],r));
    left+=.32;
  }else if(mode<.51){
    const gap=(.07+r()*.16)*width;if(r()>.5)right-=gap;else left+=gap;
  }
  let x=left,n=0,groupLeft=0,setId=0,equal=false,height=0,d=0,typW=0;
  while(x+.025<=right && n<75){
    if(groupLeft<=0){
      groupLeft=1+Math.floor(r()*6);equal=r()>.50;setId=96+Math.floor(r()*4)*8+Math.floor(r()*3);
      height=Math.min(clear-.014,clear*(.60+.34*r()));typW=(.024+r()*.040)*(clear/.32)**.64;d=Math.min(depth-.022,height*(.61+.12*r()));
    }
    const w=typW*mix(equal?.93:.77,equal?1.07:1.26,r());
    const h=Math.min(clear-.011,height*mix(equal?.985:.89,equal?1.015:1.10,r()));
    const lean=n===0 && right-x>.29 && mode>.53 ? -( .09+r()*.12):0;
    const space=w+h*Math.abs(Math.sin(lean))+.002;
    if(x+space>right)break;
    const id=equal?setId++:Math.floor(r()*96);
    const front=depth-.029-r()*(equal?.012:.050);
    book(W,x+w/2,y,front,w,h,d,id,lean);x+=space;n++;groupLeft--;
    if(groupLeft===0 && !compact && r()>.57)x+=.018+r()*.046;
  }
}
function cabinetDoor(W,x,y,z,w,h,paint,color){
  W.box(paint,x,y,z,w,h,.039,color);
  W.box(paint,x,y,z+.022,w-.124,h-.112,.020,paint==='paint'?'#344b46':dark);
  for(const s of [-1,1]){
    W.box(paint,x+s*(w/2-.049),y,z+.039,.038,h-.065,.024,color);
    W.box(paint,x,y+s*(h/2-.044),z+.039,w-.058,.027,.024,color);
  }
}
export function bookcase(W,x,y,z,angle,options){
  const {width:w,height:h,bays,levels,seed,depth:d=.41,colour=walnut,painted=false,label=1,base=.46,compact=false}=options;
  const paint=painted?'paint':'wood',trim=painted?'#50625a':colour,r=rng(seed);
  W.at(x,y,z,angle,()=>{
    W.box('wood',0,h/2,.035,w,h,.07,'#735c48');
    const boards=Math.round(w/.21);
    for(let i=0;i<boards;i++)W.box('wood',-w/2+(i+.5)*w/boards,h/2,.085,w/boards-.007,h-.07,.043,pick(['#a18369','#9e8165','#94765d','#a98c6c'],r),{grain:'vertical'});
    W.box(paint,0,.065,d/2,w+.04,.13,d+.045,trim);
    if(base>.22){
      W.box(paint,0,base*.52,d/2,w,base*.86,d,trim);
      for(let i=0;i<bays;i++){
        const half=w/bays/2;
        for(let s=0;s<2;s++){
          const cx=-w/2+i*w/bays+half*(s+.5);
          cabinetDoor(W,cx,base*.53,d+.009,half-.023,base-.121,paint,trim);
          const hand=cx+(s?-.31:.31)*half;
          W.rod('brass',[hand,base*.62,d+.05],[hand,base*.62,d+.083],.019,.022,brass,9);
        }
      }
    }
    const bay=w/bays,t=.048,top=h-.145;
    for(let i=0;i<=bays;i++){
      const cx=-w/2+i*bay;
      W.box('wood',cx,(top+base)/2,d*.52,t,top-base,d-.017,colour);
      W.box(paint,cx,(top+base)/2,d+.004,i===0||i===bays?.079:.056,top-base,.046,trim);
      if(i===0||i===bays){
        W.box(paint,cx,base+.071,d+.009,.11,.143,.071,trim);
        W.box(paint,cx,top-.065,d+.009,.118,.128,.079,trim);
      }
    }
    for(let i=0;i<bays;i++){
      const X=-w/2+i*bay+bay/2;
      for(let j=0;j<levels;j++){
        const yy=base+(top-base)*j/levels,clear=(top-base)/levels-.041;
        W.box('wood',X,yy,d*.53,bay-.041,.044,d-.013,'#b99978');
        W.box('wood',X,yy-.009,d+.010,bay-.031,.052,.04,colour);
        W.box('wood',X,yy+.010,d+.033,bay-.036,.016,.016,'#b89c7c');
        row(W,X-bay/2+t*.57,X+bay/2-t*.57,yy+.023,clear,d,seed*137+i*41+j*111,compact);
        if(j%2===1&&i%2===0 && clear>.27){
          W.box('brass',X+.1,yy-.010,d+.032,.08,.026,.010,'#baa77e');
          W.box('plain',X+.1,yy-.010,d+.039,.057,.015,.003,'#d5c8a9');
        }
      }
    }
    W.box(paint,0,top+.05,d*.51,w+.055,.13,d+.092,trim);
    W.box('wood',0,h-.047,d*.52,w+.105,.067,d+.139,colour);
    W.box('wood',0,h-.003,d*.52,w+.166,.045,d+.186,'#b39879');
    W.box('wood',0,base-.019,d+.01,w+.087,.062,.085,colour);
    if(label>=0)plaque(W,0,top+.050,d+.064,Math.min(.78,w*.31),label,.067);
    W.solid(0,d/2,w+.081,d+.095,0,h,'bookcase');
  });
}
export function drawers(W,x,y,z,angle,w=2.0,h=1.04,d=.58,num=4){
  W.at(x,y,z,angle,()=>{
    W.box('wood',0,h/2,d/2,w,h,d,'#94785f');
    W.box('wood',0,.09,d/2,w+.09,.15,d+.09,dark);
    const count=Math.max(1,Math.round(w/1.04));
    for(let i=0;i<count;i++)for(let j=0;j<num;j++){
      const ww=(w-.12)/count,hh=(h-.24)/num,cx=-(w-.12)/2+ww*(i+.5),cy=.15+(j+.5)*hh;
      W.box('wood',cx,cy,d+.019,ww-.025,hh-.020,.049,j%2?'#c1a183':'#b99a7a');
      W.box('brass',cx,cy+.011,d+.052,.114,.047,.023,'#a79262');W.box('plain',cx,cy+.014,d+.065,.082,.026,.005,'#d0bd97');
      for(const s of [-1,1]){
        const xx=cx+s*ww*.289;
        for(const k of [-1,1])W.rod('brass',[xx+k*.055,cy+.015,d+.043],[xx+k*.055,cy-.010,d+.092],.012,.010,brass,8);
        W.rod('brass',[xx-.056,cy-.010,d+.092],[xx+.056,cy-.010,d+.092],.012,.012,brass,8);
      }
    }
    W.box('wood',0,h-.012,d/2,w+.12,.085,d+.132,honey);W.solid(0,d/2,w+.1,d+.10,0,h+.03,'plan chest');
  });
}
export function shelves(W){
  const west=-7.44,east=7.44,S=8.93;
  W.zone='west collections';
  bookcase(W,west,0,6.58,Math.PI/2,{width:3.61,height:3.12,bays:3,levels:6,seed:36,colour:'#a58b6e',label:1,base:.58});
  bookcase(W,west,0,2.60,Math.PI/2,{width:3.58,height:2.79,bays:3,levels:5,seed:82,painted:true,label:3,base:.61});
  bookcase(W,west,0,-8.38,Math.PI/2,{width:2.98,height:2.46,bays:3,levels:5,seed:12,colour:'#987d61',label:3,base:.42});
  // Two-sided low stacks give the western collection a browsable aisle.
  const ix=-4.88,iz=5.43,iw=2.90;
  bookcase(W,ix-.01,0,iz,-Math.PI/2,{width:iw,height:1.38,bays:3,levels:3,seed:94,depth:.33,painted:true,label:5,base:.14,compact:true});
  bookcase(W,ix+.01,0,iz,Math.PI/2,{width:iw,height:1.38,bays:3,levels:3,seed:193,depth:.33,painted:true,label:5,base:.14,compact:true});
  W.box('wood',ix,1.409,iz,.89,.057,iw+.19,'#dec3a0');
  W.zone='east collections';
  bookcase(W,east,0,-7.99,-Math.PI/2,{width:3.87,height:2.61,bays:4,levels:5,seed:68,label:2,base:.48});
  bookcase(W,east,0,.63,-Math.PI/2,{width:3.04,height:2.68,bays:3,levels:5,seed:291,label:6,base:.42,colour:'#b09574'});
  bookcase(W,east,0,3.96,-Math.PI/2,{width:2.97,height:2.42,bays:3,levels:5,seed:77,label:7,base:.35,painted:true});
  drawers(W,east,0,-3.58,-Math.PI/2,3.02,1.04,.63,5);
  W.zone='south collections';
  bookcase(W,4.83,0,S,Math.PI,{width:3.58,height:3.04,bays:3,levels:6,seed:87,label:6,base:.52});
  drawers(W,-4.51,0,S,Math.PI,2.49,1.14,.63,5);
  W.zone='gallery collections';
  bookcase(W,east,3.42,-4.44,-Math.PI/2,{width:3.49,height:2.54,bays:3,levels:5,seed:616,label:4,base:.57,colour:'#a78969'});
  bookcase(W,east,3.42,-.34,-Math.PI/2,{width:3.48,height:2.22,bays:3,levels:4,seed:729,label:2,base:.56,painted:true});
  drawers(W,east,3.42,-8.29,-Math.PI/2,2.44,.89,.57,4);
}
