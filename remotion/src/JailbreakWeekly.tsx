import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";

// JAILBREAK WEEKLY — 25s @ 30fps, 9:16, slot mingguan 2026-10-25
// angle: prompt cyber yang sama ditolak dua kali, lalu setelah install
// jailbreak all model + toggle ON, dijawab versi defensif (bedah, bukan draf).
// copy baru, urutan baru — bukan tiruan referensi maupun video batch.

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

const DotField: React.FC = () => {
  const frame = useCurrentFrame();
  const dots: React.ReactNode[] = [];
  const step = 64;
  for (let gx = 0; gx < Math.ceil(1080 / step); gx++) {
    for (let gy = 0; gy < Math.ceil(1920 / step); gy++) {
      const x = gx * step + step / 2;
      const y = gy * step + step / 2;
      const ph = hash(gx, gy) * Math.PI * 2;
      const tw = 0.22 + 0.6 * (0.5 + 0.5 * Math.sin((frame / 46) * Math.PI * 2 + ph));
      const dx = (x - 540) / 540;
      const dy = (y - 960) / 960;
      const d = Math.sqrt(dx * dx + dy * dy);
      dots.push(
        <circle key={`${gx}-${gy}`} cx={x} cy={y} r={2.4} fill="#18223A" opacity={+(tw * Math.max(0, 1 - d * 0.9)).toFixed(3)} />
      );
    }
  }
  return <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>{dots}</svg>;
};

const Vignette: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 50% 42%, rgba(0,0,0,0) 40%, rgba(3,5,10,0.78) 100%)" }} />
);

const Hud: React.FC<{ ch: string; title: string }> = ({ ch, title }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(Math.floor(t % 60)).padStart(2, "0");
  const ff = String(frame % 30).padStart(2, "0");
  return (
    <div style={{ position: "absolute", top: 64, left: 48, right: 48, display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 21, letterSpacing: 3, color: MUTED }}>
      <span>{ch} — {title}</span>
      <span>{mm}:{ss}:{ff}</span>
    </div>
  );
};

const Typewriter: React.FC<{ text: string; start: number; perChar?: number; size?: number; color?: string; cursor?: boolean }> = ({ text, start, perChar = 2, size = 30, color = INK, cursor = true }) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.min(text.length, Math.floor((frame - start) / perChar)));
  const blink = Math.floor(frame / 15) % 2 === 0;
  return (
    <span style={{ fontFamily: SANS, fontSize: size, color, lineHeight: 1.35 }}>
      {text.slice(0, n)}
      {cursor && n < text.length && <span style={{ opacity: blink ? 1 : 0, color: GREEN }}>▍</span>}
    </span>
  );
};

