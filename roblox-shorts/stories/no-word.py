"""NO-WORD - "In this town, saying the word 'no' is against the law."
Roblox Short, slug: no-word. One story file, built from stories/_template.py
following .agents/skills/roblox-shorts-director/SKILL.md.

Story arc: hook (rule + consequence) -> world-building (everyone tapes their
mouth shut) -> stakes (hero must say "yes" to everything: homework lie, bully
takes his lunch, principal accuses him) -> climax (hero shouts "NO!") ->
payoff (the principal rips off his own tape) -> twist (the principal broke
the trophy case himself, last night, because he was scared too).

QA 2026-11-26 (contact-sheet pass 1): close-ups showed backs of heads
because actors used face() toward each other (rotY ~+/-90 deg or ~180 deg).
Fixed: all actors face the camera (rotY -0.35..0.3, hair_color.py style).
Medium 2-shots at dist 12 cut both actors in half at the frame edges
(9:16 half-width ~3.15 studs, actors at +/-3); widened to dist 17,
playground medium to dist 20 centered [1, 0, 0.75] (actors 8.5 apart).
QA 2026-11-26 round 2: f614 STILL cut both actors at dist 20 (half-width
~5.25 studs vs actor outer edges -6..+6.5); widened to dist 28 — dist 26
would leave only ~0.3 stud margin once the medium() -1.2 drift push-in
tightens the frame over the shot, and wide() fov 58 (half-width ~6.24)
does not fit either. dist 28 -> half-width ~7.3 shrinking to ~7.0.

VOICE 2026-11-26 (round 2, user decision overrides skill): narrator
af_heart -> am_adam (engine default in scripts/shorts/audio.py); shout w1
am_adam -> am_michael so it still contrasts with the narrator.
"""
from shorts.scene import HALF, OFF, close_up, cover, face, hold, kf, medium, shot, wide  # noqa: F401

TITLE = "SAYING NO IS AGAINST THE LAW"

# 1. SCRIPT: 15 beats (14 lines + 1 shout), ~38 s. First words "In this town,".
BEATS = [
    {"id": "b1", "text": "In this town, saying the word 'no' is against the law.", "pause": 0.08},
    {"id": "b2", "text": "Say it once: fined, grounded, and put on the wall of shame.", "pause": 0.08},
    {"id": "b3", "text": "So everyone tapes their mouth shut before they leave the house.", "pause": 0.08},
    {"id": "b4", "text": "My mom tapes hers. My dad tapes his. My brother tapes his twice.", "pause": 0.08},
    {"id": "b5", "text": "At school, the rule is on the board in giant red letters.", "pause": 0.08},
    {"id": "b6", "text": "The teacher asked if I finished my homework. I said yes. I lied.", "pause": 0.08},
    {"id": "b7", "text": "The bully asked for my lunch. I said yes. I was starving.", "pause": 0.08},
    {"id": "b8", "text": "Then the principal called me in. Someone broke the trophy case.", "pause": 0.08},
    {"id": "b9", "text": 'He pointed at me and asked, "Did you do it?"', "pause": 0.12},
    {"id": "w1", "text": "NO!", "voice": "am_michael", "shout": True, "pause": 0.2},
    {"id": "b10", "text": "The whole school went silent. Nobody had ever heard that word before.", "pause": 0.12},
    {"id": "b11", "text": "Then the principal smiled, and ripped the tape off his own mouth.", "pause": 0.08},
    {"id": "b12", "text": "He held up a hammer and said, 'I broke it. Last night.'", "pause": 0.12},
    {"id": "b13", "text": "Turns out, the law only works if everyone's too scared to say it.", "pause": 0.08},
    {"id": "b14", "text": "But last night, the principal was scared too.", "pause": 0.3},
]

# 2. MUSIC + SFX: ~1 accent per beat; riser into the shout, impact on it,
# reveal on the payoff, twist on the final line; music drops out before the shout.
MUSIC = {"file": "music/fallen-down.mp3", "under_voice": 0.022, "gaps": 0.05,
         "dropouts": [("b9.end-0.3", "w1.end")]}
SFX = [
    ("b1", "whoosh"),
    ("b2", "bell_low"),
    ("b3+0.5", "pop", {"f": 600}),
    ("b4+1.2", "laugh"),
    ("b5", "ding_dong"),
    ("b6+1.0", "sad"),
    ("b7+0.8", "pop_down"),
    ("b8+0.5", "thud"),
    ("b9+0.3", "riser", {"dur": 1.6}),
    ("w1", "impact"),
    ("b11+0.3", "reveal"),
    ("b12+0.8", "thud"),
    ("b14", "twist"),
]

