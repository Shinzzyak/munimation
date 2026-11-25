// Timeline of the ships short: 70 Ottoman ships hauled over land into the Golden Horn, April 1453.
// Geography (metres, y up, ground D0 = 6): the Bosporus is the water at z < -60, the Golden Horn the
// water at z > +60. Between them a hill ridge (crest y = 20 at z = 0) crossed by the greased wooden
// haul road along x = 0. Constantinople's walls stand on the far shore of the Horn at z = +110, and
// the great chain floats across the mouth of the Horn at z = +62.
//
// TIMING: VO measured at 86.4 s (words.json, voice Zubenelgenubi, ~2.1 words/s) -> TOTAL 2592 frames.
// Shot boundaries are aligned to the VO phrases in words.json, NOT a uniform x1.28 stretch of the
// SCRIPT.md plan: the VO's later beats run slower than the plan, so a flat stretch would put the snap
// reveal ~5 s late and deadpan/poll ~12 s late. 12 shots: BUILD splits into road-laying (shot 5) and
// haul (shot 7), with the MAP card (shot 6) between them, following the narration order.
export const FPS = 30;
export const TOTAL = 2592;
export const D0 = 6.0; // ground / bank height (m)
export const HILL_H = 14; // hill crest above D0
export const HILL_HALF = 60; // hill spans z = -60 .. +60
export const WALL_Z = 110; // Constantinople walls
export const CHAIN_Z = 62; // great chain across the Horn mouth
export type V3 = [number, number, number];

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const smooth = (x: number) => { const u = clamp01(x); return u * u * (3 - 2 * u); };
export const easeOut = (u: number) => 1 - (1 - clamp01(u)) ** 4;
const lin = (pts: [number, number][], x: number) => {
  if (x <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  }
  return pts[pts.length - 1][1];
};

/** ground height on the hill ridge: D0 at |z| >= 60, D0 + HILL_H at the crest z = 0 */
export const hillY = (z: number) => D0 + HILL_H * Math.max(0, Math.cos((Math.PI * z) / (2 * HILL_HALF)));
/** lead ship's z on the haul road: creeps -55 -> -35 during BUILD (30.5-35.5 s), holds under the MAP
 *  card, then -35 -> -15 during HAUL (40.8-46 s) */
export const shipZ = (t: number) => lin([[30.5, -55], [35.5, -35], [40.8, -35], [46, -15]], t);
export type ShipsState = { shipZ: number; horn: boolean };
export const shipsState = (id: number, t: number): ShipsState => ({
  shipZ: id === 1 ? -20 : id === 5 || id === 7 ? shipZ(t) : id === 10 ? -12 : -20,
  horn: id >= 8,
});

// ---------------- shots ----------------
export type Light = "day" | "golden" | "night";
export type Crowd = "none" | "haul" | "guards" | "sultan" | "ships";
export type ShotDef = { id: number; a: number; b: number; light: Light; crowd: Crowd; tau: (t: number) => number };
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 195, light: "night", crowd: "haul", tau: (t) => t }, // HOOK 0-6.5 s: 70 ships moved over land, unseen
  { id: 2, a: 195, b: 285, light: "golden", crowd: "haul", tau: (t) => t }, // TITLE 6.5-9.5 s: "April 1453"
  { id: 3, a: 285, b: 630, light: "day", crowd: "ships", tau: (t) => t }, // SETTING 9.5-21 s: siege, chain, ships held back
  { id: 4, a: 630, b: 915, light: "day", crowd: "sultan", tau: (t) => t }, // SULTAN 21-30.5 s: the crazy idea
  { id: 5, a: 915, b: 1065, light: "night", crowd: "haul", tau: (t) => t }, // BUILD 30.5-35.5 s: greased wooden road
  { id: 6, a: 1065, b: 1225, light: "day", crowd: "none", tau: (t) => t }, // MAP 35.5-40.8 s: "10 km" card
  { id: 7, a: 1225, b: 1380, light: "night", crowd: "haul", tau: (t) => t }, // HAUL 40.8-46 s: oxen + thousands, all night
  { id: 8, a: 1380, b: 1560, light: "day", crowd: "guards", tau: (t) => t }, // SNAP 46-52 s: morning, 70 ships in the Horn
  { id: 9, a: 1560, b: 1850, light: "day", crowd: "guards", tau: (t) => t }, // DEADPAN 52-61.7 s: chain intact, useless
  { id: 10, a: 1850, b: 2250, light: "day", crowd: "haul", tau: (t) => t }, // EXPLANATION 61.7-75 s: friction, wardrobe
  { id: 11, a: 2250, b: 2390, light: "golden", crowd: "none", tau: (t) => t }, // CONSEQUENCE 75-79.7 s: 29 May, city falls
  { id: 12, a: 2390, b: TOTAL, light: "golden", crowd: "none", tau: (t) => t }, // POLL 79.7-86.4 s: rantai atau bukit?
];
/** crossfades (frames) at place/time changes; a white 4-frame flash after the hook */
export const XFADE: Record<number, number> = { 3: 8, 4: 8, 5: 8, 6: 8, 7: 8, 8: 8, 10: 8, 11: 8 };
export const FLASH_AT = 195;

