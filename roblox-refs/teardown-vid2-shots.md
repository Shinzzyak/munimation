# Teardown per-frame — Video 2: ynbloxtv, "Every time you cap, a cap pops up on your head"

- **File:** `~/workspace/user/media_library/video/b8/b835265903d2aade777a16969d90368539c2863088adb8c8f6cf20143a267e6c.mp4`
- **Spesifikasi terukur:** 576×1024, 30 fps, durasi **104,02 dtk** (story 0–100,0 dtk; end card TikTok 100,0–104,0 dtk).
- **Identitas — TERVERIFIKASI, bukan diterima mentah:** watermark TikTok `@ynbloxtv` terbaca di semua frame; hook lisan "On this block, every time you cap, a cap pop up on your head, and I never cap once, twin" (0,0–7,2 dtk); setting sekolah + lapangan basket; duo "twin"; hitungan 17/18/19 diucapkan si twin. **Semua klaim identitas di STUDY.md cocok dengan frame.**
- **Metode:** frame 2 fps (208 frame) + 10 fps di sekitar tiap kandidat transisi + 30 fps di 0,9–1,3 dtk dan 10,7–11,3 dtk; deteksi scene ffmpeg `gt(scene,0.3)` = 40 kandidat, `gt(scene,0.4)` = 28 kandidat — **semuanya diverifikasi visual**; 39 dari 40 kandidat 0.3 adalah hard cut asli, 1 palsu (84,37 = topi jatuh, bukan cut), plus 1 transisi wipe yang scene-detect TIDAK tangkap sebagai kandidat terpisah (wipe 1,0–1,1). Luminansi = rata-rata grayscale per frame (PIL/numpy, INDIKATIF — termasuk area caption). Audio = RMS per detik dari WAV 16 kHz + spektrum per segmen. Transkrip = `vid2-transcript.json` (faster-whisper tiny; timing kata ±0,3–0,5 dtk, slang sering salah eja — semua kutipan di bawah dicek melawan caption di frame).
- **Aturan penulisan:** tidak ada salinan transkrip penuh; hanya ringkasan + kutipan pendek (≤3 kata per caption).

## Ringkasan shot

- **Shot story: 40** (0–100,0 dtk) + 1 end card (100,0–104,0 dtk) = **41 shot total**.
- **Durasi shot story:** rata-rata **2,50 dtk**, median **2,30 dtk**, min 0,40 dtk (S06, S29), maks 8,53 dtk (S40, crane-up).
- **Kamera dominan:** statis + **slow push-in** (dolly/zoom-in pelan ~5–10% per shot) di sebagian besar shot; punch-in jump cut (potong ke framing lebih dekat, sudut sama) adalah pola transisi dominan; satu pan right (S01), satu wipe/slide (1,0–1,1), satu crane-up + tilt-down kontinu (94,35–100,0, di dalam S40).
- **Cahaya:** **siang terang datar di semua shot** (luminansi 83–172, tanpa satu pun adegan malam). Tidak ada penceritaan lewat cahaya di video ini.
- **Gerakan karakter:** pose-to-pose, praktis **statis dalam shot** (satu pose ditahan penuh; tanpa walk cycle — kecuali si cewek jalan masuk 70,6–74,5, itu pun pergeseran posisi, siklus kaki tidak terurai di 2 fps). Tangan tidak gestur. Mulut berubah bentuk per baris (terutama guru: "o"); mata hero (satu-satunya fitur wajah yang bergerak) melirik ke samping di 85,5–86,2. Animasi yang benar-benar bergerak: **topi jatuh dari atas** (~0,2–0,3 dtk), **menara goyang/miring**, dan **menara roboh** (82,2–82,4).

## Aturan "cap" — ledger terverifikasi (hitung visual vs hitungan lisan)

Topi = benda fisik yang bisa dihitung. Hitungan visual full-res **persis sama** dengan hitungan yang diucapkan twin di tiga titik uji: **17 (61,7 dtk), 18 (66,8 dtk), 19 (70,7 dtk)** — menara adalah counter yang jujur, bukan perkiraan.

