# Teardown per-frame — VIDEO 3: Bunker / Subject Zero (zaylento.yt)

- **File:** `~/workspace/user/media_library/video/4b/4b7807bb023949376a4c7aad90c2c875813d189a474cdfc18f38e00fb07a2f8e.mp4`
- **Durasi terukur:** 128,2 dtk (ffprobe 128,23 dtk), 576×1024, 30 fps, H.264 + AAC 128 kbps
- **Cerita:** 0,0–124,3 dtk; **end card TikTok 124,3–128,2 dtk** (logo + search bar `@zaylento.yt`, hitam, sunyi)
- **Transkrip:** `vid3-transcript.json` (faster-whisper tiny, 310 kata) + `vid3.wav` (16 kHz mono)
- **Frame bukti:** `teardown-frames/vid3/` (48 frame kunci + 7 frame detail full-res)
- **Tanggal teardown:** 26 Nov 2026

## 1. Verifikasi identitas — TERKONFIRMASI

Klaim STUDY.md tentang video ini **benar secara substansi**. Bukti frame + transkrip:

- Creator: watermark TikTok `@zaylento.yt` terlihat di semua frame (kanan bawah); end card menampilkan search bar `@zaylento.yt`.
- Pembuka: Jake, green jacket + syal merah, "In this town, everyone lived in a bunker except me. My name is Jake."
- 100 bunker: No. 1 kubah kaca bawah laut, No. 7 mansion mewah (kolam + chandelier + bioskop + makanan tak terbatas), No. 12, No. 66 (100 pintu logam, tak ada yang pernah membuka satu pun — tepatnya "the last one"), No. 100 (pintu vault raksasa).
- Twist: hero masuk Bunker 100 → ruang kontrol ratusan monitor → layar "SUBJECT ZERO HAS RETURNED" → lockdown merah → zombie menunggu (bukan menyerang) → ilmuwan menggendong bayi → "THE FIRST INFECTED" → countdown 10/9/8 → "SUBJECT ZERO HAS BEEN ACTIVATED" → "Phase 2 has begun". Hero ADALAH Subject Zero.
- **Satu koreksi isi (lihat §9):** Bunker 12 BUKAN "makanan tak pernah cukup, asap" — VO + frame membuktikan aturannya "never make a sound" (papan "SILE…" di dinding).

## 2. Angka kunci

- **Shot cerita: 63** (+ 1 end card = 64 segmen). Total cerita 124,3 dtk.
- **Durasi shot:** rata-rata **1,97 dtk**, median **1,7 dtk**, min 0,6 dtk (shot 13, dinding "66"), max 6,6 dtk (shot 33, daftar nama). Distribusi: ≤1,0 dtk: 15 shot; 1–2 dtk: 26; 2–3 dtk: 15; >3 dtk: 7.
- **Transisi (63 batas antar 64 segmen):** 61 hard cut biasa + **1 wipe** (dinding "66" terangkat ke atas, ~27,5 dtk) + 2 hard cut dengan masking putih (pintu terbuka → ruang kontrol, ~62,1 dtk, cahaya putih menutupi cut; rekaman lama, ~88,4 dtk, 1 frame putih) + 1 hard cut ke end card hitam. **Tidak ada** fade-to-black, dissolve, atau whip pan. Satu flash putih DI DALAM shot (layar SEARCH NAME, ~75,5 dtk, 1 frame).
- **Kamera dominan:** berimbang — **~30 shot kamera bergerak vs ~33 statis**. Gerakan yang ada hampir semuanya lambat: dolly/push-in pelan, pan, tilt-up, follow dari belakang. Tidak ada handheld/shaky, tidak ada zoom cepat kecuali satu push-in cepat di shot 24 (~50,7–50,9 dtk, medium → ECU dalam ~0,2 dtk, terverifikasi kontinu di 30 fps, bukan cut).
- **Deteksi scene ffmpeg `gt(scene,0.3)` memberi 122 kandidat — sebagian besar false positive** (gerakan kamera cepat, flash, perubahan cahaya). Yang terverifikasi: 48 kandidat dicek lewat strip 5-frame (±0,4 dtk) + 20 kandidat susulan + 1 koreksi (cut 107,6 dtk yang detector lewatkan). Tiga kandidat terbukti BUKAN cut: 1,2 dtk (crane turun kontinu), 28,6 dtk (karakter despawn, kamera tetap dolly), 17,2 dtk (tilt dalam dome, cut sebenarnya di ~17,65 dtk).
- **VO:** 310 kata, 0,0–123,9 dtk, pacing **2,1–2,8 kata/dtk** per blok 10 dtk, nyaris konstan; melambat ke 1,0 kata/dtk di 120–124 dtk (bisikan penutup). Tidak ada jeda antar-kata >0,8 dtk — VO mengalir terus.
- **Caption:** SATU kata per layar, kuning terang RGB ~(226,248,25), bold + outline hitam, posisi tengah-bawah pada **~68–72% tinggi frame**, berubah tiap kata (bukan tiap shot — satu kata bisa menyeberangi cut). **Semua kata kuning; tidak ada keyword hijau/merah dan tidak ada teks putih** (beda dari vid1 yang punya keyword hijau). Kata "2" di "Phase 2" juga kuning.

