"""Colab-side: render one chunk of ShipsShort with post ON (fixed build).
Bake START/END into this file before upload. Run via
`colab exec -s ships -f colab-ships-chunk.py --timeout 0`."""
import subprocess
import time

START, END = 1560, 2079
OUT = f"out/ships-chunk4.mp4"


def run(cmd, cwd=None):
    print(f"$ {' '.join(cmd)}", flush=True)
    p = subprocess.run(cmd, cwd=cwd, text=True,
                       capture_output=True, timeout=3600)
    tail = ((p.stdout or "") + (p.stderr or "")).strip().splitlines()
    for line in tail[-6:]:
        print(f"  | {line}", flush=True)
    print(f"-> exit {p.returncode}", flush=True)
    return p.returncode


n = END - START + 1
t0 = time.time()
rc = run(["npx", "remotion", "render", "ShipsShort", OUT,
          f"--frames={START}-{END}",
          "--concurrency=2", "--timeout=180000"], cwd="/content/ships")
secs = time.time() - t0
print(f"CHUNK_FRAMES: {n}", flush=True)
print(f"RENDER_SECONDS: {secs:.1f}", flush=True)
print(f"SEC_PER_FRAME: {secs / n:.2f}", flush=True)
run(["ffprobe", "-v", "error", "-show_entries",
     "format=duration,size", "-of",
     "default=noprint_wrappers=1", OUT], cwd="/content/ships")
run(["ls", "-lh", OUT], cwd="/content/ships")
print("CHUNK DONE", flush=True)
