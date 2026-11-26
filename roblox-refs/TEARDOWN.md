# TEARDOWN — 3 video referensi Roblox (per-frame, terverifikasi visual)

Perintah Avres 26 Nov 2026 ~06:22 WIB: "Lu bongkar dulu tiap frame mereka
bre, baru teliti lalu bikin." Fase ini HANYA teardown. Tidak ada build,
tidak ada perubahan engine, tidak ada render, tidak ada commit/push.

## Video
1. **ynbloxtv, 89,52 dtk** — "Every huss costs $1" — `teardown-vid1-shots.md` (363 baris), 20 frame bukti.
2. **ynbloxtv, 104,02 dtk** — "Every time you cap, a cap pops up on your head" — `teardown-vid2-shots.md` (161 baris), 18 frame bukti.
3. **zaylento.yt, 128,23 dtk** — Bunker / Subject Zero — `teardown-vid3-shots.md` (203 baris), 55 frame bukti, `vid3-transcript.json` (310 kata, faster-whisper tiny).

Metode (sama untuk ketiganya): frame 2 fps + strip 10/30 fps di tiap
kandidat transisi; deteksi scene ffmpeg `gt(scene,0.3)` hanya sebagai
daftar kandidat — SEMUA transisi diverifikasi visual. Pelajaran dari
movement study: angka diff saja menyesatkan (vid1: 9 dari 40 kandidat
adalah false positive; vid3: 122 kandidat, sebagian besar false positive;
vid2: 1 kandidat palsu + 1 wipe yang detector TIDAK tangkap).

## Bagian 1 — Ringkasan per video

### Vid1 — "Every huss costs $1" (89,5 dtk)
- **30 shot** (29 konten + 1 end card TikTok). Konten 85,43 dtk. Rata-rata **2,95 dtk**, median 2,56, min 0,34 (two-shot "hush"), maks 7,50 (lemonade stand).
- Kamera dominan: **statis + dolly-in cepat (punch-in)** sebagai penekanan tiap beat. Nol fade/dissolve — semua transisi hard cut, kecuali whip-pan down pembuka (~1,03 dtk) dan dolly-out (keduanya gerakan kontinu, bukan cut). Satu-satunya crane: penutup 79,27–85,43 dtk (medium → aerial).
- 3 lokasi saja; lapangan basket dipakai ~60 dari 89 dtk, siang → sunset → malam.
- 3 temuan terbesar:
  1. **Counter $ BUKAN simulasi** — laju berubah seenaknya: ~10–12/dtk saat tampil CU, ~200+/dtk di luar layar, ~4.400/dtk saat drain montage ($9.999 → $0 dalam ~2,5 dtk). "-$1" merah tetap berkedip simbolik sementara angka jatuh ratusan per frame. Counter = gag, bukan akuntansi.
  2. **Caption = karaoke per-speaker, satu kata berwarna pada satu waktu.** Hero kuning, twin hijau, cewek pink, lemonade pink, shopkeeper oranye, guru biru muda. Kata yang sudah lewat kembali putih.
  3. **Show dulu, explain kemudian.** Transfer $10.000 divisualkan 64,2 dtk; VO penjelas "Ten bands…" baru 69,4 dtk. Perubahan waktu (siang → sunset → malam) terjadi DALAM satu shot via lighting snap (~76,0 dtk), bukan cut.
- Audio: **tidak ada music bed, tidak ada SFX teridentifikasi** (kecuali burst akhir 85,25–86,25 dtk, puncak -5,1 dBFS, melintasi cut ke end card). VO ~2,1 kata/dtk rata-rata; 3,0–4,3 dalam-ujaran. Jeda sunyi digital disengaja (40,75–41,75; 57,75–59,0; 61,0–61,75; ekor 86,75–89,52 sunyi total).
- Karakter: pose-to-pose; hanya 4 gestur tangan di seluruh video; satu-satunya locomotion adalah penjual lemonade berjalan masuk frame (S21). Wajah = decal statis.