## 3. Metode

- Frame 2 fps diekstrak penuh (256 frame) untuk pemindaian + luminansi; lalu **setiap batas shot diverifikasi visual** dengan strip 5 frame (t−0,4 / −0,2 / 0 / +0,2 / +0,4 dtk) dibaca sebagai gambar. Tiga titik ambigu dicek di 30 fps (28,4–29,0 dtk; 57,9–58,4 dtk; 62,9–63,2 dtk; 50,6–51,0 dtk).
- Luminansi = rata-rata grayscale per frame 2 fps (PIL/numpy). Angka INDIKATIF: frame 2 fps ternyata ber-offset **+~0,2 dtk** (f_0001 paling cocok dengan 0,2 dtk, f_0036 dengan 17,7 dtk) — batas shot di bawah memakai waktu strip (seek akurat), bukan label sheet.
- Audio: RMS per detik dari wav 16 kHz + split band (Butterworth 20–250 Hz vs 300–3400 Hz, scipy) untuk memisahkan bed musik dari VO.
- Transkrip tiny kasar — semua kutipan di bawah dicek silang dengan caption di frame; kata "LED" di transkrip mentah = "led" ("They led me…").

## 4. Shot list lengkap

Lum = luminansi rata-rata shot (0–255, indikatif; n kecil = lemah). Framing: W = wide, M = medium, CU = close-up, ECU = extreme CU.

