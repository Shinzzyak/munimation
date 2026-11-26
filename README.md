# Munimation

Repo ini mendokumentasikan seluruh hasil ngulik video animasi pembelajaran
gaya Al-Fatih, yang dikerjakan Avres dan Gefreiter tanggal **24–25 November 2026**.
Isinya bukan cuma kode, tapi juga studi, resep, angka terukur, dan semua gotcha
yang ketemu di jalan — supaya video berikutnya bisa dibuat tanpa ngulang
kesalahan yang sama.

Dua video yang dihasilkan dari kerja ini:

1. **Bridge** — test render pipeline (67,5 detik, 2025 frame).
2. **ShipsShort — "Kapal Lewat Darat"** — video pembelajaran penuh pertama
   (86,4 detik, 2592 frame): ~70 kapal Ottoman dipindah lewat darat ke
   Tanduk Emas, April 1453.

> Video final (MP4) **tidak ada di repo ini** — file `bridge-full.mp4`
> (135 MB) melebihi batas 100 MB GitHub. Video dirilis sebagai
> release asset, bukan commit git. Yang ada di sini: semua source,
> naskah, VO, audio, script render, dan dokumentasi buat mereproduksi
> videonya dari nol.

## Yang baru — 25 Nov 2026 (update kedua)

### Update ketiga — film 3D v3 (25 Nov 2026 malam)

Setelah `ships-3d-v2.mp4` jadi, Avres menilai 4 hal masih kalah dari
Remotion v2: rantai kebaca donat, armada ngapung kebaca kotak, prajurit di
tembok kurang keliatan, dan pencahayaan/background v2 berasa lebih hidup.
Fix round v3 (ships.js 1143 → 1260 baris, ships.js saja): mata rantai jadi
lonjong pipih saling kait 90°, setengah tenggelam; armada dikasih layar
tergulung tebal + bendera merah + wake + variasi warna hull; kamera snap
dideketin, prajurit menghadap kamera + lampu depan + bayangan diagonal di
tembok; haze dihangatin + texture lukis di air/tembok. QA dua putaran
(NO-GO lalu GO), render 4 lane Colab T4 (akun 1–4, ~6 menit total,
0,13–0,16 dtk/frame; Kaggle MATI — kernel-nya jalan CPU di dua akun, jangan
dipakai buat engine ini). Verdict 10 frame lawan v2: **v3 menang 4, seri 6,
v2 menang 0** — pertama kalinya v2 tidak menang satu frame pun. Detail:
`claude-3d-animated-shorts/SHIPS-FILM.md` (bagian Upgrade v3).

### Update keempat — film 3D v4, asset-first + hybrid test (25 Nov 2026 malam)

Setelah v3, Avres protes lagi (jangkrik siang, armada bentuknya tetap,
rantai di pinggir pantai, tembok + prajurit masih kalah dari v2) dan
ngasih dua ide proses: gabungin Remotion + 3D, dan bikin aset dulu
sebelum render. **Fase 1 asset-first: 6/6 GO** — varian hull armada 4
bentuk baru yang beneran beda, rantai pindah ke air terbuka (CHAIN_Z
85, komposisi v2), prajurit skala 1,45 + muka baru di main.js (alis di
bawah rim steel cap), skyline lebih rapat, map clearance ~137 px (v3
cuma 19 px). Audio fix: jangkrik mati setelah 6,5 detik, burung pagi
masuk dari fajar — `mix-v2.wav`, −15,08 LUFS, band jangkrik siang jatuh
−41,81→−52,50 dBFS. **Hybrid test NO-GO, terbukti:** kamera kedua
pipeline beda ~11° (rel geser 150–250 px, tangan ngoles papan kosong)
dan background v2 udah berisi pekerja lukis di posisi yang sama (kepala
dobel) — benerinnya butuh render ulang background + audit kamera semua
shot, bukan jalan pintas. **Fase 2 full-3D:** QA GO tanpa fix round,
render 4 lane Colab T4 (~0,15 dtk/frame, ~6 menit). Verdict 10 frame
lawan v2: **v4 menang 7, seri 3, v2 menang 0** — lebih kuat dari v3
(4-6-0). Detail: `claude-3d-animated-shorts/SHIPS-FILM.md` (bagian
Upgrade v4).

### Update kelima — film 3D v5, aturan studi gerakan (26 Nov 2026 dini hari)

Avres protes v4 dengan 2 video referensi baru (Cerita Pos Ronda + Al-Fatih
Meriam): kapal ngapung vs kapal ditarik masih beda desain, dan Sultan
terang kayak matahari. Keduanya benar — armada v4 cuma hull + tiang +
layar + bendera (tanpa deck/castle/rigging kapal utama), turban Sultan
#f4f1ea flat di atas bukit gelap. V5 ditahan dulu: studi gerakan
per-frame dari kedua video (`research/movement-study/MOVEMENT-STUDY.md`),
baru gas. Temuan: pose-to-pose, kamera yang bergerak, satu gerakan tegas
per shot; muka selalu ada sisi gelap (Pos Ronda: nol frame muka putih
datar dari 219 frame); lengan nunjuk itu snap ~150–225°/detik + hold;
crowd = pose statis instanced, kamera yang bergerak. **v5 (R1–R12):**
turban gelap + gradient + rimfix (kepala bukan lagi benda paling terang
di f700), nunjuk snap + hard cut, pekerja condong statis + dolly-out,
armada detail kit sama kayak kapal utama (kastel + jendela + rigging —
dibuktikan dari kamera consequence), sapi berbentuk, garis rute peta
tergambar, caption karaoke merah kata-per-kata (184 kartu), musik mati
di beat rantai + reveal armada (`mix-v3.wav`, −15,08 LUFS). Render 4 lane
Colab T4 (lane 4 gagal, chunk dialihkan ke lane 1; Kaggle mati). Verdict
10 frame lawan v2: **v5 menang 6, seri 3, v2 menang 1 (f465 rantai —
satu-satunya komplain yang belum tuntas)**; lawan v4: lebih baik 3
(f700, f1225, f2300), lebih buruk 0. Detail:
`claude-3d-animated-shorts/SHIPS-FILM.md` (bagian Upgrade v5).