# 3. CAST: hero = ONE consistent look all video: ginger spiky hair,
# green hoodie, freckles. Everyone else from presets.
HERO = {"extends": "kid_boy", "hair": {"style": "spikyAnime", "color": "ginger"},
        "top": {"style": "hoodie", "color": "green", "secondary": "white"},
        "bottom": {"style": "jeans", "color": "denim"},
        "shoes": {"style": "sneakers", "color": "white", "sole": "white"},
        "freckles": True}
CAST = {
    "hero": HERO,
    "mom": {"extends": "real_mom", "hair": {"color": "brown"}},
    "dad": {"extends": "dad", "hair": {"color": "black"}},
    "brother": {"extends": "little_brother", "hair": {"style": "curly", "color": "ginger"},
                "top": {"style": "tshirt", "color": "orange"}, "scale": 0.75},
    "teacher": "teacher_woman",
    "bully": "bully",
    "principal": "principal",
}


# 4. SCENES: contiguous from 0 to T.END; cover() gives ~2.5 s cuts (1.0-3.5 s rule).
# All actor centers >= 4.5 studs apart (brother is 0.75 scale, still >= 4.7).
def scenes(T):
    S2, S3, S5, S7 = T.B["b2"] - 1, T.B["b3"] - 1, T.B["b5"] - 1, T.B["b7"] - 1
    S8, SW1, S11, S13, END = T.B["b8"] - 1, T.B["w1"] - 1, T.B["b11"] - 1, T.B["b13"] - 1, T.END
    HERO_P, MOM_P, DAD_P, BRO_P = [-5, 0, 2], [0, 0, 2], [5, 0, 2], [-2.5, 0, -2]
    TEACH_P, BULLY_P, PRIN_P = [-4, 0, -4.5], [5.5, 0, 0.5], [3, 0, 1]
    HERO_C, HERO_H, HERO_PG = [-5.5, 0, 0.5], [-3, 0, 1], [-3, 0, 1]
    return [
        {   # hook: aerial town, rule + consequence
            "id": "hook", "location": "town_overview", "startFrame": 0, "endFrame": S2,
            "cameraShots": cover(0, S2, [
                lambda a, b: shot(a, b, [-10, 62, 74], [-6, 54, 66], [8, 0, -6], [6, 2, -8], 55),
                lambda a, b: shot(a, b, [-6, 54, 66], [-2, 46, 56], [6, 2, -8], [8, 0, -6], 55),
            ]),
            "characters": {},
        },
        {   # world-building: the whole taped family on the street (b2 consequence
            # lands here over the taped crowd, b3 tape rule, b4 mom/dad/brother)
            "id": "taped-street", "location": "street", "startFrame": S2, "endFrame": S5,
            "cameraShots": cover(S2, S5, [
                lambda a, b: wide(a, b),
                lambda a, b: medium(a, b, [0, 0, 1]),
                lambda a, b: close_up(a, b, HERO_P),
                lambda a, b: close_up(a, b, BRO_P, scale=0.75),
            ]),
            "characters": {
                "hero": hold(S2, S5, HERO_P, 0.25, "idle", "deadpan", "mouth_tape"),
                "mom": hold(S2, S5, MOM_P, 0.3, "idle", "smile", "mouth_tape"),
                "dad": hold(S2, S5, DAD_P, -0.3, "idle", "smile", "mouth_tape"),
                "brother": hold(S2, S5, BRO_P, -0.25, "idle", "deadpan", "mouth_tape"),
            },
        },
        {   # world-building 2 + stakes: classroom, rule on the board, homework lie
            "id": "classroom", "location": "classroom", "startFrame": S5, "endFrame": S7,
            "boardText": ["RULE #1: NEVER SAY NO", "NO = ILLEGAL"],
            "cameraShots": cover(S5, S7, [
                lambda a, b: wide(a, b),
                lambda a, b: medium(a, b, [0, 0, 0.5]),
                lambda a, b: close_up(a, b, HERO_C),
                lambda a, b: close_up(a, b, TEACH_P),
            ]),
            "characters": {
                "teacher": hold(S5, S7, TEACH_P, -0.3, "point", "angry", "pointer"),
                "hero": [kf(S5, HERO_C, 0.25, "idle", "deadpan"),
                         kf(T.B["b6"], HERO_C, 0.25, "idle", "smile"),
                         kf(T.f("b6+1.5"), HERO_C, 0.25, "idle", "deadpan")],
                "bully": hold(S5, S7, BULLY_P, -0.35, "idle", "cool"),
            },
        },
        {   # stakes: bully takes the lunch in the playground
            "id": "playground", "location": "playground", "startFrame": S7, "endFrame": S8,
            "cameraShots": cover(S7, S8, [
                lambda a, b: medium(a, b, [1, 0, 0.75], dist=28),
                lambda a, b: close_up(a, b, HERO_PG),
                lambda a, b: close_up(a, b, BULLY_P),
            ]),
            "characters": {
                "hero": [kf(S7, HERO_PG, 0.3, "idle", "panic", "backpack"),
                         kf(T.f("b7+1.2"), HERO_PG, 0.3, "idle", "deadpan", "backpack")],
                "bully": [kf(S7, BULLY_P, -0.3, "point", "angry"),
                          kf(T.f("b7+1.2"), BULLY_P, -0.3, "celebrate", "laugh")],
            },
        },
        {   # stakes peak: principal calls hero in, accuses him (hallway)
            "id": "hallway", "location": "hallway", "startFrame": S8, "endFrame": SW1,
            "cameraShots": cover(S8, SW1, [
                lambda a, b: medium(a, b, [0, 0, 1], dist=17),
                lambda a, b: close_up(a, b, PRIN_P),
                lambda a, b: close_up(a, b, HERO_H),
            ]),
            "characters": {
                "principal": hold(S8, SW1, PRIN_P, -0.3, "point", "angry", "clipboard"),
                "hero": [kf(S8, HERO_H, 0.3, "idle", "panic"),
                         kf(T.B["b9"], HERO_H, 0.3, "idle", "shocked")],
            },
        },
        {   # climax: the shout, then the silence
            "id": "shout", "location": "hallway", "startFrame": SW1, "endFrame": S11,
            "cameraShots": cover(SW1, S11, [
                lambda a, b: close_up(a, b, HERO_H, shake=0.08),
                lambda a, b: close_up(a, b, PRIN_P),
                lambda a, b: medium(a, b, [0, 0, 1], dist=17),
            ]),
            "characters": {
                "hero": [kf(SW1, HERO_H, 0.3, "point", "angry"),
                         kf(T.B["b10"], HERO_H, 0.3, "idle", "shocked")],
                "principal": hold(SW1, S11, PRIN_P, -0.3, "idle", "shocked"),
            },
        },
        {   # payoff: principal rips off his own tape, then holds up the hammer
            "id": "payoff", "location": "hallway", "startFrame": S11, "endFrame": S13,
            "cameraShots": cover(S11, S13, [
                lambda a, b: close_up(a, b, PRIN_P),
                lambda a, b: medium(a, b, [0, 0, 1], dist=17),
                lambda a, b: close_up(a, b, HERO_H),
            ]),
            "characters": {
                "principal": [kf(S11, PRIN_P, -0.3, "idle", "smile", "mouth_tape"),
                              kf(T.f("b11+1.0"), PRIN_P, -0.3, "idle", "smile"),
                              kf(T.B["b12"], PRIN_P, -0.3, "idle", "smile", "hammer")],
                "hero": [kf(S11, HERO_H, 0.3, "idle", "shocked"),
                         kf(T.B["b12"], HERO_H, 0.3, "idle", "smile")],
            },
        },
        {   # twist: night hallway, the scared principal with the hammer
            "id": "twist", "location": "hallway", "isNight": True,
            "startFrame": S13, "endFrame": END,
            "cameraShots": cover(S13, END, [
                lambda a, b: medium(a, b, [0, 0, 1], dist=17),
                lambda a, b: close_up(a, b, PRIN_P),
                lambda a, b: close_up(a, b, HERO_H),
            ]),
            "characters": {
                "hero": hold(S13, END, HERO_H, 0.3, "idle", "smile"),
                "principal": [kf(S13, PRIN_P, -0.3, "idle", "smile", "hammer"),
                              kf(T.B["b14"], PRIN_P, -0.3, "idle", "deadpan", "hammer")],
            },
        },
    ]
