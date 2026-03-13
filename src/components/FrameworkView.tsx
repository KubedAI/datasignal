import { useState, useEffect } from "react";
import type { Framework } from "../data/tips";
import SignalCard from "./SignalCard";
import { getFrameworkIcon } from "./FrameworkIcon";

type Props = {
  framework: Framework;
  initialSignal?: number;
  onSignalChange?: (index: number) => void;
  isMobile?: boolean;
};

export default function FrameworkView({ framework: fw, initialSignal = 0, onSignalChange, isMobile = false }: Props) {
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
    <main style={{ flex: 1, padding: isMobile ? "20px 16px" : "36px 48px", overflowY: "auto", minWidth: 0 }}>

      {/* Framework header */}
      <div style={{ marginBottom: isMobile ? 20 : 36 }}>
        <div style={{ fontSize: 10, color: "#2E3E56", marginBottom: isMobile ? 8 : 12, letterSpacing: "0.12em", fontFamily: "'JetBrains Mono', monospace" }}>
          SIGNALS &nbsp;/&nbsp; <span style={{ color: color }}>{fw.name.toUpperCase()}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: isMobile ? 40 : 50, height: isMobile ? 40 : 50, borderRadius: 14, flexShrink: 0,
              background: `${color}14`, border: `1px solid ${color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 24px ${color}25`,
            }}>
              {getFrameworkIcon(fw.id, isMobile ? 22 : 28)}
            </div>
            <div>
              <h1 style={{
                fontSize: isMobile ? 20 : 28, fontWeight: 700, color: "#F0F4FF",
                letterSpacing: "-0.02em", lineHeight: 1.1,
                fontFamily: "'Space Grotesk', sans-serif", margin: 0,
              }}>{fw.name}</h1>
              <p style={{ fontSize: isMobile ? 11 : 13, color: "#4A5A72", marginTop: 4, fontFamily: "'Space Grotesk', sans-serif" }}>
                {fw.tagline}
              </p>
            </div>
          </div>

          {/* Signal counter badge */}
          <div style={{
            background: "#0A0F1E", border: `1px solid ${color}30`,
            borderRadius: 12, padding: isMobile ? "8px 14px" : "10px 18px", textAlign: "center", flexShrink: 0,
          }}>
            <div style={{ fontSize: isMobile ? 20 : 26, fontWeight: 700, color: color, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>
              {clampedIndex + 1}
              <span style={{ fontSize: isMobile ? 11 : 14, color: "#2E3E56" }}>/{visibleSignals.length}</span>
            </div>
            <div style={{ fontSize: 9, color: "#2E3E56", letterSpacing: "0.1em", marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>
              SIGNAL
            </div>
          </div>
        </div>
      </div>

      {/* Tag filter chips */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: isMobile ? 18 : 28 }}>
        <button
          onClick={() => { setActiveTag(null); setIndex(0); }}
          style={{
            padding: "5px 12px", borderRadius: 20, cursor: "pointer",
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
                padding: "5px 12px", borderRadius: 20, cursor: "pointer",
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
            isMobile={isMobile}
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
              {isMobile ? "Tap ← All above to pick another framework." : "Pick another framework from the left or share this one."}
            </div>
          </div>
        </div>
      )}

      {/* Submit a Signal CTA */}
      <div style={{
        maxWidth: 660, marginTop: 32,
        padding: isMobile ? "16px 16px" : "20px 24px", borderRadius: 14,
        background: "#07090F",
        border: "1px solid #1A2540",
        borderLeft: `3px solid ${color}60`,
        display: "flex", alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between", gap: 16,
        flexDirection: isMobile ? "column" : "row",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9, flexShrink: 0, marginTop: 1,
            background: `${color}12`, border: `1px solid ${color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#D0D8E8", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4 }}>
              Got a {fw.name} signal?
            </div>
            <div style={{ fontSize: 11, color: "#3A4A5E", lineHeight: 1.6, fontFamily: "'Space Grotesk', sans-serif" }}>
              Share a production tip or gotcha. We review every submission and publish it with your name and GitHub handle.
            </div>
          </div>
        </div>
        <a
          href={`https://github.com/KubedAI/datasignal/issues/new?template=signal-submission.yml&title=[Signal]+${encodeURIComponent(fw.name)}+—+`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flexShrink: 0,
            padding: "9px 18px", borderRadius: 9,
            background: `${color}15`, border: `1px solid ${color}40`,
            color: color, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.04em", textDecoration: "none",
            fontFamily: "'Space Grotesk', sans-serif",
            whiteSpace: "nowrap",
            transition: "background 0.2s",
            alignSelf: isMobile ? "stretch" : "auto",
            textAlign: "center",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = `${color}28`)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = `${color}15`)}
        >
          Submit a Signal →
        </a>
      </div>
    </main>
  );
}
