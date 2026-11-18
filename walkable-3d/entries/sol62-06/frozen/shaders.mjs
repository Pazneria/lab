export const ROCK_VERTEX = /* glsl */ `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec3 aTint;
layout(location=3) in vec4 aBake;
uniform mat4 uViewProjection;
out vec3 vPosition;
out vec3 vNormal;
out vec3 vTint;
out vec3 vBake;
flat out float vFamily;
void main() {
  vPosition = aPosition * 0.001;
  vNormal = aNormal;
  vTint = aTint * 1.30;
  vBake = aBake.yzw;
  vFamily = floor(aBake.x * 255.0 + 0.5);
  gl_Position = uViewProjection * vec4(vPosition, 1.0);
}
`;

export function rockFragment(reflection = false) {
  return /* glsl */ `#version 300 es
${reflection ? '#define REFLECTION_PASS' : ''}
precision highp float;
precision mediump sampler3D;
in vec3 vPosition;
in vec3 vNormal;
in vec3 vTint;
in vec3 vBake;
flat in float vFamily;
uniform vec3 uEye;
uniform sampler3D uGrain;
uniform float uTime;
out vec4 outColor;

const float waterY = -0.24;
const vec3 sunDirection = vec3(-0.244, 0.939, 0.244);
const vec3 sunColor = vec3(2.30, 1.99, 1.53);
const vec3 distanceHaze = vec3(0.050, 0.076, 0.078);
const vec3 airColor = vec3(0.75, 0.674, 0.541);

float square(float x) { return x * x; }
vec3 displayColor(vec3 x) {
  x = max(x, vec3(0.0));
  return pow(x / (x + 0.56), vec3(0.465));
}

vec3 diffuseContribution(vec3 p, vec3 n, vec3 source, vec3 color, float falloff, float wrap) {
  vec3 difference = source - p;
  float d2 = max(0.1, dot(difference, difference));
  vec3 toward = difference * inversesqrt(d2);
  float direction = max(0.0, (dot(n, toward) + wrap) / (1.0 + wrap));
  return color * direction / (1.0 + d2 * falloff);
}

vec2 toFissure(vec3 p) {
  vec2 q = p.xz - vec2(-0.244, 0.244) * ((p.y - 10.75) / 0.939) - vec2(-2.6, 1.15);
  return vec2((q.x - q.y * .30) * 1.08, q.y * .265);
}

#ifndef REFLECTION_PASS
float sunlitAir(vec3 from, vec3 to, float distanceAlongRay) {
  vec2 a = toFissure(from);
  vec2 b = toFissure(to) - a;
  float b2 = dot(b, b);
  float t = clamp(-dot(a, b) / max(b2, 0.00001), 0.0, 1.0);
  vec2 q = a + b * t;
  float density = exp(-dot(q, q) * 2.6);
  float width = min(distanceAlongRay, distanceAlongRay * 1.60 * inversesqrt(max(b2, 1.0)));
  float aboveWater = smoothstep(-0.46, 1.48, mix(from.y, to.y, t));
  float atRoof = 1.0 - smoothstep(11.4, 13.1, mix(from.y, to.y, t));
  return min(0.13, 0.021 * density * width * aboveWater * atRoof);
}

vec3 withRelief(vec3 n, float height, float distanceFromEye) {
  vec3 dx = dFdx(vPosition), dy = dFdy(vPosition);
  vec3 c1 = cross(dy, n), c2 = cross(n, dx);
  float denominator = dot(dx, c1);
  vec3 grad = (c1 * dFdx(height) + c2 * dFdy(height)) /
    max(abs(denominator), 0.000001) * sign(denominator);
  float fade = 1.0 - smoothstep(13.0, 25.0, distanceFromEye);
  return normalize(n - grad * fade / max(1.0, length(grad) * 1.7));
}
#endif

void main() {
  vec3 p = vPosition;
#ifdef REFLECTION_PASS
  if (p.y < waterY - 0.003) discard;
#endif
  vec3 n = normalize(vNormal);
  vec3 towardEye = uEye - p;
  float viewDistance = length(towardEye);
  vec3 view = towardEye / max(viewDistance, 0.001);
  float family = vFamily;
  bool stone = family < 1.5 || family > 7.5;
  float wet = vBake.z;
  float ao = vBake.x;
  float direct = vBake.y;
  vec3 color = vTint;
  float micro = 0.5;
  float matte = 0.0;
  float textureHeight = 0.0;
  if (stone) {
    vec4 body = texture(uGrain, p * vec3(0.095, 0.115, 0.104));
    vec4 textureGrain = texture(uGrain, p * vec3(0.52, 0.61, 0.54) + vec3(.08, .31, .51));
#ifndef REFLECTION_PASS
    vec4 pores = texture(uGrain, p * 1.57 + vec3(.12, .4, -.17));
#else
    vec4 pores = textureGrain;
#endif
    float layer = p.y + 0.18 * sin(p.x * .47 - p.z * .31) +
      .095 * sin(p.z * 1.04 + p.x * .62) + .020 * p.z + (body.r - .5) * .29;
    float steep = 1.0 - abs(n.y);
    float seam = smoothstep(.65, .99, cos(layer * 7.05 + body.g * 1.58));
    float fineBed = smoothstep(.84, 1.0, cos(layer * 26.7 + body.r * 3.7));
    float grading = sin(layer * 3.64 + body.g * 2.1) * .5 + .5;
    float palette = clamp(.33 + body.r * .67 + (grading - .5) * steep * .37, 0.0, 1.0);
    vec3 buff = mix(vec3(.405, .342, .255), vec3(.638, .600, .503), palette);
    float soil = smoothstep(.43, .75, body.g) * (1.0 - smoothstep(.29, .67, body.r));
    buff = mix(buff, vec3(.411, .284, .151), soil * .46);
    if (family == 1.0) {
      vec4 ribbons = texture(uGrain, p * vec3(.63, .110, .63) + .32);
      float flow = .68 + .33 * smoothstep(.28, .65, ribbons.r);
      buff = mix(buff, vec3(.652, .568, .403), .41) * flow;
      steep *= .44;
    }
    if (family == 8.0) steep *= .20;
    float fissuring = body.b * smoothstep(.53, .76, textureGrain.b) * steep;
    float chips = smoothstep(.56, .80, textureGrain.g);
    float pinholes = 1.0 - smoothstep(.18, .41, pores.a);
    float rough = .94 + .31 * (textureGrain.g - .5) + .12 * (pores.a - .5) -
      .31 * fissuring - .16 * pinholes;
    color *= buff * rough * (1.0 - (.14 * seam + .11 * fineBed) * (.25 + .75 * steep));
    float moisture = wet * (.87 + .2 * body.g);
    color *= mix(vec3(1.0), vec3(.46, .51, .418), moisture);
    textureHeight = .025 * textureGrain.g + .014 * pores.a - .009 * seam * steep + .007 * chips;
    micro = textureGrain.g;
    matte = .84;
  } else {
    vec4 noise = texture(uGrain, p * vec3(.67, .23, .68));
    vec4 grain = texture(uGrain, p * vec3(3.1, .68, 3.1) + .42);
    if (family == 2.0) {
      float aged = smoothstep(.33, .69, noise.r);
      float fiber = sin(p.x * 81.0 + p.z * 127.0 + 3.1 * noise.r + grain.r * 2.3);
      color *= .66 + .52 * aged + .11 * fiber;
      textureHeight = .003 * fiber + .011 * grain.g;
      matte = .72;
    } else if (family == 3.0 || family == 5.0) {
      float tarnish = smoothstep(.34, .69, noise.r * .53 + .47 * grain.r);
      color = mix(color * 0.76, color * 1.26 + vec3(.032, .012, .002), tarnish);
      matte = family == 3.0 ? .39 : .23;
    } else if (family == 4.0) {
      float braid = .76 + .37 * texture(uGrain, p * 5.45).g;
      color *= braid;
      matte = .91;
    } else {
      color *= .85 + .28 * grain.a;
      matte = family == 7.0 ? .14 : .63;
    }
  }
#ifndef REFLECTION_PASS
  n = withRelief(n, textureHeight, viewDistance);
#endif
  // Warm reflected light from the dry ledges and muted blue-green from the pool.
  float access = mix(.24, 1.0, pow(ao, 1.6));
  vec3 light = vec3(.156, .166, .163) * (.78 + .22 * n.y);
  light += diffuseContribution(p, n, vec3(-1.65, 5.70, 0.15), vec3(.44, .455, .388), .034, .86);
  light += diffuseContribution(p, n, vec3(-1.30, .23, 2.20), vec3(.074, .159, .147), .033, .72);
  light += diffuseContribution(p, n, vec3(2.14, 1.7, 16.4), vec3(.39, .346, .284), .083, .77);
  light += diffuseContribution(p, n, vec3(1.88, 3.35, -13.35), vec3(.275, .226, .164), .139, .65);
  light *= access;
  float sunDiffuse = max(0.0, dot(n, sunDirection));
  float saturationEdge = mix(.94, 1.0, clamp(ao * 2.0, 0.0, 1.0));
  vec3 painted = color * (light + sunColor * direct * sunDiffuse * saturationEdge);
  vec3 halfRay = normalize(sunDirection + view);
  float hardness = mix(19.0, 72.0, max(wet, 1.0 - matte));
  float specular = pow(max(0.0, dot(n, halfRay)), hardness);
  painted += sunColor * specular * direct * (wet * .17 + (1.0 - matte) * .077);
  float rim = pow(1.0 - clamp(dot(n, view), .0, 1.0), 4.0);
  painted += vec3(.031, .051, .045) * access * rim * wet * (.70 + .30 * micro);
  if (p.y < waterY - .006 && wet > .12) {
    float depth = waterY - p.y;
    float phase = uTime * .54;
    vec2 q = p.xz;
    float w1 = sin(q.x * 4.72 + 1.15 * sin(q.y * 3.20 + phase) + phase);
    float w2 = sin(q.y * 5.91 + 1.34 * sin(q.x * 3.72 - phase) - phase * .85);
    float paths = pow(max(0.0, 1.0 - abs(w1 + w2) * .76), 11.0);
    vec3 limestone = painted * exp(-vec3(.85, .36, .23) * depth);
    limestone += vec3(.036, .122, .103) * min(depth, .8) * (.64 + .36 * ao);
    limestone += vec3(.183, .251, .189) * paths * (.11 + direct * .89) * exp(-depth * .87);
    painted = mix(painted, limestone, min(1.0, wet * 1.22));
  }
  float fog = 1.0 - exp(-viewDistance * .012);
  painted = mix(painted, distanceHaze, fog * .66);
#ifndef REFLECTION_PASS
  painted = mix(painted, airColor, sunlitAir(uEye, p, viewDistance));
#endif
  outColor = vec4(displayColor(painted), 1.0);
}
`;
}