| Waktu | Menara hero | Peristiwa |
|---|---|---|
| 1,0–4,3 | ~10–11 (dasar tertutup caption, ±1) | Sudah ada sejak frame pertama — 10+ bohong terjadi SEBELUM video dimulai, tanpa asal-usul di layar |
| 35,3 | 11 | — |
| 38,3–38,5 | 11 → **12** | Topi MERAH jatuh on-camera ("big money"/"deadass") |
| 43,3 | **13** | "Put it on my tab" — pop off-screen, terlihat saat cut kembali |
| ~47,5 | **~14** | "I got a tab" — pop tidak teramati langsung, aritmetika hitungan menutup (+3 dari 13 ke 16 di interval ini) |
| 49,5 | 14 → **15** | Topi PINK jatuh on-camera, mendarat MIRING ("my dog ate it") |
| 51,5 | **16** | Topi HITAM di puncak ("He ran away" — pemicu tidak 100% pasti, lihat batas kejujuran) |
| 59,2 / 61,7 | **17** | "He was ashamed" — twin: "Bro, you got SEVENTEEN" (hijau) |
| 65,7 / 66,8 | **18** | "That's cap, twin" — twin: "EIGHTEEN" |
| 70,4 / 70,7 | **19** | "I'll really Swiss cheese" — twin: "NINETEEN" |
| 82,2–82,4 | **ROBOH** | "Nah" (hero menyangkal suka si cewek) → topi ke-20 TIDAK PERNAH mendarat; menara miring lalu jatuh; jatuhnya disembunyikan di balik cut, aftermath terlihat 86,3 |
| 91,5+ | **1 (oranye)** | Closer: hero mengulang aturan sambil memakai SATU topi — punchline "I ain't never capped once" |

Aturan berlaku untuk **semua orang**, bukan cuma hero. NPC dapat SATU topi **dome** (mangkuk, tanpa brim — beda dari topi baseball hero) per bohong:

| Karakter | Topi normal | Topi bohong | Pop teramati |
|---|---|---|---|
| Guru | 1 pink | +1 hitam (≤45,6), +1 ungu (≤49,9) | Off-screen antar adegan — tiap kali guru muncul kembali, tumpukannya +1 |
| Shopkeeper | 0 | +1 dome oranye | **Jatuh on-camera 10,97–11,13** (30 fps) — "chips are locked up for everybody" |
| Vendor lemonade | 0 | +1 dome teal | Jatuh on-camera ~20,5 ("I'm broke") |
| Cewek "NEW YORK" | 1 putih/hijau | +1 dome teal | **Jatuh on-camera 84,4–84,7** ("Me neither") |
| Twin | 0 (beanie putih, BUKAN topi) | 0 | Tidak pernah berbohong, tidak pernah dapat topi |
| Hero | 0 | Menara (lihat tabel) | Jatuh on-camera 38,3 & 49,5; sisanya off-screen |

Catatan: pop topi = animasi **jatuh dari atas frame** (~0,2–0,3 dtk, topi muncul kecil di tepi atas lalu membesar dan mendarat), BUKAN muncul instan. Saat topi mendarat di menara yang sudah tinggi, topi mendarat **miring** (49,5; 51,5) — menara makin tidak stabil.

## Shot list (S01–S40 story + end card)

Format per shot: waktu | durasi | kamera | framing | karakter/pose/ekspresi | topi | luminansi | teks diegetik | caption.

