# LEARNINGS — Riset tambahan: skill, repo & postingan soal Roblox Shorts

Perintah Avres 26 Nov 2026 ~12:46 WIB: "Sekalian lu cari cari dah tuh
skill atau postingan orang dan belajar lebih banyak, dan update ke github."
Riset paralel dengan koordinator remake `cap-remake` — file story/engine/
render TIDAK disentuh di sini. Tidak ada yang di-install/di-clone.

**Yang sudah diketahui dan TIDAK diulang di sini:** teardown per-frame 3
video (`TEARDOWN.md` R1–R17 + `STUDY.md`): durasi 90–128 dtk, hook
kalimat pertama, aturan = benda fisik yang bisa dihitung, caption karaoke
per-speaker, hard cut, pose-to-pose, twist identitas dua jalur +
cliffhanger, countdown berhenti sebelum 0, audio ynbloxtv tanpa musik vs
zaylento bed rendah tak pernah mati. Dokumen ini hanya berisi yang BARU.

**Metode:** 2 riset paralel (GitHub + postingan). GitHub: 9 query search +
verifikasi tiap kandidat dengan `git ls-remote` + GitHub API (bintang,
`pushed_at`, lisensi) per 26 Nov 2026. Postingan: `social.search` (2x) +
6x `browser.search` + 5 halaman dibaca penuh. Penilaian "cocok" hanya
dari README/metadata terverifikasi, bukan dari menjalankan kode.

## Temuan paling tajam (ringkas)

1. **Pace kami ketinggalan jauh.** Acuan terukur di luar teardown:
   3,7–4,9 kata/detik (rblx-animates, What If Animator: 223 kata/menit).
   Video kami ~2,4 kata/detik (clock-stops 225 kata / 93,7 dtk).
   Skrip viral 549–708 kata vs ~330 kata (audit rblx-animates) — cerita
   kami terlalu ringkas untuk durasi 90 dtk di pace target (~340–440 kata).
2. **Caption upgrade paling murah:** timestamp kata dari Whisper +
   spring pop per kata (`@remotion/captions`, iart-ai/tiktok-video-skills).
   Caption kami sekarang dari timing TTS — Whisper dari audio render
   tidak bisa drift.
3. **Plant-payoff 3+ dan "krisis lahir dari aturan"** (Zyvo) — belum ada
   di teardown. Tulis ending dulu, baru tanam yang dibutuhkannya.
4. **Hook word sebelum 2,5 detik; kalimat 1 = premis + frame 1
   MENUNJUKKANNYA bekerja** (rblx-animates). Tanpa title card, tanpa sapaan.
5. **Target angka yang bisa diuji:** Stayed to watch ≥70%, APV 60–75%
   di 90–104 dtk, swipe-away <30% (≈4x distribusi). Baca Stayed × APV,
   bukan satu metrik (Vidpal, Tubular via UnityFilms).
6. **Checks pra-render `REPORT PASS`** (nocodehack): tiap scene harus
   lolos — kaki nempel lantai, tangan nempel objek, wajah dalam frame,
   tidak jalan menembus meja. Adopsi sebagai gate QA stills kami.
7. **Eskalasi bernomor sebagai jam** (Night 1–5, Strike 1–3, progress
   bar) — beda dari counter fisik sekali-pakai di teardown.
8. **Musik berubah mood + drop ke hening** (rblx-animates) — beda dari
   "bed rendah tak pernah mati" maupun "tanpa musik". Keputusan sadar,
   lihat § Kontradiksi.
9. **Aset Roblox asli sebagai glTF** (jub0t/reverse-roblox-items):
   rambut, baju, emote, walk/idle/run dari katalog — satu-satunya sumber
   aset autentik. Butuh cookie Roblox (`.rbx_cookie`).
10. **75 pitfalls Roblox Studio** (laSenu) — checklist QA/directing
    paling lengkap yang ditemukan (flicker, blur, kamera di dalam pohon,
    caption out-of-sync, free model berisi hidden script, rambut hilang).

## Tabel aplikabilitas

