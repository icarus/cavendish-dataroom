"use client";

import { P, useAnim, WordReveal } from "./utils";

export function SlideFounderQuote({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="slide aspect-video w-full relative flex items-center justify-start p-[8%]">
      <div className="max-w-4xl space-y-10">
        <blockquote className="leading-[1.4] flex flex-col -space-y-8" style={{ fontSize: "clamp(22px, 3.2vw, 48px)" }}>
          <WordReveal
            text="In LatAm there are thousands of founders with big ideas, solving real problems in massive markets."
            on={on}
            baseDelay={0}
            interval={70}
            className="font-sans font-medium"
          />
          <br />
          <WordReveal
            text="Most never get started because no one gives them that first vote of confidence."
            on={on}
            baseDelay={1200}
            interval={70}
            className="font-sans font-medium"
          />
        </blockquote>

        <div style={{ ...f(on, 2600), fontSize: "clamp(22px, 3.2vw, 48px)" }}>
        <mark className="bg-[#FFEC40] text-black px-2 py-0.5 inline-block not-italic">
          <WordReveal
            text="Platanus resolves that."
            on={on}
            baseDelay={2600}
            interval={100}
            className="font-sans font-medium"
          />
        </mark>
        </div>

        <div
          className="flex items-center gap-3 pt-4"
          style={{
            opacity: on ? 1 : 0,
            transition: "opacity 0.6s ease 3200ms",
          }}
        >
          <div className="w-0.5 h-9 bg-white/20" />
          <span className="font-mono text-white/30 text-3xl uppercase tracking-widest">
            Natan, CEO of Felz
          </span>
        </div>
      </div>
    </div>
  );
}
