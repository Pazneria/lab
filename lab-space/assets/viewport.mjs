// CSS dimensions define the camera and pointer coordinates. Device scale only
// changes the drawing buffer, retaining the room's existing 1.25 density cap.
export function roomViewport(width,height,pixelRatio=1){
  if(!Number.isFinite(width)||!Number.isFinite(height)||width<=0||height<=0)return null;
  const ratio=Number.isFinite(pixelRatio)&&pixelRatio>0?Math.min(pixelRatio,1.25):1;
  return {width,height,pixelRatio:ratio,aspect:width/height,fov:width<height?78:65};
}
