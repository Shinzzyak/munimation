# Studi: roblox-engine.7z — ternyata proyek Remotion lengkap

## Ringkasan

File `roblox-engine.7z` (**1.001 MB**, diunduh dari link Google Drive Avres
25 November 2026 ~12:28 WIB, file ID `1tCNIqtyXX7_2qUow4YvilE4NmE21jbFN`,
pemilik baukazhan.dev) **BUKAN binary Roblox**. Ini proyek lengkap
**`roblox-remotion` / `roblox-shorts-engine` v1.0.0** — pipeline end-to-end untuk
membuat Shorts cerita bergaya Roblox 3D dengan Remotion + Three.js.

Arsip: **16.151 entry**, mayoritas `node_modules/`; hanya **144 file asli**.
Arsip utuh tersimpan lokal di `~/workspace/research/roblox-engine/roblox-engine.7z`;
file kunci diekstrak ke `~/workspace/research/roblox-engine/extracted/`.
Studi ini hanya menyertakan 7 file kunci (48 KB) — sisanya sengaja tidak ikut
(lihat "Yang TIDAK disertakan").

Stack: **Remotion 4.0.242, three ^0.163.0, React 18.3.1** (`package.json`),
`@react-three/fiber` ^8.16.0, `@react-three/drei` ^9.105.0, TypeScript ^5.4.5.
`remotion.config.ts` memakai `Config.setChromiumOpenGlRenderer('angle')`.

## Skill: roblox-shorts-director (266 baris)

Satu video = **satu file Python** `stories/<slug>.py` yang berisi naskah (beats),
musik, SFX, cast, dan scene — semua dipilih dari katalog yang ada di skill.
Satu perintah mengubahnya jadi MP4. File skill lengkap ada di
`.agents/skills/roblox-shorts-director/SKILL.md` (disertakan di sini).

### Anatomi file cerita (`stories/_template.py` disertakan)

```python
TITLE = "HAIR COLOR DECIDES YOUR LIFE"
BEATS = [{"id": "b1", "text": "In this town, your hair color decides your whole life.", "pause": 0.08},
         {"id": "w1", "text": "GINGER!", "voice": "am_michael", "shout": True, "pause": 0.12}]
MUSIC = {"file": "music/fallen-down.mp3", "under_voice": 0.022, "gaps": 0.05,
         "dropouts": [("b10+0.3", "w3.end")]}
SFX = [("b1", "whoosh"), ("b2+0.15", "pop", {"f": 600}), ("w3", "reveal")]
CAST = {"hero": {"extends": "kid_boy", "hair": {"color": "ginger"}, "freckles": True}}
def scenes(T): ...  # T.B["b3"] = frame awal beat b3, T.E["b3"] = frame akhir, T.END
```

Referensi waktu di SFX/MUSIC/`T.f()`: `"b3"` = awal beat, `"b3.end"` = akhir beat,
`"b3+0.4"` / `"b3.end-0.2"` = offset detik.

## Kokoro TTS LOKAL — poin terbesar buat kita

Narasi memakai **Kokoro TTS lokal (ONNX)**: `models/kokoro-v1.0.onnx` +
`models/voices-v1.0.bin`. **Gratis, jalan offline, tanpa batas 10 request/hari**
seperti Google AI Studio — dan tanpa biaya ElevenLabs.

- Narator: **`af_heart`**, speed **1.18** (rentang oke 1.16–1.22). Diukur sebagai
  suara Kokoro terdekat dengan narator referensi: median pitch ≈ 200 Hz,
  ≈ 5,8 suku kata/detik. Tanpa dead air: jeda 0,06–0,10 dtk, 0,12–0,30 dtk
  hanya sebelum reveal atau baris terakhir.
- Kata teriak klimaks adalah beat terpisah (`"shout": True`, satu kata tiap beat:
  "GINGER!" / "IS!" / "MAYOR!") dengan suara kontras: `am_michael`, `am_adam`,
  atau `af_bella`.
