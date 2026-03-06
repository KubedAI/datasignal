import type { SignalLight } from "../data/types";

const LIGHTS = {
  green:  { color: "#22C55E", glow: "#22C55E", label: "Good to do" },
  yellow: { color: "#F59E0B", glow: "#F59E0B", label: "Apply carefully" },
  red:    { color: "#EF4444", glow: "#EF4444", label: "Avoid in production" },
} as const;

type Props = {
  light: SignalLight;
  size?: "sm" | "md";
};

export default function TrafficLight({ light, size = "md" }: Props) {
  const { color, glow, label } = LIGHTS[light];
  const dot = size === "sm" ? 7 : 10;

  return (
    <div
      title={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "sm" ? 5 : 7,
        padding: size === "sm" ? "3px 8px" : "4px 10px",
        borderRadius: 20,
        background: `${color}12`,
        border: `1px solid ${color}30`,
        flexShrink: 0,
      }}
    >
      <div style={{
        width: dot,
        height: dot,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 ${size === "sm" ? 6 : 10}px ${glow}`,
        animation: "blink 2.5s ease-in-out infinite",
        flexShrink: 0,
      }} />
      <span style={{
        fontSize: size === "sm" ? 9 : 10,
        fontWeight: 600,
        color: color,
        letterSpacing: "0.08em",
        fontFamily: "'JetBrains Mono', monospace",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
    </div>
  );
}
