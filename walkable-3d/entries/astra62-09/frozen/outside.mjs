import {T,C,PI,TAU,seeded} from './geometry.mjs';

export function buildExterior(k){
  k.section('outboard radiator',()=>{
    // A segment of the station's actual external truss is visible at the port's far left.
    k.frame([-7.9,3.82,-14.8],[.04,.25,-.27],()=>{
      for(const [y,z] of [[-.32,-.28],[-.32,.28],[.38,0]])k.rod([-4.4,y,z],[4.25,y,z],.063,'outside',0x819093,10);
      for(let i=0;i<9;i++){
        const x=-4.39+i*1.056;
        k.rod([x,-.32,-.28],[x,-.32,.28],.045,'outside',0x7a898b,8);
        for(const s of [-1,1]){
          k.rod([x,-.32,s*.28],[x,.38,0],.043,'outside',0x929a96,8);
          if(i<8)k.rod([x,-.32,s*.28],[x+1.056,.38,0],.039,'outside',0x73878a,8);
        }
      }
      for(let i=0;i<3;i++){
        const x=-3.72+i*1.29;
        k.box([x,1.72,-.085],[1.262,2.64,.105],'outside',0x9c9583,.025);
        k.box([x,1.72,-.012],[1.184,2.518,.047],'outside',0x304759,.01);
        for(let j=0;j<11;j++)k.box([x,.518+j*.24,.018],[1.16,.016,.012],'outside',0x778888);
        for(const dx of [-.29,0,.29])k.box([x+dx,1.72,.021],[.009,2.47,.014],'outside',0x6c7670);
      }
      k.box([3.86,.16,.04],[.77,.78,.63],'outside',0x97845d,.063);
      k.box([3.86,.19,.38],[.59,.55,.062],'outside',0xa69a75,.029);
    });
  });
}
export function createSky(scene,moonMap) {
  const moon=new T.Mesh(new T.SphereGeometry(99,112,64),new T.MeshBasicMaterial({map:moonMap,toneMapped:false,fog:false}));
  moon.position.set(-21,-81,-76);scene.add(moon);
  const rng=seeded(14796),p=[],c=[];
  for(let i=0;i<3600;i++){
    const z=rng()*2-1,a=rng()*TAU,r=Math.sqrt(1-z*z),b=.18+.66*Math.pow(rng(),4);
    p.push(r*Math.cos(a)*246,z*246,r*Math.sin(a)*246);
    c.push(b*(.80+rng()*.20),b*(.84+rng()*.14),b);
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('color',new T.Float32BufferAttribute(c,3));
  scene.add(new T.Points(g,new T.PointsMaterial({vertexColors:true,size:1.12,sizeAttenuation:false,toneMapped:false,fog:false,depthWrite:false})));
}

