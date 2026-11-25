"""ShipsShort soundtrack — original, synthesized (numpy/scipy), thin bed + few SFX,
Al-Fatih style: the voice carries, the bed stays out of the way.
Voice = vo-zubenelgenubi.wav (gain only). Music = warm pad chords (Dm-Bb-F-C)
+ sparse glock motif, ducked -3 dB under speech (key = words.json).
SFX: night crickets/breeze, flash whoosh, haul creaks + chain groan, chain
clank at the snap, water bed + morning birds at the reveal.
Master: ffmpeg two-pass loudnorm to -15 LUFS / -1.2 dBTP.
Writes mix.wav + stem_voice/music/sfx.wav (48 kHz stereo 24-bit) into audio/.
Run: python3 audio/ships_audio.py  (from ~/workspace/ships-short/)
"""
import json, os, subprocess, sys
import numpy as np
from scipy import signal as sig
from scipy.io import wavfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, "/home/hatch/workspace/custom-skills/local-cartoon-3d-short/templates/audio")
from dsp import SR, ns, st, dbg, place, integrated, true_peak, write_wav, fades
import instruments as I
import sfx_gen as S

DUR = 86.4
N = ns(DUR)
VOICE = os.path.join(ROOT, "voice", "vo-48k.wav")  # ffmpeg-cleaned 48 kHz copy;
# the raw AI Studio WAV has a malformed header (nAvgBytesPerSec 96000 for mono
# 24 kHz) that scipy.io.wavfile refuses; ffmpeg reads it fine.
WORDS = os.path.join(ROOT, "voice", "words.json")

r = np.random.default_rng(1453)

# ---------------------------------------------------------------- voice (gain only)
sr_v, vo = wavfile.read(VOICE)
assert sr_v == 48000, sr_v
vo48 = vo.astype(np.float64) / 32768.0
vo48 = np.pad(vo48[:N], (0, max(0, N - len(vo48))))  # VO is 86.36 s; pad to 86.40
voice = st(vo48)  # stereo, same both channels
# gain so voice stem measures -15.4 LUFS integrated (bridge convention)
vg = dbg(-15.4 - integrated(voice))
voice = voice * vg
print(f"voice gain {20*np.log10(vg):+.2f} dB, integrated {integrated(voice):.1f} LUFS")

# ---------------------------------------------------------------- duck envelope from words.json
words = json.load(open(WORDS))
duck = np.ones(N)
for w in words:
    a, b = ns(max(0, w["s"] - 0.15)), ns(min(DUR, w["e"] + 0.25))
    duck[a:b] = dbg(-3.0)
# smooth 0.12 s ramps
k = int(0.12 * SR)
duck = np.convolve(duck, np.ones(k) / k, mode="same")
duck = np.clip(duck, dbg(-3.0), 1.0)

# ---------------------------------------------------------------- music bed: pad chords + glock motif
# Dm - Bb - F - C, one chord per 10.8 s (8 chords = 86.4 s)
CHORDS = [
    [146.83, 220.00, 293.66],   # Dm
    [116.54, 174.61, 233.08],   # Bb
    [174.61, 220.00, 261.63],   # F
    [130.81, 196.00, 261.63],   # C
    [146.83, 220.00, 293.66],
    [116.54, 174.61, 233.08],
    [174.61, 220.00, 261.63],
    [130.81, 196.00, 261.63],
]
music = np.zeros((2, N))
CHORD_LEN = DUR / 8
for i, freqs in enumerate(CHORDS):
    t0 = i * CHORD_LEN
    ch = I.pad(freqs, CHORD_LEN + 1.5, vel=0.42, r=np.random.default_rng(100 + i),
               att=1.2, rel=1.5)
    n = min(ch.shape[1], N - ns(t0))
    music[:, ns(t0):ns(t0) + n] += ch[:, :n] * 0.5

# glock motif (D minor pentatonic) in word gaps >= 1.2 s
gaps = []
prev_end = 0.0
for w in words:
    if w["s"] - prev_end >= 1.2:
        gaps.append((prev_end, w["s"]))
    prev_end = max(prev_end, w["e"])
NOTES = [587.33, 698.46, 880.00, 1046.50]  # D5 F5 A5 C6
for j, (g0, g1) in enumerate(gaps[:12]):
    f = NOTES[j % len(NOTES)]
    g = I.glock(f, vel=0.32, r=np.random.default_rng(200 + j), dur=1.6)
    t = g0 + 0.15
    n = min(len(g), N - ns(t))
    music[0, ns(t):ns(t) + n] += g[:n] * 0.5
    music[1, ns(t):ns(t) + n] += g[:n] * 0.5