Update ini (commit setelah `a868aa2`) menambah empat hal yang dikerjakan
siang 25 Nov 2026, semuanya atas perintah Avres:

1. **Skill 3D stickman terinstall** — `claude-3d-animated-shorts/`:
   thuann-vn/claude-3d-animated-shorts (MIT), fork 3D sejati dari skill 2D
   mromidev: karakter rigged di atas rig Mixamo Xbot (bukan billboard 2D),
   bisa di-orbit dan di-pose. Dipilih setelah studi Ricks Clips / DrawnWhy
   (formula: perbuatan aneh → diejek → bencana → sains + analogi → loop).
   Install: clone 12 MB → `fetch-assets.sh` (Xbot.glb 2,8 MB, Horse.glb,
   font Anton + Inter-Black, 28 prop Poly Haven → aset 59 MB) → `npm install`
   88 paket. Dua patch VM di `engine/render.cjs`: `--no-sandbox` (VM jalan
   sebagai root) dan `--use-gl=angle --use-angle=swiftshader
   --enable-unsafe-swiftshader` (flag bawaan `--use-angle=metal` itu macOS,
   WebGL gagal tanpa ini). Smoke test `npm run still` SELESAI 25 Nov ~12:36:
   3 still dalam ~27 detik, dibaca visual — karakter big-head stickman +
   dunia rel + handcar kebaca, bukan blank (bukti di `smoke-test/`). Render
   video penuh tetap lewat Colab T4/Kaggle. TTS default-nya ElevenLabs
   berbayar — buat Avres diganti ke Google AI Studio gratis (Zubenelgenubi).
   Detail: `claude-3d-animated-shorts/NOTE.md`.
2. **Skill audio-ke-video** — `cartoon-audio-short/`: dari folder Drive
   `cartoon-short-kit` yang dikirim Avres. Audio masuk → MP4 vertikal jadi:
   karakter 2D bean-head card di dunia 3D inked, three.js di headless
   Chromium, TANPA Remotion/GPU, musik + SFX disintesis di 50% level suara.
   Contoh jadi "The Soldier Who Never Left" (19,7 dtk, 8 shot). Belum
   diinstall/diuji di VM. Detail: `cartoon-audio-short/NOTE.md`.
3. **Studi roblox-engine.7z** — `roblox-remotion-study/`: arsip 1 GB dari
   Drive ternyata BUKAN binary Roblox, melainkan proyek Remotion lengkap
   `roblox-shorts-engine` v1.0.0 (Remotion 4.0.242, three 0.163) dengan skill
   `roblox-shorts-director`: satu video = satu file Python (beats, musik,
   SFX, cast, scene), karakter R6 Roblox, kota persisten 12 lokasi, rule
   check otomatis. Poin terbesar: **Kokoro TTS LOKAL (ONNX) — gratis, tanpa
   batas 10 request/hari AI Studio**. 3 contoh MP4 jadi + 5 video referensi
   di arsip (tidak ikut di repo karena ukuran). Detail:
   `roblox-remotion-study/STUDY.md`. **Video pertama dari engine ini
   (26 Nov 2026): `roblox-shorts/stories/no-word.py` — "In this town,
   saying the word 'no' is against the law." (15 beat, 43,1 dtk,
   1080×1920).** Rule check bersih, QA contact sheet 2 putaran (close-up
   belakang kepala → semua aktor menghadap kamera; medium 2-aktor
   terpotong tepi → dilebarin dist 17/20). Render Colab T4 1 lane ~6 menit
   (~0,28 dtk/frame). **Gotcha render: `--gl=angle` di Colab ternyata CPU
   (SwiftShader ~25 dtk/frame) — pakai `--gl=angle-egl` (GPU T4, 0,91
   dtk/frame di speed test).** Gotcha Linux lain: glob ffmpeg ambil
   `ffmpeg.exe` dulu (patch `audio.py` utamakan biner non-.exe); probe
   port Remotion gagal karena sandbox menerima TCP connect ke semua port
   (patch `port-config.js` hanya loopback); WebGL lokal butuh
   `--gl=swangle` di headless-shell. Video MP4 tidak ikut di repo (ukuran)
   — file jadi `roblox-no-word.mp4`. **v2 (26 Nov 2026, feedback Avres:
   suara cowo + kurangin AI slop): narrator `af_heart` → `am_adam`,
   shout → `am_michael` (42,0 dtk); badge counter "912,450 WORDS LEFT"
   dihapus dari aktor bertape (root cause: `mouth_tape` salah terdaftar
   sebagai counter); grade hangat ACES + fog haze; tekstur plaster di
   dinding; scene twist malam benar-benar gelap; framing f614 dist 28.
   Patch engine: `roblox-shorts/engine-patches-v2/` (+ NOTE.md).
   File jadi `roblox-no-word-v2.mp4`.
