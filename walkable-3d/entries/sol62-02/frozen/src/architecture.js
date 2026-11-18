import { Batch, paperLantern, sign, crate, bowl } from "./geometry.js";
import { enamelSign, random } from "./materials.js";

function sash(b, m, x, y, w, h, warm, style) {
  b.box(m.rubber, x, y, .021, w + .15, h + .14, .065, 0x514d52);
  b.box(m.woodDark, x, y, .06, w + .067, h + .07, .07, style);
  b.box(warm ? m.warmWindow : m.glass, x, y, .105, w - .077, h - .08, .022, warm ? 0xf2c497 : 0x8ca5b6);
  for (const edge of [-1, 1]) {
    b.box(m.woodDark, x + edge * w / 2, y, .137, .055, h + .08, .054, style);
    b.box(m.woodDark, x, y + edge * h / 2, .14, w, .052, .058, style);
    b.box(m.mortar, x + edge * (w / 2 + .073), y, .067, .080, h + .15, .14, 0xb9a995);
  }
  b.box(m.woodDark, x, y, .136, .039, h, .037, style);
  b.box(m.woodDark, x, y - h * .1, .138, w, .043, .041, style);
  b.box(m.mortar, x, y - h / 2 - .07, .137, w + .24, .105, .24, 0xd2bea4);
  b.box(m.mortar, x, y + h / 2 + .07, .112, w + .23, .098, .21, 0xb8a58f);
  if (warm) {
    b.box(m.woodDark, x - w * .27, y + h * .07, .12, w * .32, h * .83, .009, 0xd9a67d);
    for (let i = 0; i < 4; i++) {
      b.box(m.woodDark, x + .095, y + h * (.31 - i * .054), .123, w * .40, .018, .016, 0xe5be8e);
    }
  }
}

function rainpipe(b, m, x, height, offset = .16) {
  b.tube(m.black, [[x,.12,offset],[x,.29,offset],[x,height - .31,offset],[x + .06,height,offset + .08]], .044, 0xc1c6bc);
  for (let y = .55; y < height; y += 1.34) {
    b.torus(m.steel, x, y, offset, .048, .009, "flat", 0x7f8a82);
    b.box(m.black, x, y, .056, .18, .033, .075, 0xa8b0a6);
  }
}

function serviceDoor(b, m, x, y, w, h, color, vents = true) {
  b.box(m.rubber, x, y, .043, w + .24, h + .18, .08, 0x352f38);
  b.box(m.wood, x, y, .094, w, h, .095, color);
  for (const edge of [-1,1]) {
    b.box(m.woodDark, x + edge * (w / 2 + .06), y, .132, .10, h + .15, .14, 0x887566);
    b.box(m.woodDark, x, y + edge * (h / 2 + .029), .132, w + .12, .09, .14, 0x887566);
  }
  for (let i = 1; i < 6; i++) {
    b.box(m.woodDark, x + (i / 6 - .5) * w, y, .143, .011, h - .04, .01, 0x796456);
  }
  b.box(m.steel, x + w * .32, y - .1, .152, .05, .18, .025, 0x786954);
  b.rod(m.black, [x + w * .32, y - .10, .166], [x + w * .23, y - .10, .17], .016, 0xb8a27d);
  if (vents) {
    b.box(m.rubber, x - .16, y + h * .25, .15, .39, .25, .02);
    for (let i = 0; i < 6; i++) {
      b.box(m.black, x - .16, y + h * .25 + (i - 2.5) * .031, .166, .36, .018, .029, 0xa88e77);
    }
  }
}

function awningWindow(b, m, x, z, type) {
  const w = type === "shutter" ? 2.55 : 1.55;
  const h = type === "shutter" ? 1.71 : 1.17;
  b.box(m.rubber, x, z, .051, w + .25, h + .20, .09, 0x2b3034);
  b.box(m.mortar, x, z + h / 2 + .09, .12, w + .31, .16, .24, 0xb8a68d);
  b.box(m.mortar, x, z - h / 2 - .05, .14, w + .29, .12, .30, 0xb8a68d);
  if (type === "shutter") {
    b.box(m.black, x, z, .11, w, h, .045, 0x86938c);
    for (let row = 0; row < 22; row++) {
      const y = z - h / 2 + (row + .5) * h / 22;
      b.box(m.steel, x, y, .144, w - .04, .032, .032, row % 4 === 0 ? 0x646f6d : 0x81978d);
    }
    for (const edge of [-1,1]) b.box(m.black, x + edge * (w / 2 + .035), z, .148, .059, h + .08, .074, 0x9da39b);
  } else {
    b.box(m.glass, x, z, .11, w, h, .033, 0x6f8594);
    for (let i = -2; i <= 2; i++) b.box(m.black, x + i * w / 5, z, .168, .035, h, .036, 0x8f9187);
    b.box(m.black, x, z + .1, .167, w, .032, .045, 0xaaa38c);
  }
}

