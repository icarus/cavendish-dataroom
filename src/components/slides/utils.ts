"use client";

import React, { useEffect, useState } from "react";

export type P = { active: boolean };

export function useAnim(active: boolean) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (active) {
      const id = setTimeout(() => setOn(true), 80);
      return () => clearTimeout(id);
    }
    setOn(false);
  }, [active]);
  return on;
}

export const f = (on: boolean, d = 0): React.CSSProperties => ({
  opacity: on ? 1 : 0,
  transform: on ? "translateY(0)" : "translateY(14px)",
  transition: `opacity 0.6s ease ${d}ms, transform 0.6s ease ${d}ms`,
});

export const grow = (on: boolean, d = 0): React.CSSProperties => ({
  transform: on ? "scaleY(1)" : "scaleY(0)",
  transformOrigin: "bottom",
  transition: `transform 0.8s cubic-bezier(0.4,0,0.2,1) ${d}ms`,
});
