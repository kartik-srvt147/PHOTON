"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMagnet } from "@/hooks/use-magnet";
import Link from "next/link";
import { Button } from "../ui/button";

// ─── Orbiting radial cluster ──────────────────────────────────────────────
function HeroRadialCluster() {
  const [angle, setAngle] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(function loop(t) {
      setAngle(t * 0.02);
      rafRef.current = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const RADIUS = 140;
  const satellites = [
    { label: "GPU", val: "87%", color: "#a78bfa", offset: 0 },
    { label: "CPU", val: "34%", color: "#22d3ee", offset: 90 },
    { label: "MEM", val: "61%", color: "#34d399", offset: 180 },
    { label: "I/O", val: "12%", color: "#fb923c", offset: 270 },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeUp 0.9s 0.2s cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      <div style={{ position: "relative", width: 340, height: 340 }}>
        {/* Orbit rings */}
        <svg style={{ position: "absolute", inset: 0 }} viewBox="0 0 340 340">
          <circle
            cx="170"
            cy="170"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            strokeDasharray="6 6"
            style={{ animation: "marching 4s linear infinite" }}
          />
          <circle
            cx="170"
            cy="170"
            r="80"
            fill="none"
            stroke="rgba(99,102,241,0.15)"
            strokeWidth="1"
          />
        </svg>

        {/* Centre orb */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: 140,
            height: 140,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, rgba(99,102,241,0.4), rgba(30,27,75,0.9) 65%)",
            border: "1px solid rgba(99,102,241,0.35)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 0 60px rgba(99,102,241,0.3), inset 0 0 30px rgba(99,102,241,0.1)",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              background: "linear-gradient(135deg,#fff,#a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            94%
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--text-dim)",
              letterSpacing: "0.08em",
              fontFamily: "var(--font-mono)",
            }}
          >
            EFFICIENCY
          </div>
        </div>

        {/* Orbiting satellite nodes */}
        {satellites.map((s, i) => {
          const rad = ((angle + s.offset) * Math.PI) / 180;
          const x = 170 + RADIUS * Math.cos(rad) - 34;
          const y = 170 + RADIUS * Math.sin(rad) - 34;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 68,
                height: 68,
                borderRadius: 16,
                background: "rgba(15,23,42,0.9)",
                border: `1px solid ${s.color}44`,
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px ${s.color}22`,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: s.color,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--text-dim)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────
const WORDS = [
  "50M images.",
  "0.31s latency.",
  "$82K revenue.",
  "99.98% uptime.",
];

export default function HeroSection() {
  const [typed, setTyped] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const mag = useMagnet(0.18);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    let deleting = false;
    let current = WORDS[wordIndex];
    let timer;

    const tick = () => {
      if (!deleting) {
        setTyped(current.slice(0, i + 1));
        i++;
        if (i === current.length) {
          setTimeout(() => {
            deleting = true;
            tick();
          }, 2000);
          return;
        }
      } else {
        setTyped(current.slice(0, i - 1));
        i--;
        if (i === 0) {
          deleting = false;
          const next = (wordIndex + 1) % WORDS.length;
          setWordIndex(next);
          current = WORDS[next];
        }
      }
      timer = setTimeout(tick, deleting ? 35 : 65);
    };

    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, [wordIndex]);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0",
        position: "relative",
        zIndex: 1,
        // Ensure this sits above FloatingShapes (z-index 0) but doesn't cover it
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* Left: copy */}
          <div
            style={{ animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <h1
              style={{
                fontSize: "clamp(40px, 5vw, 68px)",
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: "-0.05em",
                marginBottom: 24,
                fontFamily: "var(--font-display)",
              }}
            >
              Your creative
              <br />
              intelligence
              <br />
              <span className="dash-glow-text">hub.</span>
            </h1>

            <p
              style={{
                fontSize: 17,
                color: "var(--text-mid)",
                lineHeight: 1.75,
                maxWidth: 420,
                marginBottom: 36,
              }}
            >
              Every metric, every model, every pipeline — unified in one
              breathtaking workspace.
            </p>

            {/* Typewriter */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                marginBottom: 40,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ color: "#22d3ee" }}>→</span>
              <span>Today: </span>
              <span
                style={{
                  color: "#f8fafc",
                  fontWeight: 500,
                  borderRight: "2px solid #a78bfa",
                  paddingRight: 4,
                  animation: "blink-caret 0.8s step-end infinite",
                }}
              >
                {typed}
              </span>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {/* Magnet wrapper → Link → Button merged via asChild */}
              <div ref={mag.ref} {...mag.handlers} style={mag.style}>
                <Button variant="primary" size="xl" asChild>
                  <Link href="/dashboard">Start Creating ✦</Link>
                </Button>
              </div>

              <Button variant="glass" size="xl">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right: radial cluster */}
          <HeroRadialCluster />
        </div>
      </div>
    </section>
  );
}
