// The camera moves independently of the frozen scene. Keep world-matrix updates
// enabled: Three r186's updateMatrixWorld(true) still respects this switch.
// Constructor injection keeps these actual camera transforms testable without GPU.
export function createLabCamera(PerspectiveCamera){
  const camera=new PerspectiveCamera(70,1,.04,80);
  camera.rotation.order='YXZ';
  return camera;
}

export function poseLabCamera(camera,position){
  camera.position.set(position.x,position.eye??(position.crouch?1.12:1.62),position.z);
  camera.rotation.set(position.pitch,position.yaw,0);
  camera.updateMatrixWorld(true);
}
