"use client";

import React from "react";

const ITEMS = [
  { label: "IMAGES PROCESSED  +12.4%", up: true },
  { label: "API UPTIME  99.98%", up: false },
  { label: "REVENUE  $82,401", up: true },
  { label: "ACTIVE USERS  14,872", up: false },
  { label: "GPU UTILIZATION  87.3%", up: true },
  { label: "AVG LATENCY  0.31s", up: false },
];

// Duplicate for seamless loop
const TICKER_ITEMS = [...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div className="dash-ticker-wrap">
      <div className="dash-ticker-inner">
        {TICKER_ITEMS.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              marginRight: 64,
              color: item.up
                ? "rgba(52, 211, 153, 0.85)"
                : "rgba(255,255,255,0.38)",
            }}
          >
            {item.up ? "⬆" : "◆"} {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
