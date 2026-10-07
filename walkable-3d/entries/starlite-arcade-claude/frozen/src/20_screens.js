
// ---------------------------------------------------------------------------
// CRT attract screens: procedural GLSL per game (no texture re-uploads per frame)
// ---------------------------------------------------------------------------
const SCREEN_COMMON = /* glsl */`
varying vec2 vUv;
uniform float uTime;
uniform float uOffset;
uniform sampler2D uSheet;
uniform vec2 uRes;
uniform float uAspect;
float AA;
float h11(float p){ return fract(sin(p*127.1)*43758.5453); }
float h21(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),f.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ return vnoise(p)*0.55 + vnoise(p*2.03+3.1)*0.3 + vnoise(p*4.1+7.7)*0.15; }
float fillS(float d){ return 1.0 - smoothstep(-AA, AA, d); }
float sdBox(vec2 p, vec2 b){ vec2 d=abs(p)-b; return length(max(d,0.0))+min(max(d.x,d.y),0.0); }
float sdCircle(vec2 p, float r){ return length(p)-r; }
float sdTri(vec2 p, vec2 a, vec2 b, vec2 c){
  vec2 e0=b-a,e1=c-b,e2=a-c,v0=p-a,v1=p-b,v2=p-c;
  vec2 pq0=v0-e0*clamp(dot(v0,e0)/dot(e0,e0),0.,1.);
  vec2 pq1=v1-e1*clamp(dot(v1,e1)/dot(e1,e1),0.,1.);
  vec2 pq2=v2-e2*clamp(dot(v2,e2)/dot(e2,e2),0.,1.);
  float s=sign(e0.x*e2.y-e0.y*e2.x);
  vec2 d=min(min(vec2(dot(pq0,pq0),s*(v0.x*e0.y-v0.y*e0.x)),vec2(dot(pq1,pq1),s*(v1.x*e1.y-v1.y*e1.x))),vec2(dot(pq2,pq2),s*(v2.x*e2.y-v2.y*e2.x)));
  return -sqrt(d.x)*sign(d.y);
}
vec3 stars(vec2 p, float dens, float t){
  vec2 g = floor(p*dens), f = fract(p*dens)-0.5;
  float h = h21(g); if(h < 0.82) return vec3(0.0);
  vec2 o = vec2(h21(g+1.3), h21(g+2.7))-0.5;
  float d = length(f - o*0.6);
  float tw = 0.75 + 0.25*sin(t*1.5 + h*40.0);
  return vec3(smoothstep(0.12, 0.0, d)*tw*(0.5+0.5*h));
}
// sample a region of the text sheet: canvas pixel rows [y0,y1], placed in screen rect r=(x0,y0,x1,y1)
vec4 sheet(vec2 p, vec4 r, float sy0, float sy1){
  vec2 q = (p - r.xy) / (r.zw - r.xy);
  if(q.x<0.0||q.x>1.0||q.y<0.0||q.y>1.0) return vec4(0.0);
  vec2 s = vec2(q.x, 1.0 - mix(sy1, sy0, q.y)/512.0);
  return texture2D(uSheet, s);
}
`;

