# NOTE — cartoon-audio-short (audio masuk → MP4 jadi)

## Sumber

Skill ini datang dari folder Google Drive **`cartoon-short-kit`** yang dikirim Avres
25 November 2026 12:28 WIB sebagai "tambahan buat kita", bersamaan dengan zip
`cartoon-3d-animated-shorts.zip` (duplikat skill 2D — lihat README utama) dan dua
Google Docs. Isi folder diunduh utuh dari Drive ke repo ini: `SKILL.md` (di root
folder Drive), `README.md`, `engine/`, `example/`, `tools/`.

## Apa ini

Skill **`cartoon-audio-short`**: audio masuk, MP4 vertikal jadi. Alurnya:
tawarkan 10 ide → tulis naskah → terima voiceover pengguna → render jadi video
1080×1920, 30 fps, durasi persis sepanjang voiceover. Musik bed dan SFX disintesis
dan duduk di **50% level suara** (−6 dB, gated RMS) — tidak pernah di atas narasi.

Tampilan: karakter **2D bean-head card** (digambar di canvas, outline plum) di dunia
3D yang di-ink dan dicat — three.js di headless Chromium, **TANPA Remotion dan
TANPA GPU**. Ini yang membedakannya dari pipeline Remotion kita: tidak butuh
Colab/Kaggle untuk render, cukup Chromium headless.

Aturan keras skill ini: cerita, karakter, dan shot selalu orisinal (jangan
merekreasi video kreator lain shot-per-shot); tidak ada orang nyata bernama atau
maskot brand sebagai karakter; **tidak ada caption kecuali pengguna minta**;
voice tidak pernah diedit atau di-re-time — gambar yang menyesuaikan suara, dan
setiap reaksi visual mendarat 0–3 frame SEBELUM kata yang bersangkutan; mix selalu
pakai `mix.py`, jangan manual; kirim contact sheet stills sebelum render panjang.

## Contoh jadi: "The Soldier Who Never Left"

`example/soldier/` adalah contoh kerja lengkap: **19,72 detik, 8 shot**.
- `story.js` — shot plan yang di-time ke voice.mp3 (frasa demi frasa dengan
  timestamp detik).
- `audio.py` — tabel cue audio.
- `stills.jpg` — contact sheet stills contoh.

## Isi folder

| Path | Isi |
|---|---|
| `SKILL.md` | Skill lengkap: intake → 10 ide → naskah → timing → render → finish |
| `README.md` | Ringkasan kit (dari Drive) |
| `engine/` | Renderer: world helpers, cards, ink pass, lens blur, grade (`main.js`), tekstur cat (`paint.js`), gambar cast (`roman.js` di atas library Pen dari mromidev/claude-animated-shorts, diambil oleh setup), motion helpers (`motion.js`) |
| `example/soldier/` | Contoh "The Soldier Who Never Left" |
| `tools/` | `setup.sh` (proyek baru), `timing.py` (word timing), `render.mjs` (frame), `sheet.py` (contact sheet), `finish.sh` (encode + QA) |

## Catatan

- `engine/main.js` mengimpor `./lib/three.module.js` dan `./toon.js` — keduanya
  TIDAK ada di folder Drive; diambil oleh `tools/setup.sh` dari
  mromidev/claude-animated-shorts (lihat README kit). Jalankan `setup.sh` dulu
  sebelum render pertama.
- `tools/setup.sh` butuh: node ≥ 22.6 (type stripping), python3 + numpy, ffmpeg,
  git, Playwright Chromium (`npx playwright install chromium` bila belum ada).
- Quick start (dari README kit):
  `bash tools/setup.sh ~/shorts/my-short && cd ~/shorts/my-short && python3 timing.py voice.mp3 script.txt --out work`
- Skill ini BELUM diinstall/diuji di VM ini — baru diarsipkan dari Drive.
  Uji coba pertama (setup + render contoh soldier) masih menunggu perintah Avres.
- Dibangun di atas github.com/mromidev/claude-animated-shorts (MIT): toon.ts,
  look values, dan readability rules.
