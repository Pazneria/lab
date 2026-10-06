import { inspectGLB } from './glb-policy.js';
self.onmessage = async ({ data }) => {
  const bitmaps = [];
  try {
    const { buffer, imageSources, stats } = inspectGLB(data);
    if (imageSources.length && typeof createImageBitmap !== 'function') throw new Error('This browser cannot decode textures in a worker. Use a current browser with ImageBitmap support.');
    // Decode sequentially in the cancellable worker, with dimensions bounded before decoding.
    for (const source of imageSources) {
      const bitmap = await createImageBitmap(new Blob([source.bytes], { type: source.mime }), { imageOrientation: 'none', premultiplyAlpha: 'none', colorSpaceConversion: 'none' });
      bitmaps.push(bitmap);
      if (bitmap.width !== source.dimensions[0] || bitmap.height !== source.dimensions[1]) throw new Error('Decoded texture dimensions disagree with the embedded header.');
    }
    self.postMessage({ ok: true, buffer, stats, bitmaps }, [buffer, ...bitmaps]);
  } catch (error) {
    for (const bitmap of bitmaps) bitmap.close();
    self.postMessage({ ok: false, error: error instanceof Error ? error.message : 'Could not validate or decode this GLB.' });
  }
};
