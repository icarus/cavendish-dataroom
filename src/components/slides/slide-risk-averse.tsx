"use client";

import { f, P, useAnim, WordReveal } from "./utils";

export function SlideRiskAverse({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="slide aspect-video w-full relative flex items-center justify-start p-[8%]">
      <div className="max-w-4xl space-y-10">
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
            text="Funds in LatAm tend to need safety to invest: traction, incredible founders' CVs, a familiar business model."
            on={on}
            baseDelay={800}
            interval={60}
            className="font-sans font-medium text-white"
          />
        </div>

        <div className="leading-[1.4]" style={f(on, 2000)}>
          <mark className="bg-[#FFEC40] text-black px-2 py-0.5 inline-block not-italic" style={{ fontSize: "clamp(22px, 3.2vw, 48px)" }}>
            <WordReveal
              text="That's not early stage Venture Capital."
              on={on}
              baseDelay={2000}
              interval={90}
              className="font-sans font-medium"
            />
          </mark>
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
