"use client";

import React from "react";
import { useReveal } from "@/hooks/use-reveal";
import { useMagnet } from "@/hooks/use-magnet";

const PLANS = [
  {
    name: "Starter",
    price: 0,
    color: "#22d3ee",
    featured: false,
    features: [
      "100 img / month",
      "Background removal",
      "4x upscale",
      "API (limited)",
      "Community support",
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: 29,
    color: "#6366f1",
    featured: true,
    features: [
      "10,000 img / month",
      "All AI tools",
      "8x quantum upscale",
      "Full API + webhooks",
      "Batch processing",
      "Priority GPU",
      "Slack support",
    ],
    cta: "Unleash power",
  },
  {
    name: "Enterprise",
    price: 149,
    color: "#a78bfa",
    featured: false,
    features: [
      "Unlimited images",
      "Custom model tuning",
      "On-premise deploy",
      "SOC 2 Type II",
      "SLA guarantee",
      "Dedicated CSM",
    ],
    cta: "Contact sales",
  },
];

// ─── Single pricing card ───────────────────────────────────────────────────
function PricingCard({ plan: p, delay, visible }) {
  const mag = useMagnet(0.2);

  return (
    <div
      ref={mag.ref}
      {...mag.handlers}
      className="dash-glass-card"
      style={{
        padding: "32px",
        position: "relative",
        overflow: "hidden",
        opacity: 0,
        ...(visible && {
          animation: `fadeUp 0.7s ${delay}ms cubic-bezier(0.16,1,0.3,1) both`,
        }),
        ...(p.featured
          ? {
              background: "rgba(99,102,241,0.1)",
              borderColor: "rgba(99,102,241,0.4)",
              boxShadow: "0 0 60px rgba(99,102,241,0.2)",
              transform: `scale(1.03) translate(${mag.offset.x}px, ${mag.offset.y}px)`,
            }
          : {
              transform: `translate(${mag.offset.x}px, ${mag.offset.y}px)`,
            }),
        transition:
          "border-color 0.3s, background 0.3s, box-shadow 0.3s, transform 0.3s",
      }}
    >
      {/* Featured badge */}
      {p.featured && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              padding: "5px 22px",
              borderRadius: "0 0 14px 14px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              fontFamily: "var(--font-mono)",
              color: "#fff",
            }}
          >
            MOST POPULAR
          </div>
          {/* Background glow */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* Plan name + price */}
      <div style={{ marginTop: p.featured ? 20 : 0, marginBottom: 24 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: p.color,
            letterSpacing: "0.1em",
            marginBottom: 14,
          }}
        >
          {p.name}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span
            style={{
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: "#f8fafc",
              fontFamily: "var(--font-display)",
            }}
          >
            ${p.price}
          </span>
          <span style={{ fontSize: 14, color: "var(--text-dim)" }}>/month</span>
        </div>
      </div>

      <div
        style={{ height: 1, background: "var(--border)", marginBottom: 24 }}
      />

      {/* Feature list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 11,
          marginBottom: 28,
        }}
      >
        {p.features.map((f, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
          >
            <span
              style={{
                color: p.color,
                fontSize: 12,
                marginTop: 2,
                flexShrink: 0,
              }}
            >
              ✓
            </span>
            <span
              style={{
                fontSize: 13,
                color: "var(--text-mid)",
                lineHeight: 1.5,
              }}
            >
              {f}
            </span>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <button
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: 50,
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "var(--font-display)",
          transition: "all 0.2s",
          ...(p.featured
            ? {
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                border: "none",
                color: "#fff",
                boxShadow: "0 0 30px rgba(99,102,241,0.4)",
              }
            : {
                background: "transparent",
                border: "1px solid var(--border)",
                color: "var(--text-mid)",
              }),
        }}
      >
        {p.cta}
      </button>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────
export default function PricingSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      id="pricing"
      style={{ padding: "0 0 100px", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div
          ref={ref}
          className={`dash-reveal ${visible ? "dash-revealed" : ""}`}
          style={{ textAlign: "center", marginBottom: 52 }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-dim)",
              letterSpacing: "0.12em",
              marginBottom: 12,
            }}
          >
            PRICING
          </div>
          <h2
            style={{
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              marginBottom: 14,
              fontFamily: "var(--font-display)",
            }}
          >
            Power for every <span className="dash-glow-text">team.</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-mid)" }}>
            No hidden fees · Cancel anytime · Always improving.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            alignItems: "start",
            paddingTop: 12,
          }}
        >
          {PLANS.map((p, i) => (
            <PricingCard
              key={p.name}
              plan={p}
              delay={i * 80}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
