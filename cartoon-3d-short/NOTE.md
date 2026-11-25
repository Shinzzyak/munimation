# Catatan soal folder ini

Folder ini adalah salinan skill animasi **mromidev/claude-animated-shorts**
(gratis, lisensi MIT, https://github.com/mromidev/claude-animated-shorts):
karakter 2D di dunia 3D, three.js di dalam Remotion, video vertikal 55–70 detik.

Skill ini diinstall 24 Nov 2026 dan dipakai buat dua video di repo ini
(Bridge + ShipsShort "Kapal Lewat Darat"). Yang kami pakai terutama:

- `SKILL.md` — cara kerja skill + aturan gaya.
- `templates/bridge/` — template komposisi contoh (dunia, karakter, efek).
- `templates/audio/` — pustaka synth (dsp/instruments/sfx_gen) yang dipakai
  ulang buat audio mix ShipsShort.
- `references/` — laporan + frame + sheet contoh.

Yang kami tambahkan/ubah di luar folder ini (bukan di dalam skill):

- Fix EffectComposer blank-frame (lihat README repo bagian 5) di
  `remotion/src/videos/bridge/Bridge.tsx` dan
  `remotion/src/videos/ships/Ships.tsx`.
- Komposisi `ShipsShort` baru di `remotion/src/videos/ships/` — bukan bagian
  dari skill asli.
- Properti Kenney GLB yang dirujuk skill (26 file di `public/bridge/kenney/`)
  tidak ada di repo upstream saat kami clone (404) — dunia kami tetap jalan
  karena semuanya prosedural.

Lisensi asli (MIT) ada di `LICENSE`. Kredit penuh ke mromidev.