function balcony(b, m, x, y, width) {
  b.box(m.mortar, x, y, .45, width + .12, .16, .91, 0xa79a91);
  for (const side of [-1, 1]) {
    b.box(m.black, x + side * width / 2, y + .43, .51, .035, .035, .82, 0xa4a19a);
    b.rod(m.black, [x + side * (width / 2 - .14),y - .09,.80],[x + side * (width / 2 - .14), y - .48,.10],.041,0x8e8582);
  }
  for (let i = 0; i <= 14; i++) {
    const xx = x + (i / 14 - .5) * width;
    b.box(m.black, xx, y + .25, .896, .021, .50, .024, 0x9f9286);
  }
  for (const yy of [.10,.53]) b.box(m.black, x, y + yy, .899, width + .05, .035, .047, 0xa9a194);
  b.box(m.wood, x - width * .25, y + .16, .64, .62, .22, .23, 0x876048);
  for (let i = 0; i < 11; i++) {
    b.orb(m.foliage, x - width * .25 + (i - 5) * .051, y + .32 + Math.sin(i) * .082, .65 + Math.cos(i) * .083,
      .084, .091, .059, i % 2 ? 0x5b7252 : 0x3d6251, Math.sin(i));
  }
}

function facade(parent, colliders, m, a) {
  const b = new Batch(parent, colliders, a.name, a.x, a.z, a.yaw);
  const {length, height, brick, cream, windows, seed} = a;
  const rand = random(seed);
  b.box(m.wash, 0, height / 2, -.295, length + .02, height, .57, cream);
  b.block(0, -.24, length + .02, .55);
  b.panel(brick, 0, height * .5, .003, length, height, 0, 0, 0xffffff, [length / 1.82, height / 1.64, rand(), rand()]);
  if (a.plaster) {
    b.panel(m.wash, 0, (height + 3.28) * .5, .013, length - .018, height - 3.28, 0, 0, cream);
  }
  for (const yy of [.20, 3.15, 5.38, height - .33, height - .12]) {
    b.box(m.mortar, 0, yy, .026, length + .035, yy === .20 ? .38 : .11, yy === .20 ? .138 : .24, cream);
  }
  b.box(m.black, 0, height, -.16, length + .09, .12, .77, 0xb1b0ad);
  for (const x of [-length / 2 + .19, length / 2 - .19]) {
    b.box(m.mortar, x, height * .5, .054, .35, height - .19, .14, cream);
    for (let y = .45; y < height - .4; y += .43) {
      b.box(m.mortar, x, y, .139, .365, .025, .03, 0xa2968b);
    }
  }
  const useWindows = windows || Math.max(2, Math.floor(length / 2.65));
  for (let i = 0; i < useWindows; i++) {
    const x = (i + .5 - useWindows / 2) * (length - .44) / useWindows;
    if (a.plaster) {
      b.box(m.wash, x - .23, 5.15, .018, .08, 3.8, .008, 0x97958c);
      b.box(m.wash, x + .22, 5.80, .018, .12, 4.2, .008, 0xa49d90);
    }
    const rows = height > 8.75 ? [4.22, 6.43, 8.28] : [4.15, 6.29];
    for (let j = 0; j < rows.length; j++) {
      const wide = Math.min(1.19, (length - .4) / useWindows * .53);
      sash(b, m, x, rows[j], wide, j === 2 ? 1.04 : 1.36, rand() < .25, a.plaster ? 0xa5a89a : 0xb09e90);
    }
    if (i === a.balcony) balcony(b, m, x, 3.43, Math.min(2.31, length / useWindows - .14));
  }
  for (const x of a.pipes || []) rainpipe(b, m, x, height - .22);
  for (const [x, type] of a.shop || []) {
    if (type === "door") serviceDoor(b, m, x, 1.18, 1.18, 2.15, 0x727e72, true);
    else awningWindow(b, m, x, type === "shutter" ? 1.57 : 1.86, type);
  }
  for (const [x, y, color] of a.lamps || []) {
    b.rod(m.black, [x,y + .32,.02], [x,y + .32,.34], .021, 0xb5b2a3);
    paperLantern(b, m, x, y, .36, .65);
    b.light(x, y - .1, .57, color, 9.2, 4.2);
  }
  b.finish();
}

