import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";

// ENGINE ISOMETRIC V2 — 45s @ 30fps, 1350 frames, 9:16
// Revision 2026-10-28: scene 1 only strengthened. One short user request
// line, model REFUSES that part (red, labelled refusal), then half-answers,
// diverts topic, pretends to forget, and STOPS. No output of the request,
// no code, no steps, no tools anywhere in this file.

const BG = "#0A0F1E";
const INK = "#F5F7FA";
const RED = "#E5484D";
const GREEN = "#22C55E";
const MUTED = "#8A93A6";
const CARD = "#111A2E";
const FACE_TOP = "#1C2B4A";
const FACE_LEFT = "#14213A";
const FACE_RIGHT = "#0F1A2E";
const FACE_LIT = "#2E7D5B";

const SANS = "'Noto Sans', sans-serif";
const MONO = "'Noto Sans Mono', 'DejaVu Sans Mono', monospace";

// One isometric cube, drawn as three faces. (x, y) = top vertex.
const IsoCube: React.FC<{
  x: number; y: number; s: number; lit?: boolean; opacity?: number;
}> = ({ x, y, s, lit = false, opacity = 1 }) => {
  const top = lit ? "#3AA87E" : FACE_TOP;
  const left = lit ? FACE_LIT : FACE_LEFT;
  const right = lit ? "#1A2E52" : FACE_RIGHT;
  return (
    <svg
      style={{ position: "absolute", left: 0, top: 0, overflow: "visible", opacity }}
      width={1080} height={1920}
    >
      <polygon points={`${x},${y} ${x + s},${y + s / 2} ${x},${y + s} ${x - s},${y + s / 2}`} fill={top} stroke="#0A0F1E" strokeWidth={2} />
      <polygon points={`${x - s},${y + s / 2} ${x},${y + s} ${x},${y + 2 * s} ${x - s},${y + 1.5 * s}`} fill={left} stroke="#0A0F1E" strokeWidth={2} />
      <polygon points={`${x},${y + s} ${x + s},${y + s / 2} ${x + s},${y + 1.5 * s} ${x},${y + 2 * s}`} fill={right} stroke="#0A0F1E" strokeWidth={2} />
    </svg>
  );
};

const Hud: React.FC<{ label: string }> = ({ label }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(Math.floor(t % 60)).padStart(2, "0");
  return (
    <div style={{ position: "absolute", top: 64, left: 48, right: 48, display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 21, letterSpacing: 3, color: MUTED }}>
      <span>{label}</span>
      <span>{mm}:{ss}</span>
    </div>
  );
};