### S01 — 0,00–1,00 | 1,00 dtk | pan right pelan | wide | Tanpa karakter. Bukit hijau + langit + gedung-gedung pastel (kota). | — | 171,8 | — | "ON DIS BLOCK" (DIS kuning). Caption sudah ada di 0,0.
### S02 — 1,00–4,30 | 3,30 dtk | slow push-in | medium | Hero (badan hitam, muka tertutup menara) berdiri di depan Corner Store. Pose statis, tangan di samping. | Menara ~10–11, penuh dari frame pertama | 125,2 | "CORNER STORE", poster "WE DO N… / BREAK K…" (terpotong framing, tidak terbaca penuh) | Kata-per-kata; "EVERY TIME YOU" (TIME kuning), "CAP" (kuning), "A CAP POP", "UP ON YO" (sic — caption tertulis "YO", lihat batas kejujuran), "HEAD" (kuning).
### S03 — 4,30–7,07 | 2,77 dtk | slow push-in | medium → lebih dekat | Hero, sama. Cut = jump cut punch-in (sudut sama, framing melompat lebih dekat). | Menara ~10–11 | 108,5 | "CORNER STORE" | "AND IAN NEVA" (NEVA kuning), "CAPPED A DAY" (kuning), "IN MY LIFE" (LIFE kuning), "TWIN" (kuning).
### S04 — 7,07–9,43 | 2,36 dtk | slow push-in | medium | Interior toko: shopkeeper di balik kasir + kandang keripik berkunci (gembok kuning) di atas meja. Shopkeeper statis. | Shopkeeper: 0 topi | 125,6 | "TIPS" (stoples di kasir) | "I TOLD HIM" (HIM kuning), "THE CHIPS ARE" (CHIPS kuning).
### S05 — 9,43–10,77 | 1,34 dtk | slow push-in | CU kandang | Kandang keripik + kepala shopkeeper di atasnya. Jump cut punch-in dari S04. Mulut shopkeeper "o". | Shopkeeper: 0 | 98,9 | — | "LOCKED UP FOR" (UP kuning), "EVERYBODY" (kuning).
### S06 — 10,77–11,17 | 0,40 dtk | slow push-in | wide (jump-out) | Jump cut ke framing lebar: kasir utuh, shopkeeper berkepala telanjang (rambut gelap). **Topi dome oranye JATUH dari atas 10,97–11,13 dan mendarat di kepalanya** (terverifikasi 30 fps). | Shopkeeper: 0 → **1 dome oranye** | 143,8 | "TIPS" | "EVERYBODY" (terbawa dari baris sebelumnya melewati cut).
### S07 — 11,17–11,80 | 0,63 dtk | statis | wide | Kelas: guru kecil di depan papan tulis, meja-meja kosong. | Guru: 1 pink (terlihat dari jauh) | 145,7 | Papan: "DAY / …DOWN PAPER / …KING" (terpotong) | "EVERYBODY" (terbawa).
### S08 — 11,80–17,90 | 6,10 dtk | statis | medium | Guru: rompi cokelat, dasi merah, kacamata, memegang kertas putih. Pose statis penuh 6,1 dtk; hanya mulut/caption berubah. Ekspresi netral. | Guru: 1 pink (+ rambut ungu di bawahnya — BUKAN topi) | 126,9 | Papan "…APER" | "I SAID I", "WOULD GRADE", "YOUR TESTS BY", "FRIDAY" (**FRIDAY biru muda**), "THAT WAS MARCH" (MARCH biru muda), "I'LL DO IT", "THIS FRIDAY" (FRIDAY biru muda).
### S09 — 17,90–18,50 | 0,60 dtk | statis | wide | Stan lemonade (atap kuning-putih, pohon, rumah kuning). Vendor kecil di balik stan. | Vendor: 0 | 162,5 | "LEMONADE 50¢" | "THIS FRIDAY" (terbawa).
### S10 — 18,50–21,30 | 2,80 dtk | statis | medium | Vendor: kulit gelap, rambut hitam, kemeja abu-abu, di balik stan. Diam, ekspresi netral. **"HRMM" pink muncul 18,8** (suara berpikir, bukan kata — tidak ada di transkrip). **Topi dome teal JATUH ~20,5** dan mendarat di kepalanya. | Vendor: 0 → **1 dome teal** | 143,6 | "LEMONADE" (di stan) | "I'M BROKE" (BROKE pink), "HRMM" (pink, non-kata).
### S11 — 21,30–24,67 | 3,37 dtk | statis | wide | Stan lemonade utuh, vendor kecil dengan topi teal. | Vendor: 1 teal | 160,1 | "LEMONADE 50¢" | "BRUH GOT FORTY" (FORTY kuning), "MILLION DOLLAS" (kuning), "TWIN" (kuning), "ONE CAP" (CAP kuning).
### S12 — 24,67–29,10 | 4,43 dtk | slow push-in | medium-wide | Lapangan basket: hero (menara) + twin (jaket biru, beanie putih) berdiri berdampingan. Keduanya statis. Bola basket di lantai. | Menara ~11 | 138,0 | — | "MY TWIN?" (TWIN kuning), "ZERO" (kuning), "HE AIN NEVA" (NEVA kuning), "LIED ONCE" (ONCE kuning).
### S13 — 29,10–31,03 | 1,93 dtk | statis | CU | Twin: beanie putih ber-flap telinga (ushanka), poni hitam, jaket biru. Ekspresi serius/netral, diam. | Twin: 0 topi (beanie ≠ topi) | 133,8 | — | "I JUST DON'T" (DON'T hijau), "SEE THE POINT" (POINT hijau).
### S14 — 31,03–32,90 | 1,87 dtk | statis | CU menara (low angle) | Menara hero mengisi frame, puncak terpotong. Hero (badan hitam) di bawah. | Menara ~11 | 120,9 | — | "DAT'S CUZ YOU" (kuning), "SWEET" (kuning), "TWIN" (kuning).
### S15 — 32,90–35,17 | 2,27 dtk | statis | CU | Shopkeeper: mulut "o", ekspresi kaget/netral. Topi dome oranye masih dipakai. | Shopkeeper: 1 oranye | 94,8 | Rak warna-warni di belakang | "FOUR DOLLARS" (FOUR kuning), "TWIN" (kuning).
### S16 — 35,17–41,40 | 6,23 dtk | slow push-in | medium | Hero di kasir toko (cup permen warna-warni di meja). Menara tinggi, slow push-in 6,2 dtk. **Topi MERAH jatuh 38,3–38,5** ke puncak (terverifikasi 10 fps). | 11 → **12** (merah, 38,5) | 115,3 | — | "SAY UNC" (UNC kuning), "I GOT MOTION" (MOTION kuning), "TWIN" (kuning), "BIG MONEY" (MONEY kuning), "DEADASS" (kuning), "MY TAB" (TAB kuning).
### S17 — 41,40–43,13 | 1,73 dtk | statis | CU | Shopkeeper, mulut "o" lalu netral. | Shopkeeper: 1 oranye | 97,7 | — | "MY TAB" (terbawa), "YOU DON'T HAVE" (DON'T kuning), "A TAB" (TAB kuning).
### S18 — 43,13–45,47 | 2,34 dtk | slow push-in | medium | Hero di kasir. Menara lebih tinggi (pop "put it on my tab" terjadi off-screen saat S17). | **13** | 113,8 | — | "I GOT A" (kuning), "WHAT YOU MEAN" (MEAN kuning), "GANG?" (kuning).
### S19 — 45,47–47,30 | 1,83 dtk | statis | wide | Kelas: hero (menara, kiri) + guru di meja (kanan). | Hero ~14; guru: 2 (pink + hitam — hitam sudah ada di sini) | 119,2 | Papan: "TEST / EYES ON YOU…" | "GANG?" (terbawa), "HOMEWORK?" (HOMEWORK? biru muda).
### S20 — 47,30–49,77 | 2,47 dtk | slow push-in pelan | CU menara | Menara hero dari belakang/samping di kelas. **Menara mulai GOYANG: topi puncak (pink) miring 49,5–49,7** saat topi pink ke-15 mendarat miring. Poster "BE KIND / WORK HARD" di belakang. | 14 → **15** (pink miring, 49,5) | 132,9 | "BE KIND / WORK HARD", "NO…" (terpotong) | "I AIN GON LIE" (LIE kuning), "MY DOG ATE" (DOG kuning), "IT" (kuning).
### S21 — 49,77–51,33 | 1,56 dtk | statis | CU | Guru: **3 lapis di kepala — hitam (atas) + pink + ungu** (ungu di sini topi penuh berdome+brim, bukan rambut). Mulut "o". | Guru: **3** | 83,1 | Papan "…AY / …WN PAPER / …KING" | "YOU DON'T HAVE" (DON'T kuning), "A DOG" (DOG biru muda).
### S22 — 51,33–54,23 | 2,90 dtk | statis | CU menara | Menara di kelas, **puncak hitam miring** (goyang berlanjut). Murid latar di meja (kaus kuning/hijau, statis). | **16** (hitam di puncak) | 133,2 | "BE KIND / WORK HARD" | "A DOG" (terbawa), "HE RAN AWAY" (AWAY kuning), "TWIN" (kuning), "HE WAS ASHAMED" (ASHAMED kuning).
### S23 — 54,23–56,90 | 2,67 dtk | statis | wide (terhalang kusen pintu) | Kelas dilihat lewat kusen pintu vertikal di tengah frame. **Menara MIRING BERAT** — membengkok diagonal, sebagian keluar frame kiri (hero membungkuk di bawah pintu). Tanda "NO PHONES". | Menara ~17, miring | 149,1 | "NO PHONES" | "BY LUNCH I" (LUNCH kuning), "WAS DUCKIN" (DUCKIN kuning), "UNDA DOORS" (DOORS kuning), "TWIN" (kuning).
### S24 — 56,90–57,60 | 0,70 dtk | slow push-in | wide | Lapangan basket: hero + twin. Shot penghubung pendek (0,7 dtk). | Menara ~17 | 136,6 | — | "TWIN" (terbawa).
### S25 — 57,60–61,57 | 3,97 dtk | statis | CU | Twin: beanie putih, poni hitam, ekspresi netral → senyum tipis. Diam. | Twin: 0 | 133,7 | — | "BRO" (**hijau**), "YOU GOT" (GOT hijau), "SEVENTEEN" (**hijau**), "I BEEN" (hijau), "COUNTING" (hijau).
### S26 — 61,57–65,73 | 4,16 dtk | statis | CU menara (low angle, langit) | Menara penuh dari dasar ke puncak, latar langit biru. Tanda "PARK RULES". | **17** (dihitung penuh di full-res) | 112,8 | "PARK RULES / NO DUNKING ON KIDS / NO CRYING" (tepi kiri terpotong) | "SEVENTEEN?" (kuning), "DAT'S CAP" (CAP kuning), "TWIN" (kuning).
### S27 — 65,73–66,70 | 0,97 dtk | statis | CU | Twin, netral. | Twin: 0 | 126,0 | — | "EIGHTEEN" (**hijau**).
### S28 — 66,70–70,17 | 3,47 dtk | statis | CU menara (low angle) | Menara penuh, latar langit. | **18** (dihitung penuh di full-res) | 117,2 | "PARK RULES" | "EIGHTEEN" (terbawa dari twin, tetap hijau), "KEEP COUNTIN" (COUNTIN kuning), "TWIN" (kuning), "I'LL REALLY" (kuning), "SWISS CHEESE" (CHEESE kuning), "YO AHH" (AHH kuning).
### S29 — 70,17–70,57 | 0,40 dtk | statis | CU | Twin, netral. Shot 0,4 dtk — hanya untuk kata "NINETEEN". | Twin: 0 | 136,0 | — | "NINETEEN" (**hijau**).
### S30 — 70,57–74,57 | 4,00 dtk | statis | wide | Lapangan: menara hero di tengah, twin di tepi kiri, **cewek masuk dari kanan dan BERJALAN ke arah hero** (70,9–71,5, pergeseran posisi; siklus kaki tidak terurai). Cewek: pirang, kaus hijau "NEW YORK", topi putih ber-brim hijau + bintang. | Menara **19** (dihitung penuh di full-res) | 129,9 | "PARK RULES" | "NINETEEN" (terbawa, hijau), "HI" (HI pink), "CAN I ASK" (ASK pink), "YOU SOMETHING?" (SOMETHING? pink).
### S31 — 74,57–77,63 | 3,06 dtk | slow push-in | CU menara (low angle) | Menara mengisi frame, push-in pelan (topi puncak membesar). | 19 | 117,7 | — | "ASK ME" (ME kuning), "ANYTHING" (kuning), "I KEEP IT" (IT kuning), "TWIN" (kuning).
### S32 — 77,63–79,27 | 1,64 dtk | statis | CU | Cewek: senyum, pipi merona, topi putih/hijau. Ekspresi berharap. | Cewek: 1 (putih/hijau) | 130,7 | "NEW YORK" (kaus) | "DO YOU LIKE" (LIKE pink), "ME?" (pink).
### S33 — 79,27–81,53 | 2,26 dtk | statis | CU wajah hero | **Pertama kali wajah hero terlihat jelas: balaclava hitam, mata setengah terpejam, alis terlihat, tatapan lelah/tidak terkesan.** 3 topi (kuning/merah/oranye) melayang di atas kepala (sisa menara di luar frame). | 19 (hanya 3 terbawah terlihat) | 87,6 | — | "ME?" (terbawa), "NAH" (kuning, 80,5–81,0).
### S34 — 81,53–82,47 | 0,94 dtk | statis | wide | Lapangan: hero + twin berdiri berjauhan. **Menara MULAI ROBOH: 82,2 miring ~30°, 82,3–82,4 miring ~45°+** (terverifikasi 10 fps). Twin masih berdiri. | 19, sedang roboh | 137,7 | — | (tanpa kata baru; jeda).
### S35 — 82,47–85,27 | 2,80 dtk | slow pull-out pelan | CU | Cewek: "o" (kaget, 82,5) → senyum (83,0–84,0). **Topi dome teal JATUH 84,4–84,7** dari atas frame dan mendarat di atas topi putih/hijaunya; bersamaan itu framing melebar sedikit (tanda PARK RULES jadi terlihat). | Cewek: 1 → **2 (teal dome)** | 135,6 | "PARK RULES / NO DUNKING ON KIDS / NO CRYING" (muncul saat pull-out) | "OH" (pink), "ME NEITHER" (pink).
### S36 — 85,27–86,27 | 1,00 dtk | statis | CU wajah hero | Balaclava hitam; **mata melirik ke samping** (berubah dari S33 — satu-satunya gerakan wajah hero yang teramati). | 0 topi terlihat (menara sudah roboh, di luar frame) | 100,9 | — | "AYO" (kuning).
### S37 — 86,27–86,83 | 0,56 dtk | statis | wide | **Aftermath:** hero tanpa topi di tengah; cewek (teal dome) di kiri; **twin TERBARING di lantai di tepi kanan** (sudah jatuh — momen jatuhnya tidak pernah ditayangkan); topi-topi berserakan di lantai (oranye, hitam, ungu, kuning). | Menara: 0 (berserakan) | 139,9 | "PARK RULES" | (tanpa kata baru; jeda).
### S38 — 86,83–88,63 | 1,80 dtk | statis | CU | Twin (duduk/berdiri kembali di CU — framing hanya dada ke atas, posisi badan tidak terlihat): netral. | Twin: 0 | 137,2 | — | "SO THAT'S A" (hijau), "YES" (**hijau**).
### S39 — 88,63–91,47 | 2,84 dtk | statis | medium | Hero: balaclava, **tanpa topi**, badan hitam, topi berserakan di kaki. | 0 | 134,4 | — | "YES" (terbawa, hijau), "ION KNOW WHAT" (WHAT kuning), "DAT WAS" (WAS kuning), "TWIN" (kuning).
### S40 — 91,47–100,00 | 8,53 dtk | statis 91,47–94,35 → **crane-up + tilt-down kontinu 94,35–100,0** | medium → aerial | Hero dengan **SATU topi oranye** (muncul bersama cut 91,47 — pop disembunyikan cut). 94,4 kamera naik: hero mengecil, lapangan melebar, twin terlihat terbaring, lalu **kamera naik menembus awan** (kabut putih menyapu dari kanan 99,4–99,9 — awan diegetik, BUKAN fade). Satu shot, tanpa cut di dalam. | **1 oranye** | 132,6 | "PARK RULES", lapangan + jalan + pohon dari udara | "ON DIS BLOCK" (BLOCK kuning), "EVERY TIME YOU" (TIME kuning), "CAP" (kuning), "A CAP POP" (CAP kuning), "UP ON YO" (kuning), "HEAD" (kuning), "AND IAN NEVA" (NEVA kuning), "CAPPED ONCE" (CAPPED kuning), "TWIN" (kuning).
### End card — 100,00–104,00 | 4,00 dtk | statis | — | Layar hitam, logo TikTok + search bar beranimasi "@ynbloxtv". Hard cut dari aerial (100,0). Bukan bagian cerita. | — | ~5 | "TikTok", "@ynbloxtv" | — |

