"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Applies a magnetic pull effect toward the cursor.
 * Attach `ref` to the element, spread `handlers` on it,
 * and apply `style` to its inline styles.
 *
 * @param {number} strength - How strongly the element follows the cursor (0–1)
 */
export function useMagnet(strength = 0.25) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      });
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return {
    ref,
    offset,
    handlers: { onMouseMove, onMouseLeave },
    /** Inline style to spread onto the target element */
    style: {
      transform: `translate(${offset.x}px, ${offset.y}px)`,
      transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    },
  };
}