| # | Waktu | Dur | Kamera | Framing | Isi |
|---|-------|-----|--------|---------|-----|
| 1 | 0,0–2,9 | 2,9 | crane turun + maju | W aerial → street | Jalan kota saat sunset oranye, kosong, puing + mobil terbengkalai + kolom asap. Lum 113,7 |
| 2 | 2,9–3,9 | 1,0 | follow pelan | M belakang | Jake dari belakang, jalan menjauh di tengah jalan. Jaket hijau + tali ransel. Lum 106,5 |
| 3 | 3,9–5,5 | 1,6 | statis | M depan | Jake hadap kamera, jalan mendekat, wajah netral. Rambut cokelat, syal merah, jaket hijau, kemeja putih. Lum 106,3 |
| 4 | 5,5–8,4 | 2,9 | statis, low | W | Kerumunan ~8–10 orang jalan ke arah kamera (sipil + zombie campur). "Ten years ago…" Lum 111,7 |
| 5 | 8,4–9,5 | 1,1 | statis, high-angle | M | Hatch bundar di trotoar (strip hazard kuning-hitam); karakter tan/beige menuruni hatch. Lum 93,7 |
| 6 | 9,5–13,4 | 3,9 | pan/dolly turun | W cutaway | Potongan melintang: rumah di permukaan → poros bawah tanah → ruang-ruang bunker. Label "12" (ruang merah) dan "66" (ruang abu-abu) terbaca. Lum 90,4 |
| 7 | 13,4–16,1 | 2,7 | push-in pelan | W | Bunker 1: kubah kaca di dasar laut, gerombolan ikan di atas, koral pink. Angka diegetik "1" putih besar di kanan bawah kubah. Lum 126,3 (biru terang) |
| 8 | 16,1–17,65 | 1,55 | tilt-up | M interior | Dalam kubah, kamera menengadah ke rangka kaca + ikan di atas; satu penghuni (hijau/pink) di pojok kanan bawah. Lum 175,0 (paling terang) |
| 9 | 17,65–20,7 | 3,05 | pan + push pelan | W | Bunker 7: aula mansion — kolam, chandelier, kolom emas, palem. Angka diegetik "7" kuning besar di dinding jauh. Pria baju merah di kolam. Lum 171,6 |
| 10 | 20,7–21,6 | 0,9 | statis | M | Bioskop: pria baju merah duduk di kursi maroon, layar putih di depan. Lum 150,2 |
| 11 | 21,6–23,4 | 1,8 | pan di atas meja | M | Meja perjamuan penuh makanan (kue, hidangan); "7" kuning di dinding. Lum 166,9 |
| 12 | 23,4–26,9 | 3,5 | dolly/pan pelan | M | Bunker 12: ruang merah gelap, ranjang susun, rak buku merah/biru, skylight bilah (bayangan garis). Papan merah "SILE…" (terpotong frame; diduga SILENCE — hanya "SILE" yang terbaca). Tanpa orang. Lum 69,0 |
| 13 | 26,9–27,5 | 0,6 | statis | W | Dinding putih polos, angka 3D "66" putih raksasa di tengah. Shot terpendek. Lum 114,0 (n=1) |
| 14 | 27,5–33,5 | 6,0 | dolly maju | W koridor | Koridor panjang pintu logam (gagang bundar kuning, strip hazard, pelat nomor). Figur baju kuning + celana biru jalan menjauh, lengan diam; **figur itu HILANG antar dua frame 30 fps di ~28,6 dtk (despawn/pop, bukan cut — kamera terus dolly)**. Ujung koridor: pintu vault merah menyala + roda. Lum 48,9 |
| 15 | 33,5–35,3 | 1,8 | statis | M | Pria jas biru + dasi duduk di meja, kursi emas, tersenyum. "Some people lived like kings". Lum 130,7 |
| 16 | 35,3–36,2 | 0,9 | statis | CU | Jake malam hari, wajah sedih (mulut turun, mata menunduk). Lum 126,4 (n=1) |
| 17 | 36,2–37,2 | 1,0 | statis | W | Pom bensin malam (merah/putih/biru, jendela menyala); Jake dari belakang berjalan ke arahnya. Lum 49,4 |
| 18 | 37,2–38,7 | 1,5 | statis, top-down | M | Jake tidur di kasur/kardus di dalam, mata tertutup; rak di belakang. Lum 139,7 |
| 19 | 38,7–40,6 | 1,9 | statis, low angle | M | Jake meringkuk di balik konter; kepala zombie (rambut cokelat runcing, kulit hijau) mengintip dari atas konter. Lum 89,4 |
| 20 | 40,6–43,2 | 2,6 | statis | M | Jake mengintip dari balik kotak/konter; lengan zombie + sosok zombie kecil terlihat lewat jendela. Interior lebih terang. Lum 114,4 |
| 21 | 43,2–48,4 | 5,2 | track mundur ikuti Jake | W | Jalan siang: zombie mengejar warga; Jake jalan di tengah mereka ke arah kamera; zombie menerjang melewatinya tanpa menyerang. Lum 106,5 |
| 22 | 48,4–49,5 | 1,1 | statis | W | Zombie berhenti di tengah jalan, berdiri diam menghadap kamera; Jake kecil di kejauhan. Lum 94,5 |
| 23 | 49,5–50,2 | 0,7 | statis | CU | Zombie A: kulit hijau, baju cokelat, lengan terentang, tanpa topi. Lum 69,5 (n=1) |
| 24 | 50,2–51,3 | 1,1 | statis → push-in cepat | CU → ECU | Zombie B (wajah hijau, topi hitam, pipi berjahit, baju biru, di bawah awning) → cut ke Jake medium → **push-in cepat ~0,2 dtk ke ECU** (terverifikasi kontinu 30 fps; diff antar-frame naik bertahap 11→14, bukan lonjakan cut). Jake: mata lebar, mulut "o", plester di pipi kiri, tetes keringat. Lum 98,5 |
| 25 | 51,3–53,5 | 2,2 | follow dari belakang | M belakang | Jalan MALAM (lompat waktu: sunset → biru gelap dalam satu cut): kamera di belakang Jake yang mengikuti rombongan zombie. Lum 91,9 |
| 26 | 53,5–55,5 | 2,0 | follow dari belakang | M belakang | Kamera di belakang rombongan zombie (Jake keluar frame), menuju rumah sakit (jendela papan X). Lum 85,6 |
| 27 | 55,5–58,1 | 2,6 | dolly-in | W koridor | Koridor menuju pintu vault bundar; papan "BUNKER 100" putih di atas pintu + strip hazard; siluet zombie di depan. Lum 60,6 |
| 28 | 58,1–59,5 | 1,4 | push-in pelan | ECU pintu | "BUNKER 100" + strip hazard + pintu baja ber-baut. Cut-in terverifikasi 30 fps (bukan crash zoom: tidak ada frame perantara). Lum 98,2 |
| 29 | 59,5–60,5 | 1,0 | statis | ECU | Roda vault emas 3-jari; tangan Jake masuk frame, menyentuh roda; roda berputar. Lum 71,5 |
| 30 | 60,5–62,1 | 1,6 | statis | W | Pintu mengayun terbuka, cahaya putih menyilaukan membanjir keluar; Jake siluet di tengah, masuk. Lum 129,5 |
| 31 | 62,1–64,0 | 1,9 | push-in pelan | W | Ruang kontrol: layar raksasa kosong di depan, dinding monitor, meja bundar; Jake dari belakang; biru gelap. Lum 48,4 |
| 32 | 64,0–66,1 | 2,1 | pan kanan | CU dinding | Dinding monitor close-up, pan melewati pilar hitam; layar-layar menampilkan feed bunker (kubah, jalan, ruangan). Lum 65,8 |
| 33 | 66,1–72,7 | 6,6 | tilt-up | M → CU layar | Jake di meja dari belakang → kamera menengadah ke layar raksasa; **daftar nama putih all-caps menggulir ke atas**: AVERY COLE, MILO BRANDT, JUNE OKAFOR, PEARL VANCE, OTIS REYES, NORA LIND, FELIX HART, IVY MORENO, SILAS KANE, RUBY ASH, LEON PRICE… — nama Jake TIDAK ada. Lum 43,8. Shot terpanjang. |
| 34 | 72,7–73,6 | 0,9 | statis | CU | Jake: senyum tipis mulut tertutup, mata melirik kanan. Lum 141,8 |
| 35 | 73,6–75,8 | 2,2 | statis | CU layar | Layar biru: "SEARCH NAME" kecil di atas, "JAKE" besar ber-spasi. **Flash putih 1 frame di ~75,5 dtk di dalam shot** (glitch layar). Tidak ada teks "not found" — VO yang bilang "nothing". Lum 82,2 |
| 36 | 75,8–77,9 | 2,1 | statis | W | Layar raksasa berubah merah: "SUBJECT ZERO HAS RETURNED" (teks oranye-merah); ruangan bermandikan merah. Lum 72,8 |
| 37 | 77,9–80,2 | 2,3 | orbit/push pelan | M | Layar yang sama dari sudut meja bundar; cahaya merah. Lum 58,7 |
| 38 | 80,2–82,1 | 1,9 | statis | W | Dinding monitor SEMUA merah, teks putih "LOCKDOWN" di banyak layar. Lum 77,4 |
| 39 | 82,1–83,9 | 1,8 | statis | M belakang → profil | Jake berbalik: belakang kepala → profil; ruangan merah. Satu-satunya putaran badan Jake yang terlihat gerakannya. Lum 49,5 |
| 40 | 83,9–88,4 | 4,5 | push-in pelan | W | Kerumunan zombie di ruang kontrol: **~35–45 kepala terlihat dalam frame**, 3–4 baris kedalaman, desain bervariasi (topi, warna rambut/baju, noda darah); semua berdiri diam menghadap Jake/layar; cahaya merah; layar biru pucat di ujung. Lum 43,5 |
| 41 | 88,4–90,4 | 2,0 | statis | M | Flash putih → rekaman lama DI LAYAR ruang kontrol (letterbox, ruangan merah di atas/bawah): ilmuwan jas putih menggendong bayi. Lum 53,5 |
| 42 | 90,4–92,9 | 2,5 | statis | M | Rekaman full-frame: ilmuwan (kacamata, rambut hitam, jas putih) gendong bayi berselimut; latar lab (meja, vial warna). Cahaya terang datar. Lum 160,4 |
| 43 | 92,9–93,7 | 0,8 | statis | CU | Ilmuwan + bayi: wajah bayi terlihat (mata tertutup, cokelat muda, selimut putih/abu). Lum 95,3 (n=1) |
| 44 | 93,7–94,6 | 0,9 | statis | ECU | Wajah bayi ECU: rambut cokelat-kemerahan, mata tertutup menunduk, **syal merah di bawah** — rima visual dengan Jake. Lum 147,8 |
| 45 | 94,6–96,4 | 1,8 | push pelan | CU | Wajah ilmuwan: sedih (kacamata, mulut turun). Lum 114,4 |
| 46 | 96,4–98,0 | 1,6 | statis | M | Rekaman di layar lagi: ilmuwan medium + teks diegetik di bawah: "THE FIRST INFECTED" (putih all-caps, 2 baris, di bilah merah gelap). Lum 83,0 |
| 47 | 98,0–99,5 | 1,5 | statis | ECU | Jake syok: mata lingkaran lebar, mulut bundar terbuka; wajah BEKU, ditahan. Lum 163,1 |
| 48 | 99,5–102,4 | 2,9 | descend pelan | W aerial | Jalan kota dari atas saat senja; mobil terbengkalai, puing. Lum 97,8 |
| 49 | 102,4–104,1 | 1,7 | pan | CU dinding | Dinding monitor merah close-up. Frame pertama (102,5 dtk) ada kubus warna melayang di tepi kiri — kemungkinan elemen wipe, tidak terpecahkan. Lum 60,4 |
| 50 | 104,1–105,4 | 1,3 | statis | M | Jake di ruangan merah, sedih/tegar, monitor di belakang. Lum 28,5 (gelap) |
| 51 | 105,4–107,6 | 2,2 | push melalui barisan | W | Kerumunan membungkuk, eye-level: kepala-kepala menunduk ~30–45°, barisan ke dalam. Lum ~36,7 |
| 52 | 107,6–108,4 | 0,8 | statis | W dari atas | Lubang/ruang melingkar penuh kepala membungkuk dalam cincin konsentris — **>100 kepala** (estimasi; tidak bisa dihitung pasti). Lum ~37 (n=1) |
| 53 | 108,4–109,9 | 1,5 | statis, low-angle | M | Jake dari bawah (hero shot), menatap ke bawah ke kerumunan. Lum 24,4 (paling gelap) |
| 54 | 109,9–112,1 | 2,2 | push pelan | W | Ruangan merah lebar; punggung zombie di foreground, Jake di meja. Lum 29,1 |
| 55 | 112,1–114,5 | 2,4 | push-in pelan | CU layar | Layar: "SUBJECT ZERO HAS BEEN ACTIVATED" (putih di merah gelap); teks membesar sepanjang shot. Lum 38,5 |
| 56 | 114,5–115,9 | 1,4 | statis | W | Layar kosong merah gelap di atas kerumunan; **loading bar putih kecil mulai terisi** kiri→kanan; "10" kecil muncul kanan bawah di akhir. Lum 44,2 |
| 57 | 115,9–116,6 | 0,7 | push-in (angka membesar) | Fullscreen | Angka raksasa "10" putih pucat memenuhi frame. Lum 54,7 (n=1) |
| 58 | 116,6–117,4 | 0,8 | pull-back | M | Layar dinding kecil "9" berpendar di dinding abu-biru; kamera menjauh. Lum 91,2 |
| 59 | 117,4–118,4 | 1,0 | statis | M | Layar dinding "8"; **dinding kini bermandikan merah** (cahaya ruangan berubah biru-abu → merah seiring countdown). Lum 91,2 |
| 60 | 118,4–120,0 | 1,6 | descend pelan | W aerial | Jalan kota dari atas, MALAM. Lum 110,2 |
| 61 | 120,0–121,0 | 1,0 | statis | M | Pintu vault lain (palang X + roda menyala putih) — pintu bunker kota mulai terbuka. Lum 44,0 |
| 62 | 121,0–122,7 | 1,7 | push-in pelan | W | Ruangan merah + kerumunan zombie menghadap layar biru. Lum 38,6 |
| 63 | 122,7–124,3 | 1,6 | statis → push pelan | CU | Jake: mata setengah terpejam, mulut garis datar; ditahan sampai cut. Caption "Phase / 2 / has / begun". Lum 63,8 |
| 64 | 124,3–128,2 | 3,9 | statis | — | **End card TikTok**: hitam, logo TikTok + search bar "@zaylento.yt". Audio: sunyi total dari 126 dtk. |

