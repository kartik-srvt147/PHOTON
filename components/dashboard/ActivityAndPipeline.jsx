"use client";

import React from "react";
import { useReveal } from "@/hooks/use-reveal";

const ACTIVITIES = [
  {
    msg: "Batch #8821 completed — 2,400 images",
    time: "2m ago",
    color: "#34d399",
    icon: "✓",
  },
  {
    msg: "NeuraRemove v4 updated to 4.2.1",
    time: "11m ago",
    color: "#6366f1",
    icon: "↑",
  },
  {
    msg: "Enterprise invoice paid — $4,800",
    time: "23m ago",
    color: "#22d3ee",
    icon: "$",
  },
  {
    msg: "StyleForge job queued — 560 images",
    time: "41m ago",
    color: "#fb923c",
    icon: "⋯",
  },
  {
    msg: "GPU cluster auto-scaled to 48 nodes",
    time: "1h ago",
    color: "#a78bfa",
    icon: "⬡",
  },
  {
    msg: "New Enterprise signup — Pixar Studio",
    time: "2h ago",
    color: "#f472b6",
    icon: "★",
  },
];

const PIPELINE = [
  { stage: "Intake", count: 1240, color: "#6366f1", pct: 100 },
  { stage: "Queue", count: 883, color: "#a78bfa", pct: 71 },
  { stage: "GPU Proc", count: 612, color: "#22d3ee", pct: 49 },
  { stage: "QA Check", count: 590, color: "#34d399", pct: 47 },
  { stage: "Delivered", count: 571, color: "#fb923c", pct: 46 },
];

// ─── Activity Feed ────────────────────────────────────────────────────────
function ActivityFeed({ visible }) {
  return (
    <div
      className="dash-glass-card"
      style={{
        padding: "28px",
        opacity: 0,
        ...(visible && {
          animation: "fadeUp 0.7s 0ms cubic-bezier(0.16,1,0.3,1) both",
        }),
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-dim)",
              letterSpacing: "0.1em",
              marginBottom: 6,
            }}
          >
            LIVE FEED
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              fontFamily: "var(--font-display)",
            }}
          >
            Activity Stream
          </div>
        </div>

        {/* Live indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "#34d399",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#34d399",
              display: "inline-block",
              boxShadow: "0 0 6px #34d399",
            }}
          />
          LIVE
        </div>
      </div>

      {/* Rows */}
      {ACTIVITIES.map((a, i) => (
        <div key={i} className="dash-activity-row">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: `${a.color}18`,
              border: `1px solid ${a.color}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: a.color,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {a.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              {a.msg}
            </div>
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-dim)",
              flexShrink: 0,
            }}
          >
            {a.time}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Pipeline Funnel ──────────────────────────────────────────────────────
function PipelineFunnel({ visible }) {
  return (
    <div
      className="dash-glass-card"
      style={{
        padding: "28px",
        opacity: 0,
        ...(visible && {
          animation: "fadeUp 0.7s 120ms cubic-bezier(0.16,1,0.3,1) both",
        }),
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-dim)",
            letterSpacing: "0.1em",
            marginBottom: 6,
          }}
        >
          PIPELINE
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            fontFamily: "var(--font-display)",
          }}
        >
          Processing Funnel
        </div>
      </div>

      {PIPELINE.map((p, i) => (
        <div key={p.stage} style={{ marginBottom: 22 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: p.color,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  color: "var(--text-mid)",
                  fontWeight: 500,
                }}
              >
                {p.stage}
              </span>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: p.color,
                }}
              >
                {p.count.toLocaleString()}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text-dim)",
                }}
              >
                {p.pct}%
              </span>
            </div>
          </div>

          <div className="dash-progress-bar">
            <div
              className="dash-progress-fill"
              style={{
                width: visible ? `${p.pct}%` : "0%",
                background: `linear-gradient(90deg, ${p.color}88, ${p.color})`,
                transitionDelay: `${i * 120 + 300}ms`,
              }}
            />
          </div>
        </div>
      ))}

      {/* Conversion summary */}
      <div
        style={{
          marginTop: 28,
          padding: "18px 20px",
          background: "rgba(99,102,241,0.08)",
          borderRadius: 14,
          border: "1px solid rgba(99,102,241,0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 13, color: "var(--text-mid)" }}>
          End-to-end conversion
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#6366f1",
            letterSpacing: "-0.04em",
            fontFamily: "var(--font-display)",
          }}
        >
          46.1%
        </div>
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────
export default function ActivityAndPipeline() {
  const { ref, visible } = useReveal();

  return (
    <section style={{ padding: "0 0 80px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div
          ref={ref}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        >
          <ActivityFeed visible={visible} />
          <PipelineFunnel visible={visible} />
        </div>
      </div>
    </section>
  );
}
