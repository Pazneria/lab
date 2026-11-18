import * as T from 'three';
import { seeded } from './kit.js';

const solarDirection = new T.Vector3(-.46, .72, .54).normalize();
const planetPosition = new T.Vector3(-3.45, -4.41, -27.6);
const planetRadius = 7.76;

const sphereVertex = `
  varying vec3 vWorld;
  varying vec3 vRadial;
  varying vec2 vUv;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vRadial = normalize(mat3(modelMatrix) * normal);
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * world;
  }`;

function background(scene, opaque) {
  const atmosphere = new T.ShaderMaterial({
    side: T.BackSide,
    depthWrite: false,
    vertexShader: `
      varying vec3 vRay;
      void main() {
        vRay = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
    fragmentShader: `
      varying vec3 vRay;
      void main() {
        vec3 ray = normalize(vRay);
        float stripe = (ray.y - .19 * ray.x - .02) * 7.0;
        float veil = exp(-stripe * stripe);
        float field = .6 + .22 * sin(17.0 * ray.x + 33.0 * ray.y) + .11 * cos(46.0 * ray.x - 23.0 * ray.y);
        float glow = exp(-dot(ray - vec3(-.18, .05, -.98), ray - vec3(-.18, .05, -.98)) * 8.0);
        vec3 sky = vec3(.0022, .0038, .0081) + vec3(.0015,.004,.009) * veil * field;
        sky += vec3(.002,.0045,.008) * glow;
        gl_FragColor = vec4(sky, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
  });
  const sky = new T.Mesh(new T.SphereGeometry(111, 32, 18), atmosphere);
  sky.name = 'Exterior sky';
  sky.renderOrder = 10;
  opaque.add(sky);

  const count = 2430;
  const random = seeded(1998215);
  const positions = new Float32Array(count * 3);
  const tint = new Float32Array(count * 3);
  const magnitude = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const a = random() * Math.PI * 2;
    const z = -(random() * .96 + .04);
    const projection = Math.sqrt(1 - z * z);
    const x = Math.cos(a) * projection;
    const y = Math.sin(a) * projection;
    const distance = 75 + random() * 24;
    const b = random();
    const warm = random();
    positions.set([x * distance, y * distance, z * distance], i * 3);
    const strength = .16 + .82 * b ** 8;
    tint.set([strength * (.74 + .26 * warm), strength * (.83 + .12 * warm), strength * (1 - .33 * warm)], i * 3);
    magnitude[i] = 1.28 + 2.14 * b ** 14;
  }
  const geometry = new T.BufferGeometry();
  geometry.setAttribute('position', new T.BufferAttribute(positions, 3));
  geometry.setAttribute('starTint', new T.BufferAttribute(tint, 3));
  geometry.setAttribute('starSize', new T.BufferAttribute(magnitude, 1));
  const material = new T.ShaderMaterial({
    uniforms: { pixelRatio: { value: 1 } },
    transparent: true,
    depthWrite: false,
    blending: T.AdditiveBlending,
    vertexShader: `
      attribute vec3 starTint;
      attribute float starSize;
      uniform float pixelRatio;
      varying vec3 vColor;
      void main() {
        vColor = starTint;
        gl_PointSize = starSize * pixelRatio;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        vec2 pt = 2.0 * gl_PointCoord - 1.0;
        float radial = dot(pt, pt);
        float energy = max(0.0, 1.0 - radial);
        gl_FragColor = vec4(vColor, energy * energy * .74);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
  });
  const stars = new T.Points(geometry, material);
  stars.name = 'Distant star field';
  stars.renderOrder = -5;
  scene.add(stars);
  return material.uniforms.pixelRatio;
}

function makeGlobe(texture, radius, tint, rocky) {
  const material = new T.ShaderMaterial({
    uniforms: {
      surfaceMap: { value: texture },
      sun: { value: solarDirection },
      tint: { value: tint },
      rocky: { value: rocky ? 1 : 0 }
    },
    vertexShader: sphereVertex,
    fragmentShader: `
      uniform sampler2D surfaceMap;
      uniform vec3 sun;
      uniform vec3 tint;
      uniform float rocky;
      varying vec3 vWorld;
      varying vec3 vRadial;
      varying vec2 vUv;
      void main() {
        vec3 n = normalize(vRadial);
        vec3 v = normalize(cameraPosition - vWorld);
        vec3 textureColor = texture2D(surfaceMap, vUv).rgb;
        float lit = max(0.0, dot(n, sun));
        float halfLit = smoothstep(-.10, .47, dot(n, sun));
        float rim = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 3.5) * (.3 + .7 * lit);
        vec3 color = textureColor * tint * (.036 + .62 * halfLit + .55 * lit);
        color += vec3(.029, .105, .157) * rim * (1.0 - rocky);
        gl_FragColor = vec4(color, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
  });
  return new T.Mesh(new T.SphereGeometry(radius, rocky ? 32 : 88, rocky ? 18 : 52), material);
}

export function exterior(scene, texture) {
  const opaque = new T.Group();
  opaque.name = 'Exterior opaque surfaces';
  opaque.renderOrder = 10;
  scene.add(opaque);
  const stars = background(scene, opaque);
  const planet = makeGlobe(texture, planetRadius, new T.Vector3(.81, 1.0, 1.02), false);
  planet.name = 'Pelagic, the banded survey world';
  planet.position.copy(planetPosition);
  planet.rotation.set(.15, 1.02, .27);
  opaque.add(planet);

  const radius = planetRadius * 1.018;
  const halo = new T.Mesh(new T.SphereGeometry(radius, 72, 42), new T.ShaderMaterial({
    uniforms: { sun: { value: solarDirection } },
    vertexShader: sphereVertex,
    fragmentShader: `
      uniform vec3 sun;
      varying vec3 vWorld;
      varying vec3 vRadial;
      void main() {
        vec3 n = normalize(vRadial);
        vec3 ray = normalize(cameraPosition - vWorld);
        float tangent = abs(dot(ray, n));
        float light = .36 + .64 * smoothstep(-.3, .85, dot(sun, n));
        float density = pow(smoothstep(0.0, .214, tangent), 1.7);
        gl_FragColor = vec4(vec3(.044, .16, .25), density * light * .75);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    side: T.BackSide,
    transparent: true,
    depthWrite: false,
    blending: T.AdditiveBlending
  }));
  halo.position.copy(planetPosition);
  halo.name = 'Planetary limb';
  halo.renderOrder = -3;
  scene.add(halo);

  const moon = makeGlobe(texture, 1.18, new T.Vector3(.94, .83, .69), true);
  moon.name = 'Outer moon';
  moon.position.set(9.4, 4.18, -45.8);
  moon.rotation.set(.632, -.92, -.29);
  opaque.add(moon);
  return stars;
}

export async function loadPlanet() {
  const loader = new T.TextureLoader();
  try {
    const texture = await loader.loadAsync(new URL('../assets/pelagic.png', import.meta.url).href);
    texture.colorSpace = T.SRGBColorSpace;
    texture.wrapS = T.RepeatWrapping;
    texture.anisotropy = 4;
    return texture;
  } catch (error) {
    console.warn('The survey world texture could not be loaded. Using a flat color.', error);
    const texture = new T.DataTexture(new Uint8Array([99, 145, 160, 255]), 1, 1);
    texture.colorSpace = T.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }
}