## 5. Prop aturan — angka bunker (rekap)

| Angka | Cara tampil | Ukuran / durasi di layar |
|-------|-------------|--------------------------|
| "1" | Diegetik 3D putih di dasar kubah kaca (shot 7), terlihat sepanjang shot | Besar (~10% tinggi frame), 2,7 dtk |
| "7" | Diegetik 3D kuning di dinding jauh aula mansion (shot 9) + di dinding ruang makan (shot 11) | Besar, ~5 dtk total |
| "12" | Caption kuning "12" (shot 12) + label kecil "12" di ruang cutaway (shot 6) | Caption ~1 kata; label cutaway kecil |
| "66" | Diegetik 3D putih raksasa di dinding putih (shot 13) + caption kuning "66" (shot 14) | Memenuhi ~40% lebar frame, 0,6 dtk (dinding) |
| "100" | Diegetik: papan "BUNKER 100" + strip hazard di atas pintu (shot 27–30) + caption kuning "100" | Teks papan besar, ~6 dtk total |
| "10 / 9 / 8" | Diegetik di layar: "10" fullscreen raksasa (shot 57), "9" + "8" di layar dinding kecil (shot 58–59) | "10": fullscreen 0,7 dtk; "9"/"8": ~1/4 tinggi frame, 0,8–1,0 dtk tiap angka |
| "SUBJECT ZERO HAS RETURNED" | Diegetik di layar raksasa (shot 36–37), teks oranye-merah | ~2 baris, memenuhi lebar layar, 4,4 dtk |
| "LOCKDOWN" | Diegetik di banyak layar dinding merah (shot 38) | Putih, berulang di grid |
| "SUBJECT ZERO HAS BEEN ACTIVATED" | Diegetik di layar raksasa (shot 55), putih di merah gelap | 3 baris, 2,4 dtk |
| "THE FIRST INFECTED" | Diegetik di bawah rekaman (shot 46), putih all-caps 2 baris | 1,6 dtk |
| "SEARCH NAME / JAKE" | Diegetik di layar biru (shot 35) | "JAKE" besar ber-spasi, 2,2 dtk |
| Loading bar | Diegetik di layar merah gelap (shot 56), bar putih mengisi kiri→kanan | Kecil (~1/3 lebar layar), 1,4 dtk |
| "SILE…" | Diegetik papan merah di Bunker 12 (shot 12) | Terpotong frame — hanya "SILE" terbaca |