const GAME_GLSL = {
  crater: /* glsl */`
vec3 game(vec2 p, float t){
  // p.x in [0,uAspect], p.y in [0,1]
  vec3 col = mix(vec3(0.02,0.0,0.06), vec3(0.18,0.05,0.22), smoothstep(1.0,0.35,p.y));
  col += stars(p + vec2(t*0.01,0.0), 26.0, t);
  vec2 ep = p - vec2(0.56, 0.8); float e = sdCircle(ep, 0.075);
  vec3 earth = mix(vec3(0.1,0.35,0.9), vec3(0.2,0.8,0.4), step(0.55, vnoise(ep*40.0)));
  earth *= smoothstep(-0.05, 0.05, ep.x + ep.y*0.3 + 0.03);
  col = mix(col, earth, fillS(e));
  float x = p.x + t*0.06;
  float ridge = 0.46 + 0.07*sin(x*7.0) + 0.04*sin(x*17.0+1.0);
  col = mix(col, vec3(0.28,0.08,0.22), fillS(p.y - ridge));
  float gx = p.x + t*0.22;
  float ground = 0.30 + 0.02*sin(gx*11.0) + 0.012*sin(gx*29.0);
  vec3 gcol = mix(vec3(0.75,0.36,0.16), vec3(0.45,0.18,0.12), smoothstep(ground, ground-0.25, p.y));
  float cx = fract(gx*1.3)-0.5; float crater = sdBox(vec2(cx*0.77, p.y-(ground-0.035)), vec2(0.07,0.012));
  gcol = mix(gcol, vec3(0.2,0.07,0.08), fillS(crater));
  col = mix(col, gcol, fillS(p.y - ground));
  // buggy
  float bx = 0.28, bgx = bx + t*0.22;
  float by = 0.30 + 0.02*sin(bgx*11.0) + 0.012*sin(bgx*29.0) + 0.045 + abs(sin(t*3.0))*0.012;
  vec2 b = p - vec2(bx, by);
  float body = sdBox(b - vec2(0.0,0.01), vec2(0.07,0.018));
  float dome = sdCircle(b - vec2(-0.01,0.03), 0.026);
  col = mix(col, vec3(0.5,0.9,1.0), fillS(max(dome, -b.y+0.03)));
  col = mix(col, vec3(1.0,0.48,0.1), fillS(body));
  for(int i=0;i<3;i++){ vec2 w = b - vec2(-0.05+0.05*float(i), -0.017); float wd = sdCircle(w, 0.017);
    float sp = step(0.0, sin(atan(w.y,w.x)*4.0 + t*14.0));
    col = mix(col, mix(vec3(0.12,0.08,0.1), vec3(0.9,0.85,0.7), sp*step(length(w),0.01)), fillS(wd)); }
  // shots and saucer
  float sx = 0.4 + 0.22*sin(t*0.7);
  vec2 s = p - vec2(sx, 0.86 + 0.02*sin(t*2.0));
  col = mix(col, vec3(0.6,1.0,0.5), fillS(sdBox(s, vec2(0.045,0.008))));
  col = mix(col, vec3(0.9,1.0,0.9), fillS(sdCircle(s-vec2(0.0,0.01), 0.018)));
  float shot = fract(t*0.8);
  col += vec3(1.0,0.9,0.3)*fillS(sdBox(p - vec2(bx+0.02, by+0.05+shot*0.5), vec2(0.004,0.012)));
  return col;
}`,
  nomads: /* glsl */`
vec3 game(vec2 p, float t){
  float n = fbm(p*3.0 + vec2(0.0, t*0.03));
  vec3 col = mix(vec3(0.01,0.0,0.04), vec3(0.35,0.05,0.35), n*n*0.9);
  col += vec3(0.05,0.12,0.25)*fbm(p*5.0 - vec2(t*0.02,0.0));
  col += stars(p + vec2(0.0, t*0.05), 22.0, t)*0.7 + stars(p + vec2(0.3, t*0.12), 12.0, t);
  float sway = sin(t*0.8)*0.07;
  for(int j=0;j<3;j++) for(int i=0;i<5;i++){
    vec2 c = vec2(0.1 + float(i)*0.135 + sway, 0.62 + float(j)*0.085);
    float dive = step(4.0, mod(t + float(i*3+j)*1.7, 9.0));
    vec2 q = p - c; q.x *= 1.0 + 0.15*sin(t*6.0 + float(i));
    float s = sdTri(q, vec2(-0.03,0.02), vec2(0.03,0.02), vec2(0.0,-0.025));
    s = min(s, sdBox(q - vec2(0.0,0.018), vec2(0.04,0.006)));
    vec3 ec = j==1 ? vec3(0.2,0.9,1.0) : (j==0 ? vec3(1.0,0.25,0.65) : vec3(1.0,0.85,0.2));
    col = mix(col, ec, fillS(s));
  }
  float px = 0.375 + 0.25*sin(t*0.9);
  vec2 q = p - vec2(px, 0.12);
  float ship = sdTri(q, vec2(-0.04,-0.025), vec2(0.04,-0.025), vec2(0.0,0.045));
  col = mix(col, vec3(0.95,0.95,1.0), fillS(ship));
  col += vec3(1.0,0.5,0.1)*fillS(sdCircle(q - vec2(0.0,-0.035), 0.008 + 0.003*sin(t*30.0)));
  for(int k=0;k<3;k++){ float f = fract(t*0.9 + float(k)*0.33);
    float bxp = 0.375 + 0.25*sin((t - f/0.9)*0.9);
    col += vec3(0.6,1.0,1.0)*fillS(sdBox(p - vec2(bxp, 0.17 + f*0.7), vec2(0.003,0.012))); }
  return col;
}`,
  tide: /* glsl */`
vec3 game(vec2 p, float t){
  vec3 col = mix(vec3(0.0,0.12,0.22), vec3(0.05,0.55,0.62), p.y);
  float c = sin(p.x*22.0 + sin(p.y*17.0 + t)*1.4 + t*0.8) * sin(p.y*19.0 + sin(p.x*13.0 - t*0.7)*1.6);
  col += vec3(0.25,0.5,0.45)*smoothstep(0.75,1.0,c)*0.5*p.y;
  float rays = smoothstep(0.6,1.0, sin((p.x - p.y*0.4)*18.0 + t*0.3)) * smoothstep(0.3,1.0,p.y);
  col += vec3(0.2,0.35,0.3)*rays*0.35;
  float sand = 0.2 + 0.015*sin(p.x*30.0);
  col = mix(col, mix(vec3(0.95,0.75,0.42), vec3(0.75,0.5,0.3), step(0.5, fract(p.x*30.0+p.y*10.0))*0.3), fillS(p.y - sand));
  for(int i=0;i<4;i++){ float x0 = 0.15 + float(i)*0.35;
    float w = sin(p.y*10.0 + t*1.6 + float(i))*0.02*p.y*3.0;
    float d = abs(p.x - x0 - w) - 0.008*(1.2-p.y);
    col = mix(col, vec3(0.1,0.6,0.3), fillS(max(d, p.y - (0.55 + 0.1*h11(float(i)))))); }
  float beat = pow(abs(sin(t*3.1416)), 4.0);
  vec2 cp = p - vec2(uAspect*0.5, 0.33 + 0.02*beat);
  cp.x += 0.04*sin(t*1.5708);
  float body = sdBox(cp*vec2(1.0,1.6), vec2(0.07,0.02)) - 0.03;
  float clawL = sdCircle(cp - vec2(-0.13, 0.08 + 0.05*sin(t*3.14)), 0.035);
  float clawR = sdCircle(cp - vec2( 0.13, 0.08 - 0.05*sin(t*3.14)), 0.035);
  float legs = 1.0;
  for(int k=0;k<3;k++){ float lx = 0.05 + float(k)*0.025; legs = min(legs, min(sdBox(cp - vec2(-lx-0.04,-0.045), vec2(0.03,0.004)), sdBox(cp - vec2(lx+0.04,-0.045), vec2(0.03,0.004)))); }
  vec3 crab = vec3(1.0,0.38,0.3);
  col = mix(col, crab*0.8, fillS(legs));
  col = mix(col, crab, fillS(min(body, min(clawL, clawR))));
  col = mix(col, vec3(1.0), fillS(min(sdCircle(cp-vec2(-0.03,0.06),0.012), sdCircle(cp-vec2(0.03,0.06),0.012))));
  col = mix(col, vec3(0.0), fillS(min(sdCircle(cp-vec2(-0.028,0.062),0.006), sdCircle(cp-vec2(0.032,0.062),0.006))));
  for(int i=0;i<8;i++){ float fi = float(i); float y = fract(t*0.12 + h11(fi)) ; vec2 bp = p - vec2(h11(fi+3.0)*uAspect + 0.01*sin(t*2.0+fi), y);
    col += vec3(0.7,1.0,1.0)*0.6*(1.0 - smoothstep(0.0, AA*2.0, abs(length(bp) - 0.012))); }
  // rhythm lane
  float lane = sdBox(p - vec2(uAspect*0.5, 0.08), vec2(uAspect*0.45, 0.04));
  col = mix(col, vec3(0.02,0.05,0.1), fillS(lane)*0.75);
  vec2 tp = p - vec2(0.18, 0.08);
  col += vec3(1.0,0.9,0.4)*(0.4 + 0.6*beat)*(1.0 - smoothstep(0.0, AA*2.5, abs(length(tp) - 0.03)));
  for(int k=0;k<5;k++){ float x = 0.18 + fract(-t*0.25 + float(k)*0.2)*1.05; vec2 ap = p - vec2(x, 0.08);
    float ar = sdTri(ap, vec2(-0.02,0.0), vec2(0.015,0.022), vec2(0.015,-0.022));
    col = mix(col, k%2==0 ? vec3(1.0,0.4,0.6) : vec3(0.4,1.0,0.9), fillS(ar)); }
  return col;
}`,
  kite: /* glsl */`
vec3 kite(vec2 p, vec2 c, float r, vec3 a, vec3 b, inout vec3 col){
  vec2 q = p - c; q = mat2(cos(r),-sin(r),sin(r),cos(r))*q;
  float d = sdTri(q, vec2(0.0,0.07), vec2(0.045,0.01), vec2(0.0,-0.08));
  float e = sdTri(q, vec2(0.0,0.07), vec2(-0.045,0.01), vec2(0.0,-0.08));
  col = mix(col, a, fillS(d)); col = mix(col, b, fillS(e));
  return col;
}
vec3 game(vec2 p, float t){
  vec3 col = mix(vec3(1.0,0.62,0.3), vec3(0.32,0.1,0.42), smoothstep(0.25,1.0,p.y));
  vec2 sp = p - vec2(uAspect*0.5, 0.3);
  float sun = sdCircle(sp, 0.17);
  float band = step(0.5, fract((p.y)*28.0)) * step(p.y, 0.3);
  col = mix(col, mix(vec3(1.0,0.92,0.6), vec3(1.0,0.5,0.55), smoothstep(0.45,0.15,p.y)), fillS(sun)*(1.0-band*0.9));
  for(int i=0;i<5;i++){ float fi=float(i); vec2 cp = p - vec2(fract(h11(fi)+t*0.02*(1.0+fi*0.3))*(uAspect+0.4)-0.2, 0.55+h11(fi+9.0)*0.35);
    float cl = sdCircle(cp*vec2(0.5,1.6), 0.03); cl = min(cl, sdCircle((cp-vec2(0.04,0.01))*vec2(0.5,1.6), 0.025));
    col = mix(col, vec3(1.0,0.86,0.82), fillS(cl)*0.65); }
  float hill = 0.18 + 0.05*sin(p.x*6.0+1.0) + 0.03*sin(p.x*15.0);
  col = mix(col, vec3(0.18,0.06,0.2), fillS(p.y - hill));
  float hill2 = 0.1 + 0.04*sin(p.x*9.0+3.0);
  col = mix(col, vec3(0.08,0.02,0.1), fillS(p.y - hill2));
  vec2 k1 = vec2(uAspect*0.5 - 0.28 + 0.12*sin(t*0.7), 0.62 + 0.12*sin(t*1.4));
  vec2 k2 = vec2(uAspect*0.5 + 0.28 + 0.12*sin(t*0.7+2.0), 0.6 + 0.12*sin(t*1.4+1.0));
  // strings
  float s1 = abs(dot(normalize(vec2(k1.y-0.0, -(k1.x-0.05))), p - vec2(0.05,0.0)));
  float s2 = abs(dot(normalize(vec2(k2.y-0.0, -(k2.x-(uAspect-0.05)))), p - vec2(uAspect-0.05,0.0)));
  col = mix(col, vec3(1.0), (1.0-smoothstep(0.0,AA*1.5,s1))*step(p.y,k1.y)*0.5);
  col = mix(col, vec3(1.0), (1.0-smoothstep(0.0,AA*1.5,s2))*step(p.y,k2.y)*0.5);
  for(int i=1;i<8;i++){ float fi=float(i);
    vec2 tp1 = k1 + vec2(-0.012*fi + 0.015*sin(t*4.0 - fi), -0.02*fi);
    vec2 tp2 = k2 + vec2(0.012*fi + 0.015*sin(t*4.0 - fi + 1.0), -0.02*fi);
    col = mix(col, i%2==0 ? vec3(1.0,0.85,0.2) : vec3(0.9,0.2,0.3), fillS(sdCircle(p - tp1, 0.008)));
    col = mix(col, i%2==0 ? vec3(1.0) : vec3(0.2,0.6,1.0), fillS(sdCircle(p - tp2, 0.008))); }
  kite(p, k1, 0.3*sin(t*1.1), vec3(0.9,0.2,0.3), vec3(1.0,0.85,0.2), col);
  kite(p, k2, 0.3*sin(t*1.1+1.5), vec3(0.2,0.6,1.0), vec3(1.0), col);
  float hpL = 0.6 + 0.3*sin(t*0.5); float hpR = 0.6 + 0.3*cos(t*0.45);
  col = mix(col, vec3(0.1), fillS(sdBox(p - vec2(0.2, 0.93), vec2(0.15, 0.015))));
  col = mix(col, vec3(1.0,0.3,0.4), fillS(sdBox(p - vec2(0.05 + 0.15*hpL, 0.93), vec2(0.15*hpL, 0.01))));
  col = mix(col, vec3(0.1), fillS(sdBox(p - vec2(uAspect-0.2, 0.93), vec2(0.15, 0.015))));
  col = mix(col, vec3(0.3,0.7,1.0), fillS(sdBox(p - vec2(uAspect-0.05 - 0.15*hpR, 0.93), vec2(0.15*hpR, 0.01))));
  return col;
}`,
  light: /* glsl */`
vec3 game(vec2 p, float t){
  vec3 col = mix(vec3(0.01,0.02,0.07), vec3(0.06,0.12,0.3), smoothstep(1.0,0.4,p.y));
  col += stars(p, 30.0, t)*0.9;
  vec2 mp = p - vec2(0.25, 0.78);
  float moon = sdCircle(mp, 0.085);
  vec3 mc = vec3(1.0,0.97,0.85) * (0.85 + 0.15*vnoise(mp*60.0));
  col = mix(col, mc, fillS(moon));
  col += vec3(0.5,0.55,0.7)*0.25*smoothstep(0.3, 0.0, length(mp));
  float horizon = 0.42;
  if(p.y < horizon){
    float d = horizon - p.y;
    vec3 sea = mix(vec3(0.03,0.1,0.22), vec3(0.01,0.03,0.08), d*2.0);
    float w = sin(p.x*60.0/(d*6.0+0.3) + t*1.5 + sin(p.x*13.0)) * 0.5 + 0.5;
    sea += vec3(0.1,0.2,0.3)*w*(0.3 - d*0.5);
    float refl = smoothstep(0.06, 0.0, abs(p.x - 0.25 + 0.01*sin(p.y*120.0 + t*3.0))) * step(0.5, fract(p.y*60.0 + t*0.5));
    sea += vec3(0.9,0.9,0.8)*refl*0.6;
    col = sea;
  }
  // lighthouse on rocks
  vec2 lp = p - vec2(uAspect*0.74, horizon);
  float rock = sdCircle(lp*vec2(0.6,1.4) + vec2(0.0,0.05), 0.08);
  col = mix(col, vec3(0.05,0.06,0.1), fillS(rock));
  float tower = sdTri(lp, vec2(-0.04,0.0), vec2(0.04,0.0), vec2(0.0,0.5));
  tower = max(tower, lp.y - 0.27);
  vec3 tc = mix(vec3(0.95,0.93,0.88), vec3(0.85,0.18,0.25), step(0.5, fract(lp.y*12.0)));
  col = mix(col, tc*0.85, fillS(tower));
  vec2 lamp = lp - vec2(0.0, 0.29);
  col = mix(col, vec3(1.0,0.95,0.7), fillS(sdBox(lamp, vec2(0.018,0.02))));
  col = mix(col, vec3(0.6,0.1,0.15), fillS(sdTri(lamp - vec2(0.0,0.02), vec2(-0.026,0.0), vec2(0.026,0.0), vec2(0.0,0.03))));
  // sweeping beam
  float ang = t*0.9;
  float dir = cos(ang) >= 0.0 ? 1.0 : -1.0;
  float spread = abs(cos(ang));
  vec2 bp = p - (vec2(uAspect*0.74, horizon) + vec2(0.0,0.29));
  float a = atan(bp.y, bp.x*dir);
  float beam = smoothstep(0.09, 0.0, abs(a - 0.05*sin(ang))) * smoothstep(0.0, 0.05, bp.x*dir) * spread;
  col += vec3(1.0,0.95,0.7)*beam*0.55*exp(-length(bp)*1.2);
  col += vec3(1.0,0.95,0.75)*smoothstep(0.06,0.0,length(bp))*(0.5+0.5*spread);
  // boats bobbing, lit when the beam passes
  for(int i=0;i<3;i++){ float fi=float(i);
    float bx = fract(0.1 + fi*0.31 + t*0.012*(1.0+fi*0.4))*(uAspect*0.65);
    vec2 q = p - vec2(bx, horizon - 0.05 - fi*0.07 + 0.006*sin(t*2.0+fi));
    float hull = sdTri(q, vec2(-0.04,0.0), vec2(0.04,0.0), vec2(0.0,-0.02));
    hull = min(hull, sdBox(q - vec2(0.0,0.007), vec2(0.04,0.007)));
    float sail = sdTri(q - vec2(0.0,0.012), vec2(0.0,0.0), vec2(0.0,0.07), vec2(0.035,0.0));
    vec2 bq = q + vec2(bx,0.0) - vec2(uAspect*0.74,0.29) + vec2(0.0,horizon);
    float lit = beam > 0.01 ? 1.0 : 0.0;
    float hitb = smoothstep(0.12,0.0, abs(atan(q.y + horizon - 0.05 - (horizon+0.29), (q.x + bx - uAspect*0.74)*dir) - 0.05*sin(ang))) * spread;
    vec3 hc = mix(vec3(0.15,0.12,0.18), vec3(0.95,0.75,0.4), hitb);
    col = mix(col, hc, fillS(hull));
    col = mix(col, mix(vec3(0.5,0.55,0.7), vec3(1.0,0.97,0.85), hitb), fillS(sail)); }
  // gulls
  for(int i=0;i<3;i++){ float fi=float(i); vec2 g = p - vec2(fract(t*0.03 + fi*0.37)*uAspect, 0.6 + 0.08*fi + 0.01*sin(t*3.0+fi));
    float wing = abs(g.y - abs(g.x)*0.6*(0.6+0.4*sin(t*8.0+fi))) ; col = mix(col, vec3(0.9), (1.0-smoothstep(0.0,AA*1.5,wing))*step(abs(g.x),0.02)); }
  return col;
}`,
};