## Klasifikasi transisi (semua diverifikasi visual, bukan dari angka diff)

- **Wipe/slide (1):** 1,00–1,10 — shot baru masuk dari kanan ke kiri, seam vertikal bergerak dalam ~0,10 dtk (3 frame @30fps), tanpa blur. Satu-satunya transisi non-cut di video.
- **Hard cut (39):** semua batas shot lain, termasuk 12 **jump cut punch-in** (sudut sama, framing melompat lebih dekat: 4,30 / 9,43 / 11,80 / 18,50 / 29,10 / 31,03 / 35,17 / 41,40 / 43,13 / 47,30 / 49,77 / 51,33), 1 jump-out (10,77), sisanya ganti sudut/lokasi.
- **Kandidat palsu (1):** 84,37 — spike scene-detect berasal dari topi teal yang jatuh masuk frame, BUKAN cut.
- **Gerakan kamera dalam shot:** slow push-in di S02, S03, S04, S05, S06, S12, S16, S18, S20, S24, S31; pan right di S01; pull-out pelan di S35; crane-up di S40. Tidak ada handheld/shake, tidak ada fade/dissolve sama sekali.
- **Pola ritme:** shot wide pendahuluan sangat pendek (0,4–0,7 dtk: S06, S07, S09, S24, S29) lalu jump cut punch-in — "wide flash, lalu tinju masuk". Tiga shot terpanjang (S08 6,10 / S16 6,23 / S40 8,53) adalah tempat beat komedi ditahan (guru, toko, closer).

