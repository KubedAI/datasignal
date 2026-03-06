import { useState, useEffect } from "react";
import type { SignalLight } from "../data/types";

const LIGHTS: { key: SignalLight; color: string; label: string }[] = [
  { key: "green",  color: "#22C55E", label: "Good"    },
  { key: "yellow", color: "#F59E0B", label: "Caution" },
  { key: "red",    color: "#EF4444", label: "Avoid"   },
];

type Props = {
  light?: SignalLight;   // static mode — show a fixed light
  animate?: boolean;     // animated mode — cycles green → yellow → red
  bulb?: number;         // bulb diameter in px
};

const CYCLE_MS = 1800;

export default function TrafficLight({ light, animate = false, bulb = 14 }: Props) {
  const [active, setActive] = useState<SignalLight>(light ?? "green");

  useEffect(() => {
    if (!animate) return;
    const order: SignalLight[] = ["green", "yellow", "red"];
    let i = 0;
    setActive(order[i]);
    const id = setInterval(() => {
      i = (i + 1) % 3;
      setActive(order[i]);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [animate]);

  // In static mode, keep in sync with the `light` prop
  useEffect(() => {
    if (!animate && light) setActive(light);
  }, [light, animate]);

  const gap      = Math.round(bulb * 0.45);
  const padH     = Math.round(bulb * 0.55);
  const padV     = Math.round(bulb * 0.45);
  const fontSize = Math.max(8, Math.round(bulb * 0.38));

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "flex-start",
      gap,
      padding: `${padV}px ${padH}px`,
      borderRadius: Math.round(bulb * 0.65),
      background: "#07090F",
      border: "1px solid #1A2540",
      boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5)",
    }}>
      {LIGHTS.map(({ key, color, label }) => {
        const isActive = key === active;
        return (
          <div key={key} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: Math.round(bulb * 0.3),
          }}>
            {/* Bulb */}
            <div style={{
              width: bulb,
              height: bulb,
              borderRadius: "50%",
              background: isActive ? color : `${color}18`,
              border: `1px solid ${isActive ? color + "99" : color + "20"}`,
              boxShadow: isActive
                ? `0 0 ${bulb * 0.8}px ${color}CC, 0 0 ${bulb * 1.6}px ${color}44`
                : "none",
              transition: "background 0.4s ease, box-shadow 0.4s ease",
              flexShrink: 0,
            }} />
            {/* Label */}
            <span style={{
              fontSize,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? color : "#2A3A50",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              transition: "color 0.4s ease",
            }}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
