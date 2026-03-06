import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Framework, Signal } from "../data/tips";

type Props = {
  framework: Framework;
  signal: Signal;
  signalIndex: number;
  onClose: () => void;
};

type Platform = {
  id: string;
  label: string;
  color: string;
  bg: string;
  icon: React.ReactNode;
  action: (url: string, text: string) => void;
};

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068c0-3.51.85-6.362 2.495-8.423C5.845 1.34 8.598.16 12.18.136c3.57.024 6.321 1.205 8.17 3.509C21.998 5.714 22.85 8.568 22.85 12.085c0 3.511-.852 6.363-2.5 8.421C18.497 22.808 15.741 23.976 12.186 24zm-.014-21.94c-3.065.021-5.388.972-6.905 2.825C4.04 6.44 3.417 8.825 3.417 12.068c0 3.243.623 5.628 1.85 7.183 1.517 1.853 3.84 2.804 6.905 2.825 3.077-.021 5.403-.972 6.915-2.825 1.23-1.555 1.852-3.94 1.852-7.183 0-3.244-.622-5.628-1.852-7.183C18.575 3.031 16.249 2.08 13.172 2.059l-.001.001zm.617 13.98c-1.19 0-2.17-.285-2.916-.848-.746-.563-1.15-1.366-1.196-2.385l-.004-.097h1.845l.004.077c.038.526.236.944.59 1.243.354.299.882.45 1.568.45.717 0 1.28-.164 1.675-.49.394-.324.592-.784.592-1.367 0-.583-.199-1.043-.592-1.367-.395-.326-.958-.49-1.675-.49h-.592v-1.607h.592c.624 0 1.127-.15 1.494-.447.368-.298.553-.714.553-1.237 0-.523-.185-.939-.553-1.237-.367-.297-.87-.447-1.494-.447-.614 0-1.118.15-1.499.447-.381.298-.572.714-.572 1.237v.01h-1.845v-.01c0-1.008.389-1.807 1.16-2.374.77-.567 1.741-.852 2.888-.852 1.148 0 2.12.285 2.89.852.77.567 1.16 1.366 1.16 2.374 0 .708-.192 1.307-.574 1.785a3.13 3.13 0 0 1-1.422 1.004c.624.19 1.11.528 1.452 1.009.343.481.515 1.075.515 1.768 0 1.028-.391 1.842-1.17 2.42-.779.578-1.772.869-2.952.869l-.001-.001z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export default function ShareSheet({ framework: fw, signal, signalIndex, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}${window.location.pathname}?fw=${fw.id}&s=${signalIndex}`
    : "";

  const shareText = `"${signal.headline}"\n\n${signal.metric} ${signal.metricLabel}\n\nProduction signal from ${fw.name} on Kubernetes.`;

  const platforms: Platform[] = [
    {
      id: "x",
      label: "Post on X",
      color: "#FFFFFF",
      bg: "#000000",
      icon: <XIcon />,
      action: (url, text) => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text + "\n\n" + url)}`, "_blank"),
    },
    {
      id: "linkedin",
      label: "Share on LinkedIn",
      color: "#FFFFFF",
      bg: "#0A66C2",
      icon: <LinkedInIcon />,
      action: (url) => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank"),
    },
    {
      id: "threads",
      label: "Post on Threads",
      color: "#FFFFFF",
      bg: "#101010",
      icon: <ThreadsIcon />,
      action: (url, text) => window.open(`https://www.threads.net/intent/post?text=${encodeURIComponent(text + "\n\n" + url)}`, "_blank"),
    },
    {
      id: "facebook",
      label: "Share on Facebook",
      color: "#FFFFFF",
      bg: "#1877F2",
      icon: <FacebookIcon />,
      action: (url) => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank"),
    },
    {
      id: "instagram",
      label: "Copy for Instagram",
      color: "#FFFFFF",
      bg: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
      icon: <InstagramIcon />,
      action: (_url, text) => navigator.clipboard.writeText(text + "\n\n" + shareUrl).then(() => setCopied(true)),
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const modal = (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(4, 7, 18, 0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div style={{
        width: "100%", maxWidth: 520,
        background: "linear-gradient(180deg, #0D1628 0%, #080B14 100%)",
        border: "1px solid #1A2540",
        borderBottom: "none",
        borderRadius: "20px 20px 0 0",
        padding: "24px 24px 32px",
        animation: "slideUp 0.3s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: `0 -20px 60px rgba(0,0,0,0.8), 0 -1px 0 ${fw.color}40`,
        maxHeight: "90vh",
        overflowY: "auto",
      }}>
        {/* Handle */}
        <div style={{ width: 40, height: 4, background: "#1A2540", borderRadius: 2, margin: "0 auto 28px" }} />

        {/* Signal preview */}
        <div style={{
          padding: "16px 20px", borderRadius: 12,
          background: `${fw.color}0D`, border: `1px solid ${fw.color}25`,
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 11, color: fw.color, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>
            SIGNAL · {signal.tag.toUpperCase()}
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#F0F4FF", lineHeight: 1.4 }}>
            {signal.headline}
          </div>
          <div style={{ fontSize: 13, color: fw.color, fontWeight: 700, marginTop: 8, fontFamily: "'JetBrains Mono', monospace" }}>
            {signal.metric} <span style={{ fontSize: 11, color: "#4A5A72", fontWeight: 400 }}>{signal.metricLabel}</span>
          </div>
        </div>

        <div style={{ fontSize: 12, color: "#3A4A5E", letterSpacing: "0.08em", marginBottom: 16 }}>
          SHARE THIS SIGNAL
        </div>

        {/* Platform buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => p.action(shareUrl, shareText)}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "13px 18px", borderRadius: 12, border: "none",
                background: typeof p.bg === "string" && p.bg.includes("gradient") ? p.bg : p.bg,
                color: p.color, cursor: "pointer",
                fontSize: 14, fontWeight: 600,
                transition: "opacity 0.15s, transform 0.15s",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; (e.currentTarget as HTMLElement).style.transform = "translateX(4px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              {p.icon}
              {p.label}
            </button>
          ))}
        </div>

        {/* Copy link */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 16px", borderRadius: 10,
          background: "#0A0F1E", border: "1px solid #1A2540",
        }}>
          <span style={{ flex: 1, fontSize: 12, color: "#3A4A5E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "'JetBrains Mono', monospace" }}>
            {shareUrl}
          </span>
          <button
            onClick={handleCopyLink}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 8, border: "none",
              background: copied ? "#1A3A1A" : "#1A2540",
              color: copied ? "#4ADE80" : "#8A9CB0",
              cursor: "pointer", fontSize: 12, fontWeight: 600, flexShrink: 0,
              transition: "all 0.2s", fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <CopyIcon />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );

  // Use portal to escape any overflow:hidden or transform ancestors
  // This ensures the fixed overlay always covers the full viewport
  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}