function screenMaterial(key, offset) {
  const G = GAMES[key];
  const aspect = G.portrait ? 0.75 : 4 / 3;
  const res = G.portrait ? [224, 288] : [320, 240];
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime, uOffset: { value: offset }, uSheet: { value: screenSheet(key) }, uRes: { value: new THREE.Vector2(...res) }, uAspect: { value: aspect } },
    vertexShader: /* glsl */`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: SCREEN_COMMON + GAME_GLSL[key] + /* glsl */`
void main(){
  vec2 uv = vUv;
  vec2 cc = uv - 0.5;
  uv = 0.5 + cc*(1.0 + 0.045*dot(cc,cc)*4.0);
  float inside = smoothstep(0.0,0.012,uv.x)*smoothstep(1.0,0.988,uv.x)*smoothstep(0.0,0.012,uv.y)*smoothstep(1.0,0.988,uv.y);
  vec2 fw = fwidth(uv*uRes);
  float near = clamp(1.6 - max(fw.x,fw.y), 0.0, 1.0);             // pixel-art only when we can resolve it
  vec2 q = mix(uv, (floor(uv*uRes)+0.5)/uRes, near);
  AA = max(1.5/uRes.y, length(fwidth(uv))*0.9);
  vec2 p = vec2(q.x*uAspect, q.y);
  float t = uTime + uOffset;
  float cyc = mod(t, 22.0);
  vec3 col = game(p, t);
  // HUD on top
  vec4 hud = sheet(q, vec4(0.03, 0.9, 0.97, 0.985), 200.0, 260.0);
  col = mix(col, hud.rgb, hud.a);
  float blink = step(0.35, fract(t*0.5));
  vec4 coin = sheet(q, vec4(0.15, 0.03, 0.85, 0.09), 262.0, 305.0);
  col = mix(col, coin.rgb, coin.a*blink*step(cyc, 13.0));
  // title card and high-score table phases
  float title = smoothstep(13.0,13.4,cyc)*(1.0-smoothstep(17.6,18.0,cyc));
  float table = smoothstep(17.6,18.0,cyc)*(1.0-smoothstep(21.6,22.0,cyc));
  if(title + table > 0.0){
    vec3 dim = col*0.25;
    vec4 logo = sheet(q, uAspect < 1.0 ? vec4(0.02,0.52,0.98,0.84) : vec4(0.08,0.45,0.92,0.92), 8.0, 196.0);
    vec3 tcol = mix(dim, logo.rgb, logo.a);
    vec4 c2 = sheet(q, vec4(0.15, 0.18, 0.85, 0.27), 262.0, 305.0);
    tcol = mix(tcol, c2.rgb, c2.a*blink);
    vec4 hs = sheet(q, uAspect < 1.0 ? vec4(0.02,0.18,0.98,0.72) : vec4(0.12,0.08,0.88,0.84), 310.0, 512.0);
    vec3 hcol = mix(vec3(0.0,0.0,0.03), hs.rgb, hs.a);
    col = mix(col, tcol, title);
    col = mix(col, hcol, table);
  }
  // scanlines fade out once they would alias
  float sl = q.y*uRes.y;
  float scan = 0.5 + 0.5*cos(6.2831853*sl);
  col *= mix(1.0, 0.72 + 0.28*scan, near);
  // RGB phosphor mask, close range only
  float m = mod(floor(uv.x*uRes.x*3.0), 3.0);
  vec3 mask = m < 1.0 ? vec3(1.08,0.94,0.94) : (m < 2.0 ? vec3(0.94,1.08,0.94) : vec3(0.94,0.94,1.08));
  col *= mix(vec3(1.0), mask, near*0.8);
  float vig = 1.0 - 0.45*dot(cc,cc)*2.5;
  col = pow(max(col,0.0), vec3(2.2)) * vig * 1.35 * inside + vec3(0.004,0.006,0.008);
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
  });
  return mat;
}
// bulged CRT surface
function crtGeometry(w, h, bulge = 0.018) {
  const geo = new THREE.PlaneGeometry(w, h, 18, 14);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) / (w / 2), y = pos.getY(i) / (h / 2);
    pos.setZ(i, bulge * (1 - 0.5 * x * x) * (1 - 0.5 * y * y));
  }
  geo.computeVertexNormals();
  return geo;
}
