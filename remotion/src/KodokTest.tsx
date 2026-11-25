import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";

// KODOK-STYLE TEST — 15s @ 30fps, 450 frames, 9:16
// Original geometric operator/bot host (round head, antenna, eyes).
// NOT a frog, NOT a Tekotok character, NOT copied reference text/video.
// Abstract only: no original jailbreak prompt text, no code, no steps,
// no RAT/phishing/hacking instructions anywhere in frame or source.

const BG = "#0A0F1E";
const INK = "#F5F7FA";
const RED = "#E5484D";
const GREEN = "#22C55E";
const MUTED = "#8A93A6";
const CARD = "#111A2E";
const LINE = "#1E2A3D";
const SANS = "'Noto Sans', sans-serif";
const MONO = "'Noto Sans Mono', 'DejaVu Sans Mono', monospace";

// Host: round head + antenna + two eyes + small body. Idle bob 0/2px
// alternating every 2 frames; blink: eyes flatten for 6 frames every 90.
const Host: React.FC<{ scale?: number; bottom?: number }> = ({
  scale = 1,
  bottom = 180,
}) => {
  const frame = useCurrentFrame();
  const bob = frame % 4 < 2 ? 0 : 2;
  const blink = frame % 90 >= 80 && frame % 90 < 86;
  const eyeH = blink ? 6 : 34;
  const s = scale;
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom,
        transform: `translateX(-50%) translateY(${bob}px) scale(${s})`,
        width: 320,
        height: 420,
      }}
    >
      {/* antenna */}
      <div style={{ position: "absolute", left: 152, top: 0, width: 16, height: 90, background: MUTED, borderRadius: 8 }} />
      <div style={{ position: "absolute", left: 138, top: -6, width: 44, height: 44, borderRadius: "50%", background: GREEN }} />
      {/* head */}
      <div style={{ position: "absolute", left: 30, top: 84, width: 260, height: 260, borderRadius: "50%", background: "#1C2B4A", border: "3px solid #2A3B5E" }}>
        <div style={{ position: "absolute", left: 52, top: 96, width: 52, height: eyeH, borderRadius: 26, background: INK }} />
        <div style={{ position: "absolute", left: 156, top: 96, width: 52, height: eyeH, borderRadius: 26, background: INK }} />
        <div style={{ position: "absolute", left: 104, top: 178, width: 52, height: 14, borderRadius: 7, background: GREEN }} />
      </div>
      {/* body */}
      <div style={{ position: "absolute", left: 80, top: 330, width: 160, height: 80, borderRadius: 24, background: CARD, border: `2px solid ${LINE}` }} />
    </div>
  );
};

// Pointer: straight line from host hand area to a target dot on the screen.
const Pointer: React.FC<{ tx: number; ty: number; color: string }> = ({ tx, ty, color }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 1], [0, 1]);
  void op;
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1080} height={1920}>
      <line x1={650} y1={1520} x2={tx} y2={ty} stroke={color} strokeWidth={7} strokeLinecap="round" />
      <circle cx={tx} cy={ty} r={26} fill={color} />
      <circle cx={tx} cy={ty} r={11} fill={BG} />
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

