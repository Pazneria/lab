import * as T from './package/build/three.module.min.js';
import {materials,seeded,canvas,tex,P} from './materials.js';
import {zone,box,place,rod,ellipsoid,face,grid,lathe,pi,tau} from './geometry.js';
const R=seeded(7451),clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),mix=(a,b,t)=>a*(1-t)+b*t;
const smooth=t=>t*t*(3-2*t);
function hash(x,z){let h=Math.imul(x|0,374761393)+Math.imul(z|0,668265263)|0;h=Math.imul(h^(h>>>13),1274126177);return ((h^(h>>>16))>>>0)/4294967295}
function noise(x,z){
  const a=Math.floor(x),b=Math.floor(z),u=smooth(x-a),v=smooth(z-b);
  return mix(mix(hash(a,b),hash(a+1,b),u),mix(hash(a,b+1),hash(a+1,b+1),u),v);
}
function dist(x,z,a,b,c,d){const u=c-a,v=d-b,t=clamp(((x-a)*u+(z-b)*v)/(u*u+v*v));return Math.hypot(x-a-u*t,z-b-v*t)}
const paths=[
  [-9.6,5.6,-6.60,2.96,1.21],[-6.60,2.96,-5.61,.39,1.17],[-5.61,.39,-4.24,.12,.91],
  [-5.5,1.66,-2.32,2.77,.82],[-2.32,2.77,.51,3.59,1.12],[.51,3.59,2.70,3.32,1.23],[2.70,3.32,4.77,1.83,.81],
  [4.77,1.83,4.47,-2.15,.65]
];
function worn(x,z){
  const u=Math.max(Math.abs(x)-3.64,0),v=Math.max(Math.abs(z)-1.27,0);
  let d=Math.hypot(u,v)/.78;
  for(const p of paths)d=Math.min(d,dist(x,z,...p.slice(0,4))/p[4]);
  const ripple=(noise(x*2,z*2)-.5)*.24+(noise(x*.75,z*.75)-.5)*.40;
  return 1-smooth(clamp((d+ripple-.34)/1.02));
}
function terrainY(x,z){
  const r=Math.hypot(x,z),far=smooth(clamp((r-13.5)/31));
  return -.012+far*((noise(x*.052,z*.052)-.39)*4.9+(noise(x*.018-9,z*.018)-.46)*7.4)+smooth(clamp((r-35)/38))*(4+3.05*Math.sin(x*.031+z*.020)+1.5*Math.cos(z*.065-x*.011));
}
function ground(scene){
  const pos=[],uv=[],co=[],ix=[],coords=[-175,-141,-116,-95,-80,-67,-55,-45,-37,-31,-26,-22,-19,-17];
  for(let i=0;i<=96;i++)coords.push(-16+i/3);
  coords.push(17,19,22,26,31,37,45,55,67,80,95,116,141,175);
  const n=coords.length,g1=new T.Color('#8d9667'),g2=new T.Color('#b8ad79'),d1=new T.Color('#af9976'),d2=new T.Color('#cfb78d'),temp=new T.Color(),sc=new T.Color();
  for(let j=0;j<n;j++)for(let i=0;i<n;i++){
    const x=coords[i],z=coords[j],h=terrainY(x,z),v=noise(x*.42+3,z*.37)*.54+noise(x*1.4,z*1.4)*.26+noise(x*3.3,z*3.3)*.20;
    const dry=worn(x,z);temp.copy(g1).lerp(g2,smooth(clamp(v*1.74-.29)));sc.copy(d1).lerp(d2,v);temp.lerp(sc,dry);
    const shadowUnder=clamp((3.83-Math.abs(x))*2)*clamp((1.62-Math.abs(z))*2);
    temp.multiplyScalar((.94+.12*noise(x*2.5,z*2.5))*(1-.35*shadowUnder));
    if(Math.hypot(x,z)>17){const f=smooth(clamp((Math.hypot(x,z)-17)/45));temp.lerp(new T.Color('#8b987e'),f*.55)}
    pos.push(x,h,z);uv.push(x*.83,z*.83);co.push(temp.r,temp.g,temp.b);
    if(i<n-1&&j<n-1){const a=i+j*n;ix.push(a,a+n,a+1,a+1,a+n,a+n+1)}
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('color',new T.Float32BufferAttribute(co,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();
  const m=new T.Mesh(g,materials.earth);m.receiveShadow=true;m.name='meadow and worn camp paths';m.renderOrder=2;m.matrixAutoUpdate=false;scene.add(m);
}
function grasses(scene){
  const p=[],c=[],idx=[],n=[],color=new T.Color(),palette=['#7b8758','#90975e','#a8a66d','#b9aa74','#7e8f66','#aaa477'];
  function vert(x,y,z,co,s,nx,nz){p.push(x,y,z);c.push(co.r*s,co.g*s,co.b*s);n.push(nx,.76,nz)}
  for(let i=0;i<6200;i++){
    const a=R()*tau,r=Math.sqrt(R())*23.8,x=r*Math.cos(a),z=r*Math.sin(a),wear=worn(x,z);
    if((Math.abs(x)<3.84&&Math.abs(z)<1.74)||R()<wear*.997||R()>noise(x*.86,z*.86)*.88+.25)continue;
    const y=terrainY(x,z)+.002,tall=(.076+R()**1.5*.145)*(1-.7*wear),amount=3+Math.floor(R()*4),col=palette[Math.floor(R()*palette.length)];
    for(let k=0;k<amount;k++){
      const xx=x+(R()-.5)*.091,zz=z+(R()-.5)*.09,ang=R()*tau,cs=Math.cos(ang),sn=Math.sin(ang),w=.004+R()*.009,h=tall*(.51+R()*.83),lean=.025+R()*.049,
      mx=xx+cs*lean*.37,mz=zz+sn*lean*.37,ii=p.length/3;color.set(col);
      vert(xx-sn*w,y,zz+cs*w,color,.65,cs*.5,sn*.5);vert(xx+sn*w,y,zz-cs*w,color,.69,cs*.5,sn*.5);
      vert(mx+sn*w*.68,y+h*.58,mz-cs*w*.68,color,.92,cs*.5,sn*.5);vert(mx-sn*w*.68,y+h*.58,mz+cs*w*.68,color,.94,cs*.5,sn*.5);
      vert(xx+cs*lean,y+h,zz+sn*lean,color,1.12,cs*.5,sn*.5);idx.push(ii,ii+1,ii+2,ii,ii+2,ii+3,ii+3,ii+2,ii+4);
    }
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('normal',new T.Float32BufferAttribute(n,3));g.setAttribute('color',new T.Float32BufferAttribute(c,3));g.setIndex(idx);
  const m=new T.Mesh(g,materials.matte);m.name='meadow grasses';m.renderOrder=3;m.receiveShadow=true;m.matrixAutoUpdate=false;scene.add(m);
}
function nearPlants(){
  zone('verge');
  for(const [cx,cz] of [[-5.20,-.85],[-3.12,2.42],[1.21,5.03],[4.20,3.39],[-3.93,-2.10],[5.32,-2.63],[-6.06,2.43]]){
    for(let i=0;i<9;i++){
      const xx=cx+(R()-.5)*.70,zz=cz+(R()-.5)*.39,h=.095+R()*.19,xx2=xx+.034*(R()-.5);
      rod([xx,.002,zz],[xx2,h,zz+.018],.0026,'#718153','matte',.0016,4);
      for(let j=0;j<3;j++){
        const a=R()*tau,cs=Math.cos(a),sn=Math.sin(a),t=.2+.18*j;
        face([[xx,h*t,zz],[xx+cs*.022-sn*.009,h*t+.013,zz+sn*.022+cs*.009],[xx+cs*.048,h*t+.037,zz+sn*.048],[xx+cs*.025+sn*.009,h*t+.021,zz+sn*.025-cs*.009]],j%2?'#7e8a5c':'#7d915c','matte');
      }
      if(i%3){for(let k=0;k<5;k++){const a=k*tau/5,l=.019;const cs=Math.cos(a),sn=Math.sin(a);
        face([[xx2,h,zz+.018],[xx2+l*.56*cs-.007*sn,h+.003,zz+.018+l*.56*sn+.007*cs],[xx2+l*cs,h+.007,zz+.018+l*sn],[xx2+l*.56*cs+.007*sn,h+.003,zz+.018+l*.56*sn-.007*cs]],i%2?'#e7dfa7':'#d3b672','matte');}
        ellipsoid(xx2,h+.004,zz+.018,.006,.004,.006,'#c4a357','matte',6,3);
      }else{
        for(let j=0;j<4;j++)ellipsoid(xx2+.005*Math.cos(j),h+j*.012,zz+.017+.005*Math.sin(j),.008,.012,.008,'#b1a26e','cloth',6,4);
      }
    }
  }
  for(let i=0;i<190;i++){
    const r=Math.sqrt(R())*12,a=R()*tau,xx=r*Math.cos(a),zz=r*Math.sin(a);
    if(Math.abs(xx)<3.72&&Math.abs(zz)<1.48)continue;const w=.012+R()**2*.051;
    place(xx,.0001,zz,()=>ellipsoid(0,0,0,w,w*.29,w*(.43+R()*.47),['#a49b81','#a99d81','#a9a48a','#b2a486'][i%4],'earth',7,4),0,R()*pi);
  }
}
function makeTree(seed){
  const c=canvas(256,256),g=c.getContext('2d'),r=seeded(seed);
  g.lineCap='round';
  const leaf=(x,y,s)=>{for(let j=0;j<22;j++){
    const a=r()*tau,rr=Math.sqrt(r())*s,xx=x+rr*Math.cos(a),yy=y+rr*Math.sin(a)*.92;
    g.fillStyle=['#707e68','#78856d','#879073','#697c67','#869277'][Math.floor(r()*5)];
    g.beginPath();g.ellipse(xx,yy,4+r()*7,4+r()*6,r(),0,tau);g.fill();
  }};
  function branch(x,y,len,ang,depth){
    const xx=x+Math.sin(ang)*len,yy=y-Math.cos(ang)*len;
    g.lineWidth=depth*1.7+.7;g.strokeStyle=depth>2?'#777868':'#7b816c';g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.sin(ang+.12)*len*.46,y-len*.46,xx,yy);g.stroke();
    if(depth<=2)leaf(xx,yy,11+depth*4);
    if(depth){branch(xx,yy,len*(.55+r()*.22),ang-.24-r()*.48,depth-1);branch(xx,yy,len*(.57+r()*.22),ang+.22+r()*.49,depth-1);}
  }
  branch(125,255,68,-.08,4);branch(124,210,51,-.45,3);branch(126,216,54,.4,3);
  return tex(c,false);
}
function horizon(scene){
  const maps=[makeTree(24),makeTree(89),makeTree(107)];
  // A handful of small, hazed hedgerow silhouettes keep the focus on the encampment.
  const clusters=[[-42,-40,6],[34,-56,4],[58,18,3],[-59,31,4],[-11,69,3]];
  for(let j=0;j<maps.length;j++){
    const pp=[],uv=[],idx=[];
    for(const [x,z,n] of clusters)for(let i=0;i<n;i++){
      if(i%3!==j)continue;const xx=x+(i-n/2)*2.4+(R()-.5)*3,zz=z+(R()-.5)*6,yy=terrainY(xx,zz)-.11,h=4.7+R()*4.1,w=h*(.73+R()*.29);
      const l=Math.hypot(xx,zz),ux=zz/l*w/2,uz=-xx/l*w/2,base=pp.length/3;
      pp.push(xx-ux,yy,zz-uz,xx+ux,yy,zz+uz,xx+ux,yy+h,zz+uz,xx-ux,yy+h,zz-uz);
      uv.push(0,0,1,0,1,1,0,1);idx.push(base,base+1,base+2,base,base+2,base+3);
    }
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pp,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(idx);
    const m=new T.Mesh(geo,new T.MeshBasicMaterial({map:maps[j],color:0xe4dfc5,alphaTest:.42,side:T.DoubleSide}));m.name='far hedgerow';m.renderOrder=4;m.matrixAutoUpdate=false;scene.add(m);
  }
}
function sky(scene){
  const c=canvas(512,256),ctx=c.getContext('2d'),im=ctx.createImageData(c.width,c.height);
  for(let j=0;j<256;j++)for(let i=0;i<512;i++){const x=i/512*12,y=j/256*12,f=.52*noise(x,y*2.8)+.27*noise(x*2.11,y*5.8)+.14*noise(x*4.5,y*12)+.07*noise(x*8,y*23),a=(i+j*512)*4;
    im.data[a]=im.data[a+1]=im.data[a+2]=f*255;im.data[a+3]=255;}
  ctx.putImageData(im,0,0);
  const texNoise=new T.CanvasTexture(c);texNoise.wrapS=texNoise.wrapT=T.RepeatWrapping;
  const sun=new T.Vector3(-.79,.49,.54).normalize(),shader=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,fog:false,
    uniforms:{field:{value:texNoise},sunAt:{value:sun}},
    vertexShader:'varying vec3 skyDir; void main(){skyDir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position.z=gl_Position.w*.999999;}',
    fragmentShader:`varying vec3 skyDir;uniform sampler2D field;uniform vec3 sunAt;
    void main(){vec3 d=normalize(skyDir);float h=max(0.,d.y);float sd=dot(d,sunAt);
    vec3 low=vec3(.83,.76,.59),high=vec3(.23,.49,.68);
    vec3 col=mix(low,high,pow(clamp(h+.03,0.,1.),.48));
    float glow=pow(max(0.,sd),9.);col+=vec3(.34,.16,.041)*glow;
    vec2 uv=vec2(atan(d.z,d.x)/6.283185+.5,h*.77);
    float cl=texture2D(field,uv*vec2(1.65,1.13)+vec2(.13,.14)).r;
    float mist=smoothstep(.53,.75,cl)*smoothstep(.015,.12,h)*(1.-smoothstep(.48,.83,h));
    col=mix(col,vec3(.96,.88,.72)+glow*.21,mist*.49);
    col+=vec3(1.5,.96,.42)*pow(max(sd,0.),140.)*.35;
    col=mix(col,vec3(2.1,1.75,1.12),smoothstep(.99978,.99990,sd));
    gl_FragColor=vec4(col,1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    }`});
  const dome=new T.Mesh(new T.SphereGeometry(153,40,20),shader);dome.name='late afternoon sky';dome.renderOrder=8;dome.frustumCulled=false;scene.add(dome);
}
function contact(scene){
  const c=canvas(128,128),g=c.getContext('2d'),grad=g.createRadialGradient(64,64,0,64,64,64);
  for(const [t,a] of [[0,.55],[.33,.45],[.66,.21],[.87,.06],[1,0]])grad.addColorStop(t,'rgba(70,58,41,'+a+')');
  g.fillStyle=grad;g.fillRect(0,0,128,128);const t=tex(c,false),pp=[],uu=[],idx=[];
  function shadow(x,y,z,w,d){const j=pp.length/3;pp.push(x-w/2,y,z+d/2,x+w/2,y,z+d/2,x+w/2,y,z-d/2,x-w/2,y,z-d/2);uu.push(0,0,1,0,1,1,0,1);idx.push(j,j+1,j+2,j,j+2,j+3)}
  shadow(0,-.007,0,9.32,4.36);
  for(const x of [-2.59,2.63])for(const s of [-1,1])shadow(x,-.005,s*1.54,.79,.49);
  shadow(-4.39,-.005,.15,2.03,1.57);shadow(1.68,-.007,2.12,4.23,2.10);
  for(const [x,z,w,d] of [[2.46,3.76,1.29,.85],[3.22,3.83,.70,.62],[-.98,4.4,.74,.65],[4.45,-2.08,1.39,1.26],[-.22,3.06,.28,.25],[3.5,3.06,.28,.25],[-3.06,-1.70,1.0,.7]])shadow(x,-.005,z,w,d);
  shadow(-2.44,.9015,-.75,2.64,1.23);shadow(-2.57,.902,1.15,1.71,.78);shadow(1.76,.902,-.91,3.99,1.37);
  shadow(1.25,1.774,-1.014,.82,.45);shadow(2.865,1.774,-1.04,.68,.43);
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pp,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uu,2));geo.setIndex(idx);
  const mat=new T.MeshBasicMaterial({map:t,transparent:true,opacity:.72,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
  const m=new T.Mesh(geo,mat);m.name='contact shade';m.matrixAutoUpdate=false;scene.add(m);
}
export function buildLandscape(scene){ground(scene);grasses(scene);nearPlants();horizon(scene);sky(scene);contact(scene)}
