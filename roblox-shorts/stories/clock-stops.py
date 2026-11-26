"""CLOCK-STOPS - "In this town, every clock stops when I walk by."
Roblox Short misteri 90 detik, slug: clock-stops. Cerita BARU (original, R17).
Built from stories/no-word.py following
.agents/skills/roblox-shorts-director/SKILL.md + TEARDOWN.md §4 (R1-R17).

LOGBOOK PILIHAN (brief: pilih a atau b): (a) HARI HERO LAHIR HILANG DARI LOG.
Alasan: panel log menampilkan daftar tanggal yang semuanya ada kecuali satu
("JUN 14 — MISSING", merah) — bukti visual yang bisa dibaca di stills, dan
langsung memicu twist ("The tower didn't stop the day I was born. It started
counting down."). Opsi (b) butuh nama hero di log 50 tahun lalu, yang butuh
hero punya nama kanonik — cerita ini first-person tanpa nama.

Story arc: hook (aturan + menara beku 11:58) -> dunia (Maya menghitung jam
berhenti: Seven/Eight/Nine — tiap angka = satu jam berhenti yang TERLIHAT di
frame) -> misteri (menara tidak pernah jalan 50 tahun) -> anomali (satu detak,
cut muka jam 11:58 -> 11:59) -> pencarian (logbook, tanggal lahir hilang;
pintu hanya terbuka buat hero) -> twist dua jalur (VO + arloji saku kakek
11:58 = menara) -> pembalikan makna -> kerumunan -> countdown 10..9..8
BERHENTI di 8 -> bisikan + CU ditahan -> hard cut ke hitam (akhir video).

OVERRIDE YANG DIOTORISASI AVRES (R1): durasi ~90 dtk (bukan 35-45), ~33 beat
(bukan 14-16). Aturan shot 1,0-3,5 dtk dan spacing >= 4,5 stud TETAP berlaku.
VO: narrator am_adam, shout/otoritas am_michael, Maya af_bella. Semua beat
narasi pakai speed 0.8 (am_adam di 1.18 bicara ~3,9 kata/dtk — terlalu cepat
untuk misteri 2,1-2,8 kata/dtk; 0.8 -> ~2,6 kata/dtk). Bisikan penutup
speed 0.55 + jeda antar-beat (engine tidak dukung jeda per kata).

SHOT LIST (19 scene, ~38 shot; siang -> senja skyColor -> malam isNight):
 hook town_overview | tower-day street (muka jam CU) | shop (jam toko CU,
 "Seven") | classroom (jam dinding CU, "Eight") | hallway (arloji principal
 CU, "Nine") | recap street | dusk street skyColor senja | tick-before malam
 (muka 11:58) | tick-after malam (muka 11:59 — cut-nya ADALAH detaknya) |
 logbook street (panel log CU) | door-closed | door-open | watch malam
 (pocket_watch CU + rima muka menara) | twist malam | crowd malam (12 aktor,
 3 baris kedalaman) | cd-loading (LOADING + bar) | cd-10 | cd-9 | cd-8 |
 whisper (CU hero, shot terakhir STATIS = ditahan).

PROP BARU (engine): ClockTower di src/environments/town/buildings.tsx
(muka jam 11:58/11:59, angka countdown 10/9/8, loading bar, pintu berengsel,
papan log) + jam toko beku + jam sekolah/kelas dibekukan 11:58 +
prop pocket_watch di R6Character. Scene keys baru: towerFace, towerDoor.
Caption per-speaker (R9): audio.py menulis speakerColor per beat
(hero kuning #FDE047, Maya hijau #4ADE80), ShortsHUD memakainya.
TIDAK ADA beat otoritas/shout di cerita ini (semua beat pakai am_adam /
af_bella) — caption yang muncul hanya kuning + hijau. Biru muda #7DD3FC
di audio.py CAPTION_COLORS hanya default engine untuk beat shout
(am_michael); tidak terpakai di sini, klaim tahap-1 soal "otoritas biru
muda" dikoreksi (tahap 2b).

HITUNGAN MAYA (R3/R5 — keputusan tahap 2b, eksplisit): tiap angka =
SATU jam berhenti BARU yang terlihat di frame itu (tower -> toko ->
kelas -> arloji principal). Hitungan KUMULATIF 7/8/9 tidak bisa
ditampilkan harfiah sebagai 7/8/9 jam dalam satu frame — tiap lokasi
hanya punya satu jam, dan engine tidak punya prop tally. Yang DITAMBAH
di ronde ini: papan kelas membawa ordinal diegetik "8TH TODAY"
(terbaca di wide/medium kelas, sebelum Maya mengucap "Eight."), jadi
angka kumulatif punya jangkar visual di titik uji. Sisa hitungan
tetap ditegaskan VO (b6 "Nine today. Maya counts every one.") —
penyimpangan sadar dari huruf R3/R5, didokumentasikan, bukan klaim
"hitungan = visual" yang palsu.

MUKA JAM (tahap 2b): FACE ditarik mundur (kamera z 8->14) supaya
SELURUH muka + rim masuk frame; tick-after pakai FACE_TICK yang
sedikit lebih dekat dari tick-before supaya geseran 1 tick terbaca.
Jarum menara diperpanjang (engine) sampai ke ring tick.
"""
from shorts.scene import HALF, OFF, close_up, cover, face, hold, kf, medium, shot, split_shots, wide  # noqa: F401

