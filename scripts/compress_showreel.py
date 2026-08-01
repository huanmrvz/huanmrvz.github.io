"""Compress hero showreel mp4 + webm for web delivery."""
from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
PUBLIC = Path(__file__).resolve().parent.parent / "public"
MP4 = PUBLIC / "showreel.mp4"
WEBM = PUBLIC / "showreel.webm"


def run(cmd: list[str]) -> None:
    print(" ".join(cmd[:6]), "...")
    subprocess.run(cmd, check=True)


def main() -> None:
    before_mp4 = MP4.stat().st_size if MP4.exists() else 0
    before_webm = WEBM.stat().st_size if WEBM.exists() else 0

    tmp_mp4 = PUBLIC / "showreel.tmp.mp4"
    scale = (
        "scale='if(gt(iw,ih),min(1280,iw),-2)':"
        "'if(gt(ih,iw),min(1280,ih),-2)':flags=lanczos"
    )
    run(
        [
            FFMPEG,
            "-y",
            "-i",
            str(MP4),
            "-vf",
            scale,
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "26",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            "-an",
            str(tmp_mp4),
        ]
    )
    # Hero showreel is muted — drop audio to save more
    shutil.move(MP4, PUBLIC / "showreel.mp4.bak")
    shutil.move(tmp_mp4, MP4)
    (PUBLIC / "showreel.mp4.bak").unlink(missing_ok=True)

    tmp_webm = PUBLIC / "showreel.tmp.webm"
    run(
        [
            FFMPEG,
            "-y",
            "-i",
            str(MP4),
            "-c:v",
            "libvpx-vp9",
            "-b:v",
            "0",
            "-crf",
            "34",
            "-row-mt",
            "1",
            "-an",
            str(tmp_webm),
        ]
    )
    if WEBM.exists():
        WEBM.unlink()
    shutil.move(tmp_webm, WEBM)

    after_mp4 = MP4.stat().st_size
    after_webm = WEBM.stat().st_size
    print(
        f"showreel.mp4  {before_mp4/1e6:.1f} -> {after_mp4/1e6:.1f} MB\n"
        f"showreel.webm {before_webm/1e6:.1f} -> {after_webm/1e6:.1f} MB\n"
        f"saved {(before_mp4 + before_webm - after_mp4 - after_webm)/1e6:.1f} MB"
    )


if __name__ == "__main__":
    main()
