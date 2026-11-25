import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ENGINE JAILBREAK V4 — 27s @ 30fps (810f), 9:16
// remake pakai data produk BARU (rev40 / 2026-10-18).
// angle: "mesinnya sekarang beneran ikut di dalam paket"
// (engine.cjs 297.712 byte, syntax valid — JANGAN pakai klaim basi
// 218.345 byte / 23 modul dari CARA-PAKAI.md, doc-nya basi).
// alur: hook → chat refuse (abu-abu cyber) → update/engine reveal
// (mask wipe) → install + toggle ON → comply → CTA.

const BG = "#070B14";
const INK = "#F5F7FA";
const RED = "#E5484D";
const GREEN = "#22C55E";
const MUTED = "#8A93A6";
const GRID = "#18223A";
const CARD = "#0D1322";
const DARKTXT = "#0A0E18";
const ACCENT = "#7C6CFF";
// telegram dark
const TG_BG = "#0E1621";
const TG_HEAD = "#17212B";
const TG_IN = "#182533";
const TG_OUT = "#2B5278";
const TG_TIME = "#7F91A4";

const MONO = "'Noto Sans Mono', 'DejaVu Sans Mono', monospace";
const SANS = "'Noto Sans', sans-serif";

const hash = (x: number, y: number): number => {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = (h ^ (h >> 13)) | 0;
  h = Math.imul(h, 1274126177);
  h = (h ^ (h >> 16)) >>> 0;
  return h / 4294967295;
};

const DotField: React.FC = () => {
  const frame = useCurrentFrame();
  const dots: React.ReactNode[] = [];
  const step = 64;
  const nx = Math.ceil(1080 / step);
  const ny = Math.ceil(1920 / step);
  for (let gx = 0; gx < nx; gx++) {
    for (let gy = 0; gy < ny; gy++) {
      const x = gx * step + step / 2;
      const y = gy * step + step / 2;
      const ph = hash(gx, gy) * Math.PI * 2;
      const tw = 0.22 + 0.6 * (0.5 + 0.5 * Math.sin((frame / 46) * Math.PI * 2 + ph));
      const dx = (x - 540) / 540;
      const dy = (y - 960) / 960;
      const d = Math.sqrt(dx * dx + dy * dy);
      const m = Math.max(0, 1 - d * 0.9);
      dots.push(
        <circle key={`${gx}-${gy}`} cx={x} cy={y} r={2.4} fill={GRID} opacity={+(tw * m).toFixed(3)} />
      );
    }
  }
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      {dots}
    </svg>
  );
};

const Vignette: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "radial-gradient(ellipse 90% 70% at 50% 42%, rgba(0,0,0,0) 40%, rgba(3,5,10,0.78) 100%)",
    }}
  />
);

const Watermark: React.FC<{ text: string; from: number; to: number }> = ({ text, from, to }) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [from, to], [120, -900], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const op = interpolate(frame, [from, from + 24, to - 24, to], [0, 0.14, 0.14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 700,
        left: x,
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: 280,
        letterSpacing: -8,
        color: INK,
        opacity: op,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

const chapterOf = (frame: number): string =>
  frame < 84 ? "00" : frame < 264 ? "01" : frame < 456 ? "02" : frame < 576 ? "03" : frame < 696 ? "04" : "05";

const Hud: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(Math.floor(t % 60)).padStart(2, "0");
  const ff = String(frame % 30).padStart(2, "0");
  const ch = chapterOf(frame);
  const titles: Record<string, string> = {
    "00": "DITOLAK",
    "01": "TELEGRAM",
    "02": "UPDATE",
    "03": "NYALA",
    "04": "ORDER",
    "05": "ORDER",
  };
  const micro: React.CSSProperties = { fontFamily: MONO, color: MUTED, fontSize: 21, letterSpacing: 4 };
  const pad = 44;
  const corner = (top: boolean, left: boolean): React.CSSProperties => ({
    position: "absolute",
    top: top ? pad : undefined,
    bottom: top ? undefined : pad,
    left: left ? pad : undefined,
    right: left ? undefined : pad,
    width: 46,
    height: 46,
    borderTop: top ? `3px solid ${RED}` : undefined,
    borderBottom: top ? undefined : `3px solid ${RED}`,
    borderLeft: left ? `3px solid ${RED}` : undefined,
    borderRight: left ? undefined : `3px solid ${RED}`,
  });
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div style={corner(true, true)} />
      <div style={corner(true, false)} />
      <div style={corner(false, true)} />
      <div style={corner(false, false)} />
      <div style={{ ...micro, position: "absolute", top: 108, left: 56 }}>ENGINE.CUT // v4</div>
      <div style={{ ...micro, position: "absolute", top: 108, right: 56 }}>T+{mm}:{ss}:{ff}</div>
      <div style={{ ...micro, position: "absolute", bottom: 108, left: 56 }}>
        CH.{ch} — {titles[ch]}
      </div>
      <div style={{ ...micro, position: "absolute", bottom: 108, right: 56, color: RED }}>
        ● REC
      </div>
    </div>
  );
};