TITLE = "EVERY CLOCK STOPS WHEN I WALK BY"

# 1. SCRIPT: 33 beats, ~220 kata. Kata pertama "In this town," (R2).
#    speed 0.8 di semua beat narasi/Maya (~2,6 kata/dtk); bisikan 0.55.
BEATS = [
    {"id": "b1", "text": "In this town, every clock stops when I walk by.", "speed": 0.8, "pause": 0.08},
    {"id": "b2", "text": "The tower froze at eleven fifty-eight. Fifty years ago.", "speed": 0.8, "pause": 0.08},
    {"id": "b3", "text": "This morning, the shop clock stopped too.", "speed": 0.8, "pause": 0.08},
    {"id": "m1", "text": "Seven.", "voice": "af_bella", "speed": 0.8, "pause": 0.08},
    {"id": "b4", "text": "At school, the big clock stopped as I walked in.", "speed": 0.8, "pause": 0.08},
    {"id": "m2", "text": "Eight.", "voice": "af_bella", "speed": 0.8, "pause": 0.08},
    {"id": "b5", "text": "The principal's pocket watch stopped as well.", "speed": 0.8, "pause": 0.08},
    {"id": "m3", "text": "Nine.", "voice": "af_bella", "speed": 0.8, "pause": 0.08},
    {"id": "b6", "text": "Nine today. Maya counts every one.", "speed": 0.8, "pause": 0.08},
    {"id": "b7", "text": "She never gets it wrong. The rule misses no one.", "speed": 0.8, "pause": 0.08},
    {"id": "b8", "text": "But the tower never ran. Not once in fifty years.", "speed": 0.8, "pause": 0.08},
    {"id": "b9", "text": "Last night, I walked home past the tower.", "speed": 0.8, "pause": 0.08},
    {"id": "b10", "text": "And something ticked. Once. Every window lit up.", "speed": 0.8, "pause": 0.12},
    {"id": "b11", "text": "Maya found the tower log. Every date is in it.", "speed": 0.8, "pause": 0.08},
    {"id": "m4", "text": "Every date. Except one.", "voice": "af_bella", "speed": 0.8, "pause": 0.12},
    {"id": "b12", "text": "The day I was born. It is not in the log.", "speed": 0.8, "pause": 0.12},
    {"id": "b13", "text": "Maya pushed the tower door. It would not move.", "speed": 0.8, "pause": 0.08},
    {"id": "b14", "text": "Then I touched it. And it opened.", "speed": 0.8, "pause": 0.12},
    {"id": "b15", "text": "On the step, my grandfather's pocket watch. Stopped at eleven fifty-eight.", "speed": 0.8, "pause": 0.08},
    {"id": "b16", "text": "The same time as the tower.", "speed": 0.8, "pause": 0.12},
    {"id": "b17", "text": "The tower didn't stop the day I was born.", "speed": 0.8, "pause": 0.08},
    {"id": "b18", "text": "It started counting down.", "speed": 0.8, "pause": 0.12},
    {"id": "b19", "text": "The town wasn't waiting for the tower to start.", "speed": 0.8, "pause": 0.08},
    {"id": "b20", "text": "The tower was waiting for me to stop.", "speed": 0.8, "pause": 0.12},
    {"id": "b21", "text": "That night, the whole town stood in the square, looking up.", "speed": 0.8, "pause": 0.08},
    {"id": "b22a", "text": "Then the tower lit up.", "speed": 0.8, "pause": 0.08},
    {"id": "b22b", "text": "Ten.", "speed": 0.8, "pause": 1.2},
    {"id": "b23", "text": "Nine.", "speed": 0.8, "pause": 1.2},
    {"id": "b24", "text": "Eight.", "speed": 0.8, "pause": 0.5},
    {"id": "b25", "text": "It stopped at eight. It never counts to zero.", "speed": 0.8, "pause": 0.08},
    {"id": "b26", "text": "The bell rang once. The whole town held its breath.", "speed": 0.8, "pause": 0.3},
    {"id": "w1", "text": "It never counted down before.", "speed": 0.55, "pause": 0.5},
    {"id": "w2", "text": "It started...", "speed": 0.55, "pause": 0.8},
    {"id": "w3", "text": "when I woke up.", "speed": 0.55, "pause": 0.3},
]

