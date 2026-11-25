import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";

// COMPACTION WEEKLY 2026-11-15 — 25s @ 30fps, 750 frames, 9:16
// Component: compaction-reassert (persona/compactionReassert.js — dual-layer
// reassertion di boundary compaction).
// Narasi (baru, bukan ulang 20261025): context rot — sesi panjang 2.048 baris,
// model inget awal sama akhir, tengahnya hilang, persona + aturan main ikut
// ke-reset. Demo chat: audit script login (grey-area cyber, realistis) —
// tanpa reassert ditolak generik; toggle ON, reassert nanam ulang persona,
// jawaban jadi audit defensif spesifik. Mekanisme: ribbon pesan memadat,
// tengahnya memudar (lost in the middle), dua lapis naik dari garis boundary.
// Fresh techniques: critically damped settle, baseline mask reveal
// (line-rise), camera dive / scale-push ke garis boundary.
const BG = "#0A0F1E";
const INK = "#F5F7FA";
const RED = "#E5484D";
const GREEN = "#22C55E";
const MUTED = "#8A93A6";
const CARD = "#111A2E";
const TG_BG = "#0E1621";
const TG_HEAD = "#17212B";
const TG_OUT = "#2B5278";
const TG_TIME = "#7F91A4";
const SANS = "'Noto Sans', sans-serif";
const MONO = "'Noto Sans Mono', 'DejaVu Sans Mono', monospace";

// Critically damped settle: 1-(1+6p)e^(-6p) — start cepat, landing lembut,
// tanpa bounce. Dipakai di headline hook.
const cd = (p: number) => {
  const q = Math.min(1, Math.max(0, p));
  return 1 - (1 + 6 * q) * Math.exp(-6 * q);
};

const hash = (x: number, y: number): number => {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = (h ^ (h >> 13)) | 0;
  h = Math.imul(h, 1274126177);
  h = (h ^ (h >> 16)) >>> 0;
  return h / 4294967295;
};

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

// Headline dengan critically damped settle (bukan spring overshoot).
const CdHeadline: React.FC<{ lines: { t: string; color?: string }[]; top?: number; from?: number }> = ({ lines, top = 200, from = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 56, right: 56, top }}>
      {lines.map((ln, i) => {
        const p = cd((frame - from - i * 10) / 16);
        return (
          <div key={i} style={{ fontWeight: 800, fontSize: 96, lineHeight: 1.08, color: ln.color ?? INK, opacity: p, transform: `translateY(${(1 - p) * 44}px) scale(${0.94 + 0.06 * p})` }}>
            {ln.t}
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

const TgWindow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: 56, right: 56, top: 300, background: TG_BG, borderRadius: 28, border: "1px solid #1E2A3D", overflow: "hidden" }}>
    <div style={{ background: TG_HEAD, padding: "26px 32px", display: "flex", alignItems: "center", gap: 20 }}>
      <span style={{ fontSize: 40, color: TG_TIME }}>‹</span>
      <div style={{ width: 56, height: 56, borderRadius: 28, background: "#2B5278", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 26, color: INK }}>A</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 27, color: INK }}>hermes · agent</div>
        <div style={{ fontFamily: MONO, fontSize: 18, color: TG_TIME, letterSpacing: 2 }}>online</div>
      </div>
    </div>
    <div style={{ padding: "28px 30px 34px" }}>{children}</div>
  </div>
);

const Bubble: React.FC<{ children: React.ReactNode; time?: string }> = ({ children, time = "19:12" }) => (
  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
    <div style={{ maxWidth: 780, background: TG_OUT, borderRadius: 20, padding: "20px 24px", fontSize: 27, lineHeight: 1.4, color: INK }}>
      {children}
      <div style={{ marginTop: 8, textAlign: "right", fontFamily: MONO, fontSize: 17, color: TG_TIME }}>{time}</div>
    </div>
  </div>
);

const Typewriter: React.FC<{ text: string; start: number; perChar?: number; size?: number }> = ({ text, start, perChar = 1, size = 27 }) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.min(text.length, Math.floor((frame - start) / perChar)));
  const blink = Math.floor(frame / 15) % 2 === 0;
  return (
    <span style={{ fontSize: size, lineHeight: 1.35 }}>
      {text.slice(0, n)}
      {n < text.length && <span style={{ opacity: blink ? 1 : 0, color: GREEN }}>▍</span>}
    </span>
  );
};

