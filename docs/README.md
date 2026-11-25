# Dokumen: dua mesin prompt cerita (Google Docs)

Dua dokumen Google Docs yang dikirim Avres 25 November 2026 12:28 WIB, dibaca
setelah Google Docs dihubungkan (~12:41 WIB). Teks lengkapnya disimpan di sini
apa adanya.

## Doc 1 — "Mark AI Guy — What-If Story Engine" (21.317 karakter)

`doc-whatif-story-engine.txt` — mesin prompt untuk cerita animasi what-if,
dibangun untuk workflow generator video AI (klip 10 detik, mis. Veo/Kling).

- **Durasi:** 30 detik–10 menit, dihitung per klip 10 detik (30 dtk = 3 klip,
  60 dtk = 6, 2 mnt = 12, 3 mnt = 18, 5 mnt = 30, 10 mnt = 60). Default
  vertikal 9:16.
- **Stage 1 — durasi**, **Stage 2 — ide** (punya ide sendiri, atau minta
  10 ide: judul pendek + hook satu kalimat; fokus cerita what-if, penemuan
  aneh sehari-hari, objek misterius, aturan tak terduga, konsekuensi tak
  disengaja, twist visual).
- **Stage 3 — plan + generation prompt:** ringkasan cerita, durasi, aspect
  ratio, jumlah klip, dan continuity guide (cast, lokasi awal, palet,
  arah cahaya, layout, prop kunci, "rule" cerita). Lalu SATU prompt generate
  per klip 10 detik, masing-masing berisi: durasi + aspect ratio, spesifikasi
  visual lengkap, deskripsi karakter yang terlihat, environment/lighting/prop,
  komposisi awal + aksi, 2–4 shot/beat ber-timing yang totalnya tepat 10 detik,
  deskripsi final frame, dan syarat bisu tanpa teks di layar.
- **Kontinuitas end-frame:** klip berikut mulai dari screenshot frame akhir
  klip sebelumnya ("Use the attached final-frame screenshot from the previous
  clip as the starting image..."). Objek yang hilang tetap hilang kecuali plot
  mengembalikannya; deskripsi akhir Clip N dan awal Clip N+1 harus sama persis.
- **Stage 4 — naskah narator (Inggris):** ~20–25 kata per klip 10 detik,
  voice direction + tabel per klip + naskah bersih yang bisa di-copy.
  Diakhiri: "Type NEXT for your thumbnail prompt, title ideas, and copy-ready
  video description."
- **Stage 5 — upload package:** prompt thumbnail, 5 judul, deskripsi
  (pembuka premis, ajakan komentar, ajakan subscribe, komunitas
  https://t.me/markaiguyHQ, disclosure "An AI-assisted fictional animation
  created for entertainment.", 3 hashtag).
- Dua contoh kerja lengkap disertakan (tombol merah di alun-alun kota, 10 detik;
  dan kelanjutannya).
- **Gaya visual dikunci:** karakter STRICTLY FLAT 2D (muka putih bulat, outline
  gelap tebal, mata oval hitam, alis terpisah, mulut sederhana, rambut/pakaian
  warna solid datar, lengan/kaki garis hitam tipis, tangan bulat datar) di
  environment 3D yang berdimensi (tekstur, cahaya directional, contact shadow).
  Klip bisu: tanpa dialog, lip-sync, narasi, musik, SFX, caption, bubble,
  logo, watermark. Karakter boleh memberi bayangan di tanah, tapi wajah dan
  pakaian tetap datar tanpa shading.

## Doc 2 — "Rick's Clips Master Prompt v3" (8.030 karakter)

`doc-ricks-clips-master-prompt-v3.txt` — master prompt untuk ChatGPT jadi
produser Shorts gaya Ricks Clips (narasi cepat + karakter kartun 2D datar di
background 3D yang kaya).

- **Step 1 — panjang:** 30 dtk (~100 kata, 7–8 shot), 45 dtk (~150 kata,
  10–12 shot), 60 dtk (~205 kata, 14–16 shot).
- **Step 2 — ide:** HARUS fakta nyata / mekanisme dunia nyata yang diceritakan
  sebagai cerita mini — ranking: **A)** underdog fisika tersembunyi (kelihatan
  bodoh, diejek semua orang, lalu prinsip fisika membuktikan dia benar —
  contoh bentuk: engineer yang memberi celah di rel kereta), **B)** eksperimen
  atau institusi aneh yang nyata, **C)** skema/loophole cerdik dengan twist
  yang membongkar cara kerjanya. Dilarang: fantasi "what if" murni dan
  explainer polos tanpa tokoh utama. Tiap ide: judul 4–8 kata (pola
  "Why [hal biasa] [ternyata aneh]" atau "The [objek] That [hal mustahil]"),
  hook satu baris, dan fakta benar di baliknya.
