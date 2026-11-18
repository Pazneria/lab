'use strict';

const Quarters = (() => {
  const amber=[1,.66,.37], honey=[1,.78,.53], copper=[1,.48,.22],
    blue=[.62,.83,1], pale=[1,.88,.73];
  const L=(x,y,z,range,tone,power)=>[[x,y,z],range,tone,power];
  const windowLight=L(-2.93,1.96,2.84,6.05,blue,2.15);
  const keeperLamp=L(-2.58,2.18,-.13,6.74,honey,3.46);
  const serviceLamp=L(-1.243,2.42,-4.26,5.95,amber,4.15);
  const jambLeft=L(-1.99,2.32,-6.60,7.21,amber,3.70);
  const jambRight=L(2.28,2.38,-6.67,8.59,honey,4.29);
  const coals=L(-6.32,1.15,-11.92,11.24,copper,8.70);
  const hearthBounce=L(-4.38,3.74,-11.78,11.30,amber,4.35);
  const vaultBounce=L(1.56,5.35,-12.59,12.8,honey,3.08);
  const eastLamp=L(6.59,3.52,-13.86,9.91,honey,4.26);
  const farLamp=L(3.98,4.10,-17.35,10.22,honey,4.98);
  const lighting={
    room:{ambient:[.46,.432,.400],lights:[
      keeperLamp,windowLight,L(-2.948,1.101,.298,2.77,amber,2.13),
      L(.88,2.46,2.69,6.17,pale,1.44),L(1.26,2.24,-.69,4.09,honey,.98)
    ]},
    tack:{ambient:[.401,.358,.318],lights:[
      serviceLamp,jambRight,L(.85,2.25,-.49,5.12,honey,2.21),
      L(.84,2.83,-2.73,5.72,pale,1.2),L(-.46,1.70,-.95,4.63,blue,.59)
    ]},
    roostNear:{ambient:[.381,.318,.263],lights:[jambRight,jambLeft,hearthBounce,vaultBounce,eastLamp]},
    roostMid:{ambient:[.349,.282,.233],lights:[coals,hearthBounce,vaultBounce,eastLamp,farLamp]},
    roostBack:{ambient:[.366,.315,.267],lights:[farLamp,vaultBounce,hearthBounce,eastLamp,L(-3.90,2.81,-17.13,8.34,amber,2.70)]},
    berth:{ambient:[.370,.303,.243],lights:[coals,hearthBounce,vaultBounce,farLamp,eastLamp]},
    hearth:{ambient:[.298,.237,.192],lights:[coals,hearthBounce,vaultBounce,jambLeft]},
    trough:{ambient:[.394,.349,.299],lights:[jambRight,eastLamp,vaultBounce,L(5.85,2.58,-8.75,4.80,pale,2.89)]}
  };

  const roomZones=[
    [-3.355,3.355,-.365,4.759],
    [.322,1.876,-.882,-.202],
    [-1.602,2.389,-5.456,-.716],
    [-.783,1.413,-6.368,-5.286],
    [-8.139,8.138,-19.267,-5.997]
  ];
  const radius=.207;
  const probes=Array.from({length:12},(_,i)=>[Math.cos(i*Ward.TAU/12)*radius,Math.sin(i*Ward.TAU/12)*radius]);
  const spawn={position:[.671,1.64,4.277],yaw:.033,pitch:-.082,fov:Math.PI*63/180};
  function create() {
    Craft.resetSeed();
    const meshes=[], obstacles=[], labels=[];
    function group(zone,transparent=false) {
      if (!lighting[zone]) throw Error('Invalid lighting group '+zone);
      const part=new Ward.Mesh(zone,transparent);
      meshes.push(part);
      return part;
    }
    function hit(x0,x1,z0,z1) {
      if (x1<=x0 || z1<=z0) throw Error('Invalid collision bounds');
      obstacles.push([x0,x1,z0,z1]);
    }
    function label(text,position,reach,range) {
      labels.push({text,position,reach,range});
    }
    const scene={meshes,obstacles,labels,lighting,group,hit,label};
    Architecture.bedroom(scene);
    Fixtures.bedroom(scene);
    Architecture.passage(scene);
    Fixtures.passage(scene);
    Architecture.roost(scene);
    Roost.build(scene);
    return scene;
  }
  function within(x,z) {
    return roomZones.some(([l,r,a,b])=>x>=l&&x<=r&&z>=a&&z<=b);
  }
  function walkable(scene,x,z) {
    if (!within(x,z)) return false;
    for (const [dx,dz] of probes) if (!within(x+dx,z+dz)) return false;
    for (const [l,r,a,b] of scene.obstacles) {
      if (x<=l-radius || x>=r+radius || z<=a-radius || z>=b+radius) continue;
      const dx=x-Ward.clamp(x,l,r), dz=z-Ward.clamp(z,a,b);
      if (dx*dx+dz*dz<radius*radius) return false;
    }
    return true;
  }
  function location(z) {
    if (z>-.6) return 'Caretaker’s room';
    if (z>-5.9) return 'Tack passage';
    return 'The roost';
  }

  return {create,walkable,within,location,spawn,radius};
})();

