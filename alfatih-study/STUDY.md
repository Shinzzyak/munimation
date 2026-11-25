# Studi video: "Seri Al-Fatih — Meriam Raksasa" (@alfatihmotion)

Sumber: video kiriman Avres, 25 Nov 2026 01:07 WIB.
File: `workspace/user/media_library/video/37/37d690b1d187ef63041658c696117fdbfd41d0cadcf21478b68087597f2af0c0.mp4`
Format: 720×1280 vertical, 30 fps, h264 + AAC, 117 detik, 18 MB.
Metode: frame tiap 2 detik (58 frame, dibaca 10 frame kunci visual), transkrip VO via
faster-whisper tiny (venv lokal), analisis spektral audio, caption bawaan video sebagai
teks acuan. Caption = VO kata-per-kata (whisper mengonfirmasi, beda kecil karena
mishear model tiny: "18 meter" → caption "8 m", "Sternahton" → "½ ton").

## 1. Struktur — 9 beat dalam 117 detik

| Beat | Waktu | Isi |
|---|---|---|
| HOOK | 0–7 dtk | Close-up moncong meriam, sunset. "Meriam raksasa Al-Fatih ini dibuat oleh orang yang dulu menawarkan jasanya ke musuhnya sendiri." Paradoks di 3 detik pertama. Lalu title card "— SERI — Al-Fatih". |
| SETUP | 7–20 dtk | Awal 1452, Orban (ahli meriam Hungaria) → Kaisar Konstantinus XI. Tertarik, tapi uang nggak cukup, gaji kecil pun nggak dibayar teratur. |
| TURN | 20–27 dtk | Tahun itu juga Orban pindah ke Edirne, ibu kota Sultan. + peta hitam: Edirne → Konstantinopel, "225 km". |
| PERTANYAAN | 27–37 dtk | Sultan bertanya: bisa bikin meriam yang menghancurkan tembok Konstantinopel? Kutip Doukas: Orban jawab bisa, "Babilon pun bisa." |
| BUILD + TEST | 37–51 dtk | Meriam dicor dari perunggu, panjang 8 m, peluru batu lebih dari ½ ton. Januari 1453 diuji di Edirne: peluru terbang ~1,6 km, masuk hampir 2 m ke tanah. |
| JOURNEY | 51–66 dtk | Meriam dibawa ratusan orang, cuma ~4 km sehari. Dipasang di depan tembok dekat tenda Sultan, dikelilingi meriam kecil. Pasukan menjuluki barisan itu "beruang dan anak-anaknya". |
| LIMIT | 66–79 dtk | Lambat: paling banyak 7 tembakan sehari. Laras disiram minyak hangat tiap habis menembak, tapi tetap retak. Tiap malam pembela kota menambal tembok rusak dengan tanah dan kayu. |
| KREDIBILITAS | 79–94 dtk | Ada hadis memuji panglima penakluk Konstantinopel (riwayat Ahmad dan al-Hakim). Ulama beda pendapat soal derajatnya: al-Hakim dan as-Suyuthi menilai sahih, al-Albani menilai daif. "Yang jelas, kota itu nggak jatuh oleh satu meriam saja." |
| CLIFFHANGER + POLL | 94–117 dtk | "Terus, apa lagi yang disiapkan Al-Fatih?" → role-play jadi Kaisar (kas menipis, Orban menawarkan jasa) → A: Bayar walau kas habis / B: Tolak, biarkan pergi → tulis A/B di komentar + follow @alfatihmotion. |

Pola retensi: hook paradoks (3 dtk) → pertanyaan terbuka (27 dtk) → angka sebagai
bukti (8 m, ½ ton, 1,6 km, 2 m, 4 km/hari, 7 tembakan/hari, 225 km) → kejujuran
("nggak jatuh oleh satu meriam saja") → penonton diposisikan sebagai pengambil
keputusan → poll + follow CTA. Tidak ada shot yang diam lebih dari ~3 detik.

## 2. Visual — gaya yang sama dengan pipeline kita

- Karakter 2.5D: kepala bulat, badan stick-figure, ink outline tebal, warna datar.
  Satu rig dasar, dibedakan topi/jubah/warna: Orban (topi coklat + jubah biru +
  kumis), Sultan (serban putih + jubah merah), Kaisar (mahkota emas berpermata +
  jubah merah + jenggot abu), pekerja (topi merah).
- Dunia three.js: kota, benteng, jembatan, ladang, interior istana. DOF aktif
  (background blur), grade hangat golden-hour di eksterior, interior hangat
  cahaya obor, malam biru gelap.
- Trik malam: karakter di scene malam diberi rim-light hijau neon supaya tetap
  kebaca di gelap (frame ~78 dtk). Tanpa itu mereka hilang di background.
- Kerumunan = duplikat instanced puluhan pekerja topi merah (scene tarik meriam,
  ~52 dtk). Dari jauh tidak butuh variasi animasi per orang.
- Kamera: push-in pelan (moncong meriam 0–2 dtk), orbit, aerial lebar, top-down
  (formasi "beruang", ~64 dtk), POV dari moncong meriam ke tembok (~92 dtk),
  close-up wajah untuk emosi (Kaisar, Orban nyengir).