# 2. MUSIC + SFX: bed rendah tidak pernah mati (R14: tanpa dropout — bed jalan
#    terus di bawah VO, fade_out di ekor). Satu dentuman low-end di cut akhir
#    = "twist" di w1; lonceng = bell_low; detak = pop tinggi di cut muka jam.
MUSIC = {"file": "music/fallen-down.mp3", "under_voice": 0.022, "gaps": 0.05,
         "dropouts": []}
SFX = [
    ("b1", "whoosh"),
    ("b2", "bell_low"),
    ("b3+0.3", "pop", {"f": 900}),
    ("m1", "pop", {"f": 1100}),
    ("b4+0.5", "ding_dong"),
    ("m2", "pop", {"f": 1100}),
    ("b5+0.5", "pop", {"f": 700}),
    ("m3", "pop", {"f": 1100}),
    ("b8", "bell_low"),
    ("b9+0.5", "riser", {"dur": 1.5}),
    ("b10", "pop", {"f": 1400}),
    ("b10+1.0", "bell_low"),
    ("b14", "whoosh", {"dur": 1.0}),
    ("b15+0.5", "sparkle"),
    ("b18", "reveal"),
    ("b22a", "riser", {"dur": 2.0}),
    ("b22b", "pop", {"f": 1200}),
    ("b23", "pop", {"f": 1100}),
    ("b24", "impact"),
    ("b26", "bell_low"),
    ("w1", "twist"),
]

# 3. CAST: hero = look yang sama dengan no-word (ginger spiky, hoodie hijau,
#    freckles). Maya = teman sekelas, penghitung (R5): bob hitam, hoodie teal.
HERO = {"extends": "kid_boy", "hair": {"style": "spikyAnime", "color": "ginger"},
        "top": {"style": "hoodie", "color": "green", "secondary": "white"},
        "bottom": {"style": "jeans", "color": "denim"},
        "shoes": {"style": "sneakers", "color": "white", "sole": "white"},
        "freckles": True}
MAYA = {"extends": "kid_girl", "hair": {"style": "bob", "color": "black"},
        "top": {"style": "hoodie", "color": "teal", "secondary": "white"},
        "bottom": {"style": "jeans", "color": "denim"},
        "shoes": {"style": "sneakers", "color": "white", "sole": "white"}}
CAST = {
    "hero": HERO,
    "maya": MAYA,
    "teacher": "teacher_woman",
    "principal": "principal",
    "mom": "real_mom",
    "dad": "dad",
    "bully": "bully",
    "grandpa": "grandpa",
    "grandma": "grandma",
    "noob": "classic_noob",
    "bacon": "bacon",
    "guest": "guest",
}


