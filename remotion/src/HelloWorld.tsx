import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HelloWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 120 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#070b14",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          color: "#ffffff",
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: 8,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        REMOTION OK
      </div>
      <div
        style={{
          color: "#ff5a4e",
          fontSize: 40,
          marginTop: 24,
          fontWeight: 600,
        }}
      >
        1080x1920 smoke test
      </div>
      <div
        style={{
          width: 640,
          height: 12,
          marginTop: 64,
          backgroundColor: "#1b2333",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#ff5a4e",
          }}
        />
      </div>
    </div>
  );
};