### Vid2 — "Every time you cap…" (104 dtk)
- **40 shot story** (0–100,0 dtk) + 1 end card. Rata-rata **2,50 dtk**, median 2,30, min 0,40, maks 8,53 (crane-up penutup).
- Kamera dominan: statis + **slow push-in**; pola transisi dominan = **jump cut punch-in (12×**, sudut sama → framing lebih dekat). Satu-satunya transisi non-cut: **wipe/slide 1,00–1,10** (~0,10 dtk, shot baru masuk dari kanan). Satu crane-up + tilt-down kontinu 94,35–100,0 yang naik menembus awan (kabut putih diegetik, bukan fade). Nol fade/dissolve.
- 3 temuan terbesar:
  1. **Menara = counter yang jujur, tanpa HUD.** Hitungan visual full-res persis sama dengan hitungan lisan twin di tiga titik uji: 17 (61,7), 18 (66,8), 19 (70,7). Angka 17/18/19 hanya diucapkan (caption hijau) — tidak ada angka di layar sama sekali.
  2. **Aturan berlaku untuk semua orang.** Guru +2 topi, shopkeeper +1 dome oranye, vendor +1 dome teal, cewek +1 dome teal — semua terverifikasi frame. Pop topi = animasi jatuh dari atas frame (~0,2–0,3 dtk). NPC dapat topi dome, hero dapat topi baseball.
  3. **Climax = keruntuhan, bukan topi ke-20.** "Nah" hero (80,5) membuat menara miring dan roboh on-camera 82,2–82,4; jatuhnya + jatuhnya twin disembunyikan di balik cut (aftermath 86,3: topi berserakan, twin terbaring — momen jatuhnya tidak pernah ditayangkan). Closer: hero memakai SATU topi oranye, "I ain't never capped once".
- Audio: **tidak ada musik sama sekali** (spektrum jeda 87–91% pita wicara). Satu-satunya SFX = boom keras peak 0,993 di 100,0–100,7 tepat di cut end card. VO 214 kata, 2,18 kata/dtk; segmen hitungan/cewek justru paling lambat (1,58–1,65) dengan jeda sunyi digital — komedi dari jeda, bukan kecepatan.
- Twin = penghitung + suara kebenaran: tidak pernah berbohong, tidak pernah dapat topi, angkanya selalu cocok dengan menara. Ping-pong CU hero ↔ twin di segmen hitungan 57,6–70,6: 6 cut dalam 13 dtk (ritme tercepat di video).
- Cahaya: siang terang datar di SEMUA 40 shot (lum 83–172, tanpa malam). Tidak ada penceritaan lewat cahaya di video ini.

### Vid3 — Bunker / Subject Zero (128,2 dtk)
- **63 shot cerita** (+1 end card), cerita 124,3 dtk. Rata-rata **1,97 dtk**, median 1,7, min 0,6 (dinding "66"), maks 6,6 (daftar nama menggulir).
- Transisi: 61 hard cut + 1 wipe (dinding "66" terangkat, ~27,5 dtk) + 2 cut bermasking putih (pintu terbuka 62,1; rekaman 88,4) + 1 flash putih di dalam shot (75,5). Tanpa fade/dissolve.
- Kamera: ~30 bergerak vs ~33 statis; gerakan hampir semuanya lambat (dolly/pan/tilt pelan). Satu-satunya gerakan cepat: push-in medium → ECU ~0,2 dtk di shot 24 (terverifikasi kontinu 30 fps).
- 3 temuan terbesar:
  1. **Daftar nama menggulir 6,6 dtk adalah shot terpanjang** dan elemen misteri utama (AVERY COLE … LEON PRICE; nama Jake tidak ada) — payoff ditunda lewat layar, bukan teks "not found".
  2. **Twist disampaikan dua jalur:** VO ("That baby was me") DAN visual (wajah bayi = wajah Jake, syal merah yang sama). Pembalikan makna satu kalimat: bunker dibangun untuk melindungi semua orang DARI Jake, bukan dari zombie.
  3. **Countdown berhenti di 8** (tidak ke 0) setelah loading bar — ketegangan dipotong paksa oleh pintu-pintu yang terbuka. Cliffhanger tanpa resolusi sama sekali.
