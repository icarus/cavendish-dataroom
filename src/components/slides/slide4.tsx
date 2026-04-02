"use client";

import { f, grow, P, useAnim } from "./utils";

export function Slide4({ active }: P) {
  const on = useAnim(active);
  return (
    <div className="slide aspect-video w-full relative flex">
      <div className="flex-1 flex flex-col justify-between p-[6%_5%]">
        <p className="font-sans text-white leading-relaxed" style={{ fontSize: "clamp(16px, 1.8vw, 26px)", ...f(on, 0) }}>
          In just five years,{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">
            we&apos;ve assessed more companies than a typical LatAm investor
          </mark>{" "}
          does in an entire lifetime.
        </p>
        <div className="bg-[#1c1c1c] p-10" style={grow(on, 200)}>
          <div className="font-sans text-white font-light leading-none" style={{ fontSize: "clamp(44px, 6vw, 88px)" }}>9.161</div>
          <div className="font-mono text-white/40 text-sm tracking-widest uppercase mt-2">startups reviewed until date</div>
        </div>
      </div>
      <div className="w-[42%] bg-[#FFEC40] flex flex-col justify-between p-[6%_5%]" style={f(on, 100)}>
        <div>
          <div className="font-sans font-semibold text-black leading-none" style={{ fontSize: "clamp(52px, 8vw, 120px)" }}>20.000+</div>
          <div className="font-sans text-black text-lg mt-2">startups</div>
        </div>
        <p className="font-mono text-black/50 text-sm tracking-[0.1em] uppercase leading-relaxed self-end text-right max-w-[240px]">
          In 4 years, we project to grow our funnel 1.5x year over year.
        </p>
      </div>
    </div>
  );
}