- **Cerita misteri 90 detik kedua (26 Nov 2026): `roblox-shorts/stories/clock-stops.py` — "In this town, every clock stops when I walk by." (33 beat, 225 kata, 93,7 dtk, 1080×1920).** Dibangun dari teardown per-frame 3 referensi (aturan R1–R17: hard cut, caption per-speaker, counter fisik jujur, twist identitas dua jalur, countdown berhenti sebelum 0). Menara jam 50 tahun membeku di 11:58; Maya penghitung (hijau, `af_bella`) — hitungannya jangkar teks "8TH TODAY", bukan hitungan fisik (penyimpangan R3/R5 yang didokumentasikan); buku log "JUN 14 — MISSING"; arloji saku hero 11:58 = rima visual menara; countdown 10/9/8 BERHENTI di 8 + lonceng sekali; bisikan penutup + hard cut ke hitam. Engine: `ClockTower` baru + `pocket_watch` + caption per-speaker (`CAPTION_COLORS`) + senja (`skyColor #F97316`) — patch di `roblox-shorts/engine-patches-clock-stops/` (+ NOTE.md). Render Colab T4 1 lane ~13–14 menit (~0,29 dtk/frame), 2810 frame, 0 insiden. File jadi `roblox-clock-stops.mp4`.
- **Remake video referensi "cap" (26 Nov 2026): `roblox-shorts/stories/cap-remake.py` — remake 1:1 ynbloxtv "Every time you cap, a cap pops up on your head" (37 beat, 216 kata, 100,6 dtk, 1080×1920, 3018 frame).** Atas perintah langsung Avres — R17 teardown dikesampingkan untuk video ini saja. Menara topi baru (`cap_tower` 1–19, `cap_dome` persisten antar-scene, `cap_scatter`); twin = penghitung + suara kebenaran (beanie putih, tidak pernah kena topi); aturan kena semua orang (guru +2, shopkeeper +1 dome oranye, vendor +1 dome teal, cewek +1 dome teal); hitungan topi JUJUR — dihitung sendiri dari frame jadi: 17 ✓ (f1851), 19 ✓ (f2350); klimaks = menara roboh di kamera (f2510), bukan topi ke-20; penutup crane — hero SATU topi oranye, "I ain't never capped once". Musik MATI TOTAL, satu-satunya SFX boom akhir. Patch di `roblox-shorts/engine-patches-cap-remake/` (+ NOTE.md). Render 4 lane Colab T4 (lane 4 sesi mati → dipindah ke lane 2, selesai 678/678); build + QA ~5 jam sebelum render — rantai sekuensial, bukan render, yang makan waktu. File jadi `roblox-cap-remake.mp4`.
- **Studi referensi Roblox (26 Nov 2026): `roblox-refs/` — teardown per-frame 3 video (TEARDOWN.md + 3 shot list + 3 transkrip) dengan aturan build R1–R17, plus `LEARNINGS.md` (riset skill/repo/postingan tambahan: pace 3,7–4,9 kata/dtk vs kami ~2,4; caption Whisper + spring pop per kata; plant-payoff 3+; hook <2,5 dtk; target Stayed ≥70%/APV 60–75%; checks pra-render REPORT PASS; kontradiksi pace/SFX/musik/durasi).** 93 frame bukti tetap lokal, tidak masuk repo.
4. **Dua dokumen Google Docs** — `docs/`: "Mark AI Guy — What-If Story
   Engine" (21.317 karakter: workflow klip 10 detik + end-frame continuity
   + naskah narator + paket upload) dan "Rick's Clips Master Prompt v3"
   (8.030 karakter: master prompt produser Shorts, ide HARUS fakta nyata,
   aturan narasi ketat HOOK/SETUP/DOUBT/ESCALATE/TURN/REVEAL "You see,"/
   BUTTON). **Ketegangan penting: kedua dokumen menuntut karakter STRICTLY
   FLAT 2D** — cocok dengan `cartoon-3d-short/` dan `cartoon-audio-short/`,
   BUKAN skill 3D rigged. Detail: `docs/README.md`.

Yang sengaja TIDAK masuk repo: zip `cartoon-3d-animated-shorts.zip` (18 MB)
— sudah diverifikasi sebagai duplikat persis `cartoon-3d-short/` yang ada
di sini; `node_modules/`, `engine/assets/` skill 3D (59 MB, regenerable),
`upstream-2d/` (duplikat `cartoon-3d-short/`); MP4/ONNX/referensi arsip
roblox (ukuran + hak cipta pihak ketiga).

## Isi repo

| Folder | Isi |
|---|---|
| `alfatih-study/` | Studi frame-by-frame video referensi @alfatihmotion + transkrip + 58 frame + sampel VO |
| `cartoon-3d-short/` | Skill animasi 2.5D (three.js + Remotion) yang dipakai, dari mromidev (MIT) |
| `claude-3d-animated-shorts/` | Skill 3D stickman rigged (Mixamo Xbot) dari thuann-vn (MIT) + NOTE + bukti smoke test |
| `cartoon-audio-short/` | Skill audio → MP4 vertikal (2D bean-head, tanpa Remotion/GPU) dari folder Drive Avres + NOTE |
| `roblox-remotion-study/` | Studi roblox-engine.7z: skill roblox-shorts-director + Kokoro TTS lokal + 7 file kunci |
| `docs/` | Dua dokumen Google Docs: What-If Story Engine + Rick's Clips Master Prompt v3 + ringkasan |
| `remotion/` | Proyek Remotion: komposisi `BridgeShort` dan `ShipsShort` (source lengkap) |
| `ships-short/` | Naskah, VO, timing kata, caption, script audio mix, dan script caption burn |
| `colab-render/` | Script setup + render chunk di Google Colab T4 |
| `README.md` | Dokumen ini |