export function buildCourtyard(parent, colliders, m) {
  const b = new Batch(parent, colliders, "Basalt courtyard and drains");
  b.panel(m.stone,0,0,1.792,21.92,17.816,-Math.PI/2,0,0xffffff,[21.92/4.25,17.816/4.15,.07,.38]);
  const rand = random(367);
  for (const side of [-1, 1]) {
    b.box(m.rubber, 9.88 * side, .002, 1.40, .19, .014, 16.75, 0x82919a);
    for (let i = 0; i < 46; i++) {
      const z = -6.87 + i * .370;
      b.box(m.mortar, side * 9.72, .028, z, .14, .052, .359, i % 4 ? 0x7b858d : 0xada49b);
      b.box(m.mortar, side * 10.05, .031, z, .13, .061, .356, i % 3 ? 0x87868b : 0xa29890);
    }
    for (const z of [-5.2, -.75, 4.8, 8.7]) {
      b.box(m.black, side * 9.88, .015, z, .223, .020, .49, 0xadadac);
      for (let i = -5; i <= 5; i++) b.box(m.steel, side * 9.88,.028,z + i * .037,.149,.012,.014,0x648089);
    }
  }
  for (let i = 0; i < 17; i++) {
    const x = -5.8 + rand() * 11.7, z = -5.5 + rand() * 13;
    if (Math.abs(x) > 1.0 || i % 4 === 0) {
      b.decal("shadow", x, z, .38 + rand() * .83, .44 + rand() * 1.12, 0x17202b, .22, rand() * Math.PI);
    }
  }
  b.box(m.black, -.92, .010, 5.69, .52, .025, .42, 0x9ca09c, .08);
  for (let i = -5; i < 6; i++) b.box(m.steel,-.92 + i * .038,.024,5.69,.017,.014,.32,0x737a7e,.08);
  for (let i = 0; i < 52; i++) {
    const x = (rand() - .5) * 20, z = rand() * 16 - 6.6;
    if (Math.abs(x) < 6 && rand() > .17) continue;
    b.orb(m.foliage, x, .015, z, .018 + rand() * .046, .006, .022 + rand() * .048,
      [0x6b5b37,0x5f4a32,0x8b6738][i % 3], 0, rand() * Math.PI);
  }
  b.finish();

  facade(parent, colliders, m, {
    name: "West warehouse facade", x:-10.52, z:1.5, yaw:Math.PI/2, length:17.88, height:9.61,
    brick:m.brickOld, cream:0xc9b8a7, windows:7, seed:74, balcony:4,
    pipes:[-6.8,1.39,7.82], shop:[[-6.24,"door"],[-2.82,"shutter"],[1.83,"bars"],[5.90,"door"]]
  });
  facade(parent, colliders, m, {
    name:"East painted terrace", x:10.52,z:1.50,yaw:-Math.PI/2,length:17.88,height:9.05,
    brick:m.brickCoal,cream:0xaaa9a1,plaster:true,windows:7,seed:288,balcony:3,
    pipes:[-8.2,-3.9,5.45],shop:[[-6.5,"bars"],[-2.1,"door"],[3.87,"shutter"],[7.2,"door"]]
  });
  facade(parent, colliders, m, {
    name:"North oxide-brick facade", x:-4.76,z:-7.12,yaw:0,length:11.57,height:9.97,
    brick:m.brickWarm,cream:0xcbb3a0,windows:4,seed:661,balcony:1,
    pipes:[-4.4,3.88],shop:[[-3.8,"shutter"],[.64,"door"]],lamps:[[-.38,2.63,0xffba7a]]
  });
  facade(parent, colliders, m, {
    name:"North-east blue-brick facade", x:7.28,z:-7.12,yaw:0,length:6.62,height:8.85,
    brick:m.brickCoal,cream:0xa6a8a7,windows:3,seed:528,pipes:[2.10],shop:[[.51,"bars"]]
  });
  for (const side of [-1,1]) {
    facade(parent, colliders, m, {
      name:"South entry facade", x:side * 6.12,z:10.23,yaw:Math.PI,length:8.8,height:8.55,
      brick:side < 0 ? m.brickWarm : m.brickOld,cream:0xc4b2a2,windows:4,seed:651 + side,
      pipes:[-3.32],shop:[[side * 1.92,"door"]]
    });
  }
  const entry = new Batch(parent, colliders, "South gate", 0, 10.23, Math.PI);
  entry.box(m.black, 0, 1.56, -.03, 3.5, 3.12, .095, 0x87918d);
  entry.box(m.wash, 0, 5.55, -.16, 3.52, 5.7, .38, 0xa19d94);
  entry.panel(m.brickWarm, 0, 5.75, .039, 3.51, 5.2, 0, 0, 0xffffff, [2.0,3.1]);
  for (let i = 0; i <= 20; i++) {
    entry.box(m.steel, (i / 20 - .5) * 3.38, 1.52, .052, .031, 3.02, .045, 0x9b9c8e);
  }
  for (const y of [.13,1.38,2.38,3.08]) entry.box(m.mortar,0,y,.115,3.49,.092,.115,0xaba397);
  const address = enamelSign({name:"18",sub:"LANTERN COURT",background:"#44534f",ink:"#e7d5b0",line:"#a49c7d",glow:.12});
  sign(entry,m,address,-1.06,3.40,.052,.94,.32,0xa5967c);
  entry.block(0,-.01,3.52,.35);
  entry.finish();

  const court = new Batch(parent, colliders, "Service alleys and courtyard wiring");
  const lining = [[-9.25,-5.3],[-9.51,-5.82],[9.28,-5.88],[9.35,6.19],[-8.72,7.28]];
  for (const [x,z] of lining) {
    crate(court,m,x,0,z,.61,.33,.52,0xbea685,.13);
    court.block(x,z,.61,.52,.13);
  }
  for (const [x,z] of [[-9.73,-.35],[9.69,1.30]]) {
    court.box(m.black,x,.38,z,.40,.76,.58,0x829186);
    court.box(m.black,x,.79,z,.47,.09,.65,0xa8b09b);
    court.box(m.steel,x,.85,z,.16,.036,.07,0xac9d7d);
    court.block(x,z,.47,.65);
  }
  court.tube(m.black,[[-10.34,5.73,5.28],[-6.10,4.75,4.00],[-1.65,4.40,2.49],[4.08,4.60,1.20],[10.4,5.53,-.37]],.010,0xa5988f,32);
  for (const [x,y,z] of [[-7.9,5.11,4.55],[-4.45,4.60,3.45],[.55,4.44,1.94],[5.85,4.77,.78],[8.25,5.11,.20]]) {
    court.rod(m.black,[x,y + .022,z],[x,y - .19,z],.007,0xcabea6);
    court.cyl(m.black,x,y - .20,z,.027,.029,.045,0xba9a79,9);
    court.orb(m.amberCore,x,y - .246,z,.041,.061,.041,0xf0bc6f);
    court.halo(x,y - .246,z,.24,0xffa05a,.19);
  }
  court.tube(m.black,[[-10.42,6.48,-2.2],[-5.0,5.61,-3.48],[.0,5.28,-4.86],[5.27,5.61,-6.01],[10.38,6.16,-6.41]],.012,0x96938f,26);
  court.finish();
}

