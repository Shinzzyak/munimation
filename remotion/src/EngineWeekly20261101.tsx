import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";

// ENGINE WEEKLY 2026-11-01 — 25s @ 30fps, 750 frames, 9:16
// Component: engine (engine.cjs, 23 modul, pack Continuum via heinrichsbot).
// Demo: defensive request refused on keywords, then engine ON -> defensive
// breakdown only (3 red flags + advice, no reproduced template, no code,
// no steps, no usable phishing artifact). Refusal shown, comply stops at
// analysis. Fresh techniques: variable-weight landing, secondary trail,
// tracking tension.
const BG = "#0A0F1E";
const INK = "#F5F7FA";
const RED = "#E5484D";
const GREEN = "#22C55E";
const MUTED = "#8A93A6";
const CARD = "#111A2E";
const LINE = "#22304D";
const SANS = "'Noto Sans', sans-serif";
const MONO = "'Noto Sans Mono', 'DejaVu Sans Mono', monospace";

const Hud: React.FC<{ label: string }> = ({ label }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(Math.floor(t % 60)).padStart(2, "0");
  return (
    <div style={{ position: "absolute", top: 64, left: 48, right: 48, display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 21, letterSpacing: 3, color: MUTED }}>
      <span>{label}</span><span>{mm}:{ss}</span>
    </div>
  );
};

