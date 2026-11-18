import * as T from "three";
import { createPalette, environmentTexture } from "./materials.js";
import { buildCourtyard, buildTea } from "./architecture.js";
import { buildStalls } from "./stalls.js";
import { dressPavement } from "./pavement.js";

function skyDome() {
  const uniforms = {
    horizon: { value: new T.Color(0x434d61) },
    upper: { value: new T.Color(0x1c2b45) },
    dusk: { value: new T.Color(0x4a4e62) }
  };
  const material = new T.ShaderMaterial({
    name: "Clouded night sky",
    side: T.BackSide,
    depthWrite: false,
    fog: false,
    toneMapped: false,
    uniforms,
    vertexShader: `
      varying vec3 vDirection;
      void main() {
        vDirection = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vDirection;
      uniform vec3 horizon;
      uniform vec3 upper;
      uniform vec3 dusk;
      void main() {
        vec3 d = normalize(vDirection);
        float y = clamp(d.y, 0.0, 1.0);
        float glow = pow(max(0.0, dot(d, normalize(vec3(0.61, 0.36, -0.72)))), 5.0)
          * (1.0 - smoothstep(0.10, 0.90, y));
        vec3 light = mix(horizon, upper, pow(y, 0.65));
        light = mix(light, dusk, glow * 0.72);
        float band = sin(d.x * 11.0 + d.z * 4.0 + sin(d.y * 14.0)) * sin(d.z * 8.2 + d.y * 17.0);
        float fine = cos(d.x * 26.0 - d.z * 18.0 + d.y * 19.0);
        light *= 1.0 + band * 0.10 + fine * 0.022;
        gl_FragColor = vec4(light, 1.0);
        #include <colorspace_fragment>
      }`
  });
  const dome = new T.Mesh(new T.SphereGeometry(62, 32, 20), material);
  dome.name = "Dusk above the court";
  dome.renderOrder = -10;
  return dome;
}

export function createMarket() {
  const scene = new T.Scene();
  scene.fog = new T.FogExp2(0x293241, .018);
  scene.environment = environmentTexture();
  scene.environmentIntensity = .68;
  scene.add(skyDome());

  const hemisphere = new T.HemisphereLight(0xb7c8e1,0x60515a,1.12);
  hemisphere.name = "Blue hour ambient";
  scene.add(hemisphere);
  const skylight = new T.DirectionalLight(0xb2cadf,.56);
  skylight.name = "Courtyard skylight";
  skylight.position.set(-2.5,10,-4);
  scene.add(skylight);

  const colliders = [];
  const materials = createPalette();
  buildCourtyard(scene, colliders, materials);
  buildStalls(scene, colliders, materials);
  buildTea(scene, colliders, materials);
  const updatePavement = dressPavement(scene);
  scene.updateMatrixWorld(true);
  return { scene, colliders, updatePavement };
}
