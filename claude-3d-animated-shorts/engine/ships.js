// ships.js — "Kapal Lewat Darat": the Ottoman ships-overland story (April 1453) as a NEW film
// in the thuann-vn 3D stickman engine (engine/main.js, ?ships=1). 12 shots, 86.4 s, 1080x1920 @ 30 fps.
//
// NOTE (film header, per the build brief):
// - This is Avres's own story: the Ottoman haul of ~70 ships overland into the Golden Horn,
//   April 1453, Sultan Mehmed II vs Constantinople. Historical grounding: Franz Babinger's
//   "Mehmed the Conqueror and His Time", Roger Crowley's "1453: The Holy War for
//   Constantinople", Halil İnalcık's work on the Ottoman conquest. The 10 km overland route,
//   the greased wooden road, the great chain across the Horn mouth, and the 29 May fall of
//   the city are the facts the film is built on; the dialogue/VO is Avres's own script.
// - VO, captions and audio are REUSED from ~/workspace/ships-short (vo-zubenelgenubi.wav,
//   captions.json, audio/mix.wav). Nothing here regenerates them; captions are burned in
//   post (ffmpeg), never in-engine. No ElevenLabs, no new AI Studio requests.
// - Style study only: the look follows this engine's own film language (SKILL.md) and the
//   Remotion v2 reference render's geography/framing. No Ricks Clips scripts, characters
//   or shots are copied — all characters here are built fresh with SR.build.
// - Wiring: main.js calls buildShipsFilm(ctx) from the `if (Q.has('ships'))` branch placed
//   AFTER the chase block (ordering matters: chase is a plain `if`, not else-if) and before
//   SHOTS.sort. It wipes the rail film's shots (SHOTS.length = 0), hides the rail world,
//   and registers the 12 ships shots. main.js render() calls shipsOverlay2D(t, og) for the
//   2D cards and guards the rail film's cards/captions with !Q.has('ships').
//   window.DUR is set to 86.4 by the main.js DUR line for ?ships.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// ---------- geography (same layout as the Remotion story.ts) ----------
const D0 = 6.0, HILL_H = 14, HILL_HALF = 60, WALL_Z = 110, CHAIN_Z = 70; // CHAIN_Z was 62: groundY(62) is still +4.7 m, so the chain sat buried in the hillside and every chain CU had to shoot from UNDER the hill (camera below the ground, terrain backface-culled) — that is what the pale dead half in f465 was (sky seen through the culled slope). At z=70 the ground crosses y=0: the chain floats at the real waterline, and a camera above the hill can see it.
const hillY = z => D0 + HILL_H * Math.max(0, Math.cos((Math.PI * z) / (2 * HILL_HALF)));
const groundY = z => {
  const az = Math.abs(z);
  if (az <= 60) return hillY(z);
  if (az <= 70) return D0 + (-0.6 - D0) * ((az - 60) / 10);
  if (z > 100 && z < 110) return -0.6 + (D0 + 0.6) * ((z - 100) / 10);
  if (z >= 110) return D0;
  return -0.6;
};
const shipZ = t => { // lead ship creeps -55 -> -35 (BUILD), holds under MAP, -35 -> -15 (HAUL)
  const pts = [[30.5, -55], [35.5, -35], [40.8, -35], [46, -15]];
  if (t <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    return y0 + ((y1 - y0) * (t - x0)) / (x1 - x0);
  }
  return pts[pts.length - 1][1];
};
const SHIP_SHOTS = [0, 6.5, 9.5, 21, 30.5, 35.5, 40.8333, 46, 52, 61.6667, 75, 79.6667, 86.4];
const rng = seed => { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const sm01 = (a, b, x) => { const k = Math.min(1, Math.max(0, (x - a) / (b - a))); return k * k * (3 - 2 * k); };

// ---------- camera helpers (ported from the Remotion story.ts) ----------
const pushK = (t, t0, rate) => Math.exp(-rate * Math.max(0, (t - t0) * 30)); // t seconds -> frames
const dolly = (pos, look, k, fov, roll = 0) => ({
  pos: [look[0] + (pos[0] - look[0]) * k, look[1] + (pos[1] - look[1]) * k, look[2] + (pos[2] - look[2]) * k],
  look, fov, roll,
});
const zoomFov = (fov, k) => (360 / Math.PI) * Math.atan(Math.tan((fov * Math.PI) / 360) * k);
const glide = u => { const x = Math.min(1, Math.max(0, u)); return x * x * x * (x * (6 * x - 15) + 10); };
const mixCam = (a, b, k) => ({
  pos: a.pos.map((v, i) => v + (b.pos[i] - v) * k), look: a.look.map((v, i) => v + (b.look[i] - v) * k),
  fov: a.fov + (b.fov - a.fov) * k, roll: a.roll + (b.roll - a.roll) * k,
});
const backOut = x => { x = Math.min(1, Math.max(0, x)); const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };

// ---------- module state (set by buildShipsFilm) ----------
let C = null; // ctx from main.js
let skyU = null, cloudsG = null, sunDisc = null, fill = null;
let leadShip = null, fleetHull = null, fleetMast = null, fleetSail = null, fleet = [];
let oxenG = null, oxen = [], torchesG = null, dustG = null, dust = [], chestG = null, ropeG = null, ropes = [];
let sultan = null, advisor = null, workers = [], guards = [];
const SHIPCAST = []; const prevVisible = new Set();
const FLEET_N = 78, HORN_N = 70, BOS_N = 8;

// ---------- small builders ----------
const M4 = (x, y, z, ry = 0, sx = 1, sy = sx, sz = sx) =>
  new THREE.Matrix4().compose(new THREE.Vector3(x, y, z),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, 0)), new THREE.Vector3(sx, sy, sz));