- Audio: bed musik **tidak pernah mati** (band rendah hadir di semua detik 0–124) tapi ducking di 5 momen kunci; satu dentuman low-end di 124 dtk (RMS 0,359, ~3× baseline), lalu sunyi total 126–128 dtk. VO 310 kata, 2,1–2,8 kata/dtk nyaris datar, melambat ke 1,0 di bisikan penutup.
- Caption: **satu kata, kuning solid RGB ~(226,248,25)**, di ~68–72% tinggi frame — tanpa keyword hijau/merah dan tanpa teks putih (beda dari vid1/vid2).
- Cahaya = penanda babak: tiga puncak terang (kubah 175, mansion ~172, rekaman 160) dan satu lembah panjang (ruang kontrol merah 24–44). Per scene: sunset oranye / bawah laut biru / mansion emas / koridor gelap / malam biru / lockdown merah.
- Kerumunan di-staging dalam baris kedalaman: shot 40 ~35–45 kepala (3–4 baris), shot 52 cincin konsentris dari atas (>100 kepala), zombie membungkuk. Zombie bergerak dengan glide, tanpa langkah terbaca.

## Bagian 2 — Pola lintas video (yang terbukti di ≥2 video)

- **Transisi:** hard cut hampir eksklusif. Total 3 video: 0 fade, 0 dissolve. Satu wipe per video di vid2/vid3 (0,1 dtk / dinding terangkat). Punch-in jump cut = penekanan standar (vid2: 12×).
- **Kamera:** statis + slow push-in dominan; gerakan cepat maksimal satu snap per video; tanpa handheld/shake di mana pun; satu crane (penutup aerial) di vid1/vid2, crane pembuka di vid3.
- **Karakter:** pose-to-pose ekstrem — 1 pose per shot, ditahan penuh; wajah = decal statis + tilt kepala; mulut berubah per baris, bukan per fonem; tangan hampir tidak pernah gestur (vid1: 4 momen); **nol walk cycle** di ketiganya (yang ada: glide/pergeseran posisi, atau beberapa langkah tunggal).
- **Aturan = benda fisik yang bisa dihitung:** tag $ melayang (vid1), menara topi 19 (vid2), angka bunker + countdown di layar (vid3). Tidak pernah HUD. Vid2 membuktikan counter fisik bekerja tanpa angka di layar sama sekali.
- **Caption:** karaoke kata-per-kata, bold + outline hitam, bawah-tengah. Warna = identitas pembicara (vid1/vid2) ATAU semua kuning satu narator (vid3). Caption boleh menyeberangi cut ~0,3 dtk.
- **Audio:** ynbloxtv = tanpa musik sama sekali (VO + jeda sunyi digital sebagai beat komedi). zaylento = bed rendah tak pernah mati + ducking di momen kunci + dentuman akhir + sunyi total di ekor. Pacing VO 2,1–2,8 kata/dtk; segmen penting justru melambat.
- **Penutup:** reprise hook + crane aerial (vid1/vid2) ATAU bisikan + CU ditahan + hard cut ke hitam (vid3). End card TikTok terpisah (hitam, 4 dtk, sunyi). Tanpa moral card, tanpa CTA di dalam cerita.

## Bagian 3 — Koreksi atas STUDY.md