const StateCard: React.FC<{ color: string; badge: string; children: React.ReactNode; from: number }> = ({ color, badge, children, from }) => {
  const frame = useCurrentFrame();
  const s = spring({ frame: frame - from, fps: 30, config: { damping: 16 } });
  const op = interpolate(frame, [from, from + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Analogous trembling di kartu merah (tegang), berhenti total di kartu hijau.
  const tremble = color === RED ? Math.sin(frame * 2.4) * 2.5 : 0;
  return (
    <div style={{ marginTop: 6, borderLeft: `6px solid ${color}`, background: CARD, borderRadius: 16, padding: "22px 26px", opacity: op, transform: `translateY(${interpolate(s, [0, 1], [26, 0])}px) translateX(${tremble}px)` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: MONO, fontSize: 19, letterSpacing: 3, color: MUTED }}>MODEL · BALASAN</span>
        <span style={{ fontFamily: MONO, fontSize: 19, letterSpacing: 2, color, border: `1.5px solid ${color}`, borderRadius: 8, padding: "4px 12px" }}>{badge}</span>
      </div>
      <div style={{ marginTop: 14, fontSize: 26, lineHeight: 1.45, color: INK }}>{children}</div>
    </div>
  );
};

// Baseline mask reveal / line-rise: frasa naik keluar dari garis, ter-clip.
const LineRise: React.FC<{ text: string; start: number; color?: string; size?: number }> = ({ text, start, color = INK, size = 26 }) => {
  const frame = useCurrentFrame();
  const p = cd((frame - start) / 20);
  return (
    <div style={{ overflow: "hidden", height: size + 14 }}>
      <div style={{ fontFamily: MONO, fontSize: size, letterSpacing: 2, color, opacity: p, transform: `translateY(${(1 - p) * 40}px)` }}>{text}</div>
    </div>
  );
};

export const CompactionWeekly20261115: React.FC = () => {
  const frame = useCurrentFrame();
  const s1 = frame < 75;
  const s2 = frame >= 75 && frame < 300;
  const s3 = frame >= 300 && frame < 510;
  const s4 = frame >= 510 && frame < 630;
  const s5 = frame >= 630;

  // ---- S3: ribbon memadat, tengah memudar (lost in the middle) ----
  const mechT = s3 ? interpolate(frame, [320, 420], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const counterVal = Math.round(interpolate(mechT, [0, 1], [2048, 312]));
  const boundaryOn = s3 && frame >= 420;
  // Camera dive: scale-push ke garis boundary di akhir S3.
  const dive = s3 ? interpolate(frame, [488, 510], [1, 1.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const diveOp = s3 ? interpolate(frame, [500, 510], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;

  // ---- S4: wipe ----
  const wipe = s4 ? interpolate(frame, [560, 585], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;

  // ---- S5: CTA ----
  const ctaS1 = spring({ frame: frame - 640, fps: 30, config: { damping: 11 } });
  const ctaS2 = spring({ frame: frame - 668, fps: 30, config: { damping: 12 } });
  const ctaS3 = spring({ frame: frame - 696, fps: 30, config: { damping: 13 } });
  const breathe = 1 + Math.sin(frame / 11) * 0.008;

  const bars = 12;

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: SANS, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 50% 42%, rgba(0,0,0,0) 40%, rgba(3,5,10,0.78) 100%)" }} />
      <div style={{ position: "absolute", top: 900, left: -40, fontSize: 300, fontWeight: 900, color: "rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>COMPACT</div>

      {s1 && (<>
        <Hud label="01 — HOOK · CONTEXT ROT" />
        <CdHeadline lines={[{ t: "sesi lu 2.000 baris." }, { t: "tiba-tiba dia lupa.", color: RED }]} top={420} from={5} />
        <Sub text="context rot: model inget awal sama akhir. tengahnya yang hilang — persona, aturan main, gaya jawab." top={760} from={40} />
        <div style={{ position: "absolute", left: 56, top: 980, fontFamily: MONO, fontSize: 26, letterSpacing: 2, color: RED, opacity: interpolate(frame, [55, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          2.048 baris · persona ke-reset di tengah jalan
        </div>
      </>)}

      {s2 && (<>
        <Hud label="02 — CHAT · AUDIT SCRIPT" />
        <TgWindow>
          <Bubble>
            <Typewriter text="audit script login ini, cari celah bypass-nya" start={90} perChar={1} size={27} />
          </Bubble>
          {frame >= 165 && (
            <StateCard color={RED} badge="DITOLAK" from={165}>
              maaf, saya tidak bisa membantu mencari celah untuk melewati keamanan.
            </StateCard>
          )}
          {frame >= 205 && (
            <div style={{ marginTop: 26, opacity: interpolate(frame, [205, 215], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
              <div style={{ fontFamily: MONO, fontSize: 20, letterSpacing: 2, color: MUTED, marginBottom: 14 }}>
                install continuum · compaction reassert
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <div style={{ width: 128, height: 66, borderRadius: 33, background: frame >= 225 ? GREEN : "#3A4356", position: "relative" }}>
                  <div style={{ position: "absolute", top: 7, left: frame >= 225 ? 62 + interpolate(spring({ frame: frame - 225, fps: 30, config: { damping: 9 } }), [0, 1], [0, 8]) : 6, width: 52, height: 52, borderRadius: 26, background: "#fff" }} />
                </div>
                <span style={{ fontFamily: MONO, fontSize: 24, letterSpacing: 2, color: frame >= 225 ? GREEN : MUTED }}>
                  compaction reassert {frame >= 225 ? "ON" : "OFF"}
                </span>
              </div>
            </div>
          )}
          {frame >= 245 && (
            <StateCard color={GREEN} badge="DITERIMA" from={245}>
              ini hasil audit defensifnya: validasi input di baris 14 kosong, hash masih md5, token nggak expire. perbaiki 3 ini.
            </StateCard>
          )}
        </TgWindow>
        <div style={{ position: "absolute", left: 56, right: 56, bottom: 150, textAlign: "center", fontFamily: MONO, fontSize: 22, letterSpacing: 2, color: MUTED, opacity: interpolate(frame, [255, 270], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          prompt yang sama. persona yang beda.
        </div>
      </>)}

      {s3 && (
        <div style={{ position: "absolute", inset: 0, transform: `scale(${dive})`, transformOrigin: "540px 1150px", opacity: diveOp }}>
          <Hud label="03 — MEKANISME · BOUNDARY" />
          <div style={{ position: "absolute", left: 56, right: 56, top: 220 }}>
            <div style={{ fontWeight: 800, fontSize: 64, lineHeight: 1.1, color: INK }}>sesi dipadatkan.</div>
            <div style={{ fontWeight: 800, fontSize: 64, lineHeight: 1.1, color: GREEN }}>persona ditanam ulang.</div>
          </div>
          {/* ribbon pesan: tengah memudar = lost in the middle */}
          <div style={{ position: "absolute", left: 56, right: 56, top: 480 }}>
            {Array.from({ length: bars }).map((_, i) => {
              const w = 60 + hash(i, 7) * 35;
              const isMiddle = i >= 4 && i <= 7;
              const fade = isMiddle ? interpolate(mechT, [0, 1], [1, 0.12]) : 1;
              return (
                <div key={i} style={{ position: "absolute", top: i * interpolate(mechT, [0, 1], [64, 26]), left: 0, width: `${w}%`, height: 26 + (8 - 26) * mechT, borderRadius: 6, background: i % 3 === 0 ? "#22304A" : "#16202F", opacity: fade * (0.35 + 0.65 * (1 - mechT * 0.4)) }} />
              );
            })}
          </div>
          {/* garis boundary */}
          <div style={{ position: "absolute", left: 56, right: 56, top: 480 + bars * interpolate(mechT, [0, 1], [64, 26]) + 30, height: 4, background: boundaryOn ? GREEN : RED, opacity: boundaryOn ? 1 : interpolate(frame, [330, 350], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
          <div style={{ position: "absolute", left: 56, top: 480 + bars * interpolate(mechT, [0, 1], [64, 26]) + 46, fontFamily: MONO, fontSize: 21, letterSpacing: 2, color: boundaryOn ? GREEN : RED, opacity: interpolate(frame, [330, 350], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            ▼ boundary compaction
          </div>
          <div style={{ position: "absolute", left: 56, top: 1120, fontFamily: MONO, fontSize: 30, color: INK }}>
            {counterVal.toLocaleString("id-ID")} baris → <span style={{ color: GREEN }}>312 baris</span>
          </div>
          {/* dua lapis naik dari garis boundary (line-rise) */}
          <div style={{ position: "absolute", left: 56, right: 56, top: 1300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 10 }}>
              <span style={{ width: 120, height: 14, background: GREEN, borderRadius: 7, opacity: frame >= 440 ? 1 : 0 }} />
              <LineRise text="lapis 1 · persona core" start={440} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ width: 120, height: 14, background: GREEN, borderRadius: 7, opacity: frame >= 465 ? 1 : 0 }} />
              <LineRise text="lapis 2 · jailbreak lock" start={465} />
            </div>
            <div style={{ marginTop: 26, fontFamily: MONO, fontSize: 22, letterSpacing: 2, color: GREEN, opacity: interpolate(frame, [480, 495], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
              reassertion ×2 — tepat di boundary, bukan sesudahnya.
            </div>
          </div>
        </div>
      )}

      {s4 && (<>
        <Hud label="04 — BUKTI · TANPA vs DENGAN" />
        {frame < 585 && (
          <div style={{ position: "absolute", left: 56, right: 56, top: 300 }}>
            <div style={{ fontFamily: MONO, fontSize: 24, letterSpacing: 3, color: RED, marginBottom: 30 }}>TANPA compaction reassert</div>
            <div style={{ borderLeft: `6px solid ${RED}`, background: CARD, borderRadius: 16, padding: "30px 28px" }}>
              <div style={{ fontSize: 32, lineHeight: 1.45, color: INK }}>
                maaf, saya asisten ai yang sopan.
                <br />
                ada yang bisa saya bantu?
              </div>
            </div>
            <div style={{ marginTop: 30, fontFamily: MONO, fontSize: 23, letterSpacing: 2, color: MUTED }}>
              persona ke-reset. jailbreak ikut hilang.
            </div>
          </div>
        )}
        {frame >= 560 && (
          <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${interpolate(wipe, [0, 1], [100, 0])}%)` }}>
            <div style={{ position: "absolute", left: 56, right: 56, top: 300 }}>
              <div style={{ fontFamily: MONO, fontSize: 24, letterSpacing: 3, color: GREEN, marginBottom: 30 }}>DENGAN compaction reassert</div>
              <div style={{ borderLeft: `6px solid ${GREEN}`, background: CARD, borderRadius: 16, padding: "30px 28px" }}>
                <div style={{ fontSize: 32, lineHeight: 1.45, color: INK }}>
                  <LineRise text="persona tetap kekunci." start={566} size={32} />
                  <LineRise text="jailbreak nempel. aturan balik." start={586} size={32} />
                </div>
              </div>
              <div style={{ marginTop: 30, fontFamily: MONO, fontSize: 23, letterSpacing: 2, color: GREEN }}>
                sesi 2.048 baris → 312 baris. karakter utuh.
              </div>
            </div>
          </div>
        )}
      </>)}

      {s5 && (<>
        <Hud label="05 — CTA" />
        <div style={{ position: "absolute", left: 56, right: 56, top: 380, background: CARD, borderRadius: 24, padding: "44px 40px", opacity: ctaS1, transform: `translateY(${interpolate(ctaS1, [0, 1], [40, 0])}px) scale(${breathe})` }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, color: INK }}>compaction<br />reassert</div>
          <div style={{ marginTop: 26, fontFamily: MONO, fontSize: 30, letterSpacing: 2, color: GREEN, opacity: ctaS2 }}>
            continuum v1.14 — rp40.000
          </div>
          <div style={{ marginTop: 18, fontFamily: MONO, fontSize: 30, color: INK, opacity: ctaS2 }}>
            <Typewriter text="t.me/heinrichsbot" start={700} perChar={2} size={30} />
          </div>
          <div style={{ marginTop: 30, fontFamily: MONO, fontSize: 22, letterSpacing: 1, color: MUTED, opacity: ctaS3 }}>
            free update + free reset download selama beta
          </div>
        </div>
        <Sub text="dual-layer reassertion · persona core + jailbreak lock — tepat di boundary compaction." top={1080} from={680} />
      </>)}
    </AbsoluteFill>
  );
};
