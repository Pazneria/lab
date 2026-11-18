'use strict';

const Ward = (() => {
  const stone = 0, mortar = 1, wood = 2, endgrain = 3, iron = 4;
  const cloth = 5, leather = 6, straw = 7, paper = 8, embers = 9;
  const water = 10, plain = 11, shadow = 12, glass = 13, chalk = 14;
  const note = 15, chart = 16, plaque = 17, ledger = 18, mug = 19;
  const TAU = Math.PI * 2;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const mix = (a, b, t) => a + (b - a) * t;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [
    a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]
  ];
  const unit = a => mul(a, 1 / (Math.hypot(...a) || 1));
  const rotate = (p, angle) => {
    const c = Math.cos(angle), s = Math.sin(angle);
    return [c * p[0] + s * p[2], p[1], c * p[2] - s * p[0]];
  };
  function rng(seed) {
    return () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const colors = new Map();
  function rgb(hex) {
    if (typeof hex !== 'string') return hex;
    if (!colors.has(hex)) {
      const h = Number.parseInt(hex.replace('#', ''), 16);
      colors.set(hex, [h >> 16, (h >> 8) & 255, h & 255].map(c => (c / 255) ** 2.15));
    }
    return colors.get(hex);
  }
  const tint = (color, gain) => mul(rgb(color), gain);
  const blend = (a, b, k) => rgb(a).map((x, i) => mix(x, rgb(b)[i], k));

  class Mesh {
    constructor(zone = 'room', transparent = false) {
      this.zone = zone;
      this.transparent = transparent;
      this.data = [];
      this.indices = [];
      this.min = [Infinity, Infinity, Infinity];
      this.max = [-Infinity, -Infinity, -Infinity];
    }
    vertex(p, n, uv, color, material, em) {
      this.data.push(...p, ...n, ...uv, ...color, material, em);
      for (let i = 0; i < 3; i++) {
        this.min[i] = Math.min(this.min[i], p[i]);
        this.max[i] = Math.max(this.max[i], p[i]);
      }
    }
    face(points, color, material = stone, uv, em = 0, normals) {
      const n = unit(cross(sub(points[1], points[0]), sub(points[2], points[0])));
      if (dot(n, n) < .01) return;
      const c = rgb(color);
      const scale = material === wood || material === endgrain ? 1.2 : .85;
      if (!uv) {
        const a = n.map(Math.abs);
        uv = points.map(p => {
          if (a[1] >= a[0] && a[1] >= a[2]) return [p[0] * scale, p[2] * scale];
          if (a[0] > a[2]) return [p[2] * scale, p[1] * scale];
          return [p[0] * scale, p[1] * scale];
        });
      }
      const first=this.data.length/13;
      for (let index=0;index<points.length;index++) {
        this.vertex(points[index],normals ? normals[index] : n,uv[index],c,material,em);
      }
      for (let i=1;i<points.length-1;i++) this.indices.push(first,first+i,first+i+1);
    }
    box(center, size, color, material = stone, yaw = 0, em = 0, grain = 'y') {
      const [x, y, z] = size.map(s => s / 2);
      const p = [[-x,-y,-z],[x,-y,-z],[x,y,-z],[-x,y,-z],[-x,-y,z],[x,-y,z],[x,y,z],[-x,y,z]];
      const world = p.map(q => add(center, yaw ? rotate(q, yaw) : q));
      const sides = [[1,0,3,2],[4,5,6,7],[0,4,7,3],[5,1,2,6],[3,7,6,2],[0,1,5,4]];
      for (const face of sides) {
        let uv;
        if (material === wood || material === endgrain || material === leather) {
          const axis = grain === 'x' ? 0 : grain === 'z' ? 2 : 1;
          const u = p[face[0]][(axis + 1) % 3] !== p[face[1]][(axis + 1) % 3] ||
            p[face[0]][(axis + 1) % 3] !== p[face[2]][(axis + 1) % 3] ? (axis + 1) % 3 : (axis + 2) % 3;
          const v = face.every(i => p[i][axis] === p[face[0]][axis]) ? 3 - axis - u : axis;
          uv = face.map(i => [p[i][u] * 1.8 + center[0] * .21, p[i][v] * .82 + center[2] * .15]);
        }
        this.face(face.map(i => world[i]), color, material, uv, em);
      }
    }
    // Beveled rectangular extrusion with grain running from one end to the other.
    beam(a, b, w, depth, color, material = wood, bevel = .035, twist = 0) {
      const axis = unit(sub(b, a));
      const pivot = Math.abs(axis[1]) > .94 ? [0, 0, 1] : [0, 1, 0];
      let u = unit(cross(axis, pivot)), v = cross(axis, u);
      if (twist) {
        const newU = add(mul(u, Math.cos(twist)), mul(v, Math.sin(twist)));
        u = newU;
        v = cross(axis, u);
      }
      const [x, y] = [w / 2, depth / 2];
      const s = Math.min(bevel, w * .4, depth * .4);
      const profile = s > 0 ? [
        [x-s,y],[-x+s,y],[-x,y-s],[-x,-y+s],[-x+s,-y],[x-s,-y],[x,-y+s],[x,y-s]
      ] : [[x,y],[-x,y],[-x,-y],[x,-y]];
      const make = (p, [i, j]) => add(add(p, mul(u, i)), mul(v, j));
      const aa = profile.map(p => make(a, p)), bb = profile.map(p => make(b, p));
      let d = a[0] * .57 + a[2] * .39;
      const length = Math.hypot(...sub(b, a));
      for (let i = 0; i < profile.length; i++) {
        const j = (i + 1) % profile.length;
        const e = d + Math.hypot(profile[i][0] - profile[j][0], profile[i][1] - profile[j][1]) * 1.75;
        this.face([aa[i], aa[j], bb[j], bb[i]], i % 2 && s > 0 ? tint(color, 1.12) : color, material,
          [[d,.2],[e,.2],[e,.2+length*.82],[d,.2+length*.82]]);
        d = e;
      }
      const uv = profile.map(p => [p[0] * 1.4 + .5, p[1] * 1.4 + .5]);
      const capMat = material === wood ? endgrain : material;
      this.face(aa.slice().reverse(), tint(color,.81), capMat, uv.slice().reverse());
      this.face(bb, tint(color,.98), capMat, uv);
    }
    cyl(a, b, ra, rb, color, material = iron, sides = 12, em = 0, smooth = true) {
      const axis = unit(sub(b, a));
      const u = unit(cross(Math.abs(axis[1]) > .92 ? [0, 0, 1] : [0, 1, 0], axis));
      const v = cross(axis, u), h = Math.hypot(...sub(b, a));
      const normal = [], start = [], end = [], uv = [];
      for (let i = 0; i < sides; i++) {
        const t = i / sides * TAU, co = Math.cos(t), si = Math.sin(t);
        const radial = add(mul(u, co), mul(v, si));
        normal.push(unit(add(radial, mul(axis, (ra - rb) / (h || 1)))));
        start.push(add(a, mul(radial, ra)));
        end.push(add(b, mul(radial, rb)));
        uv.push([co * .48 + .5, si * .48 + .5]);
      }
      for (let i = 0; i < sides; i++) {
        const j = (i + 1) % sides, x = i / sides, z = (i + 1) / sides;
        this.face([start[i],start[j],end[j],end[i]],color,material,
          [[x,0],[z,0],[z,h],[x,h]],em,smooth ? [normal[i],normal[j],normal[j],normal[i]] : undefined);
      }
      if (ra > .0001) this.face(start.slice().reverse(),color,material,uv.slice().reverse(),em);
      if (rb > .0001) this.face(end,color,material,uv,em);
    }
    ring(center, axis, radius, thickness, color, material = iron, segments = 18, sides = 6) {
      axis = unit(axis);
      const u = unit(cross(Math.abs(axis[1]) > .92 ? [0,0,1] : [0,1,0], axis));
      const v = cross(axis,u), points = [], normals = [];
      for (let i = 0; i < segments; i++) {
        const theta = i * TAU / segments;
        const radial = add(mul(u, Math.cos(theta)), mul(v, Math.sin(theta)));
        const row = [], nr = [];
        for (let j = 0; j < sides; j++) {
          const t = j * TAU / sides;
          const n = add(mul(radial, Math.cos(t)), mul(axis, Math.sin(t)));
          row.push(add(center, add(mul(radial,radius),mul(n,thickness))));
          nr.push(n);
        }
        points.push(row);
        normals.push(nr);
      }
      for (let i = 0; i < segments; i++) {
        const ni = (i + 1) % segments;
        for (let j = 0; j < sides; j++) {
          const nj = (j + 1) % sides;
          this.face([points[i][j],points[ni][j],points[ni][nj],points[i][nj]],color,material,
            [[i/segments,j/sides],[(i+1)/segments,j/sides],[(i+1)/segments,(j+1)/sides],[i/segments,(j+1)/sides]],
            0,[normals[i][j],normals[ni][j],normals[ni][nj],normals[i][nj]]);
        }
      }
    }
    cord(path, radius, color, material = leather, sides = 5) {
      const rows = path.map((p, i) => {
        const axis = unit(sub(path[Math.min(i + 1,path.length - 1)],path[Math.max(0,i - 1)]));
        const u = unit(cross(Math.abs(axis[1]) > .92 ? [0,0,1] : [0,1,0],axis));
        const v = cross(axis,u);
        return Array.from({length:sides}, (_, j) => {
          const t = j * TAU / sides;
          return add(p,add(mul(u,radius*Math.cos(t)),mul(v,radius*Math.sin(t))));
        });
      });
      for (let i = 0; i < rows.length - 1; i++) {
        for (let j = 0; j < sides; j++) {
          const k = (j + 1) % sides;
          this.face([rows[i][j],rows[i][k],rows[i+1][k],rows[i+1][j]],color,material);
        }
      }
    }
    ellipse(center, radii, color, material = stone, sides = 12, rings = 7, exponent = 1, yaw = 0, em = 0) {
      const power = (n,p) => Math.sign(n) * Math.abs(n) ** p;
      const row = [];
      for (let j = 0; j <= rings; j++) {
        const a = -Math.PI/2 + Math.PI * j/rings;
        const r = power(Math.cos(a), exponent);
        row.push(Array.from({length:sides}, (_, i) => {
          const t = i * TAU / sides;
          const p = [r * radii[0] * power(Math.cos(t), exponent), radii[1] * power(Math.sin(a), exponent),
            -r * radii[2] * power(Math.sin(t), exponent)];
          return add(center, yaw ? rotate(p,yaw) : p);
        }));
      }
      for (let j = 0; j < rings; j++) {
        for (let i = 0; i < sides; i++) {
          const k = (i + 1) % sides;
          const p = [row[j][i],row[j][k],row[j+1][k],row[j+1][i]];
          const uv = p.map(q => [(q[0] - center[0]) * 1.65 + .5, (q[2] - center[2]) * 1.65 + q[1] * .18]);
          if (j === 0) this.face(p.slice(1),color,material,uv.slice(1),em);
          else if (j === rings - 1) this.face(p.slice(0,3),color,material,uv.slice(0,3),em);
          else this.face(p,color,material,uv,em);
        }
      }
    }
    decal(center, width, length, strength = .5, yaw = 0, color = '#16100d') {
      const p = [[-.5,0,.5],[.5,0,.5],[.5,0,-.5],[-.5,0,-.5]]
        .map(q => add(center,rotate([q[0]*width,0,q[2]*length],yaw)));
      this.face(p,color,shadow,[[0,0],[1,0],[1,1],[0,1]],strength);
    }
  }

  function layeredNoise(size, gx, gy, random) {
    const grid = Float32Array.from({length:gx*gy}, () => random());
    const field = new Float32Array(size*size);
    for (let y = 0; y < size; y++) {
      const cy = y / size * gy, y0 = Math.floor(cy), y1 = (y0 + 1) % gy;
      const t = cy - y0, fy = t*t*(3-2*t);
      for (let x = 0; x < size; x++) {
        const cx = x / size * gx, x0 = Math.floor(cx), x1 = (x0 + 1) % gx;
        const s = cx - x0, fx = s*s*(3-2*s);
        field[y*size+x] = mix(mix(grid[y0*gx+x0],grid[y0*gx+x1],fx),mix(grid[y1*gx+x0],grid[y1*gx+x1],fx),fy);
      }
    }
    return field;
  }
  function makeTextures(gl) {
    const size = 256, count = 20, noiseRandom = rng(5031);
    const fields = [[4,4],[12,12],[38,38],[80,80],[57,5],[101,13],[6,22]]
      .map(q => layeredNoise(size, ...q, noiseRandom));
    const bytes = new Uint8Array(size*size*4*count);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const k = y*size+x, xx = x / size, yy = y / size;
      const [a,b,c,d,e,f,g] = fields.map(field => field[k]);
      const n = noiseRandom(), cloud = a*.41+b*.32+c*.17+d*.1, pitting = Math.pow(d,7);
      const vein = Math.abs(b*.75+a*.25-.51);
      const knotX = xx - .59, knotY = (yy - .51) * .26;
      const knot = Math.exp(-(knotX*knotX+knotY*knotY)*45);
      const woodWave = Math.sin(TAU*(xx*14 + (a-.5)*1.4 + (g-.5)*.22 + knot*(knotX<0 ? -1 : 1)*knotX*3));
      const fibers = .62+a*.17+e*.17+f*.11-woodWave*.08-Math.pow(e,6)*.20;
      const radius = Math.hypot((xx-.51)*1.15,yy-.43);
      const growth = Math.sin(TAU*(radius*15+b*.48));
      const warp = ((x%4 === 0) ? .1 : 0) + ((y%5 === 0) ? .105 : 0);
      const dist = Math.hypot((xx-.5)*2,(yy-.5)*2);
      const values = [
        .37 + cloud*.49 + c*.11 + n*.10 - pitting*.16 + (vein < .012 ? -.055 : 0),
        .24 + cloud*.48 + n*.22 - pitting*.09,
        fibers,
        .61 + d*.13 + a*.15 + growth*.115,
        .40 + cloud*.47 + c*.11 + n*.085 - pitting*.18,
        .68 + a*.15 + b*.10 + n*.10 - warp,
        .52 + cloud*.32 + n*.1 - pitting*.12 - Math.abs(vein-.05)*.22,
        .28 + cloud*.26 + a*.10 + n*.15 + (Math.sin(TAU*(yy*25+xx*7+b*.22))>.68 ? .20 : 0),
        .66 + cloud*.33 + n*.08 - pitting*.075,
        .20 + Math.max(0,cloud-.26)*1.45 + (vein < .036 ? .30 : 0),
        .53 + a*.18 + b*.16 + Math.pow(Math.max(0,Math.cos(TAU*(yy*14+b*2+xx*3))),13)*.16,
        .88 + a*.025 + n*.025,
        1,
        .49 + b*.3 + d*.105 + Math.max(0,1-vein*16)*.10,
        .65 + d*.2 + n*.15
      ];
      for (let layer = 0; layer < values.length; layer++) {
        const p = (layer*size*size+k)*4;
        bytes[p] = bytes[p+1] = bytes[p+2] = Math.round(clamp(values[layer],0,1)*255);
        bytes[p+3] = layer === shadow ? Math.round(clamp(1-dist,0,1)**1.6*255) : 255;
      }
    }
    const plate = document.createElement('canvas');
    plate.width = plate.height = size;
    const g2 = plate.getContext('2d', {willReadFrequently:true});
    function path(points, color, width = 2, close = false) {
      g2.beginPath();
      g2.moveTo(...points[0]);
      for (const p of points.slice(1)) g2.lineTo(...p);
      if (close) g2.closePath();
      g2.strokeStyle = color;
      g2.lineWidth = width;
      g2.stroke();
    }
    function letter(message, x, y, font, ink) {
      g2.fillStyle = ink;
      g2.font = font;
      g2.fillText(message,x,y);
    }
    function plateBase(layer, base, edge, render) {
      const grad = g2.createRadialGradient(107,89,14,129,138,168);
      grad.addColorStop(0,base);
      grad.addColorStop(1,edge);
      g2.fillStyle = grad;
      g2.fillRect(0,0,size,size);
      g2.globalAlpha = .16;
      for (let i = 0; i < 4000; i++) {
        g2.fillStyle = i%2 ? '#f3dbac' : '#2d2318';
        g2.fillRect(noiseRandom()*size,noiseRandom()*size,noiseRandom()*3+.4,noiseRandom()*1.6+.3);
      }
      g2.globalAlpha = 1;
      render();
      const img = g2.getImageData(0,0,size,size).data;
      for (let y = 0; y < size; y++) {
        const row = (size-1-y)*size*4;
        bytes.set(img.subarray(row,row+size*4),(layer*size*size+y*size)*4);
      }
    }
    const brown = '#654329';
    plateBase(note,'#dcc18b','#9d794f',()=>{
      path([[16,20],[238,16],[241,238],[14,241]],'#9a7548',2,true);
      letter('For Ash',27,67,'italic 32px Georgia',brown);
      letter('Oil the left hinge.',26,103,'italic 17px Georgia',brown);
      letter('Brush after feeding.',24,128,'italic 17px Georgia',brown);
      letter('Warm the water first.',25,153,'italic 16px Georgia',brown);
      path([[34,174],[184,171]],'#96724f',1);
      letter('Back at dusk – E.',29,207,'italic 17px Georgia',brown);
      g2.beginPath();
      g2.arc(212,208,17,0,TAU);
      g2.fillStyle = '#8d3e2e';
      g2.fill();
      path([[207,215],[212,199],[220,214]],'#a7593d',2);
    });
    plateBase(chart,'#d5b882','#8d6941',()=>{
      path([[15,17],[241,17],[241,240],[15,240]],'#785335',2,true);
      letter('ASH  ·  TACK FIT',27,49,'bold 18px Georgia',brown);
      const line = [[36,152],[49,143],[66,141],[78,127],[88,110],[86,93],[97,105],[107,93],[108,106],
        [125,114],[141,122],[154,121],[166,103],[182,73],[189,90],[182,116],[198,112],[213,124],[218,139],
        [194,148],[182,159],[164,166],[160,182],[141,182],[138,170],[116,174],[105,190],[82,191],[86,174],
        [70,171],[56,177],[43,170],[36,152]];
      path(line,brown,2,true);
      path([[110,116],[106,148],[118,170]],'#913f32',3);
      path([[130,117],[125,144],[137,171]],'#913f32',3);
      path([[73,132],[42,97],[24,98]],'#7f5d3c',1);
      path([[137,130],[183,194],[223,194]],'#7f5d3c',1);
      letter('clear of the wing root',39,224,'italic 13px Georgia',brown);
      g2.fillStyle = '#4b3525';
      g2.fillRect(124,9,8,8);
    });
    plateBase(plaque,'#544435','#241f1b',()=>{
      path([[12,29],[243,29],[243,226],[12,226]],'#a77b4d',3,true);
      path([[20,37],[234,37],[234,218],[20,218]],'#775739',1,true);
      letter('THE  ROOST',34,113,'bold 28px Georgia','#e4c194');
      letter('ASH',98,164,'19px Georgia','#e4c194');
      path([[45,157],[84,157]],'#b68b61',1);
      path([[170,157],[209,157]],'#b68b61',1);
      path([[119,178],[127,195],[135,178],[127,168],[119,178]],'#b68b61',1);
    });
    plateBase(ledger,'#d7bd8a','#8f6e47',()=>{
      g2.fillStyle = '#776145';
      g2.fillRect(125,0,6,size);
      for (let y = 57; y < 233; y+=18) path([[11,y],[117,y],[139,y],[246,y]],'#a78e66',1);
      letter('Feeding',15,41,'italic 21px Georgia',brown);
      letter('Molt / repairs',143,41,'italic 16px Georgia',brown);
      ['Morrow   II','Midday   III','Evening   II','Water    full'].forEach((s,i)=>letter(s,18,80+i*35,'italic 12px Georgia',brown));
      ['left shoulder','fresh salve','two shed scales','check strap'].forEach((s,i)=>letter(s,142,80+i*35,'italic 12px Georgia',brown));
    });
    plateBase(mug,'#d4baa0','#a98462',()=>{
      g2.fillStyle='#846253';
      g2.fillRect(0,77,256,11);
      g2.fillRect(0,169,256,11);
      for (let x=0;x<256;x+=32) path([[x,126],[x+16,97],[x+32,126],[x+16,156]],'#91765e',2,true);
    });

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D_ARRAY,texture);
    gl.texImage3D(gl.TEXTURE_2D_ARRAY,0,gl.RGBA8,size,size,count,0,gl.RGBA,gl.UNSIGNED_BYTE,bytes);
    gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    const aniso = gl.getExtension('EXT_texture_filter_anisotropic');
    if (aniso) gl.texParameterf(gl.TEXTURE_2D_ARRAY,aniso.TEXTURE_MAX_ANISOTROPY_EXT,
      Math.min(4,gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
    return texture;
  }

  const vertexSource = '#version 300 es\n' + [
    'precision highp float;',
    'layout(location=0) in vec3 position;',
    'layout(location=1) in vec3 normal;',
    'layout(location=2) in vec2 uv;',
    'layout(location=3) in vec3 albedo;',
    'layout(location=4) in float material;',
    'layout(location=5) in float emission;',
    'uniform mat4 viewProj;',
    'out vec3 p; out vec3 n; out vec2 t; out vec3 c;',
    'flat out float m; flat out float e;',
    'void main(){ p=position; n=normal; t=uv; c=albedo; m=material; e=emission;',
    'gl_Position=viewProj*vec4(position,1.0); }'
  ].join('\n');
  const fragmentSource = '#version 300 es\n' + [
    'precision highp float; precision highp sampler2DArray;',
    'in vec3 p; in vec3 n; in vec2 t; in vec3 c; flat in float m; flat in float e;',
    'uniform sampler2DArray atlas;',
    'uniform vec3 eye; uniform vec3 ambient;',
    'uniform vec4 lights[5]; uniform vec4 tones[5];',
    'out vec4 frag;',
    'void main(){',
    '  vec4 tex=texture(atlas,vec3(t,m));',
    '  if(m==12.0){ frag=vec4(pow(c,vec3(.465)),tex.a*e); return; }',
    '  vec3 N=normalize(n);',
    '  vec3 base=c*(.36+.79*tex.r);',
    '  if(m>=15.0) base=c*pow(tex.rgb,vec3(2.08));',
    '  vec3 light=ambient*(.71+.19*max(N.y,0.0)+.1*max(-N.z,0.0));',
    '  vec3 glint=vec3(0.0);',
    '  bool gloss=(m==4.0 || m==10.0 || m==13.0 || m==19.0);',
    '  vec3 V=gloss?normalize(eye-p):vec3(0);',
    '  for(int i=0;i<5;i++){',
    '    if(tones[i].a==0.0) continue;',
    '    vec3 delta=lights[i].xyz-p;',
    '    float d2=dot(delta,delta);',
    '    float atten=max(0.0,1.0-d2*lights[i].w);',
    '    if(atten==0.0) continue;',
    '    vec3 rad=tones[i].rgb*(tones[i].a*atten*atten/(1.0+.15*d2));',
    '    vec3 L=delta*inversesqrt(max(.015,d2));',
    '    float ndl=max(dot(N,L),0.0);',
    '    light+=rad*(.105+.895*ndl);',
    '    if(gloss && ndl>.005){',
    '      vec3 H=normalize(L+V+vec3(.0001));',
    '      glint+=rad*pow(max(dot(H,N),0.0),m==10.0?77.0:31.0)*ndl*(m==10.0?.35:.12);',
    '    }',
    '  }',
    '  vec3 lit=base*light+glint+base*e;',
    '  float dist=distance(eye,p);',
    '  float haze=smoothstep(6.5,31.0,dist)*.20;',
    '  lit=mix(lit,vec3(.072,.037,.019),haze);',
    '  lit=1.0-exp(-lit*.98);',
    '  frag=vec4(pow(max(lit,vec3(0)),vec3(.465)),1.0);',
    '}'
  ].join('\n');

  function program(gl) {
    function compile(kind,source) {
      const shader = gl.createShader(kind);
      gl.shaderSource(shader,source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) throw Error(gl.getShaderInfoLog(shader));
      return shader;
    }
    const vs = compile(gl.VERTEX_SHADER,vertexSource), fs = compile(gl.FRAGMENT_SHADER,fragmentSource);
    const prog = gl.createProgram();
    gl.attachShader(prog,vs);
    gl.attachShader(prog,fs);
    gl.linkProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(prog,gl.LINK_STATUS)) throw Error(gl.getProgramInfoLog(prog));
    return prog;
  }
  function viewProjection(camera, aspect) {
    const cy=Math.cos(camera.yaw), sy=Math.sin(camera.yaw);
    const cp=Math.cos(camera.pitch), sp=Math.sin(camera.pitch);
    const right=[cy,0,sy], up=[-sy*sp,cp,cy*sp], back=[-sy*cp,-sp,cy*cp];
    const p = camera.position;
    const xr=-dot(right,p), yr=-dot(up,p), zr=-dot(back,p);
    const f=1/Math.tan(camera.fov*.5), a=f/aspect, near=.055, far=61;
    const h = (far+near)/(near-far), k = 2*far*near/(near-far);
    return new Float32Array([
      right[0]*a,up[0]*f,back[0]*h,-back[0],
      0,up[1]*f,back[1]*h,-back[1],
      right[2]*a,up[2]*f,back[2]*h,-back[2],
      xr*a,yr*f,zr*h+k,-zr
    ]);
  }
  function createRenderer(canvas, scene) {
    const gl = canvas.getContext('webgl2',{alpha:false,depth:true,antialias:true,stencil:false,powerPreference:'high-performance'});
    if (!gl) throw Error('WebGL 2 is unavailable in this browser.');
    const shader = program(gl);
    gl.useProgram(shader);
    const get = name => gl.getUniformLocation(shader,name);
    const locations = {view:get('viewProj'),eye:get('eye'),ambient:get('ambient'),lights:get('lights[0]'),tones:get('tones[0]')};
    const texture = makeTextures(gl);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D_ARRAY,texture);
    gl.uniform1i(get('atlas'),0);
    const targets = {};
    for (const [zone, setup] of Object.entries(scene.lighting)) {
      const points = new Float32Array(20), tones = new Float32Array(20);
      setup.lights.forEach((l,i) => {
        points.set([...l[0],1/(l[1]*l[1])],i*4);
        tones.set([...l[2],l[3]],i*4);
      });
      targets[zone] = {ambient:setup.ambient,points,tones};
    }
    const opaque = [], transparent = [];
    for (const mesh of scene.meshes) {
      if (!mesh.data.length) continue;
      const vao=gl.createVertexArray(), buffer=gl.createBuffer(), indexBuffer=gl.createBuffer();
      const wide=mesh.data.length/13>65535;
      const indices=wide?new Uint32Array(mesh.indices):new Uint16Array(mesh.indices);
      gl.bindVertexArray(vao);
      gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(mesh.data),gl.STATIC_DRAW);
      let offset = 0;
      [3,3,2,3,1,1].forEach((n,i)=>{
        gl.vertexAttribPointer(i,n,gl.FLOAT,false,52,offset*4);
        gl.enableVertexAttribArray(i);
        offset+=n;
      });
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
      const item={vao,buffer,indexBuffer,target:targets[mesh.zone],size:indices.length,
        type:wide?gl.UNSIGNED_INT:gl.UNSIGNED_SHORT,min:mesh.min,max:mesh.max};
      (mesh.transparent ? transparent : opaque).push(item);
      mesh.data=[];
      mesh.indices=[];
    }
    gl.bindVertexArray(null);
    gl.clearColor(.044,.034,.027,1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    function targetDistance(mesh,p) {
      let d = 0;
      for (let i = 0; i < 3; i++) {
        const v = p[i] - clamp(p[i],mesh.min[i],mesh.max[i]);
        d+=v*v;
      }
      return d;
    }
    const planes=Array.from({length:6},()=>new Float32Array(4));
    function updateFrustum(matrix) {
      for (let axis=0;axis<3;axis++) for (let side=0;side<2;side++) {
        const p=planes[2*axis+side], sign=side===0?1:-1;
        for (let j=0;j<4;j++) p[j]=matrix[4*j+3]+sign*matrix[4*j+axis];
      }
    }
    function visible(item) {
      const a=item.min,b=item.max;
      for (const p of planes) {
        const x=p[0]>=0?b[0]:a[0],y=p[1]>=0?b[1]:a[1],z=p[2]>=0?b[2]:a[2];
        if (p[0]*x+p[1]*y+p[2]*z+p[3]<0) return false;
      }
      return true;
    }
    let width=0,height=0,lastTarget;
    function draw(list) {
      for (const item of list) {
        if (!visible(item)) continue;
        const target = item.target;
        if (target !== lastTarget) {
          gl.uniform3fv(locations.ambient,target.ambient);
          gl.uniform4fv(locations.lights,target.points);
          gl.uniform4fv(locations.tones,target.tones);
          lastTarget = target;
        }
        gl.bindVertexArray(item.vao);
        gl.drawElements(gl.TRIANGLES,item.size,item.type,0);
      }
    }
    return {
      render(camera) {
        const dpi = Math.min(window.devicePixelRatio || 1,1.35);
        const scale = Math.min(dpi,Math.sqrt(2100000/Math.max(1,canvas.clientWidth*canvas.clientHeight)));
        const w = Math.max(1,Math.round(canvas.clientWidth*scale));
        const h = Math.max(1,Math.round(canvas.clientHeight*scale));
        if (width!==w || height!==h) {
          canvas.width=width=w;
          canvas.height=height=h;
          gl.viewport(0,0,w,h);
        }
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        const matrix=viewProjection(camera,w/h);
        updateFrustum(matrix);
        gl.uniformMatrix4fv(locations.view,false,matrix);
        gl.uniform3fv(locations.eye,camera.position);
        const pos=camera.position;
        opaque.forEach(item=>{item.d=targetDistance(item,pos);});
        opaque.sort((a,b)=>a.d-b.d);
        draw(opaque);
        if (transparent.length) {
          gl.depthMask(false);
          gl.enable(gl.BLEND);
          draw(transparent);
          gl.disable(gl.BLEND);
          gl.depthMask(true);
        }
      }
    };
  }

  return { Mesh, createRenderer, viewProjection, clamp, mix, add, sub, mul, dot, cross, unit, rotate, rng, rgb, tint, blend,
    stone, mortar, wood, endgrain, iron, cloth, leather, straw, paper, embers, water, plain,
    shadow, glass, chalk, note, chart, plaque, ledger, mug, TAU };
})();

