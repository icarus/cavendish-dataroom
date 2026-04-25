"use client";

import { P, useAnim, WordReveal } from "./utils";

export function SlideFounderQuote({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="slide aspect-video w-full relative flex items-center justify-start p-[8%]">
      <div className="max-w-4xl space-y-10">
        <blockquote className="leading-[1.4] flex flex-col -space-y-8" style={{ fontSize: "32px" }}>
          <WordReveal
            text="In LatAm there are thousands of founders with big ideas, solving real problems in massive markets."
            on={on}
            baseDelay={0}
            interval={55}
            className="font-sans font-medium"
          />
          <br />
          <WordReveal
            text="Most never get started because no one gives them that first vote of confidence."
            on={on}
            baseDelay={900}
            interval={55}
            className="font-sans font-medium"
          />
        </blockquote>

        <div style={{ fontSize: "32px" }}>
          <WordReveal
            text="Platanus solves that."
            on={on}
            baseDelay={1900}
            interval={80}
            className="font-sans font-medium"
            highlight
          />
        </div>

        <div
          className="flex items-center gap-3 pt-4"
          style={{
            opacity: on ? 1 : 0,
            transition: "opacity 0.6s ease 2400ms",
          }}
        >
          <div className="w-0.5 h-9 bg-white/20" />
          <span className="font-mono font-medium text-white/40 text-base uppercase tracking-wider">
            Natan, CEO of Felz
          </span>
        </div>
      </div>
    </div>
  );
}
