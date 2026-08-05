"""Compress portfolio work videos for web delivery."""
from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
ROOT = Path(__file__).resolve().parent.parent
WORKS = ROOT / "public" / "works"

# name -> (crf, max_edge, audio_kbps)
# max_edge = longest side limit (vertical height or horizontal width)
SETTINGS = {
    "fonts-motion.mp4": (26, 1280, 96),
    "chasiki.mp4": (26, 1280, 96),
    "glidex.mp4": (26, 1280, 96),
    "burger-cut.mp4": (26, 1280, 96),
    "yoga-reel.mp4": (26, 1280, 96),
    "glidex-prewiew.mp4": (30, 720, 64),
}


def compress(src: Path, crf: int, max_edge: int, audio_k: int) -> Path:
    tmp = src.with_suffix(".tmp.mp4")
    scale = (
        f"scale='if(gt(iw,ih),min({max_edge},iw),-2)':"
        f"'if(gt(ih,iw),min({max_edge},ih),-2)':flags=lanczos"
    )
    cmd = [
        FFMPEG,
        "-y",
        "-i",
        str(src),
        "-vf",
        scale,
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        str(crf),
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "-c:a",
        "aac",
        "-b:a",
        f"{audio_k}k",
        "-ac",
        "2",
        str(tmp),
    ]
    print(f"\n>> {src.name}")
    subprocess.run(cmd, check=True)
    before = src.stat().st_size
    after = tmp.stat().st_size
    if after >= before * 0.95:
        print(f"   skip replace (already small): {before/1e6:.1f} -> {after/1e6:.1f} MB")
        tmp.unlink(missing_ok=True)
        return src
    bak = src.with_suffix(".mp4.bak")
    shutil.move(src, bak)
    shutil.move(tmp, src)
    bak.unlink(missing_ok=True)
    print(f"   {before/1e6:.1f} MB -> {after/1e6:.1f} MB ({100 * after / before:.0f}%)")
    return src


def main() -> None:
    total_before = 0
    total_after = 0
    for name, opts in SETTINGS.items():
        src = WORKS / name
        if not src.exists():
            print("missing", name)
            continue
        total_before += src.stat().st_size
        compress(src, *opts)
        total_after += src.stat().st_size
    print(
        f"\nTOTAL works: {total_before/1e6:.1f} MB -> {total_after/1e6:.1f} MB "
        f"(saved {(total_before - total_after)/1e6:.1f} MB)"
    )


if __name__ == "__main__":
    main()
