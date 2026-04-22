"use client";

import { P, useAnim, WordReveal } from "./utils";

export function SlideFounderQuote({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="slide aspect-video w-full relative flex items-center justify-center p-[8%]">
      <div className="max-w-4xl space-y-10">
        <blockquote className="leading-[1.4]" style={{ fontSize: "clamp(22px, 3.2vw, 48px)" }}>
          <WordReveal
            text="In LatAm there are thousands of founders with big ideas, solving real problems in massive markets."
            on={on}
            baseDelay={0}
            interval={70}
            className="font-sans font-medium text-white/80"
          />
          <br />
          <WordReveal
            text="Most never get started because no one gives them that first vote of confidence."
            on={on}
            baseDelay={1200}
            interval={70}
            className="font-sans font-medium text-white/40"
          />
        </blockquote>

        <div style={{ fontSize: "clamp(18px, 2vw, 30px)" }}>
          <WordReveal
            text="Platanus resolves that."
            on={on}
            baseDelay={2600}
            interval={100}
            className="font-sans font-semibold text-[#FFEC40]"
          />
        </div>

        <div
          className="flex items-center gap-3 pt-4"
          style={{
            opacity: on ? 1 : 0,
            transition: "opacity 0.6s ease 3200ms",
          }}
        >
          <div className="w-px h-6 bg-white/20" />
          <span className="font-mono text-white/30 text-sm uppercase tracking-widest">
            Natan, CEO of Felz
          </span>
        </div>
      </div>
    </div>
  );
}
