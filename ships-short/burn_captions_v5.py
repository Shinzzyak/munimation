"""Burn karaoke word-by-word captions v5 (R11) onto a video with ffmpeg + libass.

Pos Ronda style (MOVEMENT-STUDY.md aturan 18 + R11): SATU KATA per kartu,
HURUF KAPITAL SEMUA, tebal, MERAH + outline putih tebal, bawah-tengah
(zona 78-86% tinggi frame), pop-in scale-up tiap kata baru.

Input:
  - voice/words.json : 191 kata ber-timestamp (faster-whisper tiny).
    Teks whispernya JELEK (mis. "lewaterat,", "patratu", "7", "-tai,",
    "bagi tuber") -- jadi teks kartu diambil dari naskah kanonik
    captions.json, dan timing diambil dari words.json.
  - captions.json    : 62 frasa naskah kanonik + span waktu frasa.

Alignment kata -> waktu (global, satu pass):
  Teks whisper (words.json) JELEK -- salah eja, gabung, pecah, ada angka
  ("lewaterat,", "patratu", "7", "-tai,", "bagi tuber") -- jadi teks kartu
  diambil dari naskah kanonik captions.json, dan timing diambil dari
  words.json lewat difflib.SequenceMatcher pada aliran karakter:
  aliran token (teks whisper mentah, huruf kecil, tanpa spasi) disejajarkan
  dengan aliran naskah (kata naskah, huruf kecil, tanpa tanda baca).
  Ratio 0,942. Tiap kata naskah dipetakan ke rentang karakter token yang
  bersesuaian; awal kata = waktu karakter pertama, akhir kata = waktu
  karakter terakhir (proporsional di dalam span token). Ini menangani
  seragam: token gabungan ("lewaterat," -> LEWAT+DARAT, "patratu" ->
  EMPAT+RATUS, "kedarat." -> KE+DARAT), fragmen ber-hyphen ("Ratu"+"-san"
  -> RATUSAN, "jalan"+"-kayu" -> JALAN + KAYU, "panglima"+"-bisantium,"
  -> PANGLIMA + BIZANTIUM), dan salah-dengar huruf ("Tuju" -> TUJUH, "7"
  -> SERIBU, "bagi"+"tuber" -> BEGITU, "milan"+"May," -> SEMBILAN+MEI).
  Karena penjajaran global, tidak ada drift antar frasa; kesalahan
  batas kata yang tersisa ~0,05-0,13 dtk (12 tumpang tindih kecil
  dari interpolasi region replace) -- dirapikan pass overlap di bawah.
  Tanda baca dibuang dari tampilan (karaoke = kata bersih); "A"/"B"
  dari token "-a"/"b," tetap jadi kartu sendiri.
  Pass perapian, berurutan:
  a. overlap: akhir kartu sebelumnya dipangkas ke awal kartu berikut;
  b. jeda rapat (< 0,10 dtk) -> akhir kartu diperpanjang sampai awal kata
     berikut (karaoke kontinu, tanpa kedip). Jeda >= 0,10 dtk dibiarkan
     kosong -- itu jeda napas/hening yang nyata;
  c. kata sangat pendek (< 0,15 dtk) DIPERTAHANKAN sebagai kartu sendiri
     (pop 2-4 frame, sesuai gaya karaoke cepat Pos Ronda ~0,39 dtk/kartu
     median 0,34). Durasi minimum 0,12 dtk ditegakkan: akhir diperpanjang
     kalau ada celah, kalau tidak, awal kata berikut digeser maju satu
     langkah (maks 0,12 dtk, tanpa cascade). Satu-satunya kasus durasi 0
     adalah "SULTAN" (token whisper 10.16-10.16) -- diperbaiki dengan cara
     ini, bukan dihapus.

Style ASS (PlayRes 1080x1920):
  Font DejaVu Sans Bold 96, PrimaryColour merah murni &H000000FF,
  OutlineColour putih &H00FFFFFF, Outline 8, Shadow 2 (BackColour hitam
  semi-transparan &H80000000), Alignment 2 (bawah-tengah), MarginV 300
  (pita teks ~1505-1620 px = 78,4-84,4% tinggi frame).
  Pop-in: {\\fscx85\\fscy85\\t(0,110,\\fscx100\\fscy100)} di tiap kartu --
  kata muncul 85% lalu membesar ke 100% dalam 110 ms. Untuk kartu yang
  lebih pendek dari 110 ms transformasi terpotong di akhir kartu, tidak
  error.

Usage:
  python3 burn_captions_v5.py <input.mp4> <output.mp4>
      Burn penuh. Menulis captions_v5.ass + captions_v5.json di samping
      script, lalu ffmpeg -vf ass=... (libx264, crf 18, audio copy).
  python3 burn_captions_v5.py <input.mp4> <output.mp4> --clip-start 20 --clip-dur 15
      Klip uji: ASS digeser -20 dtk (hanya kartu yang bersinggungan dengan
      jendela klip), ffmpeg -ss 20 -t 15 (input seek, timeline output
      mulai dari 0 sehingga ASS geser cocok).
  python3 burn_captions_v5.py --verify
      Hanya bangun kartu + verifikasi, tanpa ffmpeg.

JANGAN overwrite burn_captions.py (caption frasa v1-v4). File ini baru.
Tidak menyentuh audio atau engine. Tidak commit/push.
"""
import difflib
import json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
WORDS = os.path.join(ROOT, "voice", "words.json")
CAPS = os.path.join(ROOT, "captions.json")