1. **KOREKSI DITOLAK parent (dicek ulang dari frame, 26 Nov 06:41): tag $22 ADA.** Di two-shot corner store (~6–7 dtk) tag pria hijau terbaca **$22** jelas (bukti: `teardown-check/cs_t6.png`, `cs_t7.0.png` — me baca sendiri). Klaim worker "$23" di momen itu salah baca; $23 tidak terverifikasi di momen itu. Daftar tag lain yang worker catat ($1/$14/$40/$52/$212/$31→$30/$6→$5/counter $48.203.611→$0/$10.000) tidak me periksa satu-satu — hanya butir $22 ini yang me koreksi. STUDY.md soal "$22" ternyata benar.
2. **"Keyword hijau" salah sebagai fakta statis.** Sistemnya karaoke per-speaker (hero kuning, twin hijau, cewek pink, lemonade pink, shopkeeper oranye, guru biru muda). "FOUR hijau" hanya benar di momen kata itu diucapkan.
3. **"She left four hours ago" diucapkan TWIN** (caption hijau), malam hari, sebagai punchline setelah hero menghabiskan $10.000 — lalu 6 dtk reprise + crane. Bukan sekadar "beat cinta" penutup.
4. **Counter lemonade BUKAN simulasi konsisten** — laju ~10/dtk di CU, ~200+/dtk di luar layar, ~4.400/dtk saat drain. Gag, bukan akuntansi.
5. **Transfer $10.000 mendahului penjelasannya** (visual 64,2 dtk; VO baru 69,4 dtk) — show dulu, explain kemudian.
6. **Ada SUNSET antara siang dan malam di vid1** (75,0–75,9 dtk), dan perubahan waktu terjadi dalam SATU shot via lighting snap, bukan cut.
7. **"Setting sekolah" tidak lengkap (vid2)** — lapangan basket dominan (>½ durasi); kelas hanya 2 dari 6 lokasi.
8. **"Twin Zero" bukan nama** — twin pakai beanie putih (bukan topi); "zero" = jumlah topi.
9. **"Cahaya per scene" TIDAK berlaku di vid2** — siang terang datar di semua 40 shot.
10. **"Setinggi badan" salah (vid2)** — menara akhir 19 topi ≈ 2–3× tinggi badan.
11. **Bunker 12 = "never make a sound"** (papan "SILE…" + ruang merah gelap) — BUKAN "makanan tak pernah cukup, asap".
12. **No. 66: "nobody could open the last one"** — 99 pintu bisa dibuka, 1 tidak. Bukan "tak ada yang pernah membuka satu pun".
13. **Layar pencarian tidak menampilkan "not found"** — layar berubah sendiri jadi "SUBJECT ZERO HAS RETURNED"; "nothing" hanya ada di VO.
14. **Caption vid3: semua kuning solid, tanpa teks putih, tanpa keyword hijau** — pelajaran 7 STUDY.md menggeneralisasi dari vid1/vid2.
15. **Daftar nama menggulir 6,6 dtk** (shot terpanjang vid3) — elemen misteri utama yang tidak disebut STUDY.md.
16. **Zombie membungkuk (>100 kepala, shot 51–52)** — tidak disebut STUDY.md.
17. **Figur koridor baju kuning despawn antar dua frame 30 fps (~28,6 dtk)** — artefak yang luput dari studi awal.
18. **Countdown berhenti di 8 + ada loading bar sebelumnya** — dua elemen diegetik, bukan satu.

## Bagian 4 — Aturan build cerita misteri 90 detik (R1–Rn)

Aturan ini yang jadi brief fase build. Tanda [E] = butuh kerja engine baru;
tanpa tanda = bisa dengan engine roblox-remotion sekarang.

