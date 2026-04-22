"use client";

import { P, useAnim, WordReveal } from "./utils";

export function SlideLiberation({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="slide aspect-video w-full relative flex items-center justify-center p-[8%] bg-[#FFEC40]">
      <div className="max-w-4xl space-y-10 text-center">
        <div className="leading-[1.3]" style={{ fontSize: "clamp(32px, 5vw, 76px)" }}>
          <WordReveal
            text="We invest $200,000 in the earliest stages of tech startups."
            on={on}
            baseDelay={0}
            interval={100}
            className="font-sans font-bold text-black"
          />
        </div>

        <div className="leading-[1.3]" style={{ fontSize: "clamp(32px, 5vw, 76px)" }}>
          <WordReveal
            text="Fast."
            on={on}
            baseDelay={1200}
            interval={100}
            className="font-sans font-bold text-black"
          />
        </div>

        <div className="leading-[1.5] pt-4" style={{ fontSize: "clamp(16px, 2vw, 28px)" }}>
          <WordReveal
            text="Real liberation capital so talent can thrive."
            on={on}
            baseDelay={1600}
            interval={80}
            className="font-sans font-medium text-black/50"
          />
        </div>
      </div>
    </div>
  );
}