MIN_DUR = 0.12      # durasi kartu minimum (dtk)
GAP_FILL = 0.10     # jeda < ini detik -> akhir kartu diperpanjang ke kata berikut

ASS_HEAD = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: CapV5,DejaVu Sans,96,&H000000FF,&H000000FF,&H00FFFFFF,&H80000000,-1,0,0,0,100,100,0,0,1,8,2,2,80,80,300,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

POPIN = r"{\fscx85\fscy85\t(0,110,\fscx100\fscy100)}"


def norm(s):
    return re.sub(r"[^a-z]", "", s.lower())


def display(w):
    """Teks tampil: huruf kapital, tanda baca akhir (,.?!) dibuang, hyphen
    DALAM kata dipertahankan ("Kapal-kapal" -> KAPAL-KAPAL)."""
    return re.sub(r"[,.?!]", "", w).upper()


def fmt(t):
    h = int(t // 3600)
    m = int((t % 3600) // 60)
    s = t % 60
    return f"{h}:{m:02d}:{s:05.2f}"


def build_cards():
    toks = json.load(open(WORDS))
    phrases = json.load(open(CAPS))
    words = [w for p in phrases for w in p["text"].split(" ") if w]

    # Aliran karakter token: (char, t_awal_char, t_akhir_char).
    # Teks token mentah dipertahankan (angka/hyphen ikut menempati waktu).
    tstream = []
    for t in toks:
        txt = t["w"].lower()
        n = len(txt)
        if n == 0:
            continue
        span = t["e"] - t["s"]
        for k, ch in enumerate(txt):
            tstream.append((ch, t["s"] + span * k / n,
                            t["s"] + span * (k + 1) / n))
    sstream = "".join(norm(w) for w in words)
    tstr = "".join(c for c, _, _ in tstream)

    # Sejajarkan aliran naskah -> aliran token (SequenceMatcher, autojunk off).
    sm = difflib.SequenceMatcher(None, sstream, tstr, autojunk=False)
    pos = [None] * len(sstream)  # idx char naskah -> posisi (float) di tstream
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            for k in range(i2 - i1):
                pos[i1 + k] = float(j1 + k)
        elif tag == "replace":  # peta linear di dalam region replace
            n1, n2 = i2 - i1, j2 - j1
            for k in range(n1):
                pos[i1 + k] = j1 + (k + 0.5) * n2 / n1
        elif tag == "delete":  # kata tanpa padanan token: tempel di batas
            for k in range(i2 - i1):
                pos[i1 + k] = float(j1)
        # insert: karakter token tanpa padanan naskah -> dilewati

    def time_at(p):
        if p is None:
            return None
        i = int(p)
        f = p - i
        if i >= len(tstream):
            return tstream[-1][2]
        a = tstream[i]
        return a[1] + (a[2] - a[1]) * f

    cards = []
    idx = 0
    for w in words:
        n = len(norm(w))
        ps = [pos[i] for i in range(idx, idx + n) if pos[i] is not None]
        idx += n
        if not ps:
            continue
        s = time_at(min(ps))
        e = time_at(max(ps) + 1)
        cards.append({"text": display(w),
                      "start": round(s, 3), "end": round(e, 3)})
    cards.sort(key=lambda c: c["start"])

    # a. Pangkas overlap (interpolasi region replace): akhir kartu lama =
    #    awal kartu berikut.
    for i in range(1, len(cards)):
        if cards[i]["start"] < cards[i - 1]["end"]:
            cards[i - 1]["end"] = cards[i]["start"]

    # b. Isi jeda rapat (< GAP_FILL) -> akhir kartu = awal kata berikut.
    for i in range(len(cards) - 1):
        gap = cards[i + 1]["start"] - cards[i]["end"]
        if 0 < gap < GAP_FILL:
            cards[i]["end"] = cards[i + 1]["start"]

    # c. Durasi minimum 0,12 dtk (satu langkah, tanpa cascade).
    for i, c in enumerate(cards):
        if c["end"] - c["start"] < MIN_DUR:
            want_end = round(c["start"] + MIN_DUR, 3)
            if i + 1 < len(cards):
                nxt = cards[i + 1]
                if want_end <= nxt["start"]:
                    c["end"] = want_end
                elif nxt["end"] - want_end >= 0.08:
                    c["end"] = want_end
                    nxt["start"] = want_end
                else:
                    c["end"] = nxt["start"]
            else:
                c["end"] = want_end
    return cards, []


def verify(cards):
    errs, notes = [], []
    if not cards:
        errs.append("tidak ada kartu")
        return errs, notes
    durs = [c["end"] - c["start"] for c in cards]
    if cards[0]["start"] > 0.6:
        notes.append(f"kartu pertama mulai {cards[0]['start']:.2f} dtk (>0,6)")
    if cards[-1]["end"] < 86.0:
        notes.append(f"kartu terakhir berakhir {cards[-1]['end']:.2f} dtk (<86,0)")
    for i, c in enumerate(cards):
        if not c["text"]:
            errs.append(f"kartu kosong index {i}")
        if c["end"] <= c["start"]:
            errs.append(f"durasi <= 0: {c}")
        if i and c["start"] < cards[i - 1]["end"] - 1e-9:
            errs.append(f"overlap: {cards[i-1]} vs {c}")
    short = [c for c in cards if c["end"] - c["start"] < 0.15]
    notes.append(f"kartu: {len(cards)}, durasi min {min(durs):.2f} / "
                 f"median {sorted(durs)[len(durs)//2]:.2f} / maks {max(durs):.2f} dtk, "
                 f"<0,15 dtk: {len(short)} kartu")
    notes.append(f"coverage: {cards[0]['start']:.2f} - {cards[-1]['end']:.2f} dtk")
    return errs, notes


def build_ass(cards, path, shift=0.0, clip_end=None):
    lines = [ASS_HEAD]
    kept = 0
    for c in cards:
        s, e = c["start"] - shift, c["end"] - shift
        if clip_end is not None and (e <= 0 or s >= clip_end):
            continue
        s = max(s, 0.0)
        if clip_end is not None:
            e = min(e, clip_end)
        if e <= s:
            e = s + 0.01
        lines.append(f"Dialogue: 0,{fmt(s)},{fmt(e)},CapV5,,0,0,0,,{POPIN}{c['text']}")
        kept += 1
    open(path, "w").write("\n".join(lines))
    return kept


def main():
    args = sys.argv[1:]
    if args and args[0] == "--verify":
        cards, empty = build_cards()
        errs, notes = verify(cards)
        print(f"cards: {len(cards)}  frasa tanpa token: {empty}")
        for n in notes:
            print(" ", n)
        if errs:
            print("ERROR:")
            for e in errs:
                print("  ", e)
            sys.exit(1)
        print("VERIFY OK")
        return

    if len(args) < 2:
        print(__doc__)
        sys.exit(2)
    src, out = args[0], args[1]
    clip_start, clip_dur = 0.0, None
    i = 2
    while i < len(args):
        if args[i] == "--clip-start":
            clip_start = float(args[i + 1]); i += 2
        elif args[i] == "--clip-dur":
            clip_dur = float(args[i + 1]); i += 2
        else:
            print("arg tak dikenal:", args[i]); sys.exit(2)

    cards, empty = build_cards()
    errs, notes = verify(cards)
    for n in notes:
        print(" ", n)
    if errs:
        print("ERROR:")
        for e in errs:
            print("  ", e)
        sys.exit(1)
    json.dump(cards, open(os.path.join(ROOT, "captions_v5.json"), "w"),
              indent=1, ensure_ascii=False)
    ass = os.path.join(ROOT, "captions_v5.ass")
    kept = build_ass(cards, ass, shift=clip_start, clip_end=clip_dur)
    print(f"cards: {len(cards)} (ASS: {kept} kartu, frasa tanpa token: {empty}) -> {ass}")

    cmd = ["ffmpeg", "-y", "-v", "error"]
    if clip_start:
        cmd += ["-ss", str(clip_start)]
    if clip_dur:
        cmd += ["-t", str(clip_dur)]
    cmd += ["-i", src, "-vf", f"ass={ass}",
            "-c:v", "libx264", "-preset", "medium", "-crf", "18",
            "-c:a", "copy", out]
    subprocess.run(cmd, check=True)
    print("WROTE", out)


if __name__ == "__main__":
    main()