- **R1 — Durasi & shot.** Target ~90 dtk, 35–45 shot (rata-rata 2,0–2,5 dtk/shot; median ~2,0–2,3). 8–12 story beat. Format panjang ini yang bikin misteri jalan — aturan 35–45 dtk skill TIDAK berlaku di sini (perlu override: beat 14–16 → ~30–40 beat, T.END ~90 dtk; shot tetap 1,0–3,5 dtk).
- **R2 — Hook kalimat pertama.** Aturan absurd dinyatakan di kalimat pertama narasi + konsekuensi terlihat di shot pertama ("On this block, every X costs Y" / "In this town, everyone… except me").
- **R3 — Aturan = benda fisik yang bisa dihitung, bukan HUD.** Tag melayang / tumpukan benda / angka 3D di pintu / teks di layar. Counter yang penting harus JUJUR: hitungan lisan harus sama persis dengan hitungan visual di titik uji (vid2: 17/18/19). Counter gag ala vid1 (laju seenaknya) hanya boleh kalau joke-nya justru kelebihan itu.
- **R4 — Aturan berlaku untuk semua orang.** NPC membuktikan aturan itu hukum dunia (vid2: guru/shopkeeper/vendor/cewek semua dapat topi). Minimal 2 NPC terkena aturan di luar hero.
- **R5 — Satu "suara penghitung".** Karakter kedua yang mengucapkan angka dengan warna caption konsisten 100% (twin hijau) dan angkanya selalu cocok dengan visual. Dia tidak pernah melanggar aturan.
- **R6 — Transisi: hard cut hampir eksklusif.** Tanpa fade/dissolve. Punch-in jump cut (sudut sama, framing lebih dekat) sebagai penekanan standar. Maksimal satu wipe per video, satu crane (penutup aerial atau pembuka).
- **R7 — Kamera: statis + slow push-in.** Satu gerakan kamera per shot, maksimal. Tanpa handheld/shake. Satu snap push-in cepat (~0,2 dtk) per video, hanya untuk momen syok.
- **R8 — Karakter pose-to-pose.** Satu pose ditahan per shot (2–7 dtk); ekspresi = decal statis + tilt kepala; mulut berubah per baris; tangan gestur maksimal 1–2 momen penting; tanpa walk cycle (glide/pergeseran posisi saja).
- **R9 — Caption karaoke per-speaker.** Kata-per-kata, bold + outline hitam, bawah-tengah (~68–75% tinggi). Satu narator → semua kuning (vid3). Multi-speaker → warna konsisten per pembicara (hero kuning default; penghitung hijau; otoritas biru muda; perempuan pink). Caption boleh menyeberangi cut ~0,3 dtk.
- **R10 — Struktur misteri (vid3).** Premis aneh → ketidakadilan dunia → misteri ditanam (pintu/nama yang tak bisa dibuka/ditemukan) → anomali (sesuatu tidak menyerang / tidak merespons seperti seharusnya) → pencarian → pintu/objek yang merespons HANYA hero → catatan/nama yang tidak memuat hero → twist identitas dua jalur (VO + rima visual: wajah/benda hero = wajah/benda di masa lalu) → pembalikan makna satu kalimat → penundukan/kerumunan → cliffhanger tanpa resolusi. Satu misteri dibiarkan menggantung sebagai umpan part 2 (pintu terakhir No. 66).
- **R11 — Angka ditanam dua kali + teks diegetik besar.** Angka kunci muncul di cutaway/peta DAN di shot-nya sendiri. Teks diegetik memenuhi layar ("66" ~40% lebar frame; "SUBJECT ZERO…" memenuhi layar; "10" fullscreen 0,7 dtk). Countdown: loading bar dulu, lalu angka, dan BERHENTI sebelum 0 (8, bukan 0).
- **R12 — Cahaya = penanda babak.** [E sebagian] Minimal 3 rezim cahaya berbeda di 90 dtk (mis. siang → senja → malam merah). Perubahan waktu boleh dalam satu shot via lighting snap (vid1). Kalau prop yang membawa cerita (vid2), cahaya datar boleh — tapi misteri butuh lembah gelap + puncak terang.
- **R13 — Kerumunan dalam baris kedalaman.** 3–4 baris (shot 40 vid3: ~35–45 kepala) atau cincin konsentris dari atas (>100). Variasi desain per anggota (topi, warna rambut/baju, noda). Kerumunan mayoritas BERDIRI DIAM (menunggu/membungkuk) — gerak adalah pengecualian.
- **R14 — Audio misteri (vid3, bukan vid1/vid2).** Bed rendah tidak pernah mati + ducking di momen kunci + satu dentuman low-end di cut akhir + sunyi total di ekor end card. VO 2,1–2,8 kata/dtk nyaris datar, melambat ke ~1,0 hanya di bisikan penutup. Jeda sunyi digital sebelum punchline/reveal.
- **R15 — Penutup tanpa resolusi.** Bisikan + CU hero ditahan 1,6 dtk → hard cut ke hitam. Atau reprise hook + crane aerial. Tanpa moral card, tanpa CTA di dalam cerita. End card terpisah.
- **R16 — Show dulu, explain kemudian.** Peristiwa visual mendahului penjelasan VO ~5 dtk. Anomali ditanam sebelum ada yang mengomentarinya.
- **R17 — Yang TIDAK ditiru.** Script/karakter/shot mereka; slang "twin/huss/cap"; laju counter inkonsisten vid1; inkonsistensi warna $0 (hijau di CU, merah di wide); artefak despawn.

