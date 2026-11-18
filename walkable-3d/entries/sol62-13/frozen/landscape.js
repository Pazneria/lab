import { Mesh, MAT, add, mul, sub, cross, norm, color, mix, clamp, randomSource } from './geometry.js'

function hash(x, z) {
  let n = Math.imul(x, 1597334677) ^ Math.imul(z, 3812015801)
  n = Math.imul(n ^ n >>> 16, 0x45d9f3b)
  return ((n ^ n >>> 16) >>> 0) / 4294967295
}

function noise(x, z) {
  const a = Math.floor(x), b = Math.floor(z)
  let u = x-a, v = z-b
  u *= u * (3 - 2*u)
  v *= v * (3 - 2*v)
  return (hash(a,b) * (1-u) + hash(a+1,b) * u) * (1-v)
    + (hash(a,b+1) * (1-u) + hash(a+1,b+1) * u) * v
}

function crest(keys, x) {
  let i = 1
  while (i < keys.length - 1 && keys[i][0] < x) i++
  const [left, low] = keys[i-1], [right, high] = keys[i]
  const t = clamp((x-left)/(right-left), 0, 1)
  return low + (high-low) * (t*.64 + t*t*(3-2*t)*.36)
}

function ranges(mesh) {
  const ranges = [
    { left: -387, right: 375, z: -385, front: 82, back: 94, skew: .04, snow: 55, tint: '#728998', trees: 0, keys: [[-387,51],[-230,81],[-160,104],[-116,83],[-66,122],[-32,83],[18,115],[58,130],[76,108],[129,76],[173,119],[230,150],[287,75],[375,67]] },
    { left: -295, right: 310, z: -238, front: 69, back: 67, skew: -.065, snow: 45, tint: '#5e7885', trees: 0, keys: [[-295,34],[-208,58],[-161,78],[-125,66],[-92,43],[-57,73],[-28,105],[-11,83],[8,92],[33,63],[55,73],[79,64],[128,82],[160,56],[214,102],[242,68],[310,42]] },
    { left: -202, right: 214, z: -131, front: 43, back: 63, skew: .11, snow: 41, tint: '#4c6875', trees: 170, keys: [[-202,41],[-161,59],[-111,77],[-86,36],[-57,41],[-38,24],[-20,15],[-8,21],[10,9],[35,4],[59,19],[81,16],[101,38],[125,48],[141,43],[175,63],[214,32]] },
    { left: -131, right: -14, z: -77, front: 34, back: 34, skew: -.34, snow: 50, tint: '#3c5860', trees: 340, keys: [[-131,29],[-105,40],[-83,23],[-68,14],[-54,-5],[-36,-7],[-20,-24],[-14,-31]] },
    { left: 24, right: 181, z: -77, front: 29, back: 39, skew: .26, snow: 45, tint: '#3f595f', trees: 390, keys: [[24,-29],[43,-19],[59,-7],[75,10],[92,7],[111,29],[126,23],[153,48],[181,35]] },
  ]
  const snow = color('#bbcbd0')
  const moss = color('#344f4c')
  const trees = []
  for (const [index, range] of ranges.entries()) {
    const point = (x, v) => {
      const n = noise(x*.077, v*4.1 + index*9)
      const slope = (1-Math.abs(v)) ** .88
      const jagged = (noise(x*.15, 19+index) - .5) * 12 + (n - .5) * 8
      const peak = crest(range.keys, x) + jagged
      const y = -37 + (peak+37) * slope + Math.sin(v*49 + x*.061) * slope * 1.6
      const z = range.z + x*range.skew + (noise(x*.035, 100+index)-.5)*17 + v*(v > 0 ? range.front : range.back)
      return [x,y,z]
    }
    const tint = color(range.tint)
    const at = (p) => {
      const r = noise(p[0]*.084, p[2]*.094)
      const exposed = mix(moss,tint,clamp((p[1]+16)/64+r*.26,.17,1))
      const buildup = clamp((p[1]-range.snow)/30 + (r-.42)*.53, 0, .96)
      return mul(mix(exposed,snow,buildup), .79+r*.37)
    }
    const width = Math.ceil((range.right-range.left)/4.5)
    const rows = 20
    const grid = []
    for (let k=0; k<=rows; k++) {
      const line = []
      for (let i=0; i<=width; i++) {
        const x = range.left + (range.right-range.left)*(i/width)
        const wiggle = i === 0 || i === width ? 0 : (hash(i,k+index*32)-.5)*2.2
        const p = point(x+wiggle, 1-2*k/rows)
        line.push([p,at(p)])
      }
      grid.push(line)
    }
    for (let k=0; k<rows; k++) {
      for (let i=0; i<width; i++) {
        const [a, ca] = grid[k][i], [b, cb] = grid[k][i+1]
        const [c, cc] = grid[k+1][i+1], [d, cd] = grid[k+1][i]
        mesh.tri(a,b,c,tint,MAT.terrain,0,norm(cross(sub(b,a),sub(c,a))),undefined,[ca,cb,cc])
        mesh.tri(a,c,d,tint,MAT.terrain,0,norm(cross(sub(c,a),sub(d,a))),undefined,[ca,cc,cd])
      }
    }
    const random = randomSource(9823+index*1967)
    for (let i=0; i<range.trees; i++) {
      const x = range.left+(range.right-range.left)*random()
      const v = .07+random()*.88
      const p = point(x,v)
      if (p[1] < -34 || p[1] > 43 || noise(x*.175,p[2]*.098)<.31) continue
      trees.push([p, 1.2+random()**1.3*5.4, random(), random()])
    }
  }

  const pine = [color('#263f3e'), color('#38504c'), color('#304946'), color('#425a55')]
  for (const [p,h,jitter,shade] of trees) {
    const n = 4
    for (let layer=0; layer<3; layer++) {
      const a = h*(.12+layer*.222)
      const b = h*(.55+layer*.219)
      const w = h*(.23-layer*.039)
      const top = add(p, [jitter*.18, b, 0])
      for (let k=0; k<n; k++) {
        const alpha = (k + jitter)*Math.PI*2/n
        const beta = (k + jitter + 1)*Math.PI*2/n
        const p0 = add(p, [Math.cos(alpha)*w,a,Math.sin(alpha)*w])
        const p1 = add(p, [Math.cos(beta)*w,a,Math.sin(beta)*w])
        mesh.tri(p0,top,p1,pine[(Math.floor(shade*4)+k)%4],MAT.terrain,.45)
      }
    }
  }
}

export function makeLandscape() {
  const mesh = new Mesh()
  mesh.panel([0,-36,-168],[1,0,0],[0,0,-1],960,690,'#667f83',MAT.terrain,.7)
  ranges(mesh)

  const close = randomSource(8871)
  for (let row=0; row<9; row++) {
    for (let col=0; col<32; col++) {
      const point = (i,j) => {
        const x = -68 + i*4.2
        const z = 31 - j*5.3
        const shoulder = Math.max(0, 1-Math.abs(x+20)/51)
        const ridge = Math.max(0,1-(31-z)/44)
        return [x,-36+shoulder*ridge*36+Math.sin(x*.16+z*.35)*ridge*2,z]
      }
      const a=point(col,row), b=point(col+1,row), c=point(col+1,row+1), d=point(col,row+1)
      const tint=close()<.42?'#48554e':'#4b5851'
      mesh.tri(a,b,c,tint,MAT.terrain)
      mesh.tri(a,c,d,tint,MAT.terrain)
    }
  }
  return mesh
}
