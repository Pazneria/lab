// The host's automatic walking exit. This module has no renderer, network or
// navigation side effects: its one-shot signals are handled by the host page.
export const HOME_URL='https://pazneria.github.io/';
const freeze=value=>Object.freeze(value);
const box=(minX,maxX,minZ,maxZ)=>freeze({type:'box',minX,maxX,minZ,maxZ});
export const exitLayout=freeze({
  doors:freeze({
    inner:freeze({z:8.5,leafWidth:1.2,leafCenter:.63,travel:1.15,minZ:8.4,maxZ:8.55}),
    outer:freeze({z:11.5,leafWidth:1.2,leafCenter:.63,travel:1.15,minZ:11.4,maxZ:11.55}),
  }),
  // Clear floor union: original lobby plus its threshold and a short landing.
  floors:freeze([
    freeze({minX:-1.95,maxX:1.95,minZ:8.5,maxZ:11.6}),
    freeze({minX:-1.3,maxX:1.3,minZ:11.5,maxZ:12.35}),
  ]),
  innerApproach:freeze({minX:-1.05,maxX:1.05,minZ:7.6,maxZ:9.1}),
  outerApproach:freeze({minX:-1.05,maxX:1.05,minZ:9.75,maxZ:12.03}),
  // Include the whole reachable landing stop (end wall minus player clearance).
  // A long sprint step can otherwise cross the trigger and stop just beyond it.
  threshold:freeze({minX:-.95,maxX:.95,z:11.88,maxZ:12.035}),
  openingSeconds:.7,closingSeconds:.9,holdSeconds:.65,
  safetyDistance:.6,playerClearance:.315,maxStep:.5,maxFrameSeconds:.1,
});

// These correspond to the existing side walls and the new frame/landing pieces.
// The old fixed doorway blocker must be excluded from host navigation; retaining
// its procedural record allows the original room's collision audit to continue.
export const exitStaticColliders=freeze([
  // Fixed pocket envelopes keep a sliding leaf from entering the player disk.
  box(-2.38,-1.27,8.4,8.58),box(1.27,2.38,8.4,8.58),
  box(-2.05,-1.95,8.5,11.65),box(1.95,2.05,8.5,11.65),
  box(-2.38,-1.27,11.4,11.65),box(1.27,2.38,11.4,11.65),
  box(-1.4,-1.3,11.6,12.35),box(1.3,1.4,11.6,12.35),
  box(-1.4,1.4,12.35,12.45),
]);
export function isOriginalDoorCollider(c){
  return c?.type==='box'&&Math.abs(c.minX+1.35)<1e-9&&Math.abs(c.maxX-1.35)<1e-9&&Math.abs(c.minZ-8.45)<1e-9&&Math.abs(c.maxZ-8.6)<1e-9;
}
export function boundedProgress(value=0){
  if(!Number.isFinite(value))throw new TypeError('Door progress must be finite');
  return Math.max(0,Math.min(1,value));
}
export function doorLeafCenter(id,sign,progress=0){
  const door=exitLayout.doors[id];
  if(!door||![-1,1].includes(sign))throw new TypeError('Unknown exit door or leaf');
  return sign*(door.leafCenter+door.travel*boundedProgress(progress));
}
export function doorColliders(id,progress=0){
  const door=exitLayout.doors[id];if(!door)throw new TypeError('Unknown exit door');
  return [-1,1].map(sign=>{
    const x=doorLeafCenter(id,sign,progress);
    return {type:'box',minX:x-door.leafWidth/2,maxX:x+door.leafWidth/2,minZ:door.minZ,maxZ:door.maxZ,exitGate:id,leaf:sign};
  });
}
export function doorCanPass(id,x,progress=0,radius=exitLayout.playerClearance){
  if(!Number.isFinite(x)||!Number.isFinite(radius)||radius<0)return false;
  const panels=doorColliders(id,progress),halfGap=panels[1].minX;
  // The stationary aluminium posts define a smaller limit when fully open.
  return Math.abs(x)+radius<Math.min(halfGap,1.27)-1e-6;
}
const finitePoint=p=>Number.isFinite(p?.x)&&Number.isFinite(p?.z);
const inside=(p,r)=>p.x>=r.minX&&p.x<=r.maxX&&p.z>=r.minZ&&p.z<=r.maxZ;
const smooth=value=>value*value*(3-2*value);
const crossing=(a,b,z)=>{
  if(a.z<=z&&b.z>z)return {direction:1,x:a.x+(b.x-a.x)*(z-a.z)/(b.z-a.z)};
  if(a.z>=z&&b.z<z)return {direction:-1,x:a.x+(b.x-a.x)*(z-a.z)/(b.z-a.z)};
  return null;
};