- Bayangan panjang golden-hour dipakai sebagai elemen komposisi (aerial formasi).

## 3. Caption — ini yang paling beda dari render bridge kita

- Caption bakar di video, kata-per-kata sama dengan VO, 2–6 kata per kartu,
  ganti tiap ~1,5–2,5 detik, sinkron dengan frasa VO.
- Gaya: putih tebal + outline hitam tebal, tengah-bawah, tanpa kotak background.
  Beda dengan subtitle biasa: frasa pendek, bukan kalimat penuh.
- Title card: "— SERI —" kecil letterspaced di atas nama besar "Al-Fatih"
  (font display tebal, outline). Muncul sekali di ~7 dtk.
- Data callout digambar DI DALAM dunia 3D: garis dimensi "8 m" di laras meriam,
  label "½ ton" di bola batu, "1,6 km", "hampir 2 m", "4 km sehari".
- Peta = kartu terpisah: background hitam, garis putih tipis, "225 km" besar,
  label kota/laut, garis rute + titik, scale bar 0–50 km. Durasi ~3 detik.
- End card poll: scene digelapkan, header "@alfatihmotion menantang",
  "Kamu pilih yang mana?", tombol A (highlight emas) / B, Orban + Kaisar
  mengapit peti koin. VO: "Tulis A atau B di komentar. Dan follow alfatihmotion."

## 4. Audio

- VO: satu narator pria Bahasa Indonesia, register kasual ("nggak", "aja",
  "terus"), kontinu hampir tanpa jeda (whisper VAD: speech 0–116 dtk).
  Karakter suara konsisten dengan Edge-TTS id-ID pria (pola yang sama seperti
  video zainalsalamun: Edge-TTS gratis).
- Musik bed tipis di bawah VO sepanjang video (RMS stabil 0,13–0,17, tidak ada
  segmen senyap). SFX dentuman meriam pelan di mix (lonjakan low-freq 48–54 dtk
  test fire, 108–114 dtk akhir) — bukan dentuman besar.
- Tidak ada VO ganda, tidak ada dialog karakter; semua narasi dari narator.

## 5. Fakta — video ini unusually careful

- Angka-angkanya cocok dengan literatur umum: meriam besar ~8 m, bola batu
  ~600 kg (½ ton+), uji tembak Januari 1453 di Edirne jangkauan ~1,6 km,
  7 tembakan/hari, angkut lambat (4 km/hari), kutipan Doukas soal tembok Babilon.
- Hadis penakluk Konstantinopel: video menyebut sumber (Ahmad, al-Hakim) DAN
  perbedaan penilaian (al-Hakim/as-Suyuthi sahih, al-Albani daif) — bukan klaim
  sepihak. Ini yang bikin beat kredibilitasnya kuat.
- Framing jujur: "kota itu nggak jatuh oleh satu meriam saja" — meriam sebagai
  satu faktor, bukan penjelasan tunggal.

## 6. Yang bisa dicuri buat pipeline kita (bridge / cartoon-3d-short)

Yang SUDAH ada di pipeline kita: karakter 2.5D + ink, dunia three.js, DOF,
grade hangat, 1080×1920 30 fps, render Colab T4 ~0,4–0,9 dtk/frame dengan post.

Yang BELUM ada dan video ini membuktikan perlu:

1. **Caption bakar kata-per-kata** — ini separuh produknya. Bridge test render
   kemarin silent, tanpa caption sama sekali. Tanpa caption, video vertikal
   sejarah begini kehilangan narasi.
2. **VO Bahasa Indonesia** — Edge-TTS gratis (pola zainalsalamun). Naskah 30 dtk
   per video → VO per segmen, caption sinkron dari timing kata.
3. **Title card seri** — "— SERI — Nama" sekali di ~7 dtk, setelah hook.
4. **Kartu peta hitam-putih** — untuk angka jarak/rute. Murah dibuat (SVG/garis
   di Remotion), efek besar.
5. **Data callout in-world** — garis dimensi + label di objek 3D (8 m, ½ ton).
6. **Rim-light neon di scene malam** — supaya karakter kebaca di gelap.
7. **Crowd instancing** — puluhan duplikat untuk scene massal, murah di GPU.
8. **Struktur 9-beat + poll akhir** — hook paradoks, angka bukti, kejujuran,
   role-play penonton, CTA komentar + follow. Bukan sekadar "ceritakan topik".
9. **Sumber disebut di narasi** (Doukas, Ahmad, al-Hakim) + perbedaan pendapat
   ulama — kredibilitas tanpa menggurui.

## 7. Catatan produksi

- Estimasi shot: 40+ shot dalam 117 dtk, rata-rata ~2,5–3 dtk per shot.
- Resolusi upload 720×1280 (bukan 1080) — cukup buat vertikal, file 18 MB.
- Tidak ada watermark di frame (kecuali handle di end card).
- Transkrip VO lengkap: `transcript.txt` (whisper tiny, cek caption untuk teks pasti).
- Frame kunci: `f_001` hook, `f_004` title, `f_013` peta, `f_021` callout 8 m,
  `f_033` aerial formasi, `f_040` malam neon, `f_053` poll.
