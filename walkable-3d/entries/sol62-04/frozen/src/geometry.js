import * as T from 'three';

export const TAU = 2 * Math.PI;
export const v = (x=0, y=0, z=0) => new T.Vector3(x, y, z);
export const mix = T.MathUtils.lerp;
export const clamp = T.MathUtils.clamp;
export const color = value => new T.Color(value);
const UP = v(0,1,0);

export function seeded(seed) {
  return () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let n = Math.imul(seed ^ seed >>> 15, 1 | seed);
    n = n + Math.imul(n ^ n >>> 7, 61 | n) ^ n;
    return ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
}
export const rand = (rng, a, b) => a + (b - a) * rng();
export const pick = (rng, array) => array[Math.floor(rng() * array.length)];

const box = new T.BoxGeometry();
const rods = new Map();
const quaternion = new T.Quaternion();
const matrix = new T.Matrix4();
const normalMatrix = new T.Matrix3();
const position = v();
const normal = v();
const scale = v();
const turn = new T.Euler();
const midpoint = v();
const axis = v();

function rod(sides) {
  if (!rods.has(sides)) rods.set(sides, new T.CylinderGeometry(1, 1, 1, sides, 1));
  return rods.get(sides);
}

export class Batch {
  constructor(material, name, { cast = true, receive = true } = {}) {
    this.material = material;
    this.name = name;
    this.cast = cast;
    this.receive = receive;
    this.p = [];
    this.n = [];
    this.c = [];
    this.uv = [];
    this.i = [];
  }
  vertex(point, perpendicular, tint, u = 0, w = 0) {
    const index = this.p.length / 3;
    this.p.push(point.x, point.y, point.z);
    this.n.push(perpendicular.x, perpendicular.y, perpendicular.z);
    this.c.push(tint.r, tint.g, tint.b);
    this.uv.push(u, w);
    return index;
  }
  triangle(a,b,c) { this.i.push(a,b,c); }
  quad(a,b,c,d) { this.i.push(a,b,c,a,c,d); }

  primitive(geometry, transform, tint, uvX=1, uvY=1) {
    const base = this.p.length / 3;
    const p = geometry.attributes.position;
    const n = geometry.attributes.normal;
    const uv = geometry.attributes.uv;
    normalMatrix.getNormalMatrix(transform);
    for (let i = 0; i < p.count; i++) {
      position.fromBufferAttribute(p, i).applyMatrix4(transform);
      normal.fromBufferAttribute(n, i).applyNormalMatrix(normalMatrix);
      this.vertex(position, normal, tint, uv.getX(i) * uvX, uv.getY(i) * uvY);
    }
    if (geometry.index) {
      for (const i of geometry.index.array) this.i.push(base + i);
    } else {
      for (let i=0; i < p.count; i++) this.i.push(base + i);
    }
  }

  box(x,y,z, width,height,depth, tint, yaw=0, pitch=0, roll=0, uvX=1, uvY=1) {
    quaternion.setFromEuler(turn.set(pitch,yaw,roll,'YXZ'));
    matrix.compose(midpoint.set(x,y,z), quaternion, scale.set(width,height,depth));
    this.primitive(box,matrix,tint,uvX,uvY);
  }

  beam(a,b, width, depth, tint) {
    axis.subVectors(b,a);
    const length = axis.length();
    if (length < 1e-6) return;
    quaternion.setFromUnitVectors(UP, axis.multiplyScalar(1/length));
    matrix.compose(midpoint.copy(a).lerp(b,.5), quaternion, scale.set(width,length,depth));
    this.primitive(box,matrix,tint);
  }

  rod(a,b, radius, tint, sides=6) {
    axis.subVectors(b,a);
    const length = axis.length();
    if (length < 1e-6) return;
    quaternion.setFromUnitVectors(UP, axis.multiplyScalar(1/length));
    matrix.compose(midpoint.copy(a).lerp(b,.5), quaternion, scale.set(radius,length,radius));
    this.primitive(rod(sides),matrix,tint);
  }

  cord(points, radius, tint, segments=20, sides=6, closed=false) {
    const geometry = new T.TubeGeometry(new T.CatmullRomCurve3(points, closed), segments, radius, sides, closed);
    this.primitive(geometry, matrix.identity(), tint);
    geometry.dispose();
  }

  surface(a,b,c,d,tint) {
    const perpendicular = v().subVectors(b,a).cross(v().subVectors(c,a)).normalize();
    const start = this.vertex(a,perpendicular,tint,0,0);
    this.vertex(b,perpendicular,tint,1,0);
    this.vertex(c,perpendicular,tint,1,1);
    this.vertex(d,perpendicular,tint,0,1);
    this.quad(start,start+1,start+2,start+3);
  }

  assemble(parent) {
    if (!this.i.length) return null;
    const geometry = new T.BufferGeometry();
    geometry.setAttribute('position',new T.Float32BufferAttribute(this.p,3));
    const normalData=new Int16Array(this.n.length);
    const colorData=new Uint16Array(this.c.length);
    for(let i=0;i<this.n.length;i++){
      normalData[i]=Math.round(clamp(this.n[i],-1,1)*32767);
      colorData[i]=Math.round(clamp(this.c[i],0,1)*65535);
    }
    geometry.setAttribute('normal',new T.BufferAttribute(normalData,3,true));
    geometry.setAttribute('color',new T.BufferAttribute(colorData,3,true));
    geometry.setAttribute('uv',new T.Float32BufferAttribute(this.uv,2));
    geometry.setIndex(this.i);
    geometry.computeBoundingSphere();
    const mesh = new T.Mesh(geometry,this.material);
    mesh.name = this.name;
    mesh.castShadow = this.cast;
    mesh.receiveShadow = this.receive;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    parent.add(mesh);
    return mesh;
  }
}

export function profile(batch, x, y, z, rings, tint, n=18, phase=0) {
  const geometry = new T.LatheGeometry(rings.map(([r,h]) => new T.Vector2(r,h)), n, phase);
  batch.primitive(geometry, matrix.makeTranslation(x,y,z), tint);
  geometry.dispose();
}

export function irregularStem(batch, points, radii, tint, rng, sides=9) {
  const base = batch.p.length/3;
  const ridge = Array.from({length:sides},()=>rand(rng,.87,1.14));
  for (let j=0; j<points.length; j++) {
    const p = points[j];
    const tangent = v().subVectors(points[Math.min(j+1,points.length-1)],points[Math.max(j-1,0)]).normalize();
    const side = v(0,0,1).cross(tangent).normalize();
    if (side.lengthSq() < .05) side.set(1,0,0);
    const cross = v().crossVectors(tangent,side);
    for (let k=0; k<=sides; k++) {
      const theta = (k/sides) * TAU + j*.12;
      const normal = side.clone().multiplyScalar(Math.cos(theta)).addScaledVector(cross,Math.sin(theta));
      const rr = radii[j] * ridge[k % sides] * rand(rng,.95,1.05);
      const q = p.clone().addScaledVector(normal,rr);
      const shade = tint.clone().multiplyScalar(rand(rng,.71,1.16)*(.81+.20*ridge[k % sides]));
      batch.vertex(q,normal,shade,k/sides,j/(points.length-1)*2);
    }
    if (j>0) for (let k=0; k<sides; k++) {
      const low = base+(j-1)*(sides+1)+k, high = low+sides+1;
      batch.quad(low,low+1,high+1,high);
    }
  }
}

export function curvePoints(f, segments) {
  return Array.from({length:segments+1}, (_,i)=>f(i/segments));
}