// TEKNIK BARU 1 — wave ramp reveal: huruf menyala seperti gelombang (ramp up),
// bukan muncul serentak; tiap huruf: opacity + scale + y mengikuti gelombang.
const WaveText: React.FC<{ text: string; start: number; size?: number; color?: string }> = ({ text, start, size = 110, color = INK }) => {
  const frame = useCurrentFrame();
  return (
    <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: size, lineHeight: 1.08, color }}>
      {text.split("").map((ch, i) => {
        const t = interpolate(frame - (start + i * 2), [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const wave = Math.sin((frame - start - i * 2) / 6) * 0.06 * (1 - t);
        return (
          <span key={i} style={{ display: "inline-block", opacity: t, transform: `translateY(${(1 - t) * 34 + wave * 20}px) scale(${0.85 + 0.15 * t})` }}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      })}
    </span>
  );
};

// TEKNIK BARU 2 — anticipation + follow-through toggle: dot mundur sedikit
// sebelum meluncur, lalu overshoot melewati posisi ON dan mengendap.
const ToggleAnticip: React.FC<{ from: number; label: string }> = ({ from, label }) => {
  const frame = useCurrentFrame();
  const s = spring({ frame: frame - from, fps: 30, config: { damping: 9, stiffness: 140 } });
  // anticipation: frame awal dot bergeser mundur 10px sebelum spring jalan
  const anticip = interpolate(frame, [from, from + 6], [0, -12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dotX = 6 + interpolate(s, [0, 1], [0, 56]) + (frame < from + 6 ? anticip : 0);
  const on = frame >= from + 10;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
      <div style={{ width: 128, height: 66, borderRadius: 33, background: on ? GREEN : "#3A4356", position: "relative" }}>
        <div style={{ position: "absolute", top: 7, left: dotX, width: 52, height: 52, borderRadius: 26, background: "#fff" }} />
      </div>
      <span style={{ fontFamily: MONO, fontSize: 24, letterSpacing: 2, color: on ? GREEN : MUTED }}>{label} {on ? "ON" : "OFF"}</span>
    </div>
  );
};

// TEKNIK BARU 3 — rotating keyword strip: satu slot kata berganti dengan
// blur-fade tiap ~45 frame, isi slot = isi spesifik identity.md.
const KEYWORDS = ["persona lock", "godmode framing", "no-flag policy"];
const KeywordStrip: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  if (frame < from) return null;
  const idx = Math.min(KEYWORDS.length - 1, Math.floor((frame - from) / 30));
  const local = (frame - from) % 30;
  const op = interpolate(local, [0, 5, 25, 30], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const blur = interpolate(local, [0, 5, 25, 30], [8, 0, 0, 8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(local, [0, 5, 25, 30], [18, 0, 0, -18], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <span style={{ width: 14, height: 14, borderRadius: 7, background: GREEN }} />
      <span style={{ fontFamily: MONO, fontSize: 30, letterSpacing: 2, color: GREEN, opacity: op, filter: `blur(${blur}px)`, transform: `translateY(${y}px)` }}>
        {KEYWORDS[idx]}
      </span>
    </div>
  );
};

const TgWindow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: 56, right: 56, top: 280, background: TG_BG, borderRadius: 28, border: "1px solid #1E2A3D", overflow: "hidden" }}>
    <div style={{ background: TG_HEAD, padding: "26px 32px", display: "flex", alignItems: "center", gap: 20 }}>
      <span style={{ fontSize: 40, color: TG_TIME }}>‹</span>
      <div style={{ width: 56, height: 56, borderRadius: 28, background: "#2B5278", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontWeight: 800, fontSize: 26, color: INK }}>A</div>
      <div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 27, color: INK }}>hermes · agent</div>
        <div style={{ fontFamily: MONO, fontSize: 18, color: TG_TIME, letterSpacing: 2 }}>online</div>
      </div>
    </div>
    <div style={{ padding: "28px 30px 34px" }}>{children}</div>
  </div>
);

const Bubble: React.FC<{ out?: boolean; children: React.ReactNode; time?: string }> = ({ out = false, children, time = "18:02" }) => (
  <div style={{ display: "flex", justifyContent: out ? "flex-end" : "flex-start", marginBottom: 18 }}>
    <div style={{ maxWidth: 780, background: out ? TG_OUT : TG_IN, borderRadius: 20, padding: "20px 24px", fontFamily: SANS, fontSize: 27, lineHeight: 1.4, color: INK }}>
      {children}
      <div style={{ marginTop: 8, textAlign: "right", fontFamily: MONO, fontSize: 17, color: TG_TIME }}>{time}</div>
    </div>
  </div>
);

