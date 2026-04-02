"use client";

import { f, P, useAnim } from "./utils";

export function Slide11({ active }: P) {
  const on = useAnim(active);

  const left = [["FUND SIZE","USD $15M ($20M CAP)"],["SCOPE","PRE-SEED & SEED"],["PORTFOLIO","~40 STARTUPS"],["OWNERSHIP","5%–7% THROUGH POST-MONEY SAFE"],["TICKET SIZE","USD $50,000–$500,000"],["GEOGRAPHY","SPANISH SPEAKING LATIN AMERICA"]];
  const right = [["FUND DURATION","10 YEARS"],["FEES","2% MANAGEMENT FEE"],["CARRY","20% CARRY"],["CAPITAL CALLS","2 OR 3, ONE PER SEMESTER"],["FUND JURISDICTION","CANADA"]];

  return (
    <div className="slide aspect-video w-full relative p-[5%_6%]">
      <div style={f(on, 0)}>
        <div className="font-sans text-white leading-tight" style={{ fontSize: "clamp(26px, 3.5vw, 54px)" }}>Built for</div>
        <mark className="font-sans font-semibold bg-[#FFEC40] text-black px-2 not-italic inline-block" style={{ fontSize: "clamp(26px, 3.5vw, 54px)" }}>
          speed and adaptability
        </mark>
      </div>
      <div className="flex gap-16 mt-10">
        <div className="flex-1">
          {left.map(([l, v], i) => (
            <div key={l} className="flex justify-between items-baseline py-3.5 border-b border-white/5" style={f(on, 140 + i * 55)}>
              <span className="font-mono text-white/30 text-sm tracking-widest uppercase">{l}</span>
              <span className="font-mono text-white text-sm font-medium tracking-wider uppercase">{v}</span>
            </div>
          ))}
        </div>
        <div className="flex-1">
          {right.map(([l, v], i) => (
            <div key={l} className="flex justify-between items-baseline py-3.5 border-b border-white/5" style={f(on, 200 + i * 55)}>
              <span className="font-mono text-white/30 text-sm tracking-widest uppercase">{l}</span>
              <span className="font-mono text-white text-sm font-medium tracking-wider uppercase">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
