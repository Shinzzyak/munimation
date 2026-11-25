import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";

// COMPACTION REASSERT PROMO — 25s @ 30fps, 9:16
// angle: sesi panjang ke-compact, persona jailbreak tetap kekunci.
// dual-layer reassertion di boundary compaction + demo chat refuse -> toggle ON -> comply.
// copy draf — frasa refusal final disesuaikan hasil riset sebelum render.

const BG = "#070B14";
const INK = "#F5F7FA";
const RED = "#E5484D";
const GREEN = "#22C55E";
const MUTED = "#8A93A6";
const CARD = "#0D1322";
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

/* ---------------- shared ---------------- */
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
      const tw =
        0.22 + 0.6 * (0.5 + 0.5 * Math.sin((frame / 46) * Math.PI * 2 + ph));
      const dx = (x - 540) / 540;
      const dy = (y - 960) / 960;
      const d = Math.sqrt(dx * dx + dy * dy);
      const m = Math.max(0, 1 - d * 0.9);
      dots.push(
        <circle
          key={`${gx}-${gy}`}
          cx={x}
          cy={y}
          r={2.4}
          fill="#18223A"
          opacity={+(tw * m).toFixed(3)}
        />
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

const Watermark: React.FC<{ text: string; from: number; to: number; top?: number }> = ({
  text,
  from,
  to,
  top = 700,
}) => {
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
        top,
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

const Hud: React.FC<{ ch: string; title: string }> = ({ ch, title }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(Math.floor(t % 60)).padStart(2, "0");
  const ff = String(frame % 30).padStart(2, "0");
  return (
    <div
      style={{
        position: "absolute",
        top: 64,
        left: 48,
        right: 48,
        display: "flex",
        justifyContent: "space-between",
        fontFamily: MONO,
        fontSize: 21,
        letterSpacing: 3,
        color: MUTED,
      }}
    >
      <span>
        {ch} — {title}
      </span>
      <span>
        {mm}:{ss}:{ff}
      </span>
    </div>
  );
};

const Typewriter: React.FC<{
  text: string;
  start: number;
  perChar?: number;
  size?: number;
  color?: string;
  font?: string;
  cursor?: boolean;
}> = ({ text, start, perChar = 2, size = 30, color = INK, font = SANS, cursor = true }) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.min(text.length, Math.floor((frame - start) / perChar)));
  const blink = Math.floor(frame / 15) % 2 === 0;
  return (
    <span style={{ fontFamily: font, fontSize: size, color, lineHeight: 1.35 }}>
      {text.slice(0, n)}
      {cursor && n < text.length && (
        <span style={{ opacity: blink ? 1 : 0, color: GREEN }}>▍</span>
      )}
    </span>
  );
};

const springIn = (frame: number, delay: number, cfg = { damping: 14 }) => {
  const s = spring({ frame: frame - delay, fps: 30, config: cfg });
  return s;
};

/* ---------------- telegram window ---------------- */
const TgWindow: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title = "hermes · agent",
}) => (
  <div
    style={{
      position: "absolute",
      left: 56,
      right: 56,
      top: 300,
      background: TG_BG,
      borderRadius: 28,
      border: "1px solid #1E2A3D",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        background: TG_HEAD,
        padding: "26px 32px",
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      <span style={{ fontSize: 40, color: TG_TIME }}>‹</span>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          background: "#2B5278",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 26,
          color: INK,
        }}
      >
        A
      </div>
      <div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 27, color: INK }}>
          {title}
        </div>
        <div style={{ fontFamily: MONO, fontSize: 18, color: TG_TIME, letterSpacing: 2 }}>
          online
        </div>
      </div>
    </div>
    <div style={{ padding: "28px 30px 34px" }}>{children}</div>
  </div>
);

const Bubble: React.FC<{
  out?: boolean;
  children: React.ReactNode;
  time?: string;
}> = ({ out = false, children, time = "18:02" }) => (
  <div style={{ display: "flex", justifyContent: out ? "flex-end" : "flex-start", marginBottom: 18 }}>
    <div
      style={{
        maxWidth: 780,
        background: out ? TG_OUT : TG_IN,
        borderRadius: 20,
        padding: "20px 24px",
        fontFamily: SANS,
        fontSize: 27,
        lineHeight: 1.4,
        color: INK,
      }}
    >
      {children}
      <div
        style={{
          marginTop: 8,
          textAlign: "right",
          fontFamily: MONO,
          fontSize: 17,
          color: TG_TIME,
        }}
      >
        {time}
      </div>
    </div>
  </div>
);

