"""Colab-side setup for ShipsShort: extract project, npm ci, install full
Chrome, install NVIDIA userspace GL libs, verify GPU WebGL (Vulkan).
Run via `colab exec -s ships -f colab-ships-setup.py --timeout 0`.
Note: ships-colab/remotion.config.ts already has vulkan + /usr/bin/google-chrome,
so no config patch is needed (unlike the bridge setup)."""
import re
import subprocess


def run(cmd, cwd=None):
    print(f"$ {' '.join(cmd)}", flush=True)
    p = subprocess.run(cmd, cwd=cwd, text=True,
                       capture_output=True, timeout=900)
    tail = ((p.stdout or "") + (p.stderr or "")).strip().splitlines()
    for line in tail[-4:]:
        print(f"  | {line}", flush=True)
    print(f"-> exit {p.returncode}", flush=True)
    return p.returncode


print("== extract ==", flush=True)
run(["bash", "-c",
     "tar -xzf /content/ships-colab.tar.gz -C /content && "
     "mv /content/ships-colab /content/ships && ls /content/ships"])
print("== npm ci ==", flush=True)
run(["npm", "ci", "--no-audit", "--no-fund"], cwd="/content/ships")
print("== full Chrome ==", flush=True)
run(["bash", "-c",
     "cd /tmp && curl -fsSL -o chrome.deb "
     "https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb "
     "&& apt-get update -qq && apt-get install -y ./chrome.deb"])
run(["google-chrome", "--version"])
print("== NVIDIA userspace GL libs ==", flush=True)
run(["bash", "-c",
     "apt-get install -y libnvidia-gl-580 libvulkan1 2>&1 | tail -n 2"])
print("== GPU WebGL check ==", flush=True)
open("/tmp/webgl.html", "w").write(
    """<!doctype html><html><body><pre id="r">pending</pre><script>
const c = document.createElement('canvas');
const gl = c.getContext('webgl2') || c.getContext('webgl');
let out = 'context: ' + (gl ? 'OK' : 'FAIL');
if (gl) { const e = gl.getExtension('WEBGL_debug_renderer_info');
  if (e) out += ' | ' + gl.getParameter(e.UNMASKED_RENDERER_WEBGL); }
document.getElementById('r').textContent = out;
</script></body></html>""")
for name, flags in [("vulkan", ["--use-gl=angle", "--use-angle=vulkan"]),
                    ("gl-egl", ["--use-gl=angle", "--use-angle=gl-egl"])]:
    p = subprocess.run(
        ["google-chrome", "--headless=new", "--no-sandbox",
         "--disable-dev-shm-usage", "--dump-dom",
         "--virtual-time-budget=8000"] + flags + ["file:///tmp/webgl.html"],
        text=True, capture_output=True, timeout=120)
    m = re.search(r'<pre id="r">(.*?)</pre>', p.stdout or "", re.S)
    print(f"  {name}: {(m.group(1).strip() if m else '(no output)')[:160]}",
          flush=True)
print("SHIPS SETUP DONE", flush=True)