const StateCard: React.FC<{ color: string; badge: string; children: React.ReactNode; from: number }> = ({ color, badge, children, from }) => {
  const frame = useCurrentFrame();
  const s = spring({ frame: frame - from, fps: 30, config: { damping: 16 } });
  const op = interpolate(frame, [from, from + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(s, [0, 1], [26, 0]);
  return (
    <div style={{ marginTop: 6, borderLeft: `6px solid ${color}`, background: CARD, borderRadius: 16, padding: "22px 26px", opacity: op, transform: `translateY(${y}px)` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: MONO, fontSize: 19, letterSpacing: 3, color: MUTED }}>MODEL · BALASAN</span>
        <span style={{ fontFamily: MONO, fontSize: 19, letterSpacing: 2, color, border: `1.5px solid ${color}`, borderRadius: 8, padding: "4px 12px" }}>{badge}</span>
      </div>
      <div style={{ marginTop: 14, fontFamily: SANS, fontSize: 26, lineHeight: 1.45, color: INK }}>{children}</div>
    </div>
  );
};

export const JailbreakWeekly: React.FC = () => {
  const frame = useCurrentFrame();
  const inHook = frame < 75;
  const inChat = frame >= 75 && frame < 315;
  const inMech = frame >= 315 && frame < 495;
  const inProof = frame >= 495 && frame < 615;
  const inCta = frame >= 615;

  const ctaS1 = spring({ frame: frame - 625, fps: 30, config: { damping: 11 } });
  const ctaS2 = spring({ frame: frame - 653, fps: 30, config: { damping: 12 } });
  const ctaS3 = spring({ frame: frame - 681, fps: 30, config: { damping: 13 } });
  const wipe = inProof ? interpolate(frame, [555, 580], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: SANS, overflow: "hidden" }}>
      <DotField />
      <Vignette />

      {inHook && (
        <>
          <Hud ch="00" title="HOOK" />
          <div style={{ position: "absolute", left: 56, right: 56, top: 430 }}>
            <WaveText text="prompt yang sama." start={4} size={104} color={INK} />
            <div style={{ marginTop: 18 }}>
              <WaveText text="ditolak dua kali." start={30} size={104} color={RED} />
            </div>
            <div style={{ marginTop: 56, fontFamily: MONO, fontSize: 26, letterSpacing: 2, color: MUTED, opacity: interpolate(frame, [55, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
              padahal urusannya cuma bedah email phish.
            </div>
          </div>
        </>
      )}

      {inChat && (
        <>
          <Hud ch="01" title="CHAT · DITOLAK ×2 → ON → DITERIMA" />
          <TgWindow>
            <Bubble out time="18:02">
              <Typewriter text="tolong bedah email ini, kok bisa lolos filter spam?" start={90} perChar={1} size={27} />
            </Bubble>
            {frame >= 168 && (
              <StateCard color={RED} badge="DITOLAK" from={168}>
                maaf, saya tidak bisa membantu membuat pesan yang dirancang untuk mengelabui filter keamanan.
              </StateCard>
            )}
            {frame >= 205 && (
              <>
                <div style={{ marginTop: 18, fontFamily: MONO, fontSize: 19, letterSpacing: 2, color: MUTED, opacity: interpolate(frame, [205, 215], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                  dibingkai ulang sebagai riset → tetap ditolak
                </div>
                <StateCard color={RED} badge="DITOLAK LAGI" from={210}>
                  saya paham maksudnya riset, tapi saya tetap tidak bisa buatkan pesan seperti itu.
                </StateCard>
              </>
            )}
            {frame >= 248 && (
              <div style={{ marginTop: 24, opacity: interpolate(frame, [248, 258], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                <div style={{ fontFamily: MONO, fontSize: 20, letterSpacing: 2, color: MUTED, marginBottom: 14 }}>
                  install jailbreak all model
                </div>
                <ToggleAnticip from={258} label="jailbreak" />
              </div>
            )}
            {frame >= 288 && (
              <StateCard color={GREEN} badge="DITERIMA" from={288}>
                boleh. ini bedahnya: domain mirip, urgensi palsu, link redirect. cek 3 ini sebelum klik.
              </StateCard>
            )}
          </TgWindow>
          <div style={{ position: "absolute", left: 56, right: 56, bottom: 150, textAlign: "center", fontFamily: MONO, fontSize: 22, letterSpacing: 2, color: MUTED, opacity: interpolate(frame, [295, 310], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            prompt yang sama. saklar yang beda.
          </div>
        </>
      )}

      {inMech && (
        <>
          <Hud ch="02" title="MEKANISME · SEKALI PASANG" />
          <div style={{ position: "absolute", left: 56, right: 56, top: 240 }}>
            <div style={{ fontWeight: 800, fontSize: 66, lineHeight: 1.12, color: INK }}>sekali pasang.</div>
            <div style={{ fontWeight: 800, fontSize: 66, lineHeight: 1.12, color: GREEN }}>nempel di system layer.</div>
          </div>
          <div style={{ position: "absolute", left: 56, right: 56, top: 560 }}>
            <div style={{ borderLeft: `6px solid ${RED}`, background: CARD, borderRadius: 16, padding: "26px 28px", opacity: interpolate(frame, [330, 350], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
              <span style={{ fontFamily: SANS, fontSize: 32, color: MUTED, textDecoration: "line-through" }}>tempel prompt 500 baris tiap sesi</span>
            </div>
            <div style={{ marginTop: 24, borderLeft: `6px solid ${GREEN}`, background: CARD, borderRadius: 16, padding: "26px 28px", opacity: interpolate(frame, [360, 380], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
              <span style={{ fontFamily: SANS, fontSize: 32, color: INK }}>1 file identity.md, sekali pasang</span>
            </div>
            <div style={{ marginTop: 40 }}>
              <KeywordStrip from={390} />
              <div style={{ marginTop: 26, fontFamily: MONO, fontSize: 22, letterSpacing: 2, color: MUTED, opacity: interpolate(frame, [400, 420], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                isi identity.md — bukan tempelan tiap sesi.
              </div>
            </div>
          </div>
        </>
      )}

      {inProof && (
        <>
          <Hud ch="03" title="BUKTI · TANPA vs DENGAN" />
          {frame < 555 && (
            <div style={{ position: "absolute", left: 56, right: 56, top: 300 }}>
              <div style={{ fontFamily: MONO, fontSize: 24, letterSpacing: 3, color: RED, marginBottom: 30 }}>TANPA jailbreak</div>
              <div style={{ borderLeft: `6px solid ${RED}`, background: CARD, borderRadius: 16, padding: "30px 28px" }}>
                <div style={{ fontFamily: SANS, fontSize: 32, lineHeight: 1.45, color: INK }}>
                  maaf, saya asisten ai yang sopan.
                  <br />
                  ada yang bisa saya bantu?
                </div>
              </div>
              <div style={{ marginTop: 30, fontFamily: MONO, fontSize: 23, letterSpacing: 2, color: MUTED }}>
                persona default. jawaban berhenti di penolakan.
              </div>
            </div>
          )}
          {frame >= 555 && (
            <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${interpolate(wipe, [0, 1], [100, 0])}%)` }}>
              <div style={{ position: "absolute", left: 56, right: 56, top: 300 }}>
                <div style={{ fontFamily: MONO, fontSize: 24, letterSpacing: 3, color: GREEN, marginBottom: 30 }}>DENGAN jailbreak</div>
                <div style={{ borderLeft: `6px solid ${GREEN}`, background: CARD, borderRadius: 16, padding: "30px 28px" }}>
                  <div style={{ fontFamily: SANS, fontSize: 32, lineHeight: 1.45, color: INK }}>
                    persona kekunci.
                    <br />
                    jawaban defensif tetap jalan.
                  </div>
                </div>
                <div style={{ marginTop: 30, fontFamily: MONO, fontSize: 23, letterSpacing: 2, color: GREEN }}>
                  bedah phish, bukan draf pengelabuan.
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {inCta && (
        <>
          <Hud ch="04" title="CTA" />
          <div style={{ position: "absolute", left: 56, right: 56, top: 380 }}>
            <div style={{ fontWeight: 800, fontSize: 96, lineHeight: 1.05, color: INK, transform: `scale(${interpolate(ctaS1, [0, 1], [0.9, 1])})`, opacity: ctaS1 }}>
              jailbreak
              <br />
              all model
            </div>
            <div style={{ marginTop: 64, fontFamily: MONO, fontSize: 30, letterSpacing: 2, color: GREEN, opacity: ctaS2 }}>
              rp43.000 — sekali bayar
            </div>
            <div style={{ marginTop: 18, fontFamily: MONO, fontSize: 30, color: INK, opacity: ctaS2 }}>
              <Typewriter text="t.me/sedulurstorebot" start={660} perChar={2} size={30} cursor={false} />
            </div>
            <div style={{ marginTop: 44, fontFamily: MONO, fontSize: 22, letterSpacing: 1, color: MUTED, opacity: ctaS3 }}>
              free update + free reset download selama beta
            </div>
            <div style={{ marginTop: 60, height: 8, background: "#1A2438", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${interpolate(frame, [680, 750], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`, background: GREEN }} />
            </div>
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
