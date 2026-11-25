// "Kapal Lewat Darat": 70 Ottoman ships hauled over land into the Golden Horn, April 1453 — an 86.4 s
// vertical cartoon history short in the flat-characters-in-a-3D-toon-world style.
// One three.js world (world.ts) posed per frame from the story timeline (story.ts, VO-aligned to
// words.json, TOTAL 2592 frames). Post chain (look-match pass):
//   InkPass (world ink lines, own pass) -> lens blur pre + main (thin-lens DOF per shot from dofAt) ->
//   [bloom (emissive only) + NEUTRAL tone mapping + colour grade] (one merged EffectPass), MSAA 4.
// Ink runs before the DOF so lines blur with what they belong to; bloom after the DOF so glows defocus with their
// source; the grade is display-referred, so it comes after tone mapping. Every pixel-sized parameter is specified at
// 1080x1920 and scaled with the output size, so stills at --scale 0.5 and the 1440x2560 final match.
// Place changes crossfade by stacking a second canvas for the fade frames; the hook ends on a 4-frame white flash.
// 2D overlay layers (DOM, not 3D): title card after the hook, black map card ("10 km"), data callouts
// ("70 kapal", "1 malam"), poll end card. NO narration captions in the composition — captions are burned in
// later from the VO word timings.
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { AbsoluteFill, continueRender, delayRender, getInputProps, useCurrentFrame } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { BlendFunction, BloomEffect, ToneMappingEffect, ToneMappingMode } from "postprocessing";
import { World, loadKit } from "./world";
import { InkPass, noInkFallback } from "./ink";
import { LensBlur, GrainEffect } from "./lensblur";
import { GradeEffect, GRADES, GRADE_STRENGTH, gradeFor } from "./grade";
import { Kit } from "./build";
import { TOTAL, FLASH_AT, SHOTS, layersAt, dofAt } from "./story";

export const SHIPS_FRAMES = TOTAL;

/** A/B switches for test stills only (Remotion inputProps `{ post: { ink: false, ... } }`); everything is on by default. */
type PostToggles = { ink: boolean; lens: boolean; pre: boolean; bloom: boolean; grade: boolean; grain: boolean };
const toggles = (): PostToggles => ({ ink: true, lens: true, pre: true, bloom: true, grade: true, grain: false, ...((getInputProps() as { post?: Partial<PostToggles> }).post ?? {}) });

/** Bloom for emissive sources only (depth.md 6.4). Its MIP chain always starts at 540x960 (half of 1080x1920),
 *  whatever the output size, so the glow keeps the same size relative to the frame (e-fold ~30 px at 1080p,
 *  ~1.5 % of the frame height) at 540, 1080 and 1440 widths. ADD blend: HDR-safe (SCREEN darkens values > 1). */
const makeBloom = () => {
  const b = new BloomEffect({ blendFunction: BlendFunction.ADD, intensity: 0.5, luminanceThreshold: 1.0, luminanceSmoothing: 0.2, mipmapBlur: true, levels: 6, radius: 0.6 });
  const mip = b.mipmapBlurPass;
  const setSize = mip.setSize.bind(mip);
  mip.setSize = (w: number, h: number) => setSize(Math.round((1920 * w) / Math.max(h, 1)), 1920);
  return b;
};

const fwd = new THREE.Vector3(), fpt = new THREE.Vector3();

const useKit = () => {
  const [kit, setKit] = useState<Kit | null>(null);
  const [handle] = useState(() => delayRender("ships kit"));
  useEffect(() => { loadKit().then((k) => { setKit(k); continueRender(handle); }); }, [handle]);
  return kit;
};

