// Shared by the room and CPU ray tests: only the visible board/frame is a target.
export function createWorldsBoard(T, world, texture) {
  const frame = new T.Mesh(new T.BoxGeometry(world.width+.14, world.height+.14, .12), new T.MeshLambertMaterial({color:'#264e40'}));
  frame.position.set(world.x, world.y, world.z-.07);
  frame.userData.worlds = true;
  const face = new T.Mesh(new T.PlaneGeometry(world.width, world.height), new T.MeshBasicMaterial({map:texture}));
  face.position.set(world.x, world.y, world.z);
  face.userData.comparison = true;
  return {frame,face};
}
