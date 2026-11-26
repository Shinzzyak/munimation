# Teardown per-frame — Video 1: ynbloxtv, "Every huss costs $1"

- File: `~/workspace/user/media_library/video/11/11031357fc15b59f493eeb5f4eeba6f4d21f8da0a1349a361c6bb60505c3c695.mp4`
- Durasi: **89,52 dtk**, 576×1024, 30 fps, vertikal. Audio AAC stereo.
- Metode: frame 2 fps (179 frame, dibaca semua via contact sheet 6×5 + strip 10 fps di tiap kandidat transisi + strip 30 fps di 2 titik ambigu + 12 frame full-size). Scene detection ffmpeg `gt(scene,0.3)` hanya sebagai kandidat — tiap kandidat diverifikasi visual.
- Frame bukti: `~/workspace/research/roblox-refs/teardown-frames/vid1/` (20 PNG).
- Transkrip rujukan: `vid1-transcript.json` (faster-whisper tiny) — dipakai hanya untuk pacing & timing kata, BUKAN dikutip mentah (slang "huss" konsisten salah dikenali sebagai "husk/hossassass/hush").

## 1. Verifikasi identitas — TERKONFIRMASI

Video ini **benar** video yang diklaim STUDY.md: ynbloxtv, 89,5 dtk, "Every huss costs $1".

Bukti frame:
- Watermark TikTok `@ynbloxtv` terbaca di semua frame (kiri bawah / kanan bawah).
- Kalimat pembuka di caption: "ON DIS BLOCK / EVERY HUSS / COST A DOLLA" (0–3 dtk), penutup: "SHE LEFT FOUR HOURS AGO" (77–79 dtk) lalu reprise "ON DIS BLOCK / EVERY HUSS / COST A DOLLA / AND IAN GOT NUN" (79–85 dtk).
- Tag harga melayang terkonfirmasi (lihat §4): $1 hero, $22, $212, $31→$30, $6→$5, counter lemonade $48.203.611→$0, $52, $14, $10.000. [KOREKSI parent 26 Nov 06:41: $22, bukan $23 — terbaca jelas di frame t=6–7 dtk.]
- Corner store (awning merah-putih, papan "…NER STORE") terkonfirmasi; lapangan basket siang→malam terkonfirmasi (siang 25–75 dtk, sunset 75–76 dtk, malam 76–85 dtk).
- End card TikTok (logo + search bar "@ynbloxtv") 85,43–89,52 dtk.

## 2. Ringkasan shot

- **30 shot total** (29 konten + 1 end card). Durasi konten 85,43 dtk.
- **Durasi rata-rata shot konten: 2,95 dtk; median 2,56 dtk; min 0,34 dtk; maks 7,50 dtk.**
- Kamera dominan: **statis + dolly-in cepat (punch-in)**. Tidak ada satu pun fade/dissolve — semua transisi antar shot adalah hard cut, kecuali 2 gerakan kamera kontinu yang sempat dikira cut (whip-pan 1,03 dtk dan dolly-out 35,4 dtk). Satu-satunya crane adalah penutup (79,27–85,43 dtk, kamera naik dari medium ke aerial).
- Struktur: 3 lokasi saja — corner store (0–13,3 dtk), interior toko + kelas (9,5–17,8 dtk), lapangan basket (25,3–85,4 dtk) — plus 2 vignette (lemonade stand 17,8–25,3 dtk, dan kelas). Lapangan basket dipakai untuk ~60 dtk dari 89 dtk, siang→sunset→malam.

## 3. Shot list lengkap

Luminansi = rata-rata grayscale 0–255 per shot dari frame 2 fps (INDIKATIF — lihat §7).
Caption = teks di frame (ejaan asli caption, bukan transkrip). Kata berwarna = kata yang sedang diucapkan saat frame itu (sistem karaoke, §5).
Pose: semua karakter Roblox blocky; "ekspresi" = decal wajah statis + tilt kepala + pose tubuh.

### S01 — 0,00–5,13 dtk (5,13 dtk) — Town + corner store, hero CU
- Kamera: **dolly pelan ke kanan** di atas kota (0–1,0 dtk) → **whip-pan/tilt down cepat** (~1,03–1,13 dtk, 2 frame intermediat di 30 fps) → **statis + dolly-in cepat** ke hero (1,13–5,13 dtk). BUKAN cut di 1,03 dtk.
- Framing: wide aerial kota → medium CU hero.
- Isi: kota blocky (bukit hijau, gedung belang warna-warni, awan kotak, water tower biru). Lalu hero di depan corner store: hoodie hitam, balaclava hitam, mata setengah terpejam (deadpan), tangan di sisi, diam. Kilau bintang emas kecil di dada (efek statis di hoodie).
- Tag $: hero **$1** (hijau, membesar seiring dolly-in sampai memenuhi 1/3 frame di 3,0 dtk). NPC latar lewat di tepi frame: baju ungu **$212**, baju merah **$40** (terpotong tepi, 4,9–5,0 dtk).
- Cahaya: siang terang. Lum town 0–1,0 dtk ~155–176; store CU ~65–110 (rata-rata shot 110,3 — angka campuran, jangan dipakai mentah).
- Teks diegetik: papan toko "…NER STORE" (CORNER STORE, kiri terpotong), awning merah-putih, poster kanan "WE DO / BREA…" (terpotong tepi frame, tidak terbaca penuh).
- Caption: "ON DIS BLOCK" (DIS kuning) → "EVERY HUSS" (HUSS kuning) → "COST A DOLLA" (A DOLLA kuning) → "AND IAN GOT" (AND kuning).

