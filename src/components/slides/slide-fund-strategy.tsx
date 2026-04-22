"use client";

import { cn } from "@/lib/utils";
import { f, P, useAnim } from "./utils";

const DILUTIONS = [0.75, 0.60, 0.45];
const EXIT_VALUATIONS = [100, 200, 500, 1000];

const ENTRIES = [
  { label: "$200K / 7%", ticket: 200000, equity: 0.07, highlight: true },
  { label: "$500K / 7%", ticket: 500000, equity: 0.07, highlight: false },
  { label: "$1M / 10%", ticket: 1000000, equity: 0.10, highlight: false },
  { label: "$2M / 15%", ticket: 2000000, equity: 0.15, highlight: false },
];

function calcReturn(equity: number, exitM: number, ticket: number): number {
  const retained = DILUTIONS.reduce((eq, d) => eq * d, equity);
  return Math.round((retained * exitM * 1_000_000) / ticket);
}

const MAX_RETURN = calcReturn(0.07, 1000, 200000);

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
          Returns on a $200K investment depending on entry price and exit valuation, considering three standard dilution rounds.
        </p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-5 grid-rows-5">
        <div className="bg-white/5 backdrop-blur-sm flex items-center justify-center" style={f(on, 150)}>
          <span className="font-mono font-medium text-white/40 text-base uppercase tracking-wider">Entry</span>
        </div>
        {EXIT_VALUATIONS.map((v, i) => (
          <div key={v} className="bg-white/5 backdrop-blur-sm flex items-center justify-center" style={f(on, 180 + i * 40)}>
            <span className="font-mono font-medium text-white text-base">${v}M exit</span>
          </div>
        ))}

        {ENTRIES.map((entry, ri) => (
          <>
            <div
              key={`label-${entry.label}`}
              className={cn(
                "flex items-center justify-center px-3 backdrop-blur-sm",
                entry.highlight ? "bg-[#FFEC40]" : "bg-white/5 backdrop-blur-sm",
              )}
              style={f(on, 250 + ri * 60)}
            >
              <span className={cn("font-mono font-medium text-base", entry.highlight ? "text-black" : "text-white")}>
                {entry.label}
              </span>
            </div>
            {EXIT_VALUATIONS.map((exitM, ci) => {
              const ret = calcReturn(entry.equity, exitM, entry.ticket);
              const scale = Math.min(ret / MAX_RETURN, 1);
              const fontSize = entry.highlight
                ? `clamp(18px, ${1.5 + scale * 3}vw, ${24 + scale * 36}px)`
                : `clamp(16px, ${1 + scale * 1.5}vw, ${18 + scale * 14}px)`;

              return (
                <div
                  key={`${entry.label}-${exitM}`}
                  className={cn(
                    "flex items-center justify-center relative",
                    entry.highlight ? "bg-[#FFEC40]" : "bg-white/5 backdrop-blur-sm",
                  )}
                  style={f(on, 280 + ri * 60 + ci * 30)}
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
                      entry.highlight ? "text-black" : "text-white",
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