---

## 1. Studi video Al-Fatih

Video referensi: **"Seri Al-Fatih — Meriam Raksasa"** (@alfatihmotion),
117 detik, 720×1280, 30 fps. Dikirim Avres 25 Nov 2026 01:07 WIB,
dipelajari teliti: frame tiap 2 detik (58 frame), transkrip VO via
faster-whisper tiny, analisis spektral audio. Hasil lengkap di
[`alfatih-study/STUDY.md`](alfatih-study/STUDY.md).

### Struktur 9-beat dalam 117 detik

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

Pola retensi: hook paradoks (3 dtk) → pertanyaan terbuka (27 dtk) →
angka sebagai bukti (8 m, ½ ton, 1,6 km, 2 m, 4 km/hari, 7 tembakan/hari,
225 km) → kejujuran ("nggak jatuh oleh satu meriam saja") → penonton
diposisikan sebagai pengambil keputusan → poll + follow CTA.
Tidak ada shot yang diam lebih dari ~3 detik.

### Visual

- Karakter 2.5D: kepala bulat, badan stick-figure, ink outline tebal, warna
  datar. Satu rig dasar, dibedakan topi/jubah/warna: Orban (topi coklat +
  jubah biru + kumis), Sultan (serban putih + jubah merah), Kaisar (mahkota
  emas berpermata + jubah merah + jenggot abu), pekerja (topi merah).
- Dunia three.js: kota, benteng, jembatan, ladang, interior istana. DOF aktif
  (background blur), grade hangat golden-hour di eksterior, interior hangat
  cahaya obor, malam biru gelap.
- Trik malam: karakter di scene malam diberi **rim-light hijau neon** supaya
  tetap kebaca di gelap (frame ~78 dtk). Tanpa itu mereka hilang di background.
- Kerumunan = duplikat instanced puluhan pekerja topi merah (scene tarik
  meriam, ~52 dtk). Dari jauh tidak butuh variasi animasi per orang.
- Kamera: push-in pelan, orbit, aerial lebar, top-down, POV dari moncong
  meriam ke tembok, close-up wajah untuk emosi.
- Bayangan panjang golden-hour dipakai sebagai elemen komposisi.

### Caption — ini yang paling beda dari render bridge kita

- Caption bakar di video, kata-per-kata sama dengan VO, 2–6 kata per kartu,
  ganti tiap ~1,5–2,5 detik, sinkron dengan frasa VO.
- Gaya: putih tebal + outline hitam tebal, tengah-bawah, tanpa kotak
  background. Frasa pendek, bukan kalimat penuh.
- Title card: "— SERI —" kecil letterspaced di atas nama besar
  (font display tebal, outline). Muncul sekali di ~7 dtk.
- Data callout digambar **di dalam dunia 3D**: garis dimensi "8 m" di laras
  meriam, label "½ ton" di bola batu, "1,6 km", "hampir 2 m", "4 km sehari".
- Peta = kartu terpisah: background hitam, garis putih tipis, "225 km" besar,
  label kota/laut, garis rute + titik, scale bar 0–50 km. Durasi ~3 detik.
- End card poll: scene digelapkan, header "@alfatihmotion menantang",
  "Kamu pilih yang mana?", tombol A (highlight emas) / B, Orban + Kaisar
  mengapit peti koin.

### Audio

- VO: satu narator pria Bahasa Indonesia, register kasual ("nggak", "aja",
  "terus"), kontinu hampir tanpa jeda.
- Musik bed tipis di bawah VO sepanjang video (RMS stabil 0,13–0,17, tidak ada
  segmen senyap). SFX dentuman meriam pelan di mix.
- Tidak ada VO ganda, tidak ada dialog karakter; semua narasi dari narator.

### Fakta — video ini unusually careful

Angka-angkanya cocok dengan literatur umum (meriam ~8 m, bola batu ~600 kg,
uji tembak Januari 1453 jangkauan ~1,6 km, 7 tembakan/hari, angkut 4 km/hari,
kutipan Doukas soal tembok Babilon). Hadis penakluk Konstantinopel disebut
sumbernya (Ahmad, al-Hakim) **dan** perbedaan penilaiannya (al-Hakim/as-Suyuthi
sahih, al-Albani daif) — bukan klaim sepihak. Framing jujur: "kota itu nggak
jatuh oleh satu meriam saja".

### Yang dicuri buat pipeline kita

Yang SUDAH ada: karakter 2.5D + ink, dunia three.js, DOF, grade hangat,
1080×1920 30 fps, render Colab T4 ~0,4–0,9 dtk/frame dengan post.

Yang BELUM ada dan video ini membuktikan perlu:

1. Caption bakar kata-per-kata — ini separuh produknya.
2. VO Bahasa Indonesia.
3. Title card seri — "— SERI — Nama" sekali di ~7 dtk, setelah hook.
4. Kartu peta hitam-putih — untuk angka jarak/rute.
5. Data callout in-world.
6. Rim-light neon di scene malam.
7. Crowd instancing.
8. Struktur 9-beat + poll akhir.
9. Sumber disebut di narasi + perbedaan pendapat — kredibilitas tanpa menggurui.

