// The whole place as one three.js scene: sky, the Bosporus and the Golden Horn, the hill ridge with the
// greased haul road, Constantinople's walls + towers + city skyline, the great chain across the Horn mouth,
// the Ottoman fleet (lead ship on the road, 70 ships in the Horn, 8 held back in the Bosporus), oxen,
// torches, dust and the cast. update(id, f, camera) poses everything for shot `id` at frame f (pure function
// of id + f). Everything is procedural; the Kenney GLBs are missing (404), so no external assets are used.
import * as THREE from "three";
import { Batch, Strand, boxGeo, V, lam, house, Kit } from "./build";
import { beam, rep, ctex, stoneHD, grassHD, chainHD, waterNear, waterFar, cloudHD, foamTex } from "./paint";
import { Pen } from "./toon";
import { LIGHTS, LOOK, LightPreset } from "./lights";
import { TONE, CHAR, LFB, untone } from "./shade";
import { NOINK } from "./ink";
import { Pool, Actor, Fx, stage } from "./cast";
import { FPS, D0, SHOTS, camAt, shipsState, hillY, CHAIN_Z, WALL_Z, ShipsState, V3, ShotDef } from "./story";

// ---------------- assets ----------------
/** no external kit: the Kenney GLBs are missing (404), everything here is procedural */
export const loadKit = async (): Promise<Kit> => ({});
/** ground height: the hill ridge (hillY) between the waters, beach slopes into both, the Horn's far shore
 *  rising again at z = 100..110 where the walls stand */
const groundY = (z: number) => {
  const az = Math.abs(z);
  if (az <= 60) return hillY(z);
  if (az <= 70) return D0 + (-0.6 - D0) * ((az - 60) / 10);
  if (z > 100 && z < 110) return -0.6 + (D0 + 0.6) * ((z - 100) / 10);
  if (z >= 110) return D0;
  return -0.6;
};
/** heightfield ground, x -600..600, z -200..200: fine enough that the hill reads smooth */
const groundGeo = () => {
  const xs: number[] = [], zs: number[] = [];
  for (let x = -600; x <= 600; x += 10) xs.push(x);
  for (let z = -200; z <= 200; z += 5) zs.push(z);
  const nx = xs.length, nz = zs.length, pos = new Float32Array(nx * nz * 3), uv = new Float32Array(nx * nz * 2), idx: number[] = [];
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    const o = (j * nx + i) * 3, u = (j * nx + i) * 2;
    pos[o] = xs[i]; pos[o + 1] = groundY(zs[j]); pos[o + 2] = zs[j];
    uv[u] = xs[i] / 8; uv[u + 1] = zs[j] / 8;
    if (i < nx - 1 && j < nz - 1) { const a = j * nx + i, b = a + 1, c = a + nx, d = c + 1; idx.push(a, c, d, a, d, b); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
};

/** sun disc (solid, soft rim) and the flat golden halo (lighting.md 6 / depth.md 6.4: r50 13-26 % of the frame width) */
const discTex = () => ctex("sunDisc", 128, 128, (g) => {
  const gr = g.createRadialGradient(64, 64, 58, 64, 64, 64); gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
});
const haloTex = () => ctex("sunHalo", 256, 256, (g) => {
  const im = g.createImageData(256, 256);
  for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) {
    const u = Math.hypot(x - 127.5, y - 127.5) / 128;
    const a = (0.55 * Math.exp(-((u / 0.25) ** 2)) + 0.35 * Math.exp(-((u / 0.6) ** 2))) * (1 - Math.min(1, Math.max(0, (u - 0.8) / 0.2)));
    const i = (y * 256 + x) * 4; im.data[i] = im.data[i + 1] = im.data[i + 2] = 255; im.data[i + 3] = Math.round(255 * Math.min(1, a));
  }
  g.putImageData(im, 0, 0);
});
/** per-shot sun override (lighting.md 9.1 notes: front-light the town wide) */
const SUN_SHOT: Record<number, { az?: number; el?: number }> = { 3: { az: 120 } };
const smokeTex = () => ctex("smoke", 256, 256, (g) => {
  const p = new Pen(g);
  for (const [x, y, r, c] of [[90, 150, 60, "#8f8d96"], [150, 120, 70, "#a3a1aa"], [170, 165, 55, "#8f8d96"], [120, 100, 50, "#b4b2ba"]] as const) p.ell(x, y, r, r * 0.85, c, 0);
});
const flameTex = () => ctex("flame", 128, 128, (g) => {
  const gr = g.createRadialGradient(64, 78, 4, 64, 64, 60);
  gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.35, "rgba(255,200,90,0.9)"); gr.addColorStop(0.7, "rgba(230,110,30,0.55)"); gr.addColorStop(1, "rgba(200,60,10,0)");
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
});