const inkHull = (mesh, w = 0.02) => { // chase pattern: BackSide hull, screen-space-ish outline
  const o = new THREE.Mesh(mesh.geometry, new THREE.MeshBasicMaterial({ color: '#2a1612', side: THREE.BackSide }));
  o.scale.setScalar(1 + w); o.castShadow = false; mesh.add(o); return mesh;
};
const strut = (a, b, r, mat) => {
  const d = new THREE.Vector3().subVectors(b, a), len = d.length();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 5), mat);
  m.position.copy(a).addScaledVector(d, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  return m;
};
function merged(parts, mat, shadow = true) { // parts: [geometry, matrix4][]
  const mesh = new THREE.Mesh(mergeGeometries(parts.map(([g, m]) => g.clone().applyMatrix4(m))), mat);
  mesh.castShadow = shadow; mesh.receiveShadow = true; return mesh;
}
const canvasTex = (w, h, draw, rx = 1, ry = 1) => {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'));
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
};
// smooth 64-step toon ramp: the shared 4-step ramp quantises any slowly-varying
// dotNL into visible contour bands. Used by ground, water and the brick wall.
const smoothRamp = () => {
  const d = new Uint8Array(64); for (let i = 0; i < 64; i++) d[i] = Math.round(95 + (255 - 95) * i / 63);
  const t = new THREE.DataTexture(d, 64, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.LinearFilter; t.needsUpdate = true; return t;
};

// ---------- looks (ADDITIVE keys only — day/gold are never redefined) ----------
// az/el are the v2 Remotion lights.ts values, CAMERA-RELATIVE (az 0 = sun straight ahead =
// backlight, +90 = screen right; el = elevation). The sun is set per shot in cam() below.
// lift is the v2 shade.ts lift: a blue floor added by the grade so shaded faces never go black.
const SHIP_LOOKS = {
  shipsDay: { exp: 1.0, sat: 1.12, warm: 0.02, teal: 0.0, con: 1.05, sun: '#fff3e0', si: 3.0, hemi: 0.8, dir: new THREE.Vector3(-0.45, 0.8, 0.45), mul: [1.0, 1.0, 1.0], fog: '#cfe6fa', rim: '#ffffff', skyTop: '#3d8fd1', skyHor: '#cfe6fa', fogNear: 110, fogFar: 700, az: 75, el: 48, lift: [0.025, 0.028, 0.045] },
  shipsGold: { exp: 1.05, sat: 1.18, warm: 0.26, teal: 0.45, con: 1.08, sun: '#ffab5e', si: 4.5, hemi: 0.7, dir: new THREE.Vector3(-0.6, 0.32, 0.45), mul: [1.1, 0.96, 0.78], fog: '#f0c184', rim: '#ffb36b', skyTop: '#6a5a9e', skyHor: '#ffbe78', fogNear: 90, fogFar: 600, az: 6, el: 3, lift: [0.07, 0.07, 0.12] },
  shipsNight: { exp: 0.95, sat: 1.0, warm: 0.03, teal: 0.3, con: 1.12, sun: '#8fa8e8', si: 1.6, hemi: 1.2, dir: new THREE.Vector3(-0.45, 0.7, 0.4), mul: [0.75, 0.8, 1.0], fog: '#141c33', rim: '#8fb0ff', skyTop: '#0a0f2e', skyHor: '#233258', fogNear: 120, fogFar: 700, az: 120, el: 35, lift: [0.13, 0.13, 0.2] },
};
let curLook = 'shipsDay';
function lookSetup(name) {
  curLook = name;
  C.setLook(name);
  const L = SHIP_LOOKS[name];
  skyU.top.value.set(L.skyTop); skyU.hor.value.set(L.skyHor);
  C.scene.fog.color.set(L.fog); C.scene.fog.near = L.fogNear; C.scene.fog.far = L.fogFar;
  cloudsG.visible = name === 'shipsDay'; // night: no clouds; golden: the sun disc is the sky feature
  C.setLift(L.lift);
  sunDisc.visible = name === 'shipsGold';
  fill.intensity = name === 'shipsNight' ? 1.3 : name === 'shipsGold' ? 0.85 : 0; // night 1.3 / gold 0.85 (was 1.1 / 0.5): the camera-facing hill in f75/f2300 was reading near-black; the on-axis fill is the lever that lights it without touching the sun
  fill.color.set(name === 'shipsGold' ? '#ffb36b' : '#8fa8e8'); // gold: warm camera-side fill so the city keeps detail against the sunset (was night-only)
  // golden: the low sun's hill shadow is a knife-edge for the shadow map; a bigger
  // normalBias stops the ground self-shadowing from striping (acne). 0.05 still left
  // fine diagonal acne stripes across the f230 hill (verified in a 3x crop) — 0.2.
  C.sun.shadow.normalBias = name === 'shipsGold' ? 0.2 : 0.02;
}
// camera-relative sun (v2 lights.ts az/el): sun dir from the shot camera's forward axis
function sunDirFor(azDeg, elDeg, pos, look) {
  const f = new THREE.Vector3(look[0] - pos[0], 0, look[2] - pos[2]).normalize();
  const r = new THREE.Vector3().crossVectors(f, new THREE.Vector3(0, 1, 0)).normalize(); // screen right
  const az = (azDeg * Math.PI) / 180, el = (elDeg * Math.PI) / 180;
  const h = new THREE.Vector3().addScaledVector(f, Math.cos(az)).addScaledVector(r, Math.sin(az));
  return new THREE.Vector3(h.x * Math.cos(el), Math.sin(el), h.z * Math.cos(el)).normalize();
}

// ---------- per-frame reset (seek-safe): hide everything shot-specific ----------
// per-shot sun override (az/el), set by a shot branch, cleared in begin() every frame.
// Only use: the snap guard CU, where the day sun (az 75, from behind the wall) leaves the
// wall face with no direct sun and drops the towers' diagonal shadow bands across it.
// az 140 puts the sun on the camera side: face sunlit, tower shadows fall behind the wall.
let sunOv = null;
function begin(lookName) {
  lookSetup(lookName);
  sunOv = null;
  for (const c of prevVisible) { c.root.visible = false; C.SR.updateLimbs(c); }
  prevVisible.clear();
  torchesG.visible = false; oxenG.visible = false; ropeG.visible = false; dustG.visible = false; chestG.visible = false;
  for (const d of dust) d.m.visible = false;
}
function use(c) { prevVisible.add(c); }
function finish() { for (const c of prevVisible) C.SR.updateLimbs(c); }

function poseLead(z) {
  const y = hillY(z), slope = (hillY(z + 1) - hillY(z - 1)) / 2;
  leadShip.position.set(0, y + 0.3, z);
  leadShip.rotation.set(-Math.atan(slope), 0, 0);
}
const _dummy = new THREE.Object3D();
function poseFleet(t, showHorn, showBos, hideNear = 0) {
  for (let i = 0; i < FLEET_N; i++) {
    const a = fleet[i], vis = a.horn ? (showHorn && a.z >= hideNear) : showBos; // hideNear: hold the nearest Horn ships back during the chain CUs (t 50.7-52, 52-56.7) — ships at z 70-82 loom over the chain from 5 m behind it and read as giant boxes
    const bob = 0.1 * Math.sin(t * 0.8 + a.ph), roll = 0.025 * Math.sin(t * 0.6 + a.ph * 1.3);
    _dummy.position.set(a.x, -0.1 + bob, a.z);
    _dummy.rotation.set(roll, a.yaw, 0);
    _dummy.scale.setScalar(vis ? 1 : 0);
    _dummy.updateMatrix();
    fleetHull.setMatrixAt(i, _dummy.matrix);
    fleetMast.setMatrixAt(i, _dummy.matrix);
    fleetSail.setMatrixAt(i, _dummy.matrix);
  }
  fleetHull.instanceMatrix.needsUpdate = true;
  fleetMast.instanceMatrix.needsUpdate = true;
  fleetSail.instanceMatrix.needsUpdate = true;
}
function showOxen(sz) {
  oxenG.visible = true;
  [[-1.6, sz + 9], [1.6, sz + 11]].forEach(([x, z], i) => { oxen[i].position.set(x, hillY(z), z); oxen[i].rotation.y = 0; });
}
function setRope(i, A, B) {
  const m = ropes[i], d = new THREE.Vector3().subVectors(B, A), len = d.length();
  m.position.copy(A).addScaledVector(d, 0.5);
  m.scale.set(1, len, 1);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
}
function showDust(t) {
  dustG.visible = true;
  const sp = leadShip.position;
  for (const d of dust) {
    const u = (t * 0.12 + d.k) % 1, s = 3 + u * 5;
    d.m.position.set(sp.x + d.off[0] - u * 4, sp.y + d.off[1] + u * 2.5, sp.z + d.off[2]);
    d.m.scale.set(s, s, 1); d.m.quaternion.copy(C.camera.quaternion);
    d.mat.opacity = 0.45 * Math.pow(1 - u, 1.2); d.m.visible = true;
  }
}
// grease pose: crouch over the rail, right arm down to the grease point (no engine pose for this)
function grease(c, t, px, py, pz) {
  C.idle(c, t);
  C.hips(c, -0.05, 0.04);
  C.SR.rotWorld(c.bone('Spine1'), C.LEFT(c), 0.42);
  C.arm(c, 'Right', new THREE.Vector3(px, py, pz));
  C.arm(c, 'Left', new THREE.Vector3(px + 0.15, py + 0.1, pz));
}

// ---------- the set ----------
function buildSky() {
  skyU = { top: { value: new THREE.Color('#3d8fd1') }, hor: { value: new THREE.Color('#cfe6fa') } };
  const sky = new THREE.Mesh(new THREE.SphereGeometry(2600, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false, uniforms: skyU,
    vertexShader: 'varying vec3 vp; void main(){ vp = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 top, hor; varying vec3 vp; void main(){ float h = clamp(vp.y, 0.0, 1.0); vec3 c = mix(hor, top, smoothstep(0.0, 0.5, h)); c = mix(c, hor, smoothstep(0.0, -0.08, vp.y)); gl_FragColor = vec4(c, 1.0); }',
  }));
  sky.renderOrder = -1; sky.frustumCulled = false; C.scene.add(sky);
  // golden sun disc (v2: '#ffcf9e'): a billboard circle + soft glow, placed along the
  // camera-relative sun dir each frame by cam(); visible only in the golden look
  sunDisc = new THREE.Group();
  const disc = new THREE.Mesh(new THREE.CircleGeometry(50, 32), new THREE.MeshBasicMaterial({ color: '#ffcf9e', fog: false, toneMapped: false }));
  disc.material.color.setRGB(2.2, 1.6, 1.0);
  const glow = new THREE.Mesh(new THREE.CircleGeometry(75, 32), new THREE.MeshBasicMaterial({ color: '#ffb36b', transparent: true, opacity: 0.22, fog: false, toneMapped: false, depthWrite: false }));
  sunDisc.add(glow, disc); sunDisc.visible = false; C.scene.add(sunDisc);
  // night camera fill: a shadowless cool light on the camera axis, on only in the night
  // look. The moon (az 120) backlights the ship, so the camera-facing hull would read
  // near-black without it; v2's shade model gives the same faces a purple-blue floor.
  fill = new THREE.DirectionalLight('#8fa8e8', 0); fill.castShadow = false; C.scene.add(fill, fill.target);
  cloudsG = new THREE.Group(); C.scene.add(cloudsG);
  const cm = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.92, fog: false });
  const r = rng(7);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + 0.4, d = 350 + r() * 350;
    const cl = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), cm);
    cl.scale.set(60 + r() * 60, 14 + r() * 10, 26 + r() * 20);
    cl.position.set(Math.cos(a) * d, 130 + r() * 90, Math.sin(a) * d);
    cloudsG.add(cl);
  }
}
function buildGround() {
  // GRAIN FIX (f75 wedge): the road-corridor wedge (x -6..+5) is only ~11 m wide —
  // one ground-vertex column — so per-vertex colour variation can never show there.
  // A world-scale canvas noise texture gives the ground real grain everywhere. The
  // tile is 40 m (512 px): blotches 0.5-5 m read at close-up, the tile repeats only
  // ~4x across an aerial frame, and every mark is a soft round blob drawn wrapped
  // (seamless edges) — no lines, no stripes, nothing directional, so it cannot band
  // or read as mowing lines under the grazing golden sun. Mean multiplier ~0.96,
  // so the tuned vertex-colour brightness is preserved.
  const GT = 40;
  const groundTex = canvasTex(512, 512, g => {
    g.fillStyle = '#f6f6f6'; g.fillRect(0, 0, 512, 512);
    const r = rng(9911);
    const cols = ['46,77,36', '74,90,40', '90,74,48', '58,70,52']; // dark green / olive / warm brown
    // draw the same shape at all 9 wrapped offsets so the tile is seamless; all
    // random params are drawn ONCE per mark, outside the wrap, or the copies differ
    const wrap = fn => { for (const dx of [-512, 0, 512]) for (const dy of [-512, 0, 512]) { g.save(); g.translate(dx, dy); fn(); g.restore(); } };
    for (let i = 0; i < 90; i++) { // large soft blotches, 1.9-5.5 m
      const x = r() * 512, y = r() * 512, rad = 24 + r() * 46, a = 0.04 + r() * 0.05, c = cols[Math.floor(r() * cols.length)];
      wrap(() => {
        const gr = g.createRadialGradient(x, y, 0, x, y, rad);
        gr.addColorStop(0, `rgba(${c},${a})`); gr.addColorStop(1, `rgba(${c},0)`);
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, 7); g.fill();
      });
    }
    for (let i = 0; i < 500; i++) { // medium speckles, 0.5-1.4 m
      const x = r() * 512, y = r() * 512, rad = 6 + r() * 12, ry = rad * (0.6 + r() * 0.8), rot = r() * Math.PI, a = 0.08 + r() * 0.12, c = cols[Math.floor(r() * cols.length)];
      wrap(() => { g.fillStyle = `rgba(${c},${a})`; g.beginPath(); g.ellipse(x, y, rad, ry, rot, 0, 7); g.fill(); });
    }
    for (let i = 0; i < 6000; i++) { // fine grain, 8-25 cm
      const x = r() * 512, y = r() * 512, s = 1 + r() * 2, a = 0.10 + r() * 0.20, c = cols[Math.floor(r() * cols.length)];
      wrap(() => { g.fillStyle = `rgba(${c},${a})`; g.fillRect(x, y, s, s); });
    }
  }, 1, 1);
  const xs = [], zs = [];
  for (let x = -600; x <= 600; x += 10) xs.push(x);
  for (let z = -300; z <= 300; z += 5) zs.push(z);
  const nx = xs.length, nz = zs.length, pos = new Float32Array(nx * nz * 3), col = new Float32Array(nx * nz * 3), uv = new Float32Array(nx * nz * 2), idx = [];
  const cA = new THREE.Color('#5a8f42'), cB = new THREE.Color('#487a35'), cSand = new THREE.Color('#d8c690'), c = new THREE.Color(); // base brightened (was #4a7d38/#3a6a28): v2's hill is pale lit green, ours read saturated dark
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    const o = (j * nx + i) * 3, x = xs[i], z = zs[j], y = groundY(z);
    pos[o] = x; pos[o + 1] = y; pos[o + 2] = z;
    const k = sm01(-1, 6, y);
    c.copy(cB).lerp(cA, k);
    // BANDING FIX (f230): the old colour mixed in 0.6*sin(x*0.3)*sin(z*0.27). The hill's
    // height depends only on z, so that term drew wavy contour stripes across the slope,
    // one per 5 m mesh row, under the grazing golden sun. Colour now varies only with
    // height (smooth) plus a long-wavelength term that is smooth across mesh rows.
    const terr = 0.11 * Math.sin(y * 1.8 + 0.9 * Math.sin(x * 0.06 + 0.8)); // contour terraces, phase-wobbled by x so they read as contours, not straight painted stripes (the old straight sin(y) bands read as mowing stripes at aerial distance)
    const broad = 0.12 * Math.sin(x * 0.05 + 1.7) * Math.sin(z * 0.045 + 0.6);
    // patchy mottling: deterministic per-vertex hash, ±5% lightness. Varies per vertex,
    // not per mesh row, so it cannot stripe (the old sin(x)*sin(z) term banded because
    // the hill height depends only on z). This is the fine grain the aerials were missing.
    const hh = Math.imul(i + 1, 73856093) ^ Math.imul(j + 1, 19349663);
    const mottle = ((Math.imul(hh, 2654435761) >>> 0) / 4294967296 - 0.5) * 0.14;
    c.offsetHSL(0, 0, terr + broad + mottle);
    const sand = Math.max(sm01(58, 66, Math.abs(z)) * (1 - sm01(66, 74, Math.abs(z))), sm01(96, 101, z) * (1 - sm01(101, 106, z)));
    if (sand > 0) c.lerp(cSand, sand * 0.7);
    col[o] = c.r; col[o + 1] = c.g; col[o + 2] = c.b;
    uv[(j * nx + i) * 2] = x / GT; uv[(j * nx + i) * 2 + 1] = z / GT; // world-scale UVs: one noise tile per 40 m
    if (i < nx - 1 && j < nz - 1) { const a = j * nx + i, b = a + 1, cc = a + nx, d = cc + 1; idx.push(a, cc, d, a, d, b); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals();
  const m = C.SR.toon('#ffffff', { rim: 0, kick: 0, map: groundTex }); m.vertexColors = true;
  // smooth ramp for the ground ONLY: the shared 4-step toon ramp draws contour bands
  // across the hill slope under the grazing golden sun; the ground is smooth-shaded in v2
  m.gradientMap = smoothRamp();
  const ground = new THREE.Mesh(g, m); ground.receiveShadow = true; ground.castShadow = true; C.scene.add(ground); // castShadow: the hill must shadow the foreground ground under the low golden sun
  // dirt haul road: quads along x = 0 following the hill
  const rp = [], rn = [];
  for (let z = -58; z < 58; z += 2) {
    const y0 = hillY(z) + 0.08, y1 = hillY(z + 2) + 0.08;
    rp.push(-2.5, y0, z, 2.5, y1, z + 2, 2.5, y0, z, -2.5, y0, z, -2.5, y1, z + 2, 2.5, y1, z + 2);
    for (let k = 0; k < 6; k++) rn.push(0, 1, 0);
  }
  const rg = new THREE.BufferGeometry();
  rg.setAttribute('position', new THREE.Float32BufferAttribute(rp, 3));
  rg.setAttribute('normal', new THREE.Float32BufferAttribute(rn, 3));
  const road = new THREE.Mesh(rg, C.SR.toon('#a08055', { rim: 0, kick: 0 }));
  road.receiveShadow = true; C.scene.add(road);
  // (no terrace ribbons: from the aerial they read as artificial mowing stripes; the
  // heightfield vertex-colour variation already shapes the hill)
  // bushes + rocks on the slopes (off the road |x| < 8, off the chest at (8,-47)).
  // FIX (flat-hill blocker): 46 bushes over a 1200x600 m ground left the aerials' foreground
  // band empty — 2 bushes visible in f300. Now 130 bushes / 48 rocks, ~70% biased into the
  // foreground band the aerials actually see (|x| < 160, z -60..70), bigger (up to 2.2 m),
  // plus 220 grass tufts for fine grain. Sizes vary so the scatter reads as texture, not dots.
  const r3 = rng(2026), q0 = new THREE.Quaternion(), mm = new THREE.Matrix4(), p3 = new THREE.Vector3(), s3 = new THREE.Vector3();
  const bush = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 10, 8), C.SR.toon('#38692c', { rim: 0.4 }), 130);
  let k = 0;
  for (let i = 0; i < 130; i++) {
    let x, z;
    if (i < 90) { x = (r3() < 0.5 ? -1 : 1) * (8 + r3() * 150); z = -60 + r3() * 130; }
    else { x = (r3() < 0.5 ? -1 : 1) * (8 + r3() * 210); z = (r3() < 0.5 ? -1 : 1) * (10 + r3() * 45); }
    if (Math.abs(x - 8) < 3 && Math.abs(z + 47) < 3) continue;
    const rr = 0.9 + r3() * 1.3;
    p3.set(x, hillY(z) + 0.05, z); s3.set(rr, rr * 0.65, rr); mm.compose(p3, q0, s3); bush.setMatrixAt(k++, mm);
  }
  bush.count = k; bush.castShadow = true; bush.receiveShadow = true; C.scene.add(bush);
  const rock = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), C.SR.toon('#8a8d90', { rim: 0.4 }), 48);
  k = 0;
  for (let i = 0; i < 48; i++) {
    let x, z;
    if (i < 30) { x = (r3() < 0.5 ? -1 : 1) * (8 + r3() * 150); z = -60 + r3() * 130; }
    else { x = (r3() < 0.5 ? -1 : 1) * (8 + r3() * 210); z = (r3() < 0.5 ? -1 : 1) * (10 + r3() * 45); }
    if (Math.abs(x - 8) < 3 && Math.abs(z + 47) < 3) continue;
    const rr = 0.5 + r3() * 0.7;
    p3.set(x, hillY(z) + 0.05, z); s3.set(rr, rr * 0.6, rr); mm.compose(p3, q0, s3); rock.setMatrixAt(k++, mm);
  }
  rock.count = k; rock.castShadow = true; rock.receiveShadow = true; C.scene.add(rock);
  const tuft = new THREE.InstancedMesh(new THREE.ConeGeometry(0.35, 0.9, 5), C.SR.toon('#2e5c24', { rim: 0.3 }), 220);
  k = 0;
  for (let i = 0; i < 220; i++) {
    const x = (r3() < 0.5 ? -1 : 1) * (6 + r3() * 160), z = -60 + r3() * 135;
    if (Math.abs(x) < 6) continue; // keep off the road
    const rr = 0.6 + r3() * 0.9;
    p3.set(x, hillY(z) + 0.3 * rr, z); s3.set(rr, rr, rr); mm.compose(p3, q0, s3); tuft.setMatrixAt(k++, mm);
  }
  tuft.count = k; tuft.castShadow = false; tuft.receiveShadow = true; C.scene.add(tuft);
  // corridor scatter (FIX f75/f230 round 2): light-green bushes + tufts hugging the road
  // corridor (x ±6..45, z -58..5) — the patch shots 1/2/5/7 look down. Round 1's wide
  // scatter is dark green, which reads as nothing against the night/gold slope (verified:
  // f75/f230 bottoms stayed smooth); this lighter set reads as pale dots at night and in
  // gold. Kept off the road (|x|>6), the chest + shot-10 workers (|x-8|<3, |z+47|<3) and
  // the sultan/advisor (|x-3|<3, |z+52|<3 / |x-5.5|<3, |z+54|<3). Appended after the wide
  // loops so the wide scatter's rng stream (and f300/f2300's layout) is unchanged.
  const cbush = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 10, 8), C.SR.toon('#4f8a3c', { rim: 0.4 }), 50);
  k = 0;
  for (let i = 0; i < 50; i++) {
    const x = (r3() < 0.5 ? -1 : 1) * (6 + r3() * 39), z = -58 + r3() * 63;
    if ((Math.abs(x - 8) < 3 && Math.abs(z + 47) < 3) || (Math.abs(x - 3) < 3 && Math.abs(z + 52) < 3) || (Math.abs(x - 5.5) < 3 && Math.abs(z + 54) < 3)) continue;
    const rr = 0.8 + r3() * 1.2;
    p3.set(x, hillY(z) + 0.05, z); s3.set(rr, rr * 0.65, rr); mm.compose(p3, q0, s3); cbush.setMatrixAt(k++, mm);
  }
  cbush.count = k; cbush.castShadow = true; cbush.receiveShadow = true; C.scene.add(cbush);
  const ctuft = new THREE.InstancedMesh(new THREE.ConeGeometry(0.35, 0.9, 5), C.SR.toon('#6a9a48', { rim: 0.3 }), 120);
  k = 0;
  for (let i = 0; i < 120; i++) {
    const x = (r3() < 0.5 ? -1 : 1) * (6 + r3() * 39), z = -58 + r3() * 63;
    if ((Math.abs(x - 8) < 3 && Math.abs(z + 47) < 3) || (Math.abs(x - 3) < 3 && Math.abs(z + 52) < 3) || (Math.abs(x - 5.5) < 3 && Math.abs(z + 54) < 3)) continue;
    const rr = 0.7 + r3() * 1.0;
    p3.set(x, hillY(z) + 0.3 * rr, z); s3.set(rr, rr, rr); mm.compose(p3, q0, s3); ctuft.setMatrixAt(k++, mm);
  }
  ctuft.count = k; ctuft.castShadow = false; ctuft.receiveShadow = true; C.scene.add(ctuft);
  // near-foreground rocks (FIX f75 round 3): grey rocks read at night where green scatter
  // does not — the close-up shots look down this patch (x ±6..45, z -35..-5) and the wide
  // scatter leaves ~2 rocks in it. Appended last so the rng stream of every loop above
  // (and f300/f2300's layout) is unchanged. Kept off the road and the chest/workers.
  const nfrock = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), C.SR.toon('#9a9da0', { rim: 0.4 }), 14);
  k = 0;
  for (let i = 0; i < 14; i++) {
    const x = (r3() < 0.5 ? -1 : 1) * (6 + r3() * 39), z = -35 + r3() * 30;
    if (Math.abs(x - 8) < 3 && Math.abs(z + 47) < 3) continue;
    const rr = 0.5 + r3() * 0.5;
    p3.set(x, hillY(z) + 0.05, z); s3.set(rr, rr * 0.6, rr); mm.compose(p3, q0, s3); nfrock.setMatrixAt(k++, mm);
  }
  nfrock.count = k; nfrock.castShadow = true; nfrock.receiveShadow = true; C.scene.add(nfrock);
}
function buildWater() {
  const tex = canvasTex(256, 256, g => {
    g.fillStyle = '#2f7fb8'; g.fillRect(0, 0, 256, 256);
    // deep teal wash so the tile is never one flat cyan
    const wash = g.createLinearGradient(0, 0, 0, 256);
    wash.addColorStop(0, 'rgba(20,90,140,0.35)'); wash.addColorStop(0.5, 'rgba(20,90,140,0)'); wash.addColorStop(1, 'rgba(120,220,235,0.22)');
    g.fillStyle = wash; g.fillRect(0, 0, 256, 256);
    const r = rng(77);
    for (let i = 0; i < 170; i++) { // crest arcs + glint streaks + foam dots (v2: rich blue-teal, not a flat sheet)
      const y = r() * 256, x = r() * 256, len = 20 + r() * 50;
      if (i % 5 === 4) { // foam dot cluster
        g.fillStyle = `rgba(255,255,255,${0.25 + r() * 0.35})`;
        g.beginPath(); g.ellipse(x, y, 1.5 + r() * 3, 1 + r() * 1.5, 0, 0, 7); g.fill();
      } else if (i % 4 === 3) { // glint speck: short bright dash
        g.strokeStyle = `rgba(255,250,220,${0.35 + r() * 0.4})`; g.lineWidth = 1 + r();
        g.beginPath(); g.moveTo(x, y); g.lineTo(x + 6 + r() * 10, y - 1 + r() * 2); g.stroke();
      } else { // white crest arc / dark trough stroke
        g.strokeStyle = i % 3 ? `rgba(255,255,255,${0.12 + r() * 0.22})` : `rgba(15,70,115,${0.2 + r() * 0.15})`;
        g.lineWidth = 1 + r() * 2;
        g.beginPath(); g.moveTo(x, y);
        g.bezierCurveTo(x + len * 0.3, y - 4 - r() * 4, x + len * 0.7, y + 4 + r() * 4, x + len, y);
        g.stroke();
      }
    }
  }, 30, 6);
  const wm = C.SR.toon('#ffffff', { map: tex, rim: 0, kick: 0 });
  wm.gradientMap = smoothRamp(); // the 4-step ramp banded the flat plane under the low golden sun (same cause as the ground)
  for (const [w, d, x, z] of [[1200, 240, 0, -180], [1200, 240, 0, 180]]) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(w, d), wm);
    p.rotation.x = -Math.PI / 2; p.position.set(x, 0, z); p.receiveShadow = true; C.scene.add(p);
  }
  // second subtle layer: sparse glint specks drifting over the base water (opacity low, no toon ramp)
  const glintT = canvasTex(256, 256, g => {
    g.clearRect(0, 0, 256, 256);
    const r = rng(31);
    for (let i = 0; i < 60; i++) {
      g.strokeStyle = `rgba(255,250,225,${0.3 + r() * 0.45})`; g.lineWidth = 1 + r() * 1.5;
      const x = r() * 256, y = r() * 256, len = 8 + r() * 22;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + len, y - 1 + r() * 2); g.stroke();
    }
  }, 18, 4);
  const glintM = new THREE.MeshBasicMaterial({ map: glintT, transparent: true, opacity: 0.4, depthWrite: false });
  for (const z of [-180, 180]) {
    const gp = new THREE.Mesh(new THREE.PlaneGeometry(1200, 240), glintM);
    gp.rotation.x = -Math.PI / 2; gp.position.set(0, 0.06, z); C.scene.add(gp);
  }
  const foamT = canvasTex(256, 64, g => {
    g.clearRect(0, 0, 256, 64);
    for (let i = 0; i < 90; i++) {
      g.fillStyle = `rgba(255,255,255,${0.25 + Math.random() * 0.5})`;
      g.beginPath(); g.ellipse(Math.random() * 256, 16 + Math.random() * 32, 6 + Math.random() * 18, 2 + Math.random() * 4, 0, 0, 7); g.fill();
    }
  }, 14, 1);
  const foamM = new THREE.MeshBasicMaterial({ map: foamT, transparent: true, opacity: 0.8, depthWrite: false });
  for (const fz of [69.2, -69.2, 101.2]) { // foam where the water meets the beaches (groundY crosses 0 at |z| ~ 69); a band at |z| ~ 61 would sit under the hillside
    const fm = new THREE.Mesh(new THREE.PlaneGeometry(800, 3.5), foamM);
    fm.rotation.x = -Math.PI / 2; fm.position.set(0, 0.15, fz); C.scene.add(fm);
  }
}
function buildCity() {
  const stone = C.SR.toon('#c9bcaa', { rim: 0.3, kick: 0.1 });
  const cope = C.SR.toon('#e6dccd', { rim: 0.3, kick: 0.1 });
  const domeM = C.SR.toon('#8a8f96', { rim: 0.4, kick: 0.2 });
  const houseM = C.SR.toon('#d8c9a8', { rim: 0.3, kick: 0.1 });
  const roofM = C.SR.toon('#96604c', { rim: 0.4, kick: 0.1 }); // muted + smaller cones: the bright orange triangles read as flat shapes behind the wall
  const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
  const wall = [], cop = [], dome = [], house = [], roof = [];
  // curtain wall: its own mesh with a real brick texture. The merged wall's BoxGeometry
  // UVs are 0..1 per face, so a texture on the merged material would stretch; a
  // separate mesh lets the repeat match the front face (0.5 m bricks, 0.3 m courses).
  // Towers/domes stay in the merged stone mesh (their cylindrical UVs would shred the brick tile).
  const brickTex = canvasTex(512, 256, g => {
    g.fillStyle = '#a89a86'; g.fillRect(0, 0, 512, 256); // mortar
    const r = rng(1453), tones = ['#c9b8a0', '#bfae96', '#d3c4ab', '#b3a28c', '#c4b49c', '#c0ac90'];
    const bh = 16, bw = 64;
    for (let row = 0; row < 256 / bh; row++) {
      const off = (row % 2) ? bw / 2 : 0;
      for (let col = -1; col < 512 / bw + 1; col++) {
        g.fillStyle = tones[Math.floor(r() * tones.length)];
        g.fillRect(col * bw + off + 1.5, row * bh + 1.5, bw - 3, bh - 3);
        g.fillStyle = 'rgba(255,255,255,0.10)';
        g.fillRect(col * bw + off + 1.5, row * bh + 1.5, bw - 3, 2);
      }
    }
  }, 75, 2.5);
  const brickM = C.SR.toon('#ffffff', { map: brickTex, rim: 0.25, kick: 0.1 });
  brickM.gradientMap = smoothRamp();
  const curtain = new THREE.Mesh(box(300, 12, 4), brickM);
  curtain.position.set(0, D0 + 6, WALL_Z); curtain.castShadow = true; curtain.receiveShadow = true;
  C.scene.add(curtain);
  // (curtain wall box removed from the merged `wall` array below)
  let mi = 0;
  for (let x = -147; x <= 147; x += 3) { if (mi++ % 7 === 3) continue; cop.push([box(1.5, 1, 4), M4(x + 0.75, D0 + 12.5, WALL_Z)]); }
  // towers: heights [18,22,18,26,18,22,18,30,18,22,18,26,18]; >=26 dome caps, rest cones
  const TOWER_H = [18, 22, 18, 26, 18, 22, 18, 30, 18, 22, 18, 26, 18];
  for (let i = 0; i < TOWER_H.length; i++) {
    const x = -150 + i * 25, h = TOWER_H[i];
    wall.push([new THREE.CylinderGeometry(3.5, 4, h, 12), M4(x, D0 + h / 2, WALL_Z)]);
    if (h >= 26) dome.push([new THREE.SphereGeometry(4.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), M4(x, D0 + h, WALL_Z)]);
    else wall.push([new THREE.ConeGeometry(4.2, 3, 8), M4(x, D0 + h + 1.5, WALL_Z)]);
  }
  // chain anchor blocks at the Horn mouth
  for (const s of [-1, 1]) wall.push([box(4, D0 + 1.5, 4), M4(s * 90, (D0 + 1) / 2 - 0.25, CHAIN_Z)]);
  // house rows z = 120/138/156/174
  const r = rng(1453);
  for (const zr of [120, 138, 156, 174]) for (let x = -120; x <= 120; x += 13) {
    const w = 7 + Math.floor(r() * 3), h = zr === 174 ? 8 + r() * 5 : 5 + r() * 7;
    const hx = x + (r() - 0.5) * 5, hz = zr + (r() - 0.5) * 4;
    house.push([box(w, h, 8), M4(hx, D0 + h / 2, hz)]);
    roof.push([new THREE.ConeGeometry(w * 0.66, 2.0 + r() * 1.0, 4), M4(hx, D0 + h + 1.0, hz, Math.PI / 4)]);
  }
  // domes: central (-5,140) r13 h14 + 3 smaller; minarets 4
  for (const [x, z, rr, hh] of [[-5, 140, 13, 14], [-40, 128, 7, 9], [25, 145, 9, 11], [70, 125, 6, 8]]) {
    wall.push([new THREE.CylinderGeometry(rr * 0.8, rr * 0.8, hh, 16), M4(x, D0 + hh / 2, z)]);
    dome.push([new THREE.SphereGeometry(rr, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), M4(x, D0 + hh, z)]);
  }
  for (const [x, z, mh] of [[-70, 135, 22], [55, 140, 22], [-22, 148, 27], [12, 148, 27]]) {
    wall.push([new THREE.CylinderGeometry(0.7, 0.9, mh, 10), M4(x, D0 + mh / 2, z)]);
    dome.push([new THREE.ConeGeometry(1.1, 3.5, 8), M4(x, D0 + mh + 1.75, z)]);
  }
  C.scene.add(merged(wall, stone), merged(cop, cope), merged(dome, domeM), merged(house, houseM), merged(roof, roofM));
}
function buildRoadAndChain() {
  const woodM = C.SR.toon('#7a5a38', { rim: 0.3, kick: 0.1 });
  // greased rails: tubes following the hill at x = +/-1.2
  for (const x of [-1.2, 1.2]) {
    const pts = [];
    for (let j = 0; j < 59; j++) { const z = -58 + j * 2; pts.push(new THREE.Vector3(x, hillY(z) + 0.15, z)); }
    const rail = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, 0.09, 6), woodM);
    rail.castShadow = true; rail.receiveShadow = true; C.scene.add(rail);
  }
  const sleeper = new THREE.InstancedMesh(new THREE.BoxGeometry(3.0, 0.12, 0.28), woodM, 58);
  { const m4 = new THREE.Matrix4(), q0 = new THREE.Quaternion(), one = new THREE.Vector3(1, 1, 1);
    for (let j = 0; j < 58; j++) { const z = -57 + j * 2; sleeper.setMatrixAt(j, m4.compose(new THREE.Vector3(0, hillY(z) + 0.06, z), q0, one)); } }
  sleeper.instanceMatrix.needsUpdate = true; sleeper.castShadow = true; sleeper.receiveShadow = true; C.scene.add(sleeper);
  // the great chain: interlocking links every 0.42 m along the Horn mouth (v2 Strand: h=0.5,
  // link 0.69 x 0.425 m, pitch 0.45 m, ~400 links), alternating ring plane, warm grey #8c847c.
  // v2 fix: thicker tube + darker iron + stronger rim/kick + tighter pitch so consecutive
  // rings overlap and read as interlocked iron, not separate beads on a line.
  const iron = C.SR.toon('#7d7468', { rim: 0.8, kick: 0.5 });
  const parts = [];
  const linkG = new THREE.TorusGeometry(0.17, 0.06, 8, 14);
  for (let j = 0; j < 430; j++) {
    const x = -90 + j * 0.42, y = 0.3 + 0.15 * Math.pow(x / 90, 2);
    const m = new THREE.Matrix4().compose(new THREE.Vector3(x, y, CHAIN_Z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(j % 2 ? Math.PI / 2 : 0, 0, j % 2 ? 0 : Math.PI / 2)),
      new THREE.Vector3(1.62, 1, 1));
    parts.push([linkG, m]);
  }
  C.scene.add(merged(parts, iron));
}

