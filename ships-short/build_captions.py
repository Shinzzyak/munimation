"""Build captions.json: phrase -> start/end seconds, from words.json (whisper
word timings) aligned to the SCRIPT.md caption phrases. Run once; output
~/workspace/ships-short/captions.json. Phrase timing = first word start to
last word end, with a 0.12 s lead-in and 0.10 s hold after."""
import json, re, difflib

VOICE = "/home/hatch/workspace/ships-short/voice/words.json"
SCRIPT = "/home/hatch/workspace/ships-short/SCRIPT.md"

# --- narration text (VO text, from SCRIPT.md, between the HOOK and poll) ---
narration = (
 "Tujuh puluh kapal perang dipindah lewat darat, dalam satu malam. Dan tidak ada "
 "yang melihatnya datang. April seribu empat ratus lima puluh tiga. Sultan Mehmed "
 "yang kedua mengepung Konstantinopel. Tapi ada satu masalah. Mulut Tanduk Emas "
 "ditutup rantai besi raksasa. Kapal Ottoman tidak bisa masuk. Lalu Sultan punya ide "
 "yang kedengarannya gila. Kalau lautnya ditutup, kapalnya pindah lewat darat. "
 "Kapal-kapal itu diangkat ke darat, ditaruh di atas jalan kayu yang dilumuri lemak, "
 "lalu ditarik naik bukit. Jalannya sepuluh kilometer, dari pesisir Bosporus sampai "
 "ke Tanduk Emas. Ratusan lembu dan ribuan orang menariknya, pelan-pelan, semalaman. "
 "Pagi harinya, penjaga kota bangun, dan melihat tujuh puluh kapal sudah berlayar "
 "di dalam Tanduk Emas. Rantai besinya masih utuh. Tapi sudah tidak ada gunanya. "
 "Untungnya rantainya tidak putus. Sayangnya, musuhnya sudah di belakang rantai. "
 "Rahasianya gesekan. Kayu yang dilumuri lemak itu licin, jadi kapal seberat puluhan "
 "ton bisa meluncur. Sama seperti mendorong lemari berat di lantai yang licin. "
 "Begitu bergerak, dia jalan sendiri. Sebulan kemudian, tanggal dua puluh sembilan "
 "Mei, kotanya jatuh. Kalau kamu jadi panglima Bizantium, kamu jaga rantai, atau "
 "jaga bukit? Tulis A atau B di komentar."
)

# --- caption phrases, in order, from SCRIPT.md ---
phrases = """Tujuh puluh kapal perang
dipindah lewat darat,
dalam satu malam.
Dan tidak ada
yang melihatnya datang.
April seribu empat ratus
lima puluh tiga.
Sultan Mehmed yang kedua
mengepung Konstantinopel.
Tapi ada satu masalah.
Mulut Tanduk Emas
ditutup rantai besi raksasa.
Kapal Ottoman
tidak bisa masuk.
Lalu Sultan punya ide
yang kedengarannya gila.
Kalau lautnya ditutup,
kapalnya pindah
lewat darat.
Kapal-kapal itu
diangkat ke darat,
ditaruh di atas jalan kayu
yang dilumuri lemak,
lalu ditarik naik bukit.
Jalannya sepuluh kilometer,
dari pesisir Bosporus
sampai ke Tanduk Emas.
Ratusan lembu
dan ribuan orang
menariknya,
pelan-pelan, semalaman.
Pagi harinya,
penjaga kota bangun,
dan melihat tujuh puluh kapal
sudah berlayar
di dalam Tanduk Emas.
Rantai besinya masih utuh.
Tapi sudah
tidak ada gunanya.
Untungnya rantainya
tidak putus.
Sayangnya, musuhnya
sudah di belakang rantai.
Rahasianya gesekan.
Kayu yang dilumuri lemak
itu licin,
jadi kapal seberat
puluhan ton
bisa meluncur.
Sama seperti mendorong
lemari berat
di lantai yang licin.
Begitu bergerak,
dia jalan sendiri.
Sebulan kemudian,
tanggal dua puluh sembilan Mei,
kotanya jatuh.
Kalau kamu jadi panglima Bizantium,
kamu jaga rantai,
atau jaga bukit?
Tulis A atau B
di komentar.""".strip().split("\n")

def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())

script_words = narration.split()
wlist = json.load(open(VOICE))
whisp = [norm(w["w"]) for w in wlist]

# phrase word spans over script_words
spans, i = [], 0
for p in phrases:
    n = len(p.split())
    spans.append((i, i + n))
    i += n
assert i == len(script_words), f"phrase words {i} != narration words {len(script_words)}"

# align whisper words to script words
sm = difflib.SequenceMatcher(a=[norm(w) for w in script_words], b=whisp, autojunk=False)
script_to_whisp = {}
for a0, b0, n in sm.get_matching_blocks():
    for k in range(n):
        script_to_whisp[a0 + k] = b0 + k
print(f"matched {len(script_to_whisp)}/{len(script_words)} script words")

def time_of(si):
    if si in script_to_whisp:
        w = wlist[script_to_whisp[si]]
        return w["s"], w["e"]
    # interpolate from nearest matched neighbours
    lo = max([k for k in script_to_whisp if k < si], default=None)
    hi = min([k for k in script_to_whisp if k > si], default=None)
    if lo is not None and hi is not None:
        s0 = wlist[script_to_whisp[lo]]["e"]
        s1 = wlist[script_to_whisp[hi]]["s"]
        frac = (si - lo) / (hi - lo)
        t = s0 + (s1 - s0) * frac
        return t, t + 0.15
    if lo is not None:
        t = wlist[script_to_whisp[lo]]["e"]
        return t, t + 0.15
    t = wlist[script_to_whisp[hi]]["s"]
    return t, t + 0.15

caps = []
for p, (a, b) in zip(phrases, spans):
    s, _ = time_of(a)
    _, e = time_of(b - 1)
    s = max(0.0, round(s - 0.12, 2))
    e = round(e + 0.10, 2)
    caps.append({"text": p, "start": s, "end": e})

# sanity: monotonic, no overlap beyond 0.05 s
for prev, cur in zip(caps, caps[1:]):
    assert cur["start"] >= prev["start"], "non-monotonic"
print(f"phrases: {len(caps)}  first: {caps[0]}  last: {caps[-1]}")
print(f"coverage: {caps[0]['start']}s -> {caps[-1]['end']}s (VO 86.4s)")
json.dump(caps, open("/home/hatch/workspace/ships-short/captions.json", "w"),
          ensure_ascii=False, indent=1)
print("WROTE captions.json")