export const shotAt = (f: number) => SHOTS.find((s) => f >= s.a && f < s.b) ?? SHOTS[SHOTS.length - 1];
/** layers to draw at frame f: base shot, plus the next shot fading in during a crossfade */
export const layersAt = (f: number): { id: number; alpha: number }[] => {
  for (const s of SHOTS) {
    const x = XFADE[s.id];
    if (x && f >= s.a - x / 2 && f < s.a + x / 2) return [{ id: s.id - 1, alpha: 1 }, { id: s.id, alpha: (f - (s.a - x / 2) + 1) / (x + 1) }];
  }
  return [{ id: shotAt(f).id, alpha: 1 }];
};

// ---------------- camera ----------------
export type Cam = { pos: V3; look: V3; fov: number; roll: number };
type Shot = Partial<Cam> & { pos: V3; look: V3 };
type Key = { f: number; dur?: number; cut?: boolean; s: (f: number) => Shot };
export const glide = (u: number) => { const x = clamp01(u); return x * x * x * (x * (6 * x - 15) + 10); };
const mix = (a: Cam, b: Cam, k: number): Cam => ({
  pos: a.pos.map((v, i) => v + (b.pos[i] - v) * k) as V3, look: a.look.map((v, i) => v + (b.look[i] - v) * k) as V3,
  fov: a.fov + (b.fov - a.fov) * k, roll: a.roll + (b.roll - a.roll) * k,
});
const full = (c: Shot): Cam => ({ fov: 40, roll: 0, ...c });
const run = (keys: Key[], f: number) => {
  let cur = full(keys[0].s(f));
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    if (f < k.f) break;
    cur = k.cut ? full(k.s(f)) : mix(cur, full(k.s(f)), glide((f - k.f) / (k.dur ?? 24)));
  }
  return cur;
};
const T = (f: number) => f / FPS;
/** push-in factor since f0: the subject grows ~rate per frame; `punch` raises it for the first n frames */
const pushK = (f: number, f0: number, rate: number, punch = 0, n = 35) => {
  const x = Math.max(0, f - f0);
  let s = rate * x;
  if (punch > rate) for (let i = 0; i < Math.min(x, n); i++) s += (punch - rate) * Math.max(0, Math.min(1, (i + 0.5) / 8, (n - i - 0.5) / 8));
  return Math.exp(-s);
};
/** dolly push: camera slides toward the look point by factor k */
const dolly = (pos: V3, look: V3, k: number, rest: Partial<Cam> = {}): Shot =>
  ({ pos: [look[0] + (pos[0] - look[0]) * k, look[1] + (pos[1] - look[1]) * k, look[2] + (pos[2] - look[2]) * k], look, ...rest });