Pola: **angka tidak pernah jadi HUD** — selalu benda/layar di dalam dunia. Countdown hanya sampai 8, tidak pernah mencapai 0 — ketegangan dipotong oleh dibukanya pintu-pintu bunker (shot 60–61). VO dan angka sinkron rapat: "10" diucapkan 115,8 dtk saat layar "10" muncul 115,9 dtk; "9" di 116,58 dtk vs layar 116,6 dtk; "8" di 117,4 dtk vs layar 117,4 dtk.

## 6. Struktur misteri — penanaman & payoff

| Beat | Waktu | Cara tanam |
|------|-------|------------|
| Premis aneh | 0–5,5 dtk | "Everyone lived in a bunker except me" — hero satu-satunya di luar |
| Ketidakadilan | 13,4–23,4 dtk | Bunker 1/7 mewah vs Bunker 12 (aturan diam) — dunia tidak adil |
| Misteri No. 66 | 26,9–33,5 dtk | Dinding "66" 0,6 dtk + koridor 6 dtk + "nobody could open the last one" — pintu terakhir tak pernah dibuka; **tidak ada payoff langsung**: pintu 66 tidak pernah dibuka di video. Misteri ini dibiarkan menggantung (umpan part 2) |
| Anomali | 40,6–51,3 dtk | Zombie tidak menyerang Jake; hanya menatap. Dua CU zombie + ECU Jake syok |
| Pencarian | 51,3–55,5 dtk | Jake mengikuti zombie ke rumah sakit terbengkalai → Bunker 100 |
| Pintu yang merespons | 59,5–62,1 dtk | Pintu 100 terbuka saat disentuh — hanya untuk Jake |
| Nama yang tidak ada | 66,1–75,8 dtk | Daftar nama menggulir 6,6 dtk (shot terpanjang) → "SEARCH NAME / JAKE" → tidak ada hasil. Payoff ditunda: bukan "not found" di layar, melainkan layar BERUBAH |
| Twist identitas (visual + VO) | 75,8–99,5 dtk | Layar merah "SUBJECT ZERO HAS RETURNED" → lockdown → zombie menunggu → rekaman ilmuwan + bayi → ECU wajah bayi (rambut + syal merah = Jake) → "THE FIRST INFECTED" → ECU Jake syok. **Twist disampaikan dua jalur**: VO ("That baby was me") DAN visual (wajah bayi = wajah Jake, syal merah yang sama) |
| Pembalikan makna | 99,5–105,4 dtk | Aerial senja + "bunkers weren't built to protect people from zombies… they were built to protect everyone from me" |
| Penundukan | 105,4–109,9 dtk | Zombie membungkuk (eye-level → dari atas, >100 kepala) + low-angle hero Jake |
| Cliffhanger | 112,1–124,3 dtk | "ACTIVATED" → loading bar → countdown 10/9/8 (berhenti di 8) → pintu-pintu kota terbuka → bisikan "Phase 2 has begun" + CU Jake ditahan 1,6 dtk → cut hitam ke end card. **Tidak ada resolusi sama sekali** — countdown tak selesai, pintu baru mulai terbuka |