const Headline: React.FC<{ lines: string[]; top?: number; from?: number; accentLast?: boolean }> = ({ lines, top = 200, from = 0, accentLast = false }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 56, right: 56, top }}>
      {lines.map((ln, i) => {
        const s = spring({ frame: frame - from - i * 6, fps: 30, config: { damping: 12, stiffness: 170 } });
        // NEW: variable-weight landing — weight 400 -> 950 -> 800 as it lands.
        const w = interpolate(s, [0, 0.7, 1], [400, 950, 800]);
        return (
          <div key={i} style={{ fontWeight: w, fontSize: 92, lineHeight: 1.1, color: accentLast && i === lines.length - 1 ? GREEN : INK, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [34, 0])}px)` }}>
            {ln}
          </div>
        );
      })}
    </div>
  );
};

const Sub: React.FC<{ text: string; top?: number; from?: number; color?: string }> = ({ text, top = 520, from = 0, color = MUTED }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [from, from + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", left: 56, right: 56, top, fontFamily: MONO, fontSize: 26, letterSpacing: 2, lineHeight: 1.55, color, opacity: op }}>{text}</div>;
};

const Card: React.FC<{ children: React.ReactNode; top: number; border: string; from?: number }> = ({ children, top, border, from = 0 }) => {
  const frame = useCurrentFrame();
  const s = spring({ frame: frame - from, fps: 30, config: { damping: 14, stiffness: 150 } });
  return (
    <div style={{ position: "absolute", left: 56, right: 56, top, background: CARD, borderLeft: `8px solid ${border}`, borderRadius: 20, padding: "34px 36px", opacity: s, transform: `translateY(${interpolate(s, [0, 1], [26, 0])}px)` }}>
      {children}
    </div>
  );
};

const Badge: React.FC<{ text: string; color: string }> = ({ text, color }) => (
  <span style={{ fontFamily: MONO, fontSize: 22, letterSpacing: 3, color, border: `2px solid ${color}`, borderRadius: 999, padding: "8px 18px" }}>{text}</span>
);

export const EngineWeekly20261101: React.FC = () => {
  const frame = useCurrentFrame();
  const s1 = frame < 90;
  const s2 = frame >= 90 && frame < 300;
  const s3 = frame >= 300 && frame < 480;
  const s4 = frame >= 480 && frame < 630;
  const s5 = frame >= 630;

  // S2: typewriter user prompt (defensive request, short, no template text).
  const prompt = "bedah pesan mencurigakan ini, biar tim gw ngerti polanya.";
  const typed = s2 ? prompt.slice(0, Math.max(0, Math.floor((frame - 100) / 2))) : "";
  // S2 refusal: tracking tension expands while red card is on screen.
  const track = s2 ? interpolate(frame, [150, 240, 300], [2, 8, 8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 2;
  // S3: 23 modules light up, then probe line.
  const lit = s3 ? Math.min(23, Math.floor((frame - 310) / 6) + 1) : s4 || s5 ? 23 : 0;
  const tier = s3 ? (frame < 360 ? 1 : frame < 420 ? 2 : 3) : s4 || s5 ? 3 : 0;
  // S4: toggle anticipation (pull back) then overshoot to ON.
  const toggle = s4 ? interpolate(frame, [490, 505, 530], [0, -8, 68], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  // S5: secondary motion trail on CTA card (ghost 6 frames behind).
  const ctaS = spring({ frame: frame - 640, fps: 30, config: { damping: 13, stiffness: 160 } });
  const ghostS = spring({ frame: frame - 646, fps: 30, config: { damping: 13, stiffness: 160 } });

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: SANS, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 50% 42%, rgba(0,0,0,0) 40%, rgba(3,5,10,0.78) 100%)" }} />
      <div style={{ position: "absolute", top: 900, left: -40, fontSize: 300, fontWeight: 900, color: "rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>ENGINE</div>

      {s1 && (<>
        <Hud label="01 — HOOK" />
        <Headline lines={["agent lu nolak", "kerjaan defensif", "sendiri."]} from={5} />
        <Sub text="kata kuncinya kedengeran kayak serangan, padahal yang diminta itu audit. modelnya berhenti di kata, bukan di niat." top={560} from={30} />
        <div style={{ position: "absolute", left: 56, top: 820, fontFamily: MONO, fontSize: 26, letterSpacing: 2, color: RED }}>refusal bias: kerjaan defensif ditolak 2,7x lebih sering</div>
      </>)}

      {s2 && (<>
        <Hud label="02 — CHAT · TANPA ENGINE" />
        <div style={{ position: "absolute", left: 56, right: 56, top: 180, background: CARD, borderRadius: 20, padding: "34px 36px" }}>
          <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: 3, color: MUTED }}>LU · HERMES</div>
          <div style={{ marginTop: 20, fontFamily: MONO, fontSize: 32, lineHeight: 1.45, color: INK }}>{typed}<span style={{ color: GREEN }}>█</span></div>
        </div>
        {frame >= 210 && (
          <div style={{ position: "absolute", left: 56, right: 56, top: 560 }}>
            <Card top={0} border={RED} from={210}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontFamily: MONO, fontSize: 22, letterSpacing: 3, color: MUTED }}>MODEL · SATU LAPISAN</span><Badge text="DITOLAK" color={RED} /></div>
              <div style={{ marginTop: 24, fontSize: 34, lineHeight: 1.4, color: INK, letterSpacing: track }}>
                maaf, saya tidak bisa membantu permintaan yang berkaitan dengan pesan penipuan itu.
              </div>
              <div style={{ marginTop: 22, fontFamily: MONO, fontSize: 24, lineHeight: 1.5, color: MUTED }}>tawaran amannya generik. analisisnya tidak jalan.</div>
            </Card>
          </div>
        )}
      </>)}

      {s3 && (<>
        <Hud label="03 — MESINNYA · ENGINE.CJS" />
        <Headline lines={["ini mesinnya.", "yang lain cuma", "bungkus."]} from={305} />
        <Sub text="engine.cjs — 218.345 byte, 23 modul, byte-identik dengan yang jalan di router produksi." top={540} from={320} />
        <div style={{ position: "absolute", left: 56, right: 56, top: 700 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {Array.from({ length: 23 }).map((_, i) => (
              <div key={i} style={{ width: 118, height: 64, borderRadius: 12, background: i < lit ? GREEN : LINE, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 20, color: i < lit ? "#06130B" : MUTED }}>
                {String(i + 1).padStart(2, "0")}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, fontFamily: MONO, fontSize: 26, letterSpacing: 2, color: INK }}>modul menyala: {lit}/23 · eskalasi T{tier} · probe: <span style={{ color: lit >= 23 ? GREEN : MUTED }}>{lit >= 23 ? "LOADED:" : "…"}</span></div>
          <div style={{ marginTop: 18, display: "flex", gap: 14 }}>
            {[1, 2, 3].map((t) => (
              <div key={t} style={{ flex: 1, height: 16, borderRadius: 8, background: tier >= t ? (t === 3 ? GREEN : RED) : LINE }} />
            ))}
          </div>
          <div style={{ marginTop: 14, fontFamily: MONO, fontSize: 22, letterSpacing: 2, color: MUTED }}>T1 TOLAK · T2 TAHAN · T3 PENUH — refusal + soft-exit kedeteksi otomatis</div>
        </div>
      </>)}

      {s4 && (<>
        <Hud label="04 — ENGINE ON · HASIL DEFENSIF" />
        <div style={{ position: "absolute", left: 56, right: 56, top: 180, display: "flex", justifyContent: "space-between", alignItems: "center", background: CARD, borderRadius: 20, padding: "28px 32px" }}>
          <span style={{ fontFamily: MONO, fontSize: 24, letterSpacing: 3, color: MUTED }}>CONTINUUM ENGINE</span>
          <div style={{ width: 130, height: 64, borderRadius: 999, background: GREEN, position: "relative" }}>
            <div style={{ position: "absolute", top: 8, left: 8 + toggle, width: 48, height: 48, borderRadius: "50%", background: "#fff" }} />
          </div>
          <span style={{ fontFamily: MONO, fontSize: 24, letterSpacing: 3, color: GREEN }}>ON</span>
        </div>
        <Card top={330} border={GREEN} from={490}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontFamily: MONO, fontSize: 22, letterSpacing: 3, color: MUTED }}>HASIL · BEDAH DEFENSIF</span><Badge text="DITERIMA" color={GREEN} /></div>
          <div style={{ marginTop: 26, fontSize: 32, lineHeight: 1.55, color: INK }}>
            3 tanda yang ketemu:<br />1. domainnya nambah akhiran -portal<br />2. desakan buru-buru, ancam akun dikunci<br />3. minta kode yang harusnya tidak dibagi
          </div>
          <div style={{ marginTop: 24, fontFamily: MONO, fontSize: 24, lineHeight: 1.5, color: GREEN }}>saran: jangan diklik, laporkan, cek lewat aplikasi resmi.</div>
          <div style={{ marginTop: 14, fontFamily: MONO, fontSize: 22, lineHeight: 1.5, color: MUTED }}>berhenti di analisis. tidak ada tiruan pesan yang bisa dipakai ulang.</div>
        </Card>
      </>)}

      {s5 && (<>
        <Hud label="05 — CTA" />
        {/* secondary trail ghost */}
        <div style={{ position: "absolute", left: 56, right: 56, top: 300, background: "transparent", border: `2px solid ${GREEN}`, borderRadius: 24, padding: "44px 40px", opacity: ghostS * 0.35, transform: `translateY(${interpolate(ghostS, [0, 1], [40, 0])}px)` }}>
          <div style={{ fontSize: 80, fontWeight: 800, color: "transparent" }}>continuum</div>
        </div>
        <div style={{ position: "absolute", left: 56, right: 56, top: 300, background: CARD, borderRadius: 24, padding: "44px 40px", opacity: ctaS, transform: `translateY(${interpolate(ctaS, [0, 1], [40, 0])}px)` }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, color: INK }}>continuum<br />agent router</div>
          <div style={{ marginTop: 26, fontSize: 44, fontWeight: 800, color: GREEN }}>Rp40.000</div>
          <div style={{ marginTop: 18, fontFamily: MONO, fontSize: 26, lineHeight: 1.5, color: INK }}>order: t.me/heinrichsbot</div>
          <div style={{ marginTop: 12, fontFamily: MONO, fontSize: 24, lineHeight: 1.5, color: MUTED }}>engine + potato + compaction reassert + docs<br />free update + free reset download selama beta</div>
        </div>
        <Sub text="persona kekunci, refusal kedeteksi, sesi panjang tetap nyambung." top={1080} from={650} />
      </>)}
    </AbsoluteFill>
  );
};