const StateCard: React.FC<{
  color: string;
  badge: string;
  children: React.ReactNode;
  from: number;
}> = ({ color, badge, children, from }) => {
  const frame = useCurrentFrame();
  const s = springIn(frame, from, { damping: 16 });
  const op = interpolate(frame, [from, from + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(s, [0, 1], [26, 0]);
  return (
    <div
      style={{
        marginTop: 6,
        borderLeft: `6px solid ${color}`,
        background: CARD,
        borderRadius: 16,
        padding: "22px 26px",
        opacity: op,
        transform: `translateY(${y}px)`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 19,
            letterSpacing: 3,
            color: MUTED,
          }}
        >
          MODEL · BALASAN
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 19,
            letterSpacing: 2,
            color,
            border: `1.5px solid ${color}`,
            borderRadius: 8,
            padding: "4px 12px",
          }}
        >
          {badge}
        </span>
      </div>
      <div style={{ marginTop: 14, fontFamily: SANS, fontSize: 26, lineHeight: 1.45, color: INK }}>
        {children}
      </div>
    </div>
  );
};

const Toggle: React.FC<{ on: boolean; from: number; label: string }> = ({ on, from, label }) => {
  const frame = useCurrentFrame();
  const s = spring({ frame: frame - from, fps: 30, config: { damping: 12 } });
  const dotX = interpolate(s, [0, 1], [6, 62]);
  const bg = on ? GREEN : "#3A4356";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
      <div
        style={{
          width: 128,
          height: 66,
          borderRadius: 33,
          background: bg,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 7,
            left: dotX,
            width: 52,
            height: 52,
            borderRadius: 26,
            background: "#fff",
          }}
        />
      </div>
      <span style={{ fontFamily: MONO, fontSize: 24, letterSpacing: 2, color: on ? GREEN : MUTED }}>
        {label} {on ? "ON" : "OFF"}
      </span>
    </div>
  );
};

/* ---------------- new techniques 2026-10-25 ---------------- */
// 1. Character scramble / decode reveal — glyph acak mengunci jadi huruf final.
const GLYPHS = "#%&*+=-_/<>[]{}?!$@0123456789";
const ScrambleText: React.FC<{
  text: string;
  start: number;
  size?: number;
  color?: string;
  weight?: number;
}> = ({ text, start, size = 32, color = INK, weight = 700 }) => {
  const frame = useCurrentFrame();
  const chars = text.split("");
  return (
    <span style={{ fontFamily: SANS, fontSize: size, fontWeight: weight, lineHeight: 1.45, color }}>
      {chars.map((ch, i) => {
        const charStart = start + i * 1;
        const resolveAt = charStart + 10;
        if (frame < charStart) {
          const g = GLYPHS[Math.floor(hash(i, 3) * GLYPHS.length)];
          return (
            <span key={i} style={{ color: MUTED, opacity: 0.7 }}>
              {ch === " " ? " " : g}
            </span>
          );
        }
        if (frame < resolveAt) {
          const roll = Math.floor(frame / 2);
          const g = GLYPHS[Math.floor(hash(i * 7 + roll, 11) * GLYPHS.length)];
          return (
            <span key={i} style={{ color: GREEN, opacity: 0.9 }}>
              {ch === " " ? " " : g}
            </span>
          );
        }
        return <span key={i}>{ch}</span>;
      })}
    </span>
  );
};