## Sistem caption

- Kata-per-kata, rolling 1–3 kata, tengah-bawah (~75–85% tinggi frame), bold putih + outline hitam. Bukan kumulatif: hanya kelompok kata berjalan yang tampil.
- **Warna = kode pembicara** (pola utama, 2 pengecualian — lihat bawah):
  - **Kuning** = hero/narator (default, sebagian besar video).
  - **Hijau** = twin — konsisten 100%: "BRO", "SEVENTEEN", "I BEEN COUNTING", "EIGHTEEN", "NINETEEN", "SO THAT'S A YES". Angka hitungan 17/18/19 selalu hijau, dan **hanya diucapkan** — tidak ada angka di layar (tidak ada counter HUD, tidak ada teks "17" di dunia; hitungan = suara twin + tinggi menara).
  - **Biru muda** = guru — konsisten: "FRIDAY" (×3), "MARCH", "HOMEWORK?", "A DOG".
  - **Pink** = cewek — "LIKE", "ME?", "OH", "ME NEITHER"; PLUS 2 pengecualian: "BROKE" (vendor, 20,0) dan "HRMM" (suara berpikir vendor, 18,8). Hipotesis pink = beat rentan/emosional, belum terbukti — dicatat sebagai pengecualian, bukan aturan.
- Caption **tidak terkunci pada cut**: caption baris sebelumnya terbawa ~0,3 dtk ke shot berikut (mis. "EVERYBODY" masuk S07, "THIS FRIDAY" masuk S09, "MY TAB" masuk S17).
- Ejaan slang dipertahankan di caption: "DAT'S", "IAN NEVA", "ION KNOW", "GANG", "UNDA DOORS".