Struktur 3 babak kasar: setup bunker (0–33,5 dtk, 14 shot) → anomali + perjalanan (33,5–62,1 dtk, 16 shot) → ruang kontrol + twist + cliffhanger (62,1–124,3 dtk, 33 shot). Babak ketiga = setengah video.

## 7. Gerakan karakter — pose-to-pose, nyaris tanpa walk cycle

- **Dominan pose-to-pose:** wajah dan tubuh karakter berubah lewat pergantian pose antar shot, bukan animasi kontinu. Ekspresi Jake = 5 pose beku: netral (shot 3), sedih (shot 16), syok mata lebar + mulut "o" (shot 24, 47), senyum tipis (shot 34), datar/setengah terpejam (shot 63). Tiap pose ditahan 0,9–1,6 dtk tanpa kedip yang terlihat di 2 fps.
- **Satu-satunya gerakan tubuh kontinu yang terlihat:** Jake berbalik di shot 39 (belakang kepala → profil dalam 1,8 dtk) dan tangan menyentuh roda vault di shot 29.
- **Zombie:** lengan terentang ke depan saat mengejar (shot 21); selebihnya BERDIRI DIAM — menunggu (shot 22, 40), membungkuk (shot 51–52). Tidak ada langkah yang terbaca: figur-figur bergerak dengan **glide** (meluncur tanpa ayunan kaki yang terlihat) di semua shot follow/chase pada sampling 2 fps.
- **Figur koridor (shot 14):** baju kuning + celana biru, lengan diam di sisi badan, jalan menjauh — **bukan Jake** (tanpa jaket hijau/syal merah/rambut cokelat); identitas tidak disebut VO. Despawn di ~28,6 dtk (lihat §4 shot 14).
- **Kerumunan di-staging dalam baris kedalaman**, bukan grid datar: shot 40 (~35–45 kepala, 3–4 baris) dan shot 52 (cincin konsentris dari atas, >100 kepala). Variasi desain zombie: topi, warna rambut (merah/cokelat), warna baju (biru/merah/oranye/abu), noda darah di baju (shot 51–52 close).

