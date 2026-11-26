"""CAP-REMAKE - remake video 2 ynbloxtv: "Every time you cap, a cap pops up on your head."
Roblox Short, slug: cap-remake. REMAKE ATAS PERINTAH EKSPILISIT AVRES 2026-11-26 12:45 WIB
("Coba lu bikin video yang sama bre dari ini") — aturan R17 teardown ("jangan copy
script/karakter/shot") DIKESAMPINGKAN untuk video ini saja.

Sumber: ~/workspace/research/roblox-refs/teardown-vid2-shots.md (40 shot S01-S40 + end
card, 104,02 dtk; story 0-100,0 dtk) + vid2-transcript.json (faster-whisper tiny, KASAR
di slang — dialog final dicek silang ke caption per shot di shot list; kalau caption dan
transkrip beda, CAPTION yang dipakai). Referensi format: work-draft/clock-stops.py
(long-form override) + work-draft/no-word.py.

DIALOG (37 beat, 216 kata — hitung via len(" ".join(b["text"] for b in BEATS).split())):
hook "On this block..." (BUKAN "In this town" — hook asli vid2; deviasi skill yang
diotorisasi sebagai remake) -> toko -> guru -> lemonade -> duo -> hitungan 17/18/19 ->
cewek -> "Nah" -> menara roboh -> aftermath -> closer (aturan diulang + 1 topi oranye).
Ejaan slang dipertahankan: DAT'S, IAN NEVA (di b2 "never capped" — lihat catatan),
ION KNOW, GANG, UNDA DOORS, DOLLAS, DUCKIN', GON.

OVERRIDE YANG DIOTORISASI (parent task 2026-11-26):
- Durasi ~98-101 dtk + ~37 beat (bukan 35-45 dtk / 14-16 beat skill).
- SATU shot crane penutup 8,53 dtk (S40 ref) — melanggar SHOT_MAX 3,5 dtk; akan muncul
  di RULE CHECKS FAILED sebagai satu-satunya pelanggaran yang diotorisasi.
- Shot 1,0-3,5 dtk TETAP berlaku untuk semua shot lain.
- MUSIK MATI TOTAL (ynbloxtv = tanpa musik): MUSIC = None — build_soundtrack()
  sudah menangani music=None (bed = 0.0), TIDAK ADA patch audio.py untuk musik.
- SFX HANYA boom akhir (dua hantaman, ref 100,0-100,7 dtk). TIDAK ADA pop saat topi
  jatuh (ref: pop terjadi dalam diam). Boom = preset baru "boom" di audio.py
  (PATCH 2026-11-26).

SUARA (speed 0.78 semua beat — am_adam di 1.18 bicara ~3,9 kata/dtk, terlalu cepat
untuk 2,18 kata/dtk ref; 0.78 -> ~2,5 kata/dtk + jeda komedi; run pertama 0.75
menghasilkan T.END 103,45 dtk, di atas target 98-101 — dinaikkan ke 0.78):
- hero/narator: am_adam (default engine), caption #FDE047 kuning.
- twin: am_michael, caption #4ADE80 hijau (captionColor eksplisit — default engine
  am_michael = biru, SALAH buat twin).
- cewek: af_bella, caption #F472B6 pink (captionColor eksplisit — default engine
  af_bella = hijau, SALAH buat cewek).
- guru: am_onyx (ADA di models/voices-v1.0.bin — dicek via strings; BUKAN am_adam/
  am_michael), caption #7DD3FC biru muda.
- shopkeeper: am_echo, caption #FDE047 kuning (sesuai ref: kalimat shopkeeper
  berkaption kuning).
- vendor lemonade: am_eric, caption #F472B6 pink (pengecualian teardown: "BROKE"/
  "HRMM" pink).

DIALOG YANG TIDAK TERVERIFIKASI PENUH (dipakai + ditandai):
- b29 "I keep it a hundred, twin." — transkrip tiny: "I keep it a honey twin"
  ("honey" = salah dengar "hundred"); daftar caption S31 di teardown TIDAK memuat
  kelompok "A HUNDRED" (hanya ASK ME / ANYTHING / I KEEP IT / TWIN). Dipakai karena
  frasa "keep it a hundred" paling masuk akal + ada kata di antara "it" dan "twin"
  di timing transkrip (76,46-76,74). TIDAK TERVERIFIKASI dari caption.
- b2 "And I never capped a day in my life, twin." — caption S03: "AND IAN NEVA /
  CAPPED A DAY / IN MY LIFE / TWIN"; transkrip menyisipkan "the damn" (noise ASR,
  dibuang; caption menang). TTS ditulis "never" (bukan "neva") supaya Kokoro
  mengucap benar; caption akan tampil "NEVER" bukan "NEVA" — deviasi kecil, dicatat.
- b12 "Dat's cuz you sweet, twin." / b24 "Dat's cap, twin." / b35 "Ion know what dat
  was, twin." / b22 "unda doors" / b9 "dollas" / b14 "Say unc" / b26 "Swiss cheese
  yo ahh" — ejaan caption dipertahankan; risiko TTS kecil (Kokoro membaca apa adanya).
- b8 "Hrmm." — suara berpikir non-kata (tidak ada di transkrip, ada di caption pink);
  TTS mungkin mengucap aneh/pendek — cek durasi beat di log TTS.
- b15 "Deadass." — timing transkrip (38,64) vs drop topi merah teardown (38,3-38,5)
  selisih ~0,3 dtk; tidak material.

PEMETAAN SHOT PENDEK REF (<1,0 dtk -> >=1,0 dtk, komedi dari jeda):
- S06 0,40 (shopkeeper cap-drop wide) -> split scene shopkeeper-drop, 1 shot wide
  1,17 dtk; dome oranye pop di awal scene itu (mendarat ~11,07 dtk vs ref 10,97-11,13).
- S07 0,63 (classroom wide flash) -> shot 1 scene teacher (wide ~2,7 dtk, cover).
- S09 0,60 (lemonade wide flash) -> shot 1 scene lemonade (wide ~2,9 dtk, cover).
- S24 0,70 (playground connector) -> shot 1 scene twin-count (wide 1,6 dtk).
- S29 0,40 ("NINETEEN" twin CU) -> scene twin-19, 1 shot ~1,4 dtk (pause 1,0 setelah b27).
- Tambahan yang ikut dipanjangkan: S27 0,97 -> masuk scene count-18 (CU twin ~1,7 dtk);
  S34 0,94 (roboh) -> jeda pause 0,8 setelah b31 "Nah" (roboh terjadi di jeda itu);
  S37 0,56 (aftermath) -> shot 1 scene aftermath (wide ~1,15 dtk).
- Wipe 1,00-1,10 (S01->S02) -> hard cut (engine tidak punya wipe; adaptasi dicatat).

PROP — API DISEPAKATI DENGAN WORKER PROP (nama dipakai persis; renderer SUDAH
diimplementasikan worker prop 2026-11-26 — Accessories.tsx CapTower/CapDome/
Ushanka/Balaclava + RobloxShortComposition capAccessoriesFor + schema.ts):
- Scene key "cap_tower": {"count": N} (1-19 topi baseball, warna bervariasi
  deterministik per index; 0 = roboh/habis; 1 = satu topi oranye di closer) +
  {"lean": derajat} untuk miring (S23 lean 25, S33 lean 15, S34 roboh di jeda b31).
  Hitungan per scene mengikuti ledger teardown: hook 10 -> duo 11 -> shop-2b 12
  (merah jatuh di b15 "Deadass", split scene di b15+1,2) -> tab-hero 13 -> homework
  14 -> tower-15 15 (pink jatuh di b19+0,3, SAMA dtk dgn ref 49,5) -> tower-16 16
  (hitam, tiltTop 12) -> doorway 17 (lean 25) -> count 17/18/19 di
  b23/b25/b27 -> roboh 0 -> closer 1 oranye.
- Scene key "cap_dome": {actor: warna | [warna,...]} — BOTTOM-to-top untuk stack
  (guru ["purple","pink","black"]); shopkeeper "orange" (pop di split scene
  shopkeeper-drop, mendarat ~11,07 dtk vs ref 10,97-11,13), vendor "teal",
  cewek "teal" (di atas topi putih/hijaunya, lift otomatis 0,75).
- Scene key "cap_scatter": True — topi berserakan di kaki hero (aftermath /
  hero-dunno / closer; dirender sebagai prop hero 'cap_scatter').
- Pop on-camera (jatuh dari atas ~0,25 dtk) terjadi di awal scene saat count/stack
  BERTAMBAH dari scene sebelumnya; pop pertama menara (10 topi pembuka) TIDAK ada
  (sudah ada sejak frame pertama, sesuai ref). Pop 13 dan 14 terjadi off-screen di
  ref tapi di sini jatuh terlihat di awal scene tab-hero / homework — deviasi kecil,
  dicatat.

ADAPTASI LOKASI / DIEGETIK (engine tidak punya):
- "shop" = trotoar depan RoMart, BUKAN interior toko — adegan kasir (S04-S06,
  S15-S18) dipentaskan di storefront; kandang keripik berkunci + stoples "TIPS"
  tidak ada geometrinya (dicatat; worker prop bisa menambah).
- Stan lemonade: lokasi "lemonade_stand" (worker prop 2026-11-26): counter +
  awning kuning-putih + papan "LEMONADE 50¢" terbaca; vendor di belakang counter
  (z -1,6). Pindah dari "street" 2026-11-26 (integrasi/QA) — sekaligus
  membersihkan wart papan "TOWER LOG / MISSING" clock-stops dari background
  lemonade (clock tower di (-10,0,-16) jauh dari anchor stan (-40,0,30)).
- "PARK RULES / NO DUNKING ON KIDS / NO CRYING": tidak ada papan tanda di engine —
  tidak dirender (dicatat; boardText hanya bekerja di classroom).
- Poster kelas "BE KIND / WORK HARD" dipindah ke boardText (adaptasi).
- Papan kelas S08 tidak terbaca penuh di ref ("...APER") -> boardText ditulis
  ["GRADE TESTS", "BY FRIDAY"] sesuai kalimat guru.
- Jalan masuk cewek (S30): di ref terjadi selama jeda sunyi sebelum "Hi"; di sini
  cewek berjalan di 1,5 dtk pertama scene girl-enter (selama b28), bukan selama
  jeda b27 — adaptasi kecil.

AKSESORI — STATUS 2026-11-26 (worker prop SUDAH mendarat paralel saat story ini
ditulis; dicek langsung di Accessories.tsx / look.ts / RobloxShortComposition.tsx):
- Balaclava hitam hero: ADA ("balaclava" — hitam, celah mata; mata/alis tetap terlihat).
- Beanie putih twin: ADA sebagai "ushanka" (putih, ber-flap telinga) — dipakai di CAST.
- Topi cewek putih ber-brim hijau: ADA ("cap" putih, secondary hijau); bintang di
  topi TIDAK ADA. FLAG minor.
- Guru: rompi cokelat + dasi merah didekati dengan top "suit" cokelat + secondary
  merah (dasi); kertas putih = prop "clipboard". FLAG: suit bukan vest.
"""
from shorts.scene import HALF, OFF, close_up, cover, face, hold, kf, medium, shot, split_shots, wide  # noqa: F401

