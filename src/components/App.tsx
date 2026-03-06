import { useState, useEffect } from "react";
import { FRAMEWORKS } from "../data/tips";
import Sidebar from "./Sidebar";
import FrameworkView from "./FrameworkView";
import Hero from "./Hero";
import { getFrameworkIcon } from "./FrameworkIcon";
import LogoMark from "./LogoMark";

function readURLState(): { fwId: string | null; signalIdx: number } {
  if (typeof window === "undefined") return { fwId: null, signalIdx: 0 };
  const p = new URLSearchParams(window.location.search);
  return {
    fwId: p.get("fw"),
    signalIdx: parseInt(p.get("s") || "0", 10) || 0,
  };
}

function writeURLState(fwId: string, signalIdx: number) {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams();
  p.set("fw", fwId);
  p.set("s", String(signalIdx));
  history.replaceState(null, "", `?${p.toString()}`);
}

export default function App() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [signalIdx, setSignalIdx] = useState(0);

  // Read URL params on mount for deep linking
  useEffect(() => {
    const { fwId, signalIdx: idx } = readURLState();
    if (fwId && FRAMEWORKS.some(f => f.id === fwId)) {
      setActiveId(fwId);
      setSignalIdx(idx);
    }
  }, []);

  const handleSelectFramework = (id: string) => {
    setActiveId(id);
    setSignalIdx(0);
    writeURLState(id, 0);
  };

  const handleSignalChange = (idx: number) => {
    setSignalIdx(idx);
    if (activeId) writeURLState(activeId, idx);
  };

  const fw = activeId ? FRAMEWORKS.find(f => f.id === activeId) ?? null : null;

  return (
    <div style={{
      height: "100vh",
      background: "#050810",
      fontFamily: "'Space Grotesk', sans-serif",
      color: "#F0F4FF",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* TOP NAV */}
      <nav style={{
        padding: "0 32px",
        height: 56,
        borderBottom: "1px solid #0F1829",
        background: "rgba(5,8,16,0.95)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
        position: "sticky", top: 0, zIndex: 50,
      }}>
        {/* Logo */}
        <button
          onClick={() => { setActiveId(null); history.replaceState(null, "", window.location.pathname); }}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "none", border: "none", cursor: "pointer", padding: 0,
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <LogoMark size={30} />
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", color: "#F0F4FF", fontFamily: "'JetBrains Mono', monospace" }}>
              DATA SIGNAL
            </div>
            <div style={{ fontSize: 9, color: "#5A7090", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
              Field Signals from Production
            </div>
          </div>
        </button>

        {/* Active framework breadcrumb */}
        {fw && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "5px 12px", borderRadius: 8,
            background: `${fw.color}0E`, border: `1px solid ${fw.color}28`,
          }}>
            <div style={{ width: 18, height: 18, display: "flex", alignItems: "center" }}>
              {getFrameworkIcon(fw.id, 18)}
            </div>
            <span style={{ fontSize: 11, color: fw.color, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              {fw.name}
            </span>
            <span style={{ fontSize: 10, color: "#2E3E56", fontFamily: "'JetBrains Mono', monospace" }}>
              Signal {signalIdx + 1}/{fw.signals.length}
            </span>
          </div>
        )}

        {/* Nav right */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a
            href={`${import.meta.env.BASE_URL}about`}
            style={{
              fontSize: 12, color: "#4A5A72", letterSpacing: "0.04em",
              textTransform: "uppercase", textDecoration: "none",
              transition: "color 0.2s", fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#F0F4FF")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#4A5A72")}
          >About</a>
        </div>
      </nav>

      {/* BODY */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar
          frameworks={FRAMEWORKS}
          activeId={activeId ?? ""}
          onSelect={handleSelectFramework}
        />
        {fw
          ? <FrameworkView
              framework={fw}
              initialSignal={signalIdx}
              onSignalChange={handleSignalChange}
            />
          : <Hero onSelect={handleSelectFramework} />
        }
      </div>
    </div>
  );
}
