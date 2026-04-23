"use client";

import { f, P, useAnim, WordReveal } from "./utils";

export function SlideRiskAverse({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="slide aspect-video w-full relative flex items-center justify-start p-[6%_8%]">
      <div className="max-w-4xl space-y-6">
        <div className="leading-[1.4]" style={{ fontSize: "clamp(22px, 3.2vw, 48px)" }}>
          <WordReveal
            text="Risk-averse mentality is a curse for startups."
            on={on}
            baseDelay={0}
            interval={80}
            className="font-sans font-medium text-white"
          />
        </div>

        <div className="leading-[1.5]" style={{ fontSize: "clamp(22px, 3.2vw, 48px)" }}>
          <WordReveal
            text="Funds in LatAm tend to favor safer investments: traction, traditional founder's CVs, proven business model."
            on={on}
            baseDelay={800}
            interval={60}
            className="font-sans font-medium text-white"
          />
        </div>

        <div className="leading-[1.4]" style={{ fontSize: "clamp(22px, 3.2vw, 48px)" }}>
          <WordReveal
            text="That's not early stage Venture Capital."
            on={on}
            baseDelay={2000}
            interval={90}
            className="font-sans font-medium"
            highlight
          />
        </div>

        <div className="leading-[1.5]" style={{ fontSize: "clamp(22px, 3.2vw, 48px)" }}>
          <WordReveal
            text="Pre-seed funds should invest in the unknown to maximize economic upside."
            on={on}
            baseDelay={2800}
            interval={70}
            className="font-sans font-medium text-white"
          />
        </div>
      </div>
    </div>
  );
}