/** zoom push (camera stays put): tan(fov/2) shrinks by k */
const zoom = (pos: V3, look: V3, fov: number, k: number, rest: Partial<Cam> = {}): Shot =>
  ({ pos, look, fov: (360 / Math.PI) * Math.atan(Math.tan((fov * Math.PI) / 360) * k), ...rest });

// ---- framings ----
// shot 1 (hook, night): bow of the ship on the rails, torches; slow push-in.
// 30 m back: a 12 m ship needs ~30 m to fit the narrow 23 deg horizontal FOV; closer and the bow
// cone alone fills the frame as an abstract brown triangle.
const S1a = (f: number) => dolly([16, hillY(-20) + 5, -42], [0, hillY(-20) + 2, -16], pushK(f, 0, 0.0022), { fov: 42 });
const S1b = (f: number) => dolly([13, hillY(-20) + 4, -36], [0, hillY(-20) + 1.8, -15], pushK(f, 90, 0.0025), { fov: 38, roll: -0.03 });
// shot 2 (title, golden): same ship wider, sun behind the hill — 33 m back so ship + mast fit the frame
const S2a = (f: number) => dolly([20, hillY(-20) + 7, -46], [0, hillY(-20) + 1.5, -16], pushK(f, 195, 0.0015), { fov: 44 });
// shot 3 (setting, day): aerial wide -> chain close-up -> Bosporus ships held back
// High aerial, far back over the Bosporus: the old camera sat over the water looking away from it, so the
// Bosporus never appeared and the near hill filled the bottom half.
const S3a = (f: number) => zoom([70, 95, -160], [0, 4, 60], 44, pushK(f, 285, 0.0016));
const S3b = (f: number) => dolly([7, 3.2, 47], [0, 0.6, CHAIN_Z], pushK(f, 465, 0.0025), { fov: 38 });
// aim at the tight Bosporus cluster (x -14..14, z -92..-80)
const S3c = (f: number) => dolly([-14, 4, -112], [2, 1.5, -89], pushK(f, 560, 0.002), { fov: 44, roll: 0.03 });
// shot 4 (sultan, day): sultan + advisor at the road base, camera glides up toward the hill
const S4a = (f: number) => dolly([-10, hillY(-52) + 3, -66], [4, hillY(-52) + 1.8, -53], pushK(f, 630, 0.0015), { fov: 40 });
const S4b = (f: number) => dolly([-3, hillY(-40) + 3.5, -52], [0, hillY(-20) + 2, -18], pushK(f, 760, 0.0018), { fov: 42, roll: -0.03 });
// shot 5 (build, night): greased rails CU -> ship being pulled up the hill
const S5a = (f: number) => dolly([3.5, hillY(-30) + 2.4, -37], [0, hillY(-30) + 0.5, -29], pushK(f, 915, 0.0028), { fov: 36 });
const S5b = (f: number) => { const z = shipZ(T(f)); return dolly([16, hillY(z) + 5, z - 12], [0, hillY(z) + 1.5, z], pushK(f, 990, 0.0018), { fov: 42 }); };
// shot 6 (map card): the 2D overlay covers the frame; 3D base is the setting aerial, dimmed by the overlay
const S6a = (f: number) => zoom([70, 95, -160], [0, 4, 60], 44, 1);
// shot 7 (haul, night): haulers wide -> ship creeping up the hill
const S7a = (f: number) => dolly([-9, hillY(-25) + 6, -42], [0, hillY(-18) + 1.5, -18], pushK(f, 1225, 0.002), { fov: 44 });
const S7b = (f: number) => { const z = shipZ(T(f)); return dolly([16, hillY(z) + 5, z - 12], [0, hillY(z) + 1.5, z], pushK(f, 1300, 0.0018), { fov: 42 }); };
// shot 8 (snap, day): morning wide of the Horn, 70 ships in the water -> guards on the wall -> chain still intact
const S8a = (f: number) => zoom([42, 32, 28], [0, 2, 88], 46, pushK(f, 1380, 0.0016));
// guards: straight at the wall between the x = 0 and x = 25 towers, cluster centred x = 12.5
const S8b = (f: number) => dolly([12.5, 20.5, 85], [12.5, 18, WALL_Z], pushK(f, 1470, 0.0022), { fov: 40 });
const S8c = (f: number) => dolly([5, 2.8, 50], [0, 0.6, CHAIN_Z], pushK(f, 1520, 0.0025), { fov: 36 });
// shot 9 (deadpan, day): chain close-up, then the ships behind it
const S9a = (f: number) => dolly([3.5, 2.2, 53], [0, 0.6, CHAIN_Z], pushK(f, 1560, 0.0025), { fov: 34 });
// low camera: the chain (z = 62) sits in the lower third, the fleet behind it, the walls above
const S9b = (f: number) => dolly([0, 6, 48], [0, 1.5, 85], pushK(f, 1700, 0.002), { fov: 44 });
// shot 10 (explanation, day): greased beam CU -> workers pushing a chest on beams (the wardrobe analogy)
// the beam CU looks at z = -40: the lead ship parks at z = -15 during this shot and the old camera
// stared straight into its hull from 2 m away
const S10a = (f: number) => dolly([3.5, hillY(-40) + 2.2, -46], [0, hillY(-40) + 0.4, -40], pushK(f, 1850, 0.0028), { fov: 36 });
const S10b = (f: number) => dolly([-3, hillY(-48) + 2.2, -56], [8, hillY(-48) + 1.2, -47], pushK(f, 2070, 0.002), { fov: 40 });
// shot 11 (consequence, golden): wide city, calm — close enough that the fleet in the Horn still reads
const S11a = (f: number) => zoom([45, 26, -40], [0, 10, 105], 44, pushK(f, 2250, 0.0016));
// shot 12 (poll): same wide, dimmed by the end-card overlay
const S12a = (f: number) => zoom([45, 26, -40], [0, 10, 105], 44, 1);