## 8. Audio (diukur, bukan ditebak)

- **VO:** 310 kata, 0,0–123,9 dtk. Pacing per blok 10 dtk: 2,6 / 2,8 / 2,5 / 2,6 / 2,4 / 2,4 / 2,7 / 2,1 / 2,5 / 2,5 / 2,8 / 2,1 / 1,0 kata/dtk. Praktis datar; satu-satunya pelambatan nyata di penutup (bisikan "Phase 2 has begun", 122,56–123,92 dtk).
- **Musik/bed:** energi band rendah 20–250 Hz **hadir di semua detik 0–124** (RMS band 0,010–0,086, tipikal 0,04–0,07) — bed tidak pernah mati. Bed **menurun (ducking) di momen kunci**: 75–76 dtk (0,020; layar merah muncul), 80–81 dtk (0,014–0,018; LOCKDOWN), 96–97 dtk (0,021 → 0,010; "THE FIRST INFECTED"), 112–113 dtk (0,018 → 0,010; "ACTIVATED"), 122–123 dtk (0,025 → 0,019; bisikan penutup). Total RMS keseluruhan 0,065–0,153/dtk, tanpa segmen sunyi sebelum 125 dtk.
- **SFX/transien:** satu-satunya lonjakan besar: **124 dtk, RMS total 0,359 (≈3× baseline) dengan band rendah 0,325 (≈10× baseline)** — dentuman frekuensi rendah tepat di cut ke end card. Setelah itu 125 dtk = 0,008 (ekor), **126–128 dtk = sunyi digital 0,000**.
- **Tidak ada SFX yang bisa diisolasi** dari campuran VO + bed (tidak ada segmen musik-only atau SFX-only untuk diukur); whoosh/impact pada flash putih dan pintu terbuka tidak terpisah dari bed pada analisis ini.

## 9. Cahaya per scene (luminansi rata-rata per shot + deskripsi warna)

- **Sunset oranye (shot 1–6):** lum ~90–114; langit oranye, jalan abu-abu, bayangan panjang.
- **Bawah laut biru (shot 7–8):** lum 126–175; biru terang dominan, paling terang di video (interior kubah 175).
- **Mansion emas (shot 9–11):** lum 150–172; putih + emas + chandelier kuning hangat.
- **Bunker 12 merah gelap (shot 12):** lum 69; merah-oranye dari lampu langit-langit + biru dingin lewat bilah skylight.
- **Koridor gelap (shot 14, 27):** lum 49–61; abu-abu baja + lampu langit-langit putih + ujung merah.
- **Malam biru (shot 16–17, 25–26):** lum 49–92; biru gelap, jendela kuning menyala.
- **Interior terang (shot 18, 20):** lum 114–140; putih/abu netral.
- **Ruang kontrol biru gelap (shot 31–33):** lum 44–66; biru gelap + layar-layar kecil warna-warni.
- **Lockdown merah (shot 36–40, 49–55, 61–62):** lum 24–77; merah dominan pekat — shot-shot tergelap video (low-angle Jake 24,4; Jake medium merah 28,5).
- **Rekaman lama (shot 42–45):** lum 95–160; putih/abu terang datar (lab) — kontras terang di tengah blok merah.
- **Aerial senja/malam (shot 48, 60):** lum 98–110; abu-biru kota + jalan gelap.
- **Countdown (shot 56–59):** lum 55–91; merah gelap → dinding berubah biru-abu (shot 58) → merah (shot 59) seiring angka turun.
- Pola: **tiga puncak terang** (kubah 175, mansion ~172, rekaman 160) **dan satu lembah panjang** (ruang kontrol merah 24–44, shot 50–55) — cahaya = penanda babak.

## 10. Koreksi atas STUDY.md

