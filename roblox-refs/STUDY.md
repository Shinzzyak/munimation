# Studi: 3 referensi Roblox Short (ynbloxtv ×2, zaylento.yt ×1) — pelajaran buat no-word

Dikirim Avres 26 Nov 2026 ~06:01 WIB ("Udah lumayan sih bre, cuma perlu
beberapa tambahan, nih pelajaran buat lu"). Semua 576×1024, 30 fps,
vertikal. Transkrip: `vid1-transcript.json`, `vid2-transcript.json`
(faster-whisper tiny, kasar di slang); vid3 ditranskrip penuh di chat
Avres (frame-by-frame, 0–124 dtk).

## Video 1 — ynbloxtv, 89,5 dtk — "Every huss costs $1"
- "On this block, every huss costs $1.00. And I ain't got a $1.00."
  Kata slang "huss" = $1 tiap diucapkan. Hero nabung 1 dolar sejak
  kelas 3 SD. Ditutup beat cinta: "She left four hours ago."
- Visual kunci: **tag harga melayang di atas kepala** ($22, -$1, $1,
  $14) — uang LITERALLY muncul/hilang. Corner store (awning merah-putih
  + papan harga), lapangan basket SIANG dan MALAM (lokasi sama, waktu
  berubah = alat cerita). Caption kata-per-kata, keyword hijau
  ("YOU SHOULD", "SHE LEFT FOUR" — FOUR hijau).

## Video 2 — ynbloxtv, 104 dtk — "Every time you cap, a cap pops up"
- "On this block, every time you cap, a cap pop up on your head, and I
  never cap once, twin." Bohong = topi fisik menumpuk di kepala.
  Twin-nya menghitung: 17, 18, 19 topi. Setting sekolah, duo "twin",
  joke-joke cepat.
- Visual kunci: **tumpukan topi warna-warni setinggi badan** — aturan
  yang bisa DIHITUNG dan dilihat membesar. Dinamika duo (hero + twin
  yang menghitung/mengomentari).

## Video 3 — zaylento.yt, 128 dtk — Bunker / Subject Zero
- "In this town, everyone lived in a bunker except me. My name is
  Jake." 100 bunker: No. 1 kubah kaca bawah laut, No. 7 mansion mewah
  (kolam + chandelier + makanan tak terbatas), No. 12 (makanan tak
  pernah cukup, asap), No. 66 (100 pintu logam, tak ada yang pernah
  membuka satu pun), No. 100 (pintu vault raksasa).
- Twist: hero masuk Bunker 100 → ruang kontrol ratusan monitor →
  layar "SUBJECT ZERO HAS RETURNED" → lockdown merah → zombie
  menunggu (bukan menyerang) → ilmuwan menggendong bayi → "THE FIRST
  INFECTED" → countdown 10/9/8 → "SUBJECT ZERO HAS BEEN ACTIVATED" →
  "Phase 2 has begun." Hero ADALAH Subject Zero.
- Visual kunci: aerial kota saat sunset, **cutaway potongan melintang**
  (rumah di atas / level bunker di bawah, bernomor), kubah kaca bawah
  laut + ikan, koridor vault gelap panjang, pintu vault bundar raksasa,
  ruang kontrol + ratusan monitor, lampu merah lockdown, teks diegetik
  besar ("BUNKER 100", "LOCKDOWN", countdown).

## Pelajaran (yang no-word belum punya)
1. **Durasi 90–128 dtk, bukan 35–45 dtk.** Ketiganya 2–3× format
   skill. Aturan 35–45 dtk itu default skill, bukan hukum genre.
   Engine kita bisa (beat lebih banyak, render ~3× ≈ 15–20 mnt Colab).
2. **Aturan harus KELIHATAN sebagai benda fisik/diegetik, dan bisa
   dihitung:** tag $ melayang, tumpukan topi 17→19, angka raksasa di
   pintu, countdown. Counter badge v1 kita idenya BENAR — eksekusinya
   yang salah (HUD kecil menyaingi muka, bukan benda dunia).
3. **Misteri + twist identitas + cliffhanger, bukan cuma twist joke:**
   misteri ditanam awal (100 pintu No. 66 tak pernah dibuka, pencarian
   nama tanpa hasil) → payoff "kamu adalah Subject Zero" → "Phase 2
   has begun" (minta part 2). Twist no-word (principal yang mecahin)
   cuma satu beat.
4. **Set besar + bertekstur:** aerial sunset, cutaway, kubah bawah
   laut, koridor vault, ruang monitor. Lokasi engine kita (12 lokasi)
   semuanya set domestik kecil. **Jujur: ini butuh bangun lokasi baru
   di engine (buildings.tsx/props.tsx + TownMap), bukan tweak.**
5. **Cahaya per scene = penceritaan:** sunset oranye, biru bawah laut,
   emas mewah, koridor gelap, merah lockdown. v2 kita baru satu fix
   malam.
6. **Kerumunan:** puluhan zombie (instancing) + dinding monitor.
   Spacing rule ≥4,5 stud bikin crowd susah dalam satu shot — pakai
   baris kedalaman.
7. **Caption keyword berwarna:** kata kunci hijau/kuning di tengah
   caption putih ("SHE LEFT FOUR", "Phase 2"). Murah, berdampak besar.
8. **Lokasi sama, waktu berubah:** lapangan basket siang → malam =
   berlalunya waktu tanpa set baru.

## Yang TIDAK ditiru
- Jangan copy script/karakter/shot mereka, jangan sebut channel di VO
  atau deskripsi (style study saja, seperti Ricks Clips).
- Slang "twin/huss/cap" mereka = voice mereka; cerita kita tetap
  dengan voice kita sendiri.
