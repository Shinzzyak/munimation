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

## Upgrade v2 — biar nyaingin Remotion v2 (25 Nov 2026, perintah Avres)

Perbandingan 10 frame berdampingan (v2 kiri, 3D kanan, di
`~/workspace/colab-render-test/compare/`) menunjukkan v2 menang 7–8 dari 10:
cahaya v2 lebih hangat + haze + DOF + bloom, tekstur air/bata/kayu/teras lebih
kaya, sementara 3D gelap/datar dengan bidang warna polos. Yang 3D menang cuma
f1900 (close-up pekerja) dan f1225 (pose pekerja). Avres: "Upgrade film 3D-nya
biar nyaingin v2". Upgrade ini (`engine/ships.js` 955 → 1143 baris, file lain
tidak berubah) menutup gap itu. Tiga ronde build + QA independen (stills lokal,
dibaca visual semua), verdict akhir: **GO**.

Perbaikan, per frame:

- **Malam terlalu gelap (f75, f1225):** `shipsNight` exp 0.75→0.95, sun
  0.9→1.6, hemi 0.7→1.2, lift naik, fill kamera 0.6→1.3, + 3 PointLight hangat
  di obor. Hull jadi cokelat hangat, pekerja dan lembu terbaca.
- **Banding (f230):** dua penyebab terpisah — (1) acne shadow-map di bawah
  matahari golden yang landai (el 3°): gold `normalBias` 0.05→0.2; (2) warna
  vertex tanah (`0.6·sin(x·0.3)·sin(z·0.27)`) menggambar garis bergelombang,
  satu per baris mesh 5 m — suku itu dihapus. Air + tanah + tembok dapat
  `gradientMap` halus 64 langkah (dulu ramp toon 4 langkah).
- **Air (f465, f230):** tekstur canvas 46 → 170 goresan (crest/glint/foam),
  dasar teal lebih dalam + lapisan glint kedua. Rantai: besi lebih gelap,
  rim 0.8, pitch 0.42, 430 mata, saling mengunci.
- **Akar masalah "dead half" (f465):** `CHAIN_Z` 62 → 70. `groundY(62)` masih
  +4,7 m — rantai terkubur di bukit dan semua kamera chain-CU menembak dari
  BAWAH tanah (yang kelihatan "lapangan pucat" itu langit lewat lereng yang
  backface-culled). Di z=70 tanah memotong y=0: rantai mengapung di garis air
  yang benar. Kamera chain-CU dinaikkan di atas bukit.
- **Map (f1140):** diukur ulang dari piksel biru frame v2 (strip x116–259
  y334–1750, teluk x259–964 y784–952) — koordinat lama ~230–270 px terlalu
  rendah. BOSPORUS dipindah 1730→1670, bersih dari zona caption bakar
  (~1750+). Tumpang tindih hilang di grafik peta; clearance akhir terhadap
  caption bakar baru bisa dicek di video render (bukan dari still).
- **Aerial (f300):** kamera [70,95,−160]/44 → [46,62,−108]/40, kapal ~1,6×
  lebih besar, bendera diperbesar/diterangkan; teras halus + variasi warna.
  Look-target digeser kiri supaya kapal di tengah (~52% lebar frame).
- **Tembok + penjaga (f1500):** tembok dipisah jadi mesh bertekstur bata
  sendiri (UV merged BoxGeometry 0–1/face bikin tekstur melar); snap-CU
  `shadowR` 12→20; penjaga digeser ke tengah celah merlon
  [8.25, 11.25, 14.25, 17.25, 20.25]; mekanisme `sunOv` baru (matahari az 140,
  el 45) menyinari muka tembok dari depan — tembok jadi tan merata, bata
  terbaca, 5 penjaga utuh.
- **Consequence (f2300):** gold hemi 0.35→0.7, fill hangat 0.85, fog
  150/900→90/600, kamera [45,26,−40]→[38,30,0] — air + armada kelihatan di
  sepertiga bawah, kota tidak lagi siluet hitam.
- **Bukit datar (f75, f230, f300, f2300 — blocker, 2 ronde):** warna tanah
  diterangkan, teras 0.09→0.11 dengan phase-wobble (kontur, bukan garis cat),
  mottling hash ±7%, scatter naik (semak 46→130, batu 22→48, +220 rumpun,
  + set koridor terang). Masih tersisa wedge halus ~25% di f75 — akar
  masalahnya resolusi mesh: wedge itu cuma ~11 m lebar, tepat di koridor jalan
  yang dilarang scatter, dan mesh tanah 10 m di x. Perbaikan akhir: tekstur
  noise canvas 512×512 di tanah + UV skala dunia (1 tile 40 m, 3 skala tanda
  bulat lembut, seamless) — wedge kini berbutir dan terbaca sebagai medan.
- **Tidak diregresi:** f1900 (close-up pekerja, kemenangan 3D) dan f2500
  (poll) tidak berubah.

Verdict akhir per frame lawan v2: 3D menang 3 (f300, f1225, f1900), seri 3
(f75, f230, f2300), v2 menang 2 tipis (f465, f1140). f1500/f2500 tidak
dibandingkan ulang di ronde akhir, hanya dicek utuh. Rencana render: 4 lane,
±648 frame/lane — Colab1 0–647, Colab2 648–1295, Kaggle Shinzuy 1296–1943,
Kaggle ayamhuz 1944–2592 (masing-masing ukur kecepatan dulu dengan segmen
pendek; lane yang gagal diambil alih lane lain). Output akhir:
`~/workspace/colab-render-test/ships-3d-v2.mp4`.

## Catatan yang diketahui (bukan blocker)

- Map card (f1140): grafik peta sudah diperbaiki (lihat Upgrade v2 di atas).
  Clearance akhir caption bakar "dari pesisir Bosporus" terhadap label
  "BOSPORUS" baru bisa dibuktikan dari video render, bukan dari still.
- f2300: sisa strip bayangan tipis di tepi kanan terjauh — cek ulang di grade
  GPU Colab (perilaku shadow-map bisa bergeser dari SwiftShader).
- Stills bukti v2: `ships-stills/` (hook-2.5s, aerial-10s, guards-50s,
  consequence-76s; yang lama: title 8 dtk, map 38 dtk, poll 83 dtk).
