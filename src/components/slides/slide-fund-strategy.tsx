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

function calcReturn(equity: number, exitM: number, ticket: number): string {
  const retained = DILUTIONS.reduce((eq, d) => eq * d, equity);
  const returnVal = (retained * exitM * 1_000_000) / ticket;
  return `${returnVal.toFixed(0)}x`;
}

export function SlideFundStrategy({ active }: P) {
  const on = useAnim(active);

  return (
    <div className="slide aspect-video w-full relative flex flex-col p-[4%_5%]">
      <div className="mb-4" style={f(on, 0)}>
        <h2 className="font-sans font-medium text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          Fund{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">Strategy</mark>
        </h2>
      </div>

      <div className="mb-6" style={f(on, 100)}>
        <p className="font-sans font-medium text-white" style={{ fontSize: "clamp(12px, 1.2vw, 18px)" }}>
          Returns on a $200K investment depending on entry price and exit valuation, considering three standard dilution rounds.
        </p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col">
        <div className="grid grid-cols-5 gap-px mb-px" style={f(on, 200)}>
          <div className="bg-white/5 px-4 py-3 flex items-center">
            <span className="font-mono font-medium text-white text-base uppercase tracking-wider">Entry</span>
          </div>
          {EXIT_VALUATIONS.map((v) => (
            <div key={v} className="bg-white/5 px-4 py-3 text-center">
              <span className="font-mono font-medium text-white text-base">${v}M exit</span>
            </div>
          ))}
        </div>

        {ENTRIES.map((entry, ri) => (
          <div
            key={entry.label}
            className={cn("grid grid-cols-5 gap-px mb-px", entry.highlight && "relative")}
            style={f(on, 300 + ri * 80)}
          >
            <div className={cn("px-4 py-4 flex items-center", entry.highlight ? "bg-[#FFEC40]" : "bg-white/5")}>
              <span className={cn("font-mono font-medium text-base", entry.highlight ? "text-black" : "text-white")}>
                {entry.label}
              </span>
            </div>
            {EXIT_VALUATIONS.map((exitM) => {
              const ret = calcReturn(entry.equity, exitM, entry.ticket);
              const retNum = parseFloat(ret);
              const isHigh = retNum >= 60;
              return (
                <div
                  key={exitM}
                  className={cn(
                    "px-4 py-4 text-center flex items-center justify-center",
                    entry.highlight ? "bg-[#FFEC40]" : "bg-white/5"
                  )}
                >
                  <span className={cn(
                    "font-mono font-medium",
                    entry.highlight ? "text-black" : "text-white",
                    isHigh && "text-lg",
                  )}>
                    {ret}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-4" style={f(on, 700)}>
        <p className="font-sans font-medium text-white" style={{ fontSize: "clamp(12px, 1.2vw, 18px)" }}>
          Only our standard valuation of $200K for 7% reaches a return multiple of 60x.
        </p>
      </div>
    </div>
  );
}
