'use strict';
const Yard = (() => {
  const {PI,TAU,rand,pick,shade,blend,M,at,area,box,beam,cyl,rod,ring,tube,contact,collider,sign,face}=G;
  const wood='927554',oak='a6845b',pale='b79d78',dark='50463a',iron='454844',paint='647e75',cream='d8cbb4',plaster='cec8b8';
  const HEIGHT=3.44;
  function post(x,y,z,w,h,d,c=wood){box(x,y,z,w,h,d,c,M.wood,.009);}
  function panel(x,y,z,w,h,d,c,m=M.wood){box(x,y,z,w,h,d,c,m,.006);}
  function peg(x,y,z,size=.018,c='453c30'){G.blob(x,y,z,size,size,size*.4,c,M.iron,.03,8);}
  function notice(x,y,z,w,h,theme,lines){
    panel(x,y,z,w,h,.023,theme==='green'?'445d51':theme==='blue'?'586c73':'a99a7e');
    sign(x,y,z+.013,w*.97,h*.94,theme,lines);
    for(const a of [-1,1])for(const b of [-1,1])peg(x+a*(w/2-.029),y+b*(h/2-.022),z+.017,.005);
  }
  function wallPiece(a,b,y0=0,y1=HEIGHT,paneling=true){
    const w=b-a;if(w<=.001)return;
    box((a+b)/2,(y0+y1)/2,-.095,w,y1-y0,.19,plaster,M.plaster);
    if(y0===0){
      collider((a+b)/2,-.087,w,.19);
      if(paneling){
        const ph=Math.min(y1,.91),cnt=Math.ceil(w/.145);
        for(let i=0;i<cnt;i++)box(a+w*(i+.5)/cnt,.5*ph,.021,w/cnt-.002,ph,.047,shade('7c8273',rand(.91,1.04)),M.wood);
        panel((a+b)/2,.061,.056,w,.122,.046,'666c60');
        panel((a+b)/2,ph-.003,.047,w,.052,.071,'73786a');
      }
    }
  }
  function doorFrame(x,w,h){
    for(const s of [-1,1]){
      post(x+s*(w/2+.003),h/2,.02,.14,h,.26,'85735c');
      panel(x+s*(w/2+.02),h/2,.154,.142,h,.038,'9a8870');
    }
    post(x,h+.068,.009,w+.25,.156,.29,'8f7b60');
    panel(x,h+.076,.159,w+.31,.143,.04,'a18b6b');
    box(x,.008,-.015,w,.016,.30,'a89980',M.stone,.004);
  }
  function windowUnit(a,b,sill,head,cols,rows){
    const w=b-a,h=head-sill;
    wallPiece(a,b,0,sill);wallPiece(a,b,head,HEIGHT);
    box((a+b)/2,(sill+head)/2,-.105,w,h,.014,'c5d5cb',M.glass);
    for(const s of [a,b])post(s,sill+h/2,-.03,.088,h+.13,.14,'858f7f');
    for(const y of [sill,head])panel((a+b)/2,y,-.006,w+.16,.095,.18,'8b9584');
    panel((a+b)/2,sill-.03,.085,w+.2,.075,.32,'9b8a70');
    for(let i=1;i<cols;i++)post(a+w*i/cols,(sill+head)/2,-.036,.039,h,.065,'6e7f73');
    for(let j=1;j<rows;j++)panel((a+b)/2,sill+h*j/rows,-.03,w,.038,.066,'728276');
    for(const fraction of [.25,.75]){
      const xx=a+w*fraction,yy=sill+.071;
      panel(xx,yy,.045,.074,.041,.020,'777661',M.iron);
      rod([xx,yy,.05],[xx,yy,.095],.009,'9e916c',M.iron,9);
      rod([xx,yy,.095],[xx+.066,yy+.018,.101],.008,'91866a',M.iron,9);
      for(const s of [-1,1])peg(xx+s*.024,yy,.058,.004,'625f4e');
    }
  }
  function sashDoor(x,w,h){
    at(x,0,0,0,()=>{
      panel(0,h*.5,.025,w,h,.095,paint);
      for(let i=0;i<8;i++){let a=(i+.5)/8*w-w/2;box(a,.54,.084,w/8-.004,1.05,.038,shade(paint,rand(.91,1.06)),M.wood);}
      box(0,1.67,.081,w-.27,.92,.024,'bcc9b9',M.glass);
      for(const s of [-1,1])post(s*(w/2-.06),h/2,.102,.12,h,.062,paint);
      for(const yy of [.13,1.13,h-.08])panel(0,yy,.105,w,.14,.07,paint);
      panel(0,1.67,.108,w-.21,.032,.05,paint);
      post(0,1.65,.108,.032,1.03,.05,paint);
      for(const yy of [.32,1.95]){panel(-w*.35,yy,.14,.31,.043,.013,iron);peg(-w*.27,yy,.149,.012);}
      panel(w*.32,1.05,.142,.056,.19,.017,'545348',M.iron);rod([w*.32,1.1,.15],[w*.32,1.10,.21],.014,iron);rod([w*.32,1.10,.21],[w*.32-.10,1.1,.21],.015,iron);
    });
  }
  function studioShell(){
    area('studio-shell',()=>{
      // Reclaimed floorboards, with staggered end joints and a continuous subfloor.
      box(0,-.115,1.55,10.45,.18,10.3,'4d473c',M.wood);
      const rows=51,d=10.14/rows;
      for(let i=0;i<rows;i++){
        const z=-3.52+(i+.5)*d;let x=-5.14;
        for(let j=0;x<5.14;j++){
          const l=Math.min(5.14-x,j===0?rand(.8,3):rand(2.3,4.65));
          box(x+l/2,-.015,z,l-.004,.03,d-.0035,shade('998a72',rand(.84,1.10)),M.wood);
          if(l>.42&&i%2===0)for(const xx of [x+.053,x+l-.055])for(const zz of [-1,1]){
            const verts=Array.from({length:5},(_,k)=>[xx+.0055*Math.cos(k*TAU/5),.00065,z+zz*.051+.0038*Math.sin(k*TAU/5)]);
            face(verts,'625849',M.iron,[0,1,0]);}
          x+=l;
        }
      }
      at(0,0,-3.5,0,()=>{
        wallPiece(-5.16,-4.61);wallPiece(-2.38,2.14);wallPiece(4.51,5.15);
        wallPiece(-4.61,-2.38,2.64);wallPiece(2.14,4.51,2.64);
        doorFrame(-3.495,2.23,2.64);doorFrame(3.325,2.37,2.64);
        notice(3.315,2.977,.035,1.38,.225,'green',['GLAZE ROOM   →']);
        notice(-3.51,2.98,.032,1.10,.20,'bone',['KILN YARD']);
        // The high transom puts northern sky above the pottery library.
        const gw=1.34,lo=3.68,hi=4.27,shoulder=4.96-gw*1.52/5.15;
        const sections=[
          [[-5.15,HEIGHT],[-gw,HEIGHT],[-gw,shoulder]],
          [[gw,HEIGHT],[5.15,HEIGHT],[gw,shoulder]],
          [[-gw,HEIGHT],[gw,HEIGHT],[gw,lo],[-gw,lo]],
          [[-gw,hi],[gw,hi],[gw,shoulder],[0,4.96],[-gw,shoulder]]
        ];
        for(const outline of sections)for(const s of [-1,1]){
          const zz=s>0?-.055:-.14;
          face(outline.map(([x,y])=>[x,y,zz]),s>0?'c0bbaa':'c4bfae',M.plaster,[0,0,s],outline);
        }
        box(0,(lo+hi)/2,-.101,2*gw,hi-lo,.015,'c9d4c8',M.glass);
        for(const x of [-gw,gw])post(x,(lo+hi)/2,-.088,.083,hi-lo+.078,.187,'788778');
        for(const y of [lo,hi])panel(0,y,-.086,gw*2+.11,.081,.19,'839080');
        for(let j=1;j<5;j++)post(-gw+2*gw*j/5,(lo+hi)/2,-.09,.037,hi-lo,.087,'7a8b7c');
        panel(0,lo+.248,-.087,gw*2,.029,.093,'819082');
      });
      at(-5.13,0,1.55,PI/2,()=>{
        wallPiece(-5.10,-3.83);windowUnit(-3.83,-.65,1.18,2.96,4,2);
        wallPiece(-.65,.06);windowUnit(.06,3.91,1.18,2.96,5,2);wallPiece(3.91,5.10);
      });
      at(5.13,0,1.55,-PI/2,()=>{
        wallPiece(-5.10,1.98);windowUnit(1.98,4.35,1.50,2.94,3,2);wallPiece(4.35,5.10);
      });
      at(0,0,6.6,PI,()=>{
        wallPiece(-5.17,-2.16);wallPiece(-2.16,-.62,2.5);wallPiece(-.62,5.17);
        collider(-1.39,-.05,1.54,.21);doorFrame(-1.39,1.54,2.50);sashDoor(-1.39,1.43,2.44);
        face([[-5.15,HEIGHT,-.05],[5.15,HEIGHT,-.05],[0,4.96,-.05]],'c5bdaa',M.plaster,[0,0,1]);
      });
      const roofY=x=>4.96-Math.abs(x)*.293;
      // Boarded roof with an actual opening for the wired-glass roof light.
      const roofPanel=(a,b,z0,z1,glass=false)=>{
        const h=roofY(b)-roofY(a),l=Math.hypot(b-a,h),u=[(b-a)/l,h/l,0],v=[-h/l,(b-a)/l,0];
        G.basis([(a+b)/2,(roofY(a)+roofY(b))/2,(z0+z1)/2],u,v,[0,0,1],()=>{
          box(0,0,0,l-.002,glass?.017:.096,z1-z0-.001,glass?'dce2d3':shade('7e735f',rand(.92,1.09)),glass?M.glass:M.wood);
        });
      };
      for(const [a,b,split] of [[-5.35,-3.95,false],[-3.95,-1.68,true],[-1.68,0,false],[0,5.35,false]]){
        const n=Math.ceil((b-a)/.257);
        for(let i=0;i<n;i++){const lo=a+(b-a)*i/n,hi=a+(b-a)*(i+1)/n;
          if(split){roofPanel(lo,hi,-3.79,-1.86);roofPanel(lo,hi,2.40,6.86);}
          else roofPanel(lo,hi,-3.79,6.86);
        }
        if(split){roofPanel(a,b,-1.86,2.40,true);for(let j=0;j<=4;j++){
          const z=-1.86+j*4.26/4;beam([a,roofY(a)-.035,z],[b,roofY(b)-.035,z],.046,.046,'879180',M.iron);}
          for(const x of [a,(a+b)/2,b])box(x,roofY(x)-.04,.27,.055,.065,4.37,'7e8477',M.iron);
        }
      }
      for(const z of [-3.81,6.88])for(const s of [-1,1])
        beam([s*5.37,roofY(5.37)-.022,z],[0,4.98,z],.123,.079,'6a7e70',M.wood,.006);
      for(const s of [-1,1])post(s*5.30,roofY(5.30)-.032,1.53,.092,.151,10.74,'708273');
      post(0,5.017,1.535,.136,.054,10.75,'85877a');
      for(const z of [-3.43,-.94,1.59,4.13,6.52]){
        for(const s of [-1,1]){
          post(s*5.03,1.71,z,.172,3.42,.186,'897357');
          beam([s*5.19,3.37,z],[0,4.88,z],.13,.158,'8e795d',M.wood,.005);
          beam([s*4.98,2.77,z],[s*4.36,3.43,z],.106,.13,'8a785c');
        }
        if(z===-3.43||z===1.59||z===6.52){
          post(0,3.45,z,10.25,.19,.17,'897559');
          post(0,4.15,z,.13,1.36,.14,'947d60');
          for(const s of [-1,1])beam([s*.03,3.54,z],[s*2.21,4.19,z],.1,.115,'8e795f');
          for(const x of [-4.86,0,4.87]){box(x,3.45,z+.092,.105,.16,.014,'5b5a4b',M.iron);peg(x,3.46,z+.104,.02);}
        }
      }
      for(const x of [-5.02,-2.61,0,2.59,5.01])post(x,roofY(x)-.095,1.55,.128,.15,10.16,'877257');
    });
  }
  function glazeShell(){
    area('glaze-shell',()=>{
      box(2.84,-.087,-6.56,4.57,.16,6.25,'8a8a78',M.stone);
      for(let j=0;j<9;j++)for(let i=0;i<6;i++){
        const w=4.57/6,d=6.24/9;box(.555+(i+.5)*w,-.014,-9.71+(j+.5)*d,w-.011,.027,d-.011,shade('a69e87',rand(.94,1.05)),M.stone,.003);
      }
      at(5.13,0,-6.60,-PI/2,()=>{wallPiece(-3.1,3.1,0,2.98,false);panel(0,.09,.017,6.17,.17,.1,'838674');});
      at(2.85,0,-9.69,0,()=>{wallPiece(-2.3,2.32,0,2.49,false);});
      // Asymmetric pent roof, open on the west to the kiln court.
      const bottom=x=>3.07+(x-.48)*.103;
      for(let i=0;i<22;i++){
        const x=.26+(i+.5)*4.99/22;
        box(x,bottom(x),-6.57,4.99/22+.005,.068,6.60,shade('909783',rand(.93,1.045)),M.wood);
      }
      for(let j=0;j<14;j++){
        const za=-9.89+j*6.64/14,zb=za+6.64/14-.002;
        const coords=[[.22,bottom(.22)+.059,za],[5.28,bottom(5.28)+.059,za],[5.28,bottom(5.28)+.059,zb],[.22,bottom(.22)+.059,zb]];
        face(coords,shade('829488',rand(.94,1.04)),M.iron,G.unit([-.103,1,0]),[[0,0],[5.06,0],[5.06,.47],[0,.47]]);
        beam([.22,bottom(.22)+.066,za],[5.28,bottom(5.28)+.066,za],.021,.021,'829184',M.iron);
      }
      for(const z of [-9.66,-7.61,-5.55,-3.51]){
        beam([.30,3.002,z],[5.20,3.51,z],.111,.135,'8a8168');
      }
      for(const z of [-9.58,-6.55,-3.64]){
        post(.57,1.52,z,.142,3.04,.16,'8c8065');
        collider(.57,z,.15,.17);
        for(const s of [-1,1])if(z+s*.53<-3.53&&z+s*.53>-9.63)beam([.57,2.46,z],[.57,2.92,z+s*.5],.086,.09,'8c8065');
      }
      post(.57,2.96,-6.56,.16,.15,6.39,'82765e');
      post(.29,3.072,-6.57,.075,.186,6.66,'627b70');
      // Cast-iron rainwater goods along the open edge.
      rod([.219,3.006,-9.86],[.219,3.006,-3.36],.055,'65746b',M.iron,12);
      tube([[.23,3,-9.53],[.18,2.91,-9.53],[.30,2.75,-9.53],[.42,2.68,-9.53],[.42,.27,-9.53],[.35,.18,-9.45]],.048,'607267',M.iron,12);
    });
  }
  function yardShell(){
    area('court-shell',()=>{
      box(-2.28,-.085,-6.62,5.73,.155,6.28,'85816e',M.stone);
      // Offset courses of sandstone paving with softened edges and occasional repairs.
      const z0=-9.75,d=.492;
      for(let j=0;j<13;j++){
        let x=-5.19;while(x<.55){let w=Math.min(.55-x,rand(.65,1.27));if(.55-x<1.41)w=.55-x;
          box(x+w*.5,-.021,z0+(j+.5)*d,w-.011,.041,d-.014,shade(pick(['ada68c','b4aa90','a49d84','b4ac95']),rand(.95,1.025)),M.stone,.006);x+=w;
        }
      }
      // Rubble walls with lime mortar, coping and lichen.
      for(const [x,z,w,angle,h] of [[-5.16,-6.60,6.29,PI/2,2.21],[-2.31,-9.74,5.82,0,2.23]]){
        at(x,0,z,angle,()=>{
          box(0,h/2,-.095,w,h,.23,'9e9984',M.plaster);collider(0,-.095,w,.23);
          let y=0;while(y<h-.001){
            const hh=Math.min(h-y,rand(.16,.264));let x=-w/2;
            while(x<w/2-.001){let ww=Math.min(w/2-x,rand(.28,.68));if(w/2-x<.72)ww=w/2-x;
              box(x+ww/2,y+hh/2,.012+rand(-.008,.008),ww-.013,hh-.014,.096,shade(pick(['b4ab90','b0a68a','a89f84','aea48c','bcb096']),rand(.95,1.03)),M.stone,.012);
              x+=ww;
            }y+=hh;
          }
          const nn=Math.ceil(w/.69);for(let i=0;i<nn;i++)box(-w/2+(i+.5)*w/nn,h+.04,-.046,w/nn-.009,.092,.37,'a29c85',M.stone,.013);
        });
      }
    });
  }
  return {wood,oak,pale,dark,iron,paint,cream,post,panel,peg,notice,studioShell,glazeShell,yardShell};
})();