export const WATER_VERTEX = /* glsl */ `#version 300 es
precision highp float;
layout(location=0) in vec2 aXZ;
layout(location=1) in vec2 aDepthAndBank;
uniform mat4 uViewProjection;
out vec3 vPosition;
out vec2 vDepthAndBank;
out vec4 vScreen;
void main() {
  vPosition = vec3(aXZ.x, -0.24, aXZ.y);
  vDepthAndBank = aDepthAndBank;
  vScreen = uViewProjection * vec4(vPosition, 1.0);
  gl_Position = vScreen;
}
`;

export const WATER_FRAGMENT = /* glsl */ `#version 300 es
precision highp float;
in vec3 vPosition;
in vec2 vDepthAndBank;
in vec4 vScreen;
uniform float uTime;
uniform vec3 uEye;
uniform sampler2D uReflection;
out vec4 outColor;

vec2 capillaries(vec2 p, float t) {
  float wa = dot(p, vec2(2.55, 5.33)) - t * .81;
  float wb = dot(p, vec2(-6.37, 2.91)) + t * .92 + .31 * sin(wa * .45);
  float wc = dot(p, vec2(12.81, -7.35)) - t * 1.22 + .21 * sin(wb);
  float wd = dot(p, vec2(18.85, 12.63)) + t * 1.59;
  vec2 outSlope = vec2(-.017, -.034) * cos(wa) + vec2(.026, -.013) * cos(wb);
  outSlope += vec2(-.016, .009) * cos(wc) + vec2(-.013, -.009) * cos(wd);
  vec2 delta = p - vec2(-4.16, .16);
  float distanceFromDrip = length(delta);
  float phase = distanceFromDrip * 27.0 - t * 4.4;
  float ringDistance = (distanceFromDrip - 1.12) * 1.4;
  float ring = exp(-ringDistance * ringDistance);
  outSlope += .027 * cos(phase) * ring * delta / max(.16, distanceFromDrip);
  return outSlope;
}

void main() {
  vec2 p = vPosition.xz;
  vec3 look = normalize(uEye - vPosition);
  float bank = vDepthAndBank.y;
  float depth = vDepthAndBank.x;
  float deep = 1.0 - exp(-depth * 1.19);
  float damping = .31 + .69 * smoothstep(.03, .66, bank);
  vec2 shift = capillaries(p, uTime) * damping;
  vec3 normal = normalize(vec3(shift.x, 1.0, shift.y));
  float fresnel = .026 + .87 * pow(1.0 - clamp(dot(look, normal), .0, 1.0), 4.2);
  vec2 screen = vScreen.xy / vScreen.w * .5 + .5;
  vec2 uv = clamp(screen + shift * (.11 + .10 * fresnel), vec2(.002), vec2(.998));
  vec3 reflection = texture(uReflection, uv).rgb;
  vec3 water = mix(vec3(.31, .43, .366), vec3(.120, .285, .266), deep);
  float softGrade = .94 + .06 * sin(p.x * .7 + p.y * .37);
  water *= softGrade;
  float reflectionShare = clamp(.18 + fresnel * .89 + deep * .16, .0, .92);
  vec3 blended = mix(water, reflection * vec3(.84, .945, .925), reflectionShare);
  float lowBank = (1.0 - smoothstep(.022, .17, bank)) * smoothstep(.001, .022, bank);
  float rayX = p.x - .19 - (p.y + 1.63) * .30;
  float rayZ = (p.y + 1.63) * .34;
  float bright = exp(-rayX * rayX * 2.5 - rayZ * rayZ);
  vec3 sunHalf = normalize(look + vec3(-.244, .939, .244));
  float sparkle = pow(max(0.0, dot(normal, sunHalf)), 128.0) * bright;
  blended += vec3(.30, .27, .19) * sparkle * .25;
  blended -= vec3(.04, .033, .019) * lowBank;
  float coverage = smoothstep(.0, .11, bank);
  float alpha = coverage * clamp(.25 + .36 * deep + .58 * fresnel, .11, .94);
  outColor = vec4(blended, alpha);
}
`;