export function createExitController(){
  const amount={inner:0,outer:0},doors={inner:0,outer:0},hold={inner:0,outer:0},requested={inner:false,outer:false},opening={inner:false,outer:false};
  let previous=null,innerCrossed=false,outerCrossed=false,preloaded=false,completed=false,disposed=false;
  function cancel(){previous=null;innerCrossed=false;outerCrossed=false;}
  // Preserve an already verified entrance traversal across an ordinary pause.
  // The second plane must be crossed afresh after focus/input has returned.
  function suspend(){previous=null;outerCrossed=false;}
  function snapshot(preload=null,navigate=null,active=false){
    return {
      doors:{...doors},colliders:[...doorColliders('inner',doors.inner),...doorColliders('outer',doors.outer)],
      phase:disposed?'disposed':completed?'complete':outerCrossed?'landing':innerCrossed?'vestibule':'lab',
      needsAnimation:active&&!completed&&!disposed&&Object.keys(doors).some(id=>(opening[id]?amount[id]<1:amount[id]>0)||(!requested[id]&&hold[id]>0)),
      preload,navigate,
    };
  }
  return {
    // Call before movement (to install the gates) and after movement (to detect
    // crossings). A dt=0 sample is valid and never advances door animation.
    update(position,{dt=0,active=true,focused=true,modal=false,slowMotion=false}={}){
      if(disposed||completed)return snapshot();
      const valid=finitePoint(position)&&Number.isFinite(dt)&&dt>=0&&dt<=exitLayout.maxFrameSeconds;
      if(!valid){cancel();return snapshot();}
      if(!active||!focused||modal){suspend();return snapshot();}
      const p={x:position.x,z:position.z},oldDoors={...doors};
      let preload=null,navigate=null;
      const normalStep=!previous||Math.hypot(p.x-previous.x,p.z-previous.z)<=exitLayout.maxStep;
      // Teleporting cannot establish a trip. It can still open a nearby door so
      // a recovered camera is never trapped inside a panel.
      if(!normalStep)cancel();
      if(normalStep&&innerCrossed&&!preloaded&&inside(p,exitLayout.outerApproach)){preloaded=true;preload=HOME_URL;}
      for(const id of ['inner','outer']){
        const door=exitLayout.doors[id],approach=id==='inner'?exitLayout.innerApproach:exitLayout.outerApproach;
        const occupied=Math.abs(p.z-door.z)<=exitLayout.safetyDistance&&Math.abs(p.x)<=1.65;
        requested[id]=inside(p,approach)||occupied;
        if(requested[id])hold[id]=exitLayout.holdSeconds;else hold[id]=Math.max(0,hold[id]-dt);
        opening[id]=requested[id]||hold[id]>0;
        const duration=opening[id]?exitLayout.openingSeconds:exitLayout.closingSeconds;
        const delta=dt*(slowMotion?.55:1)/duration;
        amount[id]=Math.max(0,Math.min(1,amount[id]+(opening[id]?delta:-delta)));
        doors[id]=smooth(amount[id]);
      }
      if(previous&&normalStep){
        const inner=crossing(previous,p,exitLayout.doors.inner.z),outer=crossing(previous,p,exitLayout.doors.outer.z);
        if(inner){
          if(inner.direction<0){innerCrossed=false;outerCrossed=false;}
          else if(doorCanPass('inner',inner.x,Math.min(oldDoors.inner,doors.inner))){innerCrossed=true;outerCrossed=false;}
          else{innerCrossed=false;outerCrossed=false;}
        }
        if(outer){
          if(outer.direction<0)outerCrossed=false;
          else outerCrossed=innerCrossed&&doorCanPass('outer',outer.x,Math.min(oldDoors.outer,doors.outer));
        }
        const threshold=exitLayout.threshold;
        if(innerCrossed&&outerCrossed&&previous.z<threshold.z&&p.z>=threshold.z&&p.z<=threshold.maxZ){
          const x=previous.x+(p.x-previous.x)*(threshold.z-previous.z)/(p.z-previous.z);
          // Validate the swept crossing itself: diagonal motion may end beyond
          // the narrow strip while remaining on the collision-bounded landing.
          if(x>=threshold.minX&&x<=threshold.maxX){completed=true;navigate=HOME_URL;}
        }
      }
      previous=p;
      return snapshot(preload,navigate,true);
    },
    cancel,
    snapshot:()=>snapshot(),
    dispose(){cancel();disposed=true;},
  };
}