1. **Bunker 12 — KOREKSI ISI.** STUDY.md: "No. 12 (makanan tak pernah cukup, asap)". Yang benar (VO + frame): **"Bunker number 12 had one rule, never make a sound"**; visual: ruang merah gelap + papan "SILE…" + rak buku + ranjang susun. Tidak ada asap, tidak ada soal makanan.
2. **"100 pintu tak pernah dibuka" — PRESISI.** VO tepatnya: "one hundred metal doors, but nobody could open **the last one**" — bukan "tak ada yang pernah membuka satu pun" (STUDY.md menulis "tak ada yang pernah membuka satu pun" di satu tempat dan "the last one" tidak disebut). Nuansa beda: 99 pintu bisa dibuka, 1 tidak.
3. **"Pencarian nama tanpa hasil" — PRESISI.** Layar tidak menampilkan "not found" / "no result": layar menampilkan query "JAKE" lalu **berubah sendiri** menjadi "SUBJECT ZERO HAS RETURNED". "Nothing" hanya ada di VO.
4. **"Zombie menunggu (bukan menyerang)" — BENAR, plus detail:** zombie juga **membungkuk** (shot 51–52, >100 kepala) — STUDY.md tidak menyebut adegan bow ini.
5. **"Countdown 10/9/8" — BENAR, plus:** countdown **berhenti di 8** (tidak lanjut ke 0), dan ada **loading bar** sebelumnya (shot 56) — dua elemen diegetik, bukan satu.
6. **Caption keyword berwarna — KOREKSI.** STUDY.md pelajaran 7 menggeneralisasi "kata kunci hijau/kuning di tengah caption putih" dari vid1/vid2 ke ketiganya. Di vid3: **tidak ada teks putih, tidak ada keyword hijau** — semua caption kuning solid satu kata. Yang benar-benar "berwarna" di vid3 adalah teks DIEGETIK (merah "SUBJECT ZERO…", putih "THE FIRST INFECTED"), bukan caption.
7. **"Koridor vault gelap panjang" — BENAR, plus:** koridornya berisi figur baju kuning yang **despawn di tengah shot** (~28,6 dtk) — cacat/artefak yang luput dari studi awal.
8. **"Cutaway potongan melintang" — BENAR, plus:** cutaway itu satu shot pan-turun 3,9 dtk (shot 6), bukan beberapa cut; label "12" dan "66" sudah terlihat di sana — angka-angka itu **ditanam dua kali** (cutaway + shot masing-masing).
9. **"Ruang kontrol + ratusan monitor" — BENAR, plus:** ada **daftar nama menggulir 6,6 dtk** (shot terpanjang video) — elemen misteri utama yang tidak disebut STUDY.md.
10. **Durasi 128 dtk — BENAR** (128,23 dtk terukur; cerita 124,3 dtk + end card 3,9 dtk).

## 11. Batas kejujuran (apa yang tidak bisa dipastikan)

- **Kecepatan kamera:** hanya estimasi kualitatif ("pelan"/"cepat") dari frame 2 fps — tidak ada angka m/dtk atau derajat/dtk.
- **Blink <0,5 dtk:** tidak bisa dipastikan; sampling 2 fps + strip 0,2 dtk tidak menangkap kedip/mikro-ekspresi di bawah ~0,2 dtk. Klaim "wajah beku" = tidak ada perubahan antar frame 0,5 dtk, bukan bukti tidak ada kedip sama sekali.
- **Luminansi indikatif:** rata-rata grayscale per frame 2 fps; dipengaruhi caption kuning + watermark; frame 2 fps ber-offset +~0,2 dtk; n=1 pada shot 13/16/23/52/56 — angka shot itu lemah.
- **Transkrip tiny kasar:** word timing ±~0,1–0,3 dtk; "LED" mentah = "led"; angka "10, 9, 8" terdeteksi tapi tanda baca/angka lain bisa meleset — semua kutipan sudah dicek ke caption frame, tapi jangan kutip transkrip mentah verbatim tanpa cek itu.
- **Hitung zombie:** ~35–45 kepala (shot 40) dihitung manual dari satu frame; ">100" (shot 52) estimasi visual dari cincin konsentris — bukan hitungan pasti.
- **Despawn koridor (~28,6 dtk):** terverifikasi antar dua frame 30 fps (ada → tidak ada, kamera tetap bergerak) — penyebabnya (despawn vs jalan ke area gelap) tidak bisa dipastikan dari frame.
- **Kubus warna di 102,5 dtk:** satu frame dengan kubus kuning/biru melayang di tepi kiri — kemungkinan elemen wipe, tidak terpecahkan.
- **Frame hitam ~63 dtk:** satu sampel 2 fps gelap (lum 26,7) **TIDAK terkonfirmasi** di 30 fps (9 frame 62,9–63,2 dtk normal semua) — hampir pasti artefak ekstraksi fps=2, bukan isi video.
- **Push-in shot 24 (~50,8 dtk):** diklasifikasi kontinu (diff antar-frame naik bertahap, tanpa lonjakan) — cut terselubung tidak bisa dikesampingkan 100%.
- **SFX individual:** tidak bisa diisolasi dari campuran VO + bed; hanya dentuman akhir 124 dtk yang terukur jelas.
- **Identitas figur koridor:** baju kuning + celana biru, bukan Jake — tapi apakah itu warga bunker 66 atau sekadar figuran, tidak dinyatakan VO/gambar.
- **Batas shot ±0,2 dtk:** semua waktu batas dari strip 0,2 dtk; cut bisa bergeser ±0,2 dtk dari angka di tabel.
