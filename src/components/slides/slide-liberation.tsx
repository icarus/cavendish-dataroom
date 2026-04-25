"use client";

import { P, useAnim, WordReveal } from "./utils";

export function SlideLiberation({ active, visited = false }: P) {
  const on = useAnim(active, visited);

  return (
    <div className="slide aspect-video w-full relative flex items-center justify-start p-[8%]">
      <div className="w-full space-y-10" style={{ fontSize: "51px" }}>
        <div className="leading-[1.3]">
          <WordReveal
            text="We invest $200,000 in the earliest stages of tech startups."
            on={on}
            baseDelay={0}
            interval={70}
            className="font-sans font-medium text-black"
            instant={visited}
          />
        </div>

        <div className="leading-[1.3]">
          <WordReveal
            text="Fast."
            on={on}
            baseDelay={800}
            interval={80}
            className="font-sans font-medium text-black"
            instant={visited}
          />
        </div>

        <div className="leading-[1.5] text-balance pt-4">
          <WordReveal
            text="Real liberation capital so talent can thrive."
            on={on}
            baseDelay={1100}
            interval={60}
            className="font-sans font-medium text-black"
            instant={visited}
          />
        </div>
      </div>
    </div>
  );
}