// ---------- the ship (hull spec ported from the Remotion world.ts) ----------
function hullOutline(s) {
  const p = new THREE.Shape();
  p.moveTo(0, -5.0 * s);
  p.lineTo(1.05 * s, -5.0 * s);
  p.bezierCurveTo(1.55 * s, -4.2 * s, 1.6 * s, -2.5 * s, 1.6 * s, 2.0 * s);
  p.bezierCurveTo(1.6 * s, 3.8 * s, 1.15 * s, 5.0 * s, 0, 5.5 * s);
  p.bezierCurveTo(-1.15 * s, 5.0 * s, -1.6 * s, 3.8 * s, -1.6 * s, 2.0 * s);
  p.bezierCurveTo(-1.6 * s, -2.5 * s, -1.55 * s, -4.2 * s, -1.05 * s, -5.0 * s);
  p.closePath();
  return p;
}
function hullGeo() {
  const g = new THREE.ExtrudeGeometry(hullOutline(1), { depth: 1.36, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.08, bevelSegments: 2, curveSegments: 10, steps: 1 });
  g.rotateX(Math.PI / 2); // shape y -> world z (bow +5.5), extrusion -> -y
  g.computeBoundingBox();
  g.translate(0, -g.boundingBox.min.y, 0); // base at y = 0
  return g;
}
let HULL_GEO = null;
function mkShip(detailed) {
  const hullM = C.SR.toon('#8a5f3c', { rim: 0.4, kick: 0.1 });
  const deckM = C.SR.toon('#a08055', { rim: 0.3, kick: 0.1 });
  const plankM = C.SR.toon('#6e4f30', { rim: 0.2, kick: 0 });
  const rigM = C.SR.toon('#3a2c1e', { rim: 0.3, kick: 0 });
  const sailM = C.SR.toon('#f2e8d0', { rim: 0.2, kick: 0, side: THREE.DoubleSide });
  const flagM = C.SR.toon('#d8382e', { rim: 0.3, kick: 0, side: THREE.DoubleSide }); // brighter red: must read at aerial distance
  const castleWinM = C.SR.toon('#2a2018', { rim: 0.2, kick: 0 });
  const lanternM = C.SR.toon('#c9a24e', { rim: 0.5, kick: 0.2 });
  const woodM = C.SR.toon('#8a6a45', { rim: 0.3, kick: 0.1 });
  const g = new THREE.Group();
  const hull = inkHull(new THREE.Mesh(HULL_GEO, hullM), 0.01); // base at y = 0, top at y = 1.6
  const deckGeo = new THREE.ShapeGeometry(hullOutline(0.94), 10);
  deckGeo.rotateX(-Math.PI / 2); deckGeo.rotateY(Math.PI); // faces up, bow at +z
  const deck = new THREE.Mesh(deckGeo, deckM); deck.position.y = 1.62;
  g.add(hull, deck);
  for (const px of [-1.0, -0.5, 0, 0.5, 1.0]) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 9.4), plankM);
    plank.position.set(px, 1.66, 0); g.add(plank);
  }
  for (const s of [-1, 1]) {
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 7.0), woodM);
    board.position.set(s * 1.56, 1.78, 0); g.add(board);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 7.0), woodM);
    rail.position.set(s * 1.56, 1.99, 0); g.add(rail);
  }
  // raked stem post + gold finial
  g.add(strut(new THREE.Vector3(0, 0.1, 5.5), new THREE.Vector3(0, 1.2, 5.9), 0.09, woodM));
  g.add(strut(new THREE.Vector3(0, 1.2, 5.9), new THREE.Vector3(0, 2.1, 5.75), 0.09, woodM));
  const finial = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), lanternM);
  finial.position.set(0, 2.15, 5.75); g.add(finial);
  // stepped forecastle
  const fc1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.25, 1.8), deckM); fc1.position.set(0, 1.78, 4.5);
  const fc2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 1.4), deckM); fc2.position.set(0, 2.0, 4.5);
  g.add(fc1, fc2);
  // stern castle with 3 windows + lantern
  const castleShape = new THREE.Shape();
  castleShape.moveTo(-1.25, -5.3); castleShape.lineTo(1.25, -5.3); castleShape.lineTo(1.25, -3.4);
  castleShape.quadraticCurveTo(0, -3.0, -1.25, -3.4); castleShape.closePath();
  const castleGeo = new THREE.ExtrudeGeometry(castleShape, { depth: 1.4, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 1, curveSegments: 6, steps: 1 });
  castleGeo.rotateX(Math.PI / 2);
  castleGeo.computeBoundingBox();
  castleGeo.translate(0, -castleGeo.boundingBox.min.y, 0);
  const castle = inkHull(new THREE.Mesh(castleGeo, hullM), 0.01); castle.position.y = 1.6;
  g.add(castle);
  for (const wx of [-0.7, 0, 0.7]) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.55, 0.04), castleWinM);
    win.position.set(wx, 2.5, -5.38); g.add(win);
  }
  const lanPole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 5), woodM);
  lanPole.position.set(0, 3.3, -5.1); g.add(lanPole);
  const lan = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.3, 8), lanternM);
  lan.position.set(0, 3.55, -5.1); g.add(lan);
  // mast, yard, furled sail + lashings, red flag
  const mast = inkHull(new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 8, 8), woodM), 0.03); mast.position.set(0, 5.5, 0.5);
  const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 4.6, 8), woodM);
  yard.rotation.z = Math.PI / 2; yard.position.set(0, 8.7, 0.5);
  const furled = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.26, 3.4, 8), sailM);
  furled.rotation.z = Math.PI / 2; furled.position.set(0, 8.5, 0.5);
  g.add(mast, yard, furled);
  for (const bx of [-1.05, 1.05]) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.035, 6, 12), rigM);
    band.rotation.y = Math.PI / 2; band.position.set(bx, 8.5, 0.5); g.add(band);
  }
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.7), flagM); flag.position.set(0.55, 9.6, 0.5);
  g.add(flag);
  // rigging: forestay, backstay, two shrouds
  g.add(strut(new THREE.Vector3(0, 9.4, 0.5), new THREE.Vector3(0, 2.0, 5.4), 0.03, rigM));
  g.add(strut(new THREE.Vector3(0, 9.4, 0.5), new THREE.Vector3(0, 2.6, -5.1), 0.03, rigM));
  g.add(strut(new THREE.Vector3(0, 9.0, 0.5), new THREE.Vector3(1.5, 1.9, 0.5), 0.03, rigM));
  g.add(strut(new THREE.Vector3(0, 9.0, 0.5), new THREE.Vector3(-1.5, 1.9, 0.5), 0.03, rigM));
  if (detailed) { // lead ship: rail posts + steering oars so the close-ups have something to read
    for (const s of [-1, 1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 7.0), woodM);
      rail.position.set(s * 1.55, 1.95, 0); g.add(rail);
      const oar = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 4.5, 6), woodM);
      oar.rotation.set(0.5, 0, s * 0.5); oar.position.set(s * 1.9, 1.2, -5.2); g.add(oar);
    }
  }
  g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}