# duck music under speech, then level: music ~-10 LU under voice
music = music * duck[None, :]
mg = dbg((-15.4 - 10.0) - integrated(music))
music = music * mg
print(f"music gain {20*np.log10(mg):+.2f} dB, integrated {integrated(music):.1f} LUFS")

# ---------------------------------------------------------------- SFX
sfx = np.zeros((2, N))

def place_mono(x, t, gain=1.0, pan=0.0):
    place(sfx, st(x) if x.ndim == 1 else x, t, gain=gain)

# night ambience 0-46 s: crickets + breeze (bed)
place_mono(S.crickets(46.0, np.random.default_rng(1), voices=3), 0.0, gain=0.10)
place_mono(S.breeze(46.0, np.random.default_rng(2), level=0.7), 0.0, gain=0.12)
# morning ambience 46-86.4 s: birds + light breeze
place_mono(S.bird_chirps(40.4, np.random.default_rng(3), density=0.4), 46.0, gain=0.14)
place_mono(S.breeze(40.4, np.random.default_rng(4), level=0.5), 46.0, gain=0.08)
# flash whoosh at 6.5 s (FLASH_AT 195)
place_mono(S.whoosh(0.8, np.random.default_rng(5), peak=0.3), 6.5, gain=0.8)
# haul: wood creaks + chain groan, 41.0-45.5 s
for i, t in enumerate([41.0, 42.4, 43.8, 45.0]):
    place_mono(S.creak(1.1, np.random.default_rng(10 + i), rate0=110, rate1=170), t, gain=0.5)
place_mono(S.chain_groan(4.5, np.random.default_rng(20), i0=0.2, i1=0.9), 41.0, gain=0.45)
# chain clank at the snap, 46.0 s
for i, t in enumerate([46.0, 46.15, 46.35]):
    place_mono(S.clink(np.random.default_rng(30 + i), f0=1900.0, dur=0.14), t, gain=0.7)
place_mono(S.rattle(0.6, np.random.default_rng(33), density=30.0), 46.0, gain=0.5)
# water bed at the morning reveal, 46-52 s
place_mono(S.water_bed(6.0, np.random.default_rng(40), close=1.0), 46.0, gain=0.35)
# final glock note over the poll card
g = I.glock(880.00, vel=0.35, r=np.random.default_rng(99), dur=2.0)
place_mono(g, 84.4, gain=0.6)

# SFX level: bring the whole stem to -29 LUFS integrated (bridge convention:
# sfx stem -29.1); individual event gains above are relative only.
sg = dbg(-29.0 - integrated(sfx))
sfx = sfx * sg
print(f"sfx gain {20*np.log10(sg):+.2f} dB, integrated {integrated(sfx):.1f} LUFS, "
      f"peak {20*np.log10(np.max(np.abs(sfx))):.1f} dBFS")

# ---------------------------------------------------------------- stems + pre-master sum
os.makedirs(HERE, exist_ok=True)
write_wav(os.path.join(HERE, "stem_voice.wav"), voice)
write_wav(os.path.join(HERE, "stem_music.wav"), music)
write_wav(os.path.join(HERE, "stem_sfx.wav"), sfx)
pre = voice + music + sfx
write_wav(os.path.join(HERE, "pre_master.wav"), pre)
print(f"pre-master integrated {integrated(pre):.1f} LUFS, true peak {true_peak(pre):.1f} dBTP")

# ---------------------------------------------------------------- two-pass loudnorm to -15 LUFS / -1.2 dBTP
def loudnorm_measure(path):
    out = subprocess.run(
        ["ffmpeg", "-i", path, "-vn", "-af", "loudnorm=print_format=json",
         "-f", "null", "-"], capture_output=True, text=True).stderr
    j = out[out.index("{"):out.rindex("}") + 1]
    return json.loads(j)

m = loudnorm_measure(os.path.join(HERE, "pre_master.wav"))
print("measured:", {k: m[k] for k in ("input_i", "input_tp", "input_lra", "target_offset")})
args = ["ffmpeg", "-y", "-i", os.path.join(HERE, "pre_master.wav"),
        "-vn", "-af",
        f"loudnorm=I=-15:TP=-1.2:LRA=11:measured_I={m['input_i']}:"
        f"measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:"
        f"measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true",
        "-ar", "48000", os.path.join(HERE, "mix.wav")]
subprocess.run(args, check=True, capture_output=True, text=True)
v = loudnorm_measure(os.path.join(HERE, "mix.wav"))
print("final:", {k: v[k] for k in ("input_i", "input_tp", "input_lra")})
print("WROTE", os.path.join(HERE, "mix.wav"))