### S02 — 5,13–7,70 dtk (2,57 dtk) — Corner store, wide
- Kamera: statis. Transisi masuk: **hard cut** (5,13 dtk).
- Framing: wide, 2 karakter.
- Isi: hero ($1) + pria baju hijau ($22) di depan toko. "-$1" merah berkedip di atas kepala hero (~6,0 dtk).
- Tag $: hero $1, pria hijau $22, -$1 merah (flash).
- Cahaya: siang. Lum 116,1.
- Caption: "YOU HUSS" (HUSS kuning) → "IT COME RIGHT" (COME kuning) → "OUT YO POCKET" (YO kuning).

### S03 — 7,70–9,47 dtk (1,77 dtk) — Hero CU
- Kamera: statis. Masuk: **hard cut** (7,70 dtk).
- Framing: close-up hero (dada ke atas), $1 besar di atas kepala.
- Isi: hero diam, mata deadpan. Pose sama seperti S01 (pose-to-pose, tidak ada gerakan).
- Tag $: $1 hijau.
- Cahaya: siang, lebih gelap dari wide (background pintu biru gelap). Lum 79,4.
- Caption: "YOU BROKE" (BROKE kuning) → "YOU CAN'T HUSS" (CAN'T kuning).

### S04 — 9,47–13,33 dtk (3,86 dtk) — Interior toko, shopkeeper
- Kamera: statis lalu **dolly-in pelan** ke shopkeeper (11,2–11,8 dtk; kandidat scene 11,47 = false positive, BUKAN cut). Masuk: **hard cut** (9,47 dtk).
- Framing: medium → CU shopkeeper di balik meja kasir.
- Isi: shopkeeper (topi hitam, celemek merah, kemeja kotak) di balik meja cokelat; rak warna-warni di belakang (kotak merah/biru/kuning/ungu/hijau). Wajah: mata melirik ke samping, mulut kecil terbuka (cemas). Kepala statis.
- Tag $: **$31 → $30** (berubah ~11,3 dtk, bersamaan dengan "-$1" merah flash di atas rak). Hanya -$1 untuk chant "huss huss huss" 3× — lihat §4.
- Cahaya: interior terang. Lum 109,5.
- Teks diegetik: ujung papan kasir "…PS" (terpotong).
- Caption: "YOU CAN'T HUSS" (sisa dari S03, 9,5 dtk) → "HUSS HUSS HUSS" (HUSS terakhir oranye) → "THAT WAS MY" → "LUNCH" (LUNCH oranye/kuning).

### S05 — 13,33–17,77 dtk (4,44 dtk) — Kelas, guru
- Kamera: **dolly-in kontinu** dari wide kelas ke CU guru (13,3–14,2 dtk; kandidat 14,0 = false positive, BUKAN cut). Masuk: **hard cut** (13,33 dtk).
- Framing: wide (topi hitam + baju hijau hero di foreground bawah, blur) → medium CU guru.
- Isi: guru (botak, kacamata, rompi cokelat, dasi merah) di depan papan tulis; meja kayu + kursi biru/hijau. Guru statis, tangan di sisi.
- Tag $: guru **$6 → $5** (~15,0 dtk, "-$1" merah flash di atas). Lagi-lagi hanya -$1 untuk 3× "huss".
- Cahaya: interior kelas terang, netral. Lum 123,1.
- Teks diegetik: papan tulis "…DAY / …OWN PAPER / …KING" (kiri terpotong, tidak terbaca penuh).
- Caption: "LUNCH" (sisa) → "HUSS HUSS HUSS" (HUSS terakhir biru muda) → "I NEED TO" → "STOP DOING" (DOING biru) → "THAT" (THAT biru).

### S06 — 17,77–25,27 dtk (7,50 dtk) — Lemonade stand, counter raksasa
- Kamera: **dolly-in kontinu** wide → CU penjual lemonade (17,8–18,6 dtk; kandidat 18,37 = false positive). Masuk: **hard cut** (17,77 dtk). Shot terpanjang di video.
- Framing: wide stand → CU penjual.
- Isi: stand lemonade (awning kuning-putih, papan "LEMONADE 50¢", gelas + lemon di meja). Penjual: topi flat, rompi abu-abu, kalung rantai, mata setengah terpejam, deadpan total, kepala statis sepanjang 7,5 dtk.
- Tag $: counter **$48.203.611 → $48.203.529** (turun ~10–12/dtk saat tampil di CU; "-$1" merah berkedip berkala di atas counter). Lihat §4 untuk inkonsistensi laju.
- Cahaya: siang terang, paling terang di video. Lum 142,0.
- Caption: "THAT" (sisa) → "HUSS HUSS HUSS" (HUSS terakhir pink) → "HRMM" (pink) → "DAT'S SIX" (SIX kuning) → "BANDS A DAY" (BANDS kuning) → "KNOW HE DOIN" (KNOW kuning) → "IT" (kuning).

### S07 — 25,27–26,77 dtk (1,50 dtk) — Lapangan basket, two-shot
- Kamera: statis. Masuk: **hard cut** (25,27 dtk). Lokasi baru: lapangan basket (biru/oranye, ring, pagar hijau, gedung di belakang).
- Framing: medium two-shot.
- Isi: hero ($1, hitam) + "twin" ($14, jaket biru, topi putih, rambut hitam) berdiri di tengah lapangan, menghadap kamera. Bola basket oranye di lantai kanan. Keduanya statis.
- Tag $: hero $1, twin $14.
- Cahaya: siang terang. Lum 139,8.
- Caption: "IT" (sisa) → "ME?" (ME? kuning).

### S08 — 26,77–29,37 dtk (2,60 dtk) — Hero dari belakang, CU
- Kamera: statis. Masuk: **hard cut** (26,77 dtk).
- Framing: CU punggung/kepala hero dari belakang (tali masker terlihat), ring basket + pagar di belakang.
- Isi: hero diam membelakangi kamera. Pose hold penuh 2,6 dtk, tanpa gerakan.
- Tag $: **$1** hijau besar di atas kepala.
- Cahaya: siang, sedikit lebih redup (hero membelakangi cahaya). Lum 104,9.
- Caption: "ME?" (sisa) → "I BEEN SAVIN" (SAVIN kuning) → "DIS DOLLA" (DOLLA kuning) → "SINCE DA THIRD" (DA THIRD kuning) → "GRADE" (GRADE kuning).

### S09 — 29,37–31,73 dtk (2,36 dtk) — Two-shot basket
- Kamera: statis. Masuk: **hard cut** (29,37 dtk).
- Framing: medium two-shot (sama seperti S07).
- Isi: hero + twin, statis.
- Tag $: hero $1, twin $14.
- Cahaya: siang. Lum 126,7.
- Caption: "GRADE" (sisa) → "JUST HUSS" (HUSS hijau — warna twin, bukan hero) → "IT'S A DOLLAR" (DOLLAR hijau).

### S10 — 31,73–36,63 dtk (4,90 dtk) — Hero CU → dolly-out → pan ke cewek
- Kamera: statis (31,7–35,4) → **dolly-out cepat** ke two-shot (35,4–35,6; kandidat 35,43 = false positive, BUKAN cut — intermediat terlihat di 30 fps) → **pan kanan** melintasi lapangan (35,6–36,6, hero keluar kiri, cewek masuk kanan). Satu shot kontinu.
- Framing: CU hero → medium two-shot → medium cewek.
- Isi: hero mengeluarkan **dompet cokelat** di tangan kiri (~33,4 dtk, "DIS MY WHOLE BANK ACCOUNT"). Twin di kanan saat dolly-out. Lalu cewek: rambut pirang, topi putih-hijau, kaus hijau "NEW YORK", kalung, senyum + blush.
- Tag $: hero $1; twin $14; cewek **$52**. (Catatan: saat pan, tag $1 hero sempat tumpang tindih dengan $52 hingga terbaca "$152"/"$1552" di frame kecil — artefak overlap, BUKAN tag $1.552. Full-size f_0074 membuktikan $52.)
- Cahaya: siang. Lum 105,9.
- Teks diegetik: papan "PARK RULES / NO DUNKIN… / NO CR…" (terpotong cewek/tag, tidak terbaca penuh).
- Caption: "IT'S A DOLLAR" (sisa) → "A DOLLA?" (DOLLA kuning) → "A DOLLA??" → "DIS MY WHOLE" (WHOLE kuning) → "BANK ACCOUNT" (ACCOUNT kuning) → "TWIN" (TWIN kuning).

### S11 — 36,63–39,03 dtk (2,40 dtk) — Cewek CU
- Kamera: statis. Masuk: **hard cut / jump cut** (36,63 dtk, punch-in dari medium ke CU dalam 0,1 dtk tanpa intermediat).
- Framing: CU cewek (kepala–dada).
- Isi: cewek senyum, statis. $52 besar di atas kepala.
- Tag $: $52 hijau.
- Cahaya: siang. Lum 132,5.
- Caption: "TWIN" (sisa) → "HI" (HI pink) → "DO YOU HUSS?" (HUSS pink).

### S12 — 39,03–41,13 dtk (2,10 dtk) — Hero CU
- Kamera: statis. Masuk: **hard cut** (39,03 dtk).
- Framing: CU hero (dada ke atas).
- Isi: hero diam, deadpan.
- Tag $: $1 hijau.
- Cahaya: siang. Lum 105,6.
- Caption: "DO YOU HUSS?" (sisa) → "I'M BETWEEN" (I'M kuning) → "HUSSES RIGHT" (RIGHT kuning) → "NOW" (NOW kuning).

### S13 — 41,13–47,63 dtk (6,50 dtk) — Twin medium → CU (dolly-in)
- Kamera: **dolly-in kontinu** dari medium ke CU twin (41,1–42,0 dtk; kandidat 41,73 = false positive). Masuk: **hard cut** (41,13 dtk) — tepat di jeda hening 40,75–41,75 dtk (audio sunyi total).
- Framing: medium (twin utuh + bola basket di lantai) → CU.
- Isi: twin statis, menatap kamera. Bola basket oranye diam di lantai kanan sepanjang shot.
- Tag $: twin $14 (tidak pernah berubah sepanjang video).
- Cahaya: siang. Lum 131,9.
- Caption: (hening 41,13–42,0, tanpa caption) → "YOU SHOULD" (SHOULD hijau) → "HAVE HUSSED" (HUSSED hijau) → "SO I SAID" (SAID hijau) → "BET" (BET kuning — kata hero) → "IMA HUSS FA" (FA kuning) → "HER" (HER kuning) → "TODAY DA DAY" (DA DAY kuning).

### S14 — 47,63–50,57 dtk (2,94 dtk) — Hero CU
- Kamera: statis. Masuk: **hard cut** (47,63 dtk).
- Framing: CU hero.
- Isi: hero diam.
- Tag $: $1 hijau.
- Cahaya: siang. Lum 99,5.
- Caption: "TODAY DA DAY" (sisa) → "ERRBODY BACK" (BACK kuning) → "UP" (UP kuning) → "IAN DOIN DIS" (DOIN DIS kuning) → "TWICE" (TWICE kuning).

### S15 — 50,57–53,33 dtk (2,76 dtk) — Twin CU
- Kamera: statis. Masuk: **hard cut** (50,57 dtk).
- Framing: CU twin.
- Isi: twin statis.
- Tag $: $14 hijau.
- Cahaya: siang. Lum 135,0.
- Caption: "TWICE" (sisa) → "WAIT" (WAIT hijau) → "ME TO COUNT" (COUNT hijau) → "YOU IN OR" (OR hijau).

### S16 — 53,33–53,67 dtk (0,34 dtk) — Two-shot, gestur "hush"
- Kamera: statis. Masuk: **hard cut** (53,33 dtk). Shot tersingkat di video.
- Framing: medium two-shot.
- Isi: **satu-satunya gestur tangan jelas di video** — lengan kanan hero terangkat (isyarat "hush"/berhenti) sementara twin di kanan. Pose berubah dalam 0,34 dtk lalu cut.
- Tag $: hero $1, twin $14.
- Cahaya: siang. Lum 100,2.
- Caption: "YOU IN OR" (sisa) → "HUSH" (HUSH kuning).

### S17 — 53,67–55,30 dtk (1,63 dtk) — Hero CU, $1 → $0
- Kamera: statis. Masuk: **hard cut** (53,67 dtk).
- Framing: CU hero.
- Isi: hero diam. **Momen kunci aturan**: tag hero berubah $1 → **$0** tepat di cut ini, dengan "-$1" merah besar di kanan atas (53,7 dtk). Kata "hush" barusan yang memotong $1 terakhirnya.
- Tag $: $0 (HIJAU di CU — bandingkan §4), -$1 merah (flash, lalu hilang).
- Cahaya: siang. Lum 102,1.
- Caption: "HUSH" (sisa) → "TWIN" (TWIN kuning) → (hening 54,24–55,54 dtk, tanpa caption).

### S18 — 55,30–56,37 dtk (1,07 dtk) — Twin CU
- Kamera: statis. Masuk: **hard cut** (55,30 dtk).
- Framing: CU twin.
- Isi: twin statis.
- Tag $: $14 hijau.
- Cahaya: siang. Lum 136,1.
- Caption: (hening) → "THAT COUNTED" (COUNTED hijau).

### S19 — 56,37–58,93 dtk (2,56 dtk) — Hero CU $0 → dolly-out ke two-shot
- Kamera: statis (56,4–57,5) → **dolly-out** ke two-shot (57,5–58,9; kandidat 57,5 = false positive, BUKAN cut). Masuk: **hard cut** (56,37 dtk).
- Framing: CU hero → medium two-shot.
- Isi: hero diam. Saat kamera mundur, tag $0 hero berubah warna hijau → **MERAH** (di two-shot, 57,5 dtk). Twin di kanan.
- Tag $: hero $0 (hijau di CU, merah di two-shot), twin $14.
- Cahaya: siang. Lum 118,9.
- Caption: "THAT COUNTED" (sisa, COUNTED hijau) → "I SAID HUSH!" (HUSH kuning, bertahan sampai akhir shot).

### S20 — 58,93–60,67 dtk (1,74 dtk) — Hero CU $0
- Kamera: statis. Masuk: **hard cut** (58,93 dtk, tepat setelah jeda hening 57,75–59,0 dtk).
- Framing: CU hero.
- Isi: hero diam.
- Tag $: $0 hijau.
- Cahaya: siang. Lum 110,6.
- Caption: (hening) → "SINCE DA THIRD" (DA THIRD kuning) → "GRADE" (GRADE kuning) → "TWIN" (TWIN kuning).

### S21 — 60,67–61,90 dtk (1,23 dtk) — Hero wide di lapangan
- Kamera: statis. Masuk: **hard cut** (60,67 dtk).
- Framing: wide, hero kecil di tengah lapangan.
- Isi: hero utuh berdiri di tengah lapangan; twin di kanan. **Penjual lemonade masuk frame berjalan dari kiri** (~61,5 dtk) — satu-satunya locomotion (jalan kaki, beberapa langkah) di video.
- Tag $: hero $0 (merah, kecil), twin $14; counter lemonade $48.195.185→184 (kecil di atas kepalanya saat lewat).
- Cahaya: siang. Lum 132,4.
- Caption: "TWIN" (TWIN kuning).

### S22 — 61,90–63,93 dtk (2,03 dtk) — Lemonade CU, kembali
- Kamera: statis. Masuk: **hard cut** (61,90 dtk).
- Framing: CU penjual lemonade.
- Isi: penjual deadpan, statis. Counter terus turun.
- Tag $: counter **$48.195.183 → $48.195.162** (~10/dtk).
- Cahaya: siang, paling terang (lum 147,3 — tertinggi di video).
- Teks diegetik: papan "PARK RULES / NO DUNKIN… / NO CR…" di belakang.
- Caption: "TWIN" (sisa) → "BRUH WYD BRUH" (WYD pink, dua kali).

### S23 — 63,93–64,43 dtk (0,50 dtk) — Two-shot transfer $10.000
- Kamera: statis. Masuk: **hard cut** (63,93 dtk).
- Framing: medium two-shot (lemonade kiri, hero kanan).
- Isi: **transfer uang**: "-$10.000" merah besar di atas penjual lemonade + "+$10.000" hijau di atas hero (terpotong tepi kanan) + tag baru hero **$10.000** hijau. Counter lemonade jatuh $48.195.157 → $48.185.157 (persis -$10.000). Tangan penjual terangkat ke wajah (gestur "bayar"/menyerah).
- Tag $: lemonade $48.185.157, hero $10.000.
- Cahaya: siang. Lum 124,4.
- Caption: "BRUH WYD BRUH" (sisa) — transfer terjadi SEBELUM VO menjelaskannya (VO "Ten bands…" baru di 69,4 dtk; VO saat transfer: "For the huss", 64,7 dtk).

### S24 — 64,43–67,17 dtk (2,74 dtk) — Lemonade CU
- Kamera: statis. Masuk: **hard cut** (64,43 dtk).
- Framing: CU penjual lemonade.
- Isi: penjual deadpan, statis.
- Tag $: counter **$48.185.155 → $48.185.126** (~10/dtk).
- Cahaya: siang. Lum 141,5.
- Caption: "FOR THE HUSS" (THE pink) → "IT WAS A" (A pink) → "GOOD ONE" (ONE pink).

### S25 — 67,17–72,43 dtk (5,26 dtk) — Hero CU $10.000, lengan terbuka
- Kamera: statis. Masuk: **hard cut** (67,17 dtk).
- Framing: CU hero (dada ke atas).
- Isi: hero **kedua lengan terbuka ke samping** (pose "flex"/pamer, ditahan ~5 dtk — pose hold terpanjang). Dompet tidak terlihat lagi.
- Tag $: **$10.000** hijau besar.
- Cahaya: siang. Lum 114,2.
- Caption: "GOOD ONE" (sisa) → "IAN EEN HUSS!" (EEN kuning) → "TEN BANDS" (BANDS kuning) → "DAT'S TEN" (TEN kuning) → "THOUSAND HUSS" (HUSS kuning) → "TWIN" (TWIN kuning).

### S26 — 72,43–73,93 dtk (1,50 dtk) — Two-shot, awal drain
- Kamera: statis. Masuk: **hard cut** (72,43 dtk).
- Framing: medium two-shot (hero kiri, twin kanan).
- Isi: hero lengan masih sedikit terangkat (sisa pose S25), lalu turun. Twin statis.
- Tag $: hero $10.000 → **$9.999** (-$1 merah flash, 73,5 dtk), twin $14.
- Cahaya: siang. Lum 133,2.
- Caption: "TWIN" (sisa) → "HUSS HUSS HUSS!" (HUSS terakhir kuning).

### S27 — 73,93–76,90 dtk (2,97 dtk) — Hero CU, drain montage + sunset→malam
- Kamera: statis. Masuk: **hard cut** (73,93 dtk).
- Framing: medium CU hero, dompet cokelat terlihat lagi di tangan kiri.
- Isi: hero diam sementara counter-nya **anjlok**: $9.998 → $9.968 → $9.899 → $9.168 → $3.831 → $1.337 → $960 → $738 → $39 → $35 → $28 → $18 → $9 → $2 → **$0** (merah). "-$1" merah berkedip terus sebagai penanda simbolik tiap "huss", padahal angka jatuh ratusan–ribuan per frame. **Perubahan cahaya dalam shot**: sunset oranye + lampu jalan menyala (75,0–75,9 dtk) → **snap gelap ke malam** (~76,0 dtk, tanpa cut — framing dan pose tidak berubah, hanya lighting yang ganti dalam 0,1 dtk). Kandidat scene 76,0 = BUKAN cut, melainkan lighting snap (time-lapse).
- Tag $: $10.000 → $0 (lihat §4 untuk laju).
- Cahaya: siang → sunset oranye (lum ~103) → malam gelap (lum ~49–68). Rata-rata shot 89,1 (campuran).
- Caption: "HUSS HUSS HUSS" (HUSS pertama kuning, lalu HUSS terakhir kuning) berulang; tanpa caption setelah $0 (76,6–76,9 dtk).

### S28 — 76,90–79,27 dtk (2,37 dtk) — Twin CU, malam
- Kamera: statis. Masuk: **hard cut** (76,90 dtk).
- Framing: CU twin, malam (langit gelap, pagar + gedung redup).
- Isi: twin statis, menatap kamera. Ekspresi datar.
- Tag $: $14 hijau (tidak berubah — dia tidak pernah "huss").
- Cahaya: malam, gelap. Lum 67,3.
- Caption: "SHE LEFT FOUR" (SHE hijau di 77,0 dtk → FOUR hijau di 77,5 dtk — karaoke berjalan kata per kata) → "HOURS AGO" (HOURS hijau → AGO putih).

### S29 — 79,27–85,43 dtk (6,16 dtk) — Hero malam + crane naik ke aerial
- Kamera: statis medium (79,3–82,0) → **crane naik + tilt down** progresif ke aerial lapangan (82,0–85,4; kedua karakter mengecil sampai jadi titik). Satu-satunya crane di video. Masuk: **hard cut** (79,27 dtk).
- Framing: medium hero → high-angle → aerial (lapangan utuh + jalan + pepohonan).
- Isi: hero ($0 merah) + twin ($14) berdiri diam di lapangan malam, mengecil seiring kamera naik. Kilat cahaya putih menyapu lapangan ~85,3 dtk (bersamaan dengan burst audio, §6).
- Tag $: hero $0 merah, twin $14 hijau.
- Cahaya: malam, lapangan diterangi lampu (lum 55–89, rata-rata 67,4).
- Caption: (hening 79,1–79,8) → "ON DIS BLOCK" (DIS kuning — reprise pembuka) → "EVERY HUSS" (HUSS kuning) → "COST A DOLLA" (A DOLLA kuning) → "AND IAN GOT" (AND kuning) → "NUN" (NUN kuning, 83,0–85,4 dtk, caption terakhir).

### S30 — 85,43–89,52 dtk (4,09 dtk) — End card TikTok
- Kamera: statis (grafis). Masuk: **hard cut** (85,43 dtk).
- Isi: layar hitam, logo TikTok + animasi loading bar (cyan/merah) → search bar "@ynbloxtv".
- Cahaya: hitam. Lum 20,6.
- Audio: burst keras 85,25–86,25 dtk (puncak -5,1 dBFS) lalu **sunyi digital total 86,75–89,52 dtk** — tidak ada suara di 2,8 dtk terakhir meski end card masih tampil.

## 4. Sistem tag $ — ledger lengkap (yang terlihat di frame)

| Karakter | Tag awal → akhir | Perubahan yang terlihat |
|---|---|---|
| Hero | $1 → $0 → $10.000 → $0 | $1 (0–53,6 dtk) → $0 (53,7 dtk, kata "hush") → $10.000 (64,2 dtk, transfer) → $0 (73,5–76,6 dtk, drain) |
| Twin (baju biru) | $14 → $14 | TIDAK PERNAH berubah |
| Pria hijau (toko) | $22 | statis, 1 shot |
| NPC ungu (latar) | $212 | statis |
| NPC merah (latar) | $40 | statis, terpotong tepi |
| Shopkeeper | $31 → $30 | -$1 sekali untuk chant 3× "huss" |
| Guru | $6 → $5 | -$1 sekali untuk chant 3× "huss" |
| Penjual lemonade | $48.203.611 → $48.185.126 | counter turun; -$10.000 sekali (transfer 64,2 dtk) |
| Cewek "NEW YORK" | $52 | statis |

Aturan visual tag:
- Tag hijau = saldo normal; **-$X merah** = pengurang, muncul sebagai flash besar 0,3–1,0 dtk di atas tag lalu hilang.
- **$0 hero berwarna HIJAU di CU** (S17, S19-CU, S20) tapi **MERAH di wide/two-shot/crane** (S19-two-shot, S21, S27-akhir, S29). Inkonsistensi warna yang sama untuk nilai yang sama — kemungkinan disengaja (merah = "broke" ditekankan saat ada karakter lain di frame) atau inkonsistensi authoring; tidak bisa dipastikan dari frame.
- **Counter BUKAN simulasi konsisten** (temuan besar, §8.1): laju turunnya berubah-ubah seenaknya — ~10–12/dtk saat tampil CU di lemonade scene (18–25 dtk), ~200+/dtk di luar layar (antara 25,3 dan 61,9 dtk counter jatuh 8.349), lalu ~4.400/dtk saat drain montage (73,9–76,9 dtk: $9.999 → $0 dalam ~2,5 dtk). "-$1" merah tetap berkedip sebagai simbol tiap "huss" sementara angka jatuh ratusan per frame. Jadi counter = gag visual, bukan akuntansi 1 huss = $1.

## 5. Sistem caption (karaoke per-speaker)

- Posisi: bawah tengah, ~68–75% tinggi frame; font bold putih + outline hitam tebal; 1 baris, 1–3 kata per caption (VO panjang dipecah jadi bite 0,5–1,0 dtk).
- **Satu kata berwarna pada satu waktu: kata yang sedang diucapkan.** Warna = identitas pembicara: hero/narator **kuning**, twin **hijau**, cewek **pink**, penjual lemonade **pink**, shopkeeper **oranye**, guru **biru muda**. Kata yang sudah lewat kembali putih.
  - Bukti: "SHE LEFT FOUR" — SHE hijau di 77,0 dtk, FOUR hijau di 77,5 dtk (f_0155 vs f_0156); "HUSS HUSS HUSS" — HUSS yang sedang diucapkan yang berwarna (oranye di toko, biru di kelas, pink di lemonade, kuning di hero).
  - "HUSS HUSS HUSS" diulang di 4 scene dengan warna berbeda-beda sesuai pembicara/scene — jadi warna BUKAN properti kata, melainkan properti pembicara.
  - Kasus batas: "JUST HUSS" + "IT'S A DOLLAR" (29,9–31,5 dtk) berwarna hijau (twin) meski kamera di S10 sudah CU hero — dibaca sebagai twin yang bicara + reaction shot hero. Sebaliknya di scene lemonade, kalimat narator tentang penjual ("DAT'S SIX BANDS A DAY", "KNOW HE DOIN") berwarna kuning (narator), sementara ucapan penjual sendiri ("HRMM", "BRUH WYD BRUH", "FOR THE HUSS") pink.
- Caption kadang **menyeberangi cut** (teks bertahan 0,3–0,4 dtk ke shot berikut, mis. "THAT COUNTED" di S19, "LUNCH" di S05, "IT'S A DOLLAR" di S10) dan kadang **muncul sebelum VO** (transfer $10.000 divisualkan 64,2 dtk, VO penjelas "Ten bands…" baru 69,4 dtk — show dulu, explain kemudian).
- Ejaan caption memakai dialek: "ON DIS BLOCK", "IAN GOT", "OUT YO POCKET", "DAT'S SIX", "IAN EEN HUSS", "ERRBODY BACK", "NUN". Jangan samakan dengan transkrip whisper (yang menulis "husk/hossassass").

## 6. Audio (diukur, bukan ditebak)

- **Tidak ada music bed.** RMS per detik -13 s.d. -21 dBFS selama VO; semua detik "keras" berimpit dengan kata-kata di transkrip. Tidak ada blok musik berkelanjutan di segmen mana pun.
- **Tidak ada SFX yang teridentifikasi terpisah dari waveform.** Tidak ada transient khas (cha-ching dsb.) yang menonjol di luar VO — kecuali satu burst di bawah. Catatan: saya tidak memutar audio dengan telinga; SFX pelan yang tertutup VO tidak akan terlihat di RMS.
- Pacing VO (dari word timings transkrip, 180 kata, 0–83,4 dtk): rata-rata keseluruhan ~2,1 kata/dtk; dalam-ujaran 3,0–4,3 kata/dtk. Segmen tercepat dalam-ujaran: 41,1–50,6 dtk (4,21 kata/dtk) dan 50,6–58,9 dtk (4,25 kata/dtk) — bagian debat hero vs twin. Segmen terlambat: 67,2–76,9 dtk (1,34 kata/dtk keseluruhan — didominasi chant + jeda).
- **Jeda hening disengaja (sunyi digital, -180 dBFS):** 40,75–41,75 dtk (~1,0 dtk, sebelum "You should…"), 57,75–59,0 dtk (~1,25 dtk), 61,0–61,75 dtk (~0,75 dtk), 86,75–89,52 dtk (~2,8 dtk, ekor). Plus jeda antar-kata 0,7–1,6 dtk di 19 titik (terpanjang 1,64 dtk sebelum "Since the third grade, twin?", 57,5–59,1 dtk).
- **Burst akhir 85,25–86,25 dtk, puncak -5,1 dBFS** (paling keras di video, ~10 dB di atas VO biasa) — melintasi cut ke end card; ada kilat cahaya di frame 85,3 dtk. Isinya tidak bisa ditentukan dari waveform saja (teriakan kalimat terakhir ATAU sting outro TikTok).
- Audio lantai rendah ~-20 dBFS di 83,5–85,0 dtk (di bawah crane shot) — isi tak teridentifikasi dari waveform.
- **Koreksi transkrip:** kata terakhir transkrip ("I'm a hussass", ditulis di 89,14 dtk) MUSTAHIL benar — audio 86,75–89,52 dtk sunyi digital total dan frame sudah end card. Kalimat terakhir itu pasti burst 85,25–86,25 dtk; timing tiny meleset ~4 dtk di ekor.

## 7. Cahaya

- Siang (0–75 dtk): lum 100–147 per shot. Paling terang: lemonade CU S22 (147,3) dan lemonade wide S06 (142,0). Paling gelap di siang: hero CU di depan pintu toko S03 (79,4) — background gelap, bukan cahaya redup.
- Sunset (75,0–75,9 dtk): langit oranye, lampu jalan menyala, lum ~103.
- Malam (76,0–85,4 dtk): lum 48–89 (S28: 67,3; S29: 67,4). Langit hitam, gedung redup, lapangan tetap terbaca (lampu).
- End card: lum 20,6 (hitam).
- Cahaya = penceritaan waktu: siang (aturan dijelaskan) → sunset (uang habis) → malam (punchline "She left four hours ago") → crane naik. Perubahan siang→sunset→malam terjadi DALAM satu shot (S27, lighting snap ~76,0 dtk), bukan lewat cut — lokasi sama, waktu berubah.
- Angka luminansi di atas INDIKATIF: rata-rata grayscale frame penuh (termasuk caption/tag/watermark), bukan pengukuran cahaya set.

## 8. Gerakan karakter — pose-to-pose, BUKAN kontinu

- **Hampir semua gerakan adalah pose hold + snap change di cut.** Karakter diam total dalam shot (kepala/tangan tidak bergerak selama 2–7 dtk), lalu pose berbeda di shot berikut. Tidak ada walk cycle kecuali satu: penjual lemonade berjalan masuk frame di S21 (~61,5 dtk, beberapa langkah).
- Gestur tangan yang teramati (hanya 4 momen): (1) hero angkat lengan kanan "hush" (S16, 0,34 dtk); (2) hero lengan terbuka lebar (S25, ditahan ~5 dtk); (3) penjual lemonade tangan ke wajah saat transfer (S23); (4) hero pegang dompet (S10, S27).
- Wajah: decal statis, tidak ada animasi mulut/kedip yang teramati di sampling 2 fps. "Ekspresi" = decal bawaan tiap karakter (hero deadpan setengah-terpejam, penjual lemonade deadpan, shopkeeper cemas melirik, cewek senyum+blush, guru netral, twin netral). Akting disampaikan lewat pose snap + tag $ + caption, bukan lewat wajah.
- Kamera yang "bergerak": dolly-in cepat (punch-in) adalah gerakan kamera paling sering — dipakai sebagai penekanan tiap beat (S01, S04-ekor, S05, S06, S13). Dolly-out 2× (S10, S19), pan 1× (S10), crane 1× (S29), whip-pan 1× (S01). Sisanya statis.

## 9. Audit scene detection (ffmpeg scene>0,3 → 40 kandidat)

- **Terkonfirmasi hard cut: 25 kandidat.**
- **False positive: 9** — semuanya gerakan kamera cepat atau flash UI, BUKAN cut:
  - 3,03 — dolly-in cepat (S01); 14,0 — dolly-in kelas (S05); 18,37 — dolly-in lemonade (S06); 21,83 — flash "-$1" merah di CU statis; 23,73 — pergantian caption di CU statis; 11,47 — dolly-in shopkeeper (S04); 35,43 — dolly-out (S10); 41,73 — dolly-in twin (S13); 57,5 — dolly-out (S19).
- **Bukan cut tapi nyata: 2** — 76,0 lighting snap sunset→malam dalam shot (S27); 1,03 whip-pan down (S01, gerakan kamera kontinu, 2 frame intermediat di 30 fps).
- **Cut ganda rapat: 2 pasang** — 53,33 + 53,67 (two-shot 0,34 dtk di antaranya); 63,93 + 64,43 (two-shot transfer 0,50 dtk).
- Pelajaran: di video ini, scene-diff tinggi hampir selalu berarti "kamera punch-in" atau "tag $ berubah/flash", bukan potongan. Verifikasi visual wajib — angka diff saja menyesatkan.

## 10. Koreksi atas STUDY.md

1. **Tag $ jauh lebih banyak dari yang ditulis.** STUDY.md menyebut "$22, -$1, $1, $14". Yang benar (semua terbaca di frame): $1, $14, $22, $40, $52, $212, $31→$30, $6→$5, counter $48.203.611→$0, $10.000. [KOREKSI parent 26 Nov 06:41: $22 ADA di two-shot corner store t=6–7 dtk — bukti `teardown-check/cs_t6.png`, `cs_t7.0.png`. Klaim awal "tidak ada $22" salah baca.]
2. **Caption keyword BUKAN "hijau" secara umum.** Sistemnya karaoke per-speaker: hero kuning, twin hijau, cewek pink, lemonade pink, shopkeeper oranye, guru biru muda. "FOUR hijau" benar hanya pada momen kata "four" diucapkan (77,5 dtk); di 77,0 dtk yang hijau adalah "SHE". Klaim "YOU SHOULD / SHE LEFT FOUR — FOUR hijau" sebagai fakta statis menyesatkan.
3. **"She left four hours ago" — benar, tapi konteksnya perlu diluruskan.** Kalimat itu diucapkan TWIN (caption hijau), bukan hero/narator, di malam hari (S28, 76,9–79,3 dtk), sebagai punchline setelah hero menghabiskan $10.000 — bukan sekadar "beat cinta" penutup. Lalu video masih lanjut 6 dtk reprise + crane.
4. **Counter lemonade BUKAN "uang yang dihitung" secara konsisten.** STUDY.md ("uang LITERALLY muncul/hilang") benar sebagai gag visual, tapi laju counter inkonsisten total (§4): ~10/dtk di CU, ~200+/dtk di luar layar, ~4.400/dtk saat drain. Jangan ditiru sebagai sistem simulasi; tiru sebagai gag.
5. **Transfer $10.000 mendahului penjelasannya.** Visual transfer terjadi 64,2 dtk; VO "Ten bands / that's 10,000 huss" baru 69,4–72,0 dtk. Urutan show-dulu-explain-kemudian ini tidak dicatat di STUDY.md.
6. **"Lapangan basket SIANG dan MALAM (lokasi sama, waktu berubah)" — benar, tapi ada SUNSET di antaranya** (75,0–75,9 dtk, langit oranye + lampu jalan menyala), dan perubahan waktu terjadi dalam SATU shot via lighting snap, bukan via cut.
7. **"Hero nabung 1 dolar sejak kelas 3 SD" — benar** ("I BEEN SAVIN DIS DOLLA SINCE DA THIRD GRADE", S08, 26,8–29,4 dtk), dan diulang sebagai callback ("SINCE DA THIRD GRADE, TWIN?", S20, 58,9–60,7 dtk).
8. **Durasi 89,5 dtk — benar** (89,52 dtk terukur). Watermark @ynbloxtv terkonfirmasi di frame.
9. Transkrip tiny: kata slang "huss" dikenali sebagai "husk / hossassass / hush" — jangan kutip transkrip mentah. Timing kata terakhir meleset ~4 dtk (lihat §6).

## 11. Batas kejujuran (yang TIDAK bisa dipastikan dari frame)

- Kecepatan kamera (dolly/crane/pan): hanya klasifikasi jenis + perkiraan "cepat/pelan" dari frame intermediat; tidak ada angka m/s atau derajat/dtk.
- Kedip/mikro-ekspresi <0,5 dtk: sampling 2 fps + strip 10 fps tidak bisa menangkapnya; klaim "wajah statis" berlaku pada resolusi sampling ini.
- Blink/gerak kecil di antara frame 2 fps (mis. tangan bergerak lalu kembali) tidak tercakup.
- Isi burst audio 85,25–86,25 dtk (teriakan vs sting outro) dan audio lantai 83,5–85,0 dtk: tidak teridentifikasi dari waveform; saya tidak mendengarkan audio.
- SFX pelan di bawah VO (mis. cha-ching) tidak bisa disingkirkan dari RMS saja.
- Teks diegetik yang terpotong tepi frame tidak terbaca penuh: poster toko "WE DO / BREA…", papan tulis "…DAY / …OWN PAPER / …KING", papan taman "PARK RULES / NO DUNKIN… / NO CR…".
- Alasan warna $0 hijau-di-CU vs merah-di-wide: teramati konsisten, penyebabnya (sengaja vs inkonsistensi) tidak bisa dipastikan.
- Apakah 1,03 dtk whip-pan atau cut 1-frame: 2 frame intermediat di 30 fps mendukung gerakan kontinu, tapi dissolve 1 frame tidak bisa disingkirkan 100%.
- Angka luminansi = rata-rata grayscale frame penuh (termasuk caption/tag), indikatif saja.
- Word timings transkrip tiny bisa meleset ±0,3 dtk per kata (dan ~4 dtk di ekor); pacing §6 memakai angka itu apa adanya.
