// ============================================================================
// USE PARALLAX HOOK
// ============================================================================
// Custom React hook that tracks the current scroll position of the window.

// Purpose:
// This hook provides the scrollY value that can be used by components to create parallax effects (where elements move at different speeds relative to the scroll position).

// How it works:
// 1. Uses useState to store the current scroll position
// 2. Uses useEffect to set up a scroll event listener
// 3. On scroll, updates the state with window.scrollY value
// 4. Cleanup function removes the event listener on unmount

// Returns:
// - scrollY: Number representing pixels scrolled from top
// ============================================================================

import { useEffect, useState } from "react";

// Custom hook: useParallax
// Tracks window scroll position for parallax effects
export const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);

  // useEffect runs after render, sets up scroll listener
  // Empty dependency array [] means this runs once on mount
  useEffect(() => {

    // Scroll event handler function called whenever user scrolls the page
    const handleScroll = () => {

      // Update state with current scroll position
      // window.scrollY gives pixels scrolled from top of document
      setScrollY(window.scrollY);
    };

    // Add scroll event listener to window, 'scroll' event fires repeatedly during scrolling
    window.addEventListener("scroll", handleScroll);

    // Cleanup function: Removes the event listener to prevent memory leaks
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Return current scrollY value
  // Components using this hook will re-render when scrollY changes
  return scrollY;
};
