import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const FRAMEWORKS = [
  {
    id: "spark",
    name: "Apache Spark",
    short: "Spark",
    icon: "⚡",
    color: "#FF6B2B",
    tagline: "Distributed compute at petabyte scale",
    tips: [
      {
        id: 1,
        tag: "Storage",
        headline: "NVMe Instance Store beats EBS for Shuffle",
        detail: "Local NVMe SSD (r6id, m6id, i3en) delivers 10–20x faster shuffle than EBS gp3. Zero network hops means your shuffle-heavy TPC-DS queries finish 40–60% faster. Karpenter can provision NVMe nodes on-demand — no pre-warming needed.",
        metric: "10–20× faster",
        metricLabel: "vs EBS shuffle"
      },
      {
        id: 2,
        tag: "Scheduling",
        headline: "Gang Scheduling prevents zombie drivers",
        detail: "Without gang scheduling, your Spark driver starts consuming resources while executors sit pending — a zombie job. YuniKorn's all-or-nothing placement ensures driver + all executors are scheduled atomically. No partial allocation, no deadlock.",
        metric: "0 zombie jobs",
        metricLabel: "with gang scheduling"
      },
      {
        id: 3,
        tag: "Memory",
        headline: "Set spark.memory.fraction to 0.8 on large nodes",
        detail: "On r6i.8xlarge+ (>200GB RAM), Kubernetes overhead is negligible. Push spark.memory.fraction to 0.8 and spark.memory.storageFraction to 0.3. You gain ~15% more executor memory for free — no extra cost.",
        metric: "+15%",
        metricLabel: "executor memory free"
      },
      {
        id: 4,
        tag: "Cost",
        headline: "Spot Instances for stateless Spark stages",
        detail: "Spark with checkpointing tolerates Spot interruptions gracefully. Run executors on Spot (c6i, m6i Spot) and keep only the driver on On-Demand. Karpenter handles Spot rebalancing automatically. Typical savings: 60–70% on compute.",
        metric: "60–70%",
        metricLabel: "compute cost savings"
      },
      {
        id: 5,
        tag: "Multi-Tenancy",
        headline: "One YuniKorn queue per team, not per namespace",
        detail: "Teams create multiple namespaces (sandbox, test) but share one YuniKorn queue parent. Placement rules map all team namespaces to their queue automatically. Quota is enforced at team level — not per-namespace. Cleaner and more flexible.",
        metric: "30 teams",
        metricLabel: "one scheduler config"
      },
      {
        id: 6,
        tag: "Celeborn",
        headline: "External Shuffle with Celeborn at scale",
        detail: "Beyond 1000 concurrent Spark tasks, local shuffle disk becomes a bottleneck. Apache Celeborn decouples shuffle from compute — dedicated shuffle nodes shared across all teams. Reduces executor disk I/O by 80% and enables true executor bin-packing.",
        metric: "80%",
        metricLabel: "less disk I/O per executor"
      },
    ]
  },
  {
    id: "flink",
    name: "Apache Flink",
    short: "Flink",
    icon: "🌊",
    color: "#00C9FF",
    tagline: "Stateful stream processing at millisecond latency",
    tips: [
      {
        id: 1,
        tag: "State Backend",
        headline: "Use RocksDB for state > 1GB per operator",
        detail: "The heap state backend is fast but limited by JVM memory. RocksDB spills to disk and handles state that's 100× the JVM heap size. On EKS, use gp3 EBS volumes mounted at /tmp/flink-rocksdb with provisioned IOPS 3000+.",
        metric: "100×",
        metricLabel: "more state capacity"
      },
      {
        id: 2,
        tag: "Checkpointing",
        headline: "Checkpoint to S3 with incremental mode",
        detail: "Full checkpoints at high state size can stall your pipeline for seconds. Enable incremental checkpointing in RocksDB — only changed SST files are uploaded to S3. A 50GB state checkpoint drops from 45s to under 3s.",
        metric: "45s → 3s",
        metricLabel: "checkpoint time"
      },
      {
        id: 3,
        tag: "Kubernetes",
        headline: "Native K8s mode over Standalone for EKS",
        detail: "Flink's native Kubernetes mode lets the JobManager request TaskManagers directly from the Kubernetes API. No fixed cluster size — TaskManagers scale up per-job and terminate when idle. Pair with Karpenter for truly elastic streaming infra.",
        metric: "0 idle",
        metricLabel: "TaskManagers between jobs"
      },
      {
        id: 4,
        tag: "Backpressure",
        headline: "Credit-based flow control prevents OOM",
        detail: "Flink's network stack uses credit-based flow control. When a downstream operator is slow, upstream operators buffer data in managed memory (not heap). Never disable this. OOM errors in Flink streaming are almost always from disabling credit flow.",
        metric: "0 OOM",
        metricLabel: "with credit-flow enabled"
      },
    ]
  },
  {
    id: "trino",
    name: "Trino",
    short: "Trino",
    icon: "🔭",
    color: "#DD00FF",
    tagline: "Federated SQL across any data source",
    tips: [
      {
        id: 1,
        tag: "Memory",
        headline: "Set query.max-memory per query not per node",
        detail: "query.max-memory controls total memory across all nodes for a single query. query.max-memory-per-node controls per-node allocation. For ad-hoc analytics on EKS, set max-memory=100GB and max-memory-per-node=8GB. Over-allocation causes OOM cascades.",
        metric: "2× safer",
        metricLabel: "memory allocation"
      },
      {
        id: 2,
        tag: "Caching",
        headline: "Alluxio file caching cuts S3 costs 60%",
        detail: "Repeated scans of the same Parquet/ORC files on S3 cost both money and latency. Alluxio caching on local SSD (NVMe Karpenter nodes) serves repeated reads from cache. For BI dashboards refreshing every 5 min, S3 GET requests drop by 90%.",
        metric: "−60%",
        metricLabel: "S3 data transfer cost"
      },
      {
        id: 3,
        tag: "Kubernetes",
        headline: "Use dedicated worker pods per query group",
        detail: "Trino on EKS supports graceful pod shutdown — workers drain in-flight queries before terminating. Pair this with Karpenter Spot nodes: tag worker pods with disruption budgets so Spot reclamation doesn't kill running queries mid-scan.",
        metric: "0 query failures",
        metricLabel: "on Spot reclamation"
      },
    ]
  },
  {
    id: "starrocks",
    name: "StarRocks",
    short: "StarRocks",
    icon: "⭐",
    color: "#FFD600",
    tagline: "Sub-second analytics on lakehouse data",
    tips: [
      {
        id: 1,
        tag: "Lakehouse",
        headline: "Shared-data mode for EKS cost efficiency",
        detail: "StarRocks shared-data mode separates compute from storage — data lives in S3, FEs and BEs are stateless pods on EKS. Scale BEs up for heavy queries, scale down to zero overnight. No local disk dependency means Karpenter can use any instance type.",
        metric: "Stateless BEs",
        metricLabel: "scale to zero overnight"
      },
      {
        id: 2,
        tag: "Ingestion",
        headline: "Stream Load > INSERT INTO for real-time data",
        detail: "StarRocks Stream Load bypasses the FE query planner and writes directly to BE tablets. For Kafka-to-StarRocks pipelines, Stream Load achieves 500MB/s+ ingestion per BE vs 50MB/s for INSERT INTO. Use Routine Load for auto-managed Kafka consumption.",
        metric: "10×",
        metricLabel: "ingestion throughput"
      },
      {
        id: 3,
        tag: "Performance",
        headline: "Colocate tables that are always joined",
        detail: "When two large tables are co-located (same distribution key, same bucket count), joins happen locally without shuffle. Identify your 2–3 most-joined dimension tables and co-locate them with the fact table. Join performance improves 3–5× for these patterns.",
        metric: "3–5×",
        metricLabel: "join performance"
      },
    ]
  }
];

