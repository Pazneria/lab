export const entrance={x:-.84,z:3.38,yaw:-.259,pitch:-.09}
export const radius=.218,eyeHeight=1.57
export function slide(x,z,dx,dz,colliders){
 const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.065));dx/=steps;dz/=steps
 for(let step=0;step<steps;step++){x+=dx;z+=dz
  for(let pass=0;pass<3;pass++){let hit=false
   for(const [x0,z0,x1,z1] of colliders){
    if(x<x0-radius||x>x1+radius||z<z0-radius||z>z1+radius)continue
    const px=x-Math.max(x0,Math.min(x1,x)),pz=z-Math.max(z0,Math.min(z1,z)),d2=px*px+pz*pz;if(d2>=radius*radius)continue
    if(d2>.00000001){const d=Math.sqrt(d2),f=(radius-d+.00003)/d;x+=px*f;z+=pz*f}
    else{const m=Math.min(x-x0,x1-x,z-z0,z1-z);if(m===x-x0)x=x0-radius;else if(m===x1-x)x=x1+radius;else if(m===z-z0)z=z0-radius;else z=z1+radius}
    hit=true
   }if(!hit)break
  }
 }
 return [x,z]
}