function arch(face, m) {
  const radius = 1.36, outer = 1.615, base = 1.91;
  face.sheet(m.mortar,(u,v)=>{
    const angle=u*Math.PI,r=radius+v*(outer-radius);
    return [Math.cos(angle)*r,base+Math.sin(angle)*r,.184];
  },45,2,0x716968);
  for (let i = 0; i < 15; i++) {
    const a = i / 15 * Math.PI + .008;
    const d = (i + 1) / 15 * Math.PI - .008;
    const stone = i === 7 ? 0xd2b69b : i % 3 === 0 ? 0xa89c90 : 0xbeb1a1;
    face.sheet(m.mortar, (u,v) => {
      const angle = a + (d - a) * u, r = radius + (outer - radius) * v;
      return [Math.cos(angle) * r, base + Math.sin(angle) * r, .22];
    }, 3, 2, stone);
    face.sheet(m.mortar, (u,v) => {
      const angle = d - (d - a) * u;
      return [Math.cos(angle) * radius, base + Math.sin(angle) * radius, .22 - v * .51];
    }, 3, 1, 0xaba092);
  }
  for (const side of [-1,1]) {
    for (let j = 0; j < 6; j++) {
      face.box(m.mortar, side * 1.485, (j + .5) * base / 6, -.05,
        .255, base / 6 - .014, .53, j % 3 === 0 ? 0xcebaa7 : 0xaf9e91);
    }
    face.block(side * 1.49,-.065,.26,.58);
  }
  face.box(m.wash,0,5.91,-.15,3.20,5.00,.33,0xa9a095);
  face.panel(m.brickWarm,0,5.85,.032,3.2,4.94,0,0,0xffffff,[1.79,3.08,.48,.58]);
  face.box(m.mortar,0,3.46,.104,3.19,.112,.25,0xbab2a7);
  face.box(m.mortar,0,7.90,.089,3.19,.106,.22,0x908d93);

  // Brick between the voussoirs and the square lintel closes the spandrel.
  for (const side of [-1,1]) {
    face.sheet(m.brickWarm, (u,v) => {
      const x = side * (0.001 + (side > 0 ? 1-u : u) * 1.616);
      const y = base + Math.sqrt(Math.max(0,outer * outer - x * x));
      return [x, y + v * (3.55 - y), .041];
    }, 33, 3);
    face.sheet(m.mortar, (u,v) => {
      const x = side * (0.001 + (side > 0 ? 1-u : u) * 1.616);
      const y = base + Math.sqrt(Math.max(0,outer * outer - x * x));
      return [-x, y + v * (3.55 - y), -.24];
    }, 33, 3, 0x9c958c);
  }
  const tea = enamelSign({name:"TEA ROOM", sub:"THROUGH THE ARCH", background:"#263e43", ink:"#d0e5cf", line:"#829f90", glow:.25});
  sign(face,m,tea,0,3.774,.11,1.62,.40,0xb0a297);
  face.box(m.steel,0,4.11,.20,1.94,.092,.51,0x5f6f6c);
  face.box(m.coolCore,0,4.00,.29,.96,.030,.08,0xb2f4d8);
  face.light(0,3.82,.91,0x6ad7bd,9,4.3);
  face.decal("reflection",0,1.75,1.18,4.15,0x56b6a7,.26);
  face.decal("reflection",.22,2.31,.35,2.13,0xa7d6b6,.09);
}