// ─── CARD COMPONENT ──────────────────────────────────────────────────────────

function TipCard({ tip, color, total, index, onNext, onPrev }) {
  const progress = ((index + 1) / total) * 100;

  return (
    <div style={{
      position: "relative",
      background: "linear-gradient(145deg, #0D1220 0%, #111827 100%)",
      borderRadius: 20,
      border: `1px solid ${color}33`,
      overflow: "hidden",
      boxShadow: `0 0 60px ${color}15, 0 20px 40px rgba(0,0,0,0.6)`,
      minHeight: 420,
      display: "flex",
      flexDirection: "column",
      animation: "cardIn 0.35s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Progress bar */}
      <div style={{ height: 3, background: "#1E2D45", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${color}, ${color}AA)`,
          borderRadius: 2,
          transition: "width 0.4s ease",
        }} />
      </div>

      {/* Grid texture */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(${color}06 1px, transparent 1px), linear-gradient(90deg, ${color}06 1px, transparent 1px)`,
        backgroundSize: "36px 36px",
      }} />

      {/* Glow */}
      <div style={{
        position: "absolute", top: -100, right: -100, width: 300, height: 300,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}18 0%, transparent 65%)`,
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, padding: "32px 36px 28px", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Tag + counter */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <span style={{
            padding: "5px 13px", borderRadius: 6,
            background: `${color}18`, border: `1px solid ${color}40`,
            fontSize: 11, fontWeight: 700, color: color,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontFamily: "'DM Mono', monospace",
          }}>{tip.tag}</span>

          <span style={{
            fontSize: 12, color: "#3A4A5E",
            fontFamily: "'DM Mono', monospace",
          }}>{index + 1} / {total}</span>
        </div>

        {/* Metric callout */}
        <div style={{
          display: "inline-flex", alignItems: "baseline", gap: 8, marginBottom: 20,
        }}>
          <span style={{
            fontSize: 42, fontWeight: 800, lineHeight: 1,
            color: color, fontFamily: "'DM Mono', monospace",
            letterSpacing: "-0.02em",
          }}>{tip.metric}</span>
          <span style={{
            fontSize: 13, color: "#5A6A7E",
            fontFamily: "'DM Mono', monospace",
          }}>{tip.metricLabel}</span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 24, fontWeight: 800, lineHeight: 1.25,
          color: "#FFFFFF", marginBottom: 20,
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "-0.01em",
        }}>{tip.headline}</div>

        {/* Divider */}
        <div style={{
          height: 1, marginBottom: 20,
          background: `linear-gradient(90deg, ${color}60, transparent)`,
        }} />

        {/* Detail */}
        <div style={{
          fontSize: 14, lineHeight: 1.8, color: "#8A9CB0", flex: 1,
          fontFamily: "'DM Mono', monospace",
        }}>{tip.detail}</div>

        {/* Nav row */}
        <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Dots */}
          <div style={{ display: "flex", gap: 6 }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} style={{
                width: i === index ? 20 : 6,
                height: 6, borderRadius: 3,
                background: i === index ? color : "#1E2D45",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>

          {/* Arrows */}
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onPrev} disabled={index === 0} style={{
              width: 40, height: 40, borderRadius: 10,
              border: `1px solid ${index === 0 ? "#1E2D45" : color + "60"}`,
              background: index === 0 ? "#0C1120" : `${color}15`,
              color: index === 0 ? "#2A3A52" : color,
              fontSize: 16, cursor: index === 0 ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
              fontFamily: "monospace",
            }}>←</button>
            <button onClick={onNext} disabled={index === total - 1} style={{
              width: 40, height: 40, borderRadius: 10,
              border: `1px solid ${index === total - 1 ? "#1E2D45" : color + "60"}`,
              background: index === total - 1 ? "#0C1120" : `${color}20`,
              color: index === total - 1 ? "#2A3A52" : color,
              fontSize: 16, cursor: index === total - 1 ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
              boxShadow: index === total - 1 ? "none" : `0 0 20px ${color}30`,
              fontFamily: "monospace",
            }}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeId, setActiveId] = useState("spark");
  const [cardIndex, setCardIndex] = useState(0);

  const fw = FRAMEWORKS.find(f => f.id === activeId);
  const color = fw.color;

  const handleFrameworkChange = (id) => {
    setActiveId(id);
    setCardIndex(0);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080B14",
      fontFamily: "'DM Mono', monospace",
      color: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; background: #0A0E1A; }
        ::-webkit-scrollbar-thumb { background: #1E2D45; border-radius: 3px; }
        .fw-item { cursor: pointer; transition: all 0.2s; }
        .fw-item:hover { transform: translateX(4px); }
      `}</style>

      {/* ── TOP NAV ── */}
      <nav style={{
        padding: "0 40px",
        height: 64,
        borderBottom: "1px solid #0F1A2E",
        background: "linear-gradient(180deg, #0D1220 0%, #080B14 100%)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: `linear-gradient(135deg, #FF6B2B, #FF4500)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
            boxShadow: "0 0 20px #FF6B2B55",
          }}>⚡</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.08em", color: "#FFF" }}>
              DATA SIGNAL
            </div>
            <div style={{ fontSize: 9, color: "#3A4A5E", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Data Frameworks on Kubernetes
            </div>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Best Practices", "Weekly Tips", "About"].map(l => (
            <span key={l} style={{
              fontSize: 12, color: "#5A6A7E", letterSpacing: "0.06em",
              cursor: "pointer", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#FFFFFF"}
              onMouseLeave={e => e.target.style.color = "#5A6A7E"}
            >{l}</span>
          ))}
          <div style={{
            padding: "7px 18px", borderRadius: 8,
            background: "#FF6B2B", color: "#FFF",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
            cursor: "pointer",
          }}>WEEKLY TIPS →</div>
        </div>
      </nav>

      {/* ── BODY ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={{
          width: 260,
          borderRight: "1px solid #0F1A2E",
          background: "linear-gradient(180deg, #0C1120 0%, #080B14 100%)",
          padding: "36px 0",
          flexShrink: 0,
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ padding: "0 24px 20px", fontSize: 10, color: "#3A4A5E", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Data Frameworks
          </div>

          {FRAMEWORKS.map(f => {
            const isActive = f.id === activeId;
            return (
              <div key={f.id} className="fw-item"
                onClick={() => handleFrameworkChange(f.id)}
                style={{
                  padding: "16px 24px",
                  background: isActive ? `${f.color}12` : "transparent",
                  borderLeft: `3px solid ${isActive ? f.color : "transparent"}`,
                  marginBottom: 2,
                  position: "relative",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: isActive ? `${f.color}25` : "#111827",
                    border: `1px solid ${isActive ? f.color + "60" : "#1E2D45"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18,
                    boxShadow: isActive ? `0 0 16px ${f.color}40` : "none",
                    transition: "all 0.2s",
                    flexShrink: 0,
                  }}>{f.icon}</div>
                  <div>
                    <div style={{
                      fontSize: 14, fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#FFFFFF" : "#5A6A7E",
                      letterSpacing: "0.02em",
                      transition: "color 0.2s",
                    }}>{f.name}</div>
                    <div style={{ fontSize: 10, color: isActive ? f.color + "AA" : "#2A3A52", marginTop: 2, letterSpacing: "0.04em" }}>
                      {f.tips.length} best practices
                    </div>
                  </div>
                </div>

                {isActive && (
                  <div style={{
                    position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                    width: 6, height: 6, borderRadius: "50%",
                    background: f.color,
                    boxShadow: `0 0 8px ${f.color}`,
                  }} />
                )}
              </div>
            );
          })}

          {/* Sidebar footer */}
          <div style={{ marginTop: "auto", padding: "24px", borderTop: "1px solid #0F1A2E" }}>
            <div style={{ fontSize: 11, color: "#FF6B2B", fontWeight: 700, marginBottom: 6, letterSpacing: "0.06em" }}>
              EVERY FRIDAY
            </div>
            <div style={{ fontSize: 11, color: "#3A4A5E", lineHeight: 1.6 }}>
              New production tip from real AWS customer engagements
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, padding: "48px 56px", overflowY: "auto" }}>

          {/* Framework header */}
          <div style={{ marginBottom: 48, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              {/* Breadcrumb */}
              <div style={{ fontSize: 11, color: "#3A4A5E", marginBottom: 12, letterSpacing: "0.06em" }}>
                BEST PRACTICES · <span style={{ color: color }}>{fw.name.toUpperCase()}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${color}20`, border: `1px solid ${color}50`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, boxShadow: `0 0 30px ${color}30`,
                }}>{fw.icon}</div>
                <div>
                  <h1 style={{
                    fontSize: 32, fontWeight: 800, color: "#FFFFFF",
                    letterSpacing: "-0.02em", lineHeight: 1.1,
                  }}>{fw.name}</h1>
                  <p style={{ fontSize: 13, color: "#5A6A7E", marginTop: 4 }}>{fw.tagline}</p>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div style={{
              background: "#0C1120", border: "1px solid #1E2D45",
              borderRadius: 12, padding: "12px 20px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: color }}>
                {cardIndex + 1}<span style={{ fontSize: 16, color: "#3A4A5E" }}>/{fw.tips.length}</span>
              </div>
              <div style={{ fontSize: 10, color: "#3A4A5E", letterSpacing: "0.06em", marginTop: 2 }}>
                COMPLETED
              </div>
            </div>
          </div>

          {/* Card */}
          <div style={{ maxWidth: 680 }}>
            <TipCard
              key={`${activeId}-${cardIndex}`}
              tip={fw.tips[cardIndex]}
              color={color}
              total={fw.tips.length}
              index={cardIndex}
              onNext={() => setCardIndex(i => Math.min(i + 1, fw.tips.length - 1))}
              onPrev={() => setCardIndex(i => Math.max(i - 1, 0))}
            />
          </div>

          {/* Completion message */}
          {cardIndex === fw.tips.length - 1 && (
            <div style={{
              maxWidth: 680, marginTop: 20,
              padding: "16px 24px", borderRadius: 12,
              background: `${color}10`, border: `1px solid ${color}30`,
              display: "flex", alignItems: "center", gap: 12,
              animation: "cardIn 0.4s ease",
            }}>
              <span style={{ fontSize: 20 }}>🎉</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: color }}>
                  You've seen all {fw.name} best practices!
                </div>
                <div style={{ fontSize: 12, color: "#5A6A7E", marginTop: 3 }}>
                  Pick another framework from the left, or check back Friday for a new tip.
                </div>
              </div>
            </div>
          )}

          {/* Quick-jump chips */}
          <div style={{ maxWidth: 680, marginTop: 32, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {fw.tips.map((t, i) => (
              <button key={i} onClick={() => setCardIndex(i)} style={{
                padding: "6px 14px", borderRadius: 20, cursor: "pointer",
                background: i === cardIndex ? `${color}20` : "#0C1120",
                border: `1px solid ${i === cardIndex ? color + "60" : "#1E2D45"}`,
                color: i === cardIndex ? color : "#3A4A5E",
                fontSize: 11, fontFamily: "'DM Mono', monospace",
                transition: "all 0.2s", fontWeight: i === cardIndex ? 700 : 400,
                letterSpacing: "0.04em",
              }}>{t.tag}</button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