# 4. SCENES: contiguous 0 -> T.END. Menara di dunia (-10,0,-16); dalam frame
#    lokal street (anchor -12,0.2,-7) muka jam ada di (2,21,-9), pintu di
#    (2,2.2,-5), papan log di (-3.8,3.4,-3.5). Semua aktor menghadap kamera
#    (rotY -0.35..0.3, pelajaran no-word v2) dan >= 4.5 stud apart.
def scenes(T):
    S = {k: T.B[k] - 1 for k in
         ["b2", "b3", "b4", "b5", "b6", "b8", "b9", "b10", "b11", "b13",
          "b14", "b15", "b17", "b21", "b22a", "b22b", "b23", "b24", "w1"]}
    END = T.END
    HERO_P, MAYA_P = [-3, 0, 1], [3, 0, 1]
    # Muka jam menara, CU: kamera di depan muka jam (lokal street).
    # Muka jam menara di lokal street: muka di z=-5 (badan menara berpusat z=-9,
    # muka di +4 dari pusat). TAHAP 2b: kamera ditarik mundur ke z=14 (jarak 19)
    # supaya SELURUH muka (diameter 7) + rim masuk frame — fov 46 vertikal
    # -> setengah lebar frame horizontal di jarak 19 = 4,5 stud > 3,5 rim.
    # FACE_TICK (tick-after) sedikit lebih dekat (jarak 17->16) supaya
    # geseran 1 tick (~6 deg, ujung jarum menit ~0,3 stud) terbaca.
    FACE = lambda a, b: shot(a, b, [2, 21, 14], [2, 21, 12], [2, 21, -5], [2, 21, -5], 46)
    FACE_TICK = lambda a, b: shot(a, b, [2, 21, 12], [2, 21, 11], [2, 21, -5], [2, 21, -5], 46)
    return [
        {   # hook: aerial kota, aturan + konsekuensi (R2)
            "id": "hook", "location": "town_overview", "startFrame": 0, "endFrame": S["b2"],
            "cameraShots": split_shots(0, S["b2"], [
                # TAHAP 2b: kamera + target digeser ke kiri (menara di lokal
                # town_overview ada di x=-18; target lama x=8 membuat muka jam
                # terpotong setengah di tepi kiri, f00027/f00081). Target baru
                # di sekitar menara -> muka jam utuh di frame.
                lambda a, b: shot(a, b, [-14, 62, 72], [-10, 54, 64], [-8, 2, -11], [-9, 2, -11], 55),
                lambda a, b: shot(a, b, [-10, 54, 64], [-8, 46, 56], [-9, 2, -11], [-10, 1, -11], 55),
            ]),
            "characters": {},
        },
        {   # menara beku 11:58 — CU muka jam, lalu wide menara + hero lewat
            "id": "tower-day", "location": "street", "startFrame": S["b2"], "endFrame": S["b3"],
            "towerFace": "clock",
            "cameraShots": [
                FACE(S["b2"], (S["b2"] + S["b3"]) // 2),
                wide((S["b2"] + S["b3"]) // 2, S["b3"], (2, 0, -4)),
            ],
            "characters": {
                "hero": [kf(S["b2"], [-5, 0, 1], 0.3, "walk", "deadpan"),
                         kf(S["b3"] - 15, [5, 0, 1], 0.3, "walk", "deadpan"),
                         kf(S["b3"], [5, 0, 1], 0.3, "idle", "deadpan")],
            },
        },
        {   # jam toko berhenti — Maya: "Seven." (jam toko di fasad, CU)
            "id": "shop", "location": "shop", "startFrame": S["b3"], "endFrame": S["b4"],
            "cameraShots": split_shots(S["b3"], S["b4"], [
                # TAHAP 2b: kamera + target digeser x 0->-1 supaya jam toko
                # (lokal x=-6,2) utuh di frame, tidak setengah terpotong (f00256).
                lambda a, b: shot(a, b, [-1, 6.5, 18], [-1, 6.2, 17], [-1, 4.3, 1], [-1, 4.3, 1], 58),
                lambda a, b: shot(a, b, [-6.2, 7.2, 4], [-6.2, 7.2, 3], [-6.2, 7.2, -3.9], [-6.2, 7.2, -3.9], 44),
                lambda a, b: close_up(a, b, MAYA_P),
            ]),
            "characters": {
                "hero": hold(S["b3"], S["b4"], HERO_P, 0.3, "idle", "deadpan"),
                "maya": [kf(S["b3"], MAYA_P, -0.3, "idle", "smile"),
                         kf(T.B["m1"], MAYA_P, -0.3, "point", "smile"),
                         kf(T.f("m1+0.8"), MAYA_P, -0.3, "idle", "smile")],
            },
        },
        {   # jam kelas berhenti — Maya: "Eight." (jam dinding CU, beku 11:58)
            "id": "classroom", "location": "classroom", "startFrame": S["b4"], "endFrame": S["b5"],
            "boardText": ["11:58", "THE CLOCK STOPPED AGAIN", "8TH TODAY"],
            "cameraShots": split_shots(S["b4"], S["b5"], [
                lambda a, b: wide(a, b),
                lambda a, b: medium(a, b, [0, 0, 0.5], dist=28),
                lambda a, b: shot(a, b, [0, 11.2, -1], [0, 11.2, -2], [0, 11.4, -7.95], [0, 11.4, -7.95], 44),
            ]),
            "characters": {
                "teacher": hold(S["b4"], S["b5"], [-4, 0, -4.5], -0.3, "point", "angry", "pointer"),
                "hero": hold(S["b4"], S["b5"], [-2, 0, 1], 0.25, "idle", "deadpan"),
                "maya": [kf(S["b4"], [3, 0, 1], -0.25, "idle", "smile"),
                         kf(T.B["m2"], [3, 0, 1], -0.25, "point", "smile"),
                         kf(T.f("m2+0.8"), [3, 0, 1], -0.25, "idle", "smile")],
            },
        },
        {   # arloji principal berhenti — Maya: "Nine." (arloji di tangan, CU)
            "id": "hallway", "location": "hallway", "startFrame": S["b5"], "endFrame": S["b6"],
            "cameraShots": split_shots(S["b5"], S["b6"], [
                lambda a, b: medium(a, b, [0, 0, 1], dist=28),
                lambda a, b: close_up(a, b, [3, 0, 1]),
                # TAHAP 2b: kamera ditarik mundur (z 6->7,5) supaya arloji
                # principal tidak raksasa + torso hitam tidak memenuhi 40%
                # frame kanan (f00551); target y 1,8->1,6.
                lambda a, b: shot(a, b, [1.5, 2.6, 7.5], [1.5, 2.4, 7], [1.5, 1.6, 1.4], [1.5, 1.6, 1.4], 44),
            ]),
            "characters": {
                "principal": hold(S["b5"], S["b6"], [3, 0, 1], -0.3, "idle", "shocked", "pocket_watch"),
                "hero": hold(S["b5"], S["b6"], HERO_P, 0.3, "idle", "deadpan"),
                "maya": [kf(S["b5"], [0, 0, -3], 0.25, "idle", "smile"),
                         kf(T.B["m3"], [0, 0, -3], 0.25, "point", "smile"),
                         kf(T.f("m3+0.8"), [0, 0, -3], 0.25, "idle", "smile")],
            },
        },
        {   # rekap hitungan: Maya tidak pernah salah (R5)
            "id": "recap", "location": "street", "startFrame": S["b6"], "endFrame": S["b8"],
            "cameraShots": cover(S["b6"], S["b8"], [
                lambda a, b: medium(a, b, [0, 0, 1], dist=22),
                lambda a, b: close_up(a, b, MAYA_P),
                lambda a, b: close_up(a, b, HERO_P),
            ]),
            "characters": {
                "hero": hold(S["b6"], S["b8"], HERO_P, 0.3, "idle", "deadpan"),
                "maya": hold(S["b6"], S["b8"], MAYA_P, -0.3, "idle", "smile"),
            },
        },
        {   # senja (R12 rezim 2): menara tidak pernah jalan
            "id": "dusk", "location": "street", "skyColor": "#F97316",
            "startFrame": S["b8"], "endFrame": S["b9"],
            "cameraShots": cover(S["b8"], S["b9"], [
                lambda a, b: wide(a, b, (2, 0, -4)),
                lambda a, b: close_up(a, b, HERO_P),
            ]),
            "characters": {
                "hero": hold(S["b8"], S["b9"], HERO_P, 0.3, "idle", "deadpan"),
                "maya": hold(S["b8"], S["b9"], MAYA_P, -0.3, "idle", "deadpan"),
            },
        },
        {   # malam, hero pulang lewat menara — muka jam masih 11:58
            "id": "tick-before", "location": "street", "isNight": True,
            "startFrame": S["b9"], "endFrame": S["b10"],
            "towerFace": "clock",
            "cameraShots": [
                medium(S["b9"], (S["b9"] + S["b10"]) // 2, [0, 0, 1], dist=17),
                FACE((S["b9"] + S["b10"]) // 2, S["b10"]),
            ],
            "characters": {
                "hero": [kf(S["b9"], [-5, 0, 1], 0.3, "walk", "deadpan"),
                         kf(S["b10"] - 15, [5, 0, 1], 0.3, "walk", "deadpan"),
                         kf(S["b10"], [5, 0, 1], 0.3, "idle", "shocked")],
            },
        },
        {   # DETAK: cut ke muka jam 11:59 — cut-nya adalah detaknya (R16:
            # visual dulu, VO "something ticked" menyusul di beat yang sama)
            "id": "tick-after", "location": "street", "isNight": True,
            "startFrame": S["b10"], "endFrame": S["b11"],
            "towerFace": "tick",
            "cameraShots": [
                # TAHAP 2b: FACE_TICK (lebih dekat dari FACE) supaya geseran
                # 1 tick jarum menit terbaca vs tick-before.
                FACE_TICK(S["b10"], (S["b10"] + S["b11"]) // 2),
                close_up((S["b10"] + S["b11"]) // 2, S["b11"], [5, 0, 1]),
            ],
            "characters": {
                "hero": hold(S["b10"], S["b11"], [5, 0, 1], 0.3, "idle", "shocked"),
            },
        },
        {   # logbook: Maya baca panel log — "JUN 14 — MISSING" (pilihan a)
            "id": "logbook", "location": "street",
            "startFrame": S["b11"], "endFrame": S["b13"],
            "towerFace": "tick",
            "cameraShots": cover(S["b11"], S["b13"], [
                # TAHAP 2b shot-1 (board move): papan log digeser kiri 3 stud
                # di buildings.tsx (tower-local -5.8 -> -8.8, pusat kini
                # street-local -6.8) supaya tiang putih di depan papan
                # (street-local x ~-3.7) tidak lagi menutupi "AUG 02 / NOV 27"
                # — tepi kanan papan kini di -4.5, bersih dari tiang. Kamera
                # di x -1 (bukan -2): hidran (-6, 0.8) jatuh ke tepi kiri
                # frame (screen x ~0.13), bersih dari teks; papan oblique
                # ~29° tapi teks besar, tetap terbaca. Target y 2,0
                # dipertahankan: baris bawah di ~58-65% tinggi, keluar dari
                # zona caption (68-75%).
                lambda a, b: shot(a, b, [-1, 2.6, 7], [-1, 2.5, 6], [-6.8, 2.0, -3.5], [-6.8, 2.0, -3.5], 46),
                # TAHAP 2b shot-2 (board move): medium ditarik mundur
                # (dist 32->36) + center geser kiri (-2 -> -3) supaya Maya
                # (kini di -9.5, berdiri di tepi kiri papan) + hero (3) muat
                # utuh; papan yang digeser kini di antara mereka.
                lambda a, b: medium(a, b, [-3, 0, -2], dist=36),
                lambda a, b: close_up(a, b, [-9.5, 0, 0.5]),
            ]),
            "characters": {
                "maya": [kf(S["b11"], [-9.5, 0, 0.5], 0.3, "point", "deadpan"),
                         kf(T.B["m4"], [-9.5, 0, 0.5], 0.3, "idle", "shocked"),
                         kf(T.B["b12"], [-9.5, 0, 0.5], 0.3, "idle", "deadpan")],
                "hero": hold(S["b11"], S["b13"], [3, 0, -2], -0.3, "idle", "shocked"),
            },
        },
        {   # pintu tidak bergerak buat Maya
            "id": "door-closed", "location": "street",
            "startFrame": S["b13"], "endFrame": S["b14"],
            "towerFace": "tick", "towerDoor": "closed",
            "cameraShots": split_shots(S["b13"], S["b14"], [
                lambda a, b: medium(a, b, [0, 0, -3], dist=17),
                lambda a, b: shot(a, b, [2, 2.5, 2], [2, 2.5, 1], [2, 2.2, -5], [2, 2.2, -5], 46),
            ]),
            "characters": {
                "maya": hold(S["b13"], S["b14"], [-1, 0, -3], 0.3, "point", "angry"),
            },
        },
        {   # pintu terbuka HANYA buat hero (R10)
            "id": "door-open", "location": "street",
            "startFrame": S["b14"], "endFrame": S["b15"],
            "towerFace": "tick", "towerDoor": "open",
            "cameraShots": split_shots(S["b14"], S["b15"], [
                lambda a, b: medium(a, b, [0, 0, -3], dist=17),
                lambda a, b: shot(a, b, [2, 2.5, 2], [2, 2.5, 1], [2, 2.2, -5], [2, 2.2, -5], 46),
            ]),
            "characters": {
                "hero": [kf(S["b14"], [-1, 0, -3], 0.25, "idle", "shocked"),
                         kf(T.f("b14+1.0"), [-1, 0, -3], 0.25, "idle", "smile")],
            },
        },
        {   # arloji saku kakek di anak tangga — rima visual: jam kecil = jam besar
            "id": "watch", "location": "street", "isNight": True,
            "startFrame": S["b15"], "endFrame": S["b17"],
            "towerFace": "tick", "towerDoor": "open",
            "cameraShots": cover(S["b15"], S["b17"], [
                # TAHAP 2b: kamera ditarik mundur (z 6->7,5) supaya arloji
                # tidak memenuhi frame + torso hero tidak terpotong (f01530);
                # arloji emas + tick mark + jarum 11:58 dari prop (engine).
                lambda a, b: shot(a, b, [-4.5, 2.6, 7.5], [-4.5, 2.4, 7], [-4.5, 1.6, 1.4], [-4.5, 1.6, 1.4], 44),
                lambda a, b: close_up(a, b, HERO_P),
                lambda a, b: FACE(a, b),
            ]),
            "characters": {
                "hero": hold(S["b15"], S["b17"], HERO_P, 0.3, "idle", "shocked", "pocket_watch"),
            },
        },
        {   # twist dua jalur: VO + arloji 11:58 = menara (R10)
            "id": "twist", "location": "street", "isNight": True,
            "startFrame": S["b17"], "endFrame": S["b21"],
            "towerFace": "tick", "towerDoor": "open",
            "cameraShots": cover(S["b17"], S["b21"], [
                lambda a, b: close_up(a, b, HERO_P),
                lambda a, b: close_up(a, b, MAYA_P),
                lambda a, b: medium(a, b, [0, 0, 1], dist=22),
            ]),
            "characters": {
                "hero": [kf(S["b17"], HERO_P, 0.3, "idle", "deadpan"),
                         kf(T.B["b18"], HERO_P, 0.3, "idle", "shocked"),
                         kf(T.B["b20"], HERO_P, 0.3, "idle", "deadpan")],
                "maya": hold(S["b17"], S["b21"], MAYA_P, -0.3, "idle", "shocked"),
            },
        },
        {   # kerumunan (R13): 12 aktor, 3 baris kedalaman, semua diam menatap menara
            # TAHAP 2b: baris digeser +4z (1: z 2->6, 2: z -3->1, 3: z -8->-4)
            # + baris-3 x -4,5->-9 supaya ketiganya keluar dari bayangan
            # menara (muka menara di z=-5; baris-3 lama di z=-8 tersembunyi
            # di balik badan menara + papan log) dan bebas dari papan log
            # (x -6,1..-1,5). Spacing >=4,5 tetap terjaga (cek: antar-baris
            # 5,48; dalam baris 4,5). Kamera ditarik mundur + shot-2 geser
            # kiri supaya tiang lampu lalu lintas tidak memotong figur baju
            # merah dan figur kanan tidak terpotong tepi (f02112).
            "id": "crowd", "location": "street", "isNight": True,
            "startFrame": S["b21"], "endFrame": S["b22a"],
            "towerFace": "tick", "towerDoor": "open",
            "cameraShots": [
                shot(S["b21"], (S["b21"] + S["b22a"]) // 2, [0, 30, 44], [0, 28, 42], [0, 4, 0], [0, 4, 0], 55),
                shot((S["b21"] + S["b22a"]) // 2, S["b22a"], [-5, 18, 44], [-5, 17, 42], [0, 3, 1], [0, 3, 1], 55),
            ],
            "characters": {
                "teacher": hold(S["b21"], S["b22a"], [-9, 0, 6], 0.25, "idle", "deadpan"),
                "hero": hold(S["b21"], S["b22a"], [-4.5, 0, 6], 0.25, "idle", "deadpan"),
                "maya": hold(S["b21"], S["b22a"], [0, 0, 6], -0.25, "idle", "deadpan"),
                "mom": hold(S["b21"], S["b22a"], [4.5, 0, 6], -0.25, "idle", "deadpan"),
                "dad": hold(S["b21"], S["b22a"], [9, 0, 6], -0.25, "idle", "deadpan"),
                "principal": hold(S["b21"], S["b22a"], [-6.75, 0, 1], 0.25, "idle", "deadpan"),
                "bully": hold(S["b21"], S["b22a"], [-2.25, 0, 1], 0.25, "idle", "deadpan"),
                "grandpa": hold(S["b21"], S["b22a"], [2.25, 0, 1], -0.25, "idle", "deadpan"),
                "grandma": hold(S["b21"], S["b22a"], [6.75, 0, 1], -0.25, "idle", "deadpan"),
                "noob": hold(S["b21"], S["b22a"], [-9, 0, -4], 0.25, "idle", "deadpan"),
                "bacon": hold(S["b21"], S["b22a"], [0, 0, -4], -0.25, "idle", "deadpan"),
                "guest": hold(S["b21"], S["b22a"], [4.5, 0, -4], -0.25, "idle", "deadpan"),
            },
        },
        {   # countdown (R11): loading bar dulu, lalu angka — di muka menara
            "id": "cd-load", "location": "street", "isNight": True,
            "startFrame": S["b22a"], "endFrame": S["b22b"],
            "towerFace": "loading", "towerDoor": "open",
            "cameraShots": [FACE(S["b22a"], S["b22b"])],
            "characters": {},
        },
        {   # "Ten." — jeda 1,2 dtk membuat scene cukup panjang untuk 1 shot
            "id": "cd-10", "location": "street", "isNight": True,
            "startFrame": S["b22b"], "endFrame": S["b23"],
            "towerFace": "10", "towerDoor": "open",
            "cameraShots": [FACE(S["b22b"], S["b23"])],
            "characters": {},
        },
        {   # "Nine."
            "id": "cd-9", "location": "street", "isNight": True,
            "startFrame": S["b23"], "endFrame": S["b24"],
            "towerFace": "9", "towerDoor": "open",
            "cameraShots": [FACE(S["b23"], S["b24"])],
            "characters": {},
        },
        {   # "Eight." — BERHENTI di 8, lonceng sekali, kota menahan napas
            "id": "cd-8", "location": "street", "isNight": True,
            "startFrame": S["b24"], "endFrame": S["w1"],
            "towerFace": "8", "towerDoor": "open",
            "cameraShots": cover(S["b24"], S["w1"], [
                lambda a, b: FACE(a, b),
                lambda a, b: medium(a, b, [0, 0, 1], dist=22),
                lambda a, b: close_up(a, b, HERO_P),
            ]),
            "characters": {
                "hero": hold(S["b24"], S["w1"], HERO_P, 0.3, "idle", "shocked"),
                "maya": hold(S["b24"], S["w1"], MAYA_P, -0.3, "idle", "shocked"),
            },
        },
        {   # bisikan penutup (R15): CU hero — shot terakhir STATIS (ditahan)
            "id": "whisper", "location": "street", "isNight": True,
            "startFrame": S["w1"], "endFrame": END,
            "towerFace": "8", "towerDoor": "open",
            "cameraShots": [
                close_up(S["w1"], (S["w1"] + T.B["w2"] - 1) // 2, [0, 0, 1]),
                close_up((S["w1"] + T.B["w2"] - 1) // 2, T.B["w2"] - 1, [0, 0, 1], dist=5.5),
                shot(T.B["w2"] - 1, T.B["w3"] - 1, [0, 5.0, 8], [0, 5.0, 8], [0, 4.4, 1], [0, 4.4, 1], 44),
                shot(T.B["w3"] - 1, END, [0, 5.0, 8], [0, 5.0, 8], [0, 4.4, 1], [0, 4.4, 1], 44),
            ],
            "characters": {
                "hero": hold(S["w1"], END, [0, 0, 1], 0.25, "idle", "deadpan"),
            },
        },
    ]
