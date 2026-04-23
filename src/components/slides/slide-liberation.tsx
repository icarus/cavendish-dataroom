"use client";

import { P, useAnim, WordReveal } from "./utils";

export function SlideLiberation({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="slide aspect-video w-full relative flex items-center justify-start p-[8%]">
      <div className="w-full space-y-10" style={{ fontSize: "clamp(28px, 4vw, 62px)" }}>
        <div className="leading-[1.3]">
          <WordReveal
            text="We invest $200,000 in the earliest stages of tech startups."
            on={on}
            baseDelay={0}
            interval={55}
            className="font-sans font-medium text-black"
          />
        </div>

        <div className="leading-[1.3]">
          <WordReveal
            text="Fast."
            on={on}
            baseDelay={650}
            interval={60}
            className="font-sans font-medium text-black"
          />
        </div>

        <div className="leading-[1.5] text-balance pt-4">
          <WordReveal
            text="Real liberation capital so talent can thrive."
            on={on}
            baseDelay={900}
            interval={50}
            className="font-sans font-medium text-black"
          />
        </div>
      </div>
    </div>
  );
}
