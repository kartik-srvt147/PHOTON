"use client";

import React from "react";
import { useReveal } from "@/hooks/use-reveal";
import { useCounter } from "@/hooks/use-counter";

const STATS = [
  {
    label: "Images Processed",
    val: 50,
    suffix: "M",
    prefix: "",
    delta: "+12.4%",
    color: "#22d3ee",
    sparkData: [20, 28, 22, 35, 30, 40, 50],
  },
  {
    label: "Revenue MTD",
    val: 82,
    suffix: "K",
    prefix: "$",
    delta: "+8.7%",
    color: "#34d399",
    sparkData: [50, 55, 48, 65, 70, 78, 82],
  },
  {
    label: "Active Users",
    val: 14872,
    suffix: "",
    prefix: "",
    delta: "+3.2%",
    color: "#a78bfa",
    sparkData: [10000, 11200, 10800, 12400, 13100, 14200, 14872],
  },
  {
    label: "Avg Latency",
    val: 310,
    suffix: "ms",
    prefix: "",
    delta: "-18%",
    color: "#fb923c",
    sparkData: [500, 460, 420, 390, 360, 330, 310],
  },
];

// ─── Individual sparkline SVG ─────────────────────────────────────────────
function Sparkline({ data, color, label }) {
  const W = 120;
  const H = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * W;
      const y = H - ((v - min) / range) * (H - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");

  const lastY = H - ((data[data.length - 1] - min) / range) * (H - 6) - 3;

  return (
    <svg width={W} height={H} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <polyline
        points={`0,${H} ${points} ${W},${H}`}
        fill={`url(#spark-${label})`}
        stroke="none"
      />
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle cx={W} cy={lastY} r="3" fill={color} />
    </svg>
  );
}

// ─── Single stat card ─────────────────────────────────────────────────────
function StatCard({
  label,
  val,
  suffix,
  prefix,
  delta,
  color,
  sparkData,
  visible,
  delay,
}) {
  const count = useCounter(val, visible);
  const isPositive = !delta.startsWith("-") || delta.includes("-%");

  return (
    <div
      className="dash-glass-card"
      style={{
        padding: "28px",
        opacity: 0,
        ...(visible && {
          animation: `fadeUp 0.7s ${delay}ms cubic-bezier(0.16,1,0.3,1) both`,
        }),
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "var(--text-dim)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
        <span
          className="dash-tag"
          style={{
            color: "#34d399",
            borderColor: "rgba(52,211,153,0.3)",
            background: "rgba(52,211,153,0.08)",
          }}
        >
          {delta}
        </span>
      </div>

      {/* Number */}
      <div
        style={{
          fontSize: 48,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color,
          marginBottom: 20,
          textShadow: `0 0 40px ${color}44`,
          animation: visible
            ? "countUp 0.6s cubic-bezier(0.16,1,0.3,1) both"
            : undefined,
        }}
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>

      {/* Sparkline */}
      <Sparkline data={sparkData} color={color} label={label} />
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────
export default function InteractiveStats() {
  const { ref, visible } = useReveal();

  return (
    <section
      style={{ padding: "20px 0 60px", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} visible={visible} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
