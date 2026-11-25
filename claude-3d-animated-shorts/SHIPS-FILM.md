# Film pertama skill 3D — "Kapal Lewat Darat" (rebuild 3D stickman)

Video "Kapal Lewat Darat" (kapal Ottoman ditarik lewat darat ke Tanduk Emas,
April 1453) yang sebelumnya dirender di Remotion (`ships-final-v2.mp4`),
dibangun ulang sebagai film baru di skill 3D thuann-vn (`?ships=1`).
Perintah Avres 25 Nov 2026: "Coba rebuild video tadi bre yang tentang kapal
al fatih". Cerita yang sama, mesin yang baru.

## Yang dipakai ulang (tidak dibuat ulang)

- VO: `~/workspace/ships-short/voice/vo-zubenelgenubi.wav` (86,36 dtk,
  Zubenelgenubi, Google AI Studio). Tidak diregenerasi.
- Caption: `~/workspace/ships-short/captions.json` (62 frasa) + burn-in ASS
  via `burn_captions.py`. Caption dibakar di post, bukan di engine.
- Audio mix: `~/workspace/ships-short/audio/mix.wav` (sudah mastering
  −15,06 LUFS / −1,20 dBTP). Tidak di-master ulang.
- Tidak ada ElevenLabs, tidak ada request AI Studio baru.

## File film

- `engine/ships.js` (955 baris, baru): seluruh film — geografi (bukit, jalan,
  tembok, rantai, perairan), kapal (extrude hull 10,5 m + tiang 9,5 m + layar
  terlipat + rigging), armada 78 kapal (InstancedMesh), kota (13 menara, kubah
  pusat r=13, 4 minaret), rantai 37 mata, obor, lembu, peti analogi lemari,
  cast (Sultan + penasihat + 11 pekerja + 5 penjaga; serban dibuat dari
  primitif karena engine tidak punya topi turban), 12 shot, overlay 2D
  (title card, map card "10 km", callout "1 malam"/"70 kapal", poll card).
- `engine/main.js` (+3 baris): import ships.js; branch `if (Q.has('ships'))`
  setelah blok chase; rail cards + caption dijaga dengan `!Q.has('ships')`;
  `window.DUR = 86.4` untuk ships.
- `engine/render.cjs` (+4 baris): `RENDER_F0`/`RENDER_F1` (frame-range untuk
  chunk) dan `RENDER_GL=gpu` (flag GPU Colab; default tetap SwiftShader).

## Render (Colab T4)

- 5 chunk (0–518, 518–1037, 1037–1555, 1555–2074, 2074–2592), total ±6,5
  menit untuk 2592 frame (±0,16 dtk/frame; speed test 90 frame = 0,31
  dtk/frame termasuk startup). Sesi `ships`, Tesla T4, Chrome 158.
- Biaya: 0,43 CU (76,03 → 75,60). Sesi sudah di-stop, token Colab utuh.
- Final: `~/workspace/colab-render-test/ships-3d.mp4` — 86,4 dtk, 1080×1920,
  h264 + AAC, 66 MB. File MP4 tidak masuk repo ini (`*.mp4` di .gitignore).

## Perbaikan penting — flag GPU Colab

`RENDER_GL=gpu` awal (`--use-angle=gl`) GAGAL membuat WebGL context di Colab
(render-blocking). Yang jalan: `--use-angle=vulkan` (ANGLE NVIDIA Vulkan
1.4.312, Tesla T4). Patch 25 Nov 2026 di `render.cjs` baris 13–16.
Jalur SwiftShader lokal tidak tersentuh.

## QA

- Stills lokal (SwiftShader): 36 still (awal/tengah/akhir tiap shot) — semua
  lolos dibaca visual; rail film lama tetap jalan (`npm run still` OK).
- Final MP4: 21 frame diekstrak, nol blank; junction antar-chunk mulus;
  10 frame dibaca render agent + 6 frame dibaca ulang koordinator (hook f45,
  koma f75, title f240, map f1140, guards f1500, poll f2460) — semua lolos.
  Koma caption bersih ("dipindah lewat darat," tanpa backslash).

## Catatan yang diketahui (bukan blocker)

- Map card (f1140): caption bakar "dari pesisir Bosporus" menimpa label peta
  "BOSPORUS" di kiri bawah — keduanya masih terbaca tapi bertumpuk.
  Perbaikannya: geser label peta atau hilangkan caption itu di shot map.
  Dibiarkan apa adanya; keputusan perbaikan menunggu Avres.
- Stills bukti: `ships-stills/` (title 8 dtk, map 38 dtk, poll 83 dtk).