TITLE = "EVERY TIME YOU CAP, A CAP POPS UP ON YOUR HEAD"

YELLOW = "#FDE047"   # hero / shopkeeper
GREEN = "#4ADE80"    # twin
BLUE = "#7DD3FC"     # guru
PINK = "#F472B6"     # cewek / vendor (pengecualian teardown)

# 1. SCRIPT: 37 beats, 216 kata. Hook "On this block,..." (remake vid2, bukan "In this town").
BEATS = [
    {"id": "b1", "text": "On this block, every time you cap, a cap pops up on your head.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.08},
    {"id": "b2", "text": "And I never capped a day in my life, twin.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.3},
    {"id": "b3", "text": "I told him the chips are locked up for everybody.", "voice": "am_echo", "speed": 0.78, "captionColor": YELLOW, "pause": 0.5},
    {"id": "b4", "text": "I said I would grade your tests by Friday.", "voice": "am_onyx", "speed": 0.78, "captionColor": BLUE, "pause": 0.08},
    {"id": "b5", "text": "That was March.", "voice": "am_onyx", "speed": 0.78, "captionColor": BLUE, "pause": 0.3},
    {"id": "b6", "text": "I'll do it this Friday.", "voice": "am_onyx", "speed": 0.78, "captionColor": BLUE, "pause": 0.8},
    {"id": "b7", "text": "I'm broke.", "voice": "am_eric", "speed": 0.78, "captionColor": PINK, "pause": 0.3},
    {"id": "b8", "text": "Hrmm.", "voice": "am_eric", "speed": 0.78, "captionColor": PINK, "pause": 0.5},
    {"id": "b9", "text": "Bruh got forty million dollas, twin. One cap.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.5},
    {"id": "b10", "text": "My twin? Zero. He ain't never lied once.", "voice": "am_michael", "speed": 0.78, "captionColor": GREEN, "pause": 0.08},
    {"id": "b11", "text": "I just don't see the point.", "voice": "am_michael", "speed": 0.78, "captionColor": GREEN, "pause": 0.5},
    {"id": "b12", "text": "Dat's cuz you sweet, twin.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.3},
    {"id": "b13", "text": "Four dollars, twin.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.3},
    {"id": "b14", "text": "Say unc, I got motion, twin.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.08},
    {"id": "b15", "text": "Big money. Deadass. Put it on my tab.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.3},
    {"id": "b16", "text": "You don't have a tab.", "voice": "am_echo", "speed": 0.78, "captionColor": YELLOW, "pause": 0.3},
    {"id": "b17", "text": "I got a tab. What you mean, gang?", "speed": 0.78, "captionColor": YELLOW, "pause": 0.5},
    {"id": "b18", "text": "Homework?", "voice": "am_onyx", "speed": 0.78, "captionColor": BLUE, "pause": 0.3},
    {"id": "b19", "text": "I ain't gon lie, my dog ate it.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.08},
    {"id": "b20", "text": "You don't have a dog.", "voice": "am_onyx", "speed": 0.78, "captionColor": BLUE, "pause": 0.3},
    {"id": "b21", "text": "He ran away, twin. He was ashamed.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.5},
    {"id": "b22", "text": "By lunch, I was duckin' under doors, twin.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.5},
    {"id": "b23", "text": "Bro, you got seventeen. I been counting.", "voice": "am_michael", "speed": 0.78, "captionColor": GREEN, "pause": 0.3},
    {"id": "b24", "text": "Seventeen? Dat's cap, twin.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.3},
    {"id": "b25", "text": "Eighteen.", "voice": "am_michael", "speed": 0.78, "captionColor": GREEN, "pause": 0.5},
    {"id": "b26", "text": "Keep countin', twin. I'll really Swiss cheese yo ahh.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.5},
    {"id": "b27", "text": "Nineteen.", "voice": "am_michael", "speed": 0.78, "captionColor": GREEN, "pause": 1.0},
    {"id": "b28", "text": "Hi, can I ask you something?", "voice": "af_bella", "speed": 0.78, "captionColor": PINK, "pause": 0.3},
    {"id": "b29", "text": "Ask me anything. I keep it a hundred, twin.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.5},
    {"id": "b30", "text": "Do you like me?", "voice": "af_bella", "speed": 0.78, "captionColor": PINK, "pause": 1.0},
    {"id": "b31", "text": "Nah.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.8},
    {"id": "b32", "text": "Oh. Me neither.", "voice": "af_bella", "speed": 0.78, "captionColor": PINK, "pause": 0.5},
    {"id": "b33", "text": "Ayo.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.8},
    {"id": "b34", "text": "So that's a yes.", "voice": "am_michael", "speed": 0.78, "captionColor": GREEN, "pause": 0.7},
    {"id": "b35", "text": "Ion know what dat was, twin.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.8},
    {"id": "b36", "text": "On this block, every time you cap, a cap pops up on your head.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.08},
    {"id": "b37", "text": "And I never capped once, twin.", "speed": 0.78, "captionColor": YELLOW, "pause": 0.8},
]

# 2. MUSIC + SFX: MUSIK MATI TOTAL (ref tanpa musik; MUSIC=None -> bed 0.0).
#    SFX HANYA boom akhir x2 (ref 100,0 + ~100,5; di sini di ujung b37 + 0,5 dtk,
#    di dalam pause 0,8 + tail 0,4). TIDAK ADA pop saat topi jatuh.
MUSIC = None
SFX = [
    ("b37.end", "boom"),
    ("b37.end+0.5", "boom"),
]

# 3. CAST. Hero = badan hitam + balaclava (FLAG: balaclava TIDAK ADA di engine —
#    dirender wajah biasa, hair "none"). Twin = jaket biru + beanie putih (FLAG:
#    tanpa flap telinga ushanka). Cewek = pirang + kaus hijau + topi putih/brim
#    hijau (FLAG: bintang topi tidak ada). Guru = suit cokelat + dasi merah
#    (FLAG: suit, bukan vest) + kacamata; kertas = prop clipboard di scene.
HERO = {"skin": "dark", "hair": {"style": "none", "color": "black"},
        "top": {"style": "hoodie", "color": "black", "secondary": "black"},
        "bottom": {"style": "pants", "color": "black"},
        "shoes": {"style": "sneakers", "color": "black", "sole": "black"},
        "accessories": ["balaclava"]}
TWIN = {"skin": "medium", "hair": {"style": "messyFringe", "color": "black"},
        "top": {"style": "jacket", "color": "blue", "secondary": "white"},
        "bottom": {"style": "jeans", "color": "denim"},
        "shoes": {"style": "sneakers", "color": "white", "sole": "white"},
        "accessories": [{"type": "ushanka", "color": "white", "secondary": "white"}]}
GIRL = {"skin": "light", "hair": {"style": "wavyLong", "color": "blonde"},
        "top": {"style": "tshirt", "color": "green", "secondary": "white"},
        "bottom": {"style": "jeans", "color": "denim"},
        "shoes": {"style": "sneakers", "color": "white", "sole": "white"},
        "accessories": [{"type": "cap", "color": "white", "secondary": "green"}]}
TEACHER = {"skin": "light", "hair": {"style": "buzz", "color": "darkBrown"},
           "top": {"style": "suit", "color": "brown", "secondary": "red"},
           "bottom": {"style": "pants", "color": "charcoal"},
           "shoes": {"style": "formal", "color": "black"},
           "accessories": ["glasses"]}
SHOPKEEPER = {"skin": "medium", "hair": {"style": "sidePart", "color": "black"},
              "top": {"style": "polo", "color": "gray"},
              "bottom": {"style": "pants", "color": "charcoal"},
              "shoes": {"style": "sneakers", "color": "white", "sole": "white"}}
VENDOR = {"skin": "dark", "hair": {"style": "buzz", "color": "black"},
          "top": {"style": "tshirt", "color": "gray", "secondary": "white"},
          "bottom": {"style": "pants", "color": "brown"},
          "shoes": {"style": "sneakers", "color": "white", "sole": "white"}}
CAST = {
    "hero": HERO,
    "twin": TWIN,
    "girl": GIRL,
    "teacher": TEACHER,
    "shopkeeper": SHOPKEEPER,
    "vendor": VENDOR,
}


# 4. SCENES: contiguous 0 -> T.END, ~45 shot (ref 40 + pemanjangan shot pendek
#    + split pop on-camera). Semua aktor menghadap kamera (rotY -0.35..0.3) dan
#    >= 4,5 stud apart. Medium 2-shot toko (shop-2a/shop-2b/tab-hero) pakai dist 20
#    (QA integrasi 2026-11-26: dist 21 membuat 7 frame awal tiap medium shot toko
#    render BLANK beige di SwiftShader — terverifikasi di stills + video lokal,
#    BUKAN pop topi (tetap blank dgn count 11 tanpa pop) dan BUKAN scene-start;
#    dist 19/17 menghilangkan blank TAPI memotong lengan kiri hero; dist 20 =
#    titik tengah: blank hilang, menara + shopkeeper + sign utuh, lengan kiri hero
#    hanya menyentuh tepi frame. JANGAN naikkan lagi ke 21 tanpa cek frame awal
#    shot (1155/1238/1361). Dist 17 tetap dipakai di storefront/tower-19/closer
#    (sudah terverifikasi bersih di sana).
#    tower_cu(): CU menara — kamera dibidik ke target y 6,5 (headroom untuk menara
#    19 topi yang tingginya ~2x badan; framing menara bisa dicek di stills).
def tower_cu(a, b, x):
    return shot(a, b, [x, 6.0, 13], [x, 5.8, 12], [x, 6.5, 1], [x, 6.5, 1], 50)


def scenes(T):
    S = {k: T.B[k] - 1 for k in
         ["b2", "b3", "b4", "b7", "b10", "b12", "b13", "b15", "b16", "b17", "b18",
          "b20", "b21", "b22", "b23", "b24", "b25", "b27", "b28", "b29", "b30",
          "b31", "b32", "b33", "b34", "b35", "b36"]}
    END = T.END
    HERO_P, TWIN_P = [-1, 0, 1], [-6, 0, 1]          # duo: 5,0 apart
    HERO_S, KEEP_P = [-4, 0, 0.5], [1.5, 0, -2]      # kasir: ~6,0 apart
    TEACH_P, HERO_C = [-4, 0, -4.5], [-2, 0, 1]      # kelas: ~5,9 apart
    GIRL_P = [4, 0, 1]                                # cewek: 5,0 dari hero
    return [
        {   # S01 ref: aerial kota, hook (wipe S01->S02 jadi hard cut)
            "id": "hook", "location": "town_overview", "startFrame": 0, "endFrame": S["b2"],
            "cameraShots": split_shots(0, S["b2"], [
                lambda a, b: shot(a, b, [-10, 62, 74], [-8, 58, 70], [8, 0, -6], [6, 2, -8], 55),
                lambda a, b: shot(a, b, [-8, 58, 70], [-6, 54, 66], [6, 2, -8], [8, 0, -6], 55),
            ]),
            "characters": {},
        },
        {   # S02-S03 ref: hero di depan Corner Store, menara 10 (shot storefront)
            "id": "storefront", "location": "shop", "startFrame": S["b2"], "endFrame": S["b3"],
            "cap_tower": {"count": 10},
            "cameraShots": split_shots(S["b2"], S["b3"], [
                lambda a, b: medium(a, b, [-3, 0, 0.5], dist=17),
                lambda a, b: medium(a, b, [-3, 0, 0.5], dist=14),
            ]),
            "characters": {
                "hero": hold(S["b2"], S["b3"], [-3, 0, 0.5], 0.25, "idle", "deadpan"),
            },
        },
        {   # S04-S05 ref: shopkeeper di kasir, BELUM bertopi; dome oranye JATUH
            # di scene berikut (split di b3.end-0,7 -> pop mendarat ~11,07 dtk,
            # ref 10,97-11,13). Satu shot medium 3,0 dtk.
            "id": "shopkeeper", "location": "shop", "startFrame": S["b3"], "endFrame": T.f("b3.end-0.7"),
            "cameraShots": [medium(S["b3"], T.f("b3.end-0.7"), [1.5, 0, -2], dist=17)],
            "characters": {
                "shopkeeper": hold(S["b3"], T.f("b3.end-0.7"), KEEP_P, -0.25, "idle", "deadpan"),
            },
        },
        {   # S06 ref: jump-out wide, dome oranye JATUH dari atas (pop di awal scene)
            "id": "shopkeeper-drop", "location": "shop", "startFrame": T.f("b3.end-0.7"), "endFrame": S["b4"],
            "cap_dome": {"shopkeeper": "orange"},
            "cameraShots": [wide(T.f("b3.end-0.7"), S["b4"], [1.5, 0, -2], dist=24)],
            "characters": {
                "shopkeeper": hold(T.f("b3.end-0.7"), S["b4"], KEEP_P, -0.25, "idle", "deadpan"),
            },
        },
        {   # S07-S08 ref: guru di kelas (wide flash dipanjangkan); dome pink
            "id": "teacher", "location": "classroom", "startFrame": S["b4"], "endFrame": S["b7"],
            "boardText": ["GRADE TESTS", "BY FRIDAY"],
            "cap_dome": {"teacher": "pink"},
            "cameraShots": cover(S["b4"], S["b7"], [
                lambda a, b: wide(a, b),
                lambda a, b: medium(a, b, [-2, 0, -2], dist=17),
                lambda a, b: close_up(a, b, TEACH_P),
            ]),
            "characters": {
                "teacher": hold(S["b4"], S["b7"], TEACH_P, -0.3, "idle", "deadpan", "clipboard"),
            },
        },
        {   # S09-S11 ref: stan lemonade (lokasi "lemonade_stand" worker prop:
            # counter + awning kuning-putih + papan "LEMONADE 50¢"; vendor di
            # belakang counter z -1,6, waist-up di atas counter 2,2).
            # KAMERA (integrasi/QA ronde 1, 2026-11-26): kamera default medium/
            # close_up (y 5,6/5,0) membuat atap awning menutupi separuh muka
            # vendor + dome teal cuma jadi garis/piringan datar. Medium
            # diperbaiki dengan shot() RENDAH (y 4,4 — garis pandang lolos
            # di atas bibir depan awning karena kamera JAUH). CU RENDAH
            # (y 4,3) GAGAL: bibir DEPAN awning ternyata TINGGI (y ~5,66,
            # atap miring ke belakang), jadi garis pandang malah menabrak
            # muka depan atap — CU diganti shot() TINGGI (y 5,8, bidik ke
            # bawah) supaya garis pandang ke puncak dome lewat DI ATAS bibir
            # depan awning. CU TINGGI (y 5,8) JUGA GAGAL: puncak dome
            # (y ~5,74) cuma 0,02 di atas bibir depan atap (y ~5,72) — dome
            # terbelah jadi piringan + busur. Yang BERHASIL di medium adalah
            # kamera JAUH (garis pandang datar, dome utuh lewat celah di
            # bawah bibir atap) — jadi CU diganti shot JAUH + RENDAH
            # (dist ~10, y 4,2): framing jadi medium close-up, dome + muka
            # terbaca. Perbaikan terakhir untuk CU lemonade.
            "id": "lemonade", "location": "lemonade_stand", "startFrame": S["b7"], "endFrame": S["b10"],
            "cap_dome": {"vendor": "teal"},
            "cameraShots": cover(S["b7"], S["b10"], [
                lambda a, b: wide(a, b, [2, 0, -1]),
                lambda a, b: shot(a, b, [0, 4.4, 15.4], [0, 4.2, 14.2], [0, 4.4, -1.6], [0, 4.4, -1.6], 50),
                lambda a, b: shot(a, b, [0, 4.2, 10.4], [0, 4.1, 9.6], [0, 4.9, -1.6], [0, 4.9, -1.6], 44),
            ]),
            "characters": {
                "vendor": hold(S["b7"], S["b10"], [0, 0, -1.6], 0.25, "idle", "deadpan"),
            },
        },
        {   # S12-S13 ref: duo di lapangan; twin CU "I just don't see the point"
            "id": "duo", "location": "playground", "startFrame": S["b10"], "endFrame": S["b12"],
            "cap_tower": {"count": 11},
            "cameraShots": cover(S["b10"], S["b12"], [
                lambda a, b: wide(a, b, [-3.5, 0, 1], dist=24),
                lambda a, b: close_up(a, b, TWIN_P),
                lambda a, b: medium(a, b, [-3.5, 0, 1], dist=17),
            ]),
            "characters": {
                "hero": hold(S["b10"], S["b12"], HERO_P, 0.3, "idle", "deadpan"),
                "twin": [kf(S["b10"], TWIN_P, -0.3, "idle", "deadpan"),
                         kf(T.B["b11"], TWIN_P, -0.3, "idle", "smile"),
                         kf(T.f("b11+1.0"), TWIN_P, -0.3, "idle", "deadpan")],
            },
        },
        {   # S14 ref: CU menara 11, low angle
            "id": "tower-11", "location": "playground", "startFrame": S["b12"], "endFrame": S["b13"],
            "cap_tower": {"count": 11},
            "cameraShots": [tower_cu(S["b12"], S["b13"], -1)],
            "characters": {
                "hero": hold(S["b12"], S["b13"], HERO_P, 0.3, "idle", "deadpan"),
            },
        },
        {   # S15-S16 ref (awal): hero di kasir, "Four dollars" / "Say unc, I got motion"
            # + awal b15 "Big money." — menara masih 11; split sebelum "Deadass".
            "id": "shop-2a", "location": "shop", "startFrame": S["b13"], "endFrame": T.f("b15+1.2"),
            "cap_tower": {"count": 11},
            "cameraShots": split_shots(S["b13"], T.f("b15+1.2"), [
                lambda a, b: close_up(a, b, KEEP_P),
                lambda a, b: medium(a, b, [-1, 0, -0.5], dist=20),
            ]),
            "characters": {
                "hero": hold(S["b13"], T.f("b15+1.2"), HERO_S, 0.3, "idle", "deadpan"),
                "shopkeeper": hold(S["b13"], T.f("b15+1.2"), KEEP_P, -0.25, "idle", "deadpan"),
            },
        },
        {   # S16 ref (akhir): topi MERAH ke-12 jatuh di b15 "Deadass" (pop di awal scene)
            "id": "shop-2b", "location": "shop", "startFrame": T.f("b15+1.2"), "endFrame": S["b16"],
            "cap_tower": {"count": 12},
            "cameraShots": [medium(T.f("b15+1.2"), S["b16"], [-1, 0, -0.5], dist=20)],
            "characters": {
                "hero": hold(T.f("b15+1.2"), S["b16"], HERO_S, 0.3, "idle", "deadpan"),
                "shopkeeper": hold(T.f("b15+1.2"), S["b16"], KEEP_P, -0.25, "idle", "deadpan"),
            },
        },
        {   # S17 ref: shopkeeper CU, "You don't have a tab."
            "id": "tab-keeper", "location": "shop", "startFrame": S["b16"], "endFrame": S["b17"],
            "cap_tower": {"count": 12},
            "cameraShots": [close_up(S["b16"], S["b17"], KEEP_P)],
            "characters": {
                "hero": hold(S["b16"], S["b17"], HERO_S, 0.3, "idle", "deadpan"),
                "shopkeeper": hold(S["b16"], S["b17"], KEEP_P, -0.25, "idle", "deadpan"),
            },
        },
        {   # S18 ref: hero di kasir, menara 13 (pop off-screen saat S17)
            "id": "tab-hero", "location": "shop", "startFrame": S["b17"], "endFrame": S["b18"],
            "cap_tower": {"count": 13},
            "cameraShots": split_shots(S["b17"], S["b18"], [
                lambda a, b: medium(a, b, [-1, 0, -0.5], dist=20),
                lambda a, b: tower_cu(a, b, -4),
            ]),
            "characters": {
                "hero": hold(S["b17"], S["b18"], HERO_S, 0.3, "idle", "deadpan"),
                "shopkeeper": hold(S["b17"], S["b18"], KEEP_P, -0.25, "idle", "deadpan"),
            },
        },
        {   # S19 ref (awal): kelas, guru "Homework?" + awal hero "my dog ate it";
            # menara 14, guru pink+hitam (hitam pop off-screen). Split sebelum
            # topi pink ke-15 mendarat (b19+0,3 -> pop ~49,5 dtk, SAMA dgn ref).
            "id": "homework", "location": "classroom", "startFrame": S["b18"], "endFrame": T.f("b19+0.3"),
            "boardText": ["TEST", "EYES ON YOU"],
            "cap_tower": {"count": 14},
            "cap_dome": {"teacher": ["pink", "black"]},
            "cameraShots": [wide(S["b18"], T.f("b19+0.3"))],
            "characters": {
                "teacher": hold(S["b18"], T.f("b19+0.3"), TEACH_P, -0.3, "idle", "deadpan", "clipboard"),
                "hero": hold(S["b18"], T.f("b19+0.3"), HERO_C, 0.25, "idle", "deadpan"),
            },
        },
        {   # S20 ref: CU menara, topi PINK ke-15 mendarat MIRING (tiltTop 12);
            # menara mulai goyang. Poster "BE KIND / WORK HARD" jadi boardText.
            "id": "tower-15", "location": "classroom", "startFrame": T.f("b19+0.3"), "endFrame": S["b20"],
            "boardText": ["BE KIND", "WORK HARD"],
            "cap_tower": {"count": 15, "tiltTop": 12},
            "cameraShots": [tower_cu(T.f("b19+0.3"), S["b20"], -2)],
            "characters": {
                "hero": hold(T.f("b19+0.3"), S["b20"], HERO_C, 0.25, "idle", "deadpan"),
            },
        },
        {   # S21 ref: guru CU, 3 lapis — BOTTOM-to-top ["purple","pink","black"]
            # (atas hitam, tengah pink, bawah ungu, sesuai teardown S21)
            "id": "teacher-3caps", "location": "classroom", "startFrame": S["b20"], "endFrame": S["b21"],
            "boardText": ["TEST", "EYES ON YOU"],
            "cap_dome": {"teacher": ["purple", "pink", "black"]},
            "cameraShots": [close_up(S["b20"], S["b21"], TEACH_P)],
            "characters": {
                "teacher": hold(S["b20"], S["b21"], TEACH_P, -0.3, "idle", "deadpan", "clipboard"),
            },
        },
        {   # S22 ref: CU menara 16, puncak hitam miring; poster jadi boardText
            "id": "tower-16", "location": "classroom", "startFrame": S["b21"], "endFrame": S["b22"],
            "boardText": ["BE KIND", "WORK HARD"],
            "cap_tower": {"count": 16, "tiltTop": 12},
            "cameraShots": [tower_cu(S["b21"], S["b22"], -2)],
            "characters": {
                "hero": hold(S["b21"], S["b22"], HERO_C, 0.25, "idle", "deadpan"),
            },
        },
        {   # S23 ref: kelas lewat kusen pintu, menara 17 MIRING BERAT (lean 25)
            "id": "doorway", "location": "hallway", "startFrame": S["b22"], "endFrame": S["b23"],
            "cap_tower": {"count": 17, "lean": 25},
            "cameraShots": split_shots(S["b22"], S["b23"], [
                lambda a, b: medium(a, b, [-1, 0, 0], dist=17),
                lambda a, b: wide(a, b, [-1, 0, 0], dist=24),
            ]),
            "characters": {
                "hero": hold(S["b22"], S["b23"], [-1, 0, 0], 0.25, "idle", "deadpan"),
            },
        },
        {   # S24-S25 ref: wide penghubung (dipanjangkan 0,7 -> ~1,6 dtk) + twin CU 17
            "id": "twin-count", "location": "playground", "startFrame": S["b23"], "endFrame": S["b24"],
            "cap_tower": {"count": 17},
            "cameraShots": split_shots(S["b23"], S["b24"], [
                lambda a, b: wide(a, b, [-3.5, 0, 1], dist=24),
                lambda a, b: close_up(a, b, TWIN_P),
            ]),
            "characters": {
                "hero": hold(S["b23"], S["b24"], HERO_P, 0.3, "idle", "deadpan"),
                "twin": hold(S["b23"], S["b24"], TWIN_P, -0.3, "idle", "smile"),
            },
        },
        {   # S26 ref: CU menara 17, low angle, latar langit
            "id": "tower-17", "location": "playground", "startFrame": S["b24"], "endFrame": S["b25"],
            "cap_tower": {"count": 17},
            "cameraShots": [tower_cu(S["b24"], S["b25"], -1)],
            "characters": {
                "hero": hold(S["b24"], S["b25"], HERO_P, 0.3, "idle", "shocked"),
            },
        },
        {   # S27-S28 ref: twin "Eighteen." + menara 18; ping-pong CU
            "id": "count-18", "location": "playground", "startFrame": S["b25"], "endFrame": S["b27"],
            "cap_tower": {"count": 18},
            "cameraShots": split_shots(S["b25"], S["b27"], [
                lambda a, b: close_up(a, b, TWIN_P),
                lambda a, b: tower_cu(a, b, -1),
            ]),
            "characters": {
                "hero": hold(S["b25"], S["b27"], HERO_P, 0.3, "idle", "deadpan"),
                "twin": hold(S["b25"], S["b27"], TWIN_P, -0.3, "idle", "deadpan"),
            },
        },
        {   # S29-S30 ref: twin "Nineteen." (0,4 -> ~1,4 dtk, pause 1,0)
            "id": "twin-19", "location": "playground", "startFrame": S["b27"], "endFrame": S["b28"],
            "cap_tower": {"count": 19},
            "cameraShots": [close_up(S["b27"], S["b28"], TWIN_P)],
            "characters": {
                "hero": hold(S["b27"], S["b28"], HERO_P, 0.3, "idle", "deadpan"),
                "twin": hold(S["b27"], S["b28"], TWIN_P, -0.3, "idle", "deadpan"),
            },
        },
        {   # S30 ref: cewek masuk dari kanan dan BERJALAN ke arah hero
            "id": "girl-enter", "location": "playground", "startFrame": S["b28"], "endFrame": S["b29"],
            "cap_tower": {"count": 19},
            "cameraShots": [wide(S["b28"], S["b29"], [0, 0, 1], dist=24)],
            "characters": {
                "hero": hold(S["b28"], S["b29"], HERO_P, 0.3, "idle", "deadpan"),
                "twin": hold(S["b28"], S["b29"], TWIN_P, -0.3, "idle", "deadpan"),
                "girl": [kf(S["b28"], [6, 0, 1], -0.3, "walk", "smile"),
                         kf(T.f("b28+1.5"), GIRL_P, -0.3, "walk", "smile"),
                         kf(T.f("b28+1.7"), GIRL_P, -0.3, "idle", "smile")],
            },
        },
        {   # S31 ref: CU menara 19, push-in pelan
            "id": "tower-19", "location": "playground", "startFrame": S["b29"], "endFrame": S["b30"],
            "cap_tower": {"count": 19},
            "cameraShots": split_shots(S["b29"], S["b30"], [
                lambda a, b: tower_cu(a, b, -1),
                lambda a, b: medium(a, b, [1.5, 0, 1], dist=21),
            ]),
            "characters": {
                "hero": hold(S["b29"], S["b30"], HERO_P, 0.3, "idle", "deadpan"),
                "girl": hold(S["b29"], S["b30"], GIRL_P, -0.3, "idle", "smile"),
            },
        },
        {   # S32 ref: cewek CU, senyum berharap — "Do you like me?"
            "id": "girl-ask", "location": "playground", "startFrame": S["b30"], "endFrame": S["b31"],
            "cap_tower": {"count": 19},
            "cameraShots": [close_up(S["b30"], S["b31"], GIRL_P)],
            "characters": {
                "hero": hold(S["b30"], S["b31"], HERO_P, 0.3, "idle", "deadpan"),
                "girl": hold(S["b30"], S["b31"], GIRL_P, -0.3, "idle", "smile"),
            },
        },
        {   # S33 ref: CU wajah hero (balaclava — FLAG, dirender wajah biasa);
            # menara mulai miring (lean 15); "Nah." + jeda 0,8 (roboh di jeda)
            "id": "hero-nah", "location": "playground", "startFrame": S["b31"], "endFrame": S["b32"],
            "cap_tower": {"count": 19, "lean": 15},
            "cameraShots": [close_up(S["b31"], S["b32"], HERO_P)],
            "characters": {
                "hero": hold(S["b31"], S["b32"], HERO_P, 0.3, "idle", "deadpan"),
            },
        },
        {   # S35 ref: cewek CU, dome teal JATUH di atas topinya ("Me neither");
            # menara sudah roboh (count 0). Satu shot pull-out (bukan 2 shot —
            # durasi scene ~1,7 dtk tidak cukup untuk 2 shot >= 1,0 dtk).
            "id": "girl-neither", "location": "playground", "startFrame": S["b32"], "endFrame": S["b33"],
            "cap_tower": {"count": 0},
            "cap_dome": {"girl": "teal"},
            "cameraShots": [shot(S["b32"], S["b33"], [4, 5.2, 15], [4, 5.6, 18], [4, 4.4, 1], [4, 4.4, 1], 44)],
            "characters": {
                "hero": hold(S["b32"], S["b33"], HERO_P, 0.3, "idle", "deadpan"),
                "girl": [kf(S["b32"], GIRL_P, -0.3, "idle", "shocked"),
                         kf(T.f("b32+0.8"), GIRL_P, -0.3, "idle", "smile")],
            },
        },
        {   # S36 ref: CU wajah hero, mata melirik ke samping — "Ayo."
            "id": "hero-ayo", "location": "playground", "startFrame": S["b33"], "endFrame": S["b34"],
            "cap_tower": {"count": 0},
            "cameraShots": [close_up(S["b33"], S["b34"], HERO_P)],
            "characters": {
                "hero": hold(S["b33"], S["b34"], HERO_P, 0.3, "idle", "deadpan"),
            },
        },
        {   # S37-S38 ref: aftermath wide (hero tanpa topi, cewek dome teal, twin
            # TERBARING via rx -90 deg — lihat keyframe twin) + twin CU (duduk
            # kembali, "So that's a yes")
            "id": "aftermath", "location": "playground", "startFrame": S["b34"], "endFrame": S["b35"],
            "cap_tower": {"count": 0},
            "cap_dome": {"girl": "teal"},
            "cap_scatter": True,
            "cameraShots": split_shots(S["b34"], S["b35"], [
                lambda a, b: wide(a, b, [0, 0, 1], dist=24),
                lambda a, b: close_up(a, b, [5, 0, 1]),
            ]),
            "characters": {
                "hero": hold(S["b34"], S["b35"], [0, 0, 1], 0.25, "idle", "deadpan"),
                "girl": hold(S["b34"], S["b35"], [-5, 0, 1], -0.25, "idle", "smile"),
                # Twin TERBARING (ref S37): anim "knocked" engine ternyata BUKAN
                # berbaring — itu stagger tegak (torsoRotZ 0,35 + putar). Jadi
                # berbaring via rotationX -90 deg (telentang, muka ke atas, kepala
                # ke -Z), y 0,55 supaya badan tidak masuk lantai. Bangun kembali
                # tepat di cut ke CU (frame +1 setelah wide berakhir) — cut-nya
                # menyembunyikan gerakan bangun, sesuai ref S38.
                "twin": [kf(S["b34"], [5, 0.55, 1], -0.3, "idle", "deadpan", rx=-1.5708),
                         kf((S["b34"] + S["b35"]) // 2, [5, 0.55, 1], -0.3, "idle", "deadpan", rx=-1.5708),
                         kf((S["b34"] + S["b35"]) // 2 + 1, [5, 0, 1], -0.3, "idle", "deadpan"),
                         kf(S["b35"], [5, 0, 1], -0.3, "idle", "deadpan")],
            },
        },
        {   # S39 ref: hero medium, tanpa topi, topi berserakan di kaki (sebaran
            # topi = tugas worker prop; di sini hanya count 0)
            "id": "hero-dunno", "location": "playground", "startFrame": S["b35"], "endFrame": S["b36"],
            "cap_tower": {"count": 0},
            "cap_scatter": True,
            "cameraShots": [medium(S["b35"], S["b36"], [0, 0, 1], dist=17)],
            "characters": {
                "hero": hold(S["b35"], S["b36"], [0, 0, 1], 0.25, "idle", "deadpan"),
            },
        },
        {   # S40 ref: closer — hero SATU topi oranye; crane-up menembus awan.
            # Shot 1 medium (awal closer), shot 2 = crane KONTINU ~8 dtk
            # (OVERRIDE diotorisasi — melanggar SHOT_MAX 3,5 dtk; satu-satunya
            # pelanggaran rule check yang diizinkan).
            "id": "closer", "location": "playground", "startFrame": S["b36"], "endFrame": END,
            "cap_tower": {"count": 1},
            "cap_scatter": True,
            "cameraShots": [
                medium(S["b36"], S["b36"] + 45, [0, 0, 1], dist=17),
                shot(S["b36"] + 45, END, [0, 7, 20], [-2, 58, 68], [0, 4, 0], [0, 0, -6], 55),
            ],
            "characters": {
                "hero": hold(S["b36"], END, [0, 0, 1], 0.25, "idle", "deadpan"),
                # Twin tetap terbaring di aerial (rx -90 deg, lihat aftermath).
                "twin": [kf(S["b36"], [5, 0.55, 1], -0.25, "idle", "deadpan", rx=-1.5708),
                         kf(END, [5, 0.55, 1], -0.25, "idle", "deadpan", rx=-1.5708)],
            },
        },
    ]
