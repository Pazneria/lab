import * as T from './vendor/three.module.min.js';
import {C,environment} from './materials.js';
import {PI,TAU} from './geometry.js';

function pendant(b,p,drop,r,large=false){
  b.local(p,[0,0,0],()=>{
    b.cyl([0,-.018,0],.115,.087,.042,'brass',C.bronze,24);
    b.cyl([0,-.06,0],.072,.047,.063,'brass',C.brass,20);
    b.rod([0,-.069,0],[0,-drop+.20,0],.012,'brass',C.bronze,10);
    b.lathe([0,-drop+.13,0],[[.025,0],[.056,.025],[.05,.056],[.031,.074],[.023,.10]],'brass',C.brass,20);
    for(let j=0;j<(large?6:3);j++){
      const a=j*TAU/(large?6:3),q=[Math.cos(a),Math.sin(a)];
      b.curve([[q[0]*.035,-drop+.197,q[1]*.035],[q[0]*r*.50,-drop+.092,q[1]*r*.50],[q[0]*r*.85,-drop+.035,q[1]*r*.85],[q[0]*r,-drop+.009,q[1]*r]],.0075,'brass',C.brass,15,6);
    }
    b.lathe([0,-drop-r*.366,0],[[.025,0],[r*.29,r*.038],[r*.59,r*.095],[r*.85,r*.20],[r*.99,r*.32],[r,r*.38]],'glow',large?'#ffe1a7':'#f0e7ca',44);
    b.torus([0,-drop,0],r,.017,'brass',C.brass,[-PI/2,0,0],44);
    b.torus([0,-drop-.039,0],r*.92,.008,'brass',C.bronze,[-PI/2,0,0],44);
    for(let j=0;j<16;j++){
      const a=j*TAU/16;
      b.curve([[Math.cos(a)*r,-drop,Math.sin(a)*r],[Math.cos(a)*r*.73,-drop-r*.218,Math.sin(a)*r*.73],[Math.cos(a)*r*.26,-drop-r*.338,Math.sin(a)*r*.26]],.0038,'brass',C.brass,8,5);
    }
    b.oval([0,-drop-r*.38,0],[.036,.048,.036],'brass',C.brass,12);
  });
}
function sconce(b,p,yaw){
  b.local(p,[0,yaw,0],()=>{
    b.oval([0,0,0],[.089,.155,.025],'brass',C.bronze,18);
    b.curve([[0,-.04,.014],[0,-.085,.125],[0,-.04,.206],[0,.096,.245]],.018,'brass',C.brass,14,8);
    b.lathe([0,.074,.245],[[.052,0],[.078,.022],[.061,.054],[.041,.066]],'brass',C.brass,18);
    b.oval([0,.231,.245],[.086,.143,.086],'glow','#ffe0a6',22);
    b.torus([0,.154,.245],.073,.007,'brass',C.brass,[-PI/2,0,0],18);
    b.oval([0,.38,.245],[.027,.03,.027],'brass',C.brass,12);
  });
}
export function buildFixtures(b){
  b.zone='Fitting room';pendant(b,[-.19,4.74,4.60],.512,.281);
  sconce(b,[4.664,2.76,6.43],-PI/2);sconce(b,[-1.05,2.46,8.79],PI);
  b.zone='Fabric archive';pendant(b,[0,4.74,-.94],.658,.222);pendant(b,[0,4.74,-4.67],.658,.222);
  b.zone='Commission workshop';pendant(b,[-.80,4.74,-10.18],.674,.394,true);
  sconce(b,[-2.73,2.56,-15.82],0);sconce(b,[2.13,2.56,-15.82],0);
}
export function lightScene(scene){
  scene.background=new T.Color('#c0cfc6');scene.fog=new T.FogExp2('#c6cbb9',.014);
  scene.environment=environment();scene.environmentIntensity=.43;
  const hemi=new T.HemisphereLight('#e1edf4','#b59d7f',1.58);scene.add(hemi);
  const bounce=new T.DirectionalLight('#d5e8ec',.86);
  bounce.position.set(5.5,4.1,1.5);scene.add(bounce);
  const sun=new T.DirectionalLight('#edf5ff',2.42);
  sun.position.set(-10.8,10.2,1.9);sun.target.position.set(0,.4,-3.55);scene.add(sun,sun.target);
  sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
  Object.assign(sun.shadow.camera,{left:-15,right:15,top:9.6,bottom:-9.6,near:.8,far:34});
  sun.shadow.camera.updateProjectionMatrix();sun.shadow.bias=-.00028;sun.shadow.normalBias=.013;sun.shadow.radius=2;
  const warm=new T.SpotLight('#ffd4a0',41,8,1.09,.73,2);
  warm.position.set(-.80,3.86,-10.18);warm.target.position.set(-.67,1.30,-11.40);scene.add(warm,warm.target);
  const bench=new T.PointLight('#ffce90',3.3,3.6,2);bench.position.set(2.91,1.46,-11.46);scene.add(bench);
  const back=new T.PointLight('#ffd29b',8.2,6.8,2);back.position.set(.99,2.91,-14.70);scene.add(back);
}