---

## 2. Pipeline

```
skill cartoon-3d-short
  → naskah (SCRIPT.md, angka/tahun DIEJA)
  → VO Google AI Studio (1 request)
  → timing kata via faster-whisper (words.json)
  → komposisi Remotion (ShipsShort, 2592 frame)
  → audio mix (VO + pad/glock bed + SFX, loudnorm)
  → caption burn (ASS → ffmpeg)
  → render Colab T4 (5 chunk) → concat → mux → QA frame
```

Aturan main yang dipakai selama ngulik:

- **Verifikasi dengan mata, bukan angka.** Render dicek dengan ekstrak frame
  dan benar-benar membaca isinya. Durasi/resolusi/RMS saja tidak membuktikan
  apa-apa. (Pelajaran 18 Okt 2026: video dengan teks salah lolos karena cuma
  dicek durasi.)
- **Jangan percaya klaim "tidak diubah".** Grep string aslinya di source
  sebelum render.
- **Render yang diperbaiki pakai nama file baru**, jangan timpa file yang
  sudah pernah dikirim dalam keadaan rusak.

---

## 3. Video 1 — Bridge (test render pipeline)

Skill `mromidev/claude-animated-shorts` (gratis, MIT): karakter 2D di dunia
3D, three.js di dalam Remotion, video vertikal 55–70 detik. Diinstall
24 Nov 2026. Komposisi contohnya: `BridgeShort`, jembatan + kota + prajurit,
2025 frame, 1080×1920, 30 fps. Properti Kenney GLB tidak ada di repo
(26 file 404) — dunianya tetap jalan karena semuanya prosedural.

| Tahap | Hasil |
|---|---|
| Test 5 detik (Colab T4) | 150 frame dalam 119,6 dtk = 0,80 dtk/frame, bersih, nol frame blank |
| Render penuh | 2025 frame dalam 4 chunk, 0,40–0,86 dtk/frame, ~22 menit total, 67,5 dtk, 135 MB |
| QA | 9 titik sampel termasuk sambungan chunk (499/500, 999/1000, 1499/1500) — nol frame blank |
| VM (SwiftShader) | 10–20 dtk/frame → 5,5–6,5 jam untuk 2025 frame; VM recycle ±tiap jam dan Remotion tidak bisa resume — **tidak feasible** |

---

## 4. Video 2 — ShipsShort, "Kapal Lewat Darat"

Topik yang dipilih: **~70 kapal Ottoman dipindah lewat darat ke Tanduk
Emas, April 1453** (Babinger, Crowley "1453", İnalcık).

- 21–22 April 1453: ~70 kapal (sumber menyebut 60–80) dipindah dari pesisir
  Bosporus (Dolmabahçe) ke Tanduk Emas.
- Rute darat ~10 km, melewati bukit dan lembah Kasimpaşa, di atas jalan kayu
  yang dilumuri lemak supaya licin.
- Ditarik ratusan lembu dan ribuan orang, dalam satu malam; pagi 22 April
  kapal-kapal sudah mengapung di Tanduk Emas.
- Rantai besi raksasa di mulut Tanduk Emas tetap utuh — tapi jadi tidak berguna.
- Konstantinopel jatuh 29 Mei 1453.
- Prinsip fisik: gesekan — permukaan licin membuat beban puluhan ton bisa
  meluncur; analogi: mendorong lemari berat di lantai yang licin.

### Naskah & VO

Naskah lengkap: [`ships-short/SCRIPT.md`](ships-short/SCRIPT.md)
(~184 kata, 12 shot; direncanakan ~65 dtk, VO jadi 86,4 dtk karena
Zubenelgenubi bicara ~2,1 kata/detik). Semua angka dan tahun **dieja**
("seribu empat ratus lima puluh tiga") — lihat gotcha di bawah.

VO: Google AI Studio, model `gemini-3.8-flash-tts`, suara **Zubenelgenubi**
("Casual · Lower middle pitch"), **satu request**, 86,36 dtk, 24 kHz mono.
File: `ships-short/voice/vo-zubenelgenubi.wav` (+ `vo-48k.wav` hasil
ffmpeg — lihat gotcha WAV). Timing kata: `ships-short/voice/words.json`
(191 kata, via faster-whisper tiny).

### Caption bakar

62 frasa, 2–6 kata per kartu, dibangun dari `SCRIPT.md` + `words.json`
oleh `ships-short/build_captions.py` (alignment difflib; 124/184 kata
cocok persis, sisanya interpolasi; lead-in 0,12 dtk + hold 0,10 dtk).
Cakupan 0,52 dtk → 86,18 dtk, tanpa overlap, durasi frasa 0,62–2,21 dtk.
Burn: `ships-short/burn_captions.py` → ASS, DejaVu Sans Bold 72, putih +
outline hitam 5, tengah-bawah.

### Audio mix

`ships-short/audio/ships_audio.py` (memakai pustaka synth dari
`cartoon-3d-short/templates/audio/`). Voice −15,4 LUFS; musik = pad hangat
Dm–Bb–F–C + motif glock di jeda kata ≥1,2 dtk, di-duck −3 dB di bawah speech;
SFX = jangkrik malam + angin, wood creak + chain groan, chain clank, air,
burung pagi. Master ffmpeg two-pass loudnorm:
**−15,06 LUFS, true peak −1,20 dBTP, LRA 3,2**.

### Render v1 (25 Nov 2026 ~09:48 WIB)