function buildShips() {
  HULL_GEO = hullGeo();
  leadShip = mkShip(true); C.scene.add(leadShip);
  // fleet: 70 in the Horn + 8 held back in the Bosporus, three instanced meshes sharing HULL_GEO
  const hullM = C.SR.toon('#8a5f3c', { rim: 0.4, kick: 0.1 });
  const woodM = C.SR.toon('#8a6a45', { rim: 0.3, kick: 0.1 });
  const fleetSailM = C.SR.toon('#f2e8d0', { rim: 0.2, kick: 0, side: THREE.DoubleSide });
  const mastG = new THREE.CylinderGeometry(0.12, 0.18, 8, 8); mastG.translate(0, 4, 0);
  const sailG = new THREE.CylinderGeometry(0.16, 0.26, 3.4, 8); sailG.rotateZ(Math.PI / 2); sailG.translate(0, 8.5, 0);
  const inst = (g, m) => {
    const im = new THREE.InstancedMesh(g, m, FLEET_N);
    im.castShadow = true; im.receiveShadow = true; im.frustumCulled = false; C.scene.add(im); return im;
  };
  fleetHull = inst(HULL_GEO, hullM); fleetMast = inst(mastG, woodM); fleetSail = inst(sailG, fleetSailM);
  const r2 = rng(1453);
  for (let i = 0; i < HORN_N; i++) fleet.push({ x: (r2() * 2 - 1) * 70, z: 70 + r2() * 34, yaw: (r2() - 0.5) * 0.9, ph: r2() * Math.PI * 2, horn: true });
  const BOS_SPOTS = [[-14, -92], [-7, -88], [0, -90], [7, -86], [14, -92], [-10, -80], [4, -80], [10, -84]];
  for (let i = 0; i < BOS_N; i++) { const [bx, bz] = BOS_SPOTS[i]; fleet.push({ x: bx, z: bz, yaw: (r2() - 0.5) * 0.3, ph: r2() * Math.PI * 2, horn: false }); }
}
function buildOxenTorches() {
  const oxM = C.SR.toon('#a08055', { rim: 0.5, kick: 0.1 }); // lightened: oxen read as dark boxes at night
  const hornM = C.SR.toon('#d8cbb0', { rim: 0.3, kick: 0 });
  const darkM = C.SR.toon('#4a3426', { rim: 0.3, kick: 0 });
  const mkOx = () => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.8, 1.7), oxM); body.position.y = 0.9;
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.6), oxM); head.position.set(0, 1.15, 1.05);
    const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.25), darkM); muzzle.position.set(0, 1.0, 1.4);
    g.add(body, head, muzzle);
    for (const s of [-1, 1]) {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.6, 6), hornM);
      horn.rotation.z = s * 0.9; horn.position.set(s * 0.32, 1.5, 1.05); g.add(horn);
      for (const dz of [-0.55, 0.55]) {
        const legM = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.7, 6), oxM);
        legM.position.set(s * 0.32, 0.35, dz); g.add(legM);
      }
    }
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 5), oxM);
    tail.rotation.x = 0.3; tail.position.set(0, 0.8, -0.95); g.add(tail);
    g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return g;
  };
  oxenG = new THREE.Group(); C.scene.add(oxenG);
  for (let i = 0; i < 2; i++) { const o = mkOx(); oxen.push(o); oxenG.add(o); }
  oxenG.visible = false;
  // torches along the road (night only): pole + crossed flame planes
  torchesG = new THREE.Group(); C.scene.add(torchesG);
  const poleM = C.SR.toon('#4a3426', { rim: 0.3, kick: 0 });
  const flameM = new THREE.MeshBasicMaterial({
    map: canvasTex(128, 128, g => {
      const gr = g.createRadialGradient(64, 78, 4, 64, 64, 60);
      gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,200,90,0.9)');
      gr.addColorStop(0.7, 'rgba(230,110,30,0.55)'); gr.addColorStop(1, 'rgba(200,60,10,0)');
      g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
    }), transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: false, toneMapped: false,
  });
  flameM.color.setRGB(3.0, 1.8, 0.7);
  for (let i = 0; i < 10; i++) {
    const z = -52 + i * 12, x = (i % 2 ? 1 : -1) * 3.2, y = hillY(z);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 2.4, 6), poleM);
    pole.position.set(x, y + 1.2, z); pole.castShadow = true; torchesG.add(pole);
    for (const ry of [0, Math.PI / 2]) {
      const fl = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.9), flameM);
      fl.position.set(x, y + 2.7, z); fl.rotation.y = ry; torchesG.add(fl);
    }
  }
  torchesG.visible = false;
  // warm torch light: the flame planes are emissive-looking but light nothing. Three
  // warm point lights at the torches nearest the action (z -28/-16/-4) so hull planks,
  // worker jackets and oxen separate from the dark background. Parented to torchesG,
  // so they are off whenever the torches are hidden (day shots).
  for (const [tx, tz] of [[-3.2, -28], [3.2, -16], [-3.2, -4]]) {
    const tl = new THREE.PointLight('#ff9a3c', 22, 18, 2);
    tl.position.set(tx, hillY(tz) + 2.7, tz); torchesG.add(tl);
  }
  // dust at the lead ship's keel (haul shots)
  dustG = new THREE.Group(); C.scene.add(dustG);
  const smokeT = canvasTex(256, 256, g => {
    for (const [x, y, r, c] of [[90, 150, 60, '#8f8d96'], [150, 120, 70, '#a3a1aa'], [170, 165, 55, '#8f8d96'], [120, 100, 50, '#b4b2ba']]) {
      g.fillStyle = c; g.beginPath(); g.ellipse(x, y, r, r * 0.85, 0, 0, 7); g.fill();
    }
  });
  for (let k = 0; k < 6; k++) {
    const mat = new THREE.MeshBasicMaterial({ map: smokeT, transparent: true, depthWrite: false, opacity: 0 });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
    dust.push({ m, mat, off: [((k % 3) - 1) * 1.4, 0.4 + (k % 2) * 0.3, -6 - Math.floor(k / 3) * 2], k: k / 6 });
    dustG.add(m);
  }
  dustG.visible = false;
  // the wardrobe-analogy chest on beams (shot 10): body 1.4x0.8x0.9, domed lid, iron bands
  chestG = new THREE.Group();
  const chestWood = C.SR.toon('#8a6a45', { rim: 0.4, kick: 0.1 });
  const chestWood2 = C.SR.toon('#7a5a38', { rim: 0.4, kick: 0.1 });
  const chestIron = C.SR.toon('#3d414c', { rim: 0.5, kick: 0.2 });
  const woodM2 = C.SR.toon('#8a6a45', { rim: 0.3, kick: 0.1 });
  const cbody = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.8, 0.9), chestWood); cbody.position.y = 0.52;
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.4, 12, 1, false, 0, Math.PI), chestWood2);
  lid.rotation.z = Math.PI / 2; lid.position.y = 0.92;
  chestG.add(cbody, lid);
  for (const s of [-1, 1]) {
    const band = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.85, 0.1), chestIron);
    band.position.set(s * 0.45, 0.52, 0); chestG.add(band);
    const beam = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 0.18), woodM2);
    beam.position.set(0, 0.06, s * 0.3); chestG.add(beam);
  }
  chestG.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  chestG.position.set(8, hillY(-47), -47);
  chestG.visible = false;
  C.scene.add(chestG);
  // haul ropes (two, one per rail line)
  ropeG = new THREE.Group(); C.scene.add(ropeG);
  const ropeM = C.SR.toon('#c7a46a', { rim: 0.3, kick: 0 });
  for (let i = 0; i < 2; i++) {
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1, 6), ropeM);
    r.castShadow = false; ropes.push(r); ropeG.add(r);
  }
  ropeG.visible = false;
}

