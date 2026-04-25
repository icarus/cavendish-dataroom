"use client";

import { f, P, useAnim } from "./utils";

export function Slide11({ active }: P) {
  const on = useAnim(active);

  const left = [["FUND SIZE","USD $15M ($20M CAP)"],["SCOPE","PRE-SEED & SEED"],["PORTFOLIO","~40 STARTUPS"],["OWNERSHIP","5%–7% THROUGH POST-MONEY SAFE"],["TICKET SIZE","USD $50,000–$500,000"],["GEOGRAPHY","SPANISH SPEAKING LATIN AMERICA"]];
  const right = [["FUND DURATION","10 YEARS"],["FEES","2% MANAGEMENT FEE"],["CARRY","20% CARRY"],["CAPITAL CALLS","2 OR 3, ONE PER SEMESTER"],["FUND JURISDICTION","CANADA"]];

  return (
    <div className="slide aspect-video w-full relative p-[4%_6%] flex flex-col overflow-hidden">
      <div style={f(on, 0)} className="mb-16">
        <div className="font-sans font-medium text-white leading-tight" style={{ fontSize: "45px" }}>Raising a new fund</div>
        <mark className="font-sans font-medium bg-[#FFEC40] text-black px-2 not-italic inline-block" style={{ fontSize: "45px" }}>
          Platanus Cavendish
        </mark>
      </div>
      <div className="flex gap-16 flex-1 relative z-10">
        <div className="flex-1 flex flex-col">
          {left.map(([l, v], i) => (
            <div key={l} className="pt-6 flex justify-between items-baseline flex-1 border-b border-white/10 bg-black/60 px-3 -mx-3" style={f(on, 140 + i * 55)}>
              <span className="font-mono font-medium text-white/40 text-base tracking-wider uppercase">{l}</span>
              <span className="font-mono font-medium text-white text-base tracking-wider uppercase">{v}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col">
          {right.map(([l, v], i) => (
            <div key={l} className="pt-6 flex justify-between items-baseline flex-1 border-b border-white/10 bg-black/60 px-3 -mx-3" style={f(on, 200 + i * 55)}>
              <span className="font-mono font-medium text-white/40 text-base tracking-wider uppercase">{l}</span>
              <span className="font-mono text-white text-base font-medium tracking-wider uppercase">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
