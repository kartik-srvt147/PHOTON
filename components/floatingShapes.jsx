// ============================================================================
// FLOATING SHAPES COMPONENT
// ============================================================================
// This component renders animated gradient shapes in the background.
// It creates a visually appealing backdrop with parallax scrolling effect.
//
// How it works:
// 1. Uses the useParallax hook to track scroll position
// 2. Renders 4 gradient circles at different positions
// 3. Applies parallax transform (translateY and rotate) based on scroll
// 4. Shapes are fixed, blurred, and semi-transparent for visual depth
//
// Key features:
// - "use client" directive: This is a Client Component (uses hooks)
// - Fixed positioning: Shapes stay in place while content scrolls
// - Blur effect: Creates soft, glowing appearance
// - Parallax animation: Shapes move at different rate than scroll
// ============================================================================

"use client";

// Import the custom useParallax hook to get scroll position
import { useParallax } from "@/hooks/use-parallax";
import React from "react";

const FloatingShapes = () => {
  // Get current scroll position from custom hook, this value updates as user scrolls the page
  const scrollY = useParallax();

  const shapes = [
    {
      id: 1,
      size: "w-72 h-72",
      position: "top-20 left-10",
      gradient: "from-blue-500 to-violet-600",
    },
    {
      id: 2,
      size: "w-96 h-96",
      position: "top-1/3 right-10",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      id: 3,
      size: "w-64 h-64",
      position: "bottom-20 left-1/4",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      id: 4,
      size: "w-80 h-80",
      position: "bottom-1/3 right-1/4",
      gradient: "from-blue-500 to-emerald-500",
    },
  ];

  // Render the shapes container
  // - fixed: Fixed to viewport, doesn't move with scroll
  // - inset-0: Covers entire viewport (top:0, right:0, bottom:0, left:0)
  // - overflow-hidden: Clips shapes that extend beyond viewport
  // - pointer-events-none: Allows clicks to pass through to content below
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => {
        return (
          <div
            key={shape.id}
            className={`absolute ${shape.size} ${shape.position} bg-gradient-to-r ${shape.gradient} rounded-full blur-3xl opacity-20 animate-pulse`}
            // Parallax effect: Transform based on scroll position
            // - translateY: Moves shape vertically based on scroll (0.5x speed)
            // - rotate: Rotates shape slightly based on scroll (0.1x speed)
            style={{
              transform: `translateY(${scrollY * 0.5}px) rotate(${scrollY * 0.1}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingShapes;