| # | Teknik | Sumber | Tweak (jam) vs Build (hari) | Cocok untuk engine kami? | Prioritas |
|---|---|---|---|---|---|
| 1 | Naikkan pace VO ke ~3,0–3,5 kata/dtk (komedi/rule) + skrip lebih padat (~340–440 kata / 90 dtk) | rblx-animates, What If Animator | Tweak — tulis + TTS speed | YA. Tapi ada tensi dengan misteri (bisikan lambat, R14). Putuskan per genre: komedi cepat, misteri boleh lambat di beat kunci | P0 |
| 2 | Caption dari timestamp kata Whisper + spring pop per kata (`@remotion/captions`) | [iart-ai/tiktok-video-skills](https://github.com/iart-ai/tiktok-video-skills) (34★, MIT, upd 11 Nov 2026; ls-remote terverifikasi) | Build kecil — pipeline caption dari timing TTS → Whisper di audio render | YA — paling relevan. Stack sama (Remotion). Alternatif: ahgsql/remotion-subtitles (104★ tapi upd Nov 2025, berbasis SRT — kurang cocok) | P0 |
| 3 | Plant-payoff 3+: tanam 3+ hal kecil di awal, kembali di akhir; krisis harus lahir dari aturan | [Zyvo](https://www.tryzyvo.com/blog/viral-blocky-story-formula) (17 Nov 2026) | Tweak — aturan tulis, nol engine | YA | P0 |
| 4 | Hook word <2,5 dtk; kalimat 1 = premis + frame 1 menunjukkan premis bekerja | [rblx-animates](https://www.claudepluginhub.com/skills/harishisonline-rblx-animates/rblx-animates) (16 Shorts diukur, 17 Nov 2026) | Tweak — aturan tulis | YA | P0 |
| 5 | Target ukur: Stayed ≥70%, APV 60–75% (90 dtk: AVD 54–67 dtk), swipe-away <30%; diagnosa Stayed × APV; tunggu ≥48 jam sebelum menilai | [Vidpal](https://www.vidpal.ai/blog/good-retention-rate-for-youtube-shorts-benchmarks-2026), [UnityFilms/Tubular](https://unityfilms.net/youtube-shorts-analytics/), [@vidiq Threads](https://www.threads.com/@vidiq/post/DURdq1QiXWb) | Tweak — proses ukur, bukan engine | YA | P0 |
| 6 | Checks pra-render `REPORT PASS` per scene (kaki nempel lantai, tangan nempel objek, wajah dalam frame, tidak tembus meja) | [nocodehack/nocodehack-roblox-engine](https://github.com/nocodehack/nocodehack-roblox-engine) (45★, Apache-2.0, upd 19 Nov 2026; ls-remote terverifikasi) | Tweak — gate QA stills | YA, sebagai referensi — curi teknik, JANGAN migrasi ke Blender | P0 |
| 7 | Whisper-verifikasi tiap kata TTS + loudness -16 LUFS + analytics loop (views per post → bikin lebih banyak yang works) | [Shukhaadnan/roblox-shorts-automation](https://github.com/Shukhaadnan/roblox-shorts-automation) (0★, upd 16 Okt 2026) | Tweak — tambah langkah pipeline | YA (sebagian). Loudness kami sudah -15 LUFS; Whisper-verify baru. Rekam gameplay tidak relevan | P1 |
| 8 | Lip-sync ke audio + 12 ekspresi wajah | [BetaVersionHQ/beta-version-blox-studio](https://github.com/BetaVersionHQ/beta-version-blox-studio) (24★, MIT, upd 13 Nov 2026) | Build — hari (mulut per fonem, bukan per baris) | SEBAGIAN. Stack-nya Blender — hanya idenya yang diambil | P1 |
| 9 | HDRI lighting (Poly Haven CC0) + meme SFX pack + end card | [Harishisonline/rblx-animates-skill](https://github.com/Harishisonline/rblx-animates-skill) (14★, upd 20 Nov 2026; lisensi NOASSERTION) | Build — hari (env map three.js) | SEBAGIAN. Voice-nya ElevenLabs berbayar — bertentangan dengan Kokoro gratis kami | P1 |
| 10 | Eskalasi bernomor sebagai jam (Night 1–5, Strike 1–3, progress bar) | rblx-animates (lihat #4) | Tweak–build — prop bar/layar diegetik | YA | P1 |
| 11 | Musik berubah mood mengikuti cerita + drop ke hening | rblx-animates (lihat #4) | Tweak — audio pipeline | YA | P1 |
| 12 | 75 pitfalls sebagai checklist QA/directing + perencanaan kamera per kata narasi | [laSenu/roblox-in-this-town](https://github.com/laSenu/roblox-in-this-town) (21★, MIT per README, upd 20 Nov 2026; ls-remote terverifikasi) | Tweak — baca + checklist (jam) | YA, sebagai referensi. Workflow-nya (Roblox Studio asli via MCP, Windows interaktif) TIDAK cocok — tidak bisa headless di Colab | P1 |
| 13 | Pattern interrupt tiap 4–6 dtk (micro-zoom, kinetic text, SFX taktil) | [@blackstone_editions Threads](https://www.threads.com/@blackstone_editions/post/DgFWRcEkw6o) (23 Nov 2026) | Tweak — directing | YA (sebagian sudah dipunyai: punch-in). Jangan berlebihan — teardown membuktikan 1 snap cepat per video sudah cukup | P1 |
| 14 | Konsistensi gaya antar video (caption/VO/pacing sama) = mesin pengenalan setelah 2–3 Shorts | [@nokoyta Threads](https://www.threads.com/@nokoyta/post/DfvEUxygZ8e) (14 Nov 2026) | Tweak — proses | YA | P1 |
| 15 | Aset Roblox asli sebagai glTF (rambut, baju, emote, walk/idle/run) | [jub0t/reverse-roblox-items](https://github.com/jub0t/reverse-roblox-items) (2★, MIT, upd 23 Agu 2026; ls-remote terverifikasi) | Build — eksperimen (perlu cookie Roblox; easing keyframe di-drop, interpolasi linear saja) | YA — paling menarik di kategori aset. Uji satu `rbxfetch` dulu | P2 |
| 16 | Camera shake + particle/beam VFX (resep dari efek Roblox terbit) | [tabooharmony/roblox-brain](https://github.com/tabooharmony/roblox-brain) (217★, MIT, upd 15 Okt 2026) | Build — terjemah ke three.js/Remotion | SEBAGIAN. Teardown: tanpa handheld/shake di referensi — pakai hemat, hanya momen syok | P2 |
| 17 | Gait compiler (walk/run/sneak in-place deterministik) + pose/phase authoring | [yansha-os/motion-tools](https://github.com/yansha-os/motion-tools) (1★, upd 14 Okt 2026); [dillydog580/animate-roblox-characters](https://github.com/dillydog580/animate-roblox-characters) (49★, MIT, upd 15 Jul 2026) | Build — hari | SEBAGIAN. Aturan kami R8: tanpa walk cycle (glide saja). Hanya kalau cerita butuh locomotion | P2 |
| 18 | End card like/share/follow | rblx-animates-skill (lihat #9) | Tweak | RAGU. Teardown: kebanyakan viral tanpa CTA. Putuskan sadar, jangan default | P2 |
| 19 | Disiplin contact-sheet (render semua frame, tile, lihat, baru percaya) + pose-recipes tabel sudut | [SyphoDev-yt/roblox-ai-skills](https://github.com/SyphoDev-yt/roblox-ai-skills) (229★, upd 4 Nov 2026) | Tweak | SUDAH diadopsi (QA contact sheet kami). Catat sebagai konfirmasi, bukan hal baru | P2 |
| 20 | Jalur AI video generator gaya Roblox (Kling/Seedance/Hailuo/Wan) | [yuzhang-zhong/roblox-style-video](https://github.com/yuzhang-zhong/roblox-style-video) (4★, MIT, upd 24 Nov 2026) | — | TIDAK untuk engine. Konsistensi karakter antar-shot tidak terkontrol; bertentangan dengan engine deterministik kami | P2/no |
| 21 | Otomasi metadata/publikasi (n8n + Ollama → judul/deskripsi/tag → upload Short) | [priyanxs/roblox-shorts-ai-automation](https://github.com/priyanxs/roblox-shorts-ai-automation) (0★, upd 19 Okt 2026) | — | TIDAK untuk engine. Tidak menyentuh animasi | No |
| 22 | Workflow Roblox Studio asli (resmi via MCP) | [Roblox/roblox-studio-agent-plugin](https://github.com/Roblox/roblox-studio-agent-plugin) (45★, MIT, upd 10 Nov 2026, plugin resmi) | — | TIDAK untuk engine. Jalur resmi kalau suatu saat mau bangun lokasi di Studio asli | No |

## Kontradiksi yang harus diputuskan sadar (bukan ditelan dua-duanya)

1. **Pace.** Teardown (3 video, diukur frame): VO 2,1–2,8 kata/detik.
   Sumber baru (16+ Shorts, diukur yt-dlp): 3,7–4,9 kata/detik.
   Kemungkinan penjelasan: genre beda (misteri zaylento lambat vs komedi
   cepat dripdyl/rblx-animates). Jangan samakan paksa — putuskan per
   genre, dan ukur pace kami per video (saat ini ~2,4).
2. **SFX.** What If Animator: "hampir tanpa SFX". rblx-animates: "SFX di
   hampir tiap cut". Teardown: ynbloxtv tanpa SFX, zaylento bed + dentuman.
   Tiga kubu — pilih satu per video, jangan campur tanpa alasan.
3. **Musik.** ynbloxtv: tanpa musik. zaylento: bed rendah tak pernah
   mati. rblx-animates: musik berubah mood + drop ke hening. Tiga opsi
   sah — yang salah hanya musik yang menenggelamkan VO
   ([@faceless_creators_ Threads](https://www.threads.com/@faceless_creators_/post/DfKqqVzEp8x)).
4. **Durasi.** [@tubelabhq Threads](https://www.threads.com/@tubelabhq/post/DYByhGYFLtP):
   sweet spot 15–30 dtk + ending loop. Bertentangan dengan format story
   90–128 dtk kami — dicatat sebagai konflik, bukan rekomendasi.
   GhostShorts: 45–75 dtk TikTok, sampai 90 dtk Shorts. rblx-animates:
   rule stories 37–57 dtk, storyline/game 135–180 dtk (durasi terbelah
   dua — misteri panjang kami masuk kubu kedua).

## Repo yang ternyata TIDAK ADA / mati (jangan dikutip)

- **ridhotamma/roblox-animation** — TIDAK DITEMUKAN. `git ls-remote`:
  `remote: Repository not found`, API GitHub 404. Padahal masih
  terdaftar di awesomeskills.dev (skill `ranim.cjs`). Kemungkinan
  dihapus/di-private/di-rename.
- **EmirCobanOfficial/roblox-studio-mcp** — TIDAK DITEMUKAN. ls-remote
  `Repository not found`, API 404, padahal glama.ai masih me-listing-nya.
- **ezpeezee/beta-version-blox-studio** — bukan repo terpisah.
  ls-remote mengembalikan HEAD hash yang sama persis dengan
  `BetaVersionHQ/beta-version-blox-studio`; API 404 → nama lama yang
  di-redirect GitHub. Jangan dihitung sebagai dua repo.

## Yang TIDAK ketemu (terus terang)

- **Postingan Threads/X/TikTok khusus Roblox story Shorts dengan bukti
  konkret: tidak ketemu.** `social.search` query Roblox = kosong total;
  45 hasil Threads = nol menyebut Roblox. TikTok dan X tidak tercakup
  alat social di sini; `browser.search` tidak memunculkan postingan
  kreator TikTok/X dengan data — hanya panduan web/YouTube.
- **Perbandingan A/B dengan angka** (hook A vs B, retention sebelum/
  sesudah edit): tidak ketemu — kecuali klaim tanpa angka
  (@tubegrowthtips: 5 varian hook, hasil tidak dipublikasikan) dan data
  tes channel Vidpal.
- **Screenshot data retention channel Roblox story: tidak ketemu** —
  angka channel (Bolt 1,5–1,6 jt subs/bulan; channel 264-short 754 jt
  views) berasal dari transkrip video, bukan screenshot analytics yang
  bisa diverifikasi.
- **Crowd/instancing khusus Roblox Shorts:** tidak ada repo yang
  ditemukan — gap nyata, bukan ketiadaan pencarian.
- **Lighting/grade khusus Remotion+three.js gaya Roblox:** hanya dua
  sumber — HDRI Poly Haven (rblx-animates-skill) dan "bright
  Roblox-style lighting" (beta-version-blox-studio).
- **TTS lokal alternatif selain Kokoro:** hanya ElevenLabs (berbayar)
  dan Gemini TTS (kit YouTube, bukan GitHub).
- **Repo tipis tanpa isi:** sudeepcharan1-ctrl/roblox-ai-shorts-studio-
  (0★, README 1 baris) — tidak ada teknik yang bisa dinilai.

## Sumber riset lanjutan

- Indeks kurasi: [zhuyansen/awesome-claude-video-skills](https://github.com/zhuyansen/awesome-claude-video-skills)
  (2755★, 548 repo skill video, refresh tiap 8 jam) — sumber kandidat
  ronde berikut.
- Panduan editing umum (angka pacing & sound): [VortexXcel](https://vortexxcel.com/youtube-shorts-editing-guide/)
  (beat baru tiap 1,5–3 dtk; 30–50% penonton hilang dalam 2 dtk pertama;
  musik ducked -8 s/d -12 dB di bawah VO), [CaptionPlug](https://www.captionplug.com/blog/increase-watch-time-on-shorts)
  (potong 40–50% durasi mentah; pattern interrupt tiap 3–5 dtk),
  [Cut.pro](https://cut.pro/en/blog/roblox-clips-how-to-clip-2026)
  (klip Roblox: mulai ≤3 dtk sebelum turning point; Roblox di TikTok
  Live 613 jt jam H1 2026).
- Transkrip YouTube: [What If Animator — "How to Make Viral Roblox Shorts Using Claude"](http://yttotranscript.com/transcript/youtube/gR6hWp8y09M)
  (264 shorts, 754 jt views, terbaik 21 jt; 223 kata/menit; shot baru
  tiap 1,5 dtk), ["How I Actually Make Viral Roblox AI Shorts In 5 Minutes"](https://youtubetotranscript.com/transcript?v=3JeKXrfPfLc)
  (channel "Bolt": 1,5–1,6 jt subs/bulan, 310+ jt views).
- Panduan format: [GhostShorts](https://ghostshorts.com/blog/how-to-make-roblox-content-videos-tiktok-youtube-shorts-2026)
  (7 Apr 2026; balas komentar dengan video follow-up untuk series).
- Threads umum Shorts: [@vidiq](https://www.threads.com/@vidiq/post/DURdq1QiXWb)
  (ambang 70% watch-through), [@theoyta](https://www.threads.com/@theoyta/post/DgH-dvUo8gA)
  (flat retention line = perfect), [@nokoyta](https://www.threads.com/@nokoyta/post/DfvEUxygZ8e)
  (konsistensi gaya), [@faceless_creators_](https://www.threads.com/@faceless_creators_/post/DfKqqVzEp8x)
  (3 kesalahan: sapaan pembuka, musik menenggelamkan VO, akhir hard stop),
  [@vidiq](https://www.threads.com/@vidiq/post/DfIYydZEjNm)
  (satu detik ekstra bisa merugikan ratusan ribu views).

## Batas kejujuran

- Semua penilaian "cocok/tidak" didasarkan pada README + metadata
  terverifikasi, bukan dari menjalankan kode. Tidak ada repo yang
  diklaim "bagus" di luar bukti tersebut.
- Sebagian sumber adalah halaman yang menjual workflow/tool-nya sendiri
  (rblx-animates, Zyvo, GhostShorts, Vidpal, What If Animator) — angkanya
  dicatat, tapi dibaca dengan saringan itu.
- Angka channel dari transkrip YouTube (Bolt, channel 264-short) tidak
  bisa diverifikasi ke screenshot analytics.
- Riset ini tidak mencakup TikTok/X langsung (alat social tidak
  menjangkaunya) dan tidak mencakup bahasa selain Inggris/Indonesia.