export const DUST_VERTEX = /* glsl */ `#version 300 es
precision highp float;
layout(location=0) in vec4 aMote;
uniform mat4 uViewProjection;
uniform vec3 uEye;
uniform float uTime;
uniform float uPixels;
out float vAlpha;
void main() {
  vec3 p = aMote.xyz;
  float seed = aMote.w;
  p.y += sin(uTime * .18 + seed * 28.0) * .26;
  p.x += sin(uTime * .26 + seed * 18.0) * .16;
  p.z += cos(uTime * .20 + seed * 21.0) * .21;
  vec4 clip = uViewProjection * vec4(p, 1.0);
  gl_Position = clip;
  float distanceToEye = length(uEye - p);
  gl_PointSize = clamp(uPixels * (.009 + .008 * seed) / max(1.0, distanceToEye), 1.0, 3.0);
  vAlpha = .23 * (.52 + .48 * sin(uTime * .81 + seed * 54.0)) *
    smoothstep(.4, 2.2, distanceToEye) * (1.0 - smoothstep(8.0, 19.0, distanceToEye));
}
`;

export const DUST_FRAGMENT = /* glsl */ `#version 300 es
precision highp float;
in float vAlpha;
out vec4 outColor;
void main() {
  vec2 p = (gl_PointCoord - .5) * 2.0;
  float halo = max(0.0, 1.0 - dot(p, p));
  outColor = vec4(.94, .846, .629, vAlpha * halo * halo);
}
`;