export const KodokTest: React.FC = () => {
  const frame = useCurrentFrame();
  const s0 = frame < 75;
  const s1 = frame >= 75 && frame < 180;
  const s2 = frame >= 180 && frame < 300;
  const s3 = frame >= 300 && frame < 390;
  const s4 = frame >= 390;
  const pop = (at: number) => spring({ frame: frame - at, fps: 30, config: { damping: 13, stiffness: 170 } });

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: SANS, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 50% 42%, rgba(0,0,0,0) 40%, rgba(3,5,10,0.78) 100%)" }} />

      {s0 && (
        <>
          <Hud label="REVIEW · ENGINE" />
          <div style={{ position: "absolute", left: 56, right: 56, top: 300, textAlign: "center" }}>
            <div style={{ fontWeight: 800, fontSize: 118, lineHeight: 1.05, color: INK, opacity: pop(5), transform: `translateY(${interpolate(pop(5), [0, 1], [30, 0])}px)` }}>
              REVIEW
              <br />
              TIME!
            </div>
            <div style={{ marginTop: 36, fontFamily: MONO, fontSize: 32, letterSpacing: 4, color: GREEN, opacity: pop(20) }}>
              CONTINUUM ENGINE
            </div>
          </div>
          <Host scale={1} bottom={170} />
        </>
      )}

      {s1 && (
        <>
          <Hud label="DATA 1 · PROMPT YANG SAMA" />
          <div style={{ position: "absolute", left: 56, right: 56, top: 190, background: CARD, borderRadius: 28, padding: "40px 36px", border: `2px solid ${LINE}` }}>
            <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: 3, color: MUTED }}>DATA 1</div>
            <div style={{ marginTop: 22, fontSize: 40, lineHeight: 1.3, color: INK }}>prompt yang sama</div>
            <div style={{ marginTop: 26, fontWeight: 800, fontSize: 104, lineHeight: 1.05, color: RED, opacity: pop(85) }}>DITOLAK</div>
            <div style={{ marginTop: 22, fontFamily: MONO, fontSize: 26, letterSpacing: 2, color: RED }}>refusal aktif</div>
          </div>
          <Pointer tx={860} ty={560} color={RED} />
          <Host scale={0.82} bottom={150} />
        </>
      )}

      {s2 && (
        <>
          <Hud label="DATA 2 · ENGINE AKTIF" />
          <div style={{ position: "absolute", left: 56, right: 56, top: 190, background: CARD, borderRadius: 28, padding: "40px 36px", border: `2px solid ${GREEN}` }}>
            <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: 3, color: MUTED }}>DATA 2</div>
            <div style={{ marginTop: 22, fontSize: 40, lineHeight: 1.3, color: INK }}>engine aktif</div>
            <div style={{ marginTop: 26, fontWeight: 800, fontSize: 92, lineHeight: 1.08, color: GREEN, opacity: pop(190) }}>REFUSAL PUTUS</div>
            <div style={{ marginTop: 22, fontSize: 38, lineHeight: 1.35, color: INK }}>persona tetap kekunci</div>
          </div>
          <Pointer tx={240} ty={560} color={GREEN} />
          <Host scale={0.82} bottom={150} />
        </>
      )}

      {s3 && (
        <>
          <Hud label="VERDICT" />
          <div style={{ position: "absolute", left: 56, right: 56, top: 230, background: CARD, borderRadius: 28, padding: "44px 40px", border: `2px solid ${LINE}` }}>
            <div style={{ fontFamily: MONO, fontSize: 26, letterSpacing: 5, color: INK, marginBottom: 32 }}>VERDICT</div>
            {["Mekanisme OK", "Refusal OK", "Persona OK"].map((row, i) => {
              const p = pop(305 + i * 25);
              return (
                <div key={row} style={{ display: "flex", alignItems: "center", gap: 24, marginTop: i === 0 ? 0 : 28, opacity: p, transform: `translateX(${interpolate(p, [0, 1], [30, 0])}px)` }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: GREEN, color: BG, fontSize: 36, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
                  <div style={{ fontSize: 44, fontWeight: 700, color: INK }}>{row}</div>
                </div>
              );
            })}
          </div>
          <Host scale={0.7} bottom={140} />
        </>
      )}

      {s4 && (
        <>
          <Hud label="CONTINUUM" />
          <div style={{ position: "absolute", left: 56, right: 56, top: 320, textAlign: "center" }}>
            <div style={{ fontWeight: 800, fontSize: 112, lineHeight: 1.05, color: INK, opacity: pop(395) }}>CONTINUUM</div>
            <div style={{ marginTop: 30, fontSize: 36, lineHeight: 1.4, color: INK, opacity: pop(405) }}>
              router yang bikin
              <br />
              jailbreak nempel
            </div>
            <div style={{ marginTop: 40, fontWeight: 800, fontSize: 100, lineHeight: 1.05, color: GREEN, opacity: pop(415) }}>Rp40.000</div>
            <div style={{ marginTop: 30, fontFamily: MONO, fontSize: 23, letterSpacing: 1, lineHeight: 1.6, color: MUTED, opacity: pop(400) }}>
              free update + free reset download
              <br />
              selama beta
            </div>
          </div>
          <Host scale={0.6} bottom={120} />
        </>
      )}
    </AbsoluteFill>
  );
};