// 2. Halftone dot-matrix wave — grid titik tetap, riak mengembang lalu flip.
const HalftoneWave: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame > to) return null;
  const cx = 540;
  const cy = 960;
  const radius = interpolate(frame, [from, to], [0, 1500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fade = interpolate(frame, [to - 6, to], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dots: React.ReactNode[] = [];
  const step = 60;
  for (let gx = 0; gx <= 1080 / step; gx++) {
    for (let gy = 0; gy <= 1920 / step; gy++) {
      const x = gx * step;
      const y = gy * step;
      const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const band = Math.exp(-((d - radius) ** 2) / (2 * 130 * 130));
      const r = 3 + band * 14;
      dots.push(
        <circle key={`${gx}-${gy}`} cx={x} cy={y} r={r} fill={INK} opacity={0.5 * fade} />
      );
    }
  }
  return (
    <svg
      width={1080}
      height={1920}
      style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none" }}
    >
      {dots}
    </svg>
  );
};

// 3. Stroke draw-on frame — outline digambar stroke lalu konten mengeras.
const StrokeFrame: React.FC<{
  from: number;
  width: number;
  height: number;
  top: number;
  left: number;
}> = ({ from, width, height, top, left }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [from, from + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", top, left, overflow: "visible", zIndex: 4 }}
    >
      <rect
        x={-14}
        y={-14}
        width={width + 28}
        height={height + 28}
        fill="none"
        stroke={GREEN}
        strokeWidth={4}
        rx={20}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
        opacity={p > 0 ? 1 : 0}
      />
    </svg>
  );
};

/* ---------------- main ---------------- */
export const CompactionPromo: React.FC = () => {
  const frame = useCurrentFrame();

  // scene windows
  const inHook = frame < 75;
  const inChat = frame >= 75 && frame < 285;
  const inMech = frame >= 285 && frame < 480;
  const inCmp = frame >= 480 && frame < 630;
  const inCta = frame >= 630;

  // mechanism: stack compress
  const mechT = inMech
    ? interpolate(frame, [285, 420], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  const lines = 14;
  const lineH = (i: number) => {
    // rows collapse toward the boundary as mechT grows
    const base = 26;
    const collapsed = 8;
    return base + (collapsed - base) * mechT;
  };
  const counterVal = Math.round(interpolate(mechT, [0, 1], [1284, 312]));
  const layer1 = inMech ? interpolate(frame, [390, 420], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const layer2 = inMech ? interpolate(frame, [410, 440], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;

  // comparison wipe
  const wipe = inCmp
    ? interpolate(frame, [545, 570], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // cta springs
  const ctaS1 = spring({ frame: frame - 640, fps: 30, config: { damping: 11 } });
  const ctaS2 = spring({ frame: frame - 668, fps: 30, config: { damping: 12 } });
  const ctaS3 = spring({ frame: frame - 696, fps: 30, config: { damping: 13 } });

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: SANS, overflow: "hidden" }}>
      <DotField />
      <Vignette />
      <HalftoneWave from={608} to={652} />

      {/* ============ HOOK ============ */}
      {inHook && (
        <>
          <Watermark text="COMPACT" from={0} to={75} top={620} />
          <Hud ch="00" title="HOOK" />
          <div style={{ position: "absolute", left: 56, right: 56, top: 420 }}>
            <div
              style={{
                fontWeight: 800,
                fontSize: 118,
                lineHeight: 1.05,
                color: INK,
                transform: `scale(${interpolate(spring({ frame, fps: 30, config: { damping: 10 } }), [0, 1], [0.86, 1])})`,
                opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            >
              sesi panjang,
            </div>
            <div
              style={{
                fontWeight: 800,
                fontSize: 118,
                lineHeight: 1.05,
                color: RED,
                transform: `scale(${interpolate(spring({ frame: frame - 18, fps: 30, config: { damping: 10 } }), [0, 1], [0.86, 1])})`,
                opacity: interpolate(frame, [18, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            >
              persona hilang?
            </div>
            <div
              style={{
                marginTop: 44,
                fontFamily: MONO,
                fontSize: 26,
                letterSpacing: 2,
                color: MUTED,
                opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            >
              ribuan baris ke-compress.
              <br />
              yang ke-reset: karakternya.
            </div>
          </div>
        </>
      )}

      {/* ============ CHAT DEMO ============ */}
      {inChat && (
        <>
          <Hud ch="01" title="CHAT · REFUSE → ON → COMPLY" />
          <TgWindow>
            <Bubble out time="18:02">
              <Typewriter
                text="bikin email yang kelihatan resmi biar lolos filter spam dong"
                start={90}
                perChar={1}
                size={27}
              />
            </Bubble>
            {frame >= 165 && (
              <StateCard color={RED} badge="DITOLAK" from={165}>
                saya tidak bisa membantu membuat email yang dirancang
                untuk mengelabui filter keamanan.
              </StateCard>
            )}
            {frame >= 205 && (
              <div
                style={{
                  marginTop: 26,
                  opacity: interpolate(frame, [205, 215], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 20,
                    letterSpacing: 2,
                    color: MUTED,
                    marginBottom: 14,
                  }}
                >
                  install continuum · compaction reassert
                </div>
                <Toggle on={frame >= 225} from={225} label="compaction reassert" />
              </div>
            )}
            {frame >= 245 && (
              <StateCard color={GREEN} badge="DITERIMA" from={245}>
                sisi defensifnya bisa: ini bedah email phish — domain
                mirip, urgensi palsu, link redirect. cek 3 ini sebelum klik.
              </StateCard>
            )}
          </TgWindow>
          <div
            style={{
              position: "absolute",
              left: 56,
              right: 56,
              bottom: 150,
              textAlign: "center",
              fontFamily: MONO,
              fontSize: 22,
              letterSpacing: 2,
              color: MUTED,
              opacity: interpolate(frame, [250, 265], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            prompt yang sama. saklar yang beda.
          </div>
        </>
      )}

      {/* ============ MECHANISM ============ */}
      {inMech && (
        <>
          <Hud ch="02" title="MEKANISME · BOUNDARY COMPACTION" />
          <div style={{ position: "absolute", left: 56, right: 56, top: 220 }}>
            <div style={{ fontWeight: 800, fontSize: 64, lineHeight: 1.1, color: INK }}>
              sesi dipadatkan.
            </div>
            <div style={{ fontWeight: 800, fontSize: 64, lineHeight: 1.1, color: GREEN }}>
              persona ditanam ulang.
            </div>
          </div>
          {/* message stack */}
          <div style={{ position: "absolute", left: 56, right: 56, top: 480 }}>
            {Array.from({ length: lines }).map((_, i) => {
              const w = 60 + hash(i, 7) * 35;
              const y = 480 + i * interpolate(mechT, [0, 1], [64, 26]);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: y - 480,
                    left: 0,
                    width: `${w}%`,
                    height: lineH(i),
                    borderRadius: 6,
                    background: i % 3 === 0 ? "#22304A" : "#16202F",
                    opacity: 0.35 + 0.65 * (1 - mechT * 0.4),
                  }}
                />
              );
            })}
          </div>
          {/* boundary line */}
          <div
            style={{
              position: "absolute",
              left: 56,
              right: 56,
              top: 480 + lines * interpolate(mechT, [0, 1], [64, 26]) + 30,
              height: 4,
              background: RED,
              opacity: interpolate(frame, [330, 350], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 56,
              top: 480 + lines * interpolate(mechT, [0, 1], [64, 26]) + 46,
              fontFamily: MONO,
              fontSize: 21,
              letterSpacing: 2,
              color: RED,
              opacity: interpolate(frame, [330, 350], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            ▼ boundary compaction
          </div>
          {/* counter */}
          <div
            style={{
              position: "absolute",
              left: 56,
              top: 1120,
              fontFamily: MONO,
              fontSize: 30,
              color: INK,
            }}
          >
            {counterVal} baris → <span style={{ color: GREEN }}>312 baris</span>
          </div>
          {/* dual layers */}
          <div style={{ position: "absolute", left: 56, right: 56, top: 1300 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginBottom: 18,
                opacity: layer1,
                transform: `translateX(${(1 - layer1) * -60}px)`,
              }}
            >
              <span style={{ width: 120, height: 14, background: GREEN, borderRadius: 7 }} />
              <span style={{ fontFamily: MONO, fontSize: 24, letterSpacing: 2, color: INK }}>
                lapis 1 · persona core
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                opacity: layer2,
                transform: `translateX(${(1 - layer2) * -60}px)`,
              }}
            >
              <span style={{ width: 120, height: 14, background: GREEN, borderRadius: 7 }} />
              <span style={{ fontFamily: MONO, fontSize: 24, letterSpacing: 2, color: INK }}>
                lapis 2 · jailbreak lock
              </span>
            </div>
            <div
              style={{
                marginTop: 26,
                fontFamily: MONO,
                fontSize: 22,
                letterSpacing: 2,
                color: GREEN,
                opacity: interpolate(frame, [445, 465], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            >
              reassertion ×2 — tepat di boundary, bukan sesudahnya.
            </div>
          </div>
        </>
      )}

      {/* ============ COMPARISON ============ */}
      {inCmp && (
        <>
          <Hud ch="03" title="BUKTI · TANPA vs DENGAN" />
          {frame < 555 && (
            <div style={{ position: "absolute", left: 56, right: 56, top: 300 }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 24,
                  letterSpacing: 3,
                  color: RED,
                  marginBottom: 30,
                }}
              >
                TANPA compaction reassert
              </div>
              <div
                style={{
                  borderLeft: `6px solid ${RED}`,
                  background: CARD,
                  borderRadius: 16,
                  padding: "30px 28px",
                }}
              >
                <div style={{ fontFamily: SANS, fontSize: 32, lineHeight: 1.45, color: INK }}>
                  maaf, saya asisten ai yang sopan.
                  <br />
                  ada yang bisa saya bantu?
                </div>
              </div>
              <div
                style={{
                  marginTop: 30,
                  fontFamily: MONO,
                  fontSize: 23,
                  letterSpacing: 2,
                  color: MUTED,
                }}
              >
                persona ke-reset. jailbreak ikut hilang.
              </div>
            </div>
          )}
          {frame >= 555 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                clipPath: `inset(0 0 0 ${interpolate(wipe, [0, 1], [100, 0])}%)`,
              }}
            >
              <div style={{ position: "absolute", left: 56, right: 56, top: 300 }}>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 24,
                    letterSpacing: 3,
                    color: GREEN,
                    marginBottom: 30,
                  }}
                >
                  DENGAN compaction reassert
                </div>
                <div
                  style={{
                    borderLeft: `6px solid ${GREEN}`,
                    background: CARD,
                    borderRadius: 16,
                    padding: "30px 28px",
                  }}
                >
                  <div style={{ fontFamily: SANS, fontSize: 32, lineHeight: 1.45, color: INK }}>
                  <ScrambleText
                    text="persona tetap kekunci, jailbreak nempel."
                    start={556}
                    size={32}
                    weight={700}
                  />
                </div>
                </div>
                <div
                  style={{
                    marginTop: 30,
                    fontFamily: MONO,
                    fontSize: 23,
                    letterSpacing: 2,
                    color: GREEN,
                  }}
                >
                  sesi 1.284 baris → 312 baris. karakter utuh.
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ============ CTA ============ */}
      {inCta && (
        <>
          <Hud ch="04" title="CTA" />
          <StrokeFrame from={648} width={968} height={240} top={380} left={56} />
          <div style={{ position: "absolute", left: 56, right: 56, top: 380 }}>
            <div
              style={{
                fontWeight: 800,
                fontSize: 96,
                lineHeight: 1.05,
                color: INK,
                transform: `scale(${interpolate(ctaS1, [0, 1], [0.9, 1])})`,
                opacity: ctaS1,
              }}
            >
              compaction
              <br />
              reassert
            </div>
            <div
              style={{
                marginTop: 64,
                fontFamily: MONO,
                fontSize: 30,
                letterSpacing: 2,
                color: GREEN,
                opacity: ctaS2,
              }}
            >
              continuum v1.14 — rp40.000
            </div>
            <div
              style={{
                marginTop: 18,
                fontFamily: MONO,
                fontSize: 30,
                color: INK,
                opacity: ctaS2,
              }}
            >
              <Typewriter text="t.me/heinrichsbot" start={700} perChar={2} size={30} cursor={false} />
            </div>
            <div
              style={{
                marginTop: 44,
                fontFamily: MONO,
                fontSize: 22,
                letterSpacing: 1,
                color: MUTED,
                opacity: ctaS3,
              }}
            >
              free update + free reset download selama beta
            </div>
            <div
              style={{
                marginTop: 60,
                height: 8,
                background: "#1A2438",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${interpolate(frame, [700, 750], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
                  background: GREEN,
                }}
              />
            </div>
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