- Musik default `public/music/fallen-down.mp3` — otomatis di-level dan di-duck
  di bawah suara; di-drop sebelum reveal besar (`dropouts`).

## Karakter R6 Roblox

Konstruktor karakter (`src/characters/look.ts`, `clothing.ts`,
`Accessories.tsx`, `src/components/R6Character.tsx`, `HairSystem.tsx`):
karakter Roblox klasik 6 bagian (blocky), bukan stickman.

- **Preset (22):** `kid_boy`, `kid_girl`, `little_brother`, `schoolboy`,
  `schoolgirl`, `nerd`, `bully`, `cool_kid`, `teen_girl`, `dad`, `real_mom`,
  `teacher_woman`, `teacher_man`, `principal`, `grandpa`, `grandma`,
  `classic_noob`, `noob`, `bacon`, `guest`, `teacher`, `builderman`, `mom`.
- **Rambut:** `bacon`, `messyFringe`, `sidePart`, `fluffySwept`, `slickBack`,
  `spikyAnime`, `curly`, `buzz`, `bob`, `wavyLong`, `ponytail`, `bun`,
  `pigtails`, `grandpa`, `none`; warna 14 pilihan + hex, `ombre` untuk ujung
  rambut panjang.
- **Pakaian:** atasan `tshirt`/`hoodie`/`pullover`/`plaid`/`polo`/`blouse`/
  `sweater`/`vest`/`jacket`/`uniform`/`suit`/`dress`/`tank`; bawahan
  `pants`/`jeans`/`shorts`/`skirt`; sepatu `sneakers`/`boots`/`formal`;
  aksesori `cap`, `backwardsCap`, `beanie`, `glasses`, `sunglasses`,
  `headphones`, `bow`, `crown`; `facialHair`, `freckles`, `blush`;
  `scale` 0,55 (bayi) – 1,2 (raksasa).
- Satu look per hero selama video; ganti look (mis. rambut dicat, dapat mahkota)
  = cast entry kedua + trik "parking" (geser aktor ke `OFF` = `[0, -80, 0]`).
- Cek semua look secara visual dengan render `CharacterLineup`.

## Kota persisten — 12 lokasi

Satu kota yang sama untuk semua video (`src/environments/`: `TownMap`,
`buildings.tsx`, `props.tsx`, `interiors.tsx`, `locations.ts`, `kit.tsx`).
Stage tiap lokasi berpusat di origin; aktor di x ∈ [−6, 6], z ∈ [−3, 5];
kamera di +Z menghadap −Z (z ≈ 11–23). Lihat semua lokasi dengan render
`LocationGallery`.

| Lokasi | Isi |
|---|---|
| `town_overview` | Aerial seluruh kota (untuk hook). Kamera ≈ `[-10, 62, 74]` → `[8, 0, -6]`, fov 55. Tanpa aktor. |
| `street` | Trotoar Main St depan rumah biru; ada hydrant (x ≈ −5,5) dan lampu lalu lintas (x ≳ 4). |
| `crossroads` | Penyeberangan Main × Maple, sekolah di kanan. |
| `school_exterior` | Halaman sekolah (papan nama, jam, kolom, tiang bendera, rak sepeda, bus). |
| `house` | Halaman depan rumah hero; varian `blue` (2 lantai), `yellow`/`green` (beranda), `red` (bata), `white` (modern + garasi). |
| `shop` | Trotoar depan RoMart (awning, vending machine). |
| `playground` | Taman: seluncuran, ayunan, bak pasir, jungkat-jungkit. |
| `classroom` | Papan tulis (belakang), meja guru, meja murid; `boardText` ≤ 4 baris. |
| `hallway` | Loker, pintu ROOM 101, banner, lemari trofi. |
| `living_room` | Sofa, TV, meja kopi. |
| `kitchen` | Counter, wastafel, kompor, kulkas, meja makan. |
| `bedroom` | Kasur, meja gaming, lemari. |

