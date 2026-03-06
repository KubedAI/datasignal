import { FRAMEWORKS } from "../data/tips";
import { getFrameworkIcon } from "./FrameworkIcon";
import TrafficLight from "./TrafficLight";

type Props = {
  onSelect: (id: string) => void;
};

export default function Hero({ onSelect }: Props) {
  const totalSignals = FRAMEWORKS.reduce((sum, f) => sum + f.signals.length, 0);

  return (
    <main style={{
      flex: 1,
      overflow: "auto",
      position: "relative",
    }}>
      {/* Animated grid background — fixed so it doesn't scroll */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(#0F2040 1px, transparent 1px),
          linear-gradient(90deg, #0F2040 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)",
      }} />

      {/* Pulse rings */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            position: "absolute",
            width: `${i * 220}px`, height: `${i * 140}px`,
            borderRadius: "50%",
            border: `1px solid #E25A1C${["18", "10", "08"][i - 1]}`,
            animation: `pulse ${2 + i * 0.8}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }} />
        ))}
      </div>

      {/* Signal dot trail — decorative */}
      <div style={{ position: "absolute", top: "35%", left: "10%", right: "10%", zIndex: 0, display: "flex", alignItems: "center", gap: 0, pointerEvents: "none" }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 1,
            background: i % 3 === 0 ? "#E25A1C20" : "#1A2A3A",
          }} />
        ))}
      </div>

      {/* Scroll container — centers when content fits, scrolls from top when it doesn't */}
      <div style={{
        minHeight: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "48px 48px 56px",
        position: "relative", zIndex: 1,
      }}>

      {/* Main content */}
      <div style={{ textAlign: "center", maxWidth: 720, width: "100%" }}>

        {/* Label */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "5px 14px", borderRadius: 20,
          background: "#0A0F1E", border: "1px solid #1A2540",
          marginBottom: 32,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#E25A1C",
            boxShadow: "0 0 10px #E25A1C",
            animation: "blink 2s ease-in-out infinite",
          }} />
          <span style={{ fontSize: 10, color: "#6B8099", letterSpacing: "0.12em", fontFamily: "'JetBrains Mono', monospace" }}>
            DATA SIGNAL / PRODUCTION INSIGHTS
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 52, fontWeight: 700, lineHeight: 1.05,
          letterSpacing: "-0.03em", margin: "0 0 20px",
          fontFamily: "'Space Grotesk', sans-serif",
          background: "linear-gradient(135deg, #F0F4FF 30%, #8A9CB0 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Signals from<br />the Field
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: 15, color: "#5A6A7E", lineHeight: 1.75,
          marginBottom: 40, fontFamily: "'Space Grotesk', sans-serif",
        }}>
          Real learnings from running data and AI workloads on Kubernetes at scale.<br />
          No theory. No fluff. Just what works in production.
        </p>

        {/* Animated traffic light legend */}
        <div style={{ marginBottom: 28 }}>
          <TrafficLight animate={true} bulb={72} />
        </div>

        {/* Stats */}
        <div style={{
          display: "inline-flex", gap: 0, marginBottom: 48,
          background: "#0A0F1E", border: "1px solid #1A2540", borderRadius: 12, overflow: "hidden",
        }}>
          {[
            { value: String(totalSignals), label: "Signals" },
            { value: String(FRAMEWORKS.length), label: "Frameworks" },
            { value: "13", label: "Data Frameworks" },
            { value: "1", label: "AI Frameworks" },
            { value: "Kubernetes", label: "Platform" },
          ].map((stat, i, arr) => (
            <div key={i} style={{
              padding: "16px 28px", textAlign: "center",
              borderRight: i < arr.length - 1 ? "1px solid #1A2540" : "none",
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#E25A1C", fontFamily: "'JetBrains Mono', monospace" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 10, color: "#5A7090", letterSpacing: "0.1em", marginTop: 3, fontFamily: "'JetBrains Mono', monospace" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Framework selector grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10, maxWidth: 720, margin: "0 auto",
        }}>
          {FRAMEWORKS.map(f => (
            <button
              key={f.id}
              onClick={() => onSelect(f.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "13px 14px", borderRadius: 12, cursor: "pointer",
                background: "#0A0F1E",
                border: `1px solid ${f.color}25`,
                textAlign: "left", transition: "all 0.22s",
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `${f.color}0E`;
                el.style.borderColor = `${f.color}60`;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = `0 8px 32px ${f.color}20`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#0A0F1E";
                el.style.borderColor = `${f.color}25`;
                el.style.transform = "none";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                background: `${f.color}18`, border: `1px solid ${f.color}35`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {getFrameworkIcon(f.id, 18)}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#D0D8E8", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {f.name}
                </div>
                <div style={{ fontSize: 10, color: f.color + "AA", marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>
                  {f.signals.length} signals
                </div>
              </div>
              <div style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                fontSize: 16, color: f.color + "60",
              }}>→</div>
            </button>
          ))}
        </div>
        {/* Author card */}
        <div style={{
          marginTop: 48, display: "inline-flex", alignItems: "center", gap: 16,
          padding: "18px 24px", borderRadius: 16,
          background: "#0A0F1E", border: "1px solid #1A2540",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}>
          <img
            src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/vara-linkedin.jpeg`}
            alt="Vara Bonthu"
            style={{
              width: 56, height: 56, borderRadius: "50%",
              objectFit: "cover", objectPosition: "center top",
              border: "2px solid #E25A1C50", flexShrink: 0,
            }}
          />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#D0D8E8", fontFamily: "'Space Grotesk', sans-serif" }}>
              Vara Bonthu
            </div>
            <div style={{ fontSize: 11, color: "#E25A1C", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>
              Data and AI on Kubernetes
            </div>
            <div style={{ fontSize: 11, color: "#5A6A7E", fontFamily: "'Space Grotesk', sans-serif", marginTop: 3 }}>
              Principal Open Source Solutions Architect · AWS
            </div>
            <a
              href="https://www.linkedin.com/in/varaprofile/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                marginTop: 8, fontSize: 11, color: "#0A66C2",
                fontFamily: "'JetBrains Mono', monospace", textDecoration: "none",
                padding: "3px 10px", borderRadius: 6,
                background: "#0A66C210", border: "1px solid #0A66C230",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          </div>
        </div>

      </div>
      </div>
    </main>
  );
}