// ---------- the cast (built fresh with SR.build; the engine has NO turban hat, so it is
// built from primitives on the head, same for the guards' steel caps) ----------
function turban(c, col = '#f4f1ea') {
  const r = 0.3, m = C.SR.toon(col, { rim: 0.3, kick: 0.1, flat2: true });
  const wrap = new THREE.Mesh(new THREE.TorusGeometry(r * 0.95, r * 0.34, 10, 24), m);
  wrap.rotation.x = Math.PI / 2; wrap.position.y = r * 0.55; wrap.castShadow = true;
  const cap = new THREE.Mesh(new THREE.SphereGeometry(r * 0.95, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), m);
  cap.scale.y = 0.75; cap.position.y = r * 0.45; cap.castShadow = true;
  for (const mesh of [wrap, cap]) inkHull(mesh, 0.05);
  c.head.add(wrap, cap);
}
function steelCap(c) {
  const r = 0.3, m = C.SR.toon('#8a8f96', { rim: 0.6, kick: 0.4, flat2: true });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(r * 1.08, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.52), m);
  dome.position.y = r * 0.28; dome.castShadow = true;
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.35, r * 1.35, r * 0.07, 24), m);
  brim.position.y = r * 0.3; brim.castShadow = true;
  for (const mesh of [dome, brim]) inkHull(mesh, 0.04);
  c.head.add(dome, brim);
}
function sword(c) {
  const g = new THREE.Group();
  const steel = C.SR.toon('#c8ccd4', { rim: 0.7, kick: 0.4, flat2: true });
  const gold = C.SR.toon('#c9a24e', { rim: 0.5, kick: 0.2, flat2: true });
  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.62, 0.015), steel); blade.position.y = -0.36;
  const guard = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, 0.03), gold); guard.position.y = -0.03;
  const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.1, 6), C.SR.toon('#3a2418', { rim: 0.3, flat2: true })); hilt.position.y = 0.03;
  g.add(blade, guard, hilt);
  g.position.set(0.34, 0.92, 0.06); g.rotation.z = -0.25; g.rotation.x = 0.1;
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  c.root.add(g);
}
const darken = (hex, k) => '#' + new THREE.Color(hex).multiplyScalar(k).getHexString();
function buildCast() {
  const reg = (c, i) => {
    c.root.scale.setScalar(0.8); c.root.rotation.order = 'YXZ'; c.phase = i * 0.37;
    c.root.visible = false; C.face(c, 'calm');
    c.tint = c.hm.material.uniforms.base.value.clone();
    SHIPCAST.push(c); return c;
  };
  // Sultan Mehmed II: red robe, white turban, gold sash, sword, moustache, stout, stern
  sultan = reg(C.SR.build({ ...C.base, jacket: '#b02e24', jacket2: '#8a1f18', style: 'tunic', details: ['sash', 'buttons', 'belt'], sashCol: '#e8c45a', btn: '#e8c45a', beltCol: '#3a2416', moust: true, bodyW: 1.06 }), 0);
  turban(sultan); sword(sultan);
  // Advisor: blue robe, turban, gold sash, neutral
  advisor = reg(C.SR.build({ ...C.base, jacket: '#3f6fb5', jacket2: '#2f558f', style: 'tunic', details: ['sash'], sashCol: '#e8c45a' }), 1);
  turban(advisor);
  // Workers: brown-orange jackets, red caps (up to 11 on screen in shot 7)
  const WJ = ['#c96a1e', '#b85a14', '#d07a2a', '#a85418', '#cf7a24', '#b45a10', '#c06a20', '#d27f2e', '#a85a1c', '#c4721f', '#bb6218'];
  WJ.forEach((j, i) => {
    workers.push(reg(C.SR.build({ ...C.base, jacket: j, jacket2: darken(j, 0.7), style: 'tunic', details: ['buttons'], btn: '#6a3208', hat: 'cap', hatCol: '#e43a2a' }), 2 + i));
  });
  // Byzantine guards: dark red jackets, steel caps, shock/nervous
  for (let i = 0; i < 5; i++) {
    const g = reg(C.SR.build({ ...C.base, jacket: '#7a1f1a', jacket2: '#5a1512', style: 'tunic', details: ['buttons', 'belt'], btn: '#d9c9a8', beltCol: '#2a1a12' }), 13 + i);
    steelCap(g); guards.push(g);
  }
}
// pose one puller on a rope line (rope A -> B, world points), phase-phased with the others
function puller(c, t, A, B, ph) {
  C.pull(c, t, A, B, ph); C.face(c, 'shout'); use(c);
}

