"""Extract a compressed JPEG poster from a work video."""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg
from PIL import Image

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
ROOT = Path(__file__).resolve().parent.parent / "public" / "works"


def main(name: str, at_sec: float = 1.0) -> None:
    src = ROOT / name
    png = ROOT / name.replace(".mp4", ".png")
    jpg = ROOT / name.replace(".mp4", ".jpg")
    subprocess.run(
        [
            FFMPEG,
            "-y",
            "-ss",
            str(at_sec),
            "-i",
            str(src),
            "-frames:v",
            "1",
            "-update",
            "1",
            "-q:v",
            "2",
            str(png),
        ],
        check=True,
    )
    img = Image.open(png).convert("RGB")
    w = 720
    h = int(img.height * (w / img.width))
    img.resize((w, h), Image.Resampling.LANCZOS).save(jpg, "JPEG", quality=82, optimize=True)
    png.unlink(missing_ok=True)
    print(f"poster: {jpg} ({jpg.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "fonts-motion.mp4")
