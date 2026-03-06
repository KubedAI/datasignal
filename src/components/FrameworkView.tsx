import { useState, useEffect } from "react";
import type { Framework } from "../data/tips";
import SignalCard from "./SignalCard";
import { getFrameworkIcon } from "./FrameworkIcon";

type Props = {
  framework: Framework;
  initialSignal?: number;
  onSignalChange?: (index: number) => void;
};

export default function FrameworkView({ framework: fw, initialSignal = 0, onSignalChange }: Props) {
  const [cardIndex, setCardIndex] = useState(Math.min(initialSignal, fw.signals.length - 1));
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const color = fw.color;

  const tags = Array.from(new Set(fw.signals.map(s => s.tag)));

  const visibleSignals = activeTag
    ? fw.signals.filter(s => s.tag === activeTag)
    : fw.signals;

  // Guard: clamp to valid range, minimum 0
  const clampedIndex = visibleSignals.length === 0 ? 0 : Math.min(cardIndex, visibleSignals.length - 1);

  const setIndex = (i: number) => {
    setCardIndex(i);
    onSignalChange?.(i);
  };

  // BUG FIX: reset tag filter when switching frameworks so stale tags don't produce empty signal lists
  useEffect(() => {
    setActiveTag(null);
    setCardIndex(Math.min(initialSignal, fw.signals.length - 1));
  }, [fw.id]);

  return (
    <main style={{ flex: 1, padding: "36px 48px", overflowY: "auto", minWidth: 0 }}>

      {/* Framework header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 10, color: "#2E3E56", marginBottom: 12, letterSpacing: "0.12em", fontFamily: "'JetBrains Mono', monospace" }}>
          SIGNALS &nbsp;/&nbsp; <span style={{ color: color }}>{fw.name.toUpperCase()}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 50, height: 50, borderRadius: 14, flexShrink: 0,
              background: `${color}14`, border: `1px solid ${color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 24px ${color}25`,
            }}>
              {getFrameworkIcon(fw.id, 28)}
            </div>
            <div>
              <h1 style={{
                fontSize: 28, fontWeight: 700, color: "#F0F4FF",
                letterSpacing: "-0.02em", lineHeight: 1.1,
                fontFamily: "'Space Grotesk', sans-serif", margin: 0,
              }}>{fw.name}</h1>
              <p style={{ fontSize: 13, color: "#4A5A72", marginTop: 4, fontFamily: "'Space Grotesk', sans-serif" }}>
                {fw.tagline}
              </p>
            </div>
          </div>

          {/* Signal counter badge */}
          <div style={{
            background: "#0A0F1E", border: `1px solid ${color}30`,
            borderRadius: 12, padding: "10px 18px", textAlign: "center", flexShrink: 0,
          }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: color, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>
              {clampedIndex + 1}
              <span style={{ fontSize: 14, color: "#2E3E56" }}>/{visibleSignals.length}</span>
            </div>
            <div style={{ fontSize: 9, color: "#2E3E56", letterSpacing: "0.1em", marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>
              SIGNAL
            </div>
          </div>
        </div>
      </div>

      {/* Tag filter chips */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 28 }}>
        <button
          onClick={() => { setActiveTag(null); setIndex(0); }}
          style={{
            padding: "5px 14px", borderRadius: 20, cursor: "pointer",
            background: activeTag === null ? `${color}18` : "#0A0F1E",
            border: `1px solid ${activeTag === null ? color + "50" : "#1A2540"}`,
            color: activeTag === null ? color : "#3A4A5E",
            fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
            transition: "all 0.2s", fontWeight: activeTag === null ? 700 : 400,
            letterSpacing: "0.06em",
          }}
        >All · {fw.signals.length}</button>
        {tags.map(tag => {
          const isActive = activeTag === tag;
          const count = fw.signals.filter(s => s.tag === tag).length;
          return (
            <button
              key={tag}
              onClick={() => { setActiveTag(isActive ? null : tag); setIndex(0); }}
              style={{
                padding: "5px 14px", borderRadius: 20, cursor: "pointer",
                background: isActive ? `${color}18` : "#0A0F1E",
                border: `1px solid ${isActive ? color + "50" : "#1A2540"}`,
                color: isActive ? color : "#3A4A5E",
                fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
                transition: "all 0.2s", fontWeight: isActive ? 700 : 400,
                letterSpacing: "0.06em",
              }}
            >{tag} · {count}</button>
          );
        })}
      </div>

      {/* Signal card */}
      <div style={{ maxWidth: 660 }}>
        {visibleSignals.length === 0 ? (
          <div style={{
            padding: "40px 32px", borderRadius: 16,
            background: "#0A0F1E", border: "1px solid #1A2540",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 13, color: "#3A4A5E", fontFamily: "'Space Grotesk', sans-serif" }}>
              No signals for this tag. Select another filter above.
            </div>
          </div>
        ) : (
          <SignalCard
            key={`${fw.id}-${activeTag}-${clampedIndex}`}
            signal={visibleSignals[clampedIndex]}
            framework={fw}
            total={visibleSignals.length}
            index={clampedIndex}
            onNext={() => setIndex(Math.min(clampedIndex + 1, visibleSignals.length - 1))}
            onPrev={() => setIndex(Math.max(clampedIndex - 1, 0))}
          />
        )}
      </div>

      {/* Completion banner */}
      {clampedIndex === visibleSignals.length - 1 && visibleSignals.length > 1 && (
        <div style={{
          maxWidth: 660, marginTop: 16,
          padding: "14px 20px", borderRadius: 12,
          background: `${color}0C`, border: `1px solid ${color}28`,
          display: "flex", alignItems: "center", gap: 12,
          animation: "cardIn 0.4s ease",
        }}>
          <div style={{ fontSize: 18 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: color, fontFamily: "'Space Grotesk', sans-serif" }}>
              All {fw.name} signals reviewed
            </div>
            <div style={{ fontSize: 11, color: "#3A4A5E", marginTop: 2, fontFamily: "'Space Grotesk', sans-serif" }}>
              Pick another framework from the left or share this one.
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
