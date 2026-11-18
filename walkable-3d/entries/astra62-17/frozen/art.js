/* Painted and printed surfaces. Every illustration is composed here. */
(function(R){
'use strict';
const {canvasMat,mats,PI,TAU,rnd,at,box,rounded,panel,ball,C}=R;
function path(c,pts,fill,stroke,width=1){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));if(fill){c.closePath();c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke()}}
function bez(c,pts,fill,stroke,width=1){c.beginPath();c.moveTo(...pts[0]);for(const a of pts.slice(1))if(a.length===2)c.lineTo(...a);else if(a.length===4)c.quadraticCurveTo(...a);else c.bezierCurveTo(...a);if(fill){c.closePath();c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke()}}
function rect(c,x,y,w,h,col){c.fillStyle=col;c.fillRect(x,y,w,h)}
function oval(c,x,y,rx,ry,col,rot=0){c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,rot,0,TAU);c.fill()}
function txt(c,s,x,y,size,col,font='Georgia',align='left',style=''){c.fillStyle=col;c.font=style+' '+size+'px '+font;c.textAlign=align;c.fillText(s,x,y)}
function fleck(c,w,h,n,colors){for(let i=0;i<n;i++)rect(c,rnd(0,w),rnd(0,h),rnd(.3,2.5),rnd(.4,2.1),colors[i%colors.length])}
function line(c,pts,col,w=1){path(c,pts,null,col,w)}
const cream='#d7c39b',ink='#423e35',sienna='#a36648';
canvasMat('rug',1024,768,(c,w,h)=>{
 rect(c,0,0,w,h,'#7d493a');
 const border=(x,sz,col)=>{rect(c,x,x,w-2*x,sz,col);rect(c,x,h-x-sz,w-2*x,sz,col);rect(c,x,x,sz,h-2*x,col);rect(c,w-x-sz,x,sz,h-2*x,col)};
 [[5,6,'#c4a879'],[14,4,'#533d33'],[20,34,'#a1754c'],[57,6,'#d5b381'],[66,13,'#4c5b53'],[85,4,'#c9ac83'],[94,3,'#5e4132']].forEach(v=>border(...v));
 const dia=(x,y,a,b,col)=>path(c,[[x-a,y],[x,y-b],[x+a,y],[x,y+b]],col);
 for(let x=38;x<w-22;x+=32)for(let y of [37,h-37]){dia(x,y,14,13,'#694638');dia(x,y,6,6,cream)}
 for(let y=69;y<h-50;y+=32)for(let x of [37,w-37]){dia(x,y,13,14,'#694638');dia(x,y,5,6,cream)}
 for(let i=0;i<11;i++)for(let j=0;j<7;j++){let x=129+i*76+(j%2)*26,y=125+j*86;if(x>w-106)continue;dia(x,y,9,12,'#b78557');line(c,[[x-18,y+5],[x-13,y+5],[x-13,y-6],[x-6,y]],'#d4b383',2);line(c,[[x+18,y-5],[x+13,y-5],[x+13,y+6],[x+6,y]],'#d4b383',2)}
 for(let x of [270,512,754]){let y=384;dia(x,y,155,227,'#61493b');dia(x,y,148,217,'#d2ac70');dia(x,y,140,208,'#535f55');dia(x,y,123,179,'#8d7452');dia(x,y,114,166,'#a26749');dia(x,y,103,151,'#79523d');dia(x,y,87,117,'#bd9663');dia(x,y,78,105,'#58665a');
 for(let a=0;a<8;a++){c.save();c.translate(x,y);c.rotate(a*PI/4);path(c,[[0,-9],[-10,-33],[0,-65],[12,-32]],a%2?cream:'#ad7955');c.restore()}dia(x,y,12,15,'#744936');
 for(let k=1;k<8;k++){let yy=k*21,xx=140*(1-yy/210);for(let s of [-1,1])for(let t of [-1,1])dia(x+s*xx,y+t*yy,5.5,6.8,'#dfc395')}}
 for(let y=0;y<h;y+=2)rect(c,0,y,w,1,y%6?'#2e261319':'#efdbb021');for(let x=0;x<w;x+=3)rect(c,x,0,1,h,'#2e26130d');fleck(c,w,h,22000,['#e1c6a21c','#342a201c','#d8d1bb20'])
},{normalMap:mats.wool.normalMap,normalScale:new R.T.Vector2(.31,.31)});
canvasMat('blanket',768,768,(c,w,h)=>{
 rect(c,0,0,w,h,'#79806a');const cols=['#909477','#747d65','#66725e','#a2a086','#838b71','#b4ae90','#637365'];
 for(let j=0;j<8;j++)for(let i=0;i<8;i++){
 let x=i*96,y=j*96;rect(c,x,y,96,96,cols[(i*7+j*3+i*j)%7]);path(c,[[x,y],[x+96,y],[x+96,y+96]],cols[(i*3+j*5+3)%7]);
 c.strokeStyle='#e3d9b080';c.lineWidth=1.4;c.setLineDash([4,5]);c.strokeRect(x+3,y+3,90,90);line(c,[[x+4,y+4],[x+91,y+91]],'#d7d1ac77',1.4);c.setLineDash([])}
 for(let y=0;y<h;y+=3)rect(c,0,y,w,1,'#222e1b13');for(let x=0;x<w;x+=3)rect(c,x,0,1,h,'#eaebce15');fleck(c,w,h,12000,['#f6eabb18','#34362219'])
},{normalMap:mats.wool.normalMap,normalScale:new R.T.Vector2(.55,.55)});
canvasMat('throw',512,512,(c,w,h)=>{
 rect(c,0,0,w,h,'#c8b694');
 for(let y of [18,26,47,72,86,107,402,412,435,459,480,490])rect(c,0,y,w,[3,7,15][Math.abs(y)%3],y%3===0?'#6a6e61':'#9c5841');
 for(let x=0;x<w;x+=4){rect(c,x,0,1,h,'#604b3733');for(let y=0;y<h;y+=8)rect(c,x,y+(x%8?0:4),2,3,'#efe3c944')}fleck(c,w,h,7000,['#ede0c633','#86755d22'])
},{normalMap:mats.wool.normalMap,normalScale:new R.T.Vector2(.43,.43)});
/* Retired surveyor's own annotated map, with continuous elevation contours. */
canvasMat('map',1024,712,(c,w,h)=>{
 rect(c,0,0,w,h,'#d8c59d');let wash=c.createLinearGradient(0,0,w,h);wash.addColorStop(0,'#90724926');wash.addColorStop(.57,'#eee3bf55');wash.addColorStop(1,'#99825b44');c.fillStyle=wash;c.fillRect(0,0,w,h);
 c.strokeStyle='#73654d';c.lineWidth=2;c.strokeRect(20,20,w-40,h-40);c.strokeRect(26,26,w-52,h-52);
 const hill=(x,y)=>.83*Math.exp(-((x-310)**2/57000+(y-322)**2/30000))+.91*Math.exp(-((x-690)**2/59000+(y-277)**2/13000))+.54*Math.exp(-((x-623)**2/12800+(y-539)**2/35000))+.095*Math.sin(x*.025+Math.sin(y*.03))+.045*Math.sin(x*.061+y*.024)+.085*Math.sin(y*.027+x*.006);
 c.save();c.beginPath();c.rect(33,34,w-66,h-70);c.clip();
 const step=9,levels=19;
 for(let k=0;k<levels;k++){const h0=k*.063-.1;c.beginPath();for(let y=30;y<h-33;y+=step)for(let x=30;x<w-34;x+=step){let corners=[[x,y],[x+step,y],[x+step,y+step],[x,y+step]],v=corners.map(([a,b])=>hill(a,b));let intersections=[];for(let s=0;s<4;s++){let n=(s+1)%4;if((v[s]<h0)===(v[n]<h0))continue;let f=(h0-v[s])/(v[n]-v[s]);intersections.push([corners[s][0]+(corners[n][0]-corners[s][0])*f,corners[s][1]+(corners[n][1]-corners[s][1])*f])}for(let m=0;m+1<intersections.length;m+=2){c.moveTo(...intersections[m]);c.lineTo(...intersections[m+1])}}c.strokeStyle=k%4?'#90826787':'#807157b8';c.lineWidth=k%4?1.3:2.1;c.stroke()}
 for(let x=65;x<w;x+=118)line(c,[[x,35],[x,h-35]],'#726d5c31');for(let y=79;y<h;y+=117)line(c,[[33,y],[w-33,y]],'#726d5c31');
 bez(c,[[59,603],[150,585,171,439,248,429],[337,409,285,365,384,350],[458,336,499,363,560,338],[649,295,608,267,686,225],[752,189,819,203,909,100]],null,'#749294',4);
 c.setLineDash([10,6]);bez(c,[[112,529],[182,464,237,524,299,443],[375,332,446,463,479,359],[502,297,597,380,619,293],[640,225,697,261,763,205]],null,'#a24e35',4);c.setLineDash([]);
 for(const [x,y] of [[112,529],[299,443],[479,359],[619,293],[763,205]]){oval(c,x,y,6,6,'#9b513c');oval(c,x,y,2,2,'#ebdcb9')}
 txt(c,'Moraine basin',280,514,19,'#6b6657','Georgia','center','italic');txt(c,'North saddle',657,208,20,'#595c50','Georgia','center','italic');txt(c,'III',635,290,18,ink);txt(c,'Juniper creek',170,412,17,'#607e7a','Georgia','center','italic');
 rect(c,50,49,316,86,'#dbcca9');txt(c,'PLATE IV    /    FIELD COPY',62,69,13,ink,'monospace');txt(c,'The Vesper Range',61,104,32,ink);txt(c,'NORTHERN APPROACH     1896',62,123,13,ink,'monospace');
 c.translate(887,555);for(let a=0;a<8;a++){c.save();c.rotate(a*PI/4);path(c,[[0,-52],[-6,0],[0,9]],a%2?ink:'#9c8765');path(c,[[0,-52],[6,0],[0,9]],'#c5ad84');c.restore()}txt(c,'N',0,-60,19,ink,'Georgia','center');c.restore();
 for(let x of [340,684]){rect(c,x,32,2,h-62,'#80633f55');rect(c,x+2,32,3,h-62,'#f4e6bb77')}line(c,[[29,357],[997,354]],'#88724666',2);fleck(c,w,h,12500,['#68593618','#fff3d31e'])
});
canvasMat('summitPrint',768,570,(c,w,h)=>{
 rect(c,0,0,w,h,'#d4c9a6');rect(c,32,30,704,452,'#95a6a0');let gr=c.createLinearGradient(0,30,0,425);gr.addColorStop(0,'#7f9998');gr.addColorStop(1,'#d9c9a2');c.fillStyle=gr;c.fillRect(32,30,704,452);
 c.save();c.beginPath();c.rect(32,30,704,452);c.clip();oval(c,541,137,46,45,'#dec69c');
 const ridge=[[19,389],[129,303],[163,305],[238,223],[265,245],[322,171],[343,188],[418,88],[437,123],[451,127],[497,213],[526,179],[575,256],[627,221],[745,321],[745,489],[19,489]];
 path(c,ridge,'#6d807c');for(let i=1;i<ridge.length-2;i++){let [x,y]=ridge[i];if(i%2)path(c,[[x,y],[x+25,y+70],[x+7,y+54],[x+29,y+136],[x-43,y+177],[x-18,y+76],[x-48,y+91]],'#475e5c')}
 path(c,[[321,171],[344,188],[418,88],[437,123],[451,127],[495,209],[459,181],[447,156],[435,167],[419,138],[395,180],[407,142],[370,189],[359,190],[337,221]],'#e0d8bc');path(c,[[418,88],[425,137],[410,126],[390,167]],'#a1ada2');
 for(let k=0;k<170;k++){const x=rnd(30,737),y=rnd(256,407);line(c,[[x,y],[x-rnd(1,9),y+rnd(2,7)]],'#374b494d',1)}
 path(c,[[20,359],[104,343],[212,390],[352,337],[445,365],[564,316],[658,304],[746,327],[746,485],[20,485]],'#536862');
 path(c,[[20,407],[158,394],[291,423],[433,393],[560,416],[655,363],[745,378],[745,485],[20,485]],'#344f49');
 for(let k=0;k<120;k++){let x=rnd(24,741),y=447+22*Math.sin(x*.0065),s=rnd(5,26);path(c,[[x,y-s],[x-s*.23,y],[x+s*.23,y]],'#304840')}
 c.restore();txt(c,'VESPER   /   WEST FACE',w/2,521,21,'#454b40','Georgia','center');txt(c,'FROM THE NOTEBOOK OF ELIN VALE     ·     WINTER PLATE  VIII',w/2,546,11,'#6c6654','monospace','center');fleck(c,w,h,9000,['#362d2019','#ece1c61b'])
});
/* Two individually painted expedition companions in oval miniature mounts. */
['mara','arden'].forEach((name,n)=>canvasMat(name,352,440,(c,w,h)=>{
 rect(c,0,0,w,h,'#a99b7e');oval(c,176,195,140,167,'#706d58');oval(c,172,187,129,154,n?'#869184':'#8e9384');
 c.save();c.beginPath();c.ellipse(172,187,129,154,0,0,TAU);c.clip();
 const skin=n?'#ad7c59':'#bd9270',lite=n?'#c49a74':'#d4af86',hair=n?'#594a3c':'#554537';
 bez(c,[[26,368],[45,294,69,263,130,244],[162,229,191,233,222,243],[275,250,301,295,322,370]],n?'#59665b':'#5c6970');
 bez(c,[[128,247],[138,244,145,225,142,204],[178,200,197,200,204,205],[200,230,206,240,223,246],[184,278,151,268,128,247]],skin);
 bez(c,[[124,130],[124,98,149,75,181,79],[218,79,235,104,233,148],[231,177,218,207,201,222],[184,232,159,223,147,213],[133,196,124,176,122,151]],skin);
 bez(c,[[144,129],[151,100,205,97,214,121],[221,140,216,150,216,160],[214,179,210,194,198,202],[175,209,154,191,150,175],[135,174,140,148,144,129]],lite);
 oval(c,124,157,9,17,skin,-.18);bez(c,[[122,161],[112,136,112,111,130,93],[153,57,205,65,222,92],[242,108,232,129,230,135],[216,122,210,111,201,108],[171,119,155,105,143,130],[134,144,136,156,129,168]],hair);
 if(!n){oval(c,119,181,15,34,hair,-.13);bez(c,[[100,117],[107,75,136,56,181,54],[209,51,230,82,234,111],[179,94,152,99,100,117]],'#81775a');bez(c,[[88,124],[137,100,202,96,254,108],[260,115,240,118,229,117],[173,110,135,126,94,131]],'#665c43')}
 else{bez(c,[[122,177],[140,184,142,194,154,191],[167,178,189,179,201,187],[214,190,224,175,225,168],[223,203,208,223,191,231],[162,241,133,221,124,195]],hair);bez(c,[[101,119],[104,79,128,58,172,56],[213,54,232,77,241,113],[183,103,138,105,101,119]],'#934f3c');bez(c,[[101,105],[139,94,196,91,237,106],[243,109,245,123,238,129],[190,114,141,118,106,133]],'#a05c48')}
 bez(c,[[144,147],[155,141,163,141,170,146]],null,hair,3);bez(c,[[191,145],[201,139,212,139,218,145]],null,hair,3);
 line(c,[[148,153],[161,152],[167,154]],'#6b5744',2);line(c,[[193,151],[204,149],[212,151]],'#665342',2);oval(c,160,153,2,2.5,hair);oval(c,202,150,2,2.5,hair);
 bez(c,[[181,151],[178,163,175,172,178,177],[182,181,188,178,192,178]],null,'#956d53',2);
 bez(c,[[167,192],[183,195,194,193,200,189]],null,'#845b49',2.5);
 path(c,[[124,238],[161,252],[193,254],[219,236],[230,249],[199,278],[158,274]],n?'#936348':'#b08954');
 path(c,[[125,246],[148,266],[170,315],[138,283],[111,270]],n?'#687566':'#829092');
 path(c,[[224,247],[198,271],[180,326],[218,288],[239,269]],n?'#4e5e51':'#677780');
 for(let i=0;i<120;i++){let x=rnd(60,290),y=rnd(274,350);line(c,[[x,y],[x+3,y-5]],'#d8c9a52d',1)}
 c.restore();c.strokeStyle='#ddcca5';c.lineWidth=4;c.beginPath();c.ellipse(174,193,141,166,0,0,TAU);c.stroke();txt(c,n?'ARDEN L.':'MARA V.',176,391,24,ink,'Georgia','center');txt(c,n?'THE NORTH SADDLE, 1896':'VESPER SURVEY, 1896',176,414,10,ink,'monospace','center');fleck(c,w,h,3600,['#231f191e','#e4d9c018'])
}));
canvasMat('stencil',512,126,(c,w,h)=>{rect(c,0,0,w,h,'#456963');rect(c,7,8,498,2,'#d5cba0');rect(c,7,115,498,2,'#d5cba0');txt(c,'NORTH PASS   •   04',w/2,65,42,'#e1d2aa','Georgia','center');txt(c,'V E S P E R   F I E L D   S U R V E Y',w/2,96,16,'#d5cba0','monospace','center');fleck(c,w,h,2400,['#50493555','#98755755','#3b493d33'])});
canvasMat('doorPlaque',480,194,(c,w,h)=>{rect(c,0,0,w,h,'#3d5149');c.strokeStyle='#c1ae7e';c.lineWidth=4;c.strokeRect(11,11,458,172);txt(c,'THE COPPER IBEX',240,74,30,'#e7d7ad','Georgia','center');txt(c,'UPPER ROOM   /   III',240,128,23,'#d3c29b','monospace','center')});
function frame(x,y,z,w,h,material,yaw=0,wood=C.wood){
 at(x,y,z,yaw,()=>{
 box(0,0,0,w,h,.032,'timber',wood);const t=Math.min(.047,w*.082);
 panel(0,0,.018,w-t*1.7,h-t*1.7,material);for(const s of [-1,1]){
 rounded(0,s*(h-t)/2,.028,w,t,.045,.008,'timber',wood);rounded(s*(w-t)/2,0,.028,t,h-t,.046,.006,'timber',wood);
 box(0,s*(h/2-t),.045,w-2*t,.009,.008,'metal','#b09b69');box(s*(w/2-t),0,.045,.009,h-2*t,.008,'metal','#b09b69')}
 })
}
Object.assign(R,{frame,art:{rect,path,bez,oval,txt,line,fleck}});
})(Room);
