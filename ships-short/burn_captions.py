"""Burn captions.json onto a video with ffmpeg + libass.
Al-Fatih style: white bold, black outline, bottom center, 2-6 words per card.
Usage: python3 burn_captions.py <input.mp4> <output.mp4>
Also writes captions.ass next to the output. Font: DejaVu Sans Bold (system).
Test on a still: python3 burn_captions.py --still <frame.jpg> <out.jpg>
"""
import json, subprocess, sys, os

ROOT = os.path.dirname(os.path.abspath(__file__))
CAPS = json.load(open(os.path.join(ROOT, "captions.json")))

def fmt(t):
    h = int(t // 3600); m = int((t % 3600) // 60); s = t % 60
    return f"{h}:{m:02d}:{s:05.2f}"

ASS_HEAD = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,DejaVu Sans,72,&H00FFFFFF,&H000000FF,&H00000000,&H80000000,-1,0,0,0,100,100,0,0,1,5,2,2,80,80,150,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

def build_ass(path):
    lines = [ASS_HEAD]
    for c in CAPS:
        # FIX 2026-11-25: do NOT escape commas — Text is the last field of a
        # Dialogue line, so commas are literal. The old "\," rendered as a
        # visible backslash before every comma ("darat\,").
        text = c["text"]
        lines.append(f"Dialogue: 0,{fmt(c['start'])},{fmt(c['end'])},Cap,,0,0,0,,{text}")
    open(path, "w").write("\n".join(lines))
    return path

if __name__ == "__main__":
    if sys.argv[1] == "--still":
        src, out = sys.argv[2], sys.argv[3]
        ass = build_ass(os.path.join(ROOT, "captions.ass"))
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", src,
                        "-vf", f"ass={ass}", "-frames:v", "1", out], check=True)
        print("WROTE", out)
    else:
        src, out = sys.argv[1], sys.argv[2]
        ass = build_ass(os.path.join(ROOT, "captions.ass"))
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", src,
                        "-vf", f"ass={ass}",
                        "-c:v", "libx264", "-preset", "medium", "-crf", "18",
                        "-c:a", "copy", out], check=True)
        print("WROTE", out)