type Mats = Record<string, THREE.Material>;
// deterministic rng for the fleet anchors and the city layout
const rng = (seed: number) => { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

const HORN_N = 70, BOS_N = 8, FLEET_N = HORN_N + BOS_N;

export class World {
  root = new THREE.Group();
  private pool = new Pool();
  private actors: Actor[] = [];
  private fxs: Fx[] = [];
  private hemi: THREE.HemisphereLight; private sun: THREE.DirectionalLight; private fill: THREE.DirectionalLight;
  private sky: THREE.Mesh; private skyMat: THREE.ShaderMaterial;
  private fog = new THREE.Fog("#bccbec", 25, 420);
  private WU: Record<string, THREE.IUniform>;
  private sunDisc: THREE.Sprite; private sunHalo: THREE.Sprite;
  private sunCache = new Map<number, THREE.Vector3>();
  private cloudMaps: Record<"day" | "golden" | "night", THREE.Texture[]>;
  private clouds: THREE.Mesh[] = [];
  private leadShip: THREE.Group;
  private fleetHull: THREE.InstancedMesh; private fleetMast: THREE.InstancedMesh; private fleetSail: THREE.InstancedMesh;
  private fleet: { x: number; z: number; yaw: number; ph: number; horn: boolean }[] = [];
  private oxen: THREE.Group[] = [];
  private flames: THREE.Mesh[] = []; private torchPoles: THREE.Group;
  private dust: { m: THREE.Mesh; mat: THREE.MeshBasicMaterial; off: V3; k: number }[] = [];
  private chest: THREE.Group;
  private chain: Strand;
  private frustum = new THREE.Frustum();
  private m4 = new THREE.Matrix4(); private v = new THREE.Vector3(); private sph = new THREE.Sphere();

  constructor(kit: Kit) {
    void kit; // the Kenney kit is missing (404); everything here is procedural
    const R = this.root, M: Mats = {};
    // ---- sky + light ----
    // sky: 5 colour stops by elevation (textures.md 5.2 #5 + depth.md 2/6.5), written as tone-map-inverted linear values
    this.skyMat = new THREE.ShaderMaterial({
      uniforms: { c0: { value: new THREE.Color() }, c1: { value: new THREE.Color() }, c2: { value: new THREE.Color() },
        c3: { value: new THREE.Color() }, c4: { value: new THREE.Color() }, e: { value: new THREE.Vector4() } },
      vertexShader: "varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform vec3 c0, c1, c2, c3, c4; uniform vec4 e; varying vec3 vP;
        void main(){ float el = asin(clamp(normalize(vP).y, -1.0, 1.0));
          vec3 c = mix(c0, c1, smoothstep(0.0, e.x, el));
          c = mix(c, c2, smoothstep(e.x, e.y, el));
          c = mix(c, c3, smoothstep(e.y, e.z, el));
          c = mix(c, c4, smoothstep(e.z, e.w, el));
          gl_FragColor = vec4(c, 1.0); }`,
      side: THREE.BackSide, depthWrite: false, fog: false,
    });
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(1100, 48, 24), this.skyMat);
    this.sky.renderOrder = -1; this.sky.frustumCulled = false; this.sky.layers.set(NOINK);
    R.add(this.sky);
    this.sunDisc = new THREE.Sprite(new THREE.SpriteMaterial({ map: discTex(), color: new THREE.Color(6.0, 4.4, 2.4), fog: false, depthWrite: false }));
    this.sunHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex(), color: new THREE.Color(1, 1, 1), fog: false, depthWrite: false, depthTest: true,
      transparent: true, blending: THREE.AdditiveBlending }));
    this.sunDisc.renderOrder = -0.5; this.sunHalo.renderOrder = 5;
    for (const m of [this.sunDisc, this.sunHalo]) { m.frustumCulled = false; m.layers.set(NOINK); R.add(m); }
    this.hemi = new THREE.HemisphereLight("#cfe6ff", "#6c5c8c", 1.1);
    this.sun = new THREE.DirectionalLight("#fff0d6", 2.6);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(4096, 4096);
    this.fill = new THREE.DirectionalLight("#9fb8ff", 0.35);
    R.add(this.hemi, this.sun, this.sun.target, this.fill, this.fill.target);
    this.cloudMaps = {
      day: [0, 1, 2, 3].map((k) => cloudHD(k, LOOK.day.cloud)),
      golden: [0, 1, 2, 3].map((k) => cloudHD(k, LOOK.golden.cloud)),
      night: [0, 1, 2, 3].map((k) => cloudHD(k, LOOK.night.cloud)),
    };
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2 + 0.3, d = 620 + (i % 3) * 60;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: this.cloudMaps.day[i % 4], color: new THREE.Color(1.1, 1.1, 1.1), transparent: true, depthWrite: false, fog: false }));
      const w = 130 + (i % 4) * 30;
      m.position.set(Math.cos(a) * d, 120 + (i % 4) * 38, Math.sin(a) * d); m.scale.set(w, w / 2, 1);
      m.layers.set(NOINK);
      this.clouds.push(m); R.add(m);
    }

    // ---- ground, walls, city (static batch) ----
    const b = new Batch();
    M.grass = lam("grassHD", () => ({ map: grassHD() }));
    M.wall = lam("wallHD", () => ({ map: stoneHD("wallHD", ["#c9bcaa", "#bfb19f", "#d1c5b4", "#b8aa97"], "#958776") }));
    M.cope = lam("copeHD", () => ({ map: stoneHD("copeHD", ["#e6dccd", "#ddd3c3", "#ece4d6", "#d6cbba"], "#aea293") }));
    M.tower = lam("towerHD", () => ({ map: stoneHD("towerHD") }));
    M.wood = lam("wood", () => ({ map: beam() }));
    M.sand = lam("sand", () => ({ color: "#e2c992" }));
    M.dirt = lam("dirtRoad", () => ({ color: "#a08055" }));
    M.dome = lam("dome", () => ({ color: "#8a8f96" }));
    b.add(groundGeo(), M.grass);
    // the haul road: a dirt strip along x = 0 following the hill, y just above the ground
    // (+0.08: the heightfield sags ~0.03 m between its 5 m samples, so +0.03 z-fought with the grass)
    for (let z = -58; z < 58; z += 2) {
      const y0 = hillY(z) + 0.08, y1 = hillY(z + 2) + 0.08;
      const g = new THREE.BufferGeometry();
      // winding: up-facing (the first attempt wound down and backface culling hid the whole road)
      g.setAttribute("position", new THREE.Float32BufferAttribute([-2.5, y0, z, 2.5, y1, z + 2, 2.5, y0, z, -2.5, y0, z, -2.5, y1, z + 2, 2.5, y1, z + 2], 3));
      g.setAttribute("normal", new THREE.Float32BufferAttribute(Array(6).fill([0, 1, 0]).flat(), 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1], 2));
      b.add(g, M.dirt);
    }
    // hill terraces: darker contour strips following the slope so the hill reads as shaped
    // ground, not a flat green plane (split at the road, x -3.5..3.5, so they never cross it)
    const terrM = lam("terrace", () => ({ color: "#4d8f36" }));
    const ribbon = (x0: number, x1: number, z0: number, z1: number, yOff: number) => {
      for (let z = z0; z < z1; z += 2) {
        const y0 = hillY(z) + yOff, y1 = hillY(z + 2) + yOff;
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute([x0, y0, z, x1, y1, z + 2, x1, y0, z, x0, y0, z, x0, y1, z + 2, x1, y1, z + 2], 3));
        g.setAttribute("normal", new THREE.Float32BufferAttribute(Array(6).fill([0, 1, 0]).flat(), 3));
        g.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1], 2));
        b.add(g, terrM);
      }
    };
    for (const zc of [-45, -25, 15, 35]) {
      ribbon(-600, -3.5, zc - 1, zc + 1, 0.12);
      ribbon(3.5, 600, zc - 1, zc + 1, 0.12);
    }
    // bushes + rocks scattered on the slopes (off the road |x| < 8, off the chest at (8, -47),
    // off the lead ship's path down x = 0); low, so no camera is ever blocked
    const bushM = lam("bushDark", () => ({ color: "#3f7d33" }));
    const rockM = lam("rock", () => ({ color: "#8a8d90" }));
    const r3 = rng(2026);
    const bushGeo = new THREE.SphereGeometry(1, 10, 8);
    const rockGeo = new THREE.DodecahedronGeometry(1, 0);
    const m4b = new THREE.Matrix4(), q0 = new THREE.Quaternion();
    for (let i = 0; i < 46; i++) {
      const x = (r3() < 0.5 ? -1 : 1) * (8 + r3() * 210);
      const z = (r3() < 0.5 ? -1 : 1) * (10 + r3() * 45);
      if (Math.abs(x - 8) < 3 && Math.abs(z + 47) < 3) continue;
      const rr = 0.7 + r3() * 0.8;
      m4b.compose(V(x, hillY(z) + 0.05, z), q0, V(rr, rr * 0.65, rr));
      b.add(bushGeo, bushM, m4b);
    }
    for (let i = 0; i < 22; i++) {
      const x = (r3() < 0.5 ? -1 : 1) * (8 + r3() * 210);
      const z = (r3() < 0.5 ? -1 : 1) * (10 + r3() * 45);
      const rr = 0.4 + r3() * 0.5;
      m4b.compose(V(x, hillY(z) + 0.05, z), q0, V(rr, rr * 0.6, rr));
      b.add(rockGeo, rockM, m4b);
    }
    // Constantinople walls on the far shore: curtain wall + crenellations (one merlon in seven
    // missing, so the parapet is not a perfect comb) + towers of varied height and cap shape
    b.add(boxGeo(V(-150, D0, WALL_Z - 2), V(150, D0 + 12, WALL_Z + 2), 2), M.wall);
    let mi = 0;
    for (let x = -147; x <= 147; x += 3) { if (mi++ % 7 === 3) continue; b.add(boxGeo(V(x, D0 + 12, WALL_Z - 2), V(x + 1.5, D0 + 13, WALL_Z + 2), 2), M.cope); }
    const TOWER_H = [18, 22, 18, 26, 18, 22, 18, 30, 18, 22, 18, 26, 18];
    for (let i = 0; i < TOWER_H.length; i++) {
      const x = -150 + i * 25, h = TOWER_H[i];
      const cyl = new THREE.CylinderGeometry(3.5, 4, h, 12);
      b.add(cyl, M.tower, new THREE.Matrix4().makeTranslation(x, D0 + h / 2, WALL_Z));
      if (h >= 26) { // the tall towers wear dome caps, the rest cone caps
        const dome = new THREE.SphereGeometry(4.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2);
        b.add(dome, M.dome, new THREE.Matrix4().makeTranslation(x, D0 + h, WALL_Z));
      } else {
        const cap = new THREE.ConeGeometry(4.2, 3, 8);
        b.add(cap, M.tower, new THREE.Matrix4().makeTranslation(x, D0 + h + 1.5, WALL_Z));
      }
    }
    // chain anchor blocks at the Horn mouth
    for (const s of [-1, 1]) b.add(boxGeo(V(s * 90 - 2, -0.5, CHAIN_Z - 2), V(s * 90 + 2, D0 + 1, CHAIN_Z + 2), 2), M.wall);
    // the city behind the walls: house rows, domes, minarets (the city sits behind the walls, so no camera
    // can be blocked by it; house() sight-line culling stays off because buildTown is never called)
    const r = rng(1453);
    for (const zr of [120, 138, 156, 174]) for (let x = -120; x <= 120; x += 13) {
      const w = 7 + Math.floor(r() * 3), h = zr === 174 ? 8 + r() * 5 : 5 + r() * 7;
      house(b, x + (r() - 0.5) * 5, zr + (r() - 0.5) * 4, Math.PI, w, 8, h, Math.floor(r() * 8));
    }
    // domes: one dominant central dome (Hagia Sophia-ish, ~1.5x the biggest of the rest) so the
    // skyline has a landmark, plus the smaller ones
    for (const [x, z, rr, hh] of [[-5, 140, 13, 14], [-40, 128, 7, 9], [25, 145, 9, 11], [70, 125, 6, 8]] as const) {
      const drum = new THREE.CylinderGeometry(rr * 0.8, rr * 0.8, hh, 16);
      b.add(drum, M.wall, new THREE.Matrix4().makeTranslation(x, D0 + hh / 2, z));
      const dome = new THREE.SphereGeometry(rr, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2);
      b.add(dome, M.dome, new THREE.Matrix4().makeTranslation(x, D0 + hh, z));
    }
    for (const [x, z, mh] of [[-70, 135, 22], [55, 140, 22], [-22, 148, 27], [12, 148, 27]] as const) {
      const min = new THREE.CylinderGeometry(0.7, 0.9, mh, 10);
      b.add(min, M.wall, new THREE.Matrix4().makeTranslation(x, D0 + mh / 2, z));
      const cap = new THREE.ConeGeometry(1.1, 3.5, 8);
      b.add(cap, M.dome, new THREE.Matrix4().makeTranslation(x, D0 + mh + 1.75, z));
    }
    b.build(R);

    // water: one plane at y = 0; the hill and the far shore rise out of it, the beds sink under it
    const wNear = waterNear(), wFar = waterFar();
    for (const t of [wNear, wFar]) { t.colorSpace = THREE.NoColorSpace; t.anisotropy = 16; t.needsUpdate = true; }
    this.WU = {
      wNearC: { value: new THREE.Color() }, wMidC: { value: new THREE.Color() }, wFarC: { value: new THREE.Color() },
      wCrest: { value: new THREE.Color() }, wTrough: { value: new THREE.Color() }, wGlint: { value: new THREE.Color() },
      wShade: { value: new THREE.Vector3(0.5, 0.56, 0.72) }, wNearTex: { value: wNear }, wFarTex: { value: wFar }, wTime: { value: 0 },
    };
    const waterM = new THREE.MeshLambertMaterial({ color: 0xffffff });
    waterM.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, this.WU);
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vWP;")
        .replace("#include <project_vertex>", "#include <project_vertex>\nvWP = (modelMatrix * vec4(transformed, 1.0)).xyz;");
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", WATER_DECL)
        .replace("#include <map_fragment>", WATER_COL)
        .replace("#include <lights_fragment_begin>", "float sunVis = 1.0;\n" + LFB)
        .replace("#include <lights_fragment_end>", "#include <lights_fragment_end>\n  reflectedLight.directDiffuse = diffuseColor.rgb * mix(wShade, vec3(1.0), sunVis);\n  reflectedLight.indirectDiffuse = vec3(0.0);");
    };
    waterM.customProgramCacheKey = () => "river1";
    const wm = new THREE.Mesh(quadUp(-900, 900, -900, 900, 1, 1, -D0), waterM);
    wm.receiveShadow = true;
    R.add(wm);
    // foam lines where the water meets the beaches (shorelines: groundY crosses 0 at |z| ~ 69 on
    // both sides and at z ~ 101 on the Horn's far shore); streaky alpha so the edge reads as surf
    {
      const foamT = foamTex(); foamT.wrapS = THREE.RepeatWrapping; foamT.repeat.set(14, 1);
      const foamM = new THREE.MeshBasicMaterial({ map: foamT, transparent: true, opacity: 0.8, depthWrite: false });
      for (const fz of [69.2, -69.2, 101.2]) {
        const fm = new THREE.Mesh(new THREE.PlaneGeometry(800, 3.5), foamM);
        fm.rotation.x = -Math.PI / 2; fm.position.set(0, 0.08, fz);
        R.add(fm);
      }
    }

    // ---- haul road: greased rails + sleepers ----
    const railPts = (x: number) => Array.from({ length: 59 }, (_, j) => { const z = -58 + j * 2; return V(x, hillY(z) + 0.15, z); });
    for (const x of [-1.2, 1.2]) { const s = new Strand(59, 0.14, 0.3, M.wood, 3); s.set(railPts(x)); R.add(s.mesh); }
    const sleeper = new THREE.InstancedMesh(new THREE.BoxGeometry(3.0, 0.12, 0.28), M.wood, 58);
    {
      const m4 = new THREE.Matrix4(), q0 = new THREE.Quaternion(), one = V(1, 1, 1);
      for (let j = 0; j < 58; j++) { const z = -57 + j * 2; sleeper.setMatrixAt(j, m4.compose(V(0, hillY(z) + 0.06, z), q0, one)); }
    }
    sleeper.instanceMatrix.needsUpdate = true; sleeper.castShadow = true; sleeper.receiveShadow = true;
    R.add(sleeper);

    // ---- the great chain across the Horn mouth (link mode: real interlocking links) ----
    const chainM = lam("chainHD", () => ({ map: rep(chainHD(), 1, 1), side: THREE.DoubleSide })) as THREE.MeshLambertMaterial;
    chainM.color.set("#8c847c"); // dark iron: darker, warm-greyed multiplier on the painted links
    this.chain = new Strand(37, 0.2, 0.5, chainM, 2);
    this.chain.set(Array.from({ length: 37 }, (_, j) => { const x = -90 + j * 5; return V(x, 0.3 + 0.15 * (x / 90) ** 2, CHAIN_Z); }));
    R.add(this.chain.mesh);

    // ---- ships ----
    // hull plan-view outline (x = half-beam, y = length, bow at +y): pointed curved bow, full
    // midship, tapered transom stern. Scaled copies give the deck (0.94).
    const hullOutline = (s: number) => {
      const p = new THREE.Shape();
      p.moveTo(0, -5.0 * s);
      p.lineTo(1.05 * s, -5.0 * s);
      p.bezierCurveTo(1.55 * s, -4.2 * s, 1.6 * s, -2.5 * s, 1.6 * s, 2.0 * s);
      p.bezierCurveTo(1.6 * s, 3.8 * s, 1.15 * s, 5.0 * s, 0, 5.5 * s);
      p.bezierCurveTo(-1.15 * s, 5.0 * s, -1.6 * s, 3.8 * s, -1.6 * s, 2.0 * s);
      p.bezierCurveTo(-1.6 * s, -2.5 * s, -1.55 * s, -4.2 * s, -1.05 * s, -5.0 * s);
      p.closePath();
      return p;
    };
    /** extruded hull: outline in plan view, depth = hull height, bow stays at +z, base at y = 0 */
    const hullGeo = () => {
      const g = new THREE.ExtrudeGeometry(hullOutline(1), { depth: 1.36, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.08, bevelSegments: 2, curveSegments: 10, steps: 1 });
      g.rotateX(Math.PI / 2); // shape y -> world z (bow +5.5), extrusion -> -y
      g.computeBoundingBox();
      g.translate(0, -g.boundingBox!.min.y, 0); // base at y = 0
      return g;
    };
    const HULL_GEO = hullGeo();
    /** thin cylinder between two points (rigging) */
    const strut = (a: THREE.Vector3, b: THREE.Vector3, r: number, mat: THREE.Material) => {
      const d = new THREE.Vector3().subVectors(b, a), len = d.length();
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 5), mat);
      m.position.copy(a).addScaledVector(d, 0.5);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
      return m;
    };
    const hullM = lam("shipHull", () => ({ color: "#8a5f3c" })); // lightened: shaded sides read brown, not blue-black
    const deckM = lam("shipDeck", () => ({ color: "#a08055" }));
    const plankM = lam("deckPlank", () => ({ color: "#6e4f30" }));
    const rigM = lam("rigging", () => ({ color: "#3a2c1e" }));
    const sailM = lam("shipSail", () => ({ color: "#e8dcc0", side: THREE.DoubleSide })); // cream, matches the fleet bundles
    const flagM = lam("shipFlag", () => ({ color: "#c0353a", side: THREE.DoubleSide }));
    const castleWinM = lam("castleWin", () => ({ color: "#2a2018" }));
    const lanternM = lam("lanternGold", () => ({ color: "#c9a24e" }));
    const mkShip = (detailed: boolean) => {
      const g = new THREE.Group();
      const hull = new THREE.Mesh(HULL_GEO, hullM); // base at y = 0, top at y = 1.6
      // deck: same outline, inset, flat on the hull top
      const deckGeo = new THREE.ShapeGeometry(hullOutline(0.94), 10);
      deckGeo.rotateX(-Math.PI / 2); deckGeo.rotateY(Math.PI); // faces up, bow at +z
      const deck = new THREE.Mesh(deckGeo, deckM); deck.position.y = 1.62;
      g.add(hull, deck);
      // plank striping along the deck
      for (const px of [-1.0, -0.5, 0, 0.5, 1.0]) {
        const plank = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 9.4), plankM);
        plank.position.set(px, 1.66, 0); g.add(plank);
      }
      // bulwark: side boards + top rails along the deck edges (kept inside the midship beam)
      for (const s of [-1, 1]) {
        const board = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 7.0), M.wood);
        board.position.set(s * 1.56, 1.78, 0); g.add(board);
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 7.0), M.wood);
        rail.position.set(s * 1.56, 1.99, 0); g.add(rail);
      }
      // raked stem post: two segments curving forward from the keel to above the bow
      g.add(strut(V(0, 0.1, 5.5), V(0, 1.2, 5.9), 0.09, M.wood));
      g.add(strut(V(0, 1.2, 5.9), V(0, 2.1, 5.75), 0.09, M.wood));
      const finial = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), lanternM);
      finial.position.set(0, 2.15, 5.75); g.add(finial);
      // forecastle: stepped deck rising toward the bow (the sheer read)
      const fc1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.25, 1.8), deckM); fc1.position.set(0, 1.78, 4.5);
      const fc2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 1.4), deckM); fc2.position.set(0, 2.0, 4.5);
      g.add(fc1, fc2);
      // stern castle: raised deck at the stern with dark window slits + a lantern
      const castleShape = new THREE.Shape();
      castleShape.moveTo(-1.25, -5.3); castleShape.lineTo(1.25, -5.3); castleShape.lineTo(1.25, -3.4);
      castleShape.quadraticCurveTo(0, -3.0, -1.25, -3.4); castleShape.closePath();
      const castleGeo = new THREE.ExtrudeGeometry(castleShape, { depth: 1.4, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 1, curveSegments: 6, steps: 1 });
      castleGeo.rotateX(Math.PI / 2);
      castleGeo.computeBoundingBox();
      castleGeo.translate(0, -castleGeo.boundingBox!.min.y, 0);
      const castle = new THREE.Mesh(castleGeo, hullM); castle.position.y = 1.6;
      g.add(castle);
      for (const wx of [-0.7, 0, 0.7]) {
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.55, 0.04), castleWinM);
        win.position.set(wx, 2.5, -5.38); g.add(win);
      }
      const lanPole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 5), M.wood);
      lanPole.position.set(0, 3.3, -5.1); g.add(lanPole);
      const lan = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.3, 8), lanternM);
      lan.position.set(0, 3.55, -5.1); g.add(lan);
      // mast, yard, tapered furled-sail bundle with rope bands, flag
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 8, 8), M.wood); mast.position.set(0, 5.5, 0.5);
      const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 4.6, 8), M.wood);
      yard.rotation.z = Math.PI / 2; yard.position.set(0, 8.7, 0.5);
      const furled = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.26, 3.4, 8), sailM);
      furled.rotation.z = Math.PI / 2; furled.position.set(0, 8.5, 0.5);
      g.add(mast, yard, furled);
      for (const bx of [-1.05, 1.05]) {
        const band = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.035, 6, 12), rigM);
        band.rotation.y = Math.PI / 2; band.position.set(bx, 8.5, 0.5); g.add(band);
      }
      const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.6), flagM); flag.position.set(0.45, 9.6, 0.5);
      g.add(flag);
      // rigging: forestay, backstay, two shrouds — the mast reads connected to the hull
      g.add(strut(V(0, 9.4, 0.5), V(0, 2.0, 5.4), 0.03, rigM));
      g.add(strut(V(0, 9.4, 0.5), V(0, 2.6, -5.1), 0.03, rigM));
      g.add(strut(V(0, 9.0, 0.5), V(1.5, 1.9, 0.5), 0.03, rigM));
      g.add(strut(V(0, 9.0, 0.5), V(-1.5, 1.9, 0.5), 0.03, rigM));
      if (detailed) { // lead ship: rail posts + a steering oar so the close-ups have something to read
        for (const s of [-1, 1]) {
          const rail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 7.0), M.wood);
          rail.position.set(s * 1.55, 1.95, 0); g.add(rail);
          const oar = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 4.5, 6), M.wood);
          oar.rotation.set(0.5, 0, s * 0.5); oar.position.set(s * 1.9, 1.2, -5.2); g.add(oar);
        }
      }
      g.traverse((o) => { if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true; } });
      return g;
    };
    this.leadShip = mkShip(true);
    R.add(this.leadShip);
    // the fleet: 70 ships in the Horn + 8 held back in the Bosporus, three instanced meshes (hull / mast / sail)
    // — the SAME extruded hull geometry as the lead ship, a tapered sail bundle instead of the box
    const mastG = new THREE.CylinderGeometry(0.12, 0.18, 8, 8); mastG.translate(0, 4, 0);
    // fleet furled sails: small and muted — the full-size white bundle read as a floating "T" bar at distance
    const sailG = new THREE.CylinderGeometry(0.16, 0.26, 3.4, 8); sailG.rotateZ(Math.PI / 2); sailG.translate(0, 8.5, 0);
    const fleetSailM = lam("fleetSail", () => ({ color: "#e8dcc0", side: THREE.DoubleSide }));
    const inst = (g: THREE.BufferGeometry, m: THREE.Material) => {
      const im = new THREE.InstancedMesh(g, m, FLEET_N); im.castShadow = true; im.receiveShadow = true; im.frustumCulled = false; R.add(im); return im;
    };
    this.fleetHull = inst(HULL_GEO, hullM); this.fleetMast = inst(mastG, M.wood); this.fleetSail = inst(sailG, fleetSailM);
    {
      const r2 = rng(1453);
      for (let i = 0; i < HORN_N; i++) this.fleet.push({ x: (r2() * 2 - 1) * 70, z: 70 + r2() * 34, yaw: (r2() - 0.5) * 0.9, ph: r2() * Math.PI * 2, horn: true });
      // Bosporus ships: a tight deliberate group (the old 80 m spread put at most one ship in the narrow
      // 23 deg horizontal FOV, usually cut off at the frame edge); the Horn fleet keeps its wide spread
      const BOS_SPOTS: [number, number][] = [[-14, -92], [-7, -88], [0, -90], [7, -86], [14, -92], [-10, -80], [4, -80], [10, -84]];
      for (let i = 0; i < BOS_N; i++) { const [bx, bz] = BOS_SPOTS[i]; this.fleet.push({ x: bx, z: bz, yaw: (r2() - 0.5) * 0.3, ph: r2() * Math.PI * 2, horn: false }); }
    }

    // ---- oxen (two pairs ahead of the lead ship) ----
    const oxM = lam("ox", () => ({ color: "#6b4a2f" }));
    const hornM = lam("oxHorn", () => ({ color: "#d8cbb0" }));
    const mkOx = () => {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.8, 1.7), oxM); body.position.y = 0.9;
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.6), oxM); head.position.set(0, 1.15, 1.05);
      const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.25), lam("oxDark", () => ({ color: "#4a3426" }))); muzzle.position.set(0, 1.0, 1.4);
      g.add(body, head, muzzle);
      for (const s of [-1, 1]) {
        const horn = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.6, 6), hornM);
        horn.rotation.z = s * 0.9; horn.position.set(s * 0.32, 1.5, 1.05); g.add(horn);
        for (const dz of [-0.55, 0.55]) {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.7, 6), oxM);
          leg.position.set(s * 0.32, 0.35, dz); g.add(leg);
        }
      }
      const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 5), oxM);
      tail.rotation.x = 0.3; tail.position.set(0, 0.8, -0.95); g.add(tail);
      g.traverse((o) => { if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true; } });
      return g;
    };
    for (let i = 0; i < 2; i++) { const o = mkOx(); this.oxen.push(o); R.add(o); }

    // ---- torches along the road (night shots only) ----
    this.torchPoles = new THREE.Group();
    const poleM = lam("torchPole", () => ({ color: "#4a3426" }));
    const flameM = new THREE.MeshBasicMaterial({ map: flameTex(), transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: false, toneMapped: false });
    flameM.color.setRGB(3.0, 1.8, 0.7);
    for (let i = 0; i < 10; i++) {
      const z = -52 + i * 12, x = (i % 2 ? 1 : -1) * 3.2, y = hillY(z);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 2.4, 6), poleM);
      pole.position.set(x, y + 1.2, z); pole.castShadow = true;
      this.torchPoles.add(pole);
      const fl = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.9), flameM);
      fl.position.set(x, y + 2.7, z); fl.layers.set(NOINK);
      this.flames.push(fl); R.add(fl);
    }
    R.add(this.torchPoles);

    // ---- dust at the lead ship's keel (haul shots) ----
    const smokeT = smokeTex();
    for (let k = 0; k < 6; k++) {
      const mat = new THREE.MeshBasicMaterial({ map: smokeT, transparent: true, depthWrite: false, opacity: 0 });
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
      m.layers.set(NOINK);
      this.dust.push({ m, mat, off: [((k % 3) - 1) * 1.4, 0.4 + (k % 2) * 0.3, -6 - Math.floor(k / 3) * 2], k: k / 6 }); R.add(m);
    }

    // ---- the wardrobe-analogy chest on beams (shot 10, second key) ----
    this.chest = new THREE.Group();
    {
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.8, 0.9), lam("chestWood", () => ({ color: "#8a6a45" })));
      body.position.y = 0.55;
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.4, 12, 1, false, 0, Math.PI), lam("chestWood2", () => ({ color: "#7a5a38" })));
      lid.rotation.z = Math.PI / 2; lid.position.y = 0.95;
      this.chest.add(body, lid);
      for (const s of [-1, 1]) {
        const band = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.85, 0.1), lam("chestIron", () => ({ color: "#3d414c" })));
        band.position.set(s * 0.45, 0.55, 0); this.chest.add(band);
        const beamM = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 0.18), M.wood);
        beamM.position.set(0, 0.06, s * 0.3); this.chest.add(beamM);
      }
      this.chest.traverse((o) => { if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true; } });
    }
    this.chest.position.set(8, hillY(-47), -47);
    R.add(this.chest);
  }

  /** camera-relative sun, frozen per shot: the shot's mean view direction turned by az toward screen right, lifted by el */
  private shotSun(id: number, s: ShotDef, L: LightPreset) {
    let v = this.sunCache.get(id);
    if (v) return v;
    let fx = 0, fz = 0;
    for (let f = s.a; f < s.b; f += 3) {
      const c = camAt(id, f), x = c.look[0] - c.pos[0], z = c.look[2] - c.pos[2], n = Math.hypot(x, z) || 1;
      fx += x / n; fz += z / n;
    }
    const n = Math.hypot(fx, fz) || 1; fx /= n; fz /= n;
    const ss = s as ShotDef & { sunAz?: number; sunEl?: number };
    const az = THREE.MathUtils.degToRad(ss.sunAz ?? SUN_SHOT[id]?.az ?? L.az), el = THREE.MathUtils.degToRad(ss.sunEl ?? SUN_SHOT[id]?.el ?? L.el);
    const hx = fx * Math.cos(az) - fz * Math.sin(az), hz = fz * Math.cos(az) + fx * Math.sin(az); // screen right = (-fz, fx)
    v = new THREE.Vector3(hx * Math.cos(el), Math.sin(el), hz * Math.cos(el)).normalize();
    this.sunCache.set(id, v);
    return v;
  }

  private actor(i: number) { while (this.actors.length <= i) this.actors.push(new Actor(this.root)); return this.actors[i]; }
  private fx(i: number) { while (this.fxs.length <= i) this.fxs.push(new Fx(this.root)); return this.fxs[i]; }

  update(id: number, f: number, cam: THREE.PerspectiveCamera, scene: THREE.Scene) {
    const t = f / FPS, s = SHOTS[id - 1], st = shipsState(id, t), L = LIGHTS[s.light];
    // ---- camera ----
    const c = camAt(id, f);
    cam.position.set(...c.pos); cam.up.set(0, 1, 0); cam.lookAt(...c.look); cam.rotateZ(c.roll);
    cam.fov = c.fov; cam.near = 0.2; cam.far = 1500; cam.updateProjectionMatrix(); cam.updateMatrixWorld();
    const focus = V(...c.look), dist = cam.position.distanceTo(focus);
    cam.layers.enable(NOINK); // sky, clouds, smoke and sun sprites live on the no-ink layer but are still rendered
    // ---- light rig (lighting.md 9.4): camera-relative sun frozen per shot, two-tone uniforms, shadow fit ----
    const K = LOOK[s.light], sunDir = this.shotSun(id, s, L);
    this.hemi.color.set(L.sky); this.hemi.groundColor.set(L.ground); this.hemi.intensity = L.hemiI;
    this.sun.color.set(L.sunCol); this.sun.intensity = L.sunI;
    let Rr = THREE.MathUtils.clamp(dist * 1.15 + 7, 12, 95);
    if (s.light === "golden") Rr = Math.max(Rr, 30); // el 7: 2 m cards throw ~16 m shadows, houses much longer
    this.sun.position.copy(focus).addScaledVector(sunDir, 220); this.sun.target.position.copy(focus);
    const sc = this.sun.shadow.camera;
    sc.left = -Rr; sc.right = Rr; sc.top = Rr; sc.bottom = -Rr; sc.near = 20; sc.far = 480; sc.updateProjectionMatrix();
    this.sun.shadow.bias = L.bias; this.sun.shadow.normalBias = L.normalBias * (Rr / 12);
    this.fill.intensity = 0; // not used by the two-tone shading
    TONE.uLitCol.value.set(...L.lit); TONE.uShadeCol.value.set(...L.shade); TONE.uShadeLift.value.set(...L.lift);
    TONE.uLambert.value = L.lambert; TONE.uSideK.value = L.sideK; TONE.uTerm.value = L.term; TONE.uBounce.value.set(...LOOK[s.light].bounce); TONE.uSat.value = LOOK[s.light].sat;
    CHAR.uCharTint.value.set(...L.charTint); CHAR.uCharShade.value = L.charShade; CHAR.uGrad.value = L.charGrad;
    CHAR.uBodyGrad.value = L.bodyGrad; CHAR.uSideTint.value.set(...L.sideTint);
    // ---- sky, fog (colour = horizon colour, linear fogNear -> fogFar), sun disc + halo, clouds ----
    const su = this.skyMat.uniforms;
    K.sky.c.forEach((h, i) => untone(h, su["c" + i].value));
    const e = K.sky.e.map((deg) => THREE.MathUtils.degToRad(deg));
    su.e.value.set(e[1], e[2], e[3], e[4]);
    this.sky.position.copy(cam.position);
    untone(L.fog, this.fog.color); this.fog.near = L.fogNear; this.fog.far = L.fogFar;
    scene.fog = this.fog; scene.background = null;
    const showSun = s.light !== "day";
    this.sunDisc.visible = this.sunHalo.visible = showSun;
    if (showSun) {
      const night = s.light === "night";
      const discMat = this.sunDisc.material as THREE.SpriteMaterial;
      discMat.color.setRGB(night ? 1.6 : 6.0, night ? 1.8 : 4.4, night ? 2.6 : 2.4);
      const discR = night ? 0.5 : 1.7;
      this.sunDisc.position.copy(cam.position).addScaledVector(sunDir, 900);
      this.sunDisc.scale.setScalar(2 * 900 * Math.tan(THREE.MathUtils.degToRad(discR)));
      this.sunHalo.position.copy(this.sunDisc.position);
      this.sunHalo.scale.setScalar(2 * 900 * Math.tan(THREE.MathUtils.degToRad(night ? 6 : 24)));
      (this.sunHalo.material as THREE.SpriteMaterial).color.set(L.sunDisc).multiplyScalar(night ? 0.5 : 1.3);
    }
    for (let i = 0; i < this.clouds.length; i++) {
      const m = this.clouds[i], mat = m.material as THREE.MeshBasicMaterial;
      m.lookAt(cam.position.x, m.position.y, cam.position.z);
      mat.map = this.cloudMaps[s.light][i % 4];
    }
    // ---- water colours (on-screen targets, tone-map-inverted) ----
    const W = this.WU, wc = K.water;
    untone(wc.near, W.wNearC.value); untone(wc.mid, W.wMidC.value); untone(wc.far, W.wFarC.value);
    untone(wc.crest, W.wCrest.value); untone(wc.trough, W.wTrough.value); untone(wc.glint, W.wGlint.value);
    W.wShade.value.set(...wc.shade); W.wTime.value = t;
    // ---- foreground framing objects: none in this short (FOREGROUND is empty; the world is open) ----
    // ---- ships, oxen, torches, dust, chest ----
    this.poseShips(st, t, id);
    const night = s.light === "night";
    this.torchPoles.visible = night;
    for (const fl of this.flames) { fl.visible = night; if (night) fl.quaternion.copy(cam.quaternion); }
    for (const o of this.oxen) o.visible = id === 1 || id === 5 || id === 7;
    if (this.oxen[0].visible) {
      const sz = st.shipZ;
      [[-1.6, sz + 9], [1.6, sz + 11]].forEach(([x, z], i) => {
        const o = this.oxen[i];
        o.position.set(x, hillY(z), z);
        o.rotation.y = 0; // oxen face +z, uphill
      });
    }
    const hauling = id === 5 || id === 7;
    for (const d of this.dust) {
      const u = (t * 0.12 + d.k) % 1, sz2 = 3 + u * 5;
      const shipP = this.leadShip.position;
      d.m.position.set(shipP.x + d.off[0] - u * 4, shipP.y + d.off[1] + u * 2.5, shipP.z + d.off[2]);
      d.m.scale.set(sz2, sz2, 1); d.m.quaternion.copy(cam.quaternion);
      d.mat.opacity = hauling ? 0.45 * (1 - u) ** 1.2 : 0;
      d.m.visible = hauling;
    }
    this.chest.visible = id === 10 && f >= 2070;
    // ---- cast + effects ----
    const right = V(0, 0, 0).setFromMatrixColumn(cam.matrixWorld, 0);
    const stg = stage(id, t, st, { pos: cam.position, right });
    this.frustum.setFromProjectionMatrix(this.m4.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse));
    const tint = s.light === "golden" ? "#ffcf9e" : "#ffffff";
    let ai = 0;
    const used: Actor[] = [];
    for (const p of stg.places) {
      const sc2 = p.scale ?? 1;
      if (p.geo !== "swing" && !this.frustum.intersectsSphere(this.sph.set(this.v.set(p.x, p.y + 1.1 * sc2, p.z), 3.5))) continue;
      const a = this.actor(ai++);
      const [w, h, k] = p.size ?? [300, 500, 0.5];
      a.r = this.pool.req(p.key, w, h, k, p.draw);
      a.mesh.visible = true;
      a.mesh.position.set(p.x, p.y, p.z);
      a.mesh.rotation.set(0, p.yaw ?? Math.atan2(cam.position.x - p.x, cam.position.z - p.z), p.roll ?? 0);
      a.mesh.scale.set(p.mirror ? -sc2 : sc2, sc2, sc2);
      if (a.mat.emissiveMap) a.mat.emissive.set(tint); // legacy emissive card until the CHAR agent's cardShade lands
      a.mesh.castShadow = L.actorShadow; // day: soft contact blobs instead (CHAR agent)
      used.push(a);
    }
    for (let i = ai; i < this.actors.length; i++) this.actors[i].mesh.visible = false;
    let fi = 0;
    const fused: Fx[] = [];
    for (const p of stg.fx) {
      if (!this.frustum.intersectsSphere(this.sph.set(this.v.set(p.x, p.y, p.z), Math.max(p.w, p.h)))) continue;
      const e = this.fx(fi++);
      e.r = this.pool.req(p.key, p.cw, p.ch, 1, p.draw);
      e.use(!!p.soft);
      e.mesh.visible = true;
      e.mesh.position.set(p.x, p.y, p.z);
      if (p.flat) e.mesh.rotation.set(-Math.PI / 2, 0, p.rot ?? 0);
      else { e.mesh.quaternion.copy(cam.quaternion); e.mesh.rotateZ(p.rot ?? 0); }
      e.mesh.scale.set(p.w, p.h, 1);
      fused.push(e);
    }
    for (let i = fi; i < this.fxs.length; i++) this.fxs[i].mesh.visible = false;
    this.pool.flush();
    for (const a of used) a.bind();
    for (const e of fused) e.bind();
    return focus;
  }

  /** lead ship on the rails (pitch follows the hill slope) + the instanced fleet bobbing in the waters */
  private poseShips(st: ShipsState, t: number, id: number) {
    const z = st.shipZ, y = hillY(z);
    const slope = (hillY(z + 1) - hillY(z - 1)) / 2;
    this.leadShip.position.set(0, y + 0.3, z);
    this.leadShip.rotation.set(-Math.atan(slope), 0, 0);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < FLEET_N; i++) {
      const a = this.fleet[i];
      const vis = a.horn ? st.horn : id === 3;
      const bob = 0.1 * Math.sin(t * 0.8 + a.ph), roll = 0.025 * Math.sin(t * 0.6 + a.ph * 1.3);
      dummy.position.set(a.x, -0.1 + bob, a.z); // extruded hull spans y 0..1.6 (old box was centred), so -0.1 keeps the old waterline
      dummy.rotation.set(roll, a.yaw, 0);
      dummy.scale.setScalar(vis ? 1 : 0);
      dummy.updateMatrix();
      this.fleetHull.setMatrixAt(i, dummy.matrix);
      this.fleetMast.setMatrixAt(i, dummy.matrix);
      this.fleetSail.setMatrixAt(i, dummy.matrix);
    }
    this.fleetHull.instanceMatrix.needsUpdate = true;
    this.fleetMast.instanceMatrix.needsUpdate = true;
    this.fleetSail.instanceMatrix.needsUpdate = true;
  }
}

const WATER_DECL = `#include <common>
varying vec3 vWP;
uniform vec3 wNearC, wMidC, wFarC, wCrest, wTrough, wGlint, wShade;
uniform sampler2D wNearTex, wFarTex;
uniform float wTime;`;
const WATER_COL = `
  vec3 wV = vWP - cameraPosition;
  float wd = length(wV);
  float wDep = asin(clamp(-wV.y / wd, 0.0, 1.0));       // depression angle of the view ray
  float wf = 1.0 - smoothstep(0.0, 0.42, wDep);         // 1 at the horizon .. 0 at 24 deg down
  vec3 wc = mix(mix(wNearC, wMidC, smoothstep(0.0, 0.55, wf)), wFarC, smoothstep(0.55, 1.0, wf));
  vec2 wp = vWP.xz + vec2(0.35 * wTime, 0.0);           // slow river along +x
  vec4 mk = mix(texture2D(wNearTex, wp / 8.0), texture2D(wFarTex, wp / 40.0 + 0.37), smoothstep(25.0, 90.0, wd));
  wc = mix(wc, wTrough, mk.g * 0.75);
  wc = mix(wc, wCrest, mk.r * 0.9);
  wc = mix(wc, wGlint, mk.b * (0.45 + 0.55 * wf));
  diffuseColor.rgb = wc;`;

/** horizontal quad facing up at height D0 + dy covering x0..x1, z0..z1 (z0 < z1) */
function quadUp(x0: number, x1: number, z0: number, z1: number, u: number, v: number, dy = 0) {
  const y = D0 + dy, g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute([x0, y, z1, x1, y, z1, x1, y, z0, x0, y, z1, x1, y, z0, x0, y, z0], 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute([0, 0, u, 0, u, v, 0, 0, u, v, 0, v], 2));
  return g;
}
