// app/dashboard/page.jsx
// ─────────────────────────────────────────────────────────────────────────
// FloatingShapes is already rendered by layout.jsx inside <main>.
// This page just needs position: relative + z-index: 1 on its sections
// so content sits above the fixed shapes without hiding them.
// The dash-root wrapper uses a transparent background — never bg-slate-900
// here, since layout.jsx already handles that on <main>.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import HeroSection from "@/components/dashboard/HeroSection";
import InteractiveStats from "@/components/dashboard/InteractiveStats";
import FeaturesSection from "@/components/dashboard/FeaturesSection";
import ActivityAndPipeline from "@/components/dashboard/ActivityAndPipeline";
import PricingSection from "@/components/dashboard/PricingSection";

// Import the scoped dashboard CSS (keyframes + utility classes)
// Add this import to your globals.css instead if you prefer a single stylesheet:
//   @import "./dashboard.css";
import "./dashboard.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Dashboard — Photon",
  description: "Live AI image processing dashboard",
};

export default function DashboardPage() {
  return (
    // dash-root: transparent bg, Syne font scoped here.
    // DO NOT set bg-slate-900 — that comes from layout's <main>.
    // position: relative + z-index: 1 lets content sit above the
    // fixed FloatingShapes (z-index: 0) without covering it.
    <div
      className="dash-root"
      style={{
        position: "relative",
        zIndex: 1,
        fontFamily: "var(--font-display)",
        color: "#f8fafc",
        overflowX: "hidden",
      }}
    >
      {/* Live metrics ticker tape */}
      {/* <Ticker /> */}

      {/* Hero: headline + typewriter + orbiting cluster */}
      <HeroSection />

      {/* Four animated stat cards with sparklines */}
      <InteractiveStats />

      {/* Six AI model cards with mini bar charts */}
      <FeaturesSection />

      {/* Activity feed + processing funnel */}
      <ActivityAndPipeline />

      {/* Pricing tiers */}
      <PricingSection />

      <section
        style={{
          position: "relative",
          padding: "120px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow blobs */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)",
            top: "20%",
            left: "20%",
            pointerEvents: "none",
          }}
        />

        {/* Border top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(34,211,238,0.3), transparent)",
          }}
        />

        <div
          style={{
            maxWidth: 720,
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.28)",
              borderRadius: 50,
              padding: "6px 16px",
              marginBottom: 32,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "#a78bfa",
              letterSpacing: "0.1em",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22d3ee",
                boxShadow: "0 0 8px #22d3ee",
                display: "inline-block",
                animation: "pulse-ring 1.8s ease infinite",
              }}
            />
            GET STARTED TODAY
          </div>

          <h2
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.04em",
              marginBottom: 20,
              fontFamily: "var(--font-display)",
            }}
          >
            Ready to build
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #22d3ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              something extraordinary?
            </span>
          </h2>

          <p
            style={{
              fontSize: 17,
              color: "var(--text-mid)",
              lineHeight: 1.75,
              marginBottom: 48,
              maxWidth: 520,
              margin: "0 auto 48px",
            }}
          >
            Every pipeline. Every model. Every insight — all in one place. Stop
            context-switching. Start shipping.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="primary" size="xl" asChild>
              <Link href="/dashboard">Launch Photon ✦</Link>
            </Button>
          </div>

          {/* Social proof line */}
          <p
            style={{
              marginTop: 32,
              fontSize: 13,
              color: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
            }}
          >
            Trusted by 4,200+ teams · No credit card required · Free tier
            available
          </p>
        </div>
      </section>
    </div>
  );
}
