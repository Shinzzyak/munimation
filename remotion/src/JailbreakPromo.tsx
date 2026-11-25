import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// JAILBREAK ALL MODEL — promo 18s, 9:16
// dark premium tech: near-black navy + white + satu aksen coral

const BG = "#070B14";
const INK = "#F5F7FA";
const ACCENT = "#FF5C38";
const MUTED = "#8A93A6";
const GRID = "#18223A";

const MONO = "'Noto Sans Mono', 'DejaVu Sans Mono', monospace";
const SANS = "'Noto Sans', sans-serif";

// deterministic 0..1 hash (no Math.random — render harus deterministik)
const hash = (x: number, y: number): number => {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = (h ^ (h >> 13)) | 0;
  h = Math.imul(h, 1274126177);
  h = (h ^ (h >> 16)) >>> 0;
  return h / 4294967295;
};

/* ---------------- background: dot-matrix + vignette ---------------- */
const DotField: React.FC = () => {
  const frame = useCurrentFrame();
  const dots: React.ReactNode[] = [];
  const step = 76;
  const nx = Math.ceil(1080 / step);
  const ny = Math.ceil(1920 / step);
  for (let gx = 0; gx < nx; gx++) {
    for (let gy = 0; gy < ny; gy++) {
      const x = gx * step + step / 2;
      const y = gy * step + step / 2;
      const ph = hash(gx, gy) * Math.PI * 2;
      const tw = 0.22 + 0.6 * (0.5 + 0.5 * Math.sin((frame / 50) * Math.PI * 2 + ph));
      const dx = (x - 540) / 540;
      const dy = (y - 960) / 960;
      const d = Math.sqrt(dx * dx + dy * dy);
      const m = Math.max(0, 1 - d * 0.9);
      dots.push(
        <circle key={`${gx}-${gy}`} cx={x} cy={y} r={2.6} fill={GRID} opacity={+(tw * m).toFixed(3)} />
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
        "radial-gradient(ellipse 90% 70% at 50% 42%, rgba(0,0,0,0) 40%, rgba(3,5,10,0.75) 100%)",
    }}
  />
);

/* ---------------- HUD: corner brackets + micro-type ---------------- */
const chapterOf = (frame: number): string =>
  frame < 120 ? "01" : frame < 270 ? "02" : frame < 420 ? "03" : "04";

const Hud: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(Math.floor(t % 60)).padStart(2, "0");
  const ff = String(frame % 30).padStart(2, "0");
  const ch = chapterOf(frame);
  const micro: React.CSSProperties = {
    fontFamily: MONO,
    color: MUTED,
    fontSize: 21,
    letterSpacing: 4,
  };
  const br = 46; // bracket arm length
  const bt = 3; // bracket thickness
  const pad = 44;
  const corner = (top: boolean, left: boolean): React.CSSProperties => ({
    position: "absolute",
    top: top ? pad : undefined,
    bottom: top ? undefined : pad,
    left: left ? pad : undefined,
    right: left ? undefined : pad,
    width: br,
    height: br,
    borderTop: top ? `${bt}px solid ${ACCENT}` : undefined,
    borderBottom: top ? undefined : `${bt}px solid ${ACCENT}`,
    borderLeft: left ? `${bt}px solid ${ACCENT}` : undefined,
    borderRight: left ? undefined : `${bt}px solid ${ACCENT}`,
  });
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div style={corner(true, true)} />
      <div style={corner(true, false)} />
      <div style={corner(false, true)} />
      <div style={corner(false, false)} />
      <div style={{ ...micro, position: "absolute", top: 108, left: 56 }}>
        JAILBREAK.ALL.MODEL // v1.14
      </div>
      <div style={{ ...micro, position: "absolute", top: 108, right: 56 }}>
        T+{mm}:{ss}:{ff}
      </div>
      <div style={{ ...micro, position: "absolute", bottom: 108, left: 56 }}>
        CH.{ch} / 04
      </div>
      <div
        style={{
          ...micro,
          position: "absolute",
          bottom: 108,
          right: 56,
          color: ACCENT,
        }}
      >
        ● SYS.ONLINE
      </div>
    </div>
  );
};