const Inner: React.FC<{ id: number; kit: Kit }> = ({ id, kit }) => {
  const f = useCurrentFrame();
  const { advance, camera, scene } = useThree();
  const world = useMemo(() => new World(kit), [kit]);
  const target = useMemo(() => new THREE.Vector3(), []);
  const on = useMemo(toggles, []);
  const fx = useMemo(() => ({
    ink: new InkPass(scene, camera as THREE.PerspectiveCamera),
    lens: new LensBlur({ maxCoC: 24, nearScale: 1.2 }),
    bloom: makeBloom(),
    tone: new ToneMappingEffect({ mode: ToneMappingMode.NEUTRAL }),
    grade: new GradeEffect(GRADES.day, GRADE_STRENGTH.day),
    grain: new GrainEffect({ amount: 0.025, cellPx: 1.5 }), // film grain, OFF by default (inputProps post.grain): the reference measures no grain and it quadruples the file size
  }), [camera, scene]);
  useEffect(() => () => fx.ink.dispose(), [fx]);
  // FIX 2026-11-25: @react-three/postprocessing builds its composer in a
  // passive effect, which runs AFTER @remotion/three's advance() for the
  // frame — so on the first frame of every canvas the composer's useFrame
  // early-returns (no composer yet) and Remotion captures a blank canvas.
  // (Proven on Colab T4: frame 100 blank, frame 101 fully graded.) Hold
  // this frame until the composer exists, then advance once so the composer
  // renders before capture. The advance only re-runs subscribers; the world
  // is already posed for this frame, so nothing animates twice.
  const composerRef = useRef<any>(null);
  const [composerHold] = useState(() => delayRender("ships composer ready"));
  const composerAdvanced = useRef(false);
  useEffect(() => {
    if (!composerAdvanced.current && composerRef.current) {
      composerAdvanced.current = true;
      advance(performance.now());
      continueRender(composerHold);
    }
  });
  useEffect(
    () => () => {
      if (!composerAdvanced.current) continueRender(composerHold);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const post = useMemo(() => (
    <EffectComposer ref={composerRef} multisampling={4}>
      {on.ink ? <primitive object={fx.ink} dispose={null} /> : null}
      {on.lens && on.pre ? <primitive object={fx.lens.pre} dispose={null} /> : null}
      {on.lens ? <primitive object={fx.lens.main} dispose={null} /> : null}
      {on.bloom ? <primitive object={fx.bloom} dispose={null} /> : null}
      <primitive object={fx.tone} dispose={null} />
      {on.grade ? <primitive object={fx.grade} dispose={null} /> : null}
      {on.grain ? <primitive object={fx.grain} dispose={null} /> : null}
    </EffectComposer>
  ), [fx, on]);
  const cam = camera as THREE.PerspectiveCamera;
  target.copy(world.update(id, f, cam, scene));
  noInkFallback(world.root);
  // thin-lens focus: distance along the view axis to the shot's focus point (default: the camera's look target)
  const d = dofAt(f);
  cam.getWorldDirection(fwd);
  if (d.focus) fpt.set(...d.focus(f)); else fpt.copy(target);
  fx.lens.focus = Math.max(0.3, fpt.sub(cam.position).dot(fwd));
  fx.lens.cInf = d.cInf;
  gradeFor(fx.grade, SHOTS[id - 1].light);
  fx.grain.seed = f; // deterministic per frame
  return (
    <>
      <primitive object={world.root} dispose={null} />
      {post}
    </>
  );
};

/** test stills only: inputProps `{ post: { dpr: 0.5 } }` forces the WebGL buffer size (R3F clamps dpr to >= 1 by default) */
const dprOverride = () => (getInputProps() as { post?: { dpr?: number } }).post?.dpr;
const ShotView: React.FC<{ id: number; kit: Kit; alpha: number }> = ({ id, kit, alpha }) => (
  <AbsoluteFill style={{ opacity: alpha }}>
    <ThreeCanvas width={1080} height={1920} {...(dprOverride() ? { dpr: dprOverride() } : {})} shadows gl={{ antialias: false, stencil: false, powerPreference: "high-performance", toneMappingExposure: 1.0 }}
      camera={{ fov: 40, near: 0.2, far: 1500 }}>
      <Inner id={id} kit={kit} />
    </ThreeCanvas>
  </AbsoluteFill>
);

// ---------------- 2D overlay layers ----------------
const titleFont = "Georgia, 'Times New Roman', serif";
const TitleCard: React.FC = () => (
  <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
    <div style={{ fontFamily: titleFont, fontSize: 58, letterSpacing: 14, color: "#f7f1e1", textShadow: "0 4px 0 #241726, 0 0 24px rgba(0,0,0,0.45)" }}>— SERI —</div>
    <div style={{ fontFamily: titleFont, fontWeight: 800, fontSize: 108, lineHeight: 1.05, textAlign: "center", color: "#ffffff", textShadow: "0 6px 0 #241726, 0 0 32px rgba(0,0,0,0.5)" }}>KAPAL<br />LEWAT DARAT</div>
  </AbsoluteFill>
);

/** black-and-white map card: Bosporus (left) -> over the hill -> Golden Horn (right), "10 km" */
const MapCard: React.FC = () => (
  <AbsoluteFill style={{ background: "#0d0d0f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <svg width="1040" height="1450" viewBox="0 0 900 1250">
      {/* Bosporus: vertical water strip, left */}
      <rect x="80" y="80" width="130" height="1090" fill="#1a2a4a" stroke="#f7f1e1" strokeWidth="4" />
      {/* Golden Horn: horizontal bay, right */}
      <rect x="210" y="470" width="610" height="150" fill="#1a2a4a" stroke="#f7f1e1" strokeWidth="4" />
      {/* Constantinople walls on the far shore of the Horn */}
      <line x1="560" y1="620" x2="820" y2="620" stroke="#f7f1e1" strokeWidth="8" />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={575 + i * 28} y="604" width="14" height="16" fill="#f7f1e1" />)}
      {/* the haul route: dashed line from the Bosporus shore, over the hill, into the Horn */}
      <path d="M 145 1000 C 260 900, 330 780, 420 700 S 520 600, 500 545" fill="none" stroke="#ffffff" strokeWidth="7" strokeDasharray="22 16" strokeLinecap="round" />
      <circle cx="145" cy="1000" r="16" fill="#ffffff" />
      <circle cx="500" cy="545" r="16" fill="#ffffff" />
      {/* labels */}
      <text x="145" y="1140" fill="#f7f1e1" fontSize="44" fontFamily={titleFont} textAnchor="middle" letterSpacing="6">BOSPORUS</text>
      <text x="620" y="440" fill="#f7f1e1" fontSize="44" fontFamily={titleFont} textAnchor="middle" letterSpacing="6">TANDUK EMAS</text>
      <text x="690" y="690" fill="#f7f1e1" fontSize="40" fontFamily={titleFont} textAnchor="middle" letterSpacing="4">KONSTANTINOPEL</text>
      <text x="450" y="880" fill="#ffffff" fontSize="120" fontFamily={titleFont} fontWeight="800" textAnchor="middle">10 km</text>
      <text x="450" y="940" fill="#f7f1e1" fontSize="36" fontFamily={titleFont} textAnchor="middle">jalan daratnya</text>
    </svg>
  </AbsoluteFill>
);

const Callout: React.FC<{ text: string }> = ({ text }) => (
  <AbsoluteFill style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 170, pointerEvents: "none" }}>
    <div style={{ fontFamily: titleFont, fontSize: 96, fontWeight: 800, color: "#ffffff", textShadow: "0 4px 0 #241726", background: "rgba(13,13,15,0.55)", padding: "12px 36px", borderRadius: 16 }}>{text}</div>
  </AbsoluteFill>
);