function passage(parent, colliders, m) {
  const a = new Batch(parent, colliders, "Stone entrance to tea passage", 2.53, -7.12);
  arch(a,m);
  a.finish();
  const b = new Batch(parent, colliders, "Covered tea passage", 2.53, -9.63);
  b.panel(m.stone,0,0,.173,3.47,4.682,-Math.PI/2,0,0xffffff,[3.47/4.25,4.682/4.15,2.83588,4.67301]);
  for (const side of [-1,1]) {
    b.box(m.wash,side*1.565,1.37,0,.331,2.74,5.38,0xa49d8a);
    b.panel(m.brickCoal,side*1.387,1.37,0,5.39,2.75,0,-side*Math.PI/2,0xffffff,[2.93,1.67]);
    b.box(m.mortar,side*1.381,.147,0,.127,.291,5.41,0x9e9c8f);
    b.block(side*1.57,0,.36,5.38);
    b.rod(m.black,[side*1.25,2.48,-2.54],[side*1.25,2.48,2.53],.029,0xb5a493);
    for (const z of [-1.93,-.69,.67,2.01]) b.torus(m.steel,side*1.25,2.48,z,.033,.009,"vertical",0x8e877a,12);
  }
  b.box(m.wash,0,2.91,0,3.53,.32,5.46,0xa7a29a);
  for (let i = 0; i < 11; i++) {
    b.box(m.woodDark,0,2.701,-2.46 + i * .49,2.82,.117,.142,i % 3 ? 0xaf9b86 : 0xc5ad95);
  }
  for (const [z,k] of [[.8,0],[-1.39,1]]) {
    paperLantern(b,m,.06,2.335,z,.66);
    b.decal("reflection",.07,z + .60,.86,1.98,0xde925c,.23);
    b.box(m.black,0,2.702,z,.17,.028,.19,0xaf997d);
    if (k === 1) b.light(.06,2.18,z,0xffaf6d,17.5,4.9);
  }
  const plaque = enamelSign({name:"TEA", sub:"COUNTER AHEAD", background:"#3a302c", ink:"#e4c38e", line:"#987954", glow:.18});
  b.box(m.woodDark,-1.315,1.76,.31,.09,.51,.96,0xb7a185);
  b.panel(plaque,-1.256,1.76,.31,.89,.43,0,Math.PI/2);
  b.box(m.mortar,0,.015,-2.148,2.74,.027,.117,0xaca098);
  b.finish();
}