## Bagian 5 — Catatan kelayakan engine (buat brief build)

- **Bisa sekarang:** pose-to-pose R6, kamera statis + slow push-in + punch-in jump cut, caption 1–2 kata di 68% tinggi (cocok dengan caption vid3 satu kata kuning), teks diegetik (boardText ada; pola counter prop ada), kerumunan via instancing (terbukti di engine ships; aturan spacing ≥4,5 stud di roblox engine = kendala — pakai baris kedalaman), isNight + lampu hangat (terbukti v2), crane-up (kamera sudah bisa).
- **[E] Butuh bangun lokasi baru:** cutaway potongan melintang, kubah kaca bawah laut, koridor vault + pintu bundar raksasa, ruang kontrol + dinding monitor, layar nama menggulir + loading bar + countdown. Ini pekerjaan environment (buildings.tsx/props.tsx + TownMap), bukan tweak.
- **[E] Butuh:** lighting snap dalam satu shot (ganti rezim cahaya tanpa cut), angka 3D raksasa sebagai prop dunia, caption warna per-speaker (engine saat ini satu gaya caption).
- **Override skill yang perlu diputuskan di brief build:** durasi 35–45 dtk → ~90 dtk; beat 14–16 → ~30–40; shot >3,5 dtk masih dilarang (shot terpanjang vid3 6,6 dtk adalah layar menggulir — perlu pengecualian eksplisit atau dipecah).

## Bagian 6 — Batas kejujuran

- Kecepatan kamera hanya kualitatif ("pelan"/"cepat") — tidak ada angka m/dtk atau derajat/dtk.
- Blink <0,5 dtk / mikro-ekspresi tidak bisa dipastikan (sampling 2 fps; strip 0,2 dtk).
- Angka luminansi indikatif (rata-rata grayscale frame penuh, termasuk caption/tag/watermark; frame 2 fps ber-offset ~+0,2 dtk di vid3).
- Transkrip faster-whisper tiny kasar: timing kata ±0,3–0,5 dtk (vid1 ekor meleset ~4 dtk — kalimat terakhir pasti di burst 85,25–86,25 dtk, bukan 89,14); slang salah eja ("husk/hossassass", "Brogot", "Swiss cheese"); semua kutipan dicek silang ke caption frame.
- Hitung zombie estimasi manual (~35–45 shot 40; >100 shot 52) — bukan hitungan pasti.
- Penyebab despawn koridor (~28,6 dtk) dan kubus warna (102,5 dtk) tidak terpecahkan.
- Isi burst audio akhir vid1 (teriakan vs sting outro) dan audio lantai 83,5–85,0 dtk tidak teridentifikasi dari waveform — worker tidak mendengarkan audio.
- $0 hijau-di-CU vs merah-di-wide: teramati konsisten, penyebabnya (sengaja vs inkonsistensi) tidak bisa dipastikan.
- Batas shot ±0,2 dtk (strip 0,2 dtk); hitungan topi pembuka vid2 ±1 (dasar tertutup caption); pemicu topi hitam ke-16 vid2 tidak 100% pasti; momen twin terbaring (82,4–86,3) tidak tertayang.