const CAMS: Record<number, Key[]> = {
  1: [
    { f: 0, s: S1a },
    { f: 90, dur: 30, s: S1b },
  ],
  2: [{ f: 195, s: S2a }],
  3: [
    { f: 285, s: S3a },
    { f: 465, cut: true, s: S3b }, // cut to the chain (15.5 s: "mulut tanduk emas ditutup rantai")
    { f: 560, cut: true, s: S3c }, // cut to the Bosporus ships (18.7 s: "kapal Ottoman tidak bisa masuk")
  ],
  4: [
    { f: 630, s: S4a },
    { f: 760, dur: 40, s: S4b }, // glide up toward the hill
  ],
  5: [
    { f: 915, s: S5a }, // greased rails CU
    { f: 990, cut: true, s: S5b }, // ship pulled up the hill
  ],
  6: [{ f: 1065, s: S6a }],
  7: [
    { f: 1225, s: S7a }, // haulers wide
    { f: 1300, cut: true, s: S7b }, // ship creeping (43.3 s: "pelan-pelan semalaman")
  ],
  8: [
    { f: 1380, s: S8a }, // morning wide, 70 ships
    { f: 1470, cut: true, s: S8b }, // guards on the wall (49 s)
    { f: 1520, cut: true, s: S8c }, // chain still intact
  ],
  9: [
    { f: 1560, s: S9a }, // chain close-up ("rantai besinya masih utuh")
    { f: 1700, cut: true, s: S9b }, // ships behind the chain (56.7 s: "musuhnya sudah di belakang rantai")
  ],
  10: [
    { f: 1850, s: S10a }, // greased beam CU ("rahasianya, gesekan")
    { f: 2070, cut: true, s: S10b }, // chest analogy (69 s: "sama seperti mendorong lemari berat")
  ],
  11: [{ f: 2250, s: S11a }],
  12: [{ f: 2390, s: S12a }],
};

