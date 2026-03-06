import { useState } from "react";
import type { Framework, Signal } from "../data/tips";
import ShareSheet from "./ShareSheet";
import TrafficLight from "./TrafficLight";

type Props = {
  signal: Signal;
  framework: Framework;
  total: number;
  index: number;
  onNext: () => void;
  onPrev: () => void;
};

function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export default function SignalCard({ signal, framework: fw, total, index, onNext, onPrev }: Props) {
  const [showShare, setShowShare] = useState(false);
  const progress = ((index + 1) / total) * 100;
  const color = fw.color;

  return (
    <>
      <div style={{
        position: "relative",
        background: "linear-gradient(160deg, #0C1422 0%, #0A0F1C 60%, #070B18 100%)",
        borderRadius: 20,
        border: `1px solid ${color}28`,
        overflow: "hidden",
        boxShadow: `0 0 80px ${color}10, 0 24px 48px rgba(0,0,0,0.7), inset 0 1px 0 ${color}18`,
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        animation: "cardIn 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}>
        {/* Accent progress bar */}
        <div style={{ height: 2, background: "#0F1829", position: "relative" }}>
          <div style={{
            position: "absolute", left: 0, top: 0, height: "100%",
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${color}CC, ${color})`,
            borderRadius: 2,
            transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: `0 0 10px ${color}80`,
          }} />
        </div>

        {/* Dot-grid background texture */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `radial-gradient(${color}10 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }} />

        {/* Top-right glow orb */}
        <div style={{
          position: "absolute", top: -80, right: -80, width: 280, height: 280,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}14 0%, transparent 70%)`,
          zIndex: 0, pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, padding: "28px 32px 24px", flex: 1, display: "flex", flexDirection: "column" }}>

          {/* Top row: tag + traffic light + counter + share */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                padding: "4px 12px", borderRadius: 6,
                background: `${color}14`, border: `1px solid ${color}35`,
                fontSize: 10, fontWeight: 700, color: color,
                letterSpacing: "0.12em", textTransform: "uppercase",
                fontFamily: "'JetBrains Mono', monospace",
              }}>{signal.tag}</span>
              {signal.light && <TrafficLight light={signal.light} size="sm" />}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11, color: "#2E3E56", fontFamily: "'JetBrains Mono', monospace" }}>
                {index + 1}<span style={{ color: "#1A2A42" }}>/{total}</span>
              </span>
              <button
                onClick={() => setShowShare(true)}
                title="Share this signal"
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 12px", borderRadius: 8,
                  background: `${color}14`, border: `1px solid ${color}30`,
                  color: color, cursor: "pointer", fontSize: 11,
                  fontWeight: 600, letterSpacing: "0.04em",
                  transition: "all 0.2s", fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${color}24`; (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${color}14`; (e.currentTarget as HTMLElement).style.transform = "none"; }}
              >
                <ShareIcon />
                Share
              </button>
            </div>
          </div>

          {/* Metric callout */}
          <div style={{ display: "inline-flex", alignItems: "baseline", gap: 10, marginBottom: 18 }}>
            <span style={{
              fontSize: 44, fontWeight: 700, lineHeight: 1,
              color: color, fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "-0.03em",
              textShadow: `0 0 40px ${color}60`,
            }}>{signal.metric}</span>
            <span style={{ fontSize: 12, color: "#4A5A72", fontFamily: "'JetBrains Mono', monospace" }}>
              {signal.metricLabel}
            </span>
          </div>

          {/* Headline */}
          <div style={{
            fontSize: 22, fontWeight: 700, lineHeight: 1.35,
            color: "#F0F4FF", marginBottom: 20,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "-0.02em",
          }}>{signal.headline}</div>

          {/* Divider */}
          <div style={{
            height: 1, marginBottom: 20,
            background: `linear-gradient(90deg, ${color}50, transparent 80%)`,
          }} />

          {/* Detail */}
          <div style={{
            fontSize: 14, lineHeight: 1.8, color: "#7A8EA8", flex: 1,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>{signal.detail}</div>

          {/* Bottom nav row */}
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Progress dots */}
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {Array.from({ length: Math.min(total, 10) }).map((_, i) => (
                <div key={i} style={{
                  width: i === index ? 18 : 5,
                  height: 5, borderRadius: 3,
                  background: i === index ? color : "#1A2A42",
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  boxShadow: i === index ? `0 0 8px ${color}80` : "none",
                }} />
              ))}
              {total > 10 && (
                <span style={{ fontSize: 10, color: "#2E3E56", marginLeft: 4, fontFamily: "'JetBrains Mono', monospace" }}>+{total - 10}</span>
              )}
            </div>

            {/* Arrow buttons */}
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={onPrev}
                disabled={index === 0}
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  border: `1px solid ${index === 0 ? "#0F1829" : color + "50"}`,
                  background: index === 0 ? "transparent" : `${color}12`,
                  color: index === 0 ? "#1E2E44" : color,
                  fontSize: 16, cursor: index === 0 ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { if (index !== 0) (e.currentTarget as HTMLElement).style.background = `${color}22`; }}
                onMouseLeave={e => { if (index !== 0) (e.currentTarget as HTMLElement).style.background = `${color}12`; }}
              >←</button>
              <button
                onClick={onNext}
                disabled={index === total - 1}
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  border: `1px solid ${index === total - 1 ? "#0F1829" : color + "50"}`,
                  background: index === total - 1 ? "transparent" : `${color}18`,
                  color: index === total - 1 ? "#1E2E44" : color,
                  fontSize: 16, cursor: index === total - 1 ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                  boxShadow: index === total - 1 ? "none" : `0 0 20px ${color}30`,
                }}
                onMouseEnter={e => { if (index !== total - 1) (e.currentTarget as HTMLElement).style.background = `${color}28`; }}
                onMouseLeave={e => { if (index !== total - 1) (e.currentTarget as HTMLElement).style.background = `${color}18`; }}
              >→</button>
            </div>
          </div>
        </div>
      </div>

      {showShare && (
        <ShareSheet
          framework={fw}
          signal={signal}
          signalIndex={index}
          onClose={() => setShowShare(false)}
        />
      )}
    </>
  );
}
