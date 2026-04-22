"use client";

import { cn } from "@/lib/utils";
import { f, P, useAnim } from "./utils";

const DILUTION_FACTOR = 0.52;
const EXIT_VALUATIONS = [250, 300, 350, 400, 450, 500];

const ENTRIES = [
  { valuation: 2_857_143, label: "$2,857,143", highlight: true },
  { valuation: 5_000_000, label: "$5,000,000", highlight: false },
  { valuation: 7_142_857, label: "$7,142,857", highlight: false },
  { valuation: 10_000_000, label: "$10,000,000", highlight: false },
  { valuation: 15_000_000, label: "$15,000,000", highlight: false },
  { valuation: 20_000_000, label: "$20,000,000", highlight: false },
  { valuation: 30_000_000, label: "$30,000,000", highlight: false },
];

function calcReturn(entryVal: number, exitM: number): number {
  return Math.round((DILUTION_FACTOR * exitM * 1_000_000) / entryVal * 10) / 10;
}

const MAX_RETURN = calcReturn(ENTRIES[0].valuation, EXIT_VALUATIONS[EXIT_VALUATIONS.length - 1]);

export function SlideFundStrategy({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%]">
      <div className="flex items-end justify-between mb-3">
        <div style={f(on, 0)}>
          <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
            Fund{" "}
            <mark className="bg-[#FFEC40] text-black px-1 not-italic">Strategy</mark>
          </h2>
        </div>
        <p className="font-sans font-medium text-white/40 text-base max-w-lg text-right" style={f(on, 100)}>
          Return multiples depending on entry valuation and exit valuation, considering standard dilution rounds.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid gap-px" style={{ gridTemplateColumns: `1fr repeat(${EXIT_VALUATIONS.length}, 1fr)`, gridTemplateRows: `auto repeat(${ENTRIES.length}, 1fr)` }}>
        <div className="bg-white/5 backdrop-blur-sm flex items-center justify-center p-2" style={f(on, 150)}>
          <span className="font-mono font-medium text-white/40 text-base uppercase tracking-wider">Entry Val.</span>
        </div>
        {EXIT_VALUATIONS.map((v, i) => (
          <div key={v} className="bg-white/5 backdrop-blur-sm flex items-center justify-center p-2" style={f(on, 180 + i * 30)}>
            <span className="font-mono font-medium text-white text-base">${v}M</span>
          </div>
        ))}

        {ENTRIES.map((entry, ri) => (
          <>
            <div
              key={`label-${entry.valuation}`}
              className={cn(
                "flex items-center justify-center px-3 backdrop-blur-sm",
                entry.highlight ? "bg-[#FFEC40]" : "bg-white/5",
              )}
              style={f(on, 250 + ri * 40)}
            >
              <span className={cn("font-mono font-medium text-base", entry.highlight ? "text-black" : "text-white")}>
                {entry.label}
              </span>
            </div>
            {EXIT_VALUATIONS.map((exitM, ci) => {
              const ret = calcReturn(entry.valuation, exitM);
              const scale = Math.min(ret / MAX_RETURN, 1);
              const isAbove60 = ret >= 60;
              const fontSize = entry.highlight
                ? `clamp(16px, ${1.2 + scale * 2.5}vw, ${20 + scale * 28}px)`
                : `clamp(14px, ${0.9 + scale * 1.2}vw, ${16 + scale * 10}px)`;

              return (
                <div
                  key={`${entry.valuation}-${exitM}`}
                  className={cn(
                    "flex items-center justify-center relative",
                    entry.highlight ? "bg-[#FFEC40]" : "bg-white/5 backdrop-blur-sm",
                  )}
                  style={f(on, 270 + ri * 40 + ci * 20)}
                >
                  {entry.highlight && (
                    <div
                      className="absolute inset-0 bg-white/20"
                      style={{ opacity: scale * 0.4 }}
                    />
                  )}
                  <span
                    className={cn(
                      "font-mono font-medium relative z-10",
                      entry.highlight ? "text-black" : isAbove60 ? "text-[#FFEC40]" : "text-white",
                    )}
                    style={{ fontSize }}
                  >
                    {ret}x
                  </span>
                </div>
              );
            })}
          </>
        ))}
      </div>

      <div className="mt-3" style={f(on, 600)}>
        <p className="font-sans font-medium text-white text-base">
          Only our standard valuation of <span className="text-[#FFEC40]">$200K for 7%</span> reaches a return multiple of 60x.
        </p>
      </div>
    </div>
  );
}