- **Step 3 — naskah:** nyatakan dulu satu baris apa yang benar dan apa yang
  diada-adakan (rival/pengejek boleh fiktif; fakta tidak boleh). Aturan narasi
  ketat: hook = kalimat pertama, 5–18 kata, pernyataan (bukan pertanyaan),
  dibuka dengan seseorang (disebut perannya) melakukan aksi aneh + SATU angka
  spesifik (contoh bentuk: "A young engineer sawed gaps into a brand new
  railroad every 39 feet."). Jangan mulai dengan How/What/Why/Did you/Imagine/
  Ever. Present tense. Kalimat 2 menyebut kedua pihak + yang diperebutkan.
  Beat berurutan: **HOOK → SETUP → DOUBT** (bos/rival menertawakan, satu kutipan
  ejekan ≤ 14 kata, hero menolak menjelaskan) **→ ESCALATE** (2–3 langkah,
  rival seolah menang, satu petunjuk kecil hero benar) **→ TURN** (ancaman besar
  datang) **→ REVEAL** (narator bilang "You see," + mekanisme asli dalam satu
  kalimat benar yang polos; hero tidak pernah menjelaskan) **→ BUTTON** (gambar
  akhir: para pengejek mendapat persis apa yang mereka tertawakan). Setiap
  kalimat menamai sesuatu yang bisa DILIHAT. Minimal 2 lelucon dari pengejek,
  minimal 2 angka aneh yang spesifik, tanpa tahun ("back then"). Kalimat 10–17
  kata + satu punch line pendek 3–6 kata. Tanpa intro, nama channel, moral,
  pertanyaan ke penonton, atau CTA. Kalimat terakhir = payoff image ≤ 25 kata.
  Hitung kata sebelum ditampilkan (±10 kata dari target). Naskah ditampilkan
  sebagai satu blok bersih yang bisa di-paste ke voice generator, lalu dipecah
  per shot (satu kalimat per shot, SHOT 1, SHOT 2, …). Diakhiri: "Type GO for
  the style and shot prompts, or tell me what to change."
- **Step 4 — GO:** minta lampirkan 2–3 screenshot gaya yang mau dicocokkan,
  atau ketik DEFAULT.
- **Step 5 — style sheet (sekali):** dari screenshot, atau DEFAULT: "Flat 2D
  cartoon characters with simple round heads, dot eyes, thick clean black
  outlines and flat colours, animated on a detailed stylised 3D-rendered
  background with soft daylight, warm saturated colours, shallow depth of
  field." + "Vertical 9:16. Smooth, expressive cartoon acting. No captions,
  no subtitles, no logos, no watermarks; the only writing allowed is a number
  on a prop." Lalu tiap karakter berulang dideskripsikan dalam satu kalimat
  tetap (badan, pakaian, satu warna pengenal).
- **Step 6–7 — prompt per shot:** satu prompt per shot (4–6 detik = satu
  kalimat narasi = satu tempat, satu angle kamera, satu aksi jelas); deskripsi
  hanya apa yang kamera lihat; angka dari narasi ditampilkan tertulis di
  papan/label/prop; "Sound: ambient sound effects only. No dialogue, no
  narration, no music." Tiap shot dalam code block sendiri + durasi detik.
- **Step 8 — NEXT:** 5 opsi judul (pola Step 2, 4–8 kata, tanpa emoji) +
  deskripsi YouTube 2–3 kalimat (fakta benar di balik cerita) + 3 hashtag.
- **Prompt kedua (di dokumen yang sama):** meniru gaya Ricks Clips dari
  3 screenshot — tulis ulang style sheet sesuai look aslinya, tulis satu
  prompt image referensi 9:16 (karakter utama berdampingan, full body, di
  setting utama, gaya yang sama persis, tanpa teks), dan tulis ulang prompt
  klip sebagai satu prompt per shot (diawali "Use the attached images as the
  character and style reference.", style sheet + kalimat karakter dikutip
  kata-per-kata di setiap shot).

## Ketegangan penting: FLAT 2D vs 3D rigged

**KEDUA dokumen menuntut karakter STRICTLY FLAT 2D** — bukan model 3D rigged.
Itu cocok dengan `cartoon-3d-short/` (karakter billboard 2D) dan
`cartoon-audio-short/` (kartu 2D) di repo ini, dan **TIDAK cocok** dengan skill
`claude-3d-animated-shorts/` (stickman 3D rigged Mixamo) yang baru diinstall.
Keputusan jalur mana yang dipakai untuk video berikutnya ada di tangan Avres.

## Yang bisa langsung dipakai di pipeline lokal kita

- **Doc 1:** alurnya dibangun untuk generator video AI (klip 10 detik +
  end-frame screenshot) — BUKAN render lokal kita. Yang bisa dipakai:
  struktur stage (durasi → ide → plan → naskah → upload package), aturan
  kontinuitas, dan spesifikasi gaya flat-2D-nya.
- **Doc 2:** struktur narasi + shot-split-nya **bisa langsung dipakai** di
  pipeline lokal: hook berangka → beat DOUBT/ESCALATE/TURN/REVEAL/BUTTON →
  satu kalimat = satu shot 4–6 detik → VO → render. Ini formula yang sama
  dengan yang ditemukan di studi Ricks Clips (`STUDY.md` studi sebelumnya).
