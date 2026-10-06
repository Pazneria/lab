import * as THREE from '../vendor/three.module.js';
import { POOL, poolRadius, floorHeight } from './spatial.js';

const waterVertex = `
varying vec3 vWorld;
varying float vDepth;
attribute float basinDepth;
void main(){
  vWorld = (modelMatrix * vec4(position,1.0)).xyz;
  vDepth = basinDepth;
  gl_Position = projectionMatrix * viewMatrix * vec4(vWorld,1.0);
}`;
const waterFragment = `
uniform float time;
uniform vec3 sky;
uniform vec3 fogColor;
varying vec3 vWorld;
varying float vDepth;
void main(){
  vec2 p = vWorld.xz;
  float wave1 = sin(p.x*2.3+p.y*1.25-time*.48);
  float wave2 = sin(p.x*-1.6+p.y*2.75+time*.34);
  float wave3 = sin(p.x*7.7+p.y*3.2-time*.82);
  vec3 N = normalize(vec3(wave1*.011+wave2*.008+wave3*.004,1.0,wave1*.009-wave2*.010));
  vec3 V = normalize(cameraPosition-vWorld);
  float facing = max(dot(N,V),0.0);
  float fresnel = .025+.975*pow(1.0-facing,5.0);
  vec3 reflected = reflect(-V,N);
  vec3 toSlit = normalize(vec3(.2,11.3,2.1)-vWorld);
  float slit = exp(-pow((reflected.x-toSlit.x)*14.0,2.0)-pow((reflected.z-toSlit.z)*3.0,2.0));
  float shimmer = .74+.26*sin(p.y*5.0-p.x*2.0+time*.32)*sin(p.x*4.0+p.y*1.7-time*.41);
  float depth = clamp(vDepth*1.4,0.0,1.0);
  vec3 shallow = vec3(.14,.27,.235);
  vec3 deep = vec3(.047,.145,.145);
  vec3 body = mix(shallow,deep,depth);
  vec3 ceiling = mix(vec3(.12,.17,.165),vec3(.34,.43,.40),smoothstep(-.1,.9,reflected.y));
  vec3 result = mix(body,ceiling,fresnel*.64);
  result += sky * slit * shimmer * (.11+.58*fresnel);
  float speck = pow(max(0.0,sin(p.x*12.4+p.y*9.0+time*.28)*sin(p.x*8.1-p.y*10.3-time*.18)),18.0);
  result += vec3(.10,.13,.12)*speck*slit;
  float alpha = (.22+depth*.12+fresnel*.42)*smoothstep(.0,.095,vDepth);
  float fog = 1.0-exp(-.00016*pow(length(cameraPosition-vWorld),2.0));
  result=mix(result,fogColor,fog);
  gl_FragColor=vec4(result,alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export function buildWater() {
  const positions = [], depth = [], indices = [];
  const segments = 224, rings = 26;
  for (let j = 0; j <= rings; j++) for (let i = 0; i <= segments; i++) {
    const theta = i / segments * Math.PI * 2, r = j / rings * poolRadius(theta);
    const x = POOL.x + POOL.rx * Math.cos(theta) * r, z = POOL.z + POOL.rz * Math.sin(theta) * r;
    positions.push(x, POOL.y, z); depth.push(Math.max(0, POOL.y - floorHeight(x, z)));
  }
  for (let j = 0; j < rings; j++) for (let i = 0; i < segments; i++) {
    const a = j * (segments + 1) + i, b = a + 1, c = a + segments + 1, d = c + 1;
    indices.push(a, b, c, b, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('basinDepth', new THREE.Float32BufferAttribute(depth, 1));
  g.setIndex(indices); g.computeBoundingSphere();
  const material = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 }, sky: { value: new THREE.Color('#dedfca') }, fogColor: { value: new THREE.Color('#26383b') } },
    vertexShader: waterVertex, fragmentShader: waterFragment,
    transparent: true, depthWrite: false, side: THREE.DoubleSide
  });
  const water = new THREE.Mesh(g, material); water.name = 'Shallow water, analytic ripples'; water.renderOrder = 3;

  const cp = [], ci = [];
  const causticSegments = 112, causticRings = 22;
  for (let j = 0; j <= causticRings; j++) for (let i = 0; i <= causticSegments; i++) {
    const t = i / causticSegments * Math.PI * 2, r = j / causticRings * .945 * poolRadius(t);
    const x = POOL.x + POOL.rx * Math.cos(t) * r, z = POOL.z + POOL.rz * Math.sin(t) * r;
    cp.push(x, floorHeight(x, z) + .017, z);
  }
  for (let j = 0; j < causticRings; j++) for (let i = 0; i < causticSegments; i++) {
    const a = j * (causticSegments + 1) + i, c = a + causticSegments + 1;
    ci.push(a, a + 1, c, a + 1, c + 1, c);
  }
  const cg = new THREE.BufferGeometry(); cg.setAttribute('position', new THREE.Float32BufferAttribute(cp, 3)); cg.setIndex(ci);
  const cm = new THREE.ShaderMaterial({
    uniforms: { time: material.uniforms.time },
    vertexShader: `varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `uniform float time;varying vec3 p;
    void main(){
      float a=sin(p.x*3.3+sin(p.z*2.8+time*.25)+time*.21);
      float b=sin(p.z*3.5+sin(p.x*2.9-time*.18)-time*.24);
      float network=pow(1.0-abs(a*b),16.0);
      float light=exp(-pow((p.x+1.9)*.22,2.0)-pow((p.z-2.2)*.13,2.0));
      gl_FragColor=vec4(vec3(.54,.62,.43),network*light*.11);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`, transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending
  });
  const caustics = new THREE.Mesh(cg, cm); caustics.name = 'Restrained light on basin sediment'; caustics.renderOrder = 1;
  return { water, caustics, update: time => { material.uniforms.time.value = time; } };
}