// ---------- the 12 shots ----------
function buildShots() {
  const { shot, look, dof, place, idle, face, clamp, V, eio, lerp } = C;
  // every shot's camera also sets the camera-relative sun (v2 az/el) and the sun disc
  const cam = c => {
    look(V(...c.pos), V(...c.look), c.fov, c.roll || 0);
    const L = SHIP_LOOKS[curLook], sd = sunDirFor(sunOv ? sunOv.az : L.az, sunOv ? sunOv.el : L.el, c.pos, c.look);
    C.SUNDIR.copy(sd);
    fill.position.set(...c.pos); fill.target.position.set(...c.look); // on-axis fill follows the camera
    if (sunDisc.visible) {
      sunDisc.position.copy(C.camera.position).addScaledVector(sd, 1500);
      sunDisc.lookAt(C.camera.position);
    }
  };
  // DOF: the post chain maps aperture -> focusRange = 0.006/aperture, so a fixed aperture
  // blurs everything at the 15-60 m distances of this film. Scale it so the in-focus band
  // is ~15% of the focus distance (was 25%: backgrounds stayed too sharp vs v2's haze).
  const dofAt = (c, P, f = 0.15) => { const d = V(...c.pos).distanceTo(V(...P)); dof(d, 0.006 / (f * d)); };
  // 1 — HOOK 0-6.5 s, night: bow close-up, torches, slow push-in; 4 pullers + 2 oxen
  shot(0, t => {
    begin('shipsNight');
    const z = -20; poseLead(z); poseFleet(t, false, false);
    const ropeA = [V(-1.2, hillY(-14) + 1.0, -14), V(1.2, hillY(-14) + 1.0, -14)];
    const ropeB = [V(-1.2, hillY(-8) + 1.2, -8), V(1.2, hillY(-8) + 1.2, -8)];
    ropeG.visible = true; setRope(0, ropeA[0], ropeB[0]); setRope(1, ropeA[1], ropeB[1]);
    [[-1.7, -13], [1.8, -12], [-1.9, -16], [1.9, -15]].forEach(([x, zz], k) => {
      const c = workers[k], s = x < 0 ? 0 : 1;
      place(c, x, zz, 0, hillY(zz));
      puller(c, t, ropeA[s], ropeB[s], k * 0.07);
    });
    showOxen(z); torchesG.visible = true;
    const c1 = dolly([16, hillY(-20) + 6, -42], [0, hillY(-20) + 5, -16], pushK(t, 0, 0.0022), 42); // FIX f75: look +3 / cam +1 — tilts up so the hill crest sits ~58% down the frame (was ~46%: hill filled the bottom half)
    const c2 = dolly([13, hillY(-20) + 4.5, -36], [0, hillY(-20) + 3.8, -15], pushK(t, 3, 0.0025), 38, -0.03); // same tilt, milder (+2): c2 is closer, a full +3 would push the hull to the bottom edge late in the shot
    const cc = t < 3 ? c1 : c2;
    cam(cc); dofAt(cc, [0, hillY(-20) + 1.2, -15]); C.setShadowR(12); finish();
  }, { look: 'shipsNight' });
  // 2 — TITLE 6.5-9.5 s, golden: same ship wider, sun behind the hill. No workers. Title card overlay.
  shot(6.5, t => {
    begin('shipsGold');
    poseLead(-20); poseFleet(t, false, false);
    const cc = dolly([20, hillY(-20) + 8, -46], [0, hillY(-20) + 4.5, -16], pushK(t, 6.5, 0.0015), 44); // FIX f230: look +3 / cam +1 — same tilt-up as shot 1; hill crest ~54% down (was ~43%)
    cam(cc); C.setShadowR(40); finish(); // 40: denser shadow texels kill the acne; the crest + foreground sit within 40 m of the focus
  }, { look: 'shipsGold' });
  // 3 — SETTING 9.5-21 s, day: aerial wide -> chain CU -> Bosporus ships held back. No characters.
  shot(9.5, t => {
    begin('shipsDay');
    poseLead(-20); poseFleet(t, false, true);
    let cc;
    if (t < 15.5) cc = { pos: [46, 62, -108], look: [-22, 7, 28], fov: zoomFov(40, pushK(t, 9.5, 0.0016)), roll: 0 }; // FIX f300: look-target shifted left (-x, which is screen-right for this camera: the ship sat at ~87% width) — ship now near centre; vertical geometry unchanged
    else if (t < 18.6667) { cc = dolly([4, 11, 54], [0, 0.4, CHAIN_Z], pushK(t, 15.5, 0.0025), 30); dofAt(cc, [0, 0.6, CHAIN_Z]); } // above the hill (ground at z54 is y 8.2): chain + water + foam fill the frame, the near slope is real terrain now, not sky through a culled hillside
    else cc = dolly([-14, 4, -112], [2, 1.5, -89], pushK(t, 18.6667, 0.002), 44, 0.03);
    cam(cc); C.setShadowR(t < 15.5 ? 60 : 10); finish();
  }, { look: 'shipsDay' });
  // 4 — SULTAN 21-30.5 s, day: sultan + advisor at the road base, camera glides up toward the hill
  shot(21, t => {
    begin('shipsDay');
    poseLead(-20); poseFleet(t, false, false);
    place(sultan, 3, -52, -2.4, hillY(-52)); idle(sultan, t);
    C.pointAt(sultan, V(0, hillY(-20) + 3, -18), 'Right'); // pointing at the hill the whole shot (v2 f700)
    face(sultan, 'serious'); use(sultan);
    place(advisor, 5.5, -54, -2.2, hillY(-54)); idle(advisor, t); face(advisor, 'calm'); use(advisor);
    const a = dolly([-10, hillY(-52) + 3, -66], [4, hillY(-52) + 1.8, -53], pushK(t, 21, 0.0015), 40);
    const b = dolly([-3, hillY(-40) + 3.5, -52], [0, hillY(-20) + 2, -18], pushK(t, 25.3333, 0.0018), 42, -0.03);
    const u = clamp((t - 25.3333) / 1.3333);
    const cc = t < 25.3333 ? a : mixCam(a, b, glide(u));
    cam(cc); dofAt(cc, [3, hillY(-52) + 1.8, -52]); C.setShadowR(14); finish();
  }, { look: 'shipsDay' });
  // 5 — BUILD 30.5-35.5 s, night: greased rails CU -> ship pulled up the hill. 3 greasers + 4 pullers + 2 oxen.
  shot(30.5, t => {
    begin('shipsNight');
    const z = shipZ(t); poseLead(z); poseFleet(t, false, false);
    const ropeA = [V(-1.2, hillY(z + 5) + 1.0, z + 5), V(1.2, hillY(z + 5) + 1.0, z + 5)];
    const ropeB = [V(-1.2, hillY(z + 13) + 1.2, z + 13), V(1.2, hillY(z + 13) + 1.2, z + 13)];
    ropeG.visible = true; setRope(0, ropeA[0], ropeB[0]); setRope(1, ropeA[1], ropeB[1]);
    if (t < 33) {
      [[-2.0, -32], [1.8, -30], [-1.6, -28]].forEach(([x, zz], k) => {
        const c = workers[k], rx = x < 0 ? -1.2 : 1.2;
        place(c, x, zz, x < 0 ? Math.PI / 2 : -Math.PI / 2, hillY(zz));
        grease(c, t, rx, hillY(zz) + 0.3, zz); face(c, 'serious'); use(c);
      });
    } else {
      [-1.6, 1.7, -1.4, 1.5].forEach((x, k) => {
        const c = workers[k], s = x < 0 ? 0 : 1;
        place(c, x, z + 4 + k * 1.2, 0, hillY(z + 4 + k * 1.2));
        puller(c, t, ropeA[s], ropeB[s], k * 0.07);
      });
    }
    showOxen(z); torchesG.visible = true; showDust(t);
    let cc;
    if (t < 33) { cc = dolly([3.5, hillY(-30) + 2.4, -37], [0, hillY(-30) + 0.5, -29], pushK(t, 30.5, 0.0028), 36); dofAt(cc, [0, hillY(-30) + 0.4, -30]); }
    else cc = dolly([16, hillY(z) + 5, z - 12], [0, hillY(z) + 1.5, z], pushK(t, 33, 0.0018), 42);
    cam(cc); C.setShadowR(12); finish();
  }, { look: 'shipsNight' });
  // 6 — MAP 35.5-40.83 s, day: map card overlay; 3D base is the setting aerial, dimmed.
  shot(35.5, t => {
    begin('shipsDay');
    poseLead(-35); poseFleet(t, false, false);
    const cc = { pos: [70, 95, -160], look: [0, 4, 60], fov: 44, roll: 0 };
    cam(cc); C.setShadowR(60); finish();
  }, { look: 'shipsDay' });
  // 7 — HAUL 40.83-46 s, night: haulers wide -> ship creeping up the hill. 8 pullers + 3 pushers + 2 oxen.
  shot(40.8333, t => {
    begin('shipsNight');
    const z = shipZ(t); poseLead(z); poseFleet(t, false, false);
    const ropeA = [V(-1.2, hillY(z + 5) + 1.0, z + 5), V(1.2, hillY(z + 5) + 1.0, z + 5)];
    const ropeB = [V(-1.2, hillY(z + 14) + 1.2, z + 14), V(1.2, hillY(z + 14) + 1.2, z + 14)];
    ropeG.visible = true; setRope(0, ropeA[0], ropeB[0]); setRope(1, ropeA[1], ropeB[1]);
    for (let k = 0; k < 8; k++) {
      const x = [-1.7, 1.6, -1.5, 1.8, -1.6, 1.5, -1.7, 1.6][k], zz = z + 4 + k * 1.4, s = x < 0 ? 0 : 1;
      const c = workers[k];
      place(c, x, zz, 0, hillY(zz));
      puller(c, t, ropeA[s], ropeB[s], k * 0.07);
    }
    for (let k = 0; k < 3; k++) { // pushers behind the stern, driving it uphill
      const c = workers[8 + k], zz = z - 7 - k * 1.3, x = [-1.9, 1.9, -1.7][k];
      place(c, x, zz, 0, hillY(zz));
      C.SR.pose(c, 'shoulder_push', t, { target: V(0, hillY(z - 5) + 1.2, z - 5), period: 1.1, slope: 0.15 });
      face(c, 'shout'); use(c);
    }
    showOxen(z); torchesG.visible = true; showDust(t);
    let cc;
    if (t < 43.3333) cc = dolly([-9, hillY(-25) + 6, -42], [0, hillY(-18) + 1.5, -18], pushK(t, 40.8333, 0.002), 44);
    else cc = dolly([16, hillY(z) + 5, z - 12], [0, hillY(z) + 1.5, z], pushK(t, 43.3333, 0.0018), 42);
    cam(cc); C.setShadowR(16); finish();
  }, { look: 'shipsNight' });
  // 8 — SNAP 46-52 s, day: morning wide of the Horn with 70 ships -> guards on the wall -> chain intact
  shot(46, t => {
    begin('shipsDay');
    poseLead(-20); poseFleet(t, true, false, t >= 50.6667 ? 82 : 0);
    // FIX f1500: guards re-spaced to merlon-gap centres (8.25/11.25/14.25/17.25/20.25).
    // Merlons sit every 3 m (centres 6.75/12.75/15.75/18.75/21.75; 9.75 is the every-7th
    // skip) — the old middle guard at 12.5 stood dead behind the 12.75 merlon, and the
    // outer two (8, 17) were bisected by the frame edges at fov 40 / 22 m.
    const gspots = [[8.25, 'wide'], [11.25, 'wide'], [14.25, 'pale'], [17.25, 'wide'], [20.25, 'pale']];
    if (t >= 49) gspots.forEach(([x, mood], k) => {
      const c = guards[k];
      place(c, x, WALL_Z, Math.PI, D0 + 12); idle(c, t);
      if (k === 1) C.wave1(c, t);
      face(c, mood); use(c);
    });
    let cc;
    if (t < 49) cc = { pos: [42, 32, 28], look: [0, 2, 88], fov: zoomFov(46, pushK(t, 46, 0.0016)), roll: 0 };
    else if (t < 50.6667) { sunOv = { az: 140, el: 45 }; cc = dolly([13, 22.5, 80], [14.25, 18.5, WALL_Z], pushK(t, 49, 0.0022), 46); dofAt(cc, [14.25, 18, WALL_Z], 0.35); } // FIX f1500: 30 m / y 22.5 / fov 46 (was 22 m / 20.5 / 40) — half-width at the wall ~7.2 m fits all 5 guards (span 12 m) with margin; sun az 140 (was 75) front-lights the wall face — the day sun came from behind the wall, so the face got no direct sun and the towers' diagonal shadow bands (19-30 m wide each, overlapping) made the lower 2/3 muddy dark. el 62 alone only narrowed the bands (verified in still-50 round 1: bands persisted). az 140 puts the sun on the camera side: the face gets direct sun (tan, bricks readable top to bottom) and the tower shadows fall behind the wall, out of frame. Contained to this 1.67 s branch by begin()'s reset.
    else { cc = dolly([5, 11, 54], [0, -1, CHAIN_Z], pushK(t, 50.6667, 0.0025), 32); dofAt(cc, [0, 0.6, CHAIN_Z]); } // FIX 51.5: look y 0.5 -> -1 — camera pitches down ~3.5°, the top edge drops ~210 px and the intruding fleet hull (z ~85) clears the frame; chain moves up to ~mid-frame. Same above-the-hill chain reframe as shot 3 (old [5,2.8,50] was under the hillside)
    cam(cc); C.setShadowR(t < 49 ? 50 : 20); finish(); // snap CU shadowR 20 (was 12): the nearby towers sit just outside a ±12 m shadow frustum, so their diagonal shadows never landed on the wall
  }, { look: 'shipsDay' });
  // 9 — DEADPAN 52-61.67 s, day: chain CU -> ships behind the chain. 2 guards.
  shot(52, t => {
    begin('shipsDay');
    poseLead(-20); poseFleet(t, true, false, t < 56.6667 ? 82 : 0);
    [[-3, 'wide'], [3, 'pale']].forEach(([x, mood], k) => {
      const c = guards[k];
      place(c, x, WALL_Z, Math.PI, D0 + 12); idle(c, t); face(c, mood); use(c);
    });
    let cc;
    if (t < 56.6667) { cc = dolly([3.5, 11, 54], [0, -1.1, CHAIN_Z], pushK(t, 52, 0.0025), 30); dofAt(cc, [0, 0.6, CHAIN_Z]); } // FIX 54: look y 0.4 -> -1.1, same ~3.5° pitch-down as shot 8's chain CU — the top-edge hull corner clears the frame. Same above-the-hill chain reframe as shot 3
    else cc = dolly([0, 12, 48], [0, 1.5, 85], pushK(t, 56.6667, 0.002), 44); // old [0,6,48] was under the hillside (ground at z48 is y 10.3)
    cam(cc); C.setShadowR(14); finish();
  }, { look: 'shipsDay' });
  // 10 — EXPLANATION 61.67-75 s, day: greased beam CU -> workers pushing a chest on beams
  shot(61.6667, t => {
    begin('shipsDay');
    poseLead(-12); poseFleet(t, false, false);
    if (t < 69) {
      const c = workers[0];
      place(c, 1.6, -40, -Math.PI / 2, hillY(-40));
      grease(c, t, 1.2, hillY(-40) + 0.3, -40); face(c, 'serious'); use(c);
    } else {
      chestG.visible = true;
      for (let k = 0; k < 3; k++) {
        const c = workers[1 + k], x = 5.6 + k * 0.9, z = -47 + (k - 1) * 1.1;
        place(c, x, z, Math.PI / 2, hillY(z));
        C.SR.pose(c, 'shoulder_push', t, { target: V(7.3, hillY(-47) + 0.9, -47), period: 1.1 });
        face(c, 'shout'); use(c);
      }
    }
    let cc;
    if (t < 69) { cc = dolly([3.5, hillY(-40) + 2.2, -46], [1.2, hillY(-40) + 0.5, -40], pushK(t, 61.6667, 0.0028), 36); dofAt(cc, [1.2, hillY(-40) + 0.4, -40]); }
    else { cc = dolly([-3, hillY(-48) + 2.2, -56], [8, hillY(-48) + 1.2, -47], pushK(t, 69, 0.002), 40); dofAt(cc, [8, hillY(-48) + 1.2, -47]); }
    cam(cc); C.setShadowR(10); finish();
  }, { look: 'shipsDay' });
  // 11 — CONSEQUENCE 75-79.67 s, golden: wide city, calm. No characters, no cards.
  // Hill-side camera (reverted from a water-side try at [25,12,92]: that sat inside the
  // fleet staring at the x=25 tower — brick wall filling the frame). Higher + looking
  // down: the Horn water band + fleet sit mid-frame, city above, near slope below.
  shot(75, t => {
    begin('shipsGold');
    poseLead(-20); poseFleet(t, true, false);
    const cc = { pos: [38, 30, 0], look: [0, 8, 95], fov: zoomFov(44, pushK(t, 75, 0.0016)), roll: 0 }; // FIX f2300: lower (38->30) + closer (z -22->0), look raised (0->8): the near waterline lands ~70% down the frame (lower third), the hill band shrinks to ~30% (was ~45%), city + towers stay in frame, and the road crossing the foreground hill adds detail to the band
    cam(cc); C.setShadowR(40); finish();
  }, { look: 'shipsGold' });
  // 12 — POLL 79.67-86.4 s, golden: same wide, dimmed. Poll card overlay.
  shot(79.6667, t => {
    begin('shipsGold');
    poseLead(-20); poseFleet(t, true, false);
    const cc = { pos: [45, 26, -40], look: [0, 10, 105], fov: 44, roll: 0 };
    cam(cc); C.setShadowR(40); finish();
  }, { look: 'shipsGold' });
}

