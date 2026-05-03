"use client";

import React, { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

const MODELS = [
  {
    name: "NeuraRemove v4",
    status: "Active",
    uptime: 99.8,
    calls: "18.2M",
    latency: "280ms",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.1)",
    icon: "⚡",
    desc: "Billion-parameter BG removal. Best-in-class edge detection.",
    bars: [70, 90, 60, 95, 80, 75, 88],
  },
  {
    name: "QuantumScale 8x",
    status: "Active",
    uptime: 99.6,
    calls: "9.1M",
    latency: "410ms",
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.08)",
    icon: "🔭",
    desc: "Super-resolution with AI-hallucinated texture synthesis.",
    bars: [55, 65, 75, 60, 80, 70, 90],
  },
  {
    name: "GenFill Pro",
    status: "Beta",
    uptime: 97.4,
    calls: "3.8M",
    latency: "620ms",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    icon: "🎨",
    desc: "Diffusion-based generative inpainting with prompt control.",
    bars: [40, 55, 48, 65, 58, 70, 62],
  },
  {
    name: "ReLight AI",
    status: "Active",
    uptime: 99.1,
    calls: "6.4M",
    latency: "350ms",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    icon: "💡",
    desc: "Neural relighting engine. Change atmosphere in one click.",
    bars: [60, 72, 65, 80, 70, 85, 78],
  },
  {
    name: "StyleForge",
    status: "Active",
    uptime: 98.9,
    calls: "4.2M",
    latency: "510ms",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.08)",
    icon: "🌀",
    desc: "Artistic style transfer across 500+ curated aesthetics.",
    bars: [45, 60, 55, 68, 62, 72, 66],
  },
  {
    name: "BatchIQ Engine",
    status: "Active",
    uptime: 99.9,
    calls: "21.7M",
    latency: "190ms",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.08)",
    icon: "🧠",
    desc: "Parallel GPU orchestration. 10,000 images per minute.",
    bars: [80, 85, 78, 92, 88, 95, 90],
  },
];

// ─── Single model card ────────────────────────────────────────────────────
function ModelCard({ model: m, delay, visible }) {
  const [hovered, setHovered] = useState(false);
  const maxBar = Math.max(...m.bars);

  return (
    <div
      className="dash-glass-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        opacity: 0,
        ...(visible && {
          animation: `fadeUp 0.7s ${delay}ms cubic-bezier(0.16,1,0.3,1) both`,
        }),
        ...(hovered && {
          borderColor: `${m.color}40`,
          background: m.bg,
        }),
      }}
    >
      {/* Hover radial glow */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${m.color}18, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Icon + status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: m.bg,
            border: `1px solid ${m.color}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          {m.icon}
        </div>
        <span
          className="dash-tag"
          style={{
            color: m.status === "Beta" ? "#fb923c" : "#34d399",
            borderColor:
              m.status === "Beta"
                ? "rgba(251,146,60,0.3)"
                : "rgba(52,211,153,0.3)",
            background:
              m.status === "Beta"
                ? "rgba(251,146,60,0.08)"
                : "rgba(52,211,153,0.08)",
          }}
        >
          {m.status}
        </span>
      </div>

      {/* Name + description */}
      <div
        style={{
          fontWeight: 700,
          fontSize: 16,
          marginBottom: 6,
          letterSpacing: "-0.02em",
          fontFamily: "var(--font-display)",
        }}
      >
        {m.name}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "var(--text-dim)",
          lineHeight: 1.6,
          marginBottom: 18,
        }}
      >
        {m.desc}
      </div>

      {/* Mini bar chart */}
      <div
        style={{
          display: "flex",
          gap: 4,
          alignItems: "flex-end",
          height: 32,
          marginBottom: 16,
        }}
      >
        {m.bars.map((b, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              borderRadius: 3,
              height: `${(b / maxBar) * 100}%`,
              background: `linear-gradient(to top, ${m.color}88, ${m.color}44)`,
              transition: "height 0.8s cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: `${i * 60}ms`,
            }}
          />
        ))}
      </div>

      {/* Metrics row */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {[
          ["Calls", m.calls],
          ["Latency", m.latency],
          ["Uptime", `${m.uptime}%`],
        ].map(([k, v]) => (
          <div key={k}>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-dim)",
                fontFamily: "var(--font-mono)",
                marginBottom: 3,
              }}
            >
              {k}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: m.color }}>
              {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────
export default function FeaturesSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      style={{ padding: "40px 0 80px", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Section header */}
        <div
          ref={ref}
          className={`dash-reveal ${visible ? "dash-revealed" : ""}`}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 36,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text-dim)",
                letterSpacing: "0.12em",
                marginBottom: 10,
              }}
            >
              MODELS
            </div>
            <h2
              style={{
                fontSize: 36,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                fontFamily: "var(--font-display)",
              }}
            >
              Active <span className="dash-glow-text">intelligence.</span>
            </h2>
          </div>
          <button
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-mid)",
              padding: "9px 20px",
              borderRadius: 50,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "var(--font-display)",
            }}
          >
            View all models →
          </button>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }}
        >
          {MODELS.map((m, i) => (
            <ModelCard
              key={m.name}
              model={m}
              delay={i * 70}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
