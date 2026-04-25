"use client";

import { f, grow, P, useAnim } from "./utils";

export function Slide4({ active }: P) {
  const on = useAnim(active);
  return (
    <div className="slide aspect-video w-full relative flex">
      <div className="flex-1 flex flex-col justify-between">
        <p className="font-sans font-medium text-white leading-relaxed p-[6%_5%] w-4/5" style={{ fontSize: "clamp(16px, 1.8vw, 26px)", ...f(on, 0) }}>
          In just five years,{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">
            we&apos;ve assessed more companies than a typical LatAm investor
          </mark>{" "}
          does in an entire lifetime.
        </p>
        <div className="bg-[#1c1c1c] flex flex-col justify-end p-[5%]" style={{ ...grow(on, 200), height: "45%" }}>
          <div className="font-mono uppercase font-medium text-white leading-none" style={{ fontSize: "clamp(44px, 6vw, 88px)" }}>9.161</div>
          <div className="font-sans font-medium text-white/40 text-base mt-2">startups reviewed until date</div>
        </div>
      </div>
      <div className="w-[50%] bg-[#FFEC40] flex flex-col justify-between p-[3%_3%]" style={f(on, 100)}>
        <div>
          <div className="font-mono uppercase font-medium text-black leading-none" style={{ fontSize: "clamp(52px, 8vw, 120px)" }}>20.000+</div>
          <div className="font-sans font-medium text-black text-base mt-2">startups</div>
        </div>
        <p className="font-mono font-medium text-black/40 text-base text-balance uppercase leading-relaxed self-end text-right max-w-[3/4]">
          In 4 years, we project to grow our funnel 1.5x year over year.
        </p>
      </div>
    </div>
  );
}
