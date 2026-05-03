"use client";

import { useEffect, useState } from "react";

/**
 * Animates a number from 0 → target over `duration` ms.
 * Only starts when `active` becomes true (e.g. when scrolled into view).
 */
export function useCounter(target, active, duration = 1400) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;

    const steps = 50;
    const inc = target / steps;
    const ms = duration / steps;
    let cur = 0;

    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) {
        setVal(target);
        clearInterval(t);
      } else {
        setVal(Math.floor(cur));
      }
    }, ms);

    return () => clearInterval(t);
  }, [target, active, duration]);

  return val;
}