Satu keluarga memakai satu `variant` yang sama untuk `house`, `living_room`,
`kitchen`, `bedroom`. `isNight: True` bisa di semua lokasi: jendela menyala,
lampu hidup.

## Aturan keras (diambil dari video referensi, dicek otomatis oleh build)

| Aturan | Nilai |
|---|---|
| **Pembuka** | Kata pertama HARUS "In this town, …" atau "In this world, …" + aturan absurd. Tanpa intro, tanpa title card. |
| **Panjang** | 35–45 detik, 14–16 beat, Bahasa Inggris. |
| **Cut** | Shot kamera baru tiap **2–3 detik** (referensi rata-rata 1,2–1,6 dtk/shot). Build GAGAL kalau ada shot > 3,5 dtk atau < 1,0 dtk. |
| **Caption** | Otomatis dari beat: 1–2 kata, putih, outline hitam, di **68% tinggi** frame. Tanpa HUD lain. |
| **Jarak** | Pusat aktor ≥ **4,5 stud** di setiap frame (aktor berskala: 4,5 × rata-rata scale). Tanpa overlap / noclip. |
| **Framing** | Wajah terlihat. Jangan potong karakter jadi dua di tepi frame pada 2-shot. Tiga aktor berdampingan butuh wide shot (kamera z ≈ 20–23, fov 58–60). |

## Formula cerita

1. **Hook (0–6 dtk):** "In this town, [aturan absurd]." + konsekuensi. Visual: aerial `town_overview`.
2. **World-building (6–16 dtk):** 2–3 cara konkret orang hidup dengan aturan itu.
3. **Personal stakes (16–26 dtk):** narator ("I/me"), saudara/teman/orang tua, pengecualian aturan, plus bully/antagonis.
4. **Klimaks + twist (26–42 dtk):** krisis → kata teriak → payoff → twist baris terakhir ("But last night…").

Setiap beat harus bisa DITUNJUKKAN dengan part yang ada: aktor + animasi +
ekspresi + prop di satu lokasi. Aturan harus terlihat di 3D (warna rambut,
mahkota, counter melayang, halo, teks papan tulis).

## Animasi, ekspresi, prop, SFX

- **Animasi:** `idle`, `walk`, `sprint`, `jump`, `wave`, `point`, `dance`,
  `celebrate`, `panting`, `knocked` (terbaring), `sleep`.
- **Ekspresi:** `smile`, `laugh`, `shocked`, `panic`, `angry`, `cool`,
  `deadpan`, `sleeping`.