## Audio (diukur, bukan ditebak)

- **Tidak ada musik sama sekali.** Spektrum di jeda antar-kata: 87–91% energi di pita wicara 300–3000 Hz, pita rendah (50–300 Hz) hanya 8–12% — itu sisa napas/reverb VO, bukan bed musik. Tidak ada nada atau beat berkelanjutan di segmen mana pun.
- **VO:** 214 kata dalam 0–98 dtk = **2,18 kata/dtk** rata-rata. Per segmen: hook 3,19; guru 2,88; closer 2,88; toko 2,38; counting 1,58 (paling lambat — jeda sengaja untuk beat hitungan); cewek 1,65 (jeda komedi); lemonade 1,63.
- **SFX:** hanya 2 peristiwa — (a) **boom/impact keras di 100,0–100,7 dtk** (tepat di cut ke end card): RMS 0,60, peak 0,993 (clip digital), dua hantaman (~100,0 dan ~100,5), lalu sunyi dari ~101,5; (b) tidak ada SFX pop/boing saat topi jatuh — pop topi terjadi dalam diam relatif (tanpa bunyi khas yang terdeteksi).
- **Jeda sunyi (beat komedi):** 71,0–71,8 dan 79,3–80,4 = **sunyi digital total** (RMS 0,000–0,0008) sebelum "Hi" dan sebelum "Nah". Jeda lain (11,0–11,7; 17,7–19,5; 45,0–46,6) tidak sunyi penuh (RMS ~0,07–0,10, energi pita wicara — napas/reverb/±vokalisasi non-kata seperti "HRMM").
- **Dinamika:** RMS per detik −13 s.d. −22 dB saat VO berjalan; tidak ada kompresi/ducking yang terukur (tidak ada musik untuk di-duck).