// no impact kicks in this story (the reveal is a cut, not a hit)
const KICKS: [number, number][] = [];
export const kickAt = (t: number) => {
  let a = 0;
  for (const [t0, g] of KICKS) {
    const n = Math.floor((t - t0) * FPS + 1e-6);
    if (n >= 0 && n < 7) a += g * (n % 2 ? -1 : 1) * (1 - n / 7) ** 1.5;
  }
  return a;
};
export const camAt = (id: number, f: number): Cam => {
  const c = run(CAMS[id], f), a = kickAt(T(f));
  if (!a) return c;
  const d: V3 = [c.look[0] - c.pos[0], c.look[1] - c.pos[1], c.look[2] - c.pos[2]];
  const L = Math.hypot(...d), h = Math.hypot(d[0], d[2]) || 1;
  const m = (3 / 640) * Math.tan((c.fov * Math.PI) / 360) * L * a;
  return { ...c, look: [c.look[0] - (d[2] / h) * m, c.look[1] + 0.6 * m, c.look[2] + (d[0] / h) * m], roll: c.roll + a * 0.004 };
};
/** frame at which the current key's move has finished (for picking billboard views per key, not per frame) */
export const keyEnd = (id: number, f: number) => {
  let e = 0;
  for (const k of CAMS[id]) if (f >= k.f) e = k.f + (k.cut ? 0 : k.dur ?? 24);
  return Math.max(f, e);
};

// ---------------- lens: depth of field ----------------
export type Dof = { f: number; dur?: number; cInf: number; focus?: (f: number) => V3 };
export const DOF: Dof[] = [
  { f: 0, cInf: 15, focus: () => [0, hillY(-20) + 1.2, -15] }, // hook: bow sharp, torches soft
  { f: 195, cInf: 0 }, // title wide
  { f: 285, cInf: 0 }, // setting aerial
  { f: 465, cInf: 14, focus: () => [0, 0.6, CHAIN_Z] }, // chain CU
  { f: 560, cInf: 0 }, // Bosporus ships
  { f: 630, cInf: 12, focus: () => [3, hillY(-52) + 1.8, -52] }, // sultan MS
  { f: 760, dur: 40, cInf: 0 }, // glide up the hill
  { f: 915, cInf: 14, focus: () => [0, hillY(-30) + 0.4, -30] }, // greased rails CU
  { f: 990, cInf: 0 }, // ship pulled up
  { f: 1065, cInf: 0 }, // map card
  { f: 1225, cInf: 0 }, // haulers wide
  { f: 1300, cInf: 0 }, // ship creeping
  { f: 1380, cInf: 0 }, // snap wide
  { f: 1470, cInf: 12, focus: () => [12.5, 18, WALL_Z] }, // guards on the wall (cluster centred x = 12.5)
  { f: 1520, cInf: 14, focus: () => [0, 0.6, CHAIN_Z] }, // chain intact
  { f: 1560, cInf: 14, focus: () => [0, 0.6, CHAIN_Z] }, // deadpan chain
  { f: 1700, cInf: 0 }, // ships behind the chain
  { f: 1850, cInf: 14, focus: () => [0, hillY(-40) + 0.3, -40] }, // greased beam CU (beam at z = -40, clear of the parked ship)
  { f: 2070, cInf: 10, focus: () => [8, hillY(-48) + 1.2, -47] }, // chest analogy
  { f: 2250, cInf: 0 }, // consequence wide
  { f: 2390, cInf: 0 }, // poll
];
export const dofAt = (f: number) => {
  let i = 0; while (i + 1 < DOF.length && f >= DOF[i + 1].f) i++;
  const d = DOF[i], p = DOF[Math.max(0, i - 1)];
  const k = d.dur ? Math.min(1, (f - d.f) / d.dur) : 1;
  return { cInf: p.cInf + (d.cInf - p.cInf) * k, focus: d.focus };
};
/** what the lens focuses on (DOF): the DOF table's focus point, else the camera look point */
export const focusAt = (id: number, f: number): V3 => {
  const d = dofAt(f);
  return d.focus ? d.focus(f) : camAt(id, f).look;
};

/** near framing objects: none in this short (the world is open; every shot is framed by the hill / water / walls) */
export type Fg = { a: number; b: number; kit: string; pos: V3; s?: number; yaw?: number };
export const FOREGROUND: Fg[] = [];