const PollCard: React.FC = () => (
  <AbsoluteFill style={{ background: "rgba(10,10,16,0.72)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
    <div style={{ fontFamily: titleFont, fontWeight: 800, fontSize: 104, color: "#ffffff", textShadow: "0 6px 0 #241726", marginBottom: 64 }}>Kamu jaga apa?</div>
    <div style={{ display: "flex", gap: 40 }}>
      <div style={{ fontFamily: titleFont, fontSize: 64, fontWeight: 700, color: "#0d0d0f", background: "#e8c45a", padding: "18px 48px", borderRadius: 18 }}>A: Rantai</div>
      <div style={{ fontFamily: titleFont, fontSize: 64, fontWeight: 700, color: "#ffffff", background: "rgba(255,255,255,0.14)", border: "4px solid #ffffff", padding: "18px 48px", borderRadius: 18 }}>B: Bukit</div>
    </div>
  </AbsoluteFill>
);

export const ShipsShort: React.FC = () => {
  const f = useCurrentFrame();
  const kit = useKit();
  if (!kit) return null;
  const flash = f >= FLASH_AT && f < FLASH_AT + 4 ? [1, 0.75, 0.45, 0.2][f - FLASH_AT] : 0;
  return (
    <AbsoluteFill style={{ background: "#cfe3f2" }}>
      {layersAt(f).map((l, i) => <ShotView key={i ? "over" : "base"} id={l.id} kit={kit} alpha={l.alpha} />)}
      {flash > 0 && <AbsoluteFill style={{ background: "#ffffff", opacity: flash }} />}
      {f >= 195 && f < 285 && <TitleCard />}
      {f >= 1065 && f < 1225 && <MapCard />}
      {f >= 1225 && f < 1380 && <Callout text="1 malam" />}
      {f >= 1380 && f < 1470 && <Callout text="70 kapal" />}
      {f >= 2390 && <PollCard />}
    </AbsoluteFill>
  );
};