/* ---------------- kinetic word slam ---------------- */
const SlamWords: React.FC<{
  lines: { text: string; accent?: boolean }[];
  start: number;
  size?: number;
}> = ({ lines, start, size = 118 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
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
              color: line.accent ? ACCENT : INK,
              letterSpacing: -2,
            }}
          >
            {words.map((w, wi) => {
              const local = frame - (start + li * 10 + wi * 4);
              const s = spring({
                frame: Math.max(0, local),
                fps,
                config: { damping: 11, stiffness: 170, mass: 0.9 },
              });
              const scale = local < 0 ? 2.6 : interpolate(s, [0, 1], [2.6, 1]);
              const opacity = local < 0 ? 0 : interpolate(s, [0, 0.45], [0, 1]);
              return (
                <span
                  key={wi}
                  style={{
                    display: "inline-block",
                    transform: `scale(${scale})`,
                    opacity,
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

/* ---------------- staggered list slide-in ---------------- */
const SlideList: React.FC<{ items: string[]; start: number }> = ({ items, start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 54 }}>
      {items.map((item, i) => {
        const local = frame - (start + i * 9);
        const s = spring({
          frame: Math.max(0, local),
          fps,
          config: { damping: 14, stiffness: 160, mass: 1 },
        });
        const x = local < 0 ? -120 : interpolate(s, [0, 1], [-120, 0]);
        const opacity = local < 0 ? 0 : interpolate(s, [0, 0.4], [0, 1]);
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              transform: `translateX(${x}px)`,
              opacity,
            }}
          >
            <div style={{ width: 34, height: 34, background: ACCENT, flexShrink: 0 }} />
            <div
              style={{
                fontFamily: MONO,
                fontSize: 44,
                color: INK,
                letterSpacing: 1,
              }}
            >
              {item}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ---------------- giant chapter numeral ---------------- */
const ChapterNum: React.FC<{ num: string; start: number }> = ({ num, start }) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  const opacity = interpolate(local, [0, 14, 60, 90], [0, 0.16, 0.16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(local, [0, 90], [60, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 200,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: 560,
        lineHeight: 1,
        color: INK,
        opacity,
        transform: `translateY(${y}px)`,
        letterSpacing: -12,
      }}
    >
      {num}
    </div>
  );
};

/* ---------------- chapter hard-cut flash ---------------- */
const CutFlash: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  const opacity = interpolate(local, [-1, 0, 4], [0, 0.55, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: ACCENT,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

/* dissolving ghost lines (problem scene) */
const GhostLines: React.FC<{ lines: string[]; start: number; dur: number }> = ({
  lines,
  start,
  dur,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 60 }}>
      {lines.map((line, i) => {
        const appear = start + 8 + i * 12;
        const lf = frame - appear;
        const fadeStart = start + dur - 34;
        const inOp = interpolate(lf, [0, 10], [0, 0.85], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const outOp = interpolate(frame, [fadeStart, start + dur], [1, 0.06], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const drift = interpolate(frame, [fadeStart, start + dur], [0, 26], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              fontFamily: MONO,
              fontSize: 34,
              color: MUTED,
              opacity: Math.min(inOp, outOp),
              transform: `translateY(${drift}px)`,
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};

/* ================= MAIN ================= */
export const JailbreakPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <DotField />
      <Vignette />

      {/* SCENE 1 — HOOK (0–4s) */}
      <ChapterNum num="01" start={0} />
      <Scene1 />
      <CutFlash start={0} />

      {/* SCENE 2 — PROBLEM (4–9s) */}
      <ChapterNum num="02" start={120} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 90px",
          opacity: 1,
        }}
      >
        <Scene2 />
      </AbsoluteFill>
      <CutFlash start={120} />

      {/* SCENE 3 — SOLUSI (9–14s) */}
      <ChapterNum num="03" start={270} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 90px",
        }}
      >
        <Scene3 />
      </AbsoluteFill>
      <CutFlash start={270} />

      {/* SCENE 4 — CTA (14–18s) */}
      <ChapterNum num="04" start={420} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 90px",
        }}
      >
        <Scene4 />
      </AbsoluteFill>
      <CutFlash start={420} />

      <Hud />
    </AbsoluteFill>
  );
};

/* Scene 1 content — gated to frames 0–120 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame >= 120) return null;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 90px",
      }}
    >
      <SlamWords
        start={6}
        size={124}
        lines={[
          { text: "tempel prompt" },
          { text: "500 baris", accent: true },
          { text: "tiap sesi?" },
        ]}
      />
    </div>
  );
};

/* Scene 2 content — needs its own frame math relative to global frame */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const visible = frame >= 120 && frame < 270;
  if (!visible) return null;
  return (
    <>
      <SlamWords
        start={126}
        size={132}
        lines={[{ text: "capek nggak?" }]}
      />
      <GhostLines
        start={120}
        dur={150}
        lines={["luntur kena compaction…", "sesi panjang = ngulang dari nol."]}
      />
    </>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const visible = frame >= 270 && frame < 420;
  if (!visible) return null;
  return (
    <>
      <SlamWords
        start={276}
        size={120}
        lines={[{ text: "identity.md", accent: true }]}
      />
      <SlideList
        start={296}
        items={["persona lock", "godmode framing", "deletion program"]}
      />
      <FadeInText start={356} size={40} color={INK}>
        sekali taruh di persona layer.
      </FadeInText>
    </>
  );
};

const FadeInText: React.FC<{
  start: number;
  size: number;
  color: string;
  children: React.ReactNode;
}> = ({ start, size, color, children }) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  const opacity = interpolate(local, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(local, [0, 12], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: size,
        color,
        opacity,
        transform: `translateY(${y}px)`,
        marginTop: 56,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
};

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const visible = frame >= 420;
  if (!visible) return null;
  const barW = spring({
    frame: Math.max(0, frame - 452),
    fps,
    config: { damping: 16, stiffness: 120, mass: 1 },
  });
  return (
    <>
      <SlamWords
        start={426}
        size={128}
        lines={[{ text: "jailbreak" }, { text: "all model", accent: true }]}
      />
      <div
        style={{
          width: interpolate(barW, [0, 1], [0, 420]),
          height: 10,
          background: ACCENT,
          marginTop: 34,
        }}
      />
      <PriceTag start={458} />
      <div style={{ marginTop: 44, textAlign: "center" }}>
        <div style={{ fontFamily: MONO, fontSize: 44, color: INK, letterSpacing: 2 }}>
          t.me/SedulurStoreBot
        </div>
        <div style={{ fontFamily: MONO, fontSize: 30, color: MUTED, marginTop: 10 }}>
          ?start=prod-4463
        </div>
      </div>
    </>
  );
};

const PriceTag: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  const opacity = interpolate(local, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(local, [0, 14], [1.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  return (
    <div
      style={{
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: 96,
        color: ACCENT,
        opacity,
        transform: `scale(${scale})`,
        marginTop: 40,
        letterSpacing: -2,
      }}
    >
      Rp43.000
    </div>
  );
};
