export function collectResources(root,resources) {
  if(!root)return;
  if(root.isTexture||root.isMaterial||root.isBufferGeometry||root.isSkeleton)resources.add(root);
  if(root.isMaterial)for(const value of Object.values(root))if(value?.isTexture)resources.add(value);
  root.traverse?.(node=>{
    if(node.geometry)resources.add(node.geometry);
    if(node.skeleton)resources.add(node.skeleton);
    for(const material of Array.isArray(node.material)?node.material:[node.material])if(material){resources.add(material);for(const value of Object.values(material))if(value?.isTexture)resources.add(value);}
  });
}
export function disposeResources(resources) {
  const images=new Set(),all=new Set(resources);
  for(const resource of resources)if(resource.isSkeleton&&resource.boneTexture){all.add(resource.boneTexture);resource.boneTexture=null;}
  for(const resource of all){if(resource.isTexture&&resource.source?.data)images.add(resource.source.data);resource.dispose?.();}
  for(const image of images)image.close?.();
  resources.clear();
}
export function disposeObject(root) {
  const geometries=new Set(),materials=new Set(),textures=new Set(),images=new Set(),skeletons=new Set();
  root?.traverse(node=>{
    if(node.geometry)geometries.add(node.geometry);
    for(const material of Array.isArray(node.material)?node.material:[node.material])if(material)materials.add(material);
    if(node.skeleton)skeletons.add(node.skeleton);
  });
  for(const material of materials)for(const value of Object.values(material))if(value?.isTexture)textures.add(value);
  for(const skeleton of skeletons)if(skeleton.boneTexture)textures.add(skeleton.boneTexture);
  for(const texture of textures){if(texture.source?.data)images.add(texture.source.data);texture.dispose();}
  for(const image of images)image.close?.();
  for(const geometry of geometries)geometry.dispose();
  for(const material of materials)material.dispose();
}