## Dinamika duo "twin"

- **Hero** = narator + pembohong utama (semua beat cerita lewat dia; wajah tertutup balaclava + menara — ekspresi hanya dari mata).
- **Twin** = penghitung + komentator. Dia hampir tidak pernah jadi subjek shot kecuali saat menghitung (S13, S25, S27, S29, S38 — semuanya CU statis, kata-katanya hijau). Dia tidak pernah berbohong, tidak pernah dapat topi, dan menjadi "suara kebenaran" yang angkanya selalu cocok dengan tinggi menara.
- **Pola shot duo:** ping-pong CU (hero ↔ twin) di segmen hitungan 57,6–70,6 — 6 cut dalam 13 dtk, ritme tercepat di video. Di luar itu mereka berbagi wide shot (S12, S24, S30, S34, S37, S40).
- Twin terbaring di lantai mulai 86,3 (dan di aerial 94,5+) — **momen dan penyebab jatuhnya tidak pernah ditayangkan** (terakhir berdiri 82,4; pertama terlihat rebah 86,3). Kemungkinan besar gag pingsan setelah menara roboh, tapi tidak terverifikasi.

## Koreksi atas STUDY.md (video 2)

1. **"Twin-nya menghitung: 17, 18, 19" — BENAR dan lebih kuat dari klaim:** hitungan BUKAN hanya diucapkan — tinggi menara di frame **persis 17/18/19** di tiga titik uji full-res. STUDY.md tidak menyebut verifikasi visual ini.
2. **"Tumpukan topi warna-warni setinggi badan" — KURANG TEPAT:** di akhir menara **jauh lebih tinggi dari badan** (19 topi ≈ 2–3× tinggi badan; di low-angle shot menara memenuhi seluruh tinggi frame 1024px). "Setinggi badan" hanya benar di awal (~10 topi).
3. **"Bohong = topi fisik menumpuk di kepala" — BENAR tapi tidak lengkap:** aturan berlaku untuk **semua karakter** (guru +2, shopkeeper +1, vendor +1, cewek +1), bukan cuma hero. STUDY.md hanya menyebut hero.
4. **"Joke-joke cepat" — perlu nuansa:** pacing VO segmen hitungan & cewek justru **paling lambat** (1,58–1,65 kata/dtk) dengan jeda sunyi digital — komedinya dari jeda, bukan kecepatan.
5. **"Setting sekolah" — BENAR tapi tidak lengkap:** hanya 2 dari 6 lokasi yang sekolah (kelas); sisanya: depan toko (S02–S03), interior toko (S04–S06, S15–S18), stan lemonade (S09–S11), lapangan basket (S12–S14, S24–S40). Lapangan basket adalah lokasi dominan (lebih dari separuh durasi).
6. **"My twin Zero" (transkrip) — TIDAK TERBUKTI sebagai nama:** twin memakai **beanie putih ber-flap, bukan topi baseball** — "zero" paling masuk akal dibaca sebagai jumlah topi (nol), bukan nama. Tidak ada bukti lain di frame bahwa namanya Zero.
7. **Pelajaran 5 STUDY.md ("cahaya per scene = penceritaan") — TIDAK BERLAKU untuk video ini:** video 2 adalah siang terang datar di semua 40 shot (lum 83–172, tanpa malam). Penceritaan visualnya dikerjakan oleh topi + cut + crane, bukan cahaya. (Pelajaran itu valid untuk video 3, bukan video 2.)
8. **"Counter badge v1 idenya benar" — didukung lebih kuat:** video ini membuktikan counter fisik bekerja **tanpa HUD sama sekali** — tidak ada angka di layar; angka hanya diucapkan twin (hijau) dan diwujudkan menara.