function teaVessel(b,m,x,y,z,shade,scale=1,knob=true) {
  const p = [[0,0],[.079,.012],[.11,.037],[.119,.122],[.099,.179],[.077,.184]]
    .map(([r,h]) => [r*scale,h*scale]);
  b.lathe(m.enamel,x,y,z,p,shade,18);
  b.cyl(m.enamel,x,y+.183*scale,z,.076*scale,.083*scale,.025*scale,shade,18);
  if (knob) b.orb(m.enamel,x,y+.213*scale,z,.024*scale,.017*scale,.024*scale,shade);
}

function teaRoom(parent, colliders, m) {
  const b = new Batch(parent, colliders, "The tea counter", 2.53, -13.96);
  const ceiling = 3.12;
  const rand = random(3664);
  b.panel(m.stone,0,0,-.099,5.72,4.522,-Math.PI/2,0,0xffffff,[5.72/4.25,4.522/4.15,2.57118,5.80120]);
  b.box(m.wash,0,ceiling + .075,0,5.68,.15,4.76,0xccad91);
  for (const side of [-1,1]) {
    b.box(m.wash,side*2.76,ceiling/2,0,.27,ceiling,4.72,0xb9a492);
    b.panel(m.brickOld,side*2.611,.45,0,4.68,.88,0,-side*Math.PI/2,0xffffff,[2.59,.54]);
    b.box(m.woodDark,side*2.61,.93,0,.061,.075,4.64,0xc3ab8f);
    b.block(side*2.76,0,.29,4.72);
    b.box(m.wash,side*2.12,1.53,2.19,1.52,3.06,.25,0xb4a594);
    b.block(side*2.12,2.19,1.52,.27);
    b.box(m.mortar,side*1.43,1.45,2.06,.11,2.91,.23,0xc5b29d);
  }
  b.box(m.wash,0,ceiling/2,-2.27,5.69,ceiling,.27,0xb8a18c);
  b.block(0,-2.27,5.69,.29);
  b.panel(m.teaTile,0,1.35,-2.121,5.23,1.43,0,0,0xffffff,[2.76,.77]);
  b.box(m.woodDark,0,2.09,-2.09,5.27,.083,.13,0xc2ae96);
  for (let i = -4; i <= 4; i++) b.box(m.woodDark,i*.58,3.029,0,.116,.18,4.36,0xcfba9d);
  b.box(m.wood,0,.91,-1.22,3.69,.118,.829,0xc7a17f);
  b.box(m.woodDark,0,.47,-1.28,3.47,.87,.657,0xd2b394);
  b.box(m.mortar,0,.091,-.886,3.51,.12,.127,0xb3aa9c);
  for (let i = 0; i < 19; i++) b.box(m.wood, (i / 18 - .5) * 3.33,.49,-.941,.126,.63,.029,
    i % 3 === 0 ? 0x997052 : i % 3 === 1 ? 0xa98465 : 0xb58c70);
  b.box(m.woodDark,0,.77,-.913,3.48,.059,.079,0xc6a28c);
  b.box(m.woodDark,0,.178,-.914,3.48,.081,.093,0xc6a28c);
  b.block(0,-1.22,3.70,.839);
  b.decal("shadow",0,-1.25,4.16,1.37,0x110f15,.49);
  for (const y of [1.29,1.69]) {
    b.box(m.wood,0,y,-1.992,3.85,.071,.339,0xc9a485);
    for (const x of [-1.52,-.40,.71,1.55]) b.rod(m.black,[x,y - .04,-1.84],[x,y - .25,-2.085],.021,0xc0af95);
  }

  const ceramics = [0xa8ccc0,0xc3b89c,0x617a78,0x849d92,0xede0be];
  for (let i = 0; i < 8; i++) {
    const x = -1.60 + i * .45;
    teaVessel(b,m,x,1.33,-1.985,ceramics[i % 5],.76 + rand()*.18,i % 3 !== 0);
  }
  for (const [x,z,shade] of [[-1.29,-1.99,0x9bb7a6],[-.86,-1.98,0xe0ae82],[.66,-1.99,0x869f9f],[1.27,-1.99,0xd8d6be]]) {
    teaVessel(b,m,x,1.73,z,shade,1.18);
  }
  b.box(m.woodDark,-.87,.984,-1.13,1.21,.032,.47,0xc9a477);
  for (const [x,z,scale] of [[-.96,-1.13,1.27],[-.51,-1.11,.85]]) {
    teaVessel(b,m,x,1.004,z,0xa9c0ad,scale);
    b.torus(m.enamel,x + .145 * scale,1.135,z,.075*scale,.014,"vertical",0x9bbaab,18);
    b.rod(m.enamel,[x - .088*scale,1.08,z],[x - .197*scale,1.19,z],.026*scale,0xa7c0a9,12);
  }
  for (const [x,z] of [[.69,-1.02],[.89,-1.05],[1.11,-1.07],[1.32,-1.02]]) bowl(b,m,x,.984,z,.079,0xd8d3b5);
  b.cyl(m.steel,1.47,1.09,-1.48,.165,.176,.196,0xbab9aa);
  b.cyl(m.black,1.47,1.2,-1.48,.141,.167,.034,0xa7a692);
  b.torus(m.steel,1.47,1.26,-1.48,.111,.013,"vertical",0xaaa59b);
  const roomSign = enamelSign({name:"STILL WATER", sub:"TEA BY THE CUP", background:"#394b44", ink:"#e9d4a5", line:"#978b67", glow:.15});
  sign(b,m,roomSign,0,2.50,-2.05,2.15,.56,0xb89c79);

  for (const x of [-1.27,1.24]) {
    paperLantern(b,m,x,2.48,-.61,.80);
    b.decal("reflection",x*.87,.18,.92,2.52,0xe2a263,.22);
  }
  b.light(-.18,2.28,-.67,0xffba74,34,5.2);
  const benchX=2.13, benchZ=.65;
  b.box(m.wood,benchX,.48,benchZ,.43,.076,1.4,0xd0a479);
  for (const z of [.12,1.18]) b.box(m.woodDark,benchX,.235,z,.33,.43,.078,0xc8a688);
  b.block(benchX,benchZ,.43,1.4);
  for (const [x,z,s] of [[-2.08,-.61,.78],[-2.02,.46,1]]) {
    b.cyl(m.wood,x,.459*s,z,.206,.208,.071*s,0xc7a377,16);
    for (const i of [0,1,2]) {
      const a = i * Math.PI * 2/3;
      b.rod(m.woodDark,[x+Math.cos(a)*.167,.025,z+Math.sin(a)*.167],
        [x+Math.cos(a)*.104,.436*s,z+Math.sin(a)*.104],.031,0xc5a687);
    }
    b.block(x,z,.41,.41);
  }
  b.cyl(m.enamel,2.29,.18,-1.58,.22,.16,.35,0xa2a58a,20);
  b.cyl(m.rubber,2.29,.36,-1.58,.19,.19,.025,0x654e42,15);
  for (let i = 0; i < 12; i++) {
    const x = 2.29 + (rand() - .5) * .41, z = -1.58 + (rand() - .5) * .34, y = .46 + rand() * .31;
    b.rod(m.foliage,[2.29,.37,-1.58],[x,y,z],.009,0x46634b,5);
    b.orb(m.foliage,x,y,z,.09,.033,.042,i%2 ? 0x5e8056 : 0x8ea06f,rand()*2);
  }
  b.block(2.29,-1.58,.44,.43);
  const notice = enamelSign({name:"TAKE A CUP",sub:"PLEASE RETURN IT HERE", background:"#865f43",ink:"#fae0ae",line:"#b99462",glow:.14});
  b.panel(notice,2.585,1.76,.47,.86,.29,0,-Math.PI/2);
  b.box(m.woodDark,-2.55,1.32,-.74,.18,.06,1.11,0xb09376);
  for(const z of [-1.04,-.86,-.64,-.43]) {
    const x=-2.487;
    b.cyl(m.enamel,x,1.397,z,.067,.055,.109,0xc9b8a1,15);
    b.torus(m.enamel,x+.059,1.399,z,.034,.008,"vertical",0xc9b8a1,15);
  }
  b.finish();
}

export function buildTea(parent, colliders, m) {
  passage(parent,colliders,m);
  teaRoom(parent,colliders,m);
}