| | |
|---|---|
| Sesi Colab | `ships`, T4 (Standard, 15 GB VRAM, Node 22, 2 CPU, 12 GB RAM) |
| Chunk | 5 × ~520 frame (0–519, 520–1039, 1040–1559, 1560–2079, 2080–2591) |
| Kecepatan | 0,26–0,29 dtk/frame, total ~12 menit untuk 2592 frame |
| Biaya | 1,34 CU (saldo 77,78 → 76,44) |
| Hasil | 86,4 dtk, 1080×1920, h264 + AAC, 48 MB |

QA v1 menemukan cacat nyata: caption berkoma ke-render `"darat\,"` —
`build_ass` men-escape koma, padahal field Text di ASS adalah field terakhir
jadi koma itu literal. Diperbaiki (`FIX 2026-11-25` di `burn_captions.py`),
re-burn, frame 75 terverifikasi bersih. QA akhir 13 titik termasuk 4
sambungan chunk: nol frame blank, sambungan mulus.

### Render v2 — rebuild kapal + background (25 Nov 2026 ~11:10 WIB)

Feedback Avres atas v1: kapalnya "ga berbentuk" — memang benar, hull lead
ship waktu itu `BoxGeometry` + kerucut 4 sisi, dan laut/bukit bidang datar
warna solid. Yang diubah di `remotion/src/videos/ships/world.ts`
(+ `paint.ts` untuk tekstur air):

- **Kapal**: hull dari kotak diganti outline 2D plan-view dengan bezier
  (haluan runcing melengkung, midship penuh, buritan meruncing) di-extrude;
  deck + 5 strip papan, bulwark, stem post, forecastle bertingkat,
  stern castle dengan 3 jendela + lentera, layar gulung diganti silinder
  meruncing berikat tali, rigging 4 tali (forestay, backstay, 2 shroud).
  Fleet 78 kapal memakai geometri extrude yang sama (instanced).
- **Air**: bobot shader crest/trough/glint dinaikkan + garis buih di pantai.
- **Bukit**: 4 pita teras hijau-gelap mengikuti kontur + 46 semak + 22 batu.
- **Tembok + kota**: tinggi menara bervariasi (18–30 m, yang ≥26 m pakai
  kubah), kota tambah baris ke-4 dan satu kubah dominan (r=13, ~1,5× kubah
  terbesar lama) sebagai landmark skyline.
- Verifikasi: still di `remotion/out/ships-v2/` dibaca visual satu-satu
  (hook, title, haul, snap, consequence, poll + aerial + rantai) — kapal
  kebaca sebagai kapal, air berbentuk, skyline bervariasi.
- Re-render: 5 chunk, **concurrency 2** (v1 pakai 1), token Colab tersimpan
  jadi tidak perlu otorisasi ulang.

Catatan jujur: pita teras dari aerial masih terbaca agak artifisial seperti
strip yang dicat; di close-up tembok kubah kota tampil besar dan polos;
fleet tidak kelihatan di wide consequence (sama seperti v1 — kompromi yang
sudah diterima, snap shot yang menunjukkannya).

---

## 5. Fix EffectComposer — frame pertama blank

Ini bug yang paling mahal waktu selama ngulik, dan penyebabnya sempat salah
diduga dua kali (dituduh SwiftShader di VM, lalu dituduh GPU).

**Gejala:** render dengan post-processing (`@react-three/postprocessing`)
menghasilkan frame pertama tiap canvas kosong — frame 100 blank
(1 warna), frame 101 penuh efek (4.570 warna).

**Akar masalah (terbukti):** `@react-three/postprocessing` membangun
composer-nya di dalam passive effect yang jalan **setelah**
`advance()` dari `@remotion/three` untuk frame itu. Jadi di frame pertama
tiap canvas mount, `useFrame` composer early-return dan Remotion menangkap
canvas kosong. Bukan masalah GPU/SwiftShader.

**Fix** (di `remotion/src/videos/bridge/Bridge.tsx` dan
`remotion/src/videos/ships/Ships.tsx`, komentar `FIX 2026-11-25`):

- `composerRef` di-pass sebagai `ref` ke `<EffectComposer>`.
- `delayRender("... composer ready")` menahan frame sampai
  `composerRef.current` ada.
- Setelah composer ada: panggil `advance(performance.now())` sekali +
  `continueRender(hold)`.
- `{post}` dikembalikan (jangan di-null-kan).

Hasil: render penuh bridge 2025 frame dengan post ON, nol frame blank
di 9 titik QA termasuk sambungan chunk.

---

## 6. Resep render Colab T4

Jalur ini dipilih 24 Nov 2026 dari dua post Threads @tukang_e.ayy:
Muse × Kaggle GPU gratis (T4 ×2, ~30 jam/minggu, sesi maks 12 jam) vs
Muse × Google Colab CLI. Avres memilih: "Gas, test render di Colab T4 dulu"
(Kaggle jadi alternatif yang belum dipakai).

### CLI

- `googlecolab/google-colab-cli` 0.8.0 dari PyPI (resmi, ★3.031),
  di venv `~/workspace/colab-cli-venv`.
- **Bug CLI + patch lokal:** bodiless POST ke endpoint assign Google → HTTP
  411. Patch di `client.py` venv: tambah `json={}` ke `_post_assignment`
  dan `unassign` (tanda `PATCH 2026-11-24 (VM)`). 0.8.0 adalah versi PyPI
  terbaru saat itu.
