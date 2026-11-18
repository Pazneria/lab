import * as T from "three";
import { random, washTexture } from "./materials.js";

// Shallow water collects by the drains and in gaps where traffic has worn the setts.
const puddles = [
  [-4.03,3.72,1.01,1.62,-.27], [4.10,4.11,.54,1.33,.44],
  [3.39,3.10,.84,.63,-.36], [-3.89,-2.19,.53,1.35,-.19],
  [-3.16,-3.23,.81,.59,.11], [3.43,-1.81,.87,1.18,.13],
  [-1.12,5.34,.49,.76,.44], [.83,6.60,.71,.39,-.31],
  [-.42,.49,.93,.62,.16], [1.44,-3.92,.65,1.06,.06],
  [2.68,-5.64,.70,1.16,.31], [2.10,-8.73,.83,1.18,.13],
  [2.97,-10.26,.55,1.23,-.28], [2.64,-13.63,.82,.77,-.41]
];

function shallowWater() {
  const positions = [], indices = [], colors = [];
  const rand = random(1711);
  const segments = 40;
  function vertex(x,z,alpha) {
    positions.push(x,.0038,z);
    colors.push(1,1,1,alpha);
  }
  for (const [x,z,width,depth,yaw] of puddles) {
    const start = positions.length / 3;
    vertex(x,z,.61);
    const phase = rand() * Math.PI * 2;
    const breaks = Array.from({length: segments}, () => (rand() - .5) * .12);
    for (const [radius, alpha] of [[.35,.69],[.72,.74],[.90,.56],[1.0,0]]) {
      for (let i=0;i<segments;i++) {
        const a = i / segments * Math.PI * 2;
        const uneven = radius * (1 + .10 * Math.sin(a*3 + phase) + .106 * Math.sin(a*7 - phase) + breaks[i]);
        const u = width * .5 * uneven * Math.cos(a), v = depth * .5 * uneven * Math.sin(a);
        vertex(x + u*Math.cos(yaw) + v*Math.sin(yaw), z - u*Math.sin(yaw) + v*Math.cos(yaw),
          alpha * (.86 + .14*Math.sin(a*4 + phase) ** 2));
      }
    }
    for (let i=0;i<segments;i++) {
      const next = (i+1)%segments;
      indices.push(start,start+1+next,start+1+i);
      for (let ring=0;ring<3;ring++) {
        const j=start+1+ring*segments;
        indices.push(j+i,j+next,j+segments+i,j+next,j+segments+next,j+segments+i);
      }
    }
  }
  const shape = new T.BufferGeometry();
  shape.setAttribute("position",new T.Float32BufferAttribute(positions,3));
  shape.setAttribute("color",new T.Float32BufferAttribute(colors,4));
  shape.setAttribute("uv",new T.Float32BufferAttribute(new Float32Array(positions.length / 3 * 2),2));
  shape.setIndex(indices);
  shape.computeVertexNormals();
  const glaze = new T.MeshStandardMaterial({
    name:"Thin rainwater in low spots", color:0x344552, roughness:.19, metalness:.35,
    envMapIntensity:.52, transparent:true, opacity:.58, vertexColors:true, depthWrite:false
  });
  const water = new T.Mesh(shape,glaze);
  water.name = glaze.name;
  return water;
}

export function dressPavement(scene) {
  scene.add(shallowWater());

  // Broad scattered highlights share one texture. Positions follow the sightline to the fixture.
  const fixtures = [];
  scene.traverse((object)=>{
    if(object.isPointLight && object.parent.name !== "North oxide-brick facade") fixtures.push(object);
  });
  const pattern = washTexture("reflection");
  const square = new T.PlaneGeometry(1,1);
  const reflections = [];
  scene.updateMatrixWorld(true);
  for (const light of fixtures) {
    const source = light.getWorldPosition(new T.Vector3());
    const surface = new T.MeshBasicMaterial({
      map:pattern, color:light.color, opacity:0,
      transparent:true, depthWrite:false, blending:T.AdditiveBlending, toneMapped:false
    });
    const mesh = new T.Mesh(square,surface);
    mesh.rotation.order="YXZ";
    mesh.rotation.x=-Math.PI/2;
    mesh.renderOrder=2;
    mesh.visible=false;
    scene.add(mesh);
    reflections.push({mesh,source,power:light.intensity});
  }

  function atDoor(eye, source, planeZ) {
    if ((eye.z-planeZ)*(source.z-planeZ)>=0) return 1;
    const t = (planeZ-eye.z)/(source.z-eye.z);
    const localX = eye.x + (source.x-eye.x)*t - 2.53;
    return T.MathUtils.smoothstep(1.38-Math.abs(localX),0,.42);
  }

  return (eye) => {
    for (const {mesh,source,power} of reflections) {
      const dx=source.x-eye.x, dz=source.z-eye.z;
      const distance=Math.hypot(dx,dz);
      const separation=source.y+eye.y;
      const t=eye.y/separation;
      const x=eye.x+dx*t, z=eye.z+dz*t;
      const throughDoors=atDoor(eye,source,-7.12)*atDoor(eye,source,-11.78);
      const fade=throughDoors * Math.max(0,1-(distance/8.5)**2) * Math.min(1,distance/1.4);
      mesh.visible=fade>.02;
      if (!mesh.visible) continue;
      mesh.position.set(x,.0115,z);
      mesh.rotation.y=Math.atan2(dx,dz);
      mesh.scale.set(.28+distance*.068,.57+distance*.22,1);
      mesh.material.opacity=fade * Math.min(.30,.095+power*.008);
    }
  };
}
