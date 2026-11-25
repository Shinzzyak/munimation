# NOTE — claude-3d-animated-shorts (skill 3D stickman)

## Apa ini

Skill **thuann-vn/claude-3d-animated-shorts** (repo: https://github.com/thuann-vn/claude-3d-animated-shorts),
diinstall 25 November 2026 atas perintah Avres ("Gas, install skill 3D-nya") setelah studi
Ricks Clips / DrawnWhy. Ini fork 3D sejati dari skill 2D mromidev/claude-animated-shorts
(yang sudah ada di repo ini sebagai `cartoon-3d-short/`): karakternya BUKAN billboard 2D,
melainkan model 3D rigged yang dibangun `engine/stickrig.js` di atas rig **Mixamo Xbot**
— bisa di-orbit, di-pose, dan dianimasikan. Gaya visualnya mengikuti channel Ricks Clips:
kepala putih deadpan, tubuh pear, lengan/kaki noodle, set 3D ber-lit (kantor, rumah, rel),
grade sinematik yang lebih gelap, caption kata-per-kata, dan formula cerita
"perbuatan aneh → diejek → bencana → sains + analogi → loop".

Alur kerja sama seperti skill 2D: topik → naskah → VO → shot plan → still → render.

## Lisensi

**MIT** — Copyright (c) 2026 thuann-vn (engine 3D, karakter, set, skill) dan
Copyright (c) mromidev (workflow asli claude-animated-shorts). Lihat `LICENSE`.
Aset pihak ketiga punya lisensi sendiri: Kenney Furniture Kit dan KayKit Furniture Bits
CC0. File yang diambil `scripts/fetch-assets.sh` (Xbot.glb, Horse.glb, font Anton,
Inter) tidak disertakan di repo ini.

## Yang TIDAK disertakan di sini (dan kenapa)

- `node_modules/` — hasil `npm install`, regenerable.
- `engine/assets/` (59 MB) — Xbot.glb 2,8 MB, Horse.glb, 28 prop Poly Haven, prop
  Kenney/KayKit. Regenerable lewat `bash scripts/fetch-assets.sh` + `npm install`.
- `upstream-2d/` — salinan skill 2D mromidev; SUDAH ada di repo ini sebagai
  `cartoon-3d-short/`, jadi tidak diduplikasi.
- `engine/out/still-4.jpg` — still ketiga dari smoke test; yang disimpan sebagai bukti
  hanya `still-1.jpg` dan `still-7.jpg` di `smoke-test/`.

## Patch VM (render.cjs) — PATCH 2026-11-25

Dua patch lokal di `engine/render.cjs` (baris 11–12), keduanya karena VM ini jalan
sebagai root dan tanpa GPU:

1. **`--no-sandbox`** — Chrome headless menolak jalan sebagai root tanpa flag ini
   ("Running as root without --no-sandbox is not supported").
2. **`--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`**
   menggantikan flag bawaan `--use-angle=metal` — metal itu macOS saja, di Linux
   WebGL context gagal dibuat ("Could not create a WebGL context",
   "BindToCurrentSequence failed"). Dengan SwiftShader, konteks WebGL terbentuk.
   Catatan: patch pertama sempat bikin SyntaxError karena komentar `//` nyangkut di
   dalam object literal — diperbaiki dengan menaruh komentar di baris sendiri.

Untuk render di Colab T4 (GPU beneran), flag SwiftShader ini harus diganti lagi
dengan flag GPU (mis. `--use-angle=vulkan` + libnvidia-gl-580, seperti pipeline
Remotion di `colab-render/`).

## Gotcha install: fetch-assets.sh

`bash scripts/fetch-assets.sh` GAGAL di run pertama: folder `assets/rigs`,
`assets/horse`, dan `engine/film` tidak ada di clone, dan `curl -o` gagal menulis
(`curl: (23) Failure writing output to destination`). Solusi: `mkdir -p` ketiga
folder itu dulu, baru jalankan script. Setelah itu: "assets ok" + "poly haven ok"
(Xbot.glb 2,8 MB, Horse.glb, Anton + Inter-Black, 28 prop Poly Haven → aset 59 MB).

## Smoke test — TERBUKTI JALAN (25 Nov 2026 ~12:36 WIB)

`npm run still` (render frame 1, 4, 7 pada 540×960) selesai dalam ~27 detik,
menghasilkan 3 still. Dua di antaranya dibaca visual dan disimpan di `smoke-test/`:

- `still-1.jpg` — close-up karakter big-head stickman (kepala putih, topi merah,
  wajah deadpan, outline ink) di atas rel, dengan caption contoh "áp".
- `still-7.jpg` — wide shot: rel kereta menjauh, handcar beroda besar, 6 karakter
  stickman bertopi di sekitarnya, bukit hijau + pohon + tiang telegraf + menara air,
  caption contoh "ngay".

Karakter, dunia rel, dan handcar semuanya kebaca — bukan blank. Engine TERBUKTI
JALAN lokal di SwiftShader. Render video penuh tetap lewat Colab T4 / Kaggle
(SwiftShader lokal lambat per frame, sama seperti kasus bridge).

## Caveat: TTS

TTS default skill ini adalah **ElevenLabs (berbayar, butuh ELEVENLABS_API_KEY)** —
lihat `tools/tts.mjs`. Untuk Avres, VO diganti ke **Google AI Studio TTS gratis**
(suara Zubenelgenubi) seperti video ShipsShort: model gemini-3.8-flash-tts, tanpa
API key/billing, batas gratis 10 request/hari — satu naskah video digenerate dalam
satu request, dan tahun/angka harus ditulis ejaannya ("seribu empat ratus lima puluh
tiga") karena AI Studio membacanya secara harfiah.