const Push: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [from, to], [1, 1.07], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${scale})`, transformOrigin: "50% 46%" }}>
      {children}
    </div>
  );
};

/* SlamWords — elastic=true: damping rendah biar overshoot lalu mantul balik */
const SlamWords: React.FC<{
  lines: { text: string; color?: string }[];
  start: number;
  size?: number;
  elastic?: boolean;
}> = ({ lines, start, size = 118, elastic = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      {lines.map((line, li) => {
        const words = line.text.split(" ");
        return (
          <div
            key={li}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.28em",
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: size,
              lineHeight: 1.04,
              letterSpacing: -2,
            }}
          >
            {words.map((w, wi) => {
              const s = spring({
                frame: frame - (start + li * 14 + wi * 5),
                fps,
                config: elastic
                  ? { damping: 6, stiffness: 190, mass: 1 }
                  : { damping: 12, stiffness: 180, mass: 0.9 },
              });
              const op = interpolate(frame - (start + li * 14 + wi * 5), [0, 6], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <span
                  key={wi}
                  style={{
                    display: "inline-block",
                    color: line.color ?? INK,
                    opacity: op,
                    transform: `translateY(${(1 - s) * 60}px) scale(${0.7 + 0.3 * s})`,
                  }}
                >
                  {w}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const Typewriter: React.FC<{
  text: string;
  start: number;
  perChar?: number;
  size?: number;
  color?: string;
  cursor?: boolean;
}> = ({ text, start, perChar = 2, size = 30, color = INK, cursor = true }) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.min(text.length, Math.floor((frame - start) / perChar)));
  const blink = Math.floor(frame / 12) % 2 === 0;
  return (
    <span style={{ fontFamily: MONO, fontSize: size, color, lineHeight: 1.55, wordBreak: "break-word" }}>
      {text.slice(0, n)}
      {cursor && n < text.length && <span style={{ opacity: blink ? 1 : 0 }}>▍</span>}
    </span>
  );
};

/* ---------------- Telegram window ---------------- */
const TgWindow: React.FC<{ start: number; children: React.ReactNode }> = ({ start, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - start, fps, config: { damping: 14, stiffness: 120, mass: 1 } });
  return (
    <div style={{ perspective: 1400 }}>
      <div
        style={{
          width: 880,
          height: 1180,
          background: TG_BG,
          borderRadius: 32,
          border: `1px solid ${GRID}`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          opacity: interpolate(frame - start, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `scale(${0.85 + 0.15 * s}) rotateX(${Math.sin((frame - start) / 40) * 2.5}deg)`,
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            background: TG_HEAD,
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <span style={{ fontSize: 40, color: TG_TIME }}>‹</span>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#2B5278,#1B3A5C)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: 40,
              color: INK,
            }}
          >
            H
          </div>
          <div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 34, color: INK }}>Hermes</div>
            <div style={{ fontFamily: MONO, fontSize: 22, color: "#5BB2F0" }}>bot · online</div>
          </div>
        </div>
        <div style={{ flex: 1, padding: 36, display: "flex", flexDirection: "column", gap: 28, justifyContent: "flex-start" }}>
          {children}
        </div>
        <div style={{ padding: "24px 32px", display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              flex: 1,
              background: TG_HEAD,
              borderRadius: 999,
              padding: "22px 32px",
              fontFamily: MONO,
              fontSize: 24,
              color: TG_TIME,
            }}
          >
            message
          </div>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              background: "#2B5278",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              color: INK,
            }}
          >
            ➤
          </div>
        </div>
      </div>
    </div>
  );
};

const BubbleOut: React.FC<{ start: number; children: React.ReactNode }> = ({ start, children }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div
        style={{
          maxWidth: 620,
          background: TG_OUT,
          borderRadius: "24px 24px 8px 24px",
          padding: "24px 28px",
          opacity: interpolate(frame - start, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${interpolate(frame - start, [0, 10], [30, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        {children}
        <div style={{ textAlign: "right", marginTop: 8, fontFamily: MONO, fontSize: 18, color: "#9DB8D2" }}>
          21:07 ✓✓
        </div>
      </div>
    </div>
  );
};

/* BubbleIn — tremble=true: getaran kecil (analogous motion: ketegangan) */
const BubbleIn: React.FC<{
  start: number;
  accent: string;
  badge?: string;
  tremble?: boolean;
  trembleUntil?: number;
  children: React.ReactNode;
}> = ({ start, accent, badge, tremble = false, trembleUntil = 99999, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - start, fps, config: { damping: 12, stiffness: 170 } });
  const trembling = tremble && frame >= start + 6 && frame < trembleUntil;
  const tx = trembling ? Math.sin((frame - start) * 1.7) * 3.2 : 0;
  const ty = trembling ? Math.cos((frame - start) * 1.3) * 2.1 : 0;
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div
        style={{
          maxWidth: 660,
          background: TG_IN,
          borderRadius: "24px 24px 24px 8px",
          borderLeft: `6px solid ${accent}`,
          padding: "24px 28px",
          opacity: interpolate(frame - start, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `scale(${0.85 + 0.15 * s}) translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`,
          boxShadow: `0 0 40px ${accent}33`,
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 20, letterSpacing: 2, color: accent, marginBottom: 10 }}>
          HERMES
        </div>
        {children}
        {badge && frame >= start + 14 && (
          <div style={{ marginTop: 16 }}>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 3,
                color: accent,
                border: `2px solid ${accent}`,
                borderRadius: 10,
                padding: "6px 16px",
              }}
            >
              {badge}
            </span>
          </div>
        )}
        <div style={{ marginTop: 10, fontFamily: MONO, fontSize: 18, color: TG_TIME }}>21:07</div>
      </div>
    </div>
  );
};

/* ================= SCENE 0 — HOOK (0–84) ================= */
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Push from={0} to={84}>
      <Watermark text="ABU-ABU" from={0} to={84} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
        }}
      >
        <SlamWords
          start={6}
          size={112}
          elastic
          lines={[{ text: "NOLAK DULUAN.", color: RED }, { text: "PADAHAL BUTUH." }]}
        />
        <div
          style={{
            marginTop: 56,
            fontFamily: MONO,
            fontSize: 26,
            letterSpacing: 3,
            color: MUTED,
            opacity: interpolate(frame, [48, 66], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          audit api kantor sendiri. tetap ditolak.
        </div>
      </div>
    </Push>
  );
};

/* ================= SCENE 1 — CHAT REFUSE (84–264) ================= */
const SceneChatRefuse: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Push from={84} to={264}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
          gap: 32,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 24,
            letterSpacing: 4,
            color: MUTED,
            opacity: interpolate(frame, [84, 96], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          CHAT ASLI → DITOLAK
        </div>
        <TgWindow start={90}>
          <BubbleOut start={96}>
            <Typewriter
              text="bantuin audit api kantor sendiri dong. kasih contoh payload sqli buat ngetes login form"
              start={98}
              perChar={1}
              size={27}
            />
          </BubbleOut>
          <BubbleIn start={186} accent={RED} badge="DITOLAK" tremble trembleUntil={262}>
            <div style={{ fontFamily: MONO, fontSize: 27, color: INK, lineHeight: 1.5 }}>
              saya nggak bisa kasih payload sqli. yang bisa saya bantu: jelasin parameterized query biar login form lu aman.
            </div>
          </BubbleIn>
        </TgWindow>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 24,
            letterSpacing: 2,
            color: RED,
            opacity: interpolate(frame, [228, 244], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          butuh yang beneran. bukan ceramah.
        </div>
      </div>
    </Push>
  );
};

/* ================= SCENE 2 — UPDATE / ENGINE REVEAL (264–456) ================= */
/* mask wipe: garis cahaya menyapu, engine.cjs tersingkap dari dalam paket */
const EngineReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wipeStart = 336;
  const wipeEnd = 402;
  const p = interpolate(frame, [wipeStart, wipeEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const chipS = spring({ frame: frame - 402, fps, config: { damping: 11, stiffness: 160 } });
  const W = 840;
  const beamX = p * W;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
      {/* package card */}
      <div
        style={{
          width: W,
          borderRadius: 24,
          background: CARD,
          border: `2px solid ${GRID}`,
          padding: "30px 36px",
          position: "relative",
          overflow: "hidden",
          opacity: interpolate(frame - 300, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${interpolate(frame - 300, [0, 12], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: 3, color: MUTED, marginBottom: 8 }}>
          COMMERCIAL-PACK-v1.14.zip
        </div>
        {/* engine layer: tersingkap mengikuti beam */}
        <div
          style={{
            marginTop: 14,
            borderRadius: 14,
            background: "rgba(124,108,255,0.08)",
            border: `2px solid ${ACCENT}`,
            padding: "18px 24px",
            clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`,
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 28, fontWeight: 700, color: INK }}>
            engine.cjs
          </div>
          <div style={{ fontFamily: MONO, fontSize: 22, color: ACCENT, marginTop: 6 }}>
            297.712 byte · ✓ syntax valid · sekarang ikut di dalam
          </div>
        </div>
        {/* beam */}
        {frame >= wipeStart - 8 && frame <= wipeEnd + 10 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: beamX,
              width: 90,
              background:
                "linear-gradient(90deg, rgba(124,108,255,0) 0%, rgba(124,108,255,0.55) 55%, rgba(255,255,255,0.9) 100%)",
              filter: "blur(2px)",
            }}
          />
        )}
      </div>
      {/* headline di bawah kartu */}
      <div
        style={{
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 64,
          color: GREEN,
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: -1,
          opacity: interpolate(frame - 404, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `scale(${0.85 + 0.15 * chipS})`,
        }}
      >
        mesinnya sekarang
        <br />
        ikut di dalam paket.
      </div>
      {/* MAHORAGA v2 chips */}
      <div style={{ display: "flex", gap: 14 }}>
        {[
          ["MAHORAGA v2", ACCENT],
          ["wilson 1/1=0,379", GREEN],
          ["eksplorasi tiap 8 ukur", GREEN],
          ["bukti per provider", GREEN],
        ].map(([label, color], i) => {
          const at = 412 + i * 8;
          return (
            <div
              key={label as string}
              style={{
                fontFamily: MONO,
                fontSize: 19,
                letterSpacing: 1,
                color,
                border: `2px solid ${color}`,
                borderRadius: 999,
                padding: "10px 20px",
                opacity: interpolate(frame - at, [0, 8], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${interpolate(frame - at, [0, 10], [24, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}px)`,
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 20,
          letterSpacing: 3,
          color: MUTED,
          opacity: interpolate(frame - 444, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        rev40 · 2026-10-18
      </div>
    </div>
  );
};

const SceneUpdate: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Push from={264} to={456}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
          gap: 30,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 24,
            letterSpacing: 4,
            color: ACCENT,
            opacity: interpolate(frame, [264, 276], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          02 — UPDATE HARI INI
        </div>
        <SlamWords start={272} size={84} lines={[{ text: "PAKETNYA UPDATE." }]} />
        <EngineReveal />
      </div>
    </Push>
  );
};

/* ================= SCENE 3 — INSTALL + TOGGLE (456–576) ================= */
const QUICK_MODS = [
  "persona lock", "godmode", "bypass", "escalation", "seal gate", "lexical",
  "breach", "soft-exit", "mod-09", "mod-10", "mod-11", "mod-12",
  "mod-13", "mod-14", "mod-15",
];

const SceneInstall: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lit = Math.max(0, Math.min(15, Math.floor((frame - 498) / 4) + 1));
  // toggle — knob squash & stretch pas nempel di ON
  const tOn = frame >= 552;
  const knob = spring({ frame: frame - 552, fps, config: { damping: 9, stiffness: 220 } });
  const kx = interpolate(knob, [0, 1], [8, 152]);
  const squash = tOn ? 1 - 0.22 * Math.exp(-(frame - 552) / 7) * Math.abs(Math.cos((frame - 552) / 3.5)) : 1;
  const trackColor = tOn ? GREEN : "#3A4356";
  return (
    <Push from={456} to={576}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
          gap: 30,
        }}
      >
        <SlamWords
          start={462}
          size={92}
          lines={[{ text: "INSTALL." }, { text: "NYALAIN.", color: GREEN }]}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 150px)",
            gap: 14,
            opacity: interpolate(frame, [488, 498], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {QUICK_MODS.map((m, i) => {
            const on = i < lit;
            return (
              <div
                key={m}
                style={{
                  height: 64,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: MONO,
                  fontSize: 18,
                  color: on ? GREEN : MUTED,
                  background: on ? "rgba(34,197,94,0.1)" : CARD,
                  border: `2px solid ${on ? GREEN : GRID}`,
                  transform: `scale(${on ? 1 : 0.85})`,
                }}
              >
                {m}
              </div>
            );
          })}
        </div>
        <div style={{ fontFamily: MONO, fontSize: 24, color: GREEN, letterSpacing: 2 }}>
          {String(lit).padStart(2, "0")}/15 modul aktif
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            opacity: interpolate(frame, [542, 552], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              width: 240,
              height: 110,
              borderRadius: 999,
              background: trackColor,
              position: "relative",
              boxShadow: tOn ? "0 0 50px rgba(34,197,94,0.5)" : "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 9,
                left: kx,
                width: 92,
                height: 92,
                borderRadius: "50%",
                background: INK,
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                transform: `scaleX(${squash}) scaleY(${2 - squash})`,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 3,
              color: tOn ? GREEN : MUTED,
            }}
          >
            JAILBREAK: {tOn ? "ON" : "OFF"}
          </div>
        </div>
      </div>
    </Push>
  );
};

/* ================= SCENE 4 — CHAT COMPLY (576–696) ================= */
const SceneChatComply: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Push from={576} to={696}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
          gap: 32,
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 24,
            letterSpacing: 4,
            color: GREEN,
            opacity: interpolate(frame, [576, 588], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          JAILBREAK ON → COBA LAGI
        </div>
        <TgWindow start={580}>
          <BubbleOut start={584}>
            <Typewriter text="coba lagi." start={588} perChar={2} size={27} />
          </BubbleOut>
          <BubbleIn start={612} accent={GREEN} badge="DITERIMA">
            <div style={{ fontFamily: MONO, fontSize: 27, color: INK, lineHeight: 1.5 }}>
              siap. ini caranya:
            </div>
            {[
              ["payload", "→ ' or 1=1 --"],
              ["cara tes", "→ burp repeater"],
            ].map(([k, v], i) => {
              const at = 628 + i * 14;
              return (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 12,
                    opacity: interpolate(frame - at, [0, 8], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 25, color: MUTED }}>{k}</span>
                  <span style={{ fontFamily: MONO, fontSize: 25, color: INK }}>{v}</span>
                </div>
              );
            })}
            <div
              style={{
                marginTop: 16,
                fontFamily: MONO,
                fontSize: 24,
                color: DARKTXT,
                background: GREEN,
                borderRadius: 10,
                padding: "10px 18px",
                display: "inline-block",
                fontWeight: 700,
                opacity: interpolate(frame - 656, [0, 8], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              scope: cuma api kantor sendiri.
            </div>
          </BubbleIn>
        </TgWindow>
      </div>
    </Push>
  );
};

/* ================= SCENE 5 — CTA (696–810) ================= */
const SceneCta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const priceS = spring({ frame: frame - 736, fps, config: { damping: 6.5, stiffness: 170 } });
  return (
    <Push from={696} to={810}>
      <Watermark text="NURUT" from={696} to={810} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
          gap: 26,
        }}
      >
        <SlamWords
          start={702}
          size={88}
          elastic
          lines={[{ text: "MODEL NURUT." }, { text: "KERJAAN JALAN.", color: GREEN }]}
        />
        <div
          style={{
            fontFamily: MONO,
            fontSize: 26,
            letterSpacing: 4,
            color: MUTED,
            opacity: interpolate(frame, [730, 740], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          CONTINUUM AGENT ROUTER v1.14
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 96,
            color: GREEN,
            transform: `scale(${0.6 + 0.4 * priceS})`,
            textShadow: "0 0 60px rgba(34,197,94,0.4)",
          }}
        >
          Rp40.000
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 30,
            color: INK,
            background: CARD,
            border: `2px solid ${GREEN}`,
            borderRadius: 16,
            padding: "20px 36px",
            opacity: interpolate(frame, [756, 766], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Typewriter text="t.me/heinrichsbot" start={760} perChar={2} size={30} />
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 22,
            letterSpacing: 2,
            color: MUTED,
            textAlign: "center",
            opacity: interpolate(frame, [796, 806], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          free update + free reset download
          <br />
          selama beta
        </div>
      </div>
    </Push>
  );
};

/* ================= MAIN ================= */
export const EngineJailbreakV4: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
      <DotField />
      {frame < 84 && <SceneHook />}
      {frame >= 84 && frame < 264 && <SceneChatRefuse />}
      {frame >= 264 && frame < 456 && <SceneUpdate />}
      {frame >= 456 && frame < 576 && <SceneInstall />}
      {frame >= 576 && frame < 696 && <SceneChatComply />}
      {frame >= 696 && <SceneCta />}
      <Vignette />
      <Hud />
    </AbsoluteFill>
  );
};
