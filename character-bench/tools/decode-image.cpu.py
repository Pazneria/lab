"""Decode bounded PNG/JPEG bytes to actual RGBA pixels. No rendering or asset writes."""
import io, json, struct, sys, warnings
from PIL import Image
warnings.simplefilter("error", Image.DecompressionBombWarning)
Image.MAX_IMAGE_PIXELS = 32 * 1024 * 1024
payload = sys.stdin.buffer.read(64 * 1024 * 1024 + 1)
if len(payload) > 64 * 1024 * 1024:
    raise ValueError("Image input exceeds 64 MiB")
with Image.open(io.BytesIO(payload)) as image:
    if image.format not in ("PNG", "JPEG"):
        raise ValueError("Only PNG and JPEG are supported")
    width, height = image.size
    if not (0 < width <= 4096 and 0 < height <= 4096):
        raise ValueError("Image dimensions exceed host limits")
    image.verify()
with Image.open(io.BytesIO(payload)) as image:
    image.load()
    pixels = image.convert("RGBA").tobytes()
sys.stdout.buffer.write(struct.pack("<II", width, height) + pixels)
