"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export type P = { active: boolean };

export const TEXT = {
  title: "font-sans font-medium text-white",
  body: "font-sans font-normal text-white/40 text-base leading-relaxed",
  label: "font-mono font-medium text-white/40 text-base uppercase tracking-wider",
  accent: "font-mono font-medium text-[#FFEC40] text-base uppercase tracking-wider",
  muted: "font-sans font-medium text-white/40 text-base leading-relaxed",
} as const;

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

export function WordReveal({ text, on, baseDelay = 0, interval = 60, className, highlight }: { text: string; on: boolean; baseDelay?: number; interval?: number; className?: string; highlight?: boolean }) {
  const words = text.split(" ");
  return (
    <span className={cn("text-balance", highlight && "text-black", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className={cn("inline-block -mt-px text-balance", highlight && "bg-[#FFEC40] px-0.5 py-0.5 -mx-0.5")}
          style={{
            opacity: on ? 1 : 0,
            transform: on ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 0.4s ease ${baseDelay + i * interval}ms, transform 0.4s ease ${baseDelay + i * interval}ms`,
          }}
        >
          {word}{i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