- Auth: OAuth device flow Google, token disimpan di keyring CLI.
  **Token DISIMPAN atas perintah eksplisit Avres 25 Nov 09:32
  ("simpen aja, jan dihapus")** — beda dari sesi bridge yang tokennya
  dihapus setelah test.
- Satu pelajaran auth: flow yang menunggu kode harus jalan **tanpa timeout**
  dan dengan `PYTHONUNBUFFERED=1` supaya URL-nya ke-print. Kode OAuth
  terikat ke flow yang menghasilkannya — kalau prosesnya mati, kodenya ikut
  mati dan harus minta kode baru dari link baru.

### Setup sesi (script: `colab-render/colab-ships-setup.py`)

1. `colab new -s ships --gpu T4` (T4 Standard, 15 GB VRAM, Node 22,
   2 CPU, 12 GB RAM).
2. Upload tarball proyek → `/content/ships-colab.tar.gz`, extract.
3. `npm ci`.
4. Install Chrome penuh (`google-chrome-stable_current_amd64.deb`).
5. `apt-get install -y libnvidia-gl-580 libvulkan1` — **wajib**, tanpa ini
   headless Chrome tidak bisa membuat konteks WebGL GPU.
6. Verifikasi WebGL: `ANGLE (NVIDIA, Vulkan 1.4.312 (NVIDIA Tesla T4 ...))`.
7. Config Remotion buat Colab: `Config.setChromiumOpenGlRenderer("vulkan")`
   + `Config.setBrowserExecutable("/usr/bin/google-chrome")`.

### Chunking

Satu sesi Colab render `ShipsShort` per chunk (~520 frame) lewat
`colab-render/colab-ships-chunk*.py` (`npx remotion render ShipsShort
--frames=START-END --concurrency=2 --timeout=180000`). Lalu download
5 chunk, gabung `ffmpeg -f concat -c copy`, burn caption + mux audio
(`burn_captions.py` + `audio/mix.wav`), QA frame, selesai.
Session di-stop setelah selesai (`colab stop -s ships`) supaya CU tidak jalan.

### Biaya (compute units, terukur)

| Sesi | Biaya | Saldo sesudah |
|---|---|---|
| Bridge test 5 dtk (150 frame) | 0,26 CU | 77,78 (dari 78,04) |
| Bridge penuh 67,5 dtk (2025 frame) | — (tidak tercatat) | — |
| ShipsShort v1 (2592 frame) | 1,34 CU | 76,44 |
| ShipsShort v2 (2592 frame, 5 chunk, ~12,5 mnt) | — (tidak tercatat; CLI tidak punya perintah balance) | — |

---

## 7. Google AI Studio TTS — workflow VO gratis

- Model: Gemini 3.8 Flash TTS (`gemini-3.8-flash-tts`), lewat
  `aistudio.google.com/generate-speech`, tanpa API key, tanpa billing.
- Suara yang dipakai: **Charon** (test 18,6 dtk, 25 Nov 07:35 WIB) dan
  **Zubenelgenubi** ("Casual · Lower middle pitch", 86,36 dtk, 1 request).
- **Batas gratis (dipotong 3 Nov 2026): 3 RPM / 10.000 TPM / 10 request
  per hari.** Satu naskah video = 1 request, jadi 1 video/hari aman.
  Pemakaian 25 Nov: 2 dari 10 request.
- Batas yang dibantah: Avres sempat mengusulkan bikin banyak akun buat
  mengakali batas — tidak dilakukan. Yang dipakai hanya akun Google yang
  memang sudah dia miliki. Kalau butuh batching, opsi yang sah: tier
  berbayar ~Rp400 untuk 2 menit audio.
- **Gotcha tahun/angka:** TTS membaca "1452" sebagai
  "seribu empat ratus 52". Semua tahun dan angka di naskah harus **dieja**.
- **Gotcha header WAV:** WAV mentah dari AI Studio header-nya malformed
  (`nAvgBytesPerSec` salah) — `scipy.io.wavfile` menolak, ffmpeg membaca
  normal. Pakai `vo-48k.wav` hasil ffmpeg untuk kerja audio.
- Alternatif yang diverifikasi tapi belum dipakai: Edge-TTS Bahasa Indonesia
  gratis (dipakai @zainalsalamun untuk video skill yang sama).

---

## 8. Cara mereproduksi dari nol

1. Install skill: clone `mromidev/claude-animated-shorts` (MIT) → baca
   `cartoon-3d-short/SKILL.md`. Deps: Node 24, Remotion 4.0.535,
   three 0.180.0, `@react-three/postprocessing` 3.2.2.
2. Tulis naskah di `ships-short/SCRIPT.md` (angka/tahun dieja), bikin VO di
   Google AI Studio (1 request), simpan WAV-nya, bersihkan header via ffmpeg
   ke 48 kHz mono.
3. Timing kata: faster-whisper tiny → `words.json` (rute raw-numpy kalau
   decode `av` error).
4. Bangun komposisi di `remotion/src/videos/<nama>/` mengikuti pola
   `ships/` (12 shot, `story.ts` + `world.ts` + `Ships.tsx`); jangan lupa
   fix EffectComposer di bagian 5.
5. Audio mix: `ships-short/audio/ships_audio.py` → `mix.wav`, loudnorm
   ffmpeg two-pass ke sekitar −15 LUFS / −1 dBTP.
6. Caption: `build_captions.py` (SCRIPT + words → `captions.json`) lalu
   `burn_captions.py` (ASS → ffmpeg). Ingat: koma di ASS itu literal,
   jangan di-escape.