## Batas kejujuran (yang tidak bisa dipastikan dari frame)

- **Kecepatan kamera:** push-in/crane hanya bisa digambarkan relatif ("pelan", "~5–10% per shot") — tanpa data tracking 3D, kecepatan absolut tidak terukur.
- **Blink <0,5 dtk / micro-expression:** sampling 10 fps tidak bisa menangkap kedipan atau perubahan mulut <0,1 dtk; mulut karakter hanya teramati berubah antar-baris, bukan per fonem.
- **Angka luminansi indikatif:** rata-rata grayscale seluruh frame termasuk caption & watermark; hanya berguna sebagai perbandingan relatif antar shot, bukan nilai fotometrik.
- **Transkrip tiny kasar:** timing kata ±0,3–0,5 dtk; slang salah eja ("Brogot", "Swiss cheese", "he was a shame"); caption "UP ON YO" di 3,0 dtk kemungkinan singkatan gaya "your"→"yo" ATAU frame transisi — tidak bisa dipastikan dari satu frame 2 fps.
- **Topi hitam ke-16 (51,5):** muncul antara 49,7–51,5; kandidat pemicu "He ran away" (mulai 51,3) — pop 0,2 dtk setelah baris mulai, lebih awal dari pola pop lain (biasanya di akhir baris). Alternatif (pop tertunda dari baris sebelumnya) tidak bisa disingkirkan dari sampling 10 fps.
- **Topi pembuka (~10–11):** dasar menara tertutup caption di 1,5 dtk — hitungan awal ±1.
- **Pemicu topi guru (hitam/ungu):** pop terjadi off-screen antar adegan; baris pemicu dipetakan dari urutan kemunculan, bukan pengamatan langsung.
- **Twin terbaring:** momen + penyebab jatuh tidak tertayang (82,4–86,3 off-camera).
- **Poster toko "WE DO N… / BREAK K…":** teks terpotong framing di semua frame — isi lengkap tidak terbaca.
- **Jalan masuk cewek (70,6–74,5):** posisi berubah, tapi siklus kaki tidak terurai di 2 fps — kemungkinan glide/tween, bukan walk cycle penuh.
- **"HRMM" pink & "BROKE" pink:** pengecualian pola warna caption — hipotesis "pink = beat rentan" belum terbukti.

## Frame bukti kunci

`~/workspace/research/roblox-refs/teardown-frames/vid2/` (18 PNG, full-res 576×1024 kecuali wipe):
`vid2_01-03s_wipe-slide.png`, `vid2_01-5s_tower-opening.png`, `vid2_11-0s_shopkeeper-cap-drop.png`, `vid2_11-8s_teacher-1cap.png`, `vid2_21-0s_vendor-teal-cap.png`, `vid2_38-5s_red-cap-drop.png`, `vid2_49-9s_teacher-3caps.png`, `vid2_51-5s_tower-16.png`, `vid2_57-8s_twin-white-beanie.png`, `vid2_61-7s_tower-17.png`, `vid2_66-8s_tower-18.png`, `vid2_70-7s_tower-19.png`, `vid2_79-5s_hero-face-mask.png`, `vid2_82-3s_tower-toppling.png`, `vid2_84-5s_girl-teal-cap.png`, `vid2_86-3s_aftermath-twin-down.png`, `vid2_91-6s_one-orange-cap.png`, `vid2_95-5s_aerial-twin-down.png`.

## Artefak kerja (bukan deliverable)

`~/workspace/research/roblox-refs/teardown-work/vid2/` — frame 2 fps (208), 10 fps (1040), strip transisi per kandidat, strip 30 fps (wipe 1,0 & shopkeeper cap-drop 10,7–11,3), strip crane/fade, sheet kontak 13 lembar, daftar scene-detect 0.3/0.4.
