import { useState, useMemo } from "react";
import type { Framework, FrameworkCategory } from "../data/tips";
import { CATEGORIES } from "../data/tips";
import { getFrameworkIcon } from "./FrameworkIcon";

type Props = {
  frameworks: Framework[];
  activeId: string;
  onSelect: (id: string) => void;
};

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5A7090" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function Sidebar({ frameworks, activeId, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Set<FrameworkCategory>>(new Set());

  const filtered = useMemo(() => {
    if (!search.trim()) return frameworks;
    const q = search.toLowerCase();
    return frameworks.filter(
      f => f.name.toLowerCase().includes(q) || f.short.toLowerCase().includes(q) || f.tagline.toLowerCase().includes(q)
    );
  }, [frameworks, search]);

  const grouped = useMemo(() => {
    const map = new Map<FrameworkCategory, Framework[]>();
    for (const cat of CATEGORIES) {
      const fws = filtered.filter(f => f.category === cat);
      if (fws.length > 0) map.set(cat, fws);
    }
    return map;
  }, [filtered]);

  const toggleCategory = (cat: FrameworkCategory) => {
    setCollapsed(prev => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  const totalSignals = frameworks.reduce((sum, f) => sum + f.signals.length, 0);

  return (
    <aside style={{
      width: 248,
      borderRight: "1px solid #0F1829",
      background: "linear-gradient(180deg, #080D1A 0%, #050810 100%)",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      overflow: "hidden",
    }}>
      {/* Sidebar header */}
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid #0F1829" }}>
        <div style={{ fontSize: 10, color: "#5A7090", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>
          {frameworks.length} frameworks · {totalSignals} signals
        </div>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search frameworks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "8px 10px 8px 32px",
              background: "#0A0F1E", border: "1px solid #1A2540",
              borderRadius: 8, color: "#8A9CB0", fontSize: 13,
              outline: "none", fontFamily: "'Space Grotesk', sans-serif",
              transition: "border-color 0.2s",
            }}
            onFocus={e => (e.target.style.borderColor = "#2A3A56")}
            onBlur={e => (e.target.style.borderColor = "#1A2540")}
          />
        </div>
      </div>

      {/* Framework list - scrollable */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {grouped.size === 0 && (
          <div style={{ padding: "24px 16px", textAlign: "center", fontSize: 12, color: "#5A7090", fontFamily: "'Space Grotesk', sans-serif" }}>
            No frameworks found
          </div>
        )}

        {Array.from(grouped.entries()).map(([cat, fws]) => {
          const isOpen = !collapsed.has(cat);
          return (
            <div key={cat}>
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat)}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#6B8099",
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
                  {cat}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 10, color: "#4A5E74", fontFamily: "'JetBrains Mono', monospace" }}>{fws.length}</span>
                  <ChevronIcon open={isOpen} />
                </div>
              </button>

              {/* Frameworks in category */}
              {isOpen && fws.map(f => {
                const isActive = f.id === activeId;
                return (
                  <button
                    key={f.id}
                    onClick={() => onSelect(f.id)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 14px 10px 16px",
                      background: isActive ? `${f.color}10` : "transparent",
                      borderLeft: `2px solid ${isActive ? f.color : "transparent"}`,
                      border: "none",
                      borderLeftStyle: "solid",
                      borderLeftWidth: 2,
                      borderLeftColor: isActive ? f.color : "transparent",
                      cursor: "pointer",
                      transition: "all 0.18s",
                      position: "relative",
                      textAlign: "left",
                    }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "#0A0F1E"; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: isActive ? `${f.color}18` : "#0A0F1E",
                      border: `1px solid ${isActive ? f.color + "40" : "#1A2540"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: isActive ? `0 0 14px ${f.color}35` : "none",
                      transition: "all 0.2s",
                      overflow: "hidden",
                    }}>
                      {getFrameworkIcon(f.id, 18)}
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 13, fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#F0F4FF" : "#8A9CB8",
                        fontFamily: "'Space Grotesk', sans-serif",
                        transition: "color 0.18s",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>{f.name}</div>
                      <div style={{
                        fontSize: 10, color: isActive ? f.color + "99" : "#4A5E74",
                        marginTop: 1, fontFamily: "'JetBrains Mono', monospace",
                      }}>
                        {f.signals.length} signal{f.signals.length !== 1 ? "s" : ""}
                      </div>
                    </div>

                    {/* Active dot */}
                    {isActive && (
                      <div style={{
                        width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
                        background: f.color,
                        boxShadow: `0 0 8px ${f.color}`,
                      }} />
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* About link at bottom */}
      <div style={{ borderTop: "1px solid #0F1829", padding: "14px 16px" }}>
        <a
          href="/about"
          style={{
            display: "flex", alignItems: "center", gap: 10,
            textDecoration: "none", padding: "8px 10px", borderRadius: 8,
            transition: "background 0.18s",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#0A0F1E")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
        >
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "linear-gradient(135deg, #1A3A5A, #0A1A2E)",
            border: "1px solid #1A2540",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13,
          }}>V</div>
          <div>
            <div style={{ fontSize: 12, color: "#8A9CB8", fontFamily: "'Space Grotesk', sans-serif" }}>Vara Bonthu</div>
            <div style={{ fontSize: 11, color: "#4A5E74", fontFamily: "'Space Grotesk', sans-serif" }}>About & Contact</div>
          </div>
        </a>
      </div>
    </aside>
  );
}