// ---------- 2D overlays on the out2 canvas (title / map / callouts / poll) ----------
// Coordinates are authored in 1080x1920 space and scaled by S = canvas.width / 1080.
const clamp01 = x => Math.min(1, Math.max(0, x));
function rr(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}
export function shipsOverlay2D(t, og) {
  const S = og.canvas.width / 1080, X = v => v * S, Y = v => v * S;
  // 2 — TITLE 6.5-9.5 s: "— SERI —" over "KAPAL / LEWAT DARAT", white Anton, pop-in
  if (t >= 6.5 && t < 9.5) {
    const k = backOut((t - 6.5) / 0.3) * clamp01((9.5 - t) / 0.2);
    og.save();
    og.translate(X(540), Y(950)); og.scale(k * S, k * S); og.rotate(-0.02);
    og.textAlign = 'center'; og.textBaseline = 'middle'; og.lineJoin = 'round';
    const line = (txt, y, font, lw) => {
      og.font = font; og.lineWidth = lw; og.strokeStyle = '#000';
      og.strokeText(txt, 0, y); og.fillStyle = '#ffffff'; og.fillText(txt, 0, y);
    };
    og.letterSpacing = '16px';
    line('— SERI —', -70, '52px InterB', 10);
    og.letterSpacing = '0px';
    line('KAPAL', 60, '150px Anton', 26);
    line('LEWAT DARAT', 210, '118px Anton', 22);
    og.restore();
  }
  // 6 — MAP 35.5-40.83 s: full-frame black card; Bosporus strip left, Golden Horn bay right,
  // wall line with 9 merlons, dashed white haul route with endpoint dots, "10 km" + sub.
  // Layout MEASURED from the v2 reference frame 1140 (1080x1920, blue-pixel bbox + text
  // rows, 2026-11-25): strip x116-259 y334-1750, bay x259-964 y784-952. The old coords
  // (strip y560-1690, bay y1050-1220) sat ~230-270 px too low — that is why the 3D map
  // looked shifted/smaller, and why BOSPORUS (old y1730) sat in the burned-caption zone
  // (caption top ~1750). BOSPORUS now sits at y1670, clear of the caption.
  // Serif type like the v2 card (the engine's Anton/InterB are sans; canvas 'serif' covers it).
  if (t >= 35.5 && t < 40.8333) {
    og.save(); og.globalAlpha = clamp01((t - 35.5) / 0.4);
    og.fillStyle = '#0d0d0f'; og.fillRect(0, 0, og.canvas.width, og.canvas.height);
    og.fillStyle = '#1e3054'; og.strokeStyle = '#e8e2d4'; og.lineWidth = 3 * S;
    og.beginPath(); og.rect(X(116), Y(334), X(143), Y(1416)); og.fill(); og.stroke();
    og.beginPath(); og.rect(X(259), Y(784), X(705), Y(168)); og.fill(); og.stroke();
    og.strokeStyle = '#e8e2d4'; og.lineWidth = 5 * S;
    og.beginPath(); og.moveTo(X(640), Y(952)); og.lineTo(X(985), Y(952)); og.stroke();
    og.fillStyle = '#e8e2d4';
    for (let i = 0; i < 9; i++) og.fillRect(X(650 + i * 38), Y(932), X(16), Y(20));
    og.strokeStyle = '#ffffff'; og.lineWidth = 7 * S; og.setLineDash([26 * S, 20 * S]);
    og.beginPath(); og.moveTo(X(190), Y(1470));
    og.bezierCurveTo(X(380), Y(1300), X(430), Y(1050), X(600), Y(870));
    og.stroke(); og.setLineDash([]);
    og.fillStyle = '#ffffff';
    for (const [dx, dy] of [[190, 1470], [600, 870]]) { og.beginPath(); og.arc(X(dx), Y(dy), 18 * S, 0, 7); og.fill(); }
    og.fillStyle = '#f2ede2'; og.textAlign = 'center'; og.textBaseline = 'middle';
    og.letterSpacing = `${5 * S}px`; // letterSpacing is in canvas px (not 1080 space): scale it, or labels overflow the frame
    og.font = `${40 * S}px Georgia, 'Times New Roman', serif`;
    og.fillText('TANDUK EMAS', X(700), Y(730));
    og.fillText('KONSTANTINOPEL', X(790), Y(1175));
    og.fillText('BOSPORUS', X(190), Y(1670));
    og.letterSpacing = '0px';
    og.font = `${150 * S}px Georgia, 'Times New Roman', serif`; og.fillStyle = '#ffffff';
    og.fillText('10 km', X(520), Y(1255));
    og.font = `${45 * S}px Georgia, 'Times New Roman', serif`; og.fillStyle = '#d8d8d8';
    og.fillText('jalan daratnya', X(520), Y(1360));
    og.restore();
  }
  // callout pills, top-centre
  const pill = (txt, y, col = '#ffffff') => {
    og.save();
    og.font = `${62 * S}px Anton`; og.textAlign = 'center'; og.textBaseline = 'middle';
    const w = og.measureText(txt).width + 90 * S;
    rr(og, X(540) - w / 2, Y(y) - 48 * S, w, 96 * S, 48 * S);
    og.fillStyle = 'rgba(8,8,12,0.62)'; og.fill();
    og.strokeStyle = 'rgba(255,255,255,0.25)'; og.lineWidth = 2 * S; og.stroke();
    og.fillStyle = col; og.fillText(txt, X(540), Y(y) + 2 * S);
    og.restore();
  };
  if (t >= 40.8333 && t < 46) pill('1 malam', 170); // 7 — HAUL
  if (t >= 46 && t < 49) pill('70 kapal', 170, '#f2c94c'); // 8 — SNAP, first 3 s only
  // 12 — POLL 79.67-86.4 s: dark overlay, "Kamu jaga apa?", A: Rantai (gold) / B: Bukit (outline).
  // Serif type, measured from v2 frames 2400/2500/2550 (question y~1050, buttons y~1250-1400).
  // No @alfatihmotion handle anywhere.
  if (t >= 79.6667) {
    og.save(); og.globalAlpha = clamp01((t - 79.6667) / 0.5);
    og.fillStyle = 'rgba(10,10,16,0.72)'; og.fillRect(0, 0, og.canvas.width, og.canvas.height);
    og.textAlign = 'center'; og.textBaseline = 'middle'; og.lineJoin = 'round';
    og.font = `${110 * S}px Georgia, 'Times New Roman', serif`; og.lineWidth = 10 * S; og.strokeStyle = 'rgba(0,0,0,0.6)';
    og.strokeText('Kamu jaga apa?', X(540), Y(1050));
    og.fillStyle = '#ffffff'; og.fillText('Kamu jaga apa?', X(540), Y(1050));
    og.font = `${58 * S}px Georgia, 'Times New Roman', serif`;
    rr(og, X(175), Y(1250), X(330), Y(150), 26 * S);
    og.fillStyle = '#e8c45a'; og.fill();
    og.fillStyle = '#1a1a1a'; og.fillText('A: Rantai', X(340), Y(1325));
    rr(og, X(575), Y(1250), X(330), Y(150), 26 * S);
    og.fillStyle = 'rgba(20,20,28,0.55)'; og.fill();
    og.strokeStyle = '#ffffff'; og.lineWidth = 4 * S; og.stroke();
    og.fillStyle = '#ffffff'; og.fillText('B: Bukit', X(740), Y(1325));
    og.restore();
  }
}

// ---------- wiring (called from main.js, AFTER the chase block, before SHOTS.sort) ----------
export function buildShipsFilm(ctx) {
  C = ctx;
  Object.assign(C.LOOKS, SHIP_LOOKS);
  // hide the rail world (dunes, line, camp, train, props) — keep only the lights
  const keep = new Set([ctx.hemi, ctx.sun, ctx.sun.target]);
  ctx.scene.children.forEach(o => { if (!keep.has(o)) o.visible = false; });
  buildSky(); buildGround(); buildWater(); buildCity(); buildRoadAndChain();
  buildShips(); buildOxenTorches(); buildCast(); buildShots();
}
