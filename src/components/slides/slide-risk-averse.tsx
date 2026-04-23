"use client";

import { f, P, useAnim, WordReveal } from "./utils";

export function SlideRiskAverse({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="slide aspect-video w-full relative flex items-center justify-start p-[6%_8%]">
      <div className="max-w-4xl space-y-6">
        <div className="leading-[1.4]" style={{ fontSize: "clamp(18px, 2.5vw, 38px)" }}>
          <WordReveal
            text="Risk-averse mentality is a curse for startups."
            on={on}
            baseDelay={0}
            interval={45}
            className="font-sans font-medium text-white"
          />
        </div>

        <div className="leading-[1.5]" style={{ fontSize: "clamp(18px, 2.5vw, 38px)" }}>
          <WordReveal
            text="Funds in LatAm tend to favor safer investments: traction, traditional founder's CVs, proven business model."
            on={on}
            baseDelay={500}
            interval={35}
            className="font-sans font-medium text-white"
          />
        </div>

        <div className="leading-[1.5]" style={{ fontSize: "clamp(18px, 2.5vw, 38px)" }}>
          <WordReveal
            text="Pre-seed funds should invest in the unknown to maximize economic upside."
            on={on}
            baseDelay={1200}
            interval={40}
            className="font-sans font-medium"
            highlight
          />
        </div>
      </div>
    </div>
  );
}
