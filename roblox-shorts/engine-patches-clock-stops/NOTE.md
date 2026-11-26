# Engine patches — Roblox Short misteri `clock-stops` (26 Nov 2026)

File-file engine yang diubah untuk cerita misteri 90 detik
"In this town, every clock stops when I walk by." (33 beat, 225 kata,
93,7 dtk, 1080×1920). Story di `roblox-shorts/stories/clock-stops.py`.
Video jadi: `roblox-clock-stops.mp4` (v1 no-word tidak ditimpa).
Aturan yang mengikat: `TEARDOWN.md` R1–R17 (di repo ini tidak ada —
teardown hidup di `~/workspace/research/roblox-refs/TEARDOWN.md`).

## 1. `buildings.tsx` + `TownMap.tsx` + `Environments.tsx` + `schema.ts` — menara jam baru
- `ClockTower` baru: badan bata 8×26×8, muka jam bundar (rim r 3,5,
  12 tick, jarum beku 11:58; face `tick` → menit geser 1 tick = 11:59),
  atap piramid + finial emas, pintu berengsel + cahaya hangat, papan log
  "TOWER LOG / EVERY DAY SINCE 1976" (10 baris tanggal + "JUN 14 —
  MISSING" merah). Scene keys baru di schema: `towerFace`/`towerDoor`.
- Face countdown: panel angka kuning raksasa `10`/`9`/`8` + glow;
  face `loading`: bar 10 segmen.
- Jam sekolah + jam dinding kelas dibekukan 11:58; jam toko baru di
  fasad Shop.

## 2. `R6Character.tsx` — `pocket_watch`
- Prop baru: case emas `#FACC15`, 12 tick mark, jarum terpisah
  (dipakai hero + principal). Rima visual: arloji hero 11:58 = menara.

## 3. `audio.py` + `ShortsHUD.tsx` — caption per-speaker [E] R9, DILAKUKAN
- `CAPTION_COLORS` di `audio.py`: `am_adam` → `#FDE047` (kuning, hero),
  `af_bella` → `#4ADE80` (hijau, Maya), `am_michael` → `#7DD3FC`
  (biru muda, shout), `af_heart` → kuning. Warna diambil dari voice
  per-beat (`captionColor` atau default dari voice).
- Koreksi dari klaim awal: "otoritas biru muda" TIDAK ada di naskah —
  tidak ada beat otoritas; `#7DD3FC` hanya default engine generik.

## 4. `RobloxShortComposition.tsx` — senja [E] R12, DILAKUKAN
- Rezim senja: `skyColor` `#F97316`, langit oranye terbaca.
  3 rezim cahaya di video: siang → senja → malam.

## Yang di-SKIP (dicatat)
- **Angka 3D raksasa sebagai sistem baru** — diganti muka jam + panel
  teks diegetik besar untuk countdown.
- **Lighting snap dalam satu shot** — rezim cahaya berganti antar-scene,
  tidak diperlukan.

## Override rule (diotorisasi Avres)
- Durasi 35–45 dtk dan beat 14–16 skill TIDAK berlaku: 93,65 dtk,
  33 beat, 49 shot. Aturan shot 1,0–3,5 dtk dan spacing ≥4,5 stud
  TETAP berlaku dan lolos pipeline ("scenes contiguous, cuts every
  1-3.5 s, no overlapping actors").

## QA (dua putaran)
- QA independen 1: NO-GO (muka jam terpotong; Maya terpotong tepi kiri;
  logbook tertutup caption + tiang; arloji cokelat tanpa tick; detak
  11:58→11:59 tidak terlihat). Ronde perbaikan 10/10 item, stills
  diregenerasi penuh. Re-QA: GO (27/49 still full-res + crop zoom).
- Logbook: opsi (a) — semua tanggal ada KECUALI hari hero lahir
  ("JUN 14 — MISSING"); opsi (b) ditolak (cerita first-person tanpa
  nama kanonik).

## Yang masih jujur kurang
- **Hitungan Maya = jangkar teks "8TH TODAY", bukan hitungan fisik
  ala vid2** — tiap beat hanya 1 jam terlihat di frame. Penyimpangan
  R3/R5 yang didokumentasikan di docstring story. Jangan klaim
  "hitungan = visual" di catatan rilis.
- Bisikan penutup 5 kata / 3,33 dtk = 1,5 kata/dtk, bukan ~1,0 seperti
  target (Kokoro tidak melambat lebih jauh pada speed 0,55 + jeda
  0,5 dtk).
- Kerumunan 11/12 kepala terhitung (baris belakang cuma 2 figur);
  tiang lampu masih menyerempet bahu kanan mom di f02112.
- f01162: tangan kiri Maya margin nol di tepi kiri; f01530: emas
  arloji tidak kebaca sebagai emas di frame malam saja.
- Audio tidak didengarkan oleh siapa pun (hanya ffprobe); hanya 5 + 4
  frame dibaca dari video jadi, bukan scan penuh.
- Detak 1 tick (~6°) subtil — terbaca berdampingan, bukan dalam satu
  frame.
