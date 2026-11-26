# Engine patches — cap-remake (26 Nov 2026)

Remake 1:1 video ynbloxtv "Every time you cap, a cap pops up on your head"
(104 dtk), atas perintah langsung Avres 26 Nov 12:45. R17 teardown
("jangan copy script/karakter/shot") dikesampingkan untuk video ini saja.

## Story
`roblox-shorts/stories/cap-remake.py` — 37 beat, 216 kata, 30 scene,
45 shot, T.END 100,57 dtk. Dialog dari caption per shot di
`roblox-refs/teardown-vid2-shots.md`, dicek silang ke transcript tiny.
Slang dipertahankan ("Dat's", "Ian neva", "Ion know", "unda doors",
"Swiss cheese yo ahh"). Suara: hero/narator `am_adam`, twin `am_michael`,
cewek `af_bella`, guru `am_onyx`, shopkeeper `am_echo`, vendor `am_eric`.
Caption 107 cue, warna per pembicara (kuning ×73 / hijau ×15 / biru ×11 /
pink ×8). Musik MATI TOTAL (`MUSIC = None`). Satu-satunya SFX: boom akhir
di 99,37 + 99,87 dtk. Override: durasi skill 35–45 dtk tidak berlaku;
crane penutup 6,5 dtk (bukan 8,53 ref); shot pendek ref dipanjangkan ke
≥1,0 dtk; wipe → hard cut.

## Yang baru di engine (file-file di folder ini)
- `cap_tower {count 1–19, lean?, tiltTop?}` — menara topi baseball,
  palet 10 warna siklus bottom-to-top, brim golden-angle yaw.
- `cap_dome {actor: warna|[warna...]}` — dome tanpa brim, PERSISTEN
  antar-scene (NPC kena aturan: guru +2, shopkeeper +1 dome oranye,
  vendor +1 dome teal, cewek +1 dome teal).
- `cap_scatter` — 7 topi berserakan (aftermath roboh).
- Pop topi jatuh dari +5,5 stud selama 8 frame (~0,27 dtk).
- Balaclava hitam + ushanka putih baru; stan lemonade baru + lokasi
  `lemonade_stand`.
- `CAPTION_COLORS` + `boom()` di `audio.py`.
- `knocked` TERBUKTI bukan pose rebah (yaw kontinu) — twin aftermath
  pakai `idle` + `rx=-1.5708` (telentang).

## Verifikasi (parent, dari file jadi)
- `roblox-cap-remake.mp4` — 1080×1920, 30 fps, 3018 frame,
  video 100,744 dtk + audio 100,800 dtk, 84.627.544 byte.
- Hitungan topi dihitung sendiri dari frame jadi: **17 ✓ (f1851),
  19 ✓ (f2350)**. f2004 = close-up twin ("Eighteen.") — menara tidak
  masuk frame; 18 terverifikasi QA dari stills, bukan dari frame ini.
- f2510: menara miring berat (roboh terbaca, puncak terpotong tepi atas).
- f2950: crane penutup — hero SATU topi oranye, twin terbaring, topi
  berserakan, papan "TOWN PARK", caption "capped once,".
- Render 4 lane Colab T4: lane 1 (0,71 dtk/frame), lane 2 (1,02),
  lane 3 (0,43), lane 4 sesi mati → dipindah ke lane 2, selesai 678/678.
  0 sesi aktif di akhir.

## Sisa jujur
- Audio tidak didengarkan siapa pun (hanya analisis level).
- f2466 = close-up cewek (bukan momen roboh — roboh di f2510).
- Durasi container 100,74 dtk (frame count eksak 3018).
- Dialog b29 "I keep it a hundred, twin." tidak terverifikasi penuh
  (transkrip "a honey"); b2 "never" diucapkan, caption "NEVER" bukan "NEVA".
- QA notes: ghost disc hitam kecil di jendela pop homework (~8 frame);
  lengan kiri hero menyentuh tepi di 3 medium toko; dasi guru = bola merah;
  topi cewek tanpa bintang; guru suit bukan vest.