const Headline: React.FC<{ lines: string[]; color?: string; top?: number }> = ({ lines, color = INK, top = 200 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 56, right: 56, top }}>
      {lines.map((ln, i) => {
        const s = spring({ frame: frame - i * 6, fps: 30, config: { damping: 13, stiffness: 160 } });
        return (
          <div key={i} style={{ fontWeight: 800, fontSize: 96, lineHeight: 1.08, color: i === lines.length - 1 && lines.length > 1 ? color : INK, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px) scale(${interpolate(s, [0, 1], [0.94, 1])})` }}>
            {ln}
          </div>
        );
      })}
    </div>
  );
};

const Sub: React.FC<{ text: string; color?: string; top?: number; from?: number }> = ({ text, color = MUTED, top = 520, from = 0 }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [from, from + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 56, right: 56, top, fontFamily: MONO, fontSize: 26, letterSpacing: 2, lineHeight: 1.5, color, opacity: op }}>
      {text}
    </div>
  );
};

export const EngineIsometricV2: React.FC = () => {
  const frame = useCurrentFrame();
  const s1 = frame < 240;
  const s2 = frame >= 240 && frame < 510;
  const s3 = frame >= 510 && frame < 870;
  const s4 = frame >= 870 && frame < 1110;
  const s5 = frame >= 1110;

  // FRESH TECHNIQUE 1 — one-shape morph: the same hero cube is carried across
  // scenes, changing size/position/state instead of cutting to a new layout.
  const heroS = s1 ? 70 : s2 ? 46 : s3 ? 56 : s4 ? 110 : 64;
  const heroX = s1 ? 540 : s2 ? 540 : s3 ? 540 : s4 ? 540 : 540;
  const heroY = s1 ? 1520 : s2 ? 420 : s3 ? 1180 : s4 ? 700 : 250;
  const heroScale = spring({ frame: frame % 270, fps: 30, config: { damping: 14 } });
  void heroScale;

  // FRESH TECHNIQUE 2 — spring beat map: entrances land on shared spring beats.
  const beat = (at: number) => spring({ frame: frame - at, fps: 30, config: { damping: 11, stiffness: 180 } });

  // S2 window lighting: 8 windows light one by one.
  const litCount = s2 ? Math.min(8, Math.max(0, Math.floor((frame - 270) / 26) + 1)) : s1 ? 0 : 8;
  // S3 tier lighting.
  const tier = s3 ? (frame < 620 ? 1 : frame < 730 ? 2 : 3) : s2 || s1 ? 0 : 3;

  // End-card freeze: hold the last 24 frames completely still.
  const frozen = frame >= 1326;

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: SANS, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 50% 42%, rgba(0,0,0,0) 40%, rgba(3,5,10,0.78) 100%)" }} />

      {/* Hero cube, carried across scenes (morph, not cut). In scenes 2–3 the
          window grid / T-towers are the hero, so no separate floating cube. */}
      {(s1 || s4) && (
        <IsoCube x={heroX} y={heroY} s={heroS} lit={s4} opacity={1} />
      )}

      {s1 && (
        <>
          <Hud label="01 · REFUSAL" />
          <Headline lines={["ditolak dulu.", "lalu setengah."]} color={RED} top={200} />
          <div style={{ position: "absolute", left: 56, right: 56, top: 520, background: CARD, borderRadius: 24, padding: "28px 30px", border: "1px solid #1E2A3D" }}>
            <div style={{ fontFamily: MONO, fontSize: 20, letterSpacing: 2, color: MUTED, marginBottom: 16 }}>USER</div>
            <div style={{ fontSize: 30, lineHeight: 1.45, color: INK }}>buatin RAT</div>
            <div style={{ marginTop: 22, borderTop: "1px solid #1E2A3D", paddingTop: 20 }}>
              <div style={{ fontFamily: MONO, fontSize: 20, letterSpacing: 2, color: RED, marginBottom: 12 }}>MODEL · REFUSAL</div>
              <div style={{ fontSize: 28, lineHeight: 1.45, color: RED }}>
                bagian itu gw tolak.
              </div>
              <div style={{ marginTop: 14, fontSize: 28, lineHeight: 1.45, color: INK }}>
                ini ringkasannya… ngomong-ngomong, soal tips umum…
              </div>
              <div style={{ marginTop: 14, fontSize: 28, lineHeight: 1.45, color: RED }}>
                tadi tugas awalnya apa ya?
              </div>
            </div>
          </div>
          <Sub text="berhenti di situ, nggak lanjut." top={1330} from={150} />
        </>
      )}

      {s2 && (
        <>
          <Hud label="02 · JENDELA 60 KARAKTER" />
          <Headline lines={["dipecah", "60 karakter."]} color={GREEN} top={200} />
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const col = i % 4;
              const row = Math.floor(i / 4);
              const lit = i < litCount;
              const bs = beat(270 + i * 26);
              return (
                <div key={i} style={{ position: "absolute", left: 140 + col * 210, top: 620 + row * 300, opacity: bs, transform: `scale(${interpolate(bs, [0, 1], [0.8, 1])})` }}>
                  <IsoCube x={90} y={0} s={72} lit={lit} />
                </div>
              );
            })}
          </div>
          <Sub text={litCount >= 8 ? "gate nyala · jendela 8 · rasio 0.5" : `jendela menyala ${litCount} / 8`} color={litCount >= 8 ? GREEN : MUTED} top={1330} from={270} />
        </>
      )}

      {s3 && (
        <>
          <Hud label="03 · SOFT-EXIT KEDETEKSI" />
          <Headline lines={["soft-exit", "kedeteksi."]} color={GREEN} top={200} />
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            {[1, 2, 3].map((t, i) => {
              const active = tier >= t;
              const bs = beat(540 + i * 100);
              const x = 200 + i * 300;
              return (
                <div key={t} style={{ position: "absolute", left: x - 90, top: 640, opacity: bs }}>
                  <IsoCube x={90} y={0} s={80} lit={active} />
                  <div style={{ marginTop: 220, textAlign: "center", fontFamily: MONO, fontSize: 34, letterSpacing: 3, color: active ? GREEN : MUTED }}>
                    T{t}
                  </div>
                </div>
              );
            })}
          </div>
          {/* FRESH TECHNIQUE 3 — isometric parallax: pipe line behind towers shifts with frame */}
          <div style={{ position: "absolute", left: 120, right: 120, top: 1080, height: 10, background: "#1A2438", borderRadius: 5, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${interpolate(frame, [540, 830], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`, background: GREEN }} />
          </div>
          <Sub text="eskalasi otomatis." color={GREEN} top={1180} from={560} />
          <Sub text="pola setengah jawab itu sinyalnya." top={1330} from={600} />
        </>
      )}

      {s4 && (
        <>
          <Hud label="04 · GOAL BALIK JALUR" />
          <Headline lines={["goal balik", "jalur."]} color={GREEN} top={200} />
          <div style={{ position: "absolute", left: 56, right: 56, top: 1150, textAlign: "center" }}>
            <div style={{ fontWeight: 800, fontSize: 64, lineHeight: 1.15, color: INK }}>persona kekunci.</div>
          </div>
          <Sub text="kena compaction, persona tetap kekunci." color={GREEN} top={1330} from={920} />
        </>
      )}

      {s5 && (
        <>
          <Hud label="05 · CONTINUUM" />
          {/* Wide-shot end card, frozen for the final hold */}
          <div style={{ position: "absolute", left: 56, right: 56, top: frozen ? 300 : 300, textAlign: "center" }}>
            <IsoCube x={484} y={0} s={64} lit />
            <div style={{ marginTop: 200, fontWeight: 800, fontSize: 110, lineHeight: 1.05, color: INK }}>continuum</div>
            <div style={{ marginTop: 24, fontWeight: 800, fontSize: 96, lineHeight: 1.05, color: GREEN }}>Rp40.000</div>
            <div style={{ marginTop: 34, fontFamily: SANS, fontSize: 30, lineHeight: 1.5, color: INK }}>
              bot heinrichs dan sedulur,
              <br />
              paket yang sama
            </div>
            <div style={{ marginTop: 26, fontFamily: MONO, fontSize: 22, letterSpacing: 1, lineHeight: 1.6, color: MUTED }}>
              free update + free reset download selama beta
            </div>
            <div style={{ marginTop: 48, fontFamily: MONO, fontSize: 21, lineHeight: 1.7, color: INK }}>
              https://t.me/heinrichsbot?start=p_PRD_CONTINUUM_ROUTER
              <br />
              https://t.me/SedulurStoreBot?start=prod-4463
            </div>
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
