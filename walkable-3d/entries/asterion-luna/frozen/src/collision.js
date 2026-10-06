export function terrainHeight(x,z) {
  const r=Math.hypot(x,z),a=Math.atan2(x,z),t=r/21.5;
  const wob=(Math.sin(a*9)+.43*Math.sin(a*17+1.7)+.28*Math.sin(a*31+2.1))*t;
  const rr=r+wob*.8;
  let y=-.62+.045*Math.sin(a*4+r*.3)+.028*Math.sin(a*9-r*.4);
  if(rr>19.5)y-=Math.pow((rr-19.5)/2,1.4)*.95;
  return y;
}

export function floorHeight(z,x=0) {
  if(Math.abs(x)<1.55&&z>12.65&&z<15.195){
    if(z>14.525)return -.40;
    if(z>13.85)return -.25;
    if(z>13.18)return -.10;
    return 0;
  }
  if(Math.hypot(x,z)<=5.22)return 0;
  if(x>4.8&&x<18.1&&Math.abs(z)<5.5)return 0;
  if(Math.abs(x)<1.55&&z>4.8&&z<12.8)return 0;
  return terrainHeight(x,z);
}

export function createCollisionMap() {
  function isPortal(x,z) {
    const r=Math.hypot(x,z); if(r<.01)return false;
    const angle=(Math.atan2(x,z)+Math.PI*2)%(Math.PI*2);
    const da=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));
    return (da(angle,0)<.245 && Math.abs(x)<.93) || (da(angle,Math.PI/2)<.245 && Math.abs(z)<.93);
  }
  function circleBarrier(x,z) {
    const r=Math.hypot(x,z);
    if(r<4.81||r>6.20)return false;
    return !isPortal(x,z);
  }
  function collides(x,z) {
    // Passage cheeks and header reveal form real wall planes.
    if(z>4.95&&z<12.75&&Math.abs(x)>1.06&&Math.abs(x)<2.30)return true;
    // Broad instrument footprint protects the mount and leaves a continuous walking orbit.
    if(x*x+z*z<1.96*1.96)return true;
    // Return to the outside only through the two framed doors.
    if(circleBarrier(x,z))return true;
    // Keep the lookout safely behind its low parapet and the natural shelf edge.
    if(Math.hypot(x,z)>20.0)return true;
    if(x>17.72&&Math.abs(z)<5.25)return true;
    if(x>5.8&&x<18.0&&Math.abs(z)>5.12)return true;
    return false;
  }
  function insideTunnel(x,z){return Math.abs(x)<1.32&&z>5.0&&z<12.8;}
  function region(x,z){
    if(insideTunnel(x,z))return z<7.0?'Meridian passage':'Shaded entrance';
    if(Math.hypot(x,z)<5.05)return 'The meridian chamber';
    if(x>5.4&&x<18&&Math.abs(z)<5.2)return 'Open sky terrace';
    return 'The western escarpment';
  }
  return {collides,insideTunnel,region};
}