7. Render: ikut resep Colab di bagian 6 (setup → chunk → concat → mux → QA).
8. QA: ekstrak frame di titik kunci + sambungan chunk, **baca visualnya**.

---

## 9. Gotcha — daftar lengkap

1. EffectComposer blank di frame pertama canvas — penyebabnya passive effect
   vs `advance()`, bukan GPU. (Bagian 5.)
2. Angka/tahun di naskah VO harus dieja, TTS salah baca "1452".
3. Header WAV AI Studio malformed — scipy menolak, ffmpeg OK.
4. Koma di ASS jangan di-escape — jadi backslash kelihatan (`darat\,`).
5. Colab CLI 0.8.0: bodiless POST → HTTP 411, patch `json={}`.
6. Tanpa `libnvidia-gl-580` + `libvulkan1`, Chrome headless di Colab tidak
   dapat konteks WebGL GPU.
7. Kode OAuth terikat ke flow-nya; proses auth yang mati = kode mati.
8. VM ini recycle ±tiap jam dan Remotion tidak bisa resume — render panjang
   hanya feasible di Colab (chunking) atau mesin ber-GPU.
9. Kenney GLB (26 file) 404 di repo skill — dunia prosedural tetap jalan,
   tapi props pohon/lentera/stall absen. Download Kenney Nature Kit (CC0)
   ke `public/bridge/kenney/` kalau mau lengkap.
10. scipy membaca WAV 24-bit sebagai int32 yang di-shift — cek dtype/divisor
    sebelum menghitung RMS dari WAV.
11. Poll card video ini **sengaja tanpa handle @alfatihmotion** — itu channel
    referensi, bukan channel kita. (Sempat masuk di build awal, sudah dihapus
    dan diverifikasi lewat grep + still frame 2500.)

---

## Kredit

- Skill animasi: [mromidev/claude-animated-shorts](https://github.com/mromidev/claude-animated-shorts)
  (MIT) — lihat `cartoon-3d-short/NOTE.md`.
- Skill 3D: [thuann-vn/claude-3d-animated-shorts](https://github.com/thuann-vn/claude-3d-animated-shorts)
  (MIT) — lihat `claude-3d-animated-shorts/NOTE.md`.
- Skill audio-ke-video: folder Drive `cartoon-short-kit` dari Avres —
  lihat `cartoon-audio-short/NOTE.md`.
- Studi Roblox: arsip `roblox-engine.7z` dari link Drive Avres —
  lihat `roblox-remotion-study/STUDY.md`.
- Dokumen cerita: "Mark AI Guy — What-If Story Engine" dan
  "Rick's Clips Master Prompt v3" (Google Docs) — lihat `docs/README.md`.
- Referensi gaya: [@alfatihmotion](https://www.threads.com/@alfatihmotion),
  "Seri Al-Fatih — Meriam Raksasa".
- Validasi skill yang sama di Threads: [@zainalsalamun](https://www.threads.com/@zainalsalamun)
  (video 70 dtk, Antigravity Neon + skill ini + Edge-TTS).
- Arah Colab/Kaggle: post Threads [@tukang_e.ayy](https://www.threads.com/@tukang_e.ayy)
  (Muse × Kaggle GPU, Muse × Google Colab CLI).
- Repo `googlecolab/google-colab-cli` (★3.031) dan `deepbeepmeep/WanGP`
  (★12.224) — diverifikasi saat riset.
- Dibuat 24–25 Nov 2026 oleh Avres (Shinzzyak) dan Gefreiter.

## Film pertama skill 3D — Kapal Lewat Darat (rebuild, 25 Nov 2026)

Video "Kapal Lewat Darat" dibangun ulang sebagai film baru di skill 3D
(`?ships=1`, `claude-3d-animated-shorts/engine/ships.js`): 12 shot, 86,4 dtk,
2592 frame, VO/caption/audio dipakai ulang dari `ships-short/`. Render Colab
T4: 5 chunk, ±6,5 menit (±0,16 dtk/frame), 0,43 CU. Perbaikan penting:
flag GPU `--use-angle=gl` gagal di Colab, yang jalan `--use-angle=vulkan`.
QA: 36 still lokal + 21 frame final, nol blank, koma caption bersih.
Satu nit diketahui: caption "dari pesisir Bosporus" menimpa label "BOSPORUS"
di map card. Detail: `claude-3d-animated-shorts/SHIPS-FILM.md`.

**Upgrade v2 (25 Nov 2026, perintah Avres "biar nyaingin v2"):** perbandingan
10 frame menunjukkan v2 menang 7–8 dari 10, lalu `ships.js` 955 → 1143 baris
(malam diterangkan + lampu obor, banding diperbaiki, air 170 goresan,
`CHAIN_Z` 62→70 — rantai ternyata terkubur di bukit, map diukur ulang,
tembok bata + penjaga di celah merlon, bukit bertekstur noise canvas).
Tiga ronde build + QA independen, verdict akhir **GO**. Lawan v2 sekarang:
3D menang 3 (f300, f1225, f1900), seri 3 (f75, f230, f2300), v2 menang 2 tipis
(f465, f1140). Render berikutnya: 4 lane ±648 frame — Colab1 0–647, Colab2
648–1295, Kaggle Shinzuy 1296–1943, Kaggle ayamhuz 1944–2592; output
`ships-3d-v2.mp4`. Detail: `claude-3d-animated-shorts/SHIPS-FILM.md`.
