# Engine patches — Roblox Short `no-word` v2 (26 Nov 2026)

File-file engine yang diubah untuk v2, di-overlay ke proyek
`roblox-remotion` (lihat `roblox-remotion-study/`). Story tetap di
`roblox-shorts/stories/no-word.py`. Video jadi: `roblox-no-word-v2.mp4`
(42,0 dtk, 1080×1920) — v1 tidak ditimpa.

## 1. `audio.py` — suara narator cowo
- `NARRATOR_VOICE = "am_adam"` (dulu default skill `af_heart`).
  Preferensi Avres mengalahkan default skill; dicatat juga di AGENTS.md
  proyek agar tidak di-revert. Shout di story (`w1`) → `am_michael`.
- Soundtrack diregenerasi penuh: 42,03 dtk / 1261 frame (v1: 43,13 dtk /
  1294 frame) — voice cowo lebih cepat pada speed yang sama.

## 2. `R6Character.tsx` — badge counter hilang dari aktor bertape
- Root cause: `mouth_tape` salah terdaftar sebagai counter, jadi tiap
  aktor bertape otomatis dapat hologram "912,450 WORDS LEFT" di atas
  kepala. Registrasi itu dihapus; mesh lakban X putih di mulut tetap.
- Katalog counter (`counter_high`, `counter_mid`, …) tetap ada di file
  — itu prop reusable buat cerita lain (mis. `word_limit`), bukan bug.
- Bukti: f255 video jadi — badge hilang total, lakban utuh.

## 3. `RobloxShortComposition.tsx` — grade hangat
- ACES filmic tone mapping, exposure 1.12; matahari `#FFFBEB` →
  `#FFDCA8`; ambient/hemi turun + ground hangat; fog haze hangat
  `#EFD3A0`. Engine tidak punya jalur post-processing — ini yang
  termurah. Efek di video jadi subtil: kulit/rambut sedikit lebih
  hangat; warna material (hoodie hijau, loker biru) tetap saturasi.

## 4. `kit.tsx` + `interiors.tsx` — tekstur plaster
- `plasterTex()` baru (blotch + speckle prosedural) dipakai di dinding
  `RoomShell`. Di video jadi hampir tidak terurai di ukuran frame —
  dinding hallway kebaca abu-coklat hangat, bukan biru pucat flat.
- SKIP (dicatat): tekstur karakter (art style Roblox memang flat) dan
  rewrite kota (kota luar sudah bertekstur).

## 5. Night lighting — scene twist benar-benar gelap
- Root cause: `isNight` cuma menaikkan emissive lampu, lampu komposisi
  tetap terang. Fix (di file composition/interiors): fill malam
  dipangkas (ambient 0.55→0.3, directional 1.1→0.55) + 3 pointLight
  hangat `#FFB45E` + strip emissive 2.2 + EXIT glow 1.2.
- Bukti: f1133/f1218 video jadi — plafon gelap + lampu hangat menyala,
  banner "GO TOWN TIGERS!" emas di navy, jas principal nyaris hitam,
  loker biru gelap, wajah + dasi + hammer tetap terbaca.

## Lain-lain v2 (di story, bukan di sini)
- Framing f614: medium 2-aktor dist 20 → **28** (geometri: `wide()`
  fov 58 cuma memberi ~6,24 stud, tetap motong tepi kanan; dist 28 →
  ~7,3 menyusut ke ~7,0). Bukti f595: hero + bully utuh dengan margin.
  Trade-off: aktor lebih kecil di frame (~19% vs ~27% tinggi frame).

## Yang masih jujur kurang
- Warm grade + plaster tidak transformatif — kalau masih terasa "AI
  slop", ronde berikut butuh repaint palet material (rewrite, bukan
  tweak lampu).
- f456 (classroom medium) motong teks board ("RULE #…") — board penuh
  kebaca di wide f393.
- Suara cowo terverifikasi lewat kode + regenerasi + durasi, bukan
  dengan mendengarkan langsung.