- **Prop:** `backpack`, `bloxy_cola`, `pointer`, `pan`, `clipboard` (juga "rule
  book"), `hammer`, `wood_plank`, `binoculars`, `mouth_tape`, `halo_gold`,
  `halo_red`, `creepy_shadow`; counter melayang `counter_high` (912.450),
  `counter_mid` (42.810), `counter_bully` (614.200), `counter_3/2/1/0`.
- **SFX preset (lembut saja, jangan beep kotak/saw mentah):** `whoosh`, `swish`,
  `pop`, `pop_down`, `bubbles`, `laugh`, `sparkle`, `ding_dong`, `bell_low`,
  `sad`, `thud`, `impact`, `riser`, `reveal`, `twist`. Kerapatan: ~1 aksen per
  beat, tepat di kata yang digambarkan. Sebelum reveal: `riser` masuk ke teriak,
  `impact` di tiap kata teriak, `reveal` di yang terakhir; `twist` di baris akhir.

Koreografi & kamera (`scripts/shorts/scene.py`): helper `kf` / `hold` / `face` /
`HALF` / `OFF`; `shot` / `wide` / `medium` / `close_up` / `cover` (default —
isi scene dengan cut ~2,5 dtk) / `split_shots`. `shake` 0,04–0,12 hanya untuk
teriak dan impact. Ritme cut: wide → medium → close-up, bergantian; close-up
di setiap kata emosional.

## Pipeline (`scripts/make_short.py` — disertakan)

```powershell
python scripts/make_short.py stories/<slug>.py --stills            # VO+musik+SFX -> scene -> rule check -> typecheck -> still preview
python scripts/make_short.py stories/<slug>.py --skip-tts --render # MP4 final 1080x1920 30fps -> out/<slug>.mp4
```

1. Tulis `stories/<slug>.py` dari `stories/_template.py`.
2. `--stills`: menulis `public/soundtrack.wav` + `public/kokoro-cues.json`,
   `src/story/currentStory.ts` (generated — jangan edit manual), dan
   `out/preview/<slug>/f*.png` + `sheet-*.png` (satu still per shot kamera).
   Perbaiki SEMUA baris `RULE CHECKS FAILED` (`SPACING`, `SHOTS`, `SCENES`).
3. Periksa contact sheet (baca PNG-nya): wajah terlihat, tidak ada overlap,
   aksi cocok dengan caption, lokasi kebaca.
4. `--render` (tambah `--skip-tts` hanya bila BEATS/SFX/MUSIC tidak berubah)
   → `out/<slug>.mp4`.
5. Catatan Windows: pakai `npx.cmd`, bukan `npx`; render butuh `--gl=angle`
   (sudah dipassing `make_short.py`).

## Contoh jadi + referensi (di arsip, tidak disertakan di repo)

- **3 video jadi di `out/`:** `hair_color.mp4`, `one_hundred_words.mp4`,
  `word_limit.mp4` — plus frame preview dan contact sheet per video.
- **3 cerita contoh di `stories/`:** `hair_color.py`, `one_hundred_words.py`,
  `word_limit.py` (template ke-4: `_template.py`, disertakan di sini).
- **5 video referensi di `references/` (1920p60):** "Bed Wars", "Full Moon",
  "Keep Walking", "Shadow Tag", "The Three Tokens".
- Musik: `public/music/fallen-down.mp3`, soundtrack jadi `public/soundtrack.wav`.

## Yang TIDAK disertakan di repo ini (dan kenapa)

- `node_modules/` (~15.900 entry) — hasil `npm install`, regenerable.
- `out/` — MP4 jadi + bundle + preview PNG (besar; video tidak masuk repo,
  mengikuti aturan repo ini: video jadi release asset, bukan commit).
- `models/` (`kokoro-v1.0.onnx` + `voices-v1.0.bin`) — model TTS biner, besar.
- `references/` — 5 MP4 referensi (besar, berhak cipta pihak ketiga).
- `src/` lengkap (karakter, environment, komponen) — hanya skema tipenya yang
  disertakan (`src/types/schema.ts`); source lengkap tetap di arsip lokal.
- Arsip utuh 1 GB tersimpan lokal di
  `~/workspace/research/roblox-engine/roblox-engine.7z` (bukan di repo).

## Penilaian singkat

Ini pipeline paling "jadi" dari semua yang kita kumpulkan: cerita → VO lokal →
scene → rule check otomatis → still → render, semua dalam satu perintah, dengan
3 contoh yang sudah terbukti jadi MP4. Dua hal yang paling berharga buat pipeline
kita: **(1) Kokoro TTS lokal** — melepas batas 10 request/hari AI Studio dan
biaya ElevenLabs; **(2) rule check otomatis** (jarak aktor, durasi shot) yang
menangkap kesalahan sebelum render. Kekurangannya: cerita dikunci Bahasa Inggris
dan formula "In this town…" (perlu adaptasi kalau mau Bahasa Indonesia), dan
karakter R6-nya gaya Roblox — cocok untuk video bertema Roblox, bukan untuk
semua topik. Belum diinstall sebagai skill — menunggu keputusan Avres jalur
mana yang dipakai untuk video berikutnya.
